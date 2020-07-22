import fs from 'fs'
import path from 'path'

/**
 * 扫描器
 */
export default class Scanner {

  constructor() {}

  /**
   * 「fsReadFilePathInDir」读取目录里的文件路径
   * 
   * @param dirPath 
   */
  fsReadFilePathInDir(dirPath: string) {
    return this.fsStats(dirPath).then(stats => {
      // 如果是文件, 返回文件路径数组
      if (stats.isFile()) return [dirPath];

      // 如果是目录, 查找文件路径
      return this.fsReadDir(dirPath).then(files => 
        Promise.all(files.map(item => 
          this.fsReadFilePathInDir(path.resolve(dirPath, item))
        ))
      ).then(subtree => [].concat(...subtree));
    })
  }


  /**
   * 「fsReadDir」对路径进行读取，获取路径下的文件夹与文件
   * 
   * @param dirPath 文件夹读取路径
   */
  fsReadDir(dirPath: string): Promise<Array<string>> {
    return new Promise<Array<string>>((resolve, reject) => {
      // 将异步函数拉取处理
      fs.readdir(dirPath, (err, files) => {
        if (err) reject(err);
        resolve(files);
      });
    });
  }


  /**
   * 「fsStat」通过文件路径判断是否为文件
   * 
   * @param filePath 文件路径
   */
  fsStats(filePath: string): Promise<fs.Stats> {
    return new Promise<fs.Stats>((resolve, reject) => {
      // 获取 fs.stats 的逻辑拉出
      fs.stat(filePath, (err, stat) => {
        if (err) reject(err);
        resolve(stat);
      });
    });
  }


  /**
   * 「fsReadFile」读取文件内容
   * 
   * @param filsPath 
   */
  fsReadFile(filsPath: string, encode?: string) {
    return new Promise((resolve, reject) => {
      if (!encode) encode = 'utf-8'
      fs.readFile(filsPath, encode, (err, file) => {
        if (err) reject(err)
        resolve(JSON.parse(file))
      });
    })
  }

}