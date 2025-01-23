import styled from 'styled-components';
import NewsItem from './NewsItem';
import { useState, useEffect } from 'react';
import axios from 'axios';
import usePromise from '../lib/usePromise';
import PdItem from './PdItem';
import PdItemBusan from './PdItemBusan';
import getBusanCultureClassicDetail from './getBusanCultureClassicDetail';

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
    const sendData = () => {
        const query = category === 'all' ? '' : `&category=${category}`;
        if (category === 'cctvWeather') {
            return axios.get(
                `http://apis.data.go.kr/1360000/RoadWthrInfoService/getCctvStnRoadWthr?serviceKey=C65UiiVCboEZ3iy%2Fic1trktk3C%2BpYs3fl4bMt9vpuPqhT1qW5MI45CPxpepD2uevhJ09kLmL1XaH5UKNpxkb0g%3D%3D&numOfRows=10&pageNo=1&eqmtId=0500C00001&hhCode=00&datatype=json`
            );
        } else if (category === 'busanAtt') {
            return axios.get(
                `http://apis.data.go.kr/6260000/AttractionService/getAttractionKr?serviceKey=C65UiiVCboEZ3iy%2Fic1trktk3C%2BpYs3fl4bMt9vpuPqhT1qW5MI45CPxpepD2uevhJ09kLmL1XaH5UKNpxkb0g%3D%3D&numOfRows=10&pageNo=1&resulttype=json`
            );
        } else if (category === 'getBusanCultureClassicDetail') {
            return axios.get(
                `http://apis.data.go.kr/6260000/BusanCultureClassicDetailService/getBusanCultureClassicDetail?serviceKey=C65UiiVCboEZ3iy%2Fic1trktk3C%2BpYs3fl4bMt9vpuPqhT1qW5MI45CPxpepD2uevhJ09kLmL1XaH5UKNpxkb0g%3D%3D&numOfRows=10&pageNo=1&res_no=2020020008&resulttype=json`
            );
        } else {
            return axios.get(
                `https://newsapi.org/v2/top-headlines?country=us${query}&apiKey=01c45f03d5ec482897eecb8b8b3afbf5`
            );
        }
    };

    const [loading, resolved, error] = usePromise(sendData, [category]);

    if (loading) {
        return <NewsListBlock>대기 중...</NewsListBlock>;
    }

    if (!resolved) {
        return null;
    }

    if (error) {
        return <NewsListBlock>에러 발생!</NewsListBlock>;
    }

    const data = category === 'cctvWeather'
        ? resolved?.data?.response?.body?.items?.item || []
        : category === 'busanAtt'
            ? resolved?.data?.getAttractionKr?.item || []
            : resolved?.data?.articles || [];

    return (
        <NewsListBlock>
            {category === 'cctvWeather' ? (
                data.map((data, index) => <PdItem key={index} article={data} />)
            ) : category === 'busanAtt' ? (
                data.map((data, index) => <PdItemBusan key={index} article={data} />)
            ) : (
                data.map((data) => <NewsItem key={data.url} article={data} />)
            )}
        </NewsListBlock>
    );
};

export default NewsList;
