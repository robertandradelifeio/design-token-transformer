// Register a custom format to generate @font-face rules.
module.exports =  ({ dictionary: { allTokens }, options, file }) => {
    const fontPathPrefix = options.fontPathPrefix || '../';
    // https://developer.mozilla.org/en-US/docs/Web/CSS/@font-face/src
    const formatsMap = {
      'woff2': 'woff2',
      'woff': 'woff',
      'ttf': 'truetype',
      'otf': 'opentype',
      'svg': 'svg',
      'eot': 'embedded-opentype'
    };

    return allTokens.reduce((fontList, prop) => {
      const {
        attributes: { family, weight, style },
        formats,
        value: path
      } = prop;

      const urls = formats
        .map(extension => `url("${fontPathPrefix}${path}.${extension}") format("${formatsMap[extension]}")`);

      const fontCss = [
        '@font-face {',
        `\n\tfont-family: "${family}";`,
        `\n\tfont-style: ${style};`,
        `\n\tfont-weight: ${weight};`,
        `\n\tsrc: ${urls.join(',\n\t\t\t ')};`,
        '\n\tfont-display: fallback;',
        '\n}\n'
      ].join('');

      fontList.push(fontCss);

      return fontList;
    }, []).join('\n');
  }



// module.exports = {
//     source: ['tokens.json'],
//     platforms: {
//       'css-font-face': {
//         transforms: ['attribute/font'],
//         buildPath: 'build/css/',
//         files: [
//           {
//             destination: 'fonts.css',
//             format: 'font-face',
//             filter: {
//               attributes: {
//                 category: 'asset',
//                 type: 'font'
//               }
//             },
//             options: {
//               fontPathPrefix: '../'
//             }
//           }
//         ]
//       },
//       'scss-font-face': {
//         transforms: ['attribute/font'],
//         buildPath: 'build/scss/',
//         files: [
//           {
//             destination: '_fonts.scss',
//             format: 'font-face',
//             filter: {
//               attributes: {
//                 category: 'asset',
//                 type: 'font'
//               }
//             },
//             options: {
//               fontPathPrefix: '#{$font-path}/'
//             }
//           }
//         ]
//       }
//     }
//   }