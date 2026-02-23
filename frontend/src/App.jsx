import "./App.css";

function App() {
  return (
    <div className="container">
      {/* Navbar */}
      <nav className="navbar">
        <h2>Lokesh</h2>
        <ul>
          <li>Home</li>
          <li>About</li>
          <li>Projects</li>
          <li>Contact</li>
        </ul>
      </nav>

      {/* Hero Section */}
      <section className="hero">
        <h1>Hi, I'm Lokesh Solanki</h1>
        <p>DevOps & Cloud Engineer</p>
        <button>View Projects</button>
      </section>

      {/* About */}
      <section className="about">
        <h2>About Me</h2>
        <p>
          
        </p>
      </section>

      {/* Projects */}
      <section className="projects">
        <h2>Projects</h2>
        <div className="card">
          <h3>Home Automation</h3>
          <p>Arduino based smart home automation project.</p>
        </div>
      </section>

      {/* Contact */}
      <section className="contact">
        <h2>Contact Me</h2>
        <input placeholder="Your Name" />
        <input placeholder="Your Email" />
        <textarea placeholder="Message"></textarea>
        <button>Send</button>
      </section>
    </div>
  );
}

export default App
