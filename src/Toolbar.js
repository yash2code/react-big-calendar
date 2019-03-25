import PropTypes from 'prop-types'
import React from 'react'
// import cn from 'classnames'
import { navigate } from './utils/constants'
// import leftNav from './assets/nav1.png'
// import rightNav from './assets/nav2.png'
import leftNav from './assets/svgnav1.svg'
import rightNav from './assets/svgnav2.svg'

class Toolbar extends React.Component {
  render() {
    let {
      localizer: { messages },
      label,
    } = this.props

    // console.log(messages)

    return (
      <div className="rbc-toolbar">
        <span className="rbc-btn-group">
          <img
            src={leftNav}
            name="chevron-left"
            onClick={this.navigate.bind(null, navigate.PREVIOUS)}
          />
          <span className="rbc-toolbar-label">{label}</span>
          <img
            src={rightNav}
            name="chevron-right"
            onClick={this.navigate.bind(null, navigate.NEXT)}
          />
        </span>

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
