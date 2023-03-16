const path = require('path');
const withSass = require('@zeit/next-sass');
module.exports = withSass({
  /* bydefault config  option Read For More Optioshere
   https://github.com/vercel/next-plugins/tree/master/packages/next-sass
   */
  cssModules: true
})
module.exports = {
  reactStrictMode: false,
  sassOptions: {
    includePaths: [path.join(__dirname, 'styles')],
  },
  images: {
    domains: ['images.unsplash.com', 'lh3.googleusercontent.com'],
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840],
    minimumCacheTTL: 3600,
  },
}

module.exports = {
  reactStrictMode: true,
  env: {
    AMPLIFY_GOOGLE_CLIENT_ID: process.env.AMPLIFY_GOOGLE_CLIENT_ID,
    AMPLIFY_GA_TRACKING_ID: process.env.AMPLIFY_GA_TRACKING_ID,
  }
}
