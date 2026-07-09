import Navbar from './components/Navbar';
import Hero from './components/Hero';
import About from './components/About';
import Services from './components/Services';
import Portfolio from './components/Portfolio';
import Process from './components/Process';
import Contact from './components/Contact';
import Footer from './components/Footer';

function App() {
  return (
    <div className="bg-cream min-h-screen text-charcoal flex flex-col w-full relative overflow-x-hidden">
      {/* Decorative ambient light leaks drifting across the whole page */}
      <div className="absolute top-1/4 right-0 w-[45vw] h-[45vw] rounded-full bg-gold/5 blur-[160px] pointer-events-none animate-float-1 z-0" />
      <div className="absolute top-2/3 left-0 w-[40vw] h-[40vw] rounded-full bg-gold-light/5 blur-[160px] pointer-events-none animate-float-2 z-0" />
      
      <Navbar />
      <main className="flex-grow w-full relative z-10">
        <Hero />
        <About />
        <Services />
        <Portfolio />
        <Process />
        <Contact />
      </main>
      <Footer />
    </div>
  );
}

export default App;

