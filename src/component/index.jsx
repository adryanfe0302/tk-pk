import React, {useContext, useEffect, useState} from "react";
import { Link } from "react-router-dom";
import { List, Spin } from 'antd';
import { PokemonContext } from '../PokemontContext'
import { LoadingOutlined } from '@ant-design/icons';

const Listing = () => {
    const [data, setData] = useContext(PokemonContext)
    const antIcon = <LoadingOutlined style={{ fontSize: 24 }} spin />;
    const [lists, setList] = useState([])
    const [loading, setLoading] = useState(false)
    useEffect(() => {
        setLoading(true)
        if(window.sessionStorage.getItem('data') !== null) {
            let dataCookie = (window.sessionStorage.getItem('data'))
            setTimeout(() => {
                setData(JSON.parse(dataCookie))
                setList(data.lists)
            }, 500)  
        } else {
            setList(data.lists)
        }
    
        if (data.details.length > 0) {
           const filterSelected = data.lists.filter(({ name: id1 }) => !data.details.some(({ realname: id2 }) => id2 === id1));
           setList(filterSelected)
        }   
        
        setLoading(false)
    }, [data])
    return (
        <>  
            {loading ? <>
                <br /><br /><br />
                <Spin indicator={antIcon} /> 
                </>:
                lists !== undefined &&
                <List
                size="medium"
                header={<div align="left"><b>Name</b></div>}
                bordered
                dataSource={lists.map(x => x.name)}
                renderItem={item => <List.Item style={{cursor: 'pointer', textAlign: 'left'}}>  
                    <Link to={"/details/" + item}>
                    {item}
                    </Link> 
                </List.Item>}
                />
            }
        </>
    )
}

export default Listing