function utilities() {
    let response = {
        data:null,
        message:"",
        status:""
    }

    function SuccessResponse(data) {
        response["data"] = data,
        response["message"] = "request successfully executed"
        response["status"] = "success"

        return response
    }

    function GetResponse(message, status, data=null) {
        response["message"] = message,
        response["status"] = status,
        response["data"] = data

        return response
    }

    function Contains(rule_field, rule_value) {
        const _input =  rule_field+""
        return _input.includes(rule_value)
    }

    const constraints= {
        eq:"eq",
        neq:"neq",
        gt:"gt",
        gte:"gte",
        lt:"lt",
        lte:"lte",
        contains:"contains"

    }

    function objectContains(object, field)  {
        const _input ={...object}  // collect incoming object
     //   console.log(_input)
       // const resp =  Object.create();
      //  const primitiveType = typeof(field) != "object" ? true : false; // check if the field is a primitive type
        const contains = _input[field] // collecting the value of field from object

        return contains != null || contains != undefined // this will check if (_input) object contains field, returning true or false
        
    }

    function getNestedObject(obj, object_field) {
        const _object_keys = Array.from(Object.keys(obj[object_field]))
        console.log(_object_keys)
        let result =  obj[object_field];
        // for(let k of _object_keys) {
        //     const current = k;
        //    // console.log(current)
        //     // check to see if this nested object
        //     const typeoFCurrent = typeof(current)
        //     console.log(typeoFCurrent)
        //     if(typeoFCurrent != "object")  {
        //         result = obj[current]
        //         break;
        //     }
        //     else {
        //         if(Array.isArray(current)) {
        //             result = obj[current]
        //             break;
        //         }

        //         if(typeof(current) == "object") {
        //             result = obj[current]
        //             break;
        //         }
        //     }
        // }

        return result

    }
    function isNestObjectContains(obj, object_field) {
        // this function checks if the field you want to check is a nested objects, array etc
        const _input = {...obj}
        const trySPlit = object_field.split(".")
        let isObject = false;
        // address.city
        //console.log(trySPlit)
        if(trySPlit.length == 1) {
            
            return objectContains(obj, trySPlit);
            // isObject =  typeof(obj[trySPlit[0]]) != "number"  
            // && typeof(obj[trySPlit[0]]) != "string"  && typeof(obj[trySPlit[0]]) !=  "boolean" 
            // && typeof(obj[trySPlit[0]]) != "function" && typeof(obj[trySPlit[0]]) != "bigint" &&
            // typeof(obj[trySPlit[0]]) != "number" // is this object
        }
        else {
            // using address.city for an instance
            const second = trySPlit[1];
            const objectType = objectContains(obj[trySPlit[0]], second)
            console.log(second)
            console.log(obj[trySPlit[0]])
            // isObject =  typeof(objectType) != "number"  
            // && typeof(objectType) != "string"  && typeof(objectType) !=  "boolean" 
            // && typeof(objectType) != "function" && typeof(objectType) != "bigint" &&
            // typeof(objectType) != "number" // is this object

            return objectType
        }
       
      // return isObject;
        
       
    }

    function isValidJsonObject(object) {
        try {
            const obj = JSON.parse(JSON.stringify(object));
          //  console.log(obj)
            return true;
        } catch (error) {
            console.log(new Error(error).message)
            return false
        }

        return false;
    }

    function getNameOfObject(objectName) {
        const obj = Object.keys(objectName)[0]
        const type = typeof(objectName)
        return obj
        // if(type == "function") {
        //     return type.toString()
        // }

        // if(type == "object") {
        //     return type.toString()
        // }

        return type.toString();
    }

    function checkifNotWrongType(payload) {
        const data_field = payload["rule"]["field"];
        const condition_value = payload["rule"]["condition_value"]
        const splitDataField = data_field.split(".")
        let result = false
        console.log(splitDataField.length)
        if(splitDataField.length == 1) {
            const dataFieldValueTYpe = typeof(payload["data"][data_field])
            
            const conditionValueType = typeof(condition_value)
            result = dataFieldValueTYpe.toString() == conditionValueType.toString() ? 1 : 0

        }
        else {
            const first = splitDataField[0]
            const second = splitDataField[1]
            // address.city
            console.log(payload["data"][first][second])
            const dataFieldValueTYpe = typeof(payload["data"][first][second])
            const conditionValueType = typeof(condition_value)
            result = dataFieldValueTYpe.toString() == conditionValueType.toString() ? 1 : 0
        }
        // const dataFieldValueTYpe = typeof(data_field)
        // const conditionValueType = typeof(condition_value)
        // //console.log(dataFieldValueTYpe.toString() == conditionValueType.toString())
        // return dataFieldValueTYpe.toString() == conditionValueType.toString() ? 1 : 0
        return result
    }

    function fieldValidation(condition, a,b) {

       
        switch(condition) {
            case constraints.eq:
                return a == b;
            case constraints.gt:
                return a > b;
            case constraints.gte:
                return a >= b
            case constraints.lt:
                return a < b;
            case constraints.lte:
                return a <= b;
            case constraints.neq:
                console.log("a", a,"b", b, "cn", condition)
                return a != b
            case "contains":
                return Contains(a,b)

                
        }
    }

    function ruleValidation(payload) {
        const conditionType = payload["rule"]["condition"]
        console.log("type", conditionType)
        const conditionValue = payload["rule"]["condition_value"]
        const field_to_validate = payload["rule"]["field"]
        const splitFieldValue = field_to_validate.split(".")

        if(splitFieldValue.length == 1) {
            const isConditionTrue = fieldValidation(conditionType, payload["data"][field_to_validate], conditionValue);
            if(isConditionTrue) {
                const message = `field ${field_to_validate} successfully validated`
                const validation = {

                    validation:
                    {
                        error:false,
                        field:field_to_validate,
                        field_value:payload["data"][field_to_validate],
                        condition:conditionType,
                        condition_value:conditionValue
                    }
                   
                }
                return  GetResponse(message, "success", validation)
            }
            else 
            {
                const message = `field ${field_to_validate} failed validation`
                const validation = {

                    validation:
                    {
                        error:true,
                        field:field_to_validate,
                        field_value:payload["data"][field_to_validate],
                        condition:conditionType,
                        condition_value:conditionValue
                    }
                    
                }
                return  GetResponse(message, "error", validation)
            }
                
        }
        else {
            const first = splitFieldValue[0]
            const second = splitFieldValue[1]
            // address.city
            //console.log(payload["data"][first][second])
            const isConditionTrue = fieldValidation(conditionType, payload["data"][first][second], conditionValue)
            if(isConditionTrue) {
                const message = `field ${field_to_validate} successfully validated`
                const validation = {
                    validation:{
                        error:false,
                        field:field_to_validate,
                        field_value:payload["data"][first][second],
                        condition:conditionType,
                        condition_value:conditionValue
                    }
                    
                }
                return  GetResponse(message, "success", validation)
            }

            else 
            {

                const message = `field ${field_to_validate} failed validation`
                const validation = {
                    validation:
                    {
                        error:true,
                        field:field_to_validate,
                        field_value:payload["data"][first][second],
                        condition:conditionType,
                        condition_value:conditionValue    
                    }
                    
                }
                return  GetResponse(message, "error", validation)

            }

        }
        

    }

    function validateRule(payload) {
        if(isValidJsonObject(payload)) {
            const isRuleDefined = objectContains(payload, "rule")
            if(isRuleDefined) {
                const isDataFieldDefined = objectContains(payload, "data")
                if(isDataFieldDefined) {
                  const isRuleFieldContainsField = objectContains(payload["rule"], "field")
                  const isRuleFieldContainsConditionsField = objectContains(payload["rule"], "condition")
                  const isRuleFiedContainsConditionValueField = objectContains(payload["rule"], "condition_value")

                  if(isRuleFieldContainsField && isRuleFieldContainsConditionsField
                    && isRuleFiedContainsConditionValueField) 
                    {
                        // check to see the function you want to validate is not missing in data field
                        //const isNestedObject = isNestObject(payload, "data")
                        const isRequiredPresent = isNestObjectContains(payload["data"], payload["rule"]["field"])

                        if(isRequiredPresent) {
                            // check to see if wrong type is not passed as data.field to validate
                            const isWrongDataType = checkifNotWrongType(payload)
                            if(isWrongDataType) {
                                return ruleValidation(payload)
                            }
                            return {
                                status: false,
                                message: `${payload["rule"]["field"]} should be ${typeof(payload["rule"]["condition_value"])}`
                            }
                        }

                    //    / const objName = getNameOfObject({payload["data"]})
                        return {
                            status: false,
                            message: `data.${payload["rule"]["field"]} is required`
                        }
                  }

                    return {
                        status:false,
                        message: `rule field must contains field, condtiond and condition_value`
                    }

                }
                return {
                    status:false,
                    message: `data field is required`
                }

            }
    
            return {
                status:false,
                message: `rule field is required`
            }
        }

        return {
            status:false,
            message: `payload is an invalid json object`
        }
        
    }

    // const payload = {
    //     "rule": {
    //      "field": "address.city",
    //       "condition": "neq",
    //       "condition_value": true
    //     },
    //     "data": {
    //       "name": "James Holden",
    //       "crew": "Rocinante",
    //       "age": 34,
    //       "position": "Captain",
    //       "missions": true,
    //       "address":{"city":false}
    //     }
    //   }


    return {
        SuccessResponse,
        constraints,
        objectContains,
        isNestObjectContains,
        getNestedObject,
        getNameOfObject,
      //  payload,
        GetResponse,
        validateRule
    }
}


module.exports = utilities
// const fp = utilities()
// const obj = {
//     "name":"tunde",
//     "addresss":{
//         "city":"lagos"
//     }
// }
// // console.log(fp.objectContains(obj, "name"))
// console.log(fp.validateRule(fp.payload))
// // console.log(fp.objectContains(obj, "location"))
// // console.log(fp.isNestObject(obj, "addresss"))