# 🔑 How to Add Your Gemini API Key

## Step 1: Get Your API Key

1. Go to: https://makersuite.google.com/app/apikey
2. Sign in with your Google account
3. Click "Create API Key"
4. Copy your API key

## Step 2: Add to .env File

### Option A: Create .env File Manually

1. In the **root directory** of the project (`C:\Users\notpe\GeminiStudy`), create a file named `.env`
2. Add this line:
   ```env
   GEMINI_API_KEY=your_actual_api_key_here
   ```
3. Replace `your_actual_api_key_here` with your actual key

### Option B: Copy from Example

1. Copy `.env.example` to `.env`:
   ```powershell
   Copy-Item .env.example .env
   ```
2. Open `.env` in a text editor
3. Replace `your_gemini_api_key_here` with your actual API key

## Step 3: Verify It Works

The API key is used by:
- **AI Service** (`services/ai/main.py`) - Reads `GEMINI_API_KEY` from environment
- **Backend Gateway** - Passes requests to AI service

## File Structure

```
GeminiStudy/
├── .env                 ← ADD YOUR KEY HERE
├── .env.example        ← Template (don't put real key here)
├── backend/
├── frontend/
└── services/
    └── ai/             ← Uses GEMINI_API_KEY
```

## Important Notes

⚠️ **Never commit `.env` to Git!**
- The `.env` file is already in `.gitignore`
- Only commit `.env.example` (without real keys)

✅ **For Production (Netlify/Railway/etc):**
- Add `GEMINI_API_KEY` as an environment variable in your hosting platform
- Don't upload the `.env` file

## Quick Setup

```powershell
# Create .env file
Copy-Item .env.example .env

# Edit .env and add your key
notepad .env
```

Then add your key:
```env
GEMINI_API_KEY=AIzaSy...your-actual-key-here
```

Save and you're done! 🎉

