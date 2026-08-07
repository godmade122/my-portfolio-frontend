// Hamburger Menu Toggle
const hamburger = document.getElementById('hamburger');
const navList = document.getElementById('nav-list');

if (hamburger && navList) {
    const closeMobileMenu = () => {
        navList.classList.remove('active');
        hamburger.classList.remove('active');
        hamburger.setAttribute('aria-expanded', 'false');
    };

    const toggleMobileMenu = () => {
        const isOpen = navList.classList.toggle('active');
        hamburger.classList.toggle('active', isOpen);
        hamburger.setAttribute('aria-expanded', String(isOpen));
    };

    hamburger.addEventListener('click', (e) => {
        e.stopPropagation();
        toggleMobileMenu();
    });

    document.querySelectorAll('#nav-list a').forEach((link) => {
        link.addEventListener('click', closeMobileMenu);
    });
}

// Sticky Navbar
window.addEventListener('scroll', () => {
    const header = document.getElementById('header');
    if (window.scrollY > 100) {
        header.classList.add('sticky');
    } else {
        header.classList.remove('sticky');
    }
});

// Dark Mode Toggle
const themeToggle = document.getElementById('theme-toggle');
const body = document.body;

if (themeToggle) {
    themeToggle.addEventListener('click', () => {
        body.classList.toggle('dark');
        const icon = themeToggle.querySelector('i');
        if (body.classList.contains('dark')) {
            icon.classList.remove('fa-moon');
            icon.classList.add('fa-sun');
        } else {
            icon.classList.remove('fa-sun');
            icon.classList.add('fa-moon');
        }
    });
}

// Smooth Scrolling for Anchor Links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
            if (navList && hamburger) {
                navList.classList.remove('active');
                hamburger.classList.remove('active');
            }
        }
    });
});

// Animate sections on scroll
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

document.querySelectorAll('section > .container').forEach(section => {
    section.style.opacity = '0';
    section.style.transform = 'translateY(30px)';
    section.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    observer.observe(section);
});

// WhatsApp Chat Button: builds link from data attributes
(function() {
    const chat = document.getElementById('whatsapp-chat');
    if (!chat) return;
    const raw = chat.dataset.phone || '+15551234567';
    const phone = raw.replace(/\D/g, '');
    const msg = encodeURIComponent(chat.dataset.msg || 'Hi, I have a question about your services.');
    if (phone.length === 0) return;
    chat.href = `https://wa.me/${phone}?text=${msg}`;
    chat.target = '_blank';
    chat.rel = 'noopener noreferrer';
    chat.innerHTML = '<i class="fab fa-whatsapp" aria-hidden="true"></i>';
})();

// Contact Form Submission
const contactForm = document.getElementById('contactForm');

if (contactForm) {
    contactForm.addEventListener('submit', async (e) => {
        e.preventDefault();

        const data = {
            name: contactForm.elements.name.value.trim(),
            email: contactForm.elements.email.value.trim(),
            message: contactForm.elements.message.value.trim(),
        };

        if (!data.name || !data.email || !data.message) {
            alert('Please fill in all fields before sending.');
            return;
        }

        const submitButton = contactForm.querySelector('button[type="submit"]');
        const originalText = submitButton ? submitButton.textContent : '';

        if (submitButton) {
            submitButton.disabled = true;
            submitButton.textContent = 'Sending...';
        }

        try {
            const response = await fetch(window.API_BASE_URL || 'http://localhost:5000/api/contact', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(data)
            });

            const result = await response.json().catch(() => ({}));

            if (!response.ok) {
                throw new Error(result.message || 'Unable to send message.');
            }

            alert(result.message || 'Message sent successfully!');
            contactForm.reset();
        } catch (err) {
            alert(err.message || 'Server Error. Please try again later.');
        } finally {
            if (submitButton) {
                submitButton.disabled = false;
                submitButton.textContent = originalText;
            }
        }
    });
}