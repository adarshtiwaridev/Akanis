 
import Hero from "../components/home/Hero";
import AboutPage from "./about/page";
import ContactForm from "./contactform/page"; 
import Gallery from "./Gallery/page";
import ServicesPage from "./services/page";
import WorksPage from "./work/page";
export default function HomePage() {
  return (
    <section>
      <section id="hero">
        <Hero />
      </section>
      <section id ="work"
      >
        <WorksPage />
      </section>
      {/* <section id="about">
        <AboutPage/>
      </section> */}
      <section id="services">
        <ServicesPage />
      </section>

   <section id="gallery">
   <Gallery/>
      </section>
      <section id="contact">
        <ContactForm />
      </section>
    </section>
  );
}
