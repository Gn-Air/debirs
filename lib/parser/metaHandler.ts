/**
 * 元数据处理器
 */
export default class MetaHandler {

  /**
   * 「requestMethod」请求方法
   */
  public requestMethod: string;
  
  /**
   * 「path」请求路径
   */
  public route: string;

  /**
   * 「className」请求处理类名
   */
  public className: string;

  /**
   * 「handler」请求处理方法
   */
  public handler: Function;

  constructor(requestMethod: string, route: string, className: string, handler: Function) {
    this.route = route;
    this.requestMethod = requestMethod;

    this.className = className;
    this.handler = handler;
  }

}