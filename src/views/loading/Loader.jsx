import React from "react";
import styled from 'styled-components'
import './loading.css'

const Div = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 90vh;
  width: 100%
`
const Loader = () => {
    return (
        <Div>
            <div className="loader">
                <div className="inner one"></div>
                <div className="inner two"></div>
                <div className="inner three"></div>
            </div>
        </Div>
    )
};

export default Loader