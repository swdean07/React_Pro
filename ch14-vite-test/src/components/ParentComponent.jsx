import React, { useState, useEffect } from 'react';
import axios from 'axios';
import GetBusanRestaurants from './GetBusanRestaurants';  // 자식 컴포넌트

const ParentComponent = () => {
    const [restaurantData, setRestaurantData] = useState([]);  // restaurantData 상태
    const [loading, setLoading] = useState(true);  // 로딩 상태
    const [error, setError] = useState(null);  // 에러 상태

    // 데이터 비동기적으로 받아오기
    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get('API_URL');  // 실제 API URL로 교체
                setRestaurantData(response.data.items);  // 데이터가 있으면 state에 저장
            } catch (e) {
                setError('데이터를 불러오는 데 실패했습니다.');
            } finally {
                setLoading(false);  // 로딩 완료
            }
        };
        fetchData();
    }, []);

    // 로딩 중일 때
    if (loading) return <div>데이터를 불러오는 중...</div>;

    // 에러 발생 시
    if (error) return <div>{error}</div>;

    // 데이터를 받았을 때 GetBusanRestaurants 컴포넌트로 전달
    return <GetBusanRestaurants restaurantData={restaurantData} />;
};

export default ParentComponent;