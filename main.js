import { setupTypewriter } from './typewriter.js';
import { setupForm } from './form.js';
import { translations, setLanguage, getCurrentLanguage } from './i18n.js';

const GITHUB_USER = "DaniiRC";
const PROJECTS_TO_SHOW = 3;

async function loadProjects() {
    const container = document.getElementById('projects-container');
    if (!container) return;

    container.innerHTML = '';

    try {
        const res = await fetch('/api/repos');
        const repos = await res.json();

        if (!Array.isArray(repos)) throw new Error();

        // Filtra forks si quieres solo los tuyos
        const filtered = repos.filter(repo => !repo.fork);

        // Para cada repo, obtenemos también sus lenguajes
        for (let i = 0; i < filtered.length; i++) {
            const repo = filtered[i];
            const card = document.createElement('div');
            card.className = 'project-card';
            if (i >= PROJECTS_TO_SHOW) card.classList.add('extra-project');
            card.style.display = (i < PROJECTS_TO_SHOW) ? 'block' : 'none';

            // Determina la clase de color según el lenguaje principal
            let langClass = '';
            switch ((repo.language || '').toLowerCase()) {
                case 'javascript': langClass = 'lang-js'; break;
                case 'python': langClass = 'lang-py'; break;
                case 'java': langClass = 'lang-java'; break;
                case 'html': langClass = 'lang-html'; break;
                case 'css': langClass = 'lang-css'; break;
                case 'c++': langClass = 'lang-cpp'; break;
                case 'c#': langClass = 'lang-cs'; break;
                case 'php': langClass = 'lang-php'; break;
                case 'typescript': langClass = 'lang-ts'; break;
                case 'kotlin': langClass = 'lang-kotlin'; break;
                case 'go': langClass = 'lang-go'; break;
                case 'ruby': langClass = 'lang-rb'; break;
                case 'mysql': langClass = 'lang-mysql'; break;
                default: langClass = 'lang-default';
            }

            // Formatea la fecha de creación
            const fecha = new Date(repo.created_at);
            const fechaFormateada = fecha.toLocaleDateString('es-ES', {
                year: 'numeric',
                month: 'long',
                day: 'numeric'
            });

            // Obtén todos los lenguajes usados en el repo
            let lenguajes = [];
            try {
                const langRes = await fetch(repo.languages_url);
                const langs = await langRes.json();
                if (langs && !langs.message) {
                    lenguajes = Object.keys(langs);
                } else {
                    lenguajes = [repo.language || 'Desconocido'];
                }
            } catch (e) {
                lenguajes = [repo.language || 'Desconocido'];
            }

            card.innerHTML = `
                <div class="project-image ${langClass}">
                    <span class="code-icon">&lt;/&gt;</span>
                </div>
                <div class="project-info">
                    <h3>${repo.name}</h3>
                    <p>
                        ${repo.description ? repo.description + '<br>' : ''}
                        <strong>Creado:</strong> ${fechaFormateada}<br>
                        <strong>Código:</strong> ${lenguajes.length > 0 ? lenguajes.join(', ') : 'Desconocido'}
                    </p>
                    <div class="project-links">
                        <a href="${repo.html_url}" target="_blank"><i class="fab fa-github"></i> Ver en GitHub</a>
                    </div>
                </div>
            `;
            container.appendChild(card);
        }

        // Muestra u oculta el botón según la cantidad de proyectos
        const showMoreBtn = document.getElementById('show-more-projects');
        const showLessBtn = document.getElementById('show-less-projects');
        if (showMoreBtn && showLessBtn) {
            showMoreBtn.style.display = (filtered.length > PROJECTS_TO_SHOW) ? 'inline-block' : 'none';
            showLessBtn.style.display = 'none';
        }
    } catch (error) {
        // Si falla la API, muestra proyectos de ejemplo
        container.innerHTML = `
            <div class="project-card">
                <div class="project-image lang-js">
                    <span class="code-icon">&lt;/&gt;</span>
                </div>
                <div class="project-info">
                    <h3>Proyecto Ejemplo JS</h3>
                    <p>
                        Proyecto de ejemplo en JavaScript.<br>
                        <strong>Creado:</strong> 1 de enero de 2024<br>
                        <strong>Código:</strong> JavaScript, HTML, CSS
                    </p>
                    <div class="project-links">
                        <a href="#" target="_blank"><i class="fab fa-github"></i> Ver en GitHub</a>
                    </div>
                </div>
            </div>
            <div class="project-card">
                <div class="project-image lang-py">
                    <span class="code-icon">&lt;/&gt;</span>
                </div>
                <div class="project-info">
                    <h3>Proyecto Ejemplo Python</h3>
                    <p>
                        Proyecto de ejemplo en Python.<br>
                        <strong>Creado:</strong> 15 de febrero de 2024<br>
                        <strong>Código:</strong> Python
                    </p>
                    <div class="project-links">
                        <a href="#" target="_blank"><i class="fab fa-github"></i> Ver en GitHub</a>
                    </div>
                </div>
            </div>
        `;
        // Oculta los botones de mostrar más/menos
        const showMoreBtn = document.getElementById('show-more-projects');
        const showLessBtn = document.getElementById('show-less-projects');
        if (showMoreBtn && showLessBtn) {
            showMoreBtn.style.display = 'none';
            showLessBtn.style.display = 'none';
        }
    }
}

