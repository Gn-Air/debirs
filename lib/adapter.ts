import express from 'express'

import MetaHandler from "./parser/metaHandler";
import MetaSymbol from "./parser/metaSymbol";

/**
 * 「Adapter」处理器适配器
 */
export default class Adapter {
  private app: express.Application;

  constructor(app: express.Application) {
    this.app = app;
  }

  /**
   * 「bindHandler」映射路由绑定处理器
   * 
   * @param filePathArray 文件路径数组
   */
  bindHandler(filePathArray: Array<string>) {
    filePathArray.forEach(fileDir => {
      /**
       * 加载自定义处理器
       */
      let Handler = require(fileDir).default;
      let handler = new Handler(); // 创建处理器对象

      /**
       * 获取通过反射存储的元数据
       */
      let metadataArray: Array<MetaHandler> = Reflect.getMetadata(
        MetaSymbol.getMethodSymbolKey, handler, handler.constructor.name
      );

      metadataArray.forEach(metadata => {
        if (!metadata) throw new Error('metadata retrieval exception');
        this.adapterHandler(metadata);
      })
    })
  }

  /**
   * 「adapterHandler」适配处理器
   * 
   * @param metadata 元数据
   */
  private adapterHandler(metadata: any) {
    switch(metadata.requestMethod) {
      case 'get':
        this.app.get(metadata.route, metadata.handler);
        break;
      case 'post':
        this.app.post(metadata.route, metadata.handler);
        break;
      case 'put':
        this.app.put(metadata.route, metadata.handler);
        break;
      case 'delete':
        this.app.delete(metadata.route, metadata.handler);
        break;
    }
  }
}