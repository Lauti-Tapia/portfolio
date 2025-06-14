'use client';

import { useState, useRef, useEffect } from 'react';
import Image from 'next/image';
import MobileMenu from './components/MobileMenu';
import ContactForm from './components/ContactForm';
import Accordion from './components/Accordion';
import { motion } from 'framer-motion';
import { useLanguage } from './context/LanguageContext';

function HomeContent() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [currentProject, setCurrentProject] = useState<'powerbi' | 'civi'>('powerbi');
  const { t, language, toggleLanguage } = useLanguage();
  const [showDescription, setShowDescription] = useState(false);

  // Refs para cada sección
  const inicioRef = useRef<HTMLDivElement>(null);
  const sobreMiRef = useRef<HTMLDivElement>(null);
  const backgroundRef = useRef<HTMLDivElement>(null);
  const proyectosRef = useRef<HTMLDivElement>(null);
  const contactoRef = useRef<HTMLDivElement>(null);

  const navItems = [
    { href: '#inicio', label: t('nav.home') as string, ref: inicioRef },
    { href: '#sobremi', label: t('nav.about') as string, ref: sobreMiRef },
    { href: '#background', label: t('nav.background') as string, ref: backgroundRef },
    { href: '#proyectos', label: t('nav.projects') as string, ref: proyectosRef },
    { href: '#contacto', label: t('nav.contact') as string, ref: contactoRef },
  ];

  const handleNavClick = (ref: React.RefObject<HTMLDivElement>) => (e: React.MouseEvent) => {
    e.preventDefault();
    ref.current?.scrollIntoView({ behavior: 'smooth' });
    setIsMobileMenuOpen(false);
  };

  // Add smooth scroll behavior on mount
  useEffect(() => {
    document.body.style.scrollBehavior = 'smooth';
  }, []);

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
        <div className="relative z-10 flex flex-col items-center justify-center w-full pt-24 pb-16 text-center">
          {(() => {
            const heroTitle = t('hero.title') as string; // Ej: "Hola, soy Lautaro Tapia" o "Hi, I'm Lautaro Tapia"
            const name = 'Lautaro Tapia';
            const [before, after] = heroTitle.split(name);
            return (
              <h1 className="text-5xl md:text-7xl font-extrabold mb-4 text-left text-white drop-shadow-lg leading-tight">
                {before}
                <span className="text-blue-500">{name}</span>
                {after}
              </h1>
            );
          })()}
          <p className="text-2xl md:text-3xl text-blue-100 mb-8 font-light drop-shadow">
            Data Analyst & Data Engineer
          </p>
          <a
            href="#proyectos"
            className="bg-blue-600 hover:bg-blue-700 transition px-8 py-4 rounded-full text-white font-semibold text-lg shadow-lg"
          >
            Ver proyectos
          </a>
        </div>
      </section>

      {/* Sobre mí */}
      <motion.section
        id="sobremi"
        ref={sobreMiRef}
        className="flex justify-center py-20 px-6 text-white"
        aria-label="Sección sobre mí"
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.3 }}
        transition={{ duration: 0.7 }}
      >
        <div className="bg-[#181c24] shadow-2xl rounded-2xl p-10 max-w-2xl w-full flex flex-col items-center border border-gray-800">
          <h2 className="text-3xl md:text-4xl font-bold mb-6 text-blue-400">{t('about.title') as string}</h2>
          <div className="flex flex-col items-center">
            <div className="relative w-32 h-32 mb-4">
              <Image
                src="/avatar.jpg"
                alt="Foto de perfil de Lautaro Tapia"
                fill
                className="rounded-full border-4 border-blue-500 shadow-lg object-cover"
                priority
              />
            </div>
            <p className="text-gray-300 mb-6 max-w-xl text-center">
              {t('about.description') as string}
            </p>
            <div className="flex flex-col items-center gap-4">
              <a
                href={language === 'es' ? "/CV_2025_Lautaro_Tapia_ESP.pdf" : "/CV_2025_Lautaro_Tapia_EN.pdf"}
                download
                className="inline-flex items-center bg-green-600 hover:bg-green-700 transition px-6 py-3 rounded-full text-white font-semibold"
                aria-label={`${t('about.cv') as string} (${language === 'es' ? 'Español' : 'English'})`}
              >
                <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M4 16v2a2 2 0 002 2h12a2 2 0 002-2v-2M7 10l5 5 5-5M12 15V3" />
                </svg>
                {t('about.cv') as string} ({language === 'es' ? 'ESP' : 'EN'})
              </a>
            </div>
            <div className="flex flex-wrap justify-center gap-3" role="list" aria-label="Habilidades personales">
              {(() => {
                const skills = t('about.skills');
                return Array.isArray(skills)
                  ? (skills as string[]).map((skill) => (
                      <span
                        key={skill}
                        className="bg-blue-800/50 text-sm px-4 py-1 rounded-full border border-blue-600"
                        role="listitem"
                      >
                        {skill}
                      </span>
                    ))
                  : null;
              })()}
            </div>
          </div>
        </div>
      </motion.section>

      {/* Background */}
      <motion.section
        id="background"
        ref={backgroundRef}
        className="flex justify-center py-20 px-6 text-white"
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.3 }}
        transition={{ duration: 0.7 }}
      >
        <div className="bg-[#181c24] shadow-2xl rounded-2xl p-10 max-w-6xl w-full border border-gray-800">
          <h2 className="text-3xl md:text-4xl font-bold mb-10 text-blue-400 text-center">{t('background.title') as string}</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Tarjeta 1 - Formación */}
            <div className="bg-[#23283a] p-6 rounded-xl shadow-lg hover:scale-105 transition border border-gray-700">
              <h3 className="text-xl font-semibold mb-2">🎓 {t('background.title') as string}</h3>
              <p className="text-gray-400 text-sm">
                {t('background.education') as string}
              </p>
            </div>
            {/* Tarjeta 2 - Tecnologías */}
            <div className="bg-[#23283a] p-6 rounded-xl shadow-lg hover:scale-105 transition border border-gray-700">
              <h3 className="text-xl font-semibold mb-2">💻 Tecnologías</h3>
              <p className="text-gray-400 text-sm">
                {t('background.technologies') as string}
              </p>
            </div>
            {/* Tarjeta 3 - Experiencia */}
            <div className="bg-[#23283a] p-6 rounded-xl shadow-lg hover:scale-105 transition border border-gray-700">
              <h3 className="text-xl font-semibold mb-2">📊 Experiencia</h3>
              <p className="text-gray-400 text-sm">
                {t('background.experience') as string}
              </p>
            </div>
          </div>
        </div>
      </motion.section>

      {/* Proyectos */}
      <motion.section
        id="proyectos"
        ref={proyectosRef}
        className="flex justify-center py-20 px-6 text-white"
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.3 }}
        transition={{ duration: 0.7 }}
      >
        <div className="bg-[#181c24] shadow-2xl rounded-2xl p-10 max-w-5xl w-full border border-gray-800 flex flex-col items-center relative">
          <h2 className="text-3xl md:text-4xl font-bold mb-10 text-center text-blue-400">{t('projects.title') as string}</h2>
          {/* Carrusel de proyectos */}
          {(() => {
            // Definir los proyectos, Civi siempre primero
            const projects = [
              {
                key: 'civi',
                title: 'Civi – CV Creator with AI',
                description: (
                  <div className="mb-8">
                    <Accordion title="Show project description">
                      <div className="text-gray-400 space-y-3">
                        {language === 'es' ? (
                          <>
                            <p>
                              CIVI es una aplicación web que desarrollé de forma independiente con un objetivo claro: ayudar a las personas a mejorar su CV de manera inteligente, sin depender de plantillas genéricas o herramientas pagas.
                            </p>
                            <p>
                              La idea surgió al notar que muchos candidatos con buenas trayectorias no sabían cómo adaptar su currículum a cada oferta laboral. Decidí combinar mis conocimientos en desarrollo web y automatización 🤖 para crear una herramienta gratuita, accesible y útil. El resultado fue una plataforma que analiza la descripción del puesto y genera un CV optimizado en tiempo real, aumentando las chances de superar filtros automáticos (ATS) y destacar frente a recruiters.
                            </p>
                            <p>
                              Desde lo técnico, el proyecto fue una gran experiencia fullstack 🚀: usé Next.js, React, TypeScript, Tailwind CSS y Radix UI para construir una interfaz moderna, accesible y responsive. La integración con Groq AI (Llama3-70B) me permitió aplicar procesamiento de lenguaje natural de forma eficiente y en segundos. Todo se ejecuta en el navegador, sin almacenar datos ni requerir cuentas.
                            </p>
                            <p>
                              CIVI refleja no solo lo que sé hacer técnicamente, sino también mi interés por construir soluciones que tengan impacto real ✨. Fue un proyecto desafiante, donde resolví problemas de UX, integración de IA y rendimiento, y lo llevé de idea a producto funcional con despliegue en Vercel.
                            </p>
                          </>
                        ) : (
                          <>
                            <p>
                              CIVI is a web application I developed independently with a clear goal: to help people improve their CVs intelligently, without relying on generic templates or paid tools.
                            </p>
                            <p>
                              The idea came from noticing that many candidates with strong backgrounds didn't know how to tailor their resumes to each job offer. I decided to combine my knowledge in web development and automation with artificial intelligence 🤖 to create a free, accessible, and useful tool. The result is a platform that analyzes the job description and generates an optimized CV in real time, increasing the chances of passing ATS filters and standing out to recruiters.
                            </p>
                            <p>
                              From a technical perspective, the project was a great fullstack experience 🚀: I used Next.js, React, TypeScript, Tailwind CSS, and Radix UI to build a modern, accessible, and responsive interface. The integration with Groq AI (Llama3-70B) allowed me to apply natural language processing efficiently and in seconds. Everything runs in the browser, with no data storage or account required.
                            </p>
                            <p>
                              CIVI reflects not only my technical skills, but also my interest in building solutions that have a real impact ✨. It was a challenging project where I solved UX, AI integration, and performance issues, taking it from idea to a functional product deployed on Vercel.
                            </p>
                          </>
                        )}
                      </div>
                    </Accordion>
                  </div>
                ),
                preview: (
                  <div className="w-full aspect-video rounded-lg overflow-hidden shadow-lg mb-6" style={{height: '600px'}}>
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
                    className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 transition px-10 py-4 rounded-full text-white font-semibold flex items-center gap-3 text-lg shadow-xl focus:outline-none focus:ring-4 focus:ring-blue-400 focus:ring-offset-2 transform hover:-translate-y-1 hover:scale-105 hover:shadow-2xl duration-200"
                  >
                    Visit Civi
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2} aria-hidden="true">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M18 13V19a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
                      <path strokeLinecap="round" strokeLinejoin="round" d="M15 3h6m0 0v6m0-6L10 14" />
                    </svg>
                  </a>
                )
              },
              {
                key: 'powerbi',
                title: t('projects.powerbi.title') as string,
                description: (
                  <div className="mb-8">
                    <Accordion title={t('projects.powerbi.description.button') as string}>
                      <div className="text-gray-400 space-y-3">
                        <p>
                          <b>Descripción del proyecto y técnica utilizada:</b> Como parte de este proyecto realicé, por primera vez, una experiencia completa de web scraping para obtener datos históricos del fútbol argentino. Utilicé Python, Selenium y BeautifulSoup para automatizar la navegación por el sitio fbref.com y descargar, año por año, las tablas estadísticas de la Liga Profesional Argentina entre 2016 y 2024. Toda esa información fue procesada automáticamente y exportada en archivos .csv, que luego utilicé como fuente principal en Power BI para desarrollar visualizaciones interactivas. El proceso completo lo realicé en un día, y me permitió vincular programación con análisis visual de datos en un contexto real.
                        </p>
                        <p>
                          <b>📊 Análisis comparativo de los dashboards:</b> Los informes están divididos en dos vistas principales:
                          <ul className="list-disc list-inside ml-6 mt-2">
                            <li>Los cinco grandes del fútbol argentino</li>
                            <li>El resto de los equipos</li>
                          </ul>
                        </p>
                        <div>
                          <b>🔵 Visualización de los 5 grandes</b>
                          <ul className="list-disc list-inside ml-6 mt-2">
                            <li>Boca Juniors y River Plate lideran en cantidad de partidos ganados entre 2016 y 2024.</li>
                            <li>Se observa una tendencia estable y competitiva en el tiempo en las posiciones de ambos.</li>
                            <li>San Lorenzo e Independiente muestran mayor irregularidad, con altibajos en su rendimiento.</li>
                            <li>El gráfico de líneas permite identificar momentos de recuperación o caída, como la mejora de Racing entre 2020 y 2022.</li>
                          </ul>
                        </div>
                        <div>
                          <b>🟡 Visualización de los no grandes</b>
                          <ul className="list-disc list-inside ml-6 mt-2">
                            <li>Estudiantes, Defensa y Justicia y Godoy Cruz son los equipos con mejor desempeño acumulado en partidos ganados.</li>
                            <li>La diversidad de trayectorias es mucho mayor: se observan equipos que sólo estuvieron en algunos años y otros con presencia sostenida.</li>
                            <li>Algunos equipos como Atlético Tucumán o Lanús mantuvieron una regularidad destacable en posiciones, aunque sin competir directamente con los grandes.</li>
                            <li>El volumen de goles a favor y en contra permite ver que, aunque el nivel de competencia es alto, la diferencia de goles en contra es considerablemente mayor que entre los 5 grandes.</li>
                          </ul>
                        </div>
                      </div>
                    </Accordion>
                  </div>
                ),
                preview: (
                  <div className="w-full aspect-[5/1] sm:aspect-[4/3] rounded-lg overflow-hidden shadow-lg mb-6" style={{height: '400px'}}>
                    <iframe
                      src="https://app.powerbi.com/reportEmbed?reportId=fd61d2df-2d2e-4191-9e04-2a5a131a9ae5&autoAuth=true&ctid=eebbc370-5762-4be4-ad34-12c2bd661f3d&actionBarEnabled=true&reportCopilotInEmbed=true"
                      allowFullScreen
                      className="w-full h-full border-0"
                      title={t('projects.powerbi.iframe.title') as string}
                    ></iframe>
                  </div>
                ),
                action: (
                  <a
                    href="https://app.powerbi.com/links/aSwFdI8zJz?ctid=eebbc370-5762-4be4-ad34-12c2bd661f3d&pbi_source=linkShare"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="bg-gradient-to-r from-blue-600 to-blue-500 hover:from-blue-700 hover:to-blue-600 transition px-10 py-4 rounded-full text-white font-semibold flex items-center gap-3 text-lg shadow-xl focus:outline-none focus:ring-4 focus:ring-blue-400 focus:ring-offset-2 transform hover:-translate-y-1 hover:scale-105 hover:shadow-2xl duration-200"
                  >
                    {t('projects.powerbi.link') as string}
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2} aria-hidden="true">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M18 13V19a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
                      <path strokeLinecap="round" strokeLinejoin="round" d="M15 3h6m0 0v6m0-6L10 14" />
                    </svg>
                  </a>
                ),
                disclaimer: (
                  <p className="text-gray-500 text-xs mt-4 text-center">
                    {t('projects.powerbi.disclaimer') as string}
                  </p>
                )
              }
            ];
            const [current, setCurrent] = useState(0);
            const goPrev = () => setCurrent((prev) => (prev === 0 ? projects.length - 1 : prev - 1));
            const goNext = () => setCurrent((prev) => (prev === projects.length - 1 ? 0 : prev + 1));
            return (
              <div className="w-full flex flex-col items-center relative">
                {/* Botón izquierdo */}
                <button
                  onClick={goPrev}
                  className="absolute left-0 top-1/2 -translate-y-1/2 bg-[#23283a] border border-gray-700 rounded-full p-3 shadow-lg hover:bg-blue-700 transition z-10"
                  aria-label="Previous project"
                >
                  <svg className="w-6 h-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
                  </svg>
                </button>
                {/* Card animada */}
                <motion.div
                  key={projects[current].key}
                  initial={{ opacity: 0, x: 40 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -40 }}
                  transition={{ duration: 0.4, ease: 'easeInOut' }}
                  className="bg-[#23283a] rounded-xl p-6 shadow-lg border border-gray-700 flex flex-col w-full max-w-4xl mx-auto"
                >
                  <h3 className="text-xl font-semibold mb-4 text-center">{projects[current].title}</h3>
                  {projects[current].description}
                  {projects[current].preview}
                  <div className="flex justify-center mt-auto">
                    {projects[current].action}
                  </div>
                  {projects[current].disclaimer}
                </motion.div>
                {/* Botón derecho */}
                <button
                  onClick={goNext}
                  className="absolute right-0 top-1/2 -translate-y-1/2 bg-[#23283a] border border-gray-700 rounded-full p-3 shadow-lg hover:bg-blue-700 transition z-10"
                  aria-label="Next project"
                >
                  <svg className="w-6 h-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
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
        className="bg-[#0c0f1a] text-white py-16 px-6"
        aria-label="Sección de contacto"
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.3 }}
        transition={{ duration: 0.7 }}
      >
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl font-semibold mb-6">{t('contact.title') as string}</h2>
          <p className="text-gray-400 mb-8">
            {t('contact.subtitle') as string}
          </p>
          <ContactForm />
          <div className="mt-10 flex justify-center gap-6" role="navigation" aria-label="Enlaces a redes sociales">
            <a
              href="https://github.com/Lauti-Tapia"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-400 hover:text-white transition"
              aria-label="Visitar mi perfil de GitHub"
            >
              GitHub
            </a>
            <a
              href="https://www.linkedin.com/in/lautaro-tapia-9012091b8/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-400 hover:text-white transition"
              aria-label="Visitar mi perfil de LinkedIn"
            >
              LinkedIn
            </a>
          </div>
        </div>
      </motion.section>

      {/* Footer */}
      <footer className="bg-[#0a0a23] text-white py-8 px-6 text-center" role="contentinfo">
        <div className="max-w-6xl mx-auto">
          <p className="text-sm text-gray-400">
            © {new Date().getFullYear()} Lautaro Tapia - {t('footer.rights') as string}
          </p>
        </div>
      </footer>
    </main>
  );
}

export default function Home() {
  return <HomeContent />;
}
