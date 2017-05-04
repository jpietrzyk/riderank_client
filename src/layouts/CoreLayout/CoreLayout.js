import React from 'react'
import PropTypes from 'prop-types'
import Navigation from '../../components/Navigation'
import '../../assets/stylesheets/base.scss'
import '../../assets/stylesheets/lemonade.scss'

export const CoreLayout = ({ children }) => (
  <div>
    <Navigation />
    <div className='core-layout__viewport'>
      {children}
    </div>
  </div>
)

CoreLayout.propTypes = {
  children : PropTypes.element.isRequired
}

export default CoreLayout
