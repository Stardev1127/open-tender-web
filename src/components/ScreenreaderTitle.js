import styled from '@emotion/styled'

const ScreenreaderTitle = styled('h1')`
  position: absolute;
  width: 1px;
  height: 1px;
  padding: 0;
  overflow: hidden;
  clip: rect(0, 0, 0, 0);
  white-space: nowrap;
  border: 0;
`

ScreenreaderTitle.displayName = 'ScreenreaderTitle'
export default ScreenreaderTitle
