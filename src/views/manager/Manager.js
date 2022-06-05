import React, {useEffect, useState} from 'react';
import {
    Button, Col,
    DatePicker,
    Form,
    Input,
    Modal,
    notification,
    Popconfirm,
    Row,
    Select,
    Space,
    Table,
    Tooltip, Typography
} from "antd";
import SearchOutlined from "@ant-design/icons/es/icons/SearchOutlined";
import Highlighter from "react-highlight-words";
import {onChangeInput, titleTooltip, valueInput} from "../user/User";
import EditFilled from "@ant-design/icons/es/icons/EditFilled";
import DeleteOutlined from "@ant-design/icons/es/icons/DeleteOutlined";
import {useDispatch, useSelector} from "react-redux";
import {getManagerError, getManagerStart} from "../../redux_saga/action/manager/managerAction";
import moment from "moment";
import {getReportStart} from "../../redux_saga/action/report/reportAction";
import {modalFalse, modalTrue} from "../../redux_saga/action/modal/modalAction";
import {postUserStart} from "../../redux_saga/action/user/post/postUserAction";
import {postManager} from "../../redux_saga/saga/manager/post/postManagerSaga";
import {postManagerStart} from "../../redux_saga/action/manager/post/postManagerAction";
import {deleteMarketStart} from "../../redux_saga/action/market/delete/deleteMarketAction";
import {deleteManagerStart} from "../../redux_saga/action/manager/delete/deleteManagerAction";
import {getTypeStart} from "../../redux_saga/action/TYPE/typeAction";
import {getCategoryStart} from "../../redux_saga/action/category/categoryAction";
import {postCategoryStart} from "../../redux_saga/action/category/post/postCategoryAction";
import {getMarketStart} from "../../redux_saga/action/market/marketAction";
import {getUserStart} from "../../redux_saga/action/user/userAction";

const dateFormat = 'YYYY-MM-DD';

const {Text} = Typography;

const {Option} = Select;

