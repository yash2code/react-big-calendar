"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

exports.__esModule = true;
exports.default = void 0;

var _extends3 = _interopRequireDefault(require("@babel/runtime/helpers/extends"));

var _classnames = _interopRequireDefault(require("classnames"));

var _react = _interopRequireDefault(require("react"));

var _reactTooltip = _interopRequireDefault(require("react-tooltip"));

var colors = {};

function fetchColors(color) {
  switch (color) {
    case 'green':
      return (0, _extends3.default)({}, colors, {
        b1: 'rgb(0, 231, 193)',
        b2: 'rgb(0, 159, 129)',
        b3: 'rgb(0, 95, 77)'
      });

    case 'blue':
      return (0, _extends3.default)({}, colors, {
        b1: '#338fe9',
        b2: '#1f558c',
        b3: '#12416f'
      });

    default:
      return (0, _extends3.default)({}, colors, {
        b1: 'grey',
        b2: 'grey',
        b3: 'grey'
      });
  }
}
/* eslint-disable react/prop-types */


function TimeGridEvent(props) {
  var _extends2;

  var style = props.style,
      className = props.className,
      event = props.event,
      accessors = props.accessors,
      isRtl = props.isRtl,
      selected = props.selected,
      label = props.label,
      continuesEarlier = props.continuesEarlier,
      continuesLater = props.continuesLater,
      getters = props.getters,
      onClick = props.onClick,
      onDoubleClick = props.onDoubleClick,
      colorType = props.colorType,
      _props$components = props.components,
      Event = _props$components.event,
      EventWrapper = _props$components.eventWrapper; // let title = accessors.title(event)

  var tooltip = accessors.tooltip(event);
  var end = accessors.end(event);
  var start = accessors.start(event); // let t2 = accessors.t2(event)
  // let t3 = accessors.t3(event)
  // console.log(title, t2, t3)

  var userProps = getters.eventProp(event, start, end, selected);
  var colors = fetchColors(colorType);
  var height = style.height,
      top = style.top,
      width = style.width,
      xOffset = style.xOffset,
      t2height = style.t2height,
      t3height = style.t3height,
      t2t3height = style.t2t3height;
  var inner = [_react.default.createElement("div", {
    key: "1",
    className: "rbc-event-first",
    style: {
      width: '100%',
      height: t2height + '%',
      background: colors.b1
    }
  }), _react.default.createElement("div", {
    key: "2",
    className: "rbc-event-second",
    style: {
      width: '100%',
      height: t2t3height + '%',
      background: colors.b2
    }
  }), _react.default.createElement("div", {
    key: "3",
    className: "rbc-event-third",
    style: {
      width: '100%',
      height: t3height + '%',
      background: colors.b3
    }
  })];
  return _react.default.createElement(EventWrapper, (0, _extends3.default)({
    type: "time"
  }, props), _react.default.createElement("div", {
    "data-for": "room" + event.id,
    "data-tip": "room",
    onClick: onClick,
    onDoubleClick: onDoubleClick,
    style: (0, _extends3.default)({}, userProps.style, (_extends2 = {
      top: top + "%",
      height: height + "%",
      background: 'none',
      border: 'none',
      padding: 0
    }, _extends2[isRtl ? 'right' : 'left'] = Math.max(0, xOffset) + "%", _extends2.width = '45px', _extends2)),
    title: tooltip ? (typeof label === 'string' ? label + ': ' : '') + tooltip : undefined,
    className: (0, _classnames.default)('rbc-event', className, userProps.className, {
      'rbc-selected': selected,
      'rbc-event-continues-earlier': continuesEarlier,
      'rbc-event-continues-later': continuesLater
    })
  }, inner), _react.default.createElement(_reactTooltip.default, {
    className: "roomTooltip",
    id: "room" + event.id,
    effect: "solid",
    place: 'right',
    border: true,
    type: 'light'
  }, _react.default.createElement("div", {
    className: "header-tooltip"
  }, _react.default.createElement("p", null, "Cars 404"), _react.default.createElement("p", null, "3 gems")), _react.default.createElement("hr", null), _react.default.createElement("ul", {
    className: "content-tooltip-list"
  }, _react.default.createElement("li", null, "Total Duration: 45 mins"), _react.default.createElement("li", null, "Type: 50% Winner"), _react.default.createElement("li", null, "Total Respawns : 150")), _react.default.createElement("hr", null), _react.default.createElement("div", {
    className: "timeslot-tooltip"
  }, _react.default.createElement("section", null, _react.default.createElement("p", null, "T1: 7 AM"), _react.default.createElement("p", null, "T2: 7:15 AM")), _react.default.createElement("section", null, _react.default.createElement("p", null, "T3: 7:30 AM"), _react.default.createElement("p", null, "T4: 7:45 AM"))), _react.default.createElement("hr", null), _react.default.createElement("div", {
    className: "author-tooltip"
  }, _react.default.createElement("p", null, "Created By: Lokesh"), _react.default.createElement("p", null, "Date...."))));
}

var _default = TimeGridEvent;
exports.default = _default;
module.exports = exports["default"];