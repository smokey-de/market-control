import React, {useEffect, useState} from 'react';
import {
    Button,
    Col,
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
import {getReportStart} from "../../redux_saga/action/report/reportAction";
import {useDispatch, useSelector} from "react-redux";
import moment from "moment";
import {modalFalse, modalTrue} from "../../redux_saga/action/modal/modalAction";
import {postReportStart} from "../../redux_saga/action/report/post/postReportAction";
import {getMarketStart} from "../../redux_saga/action/market/marketAction";
import {deleteMarketStart} from "../../redux_saga/action/market/delete/deleteMarketAction";
import DeleteOutlined from "@ant-design/icons/es/icons/DeleteOutlined";
import EditFilled from "@ant-design/icons/es/icons/EditFilled";
import {Base64} from "js-base64";
import {onChangeInput, titleTooltip, valueInput} from "../user/User";
import {deleteUserStart} from "../../redux_saga/action/user/delete/deleteUserAction";
import {getManagerStart} from "../../redux_saga/action/manager/managerAction";
import Loader from "../loading/Loader";
import LoadingOutlined from "@ant-design/icons/es/icons/LoadingOutlined";
import {postManagerStart} from "../../redux_saga/action/manager/post/postManagerAction";

const dateFormat = 'DD-MM-YYYY';

const {Option} = Select;

const {Text} = Typography;

const Report = () => {
    var d = new Date();
    d.setDate(d.getDate() - 175);

    var Today = new Date();
    var dd = Today.getDate();
    var mm = Today.getMonth() + 1; //January is 0!
    var yyyy = Today.getFullYear();
    if (dd < 10) {
        dd = '0' + dd
    }
    if (mm < 10) {
        mm = '0' + mm
    }
    Today = dd + '-' + mm + '-' + yyyy;

    const [date, setDate] = useState(Today);


    const dispatch = useDispatch();

    const visible = useSelector(state => state.modal.visible);
    const data = useSelector(state => state.report.data)
    const naqd_sum = useSelector(state => state.report.naqd_sum)
    const terminal_sum = useSelector(state => state.report.terminal_sum)
    const inkassatsiya2 = useSelector(state => state.report.inkassatsiya)
    const ras_firma_naqd_sum = useSelector(state => state.report.ras_firma_naqd_sum)
    const boshqa_rasxod_sum = useSelector(state => state.report.boshqa_rasxod_sum)
    const avans_naqd_sum = useSelector(state => state.report.avans_naqd_sum)
    const avans_tovar_sum = useSelector(state => state.report.avans_tovar_sum)
    const ostatok_dnya_sum = useSelector(state => state.report.ostatok_dnya_sum)
    const status = useSelector(state => state.report.message)
    const marketData = useSelector(state => state.market.data)
    const loading = useSelector(state => state.report.loading)
    const postLoading = useSelector(state => state.postReport.loading)
    const deleteLoading = useSelector(state => state.deleteMarket.loading);
    const deleteStatus = useSelector(state => state.deleteMarket.message);
    const postStatus = useSelector(state => state.postReport.message)

    const [role, setRole] = useState(Base64.decode(localStorage.getItem("ROLE")));


    const [name, setName] = useState('');
    const [surname, setSurname] = useState('');
    const [naqdSavdo, setNaqdSavdo] = useState('');
    const [terminalSavdo, setTerminalSavdo] = useState('');
    const [inkassatsiya, setInkassatsiya] = useState('');
    const [rasFirmaNaqd, setRasFirmaNaqd] = useState('');
    const [boshqaRasxodla, setBoshqaRasxodla] = useState('');
    const [avansNaqd, setAvansNaqd] = useState('');
    const [avansTovar, setAvansTovar] = useState('');
    const [ostatokDnya, setOstatokDnya] = useState('');
    const [de, setDe] = useState('');
    const [from, setFrom] = useState(null);
    const [to, setTo] = useState(null);
    const [marketId, setMarketId] = useState(0);
    const [w, setW] = useState('');
    const [id, setId] = useState(0);
    const [submit, setSubmit] = useState(false);
    const [confirm55, setConfirm55] = useState(false);
    const [confirm, setConfirm] = useState(null);
    const [confirm2, setConfirm2] = useState(null);


    const activeStatus = useSelector(state => state.deleteUser.message);
    const nimadurMessage = useSelector(state => state.postManager.message);
    const activeLoading = useSelector(state => state.deleteUser.loading);


    useEffect(() => {
        dispatch(getReportStart(false, {from: date}))
    }, []);

    useEffect(() => {
        dispatch(getMarketStart());
    }, [data]);

    const showModal = () => {
        dispatch(modalTrue())
    };

    const obwiy = () => {
        setConfirm2(!confirm2)
        setSubmit(true)
    };

    const nimadurla = () => {
        dispatch(postManagerStart(true))
    }

    useEffect(() => {
        if (deleteStatus.code === 0) {
            dispatch(getReportStart(false, {from: date}))
        }
    }, [deleteStatus]);

    useEffect(() => {

        if (nimadurMessage.code === 0) {
            dispatch(getReportStart(false, {from: date}))
        }
    }, [nimadurMessage]);
    const openNotificationWithIcon = (type) => {
        notification[type]({
            message: `${status}`,
            description: '',
        });
    };

    useEffect(() => {
        if (activeStatus.code === 0) {
            dispatch(getReportStart(false, {from: date}))
            setConfirm55(!confirm55)
        }if(activeStatus.code === 105){
            openNotificationWithIcon3('info')
        }
    }, [activeStatus]);

    const openNotificationWithIcon3 = (type) => {
        notification[type]({
            message: `${activeStatus.code ? activeStatus.message : activeStatus.message}`,
            description: '',
        });
    };
    const openNotificationWithIcon2 = (type) => {
        notification[type]({
            message: `${postStatus.code ? postStatus.message : postStatus.message}`,
            description: '',
        });
    };
    const openNotificationWithIcon4 = (type) => {
        notification[type]({
            message: `${status.code ? status.message : status.message}`,
            description: '',
        });
    };


    useEffect(() => {
        if (status === "Network Error") {
            openNotificationWithIcon('error')
        }
        if (status.code === 116) {
            openNotificationWithIcon4('info')
        }
        if (status.code === 7) {
            openNotificationWithIcon4('info')
        }
    }, [status]);

    useEffect(() => {
        if (postStatus.code === 0) {
            handleCancel();
            dispatch(getReportStart(false, {from: date}))
        }
        if (postStatus.code === 116) {
            openNotificationWithIcon2('info')
        }
    }, [postStatus]);

    const handleCancel = () => {
        setAvansTovar('');
        // setSurname('');
        setAvansNaqd('');
        setConfirm55(false)
        setDe('')
        setBoshqaRasxodla('');
        setRasFirmaNaqd('');
        setInkassatsiya('');
        setTerminalSavdo('');
        setNaqdSavdo('');
        setName('');
        setOstatokDnya(' ')
        dispatch(modalFalse())
    };
    const layout2 = {
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
        // debugger
        let val
        if (id > 0) {
            val = {
                id: id,
                name: name,
                // surname: surname,
                naqdSavdo: parseInt(naqdSavdo),
                terminalSavdo: parseInt(terminalSavdo),
                inkassatsiya: parseInt(inkassatsiya),
                rasFirmaNaqd: parseInt(rasFirmaNaqd),
                boshqaRasxodla: parseInt(boshqaRasxodla),
                avansNaqd: parseInt(avansNaqd),
                avansTovar: parseInt(avansTovar),
                description:de,
                ostatokDnya: parseInt(ostatokDnya),
                confirm: false
            }
        } else {
            val = {
                name: name,
                // surname: surname,
                naqdSavdo: parseInt(naqdSavdo),
                terminalSavdo: parseInt(terminalSavdo),
                inkassatsiya: parseInt(inkassatsiya),
                rasFirmaNaqd: parseInt(rasFirmaNaqd),
                boshqaRasxodla: parseInt(boshqaRasxodla),
                avansNaqd: parseInt(avansNaqd),
                avansTovar: parseInt(avansTovar),
                description:de,
                ostatokDnya: parseInt(ostatokDnya),
                confirm: false
            }
        }
        console.log(val,'hgfgfdsfgfeeeeeeeeeed')
        dispatch(postReportStart(val))
    };

    const delProduct = (id) => {
        dispatch(deleteMarketStart( id))
    }

    const editProduct = (data) => {
        console.log(data,' rrrr')
        setId(data.id);
        setName(data.name);
        setConfirm55(data.confirm)
        // setSurname(data.surname);
        setAvansNaqd(data.avans_naqd);
        setAvansTovar(data.avans_tovar);
        setDe(data.description)
        setBoshqaRasxodla(data.boshqa_rasxodla);
        setInkassatsiya(data.inkassatsiya);
        setNaqdSavdo(data.naqd_savdo);
        setOstatokDnya(data.ostatok_dnya);
        setRasFirmaNaqd(data.ras_firma_naqd);
        setTerminalSavdo(data.terminal_savdo);
        dispatch(modalTrue())
    };

    const onchangeFilterState = (value, set) => {
        if (value === "") {
            set(null);
        } else {
            set(value)
        }
    };

    const activeTrue = (rep) => {
        dispatch(deleteUserStart(true,rep,0))
    };

    const Demo =
        <Form {...layout2} name="control-hooks" onFinish={onFinish}>
            <div id='media'>
                <div className="ant-row ant-form-item" style={{rowGap: "0px"}}>
                    <div className="ant-col ant-form-item-label">
                        <label htmlFor="">Пользователь</label>
                    </div>
                    <Input placeholder="Пользователь" value={name} name="name"
                           onChange={(e) => setName(e.target.value)} required/>
                </div>
                {/*<div className="ant-row ant-form-item" style={{rowGap: "0px"}}>*/}
                {/*    <div className="ant-col ant-form-item-label ">*/}
                {/*        <label htmlFor="">Фамилия</label>*/}
                {/*    </div>*/}
                {/*    <Input placeholder="Фамилия" value={surname} name="name"*/}
                {/*           onChange={(e) => setSurname(e.target.value)} required/>*/}
                {/*</div>*/}
                    <div className="ant-row ant-form-item" style={{rowGap: "0px"}}>
                        <div className="ant-col ant-form-item-label ">
                            <label htmlFor="">Выручка Нал.</label>
                        </div>
                        <Tooltip
                            trigger={['focus']}
                            title={titleTooltip(naqdSavdo)}
                            placement="top"
                            color={"blue"}
                            overlayClassName="numeric-input"
                        >
                                <Input value={valueInput(naqdSavdo)}
                                       onChange={(e) => setapp(e.target.value, setNaqdSavdo)}
                                       required placeholder="Выручка Нал."
                                />
                        </Tooltip>
                    </div>
                <div className="ant-row ant-form-item" style={{rowGap: "0px"}}>
                    <div className="ant-col ant-form-item-label">
                        <label htmlFor="">Выручка Терминал</label>
                    </div>
                    <Tooltip
                        trigger={['focus']}
                        title={titleTooltip(terminalSavdo)}
                        placement="top"
                        color={"blue"}
                        overlayClassName="numeric-input"
                    >
                        <Input value={valueInput(terminalSavdo)}
                               onChange={(e) => setapp(e.target.value, setTerminalSavdo)}
                               required placeholder="Выручка Терминал"
                        />
                    </Tooltip>
                </div>
                <div className="ant-row ant-form-item" style={{rowGap: "0px"}}>
                    <div className="ant-col ant-form-item-label ">
                        <label htmlFor="">Инкассация</label>
                    </div>
                    <Tooltip
                        trigger={['focus']}
                        title={titleTooltip(inkassatsiya)}
                        placement="top"
                        color={"blue"}
                        overlayClassName="numeric-input"
                    >
                        <Input value={valueInput(inkassatsiya)}
                               onChange={(e) => setapp(e.target.value, setInkassatsiya)}
                               required placeholder="Инкассация"
                        />
                    </Tooltip>
                </div>
                <div className="ant-row ant-form-item" style={{rowGap: "0px"}}>
                    <div className="ant-col ant-form-item-label">
                        <label htmlFor="">Расход Фирма Нал.</label>
                    </div>
                    <Tooltip
                        trigger={['focus']}
                        title={titleTooltip(rasFirmaNaqd)}
                        placement="top"
                        color={"blue"}
                        overlayClassName="numeric-input"
                    >
                        <Input value={valueInput(rasFirmaNaqd)}
                               onChange={(e) => setapp(e.target.value, setRasFirmaNaqd)}
                               required placeholder="Расход Фирма Нал"
                        />
                    </Tooltip>
                </div>
                <div className="ant-row ant-form-item" style={{rowGap: "0px"}}>
                    <div className="ant-col ant-form-item-label ">
                        <label htmlFor="">Расход Иные</label>
                    </div>
                    <Tooltip
                        trigger={['focus']}
                        title={titleTooltip(boshqaRasxodla)}
                        placement="top"
                        color={"blue"}
                        overlayClassName="numeric-input"
                    >
                        <Input value={valueInput(boshqaRasxodla)}
                               onChange={(e) => setapp(e.target.value, setBoshqaRasxodla)}
                               required placeholder="Расход Иные"
                        />
                    </Tooltip>
                </div>
                <div className="ant-row ant-form-item" style={{rowGap: "0px"}}>
                    <div className="ant-col ant-form-item-label ">
                        <label htmlFor="">Аванс Наличные</label>
                    </div>
                    <Tooltip
                        trigger={['focus']}
                        title={titleTooltip(avansNaqd)}
                        placement="top"
                        color={"blue"}
                        overlayClassName="numeric-input"
                    >
                        <Input value={valueInput(avansNaqd)}
                               onChange={(e) => setapp(e.target.value, setAvansNaqd)}
                               required placeholder="Аванс Наличные"
                        />
                    </Tooltip>
                </div>
                <div className="ant-row ant-form-item" style={{rowGap: "0px"}}>
                    <div className="ant-col ant-form-item-label ">
                        <label htmlFor="">Аванс Товар</label>
                    </div>
                    <Tooltip
                        trigger={['focus']}
                        title={titleTooltip(avansTovar)}
                        placement="top"
                        color={"blue"}
                        overlayClassName="numeric-input"
                    >
                        <Input value={valueInput(avansTovar)}
                               onChange={(e) => setapp(e.target.value, setAvansTovar)}
                               required placeholder="Аванс Товар"
                        />
                    </Tooltip>
                </div>

                <div className="ant-row ant-form-item" style={{rowGap: "0px"}}>
                    <div className="ant-col ant-form-item-label ">
                        <label htmlFor="">Касса Сданы</label>
                    </div>
                    <Tooltip
                        trigger={['focus']}
                        title={titleTooltip(ostatokDnya)}
                        placement="top"
                        color={"blue"}
                        overlayClassName="numeric-input"
                    >
                        <Input value={valueInput(ostatokDnya)}
                               onChange={(e) => setapp(e.target.value, setOstatokDnya)}
                               required placeholder="Касса Сданы"
                        />
                    </Tooltip>
                </div>

                <div className="ant-row ant-form-item" style={{rowGap: "0px"}}>
                    <div className="ant-col ant-form-item-label ">
                        <label htmlFor="">Описание</label>
                    </div>
                    <Input placeholder="Описание" value={de}
                           onChange={(e) => setDe(e.target.value)} required/>
                </div>
                {
                    role === 'ROLE_SUPER_ADMIN' || role === "ROLE_ADMIN" ?
                        <Popconfirm title="Уверены ли вы?" okText="Активный" onCancel='Отмена'
                                    onConfirm={() => activeTrue(id)}>
                            {activeLoading ?
                            <LoadingOutlined style={{ fontSize: 24 }} spin /> :
                                <Button className={`${confirm55 ? "activ" : "block"}`}>{confirm55 ? "Активный" : "Блокировный"}</Button>
                            }
                        </Popconfirm> : ""
                }


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
        // let columns
        // if (role === "ROLE_USER") {
        //     columns = [
        //         {
        //             title: 'Дата',
        //             key: 'created_date',
        //             width: 120,
        //             render: (dataIndex) => (
        //                 <>{dataIndex.created_date ? dataIndex.created_date.substring(0, 10) + " " + dataIndex.created_date.substring(11, 19) : ''}</>)
        //         },
        //         {
        //             title: 'Маркет',
        //             dataIndex: 'market_name',
        //             key: 'market_name',
        //             ...getColumnSearchProps('market_name'),
        //         },
        //         {
        //             title: 'Пользователь',
        //             dataIndex: 'name',
        //             key: 'name',
        //             ...getColumnSearchProps('name'),
        //         },
        //         // {
        //         //     title: 'Фамилия',
        //         //     dataIndex: 'surname',
        //         //     key: 'surname',
        //         //     ...getColumnSearchProps('surname'),
        //         // },
        //         {
        //             title: 'Выручка Нал.',
        //             key: 'naqd_savdo',
        //             width: 125,
        //             render: (dataIndex) => (
        //                 <>{valueInput(dataIndex.naqd_savdo)}</>
        //             ),
        //         },
        //         {
        //             title: 'Выручка Терминал',
        //             // dataIndex: 'terminal_savdo',
        //             key: 'terminal_savdo',
        //             width: 125,
        //             render: (dataIndex) => (
        //                 <>{valueInput(dataIndex.terminal_savdo)}</>
        //             ),
        //         },
        //         {
        //             title: 'Инкассация',
        //             // dataIndex: 'inkassatsiya',
        //             width: 125,
        //             key: 'inkassatsiya',
        //             render: (dataIndex) => (
        //                 <>{valueInput(dataIndex.inkassatsiya)}</>
        //             ),
        //         },
        //         {
        //             title: 'Расход Фирма Нал.',
        //             // dataIndex: 'ras_firma_naqd',
        //             width: 125,
        //             key: 'ras_firma_naqd',
        //             render: (dataIndex) => (
        //                 <>{valueInput(dataIndex.ras_firma_naqd)}</>
        //             ),
        //         },
        //         {
        //             title: 'Расход Иные',
        //             // dataIndex: 'boshqa_rasxodla',
        //             width: 125,
        //             key: 'boshqa_rasxodla',
        //             render: (dataIndex) => (
        //                 <>{valueInput(dataIndex.boshqa_rasxodla)}</>
        //             ),
        //         },
        //         {
        //             title: 'Аванс Наличные',
        //             // dataIndex: 'avans_naqd',
        //             width: 125,
        //             key: 'avans_naqd',
        //             render: (dataIndex) => (
        //                 <>{valueInput(dataIndex.avans_naqd)}</>
        //             ),
        //         },
        //         {
        //             title: 'Аванс Товар',
        //             // dataIndex: 'avans_tovar',
        //             width: 125,
        //             key: 'avans_tovar',
        //             render: (dataIndex) => (
        //                 <>{valueInput(dataIndex.avans_tovar)}</>
        //             ),
        //         },
        //         {
        //             title: 'Касса Сданы',
        //             // dataIndex: 'ostatok_dnya',
        //             width: 125,
        //             key: 'ostatok_dnya',
        //             render: (dataIndex) => (
        //                 <>{valueInput(dataIndex.ostatok_dnya)}</>
        //             ),
        //         },
        //         {
        //             title: 'Описание',
        //             dataIndex: 'description',
        //             key: 'description',
        //             ...getColumnSearchProps('description'),
        //         },
        //         {
        //             title: 'Confirm',
        //             key: 'confirm',
        //             render: (dataIndex) => (
        //                 <>{dataIndex.confirm === true ? "True" : "False"}</>
        //             )
        //         },
        //         {
        //             title: 'Действие',
        //             key: 'action',
        //             render: (dataIndex) => (
        //                 <>
        //                     <Space size="middle">
        //                         <div style={{color: 'blue'}} onClick={() => editProduct(dataIndex)} type={"primary"}>
        //                             <EditFilled/></div>
        //                     </Space>
        //                 </>
        //             ),
        //         },
        //     ];
        // } else {
          const columns = [
                {
                    title: 'Дата',
                    key: 'created_date',
                    width: 100,
                    render: (dataIndex) => (
                        <>{dataIndex.created_date ? dataIndex.created_date.substring(0, 10) + " " + dataIndex.created_date.substring(11, 19) : ''}</>)
                },
                {
                    title: 'Маркет',
                    dataIndex: 'market_name',
                    key: 'market_name',
                    width: 100,
                    ...getColumnSearchProps('market_name'),
                },
                {
                    title: 'Пользователь',
                    dataIndex: 'name',
                    key: 'name',
                    width: 150,
                    ...getColumnSearchProps('name'),
                },
                // {
                //     title: 'Фамилия',
                //     dataIndex: 'surname',
                //     key: 'surname',
                //     ...getColumnSearchProps('surname'),
                // },
                {
                    title: 'Выручка Нал.',
                    key: 'naqd_savdo',
                    width: 100,
                    render: (dataIndex) => (
                        <>{valueInput(dataIndex.naqd_savdo)}</>
                    ),
                },
                {
                    title: 'Выручка Терминал',
                    // dataIndex: 'terminal_savdo',
                    key: 'terminal_savdo',
                    width: 100,
                    render: (dataIndex) => (
                        <>{valueInput(dataIndex.terminal_savdo)}</>
                    ),
                },
                {
                    title: 'Инкассация',
                    // dataIndex: 'inkassatsiya',
                    width: 100,
                    key: 'inkassatsiya',
                    render: (dataIndex) => (
                        <>{valueInput(dataIndex.inkassatsiya)}</>
                    ),
                },
                {
                    title: 'Расход Фирма Нал.',
                    // dataIndex: 'ras_firma_naqd',
                    width: 100,
                    key: 'ras_firma_naqd',
                    render: (dataIndex) => (
                        <>{valueInput(dataIndex.ras_firma_naqd)}</>
                    ),
                },
                {
                    title: 'Расход Иные',
                    // dataIndex: 'boshqa_rasxodla',
                    width: 100,
                    key: 'boshqa_rasxodla',
                    render: (dataIndex) => (
                        <>{valueInput(dataIndex.boshqa_rasxodla)}</>
                    ),
                },
                {
                    title: 'Аванс Наличные',
                    // dataIndex: 'avans_naqd',
                    width: 100,
                    key: 'avans_naqd',
                    render: (dataIndex) => (
                        <>{valueInput(dataIndex.avans_naqd)}</>
                    ),
                },
                {
                    title: 'Аванс Товар',
                    // dataIndex: 'avans_tovar',
                    width: 100,
                    key: 'avans_tovar',
                    render: (dataIndex) => (
                        <>{valueInput(dataIndex.avans_tovar)}</>
                    ),
                },
                {
                    title: 'Касса Сданы',
                    // dataIndex: 'ostatok_dnya',
                    width: 100,
                    key: 'ostatok_dnya',

                    render: (dataIndex) => (
                        <>{valueInput(dataIndex.ostatok_dnya)}</>
                    ),
                },
                {
                    title: 'Описание',
                    dataIndex: 'description',
                    key: 'description',
                    width: 100,
                    ...getColumnSearchProps('description'),
                },
                {
                    title: 'Confirm',
                    key: 'confirm',
                    width: 100,
                    render: (dataIndex) => (
                        <>{dataIndex.confirm === true ? "True" : "False"}</>
                    )
                },

                {
                    title: 'Действие',
                    key: 'action',
                    width: 200,
                    render: (dataIndex) => (
                        <>
                            {role === "ROLE_USER" ?
                            <Space size="middle">
                                <div style={{color: 'blue'}} onClick={() => editProduct(dataIndex)} type={"primary"}>
                                    <EditFilled/>
                                </div>
                            </Space> :
                            <Space size="middle">
                                <div style={{color: 'blue'}} onClick={() => editProduct(dataIndex)} type={"primary"}>
                                    <EditFilled/>
                                </div>
                                <Popconfirm
                                    title={dataIndex.active ? "Ты уверен" : 'Ты уверен'}
                                    okText={"Да"}
                                    onConfirm={() => delProduct(dataIndex.id)}
                                    cancelText={"Нет "}>
                                    <div style={{color: "blue"}}><DeleteOutlined/></div>
                                </Popconfirm>
                                <Popconfirm title="Уверены ли вы?" okText="Активный" onCancel='Отмена'
                                            onConfirm={() => activeTrue(dataIndex.id)}>
                                    <Button
                                        className={`${dataIndex.confirm ? "activ" : "block"}`}>{dataIndex.confirm ? "Активный" : "Блокировный"}</Button>
                                </Popconfirm>

                            </Space> }
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
                {/*{*/}
                {/*    !confirm2 ?*/}
                {/*        <Table  columns={columns}*/}
                {/*               loading={loading || deleteLoading || activeLoading}*/}
                {/*               pagination={false}*/}
                {/*               dataSource={data}*/}
                {/*               onRow={(data) => {*/}
                {/*                   return {*/}
                {/*                       onDoubleClick: event => {editProduct(data)*/}
                {/*                       },*/}
                {/*                   };*/}
                {/*               }}*/}
                {/*        /> :*/}
                        <Table id='tg'  scroll={{ y: 400 }} columns={columns}
                               loading={loading || deleteLoading || activeLoading}
                               pagination={false}
                               dataSource={data}

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
                               summary={() => {
                                   return (
                                       <>
                                           {
                                               !confirm2 ? "" :
                                                   <Table.Summary.Row style={{background: "darkBlue", color: 'white'}}>
                                                       <Table.Summary.Cell
                                                           colSpan={2}>Общая суммы</Table.Summary.Cell>
                                                       <Table.Summary.Cell ><Text></Text></Table.Summary.Cell>
                                                       <Table.Summary.Cell><Text style={{color: "white"}}>{naqd_sum === 0 ? 0 : valueInput(naqd_sum)}</Text></Table.Summary.Cell>
                                                       <Table.Summary.Cell><Text style={{color: "white"}}>{terminal_sum === 0 ? 0 : valueInput(terminal_sum)}</Text></Table.Summary.Cell>
                                                       <Table.Summary.Cell><Text style={{color: "white"}}>{inkassatsiya2 === 0 ? 0 : valueInput(inkassatsiya2)}</Text></Table.Summary.Cell>
                                                       <Table.Summary.Cell><Text style={{color: "white"}}>{ras_firma_naqd_sum === 0 ? 0 : valueInput(ras_firma_naqd_sum)}</Text></Table.Summary.Cell>
                                                       <Table.Summary.Cell><Text style={{color: "white"}}>{boshqa_rasxod_sum === 0 ? 0 : valueInput(boshqa_rasxod_sum)}</Text></Table.Summary.Cell>
                                                       <Table.Summary.Cell><Text style={{color: "white"}}>{avans_naqd_sum === 0 ? 0 : valueInput(avans_naqd_sum)}</Text></Table.Summary.Cell>
                                                       <Table.Summary.Cell><Text style={{color: "white"}}>{avans_tovar_sum === 0 ? 0 : valueInput(avans_tovar_sum)}</Text></Table.Summary.Cell>
                                                       <Table.Summary.Cell><Text style={{color: "white"}}>{ostatok_dnya_sum === 0 ? 0 : valueInput(ostatok_dnya_sum)}</Text></Table.Summary.Cell>
                                                       <Table.Summary.Cell colSpan={11}><Text></Text></Table.Summary.Cell>
                                                   </Table.Summary.Row>

                                           }
                                       </>
                                   );
                               }}
                        />
                {/*}*/}

            </>
        );
    };


    const   onSubmit = () => {
        setSubmit(true);
        let val = {
            from: from,
            to: to,
            marketId: marketId === 0 ? null : marketId,
            confirm: confirm === null ? null : confirm
        }
        dispatch(getReportStart(true, {from: date}, val))

    };

    const reset = () => {
        setSubmit(false);
        setConfirm2(false)
        setFrom(null);
        setTo(null);
        setConfirm(null)
        setMarketId(0)
        dispatch(getReportStart(false, {from: date}))
    };

    return (
        <div>
            <h1>Отчет</h1>
            {role === "ROLE_ADMIN" || role === "ROLE_SUPER_ADMIN" ? "" :
                <Button type="primary" onClick={showModal}>+ Добавить</Button>
            }
            {submit ?
                <Button type="primary" onClick={() => obwiy()}>Общая суммы </Button> : ""
            }
            {
                role === 'ROLE_USER' ? "" :
                    <Button style={{marginLeft: "10px"}} type="primary" onClick={() => nimadurla()}>Aвтозаполнение</Button>
            }
            <Modal title={"Добавить Отчет"} visible={visible} onCancel={handleCancel}
                   footer={null}>
                {Demo}
            </Modal>
            <Form
                name="time_related_controls"
                onFinish={onSubmit}
            >
                <Row gutter={[24, 0]} id='pp'>
                    <div className="ant-row ant-form-item"
                         style={{rowGap: "0px", marginLeft: '10px'}}>
                        <div className="ant-col ant-col-16 ant-form-item-control">
                            <label
                                htmlFor=""> Дата от</label>
                            <DatePicker
                                value={from ? moment(from, dateFormat) : undefined}
                                format={dateFormat}
                                onChange={(date, dateString) => onchangeFilterState(dateString, setFrom)}/>
                        </div>
                    </div>
                    <div
                        className="ant-row ant-form-item"
                        style={{rowGap: "0px", marginLeft: '10px'}}>
                        <div className="ant-col ant-col-16 ant-form-item-control">
                            <label
                                htmlFor=""> Дата до</label>
                            <DatePicker
                                value={to ? moment(to, dateFormat) : undefined}
                                format={dateFormat}
                                onChange={(date, dateString) => onchangeFilterState(dateString, setTo)}/>
                        </div>
                    </div>
                    <>
                        {role === "ROLE_USER" ? "" :
                            <div className="ant-row ant-form-item" style={{rowGap: "0px", marginLeft: '10px'}}>
                                <label htmlFor="">Маркет</label>
                                <Select
                                    allowClear={true}
                                    showSearch
                                    placeholder="Маркет"
                                    onChange={(e) => setMarketId(parseInt(e ? e : 0))}
                                    value={marketId ? marketId : ''}
                                    optionFilterProp="children"
                                >
                                    {marketData ? marketData.map(item =>
                                        <Option key={item.id} value={item.id}>{item.name}</Option>
                                    ) : ''}
                                </Select>
                            </div>}
                        {role === "ROLE_USER" ? "" :
                            <div className="ant-row ant-form-item" style={{rowGap: "0px", marginLeft: '10px'}}>
                                <label htmlFor="">Confirm</label>
                                <Select
                                    allowClear={true}
                                    showSearch
                                    placeholder="confirm"
                                    onChange={(e) => setConfirm(e)}
                                    value={confirm}
                                    optionFilterProp="children"
                                >
                                    <Option value={true}>true</Option>
                                    <Option value={false}>false</Option>
                                </Select>
                            </div>}

                    </>
                    <Space style={{marginLeft: '10px'}}>
                        <Button className="green " htmlType={"button"}
                                disabled={!submit}
                                onClick={reset}>Очистить</Button>
                        <Button className="green po"
                                htmlType={"submit"}>Поиск</Button>
                    </Space>
                </Row>

            </Form>

            <Tables/>
        </div>
    );
};

export default Report;