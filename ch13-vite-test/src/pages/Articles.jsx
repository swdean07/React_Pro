import { Outlet, NavLink } from 'react-router-dom';

const Articles = () => {
  const activeStyle = {
    color: 'green',
    fontSize: 21,
  };

  // 게시글 ID 배열로 관리
  const articleIds = [1, 2, 3];

  return (
    <div>
      {/* 게시글 목록 */}
      <ul>
        {articleIds.map((id) => (
          <ArticleItem key={id} id={id} activeStyle={activeStyle} />
        ))}
      </ul>
      {/* 하위 라우트 표시 영역 */}
      <Outlet />
    </div>
  );
};

// 단일 게시글 링크 컴포넌트
const ArticleItem = ({ id, activeStyle }) => (
  <li>
    <NavLink
      to={`/articles/${id}`}
      style={({ isActive }) => (isActive ? activeStyle : undefined)}
    >
      게시글 {id}
    </NavLink>
  </li>
);

export default Articles;
