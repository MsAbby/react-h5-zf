import React, { useEffect } from "react";
import {useNavigate, useLocation, useState, Outlet } from 'react-router-dom';
import { Badge, TabBar } from 'antd-mobile';
import {
    AppOutline,
    MessageOutline,
    MessageFill,
    UnorderedListOutline,
    UserOutline,
} from 'antd-mobile-icons'

import './index.scss'

const Home = (props) => {
    const navigate = useNavigate()
    const location = useLocation()
    const { pathname } = location
    const state = {
        tabs: [
            {
                key: '/home/index',
                title: '首页',
                icon: <AppOutline />,
                badge: Badge.dot,
            },
            {
                key: '/home/list',
                title: '找房',
                icon: <UnorderedListOutline />,
                badge: '5',
            },
            {
                key: '/home/news',
                title: '资讯',
                icon: (active) =>
                    active ? <MessageFill /> : <MessageOutline />,
                badge: '99+',
            },
            {
                key: '/home/profile',
                title: '我的',
                icon: <UserOutline />,
            },
        ]
    }

    const setRouteActive = (value) => {
        console.log(value)
        navigate(value, { replace: true })
    }

    return (
        <div className="home">
            <Outlet />
            <div className="footer-tabbar">
                <TabBar
                    activeKey={pathname}
                    onChange={value => setRouteActive(value)}
                >
                    {state.tabs.map(item => (
                        <TabBar.Item
                            key={item.key}
                            icon={item.icon}
                            title={item.title}
                        />
                    ))}
                </TabBar>
            </div>

        </div>
    )
}

export default Home