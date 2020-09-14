import React from 'react';
import ReactDOM from 'react-dom';
import { createStore } from 'redux';
// helps us hook up our redux store to our react application
import { Provider } from 'react-redux';

import './index.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';
import reducer from './store/reducer';

// the store should be created when our application starts
// typically store the reducer in their own files because the actions
// can get complex for this file
// can find ours in store/reducer.js
// reducer comes from the import above
const store = createStore(reducer);

// where we mount our app component to the DOM
// Provider is a helper component which allows us to inject our store into our
// react components
// need to set up a special property (prop) provided by this Provider component
// the store is now connected to our react app
ReactDOM.render(<Provider store={store}><App /></Provider>, document.getElementById('root'));
registerServiceWorker();
