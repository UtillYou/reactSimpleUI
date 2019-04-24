const gulp = require("gulp");
const less = require('less');
const { readFileSync } = require('fs');
const path = require('path');
const NpmImportPlugin = require('less-plugin-npm-import');
const ts = require("gulp-typescript");
const through2 = require('through2');
const rimraf = require('rimraf');
const merge2 = require('merge2');
// const tsConfig = require('./tsconfig.json');
const tsConfigCommonJS = {
    "outDir": "./dist/",
        "sourceMap": true,
        "noImplicitAny": true,
        "module": "commonjs",
        "target": "es6",
        "jsx": "react",
        "moduleResolution":"node"
}
const tsConfigES = {
    "outDir": "./dist/",
        "sourceMap": true,
        "noImplicitAny": true,
        "module": "es6",
        "target": "es6",
        "jsx": "react",
        "moduleResolution":"node"
}


// var tsProject = ts.createProject("tsconfig.json");
const tsDefaultReporter = ts.reporter.defaultReporter();
const libDir = 'lib';
const esDir = 'es';

function transformLess(lessFile, config = {}) {
    const { cwd = process.cwd() } = config;
    const resolvedLessFile = path.resolve(cwd, lessFile);
  
    let data = readFileSync(resolvedLessFile, 'utf-8');
    data = data.replace(/^\uFEFF/, '');
  
    // Do less compile
    const lessOpts = {
      paths: [path.dirname(resolvedLessFile)],
      filename: resolvedLessFile,
      plugins: [new NpmImportPlugin({ prefix: '~' })],
      javascriptEnabled: true,
    };
    return less
      .render(data, lessOpts)
      .then(r => r.css);
  }
  

const tsFiles = ['**/*.ts', '**/*.tsx', '!node_modules/**/*.*', 'typings/**/*.d.ts'];

function compileTs(stream,modules) {
    return stream
      .pipe(ts(modules === false ? tsConfigES : tsConfigCommonJS))
      .js.pipe(
        through2.obj(function(file, encoding, next) {
          // console.log(file.path, file.base);
          file.path = file.path.replace(/\.[jt]sx$/, '.js');
          this.push(file);
          next();
        })
      )
      .pipe(gulp.dest(process.cwd()));
  }
  
//   gulp.task('tsc', () =>
//     compileTs(
//       gulp.src(tsFiles)
//     )
//   );


  function compile(modules) {
    rimraf.sync(modules !== false ? libDir : esDir);
    const less = gulp
      .src(['components/**/*.less'])
      .pipe(
        through2.obj(function(file, encoding, next) {
          this.push(file.clone());
          if (
            file.path.match(/(\/|\\)style(\/|\\)index\.less$/) ||
            file.path.match(/(\/|\\)style(\/|\\)v2-compatible-reset\.less$/)
          ) {
            transformLess(file.path)
              .then(css => {
                file.contents = Buffer.from(css);
                file.path = file.path.replace(/\.less$/, '.css');
                this.push(file);
                next();
              })
              .catch(e => {
                console.error(e);
              });
          } else {
            next();
          }
        })
      )
      .pipe(gulp.dest(modules === false ? esDir : libDir));
    const assets = gulp
      .src(['components/**/*.@(png|svg)'])
      .pipe(gulp.dest(modules === false ? esDir : libDir));
    let error = 0;
    const source = ['components/**/*.tsx', 'components/**/*.ts', 'typings/**/*.d.ts'];
    // allow jsx file in components/xxx/
    const tsConfig = modules === false ? tsConfigES : tsConfigCommonJS;
    if (tsConfig.allowJs) {
      source.unshift('components/**/*.jsx');
    }
    const tsResult = gulp.src(source).pipe(
      ts(tsConfig, {
        error(e) {
          tsDefaultReporter.error(e);
          error = 1;
        },
        finish: tsDefaultReporter.finish,
      })
    );
  
    function check() {
      if (error && !argv['ignore-error']) {
        process.exit(1);
      }
    }
  
    tsResult.on('finish', check);
    tsResult.on('end', check);
    const tsFilesStream = tsResult.js.pipe(gulp.dest(modules === false ? esDir : libDir));
    const tsd = tsResult.dts.pipe(gulp.dest(modules === false ? esDir : libDir));
    return merge2([less, tsd, assets]);
  }

  gulp.task('compile-with-es', done => {
    console.log('[Parallel] Compile to es...');
    compile(false).on('finish', done);
  });
  
  gulp.task('compile-with-lib', done => {
    console.log('[Parallel] Compile to js...');
    compile().on('finish', done);
  });
  
  gulp.task('compile-finalize', done => {
    console.log('[Compile] ...Finalization');
    done();
  });
  
  gulp.task(
    'default',
    gulp.series(gulp.parallel('compile-with-es', 'compile-with-lib'), 'compile-finalize')
  );