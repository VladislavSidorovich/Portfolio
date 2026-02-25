export class ThemeToggle {
    constructor() {
        this.element = document.getElementById('themeToggle');
        this.icon = this.element.querySelector('i');
        this.text = this.element.querySelector('span');
        this.init();
    }
    init() {
        // Устанавливаем начальную тему
        this.setTheme(this.getInitialTheme());
        // Обработчик клика
        this.element.addEventListener('click', () => this.toggleTheme());
        // Следим за системными изменениями темы
        const darkModeMediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
        darkModeMediaQuery.addEventListener('change', (e) => {
            if (!localStorage.getItem('portfolio-theme')) {
                this.setTheme(e.matches ? 'dark' : 'light');
            }
        });
    }
    getInitialTheme() {
        const savedTheme = localStorage.getItem('portfolio-theme');
        if (savedTheme) {
            return savedTheme;
        }
        if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
            return 'dark';
        }
        return 'light';
    }
    setTheme(theme) {
        if (theme === 'dark') {
            document.documentElement.classList.add('dark-theme');
            this.icon.className = 'fas fa-sun';
            this.text.textContent = 'Светлая тема';
            localStorage.setItem('portfolio-theme', 'dark');
        }
        else {
            document.documentElement.classList.remove('dark-theme');
            this.icon.className = 'fas fa-moon';
            this.text.textContent = 'Тёмная тема';
            localStorage.setItem('portfolio-theme', 'light');
        }
    }
    toggleTheme() {
        const isDark = document.documentElement.classList.contains('dark-theme');
        this.setTheme(isDark ? 'light' : 'dark');
        // Анимация кнопки
        this.element.style.transform = 'scale(0.95)';
        setTimeout(() => {
            this.element.style.transform = '';
        }, 150);
    }
}
//# sourceMappingURL=ThemeToggle.js.map