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
    'nav.experience': 'Experiencia',
    'nav.contact': 'Contacto',
    'hero.title': 'Hola, soy Lautaro Tapia',
    'hero.subtitle': 'Senior BI Consultant',
    'hero.cta': 'Ver proyectos',
    'about.title': 'Sobre mí',
    'about.description': 'Analista Senior de Datos y Business Intelligence con más de 4 años de experiencia diseñando, modelando y optimizando soluciones analíticas para la toma de decisiones estratégicas. Especializado en Power BI, DAX, SQL y modelado dimensional de datos, con fuerte enfoque en calidad de datos, pipelines ETL escalables y diseño de dashboards ejecutivos.',
    'about.skills': ['Power BI', 'DAX', 'SQL', 'Python', 'ETL', 'Modelado Dimensional'],
    'about.cv': 'Descargar CV',
    'background.title': 'Background',
    'background.educationTitle': 'Formación',
    'background.technologiesTitle': 'Tecnologías',
    'background.experienceTitle': 'Experiencia',
    'background.certificationsTitle': 'Certificaciones',
    'background.education': 'Ingeniería en Sistemas – Universidad Abierta Interamericana (UAI) – 2024 – Presente\nContador Público (Parcial) – Universidad de Buenos Aires (UBA) – 2019 – 2022',
    'background.technologies': 'Power BI (DAX Avanzado, Power Query) · Tableau · Google Looker Studio · SQL Server · PostgreSQL · Alteryx · SSIS · Star Schema · Snowflake Schema · Python (Pandas, NumPy, Matplotlib) · VBA · TOTVS Protheus · SAP · Oracle · Microsoft Azure · Jira · Git/GitHub',
    'background.experience': 'Capacidad demostrada para trabajar de punta a punta, desde el relevamiento de requerimientos de negocio hasta la implementación técnica y la adopción por parte de los usuarios en entornos de Finanzas, Impuestos y ERP.',
    'background.certifications': 'Diplomatura en Bases de Datos – UTN (2025)\nAnálisis de Datos y Gestión de Dashboards con Tableau – UTN (2024)\nFundamentos de Bases de Datos – UTN (2024)',
    'experience.title': 'Experiencia Laboral',
    'experience.danwor.company': 'Danwor',
    'experience.danwor.role': 'Senior BI Consultant',
    'experience.danwor.period': 'Mar 2026 – Actualidad',
    'experience.danwor.bullets': 'Colaboración directa con stakeholders para identificar necesidades de negocio y maximizar el valor de los datos de los clientes mediante soluciones analíticas a medida.\nDiseño e implementación de estrategias de BI orientadas a la toma de decisiones estratégicas, asegurando la calidad y gobernanza de los datos.\nLiderazgo de proyectos de consultoría en BI, brindando asesoramiento senior y mentoreo a equipos para impulsar la adopción de herramientas analíticas.',
    'experience.bridgeinvest.company': 'BridgeInvest',
    'experience.bridgeinvest.role': 'Senior Data & BI Analyst',
    'experience.bridgeinvest.period': 'Nov 2025 – Feb 2026',
    'experience.bridgeinvest.bullets': 'Diseño y entrega de dashboards ejecutivos, financieros y operacionales en Power BI, trabajando de punta a punta desde el relevamiento de requerimientos.\nConstrucción y optimización de modelos dimensionales (star schema, snapshots, tablas de hechos y dimensiones).\nDesarrollo de medidas DAX avanzadas y capacitación de equipos en herramientas BI y mejores prácticas de modelado de datos.',
    'experience.totvs.company': 'TOTVS Internacional',
    'experience.totvs.role': 'Data Analyst',
    'experience.totvs.period': 'Ene 2025 – Dic 2025',
    'experience.totvs.bullets': 'Ejecución de consultas SQL complejas para extraer, manipular y analizar grandes volúmenes de datos de módulos ERP (Finanzas, Impuestos, Inventario).\nDiseño de dashboards dinámicos para el seguimiento de KPIs operacionales, reemplazando reportes manuales con soluciones automatizadas.\nValidación y limpieza de datos para asegurar la calidad en reportes financieros.',
    'experience.exxon.company': 'ExxonMobil',
    'experience.exxon.role': 'Senior Data Analyst',
    'experience.exxon.period': 'Ene 2024 – Ene 2025',
    'experience.exxon.bullets': 'Automatización de cálculos de provisiones impositivas, reduciendo el tiempo de ejecución en un 97% (de 10 min a 15 seg).\nImplementación de dashboard centralizado en Power BI para KPIs financieros e impositivos.\nConstrucción de pipelines ETL con SQL y Alteryx para consolidar datos transaccionales de múltiples fuentes globales.',
    'experience.pwc.company': 'PwC Acceleration Centers',
    'experience.pwc.role': 'Data Analyst (Semi Senior)',
    'experience.pwc.period': 'Jul 2021 – Dic 2023',
    'experience.pwc.bullets': 'Extracción, limpieza y análisis de datos a gran escala utilizando Alteryx y Excel avanzado para evaluaciones de créditos fiscales.\nAvance progresivo a través de cuatro roles (Tax Specialist 2 → 3 → 4 → Semi Senior) basado en desempeño consistente y capacidades analíticas expandidas.',
    'projects.title': 'Proyectos',
    'projects.declarar.title': 'declar.ar – Sistema de Facturación Online',
    'projects.declarar.description.button': 'Descripción del proyecto',
    'projects.declarar.link': 'Visitar declar.ar',
    'projects.declarar.tech': 'Tecnologías: Angular, ASP.NET, SQL Server, Mercado Pago API',
    'projects.powerbi.title': 'Análisis interactivo de la Liga Profesional Argentina (2016–2024) utilizando Web Scraping y Power BI',
    'projects.powerbi.description.button': 'Descripción del proyecto',
    'projects.powerbi.iframe.title': 'Dashboard Power BI',
    'projects.powerbi.disclaimer': 'El panel se carga desde Power BI y puede solicitar inicio de sesión. Es seguro, es una vista embebida desde una fuente oficial.',
    'projects.powerbi.link': 'Ver en Power BI',
    'projects.boolingsearch.title': 'BoolingSearch – Encontrá talento específico sin ser experto en búsquedas booleanas',
    'projects.boolingsearch.description.button': 'Descripción del proyecto',
    'projects.boolingsearch.link': 'Probar BoolingSearch',
    'projects.boolingsearch.tech': 'Tecnologías: Next.js, React, Tailwind CSS, Node.js, Groq API',
    'projects.civi.title': 'Civi - Creador de CV con IA',
    'projects.civi.button': 'Descripción del proyecto',
    'projects.civi.link': 'Visitar Civi',
    'projects.civi.tech': 'Tecnologías: Next.js, TypeScript, Tailwind CSS, Groq API, Llama3-70B',
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
    'nav.experience': 'Experience',
    'nav.contact': 'Contact',
    'hero.title': 'Hi, I\'m Lautaro Tapia',
    'hero.subtitle': 'Senior BI Consultant',
    'hero.cta': 'View projects',
    'about.title': 'About Me',
    'about.description': 'Senior Data & Business Intelligence Analyst with 4+ years of experience designing, modeling, and optimizing analytical solutions for strategic decision-making. Specialized in Power BI, DAX, SQL, and dimensional data modeling, with a strong focus on data quality, scalable ETL pipelines, and executive dashboard design.',
    'about.skills': ['Power BI', 'DAX', 'SQL', 'Python', 'ETL', 'Dimensional Modeling'],
    'about.cv': 'Download CV',
    'background.title': 'Background',
    'background.educationTitle': 'Education',
    'background.technologiesTitle': 'Technologies',
    'background.experienceTitle': 'Experience',
    'background.certificationsTitle': 'Certifications',
    'background.education': 'Systems Engineering – Universidad Abierta Interamericana (UAI) – 2024 – Present\nPublic Accounting (Partial) – Universidad de Buenos Aires (UBA) – 2019 – 2022',
    'background.technologies': 'Power BI (Advanced DAX, Power Query) · Tableau · Google Looker Studio · SQL Server · PostgreSQL · Alteryx · SSIS · Star Schema · Snowflake Schema · Python (Pandas, NumPy, Matplotlib) · VBA · TOTVS Protheus · SAP · Oracle · Microsoft Azure · Jira · Git/GitHub',
    'background.experience': 'Proven ability to work end-to-end, from business requirements gathering to technical implementation and user adoption in Finance, Tax, and ERP environments.',
    'background.certifications': 'Database Diploma – UTN (2025)\nData Analysis & Dashboard Management with Tableau – UTN (2024)\nDatabase Fundamentals – UTN (2024)',
    'experience.title': 'Work Experience',
    'experience.danwor.company': 'Danwor',
    'experience.danwor.role': 'Senior BI Consultant',
    'experience.danwor.period': 'Mar 2026 – Present',
    'experience.danwor.bullets': 'Direct collaboration with stakeholders to identify business needs and maximize client data value through tailored analytical solutions.\nDesign and implementation of BI strategies focused on strategic decision-making, ensuring data quality and governance.\nLeading BI consulting projects, providing senior advisory and mentoring teams to drive adoption of analytical tools.',
    'experience.bridgeinvest.company': 'BridgeInvest',
    'experience.bridgeinvest.role': 'Senior Data & BI Analyst',
    'experience.bridgeinvest.period': 'Nov 2025 – Feb 2026',
    'experience.bridgeinvest.bullets': 'Design and delivery of executive, financial, and operational dashboards in Power BI, working end-to-end from requirements gathering.\nBuilding and optimizing dimensional models (star schema, snapshots, fact and dimension tables).\nDevelopment of advanced DAX measures and team training in BI tools and data modeling best practices.',
    'experience.totvs.company': 'TOTVS International',
    'experience.totvs.role': 'Data Analyst',
    'experience.totvs.period': 'Jan 2025 – Dec 2025',
    'experience.totvs.bullets': 'Execution of complex SQL queries to extract, manipulate, and analyze large data volumes from ERP modules (Finance, Tax, Inventory).\nDesign of dynamic dashboards for operational KPI tracking, replacing manual reports with automated solutions.\nData validation and cleansing to ensure quality in financial reports.',
    'experience.exxon.company': 'ExxonMobil',
    'experience.exxon.role': 'Senior Data Analyst',
    'experience.exxon.period': 'Jan 2024 – Jan 2025',
    'experience.exxon.bullets': 'Automation of tax provision calculations, reducing execution time by 97% (from 10 min to 15 sec).\nImplementation of centralized Power BI dashboard for financial and tax KPIs.\nBuilding ETL pipelines with SQL and Alteryx to consolidate transactional data from multiple global sources.',
    'experience.pwc.company': 'PwC Acceleration Centers',
    'experience.pwc.role': 'Data Analyst (Semi Senior)',
    'experience.pwc.period': 'Jul 2021 – Dec 2023',
    'experience.pwc.bullets': 'Large-scale data extraction, cleansing, and analysis using Alteryx and advanced Excel for tax credit evaluations.\nProgressive advancement through four roles (Tax Specialist 2 → 3 → 4 → Semi Senior) based on consistent performance and expanded analytical capabilities.',
    'projects.title': 'Projects',
    'projects.declarar.title': 'declar.ar – Online Invoicing System',
    'projects.declarar.description.button': 'Show project description',
    'projects.declarar.link': 'Visit declar.ar',
    'projects.declarar.tech': 'Technologies: Angular, ASP.NET, SQL Server, Mercado Pago API',
    'projects.powerbi.title': 'Interactive Analysis of the Argentine Professional League (2016–2024) using Web Scraping and Power BI',
    'projects.powerbi.description.button': 'Show project description',
    'projects.powerbi.iframe.title': 'Power BI Dashboard',
    'projects.powerbi.disclaimer': 'The dashboard loads from Power BI and may request login. It is safe, it is an embedded view from an official source.',
    'projects.powerbi.link': 'View in Power BI',
    'projects.boolingsearch.title': 'BoolingSearch – Find specific talent without being a boolean search expert',
    'projects.boolingsearch.description.button': 'Show project description',
    'projects.boolingsearch.link': 'Try BoolingSearch',
    'projects.boolingsearch.tech': 'Technologies: Next.js, React, Tailwind CSS, Node.js, Groq API',
    'projects.civi.title': 'Civi - CV Creator with AI',
    'projects.civi.button': 'Show project description',
    'projects.civi.link': 'Visit Civi',
    'projects.civi.tech': 'Technologies: Next.js, TypeScript, Tailwind CSS, Groq API, Llama3-70B',
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