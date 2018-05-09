import createReducer from '../../utils/createReducer'
import { ACTION_HANDLERS } from '../actions/test'
import initState from '../store/initState'
export default createReducer(initState.test, ACTION_HANDLERS)
