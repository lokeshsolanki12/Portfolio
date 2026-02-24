import { useState } from "react";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="fixed top-0 left-0 w-full z-50 backdrop-blur-md bg-white/10 border-b border-white/20 shadow-lg">
      <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
        
        {/* Logo */}
        <h1 className="text-2xl font-bold text-white">
          Lokesh<span className="text-cyan-400">.dev</span>
        </h1>

        {/* Desktop Menu */}
        <ul className="hidden md:flex gap-8 text-white font-medium">
          <li className="hover:text-cyan-400 cursor-pointer">
            <a href="#home">Home</a>
          </li>
          <li className="hover:text-cyan-400 cursor-pointer">
            <a href="#about">About</a>
          </li>
          <li className="hover:text-cyan-400 cursor-pointer">
            <a href="#projects">Projects</a>
          </li>
          <li className="hover:text-cyan-400 cursor-pointer">
            <a href="#contact">Contact</a>
          </li>
        </ul>

        {/* Mobile Button */}
        <button
          className="md:hidden text-white"
          onClick={() => setIsOpen(!isOpen)}
        >
          ☰
        </button>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden bg-black/80 backdrop-blur-md">
          <ul className="flex flex-col items-center gap-6 py-6 text-white">
            <li><a href="#home">Home</a></li>
            <li><a href="#about">About</a></li>
            <li><a href="#projects">Projects</a></li>
            <li><a href="#contact">Contact</a></li>
          </ul>
        </div>
      )}
    </nav>
  );
};

export default Navbar;