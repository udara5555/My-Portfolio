// Mobile Navigation Toggle
const hamburger = document.querySelector('.hamburger');
const navLinks = document.querySelector('.nav-links');
const navLinksItems = document.querySelectorAll('.nav-links li a');

hamburger.addEventListener('click', () => {
    navLinks.classList.toggle('active');
    hamburger.classList.toggle('active');
});

// Close mobile menu when link is clicked
navLinksItems.forEach(item => {
    item.addEventListener('click', () => {
        navLinks.classList.remove('active');
        hamburger.classList.remove('active');
    });
});

// Active Link Highlighting on Scroll
const sections = document.querySelectorAll('section, header');
const navLi = document.querySelectorAll('.nav-links li a');

window.addEventListener('scroll', () => {
    let current = '';

    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;

        // 100px offset to trigger highlight slightly before section hits top
        if (pageYOffset >= (sectionTop - 150)) {
            current = section.getAttribute('id');
        }
    });

    navLi.forEach(a => {
        a.classList.remove('active');
        if (a.getAttribute('href').includes(current)) {
            a.classList.add('active');
        }
    });

    // Glass Nav Scrolled Effect (Optional: add extra blur/opacity on scroll)
    const nav = document.querySelector('.glass-nav');
    if (window.scrollY > 50) {
        nav.style.background = 'rgba(5, 5, 5, 0.9)';
    } else {
        nav.style.background = 'rgba(5, 5, 5, 0.7)';
    }
});

// Scroll Animations (Fade In Up)
const observerOptions = {
    threshold: 0.1,
    rootMargin: "0px 0px -50px 0px"
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
            observer.unobserve(entry.target); // Only animate once
        }
    });
}, observerOptions);

const animatedElements = document.querySelectorAll('.fade-in-up');
animatedElements.forEach(el => observer.observe(el));

// Typing Effect for the Hero Section (Simple implementation)
// Note: CSS simple typing is often better, but for specific word cycling JS is good.
// Currently the HTML has a static gradient text. We can add a simple cursor blink if needed,
// but the current design is clean.

// Video Modal Logic
const modal = document.getElementById('video-modal');
const videoPlayer = document.getElementById('demo-video');
const videoSource = videoPlayer.querySelector('source');
const playButtons = document.querySelectorAll('.play-demo-btn');
const closeBtn = document.querySelector('.close-modal');

playButtons.forEach(btn => {
    btn.addEventListener('click', (e) => {
        e.preventDefault();
        const videoFile = btn.getAttribute('data-video');

        if (videoFile) {
            // Update video source
            videoSource.src = videoFile;
            videoPlayer.load(); // Reload video with new source

            // Show modal
            modal.style.display = 'flex';
            // slight delay to allow display flex to apply before opacity transition
            setTimeout(() => {
                modal.classList.add('show');
                videoPlayer.play();
            }, 10);
        }
    });
});

closeBtn.addEventListener('click', () => {
    closeModal();
});

// Close when clicking outside content
window.addEventListener('click', (e) => {
    if (e.target === modal) {
        closeModal();
    }
});

function closeModal() {
    modal.classList.remove('show');
    videoPlayer.pause();
    setTimeout(() => {
        modal.style.display = 'none';
        videoSource.src = ""; // Reset source
    }, 500); // Wait for transition
}

// Background Particles Animation
const canvas = document.getElementById('bg-canvas');
const ctx = canvas.getContext('2d');

let particles = [];
const particleCount = 50;
const connectionDistance = 150;

function resizeCanvas() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
}

window.addEventListener('resize', resizeCanvas);
resizeCanvas();

class Particle {
    constructor() {
        this.x = Math.random() * canvas.width;
        this.y = Math.random() * canvas.height;
        this.vx = (Math.random() - 0.5) * 0.5;
        this.vy = (Math.random() - 0.5) * 0.5;
        this.size = Math.random() * 2;
        this.color = 'rgba(0, 210, 255, ' + (Math.random() * 0.5 + 0.1) + ')'; // Accent color
    }

    update() {
        this.x += this.vx;
        this.y += this.vy;

        if (this.x < 0 || this.x > canvas.width) this.vx *= -1;
        if (this.y < 0 || this.y > canvas.height) this.vy *= -1;
    }

    draw() {
        ctx.fillStyle = this.color;
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fill();
    }
}

function initParticles() {
    particles = [];
    for (let i = 0; i < particleCount; i++) {
        particles.push(new Particle());
    }
}

function animateParticles() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    for (let i = 0; i < particles.length; i++) {
        particles[i].update();
        particles[i].draw();

        // Connect particles
        for (let j = i; j < particles.length; j++) {
            const dx = particles[i].x - particles[j].x;
            const dy = particles[i].y - particles[j].y;
            const distance = Math.sqrt(dx * dx + dy * dy);

            if (distance < connectionDistance) {
                ctx.strokeStyle = 'rgba(0, 210, 255, ' + (1 - distance / connectionDistance) * 0.15 + ')';
                ctx.lineWidth = 1;
                ctx.beginPath();
                ctx.moveTo(particles[i].x, particles[i].y);
                ctx.lineTo(particles[j].x, particles[j].y);
                ctx.stroke();
            }
        }
    }
    requestAnimationFrame(animateParticles);
}

initParticles();
animateParticles();
