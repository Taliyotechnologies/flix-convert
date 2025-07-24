# FlixConvert Frontend

## Local Development

1. Install dependencies:
   ```bash
   npm install
   ```
2. Start the development server:
   ```bash
   npm run dev
   ```

## Build for Production

```bash
npm run build
```

## Preview Production Build

```bash
npm run start
```

## Deploy to Vercel

1. Push this repo to GitHub.
2. Go to [Vercel](https://vercel.com/) and import your repo.
3. Set the project root to `frontend`.
4. Vercel will auto-detect Vite/React and use the `build` script.
5. Your site will be live at your Vercel domain (e.g., https://flixconvert.taliyotechnologies.com/).

## Deploy to Render

1. Push this repo to GitHub.
2. Go to [Render](https://render.com/) and create a new Static Site.
3. Set the build command to `npm run build` and the publish directory to `dist`.
4. Set the root to `frontend`.
5. Your site will be live at your Render domain (e.g., https://flix-convert.onrender.com).

---

For more, see the deployed site:
- Vercel: https://flixconvert.taliyotechnologies.com/
- Render: https://flix-convert.onrender.com 