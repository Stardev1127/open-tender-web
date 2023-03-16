import propTypes from 'prop-types'
import styled from '@emotion/styled'
import { useDispatch } from 'react-redux'
import { setCurrentVendor } from '@open-tender/redux'
import { stripTags } from '@open-tender/js'
import { Body, Box, ButtonStyled, Heading } from '@open-tender/components'
import { Clock } from '../../icons'
import { useTheme } from '@emotion/react'

const VendorInfoView = styled(Box)`
  width: 90%;
  max-width: 44rem;
  padding: 2rem 2rem 2.5rem;
  ${(props) =>
    props.hasBox ? null : `background-color: ${props.theme.bgColors.primary};`};
  @media (max-width: ${(props) => props.theme.breakpoints.mobile}) {
    padding: 2rem 2rem 2.5rem;
  }
`

const VendorInfoHeader = styled(Heading)`
  font-size: ${(props) => props.theme.fonts.sizes.xBig};
  @media (max-width: ${(props) => props.theme.breakpoints.mobile}) {
    font-size: ${(props) => props.theme.fonts.sizes.big};
  }
`

const VendorInfoDesc = styled(Body)`
  margin: 1rem 0 0;
  font-size: ${(props) => props.theme.fonts.sizes.small};
  @media (max-width: ${(props) => props.theme.breakpoints.mobile}) {
    font-size: ${(props) => props.theme.fonts.sizes.xSmall};
  }
`

const VendorInfoHours = styled.div`
  margin: 1rem 0 0;
  display: flex;
  justify-content: flex-start;
  align-items: center;
`

const VendorInfoHoursIcon = styled.div`
  position: relative;
  line-height: 0;
  // top: -0.1rem;
  width: 1.6rem;
  height: 1.6rem;
  margin: 0 0.5rem 0 0;
`

const VendorInfoHoursDesc = styled(Body)`
  display: block;
  font-size: ${(props) => props.theme.fonts.sizes.small};
  @media (max-width: ${(props) => props.theme.breakpoints.mobile}) {
    font-size: ${(props) => props.theme.fonts.sizes.xSmall};
  }
`

const VendorInfoButton = styled.div`
  margin: 1.5rem 0 0;
`

export const VendorInfo = ({ vendor }) => {
  const theme = useTheme()
  const dispatch = useDispatch()
  const hasBox = theme.cards.default.bgColor !== 'transparent'
  const { name, description, hours_desc } = vendor
  const hoursDesc = hours_desc ? stripTags(hours_desc) : null
  const desc = description ? stripTags(description) : null

  const switchVendor = () => {
    dispatch(setCurrentVendor(null))
  }

  return (
    <VendorInfoView hasBox={hasBox}>
      <VendorInfoHeader as="p" className="title">
        {name}
      </VendorInfoHeader>
      {desc && <VendorInfoDesc as="p">{desc}</VendorInfoDesc>}
      {hoursDesc && (
        <VendorInfoHours>
          <VendorInfoHoursIcon>
            <Clock />
          </VendorInfoHoursIcon>
          <VendorInfoHoursDesc>{hoursDesc}</VendorInfoHoursDesc>
        </VendorInfoHours>
      )}
      <VendorInfoButton>
        <ButtonStyled onClick={switchVendor} size="small">
          Switch Vendor
        </ButtonStyled>
      </VendorInfoButton>
    </VendorInfoView>
  )
}

VendorInfo.displayName = 'VendorInfo'
VendorInfo.propTypes = {
  vendor: propTypes.object,
}

export default VendorInfo
