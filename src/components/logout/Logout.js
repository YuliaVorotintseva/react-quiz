import React from 'react'
import {connect} from 'react-redux'
import {logout} from '../../store/actions/Auth'
import {Redirect} from 'react-router-dom'

class Logout extends React.Component {
    componentDidMount() {
        this.props.logout()
    }

    render() {
        return <Redirect to={'/'} />
    }
}

export default connect(null, {logout})(Logout)
