const fs = require('fs');
const path = require('path');
const StyleDictionary = require('style-dictionary');
// HAVE THE STYLE DICTIONARY CONFIG DYNAMICALLY GENERATED

const getBaseName = (filePath) => path.basename(filePath, '.tokens.json');
// get filenames of all files in ./tokens/brands folder
const brands = fs.readdirSync('./tokens/brands').map(file => getBaseName(file));
// get filenames of all files in ./tokens/platforms folder
const platforms = fs.readdirSync('./tokens/platforms').map(file => getBaseName(file));
const webConfig = require('./src/web/')


StyleDictionary.registerTransform({
  name: 'size/px',
  type: 'value',
  matcher: token => {
    return (token.unit === 'pixel' || token.type === 'dimension') && token.value !== 0
  },
  transformer: token => {
    return `${token.value}px`
  }
})

StyleDictionary.registerTransform({
  name: 'size/percent',
  type: 'value',
  matcher: token => {
    return token.unit === 'percent' && token.value !== 0
  },
  transformer: token => {
    return `${token.value}%`
  }
})

StyleDictionary.registerTransformGroup({
  name: 'custom/css',
  transforms: StyleDictionary.transformGroup['css'].concat([
    'size/px',
    'size/percent'
  ])
})

StyleDictionary.registerTransformGroup({
  name: 'custom/less',
  transforms: StyleDictionary.transformGroup['less'].concat([
    'size/px',
    'size/percent'
  ])
})

StyleDictionary.registerTransformGroup({
  name: 'custom/scss',
  transforms: StyleDictionary.transformGroup['less'].concat([
    'size/px',
    'size/percent'
  ])
})

StyleDictionary.registerFilter({
  name: 'validToken',
  matcher: function(token) {
    return ['dimension', 'string', 'number', 'color'].includes(token.type)
  }
})

function getStyleDictionaryConfig(brand, platform) {
  return {
    "source": [
      `tokens/brands/${brand}/*.json`,
      "tokens/globals/**/*.json",
      `tokens/platforms/${platform}/*.json`,
      `tokens/brands/${brand}*.json`,
      `tokens/platforms/${platform}*.json`
    ],
    "platforms": {
      "css": {
        "transformGroup": "custom/css",
        "buildPath": `build/css/${brand}`,
        "files": [{
          "destination": "variables.scss",
          "format": "css/variables"
        }]
      },
      "scss": {
        "transformGroup": "custom/scss",
        "buildPath": "build/scss/",
        "files": [{
          "destination": "_variables.scss",
          "format": "scss/variables"
        }]
      },
      "less": {
        "transformGroup": "custom/less",
        "buildPath": "build/less/",
        "files": [{
          "destination": "_variables.less",
          "format": "less/variables"
        }]
      },
      "ios": {
        "transformGroup": "ios",
        "buildPath": "build/ios/",
        "files": [{
          "destination": "StyleDictionaryColor.h",
          "format": "ios/colors.h",
          "className": "StyleDictionaryColor",
          "type": "StyleDictionaryColorName",
          "filter": {
            "type": "color"
          }
        },{
          "destination": "StyleDictionaryColor.m",
          "format": "ios/colors.m",
          "className": "StyleDictionaryColor",
          "type": "StyleDictionaryColorName",
          "filter": {
            "type": "color"
          }
        },{
          "destination": "StyleDictionarySize.h",
          "format": "ios/static.h",
          "className": "StyleDictionarySize",
          "type": "float",
          "filter": {
            "type": "number"
          }
        },{
          "destination": "StyleDictionarySize.m",
          "format": "ios/static.m",
          "className": "StyleDictionarySize",
          "type": "float",
          "filter": {
            "type": "number"
          }
        }]
      },
      "ios-swift": {
        "transformGroup": "ios-swift",
        "buildPath": "build/ios-swift/",
        "files": [{
          "destination": "StyleDictionary.swift",
          "format": "ios-swift/class.swift",
          "className": "StyleDictionary",
          "filter": {}
        }]
      },
      "ios-swift-separate-enums": {
        "transformGroup": "ios-swift-separate",
        "buildPath": "build/ios-swift/",
        "files": [{
          "destination": "StyleDictionaryColor.swift",
          "format": "ios-swift/enum.swift",
          "className": "StyleDictionaryColor",
          "filter": {
            "type": "color"
          }
        },{
          "destination": "StyleDictionarySize.swift",
          "format": "ios-swift/enum.swift",
          "className": "StyleDictionarySize",
          "type": "float",
          "filter": {
            "type": "number"
          }
        }]
      },
      "android": {
        "transformGroup": "android",
        "buildPath": `build/android/${brand}/`,
        "files": [{
          "destination": "tokens.colors.xml",
          "format": "android/colors"
        },{
          "destination": "tokens.dimens.xml",
          "format": "android/dimens"
        },{
          "destination": "tokens.font_dimens.xml",
          "format": "android/fontDimens"
        }]
      },
    }
  };
}

console.log('Build started...');

// PROCESS THE DESIGN TOKENS FOR THE DIFFEREN BRANDS AND PLATFORMS
brands.map(function (brand) {
  platforms.map(function (platform) {

    console.log('\n==============================================');
    console.log(`\nProcessing: [${platform}] [${brand}]`);
    console.log('getting config...', getStyleDictionaryConfig(brand, platform));

    const StyleDictionaryExtended = StyleDictionary.extend({
      ...webConfig,
      ...getStyleDictionaryConfig(brand, platform)
    });

    StyleDictionaryExtended.buildPlatform(platform);

    console.log('\nEnd processing');

  })
})

console.log('\n==============================================');
console.log('\nBuild completed!');