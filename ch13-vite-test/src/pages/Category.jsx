import { useParams, useSearchParams, Routes, Route } from 'react-router-dom';
import CategoryDetails from './CategoryDetails'; // CategoryDetails 컴포넌트 임포트

function Category() {
    const { name } = useParams();  // URL 파라미터에서 name을 가져옴
    const [searchParams] = useSearchParams();  // 쿼리 스트링을 가져옴
    const lang = searchParams.get('lang');  // 'lang' 쿼리 파라미터 값 가져오기

    return (
        <div>
            <h2>Category: {name}</h2>
            {lang && <p>Language: {lang}</p>}
            {/* 하위 라우트 설정 */}
            <Routes>
                <Route path="details" element={<CategoryDetails />} />
            </Routes>
        </div>
    );
}

export default Category;
