/**
 * 包处理核心逻辑
 */
import { execSync } from 'child_process';
import * as path from 'path';
import { PackageInfo } from '../types';
import { colors } from '../constants';
import {
  printBox,
  printStepHeader,
  printSubStep,
  printSuccess,
  printWarning,
  printError,
  printProgress,
  printInfo,
  printSeparator
} from '../utils/display';
import {
  readPackageJson,
  updatePackageVersion,
  getLatestNpmVersion,
  incrementPatchVersion
} from '../utils';

/**
 * 处理选中的包
 */
export async function processSelectedPackages(
  selectedPackages: string[], 
  packagesPath: string, 
  isInternal: boolean = false
): Promise<void> {
  console.log();
  const modeText = isInternal ? '🚀 Matrix 包发布工作流已启动 (内网模式)' : '🚀 Matrix 包发布工作流已启动';
  printBox(modeText, colors.green);
  if (isInternal) {
    printInfo('检测到内网模式，将配置内网 registry');
  }
  console.log();

  const packageInfos: PackageInfo[] = [];

  // 步骤1: 读取所有选中包的 package.json 获取包名
  readPackageInfos(selectedPackages, packagesPath, packageInfos);
  
  if (packageInfos.length === 0) {
    printError('没有找到有效的包');
    return;
  }
  
  printSuccess(`成功读取 ${packageInfos.length} 个包的信息`);

  // 步骤2: 获取每个包在 npm 上的最新版本
  fetchLatestVersions(packageInfos);

  // 步骤3: 计算新版本号（patch版本+1）
  calculateNewVersions(packageInfos);

  // 步骤4: 更新 package.json 文件
  await updatePackageVersions(packageInfos, packagesPath, isInternal);

  // 步骤5: 批量执行 npx matrix receive 命令
  await executeMatrixReceive(packageInfos);

  // 步骤6: 模拟 npm publish（不实际发布）
  simulateNpmPublish(packageInfos, packagesPath);

  // 总结
  printSummary(packageInfos, isInternal);
}

/**
 * 读取包信息
 */
function readPackageInfos(
  selectedPackages: string[], 
  packagesPath: string, 
  packageInfos: PackageInfo[]
): void {
  printStepHeader(1, '读取包信息', '📦');
  
  for (const pkg of selectedPackages) {
    const packagePath = path.join(packagesPath, pkg);
    
    try {
      const packageJsonContent = readPackageJson(packagePath);
      const packageName = packageJsonContent.name;
      const currentVersion = packageJsonContent.version;
      
      printSubStep(`${pkg}: ${colors.cyan}${packageName}${colors.reset}@${colors.yellow}${currentVersion}${colors.reset}`);
      
      packageInfos.push({
        name: packageName,
        folderName: pkg,
        currentVersion,
        latestNpmVersion: '',
        newVersion: '',
        packagePath
      });
    } catch (error) {
      printError(`${pkg}: 解析 package.json 失败 - ${(error as Error).message}`);
    }
  }
}

/**
 * 获取最新版本
 */
function fetchLatestVersions(packageInfos: PackageInfo[]): void {
  printStepHeader(2, '获取 npm 最新版本', '🔍');
  
  for (const info of packageInfos) {
    printProgress(`查询 ${colors.cyan}${info.name}${colors.reset} 的版本信息...`);
    
    const latestVersion = getLatestNpmVersion(info.name);
    info.latestNpmVersion = latestVersion;
    
    if (latestVersion === '0.0.0') {
      printWarning(`${info.name}: npm上未找到，将从 0.0.1 开始`);
    } else {
      printSuccess(`${info.name}: npm最新版本 ${colors.yellow}${latestVersion}${colors.reset}`);
    }
  }
}

/**
 * 计算新版本号
 */
function calculateNewVersions(packageInfos: PackageInfo[]): void {
  printStepHeader(3, '计算新版本号', '📈');
  
  for (const info of packageInfos) {
    info.newVersion = incrementPatchVersion(info.latestNpmVersion);
    printSubStep(`${colors.cyan}${info.name}${colors.reset}: ${colors.yellow}${info.latestNpmVersion}${colors.reset} → ${colors.green}${colors.bright}${info.newVersion}${colors.reset}`);
  }
}

/**
 * 更新包版本
 */
