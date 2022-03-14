const path = require('path');

const relativePath = p => path.join(__dirname, p);

module.exports = {
  rollup(config, options) {
    if (options.format === 'esm') {
      return {
        ...config,
        input: [relativePath('src/react/index.ts')],
        output: {
          ...config.output,
          file: undefined,
          dir: relativePath('dist/esm'),
          preserveModules: true,
          preserveModulesRoot: relativePath('src'),
        },
      };
    } else {
      return config;
    }
  },
};
