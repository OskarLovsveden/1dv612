import { Route, Redirect } from 'react-router-dom'
import routes from '../../utils/routes.js'

const PublicRoute = (props) => {
    const { component: Component, restricted = false, isAuthenticated, ...rest } = props

    const render = (props) => {
        if (isAuthenticated && restricted) {
            return <Redirect to={routes.HOME} />
        }

        return <Component {...props} />
    }

    return <Route {...rest} render={render} />
}

export default PublicRoute