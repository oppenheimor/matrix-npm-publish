/**
 * 版本管理工具函数
 */
import { execSync } from 'child_process';
import { DEFAULT_VERSION } from '../constants';

/**
 * 获取 npm 包的最新版本
 */
export function getLatestNpmVersion(packageName: string): string {
  try {
    const result = execSync(`npm view ${packageName} versions --json`, { 
      encoding: 'utf-8',
      stdio: 'pipe'
    });
    
    // 处理空结果或无效JSON
    if (!result.trim()) {
      return DEFAULT_VERSION;
    }
    
    const versions = JSON.parse(result);
    const latestVersion = Array.isArray(versions) ? versions[versions.length - 1] : versions;
    return latestVersion || DEFAULT_VERSION;
  } catch (error) {
    // 包可能不存在于 npm 上
    return DEFAULT_VERSION;
  }
}

/**
 * 升级 patch 版本号
 */
export function incrementPatchVersion(version: string): string {
  const versionParts = version.split('.');
  const major = parseInt(versionParts[0] || '0');
  const minor = parseInt(versionParts[1] || '0'); 
  const patch = parseInt(versionParts[2] || '0');
  
  return `${major}.${minor}.${patch + 1}`;
}