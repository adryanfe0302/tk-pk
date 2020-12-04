import React,{useState, useEffect, createContext} from 'react'
import axios from 'axios';
import api from './api'
export const PokemonContext = createContext();

export const PokemonProvider = props => {
    const [data, setData] = useState({
            lists: [],
            details: []
    })

    useEffect(() => {
        axios.get(api).then(res => {
            setData({
                lists: res.data.results,
                details: []
            })
        })
    }, [])

    
    return (
        <PokemonContext.Provider value={[data, setData]}>
            {props.children}
        </PokemonContext.Provider>
    )
}
 