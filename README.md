# Attack Shark X3 Landing

Адаптивный лендинг для продажи игровой мыши **Attack Shark X3**. Проект создан на основе Vite и Tailwind CSS, включает
форму заказа с валидацией, интеграцию с Formspree и Netlify Functions для записи заказов, а также CI/CD с GitHub Pages.

## 📦 Стек

- [Vite](https://vitejs.dev/) для разработки и сборки
- [Tailwind CSS](https://tailwindcss.com/) для стилизации
- Ванильный JavaScript (ES Modules)
- GitHub Actions для линтинга и деплоя
- Netlify Functions / Formspree для обработки форм

## 🚀 Быстрый старт

```bash
git clone git@github.com:<user>/attack-shark-x3-landing.git
cd attack-shark-x3-landing
npm install
npm run dev
```

Откройте `http://localhost:5173` в браузере. Vite обслуживает директорию `src/`.

## 🛠 Скрипты

| Команда           | Назначение                                   |
| ----------------- | -------------------------------------------- |
| `npm run dev`     | Запуск локального dev-сервера Vite           |
| `npm run build`   | Продакшн сборка в директорию `dist/`         |
| `npm run preview` | Предпросмотр собранной версии                |
| `npm run lint`    | Проверка JavaScript файлов линтером ESLint   |
| `npm run deploy`  | Локальный деплой (build) перед загрузкой     |

## 📝 Настройка формы заказа

1. Создайте форму на [Formspree](https://formspree.io/) и замените значение `FORM_ENDPOINT` в `src/js/main.js`.
2. Для локального логирования заказов используйте Netlify Functions:
   - Установите [Netlify CLI](https://docs.netlify.com/cli/get-started/).
   - Выполните `netlify dev` в корне проекта. Функция `/.netlify/functions/order` добавит заявки в `orders.json`.
3. В продакшене рекомендуется подключить серверную обработку (например, Netlify, AWS Lambda или собственный backend).

## 💡 Где менять контент

- Цена и основное описание: `src/index.html` (Hero-блок).
- Изображения: директория `public/images`. Замените SVG-заглушки `hero.svg`, `gallery-*.svg` на реальные фотографии (например, в формате WebP или JPEG).
- Контактный email: `footer` и переменная `FORM_ENDPOINT`.
- Ссылки на социальные сети и документы — блок Footer в `src/index.html`.

## 🔐 SEO и доступность

- Мета-теги, Open Graph и структурированные данные Schema.org размещены в `src/index.html`.
- `sitemap.xml` и `public/robots.txt` подключить в настройках хостинга.
- Все изображения содержат `alt`-тексты, элементы интерфейса доступны с клавиатуры.

## 🧪 Чек-лист приёмки

- [ ] Адаптивность 375px / 768px / 1440px
- [ ] Форма заказа валидируется и отправляет данные
- [ ] Schema.org Product проходит проверку Rich Results
- [ ] CI GitHub Actions проходит успешно
- [ ] Деплой доступен на GitHub Pages (или Netlify)

## 🌐 Деплой

### GitHub Pages

1. В настройках репозитория включите GitHub Pages с источником GitHub Actions.
2. При пуше в `main` workflow `.github/workflows/ci-deploy.yml` выполнит сборку и деплой.

### Netlify

1. Подключите репозиторий к Netlify и укажите команду сборки `npm run build` и директорию публикации `dist`.
2. Добавьте переменные окружения, если требуются.

## 📄 Лицензия

Проект распространяется по лицензии [MIT](LICENSE).
