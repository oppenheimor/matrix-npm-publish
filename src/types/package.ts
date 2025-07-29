/**
 * 包相关类型定义
 */

/**
 * 包信息接口
 */
export interface PackageInfo {
  /** 包名 */
  name: string;
  /** 文件夹名 */
  folderName: string;
  /** 当前版本 */
  currentVersion: string;
  /** npm 最新版本 */
  latestNpmVersion: string;
  /** 新版本 */
  newVersion: string;
  /** package.json 路径 */
  packagePath: string;
}

/**
 * 命令行选项接口
 */
export interface CommandOptions {
  /** 是否为内网模式 */
  internal?: boolean;
}

/**
 * 包选择答案接口
 */
export interface PackageSelectionAnswers {
  /** 选中的包列表 */
  selectedPackages: string[];
}