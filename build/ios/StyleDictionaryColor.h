
//
// StyleDictionaryColor.h
//

// Do not edit directly
// Generated on Sat, 16 Jul 2022 00:14:44 GMT


#import <UIKit/UIKit.h>

typedef NS_ENUM(NSInteger, StyleDictionaryColorName) {
ColorColorsSemiRed,
ColorColorsMultipleFills0,
ColorColorsMultipleFills1,
ColorColorsSingleBlue,
ColorColorsRefBlue,
ColorColorsEmpty,
ColorColorsSpecialCharacters,
ColorColorsSpecialCharactersNderung,
ColorBrandPrimary5f10b7PurpleHeart,
ColorBrandPrimaryDark500d9bIndigo,
ColorBrandPrimaryDark30Black0,
ColorBrandPrimaryDark30Black1,
ColorBrandPrimaryDisabled0,
ColorBrandPrimaryDisabled1,
ColorClassesHealthB93a83RedViolet,
ColorClassesMindset2598d5SummerSky,
ColorClassesFinanceB1b923Bahia,
ColorGreyscaleBlack000000,
ColorGreyscaleNavBg232323Nero,
ColorGreyscaleDisabled7e7e7eGrey,
ColorGreyscaleQuickSilverFred,
ColorGreyscaleSilverGrayBdbdbd,
ColorGreyscaleWhipserGrayEcecec,
ColorGreyscaleWhiteFfffff,
ColorAlertsFocusInfo31ccec,
ColorAlertsFocusAccessibility2598d5,
ColorAlertsFocusSuccess21ba45,
ColorAlertsFocusWarningF2c037,
ColorAlertsFocusErrorD0021b,
ColorStylizedBlackOverlay30,
ColorLibraryMiscComponentFrames
};

@interface StyleDictionaryColor : NSObject
+ (NSArray *)values;
+ (UIColor *)color:(StyleDictionaryColorName)color;
@end
