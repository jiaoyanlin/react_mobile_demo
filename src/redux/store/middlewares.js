// ======================================================
// 配置中间件
// ======================================================
import thunk from 'redux-thunk'
import { createLogger } from 'redux-logger';
// import { historyMiddleware } from './syncHistoryWithStore'
// const middlewares = [thunk, historyMiddleware]
const middlewares = [thunk]
// if (__DEV__) {
/** Redux Logger (P.S: 打印日志会造成轻微的卡顿) **/
// }
const logger = createLogger();
middlewares.push(logger)

export default middlewares
