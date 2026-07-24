import { useState, useEffect, useRef } from 'react';
import { 
  Flame, 
  Shield, 
  Users, 
  MapPin, 
  Phone, 
  Mail, 
  Clock, 
  Heart, 
  ChevronRight, 
  Menu, 
  X, 
  CheckCircle, 
  ArrowRight, 
  Award, 
  Send, 
  Info, 
  DollarSign, 
  ChevronLeft, 
  MessageSquare,
  AlertTriangle,
  Brain,
  Sparkles,
  FileText,
  Search,
  Activity,
  RefreshCw
} from 'lucide-react';


// Custom hook to detect when an element is visible in the viewport
function useIntersectionObserver({ threshold = 0, root = null, rootMargin = '0px' } = {}) {
  const [isIntersecting, setIsIntersecting] = useState(false);
  const elementRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => {
      setIsIntersecting(entry.isIntersecting);
    }, { threshold, root, rootMargin });

    const currentElement = elementRef.current;
    if (currentElement) {
      observer.observe(currentElement);
    }

    return () => {
      if (currentElement) {
        observer.unobserve(currentElement);
      }
    };
  }, [threshold, root, rootMargin]);

  return [elementRef, isIntersecting];
}

// Custom hook for animated counter values
function useAnimatedCounter(targetValue, duration = 2000, trigger = true) {
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!trigger) return;
    
    let start = 0;
    const end = parseInt(targetValue, 10);
    if (start === end) return;

    const totalMiliseconds = duration;
    const incrementTime = Math.max(Math.floor(totalMiliseconds / end), 10);
    
    const timer = setInterval(() => {
      start += Math.ceil(end / (totalMiliseconds / incrementTime));
      if (start >= end) {
        clearInterval(timer);
        setCount(end);
      } else {
        setCount(start);
      }
    }, incrementTime);

    return () => clearInterval(timer);
  }, [targetValue, duration, trigger]);

  return count;
}

function StatCard({ stat, isVisible }) {
  const countValue = useAnimatedCounter(stat.target, 2500, isVisible);

  return (
    <div className="text-center p-6 bg-[#111111]/60 border border-white/5 rounded-2xl backdrop-blur-sm">
      <span className="block text-4xl sm:text-5xl lg:text-6xl font-black text-[#C8102E] mb-2 tracking-tight">
        {countValue}{stat.suffix}
      </span>
      <span className="block text-xs uppercase tracking-widest text-gray-400 font-bold mb-1">
        {stat.label}
      </span>
      <div className="w-8 h-0.5 bg-[#C9A227] mx-auto mt-3" />
    </div>
  );
}

const encodeForm = (data) =>
  new URLSearchParams(
    Object.entries(data).map(([key, value]) => [key, String(value ?? '')]),
  ).toString();

async function submitNetlifyForm(name, fields) {
  const response = await fetch('/', {
    method: 'POST',
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    body: encodeForm({ 'form-name': name, ...fields }),
  });

  if (!response.ok) {
    throw new Error('No fue posible enviar el formulario.');
  }
}


// Unsplash premium firefighter & Los Ríos regional related photography URLs
const IMAGES = {
  heroBg: "https://images.unsplash.com/photo-1516589178581-6cd7833ae3b2?auto=format&fit=crop&q=80&w=1920", 
  aboutUs: "https://images.unsplash.com/photo-1608976478549-b593630f9a90?auto=format&fit=crop&q=80&w=1000", 
  volunteerBg: "https://images.unsplash.com/photo-1599740831144-530ba11793d4?auto=format&fit=crop&q=80&w=1000", 
  gallery1: "https://images.unsplash.com/photo-1533174072545-7a4b6ad7a6c3?auto=format&fit=crop&q=80&w=800", 
  gallery2: "https://images.unsplash.com/photo-1461896836934-ffe607ba8211?auto=format&fit=crop&q=80&w=800", 
  gallery3: "https://images.unsplash.com/photo-1628348068343-c6a848d2b6dd?auto=format&fit=crop&q=80&w=800", 
  gallery4: "https://images.unsplash.com/photo-1518156677180-95a2893f3e9f?auto=format&fit=crop&q=80&w=800", 
  gallery5: "https://images.unsplash.com/photo-1508873696983-2df519f0397e?auto=format&fit=crop&q=80&w=800", 
  gallery6: "https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?auto=format&fit=crop&q=80&w=800", 
};

const SERVICES = [
  {
    icon: "🚒",
    title: "Incendios Estructurales",
    description: "Combate de incendios en viviendas, comercios, escuelas e infraestructura crítica de Puerto Nuevo y alrededores."
  },
  {
    icon: "🌲",
    title: "Incendios Forestales",
    description: "Especialización táctica en predios agrícolas, plantaciones forestales y matorrales nativos de la Región de Los Ríos."
  },
  {
    icon: "🚗",
    title: "Rescate Vehicular",
    description: "Atención especializada y rescate técnico en accidentes de tránsito en carreteras rurales y rutas conectoras."
  },
  {
    icon: "🏥",
    title: "Emergencias Médicas",
    description: "Atención prehospitalaria inicial de urgencia, estabilización y soporte vital básico hasta la llegada de ambulancia."
  },
  {
    icon: "🧗",
    title: "Rescate en Altura",
    description: "Maniobras de rescate vertical con sistemas de cuerdas avanzadas en estructuras complejas, silos y barrancos."
  },
  {
    icon: "🛠",
    title: "Espacios Confinados",
    description: "Ingreso seguro y rescate técnico en pozos, depósitos industriales y áreas con atmósferas peligrosas."
  },
  {
    icon: "🌧",
    title: "Temporales y Aluviones",
    description: "Respuesta rápida ante inclemencias climáticas, remociones en masa, voladuras de techos e inundaciones de invierno."
  },
  {
    icon: "🌊",
    title: "Catástrofes y Desastres",
    description: "Coordinación de respuesta mayor ante terremotos u otras emergencias a gran escala junto al Cuerpo de Bomberos de La Unión."
  },
  {
    icon: "🎓",
    title: "Capacitación Comunitaria",
    description: "Formación de primeros auxilios, uso de extintores y planes de evacuación para colegios rurales y juntas de vecinos."
  },
  {
    icon: "🛡",
    title: "Prevención de Incendios",
    description: "Inspecciones preventivas, campañas informativas y asesoramiento técnico territorial a microempresas locales."
  }
];

const STATS = [
  { id: "years", target: "42", suffix: "", label: "Años de Servicio" },
  { id: "calls", target: "380", suffix: "+", label: "Emergencias Anuales" },
  { id: "active", target: "35", suffix: "", label: "Voluntarios Activos" },
  { id: "vehicles", target: "3", suffix: "", label: "Unidades en Flota (Material Mayor)" }
];

const GALLERY_CATEGORIES = ["Todos", "Material Mayor", "Capacitaciones", "Emergencias", "Comunidad"];

const GALLERY_ITEMS = [
  { img: IMAGES.gallery1, category: "Material Mayor", title: "Unidad de Rescate R-6", desc: "Equipada con herramientas hidráulicas pesadas" },
  { img: IMAGES.gallery2, category: "Comunidad", title: "Juramento de Nuevos Voluntarios", desc: "Compromiso de por vida con Puerto Nuevo" },
  { img: IMAGES.gallery3, category: "Emergencias", title: "Control de Incendio Forestal", desc: "Operaciones en temporada estival" },
  { img: IMAGES.gallery4, category: "Capacitaciones", title: "Simulacro de Rescate Vertical", desc: "Entrenamiento técnico mensual continuo" },
  { img: IMAGES.gallery5, category: "Comunidad", title: "Visita de Escuela Rural local", desc: "Educación de autoprotección en los niños" },
  { img: IMAGES.gallery6, category: "Material Mayor", title: "Carro Bomba B-6", desc: "Unidad de primer ataque contra incendios estructurales" }
];

const TESTIMONIALS = [
  {
    name: "Raúl Gatica",
    role: "Presidente Junta de Vecinos Puerto Nuevo",
    quote: "Gracias a la rapidez y profesionalismo de la Sexta Compañía, logramos controlar el incendio forestal que amenazaba directamente nuestras casas. Son verdaderos héroes rurales."
  },
  {
    name: "María Constanza Ríos",
    role: "Directora Escuela Rural Los Alerces",
    quote: "Siempre están dispuestos a capacitar a nuestros niños y preparar al equipo docente en prevención. Tener a la Sexta Compañía cerca nos da una tranquilidad inmensa."
  },
  {
    name: "Andrés Larraín",
    role: "Agricultor Local",
    quote: "Sufrimos un grave accidente vehicular en la ruta y los bomberos de Puerto Nuevo llegaron en minutos. Su destreza técnica para extraernos del vehículo salvó mi vida."
  }
];

const DONATION_TIERS = [
  { amount: 5000, description: "Financia 1 par de guantes técnicos de rescate.", benefit: "Guantes de protección térmica" },
  { amount: 10000, description: "Financia combustible para el traslado de una unidad de rescate a una emergencia rural.", benefit: "Movilización rápida de carros" },
  { amount: 25000, description: "Financia la mantención de herramientas de rescate hidráulico.", benefit: "Herramientas de rescate críticas" },
  { amount: 50000, description: "Financia la recarga de equipos de respiración autónoma (ERA) para el ingreso a incendios.", benefit: "Aire limpio para el bombero" },
];

