/**
 * 开启 TS 反射机制
 */
import 'reflect-metadata';

import { Request, Response } from 'express';
import { isArray } from 'util';

import MetaSymbol from './metaSymbol';
import MetaHandler from './metaHandler';

/**
 * 「ReflectHandler」反射处理器，通用注解处理器
 */
export default class ReflectParser {
  
  /**
   * 「methodParser」方法解析器
   * 
   * @param route 路由
   * @param requestMethod 响应请求方法类型 
   */
  static methodParser(route: string, requestMethod: string) {
    return (target: Object | Function, propertyKey: string, descriptor: TypedPropertyDescriptor<Function>) => {
      // 判断装饰器是否被标记在类上
      if ((typeof target) === 'function') {

        // 抛出异常标记错误
        throw new Error ('the decorator can only be marked on the method.');
      } else if (!descriptor.value) {

        // 抛出标记目标发生错误
        throw new Error ('The target method of the tag is abnormal.');
      }

      let oldMethod = descriptor.value; // 缓存原始方法备用

      // 重构原来的「Router Method」, 在外层做封装
      descriptor.value = (req: Request, res: Response) => {
        // 执行原始方法
        let result: any = oldMethod(req);

        // 由这里统一接管响应
        res.send(result);
      }

      // 获取已经存在的元数据
      let metaHandlerArray: Array<MetaHandler> = Reflect.getMetadata(
        MetaSymbol.getMethodSymbolKey, target, target.constructor.name
      );

      /**
       * 「mapperMetadata」声明标注目标
       * 
       * @path 请求路径
       * @httpMethod 请求方法
       * @handler 处理函数
       */
      let  metaHandler: MetaHandler = new MetaHandler(
        requestMethod, route, target.constructor.name, descriptor.value
      );

      if (metaHandlerArray){
        if (isArray(metaHandlerArray)){
          metaHandlerArray.push(metaHandler);
        }
      } else {
        metaHandlerArray = new Array<MetaHandler>();
        metaHandlerArray.push(metaHandler);
      }

      /**
       * 「存储定义」声明的自定义元数据
       * 
       * @getMethodSymbolKey GET 请求方法键
       * @metadata 自定义元数据
       * @target 标注目标所属类「不包含属性的实体类」
       * @propertyKey 属性键「方法名」
       */
      Reflect.defineMetadata(MetaSymbol.getMethodSymbolKey, metaHandlerArray, target, target.constructor.name);

    }
  }
    
}