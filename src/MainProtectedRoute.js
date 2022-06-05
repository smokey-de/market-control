import  React, {useState} from 'react';
import {NavLink} from "react-router-dom";
import {Route, Redirect} from 'react-router-dom';

const MainProtectedRoute = ({component: Component, ...rest}) => {
    const [log, setLog] = useState(true);

    return (
        <Route
            {...rest}
            render={(props) =>
                localStorage.getItem("BotToken") &&
                localStorage.getItem("Authority") ?(
                    <Component {...props}/>
                ) : (
                    <Redirect
                        to={{
                            pathname: "/login",
                            state: {from: props.location},
                        }}/>
                )}
        />
    );
};

export default MainProtectedRoute;