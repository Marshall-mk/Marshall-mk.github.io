// Portfolio Website JavaScript
class PortfolioSite {
    constructor() {
        this.init();
        this.loadContent();
        this.setupEventListeners();
        this.setupAnimations();
    }

    init() {
        // Initialize typing animation
        this.setupTypingAnimation();
        
        // Initialize navigation
        this.setupNavigation();
        
        // Initialize counter animations
        this.setupCounters();
        
        // Initialize theme toggle
        this.setupThemeToggle();
        
        // Initialize loading spinner
        this.hideLoadingSpinner();
    }

    setupTypingAnimation() {
        const typingElement = document.querySelector('.typing-text');
        if (!typingElement) return;

        const texts = [
            'Hi, I\'m Kabir Hamzah Muhammad',
            'Medical Imaging Researcher',
            'Machine Learning Operations'
        ];
        
        let textIndex = 0;
        let charIndex = 0;
        let isDeleting = false;
        
        const typeSpeed = 100;
        const deleteSpeed = 50;
        const pauseDuration = 2000;

        function type() {
            const currentText = texts[textIndex];
            
            if (isDeleting) {
                typingElement.textContent = currentText.substring(0, charIndex - 1);
                charIndex--;
            } else {
                typingElement.textContent = currentText.substring(0, charIndex + 1);
                charIndex++;
            }

            let speed = isDeleting ? deleteSpeed : typeSpeed;

            if (!isDeleting && charIndex === currentText.length) {
                speed = pauseDuration;
                isDeleting = true;
            } else if (isDeleting && charIndex === 0) {
                isDeleting = false;
                textIndex = (textIndex + 1) % texts.length;
            }

            setTimeout(type, speed);
        }

        type();
    }

    setupNavigation() {
        const navbar = document.getElementById('navbar');
        const navToggle = document.getElementById('nav-toggle');
        const navMenu = document.getElementById('nav-menu');
        const navLinks = document.querySelectorAll('.nav-link');

        // Navbar scroll effect
        window.addEventListener('scroll', () => {
            if (window.scrollY > 50) {
                navbar.classList.add('scrolled');
            } else {
                navbar.classList.remove('scrolled');
            }
        });

        // Mobile menu toggle
        navToggle.addEventListener('click', () => {
            navMenu.classList.toggle('active');
            navToggle.classList.toggle('active');
        });

        // Close mobile menu when clicking on a link
        navLinks.forEach(link => {
            link.addEventListener('click', () => {
                navMenu.classList.remove('active');
                navToggle.classList.remove('active');
            });
        });

        // Active link highlighting
        window.addEventListener('scroll', () => {
            let current = '';
            const sections = document.querySelectorAll('section');
            
            sections.forEach(section => {
                const sectionTop = section.offsetTop;
                const sectionHeight = section.clientHeight;
                if (scrollY >= sectionTop - 200) {
                    current = section.getAttribute('id');
                }
            });

            navLinks.forEach(link => {
                link.classList.remove('active');
                if (link.getAttribute('href') === `#${current}`) {
                    link.classList.add('active');
                }
            });
        });
    }

