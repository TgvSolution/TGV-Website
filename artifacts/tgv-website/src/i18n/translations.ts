export const translations = {
  fr: {
    nav: {
      expertise: "Expertise",
      products: "Produits",
      about: "À propos",
      contact: "Nous contacter"
    },
    hero: {
      eyebrow: "Solutions TI Premium",
      title1: "Ingénierie de",
      title2: "Précision Numérique",
      subtitle: "Nous concevons des solutions logicielles sur mesure qui transforment des défis complexes en réalités élégantes, sécurisées et évolutives.",
      cta1: "Discuter de votre projet",
      cta2: "Explorer nos réalisations"
    },
    expertise: {
      title: "Maîtrise dans l'",
      titleAccent: "Exécution",
      dev: {
        title: "Développement Sur Mesure",
        desc: "Nous forgeons des systèmes de classe entreprise adaptés à vos besoins opérationnels uniques avec une précision sans compromis."
      },
      arch: {
        title: "Architecture Sécurisée",
        desc: "Intégration d'une sécurité de niveau militaire dans chaque couche, assurant la conformité aux réglementations les plus strictes."
      },
      scale: {
        title: "Infrastructure Évolutive",
        desc: "Des architectures cloud-natives conçues pour gérer la croissance de manière transparente, garantissant des performances optimales sous n'importe quelle charge."
      }
    },
    stats: {
      s1: "100% Satisfaction Client",
      s2: "99.9% Disponibilité",
      s3: "Chiffrement AES-256",
      s4: "Conforme Loi 25"
    },
    products: {
      title: "Nos Produits",
      titleAccent: "Phares",
      securfich: {
        subtitle: "Conforme à la Loi 25 (Québec) & LPRPDE",
        desc: "Le portail de partage de documents sécurisé par excellence pour les CPA, comptables et professionnels du droit.",
        f1: "Chiffrement de bout en bout (AES-256)",
        f2: "Gestion complète du cycle de vie des documents",
        f3: "Antivirus intégré et suivi des consentements",
        cta: "Découvrir SecurFich"
      },
      tempett: {
        subtitle: "Applications Web Haute Performance",
        desc: "Notre plateforme de démonstration pour des interfaces utilisateur intuitives adossées à des systèmes dorsaux robustes et conçus pour l'échelle.",
        f1: "Architecture moderne et réactive",
        f2: "Optimisation des performances extrêmes",
        f3: "Design centré sur l'utilisateur",
        cta: "Découvrir Tempett"
      }
    },
    cta: {
      title: "Prêt à élever votre",
      titleAccent: "technologie ?",
      desc: "Associez-vous à Solution TGV pour donner vie à votre vision avec une excellence technique inégalée.",
      btn: "Commencer la discussion"
    },
    footer: {
      tagline: "L'excellence en ingénierie logicielle pour les entreprises exigeantes.",
      contact: "Contact",
      address: "Québec, Canada",
      legal: "Mentions légales",
      privacy: "Politique de confidentialité",
      terms: "Conditions d'utilisation",
      rights: "© 2024 Solution TGV. Tous droits réservés."
    }
  },
  en: {
    nav: {
      expertise: "Expertise",
      products: "Products",
      about: "About",
      contact: "Contact Us"
    },
    hero: {
      eyebrow: "Premium IT Solutions",
      title1: "Digital",
      title2: "Precision Engineering",
      subtitle: "We architect custom software solutions that transform complex business challenges into elegant, secure, and scalable realities.",
      cta1: "Discuss Your Project",
      cta2: "Explore Our Work"
    },
    expertise: {
      title: "Mastery in",
      titleAccent: "Execution",
      dev: {
        title: "Custom Development",
        desc: "We forge enterprise-grade systems tailored to your unique operational needs with uncompromising precision."
      },
      arch: {
        title: "Secure Architecture",
        desc: "Integrating military-grade security at every layer, ensuring compliance with the strictest data regulations."
      },
      scale: {
        title: "Scalable Infrastructure",
        desc: "Cloud-native architectures designed to handle growth seamlessly, guaranteeing optimal performance under any load."
      }
    },
    stats: {
      s1: "100% Client Satisfaction",
      s2: "99.9% Uptime",
      s3: "AES-256 Encryption",
      s4: "Bill 25 Compliant"
    },
    products: {
      title: "Our Flagship",
      titleAccent: "Products",
      securfich: {
        subtitle: "Quebec Bill 25 & PIPEDA Compliant",
        desc: "The premier secure document sharing portal for CPAs, accountants, and legal professionals.",
        f1: "End-to-end encryption (AES-256)",
        f2: "Complete document lifecycle management",
        f3: "Built-in antivirus & consent tracking",
        cta: "Discover SecurFich"
      },
      tempett: {
        subtitle: "High-Performance Web Applications",
        desc: "Our demonstration platform for intuitive UIs backed by robust backend systems, designed for scale.",
        f1: "Modern, reactive architecture",
        f2: "Extreme performance optimization",
        f3: "User-centric design",
        cta: "Discover Tempett"
      }
    },
    cta: {
      title: "Ready to elevate your",
      titleAccent: "technology?",
      desc: "Partner with Solution TGV to bring your vision to life with unparalleled engineering excellence.",
      btn: "Start the Conversation"
    },
    footer: {
      tagline: "Software engineering excellence for demanding enterprises.",
      contact: "Contact",
      address: "Quebec, Canada",
      legal: "Legal",
      privacy: "Privacy Policy",
      terms: "Terms of Service",
      rights: "© 2024 Solution TGV. All rights reserved."
    }
  }
};

export type Language = 'fr' | 'en';
export type TranslationKey = keyof typeof translations.fr;