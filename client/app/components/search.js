import React from 'react';
import {getAllContracts, getSearchContracts} from '../server';
import SearchResult from './searchresult'
import ContractPreview from './contractpreview'
import AdvancedSearch from './advancedsearch'
import SearchBar from './searchbar'

export default class Search extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      contracts: [],
      showPreview: false,
      previewContract: {},
      previewContractor: {}
    };
  }

  refresh() {
    getAllContracts(this.props.container, results => {
      this.setState({
        contracts: results,
        showPreview: this.state.showPreview,
        previewContract: this.state.previewContract,
        previewContractor: this.state.preivewContractor
      });
    });
  }

  componentDidMount() {
    this.refresh();
  }

  previewContract(contract) {
    this.setState({
      contracts: this.state.contracts,
      showPreview: true,
      previewContract: contract,
      previewContractor: this.state.previewContractor
    });
  }

  search(searchTerm) {
    getSearchContracts(searchTerm, this.props.container, results => {
      this.setState({
        contracts: results,
        showPreview: false,
        previewContract: {},
        previewContractor: {}
      });
    });
  }

  render() {
    var contract, contracts;
    if(!this.state.showPreview){
      contract = <div></div>
    } else {
      contract = <ContractPreview data={this.state.previewContract}/>
    }
    if(this.state.contracts.length === 0){
      contracts = <p>There are no contracts matching your search.</p>
    }else{
      contracts = [];
      this.state.contracts.forEach((result) => {
        contracts.push(<SearchResult key={result._id} data={result} previewContract={this.previewContract.bind(this)}/>);
      });
    }
    return (
      <div>
      <div>
        <div className="container">
          <div className="row">
            <div className="col-md-2 advanced-search min-padding">
              <AdvancedSearch />
            </div>
            <div className="col-md-6 min-padding">
              <div className="row">
                <div className="col-md-12">
                  <SearchBar searchTerm={null} search={this.search.bind(this)}/>
                  <button type="button" className="btn btn-default pull-right" style={{marginTop: 5 + 'px', marginBottom: 5 + 'px'}} onClick={this.refresh.bind(this)}>Clear</button>
                </div>
              </div>
              <hr style={{marginTop: 0 + 'px', marginBottom: 5 + 'px'}}/>
              <div className="row">
                <div className="col-md-12">
                  {contracts}
                </div>
              </div>
            </div>
            <div className="col-md-4 min-padding">
              {contract}
            </div>
          </div>
        </div>
      </div>
    </div>
    );
  }
}
