import { useState, useEffect } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { Menu, X, Code, Shield, Server, CheckCircle2, ChevronRight, Mail, Phone, MapPin } from "lucide-react";
import { useLanguage } from "../hooks/useLanguage";

export default function Home() {
  const { t, lang, setLang } = useLanguage();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const { scrollYProgress } = useScroll();
  const y = useTransform(scrollYProgress, [0, 1], ["0%", "50%"]);
  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const fadeIn = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } }
  };

  const staggerContainer = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.2 }
    }
  };

  return (
    <div className="min-h-screen bg-background text-foreground font-sans selection:bg-primary selection:text-primary-foreground overflow-hidden">
      {/* Navigation */}
      <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${isScrolled ? "bg-background/80 backdrop-blur-md border-b border-primary/20 py-4" : "bg-transparent py-6"}`}>
        <div className="container mx-auto px-6 flex items-center justify-between">
          <a href="#" className="flex items-center gap-3 group">
            <div className="relative w-10 h-10 rounded-none overflow-hidden">
              <img src="/images/logo.png" alt="Solution TGV Logo" className="w-full h-full object-contain" />
            </div>
            <span className="font-serif font-bold text-xl tracking-wide group-hover:text-primary transition-colors">Solution TGV</span>
          </a>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center gap-8">
            <div className="flex gap-6 text-sm font-medium tracking-wide">
              <a href="#expertise" className="hover:text-primary transition-colors">{t("nav.expertise")}</a>
              <a href="#products" className="hover:text-primary transition-colors">{t("nav.products")}</a>
              <a href="#about" className="hover:text-primary transition-colors">{t("nav.about")}</a>
            </div>
            
            <div className="flex items-center gap-2 text-sm font-medium border-l border-border pl-6">
              <button 
                onClick={() => setLang('fr')} 
                className={`transition-colors ${lang === 'fr' ? 'text-primary' : 'text-muted-foreground hover:text-foreground'}`}
              >
                FR
              </button>
              <span className="text-border">|</span>
              <button 
                onClick={() => setLang('en')} 
                className={`transition-colors ${lang === 'en' ? 'text-primary' : 'text-muted-foreground hover:text-foreground'}`}
              >
                EN
              </button>
            </div>

            <a href="#contact" className="bg-primary text-primary-foreground px-5 py-2.5 text-sm font-bold tracking-wide hover:bg-primary/90 transition-all active:scale-95 border border-primary">
              {t("nav.contact")}
            </a>
          </div>

          {/* Mobile Menu Toggle */}
          <button 
            className="md:hidden text-foreground p-2"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </nav>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="fixed inset-0 z-40 bg-background/95 backdrop-blur-xl pt-24 px-6 md:hidden flex flex-col gap-6">
          <div className="flex flex-col gap-4 text-lg font-serif">
            <a href="#expertise" onClick={() => setIsMobileMenuOpen(false)} className="border-b border-border pb-4">{t("nav.expertise")}</a>
            <a href="#products" onClick={() => setIsMobileMenuOpen(false)} className="border-b border-border pb-4">{t("nav.products")}</a>
            <a href="#about" onClick={() => setIsMobileMenuOpen(false)} className="border-b border-border pb-4">{t("nav.about")}</a>
          </div>
          <div className="flex items-center gap-4 text-lg mt-4">
            <button onClick={() => { setLang('fr'); setIsMobileMenuOpen(false); }} className={lang === 'fr' ? 'text-primary font-bold' : ''}>FR</button>
            <span className="text-border">|</span>
            <button onClick={() => { setLang('en'); setIsMobileMenuOpen(false); }} className={lang === 'en' ? 'text-primary font-bold' : ''}>EN</button>
          </div>
          <a href="#contact" onClick={() => setIsMobileMenuOpen(false)} className="bg-primary text-primary-foreground text-center py-4 font-bold mt-4">
            {t("nav.contact")}
          </a>
        </div>
      )}

      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center pt-20 overflow-hidden">
        <motion.div style={{ y, opacity }} className="absolute inset-0 z-0">
          <div className="absolute inset-0 bg-gradient-to-b from-background/40 via-background/80 to-background z-10" />
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-primary/10 via-background to-background z-10" />
          <img 
            src="/images/tgv-hero.png" 
            alt="Cinematic Background" 
            className="w-full h-full object-cover opacity-30 object-center"
          />
        </motion.div>

        <div className="container mx-auto px-6 relative z-10">
          <motion.div 
            initial="hidden"
            animate="visible"
            variants={staggerContainer}
            className="max-w-4xl"
          >
            <motion.div variants={fadeIn} className="inline-flex items-center gap-2 px-3 py-1 border border-primary/30 bg-primary/5 text-primary text-xs font-bold tracking-widest uppercase mb-8">
              <span className="w-1.5 h-1.5 bg-primary" />
              {t("hero.eyebrow")}
            </motion.div>
            
            <motion.h1 variants={fadeIn} className="text-5xl md:text-7xl lg:text-8xl font-serif font-medium leading-[1.1] tracking-tight mb-6">
              {t("hero.title1")} <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-[#E8D099] italic">
                {t("hero.title2")}
              </span>
            </motion.h1>
            
            <motion.p variants={fadeIn} className="text-lg md:text-xl text-muted-foreground max-w-2xl leading-relaxed mb-10 font-light">
              {t("hero.subtitle")}
            </motion.p>
            
            <motion.div variants={fadeIn} className="flex flex-col sm:flex-row gap-4">
              <a href="#contact" className="bg-primary text-primary-foreground px-8 py-4 font-bold tracking-wide hover:bg-primary/90 transition-all flex items-center justify-center gap-2 group">
                {t("hero.cta1")}
                <ChevronRight size={18} className="group-hover:translate-x-1 transition-transform" />
              </a>
              <a href="#products" className="border border-border bg-background/50 backdrop-blur-sm px-8 py-4 font-medium tracking-wide hover:border-primary/50 hover:bg-white/5 transition-all text-center">
                {t("hero.cta2")}
              </a>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Expertise Section */}
      <section id="expertise" className="py-32 relative bg-card">
        <div className="container mx-auto px-6">
          <div className="text-center mb-20">
            <h2 className="text-3xl md:text-5xl font-serif font-medium mb-4">
              {t("expertise.title")} <span className="text-primary italic">{t("expertise.titleAccent")}</span>
            </h2>
            <div className="w-24 h-1 bg-primary mx-auto" />
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              { icon: Code, title: t("expertise.dev.title"), desc: t("expertise.dev.desc") },
              { icon: Shield, title: t("expertise.arch.title"), desc: t("expertise.arch.desc") },
              { icon: Server, title: t("expertise.scale.title"), desc: t("expertise.scale.desc") }
            ].map((item, i) => (
              <motion.div 
                key={i}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                className="group border border-border bg-background p-8 hover:border-primary/50 transition-colors duration-500 relative overflow-hidden"
              >
                <div className="absolute top-0 right-0 w-32 h-32 bg-primary/5 rounded-bl-full -mr-16 -mt-16 group-hover:bg-primary/10 transition-colors duration-500" />
                <item.icon size={40} className="text-primary mb-6 stroke-[1.5]" />
                <h3 className="text-xl font-serif font-medium mb-4 group-hover:text-primary transition-colors">{item.title}</h3>
                <p className="text-muted-foreground leading-relaxed font-light">{item.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Stats Bar */}
      <section className="py-12 border-y border-border bg-background">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-0 divide-x-0 md:divide-x divide-border">
            {[
              t("stats.s1"),
              t("stats.s2"),
              t("stats.s3"),
              t("stats.s4")
            ].map((stat, i) => (
              <div key={i} className="text-center px-4 flex flex-col items-center justify-center gap-2">
                <CheckCircle2 size={24} className="text-primary" />
                <span className="font-medium tracking-wide text-sm md:text-base">{stat}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Products Section */}
      <section id="products" className="py-32 relative">
        <div className="container mx-auto px-6">
          <div className="text-center mb-24">
            <h2 className="text-3xl md:text-5xl font-serif font-medium mb-4">
              {t("products.title")} <span className="text-primary italic">{t("products.titleAccent")}</span>
            </h2>
            <div className="w-24 h-1 bg-primary mx-auto" />
          </div>

          {/* SecurFich */}
          <div className="grid lg:grid-cols-2 gap-16 items-center mb-32">
            <motion.div 
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              className="order-2 lg:order-1"
            >
              <div className="inline-flex items-center gap-2 px-3 py-1 border border-primary/30 text-primary text-xs font-bold tracking-widest uppercase mb-6">
                {t("products.securfich.subtitle")}
              </div>
              <h3 className="text-4xl font-serif font-medium mb-6">SecurFich</h3>
              <p className="text-lg text-muted-foreground mb-8 leading-relaxed font-light">
                {t("products.securfich.desc")}
              </p>
              <ul className="space-y-4 mb-10">
                {[
                  t("products.securfich.f1"),
                  t("products.securfich.f2"),
                  t("products.securfich.f3")
                ].map((feature, i) => (
                  <li key={i} className="flex items-start gap-3">
                    <span className="text-primary mt-1">✦</span>
                    <span className="font-light">{feature}</span>
                  </li>
                ))}
              </ul>
              <a href="https://securfich.ca" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 text-primary font-bold hover:gap-4 transition-all uppercase tracking-wider text-sm border-b border-primary pb-1">
                {t("products.securfich.cta")} <ChevronRight size={16} />
              </a>
            </motion.div>
            <motion.div 
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              className="order-1 lg:order-2 relative group border border-border bg-[#0a0f1e] p-6 flex items-center justify-center"
            >
              <img src="/images/securfich-illustration.png" alt="SecurFich Interface" className="w-full h-auto object-contain transition-all duration-700" />
            </motion.div>
          </div>

          {/* Tempett */}
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <motion.div 
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              className="relative group border border-border bg-[#0a0f1e] p-6 flex items-center justify-center"
            >
              <img src="/images/tempett-dashboard.png" alt="Tempett GPS Route Management" className="w-full h-auto object-contain transition-all duration-700" />
            </motion.div>
            <motion.div 
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-100px" }}
            >
              <div className="inline-flex items-center gap-2 px-3 py-1 border border-border text-muted-foreground text-xs font-bold tracking-widest uppercase mb-6">
                {t("products.tempett.subtitle")}
              </div>
              <h3 className="text-4xl font-serif font-medium mb-6">Tempett</h3>
              <p className="text-lg text-muted-foreground mb-8 leading-relaxed font-light">
                {t("products.tempett.desc")}
              </p>
              <ul className="space-y-4 mb-10">
                {[
                  t("products.tempett.f1"),
                  t("products.tempett.f2"),
                  t("products.tempett.f3")
                ].map((feature, i) => (
                  <li key={i} className="flex items-start gap-3">
                    <span className="text-primary mt-1">✦</span>
                    <span className="font-light">{feature}</span>
                  </li>
                ))}
              </ul>
              <button className="inline-flex items-center gap-2 text-primary font-bold hover:gap-4 transition-all uppercase tracking-wider text-sm border-b border-primary pb-1">
                {t("products.tempett.cta")} <ChevronRight size={16} />
              </button>
            </motion.div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section id="contact" className="py-32 relative border-t border-border overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img 
            src="/images/tgv-custom-dev.png" 
            alt="Development Background" 
            className="w-full h-full object-cover opacity-10 object-right grayscale"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-background via-background/90 to-transparent" />
        </div>
        
        <div className="container mx-auto px-6 relative z-10">
          <div className="max-w-2xl">
            <h2 className="text-4xl md:text-6xl font-serif font-medium mb-6 leading-tight">
              {t("cta.title")} <br />
              <span className="text-primary italic">{t("cta.titleAccent")}</span>
            </h2>
            <p className="text-xl text-muted-foreground mb-10 font-light leading-relaxed">
              {t("cta.desc")}
            </p>
            <a href="mailto:contact@solutiontgv.com" className="bg-primary text-primary-foreground px-10 py-5 text-lg font-bold tracking-wide hover:bg-primary/90 transition-all inline-flex items-center gap-3 group">
              {t("cta.btn")}
              <Mail size={20} className="group-hover:scale-110 transition-transform" />
            </a>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-card border-t border-border pt-20 pb-10">
        <div className="container mx-auto px-6">
          <div className="grid md:grid-cols-12 gap-12 mb-16">
            <div className="md:col-span-5">
              <a href="#" className="flex items-center gap-3 mb-6">
                <img src="/images/logo.png" alt="Logo" className="w-8 h-8 object-contain" />
                <span className="font-serif font-bold text-xl tracking-wide">Solution TGV</span>
              </a>
              <p className="text-muted-foreground font-light max-w-sm">
                {t("footer.tagline")}
              </p>
            </div>
            
            <div className="md:col-span-3 md:col-start-7">
              <h4 className="font-bold uppercase tracking-wider mb-6 text-sm">{t("footer.contact")}</h4>
              <ul className="space-y-4 text-muted-foreground font-light">
                <li className="flex items-center gap-3 hover:text-primary transition-colors cursor-pointer">
                  <Mail size={16} /> contact@solutiontgv.com
                </li>
                <li className="flex items-center gap-3 hover:text-primary transition-colors cursor-pointer">
                  <Phone size={16} /> +1 (800) 555-0199
                </li>
                <li className="flex items-center gap-3 hover:text-primary transition-colors cursor-pointer">
                  <MapPin size={16} /> {t("footer.address")}
                </li>
              </ul>
            </div>
            
            <div className="md:col-span-3">
              <h4 className="font-bold uppercase tracking-wider mb-6 text-sm">{t("footer.legal")}</h4>
              <ul className="space-y-4 text-muted-foreground font-light">
                <li><a href="#" className="hover:text-primary transition-colors">{t("footer.privacy")}</a></li>
                <li><a href="#" className="hover:text-primary transition-colors">{t("footer.terms")}</a></li>
              </ul>
            </div>
          </div>
          
          <div className="border-t border-border pt-8 flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-muted-foreground">
            <p>{t("footer.rights")}</p>
            <div className="flex gap-4">
              <a href="#" className="hover:text-primary transition-colors">LinkedIn</a>
              <a href="#" className="hover:text-primary transition-colors">GitHub</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}