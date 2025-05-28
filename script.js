document.addEventListener('DOMContentLoaded', function() {

    const images = [
        { src: 'img\..', title: 'Picture 1' },
        { src: 'img\..', title: 'Picture 2' },
        { src: 'img\..', title: 'Picture 3' },
        { src: 'img\..', title: 'Picture 4' },
        { src: 'img\..', title: 'Picture 5' },
        { src: 'img\..', title: 'Picture 6' },
        { src: 'img\..', title: 'Picture 7' },
        { src: 'img\..', title: 'Picture 8' },
        { src: 'img\..', title: 'Picture 9' },
        { src: 'img\..', title: 'Picture 10' }
    ];

    // DOM elements
    const mainImage = document.getElementById('main-image');
    const imageTitle = document.getElementById('image-title');
    const imageCounter = document.getElementById('image-counter');
    const thumbnailContainer = document.querySelector('.thumbnail-container');
    const prevBtn = document.getElementById('prev-btn');
    const nextBtn = document.getElementById('next-btn');
    const modal = document.getElementById('image-modal');
    const modalImg = document.getElementById('modal-image');
    const modalCaption = document.getElementById('modal-caption');
    const closeBtn = document.querySelector('.close-btn');

    let currentIndex = 0;

    // Initialize the gallery
    function initGallery() {
        // Create thumbnails
        images.forEach((image, index) => {
            const thumbnail = document.createElement('img');
            thumbnail.src = image.src;
            thumbnail.alt = image.title;
            thumbnail.classList.add('thumbnail');
            if (index === 0) thumbnail.classList.add('active');
            
            thumbnail.addEventListener('click', () => {
                updateMainImage(index);
            });
            
            thumbnailContainer.appendChild(thumbnail);
        });

        // Set initial main image
        updateMainImage(0);
    }

    // Update main image display
    function updateMainImage(index) {
        // Validate index
        if (index < 0) index = images.length - 1;
        if (index >= images.length) index = 0;
        
        currentIndex = index;
        const image = images[index];
        
        // Update main image
        mainImage.src = image.src;
        mainImage.alt = image.title;
        
        // Update title and counter
        imageTitle.textContent = image.title;
        imageCounter.textContent = ${index + 1} of ${images.length};
        
        // Update active thumbnail
        document.querySelectorAll('.thumbnail').forEach((thumb, i) => {
            thumb.classList.toggle('active', i === index);
        });
    }

    // Navigation functions
    function showPrevImage() {
        updateMainImage(currentIndex - 1);
    }

    function showNextImage() {
        updateMainImage(currentIndex + 1);
    }

    // Event listeners
    prevBtn.addEventListener('click', showPrevImage);
    nextBtn.addEventListener('click', showNextImage);
    
    // Keyboard navigation
    document.addEventListener('keydown', (e) => {
        if (e.key === 'ArrowLeft') showPrevImage();
        if (e.key === 'ArrowRight') showNextImage();
        if (e.key === 'Escape' && modal.style.display === 'block') closeModal();
    });

    // Modal functionality
    mainImage.addEventListener('click', () => {
        modal.style.display = 'block';
        modalImg.src = images[currentIndex].src;
        modalCaption.textContent = images[currentIndex].title;
    });

    closeBtn.addEventListener('click', closeModal);

    function closeModal() {
        modal.style.display = 'none';
    }

    // Initialize the gallery
    initGallery();
});