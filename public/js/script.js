// script.js - Enhanced Navigation & UI Behavior
document.addEventListener('DOMContentLoaded', () => {

    /* ============================================================
       Prevent FOUT (Flash of Unstyled Text)
    ============================================================ */
    if (document.fonts?.ready) {
        document.fonts.ready.then(() => document.body.classList.remove('js-loading'));
    } else {
        setTimeout(() => document.body.classList.remove('js-loading'), 100);
    }


    /* ============================================================
       Header Scroll Behavior (Shrink + Hide on Downscroll)
    ============================================================ */
    const header = document.querySelector('.header');
    let lastScrollY = window.scrollY;
    let ticking = false;

    const updateHeader = () => {
        const y = window.scrollY;

        // Shrink state
        header.classList.toggle('scrolled', y > 100);

        // Hide on downward fast scroll
        if (y > lastScrollY && y > 200) {
            header.classList.add('hidden');
        } else {
            header.classList.remove('hidden');
        }

        lastScrollY = y;
        ticking = false;
    };

    window.addEventListener('scroll', () => {
        if (!ticking) {
            requestAnimationFrame(updateHeader);
            ticking = true;
        }
    });


    /* ============================================================
       Desktop Mega Menu
    ============================================================ */
    const menuTrigger = document.querySelector('.menu-trigger');
    const megaMenu = document.querySelector('.mega-menu');

    if (menuTrigger && megaMenu) {
        menuTrigger.addEventListener('click', e => {
            if (window.innerWidth <= 768) return;
            e.stopPropagation();
            menuTrigger.classList.toggle('active');
            megaMenu.classList.toggle('active');
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


    /* ============================================================
       Mobile Menu
    ============================================================ */
    const mobileMenu = document.querySelector('.mobile-menu');
    const mobileMenuTrigger = document.querySelector('.mobile-menu-trigger');
    const mobileMenuClose = document.querySelector('.mobile-menu-close');
    const mobileLinks = document.querySelectorAll('.mobile-nav-links a');

    const openMobileMenu = () => {
        mobileMenu.classList.add('active');
        document.body.style.overflow = 'hidden';

        mobileMenuTrigger.classList.add('active');
        mobileMenuTrigger.style.background = 'rgba(45, 90, 75, 0.1)';
        mobileMenuTrigger.style.color = 'var(--forest-green)';
    };

    const closeMobileMenu = () => {
        mobileMenu.classList.remove('active');
        document.body.style.overflow = '';

        // ⭐ Reset scroll so menu always opens from the top
        mobileMenu.scrollTop = 0;

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
        if (
            window.innerWidth <= 768 &&
            mobileMenu.classList.contains('active') &&
            !mobileMenu.contains(e.target) &&
            !mobileMenuTrigger.contains(e.target)
        ) {
            closeMobileMenu();
        }
    });

    document.addEventListener('keydown', e => {
        if (e.key === 'Escape' && mobileMenu.classList.contains('active')) {
            closeMobileMenu();
        }
    });


    /* ============================================================
       Sync Mobile Menu Position to Header Height
       (Eliminates the gap when header shrinks)
    ============================================================ */
    if (header && mobileMenu) {
        const updateMenuOffset = () => {
            const h = header.offsetHeight;
            mobileMenu.style.top = `${h}px`;
            mobileMenu.style.height = `calc(100vh - ${h}px)`;
        };

        const observer = new ResizeObserver(updateMenuOffset);
        observer.observe(header);

        window.addEventListener('scroll', updateMenuOffset);
        window.addEventListener('resize', updateMenuOffset);

        updateMenuOffset();
    }


    /* ============================================================
       Search Trigger (placeholder)
    ============================================================ */
    const searchTrigger = document.querySelector('.search-trigger');
    if (searchTrigger) {
        searchTrigger.addEventListener('click', () => {
            alert('Search functionality coming soon!');
        });
    }


    /* ============================================================
       Smooth Scrolling for Anchors
    ============================================================ */
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', e => {
            e.preventDefault();
            const target = document.querySelector(anchor.getAttribute('href'));
            target?.scrollIntoView({ behavior: 'smooth', block: 'start' });
        });
    });


    /* ============================================================
       Newsletter Form
    ============================================================ */
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


    /* ============================================================
       Card Hover
    ============================================================ */
    document.querySelectorAll('.card').forEach(card => {
        card.addEventListener('mouseenter', () => {
            card.style.transition = 'transform 0.3s ease';
        });
        card.addEventListener('mouseleave', () => {
            card.style.transition = 'transform 0.3s ease';
        });
    });
});
