// import xhr from 'SERVICE/xhr/'
// import msgService from 'SERVICE/msgService'
// ================================
// Action Type
// ================================
const FETCH_ADMINUSERINFO = 'FETCH_ADMINUSERINFO'
const CHANGE_ADMINUSERINFO_REALNAME = 'CHANGE_ADMINUSERINFO_REALNAME'
const CHANGE_ADMINUSERINFO_LOADING = 'CHANGE_ADMINUSERINFO_LOADING'
const CHANGE_ADMINUSERINFO_GETSECTION = 'CHANGE_ADMINUSERINFO_GETSECTION'
const CHANGE_ADMINUSERINFO_USERNAME = 'CHANGE_ADMINUSERINFO_USERNAME'
// ================================
// Action Creator
// ================================
const fetchAdminuserinfo = adminUserInfo => dispatch => {
  return dispatch({
    type: FETCH_ADMINUSERINFO,
    payload: adminUserInfo
  })
}
const changeAdminuserinfoRealname = realName => dispatch => {
  return dispatch({
    type: CHANGE_ADMINUSERINFO_REALNAME,
    payload: realName
  })
}
const changeAdminuserinfoLoading = realName => dispatch => {
  return dispatch({
    type: CHANGE_ADMINUSERINFO_LOADING,
    payload: realName
  })
}
const changeAdminuserinfoGetsection = realName => dispatch => {
  return dispatch({
    type: CHANGE_ADMINUSERINFO_GETSECTION,
    payload: realName
  })
}
const changeAdminuserinfoUsername = userName => dispatch => {
  return dispatch({
    type: CHANGE_ADMINUSERINFO_USERNAME,
    payload: userName
  })
}
/* default 导出所有 Action Creators */
export default {
  fetchAdminuserinfo,
  changeAdminuserinfoRealname,
  changeAdminuserinfoLoading,
  changeAdminuserinfoGetsection,
  changeAdminuserinfoUsername
}
// ================================
// Action handlers for Reducer
// 本来更新 state 是 Reducer 的责任
// 但要把 ActionType 导出又引入实在太麻烦
// 且在 Reducer 中写 switch-case 实在太不优雅
// 故在此直接给出处理逻辑
// ================================
export const ACTION_HANDLERS = {
  [FETCH_ADMINUSERINFO]: (adminUserInfo, { payload }) => {
    // console.log('-------------------------->>>>>>>>>>>>>>>>>>>>>', adminUserInfo)
    return {
      ...adminUserInfo,
      phone: payload.phone,
      realName: payload.realName,
      userName: payload.userName,
      adminUserId: payload.adminUserId,
      adminUserStatusCd: payload.adminUserStatusCd,
      serverId: payload.serverId,
      type: payload.type,
      companyName: payload.companyName,
      createTime: payload.createTime,
      clientId: payload.clientId,
      expirationTime: payload.expirationTime,
      wxCount: payload.wxCount
    }
  },
  [CHANGE_ADMINUSERINFO_REALNAME]: (adminUserInfo, { payload }) => {
    return {
      ...adminUserInfo,
      realName: payload
    }
  },
  [CHANGE_ADMINUSERINFO_LOADING]: (adminUserInfo, { payload }) => {
    return {
      ...adminUserInfo,
      helperLoading: false
    }
  },
  [CHANGE_ADMINUSERINFO_GETSECTION]: (adminUserInfo, { payload }) => {
    return {
      ...adminUserInfo,
      getAllSection: true
    }
  },
  [CHANGE_ADMINUSERINFO_USERNAME]: (adminUserInfo, { payload }) => {
    return {
      ...adminUserInfo,
      userName: payload
    }
  }
}
