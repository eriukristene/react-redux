import React, { Component } from 'react';
import { connect } from 'react-redux';

import CounterControl from '../../components/CounterControl/CounterControl';
import CounterOutput from '../../components/CounterOutput/CounterOutput';
import * as actionTypes from '../../store/actions';

class Counter extends Component {
    render () {
        return (
            <div>
                <CounterOutput value={this.props.ctr} />
                <CounterControl label="Increment" clicked={this.props.onIncrementCounter} />
                <CounterControl label="Decrement" clicked={this.props.onDecrementCounter}  />
                <CounterControl label="Add 10" clicked={this.props.onAddCounter}  />
                <CounterControl label="Subtract 15" clicked={this.props.onSubtractCounter}  />
                <hr />
                <button onClick={() => this.props.onStoreResult(this.props.ctr)}>Store Result</button>
                <ul>
                    {/* add current counter value to our list here
                        map each result to strResult, an array of JSX list items */}
                    {this.props.storedResults.map(strResult => (
                        <li key={strResult.id} onClick={() => this.props.onDeleteResult(strResult.id)}>{strResult.value}</li>
                    ))}
                </ul>
            </div>
        );
    }
}

const mapStateToProps = state => {
    return {
        // need to access counter and result through ctr and res, new props set up
        // in the combined reducer that represent these other two reducers
        // since those props (counter and results) are in the state of the sub reducers
        // that are combined in index.js
        ctr: state.ctr.counter,
        storedResults: state.res.results
    }
};

const mapDispatchToProps = dispatch => {
    return {
        // must include the type property, the name is not up to us, must be "type"
        onIncrementCounter: () => dispatch({type: actionTypes.INCREMENT}),
        onDecrementCounter: () => dispatch({type: actionTypes.DECREMENT}),
        onAddCounter: () => dispatch({type: actionTypes.ADD, val: 10}),
        // will extract the val property in the reducer
        onSubtractCounter: () => dispatch({type: actionTypes.SUBTRACT, val: 15}),
        onStoreResult: (result) => dispatch({type: actionTypes.STORE_RESULT, result: result}),
        // id here is the same as resultId from result.js; it is being passed as a payload
        onDeleteResult: (id) => dispatch({type: actionTypes.DELETE_RESULT, resultElId: id})
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(Counter);