/**
 * 文件操作工具函数
 */
import * as fs from 'fs';
import * as path from 'path';
import { INTERNAL_REGISTRY } from '../constants';

/**
 * 读取包的 package.json
 */
export function readPackageJson(packagePath: string): any {
  const packageJsonPath = path.join(packagePath, 'package.json');
  
  if (!fs.existsSync(packageJsonPath)) {
    throw new Error('package.json 不存在');
  }
  
  return JSON.parse(fs.readFileSync(packageJsonPath, 'utf-8'));
}

/**
 * 写入包的 package.json
 */
export function writePackageJson(packagePath: string, content: any): void {
  const packageJsonPath = path.join(packagePath, 'package.json');
  fs.writeFileSync(packageJsonPath, JSON.stringify(content, null, 2));
}

/**
 * 更新包的版本和配置
 */
export function updatePackageVersion(packagePath: string, newVersion: string, isInternal: boolean = false): void {
  const packageJsonContent = readPackageJson(packagePath);
  packageJsonContent.version = newVersion;
  
  // 如果是内网模式，添加 publishConfig
  if (isInternal) {
    packageJsonContent.publishConfig = {
      registry: INTERNAL_REGISTRY
    };
  }
  
  writePackageJson(packagePath, packageJsonContent);
}

/**
 * 获取 packages 目录下的所有目录
 */
export function getPackageDirectories(packagesPath: string): string[] {
  if (!fs.existsSync(packagesPath)) {
    throw new Error('packages 目录不存在');
  }
  
  const items = fs.readdirSync(packagesPath);
  
  return items.filter(item => {
    const itemPath = path.join(packagesPath, item);
    return fs.statSync(itemPath).isDirectory();
  });
}