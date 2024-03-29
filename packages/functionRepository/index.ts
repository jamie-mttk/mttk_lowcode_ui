import * as elementFunctions from './element/index'
import * as chartsFunctions from './charts/index'

const functions = {}
export default function useFunctionRepository() {
  //
  function regist(key: string, func: Function) {
    functions[key] = func
  }
  //
  function registBatch(funcs:object){
    for(const k of Object.keys(funcs)){
      regist(k,funcs[k])
    }
  }
  function get(key: string) {
    return functions[key]
  }
  function list() {
    return Object.keys(functions)
  }

  function useBuitin(){
   
  registBatch(elementFunctions)
	registBatch(chartsFunctions)
  }
  //
  return { regist,registBatch, get, list,useBuitin }
}
