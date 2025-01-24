import React, { useState, useEffect } from 'react';
import styled from 'styled-components';

// 스타일 컴포넌트 정의
const NewsItemBlock = styled.div`
  display: flex;
  .thumbnail {
    margin-right: 1rem;
    img {
      display: block;
      width: 160px;
      height: 170px;
      object-fit: cover;
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

const GetBusanRestaurants = ({ restaurantData }) => {
  const { MAIN_TITLE, ADDR1, ITEMCNTNTS, MAIN_IMG_THUMB, HOMEPAGE_URL } = restaurantData;
  const [data, setData] = useState(restaurantData || []);  // 부모에서 데이터 받기
  const [loading, setLoading] = useState(false);  // 로딩 상태
  const [error, setError] = useState(null);  // 에러 상태

  useEffect(() => {
    // restaurantData가 변경될 때마다 실행
    console.log('Updated restaurantData:', restaurantData);
    setData(restaurantData);  // restaurantData가 바뀌면 data 업데이트
  }, [restaurantData]);  // restaurantData가 변경될 때마다 실행

  // 데이터가 없으면 '데이터가 없습니다.' 메시지 표시
  if (!data || data.length === 0) {
    return <div>데이터가 없습니다.</div>;
  }

  return (
    <div>
      {data.map((item, index) => {
        const {
          MAIN_TITLE,
          CNTCT_TEL,
          ITEMCNTNTS,
          PLACE,
          USAGE_DAY_WEEK_AND_TIME,
          ADDR1,
          RPRSNTV_MENU,
          MAIN_IMG_THUMB,
          LAT,
          LNG,
        } = item;

        // 기본 값 처리
        const contactTel = CNTCT_TEL || '정보 없음';
        const place = PLACE || '정보 없음';
        const address = ADDR1 || '정보 없음';
        const menu = RPRSNTV_MENU || '정보 없음';
        const description = ITEMCNTNTS || '정보 없음';
        const lat = LAT || '위도 정보 없음';
        const lng = LNG || '경도 정보 없음';

        return (
          <NewsItemBlock>
      {MAIN_IMG_THUMB && (
        <div className="thumbnail">
          <a href={HOMEPAGE_URL} target="_blank" rel="noopener noreferrer">
            <img src={MAIN_IMG_THUMB} alt="thumbnail" />
          </a>
        </div>
      )}
      <div className="contents">
        <h2>
          제목: {MAIN_TITLE}
        </h2>
        <p>소개 : {ITEMCNTNTS}</p>
        <p>주소 : {ADDR1}</p>

      </div>
    </NewsItemBlock>
          <NewsItemBlock key={index}>
            {MAIN_IMG_THUMB && (
              <div className="thumbnail">
                <img src={MAIN_IMG_THUMB} alt="thumbnail" />
              </div>
            )}
            <div className="contents">
              <h2>{MAIN_TITLE}</h2>
              <p><strong>소개:</strong> {description}</p>
              <p><strong>전화번호:</strong> {contactTel}</p>
              <p><strong>장소:</strong> {place}</p>
              <p><strong>운영 시간:</strong> {USAGE_DAY_WEEK_AND_TIME || '정보 없음'}</p>
              <p><strong>대표 메뉴:</strong> {menu}</p>
              <p><strong>주소:</strong> {address}</p>
              <p><strong>위도:</strong> {lat}</p>
              <p><strong>경도:</strong> {lng}</p>
            </div>
          </NewsItemBlock>
        );
      })}
    </div>
  );
};

export default GetBusanRestaurants;