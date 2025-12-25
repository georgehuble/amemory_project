/**
 * Dashboard - Memorial Page Creation Form
 * Handles form logic, file uploads, draft saving, and Yandex Maps integration
 */

// ========================================
// State Management
// ========================================

const DRAFT_KEY = 'memorial_draft';
const MAX_PHOTOS = 10;

let state = {
  portrait: null,
  photos: [],
  video: null,
  mapInstance: null,
  placemark: null,
};

// ========================================
// DOM Elements
// ========================================

const form = document.getElementById('memorialForm');
const draftStatus = document.getElementById('draftStatus');

// Portrait upload
const portraitInput = document.getElementById('portrait');
const portraitUpload = document.getElementById('portraitUpload');
const portraitPreview = document.getElementById('portraitPreview');

// Photo gallery
const photoInput = document.getElementById('photoInput');
const photoGallery = document.getElementById('photoGallery');
const addPhotoCard = document.getElementById('addPhotoCard');
const photoCounter = document.getElementById('photoCounter');

// Video upload
const videoInput = document.getElementById('video');
const videoUpload = document.getElementById('videoUpload');
const videoPreview = document.getElementById('videoPreview');

// Map
const toggleMapBtn = document.getElementById('toggleMap');
const mapContainer = document.getElementById('mapContainer');
const latitudeInput = document.getElementById('latitude');
const longitudeInput = document.getElementById('longitude');

// Buttons
const saveDraftBtn = document.getElementById('saveDraft');

// ========================================
// Initialization
// ========================================

document.addEventListener('DOMContentLoaded', () => {
  loadDraft();
  initEventListeners();
  initDragAndDrop();
  initHeaderScroll();
});

// ========================================
// Header Scroll Behavior
// ========================================

function initHeaderScroll() {
  const navbar = document.querySelector('header');
  if (!navbar) return;

  let lastScrollY = window.scrollY;

  function handleScroll() {
    // Add background on scroll
    if (window.scrollY > 0) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }

    // Hide on scroll down, show on scroll up
    if (window.scrollY > lastScrollY && window.scrollY > 100) {
      navbar.classList.add('scroll-down');
    } else {
      navbar.classList.remove('scroll-down');
    }

    lastScrollY = window.scrollY;
  }

  window.addEventListener('scroll', handleScroll);
}

function initEventListeners() {
  // Portrait upload
  portraitInput.addEventListener('change', handlePortraitUpload);

  // Photo gallery
  addPhotoCard.addEventListener('click', () => photoInput.click());
  photoInput.addEventListener('change', handlePhotosUpload);

  // Video upload
  videoInput.addEventListener('change', handleVideoUpload);

  // Map toggle
  toggleMapBtn.addEventListener('click', toggleMap);

  // Coordinate inputs - sync with map
  latitudeInput.addEventListener('change', updateMapFromInputs);
  longitudeInput.addEventListener('change', updateMapFromInputs);

  // Draft saving
  saveDraftBtn.addEventListener('click', saveDraft);

  // Auto-save on input change
  form.addEventListener('input', debounce(autoSaveDraft, 2000));

  // Form submission
  form.addEventListener('submit', handleSubmit);

  // Mobile navigation
  const hamburgerButton = document.querySelector('.hamburger-bars');
  const mobileNav = document.querySelector('.mobileNav');

  if (hamburgerButton && mobileNav) {
    hamburgerButton.addEventListener('click', () => {
      hamburgerButton.classList.toggle('active');
      mobileNav.classList.toggle('active');
    });
  }
}

// ========================================
// Drag and Drop
// ========================================

function initDragAndDrop() {
  // Portrait drag and drop
  setupDragAndDrop(portraitUpload, (files) => {
    if (files[0] && files[0].type.startsWith('image/')) {
      handleFilePreview(files[0], 'portrait');
    }
  });

  // Video drag and drop
  setupDragAndDrop(videoUpload, (files) => {
    if (files[0] && files[0].type.startsWith('video/')) {
      handleFilePreview(files[0], 'video');
    }
  });
}

function setupDragAndDrop(element, onDrop) {
  ['dragenter', 'dragover', 'dragleave', 'drop'].forEach(eventName => {
    element.addEventListener(eventName, preventDefaults, false);
  });

  ['dragenter', 'dragover'].forEach(eventName => {
    element.addEventListener(eventName, () => element.classList.add('dragover'));
  });

  ['dragleave', 'drop'].forEach(eventName => {
    element.addEventListener(eventName, () => element.classList.remove('dragover'));
  });

  element.addEventListener('drop', (e) => {
    const files = e.dataTransfer.files;
    onDrop(files);
  });
}

function preventDefaults(e) {
  e.preventDefault();
  e.stopPropagation();
}

// ========================================
// Portrait Upload
// ========================================

function handlePortraitUpload(e) {
  const file = e.target.files[0];
  if (file) {
    handleFilePreview(file, 'portrait');
  }
}

