import { useSearchParams } from 'react-router-dom';
import { CaseConverter } from './caseConverter';

// params is an object, each key is the name of the query parameter,
// the value is either a default value or a function that converts the value from string to the desired type.
// For example, { page: 1 }:
// For example, { page: [1, parseInt], courseId: [0, parseInt] } means:
// - page: default value is 1, and the function converts the string to an integer
// - courseId: default value is 0, and the function converts the string to an integer
// If the query parameter is not in the URL, the default value is used.
// If the query parameter is in the URL, the function is applied to convert the string to the desired type.
// If the query parameter is null, the default value is used.

const useMySearchParams = (params) => {
  const [queryParams, setQueryParams] = useSearchParams();
  let result = {};
  for (const [key, setting] of Object.entries(params)) {
    const queryName = CaseConverter.camelCaseToSnakeCase(key);
    let value = queryParams.get(queryName);
    if (setting.constructor === Array) {
      if (value === null) {
        value = setting[0];
      } else if (setting.length >= 2) {
        value = setting[1](value);
      }
    } else if (setting !== null) {
      if (value === null) {
        value = setting;
      } else {
        if (Number.isInteger(setting)) {
          value = parseInt(value);
        } else if (Number.isFinite(setting) && !Number.isInteger(setting)) {
          value = parseFloat(value);
        }
      }
    }
    result[key] = value;
  }

  const setMyQueryParams = (newParams) => {
    const toUpdateParams = {};
    for (const [k, v] of Object.entries(newParams)) {
      if (params[k] === v) {
        continue;
      }
      toUpdateParams[k] = v;
    }
    setQueryParams(CaseConverter.camelCaseToSnakeCase(toUpdateParams));
  };

  return { ...result, setQueryParams: setMyQueryParams };
};

export default useMySearchParams;
