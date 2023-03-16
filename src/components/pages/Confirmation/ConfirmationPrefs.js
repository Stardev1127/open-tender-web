import styled from '@emotion/styled'

import { CommunicationPrefs, FormSection } from '../..'

const ConfirmationPrefsView = styled.div`
  max-width: 54rem;
  margin: 4rem auto;
  @media (max-width: ${(props) => props.theme.breakpoints.tablet}) {
    max-width: 100%;
  }
`

const ConfirmationPrefs = () => {
  return (
    <ConfirmationPrefsView>
      <FormSection
        title="Update your communication preferences"
        subtitle="Please let us know how you'd like to hear from us"
      >
        <CommunicationPrefs style={{ padding: 0, paddingTop: 10 }} />
      </FormSection>
    </ConfirmationPrefsView>
  )
}

ConfirmationPrefs.displayName = 'ConfirmationPrefs'
export default ConfirmationPrefs
