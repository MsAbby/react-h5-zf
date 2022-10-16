import Home from './pages/Home';
import CityList from './pages/CityList';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';

function App() {
  return (
    <Router>
      <div className="App">
        {/* 配置导航菜单 */}
        <Link to='/home'>首页</Link>
        <Link to='/city'>城市选项</Link>
        {/* 配置路由 */}
        <Routes>
          <Route path='/home' element={<Home></Home>}></Route>
          <Route path='/city' element={<CityList></CityList>}></Route>
        </Routes>
      </div>
    </Router>
  );
}

export default App;
