/**
 * 显示工具函数
 */
import { colors } from '../constants';
import { ColorString } from '../types';

/**
 * 打印分隔线
 */
export function printSeparator(char = '═', length = 80, color: ColorString = colors.cyan): void {
  console.log(`${color}${char.repeat(length)}${colors.reset}`);
}

/**
 * 打印边框盒子
 */
export function printBox(text: string, color: ColorString = colors.cyan): void {
  const boxWidth = 80;
  const textLength = text.replace(/\x1b\[[0-9;]*m/g, '').length; // 去除ANSI颜色代码计算长度
  const padding = Math.max(0, boxWidth - textLength - 4);
  const leftPadding = Math.floor(padding / 2);
  const rightPadding = padding - leftPadding;
  
  console.log(`${color}╭${'─'.repeat(boxWidth - 2)}╮${colors.reset}`);
  console.log(`${color}│${' '.repeat(leftPadding)}${text}${' '.repeat(rightPadding)}│${colors.reset}`);
  console.log(`${color}╰${'─'.repeat(boxWidth - 2)}╯${colors.reset}`);
}

/**
 * 打印步骤标题
 */
export function printStepHeader(step: number, title: string, emoji: string): void {
  console.log();
  printSeparator('═', 80, colors.cyan);
  console.log(`${colors.cyan}${colors.bright}╭─ STEP ${step} ─────────────────────────────────────────────────────────────────╮${colors.reset}`);
  console.log(`${colors.cyan}${colors.bright}│${colors.reset} ${emoji} ${colors.white}${colors.bright}${title}${colors.reset}${' '.repeat(Math.max(0, 66 - title.length))}${colors.cyan}${colors.bright}│${colors.reset}`);
  console.log(`${colors.cyan}${colors.bright}╰─────────────────────────────────────────────────────────────────────────╯${colors.reset}`);
}

/**
 * 打印成功消息
 */
export function printSuccess(message: string, indent: number = 2): void {
  console.log(`${' '.repeat(indent)}${colors.green}✓${colors.reset} ${colors.white}${message}${colors.reset}`);
}

/**
 * 打印警告消息
 */
export function printWarning(message: string, indent: number = 2): void {
  console.log(`${' '.repeat(indent)}${colors.yellow}⚠${colors.reset} ${colors.yellow}${message}${colors.reset}`);
}

/**
 * 打印错误消息
 */
export function printError(message: string, indent: number = 2): void {
  console.log(`${' '.repeat(indent)}${colors.red}✗${colors.reset} ${colors.red}${message}${colors.reset}`);
}

/**
 * 打印信息消息
 */
export function printInfo(message: string, indent: number = 2): void {
  console.log(`${' '.repeat(indent)}${colors.blue}ℹ${colors.reset} ${colors.white}${message}${colors.reset}`);
}

/**
 * 打印进度消息
 */
export function printProgress(message: string, indent: number = 2): void {
  console.log(`${' '.repeat(indent)}${colors.cyan}⚡${colors.reset} ${colors.cyan}${message}${colors.reset}`);
}

/**
 * 打印子步骤消息
 */
export function printSubStep(message: string, indent: number = 4): void {
  console.log(`${' '.repeat(indent)}${colors.gray}├─${colors.reset} ${colors.white}${message}${colors.reset}`);
}