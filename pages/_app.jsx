import 'bootstrap/dist/css/bootstrap.css'
import '../public/styles/styles.scss'
import NextApp from 'next/app'
import { withRouter } from 'next/router'
import React from 'react'
import { Provider } from 'react-redux'
import App  from '../components/app'
import { routes } from '../config/routes'
import { mainStore } from '../state/store'

mainStore.subscribe(() => console.log(mainStore.getState(), '<---'))
class WondorApp extends NextApp {

  static async getInitialProps({ Component, ctx }) {
    const pageProps = Component.getInitialProps
      ? await Component.getInitialProps(ctx)
      : {}
  
    return { pageProps }
  }

  render() {
    const { Component, pageProps } = this.props
    const config = {
      routes,
    }

    return (
      <Provider store={mainStore}>
        <App {...config}>
          <Component {...pageProps} />
        </App>
      </Provider>
    )
  }
}

export default withRouter(WondorApp)