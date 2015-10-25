import React from 'react';

const Char = React.createClass({

  propTypes: {
    emoji: React.PropTypes.object.isRequired,
    updateLastCopied: React.PropTypes.func.isRequired
  },

  select(event) {
    event.target.select();
  },

  render() {
    let inputClassName = '';
    if (this.props.lastCopied == this.props.emoji.index) {
      inputClassName += 'copied';
    }
    return (
      <input type="text" value={this.props.emoji.char} className={inputClassName}
             title={this.props.emoji.name} readOnly onMouseOver={this.select}
             onCopy={this.props.updateLastCopied.bind(null, this.props.emoji.index)} />
    );
  }

});

module.exports = Char;
