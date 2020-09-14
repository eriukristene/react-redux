import React, { Component } from 'react';
import { Route } from 'react-router-dom';
import { connect } from 'react-redux';

import CheckoutSummary from '../../components/Order/CheckoutSummary/CheckoutSummary';
import ContactData from './ContactData/ContactData';

class Checkout extends Component {

    // state is gone, this is now in redux
    // got rid of componentWillMount()

    checkoutCancelledHandler = () => {
        this.props.history.goBack();
    }

    checkoutContinuedHandler = () => {
        this.props.history.replace( '/checkout/contact-data' );
    }

    render () {
        return (
            <div>
                <CheckoutSummary
                    ingredients={this.props.ings}
                    checkoutCancelled={this.checkoutCancelledHandler}
                    checkoutContinued={this.checkoutContinuedHandler} />
                <Route 
                    path={this.props.match.path + '/contact-data'} 
                    component={ContactData} /> {/*// removed the price from here, since we don't need it in this component anymore */}
            </div>
        );
    }
}

// redux
const mapStateToProps = state => {
    return {
        ings: state.ingredients // state.ingredients must be the name, it has to be the same name as in the reducer.js
    }
};

// nothing getting dispatched here, so only need mapToStateProps()

export default connect(mapStateToProps)(Checkout);