export const defaultLocale = "de";
export const locales = ["de", "en"] as const;
export type Locale = (typeof locales)[number];

export const translations = {
  de: {
    nav: {
      home: "Home",
      portfolio: "Portfolio",
      partners: "Partner",
      about: "Über uns",
      contact: "Kontakt",
    },
    hero: {
      tagline: "Strategische Investitionen. Industrielle Exzellenz.",
      description:
        "R&B Rajh Holding AG ist eine Schweizer Holdinggesellschaft mit Sitz in Burgdorf, die sich auf strategische Beteiligungen, Industriedienstleistungen und internationale Partnerschaften konzentriert.",
      cta: "Portfolio entdecken",
      cta2: "Kontakt aufnehmen",
      founded: "Gegründet",
      capital: "Kapital",
      headquarters: "Hauptsitz",
      companies: "Unternehmen",
    },
    stats: {
      founded: "2019",
      capital: "CHF 100K",
      hq: "Burgdorf, CH",
      companies: "6+",
    },
    portfolio: {
      title: "Unser Portfolio",
      subtitle:
        "Ein diversifiziertes Portfolio aus Industrieunternehmen und Dienstleistungsbetrieben in der Schweiz und Sri Lanka.",
      learnMore: "Mehr erfahren",
      visitWebsite: "Website besuchen",
      companies: {
        tschannen: {
          name: "Tschannen Spritzwerk AG",
          location: "Burgdorf, Schweiz",
          sector: "Oberflächenbehandlung",
          description:
            "Spezialist für Pulverbeschichtung und Nassmalerei mit umfassenden Vorbehandlungs-, Qualitätskontroll- und Verpackungsdienstleistungen für Industrie- und Gewerbebetriebe.",
          tags: ["Pulverbeschichtung", "Nassmalerei", "Oberflächentechnik"],
          website: "https://tschannenspritzwerk.ch",
        },
        leuta: {
          name: "Leuta Korrosionsschutz AG",
          location: "Gretzenbach, Schweiz",
          sector: "Korrosionsschutz",
          description:
            "Seit 1966 aktiver Schweizer Spezialist für Metallveredelung und Korrosionsschutz. Bietet Sandstrahlen, Spritzverzinken, Grundierung, Decklack und Duplex-Beschichtungen an.",
          tags: ["Korrosionsschutz", "Metallveredelung", "Spritzverzinken"],
          website: "https://leutakorrosionsschutz.ch",
        },
        rbcompany: {
          name: "R&B Company GmbH",
          location: "Schweiz",
          sector: "Industriedienstleistungen",
          description:
            "Operatives Kernunternehmen der Gruppe mit engem Zusammenspiel zwischen Leuta Korrosionsschutz AG und Tschannen Spritzwerk ag – vereint Prozesse von Anfang bis Ende.",
          tags: ["Industriedienste", "Partnerschaft", "Qualität"],
          website: "#",
        },
        guesthouse: {
          name: "R&B Guest House",
          location: "Thirunelvely, Jaffna, Sri Lanka",
          sector: "Gastgewerbe",
          description:
            "Familiäres Gasthaus im Herzen von Thirunelvely, Jaffna. Bietet Deluxe-, Standard- und Familienzimmer mit WLAN, Frühstück, Flughafentransfer und geführten Touren.",
          tags: ["Gasthaus", "Jaffna", "Sri Lanka"],
          website: "https://rbguesthouse.ch",
        },
        farm: {
          name: "R&B Organic Farm",
          location: "Thirunelvely, Jaffna, Sri Lanka",
          sector: "Landwirtschaft",
          description:
            "Bio-Landwirtschaftsbetrieb in Jaffna, Sri Lanka. Spezialisiert auf Ringelblumenanbau und Gemüseproduktion, verbunden mit lokalem Anbau und nachhaltiger Landwirtschaft.",
          tags: ["Bio-Farming", "Jaffna", "Nachhaltigkeit"],
          website: "#",
        },
      },
    },
    partners: {
      title: "Unsere Partner",
      subtitle: "Strategische Partnerschaften, die Wert schaffen.",
      doubleA: {
        name: "DoubleA Solutions GmbH",
        description:
          "Spezialist für nachhaltige IT-Lösungen und Photovoltaik-Systeme. Bietet Softwareentwicklung, SaaS-Produkte und komplette Solarinstallationsdienste in der Schweiz an.",
        website: "https://doubleasolutions.ch",
      },
      habb: {
        name: "HABB.ch",
        description:
          "Strategischer Schweizer Partner für Geschäftsentwicklung, digitale Vernetzung und innovative Lösungen im Schweizer Markt.",
        website: "https://habb.ch",
      },
    },
    team: {
      title: "Unser Team",
      subtitle: "Die Menschen hinter unserem Erfolg.",
    },
    about: {
      title: "Über R&B Rajh Holding AG",
      subtitle: "Eine Holdinggesellschaft mit Vision und Stärke",
      description:
        "Gegründet am 12. März 2019 in Burgdorf, Schweiz, ist die R&B Rajh Holding AG eine dynamische Holdinggesellschaft mit einem eingetragenen Kapital von 100.000 CHF. Unter der Führung von Suyarajh Kanagaratnam als Vorstandsmitglied und gesetzlichem Vertreter baut das Unternehmen aktiv ein Portfolio aus Industrie-, Dienstleistungs- und Gastgewerbeunternehmen auf.",
      mission: "Unsere Mission",
      missionText:
        "Strategische Bündelung von Kompetenzen in Industrie, Technologie und Gastgewerbe zur Schaffung nachhaltiger Werte.",
      vision: "Unsere Vision",
      visionText:
        "Führende Schweizer Holding mit globalem Einfluss – von der Industrie bis zur Hospitality.",
      values: "Unsere Werte",
      valuesText:
        "Qualität, Integrität, Innovation und Partnerschaft sind die Grundpfeiler unserer Unternehmenskultur.",
      ceo: "Suyarajh Kanagaratnam",
      ceoTitle: "Gründer, Vorstandsmitglied & Geschäftsführer",
      incorporated: "Eingetragen",
      registeredCapital: "Eingetragenes Kapital",
      legalForm: "Rechtsform",
      agForm: "Aktiengesellschaft (AG)",
    },
    contact: {
      title: "Kontakt",
      subtitle: "Nehmen Sie Kontakt auf",
      address: "Adresse",
      email: "E-Mail",
      phone: "Telefon",
      send: "Nachricht senden",
      name: "Ihr Name",
      emailLabel: "Ihre E-Mail",
      message: "Ihre Nachricht",
    },
    footer: {
      rights: "Alle Rechte vorbehalten.",
      tagline: "Strategische Investitionen. Industrielle Exzellenz.",
      portfolio: "Portfolio",
      partners: "Partner",
      about: "Über uns",
      contact: "Kontakt",
    },
  },
  en: {
    nav: {
      home: "Home",
      portfolio: "Portfolio",
      partners: "Partners",
      about: "About",
      contact: "Contact",
    },
    hero: {
      tagline: "Strategic Investments. Industrial Excellence.",
      description:
        "R&B Rajh Holding AG is a Swiss holding company based in Burgdorf, focused on strategic participations, industrial services, and international partnerships.",
      cta: "Explore Portfolio",
      cta2: "Get in Touch",
      founded: "Founded",
      capital: "Capital",
      headquarters: "Headquarters",
      companies: "Companies",
    },
    stats: {
      founded: "2019",
      capital: "CHF 100K",
      hq: "Burgdorf, CH",
      companies: "6+",
    },
    portfolio: {
      title: "Our Portfolio",
      subtitle:
        "A diversified portfolio of industrial companies and service businesses across Switzerland and Sri Lanka.",
      learnMore: "Learn More",
      visitWebsite: "Visit Website",
      companies: {
        tschannen: {
          name: "Tschannen Spritzwerk AG",
          location: "Burgdorf, Switzerland",
          sector: "Surface Treatment",
          description:
            "Expert in powder coating and wet painting with comprehensive pre-treatment, quality control and packaging services for industrial and commercial clients.",
          tags: ["Powder Coating", "Wet Painting", "Surface Technology"],
          website: "https://tschannenspritzwerk.ch",
        },
        leuta: {
          name: "Leuta Korrosionsschutz AG",
          location: "Gretzenbach, Switzerland",
          sector: "Corrosion Protection",
          description:
            "Swiss specialist in metal finishing and corrosion protection active since 1966. Offers sandblasting, spray galvanizing, primers, topcoats, and duplex coatings.",
          tags: [
            "Corrosion Protection",
            "Metal Finishing",
            "Spray Galvanizing",
          ],
          website: "https://leutakorrosionsschutz.ch",
        },
        rbcompany: {
          name: "R&B Company GmbH",
          location: "Switzerland",
          sector: "Industrial Services",
          description:
            "Core operating company of the group with close collaboration between Leuta Korrosionsschutz AG and Tschannen Spritzwerk – uniting processes from start to finish.",
          tags: ["Industrial Services", "Partnership", "Quality"],
          website: "#",
        },
        guesthouse: {
          name: "R&B Guest House",
          location: "Thirunelvely, Jaffna, Sri Lanka",
          sector: "Hospitality",
          description:
            "A family-run guest house in the heart of Thirunelvely, Jaffna. Offering Deluxe, Standard, and Family rooms with free Wi-Fi, breakfast, airport transfer, and guided tours.",
          tags: ["Guest House", "Jaffna", "Sri Lanka"],
          website: "https://rbguesthouse.ch",
        },
        farm: {
          name: "R&B Organic Farm",
          location: "Thirunelvely, Jaffna, Sri Lanka",
          sector: "Agriculture",
          description:
            "Organic farming operation in Jaffna, Sri Lanka. Specializing in marigold cultivation and vegetable production, embracing local cultivation and sustainable practices.",
          tags: ["Organic Farming", "Jaffna", "Sustainability"],
          website: "#",
        },
      },
    },
    partners: {
      title: "Our Partners",
      subtitle: "Strategic partnerships that create value.",
      doubleA: {
        name: "DoubleA Solutions GmbH",
        description:
          "Specialist in sustainable IT solutions and photovoltaic systems. Providing software development, SaaS products, and complete solar installation services across Switzerland.",
        website: "https://doubleasolutions.ch",
      },
      habb: {
        name: "HABB.ch",
        description:
          "Strategic Swiss partner for business development, digital networking, and innovative solutions in the Swiss market.",
        website: "https://habb.ch",
      },
    },
    team: {
      title: "Our Team",
      subtitle: "The people behind our success.",
    },
    about: {
      title: "About R&B Rajh Holding AG",
      subtitle: "A Holding Company with Vision and Strength",
      description:
        "Founded on March 12, 2019 in Burgdorf, Switzerland, R&B Rajh Holding AG is a dynamic holding company with a registered capital of CHF 100,000. Under the leadership of Suyarajh Kanagaratnam as board member and legal representative, the company actively builds a portfolio of industrial, service, and hospitality businesses.",
      mission: "Our Mission",
      missionText:
        "Strategically bundling competencies in industry, technology, and hospitality to create sustainable value.",
      vision: "Our Vision",
      visionText:
        "Leading Swiss holding company with global influence – from industry to hospitality.",
      values: "Our Values",
      valuesText:
        "Quality, integrity, innovation, and partnership are the cornerstones of our corporate culture.",
      ceo: "Suyarajh Kanagaratnam",
      ceoTitle: "Founder, Board Member & Managing Director",
      incorporated: "Incorporated",
      registeredCapital: "Registered Capital",
      legalForm: "Legal Form",
      agForm: "Corporation (AG)",
    },
    contact: {
      title: "Contact",
      subtitle: "Get in Touch",
      address: "Address",
      email: "Email",
      phone: "Phone",
      send: "Send Message",
      name: "Your Name",
      emailLabel: "Your Email",
      message: "Your Message",
    },
    footer: {
      rights: "All rights reserved.",
      tagline: "Strategic Investments. Industrial Excellence.",
      portfolio: "Portfolio",
      partners: "Partners",
      about: "About",
      contact: "Contact",
    },
  },
};
