# Blueprint502 Career Profile Simulator — Netlify Deploy

Deployed this way, BOTH things work: the PDF download (real page, no sandbox)
and the AI profile generation (your API key stays hidden in a serverless function).

## One-time setup (about 15 minutes)

1. **Get an Anthropic API key**
   - Go to console.anthropic.com -> API Keys -> Create Key. Copy it.
   - Add a small amount of credit (each profile costs well under a cent).

2. **Put this folder on GitHub**
   - Create a new repository (e.g. `bp502-simulator`) and upload this folder's
     contents, or push with git.

3. **Connect Netlify**
   - app.netlify.com -> Add new site -> Import an existing project -> pick your repo.
   - Build settings are auto-detected from `netlify.toml`. Deploy.

4. **Add your API key (the important step)**
   - Site configuration -> Environment variables -> Add variable
   - Key: `ANTHROPIC_API_KEY`   Value: your key from step 1
   - Trigger a redeploy (Deploys -> Trigger deploy).

5. **Test**
   - Open your site URL, run an assessment, and hit DOWNLOAD MY PROFILE (PDF).
     The file should land in the browser's downloads.

## Notes
- Never put the API key in `src/` files — it only ever lives in the Netlify
  environment variable, used by `netlify/functions/generate.js`.
- To update the app later, edit `src/App.jsx` and push — Netlify redeploys
  automatically.
- Local testing: `npm install`, then `npx netlify dev` (uses a local `.env`
  file with ANTHROPIC_API_KEY=...).
