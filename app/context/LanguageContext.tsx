'use client';

import { createContext, useContext, useState, ReactNode } from 'react';

type Language = 'es' | 'en';

interface LanguageContextType {
  language: Language;
  toggleLanguage: () => void;
  t: (key: string) => string;
}

const translations = {
  es: {
    'nav.home': 'Inicio',
    'nav.about': 'Sobre mí',
    'nav.background': 'Background',
    'nav.projects': 'Proyectos',
    'nav.contact': 'Contacto',
    'hero.title': 'Hola, soy Lautaro Tapia',
    'hero.subtitle': 'Data Analyst & Data Engineer',
    'hero.cta': 'Ver proyectos',
    'about.title': 'Sobre mí',
    'about.description': 'Soy un profesional apasionado por los datos, la automatización y el análisis eficiente. Me gusta combinar tecnología con creatividad para resolver problemas reales.',
    'about.skills': ['Creativo', 'Analítico', 'Colaborativo'],
    'about.cv': 'Descargar CV',
    'background.title': 'Background',
    'background.education': 'Ingeniería en Sistemas (UAI)  Diplomaturas en Bases de Datos, Power BI y Automatización.',
    'background.technologies': 'Python · SQL · Power BI · Alteryx · SAP · Snowflake · Node.js · Git',
    'background.experience': 'Especialista en automatización de reportes, análisis de datos y mejora de procesos en entornos corporativos.',
    'projects.title': 'Proyectos',
    'projects.powerbi.title': 'Análisis interactivo de la Liga Profesional Argentina (2016–2024) utilizando Web Scraping y Power BI',
    'projects.powerbi.description.button': 'Ver descripción del proyecto',
    'projects.powerbi.iframe.title': 'Dashboard Power BI',
    'projects.powerbi.disclaimer': 'El panel se carga desde Power BI y puede solicitar inicio de sesión. Es seguro, es una vista embebida desde una fuente oficial.',
    'projects.powerbi.link': 'Ver en Power BI',
    'contact.title': 'Contacto',
    'contact.subtitle': '¿Querés escribirme? Completá el siguiente formulario o encontrame en redes.',
    'contact.name': 'Nombre',
    'contact.email': 'Email',
    'contact.message': 'Mensaje',
    'contact.send': 'Enviar mensaje',
    'contact.success': '¡Mensaje enviado con éxito! Te responderé a la brevedad.',
    'contact.error': 'Por favor, revisa los campos marcados en rojo.',
    'contact.namePlaceholder': 'Tu nombre',
    'contact.emailPlaceholder': 'tu@email.com',
    'contact.messagePlaceholder': 'Escribe tu mensaje...',
    'contact.error.name': 'Por favor, ingresa tu nombre',
    'contact.error.email': 'Por favor, ingresa tu email',
    'contact.error.emailInvalid': 'Por favor, ingresa un email válido',
    'contact.error.message': 'Por favor, ingresa un mensaje',
    'contact.error.messageLength': 'El mensaje debe tener al menos 10 caracteres',
    'contact.orFindMe': 'o encontrame en',
    'footer.rights': 'Todos los derechos reservados',
  },
  en: {
    'nav.home': 'Home',
    'nav.about': 'About',
    'nav.background': 'Background',
    'nav.projects': 'Projects',
    'nav.contact': 'Contact',
    'hero.title': 'Hi, I\'m Lautaro Tapia',
    'hero.subtitle': 'Data Analyst & Data Engineer',
    'hero.cta': 'View projects',
    'about.title': 'About Me',
    'about.description': 'I am a professional passionate about data, automation, and efficient analysis. I enjoy combining technology with creativity to solve real problems.',
    'about.skills': ['Creative', 'Analytical', 'Collaborative'],
    'about.cv': 'Download CV',
    'background.title': 'Background',
    'background.education': 'Systems Engineering (UAI)  Diplomas in Databases, Power BI, and Automation.',
    'background.technologies': 'Python · SQL · Power BI · Alteryx · SAP · Snowflake · Node.js · Git',
    'background.experience': 'Specialist in report automation, data analysis, and process improvement in corporate environments.',
    'projects.title': 'Projects',
    'projects.powerbi.title': 'Interactive Analysis of the Argentine Professional League (2016–2024) using Web Scraping and Power BI',
    'projects.powerbi.description.button': 'Show project description',
    'projects.powerbi.iframe.title': 'Power BI Dashboard',
    'projects.powerbi.disclaimer': 'The dashboard loads from Power BI and may request login. It is safe, it is an embedded view from an official source.',
    'projects.powerbi.link': 'View in Power BI',
    'contact.title': 'Contact',
    'contact.subtitle': 'Want to reach out? Fill out the form below or find me on social media.',
    'contact.name': 'Name',
    'contact.email': 'Email',
    'contact.message': 'Message',
    'contact.send': 'Send message',
    'contact.success': 'Message sent successfully! I will get back to you soon.',
    'contact.error': 'Please check the fields marked in red.',
    'contact.namePlaceholder': 'Your name',
    'contact.emailPlaceholder': 'your@email.com',
    'contact.messagePlaceholder': 'Write your message...',
    'contact.error.name': 'Please enter your name',
    'contact.error.email': 'Please enter your email',
    'contact.error.emailInvalid': 'Please enter a valid email',
    'contact.error.message': 'Please enter a message',
    'contact.error.messageLength': 'The message must be at least 10 characters',
    'contact.orFindMe': 'or find me on',
    'footer.rights': 'All rights reserved',
  },
};

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [language, setLanguage] = useState<Language>('es');

  const toggleLanguage = () => {
    setLanguage(prev => (prev === 'es' ? 'en' : 'es'));
  };

  const t = (key: string): string => {
    const value = translations[language][key as keyof typeof translations[typeof language]];
    if (typeof value === 'string') return value;
    return key;
  };

  return (
    <LanguageContext.Provider value={{ language, toggleLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
} 