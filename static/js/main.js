// ========================================
// MAIN JAVASCRIPT
// ========================================

(function() {
    console.log('=== BURGER MENU INITIALIZATION ===');
    
    // ========================================
    // BURGER MENU
    // ========================================
    const burgerBtn = document.querySelector('.burger-btn');
    const burgerMenu = document.querySelector('.burger-menu');
    const burgerOverlay = document.querySelector('.burger-overlay');
    const burgerClose = document.querySelector('.burger-menu__close');
    
    console.log('Elements found:', {
        burgerBtn: !!burgerBtn,
        burgerMenu: !!burgerMenu,
        burgerOverlay: !!burgerOverlay,
        burgerClose: !!burgerClose
    });
    
    if (burgerBtn && burgerMenu) {
        // Open menu
        function openBurgerMenu() {
            console.log('Opening burger menu...');
            burgerBtn.classList.add('active');
            burgerMenu.classList.add('active');
            burgerOverlay.classList.add('active');
            document.body.style.overflow = 'hidden';
            console.log('Classes added, menu should be visible');
        }
        
        // Close menu
        function closeBurgerMenu() {
            console.log('Closing burger menu...');
            burgerBtn.classList.remove('active');
            burgerMenu.classList.remove('active');
            burgerOverlay.classList.remove('active');
            document.body.style.overflow = '';
        }
        
        // Toggle on button click
        burgerBtn.addEventListener('click', function(e) {
            e.preventDefault();
            e.stopPropagation();
            console.log('Burger button clicked!');
            if (burgerMenu.classList.contains('active')) {
                closeBurgerMenu();
            } else {
                openBurgerMenu();
            }
        });
        
        // Close on overlay click
        if (burgerOverlay) {
            burgerOverlay.addEventListener('click', function(e) {
                console.log('Overlay clicked, closing menu');
                closeBurgerMenu();
            });
        }
        
        // Close on X button
        if (burgerClose) {
            burgerClose.addEventListener('click', function(e) {
                e.preventDefault();
                console.log('Close button clicked');
                closeBurgerMenu();
            });
        }
        
        // Close on menu link click with smooth scroll
        burgerMenu.querySelectorAll('.burger-menu__link').forEach(link => {
            link.addEventListener('click', function(e) {
                console.log('Menu link clicked:', this.textContent);
                closeBurgerMenu();
            });
        });
        
        console.log('Burger menu event listeners attached');
    } else {
        console.error('Burger menu elements NOT found!');
    }
    
    // Smooth Scroll for Anchor Links
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
    
    // Header Scroll Effect - Enhanced
    let lastScroll = 0;
    const header = document.querySelector('.header--landing');
    
    if (header) {
        window.addEventListener('scroll', () => {
            const currentScroll = window.pageYOffset;
            
            if (currentScroll > 50) {
                header.classList.add('scrolled');
            } else {
                header.classList.remove('scrolled');
            }
            
            lastScroll = currentScroll;
        });
    }
    
    console.log('Main JS initialized successfully');
})();

// // ========================================
// // CALENDAR TOGGLE FUNCTION
// // ========================================

// function toggleMonth(element) {
//     const infoDiv = element.nextElementSibling;
    
//     if (infoDiv && infoDiv.classList.contains('info')) {
//         // Check if current month is already open
//         const isOpen = element.classList.contains('open');
        
//         // Close all months first
//         document.querySelectorAll('.month').forEach(month => {
//             month.classList.remove('open');
//             const otherInfo = month.nextElementSibling;
//             if (otherInfo && otherInfo.classList.contains('info')) {
//                 otherInfo.style.display = 'none';
//             }
//         });
        
//         // If it wasn't open before, open it now
//         if (!isOpen) {
//             element.classList.add('open');
//             infoDiv.style.display = 'block';
//         }
//     }
// }

// ========================================
// FAQ TOGGLE
// ========================================
function findTitle(node) {
    while (node) {
        if (node.nodeType === 1 && node.classList.contains('title')) {
            return node;
        }
        node = node.parentNode;
    }
    return null;
}

