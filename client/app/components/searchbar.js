import React from 'react';

export default class SearchBar extends React.Component{
  constructor(props) {
    super(props);
    this.state = {searchTerm: props.searchTerm};
  }

  trimTerm() {
    var trimmedTerm = this.state.searchTerm.trim();
    if(trimmedTerm !== "") {
      this.props.search(trimmedTerm);
    }
  }

  handleSearchButtonClick(e) {
    e.preventDefault();
    this.trimTerm();
  }

  handleChange(e) {
    e.preventDefault();
    this.setState({
      searchTerm: e.target.value
    });
  }

  handleKeyUp(e) {
    e.preventDefault();
    if (e.key === "Enter") {
      this.trimTerm();
    }
  }

  clear() {
    document.getElementById("input").value="";
    this.props.clear();
  }

  render(){
    return (
      <div>
        <form className="input-group">
          <input id="input" type="text" className="form-control" placeholder="Search Projects" onChange={(e) => this.handleChange(e)} onKeyUp={(e) => this.handleKeyUp(e)}/>
          <span className="input-group-btn">
            <button type="submit" className="btn btn-default" onClick={(e) => this.handleSearchButtonClick(e)}>
              <span className="glyphicon glyphicon-search"></span>
            </button>
          </span>
        </form>
        <button type="button" className="btn btn-default pull-right" style={{marginTop: 5 + 'px', marginBottom: 5 + 'px'}} onClick={() => this.clear()}>Clear</button>
      </div>
    );
  }
}
