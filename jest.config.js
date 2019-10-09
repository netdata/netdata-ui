const { pathsToModuleNameMapper } = require("ts-jest/utils")

const tsPathConfig = {
  compilerOptions: {
    baseUrl: ".",
    paths: {
      "@/*": ["./*"],
    },
  },
}

const { compilerOptions } = tsPathConfig

module.exports = {
  preset: "ts-jest",
  testEnvironment: "node",
  testPathIgnorePatterns: ["<rootDir>/test/", "<rootDir>/node_modules/", "workspaces"],
  moduleDirectories: ["node_modules", "src"],
  moduleNameMapper: {
    "^.+\\.(css|less|scss)$": "identity-obj-proxy",
    ...pathsToModuleNameMapper(compilerOptions.paths, { prefix: "<rootDir>/" }),
  },
  globals: {
    // All globals should be in upper case due webpack configuration
    DEVELOPMENT: true,
  },
}
