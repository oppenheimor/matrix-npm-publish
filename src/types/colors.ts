/**
 * 颜色相关类型定义
 */

/**
 * 颜色字符串类型
 */
export type ColorString = string;

/**
 * 颜色对象类型
 */
export interface Colors {
  green: ColorString;
  cyan: ColorString;
  yellow: ColorString;
  magenta: ColorString;
  red: ColorString;
  blue: ColorString;
  white: ColorString;
  gray: ColorString;
  reset: ColorString;
  bright: ColorString;
  dim: ColorString;
  underline: ColorString;
  blink: ColorString;
}