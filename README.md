# 🌐 Modern Portfolio — Next.js 15 + Tailwind CSS

[![MIT License](https://img.shields.io/badge/license-MIT-blue.svg)](LICENSE)
[![Next.js](https://img.shields.io/badge/Next.js-15.0.0-blue)](https://nextjs.org)
[![Vercel](https://img.shields.io/badge/deployed%20on-Vercel-black)](https://portfolio-inky-six-36.vercel.app)

Production-grade portfolio website with cutting-edge features and optimizations.

[🔗 Live Demo](https://portfolio-inky-six-36.vercel.app/) | [📂 Source Code](https://github.com/AntonyShaga/portfolio) | [📝 Report Issue](https://github.com/AntonyShaga/portfolio/issues)

## ✨ Key Features

- ⚡ **Blazing Fast Performance** (SSR/SSG + ISR)
- 🌙 **Smart Theme System** (Dark/Light + OS preference)
- 🌍 **i18n Ready** (Multi-language support out of the box)
- ✉️ **Secure Contact Form** (JWT + Redis rate limiting)
- 🎨 **Butter Smooth Animations** (Framer Motion)
- 📱 **Mobile-First Responsive** (Perfect on all devices)
- 🔒 **Type-Safe Validation** (Zod + React Hook Form)

## 🛠 Tech Stack

| Category        | Technologies                                                                 |
|-----------------|-----------------------------------------------------------------------------|
| Framework       | [Next.js 15 (App Router)](https://nextjs.org/)                              |
| UI Library      | [React 19](https://react.dev/)                                              |
| Styling         | [Tailwind CSS 4](https://tailwindcss.com/) + CSS Modules                    |
| Type Safety     | [TypeScript 5](https://www.typescriptlang.org/)                             |
| Animations      | [Framer Motion](https://www.framer.com/motion/)                             |
| Forms           | [React Hook Form](https://react-hook-form.com/) + [Zod](https://zod.dev/)   |
| Security        | [JWT](https://jwt.io/) + [Redis](https://redis.io/)                         |
| Email           | [Resend](https://resend.com/) + React Email                                 |

## 🏆 Performance Highlights

![Desktop Lighthouse](/public/screenshots/lighthouse-desktop.webp)

*Desktop: Performance 100 • Accessibility 100 • Best Practices 100*

![Mobile Lighthouse](/public/screenshots/lighthouse-mobile.webp)

*Mobile: Performance 95 • Accessibility 100 • SEO 100*

## ⚙️ Configuration

Create `.env.local` file:

```env
REDIS_URL=redis://default:password@host:port

JWT_SECRET=your_64_char_secure_key

RESEND_API_KEY=re_your_api_key_here

FROM_EMAIL=verified@domain.com

TO_EMAIL=your@email.com
```

⚠️ Important: Never commit real credentials! Add .env* to .gitignore

```bash
# 1. Clone repo
git clone https://github.com/AntonyShaga/portfolio.git
cd portfolio

# 2. Install deps (recommended)
npm ci

# 3. Run dev server
npm run dev
```
Open http://localhost:3000 in your browser.


📜 License

MIT © Antony Shaga

[⭐ Star this project](https://github.com/AntonyShaga/portfolio/stargazers) |
[💬 Discuss ideas](https://github.com/AntonyShaga/portfolio/discussions) |
[🔄 Contribute](https://github.com/AntonyShaga/portfolio/blob/main/CONTRIBUTING.md)
