import { Link } from 'react-router-dom'
import { Helmet } from 'react-helmet'
import { useSelector } from 'react-redux'

import { selectBrand, selectConfig } from '../../../slices'
import {
  Content,
  Main,
  PageContainer,
  PageContent,
  PageTitle,
  HeaderDefault,
} from '../..'

const NotFound = () => {
  const { title: siteTitle } = useSelector(selectBrand)
  const { notFound: config } = useSelector(selectConfig)

  return (
    <>
      <Helmet>
        <title>
          {config.title} | {siteTitle}
        </title>
      </Helmet>
      <Content>
        <HeaderDefault />
        <Main>
          <PageContainer>
            <PageTitle {...config} />
            <PageContent>
              <Link to="/">{config.back}</Link>
            </PageContent>
          </PageContainer>
        </Main>
      </Content>
    </>
  )
}

NotFound.displayName = 'NotFound'
export default NotFound
