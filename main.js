document.addEventListener('DOMContentLoaded', () => {
    // Reveal elements on scroll
    const revealElements = document.querySelectorAll('.reveal');

    // Add initial active class to elements already in viewport
    setTimeout(() => {
        document.querySelectorAll('.hero-content.reveal, .hero-mockup-cluster.reveal').forEach(el => {
            el.classList.add('active');
        });
    }, 100);

    const revealObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('active');
                observer.unobserve(entry.target);
            }
        });
    }, {
        root: null,
        rootMargin: '0px',
        threshold: 0.1
    });

    revealElements.forEach(el => {
        if (!el.classList.contains('hero-content') && !el.classList.contains('hero-mockup-cluster')) {
            revealObserver.observe(el);
        }
    });

    // Navbar scroll effect for blur/shadows
    const navbar = document.getElementById('navbar');
    if (navbar) {
        window.addEventListener('scroll', () => {
            if (window.scrollY > 30) {
                navbar.classList.add('scrolled');
            } else {
                navbar.classList.remove('scrolled');
            }
        });
    }

    // Smooth scroll for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;

            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                const navHeight = navbar ? navbar.offsetHeight : 0;
                const elementPosition = targetElement.getBoundingClientRect().top;
                const offsetPosition = elementPosition + window.pageYOffset - navHeight - 20; // 20px extra padding

                window.scrollTo({
                    top: offsetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });

    // FAQ Accordion functionality
    const faqItems = document.querySelectorAll('.faq-item');
    faqItems.forEach(item => {
        const question = item.querySelector('.faq-question');
        question.addEventListener('click', () => {
            // Close other items
            faqItems.forEach(otherItem => {
                if (otherItem !== item) {
                    otherItem.classList.remove('active');
                }
            });
            // Toggle current item
            item.classList.toggle('active');
        });
    });
});
