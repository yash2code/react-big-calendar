import React from 'react'
import BigCalendar from 'react-big-calendar'
import events from '../events'
import dates from '../../src/utils/dates'

const myEventsList = [
  {
    id: 0,
    title: 'Cars 444',
    resourceId: 1,
    start: new Date(2019, 3, 2, 9, 0, 0),
    t2: new Date(2019, 3, 2, 9, 20, 0),
    t3: new Date(2019, 3, 2, 9, 30, 0),
    end: new Date(2019, 3, 2, 9, 45, 0),
    gems: '3',
    type: '50% Winner',
    respawn: '10',
    created_by: 'ABC',
    date: new Date(2019, 3, 2, 9, 0, 0),
  },
  {
    id: 234,
    title: 'fasda',
    resourceId: 1,
    start: new Date(2019, 3, 2, 9, 20, 0),
    t2: new Date(2019, 3, 2, 9, 30, 0),
    t3: new Date(2019, 3, 2, 9, 50, 0),
    end: new Date(2019, 3, 2, 10, 30, 0),
    gems: '3',
    type: '10% Winner',
    respawn: '50',
    created_by: 'JKL',
    date: new Date(2019, 3, 2, 9, 20, 0),
  },
  // {
  //   id: 23,
  //   title: 'fasda',
  //   resourceId: 1,
  //   start: new Date(2019, 2, 11, 10, 20, 0),
  //   t2: new Date(2019, 2, 11, 10, 30, 0),
  //   t3: new Date(2019, 2, 11, 10, 50, 0),
  //   end: new Date(2019, 2, 11, 11, 30, 0),
  //   gems: '3',
  // },
  // // {
  // //   id: 78,
  // //   title: "fasda",
  // //   resourceId: 1,
  // //   start: new Date(2019, 2, 11, 10, 40, 0),
  // //   t2: new Date(2019, 2, 11, 10, 50, 0),
  // //   t3: new Date(2019, 2, 11, 11, 0, 0),
  // //   end: new Date(2019, 2, 11, 11, 20, 0)
  // // },
  // // {
  // //   id: 743,
  // //   title: "fasda",
  // //   resourceId: 1,
  // //   start: new Date(2019, 2, 11, 11, 0, 0),
  // //   t2: new Date(2019, 2, 11, 11, 20, 0),
  // //   t3: new Date(2019, 2, 11, 11, 40, 0),
  // //   end: new Date(2019, 2, 11, 12, 20, 0)
  // // },
  // {
  //   id: 24,
  //   title: 'fsaf',
  //   resourceId: 1,
  //   start: new Date(2019, 2, 11, 9, 40, 0),
  //   t2: new Date(2019, 2, 11, 9, 55, 0),
  //   t3: new Date(2019, 2, 11, 10, 15, 0),
  //   end: new Date(2019, 2, 11, 10, 45, 0),
  //   gems: '3',
  // },
  // {
  //   id: 1,
  //   title: 'Second event ........',
  //   resourceId: 1,
  //   start: new Date(2019, 2, 11, 18, 0, 0),
  //   t2: new Date(2019, 2, 11, 18, 25, 0),
  //   t3: new Date(2019, 2, 11, 18, 30, 0),
  //   end: new Date(2019, 2, 11, 18, 45, 0),
  //   gems: '3',
  // },
  // {
  //   id: 2,
  //   title: 'third event ........',
  //   resourceId: 2,
  //   start: new Date(2019, 2, 11, 9, 0, 0),
  //   t2: new Date(2019, 2, 11, 9, 20, 0),
  //   t3: new Date(2019, 2, 11, 9, 30, 0),
  //   end: new Date(2019, 2, 11, 9, 45, 0),
  //   gems: '3',
  // },
  // {
  //   id: 3,
  //   title: 'fourth event ........',
  //   resourceId: 3,
  //   start: new Date(2019, 2, 11, 11, 30, 0),
  //   t2: new Date(2019, 2, 11, 11, 55, 0),
  //   t3: new Date(2019, 2, 11, 12, 0, 0),
  //   end: new Date(2019, 2, 11, 12, 30, 0),
  //   gems: '3',
  // },
  // {
  //   id: 4,
  //   title: "another event ........",
  //   resourceId: 4,
  //   start: new Date(2019, 2, 11, 15, 30, 0),
  //   end: new Date(2019, 2, 11, 16, 15, 0)
  // }
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
    colorType="blue"
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
