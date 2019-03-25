import cn from 'classnames'
import React from 'react'
import ReactTooltip from 'react-tooltip'

const colors = {}
function fetchColors(color) {
  switch (color) {
    case 'green':
      return {
        ...colors,
        // eslint-disable-next-line no-undef
        b1: rgb(0, 231, 193),
        // eslint-disable-next-line no-undef
        b2: rgb(0, 159, 129),
        // eslint-disable-next-line no-undef
        b3: rgb(0, 95, 77),
      }
  }
}

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
    colorType,
    components: { event: Event, eventWrapper: EventWrapper },
  } = props
  // let title = accessors.title(event)
  let tooltip = accessors.tooltip(event)
  let end = accessors.end(event)
  let start = accessors.start(event)
  // let t2 = accessors.t2(event)
  // let t3 = accessors.t3(event)
  // console.log(title, t2, t3)

  let userProps = getters.eventProp(event, start, end, selected)

  let colors = fetchColors(colorType)

  let { height, top, width, xOffset, t2height, t3height, t2t3height } = style
  const inner = [
    <div
      key="1"
      className="rbc-event-first"
      style={{
        width: '100%',
        height: t2height + '%',
        background: colors.b1,
      }}
    />,
    <div
      key="2"
      className="rbc-event-second"
      style={{
        width: '100%',
        height: t2t3height + '%',
        background: colors.b2,
      }}
    />,
    <div
      key="3"
      className="rbc-event-third"
      style={{
        width: '100%',
        height: t3height + '%',
        background: colors.b3,
      }}
    />,
  ]

  return (
    <EventWrapper type="time" {...props}>
      <div
        data-for={`room${event.id}`}
        data-tip="room"
        onClick={onClick}
        onDoubleClick={onDoubleClick}
        style={{
          ...userProps.style,
          top: `${top}%`,
          height: `${height}%`,
          background: 'none',
          border: 'none',
          padding: 0,
          [isRtl ? 'right' : 'left']: `${Math.max(0, xOffset)}%`,
          // width: `${width}%`,
          width: '45px',
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
      <ReactTooltip
        className="roomTooltip"
        id={`room${event.id}`}
        effect="solid"
        place={'right'}
        border={true}
        type={'light'}
      >
        <div className="header-tooltip">
          <p>Cars 404</p>
          <p>3 gems</p>
        </div>
        <hr />
        <ul className="content-tooltip-list">
          <li>Total Duration: 45 mins</li>
          <li>Type: 50% Winner</li>
          <li>Total Respawns : 150</li>
        </ul>
        <hr />
        <div className="timeslot-tooltip">
          <section>
            <p>T1: 7 AM</p>
            <p>T2: 7:15 AM</p>
          </section>
          <section>
            <p>T3: 7:30 AM</p>
            <p>T4: 7:45 AM</p>
          </section>
        </div>
        <hr />
        <div className="author-tooltip">
          <p>Created By: Lokesh</p>
          <p>Date....</p>
        </div>
      </ReactTooltip>
    </EventWrapper>
  )
}

export default TimeGridEvent
