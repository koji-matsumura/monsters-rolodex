import React from 'react';

import { CardList } from './components/card-list/card-list.component';
import { SearchBox } from './components/search-box/search-box.component';
//import logo from './logo.svg';
import './App.css';

// function App() {
//   return (
//     <div className="App">
//       <header className="App-header">
//         <img src={logo} className="App-logo" alt="logo" />
//         <p>Hello my name is Koji</p>
//         <a
//           className="App-link"
//           href="https://reactjs.org"
//           target="_blank"
//           rel="noopener noreferrer"
//         >
//           Learn React
//         </a>
//       </header>
//     </div>
//   );
// }

// The following codes are the as below.
// It means that default function is a component class.
// class App extends Component {
//   render() {
//     return (
//       <div className="App">
//         <header className="App-header">
//           <img src={logo} className="App-logo" alt="logo" />
//           <p>Hello my name is Koji</p>
//           <a
//             className="App-link"
//             href="https://reactjs.org"
//             target="_blank"
//             rel="noopener noreferrer"
//           >
//             Learn React
//           </a>
//         </header>
//       </div>
//     );
//   }
// }

// class App extends Component {
//   constructor() {
//     super();

//     this.state = {
//       string: 'Hello Koji'
//     }
//   }
//   // { } is a variable
//   // we can spcify a class in JS by using "className="
//   //
//   // render will be called again once the state is changed.
//   render() {
//     return (
//       <div className="App">
//         <header className="App-header">
//           <img src={logo} className="App-logo" alt="logo" />
//           <p>{ this.state.string }</p>
//           {/* Just declaring/changing the state is required to update a view.
//               We do not need to add a call back function to an Event handler,
//               and call a render method when the state is changed anymore */}
//           <button onClick={() => this.setState({ string: 'Hello Andrei' })}>Change text</button>
//         </header>
//       </div>
//     );
//   }
// }

class App extends React.Component {
  constructor() {
    super();

    // Each element should have a unique "key" prop.
    this.state = {
      monsters: [
        // {
        //   name: 'Frankenstein',
        //   id: 'asc1',
        // },
        // {
        //   name: 'Dracula',
        //   id: 'asr1',
        // },
        // {
        //   name: 'Zombie',
        //   id: 'as1w',
        // },
      ],
      searchField: '',
    };

    // Explicitly bind, but very vervose/redundant
    //   so use an arrow function instead. (e) => {}
    // this.handleChange = this.handleChange.bind(this);
  }

  componentDidMount() {
    fetch('https://jsonplaceholder.typicode.com/users')
      .then(response => response.json()) // json(), DO NOT FORGET to add () just after json
      .then(users => this.setState({ monsters: users }));
  }

  // Automatically bind "this" to App class by the arrow.
  handleChange = e => {
    this.setState({ searchField: e.target.value });

    // // Because of async, this value will not apply immediately
    // this.setState({ searchField: e.target.value });
    // //console.log(this.state); // delayed

    // If you want to wait a complete, use the following.
    // NOTE: setState(state: any, callback?: () => void):
    // this.setState({ searchField: e.target.value }, () =>
    //   console.log(this.state)
    // );
  };

  // we can spcify a class in JS by using "className="
  // { } is a variable
  //
  // render will be called again once the state is changed.
  render() {
    const { monsters, searchField } = this.state;
    // Create a new array which satisfies a search condition.
    const filterdMonsters = monsters.filter(monster =>
      monster.name.toLowerCase().includes(searchField.toLocaleLowerCase())
    );

    // Where CardList is props (properites), <h1>Koji</h1> is Children of props
    return (
      // State will be propagated to down components such as cardList, card.
      //
      // Event(s) are automatically coducted by React,
      // we do not take care of it because React must be smarter than us
      // concidering an order, timing, and so on.
      <div className="App">
        <h1> Monsters Rolodex </h1>
        <SearchBox
          placeholder="search monsters"
          handleChange={this.handleChange}
        />
        <CardList monsters={filterdMonsters}></CardList>
      </div>
    );
  }
}

export default App;
