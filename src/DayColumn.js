/* eslint-disable no-console */
import PropTypes from 'prop-types'
import React from 'react'
import { findDOMNode } from 'react-dom'
import cn from 'classnames'
import { Table } from 'tabler-react'
import posed from 'react-pose'

import Selection, { getBoundsForNode, isEvent } from './Selection'
import dates from './utils/dates'
import * as TimeSlotUtils from './utils/TimeSlots'
import { isSelected } from './utils/selection'

import { notify } from './utils/helpers'
import * as DayEventLayout from './utils/DayEventLayout'
import TimeSlotGroup from './TimeSlotGroup'
import TimeGridEvent from './TimeGridEvent'

const obj = [
  {
    games: ['G1', 'G1', 'G1', 'G1'],
    t1t2: ['5', '0', '2', '4'],
    t2t3: ['5', '0', '2', '4'],
    t3t4: ['5', '0', '2', '4'],
  },
]

const props = {
  draggable: 'y',
  // hoverable: true,
  // hover: {
  //   scale: 1.2,
  // },
  // init: { scale: 1, boxShadow: '0px 0px 0px rgba(0,0,0,0)' },
  // drag: { scale: 1.1, boxShadow: '5px 5px 10px rgba(0,0,0,0.5)' },
  // dragEnd: { transition: { y: { type: 'spring' } } },
  // dragBounds: { top: '-100%', bottom: '100%' },
}

const Box = posed.div(props)

class DayColumn extends React.Component {
  state = { selecting: false, timeIndicatorPosition: null }

  constructor(...args) {
    super(...args)

    this.slotMetrics = TimeSlotUtils.getSlotMetrics(this.props)
    this.fun = this.fun.bind(this)
    this.onEnd = this.onEnd.bind(this)
    this._selectCurrent = this._selectCurrent.bind(this)
  }

  fun() {
    console.log('hi')
  }
  componentDidMount() {
    this.props.selectable && this._selectable()

    if (this.props.isNow) {
      this.setTimeIndicatorPositionUpdateInterval()
    }
  }

  componentWillUnmount() {
    this._teardownSelectable()
    this.clearTimeIndicatorInterval()
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.selectable && !this.props.selectable) this._selectable()
    if (!nextProps.selectable && this.props.selectable)
      this._teardownSelectable()

