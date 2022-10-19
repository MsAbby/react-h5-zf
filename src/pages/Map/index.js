import React, { useEffect, useState } from "react";
import NavHeader from "../../components/navHeader";
import './index.scss'

const Map = () => {
    const [mapObj, setMap] = useState()
    useEffect(() => {
        initMap()
    }, [])

    // 初始化地图
    const initMap = () => {
        // 获取城市
        const { cityName, pingyin} = JSON.parse(localStorage.getItem('CITY_DATA'))
        const point = new window.BMapGL.Point(116.404, 39.915)
        // 初始化地图
        const map = new window.BMapGL.Map('container')
        setMap(map)
        // 创建解析地址
        const myGeo = new window.BMapGL.Geocoder();
        // 展示在地图上
        myGeo.getPoint(
            cityName, 
            async point => {
                if (point) {
                    // 初始化地图
                    map.centerAndZoom(point, 11)
                    // 添加常用控件
                    // map.addControl(new window.BMapG.NavigationControl)
                    // map.addControl(new window.BMapG.ScaleControl)
                    renderOverlays(pingyin)
                    map.adddOverlay(new window.BMapGL.Maker(point))
                }
        }, cityName)
        map.centerAndZoom(point, 15);
    }

    // 渲染覆盖物入口
    // 接收参数，获取信息
    // 获取覆盖物类型， 下级地图缩放
    const  renderOverlays = async (id) => {
        const res = [{cityName: '北京', value: 'beijing', count: 10, coord: {longitude: 122, latitude: 344}}, {cityName: '杭州', value: 'beijing', count: 12, coord: {longitude: 77, latitude: 88}}]
        const { nextZoom, type } = getTypeAndZoom()
        res.forEach(item => {
            createOverlays(item, nextZoom, type)
        })
    }

    // 判断覆盖物类型， 计算缩放级别
    // 区 - 11， >=10, <12
    // 镇 - 13, >=12 <14
    // 小区 - 15  >=14, <16
    const getTypeAndZoom = () => {
        const zoom = mapObj.getZoom()
        let nextZoom, type

        if (zoom >=10 && zoom <12) {
            //区
            nextZoom = 13
            type = 'circle'
        } else if (zoom >=12 && zoom <14) {
            // 镇
            nextZoom = 15
            type = 'circle'
        } else if (zoom >=14 && zoom <16) {
            type='rect'
        }
        return {
            nextZoom,
            type
        }
    }

    // 创建覆盖物
    const createOverlays = (data, zoom, type) => {
        const { coord: {longitude, latitude}, cityName, count, value} = data

        // 创建坐标
        const point = new window.BMapGL.Point(longitude, latitude)
        if (zoom === 'circle') {
            createCircle(point, cityName, count, value, zoom)
        } else if (zoom === 'rect') {
            // 小区
            createRect(point, cityName, count, value)
        }
    }

    const createCircle = (point, cityName, count, id, zoom) => {
        // 创建覆盖物
        const label = new window.BMapGL.Label('', {
            position: cityName,
            offset: new window.BMapGL.size(-35, -35)
        })
        label.id = id
        // 设置覆盖物内容
        label.setContent(`<div>
            <div>${cityName}</div>
            <div>${count}</div>
        </div>`)

        // 样式
        // label.setStyle(labelStyle)

        // 点击
        label.addEventListener('click', () => {
            // 获取数据
            renderOverlays(id)
            // 放大地图
            mapObj.centerAndZoom(point, zoom)
            setTimeout(() => {
                mapObj.createOverlays()
            }, 0)
            mapObj.adddOverlay(label)
        })
    }

    const createRect = (point, cityName, count, id) => {
        // 创建覆盖物
        const label = new window.BMapGL.Label('', {
            position: cityName,
            offset: new window.BMapGL.size(-50, -28)
        })
        label.id = id

        // 设置覆盖物内容 - 样式不一样
        label.setContent(`<div>
            <div>${cityName}</div>
            <div>${count}</div>
        </div>`)
         // 样式
        // label.setStyle(labelStyle)

        // 点击
        label.addEventListener('click', () => {
        })
        mapObj.adddOverlay(label)
    }


    return (
        <div className="map">
            <NavHeader>地图找房</NavHeader>
            <div id="container"></div>
        </div>
    )
}

export default Map
