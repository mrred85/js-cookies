/**
 * JavaScript Cookies v1.0
 *
 * @module cookies
 */
define(function () {
    'use strict';

    /**
     * Validates the cookie name
     *
     * @private
     * @param {string} name
     * @return {void}
     * @throws {TypeError}
     * @link https://tools.ietf.org/html/rfc2616#section-2.2 Rules for naming cookies.
     */
    function _validateName(name) {
        if (name === undefined || name === null || name === '') {
            throw new TypeError('The cookie name cannot be empty.');
        }

        if ((new RegExp('[=,; \t\r\n\\013\\014]')).test(name)) {
            throw new TypeError('The cookie name `' + name + '` contains invalid characters.');
        }
    }

    /**
     * Write cookie
     *
     * @param {string} name
     * @param {*} value
     * @param {Object=} options
     * @param {number} [options.expires=0] - days
     * @param {number} [options.maxAge=null] - seconds
     * @param {string} [options.path='/']
     * @param {string} [options.domain='']
     * @param {boolean} [options.secure=false]
     * @param {string} [options.sameSite=''] - lax, strict
     * @return {void}
     */
    function set(name, value, options) {
        _validateName(name);

        /**
         * @const
         * @requires Object.assign
         */
        var config = Object.assign({
            expires: 0,
            maxAge: null,
            path: '/',
            domain: '',
            secure: false,
            sameSite: ''
        }, options);

        var cookie = name + '=' + value;
        if (config.expires) {
            var d = new Date();
            d.setTime(d.getTime() + config.expires * 24 * 60 * 60 * 1000);
            cookie += ';expires=' + d.toUTCString();
        }
        if (config.maxAge !== null) {
            cookie += ';max-age=' + config.maxAge;
        }
        if (config.domain) {
            cookie += ';domain=' + config.domain.toLowerCase();
        }
        cookie += ';path=' + config.path;
        if (config.secure === true) {
            cookie += ';secure';
        }
        if (config.sameSite && ['lax', 'strict'].indexOf(config.sameSite.toLowerCase()) > -1) {
            cookie += ';samesite=' + config.sameSite.toLowerCase();
        }
        document.cookie = cookie;
    }

    /**
     * @alias module:cookies
     */
    return {
        /**
         * Write cookie
         *
         * @inheritdoc
         */
        set: set,
        /**
         * List all stored cookies
         *
         * @return {object}
         */
        list: function () {
            var cookies = {};
            /** @const */
            var cookiesArray = document.cookie.split(';');
            for (var i = 0; i < cookiesArray.length; i++) {
                if (cookiesArray[i]) {
                    /** @const */
                    var parts = cookiesArray[i].trim().split('=');
                    cookies[parts[0]] = parts[1];
                }
            }

            return cookies;
        },
        /**
         * Read cookie by name
         *
         * @param {string} name
         * @return {*}
         */
        read: function (name) {
            /** @const */
            var cookie = document.cookie.match('(^|;) ?' + name + '=([^;]*)(;|$)');

            return (cookie && cookie.length >= 2 ? cookie[2] : null);
        },
        /**
         * Check if cookie exists
         *
         * @param {string} name
         * @return {boolean}
         */
        check: function (name) {
            return (new RegExp('(?:^|;\\s*)' + name.replace(/[-.+*]/g, '\\$&') + '\\s*\\=')).test(document.cookie);
        },
        /**
         * Write cookie
         *
         * @param {string} name
         * @param {*} value
         * @param {number} [expires=0] - days
         * @param {string} [path='/']
         * @param {string} [domain='']
         * @param {boolean} [secure=false]
         * @param {string} [sameSite=''] - lax, strict
         * @return {void}
         */
        write: function (name, value, expires, path, domain, secure, sameSite) {
            if (typeof expires === 'undefined') {
                expires = 0;
            }
            if (typeof path === 'undefined') {
                path = '/';
            }
            if (typeof domain === 'undefined') {
                domain = '';
            }
            if (typeof secure === 'undefined') {
                secure = false;
            }
            if (typeof sameSite === 'undefined') {
                sameSite = '';
            }

            set(name, value, {
                expires: expires,
                path: path,
                domain: domain,
                secure: secure,
                sameSite: sameSite
            });
        },
        /**
         * Delete cookie by name (and path)
         *
         * @param {string} name
         * @param {string} [path='/']
         * @return {void}
         */
        delete: function (name, path) {
            if (typeof path === 'undefined') {
                path = '/';
            }

            set(name, 'deleted', {
                expires: -1,
                maxAge: 0,
                path: path
            });
        }
    };
});
