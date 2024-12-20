# ShareReads

Quickly create and share lists of books with anyone 

🚀 https://sharereads.xyz/

Build using Cloudflare Pages, Cloudflare KV, and MongoDB 

![image](https://github.com/user-attachments/assets/109eca79-ac83-42a1-81b4-317071baa37d)
![image](https://github.com/user-attachments/assets/92c5b2c1-e03e-483f-87c3-986440e14e32)
![image](https://github.com/user-attachments/assets/e67f715a-0aac-4524-9239-f67a2db2bdb7)

## Development

Run the dev server:

```sh
npm run dev
```

## Typegen

Generate types for your Cloudflare bindings in `wrangler.toml`:

```sh
npm run typegen
```

You will need to rerun typegen whenever you make changes to `wrangler.toml`.

## Deployment

First, build your app for production:

```sh
npm run build
```

Then, deploy your app to Cloudflare Pages:

```sh
npm run deploy
```

## Styling

This template comes with [Tailwind CSS](https://tailwindcss.com/) already configured for a simple default starting experience. You can use whatever css framework you prefer. See the [Vite docs on css](https://vitejs.dev/guide/features.html#css) for more information.
