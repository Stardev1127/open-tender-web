import { isObject } from '@open-tender/js'
import { Message } from '@open-tender/components'
import styled from '@emotion/styled'

const PageErrorView = styled('div')`
  width: 64rem;
  max-width: 100%;
  text-align: center;
  opacity: 0;
  animation: slide-up 0.25s ease-in-out 0.25s forwards;
  margin: ${(props) => props.theme.layout.padding} auto;
  @media (max-width: ${(props) => props.theme.breakpoints.tablet}) {
    margin: ${(props) => props.theme.layout.paddingMobile} auto;
  }

  & > p {
    width: 100%;
  }
`

const PageError = ({ error }) => {
  const errMsg = error && isObject(error) ? Object.values(error)[0] : error
  return errMsg ? (
    <PageErrorView>
      <Message color="error" as="p">
        {errMsg}
      </Message>
    </PageErrorView>
  ) : null
}

export default PageError
