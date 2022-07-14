const StyleDictionary = require('style-dictionary')

module.exports = {
  transform: {
    'font/face': require('./fontFace'),
    'size/px': require('./sizePx'),
    'web/shadow': require('./webShadows'),
    'web/radius': require('./webRadius'),
    'web/padding': require('./webPadding'),
    'web/font': require('./webFont'),
    'web/gradient': require('./webGradient'),
    'color/hex8ToRgba': require('../common/colorToRgbaString')
  },
  transformGroup: {
    'custom/scss': StyleDictionary.transformGroup.css.concat([
      'font/face',
      'size/px',
      'web/shadow',
      'web/radius',
      'web/padding',
      'web/font',
      'web/gradient',
      'color/hex8ToRgba'
    ])
  },
  format: {
    'custom/css': require('./formatCss'),
    'custom/font-face': require('./formatFontFace'),
  },
  action: {}
}
