import { Link, Outlet, NavLink } from 'react-router-dom';

const Articles = () => {
    const activeStyle = {
        color: 'green',
        fontSize: 21,
    };
    return (
        <div>
            {/* 공통으로 출력하고 싶은 요소를 적기 */}
            <Outlet />
            <ul>
                {/* <li>
                    <NavLink
                        to="/articles/1"
                        style={({ isActive }) => (isActive ? activeStyle : undefined)}
                    >
                        게시글 1
                    </NavLink>
                </li>
                <li>
                    <NavLink
                        to="/articles/2"
                        style={({ isActive }) => (isActive ? activeStyle : undefined)}
                    >
                        게시글 2
                    </NavLink>
                </li>
                <li>
                    <NavLink
                        to="/articles/3"
                        style={({ isActive }) => (isActive ? activeStyle : undefined)}
                    >
                        게시글 3
                    </NavLink>
                </li> */}
                {/* 리팩토링 적용하기 */}
                <ArticleItem id={1} />
                <ArticleItem id={2} />
                <ArticleItem id={3} />
            </ul>
        </div>
    );
};

//리팩토링 도구. 
const ArticleItem = ({ id }) => {
    const activeStyle = {
        color: 'green',
        fontSize: 21,
    };

    return (
        <li>
            <NavLink
                to={`/articles/${id}`}
                style={({ isActive }) => (isActive ? activeStyle : undefined)}
            >
                게시글 {id}
            </NavLink>
        </li>
    );
};

export default Articles;