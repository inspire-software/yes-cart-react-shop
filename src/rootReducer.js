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
import ViewMode from "./ViewMode";

const initialState = {
    ycToken: null,
    rootCategoryId: 0,
    rootCategoryName: '',
    rootMenu: [],
    currentCategoryId: 0,
    currentMenu: [],
    breadcrumbs: [],
    categoryNavigationData: {},
    filterParameters: [],


    prodListSortField : '',
    prodListSortOrder : false,
    prodListPageSize : 10,
    prodListCurrentPage : 0,
    prodListSearchResult : {},

    prodItemCurrentSku : null,
    prodItemCurrentProduct: null,

    cart : null,

    loginInfo : null,
    customerSummary : null,

    viewMode : ViewMode.VIEW_SHOP,
    viewStep : null

};

function getCurrentMenu(rootMenu, selectedCategory) {
    for (let idx = 0; idx < rootMenu.length; idx++) {
        const candidate = rootMenu[idx];
        if (candidate.categoryId === selectedCategory) {
            return {found : true, children : candidate.children, breadcrumbs : candidate.breadcrumbs};
        }
        let rez = getCurrentMenu(candidate.children, selectedCategory);
        if (rez.found) {
            return rez;
        }
    }
    return {found : false, children: rootMenu, breadcrumbs : []};
}


function rootReducer(state = initialState, action) {

    var newState = {};
    Object.assign(newState, state);

    if ("SET_ROOT" === action.type) {
        newState.rootCategoryId = action.rootCategoryId;
        newState.rootCategoryName = action.rootCategoryName;
    }

    if ("SET_ROOT_MENU" === action.type) {
        newState.rootMenu = action.menu;
    }

    if ("SET_CATEGORY" === action.type) {
        newState.currentCategoryId = action.currentCategoryId;
        let navData = getCurrentMenu(newState.rootMenu, newState.currentCategoryId);
        newState.currentMenu = navData.children;
        newState.breadcrumbs = navData.breadcrumbs;
        newState.prodItemCurrentProduct = null;
        newState.prodItemCurrentSku = null;
        newState.viewMode = ViewMode.VIEW_SHOP;
    }

    if ("SET_NAV_DATA" === action.type) {
        newState.categoryNavigationData = action.categoryNavigationData;
        newState.prodItemCurrentProduct = null;
        newState.prodItemCurrentSku = null;

    }

    if ("DEL_ALL_NAV_DATA_FILTER" === action.type) {
        newState.filterParameters = [];
        newState.prodItemCurrentProduct = null;
        newState.prodItemCurrentSku = null;
        newState.viewMode = ViewMode.VIEW_SHOP;
    }

    if ("DEL_NAV_DATA_FILTER" === action.type) {
        let newFilter = [];
        for (let i = 0; i < newState.filterParameters.length; i++) {
            if (action.code !== newState.filterParameters[i].code) {
                newFilter.push(newState.filterParameters[i]);
            }
        }
        newState.filterParameters = newFilter;
        newState.prodItemCurrentProduct = null;
        newState.prodItemCurrentSku = null;
        newState.viewMode = ViewMode.VIEW_SHOP;
    }

    if ("DEL_AFTER_NAV_DATA_FILTER" === action.type) {
        let newFilter = [];
        for (let i = 0; i < newState.filterParameters.length; i++) {
            newFilter.push(newState.filterParameters[i]);
            if (action.code === newState.filterParameters[i].code) {
                break;
            }
        }
        newState.filterParameters = newFilter;
        newState.prodItemCurrentProduct = null;
        newState.prodItemCurrentSku = null;
        newState.viewMode = ViewMode.VIEW_SHOP;

    }


    /**
     * Just small help - the 'tag' will be only one

     */
    if ("ADD_NAV_DATA_FILTER" === action.type) {
        var newArray = [...newState.filterParameters];
        newArray = newArray.filter(value => {return !(value.code === 'tag')}); //only one tag

        const found = newArray.find(
            value => (value.code === action.code && value.value === action.value
            &&  value.displayCode === action.displayCode && value.displayValue === action.displayValue));

        if (!found) {
            newArray.push( {code : action.code, value: action.value,
                displayCode : action.displayCode, displayValue : action.displayValue} );
        }

        newState.filterParameters = newArray;
        newState.prodItemCurrentProduct = null;
        newState.prodItemCurrentSku = null;

        newState.viewMode = ViewMode.VIEW_SHOP;

    }


    if ("PROD_LIST_SEARCH_RESULT" === action.type) {
        newState.prodListSearchResult = action.searchResult;
        newState.prodItemCurrentProduct = null;
        newState.prodItemCurrentSku = null;
    }

    if ("PROD_LIST_SET_PAGE" === action.type) {
        newState.prodListCurrentPage = action.page;
    }
    if ("PROD_LIST_SET_PAGE_SIZE" === action.type) {
        newState.prodListPageSize = action.pageSize;
    }
    if ("PROD_LIST_SET_SORT_FIELD" === action.type) {
        newState.prodListSortField = action.sortField;
    }
    if ("PROD_LIST_SET_SORT_ORDER" === action.type) {
        newState.prodListSortOrder = action.sortOrder;
    }
    if ("SET_SKU" === action.type) {
        newState.prodItemCurrentSku = action.sku;
    }

    if ("SET_PRODUCT" === action.type) {
        newState.prodItemCurrentProduct = action.product;
    }

    if ("SET_CART" === action.type) {
        newState.cart = action.cart;
    }

    if ("SET_LOGIN_INFO" === action.type) {
        newState.loginInfo = action.loginInfo;
        if ( newState.loginInfo == null ) {
            newState.viewStep = ViewMode.VIEW_CHECKOUT_STEP_0;
            newState.customerSummary = null;
        }
    }

    if ("SET_VIEW_SHOP" === action.type) {
        newState.viewMode = ViewMode.VIEW_SHOP;
    }

    if ("SET_VIEW_CART" === action.type) {
        newState.viewMode = ViewMode.VIEW_CART;
    }

    if ("SET_VIEW_CHECKOUT" === action.type) {
        newState.viewMode = ViewMode.VIEW_CHECKOUT;
    }

    if ("SET_VIEW_PROFILE" === action.type) {
        newState.viewMode = ViewMode.VIEW_PROFILE;
    }

    if ("SET_VIEW_LOGINREGISTER" === action.type) {
        newState.viewMode = ViewMode.VIEW_LOGINREGISTER;
    }

    if ("SET_VIEW_STEP" === action.type) {
        newState.viewStep = action.viewStep;
    }

    if ("SET_CUSTOMER_SUMMARY" === action.type) {
        newState.customerSummary = action.customerSummary;
    }

    return newState;
};

export default rootReducer;