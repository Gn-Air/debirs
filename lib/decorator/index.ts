/**
 * 开启 TS 反射机制
 */
import 'reflect-metadata';

import ReflectParser from '../parser/reflectParser';


/**
 * DRouter —「路径注解、标注请求处理器，可以用于标注类指明访问前缀」
 * 
 * @default GET 「默认请求方式」
 * @param path 「路径」
 */
export let DRouter = (route: string, requestMethod: string): Function => {
  return ReflectParser.methodParser(route, requestMethod);
}


/**
 * Get —「路径注解、标注请求处理器，只可以用于标注方法」
 * 
 * @param route 「路由」
 */
export let Get = (route: string): Function => {
  return ReflectParser.methodParser(route, 'get');
}

/**
 * Get —「路径注解、标注请求处理器，只可以用于标注方法」
 * 
 * @param route 「路由」
 */
export let Post = (route: string): Function => {
  return ReflectParser.methodParser(route, 'post');
}