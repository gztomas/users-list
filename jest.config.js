const config = {
  globals: {
    "ts-jest": {
      isolatedModules: true,
      tsconfig: "tsconfig.jest.json",
    },
  },
  moduleFileExtensions: ["ts", "tsx", "js", "jsx", "json"],
  testPathIgnorePatterns: ["/node_modules/", "/out/"],
  transform: { "^.+\\.(t|j)sx?$": "ts-jest" },
};

module.exports = {
  projects: [
    {
      ...config,
      displayName: "unit",
      snapshotSerializers: ["@emotion/jest/serializer"],
    },
    {
      ...config,
      displayName: "functional",
      preset: "jest-playwright-preset",
      testRegex: "/__functional__/.*\\.functional\\.(jsx?|tsx?)$",
      testRunner: "jest-circus/runner",
      testEnvironment: "./jest-playwright-env.js",
      setupFilesAfterEnv: ["./src/__functional__/setup.ts"],
    },
  ],
  reporters: ["default", "jest-screenshot/reporter"],
};
