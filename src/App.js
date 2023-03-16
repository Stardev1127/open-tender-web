import React, { createContext, createRef } from 'react'
import { connect } from 'react-redux'
import { BrowserRouter } from 'react-router-dom'
import { Helmet } from 'react-helmet'
import { ThemeProvider } from '@emotion/react'
import styled from '@emotion/styled'
import TagManager from 'react-gtm-module'
import { fetchConfig } from './slices/configSlice'
import GlobalStyles from './GlobalStyles'
import AppRoutes from './components/AppRoutes'
import {
  Alerts,
  CartButton,
  ErrorBoundary,
  Modal,
  Nav,
  NavSite,
  Notifications,
  Sidebar,
} from './components'
import { ErrorFatal } from './components/pages'

export const AppContext = createContext(null)

export const AppView = styled.div`
  label: AppView;
  height: 100%;
  display: flex;
  justify-content: flex-end;
`

class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = { gtmId: false }
    this.windowRef = createRef()
  }

  componentDidMount() {
    this.props.fetchConfig()
  }

  componentDidUpdate() {
    const { loading, brand } = this.props
    if (loading !== 'pending' && brand && !this.state.gtmId) {
      this.setState({ gtmId: true })
      const tagManagerArgs = { gtmId: brand.gtmContainerId }
      TagManager.initialize(tagManagerArgs)
    }
  }

  render() {
    let { loading, theme, brand, error } = this.props
    const { body, headings } = theme ? theme.fonts : {}
    const isLoading = loading === 'pending'
    const hasTheme = !isLoading && !error && theme
    // if (theme) console.log(JSON.stringify(theme, null, 2))
    return (
      <>
        <ErrorFatal error={error} loading={loading} />
        {hasTheme && (
          <ThemeProvider theme={this.props.theme}>
            <GlobalStyles />
            <AppView ref={this.windowRef} id="app">
              <Helmet>
                <title>{brand.title}</title>
                <meta name="description" content={brand.description} />
                <link rel="icon" href={brand.favicon} />
                <link rel="apple-touch-icon" href={brand.appleTouchIcon} />
                <link href={body.url} rel="stylesheet" />
                {headings.url && body.url !== headings.url && (
                  <link href={headings.url} rel="stylesheet" />
                )}
              </Helmet>
              <AppContext.Provider value={{ windowRef: this.windowRef }}>
                <ErrorBoundary>
                  <BrowserRouter>
                    <Modal />
                    <Alerts />
                    <Notifications />
                    <CartButton />
                    <AppRoutes />
                    <Sidebar />
                    <Nav />
                    <NavSite />
                  </BrowserRouter>
                </ErrorBoundary>
              </AppContext.Provider>
            </AppView>
          </ThemeProvider>
        )}
      </>
    )
  }
}

export default connect(
  (state) => ({
    theme: state.config.theme,
    brand: state.config.brand,
    loading: state.config.loading,
    error: state.config.error,
  }),
  { fetchConfig }
)(App)
