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

## Contact Form

The contact form posts to `app/api/contact/route.ts` and stores messages in MongoDB.
Set these server-side environment variables locally and in deployment:

```bash
MONGODB_URI=mongodb+srv://<username>:<password>@<cluster-url>/?retryWrites=true&w=majority
MONGODB_DB=portfolio
MONGODB_MESSAGES_COLLECTION=messages
```

`MONGODB_DB` defaults to `portfolio` and `MONGODB_MESSAGES_COLLECTION` defaults to `messages` if omitted.
Do not prefix these variables with `NEXT_PUBLIC_`; they should stay server-only.

For Vercel, redeploy after changing environment variables. If Atlas rejects the request with a TLS or network error, confirm that **Atlas > Network Access** allows Vercel to connect. The simplest production setup is to allow `0.0.0.0/0` in Atlas Network Access, then keep the database user password strong. This project pins Node to `22.x` in `package.json`; after redeploying, Vercel function logs should no longer show `nodejs24.x`.

To view submissions, open MongoDB Atlas, go to **Database > Browse Collections**, then open the configured database and collection. Each message is stored with `name`, `email`, `message`, `status`, `source`, `createdAt`, and basic request metadata.

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
