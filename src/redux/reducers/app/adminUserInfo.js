import createReducer from '../../../utils/createReducer'
import { ACTION_HANDLERS } from '../../actions/app/adminUserInfo'
import initState from '../../store/initState'
export default createReducer(initState.adminUserInfo, ACTION_HANDLERS)
