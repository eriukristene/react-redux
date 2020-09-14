const redux = require('redux');
const createStore = redux.createStore;

const initialState = {
    counter: 0
}

// Reducer
const rootReducer = (state = initialState, action) => {
    if (action.type === 'INC_COUNTER') {
        return {
            ...state, // copy the old state with the spread operator
            // since counter in state is just a number, not another object, we can update it
            // this way. if counter WAS another JS object, we would need to deep
            // copy that too with the spread operator
            counter: state.counter + 1
        };
    }
    if (action.type === 'ADD_COUNTER') {
        return {
            ...state,
            counter: state.counter + action.value // action.value is from below, we specified it
        };
    }
    return state;
};

// Store
const store = createStore(rootReducer);
console.log(store.getState());

// Subscription
// makes sure that I don't have to manually getState() in the code if I want to
// see what the current state is
// this informs me when I need to get a new state because the old state was updated
// or something changed
// the argument this takes is a function that executed whenever the state is updated
// in other words, whenever an action reaches the reducer
store.subscribe(() => {
    // execute any code on state updates
    // will know to do getState() here, because if it comes into this function, then
    // we know that something changed
    console.log('[Subscription]', store.getState());
});

// Dispatching Action
// what type of action was dispatched, and what should we do in the reducer
// pass as a javascript object
// these are the actions that are passed to the reducer (parameter - "action" above)
store.dispatch({type: 'INC_COUNTER'});
// will increase counter by a certain value, and need to include that value as a payload
store.dispatch({type: 'ADD_COUNTER', value: 10});
console.log(store.getState());
