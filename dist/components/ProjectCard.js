export class ProjectCard {
    constructor(project, onClick) {
        this.project = project;
        this.onClick = onClick;
        this.element = this.createCardElement();
        this.setupEventListeners();
    }
    getScreenshotUrl(url) {
        const encodedUrl = encodeURIComponent(url);
        const width = window.innerWidth < 768 ? 400 :
            window.innerWidth < 1024 ? 600 : 800;
        return `https://api.screenshotlayer.com/api/capture?access_key=demo&url=${encodedUrl}&width=${width}&viewport=1440x900`;
    }
    getStatusText(status) {
        const statusMap = {
            'completed': 'Завершён',
            'in-progress': 'В работе',
            'planned': 'Запланирован'
        };
        return statusMap[status] || 'Неизвестно';
    }
    createCardElement() {
        const techTags = this.project.tech.map(tech => `<span class="tech-tag">${tech}</span>`).join('');
        const template = `
            <div class="project-card" data-project-id="${this.project.id}" data-status="${this.project.status}">
                <div class="project-badge ${this.project.status}">
                    ${this.getStatusText(this.project.status)}
                </div>
                <div class="project-image">
                    <img 
                        src="${this.getScreenshotUrl(this.project.siteUrl)}" 
                        alt="Превью проекта ${this.project.title}"
                        loading="lazy"
                        width="400"
                        height="260"
                        onerror="this.style.display='none'; this.parentElement.innerHTML='<div class=\"image-placeholder\">${this.project.title}</div>';"
                    >
                </div>
                <div class="project-content">
                    <h3 class="project-title">${this.project.title}</h3>
                    <p class="project-desc">${this.project.description}</p>
                    
                    <div class="project-meta">
                        <div class="meta-item">
                            <i class="fas fa-calendar"></i>
                            <span>${this.project.date}</span>
                        </div>
                        <div class="meta-item">
                            <i class="fas fa-layer-group"></i>
                            <span>${this.project.complexity}</span>
                        </div>
                        <div class="meta-item">
                            <i class="fas fa-tag"></i>
                            <span>${this.project.type}</span>
                        </div>
                    </div>
                    
                    <div class="tech-tags">
                        ${techTags}
                    </div>
                    
                    <div class="project-links">
                        <a href="${this.project.siteUrl}" 
                           class="project-link" 
                           target="_blank" 
                           rel="noopener noreferrer"
                           onclick="event.stopPropagation()">
                            <i class="fas fa-external-link-alt"></i>
                            Открыть проект
                        </a>
                        <a href="${this.project.githubUrl}" 
                           class="github-link" 
                           target="_blank" 
                           rel="noopener noreferrer"
                           aria-label="Исходный код на GitHub"
                           onclick="event.stopPropagation()">
                            <i class="fab fa-github"></i>
                        </a>
                    </div>
                </div>
            </div>
        `;
        const container = document.createElement('div');
        container.innerHTML = template;
        return container.firstElementChild;
    }
    setupEventListeners() {
        // Клик по карточке
        this.element.addEventListener('click', (e) => {
            if (e.target.closest('a'))
                return;
            this.onClick(this.project.siteUrl);
        });
        // Клавиатурная навигация
        this.element.addEventListener('keydown', (e) => {
            if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                this.onClick(this.project.siteUrl);
            }
        });
        // Доступность
        this.element.addEventListener('focus', () => {
            this.element.style.outline = '2px solid var(--primary)';
            this.element.style.outlineOffset = '2px';
        });
        this.element.addEventListener('blur', () => {
            this.element.style.outline = 'none';
        });
        // Атрибуты для доступности
        this.element.setAttribute('tabindex', '0');
        this.element.setAttribute('role', 'button');
        this.element.setAttribute('aria-label', `Открыть проект ${this.project.title}`);
    }
    getElement() {
        return this.element;
    }
    matchesFilter(filter) {
        return filter === 'all' || this.project.status === filter;
    }
    show() {
        this.element.style.display = 'flex';
        this.element.style.animation = 'cardEntrance 0.6s ease-out both';
    }
    hide() {
        this.element.style.display = 'none';
    }
}
//# sourceMappingURL=ProjectCard.js.map