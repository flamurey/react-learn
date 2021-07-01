import React, { Suspense, lazy } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

const Home = lazy(() => import('./pages/home/HomePage'));
const Basket = lazy(() => import('./pages/basket/BasketPage'));
const Orders = lazy(() => import('./pages/orders/OrderPage'));

const App = () => (
    <Router>
        <Suspense fallback={<div>Loading...</div>}>
            <Switch>
                <Route exact path="/" component={() => <Home/>}/>
                <Route path="/basket" component={Basket}/>
                {/*<Route path="/orders" component={Orders}/>*/}
            </Switch>
        </Suspense>
    </Router>
);

export default App;
