"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

exports.__esModule = true;
exports.default = void 0;

var _extends3 = _interopRequireDefault(require("@babel/runtime/helpers/extends"));

var _classnames = _interopRequireDefault(require("classnames"));

var _react = _interopRequireDefault(require("react"));

var _reactTooltip = _interopRequireDefault(require("react-tooltip"));

var _dates = _interopRequireDefault(require("./utils/dates"));

var _moment = _interopRequireDefault(require("moment"));

var _accessors = require("./utils/accessors");

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
      EventWrapper = _props$components.eventWrapper;
  var title = accessors.title(event);
  var tooltip = accessors.tooltip(event);
  var end = accessors.end(event);
  var start = accessors.start(event);
  var gems = accessors.gems(event);

  var duration = _dates.default.diff(start, end, 'minutes');

  var type = accessors.type(event);
  var respawn = accessors.respawn(event);
  var t1 = (0, _moment.default)(start).format('LT');
  var t2 = (0, _moment.default)(accessors.t2(event)).format('LT');
  var t3 = (0, _moment.default)(accessors.t3(event)).format('LT');
  var t4 = (0, _moment.default)(end).format('LT');
  var wdf = accessors.wdf(event);
  var created_by = accessors.created_by(event);
  var date_created = (0, _moment.default)(accessors.date(event)).format('lll'); // let color = accessors.color(event)

  console.log(wdf);
  var userProps = getters.eventProp(event, start, end, selected);
  var validation = accessors.validation(event);
  var isSimulated = accessors.isSimulated(event);
  var colors = !isSimulated ? fetchColors(colorType) : fetchColors('blue');
  var height = style.height,
      top = style.top,
      width = style.width,
      xOffset = style.xOffset,
      t2height = style.t2height,
      t3height = style.t3height,
      t2t3height = style.t2t3height;
  var inner = !validation ? [_react.default.createElement("div", {
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
  })] : _react.default.createElement("div", {
    style: {
      width: '100%',
      height: '100%',
      background: 'red'
    }
  });
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
    }, _extends2[isRtl ? 'right' : 'left'] = validation ? 0 : Math.max(0, xOffset) + "%", _extends2.width = validation ? '100%' : width + "%", _extends2.maxWidth = validation ? '100%' : '45px', _extends2)),
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
    type: 'light',
    delayHide: 500 // delayUpdate="1000"
    ,
    clickable: true
  }, _react.default.createElement("div", {
    className: "header-tooltip"
  }, _react.default.createElement("p", null, title), _react.default.createElement("p", null, gems + " gems")), _react.default.createElement("hr", null), _react.default.createElement("ul", {
    className: "content-tooltip-list"
  }, _react.default.createElement("li", null, "Total Duration: ", _react.default.createElement("span", null, duration + " mins")), _react.default.createElement("li", null, "Type: ", _react.default.createElement("span", null, type + "% Winners")), _react.default.createElement("li", null, _react.default.createElement("span", {
    className: "type"
  }, "" + wdf))), _react.default.createElement("hr", null), _react.default.createElement("div", {
    className: "timeslot-tooltip"
  }, _react.default.createElement("section", null, _react.default.createElement("p", null, "T1: " + t1), _react.default.createElement("p", null, "T2: " + t2)), _react.default.createElement("section", null, _react.default.createElement("p", null, "T3: " + t3), _react.default.createElement("p", null, "T4: " + t4))), _react.default.createElement("hr", null), _react.default.createElement("div", {
    className: "author-tooltip"
  }, _react.default.createElement("div", {
    className: "row-1"
  }, _react.default.createElement("p", null, "Created By: " + created_by.split(' ')[0]), _react.default.createElement("p", {
    className: "view-more"
  }, _react.default.createElement("a", null, "View More"))), _react.default.createElement("p", null, date_created))));
}

var _default = TimeGridEvent;
exports.default = _default;
module.exports = exports["default"];