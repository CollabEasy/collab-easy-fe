import React, { useState, useEffect } from 'react';
import { SearchOutlined, CloseOutlined } from '@ant-design/icons';
import { getSearchResult } from 'api/search'; 
import { 
    debounceTime, tap, distinctUntilChanged, switchMap, map, filter,
 } from 'rxjs/operators';
import { Subject, merge, of } from 'rxjs';
const Search = () => {
    const [inputVal, setInputVal] = useState('');
    const [searchData, setSearchData] = useState([]);
    const [loading, setLoading] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');
    const [noResults, setNoResults] = useState(false);

    const setSearchState = (
        data: Array<object>, loading: boolean, errorMessage: string, noResults: boolean
    ) => {
        setSearchData(data);
        setLoading(loading);
        setErrorMessage(errorMessage);
        setNoResults(noResults);
    };

    const [onSearch$] = useState(() => new Subject());
    
    const handleTextChange = async (event) => {
        setInputVal(event.target.value);
        onSearch$.next(event.target.value);
    }

    const callSearchAPI = async (val:string) => {
        try {
            /* Type 'any' is of type Array<object> but getting some error */
            const res: any = await getSearchResult(val);
            return {
                data: res,
                loading: false,
                noResults: res.length === 0,
            };
        } catch(err) {
            return {
                data: [],
                loading: false,
                errorMessage: err.message
            }
        }
    }

    useEffect(() => {
        const subscription = onSearch$.pipe(
            map((val:string) => val.trim()),
            distinctUntilChanged(),
            filter(val => val.length >= 2),
            debounceTime(400),
            switchMap((val:string) => 
                merge(
                    of({data: [], loading: true, errorMessage: '', noResults: false}),
                    callSearchAPI(val),
                )
            ),
            /* catchError(e => ({
                loading: false,
                errorMessage: 'An application error occured'
            })) */
        ).subscribe(newSearchState => {
            const { data, loading, errorMessage, noResults } = newSearchState;
            setSearchState(data, loading, errorMessage, noResults);
        });

        return () => {
            subscription.unsubscribe()
        }
      }, [onSearch$]);

    const clearInput = () => {
        setInputVal('');
    }

    return (
        <>
            <div className="search-bar">
                <button className="search-bar__submit">
                    <SearchOutlined className="search-bar__submit__search-icon" />
                </button>
                <input 
                    type="text" 
                    className="search-bar__input" 
                    placeholder="search artists"
                    aria-label="search"
                    value={inputVal}
                    onChange={handleTextChange}
                >
                </input>
                {
                    inputVal.length > 0 && 
                    <button 
                        className="search-bar__cross"
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