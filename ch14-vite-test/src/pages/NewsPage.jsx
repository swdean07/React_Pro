import { useParams } from 'react-router-dom';
import Categories from '../components/Categories';
import NewsList from '../components/NewsList';

const NewsPage = () => {
    // URL 파라미터에서 category를 가져옴, 없으면 기본값 'all'
    const params = useParams();
    const category = params.category || 'all'; // 카테고리가 없으면 'all'을 기본값으로 설정

    return (
        <>
            {/* 카테고리 선택 컴포넌트에 category 상태를 전달 */}
            <Categories category={category} />

            {/* NewsList에 category 값을 전달하여 해당 카테고리 뉴스 목록을 표시 */}
            <NewsList category={category} />
        </>
    );
};

export default NewsPage;

