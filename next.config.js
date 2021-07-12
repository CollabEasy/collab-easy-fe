const path = require('path');
const withSass = require('@zeit/next-sass');
module.exports = withSass({
  /* bydefault config  option Read For More Optioshere
   https://github.com/vercel/next-plugins/tree/master/packages/next-sass
   */
  cssModules: true
})
module.exports = {
  reactStrictMode: true,
  sassOptions: {
    includePaths: [path.join(__dirname, 'public/styles')],
  }
}
