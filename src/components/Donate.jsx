import { useMemo, useState } from 'react'
import Reveal from './Reveal.jsx'

const CURRENCIES = {
  USD: { symbol: '$', amounts: [5, 15, 50, 100] },
  INR: { symbol: '₹', amounts: [100, 500, 1500, 3000] },
}

const rawApiBaseUrl = String(import.meta.env.VITE_API_BASE_URL || '').trim()
const API_BASE_URL =
  rawApiBaseUrl && rawApiBaseUrl !== 'undefined' && rawApiBaseUrl !== 'null'
    ? rawApiBaseUrl.replace(/\/$/, '')
    : 'http://localhost:4000'

function loadRazorpayScript() {
  if (typeof window === 'undefined') return Promise.resolve(false)
  if (window.Razorpay) return Promise.resolve(true)

  return new Promise((resolve) => {
    const script = document.createElement('script')
    script.src = 'https://checkout.razorpay.com/v1/checkout.js'
    script.onload = () => resolve(true)
    script.onerror = () => resolve(false)
    document.body.appendChild(script)
  })
}

export default function Donate() {
  const [currency, setCurrency] = useState('INR')
  const [frequency, setFrequency] = useState('one-time')
  const [selectedAmount, setSelectedAmount] = useState(CURRENCIES.INR.amounts[0])
  const [customAmount, setCustomAmount] = useState('')
  const [showDetailsModal, setShowDetailsModal] = useState(false)
  const [donorDetails, setDonorDetails] = useState({ name: '', contact: '', email: '' })
  const [formErrors, setFormErrors] = useState({})
  const [isProcessing, setIsProcessing] = useState(false)
  const [paymentMessage, setPaymentMessage] = useState('')

  const currentConfig = CURRENCIES[currency]
  const displayAmount = useMemo(() => {
    const parsed = Number.parseFloat(customAmount)
    if (Number.isFinite(parsed) && parsed > 0) return parsed
    return selectedAmount
  }, [customAmount, selectedAmount])

  function handleCurrencyChange(nextCurrency) {
    setCurrency(nextCurrency)
    setSelectedAmount(CURRENCIES[nextCurrency].amounts[0])
    setCustomAmount('')
  }

  function validateDetails() {
    const errors = {}
    if (donorDetails.name.trim().length < 2) errors.name = 'Please enter your name.'
    if (!/^\d{10,15}$/.test(donorDetails.contact.trim())) {
      errors.contact = 'Enter a valid contact number.'
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(donorDetails.email.trim())) {
      errors.email = 'Enter a valid email address.'
    }
    setFormErrors(errors)
    return Object.keys(errors).length === 0
  }

  async function verifyPayment(paymentResponse) {
    const verifyRes = await fetch(`${API_BASE_URL}/api/payments/verify`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        ...paymentResponse,
        amount: displayAmount,
        currency,
        frequency,
        donor: donorDetails,
      }),
    })

    const verifyData = await verifyRes.json()
    if (!verifyRes.ok || !verifyData.success) {
      throw new Error(verifyData.message || 'Payment verification failed.')
    }
  }

  async function handleDetailsSubmit(e) {
    e.preventDefault()
    if (!validateDetails()) return
    if (currency !== 'INR') {
      setPaymentMessage('UPI is available only with INR. Please select INR and try again.')
      return
    }

    setIsProcessing(true)
    setPaymentMessage('')

    try {
      const scriptLoaded = await loadRazorpayScript()
      if (!scriptLoaded) throw new Error('Unable to load payment SDK. Please try again.')

      const orderRes = await fetch(`${API_BASE_URL}/api/payments/create-order`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          amount: displayAmount,
          currency,
          frequency,
          donor: donorDetails,
        }),
      })
      const orderData = await orderRes.json()
      if (!orderRes.ok) throw new Error(orderData.message || 'Unable to create payment order.')

      const options = {
        key: orderData.keyId,
        amount: orderData.amount,
        currency: orderData.currency,
        name: 'Dog Foundation',
        description: `${frequency === 'monthly' ? 'Monthly' : 'One-time'} donation`,
        order_id: orderData.orderId,
        prefill: orderData.prefill,
        theme: { color: '#c45c3e' },
        handler: async (response) => {
          try {
            await verifyPayment(response)
            setShowDetailsModal(false)
            setPaymentMessage('Payment successful. Confirmation email will be sent shortly.')
          } catch (error) {
            setPaymentMessage(error.message)
          } finally {
            setIsProcessing(false)
          }
        },
        modal: {
          ondismiss: () => {
            setIsProcessing(false)
          },
        },
      }

      const razorpay = new window.Razorpay(options)
      razorpay.open()
    } catch (error) {
      setPaymentMessage(error.message || 'Something went wrong. Please try again.')
      setIsProcessing(false)
    }
  }

  return (
    <section className="section section--donate" id="donate" aria-labelledby="donate-title">
      <Reveal className="section__inner">
        <div className="donate-panel">
          <h2 id="donate-title">Choose Your Impact</h2>

          <div className="donate-currency-switch" role="tablist" aria-label="Select currency">
            {Object.keys(CURRENCIES).map((code) => (
              <button
                key={code}
                type="button"
                className={`donate-chip ${currency === code ? 'is-active' : ''}`}
                onClick={() => handleCurrencyChange(code)}
                role="tab"
                aria-selected={currency === code}
                disabled={isProcessing}
              >
                {code} {CURRENCIES[code].symbol}
              </button>
            ))}
          </div>

          <div className="donate-amounts" role="group" aria-label="Select donation amount">
            {currentConfig.amounts.map((amount) => (
              <button
                key={amount}
                type="button"
                className={`donate-amount ${customAmount === '' && selectedAmount === amount ? 'is-active' : ''}`}
                onClick={() => {
                  setSelectedAmount(amount)
                  setCustomAmount('')
                }}
                disabled={isProcessing}
              >
                {currentConfig.symbol}
                {amount}
              </button>
            ))}
          </div>

          <label className="donate-custom">
            <span className="sr-only">Custom donation amount</span>
            <input
              type="number"
              min="1"
              step="1"
              value={customAmount}
              onChange={(e) => setCustomAmount(e.target.value)}
              placeholder={`Custom Amount (${currentConfig.symbol})`}
              inputMode="decimal"
              disabled={isProcessing}
            />
          </label>

          <div className="donate-frequency" role="group" aria-label="Select billing frequency">
            <button
              type="button"
              className={`donate-frequency__option ${frequency === 'one-time' ? 'is-active' : ''}`}
              onClick={() => setFrequency('one-time')}
              disabled={isProcessing}
            >
              One-time
            </button>
            <button
              type="button"
              className={`donate-frequency__option ${frequency === 'monthly' ? 'is-active' : ''}`}
              onClick={() => setFrequency('monthly')}
              disabled={isProcessing}
            >
              Monthly 💗
            </button>
          </div>

          <button type="button" className="donate-submit" onClick={() => setShowDetailsModal(true)} disabled={isProcessing}>
            {isProcessing ? 'Processing...' : 'Proceed to Payment'}
          </button>

          <p className="donate-meta">
            Selected: {currentConfig.symbol}
            {displayAmount} · {frequency === 'one-time' ? 'One-time' : 'Monthly'}
          </p>
          {paymentMessage && <p className="donate-meta donate-meta--status">{paymentMessage}</p>}
        </div>

        {showDetailsModal && (
          <div className="donate-modal" role="dialog" aria-modal="true" aria-labelledby="donate-modal-title">
            <div className="donate-modal__card">
              <div className="donate-modal__header">
                <h3 id="donate-modal-title">Enter your details</h3>
                <button
                  type="button"
                  className="donate-modal__close"
                  aria-label="Close details form"
                  onClick={() => {
                    if (isProcessing) return
                    setShowDetailsModal(false)
                    setFormErrors({})
                  }}
                >
                  ×
                </button>
              </div>
              <p className="donate-modal__lead">
                We use these details to send your payment confirmation email and receipt.
              </p>
              <form className="donate-modal__form" onSubmit={handleDetailsSubmit} noValidate>
                <label>
                  <span>Name</span>
                  <input
                    type="text"
                    value={donorDetails.name}
                    onChange={(e) => setDonorDetails((prev) => ({ ...prev, name: e.target.value }))}
                    placeholder="Your full name"
                    disabled={isProcessing}
                  />
                  {formErrors.name && <small className="donate-error">{formErrors.name}</small>}
                </label>
                <label>
                  <span>Contact number</span>
                  <input
                    type="tel"
                    value={donorDetails.contact}
                    onChange={(e) => setDonorDetails((prev) => ({ ...prev, contact: e.target.value }))}
                    placeholder="10-digit mobile number"
                    inputMode="numeric"
                    maxLength={15}
                    disabled={isProcessing}
                  />
                  {formErrors.contact && <small className="donate-error">{formErrors.contact}</small>}
                </label>
                <label>
                  <span>Email</span>
                  <input
                    type="email"
                    value={donorDetails.email}
                    onChange={(e) => setDonorDetails((prev) => ({ ...prev, email: e.target.value }))}
                    placeholder="you@example.com"
                    disabled={isProcessing}
                  />
                  {formErrors.email && <small className="donate-error">{formErrors.email}</small>}
                </label>
                <button type="submit" className="donate-submit" disabled={isProcessing}>
                  {isProcessing ? 'Opening payment...' : 'Continue'}
                </button>
                {paymentMessage && <small className="donate-error">{paymentMessage}</small>}
              </form>
            </div>
          </div>
        )}
      </Reveal>
    </section>
  )
}
