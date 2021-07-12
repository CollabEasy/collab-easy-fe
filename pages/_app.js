import 'bootstrap/dist/css/bootstrap.css'
import '../public/styles/styles.scss'
import Layout from './components/layout';

function MyApp({ Component, pageProps }) {
  return (
    <>
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </>
  )
}

export default MyApp
