/**
 * BSS Commerce Co.
 *
 * NOTICE OF LICENSE
 *
 * This source file is subject to the EULA
 * that is bundled with this package in the file LICENSE.txt.
 * It is also available through the world-wide-web at this URL:
 * http://bsscommerce.com/Bss-Commerce-License.txt
 *
 * @category   BSS
 * @package    Bss_CookieNotice
 * @author     Extension Team
 * @copyright  Copyright (c) 2017-2018 BSS Commerce Co. ( http://bsscommerce.com )
 * @license    http://bsscommerce.com/Bss-Commerce-License.txt
 */
define([
    "jquery",
    "jquery/ui"
], function ($) {

    'use strict';
    $.widget('bss.cookieNotice', {
        _init: function () {
            var self = this;
            window.onpaint = self.checkCookie();

            if (self.options.autoHideMsg != 0) {
                self.autoHideMsg(self.options.autoHideMsg);
            }

            jQuery('.btn-cookie-accept').click(function () {
                jQuery('#bss-cookie-notice').css("display", "none");
                self.setCookie('cookienotice', 'bss', 180);
            });
        },

        autoHideMsg: function (seconds) {
            if (seconds != 0) {
                setTimeout(function () {
                    jQuery('#bss-cookie-notice').fadeOut('fast');
                }, seconds);
            }
        },

        setCookie: function (cname, cvalue, exdays) {
            var d = new Date();
            d.setTime(d.getTime() + (exdays * 24 * 60 * 60 * 1000));
            var expires = "expires=" + d.toUTCString();
            document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";
        },

        getCookie: function (cname) {
            var name = cname + "=";
            var ca = document.cookie.split(';');
            for (var i = 0; i < ca.length; i++) {
                var c = ca[i];
                while (c.charAt(0) == ' ') {
                    c = c.substring(1);
                }
                if (c.indexOf(name) == 0) {
                    return c.substring(name.length, c.length);
                }
            }
            return "";
        },

        checkCookie: function () {
            var self = this;
            var cookienotice = self.getCookie("cookienotice");
            if (cookienotice == "") {
                jQuery.each(self.options.position, function ($key, $value) {
                    jQuery('#bss-cookie-notice').css($key, $value);
                });
                jQuery('#bss-cookie-notice').css("background-color", self.options.bgColor);
                jQuery('#bss-cookie-notice .cookie-title').css("color", self.options.colorTitle);
                jQuery('#bss-cookie-notice .cookie-content').css("color", self.options.colorContent);
                jQuery('#bss-cookie-notice .btn-cookie-accept').css({
                    "color":self.options.colorAccept, "background-color": self.options.bgColorAccept
                });
                jQuery('#bss-cookie-notice .btn-cookie-more-infor').css({
                    "color":self.options.colorMoreInfo, "background-color": self.options.bgColorMoreInfo
                });
                jQuery('#bss-cookie-notice').css("display", "block");
            }
        }

    });
    return $.bss.cookieNotice;
});
