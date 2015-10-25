import React from 'react';

const Char = React.createClass({

  propTypes: {
    emoji: React.PropTypes.object.isRequired
  },

  select(event) {
    event.target.select();
  },

  handleCopy(event) {
    event.target.className = 'copied';
  },

  render() {
    return (
      <input type="text" value={this.props.emoji.char}
             title={this.props.emoji.name} readOnly onMouseOver={this.select}
             onCopy={this.handleCopy} />
    );
  }

});

module.exports = Char;
