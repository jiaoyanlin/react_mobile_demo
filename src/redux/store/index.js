import { applyMiddleware, compose, createStore } from 'redux'
import { createRootReducer } from '../reducers'
import middlewares from './middlewares'
import enhancers from './enhancers'
// import syncHistoryWithStore from './syncHistoryWithStore'
// ======================================================
// 实例化 Store
// ======================================================
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose
const store = createStore(
  createRootReducer(),
  window.__INITIAL_STATE__ || {}, // 前后端同构（服务端渲染）数据同步
  composeEnhancers(
    applyMiddleware(...middlewares),
    ...enhancers
  )
)
export default store
// ======================================================
// 增强版 history
// ======================================================
// export const history = syncHistoryWithStore(store)
