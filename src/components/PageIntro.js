import propTypes from 'prop-types'
import styled from '@emotion/styled'

import { Container } from '.'

const PageIntroView = styled.div`
  padding: ${(props) => props.theme.layout.margin} 0;
  @media (max-width: ${(props) => props.theme.breakpoints.mobile}) {
    padding: ${(props) => props.theme.layout.marginMobile} 0;
  }
`

const PageIntroContent = styled.div`
  width: 100%;
  max-width: ${(props) => props.width || '72rem'};
  margin: 0 auto;
  text-align: center;

  p {
    margin: 1em 0;
    line-height: ${(props) => props.theme.fonts.body.lineHeight};
    // font-family: 'Lora', sans-serif;
    font-size: ${(props) => props.theme.fonts.sizes.xBig};
    @media (max-width: ${(props) => props.theme.breakpoints.mobile}) {
      font-size: ${(props) => props.theme.fonts.sizes.big};
    }
  }
`

const PageIntro = ({ content }) => {
  return (
    <PageIntroView>
      <Container>
        <PageIntroContent dangerouslySetInnerHTML={{ __html: content }} />
      </Container>
    </PageIntroView>
  )
}

PageIntro.displayName = 'PageIntro'
PageIntro.propTypes = {
  style: propTypes.object,
}

export default PageIntro
