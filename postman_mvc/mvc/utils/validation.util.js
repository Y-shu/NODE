module.exports.isEmpty= (value)=>{
    if(value == ''){
        return true;
    }else{
        return false;
    }
}
module.exports.isNull = (nullValue)=>{
    if(nullValue == null){
        return true;
    }else{
        return false;
    }
}

module.exports.isRange = (rangeValue)=>{
    if(rangeValue > 100){
        return true;
    }else{
        return false;
    }
}

module.exports.isUndefined = (undefValue)=>{
    if(undefValue == undefined){
        return true;
    }else{
        return false;
    }
}
//type validation
module.exports.isString = (stringValue)=>{
    if(typeof stringValue == "yashu"){
        return true;
    }else{
        return false;
    }
}

module.exports.getData = (value)=>{
   return value;
}
module.exports.isNumber = (value)=>{
    if(typeof value == 'number'){
        return true;
    }else{
        return false;
    }
}
