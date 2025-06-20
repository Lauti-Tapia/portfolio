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
    'hero.subtitle': 'Ingeniero en Sistemas',
    'hero.cta': 'Ver proyectos',
    'about.title': 'Sobre mí',
    'about.description': 'Soy un profesional apasionado por los datos, la automatización y el análisis eficiente. Me gusta combinar tecnología con creatividad para resolver problemas reales.',
    'about.skills': ['Creativo', 'Analítico', 'Colaborativo'],
    'about.cv': 'Descargar CV',
    'background.title': 'Background',
    'background.education': 'Ingeniería en Sistemas (UAI)  Diplomaturas en Bases de Datos, Power BI y Automatización.',
    'background.technologies': 'Python · SQL · Power BI · Alteryx · SAP · Snowflake · Node.js · React · Next.js · TypeScript · Tailwind CSS · Git · API Integration · Vercel',
    'background.experience': 'Especialista en automatización de reportes, análisis de datos y mejora de procesos en entornos corporativos.',
    'projects.title': 'Proyectos',
    'projects.powerbi.title': 'Análisis interactivo de la Liga Profesional Argentina (2016–2024) utilizando Web Scraping y Power BI',
    'projects.powerbi.description.button': 'Descripción del proyecto',
    'projects.powerbi.iframe.title': 'Dashboard Power BI',
    'projects.powerbi.disclaimer': 'El panel se carga desde Power BI y puede solicitar inicio de sesión. Es seguro, es una vista embebida desde una fuente oficial.',
    'projects.powerbi.link': 'Ver en Power BI',
    'projects.civi.title': 'Civi - Creador de CV con IA',
    'projects.civi.description': 'Civi es una aplicación web moderna y gratuita que desarrollé para facilitar la creación de CVs profesionales y personalizados en minutos. 🚀\n\n✨ **Características principales:**\n🤖 Utiliza inteligencia artificial avanzada (Groq AI con Llama3-70B) para adaptar automáticamente tu currículum a descripciones de trabajo específicas\n🎯 Personalización inteligente que ayuda a destacar en el mercado laboral y superar los sistemas ATS\n🌍 Soporte completo para español e inglés\n🌙 Interfaz moderna con modo oscuro y claro\n📱 Diseño responsive optimizado para todos los dispositivos\n🖨️ Exportación directa a PDF lista para imprimir\n🔒 Privacidad total - no almacena datos personales\n⚡ Completamente gratuito, sin costos ocultos\n\n**¿Cómo funciona?** 📋\n1. El usuario completa su información profesional\n2. Pega la descripción del trabajo al que quiere aplicar\n3. La IA analiza el puesto y optimiza automáticamente el CV\n4. Genera un preview personalizado en tiempo real\n5. Exporta el CV finalizado en PDF\n\nMe interesó este proyecto porque combina tecnología, accesibilidad y un impacto real en la vida de quienes están buscando trabajo. Quise resolver algo concreto: que armar un buen CV no sea un privilegio de quienes saben redactar bien o tienen acceso a consultorías profesionales. 💡\n\nEl resultado es una herramienta que democratiza el acceso a CVs de calidad profesional, ayudando a personas a conseguir mejores oportunidades laborales.',
    'projects.civi.button': 'Descripción del proyecto',
    'projects.civi.link': 'Visitar Civi',
    'projects.civi.tech': 'Tecnologías: Next.js, TypeScript, Tailwind CSS, Groq API, Llama3-70B',
    'projects.boolingsearch.title': 'BoolingSearch – Encontrá talento específico sin ser experto en búsquedas booleanas',
    'projects.boolingsearch.description.button': 'Descripción del proyecto',
    'projects.boolingsearch.link': 'Probar BoolingSearch',
    'projects.boolingsearch.tech': 'Tecnologías: Next.js, React, Tailwind CSS, Node.js, Groq API',
    'projects.switch': 'Cambiar proyecto',
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
    'hero.subtitle': 'Systems Engineer',
    'hero.cta': 'View projects',
    'about.title': 'About Me',
    'about.description': 'I am a professional passionate about data, automation, and efficient analysis. I enjoy combining technology with creativity to solve real problems.',
    'about.skills': ['Creative', 'Analytical', 'Collaborative'],
    'about.cv': 'Download CV',
    'background.title': 'Background',
    'background.education': 'Systems Engineering (UAI)  Diplomas in Databases, Power BI, and Automation.',
    'background.technologies': 'Python · SQL · Power BI · Alteryx · SAP · Snowflake · Node.js · React · Next.js · TypeScript · Tailwind CSS · Git · API Integration · Vercel',
    'background.experience': 'Specialist in report automation, data analysis, and process improvement in corporate environments.',
    'projects.title': 'Projects',
    'projects.powerbi.title': 'Interactive Analysis of the Argentine Professional League (2016–2024) using Web Scraping and Power BI',
    'projects.powerbi.description.button': 'Show project description',
    'projects.powerbi.iframe.title': 'Power BI Dashboard',
    'projects.powerbi.disclaimer': 'The dashboard loads from Power BI and may request login. It is safe, it is an embedded view from an official source.',
    'projects.powerbi.link': 'View in Power BI',
    'projects.civi.title': 'Civi - CV Creator with AI',
    'projects.civi.description': 'Civi is a modern, free web application I developed to facilitate the creation of professional and personalized CVs in minutes. 🚀\n\n✨ **Key features:**\n🤖 Uses advanced artificial intelligence (Groq AI with Llama3-70B) to automatically adapt your resume to specific job descriptions\n🎯 Smart personalization that helps you stand out in the job market and overcome ATS systems\n🌍 Full support for Spanish and English\n🌙 Modern interface with dark and light modes\n📱 Responsive design optimized for all devices\n🖨️ Direct PDF export ready for printing\n🔒 Total privacy - no personal data storage\n⚡ Completely free, no hidden costs\n\n**How does it work?** 📋\n1. User completes their professional information\n2. Pastes the job description they want to apply for\n3. AI analyzes the position and automatically optimizes the CV\n4. Generates a personalized preview in real time\n5. Exports the finished CV in PDF\n\nI was interested in this project because it combines technology, accessibility, and a real impact on the lives of those looking for work. I wanted to solve a specific problem: that creating a good CV not be a privilege of those who can write well or have access to professional consulting. 💡\n\nThe result is a tool that democratizes access to professional-quality CVs, helping people get better job opportunities.',
    'projects.civi.button': 'Show project description',
    'projects.civi.link': 'Visit Civi',
    'projects.civi.tech': 'Technologies: Next.js, TypeScript, Tailwind CSS, Groq API, Llama3-70B',
    'projects.boolingsearch.title': 'BoolingSearch – Find specific talent without being a boolean search expert',
    'projects.boolingsearch.description.button': 'Show project description',
    'projects.boolingsearch.link': 'Try BoolingSearch',
    'projects.boolingsearch.tech': 'Technologies: Next.js, React, Tailwind CSS, Node.js, Groq API',
    'projects.switch': 'Change project',
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