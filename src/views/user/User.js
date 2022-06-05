import React, {useEffect, useState} from 'react';
import {Button, Form, Input, Modal, notification, Popconfirm, Select, Space, Table, Tooltip} from "antd";
import SearchOutlined from "@ant-design/icons/es/icons/SearchOutlined";
import Highlighter from "react-highlight-words";
import {useDispatch, useSelector} from "react-redux";
import {getUserStart} from "../../redux_saga/action/user/userAction";
import {log10} from "chart.js/helpers";
import {useHistory} from "react-router-dom";
import DeleteOutlined from "@ant-design/icons/es/icons/DeleteOutlined";
import {activeUserStart, deleteUserStart} from "../../redux_saga/action/user/delete/deleteUserAction";
import {getMarketStart} from "../../redux_saga/action/market/marketAction";
import {getRoleStart} from "../../redux_saga/action/role/roleAction";
import {modalFalse, modalTrue} from "../../redux_saga/action/modal/modalAction";
import {postMarketStart} from "../../redux_saga/action/market/post/postMarketAction";
import {postUserStart, postUserSuccessFalse} from "../../redux_saga/action/user/post/postUserAction";
import EditFilled from "@ant-design/icons/es/icons/EditFilled";
import {Base64} from "js-base64";

const {Option} = Select;


function formatNumber(value) {
    // debugger
    value += '';
    const list = value.split('.');
    const prefix = list[0].charAt(0) === '-' ? '-' : '';
    let num = prefix ? list[0].slice(1) : list[0];
    let result = '';
    while (num.length > 3) {
        result = `,${num.slice(-3)}${result}`;
        num = num.slice(0, num.length - 3);
    }
    if (num) {
        result = num + result;
    }
    return `${prefix}${result}${list[1] ? `.${list[1]}` : ''}`;
}

export const titleTooltip = (value) => value ? (
    <span className="numeric-input-title">{value !== '-' ? formatNumber(value) : '-'}</span>
) : (
    '0.00'
);

export const valueInput = (value) => {
    // debugger
    const list = `${value}`.split('.');
    return `${list[1] >= 0 ? `${list[0]}`.replace(/\B(?=(\d{3})+(?!\d))/g, ' ') + `.${list[1]}` : `${list[0]}`.replace(/\B(?=(\d{3})+(?!\d))/g, ' ')}`
};

export const onChangeInput = (val) => {
    let value = val.replace(/\$\s?|( *)/g, '');
    const reg = /^-?\d*(\d*)?$/;
    // console.log(value);
    // console.log(!isNaN(value), "isNaN");
    // console.log(reg.test(value), "test");

    if ((!isNaN(value) && reg.test(value.replace(/\$\s?|( *)/g, ''))) || value === '') {
        return value
    }
};

