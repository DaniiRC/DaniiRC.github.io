const translations = {
    es: {
        nav: {
            home: "Inicio",
            skills: "Skills",
            projects: "Proyectos",
            contact: "Contacto"
        },
        home: {
            title: "Bienvenido, soy",
            subtitle: "Estudiante de DAM, y apasionado por crear código nuevo para testear/desarrollar cosas originales."
        },
        skills: "Mis Skills",
        projects: "Mis Proyectos",
        contact: "Contacta conmigo",
        form: {
            name: "Nombre",
            email: "Email",
            message: "Mensaje",
            submit: "Enviar mensaje"
        },
        typewriter: [
            "Desarrollador",
            "Programador",
            "Estudiante DAM",
            "Entusiasta de la tecnología",
            "Creador de soluciones"
        ]
    },
    en: {
        nav: {
            home: "Home",
            skills: "Skills",
            projects: "Projects",
            contact: "Contact"
        },
        home: {
            title: "Welcome, I'm",
            subtitle: "DAM student, passionate about creating new code to test/develop original things."
        },
        skills: "My Skills",
        projects: "My Projects",
        contact: "Contact me",
        form: {
            name: "Name",
            email: "Email",
            message: "Message",
            submit: "Send message"
        },
        typewriter: [
            "Developer",
            "Programmer",
            "DAM Student",
            "Tech Enthusiast",
            "Solution Creator"
        ]
    }
};

let currentLang = 'es';

function applyTranslations() {
    const t = translations[currentLang];

    // Barra de navegación
    const navHome = document.getElementById('nav-home');
    if (navHome) navHome.textContent = t.nav.home;
    const navSkills = document.getElementById('nav-skills');
    if (navSkills) navSkills.textContent = t.nav.skills;
    const navProjects = document.getElementById('nav-projects');
    if (navProjects) navProjects.textContent = t.nav.projects;
    const navContact = document.getElementById('nav-contact');
    if (navContact) navContact.textContent = t.nav.contact;

    // Home section
    const homeTitle = document.getElementById('home-title');
    if (homeTitle) homeTitle.textContent = `${t.home.title} DaniiRC`;

    // Subtítulo debajo de "Bienvenido, soy DaniiRC"
    const homeDesc = document.querySelector('#home .description');
    if (homeDesc) homeDesc.textContent = t.home.subtitle;

    // Section titles
    const skillsTitle = document.getElementById('skills-title');
    if (skillsTitle) skillsTitle.textContent = t.skills;

    const projectsTitle = document.getElementById('projects-title');
    if (projectsTitle) projectsTitle.textContent = t.projects;

    const contactTitle = document.getElementById('contact-title');
    if (contactTitle) contactTitle.textContent = t.contact;

    // Form labels
    const form = document.getElementById('contact-form');
    if (form) {
        const nameLabel = form.querySelector('label[for="name"]');
        if (nameLabel) nameLabel.textContent = t.form.name;
        const emailLabel = form.querySelector('label[for="email"]');
        if (emailLabel) emailLabel.textContent = t.form.email;
        const messageLabel = form.querySelector('label[for="message"]');
        if (messageLabel) messageLabel.textContent = t.form.message;
        const submitBtn = form.querySelector('button[type="submit"]');
        if (submitBtn) submitBtn.textContent = t.form.submit;
    }
}

export function setLanguage(lang) {
    currentLang = lang;
    applyTranslations();
}

export function getCurrentLanguage() {
    return currentLang;
}

export { translations };