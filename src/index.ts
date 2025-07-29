#!/usr/bin/env node

/**
 * Matrix Publish - 包发布工具主入口
 */

import { Command } from 'commander';
import * as path from 'path';
import inquirer from 'inquirer';

// 导入模块
import { APP_NAME, APP_DESCRIPTION, APP_VERSION, colors } from './constants';
import { printMatrixPublishBanner, printError, printWarning, printInfo, printSeparator, getPackageDirectories } from './utils';
import { processSelectedPackages } from './core';
import { CommandOptions, PackageSelectionAnswers } from './types';

const program = new Command();

program
  .name(APP_NAME)
  .description(APP_DESCRIPTION)
  .version(APP_VERSION)
  .option('--internal', '使用内网模式，配置内网 registry')
  .action(async (options: CommandOptions) => {
    try {
      // 显示启动横幅
      printMatrixPublishBanner();
      
      // 检查 packages 目录
      const packagesPath = path.join(process.cwd(), 'packages');
      let directories: string[];
      
      try {
        directories = getPackageDirectories(packagesPath);
      } catch (error) {
        printError((error as Error).message);
        return;
      }
      
      if (directories.length === 0) {
        printError('packages 目录下没有找到子目录');
        return;
      }
      
      console.log();
      printInfo('请选择要操作的包 (使用空格键选择/取消选择, 回车键确认):');
      
      // 使用 inquirer 进行多选
      const answers: PackageSelectionAnswers = await inquirer.prompt([
        {
          type: 'checkbox',
          name: 'selectedPackages',
          message: '选择包:',
          choices: directories.map(dir => ({
            name: dir,
            value: dir
          }))
        }
      ]);
      
      if (answers.selectedPackages.length === 0) {
        printWarning('没有选择任何包');
        return;
      }
      
      // 显示选中的包
      console.log();
      printSeparator('─', 80, colors.green);
      console.log(`${colors.green}${colors.bright}✅ 选中的包 (${answers.selectedPackages.length} 个)${colors.reset}`);
      printSeparator('─', 80, colors.green);
      answers.selectedPackages.forEach((pkg: string) => {
        console.log(`  ${colors.green}▸${colors.reset} ${colors.white}${pkg}${colors.reset}`);
      });

      // 执行包发布流程
      await processSelectedPackages(answers.selectedPackages, packagesPath, options.internal);
      
    } catch (error) {
      printError(`读取 packages 目录时出错: ${(error as Error).message}`);
    }
  });

program.parse();