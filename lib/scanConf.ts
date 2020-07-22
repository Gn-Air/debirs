import { deflate } from "zlib";

/**
 * 「ScanConf」扫描配置类
 */
export default class ScanConf {
  /**
   * 「scanPath」扫描路径
   */
  public scanPath: string;

  /**
   * 「targetPath」目标路径
   */
  public targetPath: string;

  constructor(scanPath: string, targetPath: string) {
    this.scanPath = scanPath;
    this.targetPath = targetPath;
  }
  
}