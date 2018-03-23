/*!
 * express-sanitized
 * MIT Licensed
 */

/**
 * Module dependencies.
 */

var _ = require('lodash');
var sanitizer = require('sanitizer');
var htmlencode = require('htmlencode');

/**
 * Simple middleware that wraps sanitzer and can be exposed
 * at the app.use router layer and apply to all methods.
 * This is best used for APIs where it is very unlikely
 * you would need to pass back and forth html entities
 *
 * @return {Function}
 * @api public
 *
 */
module.exports = {

    encoder: 'htmlEncode',

    sanitize: true,

    _sanitize: function(obj) {
        var self = this;
        if (typeof obj === 'string') {
            if (self.sanitize)
            {
                obj = sanitizer.sanitize(obj);
            }
            if (self.encoder)
            {
                obj = htmlencode[self.encoder](obj);
            }
            return obj;
        }
        if (obj instanceof Object) {
            Object.keys(obj).forEach(function(prop) {
                obj[prop] = self._sanitize(obj[prop]);
            });
            return obj;
        }
        return obj;
    },

    middleware: function(options) {
        var self = this;
        if (options && (_.includes(_.keys(htmlencode), options.encoder) || typeof(options.encoder) === 'boolean')) {
            self.encoder = options.encoder;
        }
        if (options && typeof(options.sanitize) === 'boolean') {
            self.sanitize = options.sanitize;
        }
        return function expressSanitized(req, res, next) {

            [req.body, req.query].forEach(function (val, ipar, request) {
                if (_.size(val)) {
                    request[ipar] = self._sanitize(request[ipar], options)
                }
            });

            next();
        }
    },

    sanitizeParams: function(router, paramNames, options) {
        var self = this;
        if (options && _.includes(_.keys(htmlencode), options.encoder)) {
            this.encoder = htmlencode[options.encoder];
        }
        paramNames.forEach(function (paramName) {
            router.param(paramName, function (req, res, next) {
                req.params[paramName] = self._sanitize(req.params[paramName]);

                next();
            });
        });
    },

    htmlDecodeBody: function htmlDecodeBody(obj) {
        var self = this;
        if (typeof obj === 'string') {
            return htmlencode.htmlDecode(sanitizer.sanitize(obj));
        }
        if (obj instanceof Object) {
            Object.keys(obj).forEach(function (prop) {
                obj[prop] = self.htmlDecodeBody(obj[prop]);
            });
            return obj;
        }
        return obj;
    }
};
