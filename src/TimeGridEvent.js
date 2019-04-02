import cn from 'classnames'
import React from 'react'
import ReactTooltip from 'react-tooltip'
import dates from './utils/dates'
import moment from 'moment'
import { accessor } from './utils/accessors'

const colors = {}
function fetchColors(color) {
  switch (color) {
    case 'green':
      return {
        ...colors,
        b1: 'rgb(0, 231, 193)',
        b2: 'rgb(0, 159, 129)',
        b3: 'rgb(0, 95, 77)',
      }
    case 'blue':
      return {
        ...colors,
        b1: '#338fe9',
        b2: '#1f558c',
        b3: '#12416f',
      }
    default:
      return {
        ...colors,
        b1: 'grey',
        b2: 'grey',
        b3: 'grey',
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
  let title = accessors.title(event)
  let tooltip = accessors.tooltip(event)
  let end = accessors.end(event)
  let start = accessors.start(event)
  let gems = accessors.gems(event)
  let duration = dates.diff(start, end, 'minutes')
  let type = accessors.type(event)
  let respawn = accessors.respawn(event)
  let t1 = moment(start).format('LT')
  let t2 = moment(accessors.t2(event)).format('LT')
  let t3 = moment(accessors.t3(event)).format('LT')
  let t4 = moment(end).format('LT')
  let created_by = accessors.created_by(event)
  let date_created = moment(accessors.date(event)).format('lll')
  // console.log(moment(start).format('LT'))

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
          width: `${width}%`,
          maxWidth: '45px',
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
          <p>{title}</p>
          <p>{`${gems} gems`}</p>
        </div>
        <hr />
        <ul className="content-tooltip-list">
          <li>
            Total Duration: <span>{`${duration} mins`}</span>
          </li>
          <li>
            Type: <span>{type}</span>
          </li>
          <li>
            Total Respawns : <span>{respawn}</span>
          </li>
        </ul>
        <hr />
        <div className="timeslot-tooltip">
          <section>
            <p>{`T1: ${t1}`}</p>
            <p>{`T2: ${t2}`}</p>
          </section>
          <section>
            <p>{`T3: ${t3}`}</p>
            <p>{`T4: ${t4}`}</p>
          </section>
        </div>
        <hr />
        <div className="author-tooltip">
          <p>{`Created By: ${created_by}`}</p>
          <p>{date_created}</p>
        </div>
      </ReactTooltip>
    </EventWrapper>
  )
}

export default TimeGridEvent
