import React, {useEffect, useState} from 'react';
import {SortMode} from '../../const/const';
import PropTypes from 'prop-types';

const SortOptions = ({onSortModeChange, selectedCity}) => {

  const ACTIVE_SORT_CLASS = `places__option--active`;
  const [selectedSortMode, setSelectedSortMode] = useState({
    isPopular: true,
    isPriceUp: false,
    isPriceDown: false,
    isTopRated: false,
  });

  const [openList, setOpenList] = useState(false);

  const handleSortOpen = () => (setOpenList((prevState) => !prevState));

  const [selectSort, setSelectSort] = useState(SortMode.POPULAR);

  const handleSelectSort = (evt) => {
    const element = evt.target;
    handleSortOpen();
    if (element.classList.contains(ACTIVE_SORT_CLASS)) {
      return;
    }
    setSelectSort(element.textContent);
    setSelectedSortMode({
      isPopular: element.textContent === SortMode.POPULAR,
      isPriceUp: element.textContent === SortMode.PRICE_UP,
      isPriceDown: element.textContent === SortMode.PRICE_DOWN,
      isTopRated: element.textContent === SortMode.TOP_RATED,
    });
    onSortModeChange(element.textContent);
  };

  useEffect(() => {
    setSelectSort(SortMode.POPULAR);
    setOpenList(false);
    setSelectedSortMode({
      isPopular: true,
      isPriceUp: false,
      isPriceDown: false,
      isTopRated: false,
    });
  }, [selectedCity]);

  return (
    <form className="places__sorting" action="/" method="get">
      <span className="places__sorting-caption">Sort by</span>
      <span onClick={handleSortOpen} className="places__sorting-type" tabIndex={0}>
        {selectSort}
        <svg className="places__sorting-arrow" width="7" height="4">
          <use xlinkHref="#icon-arrow-select"></use>
        </svg>
      </span>
      <ul onClick={handleSelectSort} className={`places__options places__options--custom ${openList ? `places__options--opened` : ``}`}>
        <li className={`places__option ${selectedSortMode.isPopular ? ACTIVE_SORT_CLASS : ''}`} tabIndex={0}>{SortMode.POPULAR}</li>
        <li className={`places__option ${selectedSortMode.isPriceUp ? ACTIVE_SORT_CLASS : ''}`} tabIndex={0}>{SortMode.PRICE_UP}</li>
        <li className={`places__option ${selectedSortMode.isPriceDown ? ACTIVE_SORT_CLASS : ''}`} tabIndex={0}>{SortMode.PRICE_DOWN}</li>
        <li className={`places__option ${selectedSortMode.isTopRated ? ACTIVE_SORT_CLASS : ''}`} tabIndex={0}>{SortMode.TOP_RATED}</li>
      </ul>
    </form>
  );

};

SortOptions.propTypes = {
  onSortModeChange: PropTypes.func,
  selectedCity: PropTypes.string,
};

export default SortOptions;
