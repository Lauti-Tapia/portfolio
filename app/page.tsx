'use client';

import { useState, useRef } from 'react';
import Image from 'next/image';
import MobileMenu from './components/MobileMenu';
import ContactForm from './components/ContactForm';
import Accordion from './components/Accordion';
import { motion } from 'framer-motion';
import { useLanguage, LanguageProvider } from './context/LanguageContext';

function HomeContent() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { t, language, toggleLanguage } = useLanguage();
  const [currentProject, setCurrentProject] = useState(0);

  // Refs para cada sección
  const inicioRef = useRef<HTMLDivElement>(null);
  const sobreMiRef = useRef<HTMLDivElement>(null);
  const backgroundRef = useRef<HTMLDivElement>(null);
  const experienciaRef = useRef<HTMLDivElement>(null);
  const proyectosRef = useRef<HTMLDivElement>(null);
  const contactoRef = useRef<HTMLDivElement>(null);

  const navItems = [
    { href: '#inicio', label: t('nav.home'), ref: inicioRef },
    { href: '#sobremi', label: t('nav.about'), ref: sobreMiRef },
    { href: '#background', label: t('nav.background'), ref: backgroundRef },
    { href: '#experiencia', label: t('nav.experience'), ref: experienciaRef },
    { href: '#proyectos', label: t('nav.projects'), ref: proyectosRef },
    { href: '#contacto', label: t('nav.contact'), ref: contactoRef },
  ];

  const handleNavClick = (ref: React.RefObject<HTMLDivElement>) => (e: React.MouseEvent) => {
    e.preventDefault();
    ref.current?.scrollIntoView({ behavior: 'smooth' });
    setIsMobileMenuOpen(false);
  };

  // Agrega scroll-behavior: smooth al body
  if (typeof window !== 'undefined') {
    document.body.style.scrollBehavior = 'smooth';
  }

  const totalProjects = 4;
  const goPrev = () => setCurrentProject((prev) => (prev === 0 ? totalProjects - 1 : prev - 1));
  const goNext = () => setCurrentProject((prev) => (prev === totalProjects - 1 ? 0 : prev + 1));

  return (
    <main className="pt-10 bg-[#0a0a23] min-h-screen">
      {/* Header */}
      <header className="fixed top-0 w-full z-50 bg-[#0c0f1a]/90 backdrop-blur border-b border-gray-800" role="banner">
        <div className="max-w-6xl mx-auto px-6 py-4 flex justify-between items-center text-white">
          <h1 className="text-lg font-semibold">Lautaro Tapia</h1>
          {/* Desktop Navigation */}
          <nav className="hidden md:flex gap-6 text-sm" role="navigation" aria-label="Navegación principal">
            {navItems.map((item) => (
              <a
                key={item.href}
                href={item.href}
                className="hover:text-blue-400 transition"
                aria-label={`Ir a sección ${item.label}`}
                onClick={handleNavClick(item.ref as React.RefObject<HTMLDivElement>)}
              >
                {item.label}
              </a>
            ))}
          </nav>
          {/* Mobile Menu Button */}
          <button
            className="md:hidden text-white hover:text-blue-400 transition"
            onClick={() => setIsMobileMenuOpen(true)}
            aria-label="Abrir menú de navegación"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4 6h16M4 12h16M4 18h16"
              />
            </svg>
          </button>
          {/* Language Toggle */}
          <button
            className="text-sm hover:text-blue-400 transition ml-4"
            onClick={toggleLanguage}
            aria-label={`Cambiar idioma a ${language === 'es' ? 'inglés' : 'español'}`}
          >
            🌐 {language.toUpperCase()}
          </button>
        </div>
      </header>

      {/* Mobile Menu */}
      <MobileMenu
        items={navItems.map(({ href, label }) => ({ href, label }))}
        isOpen={isMobileMenuOpen}
        onClose={() => setIsMobileMenuOpen(false)}
      />

      {/* Hero */}
      <section
        id="inicio"
        ref={inicioRef}
        className="relative min-h-screen flex flex-col justify-center items-center text-center bg-[#0a0a23] text-white overflow-hidden"
        aria-label="Sección de inicio"
      >
        {/* Fondo: onda azul animada y glow */}
        <div className="absolute inset-0 w-full h-full pointer-events-none z-0">
          {/* Glow azul animado */}
          <div className="absolute w-[900px] h-[900px] bg-blue-500/20 rounded-full blur-[140px] left-1/2 -translate-x-1/2 top-[-15%] animate-pulse"></div>
          {/* Onda SVG con glow en el footer del hero */}
          <svg
            className="absolute bottom-0 left-0 w-full h-[160px] md:h-[200px]"
            viewBox="0 0 1440 200"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            preserveAspectRatio="none"
          >
            <defs>
              <linearGradient id="wave-gradient-hero" x1="0" y1="0" x2="1" y2="1">
                <stop offset="0%" stopColor="#60a5fa" />
                <stop offset="50%" stopColor="#2563eb" />
                <stop offset="100%" stopColor="#0ea5e9" />
              </linearGradient>
              <filter id="glow-hero" x="-50%" y="-50%" width="200%" height="200%">
                <feGaussianBlur stdDeviation="18" result="coloredBlur"/>
                <feMerge>
                  <feMergeNode in="coloredBlur"/>
                  <feMergeNode in="SourceGraphic"/>
                </feMerge>
              </filter>
            </defs>
            <path
              d="M0,100 Q360,180 720,120 T1440,140 V200 H0 Z"
              fill="url(#wave-gradient-hero)"
              opacity="0.7"
              filter="url(#glow-hero)"
            />
            <path
              d="M0,160 Q360,120 720,180 T1440,120 V200 H0 Z"
              fill="#38bdf8"
              opacity="0.18"
            />
          </svg>
        </div>
        {/* Contenido principal del hero */}
        <div className="relative z-10 flex flex-col items-center justify-center w-full pt-24 pb-16 text-center px-4 sm:px-6">
          {(() => {
            const heroTitle = t('hero.title'); // Ej: "Hola, soy Lautaro Tapia" o "Hi, I'm Lautaro Tapia"
            const name = 'Lautaro Tapia';
            const [before, after] = heroTitle.split(name);
            return (
              <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-7xl font-extrabold mb-4 text-center text-white drop-shadow-lg leading-tight max-w-4xl mx-auto">
                {before}
                <span className="gradient-text">{name}</span>
                {after}
              </h1>
            );
          })()}
          <p className="text-lg sm:text-xl md:text-2xl lg:text-3xl text-blue-100 mb-6 sm:mb-8 font-light drop-shadow max-w-2xl mx-auto px-2">
            {t('hero.subtitle')}
          </p>
          <a
            href="#proyectos"
            className="bg-blue-600 hover:bg-blue-700 transition px-6 sm:px-8 py-3 sm:py-4 rounded-full text-white font-semibold text-base sm:text-lg shadow-lg"
          >
            {t('hero.cta')}
          </a>
        </div>
      </section>

      {/* Sobre mí */}
      <motion.section
        id="sobremi"
        ref={sobreMiRef}
        className="flex justify-center py-12 sm:py-16 md:py-20 px-4 sm:px-6 text-white"
        aria-label="Sección sobre mí"
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.3 }}
        transition={{ duration: 0.7 }}
      >
        <div className="bg-[#181c24] shadow-2xl rounded-xl sm:rounded-2xl p-4 sm:p-6 md:p-10 max-w-2xl w-full flex flex-col items-center border border-gray-800">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-4 sm:mb-6 text-blue-400">{t('about.title')}</h2>
          <div className="flex flex-col items-center">
            <div className="relative w-24 h-24 sm:w-32 sm:h-32 mb-4">
              <Image
                src="/avatar.jpg"
                alt="Foto de perfil de Lautaro Tapia"
                fill
                className="rounded-full border-4 border-blue-500 shadow-lg object-cover"
                priority
              />
            </div>
            <p className="text-gray-300 mb-4 sm:mb-6 max-w-xl text-center text-sm sm:text-base px-2">
              {t('about.description')}
            </p>
            <div className="flex flex-col items-center gap-3 sm:gap-4">
              <div className="flex flex-wrap justify-center gap-2 sm:gap-3">
                {(() => {
                  const skills = t('about.skills');
                  return Array.isArray(skills)
                    ? skills.map((skill: string, index: number) => (
                        <span
                          key={index}
                          className="bg-blue-600/20 text-blue-300 px-3 py-1 rounded-full text-xs sm:text-sm border border-blue-500/30"
                        >
                          {skill}
                        </span>
                      ))
                    : null;
                })()}
              </div>
              <a
                href="/cv-lautaro-tapia.pdf"
                download
                className="inline-flex items-center bg-green-600 hover:bg-green-700 transition px-4 sm:px-6 py-2 sm:py-3 rounded-full text-white font-semibold text-sm sm:text-base"
                aria-label={`${t('about.cv')} (${language === 'es' ? 'Español' : 'English'})`}
              >
                <svg className="w-4 h-4 sm:w-5 sm:h-5 mr-2" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M4 16v2a2 2 0 002 2h12a2 2 0 002-2v-2M7 10l5 5 5-5M12 15V3" />
                </svg>
                {t('about.cv')} ({language === 'es' ? 'ESP' : 'EN'})
              </a>
            </div>
          </div>
        </div>
      </motion.section>

      {/* Background */}
      <motion.section
        id="background"
        ref={backgroundRef}
        className="flex justify-center py-12 sm:py-16 md:py-20 px-4 sm:px-6 text-white"
        aria-label="Sección de background"
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.3 }}
        transition={{ duration: 0.7 }}
      >
        <div className="bg-[#181c24] shadow-2xl rounded-xl sm:rounded-2xl p-4 sm:p-6 md:p-10 max-w-6xl w-full border border-gray-800">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-6 sm:mb-8 md:mb-10 text-blue-400 text-center">{t('background.title')}</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
            {/* Tarjeta 1 - Formación */}
            <div className="bg-[#23283a] p-4 sm:p-6 rounded-lg sm:rounded-xl shadow-lg hover:scale-105 transition border border-gray-700">
              <h3 className="text-lg sm:text-xl font-semibold mb-3">🎓 {t('background.educationTitle')}</h3>
              <div className="text-gray-400 text-xs sm:text-sm space-y-1">
                {t('background.education').split('\n').map((line: string, i: number) => (
                  <p key={i}>{line}</p>
                ))}
              </div>
            </div>
            {/* Tarjeta 2 - Tecnologías */}
            <div className="bg-[#23283a] p-4 sm:p-6 rounded-lg sm:rounded-xl shadow-lg hover:scale-105 transition border border-gray-700">
              <h3 className="text-lg sm:text-xl font-semibold mb-3">💻 {t('background.technologiesTitle')}</h3>
              <p className="text-gray-400 text-xs sm:text-sm">
                {t('background.technologies')}
              </p>
            </div>
            {/* Tarjeta 3 - Experiencia */}
            <div className="bg-[#23283a] p-4 sm:p-6 rounded-lg sm:rounded-xl shadow-lg hover:scale-105 transition border border-gray-700">
              <h3 className="text-lg sm:text-xl font-semibold mb-3">📊 {t('background.experienceTitle')}</h3>
              <p className="text-gray-400 text-xs sm:text-sm">
                {t('background.experience')}
              </p>
            </div>
            {/* Tarjeta 4 - Certificaciones */}
            <div className="bg-[#23283a] p-4 sm:p-6 rounded-lg sm:rounded-xl shadow-lg hover:scale-105 transition border border-gray-700">
              <h3 className="text-lg sm:text-xl font-semibold mb-3">📜 {t('background.certificationsTitle')}</h3>
              <div className="text-gray-400 text-xs sm:text-sm space-y-1">
                {t('background.certifications').split('\n').map((line: string, i: number) => (
                  <p key={i}>{line}</p>
                ))}
              </div>
            </div>
          </div>
        </div>
      </motion.section>

      {/* Experiencia Laboral */}
      <motion.section
        id="experiencia"
        ref={experienciaRef}
        className="flex justify-center py-12 sm:py-16 md:py-20 px-4 sm:px-6 text-white"
        aria-label="Sección de experiencia laboral"
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.2 }}
        transition={{ duration: 0.7 }}
      >
        <div className="bg-[#181c24] shadow-2xl rounded-xl sm:rounded-2xl p-4 sm:p-6 md:p-10 max-w-4xl w-full border border-gray-800">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-6 sm:mb-8 md:mb-10 text-blue-400 text-center">{t('experience.title')}</h2>
          <div className="relative border-l-2 border-blue-500/40 ml-4 sm:ml-6">
            {(['danwor', 'bridgeinvest', 'totvs', 'exxon', 'pwc'] as const).map((key) => (
              <div key={key} className="mb-8 sm:mb-10 ml-6 sm:ml-8 relative">
                <div className="absolute -left-[33px] sm:-left-[41px] top-1 w-4 h-4 sm:w-5 sm:h-5 bg-blue-500 rounded-full border-4 border-[#181c24]"></div>
                <div className="bg-[#23283a] p-4 sm:p-6 rounded-lg sm:rounded-xl border border-gray-700 shadow-lg">
                  <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-2 gap-1">
                    <h3 className="text-base sm:text-lg font-bold text-white">
                      {t(`experience.${key}.company`)} – <span className="text-blue-300">{t(`experience.${key}.role`)}</span>
                    </h3>
                    <span className="text-xs sm:text-sm text-gray-400 whitespace-nowrap">{t(`experience.${key}.period`)}</span>
                  </div>
                  <ul className="text-gray-400 text-xs sm:text-sm space-y-2 mt-3">
                    {t(`experience.${key}.bullets`).split('\n').map((bullet: string, i: number) => (
                      <li key={i} className="flex items-start gap-2">
                        <span className="text-blue-400 mt-1 shrink-0">&#9656;</span>
                        <span>{bullet}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            ))}
          </div>
        </div>
      </motion.section>

      {/* Proyectos */}
      <motion.section
        id="proyectos"
        ref={proyectosRef}
        className="flex justify-center py-12 sm:py-16 md:py-20 px-4 sm:px-6 text-white"
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.3 }}
        transition={{ duration: 0.7 }}
      >
        <div className="bg-[#181c24] shadow-2xl rounded-xl sm:rounded-2xl p-4 sm:p-6 md:p-10 max-w-5xl w-full border border-gray-800 flex flex-col items-center relative">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-6 sm:mb-8 md:mb-10 text-center text-blue-400 px-2">{t('projects.title')}</h2>
          {/* Carrusel de proyectos */}
          {(() => {
            // Definir los proyectos, declar.ar siempre primero
            const projects = [
              {
                key: 'declarar',
                title: language === 'es' ? 'declar.ar – Sistema de Facturación Online' : 'declar.ar – Online Invoicing System',
                tech: ['Angular', 'ASP.NET', 'SQL Server', 'Mercado Pago API'],
                description: (
                  <div className="mb-4 sm:mb-6 md:mb-8">
                    <Accordion title={language === 'es' ? 'Descripción del proyecto' : 'Show project description'}>
                      <div className="text-gray-400 space-y-2 sm:space-y-3 text-sm sm:text-base">
                        {language === 'es' ? (
                          <>
                            <p>
                              <b>declar.ar</b> es un sistema de facturación online que desarrollé con el objetivo de mejorar la velocidad, organización y eficiencia en la gestión de comprobantes fiscales para empresas y profesionales independientes.
                            </p>
                            <p>
                              La plataforma permite generar distintos tipos de comprobantes: <b>Facturas A, B y C</b>, <b>Notas de Crédito</b> y <b>Notas de Débito</b>, todo desde una interfaz moderna, rápida e intuitiva que simplifica el proceso de facturación.
                            </p>
                            <p>
                              Cuenta con <b>integración directa con Mercado Pago</b>, permitiendo a los usuarios vincular sus cobros con los comprobantes generados, automatizando la conciliación de pagos y ahorrando tiempo administrativo.
                            </p>
                            <p>
                              Desde lo técnico, el frontend está construido con <b>Angular</b> y el backend con <b>ASP.NET</b>, conectado a <b>SQL Server</b> para el almacenamiento de datos. La arquitectura está pensada para ser escalable, segura y eficiente.
                            </p>
                            <p>
                              declar.ar nace de una necesidad real: simplificar la facturación electrónica en Argentina, brindando una alternativa moderna y accesible a los sistemas tradicionales.
                            </p>
                          </>
                        ) : (
                          <>
                            <p>
                              <b>declar.ar</b> is an online invoicing system I developed to improve speed, organization, and efficiency in tax document management for businesses and independent professionals.
                            </p>
                            <p>
                              The platform allows generating different types of documents: <b>Invoices (A, B, and C types)</b>, <b>Credit Notes</b>, and <b>Debit Notes</b>, all from a modern, fast, and intuitive interface that simplifies the invoicing process.
                            </p>
                            <p>
                              It features <b>direct integration with Mercado Pago</b>, allowing users to link their payments with generated documents, automating payment reconciliation and saving administrative time.
                            </p>
                            <p>
                              On the technical side, the frontend is built with <b>Angular</b> and the backend with <b>ASP.NET</b>, connected to <b>SQL Server</b> for data storage. The architecture is designed to be scalable, secure, and efficient.
                            </p>
                            <p>
                              declar.ar was born from a real need: simplifying electronic invoicing in Argentina, providing a modern and accessible alternative to traditional systems.
                            </p>
                          </>
                        )}
                      </div>
                    </Accordion>
                  </div>
                ),
                preview: (
                  <div className="w-full rounded-lg overflow-hidden shadow-lg mb-4 sm:mb-6" style={{height: 'min(60vh, 400px)'}}>
                    <iframe
                      src="https://declar.ar/"
                      allowFullScreen
                      className="w-full h-full border-0 rounded-lg"
                      title="declar.ar App Preview"
                    ></iframe>
                  </div>
                ),
                action: (
                  <a
                    href="https://declar.ar/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="bg-gradient-to-r from-emerald-600 to-blue-600 hover:from-emerald-700 hover:to-blue-700 transition px-6 sm:px-8 md:px-10 py-3 sm:py-4 rounded-full text-white font-semibold flex items-center gap-2 sm:gap-3 text-base sm:text-lg shadow-xl focus:outline-none focus:ring-4 focus:ring-emerald-400 focus:ring-offset-2 transform hover:-translate-y-1 hover:scale-105 hover:shadow-2xl duration-200 w-full sm:w-auto justify-center"
                  >
                    {language === 'es' ? 'Visitar declar.ar' : 'Visit declar.ar'}
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 sm:h-6 sm:w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2} aria-hidden="true">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M18 13V19a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
                      <path strokeLinecap="round" strokeLinejoin="round" d="M15 3h6m0 0v6m0-6L10 14" />
                    </svg>
                  </a>
                )
              },
              {
                key: 'powerbi',
                title: t('projects.powerbi.title'),
                tech: ['Python', 'Selenium', 'BeautifulSoup', 'Power BI', 'SQL'],
                description: (
                  <div className="mb-4 sm:mb-6 md:mb-8">
                    <Accordion title={t('projects.powerbi.description.button')}>
                      <div className="text-gray-400 space-y-2 sm:space-y-3 text-sm sm:text-base">
                        <p>
                          <b>Descripción del proyecto y técnica utilizada:</b> Como parte de este proyecto realicé, por primera vez, una experiencia completa de web scraping para obtener datos históricos del fútbol argentino. Utilicé Python, Selenium y BeautifulSoup para automatizar la navegación por el sitio fbref.com y descargar, año por año, las tablas estadísticas de la Liga Profesional Argentina entre 2016 y 2024. Toda esa información fue procesada automáticamente y exportada en archivos .csv, que luego utilicé como fuente principal en Power BI para desarrollar visualizaciones interactivas. El proceso completo lo realicé en un día, y me permitió vincular programación con análisis visual de datos en un contexto real.
                        </p>
                        <p>
                          <b>📊 Análisis comparativo de los dashboards:</b> Los informes están divididos en dos vistas principales:
                          <ul className="list-disc list-inside ml-4 sm:ml-6 mt-2 space-y-1">
                            <li>Los cinco grandes del fútbol argentino</li>
                            <li>El resto de los equipos</li>
                          </ul>
                        </p>
                        <div>
                          <b>🔵 Visualización de los 5 grandes</b>
                          <ul className="list-disc list-inside ml-4 sm:ml-6 mt-2 space-y-1">
                            <li>Boca Juniors y River Plate lideran en cantidad de partidos ganados entre 2016 y 2024.</li>
                            <li>Se observa una tendencia estable y competitiva en el tiempo en las posiciones de ambos.</li>
                            <li>San Lorenzo e Independiente muestran mayor irregularidad, con altibajos en su rendimiento.</li>
                            <li>El gráfico de líneas permite identificar momentos de recuperación o caída, como la mejora de Racing entre 2020 y 2022.</li>
                          </ul>
                        </div>
                        <div>
                          <b>🟡 Visualización de los no grandes</b>
                          <ul className="list-disc list-inside ml-4 sm:ml-6 mt-2 space-y-1">
                            <li>Estudiantes, Defensa y Justicia y Godoy Cruz son los equipos con mejor desempeño acumulado en partidos ganados.</li>
                            <li>La diversidad de trayectorias es mucho mayor: se observan equipos que s&oacute;lo estuvieron en algunos años y otros con presencia sostenida.</li>
                            <li>Algunos equipos como Atlético Tucumán o Lanús mantuvieron una regularidad destacable en posiciones, aunque sin competir directamente con los grandes.</li>
                            <li>El volumen de goles a favor y en contra permite ver que, aunque el nivel de competencia es alto, la diferencia de goles en contra es considerablemente mayor que entre los 5 grandes.</li>
                          </ul>
                        </div>
                      </div>
                    </Accordion>
                  </div>
                ),
                preview: (
                  <div className="w-full rounded-lg overflow-hidden shadow-lg mb-4 sm:mb-6" style={{height: 'min(50vh, 350px)'}}>
                    <iframe
                      src="https://app.powerbi.com/reportEmbed?reportId=fd61d2df-2d2e-4191-9e04-2a5a131a9ae5&autoAuth=true&ctid=eebbc370-5762-4be4-ad34-12c2bd661f3d&actionBarEnabled=true&reportCopilotInEmbed=true"
                      allowFullScreen
                      className="w-full h-full border-0"
                      title={t('projects.powerbi.iframe.title')}
                    ></iframe>
                  </div>
                ),
                action: (
                  <a
                    href="https://app.powerbi.com/links/aSwFdI8zJz?ctid=eebbc370-5762-4be4-ad34-12c2bd661f3d&pbi_source=linkShare"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="bg-gradient-to-r from-blue-600 to-blue-500 hover:from-blue-700 hover:to-blue-600 transition px-6 sm:px-8 md:px-10 py-3 sm:py-4 rounded-full text-white font-semibold flex items-center gap-2 sm:gap-3 text-base sm:text-lg shadow-xl focus:outline-none focus:ring-4 focus:ring-blue-400 focus:ring-offset-2 transform hover:-translate-y-1 hover:scale-105 hover:shadow-2xl duration-200 w-full sm:w-auto justify-center"
                  >
                    {t('projects.powerbi.link')}
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 sm:h-6 sm:w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2} aria-hidden="true">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M18 13V19a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
                      <path strokeLinecap="round" strokeLinejoin="round" d="M15 3h6m0 0v6m0-6L10 14" />
                    </svg>
                  </a>
                ),
                disclaimer: (
                  <p className="text-gray-500 text-xs mt-3 sm:mt-4 text-center px-2">
                    {t('projects.powerbi.disclaimer')}
                  </p>
                )
              },
              {
                key: 'boolingsearch',
                title: t('projects.boolingsearch.title'),
                tech: ['Next.js', 'React', 'Tailwind CSS', 'Node.js', 'Groq API'],
                description: (
                  <div className="mb-4 sm:mb-6 md:mb-8">
                    <Accordion title={t('projects.boolingsearch.description.button')}>
                      <div className="text-gray-400 space-y-2 sm:space-y-3 text-sm sm:text-base">
                        {language === 'es' ? (
                          <>
                            <p>
                              ¿Qué pasaría si pudieras convertir una necesidad de contratación en una búsqueda precisa para LinkedIn, con solo escribirla en lenguaje natural?
                            </p>
                            <p>
                              Eso es exactamente lo que hace BoolingSearch: una herramienta web que desarrollé para ayudar a reclutadores y equipos de HR a optimizar el proceso de búsqueda de candidatos.
                            </p>
                            <p>
                              A través de una pipeline de pensamiento automatizada, la herramienta interpreta lo que escribís (por ejemplo: "UX designers in Argentina who use Figma or Sketch") y lo convierte en una búsqueda booleana lista para pegar en LinkedIn, agrupando correctamente roles, habilidades y ubicaciones, validando la sintaxis, y ofreciendo sugerencias para mejorar los resultados.
                            </p>
                            <p>
                              <b>¿Por qué la hice?</b><br/>
                              Durante la creación de otros proyectos noté que muchas personas de HR sabían qué perfil querían, pero no cómo buscarlo correctamente en plataformas como LinkedIn. Armar búsquedas booleanas puede ser una barrera técnica. BoolingSearch elimina esa fricción.
                            </p>
                            <p>
                              <b>Principales funcionalidades</b><br/>
                              ✅ Conversión de lenguaje natural a booleano<br/>
                              ✅ Corrección automática y validación en tiempo real<br/>
                              ✅ Interfaz minimalista, responsive y bilingüe (ES/EN)<br/>
                              ✅ Copia directa y sugerencias de optimización<br/>
                              ✅ Modal inteligente de donación tras varios usos
                            </p>
                            <p>
                              <b>Impacto para RRHH y Talent Acquisition</b><br/>
                              • Ahorra tiempo al iterar búsquedas complejas<br/>
                              • Mejora la calidad de los resultados<br/>
                              • Evita errores comunes de sintaxis<br/>
                              • Democratiza el uso de filtros avanzados sin necesidad de experiencia técnica
                            </p>
                            <p>
                              <b>Tecnologías utilizadas</b><br/>
                              Frontend: Next.js · React · Tailwind CSS<br/>
                              Backend: Node.js · Groq API<br/>
                              Despliegue: Vercel
                            </p>
                          </>
                        ) : (
                          <>
                            <p>
                              What if you could convert a hiring need into a precise LinkedIn search just by writing it in natural language?
                            </p>
                            <p>
                              That's exactly what BoolingSearch does: a web tool I developed to help recruiters and HR teams optimize the candidate search process.
                            </p>
                            <p>
                              Through an automated thinking pipeline, the tool interprets what you write (for example: "UX designers in Argentina who use Figma or Sketch") and converts it into a boolean search ready to paste into LinkedIn, properly grouping roles, skills, and locations, validating syntax, and offering suggestions to improve results.
                            </p>
                            <p>
                              <b>Why did I make it?</b><br/>
                              During the creation of other projects, I noticed that many HR professionals knew what profile they wanted, but not how to search for it correctly on platforms like LinkedIn. Building boolean searches can be a technical barrier. BoolingSearch eliminates that friction.
                            </p>
                            <p>
                              <b>Main features</b><br/>
                              ✅ Natural language to boolean conversion<br/>
                              ✅ Automatic correction and real-time validation<br/>
                              ✅ Minimalist, responsive, and bilingual interface (ES/EN)<br/>
                              ✅ Direct copy and optimization suggestions<br/>
                              ✅ Smart donation modal after several uses
                            </p>
                            <p>
                              <b>Impact for HR and Talent Acquisition</b><br/>
                              • Saves time when iterating complex searches<br/>
                              • Improves result quality<br/>
                              • Avoids common syntax errors<br/>
                              • Democratizes the use of advanced filters without requiring technical experience
                            </p>
                            <p>
                              <b>Technologies used</b><br/>
                              Frontend: Next.js · React · Tailwind CSS<br/>
                              Backend: Node.js · Groq API<br/>
                              Deployment: Vercel
                            </p>
                          </>
                        )}
                      </div>
                    </Accordion>
                  </div>
                ),
                preview: (
                  <a href="https://boolin-search.vercel.app/" target="_blank" rel="noopener noreferrer" className="block group">
                    <div className="w-full rounded-lg overflow-hidden shadow-lg mb-4 sm:mb-6 relative bg-black/20 p-4" style={{height: 'min(60vh, 400px)'}}>
                      <Image
                        src="/boolingSearch.png"
                        alt="BoolingSearch App Preview"
                        layout="fill"
                        objectFit="contain"
                        className="rounded-lg transition-transform duration-300 group-hover:scale-105"
                      />
                    </div>
                  </a>
                ),
                action: (
                  <a
                    href="https://boolin-search.vercel.app/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="bg-gradient-to-r from-green-600 to-blue-600 hover:from-green-700 hover:to-blue-700 transition px-6 sm:px-8 md:px-10 py-3 sm:py-4 rounded-full text-white font-semibold flex items-center gap-2 sm:gap-3 text-base sm:text-lg shadow-xl focus:outline-none focus:ring-4 focus:ring-green-400 focus:ring-offset-2 transform hover:-translate-y-1 hover:scale-105 hover:shadow-2xl duration-200 w-full sm:w-auto justify-center"
                  >
                    {t('projects.boolingsearch.link')}
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 sm:h-6 sm:w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2} aria-hidden="true">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M18 13V19a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
                      <path strokeLinecap="round" strokeLinejoin="round" d="M15 3h6m0 0v6m0-6L10 14" />
                    </svg>
                  </a>
                )
              },
              {
                key: 'civi',
                title: language === 'es' ? 'Civi – Creador de CV con IA' : 'Civi – CV Creator with AI',
                tech: ['Next.js', 'TypeScript', 'Tailwind CSS', 'Groq API', 'Llama3-70B'],
                description: (
                  <div className="mb-4 sm:mb-6 md:mb-8">
                    <Accordion title={language === 'es' ? 'Descripción del proyecto' : 'Show project description'}>
                      <div className="text-gray-400 space-y-2 sm:space-y-3 text-sm sm:text-base">
                        {language === 'es' ? (
                          <>
                            <p>
                              CIVI es una aplicación web que desarrollé de forma independiente con un objetivo claro: ayudar a las personas a mejorar su CV de manera inteligente, sin depender de plantillas genéricas o herramientas pagas.
                            </p>
                            <p>
                              La plataforma analiza la descripción del puesto y genera un CV optimizado en tiempo real, aumentando las chances de superar filtros automáticos (ATS) y destacar frente a recruiters.
                            </p>
                            <p>
                              Desde lo técnico, usé Next.js, React, TypeScript, Tailwind CSS y Radix UI. La integración con Groq AI (Llama3-70B) permite procesamiento de lenguaje natural de forma eficiente y en segundos. Todo se ejecuta en el navegador, sin almacenar datos ni requerir cuentas.
                            </p>
                          </>
                        ) : (
                          <>
                            <p>
                              CIVI is a web application I developed independently with a clear goal: to help people improve their CVs intelligently, without relying on generic templates or paid tools.
                            </p>
                            <p>
                              The platform analyzes the job description and generates an optimized CV in real time, increasing the chances of passing ATS filters and standing out to recruiters.
                            </p>
                            <p>
                              On the technical side, I used Next.js, React, TypeScript, Tailwind CSS, and Radix UI. The Groq AI (Llama3-70B) integration enables efficient natural language processing in seconds. Everything runs in the browser, with no data storage or account required.
                            </p>
                          </>
                        )}
                      </div>
                    </Accordion>
                  </div>
                ),
                preview: (
                  <div className="w-full rounded-lg overflow-hidden shadow-lg mb-4 sm:mb-6" style={{height: 'min(60vh, 400px)'}}>
                    <iframe
                      src="https://civi-cv-creator.vercel.app/"
                      allowFullScreen
                      className="w-full h-full border-0 rounded-lg"
                      title="Civi App Preview"
                    ></iframe>
                  </div>
                ),
                action: (
                  <a
                    href="https://civi-cv-creator.vercel.app/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 transition px-6 sm:px-8 md:px-10 py-3 sm:py-4 rounded-full text-white font-semibold flex items-center gap-2 sm:gap-3 text-base sm:text-lg shadow-xl focus:outline-none focus:ring-4 focus:ring-blue-400 focus:ring-offset-2 transform hover:-translate-y-1 hover:scale-105 hover:shadow-2xl duration-200 w-full sm:w-auto justify-center"
                  >
                    {language === 'es' ? 'Visitar Civi' : 'Visit Civi'}
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 sm:h-6 sm:w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2} aria-hidden="true">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M18 13V19a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
                      <path strokeLinecap="round" strokeLinejoin="round" d="M15 3h6m0 0v6m0-6L10 14" />
                    </svg>
                  </a>
                )
              }
            ];
            const totalProjects = projects.length;
            return (
              <div className="w-full flex flex-col items-center relative">
                {/* Contador de proyecto */}
                <div className="mb-4 text-sm text-gray-400 font-mono">
                  {currentProject + 1} / {totalProjects}
                </div>
                {/* Botón izquierdo */}
                <button
                  onClick={goPrev}
                  className="absolute left-2 sm:left-0 top-1/2 -translate-y-1/2 bg-[#23283a]/80 backdrop-blur border border-gray-700 rounded-full p-2 sm:p-3 shadow-lg hover:bg-blue-600 hover:border-blue-500 transition-all z-10"
                  aria-label="Previous project"
                >
                  <svg className="w-4 h-4 sm:w-6 sm:h-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
                  </svg>
                </button>
                {/* Card animada */}
                <motion.div
                  key={projects[currentProject].key}
                  initial={{ opacity: 0, x: 40 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -40 }}
                  transition={{ duration: 0.4, ease: 'easeInOut' }}
                  className="bg-[#23283a] rounded-lg sm:rounded-xl p-4 sm:p-6 shadow-lg border border-gray-700 flex flex-col w-full max-w-4xl mx-auto"
                >
                  <h3 className="text-lg sm:text-xl font-semibold mb-2 text-center px-2">{projects[currentProject].title}</h3>
                  {/* Tech badges */}
                  {projects[currentProject].tech && (
                    <div className="flex flex-wrap justify-center gap-2 mb-4">
                      {projects[currentProject].tech.map((t: string, i: number) => (
                        <span key={i} className="bg-blue-500/15 text-blue-300 px-2.5 py-0.5 rounded-full text-xs border border-blue-500/25 font-medium">
                          {t}
                        </span>
                      ))}
                    </div>
                  )}
                  {projects[currentProject].description}
                  {projects[currentProject].preview}
                  <div className="flex justify-center mt-4 sm:mt-auto">
                    {projects[currentProject].action}
                  </div>
                  {projects[currentProject].disclaimer}
                </motion.div>
                {/* Dot indicators */}
                <div className="flex gap-2 mt-6">
                  {projects.map((p, i) => (
                    <button
                      key={p.key}
                      onClick={() => setCurrentProject(i)}
                      className={`w-2.5 h-2.5 rounded-full transition-all duration-300 ${
                        i === currentProject
                          ? 'bg-blue-500 w-8'
                          : 'bg-gray-600 hover:bg-gray-400'
                      }`}
                      aria-label={`Go to project ${i + 1}`}
                    />
                  ))}
                </div>
                {/* Botón derecho */}
                <button
                  onClick={goNext}
                  className="absolute right-2 sm:right-0 top-1/2 -translate-y-1/2 bg-[#23283a]/80 backdrop-blur border border-gray-700 rounded-full p-2 sm:p-3 shadow-lg hover:bg-blue-600 hover:border-blue-500 transition-all z-10"
                  aria-label="Next project"
                >
                  <svg className="w-4 h-4 sm:w-6 sm:h-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                  </svg>
                </button>
              </div>
            );
          })()}
        </div>
      </motion.section>

      {/* Contacto */}
      <motion.section
        id="contacto"
        ref={contactoRef}
        className="bg-[#0c0f1a] text-white py-12 sm:py-16 px-4 sm:px-6"
        aria-label="Sección de contacto"
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.3 }}
        transition={{ duration: 0.7 }}
      >
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-2xl sm:text-3xl font-semibold mb-4 sm:mb-6">{t('contact.title')}</h2>
          <p className="text-gray-400 mb-6 sm:mb-8 text-sm sm:text-base px-2">
            {t('contact.subtitle')}
          </p>
          <ContactForm />
          <div className="mt-8 sm:mt-10 flex justify-center gap-4 sm:gap-6" role="navigation" aria-label="Enlaces a redes sociales">
            <a
              href="https://github.com/Lauti-Tapia"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-400 hover:text-white transition text-sm sm:text-base"
              aria-label="Visitar mi perfil de GitHub"
            >
              GitHub
            </a>
            <a
              href="https://www.linkedin.com/in/lautaro-tapia-9012091b8/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-400 hover:text-white transition text-sm sm:text-base"
              aria-label="Visitar mi perfil de LinkedIn"
            >
              LinkedIn
            </a>
          </div>
        </div>
      </motion.section>

      {/* Footer */}
      <footer className="bg-[#0a0a23] text-white py-6 sm:py-8 px-4 sm:px-6 text-center" role="contentinfo">
        <div className="max-w-6xl mx-auto">
          <p className="text-xs sm:text-sm text-gray-400">
            © {new Date().getFullYear()} Lautaro Tapia - {t('footer.rights')}
          </p>
        </div>
      </footer>
    </main>
  );
}

export default function Home() {
  return (
    <LanguageProvider>
      <HomeContent />
    </LanguageProvider>
  );
}
