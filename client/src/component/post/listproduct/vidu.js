import React from 'react';
var filterData = [
  { name: 'Aang', bender: 'yes', nation: 'Air', person: 'yes', show: 'ATLA' },
  { name: 'Appa', bender: 'yes', nation: 'Air', person: 'no', show: 'ATLA' },
  { name: 'Asami', bender: 'no', nation: 'Republic City', person: 'yes', show: 'LOK' },
  { name: 'Azula', bender: 'yes', nation: 'Fire', person: 'yes', show: 'ATLA' },
  { name: 'Bolin', bender: 'yes', nation: 'Earth', person: 'yes', show: 'LOK' },
  { name: 'Katara', bender: 'yes', nation: 'Water', person: 'yes', show: 'ATLA' },
  { name: 'Korra', bender: 'yes', nation: 'Water', person: 'yes', show: 'LOK' },
  { name: 'Jinora', bender: 'yes', nation: 'Air', person: 'yes', show: 'LOK' },
  { name: 'Lin Beifong', bender: 'yes', nation: 'Republic City', person: 'yes', show: 'LOK' },
  { name: 'Pabu', bender: 'no', nation: 'Fire', person: 'no', show: 'LOK' },
  { name: 'Momo', bender: 'no', nation: 'Air',  person: 'no', show: 'ATLA'},
  { name: 'Mai', bender: 'no', nation: 'Fire', person: 'yes', show: 'ATLA' },
  { name: 'Mako', bender: 'yes', nation: 'Fire', person: 'yes', show: 'LOK' },
  { name: 'Naga', bender: 'no', nation: 'Water', person: 'no', show: 'LOK'},
  { name: 'Sokka', bender: 'no', nation: 'Water', person: 'yes', show: 'ATLA' },
  { name: 'Suki', bender: 'no', nation: 'Earth', person: 'yes', show: 'ATLA' },
  { name: 'Tenzin', bender: 'yes', nation: 'Air', person: 'yes', show: 'LOK' },
  { name: 'Toph Beifong', bender: 'yes', nation: 'Earth', person: 'yes', show: 'ATLA' },
  { name: 'Ty Lee', bender: 'no', nation: 'Fire', person: 'yes', show: 'ATLA' },
  { name: 'Uncle Iroh', bender: 'yes', nation: 'Fire', person: 'yes', show: 'ATLA' },
  { name: 'Varrick', bender: 'no', nation: 'Republic City', person: 'yes', show: 'LOK' },
  { name: 'Zhu Li', bender: 'no', nation: 'Republic City', person: 'yes', show: 'LOK' },
  { name: 'Zuko', bender: 'yes', nation: 'Fire', person: 'yes', show: 'ATLA' }
];

class FilterForm extends React.Component{
  constructor(props){
    super(props);
    this.state = {
      data: this.props.data,
      bender:"",
      nation:"",
    };
  }
 
  filterItems(val, type) {
     switch (type) {
      case 'bender':
        this.setState({bender: val});
        break;
      case 'nation':
        this.setState({nation: val});
        break;
     
      default:
        break;
    }
  }

  render() {
    var filteredItems = this.props.data;
    var state = this.state;
    ["bender", "nation"].forEach(function(filterBy) {
      var filterValue = state[filterBy];
      if (filterValue) {
        filteredItems = filteredItems.filter(function(item) {
          return item[filterBy] === filterValue;
        });
      }
    });
    let benderArray = this.props.data.map(function(item) { return item.bender });
    benderArray = benderArray.filter((val, i, self) => self.indexOf(val)===i);
    let nationArray = this.props.data.map(function(item) { return item.nation });
    nationArray = nationArray.filter((val, i, self) => self.indexOf(val)===i);
    
    benderArray.unshift("");
    nationArray.unshift("");
    
    return (
      <div className="container">
        <FilterOptions 
            data={this.state.data} 
            benderOptions={benderArray} 
            nationOptions={nationArray}
           
            changeOption={this.filterItems.bind(this)} 
        />
        <div className="filter-form">
          <FilterItems data={filteredItems} />
        </div>
      </div>
    )
  }
}

const FilterOptions = ({ data, benderOptions, nationOptions, changeOption }) => {
    const handleChangeOption = (type, event) => {
        const value = event.target.value;
        changeOption(value, type);
    };

    return (
        <div className="filter-options">
        <div className="filter-option">
          <label>Bender</label>
          <select id="bender" onChange={handleChangeOption.bind(this, 'bender')}>            
            {benderOptions.map(function(option, index) {
                return ( <option key={index} value={option}>{option}</option> )
            })}           
          </select>

          <label>Nation</label>
          <select id="nation" onChange={handleChangeOption.bind(this, 'nation')}>
            {nationOptions.map(function(option, index) {
                return ( <option key={index} value={option}>{option}</option> )
            })}
          </select>
          
        </div>
      </div>
    );
};

const FilterItems = ({ data }) => {
    return (
        <div className="filter-items">
            {data.map(function(item, index){
                return (
                <div className="filter-item" key={index}>{item.name}</div>
                );
            })}
        </div>
    );
};


ReactDOM.render(<FilterForm data={filterData} />, document.getElementById("filter"));