import React, { Component, Fragment } from 'react'
import styleClasses from './Drawer.module.scss'
import BackDrop from '../../UI/backdrop/BackDrop'
import {NavLink} from 'react-router-dom'

class Drawer extends Component{
    renderLinks(links) {
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

        const links = [
        {
                to: '/',
                label: 'Список тестов',
                exact: true
            }
        ]

        if(this.props.isAuthenticated) {
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
                        {this.renderLinks(links)}
                    </ul>
                </nav>
                {this.props.isOpen ? <BackDrop onClick={this.props.onClose} /> : null}
            </Fragment>
        )
    }
}

export default Drawer