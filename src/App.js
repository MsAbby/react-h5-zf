import Home from './pages/Home';
import Index from "./pages/Index";
import News from "./pages/News";
import HouseList from "./pages/HouseList";
import Profile from "./pages/Profile";

import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';

function App() {
  return (
    <Router>
      <div className="App">
        {/* 配置路由 */}
        <Routes>
          <Route path='/' element={<Navigate to='/home/index' replace />}></Route>
          <Route path='/home' exact element={<Home></Home>}>
            <Route path="/home/index" exact element={<Index />}></Route>
            <Route path="/home/news" exact element={<News />}></Route>
            <Route path="/home/list" exact element={<HouseList />}></Route>
            <Route path="/home/profile" exact element={<Profile />}></Route>
          </Route>
        </Routes>
      </div>
    </Router>
  );
}

export default App;
