import React from "react";
import { withRouter } from "react-router-dom";
import Listing from './index'
import Mylisting from './mylist'
import { Tabs } from 'antd';

const { TabPane } = Tabs;

const Nav = (props) => {
    const callback = key => {
        if (key === '/') {
            props.history.push("/");
        } else {
            props.history.push("/mylist");
        }
    }

    return (
        <> 
         <Tabs defaultActiveKey={props.location.pathname} onChange={callback} size='large' style={{padding: '20px'}}>
            <TabPane tab="POKEMON LIST" key='/'>
                <Listing />
            </TabPane>
            <TabPane tab="MY POKEMON LIST" key='/mylist'>
                <Mylisting />
            </TabPane>
        </Tabs>
        </>
    )
}

export default withRouter(Nav)