function toggleFaq(target) {
    try {
        if (!target) return;

        let node;
        if (target instanceof Event) {
            node = target.target;
        } else if (target && typeof target === 'object') {
            node = target;
        } else {
            return;
        }

        const title = findTitle(node);
        if (!title) return;

        const item = title.closest('.item');
        if (!item) return;

        const content = item.querySelector('.text');
        if (!content) return;

        const section = item.closest('.section-10');
        const allItems = section ? section.querySelectorAll('.item') : [];

        allItems.forEach(i => {
            if (i !== item) {
                i.classList.remove('open');
                const t = i.querySelector('.text');
                if (t) t.style.maxHeight = '0';
            }
        });

        const isOpen = item.classList.contains('open');

        if (isOpen) {
            item.classList.remove('open');
            content.style.maxHeight = '0';
        } else {
            item.classList.add('open');
            content.style.maxHeight = content.scrollHeight + 'px';
        }
    } catch (e) {
        console.error('toggleFaq error:', e);
    }
}

// Event delegation for FAQ titles
function initFaqToggle() {
    document.querySelectorAll('.section-10 .item .title').forEach(title => {
        title.removeAttribute('onclick');
        title.addEventListener('click', function(event) {
            event.preventDefault();
            toggleFaq(event);
        });
    });
}

if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initFaqToggle);
} else {
    initFaqToggle();
}

// ========================================
// POPUP FUNCTIONS
// ========================================

function openPopup(popupName) {
    const popup = document.getElementById(`popup-${popupName}`);
    if (popup) {
        popup.classList.add('active');
        document.body.style.overflow = 'hidden';
    }
}

function closePopup(popupName) {
    const popup = document.getElementById(`popup-${popupName}`);
    if (popup) {
        popup.classList.remove('active');
        document.body.style.overflow = '';
    }
}

// Close popup on background click
document.querySelectorAll('.mc_popup').forEach(popup => {
    popup.addEventListener('click', function(e) {
        if (e.target === this) {
            this.classList.remove('active');
            document.body.style.overflow = '';
        }
    });
});


// // ========================================
// // SWIPER INITIALIZATION (for reviews section)
// // ========================================

// let reviewsSwiper = null;

// function initSwiper() {
//     if (document.querySelector('.reviews-swiper')) {
//         reviewsSwiper = new Swiper('.reviews-swiper', {
//             slidesPerView: 1,
//             spaceBetween: 20,
//             loop: true, // Бесконечная карусель
//             mousewheel: true, // Поддержка тачпада
//             touchRatio: 1.5, // Улучшенная чувствительность touch
//             grabCursor: true, // Курсор "grab" для лучшего UX
//             navigation: {
//                 nextEl: '.swiper-button-next',
//                 prevEl: '.swiper-button-prev',
//             },
//             pagination: {
//                 el: '.swiper-pagination',
//                 clickable: true,
//             },
//             breakpoints: {
//                 768: {
//                     slidesPerView: 2,
//                     spaceBetween: 30,
//                 },
//                 992: {
//                     slidesPerView: 3,
//                     spaceBetween: 30,
//                 },
//             },
//         });
//     }
// }

// // Initialize swiper when DOM is ready
// if (document.readyState === 'loading') {
//     document.addEventListener('DOMContentLoaded', initSwiper);
// } else {
//     initSwiper();
// }

// ========================================
// SECTION FUNCTIONS
// ========================================

// // Toggle Calendar Month
// function toggleMonth(element) {
//     element.classList.toggle('active');
//     const info = element.nextElementSibling;
//     if (info) {
//         info.classList.toggle('active');
//     }
// }

// Toggle FAQ
function toggleFaq(element) {
    const item = element.closest('.faq-item');
    item.classList.toggle('open');
}

// Package Buttons
[...document.querySelectorAll('.package-btn'), ...document.querySelectorAll('.package__btn')].forEach(btn => {
    btn.addEventListener('click', function() {
        openPopup('callback');
    });
});

// ========================================
// TEXT TOGGLE FOR REVIEWS
// ========================================

