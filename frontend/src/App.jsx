import { motion } from "framer-motion";
import profilePic from "./assets/profile.jpg";
import Navbar from "./components/Navbar";
import "./App.css";

function App() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-black to-slate-900 text-white pt-24">
      
      {/* Navbar */}
      <Navbar />

      {/* Hero Section */}
      <section
        id="home"
        className="min-h-screen flex flex-col-reverse md:flex-row items-center justify-center gap-10 px-6 max-w-7xl mx-auto"
      >
        {/* Left Content */}
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
            whileHover={{ scale: 1.08 }}
            whileTap={{ scale: 0.95 }}
            className="bg-cyan-500 hover:bg-cyan-600 px-6 py-3 rounded-lg font-semibold transition"
          >
            View Projects
          </motion.button>
        </motion.div>

        {/* Right Image */}
        <motion.div
          className="flex justify-center"
          initial={{ opacity: 0, x: 60 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
        >
          <img
            src={profilePic}
            alt="Lokesh Solanki"
            className="w-64 h-64 md:w-80 md:h-80 object-cover rounded-full border-4 border-cyan-400 shadow-lg"
          />
        </motion.div>
      </section>

      {/* About */}
<motion.section
  id="about"
  className="py-20 px-6 max-w-5xl mx-auto text-center"
  initial={{ opacity: 0, y: 60 }}
  whileInView={{ opacity: 1, y: 0 }}
  viewport={{ once: true }}
  transition={{ duration: 0.7 }}
>
  <h2 className="text-3xl font-bold mb-6">About Me</h2>
  <p className="text-gray-300">
    I am a passionate DevOps and Cloud Engineer focused on building
    scalable, automated, and reliable infrastructure solutions.
  </p>
</motion.section>

      {/* Projects */}
<motion.section
  id="projects"
  className="py-20 px-6 max-w-6xl mx-auto text-center"
  initial={{ opacity: 0, y: 60 }}
  whileInView={{ opacity: 1, y: 0 }}
  viewport={{ once: true }}
  transition={{ duration: 0.7 }}
>
  <h2 className="text-3xl font-bold mb-10">Projects</h2>

  <motion.div
    whileHover={{ scale: 1.05 }}
    className="bg-white/10 backdrop-blur-md border border-white/20 rounded-xl p-6 transition"
  >
    <h3 className="text-xl font-semibold mb-2">Home Automation</h3>
    <p className="text-gray-300">
      Arduino based smart home automation project.
    </p>
  </motion.div>
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
      className="p-3 rounded-lg bg-white/10 border border-white/20 focus:outline-none"
      placeholder="Your Name"
    />
    <input
      className="p-3 rounded-lg bg-white/10 border border-white/20 focus:outline-none"
      placeholder="Your Email"
    />
    <textarea
      className="p-3 rounded-lg bg-white/10 border border-white/20 focus:outline-none"
      placeholder="Message"
      rows="4"
    ></textarea>

    <motion.button
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

export default App;