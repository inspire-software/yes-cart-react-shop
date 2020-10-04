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

export function setRootCommand(rootCategoryId, rootCategoryName) {
  return {
      type: "SET_ROOT",
      rootCategoryId: rootCategoryId ,
      rootCategoryName : rootCategoryName
  };
}

export function setRootMenuCommand(menu) {
  return {
      type: "SET_ROOT_MENU",
      menu:  menu
  }
}

export function setCurrentCategoryCommand(currentCategoryId) {
  return {
      type: "SET_CATEGORY",
      currentCategoryId: currentCategoryId
  }
}

export function setNavigationDataCommand(categoryNavigationData) {
	return { type: "SET_NAV_DATA", categoryNavigationData : categoryNavigationData }
}

export function delAfterFilterCommand(code) {
    return { type: "DEL_AFTER_NAV_DATA_FILTER", code : code}
}

export function delAllFilterCommand() {
    return { type: "DEL_ALL_NAV_DATA_FILTER"}
}

export function addFilterCommand(code, value, displayCode, displayValue) {
    return { type: "ADD_NAV_DATA_FILTER", code : code, value : value , displayCode : displayCode, displayValue : displayValue}
}

export function delFilterCommand(code) {
    return { type: "DEL_NAV_DATA_FILTER", code : code }
}

export function prodListSetSearchResultCommand(searchResult) {
    console.info('prodListSetSearchResultCommand ', searchResult);
    return { type: "PROD_LIST_SEARCH_RESULT", searchResult : searchResult }
}
export function prodListSetPageSizeCommand(pageSize) {
    return { type: "PROD_LIST_SET_PAGE_SIZE", pageSize : pageSize }
}

export function prodListSetPageCommand(page) {
    return { type: "PROD_LIST_SET_PAGE", page : page }
}
export function prodListSetSortFieldCommand(sortField) {
    return { type: "PROD_LIST_SET_SORT_FIELD", sortField : sortField }
}
export function prodListSetSortOrderCommand(sortOrder) {
    return { type: "PROD_LIST_SET_SORT_ORDER", sortOrder : sortOrder }
}

export function setSkuCommand(sku) {
    return { type: "SET_SKU", sku : sku }
}
export function setProductCommand(product) {
    return { type: "SET_PRODUCT", product : product }
}

export function setCartCommand (cart) {
    return { type: "SET_CART", cart : cart }
}

export function setLoginInfoCommand (loginInfo) {
    return { type: "SET_LOGIN_INFO", loginInfo : loginInfo }
}

export function setViewCartCommand () {
        return { type: "SET_VIEW_CART" }
}

export function setViewCheckoutCommand () {
    return { type: "SET_VIEW_CHECKOUT" }
}

export function setViewLoginRegisterCommand () {
    return { type: "SET_VIEW_LOGINREGISTER" }
}

export function setViewShopCommand () {
    return { type: "SET_VIEW_SHOP" }
}

export function setViewProfileCommand () {
    return { type: "SET_VIEW_PROFILE" }
}

export function setViewStepCommand (viewStep) {
    return { type: "SET_VIEW_STEP", viewStep: viewStep }
}

export function setCustomerSummaryCommand (customerSummary) {
    return { type: "SET_CUSTOMER_SUMMARY", customerSummary : customerSummary }
}
