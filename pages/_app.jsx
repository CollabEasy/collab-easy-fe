import 'bootstrap/dist/css/bootstrap.css'
import '../public/styles/styles.scss'
import Layout from './components/layout';
import { Provider } from 'react-redux';
import { mainStore } from './store/store';

mainStore.subscribe(() => console.log(mainStore.getState(), '<---'))
function MyApp({ Component, pageProps }) {
  return (
    <Provider store={mainStore}>
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </Provider>

  )
}

export default MyApp
