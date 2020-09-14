// create everything we need to run redux

// node.js import syntax
create redux = require('redux');
const createStore = redux.createStore;

// need to setup an initial state or else our state will be undefined if we try to use it
const initialSate = {
    counter: 0
}

// Reducer (only will have one reducer, even if we have multiple, they will be combined into one)
// the only thing that will update the state in the end
// needs to be passed to the store to update it
// receives two parameters - current state and action
// can initialize state with a default value in the function parameters
// in this case, the state will take initialState whenever state is undefined
// which in this case will be true, when it is creating the store and executing the
// reducer for the first time

const rootReducer = (state = initialSate, action) => {
    return state; // returns the state we already had
};

// Store
const store = createStore(rootReducer);

// Dispatching Action

// Subscription

