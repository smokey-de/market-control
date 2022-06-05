import React, {useEffect, useState} from 'react';
import {Switch, Route, Redirect} from "react-router-dom";
import Warehouse from "../views/wareHouse/Warehouse";
import Report from "../views/report/Report";
import User from "../views/user/User";
import {Base64} from "js-base64";
import Manager from "../views/manager/Manager";


const HomeContent = () => {

    const [role, setRole] = useState(Base64.decode(localStorage.getItem("ROLE")));

    return (
        <>
            {role === "ROLE_USER" ?
                <Switch>
                    <Route exact path="/" component={Report}/>
                    <Redirect from={"/**"} to={"/404"}/>
                </Switch> :
                <Switch>
                    <Route exact path="/" component={Warehouse}/>
                    <Route exact path="/report" component={Report}/>
                    <Route exact path="/user" component={User}/>
                    <Route exact path="/manager" component={Manager}/>
                    <Redirect from={"/**"} to={"/404"}/>
                </Switch>
            }
        </>
    );
};

export default HomeContent;

