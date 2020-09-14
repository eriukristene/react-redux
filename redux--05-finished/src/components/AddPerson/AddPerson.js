import React, { Component } from 'react';

import './AddPerson.css';

class AddPerson extends Component {
    // this isn't necessarily relevant to the entire application
    // so we can manage this state in this component rather than in a 
    // a global redux store
    state = {
        name: '',
        age: ''
    }

    // handling the user input in a redux worldy
    nameChangedHandler = (event) => {
        this.setState({name: event.target.value});
    }

    ageChangedHandler = (event) => {
        this.setState({age: event.target.value});
    }

    render () {
        return (
            <div className="AddPerson">
                <input 
                    type="text" 
                    placeholder="Name" 
                    onChange={this.nameChangedHandler}
                    value={this.state.name} />
                <input 
                    type="number" 
                    placeholder="Age"
                    onChange={this.ageChangedHandler}
                    value={this.state.age} />
                <button onClick={() => this.props.personAdded(this.state.name, this.state.age)}>Add Person</button>
            </div>
        );
    }
}

export default AddPerson;