    this.slotMetrics = this.slotMetrics.update(nextProps)
  }

  componentDidUpdate(prevProps, prevState) {
    const getNowChanged = !dates.eq(
      prevProps.getNow(),
      this.props.getNow(),
      'minutes'
    )

    if (prevProps.isNow !== this.props.isNow || getNowChanged) {
      this.clearTimeIndicatorInterval()

      if (this.props.isNow) {
        const tail =
          !getNowChanged &&
          dates.eq(prevProps.date, this.props.date, 'minutes') &&
          prevState.timeIndicatorPosition === this.state.timeIndicatorPosition

        this.setTimeIndicatorPositionUpdateInterval(tail)
      }
    }
  }

  intervalTriggered = false
  /**
   * @param tail {Boolean} - whether `positionTimeIndicator` call should be
   *   deferred or called upon setting interval (`true` - if deferred);
   */
  setTimeIndicatorPositionUpdateInterval(tail = false) {
    if (!this.intervalTriggered && !tail) {
      this.positionTimeIndicator()
    }

    this._timeIndicatorTimeout = window.setTimeout(() => {
      this.intervalTriggered = true
      this.positionTimeIndicator()
      this.setTimeIndicatorPositionUpdateInterval()
    }, 0)
  }

  clearTimeIndicatorInterval() {
    this.intervalTriggered = false
    window.clearTimeout(this._timeIndicatorTimeout)
  }

  getDstOffset(start, end) {
    return start.getTimezoneOffset() - end.getTimezoneOffset()
  }

  positionFromCurrentTime(date) {
    const { getNow } = this.props
    const current = getNow()
    const diff =
      dates.diff(current, date, 'minutes') + this.getDstOffset(current, date)
    console.log(diff)
    return diff
  }

  onEnd() {
    // console.log(e.target.className)
    let x = document.getElementById('rbc-current-time-indicator')
    x.style.transform = 'none'
    // console.log(x, '----')
  }

  positionTimeIndicator() {
    const { min, max, getNow } = this.props
    const current = getNow()

    if (current >= min && current <= max) {
      const { top } = this.slotMetrics.getRange(current, current)
      this.setState({ timeIndicatorPosition: top })
    } else {
      this.clearTimeIndicatorInterval()
    }
  }

  render() {
    // console.log(this.props.components)
    const {
      max,
      rtl,
      isNow,
      resource,
      accessors,
      localizer,
      getters: { dayProp, ...getters },
      components: {
        eventContainerWrapper: EventContainer,
        // eventWrapper: EventWrapper,
        ...components
      },
    } = this.props

    let { slotMetrics } = this
    let { selecting, top, height, startDate, endDate } = this.state

    let selectDates = { start: startDate, end: endDate }

    const { className, style } = dayProp(max)

    return (
      <div
        style={style}
        className={cn(
          className,
          'rbc-day-slot',
          'rbc-time-column',
          isNow && 'rbc-now',
          isNow && 'rbc-today', // WHY
          selecting && 'rbc-slot-selecting'
        )}
      >
        {slotMetrics.groups.map((grp, idx) => (
          <TimeSlotGroup
            key={idx}
            group={grp}
            resource={resource}
            getters={getters}
            components={components}
          />
        ))}
        <EventContainer
          localizer={localizer}
          resource={resource}
          accessors={accessors}
          getters={getters}
          components={components}
          slotMetrics={slotMetrics}
        >
          <div className={cn('rbc-events-container', rtl && 'rtl')}>
            {this.renderEvents()}
          </div>
        </EventContainer>

        {selecting && (
          <div className="rbc-slot-selection" style={{ top, height }}>
            <span>{localizer.format(selectDates, 'selectRangeFormat')}</span>
          </div>
        )}

        {isNow && (
          <Box
            onValueChange={{ y: x => console.log(x) }}
            className=" abc rbc-current-time-indicator"
            id="rbc-current-time-indicator"
            onDragEnd={this.onEnd}
            style={{ top: `${this.state.timeIndicatorPosition}%` }}
          >
            {/* <div className="abc current-time-box">
              <Table>
                <Table.Body>
                  <Table.Row>
                    <Table.Col>Time</Table.Col>

                    {obj.map((o, i) => (
                      <React.Fragment key={i}>
                        {o.games.map((e, i) => (
                          <Table.Col key={i}>{e}</Table.Col>
                        ))}
                      </React.Fragment>
                    ))}
                  </Table.Row>
                  <Table.Row>
                    <Table.Col>T1-T2</Table.Col>
                    {obj.map((o, i) => (
                      <React.Fragment key={i}>
                        {o.t1t2.map((e, i) => (
                          <Table.Col key={i}>{e}</Table.Col>
                        ))}
                      </React.Fragment>
                    ))}
                  </Table.Row>
                  <Table.Row>
                    <Table.Col>T2-T3</Table.Col>
                    {obj.map((o, i) => (
                      <React.Fragment key={i}>
                        {o.t2t3.map((e, i) => (
                          <Table.Col key={i}>{e}</Table.Col>
                        ))}
                      </React.Fragment>
                    ))}
                  </Table.Row>
                  <Table.Row>
                    <Table.Col>T3-T4</Table.Col>
                    {obj.map((o, i) => (
                      <React.Fragment key={i}>
                        {o.t3t4.map((e, i) => (
                          <Table.Col key={i}>{e}</Table.Col>
                        ))}
                      </React.Fragment>
                    ))}
                  </Table.Row>
                </Table.Body>
              </Table>
            </div> */}
          </Box>
        )}
      </div>
    )
  }

  renderEvents = () => {
    let {
      events,
      rtl: isRtl,
      selected,
      accessors,
      localizer,
      getters,
      components,
      step,
      timeslots,
      colorType,
    } = this.props

    const { slotMetrics } = this
    const { messages } = localizer

    let styledEvents = DayEventLayout.getStyledEvents({
      events,
      accessors,
      slotMetrics,
      minimumStartDifference: Math.ceil((step * timeslots) / 2),
    })

    return styledEvents.map(({ event, style }, idx) => {
      let end = accessors.end(event)
      let start = accessors.start(event)
      let format = 'eventTimeRangeFormat'
      let label

      const startsBeforeDay = slotMetrics.startsBeforeDay(start)
      const startsAfterDay = slotMetrics.startsAfterDay(end)

      if (startsBeforeDay) format = 'eventTimeRangeEndFormat'
      else if (startsAfterDay) format = 'eventTimeRangeStartFormat'

      if (startsBeforeDay && startsAfterDay) label = messages.allDay
      else label = localizer.format({ start, end }, format)

      let continuesEarlier = startsBeforeDay || slotMetrics.startsBefore(start)
      let continuesLater = startsAfterDay || slotMetrics.startsAfter(end)

      return (
        <TimeGridEvent
          colorType={colorType}
          style={style}
          event={event}
          label={label}
          key={'evt_' + idx}
          getters={getters}
          isRtl={isRtl}
          components={components}
          continuesEarlier={continuesEarlier}
          continuesLater={continuesLater}
          accessors={accessors}
          selected={isSelected(event, selected)}
          onClick={e => this._select(event, e)}
          onDoubleClick={e => this._doubleClick(event, e)}
        />
      )
    })
  }

  _selectable = () => {
    let node = findDOMNode(this)
    console.log(node)
    let selector = (this._selector = new Selection(() => findDOMNode(this), {
      longPressThreshold: this.props.longPressThreshold,
    }))

    let maybeSelect = box => {
      let onSelecting = this.props.onSelecting
      let current = this.state || {}
      let state = selectionState(box)
      let { startDate: start, endDate: end } = state

      if (onSelecting) {
        if (
          (dates.eq(current.startDate, start, 'minutes') &&
            dates.eq(current.endDate, end, 'minutes')) ||
          onSelecting({ start, end }) === false
        )
          return
      }

      if (
        this.state.start !== state.start ||
        this.state.end !== state.end ||
        this.state.selecting !== state.selecting
      ) {
        this.setState(state)
      }
    }

    let selectionState = point => {
      let currentSlot = this.slotMetrics.closestSlotFromPoint(
        point,
        getBoundsForNode(node)
      )

      if (!this.state.selecting) this._initialSlot = currentSlot

      let initialSlot = this._initialSlot
      if (initialSlot === currentSlot)
        currentSlot = this.slotMetrics.nextSlot(initialSlot)

      const selectRange = this.slotMetrics.getRange(
        dates.min(initialSlot, currentSlot),
        dates.max(initialSlot, currentSlot)
      )

      return {
        ...selectRange,
        selecting: true,

        top: `${selectRange.top}%`,
        height: `${selectRange.height}%`,
      }
    }

    let selectorClicksHandler = (box, actionType) => {
      if (!isEvent(findDOMNode(this), box)) {
        const { startDate, endDate } = selectionState(box)
        this._selectSlot({
          startDate,
          endDate,
          action: actionType,
          box,
        })
      }
      this.setState({ selecting: false })
    }

    selector.on('selecting', maybeSelect)
    selector.on('selectStart', maybeSelect)

    selector.on('beforeSelect', box => {
      if (this.props.selectable !== 'ignoreEvents') return

      return !isEvent(findDOMNode(this), box)
    })

    selector.on('click', box => selectorClicksHandler(box, 'click'))

    selector.on('doubleClick', box => selectorClicksHandler(box, 'doubleClick'))

    selector.on('select', bounds => {
      if (this.state.selecting) {
        this._selectSlot({ ...this.state, action: 'select', bounds })
        this.setState({ selecting: false })
      }
    })

    selector.on('reset', () => {
      if (this.state.selecting) {
        this.setState({ selecting: false })
      }
    })
  }

  _teardownSelectable = () => {
    if (!this._selector) return
    this._selector.teardown()
    this._selector = null
  }

  _selectSlot = ({ startDate, endDate, action, bounds, box }) => {
    let current = startDate,
      slots = []

    while (dates.lte(current, endDate)) {
      slots.push(current)
      current = dates.add(current, this.props.step, 'minutes')
    }

    notify(this.props.onSelectSlot, {
      slots,
      start: startDate,
      end: endDate,
      resourceId: this.props.resource,
      action,
      bounds,
      box,
    })
  }
  _selectCurrent = (...args) => {
    console.log('clicked')
    notify(this.props.onSelectCurrent, args)
  }

  _select = (...args) => {
    console.log('cliked')
    notify(this.props.onSelectEvent, args)
  }

  _doubleClick = (...args) => {
    notify(this.props.onDoubleClickEvent, args)
  }
}

