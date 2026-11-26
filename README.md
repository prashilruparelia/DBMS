# DBMS Study Hub — Mobile & Cloud Edition v2.0
DJS23EMD301 · EXTC · Semester V

This is the shareable edition of the study portal. It has no backend SQL endpoint. All queries run on the student's device in a disposable WebAssembly worker. Render serves static files only. No accounts, database server, environment secrets or paid add-ons are required.

## Publish on Render using GitHub (recommended)
1. Extract this ZIP. Open the folder `DBMS-Study-Hub` and verify that it contains `package.json`, `build.js`, `render.yaml` and `public/`.
2. Sign in at https://github.com/ and create a **private** repository named `dbms-study-hub`. Choose Add file > Upload files. Upload the files and folders **inside** the extracted folder (not the ZIP, and not the enclosing folder). In the repository root you should see `package.json` and `public/`. Commit the files. Do not upload your previous 47 MB local edition or any lecture files without permission.
3. Sign in at https://dashboard.render.com/ with GitHub. Click New > Static Site (not Web Service). Connect GitHub and authorize access to the repository if requested. Select `dbms-study-hub`.
4. Enter these settings:
   - Name: `dbms-study-hub` (or any available name)
   - Branch: `main` (or the branch you uploaded)
   - Root Directory: leave blank
   - Build Command: `npm install --no-audit --no-fund && npm run build`
   - Publish Directory: `public`
   - If needed, set environment variable `NODE_VERSION` to `22.16.0` (or a supported newer LTS).
5. Create the static site and check the deployment log. The build installs the pinned SQL.js package, copies its JS and WASM into `public/vendor/` and runs SQL exercise tests. If the build fails, do not treat the site as ready; inspect the log.
6. When Render reports the site is live, open its assigned HTTPS `onrender.com` URL. Check notes, flashcards, one SQL exercise (e.g. task 1: `SELECT * FROM Student;`) and a quiz on your mobile. Share the actual URL over WhatsApp. Your PC can be switched off.

You can also use the supplied `render.yaml` with Render Blueprints. Use only one deployment method. Static hosting is offered free subject to provider quotas and terms; check the dashboard before enabling any paid extras. A private repository does not make the deployed website private. Anyone with the public site URL can see its contents.

Render guide: https://render.com/docs/static-sites

## Test locally before publishing (optional)
Open the extracted folder in VS Code. Node.js 22.16+ recommended. Run:

```
npm install
npm run build
npm run dev
```

Open http://localhost:5173. Keep the terminal open. Windows users can also double-click `Start-DBMS.bat` (first run needs internet for npm). If PowerShell blocks npm.ps1, use `npm.cmd install`, `npm.cmd run build`, and `node server.js` instead. No arbitrary SQL is executed by this preview server.

## For classmates
Open the shared URL in Chrome or Safari. Mobile quick navigation gives direct access to Home, Notes, Cards, SQL and Tests. Tap the menu for all twelve sections. Use Share to forward the link. For a home screen shortcut, Chrome: menu > Add to Home screen / Install app (if offered); Safari: Share > Add to Home Screen. After a successful online cache installation, supported browsers may use the app offline, subject to storage settings and browser eviction. A first visit requires internet.

Progress is individual to each browser and origin. No cloud account or automatic device sync. To move progress from the local version, go to Sources & syllabus > Export progress JSON, then import on the hosted site. Active tests do not persist after refresh. Keep backups if you clear browser data. No analytics added by the app; the hosting provider may keep ordinary access logs.

## Included learning features
40 topic summaries, 80 flashcards, 40 MCQs, 26 written questions, 35 SQL challenges, two 60-mark mock exams, worked previous-year paper, normalization and serializability solvers, timestamp simulator, planner, revision, bookmarks and mistake notebook. Original uploaded slides, PDFs and syllabus image are intentionally excluded. Generated notes and worked answers remain; obtain permission before sharing course-derived material publicly. One PYQ is not a prediction of the next exam.

SQL uses SQLite, not Oracle. The notes distinguish the dialects. Sample data is reset every operation; result matching is not a proof for all datasets. Queries have a 15-second worker timeout (including startup), 500-row display limit and 12,000-character input limit. Mobile devices with low memory may struggle with very expensive queries. Written exams are self-marked. Normalization solver assumes atomic values; timestamp solver models basic ordering, not crash recovery.

## Verification and outstanding checks
- The existing Node SQLite reference tests passed all 35 SQL exercises, solver tests, page templates and state transitions (`npm test`). The original Node worker is included for tests only; it is not published or invoked by the preview server.
- Chromium rendered all twelve views at widths of 390, 768 and 1366 px using inline copies of the actual HTML, CSS and JavaScript. No horizontal page overflow or JavaScript page errors in these checks; mobile menu and bottom navigation worked.
- Network access to npm was unavailable in the creation environment. Therefore the actual SQL.js package could not be installed here and its browser integration, service worker install/offline mode and public deployment were not end-to-end tested. `npm run build` runs the 35 model queries and negative checks using the pinned SQL.js WebAssembly engine before deployment; verify an actual SQL query in your browser after hosting.
- `npm test` needs Node.js 22.16+ (built-in SQLite). `npm run test:browser-sql` requires npm install.
