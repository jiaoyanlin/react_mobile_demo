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

#### 9、移动端适配 rem vw：

（1）参考文章[基于vw等viewport视区单位配合rem响应式排版和布局](http://www.zhangxinxu.com/wordpress/2016/08/vw-viewport-responsive-layout-typography/)，使用vw和rem实现移动端适配，具体就是在引入的主css中加入以下代码：

```
html {
  	font-size: 16px !important;
}

@media screen and (min-width: 375px) {
	html {
		/* iPhone6的375px尺寸作为16px基准，414px正好18px大小, 600 20px */
		font-size: calc(100% + 2 * (100vw - 375px) / 39) !important;
		font-size: calc(16px + 2 * (100vw - 375px) / 39) !important;
	}
}
@media screen and (min-width: 414px) {
	html {
		/* 414px-1000px每100像素宽字体增加1px(18px-22px) */
		font-size: calc(112.5% + 4 * (100vw - 414px) / 586) !important;
		font-size: calc(18px + 4 * (100vw - 414px) / 586) !important;
	}
}
@media screen and (min-width: 600px) {
	html {
		/* 600px-1000px每100像素宽字体增加1px(20px-24px) */
		font-size: calc(125% + 4 * (100vw - 600px) / 400) !important;
		font-size: calc(20px + 4 * (100vw - 600px) / 400) !important;
	}
}
@media screen and (min-width: 1000px) {
	html {
		/* 1000px往后是每100像素0.5px增加 */
		font-size: calc(137.5% + 6 * (100vw - 1000px) / 1000) !important;
		font-size: calc(22px + 6 * (100vw - 1000px) / 1000) !important;
	}
}
```

通过以上代码实现：仅用css就可以根据屏幕大小动态改变html根元素的基础字号大小，从而使得页面中使用rem布局的元素实现尺寸的动态变化。

（2）由于ui给出的设计稿是放大过的，比如以iPhone6的375px为基准的设计稿通常宽度时750px，为了后期书写代码的方便，这里使用less将由设计稿量出的px尺寸转换成rem，省去自己计算rem的麻烦：

```
/*
* .less文件
* iPhone6的375px尺寸作为16px基准（即此时1rem对应16px），
* 而此时设计稿对应的宽为750px，
* 所以移动端的rem大小 = 设计稿中量出的尺寸/2/16 rem
*/

.pxtorem(@pro, @px) {
    @{pro}: (@px / 16 / 2) * 1rem;
}
.test1 {
    .pxtorem(width, 200);
    .pxtorem(height, 200);
    .pxtorem(font-size, 32);
    background: #eee;
}
.test2 {
    width: 100px;
    height: 100px;
    font-size: 16px;
    background: #ddd;
}
```

放入实例中可以看到当屏幕为375px时，test1和test2两个元素大小、字号都是一致的，但是test1的大小、字号会随着屏幕变化而变化，而test2不会。

#### 10、使用less解决Retina屏幕1px边框问题：

（1）引入src/assets/less文件夹下的1px.less文件（详见项目文件夹下的源码）；

（2）使用方法：

```
// .less文件中

@import 'assets/less/1px.less';

.test1 {
    .pxtorem(width, 200);
    .pxtorem(height, 200);
    .pxtorem(font-size, 32);
    .b-1px(red, 0); // 全边框，参数为（边框颜色，圆角大小）
    // .b-1px(red, 10px);
    // .b-1px-t(red); // 上边框，其余还有b-1px-b、b-1px-tb、b-1px-l、b-1px-r
}
```
