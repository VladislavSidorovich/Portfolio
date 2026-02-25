export class Section {
    constructor(sectionId) {
        this.observer = null;
        this.element = document.getElementById(sectionId) || document.querySelector(`#${sectionId}`);
        this.initIntersectionObserver();
    }
    initIntersectionObserver() {
        if (!this.element || !('IntersectionObserver' in window))
            return;
        this.observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.setAttribute('data-visible', 'true');
                    if (this.observer) {
                        this.observer.unobserve(entry.target);
                    }
                }
            });
        }, {
            threshold: 0.1,
            rootMargin: '50px'
        });
        this.observer.observe(this.element);
    }
    scrollIntoView(options) {
        this.element.scrollIntoView({
            behavior: 'smooth',
            block: 'start',
            ...options
        });
    }
    show() {
        this.element.style.display = 'block';
    }
    hide() {
        this.element.style.display = 'none';
    }
}
//# sourceMappingURL=Section.js.map