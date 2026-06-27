/**
 * Lokesh Solanki Portfolio — Global JavaScript
 * Typing effect, mobile nav, scroll reveals, contact form
 */

(function () {
    'use strict';

    /* --- Mobile Navigation --- */
    function initNav() {
        const toggle = document.getElementById('navToggle');
        const navLinks = document.getElementById('navLinks');

        if (!toggle || !navLinks) return;

        toggle.addEventListener('click', function () {
            const isOpen = navLinks.classList.toggle('open');
            toggle.setAttribute('aria-expanded', String(isOpen));
        });

        // Close menu when a link is clicked
        navLinks.querySelectorAll('.nav-link').forEach(function (link) {
            link.addEventListener('click', function () {
                navLinks.classList.remove('open');
                toggle.setAttribute('aria-expanded', 'false');
            });
        });

        // Close menu on outside click
        document.addEventListener('click', function (e) {
            if (!toggle.contains(e.target) && !navLinks.contains(e.target)) {
                navLinks.classList.remove('open');
                toggle.setAttribute('aria-expanded', 'false');
            }
        });
    }

    /* --- Typing Effect (Home page) --- */
    function initTypingEffect() {
        const typingEl = document.getElementById('typingText');
        if (!typingEl) return;

        let roles;
        try {
            roles = JSON.parse(document.body.dataset.typingRoles || '[]');
        } catch {
            roles = [
                'AWS Solutions Architect Intern',
                'DevOps Enthusiast',
                'Cloud Builder'
            ];
        }

        if (!roles.length) return;

        let roleIndex = 0;
        let charIndex = 0;
        let isDeleting = false;
        let reflectTimer = null;
        const typeSpeed = 70;
        const deleteSpeed = 40;
        const pauseEnd = 2000;
        const pauseStart = 400;

        function triggerTypingReflect() {
            typingEl.classList.add('typing-reflect');
            clearTimeout(reflectTimer);
            reflectTimer = setTimeout(function () {
                typingEl.classList.remove('typing-reflect');
            }, 180);
        }

        function type() {
            const currentRole = roles[roleIndex];

            if (isDeleting) {
                typingEl.textContent = currentRole.substring(0, charIndex - 1);
                charIndex--;
            } else {
                typingEl.textContent = currentRole.substring(0, charIndex + 1);
                charIndex++;
            }

            triggerTypingReflect();

            let delay = isDeleting ? deleteSpeed : typeSpeed;

            if (!isDeleting && charIndex === currentRole.length) {
                delay = pauseEnd;
                isDeleting = true;
            } else if (isDeleting && charIndex === 0) {
                isDeleting = false;
                roleIndex = (roleIndex + 1) % roles.length;
                delay = pauseStart;
            }

            setTimeout(type, delay);
        }

        type();
    }

    /* --- Scroll Reveal --- */
    function initScrollReveal() {
        const reveals = document.querySelectorAll('.reveal');
        if (!reveals.length) return;

        const observer = new IntersectionObserver(
            function (entries) {
                entries.forEach(function (entry) {
                    if (entry.isIntersecting) {
                        entry.target.classList.add('visible');
                        observer.unobserve(entry.target);
                    }
                });
            },
            { threshold: 0.12, rootMargin: '0px 0px -40px 0px' }
        );

        reveals.forEach(function (el) {
            observer.observe(el);
        });
    }

    /* --- Contact Form --- */
    function initContactForm() {
        const form = document.getElementById('contactForm');
        if (!form) return;

        const feedback = document.getElementById('formFeedback');
        const submitBtn = document.getElementById('submitBtn');

        form.addEventListener('submit', async function (e) {
            e.preventDefault();

            // Client-side validation
            const name = form.name.value.trim();
            const email = form.email.value.trim();
            const subject = form.subject.value.trim();
            const message = form.message.value.trim();

            if (!name || !email || !subject || !message) {
                showFeedback('Please fill in all required fields.', 'error');
                return;
            }

            const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailPattern.test(email)) {
                showFeedback('Please enter a valid email address.', 'error');
                return;
            }

            submitBtn.disabled = true;
            submitBtn.textContent = 'Sending...';
            showFeedback('', '');

            const payload = { name, email, subject, message };

            try {
                const response = await fetch('/contact', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify(payload)
                });

                const data = await response.json();

                if (response.ok && data.status === 'success') {
                    showFeedback('Message sent successfully! I\'ll get back to you soon.', 'success');
                    form.reset();
                } else {
                    showFeedback(data.message || 'Something went wrong. Please try again.', 'error');
                }
            } catch {
                showFeedback('Network error. Please check your connection and try again.', 'error');
            } finally {
                submitBtn.disabled = false;
                submitBtn.textContent = 'Send Message';
            }
        });

        function showFeedback(message, type) {
            if (!feedback) return;
            feedback.textContent = message;
            feedback.className = 'form-feedback' + (type ? ' ' + type : '');
        }
    }

    /* --- Init on DOM ready --- */
    document.addEventListener('DOMContentLoaded', function () {
        initNav();
        initTypingEffect();
        initScrollReveal();
        initContactForm();
    });
})();
