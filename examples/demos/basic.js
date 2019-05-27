import React from 'react'
import BigCalendar from 'react-big-calendar'
import events from '../events'
import dates from '../../src/utils/dates'

const myEventsList = [
  {
    id: 0,
    title: 'Cars 444',
    resourceId: 1,
    start: new Date(2019, 4, 26, 21, 0, 0),
    t2: new Date(2019, 4, 26, 23, 0, 0),
    t3: new Date(2019, 4, 27, 17, 0, 0),
    end: new Date(2019, 4, 27, 21, 0, 0),
    gems: '3',
    type: '50% ',
    respawn: '10',
    created_by: 'ABC',
    date: new Date(2019, 3, 2, 9, 0, 0),
    isSimulated: true,
    wdf: 'FLAT',
    tempId: 'tsgdfd234rtgdfr4gf',
  },
  {
    id: 234,
    title: '2 Planes',
    resourceId: 2,
    start: new Date(2019, 4, 24, 9, 20, 0),
    t2: new Date(2019, 4, 24, 9, 30, 0),
    t3: new Date(2019, 4, 24, 9, 50, 0),
    end: new Date(2019, 4, 24, 10, 30, 0),
    gems: '3',
    type: '10% ',
    respawn: '50',
    created_by: 'JKL',
    date: new Date(2019, 3, 2, 9, 20, 0),
    isSimulated: false,
    wdf: 'Exponnetial',
  },
  {
    id: 454,
    title: 'Cars 444',
    resourceId: 1,
    start: new Date(2019, 4, 26, 15, 0, 0),
    t2: new Date(2019, 4, 26, 17, 0, 0),
    t3: new Date(2019, 4, 27, 11, 0, 0),
    end: new Date(2019, 4, 27, 15, 0, 0),
    gems: '3',
    type: '50% ',
    respawn: '10',
    created_by: 'ABC',
    date: new Date(2019, 3, 2, 9, 0, 0),
    isSimulated: true,
    wdf: 'FLAT',
  },
  {
    id: 78,
    title: 'Cars 444',
    resourceId: 1,
    start: new Date(2019, 4, 23, 21, 0, 0),
    t2: new Date(2019, 4, 23, 21, 30, 0),
    t3: new Date(2019, 4, 24, 2, 0, 0),
    end: new Date(2019, 4, 24, 4, 0, 0),
    gems: '3',
    type: '50% ',
    respawn: '10',
    created_by: 'ABC',
    date: new Date(2019, 3, 2, 9, 0, 0),
    isSimulated: true,
    wdf: 'FLAT',
  },
  {
    id: 23,
    title: 'Cars 444',
    resourceId: 1,
    start: new Date(2019, 4, 26, 9, 0, 0),
    t2: new Date(2019, 4, 26, 11, 0, 0),
    t3: new Date(2019, 4, 27, 5, 0, 0),
    end: new Date(2019, 4, 27, 9, 0, 0),
    gems: '3',
    type: '50% ',
    respawn: '10',
    created_by: 'ABC',
    date: new Date(2019, 3, 2, 9, 0, 0),
    isSimulated: true,
    wdf: 'FLAT',
  },
  {
    id: 21,
    title: 'Cars 444',
    resourceId: 1,
    start: new Date(2019, 4, 26, 3, 0, 0),
    t2: new Date(2019, 4, 26, 5, 0, 0),
    t3: new Date(2019, 4, 26, 21, 0, 0),
    end: new Date(2019, 4, 27, 3, 0, 0),
    gems: '3',
    type: '50% ',
    respawn: '10',
    created_by: 'ABC',
    date: new Date(2019, 3, 2, 9, 0, 0),
    isSimulated: true,
    wdf: 'FLAT',
  },
  {
    id: 76,
    title: 'Cars 444',
    resourceId: 1,
    start: new Date(2019, 4, 27, 3, 0, 0),
    t2: new Date(2019, 4, 27, 5, 0, 0),
    t3: new Date(2019, 4, 27, 23, 0, 0),
    end: new Date(2019, 4, 28, 3, 0, 0),
    gems: '3',
    type: '50% ',
    respawn: '10',
    created_by: 'ABC',
    date: new Date(2019, 3, 2, 9, 0, 0),
    isSimulated: true,
    wdf: 'FLAT',
  },
  {
    id: 32,
    title: 'Cars 444',
    resourceId: 1,
    start: new Date(2019, 4, 27, 6, 0, 0),
    t2: new Date(2019, 4, 27, 6, 30, 0),
    t3: new Date(2019, 4, 27, 7, 30, 0),
    end: new Date(2019, 4, 27, 8, 0, 0),
    gems: '3',
    type: '50% ',
    respawn: '10',
    created_by: 'ABC',
    date: new Date(2019, 3, 2, 9, 0, 0),
    isSimulated: true,
    wdf: 'FLAT',
  },
  {
    id: 40,
    title: 'Cars 444',
    resourceId: 1,
    start: new Date(2019, 4, 27, 18, 0, 0),
    t2: new Date(2019, 4, 27, 18, 30, 0),
    t3: new Date(2019, 4, 27, 19, 30, 0),
    end: new Date(2019, 4, 27, 20, 0, 0),
    gems: '3',
    type: '50% ',
    respawn: '10',
    created_by: 'ABC',
    date: new Date(2019, 3, 2, 9, 0, 0),
    isSimulated: true,
    wdf: 'FLAT',
  },
  {
    id: 3,
    title: 'Cars 444',
    resourceId: 1,
    start: new Date(2019, 4, 27, 12, 0, 0),
    t2: new Date(2019, 4, 27, 12, 30, 0),
    t3: new Date(2019, 4, 27, 1, 30, 0),
    end: new Date(2019, 4, 27, 2, 0, 0),
    gems: '3',
    type: '50% ',
    respawn: '10',
    created_by: 'ABC',
    date: new Date(2019, 3, 2, 9, 0, 0),
    isSimulated: true,
    wdf: 'FLAT',
  },
]

const resourceMap = [
  { resourceId: 1, resourceTitle: 'Game 1' },
  { resourceId: 2, resourceTitle: 'Game 2' },
  { resourceId: 3, resourceTitle: 'Game 3' },
  { resourceId: 4, resourceTitle: 'Game 4' },
  { resourceId: 5, resourceTitle: 'Game 5' },
  { resourceId: 6, resourceTitle: 'Game 6' },
  // { resourceId: 7, resourceTitle: "Game 7" }
  // { resourceId: 8, resourceTitle: "Game 8" }
]

let allViews = Object.keys(BigCalendar.Views).map(k => BigCalendar.Views[k])

let Basic = ({ localizer }) => (
  <BigCalendar
    popup
    // selectable
    colorType="green"
    // min={this.state.startTime}
    // max={this.state.endTime}
    step={30}
    timeslots={1}
    localizer={localizer}
    events={myEventsList}
    defaultView={BigCalendar.Views.DAY}
    defaultDate={new Date()}
    views={{ day: true }}
    showMultiDayTimes
    // onSelectEvent={event => alert(event.title)}
    // onSelectSlot={this.handleSelect}
    startAccessor="start"
    endAccessor="end"
    resources={resourceMap}
    resourceIdAccessor="resourceId"
    resourceTitleAccessor="resourceTitle"
    tooltipAccessor={() => null}
  />
)

export default Basic
