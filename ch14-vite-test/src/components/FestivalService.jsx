import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

const NewsItemBlock = styled.div`
  display: flex;
  border: 1px solid #e2e2e2;
  border-radius: 8px;
  padding: 1rem;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  margin-bottom: 1.5rem;

  .thumbnail {
    margin-right: 1rem;
    img {
      display: block;
      width: 160px;
      height: 170px;
      object-fit: cover;
      border-radius: 4px;
    }
  }

  .contents {
    h2 {
      margin: 0;
      a {
        color: black; // 색상을 검정으로 통일
        text-decoration: none;
      }
    }
    p {
      margin: 0;
      line-height: 1.5;
      margin-top: 0.5rem;
    }
  }

  & + & {
    margin-top: 3rem; // 항목 사이에 여백 추가
  }
`;

// 날짜 형식 변환 함수
const formatDateRange = (startDate, endDate) => {
  const start = new Date(startDate);
  const end = new Date(endDate);
  const year = start.getFullYear();
  const monthStart = String(start.getMonth() + 1).padStart(2, '0'); // 월은 0부터 시작하므로 +1
  const dayStart = String(start.getDate()).padStart(2, '0');
  const monthEnd = String(end.getMonth() + 1).padStart(2, '0'); // 월은 0부터 시작하므로 +1
  const dayEnd = String(end.getDate()).padStart(2, '0');

  return `${year}. ${monthStart}. ${dayStart}. ~ ${monthEnd}. ${dayEnd}.`;
};

// 개별 축제 항목 컴포넌트
const PdItemBusan = ({ article }) => {
  const { title, location, dateRange, contact, homepage, description, image } =
    article;

  return (
    <NewsItemBlock>
      {image.thumb && (
        <div className="thumbnail">
          <a href={homepage} target="_blank" rel="noopener noreferrer">
            <img
              src={image.thumb}
              alt={title || '축제 썸네일'}
              onError={(e) => {
                e.target.src = 'https://via.placeholder.com/160x170';
              }}
            />
          </a>
        </div>
      )}
      <div className="contents">
        <h2>
          <a href={homepage} target="_blank" rel="noopener noreferrer">
            {title || '제목 정보 없음'}
          </a>
        </h2>
        <p>
          <strong>위치:</strong> {location || '정보 없음'}
        </p>
        <p>
          <strong>날짜:</strong>{' '}
          {formatDateRange(dateRange.start, dateRange.end)}
        </p>
        <p>
          <strong>전화번호:</strong> {contact || '정보 없음'}
        </p>
        <p>
          <strong>주요 내용:</strong> {description || '정보 없음'}
        </p>
      </div>
    </NewsItemBlock>
  );
};

PdItemBusan.propTypes = {
  article: PropTypes.shape({
    title: PropTypes.string,
    location: PropTypes.string,
    dateRange: PropTypes.shape({
      start: PropTypes.string.isRequired,
      end: PropTypes.string.isRequired,
    }),
    contact: PropTypes.string,
    homepage: PropTypes.string,
    description: PropTypes.string,
    image: PropTypes.shape({
      normal: PropTypes.string,
      thumb: PropTypes.string,
    }),
  }).isRequired,
};

