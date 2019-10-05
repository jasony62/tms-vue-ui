const fs = require('fs-extra')
const glob = require('fast-glob')
const path = require('path')
const less = require('less')
const postcss = require('postcss')
const postcssrc = require('postcss-load-config')
const csso = require('csso')

async function moveToStyle(paths) {
  return paths.map(path => {
    let matches = path.match(/(.*)\/(.+\.less)$/)
    let [, dir, name] = matches
    fs.ensureDirSync(`${dir}/style`)
    let newPath = `${dir}/style/${name}`
    fs.renameSync(path, newPath)
    return newPath
  })
}

async function compileLess(lessCodes, paths) {
  const outputs = await Promise.all(
    lessCodes.map((source, index) =>
      less.render(source, {
        paths: [path.resolve(__dirname, 'node_modules')],
        filename: paths[index]
      })
    )
  )
  return outputs.map(item => item.css)
}

async function compilePostcss(cssCodes, paths) {
  const postcssConfig = await postcssrc()
  const outputs = await Promise.all(
    cssCodes.map((css, index) => postcss(postcssConfig.plugins).process(css, { from: paths[index] }))
  )

  return outputs.map(item => item.css)
}

async function compileCsso(cssCodes) {
  return cssCodes.map(css => csso.minify(css).css)
}

async function dest(output, paths) {
  await Promise.all(output.map((css, index) => fs.writeFile(paths[index].replace('.less', '.css'), css)))
}

async function indexjs(paths) {
  await Promise.all(paths.map(path => fs.outputFileSync(path.replace('.less', '.js'), `import './index.css'`)))
}

// compile component css
async function compile() {
  let codes
  const paths = await glob(['./lib/**/*.less'], { absolute: true })
  const stylePaths = await moveToStyle(paths)
  codes = await Promise.all(stylePaths.map(path => fs.readFile(path, 'utf-8')))
  codes = await compileLess(codes, stylePaths)
  codes = await compilePostcss(codes, stylePaths)
  codes = await compileCsso(codes)

  await dest(codes, stylePaths)
  await indexjs(stylePaths)
}

compile()
