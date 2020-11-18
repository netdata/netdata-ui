const { pathsToModuleNameMapper } = require("ts-jest/utils")

const paths = {
  "@/*": ["./*"],
}

module.exports = {
  moduleNameMapper: {
    "^src/(.*)$": "<rootDir>/src/$1",
    "^.+\\.(css|less|scss)$": "identity-obj-proxy",
    ...pathsToModuleNameMapper(paths, { prefix: "<rootDir>/" }),
    "\\.svg": "<rootDir>/src/__mocks__/filemock.tsx",
  },
  testURL: "https://www.netdata.cloud",
  testRegex: ".*\\.test\\.(tsx?|js)$",
  setupFiles: ["<rootDir>/jest/setup.js"],
  setupFilesAfterEnv: [
    "@testing-library/jest-dom/extend-expect",
    "jest-styled-components",
    "<rootDir>/jest/setupForEach.js",
  ],
  transform: {
    "^.+\\.tsx?$": "ts-jest",
    "^.+\\.js$": "babel-jest",
  },
  verbose: true,
  moduleDirectories: ["node_modules", "src", "jest"],
  roots: ["src/"],
  coverageDirectory: "<rootDir>/coverage",
  coveragePathIgnorePatterns: ["/node_modules/", "/jest/"],
  coverageThreshold: {
    global: {
      branches: 70,
      functions: 70,
    },
  },
  testPathIgnorePatterns: ["/node_modules/"],
  reporters: ["default"],
  cacheDirectory: "<rootDir>/.jest-tmp",
}
