 
"use client";

import Hero from "../components/home/Hero";
import dynamic from "next/dynamic";

const WorksPage = dynamic(() => import("./work/page"));
const ServicesPage = dynamic(() => import("./services/page"));
const Gallery = dynamic(() => import("./Gallery/page"));
const ContactForm = dynamic(() => import("./contactform/page"));
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
