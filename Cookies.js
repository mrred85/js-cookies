/**
 * JavaScript Cookies v1.0
 *
 * @class Cookies
 * @method set(name, value, [options])
 * @method list()
 * @method read(name)
 * @method check(name)
 * @method write(name, value, [expires, [path, [domain, [secure [sameSite]]]]])
 * @method delete(name, [path])
 */
class Cookies
{
    /**
     * Write cookie
     *
     * @param {string} name
     * @param {*} value
     * @param {Object=} options
     * @param {int} [options.expires=0] - days
     * @param {int} [options.maxAge=null] - seconds
     * @param {string} [options.path='/']
     * @param {string} [options.domain='']
     * @param {boolean} [options.secure=false]
     * @param {string} [options.sameSite=''] - lax, strict
     * @returns {void}
     */
    static set(name, value, options)
    {
        this._validateName(name);

        const config = Object.assign({
            expires: 0,
            maxAge: null,
            path: '/',
            domain: '',
            secure: false,
            sameSite: ''
        }, options);

        let cookie = name + '=' + value;
        if (config.expires) {
            let d = new Date();
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
     * List all stored cookies
     *
     * @return {object}
     */
    static list()
    {
        let cookies = {};
        const cookiesArray = document.cookie.split(';');
        for (let i = 0; i < cookiesArray.length; i++) {
            if (cookiesArray[i]) {
                const parts = cookiesArray[i].trim().split('=');
                cookies[parts[0]] = parts[1];
            }
        }

        return cookies;
    }

    /**
     * Read cookie by name
     *
     * @param {string} name
     * @return {*}
     */
    static read(name)
    {
        const cookie = document.cookie.match('(^|;) ?' + name + '=([^;]*)(;|$)');

        return (cookie && cookie.length >= 2 ? cookie[2] : null);
    }

    /**
     * Check if cookie exists
     *
     * @param {string} name
     * @return {boolean}
     */
    static check(name)
    {
        return (new RegExp('(?:^|;\\s*)' + name.replace(/[-.+*]/g, '\\$&') + '\\s*\\=')).test(document.cookie);
    }

    /**
     * Write cookie
     *
     * @param {string} name
     * @param {*} value
     * @param {int=} [expires=0] - days
     * @param {string=} [path='/']
     * @param {string=} [domain='']
     * @param {boolean=} [secure=false]
     * @param {string=} [sameSite=''] - lax, strict
     * @return {void}
     */
    static write(name, value, expires = 0, path = '/', domain = '', secure = false, sameSite = '')
    {
        this.set(name, value, {
            expires: expires,
            path: path,
            domain: domain,
            secure: secure,
            sameSite: sameSite
        });
    }

    /**
     * Delete cookie by name (and path)
     *
     * @param {string} name
     * @param {string=} [path='/']
     * @return {void}
     */
    static delete(name, path = '/')
    {
        this.set(name, 'deleted', {
            expires: -1,
            maxAge: 0,
            path: path
        });
    }

    /**
     * Validates the cookie name
     *
     * @param {string} name
     * @returns {void}
     * @throws {TypeError}
     * @link https://tools.ietf.org/html/rfc2616#section-2.2 Rules for naming cookies.
     */
    static _validateName(name)
    {
        if (name === undefined || name === null || name === '') {
            throw new TypeError('The cookie name cannot be empty.');
        }

        if ((new RegExp('[=,; \t\r\n\\013\\014]')).test(name)) {
            throw new TypeError('The cookie name `' + name + '` contains invalid characters.');
        }
    }
}
