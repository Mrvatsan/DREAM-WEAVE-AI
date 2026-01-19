# DreamWeave AI - Backend

Node.js + Express API handling user authentication, dream storage, and AI analysis integration.

## Setup

1.  Install dependencies:
    ```bash
    npm install
    ```
2.  Configure Environment:
    - Copy `.env.example` to `.env`
    - Add MongoDB URI and Gemini API Key.
3.  Start Server:
    ```bash
    npm run dev
    # Runs on Port 5000
    ```

## API Routes
- `POST /api/auth/register` - Create account
- `POST /api/auth/login` - Get JWT
- `POST /api/dreams` - Log dream (Text/Voice)
- `GET /api/dreams` - Retrieve dream history
