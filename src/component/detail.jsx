import React, { useEffect, useContext, useState } from "react";
import { PokemonContext } from '../PokemontContext'
import { withRouter } from "react-router-dom";
import api from '../api'
import axios from 'axios';
import { Card, Button, Row, message, Modal, Input, Tag, Divider, PageHeader } from 'antd';

const Details = (props) => {
    const [data, setData] = useContext(PokemonContext)
    const [name, setName] = useState('');
    const [detail, setDetail] = useState({
        loading: false,
        image: '',
        visible: false,
        types: [],
        moves: [],
        pokename: '',
        url: ''
    })

    useEffect(() => {
        setDetail({
            loading: true,
            image: '',
            visible: false,
            types: [],
            moves: [],
            pokename: '',
            url: ''
        })
        const names = props.history.location.pathname.split("/").pop()
        const looping = loops => {
            loops.forEach(list => {
                if (list.name === names) {
                    axios.get(list.url).then(res => {
                        setDetail({
                            loading: false,
                            image: res.data.sprites.front_default,
                            visible: false,
                            types: res.data.types,
                            moves: res.data.moves,
                            pokename: list.name,
                            url: list.url
                        })
                    })
                }
            })
        }

        if (data.lists.length === 0) {
            axios.get(api).then(res => {
                looping(res.data.results)
            })
        }
        looping(data.lists)

    }, [])
    
    const randomCatch = () => {
        let catchs = Math.random() >= 0.5
        if (catchs) {
            message.success('Success Catched', 1).then(() => {
                setDetail((prevState) => ({
                    ...prevState,
                    visible: true
                }))
            })
        } else {
            message.error('Failed Catch, Try Again 50/50 Possibility catched', 2).then(() => {
                props.history.push("/");
            })
        }
    }

    const handleOk = e => {
        props.history.push("/mylist");
        let objTempo = {...data}
        objTempo.details.push({
            name: name, 
            realname: detail.pokename,
            url: detail.url
        })
        setData(objTempo)

        window.sessionStorage.setItem('data', JSON.stringify(objTempo))
       
    };

    const handleCancel = e => {
        setDetail((prevState) => ({
            ...prevState,
            visible: false
        }))
      };

    const updateName = (e) => {
        setName(e.target.value)
    }

    const cardCustom = {
        width: '100%', 
        maxWidth:'400px', 
        minHeight:'100px', 
        margin: 'auto'
    }
    const headerCustom = {
        border: '1px solid rgb(235, 237, 240)'
    }

    return (
        <>
        <PageHeader
            style={headerCustom}
            onBack={() => props.history.push('/')}
            title={ props.history.location.pathname.split("/").pop()}
        />
        <Row style={{padding: '20px'}}>
            <Modal
            title="Add Nickname"
            visible={detail.visible}
            onOk={handleOk}
            onCancel={handleCancel}
            >
            <Input placeholder="Add Nick Name" onChange={updateName} value={name} size='large' />
            </Modal>
   
            <Card
                hoverable
                style={cardCustom}
                loading={detail.loading}
                align='center'
                cover={<img alt="example" src={detail.image} alt='loading' />}
            >
                 <Button type="primary" size='large' onClick={randomCatch}>
                Catch Pokemon
                </Button>
                <Divider>Types</Divider>
                <div align='left'>
                    {detail.types.map((item, i) => {
                        return <Tag key={i} style={{marginBottom: '5px'}} color="green">{item.type.name}</Tag>
                    })}
                </div>
                <Divider>Moves</Divider>
                <div align='left'>
                   
                    {detail.moves.map((item, i) => {
                        return <Tag key={i} color="blue" style={{marginBottom: '5px'}}>{item.move.name} </Tag>
                    })}
                </div>
                
                <Divider />
               
            </Card>

        </Row>
   
        </>
    )
}

export default withRouter(Details)