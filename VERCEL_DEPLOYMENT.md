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

1. **Push the updated files to GitHub**:
   ```bash
   git add .
   git commit -m "Fix Vercel configuration for React app"
   git push
   ```

2. **Go to your Vercel dashboard** and redeploy:
   - Go to [vercel.com/dashboard](https://vercel.com/dashboard)
   - Find your project
   - Click "Redeploy" or it will auto-deploy from GitHub

3. **Set Environment Variables** (if not already set):
   - Go to your project settings in Vercel
   - Add `OPENAI_API_KEY` environment variable

## API Endpoints

After deployment, your API will be available at:
- `POST /api/chatgpt` - ChatGPT API endpoint
- `GET /api/health` - Health check endpoint

## Frontend Integration

Your frontend is already configured to use relative paths, so it will work automatically with the new Vercel domain.

## Testing Your Deployment

1. **Test the API**:
   - `https://your-project.vercel.app/api/health`
   - `https://your-project.vercel.app/api/chatgpt`

2. **Test the frontend**:
   - `https://your-project.vercel.app/` (should show your React app)

## Troubleshooting 404 Errors

If you still get 404 errors:

1. **Check the build logs** in your Vercel dashboard
2. **Verify environment variables** are set correctly
3. **Make sure all files are pushed** to GitHub
4. **Try redeploying** from the Vercel dashboard

## Development

To run locally with Vercel:
```bash
npm run dev
```

## Notes

- The API is now a serverless function that will scale automatically
- Maximum execution time is set to 30 seconds
- CORS is enabled for cross-origin requests
- React app will be built and served from the assistant directory
- All routes under `/api/*` are routed to the Express app 