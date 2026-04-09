import React, { useEffect, useState } from "react";
import { motion, useScroll, useTransform, AnimatePresence } from "framer-motion";
import { ArrowRight, Shield, Zap, Code, Lock, Server, ChevronRight, Menu, X, CheckCircle2 } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function BoldDynamic() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { scrollYProgress } = useScroll();

  const heroY = useTransform(scrollYProgress, [0, 0.2], [0, 150]);
  const heroOpacity = useTransform(scrollYProgress, [0, 0.15], [1, 0]);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { name: "Services", href: "#services" },
    { name: "Products", href: "#products" },
    { name: "Expertise", href: "#expertise" },
    { name: "Contact", href: "#contact" },
  ];

  return (
    <div className="min-h-screen bg-[#0A0A0A] text-[#FAFAFA] font-sans selection:bg-[#C9A96E] selection:text-[#0A0A0A] overflow-hidden">
      {/* Navigation */}
      <nav
        className={`fixed top-0 w-full z-50 transition-all duration-300 ${
          isScrolled ? "bg-[#0A0A0A]/90 backdrop-blur-md border-b border-[#222] py-4" : "bg-transparent py-6"
        }`}
      >
        <div className="container mx-auto px-6 md:px-12 flex justify-between items-center">
          <a href="#" className="flex items-center gap-3 group">
            <div className="relative w-12 h-12 overflow-hidden bg-black rounded-lg border border-[#333] group-hover:border-[#C9A96E] transition-colors flex items-center justify-center">
              <img src="/__mockup/images/logo.png" alt="Solution TGV" className="w-8 h-8 object-contain" />
            </div>
            <span className="text-xl font-serif font-bold tracking-wider text-white group-hover:text-[#C9A96E] transition-colors">Solution TGV</span>
          </a>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                className="text-sm font-medium text-gray-400 hover:text-[#C9A96E] transition-colors uppercase tracking-widest relative group"
              >
                {link.name}
                <span className="absolute -bottom-2 left-0 w-0 h-[2px] bg-[#C9A96E] transition-all duration-300 group-hover:w-full"></span>
              </a>
            ))}
            <Button className="bg-[#C9A96E] text-[#0A0A0A] hover:bg-[#D4B87C] font-bold rounded-none px-8 py-6 uppercase tracking-wider skew-x-[-10deg] transition-transform hover:scale-105">
              <span className="skew-x-[10deg]">Start a Project</span>
            </Button>
          </div>

          {/* Mobile Toggle */}
          <button className="md:hidden text-white" onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
            {mobileMenuOpen ? <X size={28} /> : <Menu size={28} />}
          </button>
        </div>
      </nav>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="fixed inset-0 z-40 bg-[#0A0A0A] pt-24 px-6 flex flex-col gap-6 md:hidden"
          >
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                onClick={() => setMobileMenuOpen(false)}
                className="text-2xl font-bold uppercase tracking-widest border-b border-[#222] pb-4"
              >
                {link.name}
              </a>
            ))}
          </motion.div>
        )}
      </AnimatePresence>

      {/* Hero Section */}
      <section className="relative min-h-[100dvh] flex items-center justify-center pt-20 overflow-hidden">
        {/* Abstract Background Elements */}
        <div className="absolute inset-0 z-0 opacity-40 mix-blend-screen pointer-events-none">
          <img src="/__mockup/images/tgv-hero-abstract.png" alt="" className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[#0A0A0A]/80 to-[#0A0A0A]"></div>
        </div>

        {/* Diagonal cut */}
        <div className="absolute bottom-0 left-0 w-full h-32 bg-[#0A0A0A] -skew-y-3 translate-y-16 z-10 origin-bottom-left"></div>

        <div className="container mx-auto px-6 md:px-12 z-20 relative">
          <motion.div style={{ y: heroY, opacity: heroOpacity }} className="max-w-5xl">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, ease: "easeOut" }}
              className="flex items-center gap-4 mb-6"
            >
              <div className="h-[2px] w-16 bg-[#C9A96E]"></div>
              <span className="text-[#C9A96E] uppercase tracking-[0.2em] font-bold text-sm md:text-base">Engineering The Future</span>
            </motion.div>
            
            <motion.h1
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
              className="text-6xl md:text-8xl lg:text-9xl font-extrabold uppercase leading-[0.85] tracking-tighter mb-8"
            >
              Unapologetic <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#C9A96E] to-[#E5C991]">Excellence.</span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4, ease: "easeOut" }}
              className="text-xl md:text-2xl text-gray-400 max-w-2xl font-light mb-12 border-l-4 border-[#C9A96E] pl-6"
            >
              We don't just build custom software. We engineer unfair advantages for businesses ready to dominate their market.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.6, ease: "easeOut" }}
              className="flex flex-col sm:flex-row gap-6"
            >
              <Button className="bg-[#C9A96E] text-[#0A0A0A] hover:bg-white h-16 px-10 text-lg uppercase tracking-widest font-bold rounded-none skew-x-[-10deg] transition-all hover:scale-105 group">
                <span className="skew-x-[10deg] flex items-center gap-3">
                  Our Work <ArrowRight className="group-hover:translate-x-2 transition-transform" />
                </span>
              </Button>
              <Button variant="outline" className="border-[#C9A96E] text-[#C9A96E] hover:bg-[#C9A96E] hover:text-[#0A0A0A] h-16 px-10 text-lg uppercase tracking-widest font-bold rounded-none skew-x-[-10deg] transition-all bg-transparent group">
                <span className="skew-x-[10deg]">Contact Us</span>
              </Button>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Stat Bar */}
      <section className="relative z-20 py-12 bg-[#C9A96E] text-[#0A0A0A] -skew-y-3 -translate-y-8">
        <div className="container mx-auto px-6 skew-y-3">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-4 text-center">
            {[
              { label: "Products Launched", value: "2+" },
              { label: "Compliance Focus", value: "Bill 25" },
              { label: "Encryption", value: "AES-256" },
              { label: "Client Satisfaction", value: "100%" },
            ].map((stat, i) => (
              <div key={i} className="flex flex-col items-center justify-center">
                <span className="text-4xl md:text-5xl font-black mb-2">{stat.value}</span>
                <span className="text-sm font-bold uppercase tracking-widest opacity-80">{stat.label}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section id="services" className="py-32 relative">
        <div className="container mx-auto px-6 md:px-12">
          <div className="flex flex-col md:flex-row justify-between items-end mb-20">
            <div className="max-w-2xl">
              <h2 className="text-4xl md:text-6xl font-black uppercase tracking-tighter mb-6">
                Our <span className="text-[#C9A96E]">Arsenal</span>
              </h2>
              <p className="text-xl text-gray-400">
                Precision engineering meets bold design. We build applications that don't just function—they perform.
              </p>
            </div>
            <Button variant="ghost" className="mt-8 md:mt-0 text-[#C9A96E] hover:text-white hover:bg-transparent uppercase tracking-widest font-bold group">
              View All Services <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-2 transition-transform" />
            </Button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                icon: <Code size={40} className="mb-6 text-[#C9A96E]" />,
                title: "Custom Web Apps",
                desc: "Tailored software solutions designed specifically for your operational workflows. We build fast, scalable, and resilient platforms.",
              },
              {
                icon: <Lock size={40} className="mb-6 text-[#C9A96E]" />,
                title: "Secure Portals",
                desc: "Quebec Bill 25 compliant environments. End-to-end encryption, strict access controls, and undeniable security.",
              },
              {
                icon: <Server size={40} className="mb-6 text-[#C9A96E]" />,
                title: "Enterprise Architecture",
                desc: "Robust backend systems, API development, and cloud infrastructure engineered to handle massive scale gracefully.",
              },
            ].map((service, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: i * 0.2 }}
                className="bg-[#111] p-10 border-t-4 border-transparent hover:border-[#C9A96E] transition-all duration-300 group hover:-translate-y-2 relative overflow-hidden"
              >
                <div className="absolute top-0 right-0 w-32 h-32 bg-[#C9A96E]/5 rounded-full blur-3xl -translate-y-16 translate-x-16 group-hover:bg-[#C9A96E]/10 transition-colors"></div>
                {service.icon}
                <h3 className="text-2xl font-bold mb-4 uppercase tracking-wider">{service.title}</h3>
                <p className="text-gray-400 leading-relaxed">{service.desc}</p>
                <div className="mt-8 opacity-0 group-hover:opacity-100 transition-opacity">
                  <span className="text-[#C9A96E] font-bold text-sm uppercase tracking-widest flex items-center">
                    Learn More <ChevronRight className="w-4 h-4 ml-1" />
                  </span>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Products Showcase */}
      <section id="products" className="py-32 bg-[#111] relative overflow-hidden">
        {/* Decorative giant letter */}
        <div className="absolute -right-20 top-10 text-[30rem] font-black text-white/[0.02] pointer-events-none leading-none select-none">
          S
        </div>
        
        <div className="container mx-auto px-6 md:px-12 relative z-10">
          <div className="mb-20">
            <h2 className="text-4xl md:text-6xl font-black uppercase tracking-tighter mb-6">
              Flagship <span className="text-[#C9A96E]">Products</span>
            </h2>
            <div className="w-24 h-1 bg-[#C9A96E]"></div>
          </div>

          {/* SecurFich */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center mb-32">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="order-2 lg:order-1 relative"
            >
              <div className="absolute inset-0 bg-gradient-to-tr from-[#C9A96E]/20 to-transparent blur-3xl rounded-full"></div>
              <img 
                src="/__mockup/images/tgv-securfich-mockup.png" 
                alt="SecurFich Portal" 
                className="w-full h-auto relative z-10 rounded-sm shadow-2xl shadow-black border border-[#222]"
              />
              <div className="absolute -bottom-8 -right-8 w-48 h-48 border border-[#C9A96E]/30 rounded-full animate-spin-slow pointer-events-none"></div>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="order-1 lg:order-2"
            >
              <div className="inline-block px-4 py-1 border border-[#C9A96E] text-[#C9A96E] text-xs font-bold uppercase tracking-widest mb-6 rounded-full">
                Quebec Bill 25 Compliant
              </div>
              <h3 className="text-4xl md:text-5xl font-black uppercase tracking-tighter mb-6">SecurFich</h3>
              <p className="text-xl text-gray-400 mb-8">
                The ultimate secure document sharing portal for CPAs, accountants, and professionals who demand absolute privacy and compliance.
              </p>
              
              <ul className="space-y-4 mb-10">
                {[
                  "White-label branding capabilities",
                  "Automated document lifecycle management",
                  "Built-in enterprise antivirus scanning",
                  "Consent tracking & AES-256 encryption"
                ].map((feature, i) => (
                  <li key={i} className="flex items-start gap-3 text-gray-300">
                    <Shield className="w-6 h-6 text-[#C9A96E] shrink-0" />
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>
              
              <Button className="bg-transparent border-2 border-white hover:bg-white hover:text-black rounded-none px-8 py-6 uppercase tracking-widest font-bold transition-colors">
                Visit SecurFich.ca
              </Button>
            </motion.div>
          </div>

          {/* Tempett */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <h3 className="text-4xl md:text-5xl font-black uppercase tracking-tighter mb-6">Tempett</h3>
              <p className="text-xl text-gray-400 mb-8">
                A powerful web application demonstrating our capability to build intuitive, high-performance interfaces backed by robust logic.
              </p>
              <ul className="space-y-4 mb-10">
                {[
                  "Seamless user experience",
                  "Real-time data processing",
                  "Responsive across all devices",
                  "Modern tech stack implementation"
                ].map((feature, i) => (
                  <li key={i} className="flex items-start gap-3 text-gray-300">
                    <CheckCircle2 className="w-6 h-6 text-[#C9A96E] shrink-0" />
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>
              <Button className="bg-transparent border-2 border-white hover:bg-white hover:text-black rounded-none px-8 py-6 uppercase tracking-widest font-bold transition-colors">
                View Tempett Live
              </Button>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="relative"
            >
              <div className="absolute inset-0 bg-gradient-to-bl from-[#C9A96E]/10 to-transparent blur-3xl rounded-full"></div>
              <img 
                src="/__mockup/images/tgv-tempett-mockup.png" 
                alt="Tempett Application" 
                className="w-full h-auto relative z-10 rounded-sm shadow-2xl shadow-black border border-[#222]"
              />
              <div className="absolute -top-6 -left-6 w-32 h-32 border-t-2 border-l-2 border-[#C9A96E] pointer-events-none"></div>
              <div className="absolute -bottom-6 -right-6 w-32 h-32 border-b-2 border-r-2 border-[#C9A96E] pointer-events-none"></div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section id="contact" className="py-32 relative overflow-hidden">
        <div className="absolute inset-0 bg-[#C9A96E]">
          <div className="absolute inset-0 opacity-10" style={{ backgroundImage: 'radial-gradient(circle at 2px 2px, black 1px, transparent 0)', backgroundSize: '32px 32px' }}></div>
        </div>
        
        <div className="container mx-auto px-6 relative z-10 text-center text-[#0A0A0A]">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="max-w-4xl mx-auto"
          >
            <Zap className="w-16 h-16 mx-auto mb-8 text-[#0A0A0A]" />
            <h2 className="text-5xl md:text-7xl font-black uppercase tracking-tighter mb-8">
              Ready to Build <br/>Something <span className="text-white drop-shadow-md">Exceptional?</span>
            </h2>
            <p className="text-xl md:text-2xl font-medium mb-12 opacity-80">
              Stop settling for off-the-shelf software. Demand custom solutions engineered for your exact needs.
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-6">
              <Button className="bg-[#0A0A0A] text-[#C9A96E] hover:bg-white hover:text-[#0A0A0A] h-16 px-12 text-lg uppercase tracking-widest font-bold rounded-none skew-x-[-10deg] transition-all hover:scale-105">
                <span className="skew-x-[10deg]">Contact Sales</span>
              </Button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-[#050505] pt-20 pb-10 border-t border-[#1a1a1a]">
        <div className="container mx-auto px-6 md:px-12">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-16">
            <div className="col-span-1 md:col-span-2">
              <div className="flex items-center gap-3 mb-6">
                <div className="relative w-10 h-10 overflow-hidden bg-black rounded-lg border border-[#333]">
                  <img src="/__mockup/images/logo.png" alt="Solution TGV" className="w-8 h-8 object-contain m-1" />
                </div>
                <span className="text-xl font-serif font-bold text-white">Solution TGV</span>
              </div>
              <p className="text-gray-500 max-w-sm">
                Premium IT solutions, custom application development, and secure portals engineered for businesses that demand excellence.
              </p>
            </div>
            
            <div>
              <h4 className="text-white font-bold uppercase tracking-widest mb-6">Products</h4>
              <ul className="space-y-4">
                <li><a href="#" className="text-gray-500 hover:text-[#C9A96E] transition-colors">SecurFich Portal</a></li>
                <li><a href="#" className="text-gray-500 hover:text-[#C9A96E] transition-colors">Tempett App</a></li>
              </ul>
            </div>
            
            <div>
              <h4 className="text-white font-bold uppercase tracking-widest mb-6">Company</h4>
              <ul className="space-y-4">
                <li><a href="#" className="text-gray-500 hover:text-[#C9A96E] transition-colors">About Us</a></li>
                <li><a href="#" className="text-gray-500 hover:text-[#C9A96E] transition-colors">Services</a></li>
                <li><a href="#" className="text-gray-500 hover:text-[#C9A96E] transition-colors">Contact</a></li>
              </ul>
            </div>
          </div>
          
          <div className="pt-8 border-t border-[#1a1a1a] flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-gray-600 text-sm">
              &copy; {new Date().getFullYear()} Solution TGV. All rights reserved.
            </p>
            <div className="flex gap-6">
              <a href="#" className="text-gray-600 hover:text-[#C9A96E] text-sm">Privacy Policy</a>
              <a href="#" className="text-gray-600 hover:text-[#C9A96E] text-sm">Terms of Service</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
