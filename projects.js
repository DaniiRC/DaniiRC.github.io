// projects.js (actualizado)
const CONFIG = {
    GITHUB_USERNAME: 'DaniiRC',
    EXCLUDE_REPOS: ['DaniiRC.github.io', 'portfolio', 'mi-otro-repo'],
    PROJECTS_PER_PAGE: 4
};

async function fetchGitHubRepos() {
    try {
        const response = await fetch(`https://api.github.com/users/${CONFIG.GITHUB_USERNAME}/repos?sort=updated&direction=desc`);
        if (!response.ok) throw new Error('Error al obtener repositorios');
        
        const repos = await response.json();
        return repos.filter(repo => !CONFIG.EXCLUDE_REPOS.includes(repo.name) && !repo.fork && !repo.archived);
    } catch (error) {
        console.error('Error:', error);
        // Datos de ejemplo si falla la API
        return [
            {
                name: 'Proyecto 1',
                description: 'Descripción del proyecto 1',
                html_url: 'https://github.com/DaniiRC/proyecto1',
                homepage: 'https://daniirc.github.io/proyecto1',
                language: 'JavaScript'
            },
            {
                name: 'Proyecto 2',
                description: 'Descripción del proyecto 2',
                html_url: 'https://github.com/DaniiRC/proyecto2',
                homepage: 'https://daniirc.github.io/proyecto2',
                language: 'Java'
            },
            {
                name: 'Proyecto 3',
                description: 'Descripción del proyecto 3',
                html_url: 'https://github.com/DaniiRC/proyecto3',
                homepage: 'https://daniirc.github.io/proyecto3',
                language: 'HTML'
            },
            {
                name: 'Proyecto 4',
                description: 'Descripción del proyecto 4',
                html_url: 'https://github.com/DaniiRC/proyecto4',
                homepage: 'https://daniirc.github.io/proyecto4',
                language: 'CSS'
            },
            {
                name: 'Proyecto 5',
                description: 'Descripción del proyecto 5',
                html_url: 'https://github.com/DaniiRC/proyecto5',
                homepage: 'https://daniirc.github.io/proyecto5',
                language: 'Python'
            }
        ];
    }
}

// ... (el resto del archivo se mantiene igual) ...

function createProjectCard(repo) {
    const card = document.createElement('div');
    card.className = 'project-card';
    
    const languages = repo.language || 'Code';
    const colors = {
        'JavaScript': '#f1e05a',
        'HTML': '#e34c26',
        'CSS': '#563d7c',
        'Java': '#b07219',
        'Python': '#3572A5',
        'Code': '#586069'
    };
    
    card.innerHTML = `
        <div class="project-image" style="background-color: ${colors[languages] || colors['Code']}">
            <i class="fas fa-code"></i>
        </div>
        <div class="project-info">
            <h3>${repo.name}</h3>
            <p>${repo.description || 'Proyecto sin descripción'}</p>
            <div class="project-links">
                <a href="${repo.html_url}" target="_blank"><i class="fab fa-github"></i> Ver código</a>
                ${repo.homepage ? `<a href="${repo.homepage}" target="_blank"><i class="fas fa-external-link-alt"></i> Ver demo</a>` : ''}
            </div>
        </div>
    `;
    
    return card;
}

async function loadProjects() {
    const repos = await fetchGitHubRepos();
    const container = document.getElementById('projects-container');
    const loadMoreBtn = document.getElementById('load-more');
    
    if (!container || !loadMoreBtn) return;
    
    let visibleProjects = 0;
    
    function showProjects(count) {
        const endIndex = Math.min(visibleProjects + count, repos.length);
        
        for (let i = visibleProjects; i < endIndex; i++) {
            const card = createProjectCard(repos[i]);
            container.appendChild(card);
        }
        
        visibleProjects = endIndex;
        
        if (visibleProjects >= repos.length) {
            loadMoreBtn.style.display = 'none';
        } else {
            loadMoreBtn.style.display = 'block';
        }
    }
    
    // Mostrar primeros proyectos
    showProjects(CONFIG.PROJECTS_PER_PAGE);
    
    // Manejar clic en "Mostrar más"
    loadMoreBtn.addEventListener('click', () => {
        showProjects(CONFIG.PROJECTS_PER_PAGE);
    });
}

export { loadProjects };