async function updatePackageVersions(
  packageInfos: PackageInfo[], 
  packagesPath: string, 
  isInternal: boolean
): Promise<void> {
  const stepTitle = isInternal ? '更新 package.json 版本和内网配置' : '更新 package.json 版本';
  printStepHeader(4, stepTitle, '✏️');
  
  for (const info of packageInfos) {
    try {
      const packagePath = path.join(packagesPath, info.folderName);
      updatePackageVersion(packagePath, info.newVersion, isInternal);
      
      if (isInternal) {
        printSubStep(`${info.folderName}: 已配置内网 registry`);
        printSuccess(`${info.folderName}: 版本已更新为 ${colors.green}${colors.bright}${info.newVersion}${colors.reset}，已配置内网发布`);
      } else {
        printSuccess(`${info.folderName}: 版本已更新为 ${colors.green}${colors.bright}${info.newVersion}${colors.reset}`);
      }
    } catch (error) {
      printError(`${info.folderName}: 更新版本失败 - ${(error as Error).message}`);
    }
  }
}

/**
 * 执行 matrix receive 命令
 */
async function executeMatrixReceive(packageInfos: PackageInfo[]): Promise<void> {
  printStepHeader(5, '执行批量编译', '🔨');
  
  const scopes = packageInfos.map(info => `--scope=${info.name}@${info.newVersion}`);
  const matrixCommand = `npx matrix receive ${scopes.join(' ')}`;
  
  printInfo(`执行命令: ${colors.cyan}${matrixCommand}${colors.reset}`);
  
  try {
    printProgress('编译中...');
    const output = execSync(matrixCommand, { 
      encoding: 'utf-8',
      stdio: 'pipe'
    });
    printSuccess('批量编译完成');
    if (output.trim()) {
      console.log(`${colors.gray}编译输出:${colors.reset}`);
      console.log(`${colors.dim}${output}${colors.reset}`);
    }
  } catch (error) {
    printError(`编译失败: ${(error as Error).message}`);
    printWarning('模拟编译完成（实际环境中需要正确的 matrix 命令）');
  }
}

/**
 * 模拟 npm publish
 */
function simulateNpmPublish(packageInfos: PackageInfo[], packagesPath: string): void {
  printStepHeader(6, '模拟 npm publish 流程', '📦');
  printWarning('注意: 这是模拟发布,不会真实发布到 npm!', 2);
  console.log();
  
  for (const info of packageInfos) {
    const packageDir = path.join(packagesPath, info.folderName);
    printSubStep(`${colors.gray}模拟:${colors.reset} cd ${colors.cyan}${packageDir}${colors.reset}`);
    printSubStep(`${colors.gray}模拟:${colors.reset} npm publish`);
    printSuccess(`模拟发布 ${colors.cyan}${info.name}${colors.reset}@${colors.green}${colors.bright}${info.newVersion}${colors.reset} 完成`, 4);
    printSubStep(`${colors.gray}模拟:${colors.reset} cd ../..`);
    console.log();
  }
}

/**
 * 打印总结
 */
function printSummary(packageInfos: PackageInfo[], isInternal: boolean): void {
  console.log();
  printBox('🎉 发布流程完成！', colors.green);
  
  console.log();
  printSeparator('─', 80, colors.cyan);
  console.log(`${colors.cyan}${colors.bright}📊 发布摘要${colors.reset}`);
  printSeparator('─', 80, colors.cyan);
  
  packageInfos.forEach(info => {
    console.log(`  ${colors.cyan}📦 ${info.name}${colors.reset}: ${colors.yellow}${info.latestNpmVersion}${colors.reset} → ${colors.green}${colors.bright}${info.newVersion}${colors.reset}`);
  });
  
  console.log();
  printSeparator('─', 80, colors.magenta);
  const commandTitle = isInternal ? '💡 实际发布到内网时，请手动执行以下命令:' : '💡 实际发布时，请手动执行以下命令:';
  console.log(`${colors.magenta}${colors.bright}${commandTitle}${colors.reset}`);
  printSeparator('─', 80, colors.magenta);
  
  packageInfos.forEach(info => {
    console.log(`  ${colors.gray}cd packages/${info.folderName} && npm publish && cd ../..${colors.reset}`);
  });
  
  if (isInternal) {
    console.log();
    printInfo('内网模式: publishConfig 已自动配置，将发布到内网 registry');
  }
  
  console.log();
}