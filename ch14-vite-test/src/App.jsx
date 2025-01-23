import React, { useState, useCallback } from 'react';
import axios from 'axios';
import './App.css'
import NewsList from './components/NewsList';
import Categories from './components/Categories';
import NewsPage from './pages/NewsPage';

const App = () => {
    const [data, setData] = useState(null);
    const [category, setCategory] = useState('all');
    const onSelect = useCallback(
        (category) => setCategory(category), []);

    const onClick = () => {
        axios
            .get('https://newsapi.org/v2/top-headlines?country=us&category=health&apiKey=01c45f03d5ec482897eecb8b8b3afbf5')
            .then((response) => {
                setData(response.data);
            });
        // const response = await axios.get(
        //   'https://newsapi.org/v2/top-headlines?country=us&apiKey=0a8c4202385d4ec1bb93b7e277b3c51f'
        // );
    };

    return (
        <div>
            <h1 className='react'>ch14 API 연동</h1>
            {/* <div>
                <button onClick={onClick}>불러오기</button>
            </div>
            {data && (
                <textarea
                    rows={7}
                    value={JSON.stringify(data, null, 2)}
                    readOnly={true}
                />
            )} */}
            {/* <Categories/>
            <NewsList/> */}
            <Categories category={category} onSelect={onSelect} />
            <NewsList category={category} />
            <NewsPage />
        </div>
    );
};

export default App;





