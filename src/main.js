import ReactDOM from 'react-dom'
import React from 'react'

import Style from './styles/main'

import Application from './scripts/components/application'
import UserPanel from './scripts/components/user-panel'
import GroupPanel from './scripts/components/group-panel'

import { Router, Route, IndexRoute, IndexRedirect, browserHistory } from 'react-router'

ReactDOM.render(<Router history={browserHistory}>
    <Route path="/" component={Application} >
    	<IndexRedirect to="user" />
    	<Route path="user" component={UserPanel} />
    	<Route path="groups/:groupId" component={GroupPanel} />
    </Route>
</Router>, document.getElementById('Root'))
