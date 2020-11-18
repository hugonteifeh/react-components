import React, { FC, ReactNode, useEffect, useRef, useState } from 'react'
import { Transition } from 'react-transition-group'
import { ms, px, Duration, toNum } from 'rosebox'
import useHover from '@react-hook/hover'
import { ChevronRight } from 'react-feather'

import {
  styleTitle,
  styleHeader,
  styleBody,
  styleContainer,
  styleContentContainerStyle,
  bodyCloneStyle,
  arrowContainerStyle,
  styleArrowIcon,
} from './styles.rb'

type ExpansionPanelProps = {
  title: string
  children: ReactNode
}

const ArrowIcon: FC<{ isExpanded: boolean }> = ({ isExpanded }) => {
  return (
    <div style={arrowContainerStyle}>
      <ChevronRight
        className="fas fa-chevron-right"
        style={styleArrowIcon(isExpanded)}
      ></ChevronRight>
    </div>
  )
}

export const ExpansionPanel: FC<ExpansionPanelProps> = ({
  title,
  children,
}) => {
  const [isExpanded, setExpansionState] = useState(false)
  const [expansionHeight, setExpansionHeight] = useState(px(0))
  const [transitionDuration, settransitionDuration] = useState(ms(0))
  const [isFocused, setIsFocused] = useState(false)
  const headerRef = useRef(null)
  const isHovering = useHover(headerRef)
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const duration = ms(Math.max(toNum(expansionHeight) * 2, 200))
    settransitionDuration(duration)
  }, [expansionHeight])

  const calcBodyStyle = (
    transitionState: string,
    transitionDuration: Duration
  ) =>
    styleBody({
      transitionState,
      expansionHeight,
      isExpanded,
      transitionDuration,
    })

  const onHeaderClick = () => setExpansionState(!isExpanded)

  useEffect(() => {
    const node = ref.current
    const resizeObserver = new (window as any).ResizeObserver(
      (entries: any) => {
        const height = px(entries[0].contentRect.height)
        setExpansionHeight(height)
      }
    )
    if (node) resizeObserver.observe(node)
    return () => {
      if (node) resizeObserver.unobserve(node)
    }
  }, [ref])

  return (
    <div
      ref={headerRef}
      style={styleContainer({ isHovering, transitionDuration, isFocused })}
    >
      <div
        aria-expanded={isExpanded}
        style={styleHeader()}
        onClick={onHeaderClick}
        role="button"
        tabIndex={0}
        onFocus={() => {
          setIsFocused(true)
        }}
        onBlur={() => {
          setIsFocused(false)
        }}
        onKeyPress={(e) => {
          if (['Enter', ' '].includes(e.key)) {
            setExpansionState(!isExpanded)
          }
        }}
      >
        <span style={styleTitle()}>{title}</span>
        <ArrowIcon isExpanded={isExpanded} />
      </div>
      {
        <div style={bodyCloneStyle} ref={ref}>
          <div style={styleContentContainerStyle()}>{children}</div>
        </div>
      }
      <Transition
        in={isExpanded}
        timeout={{
          enter: toNum(transitionDuration),
          exit: 1,
        }}
        onEnter={(node: HTMLElement) => node.offsetHeight}
      >
        {(transitionState) => {
          return (
            <div style={calcBodyStyle(transitionState, transitionDuration)}>
              <div style={styleContentContainerStyle()}>{children}</div>
            </div>
          )
        }}
      </Transition>
    </div>
  )
}
