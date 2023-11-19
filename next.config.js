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
  }
}

module.exports = {
  reactStrictMode: true,
  images: {
    domains: ['images.unsplash.com', 'lh3.googleusercontent.com', 'contest-submission.s3.amazonaws.com'],
    formats: ['image/webp', 'image/jpeg', 'image/png', 'image/gif', 'image/heic'],
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

module.exports = {
  async redirects() {
    return [
      {
        source: '/all-categories',
        destination: '/collab-categories',
        permanent: true
      },
      {
        source: '/all-contest',
        destination: '/art-contests-for-artists',
        permanent: true
      },
      {
        source: '/get-inspired',
        destination: '/content-creation-ideas-for-artists',
        permanent: true
      },
      {
        source: '/privacy',
        destination: '/wondor/privacy',
        permanent: true
      },
      {
        source: '/tutorial',
        destination: '/wondor/how-to-use-wondor',
        permanent: true
      },
      {
        source: '/terms-and-policy',
        destination: '/wondor/terms-and-policy',
        permanent: true
      },
      {
        source: '/about-us',
        destination: '/wondor/about-us',
        permanent: true
      },
      {
        source: '/contact-us',
        destination: '/wondor/contact-us',
        permanent: true
      },
      {
        source: '/category/wiki/:slug*',
        destination: '/category/[:slug]/wiki/learn-about-[:slug]-and-collaboration-opportunities',
        permanent: true
      },
      {
        source: '/artist/profile/:slug*',
        destination: '/',
        permanent: true
      },
      {
        source: '/discover-artist/:slug*',
        destination: '/',
        permanent: true
      },
      {
        source: '/artist/settings/:slug*',
        destination: '/',
        permanent: true
      },
      {
        source: '/artist/profile/:slug*',
        destination: '/',
        permanent: true
      },
      {
        source: '/404',
        destination: '/',
        permanent: true
      }
    ]
  },
};
