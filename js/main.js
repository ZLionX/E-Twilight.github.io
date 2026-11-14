// ===== INTRO =====
window.addEventListener("load", () => {
    const intro = document.getElementById("intro");
    if (!intro) return;

    setTimeout(() => {
        intro.classList.add("hidden");
    }, 1500);

    setTimeout(() => {
        intro.remove();
    }, 2000);
});

// ===== MODAL =====
const openBtn = document.querySelector('.show-more-btn');
const modal = document.getElementById('projectModal');
const closeBtn = document.querySelector('.modal-close');


if (openBtn && modal && closeBtn) {
    openBtn.addEventListener('click', () => {
        modal.classList.add('active');
    });

    closeBtn.addEventListener('click', () => {
        modal.classList.remove('active');
    });

    modal.addEventListener('click', (e) => {
        if (e.target === modal) {
            modal.classList.remove('active');
        }
    });
}

// ===== GALERÍA =====
const galleryContainer = document.querySelector('.gallery-container');
const galleryItems = document.querySelectorAll('.gallery-item');
const prevBtn = document.querySelector('.prev-btn');
const nextBtn = document.querySelector('.next-btn');

if (galleryContainer && galleryItems.length > 0 && prevBtn && nextBtn) {
    let currentIndex = 0;
    const totalItems = galleryItems.length;
    const intervalTime = 3000;
    let autoSlide;

    function updateGallery() {
        galleryContainer.style.transform = `translateX(-${currentIndex * 100}%)`;
    }

    function nextSlide() {
        currentIndex = (currentIndex + 1) % totalItems;
        updateGallery();
    }

    function prevSlide() {
        currentIndex = (currentIndex - 1 + totalItems) % totalItems;
        updateGallery();
    }

    function startAutoSlide() {
        autoSlide = setInterval(nextSlide, intervalTime);
    }

    function resetAutoSlide() {
        clearInterval(autoSlide);
        startAutoSlide();
    }

    nextBtn.addEventListener('click', () => {
        nextSlide();
        resetAutoSlide();
    });

    prevBtn.addEventListener('click', () => {
        prevSlide();
        resetAutoSlide();
    });

    startAutoSlide();

    // BORRADOR
    window.addEventListener('beforeunload', () => {
        clearInterval(autoSlide);
    });
}


// ===== MODAL GALERÍA =====
const galleryModal = document.getElementById("galleryModal");
const galleryModalImg = document.getElementById("galleryModalImg");
const galleryModalTitle = document.getElementById("galleryModalTitle");
const galleryModalClose = document.getElementById("galleryModalClose");

if (galleryModal && galleryModalImg && galleryModalTitle && galleryModalClose) {
    document.querySelectorAll(".gallery-img").forEach(img => {
        img.addEventListener("click", () => {
            galleryModalImg.src = img.src;
            galleryModalImg.alt = img.alt;
            galleryModalTitle.textContent = img.dataset.caption || "";
            galleryModal.classList.add("active");
        });
    });

    galleryModalClose.addEventListener("click", () => {
        galleryModal.classList.remove("active");
    });

    galleryModal.addEventListener("click", e => {
        if (e.target === galleryModal) {
            galleryModal.classList.remove("active");
        }
    });
}

// ===== BÚSQUEDA =====
const searchBar = document.querySelector('.search-bar');
const projectCards = document.querySelectorAll('.project-card');

if (searchBar && projectCards.length > 0) {
    searchBar.addEventListener('input', (e) => {
        const searchTerm = e.target.value.toLowerCase();
        
        projectCards.forEach(card => {
            const title = card.querySelector('.project-title')?.textContent.toLowerCase() || '';
            const desc = card.querySelector('.project-desc')?.textContent.toLowerCase() || '';
            
            if (title.includes(searchTerm) || desc.includes(searchTerm)) {
                card.style.display = '';
            } else {
                card.style.display = 'none';
            }
        });
    });
}

// ===== KEYBOARD ACCESSIBILITY =====
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
        // Cerrar modales con ESC
        document.querySelectorAll('.modal-overlay.active').forEach(modal => {
            modal.classList.remove('active');
        });
    }
});