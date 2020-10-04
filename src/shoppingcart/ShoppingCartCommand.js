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
class ShoppingCartCommand {

    static CMD_P_QTY = "qty";
    static CMD_P_SUPPLIER = "supplier";
    static CMD_P_ITEM_GROUP = "itmgrp";

    static CMD_ADDTOWISHLIST = "addToWishListCmd";
    static CMD_ADDTOWISHLIST_P_TYPE = "type";
    static CMD_ADDTOWISHLIST_P_TAGS = "tags";
    static CMD_ADDTOWISHLIST_P_TAGS_REPLACE = "tagsr";
    static CMD_ADDTOWISHLIST_P_VISIBILITY = "wlv";
    static CMD_ADDTOWISHLIST_P_NOTIFICATION = "wln";
    static CMD_REMOVEFROMWISHLIST = "removeFromWishListCmd";
    static CMD_REMOVEFROMWISHLIST_P_ID = "i";

    static CMD_ADDCOUPON = "addCouponCmd";
    static CMD_REMOVECOUPON = "removeCouponCmd";

    static CMD_ADDTOCART = "addToCartCmd";
    static CMD_REMOVEALLSKU = "removeAllSkuCmd";
    static CMD_REMOVEONESKU = "removeOneSkuCmd";
    static CMD_SETQTYSKU = "setQuantityToCartCmd";

    static CMD_RECALCULATEPRICE = "recalculatePriceCmd";

    static CMD_SETPRICE = "setPriceCmd";
    static CMD_SETPRICE_P_PRICE = "cip";
    static CMD_SETPRICE_P_AUTH = "aup";

    static CMD_SEPARATEBILLING = "setBillingAddressSeparateCmd";

    static CMD_SETADDRESES = "setAddressesCmd";
    static CMD_SETADDRESES_P_DELIVERY_ADDRESS = "d";
    static CMD_SETADDRESES_P_BILLING_ADDRESS = "b";

    static CMD_SPLITCARTITEMS = "splitCartItemsCmd";

    static CMD_SETCARRIERSLA = "setCarrierSlaCmd";
    static CMD_SETCARRIERSLA_P_DELIVERY_ADDRESS = "d";
    static CMD_SETCARRIERSLA_P_BILLING_ADDRESS = "b";
    static CMD_SETCARRIERSLA_P_DELIVERY_NOT_REQUIRED = "dr";
    static CMD_SETCARRIERSLA_P_BILLING_NOT_REQUIRED = "br";

    static CMD_MULTIPLEDELIVERY = "setMultipleDeliveryCmd";

    static CMD_SETPGLABEL = "setPgLabelCmd";
    static CMD_SETSHOP = "setShopIdCmd";

    static CMD_RESTORE = "restoreCmd";

    static CMD_SETTAXOPTIONS = "setTaxOptionsCmd";
    static CMD_SETTAXOPTIONS_P_NET = "txn";
    static CMD_SETTAXOPTIONS_P_AMOUNT = "txa";

    static CMD_SETORDERMSG = "setOrderMsgCmd";

    static CMD_SETORDERDETAILS = "setOrderDetailsCmd";

    static CMD_CHANGECURRENCY = "changeCurrencyCmd";
    static CMD_CHANGELOCALE = "changeLocaleCmd";

    static CMD_INTERNAL_VIEWSKU = "viewSkuInternalCmd";
    static CMD_INTERNAL_SETIP = "setIpInternalCmd";

    static CMD_CLEAN = "cleanCartCmd";
    static CMD_EXPIRE = "expireCartCmd";
    static CMD_LOGIN = "loginCmd";
    static CMD_LOGIN_ON_BEHALF = "loginOnBehalfCmd";
    static CMD_LOGIN_P_EMAIL = "email";
    static CMD_LOGIN_P_PASS = "password";
    static CMD_LOGOUT = "logoutCmd";
    static CMD_LOGOUT_ON_BEHALF = "logoutOnBehalfCmd";

    static CMD_RESET_PASSWORD = "resetPasswordCmd";
    static CMD_RESET_PASSWORD_PW = "resetPasswordCmd_pw";

    static CMD_DELETE_ACCOUNT = "deleteAccountCmd";
    static CMD_DELETE_ACCOUNT_PW = "deleteAccountCmd_pw";

}

export default ShoppingCartCommand;