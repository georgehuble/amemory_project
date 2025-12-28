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

    if (!response.ok) {
      console.error('Не удалось загрузить cookie-notice.html:', response.status);
      return;
    }

    const html = await response.text();

    // Создаем временный элемент для парсинга HTML
    const temp = document.createElement('div');
    temp.innerHTML = html;

    const cookieElement = temp.firstElementChild;
    if (!cookieElement) {
      console.error('cookie-notice.html пустой или некорректный');
      return;
    }

    // Загружаем CSS
    const link = document.createElement('link');
    link.rel = 'stylesheet';
    link.href = '/components/cookie-notice.css';
    document.head.appendChild(link);

    // Добавляем в body
    document.body.appendChild(cookieElement);

    // Добавляем обработчики событий
    setupCookieNoticeHandlers(cookieElement);

  } catch (error) {
    console.error('Ошибка при загрузке уведомления о cookies:', error);
  }
}

/**
 * Настраивает обработчики событий для кнопок уведомления о cookies
 */
function setupCookieNoticeHandlers(cookieNotice) {
  console.log('Cookie element:', cookieNotice);
  console.log('Cookie innerHTML:', cookieNotice.innerHTML);

  const acceptButton = cookieNotice.querySelector('#acceptCookies');
  const declineButton = cookieNotice.querySelector('#declineCookies');

  console.log('Accept button:', acceptButton);
  console.log('Decline button:', declineButton);

  if (!acceptButton || !declineButton) {
    console.error('Не удалось найти кнопки уведомления о cookies');
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
