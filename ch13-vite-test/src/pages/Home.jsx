import { Link } from 'react-router-dom';

const Home = () => {
    return (
        <div>
            <p>가장 먼저 보여지는 페이지입니다.</p>
            <Link to="/about">소개</Link>
            <ul>
                <li>
                    <Link to="/about">소개</Link>
                </li>
                <li>
                    <Link to="/profiles/velopert">velopert의 프로필</Link>
                </li>
                <li>
                    <Link to="/profiles/gildong">gildong의 프로필</Link>
                </li>
                <li>
                    <Link to="/profiles/swh">swh의 프로필</Link>
                </li>
                <li>
                    <Link to="/Articles">게시글 목록</Link>
                </li>
                <li>
                    <Link to="/mypage">마이페이지</Link>
                </li>
                <li>
                    <Link to="/login">로그인</Link>
                </li>
            </ul>
        </div>
    );
};

export default Home;