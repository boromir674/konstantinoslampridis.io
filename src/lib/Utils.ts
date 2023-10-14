const DESIGN_SYSTEM_PREFIX = "--md-sys-color";

// Recursive function to replace values in the JSON object
const replaceValuesWithTokens = (
  obj: { [key: string]: any },
  tokens: { [key: string]: string }
) => {
  // if string is sth like #2063e9 return it as is
  if (obj && typeof obj === "string" && (obj as string).charAt(0) === "#") {
    return obj;
  } else if (
    obj &&
    typeof obj === "string" &&
    (obj as string).startsWith(DESIGN_SYSTEM_PREFIX)
  ) {
    return obj;
  } else if (obj && typeof obj === "string") {
    // If the value is a string, prefix it with '--sys' and use it as a token key
    const tokenKey = `${DESIGN_SYSTEM_PREFIX}-${obj}`;

    // Check if the token key exists in the TOKENS object
    if (tokens[tokenKey]) {
      return tokens[tokenKey];
    } else {
      // If the token doesn't exist, raise an early error with message
      throw new Error(
        `Token ${tokenKey} doesn't exist in the design tokens file.`
      );
    }
  } else if (typeof obj === "object" && obj !== null) {
    // If the value is an object, recursively process its properties
    const newObj: { [key: string]: any } = {};
    for (const key in obj) {
      if (obj.hasOwnProperty(key)) {
        newObj[key] = replaceValuesWithTokens(obj[key], tokens);
      }
    }
    return newObj;
  } else {
    // For non-string and non-object values, raise an early error with message
    throw new Error(
      `Value ${obj} is not a string or an object. Only strings and objects are allowed.`
    );
  }
};

export default replaceValuesWithTokens;
