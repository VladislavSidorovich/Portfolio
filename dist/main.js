"use strict";
class PortfolioApp {
    constructor() {
        this.projects = [];
        this.closedProjects = [];
        this.init();
    }
    init() {
        this.setCurrentYear();
        this.initLightbox();
        this.loadProjects();
        this.loadClosedProjects();
    }
    setCurrentYear() {
        const yearElement = document.getElementById('currentYear');
        if (yearElement) {
            yearElement.textContent = new Date().getFullYear().toString();
        }
    }
    initLightbox() {
        this.lightboxModal = document.getElementById('lightboxModal');
        this.lightboxImg = document.getElementById('lightboxImg');
        this.lightboxModal.addEventListener('click', (e) => {
            if (e.target === this.lightboxModal) {
                this.closeLightbox();
            }
        });
        const closeBtn = document.getElementById('closeLightboxBtn');
        if (closeBtn) {
            closeBtn.addEventListener('click', () => this.closeLightbox());
        }
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && this.lightboxModal.classList.contains('show')) {
                this.closeLightbox();
            }
        });
    }
    openLightbox(src) {
        this.lightboxImg.src = src;
        this.lightboxModal.classList.add('show');
        document.body.style.overflow = 'hidden';
    }
    closeLightbox() {
        this.lightboxModal.classList.remove('show');
        document.body.style.overflow = '';
    }
    loadProjects() {
        this.projects = [
            {
                id: 1,
                title: "Цифровое издательство",
                description: "Цифровое издательство Международной методологической ассоциации (ММАСС)",
                siteUrl: "https://www.mmass.pro/",
                githubUrl: "https://github.com/VladislavSidorovich/storeBookNFT_v2",
                imagePath: "mmass.png",
                tech: ["Next.js", "TypeScript", "React", "Redux Toolkit", "React Query", "RainbowKit", "Wagmi", "Viem", "Firebase", "Styled Components", "Axios", "React Hook Form", "Framer Motion", "Lottie", "Swiper", "Sass"]
            },
            {
                id: 2,
                title: "Приложение для чтения EPUB",
                description: "Приложение для чтения книг и статей в формате EPUB",
                siteUrl: "https://reader-books-demo.vercel.app/",
                githubUrl: "https://github.com/VladislavSidorovich/Reader-books-demo",
                imagePath: "readerbooks.png",
                tech: ["epub.js", "JSZip", "sanitize-html", "PEP", "Babel polyfill", "Fetch polyfill"]
            },
            {
                id: 3,
                title: "Веб-приложение TokenTol",
                description: "Веб-приложение для создания токенов в сети Solana",
                siteUrl: "https://solana-createv5-4kddhybqj-vlads-projects-26952666.vercel.app",
                githubUrl: "https://github.com/VladislavSidorovich/solana-createv5F",
                imagePath: "tokenTol.png",
                tech: ["Next.js", "TypeScript", "Tailwind CSS", "Solana Web3.js", "React", "Zustand", "DaisyUI", "SPL Token", "Metaplex", "Wallet Adapter"]
            },
            {
                id: 4,
                title: "AXIOM",
                description: "Крипто платформа AXIOM",
                siteUrl: "https://axiom-dev-demo.vercel.app",
                githubUrl: "https://github.com/VladislavSidorovich/axiom_dev_demo",
                imagePath: "axiom.png",
                tech: ["React", "React Router", "React Query", "RainbowKit", "Wagmi", "Viem", "Ethers", "Moralis", "Covalent SDK", "Ankr", "Axios", "Styled Components", "Framer Motion", "PrimeReact", "Recharts", "React Toastify", "MobX", "Create React App", "React App Rewired", "Testing Library"]
            }
        ];
        this.renderProjects();
        this.updateProjectsCounter();
    }
    createProjectCard(project) {
        const card = document.createElement('div');
        card.className = 'project-card';
        card.setAttribute('data-project-id', project.id.toString());
        let imageUrl;
        if (project.imagePath.startsWith('http://') || project.imagePath.startsWith('https://') || project.imagePath.startsWith('/')) {
            imageUrl = project.imagePath;
        }
        else {
            imageUrl = `/images/${project.imagePath}`;
        }
        const techTagsHTML = project.tech.map(tech => `<span class="tech-tag">${tech}</span>`).join('');
        card.innerHTML = `
            <div class="project-image">
                <img src="${imageUrl}" alt="Скриншот проекта: ${project.title}" loading="lazy"
                     onerror="this.onerror=null; this.style.display='none';">
            </div>
            <div class="project-content">
                <h3 class="project-title">${project.title}</h3>
                <p class="project-desc">${project.description}</p>
                <div class="tech-tags">${techTagsHTML}</div>
                <div class="project-links">
                    <a href="${project.siteUrl}" class="project-link" target="_blank" rel="noopener noreferrer">
                        <i class="fas fa-external-link-alt"></i> Посетить сайт
                    </a>
                    <a href="${project.githubUrl}" class="github-link" target="_blank" rel="noopener noreferrer">
                        <i class="fab fa-github"></i>
                    </a>
                </div>
            </div>
        `;
        card.addEventListener('click', (e) => {
            if (e.target.closest('a'))
                return;
            window.open(project.siteUrl, '_blank', 'noopener,noreferrer');
        });
        return card;
    }
    renderProjects() {
        const container = document.getElementById('projectsContainer');
        if (!container)
            return;
        container.innerHTML = '';
        this.projects.forEach(project => container.appendChild(this.createProjectCard(project)));
    }
    updateProjectsCounter() {
        const counter = document.getElementById('projectsCount');
        if (counter)
            counter.textContent = `${this.projects.length} проектов`;
    }
    addProject(project) {
        const newProject = { ...project, id: this.projects.length + 1 };
        this.projects.push(newProject);
        const container = document.getElementById('projectsContainer');
        if (container) {
            container.appendChild(this.createProjectCard(newProject));
            this.updateProjectsCounter();
        }
    }
    loadClosedProjects() {
        this.closedProjects = [
            {
                id: 1,
                title: "Графический редактор",
                description: "Специализированный графический редактор предназначен для проектирования фасадов, а также внешней и внутренней отделки помещений. Инструмент включает визуализацию экстерьера и интерьера, планировку комнат, расстановку перегородок, подбор и нанесение материалов отделки. Редактор интегрирован в закрытую экосистему сервисов, автоматизирующую полный цикл работы строительной компании от проекта до сметы.",
                confidentialBadge: "NDA",
                imagePaths: [
                    "/images/facades1.png"
                ],
                tech: []
            },
            {
                id: 2,
                title: "Панель управления",
                description: "Внутренняя система для управления задачами, документами, проектами, финансами и т. д., которая является частью закрытой экосистемы наряду с графическим редактором",
                confidentialBadge: "Private",
                imagePaths: [
                    "/images/admin1.png",
                    "/images/admin2.png",
                    "/images/admin3.png",
                    "/images/admin4.png"
                ],
                tech: []
            },
            {
                id: 3,
                title: "Криптообменник",
                description: "Интерфейс для криптообменника, работающего по модели «от юзера к юзеру» с ручным подтверждением переводов.",
                confidentialBadge: "NDA",
                imagePaths: [
                    "/images/exchanger1.png",
                    "/images/exchanger2.png",
                    "/images/exchanger3.png",
                ],
                tech: []
            }
        ];
        this.renderClosedProjects();
    }
    createClosedProjectCard(project) {
        const card = document.createElement('div');
        card.className = 'closed-project-card';
        const headerDiv = document.createElement('div');
        headerDiv.className = 'closed-project-header';
        headerDiv.innerHTML = `
            <h3 class="closed-project-title">${project.title}</h3>
            <span class="confidential-badge"><i class="fas fa-lock"></i> ${project.confidentialBadge}</span>
        `;
        const descP = document.createElement('p');
        descP.className = 'closed-project-desc';
        descP.textContent = project.description;
        const techDiv = document.createElement('div');
        techDiv.className = 'closed-tech-tags';
        project.tech.forEach(tech => {
            const span = document.createElement('span');
            span.className = 'closed-tech-tag';
            span.textContent = tech;
            techDiv.appendChild(span);
        });
        const galleryDiv = document.createElement('div');
        galleryDiv.className = 'photo-gallery';
        project.imagePaths.forEach((path) => {
            const img = document.createElement('img');
            img.src = path;
            img.alt = `Скриншот проекта ${project.title}`;
            img.className = 'gallery-image';
            img.loading = 'lazy';
            img.dataset.fullsrc = path;
            img.addEventListener('click', (e) => {
                e.stopPropagation();
                this.openLightbox(path);
            });
            img.onerror = function () {
                const placeholder = document.createElement('div');
                placeholder.className = 'image-placeholder';
                placeholder.innerHTML = '<i class="fas fa-lock"></i>';
                if (img.parentNode) {
                    img.parentNode.replaceChild(placeholder, img);
                }
            };
            galleryDiv.appendChild(img);
        });
        const footerDiv = document.createElement('div');
        footerDiv.style.marginTop = '12px';
        footerDiv.style.fontSize = '0.8rem';
        footerDiv.style.color = '#6a8a9a';
        footerDiv.innerHTML = '<i class="fas fa-eye-slash"></i> Детали под NDA';
        card.appendChild(headerDiv);
        card.appendChild(descP);
        card.appendChild(techDiv);
        card.appendChild(galleryDiv);
        card.appendChild(footerDiv);
        return card;
    }
    renderClosedProjects() {
        const container = document.getElementById('closedProjectsContainer');
        if (!container)
            return;
        container.innerHTML = '';
        this.closedProjects.forEach(project => {
            container.appendChild(this.createClosedProjectCard(project));
        });
    }
    addClosedProject(project) {
        const newProject = { ...project, id: this.closedProjects.length + 1 };
        this.closedProjects.push(newProject);
        const container = document.getElementById('closedProjectsContainer');
        if (container) {
            container.appendChild(this.createClosedProjectCard(newProject));
        }
    }
}
document.addEventListener('DOMContentLoaded', () => {
    const app = new PortfolioApp();
    window.portfolioApp = app;
});
//# sourceMappingURL=main.js.map