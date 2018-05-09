import createReducer from '../../utils/createReducer'
import { ACTION_HANDLERS } from '../actions/user'
import initState from '../store/initState'
export default createReducer(initState.user, ACTION_HANDLERS)