const Manager = () => {

    const dispatch = useDispatch();

    const [submit, setSubmit] = useState(false);
    const [modal, setModal] = useState(false);
    const [from, setFrom] = useState('');
    const [to, setTo] = useState('');
    const [firstname, setFirstname] = useState('');
    const [typeId, setTypeId] = useState(0);
    const [categoryId, setCategoryId] = useState(0);
    const [marketId, setMarketId] = useState(0);
    const [summa, setSumma] = useState('');
    const [id, setId] = useState(0);
    const [name, setName] = useState('');
    const [description, setDescription] = useState('');

    const data = useSelector(state => state.manager.data)
    const rasxod = useSelector(state => state.manager.rasxod)
    const prixod = useSelector(state => state.manager.prixod)
    const type1 = useSelector(state => state.type.data)
    const MarketData = useSelector(state => state.market.data);
    const category = useSelector(state => state.category.data)
    const postStatusC = useSelector(state => state.postCategory.message)
    const postLoadingC = useSelector(state => state.postCategory.loading)
    const total = useSelector(state => state.manager.total)
    const loading = useSelector(state => state.manager.loading)
    const postLoading = useSelector(state => state.postManager.loading)
    const deleteLoading = useSelector(state => state.deleteManager.loading)
    const deleteStatus = useSelector(state => state.deleteManager.message)
    const postStatus = useSelector(state => state.postManager.message)
    // const deleteLoading = useSelector(state => state.deleteManager.loading)
    // const deleteStatus = useSelector(state => state.deleteManager.message)
    const visible = useSelector(state => state.modal.visible);

    console.log(postStatusC, 'wwwwwwwwwwwwwwwwwwwwwww')

    useEffect(() => {
        dispatch(getManagerStart())
    }, []);

    useEffect(() => {
        dispatch(getMarketStart())
    }, []);

    useEffect(() => {
        dispatch(getTypeStart())
    },[]);
    useEffect(() => {
        dispatch(getCategoryStart())
    },[]);

    useEffect(() => {
        if (postStatus.code === 0) {
            handleCancel()
            dispatch(getManagerStart())
        }
    }, [postStatus]);

    const showModal = () => {
        dispatch(modalTrue())
    };
    const showModal2 = () => {
        setModal(true)
        dispatch(modalTrue())
    };

    const openNotificationWithIcon2 = (type) => {
        notification[type]({
            message: `${postStatusC.code ? postStatusC.message : postStatusC.message}`,
            description: '',
        });
    };



    useEffect(() => {
        if(postStatusC.code === 0){
            handleCancel()
            dispatch(getManagerStart())
        }if(postStatusC.code === 1){
            openNotificationWithIcon2('info')
        }
    },[postStatusC]);

    useEffect(() => {
        if (deleteStatus.code === 0) {
            dispatch(getManagerStart())
        }
    }, [deleteStatus]);

    const handleCancel = () => {
        setId(0);
        // setDate2('');
        setSumma('');
        setFirstname('');
        setTypeId(0);
        setModal(false);
        setName('')
        setDescription('')
        dispatch(modalFalse())
    };


    const layout2 = {
        labelCol: {span: 8},
        wrapperCol: {span: 16},
    };
    const layout = {
        labelCol: {span: 8},
        wrapperCol: {span: 16},
    };

    const setapp = (val, set) => {
        let value = onChangeInput(val);
        if (value || value === '') {
            set(value);
        }
    };

    const onFinish = () => {
        let val;
        if (id > 0) {
            if(typeId === 1) {
                val = {
                    id: id,
                    firstname: firstname,
                    typeId: typeId,
                    marketId: marketId,
                    summa: parseInt(summa),
                    description: description
                    // date: date2
                };
            }else {
                val = {
                    id: id,
                    firstname: firstname,
                    typeId: typeId,
                    categoryId: categoryId,
                    summa: parseInt(summa),
                    description: description
                    // date: date2
                };
            }
        } else {
            if(typeId === 1){
                val = {
                    firstname: firstname,
                    typeId: typeId,
                    marketId: marketId,
                    summa: parseInt(summa),
                    description: description
                    // date: date2
                };
            }else {
                val = {
                    firstname: firstname,
                    typeId: typeId,
                    categoryId: categoryId,
                    summa: parseInt(summa),
                    description: description
                    // date: date2
                };
            }
        }
        console.log(val, 'vallllllllll')
        dispatch(postManagerStart(false,val))
    };

    const onFinish2 = () => {
        let val = {
            name
        }
        console.log(name, 'eeeeeeee')
        dispatch(postCategoryStart(val))
    }


    const editProduct = (data) => {
        console.log(data)
        setId(data.id)
        setTypeId(data.type_id);
        setFirstname(data.firstname);
        setMarketId(0)
        console.log(data.categoryId, 'wertrewrw')
        setSumma(data.summa);
        setCategoryId(0)
        setDescription(data.description)
        // setDate2(data.date ? data.date.substring(0, 10) : '')
        dispatch(modalTrue())
    };

    const delM = (id) => {
        dispatch(deleteManagerStart(id))
    };

    console.log(typeId,'ertyuiiuyt')

    const Demo =
        <Form {...layout2} name="control-hooks" onFinish={onFinish}>

            <div className="ant-row ant-form-item" style={{rowGap: "0px"}}>
                <div className="ant-col ant-form-item-label ">
                    <label htmlFor="">Имя</label>
                </div>
                <Input placeholder="Имя " value={firstname}
                       onChange={(e) => setFirstname(e.target.value)} required/>
            </div>

            <div className="ant-row ant-form-item" style={{rowGap: "0px"}}>
                <div className="ant-col  ant-form-item-label ">
                    <label htmlFor="">Тип</label>
                </div>
                <Select
                    allowClear={true}
                    showSearch
                    placeholder="Тип"
                    onChange={(e) => setTypeId(parseInt(e ? e : 0))}
                    value={typeId ? typeId : ''}
                    optionFilterProp="children"
                >
                    {type1 ? type1.map(item =>
                        <Option key={item.id} value={item.id}>{item.type}</Option>
                    ) : ''}
                </Select>
            </div>

            {typeId === 1 ?
                <div className="ant-row ant-form-item" style={{rowGap: "0px"}}>
                    <div className="ant-col  ant-form-item-label">
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
                    {
                    MarketData ? MarketData.map(item =>
                        <Option key={item.id} value={item.id}>{item.name}</Option>
                    ) : '' }
                </Select>
            </div>
            : typeId === 2 ?
                <div className="ant-row ant-form-item" style={{rowGap: "0px"}}>
                    <div className="ant-col  ant-form-item-label ">
                        <label htmlFor="">Категория</label>
                    </div>
                    <Select
                        allowClear={true}
                        showSearch
                        placeholder="Категория"
                        onChange={(e) => setCategoryId(parseInt(e ? e : 0))}
                        value={categoryId ? categoryId : ''}
                        optionFilterProp="children"
                    >
                        {
                            category ? category.map(item =>
                                <Option key={item.id} value={item.id}>{item.name}</Option>
                            ) : ''
                        }
                    </Select>
                </div> : ''
            }

            <div className="ant-row ant-form-item" style={{rowGap: "0px"}}>
                <div className="ant-col ant-form-item-label ">
                    <label htmlFor="">Сумма</label>
                </div>
                <Tooltip
                    trigger={['focus']}
                    title={titleTooltip(summa)}
                    placement="top"
                    color={"blue"}
                    overlayClassName="numeric-input"
                >
                    <Input value={valueInput(summa)}
                           onChange={(e) => setapp(e.target.value, setSumma)}
                           required placeholder="Сумма"
                    />
                </Tooltip>
            </div>


            <div className="ant-row ant-form-item" style={{rowGap: "0px"}}>
                <div className="ant-col ant-form-item-label ">
                    <label htmlFor="">Описание</label>
                </div>
                <Input placeholder="Описание " value={description}
                       onChange={(e) => setDescription(e.target.value)} required/>
            </div>

            <div className="ant-row" style={{rowGap: "0px"}}>
                <div className="  ant-form-item-control">
                    <Space className={"modal-res"}>
                        <Button htmlType='button' onClick={handleCancel}>
                            Отмена
                        </Button>
                        <Button type="primary" htmlType="submit"
                                loading={postLoading}
                                disabled={typeId === 1 ? marketId === 0 : categoryId === 0}
                        >
                            Подтверждение
                        </Button>
                    </Space>
                </div>
            </div>

        </Form>;
    const Demo2 =
        <Form {...layout} name="control-hooks" onFinish={onFinish2}>

            <div className="ant-row ant-form-item" style={{rowGap: "0px"}}>
                <div className="ant-col ant-form-item-label ">
                    <label htmlFor="">Категория имя</label>
                </div>
                <Input placeholder="Категория имя" value={name} name='name'
                       onChange={(e) => setName(e.target.value)} required/>
            </div>

            <div className="ant-row" style={{rowGap: "0px"}}>
                <div className="  ant-form-item-control">
                    <Space className={"modal-res"}>
                        <Button htmlType='button' onClick={handleCancel}>
                            Отмена
                        </Button>
                        <Button type="primary" htmlType="submit"
                                loading={postLoadingC}
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
                dataIndex: 'firstname',
                key: 'firstname',
                ...getColumnSearchProps('firstname'),
            },
            {
                title: 'Сумма',
                key: 'summa',
                width: 125,
                render: (dataIndex) => (
                    <>{valueInput(dataIndex.summa)}</>
                ),
            },
            {
                title: 'Маркет / Категория',
                dataIndex: 'categoryOrMarket',
                key: 'categoryOrMarket',
                // ...getColumnSearchProps('type'),
            },
            {
                title: 'Введите имя',
                dataIndex: 'type_name',
                key: 'type_name',
                // ...getColumnSearchProps('type'),
            },
            {
                title: 'Описание',
                dataIndex: 'description',
                key: 'description',
                // ...getColumnSearchProps('type'),
            },
            {
                title: 'Дата',
                key: 'date',
                width: 200,
                render: (dataIndex) => (
                    <>{dataIndex.date ? dataIndex.date.substring(0, 10) + " " + dataIndex.date.substring(11, 16) : ''}</>)
            },
            {
                title: 'Действие',
                key: 'action',
                render: (dataIndex) => (
                    <>
                        <Space size="middle">
                            <Popconfirm
                                title={dataIndex.active ? "Ты уверен" : "Ты уверен"}
                                okText="Да" onConfirm={() => delM(dataIndex.id)}
                                cancelText="Нет ">
                                <div style={{color: "blue"}}><DeleteOutlined/></div>
                            </Popconfirm>
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
                <Table columns={columns}
                       loading={loading || deleteLoading } pagination={false} dataSource={data}
                       onRow={(data) => {
                           return {
                               onClick: event => {
                               }, // click row
                               onDoubleClick: event => {
                                   editProduct(data)
                               }, // double click row
                               onContextMenu: event => {
                               }, // right button click row
                               onMouseEnter: event => {
                               }, // mouse enter row
                               onMouseLeave: event => {
                               }, // mouse leave row
                           };
                       }}
                       summary={() => {
                           return (
                               <>
                                   <Table.Summary.Row style={{background: "darkBlue", color: 'white'}}>
                                       <Table.Summary.Cell
                                           colSpan={2}>Общая суммы(приход-расходы)</Table.Summary.Cell>
                                       <Table.Summary.Cell>
                                           <Text style={{color: "white"}}>{total === null ? 0 : valueInput(total)}</Text>
                                       </Table.Summary.Cell>
                                       <Table.Summary.Cell><Text></Text></Table.Summary.Cell>
                                       <Table.Summary.Cell><Text></Text></Table.Summary.Cell>
                                       <Table.Summary.Cell><Text></Text></Table.Summary.Cell>
                                       <Table.Summary.Cell><Text></Text></Table.Summary.Cell>
                                       <Table.Summary.Cell><Text></Text></Table.Summary.Cell>
                                   </Table.Summary.Row>
                               </>
                           );
                       }}/>
                {/*<Pagination style={{marginTop: 15}} defaultCurrent={pagination} onChange={(page) => active(page)}*/}
                {/*            total={(Math.floor(pageCount/20) + 1)*10} showSizeChanger={false} responsive={true}/>*/}
            </>
        );
    };

    const onSubmit = () => {
        setSubmit(true);
        if (from.length !== 0
            && to.length !== 0
        ) {
            let val = {
                from: from,
                to: to,
            };
            // console.log(val);
            dispatch(getManagerStart(true, val))
        }
    };
    const reset = () => {
        setSubmit(false);
        setFrom('');
        setTo('');
        dispatch(getManagerStart(false))
    };


    return (
        <div>
            <h1>Менежер</h1>
            <Button type="primary" onClick={showModal}>+ Добавить</Button>
            <Button style={{marginLeft: '10px'}} type="primary" onClick={showModal2}>+ Категория</Button>
            <Modal title={modal ? "Добавить категория" : id > 0 ? 'Изменить ' : "Добавить "} visible={visible} onCancel={handleCancel}
                   footer={null}>
                {modal ? Demo2 : Demo}
            </Modal>
            <div>
                <div style={{margin: "10px 0 10px 0"}}>
                    <span style={{fontWeight: "bold"}}>Общая расходы: <span style={{fontWeight: "normal"}}> {valueInput(parseFloat(rasxod).toFixed(3))}</span></span>
                    <br/>
                </div>
                <div style={{margin: "10px 0 10px 0"}}>
                    <span style={{fontWeight: "bold"}}>Общая приход: <span style={{fontWeight: "normal"}}>{valueInput(parseFloat(prixod).toFixed(3))}</span> </span>
                    <br/>
                </div>
            </div>
            <Form
                name="time_related_controls"
                onFinish={onSubmit}
            >
                <Row gutter={[24, 0]} id='pp'>
                    <div
                        className={`ant-row ant-form-item ${from.length === 0 && submit ? 'ant-form-item-has-error' : ''}`}
                        style={{rowGap: "0px", marginLeft: '10px'}}>
                        <div className="ant-col ant-col-16 ant-form-item-control">
                            <label
                                htmlFor=""> Дата от</label>
                            <DatePicker
                                value={from.length !== 0 ? moment(from, dateFormat) : undefined}
                                format={dateFormat}
                                onChange={(date, dateString) => setFrom(dateString)}/>
                        </div>
                    </div>
                    <div
                        className={`ant-row ant-form-item ${to.length === 0 && submit ? 'ant-form-item-has-error' : ''}`}
                        style={{rowGap: "0px", marginLeft: '10px'}}>
                        <div className="ant-col ant-col-16 ant-form-item-control">
                            <label
                                htmlFor=""> Дата до</label>
                            <DatePicker
                                value={to.length !== 0 ? moment(to, dateFormat) : undefined}
                                format={dateFormat}
                                onChange={(date, dateString) => setTo(dateString)}/>
                        </div>
                    </div>
                    <Space style={{marginLeft: '10px'}}>
                        <Button className="green " htmlType={"button"}
                                disabled={!submit}
                                onClick={reset}>Очистить</Button>
                        <Button className="green po"
                                htmlType={"submit"}
                        >Поиск</Button>
                    </Space>
                </Row>

            </Form>
            <Tables/>
        </div>
    );
};

export default Manager;