    setupCounters() {
        const counters = document.querySelectorAll('.stat-number');
        const speed = 200;

        const countUp = (counter) => {
            const target = +counter.getAttribute('data-target');
            const count = +counter.innerText;
            const inc = target / speed;

            if (count < target) {
                counter.innerText = Math.ceil(count + inc);
                setTimeout(() => countUp(counter), 1);
            } else {
                counter.innerText = target;
            }
        };

        // Intersection Observer for counter animation
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const counter = entry.target;
                    countUp(counter);
                    observer.unobserve(counter);
                }
            });
        });

        counters.forEach(counter => {
            observer.observe(counter);
        });
    }

    setupThemeToggle() {
        const themeToggle = document.getElementById('theme-toggle');
        const themeIcon = document.getElementById('theme-icon');
        
        // Check for saved theme or default to light mode
        const savedTheme = localStorage.getItem('theme') || 'light';
        document.documentElement.setAttribute('data-theme', savedTheme);
        this.updateThemeIcon(savedTheme);
        
        // Theme toggle event listener
        themeToggle.addEventListener('click', () => {
            const currentTheme = document.documentElement.getAttribute('data-theme');
            const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
            
            document.documentElement.setAttribute('data-theme', newTheme);
            localStorage.setItem('theme', newTheme);
            this.updateThemeIcon(newTheme);
            
            // Add a subtle animation
            themeToggle.style.transform = 'scale(0.9)';
            setTimeout(() => {
                themeToggle.style.transform = 'scale(1)';
            }, 150);
        });
    }
    
    updateThemeIcon(theme) {
        const themeIcon = document.getElementById('theme-icon');
        if (theme === 'dark') {
            themeIcon.className = 'fas fa-sun';
        } else {
            themeIcon.className = 'fas fa-moon';
        }
    }

    setupAnimations() {
        // Intersection Observer for fade-in animations
        const observerOptions = {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        };

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('visible');
                }
            });
        }, observerOptions);

        // Observe all animated elements
        const animatedElements = document.querySelectorAll('.fade-in, .slide-in-left, .slide-in-right');
        animatedElements.forEach(el => {
            observer.observe(el);
        });
    }

    async loadContent() {
        try {
            // Load all content in parallel
            await Promise.all([
                this.loadHeroContent(),
                this.loadAboutContent(),
                this.loadEducationContent(),
                this.loadExperienceContent(),
                this.loadResearchContent(),
                this.loadProjectsContent(),
                this.loadPublicationsContent(),
                this.loadAchievementsContent(),
                this.loadNewsContent(),
                this.loadSocialLinks()
            ]);
        } catch (error) {
            console.error('Error loading content:', error);
        }
    }

    async loadMarkdownFile(filename) {
        try {
            const response = await fetch(`content/${filename}`);
            if (!response.ok) {
                throw new Error(`Failed to load ${filename}`);
            }
            const text = await response.text();
            return marked.parse(text);
        } catch (error) {
            console.error(`Error loading ${filename}:`, error);
            return `<p>Content will be loaded from <code>content/${filename}</code></p>`;
        }
    }

    async loadJSONFile(filename) {
        try {
            console.log(`Loading ${filename}...`);
            const response = await fetch(`content/${filename}`);
            if (!response.ok) {
                throw new Error(`Failed to load ${filename}: ${response.status} ${response.statusText}`);
            }
            const data = await response.json();
            console.log(`Successfully loaded ${filename}:`, data);
            return data;
        } catch (error) {
            console.error(`Error loading ${filename}:`, error);
            return null;
        }
    }

    async loadHeroContent() {
        const content = await this.loadMarkdownFile('hero.md');
        const element = document.getElementById('hero-description');
        if (element) {
            element.innerHTML = content;
        }
    }

    async loadAboutContent() {
        const content = await this.loadMarkdownFile('about.md');
        const element = document.getElementById('about-content');
        if (element) {
            element.innerHTML = content;
        }

        // Load stats
        const stats = await this.loadJSONFile('stats.json');
        if (stats) {
            const statNumbers = document.querySelectorAll('.stat-number');
            const statLabels = document.querySelectorAll('.stat-label');
            
            if (stats.publications !== undefined) {
                statNumbers[0]?.setAttribute('data-target', stats.publications);
            }
            if (stats.projects !== undefined) {
                statNumbers[1]?.setAttribute('data-target', stats.projects);
            }
            if (stats.experience !== undefined) {
                statNumbers[2]?.setAttribute('data-target', stats.experience);
            }
        }
    }

    async loadEducationContent() {
        console.log('Loading education content...');
        const education = await this.loadJSONFile('education.json');
        const container = document.getElementById('education-timeline');
        
        if (!education) {
            console.error('Education data is null or empty');
            return;
        }
        
        if (!container) {
            console.error('Education container not found');
            return;
        }

        container.innerHTML = education.map((edu, index) => `
            <div class="education-item">
                <div class="education-content fade-in visible">
                    <span class="education-period">${edu.period}</span>
                    <h3 class="education-degree">${edu.degree}</h3>
                    <p class="education-institution">${edu.institution}</p>
                    <p class="education-location">${edu.location}</p>
                    ${edu.description ? `<p class="education-description">${edu.description}</p>` : ''}
                    ${edu.achievements && edu.achievements.length > 0 ? `
                        <ul class="education-achievements">
                            ${edu.achievements.map(achievement => `<li>${achievement}</li>`).join('')}
                        </ul>
                    ` : ''}
                </div>
                <div class="education-marker"></div>
            </div>
        `).join('');
        
        console.log(`Education content loaded successfully: ${education.length} degrees`);
    }

    async loadExperienceContent() {
        console.log('Loading experience content...');
        const experience = await this.loadJSONFile('experience.json');
        const container = document.getElementById('experience-timeline');
        
        if (!experience) {
            console.error('Experience data is null or empty');
            return;
        }
        
        if (!container) {
            console.error('Experience container not found');
            return;
        }

        container.innerHTML = experience.map((exp, index) => `
            <div class="experience-item">
                <div class="experience-content fade-in visible">
                    <span class="experience-period">${exp.period}</span>
                    <h3 class="experience-position">${exp.position}</h3>
                    <p class="experience-company">${exp.company}</p>
                    <p class="experience-location">${exp.location}</p>
                    ${exp.description ? `<p class="experience-description">${exp.description}</p>` : ''}
                    ${exp.achievements && exp.achievements.length > 0 ? `
                        <ul class="experience-achievements">
                            ${exp.achievements.map(achievement => `<li>${achievement}</li>`).join('')}
                        </ul>
                    ` : ''}
                    ${exp.technologies && exp.technologies.length > 0 ? `
                        <div class="experience-technologies">
                            ${exp.technologies.map(tech => `<span class="experience-tech">${tech}</span>`).join('')}
                        </div>
                    ` : ''}
                </div>
                <div class="experience-marker"></div>
            </div>
        `).join('');
        
        console.log(`Experience content loaded successfully: ${experience.length} positions`);
    }

    async loadResearchContent() {
        console.log('Loading research content...');
        const research = await this.loadJSONFile('research.json');
        const container = document.getElementById('research-grid');
        
        if (!research) {
            console.error('Research data is null or empty');
            return;
        }
        
        if (!container) {
            console.error('Research container not found');
            return;
        }

        container.innerHTML = research.map(item => `
            <div class="research-item fade-in visible">
                <div class="research-icon">
                    <i class="${item.icon}"></i>
                </div>
                <h3 class="research-title">${item.title}</h3>
                <p class="research-description">${item.description}</p>
            </div>
        `).join('');
        
        console.log('Research content loaded successfully');
    }

    async loadProjectsContent() {
        console.log('Loading projects content...');
        const projects = await this.loadJSONFile('projects.json');
        const container = document.getElementById('projects-grid');
        
        if (!projects) {
            console.error('Projects data is null or empty');
            return;
        }
        
        if (!container) {
            console.error('Projects container not found');
            return;
        }

        container.innerHTML = projects.map(project => `
            <div class="project-card fade-in visible">
                <div class="project-image">
                    ${project.image ? `<img src="${project.image}" alt="${project.title}">` : `<i class="${project.icon || 'fas fa-code'}"></i>`}
                </div>
                <div class="project-content">
                    <h3 class="project-title">${project.title}</h3>
                    <p class="project-description">${project.description}</p>
                    <div class="project-tags">
                        ${project.tags.map(tag => `<span class="project-tag">${tag}</span>`).join('')}
                    </div>
                    <div class="project-links">
                        ${project.github ? `<a href="${project.github}" target="_blank"><i class="fab fa-github"></i> Code</a>` : ''}
                        ${project.demo ? `<a href="${project.demo}" target="_blank"><i class="fas fa-external-link-alt"></i> Demo</a>` : ''}
                        ${project.paper ? `<a href="${project.paper}" target="_blank"><i class="fas fa-file-pdf"></i> Paper</a>` : ''}
                    </div>
                </div>
            </div>
        `).join('');
        
        console.log(`Projects content loaded successfully: ${projects.length} projects`);
    }

    async loadPublicationsContent() {
        const publications = await this.loadJSONFile('publications.json');
        const container = document.getElementById('publications-list');
        
        if (!publications || !container) return;

        container.innerHTML = publications.map(pub => `
            <div class="publication-item fade-in visible">
                <h3 class="publication-title">${pub.title}</h3>
                <p class="publication-authors">${pub.authors}</p>
                <p class="publication-venue">${pub.venue} ${pub.year}</p>
                <div class="publication-links">
                    ${pub.pdf ? `<a href="${pub.pdf}" target="_blank"><i class="fas fa-file-pdf"></i> PDF</a>` : ''}
                    ${pub.doi ? `<a href="${pub.doi}" target="_blank"><i class="fas fa-external-link-alt"></i> DOI</a>` : ''}
                    ${pub.bibtex ? `<a href="${pub.bibtex}" target="_blank"><i class="fas fa-quote-right"></i> BibTeX</a>` : ''}
                </div>
            </div>
        `).join('');
    }

    async loadAchievementsContent() {
        const achievements = await this.loadJSONFile('achievements.json');
        const container = document.getElementById('achievements-timeline');
        
        if (!achievements || !container) return;

        container.innerHTML = achievements.map((achievement, index) => `
            <div class="achievement-item">
                <div class="achievement-content fade-in visible">
                    <span class="achievement-date">${achievement.date}</span>
                    <h3 class="achievement-title">${achievement.title}</h3>
                    <p class="achievement-description">${achievement.description}</p>
                </div>
                <div class="achievement-marker"></div>
            </div>
        `).join('');
    }

    async loadNewsContent() {
        const news = await this.loadJSONFile('news.json');
        const container = document.getElementById('news-grid');
        
        if (!news || !container) return;

        container.innerHTML = news.slice(0, 6).map(item => `
            <div class="news-item fade-in visible">
                <div class="news-content">
                    <span class="news-date">${item.date}</span>
                    <h3 class="news-title">${item.title}</h3>
                    <p class="news-description">${item.description}</p>
                </div>
            </div>
        `).join('');
    }

    async loadBlogContent() {
        const blogs = await this.loadJSONFile('blog.json');
        const container = document.getElementById('blog-grid');
        
        if (!blogs || !container) return;

        container.innerHTML = blogs.slice(0, 6).map(blog => `
            <div class="blog-card fade-in visible">
                <div class="blog-image">
                    ${blog.image ? `<img src="${blog.image}" alt="${blog.title}">` : '<i class="fas fa-blog"></i>'}
                </div>
                <div class="blog-content">
                    <span class="blog-date">${blog.date}</span>
                    <h3 class="blog-title">${blog.title}</h3>
                    <p class="blog-excerpt">${blog.excerpt}</p>
                    <a href="${blog.url}" class="blog-link" target="_blank">Read More</a>
                </div>
            </div>
        `).join('');
    }

    async loadContactContent() {
        const contact = await this.loadJSONFile('contact.json');
        if (!contact) return;

        const emailElement = document.getElementById('contact-email');
        const locationElement = document.getElementById('contact-location');

        if (emailElement && contact.email) {
            emailElement.textContent = contact.email;
        }
        if (locationElement && contact.location) {
            locationElement.textContent = contact.location;
        }
    }

    async loadSocialLinks() {
        const social = await this.loadJSONFile('social.json');
        if (!social) return;

        // Update all social links
        const socialLinks = document.querySelectorAll('[data-social]');
        socialLinks.forEach(link => {
            const platform = link.getAttribute('data-social');
            if (social[platform]) {
                link.href = social[platform];
            }
        });
    }

    setupEventListeners() {
        // Projects scroll buttons
        this.setupProjectsScrolling();

        // Smooth scrolling for anchor links
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', function (e) {
                e.preventDefault();
                const target = document.querySelector(this.getAttribute('href'));
                if (target) {
                    target.scrollIntoView({
                        behavior: 'smooth',
                        block: 'start'
                    });
                }
            });
        });
    }

    handleContactForm(e) {
        e.preventDefault();
        
        // Show loading state
        const submitBtn = e.target.querySelector('button[type="submit"]');
        const originalText = submitBtn.textContent;
        submitBtn.textContent = 'Sending...';
        submitBtn.disabled = true;

        // Get form data
        const formData = new FormData(e.target);
        const data = Object.fromEntries(formData);

        // Simulate form submission (replace with actual endpoint)
        setTimeout(() => {
            alert('Thank you for your message! I\'ll get back to you soon.');
            e.target.reset();
            submitBtn.textContent = originalText;
            submitBtn.disabled = false;
        }, 2000);
    }

    setupProjectsScrolling() {
        const projectsGrid = document.getElementById('projects-grid');
        const scrollLeftBtn = document.getElementById('scroll-left');
        const scrollRightBtn = document.getElementById('scroll-right');

        if (!projectsGrid || !scrollLeftBtn || !scrollRightBtn) return;

        const scrollAmount = 370; // Card width + gap

        scrollLeftBtn.addEventListener('click', () => {
            projectsGrid.scrollBy({
                left: -scrollAmount,
                behavior: 'smooth'
            });
        });

        scrollRightBtn.addEventListener('click', () => {
            projectsGrid.scrollBy({
                left: scrollAmount,
                behavior: 'smooth'
            });
        });

        // Update button states based on scroll position
        const updateScrollButtons = () => {
            const { scrollLeft, scrollWidth, clientWidth } = projectsGrid;
            
            scrollLeftBtn.disabled = scrollLeft <= 0;
            scrollRightBtn.disabled = scrollLeft >= scrollWidth - clientWidth - 1;
        };

        projectsGrid.addEventListener('scroll', updateScrollButtons);
        
        // Initial button state
        setTimeout(updateScrollButtons, 1000); // Wait for content to load
    }

    showLoadingSpinner() {
        const spinner = document.getElementById('loading-spinner');
        if (spinner) {
            spinner.classList.add('active');
        }
    }

    hideLoadingSpinner() {
        const spinner = document.getElementById('loading-spinner');
        if (spinner) {
            spinner.classList.remove('active');
        }
    }
}

