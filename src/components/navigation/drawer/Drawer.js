import React, {Component, Fragment} from 'react'
import styleClasses from './Drawer.module.scss'
import BackDrop from '../../UI/backdrop/BackDrop'
import {NavLink} from 'react-router-dom'

const links = [
    {
        to: '/',
        label: 'Список тестов',
        exact: true
    },
    {
        to: '/auth',
        label: 'Авторизация',
        exact: false
    },
    {
        to: '/quiz-creator',
        label: 'Создать тест',
        exact: false
    }
]

class Drawer extends Component {

    renderLinks() {
        return links.map((link, index) => (
            <li key={index}>
                <NavLink
                    to={link.to}
                    exact={link.exact}
                    activeClassName={styleClasses.active}
                    onClick={() => this.props.onClose()}
                >
                    {link.label}
                </NavLink>
            </li>
        ))
    }

    render() {
        const cls = [styleClasses.Drawer] 
        if(!this.props.isOpen) {
            cls.push(styleClasses.close)
        }

        return (
            <Fragment>
                <nav className={cls.join(' ')}>
                    <ul>
                        {this.renderLinks()}
                    </ul>
                </nav>
                {this.props.isOpen ? <BackDrop onClick={this.props.onClose} /> : null}
            </Fragment>
        )
    }
}

export default Drawer