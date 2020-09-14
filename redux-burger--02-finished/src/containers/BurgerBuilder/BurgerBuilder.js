import React, { Component } from 'react';
import { connect } from 'react-redux';

import Auxiliary from '../../hoc/Auxiliary/Auxiliary';
import Burger from '../../components/Burger/Burger';
import BuildControls from '../../components/Burger/BuildControls/BuildControls';
import Modal from '../../components/UI/Modal/Modal';
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary';
import Spinner from '../../components/UI/Spinner/Spinner';
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';
import axios from '../../axios-orders';
import * as actionTypes from '../../store/actions';

class BurgerBuilder extends Component {
    // constructor(props) {
    //     super(props);
    //     this.state = {...}
    // }

    // !! replace everywhere we use ingredients (from state) to ings
    // to be clear that we are NOT using ingredients from state anymore
    // that's why it was deleted here

    // these state properties left are specific to managing our UI state only
    // nothing we necessarily need to manage through the global redux store
    // we could put them in redux, but we don't have to
    state = {
        purchasing: false,
        loading: false,
        error: false
    }

    componentDidMount () {
        console.log(this.props);
        
        // we are setting up the initial ingredients state in reducer.js
        // so we are commenting out this code that gets the initial ingredients
        // list from the server
        // this is a temporary reversal

        // axios.get( 'https://react-my-burger-7d58a.firebaseio.com/ingredients.json' )
        //     .then( response => {
        //         this.setState( { ingredients: response.data } );
        //     } )
        //     .catch( error => {
        //         this.setState( { error: true } );
        //     } );
    }

    updatePurchaseState ( ingredients ) {
        const sum = Object.keys( ingredients )
            .map( igKey => {
                return ingredients[igKey];
            } )
            .reduce( ( sum, el ) => {
                return sum + el;
            }, 0 );
        return sum > 0;
    }

    // we were able to deleted the addIngredientHandler() and removeIngredientHandler() here

    purchaseHandler = () => {
        this.setState( { purchasing: true } );
    }

    purchaseCancelHandler = () => {
        this.setState( { purchasing: false } );
    }

    // this was massively reduced because of the redux store
    purchaseContinueHandler = () => {
        this.props.history.push('/checkout');
    }

    render () {
        const disabledInfo = {
            ...this.props.ings // set up in mapStateToProps()
                               // to replace this.state.ingredients
        };
        for ( let key in disabledInfo ) {
            disabledInfo[key] = disabledInfo[key] <= 0
        }
        let orderSummary = null;
        let burger = this.state.error ? <p>Ingredients can't be loaded!</p> : <Spinner />;

        if ( this.props.ings ) {
            burger = (
                <Auxiliary>
                    <Burger ingredients={this.props.ings} />
                    <BuildControls
                    // replaced our old handlers with these new ones set up in 
                    // mapDispatchToProps () below
                    // they were addIngredientHandler() and removeIngredientHandler()
                        ingredientAdded={this.props.onIngredientAdded}
                        ingredientRemoved={this.props.onIngredientRemoved}
                        disabled={disabledInfo}
                        // fetch the updated result of what has been purchased
                        purchasable={this.updatePurchaseState(this.props.ings)} // use to have this.state.purchaseable
                        ordered={this.purchaseHandler}
                        price={this.props.price} />
                </Auxiliary>
            );
            orderSummary = <OrderSummary
                ingredients={this.props.ings}
                price={this.props.price} // this replaces this.state.totalPrice, we set it up below to access the state from reducer.js
                purchaseCancelled={this.purchaseCancelHandler}
                purchaseContinued={this.purchaseContinueHandler} />;
        }
        if ( this.state.loading ) {
            orderSummary = <Spinner />;
        }
        // {salad: true, meat: false, ...}
        return (
            <Auxiliary>
                <Modal show={this.state.purchasing} modalClosed={this.purchaseCancelHandler}>
                    {orderSummary}
                </Modal>
                {burger}
            </Auxiliary>
        );
    }
}

// these will define which props we get in the BurgerBuilder

// receives the state automatically
// returns a JS object where we define which properties should hold
// which slice of the state
const mapStateToProps = state => {
    return {
        ings: state.ingredients, // get access to ingredients property in the state
        price: state.totalPrice  // need to also get the price from the state in the other file too (reducer.js)
    };
}
// holds a function which receives the dispatch function as an argument
// returns an object with props function mapping
const mapDispatchToProps = dispatch => {
    return {
        // two props which can be triggered
        // passing on the payloads from the reducer (ingredientName: ingName)
        // ingName is a property being passed on from the BuildControls and reducer.js
        // to make sure we are passing on the correct values to our action dispatchers
        onIngredientAdded: (ingName) => dispatch({type: actionTypes.ADD_INGREDIENT, ingredientName: ingName}),
        onIngredientRemoved: (ingName) => dispatch({type: actionTypes.REMOVE_INGREDIENT, ingredientName: ingName})
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(withErrorHandler( BurgerBuilder, axios ));