// Initialize the portfolio site when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    new PortfolioSite();
});

// Additional utility functions
window.portfolioUtils = {
    // Function to add new blog post
    addBlogPost: function(post) {
        const container = document.getElementById('blog-grid');
        if (!container) return;
        
        const blogCard = document.createElement('div');
        blogCard.className = 'blog-card fade-in';
        blogCard.innerHTML = `
            <div class="blog-image">
                ${post.image ? `<img src="${post.image}" alt="${post.title}">` : '<i class="fas fa-blog"></i>'}
            </div>
            <div class="blog-content">
                <span class="blog-date">${post.date}</span>
                <h3 class="blog-title">${post.title}</h3>
                <p class="blog-excerpt">${post.excerpt}</p>
                <a href="${post.url}" class="blog-link" target="_blank">Read More</a>
            </div>
        `;
        
        container.insertBefore(blogCard, container.firstChild);
    },

    // Function to add news item
    addNewsItem: function(news) {
        const container = document.getElementById('news-grid');
        if (!container) return;
        
        const newsItem = document.createElement('div');
        newsItem.className = 'news-item fade-in';
        newsItem.innerHTML = `
            <div class="news-content">
                <span class="news-date">${news.date}</span>
                <h3 class="news-title">${news.title}</h3>
                <p class="news-description">${news.description}</p>
            </div>
        `;
        
        container.insertBefore(newsItem, container.firstChild);
    },

    // Function to update stats
    updateStats: function(stats) {
        const statNumbers = document.querySelectorAll('.stat-number');
        if (stats.publications !== undefined && statNumbers[0]) {
            statNumbers[0].setAttribute('data-target', stats.publications);
            statNumbers[0].textContent = stats.publications;
        }
        if (stats.projects !== undefined && statNumbers[1]) {
            statNumbers[1].setAttribute('data-target', stats.projects);
            statNumbers[1].textContent = stats.projects;
        }
        if (stats.experience !== undefined && statNumbers[2]) {
            statNumbers[2].setAttribute('data-target', stats.experience);
            statNumbers[2].textContent = stats.experience;
        }
    }
};