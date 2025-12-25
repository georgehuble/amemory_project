/**
 * Загружает компонент уведомления о cookies на страницу
 */
async function loadCookieNotice() {
  // Проверяем, дал ли пользователь уже согласие или отказался
  const cookieConsent = localStorage.getItem('cookieConsent');

  if (cookieConsent !== null) {
    // Пользователь уже сделал выбор, не показываем уведомление
    return;
  }

  try {
    // Загружаем HTML компонента
    const response = await fetch('/components/cookie-notice.html');
    const html = await response.text();

    // Создаем временный элемент для парсинга HTML
    const temp = document.createElement('div');
    temp.innerHTML = html;

    // Добавляем в body
    document.body.appendChild(temp.firstElementChild);

    // Загружаем CSS
    const link = document.createElement('link');
    link.rel = 'stylesheet';
    link.href = '/components/cookie-notice.css';
    document.head.appendChild(link);

    // Добавляем обработчики событий
    setupCookieNoticeHandlers();

  } catch (error) {
    console.error('Ошибка при загрузке уведомления о cookies:', error);
  }
}

/**
 * Настраивает обработчики событий для кнопок уведомления о cookies
 */
function setupCookieNoticeHandlers() {
  const cookieNotice = document.getElementById('cookieNotice');
  const acceptButton = document.getElementById('acceptCookies');
  const declineButton = document.getElementById('declineCookies');

  if (!cookieNotice || !acceptButton || !declineButton) {
    console.error('Не удалось найти элементы уведомления о cookies');
    return;
  }

  // Обработчик для кнопки "Allow"
  acceptButton.addEventListener('click', () => {
    localStorage.setItem('cookieConsent', 'accepted');
    hideCookieNotice(cookieNotice);
  });

  // Обработчик для кнопки "Decline"
  declineButton.addEventListener('click', () => {
    localStorage.setItem('cookieConsent', 'declined');
    hideCookieNotice(cookieNotice);
  });
}

/**
 * Скрывает уведомление о cookies с анимацией
 */
function hideCookieNotice(element) {
  element.classList.add('hidden');

  // Удаляем элемент из DOM после завершения анимации
  setTimeout(() => {
    element.remove();
  }, 500); // 500ms соответствует длительности анимации slideOut
}

// Экспортируем функцию для использования в других скриптах
if (typeof module !== 'undefined' && module.exports) {
  module.exports = { loadCookieNotice };
}
