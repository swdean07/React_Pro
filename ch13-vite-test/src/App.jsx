import './App.css';
import { Route, Routes } from 'react-router-dom';
import About from './pages/About';
import Home from './pages/Home';
import Profile from './pages/Profile';
import Articles from './pages/Articles';
import Article from './pages/Article';
import Layout from './Layout';
import NotFound from './pages/NotFound';
import Login from './pages/Login';
import MyPage from './pages/MyPage';
import Category from './pages/Category';
import ProtectedRoute from './pages/ProtectedRoute';
import LanguageSelector from './pages/LanguageSelector';
import CategoryDetails from './pages/CategoryDetails'; // 이미 임포트됨

function App() {
  const isAuthenticated = false;

  return (
    <>
      <h1 className="react">ch13. 리액트 라우팅</h1>
      <Routes>
        <Route element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/category/:name" element={<Category />}>
            {/* CategoryDetails는 Category 컴포넌트 내에서 하위 라우트로 처리됨 */}
            <Route path="details" element={<CategoryDetails />} />
          </Route>
          <Route path="/articles" element={<Articles />}>
            <Route path=":id" element={<Article />} />
          </Route>
          <Route
            path="/mypage"
            element={
              <ProtectedRoute isAuthenticated={isAuthenticated}>
                <MyPage />
              </ProtectedRoute>
            }
          />
          <Route path="/login" element={<Login />} />
          <Route path="/language" element={<LanguageSelector />} />
          <Route path="*" element={<NotFound />} />
        </Route>
      </Routes>
    </>
  );
}

export default App;
