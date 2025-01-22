import { useParams, useSearchParams } from 'react-router-dom';

function Category() {
  // URL 파라미터 가져오기
  const { name } = useParams();

  // 쿼리스트링 가져오기
  const [searchParams] = useSearchParams();
  const lang = searchParams.get('lang');

  // 기본 언어 처리 및 메시지 설정
  let displayLanguage;
  switch (lang) {
    case 'ko':
      displayLanguage = '한국어';
      break;
    case 'en':
      displayLanguage = 'English';
      break;
    case 'ja':
      displayLanguage = '日本語';
      break;
    default:
      displayLanguage = '언어 미지정 (기본: 한국어)'; // 기본값 처리
  }

  return (
    <div>
      <h2>Category: {name}</h2>
      <p>{`Language: ${displayLanguage}`}</p>
    </div>
  );
}

export default Category;
