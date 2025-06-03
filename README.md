# Matte Spelet 🎯

Ett enkelt mattespel för barn som tränar addition och subtraktion.

## Funktioner

- 10 matteuppgifter per omgång
- Addition och subtraktion med tal upp till 20
- 4 svarsalternativ per fråga
- Visuell feedback för rätt/fel svar
- Ljudeffekter för rätt/fel svar
- Success-skärm som visar resultatet
- Krav på 9 av 10 rätt för att klara spelet

## Teknisk Stack

- React med TypeScript
- Vanilla CSS för styling
- Vite som byggverktyg

## Installation

1. Klona detta repository:
   ```bash
   git clone <repository-url>
   cd matte-spel
   ```

2. Installera beroenden:
   ```bash
   npm install
   ```

## Utveckling

För att starta utvecklingsservern:
```bash
npm run dev
```

## Byggning

För att bygga produktionversionen:
```bash
npm run build
```

## Tester

Kör alla enhetstester med:
```bash
npm run test
```

## Hosting

Efter byggning finns de färdiga filerna i `dist`-mappen som kan hostas på vilken webbserver som helst.

## Ljudeffekter

Spelet använder ljudeffekter för rätt och fel svar. För att detta ska fungera behöver du lägga till följande ljudfiler i `public`-mappen:
- `correct.mp3` - Spelas när svaret är rätt
- `wrong.mp3` - Spelas när svaret är fel