// ========================================
// Photo Gallery
// ========================================

function handlePhotosUpload(e) {
  const files = Array.from(e.target.files);
  const remainingSlots = MAX_PHOTOS - state.photos.length;
  const filesToAdd = files.slice(0, remainingSlots);

  filesToAdd.forEach(file => {
    if (file.type.startsWith('image/')) {
      addPhotoToGallery(file);
    }
  });

  updatePhotoCounter();
  photoInput.value = ''; // Reset input
}

function addPhotoToGallery(file) {
  const reader = new FileReader();
  reader.onload = (e) => {
    const photoData = {
      id: Date.now() + Math.random(),
      data: e.target.result,
      file: file
    };
    state.photos.push(photoData);
    renderPhotoCard(photoData);
    updatePhotoCounter();
  };
  reader.readAsDataURL(file);
}

function renderPhotoCard(photoData) {
  const card = document.createElement('div');
  card.className = 'photo-card';
  card.dataset.id = photoData.id;
  card.innerHTML = `
    <img src="${photoData.data}" alt="Photo" />
    <button type="button" class="photo-card-remove" onclick="removePhoto('${photoData.id}')">
      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
        <line x1="18" y1="6" x2="6" y2="18"></line>
        <line x1="6" y1="6" x2="18" y2="18"></line>
      </svg>
    </button>
  `;

  // Insert before the add button
  photoGallery.insertBefore(card, addPhotoCard);
}

window.removePhoto = function(id) {
  state.photos = state.photos.filter(p => p.id != id);
  const card = document.querySelector(`.photo-card[data-id="${id}"]`);
  if (card) card.remove();
  updatePhotoCounter();
};

function updatePhotoCounter() {
  photoCounter.textContent = `${state.photos.length} / ${MAX_PHOTOS}`;

  // Hide add button if max reached
  if (state.photos.length >= MAX_PHOTOS) {
    addPhotoCard.style.display = 'none';
  } else {
    addPhotoCard.style.display = 'flex';
  }
}

// ========================================
// Video Upload
// ========================================

function handleVideoUpload(e) {
  const file = e.target.files[0];
  if (file) {
    handleFilePreview(file, 'video');
  }
}

// ========================================
// File Preview Helper
// ========================================

function handleFilePreview(file, type) {
  const reader = new FileReader();

  reader.onload = (e) => {
    if (type === 'portrait') {
      state.portrait = { data: e.target.result, file };
      portraitPreview.innerHTML = `<img src="${e.target.result}" alt="Portrait" />`;
    } else if (type === 'video') {
      state.video = { data: e.target.result, file };
      videoPreview.innerHTML = `<video src="${e.target.result}" muted></video>`;
    }
  };

  reader.readAsDataURL(file);
}

// ========================================
// Yandex Maps Integration
// ========================================

function toggleMap() {
  const isHidden = mapContainer.classList.contains('hidden');

  if (isHidden) {
    mapContainer.classList.remove('hidden');
    toggleMapBtn.classList.add('active');
    initMap();
  } else {
    mapContainer.classList.add('hidden');
    toggleMapBtn.classList.remove('active');
  }
}

function initMap() {
  if (state.mapInstance) return;

  // Check if Yandex Maps API is loaded
  if (typeof ymaps === 'undefined') {
    console.warn('Yandex Maps API not loaded. Please add your API key.');
    mapContainer.innerHTML = '<p style="padding: 20px; text-align: center; color: #6b7280;">Для работы карты добавьте API ключ Яндекс.Карт</p>';
    return;
  }

  ymaps.ready(() => {
    // Default center (Moscow)
    const defaultCenter = [55.7558, 37.6173];

    // Use saved coordinates if available
    const lat = parseFloat(latitudeInput.value) || defaultCenter[0];
    const lng = parseFloat(longitudeInput.value) || defaultCenter[1];

    state.mapInstance = new ymaps.Map('yandexMap', {
      center: [lat, lng],
      zoom: 12,
      controls: ['zoomControl', 'searchControl', 'geolocationControl']
    });

    // Add placemark if coordinates exist
    if (latitudeInput.value && longitudeInput.value) {
      addPlacemark([lat, lng]);
    }

    // Click handler to add/move placemark
    state.mapInstance.events.add('click', (e) => {
      const coords = e.get('coords');
      addPlacemark(coords);
      updateCoordinateInputs(coords);
    });
  });
}

function addPlacemark(coords) {
  // Remove existing placemark
  if (state.placemark) {
    state.mapInstance.geoObjects.remove(state.placemark);
  }

  state.placemark = new ymaps.Placemark(coords, {
    balloonContent: 'Место захоронения'
  }, {
    preset: 'islands#redDotIcon',
    draggable: true
  });

  // Update coordinates on drag
  state.placemark.events.add('dragend', () => {
    const newCoords = state.placemark.geometry.getCoordinates();
    updateCoordinateInputs(newCoords);
  });

  state.mapInstance.geoObjects.add(state.placemark);
}

