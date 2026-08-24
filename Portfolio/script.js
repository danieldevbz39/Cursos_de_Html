// 1. Efeito Typewriter (Máquina de Escrever)
const words = [
    "Desenvolvedor HTML, CSS e JavaScript",
    "Especialista em Interfaces Responsivas",
    "Sites funcionais e bem estruturados",
    "Precisão visual em cada detalhe"
];
let wordIndex = 0;
let charIndex = 0;
let isDeleting = false;
const typewriterElement = document.getElementById("typewriter");

function typeEffect() {
    const currentWord = words[wordIndex];

    if (isDeleting) {
        typewriterElement.textContent = currentWord.substring(0, charIndex - 1);
        charIndex--;
    } else {
        typewriterElement.textContent = currentWord.substring(0, charIndex + 1);
        charIndex++;
    }

    let speed = isDeleting ? 40 : 80;

    if (!isDeleting && charIndex === currentWord.length) {
        speed = 1800; // Tempo de pausa na palavra completa
        isDeleting = true;
    } else if (isDeleting && charIndex === 0) {
        isDeleting = false;
        wordIndex = (wordIndex + 1) % words.length;
        speed = 400;
    }

    setTimeout(typeEffect, speed);
}

document.addEventListener("DOMContentLoaded", () => {
    typeEffect();
    initCarousel();
    initMobileMenu();
    initVisitCounter();
});

async function initVisitCounter() {
    const visitCountElement = document.getElementById("visitCount");
    const counterUrl = "https://api.counterapi.dev/v2/danieldev-portfolio/visitas/up";

    try {
        const response = await fetch(counterUrl, { method: "GET" });

        if (!response.ok) throw new Error("Não foi possível atualizar o contador");

        const data = await response.json();
        const count = Number(data.data?.up_count);

        if (!Number.isFinite(count)) throw new Error("Resposta inválida do contador");

        visitCountElement.textContent = count.toLocaleString("pt-BR");
    } catch (error) {
        visitCountElement.textContent = "indisponível";
    }
}

function initMobileMenu() {
    const menuToggle = document.getElementById("menuToggle");
    const menuClose = document.getElementById("menuClose");
    const menuBackdrop = document.getElementById("menuBackdrop");
    const mobileMenu = document.getElementById("mobileMenu");
    const mobileLinks = mobileMenu.querySelectorAll("a");

    function setMenuState(isOpen) {
        document.body.classList.toggle("menu-open", isOpen);
        menuToggle.setAttribute("aria-expanded", String(isOpen));
        menuToggle.setAttribute("aria-label", isOpen ? "Fechar menu" : "Abrir menu");
        mobileMenu.setAttribute("aria-hidden", String(!isOpen));
    }

    menuToggle.addEventListener("click", () => setMenuState(true));
    menuClose.addEventListener("click", () => setMenuState(false));
    menuBackdrop.addEventListener("click", () => setMenuState(false));
    mobileLinks.forEach(link => link.addEventListener("click", () => setMenuState(false)));

    document.addEventListener("keydown", event => {
        if (event.key === "Escape") setMenuState(false);
    });
}

// 2. Lógica do Carrossel de Sites
function initCarousel() {
    const track = document.getElementById("carouselTrack");
    const featuredSlide = track.querySelector(".slide-featured");
    const nextBtn = document.getElementById("nextBtn");
    const prevBtn = document.getElementById("prevBtn");
    const dotsContainer = document.getElementById("carouselDots");

    if (featuredSlide) {
        track.prepend(featuredSlide);
    }

    const slides = Array.from(track.children);

    let currentIndex = 0;

    // Gerar indicadores (dots) dinamicamente
    slides.forEach((_, idx) => {
        const dot = document.createElement("div");
        dot.classList.add("carousel-dot");
        if (idx === 0) dot.classList.add("active");
        dot.addEventListener("click", () => moveToSlide(idx));
        dotsContainer.appendChild(dot);
    });

    const dots = Array.from(dotsContainer.children);

    function updateDots(index) {
        dots.forEach(dot => dot.classList.remove("active"));
        dots[index].classList.add("active");
    }

    function moveToSlide(index) {
        if (index < 0) {
            currentIndex = slides.length - 1;
        } else if (index >= slides.length) {
            currentIndex = 0;
        } else {
            currentIndex = index;
        }
        track.style.transform = `translateX(-${currentIndex * 100}%)`;
        updateDots(currentIndex);
    }

    nextBtn.addEventListener("click", () => moveToSlide(currentIndex + 1));
    prevBtn.addEventListener("click", () => moveToSlide(currentIndex - 1));

    // Suporte para arrastar / swipe em telas touch
    let startX = 0;
    let endX = 0;

    track.addEventListener("touchstart", e => {
        startX = e.touches[0].clientX;
    });

    track.addEventListener("touchend", e => {
        endX = e.changedTouches[0].clientX;
        if (startX - endX > 50) {
            moveToSlide(currentIndex + 1); // Swipe esquerda -> próximo
        } else if (endX - startX > 50) {
            moveToSlide(currentIndex - 1); // Swipe direita -> anterior
        }
    });
}