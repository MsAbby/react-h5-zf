import React, { useState} from "react";
import { Swiper, Grid, Input } from 'antd-mobile'
import { useNavigate } from 'react-router-dom';
import { AntOutline, KeyOutline } from 'antd-mobile-icons';
import './index.scss'

const Index = (props) => {
    const navigate = useNavigate()
    const colors = ['#ace0ff', '#bcffbd', '#e4fabd', '#ffcfac']
    const navs = [{
        id: 1,
        img: require('../../assets/images/gongzufang.png'),
        title: '整租',
        path: '/home/list'
    },
    {
        id: 2,
        img: require('../../assets/images/gongzufang.png'),
        title: '合租',
        path: '/home/list'
    },
    {
        id: 3,
        img: require('../../assets/images/gongzufang.png'),
        title: '地图找房',
        path: '/home/list'
    },
    {
        id: 4,
        img: require('../../assets/images/gongzufang.png'),
        title: '去租房',
        path: '/home/list'
    }]
    const groups = [
        {
            id: 1,
            img: require('../../assets/images/gongzufang.png'),
            title: '家住颠三倒四',
            desc: '什么什么的感觉'
        },
        {
            id: 2,
            img: require('../../assets/images/gongzufang.png'),
            title: '家住颠三倒四2',
            desc: '什么什么的感觉'
        },
        {
            id: 3,
            img: require('../../assets/images/gongzufang.png'),
            title: '家住颠三倒四3',
            desc: '什么什么的感觉'
        },
        {
            id: 4,
            img: require('../../assets/images/gongzufang.png'),
            title: '家住颠三倒四4',
            desc: '什么什么的感觉'
        }
    ]
    const cards = [
        {
            id: 1,
            img: require('../../assets/images/car.jpg'),
            title: '家住颠三倒四',
            origin: '新华网',
            day: '两天前'
        },
        {
            id: 2,
            img: require('../../assets/images/car.jpg'),
            title: '家住颠三倒四2',
            origin: '新华网',
            day: '两天前'
        },
        {
            id: 3,
            img: require('../../assets/images/car.jpg'),
            title: '家住颠三倒四3',
            origin: '新华网',
            day: '两天前'
        },
        {
            id: 4,
            img: require('../../assets/images/car.jpg'),
            title: '家住颠三倒四4',
            origin: '新华网',
            day: '两天前'
        }
    ]
    navigator.geolocation.getCurrentPosition(location => {
        console.log(location)
    })
    const { value, setValue } = useState('')
    const items = colors.map((color, index) => (
        <Swiper.Item key={index}>
            <div
                className="swiper-content"
                style={{ background: color }}
            >
            </div>
        </Swiper.Item>
    ))
    const goNext = (path) => {
        console.log('11---')
        navigate(path, { replace: true })
    }

    const goMap = () => {
        navigate('/home/map', { replace: true })
    }

    return (
        <div className="home-index">
            <Swiper
                autoplay
                loop
            >
                {items}
            </Swiper>
            <div className="search-box">
                <div className="left" onClick={() => {goMap()}}>
                    <p>上海</p>
                </div>
                <div className="center">
                    <KeyOutline fontSize={16} className="search"></KeyOutline>
                    <Input
                        placeholder='请输入内容'
                        value={value}
                        onChange={val => {
                            setValue(val)
                        }}
                        />
                </div>
                <AntOutline fontSize={16}/>
            </div>
            <div className="home-nav">
                <Grid columns={4} gap={6} className='grid-demo-item-head' >
                    {
                        navs.map(item => {
                            return (
                                <Grid.Item key={item.id}>
                                    <div className='grid-demo-item-block' onClick={() => { goNext(item.path) }}>
                                        <img src={item.img}></img>
                                        <p>{item.title}</p>
                                    </div>
                                </Grid.Item>
                            )
                        })
                    }
                </Grid>
            </div>
            <div className="home-team">
                <h3>租房小组</h3>
                <div className="teams">
                    <Grid columns={2} gap={12} className='grid-team-item-head' >
                        {
                            groups.map(item => {
                                return (
                                    <Grid.Item key={item.id}>
                                        <div onClick={() => { goNext(item.path) }} className="team-box">
                                            <div className="team-left">
                                                <h4>{item.title}</h4>
                                                <p>{item.desc}</p>
                                            </div>
                                            <img src={item.img}></img>
                                        </div>
                                    </Grid.Item>
                                )
                            })
                        }
                    </Grid>
                </div>
            </div>

            <div className="news-box">
                <h3>最新资讯</h3>
                <div className="news-list">
                    {
                        cards.map(item => {
                            return (
                                <div className="card-news-list" key={item.id}>
                                    <img src={item.img}></img>
                                    <div className="news-right">
                                        <h3 className="title">{item.title}</h3>
                                        <div className="bottom">
                                            <p>{item.origin}</p>
                                            <p>{item.day}</p>
                                        </div>
                                    </div>
                                </div>
                            )
                        })
                    }
                </div>
            </div>
        </div>
    )
}

export default Index
