
//
// StyleDictionaryColor.h
//

// Do not edit directly
// Generated on Wed, 20 Jul 2022 16:13:48 GMT


#import <UIKit/UIKit.h>

typedef NS_ENUM(NSInteger, StyleDictionaryColorName) {
ColorColorsSemiRed,
ColorColorsMultipleFills0,
ColorColorsMultipleFills1,
ColorColorsSingleBlue,
ColorColorsRefBlue,
ColorColorsEmpty,
ColorColorsSpecialCharacters,
ColorColorsSpecialCharactersNderung
};

@interface StyleDictionaryColor : NSObject
+ (NSArray *)values;
+ (UIColor *)color:(StyleDictionaryColorName)color;
@end
