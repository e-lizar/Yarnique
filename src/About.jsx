// About.jsx
import "./About.css";
import { Link } from "react-router-dom";

function About() {
  return (
    <div className="about-page">

      {/* Hero Section */}
      <section className="about-hero">

        <div className="floating-circle circle1"></div>
        <div className="floating-circle circle2"></div>
        <div className="floating-circle circle3"></div>

        <div className="hero-overlay">

          <span className="hero-tag">
            Handmade Crochet Boutique 🧶
          </span>

          <h1>About Yarnique</h1>

          <p>
            Every stitch tells a story 🧶💖
          </p>

        </div>

      </section>

      {/* Story Section */}
      <section className="story-section">

        <div className="story-card">

          <h2>Our Story</h2>

          <p>
            Yarnique was born from a passion for crochet,
            creativity, and handmade beauty.

            What started as a hobby quickly grew into
            a dream of creating meaningful handmade
            pieces that bring warmth, confidence, and
            happiness to people.

            Every stitch is carefully crafted with
            patience, love, and attention to detail,
            making every creation unique and special.
          </p>

        </div>

      </section>

      {/* Mission Section */}
      <section className="mission-section">

        <div className="mission-card">

          <h2>Our Mission</h2>

          <p>
            To create beautiful handmade crochet
            creations that celebrate creativity,
            inspire confidence, and turn ordinary
            moments into lasting memories through
            personalized craftsmanship.
          </p>

        </div>

      </section>

      {/* Journey Section */}
      <section className="journey-section">

        <h2>Our Journey</h2>

        <div className="timeline">

          <div className="timeline-item">
            🌸 Started as a creative hobby
          </div>

          <div className="timeline-item">
            🧶 Began making custom crochet pieces
          </div>

          <div className="timeline-item">
            💖 Launched Yarnique Boutique
          </div>

          <div className="timeline-item">
            🌍 Growing and sharing handmade creations
          </div>

        </div>

      </section>

      <footer className="about-footer">
       <Link to="/" className="back-home">
        Home
      </Link>

      <p>© 2025 Yarnique 🧶💖</p>
      </footer>

    </div>
  );
}

export default  About;
