import React from 'react'
import Layout from './hoc/layout/Layout'
import Quiz from './containers/quiz/Quiz'
import Auth from './containers/auth/Auth'
import QuizCreator from './containers/quizcreator/QuizCreator'
import QuizList from './containers/quizlist/QuizList'
import {Route, Switch} from 'react-router-dom'

function App() {
  return (
    <Layout>
      <Switch>
        <Route path='/auth' component={Auth} />
        <Route path='/quiz-creator' component={QuizCreator} />
        <Route path='/quiz/:id' component={Quiz} />
        <Route path='/' component={QuizList} />
      </Switch>
    </Layout>
  )
}

export default App
