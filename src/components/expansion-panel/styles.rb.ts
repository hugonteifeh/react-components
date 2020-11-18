import { Length, per, px, hex, style, Duration, rotate, deg, ms } from 'rosebox'

const collapseBgColor = hex('#fff')

export const styleHeader = () =>
  style({
    position: 'relative',
    padding: [px(16), px(56), px(16), px(16)],
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    cursor: 'pointer',
  })

export const styleTitle = () => {
  return style({
    fontSize: px(16),
    fontWeight: 600,
    lineHeight: px(28),
    textTransform: 'capitalize',
  })
}

export const styleBody = ({
  transitionState,
  expansionHeight,
  transitionDuration,
}: {
  transitionState: string
  expansionHeight: Length
  isExpanded: boolean
  transitionDuration: Duration
}) => {
  return style({
    ...(transitionState !== 'entered' && {
      height: ['entering', 'exiting'].includes(transitionState)
        ? expansionHeight
        : px(0),
    }),
    overflow: 'hidden',
    transition: ['height', transitionDuration, 'ease-in-out'],
  })
}

export const bodyCloneStyle = {
  ...style({
    position: 'absolute',
    clip: 'rect(1px, 1px, 1px, 1px)',
    width: per(100),
    border: [px(1), 'solid', 'white'],
    visibility: 'hidden',
  }),
}

export const styleContainer = ({
  isHovering,
  transitionDuration,
  isFocused,
}: {
  isHovering: boolean
  transitionDuration: Duration
  isFocused: boolean
}) =>
  style({
    borderRadius: px(10),
    position: 'relative',
    backgroundColor: collapseBgColor,
    transition: ['boxShadow', transitionDuration, 'ease-in-out'],
    boxShadow:
      isHovering || isFocused
        ? [[px(0), px(8), px(18)], hex('#EDEFF2')]
        : [[px(0), px(2), px(10)], hex('#EDEFF2')],
  })

export const styleContentContainerStyle = () =>
  style({
    position: 'relative',
    paddingY: px(16),
    paddingX: px(32),
    fontSize: px(16),
    lineHeight: px(24),
  })

export const arrowContainerStyle = style({
  backgroundColor: hex('#fcf4f4'),
  position: 'absolute',
  right: px(16),
  width: px(32),
  height: px(32),
  borderRadius: per(50),
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
})
export const styleArrowIcon = (isExpanded: boolean) =>
  style({
    transition: ['transform', ms(300), 'ease-out'],
    transform: isExpanded ? rotate(deg(90)) : 'none',
  })
