
TempMailsPro - Complete project (backend + frontend)

How to run (Node.js):

1. Install dependencies
   npm install

2. Start server
   npm start

3. Open in browser:
   http://localhost:3000/

Features:
- Backend proxy to 1secmail public API
- Mailbox metadata stored in mailboxes.json for TTL, recovery token, and extension
- Endpoints:
  GET /api/genMailbox?login=xxx&domain=yyy      - generate mailbox (or random if omitted)
  GET /api/getMessages?login=xxx&domain=yyy    - get messages
  GET /api/readMessage?login=xxx&domain=yyy&id=123 - read specific message
  POST /api/extendMailbox                        - body: {login,domain,token,extraMinutes}
  GET /api/recover?token=TOKEN                   - recover mailbox metadata by token

Notes:
- This project proxies to public 1secmail API. For production, consider:
  - Deploying on a reliable server (VPS / cloud) with HTTPS
  - Using your own temp-mail backend or paid provider for stability and domain control
  - Adding authentication, abuse prevention, and storage cleanup policies
