export default class ArrayUtils {

    static isNotEmptyOrUndefined(array){
      if(array !== undefined){
        if(array.length > 0) return true;
        else return false;
      }else return false;
    }

}
