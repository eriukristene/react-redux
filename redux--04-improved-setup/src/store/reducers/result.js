// reducer that manages the results

import * as actionTypes from '../actions';

const initialState = {
    results: []
};

const reducer = ( state = initialState, action ) => {
    switch ( action.type ) {
        case actionTypes.STORE_RESULT:
            return {
                ...state,
                // concat returns a new array which is the old array plus
                // the argument you add to concat
                // push() would change the original state, which we do not want
                // normally, we only have access to the state here within the reducer (here, results)
                // if we need access to something in the global state, we need to get it as an
                // action payload
                results: state.results.concat({id: new Date(), value: action.result})
            }
        case actionTypes.DELETE_RESULT:
            // one way to do this
            // const id = 2;
            // const newArray = [...state.results];
            // newArray.splice(id, 1)

            // filter returns a new array, takes a function as input
            // function is executed on each element in the array
            // and determines whether this element fulfills a certain condition
            // to make it into the new array which is returned by filter, or not
            // resultElId - id we pass with the action, payload
            const updatedArray = state.results.filter(result => result.id !== action.resultElId);
            return {
                ...state,
                results: updatedArray
            }
    }
    return state;
};

export default reducer;