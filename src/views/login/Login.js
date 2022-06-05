import React, {useEffect, useState} from 'react';
import photo from '../../photo-1569091923578-399adee3f634.jpg'
import {Button, Form, Input, notification, Spin} from "antd";
import {useDispatch, useSelector} from "react-redux";
import {useHistory} from 'react-router-dom'
import {getProfileDataStart, loginStart} from "../../redux_saga/action/auth/authAction";

const Login = () => {

    const dispatch = useDispatch();
    const history = useHistory();
    const loading = useSelector(state => state.auth.loading);
    const data = useSelector(state => state.auth.data);
    const status = useSelector(state => state.auth.status);
    const profileData = useSelector(state => state.auth.profileData);
    const visible = useSelector(state => state.modal.visible);

    const openNotificationWithIcon = type => {
        notification[type]({
            message: `${status === "Request failed with status code 401" ? "User topilmadi" : status.code === 101 ? status.message : status}`,
            description: '',
        });
    };

    useEffect(() => {

        if (profileData.code === 0) {
            if (localStorage.getItem("BotToken")) {
                history.push("/")
            }
        }
    }, [profileData]);

    useEffect(() => {
        localStorage.clear();
    }, []);

    useEffect(() => {
        if (data.code === 0) {
            // console.log("ok");
            dispatch(getProfileDataStart())
        }
    }, [data]);

    useEffect(() => {
        if (status === "Network Error") {
            openNotificationWithIcon('error')
        }else if (status === "Request failed with status code 401"){
            openNotificationWithIcon('error')
        }else if (status.code === 101){
            openNotificationWithIcon('info')
        }
    }, [status]);


    const onFinish = (values) => {
        dispatch(loginStart(values))
    };

    const layout = {
        wrapperCol: {span: 24},
    };

    const tailLayoutLoading = {
        wrapperCol: {offset: 11, span: 13},
    };

    const tailLayout = {
        wrapperCol: {offset: 9, span: 15},
    };

    return (
        <div id='section2'>
            <div className={`container `}>
                <div className="user signinBx">
                    <div className="imgBx d-none"></div>
                    <div className="formBx">
                        <Form
                            {...layout}
                            name="basic"
                            onFinish={onFinish}
                            // onFinishFailed={onFinishFailed}
                        >
                            <h2>Логин</h2>
                            <Form.Item
                                name="username"
                                rules={[{message: 'Please input your phone number!'}]}
                            >
                                <Input
                                    placeholder="Enter the username"
                                    required/>
                            </Form.Item>
                            <Form.Item
                                name="password"
                                rules={[{message: 'Please input your password!'}]}>
                                <Input.Password
                                    placeholder="Enter the password"
                                    required/>
                            </Form.Item>
                            <Form.Item
                                {...loading ? tailLayoutLoading : tailLayout}>
                                {loading ? <Spin/> :
                                    <Button type="primary" htmlType="submit">
                                         Войти
                                    </Button>
                                }
                            </Form.Item>
                        </Form>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Login;