document.querySelectorAll('.text-toggle').forEach(button => {
    button.addEventListener('click', function() {
        const textElement = this.previousElementSibling;
        const isExpanded = this.getAttribute('aria-expanded') === 'true';

        if (isExpanded) {
            // Скрыть полный текст
            textElement.style.display = '-webkit-box';
            textElement.style.webkitLineClamp = '3';
            textElement.style.webkitBoxOrient = 'vertical';
            textElement.style.overflow = 'hidden';
            this.setAttribute('aria-expanded', 'false');
            this.textContent = 'Читать весь отзыв';
        } else {
            // Показать полный текст
            textElement.style.display = 'block';
            textElement.style.webkitLineClamp = 'unset';
            this.setAttribute('aria-expanded', 'true');
            this.textContent = 'Свернуть отзыв';
        }
    });
});

// ========================================
// GSAP ANIMATIONS FOR REVIEWS SECTION
// ========================================

// Scroll animations for reviews section
function initReviewsAnimations() {
    const reviewsSection = document.querySelector('.section-7');
    if (!reviewsSection) return;

    // Title animation
    gsap.fromTo('.section-7 .middle_title',
        {
            opacity: 0,
            y: 50,
            scale: 0.9
        },
        {
            opacity: 1,
            y: 0,
            scale: 1,
            duration: 1,
            ease: "power2.out",
            scrollTrigger: {
                trigger: '.section-7 .middle_title',
                start: "top 80%",
                end: "bottom 20%",
                toggleActions: "play none none reverse"
            }
        }
    );

    // Navigation buttons animation
    gsap.fromTo('.nav-buttons',
        {
            opacity: 0,
            y: 30
        },
        {
            opacity: 1,
            y: 0,
            duration: 0.8,
            delay: 0.3,
            ease: "power2.out",
            scrollTrigger: {
                trigger: '.nav-buttons',
                start: "top 85%",
                toggleActions: "play none none reverse"
            }
        }
    );

    // Swiper slides stagger animation
    gsap.fromTo('.reviews-swiper .swiper-slide',
        {
            opacity: 0,
            y: 60,
            scale: 0.8
        },
        {
            opacity: 1,
            y: 0,
            scale: 1,
            duration: 0.8,
            stagger: 0.1,
            ease: "back.out(1.7)",
            scrollTrigger: {
                trigger: '.reviews-swiper',
                start: "top 75%",
                toggleActions: "play none none reverse"
            }
        }
    );

    // Parallax effect for background
    gsap.to('.section-7::before', {
        yPercent: -50,
        ease: "none",
        scrollTrigger: {
            trigger: '.section-7',
            start: "top bottom",
            end: "bottom top",
            scrub: true
        }
    });
}

// Initialize reviews animations when DOM is ready
function initReviewsAndPackagesAnimations() {
    initReviewsAnimations();
    initPackagesAnimations();
}

function initPackagesAnimations() {
    const packagesSection = document.querySelector('.section-8');
    if (!packagesSection) return;

    gsap.fromTo('.section-8 h2',
        { opacity: 0, y: 30, scale: 0.96 },
        {
            opacity: 1,
            y: 0,
            scale: 1,
            duration: 0.8,
            ease: 'power2.out',
            scrollTrigger: {
                trigger: '.section-8',
                start: 'top 80%',
                toggleActions: 'play none none reverse'
            }
        }
    );

    gsap.fromTo('.section-8 .head .item',
        { opacity: 0, y: 40, scale: 0.95 },
        {
            opacity: 1,
            y: 0,
            scale: 1,
            duration: 0.8,
            stagger: 0.12,
            ease: 'back.out(1.2)',
            scrollTrigger: {
                trigger: '.section-8 .head',
                start: 'top 85%',
                toggleActions: 'play none none reverse'
            }
        }
    );

    gsap.fromTo('.section-8 .col .item',
        { opacity: 0, y: 50, scale: 0.98 },
        {
            opacity: 1,
            y: 0,
            scale: 1,
            duration: 0.8,
            stagger: 0.15,
            ease: 'power2.out',
            scrollTrigger: {
                trigger: '.section-8 .col',
                start: 'top 80%',
                toggleActions: 'play none none reverse'
            }
        }
    );

    // Parallax effect for section-8 pseudo-background
    gsap.to('.section-8::before', {
        yPercent: -30,
        ease: 'none',
        scrollTrigger: {
            trigger: '.section-8',
            start: 'top bottom',
            end: 'bottom top',
            scrub: true
        }
    });
}

if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initReviewsAndPackagesAnimations);
} else {
    initReviewsAndPackagesAnimations();
}



