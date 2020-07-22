/**
 * 元数据标识键抽象类
 */
export default abstract class MetadataSymbolKey {
  /**
   * 「pathSymbolKey」路径标识键. 用于获取自定义元数据请求路径的「value」值
   */
  static pathSymbolKey: Symbol = Symbol("router:path");

  /**
   * 「getMethodSymbolKey」GET 请求标识键. 用于获取自定义元数据 GET 请求方法的「value」值
   */
  static getMethodSymbolKey: Symbol = Symbol("router:getMethod");

}