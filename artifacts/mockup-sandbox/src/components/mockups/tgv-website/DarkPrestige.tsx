import React, { useEffect, useState } from 'react';
import { motion, useScroll, useTransform, AnimatePresence } from 'framer-motion';
import { ChevronRight, Shield, Code, Server, ArrowRight, Menu, X, Mail, MapPin, Phone } from 'lucide-react';
import { Button } from '@/components/ui/button';

export default function DarkPrestige() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const fadeUp = {
    hidden: { opacity: 0, y: 40 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] } }
  };

  const staggerContainer = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2
      }
    }
  };

  return (
    <div className="min-h-screen bg-[#0D0D0D] text-[#F5F5F0] font-sans selection:bg-[#C9A96E] selection:text-[#0D0D0D] overflow-x-hidden">
      {/* Navigation */}
      <nav className={`fixed top-0 w-full z-50 transition-all duration-500 ${isScrolled ? 'bg-[#0D0D0D]/90 backdrop-blur-md border-b border-[#C9A96E]/10 py-4' : 'bg-transparent py-6'}`}>
        <div className="container mx-auto px-6 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <img src="/__mockup/images/logo.png" alt="Solution TGV" className="h-10 w-auto object-contain" onError={(e) => { e.currentTarget.style.display = 'none'; }} />
            <span className="font-serif text-2xl tracking-wide text-[#C9A96E]">Solution TGV</span>
          </div>
          
          <div className="hidden md:flex items-center gap-8 text-sm uppercase tracking-widest text-[#F5F5F0]/70">
            <a href="#expertise" className="hover:text-[#C9A96E] transition-colors">Expertise</a>
            <a href="#products" className="hover:text-[#C9A96E] transition-colors">Products</a>
            <a href="#about" className="hover:text-[#C9A96E] transition-colors">About</a>
            <Button variant="outline" className="border-[#C9A96E]/30 text-[#C9A96E] hover:bg-[#C9A96E] hover:text-[#0D0D0D] rounded-none px-6 uppercase tracking-wider h-10 bg-transparent transition-all duration-300">
              Contact Us
            </Button>
          </div>

          <button className="md:hidden text-[#C9A96E]" onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
            {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </nav>

      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="fixed inset-0 z-40 bg-[#0D0D0D] pt-24 px-6 flex flex-col gap-6 md:hidden"
          >
            <a href="#expertise" onClick={() => setMobileMenuOpen(false)} className="text-2xl font-serif text-[#F5F5F0] hover:text-[#C9A96E] border-b border-[#1A1A1A] pb-4">Expertise</a>
            <a href="#products" onClick={() => setMobileMenuOpen(false)} className="text-2xl font-serif text-[#F5F5F0] hover:text-[#C9A96E] border-b border-[#1A1A1A] pb-4">Products</a>
            <a href="#about" onClick={() => setMobileMenuOpen(false)} className="text-2xl font-serif text-[#F5F5F0] hover:text-[#C9A96E] border-b border-[#1A1A1A] pb-4">About</a>
            <Button className="bg-[#C9A96E] text-[#0D0D0D] rounded-none py-6 text-lg mt-4 w-full uppercase tracking-widest">
              Contact Us
            </Button>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center pt-20 overflow-hidden">
        <div className="absolute inset-0 z-0">
          <div className="absolute inset-0 bg-gradient-to-b from-[#0D0D0D]/50 via-[#0D0D0D]/80 to-[#0D0D0D] z-10" />
          <motion.img 
            initial={{ scale: 1.1 }}
            animate={{ scale: 1 }}
            transition={{ duration: 1.5, ease: "easeOut" }}
            src="/__mockup/images/tgv-hero.png" 
            alt="Hero background" 
            className="w-full h-full object-cover opacity-60"
          />
        </div>
        
        <div className="container mx-auto px-6 relative z-10">
          <motion.div 
            initial="hidden"
            animate="visible"
            variants={staggerContainer}
            className="max-w-4xl"
          >
            <motion.div variants={fadeUp} className="flex items-center gap-4 mb-6">
              <div className="h-[1px] w-12 bg-[#C9A96E]" />
              <span className="text-[#C9A96E] uppercase tracking-[0.3em] text-sm">Premium IT Solutions</span>
            </motion.div>
            
            <motion.h1 variants={fadeUp} className="text-5xl md:text-7xl lg:text-8xl font-serif leading-[1.1] mb-8 text-white">
              Engineering <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#C9A96E] to-[#D4B87C] italic">Digital Precision</span>
            </motion.h1>
            
            <motion.p variants={fadeUp} className="text-xl md:text-2xl text-[#F5F5F0]/60 font-light max-w-2xl mb-12 leading-relaxed">
              We architect custom software solutions that transform complex business challenges into elegant, secure, and scalable realities.
            </motion.p>
            
            <motion.div variants={fadeUp} className="flex flex-col sm:flex-row gap-6">
              <Button className="bg-[#C9A96E] text-[#0D0D0D] hover:bg-[#D4B87C] rounded-none h-14 px-8 uppercase tracking-widest transition-all duration-300 hover:pr-6 group">
                Discuss Your Project
                <ChevronRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </Button>
              <Button variant="outline" className="border-[#C9A96E]/20 text-white hover:bg-[#1A1A1A] hover:text-[#C9A96E] rounded-none h-14 px-8 uppercase tracking-widest bg-transparent transition-all duration-300">
                Explore Our Work
              </Button>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Expertise Section */}
      <section id="expertise" className="py-32 bg-[#0D0D0D] relative border-t border-[#1A1A1A]">
        <div className="container mx-auto px-6">
          <motion.div 
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={staggerContainer}
            className="mb-20"
          >
            <motion.h2 variants={fadeUp} className="text-4xl md:text-5xl font-serif mb-6">
              Mastery in <span className="text-[#C9A96E] italic">Execution</span>
            </motion.h2>
            <motion.p variants={fadeUp} className="text-[#F5F5F0]/60 max-w-2xl text-lg font-light leading-relaxed">
              Our approach merges high-end aesthetic sensibilities with rigorous technical architecture. We don't just write code; we engineer competitive advantages.
            </motion.p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                icon: <Code className="w-8 h-8 text-[#C9A96E]" />,
                title: "Custom Application Development",
                desc: "Tailored software solutions built from the ground up to perfectly align with your specific business workflows and operational demands."
              },
              {
                icon: <Shield className="w-8 h-8 text-[#C9A96E]" />,
                title: "Secure Data Architecture",
                desc: "Enterprise-grade security implementations including AES-256 encryption, compliance-ready frameworks, and rigorous vulnerability mitigation."
              },
              {
                icon: <Server className="w-8 h-8 text-[#C9A96E]" />,
                title: "Scalable Infrastructure",
                desc: "Cloud-native architectures designed to grow seamlessly with your user base, ensuring zero downtime and optimal performance."
              }
            ].map((feature, i) => (
              <motion.div 
                key={i}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: "-100px" }}
                variants={fadeUp}
                className="group p-10 bg-[#1A1A1A]/50 border border-[#1A1A1A] hover:border-[#C9A96E]/30 transition-all duration-500"
              >
                <div className="mb-8 p-4 bg-[#0D0D0D] inline-block border border-[#1A1A1A] group-hover:scale-110 transition-transform duration-500">
                  {feature.icon}
                </div>
                <h3 className="text-xl font-serif mb-4 text-[#F5F5F0]">{feature.title}</h3>
                <p className="text-[#F5F5F0]/50 font-light leading-relaxed text-sm">
                  {feature.desc}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Products */}
      <section id="products" className="py-32 bg-[#1A1A1A]">
        <div className="container mx-auto px-6">
          <motion.div 
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={staggerContainer}
            className="text-center mb-24"
          >
            <motion.h2 variants={fadeUp} className="text-4xl md:text-5xl font-serif mb-6">
              Our <span className="text-[#C9A96E] italic">Products</span>
            </motion.h2>
            <motion.p variants={fadeUp} className="text-[#F5F5F0]/60 max-w-2xl mx-auto text-lg font-light leading-relaxed">
              Proven platforms engineered by Solution TGV, demonstrating our capacity to build complex, market-ready applications.
            </motion.p>
          </motion.div>

          <div className="space-y-32">
            {/* SecurFich */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
              <motion.div 
                initial={{ opacity: 0, x: -50 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.8 }}
                className="order-2 lg:order-1"
              >
                <div className="flex items-center gap-4 mb-6">
                  <div className="h-[1px] w-8 bg-[#C9A96E]" />
                  <span className="text-[#C9A96E] uppercase tracking-widest text-xs">Flagship Product</span>
                </div>
                <h3 className="text-4xl font-serif mb-6">SecurFich</h3>
                <p className="text-[#F5F5F0]/60 font-light leading-relaxed mb-8 text-lg">
                  A Quebec Bill 25 compliant secure document sharing portal engineered for CPAs, accountants, and legal professionals. Built with uncompromising security standards including AES-256 encryption.
                </p>
                <ul className="space-y-4 mb-10">
                  {['White-label branding capabilities', 'Document lifecycle & consent tracking', 'Built-in antivirus scanning', 'Quebec Bill 25 & PIPEDA compliant'].map((item, i) => (
                    <li key={i} className="flex items-center gap-3 text-[#F5F5F0]/80 font-light">
                      <div className="w-1.5 h-1.5 rounded-full bg-[#C9A96E]" />
                      {item}
                    </li>
                  ))}
                </ul>
                <Button variant="outline" className="border-[#C9A96E]/30 text-[#C9A96E] hover:bg-[#C9A96E] hover:text-[#0D0D0D] rounded-none px-8 h-12 uppercase tracking-widest bg-transparent transition-all duration-300">
                  View Case Study
                </Button>
              </motion.div>
              <motion.div 
                initial={{ opacity: 0, x: 50 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.8 }}
                className="order-1 lg:order-2 relative"
              >
                <div className="absolute inset-0 bg-gradient-to-tr from-[#C9A96E]/20 to-transparent opacity-20 blur-3xl" />
                <div className="relative border border-[#1A1A1A] p-2 bg-[#0D0D0D]">
                  <img src="/__mockup/images/tgv-securfich.png" alt="SecurFich Platform" className="w-full h-auto object-cover opacity-90 grayscale hover:grayscale-0 transition-all duration-700" />
                </div>
              </motion.div>
            </div>

            {/* Tempett */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
              <motion.div 
                initial={{ opacity: 0, x: -50 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.8 }}
                className="relative"
              >
                <div className="absolute inset-0 bg-gradient-to-tl from-[#C9A96E]/20 to-transparent opacity-20 blur-3xl" />
                <div className="relative border border-[#1A1A1A] p-2 bg-[#0D0D0D]">
                  <img src="/__mockup/images/tgv-tempett.png" alt="Tempett Platform" className="w-full h-auto object-cover opacity-90 grayscale hover:grayscale-0 transition-all duration-700" />
                </div>
              </motion.div>
              <motion.div 
                initial={{ opacity: 0, x: 50 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.8 }}
              >
                <div className="flex items-center gap-4 mb-6">
                  <div className="h-[1px] w-8 bg-[#C9A96E]" />
                  <span className="text-[#C9A96E] uppercase tracking-widest text-xs">Web Application</span>
                </div>
                <h3 className="text-4xl font-serif mb-6">Tempett</h3>
                <p className="text-[#F5F5F0]/60 font-light leading-relaxed mb-8 text-lg">
                  A high-performance web application showcasing our ability to build intuitive, responsive interfaces backed by robust backend systems. Designed for scale and rapid user adoption.
                </p>
                <ul className="space-y-4 mb-10">
                  {['Real-time data synchronization', 'Intuitive user workflows', 'Cross-platform compatibility', 'High-availability architecture'].map((item, i) => (
                    <li key={i} className="flex items-center gap-3 text-[#F5F5F0]/80 font-light">
                      <div className="w-1.5 h-1.5 rounded-full bg-[#C9A96E]" />
                      {item}
                    </li>
                  ))}
                </ul>
                <Button variant="outline" className="border-[#C9A96E]/30 text-[#C9A96E] hover:bg-[#C9A96E] hover:text-[#0D0D0D] rounded-none px-8 h-12 uppercase tracking-widest bg-transparent transition-all duration-300">
                  Explore Platform
                </Button>
              </motion.div>
            </div>
          </div>
        </div>
      </section>

      {/* Process/Stats */}
      <section className="py-24 bg-[#0D0D0D] border-y border-[#1A1A1A] relative overflow-hidden">
        <div className="absolute inset-0 opacity-5 pointer-events-none" style={{ backgroundImage: 'radial-gradient(#C9A96E 1px, transparent 1px)', backgroundSize: '40px 40px' }} />
        <div className="container mx-auto px-6 relative z-10">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-12 divide-x divide-[#1A1A1A]">
            {[
              { label: "Client Satisfaction", value: "100%" },
              { label: "Uptime Guaranteed", value: "99.9%" },
              { label: "Data Encryption", value: "AES-256" },
              { label: "Compliance", value: "Bill 25" }
            ].map((stat, i) => (
              <motion.div 
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1, duration: 0.6 }}
                className="text-center px-4"
              >
                <div className="text-3xl md:text-5xl font-serif text-[#C9A96E] mb-4">{stat.value}</div>
                <div className="text-xs uppercase tracking-widest text-[#F5F5F0]/40">{stat.label}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-32 bg-[#1A1A1A] relative">
        <div className="absolute right-0 top-0 w-1/2 h-full">
          <img src="/__mockup/images/tgv-custom-dev.png" alt="Code" className="w-full h-full object-cover opacity-10 mix-blend-luminosity" />
          <div className="absolute inset-0 bg-gradient-to-r from-[#1A1A1A] to-transparent" />
        </div>
        
        <div className="container mx-auto px-6 relative z-10">
          <motion.div 
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={staggerContainer}
            className="max-w-2xl"
          >
            <motion.h2 variants={fadeUp} className="text-4xl md:text-6xl font-serif mb-8 leading-tight">
              Ready to architect your next <span className="text-[#C9A96E] italic">advantage?</span>
            </motion.h2>
            <motion.p variants={fadeUp} className="text-[#F5F5F0]/60 text-lg font-light mb-12">
              Partner with Solution TGV to build bespoke software that drives your business forward. Confidential consultations available for qualified enterprises.
            </motion.p>
            <motion.div variants={fadeUp}>
              <Button className="bg-[#C9A96E] text-[#0D0D0D] hover:bg-[#D4B87C] rounded-none h-16 px-10 text-lg uppercase tracking-widest transition-all duration-300 shadow-[0_0_40px_rgba(201,169,110,0.15)] hover:shadow-[0_0_60px_rgba(201,169,110,0.25)]">
                Initiate Dialogue
                <ArrowRight className="ml-3 w-5 h-5" />
              </Button>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-[#0D0D0D] pt-20 pb-10 border-t border-[#1A1A1A]">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-16">
            <div className="col-span-1 md:col-span-2">
              <div className="flex items-center gap-3 mb-6">
                <img src="/__mockup/images/logo.png" alt="Solution TGV" className="h-8 w-auto object-contain grayscale opacity-70" onError={(e) => { e.currentTarget.style.display = 'none'; }} />
                <span className="font-serif text-xl tracking-wide text-[#F5F5F0]/70">Solution TGV</span>
              </div>
              <p className="text-[#F5F5F0]/40 font-light max-w-sm mb-8 text-sm leading-relaxed">
                Premium custom software development and secure IT solutions for enterprises that demand excellence and uncompromising precision.
              </p>
            </div>
            
            <div>
              <h4 className="text-[#C9A96E] uppercase tracking-widest text-xs mb-6">Contact</h4>
              <ul className="space-y-4">
                <li>
                  <a href="#" className="flex items-center gap-3 text-[#F5F5F0]/60 hover:text-[#C9A96E] text-sm font-light transition-colors">
                    <Mail className="w-4 h-4" />
                    contact@solutiontgv.com
                  </a>
                </li>
                <li>
                  <a href="#" className="flex items-center gap-3 text-[#F5F5F0]/60 hover:text-[#C9A96E] text-sm font-light transition-colors">
                    <Phone className="w-4 h-4" />
                    +1 (555) 123-4567
                  </a>
                </li>
                <li>
                  <div className="flex items-start gap-3 text-[#F5F5F0]/60 text-sm font-light">
                    <MapPin className="w-4 h-4 mt-1 flex-shrink-0" />
                    <span>Quebec, Canada<br />Serving clients globally</span>
                  </div>
                </li>
              </ul>
            </div>
            
            <div>
              <h4 className="text-[#C9A96E] uppercase tracking-widest text-xs mb-6">Legal</h4>
              <ul className="space-y-3 text-[#F5F5F0]/60 text-sm font-light">
                <li><a href="#" className="hover:text-[#C9A96E] transition-colors">Privacy Policy</a></li>
                <li><a href="#" className="hover:text-[#C9A96E] transition-colors">Terms of Service</a></li>
                <li><a href="#" className="hover:text-[#C9A96E] transition-colors">Bill 25 Compliance</a></li>
              </ul>
            </div>
          </div>
          
          <div className="pt-8 border-t border-[#1A1A1A] flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-[#F5F5F0]/30 text-xs tracking-wider">
              &copy; {new Date().getFullYear()} Solution TGV. All rights reserved.
            </p>
            <div className="text-[#F5F5F0]/30 text-xs tracking-wider">
              Engineered with precision.
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
