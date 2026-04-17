import dogImage from '../assets/dog.jpeg'



export default function Hero() {

  return (

    <section className="hero" id="top" aria-labelledby="hero-title">

      <div className="hero__bg" aria-hidden="true" />

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

          {/* <dl className="hero__stats">

            <div>

              <dt>Dogs helped yearly</dt>

              <dd>1,200+</dd>

            </div>

            <div>

              <dt>Meals provided</dt>

              <dd>45k+</dd>

            </div>

            <div>

              <dt>Volunteer hours</dt>

              <dd>24/7</dd>

            </div>

          </dl> */}

        </div>

        <figure className="hero__figure">

          <img

            src={dogImage}

            alt="A friendly dog looking up, representing the animals this foundation cares for."

            width={900}

            height={1200}

            decoding="async"

          />

        </figure>

      </div>

    </section>

  )

}

