# Unreal Engine Directory 🎮
_* This project is not affiliated with Epic Games, Inc. in any way. All trademarks are property of their respective owners in the US and other countries. All other trademarks are property of their respective owners._

## About

This is an open source, faster, and modern alternative to the Unreal Engine Marketplace, built with a focus on user experience. Find assets with ease using more filters and enjoy a better browsing experience.

### Visit the site at [https://unrealengine.directory/](https://unrealengine.directory/)

_You can find more Open Source projects at [https://github.com/kodkodpro](https://github.com/kodkodpro)_

## Technologies

* 🚀 Next.js 13.3 (App directory)
* 🪄 Prisma
* 🌊 TypeScript
* 🎨 TailwindCSS
* 📽️ Framer Motion
* 🕷️ Web Scraping
* 🚪 Proxying
* 📝 Markdown
* 🛡️ Zod
* 🔍 ESLint
* 🚧 Sentry
* 📊 Google Analytics

## Infrastructure

* ☁️ Vercel
* 🦾️ Supabase

## Getting Started

### Prerequisites

* Node.js 18
* PNPM
* PostgreSQL

### Installation

1. Clone the repo

```sh
git clone https://github.com/kodkodpro/unrealengine.directory.git
```

2. Install NPM packages

```sh
pnpm install
```

3. Copy example environment file and fill in the values

```sh
cp .env.example .env
```

4. Run the development server

```sh
pnpm dev
```

5. Open [http://localhost:3000](http://localhost:3000) with your browser to see the result

6. Scrape the Unreal Engine Marketplace
 
    6.1. Visit [http://localhost:3000/dev](http://localhost:3000/dev)

    6.2. Fill in "API Key" that you specified in the `.env` file

    6.3. Fill in "URL" under "Parse Collection" (e.g. https://www.unrealengine.com/marketplace/en-US/showcase)

    6.4. Click "Parse Collection"

    6.5. Wait for the scraping to finish (check Network tab in DevTools to see when it's done)

7. Clap your hands and say "Yay!"

## ❤️ Show your support

Give a ⭐️ if this project helped you!

## 🤝 Contributing

Contributions, issues and feature requests are welcome!

## 🧑‍💻 Author

**Andrew Kodkod** – [GitHub](https://github.com/akodkod) – [Twitter](https://twitter.com/AndrewKodkod)

## 📝 License

This project is [MIT](/LICENSE) licensed.


