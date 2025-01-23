import { useParams, useSearchParams, Outlet, useNavigate } from 'react-router-dom';

const Category = () => {
  // URL 파라미터 가져오기
  const { name } = useParams();

  // 쿼리스트링 가져오기
  const [searchParams] = useSearchParams();
  const lang = searchParams.get('lang');

  const navigate = useNavigate();
  const goHome = () => {
    navigate('/')
  }

  // 기본 언어 처리 및 메시지 설정
  const displayLanguage = (() => {
    switch (lang) {
      case 'ko':
        return '한국어';
      case 'en':
        return 'English';
      case 'ja':
        return '日本語';
      default:
        return '언어 미지정 (기본: 한국어)'; // 기본값 처리
    }
  })();

  return (
    <div>
      <button onClick={goHome}>홈가기</button>
      <h1>Category 페이지입니다.</h1>
      <h2>파라미터 받기 예시 useParams() 이용: {name} </h2>
      <h2>Category: {name}</h2>
      <h2>중첩 라우팅 화면 표시</h2>
      <p>{`Language: ${displayLanguage}`}</p>
      <Outlet />
    </div>
  );
};

export default Category;

