# Страница памяти (Memorial Page) - Документация

## Обзор

Создана страница памяти `/testimonial` с расположением элементов из образца amemory.ru, но с использованием вашего текущего дизайна и стилистики.

## Файлы

1. **testimonial.html** - HTML страница памяти
2. **assets/testimonial.js** - JavaScript с анимациями и структурой данных для Django

## Структура страницы

### 1. Hero Section (Главный раздел)
- **Левая часть**: Имя покойного, даты жизни (с крестом), навигационные кнопки
- **Правая часть**: Портретная фотография
- **Элементы**: Крест (SVG), ФИО, годы жизни, навигация

### 2. Biography Section (Биография)
- **Левая часть**: Текст биографии
- **Правая часть**: Дополнительное фото
- **Дизайн**: Использует ваши классы `.title-section`, `.label-section`

### 3. Letter of Memory (Письмо памяти)
- Центрированный блок с письмом
- Белый фон с тенью на сером background
- Структурированный текст с приветствием и подписью

### 4. Photo Album (Фотоальбом)
- Swiper слайдер с фотографиями
- Кнопки навигации (prev/next)
- Responsive для разных разрешений

### 5. Video Section (Видео памяти)
- Placeholder для видео
- Будет интегрировано позже

### 6. Location Section (Место захоронения)
- **Левая часть**: Адрес, детали (участок, ряд)
- **Правая часть**: Placeholder для Яндекс Карт
- Готово для интеграции с API Яндекс Карт

### 7. QR Code Section (QR-код)
- Центрированный блок с QR-кодом
- Кнопка "Заказать QR-табличку"
- Placeholder для генерации QR

## Интеграция с Django

В файле `testimonial.js` создана структура данных `memorialData`:

```javascript
const memorialData = {
  person: {
    firstName: "Иван",
    middleName: "Петрович",
    lastName: "Сидоров",
    birthDate: "23.05.1965",
    deathDate: "21.08.2019",
    mainPhoto: "/vinayak.png",
    portraitPhoto: "/cameron.png",
  },
  biography: { ... },
  letter: { ... },
  photoAlbum: [ ... ],
  videos: [ ... ],
  burial: {
    country: "Россия",
    city: "Москва",
    cemetery: "Новодевичье кладбище",
    coordinates: { lat: 55.7269, lng: 37.5563 }
  },
  qrCode: { ... }
}
```

### Рекомендации для Django:

1. **Models** - Создайте модели:
   - `Person` (ФИО, даты, фото)
   - `Biography` (текст, фото)
   - `Letter` (приветствие, текст, подпись)
   - `Photo` (файл, описание)
   - `Video` (URL, thumbnail)
   - `BurialLocation` (адрес, координаты)
   - `QRCode` (URL, изображение)

2. **Views** - Используйте:
   ```python
   def memorial_page(request, memorial_id):
       memorial = get_object_or_404(Memorial, id=memorial_id)
       context = {
           'person': memorial.person,
           'biography': memorial.biography,
           'photos': memorial.photos.all(),
           # и т.д.
       }
       return render(request, 'testimonial.html', context)
   ```

3. **Template Tags** - В HTML замените:
   - `"Иван Петрович Сидоров"` → `{{ person.full_name }}`
   - `"23.05.1965 - 21.08.2019"` → `{{ person.birth_date }} - {{ person.death_date }}`
   - Циклы для фотоальбома: `{% for photo in photos %}`

## Анимации (GSAP)

Страница использует GSAP ScrollTrigger для анимаций:
- Hero section: появление слева/справа
- Секции: появление при скролле (70% viewport)
- Плавные переходы между элементами

## Responsive дизайн

Breakpoints (из Tailwind):
- Mobile: 320px-640px
- Tablet: 640px-1024px
- Desktop: 1024px+

## Цветовая схема

Используются цвета из вашего `tailwind.config.js`:
- **primary**: `#8246FB` (фиолетовый)
- **darkBlack**: `#050810`
- **primaryGrey**: `#8B919E`
- **tertiaryGrey**: `#E3E5E8`

## Следующие шаги

1. **Яндекс Карты**: Интегрировать API
   ```javascript
   ymaps.ready(function() {
       var map = new ymaps.Map('map', {
           center: [memorial.burial.coordinates.lat, memorial.burial.coordinates.lng],
           zoom: 15
       });
   });
   ```

2. **QR Code**: Генерация через библиотеку (qrcode.js или на бэкенде)

3. **Video Player**: Интеграция плеера (YouTube, Vimeo, или custom)

4. **Django Templates**: Конвертировать в Django template с переменными

5. **Upload функционал**: Добавить возможность загрузки фото/видео

## Доступ к странице

После запуска сервера:
```bash
npm run dev
```

Страница будет доступна по адресу:
`http://localhost:5173/testimonial`

## Примечания

- Все изображения сейчас используют placeholder'ы из `/public`
- Структура готова для динамических данных из Django
- Дизайн полностью соответствует вашему текущему стилю
- Расположение элементов взято из amemory.ru образца
