/**
 * Created by wangshuyi on 2016/12/30.
 */

'use strict';
const tool = require('./tool');
const util = {};

util.formatCondition = function(condition){
    let key, realKey;
    delete condition._;
    for(key in condition){
        if(condition[key] === "" || condition[key] === null){
            delete condition[key];
        }else if(condition[key] === "-"){
            condition[key] = "";
        }else if(/_like$/.test(key)){
            condition[key.replace(/_like$/, '')] = {'$regex': condition[key]};
            delete condition[key];
        }else if(/_dateTime_start$/.test(key)){
            realKey = key.replace(/_dateTime_start$/, '');
            if(condition[realKey]){
                condition[realKey]['$gte'] = tool.string2date(condition[key], 'yyyy-MM-dd hh:mm');
            }else{
                condition[realKey] = {'$gte': tool.string2date(condition[key], 'yyyy-MM-dd hh:mm')};
            }
            condition[realKey]['$gte'].setSeconds(0);
            condition[realKey]['$gte'].setMilliseconds(0);
            delete condition[key];
        }else if(/_dateTime_end$/.test(key)){
            realKey = key.replace(/_dateTime_end$/, '');
            if(condition[realKey]){
                condition[realKey]['$lte'] = tool.string2date(condition[key], 'yyyy-MM-dd hh:mm')
            }else{
                condition[realKey] = {'$lte': tool.string2date(condition[key], 'yyyy-MM-dd hh:mm')};
            }
            condition[realKey]['$lte'].setSeconds(59);
            condition[realKey]['$lte'].setMilliseconds(59);
            delete condition[key];
        }else if(/_date_start$/.test(key)){
            realKey = key.replace(/_date_start$/, '');
            if(condition[realKey]){
                condition[realKey]['$gte'] = tool.string2date(condition[key], 'yyyy-MM-dd')
            }else{
                condition[realKey] = {'$gte': tool.string2date(condition[key], 'yyyy-MM-dd')};
            }
            // condition[realKey]['$gte'].setDate(1);
            condition[realKey]['$gte'].setHours(0);
            condition[realKey]['$gte'].setMinutes(0);
            condition[realKey]['$gte'].setSeconds(0);
            condition[realKey]['$gte'].setMilliseconds(0);
            delete condition[key];
        }else if(/_date_end$/.test(key)){
            realKey = key.replace(/_date_end$/, '');
            if(condition[realKey]){
                condition[realKey]['$lte'] = tool.string2date(condition[key], 'yyyy-MM-dd')
            }else{
                condition[realKey] = {'$lte': tool.string2date(condition[key], 'yyyy-MM-dd')};
            }
            // condition[realKey]['$lte'].setMonth(condition[realKey]['$lte'].getMonth() + 1);
            // condition[realKey]['$lte'].setDate(0);
            condition[realKey]['$lte'].setHours(23);
            condition[realKey]['$lte'].setMinutes(59);
            condition[realKey]['$lte'].setSeconds(59);
            condition[realKey]['$lte'].setMilliseconds(999);
            delete condition[key];
        }else if(/_date_range$/.test(key)){
            if(condition[key].length > 0) {
                realKey = key.replace(/_date_range$/, '');
                condition[realKey] = {
                    '$gte': new Date(condition[key][0]),
                    '$lte': new Date(condition[key][1])
                };
                condition[realKey]['$lte'].setHours(23);
                condition[realKey]['$lte'].setMinutes(59);
                condition[realKey]['$lte'].setSeconds(59);
                condition[realKey]['$lte'].setMilliseconds(999);
            }
            delete condition[key];
        }else if(/_notEquil$/.test(key)){
            condition[key.replace(/_notEquil$/, '')] = {'$ne': condition[key]};
            delete condition[key];
        }else if(/_number_min$/.test(key)){
            realKey = key.replace(/_number_min$/, '');
            if(condition[realKey]){
                condition[realKey]['$gte'] = condition[key]
            }else{
                condition[realKey] = {'$gte': condition[key]};
            }
            delete condition[key];
        }else if(/_number_max$/.test(key)){
            realKey = key.replace(/_number_max$/, '');
            if(condition[realKey]){
                condition[realKey]['$lte'] = condition[key]
            }else{
                condition[realKey] = {'$lte': condition[key]};
            }
            delete condition[key];
        }else if(/_in$/.test(key)){
            if(condition[key].length > 0){
                if(condition[key.replace(/_in$/, '')] && typeof condition[key.replace(/_in$/, '')] === 'object'){
                    condition[key.replace(/_in$/, '')]['$in'] = condition[key];
                }else{
                    condition[key.replace(/_in$/, '')] = {'$in': condition[key]};
                }
            }
            delete condition[key];
        }else if(/_near$/.test(key)){
            if(condition[key].length > 0){
                if(condition[key.replace(/_near$/, '')] && typeof condition[key.replace(/_near$/, '')] === 'object'){
                    condition[key.replace(/_near$/, '')]['$near'] = condition[key];
                }else{
                    condition[key.replace(/_near$/, '')] = {'$near': condition[key]};
                }
            }
            delete condition[key];
        }

    }
    return condition;
};
util.formatData = function(data){
    let key;
    for(key in data){
        if(/_array$/.test(key)){
            data[key.replace(/_array$/, '')] = data[key] || [];
            delete data[key];
        }else if(/_date$/.test(key)){
            data[key.replace(/_date$/, '')] = data[key]?tool.string2date(data[key] + ' 00:00:00', 'yyyy-MM-dd hh:mm:ss'):'';
            delete data[key];
        }else if(/_datetime$/.test(key)){
            data[key.replace(/_datetime$/, '')] = data[key]?tool.string2date(data[key] + ':00', 'yyyy-MM-dd hh:mm:ss'):'';
            delete data[key];
        }
    }
    return condition;
};


module.exports = util;