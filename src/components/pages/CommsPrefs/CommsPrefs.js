import { useSelector } from 'react-redux'
import { Helmet } from 'react-helmet'

import { selectBrand, selectConfig } from '../../../slices'
import {
  CommunicationPrefs,
  Content,
  HeaderUser,
  Main,
  PageContainer,
  PageTitle,
} from '../..'

const CommsPrefs = () => {
  const { title: siteTitle } = useSelector(selectBrand)
  const { communicationPreferences: config } = useSelector(selectConfig)

  return (
    <>
      <Helmet>
        <title>Communication Preferences | {siteTitle}</title>
      </Helmet>
      <Content>
        <HeaderUser />
        <Main>
          <PageContainer style={{ maxWidth: '72rem' }}>
            <PageTitle {...config} />
            <CommunicationPrefs />
          </PageContainer>
        </Main>
      </Content>
    </>
  )
}

CommsPrefs.displayName = 'CommsPrefs'
export default CommsPrefs
