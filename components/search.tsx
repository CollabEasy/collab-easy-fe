import React, { useState, useEffect } from 'react';
import { SearchOutlined, CloseOutlined } from '@ant-design/icons';
import { getSearchResult } from 'api/search'; 
import { 
    debounceTime, tap, distinctUntilChanged, switchMap, map, filter,
 } from 'rxjs/operators';
import { Subject, merge, of } from 'rxjs';
const Search = () => {
    const [inputVal, setInputVal] = useState('');
    const [searchState, setSearchState] = useState({
        data: [],
        loading: false,
        errorMessage: '',
        noResults: false
    });
    const [onSearch$] = useState(() => new Subject());
    
    const handleTextChange = async (event) => {
        setInputVal(event.target.value);
        onSearch$.next(event.target.value);
    }

    useEffect(() => {
        const subscription = onSearch$.pipe(
            map((val:string) => val.trim()),
            distinctUntilChanged(),
            filter(val => val.length >= 2),
            debounceTime(400),
            tap(val => console.log(`Calling APi with ${val}`)),
            switchMap((val:string) => merge(
                of({loading: true, errorMessage: '', noResults: false}),
                getSearchResult(val).then((res: Array<object>) => {
                    console.log(res);
                    return {
                        data: res,
                        loading: false,
                        noResults: res.length === 0,
                    };

                }).catch((err) => {
                    return {
                        data: [],
                        loading: false,
                        errorMessage: err.message
                    }
                })
            )),
            /* catchError(e => ({
                loading: false,
                errorMessage: 'An application error occured'
            })) */
        ).subscribe(newSearchState => {
            setSearchState(s => Object.assign({}, s, newSearchState));
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
                    <SearchOutlined style={{ fontSize: '20px'}} />
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