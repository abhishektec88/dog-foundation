import Reveal from './Reveal.jsx'

const cards = [
  {
    title: 'Rescue & relief',
    body:
      'Rapid response for injured and sick dogs, with transport to partner clinics and follow-up care.',
  },
  {
    title: 'Community care',
    body:
      'Feeding routes, water stations, and local foster networks so dogs are supported where they live.',
  },
  {
    title: 'Lasting change',
    body:
      'Adoption events, responsible pet ownership workshops, and spay/neuter camps to reduce future suffering.',
  },
]

export default function Mission() {
  return (
    <section className="section section--cream" id="mission" aria-labelledby="mission-title">
      <div className="section__inner">
        <Reveal>
          <h2 id="mission-title">Our mission</h2>
          <p className="section__intro">
            Street dogs face hunger, disease, and neglect every day. The Street Dog Foundation exists
            to bridge the gap between compassion and action: emergency rescue, medical treatment,
            sterilization programs, and education so fewer animals suffer on the streets.
          </p>
        </Reveal>
        <div className="mission-grid">
          {cards.map((card, i) => (
            <Reveal key={card.title} as="article" className="mission-card" delay={i * 75}>
              <h3>{card.title}</h3>
              <p>{card.body}</p>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}
