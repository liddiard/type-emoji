import React from 'react';

import Char from './Char.jsx';

const CharList = React.createClass({

  propTypes: {
    emoji: React.PropTypes.array.isRequired,
    searchText: React.PropTypes.string.isRequired,
    lastCopied: React.PropTypes.number.isRequired,
    updateLastCopied: React.PropTypes.func.isRequired
  },

  getInitialState() {
    return {
      emojiListSorted: this.props.emoji
    };
  },

  componentWillReceiveProps(nextProps) {
    if (this.props.emoji.length && nextProps.searchText.length) {
      // we have emoji and a search query
      if (this.timeoutId) {
        window.clearTimeout(this.timeoutId);
      }
      this.timeoutId = window.setTimeout(() => {
        this.search(nextProps);
      }.bind(this), 200);
    }
  },

  search(nextProps) {
    // show everything if search text is blank
    if (!nextProps.searchText.length) {
      this.setState({emojiListSorted: nextProps.emoji});
      return;
    }

    let searchTextSplit = nextProps.searchText.split(' ');

    // assign rankings to all emoji
    let emojiListRanked = nextProps.emoji;
    emojiListRanked.forEach(emoji => {
      emoji.searchMatch = 0; // reset search match
      searchTextSplit.forEach(word => {
        if (word.length) { // word is not an empty string
          if (emoji.name.indexOf(word) > -1)
            emoji.searchMatch++;
          emoji.annotations.forEach(annotation => {
            if (annotation.indexOf(word) > -1)
              emoji.searchMatch++;
          });
        }
      });
    });

    // filter out emoji with zero rank
    let emojiListFiltered = emojiListRanked.filter(emoji => {
      return emoji.searchMatch > 0;
    });

    // sort the remaining emoji in decending order of rank
    let emojiListSorted = emojiListFiltered.sort((a, b) => {
      if (a.searchMatch < b.searchMatch) return 1;
      if (b.searchMatch < a.searchMatch) return -1;
      return 0;
    });

    this.setState({emojiListSorted: emojiListSorted});
  },

  render() {
    // generate the React components
    let emojiList;
    if (this.props.searchText.length) {
      emojiList = this.state.emojiListSorted;
    }
    else {
      emojiList = this.props.emoji;
    }
    let emojiComponents = emojiList.map(emoji => {
      return (
        <Char emoji={emoji} key={emoji.index} lastCopied={this.props.lastCopied}
              updateLastCopied={this.props.updateLastCopied} />
      );
    });

    let loadingMessage;
    if (!this.props.emoji.length) {
      loadingMessage = (
        <div className="loading-message">Loading emoji…</div>
      );
    }

    return (
      <section id="emoji-list">
        {loadingMessage}
        {emojiComponents}
      </section>
    );
  },

});

module.exports = CharList;