document.addEventListener('DOMContentLoaded', () => {
    // Traducciones iniciales y typewriter
    setLanguage(getCurrentLanguage());
    setupTypewriter(translations[getCurrentLanguage()].typewriter);
    loadProjects();
    setupForm();

    // Configuración del menú de opciones
    const themeToggle = document.getElementById('theme-toggle');
    const settingsMenu = document.getElementById('settings-menu');
    const visualModeBtn = document.getElementById('visual-mode-btn');
    const languageBtn = document.getElementById('language-btn');
    const visualModeMenu = document.getElementById('visual-mode-menu');
    const languageMenu = document.getElementById('language-menu');

    if (themeToggle) {
        themeToggle.addEventListener('click', (e) => {
            e.stopPropagation();
            settingsMenu.classList.toggle('show');
            visualModeMenu.classList.remove('show');
            languageMenu.classList.remove('show');
        });
    }

    if (visualModeBtn) {
        visualModeBtn.addEventListener('click', (e) => {
            e.stopPropagation();
            settingsMenu.classList.remove('show');
            visualModeMenu.classList.add('show');
            languageMenu.classList.remove('show');
        });
    }

    if (languageBtn) {
        languageBtn.addEventListener('click', (e) => {
            e.stopPropagation();
            settingsMenu.classList.remove('show');
            visualModeMenu.classList.remove('show');
            languageMenu.classList.add('show');
        });
    }

    [settingsMenu, visualModeMenu, languageMenu].forEach(menu => {
        if (menu) {
            menu.addEventListener('click', e => e.stopPropagation());
        }
    });

    document.querySelectorAll('.back-btn').forEach(btn => {
        btn.addEventListener('click', (e) => {
            e.stopPropagation();
            visualModeMenu.classList.remove('show');
            languageMenu.classList.remove('show');
            settingsMenu.classList.add('show');
        });
    });

    function closeAllMenus() {
        settingsMenu.classList.remove('show');
        visualModeMenu.classList.remove('show');
        languageMenu.classList.remove('show');
    }

    document.addEventListener('click', () => {
        closeAllMenus();
    });

    // Cambiar tema
    const darkModeBtn = document.getElementById('dark-mode');
    if (darkModeBtn) {
        darkModeBtn.addEventListener('click', () => {
            document.body.className = '';
            closeAllMenus();
        });
    }

    const lightModeBtn = document.getElementById('light-mode');
    if (lightModeBtn) {
        lightModeBtn.addEventListener('click', () => {
            document.body.className = 'light-mode';
            closeAllMenus();
        });
    }

    // Cambiar idioma
    const langEsBtn = document.getElementById('lang-es');
    if (langEsBtn) {
        langEsBtn.addEventListener('click', (e) => {
            e.stopPropagation();
            setLanguage('es');
            setupTypewriter(translations['es'].typewriter);
            closeAllMenus();
        });
    }
    const langEnBtn = document.getElementById('lang-en');
    if (langEnBtn) {
        langEnBtn.addEventListener('click', (e) => {
            e.stopPropagation();
            setLanguage('en');
            setupTypewriter(translations['en'].typewriter);
            closeAllMenus();
        });
    }

    // Smooth scrolling para enlaces
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();

            const targetId = this.getAttribute('href');
            if (targetId === '#') return;

            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop - 80,
                    behavior: 'smooth'
                });
            }
        });
    });

    // Mostrar más/menos proyectos
    const showMoreBtn = document.getElementById('show-more-projects');
    const showLessBtn = document.getElementById('show-less-projects');

    if (showMoreBtn && showLessBtn) {
        showMoreBtn.addEventListener('click', () => {
            document.querySelectorAll('.extra-project').forEach(card => card.style.display = 'block');
            showMoreBtn.style.display = 'none';
            showLessBtn.style.display = 'inline-block';
        });

        showLessBtn.addEventListener('click', () => {
            document.querySelectorAll('.extra-project').forEach(card => card.style.display = 'none');
            showMoreBtn.style.display = 'inline-block';
            showLessBtn.style.display = 'none';
            document.getElementById('projects-container').scrollIntoView({ behavior: 'smooth' });
        });
    }
});