module.exports = {
  "env": {
    "browser": true,
    "es2021": true,
    "node": true,
    "react-native/react-native": true
  },
  "extends": [
    "eslint:recommended",
    "plugin:react/recommended",
    "plugin:react-native/all"
  ],
  "parserOptions": {
    "ecmaFeatures": {
      "jsx": true
    },
    "ecmaVersion": 12,
    "sourceType": "module"
  },
  "plugins": [
    "react",
    "react-native"
  ],
  "rules": {
    "react/prop-types": 0
  },
  "settings": {
    "react": {
      "pragma": "React",
      "version": "detect"
    }
  }
};
