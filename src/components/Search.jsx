import React from 'react';

const Search = React.createClass({

  propTypes: {
    searchText: React.PropTypes.string.isRequired,
    updateSearchText: React.PropTypes.func.isRequired,
    clearSearchText: React.PropTypes.func.isRequired
  },

  render(){
    let clearSearch;
    if (this.props.searchText.length) {
      clearSearch = (
        <div id="search-clear" title="Clear search"
             onClick={this.props.clearSearchText}>
          ❌
        </div>
      );
    }
    return (
      <div id="search-wrapper">
        <input type="text" id="search" placeholder="Search 🔎" autoFocus
               value={this.props.searchText}
               onChange={this.props.updateSearchText} />
        {clearSearch}
      </div>
    );
  }

});

module.exports = Search;
