# Конвертация картинок в WebP

Сайт использует `<picture>` теги с WebP + JPG fallback. Чтобы WebP версии заработали — нужно их создать.

## Вариант 1: Онлайн (проще всего)

1. Зайди на https://squoosh.app/ или https://cloudconvert.com/jpg-to-webp
2. Загрузи каждый файл:
   - `work1.jpg` → `work1.webp`
   - `work5.png` → `work5.webp`
   - `work8.jpg` → `wot8.webp` (внимание: файл называется wot8.jpg)
   - `work11.jpg` → `work11.webp`
   - `work22.jpg` → `work22.webp`
   - `work33.jpg` → `work33.webp`
   - `work44.jpg` → `work44.webp`
   - `work55.png` → `work55.webp`
   - `work66.jpg` → `work66.webp`
3. Качество 80% — идеальный баланс размер/качество
4. Загрузи все `.webp` файлы рядом с оригинальными на Netlify

## Вариант 2: cwebp (локально через терминал)

Установить:
- Windows: скачай https://developers.google.com/speed/webp/download
- Mac: `brew install webp`
- Linux: `sudo apt install webp`

Потом в папке с картинками:

```bash
cwebp -q 80 work1.jpg -o work1.webp
cwebp -q 80 work5.png -o work5.webp
cwebp -q 80 wot8.jpg -o wot8.webp
cwebp -q 80 work11.jpg -o work11.webp
cwebp -q 80 work22.jpg -o work22.webp
cwebp -q 80 work33.jpg -o work33.webp
cwebp -q 80 work44.jpg -o work44.webp
cwebp -q 80 work55.png -o work55.webp
cwebp -q 80 work66.jpg -o work66.webp
```

## Если WebP не создашь

Сайт всё равно работает — `<picture>` автоматически падает на `.jpg/.png`. Просто не получишь -50% к размеру.

## Проверка работы WebP

Открой сайт → F12 → Network → перезагрузи. Должны грузиться файлы с расширением `.webp`. Если видишь `.jpg/.png` — значит браузер не нашёл WebP и использовал fallback (это норма, если не создал WebP).
