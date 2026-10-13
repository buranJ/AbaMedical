# Админ-панель ABA Medical

Админка доступна по адресу `https://abamedical.netlify.app/admin/`. Она работает на Decap CMS, сохраняет контент и изображения в GitHub и не требует отдельного сервера или базы данных.

## Однократная настройка авторизации

1. В GitHub откройте **Settings → Developer settings → OAuth Apps → New OAuth App**.
2. Укажите:
   - **Application name:** `ABA Medical Admin`
   - **Homepage URL:** `https://abamedical.netlify.app`
   - **Authorization callback URL:** `https://api.netlify.com/auth/done`
3. Скопируйте `Client ID`, создайте и скопируйте `Client Secret`.
4. В Netlify откройте проект ABA Medical, затем **Project configuration → Access & security → OAuth → Authentication providers**.
5. Установите провайдер GitHub и вставьте `Client ID` и `Client Secret`.
6. Откройте `/admin/` и войдите через GitHub.

Пользователь должен иметь право записи в репозиторий `buranJ/AbaMedical`. Секрет OAuth хранится только в Netlify и не добавляется в репозиторий.

## Как публикуются изменения

- Товары хранятся в `content/products/`.
- Новости хранятся в `content/news/`.
- Контакты, категории, FAQ и партнёры хранятся в `content/settings/`.
- Загруженные изображения попадают в `public/images/uploads/`.
- Кнопка **Publish** создаёт коммит в ветке `main`.
- Netlify получает новый коммит, собирает сайт и публикует изменения.

Обычно обновление сайта занимает несколько минут. История изменений и возможность отката сохраняются в GitHub и Netlify.
