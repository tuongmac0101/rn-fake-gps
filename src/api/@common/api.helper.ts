const toCamel = (str: string) => {
  return str.replace(/([-_][a-z])/g, group => group.toUpperCase().replace('-', '').replace('_', ''));
};
const pipeSnakeCaseToCamelCase = (obj: any): any => {
  if (Array.isArray(obj)) {
    // Nếu là array thì map từng phần tử
    return obj.map(v => pipeSnakeCaseToCamelCase(v));
  } else if (obj !== null && obj.constructor === Object) {
    // Nếu là object thì convert từng key
    return Object.keys(obj).reduce((acc: any, key: string) => {
      acc[toCamel(key)] = pipeSnakeCaseToCamelCase(obj[key]);
      return acc;
    }, {});
  }
  return obj; // giá trị primitive (string, number, boolean...)
};

export const apiHelper = {
  pipeSnakeCaseToCamelCase,
};
