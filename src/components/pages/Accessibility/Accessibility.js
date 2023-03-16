import React from 'react'
import { useSelector } from 'react-redux'
import { Helmet } from 'react-helmet'

import { selectBrand, selectConfig } from '../../../slices'
import {
  Content,
  Main,
  PageTitle,
  PageContent,
  HeaderDefault,
  PageContainer,
} from '../..'

const Accessibility = () => {
  const { accessibility: config } = useSelector(selectConfig)
  const { title: siteTitle } = useSelector(selectBrand)
  const content =
    config.content && config.content.length > 0 ? config.content : []

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
          <PageContainer style={{ maxWidth: '76.8rem' }}>
            <PageTitle {...config} />
            <PageContent style={{ textAlign: 'left', marginTop: '3rem' }}>
              {content.map((i, index) => (
                <p key={index}>{i}</p>
              ))}
            </PageContent>
          </PageContainer>
        </Main>
      </Content>
    </>
  )
}

Accessibility.displayName = 'Accessibility'
export default Accessibility
