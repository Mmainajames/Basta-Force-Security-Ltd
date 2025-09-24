document.addEventListener('DOMContentLoaded', () => {
    // Mobile navigation toggle
    const menuToggle = document.getElementById('menu-toggle');
    const navLinks = document.getElementById('nav-links');

    if (menuToggle && navLinks) {
        menuToggle.addEventListener('click', () => {
            navLinks.classList.toggle('active');
        });
    }

    // Testimonial slider functionality
    const testimonialTrack = document.getElementById('testimonial-track');
    const testimonials = document.querySelectorAll('.testimonial');
    let currentIndex = 0;

    const showNextTestimonial = () => {
        if (!testimonialTrack || testimonials.length === 0) return;

        currentIndex = (currentIndex + 1) % testimonials.length;
        const offset = -currentIndex * testimonials[0].clientWidth;
        testimonialTrack.style.transform = `translateX(${offset}px)`;
    };

    if (testimonials.length > 1) {
        setInterval(showNextTestimonial, 5000); // Change testimonial every 5 seconds
    }

    // Consolidated Fade-in effect on scroll
    const faders = document.querySelectorAll('.fade-in');

    // Set initial styles for all fade-in elements
    faders.forEach(fader => {
        fader.style.opacity = 0;
        fader.style.transform = 'translateY(20px)';
        fader.style.transition = 'opacity 0.8s ease-out, transform 0.8s ease-out';
    });

    const appearOptions = {
        threshold: 0.2, // Trigger when 20% of the section is visible
        rootMargin: "0px 0px -100px 0px" // Start fade-in 100px before reaching the bottom of the viewport
    };

    const appearOnScroll = new IntersectionObserver(function (entries, observer) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = 1;
                entry.target.style.transform = 'translateY(0)';
                observer.unobserve(entry.target); // ensures it only fades in once
            }
        });
    }, appearOptions);

    faders.forEach(fader => {
        appearOnScroll.observe(fader);
    });

    // Form submission handling
    const contactForm = document.getElementById('contact-form');
    if (contactForm) {
        contactForm.addEventListener('submit', function (event) {
            event.preventDefault();

            const name = this.querySelector('input[type="text"]').value;
            const email = this.querySelector('input[type="email"]').value;
            const message = this.querySelector('textarea').value;

            if (name && email && message) {
                alert('Thank you for your message! We will get back to you shortly.');
                this.reset();
            } else {
                alert('Please fill out all fields.');
            }
        });
    }
});