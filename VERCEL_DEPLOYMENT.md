# Vercel Deployment Guide

## Project Structure
Your Express backend has been restructured for Vercel deployment:

```
/
├── api/
│   └── index.js          # Main API serverless function
├── assistant/            # Your React frontend
├── package.json          # Root dependencies
├── vercel.json          # Vercel configuration
└── VERCEL_DEPLOYMENT.md # This file
```

## Environment Variables
Set these in your Vercel project settings:

- `OPENAI_API_KEY`: Your OpenAI API key

## Deployment Steps

1. **Install Vercel CLI** (if not already installed):
   ```bash
   npm i -g vercel
   ```

2. **Login to Vercel**:
   ```bash
   vercel login
   ```

3. **Deploy to Vercel**:
   ```bash
   vercel
   ```

4. **Set Environment Variables**:
   - Go to your Vercel dashboard
   - Navigate to your project settings
   - Add the `OPENAI_API_KEY` environment variable

## API Endpoints

After deployment, your API will be available at:
- `POST /api/chatgpt` - ChatGPT API endpoint
- `GET /api/health` - Health check endpoint

## Frontend Integration

Update your frontend API calls to use the new Vercel URL:
```javascript
// Instead of localhost:5000/api/chatgpt
// Use: https://your-project.vercel.app/api/chatgpt
```

## Development

To run locally with Vercel:
```bash
npm run dev
```

## Notes

- The API is now a serverless function that will scale automatically
- Maximum execution time is set to 30 seconds
- CORS is enabled for cross-origin requests
- All routes under `/api/*` are routed to the Express app 