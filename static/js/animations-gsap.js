// ========================================
// GSAP ANIMATIONS
// ========================================

document.addEventListener('DOMContentLoaded', function() {
    // Register ScrollTrigger
    gsap.registerPlugin(ScrollTrigger);

    // ========================================
    // SECTION 10: CONSULTATION ANIMATIONS
    // ========================================

    // Scroll-triggered animation for consultation section
    gsap.fromTo('.section-9 .info .title h2',
        {
            opacity: 0,
            y: 50
        },
        {
            opacity: 1,
            y: 0,
            duration: 1,
            ease: 'power2.out',
            scrollTrigger: {
                trigger: '.section-9',
                start: 'top 80%',
                end: 'bottom 20%',
                toggleActions: 'play none none reverse'
            }
        }
    );

    gsap.fromTo('.section-9 .giv',
        {
            opacity: 0,
            y: 50,
            scale: 0.8
        },
        {
            opacity: 1,
            y: 0,
            scale: 1,
            duration: 0.8,
            stagger: 0.2,
            ease: 'back.out(1.7)',
            scrollTrigger: {
                trigger: '.section-9 .giv',
                start: 'top 85%',
                toggleActions: 'play none none reverse'
            }
        }
    );

    gsap.fromTo('.section-9 .giv img',
        {
            opacity: 0,
            rotation: -10,
            scale: 0.5
        },
        {
            opacity: 1,
            rotation: 0,
            scale: 1,
            duration: 0.6,
            stagger: 0.2,
            delay: 0.3,
            ease: 'back.out(2)',
            scrollTrigger: {
                trigger: '.section-9 .giv',
                start: 'top 85%',
                toggleActions: 'play none none reverse'
            }
        }
    );

    gsap.fromTo('.section-9 .giv h3',
        {
            opacity: 0,
            x: -30
        },
        {
            opacity: 1,
            x: 0,
            duration: 0.6,
            stagger: 0.2,
            delay: 0.5,
            ease: 'power2.out',
            scrollTrigger: {
                trigger: '.section-9 .giv',
                start: 'top 85%',
                toggleActions: 'play none none reverse'
            }
        }
    );

    gsap.fromTo('.section-9 .giv p',
        {
            opacity: 0,
            x: 30
        },
        {
            opacity: 1,
            x: 0,
            duration: 0.6,
            stagger: 0.2,
            delay: 0.7,
            ease: 'power2.out',
            scrollTrigger: {
                trigger: '.section-9 .giv',
                start: 'top 85%',
                toggleActions: 'play none none reverse'
            }
        }
    );

    gsap.fromTo('.section-9 .mc_button',
        {
            opacity: 0,
            y: 20,
            scale: 0.9
        },
        {
            opacity: 1,
            y: 0,
            scale: 1,
            duration: 0.8,
            delay: 0.4,
            ease: 'back.out(1.7)',
            stagger: 0.1,
            scrollTrigger: {
                trigger: '.section-9',
                start: 'top 80%',
                toggleActions: 'play none none reverse'
            }
        }
    );

    gsap.fromTo('.section-9 .giv',
        {
            opacity: 0,
            x: 50,
            scale: 0.9
        },
        {
            opacity: 1,
            x: 0,
            scale: 1,
            duration: 1,
            delay: 0.6,
            ease: 'power2.out',
            scrollTrigger: {
                trigger: '.section-9',
                start: 'top 80%',
                toggleActions: 'play none none reverse'
            }
        }
    );

    gsap.fromTo('.section-9 .s9-man',
        {
            opacity: 0,
            x: 100
        },
        {
            opacity: 0.8,
            x: 0,
            duration: 1.2,
            delay: 0.8,
            ease: 'power2.out',
            scrollTrigger: {
                trigger: '.section-9',
                start: 'top 80%',
                toggleActions: 'play none none reverse'
            }
        }
    );

    // Hover animations for buttons
    const buttons = document.querySelectorAll('.section-9 .mc_button');

    buttons.forEach(button => {
        button.addEventListener('mouseenter', function() {
            gsap.to(this, {
                scale: 1.05,
                duration: 0.3,
                ease: 'power2.out'
            });
        });

        button.addEventListener('mouseleave', function() {
            gsap.to(this, {
                scale: 1,
                duration: 0.3,
                ease: 'power2.out'
            });
        });
    });

    // Parallax effect for the background image
    gsap.to('.section-9 .s9-man', {
        yPercent: -20,
        ease: 'none',
        scrollTrigger: {
            trigger: '.section-9',
            start: 'top bottom',
            end: 'bottom top',
            scrub: true
        }
    });

    // Micro-animations for the gift box
    gsap.to('.section-9 .giv', {
        rotation: 2,
        duration: 4,
        ease: 'power1.inOut',
        yoyo: true,
        repeat: -1,
        delay: 1
    });
});