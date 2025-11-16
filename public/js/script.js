// script.js - Carbon Slash Functionality
document.addEventListener('DOMContentLoaded', () => {
    // ===== Prevent FOUT (Flash of Unstyled Text) =====
    if (document.fonts && document.fonts.ready) {
        document.fonts.ready.then(() => document.body.classList.remove('js-loading'));
    } else {
        setTimeout(() => document.body.classList.remove('js-loading'), 100);
    }

    // ===== Header Scroll Behavior =====
     const header = document.querySelector('.header');
    if (header) {
        let lastScrollY = window.scrollY;
        let isTicking = false;

        const updateHeader = () => {
            const currentScrollY = window.scrollY;
            const scrolled = currentScrollY > 50;

            // Add 'scrolled' class for visual changes
            header.classList.toggle('scrolled', scrolled);

            // Hide/Show logic for 'hidden' class
            if (currentScrollY > lastScrollY && currentScrollY > 200) {
                // Scrolling Down past 200px
                header.classList.add('hidden');
            } else {
                // Scrolling Up or Near Top
                header.classList.remove('hidden');
            }

            lastScrollY = currentScrollY;
            isTicking = false;
        };

        const onScroll = () => {
            if (!isTicking) {
                requestAnimationFrame(updateHeader);
                isTicking = true;
            }
        };

        window.addEventListener('scroll', onScroll, { passive: true }); // Use passive listener for performance
    }
    // ===== Desktop Mega Menu =====
    const menuTrigger = document.querySelector('.menu-trigger');
    const megaMenu = document.querySelector('.mega-menu');

    if (menuTrigger && megaMenu) {
        menuTrigger.addEventListener('click', e => {
            e.stopPropagation();
            if (window.innerWidth > 768) {
                menuTrigger.classList.toggle('active');
                megaMenu.classList.toggle('active');
            }
        });

        document.addEventListener('click', e => {
            if (
                window.innerWidth > 768 &&
                !megaMenu.contains(e.target) &&
                !menuTrigger.contains(e.target)
            ) {
                menuTrigger.classList.remove('active');
                megaMenu.classList.remove('active');
            }
        });

        document.addEventListener('keydown', e => {
            if (e.key === 'Escape' && window.innerWidth > 768) {
                menuTrigger.classList.remove('active');
                megaMenu.classList.remove('active');
            }
        });
    }

    // ===== Mobile Menu =====
    const mobileMenu = document.querySelector('.mobile-menu');
    const mobileMenuTrigger = document.querySelector('.mobile-menu-trigger');
    const mobileMenuClose = document.querySelector('.mobile-menu-close');
    const mobileLinks = document.querySelectorAll('.mobile-nav-links a');

    const openMobileMenu = () => {
        if (!mobileMenu) return;
        mobileMenu.classList.add('active');
        document.body.style.overflow = 'hidden';

        // visually mark trigger as active
        mobileMenuTrigger.classList.add('active');
        mobileMenuTrigger.style.background = 'rgba(45, 90, 75, 0.1)';
        mobileMenuTrigger.style.color = 'var(--forest-green)';
    };

    const closeMobileMenu = () => {
        if (!mobileMenu) return;
        mobileMenu.classList.remove('active');
        document.body.style.overflow = '';

        // remove any background/glow instantly
        mobileMenuTrigger.classList.remove('active');
        mobileMenuTrigger.style.background = 'none';
        mobileMenuTrigger.style.color = 'var(--true-black)';
        mobileMenuTrigger.blur();
    };

    const toggleMobileMenu = () => {
        mobileMenu.classList.contains('active') ? closeMobileMenu() : openMobileMenu();
    };

    if (mobileMenuTrigger) {
        mobileMenuTrigger.addEventListener('click', e => {
            e.stopPropagation();
            toggleMobileMenu();
        });
    }

    if (mobileMenuClose) {
        mobileMenuClose.addEventListener('click', closeMobileMenu);
    }

    mobileLinks.forEach(link => link.addEventListener('click', closeMobileMenu));

    document.addEventListener('click', e => {
        if (window.innerWidth <= 768 && mobileMenu?.classList.contains('active')) {
            if (!mobileMenu.contains(e.target) && !mobileMenuTrigger.contains(e.target)) {
                closeMobileMenu();
            }
        }
    });

    document.addEventListener('keydown', e => {
        if (e.key === 'Escape' && mobileMenu?.classList.contains('active')) {
            closeMobileMenu();
        }
    });

    // ===== Search Trigger =====
    const searchTrigger = document.querySelector('.search-trigger');
    if (searchTrigger) {
        searchTrigger.addEventListener('click', () => {
            alert('Search functionality coming soon!');
        });
    }

    // ===== Smooth Scrolling =====
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', e => {
            e.preventDefault();
            const target = document.querySelector(anchor.getAttribute('href'));
            target?.scrollIntoView({ behavior: 'smooth', block: 'start' });
        });
    });

    // ===== Newsletter Form =====
    const newsletterForm = document.querySelector('.newsletter-form');
    if (newsletterForm) {
        newsletterForm.addEventListener('submit', e => {
            e.preventDefault();
            const submitButton = newsletterForm.querySelector('button[type="submit"]');
            const originalText = submitButton.textContent;

            submitButton.textContent = 'Subscribed!';
            submitButton.disabled = true;
            newsletterForm.reset();

            setTimeout(() => {
                submitButton.textContent = originalText;
                submitButton.disabled = false;
            }, 3000);
        });
    }

    // ===== Card Hover Effects =====
    document.querySelectorAll('.card').forEach(card => {
        card.addEventListener('mouseenter', () => {
            card.style.transition = 'transform 0.3s ease';
        });
        card.addEventListener('mouseleave', () => {
            card.style.transition = 'transform 0.3s ease';
        });
    });
});
