This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
# voritemedia

```
voritemedia
├─ eslint.config.mjs
├─ next-env.d.ts
├─ next.config.ts
├─ package-lock.json
├─ package.json
├─ postcss.config.mjs
├─ public
│  └─ photos
│     ├─ banner.avif
│     ├─ brand.jpg
│     ├─ image01.jpg
│     ├─ image02.avif
│     ├─ image03.avif
│     ├─ image04.avif
│     ├─ marketing.avif
│     ├─ mobile-app.jpg
│     ├─ mobile.avif
│     ├─ mountain.jpg
│     ├─ netflix.jpg
│     ├─ reel.jpg
│     ├─ software.avif
│     └─ web.avif
├─ README.md
├─ src
│  ├─ app
│  │  ├─ api
│  │  │  ├─ auth
│  │  │  │  └─ route.js
│  │  │  ├─ cloudinary-signature
│  │  │  │  └─ route.js
│  │  │  ├─ contact
│  │  │  │  └─ route.js
│  │  │  ├─ gallery
│  │  │  │  └─ route.js
│  │  │  ├─ testimonials
│  │  │  │  └─ route.js
│  │  │  └─ upload
│  │  │     └─ proxy
│  │  │        └─ route.js
│  │  ├─ contact
│  │  │  └─ page.js
│  │  ├─ contactform
│  │  │  └─ page.js
│  │  ├─ dashboard
│  │  │  ├─ DashboardClient.jsx
│  │  │  └─ page.js
│  │  ├─ Gallery
│  │  │  └─ page.js
│  │  ├─ globals.css
│  │  ├─ layout.js
│  │  ├─ login
│  │  │  └─ page.js
│  │  ├─ page.js
│  │  ├─ portfolio
│  │  │  └─ page.js
│  │  ├─ services
│  │  │  └─ page.js
│  │  └─ work
│  │     └─ page.js
│  ├─ components
│  │  ├─ common
│  │  │  ├─ Button.jsx
│  │  │  ├─ Footer.jsx
│  │  │  └─ Navbar.jsx
│  │  └─ home
│  │     ├─ Hero.jsx
│  │     ├─ PortfolioPreview.jsx
│  │     ├─ ServicesPreview.jsx
│  │     └─ Testimonials.jsx
│  ├─ config
│  │  └─ site.js
│  ├─ data
│  │  ├─ portfolio.js
│  │  ├─ services.js
│  │  └─ testimonials.js
│  ├─ hooks
│  │  └─ useScrollTop.js
│  ├─ lib
│  │  ├─ dbConnect.js
│  │  ├─ email.js
│  │  └─ uploadToCloudinaryServer.js
│  ├─ models
│  │  ├─ Booking.js
│  │  ├─ Contact.js
│  │  ├─ Gallery.js
│  │  └─ Testimonial.js
│  ├─ styles
│  │  └─ animations.css
│  └─ utils
│     ├─ compressVideo.client.js
│     ├─ constants.js
│     ├─ helpers.js
│     └─ validators.js
├─ tailwind.config.js
└─ tsconfig.json

```