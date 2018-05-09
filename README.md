#### 1、项目初始化：

```
npm install -g create-react-app // 安装全局命令

create-react-app my-app-demo // 创建项目

cd my-app-demo // 进入项目目录

npm run eject // 放出配置文件，执行后项目目录下多了config和scrips目录

yarn // 安装依赖

yarn start // 启动项目，浏览器会自动打开http://localhost:3000/，项目启动成功
```

#### 2、引入react router 4：

（1）中文文档：http://reacttraining.cn/web/guides/quick-start

（2）安装依赖

```
yarn add react-router-dom
# 或者，不使用 yarn
npm install react-router-dom
```

（3）根据官方示例，在src/App.js粘贴如下代码：

```
import React from 'react'
import {
  BrowserRouter as Router,
  Route,
  Link
} from 'react-router-dom'

const BasicExample = () => (
  <Router>
    <div>
      <ul>
        <li><Link to="/">Home</Link></li>
        <li><Link to="/about">About</Link></li>
        <li><Link to="/topics">Topics</Link></li>
      </ul>

      <hr/>

      <Route exact path="/" component={Home}/>
      <Route path="/about" component={About}/>
      <Route path="/topics" component={Topics}/>
    </div>
  </Router>
)

const Home = () => (
  <div>
    <h2>Home</h2>
  </div>
)

const About = () => (
  <div>
    <h2>About</h2>
  </div>
)

const Topics = ({ match }) => (
  <div>
    <h2>Topics</h2>
    <ul>
      <li>
        <Link to={`${match.url}/rendering`}>
          Rendering with React
        </Link>
      </li>
      <li>
        <Link to={`${match.url}/components`}>
          Components
        </Link>
      </li>
      <li>
        <Link to={`${match.url}/props-v-state`}>
          Props v. State
        </Link>
      </li>
    </ul>

    <Route path={`${match.url}/:topicId`} component={Topic}/>
    <Route exact path={match.url} render={() => (
      <h3>Please select a topic.</h3>
    )}/>
  </div>
)

const Topic = ({ match }) => (
  <div>
    <h3>{match.params.topicId}</h3>
  </div>
)

export default BasicExample
```

（4）此时浏览器中已经可以看到成功引入react-router了

#### 3、引入antd mobile

> 官网提供了为eject前关于create-react-app引入antd-mobile的方案，可以参考[教程](https://mobile.ant.design/docs/react/use-with-create-react-app-cn)进行安装；本项目由于前面已经用npm run eject将配置暴露出来，采用另一种防范安装

（1）安装依赖：

```
cnpm install babel-plugin-import --save-dev

cnpm install antd-mobile --save
```

（2）配置按需加载，在config/webpack.config.dev.js中修改如下代码，即在babel-loader中添加plugins：

```
// Process JS with Babel.
{
    test: /\.(js|jsx|mjs)$/,
    include: paths.appSrc,
    loader: require.resolve('babel-loader'),
    options: {
        cacheDirectory: true,
        // 新增代码-----开始
        plugins: ['transform-runtime', ['import', {
            libraryName: 'antd-mobile',
            style: 'css'
        }]]
        // 新增代码-----结束
    },
},
```
同理修改config/webpack.config.prod.js中相关代码

（3）执行`npm start`运行项目，就可以体验antd mobile了，

```
import { Button } from 'antd-mobile';

<Button>Start</Button>
```


#### 4、引入路径别名，修改 webpack.config.dev 与 webpack.config.prod 两个文件

```
function resolvePath(dir) {
    return path.join(__dirname, '..', dir)
}

// 修改
alias: {
    'react-native': 'react-native-web',
    // 加入以下配置
    '@': resolvePath('src')
}
```

至此以后引入文件可以这么写：`import xxx from '@/yyy/xxx'`

#### 5、引入redux：较复杂，查看代码提交记录

#### 6、引入less：

（1）安装依赖：

```
npm install --save-dev less-loader less
```

（2）修改 webpack.config.dev 与 webpack.config.prod 两个文件

查找 ：`exclude`

原本的 `exclude: [/\.(js|jsx|mjs)$/, /\.html$/, /\.json$/],`

修改为 `exclude: [/\.html$/, /\.(js|jsx|mjs)$/, /\.(css|less)$/, /\.json$/, /\.bmp$/, /\.gif$/, /\.jpe?g$/, /\.png$/],`


查找：`test: /.css$/`

原本的 `test: /\.css$/,`

修改为 `test: /\.(css|less)$/,`


在这个test的下面找到use，添加loader:

```
use: [  
    {...},
    {...},
    {
        loader: require.resolve('less-loader') // compiles Less to CSS
    }
],
```

#### 7、修复打包后的文件直接打开时一片空白：

pageage.json 文件增加配置："homepage": ".",

#### 8、antd mobile定制主题：

（1）首先，你的项目里需要包含如下依赖 babel-plugin-import less less-loader style-loader css-loader

（2）配置 babel-plugin-import 确保加载 antd-mobile less 文件：

```
{
    ...
    "plugins": [
        ["import", {"libraryName": "antd-mobile", "style": true}],
        ...
    ]
}
```

（3）新建文件antMobileTheme.js，用于覆盖ant自带的less变量，[变量表](https://github.com/ant-design/ant-design-mobile/blob/master/components/style/themes/default.less)：

```
const theme = {
    "brand-primary": "yellow",
    "color-text-base": "red",
    "fill-base": '#0b0'
}
module.exports = theme
```

（4）修改 webpack.config.dev 与 webpack.config.prod 两个文件

```
const theme = require('./antMobileTheme');

module.exports = {
    ...
    module: {
        ...
        rules: [
            ...
            {
                test: /\.less$/,
                use: [
                    'style-loader',
                    'css-loader',
                    // 其实就是修改下面这句为现在这样
                    { loader: 'less-loader', options: { modifyVars: theme } },
                ],
                include: /node_modules/,
            },
            ...
        ],
    },
    ...
}

```

