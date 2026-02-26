document.addEventListener('DOMContentLoaded', () => {
    // 1. Hero Setup - Animate Text sequentially
    setTimeout(() => {
        const heroElements = document.querySelectorAll('.animate-reveal');
        heroElements.forEach((el) => {
            el.classList.add('revealed');
        });
    }, 100);

    // 2. Timeline Animation Logic
    const timelineBg = document.querySelector('.timeline-bg');
    let scrollPos = 0;

    // Simulate smooth back-and-forth automatic panning of the timeline
    let startTime = Date.now();
    function animateTimeline() {
        let elapsedTime = Date.now() - startTime;
        // Math.sin creates a smooth wave between -1 and 1.
        // We divide by 4000 to slow down the panning speed.
        let wave = Math.sin(elapsedTime / 4000);

        // Center the pan at -150px, moving left and right by 100px.
        // This ensures the 200% width background never shows its edge.
        let panX = -150 + (wave * 100);

        if (timelineBg) {
            // Translate the timeline horizontally while keeping the cinematic perspective angle
            timelineBg.style.transform = `perspective(1200px) rotateX(12deg) rotateY(-6deg) rotateZ(2deg) scale(0.95) translateX(${panX}px)`;
        }
        requestAnimationFrame(animateTimeline);
    }
    animateTimeline();


    // 3. Scroll Reveal Animations (Intersection Observer)
    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.15 // Trigger when 15% of element is in view
    };

    const revealObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('in-view');
                // Optional: Unobserve after revealing to animate only once
                // observer.unobserve(entry.target); 
            }
        });
    }, observerOptions);

    const animatedElements = document.querySelectorAll('.fade-up, .fade-left, .fade-right');
    animatedElements.forEach(el => revealObserver.observe(el));

    // 4. Parallax effect for timeline background on scroll
    window.addEventListener('scroll', () => {
        scrollPos = window.scrollY;
        // Optionally add subtle parallax mapping
        const overlay = document.querySelector('.glass-overlay');
        if (overlay && scrollPos < window.innerHeight) {
            // Darken slightly on scroll
            const opacity = Math.min(0.95, 0.4 + (scrollPos / window.innerHeight) * 0.55);
            overlay.style.background = `radial-gradient(circle at center, rgba(5,6,12,${opacity}) 0%, rgba(5,6,12,0.95) 80%)`;
        }
    });

    // 5. FAQ Accordion Logic
    const faqItems = document.querySelectorAll('.faq-item');
    faqItems.forEach(item => {
        const question = item.querySelector('.faq-question');
        question.addEventListener('click', () => {
            const isActive = item.classList.contains('active');

            // Close all other items
            faqItems.forEach(otherItem => {
                otherItem.classList.remove('active');
            });

            // Toggle current item
            if (!isActive) {
                item.classList.add('active');
            }
        });
    });
});
