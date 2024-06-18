import Hero from "./components/Hero.js";
import Navbar from "../../components/Navbar.js";
import Features from "./components/Features.js";
import Testimonials from "./components/Testimonials.js";
import FAQ from "./components/FAQ.js";
function Home() {
  return (
    <div className="w-screen overflow-hidden">
      <Navbar />
      <Hero />
      <Features />
      <Testimonials />
      <FAQ />
    </div>
  );
}

export default Home;
