import propTypes from 'prop-types'
import styled from '@emotion/styled'
import { TransitionGroup, CSSTransition } from 'react-transition-group'

const CollapsibleView = styled.div``

const Collapsible = ({ show, style, children }) => {
  return (
    <TransitionGroup component={null}>
      {show ? (
        <CSSTransition
          key="collapsible"
          classNames="reveal"
          timeout={{ enter: 250, exit: 250 }}
        >
          <CollapsibleView style={style}>{children}</CollapsibleView>
        </CSSTransition>
      ) : null}
    </TransitionGroup>
  )
}

Collapsible.displayName = 'CartItCollapsibleem'
Collapsible.propTypes = {
  show: propTypes.bool,
  style: propTypes.object,
  children: propTypes.oneOfType([
    propTypes.arrayOf(propTypes.node),
    propTypes.node,
  ]),
}

export default Collapsible
