import qrCodeImage from '../assets/QRCODE.jpeg'

export default function Donate() {
  return (
    <section className="section section--donate" id="donate" aria-labelledby="donate-title">
      <div className="section__inner">
        <h2 id="donate-title">Make a donation</h2>
        <p className="section__intro section__intro--narrow">
          100% of public donations fund food, medicine, and field operations. Scan the QR code with
          Google Pay, PhonePe, BHIM, Paytm, or any UPI app.
        </p>
        <aside className="donate-qr" aria-labelledby="donate-qr-title">
          <h3 id="donate-qr-title">Donate via UPI</h3>
          <p className="donate-qr__lead">Pay to Deepak Sharma — Kotak Mahindra Bank (UPI).</p>
          <div className="donate-qr__figure">
            <img
              src={qrCodeImage}
              alt="UPI QR code to pay Deepak Sharma. UPI ID 9911489535@kotak."
              width={640}
              height={640}
              decoding="async"
            />
          </div>
          <p className="donate-qr__upi">
            <span className="donate-qr__upi-label">UPI ID</span>
            <span className="donate-qr__upi-value">9911489535@kotak</span>
          </p>
        </aside>
      </div>
    </section>
  )
}
