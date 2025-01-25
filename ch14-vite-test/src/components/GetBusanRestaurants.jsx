import styled from 'styled-components';

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

const formatDate = (isoString) => {
  const date = new Date(isoString);
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0'); // 월은 0부터 시작하므로 +1
  const day = String(date.getDate()).padStart(2, '0');
  const hours = String(date.getHours()).padStart(2, '0');
  const minutes = String(date.getMinutes()).padStart(2, '0');
  const seconds = String(date.getSeconds()).padStart(2, '0');
  return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
};

// 부모 App -> NewsList -> PdItem
const GetBusanRestaurants = ({ article }) => {
  const {
    UC_SEQ,
    MAIN_TITLE,
    ADDR1,
    CNTCT_TEL,
    RPRSNTV_MENU,
    MAIN_IMG_THUMB,
    baseDate,
    baseTime,
    weatherNm,
  } = article;

  return (
    <NewsItemBlock>
      <div className="thumbnail">
        <img src={MAIN_IMG_THUMB} alt={MAIN_TITLE} />
      </div>
      <div className="contents">
        <h2>{MAIN_TITLE}</h2>
        <p>주소 : {ADDR1}</p>
        <p>전화 : {CNTCT_TEL}</p>
        <p>추천 메뉴 : {RPRSNTV_MENU}</p>
        <p>날짜 : {formatDate(`${baseDate}T${baseTime}:00`)}</p>
        <p>날씨 : {weatherNm}</p>
      </div>
    </NewsItemBlock>
  );
};

export default GetBusanRestaurants;
