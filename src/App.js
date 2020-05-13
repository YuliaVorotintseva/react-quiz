import React, { useEffect } from 'react'
import Layout from './hoc/layout/Layout'
import Quiz from './containers/quiz/Quiz'
import Auth from './containers/auth/Auth'
import QuizCreator from './containers/quizcreator/QuizCreator'
import QuizList from './containers/quizlist/QuizList'
import Logout from './components/logout/Logout'
import {Route, Switch, Redirect, withRouter} from 'react-router-dom'
import {connect} from 'react-redux'
import {autoLogin} from './store/actions/Auth'

const App = props => {
  useEffect(() => props.autoLogin())

  let routes = (
    <Switch>
      <Route path='/auth' component={Auth} />
      <Route path='/quiz/:id' component={Quiz} />
      <Route path='/' exact component={QuizList} />
      <Redirect to='/' />
    </Switch>
  )

  if(props.isAuthenticated) {
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

function mapStateToProps(state) {
  return {
    isAuthenticated: !!state.auth.token
  }
}

function mapDispatchToProps(dispatch) {
  return {
    autoLogin: () => dispatch(autoLogin())
  }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(App))
