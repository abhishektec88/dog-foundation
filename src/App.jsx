import Header from './components/Header.jsx'
import Hero from './components/Hero.jsx'
import Mission from './components/Mission.jsx'
import Programs from './components/Programs.jsx'
import Support from './components/Support.jsx'
import Donate from './components/Donate.jsx'
import Footer from './components/Footer.jsx'
import './App.css'

export default function App() {
  return (
    <>
      <Header />
      <main>
        <Hero />
        <Mission />
        <Programs />
        <Support />
        <Donate />
      </main>
      <Footer />
    </>
  )
}
