import React, {Component} from 'react';
import {useHistory} from "react-router-dom";
import api from "./api/api";
import Routes from "./Routes";

const App = () => {
    const history = useHistory();
    api.subscribe(history);
    return (
        <div>
            <Routes/>
        </div>
    );

};

export default App;