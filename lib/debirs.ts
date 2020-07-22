import path from 'path'
import rootDir from 'app-root-path'
import express from 'express'

import Scanner from './scanner'
import ScanConf from './ScanConf'
import Adapter from './adapter';


export default class Debirs {
  /**
   * 项目根目录
   */
  private rootPath: string = rootDir.path;

  /**
   * 配置文件路径
   */
  private configPath: string = './';

  /**
   * 配置文件默认名
   */
  private configFileName: string = 'scanconfig.json';

  /**
   * 默认扫描配置文件路径
   */
  private scanConfPath: string = path.join(this.rootPath, this.configPath, this.configFileName);

  private scanner: Scanner;

  private adapter: Adapter;

  constructor(app: express.Application, configPath?: string) {
    this.scanner = new Scanner();
    this.adapter = new Adapter(app);
    // 判断是否使用默认配置
    if (configPath) {
      this.configPath = configPath;
      // 扫描目录配置文件路径更新
      this.scanConfPath = path.join(
        this.rootPath, this.configPath, this.configFileName
      );
    }
  }

  /**
   * 「startScanner」开始扫描
   */
  startScanner() {
    return new Promise((resolve, reject) => {
      this.scanner.fsReadFile(this.scanConfPath).then((file: any) => {
        this.scanner.fsReadFilePathInDir(file.scanPath).then(resolve);
      });
    })
  }

  adaperHandler(filePath: Array<string>) {
    this.adapter.bindHandler(filePath);
  }
}