KINGDOM SPIRIT TECHNOLOGY — COMPLETE WEBSITE + AI CHATBOT
==========================================================

THIS IS THE COMPLETE SOURCE FOLDER. The website files are arranged so that
index.html and backend/ are directly at the repository root when uploaded
the correct way. There is NO extra parent folder to include in GitHub.

ROOT STRUCTURE
--------------
index.html
style.css
script.js
chatbot-widget.js
chatbot-widget.css
backend/
  package.json
  server.js
  .env.example
images/
Main Website Pages/
Services-Department Pages/
Customer Account and Portal Pages/
Administrator Pages/
Enquiry and Project Pages/
Project and Payment Pages/
Legal and Policy Pages/
Technical and Error Pages/

GITHUB UPLOAD — IMPORTANT
-------------------------
1. Extract this ZIP on your phone.
2. Open the extracted folder named Kingdom-Spirit-Technology-Full-Website-Ready-for-GitHub.
3. Upload ALL ITEMS INSIDE THAT FOLDER to the TOP LEVEL of your GitHub repository.
4. Do not upload the ZIP as the only repository item.
5. Do not upload the enclosing folder as one extra nested folder.
6. After upload, the GitHub repository home page must show index.html AND the
   backend folder side by side. Open backend/ and confirm package.json and server.js
   are inside it.
7. Do not upload a real .env file, passwords, or API keys. The .gitignore excludes
   .env files while allowing the safe .env.example template.

RENDER BACKEND SETTINGS
-----------------------
Create a Render Web Service connected to this GitHub repository. Use:
- Runtime / Language: Node
- Branch: your repository's default branch (usually main)
- Root Directory: backend
- Build Command: npm install
- Start Command: npm start

Set these Environment Variables in Render (not in GitHub):
- OPENAI_API_KEY = your private OpenAI secret key
- OPENAI_MODEL = gpt-5.5
- FRONTEND_ORIGIN = https://kingdomspirittech.netlify.app

The backend source is in backend/server.js and its dependencies and start script
are in backend/package.json. Do not move package.json or server.js out of backend/.

CHATBOT CONNECTION
------------------
The chatbot widget is included in the 33 public/customer-facing HTML pages. It is
intentionally excluded from Administrator Pages/admin-login.html and
Administrator Pages/admin-dashboard.html. The widget currently contains a
placeholder Render address: https://YOUR-RENDER-SERVICE.onrender.com. After Render
successfully deploys and gives you a real service URL, that placeholder must be
replaced with the actual URL in the chatbot script tags before the frontend is
redeployed. Do not guess the URL.

DEPLOYMENT SAFETY
-----------------
Uploading this source to GitHub does not by itself change the existing live Netlify
website. Keep the current Netlify deployment unchanged until the backend is deployed
and tested. Do not connect automatic production deployment to Netlify yet.

CURRENT CHATBOT SCOPE
---------------------
The chatbot answers questions about Kingdom Spirit Technology and its seven
departments. It does not yet create bookings, accept payments, create accounts,
or access private client project records; those require separate secure integrations.
