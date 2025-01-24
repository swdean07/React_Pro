import React, { useEffect, useState } from 'react';
import axios from 'axios';
import styled from 'styled-components';

// 스타일 컴포넌트 정의 (NewsItemBlock 스타일 재사용)
const NewsItemBlock = styled.div`
  display: flex;
  .thumbnail {
    margin-right: 1rem;
    img {
      display: block;
      width: 160px;
      height: 170px;
      object-fit: cover;
      border-radius: 8px;
    }
  }
  .contents {
    h2 {
      margin: 0;
      a {
        color: black;
        text-decoration: none;
      }
    }
    p {
      margin: 0;
      line-height: 1.5;
      margin-top: 0.5rem;
      white-space: normal;
    }
  }
  & + & {
    margin-top: 3rem;
  }
`;

// 스타일 컴포넌트 (상세 정보를 위한 레이아웃)
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

  img {
    width: 100%;
    height: auto;
    border-radius: 4px;
  }
`;

const GetBusanRestaurants = () => {
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

                // 응답 데이터 확인
                const items = response.data?.response?.body?.items?.item;
                if (Array.isArray(items) && items.length > 0) {
                    setData(items);
                } else {
                    setError('데이터가 없습니다.');
                }
            } catch (e) {
                setError('API 요청 중 에러가 발생했습니다.');
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
        <div>
            {data.map((item) => {
                const {
                    MAIN_TITLE,
                    CNTCT_TEL,
                    ITEMCNTNTS,
                    PLACE,
                    USAGE_DAY_WEEK_AND_TIME,
                    ADDR1,
                    RPRSNTV_MENU,
                    MAIN_IMG_NORMAL,
                    HOMEPAGE_URL,
                    LAT,
                    LNG,
                } = item;

                return (
                    <NewsItemBlock key={LAT + LNG}>
                        <div className="thumbnail">
                            <img src={MAIN_IMG_NORMAL || 'default-thumbnail.jpg'} alt={MAIN_TITLE} />
                        </div>
                        <div className="contents">
                            <h2>{MAIN_TITLE}</h2>
                            <p><strong>장소:</strong> {PLACE}</p>
                            <p><strong>전화번호:</strong> {CNTCT_TEL}</p>
                            <p><strong>주소:</strong> {ADDR1}</p>
                            <p><strong>운영 시간:</strong> {USAGE_DAY_WEEK_AND_TIME}</p>
                            <p><strong>대표 메뉴:</strong> {RPRSNTV_MENU}</p>
                            <p><strong>소개:</strong> {ITEMCNTNTS}</p>
                            {HOMEPAGE_URL && (
                                <a href={HOMEPAGE_URL} target="_blank" rel="noopener noreferrer">
                                    홈페이지 바로가기
                                </a>
                            )}
                        </div>
                    </NewsItemBlock>
                );
            })}
        </div>
    );
};

export default GetBusanRestaurants;

