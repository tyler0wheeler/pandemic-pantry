import './App.css';
import React from 'react'
import SearchContainer from './SearchContainer'
import CookbookContainer from './CookbookContainer'
{/* <SearchContainer /> */}
class App extends React.Component {
  render() {
  return (
    <div className="App">
     <CookbookContainer />    
    </div>
  );
  }
}

export default App;
