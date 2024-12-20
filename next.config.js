module.exports = {
  reactStrictMode: true,
  images: {
    domains: ['images.unsplash.com', 'lh3.googleusercontent.com', 'contest-submission.s3.amazonaws.com', 'cdn-in.icons8.com', 'cdn-us.icons8.com', 'github.com', 'github-production-user-asset-6210df.s3.amazonaws.com'],
    formats: ['image/webp', 'image/jpeg', 'image/png', 'image/gif', 'image/heic', 'image/svg'],
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840],
    minimumCacheTTL: 3600,
  },
  env: {
    AMPLIFY_GOOGLE_CLIENT_ID: process.env.AMPLIFY_GOOGLE_CLIENT_ID,
    AMPLIFY_GA_TRACKING_ID: process.env.AMPLIFY_GA_TRACKING_ID,
    HOTZAR_CLIENT_ID: process.env.HOTZAR_CLIENT_ID,
  },
  async redirects() {
    return [
      {
        source: '/all-categories',
        destination: '/collab-categories',
        permanent: true,
      },
      {
        source: '/all-contest',
        destination: '/art-contests-for-artists',
        permanent: true,
      },
      {
        source: '/get-inspired',
        destination: '/content-creation-ideas-for-artists?category=all',
        permanent: true,
      },
      {
        source: '/privacy',
        destination: '/wondor/privacy',
        permanent: true,
      },
      {
        source: '/tutorial',
        destination: '/wondor/how-to-use-wondor',
        permanent: true,
      },
      {
        source: '/terms-and-policy',
        destination: '/wondor/terms-and-policy',
        permanent: true,
      },
      {
        source: '/about-us',
        destination: '/wondor/about-us',
        permanent: true,
      },
      {
        source: '/contact-us',
        destination: '/wondor/contact-us',
        permanent: true,
      },
      {
        source: '/category/wiki/:slug*',
        destination: '/',
        permanent: true,
      },
      {
        source: '/artist/profile/:slug*',
        destination: '/',
        permanent: true,
      },
      {
        source: '/discover-artist/:slug*',
        destination: '/',
        permanent: true,
      },
      {
        source: '/artist/settings/:slug*',
        destination: '/',
        permanent: true,
      },
      {
        source: '/artist/profile/:slug*',
        destination: '/',
        permanent: true,
      },
      {
        source: '/404',
        destination: '/',
        permanent: true,
      },
    ];
  },
};
