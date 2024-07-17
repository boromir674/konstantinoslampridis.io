const fs = require("fs");

// Provide the input CSS file path and output JSON file path here
// const inputFilePath =
//   "/data/repos/static-site-generator/src/design-system/tokens.css";
// const outputFilePath = "/data/repos/static-site-generator/del-test-tokens.json";

// Read inputFilePath and outputFilePath from console arguments
const inputFilePath = process.argv[2];
const outputFilePath = process.argv[3];


function parseCSS(cssString) {
  const lines = cssString.split("\n");
  const tokens = {};
  let currentCategory = null;

  for (let i = 0; i < lines.length; i++) {
    const line = lines[i].trim();
    // skip empty lines first and foremost
    if (
      line.length === 0 ||
      line.startsWith("/**") ||
      line.startsWith("*/") ||
      line.startsWith("/*") ||
      line == "* @tokens-end"
    ) {
      continue; // Skip comment lines starting with /**
    } else if (line.startsWith("* @") && !line.startsWith("* @presenter")) {
      const parts = line.split("@")[1].trim().split(" ");
      const category = parts.slice(1).join(" ");
      currentCategory = category;
      tokens[currentCategory] = {};
    } else if (line.startsWith("--md")) {
      // Extract tokens like "--md-sys-color-primary: #ff9288;"
      const [tokenName, tokenValue] = line
        .split(":")
        .map((part) => part.trim());
      // assert last character is ';'
      if (tokenValue[tokenValue.length - 1] !== ";") {
        console.error("Error: Missing ';' at the end of token value:", tokenValue);
        console.error("Token name:", tokenName);
        console.error("Line number:", i + 1);
        return;
      }
      // remove last ';' from tokenValue
      tokens[currentCategory][tokenName] = tokenValue.slice(0, -1);
    }
  }

  return tokens;
}

function cssFileToJson(inputFilePath, outputFilePath) {
  // Read the CSS file
  fs.readFile(inputFilePath, "utf8", (err, cssString) => {
    if (err) {
      console.error("Error reading the CSS file:", err);
    } else {
      // Convert CSS to JSON
      let jsonData = parseCSS(cssString);
      
      // assert object has exact keys: Colors "Font Families", "Font Weights", "Font Sizes", "Line Heights", "Letter Spacings"
      const keys = Object.keys(jsonData);
      const expectedKeys = ["Colors", "Font Families", "Font Weights", "Font Sizes", "Line Heights", "Letter Spacings"];
      const missingKeys = expectedKeys.filter(key => !keys.includes(key));
      if (missingKeys.length > 0) {
        console.error("Error: Missing keys in JSON object:", missingKeys);
        return;
      }

      // assert Colors key "points" to some Object (ie {})
      if (typeof jsonData.Colors !== "object") {
        console.error("Error: 'Colors' key should point to an object");
        return;
      }

      // make that Object the top-level object
      jsonData = jsonData.Colors;

      // Write JSON to the output file
      fs.writeFile(
        outputFilePath,
        JSON.stringify(jsonData, null, 2),
        "utf8",
        (err) => {
          if (err) {
            console.error("Error writing the JSON file:", err);
          } else {
            console.log(
              "Conversion successful. JSON file created:",
              outputFilePath
            );
          }
        }
      );
    }
  });
}



cssFileToJson(inputFilePath, outputFilePath);