DayColumn.propTypes = {
  events: PropTypes.array.isRequired,
  step: PropTypes.number.isRequired,
  date: PropTypes.instanceOf(Date).isRequired,
  min: PropTypes.instanceOf(Date).isRequired,
  max: PropTypes.instanceOf(Date).isRequired,
  getNow: PropTypes.func.isRequired,
  isNow: PropTypes.bool,
  colorType: PropTypes.string,

  rtl: PropTypes.bool,

  accessors: PropTypes.object.isRequired,
  components: PropTypes.object.isRequired,
  getters: PropTypes.object.isRequired,
  localizer: PropTypes.object.isRequired,

  showMultiDayTimes: PropTypes.bool,
  culture: PropTypes.string,
  timeslots: PropTypes.number,

  selected: PropTypes.object,
  selectable: PropTypes.oneOf([true, false, 'ignoreEvents']),
  eventOffset: PropTypes.number,
  longPressThreshold: PropTypes.number,

  onSelecting: PropTypes.func,
  onSelectSlot: PropTypes.func.isRequired,
  onSelectEvent: PropTypes.func.isRequired,
  onSelectCurrent: PropTypes.func,

  onDoubleClickEvent: PropTypes.func.isRequired,

  className: PropTypes.string,
  dragThroughEvents: PropTypes.bool,
  resource: PropTypes.any,
}

DayColumn.defaultProps = {
  dragThroughEvents: true,
  timeslots: 2,
}

export default DayColumn
