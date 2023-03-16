import { useEffect } from 'react'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { selectCustomer } from '@open-tender/redux'
import { Helmet } from 'react-helmet'

import { selectBrand } from '../../../slices'
import {
  Content,
  DeleteAccount,
  HeaderUser,
  Main,
  PageContainer,
  PageContent,
  PageTitle,
} from '../..'

const AccountDelete = () => {
  const navigate = useNavigate()
  const { title: siteTitle } = useSelector(selectBrand)
  const { auth } = useSelector(selectCustomer)

  useEffect(() => {
    if (!auth) return navigate('/guest')
  }, [auth, navigate])

  return (
    <>
      <Helmet>
        <title>Delete Account | {siteTitle}</title>
      </Helmet>
      <Content>
        <HeaderUser />
        <Main>
          <PageContainer style={{ maxWidth: '72rem' }}>
            <PageTitle
              title="Delete your account"
              subtitle="Use the button below to permanently delete your account. There is no undo."
            />
            <PageContent>
              <DeleteAccount />
            </PageContent>
          </PageContainer>
        </Main>
      </Content>
    </>
  )
}

AccountDelete.displayName = 'AccountDelete'
export default AccountDelete
