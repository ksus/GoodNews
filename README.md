# GoodNews – niezbędnik ewangelisty (PWA)

Aplikacja działająca na telefonie, tablecie i komputerze, **także offline**. Zawiera:

1. **Cztery Prawa Duchowego Życia** – pełna książeczka (14 ekranów, z ilustracjami).
2. **The Four** – cztery punkty z wersetami; link do thefour.com (wymaga internetu).
3. **Teotest** – 10 pytań w dwóch ścieżkach (Teo / Ateo), podpowiedzi dla prowadzącego, stoper 10 min.

Ustawienia: motyw jasny / ciemny / auto, 6 rozmiarów czcionki, „nie wygaszaj ekranu”, instalacja.
Czysty HTML + CSS + JS – **bez budowania i bez zależności**.

## Uruchomienie lokalne

Service Worker wymaga HTTP (nie `file://`):

```bash
python3 -m http.server 8080
# otwórz http://localhost:8080
```

## Wdrożenie na GitHub Pages

1. Utwórz repozytorium na GitHubie i wyślij do niego zawartość tego folderu (gałąź `main`).
2. **Settings → Pages → Build and deployment → Source: GitHub Actions**.
3. Workflow `.github/workflows/pages.yml` opublikuje stronę pod `https://<użytkownik>.github.io/<repo>/`.

> Alternatywa bez Actions: Settings → Pages → *Deploy from a branch* → `main` / `(root)`. Usuń wtedy folder `.github`.

Wszystkie ścieżki są względne, więc aplikacja działa w podkatalogu repozytorium.

## Instalacja na urządzeniu

- **Android / Chrome / Edge / komputer**: menu → „Zainstaluj aplikację” (lub przycisk w Ustawieniach).
- **iPhone / iPad (Safari)**: Udostępnij → „Dodaj do ekranu początkowego”.

Pierwsze otwarcie musi być z internetem – wtedy treści zapisują się na urządzeniu.

## Edycja treści

Wszystkie teksty są w **`data.js`**: slajdy Czterech Praw, punkty The Four, pytania i podpowiedzi Teotestu.

## Aktualizacje

Po każdej zmianie plików zwiększ `VERSION` w `sw.js` (np. `1.0.1`). Urządzenia pokażą komunikat „Dostępna nowa wersja – Odśwież”.
Jeśli dodasz nowy plik do aplikacji, dopisz go do listy `ASSETS` w `sw.js`.

## Struktura

```
index.html  styles.css  app.js  data.js  sw.js  manifest.webmanifest
icons/      .github/workflows/pages.yml
```
