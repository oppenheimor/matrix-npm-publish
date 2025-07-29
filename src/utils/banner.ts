/**
 * 横幅显示工具
 */
import { colors, ASCII_BANNER, APP_VERSION } from '../constants';

/**
 * 打印 Matrix Publish 横幅
 */
export function printMatrixPublishBanner(): void {
  const banner = `
${colors.green}${colors.bright}${ASCII_BANNER.MATRIX.join(`\n${colors.green}${colors.bright}`)}${colors.reset}

${colors.cyan}${colors.bright}${ASCII_BANNER.PUBLISH.join(`\n${colors.cyan}${colors.bright}`)}${colors.reset}

${colors.yellow}${colors.dim}         Package Selection & Publishing Tool${colors.reset}
${colors.magenta}${colors.dim}                    v${APP_VERSION}${colors.reset}
`;

  console.log(banner);
}