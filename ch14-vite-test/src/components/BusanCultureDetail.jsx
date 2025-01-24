import React, { useState, useEffect } from 'react';
import axios from 'axios';
import styled from 'styled-components';

// 스타일 컴포넌트 정의
const DetailBlock = styled.div`
  padding: 1rem;
  border: 1px solid #ddd;
  border-radius: 4px;
  margin: 1rem auto;
  width: 768px;

  @media screen and (max-width: 768px) {
    width: 100%;
    padding: 1rem;
  }

  h2 {
    margin-bottom: 0.5rem;
    font-size: 1.5rem;
  }

  p {
    margin: 0.5rem 0;
    line-height: 1.5;
  }

  a {
    color: #0077ff;
    text-decoration: none;

    &:hover {
      text-decoration: underline;
    }
  }
`;

const formatDate = (isoString) => {
  const date = new Date(isoString);
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
};

const BusanCultureDetail = () => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        setError(null);
        const response = await axios.get(
          'http://apis.data.go.kr/6260000/BusanCultureClassicDetailService/getBusanCultureClassicDetail?serviceKey=C65UiiVCboEZ3iy%2Fic1trktk3C%2BpYs3fl4bMt9vpuPqhT1qW5MI45CPxpepD2uevhJ09kLmL1XaH5UKNpxkb0g%3D%3D&numOfRows=10&pageNo=1&res_no=2020020008'
        );
        const item = response.data.response.body.items.item[0];
        setData(item);
      } catch (e) {
        setError('데이터를 불러오는 중 오류가 발생했습니다.');
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) return <DetailBlock>데이터를 불러오는 중입니다...</DetailBlock>;
  if (error) return <DetailBlock>{error}</DetailBlock>;

  if (!data) return <DetailBlock>데이터가 없습니다.</DetailBlock>;

  return (
    <DetailBlock>
      <h2>{data.title}</h2>
      <p><strong>장소:</strong> {data.place_nm}</p>
      <p><strong>공연 시작일:</strong> {formatDate(data.op_st_dt)}</p>
      <p><strong>공연 종료일:</strong> {formatDate(data.op_ed_dt)}</p>
      <p><strong>평점:</strong> {data.avg_star || '평가 없음'}</p>
      <a href={data.dabom_url} target="_blank" rel="noopener noreferrer">
        공연 정보 더보기
      </a>
    </DetailBlock>
  );
};

export default BusanCultureDetail;

