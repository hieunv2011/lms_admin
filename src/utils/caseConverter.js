const toCamelCase = (snakeCase) => snakeCase.replace(/_[a-z]/g, (characters) => characters[1].toUpperCase());

const toSnakeCase = (camelCase) => camelCase.replace(/[A-Z]/g, (character) => `_${character.toLowerCase()}`);

const convert = (obj, fn) => {
  // validate input
  if (obj === null || obj === undefined) return obj;

  if (typeof obj === 'string') {
    return fn(obj);
  }

  // if argument is an array, recursive this function with each element of array
  if (Array.isArray(obj)) {
    const newArray = [];
    obj.forEach((element) => {
      let value = element;
      if (element instanceof Object) {
        value = convert(element, fn);
      }
      newArray.push(value);
    });
    return newArray;
  }

  // if argument is a normal object
  const newObject = {};
  Object.keys(obj).forEach((key) => {
    const newKey = fn(key);
    let value = obj[key];
    if (value instanceof Object) {
      value = convert(value, fn);
    }
    newObject[newKey] = value;
  });
  return newObject;
};

export class CaseConverter {
  // snake_case to camelCase. For example, {user_id: 1} -> {userId: 1}
  static snakeCaseToCamelCase(obj) {
    return convert(obj, toCamelCase);
  }

  // camelCase to snake_case. For example, {userId: 1} -> {user_id: 1}
  static camelCaseToSnakeCase(obj) {
    return convert(obj, toSnakeCase);
  }

  static toSnakeCase = toSnakeCase;

  static toCamelCase = toCamelCase;
}
