import styled, { css } from 'styled-components';

const categories = [
  { name: 'all', text: '전체보기' },
  { name: 'business', text: '비즈니스' },
  { name: 'entertainment', text: '엔터테인먼트' },
  { name: 'health', text: '건강' },
  { name: 'science', text: '과학' },
  { name: 'sports', text: '스포츠' },
  { name: 'technology', text: '기술' },
  { name: 'cctvWeather', text: 'cctv 날씨 샘플' },
  { name: 'busanAtt', text: '부산 명소' },
  { name: 'getBusanCultureClassicDetail', text: '부산 명소' },
];

const CategoriesBlock = styled.div`
  display: flex;
  justify-content: center;
  padding: 1rem;
  width: 768px;
  margin: 0 auto;

  @media screen and (max-width: 768px) {
    width: 100%;
    overflow-x: auto;
    -webkit-overflow-scrolling: touch;
    scrollbar-width: none;
    &::-webkit-scrollbar {
      display: none;
    }
  }
`;

const Category = styled.div.attrs((props) => ({
  active: undefined, // DOM에 전달되지 않도록 설정
}))`
  font-size: 1.125rem;
  cursor: pointer;
  white-space: pre;
  text-decoration: none;
  color: inherit;
  padding-bottom: 0.25rem;
  transition: all 0.3s ease-in-out;

  &:hover {
    color: #3bc9db;
  }

  ${(props) =>
    props.active &&
    css`
      font-weight: 600;
      border-bottom: 2px solid #6422cf;
      color: #22b8cf;

      &:hover {
        color: #3bc9db;
      }

      transform: scale(1.1);
    `}

  & + & {
    margin-left: 1rem;

    @media screen and (max-width: 768px) {
      margin-left: 1.5rem;
    }
  }
`;

const Categories = ({ onSelect, category }) => {
  return (
    <CategoriesBlock>
      {categories.map((c) => (
        <Category
          key={c.name}
          active={category === c.name}
          onClick={() => onSelect(c.name)}
        >
          {c.text}
        </Category>
      ))}
    </CategoriesBlock>
  );
};

export default Categories;
