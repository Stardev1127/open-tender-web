import { useEffect } from 'react'
import propTypes from 'prop-types'
import { useSelector, useDispatch } from 'react-redux'
import * as Sentry from '@sentry/react'
import { Helmet } from 'react-helmet'
import { resetOrderType, resetCheckout } from '@open-tender/redux'
import { ButtonStyled, ButtonLink } from '@open-tender/components'
import { selectBrand, selectConfig } from '../../../slices'
import {
  Content,
  Header,
  HeaderLogo,
  Main,
  PageContainer,
  PageContent,
  PageTitle,
} from '../..'
import styled from '@emotion/styled'

const ErrorReportView = styled.div`
  margin: ${(props) => props.theme.layout.padding} 0;
  @media (max-width: ${(props) => props.theme.breakpoints.tablet}) {
    margin: ${(props) => props.theme.layout.paddingMobile} 0;
  }
`

const ErrorReportDetails = styled.div`
  padding: 2rem;
  overflow-x: scroll;
  color: ${(props) => props.theme.error.color};
  background-color: ${(props) => props.theme.error.bgColor};
  border-radius: ${(props) => props.theme.border.radius};
  margin: ${(props) => props.theme.layout.padding} 0;
  @media (max-width: ${(props) => props.theme.breakpoints.tablet}) {
    margin: ${(props) => props.theme.layout.paddingMobile} 0;
  }

  pre {
    margin: 0;
    font-family: Consolas, Menlo, Courier, monospace;
    line-height: 1.8;
    font-size: ${(props) => props.theme.fonts.sizes.small};
  }
`

const ErrorReport = ({ error, errorInfo, eventId }) => {
  const dispatch = useDispatch()
  const { error: config } = useSelector(selectConfig)
  const { title: siteTitle } = useSelector(selectBrand)

  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])

  const handleReset = () => {
    dispatch(resetOrderType())
    dispatch(resetCheckout())
    window.location.replace('/guest')
  }

  return (
    <>
      <Helmet>
        <title>
          {config.title} | {siteTitle}
        </title>
      </Helmet>
      <Content hasRouter={false}>
        <Header title={<HeaderLogo />} />
        <Main>
          <PageContainer style={{ maxWidth: '76.8rem' }}>
            <PageTitle {...config} />
            <PageContent>
              <p>
                <ButtonStyled onClick={handleReset}>Start Over</ButtonStyled>
              </p>
              <ErrorReportView>
                {eventId && (
                  <p>
                    <ButtonLink
                      onClick={() => Sentry.showReportDialog({ eventId })}
                    >
                      Click here to report this issue
                    </ButtonLink>
                  </p>
                )}
                <ErrorReportDetails>
                  <pre>
                    {error.toString()}
                    {errorInfo && errorInfo.componentStack.toString()}
                  </pre>
                </ErrorReportDetails>
              </ErrorReportView>
            </PageContent>
          </PageContainer>
        </Main>
      </Content>
    </>
  )
}

ErrorReport.displayName = 'ErrorReport'
ErrorReport.propTypes = {
  error: propTypes.object,
  errorInfo: propTypes.object,
  eventId: propTypes.string,
}
export default ErrorReport
