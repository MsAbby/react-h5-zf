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

 ## React Hooks 18 useEffect 执行2次或多次
 `
 2.1 方式一：严格模式
	简单粗暴，一般是StrictMode导致的，就是index.js页面的代码：
 `
 `
 2.2 方式2：使用useRef

 const renderRef = useRef(true)
    useEffect(() => {
        // 重要!!!
        if (renderRef.current) {
            renderRef.current = false
            return 
        }

        const result = fomatCityData(data.citys)
        console.log(result)
        if (result) {
            setCityList(result)
        }
    }, [])
 `


## react hook使用useState更新数组，无法更新问题
 	#### 1. 涉及到可变对象和不可变对象，在vue和react中，如果更新可变对象时，可能会引起视图更新，这是因为，vue和react默认都是浅监听，只会监听数据的第一层，如果数据是引用类型，内层数据发生改变，并不会监听到。
	#### 2. 解决方法：
    ````
	// 1. 先原数组浅拷贝，赋值给新数组
	// 2. 再修改新数组（不影响原状态），将修改后的新数组使用setValue传递进去，这样就会引起视图更新。

	const [cityList, setCityList] = useState({})
    const [cityIndex, setCityIndex] = useState([])

	// 引用数据类型，先拷贝后更新
	setCityList({...cityList, ...result.cityList})
	setCityIndex([...cityIndex, ...result.cityIndex])


	````