function updateCoordinateInputs(coords) {
  latitudeInput.value = coords[0].toFixed(6);
  longitudeInput.value = coords[1].toFixed(6);
}

function updateMapFromInputs() {
  if (!state.mapInstance) return;

  const lat = parseFloat(latitudeInput.value);
  const lng = parseFloat(longitudeInput.value);

  if (!isNaN(lat) && !isNaN(lng)) {
    const coords = [lat, lng];
    state.mapInstance.setCenter(coords, 15);
    addPlacemark(coords);
  }
}

// ========================================
// Draft Management
// ========================================

function saveDraft() {
  const formData = getFormData();
  localStorage.setItem(DRAFT_KEY, JSON.stringify(formData));
  showDraftStatus();
}

function autoSaveDraft() {
  saveDraft();
}

function loadDraft() {
  const saved = localStorage.getItem(DRAFT_KEY);
  if (!saved) return;

  try {
    const data = JSON.parse(saved);

    // Restore text fields
    Object.keys(data).forEach(key => {
      const input = document.getElementById(key);
      if (input && typeof data[key] === 'string') {
        input.value = data[key];
      }
    });

    // Restore portrait
    if (data.portraitData) {
      state.portrait = { data: data.portraitData };
      portraitPreview.innerHTML = `<img src="${data.portraitData}" alt="Portrait" />`;
    }

    // Restore photos
    if (data.photos && Array.isArray(data.photos)) {
      data.photos.forEach(photoData => {
        state.photos.push(photoData);
        renderPhotoCard(photoData);
      });
      updatePhotoCounter();
    }

    // Restore video
    if (data.videoData) {
      state.video = { data: data.videoData };
      videoPreview.innerHTML = `<video src="${data.videoData}" muted></video>`;
    }

    showDraftStatus();
  } catch (e) {
    console.error('Error loading draft:', e);
  }
}

function getFormData() {
  const formData = {
    lastName: document.getElementById('lastName').value,
    firstName: document.getElementById('firstName').value,
    middleName: document.getElementById('middleName').value,
    birthDate: document.getElementById('birthDate').value,
    deathDate: document.getElementById('deathDate').value,
    biography: document.getElementById('biography').value,
    letterGreeting: document.getElementById('letterGreeting').value,
    letterContent: document.getElementById('letterContent').value,
    letterSignature: document.getElementById('letterSignature').value,
    country: document.getElementById('country').value,
    city: document.getElementById('city').value,
    cemetery: document.getElementById('cemetery').value,
    section: document.getElementById('section').value,
    row: document.getElementById('row').value,
    latitude: document.getElementById('latitude').value,
    longitude: document.getElementById('longitude').value,
    portraitData: state.portrait?.data || null,
    photos: state.photos.map(p => ({ id: p.id, data: p.data })),
    videoData: state.video?.data || null,
  };

  return formData;
}

function showDraftStatus() {
  draftStatus.classList.add('visible');
  setTimeout(() => {
    draftStatus.classList.remove('visible');
  }, 3000);
}

function clearDraft() {
  localStorage.removeItem(DRAFT_KEY);
}

// ========================================
// Form Submission
// ========================================

function handleSubmit(e) {
  e.preventDefault();

  // Validate required fields
  const requiredFields = ['lastName', 'firstName', 'middleName', 'birthDate', 'deathDate', 'biography'];
  let isValid = true;

  requiredFields.forEach(fieldId => {
    const field = document.getElementById(fieldId);
    if (!field.value.trim()) {
      field.classList.add('error');
      isValid = false;
    } else {
      field.classList.remove('error');
    }
  });

  // Check biography length
  const biography = document.getElementById('biography');
  if (biography.value.length < 100) {
    biography.classList.add('error');
    isValid = false;
    alert('Биография должна содержать минимум 100 символов');
    return;
  }

  if (!isValid) {
    alert('Пожалуйста, заполните все обязательные поля');
    return;
  }

  // Prepare form data for submission
  const formData = new FormData();
  const data = getFormData();

  // Add text data
  Object.keys(data).forEach(key => {
    if (typeof data[key] === 'string') {
      formData.append(key, data[key]);
    }
  });

  // Add portrait file
  if (state.portrait?.file) {
    formData.append('portrait', state.portrait.file);
  }

  // Add photo files
  state.photos.forEach((photo, index) => {
    if (photo.file) {
      formData.append(`photo_${index}`, photo.file);
    }
  });

  // Add video file
  if (state.video?.file) {
    formData.append('video', state.video.file);
  }

  // Here you would send formData to your backend
  console.log('Form submitted:', data);
  alert('Страница памяти отправлена на модерацию!');

  // Clear draft after successful submission
  clearDraft();
}

// ========================================
// Utility Functions
// ========================================

function debounce(func, wait) {
  let timeout;
  return function executedFunction(...args) {
    const later = () => {
      clearTimeout(timeout);
      func(...args);
    };
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
  };
}
