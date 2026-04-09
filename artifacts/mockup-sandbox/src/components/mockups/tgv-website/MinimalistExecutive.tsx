import React, { useEffect, useState } from "react";
import { motion, useScroll, useTransform, AnimatePresence } from "framer-motion";
import { ArrowRight, Shield, Code2, Lock, ChevronRight, Briefcase, Key, Database, Globe, Network } from "lucide-react";

const FadeIn = ({ children, delay = 0, className = "" }: { children: React.ReactNode, delay?: number, className?: string }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-10%" }}
      transition={{ duration: 1.2, delay, ease: [0.25, 0.1, 0.25, 1] }}
      className={className}
    >
      {children}
    </motion.div>
  );
};

const LineReveal = ({ className = "", delay = 0 }: { className?: string, delay?: number }) => {
  return (
    <motion.div
      initial={{ scaleX: 0 }}
      whileInView={{ scaleX: 1 }}
      viewport={{ once: true, margin: "-10%" }}
      transition={{ duration: 1.5, delay, ease: [0.25, 0.1, 0.25, 1] }}
      style={{ originX: 0 }}
      className={`h-[1px] bg-gradient-to-r from-transparent via-[#C9A96E]/50 to-transparent ${className}`}
    />
  );
};

export default function MinimalistExecutive() {
  const [isScrolled, setIsScrolled] = useState(false);
  const { scrollYProgress } = useScroll();
  const heroY = useTransform(scrollYProgress, [0, 1], ["0%", "50%"]);
  const heroOpacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div className="min-h-screen bg-[#050505] text-[#F5F2EB] font-sans selection:bg-[#C9A96E]/30 selection:text-[#F5F2EB] overflow-x-hidden">
      <style>{`
        .font-serif-elegant {
          font-family: 'Playfair Display', Georgia, serif;
        }
        .text-gold {
          color: #C9A96E;
        }
        .bg-gold {
          background-color: #C9A96E;
        }
        .border-gold {
          border-color: #C9A96E;
        }
        /* Custom scrollbar for webkit */
        ::-webkit-scrollbar {
          width: 6px;
        }
        ::-webkit-scrollbar-track {
          background: #050505;
        }
        ::-webkit-scrollbar-thumb {
          background: #1a1a1a;
        }
        ::-webkit-scrollbar-thumb:hover {
          background: #2a2a2a;
        }
      `}</style>

      {/* Navigation */}
      <motion.nav 
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-700 ${isScrolled ? 'bg-[#050505]/90 backdrop-blur-xl border-b border-[#C9A96E]/10 py-4' : 'bg-transparent py-8'}`}
      >
        <div className="max-w-screen-2xl mx-auto px-6 md:px-12 flex items-center justify-between">
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1 }}
            className="flex items-center gap-4 group cursor-pointer"
          >
            <img src="/__mockup/images/logo.png" alt="Solution TGV" className="h-8 w-auto group-hover:opacity-80 transition-opacity" />
            <div className="flex flex-col">
              <span className="font-serif-elegant text-lg tracking-widest hidden sm:block leading-none">Solution TGV</span>
              <span className="text-[9px] tracking-[0.3em] uppercase text-white/40 hidden sm:block mt-1">IT Consulting</span>
            </div>
          </motion.div>
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 0.2 }}
            className="hidden md:flex items-center gap-12 text-[11px] tracking-[0.2em] uppercase text-white/50"
          >
            <a href="#expertise" className="hover:text-gold transition-colors duration-300">Expertise</a>
            <a href="#products" className="hover:text-gold transition-colors duration-300">Products</a>
            <a href="#compliance" className="hover:text-gold transition-colors duration-300">Security</a>
            <a href="#approach" className="hover:text-gold transition-colors duration-300">Approach</a>
            <a href="#contact" className="text-white hover:text-gold transition-colors duration-300 border-b border-transparent hover:border-gold pb-1">Engage</a>
          </motion.div>
          <motion.button 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 0.4 }}
            className="md:hidden text-white/80"
          >
            Menu
          </motion.button>
        </div>
      </motion.nav>

      {/* Hero Section */}
      <section className="relative h-[100dvh] flex items-center justify-center overflow-hidden">
        {/* Background Image with Parallax */}
        <motion.div 
          style={{ y: heroY, opacity: heroOpacity }}
          className="absolute inset-0 z-0"
        >
          <div className="absolute inset-0 bg-gradient-to-b from-[#050505]/40 via-[#050505]/80 to-[#050505] z-10" />
          <img 
            src="/__mockup/images/boardroom-bg.png" 
            alt="Corporate Boardroom" 
            className="w-full h-[120%] object-cover object-center transform -translate-y-[10%] opacity-40 grayscale"
          />
        </motion.div>

        <div className="max-w-screen-2xl mx-auto w-full px-6 md:px-12 relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1.2, ease: [0.25, 0.1, 0.25, 1], delay: 0.2 }}
            >
              <div className="inline-flex items-center justify-center gap-4 mb-8">
                <span className="w-8 h-[1px] bg-gold/50 block"></span>
                <h2 className="text-gold text-[10px] tracking-[0.4em] uppercase">Executive IT Solutions</h2>
                <span className="w-8 h-[1px] bg-gold/50 block"></span>
              </div>
              <h1 className="font-serif-elegant text-5xl md:text-7xl lg:text-[6rem] leading-[1.05] mb-10 tracking-tight">
                Architecting <span className="italic text-white/60">trust.</span> <br />
                Engineering <span className="text-gold">scale.</span>
              </h1>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 1, delay: 0.8 }}
              className="max-w-2xl mx-auto flex flex-col items-center"
            >
              <p className="text-lg md:text-xl text-white/50 font-light leading-relaxed mb-12 text-center">
                We develop bespoke software and secure digital ecosystems for organizations that demand absolute precision.
              </p>
              
              <a href="#contact" className="group flex items-center gap-6 text-[11px] tracking-[0.3em] uppercase hover:text-gold transition-colors duration-500">
                <span className="relative overflow-hidden pb-2">
                  Initiate Dialogue
                  <span className="absolute bottom-0 left-0 w-full h-[1px] bg-gold transform origin-left scale-x-0 group-hover:scale-x-100 transition-transform duration-700 ease-out"></span>
                </span>
              </a>
            </motion.div>
          </div>
        </div>
        
        {/* Scroll Line Indicator */}
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 1.5 }}
          className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[1px] h-32 bg-white/5 overflow-hidden"
        >
          <motion.div 
            animate={{ y: ["-100%", "200%"] }} 
            transition={{ repeat: Infinity, duration: 2.5, ease: "linear" }}
            className="w-full h-1/2 bg-gradient-to-b from-transparent via-gold/50 to-transparent"
          />
        </motion.div>
      </section>

      {/* Ethos Section */}
      <section className="py-32 md:py-48 px-6 md:px-12 bg-[#050505] relative z-20">
        <div className="max-w-screen-xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-16 md:gap-24 items-center">
            <div className="md:col-span-5 relative">
              <FadeIn>
                <div className="aspect-[3/4] overflow-hidden bg-[#0A0A0A] border border-white/5 relative group">
                  <div className="absolute inset-0 bg-gold/5 mix-blend-overlay z-10 group-hover:opacity-0 transition-opacity duration-1000" />
                  <img src="/__mockup/images/hero-bg.png" alt="Abstract geometry" className="w-full h-full object-cover opacity-60 scale-105 group-hover:scale-100 transition-transform duration-1000 ease-out" />
                </div>
                {/* Decorative border offset */}
                <div className="absolute -inset-4 border border-gold/10 -z-10 hidden md:block" />
              </FadeIn>
            </div>
            
            <div className="md:col-span-7 flex flex-col justify-center">
              <FadeIn>
                <h3 className="font-serif-elegant text-3xl md:text-5xl leading-tight text-white mb-10">
                  Substance over flash.<br />
                  <span className="text-white/40 italic">Security above all.</span>
                </h3>
              </FadeIn>
              <FadeIn delay={0.2}>
                <div className="space-y-8 text-white/50 text-lg font-light leading-relaxed">
                  <p>
                    In a landscape crowded with noise, we offer clarity. Solution TGV develops robust, scalable applications tailored to the specific operational demands of your enterprise.
                  </p>
                  <p>
                    Our development philosophy is rooted in architectural integrity. We don't just write code; we design resilient systems that protect your data and empower your workforce to operate with confidence.
                  </p>
                </div>
                
                <div className="mt-12 flex gap-12">
                  <div>
                    <div className="text-gold font-serif-elegant text-3xl mb-1">10+</div>
                    <div className="text-[10px] tracking-widest uppercase text-white/30">Years Expertise</div>
                  </div>
                  <div>
                    <div className="text-gold font-serif-elegant text-3xl mb-1">Zero</div>
                    <div className="text-[10px] tracking-widest uppercase text-white/30">Compromises</div>
                  </div>
                </div>
              </FadeIn>
            </div>
          </div>
        </div>
      </section>

      {/* Divider */}
      <div className="w-full h-[1px] bg-gradient-to-r from-transparent via-white/5 to-transparent my-12" />

      {/* Expertise Section */}
      <section id="expertise" className="py-32 md:py-40 px-6 md:px-12 bg-[#050505]">
        <div className="max-w-screen-2xl mx-auto">
          <FadeIn>
            <div className="flex flex-col md:flex-row justify-between items-end gap-8 mb-24">
              <div>
                <h2 className="text-gold text-[10px] tracking-[0.4em] uppercase mb-4">Core Competencies</h2>
                <h3 className="font-serif-elegant text-4xl md:text-5xl text-white">Technical <span className="italic text-white/40">Mastery</span></h3>
              </div>
              <p className="text-white/40 font-light max-w-md text-right hidden md:block">
                Comprehensive technological solutions bridging the gap between complex requirements and elegant execution.
              </p>
            </div>
          </FadeIn>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-px bg-white/5 border border-white/5">
            {[
              {
                icon: <Database className="w-6 h-6" />,
                title: "Custom Application Architecture",
                desc: "End-to-end development of robust, scalable web applications designed around your specific business logic."
              },
              {
                icon: <Lock className="w-6 h-6" />,
                title: "Secure Infrastructure",
                desc: "Implementation of highly secure, compliant digital environments tailored for sensitive data management."
              },
              {
                icon: <Network className="w-6 h-6" />,
                title: "Systems Integration",
                desc: "Seamless bridging of legacy systems with modern cloud infrastructure to create unified operational workflows."
              }
            ].map((item, i) => (
              <FadeIn key={i} delay={i * 0.1}>
                <div className="bg-[#080808] p-12 h-full hover:bg-[#0A0A0A] transition-colors group cursor-default">
                  <div className="text-white/20 group-hover:text-gold transition-colors duration-500 mb-8">
                    {item.icon}
                  </div>
                  <h4 className="font-serif-elegant text-2xl text-white mb-4">{item.title}</h4>
                  <p className="text-white/40 font-light leading-relaxed text-sm">
                    {item.desc}
                  </p>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* Products Showcase */}
      <section id="products" className="py-32 md:py-48 px-6 md:px-12 relative bg-[#020202]">
        <LineReveal className="absolute top-0 left-0 w-full" />
        
        <div className="max-w-screen-2xl mx-auto">
          <FadeIn className="text-center mb-32">
            <h2 className="text-gold text-[10px] tracking-[0.4em] uppercase mb-4">Case Studies & Platforms</h2>
            <h3 className="font-serif-elegant text-4xl md:text-6xl text-white">Proven <span className="italic text-white/40">Solutions</span></h3>
          </FadeIn>

          {/* SecurFich */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-32 items-center mb-40">
            <div className="order-2 lg:order-1">
              <FadeIn>
                <div className="flex items-center gap-4 mb-6">
                  <div className="w-8 h-[1px] bg-gold/30"></div>
                  <span className="text-[10px] tracking-[0.3em] uppercase text-gold">Flagship Product</span>
                </div>
                <h3 className="font-serif-elegant text-5xl mb-6 text-white">SecurFich</h3>
                <p className="text-white/50 text-lg font-light leading-relaxed mb-10">
                  A premium secure document sharing portal engineered specifically for CPAs, accountants, and legal professionals. Compliant with Quebec Bill 25.
                </p>
                
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-y-6 gap-x-8 mb-12">
                  {[
                    "AES-256 Bank-Grade Encryption",
                    "Automated Consent Tracking",
                    "Document Lifecycle Management",
                    "White-Label Branding",
                    "Integrated Antivirus Scanning",
                    "Granular Access Controls"
                  ].map((feature, i) => (
                    <div key={i} className="flex items-start gap-3">
                      <div className="mt-1 w-1.5 h-1.5 rounded-full bg-gold/50" />
                      <span className="text-sm text-white/60 font-light">{feature}</span>
                    </div>
                  ))}
                </div>
                
                <a href="https://securfich.ca" target="_blank" rel="noreferrer" className="group inline-flex items-center gap-4 text-[11px] tracking-[0.2em] uppercase hover:text-gold transition-colors">
                  Review Platform <ChevronRight className="w-3 h-3 group-hover:translate-x-1 transition-transform" />
                </a>
              </FadeIn>
            </div>
            
            <div className="order-1 lg:order-2">
              <FadeIn delay={0.2} className="relative">
                <div className="aspect-[4/3] bg-[#0A0A0A] border border-white/5 overflow-hidden">
                  <img src="/__mockup/images/securfich-concept.png" alt="SecurFich Concept" className="w-full h-full object-cover opacity-70 hover:opacity-90 transition-opacity duration-700" />
                </div>
                <div className="absolute -bottom-8 -left-8 w-48 h-48 border border-gold/10 -z-10" />
              </FadeIn>
            </div>
          </div>

          {/* Tempett */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-32 items-center">
            <div>
              <FadeIn className="relative">
                <div className="aspect-[4/3] bg-[#0A0A0A] border border-white/5 overflow-hidden">
                  <img src="/__mockup/images/tempett-concept.png" alt="Tempett Concept" className="w-full h-full object-cover opacity-70 hover:opacity-90 transition-opacity duration-700" />
                </div>
                <div className="absolute -top-8 -right-8 w-48 h-48 border border-gold/10 -z-10" />
              </FadeIn>
            </div>
            
            <div>
              <FadeIn delay={0.2}>
                <div className="flex items-center gap-4 mb-6">
                  <div className="w-8 h-[1px] bg-gold/30"></div>
                  <span className="text-[10px] tracking-[0.3em] uppercase text-gold">Custom Web Application</span>
                </div>
                <h3 className="font-serif-elegant text-5xl mb-6 text-white">Tempett</h3>
                <p className="text-white/50 text-lg font-light leading-relaxed mb-10">
                  A comprehensive web application demonstrating our capability in building robust, data-intensive platforms from the ground up, utilizing modern tech stacks.
                </p>
                
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-y-6 gap-x-8 mb-12">
                  {[
                    "Custom Architecture",
                    "Scalable Infrastructure",
                    "Seamless Integration",
                    "Optimized Performance",
                    "Intuitive User Interface",
                    "Real-time Data Sync"
                  ].map((feature, i) => (
                    <div key={i} className="flex items-start gap-3">
                      <div className="mt-1 w-1.5 h-1.5 rounded-full bg-white/20" />
                      <span className="text-sm text-white/60 font-light">{feature}</span>
                    </div>
                  ))}
                </div>
                
                <a href="https://4f19c4ff-b865-4e6f-8a77-9861c311db86-00-1f55lbcjb3mos.worf.replit.dev/" target="_blank" rel="noreferrer" className="group inline-flex items-center gap-4 text-[11px] tracking-[0.2em] uppercase hover:text-white transition-colors text-white/50">
                  View Live Instance <ChevronRight className="w-3 h-3 group-hover:translate-x-1 transition-transform" />
                </a>
              </FadeIn>
            </div>
          </div>
        </div>
      </section>

      {/* Security/Compliance Section */}
      <section id="compliance" className="py-32 px-6 md:px-12 bg-[#050505] border-y border-white/5">
        <div className="max-w-screen-xl mx-auto text-center">
          <FadeIn>
            <Shield className="w-8 h-8 text-gold/50 mx-auto mb-8" />
            <h2 className="font-serif-elegant text-3xl md:text-5xl text-white mb-6">Uncompromising Security Standard</h2>
            <p className="max-w-2xl mx-auto text-white/40 font-light mb-16">
              Our engineering protocols are designed to meet and exceed strict regulatory requirements, ensuring your data sovereignty and operational continuity.
            </p>
          </FadeIn>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-0 border border-white/5 divide-x-0 md:divide-x divide-y md:divide-y-0 divide-white/5 bg-[#080808]">
            <FadeIn delay={0.1}>
              <div className="p-8 md:p-12 flex flex-col items-center justify-center h-full">
                <div className="text-gold font-serif-elegant text-4xl mb-3">AES-256</div>
                <div className="text-[9px] tracking-[0.2em] uppercase text-white/40 text-center">Encryption Standard</div>
              </div>
            </FadeIn>
            <FadeIn delay={0.2}>
              <div className="p-8 md:p-12 flex flex-col items-center justify-center h-full">
                <div className="text-gold font-serif-elegant text-4xl mb-3">Bill 25</div>
                <div className="text-[9px] tracking-[0.2em] uppercase text-white/40 text-center">Quebec Compliant</div>
              </div>
            </FadeIn>
            <FadeIn delay={0.3}>
              <div className="p-8 md:p-12 flex flex-col items-center justify-center h-full">
                <div className="text-gold font-serif-elegant text-4xl mb-3">24/7</div>
                <div className="text-[9px] tracking-[0.2em] uppercase text-white/40 text-center">Active Monitoring</div>
              </div>
            </FadeIn>
            <FadeIn delay={0.4}>
              <div className="p-8 md:p-12 flex flex-col items-center justify-center h-full">
                <div className="text-gold font-serif-elegant text-4xl mb-3">100%</div>
                <div className="text-[9px] tracking-[0.2em] uppercase text-white/40 text-center">Data Sovereignty</div>
              </div>
            </FadeIn>
          </div>
        </div>
      </section>

      {/* Methodology Section */}
      <section id="approach" className="py-32 md:py-48 px-6 md:px-12 bg-[#020202]">
        <div className="max-w-screen-xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-16 lg:gap-32">
            <div>
              <FadeIn>
                <h2 className="text-gold text-[10px] tracking-[0.4em] uppercase mb-4">Methodology</h2>
                <h3 className="font-serif-elegant text-4xl md:text-5xl text-white mb-8">Calculated <br/><span className="italic text-white/40">Execution</span></h3>
                <p className="text-white/40 font-light leading-relaxed">
                  We don't build on assumptions. Every project begins with a rigorous architectural phase to ensure the foundation can support exponential growth and strict security protocols.
                </p>
              </FadeIn>
            </div>
            
            <div className="space-y-12">
              {[
                { num: "01", title: "Discovery & Architecture", desc: "Mapping business logic to technical specifications. Establishing security baselines." },
                { num: "02", title: "Precision Development", desc: "Iterative, secure coding practices utilizing robust modern frameworks." },
                { num: "03", title: "Auditing & Deployment", desc: "Rigorous testing, vulnerability scanning, and controlled production rollout." }
              ].map((step, i) => (
                <FadeIn key={i} delay={i * 0.15}>
                  <div className="flex gap-6 group">
                    <div className="text-gold/30 font-serif-elegant text-2xl group-hover:text-gold transition-colors">{step.num}</div>
                    <div>
                      <h4 className="text-white text-lg mb-2">{step.title}</h4>
                      <p className="text-white/40 text-sm font-light leading-relaxed">{step.desc}</p>
                    </div>
                  </div>
                  {i < 2 && <div className="w-full h-[1px] bg-white/5 mt-8 ml-14" />}
                </FadeIn>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-32 md:py-48 px-6 md:px-12 bg-[#050505] relative overflow-hidden">
        <div className="absolute inset-0 flex justify-center items-center pointer-events-none opacity-5">
          <div className="w-[800px] h-[800px] border-[0.5px] border-gold rounded-full absolute" />
          <div className="w-[1200px] h-[1200px] border-[0.5px] border-gold rounded-full absolute" />
        </div>
        
        <div className="max-w-2xl mx-auto relative z-10">
          <FadeIn className="text-center">
            <h2 className="font-serif-elegant text-4xl md:text-6xl mb-6 text-white">
              Initiate <span className="italic text-white/40">Dialogue</span>
            </h2>
            <p className="text-white/40 font-light mb-16 text-sm md:text-base">
              To discuss a custom application requirement or to schedule a private demonstration of SecurFich, please provide your details below.
            </p>
            
            <form className="space-y-8 text-left" onSubmit={(e) => e.preventDefault()}>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="relative group">
                  <input 
                    type="text" 
                    id="name"
                    required
                    className="w-full bg-transparent border-b border-white/10 py-3 text-white focus:outline-none focus:border-gold transition-colors peer"
                    placeholder=" "
                  />
                  <label htmlFor="name" className="absolute left-0 top-3 text-white/30 text-sm pointer-events-none transition-all peer-focus:-top-4 peer-focus:text-[10px] peer-focus:text-gold peer-valid:-top-4 peer-valid:text-[10px]">
                    Full Name
                  </label>
                </div>
                <div className="relative group">
                  <input 
                    type="text" 
                    id="company"
                    required
                    className="w-full bg-transparent border-b border-white/10 py-3 text-white focus:outline-none focus:border-gold transition-colors peer"
                    placeholder=" "
                  />
                  <label htmlFor="company" className="absolute left-0 top-3 text-white/30 text-sm pointer-events-none transition-all peer-focus:-top-4 peer-focus:text-[10px] peer-focus:text-gold peer-valid:-top-4 peer-valid:text-[10px]">
                    Organization
                  </label>
                </div>
              </div>
              
              <div className="relative group">
                <input 
                  type="email" 
                  id="email"
                  required
                  className="w-full bg-transparent border-b border-white/10 py-3 text-white focus:outline-none focus:border-gold transition-colors peer"
                  placeholder=" "
                />
                <label htmlFor="email" className="absolute left-0 top-3 text-white/30 text-sm pointer-events-none transition-all peer-focus:-top-4 peer-focus:text-[10px] peer-focus:text-gold peer-valid:-top-4 peer-valid:text-[10px]">
                  Corporate Email
                </label>
              </div>

              <div className="relative group">
                <select 
                  id="interest"
                  required
                  className="w-full bg-transparent border-b border-white/10 py-3 text-white focus:outline-none focus:border-gold transition-colors appearance-none cursor-pointer"
                >
                  <option value="" disabled selected className="text-black bg-black hidden">Nature of Inquiry</option>
                  <option value="custom" className="text-black bg-white">Custom Application Development</option>
                  <option value="securfich" className="text-black bg-white">SecurFich Demonstration</option>
                  <option value="other" className="text-black bg-white">Other Consulting Inquiry</option>
                </select>
                <div className="absolute right-0 top-4 pointer-events-none text-white/30">
                  <ChevronRight className="w-4 h-4 rotate-90" />
                </div>
              </div>
              
              <div className="pt-8 text-center">
                <button type="submit" className="group relative inline-flex items-center justify-center px-12 py-4 border border-gold text-gold text-[10px] tracking-[0.3em] uppercase hover:bg-gold hover:text-black transition-all duration-500 overflow-hidden">
                  <span className="relative z-10">Submit Inquiry</span>
                </button>
              </div>
            </form>
          </FadeIn>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-[#020202] pt-24 pb-12 px-6 md:px-12 border-t border-white/5">
        <div className="max-w-screen-2xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-12 md:gap-8 mb-24">
            <div className="md:col-span-2">
              <img src="/__mockup/images/logo.png" alt="Solution TGV" className="h-8 w-auto mb-6 opacity-60 grayscale" />
              <p className="text-sm text-white/30 font-light max-w-sm">
                Architecting precision software and secure digital ecosystems for discerning enterprises.
              </p>
            </div>
            
            <div>
              <h4 className="text-white text-xs tracking-[0.2em] uppercase mb-6">Platforms</h4>
              <ul className="space-y-4 text-sm text-white/40 font-light">
                <li><a href="https://securfich.ca" className="hover:text-gold transition-colors">SecurFich Portal</a></li>
                <li><a href="#" className="hover:text-gold transition-colors">Tempett Application</a></li>
              </ul>
            </div>
            
            <div>
              <h4 className="text-white text-xs tracking-[0.2em] uppercase mb-6">Corporate</h4>
              <ul className="space-y-4 text-sm text-white/40 font-light">
                <li><a href="#expertise" className="hover:text-gold transition-colors">Expertise</a></li>
                <li><a href="#approach" className="hover:text-gold transition-colors">Methodology</a></li>
                <li><a href="#contact" className="hover:text-gold transition-colors">Contact</a></li>
              </ul>
            </div>
          </div>
          
          <div className="flex flex-col md:flex-row items-center justify-between pt-8 border-t border-white/5 text-[10px] tracking-widest text-white/20 uppercase">
            <p>&copy; {new Date().getFullYear()} Solution TGV. All Rights Reserved.</p>
            <div className="flex gap-8 mt-4 md:mt-0">
              <a href="#" className="hover:text-gold transition-colors">Privacy</a>
              <a href="#" className="hover:text-gold transition-colors">Terms</a>
              <a href="#" className="hover:text-gold transition-colors">Security</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}