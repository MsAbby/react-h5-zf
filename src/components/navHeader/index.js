import React from "react";
import { NavBar } from 'antd-mobile'
import { useNavigate } from "react-router-dom";
import propTypes from 'prop-types'

import './index.scss'

const NavHeader = ({children, onLeftClick}) => {
    // 添加prop-types校验
    NavHeader.propTypes = {
        children: propTypes.string.isRequired,
        onLeftClick: propTypes.func
    }

    const navigate = useNavigate()

    // 默认返回事件
    // onLeftClick单独处理的事件
    const backPage = () => {
        console.log('11')
        navigate(-1)
    }

    return (
        <NavBar
            onBack={onLeftClick || backPage}
            className="navbar-box"
        >
            {children}
        </NavBar>
    )
}

export default NavHeader