import React from "react";
import Navbar from "./components/Navbar";
import Header from "./components/Header";
import About from "./components/About";
import Experience from "./components/Experience";
import Projects from "./components/Projects";
import Skills from "./components/Skills";
import Contact from "./components/Contact";
import Cursor from "./components/Cursor";

const App = () => {
  return (
    <div>
      <Cursor />
      <Navbar />
      <Header />
      {/* <About /> */}
      <Experience />
      <Projects />
      <Skills />
      <Contact />
    </div>
  );
};

export default App;
