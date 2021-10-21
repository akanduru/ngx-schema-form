(function (global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports, require('@angular/core'), require('@angular/forms'), require('rxjs'), require('rxjs/operators'), require('z-schema'), require('jexl'), require('@angular/common')) :
    typeof define === 'function' && define.amd ? define('ngx-schema-form', ['exports', '@angular/core', '@angular/forms', 'rxjs', 'rxjs/operators', 'z-schema', 'jexl', '@angular/common'], factory) :
    (global = typeof globalThis !== 'undefined' ? globalThis : global || self, factory(global['ngx-schema-form'] = {}, global.ng.core, global.ng.forms, global.rxjs, global.rxjs.operators, global.ZSchema, global.JEXL, global.ng.common));
}(this, (function (exports, core, forms, rxjs, operators, ZSchema, JEXL, common) { 'use strict';

    function _interopDefaultLegacy (e) { return e && typeof e === 'object' && 'default' in e ? e : { 'default': e }; }

    var ZSchema__default = /*#__PURE__*/_interopDefaultLegacy(ZSchema);

    /*! *****************************************************************************
    Copyright (c) Microsoft Corporation.

    Permission to use, copy, modify, and/or distribute this software for any
    purpose with or without fee is hereby granted.

    THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES WITH
    REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF MERCHANTABILITY
    AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR ANY SPECIAL, DIRECT,
    INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES WHATSOEVER RESULTING FROM
    LOSS OF USE, DATA OR PROFITS, WHETHER IN AN ACTION OF CONTRACT, NEGLIGENCE OR
    OTHER TORTIOUS ACTION, ARISING OUT OF OR IN CONNECTION WITH THE USE OR
    PERFORMANCE OF THIS SOFTWARE.
    ***************************************************************************** */
    /* global Reflect, Promise */
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b)
                if (Object.prototype.hasOwnProperty.call(b, p))
                    d[p] = b[p]; };
        return extendStatics(d, b);
    };
    function __extends(d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    }
    var __assign = function () {
        __assign = Object.assign || function __assign(t) {
            for (var s, i = 1, n = arguments.length; i < n; i++) {
                s = arguments[i];
                for (var p in s)
                    if (Object.prototype.hasOwnProperty.call(s, p))
                        t[p] = s[p];
            }
            return t;
        };
        return __assign.apply(this, arguments);
    };
    function __rest(s, e) {
        var t = {};
        for (var p in s)
            if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
                t[p] = s[p];
        if (s != null && typeof Object.getOwnPropertySymbols === "function")
            for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
                if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                    t[p[i]] = s[p[i]];
            }
        return t;
    }
    function __decorate(decorators, target, key, desc) {
        var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
        if (typeof Reflect === "object" && typeof Reflect.decorate === "function")
            r = Reflect.decorate(decorators, target, key, desc);
        else
            for (var i = decorators.length - 1; i >= 0; i--)
                if (d = decorators[i])
                    r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
        return c > 3 && r && Object.defineProperty(target, key, r), r;
    }
    function __param(paramIndex, decorator) {
        return function (target, key) { decorator(target, key, paramIndex); };
    }
    function __metadata(metadataKey, metadataValue) {
        if (typeof Reflect === "object" && typeof Reflect.metadata === "function")
            return Reflect.metadata(metadataKey, metadataValue);
    }
    function __awaiter(thisArg, _arguments, P, generator) {
        function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
        return new (P || (P = Promise))(function (resolve, reject) {
            function fulfilled(value) { try {
                step(generator.next(value));
            }
            catch (e) {
                reject(e);
            } }
            function rejected(value) { try {
                step(generator["throw"](value));
            }
            catch (e) {
                reject(e);
            } }
            function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
            step((generator = generator.apply(thisArg, _arguments || [])).next());
        });
    }
    function __generator(thisArg, body) {
        var _ = { label: 0, sent: function () { if (t[0] & 1)
                throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
        return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function () { return this; }), g;
        function verb(n) { return function (v) { return step([n, v]); }; }
        function step(op) {
            if (f)
                throw new TypeError("Generator is already executing.");
            while (_)
                try {
                    if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done)
                        return t;
                    if (y = 0, t)
                        op = [op[0] & 2, t.value];
                    switch (op[0]) {
                        case 0:
                        case 1:
                            t = op;
                            break;
                        case 4:
                            _.label++;
                            return { value: op[1], done: false };
                        case 5:
                            _.label++;
                            y = op[1];
                            op = [0];
                            continue;
                        case 7:
                            op = _.ops.pop();
                            _.trys.pop();
                            continue;
                        default:
                            if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) {
                                _ = 0;
                                continue;
                            }
                            if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) {
                                _.label = op[1];
                                break;
                            }
                            if (op[0] === 6 && _.label < t[1]) {
                                _.label = t[1];
                                t = op;
                                break;
                            }
                            if (t && _.label < t[2]) {
                                _.label = t[2];
                                _.ops.push(op);
                                break;
                            }
                            if (t[2])
                                _.ops.pop();
                            _.trys.pop();
                            continue;
                    }
                    op = body.call(thisArg, _);
                }
                catch (e) {
                    op = [6, e];
                    y = 0;
                }
                finally {
                    f = t = 0;
                }
            if (op[0] & 5)
                throw op[1];
            return { value: op[0] ? op[1] : void 0, done: true };
        }
    }
    var __createBinding = Object.create ? (function (o, m, k, k2) {
        if (k2 === undefined)
            k2 = k;
        Object.defineProperty(o, k2, { enumerable: true, get: function () { return m[k]; } });
    }) : (function (o, m, k, k2) {
        if (k2 === undefined)
            k2 = k;
        o[k2] = m[k];
    });
    function __exportStar(m, o) {
        for (var p in m)
            if (p !== "default" && !Object.prototype.hasOwnProperty.call(o, p))
                __createBinding(o, m, p);
    }
    function __values(o) {
        var s = typeof Symbol === "function" && Symbol.iterator, m = s && o[s], i = 0;
        if (m)
            return m.call(o);
        if (o && typeof o.length === "number")
            return {
                next: function () {
                    if (o && i >= o.length)
                        o = void 0;
                    return { value: o && o[i++], done: !o };
                }
            };
        throw new TypeError(s ? "Object is not iterable." : "Symbol.iterator is not defined.");
    }
    function __read(o, n) {
        var m = typeof Symbol === "function" && o[Symbol.iterator];
        if (!m)
            return o;
        var i = m.call(o), r, ar = [], e;
        try {
            while ((n === void 0 || n-- > 0) && !(r = i.next()).done)
                ar.push(r.value);
        }
        catch (error) {
            e = { error: error };
        }
        finally {
            try {
                if (r && !r.done && (m = i["return"]))
                    m.call(i);
            }
            finally {
                if (e)
                    throw e.error;
            }
        }
        return ar;
    }
    /** @deprecated */
    function __spread() {
        for (var ar = [], i = 0; i < arguments.length; i++)
            ar = ar.concat(__read(arguments[i]));
        return ar;
    }
    /** @deprecated */
    function __spreadArrays() {
        for (var s = 0, i = 0, il = arguments.length; i < il; i++)
            s += arguments[i].length;
        for (var r = Array(s), k = 0, i = 0; i < il; i++)
            for (var a = arguments[i], j = 0, jl = a.length; j < jl; j++, k++)
                r[k] = a[j];
        return r;
    }
    function __spreadArray(to, from) {
        for (var i = 0, il = from.length, j = to.length; i < il; i++, j++)
            to[j] = from[i];
        return to;
    }
    function __await(v) {
        return this instanceof __await ? (this.v = v, this) : new __await(v);
    }
    function __asyncGenerator(thisArg, _arguments, generator) {
        if (!Symbol.asyncIterator)
            throw new TypeError("Symbol.asyncIterator is not defined.");
        var g = generator.apply(thisArg, _arguments || []), i, q = [];
        return i = {}, verb("next"), verb("throw"), verb("return"), i[Symbol.asyncIterator] = function () { return this; }, i;
        function verb(n) { if (g[n])
            i[n] = function (v) { return new Promise(function (a, b) { q.push([n, v, a, b]) > 1 || resume(n, v); }); }; }
        function resume(n, v) { try {
            step(g[n](v));
        }
        catch (e) {
            settle(q[0][3], e);
        } }
        function step(r) { r.value instanceof __await ? Promise.resolve(r.value.v).then(fulfill, reject) : settle(q[0][2], r); }
        function fulfill(value) { resume("next", value); }
        function reject(value) { resume("throw", value); }
        function settle(f, v) { if (f(v), q.shift(), q.length)
            resume(q[0][0], q[0][1]); }
    }
    function __asyncDelegator(o) {
        var i, p;
        return i = {}, verb("next"), verb("throw", function (e) { throw e; }), verb("return"), i[Symbol.iterator] = function () { return this; }, i;
        function verb(n, f) { i[n] = o[n] ? function (v) { return (p = !p) ? { value: __await(o[n](v)), done: n === "return" } : f ? f(v) : v; } : f; }
    }
    function __asyncValues(o) {
        if (!Symbol.asyncIterator)
            throw new TypeError("Symbol.asyncIterator is not defined.");
        var m = o[Symbol.asyncIterator], i;
        return m ? m.call(o) : (o = typeof __values === "function" ? __values(o) : o[Symbol.iterator](), i = {}, verb("next"), verb("throw"), verb("return"), i[Symbol.asyncIterator] = function () { return this; }, i);
        function verb(n) { i[n] = o[n] && function (v) { return new Promise(function (resolve, reject) { v = o[n](v), settle(resolve, reject, v.done, v.value); }); }; }
        function settle(resolve, reject, d, v) { Promise.resolve(v).then(function (v) { resolve({ value: v, done: d }); }, reject); }
    }
    function __makeTemplateObject(cooked, raw) {
        if (Object.defineProperty) {
            Object.defineProperty(cooked, "raw", { value: raw });
        }
        else {
            cooked.raw = raw;
        }
        return cooked;
    }
    ;
    var __setModuleDefault = Object.create ? (function (o, v) {
        Object.defineProperty(o, "default", { enumerable: true, value: v });
    }) : function (o, v) {
        o["default"] = v;
    };
    function __importStar(mod) {
        if (mod && mod.__esModule)
            return mod;
        var result = {};
        if (mod != null)
            for (var k in mod)
                if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k))
                    __createBinding(result, mod, k);
        __setModuleDefault(result, mod);
        return result;
    }
    function __importDefault(mod) {
        return (mod && mod.__esModule) ? mod : { default: mod };
    }
    function __classPrivateFieldGet(receiver, privateMap) {
        if (!privateMap.has(receiver)) {
            throw new TypeError("attempted to get private field on non-instance");
        }
        return privateMap.get(receiver);
    }
    function __classPrivateFieldSet(receiver, privateMap, value) {
        if (!privateMap.has(receiver)) {
            throw new TypeError("attempted to set private field on non-instance");
        }
        privateMap.set(receiver, value);
        return value;
    }

    var ActionRegistry = /** @class */ (function () {
        function ActionRegistry() {
            this.actions = {};
        }
        ActionRegistry.prototype.clear = function () {
            this.actions = {};
        };
        ActionRegistry.prototype.register = function (actionId, action) {
            this.actions[actionId] = action;
        };
        ActionRegistry.prototype.get = function (actionId) {
            return this.actions[actionId];
        };
        return ActionRegistry;
    }());
    ActionRegistry.decorators = [
        { type: core.Injectable }
    ];

    var BindingRegistry = /** @class */ (function () {
        function BindingRegistry() {
            this.bindings = [];
        }
        BindingRegistry.prototype.clear = function () {
            this.bindings = [];
        };
        BindingRegistry.prototype.register = function (path, binding) {
            this.bindings[path] = [].concat(binding);
        };
        BindingRegistry.prototype.get = function (path) {
            return this.bindings[path];
        };
        return BindingRegistry;
    }());
    BindingRegistry.decorators = [
        { type: core.Injectable }
    ];

    var FormProperty = /** @class */ (function () {
        function FormProperty(schemaValidatorFactory, validatorRegistry, expressionCompilerFactory, schema, parent, path, logger) {
            this.validatorRegistry = validatorRegistry;
            this.schema = schema;
            this.logger = logger;
            this._value = null;
            this._errors = null;
            this._valueChanges = new rxjs.BehaviorSubject(null);
            this._errorsChanges = new rxjs.BehaviorSubject(null);
            this._visible = true;
            this._visibilityChanges = new rxjs.BehaviorSubject(true);
            this.schemaValidator = schemaValidatorFactory.createValidatorFn(this.schema);
            this.expressionCompilerVisibiltyIf = expressionCompilerFactory.createExpressionCompilerVisibilityIf();
            this._parent = parent;
            if (parent) {
                this._root = parent.root;
            }
            else if (this instanceof PropertyGroup) {
                this._root = this;
                this._rootName = this.createRootName();
            }
            this._path = path;
        }
        Object.defineProperty(FormProperty.prototype, "_canonicalPath", {
            /**
             * Provides the unique path of this form element.<br/>
             * E.g.:
             * <code>/garage/cars</code>,<br/>
             * <code>/shop/book/0/page/1/</code>
             */
            get: function () { return this.__canonicalPath; },
            set: function (canonicalPath) {
                this.__canonicalPath = canonicalPath;
                this.__canonicalPathNotation = (this.__canonicalPath || '')
                    .replace(new RegExp('^/', 'ig'), '')
                    .replace(new RegExp('/$', 'ig'), '')
                    .replace(new RegExp('/', 'ig'), '.');
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(FormProperty.prototype, "canonicalPathNotation", {
            /**
             * Uses the unique path provided by the property <code>_canonicalPath</code><br/>
             * but converts it to a HTML Element Attribute ID compliant format.<br/>
             * E.g.:
             * <code>garage.cars</code>,<br/>
             * <code>shop.book.0.page.1.</code>
             */
            get: function () { return this.__canonicalPathNotation; },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(FormProperty.prototype, "rootName", {
            /**
             * Provides the HTML Element Attribute ID/NAME compliant representation
             * of the root element.<br/>
             * Represents the HTML FORM NAME.<br/>
             * Only the root <code>FormProperty</code> will provide a value here.
             */
            get: function () { return this._rootName; },
            enumerable: false,
            configurable: true
        });
        /**
         * Creates the HTML ID and NAME attribute compliant string.
         */
        FormProperty.prototype.createRootName = function () {
            if (this.schema && this.schema['name']) {
                return this._rootName = this.schema['name'].replace(new RegExp('[\\s]+', 'ig'), '_');
            }
            return '';
        };
        Object.defineProperty(FormProperty.prototype, "valueChanges", {
            get: function () {
                return this._valueChanges;
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(FormProperty.prototype, "errorsChanges", {
            get: function () {
                return this._errorsChanges;
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(FormProperty.prototype, "type", {
            get: function () {
                return this.schema.type;
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(FormProperty.prototype, "parent", {
            get: function () {
                return this._parent;
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(FormProperty.prototype, "root", {
            get: function () {
                return this._root || this;
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(FormProperty.prototype, "path", {
            get: function () {
                return this._path;
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(FormProperty.prototype, "value", {
            get: function () {
                return this._value;
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(FormProperty.prototype, "visible", {
            get: function () {
                return this._visible;
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(FormProperty.prototype, "valid", {
            get: function () {
                return this._errors === null;
            },
            enumerable: false,
            configurable: true
        });
        FormProperty.prototype.updateValueAndValidity = function (onlySelf, emitEvent) {
            if (onlySelf === void 0) { onlySelf = false; }
            if (emitEvent === void 0) { emitEvent = true; }
            this._updateValue();
            if (emitEvent) {
                this.valueChanges.next(this.value);
            }
            this._runValidation();
            if (this.parent && !onlySelf) {
                this.parent.updateValueAndValidity(onlySelf, emitEvent);
            }
        };
        /**
         * @internal
         */
        FormProperty.prototype._runValidation = function () {
            var errors = this.schemaValidator(this._value) || [];
            var customValidator = this.validatorRegistry.get(this.path);
            if (customValidator) {
                var customErrors = customValidator(this.value, this, this.findRoot());
                errors = this.mergeErrors(errors, customErrors);
            }
            if (errors.length === 0) {
                errors = null;
            }
            this._errors = errors;
            this.setErrors(this._errors);
        };
        FormProperty.prototype.mergeErrors = function (errors, newErrors) {
            if (newErrors) {
                if (Array.isArray(newErrors)) {
                    errors = errors.concat.apply(errors, __spread(newErrors));
                }
                else {
                    errors.push(newErrors);
                }
            }
            return errors;
        };
        FormProperty.prototype.setErrors = function (errors) {
            this._errors = errors;
            this._errorsChanges.next(errors);
        };
        FormProperty.prototype.extendErrors = function (errors) {
            errors = this.mergeErrors(this._errors || [], errors);
            this.setErrors(errors);
        };
        FormProperty.prototype.searchProperty = function (path) {
            var prop = this;
            var base = null;
            var result = null;
            if (path[0] === '/') {
                base = this.findRoot();
                result = base.getProperty(path.substr(1));
            }
            else {
                while (result === null && prop.parent !== null) {
                    prop = base = prop.parent;
                    result = base.getProperty(path);
                }
            }
            return result;
        };
        FormProperty.prototype.findRoot = function () {
            var property = this;
            while (property.parent !== null) {
                property = property.parent;
            }
            return property;
        };
        FormProperty.prototype.setVisible = function (visible) {
            this._visible = visible;
            this._visibilityChanges.next(visible);
            this.updateValueAndValidity();
        };
        /**
         * Making use of the expression compiler for the <code>visibleIf</code> condition
         * @param sourceProperty The source property where the `visibleIf` condition is set.
         * @param targetProperty  The target property what provided the `value` on which the `visibleIf` condition will be checked against. May be `null` or `undefined`
         * @param dependencyPath The dependency path of the `targetProperty`
         * @param value The value of the `targetProperty` to check the `visiblityIf` condintion against. May be `null` or `undefined`
         * @param expression The value or expression to check against the `value` for the `targetProperty`. May be `null` or `undefined`
         */
        FormProperty.prototype.__evaluateVisibilityIf = function (sourceProperty, targetProperty, dependencyPath, value, expression) {
            var e_1, _a;
            if (value === void 0) { value = ''; }
            try {
                var valid = false;
                var expArray = Array.isArray(expression) ? expression : [expression];
                try {
                    for (var expArray_1 = __values(expArray), expArray_1_1 = expArray_1.next(); !expArray_1_1.done; expArray_1_1 = expArray_1.next()) {
                        var expString = expArray_1_1.value;
                        if (typeof expString === 'boolean') {
                            valid = !expString ? !value : value;
                        }
                        else if (typeof expString === 'number') {
                            valid = !!value ? "" + expString === "" + value : false;
                        }
                        else if (-1 !== ("" + expString).indexOf('$ANY$')) {
                            valid = value && value.length > 0;
                        }
                        else if (0 === ("" + expString).indexOf('$EXP$')) {
                            var _expresssion = expString.substring('$EXP$'.length);
                            valid = true === this.expressionCompilerVisibiltyIf.evaluate(_expresssion, {
                                source: sourceProperty,
                                target: targetProperty
                            });
                        }
                        else {
                            valid = !!value ? "" + expString === "" + value : false;
                        }
                        if (valid) {
                            break;
                        }
                    }
                }
                catch (e_1_1) { e_1 = { error: e_1_1 }; }
                finally {
                    try {
                        if (expArray_1_1 && !expArray_1_1.done && (_a = expArray_1.return)) _a.call(expArray_1);
                    }
                    finally { if (e_1) throw e_1.error; }
                }
                return valid;
            }
            catch (error) {
                this.logger.error('Error processing "VisibileIf" expression for path: ', dependencyPath, "source - " + (sourceProperty ? sourceProperty._canonicalPath : '<no-sourceProperty>') + ": ", sourceProperty, "target - " + (targetProperty ? targetProperty._canonicalPath : '<no-targetProperty>') + ": ", targetProperty, 'value:', value, 'expression: ', expression, 'error: ', error);
            }
        };
        /**
         * binds visibility conditions of type `oneOf` and `allOf`.
         * @returns `true` if any visibility binding of type `oneOf` or `allOf` has been processed. Otherwise `false`.
         */
        FormProperty.prototype.__bindVisibility_oneOf_or_allOf = function () {
            var e_2, _a;
            var _this = this;
            /**
             * <pre>
             *     "oneOf":[{
             *         "path":["value","value"]
             *     },{
             *         "path":["value","value"]
             *     }]
             *     </pre>
             * <pre>
             *     "allOf":[{
             *         "path":["value","value"]
             *     },{
             *         "path":["value","value"]
             *     }]
             *     </pre>
             */
            var visibleIfProperty = this.schema.visibleIf;
            var visibleIfOf = (visibleIfProperty || {}).oneOf || (visibleIfProperty || {}).allOf;
            if (visibleIfOf) {
                try {
                    for (var visibleIfOf_1 = __values(visibleIfOf), visibleIfOf_1_1 = visibleIfOf_1.next(); !visibleIfOf_1_1.done; visibleIfOf_1_1 = visibleIfOf_1.next()) {
                        var visibleIf = visibleIfOf_1_1.value;
                        if (typeof visibleIf === 'object' && Object.keys(visibleIf).length === 0) {
                            this.setVisible(false);
                        }
                        else if (visibleIf !== undefined) {
                            var propertiesBinding = [];
                            var _loop_1 = function (dependencyPath) {
                                var e_3, _a;
                                if (visibleIf.hasOwnProperty(dependencyPath)) {
                                    var properties = this_1.findProperties(this_1, dependencyPath);
                                    if ((properties || []).length) {
                                        try {
                                            for (var properties_1 = (e_3 = void 0, __values(properties)), properties_1_1 = properties_1.next(); !properties_1_1.done; properties_1_1 = properties_1.next()) {
                                                var property = properties_1_1.value;
                                                if (property) {
                                                    var valueCheck = void 0;
                                                    if (this_1.schema.visibleIf.oneOf) {
                                                        var _chk = function (value) {
                                                            var e_4, _a, e_5, _b, e_6, _c;
                                                            try {
                                                                for (var _d = (e_4 = void 0, __values(_this.schema.visibleIf.oneOf)), _e = _d.next(); !_e.done; _e = _d.next()) {
                                                                    var item = _e.value;
                                                                    try {
                                                                        for (var _f = (e_5 = void 0, __values(Object.keys(item))), _g = _f.next(); !_g.done; _g = _f.next()) {
                                                                            var depPath = _g.value;
                                                                            var props = _this.findProperties(_this, depPath);
                                                                            try {
                                                                                for (var props_1 = (e_6 = void 0, __values(props)), props_1_1 = props_1.next(); !props_1_1.done; props_1_1 = props_1.next()) {
                                                                                    var prop = props_1_1.value;
                                                                                    var propVal = prop ? prop.value : null;
                                                                                    if (_this.__evaluateVisibilityIf(_this, prop, dependencyPath, propVal, item[depPath])) {
                                                                                        return true;
                                                                                    }
                                                                                }
                                                                            }
                                                                            catch (e_6_1) { e_6 = { error: e_6_1 }; }
                                                                            finally {
                                                                                try {
                                                                                    if (props_1_1 && !props_1_1.done && (_c = props_1.return)) _c.call(props_1);
                                                                                }
                                                                                finally { if (e_6) throw e_6.error; }
                                                                            }
                                                                        }
                                                                    }
                                                                    catch (e_5_1) { e_5 = { error: e_5_1 }; }
                                                                    finally {
                                                                        try {
                                                                            if (_g && !_g.done && (_b = _f.return)) _b.call(_f);
                                                                        }
                                                                        finally { if (e_5) throw e_5.error; }
                                                                    }
                                                                }
                                                            }
                                                            catch (e_4_1) { e_4 = { error: e_4_1 }; }
                                                            finally {
                                                                try {
                                                                    if (_e && !_e.done && (_a = _d.return)) _a.call(_d);
                                                                }
                                                                finally { if (e_4) throw e_4.error; }
                                                            }
                                                            return false;
                                                        };
                                                        valueCheck = property.valueChanges.pipe(operators.map(_chk));
                                                    }
                                                    else if (this_1.schema.visibleIf.allOf) {
                                                        var _chk = function (value) {
                                                            var e_7, _a, e_8, _b, e_9, _c;
                                                            try {
                                                                for (var _d = (e_7 = void 0, __values(_this.schema.visibleIf.allOf)), _e = _d.next(); !_e.done; _e = _d.next()) {
                                                                    var item = _e.value;
                                                                    try {
                                                                        for (var _f = (e_8 = void 0, __values(Object.keys(item))), _g = _f.next(); !_g.done; _g = _f.next()) {
                                                                            var depPath = _g.value;
                                                                            var props = _this.findProperties(_this, depPath);
                                                                            try {
                                                                                for (var props_2 = (e_9 = void 0, __values(props)), props_2_1 = props_2.next(); !props_2_1.done; props_2_1 = props_2.next()) {
                                                                                    var prop = props_2_1.value;
                                                                                    var propVal = prop ? prop.value : null;
                                                                                    if (!_this.__evaluateVisibilityIf(_this, prop, dependencyPath, propVal, item[depPath])) {
                                                                                        return false;
                                                                                    }
                                                                                }
                                                                            }
                                                                            catch (e_9_1) { e_9 = { error: e_9_1 }; }
                                                                            finally {
                                                                                try {
                                                                                    if (props_2_1 && !props_2_1.done && (_c = props_2.return)) _c.call(props_2);
                                                                                }
                                                                                finally { if (e_9) throw e_9.error; }
                                                                            }
                                                                        }
                                                                    }
                                                                    catch (e_8_1) { e_8 = { error: e_8_1 }; }
                                                                    finally {
                                                                        try {
                                                                            if (_g && !_g.done && (_b = _f.return)) _b.call(_f);
                                                                        }
                                                                        finally { if (e_8) throw e_8.error; }
                                                                    }
                                                                }
                                                            }
                                                            catch (e_7_1) { e_7 = { error: e_7_1 }; }
                                                            finally {
                                                                try {
                                                                    if (_e && !_e.done && (_a = _d.return)) _a.call(_d);
                                                                }
                                                                finally { if (e_7) throw e_7.error; }
                                                            }
                                                            return true;
                                                        };
                                                        valueCheck = property.valueChanges.pipe(operators.map(_chk));
                                                    }
                                                    var visibilityCheck = property._visibilityChanges;
                                                    var and = rxjs.combineLatest([valueCheck, visibilityCheck], function (v1, v2) { return v1 && v2; });
                                                    propertiesBinding.push(and);
                                                }
                                            }
                                        }
                                        catch (e_3_1) { e_3 = { error: e_3_1 }; }
                                        finally {
                                            try {
                                                if (properties_1_1 && !properties_1_1.done && (_a = properties_1.return)) _a.call(properties_1);
                                            }
                                            finally { if (e_3) throw e_3.error; }
                                        }
                                    }
                                    else {
                                        this_1.logger.warn('Can\'t find property ' + dependencyPath + ' for visibility check of ' + this_1.path);
                                        this_1.registerMissingVisibilityBinding(dependencyPath, this_1);
                                        // not visible if not existent
                                        this_1.setVisible(false);
                                    }
                                }
                            };
                            var this_1 = this;
                            for (var dependencyPath in visibleIf) {
                                _loop_1(dependencyPath);
                            }
                            rxjs.combineLatest(propertiesBinding, function () {
                                var values = [];
                                for (var _i = 0; _i < arguments.length; _i++) {
                                    values[_i] = arguments[_i];
                                }
                                if (_this.schema.visibleIf.allOf) {
                                    return values.indexOf(false) === -1;
                                }
                                return values.indexOf(true) !== -1;
                            }).subscribe(function (visible) {
                                _this.setVisible(visible);
                            });
                        }
                    }
                }
                catch (e_2_1) { e_2 = { error: e_2_1 }; }
                finally {
                    try {
                        if (visibleIfOf_1_1 && !visibleIfOf_1_1.done && (_a = visibleIfOf_1.return)) _a.call(visibleIfOf_1);
                    }
                    finally { if (e_2) throw e_2.error; }
                }
                return true;
            }
        };
        // A field is visible if AT LEAST ONE of the properties it depends on is visible AND has a value in the list
        FormProperty.prototype._bindVisibility = function () {
            var _this = this;
            if (this.__bindVisibility_oneOf_or_allOf())
                return;
            var visibleIf = this.schema.visibleIf;
            if (typeof visibleIf === 'object' && Object.keys(visibleIf).length === 0) {
                this.setVisible(false);
            }
            else if (visibleIf !== undefined) {
                var propertiesBinding = [];
                var _loop_2 = function (dependencyPath) {
                    var e_10, _a;
                    if (visibleIf.hasOwnProperty(dependencyPath)) {
                        var properties = this_2.findProperties(this_2, dependencyPath);
                        if ((properties || []).length) {
                            var _loop_3 = function (property) {
                                if (property) {
                                    var valueCheck = property.valueChanges.pipe(operators.map(function (value) { return _this.__evaluateVisibilityIf(_this, property, dependencyPath, value, visibleIf[dependencyPath]); }));
                                    var visibilityCheck = property._visibilityChanges;
                                    var and = rxjs.combineLatest([valueCheck, visibilityCheck], function (v1, v2) { return v1 && v2; });
                                    propertiesBinding.push(and);
                                }
                            };
                            try {
                                for (var properties_2 = (e_10 = void 0, __values(properties)), properties_2_1 = properties_2.next(); !properties_2_1.done; properties_2_1 = properties_2.next()) {
                                    var property = properties_2_1.value;
                                    _loop_3(property);
                                }
                            }
                            catch (e_10_1) { e_10 = { error: e_10_1 }; }
                            finally {
                                try {
                                    if (properties_2_1 && !properties_2_1.done && (_a = properties_2.return)) _a.call(properties_2);
                                }
                                finally { if (e_10) throw e_10.error; }
                            }
                        }
                        else {
                            this_2.logger.warn('Can\'t find property ' + dependencyPath + ' for visibility check of ' + this_2.path);
                            this_2.registerMissingVisibilityBinding(dependencyPath, this_2);
                            // not visible if not existent
                            this_2.setVisible(false);
                        }
                    }
                };
                var this_2 = this;
                for (var dependencyPath in visibleIf) {
                    _loop_2(dependencyPath);
                }
                rxjs.combineLatest(propertiesBinding, function () {
                    var values = [];
                    for (var _i = 0; _i < arguments.length; _i++) {
                        values[_i] = arguments[_i];
                    }
                    return values.indexOf(true) !== -1;
                }).pipe(operators.distinctUntilChanged()).subscribe(function (visible) {
                    _this.setVisible(visible);
                });
            }
        };
        FormProperty.prototype.registerMissingVisibilityBinding = function (dependencyPath, formProperty) {
            formProperty._propertyBindingRegistry.getPropertyBindingsVisibility().add(dependencyPath, formProperty.path);
        };
        /**
         * Finds all <code>formProperties</code> from a path with wildcards.<br/>
         * e.g: <code>/garage/cars/&#42;/tires/&#42;/name</code><br/>
         * @param target
         * @param propertyPath
         */
        FormProperty.prototype.findProperties = function (target, propertyPath) {
            var e_11, _a;
            var props = [];
            var paths = this.findPropertyPaths(target, propertyPath);
            try {
                for (var paths_1 = __values(paths), paths_1_1 = paths_1.next(); !paths_1_1.done; paths_1_1 = paths_1.next()) {
                    var path = paths_1_1.value;
                    var p = target.searchProperty(path);
                    if (p) {
                        props.push(p);
                    }
                }
            }
            catch (e_11_1) { e_11 = { error: e_11_1 }; }
            finally {
                try {
                    if (paths_1_1 && !paths_1_1.done && (_a = paths_1.return)) _a.call(paths_1);
                }
                finally { if (e_11) throw e_11.error; }
            }
            return props;
        };
        /**
         * Creates canonical paths from a path with wildcards.
         * e.g:<br/>
         * From:<br/>
         * <code>/garage/cars/&#42;/tires/&#42;/name</code><br/>
         * it creates:<br/>
         * <code>/garage/cars/0/tires/0/name</code><br/>
         * <code>/garage/cars/0/tires/1/name</code><br/>
         * <code>/garage/cars/0/tires/2/name</code><br/>
         * <code>/garage/cars/0/tires/3/name</code><br/>
         * <code>/garage/cars/1/tires/0/name</code><br/>
         * <code>/garage/cars/2/tires/1/name</code><br/>
         * <code>/garage/cars/3/tires/2/name</code><br/>
         * <code>/garage/cars/3/tires/3/name</code><br/>
         * <code>/garage/cars/&#42;/tires/&#42;/name</code><br/>
         * <code>/garage/cars/&#42;/tires/2/name</code><br/>
         * <code>/garage/cars/&#42;/tires/3/name</code><br/>
         * <br/>etc...
         * @param target
         * @param path
         * @param parentPath
         */
        FormProperty.prototype.findPropertyPaths = function (target, path, parentPath) {
            var ix = path.indexOf('*');
            if (-1 !== ix) {
                var prePath = ix > -1 ? path.substring(0, ix - 1) : path;
                var subPath = ix > -1 ? path.substring(ix + 1) : path;
                var prop = target.searchProperty(prePath);
                var pathFound = [];
                if (prop instanceof PropertyGroup) {
                    var arrProp = prop.properties;
                    for (var i = 0; i < arrProp.length; i++) {
                        var curreItemPath = (parentPath || '') + prePath + (prePath.endsWith('/') ? '' : '/') + i + subPath;
                        var curreItemPrePath = (parentPath || '') + prePath + i;
                        if (-1 === curreItemPath.indexOf('*')) {
                            pathFound.push(curreItemPath);
                        }
                        var childrenPathFound = this.findPropertyPaths(arrProp[i], subPath, curreItemPrePath);
                        pathFound = pathFound.concat(childrenPathFound);
                    }
                }
                return pathFound;
            }
            return [path];
        };
        return FormProperty;
    }());
    var PropertyGroup = /** @class */ (function (_super) {
        __extends(PropertyGroup, _super);
        function PropertyGroup() {
            var _this = _super.apply(this, __spread(arguments)) || this;
            _this._properties = null;
            _this._propertyProxyHandler = new ExtendedProxyHandler(_this.logger);
            return _this;
        }
        Object.defineProperty(PropertyGroup.prototype, "properties", {
            get: function () {
                return this._properties;
            },
            set: function (properties) {
                /**
                 * Override the setter to add an observer that notices when an item is added or removed.<br/>
                 */
                this._properties = new Proxy(properties, this._propertyProxyHandler);
            },
            enumerable: false,
            configurable: true
        });
        PropertyGroup.prototype.getProperty = function (path) {
            var subPathIdx = path.indexOf('/');
            var propertyId = subPathIdx !== -1 ? path.substr(0, subPathIdx) : path;
            var property = this.properties[propertyId];
            if (property !== null && subPathIdx !== -1 && property instanceof PropertyGroup) {
                var subPath = path.substr(subPathIdx + 1);
                property = property.getProperty(subPath);
            }
            return property;
        };
        PropertyGroup.prototype.forEachChild = function (fn) {
            for (var propertyId in this.properties) {
                if (this.properties.hasOwnProperty(propertyId)) {
                    var property = this.properties[propertyId];
                    fn(property, propertyId);
                }
            }
        };
        PropertyGroup.prototype.forEachChildRecursive = function (fn) {
            this.forEachChild(function (child) {
                fn(child);
                if (child instanceof PropertyGroup) {
                    child.forEachChildRecursive(fn);
                }
            });
        };
        PropertyGroup.prototype._bindVisibility = function () {
            _super.prototype._bindVisibility.call(this);
            this._bindVisibilityRecursive();
        };
        PropertyGroup.prototype._bindVisibilityRecursive = function () {
            this.forEachChildRecursive(function (property) {
                property._bindVisibility();
            });
        };
        PropertyGroup.prototype.isRoot = function () {
            return this === this.root;
        };
        return PropertyGroup;
    }(FormProperty));
    var ExtendedProxyHandler = /** @class */ (function () {
        function ExtendedProxyHandler(logger) {
            this.logger = logger;
        }
        /**
         * When a new item is added it will be checked for visibility updates to proceed <br/>
         * if any other field has a binding reference to it.<br/>
         */
        ExtendedProxyHandler.prototype.set = function (target, p, value, receiver) {
            var _this = this;
            /**
             * 1) Make sure a canonical path is set
             */
            var assertCanonicalPath = function (propertyValue) {
                var formProperty = propertyValue;
                if (Array.isArray(target) && propertyValue instanceof FormProperty) {
                    /**
                     * Create a canonical path replacing the last '*' with the elements position in array
                     * @param propertyPath
                     * @param indexOfChild
                     */
                    var getCanonicalPath = function (propertyPath, indexOfChild) {
                        var pos;
                        if (propertyPath && -1 !== (pos = propertyPath.lastIndexOf('*'))) {
                            return propertyPath.substring(0, pos) + indexOfChild.toString() + propertyPath.substring(pos + 1);
                        }
                    };
                    if (formProperty) {
                        formProperty._canonicalPath = getCanonicalPath(formProperty._canonicalPath, p);
                    }
                }
                var recalculateCanonicalPath = function (formProperty) {
                    var e_12, _a;
                    if (!(formProperty instanceof PropertyGroup))
                        return;
                    var propertyGroup = formProperty;
                    var propertyGroupChildren = (Array.isArray(propertyGroup.properties) ?
                        propertyGroup.properties :
                        Object.values(propertyGroup.properties || {}));
                    if (propertyGroupChildren.length || (formProperty.path || '').endsWith('/*')) {
                        try {
                            /**
                             * If it is an array, then all children canonical paths must be computed now.
                             * The children don't have the parent's path segment set yet,
                             * because they are created before the parent gets attached to its parent.
                             */
                            for (var propertyGroupChildren_1 = __values(propertyGroupChildren), propertyGroupChildren_1_1 = propertyGroupChildren_1.next(); !propertyGroupChildren_1_1.done; propertyGroupChildren_1_1 = propertyGroupChildren_1.next()) {
                                var child = propertyGroupChildren_1_1.value;
                                if (child.__canonicalPath.indexOf('*')) {
                                    var p_path = formProperty._canonicalPath.split('/');
                                    child._canonicalPath = p_path.concat(child._canonicalPath.split('/').splice(p_path.length)).join('/');
                                }
                                recalculateCanonicalPath(child);
                            }
                        }
                        catch (e_12_1) { e_12 = { error: e_12_1 }; }
                        finally {
                            try {
                                if (propertyGroupChildren_1_1 && !propertyGroupChildren_1_1.done && (_a = propertyGroupChildren_1.return)) _a.call(propertyGroupChildren_1);
                            }
                            finally { if (e_12) throw e_12.error; }
                        }
                    }
                };
                recalculateCanonicalPath(formProperty);
                var propertyGroup = formProperty;
                var propertyGroupChildren = (Array.isArray(propertyGroup.properties) ?
                    propertyGroup.properties :
                    Object.values(propertyGroup.properties || {}));
                return { property: formProperty, children: propertyGroupChildren };
            };
            var _a = assertCanonicalPath(value), property = _a.property, children = _a.children;
            /**
             * 2) Add the new property before rebinding, so it can be found by <code>_bindVisibility</code>
             */
            var result = target[p] = value;
            /**
             * 3) Re-bind the visibility bindings referencing to this canonical paths
             */
            var rebindVisibility = function () {
                var e_13, _a, e_14, _b;
                var rebindAll = [property].concat(children);
                var findPropertiesToRebind = function (formProperty) {
                    var e_15, _a;
                    var propertyBindings = formProperty._propertyBindingRegistry.getPropertyBindingsVisibility();
                    var rebind = [];
                    if (formProperty._canonicalPath) {
                        rebind = rebind.concat(rebind.concat(propertyBindings.findByDependencyPath(formProperty._canonicalPath) || []));
                        if (formProperty._canonicalPath.startsWith('/')) {
                            rebind = rebind.concat(rebind.concat(propertyBindings.findByDependencyPath(formProperty._canonicalPath.substring(1)) || []));
                        }
                    }
                    rebind = rebind.concat(propertyBindings.findByDependencyPath(formProperty.path) || []);
                    if (formProperty.path.startsWith('/')) {
                        rebind = rebind.concat(rebind.concat(propertyBindings.findByDependencyPath(formProperty.path.substring(1)) || []));
                    }
                    var uniqueValues = {};
                    try {
                        for (var rebind_1 = __values(rebind), rebind_1_1 = rebind_1.next(); !rebind_1_1.done; rebind_1_1 = rebind_1.next()) {
                            var item = rebind_1_1.value;
                            uniqueValues[item] = item;
                        }
                    }
                    catch (e_15_1) { e_15 = { error: e_15_1 }; }
                    finally {
                        try {
                            if (rebind_1_1 && !rebind_1_1.done && (_a = rebind_1.return)) _a.call(rebind_1);
                        }
                        finally { if (e_15) throw e_15.error; }
                    }
                    return Object.keys(uniqueValues);
                };
                try {
                    for (var rebindAll_1 = __values(rebindAll), rebindAll_1_1 = rebindAll_1.next(); !rebindAll_1_1.done; rebindAll_1_1 = rebindAll_1.next()) {
                        var _property = rebindAll_1_1.value;
                        if (_property instanceof FormProperty) {
                            try {
                                var rebindPaths = findPropertiesToRebind(_property);
                                try {
                                    for (var rebindPaths_1 = (e_14 = void 0, __values(rebindPaths)), rebindPaths_1_1 = rebindPaths_1.next(); !rebindPaths_1_1.done; rebindPaths_1_1 = rebindPaths_1.next()) {
                                        var rebindPropPath = rebindPaths_1_1.value;
                                        var rebindProp = _property.searchProperty(rebindPropPath);
                                        if (!rebindProp) {
                                            _this.logger.warn('Can\'t find property to rebind visibility at path:', _property.path, 'property:', _property);
                                        }
                                        else {
                                            rebindProp._bindVisibility();
                                        }
                                    }
                                }
                                catch (e_14_1) { e_14 = { error: e_14_1 }; }
                                finally {
                                    try {
                                        if (rebindPaths_1_1 && !rebindPaths_1_1.done && (_b = rebindPaths_1.return)) _b.call(rebindPaths_1);
                                    }
                                    finally { if (e_14) throw e_14.error; }
                                }
                            }
                            catch (e) {
                                _this.logger.error('Rebinding visibility error at path:', _property.path, 'property:', _property, e);
                            }
                        }
                    }
                }
                catch (e_13_1) { e_13 = { error: e_13_1 }; }
                finally {
                    try {
                        if (rebindAll_1_1 && !rebindAll_1_1.done && (_a = rebindAll_1.return)) _a.call(rebindAll_1);
                    }
                    finally { if (e_13) throw e_13.error; }
                }
            };
            rebindVisibility();
            return result;
        };
        ExtendedProxyHandler.prototype.get = function (target, p, receiver) {
            return target[p];
        };
        ExtendedProxyHandler.prototype.deleteProperty = function (target, p) {
            return delete target[p];
        };
        return ExtendedProxyHandler;
    }());

    var PROPERTY_TYPE_MAPPING = {};

    var FieldType;
    (function (FieldType) {
        FieldType["String"] = "string";
        FieldType["Object"] = "object";
        FieldType["Array"] = "array";
        FieldType["Boolean"] = "boolean";
        FieldType["Integer"] = "integer";
        FieldType["Number"] = "number";
    })(FieldType || (FieldType = {}));

    var FormPropertyFactory = /** @class */ (function () {
        function FormPropertyFactory(schemaValidatorFactory, validatorRegistry, propertyBindingRegistry, expressionCompilerFactory, logger) {
            this.schemaValidatorFactory = schemaValidatorFactory;
            this.validatorRegistry = validatorRegistry;
            this.propertyBindingRegistry = propertyBindingRegistry;
            this.expressionCompilerFactory = expressionCompilerFactory;
            this.logger = logger;
        }
        FormPropertyFactory.prototype.createProperty = function (schema, parent, propertyId) {
            if (parent === void 0) { parent = null; }
            var newProperty = null;
            var path = '';
            var _canonicalPath = '';
            if (parent) {
                path += parent.path;
                if (parent.parent !== null) {
                    path += '/';
                    _canonicalPath += '/';
                }
                if (parent.type === 'object') {
                    path += propertyId;
                    _canonicalPath += propertyId;
                }
                else if (parent.type === 'array') {
                    path += '*';
                    _canonicalPath += '*';
                }
                else {
                    throw 'Instanciation of a FormProperty with an unknown parent type: ' + parent.type;
                }
                _canonicalPath = (parent._canonicalPath || parent.path) + _canonicalPath;
            }
            else {
                path = '/';
                _canonicalPath = '/';
            }
            if (schema.$ref) {
                var refSchema = this.schemaValidatorFactory.getSchema(parent.root.schema, schema.$ref);
                newProperty = this.createProperty(refSchema, parent, path);
            }
            else {
                var type = this.isUnionType(schema.type)
                    && this.isValidNullableUnionType(schema.type)
                    && this.isAllowedToUsingNullableUnionTypeBySchemaContext(schema)
                    ? this.extractTypeFromNullableUnionType(schema.type)
                    : schema.type;
                if (PROPERTY_TYPE_MAPPING[type]) {
                    if (type === 'object' || type === 'array') {
                        newProperty = PROPERTY_TYPE_MAPPING[type](this.schemaValidatorFactory, this.validatorRegistry, this.expressionCompilerFactory, schema, parent, path, this, this.logger);
                    }
                    else {
                        newProperty = PROPERTY_TYPE_MAPPING[type](this.schemaValidatorFactory, this.validatorRegistry, this.expressionCompilerFactory, schema, parent, path, this.logger);
                    }
                }
                else {
                    throw new TypeError("Undefined type " + type + " (existing: " + Object.keys(PROPERTY_TYPE_MAPPING) + ")");
                }
            }
            newProperty._propertyBindingRegistry = this.propertyBindingRegistry;
            newProperty._canonicalPath = _canonicalPath;
            if (newProperty instanceof PropertyGroup) {
                this.initializeRoot(newProperty);
            }
            return newProperty;
        };
        FormPropertyFactory.prototype.initializeRoot = function (rootProperty) {
            rootProperty.reset(null, true);
            rootProperty._bindVisibility();
        };
        FormPropertyFactory.prototype.isUnionType = function (unionType) {
            return Array.isArray(unionType) && unionType.length > 1;
        };
        FormPropertyFactory.prototype.isValidNullableUnionType = function (unionType) {
            if (!unionType.some(function (subType) { return subType === 'null'; })) {
                throw new TypeError("Unsupported union type " + unionType + ". Supports only nullable union types, for example [\"string\", \"null\"]");
            }
            if (unionType.length !== 2) {
                throw new TypeError("Unsupported count of types in nullable union type " + unionType + ". Supports only two types one of the which should be \"null\"");
            }
            var type = this.extractTypeFromNullableUnionType(unionType);
            if (!type || [FieldType.Object, FieldType.Array].includes(type)) {
                throw new TypeError("Unsupported second type " + type + " for nullable union. Allowed types are \"" + FieldType.Number + "\", \"" + FieldType.Integer + "\", \"" + FieldType.Boolean + "\", \"" + FieldType.String + "\"");
            }
            return true;
        };
        FormPropertyFactory.prototype.extractTypeFromNullableUnionType = function (unionType) {
            var _a;
            return (_a = unionType.filter(function (type) { return type !== 'null'; })) === null || _a === void 0 ? void 0 : _a[0];
        };
        FormPropertyFactory.prototype.isAllowedToUsingNullableUnionTypeBySchemaContext = function (schema) {
            if (!schema.oneOf) {
                throw new TypeError("Unsupported using of nullable union type without \"oneOf\" attribute");
            }
            return true;
        };
        return FormPropertyFactory;
    }());

    var AtomicProperty = /** @class */ (function (_super) {
        __extends(AtomicProperty, _super);
        function AtomicProperty() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        AtomicProperty.prototype.setValue = function (value, onlySelf) {
            if (onlySelf === void 0) { onlySelf = false; }
            this._value = value;
            this.updateValueAndValidity(onlySelf, true);
        };
        AtomicProperty.prototype.reset = function (value, onlySelf) {
            if (value === void 0) { value = null; }
            if (onlySelf === void 0) { onlySelf = true; }
            this.resetValue(value);
            this.updateValueAndValidity(onlySelf, true);
        };
        AtomicProperty.prototype.resetValue = function (value) {
            if (value === null) {
                if (this.schema.default !== undefined) {
                    value = this.schema.default;
                }
                else {
                    value = this.fallbackValue();
                }
            }
            this._value = value;
        };
        AtomicProperty.prototype._hasValue = function () {
            return this.fallbackValue() !== this.value;
        };
        AtomicProperty.prototype._updateValue = function () {
        };
        return AtomicProperty;
    }(FormProperty));

    var ObjectProperty = /** @class */ (function (_super) {
        __extends(ObjectProperty, _super);
        function ObjectProperty(formPropertyFactory, schemaValidatorFactory, validatorRegistry, expressionCompilerFactory, schema, parent, path, logger) {
            var _this = _super.call(this, schemaValidatorFactory, validatorRegistry, expressionCompilerFactory, schema, parent, path, logger) || this;
            _this.formPropertyFactory = formPropertyFactory;
            _this.propertiesId = [];
            _this.createProperties();
            return _this;
        }
        ObjectProperty.prototype.setValue = function (value, onlySelf) {
            for (var propertyId in value) {
                if (value.hasOwnProperty(propertyId)) {
                    this.properties[propertyId].setValue(value[propertyId], true);
                }
            }
            this.updateValueAndValidity(onlySelf, true);
        };
        ObjectProperty.prototype.reset = function (value, onlySelf) {
            if (onlySelf === void 0) { onlySelf = true; }
            value = value || this.schema.default || {};
            this.resetProperties(value);
            this.updateValueAndValidity(onlySelf, true);
        };
        ObjectProperty.prototype.resetProperties = function (value) {
            for (var propertyId in this.schema.properties) {
                if (this.schema.properties.hasOwnProperty(propertyId)) {
                    this.properties[propertyId].reset(value[propertyId], true);
                }
            }
        };
        ObjectProperty.prototype.createProperties = function () {
            this.properties = {};
            this.propertiesId = [];
            for (var propertyId in this.schema.properties) {
                if (this.schema.properties.hasOwnProperty(propertyId)) {
                    var propertySchema = this.schema.properties[propertyId];
                    this.properties[propertyId] = this.formPropertyFactory.createProperty(propertySchema, this, propertyId);
                    this.propertiesId.push(propertyId);
                }
            }
        };
        ObjectProperty.prototype._hasValue = function () {
            return !!Object.keys(this.value).length;
        };
        ObjectProperty.prototype._updateValue = function () {
            this.reduceValue();
        };
        ObjectProperty.prototype._runValidation = function () {
            var _this = this;
            _super.prototype._runValidation.call(this);
            if (this._errors) {
                this._errors.forEach(function (error) {
                    var prop = _this.searchProperty(error.path.slice(1));
                    if (prop) {
                        prop.extendErrors(error);
                    }
                });
            }
        };
        ObjectProperty.prototype.reduceValue = function () {
            var value = {};
            this.forEachChild(function (property, propertyId) {
                if (property.visible && property._hasValue()) {
                    value[propertyId] = property.value;
                }
            });
            this._value = value;
        };
        return ObjectProperty;
    }(PropertyGroup));
    PROPERTY_TYPE_MAPPING.object = function (schemaValidatorFactory, validatorRegistry, expressionCompilerFactory, schema, parent, path, formPropertyFactory, logger) {
        return new ObjectProperty(formPropertyFactory, schemaValidatorFactory, validatorRegistry, expressionCompilerFactory, schema, parent, path, logger);
    };

    var ArrayProperty = /** @class */ (function (_super) {
        __extends(ArrayProperty, _super);
        function ArrayProperty(formPropertyFactory, schemaValidatorFactory, validatorRegistry, expressionCompilerFactory, schema, parent, path, logger) {
            var _this = _super.call(this, schemaValidatorFactory, validatorRegistry, expressionCompilerFactory, schema, parent, path, logger) || this;
            _this.formPropertyFactory = formPropertyFactory;
            return _this;
        }
        ArrayProperty.prototype.addItem = function (value) {
            if (value === void 0) { value = null; }
            var newProperty = this.addProperty();
            newProperty.reset(value, false);
            return newProperty;
        };
        ArrayProperty.prototype.addProperty = function () {
            var itemSchema = this.schema.items;
            if (Array.isArray(this.schema.items)) {
                var itemSchemas = this.schema.items;
                if (itemSchemas.length > this.properties.length) {
                    itemSchema = itemSchema[this.properties.length];
                }
                else if (this.schema.additionalItems) {
                    itemSchema = this.schema.additionalItems;
                }
                else {
                    // souldn't add new items since schema is undefined for the item at its position
                    return null;
                }
            }
            var newProperty = this.formPropertyFactory.createProperty(itemSchema, this);
            this.properties.push(newProperty);
            return newProperty;
        };
        ArrayProperty.prototype.removeItem = function (item) {
            this.properties = this.properties.filter(function (i) { return i !== item; });
            this.updateValueAndValidity(false, true);
        };
        ArrayProperty.prototype.setValue = function (value, onlySelf) {
            this.createProperties();
            this.resetProperties(value);
            this.updateValueAndValidity(onlySelf, true);
        };
        ArrayProperty.prototype._hasValue = function () {
            return true;
        };
        ArrayProperty.prototype._updateValue = function () {
            this.reduceValue();
        };
        ArrayProperty.prototype.reduceValue = function () {
            var value = [];
            this.forEachChild(function (property, _) {
                if (property.visible && property._hasValue()) {
                    value.push(property.value);
                }
            });
            this._value = value;
        };
        ArrayProperty.prototype.reset = function (value, onlySelf) {
            if (onlySelf === void 0) { onlySelf = true; }
            value = value || this.schema.default || [];
            this.properties = [];
            this.resetProperties(value);
            this.updateValueAndValidity(onlySelf, true);
        };
        ArrayProperty.prototype.createProperties = function () {
            this.properties = [];
        };
        ArrayProperty.prototype.resetProperties = function (value) {
            for (var idx in value) {
                if (value.hasOwnProperty(idx)) {
                    var property = this.addProperty();
                    property.reset(value[idx], true);
                }
            }
        };
        return ArrayProperty;
    }(PropertyGroup));
    PROPERTY_TYPE_MAPPING.array = function (schemaValidatorFactory, validatorRegistry, expressionCompilerFactory, schema, parent, path, formPropertyFactory, logger) {
        return new ArrayProperty(formPropertyFactory, schemaValidatorFactory, validatorRegistry, expressionCompilerFactory, schema, parent, path, logger);
    };

    var StringProperty = /** @class */ (function (_super) {
        __extends(StringProperty, _super);
        function StringProperty() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        StringProperty.prototype.fallbackValue = function () {
            return '';
        };
        return StringProperty;
    }(AtomicProperty));
    PROPERTY_TYPE_MAPPING.string = function (schemaValidatorFactory, validatorRegistry, expressionCompilerFactory, schema, parent, path, logger) {
        return new StringProperty(schemaValidatorFactory, validatorRegistry, expressionCompilerFactory, schema, parent, path, logger);
    };

    var BooleanProperty = /** @class */ (function (_super) {
        __extends(BooleanProperty, _super);
        function BooleanProperty() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        BooleanProperty.prototype.fallbackValue = function () {
            return null;
        };
        return BooleanProperty;
    }(AtomicProperty));
    PROPERTY_TYPE_MAPPING.boolean = function (schemaValidatorFactory, validatorRegistry, expressionCompilerFactory, schema, parent, path, logger) {
        return new BooleanProperty(schemaValidatorFactory, validatorRegistry, expressionCompilerFactory, schema, parent, path, logger);
    };

    var NumberProperty = /** @class */ (function (_super) {
        __extends(NumberProperty, _super);
        function NumberProperty() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        NumberProperty.prototype.fallbackValue = function () {
            return null;
        };
        NumberProperty.prototype.setValue = function (value, onlySelf) {
            if (onlySelf === void 0) { onlySelf = false; }
            if (typeof value === 'string') {
                if (value.length) {
                    value = value.indexOf('.') > -1 ? parseFloat(value) : parseInt(value, 10);
                }
                else {
                    value = null;
                }
            }
            this._value = value;
            this.updateValueAndValidity(onlySelf, true);
        };
        return NumberProperty;
    }(AtomicProperty));
    PROPERTY_TYPE_MAPPING.integer = function (schemaValidatorFactory, validatorRegistry, expressionCompilerFactory, schema, parent, path, logger) {
        return new NumberProperty(schemaValidatorFactory, validatorRegistry, expressionCompilerFactory, schema, parent, path, logger);
    };
    PROPERTY_TYPE_MAPPING.number = function (schemaValidatorFactory, validatorRegistry, expressionCompilerFactory, schema, parent, path, logger) {
        return new NumberProperty(schemaValidatorFactory, validatorRegistry, expressionCompilerFactory, schema, parent, path, logger);
    };

    var ValidatorRegistry = /** @class */ (function () {
        function ValidatorRegistry() {
            this.validators = [];
        }
        ValidatorRegistry.prototype.register = function (path, validator) {
            this.validators[path] = validator;
        };
        ValidatorRegistry.prototype.get = function (path) {
            return this.validators[path];
        };
        ValidatorRegistry.prototype.clear = function () {
            this.validators = [];
        };
        return ValidatorRegistry;
    }());
    ValidatorRegistry.decorators = [
        { type: core.Injectable }
    ];

    function isPresent(o) {
        return o !== null && o !== undefined;
    }
    function isBlank(o) {
        return o === null || o === undefined;
    }

    function formatMessage(message, path) {
        return "Parsing error on " + path + ": " + message;
    }
    function schemaError(message, path) {
        var mesg = formatMessage(message, path);
        throw new Error(mesg);
    }
    function schemaWarning(message, path) {
        var mesg = formatMessage(message, path);
        throw new Error(mesg);
    }
    var SchemaPreprocessor = /** @class */ (function () {
        function SchemaPreprocessor() {
        }
        SchemaPreprocessor.preprocess = function (jsonSchema, path) {
            if (path === void 0) { path = '/'; }
            jsonSchema = jsonSchema || {};
            SchemaPreprocessor.normalizeExtensions(jsonSchema);
            if (jsonSchema.type === 'object') {
                SchemaPreprocessor.checkProperties(jsonSchema, path);
                SchemaPreprocessor.checkAndCreateFieldsets(jsonSchema, path);
            }
            else if (jsonSchema.type === 'array') {
                SchemaPreprocessor.checkItems(jsonSchema, path);
            }
            SchemaPreprocessor.normalizeWidget(jsonSchema);
            SchemaPreprocessor.recursiveCheck(jsonSchema, path);
        };
        SchemaPreprocessor.checkProperties = function (jsonSchema, path) {
            if (isBlank(jsonSchema.properties)) {
                jsonSchema.properties = {};
                schemaWarning('Provided json schema does not contain a \'properties\' entry. Output schema will be empty', path);
            }
        };
        SchemaPreprocessor.checkAndCreateFieldsets = function (jsonSchema, path) {
            if (jsonSchema.fieldsets === undefined) {
                if (jsonSchema.order !== undefined) {
                    SchemaPreprocessor.replaceOrderByFieldsets(jsonSchema);
                }
                else {
                    SchemaPreprocessor.createFieldsets(jsonSchema);
                }
            }
            SchemaPreprocessor.checkFieldsUsage(jsonSchema, path);
        };
        SchemaPreprocessor.checkFieldsUsage = function (jsonSchema, path) {
            var e_1, _a, e_2, _b, e_3, _c;
            var fieldsId = Object.keys(jsonSchema.properties);
            var usedFields = {};
            try {
                for (var _d = __values(jsonSchema.fieldsets), _e = _d.next(); !_e.done; _e = _d.next()) {
                    var fieldset = _e.value;
                    try {
                        for (var _f = (e_2 = void 0, __values(fieldset.fields)), _g = _f.next(); !_g.done; _g = _f.next()) {
                            var fieldId = _g.value;
                            if (usedFields[fieldId] === undefined) {
                                usedFields[fieldId] = [];
                            }
                            usedFields[fieldId].push(fieldset.id);
                        }
                    }
                    catch (e_2_1) { e_2 = { error: e_2_1 }; }
                    finally {
                        try {
                            if (_g && !_g.done && (_b = _f.return)) _b.call(_f);
                        }
                        finally { if (e_2) throw e_2.error; }
                    }
                }
            }
            catch (e_1_1) { e_1 = { error: e_1_1 }; }
            finally {
                try {
                    if (_e && !_e.done && (_a = _d.return)) _a.call(_d);
                }
                finally { if (e_1) throw e_1.error; }
            }
            try {
                for (var fieldsId_1 = __values(fieldsId), fieldsId_1_1 = fieldsId_1.next(); !fieldsId_1_1.done; fieldsId_1_1 = fieldsId_1.next()) {
                    var fieldId = fieldsId_1_1.value;
                    var isRequired = jsonSchema.required && jsonSchema.required.indexOf(fieldId) > -1;
                    if (isRequired && jsonSchema.properties[fieldId]) {
                        jsonSchema.properties[fieldId].isRequired = true;
                    }
                    if (usedFields.hasOwnProperty(fieldId)) {
                        if (usedFields[fieldId].length > 1) {
                            schemaError(fieldId + " is referenced by more than one fieldset: " + usedFields[fieldId], path);
                        }
                        delete usedFields[fieldId];
                    }
                    else if (isRequired) {
                        schemaError(fieldId + " is a required field but it is not referenced as part of a 'order' or a 'fieldset' property", path);
                    }
                    else {
                        delete jsonSchema[fieldId];
                        schemaWarning("Removing unreferenced field " + fieldId, path);
                    }
                }
            }
            catch (e_3_1) { e_3 = { error: e_3_1 }; }
            finally {
                try {
                    if (fieldsId_1_1 && !fieldsId_1_1.done && (_c = fieldsId_1.return)) _c.call(fieldsId_1);
                }
                finally { if (e_3) throw e_3.error; }
            }
            for (var remainingfieldsId in usedFields) {
                if (usedFields.hasOwnProperty(remainingfieldsId)) {
                    schemaWarning("Referencing non-existent field " + remainingfieldsId + " in one or more fieldsets", path);
                }
            }
        };
        SchemaPreprocessor.createFieldsets = function (jsonSchema) {
            jsonSchema.order = Object.keys(jsonSchema.properties);
            SchemaPreprocessor.replaceOrderByFieldsets(jsonSchema);
        };
        SchemaPreprocessor.replaceOrderByFieldsets = function (jsonSchema) {
            jsonSchema.fieldsets = [{
                    id: 'fieldset-default',
                    title: jsonSchema.title || '',
                    description: jsonSchema.description || '',
                    name: jsonSchema.name || '',
                    fields: jsonSchema.order
                }];
            delete jsonSchema.order;
        };
        SchemaPreprocessor.normalizeWidget = function (fieldSchema) {
            var widget = fieldSchema.widget;
            if (widget === undefined) {
                widget = { 'id': fieldSchema.type };
            }
            else if (typeof widget === 'string') {
                widget = { 'id': widget };
            }
            fieldSchema.widget = widget;
        };
        SchemaPreprocessor.checkItems = function (jsonSchema, path) {
            if (jsonSchema.items === undefined) {
                schemaError('No \'items\' property in array', path);
            }
        };
        SchemaPreprocessor.recursiveCheck = function (jsonSchema, path) {
            if (jsonSchema.type === FieldType.Object) {
                for (var fieldId in jsonSchema.properties) {
                    if (jsonSchema.properties.hasOwnProperty(fieldId)) {
                        var fieldSchema = jsonSchema.properties[fieldId];
                        SchemaPreprocessor.preprocess(fieldSchema, path + fieldId + '/');
                    }
                }
                if (jsonSchema.hasOwnProperty('definitions')) {
                    for (var fieldId in jsonSchema.definitions) {
                        if (jsonSchema.definitions.hasOwnProperty(fieldId)) {
                            var fieldSchema = jsonSchema.definitions[fieldId];
                            SchemaPreprocessor.removeRecursiveRefProperties(fieldSchema, "#/definitions/" + fieldId);
                            SchemaPreprocessor.preprocess(fieldSchema, path + fieldId + '/');
                        }
                    }
                }
            }
            else if (jsonSchema.type === 'array') {
                if (Array.isArray(jsonSchema.items || {})) {
                    for (var i = 0; i < jsonSchema.items.length; i++) {
                        SchemaPreprocessor.preprocess(jsonSchema.items[i], path + '*/');
                    }
                }
                else {
                    SchemaPreprocessor.preprocess(jsonSchema.items, path + '*/');
                }
                if (jsonSchema.additionalItems) {
                    SchemaPreprocessor.preprocess(jsonSchema.additionalItems, path + '*/');
                }
            }
        };
        SchemaPreprocessor.removeRecursiveRefProperties = function (jsonSchema, definitionPath) {
            // to avoid infinite loop
            if (jsonSchema.type === FieldType.Object) {
                for (var fieldId in jsonSchema.properties) {
                    if (jsonSchema.properties.hasOwnProperty(fieldId)) {
                        if (jsonSchema.properties[fieldId].$ref
                            && jsonSchema.properties[fieldId].$ref === definitionPath) {
                            delete jsonSchema.properties[fieldId];
                        }
                        else if (jsonSchema.properties[fieldId].type === 'object') {
                            SchemaPreprocessor.removeRecursiveRefProperties(jsonSchema.properties[fieldId], definitionPath);
                        }
                    }
                }
            }
        };
        /**
         * Enables alias names for JSON schema extensions.
         *
         * Copies the value of each alias JSON schema property
         * to the JSON schema property of ngx-schema-form.
         *
         * @param schema JSON schema to enable alias names.
         */
        SchemaPreprocessor.normalizeExtensions = function (schema) {
            var extensions = [
                { name: "fieldsets", regex: /^x-?field-?sets$/i },
                { name: "widget", regex: /^x-?widget$/i },
                { name: "visibleIf", regex: /^x-?visible-?if$/i }
            ];
            var keys = Object.keys(schema);
            var _loop_1 = function (i) {
                var k = keys[i];
                var e = extensions.find(function (e) { return !!k.match(e.regex); });
                if (e) {
                    var v = schema[k];
                    var copy = JSON.parse(JSON.stringify(v));
                    schema[e.name] = copy;
                }
            };
            for (var i = 0; i < keys.length; ++i) {
                _loop_1(i);
            }
        };
        return SchemaPreprocessor;
    }());
    SchemaPreprocessor.decorators = [
        { type: core.Injectable }
    ];

    var SchemaValidatorFactory = /** @class */ (function () {
        function SchemaValidatorFactory() {
        }
        /**
         * Override this method to reset the schema validator instance.<br/>
         * This may be required since some schema validators keep a deep copy<br/>
         * of your schemas and changes at runtime are not recognized by the schema validator.<br/>
         * In this method you should either re-instantiate the schema validator or
         * clear its cache.<br/>
         * Example of re-instantiating schema validator
         * <code>
         *     reset(){
         *         this.zschema = new ZSchema({})
         *     }
         * </code>
         * <br/>
         * Since this method it self does nothing there is <br/>
         * no need to call the <code>super.reset()</code>
         */
        SchemaValidatorFactory.prototype.reset = function () {
        };
        return SchemaValidatorFactory;
    }());
    var ZSchemaValidatorFactory = /** @class */ (function (_super) {
        __extends(ZSchemaValidatorFactory, _super);
        function ZSchemaValidatorFactory() {
            var _this = _super.call(this) || this;
            _this.createSchemaValidator();
            return _this;
        }
        ZSchemaValidatorFactory.prototype.createSchemaValidator = function () {
            this.zschema = new ZSchema__default['default']({
                breakOnFirstError: false
            });
        };
        ZSchemaValidatorFactory.prototype.reset = function () {
            this.createSchemaValidator();
        };
        ZSchemaValidatorFactory.prototype.createValidatorFn = function (schema) {
            var _this = this;
            return function (value) {
                if (schema.type === FieldType.Number || schema.type === FieldType.Integer) {
                    value = +value;
                }
                _this.zschema.validate(value, schema);
                // tslint:disable-next-line:prefer-const
                var err = _this.zschema.getLastErrors();
                _this.denormalizeRequiredPropertyPaths(err);
                return err || null;
            };
        };
        ZSchemaValidatorFactory.prototype.getSchema = function (schema, ref) {
            // check definitions are valid
            var isValid = this.zschema.compileSchema(schema);
            if (isValid) {
                return this.getDefinition(schema, ref);
            }
            else {
                throw this.zschema.getLastError();
            }
        };
        ZSchemaValidatorFactory.prototype.denormalizeRequiredPropertyPaths = function (err) {
            if (err && err.length) {
                err = err.map(function (error) {
                    if (error.path === '#/' && error.code === 'OBJECT_MISSING_REQUIRED_PROPERTY') {
                        error.path = "" + error.path + error.params[0];
                    }
                    return error;
                });
            }
        };
        ZSchemaValidatorFactory.prototype.getDefinition = function (schema, ref) {
            var foundSchema = schema;
            ref.split('/').slice(1).forEach(function (ptr) {
                if (ptr) {
                    foundSchema = foundSchema[ptr];
                }
            });
            return foundSchema;
        };
        return ZSchemaValidatorFactory;
    }(SchemaValidatorFactory));
    ZSchemaValidatorFactory.decorators = [
        { type: core.Injectable }
    ];
    ZSchemaValidatorFactory.ctorParameters = function () { return []; };

    var WidgetRegistry = /** @class */ (function () {
        function WidgetRegistry() {
            this.widgets = {};
        }
        WidgetRegistry.prototype.setDefaultWidget = function (widget) {
            this.defaultWidget = widget;
        };
        WidgetRegistry.prototype.getDefaultWidget = function () {
            return this.defaultWidget;
        };
        WidgetRegistry.prototype.hasWidget = function (type) {
            return this.widgets.hasOwnProperty(type);
        };
        WidgetRegistry.prototype.register = function (type, widget) {
            this.widgets[type] = widget;
        };
        WidgetRegistry.prototype.getWidgetType = function (type) {
            if (this.hasWidget(type)) {
                return this.widgets[type];
            }
            return this.defaultWidget;
        };
        return WidgetRegistry;
    }());

    var WidgetFactory = /** @class */ (function () {
        function WidgetFactory(registry, resolver) {
            this.registry = registry;
            this.resolver = resolver;
        }
        WidgetFactory.prototype.createWidget = function (container, type) {
            var componentClass = this.registry.getWidgetType(type);
            var componentFactory = this.resolver.resolveComponentFactory(componentClass);
            return container.createComponent(componentFactory);
        };
        return WidgetFactory;
    }());
    WidgetFactory.decorators = [
        { type: core.Injectable }
    ];
    WidgetFactory.ctorParameters = function () { return [
        { type: WidgetRegistry },
        { type: core.ComponentFactoryResolver }
    ]; };

    var TerminatorService = /** @class */ (function () {
        function TerminatorService() {
            this.onDestroy = new rxjs.Subject();
        }
        TerminatorService.prototype.destroy = function () {
            this.onDestroy.next(true);
        };
        return TerminatorService;
    }());
    TerminatorService.decorators = [
        { type: core.Injectable }
    ];
    TerminatorService.ctorParameters = function () { return []; };

    /**
     * General purpose propery binding registry
     */
    var PropertyBindingRegistry = /** @class */ (function () {
        function PropertyBindingRegistry() {
            this.bindings = {};
        }
        PropertyBindingRegistry.prototype.getPropertyBindings = function (type) {
            this.bindings[type] = this.bindings[type] || new PropertyBindings();
            return this.bindings[type];
        };
        PropertyBindingRegistry.prototype.getPropertyBindingsVisibility = function () {
            return this.getPropertyBindings(PropertyBindingTypes.visibility);
        };
        return PropertyBindingRegistry;
    }());
    PropertyBindingRegistry.decorators = [
        { type: core.Injectable }
    ];
    /**
     * Defines the types of supported property bindings.<br/>
     * For now only <code>visibility</code> is supported.<br/>
     */
    var PropertyBindingTypes;
    (function (PropertyBindingTypes) {
        PropertyBindingTypes[PropertyBindingTypes["visibility"] = 0] = "visibility";
    })(PropertyBindingTypes || (PropertyBindingTypes = {}));
    /**
     * Storage that holds all bindings that are property paths related.<br/>
     */
    var PropertyBindings = /** @class */ (function () {
        function PropertyBindings() {
            this.sourcesIndex = new SimplePropertyIndexer();
            this.dependenciesIndex = new SimplePropertyIndexer();
        }
        PropertyBindings.prototype.add = function (dependencyPath, sourcePropertyPath) {
            this.sourcesIndex.store(sourcePropertyPath, dependencyPath);
            this.dependenciesIndex.store(dependencyPath, sourcePropertyPath);
        };
        PropertyBindings.prototype.findByDependencyPath = function (dependencyPath) {
            var e_1, _a;
            var result = this.dependenciesIndex.find(dependencyPath);
            result.results = result.results || [];
            var values = [];
            try {
                for (var _b = __values(result.results), _c = _b.next(); !_c.done; _c = _b.next()) {
                    var res = _c.value;
                    values = values.concat(Object.keys(res.value));
                }
            }
            catch (e_1_1) { e_1 = { error: e_1_1 }; }
            finally {
                try {
                    if (_c && !_c.done && (_a = _b.return)) _a.call(_b);
                }
                finally { if (e_1) throw e_1.error; }
            }
            return result.found ? values : [];
        };
        PropertyBindings.prototype.getBySourcePropertyPath = function (sourcePropertyPath) {
            var e_2, _a;
            var result = this.sourcesIndex.find(sourcePropertyPath);
            result.results = result.results || [];
            var values = [];
            try {
                for (var _b = __values(result.results), _c = _b.next(); !_c.done; _c = _b.next()) {
                    var res = _c.value;
                    values = values.concat(Object.keys(res.value));
                }
            }
            catch (e_2_1) { e_2 = { error: e_2_1 }; }
            finally {
                try {
                    if (_c && !_c.done && (_a = _b.return)) _a.call(_b);
                }
                finally { if (e_2) throw e_2.error; }
            }
            return result.found ? values : [];
        };
        PropertyBindings.prototype.createPathIndex = function (path) {
            return path.split('/');
        };
        return PropertyBindings;
    }());
    /**
     * Simple indexer to store property paths
     */
    var SimplePropertyIndexer = /** @class */ (function () {
        function SimplePropertyIndexer() {
            this.index = {};
            this.findOnlyWithValue = true;
        }
        SimplePropertyIndexer.prototype._createPathIndex = function (path) {
            return path
                .replace(new RegExp('//', 'g'), '/')
                .replace(new RegExp('^/', 'g'), '')
                .split('/').filter(function (item) { return item; });
        };
        SimplePropertyIndexer.prototype.store = function (propertyPath, value) {
            this._storeIndex(this._createPathIndex(propertyPath), value);
        };
        SimplePropertyIndexer.prototype._storeIndex = function (pathIndex, value) {
            var e_3, _a;
            var indexPos = this.index;
            try {
                for (var pathIndex_1 = __values(pathIndex), pathIndex_1_1 = pathIndex_1.next(); !pathIndex_1_1.done; pathIndex_1_1 = pathIndex_1.next()) {
                    var key = pathIndex_1_1.value;
                    indexPos[key] = indexPos[key] || {};
                    indexPos = indexPos[key];
                }
            }
            catch (e_3_1) { e_3 = { error: e_3_1 }; }
            finally {
                try {
                    if (pathIndex_1_1 && !pathIndex_1_1.done && (_a = pathIndex_1.return)) _a.call(pathIndex_1);
                }
                finally { if (e_3) throw e_3.error; }
            }
            if (indexPos && value) {
                indexPos[SimplePropertyIndexer.MARKER] = indexPos[SimplePropertyIndexer.MARKER] || {};
                indexPos[SimplePropertyIndexer.MARKER][value] = value;
            }
        };
        /**
         * Find path in index.<br/>
         * Will find path like:<br/>
         * <ul>
         *     <li>/property/0/prop</li>
         *     <li>/property/0/prop/2/test</li>
         *     <li>/property/0/prop/&#42;/test</li>
         *     <li>/property/&#42;/prop/1/test</li>
         *     <li>/property/&#42;/prop/&#42;/test</li>
         *     <li>/property/1/prop/&#42;/test</li>
         *  </ul>
         * @param path
         */
        SimplePropertyIndexer.prototype.find = function (path) {
            return this._findInIndex(this._createPathIndex(path));
        };
        SimplePropertyIndexer.prototype._findInIndex = function (path) {
            var ixRes = { target: path, found: false, results: [] };
            this.__findIndex(ixRes, path, this.index, []);
            return ixRes;
        };
        SimplePropertyIndexer.prototype.__findIndex = function (indexerResults, path, index, parent) {
            var e_4, _a;
            var p = parent || [];
            var segment = path[0];
            var wild = ('*' === segment) ? Object.keys(index) : [];
            var _keys = (Array.isArray(segment) ? segment : [segment]).concat(wild);
            var keys = _keys.filter(function (item, pos) { return '*' !== item && _keys.indexOf(item) === pos; }); // remove duplicates
            if (index['*']) {
                keys.push('*');
            }
            var paths = [];
            try {
                for (var keys_1 = __values(keys), keys_1_1 = keys_1.next(); !keys_1_1.done; keys_1_1 = keys_1.next()) {
                    var key = keys_1_1.value;
                    var restPath = path.slice(1);
                    var restIndex = index[key];
                    var restParent = p.concat(key);
                    if (path.length === 1) { // collect only the full paths
                        if (!this.findOnlyWithValue || (restIndex && restIndex[SimplePropertyIndexer.MARKER])) {
                            indexerResults.results = indexerResults.results || [];
                            indexerResults.results.push({
                                path: restParent,
                                value: restIndex[SimplePropertyIndexer.MARKER]
                            });
                            paths.push(restParent);
                            indexerResults.found = indexerResults.results.length > 0;
                        }
                    }
                    if (!restPath || !restPath.length || !restIndex) {
                        break;
                    }
                    var restPaths = this.__findIndex(indexerResults, restPath, restIndex, restParent);
                    paths = paths.concat(restPaths);
                }
            }
            catch (e_4_1) { e_4 = { error: e_4_1 }; }
            finally {
                try {
                    if (keys_1_1 && !keys_1_1.done && (_a = keys_1.return)) _a.call(keys_1);
                }
                finally { if (e_4) throw e_4.error; }
            }
            return paths;
        };
        return SimplePropertyIndexer;
    }());
    SimplePropertyIndexer.MARKER = '$____value';

    var ExpressionCompilerFactory = /** @class */ (function () {
        function ExpressionCompilerFactory() {
        }
        return ExpressionCompilerFactory;
    }());
    var JEXLExpressionCompilerFactory = /** @class */ (function (_super) {
        __extends(JEXLExpressionCompilerFactory, _super);
        function JEXLExpressionCompilerFactory() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        JEXLExpressionCompilerFactory.prototype.createExpressionCompiler = function () {
            return new JEXLExpressionCompiler();
        };
        JEXLExpressionCompilerFactory.prototype.createExpressionCompilerVisibilityIf = function () {
            return new JEXLExpressionCompilerVisibiltyIf();
        };
        return JEXLExpressionCompilerFactory;
    }(ExpressionCompilerFactory));
    var JEXLExpressionCompiler = /** @class */ (function () {
        function JEXLExpressionCompiler() {
        }
        JEXLExpressionCompiler.prototype.evaluate = function (expression, context) {
            if (context === void 0) { context = {}; }
            return new JEXL.Jexl().evalSync(expression, context);
        };
        return JEXLExpressionCompiler;
    }());
    var JEXLExpressionCompilerVisibiltyIf = /** @class */ (function () {
        function JEXLExpressionCompilerVisibiltyIf() {
        }
        JEXLExpressionCompilerVisibiltyIf.prototype.evaluate = function (expression, context) {
            if (context === void 0) { context = { source: {}, target: {} }; }
            return new JEXL.Jexl().evalSync(expression, context);
        };
        return JEXLExpressionCompilerVisibiltyIf;
    }());

    var LOG_LEVEL = new core.InjectionToken('Logging level');
    var LogService = /** @class */ (function () {
        function LogService(level /* should be of type `LogLevel` but AOT fails with : 'Error encountered in metadata generated for exported symbol 'DefaultLogService':"Could not resolve type LogLevel." */) {
            this.level = level;
            this.logLevel = 3 /* off */;
            this.logLevel = level;
        }
        LogService.prototype.isWarnEnabled = function () {
            return 4 /* all */ === this.logLevel || 1 /* warn */ === this.logLevel;
        };
        LogService.prototype.isErrorEnabled = function () {
            return 4 /* all */ === this.logLevel || 2 /* error */ === this.logLevel;
        };
        LogService.prototype.isLogEnabled = function () {
            return 4 /* all */ === this.logLevel || 0 /* log */ === this.logLevel;
        };
        return LogService;
    }());
    LogService.ctorParameters = function () { return [
        { type: undefined, decorators: [{ type: core.Optional }, { type: core.Inject, args: [LOG_LEVEL,] }] }
    ]; };
    /**
     * Very simple abstraction of logging
     */
    var DefaultLogService = /** @class */ (function (_super) {
        __extends(DefaultLogService, _super);
        function DefaultLogService(logLevel /* should be of type `LogLevel` but AOT fails with : 'Error encountered in metadata generated for exported symbol 'DefaultLogService':"Could not resolve type LogLevel." */) {
            var _this = _super.call(this, logLevel) || this;
            _this.logLevel = logLevel;
            _this.warn = (!_this.isWarnEnabled() ? function () { } : console.warn);
            _this.error = (!_this.isErrorEnabled() ? function () { } : console.error);
            _this.log = (!_this.isLogEnabled() ? function () { } : console.log);
            _this.logLevel = logLevel;
            return _this;
        }
        return DefaultLogService;
    }(LogService));
    DefaultLogService.decorators = [
        { type: core.Injectable }
    ];
    DefaultLogService.ctorParameters = function () { return [
        { type: undefined, decorators: [{ type: core.Optional }, { type: core.Inject, args: [LOG_LEVEL,] }] }
    ]; };

    function useFactory(schemaValidatorFactory, validatorRegistry, propertyBindingRegistry, expressionCompilerFactory, logService) {
        return new FormPropertyFactory(schemaValidatorFactory, validatorRegistry, propertyBindingRegistry, expressionCompilerFactory, logService);
    }
    var FormComponent = /** @class */ (function () {
        function FormComponent(formPropertyFactory, actionRegistry, validatorRegistry, bindingRegistry, cdr, terminator) {
            this.formPropertyFactory = formPropertyFactory;
            this.actionRegistry = actionRegistry;
            this.validatorRegistry = validatorRegistry;
            this.bindingRegistry = bindingRegistry;
            this.cdr = cdr;
            this.terminator = terminator;
            this.schema = null;
            this.actions = {};
            this.validators = {};
            this.bindings = {};
            // tslint:disable-next-line:no-output-on-prefix
            this.onChange = new core.EventEmitter();
            this.modelChange = new core.EventEmitter();
            this.isValid = new core.EventEmitter();
            // tslint:disable-next-line:no-output-on-prefix
            this.onErrorChange = new core.EventEmitter();
            // tslint:disable-next-line:no-output-on-prefix
            this.onErrorsChange = new core.EventEmitter();
            this.rootProperty = null;
        }
        FormComponent.prototype.writeValue = function (obj) {
            if (this.rootProperty) {
                this.rootProperty.reset(obj, false);
            }
        };
        FormComponent.prototype.registerOnChange = function (fn) {
            this.onChangeCallback = fn;
            if (this.rootProperty) {
                this.rootProperty.valueChanges.subscribe(this.onValueChanges.bind(this));
            }
        };
        // TODO implement
        FormComponent.prototype.registerOnTouched = function (fn) {
        };
        // TODO implement
        // setDisabledState(isDisabled: boolean)?: void
        FormComponent.prototype.ngOnChanges = function (changes) {
            var _this = this;
            if (changes.validators) {
                this.setValidators();
            }
            if (changes.actions) {
                this.setActions();
            }
            if (changes.bindings) {
                this.setBindings();
            }
            if (this.schema && !this.schema.type) {
                this.schema.type = 'object';
            }
            if (this.schema && changes.schema) {
                if (!changes.schema.firstChange) {
                    this.terminator.destroy();
                }
                SchemaPreprocessor.preprocess(this.schema);
                this.rootProperty = this.formPropertyFactory.createProperty(this.schema);
                if (this.model) {
                    // FIX: Root property is freshly created. Update it with the model.
                    this.rootProperty.reset(this.model, false);
                }
                this.rootProperty.valueChanges.subscribe(this.onValueChanges.bind(this));
                this.rootProperty.errorsChanges.subscribe(function (value) {
                    _this.onErrorChange.emit({ value: value });
                    _this.isValid.emit(!(value && value.length));
                });
            }
            else if (this.schema && changes.model) {
                // FIX: Only model is updated. Keep the same subscribers of root property.
                this.rootProperty.reset(this.model, false);
            }
            this.cdr.detectChanges();
        };
        FormComponent.prototype.setValidators = function () {
            this.validatorRegistry.clear();
            if (this.validators) {
                for (var validatorId in this.validators) {
                    if (this.validators.hasOwnProperty(validatorId)) {
                        this.validatorRegistry.register(validatorId, this.validators[validatorId]);
                    }
                }
            }
        };
        FormComponent.prototype.setActions = function () {
            this.actionRegistry.clear();
            if (this.actions) {
                for (var actionId in this.actions) {
                    if (this.actions.hasOwnProperty(actionId)) {
                        this.actionRegistry.register(actionId, this.actions[actionId]);
                    }
                }
            }
        };
        FormComponent.prototype.setBindings = function () {
            this.bindingRegistry.clear();
            if (this.bindings) {
                for (var bindingPath in this.bindings) {
                    if (this.bindings.hasOwnProperty(bindingPath)) {
                        this.bindingRegistry.register(bindingPath, this.bindings[bindingPath]);
                    }
                }
            }
        };
        FormComponent.prototype.reset = function () {
            this.rootProperty.reset(null, true);
        };
        FormComponent.prototype.setModel = function (value) {
            var e_1, _a;
            if (this.model) {
                try {
                    // FIX - Ajay: Avoid overwriting the model,
                    // and keep model reference unchanged.
                    for (var _b = __values(Object.getOwnPropertyNames(this.model)), _c = _b.next(); !_c.done; _c = _b.next()) {
                        var prop = _c.value;
                        delete this.model[prop];
                    }
                }
                catch (e_1_1) { e_1 = { error: e_1_1 }; }
                finally {
                    try {
                        if (_c && !_c.done && (_a = _b.return)) _a.call(_b);
                    }
                    finally { if (e_1) throw e_1.error; }
                }
                Object.assign(this.model, value);
            }
            else {
                this.model = value;
            }
        };
        FormComponent.prototype.onValueChanges = function (value) {
            if (this.onChangeCallback) {
                this.setModel(value);
                this.onChangeCallback(value);
            }
            // two way binding is used
            if (this.modelChange.observers.length > 0) {
                if (!this.onChangeCallback) {
                    this.setModel(value);
                }
                this.modelChange.emit(this.model); // FIX: Emit model change event
            }
            this.onChange.emit({ value: value });
        };
        return FormComponent;
    }());
    FormComponent.decorators = [
        { type: core.Component, args: [{
                    selector: 'sf-form',
                    template: "\n    <form *ngIf=\"rootProperty\" [attr.name]=\"rootProperty.rootName\" [attr.id]=\"rootProperty.rootName\">\n      <sf-form-element [formProperty]=\"rootProperty\"></sf-form-element>\n    </form>",
                    providers: [
                        ActionRegistry,
                        ValidatorRegistry,
                        PropertyBindingRegistry,
                        BindingRegistry,
                        SchemaPreprocessor,
                        WidgetFactory,
                        {
                            provide: FormPropertyFactory,
                            useFactory: useFactory,
                            deps: [SchemaValidatorFactory, ValidatorRegistry, PropertyBindingRegistry, ExpressionCompilerFactory, LogService]
                        },
                        TerminatorService,
                        {
                            provide: forms.NG_VALUE_ACCESSOR,
                            useExisting: FormComponent,
                            multi: true
                        }
                    ]
                },] }
    ];
    FormComponent.ctorParameters = function () { return [
        { type: FormPropertyFactory },
        { type: ActionRegistry },
        { type: ValidatorRegistry },
        { type: BindingRegistry },
        { type: core.ChangeDetectorRef },
        { type: TerminatorService }
    ]; };
    FormComponent.propDecorators = {
        schema: [{ type: core.Input }],
        model: [{ type: core.Input }],
        actions: [{ type: core.Input }],
        validators: [{ type: core.Input }],
        bindings: [{ type: core.Input }],
        onChange: [{ type: core.Output }],
        modelChange: [{ type: core.Output }],
        isValid: [{ type: core.Output }],
        onErrorChange: [{ type: core.Output }],
        onErrorsChange: [{ type: core.Output }]
    };

    var FormElementComponent = /** @class */ (function () {
        function FormElementComponent(actionRegistry, bindingRegistry, renderer, elementRef, logger) {
            this.actionRegistry = actionRegistry;
            this.bindingRegistry = bindingRegistry;
            this.renderer = renderer;
            this.elementRef = elementRef;
            this.logger = logger;
            this.control = new forms.FormControl('', function () { return null; });
            this.widget = null;
            this.buttons = [];
            this.unlisten = [];
        }
        FormElementComponent.prototype.ngOnInit = function () {
            this.parseButtons();
            this.setupBindings();
        };
        FormElementComponent.prototype.setupBindings = function () {
            var _this = this;
            var bindings = this.bindingRegistry.get(this.formProperty.path);
            if ((bindings || []).length) {
                bindings.forEach(function (binding) {
                    for (var eventId in binding) {
                        _this.createBinding(eventId, binding[eventId]);
                    }
                });
            }
        };
        FormElementComponent.prototype.createBinding = function (eventId, listeners) {
            var _this = this;
            this.unlisten.push(this.renderer.listen(this.elementRef.nativeElement, eventId, function (event) {
                var e_1, _a;
                var _listeners = Array.isArray(listeners) ? listeners : [listeners];
                try {
                    for (var _listeners_1 = __values(_listeners), _listeners_1_1 = _listeners_1.next(); !_listeners_1_1.done; _listeners_1_1 = _listeners_1.next()) {
                        var _listener = _listeners_1_1.value;
                        if (_listener instanceof Function) {
                            try {
                                _listener(event, _this.formProperty);
                            }
                            catch (e) {
                                _this.logger.error("Error calling bindings event listener for '" + eventId + "'", e);
                            }
                        }
                        else {
                            _this.logger.warn('Calling non function handler for eventId ' + eventId + ' for path ' + _this.formProperty.path);
                        }
                    }
                }
                catch (e_1_1) { e_1 = { error: e_1_1 }; }
                finally {
                    try {
                        if (_listeners_1_1 && !_listeners_1_1.done && (_a = _listeners_1.return)) _a.call(_listeners_1);
                    }
                    finally { if (e_1) throw e_1.error; }
                }
            }));
        };
        FormElementComponent.prototype.parseButtons = function () {
            var e_2, _a;
            if (this.formProperty.schema.buttons !== undefined) {
                this.buttons = this.formProperty.schema.buttons;
                try {
                    for (var _b = __values(this.buttons), _c = _b.next(); !_c.done; _c = _b.next()) {
                        var button = _c.value;
                        this.createButtonCallback(button);
                    }
                }
                catch (e_2_1) { e_2 = { error: e_2_1 }; }
                finally {
                    try {
                        if (_c && !_c.done && (_a = _b.return)) _a.call(_b);
                    }
                    finally { if (e_2) throw e_2.error; }
                }
            }
        };
        FormElementComponent.prototype.createButtonCallback = function (button) {
            var _this = this;
            button.action = function (e) {
                var action;
                if (button.id && (action = _this.actionRegistry.get(button.id))) {
                    if (action) {
                        action(_this.formProperty, button.parameters);
                    }
                }
                e.preventDefault();
            };
        };
        FormElementComponent.prototype.onWidgetInstanciated = function (widget) {
            this.widget = widget;
            var id = this.formProperty.canonicalPathNotation || 'field' + (FormElementComponent.counter++);
            if (this.formProperty.root.rootName) {
                id = this.formProperty.root.rootName + ":" + id;
            }
            this.widget.formProperty = this.formProperty;
            this.widget.schema = this.formProperty.schema;
            this.widget.name = id;
            this.widget.id = id;
            this.widget.control = this.control;
        };
        FormElementComponent.prototype.ngOnDestroy = function () {
            if (this.unlisten) {
                this.unlisten.forEach(function (item) {
                    item();
                });
            }
        };
        return FormElementComponent;
    }());
    FormElementComponent.counter = 0;
    FormElementComponent.decorators = [
        { type: core.Component, args: [{
                    selector: 'sf-form-element',
                    template: "\n    <div *ngIf=\"formProperty.visible\"\n         [class.has-error]=\"!control.valid\"\n         [class.has-success]=\"control.valid\">\n      <sf-widget-chooser\n        (widgetInstanciated)=\"onWidgetInstanciated($event)\"\n        [widgetInfo]=\"formProperty.schema.widget\">\n      </sf-widget-chooser>\n      <sf-form-element-action *ngFor=\"let button of buttons\" [button]=\"button\" [formProperty]=\"formProperty\"></sf-form-element-action>\n    </div>"
                },] }
    ];
    FormElementComponent.ctorParameters = function () { return [
        { type: ActionRegistry },
        { type: BindingRegistry },
        { type: core.Renderer2 },
        { type: core.ElementRef },
        { type: LogService }
    ]; };
    FormElementComponent.propDecorators = {
        formProperty: [{ type: core.Input }]
    };

    var FormElementComponentAction = /** @class */ (function () {
        function FormElementComponentAction(widgetFactory, terminator) {
            if (widgetFactory === void 0) { widgetFactory = null; }
            this.widgetFactory = widgetFactory;
            this.terminator = terminator;
        }
        FormElementComponentAction.prototype.ngOnInit = function () {
            var _this = this;
            this.subs = this.terminator.onDestroy.subscribe(function (destroy) {
                if (destroy) {
                    _this.ref.destroy();
                }
            });
        };
        FormElementComponentAction.prototype.ngOnChanges = function () {
            this.ref = this.widgetFactory.createWidget(this.container, this.button.widget || 'button');
            this.ref.instance.button = this.button;
            this.ref.instance.formProperty = this.formProperty;
        };
        FormElementComponentAction.prototype.ngOnDestroy = function () {
            this.subs.unsubscribe();
        };
        return FormElementComponentAction;
    }());
    FormElementComponentAction.decorators = [
        { type: core.Component, args: [{
                    selector: 'sf-form-element-action',
                    template: '<ng-template #target></ng-template>'
                },] }
    ];
    FormElementComponentAction.ctorParameters = function () { return [
        { type: WidgetFactory },
        { type: TerminatorService }
    ]; };
    FormElementComponentAction.propDecorators = {
        button: [{ type: core.Input }],
        formProperty: [{ type: core.Input }],
        container: [{ type: core.ViewChild, args: ['target', { read: core.ViewContainerRef, static: true },] }]
    };

    var WidgetChooserComponent = /** @class */ (function () {
        function WidgetChooserComponent(widgetFactory, cdr, terminator) {
            if (widgetFactory === void 0) { widgetFactory = null; }
            this.widgetFactory = widgetFactory;
            this.cdr = cdr;
            this.terminator = terminator;
            this.widgetInstanciated = new core.EventEmitter();
        }
        WidgetChooserComponent.prototype.ngOnInit = function () {
            var _this = this;
            this.subs = this.terminator.onDestroy.subscribe(function (destroy) {
                if (destroy) {
                    _this.ref.destroy();
                }
            });
        };
        WidgetChooserComponent.prototype.ngOnChanges = function () {
            this.ref = this.widgetFactory.createWidget(this.container, this.widgetInfo.id);
            this.widgetInstanciated.emit(this.ref.instance);
            this.widgetInstance = this.ref.instance;
            this.cdr.detectChanges();
        };
        WidgetChooserComponent.prototype.ngOnDestroy = function () {
            if (this.subs) { // FIX: Guard against null, something happening in the tests.
                this.subs.unsubscribe();
            }
        };
        return WidgetChooserComponent;
    }());
    WidgetChooserComponent.decorators = [
        { type: core.Component, args: [{
                    selector: 'sf-widget-chooser',
                    template: "<div #target></div>"
                },] }
    ];
    WidgetChooserComponent.ctorParameters = function () { return [
        { type: WidgetFactory },
        { type: core.ChangeDetectorRef },
        { type: TerminatorService }
    ]; };
    WidgetChooserComponent.propDecorators = {
        widgetInfo: [{ type: core.Input }],
        widgetInstanciated: [{ type: core.Output }],
        container: [{ type: core.ViewChild, args: ['target', { read: core.ViewContainerRef, static: true },] }]
    };

    var Widget = /** @class */ (function () {
        function Widget() {
            this.id = "";
            this.name = "";
            this.schema = {};
        }
        return Widget;
    }());
    var ControlWidget = /** @class */ (function (_super) {
        __extends(ControlWidget, _super);
        function ControlWidget() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        ControlWidget.prototype.ngAfterViewInit = function () {
            var _this = this;
            var control = this.control;
            this.formProperty.valueChanges.subscribe(function (newValue) {
                if (control.value !== newValue) {
                    control.setValue(newValue, { emitEvent: false });
                }
            });
            this.formProperty.errorsChanges.subscribe(function (errors) {
                control.setErrors(errors, { emitEvent: true });
                var messages = (errors || [])
                    .filter(function (e) {
                    return e.path && e.path.slice(1) === _this.formProperty.path;
                })
                    .map(function (e) { return e.message; });
                _this.errorMessages = messages.filter(function (m, i) { return messages.indexOf(m) === i; });
            });
            control.valueChanges.subscribe(function (newValue) {
                _this.formProperty.setValue(newValue, false);
            });
        };
        return ControlWidget;
    }(Widget));
    ControlWidget.decorators = [
        { type: core.Directive }
    ];
    var ArrayLayoutWidget = /** @class */ (function (_super) {
        __extends(ArrayLayoutWidget, _super);
        function ArrayLayoutWidget() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        ArrayLayoutWidget.prototype.ngAfterViewInit = function () {
            var control = this.control;
            this.formProperty.errorsChanges.subscribe(function (errors) {
                control.setErrors(errors, { emitEvent: true });
            });
        };
        return ArrayLayoutWidget;
    }(Widget));
    ArrayLayoutWidget.decorators = [
        { type: core.Directive }
    ];
    var ObjectLayoutWidget = /** @class */ (function (_super) {
        __extends(ObjectLayoutWidget, _super);
        function ObjectLayoutWidget() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        ObjectLayoutWidget.prototype.ngAfterViewInit = function () {
            var control = this.control;
            this.formProperty.errorsChanges.subscribe(function (errors) {
                control.setErrors(errors, { emitEvent: true });
            });
        };
        return ObjectLayoutWidget;
    }(Widget));
    ObjectLayoutWidget.decorators = [
        { type: core.Directive }
    ];

    var ArrayWidget = /** @class */ (function (_super) {
        __extends(ArrayWidget, _super);
        function ArrayWidget() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        ArrayWidget.prototype.addItem = function () {
            this.formProperty.addItem();
            this.updateButtonDisabledState();
        };
        ArrayWidget.prototype.removeItem = function (item) {
            this.formProperty.removeItem(item);
            this.updateButtonDisabledState();
        };
        ArrayWidget.prototype.trackByIndex = function (index, item) {
            return index;
        };
        ArrayWidget.prototype.updateButtonDisabledState = function () {
            this.buttonDisabledAdd = this.isAddButtonDisabled();
            this.buttonDisabledRemove = this.isRemoveButtonDisabled();
        };
        ArrayWidget.prototype.isAddButtonDisabled = function () {
            if (this.schema.hasOwnProperty('maxItems') && Array.isArray(this.formProperty.properties)) {
                if (this.formProperty.properties.length >= this.schema.maxItems) {
                    return true;
                }
            }
            return false;
        };
        ArrayWidget.prototype.isRemoveButtonDisabled = function () {
            if (this.schema.hasOwnProperty('minItems') && Array.isArray(this.formProperty.properties)) {
                if (this.formProperty.properties.length <= this.schema.minItems) {
                    return true;
                }
            }
            return false;
        };
        return ArrayWidget;
    }(ArrayLayoutWidget));
    ArrayWidget.decorators = [
        { type: core.Component, args: [{
                    selector: 'sf-array-widget',
                    template: "<div class=\"widget form-group\">\n\t<label [attr.for]=\"id\" class=\"horizontal control-label\">\n\t\t{{ schema.title }}\n\t</label>\n\t<span *ngIf=\"schema.description\" class=\"formHelp\">{{schema.description}}</span>\n\t<div *ngFor=\"let itemProperty of formProperty.properties\">\n\t\t<sf-form-element [formProperty]=\"itemProperty\"></sf-form-element>\n\t\t<button (click)=\"removeItem(itemProperty)\" class=\"btn btn-default array-remove-button\"\n\t\t\t[disabled]=\"isRemoveButtonDisabled()\" \n\t\t\t*ngIf=\"!(schema.hasOwnProperty('minItems') && schema.hasOwnProperty('maxItems') && schema.minItems === schema.maxItems)\"\n\t\t\t>\n\t\t\t<span class=\"glyphicon glyphicon-minus\" aria-hidden=\"true\"></span> Remove\n\t\t</button>\n\t</div>\n\t<button (click)=\"addItem()\" class=\"btn btn-default array-add-button\"\n\t\t[disabled]=\"isAddButtonDisabled()\"\n\t\t*ngIf=\"!(schema.hasOwnProperty('minItems') && schema.hasOwnProperty('maxItems') && schema.minItems === schema.maxItems)\"\n\t>\n\t\t<span class=\"glyphicon glyphicon-plus\" aria-hidden=\"true\"></span> Add\n\t</button>\n</div>"
                },] }
    ];

    var ButtonWidget = /** @class */ (function () {
        function ButtonWidget() {
        }
        return ButtonWidget;
    }());
    ButtonWidget.decorators = [
        { type: core.Component, args: [{
                    selector: 'sf-button-widget',
                    template: '<button (click)="button.action($event)">{{button.label}}</button>'
                },] }
    ];

    var ObjectWidget = /** @class */ (function (_super) {
        __extends(ObjectWidget, _super);
        function ObjectWidget() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        return ObjectWidget;
    }(ObjectLayoutWidget));
    ObjectWidget.decorators = [
        { type: core.Component, args: [{
                    selector: 'sf-form-object',
                    template: "<fieldset *ngFor=\"let fieldset of formProperty.schema.fieldsets\">\n\t<legend *ngIf=\"fieldset.title\">{{fieldset.title}}</legend>\n\t<div *ngIf=\"fieldset.description\">{{fieldset.description}}</div>\n\t<div *ngFor=\"let fieldId of fieldset.fields\">\n\t\t<sf-form-element [formProperty]=\"formProperty.getProperty(fieldId)\"></sf-form-element>\n\t</div>\n</fieldset>"
                },] }
    ];

    // tslint:disable-next-line:component-class-suffix
    var CheckboxWidget = /** @class */ (function (_super) {
        __extends(CheckboxWidget, _super);
        function CheckboxWidget() {
            var _this = _super.apply(this, __spread(arguments)) || this;
            _this.checked = {};
            return _this;
        }
        CheckboxWidget.prototype.ngAfterViewInit = function () {
            var _this = this;
            var control = this.control;
            this.formProperty.valueChanges.subscribe(function (newValue) {
                if (control.value !== newValue) {
                    _this.checked = {}; // FIX: Reset the selections before reading from newValue.
                    control.setValue(newValue, { emitEvent: false });
                    if (newValue && Array.isArray(newValue)) {
                        newValue.map(function (v) { return _this.checked[v] = true; });
                    }
                }
            });
            this.formProperty.errorsChanges.subscribe(function (errors) {
                control.setErrors(errors, { emitEvent: true });
            });
            control.valueChanges.subscribe(function (newValue) {
                _this.formProperty.setValue(newValue, false);
            });
        };
        CheckboxWidget.prototype.onCheck = function (el) {
            if (el.checked) {
                this.checked[el.value] = true;
            }
            else {
                delete this.checked[el.value];
            }
            this.formProperty.setValue(Object.keys(this.checked), false);
        };
        return CheckboxWidget;
    }(ControlWidget));
    CheckboxWidget.decorators = [
        { type: core.Component, args: [{
                    selector: 'sf-checkbox-widget',
                    template: "<div class=\"widget form-group\">\n    <label [attr.for]=\"id\" class=\"horizontal control-label\">\n        {{ schema.title }}\n    </label>\n\t<div *ngIf=\"schema.type!='array'\" class=\"checkbox\">\n\t\t<label class=\"horizontal control-label\">\n\t\t\t<input [formControl]=\"control\" [attr.name]=\"name\" [attr.id]=\"id\" [indeterminate]=\"control.value !== false && control.value !== true ? true :null\" type=\"checkbox\" [disabled]=\"schema.readOnly\">\n\t\t\t<input *ngIf=\"schema.readOnly\" [attr.name]=\"name\" type=\"hidden\" [formControl]=\"control\">\n\t\t\t{{schema.description}}\n\t\t</label>\n\t</div>\n\t<ng-container *ngIf=\"schema.type==='array'\">\n\t\t<div *ngFor=\"let option of schema.items.oneOf\" class=\"checkbox\">\n\t\t\t<label class=\"horizontal control-label\">\n\t\t\t\t<input [attr.name]=\"name\"\n\t\t\t\t\tvalue=\"{{option.enum[0]}}\" type=\"checkbox\"\n\t\t\t\t\t[attr.disabled]=\"schema.readOnly\"\n\t\t\t\t\t(change)=\"onCheck($event.target)\"\n\t\t\t\t\t[attr.checked]=\"checked[option.enum[0]] ? true : null\"\n\t\t\t\t\t[attr.id]=\"id + '.' + option.enum[0]\"\n\t\t\t\t\t>\n\t\t\t\t{{option.description}}\n\t\t\t</label>\n\t\t</div>\n\t</ng-container>\n</div>"
                },] }
    ];

    var FileWidget = /** @class */ (function (_super) {
        __extends(FileWidget, _super);
        function FileWidget() {
            var _this = _super.call(this) || this;
            _this.reader = new FileReader();
            _this.filedata = {};
            return _this;
        }
        FileWidget.prototype.ngAfterViewInit = function () {
            var _this = this;
            // OVERRIDE ControlWidget ngAfterViewInit() as ReactiveForms do not handle
            // file inputs
            var control = this.control;
            this.formProperty.errorsChanges.subscribe(function (errors) {
                control.setErrors(errors, { emitEvent: true });
            });
            this.reader.onloadend = function () {
                _this.filedata.data = window.btoa(_this.reader.result);
                _this.formProperty.setValue(_this.filedata, false);
            };
        };
        FileWidget.prototype.onFileChange = function ($event) {
            var file = $event.target.files[0];
            this.filedata.filename = file.name;
            this.filedata.size = file.size;
            this.filedata['content-type'] = file.type;
            this.filedata.encoding = 'base64';
            this.reader.readAsBinaryString(file);
        };
        return FileWidget;
    }(ControlWidget));
    FileWidget.decorators = [
        { type: core.Component, args: [{
                    selector: 'sf-file-widget',
                    template: "<div class=\"widget form-group\">\n\t<label [attr.for]=\"id\" class=\"horizontal control-label\">\n\t\t{{ schema.title }}\n\t</label>\n    <span *ngIf=\"schema.description\" class=\"formHelp\">{{schema.description}}</span>\n  <input [name]=\"name\" class=\"text-widget file-widget\" [attr.id]=\"id\"\n    [formControl]=\"control\" type=\"file\" [attr.disabled]=\"schema.readOnly?true:null\"\n    (change)=\"onFileChange($event)\">\n\t<input *ngIf=\"schema.readOnly\" [attr.name]=\"name\" type=\"hidden\" [formControl]=\"control\">\n</div>"
                },] }
    ];
    FileWidget.ctorParameters = function () { return []; };

    var IntegerWidget = /** @class */ (function (_super) {
        __extends(IntegerWidget, _super);
        function IntegerWidget() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        return IntegerWidget;
    }(ControlWidget));
    IntegerWidget.decorators = [
        { type: core.Component, args: [{
                    selector: 'sf-integer-widget',
                    template: "<div class=\"widget form-group\">\n\t<label [attr.for]=\"id\" class=\"horizontal control-label\">\n\t\t{{ schema.title }}\n\t</label>\n  <span *ngIf=\"schema.description\" class=\"formHelp\">{{schema.description}}</span>\n\t<input [attr.readonly]=\"schema.readOnly?true:null\" [attr.name]=\"name\"\n\t[attr.id]=\"id\"\n\tclass=\"text-widget integer-widget form-control\" [formControl]=\"control\"\n\t[attr.type]=\"'number'\" [attr.min]=\"schema.minimum\" [attr.max]=\"schema.maximum\"\n\t[attr.placeholder]=\"schema.placeholder\"\n\t[attr.maxLength]=\"schema.maxLength || null\"\n  [attr.minLength]=\"schema.minLength || null\">\n</div>"
                },] }
    ];

    var TextAreaWidget = /** @class */ (function (_super) {
        __extends(TextAreaWidget, _super);
        function TextAreaWidget() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        return TextAreaWidget;
    }(ControlWidget));
    TextAreaWidget.decorators = [
        { type: core.Component, args: [{
                    selector: 'sf-textarea-widget',
                    template: "<div class=\"widget form-group\">\n\t<label [attr.for]=\"id\" class=\"horizontal control-label\">\n\t\t{{ schema.title }}\n\t</label>\n    <span *ngIf=\"schema.description\" class=\"formHelp\">{{schema.description}}</span>\n\t<textarea [readonly]=\"schema.readOnly\" [name]=\"name\"\n\t\t[attr.id]=\"id\"\n\t\tclass=\"text-widget textarea-widget form-control\"\n\t\t[attr.placeholder]=\"schema.placeholder\"\n\t\t[attr.maxLength]=\"schema.maxLength || null\"\n    [attr.minLength]=\"schema.minLength || null\"\n\t\t[formControl]=\"control\"></textarea>\n</div>"
                },] }
    ];

    var RadioWidget = /** @class */ (function (_super) {
        __extends(RadioWidget, _super);
        function RadioWidget() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        return RadioWidget;
    }(ControlWidget));
    RadioWidget.decorators = [
        { type: core.Component, args: [{
                    selector: 'sf-radio-widget',
                    template: "<div class=\"widget form-group\">\n\t<label>{{schema.title}}</label>\n    <span *ngIf=\"schema.description\" class=\"formHelp\">{{schema.description}}</span>\n\t<div *ngFor=\"let option of schema.oneOf\" class=\"radio\">\n\t\t<label class=\"horizontal control-label\">\n\t\t\t<input [formControl]=\"control\" [attr.name]=\"name\" [attr.id]=\"id + '.' + option.enum[0]\" value=\"{{option.enum[0]}}\" type=\"radio\"  [disabled]=\"schema.readOnly||option.readOnly\">\n\t\t\t{{option.description}}\n\t\t</label>\n\t</div>\n\t<input *ngIf=\"schema.readOnly\" [attr.name]=\"name\" type=\"hidden\" [formControl]=\"control\">\n</div>"
                },] }
    ];

    var RangeWidget = /** @class */ (function (_super) {
        __extends(RangeWidget, _super);
        function RangeWidget() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        return RangeWidget;
    }(ControlWidget));
    RangeWidget.decorators = [
        { type: core.Component, args: [{
                    selector: 'sf-range-widget',
                    template: "<div class=\"widget form-group\">\n\t<label [attr.for]=\"id\" class=\"horizontal control-label\">\n\t\t{{ schema.title }}\n\t</label>\n    <span *ngIf=\"schema.description\" class=\"formHelp\">{{schema.description}}</span>\t\n\t<input [name]=\"name\" class=\"text-widget range-widget\" [attr.id]=\"id\"\n\t[formControl]=\"control\" [attr.type]=\"'range'\" [attr.min]=\"schema.minimum\" [attr.max]=\"schema.maximum\" [disabled]=\"schema.readOnly?true:null\" >\n\t<input *ngIf=\"schema.readOnly\" [attr.name]=\"name\" type=\"hidden\">\n</div>"
                },] }
    ];

    var SelectWidget = /** @class */ (function (_super) {
        __extends(SelectWidget, _super);
        function SelectWidget() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        return SelectWidget;
    }(ControlWidget));
    SelectWidget.decorators = [
        { type: core.Component, args: [{
                    selector: 'sf-select-widget',
                    template: "<div class=\"widget form-group\">\n\t<label [attr.for]=\"id\" class=\"horizontal control-label\">\n\t\t{{ schema.title }}\n\t</label>\n\n\t<span *ngIf=\"schema.description\" class=\"formHelp\">\n\t\t{{schema.description}}\n\t</span>\n\n\t<select *ngIf=\"schema.type!='array'\" [formControl]=\"control\" [attr.name]=\"name\" [attr.id]=\"id\" [disabled]=\"schema.readOnly\" [disableControl]=\"schema.readOnly\" class=\"form-control\">\n\t\t<ng-container *ngIf=\"schema.oneOf; else use_enum\">\n\t\t\t<option *ngFor=\"let option of schema.oneOf\" [ngValue]=\"option.enum[0]\" >{{option.description}}</option>\n\t\t</ng-container>\n\t\t<ng-template #use_enum>\n\t\t\t<option *ngFor=\"let option of schema.enum\" [ngValue]=\"option\" >{{option}}</option>\n\t\t</ng-template>\n\t</select>\n\n\t<select *ngIf=\"schema.type==='array'\" multiple [formControl]=\"control\" [attr.name]=\"name\" [attr.id]=\"id\" [disabled]=\"schema.readOnly\" [disableControl]=\"schema.readOnly\" class=\"form-control\">\n    <option *ngFor=\"let option of schema.items.oneOf\" [ngValue]=\"option.enum[0]\" [disabled]=\"option.readOnly\">{{option.description}}</option>\n\t</select>\n\n\t<input *ngIf=\"schema.readOnly\" [attr.name]=\"name\" type=\"hidden\" [formControl]=\"control\">\n</div>"
                },] }
    ];

    var StringWidget = /** @class */ (function (_super) {
        __extends(StringWidget, _super);
        function StringWidget() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        StringWidget.prototype.getInputType = function () {
            if (!this.schema.widget.id || this.schema.widget.id === 'string') {
                return 'text';
            }
            else {
                return this.schema.widget.id;
            }
        };
        return StringWidget;
    }(ControlWidget));
    StringWidget.decorators = [
        { type: core.Component, args: [{
                    selector: 'sf-string-widget',
                    template: "<input *ngIf=\"this.schema.widget.id ==='hidden'; else notHiddenFieldBlock\"\n  [attr.name]=\"name\" type=\"hidden\" [formControl]=\"control\">\n<ng-template #notHiddenFieldBlock>\n<div class=\"widget form-group\">\n    <label [attr.for]=\"id\" class=\"horizontal control-label\">\n    \t{{ schema.title }}\n    </label>\n    <span *ngIf=\"schema.description\" class=\"formHelp\">{{schema.description}}</span>\n    <input [name]=\"name\" [attr.readonly]=\"(schema.widget.id!=='color') && schema.readOnly?true:null\"\n    class=\"text-widget.id textline-widget form-control\"\n    [attr.type]=\"!this.schema.widget.id || this.schema.widget.id === 'string' ? 'text' : this.schema.widget.id\"\n    [attr.id]=\"id\"  [formControl]=\"control\" [attr.placeholder]=\"schema.placeholder\"\n    [attr.maxLength]=\"schema.maxLength || null\"\n    [attr.minLength]=\"schema.minLength || null\"\n    [attr.required]=\"schema.isRequired || null\"\n    [attr.disabled]=\"(schema.widget.id=='color' && schema.readOnly)?true:null\">\n    <input *ngIf=\"(schema.widget.id==='color' && schema.readOnly)\" [attr.name]=\"name\" type=\"hidden\" [formControl]=\"control\">\n</div>\n</ng-template>"
                },] }
    ];

    var DefaultWidgetRegistry = /** @class */ (function (_super) {
        __extends(DefaultWidgetRegistry, _super);
        function DefaultWidgetRegistry() {
            var _this = _super.call(this) || this;
            _this.register('array', ArrayWidget);
            _this.register('object', ObjectWidget);
            _this.register('string', StringWidget);
            _this.register('search', StringWidget);
            _this.register('tel', StringWidget);
            _this.register('url', StringWidget);
            _this.register('email', StringWidget);
            _this.register('password', StringWidget);
            _this.register('color', StringWidget);
            _this.register('date', StringWidget);
            _this.register('date-time', StringWidget);
            _this.register('time', StringWidget);
            _this.register('integer', IntegerWidget);
            _this.register('number', IntegerWidget);
            _this.register('range', RangeWidget);
            _this.register('textarea', TextAreaWidget);
            _this.register('file', FileWidget);
            _this.register('select', SelectWidget);
            _this.register('radio', RadioWidget);
            _this.register('boolean', CheckboxWidget);
            _this.register('checkbox', CheckboxWidget);
            _this.register('button', ButtonWidget);
            _this.setDefaultWidget(StringWidget);
            return _this;
        }
        return DefaultWidgetRegistry;
    }(WidgetRegistry));
    DefaultWidgetRegistry.decorators = [
        { type: core.Injectable }
    ];
    DefaultWidgetRegistry.ctorParameters = function () { return []; };

    var DisableControlDirective = /** @class */ (function () {
        function DisableControlDirective(ngControl) {
            this.ngControl = ngControl;
        }
        Object.defineProperty(DisableControlDirective.prototype, "disableControl", {
            set: function (condition) {
                var action = condition ? 'disable' : 'enable';
                this.ngControl.control[action]();
            },
            enumerable: false,
            configurable: true
        });
        return DisableControlDirective;
    }());
    DisableControlDirective.decorators = [
        { type: core.Directive, args: [{
                    selector: '[disableControl]'
                },] }
    ];
    DisableControlDirective.ctorParameters = function () { return [
        { type: forms.NgControl }
    ]; };
    DisableControlDirective.propDecorators = {
        disableControl: [{ type: core.Input }]
    };

    var DefaultWidget = /** @class */ (function () {
        function DefaultWidget() {
        }
        return DefaultWidget;
    }());
    DefaultWidget.decorators = [
        { type: core.Component, args: [{
                    selector: 'sf-default-field',
                    template: "<p>Unknow type</p>"
                },] }
    ];

    var ɵ0 = 3 /* off */;
    var moduleProviders = [
        {
            provide: WidgetRegistry,
            useClass: DefaultWidgetRegistry
        },
        {
            provide: SchemaValidatorFactory,
            useClass: ZSchemaValidatorFactory
        },
        {
            provide: ExpressionCompilerFactory,
            useClass: JEXLExpressionCompilerFactory
        },
        {
            provide: LOG_LEVEL,
            useValue: ɵ0
        },
        {
            provide: LogService,
            useClass: DefaultLogService
        }
    ];
    var SchemaFormModule = /** @class */ (function () {
        function SchemaFormModule() {
        }
        SchemaFormModule.forRoot = function () {
            return {
                ngModule: SchemaFormModule,
                providers: __spread(moduleProviders)
            };
        };
        return SchemaFormModule;
    }());
    SchemaFormModule.decorators = [
        { type: core.NgModule, args: [{
                    imports: [common.CommonModule, forms.FormsModule, forms.ReactiveFormsModule],
                    declarations: [
                        FormElementComponent,
                        FormElementComponentAction,
                        FormComponent,
                        WidgetChooserComponent,
                        DefaultWidget,
                        ArrayWidget,
                        ButtonWidget,
                        ObjectWidget,
                        CheckboxWidget,
                        FileWidget,
                        IntegerWidget,
                        TextAreaWidget,
                        RadioWidget,
                        RangeWidget,
                        SelectWidget,
                        StringWidget,
                        DisableControlDirective
                    ],
                    entryComponents: [
                        FormElementComponent,
                        FormElementComponentAction,
                        FormComponent,
                        WidgetChooserComponent,
                        ArrayWidget,
                        ButtonWidget,
                        ObjectWidget,
                        CheckboxWidget,
                        FileWidget,
                        IntegerWidget,
                        TextAreaWidget,
                        RadioWidget,
                        RangeWidget,
                        SelectWidget,
                        StringWidget
                    ],
                    exports: [
                        FormComponent,
                        FormElementComponent,
                        FormElementComponentAction,
                        WidgetChooserComponent,
                        ArrayWidget,
                        ButtonWidget,
                        ObjectWidget,
                        CheckboxWidget,
                        FileWidget,
                        IntegerWidget,
                        TextAreaWidget,
                        RadioWidget,
                        RangeWidget,
                        SelectWidget,
                        StringWidget,
                        DisableControlDirective
                    ]
                },] }
    ];

    var TemplateSchemaService = /** @class */ (function () {
        function TemplateSchemaService() {
            this.changes = new core.EventEmitter();
        }
        TemplateSchemaService.prototype.changed = function () {
            this.changes.emit();
        };
        return TemplateSchemaService;
    }());
    TemplateSchemaService.decorators = [
        { type: core.Injectable }
    ];
    TemplateSchemaService.ctorParameters = function () { return []; };

    var TemplateSchemaElement = /** @class */ (function () {
        function TemplateSchemaElement() {
        }
        TemplateSchemaElement.prototype.getTextContent = function (elementRef) {
            var nodes = Array.from(elementRef.nativeElement.childNodes);
            var node = nodes.filter(function (el) {
                return el.nodeType === el.TEXT_NODE;
            }).pop();
            if (!node || !node.nodeValue) {
                return '';
            }
            return node.nodeValue.trim();
        };
        return TemplateSchemaElement;
    }());

    var ButtonComponent = /** @class */ (function (_super) {
        __extends(ButtonComponent, _super);
        function ButtonComponent(elementRef) {
            var _this = _super.call(this) || this;
            _this.elementRef = elementRef;
            _this.label = '';
            _this.click = new core.EventEmitter();
            return _this;
        }
        ButtonComponent.prototype.setLabelFromContent = function () {
            var textContent = this.getTextContent(this.elementRef);
            // label as @Input takes priority over content text
            if (textContent && !this.label) {
                this.label = textContent;
            }
        };
        ButtonComponent.prototype.ngAfterContentInit = function () {
            this.setLabelFromContent();
        };
        return ButtonComponent;
    }(TemplateSchemaElement));
    ButtonComponent.decorators = [
        { type: core.Component, args: [{
                    selector: 'sf-button',
                    template: "<ng-content></ng-content>\n",
                    providers: [
                        {
                            provide: TemplateSchemaElement,
                            useExisting: core.forwardRef(function () { return ButtonComponent; }),
                        }
                    ]
                },] }
    ];
    ButtonComponent.ctorParameters = function () { return [
        { type: core.ElementRef }
    ]; };
    ButtonComponent.propDecorators = {
        id: [{ type: core.Input }],
        label: [{ type: core.Input }],
        widget: [{ type: core.Input }],
        click: [{ type: core.Output }]
    };

    var FieldParent = /** @class */ (function (_super) {
        __extends(FieldParent, _super);
        function FieldParent() {
            var _this = _super.apply(this, __spread(arguments)) || this;
            _this.name = '';
            return _this;
        }
        Object.defineProperty(FieldParent.prototype, "path", {
            get: function () {
                if (!this.name) {
                    return '';
                }
                return '/' + this.name;
            },
            enumerable: false,
            configurable: true
        });
        FieldParent.prototype.getButtons = function () {
            var _this = this;
            return this.childButtons.map(function (button, index) {
                if (!button.id) {
                    var randomString = Math.random().toString(16).substr(2, 8);
                    // generate id for button
                    button.id = _this.name + randomString + '_' + (index + 1);
                }
                // register as button action the EventEmitter click
                _this.actionRegistry.register(button.id, button.click.emit.bind(button.click));
                var _button = {
                    id: button.id,
                    label: button.label,
                };
                if (button.widget) {
                    _button.widget = button.widget;
                }
                return _button;
            });
        };
        FieldParent.prototype.getFieldsValidators = function (fields) {
            return fields.reduce(function (validators, field) {
                return validators.concat(field.getValidators());
            }, []);
        };
        FieldParent.prototype.getFieldsSchema = function (fields) {
            var _this = this;
            return fields.reduce(function (schema, field) {
                switch (_this.type) {
                    case FieldType.Array:
                        schema.items = field.getSchema();
                        break;
                    default:
                        if (!schema.properties) {
                            schema.properties = {};
                        }
                        schema.properties[field.name] = field.getSchema();
                        break;
                }
                var buttons = field.getButtons();
                if (buttons.length > 0) {
                    schema.buttons = buttons;
                }
                if (!field.required) {
                    return schema;
                }
                if (!schema.required) {
                    schema.required = [];
                }
                schema.required.push(field.name);
                return schema;
            }, {});
        };
        return FieldParent;
    }(TemplateSchemaElement));

    var ItemComponent = /** @class */ (function (_super) {
        __extends(ItemComponent, _super);
        function ItemComponent(elementRef) {
            var _this = _super.call(this) || this;
            _this.elementRef = elementRef;
            return _this;
        }
        ItemComponent.prototype.ngOnInit = function () {
            this.description = this.getTextContent(this.elementRef);
        };
        return ItemComponent;
    }(TemplateSchemaElement));
    ItemComponent.decorators = [
        { type: core.Component, args: [{
                    selector: 'sf-item',
                    template: "<ng-content></ng-content>\n"
                },] }
    ];
    ItemComponent.ctorParameters = function () { return [
        { type: core.ElementRef }
    ]; };
    ItemComponent.propDecorators = {
        value: [{ type: core.Input }]
    };

    var FieldComponent = /** @class */ (function (_super) {
        __extends(FieldComponent, _super);
        function FieldComponent(elementRef, templateSchemaService, actionRegistry) {
            var _this = _super.call(this) || this;
            _this.elementRef = elementRef;
            _this.templateSchemaService = templateSchemaService;
            _this.actionRegistry = actionRegistry;
            _this.type = FieldType.String;
            _this.schema = {};
            return _this;
        }
        FieldComponent.prototype.getSchema = function () {
            var _this = this;
            var _a = this.getFieldsSchema(this.childFields.filter(function (field) { return field !== _this; })), properties = _a.properties, items = _a.items, required = _a.required;
            var oneOf = this.getOneOf();
            var schema = {
                type: this.type
            };
            if (this.title !== undefined) {
                schema.title = this.title;
            }
            if (properties !== undefined) {
                schema.properties = properties;
            }
            if (items !== undefined) {
                schema.items = items;
            }
            // requried child fields
            if (required !== undefined) {
                schema.required = required;
            }
            if (oneOf !== undefined) {
                schema.oneOf = oneOf;
            }
            if (this.description !== undefined) {
                schema.description = this.description;
            }
            if (this.placeholder !== undefined) {
                schema.placeholder = this.placeholder;
            }
            if (this.format !== undefined) {
                schema.format = this.format;
            }
            if (this.widget !== undefined) {
                schema.widget = this.widget;
            }
            if (this.readOnly !== undefined) {
                schema.readOnly = this.readOnly;
            }
            var buttons = this.getButtons();
            if (buttons.length > 0) {
                schema.buttons = buttons;
            }
            // @Input schema takes precedence
            return Object.assign(schema, this.schema);
        };
        FieldComponent.prototype.getValidators = function () {
            var _this = this;
            // registering validator here is not possible since prop full path is needed
            var childValidators = this.getFieldsValidators(this.childFields.filter(function (field) { return field !== _this; }));
            var validators = childValidators.map(function (_a) {
                var path = _a.path, validator = _a.validator;
                return {
                    path: _this.path + path,
                    validator: validator
                };
            });
            if (!this.validator) {
                return validators;
            }
            validators.push({ path: this.path, validator: this.validator });
            return validators;
        };
        FieldComponent.prototype.ngOnChanges = function (changes) {
            var e_1, _a;
            var keys = Object.keys(changes);
            if (keys.length > 0) {
                try {
                    for (var keys_1 = __values(keys), keys_1_1 = keys_1.next(); !keys_1_1.done; keys_1_1 = keys_1.next()) {
                        var key = keys_1_1.value;
                        if (!changes[key].isFirstChange()) {
                            // on any input change, force schema change generation
                            this.templateSchemaService.changed();
                            break;
                        }
                    }
                }
                catch (e_1_1) { e_1 = { error: e_1_1 }; }
                finally {
                    try {
                        if (keys_1_1 && !keys_1_1.done && (_a = keys_1.return)) _a.call(keys_1);
                    }
                    finally { if (e_1) throw e_1.error; }
                }
            }
        };
        FieldComponent.prototype.getOneOf = function () {
            if (this.childItems.length === 0) {
                return;
            }
            var items = this.childItems.map(function (_a) {
                var value = _a.value, description = _a.description;
                if (!Array.isArray(value)) {
                    return { enum: [value], description: description };
                }
                return { enum: value, description: description };
            });
            if (items.length === 0) {
                return;
            }
            return items;
        };
        FieldComponent.prototype.setTitleFromContent = function () {
            var textContent = this.getTextContent(this.elementRef);
            //  title as @Input takes priority over content text
            if (textContent && !this.title) {
                this.title = textContent;
            }
        };
        FieldComponent.prototype.ngAfterContentInit = function () {
            var _this = this;
            // cache it
            this.setTitleFromContent();
            rxjs.merge(this.childFields.changes, this.childItems.changes, this.childButtons.changes)
                .subscribe(function () { return _this.templateSchemaService.changed(); });
        };
        return FieldComponent;
    }(FieldParent));
    FieldComponent.decorators = [
        { type: core.Component, args: [{
                    selector: 'sf-field',
                    template: "<ng-content ></ng-content>\n"
                },] }
    ];
    FieldComponent.ctorParameters = function () { return [
        { type: core.ElementRef },
        { type: TemplateSchemaService },
        { type: ActionRegistry }
    ]; };
    FieldComponent.propDecorators = {
        childFields: [{ type: core.ContentChildren, args: [FieldComponent,] }],
        childItems: [{ type: core.ContentChildren, args: [ItemComponent,] }],
        childButtons: [{ type: core.ContentChildren, args: [ButtonComponent,] }],
        name: [{ type: core.Input }],
        type: [{ type: core.Input }],
        format: [{ type: core.Input }],
        required: [{ type: core.Input }],
        readOnly: [{ type: core.Input }],
        title: [{ type: core.Input }],
        description: [{ type: core.Input }],
        placeholder: [{ type: core.Input }],
        widget: [{ type: core.Input }],
        validator: [{ type: core.Input }],
        schema: [{ type: core.Input }]
    };

    var TemplateSchemaDirective = /** @class */ (function (_super) {
        __extends(TemplateSchemaDirective, _super);
        function TemplateSchemaDirective(actionRegistry, validatorRegistry, formComponent, terminatorService, templateSchemaService) {
            var _this = _super.call(this) || this;
            _this.actionRegistry = actionRegistry;
            _this.validatorRegistry = validatorRegistry;
            _this.formComponent = formComponent;
            _this.terminatorService = terminatorService;
            _this.templateSchemaService = templateSchemaService;
            return _this;
        }
        TemplateSchemaDirective.prototype.setFormDocumentSchema = function (fields) {
            var _this = this;
            this.actionRegistry.clear();
            this.validatorRegistry.clear();
            var schema = this.getFieldsSchema(fields);
            var validators = this.getFieldsValidators(fields);
            validators.forEach(function (_a) {
                var path = _a.path, validator = _a.validator;
                _this.validatorRegistry.register(path, validator);
            });
            var previousSchema = this.formComponent.schema;
            this.formComponent.schema = {
                type: FieldType.Object,
                properties: schema.properties
            };
            if (schema.required && schema.required.length > 0) {
                this.formComponent.schema.requred = schema.required;
            }
            var buttons = this.getButtons();
            if (buttons.length > 0) {
                this.formComponent.schema.buttons = buttons;
            }
            this.formComponent.ngOnChanges({
                schema: new core.SimpleChange(previousSchema, this.formComponent.schema, Boolean(previousSchema))
            });
        };
        TemplateSchemaDirective.prototype.ngAfterContentInit = function () {
            var _this = this;
            if (this.childFields.length > 0) {
                this.setFormDocumentSchema(this.childFields.toArray());
            }
            rxjs.merge(this.childFields.changes, this.templateSchemaService.changes)
                .subscribe(function () {
                _this.terminatorService.destroy();
                _this.setFormDocumentSchema(_this.childFields.toArray());
            });
        };
        return TemplateSchemaDirective;
    }(FieldParent));
    TemplateSchemaDirective.decorators = [
        { type: core.Directive, args: [{
                    selector: 'sf-form[templateSchema]',
                    providers: [
                        TemplateSchemaService
                    ]
                },] }
    ];
    TemplateSchemaDirective.ctorParameters = function () { return [
        { type: ActionRegistry },
        { type: ValidatorRegistry },
        { type: FormComponent },
        { type: TerminatorService },
        { type: TemplateSchemaService }
    ]; };
    TemplateSchemaDirective.propDecorators = {
        childFields: [{ type: core.ContentChildren, args: [FieldComponent,] }],
        childButtons: [{ type: core.ContentChildren, args: [ButtonComponent,] }]
    };

    var TemplateSchemaModule = /** @class */ (function () {
        function TemplateSchemaModule() {
        }
        return TemplateSchemaModule;
    }());
    TemplateSchemaModule.decorators = [
        { type: core.NgModule, args: [{
                    imports: [
                        common.CommonModule
                    ],
                    declarations: [
                        TemplateSchemaDirective,
                        FieldComponent,
                        ButtonComponent,
                        ItemComponent
                    ],
                    exports: [
                        TemplateSchemaDirective,
                        FieldComponent,
                        ButtonComponent,
                        ItemComponent
                    ]
                },] }
    ];

    /*
     * Public API Surface of schema-form
     */

    /**
     * Generated bundle index. Do not edit.
     */

    exports.ActionRegistry = ActionRegistry;
    exports.ArrayLayoutWidget = ArrayLayoutWidget;
    exports.ArrayProperty = ArrayProperty;
    exports.ArrayWidget = ArrayWidget;
    exports.AtomicProperty = AtomicProperty;
    exports.BindingRegistry = BindingRegistry;
    exports.BooleanProperty = BooleanProperty;
    exports.ButtonWidget = ButtonWidget;
    exports.CheckboxWidget = CheckboxWidget;
    exports.ControlWidget = ControlWidget;
    exports.DefaultWidgetRegistry = DefaultWidgetRegistry;
    exports.DisableControlDirective = DisableControlDirective;
    exports.ExpressionCompilerFactory = ExpressionCompilerFactory;
    exports.FileWidget = FileWidget;
    exports.FormComponent = FormComponent;
    exports.FormElementComponent = FormElementComponent;
    exports.FormElementComponentAction = FormElementComponentAction;
    exports.FormProperty = FormProperty;
    exports.FormPropertyFactory = FormPropertyFactory;
    exports.IntegerWidget = IntegerWidget;
    exports.JEXLExpressionCompiler = JEXLExpressionCompiler;
    exports.JEXLExpressionCompilerFactory = JEXLExpressionCompilerFactory;
    exports.JEXLExpressionCompilerVisibiltyIf = JEXLExpressionCompilerVisibiltyIf;
    exports.LOG_LEVEL = LOG_LEVEL;
    exports.LogService = LogService;
    exports.NumberProperty = NumberProperty;
    exports.ObjectLayoutWidget = ObjectLayoutWidget;
    exports.ObjectProperty = ObjectProperty;
    exports.ObjectWidget = ObjectWidget;
    exports.PropertyGroup = PropertyGroup;
    exports.RadioWidget = RadioWidget;
    exports.RangeWidget = RangeWidget;
    exports.SchemaFormModule = SchemaFormModule;
    exports.SchemaPreprocessor = SchemaPreprocessor;
    exports.SchemaValidatorFactory = SchemaValidatorFactory;
    exports.SelectWidget = SelectWidget;
    exports.StringProperty = StringProperty;
    exports.StringWidget = StringWidget;
    exports.TemplateSchemaModule = TemplateSchemaModule;
    exports.TerminatorService = TerminatorService;
    exports.TextAreaWidget = TextAreaWidget;
    exports.ValidatorRegistry = ValidatorRegistry;
    exports.Widget = Widget;
    exports.WidgetChooserComponent = WidgetChooserComponent;
    exports.WidgetFactory = WidgetFactory;
    exports.WidgetRegistry = WidgetRegistry;
    exports.ZSchemaValidatorFactory = ZSchemaValidatorFactory;
    exports.ɵa = useFactory;
    exports.ɵb = DefaultLogService;
    exports.ɵc = PropertyBindingRegistry;
    exports.ɵd = ActionRegistry;
    exports.ɵe = BindingRegistry;
    exports.ɵf = DefaultWidget;
    exports.ɵg = TemplateSchemaDirective;
    exports.ɵh = FieldParent;
    exports.ɵi = TemplateSchemaElement;
    exports.ɵj = TemplateSchemaService;
    exports.ɵk = FieldComponent;
    exports.ɵl = ItemComponent;
    exports.ɵm = ButtonComponent;
    exports.ɵn = ValidatorRegistry;

    Object.defineProperty(exports, '__esModule', { value: true });

})));
//# sourceMappingURL=ngx-schema-form.umd.js.map
