import styled from 'styled-components';
import { NavLink } from 'react-router-dom';

// 카테고리 목록 (대소문자 통일)
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
  { name: 'festival', text: '축제' },
  { name: 'foods', text: '음식' },
];

const CategoriesBlock = styled.div`
  // flexbox를 사용하여 자식 요소들을 가로로 배치
  display: flex;

  //실습1
  justify-content: center;

  // 컨테이너 내부에 1rem(16px) 간격으로 패딩 추가
  padding: 1rem;

  // 컨테이너의 기본 너비를 768px로 설정
  width: 768px;

  // 컨테이너를 화면 가운데 정렬
  margin: 0 auto;

  // 화면 너비가 768px 이하일 경우에 적용
  @media screen and (max-width: 768px) {
    // 컨테이너 너비를 화면의 100%로 설정
    width: 100%;

    // 가로 스크롤을 허용 (내부 콘텐츠가 넘칠 경우)
    overflow-x: auto;
  }
`;

//방법2, NavLink 주입 후, 조건부 렌더링
const Category = styled(NavLink)`
  font-size: 1.125rem;
  cursor: pointer;
  white-space: pre;
  text-decoration: none;
  color: inherit;
  padding-bottom: 0.25rem;

  &:hover {
    color: #495057;
  }

  &.active {
    font-weight: 600;
    border-bottom: 2px solid #8a22cf;
    color: #22b8cf;
    //실습2
    transition: color 0.3s ease, border-bottom 0.3s ease;

    &:hover {
      color: #3bc9db;
    }
  }

  // 카테고리의 요소들간의 간격,
  // 미디어 쿼리 이용해서, 조정.
  // 실습3
  & + & {
    margin-left: 1rem;
    @media screen and (max-width: 768px) {
      margin-left: 2rem;
    }
  }
`;

// 교체, 기존은 부모로 부터 props 전달 받았고,
// 이제 props 받지 않아서, 사용 안함.
// const Categories = ({ onSelect, category }) => {
const Categories = () => {
  return (
    <CategoriesBlock>
      {categories.map((c) => (
        <Category
          key={c.name}
          //방법1
          // active={category === c.name}
          // //   추가
          // onClick={() => onSelect(c.name)}
          // 방법2
          to={c.name === 'all' ? '/' : `/${c.name}`}
          // 예시 ,
          // http://localhost:5173/science
        >
          {c.text}
        </Category>
      ))}
    </CategoriesBlock>
  );
};

export default Categories;
