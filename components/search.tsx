import React, { useState } from 'react';
import { SearchOutlined, CloseOutlined } from '@ant-design/icons';
import styles from '../styles/searchBar.module.scss';
const Search = () => {
    const [inputVal, setInputVal] = useState('');
    
    const handleChange = (event) => {
        setInputVal(event.target.value);
    }

    const clearInput = () => {
        setInputVal('');
    }

    return (
        <>
            <div className={styles["search-bar"]}>
                <button className={styles["search-bar__submit"]}>
                    <SearchOutlined style={{ fontSize: '20px'}} />
                </button>
                <input 
                    type="text" 
                    className={styles["search-bar__input"]} 
                    placeholder="search artists"
                    aria-label="search"
                    value={inputVal}
                    onChange={handleChange}
                >
                </input>
                {
                    inputVal.length > 0 && 
                    <button 
                        className={styles["search-bar__cross"]}
                        onClick={clearInput}
                    >
                        <CloseOutlined style={{ fontSize: '16px', paddingBottom: '5px'}} />
                    </button> 
                }
            </div>
        </>
    );
}

export default Search;