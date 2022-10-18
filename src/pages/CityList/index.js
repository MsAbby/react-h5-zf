import React, { useEffect, useState, useRef } from "react";
import { NavBar } from 'antd-mobile'
import { data } from './city'
import { List, AutoSizer } from 'react-virtualized';

import './index.scss'

const CityList = () => {
    const [cityList, setCityList] = useState({})
    const [cityIndex, setCityIndex] = useState([])
    const [active, setActive] = useState()
    const TITLE_HEIGHT = 36
    const NAME_HEIGHT = 50

    const renderRef = useRef(true)
    const indexListRef = useRef()

    useEffect(() => {
        // 重要!!!
        if (renderRef.current) {
            renderRef.current = false
            return
        }

        const result = fomatCityData(data.citys)
        if (result) {
            // 引用数据类型，先拷贝后更新
            setCityList({ ...cityList, ...result.cityList })
            setCityIndex([...cityIndex, ...result.cityIndex])
            // indexListRef.current.measureAllRows()
        }
    }, [])

    // 格式化数据
    const fomatCityData = (list) => {
        const cityIndex = []
        const cityList = {}

        list.map(item => {
            const char = item.pingyin
            const first = char.substring(0, 1).toUpperCase()
            if (cityIndex.indexOf(first) === -1) {
                cityIndex.push(first)
                cityList[first] = []
            } else {
                cityList[first].push(item)
            }
        })
        return {
            cityList: cityList,
            cityIndex: cityIndex.sort(),
        }
    }

    // 长列表渲染
    const rowRenderer = ({
        key, // 唯一值
        index, // 索引号
        insScrolling, // 是否正在滚动
        isVisible, // 当前list是否时可见的
        style // 一定要给每一行数据添加样式，指定每一行的位置（重点）
    }) => {
        const letter = cityIndex[index]
        return (
            <div key={key} style={style} className="city">
                <div className="title">{ letter }</div>
                {
                    cityList[letter].map(item=> {
                        return (
                            <div className="name" key={item.value}>
                                { item.cityName }
                            </div>
                        )
                    })
                }
            </div>
        )
    }

    // 滚动时， 用于获取行的信息
    const onRowsRendered = ({ startIndex }) => {
        console.log(startIndex)
        if (active !== startIndex) {
            setActive(startIndex)
        }
    }

    // index 点击
    const handelClickIndex = (index) => {
        setActive(index)
        indexListRef.current.scrollToRow(index)
    }
    // 计算大的模块高度
    const getRowHeight = ({index}) => {
        // 索引高度 + 城市数量 * 城市名称的高度
        // TITLE_HEIGHT + citylist[cityIndex[index]].length * NAME_HEIGHT
        return TITLE_HEIGHT + cityList[cityIndex[index]].length * NAME_HEIGHT
    }
    const backPage = () => {
        console.log('11')
    }



    return (
        // 根要设置100%
        // 防止顶部导航栏被滚出去： citylist: padding-top: 45px; navbar-box: margin-top: -45px
        <div className="citylist">
            <NavBar
                onBack={() => { backPage() }}
                className="navbar-box"
            >城市选择</NavBar>
            <div className="city-list-box">
                {/* 城市列表:  rowContent: 代表多少行 */}
                {/* List组件 的 onRowsRendered: 滚动时，拿到页面中渲染行的信息（startIndex） */}
                {/* 设置List组件scrollToAlignment 配置项为start， 保证被点击出现在页面顶部 */}
                {/* 点击时： 滚动到对应城市： 调用scrollToRow方法，用于安全滚动到指定位置（必须可见的，出现过就成） */}
                {/* 索引无法正确定位时， 用list组件measureAllRows ，提前计算所有行高度，让scrollToRow方法精确跳转 */}
                {
                    <AutoSizer>
                        {
                            ({ width, height }) => {
                                return (
                                    <List
                                        ref={indexListRef}
                                        width={width}
                                        height={height}
                                        rowCount={cityIndex.length}
                                        rowHeight={getRowHeight}
                                        rowRenderer={rowRenderer}
                                        onRowsRendered={onRowsRendered}
                                        scrollToAlignment="start"
                                ></List>
                                )
                            }
                        }
                    </AutoSizer>
                }
            </div>
            <ul className="city-list-index">
                {
                    cityIndex.map((item, index) => {
                        return (
                            <li
                                className="city-index-item"
                                key={item}
                                onClick={() => {handelClickIndex(index)}}
                            >
                                <span className={active === index ? 'index-active': ''}>{item}</span>
                            </li>
                        )
                    })   
                }
            </ul>
        </div>
    )
}
export default CityList