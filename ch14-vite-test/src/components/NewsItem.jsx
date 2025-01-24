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

const formatDate = (isoString) => {
  const date = new Date(isoString);
  return date.toLocaleString('ko-KR', {
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
  });
};

const NewsItem = ({ article }) => {
  const { title, description, url, urlToImage, author, publishedAt } = article;

  return (
    <NewsItemBlock>
      <div className="thumbnail">
        <a href={url} target="_blank" rel="noopener noreferrer" title={title}>
          <img
            src={urlToImage || 'default-thumbnail.jpg'}
            alt={urlToImage ? '뉴스 썸네일' : '기본 썸네일'}
            onError={(e) => e.target.src = 'default-thumbnail.jpg'}
          />
        </a>
      </div>
      <div className="contents">
        <h2>
          <a href={url} target="_blank" rel="noopener noreferrer" title={title}>
            {title}
          </a>
        </h2>
        {description && <p>{description}</p>} {/* description이 있을 경우에만 렌더링 */}
        {author && <p>저자 : {author}</p>}
        <p>발행일 : {formatDate(publishedAt)}</p>
      </div>
    </NewsItemBlock>
  );
};

export default NewsItem;
