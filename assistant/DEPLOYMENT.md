# 🚀 Deployment Guide - Climate Action App

This guide will help you deploy the Climate Action React app to IBM Cloud.

## 📋 Prerequisites

- IBM Cloud account
- Node.js installed locally
- IBM Cloud CLI (optional but recommended)

## 🔧 Local Setup

1. **Install dependencies**
   ```bash
   npm install
   ```

2. **Test locally**
   ```bash
   npm start
   ```

3. **Build for production**
   ```bash
   npm run build
   ```

## 🌐 Deployment Options

### Option 1: IBM Cloud Object Storage (Recommended)

1. **Create IBM Cloud Object Storage**
   - Go to IBM Cloud Console
   - Create a new Object Storage service
   - Create a new bucket for your website

2. **Configure Static Website Hosting**
   - In your bucket settings, enable "Static Website Hosting"
   - Set the index document to `index.html`
   - Set the error document to `index.html` (for React Router)

3. **Upload Files**
   - Upload all contents from the `build/` folder to your bucket
   - Make sure to maintain the folder structure

4. **Access Your Website**
   - Use the provided endpoint URL
   - Optionally configure a custom domain

### Option 2: IBM Cloud Foundry

1. **Install IBM Cloud CLI**
   ```bash
   # Download from: https://cloud.ibm.com/docs/cli?topic=cli-install-ibmcloud-cli
   ```

2. **Login to IBM Cloud**
   ```bash
   ibmcloud login
   ibmcloud target --cf
   ```

3. **Create manifest.yml**
   ```yaml
   applications:
   - name: climate-action-app
     memory: 64M
     buildpacks:
     - staticfile_buildpack
     env:
       FORCE_HTTPS: true
   ```

4. **Deploy**
   ```bash
   ibmcloud cf push
   ```

### Option 3: IBM Cloud Code Engine

1. **Create Code Engine Project**
   - Go to IBM Cloud Console
   - Create a new Code Engine project

2. **Build and Deploy**
   - Connect your GitHub repository
   - Set build command: `npm run build`
   - Set run command: `npx serve -s build -l 8080`

## 🔒 Environment Variables

For production, consider adding these environment variables:

```env
REACT_APP_OPENAI_API_KEY=your_openai_api_key
REACT_APP_ANALYTICS_ID=your_analytics_id
```

## 📊 Performance Optimization

1. **Enable Compression**
   - Configure gzip compression on your hosting platform

2. **Set Cache Headers**
   - Cache static assets for 1 year
   - Cache HTML for 1 hour

3. **Enable HTTPS**
   - Always use HTTPS in production
   - Configure SSL certificates

## 🧪 Testing Deployment

1. **Test all features**
   - Search functionality
   - Chart rendering
   - Chatbot responses
   - Mobile responsiveness

2. **Performance testing**
   - Use Google PageSpeed Insights
   - Test on different devices

## 🐛 Troubleshooting

### Common Issues

1. **404 Errors on Refresh**
   - Configure your hosting to serve `index.html` for all routes
   - This is needed for React Router

2. **Chart.js Not Loading**
   - Ensure all dependencies are installed
   - Check browser console for errors

3. **Styling Issues**
   - Verify Tailwind CSS is properly configured
   - Check if all CSS classes are included in the build

### Support

- Check the browser console for errors
- Verify all files are uploaded correctly
- Test on different browsers and devices

## 📈 Monitoring

1. **Set up analytics**
   - Google Analytics
   - IBM Cloud Monitoring

2. **Error tracking**
   - Sentry or similar service
   - Monitor user interactions

## 🔄 Updates

To update your deployed app:

1. Make your changes locally
2. Test thoroughly
3. Build the project: `npm run build`
4. Upload the new `build/` contents
5. Clear any caches if necessary

---

**🌱 Your Climate Action app is now helping people make sustainable choices!** 