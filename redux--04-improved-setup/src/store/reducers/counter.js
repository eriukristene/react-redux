// reducer than manages the counter
import * as actionTypes from '../actions';

const initialState = {
    counter: 0
};

const reducer = ( state = initialState, action ) => {
    switch ( action.type ) {
        // was case 'INCREMENT' before, replaced with actionTypes so we can prevent typos
        case actionTypes.INCREMENT:
            // can copy the initial state this way and update only what needs to be
            // updated via this methodology
            const newState = Object.assign({}, state);
            newState.counter = state.counter + 1;
            return newState;
        case actionTypes.DECREMENT:
            return {
                // however, this is a shorter and better way to fully copy the state
                ...state,
                counter: state.counter - 1
            }
        case actionTypes.ADD:
            return {
                ...state,
                counter: state.counter + action.val // refers to prop name chosen in Counter.js
                // rather than action.val being hard coded to 10 as before
            }
        case actionTypes.SUBTRACT:
            return {
                ...state,
                counter: state.counter - action.val
            }
    }
    // will return the initial state or the current state, depending on if
    // anything was done or not in our application
    return state;
};

export default reducer;