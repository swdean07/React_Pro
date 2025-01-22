import { Outlet, useNavigate, NavLink } from 'react-router-dom';

const Layout = () => {

    // Navigation 기능
    const navigate = useNavigate();

    const goBack = () => {
        navigate(-1); // 이전 페이지로 이동
    };

    const goArticles = () => {
        navigate('/articles', { replace: true }); // Articles 경로로 이동
    };

    return (
        <div>
            <header
                style={{
                    background: 'lightgray',
                    padding: 16,
                    fontSize: 24,
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                }}>
                <nav>
                    <NavLink to="/" style={{ margin: '0 10px' }}>
                        홈
                    </NavLink>
                    <NavLink to="/about" style={{ margin: '0 10px' }}>
                        소개
                    </NavLink>
                    <NavLink to="/articles" style={{ margin: '0 10px' }}>
                        게시글
                    </NavLink>
                </nav>
                <div style={{ display: 'flex', gap: '10px' }}>
                    <button onClick={goBack}>뒤로가기</button>
                    <button onClick={goArticles}>게시글 목록</button>
                </div>
            </header>
            <main style={{ padding: '20px' }}>
                <Outlet />
            </main>
        </div>
    );
};

export default Layout;
