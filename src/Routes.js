import React, {Suspense, lazy, useState, useEffect} from 'react';
import Loader from "./views/loading/Loader";
import {Switch, Route, Redirect} from 'react-router-dom'
import MainProtectedRoute from "./MainProtectedRoute";
import { BrowserRouter as Router } from 'react-router-dom';

const Login = lazy(() => import("./views/login/Login"));
const HomeLayout = lazy(() => import("./Companents/HomeLayout.js"));
const Routes = () => {
    return (
        <Suspense fallback={<Loader/>}>
            <Switch>
                <Route exact path="/login" component={Login}/>

                <MainProtectedRoute path="/" component={props => <HomeLayout {...props}/>}/>
            </Switch>
        </Suspense>
    );
};
export default Routes;