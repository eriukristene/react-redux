import * as actionTypes from './actions';

// we will start with our ingredients set up in the state here
// rather than grabbing the ingredients from the database
// via the function in BurgerBuilder (that's commented out for now)
// this will be a temporary reversal
const initialState = {
    ingredients: {
        salad: 0,
        bacon: 0,
        cheese: 0,
        meat: 0
    },
    totalPrice: 4
};

// define the initial ingredient prices here too
const INGREDIENT_PRICES = {
    salad: 0.5,
    cheese: 0.4,
    meat: 1.3,
    bacon: 0.7
};

const reducer = ( state = initialState, action ) => {
    switch ( action.type ) {
        case actionTypes.ADD_INGREDIENT:
            return {
                // copy the entire old state with the spread operator
                // so when we set new ingredients, we keep any other properties
                // by distributing them over this new JS object
                ...state,
                // create a new JS object here (immutability) when the
                // ingredients change
                ingredients: {
                    // distribute all properties of state ingredients
                    // really creating a new object
                    // need to do this here, because using only ...state
                    // does not create a deep clone of the state object
                    // it won't include all the other parts of the nngredients object too
                    // so if the state changes, these wouldn't change because they aren't copied deeply
                    // so we need to do ...state.ingredients to get those copied too
                    // so that we can update them when they changed
                    ...state.ingredients, // new ingredients object
                    // dynamically override a property in a JS object
                    // overriding the copy we created just above with the updated
                    // ingredients, and adding one because they added an ingredient
                    [action.ingredientName]: state.ingredients[action.ingredientName] + 1
                },
                // not only overriding the old ingredients from the state in this file
                // but also the old price
                totalPrice: state.totalPrice + INGREDIENT_PRICES[action.ingredientName]
            };
        case actionTypes.REMOVE_INGREDIENT:
            return {
                // basically same as above except remove
                ...state,
                ingredients: {
                    ...state.ingredients,
                    [action.ingredientName]: state.ingredients[action.ingredientName] - 1
                },
                totalPrice: state.totalPrice - INGREDIENT_PRICES[action.ingredientName]
            };
        default:
            return state;
    }
};

export default reducer;