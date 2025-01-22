import { useParams, useSearchParams } from 'react-router-dom';

function Category() {
  // URL 파라미터 가져오기
  const { name } = useParams();

  // 쿼리스트링 가져오기
  const [searchParams] = useSearchParams();
  const lang = searchParams.get('lang');

  return (
    <div>
      <h2>Category: {name}</h2>
      <p>Language: {lang || 'default'}</p>
    </div>
  );
}

export default Category;
