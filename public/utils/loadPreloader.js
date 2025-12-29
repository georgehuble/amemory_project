/**
 * Загружает preloader компонент в указанный контейнер
 * @param {string} containerId - ID элемента куда вставить preloader (по умолчанию 'site-main')
 */
async function loadPreloader(containerId = 'site-main') {
  try {
    const response = await fetch('/components/preloader.html');
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const html = await response.text();
    const container = document.getElementById(containerId);
    if (container) {
      // Вставляем preloader в начало контейнера
      container.insertAdjacentHTML('afterbegin', html);

      // Инициализируем анимацию прелоадера после загрузки
      initPreloaderAnimation();
    } else {
      console.error(`Container with id "${containerId}" not found`);
    }
  } catch (error) {
    console.error('Error loading preloader:', error);
  }
}

/**
 * Инициализирует анимацию прелоадера
 */
function initPreloaderAnimation() {
  const percentage = document.getElementById('percentage');
  const preloader = document.querySelector('.preload');
  const spinningContainer = document.querySelector('.spinning-container');
  const logoText = document.querySelector('.logo-text');

  if (!percentage || !preloader) {
    console.error('Preloader elements not found');
    return;
  }

  let progress = 0;
  const duration = 2500; // 2.5 секунды для загрузки
  const startTime = Date.now();

  function updateProgress() {
    const elapsed = Date.now() - startTime;
    progress = Math.min((elapsed / duration) * 100, 100);

    percentage.textContent = Math.round(progress) + '%';

    if (progress < 100) {
      requestAnimationFrame(updateProgress);
    } else {
      // Когда достигли 100%, начинаем анимацию
      setTimeout(() => {
        // Шаг 1: Скрываем процент и отдаляем вращающиеся цифры
        percentage.style.opacity = '0';
        percentage.style.transition = 'opacity 0.4s ease-out';

        if (spinningContainer) {
          // Отдаление назад и исчезновение
          spinningContainer.style.transform = 'translate(-50%, -50%) scale(0) translateZ(-500px)';
          spinningContainer.style.opacity = '0';
          spinningContainer.style.transition = 'all 1s ease-in';
        }

        // Шаг 2: Показываем текст "Amemory" с плавной анимацией (серый цвет)
        setTimeout(() => {
          if (logoText) {
            logoText.classList.add('show');
          }

          // Шаг 3: Буквы уходят вверх, прелоадер уезжает как ширма
          setTimeout(() => {
            if (logoText) {
              logoText.classList.add('hide');
            }

            // Сначала показываем контент (он будет под прелоадером)
            document.body.classList.remove('preloading');

            // Небольшая задержка, чтобы контент отрисовался
            requestAnimationFrame(() => {
              // Прелоадер уезжает вверх как ширма, обнажая сайт снизу
              preloader.style.transition = 'top 1s cubic-bezier(0.76, 0, 0.24, 1)';
              preloader.style.top = '-100%';
            });

            // Шаг 4: После ухода ширмы вверх
            setTimeout(() => {
              preloader.style.pointerEvents = 'none';
              preloader.style.display = 'none';

              // Полностью удаляем preloader из DOM
              if (preloader.parentNode) {
                preloader.parentNode.removeChild(preloader);
              }

              // Запускаем анимацию hero-section
              window.dispatchEvent(new Event('preloaderComplete'));
            }, 1000); // Ждем пока ширма уедет (1s transition)
          }, 1500); // Держим текст "Amemory" на экране 1.5 секунды
        }, 1000); // Задержка перед появлением текста
      }, 300);
    }
  }

  // Запускаем анимацию прогресса
  requestAnimationFrame(updateProgress);
}

// Экспортируем функцию
if (typeof module !== 'undefined' && module.exports) {
  module.exports = loadPreloader;
}
