const fs = require("fs");

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
      tokens[currentCategory][tokenName] = tokenValue;
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
      const jsonData = parseCSS(cssString);

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

// Provide the input CSS file path and output JSON file path here
const inputFilePath =
  "/data/repos/static-site-generator/src/design-system/tokens.css";
const outputFilePath = "/data/repos/static-site-generator/del-test-tokens.json";

cssFileToJson(inputFilePath, outputFilePath);
