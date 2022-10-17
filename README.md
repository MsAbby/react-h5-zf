### router 报错

`js
utils.ts:757 Uncaught Error: A <Route> is only ever to be used as the child of <Routes> element, never rendered directly. Please wrap your <Route> in a <Routes>.

// 解决方案： 报错原因是react-router-dom依赖为6版本，需要使用6版本的写法 、  或者直接安装6以下版本依赖
`
### v5 版本
`js
// `Router`直接包裹着`Route组件`
<Router>
	<Link to="/">home</Link> 
	<Link to="/about">about</Link>
	<Route path="/"  component={Home} />
	<Route path="/about" component={About} />
</Router>
`
### v6 版本
`js
// `Route`需要先被`Routes`组件包裹，再被路由器包裹
// 其次把原来的`component`改为`element`, element 里面是组件的样式
<Router>
	<Link to="/">home</Link>
	<Link to="/about">about</Link>
	<Routes>
	    <Route path="/"  element={<Home/>} />
	    <Route path="/about" element={<About/>} />
	<Routes>
</Router>
`


## 报错 useHistory

`js
ERROR in ./src/pages/Home/index.js 13:18-28
export 'useHistory' (imported as 'useHistory') was not found in 'react-router-dom' (possible exports: 

// react-router-dom v5 是使用 useHistory 

// v6开始 useNavigate取代了原先版本中的useHistory
`

## 问题 antd-mobile 引入tabbar 不显示
 1. 解决方案： 把路由写在一起， 同时引入<Outlet />： 代表展示的位置
