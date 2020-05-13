import React, { Fragment } from 'react'
import styleClasses from './Drawer.module.scss'
import BackDrop from '../../UI/backdrop/BackDrop'
import {NavLink} from 'react-router-dom'

const Drawer = props => {
    function renderLinks(links) {
        return links.map((link, index) => (
            <li key={index}>
                <NavLink
                    to={link.to}
                    exact={link.exact}
                    activeClassName={styleClasses.active}
                    onClick={() => props.onClose()}
                >
                    {link.label}
                </NavLink>
            </li>
        ))
    }

    const cls = [styleClasses.Drawer] 
    if(!props.isOpen) {
        cls.push(styleClasses.close)
    }

    const links = [
       {
            to: '/',
            label: 'Список тестов',
            exact: true
        }
    ]

    if(props.isAuthenticated) {
        links.push(
            {
                to: '/quiz-creator',
                label: 'Создать тест',
                exact: false
            }
        )

        links.push(
            {
                to: '/logout',
                label: 'Выйти',
                exact: false
            }
        )
    } else {
        links.push(
            {
                to: '/auth',
                label: 'Авторизация',
                exact: false
            }
        )
    }

    return (
        <Fragment>
            <nav className={cls.join(' ')}>
                <ul>
                    {renderLinks(links)}
                </ul>
            </nav>
            {props.isOpen ? <BackDrop onClick={props.onClose} /> : null}
        </Fragment>
    )
}

export default Drawer