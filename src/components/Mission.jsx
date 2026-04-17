export default function Mission() {
  return (
    <section className="section section--cream" id="mission" aria-labelledby="mission-title">
      <div className="section__inner">
        <h2 id="mission-title">Our mission</h2>
        <p className="section__intro">
          Street dogs face hunger, disease, and neglect every day. The Street Dog Foundation exists
          to bridge the gap between compassion and action: emergency rescue, medical treatment,
          sterilization programs, and education so fewer animals suffer on the streets.
        </p>
        <div className="mission-grid">
          <article className="mission-card">
            <h3>Rescue &amp; relief</h3>
            <p>
              Rapid response for injured and sick dogs, with transport to partner clinics and
              follow-up care.
            </p>
          </article>
          <article className="mission-card">
            <h3>Community care</h3>
            <p>
              Feeding routes, water stations, and local foster networks so dogs are supported where
              they live.
            </p>
          </article>
          <article className="mission-card">
            <h3>Lasting change</h3>
            <p>
              Adoption events, responsible pet ownership workshops, and spay/neuter camps to
              reduce future suffering.
            </p>
          </article>
        </div>
      </div>
    </section>
  )
}
