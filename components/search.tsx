import React, { useState, useEffect, useCallback } from 'react';
import { SearchOutlined, CloseOutlined } from '@ant-design/icons';
import { Dispatch } from "redux";
import { getSearchResult } from 'api/search'; 
import { 
    debounceTime, distinctUntilChanged, switchMap, map, filter,
 } from 'rxjs/operators';
import { debounce } from 'lodash';
import { Subject, merge, of } from 'rxjs';
import { useRouter } from 'next/router'
import { useRoutesContext } from "components/routeContext";
import { AppState } from 'state';
import * as action from '../state/action/categoryAction';
import { connect, ConnectedProps } from 'react-redux';


const mapDispatchToProps = (dispatch: Dispatch) => ({
    setSelectedArtId: (id: number) => dispatch(action.setSelectedCategoryId(id)),
    setSelectedArtSlug: (slug: string) => dispatch(action.setSelectedCategorySlug(slug)),
});
  
const connector = connect(null, mapDispatchToProps);

type Props = {} & ConnectedProps<typeof connector>;

const Search = ({ setSelectedArtId, setSelectedArtSlug } : Props) => {
    const [inputVal, setInputVal] = useState('');
    const [searchData, setSearchData] = useState([]);
    const [loading, setLoading] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');
    const [noResults, setNoResults] = useState(false);
    const [focused, setFocused] = useState(false);

    const onFocus = () => setFocused(true);
    const onBlur = () => setFocused(false);

    const setSearchState = (
        data: Array<object>, loading: boolean, errorMessage: string, noResults: boolean
    ) => {
        setSearchData(data);
        setLoading(loading);
        setErrorMessage(errorMessage);
        setNoResults(noResults);
    };

    const [onSearch$] = useState(() => new Subject());
    
    const resetState = () => setSearchState([], false, '', false);
    
    const clearInput = () => {
        setInputVal('');
        resetState();
    }

    const handleTextChange = useCallback(
        debounce((searchQuery: string) => {
            console.log("event : ", searchQuery);
            onSearch$.next(searchQuery);
    }, 500), []);

    const router = useRouter();
    const { toArtist, toArtistProfile } = useRoutesContext();
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
            debounceTime(300),
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

    const handleSearchClick = (href, data) => (e) => {
        resetState();
        if (data.entityType === 'ART') {
            setSelectedArtId(data.id)
            setSelectedArtSlug(data.slug)
        }
        e.preventDefault();
        router.push(href);
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
                    placeholder="Search artist, art category etc."
                    aria-label="search"
                    value={inputVal}
                    onChange={(event) => {
                        resetState();
                        setInputVal(event.target.value);
                        handleTextChange(event.target.value)
                    }}
                    onFocus={onFocus}
                    onBlur={onBlur}
                >
                </input>
                {
                    inputVal.length > 0 && 
                    <button 
                        className="search-bar__cross"
                        onClick={clearInput}
                    >
                        <CloseOutlined className="search-bar__cross__cross-icon" />
                    </button> 
                }
            </div>
            {   
                
                searchData.length > 0 && 
                ( <div className="typeahead-container"> 
                    { 
                        searchData.map((data, i) => {
                            const { entityType, id, name } = data;
                            const href = entityType === 'ART' 
                                ? toArtist().href + data.slug
                                : toArtistProfile(data.slug).as /* 'dancer' to be replaced with artist category. Currently not coming in API resposne */
                                
                            const searchRow = entityType === 'ART' 
                                ? (
                                    <div key = {i} className="typeahead-item">
                                        <div onMouseDown={handleSearchClick(href, data)}>
                                            <span className="typeahead-item__name">{name}</span>
                                            <span className="typeahead-item__category">{entityType}</span>
                                        </div>
                                    </div>
                                    
                                )
                                : (
                                    <div key = {i} className="typeahead-item">
                                        <div onMouseDown={handleSearchClick(href, data)}>
                                            <span className="typeahead-item__name">{name}</span>
                                            <span className="typeahead-item__category">{entityType}</span>
                                        </div>
                                    </div>
                                )
                            return searchRow;
                        })
                    }
                    </div>
                )
            }

            {
                !loading && noResults && 
                ( <div className="typeahead-container"> 
                    { 
                         <div key = {1} className="typeahead-item">
                            <div>
                                <span className="typeahead-item__name">Oops, no result found. Try something else.</span>
                            </div>
                        </div>
                    }
                    </div>
                )
            }
        </>
    );
}

export default connector(Search);