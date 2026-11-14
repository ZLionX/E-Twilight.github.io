// ===== CAMBIO DE IDIOMA =====
const languageSelector = document.getElementById('languageSelector');

// Objeto de traducciones
const translations = {
    es: {
        subtitle: "Dulce y letal, como un consuelo que llega tarde",
        search: "Buscar proyectos...",
        "projects-title": "PROYECTOS ACTUALES",
        "donation-text": "APOYAR A E-TWILIGHT",
        "show-more": "Jugar Ahora",
        "gallery-title": "GALERÍA",
        "collab-title": "COMUNIDAD Y COLABORACIÓN",
        "music-title-main": "BANDA SONORA OFICIAL",
        "contact-title": "CONTACTO",
        "contact-text": "¿Quieres contactarnos?",
        "footer": "© 2025 E-Twilight. Todos los derechos reservados.",
        
        // Proyectos
        "project-1-title": "Biblioteca Creativa",
        "project-1-desc": "La biblioteca creativa es el banco de ideas que tiene E-twilight para construir las mejores historias.",
        "project-2-title": "La verdad de la Realidad",
        "project-2-desc": "La Verdad de la Realidad es un proyecto multimedia ambicioso que busca contar una historia seinen de maduración psicológica, donde el verdadero enemigo no está afuera, sino dentro. Su mayor fortaleza es también su mayor debilidad: su capacidad de empatía en un mundo que nunca se la devolvió.",
        "project-3-title": "Encantos Voice Studio",
        "project-3-desc": "Canal de doblaje al español latino de series de anime. Colaboración con talentosos actores de voz de la comunidad.",
        
        // Estados
        "locked": "Bloqueado",
        "unlocked": "Desbloqueado",
        "locked-title-1": "¡Contenido Bloqueado!",
        "locked-msg-1": "No esta disponible por el Momento",
        "locked-title-2": "¡Contenido Bloqueado!",
        "locked-msg-2": "Completa los requisitos para desbloquear este proyecto",
        
        // Modal
        "modal-title": "Realidad sin falsas ilusiones",
        "modal-text": '"La Verdad de la Realidad" sigue a un protagonista atrapado en un ciclo de búsqueda de validación externa, donde cada intento de conexión genuina se convierte en una nueva fuente de dolor.',
        
        // Galería
        "gallery-1": "Biblioteca creativa",
        "gallery-2": "Manga - Realidad sin falsas ilusiones",
        "gallery-3": "???"
    },
    
    en: {
        subtitle: "Sweet and lethal, like comfort that arrives late",
        search: "Search projects...",
        "projects-title": "CURRENT PROJECTS",
        "donation-text": "SUPPORT E-TWILIGHT",
        "show-more": "Play Now",
        "gallery-title": "GALLERY",
        "collab-title": "COMMUNITY & COLLABORATION",
        "music-title-main": "OFFICIAL SOUNDTRACK",
        "contact-title": "CONTACT",
        "contact-text": "Want to contact us?",
        "footer": "© 2025 E-Twilight. All rights reserved.",
        
        // Projects
        "project-1-title": "Creative library",
        "project-1-desc": "The creative library is E-twilight's idea bank for building the best stories.",
        "project-2-title": "The Truth of Reality",
        "project-2-desc": "The Truth of Reality is an ambitious multimedia project that seeks to tell a seinen story of psychological maturation, where the true enemy is not outside, but within. Their greatest strength is also their greatest weakness: their capacity for empathy in a world that never returned it.",
        "project-3-title": "Encantos Voice Studio",
        "project-3-desc": "Spanish dubbing channel for anime series. Collaboration with talented voice actors from the community.",
        
        // States
        "locked": "Locked",
        "unlocked": "Unlocked",
        "locked-title-1": "Content Locked!",
        "locked-msg-1": "Not available at the moment",
        "locked-title-2": "Content Locked!",
        "locked-msg-2": "Complete the requirements to unlock this project",
        
        // Modal
        "modal-title": "Reality without false illusions",
        "modal-text": '"The Truth of Reality" follows a protagonist trapped in a cycle of seeking external validation, where each attempt at genuine connection becomes a new source of pain.',
        
        // Gallery
        "gallery-1": "Creative library",
        "gallery-2": "Manga - Reality without false illusions",
        "gallery-3": "???"
    }
};

// Función para cambiar idioma
function changeLanguage(lang) {
    // Guardar preferencia
    localStorage.setItem('preferredLanguage', lang);
    
    // Cambiar atributo lang del HTML
    document.documentElement.lang = lang;
    
    // Cambiar textos con data-lang
    document.querySelectorAll('[data-lang]').forEach(element => {
        const key = element.getAttribute('data-lang');
        if (translations[lang][key]) {
            element.textContent = translations[lang][key];
        }
    });
    
    // Cambiar placeholders
    document.querySelectorAll('[data-lang-placeholder]').forEach(element => {
        const key = element.getAttribute('data-lang-placeholder');
        if (translations[lang][key]) {
            element.placeholder = translations[lang][key];
        }
    });
    
    // Actualizar donation button (tiene <br>)
    const donationBtn = document.querySelector('.donation-btn');
    if (donationBtn) {
        donationBtn.innerHTML = lang === 'es' ? 'APOYAR A <br> E-TWILIGHT' : 'SUPPORT <br> E-TWILIGHT';
    }
}

// Event listener
if (languageSelector) {
    // Cargar idioma guardado
    const savedLang = localStorage.getItem('preferredLanguage') || 'es';
    languageSelector.value = savedLang;
    changeLanguage(savedLang);
    
    // Cambiar al seleccionar
    languageSelector.addEventListener('change', (e) => {
        changeLanguage(e.target.value);
    });
}