export default function Footer() {
  return (
    <footer className="site-footer">
      <div className="site-footer__inner">
        <div className="site-footer__brand">
          <strong>Street Dog Foundation</strong>
          <p>Registered nonprofit · EIN placeholder</p>
        </div>
        <div className="site-footer__links">
          <a href="#mission">Mission</a>
          <a href="#programs">Programs</a>
          <a href="#support">Support</a>
          <a href="#donate">Donate</a>
        </div>
        <p className="site-footer__copy">
          © {new Date().getFullYear()} Street Dog Foundation. Built to help street dogs everywhere.
        </p>
      </div>
    </footer>
  )
}
