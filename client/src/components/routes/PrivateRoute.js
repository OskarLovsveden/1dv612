import { Route, Redirect } from 'react-router-dom'
import routes from '../../utils/routes.js'

const PrivateRoute = (props) => {
    const { component: Component, isAuthenticated, ...rest } = props

    const render = (props) => {
        if (!isAuthenticated) {
            return <Redirect to={routes.LOGIN} />
        }

        return <Component {...props} />
    }

    return <Route {...rest} render={render} />
}

export default PrivateRoute