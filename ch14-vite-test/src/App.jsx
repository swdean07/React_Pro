import React, { useState, useCallback, useEffect } from 'react';
import './App.css';
import NewsPage from './pages/NewsPage';
import { Route, Routes, useNavigate, useParams } from 'react-router-dom';

const App = () => {
    // useParams로 URL에서 카테고리 추출
    const { category: urlCategory } = useParams();

    // category의 기본값을 'all'로 설정하고, URL에서 category 값을 가져옵니다.
    const [category, setCategory] = useState(urlCategory || 'all');

    const navigate = useNavigate();

    // category를 변경하는 함수
    const onSelect = useCallback((newCategory) => {
        setCategory(newCategory);
        // 새로운 카테고리를 URL에 반영
        navigate(`/${newCategory}`);
    }, [navigate]);

    // URL에 카테고리 변경 사항을 반영하도록 useEffect 사용
    useEffect(() => {
        if (urlCategory) {
            setCategory(urlCategory);
        }
    }, [urlCategory]);

    return (
        <div>
            <h1 className='react'>ch14 API 연동</h1>

            {/* 카테고리 선택 및 뉴스 페이지로의 라우팅 */}
            <Routes>
                <Route
                    path="/"
                    element={<NewsPage category={category} onSelect={onSelect} />}
                />
                <Route
                    path="/:category"
                    element={<NewsPage category={category} onSelect={onSelect} />}
                />
            </Routes>
        </div>
    );
};

export default App;
