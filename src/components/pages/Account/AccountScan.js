import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import styled from '@emotion/styled'
import { fetchCustomerQRCode, selectCustomerQRCode } from '@open-tender/redux'
import { openModal, selectBrand } from '../../../slices'
import { Grid } from '../../icons'

const AccountScanView = styled('div')`
  display: inline-block;
  opacity: 0;
  animation: slide-down 0.25s ease-in-out 0.125s forwards;
  margin-left: 1.5rem;
`

const AccountScanButton = styled.button`
  display: flex;
  justify-content: flex-start;
  align-items: center;
  padding: 1rem 0;
  color: ${(props) => props.theme.colors.primary};
  border: 0;
  background-color: transparent;
`

const AccountScanIcon = styled.span`
  display: block;
  width: 1.8rem;
  height: 1.8rem;
  margin: 0 0.5rem 0 0;
`

const AccountScanText = styled.span`
  font-size: ${(props) => props.theme.fonts.sizes.small};
`

const AccountScan = () => {
  const dispatch = useDispatch()
  const { has_pos } = useSelector(selectBrand)
  const { qrcode, loading, error } = useSelector(selectCustomerQRCode)
  const hasQRCode = has_pos && qrcode && !error && loading === 'idle'
  const src = qrcode
  const alt = 'Sign Into Your Account'
  const title = alt
  const alert = 'Only relevant for IN-STORE transactions'
  const footnote = "This is NOT required if you're paying with a credit card"

  useEffect(() => {
    if (has_pos) dispatch(fetchCustomerQRCode())
  }, [dispatch, has_pos])

  return hasQRCode ? (
    <AccountScanView>
      <AccountScanButton
        onClick={() =>
          dispatch(
            openModal({
              type: 'qrCode',
              args: { src, alt, title, alert, footnote },
            })
          )
        }
      >
        <AccountScanIcon>
          <Grid />
        </AccountScanIcon>
        <AccountScanText>Scan to pay</AccountScanText>
      </AccountScanButton>
    </AccountScanView>
  ) : null
}

AccountScan.displayName = 'Welcome'

export default AccountScan
