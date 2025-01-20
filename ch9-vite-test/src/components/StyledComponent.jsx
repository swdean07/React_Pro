import styled, { css } from 'styled-components';

const sizes = {
    desktop: 1024,
    tablet: 768,
};

const media = Object.keys(sizes).reduce((acc, label) => {
    acc[label] = (...args) => css`
      @media (max-width: ${sizes[label] / 16}em) {
        ${css(...args)};
      }
    `;
    return acc;
}, {});

// 위의 내용이 변환된 모양을 예시
// const media = {
//     desktop: (...args) =>css`
//       @media(max-width: 64em) {
//         ${css(...args)};
//         //width: 768px;
//       }
//     `,
//     tablet: (...args) =>css`
//       @media(max-width: 48em) {
//         ${css(...args)};
//         //width: 100%;
//       }
//     `};


// Box 컴포넌트
const Box = styled.div`
  background: ${props => props.color || 'blue'};
  padding: 1rem;
  display: flex;

  /* media 쿼리를 사용하여 크기 조정 */
  /* ${media.desktop`width: 768px;`}
  ${media.tablet`width: 100%;`} */
  /* 추가 사용 예시 */
  ${media.desktop`
    width: 768px;
    background-color: lightblue;
    padding: 16px;
  `}

  ${media.tablet`
    width: 100%;
    background-color: lightgreen;
  `}
`;

// Button 컴포넌트
const Button = styled.button`
  background: white;
  color: black;
  border-radius: 4px;
  padding: 0.5rem;
  display: flex;
  align-items: center;
  justify-content: center;
  box-sizing: border-box;
  font-size: 1rem;
  font-weight: 600;

  /* &:hover로 hover 상태 스타일 지정 */
  &:hover {
    background: rgba(255, 255, 255, 0.9);
  }

  /* inverted 값이 true일 때 특정 스타일 */
  ${props =>
        props.inverted &&
        css`
      background: none;
      border: 2px solid white;
      color: white;

      &:hover {
        background: white;
        color: black;
      }
    `}

  /* Button 사이에 마진 추가 */
  & + button {
    margin-left: 1rem;
  }
`;

const StyledComponent = () => (
    <Box color="black">
        <Button>안녕하세요</Button>
        <Button inverted={false}>테두리만</Button>
    </Box>
);

export default StyledComponent;