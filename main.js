// Affiche la page par défaut (Accueil) et active le lien correspondant
document.addEventListener('DOMContentLoaded', () => {
    showPage('accueil-page');
    setActiveNavLink('accueil');
});

// Gère le menu mobile
const menuBtn = document.getElementById('menu-btn');
const mobileMenu = document.getElementById('mobile-menu');

menuBtn.addEventListener('click', () => {
    mobileMenu.classList.toggle('hidden');
});

// Gère la navigation entre les pages et l'activation des liens
document.querySelectorAll('nav a, a[data-page]').forEach(link => {
    link.addEventListener('click', (e) => {
        e.preventDefault();
        const pageId = e.target.getAttribute('data-page');
        if (pageId) {
            showPage(pageId + '-page');
            setActiveNavLink(pageId);
            mobileMenu.classList.add('hidden'); // Cache le menu mobile après sélection
        }
    });
});

function showPage(pageId) {
    const pages = document.querySelectorAll('main section');
    pages.forEach(page => {
        page.classList.add('hidden');
        page.classList.remove('animate-fade-in'); // Réinitialise l'animation
    });
    const selectedPage = document.getElementById(pageId);
    if (selectedPage) {
        selectedPage.classList.remove('hidden');
        selectedPage.classList.add('animate-fade-in'); // Active l'animation
    }
}

function setActiveNavLink(pageName) {
    // Désactive tous les liens
    document.querySelectorAll('.nav-link, .nav-link-mobile').forEach(link => {
        link.classList.remove('active');
    });

    // Active le lien correspondant à la page actuelle
    document.querySelectorAll(`[data-page="${pageName}"]`).forEach(link => {
        link.classList.add('active');
    });
}

// Fonction pour animer le texte sur la page d'accueil
const typedTextSpan = document.getElementById("typed-text");
const typingStrings = ["Étudiant en Systèmes Embarqués", "Développeur IoT", "Passionné par l'Électronique", "Créateur de Solutions Connectées"];
let stringIndex = 0;
let charIndex = 0;
let isDeleting = false;
let typingInterval; // Déclaré globalement pour pouvoir le clearTimeout

function type() {
    clearTimeout(typingInterval); // Empêche les intervalles multiples

    const currentString = typingStrings[stringIndex];
    const currentText = isDeleting
        ? currentString.substring(0, charIndex - 1)
        : currentString.substring(0, charIndex + 1);

    typedTextSpan.textContent = currentText;
    typedTextSpan.style.color = 'var(--accent-main)'; // S'assure que la couleur d'accent est utilisée

    if (!isDeleting && charIndex === currentString.length) {
        setTimeout(() => isDeleting = true, 1500);
    } else if (isDeleting && charIndex === 0) {
        isDeleting = false;
        stringIndex = (stringIndex + 1) % typingStrings.length;
    }

    if (isDeleting) {
        charIndex--;
    } else {
        charIndex++;
    }

    const typingSpeed = isDeleting ? 70 : 120;
    typingInterval = setTimeout(type, typingSpeed);
}

// Lancement de l'animation au chargement de la page d'accueil
// Et s'assure qu'elle redémarre si on revient sur la page d'accueil
window.addEventListener('DOMContentLoaded', () => {
    if (document.getElementById('accueil-page').classList.contains('hidden') === false) {
        type();
    }
});


// Effet de défilement pour le header
const header = document.querySelector('header');

window.addEventListener('scroll', () => {
    if (window.scrollY > 50) { // Si l'utilisateur a fait défiler de plus de 50px
        header.classList.add('scrolled');
    } else {
        header.classList.remove('scrolled');
    }
});