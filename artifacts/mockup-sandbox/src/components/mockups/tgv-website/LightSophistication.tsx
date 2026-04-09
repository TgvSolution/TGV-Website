import React, { useEffect, useState } from "react";
import { motion, useScroll, useTransform, AnimatePresence } from "framer-motion";
import { 
  ChevronRight, 
  ArrowUpRight, 
  ShieldCheck, 
  Code2, 
  Layers,
  Lock,
  FileCheck2,
  Menu,
  X
} from "lucide-react";
import { Button } from "@/components/ui/button";

const GOLD = "#C9A96E";
const DARK = "#1A1A1A";
const LIGHT = "#FCFCFC";
const CREAM = "#F5F5F0";

const fadeInUp = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] } }
};

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.1 }
  }
};

export function LightSophistication() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { scrollY } = useScroll();
  const heroY = useTransform(scrollY, [0, 1000], [0, 200]);
  const heroOpacity = useTransform(scrollY, [0, 800], [1, 0]);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div className="min-h-screen bg-[#FCFCFC] text-[#1A1A1A] font-sans selection:bg-[#C9A96E] selection:text-white overflow-x-hidden">
      {/* Navigation */}
      <nav 
        className={`fixed top-0 w-full z-50 transition-all duration-500 ${
          isScrolled ? "bg-white/80 backdrop-blur-md py-4 border-b border-black/5" : "bg-transparent py-6"
        }`}
      >
        <div className="container mx-auto px-6 md:px-12 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-[#1A1A1A] rounded-sm flex items-center justify-center relative overflow-hidden group">
              <span className="text-[#C9A96E] font-serif italic text-xl relative z-10">S</span>
              <div className="absolute inset-0 bg-[#C9A96E] transform translate-y-full group-hover:translate-y-0 transition-transform duration-500 ease-out z-0" />
              <span className="text-white font-serif italic text-xl absolute z-10 opacity-0 group-hover:opacity-100 transition-opacity duration-500">S</span>
            </div>
            <span className="font-serif tracking-wide text-lg font-medium">Solution TGV</span>
          </div>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center gap-10 text-sm font-medium tracking-wide">
            <a href="#expertise" className="hover:text-[#C9A96E] transition-colors relative group">
              Expertise
              <span className="absolute -bottom-1 left-0 w-0 h-[1px] bg-[#C9A96E] transition-all duration-300 group-hover:w-full" />
            </a>
            <a href="#products" className="hover:text-[#C9A96E] transition-colors relative group">
              Products
              <span className="absolute -bottom-1 left-0 w-0 h-[1px] bg-[#C9A96E] transition-all duration-300 group-hover:w-full" />
            </a>
            <a href="#about" className="hover:text-[#C9A96E] transition-colors relative group">
              About
              <span className="absolute -bottom-1 left-0 w-0 h-[1px] bg-[#C9A96E] transition-all duration-300 group-hover:w-full" />
            </a>
            <Button className="bg-[#1A1A1A] text-white hover:bg-[#C9A96E] rounded-none px-6 py-5 h-auto uppercase text-xs tracking-widest transition-colors duration-300">
              Get in Touch
            </Button>
          </div>

          {/* Mobile Toggle */}
          <button className="md:hidden text-[#1A1A1A]" onClick={() => setMobileMenuOpen(true)}>
            <Menu className="w-6 h-6" />
          </button>
        </div>
      </nav>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, x: '100%' }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: '100%' }}
            transition={{ type: "spring", damping: 25, stiffness: 200 }}
            className="fixed inset-0 z-50 bg-[#FCFCFC] flex flex-col pt-24 px-8"
          >
            <button className="absolute top-6 right-6" onClick={() => setMobileMenuOpen(false)}>
              <X className="w-8 h-8 text-[#1A1A1A]" />
            </button>
            <div className="flex flex-col gap-8 text-3xl font-serif mt-12">
              <a href="#expertise" onClick={() => setMobileMenuOpen(false)} className="hover:text-[#C9A96E] transition-colors">Expertise</a>
              <a href="#products" onClick={() => setMobileMenuOpen(false)} className="hover:text-[#C9A96E] transition-colors">Products</a>
              <a href="#about" onClick={() => setMobileMenuOpen(false)} className="hover:text-[#C9A96E] transition-colors">About</a>
            </div>
            <div className="mt-auto mb-12">
              <Button className="w-full bg-[#1A1A1A] text-white hover:bg-[#C9A96E] rounded-none py-6 h-auto uppercase text-sm tracking-widest">
                Start a Conversation
              </Button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Hero Section */}
      <section className="relative min-h-[100dvh] flex items-center pt-24 pb-12 overflow-hidden">
        <div className="container mx-auto px-6 md:px-12 relative z-10 grid md:grid-cols-12 gap-12 items-center">
          <motion.div 
            className="md:col-span-7 flex flex-col justify-center"
            initial="hidden"
            animate="visible"
            variants={staggerContainer}
          >
            <motion.div variants={fadeInUp} className="flex items-center gap-4 mb-8">
              <div className="w-12 h-[1px] bg-[#C9A96E]" />
              <span className="text-[#C9A96E] font-medium tracking-widest uppercase text-sm">Digital Architecture</span>
            </motion.div>
            
            <motion.h1 
              variants={fadeInUp}
              className="text-5xl md:text-7xl lg:text-8xl font-serif font-light leading-[1.1] mb-8"
            >
              Crafting <br />
              <span className="italic text-[#C9A96E]">bespoke</span> software <br />
              solutions.
            </motion.h1>
            
            <motion.p 
              variants={fadeInUp}
              className="text-lg md:text-xl text-black/60 max-w-lg mb-12 font-light leading-relaxed"
            >
              We engineer custom applications that elevate business operations, combining technical precision with uncompromising elegance.
            </motion.p>
            
            <motion.div variants={fadeInUp} className="flex flex-wrap items-center gap-6">
              <Button className="bg-[#1A1A1A] text-white hover:bg-[#C9A96E] rounded-none px-8 py-7 h-auto uppercase text-xs tracking-widest group transition-all duration-300">
                Explore our work
                <ArrowUpRight className="ml-2 w-4 h-4 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
              </Button>
            </motion.div>
          </motion.div>
          
          <motion.div 
            className="md:col-span-5 relative h-[60vh] md:h-[80vh] w-full mt-12 md:mt-0"
            style={{ y: heroY, opacity: heroOpacity }}
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1], delay: 0.2 }}
          >
            <div className="absolute inset-0 bg-[#F5F5F0] -rotate-3 rounded-sm transform origin-bottom-left" />
            <div className="absolute inset-0 overflow-hidden rounded-sm shadow-2xl">
              <img 
                src="/__mockup/images/hero-light.png" 
                alt="Minimalist architecture representing digital structure" 
                className="w-full h-full object-cover object-center"
              />
              <div className="absolute inset-0 bg-gradient-to-tr from-black/10 to-transparent" />
            </div>
          </motion.div>
        </div>
        
        {/* Scroll Indicator */}
        <motion.div 
          className="absolute bottom-12 left-6 md:left-12 flex flex-col items-center gap-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5, duration: 1 }}
        >
          <span className="text-[10px] uppercase tracking-[0.2em] font-medium rotate-90 origin-left translate-x-[0.35rem] text-black/40">Scroll</span>
          <div className="w-[1px] h-16 bg-black/10 relative overflow-hidden mt-8">
            <motion.div 
              className="w-full h-1/2 bg-[#C9A96E]"
              animate={{ y: ["-100%", "200%"] }}
              transition={{ repeat: Infinity, duration: 2, ease: "linear" }}
            />
          </div>
        </motion.div>
      </section>

      {/* Expertise Section */}
      <section id="expertise" className="py-32 bg-white relative">
        <div className="container mx-auto px-6 md:px-12">
          <div className="grid md:grid-cols-2 gap-24 items-start">
            <div className="sticky top-32">
              <h2 className="text-4xl md:text-5xl font-serif font-light mb-8">
                The architecture <br />
                of <span className="italic text-[#C9A96E]">performance.</span>
              </h2>
              <p className="text-black/60 font-light text-lg mb-12 max-w-md leading-relaxed">
                We believe that enterprise software doesn't have to be sterile. We bring the meticulous attention to detail of luxury design to complex IT systems.
              </p>
              
              <div className="w-full aspect-[4/3] relative overflow-hidden rounded-sm group">
                <img 
                  src="/__mockup/images/office-light.png" 
                  alt="Professional office environment"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
                />
              </div>
            </div>
            
            <div className="flex flex-col gap-16 md:pt-32">
              {[
                { 
                  icon: <Code2 strokeWidth={1} size={32} />, 
                  title: "Custom Web Applications", 
                  desc: "Tailored software solutions built from the ground up to match your exact business processes, with clean code and intuitive interfaces." 
                },
                { 
                  icon: <ShieldCheck strokeWidth={1} size={32} />, 
                  title: "Secure Data Infrastructure", 
                  desc: "Bank-grade encryption, strict compliance adherence, and robust architecture to protect what matters most." 
                },
                { 
                  icon: <Layers strokeWidth={1} size={32} />, 
                  title: "System Integration", 
                  desc: "Seamlessly connecting disjointed tools into a unified, elegant workflow that reduces friction and amplifies productivity." 
                }
              ].map((item, i) => (
                <motion.div 
                  key={i}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-100px" }}
                  transition={{ duration: 0.8, delay: i * 0.1 }}
                  className="group"
                >
                  <div className="text-[#C9A96E] mb-6 transform group-hover:-translate-y-2 transition-transform duration-300">
                    {item.icon}
                  </div>
                  <h3 className="text-2xl font-serif mb-4">{item.title}</h3>
                  <p className="text-black/60 font-light leading-relaxed">{item.desc}</p>
                  <div className="w-12 h-[1px] bg-black/10 mt-8 group-hover:w-full group-hover:bg-[#C9A96E] transition-all duration-700 ease-out" />
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Featured Products Showcase */}
      <section id="products" className="py-32 bg-[#F5F5F0] border-y border-black/5">
        <div className="container mx-auto px-6 md:px-12">
          <div className="text-center mb-24 flex flex-col items-center">
            <span className="text-[#C9A96E] font-medium tracking-widest uppercase text-xs mb-4 block">Our Portfolio</span>
            <h2 className="text-4xl md:text-5xl font-serif font-light mb-6">Signature Products</h2>
            <div className="w-px h-16 bg-black/10" />
          </div>

          <div className="flex flex-col gap-32">
            {/* SecurFich */}
            <div className="grid md:grid-cols-2 gap-16 items-center">
              <motion.div 
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8 }}
                className="order-2 md:order-1 relative"
              >
                <div className="absolute -inset-4 bg-white shadow-xl rotate-1 rounded-sm opacity-50" />
                <div className="relative overflow-hidden shadow-2xl rounded-sm">
                  <div className="absolute inset-0 bg-black/5 mix-blend-multiply z-10 pointer-events-none" />
                  <img 
                    src="/__mockup/images/securfich-ui.png" 
                    alt="SecurFich Portal Interface" 
                    className="w-full aspect-[4/3] object-cover hover:scale-105 transition-transform duration-1000"
                  />
                </div>
              </motion.div>
              
              <motion.div 
                initial={{ opacity: 0, x: 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8 }}
                className="order-1 md:order-2 flex flex-col justify-center"
              >
                <div className="inline-flex items-center gap-2 text-xs font-medium tracking-wider uppercase mb-6 text-black/40">
                  <Lock size={14} className="text-[#C9A96E]" />
                  Secure Portal
                </div>
                <h3 className="text-4xl font-serif mb-6">SecurFich</h3>
                <p className="text-black/60 font-light text-lg mb-8 leading-relaxed">
                  A Quebec Bill 25 compliant secure document sharing portal designed exclusively for CPAs, accountants, and professional firms.
                </p>
                <ul className="flex flex-col gap-4 mb-10">
                  {['AES-256 Encryption', 'White-label Branding', 'Document Lifecycle Management', 'Consent Tracking & Built-in Antivirus'].map((feat, i) => (
                    <li key={i} className="flex items-center gap-3 text-sm font-medium text-black/80">
                      <div className="w-1.5 h-1.5 rounded-full bg-[#C9A96E]" />
                      {feat}
                    </li>
                  ))}
                </ul>
                <a 
                  href="https://securfich.ca" 
                  target="_blank" 
                  rel="noreferrer"
                  className="inline-flex items-center gap-2 text-sm uppercase tracking-widest font-medium group text-[#1A1A1A] w-fit"
                >
                  Visit SecurFich
                  <span className="w-8 h-[1px] bg-black group-hover:w-16 group-hover:bg-[#C9A96E] transition-all duration-300 ml-2" />
                </a>
              </motion.div>
            </div>

            {/* Tempett */}
            <div className="grid md:grid-cols-2 gap-16 items-center">
              <motion.div 
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8 }}
                className="flex flex-col justify-center"
              >
                <div className="inline-flex items-center gap-2 text-xs font-medium tracking-wider uppercase mb-6 text-black/40">
                  <FileCheck2 size={14} className="text-[#C9A96E]" />
                  Web Application
                </div>
                <h3 className="text-4xl font-serif mb-6">Tempett</h3>
                <p className="text-black/60 font-light text-lg mb-8 leading-relaxed">
                  A refined web application demonstrating our capability to build intuitive, high-performance data management solutions that users actually enjoy working with.
                </p>
                <ul className="flex flex-col gap-4 mb-10">
                  {['Custom Workflows', 'Real-time Synchronization', 'Advanced Data Visualization', 'Role-based Access Control'].map((feat, i) => (
                    <li key={i} className="flex items-center gap-3 text-sm font-medium text-black/80">
                      <div className="w-1.5 h-1.5 rounded-full bg-[#C9A96E]" />
                      {feat}
                    </li>
                  ))}
                </ul>
                <a 
                  href="https://4f19c4ff-b865-4e6f-8a77-9861c311db86-00-1f55lbcjb3mos.worf.replit.dev/" 
                  target="_blank" 
                  rel="noreferrer"
                  className="inline-flex items-center gap-2 text-sm uppercase tracking-widest font-medium group text-[#1A1A1A] w-fit"
                >
                  View Application
                  <span className="w-8 h-[1px] bg-black group-hover:w-16 group-hover:bg-[#C9A96E] transition-all duration-300 ml-2" />
                </a>
              </motion.div>

              <motion.div 
                initial={{ opacity: 0, x: 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8 }}
                className="relative"
              >
                <div className="absolute -inset-4 bg-white shadow-xl -rotate-1 rounded-sm opacity-50" />
                <div className="relative overflow-hidden shadow-2xl rounded-sm">
                  <div className="absolute inset-0 bg-black/5 mix-blend-multiply z-10 pointer-events-none" />
                  <img 
                    src="/__mockup/images/tempett-ui.png" 
                    alt="Tempett Interface" 
                    className="w-full aspect-[4/3] object-cover hover:scale-105 transition-transform duration-1000"
                  />
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      </section>

      {/* Philosophy Section */}
      <section className="py-32 bg-white text-center px-6">
        <div className="container mx-auto max-w-4xl">
          <div className="w-12 h-12 mx-auto bg-[#1A1A1A] rounded-sm flex items-center justify-center mb-12">
            <span className="text-[#C9A96E] font-serif italic text-2xl">S</span>
          </div>
          <motion.blockquote 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-3xl md:text-5xl font-serif font-light leading-snug mb-12"
          >
            "We build software like a master watchmaker builds a timepiece — <span className="italic text-[#C9A96E]">with invisible precision</span> beneath an immaculate surface."
          </motion.blockquote>
          <div className="flex justify-center gap-2">
            <div className="w-1.5 h-1.5 rounded-full bg-[#C9A96E]" />
            <div className="w-1.5 h-1.5 rounded-full bg-black/20" />
            <div className="w-1.5 h-1.5 rounded-full bg-black/20" />
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-32 bg-[#1A1A1A] text-white relative overflow-hidden">
        <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/stardust.png')] opacity-10 mix-blend-overlay" />
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-[#C9A96E] rounded-full blur-[150px] opacity-10 translate-x-1/2 -translate-y-1/2" />
        
        <div className="container mx-auto px-6 md:px-12 relative z-10 text-center">
          <span className="text-[#C9A96E] font-medium tracking-widest uppercase text-xs mb-6 block">Begin the conversation</span>
          <h2 className="text-4xl md:text-6xl font-serif font-light mb-10 max-w-2xl mx-auto">
            Ready to elevate your digital infrastructure?
          </h2>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
            <Button className="bg-[#C9A96E] text-[#1A1A1A] hover:bg-white rounded-none px-10 py-7 h-auto uppercase text-xs tracking-widest transition-colors duration-300">
              Request a Consultation
            </Button>
            <Button variant="outline" className="border-white/20 text-white hover:bg-white/5 rounded-none px-10 py-7 h-auto uppercase text-xs tracking-widest transition-colors duration-300 bg-transparent">
              Contact Support
            </Button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-[#1A1A1A] text-white/50 py-12 border-t border-white/10">
        <div className="container mx-auto px-6 md:px-12 grid md:grid-cols-4 gap-12 text-sm font-light">
          <div className="col-span-1 md:col-span-2">
            <div className="flex items-center gap-3 mb-6 text-white">
              <div className="w-8 h-8 bg-white/5 rounded-sm flex items-center justify-center border border-white/10">
                <span className="text-[#C9A96E] font-serif italic text-lg">S</span>
              </div>
              <span className="font-serif tracking-wide text-lg">Solution TGV</span>
            </div>
            <p className="max-w-xs leading-relaxed mb-6">
              Precision-engineered software solutions for enterprises that demand excellence.
            </p>
            <p className="text-white/30 text-xs">
              © {new Date().getFullYear()} Solution TGV. All rights reserved.
            </p>
          </div>
          
          <div>
            <h4 className="text-white font-medium uppercase tracking-widest text-xs mb-6">Products</h4>
            <ul className="flex flex-col gap-4">
              <li><a href="https://securfich.ca" className="hover:text-[#C9A96E] transition-colors">SecurFich Portal</a></li>
              <li><a href="#" className="hover:text-[#C9A96E] transition-colors">Tempett Application</a></li>
              <li><a href="#" className="hover:text-[#C9A96E] transition-colors">Custom Development</a></li>
            </ul>
          </div>
          
          <div>
            <h4 className="text-white font-medium uppercase tracking-widest text-xs mb-6">Company</h4>
            <ul className="flex flex-col gap-4">
              <li><a href="#" className="hover:text-[#C9A96E] transition-colors">About Us</a></li>
              <li><a href="#" className="hover:text-[#C9A96E] transition-colors">Contact</a></li>
              <li><a href="#" className="hover:text-[#C9A96E] transition-colors">Privacy Policy</a></li>
            </ul>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default LightSophistication;
