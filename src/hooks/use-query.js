import { useCallback } from "react";
import { useNavigate, useLocation } from "react-router-dom";

import qs from "qs";

export const useQueryState = (query, defaulValue = "", isInteger) => {
  const location = useLocation();
  const navigate = useNavigate();

  const setQuery = useCallback(
    (value) => {
      const existingQueries = qs.parse(location.search, {
        ignoreQueryPrefix: true,
      });

      const queryString = qs.stringify(
        { ...existingQueries, [query]: value },
        { skipNulls: true }
      );

      navigate(`${location.pathname}?${queryString}`);
    },
    [navigate, location, query]
  );

  const value = qs.parse(location.search, { ignoreQueryPrefix: true })[query];

  return [
    (isInteger && value ? Number.parseInt(value) : value) ?? defaulValue,
    setQuery,
  ];
};
