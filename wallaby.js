module.exports = function () {
  return {
    files: ["src/*.ts", "src/**/*.ts", "src/**/*.txt"],

    tests: ["test/*.test.ts"],

    env: {
      type: "node",
    },

    // or any other supported testing framework:
    // https://wallabyjs.com/docs/integration/overview.html#supported-testing-frameworks
    testFramework: "jasmine",
  };
};
