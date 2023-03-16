import React from 'react'
import propTypes from 'prop-types'
import styled from '@emotion/styled'
import ScrollableSectionHeader from './ScrollableSectionHeader'
import Loading from './Loading'

const ScrollableSectionView = styled.div`
  margin: 0 -${(props) => props.theme.layout.padding} -1.5rem;
  @media (max-width: ${(props) => props.theme.breakpoints.tablet}) {
    margin: 0 -${(props) => props.theme.layout.paddingMobile} -1.5rem;
  }
`

const ScrollableSectionContainer = styled.div`
  width: 100%;
  display: flex;
  justify-content: flex-start;
  flex-wrap: nowrap;
  align-items: flex-start;
  overflow-x: auto;
  margin: -0.5rem 0 0;
  &::-webkit-scrollbar {
    display: none;
  }
`

const ScrollableSectionItem = styled.div`
  flex: 0 0 31rem;
  padding: 1.5rem 0;
  margin-right: ${(props) => props.theme.layout.padding};
  @media (max-width: ${(props) => props.theme.breakpoints.tablet}) {
    margin-right: ${(props) => props.theme.layout.paddingMobile};
  }
  @media (max-width: ${(props) => props.theme.breakpoints.mobile}) {
    flex: 0 0 20rem;
  }

  &:first-of-type {
    margin-left: ${(props) => props.theme.layout.padding};
    @media (max-width: ${(props) => props.theme.breakpoints.tablet}) {
      margin-left: ${(props) => props.theme.layout.paddingMobile};
    }
  }
`

const ScrollableSectionLoading = styled.div`
  padding: 2rem ${(props) => props.theme.layout.padding};
  @media (max-width: ${(props) => props.theme.breakpoints.tablet}) {
    padding: 2rem ${(props) => props.theme.layout.paddingMobile};
  }
`

const ScrollableSection = ({
  title,
  to,
  items,
  renderItem,
  keyName,
  isLoading,
  loadingText,
}) => {
  const hasItems = items && items.length > 0 ? true : false
  return (
    <ScrollableSectionView>
      <ScrollableSectionHeader title={title} to={to} />
      {hasItems ? (
        <ScrollableSectionContainer>
          {items.map((item) => (
            <ScrollableSectionItem key={item[keyName]}>
              {renderItem({ item })}
            </ScrollableSectionItem>
          ))}
        </ScrollableSectionContainer>
      ) : isLoading ? (
        <ScrollableSectionLoading>
          <Loading text={loadingText} style={{ textAlign: 'left' }} />
        </ScrollableSectionLoading>
      ) : null}
    </ScrollableSectionView>
  )
}

ScrollableSection.displayName = 'ScrollableSection'
ScrollableSection.propTypes = {
  title: propTypes.string,
  to: propTypes.string,
  items: propTypes.array,
  renderItem: propTypes.func,
  keyName: propTypes.string,
  isLoading: propTypes.bool,
  loadingText: propTypes.string,
}

export default ScrollableSection
