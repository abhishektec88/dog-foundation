import heroVideo from '../assets/stray_dog.mp4'



export default function Hero() {
  return (
    <section className="hero" id="top" aria-labelledby="hero-title">
      <div className="hero__bg" aria-hidden="true">
        <video className="hero__video" autoPlay muted loop playsInline preload="metadata">
          <source src={heroVideo} type="video/mp4" />
        </video>
      </div>

      <div className="hero__inner">
        <div className="hero__content">
          <p className="hero__eyebrow">Compassion in action</p>
          <h1 id="hero-title">Every street dog deserves care, dignity, and a chance at a better life.</h1>
          <p className="hero__lead">
            We rescue injured animals, run vaccination drives, and work with communities to create
            lasting change—powered by people like you.
          </p>
          <div className="hero__actions">
            <a className="btn btn--primary" href="#donate">
              Make a donation
            </a>
            <a className="btn btn--ghost" href="#support">
              Other ways to help
            </a>
          </div>
        </div>
      </div>
    </section>
  )
}

