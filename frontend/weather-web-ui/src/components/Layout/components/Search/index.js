import { useEffect, useState, useRef } from 'react';
import { faCircleXmark, faSearch, faSpinner } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import HeadlessTippy from '@tippyjs/react/headless';
import classNames from 'classnames/bind';

import { Wrapper as PopperWrapper } from '~/components/Popper';
import { useDebounce } from '~/hooks';
import AccountItem from '~/components/AccountItem';
import styles from './Search.module.scss';

const cx = classNames.bind(styles);

function Search() {
    const [searchValue, setSearchValue] = useState('');
    const [searchResult, setSearchResult] = useState([]);
    const [showSearchResult, setShowSearchResult] = useState(true);
    const [loading, setLoading] = useState(false);

    const inputRef = useRef();

    const searchDelayDebounce = 800;
    const searchValueDebounced = useDebounce(searchValue, searchDelayDebounce);

    // Get searchValue
    useEffect(() => {
        if (!searchValueDebounced.trim()) {
            setSearchResult([]); // Sure searchResult empty after deleting the last character of searchValue
            return;
        }

        setLoading(true);
        fetch(`http://localhost:8000/api/search?q=${encodeURIComponent(searchValueDebounced)}`)
            .then((res) => res.json())
            .then((res) => {
                setSearchResult(res.data);
                setLoading(false);
            })
            .catch(() => {
                setLoading(false);
            });
    }, [searchValueDebounced]);

    const handleClear = () => {
        setSearchValue('');
        inputRef.current.focus();
    };

    const handleHideResult = () => {
        setShowSearchResult(false);
    };

    return (
        // Search section
        <div className={cx('wrapper', 'col-sm-6', 'offset-sm-2')}>
            <HeadlessTippy
                interactive
                visible={showSearchResult && searchResult.length > 0}
                render={(attrs) => (
                    <div className={cx('search-result')} tabIndex="-1" {...attrs}>
                        <PopperWrapper>
                            <h4 className={cx('search-title')}>Accounts</h4>
                            {searchResult.length > 0 &&
                                searchResult.map((result) => <AccountItem key={result.user_id} data={result} />)}
                        </PopperWrapper>
                    </div>
                )}
                onClickOutside={handleHideResult}
            >
                <div className={cx('header-search')}>
                    <div className={cx('search-bar')}>
                        <input
                            type="text"
                            ref={inputRef}
                            className={cx('search-input')}
                            value={searchValue}
                            name="search"
                            placeholder="search"
                            spellCheck={false}
                            onChange={(e) => setSearchValue(e.target.value)}
                            onFocus={() => setShowSearchResult(true)}
                        />
                        {!!searchValue && !loading && (
                            <button className={cx('clear')} onClick={handleClear}>
                                <FontAwesomeIcon icon={faCircleXmark} />
                            </button>
                        )}

                        {loading && <FontAwesomeIcon className={cx('loading')} icon={faSpinner} />}

                        <FontAwesomeIcon className={cx('btn-search')} icon={faSearch} />
                    </div>
                </div>
            </HeadlessTippy>
        </div>
    );
}

export default Search;
