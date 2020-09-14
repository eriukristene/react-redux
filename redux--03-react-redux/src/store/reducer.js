// export the reducer I want to use

const initialState = {
    counter: 0
}

// reducer is a function which retrieves the state and action
const reducer = (state = initialState, action) => {
    if (action.type === 'INCREMENT') {
        return {
            // this is the equivalent of copying the counter property in the global state
            // because it's the only property and has a value of a number
            // if it had a value of an object, we'd have to do a deeper copy
            // we could copy the whole state with ...state but it is unnecessary here
            counter: state.counter + 1
        }
    }
    return state;
};

// can use it outside of this file
export default reducer;