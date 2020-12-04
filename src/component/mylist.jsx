import React, {useContext, useEffect, useState} from "react";
import { List, Row, Col, Button, Spin } from 'antd';
import { Link } from "react-router-dom";
import { withRouter } from "react-router-dom";
import { PokemonContext } from '../PokemontContext'
import { LoadingOutlined } from '@ant-design/icons';

const Mylisting = (props) => {
    const [data, setData] = useContext(PokemonContext)
    const [details, setDetails] = useState([])
    const [loading, setLoading] = useState(false)
    const antIcon = <LoadingOutlined style={{ fontSize: 24 }} spin />;
    const deleteList = e => {
        let tempo = {...data}
        tempo.details.map((val, index) => {
            if (val.name === e.name) {
               tempo.details.splice(index, 1)
            }
        })
        tempo.lists.map((val, index) => {
            if (val.name === e.name) {
                tempo.lists.splice(index, 1)
             }
        })
        setData(tempo)
        setDetails(tempo.details)
        window.sessionStorage.setItem('data', JSON.stringify(tempo))
        props.history.push("/mylist");
    }
    useEffect(() => {
        setLoading(true)
        if(window.sessionStorage.getItem('data') !== null) {
            let dataCookie = JSON.parse(window.sessionStorage.getItem('data'))
            setDetails(dataCookie.details)
            setTimeout(() => {
                setData(JSON.parse(dataCookie))
                
            }, 500)  
            setLoading(false)
        } else {
            setLoading(false)
        }
    }, [])
  
    return (
        <>  
            <Row>
                <Col span={24}>
                    {loading ? <>
                    <br /><br /><br />
                    <Spin indicator={antIcon} /> 
                    </> :
                    <List
                    size="medium"
                    header={<div>
                    <div className='adjust'><b>Name</b></div>
                    <div className='adjust'><b>Nickname</b></div>
                    <div className='adjust-del'>  </div>
                    </div>}
                    bordered
                    dataSource={details.map(x => x)}
                    renderItem={(item, index) => <List.Item style={{ textAlign: 'left'}} key={index}>
                            <div className='adjust'>
                                <Link to={"/details/" + item.realname}>
                                {item.realname}
                                </Link>
                            </div>
                            <div className='adjust'>
                                {item.name}
                            </div>
                        
                            <div className='adjust-del'>
                                <Button type="primary" size='small' onClick={() => deleteList(item)}>
                                    Delete
                                </Button>
                            </div>
                    </List.Item>}
                    />}
                </Col>
                </Row>
            </>
    )
}

export default withRouter(Mylisting)