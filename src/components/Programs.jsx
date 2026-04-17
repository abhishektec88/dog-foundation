const items = [
  {
    title: 'Emergency rescue',
    text: '24/7 hotline for hit-and-run cases, wounds, and parvo—coordinated pickups and triage.',
  },
  {
    title: 'Medical & vaccines',
    text: 'Anti-rabies drives, deworming, and treatment funds for dogs who would otherwise go without.',
  },
  {
    title: 'Shelter & recovery',
    text: 'Short-term shelter for surgery recovery, then return-to-territory or adoption when possible.',
  },
  {
    title: 'Education & advocacy',
    text: 'School visits and neighborhood outreach to promote kindness and coexistence with street dogs.',
  },
]

export default function Programs() {
  return (
    <section className="section" id="programs" aria-labelledby="programs-title">
      <div className="section__inner">
        <h2 id="programs-title">What we do</h2>
        <p className="section__intro section__intro--narrow">
          Your support funds concrete programs with measurable impact. Here is how we turn donations
          into lives saved.
        </p>
        <ul className="program-list">
          {items.map((item) => (
            <li key={item.title}>
              <h3>{item.title}</h3>
              <p>{item.text}</p>
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}
