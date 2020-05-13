import React, { useState } from 'react'
import styleClasses from './Layout.module.scss'
import MenuToggle from '../../components/navigation/menutoggle/MenuToggle'
import Drawer from '../../components/navigation/drawer/Drawer'
import {connect} from 'react-redux'

const Layout = props => {
    const [state, setState] = useState({menu: false})

    const toggleMenuHandler = () => {
        setState({
            menu: !state.menu
        })
    }

    const menuCloseHandler = () => {
        setState({
            menu: false
        })
    }

    return (
        <div className={styleClasses.Layout}>
            <Drawer
                isOpen={state.menu}
                onClose={menuCloseHandler}
                isAuthenticated={props.isAuthenticated}
            />

            <MenuToggle
                onToggle={toggleMenuHandler}
                isOpen={state.menu}
            />

            <main>
                {props.children}
            </main>
        </div>
    )
}

function mapStateToProps(state) {
    return {
        isAuthenticated: !!state.auth.token
    }
}

export default connect(mapStateToProps)(Layout)
