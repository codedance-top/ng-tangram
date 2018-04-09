const {
  join
} = require('path');
const ngc = require('@angular/compiler-cli/src/main').main;
const camelCase = require('camelcase');

const rollup = require('rollup');
const uglify = require('rollup-plugin-uglify');
const sourcemaps = require('rollup-plugin-sourcemaps');
const nodeResolve = require('rollup-plugin-node-resolve');
const commonjs = require('rollup-plugin-commonjs');

const config = {
  input: {
    external: id => /^@angular/.test(id),
    plugins: [
      commonjs({
        include: ['node_modules/rxjs/**']
      }),
      sourcemaps(),
      nodeResolve({
        jsnext: true,
        module: true
      })
    ]
  },
  output: {
    globals: {
      '@angular/animations': 'ng.animations',
      '@angular/core': 'ng.core',
      '@angular/forms': 'ng.forms',
      '@angular/common': 'ng.common',
      '@angular/cdk': 'ng.cdk'
    },
    sourcemap: true,
  }
};

/** build libs */
module.exports = async function (libName, bundleFolder, es5Folder, es2015Folder, distFolder) {


  const es5Entry = join(es5Folder, `${libName}.js`);
  const es2015Entry = join(es2015Folder, `${libName}.js`);

  console.log(es5Entry);
  console.log(es2015Entry);

  const inputBaseConfig = { ...config.input };
  const outputBaseConfig = {
    name: libName,
    ...config.output
  };

  // UMD bundle.
  const umdConfig = {
    input: {
      ...inputBaseConfig,
      input: es5Entry
    },
    output: {
      ...outputBaseConfig,
      file: join(distFolder, `bundler`, `${libName}.umd.js`),
      format: 'umd'
    }
  };

  // Minified UMD bundle.
  const minifiedUmdConfig = {
    input: {
      ...inputBaseConfig,
      input: es5Entry,
      plugins: inputBaseConfig.plugins.concat([uglify({})])
    },
    output: {
      ...outputBaseConfig,
      file: join(distFolder,`bundler`, `${libName}.umd.min.js`),
      format: 'umd'
    }
  };


  // ESM+ES5 flat module bundle.
  const esm5Config = {
    input: {
      ...inputBaseConfig,
      input: es5Entry,
    },
    output: {
      ...outputBaseConfig,
      file: join(distFolder, `esm5`,  `${libName}.js`),
      format: 'es'
    }
  };

  // ESM+ES2015 flat module bundle.
  const esm2015Config = {
    input: {
      ...inputBaseConfig,
      input: es2015Entry
    },
    output: {
      ...outputBaseConfig,
      file: join(distFolder,  `esm2015`, `${libName}.js`),
      format: 'es'
    }
  };

  return [umdConfig, minifiedUmdConfig, esm5Config, esm2015Config].map(async cfg => {
    const bundle = await rollup.rollup(cfg.input).catch(e => console.log(e));
    // const { code, map } = await bundle.generate(cfg.output);
    await bundle.write(cfg.output).catch(e => console.log(e));
  });
};


/** build es2015 */
module.exports.es2015 = async function (tsconfig, outputFolder) {
  console.log(outputFolder);
  const exitCode = ngc(['-p', tsconfig, '--outDir', outputFolder]);
  await exitCode === 0 ? Promise.resolve() : Promise.reject();
}

/** build es5 */
module.exports.es5 = async function (tsconfig, outputFolder) {
  const exitCode = ngc([
    '-p', tsconfig,
    '--target', 'es5',
    '--outDir', outputFolder
  ]);
  await exitCode === 0 ? Promise.resolve() : Promise.reject();
}
