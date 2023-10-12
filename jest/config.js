module.exports = {
  rootDir: "../",
  moduleDirectories: ["<rootDir>/node_modules", "./node_modules", "<rootDir>/jest"],
  moduleNameMapper: {
    "^@/(.*)$": "<rootDir>/$1",
    "^.+\\.(css|less|scss)$": "identity-obj-proxy",
    "\\.svg": "<rootDir>/src/__mocks__/filemock.js",
  },
  testEnvironment: "jsdom",
  testEnvironmentOptions: {
    url: "https://www.netdata.cloud",
  },
  testRegex: ".*\\.test\\.js$",
  setupFiles: ["<rootDir>/jest/setup.js"],
  setupFilesAfterEnv: ["<rootDir>/jest/setupForEach.js"],
  transform: {
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
