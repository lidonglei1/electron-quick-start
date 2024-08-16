/**
 * https://www.electron.build/
 */
const { Configuration } = require('electron-builder');
const { OSS_BASEURL_MAP } = require('@yuanfudao/ada-school-utils');

module.exports = () => {
  let platform;
  switch (process.platform) {
    case 'darwin':
      platform = 'mac';
      break;
    case 'win32':
      platform = 'win';
      break;
    case 'linux':
      platform = 'linux';
      break;
    default:
      throw new Error(`不支持【${process.platform}】`);
  }
  console.log('打包目标平台：', platform);

  /**
   * @type {Configuration}
   */
  const config = {
    productName: '猿课堂-硬件助手',
    appId: 'com.ada.ada-school-link',
    directories: {
      output: `build-${platform}`,
    },
    npmRebuild: false,
    extraResources: [
      {
        from: `./tools/${platform}`,
        to: 'tools/',
      },
      {
        from: `./tools/Python`,
        to: 'tools/Python',
      },
      {
        from: './firmwares',
        to: 'firmwares/',
      },
    ],
    extraFiles: ['./package-lock.json'],
    files: ['dist', 'node_modules'],
    publish: [
      {
        provider: 'generic',
        url: `${OSS_BASEURL_MAP.PRODUCTION}/ada-school/ada-school-link/packages/${platform}/`,
      },
    ],
    mac: {
      icon: './.build/icon_mac.icns',
      target: [
        {
          target: 'dmg',
          arch: ['x64'],
        },
      ],
    },
    win: {
      icon: './.build/icon_win.ico',
      // requestedExecutionLevel: 'requireAdministrator',//为解决python库c盘无权限存储问题，需要管理员权限，但会导致某些win10 win11启动闪退
      target: [
        {
          target: 'nsis',
          arch: ['ia32'],
        },
      ],
      extraResources: [
        {
          from: './drivers',
          to: 'drivers/',
        },
      ],
    },
    linux: {
      icon: '.build',
      target: [
        {
          target: 'deb',
          arch: ['arm64'],
        },
      ],
      category: 'Utility',
      maintainer: '123',
      synopsis: '猿课堂-硬件助手',
      description: '猿课堂-硬件助手',
      desktop: {
        Name: '猿课堂-硬件助手',
        GenericName: 'Hardware Assistant',
        Comment: 'A minimal Electron application',
        Terminal: false,
        Type: 'Application',
        icon: '.build',
      },
    },
    asar: false,
    nsis: {
      include: './.build/win_reg.nsh', // web调起应用注册表操作、安装驱动
      perMachine: true, //默认选择为全部用户安装
      oneClick: false, //单击安装
      allowElevation: true, //允许请求提升。 如果为false，则用户必须使用提升的权限重新启动安装程序。
      allowToChangeInstallationDirectory: true, //是否允许用户更改安装目录。
      createDesktopShortcut: true,
      createStartMenuShortcut: true,
      shortcutName: '猿课堂-硬件助手',
    },
  };
  console.log('打包配置：', config);

  return config;
};
