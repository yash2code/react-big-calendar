import cn from 'classnames'
import React from 'react'

/* eslint-disable react/prop-types */
function TimeGridEvent(props) {
  const {
    style,
    className,
    event,
    accessors,
    isRtl,
    selected,
    label,
    continuesEarlier,
    continuesLater,
    getters,
    onClick,
    onDoubleClick,
    components: { event: Event, eventWrapper: EventWrapper },
  } = props
  let title = accessors.title(event)
  let tooltip = accessors.tooltip(event)
  let end = accessors.end(event)
  let start = accessors.start(event)
  // let t2 = accessors.t2(event);
  // let t3 = accessors.t3(event);

  let userProps = getters.eventProp(event, start, end, selected)

  let { height, top, width, xOffset, t2height, t3height, t2t3height } = style
  const inner = [
    <div
      key="1"
      className="rbc-event-first"
      style={{
        width: '100%',
        height: t2height + '%',
        background: 'red',
      }}
    />,
    <div
      key="2"
      className="rbc-event-second"
      style={{
        width: '100%',
        height: t2t3height + '%',
        background: 'blue',
      }}
    />,
    <div
      key="3"
      className="rbc-event-third"
      style={{
        width: '100%',
        height: t3height + '%',
        background: 'green',
      }}
    />,
  ]

  return (
    <EventWrapper type="time" {...props}>
      <div
        onClick={onClick}
        onDoubleClick={onDoubleClick}
        style={{
          ...userProps.style,
          top: `${top}%`,
          height: `${height}%`,
          background: 'none',
          padding: 0,
          [isRtl ? 'right' : 'left']: `${Math.max(0, xOffset)}%`,
          width: `${width}%`,
        }}
        title={
          tooltip
            ? (typeof label === 'string' ? label + ': ' : '') + tooltip
            : undefined
        }
        className={cn('rbc-event', className, userProps.className, {
          'rbc-selected': selected,
          'rbc-event-continues-earlier': continuesEarlier,
          'rbc-event-continues-later': continuesLater,
        })}
      >
        {inner}
      </div>
    </EventWrapper>
  )
}

export default TimeGridEvent
