import React from 'react';
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
      searchText: ''
    };
  },

  componentDidMount() {
    request
    .get(this.props.DATA_URL)
    .end(function(err, res){
      this.setState({emoji: res.body.results.collection1});
    }.bind(this));

    document.addEventListener('keydown', event => {
      if (event.metaKey || event.ctrlKey) {
        return; // a copy or other control event is about to happen; do nothing
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
        <CharList emoji={this.state.emoji} searchText={this.state.searchText} />
        <footer>
          Created while procrastinating homework by <a href="http://www.harrisonliddiard.com/">Harrison Liddiard</a>. <a href="https://github.com/liddiard/type-emoji/">GitHub</a>.
        </footer>
      </div>
    );
  }

});

React.render(<App />, document.body);
