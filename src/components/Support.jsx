const ways = [
  {
    title: 'Volunteer',
    text: 'Join feeding walks, events, or admin help. We welcome weekday and weekend shifts.',
  },
  {
    title: 'Foster',
    text: 'Open your home temporarily while we find adopters—supplies and vet costs covered.',
  },
  {
    title: 'Sponsor a dog',
    text: 'Monthly sponsorship helps one dog with food and medical care; you receive updates.',
  },
  {
    title: 'Spread the word',
    text: 'Share our posts, host a small fundraiser, or introduce us to local businesses.',
  },
]

export default function Support() {
  return (
    <section className="section section--forest" id="support" aria-labelledby="support-title">
      <div className="section__inner">
        <h2 id="support-title">Ways to support</h2>
        <p className="section__intro section__intro--on-dark">
          Not everyone can donate money—and that is okay. Time, skills, and voice matter just as
          much.
        </p>
        <ul className="support-grid">
          {ways.map((w) => (
            <li key={w.title}>
              <h3>{w.title}</h3>
              <p>{w.text}</p>
            </li>
          ))}
        </ul>
        <p className="support-note">
          <a href="mailto:hello@streetdogfoundation.example">Email us</a> to volunteer or ask about
          corporate partnerships. Replace this address with your real contact in production.
        </p>
      </div>
    </section>
  )
}
