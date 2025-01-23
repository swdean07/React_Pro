//추가
import { useState, useEffect } from 'react';
import styled from 'styled-components';
import NewsItem from './NewsItem';
//추가
import axios from 'axios';
import usePromise from '../lib/usePromise';

const NewsListBlock = styled.div`
  box-sizing: border-box;
  padding-bottom: 3rem;
  width: 768px;
  margin: 0 auto;
  margin-top: 2rem;

  @media screen and (max-width: 768px) {
    width: 100%;
    padding-left: 1rem;
    padding-right: 1rem;
  }
`;

const NewsList = ({ category }) => {
    // //추가
    // const [articles, setArticles] = useState(null);
    // const [loading, setLoading] = useState(false);
    // //추가
    // useEffect(() => {
    //     // async를 사용하는 함수 선언
    //     const fetchData = async () => {
    //         setLoading(true);
    //         try {
    //             // 방법1
    //             // const response = await axios.get(
    //             //     'https://newsapi.org/v2/top-headlines?country=us&apiKey=01c45f03d5ec482897eecb8b8b3afbf5'
    //             // );
    //             // 방법2
    //             //추가
    //             const query = category === 'all' ? '' : `&category=${category}`;
    //             //추가       
    //             const response = await axios.get(
    //                 `https://newsapi.org/v2/top-headlines?country=us${query}&apiKey=01c45f03d5ec482897eecb8b8b3afbf5`
    //             );
    //             setArticles(response.data.articles);
    //         } catch (e) {
    //             console.log(e);
    //         }
    //         setLoading(false);
    //     };

    //     fetchData();
    // }, [category]);

    //추가
    const [loading, resolved, error] = usePromise(() => {
        const query = category === 'all' ? '' : `&category=${category}`;
        return axios.get(
            `https://newsapi.org/v2/top-headlines?country=us${query}&apiKey=01c45f03d5ec482897eecb8b8b3afbf5`
        );
    }, [category]);

    //추가
    // 대기 중일 때
    if (loading) {
        return <NewsListBlock>대기 중...</NewsListBlock>;
    }

    //추가
    // 아직 articles 값이 설정되지 않았을 때
    if (!resolved) {
        return null;
    }

    //추가
    // 에러가 발생했을 때
    if (error) {
        return <NewsListBlock>에러 발생!</NewsListBlock>;
    }


    //추가
    // resolved 값이 유효할 때
    const { articles } = resolved.data;

    // articles 값이 유효할 때
    return (
        <NewsListBlock>
            {articles.map((article) => (
                <NewsItem key={article.url} article={article} />
            ))}
        </NewsListBlock>
    );
};

export default NewsList;