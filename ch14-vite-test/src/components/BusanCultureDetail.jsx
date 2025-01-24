import React from 'react';
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

// 날짜 포맷 함수
const formatDate = (isoString) => {
  if (!isoString) return '날짜 정보 없음'; // 예외 처리 추가
  const date = new Date(isoString);
  if (isNaN(date)) return '날짜 형식 오류'; // 잘못된 날짜 형식 처리
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
};

// BusanCultureDetail 컴포넌트
const BusanCultureDetail = ({ article }) => {
  if (!article) {
    return <NewsItemBlock>데이터가 없습니다.</NewsItemBlock>;
  }

  // article이 존재하는 경우에만 구조 분해 할당
  const { title, place_nm, op_st_dt, op_ed_dt, avg_star, dabom_url } = article || {};

  return (
    <NewsItemBlock>
      <div className="contents">
        <h2>{title || '제목 정보 없음'}</h2> {/* 기본값 처리 */}
        <p><strong>장소:</strong> {place_nm || '정보 없음'}</p>
        <p><strong>공연 시작일:</strong> {formatDate(op_st_dt)}</p>
        <p><strong>공연 종료일:</strong> {formatDate(op_ed_dt)}</p>
        <p><strong>평점:</strong> {avg_star || '평가 없음'}</p>
        {dabom_url ? (
          <a href={dabom_url} target="_blank" rel="noopener noreferrer">
            공연 정보 더보기
          </a>
        ) : (
          <p>공연 정보 링크가 없습니다.</p>
        )}
      </div>
    </NewsItemBlock>
  );
};

export default BusanCultureDetail;