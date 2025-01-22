import { useParams } from 'react-router-dom';

const CategoryDetails = () => {
    const { name } = useParams();  // useParams()를 호출할 때 괄호를 추가해야 합니다.

    return (
        <div>
            <h2>Category Details</h2>
            <p>현재 카테고리: <strong>{name}</strong></p>
            <p>이 페이지는 카테고리의 상세 정보를 보여줍니다.</p>
        </div>
    );
};

export default CategoryDetails;