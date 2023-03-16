import styled from '@emotion/styled'

const GroupOrderStepsView = styled.div`
  font-size: ${(props) => props.theme.fonts.sizes.small};
  line-height: ${(props) => props.theme.fonts.body.lineHeight};
`

const GroupOrderSteps = () => {
  return (
    <GroupOrderStepsView>
      <p>How it works from here...</p>
      <ol>
        <li>
          Clicking the button below will officially start a group order and
          display a link.
        </li>
        <li>
          You can share this link with your friends via email, Slack, etc. so
          they can join the group order, add their name, and select their items.
        </li>
        <li>
          After you've added any items you're ordering for yourself, click the
          shopping bag button to submit your order.
        </li>
        <li>
          This will take you to a page where you can review all of the orders
          that have been submitted by your friends.
        </li>
        <li>
          When you're ready, you can proceed to the checkout step, which will
          close the group order (so orders can no longer be added to the shared
          cart).
        </li>
        <li>Submit your payment and you're all set!</li>
      </ol>
    </GroupOrderStepsView>
  )
}

GroupOrderSteps.displayName = 'GroupOrderSteps'

export default GroupOrderSteps
