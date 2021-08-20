import { SearchOutlined } from '@ant-design/icons';
import styles from '../public/styles/searchBar.module.scss';
const Search = () => {

    return (
        <>
            <div className={styles["search-bar"]}>
                <input 
                    type="text" 
                    className={styles["search-bar__input"]} 
                    placeholder="search artists"
                    aria-label="search"
                >

                </input>
                <button className={styles["search-bar__submit"]}>
                    <SearchOutlined style={{ fontSize: '20px'}} />
                </button>
            </div>
        </>
    );
}

export default Search;