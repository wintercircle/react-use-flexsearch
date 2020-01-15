import { useState, useEffect, useMemo } from 'react';
import FlexSearch from 'flexsearch/dist/flexsearch.es5';

function _slicedToArray(arr, i) {
  return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _nonIterableRest();
}

function _arrayWithHoles(arr) {
  if (Array.isArray(arr)) return arr;
}

function _iterableToArrayLimit(arr, i) {
  var _arr = [];
  var _n = true;
  var _d = false;
  var _e = undefined;

  try {
    for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) {
      _arr.push(_s.value);

      if (i && _arr.length === i) break;
    }
  } catch (err) {
    _d = true;
    _e = err;
  } finally {
    try {
      if (!_n && _i["return"] != null) _i["return"]();
    } finally {
      if (_d) throw _e;
    }
  }

  return _arr;
}

function _nonIterableRest() {
  throw new TypeError("Invalid attempt to destructure non-iterable instance");
}

var InvalidIndexError = new Error('FlexSearch index is required. Check that your index exists and is valid.');
var InvalidStoreError = new Error('FlexSearch store is required. Check that your store exists and is valid.');
var useFlexSearch = function useFlexSearch(query, providedIndex, store, searchOptions) {
  var _useState = useState(null),
      _useState2 = _slicedToArray(_useState, 2),
      index = _useState2[0],
      setIndex = _useState2[1];

  useEffect(function () {
    if (!providedIndex) throw InvalidIndexError;
    if (!store) throw InvalidStoreError;
  }, [providedIndex, store]);
  useEffect(function () {
    if (providedIndex instanceof FlexSearch) {
      setIndex(providedIndex);
      return;
    }

    var importedIndex = FlexSearch.create();
    importedIndex.import(providedIndex);
    setIndex(importedIndex);
  }, [providedIndex]);
  return useMemo(function () {
    if (!query || !index || !store) return [];
    var rawResults = index.search(query, searchOptions);
    return rawResults.map(function (id) {
      return store[id];
    });
  }, [query, index, store]);
};

export { useFlexSearch };
