import React, {Component, Fragment} from 'react'
import styleClasses from './Drawer.module.scss'
import BackDrop from '../../UI/backdrop/BackDrop'

const links = [
    1,2,3
]

class Drawer extends Component {
    renderLinks() {
        return links.map((link, index) => (
            <li key={index}>
                <a>Link {link}</a>
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