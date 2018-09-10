import React, { Component } from 'react';
import PropTypes from 'prop-types';

import Header from './common/Header';

class Layout extends Component {
  render() {
    return (
      <div className="container-fluid">
        <header>
          <Header />
        </header>
        {this.props.children}
      </div>
    );
  }
}

Layout.propTypes = {
  children: PropTypes.array.isRequired,
};

export default Layout;
