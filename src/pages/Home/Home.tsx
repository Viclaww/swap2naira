import Hero from "./components/Hero.js";
import Navbar from "../../components/Navbar.js";
import Features from "./components/Features.js";
import Testimonials from "./components/Testimonials.js";
import FAQSection from "./components/FAQs.js";
import Footer from "../../components/Footer.js";
function Home() {
  return (
    <div className="w-screen ran overflow-hidden">
      <Navbar />
      <Hero />
      <Features />
      <Testimonials />
      <FAQSection />
      <Footer />
    </div>
  );
}

export default Home;