export default function App() {
  
  // Navigation & General UI States
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState('hero');

  // Contact form state
  const [contactName, setContactName] = useState('');
  const [contactEmail, setContactEmail] = useState('');
  const [contactPhone, setContactPhone] = useState('');
  const [contactMessage, setContactMessage] = useState('');
  const [contactSuccess, setContactSuccess] = useState(false);

  // Volunteer form state
  const [volunteerName, setVolunteerName] = useState('');
  const [volunteerAge, setVolunteerAge] = useState('');
  const [volunteerEmail, setVolunteerEmail] = useState('');
  const [volunteerPhone, setVolunteerPhone] = useState('');
  const [volunteerExp, setVolunteerExp] = useState('no');
  const [volunteerMessage, setVolunteerMessage] = useState('');
  const [volunteerSuccess, setVolunteerSuccess] = useState(false);

  // Interactive Donation custom states
  const [selectedDonation, setSelectedDonation] = useState(10000);
  const [customDonation, setCustomDonation] = useState('');
  // Gallery interactive states
  const [selectedGalleryCategory, setSelectedGalleryCategory] = useState("Todos");

  // Testimonial slider state
  const [currentTestimonial, setCurrentTestimonial] = useState(0);


  // AI Assistant Tab Selectors
  const [aiActiveTab, setAiActiveTab] = useState('risk'); // 'risk', 'chat', 'plan', 'screen'

  // General chat states
  const [chatInput, setChatInput] = useState('');
  const [chatResponse, setChatResponse] = useState('');
  const [chatSources, setChatSources] = useState([]);
  const [isChatLoading, setIsChatLoading] = useState(false);

  // Fire Risk State
  const [riskArea, setRiskArea] = useState('Puerto Nuevo Centro');
  const [riskResponse, setRiskResponse] = useState('');
  const [riskSources, setRiskSources] = useState([]);
  const [isRiskLoading, setIsRiskLoading] = useState(false);

  // Evacuation Plan Form State
  const [planLocation, setPlanLocation] = useState('Cercano al Lago Ranco / Costanera');
  const [planAdults, setPlanAdults] = useState('2');
  const [planChildren, setPlanChildren] = useState('0');
  const [planVulnerable, setPlanVulnerable] = useState('No');
  const [planWaterSource, setPlanWaterSource] = useState('Agua Potable Rural (APR)');
  const [planHazards, setPlanHazards] = useState('Arbolado forestal denso / Pastizales secos');
  const [generatedPlan, setGeneratedPlan] = useState('');
  const [isPlanLoading, setIsPlanLoading] = useState(false);

  // Screener form state
  const [screenAge, setScreenAge] = useState('18-35');
  const [screenResidence, setScreenResidence] = useState('Puerto Nuevo');
  const [screenAvailability, setScreenAvailability] = useState('Noches y fines de semana');
  const [screenHealth, setScreenHealth] = useState('Buena condición física');
  const [screenerResponse, setScreenerResponse] = useState('');
  const [isScreenerLoading, setIsScreenerLoading] = useState(false);

  // Floating micro-assistant state
  const [showFloatingChat, setShowFloatingChat] = useState(false);
  const [floatingInput, setFloatingInput] = useState('');
  const [floatingMessages, setFloatingMessages] = useState([
    { sender: 'ai', text: '¡Hola! Soy el Guardián Virtual de la Sexta Compañía. ¿Tienes alguna duda de prevención, evacuación o sobre cómo unirte a nosotros hoy?' }
  ]);
  const [isFloatingLoading, setIsFloatingLoading] = useState(false);

  // Grounding Toggle
  const [useSearchGrounding, setUseSearchGrounding] = useState(true);


  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 80) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }

      // Check current visible section to highlight in navbar
      const sections = ['hero', 'quienes-somos', 'servicios', 'inteligencia-ia', 'impacto', 'galeria', 'testimonios', 'voluntarios', 'donaciones', 'contacto'];
      for (const sectionId of sections) {
        const el = document.getElementById(sectionId);
        if (el) {
          const rect = el.getBoundingClientRect();
          if (rect.top <= 120 && rect.bottom >= 120) {
            setActiveSection(sectionId);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (id) => {
    setMobileMenuOpen(false);
    const element = document.getElementById(id);
    if (element) {
      window.scrollTo({
        top: element.offsetTop - 80,
        behavior: 'smooth'
      });
    }
  };


  const handleContactSubmit = async (e) => {
    e.preventDefault();
    if (!contactName || !contactEmail || !contactMessage) return;

    try {
      await submitNetlifyForm('contacto', {
        nombre: contactName,
        correo: contactEmail,
        telefono: contactPhone,
        mensaje: contactMessage,
      });
      setContactSuccess(true);
      setContactName('');
      setContactEmail('');
      setContactPhone('');
      setContactMessage('');
    } catch {
      window.alert('No fue posible enviar el mensaje. Intenta nuevamente en unos minutos.');
    }
  };

  const handleVolunteerSubmit = async (e) => {
    e.preventDefault();
    if (!volunteerName || !volunteerAge || !volunteerEmail || !volunteerPhone) return;

    try {
      await submitNetlifyForm('postulacion', {
        nombre: volunteerName,
        edad: volunteerAge,
        correo: volunteerEmail,
        telefono: volunteerPhone,
        experiencia: volunteerExp,
        motivacion: volunteerMessage,
      });
      setVolunteerSuccess(true);
      setVolunteerName('');
      setVolunteerAge('');
      setVolunteerEmail('');
      setVolunteerPhone('');
      setVolunteerExp('no');
      setVolunteerMessage('');
    } catch {
      window.alert('No fue posible enviar la postulación. Intenta nuevamente en unos minutos.');
    }
  };

  const handleDonationSubmit = (e) => {
    e.preventDefault();
    const donationUrl = import.meta.env.VITE_DONATION_URL;

    if (!donationUrl) {
      window.alert('El canal oficial de donaciones todavía no ha sido configurado.');
      return;
    }

    window.location.assign(donationUrl);
  };

  const [aboutRef, aboutInView] = useIntersectionObserver({ threshold: 0.15 });
  const [servicesRef, servicesInView] = useIntersectionObserver({ threshold: 0.1 });
  const [aiRef] = useIntersectionObserver({ threshold: 0.1 });
  const [statsRef, statsInView] = useIntersectionObserver({ threshold: 0.2 });
  const [galleryRef, galleryInView] = useIntersectionObserver({ threshold: 0.1 });
  const [volunteerRef, volunteerInView] = useIntersectionObserver({ threshold: 0.15 });
  const [donationsRef] = useIntersectionObserver({ threshold: 0.15 });

  // Filtered gallery items list
  const filteredGallery = selectedGalleryCategory === "Todos" 
    ? GALLERY_ITEMS 
    : GALLERY_ITEMS.filter(item => item.category === selectedGalleryCategory);


  // Standard Exponential Backoff fetch through a Netlify Function.
  const callGeminiAPI = async (prompt, systemInstruction = '', searchGrounded = false, retries = 3, delay = 1000) => {
    const payload = {
      prompt,
      systemInstruction,
      searchGrounded,
    };

    for (let i = 0; i < retries; i++) {
      try {
        const response = await fetch('/.netlify/functions/gemini', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(payload)
        });

        if (!response.ok) {
          throw new Error(`API returned status ${response.status}`);
        }

        const result = await response.json();
        if (!result.text) throw new Error('Unexpected response structure');
        return { text: result.text, sources: result.sources || [] };
      } catch (error) {
        if (i === retries - 1) {
          throw error; // Propagate final error
        }
        await new Promise(resolve => setTimeout(resolve, delay * Math.pow(2, i))); // Exponential Backoff
      }
    }
  };


  // Trigger Localized Fire Risk Analysis
  const handleAnalyzeRisk = async () => {
    setIsRiskLoading(true);
    setRiskResponse('');
    setRiskSources([]);

    const query = `Analiza detalladamente los riesgos de incendios forestales y emergencias de invierno en el sector de "${riskArea}" en Puerto Nuevo, Comuna de La Unión, Región de Los Ríos. Entrega recomendaciones específicas de autoprotección, cortafuegos rurales, limpieza de techumbres e indicaciones de evacuación considerando las características geográficas locales y el entorno agrícola/forestal.`;
    const system = "Actúa como el Comandante de Prevención de la Sexta Compañía de Bomberos de Puerto Nuevo. Sé conciso, profesional, y entrega pautas preventivas realistas para el sur de Chile en español de Chile.";

    try {
      const data = await callGeminiAPI(query, system, useSearchGrounding);
      setRiskResponse(data.text);
      setRiskSources(data.sources);
    } catch (err) {
      console.error(err);
      setRiskResponse("Ocurrió un inconveniente al conectar con el servidor de análisis. Por favor, reintenta en unos instantes. Puedes prepararte manteniendo limpias tus canaletas y despejando pastizales secos a 10 metros de tu vivienda.");
    } finally {
      setIsRiskLoading(false);
    }
  };

  // Trigger Custom Plan Generation
  const handleGeneratePlan = async () => {
    setIsPlanLoading(true);
    setGeneratedPlan('');

    const prompt = `Genera un "Plan Familiar de Emergencia y Evacuación Personalizado" para una familia con las siguientes características en Puerto Nuevo, La Unión, Chile:
    - Sector/Ubicación: ${planLocation}
    - Adultos en el hogar: ${planAdults}
    - Niños en el hogar: ${planChildren}
    - Miembros vulnerables o con movilidad reducida: ${planVulnerable}
    - Principal fuente de agua: ${planWaterSource}
    - Principales amenazas de entorno: ${planHazards}
    
    El plan debe estar dividido en:
    1. Medidas Inmediatas de Mitigación (Antes)
    2. Rutas de escape sugeridas y zonas de seguridad comunitarias en Puerto Nuevo (Durante)
    3. Organización de tareas familiares (Quién asiste a quién, quién cuida mascotas/vulnerables)
    4. Kit de emergencia recomendado para el clima del sur de Chile.
    Sé claro, directo, estructurado en Markdown y muy centrado en salvar vidas de forma práctica.`;

    const system = "Eres un Ingeniero en Prevención de Riesgos y Oficial de Enlace de Emergencias de Bomberos de Chile. Redacta un plan estructurado, reconfortante pero firme y directo.";

    try {
      const data = await callGeminiAPI(prompt, system, false);
      setGeneratedPlan(data.text);
    } catch (err) {
      console.error(err);
      setGeneratedPlan("Error al generar el plan interactivo. Asegúrate de tener claras tus rutas de escape hacia zonas altas libres de vegetación densa.");
    } finally {
      setIsPlanLoading(false);
    }
  };

  // Trigger Volunteer Admission Pre-Screener
  const handleRunScreener = async () => {
    setIsScreenerLoading(true);
    setScreenerResponse('');

    const prompt = `Evalúa el siguiente perfil de un potencial postulante para ingresar a la Sexta Compañía de Bomberos de Puerto Nuevo, La Unión:
    - Edad: ${screenAge} años.
    - Lugar de residencia/trabajo principal: ${screenResidence}.
    - Disponibilidad semanal: ${screenAvailability}.
    - Estado de salud/físico: ${screenHealth}.

    Indica si cumple con los requisitos iniciales estándar de Bomberos de Chile (Edad de 18+, residencia cercana para responder a guardias, salud compatible).
    Proporciona consejos personalizados basados en su disponibilidad y perfil, motívalo de manera institucional, y detalla los siguientes pasos de reclutamiento (reunión en cuartel, academia de formación inicial, entrega de antecedentes).`;

    const system = "Actúa como el Oficial de Reclutamiento y Comandancia de la Sexta Compañía Puerto Nuevo. Sé cordial, riguroso, y sumamente motivador. Usa terminología institucional chilena.";

    try {
      const data = await callGeminiAPI(prompt, system, false);
      setScreenerResponse(data.text);
    } catch (err) {
      console.error(err);
      setScreenerResponse("No pudimos procesar tu pre-evaluación en este momento. Te invitamos cordialmente a acercarte al cuartel los días viernes desde las 20:00 hrs para conversar directamente con nuestros oficiales.");
    } finally {
      setIsScreenerLoading(false);
    }
  };

  // General Interactive Chat with Fire Chief
  const handleGeneralChat = async () => {
    if (!chatInput.trim()) return;
    setIsChatLoading(true);
    setChatResponse('');
    setChatSources([]);

    const userMsg = chatInput;
    const system = "Eres el 'Sargento Digital' y Asistente Experto en Prevención de Incendios de la Sexta Compañía de Bomberos de Puerto Nuevo. Responde consultas comunitarias sobre seguridad en el hogar, prevención de incendios forestales de interfaz, uso de extintores, manejo seguro de estufas a leña (combustión lenta) muy comunes en el sur de Chile, y rol del voluntariado.";

    try {
      const data = await callGeminiAPI(userMsg, system, useSearchGrounding);
      setChatResponse(data.text);
      setChatSources(data.sources);
    } catch (err) {
      console.error(err);
      setChatResponse("Disculpa, en este momento estoy atendiendo comunicaciones de radio de emergencia. Puedes consultar las normas de seguridad del Plan Cooperación de Bomberos de Chile.");
    } finally {
      setIsChatLoading(false);
    }
  };

  // Floating micro-assistant messaging
  const handleFloatingSend = async () => {
    if (!floatingInput.trim()) return;
    const userText = floatingInput;
    setFloatingMessages(prev => [...prev, { sender: 'user', text: userText }]);
    setFloatingInput('');
    setIsFloatingLoading(true);

    const prompt = `Responde brevemente (máximo 4 líneas) a la siguiente consulta de un vecino de Puerto Nuevo, La Unión, Chile: "${userText}"`;
    const system = "Eres el Guardián Virtual de Bomberos Puerto Nuevo. Responde rápido, con tono cálido, preventivo y claro. Recuerda que para emergencias reales deben marcar siempre el 132.";

    try {
      const data = await callGeminiAPI(prompt, system, false);
      setFloatingMessages(prev => [...prev, { sender: 'ai', text: data.text }]);
    } catch (err) {
      console.error(err);
      setFloatingMessages(prev => [...prev, { sender: 'ai', text: "Lo siento, tengo interferencia en la frecuencia. Para emergencias inmediatas llama directo al 132." }]);
    } finally {
      setIsFloatingLoading(false);
    }
  };

  return (
    <div className="bg-[#111111] text-white font-sans antialiased selection:bg-[#C8102E] selection:text-white">
      
      {/* STICKY HEADER AND NAVIGATION */}
      <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${scrolled ? 'bg-[#111111]/95 backdrop-blur-md py-3 shadow-xl border-b border-[#C8102E]/20' : 'bg-transparent py-5'}`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between">
            
            {/* Logo area */}
            <div className="flex items-center space-x-3 cursor-pointer" onClick={() => scrollToSection('hero')}>
              <div className="relative flex items-center justify-center w-12 h-12 rounded-full bg-[#C8102E] border border-[#C9A227] shadow-lg shadow-[#C8102E]/30 group">
                <svg viewBox="0 0 100 100" className="w-8 h-8 fill-current text-white transform group-hover:rotate-12 transition-transform duration-300">
                  <path d="M50 5 L60 30 L85 30 L65 48 L75 75 L50 60 L25 75 L35 48 L15 30 L40 30 Z" className="stroke-[#C9A227] stroke-[3px]" />
                  <text x="50" y="58" fontSize="22" fontWeight="bold" textAnchor="middle" fill="#FFFFFF">6</text>
                </svg>
                <div className="absolute -inset-1 rounded-full bg-[#C9A227]/20 blur opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              </div>
              <div>
                <span className="block text-sm font-bold tracking-widest text-[#C8102E]">SEXTA COMPAÑÍA</span>
                <span className="block text-xs font-semibold tracking-wider text-gray-300">PUERTO NUEVO • LA UNIÓN</span>
              </div>
            </div>

            {/* Desktop Navigation Links */}
            <div className="hidden lg:flex items-center space-x-6">
              {[
                { label: 'Quiénes Somos', target: 'quienes-somos' },
                { label: 'Servicios', target: 'servicios' },
                { label: 'Prevención IA', target: 'inteligencia-ia' },
                { label: 'Impacto', target: 'impacto' },
                { label: 'Galería', target: 'galeria' },
                { label: 'Hazte Voluntario', target: 'voluntarios' },
                { label: 'Donar', target: 'donaciones' },
                { label: 'Contacto', target: 'contacto' }
              ].map((item) => (
                <button
                  key={item.target}
                  onClick={() => scrollToSection(item.target)}
                  className={`text-sm font-medium tracking-wide transition-colors relative py-1 px-2 rounded hover:text-white ${activeSection === item.target ? 'text-[#C8102E]' : 'text-gray-300'}`}
                >
                  {item.label}
                  {activeSection === item.target && (
                    <span className="absolute bottom-0 left-2 right-2 h-[2px] bg-[#C8102E] rounded-full" />
                  )}
                </button>
              ))}
            </div>

            {/* Urgent Phone & CTA Block */}
            <div className="hidden lg:flex items-center space-x-4">
              <a href="tel:132" className="flex items-center space-x-2 bg-red-600 hover:bg-red-700 text-white font-bold px-4 py-2 rounded-md border border-red-500 animate-pulse transition-all">
                <Phone className="w-4 h-4 fill-current" />
                <span>EMERGENCIA 132</span>
              </a>
              <button 
                onClick={() => scrollToSection('voluntarios')} 
                className="bg-[#C9A227] hover:bg-[#C9A227]/90 text-black font-bold px-4 py-2 rounded-md transition-colors"
              >
                Postular
              </button>
            </div>

            {/* Mobile menu button */}
            <div className="flex lg:hidden">
              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="p-2 rounded-md text-gray-400 hover:text-white focus:outline-none"
              >
                {mobileMenuOpen ? <X className="h-6 w-6 text-white" /> : <Menu className="h-6 w-6 text-white" />}
              </button>
            </div>

          </div>
        </div>

        {/* Mobile Navigation Panel */}
        {mobileMenuOpen && (
          <div className="lg:hidden bg-[#111111] border-b border-[#C8102E]/30 animate-fadeIn">
            <div className="px-2 pt-2 pb-4 space-y-1 sm:px-3">
              {[
                { label: 'Quiénes Somos', target: 'quienes-somos' },
                { label: 'Servicios', target: 'servicios' },
                { label: 'Prevención IA', target: 'inteligencia-ia' },
                { label: 'Impacto', target: 'impacto' },
                { label: 'Galería', target: 'galeria' },
                { label: 'Hazte Voluntario', target: 'voluntarios' },
                { label: 'Donaciones', target: 'donaciones' },
                { label: 'Contacto', target: 'contacto' }
              ].map((item) => (
                <button
                  key={item.target}
                  onClick={() => scrollToSection(item.target)}
                  className={`block w-full text-left px-3 py-2 rounded-md text-base font-medium transition-colors ${activeSection === item.target ? 'bg-[#C8102E] text-white' : 'text-gray-300 hover:bg-gray-800'}`}
                >
                  {item.label}
                </button>
              ))}
              <div className="pt-4 pb-2 border-t border-gray-800 flex flex-col space-y-2 px-3">
                <a href="tel:132" className="flex items-center justify-center space-x-2 bg-red-600 text-white font-bold py-2.5 rounded-md text-center">
                  <Phone className="w-5 h-5 fill-current" />
                  <span>LLAMAR 132 (EMERGENCIAS)</span>
                </a>
                <button
                  onClick={() => scrollToSection('voluntarios')}
                  className="w-full bg-[#C9A227] text-black font-bold py-2.5 rounded-md"
                >
                  Hazte Voluntario
                </button>
              </div>
            </div>
          </div>
        )}
      </nav>

      {/* HERO SECTION */}
      <section id="hero" className="relative min-h-screen flex items-center justify-center overflow-hidden pt-16">
        
        {/* Background Image with Dark Overlay */}
        <div className="absolute inset-0 z-0">
          <img 
            src={IMAGES.heroBg} 
            alt="Bomberos Puerto Nuevo" 
            className="w-full h-full object-cover object-center transform scale-105"
            style={{ transition: 'transform 10s' }}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#111111] via-[#111111]/80 to-[#111111]/40 z-10" />
          <div className="absolute -bottom-1/4 -left-1/4 w-[600px] h-[600px] rounded-full bg-[#C8102E]/10 blur-[150px] pointer-events-none" />
          <div className="absolute top-1/4 -right-1/4 w-[600px] h-[600px] rounded-full bg-[#C9A227]/5 blur-[150px] pointer-events-none" />
        </div>

        {/* Content */}
        <div className="relative z-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-10 pb-20 text-center lg:text-left">
          <div className="grid lg:grid-cols-12 gap-12 items-center">
            
            <div className="lg:col-span-8 space-y-6">
              
              {/* Badge */}
              <div className="inline-flex items-center space-x-2 bg-[#C8102E]/20 border border-[#C8102E]/50 px-3 py-1.5 rounded-full text-[#C8102E] text-xs font-semibold tracking-wider uppercase mx-auto lg:mx-0">
                <Flame className="w-3.5 h-3.5 animate-bounce text-[#C9A227]" />
                <span>Abnegación y Constancia • Tecnología y Prevención</span>
              </div>

              {/* Main Headline */}
              <h1 className="text-4xl sm:text-5xl md:text-6xl font-black tracking-tight text-white leading-none">
                Protegiendo a <br className="hidden sm:inline" />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-500 via-[#C8102E] to-[#C9A227]">
                  Puerto Nuevo
                </span> y sus Familias
              </h1>

              {/* Subtitle */}
              <p className="text-lg sm:text-xl text-gray-300 max-w-2xl mx-auto lg:mx-0 leading-relaxed font-light">
                Somos la Sexta Compañía del Cuerpo de Bomberos de La Unión. Protegemos el territorio rural de Los Ríos con valor, honor y ahora con herramientas inteligentes de autoprotección comunitaria.
              </p>

              {/* Call to Actions */}
              <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4 pt-4">
                <button 
                  onClick={() => scrollToSection('voluntarios')}
                  className="w-full sm:w-auto bg-[#C8102E] hover:bg-red-700 text-white text-base font-bold px-8 py-4 rounded-xl transition-all duration-300 shadow-lg shadow-red-600/30 hover:shadow-red-600/50 hover:-translate-y-0.5 flex items-center justify-center space-x-3 group"
                >
                  <span>Hazte Voluntario</span>
                  <ArrowRight className="w-5 h-5 group-hover:translate-x-1.5 transition-transform" />
                </button>
                <button 
                  onClick={() => scrollToSection('inteligencia-ia')}
                  className="w-full sm:w-auto bg-gradient-to-r from-amber-500 to-[#C9A227] hover:from-amber-600 hover:to-yellow-600 text-black text-base font-bold px-8 py-4 rounded-xl transition-all shadow-lg hover:-translate-y-0.5 flex items-center justify-center space-x-3"
                >
                  <Brain className="w-5 h-5" />
                  <span>Evaluar Riesgo con IA</span>
                </button>
              </div>

              {/* Quick Status */}
              <div className="pt-6 grid grid-cols-2 md:grid-cols-3 gap-4 max-w-lg mx-auto lg:mx-0">
                <div className="bg-black/40 backdrop-blur-sm border border-white/5 p-3 rounded-lg flex items-center space-x-2.5">
                  <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0" />
                  <span className="text-xs text-gray-300 font-medium text-left leading-tight">Guardia Activa 24/7</span>
                </div>
                <div className="bg-black/40 backdrop-blur-sm border border-white/5 p-3 rounded-lg flex items-center space-x-2.5">
                  <MapPin className="w-5 h-5 text-[#C9A227] flex-shrink-0" />
                  <span className="text-xs text-gray-300 font-medium text-left leading-tight">La Unión, Los Ríos</span>
                </div>
                <div className="col-span-2 md:col-span-1 bg-black/40 backdrop-blur-sm border border-[#C8102E]/30 p-3 rounded-lg flex items-center space-x-2.5">
                  <span className="flex h-2.5 w-2.5 relative">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-red-500"></span>
                  </span>
                  <span className="text-xs text-gray-300 font-bold text-left leading-tight">Copiloto IA Conectado</span>
                </div>
              </div>

            </div>

            {/* Quick Hero Graphics */}
            <div className="lg:col-span-4 hidden lg:flex justify-center">
              <div className="relative w-80 h-80 rounded-full border border-dashed border-red-500/30 flex items-center justify-center p-8">
                <div className="absolute inset-0 rounded-full border border-[#C9A227]/20 animate-spin" style={{ animationDuration: '60s' }} />
                <div className="w-64 h-64 rounded-full bg-gradient-to-br from-[#C8102E]/20 to-black/80 border-2 border-[#C9A227]/40 flex flex-col items-center justify-center text-center p-6 shadow-2xl relative">
                  <svg viewBox="0 0 100 100" className="w-24 h-24 text-red-500 fill-current mb-4">
                    <path d="M50 5 L60 30 L85 30 L65 48 L75 75 L50 60 L25 75 L35 48 L15 30 L40 30 Z" className="stroke-[#C9A227] stroke-[3px]" />
                    <text x="50" y="58" fontSize="24" fontWeight="bold" textAnchor="middle" fill="#FFFFFF">6</text>
                  </svg>
                  <p className="text-[#C9A227] font-bold text-xs uppercase tracking-widest">Sexta Compañía</p>
                  <p className="text-white font-extrabold text-sm tracking-wider">PUERTO NUEVO</p>
                  <p className="text-gray-400 text-[10px] mt-1 font-semibold">Fundada en 1984</p>
                </div>
              </div>
            </div>

          </div>
        </div>

      </section>

      {/* WHO WE ARE SECTION */}
      <section id="quienes-somos" ref={aboutRef} className="py-24 relative overflow-hidden bg-gradient-to-b from-[#111111] to-[#161616]">
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
            <h2 className="text-xs font-bold tracking-widest text-[#C8102E] uppercase">Nuestra Identidad</h2>
            <p className="text-3xl sm:text-4xl font-extrabold tracking-tight">Abnegación, Coraje y Vocación Rural</p>
            <div className="w-16 h-1 bg-[#C8102E] mx-auto rounded-full" />
            <p className="text-gray-300">
              Ubicados en la estratégica localidad rural de Puerto Nuevo, Región de Los Ríos, custodiamos incansablemente la seguridad de nuestros vecinos, predios forestales y patrimonio natural.
            </p>
          </div>

          <div className="grid lg:grid-cols-12 gap-12 items-center">
            
            {/* Visual Column */}
            <div className={`lg:col-span-5 relative transition-all duration-1000 transform ${aboutInView ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-10'}`}>
              <div className="relative rounded-2xl overflow-hidden shadow-2xl border border-white/10 group">
                <img 
                  src={IMAGES.aboutUs} 
                  alt="Nuestra Compañía" 
                  className="w-full h-[450px] object-cover object-center group-hover:scale-105 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black via-black/30 to-transparent" />
                <div className="absolute bottom-6 left-6 right-6 p-4 rounded-xl bg-black/60 backdrop-blur-md border border-white/10">
                  <div className="flex items-center space-x-3">
                    <Award className="w-8 h-8 text-[#C9A227]" />
                    <div>
                      <h4 className="text-sm font-bold text-white uppercase">Sexta Compañía Puerto Nuevo</h4>
                      <p className="text-xs text-gray-300">Fundada con profunda pasión el 6 de Noviembre de 1984</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Content Column */}
            <div className="lg:col-span-7 space-y-8">
              
              <div className="space-y-4">
                <h3 className="text-2xl font-bold text-[#C9A227]">Nuestra Misión Institucional</h3>
                <p className="text-gray-300 leading-relaxed font-light">
                  Nuestra misión primordial es salvar vidas y bienes en Puerto Nuevo, sectores rurales aledaños y la comuna de La Unión. Nos especializamos en la extinción de incendios forestales y de interfase, incidentes vehiculares complejos y emergencias derivadas del clima adverso de nuestra geografía sureña.
                </p>
              </div>

              <div className="space-y-4">
                <h3 className="text-2xl font-bold text-white">Nuestros Pilares</h3>
                
                <div className="grid sm:grid-cols-2 gap-4">
                  {[
                    {
                      title: "Vínculo Comunitario",
                      desc: "Nuestros voluntarios son vecinos, agricultores, profesionales y técnicos del mismo territorio."
                    },
                    {
                      title: "Capacitación de Elite",
                      desc: "Entrenamientos bajo estándares de la Academia Nacional de Bomberos de Chile."
                    },
                    {
                      title: "Adaptación Territorial",
                      desc: "Especializados en topografía compleja, bosques forestales y zonas rurales aisladas."
                    },
                    {
                      title: "Trabajo en Alianza",
                      desc: "Coordinación con el Cuerpo de Bomberos de La Unión para una respuesta robusta."
                    }
                  ].map((pilar, idx) => (
                    <div key={idx} className="bg-black/30 border border-white/5 p-4 rounded-xl flex items-start space-x-3">
                      <CheckCircle className="w-5 h-5 text-[#C8102E] flex-shrink-0 mt-0.5" />
                      <div>
                        <h4 className="text-sm font-bold text-white">{pilar.title}</h4>
                        <p className="text-xs text-gray-400 mt-1">{pilar.desc}</p>
                      </div>
                    </div>
                  ))}
                </div>

              </div>

              <div className="bg-[#C8102E]/10 border-l-4 border-[#C8102E] p-4 rounded-r-xl">
                <p className="text-sm italic text-gray-300">
                  "El fuego no distingue si un predio es grande o chico, si una casa es modesta o lujosa. Nosotros tampoco. Servimos a todos con la misma entrega y valor."
                </p>
                <span className="block text-xs font-bold text-[#C8102E] uppercase tracking-wider mt-2">— Capitán Sexta Compañía</span>
              </div>

            </div>

          </div>

        </div>

      </section>

      {/* SERVICES SECTION */}
      <section id="servicios" ref={servicesRef} className="py-24 relative overflow-hidden bg-gradient-to-b from-[#161616] to-[#111111]">
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
            <h2 className="text-xs font-bold tracking-widest text-[#C9A227] uppercase">Servicios de Emergencia</h2>
            <p className="text-3xl sm:text-4xl font-extrabold tracking-tight text-white">Nuestra Capacidad de Respuesta Técnica</p>
            <div className="w-16 h-1 bg-[#C9A227] mx-auto rounded-full" />
            <p className="text-gray-300">
              Estamos altamente equipados y preparados para responder con eficacia a una amplia gama de incidentes y catástrofes en nuestra región.
            </p>
          </div>

          <div className={`grid md:grid-cols-2 lg:grid-cols-3 gap-6 transition-all duration-1000 transform ${servicesInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
            {SERVICES.slice(0, 6).map((srv, idx) => (
              <div 
                key={idx} 
                className="bg-[#1c1c1c] hover:bg-gradient-to-br hover:from-[#242424] hover:to-[#1a1a1a] p-6 rounded-2xl border border-white/5 hover:border-[#C8102E]/40 shadow-lg hover:shadow-[#C8102E]/10 transition-all duration-300 group hover:-translate-y-1 flex flex-col justify-between"
              >
                <div>
                  <div className="w-12 h-12 rounded-xl bg-black/40 flex items-center justify-center text-2xl mb-4 group-hover:scale-110 transition-transform duration-300">
                    {srv.icon}
                  </div>
                  <h3 className="text-lg font-bold text-white mb-2 group-hover:text-[#C8102E] transition-colors">{srv.title}</h3>
                  <p className="text-sm text-gray-400 font-light leading-relaxed">{srv.description}</p>
                </div>
                <div className="mt-4 pt-4 border-t border-white/5 flex items-center text-xs font-semibold text-[#C9A227] group-hover:text-white transition-colors">
                  <span>DISPONIBILIDAD INMEDIATA</span>
                  <ChevronRight className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform" />
                </div>
              </div>
            ))}
          </div>

        </div>

      </section>

      {}
      
      {/* GEMINI AI INTEGRATION SECTION */}
      <section id="inteligencia-ia" ref={aiRef} className="py-24 relative overflow-hidden bg-gradient-to-b from-[#111111] to-[#1a1a1a] border-t border-b border-amber-500/20">
        <div className="absolute inset-0 bg-radial-gradient from-amber-500/5 via-transparent to-transparent pointer-events-none" />
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          
          <div className="text-center max-w-3xl mx-auto mb-12 space-y-4">
            <div className="inline-flex items-center space-x-2 bg-amber-500/10 border border-amber-500/30 px-3 py-1 rounded-full text-amber-500 text-xs font-bold tracking-widest uppercase">
              <Sparkles className="w-3.5 h-3.5 animate-pulse" />
              <span>Tecnología de Autoprotección Vecinal</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-black text-white">Centro de Inteligencia Preventiva (IA Gemini)</h2>
            <p className="text-gray-300 text-sm max-w-xl mx-auto leading-relaxed">
              Consulta medidas generales de prevención rural, prepara un borrador de
              plan familiar y revisa requisitos iniciales de voluntariado.
            </p>
            <p className="text-xs text-amber-200/80 max-w-2xl mx-auto">
              Las respuestas son orientativas y pueden contener errores. Confirma rutas,
              zonas seguras y requisitos con la Compañía y las autoridades. En una
              emergencia real llama al 132.
            </p>
          </div>

          {/* AI Interface Wrapper */}
          <div className="bg-[#151515] rounded-3xl border border-white/10 shadow-2xl overflow-hidden grid lg:grid-cols-12">
            
            {/* Sidebar Controls */}
            <div className="lg:col-span-4 bg-black/40 p-6 sm:p-8 border-r border-white/5 flex flex-col justify-between">
              <div className="space-y-6">
                <div>
                  <h3 className="text-lg font-bold text-white mb-1">Módulos Inteligentes</h3>
                  <p className="text-xs text-gray-400">Selecciona una de las herramientas de autoprotección.</p>
                </div>

                <div className="space-y-2.5">
                  <button
                    onClick={() => setAiActiveTab('risk')}
                    className={`w-full flex items-center space-x-3 p-3.5 rounded-xl text-left border transition-all ${aiActiveTab === 'risk' ? 'border-amber-500 bg-amber-500/10 text-white' : 'border-white/5 bg-white/5 text-gray-400 hover:text-white hover:bg-white/10'}`}
                  >
                    <AlertTriangle className="w-5 h-5 text-amber-500" />
                    <div>
                      <span className="block text-sm font-bold">Riesgo por Sector</span>
                      <span className="block text-[10px] text-gray-400">Análisis territorial detallado</span>
                    </div>
                  </button>

                  <button
                    onClick={() => setAiActiveTab('plan')}
                    className={`w-full flex items-center space-x-3 p-3.5 rounded-xl text-left border transition-all ${aiActiveTab === 'plan' ? 'border-amber-500 bg-amber-500/10 text-white' : 'border-white/5 bg-white/5 text-gray-400 hover:text-white hover:bg-white/10'}`}
                  >
                    <FileText className="w-5 h-5 text-amber-500" />
                    <div>
                      <span className="block text-sm font-bold">Plan de Evacuación</span>
                      <span className="block text-[10px] text-gray-400">Genera plan familiar en 1 clic</span>
                    </div>
                  </button>

                  <button
                    onClick={() => setAiActiveTab('screen')}
                    className={`w-full flex items-center space-x-3 p-3.5 rounded-xl text-left border transition-all ${aiActiveTab === 'screen' ? 'border-amber-500 bg-amber-500/10 text-white' : 'border-white/5 bg-white/5 text-gray-400 hover:text-white hover:bg-white/10'}`}
                  >
                    <Users className="w-5 h-5 text-amber-500" />
                    <div>
                      <span className="block text-sm font-bold">Evaluación Voluntariado</span>
                      <span className="block text-[10px] text-gray-400">Pre-calificador de admisión</span>
                    </div>
                  </button>

                  <button
                    onClick={() => setAiActiveTab('chat')}
                    className={`w-full flex items-center space-x-3 p-3.5 rounded-xl text-left border transition-all ${aiActiveTab === 'chat' ? 'border-amber-500 bg-amber-500/10 text-white' : 'border-white/5 bg-white/5 text-gray-400 hover:text-white hover:bg-white/10'}`}
                  >
                    <MessageSquare className="w-5 h-5 text-amber-500" />
                    <div>
                      <span className="block text-sm font-bold">Consultas de Seguridad</span>
                      <span className="block text-[10px] text-gray-400">Conversa con nuestro oficial IA</span>
                    </div>
                  </button>
                </div>
              </div>

              {/* Real-time Web Grounding Toggle */}
              <div className="mt-8 pt-6 border-t border-white/5">
                <div className="bg-[#111] p-4 rounded-xl border border-white/5 flex items-center justify-between">
                  <div>
                    <span className="block text-xs font-bold text-amber-500 flex items-center gap-1">
                      <Search className="w-3.5 h-3.5" /> Google Search
                    </span>
                    <span className="block text-[10px] text-gray-400">Buscar reportes CONAF en vivo</span>
                  </div>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input 
                      type="checkbox" 
                      className="sr-only peer" 
                      checked={useSearchGrounding} 
                      onChange={() => setUseSearchGrounding(!useSearchGrounding)} 
                    />
                    <div className="w-9 h-5 bg-gray-800 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-gray-300 after:border-gray-300 after:border after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-amber-500"></div>
                  </label>
                </div>
              </div>
            </div>

            {/* Active AI Workspace */}
            <div className="lg:col-span-8 p-6 sm:p-8 bg-gradient-to-b from-[#181818] to-[#121212] flex flex-col justify-between min-h-[480px]">
              
              {/* TAB 1: RIESGO POR SECTOR */}
              {aiActiveTab === 'risk' && (
                <div className="space-y-6 flex-grow flex flex-col justify-between">
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <h4 className="text-lg font-bold text-white flex items-center gap-2">
                        <Activity className="w-5 h-5 text-amber-500" />
                        <span>Analizador de Riesgo Territorial Rural</span>
                      </h4>
                      <span className="text-[10px] bg-red-600/20 text-red-500 border border-red-500/30 px-2 py-0.5 rounded font-bold">LOS RÍOS, CHILE</span>
                    </div>
                    <p className="text-xs text-gray-300">
                      Selecciona una localidad específica de nuestra zona de cobertura en Puerto Nuevo. Evaluaremos las amenazas geográficas y climáticas en base al historial de emergencias.
                    </p>

                    <div className="grid sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-xs text-gray-400 mb-1.5 font-semibold">Ubicación a Analizar:</label>
                        <select 
                          value={riskArea}
                          onChange={(e) => setRiskArea(e.target.value)}
                          className="w-full bg-black/60 border border-white/10 rounded-xl py-3 px-4 text-white text-sm focus:ring-2 focus:ring-amber-500 focus:outline-none"
                        >
                          <option value="Puerto Nuevo Centro">Puerto Nuevo Centro / Casco Urbano</option>
                          <option value="Cruce Ruta T-75 (La Unión-Puerto Nuevo)">Cruce Ruta T-75 (Hacia La Unión)</option>
                          <option value="Sectores Agrícolas Interiores">Sectores Agrícolas Interiores / Fundo Los Alerces</option>
                          <option value="Rivera del Lago Ranco (Zonas de Camping)">Rivera del Lago Ranco (Zonas de Interface Forestal)</option>
                          <option value="Sectores Rurales Forestales Limítrofes">Sectores Forestales Limítrofes / Plantaciones</option>
                        </select>
                      </div>
                      <div className="flex items-end">
                        <button
                          onClick={handleAnalyzeRisk}
                          disabled={isRiskLoading}
                          className="w-full bg-amber-500 hover:bg-amber-600 text-black font-bold py-3 px-4 rounded-xl text-sm transition-all flex items-center justify-center space-x-2"
                        >
                          {isRiskLoading ? (
                            <>
                              <RefreshCw className="w-4 h-4 animate-spin" />
                              <span>Analizando Entorno...</span>
                            </>
                          ) : (
                            <>
                              <Brain className="w-4 h-4" />
                              <span>Generar Diagnóstico</span>
                            </>
                          )}
                        </button>
                      </div>
                    </div>
                  </div>

                  {/* Diagnosis Result */}
                  <div className="bg-black/40 border border-white/5 rounded-2xl p-5 mt-6 flex-grow overflow-y-auto max-h-[250px] scrollbar-thin scrollbar-thumb-amber-500">
                    {riskResponse ? (
                      <div className="space-y-4 text-sm text-gray-200 leading-relaxed font-light whitespace-pre-line">
                        {riskResponse}
                        
                        {/* Grounding Attribution sources */}
                        {riskSources.length > 0 && (
                          <div className="mt-4 pt-4 border-t border-white/5">
                            <span className="block text-[10px] font-bold text-amber-500 mb-1.5 uppercase tracking-wider">Fuentes e Informes Consultados:</span>
                            <div className="flex flex-wrap gap-2">
                              {riskSources.map((source, index) => (
                                <a 
                                  key={index}
                                  href={source.uri}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  className="text-[10px] bg-white/5 hover:bg-white/10 text-gray-300 px-2 py-1 rounded border border-white/5 truncate max-w-[200px]"
                                >
                                  {source.title || "Fuente CONAF / SENAPRED"} ↗
                                </a>
                              ))}
                            </div>
                          </div>
                        )}
                      </div>
                    ) : (
                      <div className="h-full flex flex-col items-center justify-center text-center text-gray-500 py-10 space-y-2">
                        <Info className="w-8 h-8 text-amber-500/40" />
                        <span className="text-xs">Presiona "Generar Diagnóstico" para evaluar amenazas de interfaz forestal en vivo.</span>
                      </div>
                    )}
                  </div>
                </div>
              )}

              {/* TAB 2: GENERAR PLAN FAMILIAR */}
              {aiActiveTab === 'plan' && (
                <div className="space-y-6 flex-grow flex flex-col justify-between">
                  <div className="space-y-4">
                    <h4 className="text-lg font-bold text-white flex items-center gap-2">
                      <FileText className="w-5 h-5 text-amber-500" />
                      <span>Generador Inteligente de Planes Familiares de Evacuación</span>
                    </h4>
                    
                    <div className="grid sm:grid-cols-2 gap-4 text-xs">
                      <div>
                        <label className="block text-gray-400 mb-1 font-semibold">Ubicación / Entorno de tu Hogar:</label>
                        <select 
                          value={planLocation} 
                          onChange={(e) => setPlanLocation(e.target.value)}
                          className="w-full bg-black/60 border border-white/10 rounded-xl py-2 px-3 text-white text-sm focus:ring-2 focus:ring-amber-500 focus:outline-none"
                        >
                          <option value="Cercano al Lago Ranco / Costanera">Cercano al Lago Ranco / Costanera</option>
                          <option value="Sector Alto de Puerto Nuevo (Sectores Secanos)">Sector Alto de Puerto Nuevo (Secanos)</option>
                          <option value="Ruta principal T-75 (Cercano a Carretera)">Ruta T-75 (Línea de evacuación rápida)</option>
                          <option value="Callejón Interior sin salida pavimentada">Callejón Interior Rural (Aislamiento potencial)</option>
                        </select>
                      </div>

                      <div>
                        <label className="block text-gray-400 mb-1 font-semibold">Adultos en Casa:</label>
                        <input 
                          type="number" 
                          min="1" 
                          max="10" 
                          value={planAdults} 
                          onChange={(e) => setPlanAdults(e.target.value)}
                          className="w-full bg-black/60 border border-white/10 rounded-xl py-2 px-3 text-white text-sm focus:ring-2 focus:ring-amber-500 focus:outline-none"
                        />
                      </div>

                      <div>
                        <label className="block text-gray-400 mb-1 font-semibold">Niños en Casa:</label>
                        <input 
                          type="number" 
                          min="0" 
                          max="10" 
                          value={planChildren} 
                          onChange={(e) => setPlanChildren(e.target.value)}
                          className="w-full bg-black/60 border border-white/10 rounded-xl py-2 px-3 text-white text-sm focus:ring-2 focus:ring-amber-500 focus:outline-none"
                        />
                      </div>

                      <div>
                        <label className="block text-gray-400 mb-1 font-semibold">¿Personas con Movilidad Reducida o Adultos Mayores?</label>
                        <select 
                          value={planVulnerable} 
                          onChange={(e) => setPlanVulnerable(e.target.value)}
                          className="w-full bg-black/60 border border-white/10 rounded-xl py-2 px-3 text-white text-sm focus:ring-2 focus:ring-amber-500 focus:outline-none"
                        >
                          <option value="No">No</option>
                          <option value="Sí, 1 persona con movilidad reducida">Sí, 1 persona</option>
                          <option value="Sí, más de una persona">Sí, más de una persona</option>
                          <option value="Sí, adultos mayores que requieren asistencia">Sí, adultos mayores</option>
                        </select>
                      </div>

                      <div>
                        <label className="block text-gray-400 mb-1 font-semibold">Fuente de Agua Inmediata en Predio:</label>
                        <select 
                          value={planWaterSource} 
                          onChange={(e) => setPlanWaterSource(e.target.value)}
                          className="w-full bg-black/60 border border-white/10 rounded-xl py-2 px-3 text-white text-sm focus:ring-2 focus:ring-amber-500 focus:outline-none"
                        >
                          <option value="Agua Potable Rural (APR)">Agua Potable Rural (APR)</option>
                          <option value="Pozo Profundo / Noria">Pozo Profundo / Noria</option>
                          <option value="Estanque de reserva externo">Estanque de reserva externo</option>
                          <option value="Estero / Canal / Río colindante">Estero / Canal / Río colindante</option>
                        </select>
                      </div>

                      <div>
                        <label className="block text-gray-400 mb-1 font-semibold">Principal Amenaza en Entorno:</label>
                        <select 
                          value={planHazards} 
                          onChange={(e) => setPlanHazards(e.target.value)}
                          className="w-full bg-black/60 border border-white/10 rounded-xl py-2 px-3 text-white text-sm focus:ring-2 focus:ring-amber-500 focus:outline-none"
                        >
                          <option value="Arbolado forestal denso / Pastizales secos">Arbolado forestal / Pastizales secos</option>
                          <option value="Cables eléctricos aéreos cercanos a ramas">Líneas eléctricas expuestas</option>
                          <option value="Acopio de leña húmeda/seca pegado a muros">Acopio de leña cerca de la casa</option>
                          <option value="Falta de accesos pavimentados para carros de bomberos">Caminos estrechos de tierra</option>
                        </select>
                      </div>
                    </div>

                    <button
                      onClick={handleGeneratePlan}
                      disabled={isPlanLoading}
                      className="w-full mt-4 bg-gradient-to-r from-amber-500 to-[#C9A227] hover:from-amber-600 hover:to-yellow-600 text-black font-bold py-3 px-4 rounded-xl text-sm transition-all flex items-center justify-center space-x-2 shadow-lg"
                    >
                      {isPlanLoading ? (
                        <>
                          <RefreshCw className="w-4 h-4 animate-spin" />
                          <span>Estructurando Plan Familiar...</span>
                        </>
                      ) : (
                        <>
                          <Brain className="w-4 h-4" />
                          <span>Crear Plan de Evacuación Personalizado</span>
                        </>
                      )}
                    </button>
                  </div>

                  <div className="bg-black/40 border border-white/5 rounded-2xl p-5 mt-6 flex-grow overflow-y-auto max-h-[200px] scrollbar-thin scrollbar-thumb-amber-500">
                    {generatedPlan ? (
                      <div className="space-y-4 text-xs text-gray-200 leading-relaxed font-light whitespace-pre-line text-left">
                        {generatedPlan}
                      </div>
                    ) : (
                      <div className="h-full flex flex-col items-center justify-center text-center text-gray-500 py-8 space-y-2">
                        <FileText className="w-8 h-8 text-amber-500/40" />
                        <span className="text-xs">Llena tus datos y presiona el botón para recibir un protocolo de seguridad personalizado imprimible.</span>
                      </div>
                    )}
                  </div>
                </div>
              )}

              {/* TAB 3: EVALUACIÓN ADMISIÓN */}
              {aiActiveTab === 'screen' && (
                <div className="space-y-6 flex-grow flex flex-col justify-between">
                  <div className="space-y-4">
                    <h4 className="text-lg font-bold text-white flex items-center gap-2">
                      <Users className="w-5 h-5 text-amber-500" />
                      <span>Evaluación Previa de Requisitos de Admisión</span>
                    </h4>
                    <p className="text-xs text-gray-300">
                      ¿Tienes interés en postular a la Sexta Compañía? Completa el pre-calificador rápido basado en la normativa nacional de Bomberos de Chile.
                    </p>

                    <div className="grid sm:grid-cols-2 gap-4 text-xs">
                      <div>
                        <label className="block text-gray-400 mb-1 font-semibold">Rango de Edad:</label>
                        <select 
                          value={screenAge} 
                          onChange={(e) => setScreenAge(e.target.value)}
                          className="w-full bg-black/60 border border-white/10 rounded-xl py-2 px-3 text-white text-sm focus:ring-2 focus:ring-amber-500 focus:outline-none"
                        >
                          <option value="Menor de 18">Menor de 18 años (Brigada Juvenil)</option>
                          <option value="18-35">18 a 35 años (Apto para Guardia Directa)</option>
                          <option value="36-50">36 a 50 años (Apto con acondicionamiento)</option>
                          <option value="Mayor de 50">Mayor de 50 años (Especialidades de Soporte)</option>
                        </select>
                      </div>

                      <div>
                        <label className="block text-gray-400 mb-1 font-semibold">Residencia actual / Trabajo:</label>
                        <select 
                          value={screenResidence} 
                          onChange={(e) => setScreenResidence(e.target.value)}
                          className="w-full bg-black/60 border border-white/10 rounded-xl py-2 px-3 text-white text-sm focus:ring-2 focus:ring-amber-500 focus:outline-none"
                        >
                          <option value="Puerto Nuevo">Puerto Nuevo (Urbano / Interior)</option>
                          <option value="Comuna de La Unión Centro">La Unión Centro</option>
                          <option value="Río Bueno">Río Bueno</option>
                          <option value="Lago Ranco">Lago Ranco</option>
                          <option value="Otra localidad lejana">Otra región / Comuna lejana</option>
                        </select>
                      </div>

                      <div>
                        <label className="block text-gray-400 mb-1 font-semibold">Disponibilidad de Guardia:</label>
                        <select 
                          value={screenAvailability} 
                          onChange={(e) => setScreenAvailability(e.target.value)}
                          className="w-full bg-black/60 border border-white/10 rounded-xl py-2 px-3 text-white text-sm focus:ring-2 focus:ring-amber-500 focus:outline-none"
                        >
                          <option value="Noches y fines de semana">Noches y fines de semana</option>
                          <option value="Horario de oficina (Día)">Horario laboral diurno (Lunes a Viernes)</option>
                          <option value="Rotativo / Turnos de minería o salud">Rotativo / Faena / Turnos clínicos</option>
                          <option value="Muy limitada / Solo emergencias mayores">Muy limitada (Sujeto a confirmación)</option>
                        </select>
                      </div>

                      <div>
                        <label className="block text-gray-400 mb-1 font-semibold">Condición Física Autodeclarada:</label>
                        <select 
                          value={screenHealth} 
                          onChange={(e) => setScreenHealth(e.target.value)}
                          className="w-full bg-black/60 border border-white/10 rounded-xl py-2 px-3 text-white text-sm focus:ring-2 focus:ring-amber-500 focus:outline-none"
                        >
                          <option value="Buena condición física">Buena / Activo físicamente</option>
                          <option value="Regular, requiere entrenamiento">Regular, requiere acondicionamiento</option>
                          <option value="Limitación física menor / Operativo técnico">Limitación física (Apto para roles administrativos)</option>
                        </select>
                      </div>
                    </div>

                    <button
                      onClick={handleRunScreener}
                      disabled={isScreenerLoading}
                      className="w-full bg-amber-500 hover:bg-amber-600 text-black font-bold py-3 px-4 rounded-xl text-sm transition-all flex items-center justify-center space-x-2"
                    >
                      {isScreenerLoading ? (
                        <>
                          <RefreshCw className="w-4 h-4 animate-spin" />
                          <span>Analizando Perfil Bomberil...</span>
                        </>
                      ) : (
                        <>
                          <Brain className="w-4 h-4" />
                          <span>Evaluar Aptitud de Postulación</span>
                        </>
                      )}
                    </button>
                  </div>

                  <div className="bg-black/40 border border-white/5 rounded-2xl p-5 mt-6 flex-grow overflow-y-auto max-h-[180px] scrollbar-thin scrollbar-thumb-amber-500">
                    {screenerResponse ? (
                      <div className="space-y-4 text-xs text-gray-200 leading-relaxed font-light whitespace-pre-line text-left">
                        {screenerResponse}
                      </div>
                    ) : (
                      <div className="h-full flex flex-col items-center justify-center text-center text-gray-500 py-6 space-y-2">
                        <Users className="w-8 h-8 text-amber-500/40" />
                        <span className="text-xs">Ejecuta el pre-calificador para ver sugerencias y agilizar tu trámite de ingreso oficial.</span>
                      </div>
                    )}
                  </div>
                </div>
              )}

              {/* TAB 4: CONSULTAS DE SEGURIDAD */}
              {aiActiveTab === 'chat' && (
                <div className="space-y-6 flex-grow flex flex-col justify-between">
                  <div className="space-y-4">
                    <h4 className="text-lg font-bold text-white flex items-center gap-2">
                      <MessageSquare className="w-5 h-5 text-amber-500" />
                      <span>Oficial Virtual de Prevención y Seguridad</span>
                    </h4>
                    <p className="text-xs text-gray-300 font-light">
                      Pregunta sobre mantención de chimeneas de leña, el uso correcto de extintores de polvo químico seco (PQS), cómo actuar ante un amago de incendio o qué hacer si ves fuego forestal de interfaz.
                    </p>

                    <div className="flex gap-2">
                      <input
                        type="text"
                        placeholder="Ej. ¿Cómo evito inflamación de mi estufa a leña en invierno?"
                        value={chatInput}
                        onChange={(e) => setChatInput(e.target.value)}
                        onKeyDown={(e) => e.key === 'Enter' && handleGeneralChat()}
                        className="flex-grow bg-black/60 border border-white/10 rounded-xl py-3 px-4 text-white text-sm focus:outline-none focus:ring-2 focus:ring-amber-500"
                      />
                      <button
                        onClick={handleGeneralChat}
                        disabled={isChatLoading}
                        className="bg-amber-500 hover:bg-amber-600 text-black font-bold px-5 rounded-xl transition-all flex items-center justify-center"
                      >
                        {isChatLoading ? <RefreshCw className="w-5 h-5 animate-spin" /> : <Send className="w-5 h-5" />}
                      </button>
                    </div>
                  </div>

                  <div className="bg-black/40 border border-white/5 rounded-2xl p-5 mt-6 flex-grow overflow-y-auto max-h-[220px] scrollbar-thin scrollbar-thumb-amber-500 text-left">
                    {chatResponse ? (
                      <div className="space-y-4 text-sm text-gray-200 leading-relaxed font-light whitespace-pre-line">
                        {chatResponse}

                        {chatSources.length > 0 && (
                          <div className="mt-4 pt-4 border-t border-white/5">
                            <span className="block text-[10px] font-bold text-amber-500 mb-1.5 uppercase tracking-wider font-semibold">Documentación y Enlaces Preventivos:</span>
                            <div className="flex flex-wrap gap-2">
                              {chatSources.map((source, index) => (
                                <a 
                                  key={index}
                                  href={source.uri}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  className="text-[10px] bg-white/5 hover:bg-white/10 text-gray-300 px-2 py-1 rounded border border-white/5 truncate max-w-[200px]"
                                >
                                  {source.title || "Manual de Emergencias Chile"} ↗
                                </a>
                              ))}
                            </div>
                          </div>
                        )}
                      </div>
                    ) : (
                      <div className="h-full flex flex-col items-center justify-center text-center text-gray-500 py-8 space-y-2">
                        <MessageSquare className="w-8 h-8 text-amber-500/40" />
                        <span className="text-xs">Escribe tu consulta de autoprotección arriba y obtén directrices de nivel profesional.</span>
                      </div>
                    )}
                  </div>
                </div>
              )}

            </div>

          </div>

        </div>
      </section>

      {/* OUR IMPACT SECTION (ANIMATED COUNTERS) */}
      <section id="impacto" ref={statsRef} className="py-20 relative overflow-hidden bg-black border-y border-[#C8102E]/20">
        <div className="absolute inset-0 bg-radial-gradient from-[#C8102E]/5 to-transparent pointer-events-none" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          
          <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
            <h2 className="text-xs font-bold tracking-widest text-[#C8102E] uppercase">Nuestro Impacto</h2>
            <p className="text-3xl font-extrabold tracking-tight text-white">Cifras del Servicio a la Comunidad</p>
            <p className="text-gray-400 text-sm max-w-lg mx-auto">
              Cada número representa un rescate exitoso, un hogar a salvo, o un voluntario listo para dar la vida por el prójimo.
            </p>
          </div>

          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
            {STATS.map((stat) => (
              <StatCard key={stat.id} stat={stat} isVisible={statsInView} />
            ))}
          </div>

          <div className="mt-16 bg-[#161616] p-8 rounded-2xl border border-white/5 grid md:grid-cols-3 gap-8 text-center md:text-left">
            <div>
              <div className="text-[#C9A227] text-xl font-bold mb-2">Compromiso Rural</div>
              <p className="text-sm text-gray-400">Protegemos a los agricultores, familias vulnerables, y escuelas rurales apartadas con el mismo celo que el centro urbano.</p>
            </div>
            <div className="border-t md:border-t-0 md:border-x border-white/10 pt-6 md:pt-0 md:px-8">
              <div className="text-[#C8102E] text-xl font-bold mb-2">100% Voluntarios</div>
              <p className="text-sm text-gray-400">Ningún bombero de nuestra compañía recibe remuneración económica. Servimos únicamente por amor y deber cívico.</p>
            </div>
            <div className="border-t md:border-t-0 pt-6 md:pt-0">
              <div className="text-[#C9A227] text-xl font-bold mb-2">Sinergia con La Unión</div>
              <p className="text-sm text-gray-400">Formamos parte activa del Cuerpo de Bomberos de La Unión, potenciando la red regional de emergencias complejas.</p>
            </div>
          </div>

        </div>

      </section>

      {/* MODERN GALLERY WITH CATEGORY FILTERS */}
      <section id="galeria" ref={galleryRef} className="py-24 relative overflow-hidden bg-gradient-to-b from-[#111111] to-[#161616]">
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="text-center max-w-3xl mx-auto mb-12 space-y-4">
            <h2 className="text-xs font-bold tracking-widest text-[#C8102E] uppercase">Galería Institucional</h2>
            <p className="text-3xl sm:text-4xl font-extrabold tracking-tight text-white">Nuestras Unidades, Labor y Comunidad</p>
            <div className="w-16 h-1 bg-[#C8102E] mx-auto rounded-full" />
            <p className="text-gray-300 text-sm">
              Conoce nuestro material mayor, entrenamientos, simulacros e intervenciones comunitarias en la zona de Puerto Nuevo.
            </p>
          </div>

          {/* Filter Tabs */}
          <div className="flex flex-wrap justify-center gap-2 mb-10">
            {GALLERY_CATEGORIES.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedGalleryCategory(cat)}
                className={`px-4 py-2 text-xs sm:text-sm font-bold tracking-wider rounded-lg transition-all ${selectedGalleryCategory === cat ? 'bg-[#C8102E] text-white shadow-lg shadow-red-600/20' : 'bg-[#1c1c1c] text-gray-400 hover:text-white hover:bg-gray-800'}`}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Gallery Grid */}
          <div className={`grid sm:grid-cols-2 lg:grid-cols-3 gap-6 transition-all duration-1000 transform ${galleryInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
            {filteredGallery.map((item, idx) => (
              <div 
                key={idx} 
                className="group relative rounded-xl overflow-hidden shadow-xl border border-white/5 bg-black aspect-video sm:aspect-square flex flex-col justify-end"
              >
                <img 
                  src={item.img} 
                  alt={item.title} 
                  className="absolute inset-0 w-full h-full object-cover object-center group-hover:scale-110 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent opacity-80" />
                
                {/* Text overlay contents */}
                <div className="relative p-6 z-10 transform translate-y-3 group-hover:translate-y-0 transition-transform duration-300">
                  <span className="bg-[#C8102E]/90 text-white font-bold text-[10px] tracking-widest uppercase px-2.5 py-1 rounded mb-2.5 inline-block">
                    {item.category}
                  </span>
                  <h4 className="text-lg font-bold text-white tracking-tight">{item.title}</h4>
                  <p className="text-xs text-gray-300 mt-1 opacity-0 group-hover:opacity-100 transition-opacity duration-300 leading-relaxed font-light">
                    {item.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>

        </div>

      </section>

      {/* DONATIONS INTERACTIVE CALCULATOR SECTION */}
      <section id="donaciones" ref={donationsRef} className="py-24 relative overflow-hidden bg-black">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-red-600/5 rounded-full blur-[180px] pointer-events-none" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          
          <div className="grid lg:grid-cols-12 gap-12 items-center">
            
            {/* Context Columns */}
            <div className="lg:col-span-6 space-y-6">
              <span className="text-xs font-bold tracking-widest text-[#C9A227] uppercase block">Colabora con Nosotros</span>
              <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-white leading-tight">Tu Aporte es la Fuerza que Protege a Puerto Nuevo</h2>
              <p className="text-gray-300 font-light leading-relaxed">
                El material mayor, uniformes certificados de alta resistencia, combustibles para los vehículos de emergencia y la mantención técnica del cuartel requieren financiamiento continuo. Cada aporte de la comunidad o empresas se traduce directamente en vidas salvadas y mejor equipamiento para nuestros voluntarios.
              </p>

              {/* Security banner */}
              <div className="bg-emerald-950/20 border border-emerald-500/30 p-4 rounded-xl flex items-start space-x-3">
                <CheckCircle className="w-5 h-5 text-emerald-500 flex-shrink-0 mt-0.5" />
                <div>
                  <h4 className="text-sm font-bold text-white">Transparencia y Seguridad Garantizada</h4>
                  <p className="text-xs text-gray-400 mt-0.5">Todas las transacciones se realizan directamente a la cuenta corriente del Cuerpo de Bomberos de La Unión, asignados formalmente a la Sexta Compañía.</p>
                </div>
              </div>
            </div>

            {/* Donation Selector Box */}
            <div className="lg:col-span-6">
              
              <div className="bg-[#1c1c1c] rounded-2xl p-6 sm:p-8 border border-white/5 shadow-2xl">
                
                  <form onSubmit={handleDonationSubmit} className="space-y-6">
                    <div>
                      <h3 className="text-xl font-bold text-white mb-1">Calculadora de Impacto de tu Donación</h3>
                      <p className="text-xs text-gray-400">Selecciona o ingresa un monto para ver en qué se utiliza el dinero.</p>
                    </div>

                    {/* Pre-selected Tier Grid */}
                    <div className="grid grid-cols-2 gap-3">
                      {DONATION_TIERS.map((tier) => (
                        <button
                          type="button"
                          key={tier.amount}
                          onClick={() => {
                            setSelectedDonation(tier.amount);
                            setCustomDonation('');
                          }}
                          className={`p-4 rounded-xl text-left border transition-all ${selectedDonation === tier.amount && !customDonation ? 'border-[#C8102E] bg-[#C8102E]/10' : 'border-white/5 bg-black/40 hover:bg-black/80'}`}
                        >
                          <span className="block text-lg font-black text-white">${tier.amount.toLocaleString()} CLP</span>
                          <span className="block text-[10px] text-gray-400 uppercase tracking-wider font-bold mt-1">Donación sugerida</span>
                        </button>
                      ))}
                    </div>

                    {/* Custom Input */}
                    <div>
                      <label className="block text-xs font-bold text-gray-400 uppercase tracking-widest mb-2">Ingresar otro monto (CLP)</label>
                      <div className="relative">
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-gray-400">
                          <DollarSign className="w-5 h-5" />
                        </div>
                        <input
                          type="number"
                          placeholder="Monto personalizado"
                          value={customDonation}
                          onChange={(e) => {
                            setCustomDonation(e.target.value);
                            setSelectedDonation(Number(e.target.value));
                          }}
                          className="bg-black/60 border border-white/10 rounded-xl py-3 pl-10 pr-4 w-full focus:outline-none focus:ring-2 focus:ring-[#C8102E] focus:border-transparent text-white placeholder-gray-600"
                        />
                      </div>
                    </div>

                    {/* Dynamic Impact Display Card */}
                    <div className="bg-[#C8102E]/5 border-l-4 border-[#C8102E] p-4 rounded-r-xl">
                      <span className="block text-xs uppercase tracking-widest text-[#C8102E] font-bold">Destino del Aporte:</span>
                      <p className="text-sm text-gray-300 font-medium mt-1">
                        {customDonation ? `Tu aporte personalizado de $${Number(customDonation).toLocaleString()} CLP se acumulará al fondo común de equipamiento técnico y mantención de carros.` : DONATION_TIERS.find(t => t.amount === selectedDonation)?.description}
                      </p>
                      <span className="block text-xs text-[#C9A227] font-semibold mt-2">
                        Impacto: {customDonation ? "Adquisición de herramientas de rescate" : DONATION_TIERS.find(t => t.amount === selectedDonation)?.benefit}
                      </span>
                    </div>

                    {/* Submit CTA */}
                    <button
                      type="submit"
                      className="w-full bg-[#C8102E] hover:bg-red-700 text-white font-bold py-3.5 rounded-xl transition-all shadow-lg shadow-red-600/20 hover:shadow-red-600/40 flex items-center justify-center space-x-2"
                    >
                      <Heart className="w-5 h-5 fill-current" />
                      <span>Proceder a Donar ${Number(customDonation || selectedDonation).toLocaleString()} CLP</span>
                    </button>

                  </form>

              </div>

            </div>

          </div>

        </div>

      </section>

      {/* TESTIMONIALS SLIDER SECTION */}
      <section id="testimonios" className="py-24 relative overflow-hidden bg-gradient-to-b from-[#161616] to-[#111111]">
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
            <h2 className="text-xs font-bold tracking-widest text-[#C8102E] uppercase">Nuestra Comunidad Opina</h2>
            <p className="text-3xl sm:text-4xl font-extrabold tracking-tight text-white">Testimonios de Gratitud y Respaldo</p>
            <div className="w-16 h-1 bg-[#C8102E] mx-auto rounded-full" />
          </div>

          <div className="max-w-4xl mx-auto relative">
            
            {/* Main Testimonial Card */}
            <div className="bg-[#1c1c1c] border border-white/5 p-8 sm:p-12 rounded-3xl relative overflow-hidden min-h-[250px] flex flex-col justify-between">
              
              {/* Quote marks background */}
              <div className="absolute right-8 top-8 text-white/5 text-9xl font-serif pointer-events-none select-none">“</div>
              
              <div className="space-y-6">
                <div className="flex items-center space-x-1 text-[#C9A227]">
                  {[1, 2, 3, 4, 5].map((s) => (
                    <span key={s}>★</span>
                  ))}
                </div>
                <p className="text-lg sm:text-xl text-gray-200 italic leading-relaxed font-light">
                  "{TESTIMONIALS[currentTestimonial].quote}"
                </p>
              </div>

              <div className="mt-8 pt-6 border-t border-white/5 flex items-center justify-between">
                <div>
                  <h4 className="text-base font-bold text-white">{TESTIMONIALS[currentTestimonial].name}</h4>
                  <p className="text-xs text-[#C9A227]">{TESTIMONIALS[currentTestimonial].role}</p>
                </div>

                {/* Slider Controls */}
                <div className="flex items-center space-x-2">
                  <button
                    onClick={() => setCurrentTestimonial(prev => prev === 0 ? TESTIMONIALS.length - 1 : prev - 1)}
                    className="p-2 bg-black/40 hover:bg-black/80 rounded-lg text-white border border-white/5"
                  >
                    <ChevronLeft className="w-5 h-5" />
                  </button>
                  <button
                    onClick={() => setCurrentTestimonial(prev => prev === TESTIMONIALS.length - 1 ? 0 : prev + 1)}
                    className="p-2 bg-black/40 hover:bg-black/80 rounded-lg text-white border border-white/5"
                  >
                    <ChevronRight className="w-5 h-5" />
                  </button>
                </div>
              </div>

            </div>

            {/* Pagination Indicators */}
            <div className="flex justify-center space-x-2 mt-6">
              {TESTIMONIALS.map((_, idx) => (
                <button
                  key={idx}
                  onClick={() => setCurrentTestimonial(idx)}
                  className={`h-2.5 rounded-full transition-all ${currentTestimonial === idx ? 'w-8 bg-[#C8102E]' : 'w-2.5 bg-gray-600'}`}
                />
              ))}
            </div>

          </div>

        </div>

      </section>

      {/* HAZTE VOLUNTARIO SECTION */}
      <section id="voluntarios" ref={volunteerRef} className="py-24 relative overflow-hidden bg-[#111111]">
        
        {/* Visual background element */}
        <div className="absolute inset-0 z-0">
          <img 
            src={IMAGES.volunteerBg} 
            alt="Capacitación Bomberos" 
            className="w-full h-full object-cover object-center opacity-10"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-[#111111] via-[#111111]/90 to-[#111111]" />
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          
          <div className="grid lg:grid-cols-12 gap-12 items-center">
            
            {/* Informational Column */}
            <div className={`lg:col-span-5 space-y-6 transition-all duration-1000 transform ${volunteerInView ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-10'}`}>
              <span className="text-xs font-bold tracking-widest text-[#C8102E] uppercase block">Se parte de la Sexta</span>
              <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-white leading-tight">¿Estás listo para responder al llamado del deber?</h2>
              <p className="text-gray-300 leading-relaxed font-light">
                Buscamos hombres y mujeres comprometidos, con vocación de servicio y espíritu colaborativo, que deseen proteger y servir a la comunidad de Puerto Nuevo y la comuna de La Unión. No necesitas experiencia previa, nosotros te entregaremos todo el entrenamiento y equipo certificado.
              </p>

              <div className="space-y-4 pt-4">
                <h3 className="text-lg font-bold text-white">Requisitos de Postulación:</h3>
                <ul className="space-y-2">
                  <li className="flex items-center space-x-2 text-sm text-gray-300">
                    <CheckCircle className="w-4 h-4 text-[#C9A227] flex-shrink-0" />
                    <span>Tener mínimo 18 años de edad cumplidos.</span>
                  </li>
                  <li className="flex items-center space-x-2 text-sm text-gray-300">
                    <CheckCircle className="w-4 h-4 text-[#C9A227] flex-shrink-0" />
                    <span>Salud compatible con el servicio y la actividad física.</span>
                  </li>
                  <li className="flex items-center space-x-2 text-sm text-gray-300">
                    <CheckCircle className="w-4 h-4 text-[#C9A227] flex-shrink-0" />
                    <span>Residir o trabajar en Puerto Nuevo o comunas aledañas.</span>
                  </li>
                  <li className="flex items-center space-x-2 text-sm text-gray-300">
                    <CheckCircle className="w-4 h-4 text-[#C9A227] flex-shrink-0" />
                    <span>Sin antecedentes penales (Certificado de Antecedentes).</span>
                  </li>
                </ul>
              </div>

              {/* Training info card */}
              <div className="bg-black/60 border border-white/5 p-4 rounded-xl flex items-start space-x-3">
                <Award className="w-5 h-5 text-[#C8102E] flex-shrink-0 mt-0.5" />
                <p className="text-xs text-gray-400">
                  La formación inicial dura aproximadamente 6 meses e incluye cursos obligatorios de Primap, Extinción, Ventilación, Entrada Forzada y Rescate Vehicular.
                </p>
              </div>

            </div>

            {/* Application Form Box */}
            <div className="lg:col-span-7">
              
              <div className="bg-[#1c1c1c] border border-white/5 rounded-3xl p-6 sm:p-10 shadow-2xl relative">
                
                {volunteerSuccess ? (
                  <div className="text-center py-12 space-y-4">
                    <div className="w-16 h-16 bg-green-900/30 border border-green-500 rounded-full flex items-center justify-center mx-auto text-green-500 text-3xl">
                      ✓
                    </div>
                    <h3 className="text-2xl font-bold text-white">¡Postulación Enviada con Éxito!</h3>
                    <p className="text-sm text-gray-300 max-w-md mx-auto">
                      Agradecemos profundamente tu interés en formar parte de la Sexta Compañía. El Oficial de Reclutamiento revisará tus antecedentes y se pondrá en contacto contigo en los próximos días para iniciar el proceso de entrevista.
                    </p>
                  </div>
                ) : (
                  <form
                    name="postulacion"
                    method="POST"
                    data-netlify="true"
                    onSubmit={handleVolunteerSubmit}
                    className="space-y-6"
                  >
                    <input type="hidden" name="form-name" value="postulacion" />
                    <div>
                      <h3 className="text-xl font-bold text-white">Formulario de Postulación</h3>
                      <p className="text-xs text-gray-400 mt-1">Completa tus datos para agendar una entrevista con la comandancia de Puerto Nuevo.</p>
                    </div>

                    <div className="grid sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-xs font-bold text-gray-400 uppercase tracking-widest mb-2">Nombre Completo *</label>
                        <input
                          type="text"
                          name="nombre"
                          required
                          value={volunteerName}
                          onChange={(e) => setVolunteerName(e.target.value)}
                          placeholder="Juan Pérez"
                          className="w-full bg-black/40 border border-white/10 rounded-xl py-3 px-4 text-white placeholder-gray-600 focus:outline-none focus:ring-2 focus:ring-[#C8102E]"
                        />
                      </div>
                      <div>
                        <label className="block text-xs font-bold text-gray-400 uppercase tracking-widest mb-2">Edad (Años) *</label>
                        <input
                          type="number"
                          name="edad"
                          required
                          min="18"
                          max="80"
                          value={volunteerAge}
                          onChange={(e) => setVolunteerAge(e.target.value)}
                          placeholder="25"
                          className="w-full bg-black/40 border border-white/10 rounded-xl py-3 px-4 text-white placeholder-gray-600 focus:outline-none focus:ring-2 focus:ring-[#C8102E]"
                        />
                      </div>
                    </div>

                    <div className="grid sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-xs font-bold text-gray-400 uppercase tracking-widest mb-2">Correo Electrónico *</label>
                        <input
                          type="email"
                          name="correo"
                          required
                          value={volunteerEmail}
                          onChange={(e) => setVolunteerEmail(e.target.value)}
                          placeholder="juan@correo.com"
                          className="w-full bg-black/40 border border-white/10 rounded-xl py-3 px-4 text-white placeholder-gray-600 focus:outline-none focus:ring-2 focus:ring-[#C8102E]"
                        />
                      </div>
                      <div>
                        <label className="block text-xs font-bold text-gray-400 uppercase tracking-widest mb-2">Teléfono de Contacto *</label>
                        <input
                          type="tel"
                          name="telefono"
                          required
                          value={volunteerPhone}
                          onChange={(e) => setVolunteerPhone(e.target.value)}
                          placeholder="+56 9 1234 5678"
                          className="w-full bg-black/40 border border-white/10 rounded-xl py-3 px-4 text-white placeholder-gray-600 focus:outline-none focus:ring-2 focus:ring-[#C8102E]"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-gray-400 uppercase tracking-widest mb-2">¿Tienes experiencia previa en bomberos o emergencias?</label>
                      <select
                        name="experiencia"
                        value={volunteerExp}
                        onChange={(e) => setVolunteerExp(e.target.value)}
                        className="w-full bg-black/40 border border-white/10 rounded-xl py-3 px-4 text-white focus:outline-none focus:ring-2 focus:ring-[#C8102E]"
                      >
                        <option value="no" className="bg-[#111]">No tengo experiencia previa</option>
                        <option value="yes_brigadier" className="bg-[#111]">Sí, fui brigadier juvenil</option>
                        <option value="yes_bombero" className="bg-[#111]">Sí, fui voluntario en otra compañía</option>
                        <option value="yes_medical" className="bg-[#111]">Sí, área de la salud/militar/rescate</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-gray-400 uppercase tracking-widest mb-2">Cuéntanos sobre tu motivación (Opcional)</label>
                      <textarea
                        name="motivacion"
                        rows="3"
                        value={volunteerMessage}
                        onChange={(e) => setVolunteerMessage(e.target.value)}
                        placeholder="Quiero unirme para servir a mi comunidad rural y aprender técnicas de rescate..."
                        className="w-full bg-black/40 border border-white/10 rounded-xl py-3 px-4 text-white placeholder-gray-600 focus:outline-none focus:ring-2 focus:ring-[#C8102E]"
                      />
                    </div>

                    <button
                      type="submit"
                      className="w-full bg-[#C8102E] hover:bg-red-700 text-white font-bold py-3.5 rounded-xl transition-all shadow-lg shadow-red-600/20 hover:shadow-red-600/40 flex items-center justify-center space-x-2"
                    >
                      <Shield className="w-5 h-5" />
                      <span>Enviar Solicitud de Postulación</span>
                    </button>

                  </form>
                )}

              </div>

            </div>

          </div>

        </div>

      </section>

      {/* CONTACT SECTION */}
      <section id="contacto" className="py-24 relative overflow-hidden bg-gradient-to-b from-[#111111] to-[#161616]">
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
            <h2 className="text-xs font-bold tracking-widest text-[#C9A227] uppercase">Contacto e Informaciones</h2>
            <p className="text-3xl sm:text-4xl font-extrabold tracking-tight text-white">Comunícate con Nuestro Cuartel</p>
            <div className="w-16 h-1 bg-[#C9A227] mx-auto rounded-full" />
            <p className="text-gray-300">
              ¿Deseas programar una capacitación escolar, solicitar asesorías preventivas o hacernos llegar tus dudas? Estamos a tu servicio.
            </p>
          </div>

          <div className="grid lg:grid-cols-12 gap-12">
            
            {/* Contact Details & Map */}
            <div className="lg:col-span-5 space-y-8">
              
              <div className="space-y-6">
                
                {/* Emergency Contact banner */}
                <div className="p-4 bg-red-950/30 border border-red-500/40 rounded-xl flex items-center space-x-4">
                  <div className="w-12 h-12 bg-red-600 rounded-xl flex items-center justify-center text-white text-xl animate-pulse">
                    🚨
                  </div>
                  <div>
                    <h4 className="text-sm font-bold text-white uppercase tracking-wider">¿EMERGENCIA EN CURSO?</h4>
                    <p className="text-xs text-gray-300">Marca directo al 132 de inmediato. Centraliza la llamada en el Cuerpo de Bomberos.</p>
                  </div>
                </div>

                {/* Normal communications block */}
                <div className="space-y-4">
                  <div className="flex items-start space-x-4">
                    <div className="p-2 bg-black/40 rounded-lg text-[#C8102E] mt-1 border border-white/5">
                      <MapPin className="w-5 h-5" />
                    </div>
                    <div>
                      <h4 className="text-sm font-bold text-white">Ubicación del Cuartel</h4>
                      <p className="text-xs text-gray-400 mt-1">Sexta Compañía, Avenida Principal S/N, Puerto Nuevo, Comuna de La Unión, Región de Los Ríos, Chile.</p>
                    </div>
                  </div>

                  <div className="flex items-start space-x-4">
                    <div className="p-2 bg-black/40 rounded-lg text-[#C8102E] mt-1 border border-white/5">
                      <Phone className="w-5 h-5" />
                    </div>
                    <div>
                      <h4 className="text-sm font-bold text-white">Teléfono de Guardia Administrativa</h4>
                      <p className="text-xs text-gray-400 mt-1">+56 63 2 45 67 89 (Sujeto a disponibilidad operativa de guardia)</p>
                    </div>
                  </div>

                  <div className="flex items-start space-x-4">
                    <div className="p-2 bg-black/40 rounded-lg text-[#C8102E] mt-1 border border-white/5">
                      <Mail className="w-5 h-5" />
                    </div>
                    <div>
                      <h4 className="text-sm font-bold text-white">Correo Oficial de Contacto</h4>
                      <p className="text-xs text-gray-400 mt-1">contacto.sexta@bomberoslaunion.cl</p>
                    </div>
                  </div>

                  <div className="flex items-start space-x-4">
                    <div className="p-2 bg-black/40 rounded-lg text-[#C8102E] mt-1 border border-white/5">
                      <Clock className="w-5 h-5" />
                    </div>
                    <div>
                      <h4 className="text-sm font-bold text-white">Horarios de Atención de Cuartel</h4>
                      <p className="text-xs text-gray-400 mt-1">Atención técnica: Lunes a Viernes 09:00 a 18:00 hrs. Guardia activa: 24 horas continuas.</p>
                    </div>
                  </div>
                </div>

              </div>

              {/* Styled Mock Map Container */}
              <div className="relative rounded-2xl overflow-hidden shadow-lg border border-white/5 h-[230px] bg-black/40 flex items-center justify-center">
                <div className="absolute inset-0 opacity-40">
                  <svg width="100%" height="100%" viewBox="0 0 100 100" preserveAspectRatio="none">
                    <path d="M0,20 Q40,40 100,10" fill="none" stroke="#222" strokeWidth="5" />
                    <path d="M0,70 Q50,50 100,80" fill="none" stroke="#222" strokeWidth="6" />
                    <path d="M30,0 C30,40 50,60 50,100" fill="none" stroke="#222" strokeWidth="4" />
                    <circle cx="50" cy="50" r="15" fill="#C8102E" fillOpacity="0.1" />
                  </svg>
                </div>
                
                {/* Map Pins overlay elements */}
                <div className="relative text-center p-6 space-y-2 z-10">
                  <div className="w-12 h-12 rounded-full bg-[#C8102E] border-2 border-[#C9A227] flex items-center justify-center mx-auto shadow-lg text-white">
                    🚒
                  </div>
                  <h4 className="text-sm font-bold text-white tracking-tight">Sexta Compañía "Puerto Nuevo"</h4>
                  <p className="text-[11px] text-gray-400">Lat: -40.2315, Lon: -72.9345 (A pasos del Lago Ranco)</p>
                  <a 
                    href="https://maps.google.com/?q=-40.2315,-72.9345" 
                    target="_blank" 
                    rel="noreferrer" 
                    className="inline-block text-xs font-bold text-[#C9A227] hover:underline"
                  >
                    Abrir en Google Maps ↗
                  </a>
                </div>
              </div>

            </div>

            {/* Contact Form Column */}
            <div className="lg:col-span-7">
              
              <div className="bg-[#1c1c1c] border border-white/5 rounded-3xl p-6 sm:p-10 shadow-2xl relative">
                
                {contactSuccess ? (
                  <div className="text-center py-12 space-y-4">
                    <div className="w-16 h-16 bg-green-900/30 border border-green-500 rounded-full flex items-center justify-center mx-auto text-green-500 text-3xl">
                      ✓
                    </div>
                    <h3 className="text-2xl font-bold text-white">¡Mensaje Recibido!</h3>
                    <p className="text-sm text-gray-300 max-w-md mx-auto">
                      Hemos recibido tus comentarios de forma exitosa. Nos pondremos en contacto contigo a la brevedad mediante el correo provisto.
                    </p>
                  </div>
                ) : (
                  <form
                    name="contacto"
                    method="POST"
                    data-netlify="true"
                    onSubmit={handleContactSubmit}
                    className="space-y-6"
                  >
                    <input type="hidden" name="form-name" value="contacto" />
                    <div>
                      <h3 className="text-xl font-bold text-white">Enviar una Consulta</h3>
                      <p className="text-xs text-gray-400 mt-1">Completa los campos e indica el motivo de tu requerimiento.</p>
                    </div>

                    <div className="grid sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-xs font-bold text-gray-400 uppercase tracking-widest mb-2">Nombre Completo *</label>
                        <input
                          type="text"
                          name="nombre"
                          required
                          value={contactName}
                          onChange={(e) => setContactName(e.target.value)}
                          placeholder="Tu nombre completo"
                          className="w-full bg-black/40 border border-white/10 rounded-xl py-3 px-4 text-white placeholder-gray-600 focus:outline-none focus:ring-2 focus:ring-[#C8102E]"
                        />
                      </div>
                      <div>
                        <label className="block text-xs font-bold text-gray-400 uppercase tracking-widest mb-2">Correo Electrónico *</label>
                        <input
                          type="email"
                          name="correo"
                          required
                          value={contactEmail}
                          onChange={(e) => setContactEmail(e.target.value)}
                          placeholder="tu@correo.com"
                          className="w-full bg-black/40 border border-white/10 rounded-xl py-3 px-4 text-white placeholder-gray-600 focus:outline-none focus:ring-2 focus:ring-[#C8102E]"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-gray-400 uppercase tracking-widest mb-2">Número Telefónico (Opcional)</label>
                      <input
                        type="tel"
                        name="telefono"
                        value={contactPhone}
                        onChange={(e) => setContactPhone(e.target.value)}
                        placeholder="+56 9"
                        className="w-full bg-black/40 border border-white/10 rounded-xl py-3 px-4 text-white placeholder-gray-600 focus:outline-none focus:ring-2 focus:ring-[#C8102E]"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-gray-400 uppercase tracking-widest mb-2">Mensaje / Consulta *</label>
                      <textarea
                        name="mensaje"
                        required
                        rows="4"
                        value={contactMessage}
                        onChange={(e) => setContactMessage(e.target.value)}
                        placeholder="Escribe tu mensaje o solicitud detallada aquí..."
                        className="w-full bg-black/40 border border-white/10 rounded-xl py-3 px-4 text-white placeholder-gray-600 focus:outline-none focus:ring-2 focus:ring-[#C8102E]"
                      />
                    </div>

                    <button
                      type="submit"
                      className="w-full bg-white hover:bg-gray-100 text-[#111] font-bold py-3.5 rounded-xl transition-all shadow-lg flex items-center justify-center space-x-2"
                    >
                      <Send className="w-5 h-5 text-[#C8102E]" />
                      <span>Enviar Mensaje Oficial</span>
                    </button>

                  </form>
                )}

              </div>

            </div>

          </div>

        </div>

      </section>

      {/* FOOTER SECTION */}
      <footer className="bg-black text-gray-400 pt-16 pb-8 border-t border-[#C8102E]/20">
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="grid md:grid-cols-2 lg:grid-cols-12 gap-12 mb-12">
            
            {/* Column 1 - Identity */}
            <div className="lg:col-span-4 space-y-6">
              
              <div className="flex items-center space-x-3">
                <div className="relative flex items-center justify-center w-12 h-12 rounded-full bg-[#C8102E] border border-[#C9A227] shadow-lg">
                  <svg viewBox="0 0 100 100" className="w-8 h-8 fill-current text-white">
                    <path d="M50 5 L60 30 L85 30 L65 48 L75 75 L50 60 L25 75 L35 48 L15 30 L40 30 Z" className="stroke-[#C9A227] stroke-[3px]" />
                    <text x="50" y="58" fontSize="22" fontWeight="bold" textAnchor="middle" fill="#FFFFFF">6</text>
                  </svg>
                </div>
                <div>
                  <span className="block text-sm font-bold tracking-widest text-[#C8102E]">SEXTA COMPAÑÍA</span>
                  <span className="block text-xs font-semibold tracking-wider text-gray-200">PUERTO NUEVO • LA UNIÓN</span>
                </div>
              </div>

              <p className="text-xs text-gray-400 font-light leading-relaxed">
                Institución voluntaria fundada el 6 de Noviembre de 1984, bajo el amparo de la Comandancia del Cuerpo de Bomberos de La Unión, dedicada al combate de incendios y rescate técnico en Puerto Nuevo y alrededores de la Región de Los Ríos, Chile.
              </p>

              {/* Social links simulation */}
              <div className="flex space-x-4">
                <span className="w-8 h-8 rounded-full bg-white/5 hover:bg-white/10 flex items-center justify-center text-white cursor-pointer text-xs font-bold transition-all">FB</span>
                <span className="w-8 h-8 rounded-full bg-white/5 hover:bg-white/10 flex items-center justify-center text-white cursor-pointer text-xs font-bold transition-all">IG</span>
                <span className="w-8 h-8 rounded-full bg-white/5 hover:bg-white/10 flex items-center justify-center text-white cursor-pointer text-xs font-bold transition-all">YT</span>
              </div>

            </div>

            {/* Column 2 - Links */}
            <div className="lg:col-span-3 space-y-4">
              <h4 className="text-sm font-bold text-white uppercase tracking-wider">Enlaces Rápidos</h4>
              <ul className="space-y-2 text-xs">
                <li><button onClick={() => scrollToSection('quienes-somos')} className="hover:text-white transition-colors">¿Quiénes Somos?</button></li>
                <li><button onClick={() => scrollToSection('servicios')} className="hover:text-white transition-colors">Nuestros Servicios</button></li>
                <li><button onClick={() => scrollToSection('inteligencia-ia')} className="hover:text-white transition-colors">Prevención IA</button></li>
                <li><button onClick={() => scrollToSection('impacto')} className="hover:text-white transition-colors">Nuestro Impacto</button></li>
                <li><button onClick={() => scrollToSection('galeria')} className="hover:text-white transition-colors">Galería y Flota</button></li>
                <li><button onClick={() => scrollToSection('voluntarios')} className="hover:text-white transition-colors">Hazte Voluntario</button></li>
                <li><button onClick={() => scrollToSection('donaciones')} className="hover:text-white transition-colors">Canal de Donaciones</button></li>
              </ul>
            </div>

            {/* Column 3 - Coverage Areas */}
            <div className="lg:col-span-3 space-y-4">
              <h4 className="text-sm font-bold text-white uppercase tracking-wider">Zonas de Cobertura</h4>
              <ul className="space-y-2 text-xs font-light">
                <li>• Puerto Nuevo (Urbano & Rural)</li>
                <li>• Sectores Agrícolas & Forestales</li>
                <li>• Ruta de Acceso T-75 y T-85</li>
                <li>• Escuelas Rurales y Postas de Salud</li>
                <li>• Rivera del Lago Ranco (Límite Comunal)</li>
                <li>• Apoyo mutuo con Bomberos La Unión</li>
              </ul>
            </div>

            {/* Column 4 - Transparency */}
            <div className="lg:col-span-2 space-y-4">
              <h4 className="text-sm font-bold text-white uppercase tracking-wider">Transparencia</h4>
              <ul className="space-y-2 text-xs font-light">
                <li>• Memoria Anual</li>
                <li>• Registro de Donaciones</li>
                <li>• Estatuto General</li>
                <li>• Gobierno Transparente</li>
              </ul>
              <div className="pt-2">
                <span className="inline-block bg-[#C9A227]/20 text-[#C9A227] font-bold text-[10px] uppercase tracking-widest px-2 py-1 rounded">
                  Bomberos de Chile
                </span>
              </div>
            </div>

          </div>

          <hr className="border-white/5 my-8" />

          {/* Copyright Metadata */}
          <div className="flex flex-col md:flex-row items-center justify-between gap-4 text-xs font-light">
            <p>
              &copy; {new Date().getFullYear()} Sexta Compañía de Bomberos "Puerto Nuevo". Todos los derechos reservados.
            </p>
            <p className="flex items-center space-x-1">
              <span>Sitio Oficial de Emergencia • La Unión, Región de Los Ríos</span>
            </p>
          </div>

        </div>

      </footer>

      {}

      {/* FLOATING COLLAPSIBLE CO-PILOT ASSISTANT */}
      <div className="fixed bottom-6 right-6 z-50">
        {showFloatingChat ? (
          <div className="bg-[#181818] w-80 sm:w-96 rounded-2xl border border-amber-500/30 shadow-2xl flex flex-col overflow-hidden animate-fadeIn">
            {/* Header */}
            <div className="bg-gradient-to-r from-red-700 via-[#C8102E] to-amber-600 p-4 flex items-center justify-between text-white">
              <div className="flex items-center space-x-2">
                <Brain className="w-5 h-5 text-[#C9A227] animate-pulse" />
                <div>
                  <h4 className="text-xs font-black tracking-wider uppercase">Guardián Virtual</h4>
                  <span className="block text-[9px] text-gray-200">Consultor Preventivo Sexta Cía.</span>
                </div>
              </div>
              <button 
                onClick={() => setShowFloatingChat(false)}
                className="p-1 hover:bg-white/10 rounded transition-colors text-white"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Chat Messages */}
            <div className="p-4 h-64 overflow-y-auto space-y-3 flex flex-col text-xs scrollbar-thin scrollbar-thumb-amber-500/40">
              {floatingMessages.map((msg, index) => (
                <div 
                  key={index} 
                  className={`max-w-[85%] p-3 rounded-xl leading-relaxed ${msg.sender === 'ai' ? 'bg-[#222] text-gray-100 self-start border border-white/5' : 'bg-[#C8102E] text-white self-end'}`}
                >
                  <p className="font-light">{msg.text}</p>
                </div>
              ))}
              {isFloatingLoading && (
                <div className="bg-[#222] text-gray-400 p-3 rounded-xl self-start flex items-center space-x-2 animate-pulse">
                  <RefreshCw className="w-3.5 h-3.5 animate-spin text-amber-500" />
                  <span>Sintonizando frecuencia...</span>
                </div>
              )}
            </div>

            {/* Input Bar */}
            <div className="p-3 border-t border-white/5 bg-[#121212] flex gap-2">
              <input
                type="text"
                placeholder="Pregunta de prevención rural..."
                value={floatingInput}
                onChange={(e) => setFloatingInput(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && handleFloatingSend()}
                className="flex-grow bg-[#222] border border-white/10 rounded-lg px-3 py-2 text-white text-xs focus:outline-none focus:ring-1 focus:ring-amber-500"
              />
              <button
                onClick={handleFloatingSend}
                disabled={isFloatingLoading}
                className="bg-amber-500 hover:bg-amber-600 text-black font-bold p-2 rounded-lg transition-all flex items-center justify-center"
              >
                <Send className="w-4 h-4" />
              </button>
            </div>
            {/* Urgent Warning Label */}
            <div className="bg-red-950/20 text-red-500 py-1.5 text-center text-[9px] font-bold border-t border-white/5 tracking-wider">
              🚨 PARA EMERGENCIAS REALES MARQUE EL 132 DIRECTO
            </div>
          </div>
        ) : (
          <button
            onClick={() => setShowFloatingChat(true)}
            className="bg-gradient-to-r from-red-600 to-amber-500 text-white rounded-full p-4 shadow-2xl shadow-red-600/30 hover:shadow-red-600/50 flex items-center space-x-2 border border-amber-500/40 hover:scale-105 transition-all animate-bounce"
          >
            <Brain className="w-5 h-5 text-yellow-300" />
            <span className="text-xs font-black tracking-wider uppercase hidden sm:inline">Copiloto IA</span>
          </button>
        )}
      </div>

    </div>
  );
}
