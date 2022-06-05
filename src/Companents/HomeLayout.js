import React, {useEffect, useState} from 'react';
import {NavLink, useLocation,} from "react-router-dom";
import HomeContent from "./HomeContent";

import {
    MenuUnfoldOutlined,
    MenuFoldOutlined,
    UserOutlined,
    PieChartOutlined, TeamOutlined
} from '@ant-design/icons';
import {
    Layout,
    Menu,
    Dropdown,
    Button, Space, Radio, Drawer,

} from 'antd';
import IdcardOutlined from "@ant-design/icons/lib/icons/IdcardOutlined";
import MenuOutlined from "@ant-design/icons/lib/icons/MenuOutlined";
import ZhihuOutlined from "@ant-design/icons/lib/icons/ZhihuOutlined";
import LogoutOutlined from "@ant-design/icons/lib/icons/LogoutOutlined";
import {useDispatch, useSelector,} from "react-redux";
import {getProfileDataStart, getProfileDataSuccess} from "../redux_saga/action/auth/authAction";
import * as Base64 from "js-base64";
import BankFilled from "@ant-design/icons/es/icons/BankFilled";
import CalculatorFilled from "@ant-design/icons/es/icons/CalculatorFilled";
import StepForwardFilled from "@ant-design/icons/es/icons/StepForwardFilled";
import StepBackwardFilled from "@ant-design/icons/es/icons/StepBackwardFilled";
import CloseOutlined from "@ant-design/icons/es/icons/CloseOutlined";


const {Header, Content, Footer, Sider} = Layout;
const {SubMenu} = Menu;


const HomeLayout = () => {

    const [role, setRole] = useState(Base64.decode(localStorage.getItem("ROLE")));
    const username = useSelector(state => state.auth.userId);

    const dispatch = useDispatch();
    let location = useLocation();

    useEffect(() => {
        if (localStorage.getItem("Authority")) {
            dispatch(getProfileDataSuccess(JSON.parse(Base64.decode(localStorage.getItem("Authority")))))
        } else {
            logOut();
        }
    }, []);

    const [collapsed, setCollapsed] = useState(false);
    const [visible, setVisible] = useState(true);


    const ssd = location => {
        if (location.endsWith('/')) {
            return '0'
        }
        if (location.endsWith('/user')) {
            return '3'
        }
        if (location.endsWith('/report')) {
            return '2'
        }
        if (location.endsWith('/manager')) {
            return '4'
        }
    };


    // const toggle = () => {
    //     if (sessionStorage.getItem("collapse") === "0") {
    //         sessionStorage.setItem("collapse", "1")
    //     } else {
    //         sessionStorage.setItem("collapse", "0")
    //     }
    //     setCollapsed(!collapsed)
    // };

    const logOut = () => {
        localStorage.clear();
        sessionStorage.clear();
        window.location.reload(false);
    };


    const [visabile , setVisable] = useState(false)
    const [placement , setPlacement] = useState('left')

   const showDrawer = () => {
       setVisable(true);
    };

   const onClose = () => {
        setVisable(false)
    };

   const  onChange = e => {
      setPlacement(e.target.value)
    };

    return (
        <div id="components-layout-demo-custom-trigger">


                {visible ? <Sider trigger={null} theme='light' collapsible
                                  collapsed={sessionStorage.getItem("collapse") === "0"}>
                    <div className='d-none'>
                        <h2 style={{
                            textAlign: "center",
                            color: "#fff",
                        }}>{username}</h2>
                    </div>

                    {/*<Space>*/}
                    {/*    <Radio.Group value={placement}  onChange={onChange}>*/}
                    {/*        <Radio value="top">top</Radio>*/}
                    {/*        <Radio value="right">right</Radio>*/}
                    {/*        <Radio value="bottom">bottom</Radio>*/}
                    {/*        <Radio value="left">left</Radio>*/}
                    {/*    </Radio.Group>*/}
                    {/*</Space>*/}
                    <Drawer
                        style={{textAlign: "center"}}  title={<span style={{display: "flex", justifyContent: "space-between", alignItems: 'center'}}>{username}
                        <Button onClick={onClose} className="logoHeader" type="primary"><CloseOutlined /></Button>
                        </span>}
                        placement={placement}
                        closable={false}
                        onClose={onClose}
                        visible={visabile}
                        key={placement}
                    >
                        {role === "ROLE_USER" ?
                            <Menu mode="inline" defaultSelectedKeys={[ssd(location.pathname)]} >

                                <Menu.Item key="0" icon={<CalculatorFilled/>} >
                                    <NavLink to={`/`}  onClick={onClose}>
                                        Пользователь
                                    </NavLink>
                                </Menu.Item>

                            </Menu> :

                            <Menu mode="inline" defaultSelectedKeys={[ssd(location.pathname)]}>

                                <Menu.Item key="0" icon={<BankFilled/>}>
                                    <NavLink to={`/`}  onClick={onClose}>
                                        Маркет
                                    </NavLink>
                                </Menu.Item>

                                <Menu.Item key="3" icon={<UserOutlined/>}>
                                    <NavLink to={`/user`}  onClick={onClose}>
                                        Пользователь
                                    </NavLink>
                                </Menu.Item>

                                <Menu.Item key="2" icon={<CalculatorFilled/>}>
                                    <NavLink to={`/report`}  onClick={onClose}>
                                        Отчет
                                    </NavLink>
                                </Menu.Item>

                                <Menu.Item key="4" icon={<TeamOutlined />}>
                                    <NavLink to={`/manager`}  onClick={onClose}>
                                        Менежер
                                    </NavLink>
                                </Menu.Item>

                            </Menu>

                        }
                    </Drawer>
                </Sider> : ''}
                <Layout className="site-layout" >
                    <Header className="site-layout-background" style={{padding: 0}}>
                        {/*{visible ? React.createElement(sessionStorage.getItem("collapse") === "0" ? MenuUnfoldOutlined : MenuFoldOutlined, {*/}
                        {/*    className: 'trigger',*/}
                        {/*    onClick: toggle,*/}
                        {/*}) : ''}*/}
                        <Button type="primary" onClick={showDrawer} style={{marginLeft: "10px"}}>
                            <StepForwardFilled />
                        </Button>
                        <Button style={{marginLeft: '10px'}} onClick={(e) => logOut(e)}
                                className="logoHeader" type="primary"> Выйти
                            <LogoutOutlined/></Button>
                    </Header>
                    <Content
                        className="site-layout-background cnt"
                        style={{
                            margin: '24px 16px',
                            padding: 24,
                        }}
                    >
                        <HomeContent/>
                    </Content>
                </Layout>
        </div>

    );
};

export default HomeLayout;