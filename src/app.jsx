import React from 'react';
import ReactDOM from 'react-dom';
import request from 'superagent';

import Search from './components/Search.jsx';
import CharList from './components/CharList.jsx';

import './styles/app.scss';

const App = React.createClass({

  getDefaultProps() {
    return {
      DATA_URL: '/emoji.json'
    };
  },

  getInitialState() {
    return {
      emoji: [],
      searchText: '',
      lastCopied: -1 // Index property of emoji last copied to keyboard.
                     // Negative values do not correspond to any emoji.
    };
  },

  componentDidMount() {
    request
    .get(this.props.DATA_URL)
    .end(function(err, res){
      this.setState({emoji: res.body.results.collection1});
    }.bind(this));

    document.addEventListener('keydown', event => {
      // don't do anything if a control event like copy, paste, etc. is about
      // to happen, unless it's Ctrl/Cmd-A (key code 65, select all)
      if (event.keyCode !== 65 && (event.metaKey || event.ctrlKey)) {
        return;
      }
      let search = document.getElementById('search');
      if (!search.selectionStart && !search.selectionEnd) {
        // cursor is either not in search input field or at position 0
        let len = search.value.length;
        // move cursor to the end of input
        search.setSelectionRange(len, len);
        search.focus();
      }
    });
  },

  updateSearchText(event) {
    this.setState({searchText: event.target.value});
  },

  clearSearchText(event) {
    this.setState({searchText: ''});
    document.getElementById('search').focus();
    // send a Google Analytics event
    ga('send', {
      'hitType': 'event',          // Required.
      'eventCategory': 'search',   // Required.
      'eventAction': 'clear'       // Required.
    });
  },

  updateLastCopied(emoji) {
    this.setState({lastCopied: emoji.index});
    // send a Google Analytics event
    ga('send', {
      'hitType': 'event',          // Required.
      'eventCategory': 'emoji',    // Required.
      'eventAction': 'copy',       // Required.
      'eventLabel': emoji.char,
      'eventValue': emoji.index
    });
  },

  render() {
    return (
      <div id="app">
        <header>
          <h1><span className="emoji">💁</span>TypeEmoji</h1>
          <h2>The no-nonsense emoji and emoticon search keyboard</h2>
        </header>
        <Search searchText={this.state.searchText}
                updateSearchText={this.updateSearchText}
                clearSearchText={this.clearSearchText} />
        <CharList emoji={this.state.emoji} searchText={this.state.searchText}
                  lastCopied={this.state.lastCopied}
                  updateLastCopied={this.updateLastCopied} />
        <footer>
          Created while procrastinating by <a href="http://www.harrisonliddiard.com/">Harrison Liddiard</a>. <a href="https://github.com/liddiard/type-emoji/">GitHub</a>.
        </footer>
      </div>
    );
  }

});

ReactDOM.render(<App />, document.querySelector('main'));
