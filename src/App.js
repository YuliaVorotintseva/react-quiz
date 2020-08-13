import React from 'react'
import Layout from './hoc/layout/Layout'
import Quiz from './containers/quiz/Quiz'
import Auth from './containers/auth/Auth'
import QuizCreator from './containers/quizcreator/QuizCreator'
import QuizList from './containers/quizlist/QuizList'
import Logout from './components/logout/Logout'
import {Route, Switch, Redirect, withRouter} from 'react-router-dom'
import {connect} from 'react-redux'
import {autoLogin} from './store/actions/Auth'

class App extends React.Component {
  componentDidMount() {
    this.props.autoLogin()
  }

  render() {
    let routes = (
      <Switch>
        <Route path='/auth' component={Auth} />
        <Route path='/quiz/:id' component={Quiz} />
        <Route path='/' exact component={QuizList} />
        <Redirect to='/' />
      </Switch>
    )

    if(this.props.isAuthenticated) {
      routes = (
        <Switch>
          <Route path='/quiz-creator' component={QuizCreator} />
          <Route path='/quiz/:id' component={Quiz} />
          <Route path='/logout' component={Logout} />
          <Route path='/' exact component={QuizList} />
          <Redirect to='/' />
        </Switch>
      )
    }

    return (
      <Layout>
        {routes}
      </Layout>
    )
  }
}

const mapStateToProps = state => ({isAuthenticated: !!state.auth.token})

export default withRouter(connect(mapStateToProps, {autoLogin})(App))