// 축제 목록 컴포넌트
const FestivalService = () => {
  const [festivalsData, setFestivalsData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        // 예시 데이터 사용
        setFestivalsData([
          {
            UC_SEQ: 71,
            title: '부산바다축제',
            location: '부산, 수영구, 다대포 해수욕장',
            dateRange: { start: '2024-07-26', end: '2024-07-28' },
            contact: '051-713-5000',
            homepage: 'http://www.bfo.or.kr/festival_sea/info/01.asp?MENUDIV=1',
            description:
              '부산바다축제는 해마다 여름에 열리는 대표 여름축제입니다. 다양한 프로그램과 개막파티를 즐길 수 있습니다. 음악, 춤, 먹거리 등이 마련되어 있어 모든 사람들이 즐길 수 있습니다.',
            image: {
              normal:
                'https://www.visitbusan.net/uploadImgs/files/cntnts/20191213191711585_ttiel',
              thumb:
                'https://www.visitbusan.net/uploadImgs/files/cntnts/20191213191711585_thumbL',
            },
          },
          {
            UC_SEQ: 253,
            title: '수국축제',
            location: '부산, 영도구, 태종대, 태종사',
            dateRange: { start: '2024-07-01', end: '2024-07-01' },
            contact: '051-405-2727',
            description:
              '태종대에서 오색찬란한 수국을 즐길 수 있는 축제입니다. 태종사의 수국들은 주지스님이 40여 년 동안 가꾼 것입니다.',
            image: {
              normal:
                'https://www.visitbusan.net/uploadImgs/files/cntnts/20191222160520749_ttiel',
              thumb:
                'https://www.visitbusan.net/uploadImgs/files/cntnts/20191222160520749_thumbL',
            },
          },
          {
            UC_SEQ: 329,
            title: '센텀맥주축제',
            location: '부산, 해운대구, 센텀맥주축제',
            dateRange: { start: '2024-06-01', end: '2024-06-09' },
            contact: '051-850-9344',
            homepage: 'http://www.beerfestival.co.kr',
            description:
              '센텀맥주축제는 동서양 남녀노소가 함께 즐길 수 있는 축제입니다. 생맥주 무료 시음과 다양한 이벤트가 마련되어 있습니다.',
            image: {
              normal:
                'https://www.visitbusan.net/uploadImgs/files/cntnts/20191227114742493_ttiel',
              thumb:
                'https://www.visitbusan.net/uploadImgs/files/cntnts/20191227114742493_thumbL',
            },
          },
          {
            UC_SEQ: 330,
            title: '금정산성축제',
            location: '부산, 금정구, 금정산성',
            dateRange: { start: '2024-05-24', end: '2024-05-26' },
            contact: '051-715-6884',
            homepage: 'http://www.gjfac.org/gjfac/main.php',
            description:
              '금정산성과 온천천 일대에서 열리는 문화예술 체험축제입니다. 역사와 문화를 경험할 수 있는 다양한 프로그램이 마련되어 있습니다.',
            image: {
              normal:
                'https://www.visitbusan.net/uploadImgs/files/cntnts/20191227115551778_ttiel',
              thumb:
                'https://www.visitbusan.net/uploadImgs/files/cntnts/20191227115551778_thumbL',
            },
          },
          {
            UC_SEQ: 331,
            title: '낙동강구포나루축제',
            location: '부산, 북구, 낙동강구포나루축제',
            dateRange: { start: '2024-10-11', end: '2024-10-13' },
            contact: '051-309-4980',
            homepage:
              'https://www.bsbukgu.go.kr/tour/index.bsbukgu?menuCd=DOM_000000402001001000',
            description:
              '조선시대 낙동강 뱃길의 출발지로 교역문화의 꽃을 피웠던 구포나루터에서 열리는 축제입니다. 다양한 공연과 체험 프로그램이 마련되어 있습니다.',
            image: {
              normal:
                'https://www.visitbusan.net/uploadImgs/files/cntnts/20191227120157384_ttiel',
              thumb:
                'https://www.visitbusan.net/uploadImgs/files/cntnts/20191227120157384_thumbL',
            },
          },
          {
            UC_SEQ: 395,
            title: '부산불꽃축제',
            location: '부산, 수영구, 광안리',
            dateRange: { start: '2024-11-09', end: '2024-11-09' },
            contact: '051-713-5000',
            homepage: 'http://www.bfo.or.kr',
            description:
              '부산의 가을을 화려한 불빛으로 장식하는 불꽃축제입니다. 다양한 장소에서 즐길 수 있으며, 사전 준비가 중요합니다.',
            image: {
              normal:
                'https://www.visitbusan.net/uploadImgs/files/cntnts/20241022165920388_ttiel',
              thumb:
                'https://www.visitbusan.net/uploadImgs/files/cntnts/20241022165920388_thumbL',
            },
          },
        ]);
        setLoading(false);
      } catch (err) {
        setError('축제 정보를 가져오는 데 실패했습니다.');
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  return (
    <div>
      <h1>부산 축제 목록</h1>
      {loading ? (
        <p>로딩 중...</p>
      ) : error ? (
        <p>{error}</p>
      ) : festivalsData.length > 0 ? (
        festivalsData.map((festival) => (
          <PdItemBusan key={festival.UC_SEQ} article={festival} />
        ))
      ) : (
        <p>축제 정보가 없습니다.</p>
      )}
    </div>
  );
};

export default FestivalService;
