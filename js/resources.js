

// Membuat bintang animasi di latar belakang.
function createStars() {
    const starsContainer = document.getElementById('stars');
    // Loop untuk membuat 100 bintang
    for (let i = 0; i < 100; i++) {
        const star = document.createElement('div');
        star.className = 'star';
        star.style.left = Math.random() * 100 + '%';
        star.style.top = Math.random() * 100 + '%';
        star.style.animationDelay = Math.random() * 3 + 's';
        starsContainer.appendChild(star);
    }
}


/* ==========================================
   FUNGSI SPESIFIK HALAMAN RESOURCES
   ========================================== */

// Menangani pengiriman formulir umpan balik.
function handleFeedbackFormSubmit(event) {
    event.preventDefault(); // Mencegah pengiriman formulir default

    const feedbackType = document.getElementById('feedback-type').value;
    const feedbackMessage = document.getElementById('feedback-message').value;
    const feedbackStatusMessage = document.getElementById('feedback-status-message');
    const feedbackForm = document.getElementById('feedback-form');

    // pengiriman data (cuman simulasi)
    console.log('Feedback Submitted:', { type: feedbackType, message: feedbackMessage });

    // Tampilkan pesan sukses menggunakan DOM manipulation
    feedbackStatusMessage.replaceChildren(); 

    const successDiv = document.createElement('div');
    successDiv.className = 'success-message';

    const p1 = document.createElement('p');
    p1.textContent = '🎉 Terima kasih atas feedback Anda!';
    successDiv.appendChild(p1);

    const p2 = document.createElement('p');
    p2.textContent = 'Kami telah menerima pesan Anda dan akan menanggapinya segera.';
    successDiv.appendChild(p2);

    const pType = document.createElement('p');
    pType.textContent = 'Tipe: ';
    const strongType = document.createElement('strong');
    strongType.textContent = feedbackType;
    pType.appendChild(strongType);
    successDiv.appendChild(pType);

    const pMessage = document.createElement('p');
    pMessage.textContent = 'Pesan: ';
    const emMessage = document.createElement('em');
    emMessage.textContent = `"${feedbackMessage}"`;
    pMessage.appendChild(emMessage);
    successDiv.appendChild(pMessage);

    feedbackStatusMessage.appendChild(successDiv); // Menambahkan div sukses ke container
    
    // Reset formulir setelah pengiriman
    feedbackForm.reset();

    // Hapus pesan sukses setelah beberapa detik
    setTimeout(() => {
        feedbackStatusMessage.replaceChildren(); 
    }, 5000); 
}

/* ==========================================
   EVENT LISTENERS & INISIALISASI
   ========================================== */

document.addEventListener('DOMContentLoaded', function() {
    // Inisialisasi fungsi dasar
    createStars();

    // Event listener untuk formulir umpan balik
    const feedbackForm = document.getElementById('feedback-form');
    if (feedbackForm) {
        feedbackForm.addEventListener('submit', handleFeedbackFormSubmit);
    }
});