const User = () => {

    const dispatch = useDispatch();
    const history = useHistory();


    const data = useSelector(state => state.user.data);
    const visible = useSelector(state => state.modal.visible);
    const a = useSelector(state => state.role.data);
    const status = useSelector(state => state.user.status);
    const deleteStatus = useSelector(state => state.deleteUser.message);
    const postStatus = useSelector(state => state.postUser.message);
    const deleteStatus2 = useSelector(state => state.deleteUser.message2);
    const loading = useSelector(state => state.user.loading);
    const deleteLoading = useSelector(state => state.deleteUser.loading);
    const postLoading = useSelector(state => state.postUser.loading);
    const success = useSelector(state => state.postUser.success);
    const deleteLoading2 = useSelector(state => state.deleteUser.loading2);

    const [username, setUsername] = useState('');
    const [usernameE, setUsernameE] = useState('');
    const [id, setId] = useState(0);
    const [us, setUs] = useState(false);
    const [password, setPassword] = useState('');
    const [sum, setSum] = useState('');
    const [passwordE, setPasswordE] = useState('');
    const [roleId, setRoleId] = useState([]);

console.log(sum,'sghjutcvnbtdcvbjcbvnj')
    useEffect(() => {
        dispatch(getRoleStart())
    }, []);

    useEffect(() => {
        dispatch(getUserStart())
    }, []);

    const openNotificationWithIcon = (type) => {
        notification[type]({
            message: `${status}`,
            description: '',
        });
    };


    const openNotificationWithIcon2 = (type) => {
        notification[type]({
            message: `${postStatus.code ? postStatus.message : postStatus.message}`,
            description: '',
        });
    };

    useEffect(() => {
        if (status === "Network Error") {
            openNotificationWithIcon('error')
        }
    }, [status]);

    useEffect(() => {
        if (deleteStatus.code === 0) {
            dispatch(getUserStart())
        }
    }, [deleteStatus]);

    useEffect(() => {
        // debugger
        if (postStatus.code === 0) {
            handleCancel();
            dispatch(getUserStart())
        }
        if (postStatus.code === 105) {
            openNotificationWithIcon2('info')
            // dispatch(postUserSuccessFalse())
        }
    }, [postStatus]);

    useEffect(() => {
        if (deleteStatus2.code === 0) {
            dispatch(getUserStart())
        }
    }, [deleteStatus2]);

    const role = (role) => {
        return role === "ROLE_SUPER_ADMIN" ? "СУПЕР АДМИН" : role === "ROLE_ADMIN" ? "АДМИН" : role === "ROLE_USER" ? "ПОЛЬЗОВАТЕЛЬ" : ""
    };

    const activeTrue = (id) => {
        dispatch(activeUserStart(id))
    };
    const activeFalse = (dataIndex) => {
        let val = {active: false};
        dispatch(activeUserStart(val))
    };


    const delUsers = (id) => {
        dispatch(deleteUserStart(false,0,id))
    };

    const showModal = () => {
        dispatch(modalTrue())
    };


    const handleCancel = () => {
        setPassword('');
        setUsername('');
        setRoleId([]);
        dispatch(modalFalse())
    };

    const layout2 = {
        labelCol: {span: 8},
        wrapperCol: {span: 16},
    };

    const onFinish = () => {

        let val;
        if (id > 0) {
            val = {id: id, username: username, password: password, rolesId: [roleId]};
        } else {
            val = {username: username, password: password, rolesId: [roleId]};
        }
        dispatch(postUserStart(val))
    };

    const editProduct = (data) => {
        // let role = []
        // data.roles.map(iu =>
        //     role.push(iu.id)
        // );
        setId(data.id);
        setRoleId(data.roles[0].id);
        setUsername(data.username);
        setPassword(data.password)
        dispatch(modalTrue())
    }

    const Demo =
        <Form {...layout2} name="control-hooks" onFinish={onFinish}>

            <div className="ant-row ant-form-item" style={{rowGap: "0px"}}>
                <div className="ant-col ant-form-item-label d-media-none">
                    <label htmlFor="">Логин</label>
                </div>
                <Input placeholder="Имя пользователя" value={username}
                       onChange={(e) => setUsername(e.target.value)} required/>
            </div>

            <div className="ant-row ant-form-item" style={{rowGap: "0px"}}>
                <div className="ant-col  ant-form-item-label d-media-none">
                    <label htmlFor="">Пароль</label>
                </div>
                <Input.Password placeholder="Пароль" value={password}
                                onChange={(e) => setPassword(e.target.value)} required/>
            </div>

            <div className="ant-row ant-form-item" style={{rowGap: "0px"}}>
                <div className="ant-col  ant-form-item-label d-media-none">
                    <label htmlFor="">Роль</label>
                </div>
                <Select
                    // allowClear={true}
                    showSearch
                    placeholder="Роль"
                    onChange={(e) =>setRoleId(e)}
                    value={roleId ? roleId : ''}
                    optionFilterProp="children"
                >
                    {a ? a.map(item =>
                        <Option key={item.id} value={item.id}>{item.name}</Option>
                    ) : ''}
                </Select>
            </div>

            <div className="ant-row" style={{rowGap: "0px"}}>
                <div className="  ant-form-item-control">
                    <Space className={"modal-res"}>
                        <Button htmlType='button' onClick={handleCancel}>
                            Отмена
                        </Button>
                        <Button type="primary" htmlType="submit"
                                loading={postLoading}
                                disabled={roleId.length === 0}
                        >
                            Подтверждение
                        </Button>
                    </Space>
                </div>
            </div>

        </Form>;

    const setapp = (val, set) => {
        let value = onChangeInput(val);
        if (value || value === '') {
            set(value);
        }
    };

    const Tables = () => {
        const [searchText, setSearchText] = useState('');
        const [searchedColumn, setSearchedColumn] = useState('');

        const getColumnSearchProps = dataIndex => ({
            filterDropdown: ({setSelectedKeys, selectedKeys, confirm, clearFilters}) => (
                <div style={{padding: 8}}>
                    <Input
                        placeholder={`Search ${dataIndex}`}
                        value={selectedKeys[0]}
                        onChange={e => setSelectedKeys(e.target.value ? [e.target.value] : [])}
                        onPressEnter={() => handleSearch(selectedKeys, confirm, dataIndex)}
                        style={{width: 188, marginBottom: 8, display: 'block'}}
                    />
                    <Space>
                        <Button
                            type="primary"
                            onClick={() => handleSearch(selectedKeys, confirm, dataIndex)}
                            icon={<SearchOutlined/>}
                            size="small"
                            style={{width: 90}}
                        >
                            Search
                        </Button>
                        <Button onClick={() => handleReset(clearFilters)} size="small" style={{width: 90}}>
                            Reset
                        </Button>

                    </Space>
                </div>
            ),
            filterIcon: filtered => <SearchOutlined style={{color: filtered ? '#1890ff' : undefined}}/>,
            onFilter: (value, record) =>
                record[dataIndex]
                    ? record[dataIndex].toString().toLowerCase().includes(value.toLowerCase())
                    : '',
            render: text =>
                setSearchedColumn === dataIndex ? (
                    <Highlighter
                        highlightStyle={{backgroundColor: '#ffc069', padding: 0}}
                        searchWords={[searchText]}
                        autoEscape
                        textToHighlight={text ? text.toString() : ''}
                    />
                ) : (
                    text
                ),
        });

        const columns = [
            {
                title: "№",
                render: (text, record, index) => (
                    <>{index + 1}</>
                )
            },
            {
                title: 'Имя пользователя',
                dataIndex: 'username',
                key: 'username',
                ...getColumnSearchProps('username'),
            },
            {
                title: "Должность",
                key: 'roles',
                width: 300,
                render: (dataIndex) => (
                    <span>{dataIndex.roles.map(i =>
                        <>{role(i.authority)}<br/></>
                    )}</span>
                ),
                // dataIndex: 'roles',
            },
            {
                title: 'Действие',
                key: 'action',
                render: (dataIndex) => (
                    <>
                            <Space size="middle">
                                <Popconfirm
                                    title={dataIndex.active ? "Ты уверен" : "Ты уверен"}
                                    okText="Да" onConfirm={() => delUsers(dataIndex.id)}
                                    cancelText="Нет ">
                                    <div style={{color: "blue"}}><DeleteOutlined/></div>
                                </Popconfirm>
                                <div style={{color: 'blue'}} onClick={() => editProduct(dataIndex)} type={"primary"}>
                                    <EditFilled/></div>
                                <Popconfirm title="Уверены ли вы?" okText="Активный" onCancel='Отмена'
                                            onConfirm={() => activeTrue(dataIndex.id)}>
                                    <Button
                                        className={`${dataIndex.active ? "activ" : "block"}`}>{dataIndex.active ? "Активный" : "Блокировный"}</Button>
                                </Popconfirm>
                            </Space>
                    </>
                ),
            },

        ];

        const handleSearch = (selectedKeys, confirm, dataIndex) => {
            confirm();
            setSearchText(selectedKeys[0]);
            setSearchedColumn(dataIndex);
        };

        const handleReset = clearFilters => {
            clearFilters();
            setSearchText('')
        };

        return (
            <>
                <Table columns={columns}
                       loading={loading || deleteLoading || deleteLoading2} pagination={false} dataSource={data}
                       onRow={(data) => {
                           return {
                               onClick: event => {
                               }, // click row
                               onDoubleClick: event => {editProduct(data)
                               }, // double click row
                               onContextMenu: event => {
                               }, // right button click row
                               onMouseEnter: event => {
                               }, // mouse enter row
                               onMouseLeave: event => {
                               }, // mouse leave row
                           };
                       }}
                />
                {/*<Pagination style={{marginTop: 15}} defaultCurrent={pagination} onChange={(page) => active(page)}*/}
                {/*            total={(Math.floor(pageCount/20) + 1)*10} showSizeChanger={false} responsive={true}/>*/}
            </>
        );
    };

    return (
        <div>
            <h1>Пользователь</h1>
            <Button type="primary" onClick={showModal}>+ Добавить</Button>
            <Modal title={"Добавить Пользователь"} visible={visible} onCancel={handleCancel}
                   footer={null}>
                {Demo}
            </Modal>
            {/*<Tooltip*/}
            {/*    trigger={['focus']}*/}
            {/*    title={titleTooltip(sum)}*/}
            {/*    placement="top"*/}
            {/*    color={"blue"}*/}
            {/*    overlayClassName="numeric-input"*/}
            {/*>*/}
            {/*    <div className="ant-col ant-col-19 ant-form-item-control">*/}
            {/*        <Input value={valueInput(sum)}*/}
            {/*               onChange={(e) => setapp(e.target.value, setSum)}*/}
            {/*               required/></div>*/}
            {/*</Tooltip>*/}
            <Tables/>

        </div>
    );
};

export default User;