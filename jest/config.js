const { pathsToModuleNameMapper } = require("ts-jest")

const paths = {
  "@/*": ["./*"],
}

module.exports = {
  rootDir: "../",
  moduleDirectories: ["<rootDir>/node_modules", "./node_modules", "<rootDir>/jest"],
  moduleNameMapper: {
    "^src/(.*)$": "<rootDir>/src/$1",
    "^.+\\.(css|less|scss)$": "identity-obj-proxy",
    ...pathsToModuleNameMapper(paths, { prefix: "<rootDir>/" }),
    "\\.svg": "<rootDir>/src/__mocks__/filemock.tsx",
  },
  testEnvironment: "jsdom",
  testEnvironmentOptions: {
    url: "https://www.netdata.cloud"
  },
  testRegex: ".*\\.test\\.(tsx?|js)$",
  setupFiles: ["<rootDir>/jest/setup.js"],
  setupFilesAfterEnv: ["<rootDir>/jest/setupForEach.js"],
  transform: {
    "^.+\\.tsx?$": "ts-jest",
    "^.+\\.js$": "babel-jest",
  },
  verbose: true,
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
