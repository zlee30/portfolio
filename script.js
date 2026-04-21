document.querySelectorAll('a[href^="#"]').forEach(link => {
  link.addEventListener('click', function(e) {
    e.preventDefault();
    const target = document.querySelector(this.getAttribute('href'));
    if (target) {
      target.scrollIntoView({ behavior: 'smooth' });
    }
  });
});

const galleries = {
  'email-bot': [
    'images/sscmd.png',
    'images/ssgmail.png'
   
  ]
};

let currentGallery = [];
let currentIndex = 0;

function openGallery(name) {
  currentGallery = galleries[name];
  currentIndex = 0;
  showImage();
  document.getElementById('gallery').classList.add('active');
}

function closeGallery() {
  document.getElementById('gallery').classList.remove('active');
}

function showImage() {
  document.getElementById('gallery-img').src = currentGallery[currentIndex];
  document.getElementById('gallery-counter').textContent =
    (currentIndex + 1) + ' / ' + currentGallery.length;
}

function nextImage() {
  currentIndex = (currentIndex + 1) % currentGallery.length;
  showImage();
}

function prevImage() {
  currentIndex = (currentIndex - 1 + currentGallery.length) % currentGallery.length;
  showImage();
}