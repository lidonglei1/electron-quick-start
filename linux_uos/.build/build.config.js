/**
 * https://www.electron.build/
 */
const { Configuration } = require('electron-builder');

module.exports = () => {
  /**
   * @type {Configuration}
   */
  const config = {
    productName: 'linktest',
    appId: 'com.ada.ada-school-link',
    npmRebuild: false,
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
      synopsis: 'linktestlinktest',
      description: 'linktest',
      desktop: {
        Name: 'linktestName',
        GenericName: 'Hardware Assistant',
        Comment: 'A minimal Electron application',
        Terminal: false,
        Type: 'Application',
        icon: '.build',
        afterInstall:'./.build/create_shGenFile.sh',
      },
    },
    asar: false,
  };
  console.log('打包配置：', config);

  return config;
};
