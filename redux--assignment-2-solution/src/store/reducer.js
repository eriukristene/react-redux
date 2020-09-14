import * as actionTypes from './actions';

// state we start with in this app
const initialState = {
    persons: []
};

// ES6 syntax
const reducer = ( state = initialState, action ) => {
    // action.type is expected by the redux package
    switch ( action.type ) {
        case actionTypes.ADD_PERSON:
            const newPerson = {
                id: Math.random(), // not really unique but good enough here!
                name: 'Max',
                age: Math.floor( Math.random() * 40 )
            }
            return {
                ...state,
                // creates a new array (persons) with anything updated and slapped on
                // to the copy of the previous state
                persons: state.persons.concat( newPerson )
            }
        case actionTypes.REMOVE_PERSON:
            return {
                ...state,
                // pass the personId as payload to the action
                // need to pass along the id with the action when the action is dispatched (in Persons.js)
                persons: state.persons.filter(person => person.id !== action.personId)
            }
    }
    return state;
};

export default reducer;