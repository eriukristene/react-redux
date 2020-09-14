import React, { Component } from 'react';
// a functio which returns a higher order component used on the export
import { connect } from 'react-redux';

import CounterControl from '../../components/CounterControl/CounterControl';
import CounterOutput from '../../components/CounterOutput/CounterOutput';

// this component receives the state from redux
// still have some components get the state and pass it on/distribute to their components
class Counter extends Component {
    state = {
        counter: 0
    }

    counterChangedHandler = ( action, value ) => {
        switch ( action ) {
            case 'inc':
                this.setState( ( prevState ) => { return { counter: prevState.counter + 1 } } )
                break;
            case 'dec':
                this.setState( ( prevState ) => { return { counter: prevState.counter - 1 } } )
                break;
            case 'add':
                this.setState( ( prevState ) => { return { counter: prevState.counter + value } } )
                break;
            case 'sub':
                this.setState( ( prevState ) => { return { counter: prevState.counter - value } } )
                break;
        }
    }

    render () {
        return (
            <div>
                {/* before we would use this.state.counter, but now that we have 
                mapped the state to props below because of storing the state in redux,
                we can use this.props.ctr, which is mapped below */}
                <CounterOutput value={this.props.ctr} />
                {/* this onIncrementCounter property holds a reference to the
                function we need to excute below */}
                <CounterControl label="Increment" clicked={this.props.onIncrementCounter} />
                <CounterControl label="Decrement" clicked={() => this.counterChangedHandler( 'dec' )}  />
                <CounterControl label="Add 5" clicked={() => this.counterChangedHandler( 'add', 5 )}  />
                <CounterControl label="Subtract 5" clicked={() => this.counterChangedHandler( 'sub', 5 )}  />
            </div>
        );
    }
}

// store instructions about how the state, managed by redux, should be mapped to 
// props you can use in this container
// stores a function which expects the state stored in redux as the input
// returns a JS object which is a map of prop names and slices of the state stored in redux
// this our way of configuring which kinds of information we need
const mapStateToProps = state => {
    return {
        ctr: state.counter // state.counter is the counter property on the global state managed by redux
    };
};

// which kind of actions do I want to dispatch in this container?
// receives the dispatch function as an argument
const mapDispatchToProps = dispatch => {
    return { // a JS object
        // define some prop names which will hold a refernce to a function
        // which should eventually get executed to dispatch an action
        // this prop holds a value which is an anonymous function
        // the dispatch function will then be available through the onIncrementCounter property
        // whenever this property is executed as a function, then the dispatch method will be executed
        onIncrementCounter: () => dispatch({type: 'INCREMENT'})
    };
};

// connect is a function which returns a function which takes then a component as input
// pass two things - 1. which part of the whole application state is interesting to us (which slice of the state)
// AND 2. which actions do I want to dispatch in this container
// if you have state to map, but no dispatch, just leave mapDispatchToProps out
// if you actions to dispatch, but no state to map to props, pass null as the first argument
export default connect(mapStateToProps, mapDispatchToProps)(Counter);