import React, {useEffect, useState} from 'react';
import {Button, Form, Input, Modal, notification, Popconfirm, Select, Space, Table} from "antd";
import Highlighter from "react-highlight-words";
import SearchOutlined from "@ant-design/icons/es/icons/SearchOutlined";
import {useDispatch, useSelector} from "react-redux";
import {getMarketStart} from "../../redux_saga/action/market/marketAction";
import {modalFalse, modalTrue} from "../../redux_saga/action/modal/modalAction";
import {postMarketStart} from "../../redux_saga/action/market/post/postMarketAction";
import EditFilled from "@ant-design/icons/es/icons/EditFilled";
import {postConnectStart} from "../../redux_saga/action/market/connect/connectAction";
import {getUserStart} from "../../redux_saga/action/user/userAction";
import DeleteOutlined from "@ant-design/icons/es/icons/DeleteOutlined";
import {deleteMarketStart} from "../../redux_saga/action/market/delete/deleteMarketAction";
import {user} from "../../api/config";
import {Base64} from "js-base64";
import UserSwitchOutlined from "@ant-design/icons/es/icons/UserSwitchOutlined";

    const {Option} = Select;

const Warehouse = () => {

    const dispatch = useDispatch();

    const [isModalVisible, setIsModalVisible] = useState(false);
    const [co, setCon] = useState(false);
    const [id, setId] = useState('');
    const [name, setName] = useState('');
    const [address, setAddress] = useState('');
    const [userId, setUserId] = useState(0);
    const [marketId, setMarketId] = useState(0);


    const data = useSelector(state => state.market.data);
    const userData = useSelector(state => state.user.data);
    const status = useSelector(state => state.market.message);
    const visible = useSelector(state => state.modal.visible);
    const loading = useSelector(state => state.market.loading);
    const postLoading = useSelector(state => state.postMarket.loading);
    const conLoading = useSelector(state => state.postConnect.loading);
    const deleteLoading = useSelector(state => state.deleteMarket.loading);
    const deleteStatus = useSelector(state => state.deleteMarket.message);
    const conStatus = useSelector(state => state.postConnect.message);
    const postStatus = useSelector(state => state.postMarket.message);

    useEffect(() => {
        dispatch(getMarketStart())
    }, []);

    useEffect(() => {
        dispatch(getUserStart())
    }, []);


    const layout2 = {
        labelCol: {span: 8},
        wrapperCol: {span: 16},
    };


    const openNotificationWithIcon2 = (type) => {
        notification[type]({
            message: `${postStatus.code ? postStatus.message : postStatus.message}`,
            description: '',
        });
    };
    const openNotificationWithIcon3 = (type) => {
        notification[type]({
            message: `${deleteStatus.code ? deleteStatus.message : deleteStatus.message}`,
            description: '',
        });
    };

    const openNotificationWithIcon = (type) => {
        notification[type]({
            message: `${status}`,
            description: '',
        });
    };

    useEffect(() => {
        if (status === "Network Error") {
            openNotificationWithIcon('error')
        }
    }, [status]);

    useEffect(() => {
        if (postStatus.code === 0) {
            handleCancel();
            dispatch(getMarketStart())
        }
        if (postStatus.code === 1) {
            openNotificationWithIcon2('info')
        }
        if (postStatus.code === 2) {
            openNotificationWithIcon2('info')
        }
    }, [postStatus]);

    useEffect(() => {
        if (conStatus.code === 0) {
            handleCancel();
            dispatch(getMarketStart())
        }
    }, [conStatus]);

    useEffect(() => {
        if (deleteStatus.code === 0) {
            dispatch(getMarketStart())
        }
        if (deleteStatus.code === 115) {
            openNotificationWithIcon3('info')
        }
    }, [deleteStatus]);

    const [role, setRole] = useState(Base64.decode(localStorage.getItem("ROLE")));


    const showModal = () => {
        dispatch(modalTrue())
    };
    const showModal2 = () => {
        setCon(true);
        dispatch(modalTrue())
    };

    const onFinish = () => {
        let val;
        if (id > 0) {
            val = {id: id, name: name, address: address};
        } else {
            val = {name: name, address: address};
        }
        dispatch(postMarketStart(val))
    };

    const onFinish2 = () => {
        dispatch(postConnectStart(userId, marketId))
    };

    const handleCancel = () => {
        setId(0);
        setName('');
        setAddress('');
        setCon(false);
        setMarketId(0);
        setUserId(0);
        dispatch(modalFalse())
    };

    const editProduct = (data) => {
        setId(data.id);
        setName(data.name);
        setAddress(data.address);
        dispatch(modalTrue())
    };



    const Demo =
        <Form {...layout2} name="control-hooks" onFinish={onFinish}>

            <div className="ant-row ant-form-item" style={{rowGap: "0px"}}>
                <div className="ant-col ant-form-item-label d-media-none">
                    <label htmlFor="">Маркеть</label>
                </div>
                <Input placeholder="Имя пользователя" value={name} name="name"
                       onChange={(e) => setName(e.target.value)} required/>
            </div>

            <div className="ant-row ant-form-item" style={{rowGap: "0px"}}>
                <div className="ant-col  ant-form-item-label d-media-none">
                    <label htmlFor="">Address</label>
                </div>
                <Input placeholder="Имя пользователя" value={address} name="name"
                       onChange={(e) => setAddress(e.target.value)} required/>
            </div>

            <div className="ant-row" style={{rowGap: "0px"}}>
                <div className="  ant-form-item-control">
                    <Space className={"modal-res"}>
                        <Button htmlType='button' onClick={handleCancel}>
                            Отмена
                        </Button>
                        <Button type="primary" htmlType="submit"
                                loading={postLoading}
                        >
                            Подтверждение
                        </Button>
                    </Space>
                </div>
            </div>

        </Form>;
    const DemoCo =
        <Form {...layout2} name="control-hooks" onFinish={onFinish2}>

            <div className="ant-row ant-form-item" style={{rowGap: "0px"}}>
                <div className="ant-col  ant-form-item-label d-media-none">
                    <label htmlFor="">Пользователь</label>
                </div>
                <Select
                    allowClear={true}
                    showSearch
                    placeholder="Пользователь"
                    onChange={(e) => setUserId(parseInt(e ? e : 0))}
                    value={userId ? userId : ''}
                    optionFilterProp="children"
                >
                    {userData ? userData.map(item =>
                        <Option key={item.id} value={item.id}>{item.username}</Option>
                    ) : ''}
                </Select>
            </div>
            <div className="ant-row ant-form-item" style={{rowGap: "0px"}}>
                <div className="ant-col  ant-form-item-label d-media-none">
                    <label htmlFor="">Маркет</label>
                </div>
                <Select
                    allowClear={true}
                    showSearch
                    placeholder="Маркет"
                    onChange={(e) => setMarketId(parseInt(e ? e : 0))}
                    value={marketId ? marketId : ''}
                    optionFilterProp="children"
                >
                    {data ? data.map(item =>
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
                                loading={conLoading}
                                disabled={userId === 0 || marketId === 0 }
                        >
                            Подтверждение
                        </Button>
                    </Space>
                </div>
            </div>

        </Form>;

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
                title: 'Имя',
                dataIndex: 'name',
                key: 'name',
                ...getColumnSearchProps('name'),
            },
            {
                title: 'Адрес',
                dataIndex: 'address',
                key: 'address',
                ...getColumnSearchProps('address'),
            },
            {
                title: " Дата создания",
                key: 'created_date',
                ...getColumnSearchProps('created_date'),
                render: (dataIndex) => (
                    <>{dataIndex.created_date ? dataIndex.created_date.substring(0, 10) + " " + dataIndex.created_date.substring(11, 16) : ''}</>
                ),
            },
            {
                title: " Дата обновления",
                key: 'updated_date',
                ...getColumnSearchProps('updated_date'),
                render: (dataIndex) => (
                    <>{dataIndex.updated_date ? dataIndex.updated_date.substring(0, 10) + " " + dataIndex.updated_date.substring(11, 16) : ''}</>
                ),
            },
            {
                title: 'Действие',
                key: 'action',
                render: (dataIndex) => (
                    <>
                        <Space size="middle">
                        <div style={{color: 'blue'}} onClick={() => editProduct(dataIndex)} type={"primary"}>
                            <EditFilled/></div>
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
                <Table id='table' columns={columns}
                       loading={loading || deleteLoading} pagination={false} dataSource={data}
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
            <div >
                <h1>Маркет</h1>
                <div className='wwss'>
                    <Button type="primary" onClick={showModal}>+ Добавить</Button>
                </div>
                <div className='wws'>
                    <Button type="danger"  onClick={showModal2}><UserSwitchOutlined /></Button>
                </div>
            </div>
            <Modal title={id > 0 ? "Изменить маркет" : "Добавить маркет"} visible={visible} onCancel={handleCancel}
                   footer={null}>
                {co ? DemoCo : Demo}
            </Modal>
            <Tables/>
        </div>
    );
};

export default Warehouse;