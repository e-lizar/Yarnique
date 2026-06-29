import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "./App.css";

import helloKitty from "./assets/two-piece-hello-kitty-set.jpeg";
import ribbonSkirt from "./assets/ribbon-skirt.jpeg";
import backlessDress from "./assets/backless-dress.jpeg";
import shoulderBag from "./assets/shoulder-bag.jpeg";

function Home() {
  const [greeting, setGreeting] = useState("");

  useEffect(() => {
    const hour = new Date().getHours();

    if (hour < 12) {
      setGreeting("Good Morning");
    } else if (hour < 18) {
      setGreeting("Good Afternoon");
    } else {
      setGreeting("Good Evening");
    }
  }, []);
  const products = [
  {
    id: 1,
    name: "Crochet Hello Kitty bikini ",
    price: "$45",
    image: helloKitty
  },
  {
    id: 2,
    name: "Crochet Skirt Ribbon",
    price: "$28",
    image: ribbonSkirt
  },
  {
    id: 3,
    name: "Croche Mini dress",
    price: "$20",
    image: backlessDress
  },
    
  {
    id: 4,
    name: "Croche Bag",
    price: "$75",
    image: shoulderBag
  }
];
  return (
    <div className="app">

      {/* Navbar */}

      <nav className="navbar">
        <div className="logo">
          {greeting},
           Welcome to Yarnique ❣
        </div>

        <ul className="nav-links">
          <li><Link to="/About">About</Link></li>
          <li><Link to="/Register">Account😊</Link></li>
        </ul>
      </nav>

      {/* Hero */}

      <section className="hero">

        <div className="hero-content">

          <span className="tagline">
            Handcrafted Crochet Boutique
          </span>

          <h1>
            Made with Love🧶,
            <br />
            Just for you ❤,

          </h1>

          <p>
            Handmade crochet pieces crafted with love.
            Discover unique accessories, gifts,
            and custom creations made just for you.
          </p>

          <div className="hero-buttons">
            <Link to="/custom-order">
            <button className="primary-btn">
              Custom Order
            </button>
            </Link>

            <Link to="/explore">
            <button className="secondary-btn">
              Explore Collection
            </button>
            </Link>
          </div>

        </div>

       </section>

      <section className="products-section">

       <h2>Featured Products</h2>

       <div className="products-grid">

       {products.map((product) => (
        <div className="product-card" key={product.id}>

          <img
          src={product.image}
          alt={product.name}
         />

         <h3>{product.name}</h3>
    

        </div>
       ))}

       </div>

      </section>

      <section className="trust-section">

        <h2>Why Choose Yarnique?</h2>

       <div className="trust-grid">

       <div className="trust-card">
       <h3>🧶 Handmade With Love</h3>
       <p>
        Every crochet piece is carefully handcrafted
        with patience, creativity, and attention to detail.
       </p>
       </div>

       <div className="trust-card">
       <h3>🎨 Custom Orders</h3>
       <p>
        Looking for something unique?
        We create personalized crochet pieces just for you.
       </p>
       </div>

       <div className="trust-card">
       <h3>🌸 Premium Quality</h3>
       <p>
        We use carefully selected yarns to ensure
        comfort, durability, and beauty.
       </p>
       </div>

       <div className="trust-card">
        <h3>💝 Perfect Gifts</h3>
        <p>
        Thoughtful handmade creations that make
        memorable gifts for loved ones.
        </p>
       </div>

       </div>
       

       </section>
       <footer className="footer">

       <div className="footer-content">

       <div className="footer-brand">

        <h3>Yarnique ❣</h3>

        <p>
        Handcrafted crochet creations made
        with love, creativity, and attention
        to detail.
        </p>

       </div>

       <div className="footer-links">

        <h4>Quick Links</h4>

        <Link to="/about">About</Link>
        <a href="/register">Account</a>

        </div>

       <div className="footer-contact">

        <h4>Get In Touch</h4>

        <p>Email: info@yarnique.com</p>
        <p>Phone: +254 XXX XXX XXX</p>

        </div>

       </div>

       <div className="footer-bottom">

       © 2025 Yarnique ❣. All Rights Reserved.

        </div>

       </footer>

    </div>
  );
}

export default Home;