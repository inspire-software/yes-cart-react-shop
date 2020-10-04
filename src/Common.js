/*
 * Copyright 2020 Inspire-Software.com
 *
 *    Licensed under the Apache License, Version 2.0 (the "License");
 *    you may not use this file except in compliance with the License.
 *    You may obtain a copy of the License at
 *
 *        http://www.apache.org/licenses/LICENSE-2.0
 *
 *    Unless required by applicable law or agreed to in writing, software
 *    distributed under the License is distributed on an "AS IS" BASIS,
 *    WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 *    See the License for the specific language governing permissions and
 *    limitations under the License.
 */

/**
 * User: Igor Azarny iazarny@yahoo.com
 * Date: 04-Oct-2020
 * Time: 12:10:23
 */
const allowedLAnguages = ["en", "uk", "de", "ru"];

//devdemoapi.yes-cart.org
export const CORS_PROXY = '';
//export const CORS_PROXY = 'http://localhost:8080/';


export const API_URL = 'https://demo.yes-cart.org/api/rest';
export const IMG_URL = 'https://demo.yes-cart.org/imgvault/product/';

export var YC_HEADER = '';


export function getGetData() {
    return {
        headers: {
            'Content-Type': 'application/json',
            'yc': YC_HEADER,
            'X-SALES-CHANNEL': 'localhost'
        }
    };
}


export function getPostData(reqData) {
    const data = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'X-Requested-With': 'XMLHttpRequest',
            'yc': YC_HEADER,
            'X-SALES-CHANNEL': 'localhost'
        },
    };
    if (reqData) {
        const reqBody = JSON.stringify(reqData);
        data.body = reqBody;
        data.headers['Content-Length'] = reqBody.length.toString();
    }
    return data;
}


export function extractYcHeader(resp) {
    for (var pair of resp.headers.entries()) {
        if ('yc' === pair[0]) {
            YC_HEADER = pair[1];
        }
    }
}

export function getLanguage() {

    var language = window.navigator.userLanguage || window.navigator.language;
    var res = language.substring(0, 2).toLowerCase();
    if (allowedLAnguages.includes(res)) {
        return res;
    } else {
        return 'en';
    }

}

export function splitToKeyValue(strValue) {
    let rez = [];
    strValue.split(",").map((kvitem) => {
        let kv = kvitem.split("-");
        let val = kv[0];
        if (kv.length > 1) {
            val = kv[0];
        }
        rez.push(
            {
                key: kv[0],
                val: val
            }
        )

    })
    return rez;

}

export function isEmpty(map) {
    for (var key in map) {
        if (map.hasOwnProperty(key)) {
            return false;
        }
    }
    return true;
}

export function getDisplayNameFromNames(names) {
    var rez = names[getLanguage()];
    if (!rez) {
        rez = names['en'];
    }
    if (!rez) {
        rez = names['xx'];
    }
    return rez;
}

export function getDisplayName(categoryItem) {
    var rez = getDisplayNameFromNames(categoryItem.displayNames);
    if (!rez) {
        rez = categoryItem.name;
    }
    return rez;
}

export function getProductDisplayName(product) {
    var rez = getDisplayNameFromNames(product.displayName ? product.displayName : product.displayNames);
    if (!rez) {
        rez = product.name;
    }
    return rez;
}

export function getProductDisplayDescription(product) {
    var rez = getDisplayNameFromNames(product.displayDescription);
    if (!rez) {
        rez = product.description;
    }
    if (!rez) {
        rez = product.name;
    }
    return rez;
}

export function getAttributeGroupDisplayName(attr) {
    var rez = getDisplayNameFromNames(attr.displayNames);
    if (!rez) {
        rez = 'Need name for aar with code ' + attr.code;
    }
    return rez;
}

export function getAttributeGroupDisplayVals(attr) {
    var rez = getDisplayNameFromNames(attr.displayVals);
    if (!rez) {
        rez = attr.val;
    }
    return rez;
}

export function getAttributeDisplayName(attr) {
    var rez = getDisplayNameFromNames(attr.attributeDisplayNames);
    if (!rez) {
        rez = attr.attributeName;
    }
    return rez;
}

export function getAttributeDisplayValue(attr) {
    var rez = getDisplayNameFromNames(attr.displayVals);
    if (!rez) {
        rez = attr.val;
    }
    return rez;
}


export function getFilteredNavCaption(fnAttribute) {

    let rez = fnAttribute.displayName;
    if (!rez) {
        rez = fnAttribute.name;
    }
    if (!rez) {
        rez = 'Code'; // TODO wtf
    }
    return rez.charAt(0).toUpperCase() + rez.slice(1);

}


export function adaptFilterParametersToReqParams(filterParameters) {
    var parameters = {};
    filterParameters.map((keyVal, index) => {
        const val = [];
        val.push(keyVal.value);
        parameters[keyVal.code] = val;
    });
    return parameters;
}

/**
 * Copy fields with data from source to destinations
 * @param src
 * @param dst
 */
export function copyFields(src, dst) {
    for (var key in src) {
        dst[key] = src[key];
    }
}

/**
 * Remove perfix from object filed.
 * @param obj object
 * @param prefix filed prefix
 */
export function removePrefix(obj, prefix) {
    for (var key in obj) {
        if (key.indexOf(prefix) > -1) {
            let newFieldName = key.replace(prefix, '');
            obj[newFieldName] = obj[key];
            delete obj[key];
        }
    }
}

/**
 * Add perfix to all field. Old will be deleted.
 * @param obj object
 * @param prefix filed prefix
 */
export function addPrefix(obj, prefix) {
    for (var key in obj) {
        let newFieldName = prefix + key;
        obj[newFieldName] = obj[key];
        delete obj[key];
    }
}

/**
 * Delete all field with null values
 * @param obj object
 */
export function deleteIfNull(obj) {
    for (var key in obj) {
        if (!obj[key]) {
            delete obj[key];
        }
    }
}


/**
 * Remove fields , which are not in allowed array.
 * @param obj object
 * @param arr
 */
export function filterFields(obj, arr) {
    for (var key in obj) {
        if (arr.indexOf(key) === -1) {
            delete obj[key];
        }
    }
}


