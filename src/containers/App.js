import React from 'react'
import CardList from '../components/CardList';
import { robots } from '../components/robots'
import SearchBox from '../components/SearchBox'
import './App.css';
import Scroll from '../components/Scroll'
import ErrorBoundery from '../components/ErrorBoundery'
const state = {
    robots: [],
    searchfield: ''
}
class App extends React.Component {
    constructor() {
        super();
        this.state = state;
    }
    onSearchChange = (event) => {
        this.setState({ searchfield: event.target.value })
    }

    componentDidMount() {
        fetch('https://jsonplaceholder.typicode.com/users')
            .then(response =>
                response.json()
            )
            .then(users => {
                this.setState({ robots: users })
            });
        this.setState({ robots: robots })
    }

    render() {
        const { robots, searchfield } = this.state;
        const filteredRobots = robots.filter(robot => {
            return robot.name.toLocaleLowerCase().includes(searchfield.toLocaleLowerCase());
        })

        return !robots.length ?
            <h1>Loading</h1> :
            (
                <div className='tc'>
                    <h1 className='f1'>RoboFriends</h1>
                    <SearchBox searchChange={this.onSearchChange} />
                    <Scroll>
                        <ErrorBoundery>
                            <CardList robots={filteredRobots} />
                        </ErrorBoundery>
                    </Scroll>
                </div>
            );
    }
}

export default App;