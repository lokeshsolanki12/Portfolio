import { motion } from "framer-motion";
import { useState } from "react";
import profilePic from "./assets/profile.jpg";
import Navbar from "./components/Navbar";
import "./App.css";
import automationImg from "./assets/Automation.jpg";
import portfolioImg from "./assets/portfolio.jpg";
import Admin from "./components/Admin";

const projects = [
  {
    title: "Linux Automation & Monitoring",
    description:
      "Automated disk and memory monitoring system using Bash scripting with email alerts using Postfix.",
    image: automationImg,
    github: "https://github.com/your-username/linux-monitoring",
    demo: "#",
    tech: ["Linux", "Bash", "Postfix"],
  },
  {
    title: "CI/CD Portfolio Deployment",
    description:
      "Full-stack portfolio deployment using GitHub Actions CI/CD pipeline.",
    image: portfolioImg,
    github: "https://github.com/your-username/portfolio-cicd",
    demo: "#",
    tech: ["React", "GitHub Actions", "CI/CD"],
  },
];

function App() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.placeholder.toLowerCase().replace("your ", "")]:
        e.target.value,
    });
  };

  const handleSubmit = async () => {
    try {
      const response = await fetch("http://127.0.0.1:5000/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });
      
      const API_URL = "https://portfolio-jk6c.onrender.com/contact";

      const data = await response.json();
      alert(data.message);

      setFormData({
        name: "",
        email: "",
        message: "",
      });
    } catch (error) {
      alert("Failed to send message");
      console.error(error);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-black to-slate-900 text-white pt-24">
      <Navbar />

      {/* Hero Section */}
      <section
          id="home"
          className="min-h-screen flex flex-col-reverse md:flex-row items-center justify-center gap-16 px-10 md:px-20 -mt-20"
          >
        <motion.div
          className="text-center md:text-left"
          initial={{ opacity: 0, x: -60 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
        >
          <h1 className="text-4xl md:text-6xl font-bold mb-4">
            Hi, I'm <span className="text-cyan-400">Lokesh Solanki</span>
          </h1>

          <p className="text-xl text-gray-300 mb-6">
            DevOps & Cloud Engineer
          </p>

          <motion.button
            onClick={() => {
              document.getElementById("projects").scrollIntoView({
                behavior: "smooth",
              });
            }}
            whileHover={{ scale: 1.08 }}
            whileTap={{ scale: 0.95 }}
            className="bg-cyan-500 hover:bg-cyan-600 px-6 py-3 rounded-lg font-semibold transition"
          >
            View Projects
          </motion.button>
        </motion.div>

        <motion.div
          className="flex justify-center"
          initial={{ opacity: 0, x: 60 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
        >
          <img
            src={profilePic}
            alt="Lokesh Solanki"
            className="w-72 h-72 md:w-96 md:h-96 object-cover rounded-full border-4 border-cyan-400 shadow-lg"
          />
        </motion.div>
      </section>

      {/* About */}
      <motion.section
  id="about"
  className="py-24 px-6 max-w-6xl mx-auto"
  initial={{ opacity: 0, y: 60 }}
  whileInView={{ opacity: 1, y: 0 }}
  viewport={{ once: true }}
  transition={{ duration: 0.7 }}
>
  <div className="grid md:grid-cols-2 gap-12 items-center">
    
    {/* Left Side */}
    <div>
      <h2 className="text-4xl font-bold mb-6">
        About <span className="text-cyan-400">Me</span>
      </h2>

      <p className="text-gray-300 mb-4 leading-relaxed">
        I am a passionate <span className="text-cyan-400">DevOps & Cloud Engineer</span> 
        with hands-on experience in Linux, automation, and CI/CD pipelines.
      </p>

      <p className="text-gray-400 mb-6 leading-relaxed">
        I specialize in building scalable infrastructure, automating workflows using 
        Bash scripting, and deploying applications using modern DevOps tools.
      </p>

      <div className="flex flex-wrap gap-3">
        <span className="bg-white/10 px-4 py-2 rounded-lg text-sm">Linux</span>
        <span className="bg-white/10 px-4 py-2 rounded-lg text-sm">Bash</span>
        <span className="bg-white/10 px-4 py-2 rounded-lg text-sm">GitHub Actions</span>
        <span className="bg-white/10 px-4 py-2 rounded-lg text-sm">CI/CD</span>
        <span className="bg-white/10 px-4 py-2 rounded-lg text-sm">AWS</span>
      </div>
    </div>

    {/* Right Side Cards */}
    <div className="grid grid-cols-2 gap-6">
      
      <div className="bg-white/10 backdrop-blur-md border border-white/20 rounded-xl p-6 text-center">
        <h3 className="text-2xl font-bold text-cyan-400">10+</h3>
        <p className="text-gray-300 text-sm">Projects</p>
      </div>

      <div className="bg-white/10 backdrop-blur-md border border-white/20 rounded-xl p-6 text-center">
        <h3 className="text-2xl font-bold text-cyan-400">DevOps</h3>
        <p className="text-gray-300 text-sm">Focus Area</p>
      </div>

      <div className="bg-white/10 backdrop-blur-md border border-white/20 rounded-xl p-6 text-center">
        <h3 className="text-2xl font-bold text-cyan-400">Automation</h3>
        <p className="text-gray-300 text-sm">Experience</p>
      </div>

      <div className="bg-white/10 backdrop-blur-md border border-white/20 rounded-xl p-6 text-center">
        <h3 className="text-2xl font-bold text-cyan-400">Cloud</h3>
        <p className="text-gray-300 text-sm">Learning</p>
      </div>

    </div>
  </div>
</motion.section>

      {/* Projects */}
      <motion.section
        id="projects"
        className="py-20 px-6 max-w-7xl mx-auto text-center"
        initial={{ opacity: 0, y: 60 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.7 }}
      >
        <h2 className="text-3xl font-bold mb-12">Projects</h2>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {projects.map((project, index) => (
            <motion.div
              key={index}
              whileHover={{ scale: 1.05 }}
              className="bg-white/10 backdrop-blur-md border border-white/20 rounded-xl overflow-hidden shadow-lg hover:shadow-cyan-500/20 transition"
            >
              <div
                className="h-48 w-full bg-cover bg-center relative"
                style={{
                  backgroundImage: `url(${project.image})`,
                }}
              >
                <div className="absolute inset-0 bg-black/40"></div>
              </div>

              <div className="p-5 text-left">
                <h3 className="text-xl font-semibold mb-2">
                  {project.title}
                </h3>

                <p className="text-gray-300 mb-4">
                  {project.description}
                </p>

                <div className="flex flex-wrap gap-2 mb-4">
                  {project.tech.map((tech, i) => (
                    <span
                      key={i}
                      className="bg-cyan-500/20 text-cyan-400 px-3 py-1 text-xs rounded-full"
                    >
                      {tech}
                    </span>
                  ))}
                </div>

                <div className="flex gap-4">
                  <a
                    href={project.github}
                    target="_blank"
                    className="bg-gray-800 hover:bg-gray-700 px-4 py-2 rounded-lg text-sm"
                  >
                    GitHub
                  </a>

                  <a
                    href={project.demo}
                    target="_blank"
                    className="bg-cyan-500 hover:bg-cyan-600 px-4 py-2 rounded-lg text-sm"
                  >
                    Live Demo
                  </a>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </motion.section>

      {/* Contact */}
      <motion.section
        id="contact"
        className="py-20 px-6 max-w-3xl mx-auto text-center"
        initial={{ opacity: 0, y: 60 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.7 }}
      >
        <h2 className="text-3xl font-bold mb-8">Contact Me</h2>

        <div className="flex flex-col gap-4">
          <input
            value={formData.name}
            onChange={handleChange}
            className="p-3 rounded-lg bg-white/10 border border-white/20 focus:outline-none"
            placeholder="Your Name"
          />

          <input
            value={formData.email}
            onChange={handleChange}
            className="p-3 rounded-lg bg-white/10 border border-white/20 focus:outline-none"
            placeholder="Your Email"
          />

          <textarea
            value={formData.message}
            onChange={handleChange}
            className="p-3 rounded-lg bg-white/10 border border-white/20 focus:outline-none"
            placeholder="Message"
            rows="4"
          ></textarea>

          <motion.button
            onClick={handleSubmit}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="bg-cyan-500 hover:bg-cyan-600 px-6 py-3 rounded-lg font-semibold transition"
          >
            Send
          </motion.button>
        </div>
      </motion.section>
    </div>
  );
}
{/* Admin Section */}
<section id="admin">
  <Admin />
</section>

export default App;