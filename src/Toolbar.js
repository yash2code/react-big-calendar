import PropTypes from 'prop-types'
import React from 'react'
import cn from 'classnames'
import { navigate } from './utils/constants'
import { Icon, Form } from 'tabler-react'

class Toolbar extends React.Component {
  state = { value: 'Today' }
  handleChange = event => {
    this.setState({ value: event.target.value })
  }
  render() {
    let {
      localizer: { messages },
      label,
    } = this.props

    // console.log(messages)

    return (
      <div className="rbc-toolbar">
        <span className="rbc-btn-group">
          <Icon
            name="chevron-left"
            onClick={this.navigate.bind(null, navigate.PREVIOUS)}
          />
          <span className="rbc-toolbar-label">{label}</span>
          <Icon
            name="chevron-right"
            onClick={this.navigate.bind(null, navigate.NEXT)}
          />
        </span>

        {/* <span className="rbc-toolbar-label">
          <Form.Select
            label="Filter"
            value={this.state.value}
            onChange={this.handleChange}
          >
            <option value={messages.today}>Today</option>
          </Form.Select>
        </span>
        <span className="rbc-toolbar-label">
          <Form.Select
            label="Filter"
            value={this.state.value}
            onChange={this.handleChange}
          >
            <option value={messages.today}>Today</option>
          </Form.Select>
        </span>
        <span className="rbc-toolbar-label">
          <Form.Select
            label="Filter"
            value={this.state.value}
            onChange={this.handleChange}
          >
            <option value={messages.yesterday}>Yesterday</option>
            <option value={messages.today}>Today</option>
            <option value={messages.tomorrow}>Tomorrow</option>
          </Form.Select>
        </span> */}

        <span className="rbc-btn-group">{this.viewNamesGroup(messages)}</span>
      </div>
    )
  }

  navigate = action => {
    this.props.onNavigate(action)
  }

  view = view => {
    this.props.onView(view)
  }

  viewNamesGroup(messages) {
    let viewNames = this.props.views
    const view = this.props.view

    // if (viewNames.length > 1) {
    //   return viewNames.map(name => (
    //     <button
    //       type="button"
    //       key={name}
    //       className={cn({ 'rbc-active': view === name })}
    //       onClick={this.view.bind(null, name)}
    //     >
    //       {messages[name]}
    //     </button>
    //   ))
    // }
  }
}

Toolbar.propTypes = {
  view: PropTypes.string.isRequired,
  views: PropTypes.arrayOf(PropTypes.string).isRequired,
  label: PropTypes.node.isRequired,
  localizer: PropTypes.object,
  onNavigate: PropTypes.func.isRequired,
  onView: PropTypes.func.isRequired,
}

export default Toolbar
