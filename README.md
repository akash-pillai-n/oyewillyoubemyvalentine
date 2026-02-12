# Sweetheart Serenade

## How to run locally

Requirements: Node.js & npm — [install with nvm](https://github.com/nvm-sh/nvm#installing-and-updating) if needed.

```sh
# Install dependencies
npm i

# Start the development server
npm run dev
```

## Deploy with GitHub Pages

1. **Push this repo to GitHub** (if you haven’t already).

2. **Turn on GitHub Pages**
   - Open the repo on GitHub → **Settings** → **Pages**.
   - Under **Build and deployment**, set **Source** to **GitHub Actions**.

3. **Deploy**
   - Push to the `main` branch (or run the workflow from the **Actions** tab).
   - After the workflow finishes, the site will be at **https://\<your-username\>.github.io/oyewillyoubemyvalentine/**

If you rename the repo again, set the `BASE_PATH` env in `.github/workflows/deploy-pages.yml` to `/<new-repo-name>/`.

## Tech stack

- Vite
- TypeScript
- React
- shadcn-ui
- Tailwind CSS
