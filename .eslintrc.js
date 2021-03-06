const path = require('path');

module.exports = {
    "extends": "airbnb",
    "plugins": [
        "react",
        "import",
        "jsx-a11y",
        "babel"
    ],
    "parser": "babel-eslint",
    "parserOptions": {
      "ecmaVersion": 7,
      "ecmaFeatures": {
        "jsx": true
      }
    },
    "env": {
      "node": true,
      "browser": true,
      "mocha": true,
      "es6": true
    },
    "globals": {
      "_": true,
      "expect": true,
      "request": true,
    },
    "rules": {
      "no-warning-comments": "off",
      "no-console": "off",
      "jsx-a11y/img-uses-alt": "off",
      "jsx-a11y/label-uses-for": "off",
      "jsx-a11y/mouse-events-map-to-key-events": "off",
      "jsx-a11y/no-hash-href": "off",
      "jsx-a11y/redundant-alt": "off",
      "jsx-a11y/valid-aria-role": "off",
      "import/no-extraneous-dependencies": "off",
      "import/no-unresolved": [
         "error",
         {
           "ignore": [ 'js/', 'img/' ]
         }
       ],
     "import/extensions": "off",
     "react/prefer-stateless-function": "off",
     "dot-notation": "off",
     "quotes": [
       "error",
       "single",
       {
         "allowTemplateLiterals": true,
       }
     ],
     "react/forbid-prop-types": "off",
    },
    "settings": {
      "import/resolver": {
        "webpack": {
          "config": path.join(__dirname, "/config/webpack/main.config.js"),
        }
      },
    }
};
