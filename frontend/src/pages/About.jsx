import "../styles/About.css";

function About() {
  return (
    <main className="about-page">
      <section className="about-intro">
        <h1>About StepUp</h1>
        <p>
           StepUp is India’s largest sports and athleisure footwear brand.
    Incorporated in 2006, StepUp Activewear is one of the leading players
    in organized sports & casual footwear sector in India. Since 2016,
    the flagship brand “StepUp”, has been the largest sports and athleisure
    footwear brand in India, in both volume and value terms. The company’s
    products are available via an expansive Pan-India network of over
    15,000 geo-tagged multi-brand retail stores, 35+ company-owned exclusive
    outlets, large format stores such as Walmart, Vishal Retail and Reliance
    Smart among others and all the leading e-commerce portals.
        </p>
      </section>

      <section className="about-mission">
        <h2>Our Mission</h2>
        <p>
           At StepUp we craft shoes with care for everyone- men, women and kids,
    with an equal attention to detail, letting each shoe speak for itself.
    The world-class quality, trendy designs and affordable prices have
    captured the imagination of millions of people, across the country-
    making StepUp, an aspirational brand especially for - young adults,
    everyday performers and fashionistas.
        </p>
      </section>

      <section className="about-showcase">
  <img
    className="about-side-image"
    src="/images/about-main.jpg"
    alt="StepUp footwear collection"
  />

  <img
    className="about-center-image"
    src="/images/about-shoes.jpg"
    alt="Comfortable shoes from StepUp"
  />
</section>

      <section className="about-values">
        <article>
          <h3>Simplicity In Design</h3>
          <p>
             No flashy logos, no senseless details. Just the world’s most comfortable
      shoes, made naturally and designed practically. It’s that simple.
          </p>
        </article>

        <article>
          <h3>Confidence In Comfort</h3>
          <p>
             Trying is believing. Give our shoes a shot for 30 days, and if you’re not
      walking on cloud nine, we’ll take them back—no questions asked.
          </p>
        </article>

        <article>
          <h3>Made from Nature</h3>
          <p>
            The footwear industry often overlooks Mother Nature’s materials in favor
      of cheaper, synthetic alternatives. We think it’s time to change that.
          </p>
        </article>
      </section>
    </main>
  );
}

export default About;