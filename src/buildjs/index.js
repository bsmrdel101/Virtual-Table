var __create = Object.create;
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getProtoOf = Object.getPrototypeOf;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __commonJS = (cb, mod) => function __require() {
  return mod || (0, cb[__getOwnPropNames(cb)[0]])((mod = { exports: {} }).exports, mod), mod.exports;
};
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toESM = (mod, isNodeMode, target) => (target = mod != null ? __create(__getProtoOf(mod)) : {}, __copyProps(
  isNodeMode || !mod || !mod.__esModule ? __defProp(target, "default", { value: mod, enumerable: true }) : target,
  mod
));
var __async = (__this, __arguments, generator) => {
  return new Promise((resolve, reject) => {
    var fulfilled = (value2) => {
      try {
        step(generator.next(value2));
      } catch (e) {
        reject(e);
      }
    };
    var rejected = (value2) => {
      try {
        step(generator.throw(value2));
      } catch (e) {
        reject(e);
      }
    };
    var step = (x2) => x2.done ? resolve(x2.value) : Promise.resolve(x2.value).then(fulfilled, rejected);
    step((generator = generator.apply(__this, __arguments)).next());
  });
};

// node_modules/axios/lib/helpers/bind.js
var require_bind = __commonJS({
  "node_modules/axios/lib/helpers/bind.js"(exports, module) {
    "use strict";
    module.exports = function bind(fn, thisArg) {
      return function wrap() {
        var args = new Array(arguments.length);
        for (var i2 = 0; i2 < args.length; i2++) {
          args[i2] = arguments[i2];
        }
        return fn.apply(thisArg, args);
      };
    };
  }
});

// node_modules/axios/lib/utils.js
var require_utils = __commonJS({
  "node_modules/axios/lib/utils.js"(exports, module) {
    "use strict";
    var bind = require_bind();
    var toString2 = Object.prototype.toString;
    var kindOf = function(cache2) {
      return function(thing) {
        var str = toString2.call(thing);
        return cache2[str] || (cache2[str] = str.slice(8, -1).toLowerCase());
      };
    }(/* @__PURE__ */ Object.create(null));
    function kindOfTest(type) {
      type = type.toLowerCase();
      return function isKindOf(thing) {
        return kindOf(thing) === type;
      };
    }
    function isArray(val) {
      return Array.isArray(val);
    }
    function isUndefined(val) {
      return typeof val === "undefined";
    }
    function isBuffer(val) {
      return val !== null && !isUndefined(val) && val.constructor !== null && !isUndefined(val.constructor) && typeof val.constructor.isBuffer === "function" && val.constructor.isBuffer(val);
    }
    var isArrayBuffer = kindOfTest("ArrayBuffer");
    function isArrayBufferView(val) {
      var result;
      if (typeof ArrayBuffer !== "undefined" && ArrayBuffer.isView) {
        result = ArrayBuffer.isView(val);
      } else {
        result = val && val.buffer && isArrayBuffer(val.buffer);
      }
      return result;
    }
    function isString(val) {
      return typeof val === "string";
    }
    function isNumber(val) {
      return typeof val === "number";
    }
    function isObject(val) {
      return val !== null && typeof val === "object";
    }
    function isPlainObject(val) {
      if (kindOf(val) !== "object") {
        return false;
      }
      var prototype = Object.getPrototypeOf(val);
      return prototype === null || prototype === Object.prototype;
    }
    var isDate = kindOfTest("Date");
    var isFile = kindOfTest("File");
    var isBlob = kindOfTest("Blob");
    var isFileList = kindOfTest("FileList");
    function isFunction(val) {
      return toString2.call(val) === "[object Function]";
    }
    function isStream(val) {
      return isObject(val) && isFunction(val.pipe);
    }
    function isFormData(thing) {
      var pattern = "[object FormData]";
      return thing && (typeof FormData === "function" && thing instanceof FormData || toString2.call(thing) === pattern || isFunction(thing.toString) && thing.toString() === pattern);
    }
    var isURLSearchParams = kindOfTest("URLSearchParams");
    function trim(str) {
      return str.trim ? str.trim() : str.replace(/^\s+|\s+$/g, "");
    }
    function isStandardBrowserEnv() {
      if (typeof navigator !== "undefined" && (navigator.product === "ReactNative" || navigator.product === "NativeScript" || navigator.product === "NS")) {
        return false;
      }
      return typeof window !== "undefined" && typeof document !== "undefined";
    }
    function forEach(obj, fn) {
      if (obj === null || typeof obj === "undefined") {
        return;
      }
      if (typeof obj !== "object") {
        obj = [obj];
      }
      if (isArray(obj)) {
        for (var i2 = 0, l = obj.length; i2 < l; i2++) {
          fn.call(null, obj[i2], i2, obj);
        }
      } else {
        for (var key in obj) {
          if (Object.prototype.hasOwnProperty.call(obj, key)) {
            fn.call(null, obj[key], key, obj);
          }
        }
      }
    }
    function merge() {
      var result = {};
      function assignValue(val, key) {
        if (isPlainObject(result[key]) && isPlainObject(val)) {
          result[key] = merge(result[key], val);
        } else if (isPlainObject(val)) {
          result[key] = merge({}, val);
        } else if (isArray(val)) {
          result[key] = val.slice();
        } else {
          result[key] = val;
        }
      }
      for (var i2 = 0, l = arguments.length; i2 < l; i2++) {
        forEach(arguments[i2], assignValue);
      }
      return result;
    }
    function extend(a, b, thisArg) {
      forEach(b, function assignValue(val, key) {
        if (thisArg && typeof val === "function") {
          a[key] = bind(val, thisArg);
        } else {
          a[key] = val;
        }
      });
      return a;
    }
    function stripBOM(content) {
      if (content.charCodeAt(0) === 65279) {
        content = content.slice(1);
      }
      return content;
    }
    function inherits(constructor, superConstructor, props, descriptors) {
      constructor.prototype = Object.create(superConstructor.prototype, descriptors);
      constructor.prototype.constructor = constructor;
      props && Object.assign(constructor.prototype, props);
    }
    function toFlatObject(sourceObj, destObj, filter) {
      var props;
      var i2;
      var prop;
      var merged = {};
      destObj = destObj || {};
      do {
        props = Object.getOwnPropertyNames(sourceObj);
        i2 = props.length;
        while (i2-- > 0) {
          prop = props[i2];
          if (!merged[prop]) {
            destObj[prop] = sourceObj[prop];
            merged[prop] = true;
          }
        }
        sourceObj = Object.getPrototypeOf(sourceObj);
      } while (sourceObj && (!filter || filter(sourceObj, destObj)) && sourceObj !== Object.prototype);
      return destObj;
    }
    function endsWith(str, searchString, position) {
      str = String(str);
      if (position === void 0 || position > str.length) {
        position = str.length;
      }
      position -= searchString.length;
      var lastIndex = str.indexOf(searchString, position);
      return lastIndex !== -1 && lastIndex === position;
    }
    function toArray(thing) {
      if (!thing)
        return null;
      var i2 = thing.length;
      if (isUndefined(i2))
        return null;
      var arr = new Array(i2);
      while (i2-- > 0) {
        arr[i2] = thing[i2];
      }
      return arr;
    }
    var isTypedArray = function(TypedArray) {
      return function(thing) {
        return TypedArray && thing instanceof TypedArray;
      };
    }(typeof Uint8Array !== "undefined" && Object.getPrototypeOf(Uint8Array));
    module.exports = {
      isArray,
      isArrayBuffer,
      isBuffer,
      isFormData,
      isArrayBufferView,
      isString,
      isNumber,
      isObject,
      isPlainObject,
      isUndefined,
      isDate,
      isFile,
      isBlob,
      isFunction,
      isStream,
      isURLSearchParams,
      isStandardBrowserEnv,
      forEach,
      merge,
      extend,
      trim,
      stripBOM,
      inherits,
      toFlatObject,
      kindOf,
      kindOfTest,
      endsWith,
      toArray,
      isTypedArray,
      isFileList
    };
  }
});

// node_modules/axios/lib/helpers/buildURL.js
var require_buildURL = __commonJS({
  "node_modules/axios/lib/helpers/buildURL.js"(exports, module) {
    "use strict";
    var utils = require_utils();
    function encode3(val) {
      return encodeURIComponent(val).replace(/%3A/gi, ":").replace(/%24/g, "$").replace(/%2C/gi, ",").replace(/%20/g, "+").replace(/%5B/gi, "[").replace(/%5D/gi, "]");
    }
    module.exports = function buildURL(url2, params, paramsSerializer) {
      if (!params) {
        return url2;
      }
      var serializedParams;
      if (paramsSerializer) {
        serializedParams = paramsSerializer(params);
      } else if (utils.isURLSearchParams(params)) {
        serializedParams = params.toString();
      } else {
        var parts2 = [];
        utils.forEach(params, function serialize(val, key) {
          if (val === null || typeof val === "undefined") {
            return;
          }
          if (utils.isArray(val)) {
            key = key + "[]";
          } else {
            val = [val];
          }
          utils.forEach(val, function parseValue(v) {
            if (utils.isDate(v)) {
              v = v.toISOString();
            } else if (utils.isObject(v)) {
              v = JSON.stringify(v);
            }
            parts2.push(encode3(key) + "=" + encode3(v));
          });
        });
        serializedParams = parts2.join("&");
      }
      if (serializedParams) {
        var hashmarkIndex = url2.indexOf("#");
        if (hashmarkIndex !== -1) {
          url2 = url2.slice(0, hashmarkIndex);
        }
        url2 += (url2.indexOf("?") === -1 ? "?" : "&") + serializedParams;
      }
      return url2;
    };
  }
});

// node_modules/axios/lib/core/InterceptorManager.js
var require_InterceptorManager = __commonJS({
  "node_modules/axios/lib/core/InterceptorManager.js"(exports, module) {
    "use strict";
    var utils = require_utils();
    function InterceptorManager() {
      this.handlers = [];
    }
    InterceptorManager.prototype.use = function use(fulfilled, rejected, options) {
      this.handlers.push({
        fulfilled,
        rejected,
        synchronous: options ? options.synchronous : false,
        runWhen: options ? options.runWhen : null
      });
      return this.handlers.length - 1;
    };
    InterceptorManager.prototype.eject = function eject(id) {
      if (this.handlers[id]) {
        this.handlers[id] = null;
      }
    };
    InterceptorManager.prototype.forEach = function forEach(fn) {
      utils.forEach(this.handlers, function forEachHandler(h) {
        if (h !== null) {
          fn(h);
        }
      });
    };
    module.exports = InterceptorManager;
  }
});

// node_modules/axios/lib/helpers/normalizeHeaderName.js
var require_normalizeHeaderName = __commonJS({
  "node_modules/axios/lib/helpers/normalizeHeaderName.js"(exports, module) {
    "use strict";
    var utils = require_utils();
    module.exports = function normalizeHeaderName(headers, normalizedName) {
      utils.forEach(headers, function processHeader(value2, name) {
        if (name !== normalizedName && name.toUpperCase() === normalizedName.toUpperCase()) {
          headers[normalizedName] = value2;
          delete headers[name];
        }
      });
    };
  }
});

// node_modules/axios/lib/core/AxiosError.js
var require_AxiosError = __commonJS({
  "node_modules/axios/lib/core/AxiosError.js"(exports, module) {
    "use strict";
    var utils = require_utils();
    function AxiosError(message, code, config, request, response) {
      Error.call(this);
      this.message = message;
      this.name = "AxiosError";
      code && (this.code = code);
      config && (this.config = config);
      request && (this.request = request);
      response && (this.response = response);
    }
    utils.inherits(AxiosError, Error, {
      toJSON: function toJSON() {
        return {
          message: this.message,
          name: this.name,
          description: this.description,
          number: this.number,
          fileName: this.fileName,
          lineNumber: this.lineNumber,
          columnNumber: this.columnNumber,
          stack: this.stack,
          config: this.config,
          code: this.code,
          status: this.response && this.response.status ? this.response.status : null
        };
      }
    });
    var prototype = AxiosError.prototype;
    var descriptors = {};
    [
      "ERR_BAD_OPTION_VALUE",
      "ERR_BAD_OPTION",
      "ECONNABORTED",
      "ETIMEDOUT",
      "ERR_NETWORK",
      "ERR_FR_TOO_MANY_REDIRECTS",
      "ERR_DEPRECATED",
      "ERR_BAD_RESPONSE",
      "ERR_BAD_REQUEST",
      "ERR_CANCELED"
    ].forEach(function(code) {
      descriptors[code] = { value: code };
    });
    Object.defineProperties(AxiosError, descriptors);
    Object.defineProperty(prototype, "isAxiosError", { value: true });
    AxiosError.from = function(error, code, config, request, response, customProps) {
      var axiosError = Object.create(prototype);
      utils.toFlatObject(error, axiosError, function filter(obj) {
        return obj !== Error.prototype;
      });
      AxiosError.call(axiosError, error.message, code, config, request, response);
      axiosError.name = error.name;
      customProps && Object.assign(axiosError, customProps);
      return axiosError;
    };
    module.exports = AxiosError;
  }
});

// node_modules/axios/lib/defaults/transitional.js
var require_transitional = __commonJS({
  "node_modules/axios/lib/defaults/transitional.js"(exports, module) {
    "use strict";
    module.exports = {
      silentJSONParsing: true,
      forcedJSONParsing: true,
      clarifyTimeoutError: false
    };
  }
});

// node_modules/axios/lib/helpers/toFormData.js
var require_toFormData = __commonJS({
  "node_modules/axios/lib/helpers/toFormData.js"(exports, module) {
    "use strict";
    var utils = require_utils();
    function toFormData(obj, formData) {
      formData = formData || new FormData();
      var stack = [];
      function convertValue(value2) {
        if (value2 === null)
          return "";
        if (utils.isDate(value2)) {
          return value2.toISOString();
        }
        if (utils.isArrayBuffer(value2) || utils.isTypedArray(value2)) {
          return typeof Blob === "function" ? new Blob([value2]) : Buffer.from(value2);
        }
        return value2;
      }
      function build(data, parentKey) {
        if (utils.isPlainObject(data) || utils.isArray(data)) {
          if (stack.indexOf(data) !== -1) {
            throw Error("Circular reference detected in " + parentKey);
          }
          stack.push(data);
          utils.forEach(data, function each(value2, key) {
            if (utils.isUndefined(value2))
              return;
            var fullKey = parentKey ? parentKey + "." + key : key;
            var arr;
            if (value2 && !parentKey && typeof value2 === "object") {
              if (utils.endsWith(key, "{}")) {
                value2 = JSON.stringify(value2);
              } else if (utils.endsWith(key, "[]") && (arr = utils.toArray(value2))) {
                arr.forEach(function(el) {
                  !utils.isUndefined(el) && formData.append(fullKey, convertValue(el));
                });
                return;
              }
            }
            build(value2, fullKey);
          });
          stack.pop();
        } else {
          formData.append(parentKey, convertValue(data));
        }
      }
      build(obj);
      return formData;
    }
    module.exports = toFormData;
  }
});

// node_modules/axios/lib/core/settle.js
var require_settle = __commonJS({
  "node_modules/axios/lib/core/settle.js"(exports, module) {
    "use strict";
    var AxiosError = require_AxiosError();
    module.exports = function settle(resolve, reject, response) {
      var validateStatus = response.config.validateStatus;
      if (!response.status || !validateStatus || validateStatus(response.status)) {
        resolve(response);
      } else {
        reject(new AxiosError(
          "Request failed with status code " + response.status,
          [AxiosError.ERR_BAD_REQUEST, AxiosError.ERR_BAD_RESPONSE][Math.floor(response.status / 100) - 4],
          response.config,
          response.request,
          response
        ));
      }
    };
  }
});

// node_modules/axios/lib/helpers/cookies.js
var require_cookies = __commonJS({
  "node_modules/axios/lib/helpers/cookies.js"(exports, module) {
    "use strict";
    var utils = require_utils();
    module.exports = utils.isStandardBrowserEnv() ? function standardBrowserEnv() {
      return {
        write: function write(name, value2, expires, path, domain, secure) {
          var cookie = [];
          cookie.push(name + "=" + encodeURIComponent(value2));
          if (utils.isNumber(expires)) {
            cookie.push("expires=" + new Date(expires).toGMTString());
          }
          if (utils.isString(path)) {
            cookie.push("path=" + path);
          }
          if (utils.isString(domain)) {
            cookie.push("domain=" + domain);
          }
          if (secure === true) {
            cookie.push("secure");
          }
          document.cookie = cookie.join("; ");
        },
        read: function read(name) {
          var match = document.cookie.match(new RegExp("(^|;\\s*)(" + name + ")=([^;]*)"));
          return match ? decodeURIComponent(match[3]) : null;
        },
        remove: function remove(name) {
          this.write(name, "", Date.now() - 864e5);
        }
      };
    }() : function nonStandardBrowserEnv() {
      return {
        write: function write() {
        },
        read: function read() {
          return null;
        },
        remove: function remove() {
        }
      };
    }();
  }
});

// node_modules/axios/lib/helpers/isAbsoluteURL.js
var require_isAbsoluteURL = __commonJS({
  "node_modules/axios/lib/helpers/isAbsoluteURL.js"(exports, module) {
    "use strict";
    module.exports = function isAbsoluteURL(url2) {
      return /^([a-z][a-z\d+\-.]*:)?\/\//i.test(url2);
    };
  }
});

// node_modules/axios/lib/helpers/combineURLs.js
var require_combineURLs = __commonJS({
  "node_modules/axios/lib/helpers/combineURLs.js"(exports, module) {
    "use strict";
    module.exports = function combineURLs(baseURL, relativeURL) {
      return relativeURL ? baseURL.replace(/\/+$/, "") + "/" + relativeURL.replace(/^\/+/, "") : baseURL;
    };
  }
});

// node_modules/axios/lib/core/buildFullPath.js
var require_buildFullPath = __commonJS({
  "node_modules/axios/lib/core/buildFullPath.js"(exports, module) {
    "use strict";
    var isAbsoluteURL = require_isAbsoluteURL();
    var combineURLs = require_combineURLs();
    module.exports = function buildFullPath(baseURL, requestedURL) {
      if (baseURL && !isAbsoluteURL(requestedURL)) {
        return combineURLs(baseURL, requestedURL);
      }
      return requestedURL;
    };
  }
});

// node_modules/axios/lib/helpers/parseHeaders.js
var require_parseHeaders = __commonJS({
  "node_modules/axios/lib/helpers/parseHeaders.js"(exports, module) {
    "use strict";
    var utils = require_utils();
    var ignoreDuplicateOf = [
      "age",
      "authorization",
      "content-length",
      "content-type",
      "etag",
      "expires",
      "from",
      "host",
      "if-modified-since",
      "if-unmodified-since",
      "last-modified",
      "location",
      "max-forwards",
      "proxy-authorization",
      "referer",
      "retry-after",
      "user-agent"
    ];
    module.exports = function parseHeaders(headers) {
      var parsed = {};
      var key;
      var val;
      var i2;
      if (!headers) {
        return parsed;
      }
      utils.forEach(headers.split("\n"), function parser(line) {
        i2 = line.indexOf(":");
        key = utils.trim(line.substr(0, i2)).toLowerCase();
        val = utils.trim(line.substr(i2 + 1));
        if (key) {
          if (parsed[key] && ignoreDuplicateOf.indexOf(key) >= 0) {
            return;
          }
          if (key === "set-cookie") {
            parsed[key] = (parsed[key] ? parsed[key] : []).concat([val]);
          } else {
            parsed[key] = parsed[key] ? parsed[key] + ", " + val : val;
          }
        }
      });
      return parsed;
    };
  }
});

// node_modules/axios/lib/helpers/isURLSameOrigin.js
var require_isURLSameOrigin = __commonJS({
  "node_modules/axios/lib/helpers/isURLSameOrigin.js"(exports, module) {
    "use strict";
    var utils = require_utils();
    module.exports = utils.isStandardBrowserEnv() ? function standardBrowserEnv() {
      var msie = /(msie|trident)/i.test(navigator.userAgent);
      var urlParsingNode = document.createElement("a");
      var originURL;
      function resolveURL(url2) {
        var href = url2;
        if (msie) {
          urlParsingNode.setAttribute("href", href);
          href = urlParsingNode.href;
        }
        urlParsingNode.setAttribute("href", href);
        return {
          href: urlParsingNode.href,
          protocol: urlParsingNode.protocol ? urlParsingNode.protocol.replace(/:$/, "") : "",
          host: urlParsingNode.host,
          search: urlParsingNode.search ? urlParsingNode.search.replace(/^\?/, "") : "",
          hash: urlParsingNode.hash ? urlParsingNode.hash.replace(/^#/, "") : "",
          hostname: urlParsingNode.hostname,
          port: urlParsingNode.port,
          pathname: urlParsingNode.pathname.charAt(0) === "/" ? urlParsingNode.pathname : "/" + urlParsingNode.pathname
        };
      }
      originURL = resolveURL(window.location.href);
      return function isURLSameOrigin(requestURL) {
        var parsed = utils.isString(requestURL) ? resolveURL(requestURL) : requestURL;
        return parsed.protocol === originURL.protocol && parsed.host === originURL.host;
      };
    }() : function nonStandardBrowserEnv() {
      return function isURLSameOrigin() {
        return true;
      };
    }();
  }
});

// node_modules/axios/lib/cancel/CanceledError.js
var require_CanceledError = __commonJS({
  "node_modules/axios/lib/cancel/CanceledError.js"(exports, module) {
    "use strict";
    var AxiosError = require_AxiosError();
    var utils = require_utils();
    function CanceledError(message) {
      AxiosError.call(this, message == null ? "canceled" : message, AxiosError.ERR_CANCELED);
      this.name = "CanceledError";
    }
    utils.inherits(CanceledError, AxiosError, {
      __CANCEL__: true
    });
    module.exports = CanceledError;
  }
});

// node_modules/axios/lib/helpers/parseProtocol.js
var require_parseProtocol = __commonJS({
  "node_modules/axios/lib/helpers/parseProtocol.js"(exports, module) {
    "use strict";
    module.exports = function parseProtocol(url2) {
      var match = /^([-+\w]{1,25})(:?\/\/|:)/.exec(url2);
      return match && match[1] || "";
    };
  }
});

// node_modules/axios/lib/adapters/xhr.js
var require_xhr = __commonJS({
  "node_modules/axios/lib/adapters/xhr.js"(exports, module) {
    "use strict";
    var utils = require_utils();
    var settle = require_settle();
    var cookies = require_cookies();
    var buildURL = require_buildURL();
    var buildFullPath = require_buildFullPath();
    var parseHeaders = require_parseHeaders();
    var isURLSameOrigin = require_isURLSameOrigin();
    var transitionalDefaults = require_transitional();
    var AxiosError = require_AxiosError();
    var CanceledError = require_CanceledError();
    var parseProtocol = require_parseProtocol();
    module.exports = function xhrAdapter(config) {
      return new Promise(function dispatchXhrRequest(resolve, reject) {
        var requestData = config.data;
        var requestHeaders = config.headers;
        var responseType = config.responseType;
        var onCanceled;
        function done() {
          if (config.cancelToken) {
            config.cancelToken.unsubscribe(onCanceled);
          }
          if (config.signal) {
            config.signal.removeEventListener("abort", onCanceled);
          }
        }
        if (utils.isFormData(requestData) && utils.isStandardBrowserEnv()) {
          delete requestHeaders["Content-Type"];
        }
        var request = new XMLHttpRequest();
        if (config.auth) {
          var username = config.auth.username || "";
          var password = config.auth.password ? unescape(encodeURIComponent(config.auth.password)) : "";
          requestHeaders.Authorization = "Basic " + btoa(username + ":" + password);
        }
        var fullPath = buildFullPath(config.baseURL, config.url);
        request.open(config.method.toUpperCase(), buildURL(fullPath, config.params, config.paramsSerializer), true);
        request.timeout = config.timeout;
        function onloadend() {
          if (!request) {
            return;
          }
          var responseHeaders = "getAllResponseHeaders" in request ? parseHeaders(request.getAllResponseHeaders()) : null;
          var responseData = !responseType || responseType === "text" || responseType === "json" ? request.responseText : request.response;
          var response = {
            data: responseData,
            status: request.status,
            statusText: request.statusText,
            headers: responseHeaders,
            config,
            request
          };
          settle(function _resolve(value2) {
            resolve(value2);
            done();
          }, function _reject(err) {
            reject(err);
            done();
          }, response);
          request = null;
        }
        if ("onloadend" in request) {
          request.onloadend = onloadend;
        } else {
          request.onreadystatechange = function handleLoad() {
            if (!request || request.readyState !== 4) {
              return;
            }
            if (request.status === 0 && !(request.responseURL && request.responseURL.indexOf("file:") === 0)) {
              return;
            }
            setTimeout(onloadend);
          };
        }
        request.onabort = function handleAbort() {
          if (!request) {
            return;
          }
          reject(new AxiosError("Request aborted", AxiosError.ECONNABORTED, config, request));
          request = null;
        };
        request.onerror = function handleError() {
          reject(new AxiosError("Network Error", AxiosError.ERR_NETWORK, config, request, request));
          request = null;
        };
        request.ontimeout = function handleTimeout() {
          var timeoutErrorMessage = config.timeout ? "timeout of " + config.timeout + "ms exceeded" : "timeout exceeded";
          var transitional = config.transitional || transitionalDefaults;
          if (config.timeoutErrorMessage) {
            timeoutErrorMessage = config.timeoutErrorMessage;
          }
          reject(new AxiosError(
            timeoutErrorMessage,
            transitional.clarifyTimeoutError ? AxiosError.ETIMEDOUT : AxiosError.ECONNABORTED,
            config,
            request
          ));
          request = null;
        };
        if (utils.isStandardBrowserEnv()) {
          var xsrfValue = (config.withCredentials || isURLSameOrigin(fullPath)) && config.xsrfCookieName ? cookies.read(config.xsrfCookieName) : void 0;
          if (xsrfValue) {
            requestHeaders[config.xsrfHeaderName] = xsrfValue;
          }
        }
        if ("setRequestHeader" in request) {
          utils.forEach(requestHeaders, function setRequestHeader(val, key) {
            if (typeof requestData === "undefined" && key.toLowerCase() === "content-type") {
              delete requestHeaders[key];
            } else {
              request.setRequestHeader(key, val);
            }
          });
        }
        if (!utils.isUndefined(config.withCredentials)) {
          request.withCredentials = !!config.withCredentials;
        }
        if (responseType && responseType !== "json") {
          request.responseType = config.responseType;
        }
        if (typeof config.onDownloadProgress === "function") {
          request.addEventListener("progress", config.onDownloadProgress);
        }
        if (typeof config.onUploadProgress === "function" && request.upload) {
          request.upload.addEventListener("progress", config.onUploadProgress);
        }
        if (config.cancelToken || config.signal) {
          onCanceled = function(cancel) {
            if (!request) {
              return;
            }
            reject(!cancel || cancel && cancel.type ? new CanceledError() : cancel);
            request.abort();
            request = null;
          };
          config.cancelToken && config.cancelToken.subscribe(onCanceled);
          if (config.signal) {
            config.signal.aborted ? onCanceled() : config.signal.addEventListener("abort", onCanceled);
          }
        }
        if (!requestData) {
          requestData = null;
        }
        var protocol4 = parseProtocol(fullPath);
        if (protocol4 && ["http", "https", "file"].indexOf(protocol4) === -1) {
          reject(new AxiosError("Unsupported protocol " + protocol4 + ":", AxiosError.ERR_BAD_REQUEST, config));
          return;
        }
        request.send(requestData);
      });
    };
  }
});

// node_modules/axios/lib/helpers/null.js
var require_null = __commonJS({
  "node_modules/axios/lib/helpers/null.js"(exports, module) {
    module.exports = null;
  }
});

// node_modules/axios/lib/defaults/index.js
var require_defaults = __commonJS({
  "node_modules/axios/lib/defaults/index.js"(exports, module) {
    "use strict";
    var utils = require_utils();
    var normalizeHeaderName = require_normalizeHeaderName();
    var AxiosError = require_AxiosError();
    var transitionalDefaults = require_transitional();
    var toFormData = require_toFormData();
    var DEFAULT_CONTENT_TYPE = {
      "Content-Type": "application/x-www-form-urlencoded"
    };
    function setContentTypeIfUnset(headers, value2) {
      if (!utils.isUndefined(headers) && utils.isUndefined(headers["Content-Type"])) {
        headers["Content-Type"] = value2;
      }
    }
    function getDefaultAdapter() {
      var adapter;
      if (typeof XMLHttpRequest !== "undefined") {
        adapter = require_xhr();
      } else if (typeof process !== "undefined" && Object.prototype.toString.call(process) === "[object process]") {
        adapter = require_xhr();
      }
      return adapter;
    }
    function stringifySafely(rawValue, parser, encoder) {
      if (utils.isString(rawValue)) {
        try {
          (parser || JSON.parse)(rawValue);
          return utils.trim(rawValue);
        } catch (e) {
          if (e.name !== "SyntaxError") {
            throw e;
          }
        }
      }
      return (encoder || JSON.stringify)(rawValue);
    }
    var defaults = {
      transitional: transitionalDefaults,
      adapter: getDefaultAdapter(),
      transformRequest: [function transformRequest(data, headers) {
        normalizeHeaderName(headers, "Accept");
        normalizeHeaderName(headers, "Content-Type");
        if (utils.isFormData(data) || utils.isArrayBuffer(data) || utils.isBuffer(data) || utils.isStream(data) || utils.isFile(data) || utils.isBlob(data)) {
          return data;
        }
        if (utils.isArrayBufferView(data)) {
          return data.buffer;
        }
        if (utils.isURLSearchParams(data)) {
          setContentTypeIfUnset(headers, "application/x-www-form-urlencoded;charset=utf-8");
          return data.toString();
        }
        var isObjectPayload = utils.isObject(data);
        var contentType = headers && headers["Content-Type"];
        var isFileList;
        if ((isFileList = utils.isFileList(data)) || isObjectPayload && contentType === "multipart/form-data") {
          var _FormData = this.env && this.env.FormData;
          return toFormData(isFileList ? { "files[]": data } : data, _FormData && new _FormData());
        } else if (isObjectPayload || contentType === "application/json") {
          setContentTypeIfUnset(headers, "application/json");
          return stringifySafely(data);
        }
        return data;
      }],
      transformResponse: [function transformResponse(data) {
        var transitional = this.transitional || defaults.transitional;
        var silentJSONParsing = transitional && transitional.silentJSONParsing;
        var forcedJSONParsing = transitional && transitional.forcedJSONParsing;
        var strictJSONParsing = !silentJSONParsing && this.responseType === "json";
        if (strictJSONParsing || forcedJSONParsing && utils.isString(data) && data.length) {
          try {
            return JSON.parse(data);
          } catch (e) {
            if (strictJSONParsing) {
              if (e.name === "SyntaxError") {
                throw AxiosError.from(e, AxiosError.ERR_BAD_RESPONSE, this, null, this.response);
              }
              throw e;
            }
          }
        }
        return data;
      }],
      timeout: 0,
      xsrfCookieName: "XSRF-TOKEN",
      xsrfHeaderName: "X-XSRF-TOKEN",
      maxContentLength: -1,
      maxBodyLength: -1,
      env: {
        FormData: require_null()
      },
      validateStatus: function validateStatus(status) {
        return status >= 200 && status < 300;
      },
      headers: {
        common: {
          "Accept": "application/json, text/plain, */*"
        }
      }
    };
    utils.forEach(["delete", "get", "head"], function forEachMethodNoData(method) {
      defaults.headers[method] = {};
    });
    utils.forEach(["post", "put", "patch"], function forEachMethodWithData(method) {
      defaults.headers[method] = utils.merge(DEFAULT_CONTENT_TYPE);
    });
    module.exports = defaults;
  }
});

// node_modules/axios/lib/core/transformData.js
var require_transformData = __commonJS({
  "node_modules/axios/lib/core/transformData.js"(exports, module) {
    "use strict";
    var utils = require_utils();
    var defaults = require_defaults();
    module.exports = function transformData(data, headers, fns) {
      var context = this || defaults;
      utils.forEach(fns, function transform(fn) {
        data = fn.call(context, data, headers);
      });
      return data;
    };
  }
});

// node_modules/axios/lib/cancel/isCancel.js
var require_isCancel = __commonJS({
  "node_modules/axios/lib/cancel/isCancel.js"(exports, module) {
    "use strict";
    module.exports = function isCancel(value2) {
      return !!(value2 && value2.__CANCEL__);
    };
  }
});

// node_modules/axios/lib/core/dispatchRequest.js
var require_dispatchRequest = __commonJS({
  "node_modules/axios/lib/core/dispatchRequest.js"(exports, module) {
    "use strict";
    var utils = require_utils();
    var transformData = require_transformData();
    var isCancel = require_isCancel();
    var defaults = require_defaults();
    var CanceledError = require_CanceledError();
    function throwIfCancellationRequested(config) {
      if (config.cancelToken) {
        config.cancelToken.throwIfRequested();
      }
      if (config.signal && config.signal.aborted) {
        throw new CanceledError();
      }
    }
    module.exports = function dispatchRequest(config) {
      throwIfCancellationRequested(config);
      config.headers = config.headers || {};
      config.data = transformData.call(
        config,
        config.data,
        config.headers,
        config.transformRequest
      );
      config.headers = utils.merge(
        config.headers.common || {},
        config.headers[config.method] || {},
        config.headers
      );
      utils.forEach(
        ["delete", "get", "head", "post", "put", "patch", "common"],
        function cleanHeaderConfig(method) {
          delete config.headers[method];
        }
      );
      var adapter = config.adapter || defaults.adapter;
      return adapter(config).then(function onAdapterResolution(response) {
        throwIfCancellationRequested(config);
        response.data = transformData.call(
          config,
          response.data,
          response.headers,
          config.transformResponse
        );
        return response;
      }, function onAdapterRejection(reason) {
        if (!isCancel(reason)) {
          throwIfCancellationRequested(config);
          if (reason && reason.response) {
            reason.response.data = transformData.call(
              config,
              reason.response.data,
              reason.response.headers,
              config.transformResponse
            );
          }
        }
        return Promise.reject(reason);
      });
    };
  }
});

// node_modules/axios/lib/core/mergeConfig.js
var require_mergeConfig = __commonJS({
  "node_modules/axios/lib/core/mergeConfig.js"(exports, module) {
    "use strict";
    var utils = require_utils();
    module.exports = function mergeConfig(config1, config2) {
      config2 = config2 || {};
      var config = {};
      function getMergedValue(target, source) {
        if (utils.isPlainObject(target) && utils.isPlainObject(source)) {
          return utils.merge(target, source);
        } else if (utils.isPlainObject(source)) {
          return utils.merge({}, source);
        } else if (utils.isArray(source)) {
          return source.slice();
        }
        return source;
      }
      function mergeDeepProperties(prop) {
        if (!utils.isUndefined(config2[prop])) {
          return getMergedValue(config1[prop], config2[prop]);
        } else if (!utils.isUndefined(config1[prop])) {
          return getMergedValue(void 0, config1[prop]);
        }
      }
      function valueFromConfig2(prop) {
        if (!utils.isUndefined(config2[prop])) {
          return getMergedValue(void 0, config2[prop]);
        }
      }
      function defaultToConfig2(prop) {
        if (!utils.isUndefined(config2[prop])) {
          return getMergedValue(void 0, config2[prop]);
        } else if (!utils.isUndefined(config1[prop])) {
          return getMergedValue(void 0, config1[prop]);
        }
      }
      function mergeDirectKeys(prop) {
        if (prop in config2) {
          return getMergedValue(config1[prop], config2[prop]);
        } else if (prop in config1) {
          return getMergedValue(void 0, config1[prop]);
        }
      }
      var mergeMap = {
        "url": valueFromConfig2,
        "method": valueFromConfig2,
        "data": valueFromConfig2,
        "baseURL": defaultToConfig2,
        "transformRequest": defaultToConfig2,
        "transformResponse": defaultToConfig2,
        "paramsSerializer": defaultToConfig2,
        "timeout": defaultToConfig2,
        "timeoutMessage": defaultToConfig2,
        "withCredentials": defaultToConfig2,
        "adapter": defaultToConfig2,
        "responseType": defaultToConfig2,
        "xsrfCookieName": defaultToConfig2,
        "xsrfHeaderName": defaultToConfig2,
        "onUploadProgress": defaultToConfig2,
        "onDownloadProgress": defaultToConfig2,
        "decompress": defaultToConfig2,
        "maxContentLength": defaultToConfig2,
        "maxBodyLength": defaultToConfig2,
        "beforeRedirect": defaultToConfig2,
        "transport": defaultToConfig2,
        "httpAgent": defaultToConfig2,
        "httpsAgent": defaultToConfig2,
        "cancelToken": defaultToConfig2,
        "socketPath": defaultToConfig2,
        "responseEncoding": defaultToConfig2,
        "validateStatus": mergeDirectKeys
      };
      utils.forEach(Object.keys(config1).concat(Object.keys(config2)), function computeConfigValue(prop) {
        var merge = mergeMap[prop] || mergeDeepProperties;
        var configValue = merge(prop);
        utils.isUndefined(configValue) && merge !== mergeDirectKeys || (config[prop] = configValue);
      });
      return config;
    };
  }
});

// node_modules/axios/lib/env/data.js
var require_data = __commonJS({
  "node_modules/axios/lib/env/data.js"(exports, module) {
    module.exports = {
      "version": "0.27.2"
    };
  }
});

// node_modules/axios/lib/helpers/validator.js
var require_validator = __commonJS({
  "node_modules/axios/lib/helpers/validator.js"(exports, module) {
    "use strict";
    var VERSION = require_data().version;
    var AxiosError = require_AxiosError();
    var validators = {};
    ["object", "boolean", "number", "function", "string", "symbol"].forEach(function(type, i2) {
      validators[type] = function validator(thing) {
        return typeof thing === type || "a" + (i2 < 1 ? "n " : " ") + type;
      };
    });
    var deprecatedWarnings = {};
    validators.transitional = function transitional(validator, version, message) {
      function formatMessage(opt, desc) {
        return "[Axios v" + VERSION + "] Transitional option '" + opt + "'" + desc + (message ? ". " + message : "");
      }
      return function(value2, opt, opts) {
        if (validator === false) {
          throw new AxiosError(
            formatMessage(opt, " has been removed" + (version ? " in " + version : "")),
            AxiosError.ERR_DEPRECATED
          );
        }
        if (version && !deprecatedWarnings[opt]) {
          deprecatedWarnings[opt] = true;
          console.warn(
            formatMessage(
              opt,
              " has been deprecated since v" + version + " and will be removed in the near future"
            )
          );
        }
        return validator ? validator(value2, opt, opts) : true;
      };
    };
    function assertOptions(options, schema, allowUnknown) {
      if (typeof options !== "object") {
        throw new AxiosError("options must be an object", AxiosError.ERR_BAD_OPTION_VALUE);
      }
      var keys = Object.keys(options);
      var i2 = keys.length;
      while (i2-- > 0) {
        var opt = keys[i2];
        var validator = schema[opt];
        if (validator) {
          var value2 = options[opt];
          var result = value2 === void 0 || validator(value2, opt, options);
          if (result !== true) {
            throw new AxiosError("option " + opt + " must be " + result, AxiosError.ERR_BAD_OPTION_VALUE);
          }
          continue;
        }
        if (allowUnknown !== true) {
          throw new AxiosError("Unknown option " + opt, AxiosError.ERR_BAD_OPTION);
        }
      }
    }
    module.exports = {
      assertOptions,
      validators
    };
  }
});

// node_modules/axios/lib/core/Axios.js
var require_Axios = __commonJS({
  "node_modules/axios/lib/core/Axios.js"(exports, module) {
    "use strict";
    var utils = require_utils();
    var buildURL = require_buildURL();
    var InterceptorManager = require_InterceptorManager();
    var dispatchRequest = require_dispatchRequest();
    var mergeConfig = require_mergeConfig();
    var buildFullPath = require_buildFullPath();
    var validator = require_validator();
    var validators = validator.validators;
    function Axios(instanceConfig) {
      this.defaults = instanceConfig;
      this.interceptors = {
        request: new InterceptorManager(),
        response: new InterceptorManager()
      };
    }
    Axios.prototype.request = function request(configOrUrl, config) {
      if (typeof configOrUrl === "string") {
        config = config || {};
        config.url = configOrUrl;
      } else {
        config = configOrUrl || {};
      }
      config = mergeConfig(this.defaults, config);
      if (config.method) {
        config.method = config.method.toLowerCase();
      } else if (this.defaults.method) {
        config.method = this.defaults.method.toLowerCase();
      } else {
        config.method = "get";
      }
      var transitional = config.transitional;
      if (transitional !== void 0) {
        validator.assertOptions(transitional, {
          silentJSONParsing: validators.transitional(validators.boolean),
          forcedJSONParsing: validators.transitional(validators.boolean),
          clarifyTimeoutError: validators.transitional(validators.boolean)
        }, false);
      }
      var requestInterceptorChain = [];
      var synchronousRequestInterceptors = true;
      this.interceptors.request.forEach(function unshiftRequestInterceptors(interceptor) {
        if (typeof interceptor.runWhen === "function" && interceptor.runWhen(config) === false) {
          return;
        }
        synchronousRequestInterceptors = synchronousRequestInterceptors && interceptor.synchronous;
        requestInterceptorChain.unshift(interceptor.fulfilled, interceptor.rejected);
      });
      var responseInterceptorChain = [];
      this.interceptors.response.forEach(function pushResponseInterceptors(interceptor) {
        responseInterceptorChain.push(interceptor.fulfilled, interceptor.rejected);
      });
      var promise;
      if (!synchronousRequestInterceptors) {
        var chain = [dispatchRequest, void 0];
        Array.prototype.unshift.apply(chain, requestInterceptorChain);
        chain = chain.concat(responseInterceptorChain);
        promise = Promise.resolve(config);
        while (chain.length) {
          promise = promise.then(chain.shift(), chain.shift());
        }
        return promise;
      }
      var newConfig = config;
      while (requestInterceptorChain.length) {
        var onFulfilled = requestInterceptorChain.shift();
        var onRejected = requestInterceptorChain.shift();
        try {
          newConfig = onFulfilled(newConfig);
        } catch (error) {
          onRejected(error);
          break;
        }
      }
      try {
        promise = dispatchRequest(newConfig);
      } catch (error) {
        return Promise.reject(error);
      }
      while (responseInterceptorChain.length) {
        promise = promise.then(responseInterceptorChain.shift(), responseInterceptorChain.shift());
      }
      return promise;
    };
    Axios.prototype.getUri = function getUri(config) {
      config = mergeConfig(this.defaults, config);
      var fullPath = buildFullPath(config.baseURL, config.url);
      return buildURL(fullPath, config.params, config.paramsSerializer);
    };
    utils.forEach(["delete", "get", "head", "options"], function forEachMethodNoData(method) {
      Axios.prototype[method] = function(url2, config) {
        return this.request(mergeConfig(config || {}, {
          method,
          url: url2,
          data: (config || {}).data
        }));
      };
    });
    utils.forEach(["post", "put", "patch"], function forEachMethodWithData(method) {
      function generateHTTPMethod(isForm) {
        return function httpMethod(url2, data, config) {
          return this.request(mergeConfig(config || {}, {
            method,
            headers: isForm ? {
              "Content-Type": "multipart/form-data"
            } : {},
            url: url2,
            data
          }));
        };
      }
      Axios.prototype[method] = generateHTTPMethod();
      Axios.prototype[method + "Form"] = generateHTTPMethod(true);
    });
    module.exports = Axios;
  }
});

// node_modules/axios/lib/cancel/CancelToken.js
var require_CancelToken = __commonJS({
  "node_modules/axios/lib/cancel/CancelToken.js"(exports, module) {
    "use strict";
    var CanceledError = require_CanceledError();
    function CancelToken(executor) {
      if (typeof executor !== "function") {
        throw new TypeError("executor must be a function.");
      }
      var resolvePromise;
      this.promise = new Promise(function promiseExecutor(resolve) {
        resolvePromise = resolve;
      });
      var token = this;
      this.promise.then(function(cancel) {
        if (!token._listeners)
          return;
        var i2;
        var l = token._listeners.length;
        for (i2 = 0; i2 < l; i2++) {
          token._listeners[i2](cancel);
        }
        token._listeners = null;
      });
      this.promise.then = function(onfulfilled) {
        var _resolve;
        var promise = new Promise(function(resolve) {
          token.subscribe(resolve);
          _resolve = resolve;
        }).then(onfulfilled);
        promise.cancel = function reject() {
          token.unsubscribe(_resolve);
        };
        return promise;
      };
      executor(function cancel(message) {
        if (token.reason) {
          return;
        }
        token.reason = new CanceledError(message);
        resolvePromise(token.reason);
      });
    }
    CancelToken.prototype.throwIfRequested = function throwIfRequested() {
      if (this.reason) {
        throw this.reason;
      }
    };
    CancelToken.prototype.subscribe = function subscribe(listener) {
      if (this.reason) {
        listener(this.reason);
        return;
      }
      if (this._listeners) {
        this._listeners.push(listener);
      } else {
        this._listeners = [listener];
      }
    };
    CancelToken.prototype.unsubscribe = function unsubscribe(listener) {
      if (!this._listeners) {
        return;
      }
      var index = this._listeners.indexOf(listener);
      if (index !== -1) {
        this._listeners.splice(index, 1);
      }
    };
    CancelToken.source = function source() {
      var cancel;
      var token = new CancelToken(function executor(c) {
        cancel = c;
      });
      return {
        token,
        cancel
      };
    };
    module.exports = CancelToken;
  }
});

// node_modules/axios/lib/helpers/spread.js
var require_spread = __commonJS({
  "node_modules/axios/lib/helpers/spread.js"(exports, module) {
    "use strict";
    module.exports = function spread(callback) {
      return function wrap(arr) {
        return callback.apply(null, arr);
      };
    };
  }
});

// node_modules/axios/lib/helpers/isAxiosError.js
var require_isAxiosError = __commonJS({
  "node_modules/axios/lib/helpers/isAxiosError.js"(exports, module) {
    "use strict";
    var utils = require_utils();
    module.exports = function isAxiosError(payload) {
      return utils.isObject(payload) && payload.isAxiosError === true;
    };
  }
});

// node_modules/axios/lib/axios.js
var require_axios = __commonJS({
  "node_modules/axios/lib/axios.js"(exports, module) {
    "use strict";
    var utils = require_utils();
    var bind = require_bind();
    var Axios = require_Axios();
    var mergeConfig = require_mergeConfig();
    var defaults = require_defaults();
    function createInstance(defaultConfig) {
      var context = new Axios(defaultConfig);
      var instance = bind(Axios.prototype.request, context);
      utils.extend(instance, Axios.prototype, context);
      utils.extend(instance, context);
      instance.create = function create(instanceConfig) {
        return createInstance(mergeConfig(defaultConfig, instanceConfig));
      };
      return instance;
    }
    var axios7 = createInstance(defaults);
    axios7.Axios = Axios;
    axios7.CanceledError = require_CanceledError();
    axios7.CancelToken = require_CancelToken();
    axios7.isCancel = require_isCancel();
    axios7.VERSION = require_data().version;
    axios7.toFormData = require_toFormData();
    axios7.AxiosError = require_AxiosError();
    axios7.Cancel = axios7.CanceledError;
    axios7.all = function all(promises) {
      return Promise.all(promises);
    };
    axios7.spread = require_spread();
    axios7.isAxiosError = require_isAxiosError();
    module.exports = axios7;
    module.exports.default = axios7;
  }
});

// node_modules/axios/index.js
var require_axios2 = __commonJS({
  "node_modules/axios/index.js"(exports, module) {
    module.exports = require_axios();
  }
});

// node_modules/engine.io-parser/build/esm/commons.js
var PACKET_TYPES = /* @__PURE__ */ Object.create(null);
PACKET_TYPES["open"] = "0";
PACKET_TYPES["close"] = "1";
PACKET_TYPES["ping"] = "2";
PACKET_TYPES["pong"] = "3";
PACKET_TYPES["message"] = "4";
PACKET_TYPES["upgrade"] = "5";
PACKET_TYPES["noop"] = "6";
var PACKET_TYPES_REVERSE = /* @__PURE__ */ Object.create(null);
Object.keys(PACKET_TYPES).forEach((key) => {
  PACKET_TYPES_REVERSE[PACKET_TYPES[key]] = key;
});
var ERROR_PACKET = { type: "error", data: "parser error" };

// node_modules/engine.io-parser/build/esm/encodePacket.browser.js
var withNativeBlob = typeof Blob === "function" || typeof Blob !== "undefined" && Object.prototype.toString.call(Blob) === "[object BlobConstructor]";
var withNativeArrayBuffer = typeof ArrayBuffer === "function";
var isView = (obj) => {
  return typeof ArrayBuffer.isView === "function" ? ArrayBuffer.isView(obj) : obj && obj.buffer instanceof ArrayBuffer;
};
var encodePacket = ({ type, data }, supportsBinary, callback) => {
  if (withNativeBlob && data instanceof Blob) {
    if (supportsBinary) {
      return callback(data);
    } else {
      return encodeBlobAsBase64(data, callback);
    }
  } else if (withNativeArrayBuffer && (data instanceof ArrayBuffer || isView(data))) {
    if (supportsBinary) {
      return callback(data);
    } else {
      return encodeBlobAsBase64(new Blob([data]), callback);
    }
  }
  return callback(PACKET_TYPES[type] + (data || ""));
};
var encodeBlobAsBase64 = (data, callback) => {
  const fileReader = new FileReader();
  fileReader.onload = function() {
    const content = fileReader.result.split(",")[1];
    callback("b" + content);
  };
  return fileReader.readAsDataURL(data);
};
var encodePacket_browser_default = encodePacket;

// node_modules/engine.io-parser/build/esm/contrib/base64-arraybuffer.js
var chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/";
var lookup = typeof Uint8Array === "undefined" ? [] : new Uint8Array(256);
for (let i2 = 0; i2 < chars.length; i2++) {
  lookup[chars.charCodeAt(i2)] = i2;
}
var decode = (base64) => {
  let bufferLength = base64.length * 0.75, len = base64.length, i2, p = 0, encoded1, encoded2, encoded3, encoded4;
  if (base64[base64.length - 1] === "=") {
    bufferLength--;
    if (base64[base64.length - 2] === "=") {
      bufferLength--;
    }
  }
  const arraybuffer = new ArrayBuffer(bufferLength), bytes = new Uint8Array(arraybuffer);
  for (i2 = 0; i2 < len; i2 += 4) {
    encoded1 = lookup[base64.charCodeAt(i2)];
    encoded2 = lookup[base64.charCodeAt(i2 + 1)];
    encoded3 = lookup[base64.charCodeAt(i2 + 2)];
    encoded4 = lookup[base64.charCodeAt(i2 + 3)];
    bytes[p++] = encoded1 << 2 | encoded2 >> 4;
    bytes[p++] = (encoded2 & 15) << 4 | encoded3 >> 2;
    bytes[p++] = (encoded3 & 3) << 6 | encoded4 & 63;
  }
  return arraybuffer;
};

// node_modules/engine.io-parser/build/esm/decodePacket.browser.js
var withNativeArrayBuffer2 = typeof ArrayBuffer === "function";
var decodePacket = (encodedPacket, binaryType) => {
  if (typeof encodedPacket !== "string") {
    return {
      type: "message",
      data: mapBinary(encodedPacket, binaryType)
    };
  }
  const type = encodedPacket.charAt(0);
  if (type === "b") {
    return {
      type: "message",
      data: decodeBase64Packet(encodedPacket.substring(1), binaryType)
    };
  }
  const packetType = PACKET_TYPES_REVERSE[type];
  if (!packetType) {
    return ERROR_PACKET;
  }
  return encodedPacket.length > 1 ? {
    type: PACKET_TYPES_REVERSE[type],
    data: encodedPacket.substring(1)
  } : {
    type: PACKET_TYPES_REVERSE[type]
  };
};
var decodeBase64Packet = (data, binaryType) => {
  if (withNativeArrayBuffer2) {
    const decoded = decode(data);
    return mapBinary(decoded, binaryType);
  } else {
    return { base64: true, data };
  }
};
var mapBinary = (data, binaryType) => {
  switch (binaryType) {
    case "blob":
      return data instanceof ArrayBuffer ? new Blob([data]) : data;
    case "arraybuffer":
    default:
      return data;
  }
};
var decodePacket_browser_default = decodePacket;

// node_modules/engine.io-parser/build/esm/index.js
var SEPARATOR = String.fromCharCode(30);
var encodePayload = (packets, callback) => {
  const length2 = packets.length;
  const encodedPackets = new Array(length2);
  let count = 0;
  packets.forEach((packet, i2) => {
    encodePacket_browser_default(packet, false, (encodedPacket) => {
      encodedPackets[i2] = encodedPacket;
      if (++count === length2) {
        callback(encodedPackets.join(SEPARATOR));
      }
    });
  });
};
var decodePayload = (encodedPayload, binaryType) => {
  const encodedPackets = encodedPayload.split(SEPARATOR);
  const packets = [];
  for (let i2 = 0; i2 < encodedPackets.length; i2++) {
    const decodedPacket = decodePacket_browser_default(encodedPackets[i2], binaryType);
    packets.push(decodedPacket);
    if (decodedPacket.type === "error") {
      break;
    }
  }
  return packets;
};
var protocol = 4;

// node_modules/@socket.io/component-emitter/index.mjs
function Emitter(obj) {
  if (obj)
    return mixin(obj);
}
function mixin(obj) {
  for (var key in Emitter.prototype) {
    obj[key] = Emitter.prototype[key];
  }
  return obj;
}
Emitter.prototype.on = Emitter.prototype.addEventListener = function(event, fn) {
  this._callbacks = this._callbacks || {};
  (this._callbacks["$" + event] = this._callbacks["$" + event] || []).push(fn);
  return this;
};
Emitter.prototype.once = function(event, fn) {
  function on2() {
    this.off(event, on2);
    fn.apply(this, arguments);
  }
  on2.fn = fn;
  this.on(event, on2);
  return this;
};
Emitter.prototype.off = Emitter.prototype.removeListener = Emitter.prototype.removeAllListeners = Emitter.prototype.removeEventListener = function(event, fn) {
  this._callbacks = this._callbacks || {};
  if (0 == arguments.length) {
    this._callbacks = {};
    return this;
  }
  var callbacks = this._callbacks["$" + event];
  if (!callbacks)
    return this;
  if (1 == arguments.length) {
    delete this._callbacks["$" + event];
    return this;
  }
  var cb;
  for (var i2 = 0; i2 < callbacks.length; i2++) {
    cb = callbacks[i2];
    if (cb === fn || cb.fn === fn) {
      callbacks.splice(i2, 1);
      break;
    }
  }
  if (callbacks.length === 0) {
    delete this._callbacks["$" + event];
  }
  return this;
};
Emitter.prototype.emit = function(event) {
  this._callbacks = this._callbacks || {};
  var args = new Array(arguments.length - 1), callbacks = this._callbacks["$" + event];
  for (var i2 = 1; i2 < arguments.length; i2++) {
    args[i2 - 1] = arguments[i2];
  }
  if (callbacks) {
    callbacks = callbacks.slice(0);
    for (var i2 = 0, len = callbacks.length; i2 < len; ++i2) {
      callbacks[i2].apply(this, args);
    }
  }
  return this;
};
Emitter.prototype.emitReserved = Emitter.prototype.emit;
Emitter.prototype.listeners = function(event) {
  this._callbacks = this._callbacks || {};
  return this._callbacks["$" + event] || [];
};
Emitter.prototype.hasListeners = function(event) {
  return !!this.listeners(event).length;
};

// node_modules/engine.io-client/build/esm/globalThis.browser.js
var globalThisShim = (() => {
  if (typeof self !== "undefined") {
    return self;
  } else if (typeof window !== "undefined") {
    return window;
  } else {
    return Function("return this")();
  }
})();

// node_modules/engine.io-client/build/esm/util.js
function pick(obj, ...attr) {
  return attr.reduce((acc, k) => {
    if (obj.hasOwnProperty(k)) {
      acc[k] = obj[k];
    }
    return acc;
  }, {});
}
var NATIVE_SET_TIMEOUT = setTimeout;
var NATIVE_CLEAR_TIMEOUT = clearTimeout;
function installTimerFunctions(obj, opts) {
  if (opts.useNativeTimers) {
    obj.setTimeoutFn = NATIVE_SET_TIMEOUT.bind(globalThisShim);
    obj.clearTimeoutFn = NATIVE_CLEAR_TIMEOUT.bind(globalThisShim);
  } else {
    obj.setTimeoutFn = setTimeout.bind(globalThisShim);
    obj.clearTimeoutFn = clearTimeout.bind(globalThisShim);
  }
}
var BASE64_OVERHEAD = 1.33;
function byteLength(obj) {
  if (typeof obj === "string") {
    return utf8Length(obj);
  }
  return Math.ceil((obj.byteLength || obj.size) * BASE64_OVERHEAD);
}
function utf8Length(str) {
  let c = 0, length2 = 0;
  for (let i2 = 0, l = str.length; i2 < l; i2++) {
    c = str.charCodeAt(i2);
    if (c < 128) {
      length2 += 1;
    } else if (c < 2048) {
      length2 += 2;
    } else if (c < 55296 || c >= 57344) {
      length2 += 3;
    } else {
      i2++;
      length2 += 4;
    }
  }
  return length2;
}

// node_modules/engine.io-client/build/esm/transport.js
var TransportError = class extends Error {
  constructor(reason, description, context) {
    super(reason);
    this.description = description;
    this.context = context;
    this.type = "TransportError";
  }
};
var Transport = class extends Emitter {
  constructor(opts) {
    super();
    this.writable = false;
    installTimerFunctions(this, opts);
    this.opts = opts;
    this.query = opts.query;
    this.readyState = "";
    this.socket = opts.socket;
  }
  onError(reason, description, context) {
    super.emitReserved("error", new TransportError(reason, description, context));
    return this;
  }
  open() {
    if ("closed" === this.readyState || "" === this.readyState) {
      this.readyState = "opening";
      this.doOpen();
    }
    return this;
  }
  close() {
    if ("opening" === this.readyState || "open" === this.readyState) {
      this.doClose();
      this.onClose();
    }
    return this;
  }
  send(packets) {
    if ("open" === this.readyState) {
      this.write(packets);
    } else {
    }
  }
  onOpen() {
    this.readyState = "open";
    this.writable = true;
    super.emitReserved("open");
  }
  onData(data) {
    const packet = decodePacket_browser_default(data, this.socket.binaryType);
    this.onPacket(packet);
  }
  onPacket(packet) {
    super.emitReserved("packet", packet);
  }
  onClose(details) {
    this.readyState = "closed";
    super.emitReserved("close", details);
  }
};

// node_modules/engine.io-client/build/esm/contrib/yeast.js
var alphabet = "0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz-_".split("");
var length = 64;
var map = {};
var seed = 0;
var i = 0;
var prev;
function encode(num) {
  let encoded = "";
  do {
    encoded = alphabet[num % length] + encoded;
    num = Math.floor(num / length);
  } while (num > 0);
  return encoded;
}
function yeast() {
  const now = encode(+new Date());
  if (now !== prev)
    return seed = 0, prev = now;
  return now + "." + encode(seed++);
}
for (; i < length; i++)
  map[alphabet[i]] = i;

// node_modules/engine.io-client/build/esm/contrib/parseqs.js
function encode2(obj) {
  let str = "";
  for (let i2 in obj) {
    if (obj.hasOwnProperty(i2)) {
      if (str.length)
        str += "&";
      str += encodeURIComponent(i2) + "=" + encodeURIComponent(obj[i2]);
    }
  }
  return str;
}
function decode2(qs) {
  let qry = {};
  let pairs = qs.split("&");
  for (let i2 = 0, l = pairs.length; i2 < l; i2++) {
    let pair = pairs[i2].split("=");
    qry[decodeURIComponent(pair[0])] = decodeURIComponent(pair[1]);
  }
  return qry;
}

// node_modules/engine.io-client/build/esm/contrib/has-cors.js
var value = false;
try {
  value = typeof XMLHttpRequest !== "undefined" && "withCredentials" in new XMLHttpRequest();
} catch (err) {
}
var hasCORS = value;

// node_modules/engine.io-client/build/esm/transports/xmlhttprequest.browser.js
function XHR(opts) {
  const xdomain = opts.xdomain;
  try {
    if ("undefined" !== typeof XMLHttpRequest && (!xdomain || hasCORS)) {
      return new XMLHttpRequest();
    }
  } catch (e) {
  }
  if (!xdomain) {
    try {
      return new globalThisShim[["Active"].concat("Object").join("X")]("Microsoft.XMLHTTP");
    } catch (e) {
    }
  }
}

// node_modules/engine.io-client/build/esm/transports/polling.js
function empty() {
}
var hasXHR2 = function() {
  const xhr = new XHR({
    xdomain: false
  });
  return null != xhr.responseType;
}();
var Polling = class extends Transport {
  constructor(opts) {
    super(opts);
    this.polling = false;
    if (typeof location !== "undefined") {
      const isSSL = "https:" === location.protocol;
      let port = location.port;
      if (!port) {
        port = isSSL ? "443" : "80";
      }
      this.xd = typeof location !== "undefined" && opts.hostname !== location.hostname || port !== opts.port;
      this.xs = opts.secure !== isSSL;
    }
    const forceBase64 = opts && opts.forceBase64;
    this.supportsBinary = hasXHR2 && !forceBase64;
  }
  get name() {
    return "polling";
  }
  doOpen() {
    this.poll();
  }
  pause(onPause) {
    this.readyState = "pausing";
    const pause = () => {
      this.readyState = "paused";
      onPause();
    };
    if (this.polling || !this.writable) {
      let total = 0;
      if (this.polling) {
        total++;
        this.once("pollComplete", function() {
          --total || pause();
        });
      }
      if (!this.writable) {
        total++;
        this.once("drain", function() {
          --total || pause();
        });
      }
    } else {
      pause();
    }
  }
  poll() {
    this.polling = true;
    this.doPoll();
    this.emitReserved("poll");
  }
  onData(data) {
    const callback = (packet) => {
      if ("opening" === this.readyState && packet.type === "open") {
        this.onOpen();
      }
      if ("close" === packet.type) {
        this.onClose({ description: "transport closed by the server" });
        return false;
      }
      this.onPacket(packet);
    };
    decodePayload(data, this.socket.binaryType).forEach(callback);
    if ("closed" !== this.readyState) {
      this.polling = false;
      this.emitReserved("pollComplete");
      if ("open" === this.readyState) {
        this.poll();
      } else {
      }
    }
  }
  doClose() {
    const close = () => {
      this.write([{ type: "close" }]);
    };
    if ("open" === this.readyState) {
      close();
    } else {
      this.once("open", close);
    }
  }
  write(packets) {
    this.writable = false;
    encodePayload(packets, (data) => {
      this.doWrite(data, () => {
        this.writable = true;
        this.emitReserved("drain");
      });
    });
  }
  uri() {
    let query = this.query || {};
    const schema = this.opts.secure ? "https" : "http";
    let port = "";
    if (false !== this.opts.timestampRequests) {
      query[this.opts.timestampParam] = yeast();
    }
    if (!this.supportsBinary && !query.sid) {
      query.b64 = 1;
    }
    if (this.opts.port && ("https" === schema && Number(this.opts.port) !== 443 || "http" === schema && Number(this.opts.port) !== 80)) {
      port = ":" + this.opts.port;
    }
    const encodedQuery = encode2(query);
    const ipv6 = this.opts.hostname.indexOf(":") !== -1;
    return schema + "://" + (ipv6 ? "[" + this.opts.hostname + "]" : this.opts.hostname) + port + this.opts.path + (encodedQuery.length ? "?" + encodedQuery : "");
  }
  request(opts = {}) {
    Object.assign(opts, { xd: this.xd, xs: this.xs }, this.opts);
    return new Request(this.uri(), opts);
  }
  doWrite(data, fn) {
    const req = this.request({
      method: "POST",
      data
    });
    req.on("success", fn);
    req.on("error", (xhrStatus, context) => {
      this.onError("xhr post error", xhrStatus, context);
    });
  }
  doPoll() {
    const req = this.request();
    req.on("data", this.onData.bind(this));
    req.on("error", (xhrStatus, context) => {
      this.onError("xhr poll error", xhrStatus, context);
    });
    this.pollXhr = req;
  }
};
var Request = class extends Emitter {
  constructor(uri, opts) {
    super();
    installTimerFunctions(this, opts);
    this.opts = opts;
    this.method = opts.method || "GET";
    this.uri = uri;
    this.async = false !== opts.async;
    this.data = void 0 !== opts.data ? opts.data : null;
    this.create();
  }
  create() {
    const opts = pick(this.opts, "agent", "pfx", "key", "passphrase", "cert", "ca", "ciphers", "rejectUnauthorized", "autoUnref");
    opts.xdomain = !!this.opts.xd;
    opts.xscheme = !!this.opts.xs;
    const xhr = this.xhr = new XHR(opts);
    try {
      xhr.open(this.method, this.uri, this.async);
      try {
        if (this.opts.extraHeaders) {
          xhr.setDisableHeaderCheck && xhr.setDisableHeaderCheck(true);
          for (let i2 in this.opts.extraHeaders) {
            if (this.opts.extraHeaders.hasOwnProperty(i2)) {
              xhr.setRequestHeader(i2, this.opts.extraHeaders[i2]);
            }
          }
        }
      } catch (e) {
      }
      if ("POST" === this.method) {
        try {
          xhr.setRequestHeader("Content-type", "text/plain;charset=UTF-8");
        } catch (e) {
        }
      }
      try {
        xhr.setRequestHeader("Accept", "*/*");
      } catch (e) {
      }
      if ("withCredentials" in xhr) {
        xhr.withCredentials = this.opts.withCredentials;
      }
      if (this.opts.requestTimeout) {
        xhr.timeout = this.opts.requestTimeout;
      }
      xhr.onreadystatechange = () => {
        if (4 !== xhr.readyState)
          return;
        if (200 === xhr.status || 1223 === xhr.status) {
          this.onLoad();
        } else {
          this.setTimeoutFn(() => {
            this.onError(typeof xhr.status === "number" ? xhr.status : 0);
          }, 0);
        }
      };
      xhr.send(this.data);
    } catch (e) {
      this.setTimeoutFn(() => {
        this.onError(e);
      }, 0);
      return;
    }
    if (typeof document !== "undefined") {
      this.index = Request.requestsCount++;
      Request.requests[this.index] = this;
    }
  }
  onError(err) {
    this.emitReserved("error", err, this.xhr);
    this.cleanup(true);
  }
  cleanup(fromError) {
    if ("undefined" === typeof this.xhr || null === this.xhr) {
      return;
    }
    this.xhr.onreadystatechange = empty;
    if (fromError) {
      try {
        this.xhr.abort();
      } catch (e) {
      }
    }
    if (typeof document !== "undefined") {
      delete Request.requests[this.index];
    }
    this.xhr = null;
  }
  onLoad() {
    const data = this.xhr.responseText;
    if (data !== null) {
      this.emitReserved("data", data);
      this.emitReserved("success");
      this.cleanup();
    }
  }
  abort() {
    this.cleanup();
  }
};
Request.requestsCount = 0;
Request.requests = {};
if (typeof document !== "undefined") {
  if (typeof attachEvent === "function") {
    attachEvent("onunload", unloadHandler);
  } else if (typeof addEventListener === "function") {
    const terminationEvent = "onpagehide" in globalThisShim ? "pagehide" : "unload";
    addEventListener(terminationEvent, unloadHandler, false);
  }
}
function unloadHandler() {
  for (let i2 in Request.requests) {
    if (Request.requests.hasOwnProperty(i2)) {
      Request.requests[i2].abort();
    }
  }
}

// node_modules/engine.io-client/build/esm/transports/websocket-constructor.browser.js
var nextTick = (() => {
  const isPromiseAvailable = typeof Promise === "function" && typeof Promise.resolve === "function";
  if (isPromiseAvailable) {
    return (cb) => Promise.resolve().then(cb);
  } else {
    return (cb, setTimeoutFn) => setTimeoutFn(cb, 0);
  }
})();
var WebSocket = globalThisShim.WebSocket || globalThisShim.MozWebSocket;
var usingBrowserWebSocket = true;
var defaultBinaryType = "arraybuffer";

// node_modules/engine.io-client/build/esm/transports/websocket.js
var isReactNative = typeof navigator !== "undefined" && typeof navigator.product === "string" && navigator.product.toLowerCase() === "reactnative";
var WS = class extends Transport {
  constructor(opts) {
    super(opts);
    this.supportsBinary = !opts.forceBase64;
  }
  get name() {
    return "websocket";
  }
  doOpen() {
    if (!this.check()) {
      return;
    }
    const uri = this.uri();
    const protocols = this.opts.protocols;
    const opts = isReactNative ? {} : pick(this.opts, "agent", "perMessageDeflate", "pfx", "key", "passphrase", "cert", "ca", "ciphers", "rejectUnauthorized", "localAddress", "protocolVersion", "origin", "maxPayload", "family", "checkServerIdentity");
    if (this.opts.extraHeaders) {
      opts.headers = this.opts.extraHeaders;
    }
    try {
      this.ws = usingBrowserWebSocket && !isReactNative ? protocols ? new WebSocket(uri, protocols) : new WebSocket(uri) : new WebSocket(uri, protocols, opts);
    } catch (err) {
      return this.emitReserved("error", err);
    }
    this.ws.binaryType = this.socket.binaryType || defaultBinaryType;
    this.addEventListeners();
  }
  addEventListeners() {
    this.ws.onopen = () => {
      if (this.opts.autoUnref) {
        this.ws._socket.unref();
      }
      this.onOpen();
    };
    this.ws.onclose = (closeEvent) => this.onClose({
      description: "websocket connection closed",
      context: closeEvent
    });
    this.ws.onmessage = (ev) => this.onData(ev.data);
    this.ws.onerror = (e) => this.onError("websocket error", e);
  }
  write(packets) {
    this.writable = false;
    for (let i2 = 0; i2 < packets.length; i2++) {
      const packet = packets[i2];
      const lastPacket = i2 === packets.length - 1;
      encodePacket_browser_default(packet, this.supportsBinary, (data) => {
        const opts = {};
        if (!usingBrowserWebSocket) {
          if (packet.options) {
            opts.compress = packet.options.compress;
          }
          if (this.opts.perMessageDeflate) {
            const len = "string" === typeof data ? Buffer.byteLength(data) : data.length;
            if (len < this.opts.perMessageDeflate.threshold) {
              opts.compress = false;
            }
          }
        }
        try {
          if (usingBrowserWebSocket) {
            this.ws.send(data);
          } else {
            this.ws.send(data, opts);
          }
        } catch (e) {
        }
        if (lastPacket) {
          nextTick(() => {
            this.writable = true;
            this.emitReserved("drain");
          }, this.setTimeoutFn);
        }
      });
    }
  }
  doClose() {
    if (typeof this.ws !== "undefined") {
      this.ws.close();
      this.ws = null;
    }
  }
  uri() {
    let query = this.query || {};
    const schema = this.opts.secure ? "wss" : "ws";
    let port = "";
    if (this.opts.port && ("wss" === schema && Number(this.opts.port) !== 443 || "ws" === schema && Number(this.opts.port) !== 80)) {
      port = ":" + this.opts.port;
    }
    if (this.opts.timestampRequests) {
      query[this.opts.timestampParam] = yeast();
    }
    if (!this.supportsBinary) {
      query.b64 = 1;
    }
    const encodedQuery = encode2(query);
    const ipv6 = this.opts.hostname.indexOf(":") !== -1;
    return schema + "://" + (ipv6 ? "[" + this.opts.hostname + "]" : this.opts.hostname) + port + this.opts.path + (encodedQuery.length ? "?" + encodedQuery : "");
  }
  check() {
    return !!WebSocket;
  }
};

// node_modules/engine.io-client/build/esm/transports/index.js
var transports = {
  websocket: WS,
  polling: Polling
};

// node_modules/engine.io-client/build/esm/contrib/parseuri.js
var re = /^(?:(?![^:@]+:[^:@\/]*@)(http|https|ws|wss):\/\/)?((?:(([^:@]*)(?::([^:@]*))?)?@)?((?:[a-f0-9]{0,4}:){2,7}[a-f0-9]{0,4}|[^:\/?#]*)(?::(\d*))?)(((\/(?:[^?#](?![^?#\/]*\.[^?#\/.]+(?:[?#]|$)))*\/?)?([^?#\/]*))(?:\?([^#]*))?(?:#(.*))?)/;
var parts = [
  "source",
  "protocol",
  "authority",
  "userInfo",
  "user",
  "password",
  "host",
  "port",
  "relative",
  "path",
  "directory",
  "file",
  "query",
  "anchor"
];
function parse(str) {
  const src = str, b = str.indexOf("["), e = str.indexOf("]");
  if (b != -1 && e != -1) {
    str = str.substring(0, b) + str.substring(b, e).replace(/:/g, ";") + str.substring(e, str.length);
  }
  let m = re.exec(str || ""), uri = {}, i2 = 14;
  while (i2--) {
    uri[parts[i2]] = m[i2] || "";
  }
  if (b != -1 && e != -1) {
    uri.source = src;
    uri.host = uri.host.substring(1, uri.host.length - 1).replace(/;/g, ":");
    uri.authority = uri.authority.replace("[", "").replace("]", "").replace(/;/g, ":");
    uri.ipv6uri = true;
  }
  uri.pathNames = pathNames(uri, uri["path"]);
  uri.queryKey = queryKey(uri, uri["query"]);
  return uri;
}
function pathNames(obj, path) {
  const regx = /\/{2,9}/g, names = path.replace(regx, "/").split("/");
  if (path.substr(0, 1) == "/" || path.length === 0) {
    names.splice(0, 1);
  }
  if (path.substr(path.length - 1, 1) == "/") {
    names.splice(names.length - 1, 1);
  }
  return names;
}
function queryKey(uri, query) {
  const data = {};
  query.replace(/(?:^|&)([^&=]*)=?([^&]*)/g, function($0, $1, $2) {
    if ($1) {
      data[$1] = $2;
    }
  });
  return data;
}

// node_modules/engine.io-client/build/esm/socket.js
var Socket = class extends Emitter {
  constructor(uri, opts = {}) {
    super();
    if (uri && "object" === typeof uri) {
      opts = uri;
      uri = null;
    }
    if (uri) {
      uri = parse(uri);
      opts.hostname = uri.host;
      opts.secure = uri.protocol === "https" || uri.protocol === "wss";
      opts.port = uri.port;
      if (uri.query)
        opts.query = uri.query;
    } else if (opts.host) {
      opts.hostname = parse(opts.host).host;
    }
    installTimerFunctions(this, opts);
    this.secure = null != opts.secure ? opts.secure : typeof location !== "undefined" && "https:" === location.protocol;
    if (opts.hostname && !opts.port) {
      opts.port = this.secure ? "443" : "80";
    }
    this.hostname = opts.hostname || (typeof location !== "undefined" ? location.hostname : "localhost");
    this.port = opts.port || (typeof location !== "undefined" && location.port ? location.port : this.secure ? "443" : "80");
    this.transports = opts.transports || ["polling", "websocket"];
    this.readyState = "";
    this.writeBuffer = [];
    this.prevBufferLen = 0;
    this.opts = Object.assign({
      path: "/engine.io",
      agent: false,
      withCredentials: false,
      upgrade: true,
      timestampParam: "t",
      rememberUpgrade: false,
      rejectUnauthorized: true,
      perMessageDeflate: {
        threshold: 1024
      },
      transportOptions: {},
      closeOnBeforeunload: true
    }, opts);
    this.opts.path = this.opts.path.replace(/\/$/, "") + "/";
    if (typeof this.opts.query === "string") {
      this.opts.query = decode2(this.opts.query);
    }
    this.id = null;
    this.upgrades = null;
    this.pingInterval = null;
    this.pingTimeout = null;
    this.pingTimeoutTimer = null;
    if (typeof addEventListener === "function") {
      if (this.opts.closeOnBeforeunload) {
        addEventListener("beforeunload", () => {
          if (this.transport) {
            this.transport.removeAllListeners();
            this.transport.close();
          }
        }, false);
      }
      if (this.hostname !== "localhost") {
        this.offlineEventListener = () => {
          this.onClose("transport close", {
            description: "network connection lost"
          });
        };
        addEventListener("offline", this.offlineEventListener, false);
      }
    }
    this.open();
  }
  createTransport(name) {
    const query = Object.assign({}, this.opts.query);
    query.EIO = protocol;
    query.transport = name;
    if (this.id)
      query.sid = this.id;
    const opts = Object.assign({}, this.opts.transportOptions[name], this.opts, {
      query,
      socket: this,
      hostname: this.hostname,
      secure: this.secure,
      port: this.port
    });
    return new transports[name](opts);
  }
  open() {
    let transport;
    if (this.opts.rememberUpgrade && Socket.priorWebsocketSuccess && this.transports.indexOf("websocket") !== -1) {
      transport = "websocket";
    } else if (0 === this.transports.length) {
      this.setTimeoutFn(() => {
        this.emitReserved("error", "No transports available");
      }, 0);
      return;
    } else {
      transport = this.transports[0];
    }
    this.readyState = "opening";
    try {
      transport = this.createTransport(transport);
    } catch (e) {
      this.transports.shift();
      this.open();
      return;
    }
    transport.open();
    this.setTransport(transport);
  }
  setTransport(transport) {
    if (this.transport) {
      this.transport.removeAllListeners();
    }
    this.transport = transport;
    transport.on("drain", this.onDrain.bind(this)).on("packet", this.onPacket.bind(this)).on("error", this.onError.bind(this)).on("close", (reason) => this.onClose("transport close", reason));
  }
  probe(name) {
    let transport = this.createTransport(name);
    let failed = false;
    Socket.priorWebsocketSuccess = false;
    const onTransportOpen = () => {
      if (failed)
        return;
      transport.send([{ type: "ping", data: "probe" }]);
      transport.once("packet", (msg) => {
        if (failed)
          return;
        if ("pong" === msg.type && "probe" === msg.data) {
          this.upgrading = true;
          this.emitReserved("upgrading", transport);
          if (!transport)
            return;
          Socket.priorWebsocketSuccess = "websocket" === transport.name;
          this.transport.pause(() => {
            if (failed)
              return;
            if ("closed" === this.readyState)
              return;
            cleanup();
            this.setTransport(transport);
            transport.send([{ type: "upgrade" }]);
            this.emitReserved("upgrade", transport);
            transport = null;
            this.upgrading = false;
            this.flush();
          });
        } else {
          const err = new Error("probe error");
          err.transport = transport.name;
          this.emitReserved("upgradeError", err);
        }
      });
    };
    function freezeTransport() {
      if (failed)
        return;
      failed = true;
      cleanup();
      transport.close();
      transport = null;
    }
    const onerror = (err) => {
      const error = new Error("probe error: " + err);
      error.transport = transport.name;
      freezeTransport();
      this.emitReserved("upgradeError", error);
    };
    function onTransportClose() {
      onerror("transport closed");
    }
    function onclose() {
      onerror("socket closed");
    }
    function onupgrade(to) {
      if (transport && to.name !== transport.name) {
        freezeTransport();
      }
    }
    const cleanup = () => {
      transport.removeListener("open", onTransportOpen);
      transport.removeListener("error", onerror);
      transport.removeListener("close", onTransportClose);
      this.off("close", onclose);
      this.off("upgrading", onupgrade);
    };
    transport.once("open", onTransportOpen);
    transport.once("error", onerror);
    transport.once("close", onTransportClose);
    this.once("close", onclose);
    this.once("upgrading", onupgrade);
    transport.open();
  }
  onOpen() {
    this.readyState = "open";
    Socket.priorWebsocketSuccess = "websocket" === this.transport.name;
    this.emitReserved("open");
    this.flush();
    if ("open" === this.readyState && this.opts.upgrade && this.transport.pause) {
      let i2 = 0;
      const l = this.upgrades.length;
      for (; i2 < l; i2++) {
        this.probe(this.upgrades[i2]);
      }
    }
  }
  onPacket(packet) {
    if ("opening" === this.readyState || "open" === this.readyState || "closing" === this.readyState) {
      this.emitReserved("packet", packet);
      this.emitReserved("heartbeat");
      switch (packet.type) {
        case "open":
          this.onHandshake(JSON.parse(packet.data));
          break;
        case "ping":
          this.resetPingTimeout();
          this.sendPacket("pong");
          this.emitReserved("ping");
          this.emitReserved("pong");
          break;
        case "error":
          const err = new Error("server error");
          err.code = packet.data;
          this.onError(err);
          break;
        case "message":
          this.emitReserved("data", packet.data);
          this.emitReserved("message", packet.data);
          break;
      }
    } else {
    }
  }
  onHandshake(data) {
    this.emitReserved("handshake", data);
    this.id = data.sid;
    this.transport.query.sid = data.sid;
    this.upgrades = this.filterUpgrades(data.upgrades);
    this.pingInterval = data.pingInterval;
    this.pingTimeout = data.pingTimeout;
    this.maxPayload = data.maxPayload;
    this.onOpen();
    if ("closed" === this.readyState)
      return;
    this.resetPingTimeout();
  }
  resetPingTimeout() {
    this.clearTimeoutFn(this.pingTimeoutTimer);
    this.pingTimeoutTimer = this.setTimeoutFn(() => {
      this.onClose("ping timeout");
    }, this.pingInterval + this.pingTimeout);
    if (this.opts.autoUnref) {
      this.pingTimeoutTimer.unref();
    }
  }
  onDrain() {
    this.writeBuffer.splice(0, this.prevBufferLen);
    this.prevBufferLen = 0;
    if (0 === this.writeBuffer.length) {
      this.emitReserved("drain");
    } else {
      this.flush();
    }
  }
  flush() {
    if ("closed" !== this.readyState && this.transport.writable && !this.upgrading && this.writeBuffer.length) {
      const packets = this.getWritablePackets();
      this.transport.send(packets);
      this.prevBufferLen = packets.length;
      this.emitReserved("flush");
    }
  }
  getWritablePackets() {
    const shouldCheckPayloadSize = this.maxPayload && this.transport.name === "polling" && this.writeBuffer.length > 1;
    if (!shouldCheckPayloadSize) {
      return this.writeBuffer;
    }
    let payloadSize = 1;
    for (let i2 = 0; i2 < this.writeBuffer.length; i2++) {
      const data = this.writeBuffer[i2].data;
      if (data) {
        payloadSize += byteLength(data);
      }
      if (i2 > 0 && payloadSize > this.maxPayload) {
        return this.writeBuffer.slice(0, i2);
      }
      payloadSize += 2;
    }
    return this.writeBuffer;
  }
  write(msg, options, fn) {
    this.sendPacket("message", msg, options, fn);
    return this;
  }
  send(msg, options, fn) {
    this.sendPacket("message", msg, options, fn);
    return this;
  }
  sendPacket(type, data, options, fn) {
    if ("function" === typeof data) {
      fn = data;
      data = void 0;
    }
    if ("function" === typeof options) {
      fn = options;
      options = null;
    }
    if ("closing" === this.readyState || "closed" === this.readyState) {
      return;
    }
    options = options || {};
    options.compress = false !== options.compress;
    const packet = {
      type,
      data,
      options
    };
    this.emitReserved("packetCreate", packet);
    this.writeBuffer.push(packet);
    if (fn)
      this.once("flush", fn);
    this.flush();
  }
  close() {
    const close = () => {
      this.onClose("forced close");
      this.transport.close();
    };
    const cleanupAndClose = () => {
      this.off("upgrade", cleanupAndClose);
      this.off("upgradeError", cleanupAndClose);
      close();
    };
    const waitForUpgrade = () => {
      this.once("upgrade", cleanupAndClose);
      this.once("upgradeError", cleanupAndClose);
    };
    if ("opening" === this.readyState || "open" === this.readyState) {
      this.readyState = "closing";
      if (this.writeBuffer.length) {
        this.once("drain", () => {
          if (this.upgrading) {
            waitForUpgrade();
          } else {
            close();
          }
        });
      } else if (this.upgrading) {
        waitForUpgrade();
      } else {
        close();
      }
    }
    return this;
  }
  onError(err) {
    Socket.priorWebsocketSuccess = false;
    this.emitReserved("error", err);
    this.onClose("transport error", err);
  }
  onClose(reason, description) {
    if ("opening" === this.readyState || "open" === this.readyState || "closing" === this.readyState) {
      this.clearTimeoutFn(this.pingTimeoutTimer);
      this.transport.removeAllListeners("close");
      this.transport.close();
      this.transport.removeAllListeners();
      if (typeof removeEventListener === "function") {
        removeEventListener("offline", this.offlineEventListener, false);
      }
      this.readyState = "closed";
      this.id = null;
      this.emitReserved("close", reason, description);
      this.writeBuffer = [];
      this.prevBufferLen = 0;
    }
  }
  filterUpgrades(upgrades) {
    const filteredUpgrades = [];
    let i2 = 0;
    const j = upgrades.length;
    for (; i2 < j; i2++) {
      if (~this.transports.indexOf(upgrades[i2]))
        filteredUpgrades.push(upgrades[i2]);
    }
    return filteredUpgrades;
  }
};
Socket.protocol = protocol;

// node_modules/engine.io-client/build/esm/index.js
var protocol2 = Socket.protocol;

// node_modules/socket.io-client/build/esm/url.js
function url(uri, path = "", loc) {
  let obj = uri;
  loc = loc || typeof location !== "undefined" && location;
  if (null == uri)
    uri = loc.protocol + "//" + loc.host;
  if (typeof uri === "string") {
    if ("/" === uri.charAt(0)) {
      if ("/" === uri.charAt(1)) {
        uri = loc.protocol + uri;
      } else {
        uri = loc.host + uri;
      }
    }
    if (!/^(https?|wss?):\/\//.test(uri)) {
      if ("undefined" !== typeof loc) {
        uri = loc.protocol + "//" + uri;
      } else {
        uri = "https://" + uri;
      }
    }
    obj = parse(uri);
  }
  if (!obj.port) {
    if (/^(http|ws)$/.test(obj.protocol)) {
      obj.port = "80";
    } else if (/^(http|ws)s$/.test(obj.protocol)) {
      obj.port = "443";
    }
  }
  obj.path = obj.path || "/";
  const ipv6 = obj.host.indexOf(":") !== -1;
  const host = ipv6 ? "[" + obj.host + "]" : obj.host;
  obj.id = obj.protocol + "://" + host + ":" + obj.port + path;
  obj.href = obj.protocol + "://" + host + (loc && loc.port === obj.port ? "" : ":" + obj.port);
  return obj;
}

// node_modules/socket.io-client/node_modules/socket.io-parser/build/esm/index.js
var esm_exports = {};
__export(esm_exports, {
  Decoder: () => Decoder,
  Encoder: () => Encoder,
  PacketType: () => PacketType,
  protocol: () => protocol3
});

// node_modules/socket.io-client/node_modules/socket.io-parser/build/esm/is-binary.js
var withNativeArrayBuffer3 = typeof ArrayBuffer === "function";
var isView2 = (obj) => {
  return typeof ArrayBuffer.isView === "function" ? ArrayBuffer.isView(obj) : obj.buffer instanceof ArrayBuffer;
};
var toString = Object.prototype.toString;
var withNativeBlob2 = typeof Blob === "function" || typeof Blob !== "undefined" && toString.call(Blob) === "[object BlobConstructor]";
var withNativeFile = typeof File === "function" || typeof File !== "undefined" && toString.call(File) === "[object FileConstructor]";
function isBinary(obj) {
  return withNativeArrayBuffer3 && (obj instanceof ArrayBuffer || isView2(obj)) || withNativeBlob2 && obj instanceof Blob || withNativeFile && obj instanceof File;
}
function hasBinary(obj, toJSON) {
  if (!obj || typeof obj !== "object") {
    return false;
  }
  if (Array.isArray(obj)) {
    for (let i2 = 0, l = obj.length; i2 < l; i2++) {
      if (hasBinary(obj[i2])) {
        return true;
      }
    }
    return false;
  }
  if (isBinary(obj)) {
    return true;
  }
  if (obj.toJSON && typeof obj.toJSON === "function" && arguments.length === 1) {
    return hasBinary(obj.toJSON(), true);
  }
  for (const key in obj) {
    if (Object.prototype.hasOwnProperty.call(obj, key) && hasBinary(obj[key])) {
      return true;
    }
  }
  return false;
}

// node_modules/socket.io-client/node_modules/socket.io-parser/build/esm/binary.js
function deconstructPacket(packet) {
  const buffers = [];
  const packetData = packet.data;
  const pack = packet;
  pack.data = _deconstructPacket(packetData, buffers);
  pack.attachments = buffers.length;
  return { packet: pack, buffers };
}
function _deconstructPacket(data, buffers) {
  if (!data)
    return data;
  if (isBinary(data)) {
    const placeholder = { _placeholder: true, num: buffers.length };
    buffers.push(data);
    return placeholder;
  } else if (Array.isArray(data)) {
    const newData = new Array(data.length);
    for (let i2 = 0; i2 < data.length; i2++) {
      newData[i2] = _deconstructPacket(data[i2], buffers);
    }
    return newData;
  } else if (typeof data === "object" && !(data instanceof Date)) {
    const newData = {};
    for (const key in data) {
      if (Object.prototype.hasOwnProperty.call(data, key)) {
        newData[key] = _deconstructPacket(data[key], buffers);
      }
    }
    return newData;
  }
  return data;
}
function reconstructPacket(packet, buffers) {
  packet.data = _reconstructPacket(packet.data, buffers);
  packet.attachments = void 0;
  return packet;
}
function _reconstructPacket(data, buffers) {
  if (!data)
    return data;
  if (data && data._placeholder === true) {
    const isIndexValid = typeof data.num === "number" && data.num >= 0 && data.num < buffers.length;
    if (isIndexValid) {
      return buffers[data.num];
    } else {
      throw new Error("illegal attachments");
    }
  } else if (Array.isArray(data)) {
    for (let i2 = 0; i2 < data.length; i2++) {
      data[i2] = _reconstructPacket(data[i2], buffers);
    }
  } else if (typeof data === "object") {
    for (const key in data) {
      if (Object.prototype.hasOwnProperty.call(data, key)) {
        data[key] = _reconstructPacket(data[key], buffers);
      }
    }
  }
  return data;
}

// node_modules/socket.io-client/node_modules/socket.io-parser/build/esm/index.js
var protocol3 = 5;
var PacketType;
(function(PacketType2) {
  PacketType2[PacketType2["CONNECT"] = 0] = "CONNECT";
  PacketType2[PacketType2["DISCONNECT"] = 1] = "DISCONNECT";
  PacketType2[PacketType2["EVENT"] = 2] = "EVENT";
  PacketType2[PacketType2["ACK"] = 3] = "ACK";
  PacketType2[PacketType2["CONNECT_ERROR"] = 4] = "CONNECT_ERROR";
  PacketType2[PacketType2["BINARY_EVENT"] = 5] = "BINARY_EVENT";
  PacketType2[PacketType2["BINARY_ACK"] = 6] = "BINARY_ACK";
})(PacketType || (PacketType = {}));
var Encoder = class {
  constructor(replacer) {
    this.replacer = replacer;
  }
  encode(obj) {
    if (obj.type === PacketType.EVENT || obj.type === PacketType.ACK) {
      if (hasBinary(obj)) {
        obj.type = obj.type === PacketType.EVENT ? PacketType.BINARY_EVENT : PacketType.BINARY_ACK;
        return this.encodeAsBinary(obj);
      }
    }
    return [this.encodeAsString(obj)];
  }
  encodeAsString(obj) {
    let str = "" + obj.type;
    if (obj.type === PacketType.BINARY_EVENT || obj.type === PacketType.BINARY_ACK) {
      str += obj.attachments + "-";
    }
    if (obj.nsp && "/" !== obj.nsp) {
      str += obj.nsp + ",";
    }
    if (null != obj.id) {
      str += obj.id;
    }
    if (null != obj.data) {
      str += JSON.stringify(obj.data, this.replacer);
    }
    return str;
  }
  encodeAsBinary(obj) {
    const deconstruction = deconstructPacket(obj);
    const pack = this.encodeAsString(deconstruction.packet);
    const buffers = deconstruction.buffers;
    buffers.unshift(pack);
    return buffers;
  }
};
var Decoder = class extends Emitter {
  constructor(reviver) {
    super();
    this.reviver = reviver;
  }
  add(obj) {
    let packet;
    if (typeof obj === "string") {
      if (this.reconstructor) {
        throw new Error("got plaintext data when reconstructing a packet");
      }
      packet = this.decodeString(obj);
      if (packet.type === PacketType.BINARY_EVENT || packet.type === PacketType.BINARY_ACK) {
        this.reconstructor = new BinaryReconstructor(packet);
        if (packet.attachments === 0) {
          super.emitReserved("decoded", packet);
        }
      } else {
        super.emitReserved("decoded", packet);
      }
    } else if (isBinary(obj) || obj.base64) {
      if (!this.reconstructor) {
        throw new Error("got binary data when not reconstructing a packet");
      } else {
        packet = this.reconstructor.takeBinaryData(obj);
        if (packet) {
          this.reconstructor = null;
          super.emitReserved("decoded", packet);
        }
      }
    } else {
      throw new Error("Unknown type: " + obj);
    }
  }
  decodeString(str) {
    let i2 = 0;
    const p = {
      type: Number(str.charAt(0))
    };
    if (PacketType[p.type] === void 0) {
      throw new Error("unknown packet type " + p.type);
    }
    if (p.type === PacketType.BINARY_EVENT || p.type === PacketType.BINARY_ACK) {
      const start = i2 + 1;
      while (str.charAt(++i2) !== "-" && i2 != str.length) {
      }
      const buf = str.substring(start, i2);
      if (buf != Number(buf) || str.charAt(i2) !== "-") {
        throw new Error("Illegal attachments");
      }
      p.attachments = Number(buf);
    }
    if ("/" === str.charAt(i2 + 1)) {
      const start = i2 + 1;
      while (++i2) {
        const c = str.charAt(i2);
        if ("," === c)
          break;
        if (i2 === str.length)
          break;
      }
      p.nsp = str.substring(start, i2);
    } else {
      p.nsp = "/";
    }
    const next = str.charAt(i2 + 1);
    if ("" !== next && Number(next) == next) {
      const start = i2 + 1;
      while (++i2) {
        const c = str.charAt(i2);
        if (null == c || Number(c) != c) {
          --i2;
          break;
        }
        if (i2 === str.length)
          break;
      }
      p.id = Number(str.substring(start, i2 + 1));
    }
    if (str.charAt(++i2)) {
      const payload = this.tryParse(str.substr(i2));
      if (Decoder.isPayloadValid(p.type, payload)) {
        p.data = payload;
      } else {
        throw new Error("invalid payload");
      }
    }
    return p;
  }
  tryParse(str) {
    try {
      return JSON.parse(str, this.reviver);
    } catch (e) {
      return false;
    }
  }
  static isPayloadValid(type, payload) {
    switch (type) {
      case PacketType.CONNECT:
        return typeof payload === "object";
      case PacketType.DISCONNECT:
        return payload === void 0;
      case PacketType.CONNECT_ERROR:
        return typeof payload === "string" || typeof payload === "object";
      case PacketType.EVENT:
      case PacketType.BINARY_EVENT:
        return Array.isArray(payload) && payload.length > 0;
      case PacketType.ACK:
      case PacketType.BINARY_ACK:
        return Array.isArray(payload);
    }
  }
  destroy() {
    if (this.reconstructor) {
      this.reconstructor.finishedReconstruction();
    }
  }
};
var BinaryReconstructor = class {
  constructor(packet) {
    this.packet = packet;
    this.buffers = [];
    this.reconPack = packet;
  }
  takeBinaryData(binData) {
    this.buffers.push(binData);
    if (this.buffers.length === this.reconPack.attachments) {
      const packet = reconstructPacket(this.reconPack, this.buffers);
      this.finishedReconstruction();
      return packet;
    }
    return null;
  }
  finishedReconstruction() {
    this.reconPack = null;
    this.buffers = [];
  }
};

// node_modules/socket.io-client/build/esm/on.js
function on(obj, ev, fn) {
  obj.on(ev, fn);
  return function subDestroy() {
    obj.off(ev, fn);
  };
}

// node_modules/socket.io-client/build/esm/socket.js
var RESERVED_EVENTS = Object.freeze({
  connect: 1,
  connect_error: 1,
  disconnect: 1,
  disconnecting: 1,
  newListener: 1,
  removeListener: 1
});
var Socket2 = class extends Emitter {
  constructor(io, nsp, opts) {
    super();
    this.connected = false;
    this.receiveBuffer = [];
    this.sendBuffer = [];
    this.ids = 0;
    this.acks = {};
    this.flags = {};
    this.io = io;
    this.nsp = nsp;
    if (opts && opts.auth) {
      this.auth = opts.auth;
    }
    if (this.io._autoConnect)
      this.open();
  }
  get disconnected() {
    return !this.connected;
  }
  subEvents() {
    if (this.subs)
      return;
    const io = this.io;
    this.subs = [
      on(io, "open", this.onopen.bind(this)),
      on(io, "packet", this.onpacket.bind(this)),
      on(io, "error", this.onerror.bind(this)),
      on(io, "close", this.onclose.bind(this))
    ];
  }
  get active() {
    return !!this.subs;
  }
  connect() {
    if (this.connected)
      return this;
    this.subEvents();
    if (!this.io["_reconnecting"])
      this.io.open();
    if ("open" === this.io._readyState)
      this.onopen();
    return this;
  }
  open() {
    return this.connect();
  }
  send(...args) {
    args.unshift("message");
    this.emit.apply(this, args);
    return this;
  }
  emit(ev, ...args) {
    if (RESERVED_EVENTS.hasOwnProperty(ev)) {
      throw new Error('"' + ev.toString() + '" is a reserved event name');
    }
    args.unshift(ev);
    const packet = {
      type: PacketType.EVENT,
      data: args
    };
    packet.options = {};
    packet.options.compress = this.flags.compress !== false;
    if ("function" === typeof args[args.length - 1]) {
      const id = this.ids++;
      const ack = args.pop();
      this._registerAckCallback(id, ack);
      packet.id = id;
    }
    const isTransportWritable = this.io.engine && this.io.engine.transport && this.io.engine.transport.writable;
    const discardPacket = this.flags.volatile && (!isTransportWritable || !this.connected);
    if (discardPacket) {
    } else if (this.connected) {
      this.notifyOutgoingListeners(packet);
      this.packet(packet);
    } else {
      this.sendBuffer.push(packet);
    }
    this.flags = {};
    return this;
  }
  _registerAckCallback(id, ack) {
    const timeout = this.flags.timeout;
    if (timeout === void 0) {
      this.acks[id] = ack;
      return;
    }
    const timer = this.io.setTimeoutFn(() => {
      delete this.acks[id];
      for (let i2 = 0; i2 < this.sendBuffer.length; i2++) {
        if (this.sendBuffer[i2].id === id) {
          this.sendBuffer.splice(i2, 1);
        }
      }
      ack.call(this, new Error("operation has timed out"));
    }, timeout);
    this.acks[id] = (...args) => {
      this.io.clearTimeoutFn(timer);
      ack.apply(this, [null, ...args]);
    };
  }
  packet(packet) {
    packet.nsp = this.nsp;
    this.io._packet(packet);
  }
  onopen() {
    if (typeof this.auth == "function") {
      this.auth((data) => {
        this.packet({ type: PacketType.CONNECT, data });
      });
    } else {
      this.packet({ type: PacketType.CONNECT, data: this.auth });
    }
  }
  onerror(err) {
    if (!this.connected) {
      this.emitReserved("connect_error", err);
    }
  }
  onclose(reason, description) {
    this.connected = false;
    delete this.id;
    this.emitReserved("disconnect", reason, description);
  }
  onpacket(packet) {
    const sameNamespace = packet.nsp === this.nsp;
    if (!sameNamespace)
      return;
    switch (packet.type) {
      case PacketType.CONNECT:
        if (packet.data && packet.data.sid) {
          const id = packet.data.sid;
          this.onconnect(id);
        } else {
          this.emitReserved("connect_error", new Error("It seems you are trying to reach a Socket.IO server in v2.x with a v3.x client, but they are not compatible (more information here: https://socket.io/docs/v3/migrating-from-2-x-to-3-0/)"));
        }
        break;
      case PacketType.EVENT:
      case PacketType.BINARY_EVENT:
        this.onevent(packet);
        break;
      case PacketType.ACK:
      case PacketType.BINARY_ACK:
        this.onack(packet);
        break;
      case PacketType.DISCONNECT:
        this.ondisconnect();
        break;
      case PacketType.CONNECT_ERROR:
        this.destroy();
        const err = new Error(packet.data.message);
        err.data = packet.data.data;
        this.emitReserved("connect_error", err);
        break;
    }
  }
  onevent(packet) {
    const args = packet.data || [];
    if (null != packet.id) {
      args.push(this.ack(packet.id));
    }
    if (this.connected) {
      this.emitEvent(args);
    } else {
      this.receiveBuffer.push(Object.freeze(args));
    }
  }
  emitEvent(args) {
    if (this._anyListeners && this._anyListeners.length) {
      const listeners = this._anyListeners.slice();
      for (const listener of listeners) {
        listener.apply(this, args);
      }
    }
    super.emit.apply(this, args);
  }
  ack(id) {
    const self2 = this;
    let sent = false;
    return function(...args) {
      if (sent)
        return;
      sent = true;
      self2.packet({
        type: PacketType.ACK,
        id,
        data: args
      });
    };
  }
  onack(packet) {
    const ack = this.acks[packet.id];
    if ("function" === typeof ack) {
      ack.apply(this, packet.data);
      delete this.acks[packet.id];
    } else {
    }
  }
  onconnect(id) {
    this.id = id;
    this.connected = true;
    this.emitBuffered();
    this.emitReserved("connect");
  }
  emitBuffered() {
    this.receiveBuffer.forEach((args) => this.emitEvent(args));
    this.receiveBuffer = [];
    this.sendBuffer.forEach((packet) => {
      this.notifyOutgoingListeners(packet);
      this.packet(packet);
    });
    this.sendBuffer = [];
  }
  ondisconnect() {
    this.destroy();
    this.onclose("io server disconnect");
  }
  destroy() {
    if (this.subs) {
      this.subs.forEach((subDestroy) => subDestroy());
      this.subs = void 0;
    }
    this.io["_destroy"](this);
  }
  disconnect() {
    if (this.connected) {
      this.packet({ type: PacketType.DISCONNECT });
    }
    this.destroy();
    if (this.connected) {
      this.onclose("io client disconnect");
    }
    return this;
  }
  close() {
    return this.disconnect();
  }
  compress(compress) {
    this.flags.compress = compress;
    return this;
  }
  get volatile() {
    this.flags.volatile = true;
    return this;
  }
  timeout(timeout) {
    this.flags.timeout = timeout;
    return this;
  }
  onAny(listener) {
    this._anyListeners = this._anyListeners || [];
    this._anyListeners.push(listener);
    return this;
  }
  prependAny(listener) {
    this._anyListeners = this._anyListeners || [];
    this._anyListeners.unshift(listener);
    return this;
  }
  offAny(listener) {
    if (!this._anyListeners) {
      return this;
    }
    if (listener) {
      const listeners = this._anyListeners;
      for (let i2 = 0; i2 < listeners.length; i2++) {
        if (listener === listeners[i2]) {
          listeners.splice(i2, 1);
          return this;
        }
      }
    } else {
      this._anyListeners = [];
    }
    return this;
  }
  listenersAny() {
    return this._anyListeners || [];
  }
  onAnyOutgoing(listener) {
    this._anyOutgoingListeners = this._anyOutgoingListeners || [];
    this._anyOutgoingListeners.push(listener);
    return this;
  }
  prependAnyOutgoing(listener) {
    this._anyOutgoingListeners = this._anyOutgoingListeners || [];
    this._anyOutgoingListeners.unshift(listener);
    return this;
  }
  offAnyOutgoing(listener) {
    if (!this._anyOutgoingListeners) {
      return this;
    }
    if (listener) {
      const listeners = this._anyOutgoingListeners;
      for (let i2 = 0; i2 < listeners.length; i2++) {
        if (listener === listeners[i2]) {
          listeners.splice(i2, 1);
          return this;
        }
      }
    } else {
      this._anyOutgoingListeners = [];
    }
    return this;
  }
  listenersAnyOutgoing() {
    return this._anyOutgoingListeners || [];
  }
  notifyOutgoingListeners(packet) {
    if (this._anyOutgoingListeners && this._anyOutgoingListeners.length) {
      const listeners = this._anyOutgoingListeners.slice();
      for (const listener of listeners) {
        listener.apply(this, packet.data);
      }
    }
  }
};

// node_modules/socket.io-client/build/esm/contrib/backo2.js
function Backoff(opts) {
  opts = opts || {};
  this.ms = opts.min || 100;
  this.max = opts.max || 1e4;
  this.factor = opts.factor || 2;
  this.jitter = opts.jitter > 0 && opts.jitter <= 1 ? opts.jitter : 0;
  this.attempts = 0;
}
Backoff.prototype.duration = function() {
  var ms = this.ms * Math.pow(this.factor, this.attempts++);
  if (this.jitter) {
    var rand = Math.random();
    var deviation = Math.floor(rand * this.jitter * ms);
    ms = (Math.floor(rand * 10) & 1) == 0 ? ms - deviation : ms + deviation;
  }
  return Math.min(ms, this.max) | 0;
};
Backoff.prototype.reset = function() {
  this.attempts = 0;
};
Backoff.prototype.setMin = function(min) {
  this.ms = min;
};
Backoff.prototype.setMax = function(max) {
  this.max = max;
};
Backoff.prototype.setJitter = function(jitter) {
  this.jitter = jitter;
};

// node_modules/socket.io-client/build/esm/manager.js
var Manager = class extends Emitter {
  constructor(uri, opts) {
    var _a;
    super();
    this.nsps = {};
    this.subs = [];
    if (uri && "object" === typeof uri) {
      opts = uri;
      uri = void 0;
    }
    opts = opts || {};
    opts.path = opts.path || "/socket.io";
    this.opts = opts;
    installTimerFunctions(this, opts);
    this.reconnection(opts.reconnection !== false);
    this.reconnectionAttempts(opts.reconnectionAttempts || Infinity);
    this.reconnectionDelay(opts.reconnectionDelay || 1e3);
    this.reconnectionDelayMax(opts.reconnectionDelayMax || 5e3);
    this.randomizationFactor((_a = opts.randomizationFactor) !== null && _a !== void 0 ? _a : 0.5);
    this.backoff = new Backoff({
      min: this.reconnectionDelay(),
      max: this.reconnectionDelayMax(),
      jitter: this.randomizationFactor()
    });
    this.timeout(null == opts.timeout ? 2e4 : opts.timeout);
    this._readyState = "closed";
    this.uri = uri;
    const _parser = opts.parser || esm_exports;
    this.encoder = new _parser.Encoder();
    this.decoder = new _parser.Decoder();
    this._autoConnect = opts.autoConnect !== false;
    if (this._autoConnect)
      this.open();
  }
  reconnection(v) {
    if (!arguments.length)
      return this._reconnection;
    this._reconnection = !!v;
    return this;
  }
  reconnectionAttempts(v) {
    if (v === void 0)
      return this._reconnectionAttempts;
    this._reconnectionAttempts = v;
    return this;
  }
  reconnectionDelay(v) {
    var _a;
    if (v === void 0)
      return this._reconnectionDelay;
    this._reconnectionDelay = v;
    (_a = this.backoff) === null || _a === void 0 ? void 0 : _a.setMin(v);
    return this;
  }
  randomizationFactor(v) {
    var _a;
    if (v === void 0)
      return this._randomizationFactor;
    this._randomizationFactor = v;
    (_a = this.backoff) === null || _a === void 0 ? void 0 : _a.setJitter(v);
    return this;
  }
  reconnectionDelayMax(v) {
    var _a;
    if (v === void 0)
      return this._reconnectionDelayMax;
    this._reconnectionDelayMax = v;
    (_a = this.backoff) === null || _a === void 0 ? void 0 : _a.setMax(v);
    return this;
  }
  timeout(v) {
    if (!arguments.length)
      return this._timeout;
    this._timeout = v;
    return this;
  }
  maybeReconnectOnOpen() {
    if (!this._reconnecting && this._reconnection && this.backoff.attempts === 0) {
      this.reconnect();
    }
  }
  open(fn) {
    if (~this._readyState.indexOf("open"))
      return this;
    this.engine = new Socket(this.uri, this.opts);
    const socket5 = this.engine;
    const self2 = this;
    this._readyState = "opening";
    this.skipReconnect = false;
    const openSubDestroy = on(socket5, "open", function() {
      self2.onopen();
      fn && fn();
    });
    const errorSub = on(socket5, "error", (err) => {
      self2.cleanup();
      self2._readyState = "closed";
      this.emitReserved("error", err);
      if (fn) {
        fn(err);
      } else {
        self2.maybeReconnectOnOpen();
      }
    });
    if (false !== this._timeout) {
      const timeout = this._timeout;
      if (timeout === 0) {
        openSubDestroy();
      }
      const timer = this.setTimeoutFn(() => {
        openSubDestroy();
        socket5.close();
        socket5.emit("error", new Error("timeout"));
      }, timeout);
      if (this.opts.autoUnref) {
        timer.unref();
      }
      this.subs.push(function subDestroy() {
        clearTimeout(timer);
      });
    }
    this.subs.push(openSubDestroy);
    this.subs.push(errorSub);
    return this;
  }
  connect(fn) {
    return this.open(fn);
  }
  onopen() {
    this.cleanup();
    this._readyState = "open";
    this.emitReserved("open");
    const socket5 = this.engine;
    this.subs.push(on(socket5, "ping", this.onping.bind(this)), on(socket5, "data", this.ondata.bind(this)), on(socket5, "error", this.onerror.bind(this)), on(socket5, "close", this.onclose.bind(this)), on(this.decoder, "decoded", this.ondecoded.bind(this)));
  }
  onping() {
    this.emitReserved("ping");
  }
  ondata(data) {
    try {
      this.decoder.add(data);
    } catch (e) {
      this.onclose("parse error");
    }
  }
  ondecoded(packet) {
    this.emitReserved("packet", packet);
  }
  onerror(err) {
    this.emitReserved("error", err);
  }
  socket(nsp, opts) {
    let socket5 = this.nsps[nsp];
    if (!socket5) {
      socket5 = new Socket2(this, nsp, opts);
      this.nsps[nsp] = socket5;
    }
    return socket5;
  }
  _destroy(socket5) {
    const nsps = Object.keys(this.nsps);
    for (const nsp of nsps) {
      const socket6 = this.nsps[nsp];
      if (socket6.active) {
        return;
      }
    }
    this._close();
  }
  _packet(packet) {
    const encodedPackets = this.encoder.encode(packet);
    for (let i2 = 0; i2 < encodedPackets.length; i2++) {
      this.engine.write(encodedPackets[i2], packet.options);
    }
  }
  cleanup() {
    this.subs.forEach((subDestroy) => subDestroy());
    this.subs.length = 0;
    this.decoder.destroy();
  }
  _close() {
    this.skipReconnect = true;
    this._reconnecting = false;
    this.onclose("forced close");
    if (this.engine)
      this.engine.close();
  }
  disconnect() {
    return this._close();
  }
  onclose(reason, description) {
    this.cleanup();
    this.backoff.reset();
    this._readyState = "closed";
    this.emitReserved("close", reason, description);
    if (this._reconnection && !this.skipReconnect) {
      this.reconnect();
    }
  }
  reconnect() {
    if (this._reconnecting || this.skipReconnect)
      return this;
    const self2 = this;
    if (this.backoff.attempts >= this._reconnectionAttempts) {
      this.backoff.reset();
      this.emitReserved("reconnect_failed");
      this._reconnecting = false;
    } else {
      const delay = this.backoff.duration();
      this._reconnecting = true;
      const timer = this.setTimeoutFn(() => {
        if (self2.skipReconnect)
          return;
        this.emitReserved("reconnect_attempt", self2.backoff.attempts);
        if (self2.skipReconnect)
          return;
        self2.open((err) => {
          if (err) {
            self2._reconnecting = false;
            self2.reconnect();
            this.emitReserved("reconnect_error", err);
          } else {
            self2.onreconnect();
          }
        });
      }, delay);
      if (this.opts.autoUnref) {
        timer.unref();
      }
      this.subs.push(function subDestroy() {
        clearTimeout(timer);
      });
    }
  }
  onreconnect() {
    const attempt = this.backoff.attempts;
    this._reconnecting = false;
    this.backoff.reset();
    this.emitReserved("reconnect", attempt);
  }
};

// node_modules/socket.io-client/build/esm/index.js
var cache = {};
function lookup2(uri, opts) {
  if (typeof uri === "object") {
    opts = uri;
    uri = void 0;
  }
  opts = opts || {};
  const parsed = url(uri, opts.path || "/socket.io");
  const source = parsed.source;
  const id = parsed.id;
  const path = parsed.path;
  const sameNamespace = cache[id] && path in cache[id]["nsps"];
  const newConnection = opts.forceNew || opts["force new connection"] || false === opts.multiplex || sameNamespace;
  let io;
  if (newConnection) {
    io = new Manager(source, opts);
  } else {
    if (!cache[id]) {
      cache[id] = new Manager(source, opts);
    }
    io = cache[id];
  }
  if (parsed.query && !opts.query) {
    opts.query = parsed.queryKey;
  }
  return io.socket(parsed.path, opts);
}
Object.assign(lookup2, {
  Manager,
  Socket: Socket2,
  io: lookup2,
  connect: lookup2
});

// src/scripts/routes/dashboard.route.ts
var import_axios = __toESM(require_axios2());
function getGames() {
  return __async(this, null, function* () {
    try {
      const res = yield import_axios.default.get("/api/dashboard");
      gamesList.value = res.data;
      setGamesList();
    } catch (err) {
      console.log(err);
    }
  });
}
function getPrevGame() {
  return __async(this, null, function* () {
    try {
      const res = yield import_axios.default.get("/api/dashboard/prev");
      return res.data[0];
    } catch (err) {
      console.log(err);
    }
  });
}
function addGame(payload) {
  return __async(this, null, function* () {
    try {
      yield import_axios.default.post("/api/dashboard", payload);
      getGames();
    } catch (err) {
      console.log(err);
    }
  });
}
function addPrevGame(payload) {
  return __async(this, null, function* () {
    try {
      yield import_axios.default.delete("/api/dashboard/prev", payload);
      yield import_axios.default.post("/api/dashboard/prev", payload);
    } catch (err) {
      console.log(err);
    }
  });
}

// src/scripts/routes/creatures.route.ts
var import_axios6 = __toESM(require_axios2());

// src/scripts/token.ts
function giveTokenEvents(token) {
  token.addEventListener("dragstart", (e) => {
    e.target.classList.add("token--dragging");
  });
  token.addEventListener("dragend", (e) => {
    e.target.classList.remove("token--dragging");
    document.querySelector(".game-page-container").classList.remove("token--dragging-cursor");
  });
  token.addEventListener("mousedown", (e) => {
    switch (e.which) {
      case 1:
        document.querySelector(".game-page-container").classList.add("token--dragging-cursor");
        break;
      case 3:
        console.log("Right click");
        break;
      default:
        break;
    }
  });
  token.addEventListener("mouseup", (e) => {
    switch (e.which) {
      case 1:
        document.querySelector(".game-page-container").classList.remove("token--dragging-cursor");
        break;
      default:
        break;
    }
  });
}

// src/scripts/routes/tokens.route.ts
var import_axios2 = __toESM(require_axios2());
function getTokens() {
  return __async(this, null, function* () {
    try {
      const res = yield import_axios2.default.get("/api/tokens");
      tokens.value = res.data;
    } catch (err) {
      console.log(err);
    }
  });
}
function addToken(payload) {
  return __async(this, null, function* () {
    try {
      yield import_axios2.default.post("/api/tokens", payload);
    } catch (err) {
      console.log(err);
    }
  });
}

// src/scripts/menus/token.menu.ts
var tokens = { value: [] };
var defaultTokens = [
  { image: "https://i.pinimg.com/236x/88/4a/05/884a056ba7a5a004becacbfd1bfd78fe.jpg", size: "token--medium" },
  { image: "https://i.imgur.com/5cibmUw.png", size: "token--large" },
  { image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSlW_xekRD291YBhLdPKYifDnF2HV74Csz0KQ&usqp=CAU", size: "token--gargantuan" }
];
function addDefaultTokens() {
  for (let token of defaultTokens) {
    addToken(token);
  }
}
function toggleTokenMenu(menuName) {
  if (client.clientType === "dm") {
    menuOpen.value = !menuOpen.value;
    if (menuOpen.value) {
      selectedMenu.value = "tokens";
      document.querySelector(".game-page-container").insertAdjacentHTML("beforeend", `
                <div class="menu">
                    <button class="menu__btn menu__btn--close">X</button>
                    <div class="menu__body"></div>
                </div>
            `);
      document.querySelector(".menu__btn--close").addEventListener("click", () => closeMenu(menuName));
      getTokenBodyData();
    } else {
      closeMenu(menuName);
    }
  }
}
function getTokenBodyData() {
  return __async(this, null, function* () {
    yield getTokens();
    for (let token of tokens.value) {
      if (token.creature) {
        document.querySelector(".menu__body").insertAdjacentHTML("beforeend", `
                <div class="menu__body--container">
                    <img src=${token.image} class="menu__item menu__item--token" ondragstart="placeToken(event, '${token.size}')" size=${token.size} relative=${token.creature} id=${token.id}>
                    <button class="menu__item--circle-btn" onclick="openCreatureStatsWindow('${token.creature}')"><i class="fa-solid fa-arrow-up-right-from-square"></i></button>
                </div>
            `);
      } else {
        document.querySelector(".menu__body").insertAdjacentHTML("beforeend", `
                <div class="menu__body--container">
                    <img src=${token.image} class="menu__item menu__item--token" ondragstart="placeToken(event, '${token.size}')" size=${token.size} relative=${token.creature} id=${token.id}>
                </div>
            `);
      }
    }
  });
}
function resetTokenBodyData() {
  let deleteList = [];
  for (let token of document.getElementsByClassName("menu__item")) {
    deleteList.push(token);
  }
  for (let btn of document.getElementsByClassName("menu__item--circle-btn")) {
    deleteList.push(btn);
  }
  for (let box of document.getElementsByClassName("menu__body--container")) {
    deleteList.push(box);
  }
  for (let el of deleteList) {
    el.remove();
  }
  getTokenBodyData();
}

// src/scripts/routes/maps.route.ts
var import_axios3 = __toESM(require_axios2());
function getMaps() {
  return __async(this, null, function* () {
    try {
      const res = yield import_axios3.default.get("/api/maps");
      maps.value = res.data;
    } catch (err) {
      console.log(err);
    }
  });
}
function addMap(payload) {
  return __async(this, null, function* () {
    try {
      console.log(payload);
      yield import_axios3.default.post("/api/maps", payload);
    } catch (err) {
      console.log(err);
    }
  });
}

// src/scripts/menus/map.menu.ts
var socket = lookup2();
var maps = { value: [] };
var defaultMaps = [
  { name: "Default Map", image: "https://images.squarespace-cdn.com/content/v1/5511fc7ce4b0a3782aa9418b/1429139759127-KFHWAFFFVXJWZNWTITKK/learning-the-grid-method.jpg" }
];
function addDefaultMaps() {
  for (let map2 of defaultMaps) {
    addMap(map2);
  }
}
function toggleMapMenu(menuName) {
  menuOpen.value = !menuOpen.value;
  if (menuOpen.value) {
    selectedMenu.value = "maps";
    document.querySelector(".game-page-container").insertAdjacentHTML("beforeend", `
            <div class="menu">
                <button class="menu__btn menu__btn--close">X</button>
                <div class="menu__body"></div>
            </div>
        `);
    document.querySelector(".menu__btn--close").addEventListener("click", () => closeMenu(menuName));
    getMapBodyData();
  } else {
    closeMenu(menuName);
  }
}
function getMapBodyData() {
  return __async(this, null, function* () {
    yield getMaps();
    for (let map2 of maps.value) {
      document.querySelector(".menu__body").insertAdjacentHTML("beforeend", `
            <div>
                <img src=${map2.image} class="menu__item menu__item--map" ondblclick="selectMap(event)" id=${map2.id}>
                <p class="menu__item--name">${map2.name}</p>
            </div>
        `);
    }
    document.querySelector(".menu__body").insertAdjacentHTML("beforeend", `
        <div class="menu__item menu__item--map">
            <button class="btn--new-item" onclick="newMap();">New Map</button>
        </div>
    `);
  });
}
socket.on("SELECT_MAP", (e, map2) => {
  if (map2.name === "Default Map") {
    root.style.setProperty("--background-image", `url('')`);
    setupGrid(25, 25, true);
  } else {
    root.style.setProperty("--background-image", `url(${map2.image})`);
    setupGrid(e.width / 2, e.height / 2, true);
  }
});

// src/scripts/routes/users.route.ts
var import_axios4 = __toESM(require_axios2());
function getUser() {
  return __async(this, null, function* () {
    try {
      const config = {
        headers: { "Content-Type": "application/json" },
        withCredentials: true
      };
      const res = yield import_axios4.default.get("/api/user", config);
      return res.data;
    } catch (err) {
      console.log(err);
    }
  });
}
function loginUser(payload) {
  return __async(this, null, function* () {
    try {
      yield import_axios4.default.post("/api/user/login", payload);
      changeRoute("game");
    } catch (err) {
      console.log(err);
    }
  });
}
function logout() {
  return __async(this, null, function* () {
    try {
      yield import_axios4.default.post("/api/user/logout");
      changeRoute("login");
    } catch (err) {
      console.log(err);
    }
  });
}
function changeNewUser(payload) {
  return __async(this, null, function* () {
    try {
      yield import_axios4.default.put("/api/user", { newStatus: payload });
    } catch (err) {
      console.log(err);
    }
  });
}

// src/scripts/routes/characters.route.ts
var import_axios5 = __toESM(require_axios2());
function getCharacters() {
  return __async(this, null, function* () {
    try {
      const res = yield import_axios5.default.get("/api/characters");
      characters.value = res.data;
    } catch (err) {
      console.log(err);
    }
  });
}

// src/scripts/menus/character.menu.ts
var characters = { value: [] };
var character = { value: {} };
function toggleCharacterMenu(menuName) {
  menuOpen.value = !menuOpen.value;
  if (menuOpen.value) {
    selectedMenu.value = "characters";
    document.querySelector(".game-page-container").insertAdjacentHTML("beforeend", `
            <div class="menu">
                <button class="menu__btn menu__btn--close">X</button>
                <div class="menu__body"></div>
            </div>
        `);
    document.querySelector(".menu__btn--close").addEventListener("click", () => closeMenu(menuName));
    getCharacterBodyData();
  } else {
    closeMenu(menuName);
  }
}
function getCharacterBodyData() {
  return __async(this, null, function* () {
    yield getCharacters();
    for (let character2 of characters) {
      document.querySelector(".menu__body").insertAdjacentHTML("beforeend", `
            <div class="menu__item menu__item--character" onclick="selectCharacter(${character2.id})">
                <img src=${character2.image}>
                <div>
                    <p>${character2.level} ${character2.name} ${character2.class}</p>
                </div>
            </div>
        `);
    }
    document.querySelector(".menu__body").insertAdjacentHTML("beforeend", `
        <div class="menu__item menu__item--character-btn">
            <button class="btn--new-item" onclick="toggleNewCharacterWindow()">New Character</button>
        </div>
    `);
  });
}

// src/scripts/creature-stats.ts
var creatureIndexList = [];
function openCreatureStatsWindow(index, custom) {
  return __async(this, null, function* () {
    for (let listItem of creatureIndexList) {
      if (listItem === index) {
        if (document.querySelector(`.creature-stats-window--${index}`))
          document.querySelector(`.creature-stats-window--${index}`).remove();
        creatureIndexList.splice(creatureIndexList.indexOf(index), 1);
        return;
      }
    }
    creatureIndexList.push(index);
    let creature = yield getCreatureByIndex(index, custom);
    renderCreatureStatsWindow(creature);
  });
}
var creatureStatsWindow = (creature) => `
    <div class="creature-stats-content">
        <button class="btn--window-close creature-stats-close-btn">X</button>
        <div class="creature-stats-window__header creature-stats-window--${creature.index}__header">
            <h3>${creature.name}</h3>
            <p>${creature.size ? `${creature.size}` : ""}${creature.type ? ` ${creature.type}` : ""}${creature.alignment ? `, ${creature.alignment}` : ""}</p>
        </div>
        <div class="creature-stats-window__body">
            <p><span class="bold">Armor Class</span> ${creature.ac}</p>
            <p><span class="bold">Health</span> ${creature.hit_points} ${creature.hit_dice ? `(${creature.hit_dice})` : ""}</p>
            <div class="creature-stats-window__speed" id="speed--${creature.index}"></div>
        <div class="creatures-window__body--general-stats">
            <div class="creature-stats-window__scores" id="scores--${creature.index}"></div>
            <div class="creature-stats-window__proficiencies" id="proficiencies--${creature.index}"></div>
            <div class="creature-stats-window__proficiencies" id="skills--${creature.index}"></div>
            <div class="creature-stats-window__vul-res" id="vul-res--${creature.index}"></div>
            <div class="creature-stats-window__senses" id="senses--${creature.index}"></div>
            <div class="creature-stats-window__languages">
                ${creature.languages ? `<p><span class="bold">Languages</span> ${creature.languages}</p>` : ``}
            </div>
            <div class="creature-stats-window__body">
                <p><span class="bold">Challenge</span> ${creature.cr ? creature.cr : "-"} (${creature.xp ? creature.xp : 0} XP)</p>
            </div>
        </div>
        <div class="creature-stats-window__special-abilities" id="special-abilities--${creature.index}"></div>
        ${creature.actions.length > 0 ? `<div class="creatures-window__body--actions">
            <h4>Actions</h4>
            <div class="creature-stats-window__actions" id="actions--${creature.index}"></div>
        </div>` : ""}
        ${creature.legActions.length > 0 ? `<div class="creatures-window__body--actions">
            <h4>Legendary Actions</h4>
            <div class="creature-stats-window__legendary-actions" id="legendary-actions--${creature.index}"></div>
        </div>` : ""}
    </div>
`;
function renderCreatureStatsWindow(creature) {
  const window2 = document.querySelector("body").appendChild(document.createElement("div"));
  window2.classList.add("creature-stats-window");
  window2.classList.add(`creature-stats-window--${creature.index}`);
  window2.insertAdjacentHTML("beforeend", creatureStatsWindow(creature));
  getCreatureSpeedData(creature);
  getCreatureScoresData(creature);
  getCreatureProficiencyData(creature);
  getCreatureVulResData(creature);
  getCreatureSensesData(creature);
  getCreatureSpecialAbilityData(creature);
  getCreatureActionsData(creature);
  getCreatureLegActionsData(creature);
  dragElement(window2, `creature-stats-window--${creature.index}`);
  document.querySelectorAll(".creature-stats-close-btn").forEach((btn) => {
    btn.addEventListener("click", () => {
      removeCreatureStatsWindow(creature.index);
    });
  });
}
function getCreatureSpeedData(creature) {
  let speeds = [];
  let exists = false;
  creature.speeds.forEach((speed) => {
    if (speed.value) {
      exists = true;
      speeds.push(speed);
    }
  });
  if (!exists)
    return;
  const text = document.getElementById(`speed--${creature.index}`).appendChild(document.createElement("p"));
  text.insertAdjacentHTML("beforeend", `<span class="bold">Speed </span>`);
  speeds.forEach((speed) => {
    text.insertAdjacentHTML("beforeend", `
            ${speed.name} ${speed.value} ft.,
        `);
  });
}
function getCreatureScoresData(creature) {
  let scoreNames = ["Str", "Dex", "Con", "Int", "Wis", "Char"];
  let scoreValues = [
    creature.str,
    creature.dex,
    creature.con,
    creature.int,
    creature.wis,
    creature.char
  ];
  for (let i2 = 0; i2 < 6; i2++) {
    let modifier = Math.floor((scoreValues[i2] - 10) / 2);
    document.getElementById(`scores--${creature.index}`).insertAdjacentHTML("beforeend", `
            <div class="creature-scores__box">
                <span class="bold"><p>${scoreNames[i2]}</p></span>
                <p>${modifier < 0 ? "" : "+"}${modifier}</p>
                <div class="creature-scores__modifier">
                    <p>${scoreValues[i2]}</p>
                </div>
            </div>
        `);
  }
}
function getCreatureProficiencyData(creature) {
  const text = document.getElementById(`proficiencies--${creature.index}`).appendChild(document.createElement("p"));
  text.insertAdjacentHTML("beforeend", `<span class="bold">Saving Throws </span>`);
  let skills = [];
  let string = "";
  creature.proficiencies.forEach((proficiency) => {
    const modifiedProf = separateProf(proficiency.name + proficiency.value, proficiency.value, proficiency.name);
    if (proficiency.name.includes("Saving")) {
      string += ` ${modifiedProf} +${proficiency.value},`;
    } else {
      skills.push({ name: modifiedProf, value: proficiency.value });
    }
  });
  string = string.replace(/,*$/, "");
  text.insertAdjacentHTML("beforeend", string);
  if (string === "")
    text.remove();
  string = "";
  const skillsText = document.getElementById(`skills--${creature.index}`).appendChild(document.createElement("p"));
  skillsText.insertAdjacentHTML("beforeend", `<span class="bold">Skills </span>`);
  skills.forEach((skill) => {
    string += ` ${skill.name} +${skill.value},`;
  });
  string = string.replace(/,*$/, "");
  skillsText.insertAdjacentHTML("beforeend", string);
  if (string === "")
    skillsText.remove();
}
function getCreatureVulResData(creature) {
  if (creature.vulnerabilities.length > 0) {
    const text = document.getElementById(`vul-res--${creature.index}`).appendChild(document.createElement("p"));
    text.insertAdjacentHTML("beforeend", `<span class="bold">Vulnerabilities </span>`);
    let string = "";
    creature.vulnerabilities.forEach((stat) => {
      string += ` ${stat},`;
    });
    string = string.replace(/,*$/, "");
    text.insertAdjacentHTML("beforeend", string);
  }
  if (creature.resistances.length > 0) {
    const text = document.getElementById(`vul-res--${creature.index}`).appendChild(document.createElement("p"));
    text.insertAdjacentHTML("beforeend", `<span class="bold">Resistances </span>`);
    let string = "";
    creature.resistances.forEach((stat) => {
      string += ` ${stat},`;
    });
    string = string.replace(/,*$/, "");
    text.insertAdjacentHTML("beforeend", string);
  }
  if (creature.damageImmunities.length > 0) {
    const text = document.getElementById(`vul-res--${creature.index}`).appendChild(document.createElement("p"));
    text.insertAdjacentHTML("beforeend", `<span class="bold">Damage Immunities </span>`);
    let string = "";
    creature.damageImmunities.forEach((stat) => {
      string += ` ${stat},`;
    });
    string = string.replace(/,*$/, "");
    text.insertAdjacentHTML("beforeend", string);
  }
  if (creature.conditionImmunities.length > 0) {
    const text = document.getElementById(`vul-res--${creature.index}`).appendChild(document.createElement("p"));
    text.insertAdjacentHTML("beforeend", `<span class="bold">Condition Immunities </span>`);
    let string = "";
    creature.conditionImmunities.forEach((stat) => {
      string += ` ${stat},`;
    });
    string = string.replace(/,*$/, "");
    text.insertAdjacentHTML("beforeend", string);
  }
}
function getCreatureSensesData(creature) {
  if (creature.senses.length === 0)
    return;
  const text = document.getElementById(`senses--${creature.index}`).appendChild(document.createElement("p"));
  text.insertAdjacentHTML("beforeend", `<span class="bold">Senses </span>`);
  let string = "";
  creature.senses.forEach((sense) => {
    if (sense.name.includes("passive") || sense.name.includes("Passive")) {
      string += ` ${sense.name} ${sense.value},`;
    } else {
      string += ` ${sense.name} ${sense.value} ft.,`;
    }
  });
  string = string.replace(/,*$/, "");
  text.insertAdjacentHTML("beforeend", string);
}
function getCreatureSpecialAbilityData(creature) {
  creature.abilities.forEach((ability) => {
    document.getElementById(`special-abilities--${creature.index}`).insertAdjacentHTML("beforeend", `
            <div class="special-abilities__box">
                <p class="special-abilities__name"><span class="bold">${ability.name}.</span> ${ability.desc}</p>
            </div>
        `);
  });
}
function getCreatureActionsData(creature) {
  let i2 = 0;
  creature.actions.forEach((action) => {
    document.getElementById(`actions--${creature.index}`).insertAdjacentHTML("beforeend", `
            <div class="actions__box">
                <p class="actions__name"><span class="bold">${action.name}.</span> ${action.desc}</p>
                ${action.attack_bonus ? `<button class="btn--attack btn--hover"><i class="fa-solid fa-dice-d20"></i> +${action.attack_bonus}</button>` : ""}
                <span id="${creature.index}-${action.name}-${i2}"></span>
            </div>
        `);
    i2++;
  });
  i2 = 0;
  creature.actions.forEach((action) => {
    let element = document.getElementById(`${creature.index}-${action.name}-${i2}`);
    element.classList.add("actions__box--dmg_dice");
    action.damage.forEach((dmg) => {
      element.insertAdjacentHTML("beforeend", `<button class="btn--attack btn--hover">${dmg.damageDice} ${dmg.damageType}</button>`);
    });
    i2++;
  });
}
function getCreatureLegActionsData(creature) {
  let i2 = 0;
  creature.legActions.forEach((action) => {
    document.getElementById(`legendary-actions--${creature.index}`).insertAdjacentHTML("beforeend", `
            <div class="actions__box">
                <p class="actions__name"><span class="bold">${action.name}.</span> ${action.desc}</p>
                ${action.attack_bonus ? `<button class="btn--attack btn--hover"><i class="fa-solid fa-dice-d20"></i> +${action.attack_bonus}</button>` : ""}
                <span id="${creature.index}-${action.name}-${i2}"></span>
            </div>
        `);
    i2++;
  });
  i2 = 0;
  creature.legActions.forEach((action) => {
    let element = document.getElementById(`${creature.index}-${action.name}-${i2}`);
    element.classList.add("legendary-actions__box--dmg_dice");
    action.damage.forEach((dmg) => {
      if (dmg.damageDice) {
        element.insertAdjacentHTML("beforeend", `<button class="btn--attack btn--hover">${dmg.damageDice} ${dmg.damageType}</button>`);
      }
    });
    i2++;
  });
}
function removeCreatureStatsWindow(index) {
  creatureIndexList.forEach((listItem) => {
    if (listItem === index) {
      document.querySelector(`.creature-stats-window--${index}`).remove();
      creatureIndexList.splice(creatureIndexList.indexOf(index), 1);
      return;
    }
  });
}
function getActionDesc(_string) {
  let string = _string;
  let rolls = [];
  let toHit = "";
  while (string.includes("{{")) {
    toHit = string.split("{{")[1].split("}}")[0];
    string = string.replace("{{", "").replace("}}", "");
  }
  while (toHit.includes("+")) {
    toHit = toHit.replace("+", "");
  }
  while (string.includes("[[")) {
    rolls.push(string.split("[[")[1].split("]]")[0]);
    string = string.replace("[[", "").replace("]]", "");
  }
  return { rolls, desc: string, toHit };
}
function separateDmgRoll(dmg) {
  const [damageDice, damageType] = dmg.split(" ");
  return { damageDice, damageType };
}
function separateProf(string, value2, name) {
  const save = string.split("Saving Throw: ");
  const skill = string.split("Skill: ");
  if (save[0] === "") {
    const name2 = save[1].split(value2);
    return name2[0].toString();
  } else if (skill[0] === "") {
    const name2 = skill[1].split(value2);
    return name2[0].toString();
  }
  return name;
}

// src/scripts/grid.ts
var socket2 = lookup2();
var canOpenStats = true;
var x = 0;
var y = 0;
var root = document.documentElement;
var user;
var playerList = [];
var cells = [];
var playersListOpen = false;
var cellToDelete;
var canPlace = true;
function gamePageLoaded() {
  return __async(this, null, function* () {
    user = yield fetchUser();
    socket2.emit("SET_NAME", user.username);
    socket2.emit("UPDATE_PLAYER_LIST", room);
    setupGrid(25, 25, false);
    if (user.new_user) {
      addDefaultTokens();
      addDefaultMaps();
      changeNewUser(false);
    }
    if (client.clientType == "dm") {
      setupSidebar("dm");
    } else {
      setupSidebar("player");
      toggleCharacterMenu("characters");
    }
  });
}
function setupGrid(width, height, clear) {
  let hasEvents = false;
  document.getElementById("grid").addEventListener("contextmenu", (e) => e.preventDefault());
  clear && clearMap();
  for (let a = 0; a < height - 2; a++) {
    let newRow = document.getElementById("grid").appendChild(document.createElement("tr"));
    for (let b = 0; b < width; b++) {
      let newCell = newRow.appendChild(document.createElement("td"));
      newCell.classList.add("grid__cell");
      if (x > width - 1)
        x = 0;
      newCell.setAttribute("x", x.toString());
      newCell.setAttribute("y", y.toString());
      x++;
      newCell.addEventListener("dragover", (e) => {
        const token = document.querySelector(".token--dragging");
        if (!hasEvents)
          giveTokenEvents(token);
        hasEvents = true;
        newCell.appendChild(token);
        token.classList.add("token");
        if (token.classList.contains("menu__item"))
          cellToDelete = "";
        token.classList.remove("menu__item");
        token.classList.remove("menu__item--token");
        if (token.getAttribute("size"))
          token.classList.add(token.getAttribute("size"));
      });
      newCell.addEventListener("mousedown", (e) => {
        if (e.which === 1) {
          for (let i2 = 0; i2 < 4; i2++) {
            if (e.path[i2].classList.contains("grid__cell")) {
              cellToDelete = e.path[i2];
            }
          }
        }
      });
      newCell.addEventListener("dragend", () => {
        const token = newCell.firstElementChild;
        if (token) {
          let size = token.getAttribute("size");
          let image = token.getAttribute("src");
          let relative = token.getAttribute("relative");
          let id = token.getAttribute("id");
          token.classList.remove("token--dragging");
          token.removeAttribute("onmousedown");
          token.addEventListener("dblclick", () => {
            if (relative === "null" || client.clientType === "player")
              return;
            if (canOpenStats) {
              openCreatureStatsWindow(relative, false);
              canOpenStats = false;
            } else {
              setTimeout(function() {
                canOpenStats = true;
              }, 100);
            }
          });
          if (cellToDelete)
            socket2.emit("REMOVE_TOKEN", { x: parseInt(cellToDelete.getAttribute("x")), y: parseInt(cellToDelete.getAttribute("y")) }, room);
          const newToken = new Token(id, image, size, relative);
          canPlace = false;
          socket2.emit("PLACE_TOKEN", { x: parseInt(newCell.getAttribute("x")), y: parseInt(newCell.getAttribute("y")) }, newToken, user.username, room);
          resetTokenBodyData();
          canOpenStats = true;
        }
      });
      cells.push(newCell);
    }
    y++;
  }
}
function createToken(cell, newToken, username) {
  if (canPlace) {
    const token = cell.appendChild(document.createElement("img"));
    token.setAttribute("src", newToken.image);
    token.setAttribute("id", newToken.id);
    token.setAttribute("relative", newToken.relative);
    token.classList.add("token");
    token.classList.add(newToken.size);
    token.setAttribute("size", newToken.size);
    if (username)
      token.setAttribute("owner", username);
    giveTokenEvents(token);
    let relative = token.getAttribute("relative");
    token.addEventListener("dblclick", () => {
      if (relative === "null" || client.clientType === "player")
        return;
      if (canOpenStats) {
        openCreatureStatsWindow(relative, false);
        canOpenStats = false;
      } else {
        setTimeout(function() {
          canOpenStats = true;
        }, 100);
      }
    });
  } else {
    canPlace = true;
  }
}
function zoomIn() {
  let zoomMin = 0.5, zoomMax = 10;
  let rs = getComputedStyle(root);
  let zoomValue = parseInt(rs.getPropertyValue("--zoom"));
  root.style.setProperty("--zoom", `${clamp(zoomValue + 1, zoomMin, zoomMax)}rem`);
}
function zoomOut() {
  let zoomMin = 0.5, zoomMax = 10;
  let rs = getComputedStyle(root);
  let zoomValue = parseInt(rs.getPropertyValue("--zoom"));
  root.style.setProperty("--zoom", `${clamp(zoomValue - 1, zoomMin, zoomMax)}rem`);
}
function clearMap() {
  x = 0;
  y = 0;
  document.getElementById("grid").innerHTML = "";
  cells = [];
}
function togglePlayerList() {
  playersListOpen = !playersListOpen;
  if (playersListOpen) {
    const playerListContainer = document.querySelector("body").appendChild(document.createElement("div"));
    playerListContainer.classList.add("players-list");
    const playerListEl = document.querySelector(".players-list");
    for (let player of playerList) {
      playerListEl.insertAdjacentHTML("beforeend", `
                <p>${player}</p>
            `);
    }
  } else {
    document.querySelector(".players-list").remove();
  }
}
function fetchUser() {
  return __async(this, null, function* () {
    const user2 = yield getUser();
    return user2;
  });
}
function setupSidebar(userType) {
  const sidebar = document.querySelector(".sidebar");
  if (userType === "dm") {
    sidebar.insertAdjacentHTML("beforeend", `
            <button class="sidebar__btn sidebar__tokens btn--hover" id="tokens-menu-btn">Tokens</button>
            <button class="sidebar__btn sidebar__maps btn--hover" id="creatures-window-btn">Creatures</button>
            <button class="sidebar__btn sidebar__maps btn--hover" id="maps-menu-btn">Maps</button>
        `);
  } else {
    sidebar.insertAdjacentHTML("beforeend", `
            <button class="sidebar__btn sidebar__characters btn--hover" id="characters-menu-btn">Characters</button>
            <button class="sidebar__btn sidebar__character-sheet btn--hover" id="character-sheet-menu-btn">Character Sheet</button>
        `);
  }
  document.getElementById("tokens-menu-btn").addEventListener("click", () => toggleTokenMenu("tokens"));
  document.getElementById("creatures-window-btn").addEventListener("click", () => toggleCreaturesWindow());
  document.getElementById("maps-menu-btn").addEventListener("click", () => toggleMapMenu("maps"));
}
var Token = class {
  constructor(id, image, size, relative) {
    this.id = id;
    this.image = image;
    this.size = size;
    this.relative = relative;
  }
};
socket2.on("UPDATE_PLAYER_LIST", (clientList) => {
  playerList = [];
  for (let client2 of clientList) {
    playerList.push(client2.nickname);
  }
  togglePlayerList();
  togglePlayerList();
});
socket2.on("PLACE_TOKEN", (cell, token, username) => {
  const newCell = findCell(cell.x, cell.y);
  createToken(newCell, token, username);
});
socket2.on("REMOVE_TOKEN", (cell) => {
  const newCell = findCell(cell.x, cell.y);
  newCell.innerHTML = "";
});

// src/scripts/character-sheet.ts
var _character = character.value;
var sheetOpen = false;
function toggleCharacterSheet() {
  sheetOpen = !sheetOpen;
  if (sheetOpen) {
    let strMod = Math.floor((_character.str - 10) / 2);
    let dexMod = Math.floor((_character.dex - 10) / 2);
    let conMod = Math.floor((_character.con - 10) / 2);
    let intMod = Math.floor((_character.int - 10) / 2);
    let wisMod = Math.floor((_character.wis - 10) / 2);
    let charMod = Math.floor((_character.char - 10) / 2);
    const sheetWindow = document.querySelector("body").appendChild(document.createElement("div"));
    sheetWindow.classList.add("character-sheet");
    sheetWindow.insertAdjacentHTML("beforeend", `
            <div class="sheet-content">
                <div class="character-sheet__header">
                    <img class="character-sheet__image" src=${_character.image}>
                    <h2>${_character.name}</h2>
                </div>
                <div class="character-sheet__main">
                    <p>Level ${_character.level}</p>
                </div>
                <div class="character-sheet__main">
                    <p>${_character.race} ${_character.class} ${_character.background}</p>
                </div>
                <div class="character-sheet__main">
                    <p>Prof bonus: +${_character.prof_bonus} Hit dice: ${_character.level}d${_character.hit_dice}</p>
                </div>
                <div class="character-sheet__main">
                    <p>AC: ${_character.ac} Initiative: ${_character.initiative} Movement: ${_character.movement}</p>
                </div>
                <div class="character-sheet__health--temp">
                    <p class="temp-hp"><img src="../images/heart-blue.png"> ${_character.temp_health}</p>
                </div>
                <div class="character-sheet__health">
                    <p class="hp"><img src="../images/heart-red.png"> ${_character.max_health} / ${_character.current_health}</p>
                </div>
                <div class="character-sheet__health-tracker">
                    <form onsubmit="damageHp(event)"><p>Damage <button type="submit">-</button><input type="number" onchange="dmgAddInput = event.target.value"></p></form>
                    <form onsubmit="healHp(event)"><p>Heal <button type="submit">+</button><input type="number" onchange="healAddInput = event.target.value"></p></form>
                    <form onsubmit="addTempHp(event)"><p>Temp Hp <button type="submit">+</button><input type="number" onchange="tempAddInput = event.target.value"></p></form>
                </div>
                <div class="character-sheet__scores">
                    <div class="character-sheet__score-box">
                        <p>Str</p>
                        <p>${_character.str}</p>
                        <div class="character-sheet__modifier-box">
                            <p>${strMod < 0 ? "" : "+"} ${strMod}</p>
                        </div>
                    </div>
                    <div class="character-sheet__score-box">
                        <p>Dex</p>
                        <p>${_character.dex}</p>
                        <div class="character-sheet__modifier-box">
                            <p>${dexMod < 0 ? "" : "+"} ${dexMod}</p>
                        </div>
                    </div>
                    <div class="character-sheet__score-box">
                        <p>Con</p>
                        <p>${_character.con}</p>
                        <div class="character-sheet__modifier-box">
                            <p>${conMod < 0 ? "" : "+"} ${conMod}</p>
                        </div>
                    </div>
                    <div class="character-sheet__score-box">
                        <p>Int</p>
                        <p>${_character.int}</p>
                        <div class="character-sheet__modifier-box">
                            <p>${intMod < 0 ? "" : "+"} ${intMod}</p>
                        </div>
                    </div>
                    <div class="character-sheet__score-box">
                        <p>Wis</p>
                        <p>${_character.wis}</p>
                        <div class="character-sheet__modifier-box">
                            <p>${wisMod < 0 ? "" : "+"} ${wisMod}</p>
                        </div>
                    </div>
                    <div class="character-sheet__score-box">
                        <p>Char</p>
                        <p>${_character.char}</p>
                        <div class="character-sheet__modifier-box">
                            <p>${charMod < 0 ? "" : "+"} ${charMod}</p>
                        </div>
                    </div>
                </div>
            </div>
        `);
    disableHotkeys();
    dragElement(sheetWindow, "character-sheet");
  } else {
    document.querySelector(".character-sheet").remove();
  }
}

// src/scripts/input.ts
var canScale = false;
var targetPosX;
var targetPosY;
var dragging = false;
var canUseHotkey = { value: true };
document.addEventListener("keydown", (e) => {
  if (canUseHotkey.value) {
    switch (true) {
      case (e.key === "Meta" || e.key === "Control"):
        canScale = true;
        break;
      case e.key === "Delete":
        for (const _token of document.getElementsByClassName("token")) {
          if (_token.classList.contains("token--selected"))
            _token.remove();
        }
        break;
      case (e.key === "+" || e.key === "="):
        zoomIn();
        break;
      case (e.key === "-" || e.key === "_"):
        zoomOut();
        break;
      case e.which === 49:
        client.clientType === "dm" ? toggleTokenMenu("tokens") : toggleCharacterMenu("characters");
        break;
      case e.which === 50:
        client.clientType === "dm" ? toggleCreaturesWindow() : toggleCharacterSheet();
        break;
      case e.which === 51:
        client.clientType === "dm" ? toggleMapMenu("maps") : console.log("nothing");
        break;
      default:
        break;
    }
  }
});
document.addEventListener("keyup", (e) => {
  switch (true) {
    case (e.key === "Meta" || e.key === "ControlLeft"):
      canScale = false;
      break;
    default:
      break;
  }
});
document.addEventListener("mousedown", (e) => {
  switch (true) {
    case e.which === 2:
      e.preventDefault();
      targetPosX = e.x;
      targetPosY = e.y;
      dragging = true;
      break;
    default:
      break;
  }
});
document.addEventListener("mouseup", (e) => {
  switch (true) {
    case e.which === 2:
      dragging = false;
      document.querySelector(".game-page-container").classList.remove("panning");
      break;
    default:
      break;
  }
});
document.addEventListener("mousemove", (e) => {
  const mousePosX = e.x;
  const mousePosY = e.y;
  if (dragging) {
    document.querySelector(".grid-container").scrollBy((targetPosX - mousePosX) / 25, (targetPosY - mousePosY) / 25);
    document.querySelector(".game-page-container").classList.add("panning");
  }
});

// src/scripts/utils.ts
var menuOpen = { value: false };
var selectedMenu = { value: "" };
var clamp = (num, min, max) => Math.min(Math.max(num, min), max);
function findCell(x2, y2) {
  for (const cell of cells) {
    if (cell.getAttribute("x") === x2.toString() && cell.getAttribute("y") === y2.toString()) {
      return cell;
    }
  }
}
function closeMenu(menuName) {
  if (selectedMenu.value === menuName) {
    document.querySelector(".menu").remove();
    menuOpen.value = false;
  } else {
    document.querySelector(".menu").remove();
    menuOpen.value = false;
    switch (menuName) {
      case "tokens":
        toggleTokenMenu("");
        break;
      case "maps":
        toggleMapMenu("");
        break;
      case "characters":
        toggleCharacterMenu("");
      default:
        break;
    }
  }
}
function changeRoute(route) {
  const wl = window.location;
  window.location.replace(`${wl.protocol}//${wl.host}/${route}`);
}
function dragElement(elmnt, headerName) {
  var pos1 = 0, pos2 = 0, pos3 = 0, pos4 = 0;
  if (document.querySelector(`.${headerName}__header`)) {
    document.querySelector(`.${headerName}__header`).addEventListener("mousedown", dragMouseDown);
  } else {
    elmnt.addEventListener("mousedown", dragMouseDown);
  }
  function dragMouseDown(e) {
    e = e || window.event;
    e.preventDefault();
    pos3 = e.clientX;
    pos4 = e.clientY;
    document.onmouseup = closeDragElement;
    document.onmousemove = elementDrag;
  }
  function elementDrag(e) {
    e = e || window.event;
    e.preventDefault();
    pos1 = pos3 - e.clientX;
    pos2 = pos4 - e.clientY;
    pos3 = e.clientX;
    pos4 = e.clientY;
    elmnt.style.top = elmnt.offsetTop - pos2 + "px";
    elmnt.style.left = elmnt.offsetLeft - pos1 + "px";
  }
  function closeDragElement() {
    document.onmouseup = null;
    document.onmousemove = null;
  }
}
function disableHotkeys() {
  for (let input of document.querySelectorAll("input")) {
    input.addEventListener("focusin", () => {
      canUseHotkey.value = false;
    });
    input.addEventListener("focusout", () => {
      canUseHotkey.value = true;
    });
  }
}

// src/scripts/creatures.ts
var creatures = { value: [] };
var customCreatures = { value: [] };
var creaturesOpen = false;
var creatureFormOpen;
function toggleCreaturesWindow() {
  creaturesOpen = !creaturesOpen;
  if (creaturesOpen) {
    renderCreatureWindow();
    getCreaturesBodyData();
  } else {
    document.querySelector(".creatures-window").remove();
  }
}
function renderCreatureWindow() {
  const window2 = document.querySelector("body").appendChild(document.createElement("div"));
  window2.classList.add("creatures-window");
  window2.insertAdjacentHTML("beforeend", `
        <div class="creatures-content">
            <div class="creatures-window__header">
                <h2>Creatures</h2>
            </div>
            <div class="creature-window__filters">
                <label>
                    <select id="creature-list-filter" onchange="filterCreaturesList(event.target.value)">
                        <option value="all">All creatures</option>
                        <option value="standard">Standard</option>
                        <option value="custom">Custom</option>
                    </select>
                </label>
                <label>
                    <input placeholder="search" onchange="searchCreaturesList(event.target.value)">
                </label>
                <button class="btn--hover" id="new-creature-form-btn">New Creature</button>
            </div>
            <div class="creatures-window__body"></div>
        </div>
    `);
  document.getElementById("new-creature-form-btn").addEventListener("click", () => {
    toggleNewCreatureForm();
  });
  dragElement(window2, "creatures-window");
}
function getCreaturesBodyData() {
  return __async(this, null, function* () {
    yield getCustomCreatures();
    for (let creature of customCreatures.value) {
      renderCustomCreatureRow(creature);
    }
    for (let creature of creatures.value) {
      renderStandardCreatureRow(creature);
    }
  });
}
function renderStandardCreatureRow(creature) {
  document.querySelector(".creatures-window__body").insertAdjacentHTML("beforeend", `
        <div class="creatures-window__standard-creature">
            <div class="creatures-window__item creature-row-click-ev">
                <p>${creature.name}</p>
            </div>
        </div>
    `);
  addCreatureRowEvents("standard", creature.index);
}
function renderCustomCreatureRow(creature) {
  document.querySelector(".creatures-window__body").insertAdjacentHTML("beforeend", `
        <div class="creatures-window__custom-creature">
            <div class="creatures-window__item creature-row-click-ev">
                <p>${creature.name}</p>
            </div>
            <i class="fa-solid fa-trash-can" onclick="deleteCreature('${creature.index}')"></i>
        </div>
    `);
  addCreatureRowEvents("custom", creature.index);
}
function addCreatureRowEvents(rowType, index) {
  const row = document.querySelector(".creature-row-click-ev");
  switch (rowType) {
    case "standard":
      row.addEventListener("click", () => {
        openCreatureStatsWindow(index, false);
      });
      row.classList.remove("creature-row-click-ev");
      break;
    case "custom":
      row.addEventListener("click", () => {
        openCreatureStatsWindow(index, true);
      });
      row.classList.remove("creature-row-click-ev");
      break;
    default:
      break;
  }
}
var creatureFormBody = `
<div class="creatures-content">
    <button class="btn--window-close" onclick="toggleNewCreatureForm()">X</button>
    <div class="creatures-window-form__header">
        <h2>New Creature</h2>
    </div>
    <form class="creatures-window-form__body" onsubmit="submitCreatureForm(event)">
        <label>Token
            <input type="file">
        </label>
        <div class="creatures-window-form__body--box">
            <label>Name
                <input required onchange="creatureFormName = event.target.value">
            </label>
            <label>Size
                <select onchange="creatureFormSize = event.target.value">
                    <option value="tiny">Tiny</option>
                    <option value="small">Small</option>
                    <option value="medium" selected>Medium</option>
                    <option value="large">Large</option>
                    <option value="huge">Huge</option>
                    <option value="gargantuan">Gargantuan</option>
                </select>
            </label>
            <label>Type
                <input class="input--md" onchange="creatureFormType = event.target.value">
            </label>
            <label>Alignment
                <input class="input--sm" onchange="creatureFormAlignment = event.target.value">
            </label>
            <label>AC
                <input class="input--sm" type="number" onchange="creatureFormAc = event.target.value">
            </label>
            <label>Hit Points
                <input class="input--sm" type="number" onchange="creatureFormHitPoints = event.target.value">
            </label>
            <label>Hit Dice
                <input class="input--sm" onchange="creatureFormHitDice = event.target.value">
            </label>
        </div>
        <div class="creatures-window-form__body--box">
            <div>
                <div class="form__input-add form__input-add--speed">
                    <label>Movement
                        <div class="flex-container">
                            <p>Walk</p>
                            <input placeholder="30" type="number" class="input--sm creature-inputs__speed-value" onchange="creatureFormWalk = event.target.value">
                        </div>
                        <div class="flex-container">
                            <p>Swim</p>
                            <input placeholder="30" type="number" class="input--sm creature-inputs__speed-value" onchange="creatureFormSwim = event.target.value">
                        </div>
                        <div class="flex-container">
                            <p>Burrow</p>
                            <input placeholder="30" type="number" class="input--sm creature-inputs__speed-value" onchange="creatureFormBurrow = event.target.value">
                        </div>
                        <div class="flex-container">
                            <p>Fly</p>
                            <input placeholder="30" type="number" class="input--sm creature-inputs__speed-value" onchange="creatureFormFly = event.target.value">
                        </div>
                        <div class="flex-container">
                            <p>Climb</p>
                            <input placeholder="30" type="number" class="input--sm creature-inputs__speed-value" onchange="creatureFormClimb = event.target.value">
                        </div>
                    </label>
                </div>
            </div>
        </div>
        <div class="creatures-window-form__body--box">
            <label>Str
                <input class="input--sm" type="number" onchange="creatureFormStr = event.target.value" placeholder="10">
            </label>
            <label>Dex
                <input class="input--sm" type="number" onchange="creatureFormDex = event.target.value" placeholder="10">
            </label>
            <label>Con
                <input class="input--sm" type="number" onchange="creatureFormCon = event.target.value" placeholder="10">
            </label>
            <label>Int
                <input class="input--sm" type="number" onchange="creatureFormInt = event.target.value" placeholder="10">
            </label>
            <label>Wis
                <input class="input--sm" type="number" onchange="creatureFormWis = event.target.value" placeholder="10">
            </label>
            <label>Char
                <input class="input--sm" type="number" onchange="creatureFormChar = event.target.value" placeholder="10">
            </label>
        </div>
        <div class="creatures-window-form__body--box">
            <div>
                <div class="form__input-add form__input-add--proficiency">
                    <label>Proficiencies
                        <div class="flex-container">
                            <input placeholder="Perception" class="input--md creature-inputs__proficiency-name">
                            <input placeholder="6" type="number" class="input--sm creature-inputs__proficiency-value">
                        </div>
                    </label>
                </div>
                <button type="button" onclick="addInputs('proficiency')" class="creature-form__btn--input">Add proficiency</button>
            </div>
        </div>
        <div class="creatures-window-form__body--box">
            <label>Vulnerabilities
                <textarea rows="3" cols="40" placeholder="fire, thunder" onchange="creatureFormVul = event.target.value"></textarea>
            </label>
        </div>
        <div class="creatures-window-form__body--box">
            <label>Resistances
                <textarea rows="3" cols="40" placeholder="poison, bludgeoning" onchange="creatureFormRes = event.target.value"></textarea>
            </label>
        </div>
        <div class="creatures-window-form__body--box">
            <label>Damage Immunities
                <textarea rows="3" cols="40" placeholder="nonmagical slashing" onchange="creatureFormDmgImmune = event.target.value"></textarea>
            </label>
        </div>
        <div class="creatures-window-form__body--box">
            <label>Condition Immunities
                <textarea rows="3" cols="40" placeholder="prone, restrained" onchange="creatureFormConImmune = event.target.value"></textarea>
            </label>
        </div>
        <div class="creatures-window-form__body--box">
            <div>
                <div class="form__input-add form__input-add--sense">
                    <label>Senses
                        <div class="flex-container">
                            <input placeholder="Darkvision" class="input--md creature-inputs__sense-name">
                            <input placeholder="60" type="number" class="input--sm creature-inputs__sense-value">
                        </div>
                    </label>
                </div>
                <button type="button" onclick="addInputs('sense')" class="creature-form__btn--input">Add sense</button>
            </div>
        </div>
        <div class="creatures-window-form__body--box">
            <label>Languages
                <textarea rows="3" cols="40" onchange="creatureFormLanguages = event.target.value"></textarea>
            </label>
        </div>
        <div class="creatures-window-form__body--box">
            <label>CR
                <input type="number" class="input--sm" onchange="creatureFormCr = event.target.value">
            </label>
            <label>XP
                <input type="number" class="input--sm" onchange="creatureFormXp = event.target.value">
            </label>
        </div>
        <div class="creatures-window-form__body--box">
            <div>
                <div class="form__input-add form__input-add--ability">
                    <label>Special Abilities
                        <input placeholder="Ability name" class="input--md creature-inputs__ability-name">
                        <textarea rows="3" cols="40" placeholder="description" class="creature-inputs__ability-desc"></textarea>
                    </label>
                </div>
                <button type="button" onclick="addDescInputs('ability')" class="creature-form__btn--input">Add ability</button>
            </div>
        </div>
        <div class="creatures-window-form__body--box">
            <div>
                <div class="form__input-add form__input-add--action">
                    <label>Actions
                        <input placeholder="Action name" class="input--md creature-inputs__action-name">
                        <textarea rows="3" cols="40" placeholder="description" class="creature-inputs__action-desc"></textarea>
                    </label>
                </div>
                <button type="button" onclick="addDescInputs('action')" class="creature-form__btn--input">Add action</button>
            </div>
        </div>
        <div class="creatures-window-form__body--box">
            <div>
                <div class="form__input-add form__input-add--leg-action">
                    <label>Legendary Actions
                        <input placeholder="Action name" class="input--md creature-inputs__leg-action-name">
                        <textarea rows="3" cols="40" placeholder="description" class="creature-inputs__leg-action-desc"></textarea>
                    </label>
                </div>
                <button type="button" onclick="addDescInputs('leg-action')" class="creature-form__btn--input">Add Legendary action</button>
            </div>
        </div>
        <br/>
        <button type="submit">Add Creature</button>
    </form>
</div>
`;
function toggleNewCreatureForm() {
  creatureFormOpen = !creatureFormOpen;
  if (creatureFormOpen) {
    const window2 = document.querySelector("body").appendChild(document.createElement("div"));
    window2.classList.add("creatures-window-form");
    window2.insertAdjacentHTML("beforeend", creatureFormBody);
    disableHotkeys();
    dragElement(window2, "creatures-window-form");
  } else {
    document.querySelector(".creatures-window-form").remove();
  }
}

// src/scripts/routes/creatures.route.ts
function getCreatures() {
  return __async(this, null, function* () {
    try {
      const res = yield import_axios6.default.get("https://www.dnd5eapi.co/api/monsters");
      creatures.value = res.data.results;
    } catch (err) {
      console.log(err);
    }
  });
}
function getCreatureByIndex(index, custom) {
  return __async(this, null, function* () {
    try {
      if (custom) {
        const res = yield import_axios6.default.get(`/api/creatures/${index}`);
        return modifyResponseCreature(res);
      } else {
        const res = yield import_axios6.default.get(`https://www.dnd5eapi.co/api/monsters/${index}`);
        return modifyResponseStandardCreature(res);
      }
    } catch (err) {
      console.log(err);
    }
  });
}
function modifyResponseStandardCreature(res) {
  const { proficiencies, condition_immunities, senses, special_abilities, actions, legendary_actions } = separateStandardCreatureResponse(res.data);
  const modifiedRes = new Creature(
    null,
    null,
    res.data.index,
    res.data.name,
    res.data.size,
    res.data.type,
    res.data.alignment,
    res.data.armor_class,
    res.data.hit_points,
    res.data.hit_dice,
    res.data.strength,
    res.data.dexterity,
    res.data.constitution,
    res.data.intelligence,
    res.data.wisdom,
    res.data.charisma,
    res.data.challenge_rating,
    res.data.xp,
    res.data.languages,
    removeUnitFromString(res.data.speed.walk),
    removeUnitFromString(res.data.speed.swim),
    removeUnitFromString(res.data.speed.burrow),
    removeUnitFromString(res.data.speed.fly),
    removeUnitFromString(res.data.speed.climb),
    proficiencies,
    res.data.damage_vulnerabilities,
    res.data.damage_resistances,
    res.data.damage_immunities,
    condition_immunities,
    senses,
    special_abilities,
    actions,
    legendary_actions
  );
  console.log(modifiedRes);
  return modifiedRes;
}
function separateStandardCreatureResponse(res) {
  const proficiencies = getCreatureProficiencies(res.proficiencies);
  const condition_immunities = getCreatureConditionImmunities(res.condition_immunities);
  const senses = getCreatureSenses(res.senses);
  const special_abilities = getCreatureAbilities(res.special_abilities);
  const actions = getCreatureActions(res.actions);
  const legendary_actions = getCreatureLegendaryActions(res.legendary_actions);
  return { proficiencies, condition_immunities, senses, special_abilities, actions, legendary_actions };
}
function getCreatureProficiencies(_proficiencies) {
  let proficiencies = [];
  if (_proficiencies.length > 0) {
    _proficiencies.forEach((prof) => {
      proficiencies.push({ name: prof.proficiency.name, value: prof.value });
    });
  }
  return proficiencies;
}
function getCreatureConditionImmunities(_condition_immunities) {
  let condition_immunities = [];
  if (_condition_immunities.length > 0) {
    _condition_immunities.forEach((immunity) => {
      condition_immunities.push(immunity.name);
    });
  }
  return condition_immunities;
}
function getCreatureSenses(_senses) {
  let senses = [];
  if (_senses.darkvision)
    senses.push({ name: "Darkvision", value: removeUnitFromString(_senses.darkvision) });
  if (_senses.blindsight)
    senses.push({ name: "Blindsight", value: removeUnitFromString(_senses.blindsight) });
  if (_senses.tremorsense)
    senses.push({ name: "Tremorsense", value: removeUnitFromString(_senses.tremorsense) });
  if (_senses.truesight)
    senses.push({ name: "Truesight", value: removeUnitFromString(_senses.truesight) });
  if (_senses.passive_perception)
    senses.push({ name: "Passive Perception", value: _senses.passive_perception });
  return senses;
}
function getCreatureAbilities(_special_abilities) {
  let special_abilities = [];
  if (_special_abilities.length > 0) {
    _special_abilities.forEach((ability) => {
      special_abilities.push({ name: ability.name, desc: ability.desc, damage: standardCreatureDamage(ability.damage) });
    });
  }
  return special_abilities;
}
function getCreatureActions(_actions) {
  let actions = [];
  if (_actions.length > 0) {
    _actions.forEach((action) => {
      actions.push({ name: action.name, desc: action.desc, attack_bonus: action.attack_bonus, damage: standardCreatureDamage(action.damage) });
    });
  }
  return actions;
}
function getCreatureLegendaryActions(_legendary_actions) {
  let legendary_actions = [];
  if (_legendary_actions.length > 0) {
    _legendary_actions.forEach((action) => {
      legendary_actions.push({ name: action.name, desc: action.desc, attack_bonus: action.attack_bonus, damage: standardCreatureDamage(action.damage) });
    });
  }
  return legendary_actions;
}
function standardCreatureDamage(damage) {
  let damages = [];
  if (damage) {
    damage.forEach((dmg) => {
      if (dmg.from) {
        dmg.from.options.forEach((dmg2) => {
          damages.push({ damageDice: dmg2.damage_dice, damageType: dmg2.damage_type.index });
        });
      } else {
        damages.push({ damageDice: dmg.damage_dice, damageType: dmg.damage_type.index });
      }
    });
  }
  return damages;
}
function removeUnitFromString(string) {
  let value2;
  if (string) {
    value2 = parseInt(string.split(" ")[0]);
    return value2;
  }
}
function modifyResponseCreature(res) {
  const { proficiencies, vulnerabilities, resistances, damageImmunities, conditionImmunities, senses, abilities, actions, legActions } = separateCreatureResponse(res.data);
  const modifiedRes = new Creature(
    res.data[0].id,
    res.data[0].user_id,
    res.data[0].index,
    res.data[0].name,
    res.data[0].size,
    res.data[0].type,
    res.data[0].alignment,
    res.data[0].ac,
    res.data[0].hit_points,
    res.data[0].hit_dice,
    res.data[0].str,
    res.data[0].dex,
    res.data[0].con,
    res.data[0].int,
    res.data[0].wis,
    res.data[0].char,
    res.data[0].cr,
    res.data[0].xp,
    res.data[0].list,
    res.data[0].walk_speed,
    res.data[0].swim_speed,
    res.data[0].burrow_speed,
    res.data[0].fly_speed,
    res.data[0].climb_speed,
    proficiencies,
    vulnerabilities,
    resistances,
    damageImmunities,
    conditionImmunities,
    senses,
    abilities,
    actions,
    legActions
  );
  console.log(modifiedRes);
  return modifiedRes;
}
function separateCreatureResponse(res) {
  let { proficiencies, vulnerabilities, resistances, damageImmunities, conditionImmunities, senses, abilities, actions, legActions } = getInitialCreatureArrays(res);
  proficiencies = removeExtraCustomData(proficiencies, true);
  vulnerabilities = removeExtraCustomData(vulnerabilities, false);
  resistances = removeExtraCustomData(resistances, false);
  damageImmunities = removeExtraCustomData(damageImmunities, false);
  conditionImmunities = removeExtraCustomData(conditionImmunities, false);
  senses = removeExtraCustomData(senses, true);
  abilities = removeExtraCustomData(abilities, true);
  actions = removeExtraCustomData(actions, true);
  legActions = removeExtraCustomData(legActions, true);
  let modifiedAbilities = [];
  abilities.forEach((ability) => {
    if (ability.name && ability.desc) {
      const abilityData = getActionDesc(ability.desc);
      modifiedAbilities.push({ name: ability.name, desc: abilityData.desc, damage: [separateDmgRoll(abilityData.rolls.toString())] });
    }
  });
  abilities = modifiedAbilities;
  let modifiedActions = [];
  actions.forEach((action) => {
    if (action.name && action.desc) {
      const actionData = getActionDesc(action.desc);
      modifiedActions.push({ name: action.name, desc: actionData.desc, attack_bonus: actionData.toHit, damage: [separateDmgRoll(actionData.rolls.toString())] });
    }
  });
  actions = modifiedActions;
  let modifiedLegActions = [];
  legActions.forEach((action) => {
    if (action.name && action.desc) {
      const legActionData = getActionDesc(action.desc);
      modifiedLegActions.push({ name: action.name, desc: legActionData.desc, attack_bonus: legActionData.toHit, damage: [separateDmgRoll(legActionData.rolls.toString())] });
    }
  });
  legActions = modifiedLegActions;
  const { _proficiencies, _resistances, _vulnerabilities, _senses } = emptyNullArrays(proficiencies, resistances, vulnerabilities, senses);
  return { proficiencies: _proficiencies, vulnerabilities: _vulnerabilities, resistances: _resistances, damageImmunities, conditionImmunities, senses: _senses, abilities, actions, legActions };
}
function getInitialCreatureArrays(res) {
  let proficiencies = [];
  let vulnerabilities = [];
  let resistances = [];
  let damageImmunities = [];
  let conditionImmunities = [];
  let senses = [];
  let abilities = [];
  let actions = [];
  let legActions = [];
  for (let stat of res) {
    proficiencies.push({ name: stat.prof_name, value: stat.prof_value });
    vulnerabilities.push(stat.vul_name);
    resistances.push(stat.res_name);
    senses.push({ name: stat.sense_name, value: stat.sense_value });
    abilities.push({ name: stat.ability_name, desc: stat.ability_desc });
    actions.push({ name: stat.action_name, desc: stat.action_desc });
    legActions.push({ name: stat.leg_action_name, desc: stat.leg_action_desc });
    if (stat.immune_type === "damage") {
      damageImmunities.push(stat.immune_name);
    } else if (stat.immune_type === "condition") {
      conditionImmunities.push(stat.immune_name);
    }
  }
  return { proficiencies, vulnerabilities, resistances, damageImmunities, conditionImmunities, senses, abilities, actions, legActions };
}
function emptyNullArrays(proficiencies, resistances, vulnerabilities, senses) {
  if (proficiencies.length > 0) {
    let exists = false;
    proficiencies.forEach((prof) => {
      if (prof.name && prof.value)
        exists = true;
    });
    if (!exists)
      proficiencies = [];
  }
  if (resistances.length > 0) {
    let exists = false;
    resistances.forEach((resistance) => {
      if (resistance)
        exists = true;
    });
    if (!exists)
      resistances = [];
  }
  if (vulnerabilities.length > 0) {
    let exists = false;
    vulnerabilities.forEach((vul) => {
      if (vul)
        exists = true;
    });
    if (!exists)
      vulnerabilities = [];
  }
  if (senses.length > 0) {
    let exists = false;
    senses.forEach((sense) => {
      if (sense.name && sense.value)
        exists = true;
    });
    if (!exists)
      senses = [];
  }
  return { _proficiencies: proficiencies, _resistances: resistances, _vulnerabilities: vulnerabilities, _senses: senses };
}
function removeExtraCustomData(array, name) {
  let result = [];
  if (name) {
    for (let i2 = 0; i2 < array.length - 1; i2++) {
      if (!result.some((item) => array[i2].name === item.name)) {
        result.push(array[i2]);
      }
    }
  } else {
    for (let i2 = 0; i2 < array.length - 1; i2++) {
      if (!result.some((item) => array[i2] === item)) {
        result.push(array[i2]);
      }
    }
  }
  return result;
}
function getCustomCreatures() {
  return __async(this, null, function* () {
    try {
      const res = yield import_axios6.default.get("/api/creatures");
      customCreatures.value = res.data;
    } catch (err) {
      console.log(err);
    }
  });
}
var Creature = class {
  constructor(id, user_id, index, name, size, type, alignment, ac, hit_points, hit_dice, str, dex, con, int, wis, char, cr, xp, languages, walk_speed, swim_speed, burrow_speed, fly_speed, climb_speed, proficiencies, vulnerabilities, resistances, damageImmunities, conditionImmunities, senses, abilities, actions, legActions) {
    this.id = id;
    this.user_id = user_id;
    this.index = index;
    this.name = name;
    this.size = size;
    this.type = type;
    this.alignment = alignment;
    this.ac = ac;
    this.hit_points = hit_points;
    this.hit_dice = hit_dice;
    this.str = str;
    this.dex = dex;
    this.con = con;
    this.int = int;
    this.wis = wis;
    this.char = char;
    this.cr = cr;
    this.xp = xp;
    this.languages = languages;
    this.speeds = [
      { name: "Walk", value: walk_speed },
      { name: "Swim", value: swim_speed },
      { name: "Burrow", value: burrow_speed },
      { name: "Fly", value: fly_speed },
      { name: "Climb", value: climb_speed }
    ], this.proficiencies = proficiencies;
    this.vulnerabilities = vulnerabilities;
    this.resistances = resistances;
    this.damageImmunities = damageImmunities;
    this.conditionImmunities = conditionImmunities;
    this.senses = senses;
    this.abilities = abilities;
    this.actions = actions;
    this.legActions = legActions;
  }
};

// src/scripts/dashboard.ts
var socket3 = lookup2();
var gamesList = { value: [] };
var gameFormOpen = false;
var gameNameInput;
var client;
var room;
var prevGame;
var roomCode;
function setupGame() {
  return __async(this, null, function* () {
    getGames();
    prevGame = yield getPrevGame();
    roomCode = prevGame.code;
    document.getElementById("room-code-input").value = prevGame.code;
    getCreatures();
  });
}
function joinPlayer(roomCode2, e) {
  e.preventDefault();
  room = roomCode2;
  socket3.emit("JOIN_ROOM", "player", roomCode2, (roomExists, newClient) => {
    if (roomExists) {
      client = newClient;
      gameScreen();
      addPrevGame({ game: roomCode2 });
      socket3.emit("FETCH_BOARD");
    } else {
      console.log("room doesn't exist");
    }
  });
}
document.getElementById("join-player-btn").addEventListener("click", (e) => {
  e.preventDefault();
  joinPlayer(roomCode, e);
});
function joinDM(roomCode2) {
  room = roomCode2;
  socket3.emit("JOIN_ROOM", "dm", roomCode2, (roomExists, newClient) => {
    if (roomExists) {
      client = newClient;
      gameScreen();
    } else {
      console.log("game already started");
    }
  });
}
function setGamesList() {
  document.querySelector(".games-list__content").remove();
  const listContent = document.querySelector(".games-list").appendChild(document.createElement("div"));
  listContent.classList.add("games-list__content");
  const gamesListEl = document.querySelector(".games-list__content");
  for (let game of gamesList.value) {
    gamesListEl.insertAdjacentHTML("beforeend", `
            <button class="game-list__item" room-code='${game.code}'>${game.name}</button>
        `);
  }
  gamesListEl.insertAdjacentHTML("beforeend", `
        <button class="games-list__button btn--hover" id="create-campaign-btn">Create Campaign</button>
    `);
}
document.addEventListener("click", (e) => {
  e.preventDefault();
  const target = e.target;
  if (target.matches("#create-campaign-btn")) {
    addGameForm();
  } else if (target.matches(".game-list__item")) {
    joinDM(target.getAttribute("room-code"));
  } else if (target.matches("#add-game-btn")) {
    addGame({ name: gameNameInput });
  } else if (target.matches("#logout-btn-dashboard")) {
    logout();
  } else if (target.matches("#login-btn")) {
    loginUser({ username: document.getElementById("login-username").value, password: document.getElementById("login-password").value });
  }
});
function addGameForm() {
  gameFormOpen = !gameFormOpen;
  if (gameFormOpen) {
    document.querySelector(".games-list__content").insertAdjacentHTML("beforeend", `
            <form class="form--add-game">
                <input placeholder="name" onchange="gameNameInput = event.target.value" required>
                <button class="button--submit btn--hover" id="add-game-btn" type="submit">Submit</button>
            </form>
        `);
  } else {
    document.querySelector(".form--add-game").remove();
  }
}
function gameScreen() {
  document.querySelector(".dashboard-page-container").remove();
  document.querySelector(".page-container").insertAdjacentHTML("beforeend", `
        <section class="game-page-container">
            <div class="sidebar"></div>
            <div class="game-content">
                <div class="toolbar">
                    <button class="toolbar__btn" onclick="zoomIn()">+</button>
                    <button class="toolbar__btn" onclick="zoomOut()">-</button>
                    <button class="toolbar__btn" onclick="togglePlayerList()">Show Players</button>
                    <p class="toolbar__text">Room: ${room}</p>
                    <a class="toolbar__leave-btn" onclick="leaveRoom()">Leave Game</a>
                </div>
                <div class="grid-container">
                    <table id="grid"></table>
                </div>
            </div>
        </section>
    `);
  gamePageLoaded();
}

// src/index.ts
var socket4 = lookup2();
document.addEventListener("DOMContentLoaded", () => {
  setupGame();
});
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsiLi4vLi4vbm9kZV9tb2R1bGVzL2F4aW9zL2xpYi9oZWxwZXJzL2JpbmQuanMiLCAiLi4vLi4vbm9kZV9tb2R1bGVzL2F4aW9zL2xpYi91dGlscy5qcyIsICIuLi8uLi9ub2RlX21vZHVsZXMvYXhpb3MvbGliL2hlbHBlcnMvYnVpbGRVUkwuanMiLCAiLi4vLi4vbm9kZV9tb2R1bGVzL2F4aW9zL2xpYi9jb3JlL0ludGVyY2VwdG9yTWFuYWdlci5qcyIsICIuLi8uLi9ub2RlX21vZHVsZXMvYXhpb3MvbGliL2hlbHBlcnMvbm9ybWFsaXplSGVhZGVyTmFtZS5qcyIsICIuLi8uLi9ub2RlX21vZHVsZXMvYXhpb3MvbGliL2NvcmUvQXhpb3NFcnJvci5qcyIsICIuLi8uLi9ub2RlX21vZHVsZXMvYXhpb3MvbGliL2RlZmF1bHRzL3RyYW5zaXRpb25hbC5qcyIsICIuLi8uLi9ub2RlX21vZHVsZXMvYXhpb3MvbGliL2hlbHBlcnMvdG9Gb3JtRGF0YS5qcyIsICIuLi8uLi9ub2RlX21vZHVsZXMvYXhpb3MvbGliL2NvcmUvc2V0dGxlLmpzIiwgIi4uLy4uL25vZGVfbW9kdWxlcy9heGlvcy9saWIvaGVscGVycy9jb29raWVzLmpzIiwgIi4uLy4uL25vZGVfbW9kdWxlcy9heGlvcy9saWIvaGVscGVycy9pc0Fic29sdXRlVVJMLmpzIiwgIi4uLy4uL25vZGVfbW9kdWxlcy9heGlvcy9saWIvaGVscGVycy9jb21iaW5lVVJMcy5qcyIsICIuLi8uLi9ub2RlX21vZHVsZXMvYXhpb3MvbGliL2NvcmUvYnVpbGRGdWxsUGF0aC5qcyIsICIuLi8uLi9ub2RlX21vZHVsZXMvYXhpb3MvbGliL2hlbHBlcnMvcGFyc2VIZWFkZXJzLmpzIiwgIi4uLy4uL25vZGVfbW9kdWxlcy9heGlvcy9saWIvaGVscGVycy9pc1VSTFNhbWVPcmlnaW4uanMiLCAiLi4vLi4vbm9kZV9tb2R1bGVzL2F4aW9zL2xpYi9jYW5jZWwvQ2FuY2VsZWRFcnJvci5qcyIsICIuLi8uLi9ub2RlX21vZHVsZXMvYXhpb3MvbGliL2hlbHBlcnMvcGFyc2VQcm90b2NvbC5qcyIsICIuLi8uLi9ub2RlX21vZHVsZXMvYXhpb3MvbGliL2FkYXB0ZXJzL3hoci5qcyIsICIuLi8uLi9ub2RlX21vZHVsZXMvYXhpb3MvbGliL2hlbHBlcnMvbnVsbC5qcyIsICIuLi8uLi9ub2RlX21vZHVsZXMvYXhpb3MvbGliL2RlZmF1bHRzL2luZGV4LmpzIiwgIi4uLy4uL25vZGVfbW9kdWxlcy9heGlvcy9saWIvY29yZS90cmFuc2Zvcm1EYXRhLmpzIiwgIi4uLy4uL25vZGVfbW9kdWxlcy9heGlvcy9saWIvY2FuY2VsL2lzQ2FuY2VsLmpzIiwgIi4uLy4uL25vZGVfbW9kdWxlcy9heGlvcy9saWIvY29yZS9kaXNwYXRjaFJlcXVlc3QuanMiLCAiLi4vLi4vbm9kZV9tb2R1bGVzL2F4aW9zL2xpYi9jb3JlL21lcmdlQ29uZmlnLmpzIiwgIi4uLy4uL25vZGVfbW9kdWxlcy9heGlvcy9saWIvZW52L2RhdGEuanMiLCAiLi4vLi4vbm9kZV9tb2R1bGVzL2F4aW9zL2xpYi9oZWxwZXJzL3ZhbGlkYXRvci5qcyIsICIuLi8uLi9ub2RlX21vZHVsZXMvYXhpb3MvbGliL2NvcmUvQXhpb3MuanMiLCAiLi4vLi4vbm9kZV9tb2R1bGVzL2F4aW9zL2xpYi9jYW5jZWwvQ2FuY2VsVG9rZW4uanMiLCAiLi4vLi4vbm9kZV9tb2R1bGVzL2F4aW9zL2xpYi9oZWxwZXJzL3NwcmVhZC5qcyIsICIuLi8uLi9ub2RlX21vZHVsZXMvYXhpb3MvbGliL2hlbHBlcnMvaXNBeGlvc0Vycm9yLmpzIiwgIi4uLy4uL25vZGVfbW9kdWxlcy9heGlvcy9saWIvYXhpb3MuanMiLCAiLi4vLi4vbm9kZV9tb2R1bGVzL2F4aW9zL2luZGV4LmpzIiwgIi4uLy4uL25vZGVfbW9kdWxlcy9lbmdpbmUuaW8tcGFyc2VyL2J1aWxkL2VzbS9jb21tb25zLmpzIiwgIi4uLy4uL25vZGVfbW9kdWxlcy9lbmdpbmUuaW8tcGFyc2VyL2J1aWxkL2VzbS9lbmNvZGVQYWNrZXQuYnJvd3Nlci5qcyIsICIuLi8uLi9ub2RlX21vZHVsZXMvZW5naW5lLmlvLXBhcnNlci9idWlsZC9lc20vY29udHJpYi9iYXNlNjQtYXJyYXlidWZmZXIuanMiLCAiLi4vLi4vbm9kZV9tb2R1bGVzL2VuZ2luZS5pby1wYXJzZXIvYnVpbGQvZXNtL2RlY29kZVBhY2tldC5icm93c2VyLmpzIiwgIi4uLy4uL25vZGVfbW9kdWxlcy9lbmdpbmUuaW8tcGFyc2VyL2J1aWxkL2VzbS9pbmRleC5qcyIsICIuLi8uLi9ub2RlX21vZHVsZXMvQHNvY2tldC5pby9jb21wb25lbnQtZW1pdHRlci9pbmRleC5tanMiLCAiLi4vLi4vbm9kZV9tb2R1bGVzL2VuZ2luZS5pby1jbGllbnQvYnVpbGQvZXNtL2dsb2JhbFRoaXMuYnJvd3Nlci5qcyIsICIuLi8uLi9ub2RlX21vZHVsZXMvZW5naW5lLmlvLWNsaWVudC9idWlsZC9lc20vdXRpbC5qcyIsICIuLi8uLi9ub2RlX21vZHVsZXMvZW5naW5lLmlvLWNsaWVudC9idWlsZC9lc20vdHJhbnNwb3J0LmpzIiwgIi4uLy4uL25vZGVfbW9kdWxlcy9lbmdpbmUuaW8tY2xpZW50L2J1aWxkL2VzbS9jb250cmliL3llYXN0LmpzIiwgIi4uLy4uL25vZGVfbW9kdWxlcy9lbmdpbmUuaW8tY2xpZW50L2J1aWxkL2VzbS9jb250cmliL3BhcnNlcXMuanMiLCAiLi4vLi4vbm9kZV9tb2R1bGVzL2VuZ2luZS5pby1jbGllbnQvYnVpbGQvZXNtL2NvbnRyaWIvaGFzLWNvcnMuanMiLCAiLi4vLi4vbm9kZV9tb2R1bGVzL2VuZ2luZS5pby1jbGllbnQvYnVpbGQvZXNtL3RyYW5zcG9ydHMveG1saHR0cHJlcXVlc3QuYnJvd3Nlci5qcyIsICIuLi8uLi9ub2RlX21vZHVsZXMvZW5naW5lLmlvLWNsaWVudC9idWlsZC9lc20vdHJhbnNwb3J0cy9wb2xsaW5nLmpzIiwgIi4uLy4uL25vZGVfbW9kdWxlcy9lbmdpbmUuaW8tY2xpZW50L2J1aWxkL2VzbS90cmFuc3BvcnRzL3dlYnNvY2tldC1jb25zdHJ1Y3Rvci5icm93c2VyLmpzIiwgIi4uLy4uL25vZGVfbW9kdWxlcy9lbmdpbmUuaW8tY2xpZW50L2J1aWxkL2VzbS90cmFuc3BvcnRzL3dlYnNvY2tldC5qcyIsICIuLi8uLi9ub2RlX21vZHVsZXMvZW5naW5lLmlvLWNsaWVudC9idWlsZC9lc20vdHJhbnNwb3J0cy9pbmRleC5qcyIsICIuLi8uLi9ub2RlX21vZHVsZXMvZW5naW5lLmlvLWNsaWVudC9idWlsZC9lc20vY29udHJpYi9wYXJzZXVyaS5qcyIsICIuLi8uLi9ub2RlX21vZHVsZXMvZW5naW5lLmlvLWNsaWVudC9idWlsZC9lc20vc29ja2V0LmpzIiwgIi4uLy4uL25vZGVfbW9kdWxlcy9lbmdpbmUuaW8tY2xpZW50L2J1aWxkL2VzbS9pbmRleC5qcyIsICIuLi8uLi9ub2RlX21vZHVsZXMvc29ja2V0LmlvLWNsaWVudC9idWlsZC9lc20vdXJsLmpzIiwgIi4uLy4uL25vZGVfbW9kdWxlcy9zb2NrZXQuaW8tY2xpZW50L25vZGVfbW9kdWxlcy9zb2NrZXQuaW8tcGFyc2VyL2J1aWxkL2VzbS9pbmRleC5qcyIsICIuLi8uLi9ub2RlX21vZHVsZXMvc29ja2V0LmlvLWNsaWVudC9ub2RlX21vZHVsZXMvc29ja2V0LmlvLXBhcnNlci9idWlsZC9lc20vaXMtYmluYXJ5LmpzIiwgIi4uLy4uL25vZGVfbW9kdWxlcy9zb2NrZXQuaW8tY2xpZW50L25vZGVfbW9kdWxlcy9zb2NrZXQuaW8tcGFyc2VyL2J1aWxkL2VzbS9iaW5hcnkuanMiLCAiLi4vLi4vbm9kZV9tb2R1bGVzL3NvY2tldC5pby1jbGllbnQvYnVpbGQvZXNtL29uLmpzIiwgIi4uLy4uL25vZGVfbW9kdWxlcy9zb2NrZXQuaW8tY2xpZW50L2J1aWxkL2VzbS9zb2NrZXQuanMiLCAiLi4vLi4vbm9kZV9tb2R1bGVzL3NvY2tldC5pby1jbGllbnQvYnVpbGQvZXNtL2NvbnRyaWIvYmFja28yLmpzIiwgIi4uLy4uL25vZGVfbW9kdWxlcy9zb2NrZXQuaW8tY2xpZW50L2J1aWxkL2VzbS9tYW5hZ2VyLmpzIiwgIi4uLy4uL25vZGVfbW9kdWxlcy9zb2NrZXQuaW8tY2xpZW50L2J1aWxkL2VzbS9pbmRleC5qcyIsICIuLi9zY3JpcHRzL3JvdXRlcy9kYXNoYm9hcmQucm91dGUudHMiLCAiLi4vc2NyaXB0cy9yb3V0ZXMvY3JlYXR1cmVzLnJvdXRlLnRzIiwgIi4uL3NjcmlwdHMvdG9rZW4udHMiLCAiLi4vc2NyaXB0cy9yb3V0ZXMvdG9rZW5zLnJvdXRlLnRzIiwgIi4uL3NjcmlwdHMvbWVudXMvdG9rZW4ubWVudS50cyIsICIuLi9zY3JpcHRzL3JvdXRlcy9tYXBzLnJvdXRlLnRzIiwgIi4uL3NjcmlwdHMvbWVudXMvbWFwLm1lbnUudHMiLCAiLi4vc2NyaXB0cy9yb3V0ZXMvdXNlcnMucm91dGUudHMiLCAiLi4vc2NyaXB0cy9yb3V0ZXMvY2hhcmFjdGVycy5yb3V0ZS50cyIsICIuLi9zY3JpcHRzL21lbnVzL2NoYXJhY3Rlci5tZW51LnRzIiwgIi4uL3NjcmlwdHMvY3JlYXR1cmUtc3RhdHMudHMiLCAiLi4vc2NyaXB0cy9ncmlkLnRzIiwgIi4uL3NjcmlwdHMvY2hhcmFjdGVyLXNoZWV0LnRzIiwgIi4uL3NjcmlwdHMvaW5wdXQudHMiLCAiLi4vc2NyaXB0cy91dGlscy50cyIsICIuLi9zY3JpcHRzL2NyZWF0dXJlcy50cyIsICIuLi9zY3JpcHRzL2Rhc2hib2FyZC50cyIsICIuLi9pbmRleC50cyJdLAogICJzb3VyY2VzQ29udGVudCI6IFsiJ3VzZSBzdHJpY3QnO1xuXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIGJpbmQoZm4sIHRoaXNBcmcpIHtcbiAgcmV0dXJuIGZ1bmN0aW9uIHdyYXAoKSB7XG4gICAgdmFyIGFyZ3MgPSBuZXcgQXJyYXkoYXJndW1lbnRzLmxlbmd0aCk7XG4gICAgZm9yICh2YXIgaSA9IDA7IGkgPCBhcmdzLmxlbmd0aDsgaSsrKSB7XG4gICAgICBhcmdzW2ldID0gYXJndW1lbnRzW2ldO1xuICAgIH1cbiAgICByZXR1cm4gZm4uYXBwbHkodGhpc0FyZywgYXJncyk7XG4gIH07XG59O1xuIiwgIid1c2Ugc3RyaWN0JztcblxudmFyIGJpbmQgPSByZXF1aXJlKCcuL2hlbHBlcnMvYmluZCcpO1xuXG4vLyB1dGlscyBpcyBhIGxpYnJhcnkgb2YgZ2VuZXJpYyBoZWxwZXIgZnVuY3Rpb25zIG5vbi1zcGVjaWZpYyB0byBheGlvc1xuXG52YXIgdG9TdHJpbmcgPSBPYmplY3QucHJvdG90eXBlLnRvU3RyaW5nO1xuXG4vLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgZnVuYy1uYW1lc1xudmFyIGtpbmRPZiA9IChmdW5jdGlvbihjYWNoZSkge1xuICAvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgZnVuYy1uYW1lc1xuICByZXR1cm4gZnVuY3Rpb24odGhpbmcpIHtcbiAgICB2YXIgc3RyID0gdG9TdHJpbmcuY2FsbCh0aGluZyk7XG4gICAgcmV0dXJuIGNhY2hlW3N0cl0gfHwgKGNhY2hlW3N0cl0gPSBzdHIuc2xpY2UoOCwgLTEpLnRvTG93ZXJDYXNlKCkpO1xuICB9O1xufSkoT2JqZWN0LmNyZWF0ZShudWxsKSk7XG5cbmZ1bmN0aW9uIGtpbmRPZlRlc3QodHlwZSkge1xuICB0eXBlID0gdHlwZS50b0xvd2VyQ2FzZSgpO1xuICByZXR1cm4gZnVuY3Rpb24gaXNLaW5kT2YodGhpbmcpIHtcbiAgICByZXR1cm4ga2luZE9mKHRoaW5nKSA9PT0gdHlwZTtcbiAgfTtcbn1cblxuLyoqXG4gKiBEZXRlcm1pbmUgaWYgYSB2YWx1ZSBpcyBhbiBBcnJheVxuICpcbiAqIEBwYXJhbSB7T2JqZWN0fSB2YWwgVGhlIHZhbHVlIHRvIHRlc3RcbiAqIEByZXR1cm5zIHtib29sZWFufSBUcnVlIGlmIHZhbHVlIGlzIGFuIEFycmF5LCBvdGhlcndpc2UgZmFsc2VcbiAqL1xuZnVuY3Rpb24gaXNBcnJheSh2YWwpIHtcbiAgcmV0dXJuIEFycmF5LmlzQXJyYXkodmFsKTtcbn1cblxuLyoqXG4gKiBEZXRlcm1pbmUgaWYgYSB2YWx1ZSBpcyB1bmRlZmluZWRcbiAqXG4gKiBAcGFyYW0ge09iamVjdH0gdmFsIFRoZSB2YWx1ZSB0byB0ZXN0XG4gKiBAcmV0dXJucyB7Ym9vbGVhbn0gVHJ1ZSBpZiB0aGUgdmFsdWUgaXMgdW5kZWZpbmVkLCBvdGhlcndpc2UgZmFsc2VcbiAqL1xuZnVuY3Rpb24gaXNVbmRlZmluZWQodmFsKSB7XG4gIHJldHVybiB0eXBlb2YgdmFsID09PSAndW5kZWZpbmVkJztcbn1cblxuLyoqXG4gKiBEZXRlcm1pbmUgaWYgYSB2YWx1ZSBpcyBhIEJ1ZmZlclxuICpcbiAqIEBwYXJhbSB7T2JqZWN0fSB2YWwgVGhlIHZhbHVlIHRvIHRlc3RcbiAqIEByZXR1cm5zIHtib29sZWFufSBUcnVlIGlmIHZhbHVlIGlzIGEgQnVmZmVyLCBvdGhlcndpc2UgZmFsc2VcbiAqL1xuZnVuY3Rpb24gaXNCdWZmZXIodmFsKSB7XG4gIHJldHVybiB2YWwgIT09IG51bGwgJiYgIWlzVW5kZWZpbmVkKHZhbCkgJiYgdmFsLmNvbnN0cnVjdG9yICE9PSBudWxsICYmICFpc1VuZGVmaW5lZCh2YWwuY29uc3RydWN0b3IpXG4gICAgJiYgdHlwZW9mIHZhbC5jb25zdHJ1Y3Rvci5pc0J1ZmZlciA9PT0gJ2Z1bmN0aW9uJyAmJiB2YWwuY29uc3RydWN0b3IuaXNCdWZmZXIodmFsKTtcbn1cblxuLyoqXG4gKiBEZXRlcm1pbmUgaWYgYSB2YWx1ZSBpcyBhbiBBcnJheUJ1ZmZlclxuICpcbiAqIEBmdW5jdGlvblxuICogQHBhcmFtIHtPYmplY3R9IHZhbCBUaGUgdmFsdWUgdG8gdGVzdFxuICogQHJldHVybnMge2Jvb2xlYW59IFRydWUgaWYgdmFsdWUgaXMgYW4gQXJyYXlCdWZmZXIsIG90aGVyd2lzZSBmYWxzZVxuICovXG52YXIgaXNBcnJheUJ1ZmZlciA9IGtpbmRPZlRlc3QoJ0FycmF5QnVmZmVyJyk7XG5cblxuLyoqXG4gKiBEZXRlcm1pbmUgaWYgYSB2YWx1ZSBpcyBhIHZpZXcgb24gYW4gQXJyYXlCdWZmZXJcbiAqXG4gKiBAcGFyYW0ge09iamVjdH0gdmFsIFRoZSB2YWx1ZSB0byB0ZXN0XG4gKiBAcmV0dXJucyB7Ym9vbGVhbn0gVHJ1ZSBpZiB2YWx1ZSBpcyBhIHZpZXcgb24gYW4gQXJyYXlCdWZmZXIsIG90aGVyd2lzZSBmYWxzZVxuICovXG5mdW5jdGlvbiBpc0FycmF5QnVmZmVyVmlldyh2YWwpIHtcbiAgdmFyIHJlc3VsdDtcbiAgaWYgKCh0eXBlb2YgQXJyYXlCdWZmZXIgIT09ICd1bmRlZmluZWQnKSAmJiAoQXJyYXlCdWZmZXIuaXNWaWV3KSkge1xuICAgIHJlc3VsdCA9IEFycmF5QnVmZmVyLmlzVmlldyh2YWwpO1xuICB9IGVsc2Uge1xuICAgIHJlc3VsdCA9ICh2YWwpICYmICh2YWwuYnVmZmVyKSAmJiAoaXNBcnJheUJ1ZmZlcih2YWwuYnVmZmVyKSk7XG4gIH1cbiAgcmV0dXJuIHJlc3VsdDtcbn1cblxuLyoqXG4gKiBEZXRlcm1pbmUgaWYgYSB2YWx1ZSBpcyBhIFN0cmluZ1xuICpcbiAqIEBwYXJhbSB7T2JqZWN0fSB2YWwgVGhlIHZhbHVlIHRvIHRlc3RcbiAqIEByZXR1cm5zIHtib29sZWFufSBUcnVlIGlmIHZhbHVlIGlzIGEgU3RyaW5nLCBvdGhlcndpc2UgZmFsc2VcbiAqL1xuZnVuY3Rpb24gaXNTdHJpbmcodmFsKSB7XG4gIHJldHVybiB0eXBlb2YgdmFsID09PSAnc3RyaW5nJztcbn1cblxuLyoqXG4gKiBEZXRlcm1pbmUgaWYgYSB2YWx1ZSBpcyBhIE51bWJlclxuICpcbiAqIEBwYXJhbSB7T2JqZWN0fSB2YWwgVGhlIHZhbHVlIHRvIHRlc3RcbiAqIEByZXR1cm5zIHtib29sZWFufSBUcnVlIGlmIHZhbHVlIGlzIGEgTnVtYmVyLCBvdGhlcndpc2UgZmFsc2VcbiAqL1xuZnVuY3Rpb24gaXNOdW1iZXIodmFsKSB7XG4gIHJldHVybiB0eXBlb2YgdmFsID09PSAnbnVtYmVyJztcbn1cblxuLyoqXG4gKiBEZXRlcm1pbmUgaWYgYSB2YWx1ZSBpcyBhbiBPYmplY3RcbiAqXG4gKiBAcGFyYW0ge09iamVjdH0gdmFsIFRoZSB2YWx1ZSB0byB0ZXN0XG4gKiBAcmV0dXJucyB7Ym9vbGVhbn0gVHJ1ZSBpZiB2YWx1ZSBpcyBhbiBPYmplY3QsIG90aGVyd2lzZSBmYWxzZVxuICovXG5mdW5jdGlvbiBpc09iamVjdCh2YWwpIHtcbiAgcmV0dXJuIHZhbCAhPT0gbnVsbCAmJiB0eXBlb2YgdmFsID09PSAnb2JqZWN0Jztcbn1cblxuLyoqXG4gKiBEZXRlcm1pbmUgaWYgYSB2YWx1ZSBpcyBhIHBsYWluIE9iamVjdFxuICpcbiAqIEBwYXJhbSB7T2JqZWN0fSB2YWwgVGhlIHZhbHVlIHRvIHRlc3RcbiAqIEByZXR1cm4ge2Jvb2xlYW59IFRydWUgaWYgdmFsdWUgaXMgYSBwbGFpbiBPYmplY3QsIG90aGVyd2lzZSBmYWxzZVxuICovXG5mdW5jdGlvbiBpc1BsYWluT2JqZWN0KHZhbCkge1xuICBpZiAoa2luZE9mKHZhbCkgIT09ICdvYmplY3QnKSB7XG4gICAgcmV0dXJuIGZhbHNlO1xuICB9XG5cbiAgdmFyIHByb3RvdHlwZSA9IE9iamVjdC5nZXRQcm90b3R5cGVPZih2YWwpO1xuICByZXR1cm4gcHJvdG90eXBlID09PSBudWxsIHx8IHByb3RvdHlwZSA9PT0gT2JqZWN0LnByb3RvdHlwZTtcbn1cblxuLyoqXG4gKiBEZXRlcm1pbmUgaWYgYSB2YWx1ZSBpcyBhIERhdGVcbiAqXG4gKiBAZnVuY3Rpb25cbiAqIEBwYXJhbSB7T2JqZWN0fSB2YWwgVGhlIHZhbHVlIHRvIHRlc3RcbiAqIEByZXR1cm5zIHtib29sZWFufSBUcnVlIGlmIHZhbHVlIGlzIGEgRGF0ZSwgb3RoZXJ3aXNlIGZhbHNlXG4gKi9cbnZhciBpc0RhdGUgPSBraW5kT2ZUZXN0KCdEYXRlJyk7XG5cbi8qKlxuICogRGV0ZXJtaW5lIGlmIGEgdmFsdWUgaXMgYSBGaWxlXG4gKlxuICogQGZ1bmN0aW9uXG4gKiBAcGFyYW0ge09iamVjdH0gdmFsIFRoZSB2YWx1ZSB0byB0ZXN0XG4gKiBAcmV0dXJucyB7Ym9vbGVhbn0gVHJ1ZSBpZiB2YWx1ZSBpcyBhIEZpbGUsIG90aGVyd2lzZSBmYWxzZVxuICovXG52YXIgaXNGaWxlID0ga2luZE9mVGVzdCgnRmlsZScpO1xuXG4vKipcbiAqIERldGVybWluZSBpZiBhIHZhbHVlIGlzIGEgQmxvYlxuICpcbiAqIEBmdW5jdGlvblxuICogQHBhcmFtIHtPYmplY3R9IHZhbCBUaGUgdmFsdWUgdG8gdGVzdFxuICogQHJldHVybnMge2Jvb2xlYW59IFRydWUgaWYgdmFsdWUgaXMgYSBCbG9iLCBvdGhlcndpc2UgZmFsc2VcbiAqL1xudmFyIGlzQmxvYiA9IGtpbmRPZlRlc3QoJ0Jsb2InKTtcblxuLyoqXG4gKiBEZXRlcm1pbmUgaWYgYSB2YWx1ZSBpcyBhIEZpbGVMaXN0XG4gKlxuICogQGZ1bmN0aW9uXG4gKiBAcGFyYW0ge09iamVjdH0gdmFsIFRoZSB2YWx1ZSB0byB0ZXN0XG4gKiBAcmV0dXJucyB7Ym9vbGVhbn0gVHJ1ZSBpZiB2YWx1ZSBpcyBhIEZpbGUsIG90aGVyd2lzZSBmYWxzZVxuICovXG52YXIgaXNGaWxlTGlzdCA9IGtpbmRPZlRlc3QoJ0ZpbGVMaXN0Jyk7XG5cbi8qKlxuICogRGV0ZXJtaW5lIGlmIGEgdmFsdWUgaXMgYSBGdW5jdGlvblxuICpcbiAqIEBwYXJhbSB7T2JqZWN0fSB2YWwgVGhlIHZhbHVlIHRvIHRlc3RcbiAqIEByZXR1cm5zIHtib29sZWFufSBUcnVlIGlmIHZhbHVlIGlzIGEgRnVuY3Rpb24sIG90aGVyd2lzZSBmYWxzZVxuICovXG5mdW5jdGlvbiBpc0Z1bmN0aW9uKHZhbCkge1xuICByZXR1cm4gdG9TdHJpbmcuY2FsbCh2YWwpID09PSAnW29iamVjdCBGdW5jdGlvbl0nO1xufVxuXG4vKipcbiAqIERldGVybWluZSBpZiBhIHZhbHVlIGlzIGEgU3RyZWFtXG4gKlxuICogQHBhcmFtIHtPYmplY3R9IHZhbCBUaGUgdmFsdWUgdG8gdGVzdFxuICogQHJldHVybnMge2Jvb2xlYW59IFRydWUgaWYgdmFsdWUgaXMgYSBTdHJlYW0sIG90aGVyd2lzZSBmYWxzZVxuICovXG5mdW5jdGlvbiBpc1N0cmVhbSh2YWwpIHtcbiAgcmV0dXJuIGlzT2JqZWN0KHZhbCkgJiYgaXNGdW5jdGlvbih2YWwucGlwZSk7XG59XG5cbi8qKlxuICogRGV0ZXJtaW5lIGlmIGEgdmFsdWUgaXMgYSBGb3JtRGF0YVxuICpcbiAqIEBwYXJhbSB7T2JqZWN0fSB0aGluZyBUaGUgdmFsdWUgdG8gdGVzdFxuICogQHJldHVybnMge2Jvb2xlYW59IFRydWUgaWYgdmFsdWUgaXMgYW4gRm9ybURhdGEsIG90aGVyd2lzZSBmYWxzZVxuICovXG5mdW5jdGlvbiBpc0Zvcm1EYXRhKHRoaW5nKSB7XG4gIHZhciBwYXR0ZXJuID0gJ1tvYmplY3QgRm9ybURhdGFdJztcbiAgcmV0dXJuIHRoaW5nICYmIChcbiAgICAodHlwZW9mIEZvcm1EYXRhID09PSAnZnVuY3Rpb24nICYmIHRoaW5nIGluc3RhbmNlb2YgRm9ybURhdGEpIHx8XG4gICAgdG9TdHJpbmcuY2FsbCh0aGluZykgPT09IHBhdHRlcm4gfHxcbiAgICAoaXNGdW5jdGlvbih0aGluZy50b1N0cmluZykgJiYgdGhpbmcudG9TdHJpbmcoKSA9PT0gcGF0dGVybilcbiAgKTtcbn1cblxuLyoqXG4gKiBEZXRlcm1pbmUgaWYgYSB2YWx1ZSBpcyBhIFVSTFNlYXJjaFBhcmFtcyBvYmplY3RcbiAqIEBmdW5jdGlvblxuICogQHBhcmFtIHtPYmplY3R9IHZhbCBUaGUgdmFsdWUgdG8gdGVzdFxuICogQHJldHVybnMge2Jvb2xlYW59IFRydWUgaWYgdmFsdWUgaXMgYSBVUkxTZWFyY2hQYXJhbXMgb2JqZWN0LCBvdGhlcndpc2UgZmFsc2VcbiAqL1xudmFyIGlzVVJMU2VhcmNoUGFyYW1zID0ga2luZE9mVGVzdCgnVVJMU2VhcmNoUGFyYW1zJyk7XG5cbi8qKlxuICogVHJpbSBleGNlc3Mgd2hpdGVzcGFjZSBvZmYgdGhlIGJlZ2lubmluZyBhbmQgZW5kIG9mIGEgc3RyaW5nXG4gKlxuICogQHBhcmFtIHtTdHJpbmd9IHN0ciBUaGUgU3RyaW5nIHRvIHRyaW1cbiAqIEByZXR1cm5zIHtTdHJpbmd9IFRoZSBTdHJpbmcgZnJlZWQgb2YgZXhjZXNzIHdoaXRlc3BhY2VcbiAqL1xuZnVuY3Rpb24gdHJpbShzdHIpIHtcbiAgcmV0dXJuIHN0ci50cmltID8gc3RyLnRyaW0oKSA6IHN0ci5yZXBsYWNlKC9eXFxzK3xcXHMrJC9nLCAnJyk7XG59XG5cbi8qKlxuICogRGV0ZXJtaW5lIGlmIHdlJ3JlIHJ1bm5pbmcgaW4gYSBzdGFuZGFyZCBicm93c2VyIGVudmlyb25tZW50XG4gKlxuICogVGhpcyBhbGxvd3MgYXhpb3MgdG8gcnVuIGluIGEgd2ViIHdvcmtlciwgYW5kIHJlYWN0LW5hdGl2ZS5cbiAqIEJvdGggZW52aXJvbm1lbnRzIHN1cHBvcnQgWE1MSHR0cFJlcXVlc3QsIGJ1dCBub3QgZnVsbHkgc3RhbmRhcmQgZ2xvYmFscy5cbiAqXG4gKiB3ZWIgd29ya2VyczpcbiAqICB0eXBlb2Ygd2luZG93IC0+IHVuZGVmaW5lZFxuICogIHR5cGVvZiBkb2N1bWVudCAtPiB1bmRlZmluZWRcbiAqXG4gKiByZWFjdC1uYXRpdmU6XG4gKiAgbmF2aWdhdG9yLnByb2R1Y3QgLT4gJ1JlYWN0TmF0aXZlJ1xuICogbmF0aXZlc2NyaXB0XG4gKiAgbmF2aWdhdG9yLnByb2R1Y3QgLT4gJ05hdGl2ZVNjcmlwdCcgb3IgJ05TJ1xuICovXG5mdW5jdGlvbiBpc1N0YW5kYXJkQnJvd3NlckVudigpIHtcbiAgaWYgKHR5cGVvZiBuYXZpZ2F0b3IgIT09ICd1bmRlZmluZWQnICYmIChuYXZpZ2F0b3IucHJvZHVjdCA9PT0gJ1JlYWN0TmF0aXZlJyB8fFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIG5hdmlnYXRvci5wcm9kdWN0ID09PSAnTmF0aXZlU2NyaXB0JyB8fFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIG5hdmlnYXRvci5wcm9kdWN0ID09PSAnTlMnKSkge1xuICAgIHJldHVybiBmYWxzZTtcbiAgfVxuICByZXR1cm4gKFxuICAgIHR5cGVvZiB3aW5kb3cgIT09ICd1bmRlZmluZWQnICYmXG4gICAgdHlwZW9mIGRvY3VtZW50ICE9PSAndW5kZWZpbmVkJ1xuICApO1xufVxuXG4vKipcbiAqIEl0ZXJhdGUgb3ZlciBhbiBBcnJheSBvciBhbiBPYmplY3QgaW52b2tpbmcgYSBmdW5jdGlvbiBmb3IgZWFjaCBpdGVtLlxuICpcbiAqIElmIGBvYmpgIGlzIGFuIEFycmF5IGNhbGxiYWNrIHdpbGwgYmUgY2FsbGVkIHBhc3NpbmdcbiAqIHRoZSB2YWx1ZSwgaW5kZXgsIGFuZCBjb21wbGV0ZSBhcnJheSBmb3IgZWFjaCBpdGVtLlxuICpcbiAqIElmICdvYmonIGlzIGFuIE9iamVjdCBjYWxsYmFjayB3aWxsIGJlIGNhbGxlZCBwYXNzaW5nXG4gKiB0aGUgdmFsdWUsIGtleSwgYW5kIGNvbXBsZXRlIG9iamVjdCBmb3IgZWFjaCBwcm9wZXJ0eS5cbiAqXG4gKiBAcGFyYW0ge09iamVjdHxBcnJheX0gb2JqIFRoZSBvYmplY3QgdG8gaXRlcmF0ZVxuICogQHBhcmFtIHtGdW5jdGlvbn0gZm4gVGhlIGNhbGxiYWNrIHRvIGludm9rZSBmb3IgZWFjaCBpdGVtXG4gKi9cbmZ1bmN0aW9uIGZvckVhY2gob2JqLCBmbikge1xuICAvLyBEb24ndCBib3RoZXIgaWYgbm8gdmFsdWUgcHJvdmlkZWRcbiAgaWYgKG9iaiA9PT0gbnVsbCB8fCB0eXBlb2Ygb2JqID09PSAndW5kZWZpbmVkJykge1xuICAgIHJldHVybjtcbiAgfVxuXG4gIC8vIEZvcmNlIGFuIGFycmF5IGlmIG5vdCBhbHJlYWR5IHNvbWV0aGluZyBpdGVyYWJsZVxuICBpZiAodHlwZW9mIG9iaiAhPT0gJ29iamVjdCcpIHtcbiAgICAvKmVzbGludCBuby1wYXJhbS1yZWFzc2lnbjowKi9cbiAgICBvYmogPSBbb2JqXTtcbiAgfVxuXG4gIGlmIChpc0FycmF5KG9iaikpIHtcbiAgICAvLyBJdGVyYXRlIG92ZXIgYXJyYXkgdmFsdWVzXG4gICAgZm9yICh2YXIgaSA9IDAsIGwgPSBvYmoubGVuZ3RoOyBpIDwgbDsgaSsrKSB7XG4gICAgICBmbi5jYWxsKG51bGwsIG9ialtpXSwgaSwgb2JqKTtcbiAgICB9XG4gIH0gZWxzZSB7XG4gICAgLy8gSXRlcmF0ZSBvdmVyIG9iamVjdCBrZXlzXG4gICAgZm9yICh2YXIga2V5IGluIG9iaikge1xuICAgICAgaWYgKE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChvYmosIGtleSkpIHtcbiAgICAgICAgZm4uY2FsbChudWxsLCBvYmpba2V5XSwga2V5LCBvYmopO1xuICAgICAgfVxuICAgIH1cbiAgfVxufVxuXG4vKipcbiAqIEFjY2VwdHMgdmFyYXJncyBleHBlY3RpbmcgZWFjaCBhcmd1bWVudCB0byBiZSBhbiBvYmplY3QsIHRoZW5cbiAqIGltbXV0YWJseSBtZXJnZXMgdGhlIHByb3BlcnRpZXMgb2YgZWFjaCBvYmplY3QgYW5kIHJldHVybnMgcmVzdWx0LlxuICpcbiAqIFdoZW4gbXVsdGlwbGUgb2JqZWN0cyBjb250YWluIHRoZSBzYW1lIGtleSB0aGUgbGF0ZXIgb2JqZWN0IGluXG4gKiB0aGUgYXJndW1lbnRzIGxpc3Qgd2lsbCB0YWtlIHByZWNlZGVuY2UuXG4gKlxuICogRXhhbXBsZTpcbiAqXG4gKiBgYGBqc1xuICogdmFyIHJlc3VsdCA9IG1lcmdlKHtmb286IDEyM30sIHtmb286IDQ1Nn0pO1xuICogY29uc29sZS5sb2cocmVzdWx0LmZvbyk7IC8vIG91dHB1dHMgNDU2XG4gKiBgYGBcbiAqXG4gKiBAcGFyYW0ge09iamVjdH0gb2JqMSBPYmplY3QgdG8gbWVyZ2VcbiAqIEByZXR1cm5zIHtPYmplY3R9IFJlc3VsdCBvZiBhbGwgbWVyZ2UgcHJvcGVydGllc1xuICovXG5mdW5jdGlvbiBtZXJnZSgvKiBvYmoxLCBvYmoyLCBvYmozLCAuLi4gKi8pIHtcbiAgdmFyIHJlc3VsdCA9IHt9O1xuICBmdW5jdGlvbiBhc3NpZ25WYWx1ZSh2YWwsIGtleSkge1xuICAgIGlmIChpc1BsYWluT2JqZWN0KHJlc3VsdFtrZXldKSAmJiBpc1BsYWluT2JqZWN0KHZhbCkpIHtcbiAgICAgIHJlc3VsdFtrZXldID0gbWVyZ2UocmVzdWx0W2tleV0sIHZhbCk7XG4gICAgfSBlbHNlIGlmIChpc1BsYWluT2JqZWN0KHZhbCkpIHtcbiAgICAgIHJlc3VsdFtrZXldID0gbWVyZ2Uoe30sIHZhbCk7XG4gICAgfSBlbHNlIGlmIChpc0FycmF5KHZhbCkpIHtcbiAgICAgIHJlc3VsdFtrZXldID0gdmFsLnNsaWNlKCk7XG4gICAgfSBlbHNlIHtcbiAgICAgIHJlc3VsdFtrZXldID0gdmFsO1xuICAgIH1cbiAgfVxuXG4gIGZvciAodmFyIGkgPSAwLCBsID0gYXJndW1lbnRzLmxlbmd0aDsgaSA8IGw7IGkrKykge1xuICAgIGZvckVhY2goYXJndW1lbnRzW2ldLCBhc3NpZ25WYWx1ZSk7XG4gIH1cbiAgcmV0dXJuIHJlc3VsdDtcbn1cblxuLyoqXG4gKiBFeHRlbmRzIG9iamVjdCBhIGJ5IG11dGFibHkgYWRkaW5nIHRvIGl0IHRoZSBwcm9wZXJ0aWVzIG9mIG9iamVjdCBiLlxuICpcbiAqIEBwYXJhbSB7T2JqZWN0fSBhIFRoZSBvYmplY3QgdG8gYmUgZXh0ZW5kZWRcbiAqIEBwYXJhbSB7T2JqZWN0fSBiIFRoZSBvYmplY3QgdG8gY29weSBwcm9wZXJ0aWVzIGZyb21cbiAqIEBwYXJhbSB7T2JqZWN0fSB0aGlzQXJnIFRoZSBvYmplY3QgdG8gYmluZCBmdW5jdGlvbiB0b1xuICogQHJldHVybiB7T2JqZWN0fSBUaGUgcmVzdWx0aW5nIHZhbHVlIG9mIG9iamVjdCBhXG4gKi9cbmZ1bmN0aW9uIGV4dGVuZChhLCBiLCB0aGlzQXJnKSB7XG4gIGZvckVhY2goYiwgZnVuY3Rpb24gYXNzaWduVmFsdWUodmFsLCBrZXkpIHtcbiAgICBpZiAodGhpc0FyZyAmJiB0eXBlb2YgdmFsID09PSAnZnVuY3Rpb24nKSB7XG4gICAgICBhW2tleV0gPSBiaW5kKHZhbCwgdGhpc0FyZyk7XG4gICAgfSBlbHNlIHtcbiAgICAgIGFba2V5XSA9IHZhbDtcbiAgICB9XG4gIH0pO1xuICByZXR1cm4gYTtcbn1cblxuLyoqXG4gKiBSZW1vdmUgYnl0ZSBvcmRlciBtYXJrZXIuIFRoaXMgY2F0Y2hlcyBFRiBCQiBCRiAodGhlIFVURi04IEJPTSlcbiAqXG4gKiBAcGFyYW0ge3N0cmluZ30gY29udGVudCB3aXRoIEJPTVxuICogQHJldHVybiB7c3RyaW5nfSBjb250ZW50IHZhbHVlIHdpdGhvdXQgQk9NXG4gKi9cbmZ1bmN0aW9uIHN0cmlwQk9NKGNvbnRlbnQpIHtcbiAgaWYgKGNvbnRlbnQuY2hhckNvZGVBdCgwKSA9PT0gMHhGRUZGKSB7XG4gICAgY29udGVudCA9IGNvbnRlbnQuc2xpY2UoMSk7XG4gIH1cbiAgcmV0dXJuIGNvbnRlbnQ7XG59XG5cbi8qKlxuICogSW5oZXJpdCB0aGUgcHJvdG90eXBlIG1ldGhvZHMgZnJvbSBvbmUgY29uc3RydWN0b3IgaW50byBhbm90aGVyXG4gKiBAcGFyYW0ge2Z1bmN0aW9ufSBjb25zdHJ1Y3RvclxuICogQHBhcmFtIHtmdW5jdGlvbn0gc3VwZXJDb25zdHJ1Y3RvclxuICogQHBhcmFtIHtvYmplY3R9IFtwcm9wc11cbiAqIEBwYXJhbSB7b2JqZWN0fSBbZGVzY3JpcHRvcnNdXG4gKi9cblxuZnVuY3Rpb24gaW5oZXJpdHMoY29uc3RydWN0b3IsIHN1cGVyQ29uc3RydWN0b3IsIHByb3BzLCBkZXNjcmlwdG9ycykge1xuICBjb25zdHJ1Y3Rvci5wcm90b3R5cGUgPSBPYmplY3QuY3JlYXRlKHN1cGVyQ29uc3RydWN0b3IucHJvdG90eXBlLCBkZXNjcmlwdG9ycyk7XG4gIGNvbnN0cnVjdG9yLnByb3RvdHlwZS5jb25zdHJ1Y3RvciA9IGNvbnN0cnVjdG9yO1xuICBwcm9wcyAmJiBPYmplY3QuYXNzaWduKGNvbnN0cnVjdG9yLnByb3RvdHlwZSwgcHJvcHMpO1xufVxuXG4vKipcbiAqIFJlc29sdmUgb2JqZWN0IHdpdGggZGVlcCBwcm90b3R5cGUgY2hhaW4gdG8gYSBmbGF0IG9iamVjdFxuICogQHBhcmFtIHtPYmplY3R9IHNvdXJjZU9iaiBzb3VyY2Ugb2JqZWN0XG4gKiBAcGFyYW0ge09iamVjdH0gW2Rlc3RPYmpdXG4gKiBAcGFyYW0ge0Z1bmN0aW9ufSBbZmlsdGVyXVxuICogQHJldHVybnMge09iamVjdH1cbiAqL1xuXG5mdW5jdGlvbiB0b0ZsYXRPYmplY3Qoc291cmNlT2JqLCBkZXN0T2JqLCBmaWx0ZXIpIHtcbiAgdmFyIHByb3BzO1xuICB2YXIgaTtcbiAgdmFyIHByb3A7XG4gIHZhciBtZXJnZWQgPSB7fTtcblxuICBkZXN0T2JqID0gZGVzdE9iaiB8fCB7fTtcblxuICBkbyB7XG4gICAgcHJvcHMgPSBPYmplY3QuZ2V0T3duUHJvcGVydHlOYW1lcyhzb3VyY2VPYmopO1xuICAgIGkgPSBwcm9wcy5sZW5ndGg7XG4gICAgd2hpbGUgKGktLSA+IDApIHtcbiAgICAgIHByb3AgPSBwcm9wc1tpXTtcbiAgICAgIGlmICghbWVyZ2VkW3Byb3BdKSB7XG4gICAgICAgIGRlc3RPYmpbcHJvcF0gPSBzb3VyY2VPYmpbcHJvcF07XG4gICAgICAgIG1lcmdlZFtwcm9wXSA9IHRydWU7XG4gICAgICB9XG4gICAgfVxuICAgIHNvdXJjZU9iaiA9IE9iamVjdC5nZXRQcm90b3R5cGVPZihzb3VyY2VPYmopO1xuICB9IHdoaWxlIChzb3VyY2VPYmogJiYgKCFmaWx0ZXIgfHwgZmlsdGVyKHNvdXJjZU9iaiwgZGVzdE9iaikpICYmIHNvdXJjZU9iaiAhPT0gT2JqZWN0LnByb3RvdHlwZSk7XG5cbiAgcmV0dXJuIGRlc3RPYmo7XG59XG5cbi8qXG4gKiBkZXRlcm1pbmVzIHdoZXRoZXIgYSBzdHJpbmcgZW5kcyB3aXRoIHRoZSBjaGFyYWN0ZXJzIG9mIGEgc3BlY2lmaWVkIHN0cmluZ1xuICogQHBhcmFtIHtTdHJpbmd9IHN0clxuICogQHBhcmFtIHtTdHJpbmd9IHNlYXJjaFN0cmluZ1xuICogQHBhcmFtIHtOdW1iZXJ9IFtwb3NpdGlvbj0gMF1cbiAqIEByZXR1cm5zIHtib29sZWFufVxuICovXG5mdW5jdGlvbiBlbmRzV2l0aChzdHIsIHNlYXJjaFN0cmluZywgcG9zaXRpb24pIHtcbiAgc3RyID0gU3RyaW5nKHN0cik7XG4gIGlmIChwb3NpdGlvbiA9PT0gdW5kZWZpbmVkIHx8IHBvc2l0aW9uID4gc3RyLmxlbmd0aCkge1xuICAgIHBvc2l0aW9uID0gc3RyLmxlbmd0aDtcbiAgfVxuICBwb3NpdGlvbiAtPSBzZWFyY2hTdHJpbmcubGVuZ3RoO1xuICB2YXIgbGFzdEluZGV4ID0gc3RyLmluZGV4T2Yoc2VhcmNoU3RyaW5nLCBwb3NpdGlvbik7XG4gIHJldHVybiBsYXN0SW5kZXggIT09IC0xICYmIGxhc3RJbmRleCA9PT0gcG9zaXRpb247XG59XG5cblxuLyoqXG4gKiBSZXR1cm5zIG5ldyBhcnJheSBmcm9tIGFycmF5IGxpa2Ugb2JqZWN0XG4gKiBAcGFyYW0geyp9IFt0aGluZ11cbiAqIEByZXR1cm5zIHtBcnJheX1cbiAqL1xuZnVuY3Rpb24gdG9BcnJheSh0aGluZykge1xuICBpZiAoIXRoaW5nKSByZXR1cm4gbnVsbDtcbiAgdmFyIGkgPSB0aGluZy5sZW5ndGg7XG4gIGlmIChpc1VuZGVmaW5lZChpKSkgcmV0dXJuIG51bGw7XG4gIHZhciBhcnIgPSBuZXcgQXJyYXkoaSk7XG4gIHdoaWxlIChpLS0gPiAwKSB7XG4gICAgYXJyW2ldID0gdGhpbmdbaV07XG4gIH1cbiAgcmV0dXJuIGFycjtcbn1cblxuLy8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIGZ1bmMtbmFtZXNcbnZhciBpc1R5cGVkQXJyYXkgPSAoZnVuY3Rpb24oVHlwZWRBcnJheSkge1xuICAvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgZnVuYy1uYW1lc1xuICByZXR1cm4gZnVuY3Rpb24odGhpbmcpIHtcbiAgICByZXR1cm4gVHlwZWRBcnJheSAmJiB0aGluZyBpbnN0YW5jZW9mIFR5cGVkQXJyYXk7XG4gIH07XG59KSh0eXBlb2YgVWludDhBcnJheSAhPT0gJ3VuZGVmaW5lZCcgJiYgT2JqZWN0LmdldFByb3RvdHlwZU9mKFVpbnQ4QXJyYXkpKTtcblxubW9kdWxlLmV4cG9ydHMgPSB7XG4gIGlzQXJyYXk6IGlzQXJyYXksXG4gIGlzQXJyYXlCdWZmZXI6IGlzQXJyYXlCdWZmZXIsXG4gIGlzQnVmZmVyOiBpc0J1ZmZlcixcbiAgaXNGb3JtRGF0YTogaXNGb3JtRGF0YSxcbiAgaXNBcnJheUJ1ZmZlclZpZXc6IGlzQXJyYXlCdWZmZXJWaWV3LFxuICBpc1N0cmluZzogaXNTdHJpbmcsXG4gIGlzTnVtYmVyOiBpc051bWJlcixcbiAgaXNPYmplY3Q6IGlzT2JqZWN0LFxuICBpc1BsYWluT2JqZWN0OiBpc1BsYWluT2JqZWN0LFxuICBpc1VuZGVmaW5lZDogaXNVbmRlZmluZWQsXG4gIGlzRGF0ZTogaXNEYXRlLFxuICBpc0ZpbGU6IGlzRmlsZSxcbiAgaXNCbG9iOiBpc0Jsb2IsXG4gIGlzRnVuY3Rpb246IGlzRnVuY3Rpb24sXG4gIGlzU3RyZWFtOiBpc1N0cmVhbSxcbiAgaXNVUkxTZWFyY2hQYXJhbXM6IGlzVVJMU2VhcmNoUGFyYW1zLFxuICBpc1N0YW5kYXJkQnJvd3NlckVudjogaXNTdGFuZGFyZEJyb3dzZXJFbnYsXG4gIGZvckVhY2g6IGZvckVhY2gsXG4gIG1lcmdlOiBtZXJnZSxcbiAgZXh0ZW5kOiBleHRlbmQsXG4gIHRyaW06IHRyaW0sXG4gIHN0cmlwQk9NOiBzdHJpcEJPTSxcbiAgaW5oZXJpdHM6IGluaGVyaXRzLFxuICB0b0ZsYXRPYmplY3Q6IHRvRmxhdE9iamVjdCxcbiAga2luZE9mOiBraW5kT2YsXG4gIGtpbmRPZlRlc3Q6IGtpbmRPZlRlc3QsXG4gIGVuZHNXaXRoOiBlbmRzV2l0aCxcbiAgdG9BcnJheTogdG9BcnJheSxcbiAgaXNUeXBlZEFycmF5OiBpc1R5cGVkQXJyYXksXG4gIGlzRmlsZUxpc3Q6IGlzRmlsZUxpc3Rcbn07XG4iLCAiJ3VzZSBzdHJpY3QnO1xuXG52YXIgdXRpbHMgPSByZXF1aXJlKCcuLy4uL3V0aWxzJyk7XG5cbmZ1bmN0aW9uIGVuY29kZSh2YWwpIHtcbiAgcmV0dXJuIGVuY29kZVVSSUNvbXBvbmVudCh2YWwpLlxuICAgIHJlcGxhY2UoLyUzQS9naSwgJzonKS5cbiAgICByZXBsYWNlKC8lMjQvZywgJyQnKS5cbiAgICByZXBsYWNlKC8lMkMvZ2ksICcsJykuXG4gICAgcmVwbGFjZSgvJTIwL2csICcrJykuXG4gICAgcmVwbGFjZSgvJTVCL2dpLCAnWycpLlxuICAgIHJlcGxhY2UoLyU1RC9naSwgJ10nKTtcbn1cblxuLyoqXG4gKiBCdWlsZCBhIFVSTCBieSBhcHBlbmRpbmcgcGFyYW1zIHRvIHRoZSBlbmRcbiAqXG4gKiBAcGFyYW0ge3N0cmluZ30gdXJsIFRoZSBiYXNlIG9mIHRoZSB1cmwgKGUuZy4sIGh0dHA6Ly93d3cuZ29vZ2xlLmNvbSlcbiAqIEBwYXJhbSB7b2JqZWN0fSBbcGFyYW1zXSBUaGUgcGFyYW1zIHRvIGJlIGFwcGVuZGVkXG4gKiBAcmV0dXJucyB7c3RyaW5nfSBUaGUgZm9ybWF0dGVkIHVybFxuICovXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIGJ1aWxkVVJMKHVybCwgcGFyYW1zLCBwYXJhbXNTZXJpYWxpemVyKSB7XG4gIC8qZXNsaW50IG5vLXBhcmFtLXJlYXNzaWduOjAqL1xuICBpZiAoIXBhcmFtcykge1xuICAgIHJldHVybiB1cmw7XG4gIH1cblxuICB2YXIgc2VyaWFsaXplZFBhcmFtcztcbiAgaWYgKHBhcmFtc1NlcmlhbGl6ZXIpIHtcbiAgICBzZXJpYWxpemVkUGFyYW1zID0gcGFyYW1zU2VyaWFsaXplcihwYXJhbXMpO1xuICB9IGVsc2UgaWYgKHV0aWxzLmlzVVJMU2VhcmNoUGFyYW1zKHBhcmFtcykpIHtcbiAgICBzZXJpYWxpemVkUGFyYW1zID0gcGFyYW1zLnRvU3RyaW5nKCk7XG4gIH0gZWxzZSB7XG4gICAgdmFyIHBhcnRzID0gW107XG5cbiAgICB1dGlscy5mb3JFYWNoKHBhcmFtcywgZnVuY3Rpb24gc2VyaWFsaXplKHZhbCwga2V5KSB7XG4gICAgICBpZiAodmFsID09PSBudWxsIHx8IHR5cGVvZiB2YWwgPT09ICd1bmRlZmluZWQnKSB7XG4gICAgICAgIHJldHVybjtcbiAgICAgIH1cblxuICAgICAgaWYgKHV0aWxzLmlzQXJyYXkodmFsKSkge1xuICAgICAgICBrZXkgPSBrZXkgKyAnW10nO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgdmFsID0gW3ZhbF07XG4gICAgICB9XG5cbiAgICAgIHV0aWxzLmZvckVhY2godmFsLCBmdW5jdGlvbiBwYXJzZVZhbHVlKHYpIHtcbiAgICAgICAgaWYgKHV0aWxzLmlzRGF0ZSh2KSkge1xuICAgICAgICAgIHYgPSB2LnRvSVNPU3RyaW5nKCk7XG4gICAgICAgIH0gZWxzZSBpZiAodXRpbHMuaXNPYmplY3QodikpIHtcbiAgICAgICAgICB2ID0gSlNPTi5zdHJpbmdpZnkodik7XG4gICAgICAgIH1cbiAgICAgICAgcGFydHMucHVzaChlbmNvZGUoa2V5KSArICc9JyArIGVuY29kZSh2KSk7XG4gICAgICB9KTtcbiAgICB9KTtcblxuICAgIHNlcmlhbGl6ZWRQYXJhbXMgPSBwYXJ0cy5qb2luKCcmJyk7XG4gIH1cblxuICBpZiAoc2VyaWFsaXplZFBhcmFtcykge1xuICAgIHZhciBoYXNobWFya0luZGV4ID0gdXJsLmluZGV4T2YoJyMnKTtcbiAgICBpZiAoaGFzaG1hcmtJbmRleCAhPT0gLTEpIHtcbiAgICAgIHVybCA9IHVybC5zbGljZSgwLCBoYXNobWFya0luZGV4KTtcbiAgICB9XG5cbiAgICB1cmwgKz0gKHVybC5pbmRleE9mKCc/JykgPT09IC0xID8gJz8nIDogJyYnKSArIHNlcmlhbGl6ZWRQYXJhbXM7XG4gIH1cblxuICByZXR1cm4gdXJsO1xufTtcbiIsICIndXNlIHN0cmljdCc7XG5cbnZhciB1dGlscyA9IHJlcXVpcmUoJy4vLi4vdXRpbHMnKTtcblxuZnVuY3Rpb24gSW50ZXJjZXB0b3JNYW5hZ2VyKCkge1xuICB0aGlzLmhhbmRsZXJzID0gW107XG59XG5cbi8qKlxuICogQWRkIGEgbmV3IGludGVyY2VwdG9yIHRvIHRoZSBzdGFja1xuICpcbiAqIEBwYXJhbSB7RnVuY3Rpb259IGZ1bGZpbGxlZCBUaGUgZnVuY3Rpb24gdG8gaGFuZGxlIGB0aGVuYCBmb3IgYSBgUHJvbWlzZWBcbiAqIEBwYXJhbSB7RnVuY3Rpb259IHJlamVjdGVkIFRoZSBmdW5jdGlvbiB0byBoYW5kbGUgYHJlamVjdGAgZm9yIGEgYFByb21pc2VgXG4gKlxuICogQHJldHVybiB7TnVtYmVyfSBBbiBJRCB1c2VkIHRvIHJlbW92ZSBpbnRlcmNlcHRvciBsYXRlclxuICovXG5JbnRlcmNlcHRvck1hbmFnZXIucHJvdG90eXBlLnVzZSA9IGZ1bmN0aW9uIHVzZShmdWxmaWxsZWQsIHJlamVjdGVkLCBvcHRpb25zKSB7XG4gIHRoaXMuaGFuZGxlcnMucHVzaCh7XG4gICAgZnVsZmlsbGVkOiBmdWxmaWxsZWQsXG4gICAgcmVqZWN0ZWQ6IHJlamVjdGVkLFxuICAgIHN5bmNocm9ub3VzOiBvcHRpb25zID8gb3B0aW9ucy5zeW5jaHJvbm91cyA6IGZhbHNlLFxuICAgIHJ1bldoZW46IG9wdGlvbnMgPyBvcHRpb25zLnJ1bldoZW4gOiBudWxsXG4gIH0pO1xuICByZXR1cm4gdGhpcy5oYW5kbGVycy5sZW5ndGggLSAxO1xufTtcblxuLyoqXG4gKiBSZW1vdmUgYW4gaW50ZXJjZXB0b3IgZnJvbSB0aGUgc3RhY2tcbiAqXG4gKiBAcGFyYW0ge051bWJlcn0gaWQgVGhlIElEIHRoYXQgd2FzIHJldHVybmVkIGJ5IGB1c2VgXG4gKi9cbkludGVyY2VwdG9yTWFuYWdlci5wcm90b3R5cGUuZWplY3QgPSBmdW5jdGlvbiBlamVjdChpZCkge1xuICBpZiAodGhpcy5oYW5kbGVyc1tpZF0pIHtcbiAgICB0aGlzLmhhbmRsZXJzW2lkXSA9IG51bGw7XG4gIH1cbn07XG5cbi8qKlxuICogSXRlcmF0ZSBvdmVyIGFsbCB0aGUgcmVnaXN0ZXJlZCBpbnRlcmNlcHRvcnNcbiAqXG4gKiBUaGlzIG1ldGhvZCBpcyBwYXJ0aWN1bGFybHkgdXNlZnVsIGZvciBza2lwcGluZyBvdmVyIGFueVxuICogaW50ZXJjZXB0b3JzIHRoYXQgbWF5IGhhdmUgYmVjb21lIGBudWxsYCBjYWxsaW5nIGBlamVjdGAuXG4gKlxuICogQHBhcmFtIHtGdW5jdGlvbn0gZm4gVGhlIGZ1bmN0aW9uIHRvIGNhbGwgZm9yIGVhY2ggaW50ZXJjZXB0b3JcbiAqL1xuSW50ZXJjZXB0b3JNYW5hZ2VyLnByb3RvdHlwZS5mb3JFYWNoID0gZnVuY3Rpb24gZm9yRWFjaChmbikge1xuICB1dGlscy5mb3JFYWNoKHRoaXMuaGFuZGxlcnMsIGZ1bmN0aW9uIGZvckVhY2hIYW5kbGVyKGgpIHtcbiAgICBpZiAoaCAhPT0gbnVsbCkge1xuICAgICAgZm4oaCk7XG4gICAgfVxuICB9KTtcbn07XG5cbm1vZHVsZS5leHBvcnRzID0gSW50ZXJjZXB0b3JNYW5hZ2VyO1xuIiwgIid1c2Ugc3RyaWN0JztcblxudmFyIHV0aWxzID0gcmVxdWlyZSgnLi4vdXRpbHMnKTtcblxubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiBub3JtYWxpemVIZWFkZXJOYW1lKGhlYWRlcnMsIG5vcm1hbGl6ZWROYW1lKSB7XG4gIHV0aWxzLmZvckVhY2goaGVhZGVycywgZnVuY3Rpb24gcHJvY2Vzc0hlYWRlcih2YWx1ZSwgbmFtZSkge1xuICAgIGlmIChuYW1lICE9PSBub3JtYWxpemVkTmFtZSAmJiBuYW1lLnRvVXBwZXJDYXNlKCkgPT09IG5vcm1hbGl6ZWROYW1lLnRvVXBwZXJDYXNlKCkpIHtcbiAgICAgIGhlYWRlcnNbbm9ybWFsaXplZE5hbWVdID0gdmFsdWU7XG4gICAgICBkZWxldGUgaGVhZGVyc1tuYW1lXTtcbiAgICB9XG4gIH0pO1xufTtcbiIsICIndXNlIHN0cmljdCc7XG5cbnZhciB1dGlscyA9IHJlcXVpcmUoJy4uL3V0aWxzJyk7XG5cbi8qKlxuICogQ3JlYXRlIGFuIEVycm9yIHdpdGggdGhlIHNwZWNpZmllZCBtZXNzYWdlLCBjb25maWcsIGVycm9yIGNvZGUsIHJlcXVlc3QgYW5kIHJlc3BvbnNlLlxuICpcbiAqIEBwYXJhbSB7c3RyaW5nfSBtZXNzYWdlIFRoZSBlcnJvciBtZXNzYWdlLlxuICogQHBhcmFtIHtzdHJpbmd9IFtjb2RlXSBUaGUgZXJyb3IgY29kZSAoZm9yIGV4YW1wbGUsICdFQ09OTkFCT1JURUQnKS5cbiAqIEBwYXJhbSB7T2JqZWN0fSBbY29uZmlnXSBUaGUgY29uZmlnLlxuICogQHBhcmFtIHtPYmplY3R9IFtyZXF1ZXN0XSBUaGUgcmVxdWVzdC5cbiAqIEBwYXJhbSB7T2JqZWN0fSBbcmVzcG9uc2VdIFRoZSByZXNwb25zZS5cbiAqIEByZXR1cm5zIHtFcnJvcn0gVGhlIGNyZWF0ZWQgZXJyb3IuXG4gKi9cbmZ1bmN0aW9uIEF4aW9zRXJyb3IobWVzc2FnZSwgY29kZSwgY29uZmlnLCByZXF1ZXN0LCByZXNwb25zZSkge1xuICBFcnJvci5jYWxsKHRoaXMpO1xuICB0aGlzLm1lc3NhZ2UgPSBtZXNzYWdlO1xuICB0aGlzLm5hbWUgPSAnQXhpb3NFcnJvcic7XG4gIGNvZGUgJiYgKHRoaXMuY29kZSA9IGNvZGUpO1xuICBjb25maWcgJiYgKHRoaXMuY29uZmlnID0gY29uZmlnKTtcbiAgcmVxdWVzdCAmJiAodGhpcy5yZXF1ZXN0ID0gcmVxdWVzdCk7XG4gIHJlc3BvbnNlICYmICh0aGlzLnJlc3BvbnNlID0gcmVzcG9uc2UpO1xufVxuXG51dGlscy5pbmhlcml0cyhBeGlvc0Vycm9yLCBFcnJvciwge1xuICB0b0pTT046IGZ1bmN0aW9uIHRvSlNPTigpIHtcbiAgICByZXR1cm4ge1xuICAgICAgLy8gU3RhbmRhcmRcbiAgICAgIG1lc3NhZ2U6IHRoaXMubWVzc2FnZSxcbiAgICAgIG5hbWU6IHRoaXMubmFtZSxcbiAgICAgIC8vIE1pY3Jvc29mdFxuICAgICAgZGVzY3JpcHRpb246IHRoaXMuZGVzY3JpcHRpb24sXG4gICAgICBudW1iZXI6IHRoaXMubnVtYmVyLFxuICAgICAgLy8gTW96aWxsYVxuICAgICAgZmlsZU5hbWU6IHRoaXMuZmlsZU5hbWUsXG4gICAgICBsaW5lTnVtYmVyOiB0aGlzLmxpbmVOdW1iZXIsXG4gICAgICBjb2x1bW5OdW1iZXI6IHRoaXMuY29sdW1uTnVtYmVyLFxuICAgICAgc3RhY2s6IHRoaXMuc3RhY2ssXG4gICAgICAvLyBBeGlvc1xuICAgICAgY29uZmlnOiB0aGlzLmNvbmZpZyxcbiAgICAgIGNvZGU6IHRoaXMuY29kZSxcbiAgICAgIHN0YXR1czogdGhpcy5yZXNwb25zZSAmJiB0aGlzLnJlc3BvbnNlLnN0YXR1cyA/IHRoaXMucmVzcG9uc2Uuc3RhdHVzIDogbnVsbFxuICAgIH07XG4gIH1cbn0pO1xuXG52YXIgcHJvdG90eXBlID0gQXhpb3NFcnJvci5wcm90b3R5cGU7XG52YXIgZGVzY3JpcHRvcnMgPSB7fTtcblxuW1xuICAnRVJSX0JBRF9PUFRJT05fVkFMVUUnLFxuICAnRVJSX0JBRF9PUFRJT04nLFxuICAnRUNPTk5BQk9SVEVEJyxcbiAgJ0VUSU1FRE9VVCcsXG4gICdFUlJfTkVUV09SSycsXG4gICdFUlJfRlJfVE9PX01BTllfUkVESVJFQ1RTJyxcbiAgJ0VSUl9ERVBSRUNBVEVEJyxcbiAgJ0VSUl9CQURfUkVTUE9OU0UnLFxuICAnRVJSX0JBRF9SRVFVRVNUJyxcbiAgJ0VSUl9DQU5DRUxFRCdcbi8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBmdW5jLW5hbWVzXG5dLmZvckVhY2goZnVuY3Rpb24oY29kZSkge1xuICBkZXNjcmlwdG9yc1tjb2RlXSA9IHt2YWx1ZTogY29kZX07XG59KTtcblxuT2JqZWN0LmRlZmluZVByb3BlcnRpZXMoQXhpb3NFcnJvciwgZGVzY3JpcHRvcnMpO1xuT2JqZWN0LmRlZmluZVByb3BlcnR5KHByb3RvdHlwZSwgJ2lzQXhpb3NFcnJvcicsIHt2YWx1ZTogdHJ1ZX0pO1xuXG4vLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgZnVuYy1uYW1lc1xuQXhpb3NFcnJvci5mcm9tID0gZnVuY3Rpb24oZXJyb3IsIGNvZGUsIGNvbmZpZywgcmVxdWVzdCwgcmVzcG9uc2UsIGN1c3RvbVByb3BzKSB7XG4gIHZhciBheGlvc0Vycm9yID0gT2JqZWN0LmNyZWF0ZShwcm90b3R5cGUpO1xuXG4gIHV0aWxzLnRvRmxhdE9iamVjdChlcnJvciwgYXhpb3NFcnJvciwgZnVuY3Rpb24gZmlsdGVyKG9iaikge1xuICAgIHJldHVybiBvYmogIT09IEVycm9yLnByb3RvdHlwZTtcbiAgfSk7XG5cbiAgQXhpb3NFcnJvci5jYWxsKGF4aW9zRXJyb3IsIGVycm9yLm1lc3NhZ2UsIGNvZGUsIGNvbmZpZywgcmVxdWVzdCwgcmVzcG9uc2UpO1xuXG4gIGF4aW9zRXJyb3IubmFtZSA9IGVycm9yLm5hbWU7XG5cbiAgY3VzdG9tUHJvcHMgJiYgT2JqZWN0LmFzc2lnbihheGlvc0Vycm9yLCBjdXN0b21Qcm9wcyk7XG5cbiAgcmV0dXJuIGF4aW9zRXJyb3I7XG59O1xuXG5tb2R1bGUuZXhwb3J0cyA9IEF4aW9zRXJyb3I7XG4iLCAiJ3VzZSBzdHJpY3QnO1xuXG5tb2R1bGUuZXhwb3J0cyA9IHtcbiAgc2lsZW50SlNPTlBhcnNpbmc6IHRydWUsXG4gIGZvcmNlZEpTT05QYXJzaW5nOiB0cnVlLFxuICBjbGFyaWZ5VGltZW91dEVycm9yOiBmYWxzZVxufTtcbiIsICIndXNlIHN0cmljdCc7XG5cbnZhciB1dGlscyA9IHJlcXVpcmUoJy4uL3V0aWxzJyk7XG5cbi8qKlxuICogQ29udmVydCBhIGRhdGEgb2JqZWN0IHRvIEZvcm1EYXRhXG4gKiBAcGFyYW0ge09iamVjdH0gb2JqXG4gKiBAcGFyYW0gez9PYmplY3R9IFtmb3JtRGF0YV1cbiAqIEByZXR1cm5zIHtPYmplY3R9XG4gKiovXG5cbmZ1bmN0aW9uIHRvRm9ybURhdGEob2JqLCBmb3JtRGF0YSkge1xuICAvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgbm8tcGFyYW0tcmVhc3NpZ25cbiAgZm9ybURhdGEgPSBmb3JtRGF0YSB8fCBuZXcgRm9ybURhdGEoKTtcblxuICB2YXIgc3RhY2sgPSBbXTtcblxuICBmdW5jdGlvbiBjb252ZXJ0VmFsdWUodmFsdWUpIHtcbiAgICBpZiAodmFsdWUgPT09IG51bGwpIHJldHVybiAnJztcblxuICAgIGlmICh1dGlscy5pc0RhdGUodmFsdWUpKSB7XG4gICAgICByZXR1cm4gdmFsdWUudG9JU09TdHJpbmcoKTtcbiAgICB9XG5cbiAgICBpZiAodXRpbHMuaXNBcnJheUJ1ZmZlcih2YWx1ZSkgfHwgdXRpbHMuaXNUeXBlZEFycmF5KHZhbHVlKSkge1xuICAgICAgcmV0dXJuIHR5cGVvZiBCbG9iID09PSAnZnVuY3Rpb24nID8gbmV3IEJsb2IoW3ZhbHVlXSkgOiBCdWZmZXIuZnJvbSh2YWx1ZSk7XG4gICAgfVxuXG4gICAgcmV0dXJuIHZhbHVlO1xuICB9XG5cbiAgZnVuY3Rpb24gYnVpbGQoZGF0YSwgcGFyZW50S2V5KSB7XG4gICAgaWYgKHV0aWxzLmlzUGxhaW5PYmplY3QoZGF0YSkgfHwgdXRpbHMuaXNBcnJheShkYXRhKSkge1xuICAgICAgaWYgKHN0YWNrLmluZGV4T2YoZGF0YSkgIT09IC0xKSB7XG4gICAgICAgIHRocm93IEVycm9yKCdDaXJjdWxhciByZWZlcmVuY2UgZGV0ZWN0ZWQgaW4gJyArIHBhcmVudEtleSk7XG4gICAgICB9XG5cbiAgICAgIHN0YWNrLnB1c2goZGF0YSk7XG5cbiAgICAgIHV0aWxzLmZvckVhY2goZGF0YSwgZnVuY3Rpb24gZWFjaCh2YWx1ZSwga2V5KSB7XG4gICAgICAgIGlmICh1dGlscy5pc1VuZGVmaW5lZCh2YWx1ZSkpIHJldHVybjtcbiAgICAgICAgdmFyIGZ1bGxLZXkgPSBwYXJlbnRLZXkgPyBwYXJlbnRLZXkgKyAnLicgKyBrZXkgOiBrZXk7XG4gICAgICAgIHZhciBhcnI7XG5cbiAgICAgICAgaWYgKHZhbHVlICYmICFwYXJlbnRLZXkgJiYgdHlwZW9mIHZhbHVlID09PSAnb2JqZWN0Jykge1xuICAgICAgICAgIGlmICh1dGlscy5lbmRzV2l0aChrZXksICd7fScpKSB7XG4gICAgICAgICAgICAvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgbm8tcGFyYW0tcmVhc3NpZ25cbiAgICAgICAgICAgIHZhbHVlID0gSlNPTi5zdHJpbmdpZnkodmFsdWUpO1xuICAgICAgICAgIH0gZWxzZSBpZiAodXRpbHMuZW5kc1dpdGgoa2V5LCAnW10nKSAmJiAoYXJyID0gdXRpbHMudG9BcnJheSh2YWx1ZSkpKSB7XG4gICAgICAgICAgICAvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgZnVuYy1uYW1lc1xuICAgICAgICAgICAgYXJyLmZvckVhY2goZnVuY3Rpb24oZWwpIHtcbiAgICAgICAgICAgICAgIXV0aWxzLmlzVW5kZWZpbmVkKGVsKSAmJiBmb3JtRGF0YS5hcHBlbmQoZnVsbEtleSwgY29udmVydFZhbHVlKGVsKSk7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICB9XG4gICAgICAgIH1cblxuICAgICAgICBidWlsZCh2YWx1ZSwgZnVsbEtleSk7XG4gICAgICB9KTtcblxuICAgICAgc3RhY2sucG9wKCk7XG4gICAgfSBlbHNlIHtcbiAgICAgIGZvcm1EYXRhLmFwcGVuZChwYXJlbnRLZXksIGNvbnZlcnRWYWx1ZShkYXRhKSk7XG4gICAgfVxuICB9XG5cbiAgYnVpbGQob2JqKTtcblxuICByZXR1cm4gZm9ybURhdGE7XG59XG5cbm1vZHVsZS5leHBvcnRzID0gdG9Gb3JtRGF0YTtcbiIsICIndXNlIHN0cmljdCc7XG5cbnZhciBBeGlvc0Vycm9yID0gcmVxdWlyZSgnLi9BeGlvc0Vycm9yJyk7XG5cbi8qKlxuICogUmVzb2x2ZSBvciByZWplY3QgYSBQcm9taXNlIGJhc2VkIG9uIHJlc3BvbnNlIHN0YXR1cy5cbiAqXG4gKiBAcGFyYW0ge0Z1bmN0aW9ufSByZXNvbHZlIEEgZnVuY3Rpb24gdGhhdCByZXNvbHZlcyB0aGUgcHJvbWlzZS5cbiAqIEBwYXJhbSB7RnVuY3Rpb259IHJlamVjdCBBIGZ1bmN0aW9uIHRoYXQgcmVqZWN0cyB0aGUgcHJvbWlzZS5cbiAqIEBwYXJhbSB7b2JqZWN0fSByZXNwb25zZSBUaGUgcmVzcG9uc2UuXG4gKi9cbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gc2V0dGxlKHJlc29sdmUsIHJlamVjdCwgcmVzcG9uc2UpIHtcbiAgdmFyIHZhbGlkYXRlU3RhdHVzID0gcmVzcG9uc2UuY29uZmlnLnZhbGlkYXRlU3RhdHVzO1xuICBpZiAoIXJlc3BvbnNlLnN0YXR1cyB8fCAhdmFsaWRhdGVTdGF0dXMgfHwgdmFsaWRhdGVTdGF0dXMocmVzcG9uc2Uuc3RhdHVzKSkge1xuICAgIHJlc29sdmUocmVzcG9uc2UpO1xuICB9IGVsc2Uge1xuICAgIHJlamVjdChuZXcgQXhpb3NFcnJvcihcbiAgICAgICdSZXF1ZXN0IGZhaWxlZCB3aXRoIHN0YXR1cyBjb2RlICcgKyByZXNwb25zZS5zdGF0dXMsXG4gICAgICBbQXhpb3NFcnJvci5FUlJfQkFEX1JFUVVFU1QsIEF4aW9zRXJyb3IuRVJSX0JBRF9SRVNQT05TRV1bTWF0aC5mbG9vcihyZXNwb25zZS5zdGF0dXMgLyAxMDApIC0gNF0sXG4gICAgICByZXNwb25zZS5jb25maWcsXG4gICAgICByZXNwb25zZS5yZXF1ZXN0LFxuICAgICAgcmVzcG9uc2VcbiAgICApKTtcbiAgfVxufTtcbiIsICIndXNlIHN0cmljdCc7XG5cbnZhciB1dGlscyA9IHJlcXVpcmUoJy4vLi4vdXRpbHMnKTtcblxubW9kdWxlLmV4cG9ydHMgPSAoXG4gIHV0aWxzLmlzU3RhbmRhcmRCcm93c2VyRW52KCkgP1xuXG4gIC8vIFN0YW5kYXJkIGJyb3dzZXIgZW52cyBzdXBwb3J0IGRvY3VtZW50LmNvb2tpZVxuICAgIChmdW5jdGlvbiBzdGFuZGFyZEJyb3dzZXJFbnYoKSB7XG4gICAgICByZXR1cm4ge1xuICAgICAgICB3cml0ZTogZnVuY3Rpb24gd3JpdGUobmFtZSwgdmFsdWUsIGV4cGlyZXMsIHBhdGgsIGRvbWFpbiwgc2VjdXJlKSB7XG4gICAgICAgICAgdmFyIGNvb2tpZSA9IFtdO1xuICAgICAgICAgIGNvb2tpZS5wdXNoKG5hbWUgKyAnPScgKyBlbmNvZGVVUklDb21wb25lbnQodmFsdWUpKTtcblxuICAgICAgICAgIGlmICh1dGlscy5pc051bWJlcihleHBpcmVzKSkge1xuICAgICAgICAgICAgY29va2llLnB1c2goJ2V4cGlyZXM9JyArIG5ldyBEYXRlKGV4cGlyZXMpLnRvR01UU3RyaW5nKCkpO1xuICAgICAgICAgIH1cblxuICAgICAgICAgIGlmICh1dGlscy5pc1N0cmluZyhwYXRoKSkge1xuICAgICAgICAgICAgY29va2llLnB1c2goJ3BhdGg9JyArIHBhdGgpO1xuICAgICAgICAgIH1cblxuICAgICAgICAgIGlmICh1dGlscy5pc1N0cmluZyhkb21haW4pKSB7XG4gICAgICAgICAgICBjb29raWUucHVzaCgnZG9tYWluPScgKyBkb21haW4pO1xuICAgICAgICAgIH1cblxuICAgICAgICAgIGlmIChzZWN1cmUgPT09IHRydWUpIHtcbiAgICAgICAgICAgIGNvb2tpZS5wdXNoKCdzZWN1cmUnKTtcbiAgICAgICAgICB9XG5cbiAgICAgICAgICBkb2N1bWVudC5jb29raWUgPSBjb29raWUuam9pbignOyAnKTtcbiAgICAgICAgfSxcblxuICAgICAgICByZWFkOiBmdW5jdGlvbiByZWFkKG5hbWUpIHtcbiAgICAgICAgICB2YXIgbWF0Y2ggPSBkb2N1bWVudC5jb29raWUubWF0Y2gobmV3IFJlZ0V4cCgnKF58O1xcXFxzKikoJyArIG5hbWUgKyAnKT0oW147XSopJykpO1xuICAgICAgICAgIHJldHVybiAobWF0Y2ggPyBkZWNvZGVVUklDb21wb25lbnQobWF0Y2hbM10pIDogbnVsbCk7XG4gICAgICAgIH0sXG5cbiAgICAgICAgcmVtb3ZlOiBmdW5jdGlvbiByZW1vdmUobmFtZSkge1xuICAgICAgICAgIHRoaXMud3JpdGUobmFtZSwgJycsIERhdGUubm93KCkgLSA4NjQwMDAwMCk7XG4gICAgICAgIH1cbiAgICAgIH07XG4gICAgfSkoKSA6XG5cbiAgLy8gTm9uIHN0YW5kYXJkIGJyb3dzZXIgZW52ICh3ZWIgd29ya2VycywgcmVhY3QtbmF0aXZlKSBsYWNrIG5lZWRlZCBzdXBwb3J0LlxuICAgIChmdW5jdGlvbiBub25TdGFuZGFyZEJyb3dzZXJFbnYoKSB7XG4gICAgICByZXR1cm4ge1xuICAgICAgICB3cml0ZTogZnVuY3Rpb24gd3JpdGUoKSB7fSxcbiAgICAgICAgcmVhZDogZnVuY3Rpb24gcmVhZCgpIHsgcmV0dXJuIG51bGw7IH0sXG4gICAgICAgIHJlbW92ZTogZnVuY3Rpb24gcmVtb3ZlKCkge31cbiAgICAgIH07XG4gICAgfSkoKVxuKTtcbiIsICIndXNlIHN0cmljdCc7XG5cbi8qKlxuICogRGV0ZXJtaW5lcyB3aGV0aGVyIHRoZSBzcGVjaWZpZWQgVVJMIGlzIGFic29sdXRlXG4gKlxuICogQHBhcmFtIHtzdHJpbmd9IHVybCBUaGUgVVJMIHRvIHRlc3RcbiAqIEByZXR1cm5zIHtib29sZWFufSBUcnVlIGlmIHRoZSBzcGVjaWZpZWQgVVJMIGlzIGFic29sdXRlLCBvdGhlcndpc2UgZmFsc2VcbiAqL1xubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiBpc0Fic29sdXRlVVJMKHVybCkge1xuICAvLyBBIFVSTCBpcyBjb25zaWRlcmVkIGFic29sdXRlIGlmIGl0IGJlZ2lucyB3aXRoIFwiPHNjaGVtZT46Ly9cIiBvciBcIi8vXCIgKHByb3RvY29sLXJlbGF0aXZlIFVSTCkuXG4gIC8vIFJGQyAzOTg2IGRlZmluZXMgc2NoZW1lIG5hbWUgYXMgYSBzZXF1ZW5jZSBvZiBjaGFyYWN0ZXJzIGJlZ2lubmluZyB3aXRoIGEgbGV0dGVyIGFuZCBmb2xsb3dlZFxuICAvLyBieSBhbnkgY29tYmluYXRpb24gb2YgbGV0dGVycywgZGlnaXRzLCBwbHVzLCBwZXJpb2QsIG9yIGh5cGhlbi5cbiAgcmV0dXJuIC9eKFthLXpdW2EtelxcZCtcXC0uXSo6KT9cXC9cXC8vaS50ZXN0KHVybCk7XG59O1xuIiwgIid1c2Ugc3RyaWN0JztcblxuLyoqXG4gKiBDcmVhdGVzIGEgbmV3IFVSTCBieSBjb21iaW5pbmcgdGhlIHNwZWNpZmllZCBVUkxzXG4gKlxuICogQHBhcmFtIHtzdHJpbmd9IGJhc2VVUkwgVGhlIGJhc2UgVVJMXG4gKiBAcGFyYW0ge3N0cmluZ30gcmVsYXRpdmVVUkwgVGhlIHJlbGF0aXZlIFVSTFxuICogQHJldHVybnMge3N0cmluZ30gVGhlIGNvbWJpbmVkIFVSTFxuICovXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIGNvbWJpbmVVUkxzKGJhc2VVUkwsIHJlbGF0aXZlVVJMKSB7XG4gIHJldHVybiByZWxhdGl2ZVVSTFxuICAgID8gYmFzZVVSTC5yZXBsYWNlKC9cXC8rJC8sICcnKSArICcvJyArIHJlbGF0aXZlVVJMLnJlcGxhY2UoL15cXC8rLywgJycpXG4gICAgOiBiYXNlVVJMO1xufTtcbiIsICIndXNlIHN0cmljdCc7XG5cbnZhciBpc0Fic29sdXRlVVJMID0gcmVxdWlyZSgnLi4vaGVscGVycy9pc0Fic29sdXRlVVJMJyk7XG52YXIgY29tYmluZVVSTHMgPSByZXF1aXJlKCcuLi9oZWxwZXJzL2NvbWJpbmVVUkxzJyk7XG5cbi8qKlxuICogQ3JlYXRlcyBhIG5ldyBVUkwgYnkgY29tYmluaW5nIHRoZSBiYXNlVVJMIHdpdGggdGhlIHJlcXVlc3RlZFVSTCxcbiAqIG9ubHkgd2hlbiB0aGUgcmVxdWVzdGVkVVJMIGlzIG5vdCBhbHJlYWR5IGFuIGFic29sdXRlIFVSTC5cbiAqIElmIHRoZSByZXF1ZXN0VVJMIGlzIGFic29sdXRlLCB0aGlzIGZ1bmN0aW9uIHJldHVybnMgdGhlIHJlcXVlc3RlZFVSTCB1bnRvdWNoZWQuXG4gKlxuICogQHBhcmFtIHtzdHJpbmd9IGJhc2VVUkwgVGhlIGJhc2UgVVJMXG4gKiBAcGFyYW0ge3N0cmluZ30gcmVxdWVzdGVkVVJMIEFic29sdXRlIG9yIHJlbGF0aXZlIFVSTCB0byBjb21iaW5lXG4gKiBAcmV0dXJucyB7c3RyaW5nfSBUaGUgY29tYmluZWQgZnVsbCBwYXRoXG4gKi9cbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gYnVpbGRGdWxsUGF0aChiYXNlVVJMLCByZXF1ZXN0ZWRVUkwpIHtcbiAgaWYgKGJhc2VVUkwgJiYgIWlzQWJzb2x1dGVVUkwocmVxdWVzdGVkVVJMKSkge1xuICAgIHJldHVybiBjb21iaW5lVVJMcyhiYXNlVVJMLCByZXF1ZXN0ZWRVUkwpO1xuICB9XG4gIHJldHVybiByZXF1ZXN0ZWRVUkw7XG59O1xuIiwgIid1c2Ugc3RyaWN0JztcblxudmFyIHV0aWxzID0gcmVxdWlyZSgnLi8uLi91dGlscycpO1xuXG4vLyBIZWFkZXJzIHdob3NlIGR1cGxpY2F0ZXMgYXJlIGlnbm9yZWQgYnkgbm9kZVxuLy8gYy5mLiBodHRwczovL25vZGVqcy5vcmcvYXBpL2h0dHAuaHRtbCNodHRwX21lc3NhZ2VfaGVhZGVyc1xudmFyIGlnbm9yZUR1cGxpY2F0ZU9mID0gW1xuICAnYWdlJywgJ2F1dGhvcml6YXRpb24nLCAnY29udGVudC1sZW5ndGgnLCAnY29udGVudC10eXBlJywgJ2V0YWcnLFxuICAnZXhwaXJlcycsICdmcm9tJywgJ2hvc3QnLCAnaWYtbW9kaWZpZWQtc2luY2UnLCAnaWYtdW5tb2RpZmllZC1zaW5jZScsXG4gICdsYXN0LW1vZGlmaWVkJywgJ2xvY2F0aW9uJywgJ21heC1mb3J3YXJkcycsICdwcm94eS1hdXRob3JpemF0aW9uJyxcbiAgJ3JlZmVyZXInLCAncmV0cnktYWZ0ZXInLCAndXNlci1hZ2VudCdcbl07XG5cbi8qKlxuICogUGFyc2UgaGVhZGVycyBpbnRvIGFuIG9iamVjdFxuICpcbiAqIGBgYFxuICogRGF0ZTogV2VkLCAyNyBBdWcgMjAxNCAwODo1ODo0OSBHTVRcbiAqIENvbnRlbnQtVHlwZTogYXBwbGljYXRpb24vanNvblxuICogQ29ubmVjdGlvbjoga2VlcC1hbGl2ZVxuICogVHJhbnNmZXItRW5jb2Rpbmc6IGNodW5rZWRcbiAqIGBgYFxuICpcbiAqIEBwYXJhbSB7U3RyaW5nfSBoZWFkZXJzIEhlYWRlcnMgbmVlZGluZyB0byBiZSBwYXJzZWRcbiAqIEByZXR1cm5zIHtPYmplY3R9IEhlYWRlcnMgcGFyc2VkIGludG8gYW4gb2JqZWN0XG4gKi9cbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gcGFyc2VIZWFkZXJzKGhlYWRlcnMpIHtcbiAgdmFyIHBhcnNlZCA9IHt9O1xuICB2YXIga2V5O1xuICB2YXIgdmFsO1xuICB2YXIgaTtcblxuICBpZiAoIWhlYWRlcnMpIHsgcmV0dXJuIHBhcnNlZDsgfVxuXG4gIHV0aWxzLmZvckVhY2goaGVhZGVycy5zcGxpdCgnXFxuJyksIGZ1bmN0aW9uIHBhcnNlcihsaW5lKSB7XG4gICAgaSA9IGxpbmUuaW5kZXhPZignOicpO1xuICAgIGtleSA9IHV0aWxzLnRyaW0obGluZS5zdWJzdHIoMCwgaSkpLnRvTG93ZXJDYXNlKCk7XG4gICAgdmFsID0gdXRpbHMudHJpbShsaW5lLnN1YnN0cihpICsgMSkpO1xuXG4gICAgaWYgKGtleSkge1xuICAgICAgaWYgKHBhcnNlZFtrZXldICYmIGlnbm9yZUR1cGxpY2F0ZU9mLmluZGV4T2Yoa2V5KSA+PSAwKSB7XG4gICAgICAgIHJldHVybjtcbiAgICAgIH1cbiAgICAgIGlmIChrZXkgPT09ICdzZXQtY29va2llJykge1xuICAgICAgICBwYXJzZWRba2V5XSA9IChwYXJzZWRba2V5XSA/IHBhcnNlZFtrZXldIDogW10pLmNvbmNhdChbdmFsXSk7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBwYXJzZWRba2V5XSA9IHBhcnNlZFtrZXldID8gcGFyc2VkW2tleV0gKyAnLCAnICsgdmFsIDogdmFsO1xuICAgICAgfVxuICAgIH1cbiAgfSk7XG5cbiAgcmV0dXJuIHBhcnNlZDtcbn07XG4iLCAiJ3VzZSBzdHJpY3QnO1xuXG52YXIgdXRpbHMgPSByZXF1aXJlKCcuLy4uL3V0aWxzJyk7XG5cbm1vZHVsZS5leHBvcnRzID0gKFxuICB1dGlscy5pc1N0YW5kYXJkQnJvd3NlckVudigpID9cblxuICAvLyBTdGFuZGFyZCBicm93c2VyIGVudnMgaGF2ZSBmdWxsIHN1cHBvcnQgb2YgdGhlIEFQSXMgbmVlZGVkIHRvIHRlc3RcbiAgLy8gd2hldGhlciB0aGUgcmVxdWVzdCBVUkwgaXMgb2YgdGhlIHNhbWUgb3JpZ2luIGFzIGN1cnJlbnQgbG9jYXRpb24uXG4gICAgKGZ1bmN0aW9uIHN0YW5kYXJkQnJvd3NlckVudigpIHtcbiAgICAgIHZhciBtc2llID0gLyhtc2llfHRyaWRlbnQpL2kudGVzdChuYXZpZ2F0b3IudXNlckFnZW50KTtcbiAgICAgIHZhciB1cmxQYXJzaW5nTm9kZSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2EnKTtcbiAgICAgIHZhciBvcmlnaW5VUkw7XG5cbiAgICAgIC8qKlxuICAgICogUGFyc2UgYSBVUkwgdG8gZGlzY292ZXIgaXQncyBjb21wb25lbnRzXG4gICAgKlxuICAgICogQHBhcmFtIHtTdHJpbmd9IHVybCBUaGUgVVJMIHRvIGJlIHBhcnNlZFxuICAgICogQHJldHVybnMge09iamVjdH1cbiAgICAqL1xuICAgICAgZnVuY3Rpb24gcmVzb2x2ZVVSTCh1cmwpIHtcbiAgICAgICAgdmFyIGhyZWYgPSB1cmw7XG5cbiAgICAgICAgaWYgKG1zaWUpIHtcbiAgICAgICAgLy8gSUUgbmVlZHMgYXR0cmlidXRlIHNldCB0d2ljZSB0byBub3JtYWxpemUgcHJvcGVydGllc1xuICAgICAgICAgIHVybFBhcnNpbmdOb2RlLnNldEF0dHJpYnV0ZSgnaHJlZicsIGhyZWYpO1xuICAgICAgICAgIGhyZWYgPSB1cmxQYXJzaW5nTm9kZS5ocmVmO1xuICAgICAgICB9XG5cbiAgICAgICAgdXJsUGFyc2luZ05vZGUuc2V0QXR0cmlidXRlKCdocmVmJywgaHJlZik7XG5cbiAgICAgICAgLy8gdXJsUGFyc2luZ05vZGUgcHJvdmlkZXMgdGhlIFVybFV0aWxzIGludGVyZmFjZSAtIGh0dHA6Ly91cmwuc3BlYy53aGF0d2cub3JnLyN1cmx1dGlsc1xuICAgICAgICByZXR1cm4ge1xuICAgICAgICAgIGhyZWY6IHVybFBhcnNpbmdOb2RlLmhyZWYsXG4gICAgICAgICAgcHJvdG9jb2w6IHVybFBhcnNpbmdOb2RlLnByb3RvY29sID8gdXJsUGFyc2luZ05vZGUucHJvdG9jb2wucmVwbGFjZSgvOiQvLCAnJykgOiAnJyxcbiAgICAgICAgICBob3N0OiB1cmxQYXJzaW5nTm9kZS5ob3N0LFxuICAgICAgICAgIHNlYXJjaDogdXJsUGFyc2luZ05vZGUuc2VhcmNoID8gdXJsUGFyc2luZ05vZGUuc2VhcmNoLnJlcGxhY2UoL15cXD8vLCAnJykgOiAnJyxcbiAgICAgICAgICBoYXNoOiB1cmxQYXJzaW5nTm9kZS5oYXNoID8gdXJsUGFyc2luZ05vZGUuaGFzaC5yZXBsYWNlKC9eIy8sICcnKSA6ICcnLFxuICAgICAgICAgIGhvc3RuYW1lOiB1cmxQYXJzaW5nTm9kZS5ob3N0bmFtZSxcbiAgICAgICAgICBwb3J0OiB1cmxQYXJzaW5nTm9kZS5wb3J0LFxuICAgICAgICAgIHBhdGhuYW1lOiAodXJsUGFyc2luZ05vZGUucGF0aG5hbWUuY2hhckF0KDApID09PSAnLycpID9cbiAgICAgICAgICAgIHVybFBhcnNpbmdOb2RlLnBhdGhuYW1lIDpcbiAgICAgICAgICAgICcvJyArIHVybFBhcnNpbmdOb2RlLnBhdGhuYW1lXG4gICAgICAgIH07XG4gICAgICB9XG5cbiAgICAgIG9yaWdpblVSTCA9IHJlc29sdmVVUkwod2luZG93LmxvY2F0aW9uLmhyZWYpO1xuXG4gICAgICAvKipcbiAgICAqIERldGVybWluZSBpZiBhIFVSTCBzaGFyZXMgdGhlIHNhbWUgb3JpZ2luIGFzIHRoZSBjdXJyZW50IGxvY2F0aW9uXG4gICAgKlxuICAgICogQHBhcmFtIHtTdHJpbmd9IHJlcXVlc3RVUkwgVGhlIFVSTCB0byB0ZXN0XG4gICAgKiBAcmV0dXJucyB7Ym9vbGVhbn0gVHJ1ZSBpZiBVUkwgc2hhcmVzIHRoZSBzYW1lIG9yaWdpbiwgb3RoZXJ3aXNlIGZhbHNlXG4gICAgKi9cbiAgICAgIHJldHVybiBmdW5jdGlvbiBpc1VSTFNhbWVPcmlnaW4ocmVxdWVzdFVSTCkge1xuICAgICAgICB2YXIgcGFyc2VkID0gKHV0aWxzLmlzU3RyaW5nKHJlcXVlc3RVUkwpKSA/IHJlc29sdmVVUkwocmVxdWVzdFVSTCkgOiByZXF1ZXN0VVJMO1xuICAgICAgICByZXR1cm4gKHBhcnNlZC5wcm90b2NvbCA9PT0gb3JpZ2luVVJMLnByb3RvY29sICYmXG4gICAgICAgICAgICBwYXJzZWQuaG9zdCA9PT0gb3JpZ2luVVJMLmhvc3QpO1xuICAgICAgfTtcbiAgICB9KSgpIDpcblxuICAvLyBOb24gc3RhbmRhcmQgYnJvd3NlciBlbnZzICh3ZWIgd29ya2VycywgcmVhY3QtbmF0aXZlKSBsYWNrIG5lZWRlZCBzdXBwb3J0LlxuICAgIChmdW5jdGlvbiBub25TdGFuZGFyZEJyb3dzZXJFbnYoKSB7XG4gICAgICByZXR1cm4gZnVuY3Rpb24gaXNVUkxTYW1lT3JpZ2luKCkge1xuICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICAgIH07XG4gICAgfSkoKVxuKTtcbiIsICIndXNlIHN0cmljdCc7XG5cbnZhciBBeGlvc0Vycm9yID0gcmVxdWlyZSgnLi4vY29yZS9BeGlvc0Vycm9yJyk7XG52YXIgdXRpbHMgPSByZXF1aXJlKCcuLi91dGlscycpO1xuXG4vKipcbiAqIEEgYENhbmNlbGVkRXJyb3JgIGlzIGFuIG9iamVjdCB0aGF0IGlzIHRocm93biB3aGVuIGFuIG9wZXJhdGlvbiBpcyBjYW5jZWxlZC5cbiAqXG4gKiBAY2xhc3NcbiAqIEBwYXJhbSB7c3RyaW5nPX0gbWVzc2FnZSBUaGUgbWVzc2FnZS5cbiAqL1xuZnVuY3Rpb24gQ2FuY2VsZWRFcnJvcihtZXNzYWdlKSB7XG4gIC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBuby1lcS1udWxsLGVxZXFlcVxuICBBeGlvc0Vycm9yLmNhbGwodGhpcywgbWVzc2FnZSA9PSBudWxsID8gJ2NhbmNlbGVkJyA6IG1lc3NhZ2UsIEF4aW9zRXJyb3IuRVJSX0NBTkNFTEVEKTtcbiAgdGhpcy5uYW1lID0gJ0NhbmNlbGVkRXJyb3InO1xufVxuXG51dGlscy5pbmhlcml0cyhDYW5jZWxlZEVycm9yLCBBeGlvc0Vycm9yLCB7XG4gIF9fQ0FOQ0VMX186IHRydWVcbn0pO1xuXG5tb2R1bGUuZXhwb3J0cyA9IENhbmNlbGVkRXJyb3I7XG4iLCAiJ3VzZSBzdHJpY3QnO1xuXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIHBhcnNlUHJvdG9jb2wodXJsKSB7XG4gIHZhciBtYXRjaCA9IC9eKFstK1xcd117MSwyNX0pKDo/XFwvXFwvfDopLy5leGVjKHVybCk7XG4gIHJldHVybiBtYXRjaCAmJiBtYXRjaFsxXSB8fCAnJztcbn07XG4iLCAiJ3VzZSBzdHJpY3QnO1xuXG52YXIgdXRpbHMgPSByZXF1aXJlKCcuLy4uL3V0aWxzJyk7XG52YXIgc2V0dGxlID0gcmVxdWlyZSgnLi8uLi9jb3JlL3NldHRsZScpO1xudmFyIGNvb2tpZXMgPSByZXF1aXJlKCcuLy4uL2hlbHBlcnMvY29va2llcycpO1xudmFyIGJ1aWxkVVJMID0gcmVxdWlyZSgnLi8uLi9oZWxwZXJzL2J1aWxkVVJMJyk7XG52YXIgYnVpbGRGdWxsUGF0aCA9IHJlcXVpcmUoJy4uL2NvcmUvYnVpbGRGdWxsUGF0aCcpO1xudmFyIHBhcnNlSGVhZGVycyA9IHJlcXVpcmUoJy4vLi4vaGVscGVycy9wYXJzZUhlYWRlcnMnKTtcbnZhciBpc1VSTFNhbWVPcmlnaW4gPSByZXF1aXJlKCcuLy4uL2hlbHBlcnMvaXNVUkxTYW1lT3JpZ2luJyk7XG52YXIgdHJhbnNpdGlvbmFsRGVmYXVsdHMgPSByZXF1aXJlKCcuLi9kZWZhdWx0cy90cmFuc2l0aW9uYWwnKTtcbnZhciBBeGlvc0Vycm9yID0gcmVxdWlyZSgnLi4vY29yZS9BeGlvc0Vycm9yJyk7XG52YXIgQ2FuY2VsZWRFcnJvciA9IHJlcXVpcmUoJy4uL2NhbmNlbC9DYW5jZWxlZEVycm9yJyk7XG52YXIgcGFyc2VQcm90b2NvbCA9IHJlcXVpcmUoJy4uL2hlbHBlcnMvcGFyc2VQcm90b2NvbCcpO1xuXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIHhockFkYXB0ZXIoY29uZmlnKSB7XG4gIHJldHVybiBuZXcgUHJvbWlzZShmdW5jdGlvbiBkaXNwYXRjaFhoclJlcXVlc3QocmVzb2x2ZSwgcmVqZWN0KSB7XG4gICAgdmFyIHJlcXVlc3REYXRhID0gY29uZmlnLmRhdGE7XG4gICAgdmFyIHJlcXVlc3RIZWFkZXJzID0gY29uZmlnLmhlYWRlcnM7XG4gICAgdmFyIHJlc3BvbnNlVHlwZSA9IGNvbmZpZy5yZXNwb25zZVR5cGU7XG4gICAgdmFyIG9uQ2FuY2VsZWQ7XG4gICAgZnVuY3Rpb24gZG9uZSgpIHtcbiAgICAgIGlmIChjb25maWcuY2FuY2VsVG9rZW4pIHtcbiAgICAgICAgY29uZmlnLmNhbmNlbFRva2VuLnVuc3Vic2NyaWJlKG9uQ2FuY2VsZWQpO1xuICAgICAgfVxuXG4gICAgICBpZiAoY29uZmlnLnNpZ25hbCkge1xuICAgICAgICBjb25maWcuc2lnbmFsLnJlbW92ZUV2ZW50TGlzdGVuZXIoJ2Fib3J0Jywgb25DYW5jZWxlZCk7XG4gICAgICB9XG4gICAgfVxuXG4gICAgaWYgKHV0aWxzLmlzRm9ybURhdGEocmVxdWVzdERhdGEpICYmIHV0aWxzLmlzU3RhbmRhcmRCcm93c2VyRW52KCkpIHtcbiAgICAgIGRlbGV0ZSByZXF1ZXN0SGVhZGVyc1snQ29udGVudC1UeXBlJ107IC8vIExldCB0aGUgYnJvd3NlciBzZXQgaXRcbiAgICB9XG5cbiAgICB2YXIgcmVxdWVzdCA9IG5ldyBYTUxIdHRwUmVxdWVzdCgpO1xuXG4gICAgLy8gSFRUUCBiYXNpYyBhdXRoZW50aWNhdGlvblxuICAgIGlmIChjb25maWcuYXV0aCkge1xuICAgICAgdmFyIHVzZXJuYW1lID0gY29uZmlnLmF1dGgudXNlcm5hbWUgfHwgJyc7XG4gICAgICB2YXIgcGFzc3dvcmQgPSBjb25maWcuYXV0aC5wYXNzd29yZCA/IHVuZXNjYXBlKGVuY29kZVVSSUNvbXBvbmVudChjb25maWcuYXV0aC5wYXNzd29yZCkpIDogJyc7XG4gICAgICByZXF1ZXN0SGVhZGVycy5BdXRob3JpemF0aW9uID0gJ0Jhc2ljICcgKyBidG9hKHVzZXJuYW1lICsgJzonICsgcGFzc3dvcmQpO1xuICAgIH1cblxuICAgIHZhciBmdWxsUGF0aCA9IGJ1aWxkRnVsbFBhdGgoY29uZmlnLmJhc2VVUkwsIGNvbmZpZy51cmwpO1xuXG4gICAgcmVxdWVzdC5vcGVuKGNvbmZpZy5tZXRob2QudG9VcHBlckNhc2UoKSwgYnVpbGRVUkwoZnVsbFBhdGgsIGNvbmZpZy5wYXJhbXMsIGNvbmZpZy5wYXJhbXNTZXJpYWxpemVyKSwgdHJ1ZSk7XG5cbiAgICAvLyBTZXQgdGhlIHJlcXVlc3QgdGltZW91dCBpbiBNU1xuICAgIHJlcXVlc3QudGltZW91dCA9IGNvbmZpZy50aW1lb3V0O1xuXG4gICAgZnVuY3Rpb24gb25sb2FkZW5kKCkge1xuICAgICAgaWYgKCFyZXF1ZXN0KSB7XG4gICAgICAgIHJldHVybjtcbiAgICAgIH1cbiAgICAgIC8vIFByZXBhcmUgdGhlIHJlc3BvbnNlXG4gICAgICB2YXIgcmVzcG9uc2VIZWFkZXJzID0gJ2dldEFsbFJlc3BvbnNlSGVhZGVycycgaW4gcmVxdWVzdCA/IHBhcnNlSGVhZGVycyhyZXF1ZXN0LmdldEFsbFJlc3BvbnNlSGVhZGVycygpKSA6IG51bGw7XG4gICAgICB2YXIgcmVzcG9uc2VEYXRhID0gIXJlc3BvbnNlVHlwZSB8fCByZXNwb25zZVR5cGUgPT09ICd0ZXh0JyB8fCAgcmVzcG9uc2VUeXBlID09PSAnanNvbicgP1xuICAgICAgICByZXF1ZXN0LnJlc3BvbnNlVGV4dCA6IHJlcXVlc3QucmVzcG9uc2U7XG4gICAgICB2YXIgcmVzcG9uc2UgPSB7XG4gICAgICAgIGRhdGE6IHJlc3BvbnNlRGF0YSxcbiAgICAgICAgc3RhdHVzOiByZXF1ZXN0LnN0YXR1cyxcbiAgICAgICAgc3RhdHVzVGV4dDogcmVxdWVzdC5zdGF0dXNUZXh0LFxuICAgICAgICBoZWFkZXJzOiByZXNwb25zZUhlYWRlcnMsXG4gICAgICAgIGNvbmZpZzogY29uZmlnLFxuICAgICAgICByZXF1ZXN0OiByZXF1ZXN0XG4gICAgICB9O1xuXG4gICAgICBzZXR0bGUoZnVuY3Rpb24gX3Jlc29sdmUodmFsdWUpIHtcbiAgICAgICAgcmVzb2x2ZSh2YWx1ZSk7XG4gICAgICAgIGRvbmUoKTtcbiAgICAgIH0sIGZ1bmN0aW9uIF9yZWplY3QoZXJyKSB7XG4gICAgICAgIHJlamVjdChlcnIpO1xuICAgICAgICBkb25lKCk7XG4gICAgICB9LCByZXNwb25zZSk7XG5cbiAgICAgIC8vIENsZWFuIHVwIHJlcXVlc3RcbiAgICAgIHJlcXVlc3QgPSBudWxsO1xuICAgIH1cblxuICAgIGlmICgnb25sb2FkZW5kJyBpbiByZXF1ZXN0KSB7XG4gICAgICAvLyBVc2Ugb25sb2FkZW5kIGlmIGF2YWlsYWJsZVxuICAgICAgcmVxdWVzdC5vbmxvYWRlbmQgPSBvbmxvYWRlbmQ7XG4gICAgfSBlbHNlIHtcbiAgICAgIC8vIExpc3RlbiBmb3IgcmVhZHkgc3RhdGUgdG8gZW11bGF0ZSBvbmxvYWRlbmRcbiAgICAgIHJlcXVlc3Qub25yZWFkeXN0YXRlY2hhbmdlID0gZnVuY3Rpb24gaGFuZGxlTG9hZCgpIHtcbiAgICAgICAgaWYgKCFyZXF1ZXN0IHx8IHJlcXVlc3QucmVhZHlTdGF0ZSAhPT0gNCkge1xuICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuXG4gICAgICAgIC8vIFRoZSByZXF1ZXN0IGVycm9yZWQgb3V0IGFuZCB3ZSBkaWRuJ3QgZ2V0IGEgcmVzcG9uc2UsIHRoaXMgd2lsbCBiZVxuICAgICAgICAvLyBoYW5kbGVkIGJ5IG9uZXJyb3IgaW5zdGVhZFxuICAgICAgICAvLyBXaXRoIG9uZSBleGNlcHRpb246IHJlcXVlc3QgdGhhdCB1c2luZyBmaWxlOiBwcm90b2NvbCwgbW9zdCBicm93c2Vyc1xuICAgICAgICAvLyB3aWxsIHJldHVybiBzdGF0dXMgYXMgMCBldmVuIHRob3VnaCBpdCdzIGEgc3VjY2Vzc2Z1bCByZXF1ZXN0XG4gICAgICAgIGlmIChyZXF1ZXN0LnN0YXR1cyA9PT0gMCAmJiAhKHJlcXVlc3QucmVzcG9uc2VVUkwgJiYgcmVxdWVzdC5yZXNwb25zZVVSTC5pbmRleE9mKCdmaWxlOicpID09PSAwKSkge1xuICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuICAgICAgICAvLyByZWFkeXN0YXRlIGhhbmRsZXIgaXMgY2FsbGluZyBiZWZvcmUgb25lcnJvciBvciBvbnRpbWVvdXQgaGFuZGxlcnMsXG4gICAgICAgIC8vIHNvIHdlIHNob3VsZCBjYWxsIG9ubG9hZGVuZCBvbiB0aGUgbmV4dCAndGljaydcbiAgICAgICAgc2V0VGltZW91dChvbmxvYWRlbmQpO1xuICAgICAgfTtcbiAgICB9XG5cbiAgICAvLyBIYW5kbGUgYnJvd3NlciByZXF1ZXN0IGNhbmNlbGxhdGlvbiAoYXMgb3Bwb3NlZCB0byBhIG1hbnVhbCBjYW5jZWxsYXRpb24pXG4gICAgcmVxdWVzdC5vbmFib3J0ID0gZnVuY3Rpb24gaGFuZGxlQWJvcnQoKSB7XG4gICAgICBpZiAoIXJlcXVlc3QpIHtcbiAgICAgICAgcmV0dXJuO1xuICAgICAgfVxuXG4gICAgICByZWplY3QobmV3IEF4aW9zRXJyb3IoJ1JlcXVlc3QgYWJvcnRlZCcsIEF4aW9zRXJyb3IuRUNPTk5BQk9SVEVELCBjb25maWcsIHJlcXVlc3QpKTtcblxuICAgICAgLy8gQ2xlYW4gdXAgcmVxdWVzdFxuICAgICAgcmVxdWVzdCA9IG51bGw7XG4gICAgfTtcblxuICAgIC8vIEhhbmRsZSBsb3cgbGV2ZWwgbmV0d29yayBlcnJvcnNcbiAgICByZXF1ZXN0Lm9uZXJyb3IgPSBmdW5jdGlvbiBoYW5kbGVFcnJvcigpIHtcbiAgICAgIC8vIFJlYWwgZXJyb3JzIGFyZSBoaWRkZW4gZnJvbSB1cyBieSB0aGUgYnJvd3NlclxuICAgICAgLy8gb25lcnJvciBzaG91bGQgb25seSBmaXJlIGlmIGl0J3MgYSBuZXR3b3JrIGVycm9yXG4gICAgICByZWplY3QobmV3IEF4aW9zRXJyb3IoJ05ldHdvcmsgRXJyb3InLCBBeGlvc0Vycm9yLkVSUl9ORVRXT1JLLCBjb25maWcsIHJlcXVlc3QsIHJlcXVlc3QpKTtcblxuICAgICAgLy8gQ2xlYW4gdXAgcmVxdWVzdFxuICAgICAgcmVxdWVzdCA9IG51bGw7XG4gICAgfTtcblxuICAgIC8vIEhhbmRsZSB0aW1lb3V0XG4gICAgcmVxdWVzdC5vbnRpbWVvdXQgPSBmdW5jdGlvbiBoYW5kbGVUaW1lb3V0KCkge1xuICAgICAgdmFyIHRpbWVvdXRFcnJvck1lc3NhZ2UgPSBjb25maWcudGltZW91dCA/ICd0aW1lb3V0IG9mICcgKyBjb25maWcudGltZW91dCArICdtcyBleGNlZWRlZCcgOiAndGltZW91dCBleGNlZWRlZCc7XG4gICAgICB2YXIgdHJhbnNpdGlvbmFsID0gY29uZmlnLnRyYW5zaXRpb25hbCB8fCB0cmFuc2l0aW9uYWxEZWZhdWx0cztcbiAgICAgIGlmIChjb25maWcudGltZW91dEVycm9yTWVzc2FnZSkge1xuICAgICAgICB0aW1lb3V0RXJyb3JNZXNzYWdlID0gY29uZmlnLnRpbWVvdXRFcnJvck1lc3NhZ2U7XG4gICAgICB9XG4gICAgICByZWplY3QobmV3IEF4aW9zRXJyb3IoXG4gICAgICAgIHRpbWVvdXRFcnJvck1lc3NhZ2UsXG4gICAgICAgIHRyYW5zaXRpb25hbC5jbGFyaWZ5VGltZW91dEVycm9yID8gQXhpb3NFcnJvci5FVElNRURPVVQgOiBBeGlvc0Vycm9yLkVDT05OQUJPUlRFRCxcbiAgICAgICAgY29uZmlnLFxuICAgICAgICByZXF1ZXN0KSk7XG5cbiAgICAgIC8vIENsZWFuIHVwIHJlcXVlc3RcbiAgICAgIHJlcXVlc3QgPSBudWxsO1xuICAgIH07XG5cbiAgICAvLyBBZGQgeHNyZiBoZWFkZXJcbiAgICAvLyBUaGlzIGlzIG9ubHkgZG9uZSBpZiBydW5uaW5nIGluIGEgc3RhbmRhcmQgYnJvd3NlciBlbnZpcm9ubWVudC5cbiAgICAvLyBTcGVjaWZpY2FsbHkgbm90IGlmIHdlJ3JlIGluIGEgd2ViIHdvcmtlciwgb3IgcmVhY3QtbmF0aXZlLlxuICAgIGlmICh1dGlscy5pc1N0YW5kYXJkQnJvd3NlckVudigpKSB7XG4gICAgICAvLyBBZGQgeHNyZiBoZWFkZXJcbiAgICAgIHZhciB4c3JmVmFsdWUgPSAoY29uZmlnLndpdGhDcmVkZW50aWFscyB8fCBpc1VSTFNhbWVPcmlnaW4oZnVsbFBhdGgpKSAmJiBjb25maWcueHNyZkNvb2tpZU5hbWUgP1xuICAgICAgICBjb29raWVzLnJlYWQoY29uZmlnLnhzcmZDb29raWVOYW1lKSA6XG4gICAgICAgIHVuZGVmaW5lZDtcblxuICAgICAgaWYgKHhzcmZWYWx1ZSkge1xuICAgICAgICByZXF1ZXN0SGVhZGVyc1tjb25maWcueHNyZkhlYWRlck5hbWVdID0geHNyZlZhbHVlO1xuICAgICAgfVxuICAgIH1cblxuICAgIC8vIEFkZCBoZWFkZXJzIHRvIHRoZSByZXF1ZXN0XG4gICAgaWYgKCdzZXRSZXF1ZXN0SGVhZGVyJyBpbiByZXF1ZXN0KSB7XG4gICAgICB1dGlscy5mb3JFYWNoKHJlcXVlc3RIZWFkZXJzLCBmdW5jdGlvbiBzZXRSZXF1ZXN0SGVhZGVyKHZhbCwga2V5KSB7XG4gICAgICAgIGlmICh0eXBlb2YgcmVxdWVzdERhdGEgPT09ICd1bmRlZmluZWQnICYmIGtleS50b0xvd2VyQ2FzZSgpID09PSAnY29udGVudC10eXBlJykge1xuICAgICAgICAgIC8vIFJlbW92ZSBDb250ZW50LVR5cGUgaWYgZGF0YSBpcyB1bmRlZmluZWRcbiAgICAgICAgICBkZWxldGUgcmVxdWVzdEhlYWRlcnNba2V5XTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAvLyBPdGhlcndpc2UgYWRkIGhlYWRlciB0byB0aGUgcmVxdWVzdFxuICAgICAgICAgIHJlcXVlc3Quc2V0UmVxdWVzdEhlYWRlcihrZXksIHZhbCk7XG4gICAgICAgIH1cbiAgICAgIH0pO1xuICAgIH1cblxuICAgIC8vIEFkZCB3aXRoQ3JlZGVudGlhbHMgdG8gcmVxdWVzdCBpZiBuZWVkZWRcbiAgICBpZiAoIXV0aWxzLmlzVW5kZWZpbmVkKGNvbmZpZy53aXRoQ3JlZGVudGlhbHMpKSB7XG4gICAgICByZXF1ZXN0LndpdGhDcmVkZW50aWFscyA9ICEhY29uZmlnLndpdGhDcmVkZW50aWFscztcbiAgICB9XG5cbiAgICAvLyBBZGQgcmVzcG9uc2VUeXBlIHRvIHJlcXVlc3QgaWYgbmVlZGVkXG4gICAgaWYgKHJlc3BvbnNlVHlwZSAmJiByZXNwb25zZVR5cGUgIT09ICdqc29uJykge1xuICAgICAgcmVxdWVzdC5yZXNwb25zZVR5cGUgPSBjb25maWcucmVzcG9uc2VUeXBlO1xuICAgIH1cblxuICAgIC8vIEhhbmRsZSBwcm9ncmVzcyBpZiBuZWVkZWRcbiAgICBpZiAodHlwZW9mIGNvbmZpZy5vbkRvd25sb2FkUHJvZ3Jlc3MgPT09ICdmdW5jdGlvbicpIHtcbiAgICAgIHJlcXVlc3QuYWRkRXZlbnRMaXN0ZW5lcigncHJvZ3Jlc3MnLCBjb25maWcub25Eb3dubG9hZFByb2dyZXNzKTtcbiAgICB9XG5cbiAgICAvLyBOb3QgYWxsIGJyb3dzZXJzIHN1cHBvcnQgdXBsb2FkIGV2ZW50c1xuICAgIGlmICh0eXBlb2YgY29uZmlnLm9uVXBsb2FkUHJvZ3Jlc3MgPT09ICdmdW5jdGlvbicgJiYgcmVxdWVzdC51cGxvYWQpIHtcbiAgICAgIHJlcXVlc3QudXBsb2FkLmFkZEV2ZW50TGlzdGVuZXIoJ3Byb2dyZXNzJywgY29uZmlnLm9uVXBsb2FkUHJvZ3Jlc3MpO1xuICAgIH1cblxuICAgIGlmIChjb25maWcuY2FuY2VsVG9rZW4gfHwgY29uZmlnLnNpZ25hbCkge1xuICAgICAgLy8gSGFuZGxlIGNhbmNlbGxhdGlvblxuICAgICAgLy8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIGZ1bmMtbmFtZXNcbiAgICAgIG9uQ2FuY2VsZWQgPSBmdW5jdGlvbihjYW5jZWwpIHtcbiAgICAgICAgaWYgKCFyZXF1ZXN0KSB7XG4gICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG4gICAgICAgIHJlamVjdCghY2FuY2VsIHx8IChjYW5jZWwgJiYgY2FuY2VsLnR5cGUpID8gbmV3IENhbmNlbGVkRXJyb3IoKSA6IGNhbmNlbCk7XG4gICAgICAgIHJlcXVlc3QuYWJvcnQoKTtcbiAgICAgICAgcmVxdWVzdCA9IG51bGw7XG4gICAgICB9O1xuXG4gICAgICBjb25maWcuY2FuY2VsVG9rZW4gJiYgY29uZmlnLmNhbmNlbFRva2VuLnN1YnNjcmliZShvbkNhbmNlbGVkKTtcbiAgICAgIGlmIChjb25maWcuc2lnbmFsKSB7XG4gICAgICAgIGNvbmZpZy5zaWduYWwuYWJvcnRlZCA/IG9uQ2FuY2VsZWQoKSA6IGNvbmZpZy5zaWduYWwuYWRkRXZlbnRMaXN0ZW5lcignYWJvcnQnLCBvbkNhbmNlbGVkKTtcbiAgICAgIH1cbiAgICB9XG5cbiAgICBpZiAoIXJlcXVlc3REYXRhKSB7XG4gICAgICByZXF1ZXN0RGF0YSA9IG51bGw7XG4gICAgfVxuXG4gICAgdmFyIHByb3RvY29sID0gcGFyc2VQcm90b2NvbChmdWxsUGF0aCk7XG5cbiAgICBpZiAocHJvdG9jb2wgJiYgWyAnaHR0cCcsICdodHRwcycsICdmaWxlJyBdLmluZGV4T2YocHJvdG9jb2wpID09PSAtMSkge1xuICAgICAgcmVqZWN0KG5ldyBBeGlvc0Vycm9yKCdVbnN1cHBvcnRlZCBwcm90b2NvbCAnICsgcHJvdG9jb2wgKyAnOicsIEF4aW9zRXJyb3IuRVJSX0JBRF9SRVFVRVNULCBjb25maWcpKTtcbiAgICAgIHJldHVybjtcbiAgICB9XG5cblxuICAgIC8vIFNlbmQgdGhlIHJlcXVlc3RcbiAgICByZXF1ZXN0LnNlbmQocmVxdWVzdERhdGEpO1xuICB9KTtcbn07XG4iLCAiLy8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIHN0cmljdFxubW9kdWxlLmV4cG9ydHMgPSBudWxsO1xuIiwgIid1c2Ugc3RyaWN0JztcblxudmFyIHV0aWxzID0gcmVxdWlyZSgnLi4vdXRpbHMnKTtcbnZhciBub3JtYWxpemVIZWFkZXJOYW1lID0gcmVxdWlyZSgnLi4vaGVscGVycy9ub3JtYWxpemVIZWFkZXJOYW1lJyk7XG52YXIgQXhpb3NFcnJvciA9IHJlcXVpcmUoJy4uL2NvcmUvQXhpb3NFcnJvcicpO1xudmFyIHRyYW5zaXRpb25hbERlZmF1bHRzID0gcmVxdWlyZSgnLi90cmFuc2l0aW9uYWwnKTtcbnZhciB0b0Zvcm1EYXRhID0gcmVxdWlyZSgnLi4vaGVscGVycy90b0Zvcm1EYXRhJyk7XG5cbnZhciBERUZBVUxUX0NPTlRFTlRfVFlQRSA9IHtcbiAgJ0NvbnRlbnQtVHlwZSc6ICdhcHBsaWNhdGlvbi94LXd3dy1mb3JtLXVybGVuY29kZWQnXG59O1xuXG5mdW5jdGlvbiBzZXRDb250ZW50VHlwZUlmVW5zZXQoaGVhZGVycywgdmFsdWUpIHtcbiAgaWYgKCF1dGlscy5pc1VuZGVmaW5lZChoZWFkZXJzKSAmJiB1dGlscy5pc1VuZGVmaW5lZChoZWFkZXJzWydDb250ZW50LVR5cGUnXSkpIHtcbiAgICBoZWFkZXJzWydDb250ZW50LVR5cGUnXSA9IHZhbHVlO1xuICB9XG59XG5cbmZ1bmN0aW9uIGdldERlZmF1bHRBZGFwdGVyKCkge1xuICB2YXIgYWRhcHRlcjtcbiAgaWYgKHR5cGVvZiBYTUxIdHRwUmVxdWVzdCAhPT0gJ3VuZGVmaW5lZCcpIHtcbiAgICAvLyBGb3IgYnJvd3NlcnMgdXNlIFhIUiBhZGFwdGVyXG4gICAgYWRhcHRlciA9IHJlcXVpcmUoJy4uL2FkYXB0ZXJzL3hocicpO1xuICB9IGVsc2UgaWYgKHR5cGVvZiBwcm9jZXNzICE9PSAndW5kZWZpbmVkJyAmJiBPYmplY3QucHJvdG90eXBlLnRvU3RyaW5nLmNhbGwocHJvY2VzcykgPT09ICdbb2JqZWN0IHByb2Nlc3NdJykge1xuICAgIC8vIEZvciBub2RlIHVzZSBIVFRQIGFkYXB0ZXJcbiAgICBhZGFwdGVyID0gcmVxdWlyZSgnLi4vYWRhcHRlcnMvaHR0cCcpO1xuICB9XG4gIHJldHVybiBhZGFwdGVyO1xufVxuXG5mdW5jdGlvbiBzdHJpbmdpZnlTYWZlbHkocmF3VmFsdWUsIHBhcnNlciwgZW5jb2Rlcikge1xuICBpZiAodXRpbHMuaXNTdHJpbmcocmF3VmFsdWUpKSB7XG4gICAgdHJ5IHtcbiAgICAgIChwYXJzZXIgfHwgSlNPTi5wYXJzZSkocmF3VmFsdWUpO1xuICAgICAgcmV0dXJuIHV0aWxzLnRyaW0ocmF3VmFsdWUpO1xuICAgIH0gY2F0Y2ggKGUpIHtcbiAgICAgIGlmIChlLm5hbWUgIT09ICdTeW50YXhFcnJvcicpIHtcbiAgICAgICAgdGhyb3cgZTtcbiAgICAgIH1cbiAgICB9XG4gIH1cblxuICByZXR1cm4gKGVuY29kZXIgfHwgSlNPTi5zdHJpbmdpZnkpKHJhd1ZhbHVlKTtcbn1cblxudmFyIGRlZmF1bHRzID0ge1xuXG4gIHRyYW5zaXRpb25hbDogdHJhbnNpdGlvbmFsRGVmYXVsdHMsXG5cbiAgYWRhcHRlcjogZ2V0RGVmYXVsdEFkYXB0ZXIoKSxcblxuICB0cmFuc2Zvcm1SZXF1ZXN0OiBbZnVuY3Rpb24gdHJhbnNmb3JtUmVxdWVzdChkYXRhLCBoZWFkZXJzKSB7XG4gICAgbm9ybWFsaXplSGVhZGVyTmFtZShoZWFkZXJzLCAnQWNjZXB0Jyk7XG4gICAgbm9ybWFsaXplSGVhZGVyTmFtZShoZWFkZXJzLCAnQ29udGVudC1UeXBlJyk7XG5cbiAgICBpZiAodXRpbHMuaXNGb3JtRGF0YShkYXRhKSB8fFxuICAgICAgdXRpbHMuaXNBcnJheUJ1ZmZlcihkYXRhKSB8fFxuICAgICAgdXRpbHMuaXNCdWZmZXIoZGF0YSkgfHxcbiAgICAgIHV0aWxzLmlzU3RyZWFtKGRhdGEpIHx8XG4gICAgICB1dGlscy5pc0ZpbGUoZGF0YSkgfHxcbiAgICAgIHV0aWxzLmlzQmxvYihkYXRhKVxuICAgICkge1xuICAgICAgcmV0dXJuIGRhdGE7XG4gICAgfVxuICAgIGlmICh1dGlscy5pc0FycmF5QnVmZmVyVmlldyhkYXRhKSkge1xuICAgICAgcmV0dXJuIGRhdGEuYnVmZmVyO1xuICAgIH1cbiAgICBpZiAodXRpbHMuaXNVUkxTZWFyY2hQYXJhbXMoZGF0YSkpIHtcbiAgICAgIHNldENvbnRlbnRUeXBlSWZVbnNldChoZWFkZXJzLCAnYXBwbGljYXRpb24veC13d3ctZm9ybS11cmxlbmNvZGVkO2NoYXJzZXQ9dXRmLTgnKTtcbiAgICAgIHJldHVybiBkYXRhLnRvU3RyaW5nKCk7XG4gICAgfVxuXG4gICAgdmFyIGlzT2JqZWN0UGF5bG9hZCA9IHV0aWxzLmlzT2JqZWN0KGRhdGEpO1xuICAgIHZhciBjb250ZW50VHlwZSA9IGhlYWRlcnMgJiYgaGVhZGVyc1snQ29udGVudC1UeXBlJ107XG5cbiAgICB2YXIgaXNGaWxlTGlzdDtcblxuICAgIGlmICgoaXNGaWxlTGlzdCA9IHV0aWxzLmlzRmlsZUxpc3QoZGF0YSkpIHx8IChpc09iamVjdFBheWxvYWQgJiYgY29udGVudFR5cGUgPT09ICdtdWx0aXBhcnQvZm9ybS1kYXRhJykpIHtcbiAgICAgIHZhciBfRm9ybURhdGEgPSB0aGlzLmVudiAmJiB0aGlzLmVudi5Gb3JtRGF0YTtcbiAgICAgIHJldHVybiB0b0Zvcm1EYXRhKGlzRmlsZUxpc3QgPyB7J2ZpbGVzW10nOiBkYXRhfSA6IGRhdGEsIF9Gb3JtRGF0YSAmJiBuZXcgX0Zvcm1EYXRhKCkpO1xuICAgIH0gZWxzZSBpZiAoaXNPYmplY3RQYXlsb2FkIHx8IGNvbnRlbnRUeXBlID09PSAnYXBwbGljYXRpb24vanNvbicpIHtcbiAgICAgIHNldENvbnRlbnRUeXBlSWZVbnNldChoZWFkZXJzLCAnYXBwbGljYXRpb24vanNvbicpO1xuICAgICAgcmV0dXJuIHN0cmluZ2lmeVNhZmVseShkYXRhKTtcbiAgICB9XG5cbiAgICByZXR1cm4gZGF0YTtcbiAgfV0sXG5cbiAgdHJhbnNmb3JtUmVzcG9uc2U6IFtmdW5jdGlvbiB0cmFuc2Zvcm1SZXNwb25zZShkYXRhKSB7XG4gICAgdmFyIHRyYW5zaXRpb25hbCA9IHRoaXMudHJhbnNpdGlvbmFsIHx8IGRlZmF1bHRzLnRyYW5zaXRpb25hbDtcbiAgICB2YXIgc2lsZW50SlNPTlBhcnNpbmcgPSB0cmFuc2l0aW9uYWwgJiYgdHJhbnNpdGlvbmFsLnNpbGVudEpTT05QYXJzaW5nO1xuICAgIHZhciBmb3JjZWRKU09OUGFyc2luZyA9IHRyYW5zaXRpb25hbCAmJiB0cmFuc2l0aW9uYWwuZm9yY2VkSlNPTlBhcnNpbmc7XG4gICAgdmFyIHN0cmljdEpTT05QYXJzaW5nID0gIXNpbGVudEpTT05QYXJzaW5nICYmIHRoaXMucmVzcG9uc2VUeXBlID09PSAnanNvbic7XG5cbiAgICBpZiAoc3RyaWN0SlNPTlBhcnNpbmcgfHwgKGZvcmNlZEpTT05QYXJzaW5nICYmIHV0aWxzLmlzU3RyaW5nKGRhdGEpICYmIGRhdGEubGVuZ3RoKSkge1xuICAgICAgdHJ5IHtcbiAgICAgICAgcmV0dXJuIEpTT04ucGFyc2UoZGF0YSk7XG4gICAgICB9IGNhdGNoIChlKSB7XG4gICAgICAgIGlmIChzdHJpY3RKU09OUGFyc2luZykge1xuICAgICAgICAgIGlmIChlLm5hbWUgPT09ICdTeW50YXhFcnJvcicpIHtcbiAgICAgICAgICAgIHRocm93IEF4aW9zRXJyb3IuZnJvbShlLCBBeGlvc0Vycm9yLkVSUl9CQURfUkVTUE9OU0UsIHRoaXMsIG51bGwsIHRoaXMucmVzcG9uc2UpO1xuICAgICAgICAgIH1cbiAgICAgICAgICB0aHJvdyBlO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgfVxuXG4gICAgcmV0dXJuIGRhdGE7XG4gIH1dLFxuXG4gIC8qKlxuICAgKiBBIHRpbWVvdXQgaW4gbWlsbGlzZWNvbmRzIHRvIGFib3J0IGEgcmVxdWVzdC4gSWYgc2V0IHRvIDAgKGRlZmF1bHQpIGFcbiAgICogdGltZW91dCBpcyBub3QgY3JlYXRlZC5cbiAgICovXG4gIHRpbWVvdXQ6IDAsXG5cbiAgeHNyZkNvb2tpZU5hbWU6ICdYU1JGLVRPS0VOJyxcbiAgeHNyZkhlYWRlck5hbWU6ICdYLVhTUkYtVE9LRU4nLFxuXG4gIG1heENvbnRlbnRMZW5ndGg6IC0xLFxuICBtYXhCb2R5TGVuZ3RoOiAtMSxcblxuICBlbnY6IHtcbiAgICBGb3JtRGF0YTogcmVxdWlyZSgnLi9lbnYvRm9ybURhdGEnKVxuICB9LFxuXG4gIHZhbGlkYXRlU3RhdHVzOiBmdW5jdGlvbiB2YWxpZGF0ZVN0YXR1cyhzdGF0dXMpIHtcbiAgICByZXR1cm4gc3RhdHVzID49IDIwMCAmJiBzdGF0dXMgPCAzMDA7XG4gIH0sXG5cbiAgaGVhZGVyczoge1xuICAgIGNvbW1vbjoge1xuICAgICAgJ0FjY2VwdCc6ICdhcHBsaWNhdGlvbi9qc29uLCB0ZXh0L3BsYWluLCAqLyonXG4gICAgfVxuICB9XG59O1xuXG51dGlscy5mb3JFYWNoKFsnZGVsZXRlJywgJ2dldCcsICdoZWFkJ10sIGZ1bmN0aW9uIGZvckVhY2hNZXRob2ROb0RhdGEobWV0aG9kKSB7XG4gIGRlZmF1bHRzLmhlYWRlcnNbbWV0aG9kXSA9IHt9O1xufSk7XG5cbnV0aWxzLmZvckVhY2goWydwb3N0JywgJ3B1dCcsICdwYXRjaCddLCBmdW5jdGlvbiBmb3JFYWNoTWV0aG9kV2l0aERhdGEobWV0aG9kKSB7XG4gIGRlZmF1bHRzLmhlYWRlcnNbbWV0aG9kXSA9IHV0aWxzLm1lcmdlKERFRkFVTFRfQ09OVEVOVF9UWVBFKTtcbn0pO1xuXG5tb2R1bGUuZXhwb3J0cyA9IGRlZmF1bHRzO1xuIiwgIid1c2Ugc3RyaWN0JztcblxudmFyIHV0aWxzID0gcmVxdWlyZSgnLi8uLi91dGlscycpO1xudmFyIGRlZmF1bHRzID0gcmVxdWlyZSgnLi4vZGVmYXVsdHMnKTtcblxuLyoqXG4gKiBUcmFuc2Zvcm0gdGhlIGRhdGEgZm9yIGEgcmVxdWVzdCBvciBhIHJlc3BvbnNlXG4gKlxuICogQHBhcmFtIHtPYmplY3R8U3RyaW5nfSBkYXRhIFRoZSBkYXRhIHRvIGJlIHRyYW5zZm9ybWVkXG4gKiBAcGFyYW0ge0FycmF5fSBoZWFkZXJzIFRoZSBoZWFkZXJzIGZvciB0aGUgcmVxdWVzdCBvciByZXNwb25zZVxuICogQHBhcmFtIHtBcnJheXxGdW5jdGlvbn0gZm5zIEEgc2luZ2xlIGZ1bmN0aW9uIG9yIEFycmF5IG9mIGZ1bmN0aW9uc1xuICogQHJldHVybnMgeyp9IFRoZSByZXN1bHRpbmcgdHJhbnNmb3JtZWQgZGF0YVxuICovXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIHRyYW5zZm9ybURhdGEoZGF0YSwgaGVhZGVycywgZm5zKSB7XG4gIHZhciBjb250ZXh0ID0gdGhpcyB8fCBkZWZhdWx0cztcbiAgLyplc2xpbnQgbm8tcGFyYW0tcmVhc3NpZ246MCovXG4gIHV0aWxzLmZvckVhY2goZm5zLCBmdW5jdGlvbiB0cmFuc2Zvcm0oZm4pIHtcbiAgICBkYXRhID0gZm4uY2FsbChjb250ZXh0LCBkYXRhLCBoZWFkZXJzKTtcbiAgfSk7XG5cbiAgcmV0dXJuIGRhdGE7XG59O1xuIiwgIid1c2Ugc3RyaWN0JztcblxubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiBpc0NhbmNlbCh2YWx1ZSkge1xuICByZXR1cm4gISEodmFsdWUgJiYgdmFsdWUuX19DQU5DRUxfXyk7XG59O1xuIiwgIid1c2Ugc3RyaWN0JztcblxudmFyIHV0aWxzID0gcmVxdWlyZSgnLi8uLi91dGlscycpO1xudmFyIHRyYW5zZm9ybURhdGEgPSByZXF1aXJlKCcuL3RyYW5zZm9ybURhdGEnKTtcbnZhciBpc0NhbmNlbCA9IHJlcXVpcmUoJy4uL2NhbmNlbC9pc0NhbmNlbCcpO1xudmFyIGRlZmF1bHRzID0gcmVxdWlyZSgnLi4vZGVmYXVsdHMnKTtcbnZhciBDYW5jZWxlZEVycm9yID0gcmVxdWlyZSgnLi4vY2FuY2VsL0NhbmNlbGVkRXJyb3InKTtcblxuLyoqXG4gKiBUaHJvd3MgYSBgQ2FuY2VsZWRFcnJvcmAgaWYgY2FuY2VsbGF0aW9uIGhhcyBiZWVuIHJlcXVlc3RlZC5cbiAqL1xuZnVuY3Rpb24gdGhyb3dJZkNhbmNlbGxhdGlvblJlcXVlc3RlZChjb25maWcpIHtcbiAgaWYgKGNvbmZpZy5jYW5jZWxUb2tlbikge1xuICAgIGNvbmZpZy5jYW5jZWxUb2tlbi50aHJvd0lmUmVxdWVzdGVkKCk7XG4gIH1cblxuICBpZiAoY29uZmlnLnNpZ25hbCAmJiBjb25maWcuc2lnbmFsLmFib3J0ZWQpIHtcbiAgICB0aHJvdyBuZXcgQ2FuY2VsZWRFcnJvcigpO1xuICB9XG59XG5cbi8qKlxuICogRGlzcGF0Y2ggYSByZXF1ZXN0IHRvIHRoZSBzZXJ2ZXIgdXNpbmcgdGhlIGNvbmZpZ3VyZWQgYWRhcHRlci5cbiAqXG4gKiBAcGFyYW0ge29iamVjdH0gY29uZmlnIFRoZSBjb25maWcgdGhhdCBpcyB0byBiZSB1c2VkIGZvciB0aGUgcmVxdWVzdFxuICogQHJldHVybnMge1Byb21pc2V9IFRoZSBQcm9taXNlIHRvIGJlIGZ1bGZpbGxlZFxuICovXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIGRpc3BhdGNoUmVxdWVzdChjb25maWcpIHtcbiAgdGhyb3dJZkNhbmNlbGxhdGlvblJlcXVlc3RlZChjb25maWcpO1xuXG4gIC8vIEVuc3VyZSBoZWFkZXJzIGV4aXN0XG4gIGNvbmZpZy5oZWFkZXJzID0gY29uZmlnLmhlYWRlcnMgfHwge307XG5cbiAgLy8gVHJhbnNmb3JtIHJlcXVlc3QgZGF0YVxuICBjb25maWcuZGF0YSA9IHRyYW5zZm9ybURhdGEuY2FsbChcbiAgICBjb25maWcsXG4gICAgY29uZmlnLmRhdGEsXG4gICAgY29uZmlnLmhlYWRlcnMsXG4gICAgY29uZmlnLnRyYW5zZm9ybVJlcXVlc3RcbiAgKTtcblxuICAvLyBGbGF0dGVuIGhlYWRlcnNcbiAgY29uZmlnLmhlYWRlcnMgPSB1dGlscy5tZXJnZShcbiAgICBjb25maWcuaGVhZGVycy5jb21tb24gfHwge30sXG4gICAgY29uZmlnLmhlYWRlcnNbY29uZmlnLm1ldGhvZF0gfHwge30sXG4gICAgY29uZmlnLmhlYWRlcnNcbiAgKTtcblxuICB1dGlscy5mb3JFYWNoKFxuICAgIFsnZGVsZXRlJywgJ2dldCcsICdoZWFkJywgJ3Bvc3QnLCAncHV0JywgJ3BhdGNoJywgJ2NvbW1vbiddLFxuICAgIGZ1bmN0aW9uIGNsZWFuSGVhZGVyQ29uZmlnKG1ldGhvZCkge1xuICAgICAgZGVsZXRlIGNvbmZpZy5oZWFkZXJzW21ldGhvZF07XG4gICAgfVxuICApO1xuXG4gIHZhciBhZGFwdGVyID0gY29uZmlnLmFkYXB0ZXIgfHwgZGVmYXVsdHMuYWRhcHRlcjtcblxuICByZXR1cm4gYWRhcHRlcihjb25maWcpLnRoZW4oZnVuY3Rpb24gb25BZGFwdGVyUmVzb2x1dGlvbihyZXNwb25zZSkge1xuICAgIHRocm93SWZDYW5jZWxsYXRpb25SZXF1ZXN0ZWQoY29uZmlnKTtcblxuICAgIC8vIFRyYW5zZm9ybSByZXNwb25zZSBkYXRhXG4gICAgcmVzcG9uc2UuZGF0YSA9IHRyYW5zZm9ybURhdGEuY2FsbChcbiAgICAgIGNvbmZpZyxcbiAgICAgIHJlc3BvbnNlLmRhdGEsXG4gICAgICByZXNwb25zZS5oZWFkZXJzLFxuICAgICAgY29uZmlnLnRyYW5zZm9ybVJlc3BvbnNlXG4gICAgKTtcblxuICAgIHJldHVybiByZXNwb25zZTtcbiAgfSwgZnVuY3Rpb24gb25BZGFwdGVyUmVqZWN0aW9uKHJlYXNvbikge1xuICAgIGlmICghaXNDYW5jZWwocmVhc29uKSkge1xuICAgICAgdGhyb3dJZkNhbmNlbGxhdGlvblJlcXVlc3RlZChjb25maWcpO1xuXG4gICAgICAvLyBUcmFuc2Zvcm0gcmVzcG9uc2UgZGF0YVxuICAgICAgaWYgKHJlYXNvbiAmJiByZWFzb24ucmVzcG9uc2UpIHtcbiAgICAgICAgcmVhc29uLnJlc3BvbnNlLmRhdGEgPSB0cmFuc2Zvcm1EYXRhLmNhbGwoXG4gICAgICAgICAgY29uZmlnLFxuICAgICAgICAgIHJlYXNvbi5yZXNwb25zZS5kYXRhLFxuICAgICAgICAgIHJlYXNvbi5yZXNwb25zZS5oZWFkZXJzLFxuICAgICAgICAgIGNvbmZpZy50cmFuc2Zvcm1SZXNwb25zZVxuICAgICAgICApO1xuICAgICAgfVxuICAgIH1cblxuICAgIHJldHVybiBQcm9taXNlLnJlamVjdChyZWFzb24pO1xuICB9KTtcbn07XG4iLCAiJ3VzZSBzdHJpY3QnO1xuXG52YXIgdXRpbHMgPSByZXF1aXJlKCcuLi91dGlscycpO1xuXG4vKipcbiAqIENvbmZpZy1zcGVjaWZpYyBtZXJnZS1mdW5jdGlvbiB3aGljaCBjcmVhdGVzIGEgbmV3IGNvbmZpZy1vYmplY3RcbiAqIGJ5IG1lcmdpbmcgdHdvIGNvbmZpZ3VyYXRpb24gb2JqZWN0cyB0b2dldGhlci5cbiAqXG4gKiBAcGFyYW0ge09iamVjdH0gY29uZmlnMVxuICogQHBhcmFtIHtPYmplY3R9IGNvbmZpZzJcbiAqIEByZXR1cm5zIHtPYmplY3R9IE5ldyBvYmplY3QgcmVzdWx0aW5nIGZyb20gbWVyZ2luZyBjb25maWcyIHRvIGNvbmZpZzFcbiAqL1xubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiBtZXJnZUNvbmZpZyhjb25maWcxLCBjb25maWcyKSB7XG4gIC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBuby1wYXJhbS1yZWFzc2lnblxuICBjb25maWcyID0gY29uZmlnMiB8fCB7fTtcbiAgdmFyIGNvbmZpZyA9IHt9O1xuXG4gIGZ1bmN0aW9uIGdldE1lcmdlZFZhbHVlKHRhcmdldCwgc291cmNlKSB7XG4gICAgaWYgKHV0aWxzLmlzUGxhaW5PYmplY3QodGFyZ2V0KSAmJiB1dGlscy5pc1BsYWluT2JqZWN0KHNvdXJjZSkpIHtcbiAgICAgIHJldHVybiB1dGlscy5tZXJnZSh0YXJnZXQsIHNvdXJjZSk7XG4gICAgfSBlbHNlIGlmICh1dGlscy5pc1BsYWluT2JqZWN0KHNvdXJjZSkpIHtcbiAgICAgIHJldHVybiB1dGlscy5tZXJnZSh7fSwgc291cmNlKTtcbiAgICB9IGVsc2UgaWYgKHV0aWxzLmlzQXJyYXkoc291cmNlKSkge1xuICAgICAgcmV0dXJuIHNvdXJjZS5zbGljZSgpO1xuICAgIH1cbiAgICByZXR1cm4gc291cmNlO1xuICB9XG5cbiAgLy8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIGNvbnNpc3RlbnQtcmV0dXJuXG4gIGZ1bmN0aW9uIG1lcmdlRGVlcFByb3BlcnRpZXMocHJvcCkge1xuICAgIGlmICghdXRpbHMuaXNVbmRlZmluZWQoY29uZmlnMltwcm9wXSkpIHtcbiAgICAgIHJldHVybiBnZXRNZXJnZWRWYWx1ZShjb25maWcxW3Byb3BdLCBjb25maWcyW3Byb3BdKTtcbiAgICB9IGVsc2UgaWYgKCF1dGlscy5pc1VuZGVmaW5lZChjb25maWcxW3Byb3BdKSkge1xuICAgICAgcmV0dXJuIGdldE1lcmdlZFZhbHVlKHVuZGVmaW5lZCwgY29uZmlnMVtwcm9wXSk7XG4gICAgfVxuICB9XG5cbiAgLy8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIGNvbnNpc3RlbnQtcmV0dXJuXG4gIGZ1bmN0aW9uIHZhbHVlRnJvbUNvbmZpZzIocHJvcCkge1xuICAgIGlmICghdXRpbHMuaXNVbmRlZmluZWQoY29uZmlnMltwcm9wXSkpIHtcbiAgICAgIHJldHVybiBnZXRNZXJnZWRWYWx1ZSh1bmRlZmluZWQsIGNvbmZpZzJbcHJvcF0pO1xuICAgIH1cbiAgfVxuXG4gIC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBjb25zaXN0ZW50LXJldHVyblxuICBmdW5jdGlvbiBkZWZhdWx0VG9Db25maWcyKHByb3ApIHtcbiAgICBpZiAoIXV0aWxzLmlzVW5kZWZpbmVkKGNvbmZpZzJbcHJvcF0pKSB7XG4gICAgICByZXR1cm4gZ2V0TWVyZ2VkVmFsdWUodW5kZWZpbmVkLCBjb25maWcyW3Byb3BdKTtcbiAgICB9IGVsc2UgaWYgKCF1dGlscy5pc1VuZGVmaW5lZChjb25maWcxW3Byb3BdKSkge1xuICAgICAgcmV0dXJuIGdldE1lcmdlZFZhbHVlKHVuZGVmaW5lZCwgY29uZmlnMVtwcm9wXSk7XG4gICAgfVxuICB9XG5cbiAgLy8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIGNvbnNpc3RlbnQtcmV0dXJuXG4gIGZ1bmN0aW9uIG1lcmdlRGlyZWN0S2V5cyhwcm9wKSB7XG4gICAgaWYgKHByb3AgaW4gY29uZmlnMikge1xuICAgICAgcmV0dXJuIGdldE1lcmdlZFZhbHVlKGNvbmZpZzFbcHJvcF0sIGNvbmZpZzJbcHJvcF0pO1xuICAgIH0gZWxzZSBpZiAocHJvcCBpbiBjb25maWcxKSB7XG4gICAgICByZXR1cm4gZ2V0TWVyZ2VkVmFsdWUodW5kZWZpbmVkLCBjb25maWcxW3Byb3BdKTtcbiAgICB9XG4gIH1cblxuICB2YXIgbWVyZ2VNYXAgPSB7XG4gICAgJ3VybCc6IHZhbHVlRnJvbUNvbmZpZzIsXG4gICAgJ21ldGhvZCc6IHZhbHVlRnJvbUNvbmZpZzIsXG4gICAgJ2RhdGEnOiB2YWx1ZUZyb21Db25maWcyLFxuICAgICdiYXNlVVJMJzogZGVmYXVsdFRvQ29uZmlnMixcbiAgICAndHJhbnNmb3JtUmVxdWVzdCc6IGRlZmF1bHRUb0NvbmZpZzIsXG4gICAgJ3RyYW5zZm9ybVJlc3BvbnNlJzogZGVmYXVsdFRvQ29uZmlnMixcbiAgICAncGFyYW1zU2VyaWFsaXplcic6IGRlZmF1bHRUb0NvbmZpZzIsXG4gICAgJ3RpbWVvdXQnOiBkZWZhdWx0VG9Db25maWcyLFxuICAgICd0aW1lb3V0TWVzc2FnZSc6IGRlZmF1bHRUb0NvbmZpZzIsXG4gICAgJ3dpdGhDcmVkZW50aWFscyc6IGRlZmF1bHRUb0NvbmZpZzIsXG4gICAgJ2FkYXB0ZXInOiBkZWZhdWx0VG9Db25maWcyLFxuICAgICdyZXNwb25zZVR5cGUnOiBkZWZhdWx0VG9Db25maWcyLFxuICAgICd4c3JmQ29va2llTmFtZSc6IGRlZmF1bHRUb0NvbmZpZzIsXG4gICAgJ3hzcmZIZWFkZXJOYW1lJzogZGVmYXVsdFRvQ29uZmlnMixcbiAgICAnb25VcGxvYWRQcm9ncmVzcyc6IGRlZmF1bHRUb0NvbmZpZzIsXG4gICAgJ29uRG93bmxvYWRQcm9ncmVzcyc6IGRlZmF1bHRUb0NvbmZpZzIsXG4gICAgJ2RlY29tcHJlc3MnOiBkZWZhdWx0VG9Db25maWcyLFxuICAgICdtYXhDb250ZW50TGVuZ3RoJzogZGVmYXVsdFRvQ29uZmlnMixcbiAgICAnbWF4Qm9keUxlbmd0aCc6IGRlZmF1bHRUb0NvbmZpZzIsXG4gICAgJ2JlZm9yZVJlZGlyZWN0JzogZGVmYXVsdFRvQ29uZmlnMixcbiAgICAndHJhbnNwb3J0JzogZGVmYXVsdFRvQ29uZmlnMixcbiAgICAnaHR0cEFnZW50JzogZGVmYXVsdFRvQ29uZmlnMixcbiAgICAnaHR0cHNBZ2VudCc6IGRlZmF1bHRUb0NvbmZpZzIsXG4gICAgJ2NhbmNlbFRva2VuJzogZGVmYXVsdFRvQ29uZmlnMixcbiAgICAnc29ja2V0UGF0aCc6IGRlZmF1bHRUb0NvbmZpZzIsXG4gICAgJ3Jlc3BvbnNlRW5jb2RpbmcnOiBkZWZhdWx0VG9Db25maWcyLFxuICAgICd2YWxpZGF0ZVN0YXR1cyc6IG1lcmdlRGlyZWN0S2V5c1xuICB9O1xuXG4gIHV0aWxzLmZvckVhY2goT2JqZWN0LmtleXMoY29uZmlnMSkuY29uY2F0KE9iamVjdC5rZXlzKGNvbmZpZzIpKSwgZnVuY3Rpb24gY29tcHV0ZUNvbmZpZ1ZhbHVlKHByb3ApIHtcbiAgICB2YXIgbWVyZ2UgPSBtZXJnZU1hcFtwcm9wXSB8fCBtZXJnZURlZXBQcm9wZXJ0aWVzO1xuICAgIHZhciBjb25maWdWYWx1ZSA9IG1lcmdlKHByb3ApO1xuICAgICh1dGlscy5pc1VuZGVmaW5lZChjb25maWdWYWx1ZSkgJiYgbWVyZ2UgIT09IG1lcmdlRGlyZWN0S2V5cykgfHwgKGNvbmZpZ1twcm9wXSA9IGNvbmZpZ1ZhbHVlKTtcbiAgfSk7XG5cbiAgcmV0dXJuIGNvbmZpZztcbn07XG4iLCAibW9kdWxlLmV4cG9ydHMgPSB7XG4gIFwidmVyc2lvblwiOiBcIjAuMjcuMlwiXG59OyIsICIndXNlIHN0cmljdCc7XG5cbnZhciBWRVJTSU9OID0gcmVxdWlyZSgnLi4vZW52L2RhdGEnKS52ZXJzaW9uO1xudmFyIEF4aW9zRXJyb3IgPSByZXF1aXJlKCcuLi9jb3JlL0F4aW9zRXJyb3InKTtcblxudmFyIHZhbGlkYXRvcnMgPSB7fTtcblxuLy8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIGZ1bmMtbmFtZXNcblsnb2JqZWN0JywgJ2Jvb2xlYW4nLCAnbnVtYmVyJywgJ2Z1bmN0aW9uJywgJ3N0cmluZycsICdzeW1ib2wnXS5mb3JFYWNoKGZ1bmN0aW9uKHR5cGUsIGkpIHtcbiAgdmFsaWRhdG9yc1t0eXBlXSA9IGZ1bmN0aW9uIHZhbGlkYXRvcih0aGluZykge1xuICAgIHJldHVybiB0eXBlb2YgdGhpbmcgPT09IHR5cGUgfHwgJ2EnICsgKGkgPCAxID8gJ24gJyA6ICcgJykgKyB0eXBlO1xuICB9O1xufSk7XG5cbnZhciBkZXByZWNhdGVkV2FybmluZ3MgPSB7fTtcblxuLyoqXG4gKiBUcmFuc2l0aW9uYWwgb3B0aW9uIHZhbGlkYXRvclxuICogQHBhcmFtIHtmdW5jdGlvbnxib29sZWFuP30gdmFsaWRhdG9yIC0gc2V0IHRvIGZhbHNlIGlmIHRoZSB0cmFuc2l0aW9uYWwgb3B0aW9uIGhhcyBiZWVuIHJlbW92ZWRcbiAqIEBwYXJhbSB7c3RyaW5nP30gdmVyc2lvbiAtIGRlcHJlY2F0ZWQgdmVyc2lvbiAvIHJlbW92ZWQgc2luY2UgdmVyc2lvblxuICogQHBhcmFtIHtzdHJpbmc/fSBtZXNzYWdlIC0gc29tZSBtZXNzYWdlIHdpdGggYWRkaXRpb25hbCBpbmZvXG4gKiBAcmV0dXJucyB7ZnVuY3Rpb259XG4gKi9cbnZhbGlkYXRvcnMudHJhbnNpdGlvbmFsID0gZnVuY3Rpb24gdHJhbnNpdGlvbmFsKHZhbGlkYXRvciwgdmVyc2lvbiwgbWVzc2FnZSkge1xuICBmdW5jdGlvbiBmb3JtYXRNZXNzYWdlKG9wdCwgZGVzYykge1xuICAgIHJldHVybiAnW0F4aW9zIHYnICsgVkVSU0lPTiArICddIFRyYW5zaXRpb25hbCBvcHRpb24gXFwnJyArIG9wdCArICdcXCcnICsgZGVzYyArIChtZXNzYWdlID8gJy4gJyArIG1lc3NhZ2UgOiAnJyk7XG4gIH1cblxuICAvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgZnVuYy1uYW1lc1xuICByZXR1cm4gZnVuY3Rpb24odmFsdWUsIG9wdCwgb3B0cykge1xuICAgIGlmICh2YWxpZGF0b3IgPT09IGZhbHNlKSB7XG4gICAgICB0aHJvdyBuZXcgQXhpb3NFcnJvcihcbiAgICAgICAgZm9ybWF0TWVzc2FnZShvcHQsICcgaGFzIGJlZW4gcmVtb3ZlZCcgKyAodmVyc2lvbiA/ICcgaW4gJyArIHZlcnNpb24gOiAnJykpLFxuICAgICAgICBBeGlvc0Vycm9yLkVSUl9ERVBSRUNBVEVEXG4gICAgICApO1xuICAgIH1cblxuICAgIGlmICh2ZXJzaW9uICYmICFkZXByZWNhdGVkV2FybmluZ3Nbb3B0XSkge1xuICAgICAgZGVwcmVjYXRlZFdhcm5pbmdzW29wdF0gPSB0cnVlO1xuICAgICAgLy8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIG5vLWNvbnNvbGVcbiAgICAgIGNvbnNvbGUud2FybihcbiAgICAgICAgZm9ybWF0TWVzc2FnZShcbiAgICAgICAgICBvcHQsXG4gICAgICAgICAgJyBoYXMgYmVlbiBkZXByZWNhdGVkIHNpbmNlIHYnICsgdmVyc2lvbiArICcgYW5kIHdpbGwgYmUgcmVtb3ZlZCBpbiB0aGUgbmVhciBmdXR1cmUnXG4gICAgICAgIClcbiAgICAgICk7XG4gICAgfVxuXG4gICAgcmV0dXJuIHZhbGlkYXRvciA/IHZhbGlkYXRvcih2YWx1ZSwgb3B0LCBvcHRzKSA6IHRydWU7XG4gIH07XG59O1xuXG4vKipcbiAqIEFzc2VydCBvYmplY3QncyBwcm9wZXJ0aWVzIHR5cGVcbiAqIEBwYXJhbSB7b2JqZWN0fSBvcHRpb25zXG4gKiBAcGFyYW0ge29iamVjdH0gc2NoZW1hXG4gKiBAcGFyYW0ge2Jvb2xlYW4/fSBhbGxvd1Vua25vd25cbiAqL1xuXG5mdW5jdGlvbiBhc3NlcnRPcHRpb25zKG9wdGlvbnMsIHNjaGVtYSwgYWxsb3dVbmtub3duKSB7XG4gIGlmICh0eXBlb2Ygb3B0aW9ucyAhPT0gJ29iamVjdCcpIHtcbiAgICB0aHJvdyBuZXcgQXhpb3NFcnJvcignb3B0aW9ucyBtdXN0IGJlIGFuIG9iamVjdCcsIEF4aW9zRXJyb3IuRVJSX0JBRF9PUFRJT05fVkFMVUUpO1xuICB9XG4gIHZhciBrZXlzID0gT2JqZWN0LmtleXMob3B0aW9ucyk7XG4gIHZhciBpID0ga2V5cy5sZW5ndGg7XG4gIHdoaWxlIChpLS0gPiAwKSB7XG4gICAgdmFyIG9wdCA9IGtleXNbaV07XG4gICAgdmFyIHZhbGlkYXRvciA9IHNjaGVtYVtvcHRdO1xuICAgIGlmICh2YWxpZGF0b3IpIHtcbiAgICAgIHZhciB2YWx1ZSA9IG9wdGlvbnNbb3B0XTtcbiAgICAgIHZhciByZXN1bHQgPSB2YWx1ZSA9PT0gdW5kZWZpbmVkIHx8IHZhbGlkYXRvcih2YWx1ZSwgb3B0LCBvcHRpb25zKTtcbiAgICAgIGlmIChyZXN1bHQgIT09IHRydWUpIHtcbiAgICAgICAgdGhyb3cgbmV3IEF4aW9zRXJyb3IoJ29wdGlvbiAnICsgb3B0ICsgJyBtdXN0IGJlICcgKyByZXN1bHQsIEF4aW9zRXJyb3IuRVJSX0JBRF9PUFRJT05fVkFMVUUpO1xuICAgICAgfVxuICAgICAgY29udGludWU7XG4gICAgfVxuICAgIGlmIChhbGxvd1Vua25vd24gIT09IHRydWUpIHtcbiAgICAgIHRocm93IG5ldyBBeGlvc0Vycm9yKCdVbmtub3duIG9wdGlvbiAnICsgb3B0LCBBeGlvc0Vycm9yLkVSUl9CQURfT1BUSU9OKTtcbiAgICB9XG4gIH1cbn1cblxubW9kdWxlLmV4cG9ydHMgPSB7XG4gIGFzc2VydE9wdGlvbnM6IGFzc2VydE9wdGlvbnMsXG4gIHZhbGlkYXRvcnM6IHZhbGlkYXRvcnNcbn07XG4iLCAiJ3VzZSBzdHJpY3QnO1xuXG52YXIgdXRpbHMgPSByZXF1aXJlKCcuLy4uL3V0aWxzJyk7XG52YXIgYnVpbGRVUkwgPSByZXF1aXJlKCcuLi9oZWxwZXJzL2J1aWxkVVJMJyk7XG52YXIgSW50ZXJjZXB0b3JNYW5hZ2VyID0gcmVxdWlyZSgnLi9JbnRlcmNlcHRvck1hbmFnZXInKTtcbnZhciBkaXNwYXRjaFJlcXVlc3QgPSByZXF1aXJlKCcuL2Rpc3BhdGNoUmVxdWVzdCcpO1xudmFyIG1lcmdlQ29uZmlnID0gcmVxdWlyZSgnLi9tZXJnZUNvbmZpZycpO1xudmFyIGJ1aWxkRnVsbFBhdGggPSByZXF1aXJlKCcuL2J1aWxkRnVsbFBhdGgnKTtcbnZhciB2YWxpZGF0b3IgPSByZXF1aXJlKCcuLi9oZWxwZXJzL3ZhbGlkYXRvcicpO1xuXG52YXIgdmFsaWRhdG9ycyA9IHZhbGlkYXRvci52YWxpZGF0b3JzO1xuLyoqXG4gKiBDcmVhdGUgYSBuZXcgaW5zdGFuY2Ugb2YgQXhpb3NcbiAqXG4gKiBAcGFyYW0ge09iamVjdH0gaW5zdGFuY2VDb25maWcgVGhlIGRlZmF1bHQgY29uZmlnIGZvciB0aGUgaW5zdGFuY2VcbiAqL1xuZnVuY3Rpb24gQXhpb3MoaW5zdGFuY2VDb25maWcpIHtcbiAgdGhpcy5kZWZhdWx0cyA9IGluc3RhbmNlQ29uZmlnO1xuICB0aGlzLmludGVyY2VwdG9ycyA9IHtcbiAgICByZXF1ZXN0OiBuZXcgSW50ZXJjZXB0b3JNYW5hZ2VyKCksXG4gICAgcmVzcG9uc2U6IG5ldyBJbnRlcmNlcHRvck1hbmFnZXIoKVxuICB9O1xufVxuXG4vKipcbiAqIERpc3BhdGNoIGEgcmVxdWVzdFxuICpcbiAqIEBwYXJhbSB7T2JqZWN0fSBjb25maWcgVGhlIGNvbmZpZyBzcGVjaWZpYyBmb3IgdGhpcyByZXF1ZXN0IChtZXJnZWQgd2l0aCB0aGlzLmRlZmF1bHRzKVxuICovXG5BeGlvcy5wcm90b3R5cGUucmVxdWVzdCA9IGZ1bmN0aW9uIHJlcXVlc3QoY29uZmlnT3JVcmwsIGNvbmZpZykge1xuICAvKmVzbGludCBuby1wYXJhbS1yZWFzc2lnbjowKi9cbiAgLy8gQWxsb3cgZm9yIGF4aW9zKCdleGFtcGxlL3VybCdbLCBjb25maWddKSBhIGxhIGZldGNoIEFQSVxuICBpZiAodHlwZW9mIGNvbmZpZ09yVXJsID09PSAnc3RyaW5nJykge1xuICAgIGNvbmZpZyA9IGNvbmZpZyB8fCB7fTtcbiAgICBjb25maWcudXJsID0gY29uZmlnT3JVcmw7XG4gIH0gZWxzZSB7XG4gICAgY29uZmlnID0gY29uZmlnT3JVcmwgfHwge307XG4gIH1cblxuICBjb25maWcgPSBtZXJnZUNvbmZpZyh0aGlzLmRlZmF1bHRzLCBjb25maWcpO1xuXG4gIC8vIFNldCBjb25maWcubWV0aG9kXG4gIGlmIChjb25maWcubWV0aG9kKSB7XG4gICAgY29uZmlnLm1ldGhvZCA9IGNvbmZpZy5tZXRob2QudG9Mb3dlckNhc2UoKTtcbiAgfSBlbHNlIGlmICh0aGlzLmRlZmF1bHRzLm1ldGhvZCkge1xuICAgIGNvbmZpZy5tZXRob2QgPSB0aGlzLmRlZmF1bHRzLm1ldGhvZC50b0xvd2VyQ2FzZSgpO1xuICB9IGVsc2Uge1xuICAgIGNvbmZpZy5tZXRob2QgPSAnZ2V0JztcbiAgfVxuXG4gIHZhciB0cmFuc2l0aW9uYWwgPSBjb25maWcudHJhbnNpdGlvbmFsO1xuXG4gIGlmICh0cmFuc2l0aW9uYWwgIT09IHVuZGVmaW5lZCkge1xuICAgIHZhbGlkYXRvci5hc3NlcnRPcHRpb25zKHRyYW5zaXRpb25hbCwge1xuICAgICAgc2lsZW50SlNPTlBhcnNpbmc6IHZhbGlkYXRvcnMudHJhbnNpdGlvbmFsKHZhbGlkYXRvcnMuYm9vbGVhbiksXG4gICAgICBmb3JjZWRKU09OUGFyc2luZzogdmFsaWRhdG9ycy50cmFuc2l0aW9uYWwodmFsaWRhdG9ycy5ib29sZWFuKSxcbiAgICAgIGNsYXJpZnlUaW1lb3V0RXJyb3I6IHZhbGlkYXRvcnMudHJhbnNpdGlvbmFsKHZhbGlkYXRvcnMuYm9vbGVhbilcbiAgICB9LCBmYWxzZSk7XG4gIH1cblxuICAvLyBmaWx0ZXIgb3V0IHNraXBwZWQgaW50ZXJjZXB0b3JzXG4gIHZhciByZXF1ZXN0SW50ZXJjZXB0b3JDaGFpbiA9IFtdO1xuICB2YXIgc3luY2hyb25vdXNSZXF1ZXN0SW50ZXJjZXB0b3JzID0gdHJ1ZTtcbiAgdGhpcy5pbnRlcmNlcHRvcnMucmVxdWVzdC5mb3JFYWNoKGZ1bmN0aW9uIHVuc2hpZnRSZXF1ZXN0SW50ZXJjZXB0b3JzKGludGVyY2VwdG9yKSB7XG4gICAgaWYgKHR5cGVvZiBpbnRlcmNlcHRvci5ydW5XaGVuID09PSAnZnVuY3Rpb24nICYmIGludGVyY2VwdG9yLnJ1bldoZW4oY29uZmlnKSA9PT0gZmFsc2UpIHtcbiAgICAgIHJldHVybjtcbiAgICB9XG5cbiAgICBzeW5jaHJvbm91c1JlcXVlc3RJbnRlcmNlcHRvcnMgPSBzeW5jaHJvbm91c1JlcXVlc3RJbnRlcmNlcHRvcnMgJiYgaW50ZXJjZXB0b3Iuc3luY2hyb25vdXM7XG5cbiAgICByZXF1ZXN0SW50ZXJjZXB0b3JDaGFpbi51bnNoaWZ0KGludGVyY2VwdG9yLmZ1bGZpbGxlZCwgaW50ZXJjZXB0b3IucmVqZWN0ZWQpO1xuICB9KTtcblxuICB2YXIgcmVzcG9uc2VJbnRlcmNlcHRvckNoYWluID0gW107XG4gIHRoaXMuaW50ZXJjZXB0b3JzLnJlc3BvbnNlLmZvckVhY2goZnVuY3Rpb24gcHVzaFJlc3BvbnNlSW50ZXJjZXB0b3JzKGludGVyY2VwdG9yKSB7XG4gICAgcmVzcG9uc2VJbnRlcmNlcHRvckNoYWluLnB1c2goaW50ZXJjZXB0b3IuZnVsZmlsbGVkLCBpbnRlcmNlcHRvci5yZWplY3RlZCk7XG4gIH0pO1xuXG4gIHZhciBwcm9taXNlO1xuXG4gIGlmICghc3luY2hyb25vdXNSZXF1ZXN0SW50ZXJjZXB0b3JzKSB7XG4gICAgdmFyIGNoYWluID0gW2Rpc3BhdGNoUmVxdWVzdCwgdW5kZWZpbmVkXTtcblxuICAgIEFycmF5LnByb3RvdHlwZS51bnNoaWZ0LmFwcGx5KGNoYWluLCByZXF1ZXN0SW50ZXJjZXB0b3JDaGFpbik7XG4gICAgY2hhaW4gPSBjaGFpbi5jb25jYXQocmVzcG9uc2VJbnRlcmNlcHRvckNoYWluKTtcblxuICAgIHByb21pc2UgPSBQcm9taXNlLnJlc29sdmUoY29uZmlnKTtcbiAgICB3aGlsZSAoY2hhaW4ubGVuZ3RoKSB7XG4gICAgICBwcm9taXNlID0gcHJvbWlzZS50aGVuKGNoYWluLnNoaWZ0KCksIGNoYWluLnNoaWZ0KCkpO1xuICAgIH1cblxuICAgIHJldHVybiBwcm9taXNlO1xuICB9XG5cblxuICB2YXIgbmV3Q29uZmlnID0gY29uZmlnO1xuICB3aGlsZSAocmVxdWVzdEludGVyY2VwdG9yQ2hhaW4ubGVuZ3RoKSB7XG4gICAgdmFyIG9uRnVsZmlsbGVkID0gcmVxdWVzdEludGVyY2VwdG9yQ2hhaW4uc2hpZnQoKTtcbiAgICB2YXIgb25SZWplY3RlZCA9IHJlcXVlc3RJbnRlcmNlcHRvckNoYWluLnNoaWZ0KCk7XG4gICAgdHJ5IHtcbiAgICAgIG5ld0NvbmZpZyA9IG9uRnVsZmlsbGVkKG5ld0NvbmZpZyk7XG4gICAgfSBjYXRjaCAoZXJyb3IpIHtcbiAgICAgIG9uUmVqZWN0ZWQoZXJyb3IpO1xuICAgICAgYnJlYWs7XG4gICAgfVxuICB9XG5cbiAgdHJ5IHtcbiAgICBwcm9taXNlID0gZGlzcGF0Y2hSZXF1ZXN0KG5ld0NvbmZpZyk7XG4gIH0gY2F0Y2ggKGVycm9yKSB7XG4gICAgcmV0dXJuIFByb21pc2UucmVqZWN0KGVycm9yKTtcbiAgfVxuXG4gIHdoaWxlIChyZXNwb25zZUludGVyY2VwdG9yQ2hhaW4ubGVuZ3RoKSB7XG4gICAgcHJvbWlzZSA9IHByb21pc2UudGhlbihyZXNwb25zZUludGVyY2VwdG9yQ2hhaW4uc2hpZnQoKSwgcmVzcG9uc2VJbnRlcmNlcHRvckNoYWluLnNoaWZ0KCkpO1xuICB9XG5cbiAgcmV0dXJuIHByb21pc2U7XG59O1xuXG5BeGlvcy5wcm90b3R5cGUuZ2V0VXJpID0gZnVuY3Rpb24gZ2V0VXJpKGNvbmZpZykge1xuICBjb25maWcgPSBtZXJnZUNvbmZpZyh0aGlzLmRlZmF1bHRzLCBjb25maWcpO1xuICB2YXIgZnVsbFBhdGggPSBidWlsZEZ1bGxQYXRoKGNvbmZpZy5iYXNlVVJMLCBjb25maWcudXJsKTtcbiAgcmV0dXJuIGJ1aWxkVVJMKGZ1bGxQYXRoLCBjb25maWcucGFyYW1zLCBjb25maWcucGFyYW1zU2VyaWFsaXplcik7XG59O1xuXG4vLyBQcm92aWRlIGFsaWFzZXMgZm9yIHN1cHBvcnRlZCByZXF1ZXN0IG1ldGhvZHNcbnV0aWxzLmZvckVhY2goWydkZWxldGUnLCAnZ2V0JywgJ2hlYWQnLCAnb3B0aW9ucyddLCBmdW5jdGlvbiBmb3JFYWNoTWV0aG9kTm9EYXRhKG1ldGhvZCkge1xuICAvKmVzbGludCBmdW5jLW5hbWVzOjAqL1xuICBBeGlvcy5wcm90b3R5cGVbbWV0aG9kXSA9IGZ1bmN0aW9uKHVybCwgY29uZmlnKSB7XG4gICAgcmV0dXJuIHRoaXMucmVxdWVzdChtZXJnZUNvbmZpZyhjb25maWcgfHwge30sIHtcbiAgICAgIG1ldGhvZDogbWV0aG9kLFxuICAgICAgdXJsOiB1cmwsXG4gICAgICBkYXRhOiAoY29uZmlnIHx8IHt9KS5kYXRhXG4gICAgfSkpO1xuICB9O1xufSk7XG5cbnV0aWxzLmZvckVhY2goWydwb3N0JywgJ3B1dCcsICdwYXRjaCddLCBmdW5jdGlvbiBmb3JFYWNoTWV0aG9kV2l0aERhdGEobWV0aG9kKSB7XG4gIC8qZXNsaW50IGZ1bmMtbmFtZXM6MCovXG5cbiAgZnVuY3Rpb24gZ2VuZXJhdGVIVFRQTWV0aG9kKGlzRm9ybSkge1xuICAgIHJldHVybiBmdW5jdGlvbiBodHRwTWV0aG9kKHVybCwgZGF0YSwgY29uZmlnKSB7XG4gICAgICByZXR1cm4gdGhpcy5yZXF1ZXN0KG1lcmdlQ29uZmlnKGNvbmZpZyB8fCB7fSwge1xuICAgICAgICBtZXRob2Q6IG1ldGhvZCxcbiAgICAgICAgaGVhZGVyczogaXNGb3JtID8ge1xuICAgICAgICAgICdDb250ZW50LVR5cGUnOiAnbXVsdGlwYXJ0L2Zvcm0tZGF0YSdcbiAgICAgICAgfSA6IHt9LFxuICAgICAgICB1cmw6IHVybCxcbiAgICAgICAgZGF0YTogZGF0YVxuICAgICAgfSkpO1xuICAgIH07XG4gIH1cblxuICBBeGlvcy5wcm90b3R5cGVbbWV0aG9kXSA9IGdlbmVyYXRlSFRUUE1ldGhvZCgpO1xuXG4gIEF4aW9zLnByb3RvdHlwZVttZXRob2QgKyAnRm9ybSddID0gZ2VuZXJhdGVIVFRQTWV0aG9kKHRydWUpO1xufSk7XG5cbm1vZHVsZS5leHBvcnRzID0gQXhpb3M7XG4iLCAiJ3VzZSBzdHJpY3QnO1xuXG52YXIgQ2FuY2VsZWRFcnJvciA9IHJlcXVpcmUoJy4vQ2FuY2VsZWRFcnJvcicpO1xuXG4vKipcbiAqIEEgYENhbmNlbFRva2VuYCBpcyBhbiBvYmplY3QgdGhhdCBjYW4gYmUgdXNlZCB0byByZXF1ZXN0IGNhbmNlbGxhdGlvbiBvZiBhbiBvcGVyYXRpb24uXG4gKlxuICogQGNsYXNzXG4gKiBAcGFyYW0ge0Z1bmN0aW9ufSBleGVjdXRvciBUaGUgZXhlY3V0b3IgZnVuY3Rpb24uXG4gKi9cbmZ1bmN0aW9uIENhbmNlbFRva2VuKGV4ZWN1dG9yKSB7XG4gIGlmICh0eXBlb2YgZXhlY3V0b3IgIT09ICdmdW5jdGlvbicpIHtcbiAgICB0aHJvdyBuZXcgVHlwZUVycm9yKCdleGVjdXRvciBtdXN0IGJlIGEgZnVuY3Rpb24uJyk7XG4gIH1cblxuICB2YXIgcmVzb2x2ZVByb21pc2U7XG5cbiAgdGhpcy5wcm9taXNlID0gbmV3IFByb21pc2UoZnVuY3Rpb24gcHJvbWlzZUV4ZWN1dG9yKHJlc29sdmUpIHtcbiAgICByZXNvbHZlUHJvbWlzZSA9IHJlc29sdmU7XG4gIH0pO1xuXG4gIHZhciB0b2tlbiA9IHRoaXM7XG5cbiAgLy8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIGZ1bmMtbmFtZXNcbiAgdGhpcy5wcm9taXNlLnRoZW4oZnVuY3Rpb24oY2FuY2VsKSB7XG4gICAgaWYgKCF0b2tlbi5fbGlzdGVuZXJzKSByZXR1cm47XG5cbiAgICB2YXIgaTtcbiAgICB2YXIgbCA9IHRva2VuLl9saXN0ZW5lcnMubGVuZ3RoO1xuXG4gICAgZm9yIChpID0gMDsgaSA8IGw7IGkrKykge1xuICAgICAgdG9rZW4uX2xpc3RlbmVyc1tpXShjYW5jZWwpO1xuICAgIH1cbiAgICB0b2tlbi5fbGlzdGVuZXJzID0gbnVsbDtcbiAgfSk7XG5cbiAgLy8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIGZ1bmMtbmFtZXNcbiAgdGhpcy5wcm9taXNlLnRoZW4gPSBmdW5jdGlvbihvbmZ1bGZpbGxlZCkge1xuICAgIHZhciBfcmVzb2x2ZTtcbiAgICAvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgZnVuYy1uYW1lc1xuICAgIHZhciBwcm9taXNlID0gbmV3IFByb21pc2UoZnVuY3Rpb24ocmVzb2x2ZSkge1xuICAgICAgdG9rZW4uc3Vic2NyaWJlKHJlc29sdmUpO1xuICAgICAgX3Jlc29sdmUgPSByZXNvbHZlO1xuICAgIH0pLnRoZW4ob25mdWxmaWxsZWQpO1xuXG4gICAgcHJvbWlzZS5jYW5jZWwgPSBmdW5jdGlvbiByZWplY3QoKSB7XG4gICAgICB0b2tlbi51bnN1YnNjcmliZShfcmVzb2x2ZSk7XG4gICAgfTtcblxuICAgIHJldHVybiBwcm9taXNlO1xuICB9O1xuXG4gIGV4ZWN1dG9yKGZ1bmN0aW9uIGNhbmNlbChtZXNzYWdlKSB7XG4gICAgaWYgKHRva2VuLnJlYXNvbikge1xuICAgICAgLy8gQ2FuY2VsbGF0aW9uIGhhcyBhbHJlYWR5IGJlZW4gcmVxdWVzdGVkXG4gICAgICByZXR1cm47XG4gICAgfVxuXG4gICAgdG9rZW4ucmVhc29uID0gbmV3IENhbmNlbGVkRXJyb3IobWVzc2FnZSk7XG4gICAgcmVzb2x2ZVByb21pc2UodG9rZW4ucmVhc29uKTtcbiAgfSk7XG59XG5cbi8qKlxuICogVGhyb3dzIGEgYENhbmNlbGVkRXJyb3JgIGlmIGNhbmNlbGxhdGlvbiBoYXMgYmVlbiByZXF1ZXN0ZWQuXG4gKi9cbkNhbmNlbFRva2VuLnByb3RvdHlwZS50aHJvd0lmUmVxdWVzdGVkID0gZnVuY3Rpb24gdGhyb3dJZlJlcXVlc3RlZCgpIHtcbiAgaWYgKHRoaXMucmVhc29uKSB7XG4gICAgdGhyb3cgdGhpcy5yZWFzb247XG4gIH1cbn07XG5cbi8qKlxuICogU3Vic2NyaWJlIHRvIHRoZSBjYW5jZWwgc2lnbmFsXG4gKi9cblxuQ2FuY2VsVG9rZW4ucHJvdG90eXBlLnN1YnNjcmliZSA9IGZ1bmN0aW9uIHN1YnNjcmliZShsaXN0ZW5lcikge1xuICBpZiAodGhpcy5yZWFzb24pIHtcbiAgICBsaXN0ZW5lcih0aGlzLnJlYXNvbik7XG4gICAgcmV0dXJuO1xuICB9XG5cbiAgaWYgKHRoaXMuX2xpc3RlbmVycykge1xuICAgIHRoaXMuX2xpc3RlbmVycy5wdXNoKGxpc3RlbmVyKTtcbiAgfSBlbHNlIHtcbiAgICB0aGlzLl9saXN0ZW5lcnMgPSBbbGlzdGVuZXJdO1xuICB9XG59O1xuXG4vKipcbiAqIFVuc3Vic2NyaWJlIGZyb20gdGhlIGNhbmNlbCBzaWduYWxcbiAqL1xuXG5DYW5jZWxUb2tlbi5wcm90b3R5cGUudW5zdWJzY3JpYmUgPSBmdW5jdGlvbiB1bnN1YnNjcmliZShsaXN0ZW5lcikge1xuICBpZiAoIXRoaXMuX2xpc3RlbmVycykge1xuICAgIHJldHVybjtcbiAgfVxuICB2YXIgaW5kZXggPSB0aGlzLl9saXN0ZW5lcnMuaW5kZXhPZihsaXN0ZW5lcik7XG4gIGlmIChpbmRleCAhPT0gLTEpIHtcbiAgICB0aGlzLl9saXN0ZW5lcnMuc3BsaWNlKGluZGV4LCAxKTtcbiAgfVxufTtcblxuLyoqXG4gKiBSZXR1cm5zIGFuIG9iamVjdCB0aGF0IGNvbnRhaW5zIGEgbmV3IGBDYW5jZWxUb2tlbmAgYW5kIGEgZnVuY3Rpb24gdGhhdCwgd2hlbiBjYWxsZWQsXG4gKiBjYW5jZWxzIHRoZSBgQ2FuY2VsVG9rZW5gLlxuICovXG5DYW5jZWxUb2tlbi5zb3VyY2UgPSBmdW5jdGlvbiBzb3VyY2UoKSB7XG4gIHZhciBjYW5jZWw7XG4gIHZhciB0b2tlbiA9IG5ldyBDYW5jZWxUb2tlbihmdW5jdGlvbiBleGVjdXRvcihjKSB7XG4gICAgY2FuY2VsID0gYztcbiAgfSk7XG4gIHJldHVybiB7XG4gICAgdG9rZW46IHRva2VuLFxuICAgIGNhbmNlbDogY2FuY2VsXG4gIH07XG59O1xuXG5tb2R1bGUuZXhwb3J0cyA9IENhbmNlbFRva2VuO1xuIiwgIid1c2Ugc3RyaWN0JztcblxuLyoqXG4gKiBTeW50YWN0aWMgc3VnYXIgZm9yIGludm9raW5nIGEgZnVuY3Rpb24gYW5kIGV4cGFuZGluZyBhbiBhcnJheSBmb3IgYXJndW1lbnRzLlxuICpcbiAqIENvbW1vbiB1c2UgY2FzZSB3b3VsZCBiZSB0byB1c2UgYEZ1bmN0aW9uLnByb3RvdHlwZS5hcHBseWAuXG4gKlxuICogIGBgYGpzXG4gKiAgZnVuY3Rpb24gZih4LCB5LCB6KSB7fVxuICogIHZhciBhcmdzID0gWzEsIDIsIDNdO1xuICogIGYuYXBwbHkobnVsbCwgYXJncyk7XG4gKiAgYGBgXG4gKlxuICogV2l0aCBgc3ByZWFkYCB0aGlzIGV4YW1wbGUgY2FuIGJlIHJlLXdyaXR0ZW4uXG4gKlxuICogIGBgYGpzXG4gKiAgc3ByZWFkKGZ1bmN0aW9uKHgsIHksIHopIHt9KShbMSwgMiwgM10pO1xuICogIGBgYFxuICpcbiAqIEBwYXJhbSB7RnVuY3Rpb259IGNhbGxiYWNrXG4gKiBAcmV0dXJucyB7RnVuY3Rpb259XG4gKi9cbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gc3ByZWFkKGNhbGxiYWNrKSB7XG4gIHJldHVybiBmdW5jdGlvbiB3cmFwKGFycikge1xuICAgIHJldHVybiBjYWxsYmFjay5hcHBseShudWxsLCBhcnIpO1xuICB9O1xufTtcbiIsICIndXNlIHN0cmljdCc7XG5cbnZhciB1dGlscyA9IHJlcXVpcmUoJy4vLi4vdXRpbHMnKTtcblxuLyoqXG4gKiBEZXRlcm1pbmVzIHdoZXRoZXIgdGhlIHBheWxvYWQgaXMgYW4gZXJyb3IgdGhyb3duIGJ5IEF4aW9zXG4gKlxuICogQHBhcmFtIHsqfSBwYXlsb2FkIFRoZSB2YWx1ZSB0byB0ZXN0XG4gKiBAcmV0dXJucyB7Ym9vbGVhbn0gVHJ1ZSBpZiB0aGUgcGF5bG9hZCBpcyBhbiBlcnJvciB0aHJvd24gYnkgQXhpb3MsIG90aGVyd2lzZSBmYWxzZVxuICovXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIGlzQXhpb3NFcnJvcihwYXlsb2FkKSB7XG4gIHJldHVybiB1dGlscy5pc09iamVjdChwYXlsb2FkKSAmJiAocGF5bG9hZC5pc0F4aW9zRXJyb3IgPT09IHRydWUpO1xufTtcbiIsICIndXNlIHN0cmljdCc7XG5cbnZhciB1dGlscyA9IHJlcXVpcmUoJy4vdXRpbHMnKTtcbnZhciBiaW5kID0gcmVxdWlyZSgnLi9oZWxwZXJzL2JpbmQnKTtcbnZhciBBeGlvcyA9IHJlcXVpcmUoJy4vY29yZS9BeGlvcycpO1xudmFyIG1lcmdlQ29uZmlnID0gcmVxdWlyZSgnLi9jb3JlL21lcmdlQ29uZmlnJyk7XG52YXIgZGVmYXVsdHMgPSByZXF1aXJlKCcuL2RlZmF1bHRzJyk7XG5cbi8qKlxuICogQ3JlYXRlIGFuIGluc3RhbmNlIG9mIEF4aW9zXG4gKlxuICogQHBhcmFtIHtPYmplY3R9IGRlZmF1bHRDb25maWcgVGhlIGRlZmF1bHQgY29uZmlnIGZvciB0aGUgaW5zdGFuY2VcbiAqIEByZXR1cm4ge0F4aW9zfSBBIG5ldyBpbnN0YW5jZSBvZiBBeGlvc1xuICovXG5mdW5jdGlvbiBjcmVhdGVJbnN0YW5jZShkZWZhdWx0Q29uZmlnKSB7XG4gIHZhciBjb250ZXh0ID0gbmV3IEF4aW9zKGRlZmF1bHRDb25maWcpO1xuICB2YXIgaW5zdGFuY2UgPSBiaW5kKEF4aW9zLnByb3RvdHlwZS5yZXF1ZXN0LCBjb250ZXh0KTtcblxuICAvLyBDb3B5IGF4aW9zLnByb3RvdHlwZSB0byBpbnN0YW5jZVxuICB1dGlscy5leHRlbmQoaW5zdGFuY2UsIEF4aW9zLnByb3RvdHlwZSwgY29udGV4dCk7XG5cbiAgLy8gQ29weSBjb250ZXh0IHRvIGluc3RhbmNlXG4gIHV0aWxzLmV4dGVuZChpbnN0YW5jZSwgY29udGV4dCk7XG5cbiAgLy8gRmFjdG9yeSBmb3IgY3JlYXRpbmcgbmV3IGluc3RhbmNlc1xuICBpbnN0YW5jZS5jcmVhdGUgPSBmdW5jdGlvbiBjcmVhdGUoaW5zdGFuY2VDb25maWcpIHtcbiAgICByZXR1cm4gY3JlYXRlSW5zdGFuY2UobWVyZ2VDb25maWcoZGVmYXVsdENvbmZpZywgaW5zdGFuY2VDb25maWcpKTtcbiAgfTtcblxuICByZXR1cm4gaW5zdGFuY2U7XG59XG5cbi8vIENyZWF0ZSB0aGUgZGVmYXVsdCBpbnN0YW5jZSB0byBiZSBleHBvcnRlZFxudmFyIGF4aW9zID0gY3JlYXRlSW5zdGFuY2UoZGVmYXVsdHMpO1xuXG4vLyBFeHBvc2UgQXhpb3MgY2xhc3MgdG8gYWxsb3cgY2xhc3MgaW5oZXJpdGFuY2VcbmF4aW9zLkF4aW9zID0gQXhpb3M7XG5cbi8vIEV4cG9zZSBDYW5jZWwgJiBDYW5jZWxUb2tlblxuYXhpb3MuQ2FuY2VsZWRFcnJvciA9IHJlcXVpcmUoJy4vY2FuY2VsL0NhbmNlbGVkRXJyb3InKTtcbmF4aW9zLkNhbmNlbFRva2VuID0gcmVxdWlyZSgnLi9jYW5jZWwvQ2FuY2VsVG9rZW4nKTtcbmF4aW9zLmlzQ2FuY2VsID0gcmVxdWlyZSgnLi9jYW5jZWwvaXNDYW5jZWwnKTtcbmF4aW9zLlZFUlNJT04gPSByZXF1aXJlKCcuL2Vudi9kYXRhJykudmVyc2lvbjtcbmF4aW9zLnRvRm9ybURhdGEgPSByZXF1aXJlKCcuL2hlbHBlcnMvdG9Gb3JtRGF0YScpO1xuXG4vLyBFeHBvc2UgQXhpb3NFcnJvciBjbGFzc1xuYXhpb3MuQXhpb3NFcnJvciA9IHJlcXVpcmUoJy4uL2xpYi9jb3JlL0F4aW9zRXJyb3InKTtcblxuLy8gYWxpYXMgZm9yIENhbmNlbGVkRXJyb3IgZm9yIGJhY2t3YXJkIGNvbXBhdGliaWxpdHlcbmF4aW9zLkNhbmNlbCA9IGF4aW9zLkNhbmNlbGVkRXJyb3I7XG5cbi8vIEV4cG9zZSBhbGwvc3ByZWFkXG5heGlvcy5hbGwgPSBmdW5jdGlvbiBhbGwocHJvbWlzZXMpIHtcbiAgcmV0dXJuIFByb21pc2UuYWxsKHByb21pc2VzKTtcbn07XG5heGlvcy5zcHJlYWQgPSByZXF1aXJlKCcuL2hlbHBlcnMvc3ByZWFkJyk7XG5cbi8vIEV4cG9zZSBpc0F4aW9zRXJyb3JcbmF4aW9zLmlzQXhpb3NFcnJvciA9IHJlcXVpcmUoJy4vaGVscGVycy9pc0F4aW9zRXJyb3InKTtcblxubW9kdWxlLmV4cG9ydHMgPSBheGlvcztcblxuLy8gQWxsb3cgdXNlIG9mIGRlZmF1bHQgaW1wb3J0IHN5bnRheCBpbiBUeXBlU2NyaXB0XG5tb2R1bGUuZXhwb3J0cy5kZWZhdWx0ID0gYXhpb3M7XG4iLCAibW9kdWxlLmV4cG9ydHMgPSByZXF1aXJlKCcuL2xpYi9heGlvcycpOyIsICJjb25zdCBQQUNLRVRfVFlQRVMgPSBPYmplY3QuY3JlYXRlKG51bGwpOyAvLyBubyBNYXAgPSBubyBwb2x5ZmlsbFxuUEFDS0VUX1RZUEVTW1wib3BlblwiXSA9IFwiMFwiO1xuUEFDS0VUX1RZUEVTW1wiY2xvc2VcIl0gPSBcIjFcIjtcblBBQ0tFVF9UWVBFU1tcInBpbmdcIl0gPSBcIjJcIjtcblBBQ0tFVF9UWVBFU1tcInBvbmdcIl0gPSBcIjNcIjtcblBBQ0tFVF9UWVBFU1tcIm1lc3NhZ2VcIl0gPSBcIjRcIjtcblBBQ0tFVF9UWVBFU1tcInVwZ3JhZGVcIl0gPSBcIjVcIjtcblBBQ0tFVF9UWVBFU1tcIm5vb3BcIl0gPSBcIjZcIjtcbmNvbnN0IFBBQ0tFVF9UWVBFU19SRVZFUlNFID0gT2JqZWN0LmNyZWF0ZShudWxsKTtcbk9iamVjdC5rZXlzKFBBQ0tFVF9UWVBFUykuZm9yRWFjaChrZXkgPT4ge1xuICAgIFBBQ0tFVF9UWVBFU19SRVZFUlNFW1BBQ0tFVF9UWVBFU1trZXldXSA9IGtleTtcbn0pO1xuY29uc3QgRVJST1JfUEFDS0VUID0geyB0eXBlOiBcImVycm9yXCIsIGRhdGE6IFwicGFyc2VyIGVycm9yXCIgfTtcbmV4cG9ydCB7IFBBQ0tFVF9UWVBFUywgUEFDS0VUX1RZUEVTX1JFVkVSU0UsIEVSUk9SX1BBQ0tFVCB9O1xuIiwgImltcG9ydCB7IFBBQ0tFVF9UWVBFUyB9IGZyb20gXCIuL2NvbW1vbnMuanNcIjtcbmNvbnN0IHdpdGhOYXRpdmVCbG9iID0gdHlwZW9mIEJsb2IgPT09IFwiZnVuY3Rpb25cIiB8fFxuICAgICh0eXBlb2YgQmxvYiAhPT0gXCJ1bmRlZmluZWRcIiAmJlxuICAgICAgICBPYmplY3QucHJvdG90eXBlLnRvU3RyaW5nLmNhbGwoQmxvYikgPT09IFwiW29iamVjdCBCbG9iQ29uc3RydWN0b3JdXCIpO1xuY29uc3Qgd2l0aE5hdGl2ZUFycmF5QnVmZmVyID0gdHlwZW9mIEFycmF5QnVmZmVyID09PSBcImZ1bmN0aW9uXCI7XG4vLyBBcnJheUJ1ZmZlci5pc1ZpZXcgbWV0aG9kIGlzIG5vdCBkZWZpbmVkIGluIElFMTBcbmNvbnN0IGlzVmlldyA9IG9iaiA9PiB7XG4gICAgcmV0dXJuIHR5cGVvZiBBcnJheUJ1ZmZlci5pc1ZpZXcgPT09IFwiZnVuY3Rpb25cIlxuICAgICAgICA/IEFycmF5QnVmZmVyLmlzVmlldyhvYmopXG4gICAgICAgIDogb2JqICYmIG9iai5idWZmZXIgaW5zdGFuY2VvZiBBcnJheUJ1ZmZlcjtcbn07XG5jb25zdCBlbmNvZGVQYWNrZXQgPSAoeyB0eXBlLCBkYXRhIH0sIHN1cHBvcnRzQmluYXJ5LCBjYWxsYmFjaykgPT4ge1xuICAgIGlmICh3aXRoTmF0aXZlQmxvYiAmJiBkYXRhIGluc3RhbmNlb2YgQmxvYikge1xuICAgICAgICBpZiAoc3VwcG9ydHNCaW5hcnkpIHtcbiAgICAgICAgICAgIHJldHVybiBjYWxsYmFjayhkYXRhKTtcbiAgICAgICAgfVxuICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgIHJldHVybiBlbmNvZGVCbG9iQXNCYXNlNjQoZGF0YSwgY2FsbGJhY2spO1xuICAgICAgICB9XG4gICAgfVxuICAgIGVsc2UgaWYgKHdpdGhOYXRpdmVBcnJheUJ1ZmZlciAmJlxuICAgICAgICAoZGF0YSBpbnN0YW5jZW9mIEFycmF5QnVmZmVyIHx8IGlzVmlldyhkYXRhKSkpIHtcbiAgICAgICAgaWYgKHN1cHBvcnRzQmluYXJ5KSB7XG4gICAgICAgICAgICByZXR1cm4gY2FsbGJhY2soZGF0YSk7XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICByZXR1cm4gZW5jb2RlQmxvYkFzQmFzZTY0KG5ldyBCbG9iKFtkYXRhXSksIGNhbGxiYWNrKTtcbiAgICAgICAgfVxuICAgIH1cbiAgICAvLyBwbGFpbiBzdHJpbmdcbiAgICByZXR1cm4gY2FsbGJhY2soUEFDS0VUX1RZUEVTW3R5cGVdICsgKGRhdGEgfHwgXCJcIikpO1xufTtcbmNvbnN0IGVuY29kZUJsb2JBc0Jhc2U2NCA9IChkYXRhLCBjYWxsYmFjaykgPT4ge1xuICAgIGNvbnN0IGZpbGVSZWFkZXIgPSBuZXcgRmlsZVJlYWRlcigpO1xuICAgIGZpbGVSZWFkZXIub25sb2FkID0gZnVuY3Rpb24gKCkge1xuICAgICAgICBjb25zdCBjb250ZW50ID0gZmlsZVJlYWRlci5yZXN1bHQuc3BsaXQoXCIsXCIpWzFdO1xuICAgICAgICBjYWxsYmFjayhcImJcIiArIGNvbnRlbnQpO1xuICAgIH07XG4gICAgcmV0dXJuIGZpbGVSZWFkZXIucmVhZEFzRGF0YVVSTChkYXRhKTtcbn07XG5leHBvcnQgZGVmYXVsdCBlbmNvZGVQYWNrZXQ7XG4iLCAiY29uc3QgY2hhcnMgPSAnQUJDREVGR0hJSktMTU5PUFFSU1RVVldYWVphYmNkZWZnaGlqa2xtbm9wcXJzdHV2d3h5ejAxMjM0NTY3ODkrLyc7XG4vLyBVc2UgYSBsb29rdXAgdGFibGUgdG8gZmluZCB0aGUgaW5kZXguXG5jb25zdCBsb29rdXAgPSB0eXBlb2YgVWludDhBcnJheSA9PT0gJ3VuZGVmaW5lZCcgPyBbXSA6IG5ldyBVaW50OEFycmF5KDI1Nik7XG5mb3IgKGxldCBpID0gMDsgaSA8IGNoYXJzLmxlbmd0aDsgaSsrKSB7XG4gICAgbG9va3VwW2NoYXJzLmNoYXJDb2RlQXQoaSldID0gaTtcbn1cbmV4cG9ydCBjb25zdCBlbmNvZGUgPSAoYXJyYXlidWZmZXIpID0+IHtcbiAgICBsZXQgYnl0ZXMgPSBuZXcgVWludDhBcnJheShhcnJheWJ1ZmZlciksIGksIGxlbiA9IGJ5dGVzLmxlbmd0aCwgYmFzZTY0ID0gJyc7XG4gICAgZm9yIChpID0gMDsgaSA8IGxlbjsgaSArPSAzKSB7XG4gICAgICAgIGJhc2U2NCArPSBjaGFyc1tieXRlc1tpXSA+PiAyXTtcbiAgICAgICAgYmFzZTY0ICs9IGNoYXJzWygoYnl0ZXNbaV0gJiAzKSA8PCA0KSB8IChieXRlc1tpICsgMV0gPj4gNCldO1xuICAgICAgICBiYXNlNjQgKz0gY2hhcnNbKChieXRlc1tpICsgMV0gJiAxNSkgPDwgMikgfCAoYnl0ZXNbaSArIDJdID4+IDYpXTtcbiAgICAgICAgYmFzZTY0ICs9IGNoYXJzW2J5dGVzW2kgKyAyXSAmIDYzXTtcbiAgICB9XG4gICAgaWYgKGxlbiAlIDMgPT09IDIpIHtcbiAgICAgICAgYmFzZTY0ID0gYmFzZTY0LnN1YnN0cmluZygwLCBiYXNlNjQubGVuZ3RoIC0gMSkgKyAnPSc7XG4gICAgfVxuICAgIGVsc2UgaWYgKGxlbiAlIDMgPT09IDEpIHtcbiAgICAgICAgYmFzZTY0ID0gYmFzZTY0LnN1YnN0cmluZygwLCBiYXNlNjQubGVuZ3RoIC0gMikgKyAnPT0nO1xuICAgIH1cbiAgICByZXR1cm4gYmFzZTY0O1xufTtcbmV4cG9ydCBjb25zdCBkZWNvZGUgPSAoYmFzZTY0KSA9PiB7XG4gICAgbGV0IGJ1ZmZlckxlbmd0aCA9IGJhc2U2NC5sZW5ndGggKiAwLjc1LCBsZW4gPSBiYXNlNjQubGVuZ3RoLCBpLCBwID0gMCwgZW5jb2RlZDEsIGVuY29kZWQyLCBlbmNvZGVkMywgZW5jb2RlZDQ7XG4gICAgaWYgKGJhc2U2NFtiYXNlNjQubGVuZ3RoIC0gMV0gPT09ICc9Jykge1xuICAgICAgICBidWZmZXJMZW5ndGgtLTtcbiAgICAgICAgaWYgKGJhc2U2NFtiYXNlNjQubGVuZ3RoIC0gMl0gPT09ICc9Jykge1xuICAgICAgICAgICAgYnVmZmVyTGVuZ3RoLS07XG4gICAgICAgIH1cbiAgICB9XG4gICAgY29uc3QgYXJyYXlidWZmZXIgPSBuZXcgQXJyYXlCdWZmZXIoYnVmZmVyTGVuZ3RoKSwgYnl0ZXMgPSBuZXcgVWludDhBcnJheShhcnJheWJ1ZmZlcik7XG4gICAgZm9yIChpID0gMDsgaSA8IGxlbjsgaSArPSA0KSB7XG4gICAgICAgIGVuY29kZWQxID0gbG9va3VwW2Jhc2U2NC5jaGFyQ29kZUF0KGkpXTtcbiAgICAgICAgZW5jb2RlZDIgPSBsb29rdXBbYmFzZTY0LmNoYXJDb2RlQXQoaSArIDEpXTtcbiAgICAgICAgZW5jb2RlZDMgPSBsb29rdXBbYmFzZTY0LmNoYXJDb2RlQXQoaSArIDIpXTtcbiAgICAgICAgZW5jb2RlZDQgPSBsb29rdXBbYmFzZTY0LmNoYXJDb2RlQXQoaSArIDMpXTtcbiAgICAgICAgYnl0ZXNbcCsrXSA9IChlbmNvZGVkMSA8PCAyKSB8IChlbmNvZGVkMiA+PiA0KTtcbiAgICAgICAgYnl0ZXNbcCsrXSA9ICgoZW5jb2RlZDIgJiAxNSkgPDwgNCkgfCAoZW5jb2RlZDMgPj4gMik7XG4gICAgICAgIGJ5dGVzW3ArK10gPSAoKGVuY29kZWQzICYgMykgPDwgNikgfCAoZW5jb2RlZDQgJiA2Myk7XG4gICAgfVxuICAgIHJldHVybiBhcnJheWJ1ZmZlcjtcbn07XG4iLCAiaW1wb3J0IHsgRVJST1JfUEFDS0VULCBQQUNLRVRfVFlQRVNfUkVWRVJTRSB9IGZyb20gXCIuL2NvbW1vbnMuanNcIjtcbmltcG9ydCB7IGRlY29kZSB9IGZyb20gXCIuL2NvbnRyaWIvYmFzZTY0LWFycmF5YnVmZmVyLmpzXCI7XG5jb25zdCB3aXRoTmF0aXZlQXJyYXlCdWZmZXIgPSB0eXBlb2YgQXJyYXlCdWZmZXIgPT09IFwiZnVuY3Rpb25cIjtcbmNvbnN0IGRlY29kZVBhY2tldCA9IChlbmNvZGVkUGFja2V0LCBiaW5hcnlUeXBlKSA9PiB7XG4gICAgaWYgKHR5cGVvZiBlbmNvZGVkUGFja2V0ICE9PSBcInN0cmluZ1wiKSB7XG4gICAgICAgIHJldHVybiB7XG4gICAgICAgICAgICB0eXBlOiBcIm1lc3NhZ2VcIixcbiAgICAgICAgICAgIGRhdGE6IG1hcEJpbmFyeShlbmNvZGVkUGFja2V0LCBiaW5hcnlUeXBlKVxuICAgICAgICB9O1xuICAgIH1cbiAgICBjb25zdCB0eXBlID0gZW5jb2RlZFBhY2tldC5jaGFyQXQoMCk7XG4gICAgaWYgKHR5cGUgPT09IFwiYlwiKSB7XG4gICAgICAgIHJldHVybiB7XG4gICAgICAgICAgICB0eXBlOiBcIm1lc3NhZ2VcIixcbiAgICAgICAgICAgIGRhdGE6IGRlY29kZUJhc2U2NFBhY2tldChlbmNvZGVkUGFja2V0LnN1YnN0cmluZygxKSwgYmluYXJ5VHlwZSlcbiAgICAgICAgfTtcbiAgICB9XG4gICAgY29uc3QgcGFja2V0VHlwZSA9IFBBQ0tFVF9UWVBFU19SRVZFUlNFW3R5cGVdO1xuICAgIGlmICghcGFja2V0VHlwZSkge1xuICAgICAgICByZXR1cm4gRVJST1JfUEFDS0VUO1xuICAgIH1cbiAgICByZXR1cm4gZW5jb2RlZFBhY2tldC5sZW5ndGggPiAxXG4gICAgICAgID8ge1xuICAgICAgICAgICAgdHlwZTogUEFDS0VUX1RZUEVTX1JFVkVSU0VbdHlwZV0sXG4gICAgICAgICAgICBkYXRhOiBlbmNvZGVkUGFja2V0LnN1YnN0cmluZygxKVxuICAgICAgICB9XG4gICAgICAgIDoge1xuICAgICAgICAgICAgdHlwZTogUEFDS0VUX1RZUEVTX1JFVkVSU0VbdHlwZV1cbiAgICAgICAgfTtcbn07XG5jb25zdCBkZWNvZGVCYXNlNjRQYWNrZXQgPSAoZGF0YSwgYmluYXJ5VHlwZSkgPT4ge1xuICAgIGlmICh3aXRoTmF0aXZlQXJyYXlCdWZmZXIpIHtcbiAgICAgICAgY29uc3QgZGVjb2RlZCA9IGRlY29kZShkYXRhKTtcbiAgICAgICAgcmV0dXJuIG1hcEJpbmFyeShkZWNvZGVkLCBiaW5hcnlUeXBlKTtcbiAgICB9XG4gICAgZWxzZSB7XG4gICAgICAgIHJldHVybiB7IGJhc2U2NDogdHJ1ZSwgZGF0YSB9OyAvLyBmYWxsYmFjayBmb3Igb2xkIGJyb3dzZXJzXG4gICAgfVxufTtcbmNvbnN0IG1hcEJpbmFyeSA9IChkYXRhLCBiaW5hcnlUeXBlKSA9PiB7XG4gICAgc3dpdGNoIChiaW5hcnlUeXBlKSB7XG4gICAgICAgIGNhc2UgXCJibG9iXCI6XG4gICAgICAgICAgICByZXR1cm4gZGF0YSBpbnN0YW5jZW9mIEFycmF5QnVmZmVyID8gbmV3IEJsb2IoW2RhdGFdKSA6IGRhdGE7XG4gICAgICAgIGNhc2UgXCJhcnJheWJ1ZmZlclwiOlxuICAgICAgICBkZWZhdWx0OlxuICAgICAgICAgICAgcmV0dXJuIGRhdGE7IC8vIGFzc3VtaW5nIHRoZSBkYXRhIGlzIGFscmVhZHkgYW4gQXJyYXlCdWZmZXJcbiAgICB9XG59O1xuZXhwb3J0IGRlZmF1bHQgZGVjb2RlUGFja2V0O1xuIiwgImltcG9ydCBlbmNvZGVQYWNrZXQgZnJvbSBcIi4vZW5jb2RlUGFja2V0LmpzXCI7XG5pbXBvcnQgZGVjb2RlUGFja2V0IGZyb20gXCIuL2RlY29kZVBhY2tldC5qc1wiO1xuY29uc3QgU0VQQVJBVE9SID0gU3RyaW5nLmZyb21DaGFyQ29kZSgzMCk7IC8vIHNlZSBodHRwczovL2VuLndpa2lwZWRpYS5vcmcvd2lraS9EZWxpbWl0ZXIjQVNDSUlfZGVsaW1pdGVkX3RleHRcbmNvbnN0IGVuY29kZVBheWxvYWQgPSAocGFja2V0cywgY2FsbGJhY2spID0+IHtcbiAgICAvLyBzb21lIHBhY2tldHMgbWF5IGJlIGFkZGVkIHRvIHRoZSBhcnJheSB3aGlsZSBlbmNvZGluZywgc28gdGhlIGluaXRpYWwgbGVuZ3RoIG11c3QgYmUgc2F2ZWRcbiAgICBjb25zdCBsZW5ndGggPSBwYWNrZXRzLmxlbmd0aDtcbiAgICBjb25zdCBlbmNvZGVkUGFja2V0cyA9IG5ldyBBcnJheShsZW5ndGgpO1xuICAgIGxldCBjb3VudCA9IDA7XG4gICAgcGFja2V0cy5mb3JFYWNoKChwYWNrZXQsIGkpID0+IHtcbiAgICAgICAgLy8gZm9yY2UgYmFzZTY0IGVuY29kaW5nIGZvciBiaW5hcnkgcGFja2V0c1xuICAgICAgICBlbmNvZGVQYWNrZXQocGFja2V0LCBmYWxzZSwgZW5jb2RlZFBhY2tldCA9PiB7XG4gICAgICAgICAgICBlbmNvZGVkUGFja2V0c1tpXSA9IGVuY29kZWRQYWNrZXQ7XG4gICAgICAgICAgICBpZiAoKytjb3VudCA9PT0gbGVuZ3RoKSB7XG4gICAgICAgICAgICAgICAgY2FsbGJhY2soZW5jb2RlZFBhY2tldHMuam9pbihTRVBBUkFUT1IpKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSk7XG4gICAgfSk7XG59O1xuY29uc3QgZGVjb2RlUGF5bG9hZCA9IChlbmNvZGVkUGF5bG9hZCwgYmluYXJ5VHlwZSkgPT4ge1xuICAgIGNvbnN0IGVuY29kZWRQYWNrZXRzID0gZW5jb2RlZFBheWxvYWQuc3BsaXQoU0VQQVJBVE9SKTtcbiAgICBjb25zdCBwYWNrZXRzID0gW107XG4gICAgZm9yIChsZXQgaSA9IDA7IGkgPCBlbmNvZGVkUGFja2V0cy5sZW5ndGg7IGkrKykge1xuICAgICAgICBjb25zdCBkZWNvZGVkUGFja2V0ID0gZGVjb2RlUGFja2V0KGVuY29kZWRQYWNrZXRzW2ldLCBiaW5hcnlUeXBlKTtcbiAgICAgICAgcGFja2V0cy5wdXNoKGRlY29kZWRQYWNrZXQpO1xuICAgICAgICBpZiAoZGVjb2RlZFBhY2tldC50eXBlID09PSBcImVycm9yXCIpIHtcbiAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICB9XG4gICAgfVxuICAgIHJldHVybiBwYWNrZXRzO1xufTtcbmV4cG9ydCBjb25zdCBwcm90b2NvbCA9IDQ7XG5leHBvcnQgeyBlbmNvZGVQYWNrZXQsIGVuY29kZVBheWxvYWQsIGRlY29kZVBhY2tldCwgZGVjb2RlUGF5bG9hZCB9O1xuIiwgIi8qKlxuICogSW5pdGlhbGl6ZSBhIG5ldyBgRW1pdHRlcmAuXG4gKlxuICogQGFwaSBwdWJsaWNcbiAqL1xuXG5leHBvcnQgZnVuY3Rpb24gRW1pdHRlcihvYmopIHtcbiAgaWYgKG9iaikgcmV0dXJuIG1peGluKG9iaik7XG59XG5cbi8qKlxuICogTWl4aW4gdGhlIGVtaXR0ZXIgcHJvcGVydGllcy5cbiAqXG4gKiBAcGFyYW0ge09iamVjdH0gb2JqXG4gKiBAcmV0dXJuIHtPYmplY3R9XG4gKiBAYXBpIHByaXZhdGVcbiAqL1xuXG5mdW5jdGlvbiBtaXhpbihvYmopIHtcbiAgZm9yICh2YXIga2V5IGluIEVtaXR0ZXIucHJvdG90eXBlKSB7XG4gICAgb2JqW2tleV0gPSBFbWl0dGVyLnByb3RvdHlwZVtrZXldO1xuICB9XG4gIHJldHVybiBvYmo7XG59XG5cbi8qKlxuICogTGlzdGVuIG9uIHRoZSBnaXZlbiBgZXZlbnRgIHdpdGggYGZuYC5cbiAqXG4gKiBAcGFyYW0ge1N0cmluZ30gZXZlbnRcbiAqIEBwYXJhbSB7RnVuY3Rpb259IGZuXG4gKiBAcmV0dXJuIHtFbWl0dGVyfVxuICogQGFwaSBwdWJsaWNcbiAqL1xuXG5FbWl0dGVyLnByb3RvdHlwZS5vbiA9XG5FbWl0dGVyLnByb3RvdHlwZS5hZGRFdmVudExpc3RlbmVyID0gZnVuY3Rpb24oZXZlbnQsIGZuKXtcbiAgdGhpcy5fY2FsbGJhY2tzID0gdGhpcy5fY2FsbGJhY2tzIHx8IHt9O1xuICAodGhpcy5fY2FsbGJhY2tzWyckJyArIGV2ZW50XSA9IHRoaXMuX2NhbGxiYWNrc1snJCcgKyBldmVudF0gfHwgW10pXG4gICAgLnB1c2goZm4pO1xuICByZXR1cm4gdGhpcztcbn07XG5cbi8qKlxuICogQWRkcyBhbiBgZXZlbnRgIGxpc3RlbmVyIHRoYXQgd2lsbCBiZSBpbnZva2VkIGEgc2luZ2xlXG4gKiB0aW1lIHRoZW4gYXV0b21hdGljYWxseSByZW1vdmVkLlxuICpcbiAqIEBwYXJhbSB7U3RyaW5nfSBldmVudFxuICogQHBhcmFtIHtGdW5jdGlvbn0gZm5cbiAqIEByZXR1cm4ge0VtaXR0ZXJ9XG4gKiBAYXBpIHB1YmxpY1xuICovXG5cbkVtaXR0ZXIucHJvdG90eXBlLm9uY2UgPSBmdW5jdGlvbihldmVudCwgZm4pe1xuICBmdW5jdGlvbiBvbigpIHtcbiAgICB0aGlzLm9mZihldmVudCwgb24pO1xuICAgIGZuLmFwcGx5KHRoaXMsIGFyZ3VtZW50cyk7XG4gIH1cblxuICBvbi5mbiA9IGZuO1xuICB0aGlzLm9uKGV2ZW50LCBvbik7XG4gIHJldHVybiB0aGlzO1xufTtcblxuLyoqXG4gKiBSZW1vdmUgdGhlIGdpdmVuIGNhbGxiYWNrIGZvciBgZXZlbnRgIG9yIGFsbFxuICogcmVnaXN0ZXJlZCBjYWxsYmFja3MuXG4gKlxuICogQHBhcmFtIHtTdHJpbmd9IGV2ZW50XG4gKiBAcGFyYW0ge0Z1bmN0aW9ufSBmblxuICogQHJldHVybiB7RW1pdHRlcn1cbiAqIEBhcGkgcHVibGljXG4gKi9cblxuRW1pdHRlci5wcm90b3R5cGUub2ZmID1cbkVtaXR0ZXIucHJvdG90eXBlLnJlbW92ZUxpc3RlbmVyID1cbkVtaXR0ZXIucHJvdG90eXBlLnJlbW92ZUFsbExpc3RlbmVycyA9XG5FbWl0dGVyLnByb3RvdHlwZS5yZW1vdmVFdmVudExpc3RlbmVyID0gZnVuY3Rpb24oZXZlbnQsIGZuKXtcbiAgdGhpcy5fY2FsbGJhY2tzID0gdGhpcy5fY2FsbGJhY2tzIHx8IHt9O1xuXG4gIC8vIGFsbFxuICBpZiAoMCA9PSBhcmd1bWVudHMubGVuZ3RoKSB7XG4gICAgdGhpcy5fY2FsbGJhY2tzID0ge307XG4gICAgcmV0dXJuIHRoaXM7XG4gIH1cblxuICAvLyBzcGVjaWZpYyBldmVudFxuICB2YXIgY2FsbGJhY2tzID0gdGhpcy5fY2FsbGJhY2tzWyckJyArIGV2ZW50XTtcbiAgaWYgKCFjYWxsYmFja3MpIHJldHVybiB0aGlzO1xuXG4gIC8vIHJlbW92ZSBhbGwgaGFuZGxlcnNcbiAgaWYgKDEgPT0gYXJndW1lbnRzLmxlbmd0aCkge1xuICAgIGRlbGV0ZSB0aGlzLl9jYWxsYmFja3NbJyQnICsgZXZlbnRdO1xuICAgIHJldHVybiB0aGlzO1xuICB9XG5cbiAgLy8gcmVtb3ZlIHNwZWNpZmljIGhhbmRsZXJcbiAgdmFyIGNiO1xuICBmb3IgKHZhciBpID0gMDsgaSA8IGNhbGxiYWNrcy5sZW5ndGg7IGkrKykge1xuICAgIGNiID0gY2FsbGJhY2tzW2ldO1xuICAgIGlmIChjYiA9PT0gZm4gfHwgY2IuZm4gPT09IGZuKSB7XG4gICAgICBjYWxsYmFja3Muc3BsaWNlKGksIDEpO1xuICAgICAgYnJlYWs7XG4gICAgfVxuICB9XG5cbiAgLy8gUmVtb3ZlIGV2ZW50IHNwZWNpZmljIGFycmF5cyBmb3IgZXZlbnQgdHlwZXMgdGhhdCBub1xuICAvLyBvbmUgaXMgc3Vic2NyaWJlZCBmb3IgdG8gYXZvaWQgbWVtb3J5IGxlYWsuXG4gIGlmIChjYWxsYmFja3MubGVuZ3RoID09PSAwKSB7XG4gICAgZGVsZXRlIHRoaXMuX2NhbGxiYWNrc1snJCcgKyBldmVudF07XG4gIH1cblxuICByZXR1cm4gdGhpcztcbn07XG5cbi8qKlxuICogRW1pdCBgZXZlbnRgIHdpdGggdGhlIGdpdmVuIGFyZ3MuXG4gKlxuICogQHBhcmFtIHtTdHJpbmd9IGV2ZW50XG4gKiBAcGFyYW0ge01peGVkfSAuLi5cbiAqIEByZXR1cm4ge0VtaXR0ZXJ9XG4gKi9cblxuRW1pdHRlci5wcm90b3R5cGUuZW1pdCA9IGZ1bmN0aW9uKGV2ZW50KXtcbiAgdGhpcy5fY2FsbGJhY2tzID0gdGhpcy5fY2FsbGJhY2tzIHx8IHt9O1xuXG4gIHZhciBhcmdzID0gbmV3IEFycmF5KGFyZ3VtZW50cy5sZW5ndGggLSAxKVxuICAgICwgY2FsbGJhY2tzID0gdGhpcy5fY2FsbGJhY2tzWyckJyArIGV2ZW50XTtcblxuICBmb3IgKHZhciBpID0gMTsgaSA8IGFyZ3VtZW50cy5sZW5ndGg7IGkrKykge1xuICAgIGFyZ3NbaSAtIDFdID0gYXJndW1lbnRzW2ldO1xuICB9XG5cbiAgaWYgKGNhbGxiYWNrcykge1xuICAgIGNhbGxiYWNrcyA9IGNhbGxiYWNrcy5zbGljZSgwKTtcbiAgICBmb3IgKHZhciBpID0gMCwgbGVuID0gY2FsbGJhY2tzLmxlbmd0aDsgaSA8IGxlbjsgKytpKSB7XG4gICAgICBjYWxsYmFja3NbaV0uYXBwbHkodGhpcywgYXJncyk7XG4gICAgfVxuICB9XG5cbiAgcmV0dXJuIHRoaXM7XG59O1xuXG4vLyBhbGlhcyB1c2VkIGZvciByZXNlcnZlZCBldmVudHMgKHByb3RlY3RlZCBtZXRob2QpXG5FbWl0dGVyLnByb3RvdHlwZS5lbWl0UmVzZXJ2ZWQgPSBFbWl0dGVyLnByb3RvdHlwZS5lbWl0O1xuXG4vKipcbiAqIFJldHVybiBhcnJheSBvZiBjYWxsYmFja3MgZm9yIGBldmVudGAuXG4gKlxuICogQHBhcmFtIHtTdHJpbmd9IGV2ZW50XG4gKiBAcmV0dXJuIHtBcnJheX1cbiAqIEBhcGkgcHVibGljXG4gKi9cblxuRW1pdHRlci5wcm90b3R5cGUubGlzdGVuZXJzID0gZnVuY3Rpb24oZXZlbnQpe1xuICB0aGlzLl9jYWxsYmFja3MgPSB0aGlzLl9jYWxsYmFja3MgfHwge307XG4gIHJldHVybiB0aGlzLl9jYWxsYmFja3NbJyQnICsgZXZlbnRdIHx8IFtdO1xufTtcblxuLyoqXG4gKiBDaGVjayBpZiB0aGlzIGVtaXR0ZXIgaGFzIGBldmVudGAgaGFuZGxlcnMuXG4gKlxuICogQHBhcmFtIHtTdHJpbmd9IGV2ZW50XG4gKiBAcmV0dXJuIHtCb29sZWFufVxuICogQGFwaSBwdWJsaWNcbiAqL1xuXG5FbWl0dGVyLnByb3RvdHlwZS5oYXNMaXN0ZW5lcnMgPSBmdW5jdGlvbihldmVudCl7XG4gIHJldHVybiAhISB0aGlzLmxpc3RlbmVycyhldmVudCkubGVuZ3RoO1xufTtcbiIsICJleHBvcnQgY29uc3QgZ2xvYmFsVGhpc1NoaW0gPSAoKCkgPT4ge1xuICAgIGlmICh0eXBlb2Ygc2VsZiAhPT0gXCJ1bmRlZmluZWRcIikge1xuICAgICAgICByZXR1cm4gc2VsZjtcbiAgICB9XG4gICAgZWxzZSBpZiAodHlwZW9mIHdpbmRvdyAhPT0gXCJ1bmRlZmluZWRcIikge1xuICAgICAgICByZXR1cm4gd2luZG93O1xuICAgIH1cbiAgICBlbHNlIHtcbiAgICAgICAgcmV0dXJuIEZ1bmN0aW9uKFwicmV0dXJuIHRoaXNcIikoKTtcbiAgICB9XG59KSgpO1xuIiwgImltcG9ydCB7IGdsb2JhbFRoaXNTaGltIGFzIGdsb2JhbFRoaXMgfSBmcm9tIFwiLi9nbG9iYWxUaGlzLmpzXCI7XG5leHBvcnQgZnVuY3Rpb24gcGljayhvYmosIC4uLmF0dHIpIHtcbiAgICByZXR1cm4gYXR0ci5yZWR1Y2UoKGFjYywgaykgPT4ge1xuICAgICAgICBpZiAob2JqLmhhc093blByb3BlcnR5KGspKSB7XG4gICAgICAgICAgICBhY2Nba10gPSBvYmpba107XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIGFjYztcbiAgICB9LCB7fSk7XG59XG4vLyBLZWVwIGEgcmVmZXJlbmNlIHRvIHRoZSByZWFsIHRpbWVvdXQgZnVuY3Rpb25zIHNvIHRoZXkgY2FuIGJlIHVzZWQgd2hlbiBvdmVycmlkZGVuXG5jb25zdCBOQVRJVkVfU0VUX1RJTUVPVVQgPSBzZXRUaW1lb3V0O1xuY29uc3QgTkFUSVZFX0NMRUFSX1RJTUVPVVQgPSBjbGVhclRpbWVvdXQ7XG5leHBvcnQgZnVuY3Rpb24gaW5zdGFsbFRpbWVyRnVuY3Rpb25zKG9iaiwgb3B0cykge1xuICAgIGlmIChvcHRzLnVzZU5hdGl2ZVRpbWVycykge1xuICAgICAgICBvYmouc2V0VGltZW91dEZuID0gTkFUSVZFX1NFVF9USU1FT1VULmJpbmQoZ2xvYmFsVGhpcyk7XG4gICAgICAgIG9iai5jbGVhclRpbWVvdXRGbiA9IE5BVElWRV9DTEVBUl9USU1FT1VULmJpbmQoZ2xvYmFsVGhpcyk7XG4gICAgfVxuICAgIGVsc2Uge1xuICAgICAgICBvYmouc2V0VGltZW91dEZuID0gc2V0VGltZW91dC5iaW5kKGdsb2JhbFRoaXMpO1xuICAgICAgICBvYmouY2xlYXJUaW1lb3V0Rm4gPSBjbGVhclRpbWVvdXQuYmluZChnbG9iYWxUaGlzKTtcbiAgICB9XG59XG4vLyBiYXNlNjQgZW5jb2RlZCBidWZmZXJzIGFyZSBhYm91dCAzMyUgYmlnZ2VyIChodHRwczovL2VuLndpa2lwZWRpYS5vcmcvd2lraS9CYXNlNjQpXG5jb25zdCBCQVNFNjRfT1ZFUkhFQUQgPSAxLjMzO1xuLy8gd2UgY291bGQgYWxzbyBoYXZlIHVzZWQgYG5ldyBCbG9iKFtvYmpdKS5zaXplYCwgYnV0IGl0IGlzbid0IHN1cHBvcnRlZCBpbiBJRTlcbmV4cG9ydCBmdW5jdGlvbiBieXRlTGVuZ3RoKG9iaikge1xuICAgIGlmICh0eXBlb2Ygb2JqID09PSBcInN0cmluZ1wiKSB7XG4gICAgICAgIHJldHVybiB1dGY4TGVuZ3RoKG9iaik7XG4gICAgfVxuICAgIC8vIGFycmF5YnVmZmVyIG9yIGJsb2JcbiAgICByZXR1cm4gTWF0aC5jZWlsKChvYmouYnl0ZUxlbmd0aCB8fCBvYmouc2l6ZSkgKiBCQVNFNjRfT1ZFUkhFQUQpO1xufVxuZnVuY3Rpb24gdXRmOExlbmd0aChzdHIpIHtcbiAgICBsZXQgYyA9IDAsIGxlbmd0aCA9IDA7XG4gICAgZm9yIChsZXQgaSA9IDAsIGwgPSBzdHIubGVuZ3RoOyBpIDwgbDsgaSsrKSB7XG4gICAgICAgIGMgPSBzdHIuY2hhckNvZGVBdChpKTtcbiAgICAgICAgaWYgKGMgPCAweDgwKSB7XG4gICAgICAgICAgICBsZW5ndGggKz0gMTtcbiAgICAgICAgfVxuICAgICAgICBlbHNlIGlmIChjIDwgMHg4MDApIHtcbiAgICAgICAgICAgIGxlbmd0aCArPSAyO1xuICAgICAgICB9XG4gICAgICAgIGVsc2UgaWYgKGMgPCAweGQ4MDAgfHwgYyA+PSAweGUwMDApIHtcbiAgICAgICAgICAgIGxlbmd0aCArPSAzO1xuICAgICAgICB9XG4gICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgaSsrO1xuICAgICAgICAgICAgbGVuZ3RoICs9IDQ7XG4gICAgICAgIH1cbiAgICB9XG4gICAgcmV0dXJuIGxlbmd0aDtcbn1cbiIsICJpbXBvcnQgeyBkZWNvZGVQYWNrZXQgfSBmcm9tIFwiZW5naW5lLmlvLXBhcnNlclwiO1xuaW1wb3J0IHsgRW1pdHRlciB9IGZyb20gXCJAc29ja2V0LmlvL2NvbXBvbmVudC1lbWl0dGVyXCI7XG5pbXBvcnQgeyBpbnN0YWxsVGltZXJGdW5jdGlvbnMgfSBmcm9tIFwiLi91dGlsLmpzXCI7XG5jbGFzcyBUcmFuc3BvcnRFcnJvciBleHRlbmRzIEVycm9yIHtcbiAgICBjb25zdHJ1Y3RvcihyZWFzb24sIGRlc2NyaXB0aW9uLCBjb250ZXh0KSB7XG4gICAgICAgIHN1cGVyKHJlYXNvbik7XG4gICAgICAgIHRoaXMuZGVzY3JpcHRpb24gPSBkZXNjcmlwdGlvbjtcbiAgICAgICAgdGhpcy5jb250ZXh0ID0gY29udGV4dDtcbiAgICAgICAgdGhpcy50eXBlID0gXCJUcmFuc3BvcnRFcnJvclwiO1xuICAgIH1cbn1cbmV4cG9ydCBjbGFzcyBUcmFuc3BvcnQgZXh0ZW5kcyBFbWl0dGVyIHtcbiAgICAvKipcbiAgICAgKiBUcmFuc3BvcnQgYWJzdHJhY3QgY29uc3RydWN0b3IuXG4gICAgICpcbiAgICAgKiBAcGFyYW0ge09iamVjdH0gb3B0aW9ucy5cbiAgICAgKiBAYXBpIHByaXZhdGVcbiAgICAgKi9cbiAgICBjb25zdHJ1Y3RvcihvcHRzKSB7XG4gICAgICAgIHN1cGVyKCk7XG4gICAgICAgIHRoaXMud3JpdGFibGUgPSBmYWxzZTtcbiAgICAgICAgaW5zdGFsbFRpbWVyRnVuY3Rpb25zKHRoaXMsIG9wdHMpO1xuICAgICAgICB0aGlzLm9wdHMgPSBvcHRzO1xuICAgICAgICB0aGlzLnF1ZXJ5ID0gb3B0cy5xdWVyeTtcbiAgICAgICAgdGhpcy5yZWFkeVN0YXRlID0gXCJcIjtcbiAgICAgICAgdGhpcy5zb2NrZXQgPSBvcHRzLnNvY2tldDtcbiAgICB9XG4gICAgLyoqXG4gICAgICogRW1pdHMgYW4gZXJyb3IuXG4gICAgICpcbiAgICAgKiBAcGFyYW0ge1N0cmluZ30gcmVhc29uXG4gICAgICogQHBhcmFtIGRlc2NyaXB0aW9uXG4gICAgICogQHBhcmFtIGNvbnRleHQgLSB0aGUgZXJyb3IgY29udGV4dFxuICAgICAqIEByZXR1cm4ge1RyYW5zcG9ydH0gZm9yIGNoYWluaW5nXG4gICAgICogQGFwaSBwcm90ZWN0ZWRcbiAgICAgKi9cbiAgICBvbkVycm9yKHJlYXNvbiwgZGVzY3JpcHRpb24sIGNvbnRleHQpIHtcbiAgICAgICAgc3VwZXIuZW1pdFJlc2VydmVkKFwiZXJyb3JcIiwgbmV3IFRyYW5zcG9ydEVycm9yKHJlYXNvbiwgZGVzY3JpcHRpb24sIGNvbnRleHQpKTtcbiAgICAgICAgcmV0dXJuIHRoaXM7XG4gICAgfVxuICAgIC8qKlxuICAgICAqIE9wZW5zIHRoZSB0cmFuc3BvcnQuXG4gICAgICpcbiAgICAgKiBAYXBpIHB1YmxpY1xuICAgICAqL1xuICAgIG9wZW4oKSB7XG4gICAgICAgIGlmIChcImNsb3NlZFwiID09PSB0aGlzLnJlYWR5U3RhdGUgfHwgXCJcIiA9PT0gdGhpcy5yZWFkeVN0YXRlKSB7XG4gICAgICAgICAgICB0aGlzLnJlYWR5U3RhdGUgPSBcIm9wZW5pbmdcIjtcbiAgICAgICAgICAgIHRoaXMuZG9PcGVuKCk7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIHRoaXM7XG4gICAgfVxuICAgIC8qKlxuICAgICAqIENsb3NlcyB0aGUgdHJhbnNwb3J0LlxuICAgICAqXG4gICAgICogQGFwaSBwdWJsaWNcbiAgICAgKi9cbiAgICBjbG9zZSgpIHtcbiAgICAgICAgaWYgKFwib3BlbmluZ1wiID09PSB0aGlzLnJlYWR5U3RhdGUgfHwgXCJvcGVuXCIgPT09IHRoaXMucmVhZHlTdGF0ZSkge1xuICAgICAgICAgICAgdGhpcy5kb0Nsb3NlKCk7XG4gICAgICAgICAgICB0aGlzLm9uQ2xvc2UoKTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gdGhpcztcbiAgICB9XG4gICAgLyoqXG4gICAgICogU2VuZHMgbXVsdGlwbGUgcGFja2V0cy5cbiAgICAgKlxuICAgICAqIEBwYXJhbSB7QXJyYXl9IHBhY2tldHNcbiAgICAgKiBAYXBpIHB1YmxpY1xuICAgICAqL1xuICAgIHNlbmQocGFja2V0cykge1xuICAgICAgICBpZiAoXCJvcGVuXCIgPT09IHRoaXMucmVhZHlTdGF0ZSkge1xuICAgICAgICAgICAgdGhpcy53cml0ZShwYWNrZXRzKTtcbiAgICAgICAgfVxuICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgIC8vIHRoaXMgbWlnaHQgaGFwcGVuIGlmIHRoZSB0cmFuc3BvcnQgd2FzIHNpbGVudGx5IGNsb3NlZCBpbiB0aGUgYmVmb3JldW5sb2FkIGV2ZW50IGhhbmRsZXJcbiAgICAgICAgfVxuICAgIH1cbiAgICAvKipcbiAgICAgKiBDYWxsZWQgdXBvbiBvcGVuXG4gICAgICpcbiAgICAgKiBAYXBpIHByb3RlY3RlZFxuICAgICAqL1xuICAgIG9uT3BlbigpIHtcbiAgICAgICAgdGhpcy5yZWFkeVN0YXRlID0gXCJvcGVuXCI7XG4gICAgICAgIHRoaXMud3JpdGFibGUgPSB0cnVlO1xuICAgICAgICBzdXBlci5lbWl0UmVzZXJ2ZWQoXCJvcGVuXCIpO1xuICAgIH1cbiAgICAvKipcbiAgICAgKiBDYWxsZWQgd2l0aCBkYXRhLlxuICAgICAqXG4gICAgICogQHBhcmFtIHtTdHJpbmd9IGRhdGFcbiAgICAgKiBAYXBpIHByb3RlY3RlZFxuICAgICAqL1xuICAgIG9uRGF0YShkYXRhKSB7XG4gICAgICAgIGNvbnN0IHBhY2tldCA9IGRlY29kZVBhY2tldChkYXRhLCB0aGlzLnNvY2tldC5iaW5hcnlUeXBlKTtcbiAgICAgICAgdGhpcy5vblBhY2tldChwYWNrZXQpO1xuICAgIH1cbiAgICAvKipcbiAgICAgKiBDYWxsZWQgd2l0aCBhIGRlY29kZWQgcGFja2V0LlxuICAgICAqXG4gICAgICogQGFwaSBwcm90ZWN0ZWRcbiAgICAgKi9cbiAgICBvblBhY2tldChwYWNrZXQpIHtcbiAgICAgICAgc3VwZXIuZW1pdFJlc2VydmVkKFwicGFja2V0XCIsIHBhY2tldCk7XG4gICAgfVxuICAgIC8qKlxuICAgICAqIENhbGxlZCB1cG9uIGNsb3NlLlxuICAgICAqXG4gICAgICogQGFwaSBwcm90ZWN0ZWRcbiAgICAgKi9cbiAgICBvbkNsb3NlKGRldGFpbHMpIHtcbiAgICAgICAgdGhpcy5yZWFkeVN0YXRlID0gXCJjbG9zZWRcIjtcbiAgICAgICAgc3VwZXIuZW1pdFJlc2VydmVkKFwiY2xvc2VcIiwgZGV0YWlscyk7XG4gICAgfVxufVxuIiwgIi8vIGltcG9ydGVkIGZyb20gaHR0cHM6Ly9naXRodWIuY29tL3Vuc2hpZnRpby95ZWFzdFxuJ3VzZSBzdHJpY3QnO1xuY29uc3QgYWxwaGFiZXQgPSAnMDEyMzQ1Njc4OUFCQ0RFRkdISUpLTE1OT1BRUlNUVVZXWFlaYWJjZGVmZ2hpamtsbW5vcHFyc3R1dnd4eXotXycuc3BsaXQoJycpLCBsZW5ndGggPSA2NCwgbWFwID0ge307XG5sZXQgc2VlZCA9IDAsIGkgPSAwLCBwcmV2O1xuLyoqXG4gKiBSZXR1cm4gYSBzdHJpbmcgcmVwcmVzZW50aW5nIHRoZSBzcGVjaWZpZWQgbnVtYmVyLlxuICpcbiAqIEBwYXJhbSB7TnVtYmVyfSBudW0gVGhlIG51bWJlciB0byBjb252ZXJ0LlxuICogQHJldHVybnMge1N0cmluZ30gVGhlIHN0cmluZyByZXByZXNlbnRhdGlvbiBvZiB0aGUgbnVtYmVyLlxuICogQGFwaSBwdWJsaWNcbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIGVuY29kZShudW0pIHtcbiAgICBsZXQgZW5jb2RlZCA9ICcnO1xuICAgIGRvIHtcbiAgICAgICAgZW5jb2RlZCA9IGFscGhhYmV0W251bSAlIGxlbmd0aF0gKyBlbmNvZGVkO1xuICAgICAgICBudW0gPSBNYXRoLmZsb29yKG51bSAvIGxlbmd0aCk7XG4gICAgfSB3aGlsZSAobnVtID4gMCk7XG4gICAgcmV0dXJuIGVuY29kZWQ7XG59XG4vKipcbiAqIFJldHVybiB0aGUgaW50ZWdlciB2YWx1ZSBzcGVjaWZpZWQgYnkgdGhlIGdpdmVuIHN0cmluZy5cbiAqXG4gKiBAcGFyYW0ge1N0cmluZ30gc3RyIFRoZSBzdHJpbmcgdG8gY29udmVydC5cbiAqIEByZXR1cm5zIHtOdW1iZXJ9IFRoZSBpbnRlZ2VyIHZhbHVlIHJlcHJlc2VudGVkIGJ5IHRoZSBzdHJpbmcuXG4gKiBAYXBpIHB1YmxpY1xuICovXG5leHBvcnQgZnVuY3Rpb24gZGVjb2RlKHN0cikge1xuICAgIGxldCBkZWNvZGVkID0gMDtcbiAgICBmb3IgKGkgPSAwOyBpIDwgc3RyLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgIGRlY29kZWQgPSBkZWNvZGVkICogbGVuZ3RoICsgbWFwW3N0ci5jaGFyQXQoaSldO1xuICAgIH1cbiAgICByZXR1cm4gZGVjb2RlZDtcbn1cbi8qKlxuICogWWVhc3Q6IEEgdGlueSBncm93aW5nIGlkIGdlbmVyYXRvci5cbiAqXG4gKiBAcmV0dXJucyB7U3RyaW5nfSBBIHVuaXF1ZSBpZC5cbiAqIEBhcGkgcHVibGljXG4gKi9cbmV4cG9ydCBmdW5jdGlvbiB5ZWFzdCgpIHtcbiAgICBjb25zdCBub3cgPSBlbmNvZGUoK25ldyBEYXRlKCkpO1xuICAgIGlmIChub3cgIT09IHByZXYpXG4gICAgICAgIHJldHVybiBzZWVkID0gMCwgcHJldiA9IG5vdztcbiAgICByZXR1cm4gbm93ICsgJy4nICsgZW5jb2RlKHNlZWQrKyk7XG59XG4vL1xuLy8gTWFwIGVhY2ggY2hhcmFjdGVyIHRvIGl0cyBpbmRleC5cbi8vXG5mb3IgKDsgaSA8IGxlbmd0aDsgaSsrKVxuICAgIG1hcFthbHBoYWJldFtpXV0gPSBpO1xuIiwgIi8vIGltcG9ydGVkIGZyb20gaHR0cHM6Ly9naXRodWIuY29tL2dhbGtuL3F1ZXJ5c3RyaW5nXG4vKipcbiAqIENvbXBpbGVzIGEgcXVlcnlzdHJpbmdcbiAqIFJldHVybnMgc3RyaW5nIHJlcHJlc2VudGF0aW9uIG9mIHRoZSBvYmplY3RcbiAqXG4gKiBAcGFyYW0ge09iamVjdH1cbiAqIEBhcGkgcHJpdmF0ZVxuICovXG5leHBvcnQgZnVuY3Rpb24gZW5jb2RlKG9iaikge1xuICAgIGxldCBzdHIgPSAnJztcbiAgICBmb3IgKGxldCBpIGluIG9iaikge1xuICAgICAgICBpZiAob2JqLmhhc093blByb3BlcnR5KGkpKSB7XG4gICAgICAgICAgICBpZiAoc3RyLmxlbmd0aClcbiAgICAgICAgICAgICAgICBzdHIgKz0gJyYnO1xuICAgICAgICAgICAgc3RyICs9IGVuY29kZVVSSUNvbXBvbmVudChpKSArICc9JyArIGVuY29kZVVSSUNvbXBvbmVudChvYmpbaV0pO1xuICAgICAgICB9XG4gICAgfVxuICAgIHJldHVybiBzdHI7XG59XG4vKipcbiAqIFBhcnNlcyBhIHNpbXBsZSBxdWVyeXN0cmluZyBpbnRvIGFuIG9iamVjdFxuICpcbiAqIEBwYXJhbSB7U3RyaW5nfSBxc1xuICogQGFwaSBwcml2YXRlXG4gKi9cbmV4cG9ydCBmdW5jdGlvbiBkZWNvZGUocXMpIHtcbiAgICBsZXQgcXJ5ID0ge307XG4gICAgbGV0IHBhaXJzID0gcXMuc3BsaXQoJyYnKTtcbiAgICBmb3IgKGxldCBpID0gMCwgbCA9IHBhaXJzLmxlbmd0aDsgaSA8IGw7IGkrKykge1xuICAgICAgICBsZXQgcGFpciA9IHBhaXJzW2ldLnNwbGl0KCc9Jyk7XG4gICAgICAgIHFyeVtkZWNvZGVVUklDb21wb25lbnQocGFpclswXSldID0gZGVjb2RlVVJJQ29tcG9uZW50KHBhaXJbMV0pO1xuICAgIH1cbiAgICByZXR1cm4gcXJ5O1xufVxuIiwgIi8vIGltcG9ydGVkIGZyb20gaHR0cHM6Ly9naXRodWIuY29tL2NvbXBvbmVudC9oYXMtY29yc1xubGV0IHZhbHVlID0gZmFsc2U7XG50cnkge1xuICAgIHZhbHVlID0gdHlwZW9mIFhNTEh0dHBSZXF1ZXN0ICE9PSAndW5kZWZpbmVkJyAmJlxuICAgICAgICAnd2l0aENyZWRlbnRpYWxzJyBpbiBuZXcgWE1MSHR0cFJlcXVlc3QoKTtcbn1cbmNhdGNoIChlcnIpIHtcbiAgICAvLyBpZiBYTUxIdHRwIHN1cHBvcnQgaXMgZGlzYWJsZWQgaW4gSUUgdGhlbiBpdCB3aWxsIHRocm93XG4gICAgLy8gd2hlbiB0cnlpbmcgdG8gY3JlYXRlXG59XG5leHBvcnQgY29uc3QgaGFzQ09SUyA9IHZhbHVlO1xuIiwgIi8vIGJyb3dzZXIgc2hpbSBmb3IgeG1saHR0cHJlcXVlc3QgbW9kdWxlXG5pbXBvcnQgeyBoYXNDT1JTIH0gZnJvbSBcIi4uL2NvbnRyaWIvaGFzLWNvcnMuanNcIjtcbmltcG9ydCB7IGdsb2JhbFRoaXNTaGltIGFzIGdsb2JhbFRoaXMgfSBmcm9tIFwiLi4vZ2xvYmFsVGhpcy5qc1wiO1xuZXhwb3J0IGZ1bmN0aW9uIFhIUihvcHRzKSB7XG4gICAgY29uc3QgeGRvbWFpbiA9IG9wdHMueGRvbWFpbjtcbiAgICAvLyBYTUxIdHRwUmVxdWVzdCBjYW4gYmUgZGlzYWJsZWQgb24gSUVcbiAgICB0cnkge1xuICAgICAgICBpZiAoXCJ1bmRlZmluZWRcIiAhPT0gdHlwZW9mIFhNTEh0dHBSZXF1ZXN0ICYmICgheGRvbWFpbiB8fCBoYXNDT1JTKSkge1xuICAgICAgICAgICAgcmV0dXJuIG5ldyBYTUxIdHRwUmVxdWVzdCgpO1xuICAgICAgICB9XG4gICAgfVxuICAgIGNhdGNoIChlKSB7IH1cbiAgICBpZiAoIXhkb21haW4pIHtcbiAgICAgICAgdHJ5IHtcbiAgICAgICAgICAgIHJldHVybiBuZXcgZ2xvYmFsVGhpc1tbXCJBY3RpdmVcIl0uY29uY2F0KFwiT2JqZWN0XCIpLmpvaW4oXCJYXCIpXShcIk1pY3Jvc29mdC5YTUxIVFRQXCIpO1xuICAgICAgICB9XG4gICAgICAgIGNhdGNoIChlKSB7IH1cbiAgICB9XG59XG4iLCAiaW1wb3J0IHsgVHJhbnNwb3J0IH0gZnJvbSBcIi4uL3RyYW5zcG9ydC5qc1wiO1xuaW1wb3J0IHsgeWVhc3QgfSBmcm9tIFwiLi4vY29udHJpYi95ZWFzdC5qc1wiO1xuaW1wb3J0IHsgZW5jb2RlIH0gZnJvbSBcIi4uL2NvbnRyaWIvcGFyc2Vxcy5qc1wiO1xuaW1wb3J0IHsgZW5jb2RlUGF5bG9hZCwgZGVjb2RlUGF5bG9hZCB9IGZyb20gXCJlbmdpbmUuaW8tcGFyc2VyXCI7XG5pbXBvcnQgeyBYSFIgYXMgWE1MSHR0cFJlcXVlc3QgfSBmcm9tIFwiLi94bWxodHRwcmVxdWVzdC5qc1wiO1xuaW1wb3J0IHsgRW1pdHRlciB9IGZyb20gXCJAc29ja2V0LmlvL2NvbXBvbmVudC1lbWl0dGVyXCI7XG5pbXBvcnQgeyBpbnN0YWxsVGltZXJGdW5jdGlvbnMsIHBpY2sgfSBmcm9tIFwiLi4vdXRpbC5qc1wiO1xuaW1wb3J0IHsgZ2xvYmFsVGhpc1NoaW0gYXMgZ2xvYmFsVGhpcyB9IGZyb20gXCIuLi9nbG9iYWxUaGlzLmpzXCI7XG5mdW5jdGlvbiBlbXB0eSgpIHsgfVxuY29uc3QgaGFzWEhSMiA9IChmdW5jdGlvbiAoKSB7XG4gICAgY29uc3QgeGhyID0gbmV3IFhNTEh0dHBSZXF1ZXN0KHtcbiAgICAgICAgeGRvbWFpbjogZmFsc2VcbiAgICB9KTtcbiAgICByZXR1cm4gbnVsbCAhPSB4aHIucmVzcG9uc2VUeXBlO1xufSkoKTtcbmV4cG9ydCBjbGFzcyBQb2xsaW5nIGV4dGVuZHMgVHJhbnNwb3J0IHtcbiAgICAvKipcbiAgICAgKiBYSFIgUG9sbGluZyBjb25zdHJ1Y3Rvci5cbiAgICAgKlxuICAgICAqIEBwYXJhbSB7T2JqZWN0fSBvcHRzXG4gICAgICogQGFwaSBwdWJsaWNcbiAgICAgKi9cbiAgICBjb25zdHJ1Y3RvcihvcHRzKSB7XG4gICAgICAgIHN1cGVyKG9wdHMpO1xuICAgICAgICB0aGlzLnBvbGxpbmcgPSBmYWxzZTtcbiAgICAgICAgaWYgKHR5cGVvZiBsb2NhdGlvbiAhPT0gXCJ1bmRlZmluZWRcIikge1xuICAgICAgICAgICAgY29uc3QgaXNTU0wgPSBcImh0dHBzOlwiID09PSBsb2NhdGlvbi5wcm90b2NvbDtcbiAgICAgICAgICAgIGxldCBwb3J0ID0gbG9jYXRpb24ucG9ydDtcbiAgICAgICAgICAgIC8vIHNvbWUgdXNlciBhZ2VudHMgaGF2ZSBlbXB0eSBgbG9jYXRpb24ucG9ydGBcbiAgICAgICAgICAgIGlmICghcG9ydCkge1xuICAgICAgICAgICAgICAgIHBvcnQgPSBpc1NTTCA/IFwiNDQzXCIgOiBcIjgwXCI7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICB0aGlzLnhkID1cbiAgICAgICAgICAgICAgICAodHlwZW9mIGxvY2F0aW9uICE9PSBcInVuZGVmaW5lZFwiICYmXG4gICAgICAgICAgICAgICAgICAgIG9wdHMuaG9zdG5hbWUgIT09IGxvY2F0aW9uLmhvc3RuYW1lKSB8fFxuICAgICAgICAgICAgICAgICAgICBwb3J0ICE9PSBvcHRzLnBvcnQ7XG4gICAgICAgICAgICB0aGlzLnhzID0gb3B0cy5zZWN1cmUgIT09IGlzU1NMO1xuICAgICAgICB9XG4gICAgICAgIC8qKlxuICAgICAgICAgKiBYSFIgc3VwcG9ydHMgYmluYXJ5XG4gICAgICAgICAqL1xuICAgICAgICBjb25zdCBmb3JjZUJhc2U2NCA9IG9wdHMgJiYgb3B0cy5mb3JjZUJhc2U2NDtcbiAgICAgICAgdGhpcy5zdXBwb3J0c0JpbmFyeSA9IGhhc1hIUjIgJiYgIWZvcmNlQmFzZTY0O1xuICAgIH1cbiAgICAvKipcbiAgICAgKiBUcmFuc3BvcnQgbmFtZS5cbiAgICAgKi9cbiAgICBnZXQgbmFtZSgpIHtcbiAgICAgICAgcmV0dXJuIFwicG9sbGluZ1wiO1xuICAgIH1cbiAgICAvKipcbiAgICAgKiBPcGVucyB0aGUgc29ja2V0ICh0cmlnZ2VycyBwb2xsaW5nKS4gV2Ugd3JpdGUgYSBQSU5HIG1lc3NhZ2UgdG8gZGV0ZXJtaW5lXG4gICAgICogd2hlbiB0aGUgdHJhbnNwb3J0IGlzIG9wZW4uXG4gICAgICpcbiAgICAgKiBAYXBpIHByaXZhdGVcbiAgICAgKi9cbiAgICBkb09wZW4oKSB7XG4gICAgICAgIHRoaXMucG9sbCgpO1xuICAgIH1cbiAgICAvKipcbiAgICAgKiBQYXVzZXMgcG9sbGluZy5cbiAgICAgKlxuICAgICAqIEBwYXJhbSB7RnVuY3Rpb259IGNhbGxiYWNrIHVwb24gYnVmZmVycyBhcmUgZmx1c2hlZCBhbmQgdHJhbnNwb3J0IGlzIHBhdXNlZFxuICAgICAqIEBhcGkgcHJpdmF0ZVxuICAgICAqL1xuICAgIHBhdXNlKG9uUGF1c2UpIHtcbiAgICAgICAgdGhpcy5yZWFkeVN0YXRlID0gXCJwYXVzaW5nXCI7XG4gICAgICAgIGNvbnN0IHBhdXNlID0gKCkgPT4ge1xuICAgICAgICAgICAgdGhpcy5yZWFkeVN0YXRlID0gXCJwYXVzZWRcIjtcbiAgICAgICAgICAgIG9uUGF1c2UoKTtcbiAgICAgICAgfTtcbiAgICAgICAgaWYgKHRoaXMucG9sbGluZyB8fCAhdGhpcy53cml0YWJsZSkge1xuICAgICAgICAgICAgbGV0IHRvdGFsID0gMDtcbiAgICAgICAgICAgIGlmICh0aGlzLnBvbGxpbmcpIHtcbiAgICAgICAgICAgICAgICB0b3RhbCsrO1xuICAgICAgICAgICAgICAgIHRoaXMub25jZShcInBvbGxDb21wbGV0ZVwiLCBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICAgICAgICAgIC0tdG90YWwgfHwgcGF1c2UoKTtcbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGlmICghdGhpcy53cml0YWJsZSkge1xuICAgICAgICAgICAgICAgIHRvdGFsKys7XG4gICAgICAgICAgICAgICAgdGhpcy5vbmNlKFwiZHJhaW5cIiwgZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgICAgICAgICAtLXRvdGFsIHx8IHBhdXNlKCk7XG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICBwYXVzZSgpO1xuICAgICAgICB9XG4gICAgfVxuICAgIC8qKlxuICAgICAqIFN0YXJ0cyBwb2xsaW5nIGN5Y2xlLlxuICAgICAqXG4gICAgICogQGFwaSBwdWJsaWNcbiAgICAgKi9cbiAgICBwb2xsKCkge1xuICAgICAgICB0aGlzLnBvbGxpbmcgPSB0cnVlO1xuICAgICAgICB0aGlzLmRvUG9sbCgpO1xuICAgICAgICB0aGlzLmVtaXRSZXNlcnZlZChcInBvbGxcIik7XG4gICAgfVxuICAgIC8qKlxuICAgICAqIE92ZXJsb2FkcyBvbkRhdGEgdG8gZGV0ZWN0IHBheWxvYWRzLlxuICAgICAqXG4gICAgICogQGFwaSBwcml2YXRlXG4gICAgICovXG4gICAgb25EYXRhKGRhdGEpIHtcbiAgICAgICAgY29uc3QgY2FsbGJhY2sgPSBwYWNrZXQgPT4ge1xuICAgICAgICAgICAgLy8gaWYgaXRzIHRoZSBmaXJzdCBtZXNzYWdlIHdlIGNvbnNpZGVyIHRoZSB0cmFuc3BvcnQgb3BlblxuICAgICAgICAgICAgaWYgKFwib3BlbmluZ1wiID09PSB0aGlzLnJlYWR5U3RhdGUgJiYgcGFja2V0LnR5cGUgPT09IFwib3BlblwiKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5vbk9wZW4oKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIC8vIGlmIGl0cyBhIGNsb3NlIHBhY2tldCwgd2UgY2xvc2UgdGhlIG9uZ29pbmcgcmVxdWVzdHNcbiAgICAgICAgICAgIGlmIChcImNsb3NlXCIgPT09IHBhY2tldC50eXBlKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5vbkNsb3NlKHsgZGVzY3JpcHRpb246IFwidHJhbnNwb3J0IGNsb3NlZCBieSB0aGUgc2VydmVyXCIgfSk7XG4gICAgICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgLy8gb3RoZXJ3aXNlIGJ5cGFzcyBvbkRhdGEgYW5kIGhhbmRsZSB0aGUgbWVzc2FnZVxuICAgICAgICAgICAgdGhpcy5vblBhY2tldChwYWNrZXQpO1xuICAgICAgICB9O1xuICAgICAgICAvLyBkZWNvZGUgcGF5bG9hZFxuICAgICAgICBkZWNvZGVQYXlsb2FkKGRhdGEsIHRoaXMuc29ja2V0LmJpbmFyeVR5cGUpLmZvckVhY2goY2FsbGJhY2spO1xuICAgICAgICAvLyBpZiBhbiBldmVudCBkaWQgbm90IHRyaWdnZXIgY2xvc2luZ1xuICAgICAgICBpZiAoXCJjbG9zZWRcIiAhPT0gdGhpcy5yZWFkeVN0YXRlKSB7XG4gICAgICAgICAgICAvLyBpZiB3ZSBnb3QgZGF0YSB3ZSdyZSBub3QgcG9sbGluZ1xuICAgICAgICAgICAgdGhpcy5wb2xsaW5nID0gZmFsc2U7XG4gICAgICAgICAgICB0aGlzLmVtaXRSZXNlcnZlZChcInBvbGxDb21wbGV0ZVwiKTtcbiAgICAgICAgICAgIGlmIChcIm9wZW5cIiA9PT0gdGhpcy5yZWFkeVN0YXRlKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5wb2xsKCk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH1cbiAgICAvKipcbiAgICAgKiBGb3IgcG9sbGluZywgc2VuZCBhIGNsb3NlIHBhY2tldC5cbiAgICAgKlxuICAgICAqIEBhcGkgcHJpdmF0ZVxuICAgICAqL1xuICAgIGRvQ2xvc2UoKSB7XG4gICAgICAgIGNvbnN0IGNsb3NlID0gKCkgPT4ge1xuICAgICAgICAgICAgdGhpcy53cml0ZShbeyB0eXBlOiBcImNsb3NlXCIgfV0pO1xuICAgICAgICB9O1xuICAgICAgICBpZiAoXCJvcGVuXCIgPT09IHRoaXMucmVhZHlTdGF0ZSkge1xuICAgICAgICAgICAgY2xvc2UoKTtcbiAgICAgICAgfVxuICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgIC8vIGluIGNhc2Ugd2UncmUgdHJ5aW5nIHRvIGNsb3NlIHdoaWxlXG4gICAgICAgICAgICAvLyBoYW5kc2hha2luZyBpcyBpbiBwcm9ncmVzcyAoR0gtMTY0KVxuICAgICAgICAgICAgdGhpcy5vbmNlKFwib3BlblwiLCBjbG9zZSk7XG4gICAgICAgIH1cbiAgICB9XG4gICAgLyoqXG4gICAgICogV3JpdGVzIGEgcGFja2V0cyBwYXlsb2FkLlxuICAgICAqXG4gICAgICogQHBhcmFtIHtBcnJheX0gZGF0YSBwYWNrZXRzXG4gICAgICogQHBhcmFtIHtGdW5jdGlvbn0gZHJhaW4gY2FsbGJhY2tcbiAgICAgKiBAYXBpIHByaXZhdGVcbiAgICAgKi9cbiAgICB3cml0ZShwYWNrZXRzKSB7XG4gICAgICAgIHRoaXMud3JpdGFibGUgPSBmYWxzZTtcbiAgICAgICAgZW5jb2RlUGF5bG9hZChwYWNrZXRzLCBkYXRhID0+IHtcbiAgICAgICAgICAgIHRoaXMuZG9Xcml0ZShkYXRhLCAoKSA9PiB7XG4gICAgICAgICAgICAgICAgdGhpcy53cml0YWJsZSA9IHRydWU7XG4gICAgICAgICAgICAgICAgdGhpcy5lbWl0UmVzZXJ2ZWQoXCJkcmFpblwiKTtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9KTtcbiAgICB9XG4gICAgLyoqXG4gICAgICogR2VuZXJhdGVzIHVyaSBmb3IgY29ubmVjdGlvbi5cbiAgICAgKlxuICAgICAqIEBhcGkgcHJpdmF0ZVxuICAgICAqL1xuICAgIHVyaSgpIHtcbiAgICAgICAgbGV0IHF1ZXJ5ID0gdGhpcy5xdWVyeSB8fCB7fTtcbiAgICAgICAgY29uc3Qgc2NoZW1hID0gdGhpcy5vcHRzLnNlY3VyZSA/IFwiaHR0cHNcIiA6IFwiaHR0cFwiO1xuICAgICAgICBsZXQgcG9ydCA9IFwiXCI7XG4gICAgICAgIC8vIGNhY2hlIGJ1c3RpbmcgaXMgZm9yY2VkXG4gICAgICAgIGlmIChmYWxzZSAhPT0gdGhpcy5vcHRzLnRpbWVzdGFtcFJlcXVlc3RzKSB7XG4gICAgICAgICAgICBxdWVyeVt0aGlzLm9wdHMudGltZXN0YW1wUGFyYW1dID0geWVhc3QoKTtcbiAgICAgICAgfVxuICAgICAgICBpZiAoIXRoaXMuc3VwcG9ydHNCaW5hcnkgJiYgIXF1ZXJ5LnNpZCkge1xuICAgICAgICAgICAgcXVlcnkuYjY0ID0gMTtcbiAgICAgICAgfVxuICAgICAgICAvLyBhdm9pZCBwb3J0IGlmIGRlZmF1bHQgZm9yIHNjaGVtYVxuICAgICAgICBpZiAodGhpcy5vcHRzLnBvcnQgJiZcbiAgICAgICAgICAgICgoXCJodHRwc1wiID09PSBzY2hlbWEgJiYgTnVtYmVyKHRoaXMub3B0cy5wb3J0KSAhPT0gNDQzKSB8fFxuICAgICAgICAgICAgICAgIChcImh0dHBcIiA9PT0gc2NoZW1hICYmIE51bWJlcih0aGlzLm9wdHMucG9ydCkgIT09IDgwKSkpIHtcbiAgICAgICAgICAgIHBvcnQgPSBcIjpcIiArIHRoaXMub3B0cy5wb3J0O1xuICAgICAgICB9XG4gICAgICAgIGNvbnN0IGVuY29kZWRRdWVyeSA9IGVuY29kZShxdWVyeSk7XG4gICAgICAgIGNvbnN0IGlwdjYgPSB0aGlzLm9wdHMuaG9zdG5hbWUuaW5kZXhPZihcIjpcIikgIT09IC0xO1xuICAgICAgICByZXR1cm4gKHNjaGVtYSArXG4gICAgICAgICAgICBcIjovL1wiICtcbiAgICAgICAgICAgIChpcHY2ID8gXCJbXCIgKyB0aGlzLm9wdHMuaG9zdG5hbWUgKyBcIl1cIiA6IHRoaXMub3B0cy5ob3N0bmFtZSkgK1xuICAgICAgICAgICAgcG9ydCArXG4gICAgICAgICAgICB0aGlzLm9wdHMucGF0aCArXG4gICAgICAgICAgICAoZW5jb2RlZFF1ZXJ5Lmxlbmd0aCA/IFwiP1wiICsgZW5jb2RlZFF1ZXJ5IDogXCJcIikpO1xuICAgIH1cbiAgICAvKipcbiAgICAgKiBDcmVhdGVzIGEgcmVxdWVzdC5cbiAgICAgKlxuICAgICAqIEBwYXJhbSB7U3RyaW5nfSBtZXRob2RcbiAgICAgKiBAYXBpIHByaXZhdGVcbiAgICAgKi9cbiAgICByZXF1ZXN0KG9wdHMgPSB7fSkge1xuICAgICAgICBPYmplY3QuYXNzaWduKG9wdHMsIHsgeGQ6IHRoaXMueGQsIHhzOiB0aGlzLnhzIH0sIHRoaXMub3B0cyk7XG4gICAgICAgIHJldHVybiBuZXcgUmVxdWVzdCh0aGlzLnVyaSgpLCBvcHRzKTtcbiAgICB9XG4gICAgLyoqXG4gICAgICogU2VuZHMgZGF0YS5cbiAgICAgKlxuICAgICAqIEBwYXJhbSB7U3RyaW5nfSBkYXRhIHRvIHNlbmQuXG4gICAgICogQHBhcmFtIHtGdW5jdGlvbn0gY2FsbGVkIHVwb24gZmx1c2guXG4gICAgICogQGFwaSBwcml2YXRlXG4gICAgICovXG4gICAgZG9Xcml0ZShkYXRhLCBmbikge1xuICAgICAgICBjb25zdCByZXEgPSB0aGlzLnJlcXVlc3Qoe1xuICAgICAgICAgICAgbWV0aG9kOiBcIlBPU1RcIixcbiAgICAgICAgICAgIGRhdGE6IGRhdGFcbiAgICAgICAgfSk7XG4gICAgICAgIHJlcS5vbihcInN1Y2Nlc3NcIiwgZm4pO1xuICAgICAgICByZXEub24oXCJlcnJvclwiLCAoeGhyU3RhdHVzLCBjb250ZXh0KSA9PiB7XG4gICAgICAgICAgICB0aGlzLm9uRXJyb3IoXCJ4aHIgcG9zdCBlcnJvclwiLCB4aHJTdGF0dXMsIGNvbnRleHQpO1xuICAgICAgICB9KTtcbiAgICB9XG4gICAgLyoqXG4gICAgICogU3RhcnRzIGEgcG9sbCBjeWNsZS5cbiAgICAgKlxuICAgICAqIEBhcGkgcHJpdmF0ZVxuICAgICAqL1xuICAgIGRvUG9sbCgpIHtcbiAgICAgICAgY29uc3QgcmVxID0gdGhpcy5yZXF1ZXN0KCk7XG4gICAgICAgIHJlcS5vbihcImRhdGFcIiwgdGhpcy5vbkRhdGEuYmluZCh0aGlzKSk7XG4gICAgICAgIHJlcS5vbihcImVycm9yXCIsICh4aHJTdGF0dXMsIGNvbnRleHQpID0+IHtcbiAgICAgICAgICAgIHRoaXMub25FcnJvcihcInhociBwb2xsIGVycm9yXCIsIHhoclN0YXR1cywgY29udGV4dCk7XG4gICAgICAgIH0pO1xuICAgICAgICB0aGlzLnBvbGxYaHIgPSByZXE7XG4gICAgfVxufVxuZXhwb3J0IGNsYXNzIFJlcXVlc3QgZXh0ZW5kcyBFbWl0dGVyIHtcbiAgICAvKipcbiAgICAgKiBSZXF1ZXN0IGNvbnN0cnVjdG9yXG4gICAgICpcbiAgICAgKiBAcGFyYW0ge09iamVjdH0gb3B0aW9uc1xuICAgICAqIEBhcGkgcHVibGljXG4gICAgICovXG4gICAgY29uc3RydWN0b3IodXJpLCBvcHRzKSB7XG4gICAgICAgIHN1cGVyKCk7XG4gICAgICAgIGluc3RhbGxUaW1lckZ1bmN0aW9ucyh0aGlzLCBvcHRzKTtcbiAgICAgICAgdGhpcy5vcHRzID0gb3B0cztcbiAgICAgICAgdGhpcy5tZXRob2QgPSBvcHRzLm1ldGhvZCB8fCBcIkdFVFwiO1xuICAgICAgICB0aGlzLnVyaSA9IHVyaTtcbiAgICAgICAgdGhpcy5hc3luYyA9IGZhbHNlICE9PSBvcHRzLmFzeW5jO1xuICAgICAgICB0aGlzLmRhdGEgPSB1bmRlZmluZWQgIT09IG9wdHMuZGF0YSA/IG9wdHMuZGF0YSA6IG51bGw7XG4gICAgICAgIHRoaXMuY3JlYXRlKCk7XG4gICAgfVxuICAgIC8qKlxuICAgICAqIENyZWF0ZXMgdGhlIFhIUiBvYmplY3QgYW5kIHNlbmRzIHRoZSByZXF1ZXN0LlxuICAgICAqXG4gICAgICogQGFwaSBwcml2YXRlXG4gICAgICovXG4gICAgY3JlYXRlKCkge1xuICAgICAgICBjb25zdCBvcHRzID0gcGljayh0aGlzLm9wdHMsIFwiYWdlbnRcIiwgXCJwZnhcIiwgXCJrZXlcIiwgXCJwYXNzcGhyYXNlXCIsIFwiY2VydFwiLCBcImNhXCIsIFwiY2lwaGVyc1wiLCBcInJlamVjdFVuYXV0aG9yaXplZFwiLCBcImF1dG9VbnJlZlwiKTtcbiAgICAgICAgb3B0cy54ZG9tYWluID0gISF0aGlzLm9wdHMueGQ7XG4gICAgICAgIG9wdHMueHNjaGVtZSA9ICEhdGhpcy5vcHRzLnhzO1xuICAgICAgICBjb25zdCB4aHIgPSAodGhpcy54aHIgPSBuZXcgWE1MSHR0cFJlcXVlc3Qob3B0cykpO1xuICAgICAgICB0cnkge1xuICAgICAgICAgICAgeGhyLm9wZW4odGhpcy5tZXRob2QsIHRoaXMudXJpLCB0aGlzLmFzeW5jKTtcbiAgICAgICAgICAgIHRyeSB7XG4gICAgICAgICAgICAgICAgaWYgKHRoaXMub3B0cy5leHRyYUhlYWRlcnMpIHtcbiAgICAgICAgICAgICAgICAgICAgeGhyLnNldERpc2FibGVIZWFkZXJDaGVjayAmJiB4aHIuc2V0RGlzYWJsZUhlYWRlckNoZWNrKHRydWUpO1xuICAgICAgICAgICAgICAgICAgICBmb3IgKGxldCBpIGluIHRoaXMub3B0cy5leHRyYUhlYWRlcnMpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmICh0aGlzLm9wdHMuZXh0cmFIZWFkZXJzLmhhc093blByb3BlcnR5KGkpKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgeGhyLnNldFJlcXVlc3RIZWFkZXIoaSwgdGhpcy5vcHRzLmV4dHJhSGVhZGVyc1tpXSk7XG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBjYXRjaCAoZSkgeyB9XG4gICAgICAgICAgICBpZiAoXCJQT1NUXCIgPT09IHRoaXMubWV0aG9kKSB7XG4gICAgICAgICAgICAgICAgdHJ5IHtcbiAgICAgICAgICAgICAgICAgICAgeGhyLnNldFJlcXVlc3RIZWFkZXIoXCJDb250ZW50LXR5cGVcIiwgXCJ0ZXh0L3BsYWluO2NoYXJzZXQ9VVRGLThcIik7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGNhdGNoIChlKSB7IH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHRyeSB7XG4gICAgICAgICAgICAgICAgeGhyLnNldFJlcXVlc3RIZWFkZXIoXCJBY2NlcHRcIiwgXCIqLypcIik7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBjYXRjaCAoZSkgeyB9XG4gICAgICAgICAgICAvLyBpZTYgY2hlY2tcbiAgICAgICAgICAgIGlmIChcIndpdGhDcmVkZW50aWFsc1wiIGluIHhocikge1xuICAgICAgICAgICAgICAgIHhoci53aXRoQ3JlZGVudGlhbHMgPSB0aGlzLm9wdHMud2l0aENyZWRlbnRpYWxzO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgaWYgKHRoaXMub3B0cy5yZXF1ZXN0VGltZW91dCkge1xuICAgICAgICAgICAgICAgIHhoci50aW1lb3V0ID0gdGhpcy5vcHRzLnJlcXVlc3RUaW1lb3V0O1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgeGhyLm9ucmVhZHlzdGF0ZWNoYW5nZSA9ICgpID0+IHtcbiAgICAgICAgICAgICAgICBpZiAoNCAhPT0geGhyLnJlYWR5U3RhdGUpXG4gICAgICAgICAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICAgICAgICBpZiAoMjAwID09PSB4aHIuc3RhdHVzIHx8IDEyMjMgPT09IHhoci5zdGF0dXMpIHtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5vbkxvYWQoKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgIC8vIG1ha2Ugc3VyZSB0aGUgYGVycm9yYCBldmVudCBoYW5kbGVyIHRoYXQncyB1c2VyLXNldFxuICAgICAgICAgICAgICAgICAgICAvLyBkb2VzIG5vdCB0aHJvdyBpbiB0aGUgc2FtZSB0aWNrIGFuZCBnZXRzIGNhdWdodCBoZXJlXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuc2V0VGltZW91dEZuKCgpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMub25FcnJvcih0eXBlb2YgeGhyLnN0YXR1cyA9PT0gXCJudW1iZXJcIiA/IHhoci5zdGF0dXMgOiAwKTtcbiAgICAgICAgICAgICAgICAgICAgfSwgMCk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfTtcbiAgICAgICAgICAgIHhoci5zZW5kKHRoaXMuZGF0YSk7XG4gICAgICAgIH1cbiAgICAgICAgY2F0Y2ggKGUpIHtcbiAgICAgICAgICAgIC8vIE5lZWQgdG8gZGVmZXIgc2luY2UgLmNyZWF0ZSgpIGlzIGNhbGxlZCBkaXJlY3RseSBmcm9tIHRoZSBjb25zdHJ1Y3RvclxuICAgICAgICAgICAgLy8gYW5kIHRodXMgdGhlICdlcnJvcicgZXZlbnQgY2FuIG9ubHkgYmUgb25seSBib3VuZCAqYWZ0ZXIqIHRoaXMgZXhjZXB0aW9uXG4gICAgICAgICAgICAvLyBvY2N1cnMuICBUaGVyZWZvcmUsIGFsc28sIHdlIGNhbm5vdCB0aHJvdyBoZXJlIGF0IGFsbC5cbiAgICAgICAgICAgIHRoaXMuc2V0VGltZW91dEZuKCgpID0+IHtcbiAgICAgICAgICAgICAgICB0aGlzLm9uRXJyb3IoZSk7XG4gICAgICAgICAgICB9LCAwKTtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuICAgICAgICBpZiAodHlwZW9mIGRvY3VtZW50ICE9PSBcInVuZGVmaW5lZFwiKSB7XG4gICAgICAgICAgICB0aGlzLmluZGV4ID0gUmVxdWVzdC5yZXF1ZXN0c0NvdW50Kys7XG4gICAgICAgICAgICBSZXF1ZXN0LnJlcXVlc3RzW3RoaXMuaW5kZXhdID0gdGhpcztcbiAgICAgICAgfVxuICAgIH1cbiAgICAvKipcbiAgICAgKiBDYWxsZWQgdXBvbiBlcnJvci5cbiAgICAgKlxuICAgICAqIEBhcGkgcHJpdmF0ZVxuICAgICAqL1xuICAgIG9uRXJyb3IoZXJyKSB7XG4gICAgICAgIHRoaXMuZW1pdFJlc2VydmVkKFwiZXJyb3JcIiwgZXJyLCB0aGlzLnhocik7XG4gICAgICAgIHRoaXMuY2xlYW51cCh0cnVlKTtcbiAgICB9XG4gICAgLyoqXG4gICAgICogQ2xlYW5zIHVwIGhvdXNlLlxuICAgICAqXG4gICAgICogQGFwaSBwcml2YXRlXG4gICAgICovXG4gICAgY2xlYW51cChmcm9tRXJyb3IpIHtcbiAgICAgICAgaWYgKFwidW5kZWZpbmVkXCIgPT09IHR5cGVvZiB0aGlzLnhociB8fCBudWxsID09PSB0aGlzLnhocikge1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG4gICAgICAgIHRoaXMueGhyLm9ucmVhZHlzdGF0ZWNoYW5nZSA9IGVtcHR5O1xuICAgICAgICBpZiAoZnJvbUVycm9yKSB7XG4gICAgICAgICAgICB0cnkge1xuICAgICAgICAgICAgICAgIHRoaXMueGhyLmFib3J0KCk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBjYXRjaCAoZSkgeyB9XG4gICAgICAgIH1cbiAgICAgICAgaWYgKHR5cGVvZiBkb2N1bWVudCAhPT0gXCJ1bmRlZmluZWRcIikge1xuICAgICAgICAgICAgZGVsZXRlIFJlcXVlc3QucmVxdWVzdHNbdGhpcy5pbmRleF07XG4gICAgICAgIH1cbiAgICAgICAgdGhpcy54aHIgPSBudWxsO1xuICAgIH1cbiAgICAvKipcbiAgICAgKiBDYWxsZWQgdXBvbiBsb2FkLlxuICAgICAqXG4gICAgICogQGFwaSBwcml2YXRlXG4gICAgICovXG4gICAgb25Mb2FkKCkge1xuICAgICAgICBjb25zdCBkYXRhID0gdGhpcy54aHIucmVzcG9uc2VUZXh0O1xuICAgICAgICBpZiAoZGF0YSAhPT0gbnVsbCkge1xuICAgICAgICAgICAgdGhpcy5lbWl0UmVzZXJ2ZWQoXCJkYXRhXCIsIGRhdGEpO1xuICAgICAgICAgICAgdGhpcy5lbWl0UmVzZXJ2ZWQoXCJzdWNjZXNzXCIpO1xuICAgICAgICAgICAgdGhpcy5jbGVhbnVwKCk7XG4gICAgICAgIH1cbiAgICB9XG4gICAgLyoqXG4gICAgICogQWJvcnRzIHRoZSByZXF1ZXN0LlxuICAgICAqXG4gICAgICogQGFwaSBwdWJsaWNcbiAgICAgKi9cbiAgICBhYm9ydCgpIHtcbiAgICAgICAgdGhpcy5jbGVhbnVwKCk7XG4gICAgfVxufVxuUmVxdWVzdC5yZXF1ZXN0c0NvdW50ID0gMDtcblJlcXVlc3QucmVxdWVzdHMgPSB7fTtcbi8qKlxuICogQWJvcnRzIHBlbmRpbmcgcmVxdWVzdHMgd2hlbiB1bmxvYWRpbmcgdGhlIHdpbmRvdy4gVGhpcyBpcyBuZWVkZWQgdG8gcHJldmVudFxuICogbWVtb3J5IGxlYWtzIChlLmcuIHdoZW4gdXNpbmcgSUUpIGFuZCB0byBlbnN1cmUgdGhhdCBubyBzcHVyaW91cyBlcnJvciBpc1xuICogZW1pdHRlZC5cbiAqL1xuaWYgKHR5cGVvZiBkb2N1bWVudCAhPT0gXCJ1bmRlZmluZWRcIikge1xuICAgIC8vIEB0cy1pZ25vcmVcbiAgICBpZiAodHlwZW9mIGF0dGFjaEV2ZW50ID09PSBcImZ1bmN0aW9uXCIpIHtcbiAgICAgICAgLy8gQHRzLWlnbm9yZVxuICAgICAgICBhdHRhY2hFdmVudChcIm9udW5sb2FkXCIsIHVubG9hZEhhbmRsZXIpO1xuICAgIH1cbiAgICBlbHNlIGlmICh0eXBlb2YgYWRkRXZlbnRMaXN0ZW5lciA9PT0gXCJmdW5jdGlvblwiKSB7XG4gICAgICAgIGNvbnN0IHRlcm1pbmF0aW9uRXZlbnQgPSBcIm9ucGFnZWhpZGVcIiBpbiBnbG9iYWxUaGlzID8gXCJwYWdlaGlkZVwiIDogXCJ1bmxvYWRcIjtcbiAgICAgICAgYWRkRXZlbnRMaXN0ZW5lcih0ZXJtaW5hdGlvbkV2ZW50LCB1bmxvYWRIYW5kbGVyLCBmYWxzZSk7XG4gICAgfVxufVxuZnVuY3Rpb24gdW5sb2FkSGFuZGxlcigpIHtcbiAgICBmb3IgKGxldCBpIGluIFJlcXVlc3QucmVxdWVzdHMpIHtcbiAgICAgICAgaWYgKFJlcXVlc3QucmVxdWVzdHMuaGFzT3duUHJvcGVydHkoaSkpIHtcbiAgICAgICAgICAgIFJlcXVlc3QucmVxdWVzdHNbaV0uYWJvcnQoKTtcbiAgICAgICAgfVxuICAgIH1cbn1cbiIsICJpbXBvcnQgeyBnbG9iYWxUaGlzU2hpbSBhcyBnbG9iYWxUaGlzIH0gZnJvbSBcIi4uL2dsb2JhbFRoaXMuanNcIjtcbmV4cG9ydCBjb25zdCBuZXh0VGljayA9ICgoKSA9PiB7XG4gICAgY29uc3QgaXNQcm9taXNlQXZhaWxhYmxlID0gdHlwZW9mIFByb21pc2UgPT09IFwiZnVuY3Rpb25cIiAmJiB0eXBlb2YgUHJvbWlzZS5yZXNvbHZlID09PSBcImZ1bmN0aW9uXCI7XG4gICAgaWYgKGlzUHJvbWlzZUF2YWlsYWJsZSkge1xuICAgICAgICByZXR1cm4gY2IgPT4gUHJvbWlzZS5yZXNvbHZlKCkudGhlbihjYik7XG4gICAgfVxuICAgIGVsc2Uge1xuICAgICAgICByZXR1cm4gKGNiLCBzZXRUaW1lb3V0Rm4pID0+IHNldFRpbWVvdXRGbihjYiwgMCk7XG4gICAgfVxufSkoKTtcbmV4cG9ydCBjb25zdCBXZWJTb2NrZXQgPSBnbG9iYWxUaGlzLldlYlNvY2tldCB8fCBnbG9iYWxUaGlzLk1veldlYlNvY2tldDtcbmV4cG9ydCBjb25zdCB1c2luZ0Jyb3dzZXJXZWJTb2NrZXQgPSB0cnVlO1xuZXhwb3J0IGNvbnN0IGRlZmF1bHRCaW5hcnlUeXBlID0gXCJhcnJheWJ1ZmZlclwiO1xuIiwgImltcG9ydCB7IFRyYW5zcG9ydCB9IGZyb20gXCIuLi90cmFuc3BvcnQuanNcIjtcbmltcG9ydCB7IGVuY29kZSB9IGZyb20gXCIuLi9jb250cmliL3BhcnNlcXMuanNcIjtcbmltcG9ydCB7IHllYXN0IH0gZnJvbSBcIi4uL2NvbnRyaWIveWVhc3QuanNcIjtcbmltcG9ydCB7IHBpY2sgfSBmcm9tIFwiLi4vdXRpbC5qc1wiO1xuaW1wb3J0IHsgZGVmYXVsdEJpbmFyeVR5cGUsIG5leHRUaWNrLCB1c2luZ0Jyb3dzZXJXZWJTb2NrZXQsIFdlYlNvY2tldCB9IGZyb20gXCIuL3dlYnNvY2tldC1jb25zdHJ1Y3Rvci5qc1wiO1xuaW1wb3J0IHsgZW5jb2RlUGFja2V0IH0gZnJvbSBcImVuZ2luZS5pby1wYXJzZXJcIjtcbi8vIGRldGVjdCBSZWFjdE5hdGl2ZSBlbnZpcm9ubWVudFxuY29uc3QgaXNSZWFjdE5hdGl2ZSA9IHR5cGVvZiBuYXZpZ2F0b3IgIT09IFwidW5kZWZpbmVkXCIgJiZcbiAgICB0eXBlb2YgbmF2aWdhdG9yLnByb2R1Y3QgPT09IFwic3RyaW5nXCIgJiZcbiAgICBuYXZpZ2F0b3IucHJvZHVjdC50b0xvd2VyQ2FzZSgpID09PSBcInJlYWN0bmF0aXZlXCI7XG5leHBvcnQgY2xhc3MgV1MgZXh0ZW5kcyBUcmFuc3BvcnQge1xuICAgIC8qKlxuICAgICAqIFdlYlNvY2tldCB0cmFuc3BvcnQgY29uc3RydWN0b3IuXG4gICAgICpcbiAgICAgKiBAYXBpIHtPYmplY3R9IGNvbm5lY3Rpb24gb3B0aW9uc1xuICAgICAqIEBhcGkgcHVibGljXG4gICAgICovXG4gICAgY29uc3RydWN0b3Iob3B0cykge1xuICAgICAgICBzdXBlcihvcHRzKTtcbiAgICAgICAgdGhpcy5zdXBwb3J0c0JpbmFyeSA9ICFvcHRzLmZvcmNlQmFzZTY0O1xuICAgIH1cbiAgICAvKipcbiAgICAgKiBUcmFuc3BvcnQgbmFtZS5cbiAgICAgKlxuICAgICAqIEBhcGkgcHVibGljXG4gICAgICovXG4gICAgZ2V0IG5hbWUoKSB7XG4gICAgICAgIHJldHVybiBcIndlYnNvY2tldFwiO1xuICAgIH1cbiAgICAvKipcbiAgICAgKiBPcGVucyBzb2NrZXQuXG4gICAgICpcbiAgICAgKiBAYXBpIHByaXZhdGVcbiAgICAgKi9cbiAgICBkb09wZW4oKSB7XG4gICAgICAgIGlmICghdGhpcy5jaGVjaygpKSB7XG4gICAgICAgICAgICAvLyBsZXQgcHJvYmUgdGltZW91dFxuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG4gICAgICAgIGNvbnN0IHVyaSA9IHRoaXMudXJpKCk7XG4gICAgICAgIGNvbnN0IHByb3RvY29scyA9IHRoaXMub3B0cy5wcm90b2NvbHM7XG4gICAgICAgIC8vIFJlYWN0IE5hdGl2ZSBvbmx5IHN1cHBvcnRzIHRoZSAnaGVhZGVycycgb3B0aW9uLCBhbmQgd2lsbCBwcmludCBhIHdhcm5pbmcgaWYgYW55dGhpbmcgZWxzZSBpcyBwYXNzZWRcbiAgICAgICAgY29uc3Qgb3B0cyA9IGlzUmVhY3ROYXRpdmVcbiAgICAgICAgICAgID8ge31cbiAgICAgICAgICAgIDogcGljayh0aGlzLm9wdHMsIFwiYWdlbnRcIiwgXCJwZXJNZXNzYWdlRGVmbGF0ZVwiLCBcInBmeFwiLCBcImtleVwiLCBcInBhc3NwaHJhc2VcIiwgXCJjZXJ0XCIsIFwiY2FcIiwgXCJjaXBoZXJzXCIsIFwicmVqZWN0VW5hdXRob3JpemVkXCIsIFwibG9jYWxBZGRyZXNzXCIsIFwicHJvdG9jb2xWZXJzaW9uXCIsIFwib3JpZ2luXCIsIFwibWF4UGF5bG9hZFwiLCBcImZhbWlseVwiLCBcImNoZWNrU2VydmVySWRlbnRpdHlcIik7XG4gICAgICAgIGlmICh0aGlzLm9wdHMuZXh0cmFIZWFkZXJzKSB7XG4gICAgICAgICAgICBvcHRzLmhlYWRlcnMgPSB0aGlzLm9wdHMuZXh0cmFIZWFkZXJzO1xuICAgICAgICB9XG4gICAgICAgIHRyeSB7XG4gICAgICAgICAgICB0aGlzLndzID1cbiAgICAgICAgICAgICAgICB1c2luZ0Jyb3dzZXJXZWJTb2NrZXQgJiYgIWlzUmVhY3ROYXRpdmVcbiAgICAgICAgICAgICAgICAgICAgPyBwcm90b2NvbHNcbiAgICAgICAgICAgICAgICAgICAgICAgID8gbmV3IFdlYlNvY2tldCh1cmksIHByb3RvY29scylcbiAgICAgICAgICAgICAgICAgICAgICAgIDogbmV3IFdlYlNvY2tldCh1cmkpXG4gICAgICAgICAgICAgICAgICAgIDogbmV3IFdlYlNvY2tldCh1cmksIHByb3RvY29scywgb3B0cyk7XG4gICAgICAgIH1cbiAgICAgICAgY2F0Y2ggKGVycikge1xuICAgICAgICAgICAgcmV0dXJuIHRoaXMuZW1pdFJlc2VydmVkKFwiZXJyb3JcIiwgZXJyKTtcbiAgICAgICAgfVxuICAgICAgICB0aGlzLndzLmJpbmFyeVR5cGUgPSB0aGlzLnNvY2tldC5iaW5hcnlUeXBlIHx8IGRlZmF1bHRCaW5hcnlUeXBlO1xuICAgICAgICB0aGlzLmFkZEV2ZW50TGlzdGVuZXJzKCk7XG4gICAgfVxuICAgIC8qKlxuICAgICAqIEFkZHMgZXZlbnQgbGlzdGVuZXJzIHRvIHRoZSBzb2NrZXRcbiAgICAgKlxuICAgICAqIEBhcGkgcHJpdmF0ZVxuICAgICAqL1xuICAgIGFkZEV2ZW50TGlzdGVuZXJzKCkge1xuICAgICAgICB0aGlzLndzLm9ub3BlbiA9ICgpID0+IHtcbiAgICAgICAgICAgIGlmICh0aGlzLm9wdHMuYXV0b1VucmVmKSB7XG4gICAgICAgICAgICAgICAgdGhpcy53cy5fc29ja2V0LnVucmVmKCk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICB0aGlzLm9uT3BlbigpO1xuICAgICAgICB9O1xuICAgICAgICB0aGlzLndzLm9uY2xvc2UgPSBjbG9zZUV2ZW50ID0+IHRoaXMub25DbG9zZSh7XG4gICAgICAgICAgICBkZXNjcmlwdGlvbjogXCJ3ZWJzb2NrZXQgY29ubmVjdGlvbiBjbG9zZWRcIixcbiAgICAgICAgICAgIGNvbnRleHQ6IGNsb3NlRXZlbnRcbiAgICAgICAgfSk7XG4gICAgICAgIHRoaXMud3Mub25tZXNzYWdlID0gZXYgPT4gdGhpcy5vbkRhdGEoZXYuZGF0YSk7XG4gICAgICAgIHRoaXMud3Mub25lcnJvciA9IGUgPT4gdGhpcy5vbkVycm9yKFwid2Vic29ja2V0IGVycm9yXCIsIGUpO1xuICAgIH1cbiAgICAvKipcbiAgICAgKiBXcml0ZXMgZGF0YSB0byBzb2NrZXQuXG4gICAgICpcbiAgICAgKiBAcGFyYW0ge0FycmF5fSBhcnJheSBvZiBwYWNrZXRzLlxuICAgICAqIEBhcGkgcHJpdmF0ZVxuICAgICAqL1xuICAgIHdyaXRlKHBhY2tldHMpIHtcbiAgICAgICAgdGhpcy53cml0YWJsZSA9IGZhbHNlO1xuICAgICAgICAvLyBlbmNvZGVQYWNrZXQgZWZmaWNpZW50IGFzIGl0IHVzZXMgV1MgZnJhbWluZ1xuICAgICAgICAvLyBubyBuZWVkIGZvciBlbmNvZGVQYXlsb2FkXG4gICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgcGFja2V0cy5sZW5ndGg7IGkrKykge1xuICAgICAgICAgICAgY29uc3QgcGFja2V0ID0gcGFja2V0c1tpXTtcbiAgICAgICAgICAgIGNvbnN0IGxhc3RQYWNrZXQgPSBpID09PSBwYWNrZXRzLmxlbmd0aCAtIDE7XG4gICAgICAgICAgICBlbmNvZGVQYWNrZXQocGFja2V0LCB0aGlzLnN1cHBvcnRzQmluYXJ5LCBkYXRhID0+IHtcbiAgICAgICAgICAgICAgICAvLyBhbHdheXMgY3JlYXRlIGEgbmV3IG9iamVjdCAoR0gtNDM3KVxuICAgICAgICAgICAgICAgIGNvbnN0IG9wdHMgPSB7fTtcbiAgICAgICAgICAgICAgICBpZiAoIXVzaW5nQnJvd3NlcldlYlNvY2tldCkge1xuICAgICAgICAgICAgICAgICAgICBpZiAocGFja2V0Lm9wdGlvbnMpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIG9wdHMuY29tcHJlc3MgPSBwYWNrZXQub3B0aW9ucy5jb21wcmVzcztcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICBpZiAodGhpcy5vcHRzLnBlck1lc3NhZ2VEZWZsYXRlKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBjb25zdCBsZW4gPSBcbiAgICAgICAgICAgICAgICAgICAgICAgIC8vIEB0cy1pZ25vcmVcbiAgICAgICAgICAgICAgICAgICAgICAgIFwic3RyaW5nXCIgPT09IHR5cGVvZiBkYXRhID8gQnVmZmVyLmJ5dGVMZW5ndGgoZGF0YSkgOiBkYXRhLmxlbmd0aDtcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmIChsZW4gPCB0aGlzLm9wdHMucGVyTWVzc2FnZURlZmxhdGUudGhyZXNob2xkKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgb3B0cy5jb21wcmVzcyA9IGZhbHNlO1xuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIC8vIFNvbWV0aW1lcyB0aGUgd2Vic29ja2V0IGhhcyBhbHJlYWR5IGJlZW4gY2xvc2VkIGJ1dCB0aGUgYnJvd3NlciBkaWRuJ3RcbiAgICAgICAgICAgICAgICAvLyBoYXZlIGEgY2hhbmNlIG9mIGluZm9ybWluZyB1cyBhYm91dCBpdCB5ZXQsIGluIHRoYXQgY2FzZSBzZW5kIHdpbGxcbiAgICAgICAgICAgICAgICAvLyB0aHJvdyBhbiBlcnJvclxuICAgICAgICAgICAgICAgIHRyeSB7XG4gICAgICAgICAgICAgICAgICAgIGlmICh1c2luZ0Jyb3dzZXJXZWJTb2NrZXQpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIC8vIFR5cGVFcnJvciBpcyB0aHJvd24gd2hlbiBwYXNzaW5nIHRoZSBzZWNvbmQgYXJndW1lbnQgb24gU2FmYXJpXG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLndzLnNlbmQoZGF0YSk7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLndzLnNlbmQoZGF0YSwgb3B0cyk7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgY2F0Y2ggKGUpIHtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgaWYgKGxhc3RQYWNrZXQpIHtcbiAgICAgICAgICAgICAgICAgICAgLy8gZmFrZSBkcmFpblxuICAgICAgICAgICAgICAgICAgICAvLyBkZWZlciB0byBuZXh0IHRpY2sgdG8gYWxsb3cgU29ja2V0IHRvIGNsZWFyIHdyaXRlQnVmZmVyXG4gICAgICAgICAgICAgICAgICAgIG5leHRUaWNrKCgpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMud3JpdGFibGUgPSB0cnVlO1xuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5lbWl0UmVzZXJ2ZWQoXCJkcmFpblwiKTtcbiAgICAgICAgICAgICAgICAgICAgfSwgdGhpcy5zZXRUaW1lb3V0Rm4pO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9XG4gICAgfVxuICAgIC8qKlxuICAgICAqIENsb3NlcyBzb2NrZXQuXG4gICAgICpcbiAgICAgKiBAYXBpIHByaXZhdGVcbiAgICAgKi9cbiAgICBkb0Nsb3NlKCkge1xuICAgICAgICBpZiAodHlwZW9mIHRoaXMud3MgIT09IFwidW5kZWZpbmVkXCIpIHtcbiAgICAgICAgICAgIHRoaXMud3MuY2xvc2UoKTtcbiAgICAgICAgICAgIHRoaXMud3MgPSBudWxsO1xuICAgICAgICB9XG4gICAgfVxuICAgIC8qKlxuICAgICAqIEdlbmVyYXRlcyB1cmkgZm9yIGNvbm5lY3Rpb24uXG4gICAgICpcbiAgICAgKiBAYXBpIHByaXZhdGVcbiAgICAgKi9cbiAgICB1cmkoKSB7XG4gICAgICAgIGxldCBxdWVyeSA9IHRoaXMucXVlcnkgfHwge307XG4gICAgICAgIGNvbnN0IHNjaGVtYSA9IHRoaXMub3B0cy5zZWN1cmUgPyBcIndzc1wiIDogXCJ3c1wiO1xuICAgICAgICBsZXQgcG9ydCA9IFwiXCI7XG4gICAgICAgIC8vIGF2b2lkIHBvcnQgaWYgZGVmYXVsdCBmb3Igc2NoZW1hXG4gICAgICAgIGlmICh0aGlzLm9wdHMucG9ydCAmJlxuICAgICAgICAgICAgKChcIndzc1wiID09PSBzY2hlbWEgJiYgTnVtYmVyKHRoaXMub3B0cy5wb3J0KSAhPT0gNDQzKSB8fFxuICAgICAgICAgICAgICAgIChcIndzXCIgPT09IHNjaGVtYSAmJiBOdW1iZXIodGhpcy5vcHRzLnBvcnQpICE9PSA4MCkpKSB7XG4gICAgICAgICAgICBwb3J0ID0gXCI6XCIgKyB0aGlzLm9wdHMucG9ydDtcbiAgICAgICAgfVxuICAgICAgICAvLyBhcHBlbmQgdGltZXN0YW1wIHRvIFVSSVxuICAgICAgICBpZiAodGhpcy5vcHRzLnRpbWVzdGFtcFJlcXVlc3RzKSB7XG4gICAgICAgICAgICBxdWVyeVt0aGlzLm9wdHMudGltZXN0YW1wUGFyYW1dID0geWVhc3QoKTtcbiAgICAgICAgfVxuICAgICAgICAvLyBjb21tdW5pY2F0ZSBiaW5hcnkgc3VwcG9ydCBjYXBhYmlsaXRpZXNcbiAgICAgICAgaWYgKCF0aGlzLnN1cHBvcnRzQmluYXJ5KSB7XG4gICAgICAgICAgICBxdWVyeS5iNjQgPSAxO1xuICAgICAgICB9XG4gICAgICAgIGNvbnN0IGVuY29kZWRRdWVyeSA9IGVuY29kZShxdWVyeSk7XG4gICAgICAgIGNvbnN0IGlwdjYgPSB0aGlzLm9wdHMuaG9zdG5hbWUuaW5kZXhPZihcIjpcIikgIT09IC0xO1xuICAgICAgICByZXR1cm4gKHNjaGVtYSArXG4gICAgICAgICAgICBcIjovL1wiICtcbiAgICAgICAgICAgIChpcHY2ID8gXCJbXCIgKyB0aGlzLm9wdHMuaG9zdG5hbWUgKyBcIl1cIiA6IHRoaXMub3B0cy5ob3N0bmFtZSkgK1xuICAgICAgICAgICAgcG9ydCArXG4gICAgICAgICAgICB0aGlzLm9wdHMucGF0aCArXG4gICAgICAgICAgICAoZW5jb2RlZFF1ZXJ5Lmxlbmd0aCA/IFwiP1wiICsgZW5jb2RlZFF1ZXJ5IDogXCJcIikpO1xuICAgIH1cbiAgICAvKipcbiAgICAgKiBGZWF0dXJlIGRldGVjdGlvbiBmb3IgV2ViU29ja2V0LlxuICAgICAqXG4gICAgICogQHJldHVybiB7Qm9vbGVhbn0gd2hldGhlciB0aGlzIHRyYW5zcG9ydCBpcyBhdmFpbGFibGUuXG4gICAgICogQGFwaSBwdWJsaWNcbiAgICAgKi9cbiAgICBjaGVjaygpIHtcbiAgICAgICAgcmV0dXJuICEhV2ViU29ja2V0O1xuICAgIH1cbn1cbiIsICJpbXBvcnQgeyBQb2xsaW5nIH0gZnJvbSBcIi4vcG9sbGluZy5qc1wiO1xuaW1wb3J0IHsgV1MgfSBmcm9tIFwiLi93ZWJzb2NrZXQuanNcIjtcbmV4cG9ydCBjb25zdCB0cmFuc3BvcnRzID0ge1xuICAgIHdlYnNvY2tldDogV1MsXG4gICAgcG9sbGluZzogUG9sbGluZ1xufTtcbiIsICIvLyBpbXBvcnRlZCBmcm9tIGh0dHBzOi8vZ2l0aHViLmNvbS9nYWxrbi9wYXJzZXVyaVxuLyoqXG4gKiBQYXJzZXMgYW4gVVJJXG4gKlxuICogQGF1dGhvciBTdGV2ZW4gTGV2aXRoYW4gPHN0ZXZlbmxldml0aGFuLmNvbT4gKE1JVCBsaWNlbnNlKVxuICogQGFwaSBwcml2YXRlXG4gKi9cbmNvbnN0IHJlID0gL14oPzooPyFbXjpAXSs6W146QFxcL10qQCkoaHR0cHxodHRwc3x3c3x3c3MpOlxcL1xcLyk/KCg/OigoW146QF0qKSg/OjooW146QF0qKSk/KT9AKT8oKD86W2EtZjAtOV17MCw0fTopezIsN31bYS1mMC05XXswLDR9fFteOlxcLz8jXSopKD86OihcXGQqKSk/KSgoKFxcLyg/OltePyNdKD8hW14/I1xcL10qXFwuW14/I1xcLy5dKyg/Ols/I118JCkpKSpcXC8/KT8oW14/I1xcL10qKSkoPzpcXD8oW14jXSopKT8oPzojKC4qKSk/KS87XG5jb25zdCBwYXJ0cyA9IFtcbiAgICAnc291cmNlJywgJ3Byb3RvY29sJywgJ2F1dGhvcml0eScsICd1c2VySW5mbycsICd1c2VyJywgJ3Bhc3N3b3JkJywgJ2hvc3QnLCAncG9ydCcsICdyZWxhdGl2ZScsICdwYXRoJywgJ2RpcmVjdG9yeScsICdmaWxlJywgJ3F1ZXJ5JywgJ2FuY2hvcidcbl07XG5leHBvcnQgZnVuY3Rpb24gcGFyc2Uoc3RyKSB7XG4gICAgY29uc3Qgc3JjID0gc3RyLCBiID0gc3RyLmluZGV4T2YoJ1snKSwgZSA9IHN0ci5pbmRleE9mKCddJyk7XG4gICAgaWYgKGIgIT0gLTEgJiYgZSAhPSAtMSkge1xuICAgICAgICBzdHIgPSBzdHIuc3Vic3RyaW5nKDAsIGIpICsgc3RyLnN1YnN0cmluZyhiLCBlKS5yZXBsYWNlKC86L2csICc7JykgKyBzdHIuc3Vic3RyaW5nKGUsIHN0ci5sZW5ndGgpO1xuICAgIH1cbiAgICBsZXQgbSA9IHJlLmV4ZWMoc3RyIHx8ICcnKSwgdXJpID0ge30sIGkgPSAxNDtcbiAgICB3aGlsZSAoaS0tKSB7XG4gICAgICAgIHVyaVtwYXJ0c1tpXV0gPSBtW2ldIHx8ICcnO1xuICAgIH1cbiAgICBpZiAoYiAhPSAtMSAmJiBlICE9IC0xKSB7XG4gICAgICAgIHVyaS5zb3VyY2UgPSBzcmM7XG4gICAgICAgIHVyaS5ob3N0ID0gdXJpLmhvc3Quc3Vic3RyaW5nKDEsIHVyaS5ob3N0Lmxlbmd0aCAtIDEpLnJlcGxhY2UoLzsvZywgJzonKTtcbiAgICAgICAgdXJpLmF1dGhvcml0eSA9IHVyaS5hdXRob3JpdHkucmVwbGFjZSgnWycsICcnKS5yZXBsYWNlKCddJywgJycpLnJlcGxhY2UoLzsvZywgJzonKTtcbiAgICAgICAgdXJpLmlwdjZ1cmkgPSB0cnVlO1xuICAgIH1cbiAgICB1cmkucGF0aE5hbWVzID0gcGF0aE5hbWVzKHVyaSwgdXJpWydwYXRoJ10pO1xuICAgIHVyaS5xdWVyeUtleSA9IHF1ZXJ5S2V5KHVyaSwgdXJpWydxdWVyeSddKTtcbiAgICByZXR1cm4gdXJpO1xufVxuZnVuY3Rpb24gcGF0aE5hbWVzKG9iaiwgcGF0aCkge1xuICAgIGNvbnN0IHJlZ3ggPSAvXFwvezIsOX0vZywgbmFtZXMgPSBwYXRoLnJlcGxhY2UocmVneCwgXCIvXCIpLnNwbGl0KFwiL1wiKTtcbiAgICBpZiAocGF0aC5zdWJzdHIoMCwgMSkgPT0gJy8nIHx8IHBhdGgubGVuZ3RoID09PSAwKSB7XG4gICAgICAgIG5hbWVzLnNwbGljZSgwLCAxKTtcbiAgICB9XG4gICAgaWYgKHBhdGguc3Vic3RyKHBhdGgubGVuZ3RoIC0gMSwgMSkgPT0gJy8nKSB7XG4gICAgICAgIG5hbWVzLnNwbGljZShuYW1lcy5sZW5ndGggLSAxLCAxKTtcbiAgICB9XG4gICAgcmV0dXJuIG5hbWVzO1xufVxuZnVuY3Rpb24gcXVlcnlLZXkodXJpLCBxdWVyeSkge1xuICAgIGNvbnN0IGRhdGEgPSB7fTtcbiAgICBxdWVyeS5yZXBsYWNlKC8oPzpefCYpKFteJj1dKik9PyhbXiZdKikvZywgZnVuY3Rpb24gKCQwLCAkMSwgJDIpIHtcbiAgICAgICAgaWYgKCQxKSB7XG4gICAgICAgICAgICBkYXRhWyQxXSA9ICQyO1xuICAgICAgICB9XG4gICAgfSk7XG4gICAgcmV0dXJuIGRhdGE7XG59XG4iLCAiaW1wb3J0IHsgdHJhbnNwb3J0cyB9IGZyb20gXCIuL3RyYW5zcG9ydHMvaW5kZXguanNcIjtcbmltcG9ydCB7IGluc3RhbGxUaW1lckZ1bmN0aW9ucywgYnl0ZUxlbmd0aCB9IGZyb20gXCIuL3V0aWwuanNcIjtcbmltcG9ydCB7IGRlY29kZSB9IGZyb20gXCIuL2NvbnRyaWIvcGFyc2Vxcy5qc1wiO1xuaW1wb3J0IHsgcGFyc2UgfSBmcm9tIFwiLi9jb250cmliL3BhcnNldXJpLmpzXCI7XG5pbXBvcnQgeyBFbWl0dGVyIH0gZnJvbSBcIkBzb2NrZXQuaW8vY29tcG9uZW50LWVtaXR0ZXJcIjtcbmltcG9ydCB7IHByb3RvY29sIH0gZnJvbSBcImVuZ2luZS5pby1wYXJzZXJcIjtcbmV4cG9ydCBjbGFzcyBTb2NrZXQgZXh0ZW5kcyBFbWl0dGVyIHtcbiAgICAvKipcbiAgICAgKiBTb2NrZXQgY29uc3RydWN0b3IuXG4gICAgICpcbiAgICAgKiBAcGFyYW0ge1N0cmluZ3xPYmplY3R9IHVyaSBvciBvcHRpb25zXG4gICAgICogQHBhcmFtIHtPYmplY3R9IG9wdHMgLSBvcHRpb25zXG4gICAgICogQGFwaSBwdWJsaWNcbiAgICAgKi9cbiAgICBjb25zdHJ1Y3Rvcih1cmksIG9wdHMgPSB7fSkge1xuICAgICAgICBzdXBlcigpO1xuICAgICAgICBpZiAodXJpICYmIFwib2JqZWN0XCIgPT09IHR5cGVvZiB1cmkpIHtcbiAgICAgICAgICAgIG9wdHMgPSB1cmk7XG4gICAgICAgICAgICB1cmkgPSBudWxsO1xuICAgICAgICB9XG4gICAgICAgIGlmICh1cmkpIHtcbiAgICAgICAgICAgIHVyaSA9IHBhcnNlKHVyaSk7XG4gICAgICAgICAgICBvcHRzLmhvc3RuYW1lID0gdXJpLmhvc3Q7XG4gICAgICAgICAgICBvcHRzLnNlY3VyZSA9IHVyaS5wcm90b2NvbCA9PT0gXCJodHRwc1wiIHx8IHVyaS5wcm90b2NvbCA9PT0gXCJ3c3NcIjtcbiAgICAgICAgICAgIG9wdHMucG9ydCA9IHVyaS5wb3J0O1xuICAgICAgICAgICAgaWYgKHVyaS5xdWVyeSlcbiAgICAgICAgICAgICAgICBvcHRzLnF1ZXJ5ID0gdXJpLnF1ZXJ5O1xuICAgICAgICB9XG4gICAgICAgIGVsc2UgaWYgKG9wdHMuaG9zdCkge1xuICAgICAgICAgICAgb3B0cy5ob3N0bmFtZSA9IHBhcnNlKG9wdHMuaG9zdCkuaG9zdDtcbiAgICAgICAgfVxuICAgICAgICBpbnN0YWxsVGltZXJGdW5jdGlvbnModGhpcywgb3B0cyk7XG4gICAgICAgIHRoaXMuc2VjdXJlID1cbiAgICAgICAgICAgIG51bGwgIT0gb3B0cy5zZWN1cmVcbiAgICAgICAgICAgICAgICA/IG9wdHMuc2VjdXJlXG4gICAgICAgICAgICAgICAgOiB0eXBlb2YgbG9jYXRpb24gIT09IFwidW5kZWZpbmVkXCIgJiYgXCJodHRwczpcIiA9PT0gbG9jYXRpb24ucHJvdG9jb2w7XG4gICAgICAgIGlmIChvcHRzLmhvc3RuYW1lICYmICFvcHRzLnBvcnQpIHtcbiAgICAgICAgICAgIC8vIGlmIG5vIHBvcnQgaXMgc3BlY2lmaWVkIG1hbnVhbGx5LCB1c2UgdGhlIHByb3RvY29sIGRlZmF1bHRcbiAgICAgICAgICAgIG9wdHMucG9ydCA9IHRoaXMuc2VjdXJlID8gXCI0NDNcIiA6IFwiODBcIjtcbiAgICAgICAgfVxuICAgICAgICB0aGlzLmhvc3RuYW1lID1cbiAgICAgICAgICAgIG9wdHMuaG9zdG5hbWUgfHxcbiAgICAgICAgICAgICAgICAodHlwZW9mIGxvY2F0aW9uICE9PSBcInVuZGVmaW5lZFwiID8gbG9jYXRpb24uaG9zdG5hbWUgOiBcImxvY2FsaG9zdFwiKTtcbiAgICAgICAgdGhpcy5wb3J0ID1cbiAgICAgICAgICAgIG9wdHMucG9ydCB8fFxuICAgICAgICAgICAgICAgICh0eXBlb2YgbG9jYXRpb24gIT09IFwidW5kZWZpbmVkXCIgJiYgbG9jYXRpb24ucG9ydFxuICAgICAgICAgICAgICAgICAgICA/IGxvY2F0aW9uLnBvcnRcbiAgICAgICAgICAgICAgICAgICAgOiB0aGlzLnNlY3VyZVxuICAgICAgICAgICAgICAgICAgICAgICAgPyBcIjQ0M1wiXG4gICAgICAgICAgICAgICAgICAgICAgICA6IFwiODBcIik7XG4gICAgICAgIHRoaXMudHJhbnNwb3J0cyA9IG9wdHMudHJhbnNwb3J0cyB8fCBbXCJwb2xsaW5nXCIsIFwid2Vic29ja2V0XCJdO1xuICAgICAgICB0aGlzLnJlYWR5U3RhdGUgPSBcIlwiO1xuICAgICAgICB0aGlzLndyaXRlQnVmZmVyID0gW107XG4gICAgICAgIHRoaXMucHJldkJ1ZmZlckxlbiA9IDA7XG4gICAgICAgIHRoaXMub3B0cyA9IE9iamVjdC5hc3NpZ24oe1xuICAgICAgICAgICAgcGF0aDogXCIvZW5naW5lLmlvXCIsXG4gICAgICAgICAgICBhZ2VudDogZmFsc2UsXG4gICAgICAgICAgICB3aXRoQ3JlZGVudGlhbHM6IGZhbHNlLFxuICAgICAgICAgICAgdXBncmFkZTogdHJ1ZSxcbiAgICAgICAgICAgIHRpbWVzdGFtcFBhcmFtOiBcInRcIixcbiAgICAgICAgICAgIHJlbWVtYmVyVXBncmFkZTogZmFsc2UsXG4gICAgICAgICAgICByZWplY3RVbmF1dGhvcml6ZWQ6IHRydWUsXG4gICAgICAgICAgICBwZXJNZXNzYWdlRGVmbGF0ZToge1xuICAgICAgICAgICAgICAgIHRocmVzaG9sZDogMTAyNFxuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIHRyYW5zcG9ydE9wdGlvbnM6IHt9LFxuICAgICAgICAgICAgY2xvc2VPbkJlZm9yZXVubG9hZDogdHJ1ZVxuICAgICAgICB9LCBvcHRzKTtcbiAgICAgICAgdGhpcy5vcHRzLnBhdGggPSB0aGlzLm9wdHMucGF0aC5yZXBsYWNlKC9cXC8kLywgXCJcIikgKyBcIi9cIjtcbiAgICAgICAgaWYgKHR5cGVvZiB0aGlzLm9wdHMucXVlcnkgPT09IFwic3RyaW5nXCIpIHtcbiAgICAgICAgICAgIHRoaXMub3B0cy5xdWVyeSA9IGRlY29kZSh0aGlzLm9wdHMucXVlcnkpO1xuICAgICAgICB9XG4gICAgICAgIC8vIHNldCBvbiBoYW5kc2hha2VcbiAgICAgICAgdGhpcy5pZCA9IG51bGw7XG4gICAgICAgIHRoaXMudXBncmFkZXMgPSBudWxsO1xuICAgICAgICB0aGlzLnBpbmdJbnRlcnZhbCA9IG51bGw7XG4gICAgICAgIHRoaXMucGluZ1RpbWVvdXQgPSBudWxsO1xuICAgICAgICAvLyBzZXQgb24gaGVhcnRiZWF0XG4gICAgICAgIHRoaXMucGluZ1RpbWVvdXRUaW1lciA9IG51bGw7XG4gICAgICAgIGlmICh0eXBlb2YgYWRkRXZlbnRMaXN0ZW5lciA9PT0gXCJmdW5jdGlvblwiKSB7XG4gICAgICAgICAgICBpZiAodGhpcy5vcHRzLmNsb3NlT25CZWZvcmV1bmxvYWQpIHtcbiAgICAgICAgICAgICAgICAvLyBGaXJlZm94IGNsb3NlcyB0aGUgY29ubmVjdGlvbiB3aGVuIHRoZSBcImJlZm9yZXVubG9hZFwiIGV2ZW50IGlzIGVtaXR0ZWQgYnV0IG5vdCBDaHJvbWUuIFRoaXMgZXZlbnQgbGlzdGVuZXJcbiAgICAgICAgICAgICAgICAvLyBlbnN1cmVzIGV2ZXJ5IGJyb3dzZXIgYmVoYXZlcyB0aGUgc2FtZSAobm8gXCJkaXNjb25uZWN0XCIgZXZlbnQgYXQgdGhlIFNvY2tldC5JTyBsZXZlbCB3aGVuIHRoZSBwYWdlIGlzXG4gICAgICAgICAgICAgICAgLy8gY2xvc2VkL3JlbG9hZGVkKVxuICAgICAgICAgICAgICAgIGFkZEV2ZW50TGlzdGVuZXIoXCJiZWZvcmV1bmxvYWRcIiwgKCkgPT4ge1xuICAgICAgICAgICAgICAgICAgICBpZiAodGhpcy50cmFuc3BvcnQpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIC8vIHNpbGVudGx5IGNsb3NlIHRoZSB0cmFuc3BvcnRcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMudHJhbnNwb3J0LnJlbW92ZUFsbExpc3RlbmVycygpO1xuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy50cmFuc3BvcnQuY2xvc2UoKTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH0sIGZhbHNlKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGlmICh0aGlzLmhvc3RuYW1lICE9PSBcImxvY2FsaG9zdFwiKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5vZmZsaW5lRXZlbnRMaXN0ZW5lciA9ICgpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5vbkNsb3NlKFwidHJhbnNwb3J0IGNsb3NlXCIsIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGRlc2NyaXB0aW9uOiBcIm5ldHdvcmsgY29ubmVjdGlvbiBsb3N0XCJcbiAgICAgICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgICAgfTtcbiAgICAgICAgICAgICAgICBhZGRFdmVudExpc3RlbmVyKFwib2ZmbGluZVwiLCB0aGlzLm9mZmxpbmVFdmVudExpc3RlbmVyLCBmYWxzZSk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgdGhpcy5vcGVuKCk7XG4gICAgfVxuICAgIC8qKlxuICAgICAqIENyZWF0ZXMgdHJhbnNwb3J0IG9mIHRoZSBnaXZlbiB0eXBlLlxuICAgICAqXG4gICAgICogQHBhcmFtIHtTdHJpbmd9IHRyYW5zcG9ydCBuYW1lXG4gICAgICogQHJldHVybiB7VHJhbnNwb3J0fVxuICAgICAqIEBhcGkgcHJpdmF0ZVxuICAgICAqL1xuICAgIGNyZWF0ZVRyYW5zcG9ydChuYW1lKSB7XG4gICAgICAgIGNvbnN0IHF1ZXJ5ID0gT2JqZWN0LmFzc2lnbih7fSwgdGhpcy5vcHRzLnF1ZXJ5KTtcbiAgICAgICAgLy8gYXBwZW5kIGVuZ2luZS5pbyBwcm90b2NvbCBpZGVudGlmaWVyXG4gICAgICAgIHF1ZXJ5LkVJTyA9IHByb3RvY29sO1xuICAgICAgICAvLyB0cmFuc3BvcnQgbmFtZVxuICAgICAgICBxdWVyeS50cmFuc3BvcnQgPSBuYW1lO1xuICAgICAgICAvLyBzZXNzaW9uIGlkIGlmIHdlIGFscmVhZHkgaGF2ZSBvbmVcbiAgICAgICAgaWYgKHRoaXMuaWQpXG4gICAgICAgICAgICBxdWVyeS5zaWQgPSB0aGlzLmlkO1xuICAgICAgICBjb25zdCBvcHRzID0gT2JqZWN0LmFzc2lnbih7fSwgdGhpcy5vcHRzLnRyYW5zcG9ydE9wdGlvbnNbbmFtZV0sIHRoaXMub3B0cywge1xuICAgICAgICAgICAgcXVlcnksXG4gICAgICAgICAgICBzb2NrZXQ6IHRoaXMsXG4gICAgICAgICAgICBob3N0bmFtZTogdGhpcy5ob3N0bmFtZSxcbiAgICAgICAgICAgIHNlY3VyZTogdGhpcy5zZWN1cmUsXG4gICAgICAgICAgICBwb3J0OiB0aGlzLnBvcnRcbiAgICAgICAgfSk7XG4gICAgICAgIHJldHVybiBuZXcgdHJhbnNwb3J0c1tuYW1lXShvcHRzKTtcbiAgICB9XG4gICAgLyoqXG4gICAgICogSW5pdGlhbGl6ZXMgdHJhbnNwb3J0IHRvIHVzZSBhbmQgc3RhcnRzIHByb2JlLlxuICAgICAqXG4gICAgICogQGFwaSBwcml2YXRlXG4gICAgICovXG4gICAgb3BlbigpIHtcbiAgICAgICAgbGV0IHRyYW5zcG9ydDtcbiAgICAgICAgaWYgKHRoaXMub3B0cy5yZW1lbWJlclVwZ3JhZGUgJiZcbiAgICAgICAgICAgIFNvY2tldC5wcmlvcldlYnNvY2tldFN1Y2Nlc3MgJiZcbiAgICAgICAgICAgIHRoaXMudHJhbnNwb3J0cy5pbmRleE9mKFwid2Vic29ja2V0XCIpICE9PSAtMSkge1xuICAgICAgICAgICAgdHJhbnNwb3J0ID0gXCJ3ZWJzb2NrZXRcIjtcbiAgICAgICAgfVxuICAgICAgICBlbHNlIGlmICgwID09PSB0aGlzLnRyYW5zcG9ydHMubGVuZ3RoKSB7XG4gICAgICAgICAgICAvLyBFbWl0IGVycm9yIG9uIG5leHQgdGljayBzbyBpdCBjYW4gYmUgbGlzdGVuZWQgdG9cbiAgICAgICAgICAgIHRoaXMuc2V0VGltZW91dEZuKCgpID0+IHtcbiAgICAgICAgICAgICAgICB0aGlzLmVtaXRSZXNlcnZlZChcImVycm9yXCIsIFwiTm8gdHJhbnNwb3J0cyBhdmFpbGFibGVcIik7XG4gICAgICAgICAgICB9LCAwKTtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgIHRyYW5zcG9ydCA9IHRoaXMudHJhbnNwb3J0c1swXTtcbiAgICAgICAgfVxuICAgICAgICB0aGlzLnJlYWR5U3RhdGUgPSBcIm9wZW5pbmdcIjtcbiAgICAgICAgLy8gUmV0cnkgd2l0aCB0aGUgbmV4dCB0cmFuc3BvcnQgaWYgdGhlIHRyYW5zcG9ydCBpcyBkaXNhYmxlZCAoanNvbnA6IGZhbHNlKVxuICAgICAgICB0cnkge1xuICAgICAgICAgICAgdHJhbnNwb3J0ID0gdGhpcy5jcmVhdGVUcmFuc3BvcnQodHJhbnNwb3J0KTtcbiAgICAgICAgfVxuICAgICAgICBjYXRjaCAoZSkge1xuICAgICAgICAgICAgdGhpcy50cmFuc3BvcnRzLnNoaWZ0KCk7XG4gICAgICAgICAgICB0aGlzLm9wZW4oKTtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuICAgICAgICB0cmFuc3BvcnQub3BlbigpO1xuICAgICAgICB0aGlzLnNldFRyYW5zcG9ydCh0cmFuc3BvcnQpO1xuICAgIH1cbiAgICAvKipcbiAgICAgKiBTZXRzIHRoZSBjdXJyZW50IHRyYW5zcG9ydC4gRGlzYWJsZXMgdGhlIGV4aXN0aW5nIG9uZSAoaWYgYW55KS5cbiAgICAgKlxuICAgICAqIEBhcGkgcHJpdmF0ZVxuICAgICAqL1xuICAgIHNldFRyYW5zcG9ydCh0cmFuc3BvcnQpIHtcbiAgICAgICAgaWYgKHRoaXMudHJhbnNwb3J0KSB7XG4gICAgICAgICAgICB0aGlzLnRyYW5zcG9ydC5yZW1vdmVBbGxMaXN0ZW5lcnMoKTtcbiAgICAgICAgfVxuICAgICAgICAvLyBzZXQgdXAgdHJhbnNwb3J0XG4gICAgICAgIHRoaXMudHJhbnNwb3J0ID0gdHJhbnNwb3J0O1xuICAgICAgICAvLyBzZXQgdXAgdHJhbnNwb3J0IGxpc3RlbmVyc1xuICAgICAgICB0cmFuc3BvcnRcbiAgICAgICAgICAgIC5vbihcImRyYWluXCIsIHRoaXMub25EcmFpbi5iaW5kKHRoaXMpKVxuICAgICAgICAgICAgLm9uKFwicGFja2V0XCIsIHRoaXMub25QYWNrZXQuYmluZCh0aGlzKSlcbiAgICAgICAgICAgIC5vbihcImVycm9yXCIsIHRoaXMub25FcnJvci5iaW5kKHRoaXMpKVxuICAgICAgICAgICAgLm9uKFwiY2xvc2VcIiwgcmVhc29uID0+IHRoaXMub25DbG9zZShcInRyYW5zcG9ydCBjbG9zZVwiLCByZWFzb24pKTtcbiAgICB9XG4gICAgLyoqXG4gICAgICogUHJvYmVzIGEgdHJhbnNwb3J0LlxuICAgICAqXG4gICAgICogQHBhcmFtIHtTdHJpbmd9IHRyYW5zcG9ydCBuYW1lXG4gICAgICogQGFwaSBwcml2YXRlXG4gICAgICovXG4gICAgcHJvYmUobmFtZSkge1xuICAgICAgICBsZXQgdHJhbnNwb3J0ID0gdGhpcy5jcmVhdGVUcmFuc3BvcnQobmFtZSk7XG4gICAgICAgIGxldCBmYWlsZWQgPSBmYWxzZTtcbiAgICAgICAgU29ja2V0LnByaW9yV2Vic29ja2V0U3VjY2VzcyA9IGZhbHNlO1xuICAgICAgICBjb25zdCBvblRyYW5zcG9ydE9wZW4gPSAoKSA9PiB7XG4gICAgICAgICAgICBpZiAoZmFpbGVkKVxuICAgICAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICAgIHRyYW5zcG9ydC5zZW5kKFt7IHR5cGU6IFwicGluZ1wiLCBkYXRhOiBcInByb2JlXCIgfV0pO1xuICAgICAgICAgICAgdHJhbnNwb3J0Lm9uY2UoXCJwYWNrZXRcIiwgbXNnID0+IHtcbiAgICAgICAgICAgICAgICBpZiAoZmFpbGVkKVxuICAgICAgICAgICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgICAgICAgaWYgKFwicG9uZ1wiID09PSBtc2cudHlwZSAmJiBcInByb2JlXCIgPT09IG1zZy5kYXRhKSB7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMudXBncmFkaW5nID0gdHJ1ZTtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5lbWl0UmVzZXJ2ZWQoXCJ1cGdyYWRpbmdcIiwgdHJhbnNwb3J0KTtcbiAgICAgICAgICAgICAgICAgICAgaWYgKCF0cmFuc3BvcnQpXG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgICAgICAgICAgIFNvY2tldC5wcmlvcldlYnNvY2tldFN1Y2Nlc3MgPSBcIndlYnNvY2tldFwiID09PSB0cmFuc3BvcnQubmFtZTtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy50cmFuc3BvcnQucGF1c2UoKCkgPT4ge1xuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKGZhaWxlZClcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAoXCJjbG9zZWRcIiA9PT0gdGhpcy5yZWFkeVN0YXRlKVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICAgICAgICAgICAgICAgIGNsZWFudXAoKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuc2V0VHJhbnNwb3J0KHRyYW5zcG9ydCk7XG4gICAgICAgICAgICAgICAgICAgICAgICB0cmFuc3BvcnQuc2VuZChbeyB0eXBlOiBcInVwZ3JhZGVcIiB9XSk7XG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLmVtaXRSZXNlcnZlZChcInVwZ3JhZGVcIiwgdHJhbnNwb3J0KTtcbiAgICAgICAgICAgICAgICAgICAgICAgIHRyYW5zcG9ydCA9IG51bGw7XG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLnVwZ3JhZGluZyA9IGZhbHNlO1xuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5mbHVzaCgpO1xuICAgICAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgIGNvbnN0IGVyciA9IG5ldyBFcnJvcihcInByb2JlIGVycm9yXCIpO1xuICAgICAgICAgICAgICAgICAgICAvLyBAdHMtaWdub3JlXG4gICAgICAgICAgICAgICAgICAgIGVyci50cmFuc3BvcnQgPSB0cmFuc3BvcnQubmFtZTtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5lbWl0UmVzZXJ2ZWQoXCJ1cGdyYWRlRXJyb3JcIiwgZXJyKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfTtcbiAgICAgICAgZnVuY3Rpb24gZnJlZXplVHJhbnNwb3J0KCkge1xuICAgICAgICAgICAgaWYgKGZhaWxlZClcbiAgICAgICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgICAvLyBBbnkgY2FsbGJhY2sgY2FsbGVkIGJ5IHRyYW5zcG9ydCBzaG91bGQgYmUgaWdub3JlZCBzaW5jZSBub3dcbiAgICAgICAgICAgIGZhaWxlZCA9IHRydWU7XG4gICAgICAgICAgICBjbGVhbnVwKCk7XG4gICAgICAgICAgICB0cmFuc3BvcnQuY2xvc2UoKTtcbiAgICAgICAgICAgIHRyYW5zcG9ydCA9IG51bGw7XG4gICAgICAgIH1cbiAgICAgICAgLy8gSGFuZGxlIGFueSBlcnJvciB0aGF0IGhhcHBlbnMgd2hpbGUgcHJvYmluZ1xuICAgICAgICBjb25zdCBvbmVycm9yID0gZXJyID0+IHtcbiAgICAgICAgICAgIGNvbnN0IGVycm9yID0gbmV3IEVycm9yKFwicHJvYmUgZXJyb3I6IFwiICsgZXJyKTtcbiAgICAgICAgICAgIC8vIEB0cy1pZ25vcmVcbiAgICAgICAgICAgIGVycm9yLnRyYW5zcG9ydCA9IHRyYW5zcG9ydC5uYW1lO1xuICAgICAgICAgICAgZnJlZXplVHJhbnNwb3J0KCk7XG4gICAgICAgICAgICB0aGlzLmVtaXRSZXNlcnZlZChcInVwZ3JhZGVFcnJvclwiLCBlcnJvcik7XG4gICAgICAgIH07XG4gICAgICAgIGZ1bmN0aW9uIG9uVHJhbnNwb3J0Q2xvc2UoKSB7XG4gICAgICAgICAgICBvbmVycm9yKFwidHJhbnNwb3J0IGNsb3NlZFwiKTtcbiAgICAgICAgfVxuICAgICAgICAvLyBXaGVuIHRoZSBzb2NrZXQgaXMgY2xvc2VkIHdoaWxlIHdlJ3JlIHByb2JpbmdcbiAgICAgICAgZnVuY3Rpb24gb25jbG9zZSgpIHtcbiAgICAgICAgICAgIG9uZXJyb3IoXCJzb2NrZXQgY2xvc2VkXCIpO1xuICAgICAgICB9XG4gICAgICAgIC8vIFdoZW4gdGhlIHNvY2tldCBpcyB1cGdyYWRlZCB3aGlsZSB3ZSdyZSBwcm9iaW5nXG4gICAgICAgIGZ1bmN0aW9uIG9udXBncmFkZSh0bykge1xuICAgICAgICAgICAgaWYgKHRyYW5zcG9ydCAmJiB0by5uYW1lICE9PSB0cmFuc3BvcnQubmFtZSkge1xuICAgICAgICAgICAgICAgIGZyZWV6ZVRyYW5zcG9ydCgpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIC8vIFJlbW92ZSBhbGwgbGlzdGVuZXJzIG9uIHRoZSB0cmFuc3BvcnQgYW5kIG9uIHNlbGZcbiAgICAgICAgY29uc3QgY2xlYW51cCA9ICgpID0+IHtcbiAgICAgICAgICAgIHRyYW5zcG9ydC5yZW1vdmVMaXN0ZW5lcihcIm9wZW5cIiwgb25UcmFuc3BvcnRPcGVuKTtcbiAgICAgICAgICAgIHRyYW5zcG9ydC5yZW1vdmVMaXN0ZW5lcihcImVycm9yXCIsIG9uZXJyb3IpO1xuICAgICAgICAgICAgdHJhbnNwb3J0LnJlbW92ZUxpc3RlbmVyKFwiY2xvc2VcIiwgb25UcmFuc3BvcnRDbG9zZSk7XG4gICAgICAgICAgICB0aGlzLm9mZihcImNsb3NlXCIsIG9uY2xvc2UpO1xuICAgICAgICAgICAgdGhpcy5vZmYoXCJ1cGdyYWRpbmdcIiwgb251cGdyYWRlKTtcbiAgICAgICAgfTtcbiAgICAgICAgdHJhbnNwb3J0Lm9uY2UoXCJvcGVuXCIsIG9uVHJhbnNwb3J0T3Blbik7XG4gICAgICAgIHRyYW5zcG9ydC5vbmNlKFwiZXJyb3JcIiwgb25lcnJvcik7XG4gICAgICAgIHRyYW5zcG9ydC5vbmNlKFwiY2xvc2VcIiwgb25UcmFuc3BvcnRDbG9zZSk7XG4gICAgICAgIHRoaXMub25jZShcImNsb3NlXCIsIG9uY2xvc2UpO1xuICAgICAgICB0aGlzLm9uY2UoXCJ1cGdyYWRpbmdcIiwgb251cGdyYWRlKTtcbiAgICAgICAgdHJhbnNwb3J0Lm9wZW4oKTtcbiAgICB9XG4gICAgLyoqXG4gICAgICogQ2FsbGVkIHdoZW4gY29ubmVjdGlvbiBpcyBkZWVtZWQgb3Blbi5cbiAgICAgKlxuICAgICAqIEBhcGkgcHJpdmF0ZVxuICAgICAqL1xuICAgIG9uT3BlbigpIHtcbiAgICAgICAgdGhpcy5yZWFkeVN0YXRlID0gXCJvcGVuXCI7XG4gICAgICAgIFNvY2tldC5wcmlvcldlYnNvY2tldFN1Y2Nlc3MgPSBcIndlYnNvY2tldFwiID09PSB0aGlzLnRyYW5zcG9ydC5uYW1lO1xuICAgICAgICB0aGlzLmVtaXRSZXNlcnZlZChcIm9wZW5cIik7XG4gICAgICAgIHRoaXMuZmx1c2goKTtcbiAgICAgICAgLy8gd2UgY2hlY2sgZm9yIGByZWFkeVN0YXRlYCBpbiBjYXNlIGFuIGBvcGVuYFxuICAgICAgICAvLyBsaXN0ZW5lciBhbHJlYWR5IGNsb3NlZCB0aGUgc29ja2V0XG4gICAgICAgIGlmIChcIm9wZW5cIiA9PT0gdGhpcy5yZWFkeVN0YXRlICYmXG4gICAgICAgICAgICB0aGlzLm9wdHMudXBncmFkZSAmJlxuICAgICAgICAgICAgdGhpcy50cmFuc3BvcnQucGF1c2UpIHtcbiAgICAgICAgICAgIGxldCBpID0gMDtcbiAgICAgICAgICAgIGNvbnN0IGwgPSB0aGlzLnVwZ3JhZGVzLmxlbmd0aDtcbiAgICAgICAgICAgIGZvciAoOyBpIDwgbDsgaSsrKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5wcm9iZSh0aGlzLnVwZ3JhZGVzW2ldKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH1cbiAgICAvKipcbiAgICAgKiBIYW5kbGVzIGEgcGFja2V0LlxuICAgICAqXG4gICAgICogQGFwaSBwcml2YXRlXG4gICAgICovXG4gICAgb25QYWNrZXQocGFja2V0KSB7XG4gICAgICAgIGlmIChcIm9wZW5pbmdcIiA9PT0gdGhpcy5yZWFkeVN0YXRlIHx8XG4gICAgICAgICAgICBcIm9wZW5cIiA9PT0gdGhpcy5yZWFkeVN0YXRlIHx8XG4gICAgICAgICAgICBcImNsb3NpbmdcIiA9PT0gdGhpcy5yZWFkeVN0YXRlKSB7XG4gICAgICAgICAgICB0aGlzLmVtaXRSZXNlcnZlZChcInBhY2tldFwiLCBwYWNrZXQpO1xuICAgICAgICAgICAgLy8gU29ja2V0IGlzIGxpdmUgLSBhbnkgcGFja2V0IGNvdW50c1xuICAgICAgICAgICAgdGhpcy5lbWl0UmVzZXJ2ZWQoXCJoZWFydGJlYXRcIik7XG4gICAgICAgICAgICBzd2l0Y2ggKHBhY2tldC50eXBlKSB7XG4gICAgICAgICAgICAgICAgY2FzZSBcIm9wZW5cIjpcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5vbkhhbmRzaGFrZShKU09OLnBhcnNlKHBhY2tldC5kYXRhKSk7XG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgIGNhc2UgXCJwaW5nXCI6XG4gICAgICAgICAgICAgICAgICAgIHRoaXMucmVzZXRQaW5nVGltZW91dCgpO1xuICAgICAgICAgICAgICAgICAgICB0aGlzLnNlbmRQYWNrZXQoXCJwb25nXCIpO1xuICAgICAgICAgICAgICAgICAgICB0aGlzLmVtaXRSZXNlcnZlZChcInBpbmdcIik7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuZW1pdFJlc2VydmVkKFwicG9uZ1wiKTtcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgY2FzZSBcImVycm9yXCI6XG4gICAgICAgICAgICAgICAgICAgIGNvbnN0IGVyciA9IG5ldyBFcnJvcihcInNlcnZlciBlcnJvclwiKTtcbiAgICAgICAgICAgICAgICAgICAgLy8gQHRzLWlnbm9yZVxuICAgICAgICAgICAgICAgICAgICBlcnIuY29kZSA9IHBhY2tldC5kYXRhO1xuICAgICAgICAgICAgICAgICAgICB0aGlzLm9uRXJyb3IoZXJyKTtcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgY2FzZSBcIm1lc3NhZ2VcIjpcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5lbWl0UmVzZXJ2ZWQoXCJkYXRhXCIsIHBhY2tldC5kYXRhKTtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5lbWl0UmVzZXJ2ZWQoXCJtZXNzYWdlXCIsIHBhY2tldC5kYXRhKTtcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSB7XG4gICAgICAgIH1cbiAgICB9XG4gICAgLyoqXG4gICAgICogQ2FsbGVkIHVwb24gaGFuZHNoYWtlIGNvbXBsZXRpb24uXG4gICAgICpcbiAgICAgKiBAcGFyYW0ge09iamVjdH0gZGF0YSAtIGhhbmRzaGFrZSBvYmpcbiAgICAgKiBAYXBpIHByaXZhdGVcbiAgICAgKi9cbiAgICBvbkhhbmRzaGFrZShkYXRhKSB7XG4gICAgICAgIHRoaXMuZW1pdFJlc2VydmVkKFwiaGFuZHNoYWtlXCIsIGRhdGEpO1xuICAgICAgICB0aGlzLmlkID0gZGF0YS5zaWQ7XG4gICAgICAgIHRoaXMudHJhbnNwb3J0LnF1ZXJ5LnNpZCA9IGRhdGEuc2lkO1xuICAgICAgICB0aGlzLnVwZ3JhZGVzID0gdGhpcy5maWx0ZXJVcGdyYWRlcyhkYXRhLnVwZ3JhZGVzKTtcbiAgICAgICAgdGhpcy5waW5nSW50ZXJ2YWwgPSBkYXRhLnBpbmdJbnRlcnZhbDtcbiAgICAgICAgdGhpcy5waW5nVGltZW91dCA9IGRhdGEucGluZ1RpbWVvdXQ7XG4gICAgICAgIHRoaXMubWF4UGF5bG9hZCA9IGRhdGEubWF4UGF5bG9hZDtcbiAgICAgICAgdGhpcy5vbk9wZW4oKTtcbiAgICAgICAgLy8gSW4gY2FzZSBvcGVuIGhhbmRsZXIgY2xvc2VzIHNvY2tldFxuICAgICAgICBpZiAoXCJjbG9zZWRcIiA9PT0gdGhpcy5yZWFkeVN0YXRlKVxuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB0aGlzLnJlc2V0UGluZ1RpbWVvdXQoKTtcbiAgICB9XG4gICAgLyoqXG4gICAgICogU2V0cyBhbmQgcmVzZXRzIHBpbmcgdGltZW91dCB0aW1lciBiYXNlZCBvbiBzZXJ2ZXIgcGluZ3MuXG4gICAgICpcbiAgICAgKiBAYXBpIHByaXZhdGVcbiAgICAgKi9cbiAgICByZXNldFBpbmdUaW1lb3V0KCkge1xuICAgICAgICB0aGlzLmNsZWFyVGltZW91dEZuKHRoaXMucGluZ1RpbWVvdXRUaW1lcik7XG4gICAgICAgIHRoaXMucGluZ1RpbWVvdXRUaW1lciA9IHRoaXMuc2V0VGltZW91dEZuKCgpID0+IHtcbiAgICAgICAgICAgIHRoaXMub25DbG9zZShcInBpbmcgdGltZW91dFwiKTtcbiAgICAgICAgfSwgdGhpcy5waW5nSW50ZXJ2YWwgKyB0aGlzLnBpbmdUaW1lb3V0KTtcbiAgICAgICAgaWYgKHRoaXMub3B0cy5hdXRvVW5yZWYpIHtcbiAgICAgICAgICAgIHRoaXMucGluZ1RpbWVvdXRUaW1lci51bnJlZigpO1xuICAgICAgICB9XG4gICAgfVxuICAgIC8qKlxuICAgICAqIENhbGxlZCBvbiBgZHJhaW5gIGV2ZW50XG4gICAgICpcbiAgICAgKiBAYXBpIHByaXZhdGVcbiAgICAgKi9cbiAgICBvbkRyYWluKCkge1xuICAgICAgICB0aGlzLndyaXRlQnVmZmVyLnNwbGljZSgwLCB0aGlzLnByZXZCdWZmZXJMZW4pO1xuICAgICAgICAvLyBzZXR0aW5nIHByZXZCdWZmZXJMZW4gPSAwIGlzIHZlcnkgaW1wb3J0YW50XG4gICAgICAgIC8vIGZvciBleGFtcGxlLCB3aGVuIHVwZ3JhZGluZywgdXBncmFkZSBwYWNrZXQgaXMgc2VudCBvdmVyLFxuICAgICAgICAvLyBhbmQgYSBub256ZXJvIHByZXZCdWZmZXJMZW4gY291bGQgY2F1c2UgcHJvYmxlbXMgb24gYGRyYWluYFxuICAgICAgICB0aGlzLnByZXZCdWZmZXJMZW4gPSAwO1xuICAgICAgICBpZiAoMCA9PT0gdGhpcy53cml0ZUJ1ZmZlci5sZW5ndGgpIHtcbiAgICAgICAgICAgIHRoaXMuZW1pdFJlc2VydmVkKFwiZHJhaW5cIik7XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICB0aGlzLmZsdXNoKCk7XG4gICAgICAgIH1cbiAgICB9XG4gICAgLyoqXG4gICAgICogRmx1c2ggd3JpdGUgYnVmZmVycy5cbiAgICAgKlxuICAgICAqIEBhcGkgcHJpdmF0ZVxuICAgICAqL1xuICAgIGZsdXNoKCkge1xuICAgICAgICBpZiAoXCJjbG9zZWRcIiAhPT0gdGhpcy5yZWFkeVN0YXRlICYmXG4gICAgICAgICAgICB0aGlzLnRyYW5zcG9ydC53cml0YWJsZSAmJlxuICAgICAgICAgICAgIXRoaXMudXBncmFkaW5nICYmXG4gICAgICAgICAgICB0aGlzLndyaXRlQnVmZmVyLmxlbmd0aCkge1xuICAgICAgICAgICAgY29uc3QgcGFja2V0cyA9IHRoaXMuZ2V0V3JpdGFibGVQYWNrZXRzKCk7XG4gICAgICAgICAgICB0aGlzLnRyYW5zcG9ydC5zZW5kKHBhY2tldHMpO1xuICAgICAgICAgICAgLy8ga2VlcCB0cmFjayBvZiBjdXJyZW50IGxlbmd0aCBvZiB3cml0ZUJ1ZmZlclxuICAgICAgICAgICAgLy8gc3BsaWNlIHdyaXRlQnVmZmVyIGFuZCBjYWxsYmFja0J1ZmZlciBvbiBgZHJhaW5gXG4gICAgICAgICAgICB0aGlzLnByZXZCdWZmZXJMZW4gPSBwYWNrZXRzLmxlbmd0aDtcbiAgICAgICAgICAgIHRoaXMuZW1pdFJlc2VydmVkKFwiZmx1c2hcIik7XG4gICAgICAgIH1cbiAgICB9XG4gICAgLyoqXG4gICAgICogRW5zdXJlIHRoZSBlbmNvZGVkIHNpemUgb2YgdGhlIHdyaXRlQnVmZmVyIGlzIGJlbG93IHRoZSBtYXhQYXlsb2FkIHZhbHVlIHNlbnQgYnkgdGhlIHNlcnZlciAob25seSBmb3IgSFRUUFxuICAgICAqIGxvbmctcG9sbGluZylcbiAgICAgKlxuICAgICAqIEBwcml2YXRlXG4gICAgICovXG4gICAgZ2V0V3JpdGFibGVQYWNrZXRzKCkge1xuICAgICAgICBjb25zdCBzaG91bGRDaGVja1BheWxvYWRTaXplID0gdGhpcy5tYXhQYXlsb2FkICYmXG4gICAgICAgICAgICB0aGlzLnRyYW5zcG9ydC5uYW1lID09PSBcInBvbGxpbmdcIiAmJlxuICAgICAgICAgICAgdGhpcy53cml0ZUJ1ZmZlci5sZW5ndGggPiAxO1xuICAgICAgICBpZiAoIXNob3VsZENoZWNrUGF5bG9hZFNpemUpIHtcbiAgICAgICAgICAgIHJldHVybiB0aGlzLndyaXRlQnVmZmVyO1xuICAgICAgICB9XG4gICAgICAgIGxldCBwYXlsb2FkU2l6ZSA9IDE7IC8vIGZpcnN0IHBhY2tldCB0eXBlXG4gICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgdGhpcy53cml0ZUJ1ZmZlci5sZW5ndGg7IGkrKykge1xuICAgICAgICAgICAgY29uc3QgZGF0YSA9IHRoaXMud3JpdGVCdWZmZXJbaV0uZGF0YTtcbiAgICAgICAgICAgIGlmIChkYXRhKSB7XG4gICAgICAgICAgICAgICAgcGF5bG9hZFNpemUgKz0gYnl0ZUxlbmd0aChkYXRhKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGlmIChpID4gMCAmJiBwYXlsb2FkU2l6ZSA+IHRoaXMubWF4UGF5bG9hZCkge1xuICAgICAgICAgICAgICAgIHJldHVybiB0aGlzLndyaXRlQnVmZmVyLnNsaWNlKDAsIGkpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgcGF5bG9hZFNpemUgKz0gMjsgLy8gc2VwYXJhdG9yICsgcGFja2V0IHR5cGVcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gdGhpcy53cml0ZUJ1ZmZlcjtcbiAgICB9XG4gICAgLyoqXG4gICAgICogU2VuZHMgYSBtZXNzYWdlLlxuICAgICAqXG4gICAgICogQHBhcmFtIHtTdHJpbmd9IG1lc3NhZ2UuXG4gICAgICogQHBhcmFtIHtGdW5jdGlvbn0gY2FsbGJhY2sgZnVuY3Rpb24uXG4gICAgICogQHBhcmFtIHtPYmplY3R9IG9wdGlvbnMuXG4gICAgICogQHJldHVybiB7U29ja2V0fSBmb3IgY2hhaW5pbmcuXG4gICAgICogQGFwaSBwdWJsaWNcbiAgICAgKi9cbiAgICB3cml0ZShtc2csIG9wdGlvbnMsIGZuKSB7XG4gICAgICAgIHRoaXMuc2VuZFBhY2tldChcIm1lc3NhZ2VcIiwgbXNnLCBvcHRpb25zLCBmbik7XG4gICAgICAgIHJldHVybiB0aGlzO1xuICAgIH1cbiAgICBzZW5kKG1zZywgb3B0aW9ucywgZm4pIHtcbiAgICAgICAgdGhpcy5zZW5kUGFja2V0KFwibWVzc2FnZVwiLCBtc2csIG9wdGlvbnMsIGZuKTtcbiAgICAgICAgcmV0dXJuIHRoaXM7XG4gICAgfVxuICAgIC8qKlxuICAgICAqIFNlbmRzIGEgcGFja2V0LlxuICAgICAqXG4gICAgICogQHBhcmFtIHtTdHJpbmd9IHBhY2tldCB0eXBlLlxuICAgICAqIEBwYXJhbSB7U3RyaW5nfSBkYXRhLlxuICAgICAqIEBwYXJhbSB7T2JqZWN0fSBvcHRpb25zLlxuICAgICAqIEBwYXJhbSB7RnVuY3Rpb259IGNhbGxiYWNrIGZ1bmN0aW9uLlxuICAgICAqIEBhcGkgcHJpdmF0ZVxuICAgICAqL1xuICAgIHNlbmRQYWNrZXQodHlwZSwgZGF0YSwgb3B0aW9ucywgZm4pIHtcbiAgICAgICAgaWYgKFwiZnVuY3Rpb25cIiA9PT0gdHlwZW9mIGRhdGEpIHtcbiAgICAgICAgICAgIGZuID0gZGF0YTtcbiAgICAgICAgICAgIGRhdGEgPSB1bmRlZmluZWQ7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKFwiZnVuY3Rpb25cIiA9PT0gdHlwZW9mIG9wdGlvbnMpIHtcbiAgICAgICAgICAgIGZuID0gb3B0aW9ucztcbiAgICAgICAgICAgIG9wdGlvbnMgPSBudWxsO1xuICAgICAgICB9XG4gICAgICAgIGlmIChcImNsb3NpbmdcIiA9PT0gdGhpcy5yZWFkeVN0YXRlIHx8IFwiY2xvc2VkXCIgPT09IHRoaXMucmVhZHlTdGF0ZSkge1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG4gICAgICAgIG9wdGlvbnMgPSBvcHRpb25zIHx8IHt9O1xuICAgICAgICBvcHRpb25zLmNvbXByZXNzID0gZmFsc2UgIT09IG9wdGlvbnMuY29tcHJlc3M7XG4gICAgICAgIGNvbnN0IHBhY2tldCA9IHtcbiAgICAgICAgICAgIHR5cGU6IHR5cGUsXG4gICAgICAgICAgICBkYXRhOiBkYXRhLFxuICAgICAgICAgICAgb3B0aW9uczogb3B0aW9uc1xuICAgICAgICB9O1xuICAgICAgICB0aGlzLmVtaXRSZXNlcnZlZChcInBhY2tldENyZWF0ZVwiLCBwYWNrZXQpO1xuICAgICAgICB0aGlzLndyaXRlQnVmZmVyLnB1c2gocGFja2V0KTtcbiAgICAgICAgaWYgKGZuKVxuICAgICAgICAgICAgdGhpcy5vbmNlKFwiZmx1c2hcIiwgZm4pO1xuICAgICAgICB0aGlzLmZsdXNoKCk7XG4gICAgfVxuICAgIC8qKlxuICAgICAqIENsb3NlcyB0aGUgY29ubmVjdGlvbi5cbiAgICAgKlxuICAgICAqIEBhcGkgcHVibGljXG4gICAgICovXG4gICAgY2xvc2UoKSB7XG4gICAgICAgIGNvbnN0IGNsb3NlID0gKCkgPT4ge1xuICAgICAgICAgICAgdGhpcy5vbkNsb3NlKFwiZm9yY2VkIGNsb3NlXCIpO1xuICAgICAgICAgICAgdGhpcy50cmFuc3BvcnQuY2xvc2UoKTtcbiAgICAgICAgfTtcbiAgICAgICAgY29uc3QgY2xlYW51cEFuZENsb3NlID0gKCkgPT4ge1xuICAgICAgICAgICAgdGhpcy5vZmYoXCJ1cGdyYWRlXCIsIGNsZWFudXBBbmRDbG9zZSk7XG4gICAgICAgICAgICB0aGlzLm9mZihcInVwZ3JhZGVFcnJvclwiLCBjbGVhbnVwQW5kQ2xvc2UpO1xuICAgICAgICAgICAgY2xvc2UoKTtcbiAgICAgICAgfTtcbiAgICAgICAgY29uc3Qgd2FpdEZvclVwZ3JhZGUgPSAoKSA9PiB7XG4gICAgICAgICAgICAvLyB3YWl0IGZvciB1cGdyYWRlIHRvIGZpbmlzaCBzaW5jZSB3ZSBjYW4ndCBzZW5kIHBhY2tldHMgd2hpbGUgcGF1c2luZyBhIHRyYW5zcG9ydFxuICAgICAgICAgICAgdGhpcy5vbmNlKFwidXBncmFkZVwiLCBjbGVhbnVwQW5kQ2xvc2UpO1xuICAgICAgICAgICAgdGhpcy5vbmNlKFwidXBncmFkZUVycm9yXCIsIGNsZWFudXBBbmRDbG9zZSk7XG4gICAgICAgIH07XG4gICAgICAgIGlmIChcIm9wZW5pbmdcIiA9PT0gdGhpcy5yZWFkeVN0YXRlIHx8IFwib3BlblwiID09PSB0aGlzLnJlYWR5U3RhdGUpIHtcbiAgICAgICAgICAgIHRoaXMucmVhZHlTdGF0ZSA9IFwiY2xvc2luZ1wiO1xuICAgICAgICAgICAgaWYgKHRoaXMud3JpdGVCdWZmZXIubGVuZ3RoKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5vbmNlKFwiZHJhaW5cIiwgKCkgPT4ge1xuICAgICAgICAgICAgICAgICAgICBpZiAodGhpcy51cGdyYWRpbmcpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHdhaXRGb3JVcGdyYWRlKCk7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBjbG9zZSgpO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBlbHNlIGlmICh0aGlzLnVwZ3JhZGluZykge1xuICAgICAgICAgICAgICAgIHdhaXRGb3JVcGdyYWRlKCk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgICBjbG9zZSgpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIHJldHVybiB0aGlzO1xuICAgIH1cbiAgICAvKipcbiAgICAgKiBDYWxsZWQgdXBvbiB0cmFuc3BvcnQgZXJyb3JcbiAgICAgKlxuICAgICAqIEBhcGkgcHJpdmF0ZVxuICAgICAqL1xuICAgIG9uRXJyb3IoZXJyKSB7XG4gICAgICAgIFNvY2tldC5wcmlvcldlYnNvY2tldFN1Y2Nlc3MgPSBmYWxzZTtcbiAgICAgICAgdGhpcy5lbWl0UmVzZXJ2ZWQoXCJlcnJvclwiLCBlcnIpO1xuICAgICAgICB0aGlzLm9uQ2xvc2UoXCJ0cmFuc3BvcnQgZXJyb3JcIiwgZXJyKTtcbiAgICB9XG4gICAgLyoqXG4gICAgICogQ2FsbGVkIHVwb24gdHJhbnNwb3J0IGNsb3NlLlxuICAgICAqXG4gICAgICogQGFwaSBwcml2YXRlXG4gICAgICovXG4gICAgb25DbG9zZShyZWFzb24sIGRlc2NyaXB0aW9uKSB7XG4gICAgICAgIGlmIChcIm9wZW5pbmdcIiA9PT0gdGhpcy5yZWFkeVN0YXRlIHx8XG4gICAgICAgICAgICBcIm9wZW5cIiA9PT0gdGhpcy5yZWFkeVN0YXRlIHx8XG4gICAgICAgICAgICBcImNsb3NpbmdcIiA9PT0gdGhpcy5yZWFkeVN0YXRlKSB7XG4gICAgICAgICAgICAvLyBjbGVhciB0aW1lcnNcbiAgICAgICAgICAgIHRoaXMuY2xlYXJUaW1lb3V0Rm4odGhpcy5waW5nVGltZW91dFRpbWVyKTtcbiAgICAgICAgICAgIC8vIHN0b3AgZXZlbnQgZnJvbSBmaXJpbmcgYWdhaW4gZm9yIHRyYW5zcG9ydFxuICAgICAgICAgICAgdGhpcy50cmFuc3BvcnQucmVtb3ZlQWxsTGlzdGVuZXJzKFwiY2xvc2VcIik7XG4gICAgICAgICAgICAvLyBlbnN1cmUgdHJhbnNwb3J0IHdvbid0IHN0YXkgb3BlblxuICAgICAgICAgICAgdGhpcy50cmFuc3BvcnQuY2xvc2UoKTtcbiAgICAgICAgICAgIC8vIGlnbm9yZSBmdXJ0aGVyIHRyYW5zcG9ydCBjb21tdW5pY2F0aW9uXG4gICAgICAgICAgICB0aGlzLnRyYW5zcG9ydC5yZW1vdmVBbGxMaXN0ZW5lcnMoKTtcbiAgICAgICAgICAgIGlmICh0eXBlb2YgcmVtb3ZlRXZlbnRMaXN0ZW5lciA9PT0gXCJmdW5jdGlvblwiKSB7XG4gICAgICAgICAgICAgICAgcmVtb3ZlRXZlbnRMaXN0ZW5lcihcIm9mZmxpbmVcIiwgdGhpcy5vZmZsaW5lRXZlbnRMaXN0ZW5lciwgZmFsc2UpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgLy8gc2V0IHJlYWR5IHN0YXRlXG4gICAgICAgICAgICB0aGlzLnJlYWR5U3RhdGUgPSBcImNsb3NlZFwiO1xuICAgICAgICAgICAgLy8gY2xlYXIgc2Vzc2lvbiBpZFxuICAgICAgICAgICAgdGhpcy5pZCA9IG51bGw7XG4gICAgICAgICAgICAvLyBlbWl0IGNsb3NlIGV2ZW50XG4gICAgICAgICAgICB0aGlzLmVtaXRSZXNlcnZlZChcImNsb3NlXCIsIHJlYXNvbiwgZGVzY3JpcHRpb24pO1xuICAgICAgICAgICAgLy8gY2xlYW4gYnVmZmVycyBhZnRlciwgc28gdXNlcnMgY2FuIHN0aWxsXG4gICAgICAgICAgICAvLyBncmFiIHRoZSBidWZmZXJzIG9uIGBjbG9zZWAgZXZlbnRcbiAgICAgICAgICAgIHRoaXMud3JpdGVCdWZmZXIgPSBbXTtcbiAgICAgICAgICAgIHRoaXMucHJldkJ1ZmZlckxlbiA9IDA7XG4gICAgICAgIH1cbiAgICB9XG4gICAgLyoqXG4gICAgICogRmlsdGVycyB1cGdyYWRlcywgcmV0dXJuaW5nIG9ubHkgdGhvc2UgbWF0Y2hpbmcgY2xpZW50IHRyYW5zcG9ydHMuXG4gICAgICpcbiAgICAgKiBAcGFyYW0ge0FycmF5fSBzZXJ2ZXIgdXBncmFkZXNcbiAgICAgKiBAYXBpIHByaXZhdGVcbiAgICAgKlxuICAgICAqL1xuICAgIGZpbHRlclVwZ3JhZGVzKHVwZ3JhZGVzKSB7XG4gICAgICAgIGNvbnN0IGZpbHRlcmVkVXBncmFkZXMgPSBbXTtcbiAgICAgICAgbGV0IGkgPSAwO1xuICAgICAgICBjb25zdCBqID0gdXBncmFkZXMubGVuZ3RoO1xuICAgICAgICBmb3IgKDsgaSA8IGo7IGkrKykge1xuICAgICAgICAgICAgaWYgKH50aGlzLnRyYW5zcG9ydHMuaW5kZXhPZih1cGdyYWRlc1tpXSkpXG4gICAgICAgICAgICAgICAgZmlsdGVyZWRVcGdyYWRlcy5wdXNoKHVwZ3JhZGVzW2ldKTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gZmlsdGVyZWRVcGdyYWRlcztcbiAgICB9XG59XG5Tb2NrZXQucHJvdG9jb2wgPSBwcm90b2NvbDtcbiIsICJpbXBvcnQgeyBTb2NrZXQgfSBmcm9tIFwiLi9zb2NrZXQuanNcIjtcbmV4cG9ydCB7IFNvY2tldCB9O1xuZXhwb3J0IGNvbnN0IHByb3RvY29sID0gU29ja2V0LnByb3RvY29sO1xuZXhwb3J0IHsgVHJhbnNwb3J0IH0gZnJvbSBcIi4vdHJhbnNwb3J0LmpzXCI7XG5leHBvcnQgeyB0cmFuc3BvcnRzIH0gZnJvbSBcIi4vdHJhbnNwb3J0cy9pbmRleC5qc1wiO1xuZXhwb3J0IHsgaW5zdGFsbFRpbWVyRnVuY3Rpb25zIH0gZnJvbSBcIi4vdXRpbC5qc1wiO1xuZXhwb3J0IHsgcGFyc2UgfSBmcm9tIFwiLi9jb250cmliL3BhcnNldXJpLmpzXCI7XG4iLCAiaW1wb3J0IHsgcGFyc2UgfSBmcm9tIFwiZW5naW5lLmlvLWNsaWVudFwiO1xuLyoqXG4gKiBVUkwgcGFyc2VyLlxuICpcbiAqIEBwYXJhbSB1cmkgLSB1cmxcbiAqIEBwYXJhbSBwYXRoIC0gdGhlIHJlcXVlc3QgcGF0aCBvZiB0aGUgY29ubmVjdGlvblxuICogQHBhcmFtIGxvYyAtIEFuIG9iamVjdCBtZWFudCB0byBtaW1pYyB3aW5kb3cubG9jYXRpb24uXG4gKiAgICAgICAgRGVmYXVsdHMgdG8gd2luZG93LmxvY2F0aW9uLlxuICogQHB1YmxpY1xuICovXG5leHBvcnQgZnVuY3Rpb24gdXJsKHVyaSwgcGF0aCA9IFwiXCIsIGxvYykge1xuICAgIGxldCBvYmogPSB1cmk7XG4gICAgLy8gZGVmYXVsdCB0byB3aW5kb3cubG9jYXRpb25cbiAgICBsb2MgPSBsb2MgfHwgKHR5cGVvZiBsb2NhdGlvbiAhPT0gXCJ1bmRlZmluZWRcIiAmJiBsb2NhdGlvbik7XG4gICAgaWYgKG51bGwgPT0gdXJpKVxuICAgICAgICB1cmkgPSBsb2MucHJvdG9jb2wgKyBcIi8vXCIgKyBsb2MuaG9zdDtcbiAgICAvLyByZWxhdGl2ZSBwYXRoIHN1cHBvcnRcbiAgICBpZiAodHlwZW9mIHVyaSA9PT0gXCJzdHJpbmdcIikge1xuICAgICAgICBpZiAoXCIvXCIgPT09IHVyaS5jaGFyQXQoMCkpIHtcbiAgICAgICAgICAgIGlmIChcIi9cIiA9PT0gdXJpLmNoYXJBdCgxKSkge1xuICAgICAgICAgICAgICAgIHVyaSA9IGxvYy5wcm90b2NvbCArIHVyaTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgICAgIHVyaSA9IGxvYy5ob3N0ICsgdXJpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIGlmICghL14oaHR0cHM/fHdzcz8pOlxcL1xcLy8udGVzdCh1cmkpKSB7XG4gICAgICAgICAgICBpZiAoXCJ1bmRlZmluZWRcIiAhPT0gdHlwZW9mIGxvYykge1xuICAgICAgICAgICAgICAgIHVyaSA9IGxvYy5wcm90b2NvbCArIFwiLy9cIiArIHVyaTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgICAgIHVyaSA9IFwiaHR0cHM6Ly9cIiArIHVyaTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICAvLyBwYXJzZVxuICAgICAgICBvYmogPSBwYXJzZSh1cmkpO1xuICAgIH1cbiAgICAvLyBtYWtlIHN1cmUgd2UgdHJlYXQgYGxvY2FsaG9zdDo4MGAgYW5kIGBsb2NhbGhvc3RgIGVxdWFsbHlcbiAgICBpZiAoIW9iai5wb3J0KSB7XG4gICAgICAgIGlmICgvXihodHRwfHdzKSQvLnRlc3Qob2JqLnByb3RvY29sKSkge1xuICAgICAgICAgICAgb2JqLnBvcnQgPSBcIjgwXCI7XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSBpZiAoL14oaHR0cHx3cylzJC8udGVzdChvYmoucHJvdG9jb2wpKSB7XG4gICAgICAgICAgICBvYmoucG9ydCA9IFwiNDQzXCI7XG4gICAgICAgIH1cbiAgICB9XG4gICAgb2JqLnBhdGggPSBvYmoucGF0aCB8fCBcIi9cIjtcbiAgICBjb25zdCBpcHY2ID0gb2JqLmhvc3QuaW5kZXhPZihcIjpcIikgIT09IC0xO1xuICAgIGNvbnN0IGhvc3QgPSBpcHY2ID8gXCJbXCIgKyBvYmouaG9zdCArIFwiXVwiIDogb2JqLmhvc3Q7XG4gICAgLy8gZGVmaW5lIHVuaXF1ZSBpZFxuICAgIG9iai5pZCA9IG9iai5wcm90b2NvbCArIFwiOi8vXCIgKyBob3N0ICsgXCI6XCIgKyBvYmoucG9ydCArIHBhdGg7XG4gICAgLy8gZGVmaW5lIGhyZWZcbiAgICBvYmouaHJlZiA9XG4gICAgICAgIG9iai5wcm90b2NvbCArXG4gICAgICAgICAgICBcIjovL1wiICtcbiAgICAgICAgICAgIGhvc3QgK1xuICAgICAgICAgICAgKGxvYyAmJiBsb2MucG9ydCA9PT0gb2JqLnBvcnQgPyBcIlwiIDogXCI6XCIgKyBvYmoucG9ydCk7XG4gICAgcmV0dXJuIG9iajtcbn1cbiIsICJpbXBvcnQgeyBFbWl0dGVyIH0gZnJvbSBcIkBzb2NrZXQuaW8vY29tcG9uZW50LWVtaXR0ZXJcIjtcbmltcG9ydCB7IGRlY29uc3RydWN0UGFja2V0LCByZWNvbnN0cnVjdFBhY2tldCB9IGZyb20gXCIuL2JpbmFyeS5qc1wiO1xuaW1wb3J0IHsgaXNCaW5hcnksIGhhc0JpbmFyeSB9IGZyb20gXCIuL2lzLWJpbmFyeS5qc1wiO1xuLyoqXG4gKiBQcm90b2NvbCB2ZXJzaW9uLlxuICpcbiAqIEBwdWJsaWNcbiAqL1xuZXhwb3J0IGNvbnN0IHByb3RvY29sID0gNTtcbmV4cG9ydCB2YXIgUGFja2V0VHlwZTtcbihmdW5jdGlvbiAoUGFja2V0VHlwZSkge1xuICAgIFBhY2tldFR5cGVbUGFja2V0VHlwZVtcIkNPTk5FQ1RcIl0gPSAwXSA9IFwiQ09OTkVDVFwiO1xuICAgIFBhY2tldFR5cGVbUGFja2V0VHlwZVtcIkRJU0NPTk5FQ1RcIl0gPSAxXSA9IFwiRElTQ09OTkVDVFwiO1xuICAgIFBhY2tldFR5cGVbUGFja2V0VHlwZVtcIkVWRU5UXCJdID0gMl0gPSBcIkVWRU5UXCI7XG4gICAgUGFja2V0VHlwZVtQYWNrZXRUeXBlW1wiQUNLXCJdID0gM10gPSBcIkFDS1wiO1xuICAgIFBhY2tldFR5cGVbUGFja2V0VHlwZVtcIkNPTk5FQ1RfRVJST1JcIl0gPSA0XSA9IFwiQ09OTkVDVF9FUlJPUlwiO1xuICAgIFBhY2tldFR5cGVbUGFja2V0VHlwZVtcIkJJTkFSWV9FVkVOVFwiXSA9IDVdID0gXCJCSU5BUllfRVZFTlRcIjtcbiAgICBQYWNrZXRUeXBlW1BhY2tldFR5cGVbXCJCSU5BUllfQUNLXCJdID0gNl0gPSBcIkJJTkFSWV9BQ0tcIjtcbn0pKFBhY2tldFR5cGUgfHwgKFBhY2tldFR5cGUgPSB7fSkpO1xuLyoqXG4gKiBBIHNvY2tldC5pbyBFbmNvZGVyIGluc3RhbmNlXG4gKi9cbmV4cG9ydCBjbGFzcyBFbmNvZGVyIHtcbiAgICAvKipcbiAgICAgKiBFbmNvZGVyIGNvbnN0cnVjdG9yXG4gICAgICpcbiAgICAgKiBAcGFyYW0ge2Z1bmN0aW9ufSByZXBsYWNlciAtIGN1c3RvbSByZXBsYWNlciB0byBwYXNzIGRvd24gdG8gSlNPTi5wYXJzZVxuICAgICAqL1xuICAgIGNvbnN0cnVjdG9yKHJlcGxhY2VyKSB7XG4gICAgICAgIHRoaXMucmVwbGFjZXIgPSByZXBsYWNlcjtcbiAgICB9XG4gICAgLyoqXG4gICAgICogRW5jb2RlIGEgcGFja2V0IGFzIGEgc2luZ2xlIHN0cmluZyBpZiBub24tYmluYXJ5LCBvciBhcyBhXG4gICAgICogYnVmZmVyIHNlcXVlbmNlLCBkZXBlbmRpbmcgb24gcGFja2V0IHR5cGUuXG4gICAgICpcbiAgICAgKiBAcGFyYW0ge09iamVjdH0gb2JqIC0gcGFja2V0IG9iamVjdFxuICAgICAqL1xuICAgIGVuY29kZShvYmopIHtcbiAgICAgICAgaWYgKG9iai50eXBlID09PSBQYWNrZXRUeXBlLkVWRU5UIHx8IG9iai50eXBlID09PSBQYWNrZXRUeXBlLkFDSykge1xuICAgICAgICAgICAgaWYgKGhhc0JpbmFyeShvYmopKSB7XG4gICAgICAgICAgICAgICAgb2JqLnR5cGUgPVxuICAgICAgICAgICAgICAgICAgICBvYmoudHlwZSA9PT0gUGFja2V0VHlwZS5FVkVOVFxuICAgICAgICAgICAgICAgICAgICAgICAgPyBQYWNrZXRUeXBlLkJJTkFSWV9FVkVOVFxuICAgICAgICAgICAgICAgICAgICAgICAgOiBQYWNrZXRUeXBlLkJJTkFSWV9BQ0s7XG4gICAgICAgICAgICAgICAgcmV0dXJuIHRoaXMuZW5jb2RlQXNCaW5hcnkob2JqKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gW3RoaXMuZW5jb2RlQXNTdHJpbmcob2JqKV07XG4gICAgfVxuICAgIC8qKlxuICAgICAqIEVuY29kZSBwYWNrZXQgYXMgc3RyaW5nLlxuICAgICAqL1xuICAgIGVuY29kZUFzU3RyaW5nKG9iaikge1xuICAgICAgICAvLyBmaXJzdCBpcyB0eXBlXG4gICAgICAgIGxldCBzdHIgPSBcIlwiICsgb2JqLnR5cGU7XG4gICAgICAgIC8vIGF0dGFjaG1lbnRzIGlmIHdlIGhhdmUgdGhlbVxuICAgICAgICBpZiAob2JqLnR5cGUgPT09IFBhY2tldFR5cGUuQklOQVJZX0VWRU5UIHx8XG4gICAgICAgICAgICBvYmoudHlwZSA9PT0gUGFja2V0VHlwZS5CSU5BUllfQUNLKSB7XG4gICAgICAgICAgICBzdHIgKz0gb2JqLmF0dGFjaG1lbnRzICsgXCItXCI7XG4gICAgICAgIH1cbiAgICAgICAgLy8gaWYgd2UgaGF2ZSBhIG5hbWVzcGFjZSBvdGhlciB0aGFuIGAvYFxuICAgICAgICAvLyB3ZSBhcHBlbmQgaXQgZm9sbG93ZWQgYnkgYSBjb21tYSBgLGBcbiAgICAgICAgaWYgKG9iai5uc3AgJiYgXCIvXCIgIT09IG9iai5uc3ApIHtcbiAgICAgICAgICAgIHN0ciArPSBvYmoubnNwICsgXCIsXCI7XG4gICAgICAgIH1cbiAgICAgICAgLy8gaW1tZWRpYXRlbHkgZm9sbG93ZWQgYnkgdGhlIGlkXG4gICAgICAgIGlmIChudWxsICE9IG9iai5pZCkge1xuICAgICAgICAgICAgc3RyICs9IG9iai5pZDtcbiAgICAgICAgfVxuICAgICAgICAvLyBqc29uIGRhdGFcbiAgICAgICAgaWYgKG51bGwgIT0gb2JqLmRhdGEpIHtcbiAgICAgICAgICAgIHN0ciArPSBKU09OLnN0cmluZ2lmeShvYmouZGF0YSwgdGhpcy5yZXBsYWNlcik7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIHN0cjtcbiAgICB9XG4gICAgLyoqXG4gICAgICogRW5jb2RlIHBhY2tldCBhcyAnYnVmZmVyIHNlcXVlbmNlJyBieSByZW1vdmluZyBibG9icywgYW5kXG4gICAgICogZGVjb25zdHJ1Y3RpbmcgcGFja2V0IGludG8gb2JqZWN0IHdpdGggcGxhY2Vob2xkZXJzIGFuZFxuICAgICAqIGEgbGlzdCBvZiBidWZmZXJzLlxuICAgICAqL1xuICAgIGVuY29kZUFzQmluYXJ5KG9iaikge1xuICAgICAgICBjb25zdCBkZWNvbnN0cnVjdGlvbiA9IGRlY29uc3RydWN0UGFja2V0KG9iaik7XG4gICAgICAgIGNvbnN0IHBhY2sgPSB0aGlzLmVuY29kZUFzU3RyaW5nKGRlY29uc3RydWN0aW9uLnBhY2tldCk7XG4gICAgICAgIGNvbnN0IGJ1ZmZlcnMgPSBkZWNvbnN0cnVjdGlvbi5idWZmZXJzO1xuICAgICAgICBidWZmZXJzLnVuc2hpZnQocGFjayk7IC8vIGFkZCBwYWNrZXQgaW5mbyB0byBiZWdpbm5pbmcgb2YgZGF0YSBsaXN0XG4gICAgICAgIHJldHVybiBidWZmZXJzOyAvLyB3cml0ZSBhbGwgdGhlIGJ1ZmZlcnNcbiAgICB9XG59XG4vKipcbiAqIEEgc29ja2V0LmlvIERlY29kZXIgaW5zdGFuY2VcbiAqXG4gKiBAcmV0dXJuIHtPYmplY3R9IGRlY29kZXJcbiAqL1xuZXhwb3J0IGNsYXNzIERlY29kZXIgZXh0ZW5kcyBFbWl0dGVyIHtcbiAgICAvKipcbiAgICAgKiBEZWNvZGVyIGNvbnN0cnVjdG9yXG4gICAgICpcbiAgICAgKiBAcGFyYW0ge2Z1bmN0aW9ufSByZXZpdmVyIC0gY3VzdG9tIHJldml2ZXIgdG8gcGFzcyBkb3duIHRvIEpTT04uc3RyaW5naWZ5XG4gICAgICovXG4gICAgY29uc3RydWN0b3IocmV2aXZlcikge1xuICAgICAgICBzdXBlcigpO1xuICAgICAgICB0aGlzLnJldml2ZXIgPSByZXZpdmVyO1xuICAgIH1cbiAgICAvKipcbiAgICAgKiBEZWNvZGVzIGFuIGVuY29kZWQgcGFja2V0IHN0cmluZyBpbnRvIHBhY2tldCBKU09OLlxuICAgICAqXG4gICAgICogQHBhcmFtIHtTdHJpbmd9IG9iaiAtIGVuY29kZWQgcGFja2V0XG4gICAgICovXG4gICAgYWRkKG9iaikge1xuICAgICAgICBsZXQgcGFja2V0O1xuICAgICAgICBpZiAodHlwZW9mIG9iaiA9PT0gXCJzdHJpbmdcIikge1xuICAgICAgICAgICAgaWYgKHRoaXMucmVjb25zdHJ1Y3Rvcikge1xuICAgICAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcihcImdvdCBwbGFpbnRleHQgZGF0YSB3aGVuIHJlY29uc3RydWN0aW5nIGEgcGFja2V0XCIpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgcGFja2V0ID0gdGhpcy5kZWNvZGVTdHJpbmcob2JqKTtcbiAgICAgICAgICAgIGlmIChwYWNrZXQudHlwZSA9PT0gUGFja2V0VHlwZS5CSU5BUllfRVZFTlQgfHxcbiAgICAgICAgICAgICAgICBwYWNrZXQudHlwZSA9PT0gUGFja2V0VHlwZS5CSU5BUllfQUNLKSB7XG4gICAgICAgICAgICAgICAgLy8gYmluYXJ5IHBhY2tldCdzIGpzb25cbiAgICAgICAgICAgICAgICB0aGlzLnJlY29uc3RydWN0b3IgPSBuZXcgQmluYXJ5UmVjb25zdHJ1Y3RvcihwYWNrZXQpO1xuICAgICAgICAgICAgICAgIC8vIG5vIGF0dGFjaG1lbnRzLCBsYWJlbGVkIGJpbmFyeSBidXQgbm8gYmluYXJ5IGRhdGEgdG8gZm9sbG93XG4gICAgICAgICAgICAgICAgaWYgKHBhY2tldC5hdHRhY2htZW50cyA9PT0gMCkge1xuICAgICAgICAgICAgICAgICAgICBzdXBlci5lbWl0UmVzZXJ2ZWQoXCJkZWNvZGVkXCIsIHBhY2tldCk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAgICAgLy8gbm9uLWJpbmFyeSBmdWxsIHBhY2tldFxuICAgICAgICAgICAgICAgIHN1cGVyLmVtaXRSZXNlcnZlZChcImRlY29kZWRcIiwgcGFja2V0KTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICBlbHNlIGlmIChpc0JpbmFyeShvYmopIHx8IG9iai5iYXNlNjQpIHtcbiAgICAgICAgICAgIC8vIHJhdyBiaW5hcnkgZGF0YVxuICAgICAgICAgICAgaWYgKCF0aGlzLnJlY29uc3RydWN0b3IpIHtcbiAgICAgICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoXCJnb3QgYmluYXJ5IGRhdGEgd2hlbiBub3QgcmVjb25zdHJ1Y3RpbmcgYSBwYWNrZXRcIik7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgICBwYWNrZXQgPSB0aGlzLnJlY29uc3RydWN0b3IudGFrZUJpbmFyeURhdGEob2JqKTtcbiAgICAgICAgICAgICAgICBpZiAocGFja2V0KSB7XG4gICAgICAgICAgICAgICAgICAgIC8vIHJlY2VpdmVkIGZpbmFsIGJ1ZmZlclxuICAgICAgICAgICAgICAgICAgICB0aGlzLnJlY29uc3RydWN0b3IgPSBudWxsO1xuICAgICAgICAgICAgICAgICAgICBzdXBlci5lbWl0UmVzZXJ2ZWQoXCJkZWNvZGVkXCIsIHBhY2tldCk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKFwiVW5rbm93biB0eXBlOiBcIiArIG9iaik7XG4gICAgICAgIH1cbiAgICB9XG4gICAgLyoqXG4gICAgICogRGVjb2RlIGEgcGFja2V0IFN0cmluZyAoSlNPTiBkYXRhKVxuICAgICAqXG4gICAgICogQHBhcmFtIHtTdHJpbmd9IHN0clxuICAgICAqIEByZXR1cm4ge09iamVjdH0gcGFja2V0XG4gICAgICovXG4gICAgZGVjb2RlU3RyaW5nKHN0cikge1xuICAgICAgICBsZXQgaSA9IDA7XG4gICAgICAgIC8vIGxvb2sgdXAgdHlwZVxuICAgICAgICBjb25zdCBwID0ge1xuICAgICAgICAgICAgdHlwZTogTnVtYmVyKHN0ci5jaGFyQXQoMCkpLFxuICAgICAgICB9O1xuICAgICAgICBpZiAoUGFja2V0VHlwZVtwLnR5cGVdID09PSB1bmRlZmluZWQpIHtcbiAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcihcInVua25vd24gcGFja2V0IHR5cGUgXCIgKyBwLnR5cGUpO1xuICAgICAgICB9XG4gICAgICAgIC8vIGxvb2sgdXAgYXR0YWNobWVudHMgaWYgdHlwZSBiaW5hcnlcbiAgICAgICAgaWYgKHAudHlwZSA9PT0gUGFja2V0VHlwZS5CSU5BUllfRVZFTlQgfHxcbiAgICAgICAgICAgIHAudHlwZSA9PT0gUGFja2V0VHlwZS5CSU5BUllfQUNLKSB7XG4gICAgICAgICAgICBjb25zdCBzdGFydCA9IGkgKyAxO1xuICAgICAgICAgICAgd2hpbGUgKHN0ci5jaGFyQXQoKytpKSAhPT0gXCItXCIgJiYgaSAhPSBzdHIubGVuZ3RoKSB7IH1cbiAgICAgICAgICAgIGNvbnN0IGJ1ZiA9IHN0ci5zdWJzdHJpbmcoc3RhcnQsIGkpO1xuICAgICAgICAgICAgaWYgKGJ1ZiAhPSBOdW1iZXIoYnVmKSB8fCBzdHIuY2hhckF0KGkpICE9PSBcIi1cIikge1xuICAgICAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcihcIklsbGVnYWwgYXR0YWNobWVudHNcIik7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBwLmF0dGFjaG1lbnRzID0gTnVtYmVyKGJ1Zik7XG4gICAgICAgIH1cbiAgICAgICAgLy8gbG9vayB1cCBuYW1lc3BhY2UgKGlmIGFueSlcbiAgICAgICAgaWYgKFwiL1wiID09PSBzdHIuY2hhckF0KGkgKyAxKSkge1xuICAgICAgICAgICAgY29uc3Qgc3RhcnQgPSBpICsgMTtcbiAgICAgICAgICAgIHdoaWxlICgrK2kpIHtcbiAgICAgICAgICAgICAgICBjb25zdCBjID0gc3RyLmNoYXJBdChpKTtcbiAgICAgICAgICAgICAgICBpZiAoXCIsXCIgPT09IGMpXG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgIGlmIChpID09PSBzdHIubGVuZ3RoKVxuICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHAubnNwID0gc3RyLnN1YnN0cmluZyhzdGFydCwgaSk7XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICBwLm5zcCA9IFwiL1wiO1xuICAgICAgICB9XG4gICAgICAgIC8vIGxvb2sgdXAgaWRcbiAgICAgICAgY29uc3QgbmV4dCA9IHN0ci5jaGFyQXQoaSArIDEpO1xuICAgICAgICBpZiAoXCJcIiAhPT0gbmV4dCAmJiBOdW1iZXIobmV4dCkgPT0gbmV4dCkge1xuICAgICAgICAgICAgY29uc3Qgc3RhcnQgPSBpICsgMTtcbiAgICAgICAgICAgIHdoaWxlICgrK2kpIHtcbiAgICAgICAgICAgICAgICBjb25zdCBjID0gc3RyLmNoYXJBdChpKTtcbiAgICAgICAgICAgICAgICBpZiAobnVsbCA9PSBjIHx8IE51bWJlcihjKSAhPSBjKSB7XG4gICAgICAgICAgICAgICAgICAgIC0taTtcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGlmIChpID09PSBzdHIubGVuZ3RoKVxuICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHAuaWQgPSBOdW1iZXIoc3RyLnN1YnN0cmluZyhzdGFydCwgaSArIDEpKTtcbiAgICAgICAgfVxuICAgICAgICAvLyBsb29rIHVwIGpzb24gZGF0YVxuICAgICAgICBpZiAoc3RyLmNoYXJBdCgrK2kpKSB7XG4gICAgICAgICAgICBjb25zdCBwYXlsb2FkID0gdGhpcy50cnlQYXJzZShzdHIuc3Vic3RyKGkpKTtcbiAgICAgICAgICAgIGlmIChEZWNvZGVyLmlzUGF5bG9hZFZhbGlkKHAudHlwZSwgcGF5bG9hZCkpIHtcbiAgICAgICAgICAgICAgICBwLmRhdGEgPSBwYXlsb2FkO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKFwiaW52YWxpZCBwYXlsb2FkXCIpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIHJldHVybiBwO1xuICAgIH1cbiAgICB0cnlQYXJzZShzdHIpIHtcbiAgICAgICAgdHJ5IHtcbiAgICAgICAgICAgIHJldHVybiBKU09OLnBhcnNlKHN0ciwgdGhpcy5yZXZpdmVyKTtcbiAgICAgICAgfVxuICAgICAgICBjYXRjaCAoZSkge1xuICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgICB9XG4gICAgfVxuICAgIHN0YXRpYyBpc1BheWxvYWRWYWxpZCh0eXBlLCBwYXlsb2FkKSB7XG4gICAgICAgIHN3aXRjaCAodHlwZSkge1xuICAgICAgICAgICAgY2FzZSBQYWNrZXRUeXBlLkNPTk5FQ1Q6XG4gICAgICAgICAgICAgICAgcmV0dXJuIHR5cGVvZiBwYXlsb2FkID09PSBcIm9iamVjdFwiO1xuICAgICAgICAgICAgY2FzZSBQYWNrZXRUeXBlLkRJU0NPTk5FQ1Q6XG4gICAgICAgICAgICAgICAgcmV0dXJuIHBheWxvYWQgPT09IHVuZGVmaW5lZDtcbiAgICAgICAgICAgIGNhc2UgUGFja2V0VHlwZS5DT05ORUNUX0VSUk9SOlxuICAgICAgICAgICAgICAgIHJldHVybiB0eXBlb2YgcGF5bG9hZCA9PT0gXCJzdHJpbmdcIiB8fCB0eXBlb2YgcGF5bG9hZCA9PT0gXCJvYmplY3RcIjtcbiAgICAgICAgICAgIGNhc2UgUGFja2V0VHlwZS5FVkVOVDpcbiAgICAgICAgICAgIGNhc2UgUGFja2V0VHlwZS5CSU5BUllfRVZFTlQ6XG4gICAgICAgICAgICAgICAgcmV0dXJuIEFycmF5LmlzQXJyYXkocGF5bG9hZCkgJiYgcGF5bG9hZC5sZW5ndGggPiAwO1xuICAgICAgICAgICAgY2FzZSBQYWNrZXRUeXBlLkFDSzpcbiAgICAgICAgICAgIGNhc2UgUGFja2V0VHlwZS5CSU5BUllfQUNLOlxuICAgICAgICAgICAgICAgIHJldHVybiBBcnJheS5pc0FycmF5KHBheWxvYWQpO1xuICAgICAgICB9XG4gICAgfVxuICAgIC8qKlxuICAgICAqIERlYWxsb2NhdGVzIGEgcGFyc2VyJ3MgcmVzb3VyY2VzXG4gICAgICovXG4gICAgZGVzdHJveSgpIHtcbiAgICAgICAgaWYgKHRoaXMucmVjb25zdHJ1Y3Rvcikge1xuICAgICAgICAgICAgdGhpcy5yZWNvbnN0cnVjdG9yLmZpbmlzaGVkUmVjb25zdHJ1Y3Rpb24oKTtcbiAgICAgICAgfVxuICAgIH1cbn1cbi8qKlxuICogQSBtYW5hZ2VyIG9mIGEgYmluYXJ5IGV2ZW50J3MgJ2J1ZmZlciBzZXF1ZW5jZScuIFNob3VsZFxuICogYmUgY29uc3RydWN0ZWQgd2hlbmV2ZXIgYSBwYWNrZXQgb2YgdHlwZSBCSU5BUllfRVZFTlQgaXNcbiAqIGRlY29kZWQuXG4gKlxuICogQHBhcmFtIHtPYmplY3R9IHBhY2tldFxuICogQHJldHVybiB7QmluYXJ5UmVjb25zdHJ1Y3Rvcn0gaW5pdGlhbGl6ZWQgcmVjb25zdHJ1Y3RvclxuICovXG5jbGFzcyBCaW5hcnlSZWNvbnN0cnVjdG9yIHtcbiAgICBjb25zdHJ1Y3RvcihwYWNrZXQpIHtcbiAgICAgICAgdGhpcy5wYWNrZXQgPSBwYWNrZXQ7XG4gICAgICAgIHRoaXMuYnVmZmVycyA9IFtdO1xuICAgICAgICB0aGlzLnJlY29uUGFjayA9IHBhY2tldDtcbiAgICB9XG4gICAgLyoqXG4gICAgICogTWV0aG9kIHRvIGJlIGNhbGxlZCB3aGVuIGJpbmFyeSBkYXRhIHJlY2VpdmVkIGZyb20gY29ubmVjdGlvblxuICAgICAqIGFmdGVyIGEgQklOQVJZX0VWRU5UIHBhY2tldC5cbiAgICAgKlxuICAgICAqIEBwYXJhbSB7QnVmZmVyIHwgQXJyYXlCdWZmZXJ9IGJpbkRhdGEgLSB0aGUgcmF3IGJpbmFyeSBkYXRhIHJlY2VpdmVkXG4gICAgICogQHJldHVybiB7bnVsbCB8IE9iamVjdH0gcmV0dXJucyBudWxsIGlmIG1vcmUgYmluYXJ5IGRhdGEgaXMgZXhwZWN0ZWQgb3JcbiAgICAgKiAgIGEgcmVjb25zdHJ1Y3RlZCBwYWNrZXQgb2JqZWN0IGlmIGFsbCBidWZmZXJzIGhhdmUgYmVlbiByZWNlaXZlZC5cbiAgICAgKi9cbiAgICB0YWtlQmluYXJ5RGF0YShiaW5EYXRhKSB7XG4gICAgICAgIHRoaXMuYnVmZmVycy5wdXNoKGJpbkRhdGEpO1xuICAgICAgICBpZiAodGhpcy5idWZmZXJzLmxlbmd0aCA9PT0gdGhpcy5yZWNvblBhY2suYXR0YWNobWVudHMpIHtcbiAgICAgICAgICAgIC8vIGRvbmUgd2l0aCBidWZmZXIgbGlzdFxuICAgICAgICAgICAgY29uc3QgcGFja2V0ID0gcmVjb25zdHJ1Y3RQYWNrZXQodGhpcy5yZWNvblBhY2ssIHRoaXMuYnVmZmVycyk7XG4gICAgICAgICAgICB0aGlzLmZpbmlzaGVkUmVjb25zdHJ1Y3Rpb24oKTtcbiAgICAgICAgICAgIHJldHVybiBwYWNrZXQ7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIG51bGw7XG4gICAgfVxuICAgIC8qKlxuICAgICAqIENsZWFucyB1cCBiaW5hcnkgcGFja2V0IHJlY29uc3RydWN0aW9uIHZhcmlhYmxlcy5cbiAgICAgKi9cbiAgICBmaW5pc2hlZFJlY29uc3RydWN0aW9uKCkge1xuICAgICAgICB0aGlzLnJlY29uUGFjayA9IG51bGw7XG4gICAgICAgIHRoaXMuYnVmZmVycyA9IFtdO1xuICAgIH1cbn1cbiIsICJjb25zdCB3aXRoTmF0aXZlQXJyYXlCdWZmZXIgPSB0eXBlb2YgQXJyYXlCdWZmZXIgPT09IFwiZnVuY3Rpb25cIjtcbmNvbnN0IGlzVmlldyA9IChvYmopID0+IHtcbiAgICByZXR1cm4gdHlwZW9mIEFycmF5QnVmZmVyLmlzVmlldyA9PT0gXCJmdW5jdGlvblwiXG4gICAgICAgID8gQXJyYXlCdWZmZXIuaXNWaWV3KG9iailcbiAgICAgICAgOiBvYmouYnVmZmVyIGluc3RhbmNlb2YgQXJyYXlCdWZmZXI7XG59O1xuY29uc3QgdG9TdHJpbmcgPSBPYmplY3QucHJvdG90eXBlLnRvU3RyaW5nO1xuY29uc3Qgd2l0aE5hdGl2ZUJsb2IgPSB0eXBlb2YgQmxvYiA9PT0gXCJmdW5jdGlvblwiIHx8XG4gICAgKHR5cGVvZiBCbG9iICE9PSBcInVuZGVmaW5lZFwiICYmXG4gICAgICAgIHRvU3RyaW5nLmNhbGwoQmxvYikgPT09IFwiW29iamVjdCBCbG9iQ29uc3RydWN0b3JdXCIpO1xuY29uc3Qgd2l0aE5hdGl2ZUZpbGUgPSB0eXBlb2YgRmlsZSA9PT0gXCJmdW5jdGlvblwiIHx8XG4gICAgKHR5cGVvZiBGaWxlICE9PSBcInVuZGVmaW5lZFwiICYmXG4gICAgICAgIHRvU3RyaW5nLmNhbGwoRmlsZSkgPT09IFwiW29iamVjdCBGaWxlQ29uc3RydWN0b3JdXCIpO1xuLyoqXG4gKiBSZXR1cm5zIHRydWUgaWYgb2JqIGlzIGEgQnVmZmVyLCBhbiBBcnJheUJ1ZmZlciwgYSBCbG9iIG9yIGEgRmlsZS5cbiAqXG4gKiBAcHJpdmF0ZVxuICovXG5leHBvcnQgZnVuY3Rpb24gaXNCaW5hcnkob2JqKSB7XG4gICAgcmV0dXJuICgod2l0aE5hdGl2ZUFycmF5QnVmZmVyICYmIChvYmogaW5zdGFuY2VvZiBBcnJheUJ1ZmZlciB8fCBpc1ZpZXcob2JqKSkpIHx8XG4gICAgICAgICh3aXRoTmF0aXZlQmxvYiAmJiBvYmogaW5zdGFuY2VvZiBCbG9iKSB8fFxuICAgICAgICAod2l0aE5hdGl2ZUZpbGUgJiYgb2JqIGluc3RhbmNlb2YgRmlsZSkpO1xufVxuZXhwb3J0IGZ1bmN0aW9uIGhhc0JpbmFyeShvYmosIHRvSlNPTikge1xuICAgIGlmICghb2JqIHx8IHR5cGVvZiBvYmogIT09IFwib2JqZWN0XCIpIHtcbiAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgIH1cbiAgICBpZiAoQXJyYXkuaXNBcnJheShvYmopKSB7XG4gICAgICAgIGZvciAobGV0IGkgPSAwLCBsID0gb2JqLmxlbmd0aDsgaSA8IGw7IGkrKykge1xuICAgICAgICAgICAgaWYgKGhhc0JpbmFyeShvYmpbaV0pKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgIH1cbiAgICBpZiAoaXNCaW5hcnkob2JqKSkge1xuICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICB9XG4gICAgaWYgKG9iai50b0pTT04gJiZcbiAgICAgICAgdHlwZW9mIG9iai50b0pTT04gPT09IFwiZnVuY3Rpb25cIiAmJlxuICAgICAgICBhcmd1bWVudHMubGVuZ3RoID09PSAxKSB7XG4gICAgICAgIHJldHVybiBoYXNCaW5hcnkob2JqLnRvSlNPTigpLCB0cnVlKTtcbiAgICB9XG4gICAgZm9yIChjb25zdCBrZXkgaW4gb2JqKSB7XG4gICAgICAgIGlmIChPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwob2JqLCBrZXkpICYmIGhhc0JpbmFyeShvYmpba2V5XSkpIHtcbiAgICAgICAgICAgIHJldHVybiB0cnVlO1xuICAgICAgICB9XG4gICAgfVxuICAgIHJldHVybiBmYWxzZTtcbn1cbiIsICJpbXBvcnQgeyBpc0JpbmFyeSB9IGZyb20gXCIuL2lzLWJpbmFyeS5qc1wiO1xuLyoqXG4gKiBSZXBsYWNlcyBldmVyeSBCdWZmZXIgfCBBcnJheUJ1ZmZlciB8IEJsb2IgfCBGaWxlIGluIHBhY2tldCB3aXRoIGEgbnVtYmVyZWQgcGxhY2Vob2xkZXIuXG4gKlxuICogQHBhcmFtIHtPYmplY3R9IHBhY2tldCAtIHNvY2tldC5pbyBldmVudCBwYWNrZXRcbiAqIEByZXR1cm4ge09iamVjdH0gd2l0aCBkZWNvbnN0cnVjdGVkIHBhY2tldCBhbmQgbGlzdCBvZiBidWZmZXJzXG4gKiBAcHVibGljXG4gKi9cbmV4cG9ydCBmdW5jdGlvbiBkZWNvbnN0cnVjdFBhY2tldChwYWNrZXQpIHtcbiAgICBjb25zdCBidWZmZXJzID0gW107XG4gICAgY29uc3QgcGFja2V0RGF0YSA9IHBhY2tldC5kYXRhO1xuICAgIGNvbnN0IHBhY2sgPSBwYWNrZXQ7XG4gICAgcGFjay5kYXRhID0gX2RlY29uc3RydWN0UGFja2V0KHBhY2tldERhdGEsIGJ1ZmZlcnMpO1xuICAgIHBhY2suYXR0YWNobWVudHMgPSBidWZmZXJzLmxlbmd0aDsgLy8gbnVtYmVyIG9mIGJpbmFyeSAnYXR0YWNobWVudHMnXG4gICAgcmV0dXJuIHsgcGFja2V0OiBwYWNrLCBidWZmZXJzOiBidWZmZXJzIH07XG59XG5mdW5jdGlvbiBfZGVjb25zdHJ1Y3RQYWNrZXQoZGF0YSwgYnVmZmVycykge1xuICAgIGlmICghZGF0YSlcbiAgICAgICAgcmV0dXJuIGRhdGE7XG4gICAgaWYgKGlzQmluYXJ5KGRhdGEpKSB7XG4gICAgICAgIGNvbnN0IHBsYWNlaG9sZGVyID0geyBfcGxhY2Vob2xkZXI6IHRydWUsIG51bTogYnVmZmVycy5sZW5ndGggfTtcbiAgICAgICAgYnVmZmVycy5wdXNoKGRhdGEpO1xuICAgICAgICByZXR1cm4gcGxhY2Vob2xkZXI7XG4gICAgfVxuICAgIGVsc2UgaWYgKEFycmF5LmlzQXJyYXkoZGF0YSkpIHtcbiAgICAgICAgY29uc3QgbmV3RGF0YSA9IG5ldyBBcnJheShkYXRhLmxlbmd0aCk7XG4gICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgZGF0YS5sZW5ndGg7IGkrKykge1xuICAgICAgICAgICAgbmV3RGF0YVtpXSA9IF9kZWNvbnN0cnVjdFBhY2tldChkYXRhW2ldLCBidWZmZXJzKTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gbmV3RGF0YTtcbiAgICB9XG4gICAgZWxzZSBpZiAodHlwZW9mIGRhdGEgPT09IFwib2JqZWN0XCIgJiYgIShkYXRhIGluc3RhbmNlb2YgRGF0ZSkpIHtcbiAgICAgICAgY29uc3QgbmV3RGF0YSA9IHt9O1xuICAgICAgICBmb3IgKGNvbnN0IGtleSBpbiBkYXRhKSB7XG4gICAgICAgICAgICBpZiAoT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKGRhdGEsIGtleSkpIHtcbiAgICAgICAgICAgICAgICBuZXdEYXRhW2tleV0gPSBfZGVjb25zdHJ1Y3RQYWNrZXQoZGF0YVtrZXldLCBidWZmZXJzKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gbmV3RGF0YTtcbiAgICB9XG4gICAgcmV0dXJuIGRhdGE7XG59XG4vKipcbiAqIFJlY29uc3RydWN0cyBhIGJpbmFyeSBwYWNrZXQgZnJvbSBpdHMgcGxhY2Vob2xkZXIgcGFja2V0IGFuZCBidWZmZXJzXG4gKlxuICogQHBhcmFtIHtPYmplY3R9IHBhY2tldCAtIGV2ZW50IHBhY2tldCB3aXRoIHBsYWNlaG9sZGVyc1xuICogQHBhcmFtIHtBcnJheX0gYnVmZmVycyAtIGJpbmFyeSBidWZmZXJzIHRvIHB1dCBpbiBwbGFjZWhvbGRlciBwb3NpdGlvbnNcbiAqIEByZXR1cm4ge09iamVjdH0gcmVjb25zdHJ1Y3RlZCBwYWNrZXRcbiAqIEBwdWJsaWNcbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIHJlY29uc3RydWN0UGFja2V0KHBhY2tldCwgYnVmZmVycykge1xuICAgIHBhY2tldC5kYXRhID0gX3JlY29uc3RydWN0UGFja2V0KHBhY2tldC5kYXRhLCBidWZmZXJzKTtcbiAgICBwYWNrZXQuYXR0YWNobWVudHMgPSB1bmRlZmluZWQ7IC8vIG5vIGxvbmdlciB1c2VmdWxcbiAgICByZXR1cm4gcGFja2V0O1xufVxuZnVuY3Rpb24gX3JlY29uc3RydWN0UGFja2V0KGRhdGEsIGJ1ZmZlcnMpIHtcbiAgICBpZiAoIWRhdGEpXG4gICAgICAgIHJldHVybiBkYXRhO1xuICAgIGlmIChkYXRhICYmIGRhdGEuX3BsYWNlaG9sZGVyID09PSB0cnVlKSB7XG4gICAgICAgIGNvbnN0IGlzSW5kZXhWYWxpZCA9IHR5cGVvZiBkYXRhLm51bSA9PT0gXCJudW1iZXJcIiAmJlxuICAgICAgICAgICAgZGF0YS5udW0gPj0gMCAmJlxuICAgICAgICAgICAgZGF0YS5udW0gPCBidWZmZXJzLmxlbmd0aDtcbiAgICAgICAgaWYgKGlzSW5kZXhWYWxpZCkge1xuICAgICAgICAgICAgcmV0dXJuIGJ1ZmZlcnNbZGF0YS5udW1dOyAvLyBhcHByb3ByaWF0ZSBidWZmZXIgKHNob3VsZCBiZSBuYXR1cmFsIG9yZGVyIGFueXdheSlcbiAgICAgICAgfVxuICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcihcImlsbGVnYWwgYXR0YWNobWVudHNcIik7XG4gICAgICAgIH1cbiAgICB9XG4gICAgZWxzZSBpZiAoQXJyYXkuaXNBcnJheShkYXRhKSkge1xuICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IGRhdGEubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgICAgIGRhdGFbaV0gPSBfcmVjb25zdHJ1Y3RQYWNrZXQoZGF0YVtpXSwgYnVmZmVycyk7XG4gICAgICAgIH1cbiAgICB9XG4gICAgZWxzZSBpZiAodHlwZW9mIGRhdGEgPT09IFwib2JqZWN0XCIpIHtcbiAgICAgICAgZm9yIChjb25zdCBrZXkgaW4gZGF0YSkge1xuICAgICAgICAgICAgaWYgKE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChkYXRhLCBrZXkpKSB7XG4gICAgICAgICAgICAgICAgZGF0YVtrZXldID0gX3JlY29uc3RydWN0UGFja2V0KGRhdGFba2V5XSwgYnVmZmVycyk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9XG4gICAgcmV0dXJuIGRhdGE7XG59XG4iLCAiZXhwb3J0IGZ1bmN0aW9uIG9uKG9iaiwgZXYsIGZuKSB7XG4gICAgb2JqLm9uKGV2LCBmbik7XG4gICAgcmV0dXJuIGZ1bmN0aW9uIHN1YkRlc3Ryb3koKSB7XG4gICAgICAgIG9iai5vZmYoZXYsIGZuKTtcbiAgICB9O1xufVxuIiwgImltcG9ydCB7IFBhY2tldFR5cGUgfSBmcm9tIFwic29ja2V0LmlvLXBhcnNlclwiO1xuaW1wb3J0IHsgb24gfSBmcm9tIFwiLi9vbi5qc1wiO1xuaW1wb3J0IHsgRW1pdHRlciwgfSBmcm9tIFwiQHNvY2tldC5pby9jb21wb25lbnQtZW1pdHRlclwiO1xuLyoqXG4gKiBJbnRlcm5hbCBldmVudHMuXG4gKiBUaGVzZSBldmVudHMgY2FuJ3QgYmUgZW1pdHRlZCBieSB0aGUgdXNlci5cbiAqL1xuY29uc3QgUkVTRVJWRURfRVZFTlRTID0gT2JqZWN0LmZyZWV6ZSh7XG4gICAgY29ubmVjdDogMSxcbiAgICBjb25uZWN0X2Vycm9yOiAxLFxuICAgIGRpc2Nvbm5lY3Q6IDEsXG4gICAgZGlzY29ubmVjdGluZzogMSxcbiAgICAvLyBFdmVudEVtaXR0ZXIgcmVzZXJ2ZWQgZXZlbnRzOiBodHRwczovL25vZGVqcy5vcmcvYXBpL2V2ZW50cy5odG1sI2V2ZW50c19ldmVudF9uZXdsaXN0ZW5lclxuICAgIG5ld0xpc3RlbmVyOiAxLFxuICAgIHJlbW92ZUxpc3RlbmVyOiAxLFxufSk7XG5leHBvcnQgY2xhc3MgU29ja2V0IGV4dGVuZHMgRW1pdHRlciB7XG4gICAgLyoqXG4gICAgICogYFNvY2tldGAgY29uc3RydWN0b3IuXG4gICAgICpcbiAgICAgKiBAcHVibGljXG4gICAgICovXG4gICAgY29uc3RydWN0b3IoaW8sIG5zcCwgb3B0cykge1xuICAgICAgICBzdXBlcigpO1xuICAgICAgICB0aGlzLmNvbm5lY3RlZCA9IGZhbHNlO1xuICAgICAgICB0aGlzLnJlY2VpdmVCdWZmZXIgPSBbXTtcbiAgICAgICAgdGhpcy5zZW5kQnVmZmVyID0gW107XG4gICAgICAgIHRoaXMuaWRzID0gMDtcbiAgICAgICAgdGhpcy5hY2tzID0ge307XG4gICAgICAgIHRoaXMuZmxhZ3MgPSB7fTtcbiAgICAgICAgdGhpcy5pbyA9IGlvO1xuICAgICAgICB0aGlzLm5zcCA9IG5zcDtcbiAgICAgICAgaWYgKG9wdHMgJiYgb3B0cy5hdXRoKSB7XG4gICAgICAgICAgICB0aGlzLmF1dGggPSBvcHRzLmF1dGg7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKHRoaXMuaW8uX2F1dG9Db25uZWN0KVxuICAgICAgICAgICAgdGhpcy5vcGVuKCk7XG4gICAgfVxuICAgIC8qKlxuICAgICAqIFdoZXRoZXIgdGhlIHNvY2tldCBpcyBjdXJyZW50bHkgZGlzY29ubmVjdGVkXG4gICAgICovXG4gICAgZ2V0IGRpc2Nvbm5lY3RlZCgpIHtcbiAgICAgICAgcmV0dXJuICF0aGlzLmNvbm5lY3RlZDtcbiAgICB9XG4gICAgLyoqXG4gICAgICogU3Vic2NyaWJlIHRvIG9wZW4sIGNsb3NlIGFuZCBwYWNrZXQgZXZlbnRzXG4gICAgICpcbiAgICAgKiBAcHJpdmF0ZVxuICAgICAqL1xuICAgIHN1YkV2ZW50cygpIHtcbiAgICAgICAgaWYgKHRoaXMuc3VicylcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgY29uc3QgaW8gPSB0aGlzLmlvO1xuICAgICAgICB0aGlzLnN1YnMgPSBbXG4gICAgICAgICAgICBvbihpbywgXCJvcGVuXCIsIHRoaXMub25vcGVuLmJpbmQodGhpcykpLFxuICAgICAgICAgICAgb24oaW8sIFwicGFja2V0XCIsIHRoaXMub25wYWNrZXQuYmluZCh0aGlzKSksXG4gICAgICAgICAgICBvbihpbywgXCJlcnJvclwiLCB0aGlzLm9uZXJyb3IuYmluZCh0aGlzKSksXG4gICAgICAgICAgICBvbihpbywgXCJjbG9zZVwiLCB0aGlzLm9uY2xvc2UuYmluZCh0aGlzKSksXG4gICAgICAgIF07XG4gICAgfVxuICAgIC8qKlxuICAgICAqIFdoZXRoZXIgdGhlIFNvY2tldCB3aWxsIHRyeSB0byByZWNvbm5lY3Qgd2hlbiBpdHMgTWFuYWdlciBjb25uZWN0cyBvciByZWNvbm5lY3RzXG4gICAgICovXG4gICAgZ2V0IGFjdGl2ZSgpIHtcbiAgICAgICAgcmV0dXJuICEhdGhpcy5zdWJzO1xuICAgIH1cbiAgICAvKipcbiAgICAgKiBcIk9wZW5zXCIgdGhlIHNvY2tldC5cbiAgICAgKlxuICAgICAqIEBwdWJsaWNcbiAgICAgKi9cbiAgICBjb25uZWN0KCkge1xuICAgICAgICBpZiAodGhpcy5jb25uZWN0ZWQpXG4gICAgICAgICAgICByZXR1cm4gdGhpcztcbiAgICAgICAgdGhpcy5zdWJFdmVudHMoKTtcbiAgICAgICAgaWYgKCF0aGlzLmlvW1wiX3JlY29ubmVjdGluZ1wiXSlcbiAgICAgICAgICAgIHRoaXMuaW8ub3BlbigpOyAvLyBlbnN1cmUgb3BlblxuICAgICAgICBpZiAoXCJvcGVuXCIgPT09IHRoaXMuaW8uX3JlYWR5U3RhdGUpXG4gICAgICAgICAgICB0aGlzLm9ub3BlbigpO1xuICAgICAgICByZXR1cm4gdGhpcztcbiAgICB9XG4gICAgLyoqXG4gICAgICogQWxpYXMgZm9yIGNvbm5lY3QoKVxuICAgICAqL1xuICAgIG9wZW4oKSB7XG4gICAgICAgIHJldHVybiB0aGlzLmNvbm5lY3QoKTtcbiAgICB9XG4gICAgLyoqXG4gICAgICogU2VuZHMgYSBgbWVzc2FnZWAgZXZlbnQuXG4gICAgICpcbiAgICAgKiBAcmV0dXJuIHNlbGZcbiAgICAgKiBAcHVibGljXG4gICAgICovXG4gICAgc2VuZCguLi5hcmdzKSB7XG4gICAgICAgIGFyZ3MudW5zaGlmdChcIm1lc3NhZ2VcIik7XG4gICAgICAgIHRoaXMuZW1pdC5hcHBseSh0aGlzLCBhcmdzKTtcbiAgICAgICAgcmV0dXJuIHRoaXM7XG4gICAgfVxuICAgIC8qKlxuICAgICAqIE92ZXJyaWRlIGBlbWl0YC5cbiAgICAgKiBJZiB0aGUgZXZlbnQgaXMgaW4gYGV2ZW50c2AsIGl0J3MgZW1pdHRlZCBub3JtYWxseS5cbiAgICAgKlxuICAgICAqIEByZXR1cm4gc2VsZlxuICAgICAqIEBwdWJsaWNcbiAgICAgKi9cbiAgICBlbWl0KGV2LCAuLi5hcmdzKSB7XG4gICAgICAgIGlmIChSRVNFUlZFRF9FVkVOVFMuaGFzT3duUHJvcGVydHkoZXYpKSB7XG4gICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoJ1wiJyArIGV2LnRvU3RyaW5nKCkgKyAnXCIgaXMgYSByZXNlcnZlZCBldmVudCBuYW1lJyk7XG4gICAgICAgIH1cbiAgICAgICAgYXJncy51bnNoaWZ0KGV2KTtcbiAgICAgICAgY29uc3QgcGFja2V0ID0ge1xuICAgICAgICAgICAgdHlwZTogUGFja2V0VHlwZS5FVkVOVCxcbiAgICAgICAgICAgIGRhdGE6IGFyZ3MsXG4gICAgICAgIH07XG4gICAgICAgIHBhY2tldC5vcHRpb25zID0ge307XG4gICAgICAgIHBhY2tldC5vcHRpb25zLmNvbXByZXNzID0gdGhpcy5mbGFncy5jb21wcmVzcyAhPT0gZmFsc2U7XG4gICAgICAgIC8vIGV2ZW50IGFjayBjYWxsYmFja1xuICAgICAgICBpZiAoXCJmdW5jdGlvblwiID09PSB0eXBlb2YgYXJnc1thcmdzLmxlbmd0aCAtIDFdKSB7XG4gICAgICAgICAgICBjb25zdCBpZCA9IHRoaXMuaWRzKys7XG4gICAgICAgICAgICBjb25zdCBhY2sgPSBhcmdzLnBvcCgpO1xuICAgICAgICAgICAgdGhpcy5fcmVnaXN0ZXJBY2tDYWxsYmFjayhpZCwgYWNrKTtcbiAgICAgICAgICAgIHBhY2tldC5pZCA9IGlkO1xuICAgICAgICB9XG4gICAgICAgIGNvbnN0IGlzVHJhbnNwb3J0V3JpdGFibGUgPSB0aGlzLmlvLmVuZ2luZSAmJlxuICAgICAgICAgICAgdGhpcy5pby5lbmdpbmUudHJhbnNwb3J0ICYmXG4gICAgICAgICAgICB0aGlzLmlvLmVuZ2luZS50cmFuc3BvcnQud3JpdGFibGU7XG4gICAgICAgIGNvbnN0IGRpc2NhcmRQYWNrZXQgPSB0aGlzLmZsYWdzLnZvbGF0aWxlICYmICghaXNUcmFuc3BvcnRXcml0YWJsZSB8fCAhdGhpcy5jb25uZWN0ZWQpO1xuICAgICAgICBpZiAoZGlzY2FyZFBhY2tldCkge1xuICAgICAgICB9XG4gICAgICAgIGVsc2UgaWYgKHRoaXMuY29ubmVjdGVkKSB7XG4gICAgICAgICAgICB0aGlzLm5vdGlmeU91dGdvaW5nTGlzdGVuZXJzKHBhY2tldCk7XG4gICAgICAgICAgICB0aGlzLnBhY2tldChwYWNrZXQpO1xuICAgICAgICB9XG4gICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgdGhpcy5zZW5kQnVmZmVyLnB1c2gocGFja2V0KTtcbiAgICAgICAgfVxuICAgICAgICB0aGlzLmZsYWdzID0ge307XG4gICAgICAgIHJldHVybiB0aGlzO1xuICAgIH1cbiAgICAvKipcbiAgICAgKiBAcHJpdmF0ZVxuICAgICAqL1xuICAgIF9yZWdpc3RlckFja0NhbGxiYWNrKGlkLCBhY2spIHtcbiAgICAgICAgY29uc3QgdGltZW91dCA9IHRoaXMuZmxhZ3MudGltZW91dDtcbiAgICAgICAgaWYgKHRpbWVvdXQgPT09IHVuZGVmaW5lZCkge1xuICAgICAgICAgICAgdGhpcy5hY2tzW2lkXSA9IGFjaztcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuICAgICAgICAvLyBAdHMtaWdub3JlXG4gICAgICAgIGNvbnN0IHRpbWVyID0gdGhpcy5pby5zZXRUaW1lb3V0Rm4oKCkgPT4ge1xuICAgICAgICAgICAgZGVsZXRlIHRoaXMuYWNrc1tpZF07XG4gICAgICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IHRoaXMuc2VuZEJ1ZmZlci5sZW5ndGg7IGkrKykge1xuICAgICAgICAgICAgICAgIGlmICh0aGlzLnNlbmRCdWZmZXJbaV0uaWQgPT09IGlkKSB7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuc2VuZEJ1ZmZlci5zcGxpY2UoaSwgMSk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICAgICAgYWNrLmNhbGwodGhpcywgbmV3IEVycm9yKFwib3BlcmF0aW9uIGhhcyB0aW1lZCBvdXRcIikpO1xuICAgICAgICB9LCB0aW1lb3V0KTtcbiAgICAgICAgdGhpcy5hY2tzW2lkXSA9ICguLi5hcmdzKSA9PiB7XG4gICAgICAgICAgICAvLyBAdHMtaWdub3JlXG4gICAgICAgICAgICB0aGlzLmlvLmNsZWFyVGltZW91dEZuKHRpbWVyKTtcbiAgICAgICAgICAgIGFjay5hcHBseSh0aGlzLCBbbnVsbCwgLi4uYXJnc10pO1xuICAgICAgICB9O1xuICAgIH1cbiAgICAvKipcbiAgICAgKiBTZW5kcyBhIHBhY2tldC5cbiAgICAgKlxuICAgICAqIEBwYXJhbSBwYWNrZXRcbiAgICAgKiBAcHJpdmF0ZVxuICAgICAqL1xuICAgIHBhY2tldChwYWNrZXQpIHtcbiAgICAgICAgcGFja2V0Lm5zcCA9IHRoaXMubnNwO1xuICAgICAgICB0aGlzLmlvLl9wYWNrZXQocGFja2V0KTtcbiAgICB9XG4gICAgLyoqXG4gICAgICogQ2FsbGVkIHVwb24gZW5naW5lIGBvcGVuYC5cbiAgICAgKlxuICAgICAqIEBwcml2YXRlXG4gICAgICovXG4gICAgb25vcGVuKCkge1xuICAgICAgICBpZiAodHlwZW9mIHRoaXMuYXV0aCA9PSBcImZ1bmN0aW9uXCIpIHtcbiAgICAgICAgICAgIHRoaXMuYXV0aCgoZGF0YSkgPT4ge1xuICAgICAgICAgICAgICAgIHRoaXMucGFja2V0KHsgdHlwZTogUGFja2V0VHlwZS5DT05ORUNULCBkYXRhIH0pO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICB0aGlzLnBhY2tldCh7IHR5cGU6IFBhY2tldFR5cGUuQ09OTkVDVCwgZGF0YTogdGhpcy5hdXRoIH0pO1xuICAgICAgICB9XG4gICAgfVxuICAgIC8qKlxuICAgICAqIENhbGxlZCB1cG9uIGVuZ2luZSBvciBtYW5hZ2VyIGBlcnJvcmAuXG4gICAgICpcbiAgICAgKiBAcGFyYW0gZXJyXG4gICAgICogQHByaXZhdGVcbiAgICAgKi9cbiAgICBvbmVycm9yKGVycikge1xuICAgICAgICBpZiAoIXRoaXMuY29ubmVjdGVkKSB7XG4gICAgICAgICAgICB0aGlzLmVtaXRSZXNlcnZlZChcImNvbm5lY3RfZXJyb3JcIiwgZXJyKTtcbiAgICAgICAgfVxuICAgIH1cbiAgICAvKipcbiAgICAgKiBDYWxsZWQgdXBvbiBlbmdpbmUgYGNsb3NlYC5cbiAgICAgKlxuICAgICAqIEBwYXJhbSByZWFzb25cbiAgICAgKiBAcGFyYW0gZGVzY3JpcHRpb25cbiAgICAgKiBAcHJpdmF0ZVxuICAgICAqL1xuICAgIG9uY2xvc2UocmVhc29uLCBkZXNjcmlwdGlvbikge1xuICAgICAgICB0aGlzLmNvbm5lY3RlZCA9IGZhbHNlO1xuICAgICAgICBkZWxldGUgdGhpcy5pZDtcbiAgICAgICAgdGhpcy5lbWl0UmVzZXJ2ZWQoXCJkaXNjb25uZWN0XCIsIHJlYXNvbiwgZGVzY3JpcHRpb24pO1xuICAgIH1cbiAgICAvKipcbiAgICAgKiBDYWxsZWQgd2l0aCBzb2NrZXQgcGFja2V0LlxuICAgICAqXG4gICAgICogQHBhcmFtIHBhY2tldFxuICAgICAqIEBwcml2YXRlXG4gICAgICovXG4gICAgb25wYWNrZXQocGFja2V0KSB7XG4gICAgICAgIGNvbnN0IHNhbWVOYW1lc3BhY2UgPSBwYWNrZXQubnNwID09PSB0aGlzLm5zcDtcbiAgICAgICAgaWYgKCFzYW1lTmFtZXNwYWNlKVxuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICBzd2l0Y2ggKHBhY2tldC50eXBlKSB7XG4gICAgICAgICAgICBjYXNlIFBhY2tldFR5cGUuQ09OTkVDVDpcbiAgICAgICAgICAgICAgICBpZiAocGFja2V0LmRhdGEgJiYgcGFja2V0LmRhdGEuc2lkKSB7XG4gICAgICAgICAgICAgICAgICAgIGNvbnN0IGlkID0gcGFja2V0LmRhdGEuc2lkO1xuICAgICAgICAgICAgICAgICAgICB0aGlzLm9uY29ubmVjdChpZCk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICB0aGlzLmVtaXRSZXNlcnZlZChcImNvbm5lY3RfZXJyb3JcIiwgbmV3IEVycm9yKFwiSXQgc2VlbXMgeW91IGFyZSB0cnlpbmcgdG8gcmVhY2ggYSBTb2NrZXQuSU8gc2VydmVyIGluIHYyLnggd2l0aCBhIHYzLnggY2xpZW50LCBidXQgdGhleSBhcmUgbm90IGNvbXBhdGlibGUgKG1vcmUgaW5mb3JtYXRpb24gaGVyZTogaHR0cHM6Ly9zb2NrZXQuaW8vZG9jcy92My9taWdyYXRpbmctZnJvbS0yLXgtdG8tMy0wLylcIikpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIGNhc2UgUGFja2V0VHlwZS5FVkVOVDpcbiAgICAgICAgICAgIGNhc2UgUGFja2V0VHlwZS5CSU5BUllfRVZFTlQ6XG4gICAgICAgICAgICAgICAgdGhpcy5vbmV2ZW50KHBhY2tldCk7XG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICBjYXNlIFBhY2tldFR5cGUuQUNLOlxuICAgICAgICAgICAgY2FzZSBQYWNrZXRUeXBlLkJJTkFSWV9BQ0s6XG4gICAgICAgICAgICAgICAgdGhpcy5vbmFjayhwYWNrZXQpO1xuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgY2FzZSBQYWNrZXRUeXBlLkRJU0NPTk5FQ1Q6XG4gICAgICAgICAgICAgICAgdGhpcy5vbmRpc2Nvbm5lY3QoKTtcbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIGNhc2UgUGFja2V0VHlwZS5DT05ORUNUX0VSUk9SOlxuICAgICAgICAgICAgICAgIHRoaXMuZGVzdHJveSgpO1xuICAgICAgICAgICAgICAgIGNvbnN0IGVyciA9IG5ldyBFcnJvcihwYWNrZXQuZGF0YS5tZXNzYWdlKTtcbiAgICAgICAgICAgICAgICAvLyBAdHMtaWdub3JlXG4gICAgICAgICAgICAgICAgZXJyLmRhdGEgPSBwYWNrZXQuZGF0YS5kYXRhO1xuICAgICAgICAgICAgICAgIHRoaXMuZW1pdFJlc2VydmVkKFwiY29ubmVjdF9lcnJvclwiLCBlcnIpO1xuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICB9XG4gICAgfVxuICAgIC8qKlxuICAgICAqIENhbGxlZCB1cG9uIGEgc2VydmVyIGV2ZW50LlxuICAgICAqXG4gICAgICogQHBhcmFtIHBhY2tldFxuICAgICAqIEBwcml2YXRlXG4gICAgICovXG4gICAgb25ldmVudChwYWNrZXQpIHtcbiAgICAgICAgY29uc3QgYXJncyA9IHBhY2tldC5kYXRhIHx8IFtdO1xuICAgICAgICBpZiAobnVsbCAhPSBwYWNrZXQuaWQpIHtcbiAgICAgICAgICAgIGFyZ3MucHVzaCh0aGlzLmFjayhwYWNrZXQuaWQpKTtcbiAgICAgICAgfVxuICAgICAgICBpZiAodGhpcy5jb25uZWN0ZWQpIHtcbiAgICAgICAgICAgIHRoaXMuZW1pdEV2ZW50KGFyZ3MpO1xuICAgICAgICB9XG4gICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgdGhpcy5yZWNlaXZlQnVmZmVyLnB1c2goT2JqZWN0LmZyZWV6ZShhcmdzKSk7XG4gICAgICAgIH1cbiAgICB9XG4gICAgZW1pdEV2ZW50KGFyZ3MpIHtcbiAgICAgICAgaWYgKHRoaXMuX2FueUxpc3RlbmVycyAmJiB0aGlzLl9hbnlMaXN0ZW5lcnMubGVuZ3RoKSB7XG4gICAgICAgICAgICBjb25zdCBsaXN0ZW5lcnMgPSB0aGlzLl9hbnlMaXN0ZW5lcnMuc2xpY2UoKTtcbiAgICAgICAgICAgIGZvciAoY29uc3QgbGlzdGVuZXIgb2YgbGlzdGVuZXJzKSB7XG4gICAgICAgICAgICAgICAgbGlzdGVuZXIuYXBwbHkodGhpcywgYXJncyk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgc3VwZXIuZW1pdC5hcHBseSh0aGlzLCBhcmdzKTtcbiAgICB9XG4gICAgLyoqXG4gICAgICogUHJvZHVjZXMgYW4gYWNrIGNhbGxiYWNrIHRvIGVtaXQgd2l0aCBhbiBldmVudC5cbiAgICAgKlxuICAgICAqIEBwcml2YXRlXG4gICAgICovXG4gICAgYWNrKGlkKSB7XG4gICAgICAgIGNvbnN0IHNlbGYgPSB0aGlzO1xuICAgICAgICBsZXQgc2VudCA9IGZhbHNlO1xuICAgICAgICByZXR1cm4gZnVuY3Rpb24gKC4uLmFyZ3MpIHtcbiAgICAgICAgICAgIC8vIHByZXZlbnQgZG91YmxlIGNhbGxiYWNrc1xuICAgICAgICAgICAgaWYgKHNlbnQpXG4gICAgICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAgICAgc2VudCA9IHRydWU7XG4gICAgICAgICAgICBzZWxmLnBhY2tldCh7XG4gICAgICAgICAgICAgICAgdHlwZTogUGFja2V0VHlwZS5BQ0ssXG4gICAgICAgICAgICAgICAgaWQ6IGlkLFxuICAgICAgICAgICAgICAgIGRhdGE6IGFyZ3MsXG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfTtcbiAgICB9XG4gICAgLyoqXG4gICAgICogQ2FsbGVkIHVwb24gYSBzZXJ2ZXIgYWNrbm93bGVnZW1lbnQuXG4gICAgICpcbiAgICAgKiBAcGFyYW0gcGFja2V0XG4gICAgICogQHByaXZhdGVcbiAgICAgKi9cbiAgICBvbmFjayhwYWNrZXQpIHtcbiAgICAgICAgY29uc3QgYWNrID0gdGhpcy5hY2tzW3BhY2tldC5pZF07XG4gICAgICAgIGlmIChcImZ1bmN0aW9uXCIgPT09IHR5cGVvZiBhY2spIHtcbiAgICAgICAgICAgIGFjay5hcHBseSh0aGlzLCBwYWNrZXQuZGF0YSk7XG4gICAgICAgICAgICBkZWxldGUgdGhpcy5hY2tzW3BhY2tldC5pZF07XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSB7XG4gICAgICAgIH1cbiAgICB9XG4gICAgLyoqXG4gICAgICogQ2FsbGVkIHVwb24gc2VydmVyIGNvbm5lY3QuXG4gICAgICpcbiAgICAgKiBAcHJpdmF0ZVxuICAgICAqL1xuICAgIG9uY29ubmVjdChpZCkge1xuICAgICAgICB0aGlzLmlkID0gaWQ7XG4gICAgICAgIHRoaXMuY29ubmVjdGVkID0gdHJ1ZTtcbiAgICAgICAgdGhpcy5lbWl0QnVmZmVyZWQoKTtcbiAgICAgICAgdGhpcy5lbWl0UmVzZXJ2ZWQoXCJjb25uZWN0XCIpO1xuICAgIH1cbiAgICAvKipcbiAgICAgKiBFbWl0IGJ1ZmZlcmVkIGV2ZW50cyAocmVjZWl2ZWQgYW5kIGVtaXR0ZWQpLlxuICAgICAqXG4gICAgICogQHByaXZhdGVcbiAgICAgKi9cbiAgICBlbWl0QnVmZmVyZWQoKSB7XG4gICAgICAgIHRoaXMucmVjZWl2ZUJ1ZmZlci5mb3JFYWNoKChhcmdzKSA9PiB0aGlzLmVtaXRFdmVudChhcmdzKSk7XG4gICAgICAgIHRoaXMucmVjZWl2ZUJ1ZmZlciA9IFtdO1xuICAgICAgICB0aGlzLnNlbmRCdWZmZXIuZm9yRWFjaCgocGFja2V0KSA9PiB7XG4gICAgICAgICAgICB0aGlzLm5vdGlmeU91dGdvaW5nTGlzdGVuZXJzKHBhY2tldCk7XG4gICAgICAgICAgICB0aGlzLnBhY2tldChwYWNrZXQpO1xuICAgICAgICB9KTtcbiAgICAgICAgdGhpcy5zZW5kQnVmZmVyID0gW107XG4gICAgfVxuICAgIC8qKlxuICAgICAqIENhbGxlZCB1cG9uIHNlcnZlciBkaXNjb25uZWN0LlxuICAgICAqXG4gICAgICogQHByaXZhdGVcbiAgICAgKi9cbiAgICBvbmRpc2Nvbm5lY3QoKSB7XG4gICAgICAgIHRoaXMuZGVzdHJveSgpO1xuICAgICAgICB0aGlzLm9uY2xvc2UoXCJpbyBzZXJ2ZXIgZGlzY29ubmVjdFwiKTtcbiAgICB9XG4gICAgLyoqXG4gICAgICogQ2FsbGVkIHVwb24gZm9yY2VkIGNsaWVudC9zZXJ2ZXIgc2lkZSBkaXNjb25uZWN0aW9ucyxcbiAgICAgKiB0aGlzIG1ldGhvZCBlbnN1cmVzIHRoZSBtYW5hZ2VyIHN0b3BzIHRyYWNraW5nIHVzIGFuZFxuICAgICAqIHRoYXQgcmVjb25uZWN0aW9ucyBkb24ndCBnZXQgdHJpZ2dlcmVkIGZvciB0aGlzLlxuICAgICAqXG4gICAgICogQHByaXZhdGVcbiAgICAgKi9cbiAgICBkZXN0cm95KCkge1xuICAgICAgICBpZiAodGhpcy5zdWJzKSB7XG4gICAgICAgICAgICAvLyBjbGVhbiBzdWJzY3JpcHRpb25zIHRvIGF2b2lkIHJlY29ubmVjdGlvbnNcbiAgICAgICAgICAgIHRoaXMuc3Vicy5mb3JFYWNoKChzdWJEZXN0cm95KSA9PiBzdWJEZXN0cm95KCkpO1xuICAgICAgICAgICAgdGhpcy5zdWJzID0gdW5kZWZpbmVkO1xuICAgICAgICB9XG4gICAgICAgIHRoaXMuaW9bXCJfZGVzdHJveVwiXSh0aGlzKTtcbiAgICB9XG4gICAgLyoqXG4gICAgICogRGlzY29ubmVjdHMgdGhlIHNvY2tldCBtYW51YWxseS5cbiAgICAgKlxuICAgICAqIEByZXR1cm4gc2VsZlxuICAgICAqIEBwdWJsaWNcbiAgICAgKi9cbiAgICBkaXNjb25uZWN0KCkge1xuICAgICAgICBpZiAodGhpcy5jb25uZWN0ZWQpIHtcbiAgICAgICAgICAgIHRoaXMucGFja2V0KHsgdHlwZTogUGFja2V0VHlwZS5ESVNDT05ORUNUIH0pO1xuICAgICAgICB9XG4gICAgICAgIC8vIHJlbW92ZSBzb2NrZXQgZnJvbSBwb29sXG4gICAgICAgIHRoaXMuZGVzdHJveSgpO1xuICAgICAgICBpZiAodGhpcy5jb25uZWN0ZWQpIHtcbiAgICAgICAgICAgIC8vIGZpcmUgZXZlbnRzXG4gICAgICAgICAgICB0aGlzLm9uY2xvc2UoXCJpbyBjbGllbnQgZGlzY29ubmVjdFwiKTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gdGhpcztcbiAgICB9XG4gICAgLyoqXG4gICAgICogQWxpYXMgZm9yIGRpc2Nvbm5lY3QoKVxuICAgICAqXG4gICAgICogQHJldHVybiBzZWxmXG4gICAgICogQHB1YmxpY1xuICAgICAqL1xuICAgIGNsb3NlKCkge1xuICAgICAgICByZXR1cm4gdGhpcy5kaXNjb25uZWN0KCk7XG4gICAgfVxuICAgIC8qKlxuICAgICAqIFNldHMgdGhlIGNvbXByZXNzIGZsYWcuXG4gICAgICpcbiAgICAgKiBAcGFyYW0gY29tcHJlc3MgLSBpZiBgdHJ1ZWAsIGNvbXByZXNzZXMgdGhlIHNlbmRpbmcgZGF0YVxuICAgICAqIEByZXR1cm4gc2VsZlxuICAgICAqIEBwdWJsaWNcbiAgICAgKi9cbiAgICBjb21wcmVzcyhjb21wcmVzcykge1xuICAgICAgICB0aGlzLmZsYWdzLmNvbXByZXNzID0gY29tcHJlc3M7XG4gICAgICAgIHJldHVybiB0aGlzO1xuICAgIH1cbiAgICAvKipcbiAgICAgKiBTZXRzIGEgbW9kaWZpZXIgZm9yIGEgc3Vic2VxdWVudCBldmVudCBlbWlzc2lvbiB0aGF0IHRoZSBldmVudCBtZXNzYWdlIHdpbGwgYmUgZHJvcHBlZCB3aGVuIHRoaXMgc29ja2V0IGlzIG5vdFxuICAgICAqIHJlYWR5IHRvIHNlbmQgbWVzc2FnZXMuXG4gICAgICpcbiAgICAgKiBAcmV0dXJucyBzZWxmXG4gICAgICogQHB1YmxpY1xuICAgICAqL1xuICAgIGdldCB2b2xhdGlsZSgpIHtcbiAgICAgICAgdGhpcy5mbGFncy52b2xhdGlsZSA9IHRydWU7XG4gICAgICAgIHJldHVybiB0aGlzO1xuICAgIH1cbiAgICAvKipcbiAgICAgKiBTZXRzIGEgbW9kaWZpZXIgZm9yIGEgc3Vic2VxdWVudCBldmVudCBlbWlzc2lvbiB0aGF0IHRoZSBjYWxsYmFjayB3aWxsIGJlIGNhbGxlZCB3aXRoIGFuIGVycm9yIHdoZW4gdGhlXG4gICAgICogZ2l2ZW4gbnVtYmVyIG9mIG1pbGxpc2Vjb25kcyBoYXZlIGVsYXBzZWQgd2l0aG91dCBhbiBhY2tub3dsZWRnZW1lbnQgZnJvbSB0aGUgc2VydmVyOlxuICAgICAqXG4gICAgICogYGBgXG4gICAgICogc29ja2V0LnRpbWVvdXQoNTAwMCkuZW1pdChcIm15LWV2ZW50XCIsIChlcnIpID0+IHtcbiAgICAgKiAgIGlmIChlcnIpIHtcbiAgICAgKiAgICAgLy8gdGhlIHNlcnZlciBkaWQgbm90IGFja25vd2xlZGdlIHRoZSBldmVudCBpbiB0aGUgZ2l2ZW4gZGVsYXlcbiAgICAgKiAgIH1cbiAgICAgKiB9KTtcbiAgICAgKiBgYGBcbiAgICAgKlxuICAgICAqIEByZXR1cm5zIHNlbGZcbiAgICAgKiBAcHVibGljXG4gICAgICovXG4gICAgdGltZW91dCh0aW1lb3V0KSB7XG4gICAgICAgIHRoaXMuZmxhZ3MudGltZW91dCA9IHRpbWVvdXQ7XG4gICAgICAgIHJldHVybiB0aGlzO1xuICAgIH1cbiAgICAvKipcbiAgICAgKiBBZGRzIGEgbGlzdGVuZXIgdGhhdCB3aWxsIGJlIGZpcmVkIHdoZW4gYW55IGV2ZW50IGlzIGVtaXR0ZWQuIFRoZSBldmVudCBuYW1lIGlzIHBhc3NlZCBhcyB0aGUgZmlyc3QgYXJndW1lbnQgdG8gdGhlXG4gICAgICogY2FsbGJhY2suXG4gICAgICpcbiAgICAgKiBAcGFyYW0gbGlzdGVuZXJcbiAgICAgKiBAcHVibGljXG4gICAgICovXG4gICAgb25BbnkobGlzdGVuZXIpIHtcbiAgICAgICAgdGhpcy5fYW55TGlzdGVuZXJzID0gdGhpcy5fYW55TGlzdGVuZXJzIHx8IFtdO1xuICAgICAgICB0aGlzLl9hbnlMaXN0ZW5lcnMucHVzaChsaXN0ZW5lcik7XG4gICAgICAgIHJldHVybiB0aGlzO1xuICAgIH1cbiAgICAvKipcbiAgICAgKiBBZGRzIGEgbGlzdGVuZXIgdGhhdCB3aWxsIGJlIGZpcmVkIHdoZW4gYW55IGV2ZW50IGlzIGVtaXR0ZWQuIFRoZSBldmVudCBuYW1lIGlzIHBhc3NlZCBhcyB0aGUgZmlyc3QgYXJndW1lbnQgdG8gdGhlXG4gICAgICogY2FsbGJhY2suIFRoZSBsaXN0ZW5lciBpcyBhZGRlZCB0byB0aGUgYmVnaW5uaW5nIG9mIHRoZSBsaXN0ZW5lcnMgYXJyYXkuXG4gICAgICpcbiAgICAgKiBAcGFyYW0gbGlzdGVuZXJcbiAgICAgKiBAcHVibGljXG4gICAgICovXG4gICAgcHJlcGVuZEFueShsaXN0ZW5lcikge1xuICAgICAgICB0aGlzLl9hbnlMaXN0ZW5lcnMgPSB0aGlzLl9hbnlMaXN0ZW5lcnMgfHwgW107XG4gICAgICAgIHRoaXMuX2FueUxpc3RlbmVycy51bnNoaWZ0KGxpc3RlbmVyKTtcbiAgICAgICAgcmV0dXJuIHRoaXM7XG4gICAgfVxuICAgIC8qKlxuICAgICAqIFJlbW92ZXMgdGhlIGxpc3RlbmVyIHRoYXQgd2lsbCBiZSBmaXJlZCB3aGVuIGFueSBldmVudCBpcyBlbWl0dGVkLlxuICAgICAqXG4gICAgICogQHBhcmFtIGxpc3RlbmVyXG4gICAgICogQHB1YmxpY1xuICAgICAqL1xuICAgIG9mZkFueShsaXN0ZW5lcikge1xuICAgICAgICBpZiAoIXRoaXMuX2FueUxpc3RlbmVycykge1xuICAgICAgICAgICAgcmV0dXJuIHRoaXM7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKGxpc3RlbmVyKSB7XG4gICAgICAgICAgICBjb25zdCBsaXN0ZW5lcnMgPSB0aGlzLl9hbnlMaXN0ZW5lcnM7XG4gICAgICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IGxpc3RlbmVycy5sZW5ndGg7IGkrKykge1xuICAgICAgICAgICAgICAgIGlmIChsaXN0ZW5lciA9PT0gbGlzdGVuZXJzW2ldKSB7XG4gICAgICAgICAgICAgICAgICAgIGxpc3RlbmVycy5zcGxpY2UoaSwgMSk7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiB0aGlzO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgIHRoaXMuX2FueUxpc3RlbmVycyA9IFtdO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiB0aGlzO1xuICAgIH1cbiAgICAvKipcbiAgICAgKiBSZXR1cm5zIGFuIGFycmF5IG9mIGxpc3RlbmVycyB0aGF0IGFyZSBsaXN0ZW5pbmcgZm9yIGFueSBldmVudCB0aGF0IGlzIHNwZWNpZmllZC4gVGhpcyBhcnJheSBjYW4gYmUgbWFuaXB1bGF0ZWQsXG4gICAgICogZS5nLiB0byByZW1vdmUgbGlzdGVuZXJzLlxuICAgICAqXG4gICAgICogQHB1YmxpY1xuICAgICAqL1xuICAgIGxpc3RlbmVyc0FueSgpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuX2FueUxpc3RlbmVycyB8fCBbXTtcbiAgICB9XG4gICAgLyoqXG4gICAgICogQWRkcyBhIGxpc3RlbmVyIHRoYXQgd2lsbCBiZSBmaXJlZCB3aGVuIGFueSBldmVudCBpcyBlbWl0dGVkLiBUaGUgZXZlbnQgbmFtZSBpcyBwYXNzZWQgYXMgdGhlIGZpcnN0IGFyZ3VtZW50IHRvIHRoZVxuICAgICAqIGNhbGxiYWNrLlxuICAgICAqXG4gICAgICogQHBhcmFtIGxpc3RlbmVyXG4gICAgICpcbiAgICAgKiA8cHJlPjxjb2RlPlxuICAgICAqXG4gICAgICogc29ja2V0Lm9uQW55T3V0Z29pbmcoKGV2ZW50LCAuLi5hcmdzKSA9PiB7XG4gICAgICogICBjb25zb2xlLmxvZyhldmVudCk7XG4gICAgICogfSk7XG4gICAgICpcbiAgICAgKiA8L3ByZT48L2NvZGU+XG4gICAgICpcbiAgICAgKiBAcHVibGljXG4gICAgICovXG4gICAgb25BbnlPdXRnb2luZyhsaXN0ZW5lcikge1xuICAgICAgICB0aGlzLl9hbnlPdXRnb2luZ0xpc3RlbmVycyA9IHRoaXMuX2FueU91dGdvaW5nTGlzdGVuZXJzIHx8IFtdO1xuICAgICAgICB0aGlzLl9hbnlPdXRnb2luZ0xpc3RlbmVycy5wdXNoKGxpc3RlbmVyKTtcbiAgICAgICAgcmV0dXJuIHRoaXM7XG4gICAgfVxuICAgIC8qKlxuICAgICAqIEFkZHMgYSBsaXN0ZW5lciB0aGF0IHdpbGwgYmUgZmlyZWQgd2hlbiBhbnkgZXZlbnQgaXMgZW1pdHRlZC4gVGhlIGV2ZW50IG5hbWUgaXMgcGFzc2VkIGFzIHRoZSBmaXJzdCBhcmd1bWVudCB0byB0aGVcbiAgICAgKiBjYWxsYmFjay4gVGhlIGxpc3RlbmVyIGlzIGFkZGVkIHRvIHRoZSBiZWdpbm5pbmcgb2YgdGhlIGxpc3RlbmVycyBhcnJheS5cbiAgICAgKlxuICAgICAqIEBwYXJhbSBsaXN0ZW5lclxuICAgICAqXG4gICAgICogPHByZT48Y29kZT5cbiAgICAgKlxuICAgICAqIHNvY2tldC5wcmVwZW5kQW55T3V0Z29pbmcoKGV2ZW50LCAuLi5hcmdzKSA9PiB7XG4gICAgICogICBjb25zb2xlLmxvZyhldmVudCk7XG4gICAgICogfSk7XG4gICAgICpcbiAgICAgKiA8L3ByZT48L2NvZGU+XG4gICAgICpcbiAgICAgKiBAcHVibGljXG4gICAgICovXG4gICAgcHJlcGVuZEFueU91dGdvaW5nKGxpc3RlbmVyKSB7XG4gICAgICAgIHRoaXMuX2FueU91dGdvaW5nTGlzdGVuZXJzID0gdGhpcy5fYW55T3V0Z29pbmdMaXN0ZW5lcnMgfHwgW107XG4gICAgICAgIHRoaXMuX2FueU91dGdvaW5nTGlzdGVuZXJzLnVuc2hpZnQobGlzdGVuZXIpO1xuICAgICAgICByZXR1cm4gdGhpcztcbiAgICB9XG4gICAgLyoqXG4gICAgICogUmVtb3ZlcyB0aGUgbGlzdGVuZXIgdGhhdCB3aWxsIGJlIGZpcmVkIHdoZW4gYW55IGV2ZW50IGlzIGVtaXR0ZWQuXG4gICAgICpcbiAgICAgKiBAcGFyYW0gbGlzdGVuZXJcbiAgICAgKlxuICAgICAqIDxwcmU+PGNvZGU+XG4gICAgICpcbiAgICAgKiBjb25zdCBoYW5kbGVyID0gKGV2ZW50LCAuLi5hcmdzKSA9PiB7XG4gICAgICogICBjb25zb2xlLmxvZyhldmVudCk7XG4gICAgICogfVxuICAgICAqXG4gICAgICogc29ja2V0Lm9uQW55T3V0Z29pbmcoaGFuZGxlcik7XG4gICAgICpcbiAgICAgKiAvLyB0aGVuIGxhdGVyXG4gICAgICogc29ja2V0Lm9mZkFueU91dGdvaW5nKGhhbmRsZXIpO1xuICAgICAqXG4gICAgICogPC9wcmU+PC9jb2RlPlxuICAgICAqXG4gICAgICogQHB1YmxpY1xuICAgICAqL1xuICAgIG9mZkFueU91dGdvaW5nKGxpc3RlbmVyKSB7XG4gICAgICAgIGlmICghdGhpcy5fYW55T3V0Z29pbmdMaXN0ZW5lcnMpIHtcbiAgICAgICAgICAgIHJldHVybiB0aGlzO1xuICAgICAgICB9XG4gICAgICAgIGlmIChsaXN0ZW5lcikge1xuICAgICAgICAgICAgY29uc3QgbGlzdGVuZXJzID0gdGhpcy5fYW55T3V0Z29pbmdMaXN0ZW5lcnM7XG4gICAgICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IGxpc3RlbmVycy5sZW5ndGg7IGkrKykge1xuICAgICAgICAgICAgICAgIGlmIChsaXN0ZW5lciA9PT0gbGlzdGVuZXJzW2ldKSB7XG4gICAgICAgICAgICAgICAgICAgIGxpc3RlbmVycy5zcGxpY2UoaSwgMSk7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiB0aGlzO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgIHRoaXMuX2FueU91dGdvaW5nTGlzdGVuZXJzID0gW107XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIHRoaXM7XG4gICAgfVxuICAgIC8qKlxuICAgICAqIFJldHVybnMgYW4gYXJyYXkgb2YgbGlzdGVuZXJzIHRoYXQgYXJlIGxpc3RlbmluZyBmb3IgYW55IGV2ZW50IHRoYXQgaXMgc3BlY2lmaWVkLiBUaGlzIGFycmF5IGNhbiBiZSBtYW5pcHVsYXRlZCxcbiAgICAgKiBlLmcuIHRvIHJlbW92ZSBsaXN0ZW5lcnMuXG4gICAgICpcbiAgICAgKiBAcHVibGljXG4gICAgICovXG4gICAgbGlzdGVuZXJzQW55T3V0Z29pbmcoKSB7XG4gICAgICAgIHJldHVybiB0aGlzLl9hbnlPdXRnb2luZ0xpc3RlbmVycyB8fCBbXTtcbiAgICB9XG4gICAgLyoqXG4gICAgICogTm90aWZ5IHRoZSBsaXN0ZW5lcnMgZm9yIGVhY2ggcGFja2V0IHNlbnRcbiAgICAgKlxuICAgICAqIEBwYXJhbSBwYWNrZXRcbiAgICAgKlxuICAgICAqIEBwcml2YXRlXG4gICAgICovXG4gICAgbm90aWZ5T3V0Z29pbmdMaXN0ZW5lcnMocGFja2V0KSB7XG4gICAgICAgIGlmICh0aGlzLl9hbnlPdXRnb2luZ0xpc3RlbmVycyAmJiB0aGlzLl9hbnlPdXRnb2luZ0xpc3RlbmVycy5sZW5ndGgpIHtcbiAgICAgICAgICAgIGNvbnN0IGxpc3RlbmVycyA9IHRoaXMuX2FueU91dGdvaW5nTGlzdGVuZXJzLnNsaWNlKCk7XG4gICAgICAgICAgICBmb3IgKGNvbnN0IGxpc3RlbmVyIG9mIGxpc3RlbmVycykge1xuICAgICAgICAgICAgICAgIGxpc3RlbmVyLmFwcGx5KHRoaXMsIHBhY2tldC5kYXRhKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH1cbn1cbiIsICIvKipcbiAqIEluaXRpYWxpemUgYmFja29mZiB0aW1lciB3aXRoIGBvcHRzYC5cbiAqXG4gKiAtIGBtaW5gIGluaXRpYWwgdGltZW91dCBpbiBtaWxsaXNlY29uZHMgWzEwMF1cbiAqIC0gYG1heGAgbWF4IHRpbWVvdXQgWzEwMDAwXVxuICogLSBgaml0dGVyYCBbMF1cbiAqIC0gYGZhY3RvcmAgWzJdXG4gKlxuICogQHBhcmFtIHtPYmplY3R9IG9wdHNcbiAqIEBhcGkgcHVibGljXG4gKi9cbmV4cG9ydCBmdW5jdGlvbiBCYWNrb2ZmKG9wdHMpIHtcbiAgICBvcHRzID0gb3B0cyB8fCB7fTtcbiAgICB0aGlzLm1zID0gb3B0cy5taW4gfHwgMTAwO1xuICAgIHRoaXMubWF4ID0gb3B0cy5tYXggfHwgMTAwMDA7XG4gICAgdGhpcy5mYWN0b3IgPSBvcHRzLmZhY3RvciB8fCAyO1xuICAgIHRoaXMuaml0dGVyID0gb3B0cy5qaXR0ZXIgPiAwICYmIG9wdHMuaml0dGVyIDw9IDEgPyBvcHRzLmppdHRlciA6IDA7XG4gICAgdGhpcy5hdHRlbXB0cyA9IDA7XG59XG4vKipcbiAqIFJldHVybiB0aGUgYmFja29mZiBkdXJhdGlvbi5cbiAqXG4gKiBAcmV0dXJuIHtOdW1iZXJ9XG4gKiBAYXBpIHB1YmxpY1xuICovXG5CYWNrb2ZmLnByb3RvdHlwZS5kdXJhdGlvbiA9IGZ1bmN0aW9uICgpIHtcbiAgICB2YXIgbXMgPSB0aGlzLm1zICogTWF0aC5wb3codGhpcy5mYWN0b3IsIHRoaXMuYXR0ZW1wdHMrKyk7XG4gICAgaWYgKHRoaXMuaml0dGVyKSB7XG4gICAgICAgIHZhciByYW5kID0gTWF0aC5yYW5kb20oKTtcbiAgICAgICAgdmFyIGRldmlhdGlvbiA9IE1hdGguZmxvb3IocmFuZCAqIHRoaXMuaml0dGVyICogbXMpO1xuICAgICAgICBtcyA9IChNYXRoLmZsb29yKHJhbmQgKiAxMCkgJiAxKSA9PSAwID8gbXMgLSBkZXZpYXRpb24gOiBtcyArIGRldmlhdGlvbjtcbiAgICB9XG4gICAgcmV0dXJuIE1hdGgubWluKG1zLCB0aGlzLm1heCkgfCAwO1xufTtcbi8qKlxuICogUmVzZXQgdGhlIG51bWJlciBvZiBhdHRlbXB0cy5cbiAqXG4gKiBAYXBpIHB1YmxpY1xuICovXG5CYWNrb2ZmLnByb3RvdHlwZS5yZXNldCA9IGZ1bmN0aW9uICgpIHtcbiAgICB0aGlzLmF0dGVtcHRzID0gMDtcbn07XG4vKipcbiAqIFNldCB0aGUgbWluaW11bSBkdXJhdGlvblxuICpcbiAqIEBhcGkgcHVibGljXG4gKi9cbkJhY2tvZmYucHJvdG90eXBlLnNldE1pbiA9IGZ1bmN0aW9uIChtaW4pIHtcbiAgICB0aGlzLm1zID0gbWluO1xufTtcbi8qKlxuICogU2V0IHRoZSBtYXhpbXVtIGR1cmF0aW9uXG4gKlxuICogQGFwaSBwdWJsaWNcbiAqL1xuQmFja29mZi5wcm90b3R5cGUuc2V0TWF4ID0gZnVuY3Rpb24gKG1heCkge1xuICAgIHRoaXMubWF4ID0gbWF4O1xufTtcbi8qKlxuICogU2V0IHRoZSBqaXR0ZXJcbiAqXG4gKiBAYXBpIHB1YmxpY1xuICovXG5CYWNrb2ZmLnByb3RvdHlwZS5zZXRKaXR0ZXIgPSBmdW5jdGlvbiAoaml0dGVyKSB7XG4gICAgdGhpcy5qaXR0ZXIgPSBqaXR0ZXI7XG59O1xuIiwgImltcG9ydCB7IFNvY2tldCBhcyBFbmdpbmUsIGluc3RhbGxUaW1lckZ1bmN0aW9ucywgfSBmcm9tIFwiZW5naW5lLmlvLWNsaWVudFwiO1xuaW1wb3J0IHsgU29ja2V0IH0gZnJvbSBcIi4vc29ja2V0LmpzXCI7XG5pbXBvcnQgKiBhcyBwYXJzZXIgZnJvbSBcInNvY2tldC5pby1wYXJzZXJcIjtcbmltcG9ydCB7IG9uIH0gZnJvbSBcIi4vb24uanNcIjtcbmltcG9ydCB7IEJhY2tvZmYgfSBmcm9tIFwiLi9jb250cmliL2JhY2tvMi5qc1wiO1xuaW1wb3J0IHsgRW1pdHRlciwgfSBmcm9tIFwiQHNvY2tldC5pby9jb21wb25lbnQtZW1pdHRlclwiO1xuZXhwb3J0IGNsYXNzIE1hbmFnZXIgZXh0ZW5kcyBFbWl0dGVyIHtcbiAgICBjb25zdHJ1Y3Rvcih1cmksIG9wdHMpIHtcbiAgICAgICAgdmFyIF9hO1xuICAgICAgICBzdXBlcigpO1xuICAgICAgICB0aGlzLm5zcHMgPSB7fTtcbiAgICAgICAgdGhpcy5zdWJzID0gW107XG4gICAgICAgIGlmICh1cmkgJiYgXCJvYmplY3RcIiA9PT0gdHlwZW9mIHVyaSkge1xuICAgICAgICAgICAgb3B0cyA9IHVyaTtcbiAgICAgICAgICAgIHVyaSA9IHVuZGVmaW5lZDtcbiAgICAgICAgfVxuICAgICAgICBvcHRzID0gb3B0cyB8fCB7fTtcbiAgICAgICAgb3B0cy5wYXRoID0gb3B0cy5wYXRoIHx8IFwiL3NvY2tldC5pb1wiO1xuICAgICAgICB0aGlzLm9wdHMgPSBvcHRzO1xuICAgICAgICBpbnN0YWxsVGltZXJGdW5jdGlvbnModGhpcywgb3B0cyk7XG4gICAgICAgIHRoaXMucmVjb25uZWN0aW9uKG9wdHMucmVjb25uZWN0aW9uICE9PSBmYWxzZSk7XG4gICAgICAgIHRoaXMucmVjb25uZWN0aW9uQXR0ZW1wdHMob3B0cy5yZWNvbm5lY3Rpb25BdHRlbXB0cyB8fCBJbmZpbml0eSk7XG4gICAgICAgIHRoaXMucmVjb25uZWN0aW9uRGVsYXkob3B0cy5yZWNvbm5lY3Rpb25EZWxheSB8fCAxMDAwKTtcbiAgICAgICAgdGhpcy5yZWNvbm5lY3Rpb25EZWxheU1heChvcHRzLnJlY29ubmVjdGlvbkRlbGF5TWF4IHx8IDUwMDApO1xuICAgICAgICB0aGlzLnJhbmRvbWl6YXRpb25GYWN0b3IoKF9hID0gb3B0cy5yYW5kb21pemF0aW9uRmFjdG9yKSAhPT0gbnVsbCAmJiBfYSAhPT0gdm9pZCAwID8gX2EgOiAwLjUpO1xuICAgICAgICB0aGlzLmJhY2tvZmYgPSBuZXcgQmFja29mZih7XG4gICAgICAgICAgICBtaW46IHRoaXMucmVjb25uZWN0aW9uRGVsYXkoKSxcbiAgICAgICAgICAgIG1heDogdGhpcy5yZWNvbm5lY3Rpb25EZWxheU1heCgpLFxuICAgICAgICAgICAgaml0dGVyOiB0aGlzLnJhbmRvbWl6YXRpb25GYWN0b3IoKSxcbiAgICAgICAgfSk7XG4gICAgICAgIHRoaXMudGltZW91dChudWxsID09IG9wdHMudGltZW91dCA/IDIwMDAwIDogb3B0cy50aW1lb3V0KTtcbiAgICAgICAgdGhpcy5fcmVhZHlTdGF0ZSA9IFwiY2xvc2VkXCI7XG4gICAgICAgIHRoaXMudXJpID0gdXJpO1xuICAgICAgICBjb25zdCBfcGFyc2VyID0gb3B0cy5wYXJzZXIgfHwgcGFyc2VyO1xuICAgICAgICB0aGlzLmVuY29kZXIgPSBuZXcgX3BhcnNlci5FbmNvZGVyKCk7XG4gICAgICAgIHRoaXMuZGVjb2RlciA9IG5ldyBfcGFyc2VyLkRlY29kZXIoKTtcbiAgICAgICAgdGhpcy5fYXV0b0Nvbm5lY3QgPSBvcHRzLmF1dG9Db25uZWN0ICE9PSBmYWxzZTtcbiAgICAgICAgaWYgKHRoaXMuX2F1dG9Db25uZWN0KVxuICAgICAgICAgICAgdGhpcy5vcGVuKCk7XG4gICAgfVxuICAgIHJlY29ubmVjdGlvbih2KSB7XG4gICAgICAgIGlmICghYXJndW1lbnRzLmxlbmd0aClcbiAgICAgICAgICAgIHJldHVybiB0aGlzLl9yZWNvbm5lY3Rpb247XG4gICAgICAgIHRoaXMuX3JlY29ubmVjdGlvbiA9ICEhdjtcbiAgICAgICAgcmV0dXJuIHRoaXM7XG4gICAgfVxuICAgIHJlY29ubmVjdGlvbkF0dGVtcHRzKHYpIHtcbiAgICAgICAgaWYgKHYgPT09IHVuZGVmaW5lZClcbiAgICAgICAgICAgIHJldHVybiB0aGlzLl9yZWNvbm5lY3Rpb25BdHRlbXB0cztcbiAgICAgICAgdGhpcy5fcmVjb25uZWN0aW9uQXR0ZW1wdHMgPSB2O1xuICAgICAgICByZXR1cm4gdGhpcztcbiAgICB9XG4gICAgcmVjb25uZWN0aW9uRGVsYXkodikge1xuICAgICAgICB2YXIgX2E7XG4gICAgICAgIGlmICh2ID09PSB1bmRlZmluZWQpXG4gICAgICAgICAgICByZXR1cm4gdGhpcy5fcmVjb25uZWN0aW9uRGVsYXk7XG4gICAgICAgIHRoaXMuX3JlY29ubmVjdGlvbkRlbGF5ID0gdjtcbiAgICAgICAgKF9hID0gdGhpcy5iYWNrb2ZmKSA9PT0gbnVsbCB8fCBfYSA9PT0gdm9pZCAwID8gdm9pZCAwIDogX2Euc2V0TWluKHYpO1xuICAgICAgICByZXR1cm4gdGhpcztcbiAgICB9XG4gICAgcmFuZG9taXphdGlvbkZhY3Rvcih2KSB7XG4gICAgICAgIHZhciBfYTtcbiAgICAgICAgaWYgKHYgPT09IHVuZGVmaW5lZClcbiAgICAgICAgICAgIHJldHVybiB0aGlzLl9yYW5kb21pemF0aW9uRmFjdG9yO1xuICAgICAgICB0aGlzLl9yYW5kb21pemF0aW9uRmFjdG9yID0gdjtcbiAgICAgICAgKF9hID0gdGhpcy5iYWNrb2ZmKSA9PT0gbnVsbCB8fCBfYSA9PT0gdm9pZCAwID8gdm9pZCAwIDogX2Euc2V0Sml0dGVyKHYpO1xuICAgICAgICByZXR1cm4gdGhpcztcbiAgICB9XG4gICAgcmVjb25uZWN0aW9uRGVsYXlNYXgodikge1xuICAgICAgICB2YXIgX2E7XG4gICAgICAgIGlmICh2ID09PSB1bmRlZmluZWQpXG4gICAgICAgICAgICByZXR1cm4gdGhpcy5fcmVjb25uZWN0aW9uRGVsYXlNYXg7XG4gICAgICAgIHRoaXMuX3JlY29ubmVjdGlvbkRlbGF5TWF4ID0gdjtcbiAgICAgICAgKF9hID0gdGhpcy5iYWNrb2ZmKSA9PT0gbnVsbCB8fCBfYSA9PT0gdm9pZCAwID8gdm9pZCAwIDogX2Euc2V0TWF4KHYpO1xuICAgICAgICByZXR1cm4gdGhpcztcbiAgICB9XG4gICAgdGltZW91dCh2KSB7XG4gICAgICAgIGlmICghYXJndW1lbnRzLmxlbmd0aClcbiAgICAgICAgICAgIHJldHVybiB0aGlzLl90aW1lb3V0O1xuICAgICAgICB0aGlzLl90aW1lb3V0ID0gdjtcbiAgICAgICAgcmV0dXJuIHRoaXM7XG4gICAgfVxuICAgIC8qKlxuICAgICAqIFN0YXJ0cyB0cnlpbmcgdG8gcmVjb25uZWN0IGlmIHJlY29ubmVjdGlvbiBpcyBlbmFibGVkIGFuZCB3ZSBoYXZlIG5vdFxuICAgICAqIHN0YXJ0ZWQgcmVjb25uZWN0aW5nIHlldFxuICAgICAqXG4gICAgICogQHByaXZhdGVcbiAgICAgKi9cbiAgICBtYXliZVJlY29ubmVjdE9uT3BlbigpIHtcbiAgICAgICAgLy8gT25seSB0cnkgdG8gcmVjb25uZWN0IGlmIGl0J3MgdGhlIGZpcnN0IHRpbWUgd2UncmUgY29ubmVjdGluZ1xuICAgICAgICBpZiAoIXRoaXMuX3JlY29ubmVjdGluZyAmJlxuICAgICAgICAgICAgdGhpcy5fcmVjb25uZWN0aW9uICYmXG4gICAgICAgICAgICB0aGlzLmJhY2tvZmYuYXR0ZW1wdHMgPT09IDApIHtcbiAgICAgICAgICAgIC8vIGtlZXBzIHJlY29ubmVjdGlvbiBmcm9tIGZpcmluZyB0d2ljZSBmb3IgdGhlIHNhbWUgcmVjb25uZWN0aW9uIGxvb3BcbiAgICAgICAgICAgIHRoaXMucmVjb25uZWN0KCk7XG4gICAgICAgIH1cbiAgICB9XG4gICAgLyoqXG4gICAgICogU2V0cyB0aGUgY3VycmVudCB0cmFuc3BvcnQgYHNvY2tldGAuXG4gICAgICpcbiAgICAgKiBAcGFyYW0ge0Z1bmN0aW9ufSBmbiAtIG9wdGlvbmFsLCBjYWxsYmFja1xuICAgICAqIEByZXR1cm4gc2VsZlxuICAgICAqIEBwdWJsaWNcbiAgICAgKi9cbiAgICBvcGVuKGZuKSB7XG4gICAgICAgIGlmICh+dGhpcy5fcmVhZHlTdGF0ZS5pbmRleE9mKFwib3BlblwiKSlcbiAgICAgICAgICAgIHJldHVybiB0aGlzO1xuICAgICAgICB0aGlzLmVuZ2luZSA9IG5ldyBFbmdpbmUodGhpcy51cmksIHRoaXMub3B0cyk7XG4gICAgICAgIGNvbnN0IHNvY2tldCA9IHRoaXMuZW5naW5lO1xuICAgICAgICBjb25zdCBzZWxmID0gdGhpcztcbiAgICAgICAgdGhpcy5fcmVhZHlTdGF0ZSA9IFwib3BlbmluZ1wiO1xuICAgICAgICB0aGlzLnNraXBSZWNvbm5lY3QgPSBmYWxzZTtcbiAgICAgICAgLy8gZW1pdCBgb3BlbmBcbiAgICAgICAgY29uc3Qgb3BlblN1YkRlc3Ryb3kgPSBvbihzb2NrZXQsIFwib3BlblwiLCBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICBzZWxmLm9ub3BlbigpO1xuICAgICAgICAgICAgZm4gJiYgZm4oKTtcbiAgICAgICAgfSk7XG4gICAgICAgIC8vIGVtaXQgYGVycm9yYFxuICAgICAgICBjb25zdCBlcnJvclN1YiA9IG9uKHNvY2tldCwgXCJlcnJvclwiLCAoZXJyKSA9PiB7XG4gICAgICAgICAgICBzZWxmLmNsZWFudXAoKTtcbiAgICAgICAgICAgIHNlbGYuX3JlYWR5U3RhdGUgPSBcImNsb3NlZFwiO1xuICAgICAgICAgICAgdGhpcy5lbWl0UmVzZXJ2ZWQoXCJlcnJvclwiLCBlcnIpO1xuICAgICAgICAgICAgaWYgKGZuKSB7XG4gICAgICAgICAgICAgICAgZm4oZXJyKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgICAgIC8vIE9ubHkgZG8gdGhpcyBpZiB0aGVyZSBpcyBubyBmbiB0byBoYW5kbGUgdGhlIGVycm9yXG4gICAgICAgICAgICAgICAgc2VsZi5tYXliZVJlY29ubmVjdE9uT3BlbigpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9KTtcbiAgICAgICAgaWYgKGZhbHNlICE9PSB0aGlzLl90aW1lb3V0KSB7XG4gICAgICAgICAgICBjb25zdCB0aW1lb3V0ID0gdGhpcy5fdGltZW91dDtcbiAgICAgICAgICAgIGlmICh0aW1lb3V0ID09PSAwKSB7XG4gICAgICAgICAgICAgICAgb3BlblN1YkRlc3Ryb3koKTsgLy8gcHJldmVudHMgYSByYWNlIGNvbmRpdGlvbiB3aXRoIHRoZSAnb3BlbicgZXZlbnRcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIC8vIHNldCB0aW1lclxuICAgICAgICAgICAgY29uc3QgdGltZXIgPSB0aGlzLnNldFRpbWVvdXRGbigoKSA9PiB7XG4gICAgICAgICAgICAgICAgb3BlblN1YkRlc3Ryb3koKTtcbiAgICAgICAgICAgICAgICBzb2NrZXQuY2xvc2UoKTtcbiAgICAgICAgICAgICAgICAvLyBAdHMtaWdub3JlXG4gICAgICAgICAgICAgICAgc29ja2V0LmVtaXQoXCJlcnJvclwiLCBuZXcgRXJyb3IoXCJ0aW1lb3V0XCIpKTtcbiAgICAgICAgICAgIH0sIHRpbWVvdXQpO1xuICAgICAgICAgICAgaWYgKHRoaXMub3B0cy5hdXRvVW5yZWYpIHtcbiAgICAgICAgICAgICAgICB0aW1lci51bnJlZigpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgdGhpcy5zdWJzLnB1c2goZnVuY3Rpb24gc3ViRGVzdHJveSgpIHtcbiAgICAgICAgICAgICAgICBjbGVhclRpbWVvdXQodGltZXIpO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgIH1cbiAgICAgICAgdGhpcy5zdWJzLnB1c2gob3BlblN1YkRlc3Ryb3kpO1xuICAgICAgICB0aGlzLnN1YnMucHVzaChlcnJvclN1Yik7XG4gICAgICAgIHJldHVybiB0aGlzO1xuICAgIH1cbiAgICAvKipcbiAgICAgKiBBbGlhcyBmb3Igb3BlbigpXG4gICAgICpcbiAgICAgKiBAcmV0dXJuIHNlbGZcbiAgICAgKiBAcHVibGljXG4gICAgICovXG4gICAgY29ubmVjdChmbikge1xuICAgICAgICByZXR1cm4gdGhpcy5vcGVuKGZuKTtcbiAgICB9XG4gICAgLyoqXG4gICAgICogQ2FsbGVkIHVwb24gdHJhbnNwb3J0IG9wZW4uXG4gICAgICpcbiAgICAgKiBAcHJpdmF0ZVxuICAgICAqL1xuICAgIG9ub3BlbigpIHtcbiAgICAgICAgLy8gY2xlYXIgb2xkIHN1YnNcbiAgICAgICAgdGhpcy5jbGVhbnVwKCk7XG4gICAgICAgIC8vIG1hcmsgYXMgb3BlblxuICAgICAgICB0aGlzLl9yZWFkeVN0YXRlID0gXCJvcGVuXCI7XG4gICAgICAgIHRoaXMuZW1pdFJlc2VydmVkKFwib3BlblwiKTtcbiAgICAgICAgLy8gYWRkIG5ldyBzdWJzXG4gICAgICAgIGNvbnN0IHNvY2tldCA9IHRoaXMuZW5naW5lO1xuICAgICAgICB0aGlzLnN1YnMucHVzaChvbihzb2NrZXQsIFwicGluZ1wiLCB0aGlzLm9ucGluZy5iaW5kKHRoaXMpKSwgb24oc29ja2V0LCBcImRhdGFcIiwgdGhpcy5vbmRhdGEuYmluZCh0aGlzKSksIG9uKHNvY2tldCwgXCJlcnJvclwiLCB0aGlzLm9uZXJyb3IuYmluZCh0aGlzKSksIG9uKHNvY2tldCwgXCJjbG9zZVwiLCB0aGlzLm9uY2xvc2UuYmluZCh0aGlzKSksIG9uKHRoaXMuZGVjb2RlciwgXCJkZWNvZGVkXCIsIHRoaXMub25kZWNvZGVkLmJpbmQodGhpcykpKTtcbiAgICB9XG4gICAgLyoqXG4gICAgICogQ2FsbGVkIHVwb24gYSBwaW5nLlxuICAgICAqXG4gICAgICogQHByaXZhdGVcbiAgICAgKi9cbiAgICBvbnBpbmcoKSB7XG4gICAgICAgIHRoaXMuZW1pdFJlc2VydmVkKFwicGluZ1wiKTtcbiAgICB9XG4gICAgLyoqXG4gICAgICogQ2FsbGVkIHdpdGggZGF0YS5cbiAgICAgKlxuICAgICAqIEBwcml2YXRlXG4gICAgICovXG4gICAgb25kYXRhKGRhdGEpIHtcbiAgICAgICAgdHJ5IHtcbiAgICAgICAgICAgIHRoaXMuZGVjb2Rlci5hZGQoZGF0YSk7XG4gICAgICAgIH1cbiAgICAgICAgY2F0Y2ggKGUpIHtcbiAgICAgICAgICAgIHRoaXMub25jbG9zZShcInBhcnNlIGVycm9yXCIpO1xuICAgICAgICB9XG4gICAgfVxuICAgIC8qKlxuICAgICAqIENhbGxlZCB3aGVuIHBhcnNlciBmdWxseSBkZWNvZGVzIGEgcGFja2V0LlxuICAgICAqXG4gICAgICogQHByaXZhdGVcbiAgICAgKi9cbiAgICBvbmRlY29kZWQocGFja2V0KSB7XG4gICAgICAgIHRoaXMuZW1pdFJlc2VydmVkKFwicGFja2V0XCIsIHBhY2tldCk7XG4gICAgfVxuICAgIC8qKlxuICAgICAqIENhbGxlZCB1cG9uIHNvY2tldCBlcnJvci5cbiAgICAgKlxuICAgICAqIEBwcml2YXRlXG4gICAgICovXG4gICAgb25lcnJvcihlcnIpIHtcbiAgICAgICAgdGhpcy5lbWl0UmVzZXJ2ZWQoXCJlcnJvclwiLCBlcnIpO1xuICAgIH1cbiAgICAvKipcbiAgICAgKiBDcmVhdGVzIGEgbmV3IHNvY2tldCBmb3IgdGhlIGdpdmVuIGBuc3BgLlxuICAgICAqXG4gICAgICogQHJldHVybiB7U29ja2V0fVxuICAgICAqIEBwdWJsaWNcbiAgICAgKi9cbiAgICBzb2NrZXQobnNwLCBvcHRzKSB7XG4gICAgICAgIGxldCBzb2NrZXQgPSB0aGlzLm5zcHNbbnNwXTtcbiAgICAgICAgaWYgKCFzb2NrZXQpIHtcbiAgICAgICAgICAgIHNvY2tldCA9IG5ldyBTb2NrZXQodGhpcywgbnNwLCBvcHRzKTtcbiAgICAgICAgICAgIHRoaXMubnNwc1tuc3BdID0gc29ja2V0O1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiBzb2NrZXQ7XG4gICAgfVxuICAgIC8qKlxuICAgICAqIENhbGxlZCB1cG9uIGEgc29ja2V0IGNsb3NlLlxuICAgICAqXG4gICAgICogQHBhcmFtIHNvY2tldFxuICAgICAqIEBwcml2YXRlXG4gICAgICovXG4gICAgX2Rlc3Ryb3koc29ja2V0KSB7XG4gICAgICAgIGNvbnN0IG5zcHMgPSBPYmplY3Qua2V5cyh0aGlzLm5zcHMpO1xuICAgICAgICBmb3IgKGNvbnN0IG5zcCBvZiBuc3BzKSB7XG4gICAgICAgICAgICBjb25zdCBzb2NrZXQgPSB0aGlzLm5zcHNbbnNwXTtcbiAgICAgICAgICAgIGlmIChzb2NrZXQuYWN0aXZlKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIHRoaXMuX2Nsb3NlKCk7XG4gICAgfVxuICAgIC8qKlxuICAgICAqIFdyaXRlcyBhIHBhY2tldC5cbiAgICAgKlxuICAgICAqIEBwYXJhbSBwYWNrZXRcbiAgICAgKiBAcHJpdmF0ZVxuICAgICAqL1xuICAgIF9wYWNrZXQocGFja2V0KSB7XG4gICAgICAgIGNvbnN0IGVuY29kZWRQYWNrZXRzID0gdGhpcy5lbmNvZGVyLmVuY29kZShwYWNrZXQpO1xuICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IGVuY29kZWRQYWNrZXRzLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgICAgICB0aGlzLmVuZ2luZS53cml0ZShlbmNvZGVkUGFja2V0c1tpXSwgcGFja2V0Lm9wdGlvbnMpO1xuICAgICAgICB9XG4gICAgfVxuICAgIC8qKlxuICAgICAqIENsZWFuIHVwIHRyYW5zcG9ydCBzdWJzY3JpcHRpb25zIGFuZCBwYWNrZXQgYnVmZmVyLlxuICAgICAqXG4gICAgICogQHByaXZhdGVcbiAgICAgKi9cbiAgICBjbGVhbnVwKCkge1xuICAgICAgICB0aGlzLnN1YnMuZm9yRWFjaCgoc3ViRGVzdHJveSkgPT4gc3ViRGVzdHJveSgpKTtcbiAgICAgICAgdGhpcy5zdWJzLmxlbmd0aCA9IDA7XG4gICAgICAgIHRoaXMuZGVjb2Rlci5kZXN0cm95KCk7XG4gICAgfVxuICAgIC8qKlxuICAgICAqIENsb3NlIHRoZSBjdXJyZW50IHNvY2tldC5cbiAgICAgKlxuICAgICAqIEBwcml2YXRlXG4gICAgICovXG4gICAgX2Nsb3NlKCkge1xuICAgICAgICB0aGlzLnNraXBSZWNvbm5lY3QgPSB0cnVlO1xuICAgICAgICB0aGlzLl9yZWNvbm5lY3RpbmcgPSBmYWxzZTtcbiAgICAgICAgdGhpcy5vbmNsb3NlKFwiZm9yY2VkIGNsb3NlXCIpO1xuICAgICAgICBpZiAodGhpcy5lbmdpbmUpXG4gICAgICAgICAgICB0aGlzLmVuZ2luZS5jbG9zZSgpO1xuICAgIH1cbiAgICAvKipcbiAgICAgKiBBbGlhcyBmb3IgY2xvc2UoKVxuICAgICAqXG4gICAgICogQHByaXZhdGVcbiAgICAgKi9cbiAgICBkaXNjb25uZWN0KCkge1xuICAgICAgICByZXR1cm4gdGhpcy5fY2xvc2UoKTtcbiAgICB9XG4gICAgLyoqXG4gICAgICogQ2FsbGVkIHVwb24gZW5naW5lIGNsb3NlLlxuICAgICAqXG4gICAgICogQHByaXZhdGVcbiAgICAgKi9cbiAgICBvbmNsb3NlKHJlYXNvbiwgZGVzY3JpcHRpb24pIHtcbiAgICAgICAgdGhpcy5jbGVhbnVwKCk7XG4gICAgICAgIHRoaXMuYmFja29mZi5yZXNldCgpO1xuICAgICAgICB0aGlzLl9yZWFkeVN0YXRlID0gXCJjbG9zZWRcIjtcbiAgICAgICAgdGhpcy5lbWl0UmVzZXJ2ZWQoXCJjbG9zZVwiLCByZWFzb24sIGRlc2NyaXB0aW9uKTtcbiAgICAgICAgaWYgKHRoaXMuX3JlY29ubmVjdGlvbiAmJiAhdGhpcy5za2lwUmVjb25uZWN0KSB7XG4gICAgICAgICAgICB0aGlzLnJlY29ubmVjdCgpO1xuICAgICAgICB9XG4gICAgfVxuICAgIC8qKlxuICAgICAqIEF0dGVtcHQgYSByZWNvbm5lY3Rpb24uXG4gICAgICpcbiAgICAgKiBAcHJpdmF0ZVxuICAgICAqL1xuICAgIHJlY29ubmVjdCgpIHtcbiAgICAgICAgaWYgKHRoaXMuX3JlY29ubmVjdGluZyB8fCB0aGlzLnNraXBSZWNvbm5lY3QpXG4gICAgICAgICAgICByZXR1cm4gdGhpcztcbiAgICAgICAgY29uc3Qgc2VsZiA9IHRoaXM7XG4gICAgICAgIGlmICh0aGlzLmJhY2tvZmYuYXR0ZW1wdHMgPj0gdGhpcy5fcmVjb25uZWN0aW9uQXR0ZW1wdHMpIHtcbiAgICAgICAgICAgIHRoaXMuYmFja29mZi5yZXNldCgpO1xuICAgICAgICAgICAgdGhpcy5lbWl0UmVzZXJ2ZWQoXCJyZWNvbm5lY3RfZmFpbGVkXCIpO1xuICAgICAgICAgICAgdGhpcy5fcmVjb25uZWN0aW5nID0gZmFsc2U7XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICBjb25zdCBkZWxheSA9IHRoaXMuYmFja29mZi5kdXJhdGlvbigpO1xuICAgICAgICAgICAgdGhpcy5fcmVjb25uZWN0aW5nID0gdHJ1ZTtcbiAgICAgICAgICAgIGNvbnN0IHRpbWVyID0gdGhpcy5zZXRUaW1lb3V0Rm4oKCkgPT4ge1xuICAgICAgICAgICAgICAgIGlmIChzZWxmLnNraXBSZWNvbm5lY3QpXG4gICAgICAgICAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICAgICAgICB0aGlzLmVtaXRSZXNlcnZlZChcInJlY29ubmVjdF9hdHRlbXB0XCIsIHNlbGYuYmFja29mZi5hdHRlbXB0cyk7XG4gICAgICAgICAgICAgICAgLy8gY2hlY2sgYWdhaW4gZm9yIHRoZSBjYXNlIHNvY2tldCBjbG9zZWQgaW4gYWJvdmUgZXZlbnRzXG4gICAgICAgICAgICAgICAgaWYgKHNlbGYuc2tpcFJlY29ubmVjdClcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAgICAgICAgIHNlbGYub3BlbigoZXJyKSA9PiB7XG4gICAgICAgICAgICAgICAgICAgIGlmIChlcnIpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHNlbGYuX3JlY29ubmVjdGluZyA9IGZhbHNlO1xuICAgICAgICAgICAgICAgICAgICAgICAgc2VsZi5yZWNvbm5lY3QoKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuZW1pdFJlc2VydmVkKFwicmVjb25uZWN0X2Vycm9yXCIsIGVycik7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBzZWxmLm9ucmVjb25uZWN0KCk7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIH0sIGRlbGF5KTtcbiAgICAgICAgICAgIGlmICh0aGlzLm9wdHMuYXV0b1VucmVmKSB7XG4gICAgICAgICAgICAgICAgdGltZXIudW5yZWYoKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHRoaXMuc3Vicy5wdXNoKGZ1bmN0aW9uIHN1YkRlc3Ryb3koKSB7XG4gICAgICAgICAgICAgICAgY2xlYXJUaW1lb3V0KHRpbWVyKTtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9XG4gICAgfVxuICAgIC8qKlxuICAgICAqIENhbGxlZCB1cG9uIHN1Y2Nlc3NmdWwgcmVjb25uZWN0LlxuICAgICAqXG4gICAgICogQHByaXZhdGVcbiAgICAgKi9cbiAgICBvbnJlY29ubmVjdCgpIHtcbiAgICAgICAgY29uc3QgYXR0ZW1wdCA9IHRoaXMuYmFja29mZi5hdHRlbXB0cztcbiAgICAgICAgdGhpcy5fcmVjb25uZWN0aW5nID0gZmFsc2U7XG4gICAgICAgIHRoaXMuYmFja29mZi5yZXNldCgpO1xuICAgICAgICB0aGlzLmVtaXRSZXNlcnZlZChcInJlY29ubmVjdFwiLCBhdHRlbXB0KTtcbiAgICB9XG59XG4iLCAiaW1wb3J0IHsgdXJsIH0gZnJvbSBcIi4vdXJsLmpzXCI7XG5pbXBvcnQgeyBNYW5hZ2VyIH0gZnJvbSBcIi4vbWFuYWdlci5qc1wiO1xuaW1wb3J0IHsgU29ja2V0IH0gZnJvbSBcIi4vc29ja2V0LmpzXCI7XG4vKipcbiAqIE1hbmFnZXJzIGNhY2hlLlxuICovXG5jb25zdCBjYWNoZSA9IHt9O1xuZnVuY3Rpb24gbG9va3VwKHVyaSwgb3B0cykge1xuICAgIGlmICh0eXBlb2YgdXJpID09PSBcIm9iamVjdFwiKSB7XG4gICAgICAgIG9wdHMgPSB1cmk7XG4gICAgICAgIHVyaSA9IHVuZGVmaW5lZDtcbiAgICB9XG4gICAgb3B0cyA9IG9wdHMgfHwge307XG4gICAgY29uc3QgcGFyc2VkID0gdXJsKHVyaSwgb3B0cy5wYXRoIHx8IFwiL3NvY2tldC5pb1wiKTtcbiAgICBjb25zdCBzb3VyY2UgPSBwYXJzZWQuc291cmNlO1xuICAgIGNvbnN0IGlkID0gcGFyc2VkLmlkO1xuICAgIGNvbnN0IHBhdGggPSBwYXJzZWQucGF0aDtcbiAgICBjb25zdCBzYW1lTmFtZXNwYWNlID0gY2FjaGVbaWRdICYmIHBhdGggaW4gY2FjaGVbaWRdW1wibnNwc1wiXTtcbiAgICBjb25zdCBuZXdDb25uZWN0aW9uID0gb3B0cy5mb3JjZU5ldyB8fFxuICAgICAgICBvcHRzW1wiZm9yY2UgbmV3IGNvbm5lY3Rpb25cIl0gfHxcbiAgICAgICAgZmFsc2UgPT09IG9wdHMubXVsdGlwbGV4IHx8XG4gICAgICAgIHNhbWVOYW1lc3BhY2U7XG4gICAgbGV0IGlvO1xuICAgIGlmIChuZXdDb25uZWN0aW9uKSB7XG4gICAgICAgIGlvID0gbmV3IE1hbmFnZXIoc291cmNlLCBvcHRzKTtcbiAgICB9XG4gICAgZWxzZSB7XG4gICAgICAgIGlmICghY2FjaGVbaWRdKSB7XG4gICAgICAgICAgICBjYWNoZVtpZF0gPSBuZXcgTWFuYWdlcihzb3VyY2UsIG9wdHMpO1xuICAgICAgICB9XG4gICAgICAgIGlvID0gY2FjaGVbaWRdO1xuICAgIH1cbiAgICBpZiAocGFyc2VkLnF1ZXJ5ICYmICFvcHRzLnF1ZXJ5KSB7XG4gICAgICAgIG9wdHMucXVlcnkgPSBwYXJzZWQucXVlcnlLZXk7XG4gICAgfVxuICAgIHJldHVybiBpby5zb2NrZXQocGFyc2VkLnBhdGgsIG9wdHMpO1xufVxuLy8gc28gdGhhdCBcImxvb2t1cFwiIGNhbiBiZSB1c2VkIGJvdGggYXMgYSBmdW5jdGlvbiAoZS5nLiBgaW8oLi4uKWApIGFuZCBhcyBhXG4vLyBuYW1lc3BhY2UgKGUuZy4gYGlvLmNvbm5lY3QoLi4uKWApLCBmb3IgYmFja3dhcmQgY29tcGF0aWJpbGl0eVxuT2JqZWN0LmFzc2lnbihsb29rdXAsIHtcbiAgICBNYW5hZ2VyLFxuICAgIFNvY2tldCxcbiAgICBpbzogbG9va3VwLFxuICAgIGNvbm5lY3Q6IGxvb2t1cCxcbn0pO1xuLyoqXG4gKiBQcm90b2NvbCB2ZXJzaW9uLlxuICpcbiAqIEBwdWJsaWNcbiAqL1xuZXhwb3J0IHsgcHJvdG9jb2wgfSBmcm9tIFwic29ja2V0LmlvLXBhcnNlclwiO1xuLyoqXG4gKiBFeHBvc2UgY29uc3RydWN0b3JzIGZvciBzdGFuZGFsb25lIGJ1aWxkLlxuICpcbiAqIEBwdWJsaWNcbiAqL1xuZXhwb3J0IHsgTWFuYWdlciwgU29ja2V0LCBsb29rdXAgYXMgaW8sIGxvb2t1cCBhcyBjb25uZWN0LCBsb29rdXAgYXMgZGVmYXVsdCwgfTtcbiIsICJpbXBvcnQgYXhpb3MgZnJvbSAnYXhpb3MnO1xuaW1wb3J0IHsgZ2FtZXNMaXN0LCBzZXRHYW1lc0xpc3QgfSBmcm9tICcuLi9kYXNoYm9hcmQnO1xuXG4vLyA9PT0gR0VUIHJvdXRlcyA9PT0gLy9cblxuZXhwb3J0IGFzeW5jIGZ1bmN0aW9uIGdldEdhbWVzKCkge1xuICAgIHRyeSB7XG4gICAgICAgIGNvbnN0IHJlcyA9IGF3YWl0IGF4aW9zLmdldCgnL2FwaS9kYXNoYm9hcmQnKTtcbiAgICAgICAgZ2FtZXNMaXN0LnZhbHVlID0gcmVzLmRhdGE7XG4gICAgICAgIHNldEdhbWVzTGlzdCgpO1xuICAgIH0gY2F0Y2ggKGVycikge1xuICAgICAgICBjb25zb2xlLmxvZyhlcnIpO1xuICAgIH1cbn1cblxuZXhwb3J0IGFzeW5jIGZ1bmN0aW9uIGdldFByZXZHYW1lKCkge1xuICAgIHRyeSB7XG4gICAgICAgIGNvbnN0IHJlcyA9IGF3YWl0IGF4aW9zLmdldCgnL2FwaS9kYXNoYm9hcmQvcHJldicpO1xuICAgICAgICByZXR1cm4gcmVzLmRhdGFbMF07XG4gICAgfSBjYXRjaCAoZXJyKSB7XG4gICAgICAgIGNvbnNvbGUubG9nKGVycik7XG4gICAgfVxufVxuXG4vLyA9PT0gUE9TVCByb3V0ZXMgPT09IC8vXG5cbmV4cG9ydCBhc3luYyBmdW5jdGlvbiBhZGRHYW1lKHBheWxvYWQ6IGFueSkge1xuICAgIHRyeSB7XG4gICAgICAgIGF3YWl0IGF4aW9zLnBvc3QoJy9hcGkvZGFzaGJvYXJkJywgcGF5bG9hZCk7XG4gICAgICAgIGdldEdhbWVzKCk7XG4gICAgfSBjYXRjaCAoZXJyKSB7XG4gICAgICAgIGNvbnNvbGUubG9nKGVycik7XG4gICAgfVxufVxuXG5leHBvcnQgYXN5bmMgZnVuY3Rpb24gYWRkUHJldkdhbWUocGF5bG9hZDogYW55KSB7XG4gICAgdHJ5IHtcbiAgICAgICAgYXdhaXQgYXhpb3MuZGVsZXRlKCcvYXBpL2Rhc2hib2FyZC9wcmV2JywgcGF5bG9hZCk7XG4gICAgICAgIGF3YWl0IGF4aW9zLnBvc3QoJy9hcGkvZGFzaGJvYXJkL3ByZXYnLCBwYXlsb2FkKTtcbiAgICB9IGNhdGNoIChlcnIpIHtcbiAgICAgICAgY29uc29sZS5sb2coZXJyKTtcbiAgICB9XG59IiwgImltcG9ydCBheGlvcyBmcm9tICdheGlvcyc7XG5pbXBvcnQgeyBjdXN0b21DcmVhdHVyZXMsIGNyZWF0dXJlcywgY3JlYXR1cmVzT3BlbiwgdG9nZ2xlQ3JlYXR1cmVzV2luZG93IH0gZnJvbSAnLi4vY3JlYXR1cmVzJztcbmltcG9ydCB7IGdldEFjdGlvbkRlc2MsIHNlcGFyYXRlRG1nUm9sbCB9IGZyb20gJy4uL2NyZWF0dXJlLXN0YXRzJztcblxuLy8gPT09IEdFVCByb3V0ZXMgPT09IC8vXG5cbmV4cG9ydCBhc3luYyBmdW5jdGlvbiBnZXRDcmVhdHVyZXMoKSB7XG4gICAgdHJ5IHtcbiAgICAgICAgY29uc3QgcmVzID0gYXdhaXQgYXhpb3MuZ2V0KCdodHRwczovL3d3dy5kbmQ1ZWFwaS5jby9hcGkvbW9uc3RlcnMnKTtcbiAgICAgICAgY3JlYXR1cmVzLnZhbHVlID0gcmVzLmRhdGEucmVzdWx0cztcbiAgICB9IGNhdGNoIChlcnIpIHtcbiAgICAgICAgY29uc29sZS5sb2coZXJyKTtcbiAgICB9XG59XG5cbmV4cG9ydCBhc3luYyBmdW5jdGlvbiBnZXRDcmVhdHVyZUJ5SW5kZXgoaW5kZXg6IHN0cmluZywgY3VzdG9tOiBib29sZWFuKSB7XG4gICAgdHJ5IHtcbiAgICAgICAgaWYgKGN1c3RvbSkge1xuICAgICAgICAgICAgY29uc3QgcmVzID0gYXdhaXQgYXhpb3MuZ2V0KGAvYXBpL2NyZWF0dXJlcy8ke2luZGV4fWApO1xuICAgICAgICAgICAgcmV0dXJuIG1vZGlmeVJlc3BvbnNlQ3JlYXR1cmUocmVzKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIGNvbnN0IHJlcyA9IGF3YWl0IGF4aW9zLmdldChgaHR0cHM6Ly93d3cuZG5kNWVhcGkuY28vYXBpL21vbnN0ZXJzLyR7aW5kZXh9YCk7XG4gICAgICAgICAgICByZXR1cm4gbW9kaWZ5UmVzcG9uc2VTdGFuZGFyZENyZWF0dXJlKHJlcyk7XG4gICAgICAgIH1cbiAgICB9IGNhdGNoIChlcnIpIHtcbiAgICAgICAgY29uc29sZS5sb2coZXJyKTtcbiAgICB9XG59XG5cbmZ1bmN0aW9uIG1vZGlmeVJlc3BvbnNlU3RhbmRhcmRDcmVhdHVyZShyZXM6IGFueSkge1xuICAgIC8vIEdldHMgYWxsIHRoZSBhcnJheXMgb2YgY3JlYXR1cmUgZGF0YVxuICAgIGNvbnN0IHsgcHJvZmljaWVuY2llcywgY29uZGl0aW9uX2ltbXVuaXRpZXMsIHNlbnNlcywgc3BlY2lhbF9hYmlsaXRpZXMsIGFjdGlvbnMsIGxlZ2VuZGFyeV9hY3Rpb25zIH0gPSBzZXBhcmF0ZVN0YW5kYXJkQ3JlYXR1cmVSZXNwb25zZShyZXMuZGF0YSk7XG4gICAgY29uc3QgbW9kaWZpZWRSZXMgPSBuZXcgQ3JlYXR1cmUoXG4gICAgICAgIG51bGwsXG4gICAgICAgIG51bGwsXG4gICAgICAgIHJlcy5kYXRhLmluZGV4LFxuICAgICAgICByZXMuZGF0YS5uYW1lLFxuICAgICAgICByZXMuZGF0YS5zaXplLFxuICAgICAgICByZXMuZGF0YS50eXBlLFxuICAgICAgICByZXMuZGF0YS5hbGlnbm1lbnQsXG4gICAgICAgIHJlcy5kYXRhLmFybW9yX2NsYXNzLFxuICAgICAgICByZXMuZGF0YS5oaXRfcG9pbnRzLFxuICAgICAgICByZXMuZGF0YS5oaXRfZGljZSxcbiAgICAgICAgcmVzLmRhdGEuc3RyZW5ndGgsXG4gICAgICAgIHJlcy5kYXRhLmRleHRlcml0eSxcbiAgICAgICAgcmVzLmRhdGEuY29uc3RpdHV0aW9uLFxuICAgICAgICByZXMuZGF0YS5pbnRlbGxpZ2VuY2UsXG4gICAgICAgIHJlcy5kYXRhLndpc2RvbSxcbiAgICAgICAgcmVzLmRhdGEuY2hhcmlzbWEsXG4gICAgICAgIHJlcy5kYXRhLmNoYWxsZW5nZV9yYXRpbmcsXG4gICAgICAgIHJlcy5kYXRhLnhwLFxuICAgICAgICByZXMuZGF0YS5sYW5ndWFnZXMsXG4gICAgICAgIHJlbW92ZVVuaXRGcm9tU3RyaW5nKHJlcy5kYXRhLnNwZWVkLndhbGspLFxuICAgICAgICByZW1vdmVVbml0RnJvbVN0cmluZyhyZXMuZGF0YS5zcGVlZC5zd2ltKSxcbiAgICAgICAgcmVtb3ZlVW5pdEZyb21TdHJpbmcocmVzLmRhdGEuc3BlZWQuYnVycm93KSxcbiAgICAgICAgcmVtb3ZlVW5pdEZyb21TdHJpbmcocmVzLmRhdGEuc3BlZWQuZmx5KSxcbiAgICAgICAgcmVtb3ZlVW5pdEZyb21TdHJpbmcocmVzLmRhdGEuc3BlZWQuY2xpbWIpLFxuICAgICAgICBwcm9maWNpZW5jaWVzLFxuICAgICAgICByZXMuZGF0YS5kYW1hZ2VfdnVsbmVyYWJpbGl0aWVzLFxuICAgICAgICByZXMuZGF0YS5kYW1hZ2VfcmVzaXN0YW5jZXMsXG4gICAgICAgIHJlcy5kYXRhLmRhbWFnZV9pbW11bml0aWVzLFxuICAgICAgICBjb25kaXRpb25faW1tdW5pdGllcyxcbiAgICAgICAgc2Vuc2VzLFxuICAgICAgICBzcGVjaWFsX2FiaWxpdGllcyxcbiAgICAgICAgYWN0aW9ucyxcbiAgICAgICAgbGVnZW5kYXJ5X2FjdGlvbnNcbiAgICApO1xuICAgIGNvbnNvbGUubG9nKG1vZGlmaWVkUmVzKTtcbiAgICByZXR1cm4gbW9kaWZpZWRSZXM7XG59XG5cbmZ1bmN0aW9uIHNlcGFyYXRlU3RhbmRhcmRDcmVhdHVyZVJlc3BvbnNlKHJlczogYW55KSB7XG4gICAgY29uc3QgcHJvZmljaWVuY2llcyA9IGdldENyZWF0dXJlUHJvZmljaWVuY2llcyhyZXMucHJvZmljaWVuY2llcyk7XG4gICAgY29uc3QgY29uZGl0aW9uX2ltbXVuaXRpZXMgPSBnZXRDcmVhdHVyZUNvbmRpdGlvbkltbXVuaXRpZXMocmVzLmNvbmRpdGlvbl9pbW11bml0aWVzKTtcbiAgICBjb25zdCBzZW5zZXMgPSBnZXRDcmVhdHVyZVNlbnNlcyhyZXMuc2Vuc2VzKTtcbiAgICBjb25zdCBzcGVjaWFsX2FiaWxpdGllcyA9IGdldENyZWF0dXJlQWJpbGl0aWVzKHJlcy5zcGVjaWFsX2FiaWxpdGllcyk7XG4gICAgY29uc3QgYWN0aW9ucyA9IGdldENyZWF0dXJlQWN0aW9ucyhyZXMuYWN0aW9ucyk7XG4gICAgY29uc3QgbGVnZW5kYXJ5X2FjdGlvbnMgPSBnZXRDcmVhdHVyZUxlZ2VuZGFyeUFjdGlvbnMocmVzLmxlZ2VuZGFyeV9hY3Rpb25zKTtcblxuICAgIHJldHVybiB7cHJvZmljaWVuY2llczogcHJvZmljaWVuY2llcywgY29uZGl0aW9uX2ltbXVuaXRpZXM6IGNvbmRpdGlvbl9pbW11bml0aWVzLCBzZW5zZXM6IHNlbnNlcywgc3BlY2lhbF9hYmlsaXRpZXM6IHNwZWNpYWxfYWJpbGl0aWVzLCBhY3Rpb25zOiBhY3Rpb25zLCBsZWdlbmRhcnlfYWN0aW9uczogbGVnZW5kYXJ5X2FjdGlvbnN9O1xufVxuXG5mdW5jdGlvbiBnZXRDcmVhdHVyZVByb2ZpY2llbmNpZXMoX3Byb2ZpY2llbmNpZXM6IGFueSkge1xuICAgIGxldCBwcm9maWNpZW5jaWVzID0gW107XG4gICAgaWYgKF9wcm9maWNpZW5jaWVzLmxlbmd0aCA+IDApIHtcbiAgICAgICAgX3Byb2ZpY2llbmNpZXMuZm9yRWFjaCgocHJvZjogYW55KSA9PiB7XG4gICAgICAgICAgICBwcm9maWNpZW5jaWVzLnB1c2goe25hbWU6IHByb2YucHJvZmljaWVuY3kubmFtZSwgdmFsdWU6IHByb2YudmFsdWV9KTtcbiAgICAgICAgfSk7XG4gICAgfVxuICAgIHJldHVybiBwcm9maWNpZW5jaWVzO1xufVxuXG5mdW5jdGlvbiBnZXRDcmVhdHVyZUNvbmRpdGlvbkltbXVuaXRpZXMoX2NvbmRpdGlvbl9pbW11bml0aWVzOiBhbnkpIHtcbiAgICBsZXQgY29uZGl0aW9uX2ltbXVuaXRpZXMgPSBbXTtcbiAgICBpZiAoX2NvbmRpdGlvbl9pbW11bml0aWVzLmxlbmd0aCA+IDApIHtcbiAgICAgICAgX2NvbmRpdGlvbl9pbW11bml0aWVzLmZvckVhY2goKGltbXVuaXR5OiBhbnkpID0+IHtcbiAgICAgICAgICAgIGNvbmRpdGlvbl9pbW11bml0aWVzLnB1c2goaW1tdW5pdHkubmFtZSk7XG4gICAgICAgIH0pO1xuICAgIH1cbiAgICByZXR1cm4gY29uZGl0aW9uX2ltbXVuaXRpZXM7XG59XG5cbmZ1bmN0aW9uIGdldENyZWF0dXJlU2Vuc2VzKF9zZW5zZXMpIHsgXG4gICAgbGV0IHNlbnNlcyA9IFtdOyAgIFxuICAgIGlmIChfc2Vuc2VzLmRhcmt2aXNpb24pIHNlbnNlcy5wdXNoKHtuYW1lOiAnRGFya3Zpc2lvbicsIHZhbHVlOiByZW1vdmVVbml0RnJvbVN0cmluZyhfc2Vuc2VzLmRhcmt2aXNpb24pfSk7XG4gICAgaWYgKF9zZW5zZXMuYmxpbmRzaWdodCkgc2Vuc2VzLnB1c2goe25hbWU6ICdCbGluZHNpZ2h0JywgdmFsdWU6IHJlbW92ZVVuaXRGcm9tU3RyaW5nKF9zZW5zZXMuYmxpbmRzaWdodCl9KTtcbiAgICBpZiAoX3NlbnNlcy50cmVtb3JzZW5zZSkgc2Vuc2VzLnB1c2goe25hbWU6ICdUcmVtb3JzZW5zZScsIHZhbHVlOiByZW1vdmVVbml0RnJvbVN0cmluZyhfc2Vuc2VzLnRyZW1vcnNlbnNlKX0pO1xuICAgIGlmIChfc2Vuc2VzLnRydWVzaWdodCkgc2Vuc2VzLnB1c2goe25hbWU6ICdUcnVlc2lnaHQnLCB2YWx1ZTogcmVtb3ZlVW5pdEZyb21TdHJpbmcoX3NlbnNlcy50cnVlc2lnaHQpfSk7XG4gICAgaWYgKF9zZW5zZXMucGFzc2l2ZV9wZXJjZXB0aW9uKSBzZW5zZXMucHVzaCh7bmFtZTogJ1Bhc3NpdmUgUGVyY2VwdGlvbicsIHZhbHVlOiBfc2Vuc2VzLnBhc3NpdmVfcGVyY2VwdGlvbn0pO1xuICAgIHJldHVybiBzZW5zZXM7XG59XG5cbmZ1bmN0aW9uIGdldENyZWF0dXJlQWJpbGl0aWVzKF9zcGVjaWFsX2FiaWxpdGllczogYW55KSB7XG4gICAgbGV0IHNwZWNpYWxfYWJpbGl0aWVzID0gW107XG4gICAgaWYgKF9zcGVjaWFsX2FiaWxpdGllcy5sZW5ndGggPiAwKSB7XG4gICAgICAgIF9zcGVjaWFsX2FiaWxpdGllcy5mb3JFYWNoKChhYmlsaXR5OiBhbnkpID0+IHtcbiAgICAgICAgICAgIHNwZWNpYWxfYWJpbGl0aWVzLnB1c2goe25hbWU6IGFiaWxpdHkubmFtZSwgZGVzYzogYWJpbGl0eS5kZXNjLCBkYW1hZ2U6IHN0YW5kYXJkQ3JlYXR1cmVEYW1hZ2UoYWJpbGl0eS5kYW1hZ2UpfSk7XG4gICAgICAgIH0pO1xuICAgIH1cbiAgICByZXR1cm4gc3BlY2lhbF9hYmlsaXRpZXM7XG59XG5cbmZ1bmN0aW9uIGdldENyZWF0dXJlQWN0aW9ucyhfYWN0aW9uczogYW55KSB7XG4gICAgbGV0IGFjdGlvbnMgPSBbXTtcbiAgICBpZiAoX2FjdGlvbnMubGVuZ3RoID4gMCkge1xuICAgICAgICBfYWN0aW9ucy5mb3JFYWNoKChhY3Rpb246IGFueSkgPT4ge1xuICAgICAgICAgICAgYWN0aW9ucy5wdXNoKHtuYW1lOiBhY3Rpb24ubmFtZSwgZGVzYzogYWN0aW9uLmRlc2MsIGF0dGFja19ib251czogYWN0aW9uLmF0dGFja19ib251cywgZGFtYWdlOiBzdGFuZGFyZENyZWF0dXJlRGFtYWdlKGFjdGlvbi5kYW1hZ2UpfSk7XG4gICAgICAgIH0pO1xuICAgIH1cblxuICAgIHJldHVybiBhY3Rpb25zO1xufVxuXG5mdW5jdGlvbiBnZXRDcmVhdHVyZUxlZ2VuZGFyeUFjdGlvbnMoX2xlZ2VuZGFyeV9hY3Rpb25zOiBhbnkpIHtcbiAgICBsZXQgbGVnZW5kYXJ5X2FjdGlvbnMgPSBbXTtcbiAgICBpZiAoX2xlZ2VuZGFyeV9hY3Rpb25zLmxlbmd0aCA+IDApIHtcbiAgICAgICAgX2xlZ2VuZGFyeV9hY3Rpb25zLmZvckVhY2goKGFjdGlvbjogYW55KSA9PiB7XG4gICAgICAgICAgICBsZWdlbmRhcnlfYWN0aW9ucy5wdXNoKHtuYW1lOiBhY3Rpb24ubmFtZSwgZGVzYzogYWN0aW9uLmRlc2MsIGF0dGFja19ib251czogYWN0aW9uLmF0dGFja19ib251cywgZGFtYWdlOiBzdGFuZGFyZENyZWF0dXJlRGFtYWdlKGFjdGlvbi5kYW1hZ2UpfSk7XG4gICAgICAgIH0pO1xuICAgIH1cbiAgICByZXR1cm4gbGVnZW5kYXJ5X2FjdGlvbnM7XG59XG5cbi8vIEdldHMgdGhlIGRhbWFnZSBkaWNlIGFuZCBkYW1hZ2UgdHlwZSBmcm9tIGEgc3RhbmRhcmQgY3JlYXR1cmVcbmZ1bmN0aW9uIHN0YW5kYXJkQ3JlYXR1cmVEYW1hZ2UoZGFtYWdlOiBhbnkpIHtcbiAgICBsZXQgZGFtYWdlcyA9IFtdO1xuICAgIGlmIChkYW1hZ2UpIHtcbiAgICAgICAgZGFtYWdlLmZvckVhY2goKGRtZzogYW55KSA9PiB7XG4gICAgICAgICAgICBpZiAoZG1nLmZyb20pIHtcbiAgICAgICAgICAgICAgICBkbWcuZnJvbS5vcHRpb25zLmZvckVhY2goKGRtZykgPT4ge1xuICAgICAgICAgICAgICAgICAgICBkYW1hZ2VzLnB1c2goe2RhbWFnZURpY2U6IGRtZy5kYW1hZ2VfZGljZSwgZGFtYWdlVHlwZTogZG1nLmRhbWFnZV90eXBlLmluZGV4fSk7XG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIGRhbWFnZXMucHVzaCh7ZGFtYWdlRGljZTogZG1nLmRhbWFnZV9kaWNlLCBkYW1hZ2VUeXBlOiBkbWcuZGFtYWdlX3R5cGUuaW5kZXh9KTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSk7XG4gICAgfVxuICAgIHJldHVybiBkYW1hZ2VzO1xufVxuXG4vLyBSZW1vdmVzIGZ0IGFuZCB0dXJucyByZXR1cm5zIGEgbnVtYmVyIHZhbHVlXG5mdW5jdGlvbiByZW1vdmVVbml0RnJvbVN0cmluZyhzdHJpbmc6IHN0cmluZykge1xuICAgIGxldCB2YWx1ZTogbnVtYmVyO1xuICAgIGlmIChzdHJpbmcpIHtcbiAgICAgICAgdmFsdWUgPSBwYXJzZUludChzdHJpbmcuc3BsaXQoJyAnKVswXSk7XG4gICAgICAgIHJldHVybiB2YWx1ZTtcbiAgICB9XG59XG5cbmZ1bmN0aW9uIG1vZGlmeVJlc3BvbnNlQ3JlYXR1cmUocmVzOiBhbnkpIHtcbiAgICAvLyBHZXRzIGFsbCB0aGUgYXJyYXlzIG9mIGNyZWF0dXJlIGRhdGFcbiAgICBjb25zdCB7IHByb2ZpY2llbmNpZXMsIHZ1bG5lcmFiaWxpdGllcywgcmVzaXN0YW5jZXMsIGRhbWFnZUltbXVuaXRpZXMsIGNvbmRpdGlvbkltbXVuaXRpZXMsIHNlbnNlcywgYWJpbGl0aWVzLCBhY3Rpb25zLCBsZWdBY3Rpb25zIH0gPSBzZXBhcmF0ZUNyZWF0dXJlUmVzcG9uc2UocmVzLmRhdGEpO1xuXG4gICAgY29uc3QgbW9kaWZpZWRSZXMgPSBuZXcgQ3JlYXR1cmUoXG4gICAgICAgIHJlcy5kYXRhWzBdLmlkLFxuICAgICAgICByZXMuZGF0YVswXS51c2VyX2lkLFxuICAgICAgICByZXMuZGF0YVswXS5pbmRleCxcbiAgICAgICAgcmVzLmRhdGFbMF0ubmFtZSxcbiAgICAgICAgcmVzLmRhdGFbMF0uc2l6ZSxcbiAgICAgICAgcmVzLmRhdGFbMF0udHlwZSxcbiAgICAgICAgcmVzLmRhdGFbMF0uYWxpZ25tZW50LFxuICAgICAgICByZXMuZGF0YVswXS5hYyxcbiAgICAgICAgcmVzLmRhdGFbMF0uaGl0X3BvaW50cyxcbiAgICAgICAgcmVzLmRhdGFbMF0uaGl0X2RpY2UsXG4gICAgICAgIHJlcy5kYXRhWzBdLnN0cixcbiAgICAgICAgcmVzLmRhdGFbMF0uZGV4LFxuICAgICAgICByZXMuZGF0YVswXS5jb24sXG4gICAgICAgIHJlcy5kYXRhWzBdLmludCxcbiAgICAgICAgcmVzLmRhdGFbMF0ud2lzLFxuICAgICAgICByZXMuZGF0YVswXS5jaGFyLFxuICAgICAgICByZXMuZGF0YVswXS5jcixcbiAgICAgICAgcmVzLmRhdGFbMF0ueHAsXG4gICAgICAgIHJlcy5kYXRhWzBdLmxpc3QsXG4gICAgICAgIHJlcy5kYXRhWzBdLndhbGtfc3BlZWQsXG4gICAgICAgIHJlcy5kYXRhWzBdLnN3aW1fc3BlZWQsXG4gICAgICAgIHJlcy5kYXRhWzBdLmJ1cnJvd19zcGVlZCxcbiAgICAgICAgcmVzLmRhdGFbMF0uZmx5X3NwZWVkLFxuICAgICAgICByZXMuZGF0YVswXS5jbGltYl9zcGVlZCxcbiAgICAgICAgcHJvZmljaWVuY2llcyxcbiAgICAgICAgdnVsbmVyYWJpbGl0aWVzLFxuICAgICAgICByZXNpc3RhbmNlcyxcbiAgICAgICAgZGFtYWdlSW1tdW5pdGllcyxcbiAgICAgICAgY29uZGl0aW9uSW1tdW5pdGllcyxcbiAgICAgICAgc2Vuc2VzLFxuICAgICAgICBhYmlsaXRpZXMsXG4gICAgICAgIGFjdGlvbnMsXG4gICAgICAgIGxlZ0FjdGlvbnNcbiAgICApO1xuICAgIGNvbnNvbGUubG9nKG1vZGlmaWVkUmVzKTtcbiAgICByZXR1cm4gbW9kaWZpZWRSZXM7XG59XG5cbi8vIFNlcGFyYXRlIGRpZmZlcmVudCBwYXJ0cyBvZiB0aGUgcmVzcG9uc2UgaW50byBhcnJheXNcbmZ1bmN0aW9uIHNlcGFyYXRlQ3JlYXR1cmVSZXNwb25zZShyZXM6IGFueSkge1xuICAgIGxldCB7IHByb2ZpY2llbmNpZXMsIHZ1bG5lcmFiaWxpdGllcywgcmVzaXN0YW5jZXMsIGRhbWFnZUltbXVuaXRpZXMsIGNvbmRpdGlvbkltbXVuaXRpZXMsIHNlbnNlcywgYWJpbGl0aWVzLCBhY3Rpb25zLCBsZWdBY3Rpb25zIH0gPSBnZXRJbml0aWFsQ3JlYXR1cmVBcnJheXMocmVzKTtcbiAgICBcbiAgICBwcm9maWNpZW5jaWVzID0gcmVtb3ZlRXh0cmFDdXN0b21EYXRhKHByb2ZpY2llbmNpZXMsIHRydWUpO1xuICAgIHZ1bG5lcmFiaWxpdGllcyA9IHJlbW92ZUV4dHJhQ3VzdG9tRGF0YSh2dWxuZXJhYmlsaXRpZXMsIGZhbHNlKTtcbiAgICByZXNpc3RhbmNlcyA9IHJlbW92ZUV4dHJhQ3VzdG9tRGF0YShyZXNpc3RhbmNlcywgZmFsc2UpO1xuICAgIGRhbWFnZUltbXVuaXRpZXMgPSByZW1vdmVFeHRyYUN1c3RvbURhdGEoZGFtYWdlSW1tdW5pdGllcywgZmFsc2UpO1xuICAgIGNvbmRpdGlvbkltbXVuaXRpZXMgPSByZW1vdmVFeHRyYUN1c3RvbURhdGEoY29uZGl0aW9uSW1tdW5pdGllcywgZmFsc2UpO1xuICAgIHNlbnNlcyA9IHJlbW92ZUV4dHJhQ3VzdG9tRGF0YShzZW5zZXMsIHRydWUpO1xuICAgIGFiaWxpdGllcyA9IHJlbW92ZUV4dHJhQ3VzdG9tRGF0YShhYmlsaXRpZXMsIHRydWUpO1xuICAgIGFjdGlvbnMgPSByZW1vdmVFeHRyYUN1c3RvbURhdGEoYWN0aW9ucywgdHJ1ZSk7XG4gICAgbGVnQWN0aW9ucyA9IHJlbW92ZUV4dHJhQ3VzdG9tRGF0YShsZWdBY3Rpb25zLCB0cnVlKTtcblxuICAgIC8vIEdldCBhYmlsaXR5IHJvbGxzXG4gICAgbGV0IG1vZGlmaWVkQWJpbGl0aWVzID0gW107XG4gICAgYWJpbGl0aWVzLmZvckVhY2goKGFiaWxpdHkpID0+IHtcbiAgICAgICAgaWYgKGFiaWxpdHkubmFtZSAmJiBhYmlsaXR5LmRlc2MpIHtcbiAgICAgICAgICAgIGNvbnN0IGFiaWxpdHlEYXRhID0gZ2V0QWN0aW9uRGVzYyhhYmlsaXR5LmRlc2MpO1xuICAgICAgICAgICAgbW9kaWZpZWRBYmlsaXRpZXMucHVzaCh7bmFtZTogYWJpbGl0eS5uYW1lLCBkZXNjOiBhYmlsaXR5RGF0YS5kZXNjLCBkYW1hZ2U6IFtzZXBhcmF0ZURtZ1JvbGwoYWJpbGl0eURhdGEucm9sbHMudG9TdHJpbmcoKSldfSk7XG4gICAgICAgIH1cbiAgICB9KTtcbiAgICBhYmlsaXRpZXMgPSBtb2RpZmllZEFiaWxpdGllcztcblxuICAgIC8vIEdldCBhY3Rpb24gcm9sbHNcbiAgICBsZXQgbW9kaWZpZWRBY3Rpb25zID0gW107XG4gICAgYWN0aW9ucy5mb3JFYWNoKChhY3Rpb24pID0+IHtcbiAgICAgICAgaWYgKGFjdGlvbi5uYW1lICYmIGFjdGlvbi5kZXNjKSB7XG4gICAgICAgICAgICBjb25zdCBhY3Rpb25EYXRhID0gZ2V0QWN0aW9uRGVzYyhhY3Rpb24uZGVzYyk7XG4gICAgICAgICAgICBtb2RpZmllZEFjdGlvbnMucHVzaCh7bmFtZTogYWN0aW9uLm5hbWUsIGRlc2M6IGFjdGlvbkRhdGEuZGVzYywgYXR0YWNrX2JvbnVzOiBhY3Rpb25EYXRhLnRvSGl0LCBkYW1hZ2U6IFtzZXBhcmF0ZURtZ1JvbGwoYWN0aW9uRGF0YS5yb2xscy50b1N0cmluZygpKV19KTtcbiAgICAgICAgfVxuICAgIH0pO1xuICAgIGFjdGlvbnMgPSBtb2RpZmllZEFjdGlvbnM7XG5cbiAgICAvLyBHZXQgbGVnZW5kYXJ5IGFjdGlvbiByb2xsc1xuICAgIGxldCBtb2RpZmllZExlZ0FjdGlvbnMgPSBbXTtcbiAgICBsZWdBY3Rpb25zLmZvckVhY2goKGFjdGlvbikgPT4ge1xuICAgICAgICBpZiAoYWN0aW9uLm5hbWUgJiYgYWN0aW9uLmRlc2MpIHtcbiAgICAgICAgICAgIGNvbnN0IGxlZ0FjdGlvbkRhdGEgPSBnZXRBY3Rpb25EZXNjKGFjdGlvbi5kZXNjKTtcbiAgICAgICAgICAgIG1vZGlmaWVkTGVnQWN0aW9ucy5wdXNoKHtuYW1lOiBhY3Rpb24ubmFtZSwgZGVzYzogbGVnQWN0aW9uRGF0YS5kZXNjLCBhdHRhY2tfYm9udXM6IGxlZ0FjdGlvbkRhdGEudG9IaXQsIGRhbWFnZTogW3NlcGFyYXRlRG1nUm9sbChsZWdBY3Rpb25EYXRhLnJvbGxzLnRvU3RyaW5nKCkpXX0pO1xuICAgICAgICB9XG4gICAgfSk7XG4gICAgbGVnQWN0aW9ucyA9IG1vZGlmaWVkTGVnQWN0aW9ucztcblxuICAgIGNvbnN0IHtfcHJvZmljaWVuY2llcywgX3Jlc2lzdGFuY2VzLCBfdnVsbmVyYWJpbGl0aWVzLCBfc2Vuc2VzfSA9IGVtcHR5TnVsbEFycmF5cyhwcm9maWNpZW5jaWVzLCByZXNpc3RhbmNlcywgdnVsbmVyYWJpbGl0aWVzLCBzZW5zZXMpO1xuICAgIHJldHVybiB7cHJvZmljaWVuY2llczogX3Byb2ZpY2llbmNpZXMsIHZ1bG5lcmFiaWxpdGllczogX3Z1bG5lcmFiaWxpdGllcywgcmVzaXN0YW5jZXM6IF9yZXNpc3RhbmNlcywgZGFtYWdlSW1tdW5pdGllczogZGFtYWdlSW1tdW5pdGllcywgY29uZGl0aW9uSW1tdW5pdGllczogY29uZGl0aW9uSW1tdW5pdGllcywgc2Vuc2VzOiBfc2Vuc2VzLCBhYmlsaXRpZXM6IGFiaWxpdGllcywgYWN0aW9uczogYWN0aW9ucywgbGVnQWN0aW9uczogbGVnQWN0aW9uc307XG59XG5cbi8vIFB1c2hlcyBhbGwgY3JlYXR1cmVzIGRhdGEgaW50byB0aGVpciByZXNwZWN0aXZlIGFycmF5cyBhbmQgcmV0dXJucyB0aGVtLlxuZnVuY3Rpb24gZ2V0SW5pdGlhbENyZWF0dXJlQXJyYXlzKHJlczogYW55KSB7XG4gICAgbGV0IHByb2ZpY2llbmNpZXMgPSBbXTtcbiAgICBsZXQgdnVsbmVyYWJpbGl0aWVzID0gW107XG4gICAgbGV0IHJlc2lzdGFuY2VzID0gW107XG4gICAgbGV0IGRhbWFnZUltbXVuaXRpZXMgPSBbXTtcbiAgICBsZXQgY29uZGl0aW9uSW1tdW5pdGllcyA9IFtdO1xuICAgIGxldCBzZW5zZXMgPSBbXTtcbiAgICBsZXQgYWJpbGl0aWVzID0gW107XG4gICAgbGV0IGFjdGlvbnMgPSBbXTtcbiAgICBsZXQgbGVnQWN0aW9ucyA9IFtdO1xuXG4gICAgZm9yIChsZXQgc3RhdCBvZiByZXMpIHtcbiAgICAgICAgcHJvZmljaWVuY2llcy5wdXNoKHtuYW1lOiBzdGF0LnByb2ZfbmFtZSwgdmFsdWU6IHN0YXQucHJvZl92YWx1ZX0pO1xuICAgICAgICB2dWxuZXJhYmlsaXRpZXMucHVzaChzdGF0LnZ1bF9uYW1lKTtcbiAgICAgICAgcmVzaXN0YW5jZXMucHVzaChzdGF0LnJlc19uYW1lKTtcbiAgICAgICAgc2Vuc2VzLnB1c2goe25hbWU6IHN0YXQuc2Vuc2VfbmFtZSwgdmFsdWU6IHN0YXQuc2Vuc2VfdmFsdWV9KTtcbiAgICAgICAgYWJpbGl0aWVzLnB1c2goe25hbWU6IHN0YXQuYWJpbGl0eV9uYW1lLCBkZXNjOiBzdGF0LmFiaWxpdHlfZGVzY30pO1xuICAgICAgICBhY3Rpb25zLnB1c2goe25hbWU6IHN0YXQuYWN0aW9uX25hbWUsIGRlc2M6IHN0YXQuYWN0aW9uX2Rlc2N9KTtcbiAgICAgICAgbGVnQWN0aW9ucy5wdXNoKHtuYW1lOiBzdGF0LmxlZ19hY3Rpb25fbmFtZSwgZGVzYzogc3RhdC5sZWdfYWN0aW9uX2Rlc2N9KTtcblxuICAgICAgICBpZiAoc3RhdC5pbW11bmVfdHlwZSA9PT0gJ2RhbWFnZScpIHtcbiAgICAgICAgICAgIGRhbWFnZUltbXVuaXRpZXMucHVzaChzdGF0LmltbXVuZV9uYW1lKTtcbiAgICAgICAgfSBlbHNlIGlmIChzdGF0LmltbXVuZV90eXBlID09PSAnY29uZGl0aW9uJykge1xuICAgICAgICAgICAgY29uZGl0aW9uSW1tdW5pdGllcy5wdXNoKHN0YXQuaW1tdW5lX25hbWUpO1xuICAgICAgICB9XG4gICAgfVxuICAgIHJldHVybiB7cHJvZmljaWVuY2llczogcHJvZmljaWVuY2llcywgdnVsbmVyYWJpbGl0aWVzOiB2dWxuZXJhYmlsaXRpZXMsIHJlc2lzdGFuY2VzOiByZXNpc3RhbmNlcywgZGFtYWdlSW1tdW5pdGllczogZGFtYWdlSW1tdW5pdGllcywgY29uZGl0aW9uSW1tdW5pdGllczogY29uZGl0aW9uSW1tdW5pdGllcywgc2Vuc2VzOiBzZW5zZXMsIGFiaWxpdGllczogYWJpbGl0aWVzLCBhY3Rpb25zOiBhY3Rpb25zLCBsZWdBY3Rpb25zOiBsZWdBY3Rpb25zfTtcbn1cblxuLy8gTWFrZSBzdXJlIGFycmF5cyB0aGF0IGhhdmUgbm8gdmFsdWVzIGFyZSBlbXB0eSwgYW5kIGRvbid0IGhhdmUgbnVsbCB2YWx1ZXMgaW4gaXQuXG5mdW5jdGlvbiBlbXB0eU51bGxBcnJheXMocHJvZmljaWVuY2llczogYW55LCByZXNpc3RhbmNlczogYW55LCB2dWxuZXJhYmlsaXRpZXM6IGFueSwgc2Vuc2VzOiBhbnkpIHtcbiAgICBpZiAocHJvZmljaWVuY2llcy5sZW5ndGggPiAwKSB7XG4gICAgICAgIGxldCBleGlzdHMgPSBmYWxzZTtcbiAgICAgICAgcHJvZmljaWVuY2llcy5mb3JFYWNoKChwcm9mOiBhbnkpID0+IHtcbiAgICAgICAgICAgIGlmIChwcm9mLm5hbWUgJiYgcHJvZi52YWx1ZSkgZXhpc3RzID0gdHJ1ZTtcbiAgICAgICAgfSk7XG4gICAgICAgIGlmICghZXhpc3RzKSBwcm9maWNpZW5jaWVzID0gW107XG4gICAgfVxuICAgIGlmIChyZXNpc3RhbmNlcy5sZW5ndGggPiAwKSB7XG4gICAgICAgIGxldCBleGlzdHMgPSBmYWxzZTtcbiAgICAgICAgcmVzaXN0YW5jZXMuZm9yRWFjaCgocmVzaXN0YW5jZTogYW55KSA9PiB7XG4gICAgICAgICAgICBpZiAocmVzaXN0YW5jZSkgZXhpc3RzID0gdHJ1ZTtcbiAgICAgICAgfSk7XG4gICAgICAgIGlmICghZXhpc3RzKSByZXNpc3RhbmNlcyA9IFtdO1xuICAgIH1cbiAgICBpZiAodnVsbmVyYWJpbGl0aWVzLmxlbmd0aCA+IDApIHtcbiAgICAgICAgbGV0IGV4aXN0cyA9IGZhbHNlO1xuICAgICAgICB2dWxuZXJhYmlsaXRpZXMuZm9yRWFjaCgodnVsOiBhbnkpID0+IHtcbiAgICAgICAgICAgIGlmICh2dWwpIGV4aXN0cyA9IHRydWU7XG4gICAgICAgIH0pO1xuICAgICAgICBpZiAoIWV4aXN0cykgdnVsbmVyYWJpbGl0aWVzID0gW107XG4gICAgfVxuICAgIGlmIChzZW5zZXMubGVuZ3RoID4gMCkge1xuICAgICAgICBsZXQgZXhpc3RzID0gZmFsc2U7XG4gICAgICAgIHNlbnNlcy5mb3JFYWNoKChzZW5zZTogYW55KSA9PiB7XG4gICAgICAgICAgICBpZiAoc2Vuc2UubmFtZSAmJiBzZW5zZS52YWx1ZSkgZXhpc3RzID0gdHJ1ZTtcbiAgICAgICAgfSk7XG4gICAgICAgIGlmICghZXhpc3RzKSBzZW5zZXMgPSBbXTtcbiAgICB9XG4gICAgcmV0dXJuIHtfcHJvZmljaWVuY2llczogcHJvZmljaWVuY2llcywgX3Jlc2lzdGFuY2VzOiByZXNpc3RhbmNlcywgX3Z1bG5lcmFiaWxpdGllczogdnVsbmVyYWJpbGl0aWVzLCBfc2Vuc2VzOiBzZW5zZXN9O1xufVxuXG4vLyBSZW1vdmUgZHVwbGljYXRlIGRhdGEgZnJvbSB0aGUgZGF0YWJhc2VcbmZ1bmN0aW9uIHJlbW92ZUV4dHJhQ3VzdG9tRGF0YShhcnJheTogYW55LCBuYW1lOiBib29sZWFuKSB7XG4gICAgbGV0IHJlc3VsdCA9IFtdO1xuICAgIGlmIChuYW1lKSB7XG4gICAgICAgIC8vIExvb3AgdGhyb3VnaCBhcnJheSB3aXRoIG9iamVjdHNcbiAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCBhcnJheS5sZW5ndGggLSAxOyBpKyspIHtcbiAgICAgICAgICAgIGlmICghcmVzdWx0LnNvbWUoKGl0ZW0pID0+IGFycmF5W2ldLm5hbWUgPT09IGl0ZW0ubmFtZSkpIHtcbiAgICAgICAgICAgICAgICByZXN1bHQucHVzaChhcnJheVtpXSk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9IGVsc2Uge1xuICAgICAgICAvLyBMb29wcyB0aHJvdWdoIGFycmF5IG5vcm1hbGx5XG4gICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgYXJyYXkubGVuZ3RoIC0gMTsgaSsrKSB7XG4gICAgICAgICAgICBpZiAoIXJlc3VsdC5zb21lKChpdGVtKSA9PiBhcnJheVtpXSA9PT0gaXRlbSkpIHtcbiAgICAgICAgICAgICAgICByZXN1bHQucHVzaChhcnJheVtpXSk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9XG4gICAgcmV0dXJuIHJlc3VsdDtcbn1cblxuZXhwb3J0IGFzeW5jIGZ1bmN0aW9uIGdldEN1c3RvbUNyZWF0dXJlcygpIHtcbiAgICB0cnkge1xuICAgICAgICBjb25zdCByZXMgPSBhd2FpdCBheGlvcy5nZXQoJy9hcGkvY3JlYXR1cmVzJyk7XG4gICAgICAgIGN1c3RvbUNyZWF0dXJlcy52YWx1ZSA9IHJlcy5kYXRhO1xuICAgIH0gY2F0Y2ggKGVycikge1xuICAgICAgICBjb25zb2xlLmxvZyhlcnIpO1xuICAgIH1cbn1cblxuLy8gPT09IFBPU1Qgcm91dGVzID09PSAvL1xuXG5leHBvcnQgYXN5bmMgZnVuY3Rpb24gYWRkQ3JlYXR1cmUocGF5bG9hZDogYW55KSB7XG4gICAgY29uc29sZS5sb2cocGF5bG9hZCk7XG4gICAgdHJ5IHtcbiAgICAgICAgbGV0IGNyZWF0dXJlSWQ6IHN0cmluZztcbiAgICAgICAgLy8gQ3JlYXRlIGNyZWF0dXJlIGJhc2Ugc3RhdHNcbiAgICAgICAgYXdhaXQgYXhpb3MucG9zdCgnL2FwaS9jcmVhdHVyZXMnLCBwYXlsb2FkKTtcbiAgICAgICAgLy8gR2V0IGlkIG9mIHRoZSBjcmVhdHVyZSB0aGF0IHdhcyBqdXN0IG1hZGVcbiAgICAgICAgY29uc3QgcmVzID0gYXdhaXQgYXhpb3MuZ2V0KCcvYXBpL2NyZWF0dXJlcycpO1xuICAgICAgICBjcmVhdHVyZUlkID0gcmVzLmRhdGFbcmVzLmRhdGEubGVuZ3RoIC0gMV0uaWQ7XG5cbiAgICAgICAgLy8gQWRkIHRoZSByZXN0IG9mIHRoZSBjcmVhdHVyZSBkYXRhXG4gICAgICAgIGZvciAobGV0IHByb2Ygb2YgcGF5bG9hZC5wcm9maWNpZW5jaWVzKSB7XG4gICAgICAgICAgICBhd2FpdCBheGlvcy5wb3N0KCcvYXBpL2NyZWF0dXJlcy9wcm9mJywge2lkOiBjcmVhdHVyZUlkLCBkYXRhOiB7bmFtZTogcHJvZi5uYW1lLCB2YWx1ZTogcHJvZi52YWx1ZX19KTtcbiAgICAgICAgfVxuICAgICAgICBpZiAocGF5bG9hZC5wcm9maWNpZW5jaWVzLmxlbmd0aCA9PT0gMCkgYXdhaXQgYXhpb3MucG9zdCgnL2FwaS9jcmVhdHVyZXMvcHJvZicsIHtpZDogY3JlYXR1cmVJZCwgZGF0YToge25hbWU6IG51bGwsIHZhbHVlOiBudWxsfX0pO1xuXG4gICAgICAgIGF3YWl0IGF4aW9zLnBvc3QoJy9hcGkvY3JlYXR1cmVzL3Z1bCcsIHtpZDogY3JlYXR1cmVJZCwgZGF0YToge25hbWU6IHBheWxvYWQudnVsfX0pO1xuICAgICAgICBhd2FpdCBheGlvcy5wb3N0KCcvYXBpL2NyZWF0dXJlcy9yZXMnLCB7aWQ6IGNyZWF0dXJlSWQsIGRhdGE6IHtuYW1lOiBwYXlsb2FkLnJlc319KTtcbiAgICAgICAgYXdhaXQgYXhpb3MucG9zdCgnL2FwaS9jcmVhdHVyZXMvaW1tdW5pdGllcycsIHtpZDogY3JlYXR1cmVJZCwgZGF0YToge2RtZ0ltbXVuZTogdHJ1ZSwgbmFtZTogcGF5bG9hZC5kbWdJbW11bmV9fSk7XG4gICAgICAgIGF3YWl0IGF4aW9zLnBvc3QoJy9hcGkvY3JlYXR1cmVzL2ltbXVuaXRpZXMnLCB7aWQ6IGNyZWF0dXJlSWQsIGRhdGE6IHtjb25JbW11bmU6IHRydWUsIG5hbWU6IHBheWxvYWQuY29uSW1tdW5lfX0pO1xuICAgICAgICBmb3IgKGxldCBzZW5zZSBvZiBwYXlsb2FkLnNlbnNlcykge1xuICAgICAgICAgICAgYXdhaXQgYXhpb3MucG9zdCgnL2FwaS9jcmVhdHVyZXMvc2Vuc2VzJywge2lkOiBjcmVhdHVyZUlkLCBkYXRhOiB7bmFtZTogc2Vuc2UubmFtZSwgdmFsdWU6IHNlbnNlLnZhbHVlfX0pO1xuICAgICAgICB9XG4gICAgICAgIGlmIChwYXlsb2FkLnNlbnNlcy5sZW5ndGggPT09IDApIGF3YWl0IGF4aW9zLnBvc3QoJy9hcGkvY3JlYXR1cmVzL3NlbnNlcycsIHtpZDogY3JlYXR1cmVJZCwgZGF0YToge25hbWU6IG51bGwsIHZhbHVlOiBudWxsfX0pO1xuXG4gICAgICAgIGF3YWl0IGF4aW9zLnBvc3QoJy9hcGkvY3JlYXR1cmVzL2xhbmd1YWdlcycsIHtpZDogY3JlYXR1cmVJZCwgZGF0YToge25hbWU6IHBheWxvYWQubGFuZ3VhZ2VzfX0pO1xuICAgICAgICBmb3IgKGxldCBhYmlsaXR5IG9mIHBheWxvYWQuYWJpbGl0aWVzKSB7XG4gICAgICAgICAgICBhd2FpdCBheGlvcy5wb3N0KCcvYXBpL2NyZWF0dXJlcy9hYmlsaXRpZXMnLCB7aWQ6IGNyZWF0dXJlSWQsIGRhdGE6IHtuYW1lOiBhYmlsaXR5Lm5hbWUsIGRlc2M6IGFiaWxpdHkuZGVzY319KTtcbiAgICAgICAgfVxuICAgICAgICBpZiAocGF5bG9hZC5hYmlsaXRpZXMubGVuZ3RoID09PSAwKSBhd2FpdCBheGlvcy5wb3N0KCcvYXBpL2NyZWF0dXJlcy9hYmlsaXRpZXMnLCB7aWQ6IGNyZWF0dXJlSWQsIGRhdGE6IHtuYW1lOiBudWxsLCBkZXNjOiBudWxsfX0pO1xuXG4gICAgICAgIGZvciAobGV0IGFjdGlvbiBvZiBwYXlsb2FkLmFjdGlvbnMpIHtcbiAgICAgICAgICAgIGF3YWl0IGF4aW9zLnBvc3QoJy9hcGkvY3JlYXR1cmVzL2FjdGlvbnMnLCB7aWQ6IGNyZWF0dXJlSWQsIGRhdGE6IHtuYW1lOiBhY3Rpb24ubmFtZSwgZGVzYzogYWN0aW9uLmRlc2N9fSk7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKHBheWxvYWQuYWN0aW9ucy5sZW5ndGggPT09IDApIGF3YWl0IGF4aW9zLnBvc3QoJy9hcGkvY3JlYXR1cmVzL2FjdGlvbnMnLCB7aWQ6IGNyZWF0dXJlSWQsIGRhdGE6IHtuYW1lOiBudWxsLCBkZXNjOiBudWxsfX0pO1xuXG4gICAgICAgIGZvciAobGV0IGFjdGlvbiBvZiBwYXlsb2FkLmxlZ0FjdGlvbnMpIHtcbiAgICAgICAgICAgIGF3YWl0IGF4aW9zLnBvc3QoJy9hcGkvY3JlYXR1cmVzL2xlZy1hY3Rpb25zJywge2lkOiBjcmVhdHVyZUlkLCBkYXRhOiB7bmFtZTogYWN0aW9uLm5hbWUsIGRlc2M6IGFjdGlvbi5kZXNjfX0pO1xuICAgICAgICB9XG4gICAgICAgIGlmIChwYXlsb2FkLmxlZ0FjdGlvbnMubGVuZ3RoID09PSAwKSBhd2FpdCBheGlvcy5wb3N0KCcvYXBpL2NyZWF0dXJlcy9sZWctYWN0aW9ucycsIHtpZDogY3JlYXR1cmVJZCwgZGF0YToge25hbWU6IG51bGwsIGRlc2M6IG51bGx9fSk7XG5cbiAgICB9IGNhdGNoIChlcnIpIHtcbiAgICAgICAgY29uc29sZS5sb2coZXJyKTtcbiAgICB9XG59XG5cbmNsYXNzIENyZWF0dXJlIHtcbiAgICBpZDogbnVtYmVyXG4gICAgdXNlcl9pZDogbnVtYmVyXG4gICAgaW5kZXg6IHN0cmluZ1xuICAgIG5hbWU6IHN0cmluZ1xuICAgIHNpemU6IHN0cmluZ1xuICAgIHR5cGU6IHN0cmluZ1xuICAgIGFsaWdubWVudDogc3RyaW5nXG4gICAgYWM6IG51bWJlclxuICAgIGhpdF9wb2ludHM6IG51bWJlclxuICAgIGhpdF9kaWNlOiBzdHJpbmdcbiAgICBzdHI6IG51bWJlclxuICAgIGRleDogbnVtYmVyXG4gICAgY29uOiBudW1iZXJcbiAgICBpbnQ6IG51bWJlclxuICAgIHdpczogbnVtYmVyXG4gICAgY2hhcjogbnVtYmVyXG4gICAgY3I6IG51bWJlclxuICAgIHhwOiBudW1iZXJcbiAgICBsYW5ndWFnZXM6IHN0cmluZ1xuICAgIHNwZWVkczogYW55XG4gICAgcHJvZmljaWVuY2llczogYW55XG4gICAgdnVsbmVyYWJpbGl0aWVzOiBzdHJpbmdcbiAgICByZXNpc3RhbmNlczogc3RyaW5nXG4gICAgZGFtYWdlSW1tdW5pdGllczogYW55XG4gICAgY29uZGl0aW9uSW1tdW5pdGllczogYW55XG4gICAgc2Vuc2VzOiBhbnlcbiAgICBhYmlsaXRpZXM6IGFueVxuICAgIGFjdGlvbnM6IGFueVxuICAgIGxlZ0FjdGlvbnM6IGFueVxuXG4gICAgY29uc3RydWN0b3IgKGlkOiBudW1iZXIsIHVzZXJfaWQ6IG51bWJlciwgaW5kZXg6IHN0cmluZywgbmFtZTogc3RyaW5nLCBzaXplOiBzdHJpbmcsIHR5cGU6IHN0cmluZywgYWxpZ25tZW50OiBzdHJpbmcsIGFjOiBudW1iZXIsIGhpdF9wb2ludHM6IG51bWJlciwgaGl0X2RpY2U6IHN0cmluZywgc3RyOiBudW1iZXIsIGRleDogbnVtYmVyLCBjb246IG51bWJlciwgaW50OiBudW1iZXIsIHdpczogbnVtYmVyLCBjaGFyOiBudW1iZXIsIGNyOiBudW1iZXIsIHhwOiBudW1iZXIsIGxhbmd1YWdlczogc3RyaW5nLCB3YWxrX3NwZWVkOiBudW1iZXIsIHN3aW1fc3BlZWQ6IG51bWJlciwgYnVycm93X3NwZWVkOiBudW1iZXIsIGZseV9zcGVlZDogbnVtYmVyLCBjbGltYl9zcGVlZDogbnVtYmVyLCBwcm9maWNpZW5jaWVzOiBhbnksIHZ1bG5lcmFiaWxpdGllczogc3RyaW5nLCByZXNpc3RhbmNlczogc3RyaW5nLCBkYW1hZ2VJbW11bml0aWVzOiBhbnksIGNvbmRpdGlvbkltbXVuaXRpZXM6IGFueSwgc2Vuc2VzOiBhbnksIGFiaWxpdGllczogYW55LCBhY3Rpb25zOiBhbnksIGxlZ0FjdGlvbnM6IGFueSkge1xuICAgICAgICB0aGlzLmlkID0gaWQ7XG4gICAgICAgIHRoaXMudXNlcl9pZCA9IHVzZXJfaWQ7XG4gICAgICAgIHRoaXMuaW5kZXggPSBpbmRleDtcbiAgICAgICAgdGhpcy5uYW1lID0gbmFtZTtcbiAgICAgICAgdGhpcy5zaXplID0gc2l6ZTtcbiAgICAgICAgdGhpcy50eXBlID0gdHlwZTtcbiAgICAgICAgdGhpcy5hbGlnbm1lbnQgPSBhbGlnbm1lbnQ7XG4gICAgICAgIHRoaXMuYWMgPSBhYztcbiAgICAgICAgdGhpcy5oaXRfcG9pbnRzID0gaGl0X3BvaW50cztcbiAgICAgICAgdGhpcy5oaXRfZGljZSA9IGhpdF9kaWNlO1xuICAgICAgICB0aGlzLnN0ciA9IHN0cjtcbiAgICAgICAgdGhpcy5kZXggPSBkZXg7XG4gICAgICAgIHRoaXMuY29uID0gY29uO1xuICAgICAgICB0aGlzLmludCA9IGludDtcbiAgICAgICAgdGhpcy53aXMgPSB3aXM7XG4gICAgICAgIHRoaXMuY2hhciA9IGNoYXI7XG4gICAgICAgIHRoaXMuY3IgPSBjcjtcbiAgICAgICAgdGhpcy54cCA9IHhwO1xuICAgICAgICB0aGlzLmxhbmd1YWdlcyA9IGxhbmd1YWdlcztcbiAgICAgICAgdGhpcy5zcGVlZHMgPSBbXG4gICAgICAgICAgICB7bmFtZTogJ1dhbGsnLCB2YWx1ZTogd2Fsa19zcGVlZH0sXG4gICAgICAgICAgICB7bmFtZTogJ1N3aW0nLCB2YWx1ZTogc3dpbV9zcGVlZH0sXG4gICAgICAgICAgICB7bmFtZTogJ0J1cnJvdycsIHZhbHVlOiBidXJyb3dfc3BlZWR9LFxuICAgICAgICAgICAge25hbWU6ICdGbHknLCB2YWx1ZTogZmx5X3NwZWVkfSxcbiAgICAgICAgICAgIHtuYW1lOiAnQ2xpbWInLCB2YWx1ZTogY2xpbWJfc3BlZWR9XG4gICAgICAgIF0sXG4gICAgICAgIHRoaXMucHJvZmljaWVuY2llcyA9IHByb2ZpY2llbmNpZXM7XG4gICAgICAgIHRoaXMudnVsbmVyYWJpbGl0aWVzID0gdnVsbmVyYWJpbGl0aWVzO1xuICAgICAgICB0aGlzLnJlc2lzdGFuY2VzID0gcmVzaXN0YW5jZXM7XG4gICAgICAgIHRoaXMuZGFtYWdlSW1tdW5pdGllcyA9IGRhbWFnZUltbXVuaXRpZXM7XG4gICAgICAgIHRoaXMuY29uZGl0aW9uSW1tdW5pdGllcyA9IGNvbmRpdGlvbkltbXVuaXRpZXM7XG4gICAgICAgIHRoaXMuc2Vuc2VzID0gc2Vuc2VzO1xuICAgICAgICB0aGlzLmFiaWxpdGllcyA9IGFiaWxpdGllcztcbiAgICAgICAgdGhpcy5hY3Rpb25zID0gYWN0aW9ucztcbiAgICAgICAgdGhpcy5sZWdBY3Rpb25zID0gbGVnQWN0aW9ucztcbiAgICB9XG59XG5cbi8vID09PSBERUxFVEUgcm91dGVzID09PSAvL1xuXG5leHBvcnQgYXN5bmMgZnVuY3Rpb24gZGVsZXRlQ3JlYXR1cmUoaW5kZXg6IHN0cmluZykge1xuICAgIHRyeSB7XG4gICAgICAgIGF3YWl0IGF4aW9zLmRlbGV0ZShgL2FwaS9jcmVhdHVyZXMvJHtpbmRleH1gKTtcbiAgICAgICAgaWYgKGNyZWF0dXJlc09wZW4pIHtcbiAgICAgICAgICAgIHRvZ2dsZUNyZWF0dXJlc1dpbmRvdygpO1xuICAgICAgICAgICAgdG9nZ2xlQ3JlYXR1cmVzV2luZG93KCk7XG4gICAgICAgIH1cbiAgICB9IGNhdGNoIChlcnIpIHtcbiAgICAgICAgY29uc29sZS5sb2coZXJyKTtcbiAgICB9XG59XG5cblxuLy8gaWYgKHR5cGVvZiBtb2R1bGUgIT09ICd1bmRlZmluZWQnKSBtb2R1bGUuZXhwb3J0cyA9IHtcbi8vICAgICByZW1vdmVFeHRyYUN1c3RvbURhdGEsXG4vLyAgICAgZ2V0Q3JlYXR1cmVQcm9maWNpZW5jaWVzLFxuLy8gICAgIGdldENyZWF0dXJlQ29uZGl0aW9uSW1tdW5pdGllcyxcbi8vICAgICBnZXRDcmVhdHVyZVNlbnNlcyxcbi8vICAgICBnZXRDcmVhdHVyZUFiaWxpdGllcyxcbi8vICAgICBnZXRDcmVhdHVyZUFjdGlvbnMsXG4vLyAgICAgZ2V0Q3JlYXR1cmVMZWdlbmRhcnlBY3Rpb25zXG4vLyB9OyIsICJsZXQgdG9rZW5EZWx0YVg6IG51bWJlciwgdG9rZW5EZWx0YVk6IG51bWJlcjtcblxuLy8gQWRkIGV2ZW50IGxpc3RlbmVycyBmb3IgdGhlIHRva2VuXG5leHBvcnQgZnVuY3Rpb24gZ2l2ZVRva2VuRXZlbnRzKHRva2VuOiBhbnkpIHtcbiAgICAvLyBGaXJlcyB3aGVuIHVzZXIgYmVnaW5zIGRyYWdnaW5nXG4gICAgdG9rZW4uYWRkRXZlbnRMaXN0ZW5lcihcImRyYWdzdGFydFwiLCAoZTogYW55KSA9PiB7XG4gICAgICAgIGUudGFyZ2V0LmNsYXNzTGlzdC5hZGQoJ3Rva2VuLS1kcmFnZ2luZycpO1xuICAgIH0pO1xuICAgIC8vIEZpcmVzIHdoZW4gdXNlciBzdG9wcyBkcmFnZ2luZ1xuICAgIHRva2VuLmFkZEV2ZW50TGlzdGVuZXIoXCJkcmFnZW5kXCIsIChlOiBhbnkpID0+IHtcbiAgICAgICAgZS50YXJnZXQuY2xhc3NMaXN0LnJlbW92ZSgndG9rZW4tLWRyYWdnaW5nJyk7XG4gICAgICAgIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5nYW1lLXBhZ2UtY29udGFpbmVyJykuY2xhc3NMaXN0LnJlbW92ZSgndG9rZW4tLWRyYWdnaW5nLWN1cnNvcicpO1xuICAgIH0pO1xuICAgIC8vIEZpcmVzIHdoZW4gdXNlciBjbGlja3Mgb24gdG9rZW5cbiAgICB0b2tlbi5hZGRFdmVudExpc3RlbmVyKCdtb3VzZWRvd24nLChlOiBhbnkpID0+IHtcbiAgICAgICAgc3dpdGNoIChlLndoaWNoKSB7XG4gICAgICAgICAgICBjYXNlIDE6XG4gICAgICAgICAgICAgICAgZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLmdhbWUtcGFnZS1jb250YWluZXInKS5jbGFzc0xpc3QuYWRkKCd0b2tlbi0tZHJhZ2dpbmctY3Vyc29yJyk7XG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICBjYXNlIDM6XG4gICAgICAgICAgICAgICAgY29uc29sZS5sb2coJ1JpZ2h0IGNsaWNrJyk7XG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICBkZWZhdWx0OlxuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICB9XG4gICAgfSk7XG4gICAgLy8gRmlyZXMgd2hlbiB1c2VyIHJlbGVhc2VzIGNsaWNrIG9uIHRva2VuXG4gICAgdG9rZW4uYWRkRXZlbnRMaXN0ZW5lcignbW91c2V1cCcsKGU6IGFueSkgPT4ge1xuICAgICAgICBzd2l0Y2ggKGUud2hpY2gpIHtcbiAgICAgICAgICAgIGNhc2UgMTpcbiAgICAgICAgICAgICAgICAvLyBzZWxlY3RUb2tlbihlLnRhcmdldCk7XG4gICAgICAgICAgICAgICAgZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLmdhbWUtcGFnZS1jb250YWluZXInKS5jbGFzc0xpc3QucmVtb3ZlKCd0b2tlbi0tZHJhZ2dpbmctY3Vyc29yJyk7XG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICBkZWZhdWx0OlxuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICB9XG4gICAgfSk7XG4gICAgLy8gRmlyZXMgd2hlbiB1c2VyIHVzZXMgc2Nyb2xsIHdoZWVsXG4gICAgLy8gdG9rZW4uYWRkRXZlbnRMaXN0ZW5lcignd2hlZWwnLCAoZSkgPT4ge1xuICAgIC8vICAgICBpZiAoY2FuU2NhbGUpIHtcbiAgICAvLyAgICAgICAgIGlmIChlLndoZWVsRGVsdGFZIDwgMCkge1xuICAgIC8vICAgICAgICAgICAgIHVwc2NhbGVUb2tlbih0b2tlbik7XG4gICAgLy8gICAgICAgICB9IGVsc2Uge1xuICAgIC8vICAgICAgICAgICAgIGRlc2NhbGVUb2tlbih0b2tlbik7XG4gICAgLy8gICAgICAgICB9XG4gICAgLy8gICAgIH1cbiAgICAvLyB9KTtcbn1cblxuLy8gSGlnaGxpZ2h0cyBhbmQgc2VsZWN0cyB0b2tlblxuLy8gZnVuY3Rpb24gc2VsZWN0VG9rZW4odG9rZW4pIHtcbi8vICAgICBpZiAodG9rZW4uY2xhc3NMaXN0LmNvbnRhaW5zKCd0b2tlbi0tc2VsZWN0ZWQnKSkge1xuLy8gICAgICAgICB0b2tlbi5jbGFzc0xpc3QucmVtb3ZlKCd0b2tlbi0tc2VsZWN0ZWQnKTtcbi8vICAgICB9IGVsc2Uge1xuLy8gICAgICAgICBmb3IgKGNvbnN0IF90b2tlbiBvZiBkb2N1bWVudC5nZXRFbGVtZW50c0J5Q2xhc3NOYW1lKCd0b2tlbicpKSB7XG4vLyAgICAgICAgICAgICBfdG9rZW4uY2xhc3NMaXN0LnJlbW92ZSgndG9rZW4tLXNlbGVjdGVkJyk7XG4vLyAgICAgICAgIH1cbi8vICAgICAgICAgdG9rZW4uY2xhc3NMaXN0LmFkZCgndG9rZW4tLXNlbGVjdGVkJyk7XG4vLyAgICAgfVxuLy8gfVxuXG5mdW5jdGlvbiB1cHNjYWxlVG9rZW4odG9rZW46IGFueSkge1xuICAgIGlmICh0b2tlbi5jbGFzc0xpc3QuY29udGFpbnMoJ3Rva2VuLS10aW55JykpIHtcbiAgICAgICAgdG9rZW4uY2xhc3NMaXN0LnJlbW92ZSgndG9rZW4tLXRpbnknKTtcbiAgICAgICAgdG9rZW4uY2xhc3NMaXN0LmFkZCgndG9rZW4tLXNtYWxsJyk7XG4gICAgfSBlbHNlIGlmICh0b2tlbi5jbGFzc0xpc3QuY29udGFpbnMoJ3Rva2VuLS1zbWFsbCcpKSB7XG4gICAgICAgIHRva2VuLmNsYXNzTGlzdC5yZW1vdmUoJ3Rva2VuLS1zbWFsbCcpO1xuICAgICAgICB0b2tlbi5jbGFzc0xpc3QuYWRkKCd0b2tlbi0tbWVkaXVtJyk7XG4gICAgfSBlbHNlIGlmICh0b2tlbi5jbGFzc0xpc3QuY29udGFpbnMoJ3Rva2VuLS1tZWRpdW0nKSkge1xuICAgICAgICB0b2tlbi5jbGFzc0xpc3QucmVtb3ZlKCd0b2tlbi0tbWVkaXVtJyk7XG4gICAgICAgIHRva2VuLmNsYXNzTGlzdC5hZGQoJ3Rva2VuLS1sYXJnZScpO1xuICAgIH0gZWxzZSBpZiAodG9rZW4uY2xhc3NMaXN0LmNvbnRhaW5zKCd0b2tlbi0tbGFyZ2UnKSkge1xuICAgICAgICB0b2tlbi5jbGFzc0xpc3QucmVtb3ZlKCd0b2tlbi0tbGFyZ2UnKTtcbiAgICAgICAgdG9rZW4uY2xhc3NMaXN0LmFkZCgndG9rZW4tLWh1Z2UnKTtcbiAgICB9IGVsc2UgaWYgKHRva2VuLmNsYXNzTGlzdC5jb250YWlucygndG9rZW4tLWh1Z2UnKSkge1xuICAgICAgICB0b2tlbi5jbGFzc0xpc3QucmVtb3ZlKCd0b2tlbi0taHVnZScpO1xuICAgICAgICB0b2tlbi5jbGFzc0xpc3QuYWRkKCd0b2tlbi0tZ2FyZ2FudHVhbicpO1xuICAgIH1cbn1cblxuZnVuY3Rpb24gZGVzY2FsZVRva2VuKHRva2VuOiBhbnkpIHtcbiAgICBpZiAodG9rZW4uY2xhc3NMaXN0LmNvbnRhaW5zKCd0b2tlbi0tZ2FyZ2FudHVhbicpKSB7XG4gICAgICAgIHRva2VuLmNsYXNzTGlzdC5yZW1vdmUoJ3Rva2VuLS1nYXJnYW50dWFuJyk7XG4gICAgICAgIHRva2VuLmNsYXNzTGlzdC5hZGQoJ3Rva2VuLS1odWdlJyk7XG4gICAgfSBlbHNlIGlmICh0b2tlbi5jbGFzc0xpc3QuY29udGFpbnMoJ3Rva2VuLS1odWdlJykpIHtcbiAgICAgICAgdG9rZW4uY2xhc3NMaXN0LnJlbW92ZSgndG9rZW4tLWh1Z2UnKTtcbiAgICAgICAgdG9rZW4uY2xhc3NMaXN0LmFkZCgndG9rZW4tLWxhcmdlJyk7XG4gICAgfSBlbHNlIGlmICh0b2tlbi5jbGFzc0xpc3QuY29udGFpbnMoJ3Rva2VuLS1sYXJnZScpKSB7XG4gICAgICAgIHRva2VuLmNsYXNzTGlzdC5yZW1vdmUoJ3Rva2VuLS1sYXJnZScpO1xuICAgICAgICB0b2tlbi5jbGFzc0xpc3QuYWRkKCd0b2tlbi0tbWVkaXVtJyk7XG4gICAgfSBlbHNlIGlmICh0b2tlbi5jbGFzc0xpc3QuY29udGFpbnMoJ3Rva2VuLS1tZWRpdW0nKSkge1xuICAgICAgICB0b2tlbi5jbGFzc0xpc3QucmVtb3ZlKCd0b2tlbi0tbWVkaXVtJyk7XG4gICAgICAgIHRva2VuLmNsYXNzTGlzdC5hZGQoJ3Rva2VuLS1zbWFsbCcpO1xuICAgIH0gZWxzZSBpZiAodG9rZW4uY2xhc3NMaXN0LmNvbnRhaW5zKCd0b2tlbi0tc21hbGwnKSkge1xuICAgICAgICB0b2tlbi5jbGFzc0xpc3QucmVtb3ZlKCd0b2tlbi0tc21hbGwnKTtcbiAgICAgICAgdG9rZW4uY2xhc3NMaXN0LmFkZCgndG9rZW4tLXRpbnknKTtcbiAgICB9XG59XG4iLCAiaW1wb3J0IGF4aW9zIGZyb20gJ2F4aW9zJztcbmltcG9ydCB7IHRva2VucyB9IGZyb20gJy4uL21lbnVzL3Rva2VuLm1lbnUnO1xuXG4vLyA9PT0gR0VUIHJvdXRlcyA9PT0gLy9cblxuZXhwb3J0IGFzeW5jIGZ1bmN0aW9uIGdldFRva2VucygpIHtcbiAgICB0cnkge1xuICAgICAgICBjb25zdCByZXMgPSBhd2FpdCBheGlvcy5nZXQoJy9hcGkvdG9rZW5zJylcbiAgICAgICAgdG9rZW5zLnZhbHVlID0gcmVzLmRhdGE7XG4gICAgfSBjYXRjaCAoZXJyKSB7XG4gICAgICAgIGNvbnNvbGUubG9nKGVycik7XG4gICAgfVxufVxuXG4vLyA9PT0gUE9TVCByb3V0ZXMgPT09IC8vXG5cbmV4cG9ydCBhc3luYyBmdW5jdGlvbiBhZGRUb2tlbihwYXlsb2FkOiBhbnkpIHtcbiAgICB0cnkge1xuICAgICAgICBhd2FpdCBheGlvcy5wb3N0KCcvYXBpL3Rva2VucycsIHBheWxvYWQpO1xuICAgIH0gY2F0Y2ggKGVycikge1xuICAgICAgICBjb25zb2xlLmxvZyhlcnIpO1xuICAgIH1cbn1cblxuZXhwb3J0IGFzeW5jIGZ1bmN0aW9uIGFkZFRva2VuVG9NYXAocGF5bG9hZDogYW55KSB7XG4gICAgdHJ5IHtcbiAgICAgICAgYXdhaXQgYXhpb3MucG9zdCgnL2FwaS90b2tlbnMvbWFwJywgcGF5bG9hZCk7XG4gICAgfSBjYXRjaCAoZXJyKSB7XG4gICAgICAgIGNvbnNvbGUubG9nKGVycik7XG4gICAgfVxufSIsICJpbXBvcnQgeyBhZGRUb2tlbiwgZ2V0VG9rZW5zIH0gZnJvbSAnLi4vcm91dGVzL3Rva2Vucy5yb3V0ZSc7XG5pbXBvcnQgeyBjbGllbnQgfSBmcm9tICcuLi9kYXNoYm9hcmQnO1xuaW1wb3J0IHsgbWVudU9wZW4sIHNlbGVjdGVkTWVudSwgY2xvc2VNZW51IH0gZnJvbSAnLi4vdXRpbHMnO1xuXG5sZXQgdG9rZW5TZWxlY3RlZCA9IGZhbHNlO1xuZXhwb3J0IGxldCB0b2tlbnMgPSB7dmFsdWU6IFtdfTtcbmNvbnN0IGRlZmF1bHRUb2tlbnMgPSBbXG4gICAge2ltYWdlOiAnaHR0cHM6Ly9pLnBpbmltZy5jb20vMjM2eC84OC80YS8wNS84ODRhMDU2YmE3YTVhMDA0YmVjYWNiZmQxYmZkNzhmZS5qcGcnLCBzaXplOiAndG9rZW4tLW1lZGl1bSd9LFxuICAgIHtpbWFnZTogJ2h0dHBzOi8vaS5pbWd1ci5jb20vNWNpYm1Vdy5wbmcnLCBzaXplOiAndG9rZW4tLWxhcmdlJ30sXG4gICAge2ltYWdlOiAnaHR0cHM6Ly9lbmNyeXB0ZWQtdGJuMC5nc3RhdGljLmNvbS9pbWFnZXM/cT10Ym46QU5kOUdjU2xXX3hla1JEMjkxWUJoTGRQS1lpZkRuRjJIVjc0Q3N6MEtRJnVzcXA9Q0FVJywgc2l6ZTogJ3Rva2VuLS1nYXJnYW50dWFuJ30sXG5dO1xuXG5leHBvcnQgZnVuY3Rpb24gYWRkRGVmYXVsdFRva2VucygpIHtcbiAgICBmb3IgKGxldCB0b2tlbiBvZiBkZWZhdWx0VG9rZW5zKSB7XG4gICAgICAgIGFkZFRva2VuKHRva2VuKTtcbiAgICB9XG59XG5cbmV4cG9ydCBmdW5jdGlvbiB0b2dnbGVUb2tlbk1lbnUobWVudU5hbWU6IHN0cmluZykge1xuICAgIGlmIChjbGllbnQuY2xpZW50VHlwZSA9PT0gJ2RtJykge1xuICAgICAgICBtZW51T3Blbi52YWx1ZSA9ICFtZW51T3Blbi52YWx1ZTtcbiAgICAgICAgaWYgKG1lbnVPcGVuLnZhbHVlKSB7XG4gICAgICAgICAgICBzZWxlY3RlZE1lbnUudmFsdWUgPSAndG9rZW5zJztcbiAgICAgICAgICAgIC8vIENyZWF0ZSBtZW51XG4gICAgICAgICAgICBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcuZ2FtZS1wYWdlLWNvbnRhaW5lcicpLmluc2VydEFkamFjZW50SFRNTCgnYmVmb3JlZW5kJywgYFxuICAgICAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJtZW51XCI+XG4gICAgICAgICAgICAgICAgICAgIDxidXR0b24gY2xhc3M9XCJtZW51X19idG4gbWVudV9fYnRuLS1jbG9zZVwiPlg8L2J1dHRvbj5cbiAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzcz1cIm1lbnVfX2JvZHlcIj48L2Rpdj5cbiAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgIGApO1xuICAgICAgICAgICAgZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLm1lbnVfX2J0bi0tY2xvc2UnKS5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsICgpID0+IGNsb3NlTWVudShtZW51TmFtZSkpO1xuICAgICAgICAgICAgZ2V0VG9rZW5Cb2R5RGF0YSgpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgY2xvc2VNZW51KG1lbnVOYW1lKTtcbiAgICAgICAgfVxuICAgIH1cbn1cblxuYXN5bmMgZnVuY3Rpb24gZ2V0VG9rZW5Cb2R5RGF0YSgpIHtcbiAgICBhd2FpdCBnZXRUb2tlbnMoKTtcbiAgICBmb3IgKGxldCB0b2tlbiBvZiB0b2tlbnMudmFsdWUpIHtcbiAgICAgICAgaWYgKHRva2VuLmNyZWF0dXJlKSB7XG4gICAgICAgICAgICBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcubWVudV9fYm9keScpLmluc2VydEFkamFjZW50SFRNTCgnYmVmb3JlZW5kJywgYFxuICAgICAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJtZW51X19ib2R5LS1jb250YWluZXJcIj5cbiAgICAgICAgICAgICAgICAgICAgPGltZyBzcmM9JHt0b2tlbi5pbWFnZX0gY2xhc3M9XCJtZW51X19pdGVtIG1lbnVfX2l0ZW0tLXRva2VuXCIgb25kcmFnc3RhcnQ9XCJwbGFjZVRva2VuKGV2ZW50LCAnJHt0b2tlbi5zaXplfScpXCIgc2l6ZT0ke3Rva2VuLnNpemV9IHJlbGF0aXZlPSR7dG9rZW4uY3JlYXR1cmV9IGlkPSR7dG9rZW4uaWR9PlxuICAgICAgICAgICAgICAgICAgICA8YnV0dG9uIGNsYXNzPVwibWVudV9faXRlbS0tY2lyY2xlLWJ0blwiIG9uY2xpY2s9XCJvcGVuQ3JlYXR1cmVTdGF0c1dpbmRvdygnJHt0b2tlbi5jcmVhdHVyZX0nKVwiPjxpIGNsYXNzPVwiZmEtc29saWQgZmEtYXJyb3ctdXAtcmlnaHQtZnJvbS1zcXVhcmVcIj48L2k+PC9idXR0b24+XG4gICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICBgKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5tZW51X19ib2R5JykuaW5zZXJ0QWRqYWNlbnRIVE1MKCdiZWZvcmVlbmQnLCBgXG4gICAgICAgICAgICAgICAgPGRpdiBjbGFzcz1cIm1lbnVfX2JvZHktLWNvbnRhaW5lclwiPlxuICAgICAgICAgICAgICAgICAgICA8aW1nIHNyYz0ke3Rva2VuLmltYWdlfSBjbGFzcz1cIm1lbnVfX2l0ZW0gbWVudV9faXRlbS0tdG9rZW5cIiBvbmRyYWdzdGFydD1cInBsYWNlVG9rZW4oZXZlbnQsICcke3Rva2VuLnNpemV9JylcIiBzaXplPSR7dG9rZW4uc2l6ZX0gcmVsYXRpdmU9JHt0b2tlbi5jcmVhdHVyZX0gaWQ9JHt0b2tlbi5pZH0+XG4gICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICBgKTtcbiAgICAgICAgfVxuICAgIH1cbn1cblxuZnVuY3Rpb24gcGxhY2VUb2tlbihlOiBhbnksIHNpemU6IHN0cmluZykge1xuICAgIHRva2VuU2VsZWN0ZWQgPSB0cnVlO1xuICAgIGNvbnN0IHRva2VuID0gZS50YXJnZXQ7XG4gICAgdG9rZW4uY2xhc3NMaXN0LmFkZCgndG9rZW4tLWRyYWdnaW5nJyk7XG4gICAgdG9rZW4uY2xhc3NMaXN0LmFkZChzaXplKTtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIHJlc2V0VG9rZW5Cb2R5RGF0YSgpIHtcbiAgICBsZXQgZGVsZXRlTGlzdCA9IFtdO1xuICAgIGZvciAobGV0IHRva2VuIG9mIGRvY3VtZW50LmdldEVsZW1lbnRzQnlDbGFzc05hbWUoJ21lbnVfX2l0ZW0nKSkge1xuICAgICAgICBkZWxldGVMaXN0LnB1c2godG9rZW4pO1xuICAgIH1cbiAgICBmb3IgKGxldCBidG4gb2YgZG9jdW1lbnQuZ2V0RWxlbWVudHNCeUNsYXNzTmFtZSgnbWVudV9faXRlbS0tY2lyY2xlLWJ0bicpKSB7XG4gICAgICAgIGRlbGV0ZUxpc3QucHVzaChidG4pO1xuICAgIH1cbiAgICBmb3IgKGxldCBib3ggb2YgZG9jdW1lbnQuZ2V0RWxlbWVudHNCeUNsYXNzTmFtZSgnbWVudV9fYm9keS0tY29udGFpbmVyJykpIHtcbiAgICAgICAgZGVsZXRlTGlzdC5wdXNoKGJveCk7XG4gICAgfVxuICAgIGZvciAobGV0IGVsIG9mIGRlbGV0ZUxpc3QpIHtcbiAgICAgICAgZWwucmVtb3ZlKCk7XG4gICAgfVxuICAgIGdldFRva2VuQm9keURhdGEoKTtcbn0iLCAiaW1wb3J0IGF4aW9zIGZyb20gJ2F4aW9zJztcbmltcG9ydCB7IG1hcHMgfSBmcm9tICcuLi9tZW51cy9tYXAubWVudSc7XG5cbi8vID09PSBHRVQgcm91dGVzID09PSAvL1xuXG5leHBvcnQgYXN5bmMgZnVuY3Rpb24gZ2V0TWFwcygpIHtcbiAgICB0cnkge1xuICAgICAgICBjb25zdCByZXMgPSBhd2FpdCBheGlvcy5nZXQoJy9hcGkvbWFwcycpO1xuICAgICAgICBtYXBzLnZhbHVlID0gcmVzLmRhdGE7XG4gICAgfSBjYXRjaCAoZXJyKSB7XG4gICAgICAgIGNvbnNvbGUubG9nKGVycik7XG4gICAgfVxufVxuXG4vLyA9PT0gUE9TVCByb3V0ZXMgPT09IC8vXG5cbmV4cG9ydCBhc3luYyBmdW5jdGlvbiBhZGRNYXAocGF5bG9hZDogYW55KSB7XG4gICAgdHJ5IHtcbiAgICAgICAgY29uc29sZS5sb2cocGF5bG9hZCk7XG4gICAgICAgIGF3YWl0IGF4aW9zLnBvc3QoJy9hcGkvbWFwcycsIHBheWxvYWQpO1xuICAgIH0gY2F0Y2ggKGVycikge1xuICAgICAgICBjb25zb2xlLmxvZyhlcnIpO1xuICAgIH1cbn0iLCAiaW1wb3J0IHsgYWRkTWFwLCBnZXRNYXBzIH0gZnJvbSAnLi4vcm91dGVzL21hcHMucm91dGUnO1xuaW1wb3J0IHsgc2VsZWN0ZWRNZW51LCBtZW51T3BlbiwgY2xvc2VNZW51LCBkaXNhYmxlSG90a2V5cyB9IGZyb20gJy4uL3V0aWxzJztcbmltcG9ydCB7IHJvb3QsIHNldHVwR3JpZCB9IGZyb20gJy4uL2dyaWQnO1xuaW1wb3J0IHsgaW8sIFNvY2tldCB9IGZyb20gXCJzb2NrZXQuaW8tY2xpZW50XCI7XG5cbmNvbnN0IHNvY2tldDogU29ja2V0ID0gaW8oKTtcbmV4cG9ydCBsZXQgbWFwcyA9IHt2YWx1ZTogW119O1xubGV0IGRlZmF1bHRNYXBzID0gW1xuICAgIHtuYW1lOiAnRGVmYXVsdCBNYXAnLCBpbWFnZTogJ2h0dHBzOi8vaW1hZ2VzLnNxdWFyZXNwYWNlLWNkbi5jb20vY29udGVudC92MS81NTExZmM3Y2U0YjBhMzc4MmFhOTQxOGIvMTQyOTEzOTc1OTEyNy1LRkhXQUZGRlZYSldaTldUSVRLSy9sZWFybmluZy10aGUtZ3JpZC1tZXRob2QuanBnJ30sXG5dO1xuXG5leHBvcnQgZnVuY3Rpb24gYWRkRGVmYXVsdE1hcHMoKSB7XG4gICAgZm9yIChsZXQgbWFwIG9mIGRlZmF1bHRNYXBzKSB7XG4gICAgICAgIGFkZE1hcChtYXApO1xuICAgIH1cbn1cblxuZXhwb3J0IGZ1bmN0aW9uIHRvZ2dsZU1hcE1lbnUobWVudU5hbWU6IHN0cmluZykge1xuICAgIG1lbnVPcGVuLnZhbHVlID0gIW1lbnVPcGVuLnZhbHVlO1xuICAgIGlmIChtZW51T3Blbi52YWx1ZSkge1xuICAgICAgICBzZWxlY3RlZE1lbnUudmFsdWUgPSAnbWFwcyc7XG4gICAgICAgIC8vIENyZWF0ZSBtZW51XG4gICAgICAgIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5nYW1lLXBhZ2UtY29udGFpbmVyJykuaW5zZXJ0QWRqYWNlbnRIVE1MKCdiZWZvcmVlbmQnLCBgXG4gICAgICAgICAgICA8ZGl2IGNsYXNzPVwibWVudVwiPlxuICAgICAgICAgICAgICAgIDxidXR0b24gY2xhc3M9XCJtZW51X19idG4gbWVudV9fYnRuLS1jbG9zZVwiPlg8L2J1dHRvbj5cbiAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzPVwibWVudV9fYm9keVwiPjwvZGl2PlxuICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgIGApO1xuICAgICAgICBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcubWVudV9fYnRuLS1jbG9zZScpLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgKCkgPT4gY2xvc2VNZW51KG1lbnVOYW1lKSk7XG4gICAgICAgIGdldE1hcEJvZHlEYXRhKCk7XG4gICAgfSBlbHNlIHtcbiAgICAgICAgY2xvc2VNZW51KG1lbnVOYW1lKTtcbiAgICB9XG59XG5cbmFzeW5jIGZ1bmN0aW9uIGdldE1hcEJvZHlEYXRhKCkge1xuICAgIGF3YWl0IGdldE1hcHMoKTtcbiAgICAvLyBQb3B1bGF0ZSBtZW51IGJvZHlcbiAgICBmb3IgKGxldCBtYXAgb2YgbWFwcy52YWx1ZSkge1xuICAgICAgICBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcubWVudV9fYm9keScpLmluc2VydEFkamFjZW50SFRNTCgnYmVmb3JlZW5kJywgYFxuICAgICAgICAgICAgPGRpdj5cbiAgICAgICAgICAgICAgICA8aW1nIHNyYz0ke21hcC5pbWFnZX0gY2xhc3M9XCJtZW51X19pdGVtIG1lbnVfX2l0ZW0tLW1hcFwiIG9uZGJsY2xpY2s9XCJzZWxlY3RNYXAoZXZlbnQpXCIgaWQ9JHttYXAuaWR9PlxuICAgICAgICAgICAgICAgIDxwIGNsYXNzPVwibWVudV9faXRlbS0tbmFtZVwiPiR7bWFwLm5hbWV9PC9wPlxuICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgIGApO1xuICAgIH1cblxuICAgIC8vIEFkZCBuZXcgbWFwIGJ1dHRvblxuICAgIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5tZW51X19ib2R5JykuaW5zZXJ0QWRqYWNlbnRIVE1MKCdiZWZvcmVlbmQnLCBgXG4gICAgICAgIDxkaXYgY2xhc3M9XCJtZW51X19pdGVtIG1lbnVfX2l0ZW0tLW1hcFwiPlxuICAgICAgICAgICAgPGJ1dHRvbiBjbGFzcz1cImJ0bi0tbmV3LWl0ZW1cIiBvbmNsaWNrPVwibmV3TWFwKCk7XCI+TmV3IE1hcDwvYnV0dG9uPlxuICAgICAgICA8L2Rpdj5cbiAgICBgKTtcbn1cblxuZnVuY3Rpb24gc2VsZWN0TWFwKGU6IGFueSkge1xuICAgIGZvciAobGV0IG1hcCBvZiBtYXBzLnZhbHVlKSB7XG4gICAgICAgIGlmIChtYXAuaWQgPT09IHBhcnNlSW50KGUudGFyZ2V0LmdldEF0dHJpYnV0ZSgnaWQnKSkpIHtcbiAgICAgICAgICAgIHNvY2tldC5lbWl0KCdTRUxFQ1RfTUFQJywge3dpZHRoOiBlLnRhcmdldC5jbGllbnRXaWR0aCwgaGVpZ2h0OiBlLnRhcmdldC5jbGllbnRIZWlnaHR9LCBtYXApO1xuICAgICAgICB9XG4gICAgfVxufVxuXG5zb2NrZXQub24oJ1NFTEVDVF9NQVAnLCAoKGUsIG1hcCkgPT4ge1xuICAgIGlmIChtYXAubmFtZSA9PT0gJ0RlZmF1bHQgTWFwJykge1xuICAgICAgICAvLyBTZXQgaW1hZ2UgdG8gbm90aGluZ1xuICAgICAgICByb290LnN0eWxlLnNldFByb3BlcnR5KCctLWJhY2tncm91bmQtaW1hZ2UnLCBgdXJsKCcnKWApO1xuICAgICAgICBzZXR1cEdyaWQoMjUsIDI1LCB0cnVlKTtcbiAgICB9IGVsc2Uge1xuICAgICAgICAvLyBTZXQgbmV3IG1hcCBpbWFnZVxuICAgICAgICByb290LnN0eWxlLnNldFByb3BlcnR5KCctLWJhY2tncm91bmQtaW1hZ2UnLCBgdXJsKCR7bWFwLmltYWdlfSlgKTtcbiAgICAgICAgc2V0dXBHcmlkKGUud2lkdGggLyAyLCBlLmhlaWdodCAvIDIsIHRydWUpO1xuICAgIH1cbn0pKTtcblxuZnVuY3Rpb24gbmV3TWFwKCkge1xuICAgIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5tZW51X19ib2R5JykuaW5zZXJ0QWRqYWNlbnRIVE1MKCdiZWZvcmVlbmQnLCBgXG4gICAgICAgIDxmb3JtIGNsYXNzPVwiZm9ybS0tbWVudVwiIG9uc3VibWl0PVwic3VibWl0TmV3TWFwKGV2ZW50KVwiPlxuICAgICAgICAgICAgPGlucHV0IHBsYWNlaG9sZGVyPVwibmFtZVwiIG9uY2hhbmdlPVwibWFwTmFtZUNoYW5nZShldmVudClcIiByZXF1aXJlZD5cbiAgICAgICAgICAgIDxpbnB1dCB0eXBlPVwiZmlsZVwiIGFjY2VwdD1cImltYWdlLypcIiBvbmNoYW5nZT1cIm1hcEltYWdlQ2hhbmdlKGV2ZW50KVwiIHJlcXVpcmVkPlxuICAgICAgICAgICAgPGJ1dHRvbiB0eXBlPVwic3VibWl0XCI+QWRkIE1hcDwvYnV0dG9uPlxuICAgICAgICA8L2Zvcm0+XG4gICAgYCk7XG4gICAgZGlzYWJsZUhvdGtleXMoKTtcbn1cblxuLy8gRm9yIG5ldyBtYXAgZm9ybVxubGV0IG5ld01hcE5hbWU6IHN0cmluZywgbmV3TWFwSW1hZ2U6IHN0cmluZztcbmNvbnN0IG1hcE5hbWVDaGFuZ2UgPSAoZTogYW55KSA9PiBuZXdNYXBOYW1lID0gZS50YXJnZXQudmFsdWU7XG5jb25zdCBtYXBJbWFnZUNoYW5nZSA9IChlOiBhbnkpID0+IG5ld01hcEltYWdlID0gZS50YXJnZXQuZmlsZXNbMF07XG5cbmZ1bmN0aW9uIHN1Ym1pdE5ld01hcChlOiBhbnkpIHtcbiAgICBlLnByZXZlbnREZWZhdWx0KCk7XG4gICAgYWRkTWFwKHsgbmFtZTogbmV3TWFwTmFtZSwgaW1hZ2U6IG5ld01hcEltYWdlIH0pO1xufSIsICJpbXBvcnQgYXhpb3MgZnJvbSAnYXhpb3MnO1xuaW1wb3J0IHsgY2hhbmdlUm91dGUgfSBmcm9tICcuLi91dGlscyc7XG5cbi8vID09PSBHRVQgcm91dGVzID09PSAvL1xuXG5leHBvcnQgYXN5bmMgZnVuY3Rpb24gZ2V0VXNlcigpIHtcbiAgICB0cnkge1xuICAgICAgICBjb25zdCBjb25maWcgPSB7XG4gICAgICAgICAgICBoZWFkZXJzOiB7ICdDb250ZW50LVR5cGUnOiAnYXBwbGljYXRpb24vanNvbicgfSxcbiAgICAgICAgICAgIHdpdGhDcmVkZW50aWFsczogdHJ1ZSxcbiAgICAgICAgfTtcbiAgICAgICAgY29uc3QgcmVzID0gYXdhaXQgYXhpb3MuZ2V0KCcvYXBpL3VzZXInLCBjb25maWcpO1xuICAgICAgICByZXR1cm4gcmVzLmRhdGE7XG4gICAgfSBjYXRjaChlcnIpIHtcbiAgICAgICAgY29uc29sZS5sb2coZXJyKTtcbiAgICB9XG59XG5cbi8vID09PSBQT1NUIHJvdXRlcyA9PT0gLy9cblxuZXhwb3J0IGFzeW5jIGZ1bmN0aW9uIHJlZ2lzdGVyVXNlcihwYXlsb2FkOiBhbnkpIHtcbiAgICB0cnkge1xuICAgICAgICBhd2FpdCBheGlvcy5wb3N0KCcvYXBpL3VzZXIvcmVnaXN0ZXInLCBwYXlsb2FkKTtcbiAgICAgICAgY2hhbmdlUm91dGUoJ2xvZ2luJyk7XG4gICAgfSBjYXRjaChlcnIpIHtcbiAgICAgICAgY29uc29sZS5sb2coZXJyKTtcbiAgICB9XG59XG5cbmV4cG9ydCBhc3luYyBmdW5jdGlvbiBsb2dpblVzZXIocGF5bG9hZDogYW55KSB7XG4gICAgdHJ5IHtcbiAgICAgICAgYXdhaXQgYXhpb3MucG9zdCgnL2FwaS91c2VyL2xvZ2luJywgcGF5bG9hZCk7XG4gICAgICAgIGNoYW5nZVJvdXRlKCdnYW1lJyk7XG4gICAgfSBjYXRjaChlcnIpIHtcbiAgICAgICAgY29uc29sZS5sb2coZXJyKTtcbiAgICB9XG59XG5cbmV4cG9ydCBhc3luYyBmdW5jdGlvbiBsb2dvdXQoKSB7XG4gICAgdHJ5IHtcbiAgICAgICAgYXdhaXQgYXhpb3MucG9zdCgnL2FwaS91c2VyL2xvZ291dCcpO1xuICAgICAgICBjaGFuZ2VSb3V0ZSgnbG9naW4nKTtcbiAgICB9IGNhdGNoKGVycikge1xuICAgICAgICBjb25zb2xlLmxvZyhlcnIpO1xuICAgIH1cbn1cblxuLy8gPT09IFBVVCByb3V0ZXMgPT09IC8vXG5cbmV4cG9ydCBhc3luYyBmdW5jdGlvbiBjaGFuZ2VOZXdVc2VyKHBheWxvYWQ6IGFueSkge1xuICAgIHRyeSB7XG4gICAgICAgIGF3YWl0IGF4aW9zLnB1dCgnL2FwaS91c2VyJywge25ld1N0YXR1czogcGF5bG9hZH0pO1xuICAgIH0gY2F0Y2goZXJyKSB7XG4gICAgICAgIGNvbnNvbGUubG9nKGVycik7XG4gICAgfVxufSIsICJpbXBvcnQgYXhpb3MgZnJvbSAnYXhpb3MnO1xuaW1wb3J0IHsgY2hhcmFjdGVyLCBjaGFyYWN0ZXJzIH0gZnJvbSAnLi4vbWVudXMvY2hhcmFjdGVyLm1lbnUnO1xuXG4vLyA9PT0gR0VUIHJvdXRlcyA9PT0gLy9cblxuZXhwb3J0IGFzeW5jIGZ1bmN0aW9uIGdldENoYXJhY3RlcnMoKSB7XG4gICAgdHJ5IHtcbiAgICAgICAgY29uc3QgcmVzID0gYXdhaXQgYXhpb3MuZ2V0KCcvYXBpL2NoYXJhY3RlcnMnKTtcbiAgICAgICAgY2hhcmFjdGVycy52YWx1ZSA9IHJlcy5kYXRhO1xuICAgIH0gY2F0Y2ggKGVycikge1xuICAgICAgICBjb25zb2xlLmxvZyhlcnIpO1xuICAgIH1cbn1cblxuZXhwb3J0IGFzeW5jIGZ1bmN0aW9uIGdldENoYXJhY3RlcihpZDogc3RyaW5nKSB7XG4gICAgdHJ5IHtcbiAgICAgICAgY29uc3QgcmVzID0gYXdhaXQgYXhpb3MuZ2V0KGAvYXBpL2NoYXJhY3RlcnMvJHtwYXJzZUludChpZCl9YCk7XG4gICAgICAgIHJldHVybiByZXMuZGF0YVswXTtcbiAgICB9IGNhdGNoIChlcnIpIHtcbiAgICAgICAgY29uc29sZS5sb2coZXJyKTtcbiAgICB9XG59XG5cbi8vID09PSBQT1NUIHJvdXRlcyA9PT0gLy9cblxuZXhwb3J0IGFzeW5jIGZ1bmN0aW9uIGFkZENoYXJhY3RlcihwYXlsb2FkOiBhbnkpIHtcbiAgICB0cnkge1xuICAgICAgICBhd2FpdCBheGlvcy5wb3N0KCcvYXBpL2NoYXJhY3RlcnMnLCBwYXlsb2FkKTtcbiAgICB9IGNhdGNoIChlcnIpIHtcbiAgICAgICAgY29uc29sZS5sb2coZXJyKTtcbiAgICB9XG59XG5cbi8vID09PSBQVVQgcm91dGVzID09PSAvL1xuXG5leHBvcnQgYXN5bmMgZnVuY3Rpb24gc2V0SGVhbHRoKHBheWxvYWQ6IGFueSkge1xuICAgIHRyeSB7XG4gICAgICAgIGF3YWl0IGF4aW9zLnB1dCgnL2FwaS9jaGFyYWN0ZXJzL2hlYWx0aCcsIHBheWxvYWQpO1xuICAgICAgICBjaGFyYWN0ZXIudmFsdWUgPSBhd2FpdCBnZXRDaGFyYWN0ZXIocGF5bG9hZC5pZCk7XG4gICAgfSBjYXRjaCAoZXJyKSB7XG4gICAgICAgIGNvbnNvbGUubG9nKGVycik7XG4gICAgfVxufVxuXG5leHBvcnQgYXN5bmMgZnVuY3Rpb24gc2V0VGVtcEhlYWx0aChwYXlsb2FkOiBhbnkpIHtcbiAgICB0cnkge1xuICAgICAgICBhd2FpdCBheGlvcy5wdXQoJy9hcGkvY2hhcmFjdGVycy90ZW1wJywgcGF5bG9hZCk7XG4gICAgICAgIGNoYXJhY3Rlci52YWx1ZSA9IGF3YWl0IGdldENoYXJhY3RlcihwYXlsb2FkLmlkKTtcbiAgICB9IGNhdGNoIChlcnIpIHtcbiAgICAgICAgY29uc29sZS5sb2coZXJyKTtcbiAgICB9XG59IiwgImltcG9ydCB7IG1lbnVPcGVuLCBzZWxlY3RlZE1lbnUsIGNsb3NlTWVudSB9IGZyb20gJy4uL3V0aWxzJztcbmltcG9ydCB7IGdldENoYXJhY3RlcnMsIGdldENoYXJhY3RlciB9IGZyb20gJy4uL3JvdXRlcy9jaGFyYWN0ZXJzLnJvdXRlJztcblxuZXhwb3J0IGxldCBjaGFyYWN0ZXJzOiBhbnkgPSB7dmFsdWU6IFtdfTtcbmV4cG9ydCBsZXQgY2hhcmFjdGVyOiBhbnkgPSB7dmFsdWU6IHt9fTtcblxuZXhwb3J0IGZ1bmN0aW9uIHRvZ2dsZUNoYXJhY3Rlck1lbnUobWVudU5hbWU6IHN0cmluZykge1xuICAgIG1lbnVPcGVuLnZhbHVlID0gIW1lbnVPcGVuLnZhbHVlO1xuICAgIGlmIChtZW51T3Blbi52YWx1ZSkge1xuICAgICAgICBzZWxlY3RlZE1lbnUudmFsdWUgPSAnY2hhcmFjdGVycyc7XG4gICAgICAgIC8vIENyZWF0ZSBtZW51XG4gICAgICAgIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5nYW1lLXBhZ2UtY29udGFpbmVyJykuaW5zZXJ0QWRqYWNlbnRIVE1MKCdiZWZvcmVlbmQnLCBgXG4gICAgICAgICAgICA8ZGl2IGNsYXNzPVwibWVudVwiPlxuICAgICAgICAgICAgICAgIDxidXR0b24gY2xhc3M9XCJtZW51X19idG4gbWVudV9fYnRuLS1jbG9zZVwiPlg8L2J1dHRvbj5cbiAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzPVwibWVudV9fYm9keVwiPjwvZGl2PlxuICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgIGApO1xuICAgICAgICBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcubWVudV9fYnRuLS1jbG9zZScpLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgKCkgPT4gY2xvc2VNZW51KG1lbnVOYW1lKSk7XG4gICAgICAgIGdldENoYXJhY3RlckJvZHlEYXRhKCk7XG4gICAgfSBlbHNlIHtcbiAgICAgICAgY2xvc2VNZW51KG1lbnVOYW1lKTtcbiAgICB9XG59XG5cbmFzeW5jIGZ1bmN0aW9uIGdldENoYXJhY3RlckJvZHlEYXRhKCkge1xuICAgIGF3YWl0IGdldENoYXJhY3RlcnMoKTtcbiAgICBmb3IgKGxldCBjaGFyYWN0ZXIgb2YgY2hhcmFjdGVycykge1xuICAgICAgICBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcubWVudV9fYm9keScpLmluc2VydEFkamFjZW50SFRNTCgnYmVmb3JlZW5kJywgYFxuICAgICAgICAgICAgPGRpdiBjbGFzcz1cIm1lbnVfX2l0ZW0gbWVudV9faXRlbS0tY2hhcmFjdGVyXCIgb25jbGljaz1cInNlbGVjdENoYXJhY3Rlcigke2NoYXJhY3Rlci5pZH0pXCI+XG4gICAgICAgICAgICAgICAgPGltZyBzcmM9JHtjaGFyYWN0ZXIuaW1hZ2V9PlxuICAgICAgICAgICAgICAgIDxkaXY+XG4gICAgICAgICAgICAgICAgICAgIDxwPiR7Y2hhcmFjdGVyLmxldmVsfSAke2NoYXJhY3Rlci5uYW1lfSAke2NoYXJhY3Rlci5jbGFzc308L3A+XG4gICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgYCk7XG4gICAgfVxuXG4gICAgLy8gQWRkIG5ldyBjaGFyYWN0ZXIgYnV0dG9uXG4gICAgZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLm1lbnVfX2JvZHknKS5pbnNlcnRBZGphY2VudEhUTUwoJ2JlZm9yZWVuZCcsIGBcbiAgICAgICAgPGRpdiBjbGFzcz1cIm1lbnVfX2l0ZW0gbWVudV9faXRlbS0tY2hhcmFjdGVyLWJ0blwiPlxuICAgICAgICAgICAgPGJ1dHRvbiBjbGFzcz1cImJ0bi0tbmV3LWl0ZW1cIiBvbmNsaWNrPVwidG9nZ2xlTmV3Q2hhcmFjdGVyV2luZG93KClcIj5OZXcgQ2hhcmFjdGVyPC9idXR0b24+XG4gICAgICAgIDwvZGl2PlxuICAgIGApO1xufVxuXG5hc3luYyBmdW5jdGlvbiBzZWxlY3RDaGFyYWN0ZXIoaWQ6IHN0cmluZykge1xuICAgIGNoYXJhY3RlciA9IGF3YWl0IGdldENoYXJhY3RlcihpZCk7XG4gICAgdG9nZ2xlQ2hhcmFjdGVyTWVudSgnY2hhcmFjdGVycycpO1xufVxuXG4vLyBmdW5jdGlvbiBuZXdDaGFyYWN0ZXIoKSB7XG4vLyAgICAgZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLm1lbnVfX2JvZHknKS5pbnNlcnRBZGphY2VudEhUTUwoJ2JlZm9yZWVuZCcsIGBcbi8vICAgICAgICAgPGZvcm0gY2xhc3M9XCJmb3JtLS1tZW51XCIgb25zdWJtaXQ9XCJzdWJtaXROZXdDaGFyYWN0ZXIoZXZlbnQpXCI+XG4vLyAgICAgICAgICAgICA8aW5wdXQgcGxhY2Vob2xkZXI9XCJuYW1lXCIgb25jaGFuZ2U9XCJjaGFyYWN0ZXJOYW1lQ2hhbmdlKGV2ZW50KVwiIHJlcXVpcmVkPlxuLy8gICAgICAgICAgICAgPGJ1dHRvbiB0eXBlPVwic3VibWl0XCI+QWRkIENoYXJhY3RlcjwvYnV0dG9uPlxuLy8gICAgICAgICA8L2Zvcm0+XG4vLyAgICAgYCk7XG4vLyB9XG5cbi8vIC8vIEZvciBuZXcgY2hhcmFjdGVyIGZvcm1cbi8vIGxldCBuZXdDaGFyYWN0ZXJOYW1lLCBuZXdDaGFyYWN0ZXJMZXZlbCwgbmV3Q2hhcmFjdGVyQ2xhc3MsIG5ld0NoYXJhY3RlclJhY2U7XG4vLyBjb25zdCBjaGFyYWN0ZXJOYW1lQ2hhbmdlID0gKGUpID0+IG5ld0NoYXJhY3Rlck5hbWUgPSBlLnRhcmdldC52YWx1ZTtcblxuLy8gZnVuY3Rpb24gc3VibWl0TmV3Q2hhcmFjdGVyKGUpIHtcbi8vICAgICBlLnByZXZlbnREZWZhdWx0KCk7XG4vLyAgICAgYWRkQ2hhcmFjdGVyKHtuYW1lOiBuZXdNYXBOYW1lLCBpbWFnZTogbmV3TWFwSW1hZ2V9KTtcbi8vIH0iLCAiaW1wb3J0IHsgZ2V0Q3JlYXR1cmVCeUluZGV4IH0gZnJvbSAnLi9yb3V0ZXMvY3JlYXR1cmVzLnJvdXRlJztcbmltcG9ydCB7IGRyYWdFbGVtZW50IH0gZnJvbSAnLi91dGlscyc7XG5cbmxldCBjcmVhdHVyZUluZGV4TGlzdCA9IFtdO1xuXG5leHBvcnQgYXN5bmMgZnVuY3Rpb24gb3BlbkNyZWF0dXJlU3RhdHNXaW5kb3coaW5kZXg6IHN0cmluZywgY3VzdG9tOiBib29sZWFuKSB7XG4gICAgLy8gQ2hlY2sgaWYgYSBjcmVhdHVyZSdzIHN0YXRzIGFyZSBhbHJlYWR5IG9wZW5cbiAgICAvLyBJZiB0aGV5IGFyZSBvcGVuIHRoZSBjbG9zZSB0aGUgd2luZG93IGluc3RlYWRcbiAgICBmb3IgKGxldCBsaXN0SXRlbSBvZiBjcmVhdHVyZUluZGV4TGlzdCkge1xuICAgICAgICBpZiAobGlzdEl0ZW0gPT09IGluZGV4KSB7XG4gICAgICAgICAgICBpZiAoZG9jdW1lbnQucXVlcnlTZWxlY3RvcihgLmNyZWF0dXJlLXN0YXRzLXdpbmRvdy0tJHtpbmRleH1gKSkgZG9jdW1lbnQucXVlcnlTZWxlY3RvcihgLmNyZWF0dXJlLXN0YXRzLXdpbmRvdy0tJHtpbmRleH1gKS5yZW1vdmUoKTsgICAgICAgICBcbiAgICAgICAgICAgIGNyZWF0dXJlSW5kZXhMaXN0LnNwbGljZShjcmVhdHVyZUluZGV4TGlzdC5pbmRleE9mKGluZGV4KSwgMSk7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cbiAgICB9XG4gICAgY3JlYXR1cmVJbmRleExpc3QucHVzaChpbmRleCk7XG4gICAgLy8gR2V0IGRhdGEgZm9yIHNlbGVjdGVkIGNyZWF0dXJlXG4gICAgbGV0IGNyZWF0dXJlID0gYXdhaXQgZ2V0Q3JlYXR1cmVCeUluZGV4KGluZGV4LCBjdXN0b20pO1xuICAgIHJlbmRlckNyZWF0dXJlU3RhdHNXaW5kb3coY3JlYXR1cmUpO1xufVxuXG5jb25zdCBjcmVhdHVyZVN0YXRzV2luZG93ID0gKGNyZWF0dXJlOiBhbnkpID0+IGBcbiAgICA8ZGl2IGNsYXNzPVwiY3JlYXR1cmUtc3RhdHMtY29udGVudFwiPlxuICAgICAgICA8YnV0dG9uIGNsYXNzPVwiYnRuLS13aW5kb3ctY2xvc2UgY3JlYXR1cmUtc3RhdHMtY2xvc2UtYnRuXCI+WDwvYnV0dG9uPlxuICAgICAgICA8ZGl2IGNsYXNzPVwiY3JlYXR1cmUtc3RhdHMtd2luZG93X19oZWFkZXIgY3JlYXR1cmUtc3RhdHMtd2luZG93LS0ke2NyZWF0dXJlLmluZGV4fV9faGVhZGVyXCI+XG4gICAgICAgICAgICA8aDM+JHtjcmVhdHVyZS5uYW1lfTwvaDM+XG4gICAgICAgICAgICA8cD4ke2NyZWF0dXJlLnNpemUgPyBgJHtjcmVhdHVyZS5zaXplfWAgOiAnJ30ke2NyZWF0dXJlLnR5cGUgPyBgICR7Y3JlYXR1cmUudHlwZX1gIDogJyd9JHtjcmVhdHVyZS5hbGlnbm1lbnQgPyBgLCAke2NyZWF0dXJlLmFsaWdubWVudH1gOiAnJ308L3A+XG4gICAgICAgIDwvZGl2PlxuICAgICAgICA8ZGl2IGNsYXNzPVwiY3JlYXR1cmUtc3RhdHMtd2luZG93X19ib2R5XCI+XG4gICAgICAgICAgICA8cD48c3BhbiBjbGFzcz1cImJvbGRcIj5Bcm1vciBDbGFzczwvc3Bhbj4gJHtjcmVhdHVyZS5hY308L3A+XG4gICAgICAgICAgICA8cD48c3BhbiBjbGFzcz1cImJvbGRcIj5IZWFsdGg8L3NwYW4+ICR7Y3JlYXR1cmUuaGl0X3BvaW50c30gJHtjcmVhdHVyZS5oaXRfZGljZSA/IGAoJHtjcmVhdHVyZS5oaXRfZGljZX0pYCA6ICcnfTwvcD5cbiAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJjcmVhdHVyZS1zdGF0cy13aW5kb3dfX3NwZWVkXCIgaWQ9XCJzcGVlZC0tJHtjcmVhdHVyZS5pbmRleH1cIj48L2Rpdj5cbiAgICAgICAgPGRpdiBjbGFzcz1cImNyZWF0dXJlcy13aW5kb3dfX2JvZHktLWdlbmVyYWwtc3RhdHNcIj5cbiAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJjcmVhdHVyZS1zdGF0cy13aW5kb3dfX3Njb3Jlc1wiIGlkPVwic2NvcmVzLS0ke2NyZWF0dXJlLmluZGV4fVwiPjwvZGl2PlxuICAgICAgICAgICAgPGRpdiBjbGFzcz1cImNyZWF0dXJlLXN0YXRzLXdpbmRvd19fcHJvZmljaWVuY2llc1wiIGlkPVwicHJvZmljaWVuY2llcy0tJHtjcmVhdHVyZS5pbmRleH1cIj48L2Rpdj5cbiAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJjcmVhdHVyZS1zdGF0cy13aW5kb3dfX3Byb2ZpY2llbmNpZXNcIiBpZD1cInNraWxscy0tJHtjcmVhdHVyZS5pbmRleH1cIj48L2Rpdj5cbiAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJjcmVhdHVyZS1zdGF0cy13aW5kb3dfX3Z1bC1yZXNcIiBpZD1cInZ1bC1yZXMtLSR7Y3JlYXR1cmUuaW5kZXh9XCI+PC9kaXY+XG4gICAgICAgICAgICA8ZGl2IGNsYXNzPVwiY3JlYXR1cmUtc3RhdHMtd2luZG93X19zZW5zZXNcIiBpZD1cInNlbnNlcy0tJHtjcmVhdHVyZS5pbmRleH1cIj48L2Rpdj5cbiAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJjcmVhdHVyZS1zdGF0cy13aW5kb3dfX2xhbmd1YWdlc1wiPlxuICAgICAgICAgICAgICAgICR7Y3JlYXR1cmUubGFuZ3VhZ2VzID8gYDxwPjxzcGFuIGNsYXNzPVwiYm9sZFwiPkxhbmd1YWdlczwvc3Bhbj4gJHtjcmVhdHVyZS5sYW5ndWFnZXN9PC9wPmAgOiBgYH1cbiAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgPGRpdiBjbGFzcz1cImNyZWF0dXJlLXN0YXRzLXdpbmRvd19fYm9keVwiPlxuICAgICAgICAgICAgICAgIDxwPjxzcGFuIGNsYXNzPVwiYm9sZFwiPkNoYWxsZW5nZTwvc3Bhbj4gJHtjcmVhdHVyZS5jciA/IGNyZWF0dXJlLmNyIDogJy0nfSAoJHtjcmVhdHVyZS54cCA/IGNyZWF0dXJlLnhwIDogMH0gWFApPC9wPlxuICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgIDwvZGl2PlxuICAgICAgICA8ZGl2IGNsYXNzPVwiY3JlYXR1cmUtc3RhdHMtd2luZG93X19zcGVjaWFsLWFiaWxpdGllc1wiIGlkPVwic3BlY2lhbC1hYmlsaXRpZXMtLSR7Y3JlYXR1cmUuaW5kZXh9XCI+PC9kaXY+XG4gICAgICAgICR7Y3JlYXR1cmUuYWN0aW9ucy5sZW5ndGggPiAwID8gYDxkaXYgY2xhc3M9XCJjcmVhdHVyZXMtd2luZG93X19ib2R5LS1hY3Rpb25zXCI+XG4gICAgICAgICAgICA8aDQ+QWN0aW9uczwvaDQ+XG4gICAgICAgICAgICA8ZGl2IGNsYXNzPVwiY3JlYXR1cmUtc3RhdHMtd2luZG93X19hY3Rpb25zXCIgaWQ9XCJhY3Rpb25zLS0ke2NyZWF0dXJlLmluZGV4fVwiPjwvZGl2PlxuICAgICAgICA8L2Rpdj5gIDogJyd9XG4gICAgICAgICR7Y3JlYXR1cmUubGVnQWN0aW9ucy5sZW5ndGggPiAwID8gYDxkaXYgY2xhc3M9XCJjcmVhdHVyZXMtd2luZG93X19ib2R5LS1hY3Rpb25zXCI+XG4gICAgICAgICAgICA8aDQ+TGVnZW5kYXJ5IEFjdGlvbnM8L2g0PlxuICAgICAgICAgICAgPGRpdiBjbGFzcz1cImNyZWF0dXJlLXN0YXRzLXdpbmRvd19fbGVnZW5kYXJ5LWFjdGlvbnNcIiBpZD1cImxlZ2VuZGFyeS1hY3Rpb25zLS0ke2NyZWF0dXJlLmluZGV4fVwiPjwvZGl2PlxuICAgICAgICA8L2Rpdj5gIDogJyd9XG4gICAgPC9kaXY+XG5gO1xuXG5mdW5jdGlvbiBjcmVhdGVDcmVhdHVyZUNsb3NlQnRuKCkge1xuICAgIC8vIDxidXR0b24gY2xhc3M9XCJidG4tLXdpbmRvdy1jbG9zZVwiIGNsYXNzPVwiY3JlYXR1cmUtc3RhdHMtY2xvc2UtYnRuXCI+WDwvYnV0dG9uPlxuICAgIC8vIGNvbnN0IGJ0biA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2J1dHRvbicpO1xuICAgIC8vIGJ0bi5pbnNlcnRBZGphY2VudEhUTUwoJ2JlZm9yZWVuZCcsICdYJyk7XG4gICAgLy8gYnRuLmNsYXNzTGlzdC5hZGQoJ2J0bi0td2luZG93LWNsb3NlJyk7XG4gICAgLy8gYnRuLmNsYXNzTGlzdC5hZGQoJ2NyZWF0dXJlLXN0YXRzLWNsb3NlLWJ0bicpO1xuICAgIC8vIHJldHVybiBidG47XG59XG5cbmZ1bmN0aW9uIHJlbmRlckNyZWF0dXJlU3RhdHNXaW5kb3coY3JlYXR1cmU6IGFueSkge1xuICAgIGNvbnN0IHdpbmRvdyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJ2JvZHknKS5hcHBlbmRDaGlsZChkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKSk7XG4gICAgd2luZG93LmNsYXNzTGlzdC5hZGQoJ2NyZWF0dXJlLXN0YXRzLXdpbmRvdycpO1xuICAgIHdpbmRvdy5jbGFzc0xpc3QuYWRkKGBjcmVhdHVyZS1zdGF0cy13aW5kb3ctLSR7Y3JlYXR1cmUuaW5kZXh9YCk7XG4gICAgd2luZG93Lmluc2VydEFkamFjZW50SFRNTCgnYmVmb3JlZW5kJywgY3JlYXR1cmVTdGF0c1dpbmRvdyhjcmVhdHVyZSkpO1xuXG4gICAgLy8gUG9wdWxhdGUgYm9keSBkYXRhXG4gICAgZ2V0Q3JlYXR1cmVTcGVlZERhdGEoY3JlYXR1cmUpO1xuICAgIGdldENyZWF0dXJlU2NvcmVzRGF0YShjcmVhdHVyZSk7XG4gICAgZ2V0Q3JlYXR1cmVQcm9maWNpZW5jeURhdGEoY3JlYXR1cmUpO1xuICAgIGdldENyZWF0dXJlVnVsUmVzRGF0YShjcmVhdHVyZSk7XG4gICAgZ2V0Q3JlYXR1cmVTZW5zZXNEYXRhKGNyZWF0dXJlKTtcbiAgICBnZXRDcmVhdHVyZVNwZWNpYWxBYmlsaXR5RGF0YShjcmVhdHVyZSk7XG4gICAgZ2V0Q3JlYXR1cmVBY3Rpb25zRGF0YShjcmVhdHVyZSk7XG4gICAgZ2V0Q3JlYXR1cmVMZWdBY3Rpb25zRGF0YShjcmVhdHVyZSk7XG5cbiAgICAvLyBNYWtlIHRoaXMgd2luZG93IGRyYWdnYWJsZVxuICAgIGRyYWdFbGVtZW50KHdpbmRvdywgYGNyZWF0dXJlLXN0YXRzLXdpbmRvdy0tJHtjcmVhdHVyZS5pbmRleH1gKTtcbiAgICBcbiAgICBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKCcuY3JlYXR1cmUtc3RhdHMtY2xvc2UtYnRuJykuZm9yRWFjaChidG4gPT4ge1xuICAgICAgICBidG4uYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCAoKSA9PiB7XG4gICAgICAgICAgICByZW1vdmVDcmVhdHVyZVN0YXRzV2luZG93KGNyZWF0dXJlLmluZGV4KTtcbiAgICAgICAgfSk7XG4gICAgfSk7XG59XG5cblxuLy8gPT09IENyZWF0dXJlIERhdGEgPT09IC8vXG5cbmZ1bmN0aW9uIGdldENyZWF0dXJlU3BlZWREYXRhKGNyZWF0dXJlOiBhbnkpIHtcbiAgICBsZXQgc3BlZWRzID0gW107XG4gICAgbGV0IGV4aXN0cyA9IGZhbHNlO1xuICAgIGNyZWF0dXJlLnNwZWVkcy5mb3JFYWNoKChzcGVlZDogYW55KSA9PiB7XG4gICAgICAgIGlmIChzcGVlZC52YWx1ZSkge1xuICAgICAgICAgICAgZXhpc3RzID0gdHJ1ZTtcbiAgICAgICAgICAgIHNwZWVkcy5wdXNoKHNwZWVkKTtcbiAgICAgICAgfVxuICAgIH0pO1xuICAgIGlmICghZXhpc3RzKSByZXR1cm47XG5cbiAgICBjb25zdCB0ZXh0ID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoYHNwZWVkLS0ke2NyZWF0dXJlLmluZGV4fWApLmFwcGVuZENoaWxkKGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ3AnKSk7XG4gICAgdGV4dC5pbnNlcnRBZGphY2VudEhUTUwoJ2JlZm9yZWVuZCcsIGA8c3BhbiBjbGFzcz1cImJvbGRcIj5TcGVlZCA8L3NwYW4+YCk7XG4gICAgc3BlZWRzLmZvckVhY2goKHNwZWVkKSA9PiB7XG4gICAgICAgIHRleHQuaW5zZXJ0QWRqYWNlbnRIVE1MKCdiZWZvcmVlbmQnLCBgXG4gICAgICAgICAgICAke3NwZWVkLm5hbWV9ICR7c3BlZWQudmFsdWV9IGZ0LixcbiAgICAgICAgYCk7XG4gICAgfSk7XG59XG5cbmZ1bmN0aW9uIGdldENyZWF0dXJlU2NvcmVzRGF0YShjcmVhdHVyZTogYW55KSB7XG4gICAgbGV0IHNjb3JlTmFtZXMgPSBbJ1N0cicsICdEZXgnLCAnQ29uJywgJ0ludCcsICdXaXMnLCAnQ2hhciddO1xuICAgIGxldCBzY29yZVZhbHVlcyA9IFtcbiAgICAgICAgY3JlYXR1cmUuc3RyLFxuICAgICAgICBjcmVhdHVyZS5kZXgsXG4gICAgICAgIGNyZWF0dXJlLmNvbixcbiAgICAgICAgY3JlYXR1cmUuaW50LFxuICAgICAgICBjcmVhdHVyZS53aXMsXG4gICAgICAgIGNyZWF0dXJlLmNoYXJcbiAgICBdO1xuICAgIFxuICAgIGZvciAobGV0IGkgPSAwOyBpIDwgNjsgaSsrKSB7XG4gICAgICAgIGxldCBtb2RpZmllciA9IE1hdGguZmxvb3IoKHNjb3JlVmFsdWVzW2ldIC0gMTApIC8gMik7XG4gICAgICAgIGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKGBzY29yZXMtLSR7Y3JlYXR1cmUuaW5kZXh9YCkuaW5zZXJ0QWRqYWNlbnRIVE1MKCdiZWZvcmVlbmQnLCBgXG4gICAgICAgICAgICA8ZGl2IGNsYXNzPVwiY3JlYXR1cmUtc2NvcmVzX19ib3hcIj5cbiAgICAgICAgICAgICAgICA8c3BhbiBjbGFzcz1cImJvbGRcIj48cD4ke3Njb3JlTmFtZXNbaV19PC9wPjwvc3Bhbj5cbiAgICAgICAgICAgICAgICA8cD4ke21vZGlmaWVyIDwgMCA/ICcnIDogJysnfSR7bW9kaWZpZXJ9PC9wPlxuICAgICAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJjcmVhdHVyZS1zY29yZXNfX21vZGlmaWVyXCI+XG4gICAgICAgICAgICAgICAgICAgIDxwPiR7c2NvcmVWYWx1ZXNbaV19PC9wPlxuICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgIGApO1xuICAgIH1cbn1cblxuZnVuY3Rpb24gZ2V0Q3JlYXR1cmVQcm9maWNpZW5jeURhdGEoY3JlYXR1cmU6IGFueSkge1xuICAgIGNvbnN0IHRleHQgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChgcHJvZmljaWVuY2llcy0tJHtjcmVhdHVyZS5pbmRleH1gKS5hcHBlbmRDaGlsZChkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdwJykpO1xuICAgIHRleHQuaW5zZXJ0QWRqYWNlbnRIVE1MKCdiZWZvcmVlbmQnLGA8c3BhbiBjbGFzcz1cImJvbGRcIj5TYXZpbmcgVGhyb3dzIDwvc3Bhbj5gKTtcbiAgICBsZXQgc2tpbGxzID0gW107XG4gICAgbGV0IHN0cmluZyA9ICcnO1xuXG4gICAgY3JlYXR1cmUucHJvZmljaWVuY2llcy5mb3JFYWNoKChwcm9maWNpZW5jeTogYW55KSA9PiB7XG4gICAgICAgIGNvbnN0IG1vZGlmaWVkUHJvZiA9IHNlcGFyYXRlUHJvZihwcm9maWNpZW5jeS5uYW1lICsgcHJvZmljaWVuY3kudmFsdWUsIHByb2ZpY2llbmN5LnZhbHVlLCBwcm9maWNpZW5jeS5uYW1lKTtcbiAgICAgICAgaWYgKHByb2ZpY2llbmN5Lm5hbWUuaW5jbHVkZXMoJ1NhdmluZycpKSB7XG4gICAgICAgICAgICBzdHJpbmcgKz0gYCAke21vZGlmaWVkUHJvZn0gKyR7cHJvZmljaWVuY3kudmFsdWV9LGA7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBza2lsbHMucHVzaCh7bmFtZTogbW9kaWZpZWRQcm9mLCB2YWx1ZTogcHJvZmljaWVuY3kudmFsdWV9KTtcbiAgICAgICAgfVxuICAgIH0pO1xuICAgIHN0cmluZyA9IHN0cmluZy5yZXBsYWNlKC8sKiQvLCAnJyk7XG4gICAgdGV4dC5pbnNlcnRBZGphY2VudEhUTUwoJ2JlZm9yZWVuZCcsIHN0cmluZyk7XG4gICAgLy8gSWYgdGhlcmUgYXJlIG5vIHNhdmVzLCByZW1vdmUgdGhlIHNlY3Rpb25cbiAgICBpZiAoc3RyaW5nID09PSAnJykgdGV4dC5yZW1vdmUoKTtcblxuICAgIHN0cmluZyA9ICcnO1xuICAgIGNvbnN0IHNraWxsc1RleHQgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChgc2tpbGxzLS0ke2NyZWF0dXJlLmluZGV4fWApLmFwcGVuZENoaWxkKGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ3AnKSk7XG4gICAgc2tpbGxzVGV4dC5pbnNlcnRBZGphY2VudEhUTUwoJ2JlZm9yZWVuZCcsYDxzcGFuIGNsYXNzPVwiYm9sZFwiPlNraWxscyA8L3NwYW4+YCk7XG4gICAgc2tpbGxzLmZvckVhY2goKHNraWxsKSA9PiB7XG4gICAgICAgIHN0cmluZyArPSBgICR7c2tpbGwubmFtZX0gKyR7c2tpbGwudmFsdWV9LGA7XG4gICAgfSk7XG4gICAgc3RyaW5nID0gc3RyaW5nLnJlcGxhY2UoLywqJC8sICcnKTtcbiAgICBza2lsbHNUZXh0Lmluc2VydEFkamFjZW50SFRNTCgnYmVmb3JlZW5kJywgc3RyaW5nKTtcbiAgICAvLyBJZiB0aGVyZSBhcmUgbm8gc2tpbGxzLCByZW1vdmUgdGhlIHNlY3Rpb25cbiAgICBpZiAoc3RyaW5nID09PSAnJykgc2tpbGxzVGV4dC5yZW1vdmUoKTtcbn1cblxuZnVuY3Rpb24gZ2V0Q3JlYXR1cmVWdWxSZXNEYXRhKGNyZWF0dXJlOiBhbnkpIHtcbiAgICAvLyBWdWxuZXJhYmlsaXRpZXNcbiAgICBpZiAoY3JlYXR1cmUudnVsbmVyYWJpbGl0aWVzLmxlbmd0aCA+IDApIHtcbiAgICAgICAgY29uc3QgdGV4dCA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKGB2dWwtcmVzLS0ke2NyZWF0dXJlLmluZGV4fWApLmFwcGVuZENoaWxkKGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ3AnKSk7XG4gICAgICAgIHRleHQuaW5zZXJ0QWRqYWNlbnRIVE1MKCdiZWZvcmVlbmQnLGA8c3BhbiBjbGFzcz1cImJvbGRcIj5WdWxuZXJhYmlsaXRpZXMgPC9zcGFuPmApO1xuICAgICAgICBsZXQgc3RyaW5nID0gJyc7XG5cbiAgICAgICAgY3JlYXR1cmUudnVsbmVyYWJpbGl0aWVzLmZvckVhY2goKHN0YXQ6IGFueSkgPT4ge1xuICAgICAgICAgICAgc3RyaW5nICs9IGAgJHtzdGF0fSxgO1xuICAgICAgICB9KTtcbiAgICAgICAgc3RyaW5nID0gc3RyaW5nLnJlcGxhY2UoLywqJC8sICcnKTtcbiAgICAgICAgdGV4dC5pbnNlcnRBZGphY2VudEhUTUwoJ2JlZm9yZWVuZCcsIHN0cmluZyk7XG4gICAgfVxuXG4gICAgLy8gUmVzaXN0YW5jZXNcbiAgICBpZiAoY3JlYXR1cmUucmVzaXN0YW5jZXMubGVuZ3RoID4gMCkge1xuICAgICAgICBjb25zdCB0ZXh0ID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoYHZ1bC1yZXMtLSR7Y3JlYXR1cmUuaW5kZXh9YCkuYXBwZW5kQ2hpbGQoZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgncCcpKTtcbiAgICAgICAgdGV4dC5pbnNlcnRBZGphY2VudEhUTUwoJ2JlZm9yZWVuZCcsYDxzcGFuIGNsYXNzPVwiYm9sZFwiPlJlc2lzdGFuY2VzIDwvc3Bhbj5gKTtcbiAgICAgICAgbGV0IHN0cmluZyA9ICcnO1xuXG4gICAgICAgIGNyZWF0dXJlLnJlc2lzdGFuY2VzLmZvckVhY2goKHN0YXQ6IGFueSkgPT4ge1xuICAgICAgICAgICAgc3RyaW5nICs9IGAgJHtzdGF0fSxgO1xuICAgICAgICB9KTtcbiAgICAgICAgc3RyaW5nID0gc3RyaW5nLnJlcGxhY2UoLywqJC8sICcnKTtcbiAgICAgICAgdGV4dC5pbnNlcnRBZGphY2VudEhUTUwoJ2JlZm9yZWVuZCcsIHN0cmluZyk7XG4gICAgfVxuXG4gICAgLy8gRGFtYWdlIGltbXVuaXRpZXNcbiAgICBpZiAoY3JlYXR1cmUuZGFtYWdlSW1tdW5pdGllcy5sZW5ndGggPiAwKSB7XG4gICAgICAgIGNvbnN0IHRleHQgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChgdnVsLXJlcy0tJHtjcmVhdHVyZS5pbmRleH1gKS5hcHBlbmRDaGlsZChkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdwJykpO1xuICAgICAgICB0ZXh0Lmluc2VydEFkamFjZW50SFRNTCgnYmVmb3JlZW5kJyxgPHNwYW4gY2xhc3M9XCJib2xkXCI+RGFtYWdlIEltbXVuaXRpZXMgPC9zcGFuPmApO1xuICAgICAgICBsZXQgc3RyaW5nID0gJyc7XG5cbiAgICAgICAgY3JlYXR1cmUuZGFtYWdlSW1tdW5pdGllcy5mb3JFYWNoKChzdGF0OiBhbnkpID0+IHtcbiAgICAgICAgICAgIHN0cmluZyArPSBgICR7c3RhdH0sYDtcbiAgICAgICAgfSk7XG4gICAgICAgIHN0cmluZyA9IHN0cmluZy5yZXBsYWNlKC8sKiQvLCAnJyk7XG4gICAgICAgIHRleHQuaW5zZXJ0QWRqYWNlbnRIVE1MKCdiZWZvcmVlbmQnLCBzdHJpbmcpO1xuICAgIH1cblxuICAgIC8vIENvbmRpdGlvbiBpbW11bml0aWVzXG4gICAgaWYgKGNyZWF0dXJlLmNvbmRpdGlvbkltbXVuaXRpZXMubGVuZ3RoID4gMCkge1xuICAgICAgICBjb25zdCB0ZXh0ID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoYHZ1bC1yZXMtLSR7Y3JlYXR1cmUuaW5kZXh9YCkuYXBwZW5kQ2hpbGQoZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgncCcpKTtcbiAgICAgICAgdGV4dC5pbnNlcnRBZGphY2VudEhUTUwoJ2JlZm9yZWVuZCcsYDxzcGFuIGNsYXNzPVwiYm9sZFwiPkNvbmRpdGlvbiBJbW11bml0aWVzIDwvc3Bhbj5gKTtcbiAgICAgICAgbGV0IHN0cmluZyA9ICcnO1xuXG4gICAgICAgIGNyZWF0dXJlLmNvbmRpdGlvbkltbXVuaXRpZXMuZm9yRWFjaCgoc3RhdDogYW55KSA9PiB7XG4gICAgICAgICAgICBzdHJpbmcgKz0gYCAke3N0YXR9LGA7XG4gICAgICAgIH0pO1xuICAgICAgICBzdHJpbmcgPSBzdHJpbmcucmVwbGFjZSgvLCokLywgJycpO1xuICAgICAgICB0ZXh0Lmluc2VydEFkamFjZW50SFRNTCgnYmVmb3JlZW5kJywgc3RyaW5nKTtcbiAgICB9XG59XG5cbmZ1bmN0aW9uIGdldENyZWF0dXJlU2Vuc2VzRGF0YShjcmVhdHVyZTogYW55KSB7XG4gICAgaWYgKGNyZWF0dXJlLnNlbnNlcy5sZW5ndGggPT09IDApIHJldHVybjtcbiAgICBjb25zdCB0ZXh0ID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoYHNlbnNlcy0tJHtjcmVhdHVyZS5pbmRleH1gKS5hcHBlbmRDaGlsZChkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdwJykpO1xuICAgIHRleHQuaW5zZXJ0QWRqYWNlbnRIVE1MKCdiZWZvcmVlbmQnLGA8c3BhbiBjbGFzcz1cImJvbGRcIj5TZW5zZXMgPC9zcGFuPmApO1xuICAgIGxldCBzdHJpbmcgPSAnJztcblxuICAgIGNyZWF0dXJlLnNlbnNlcy5mb3JFYWNoKChzZW5zZSkgPT4ge1xuICAgICAgICBpZiAoc2Vuc2UubmFtZS5pbmNsdWRlcygncGFzc2l2ZScpIHx8IHNlbnNlLm5hbWUuaW5jbHVkZXMoJ1Bhc3NpdmUnKSkge1xuICAgICAgICAgICAgc3RyaW5nICs9IGAgJHtzZW5zZS5uYW1lfSAke3NlbnNlLnZhbHVlfSxgO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgc3RyaW5nICs9IGAgJHtzZW5zZS5uYW1lfSAke3NlbnNlLnZhbHVlfSBmdC4sYDtcbiAgICAgICAgfVxuICAgIH0pO1xuICAgIHN0cmluZyA9IHN0cmluZy5yZXBsYWNlKC8sKiQvLCAnJyk7XG4gICAgdGV4dC5pbnNlcnRBZGphY2VudEhUTUwoJ2JlZm9yZWVuZCcsIHN0cmluZyk7XG59XG5cbmZ1bmN0aW9uIGdldENyZWF0dXJlU3BlY2lhbEFiaWxpdHlEYXRhKGNyZWF0dXJlOiBhbnkpIHtcbiAgICBjcmVhdHVyZS5hYmlsaXRpZXMuZm9yRWFjaCgoYWJpbGl0eTogYW55KSA9PiB7XG4gICAgICAgIGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKGBzcGVjaWFsLWFiaWxpdGllcy0tJHtjcmVhdHVyZS5pbmRleH1gKS5pbnNlcnRBZGphY2VudEhUTUwoJ2JlZm9yZWVuZCcsIGBcbiAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJzcGVjaWFsLWFiaWxpdGllc19fYm94XCI+XG4gICAgICAgICAgICAgICAgPHAgY2xhc3M9XCJzcGVjaWFsLWFiaWxpdGllc19fbmFtZVwiPjxzcGFuIGNsYXNzPVwiYm9sZFwiPiR7YWJpbGl0eS5uYW1lfS48L3NwYW4+ICR7YWJpbGl0eS5kZXNjfTwvcD5cbiAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICBgKTtcbiAgICB9KTtcbn1cblxuZnVuY3Rpb24gZ2V0Q3JlYXR1cmVBY3Rpb25zRGF0YShjcmVhdHVyZTogYW55KSB7XG4gICAgbGV0IGkgPSAwO1xuICAgIGNyZWF0dXJlLmFjdGlvbnMuZm9yRWFjaCgoYWN0aW9uKSA9PiB7XG4gICAgICAgIGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKGBhY3Rpb25zLS0ke2NyZWF0dXJlLmluZGV4fWApLmluc2VydEFkamFjZW50SFRNTCgnYmVmb3JlZW5kJywgYFxuICAgICAgICAgICAgPGRpdiBjbGFzcz1cImFjdGlvbnNfX2JveFwiPlxuICAgICAgICAgICAgICAgIDxwIGNsYXNzPVwiYWN0aW9uc19fbmFtZVwiPjxzcGFuIGNsYXNzPVwiYm9sZFwiPiR7YWN0aW9uLm5hbWV9Ljwvc3Bhbj4gJHthY3Rpb24uZGVzY308L3A+XG4gICAgICAgICAgICAgICAgJHthY3Rpb24uYXR0YWNrX2JvbnVzID8gYDxidXR0b24gY2xhc3M9XCJidG4tLWF0dGFjayBidG4tLWhvdmVyXCI+PGkgY2xhc3M9XCJmYS1zb2xpZCBmYS1kaWNlLWQyMFwiPjwvaT4gKyR7YWN0aW9uLmF0dGFja19ib251c308L2J1dHRvbj5gIDogJyd9XG4gICAgICAgICAgICAgICAgPHNwYW4gaWQ9XCIke2NyZWF0dXJlLmluZGV4fS0ke2FjdGlvbi5uYW1lfS0ke2l9XCI+PC9zcGFuPlxuICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgIGApO1xuICAgICAgICBpKys7XG4gICAgfSk7XG5cbiAgICBpID0gMDtcbiAgICBjcmVhdHVyZS5hY3Rpb25zLmZvckVhY2goKGFjdGlvbjogYW55KSA9PiB7XG4gICAgICAgIGxldCBlbGVtZW50ID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoYCR7Y3JlYXR1cmUuaW5kZXh9LSR7YWN0aW9uLm5hbWV9LSR7aX1gKTtcbiAgICAgICAgZWxlbWVudC5jbGFzc0xpc3QuYWRkKCdhY3Rpb25zX19ib3gtLWRtZ19kaWNlJyk7XG5cbiAgICAgICAgYWN0aW9uLmRhbWFnZS5mb3JFYWNoKChkbWc6IGFueSkgPT4ge1xuICAgICAgICAgICAgZWxlbWVudC5pbnNlcnRBZGphY2VudEhUTUwoJ2JlZm9yZWVuZCcsIGA8YnV0dG9uIGNsYXNzPVwiYnRuLS1hdHRhY2sgYnRuLS1ob3ZlclwiPiR7ZG1nLmRhbWFnZURpY2V9ICR7ZG1nLmRhbWFnZVR5cGV9PC9idXR0b24+YCk7XG4gICAgICAgIH0pO1xuICAgICAgICBpKys7XG4gICAgfSk7XG59XG5cbmZ1bmN0aW9uIGdldENyZWF0dXJlTGVnQWN0aW9uc0RhdGEoY3JlYXR1cmU6IGFueSkge1xuICAgIGxldCBpID0gMDtcbiAgICBjcmVhdHVyZS5sZWdBY3Rpb25zLmZvckVhY2goKGFjdGlvbjogYW55KSA9PiB7XG4gICAgICAgIGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKGBsZWdlbmRhcnktYWN0aW9ucy0tJHtjcmVhdHVyZS5pbmRleH1gKS5pbnNlcnRBZGphY2VudEhUTUwoJ2JlZm9yZWVuZCcsIGBcbiAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJhY3Rpb25zX19ib3hcIj5cbiAgICAgICAgICAgICAgICA8cCBjbGFzcz1cImFjdGlvbnNfX25hbWVcIj48c3BhbiBjbGFzcz1cImJvbGRcIj4ke2FjdGlvbi5uYW1lfS48L3NwYW4+ICR7YWN0aW9uLmRlc2N9PC9wPlxuICAgICAgICAgICAgICAgICR7YWN0aW9uLmF0dGFja19ib251cyA/IGA8YnV0dG9uIGNsYXNzPVwiYnRuLS1hdHRhY2sgYnRuLS1ob3ZlclwiPjxpIGNsYXNzPVwiZmEtc29saWQgZmEtZGljZS1kMjBcIj48L2k+ICske2FjdGlvbi5hdHRhY2tfYm9udXN9PC9idXR0b24+YCA6ICcnfVxuICAgICAgICAgICAgICAgIDxzcGFuIGlkPVwiJHtjcmVhdHVyZS5pbmRleH0tJHthY3Rpb24ubmFtZX0tJHtpfVwiPjwvc3Bhbj5cbiAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICBgKTtcbiAgICAgICAgaSsrO1xuICAgIH0pO1xuXG4gICAgaSA9IDA7XG4gICAgY3JlYXR1cmUubGVnQWN0aW9ucy5mb3JFYWNoKChhY3Rpb246IGFueSkgPT4ge1xuICAgICAgICBsZXQgZWxlbWVudCA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKGAke2NyZWF0dXJlLmluZGV4fS0ke2FjdGlvbi5uYW1lfS0ke2l9YCk7XG4gICAgICAgIGVsZW1lbnQuY2xhc3NMaXN0LmFkZCgnbGVnZW5kYXJ5LWFjdGlvbnNfX2JveC0tZG1nX2RpY2UnKTtcblxuICAgICAgICBhY3Rpb24uZGFtYWdlLmZvckVhY2goKGRtZzogYW55KSA9PiB7XG4gICAgICAgICAgICBpZiAoZG1nLmRhbWFnZURpY2UpIHtcbiAgICAgICAgICAgICAgICBlbGVtZW50Lmluc2VydEFkamFjZW50SFRNTCgnYmVmb3JlZW5kJywgYDxidXR0b24gY2xhc3M9XCJidG4tLWF0dGFjayBidG4tLWhvdmVyXCI+JHtkbWcuZGFtYWdlRGljZX0gJHtkbWcuZGFtYWdlVHlwZX08L2J1dHRvbj5gKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSk7XG4gICAgICAgIGkrKztcbiAgICB9KTtcbn1cblxuXG4vLyBSZW1vdmUgYSBzcGVjaWZpYyBjcmVhdHVyZSB3aW5kb3dcbmZ1bmN0aW9uIHJlbW92ZUNyZWF0dXJlU3RhdHNXaW5kb3coaW5kZXg6IGFueSkge1xuICAgIGNyZWF0dXJlSW5kZXhMaXN0LmZvckVhY2goKGxpc3RJdGVtOiBhbnkpID0+IHtcbiAgICAgICAgaWYgKGxpc3RJdGVtID09PSBpbmRleCkge1xuICAgICAgICAgICAgZG9jdW1lbnQucXVlcnlTZWxlY3RvcihgLmNyZWF0dXJlLXN0YXRzLXdpbmRvdy0tJHtpbmRleH1gKS5yZW1vdmUoKTsgICAgICAgICBcbiAgICAgICAgICAgIGNyZWF0dXJlSW5kZXhMaXN0LnNwbGljZShjcmVhdHVyZUluZGV4TGlzdC5pbmRleE9mKGluZGV4KSwgMSk7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cbiAgICB9KTtcbn1cblxuLy8gUmV0dXJucyBhIHN0cmluZyB3aXRob3V0IHRoZSBzcXVhcmUgYnJhY2tldHMsIGFuZCBhcnJheSB3aXRoIGFjdGlvbiByb2xsc1xuZXhwb3J0IGZ1bmN0aW9uIGdldEFjdGlvbkRlc2MoX3N0cmluZzogYW55KSB7XG4gICAgbGV0IHN0cmluZyA9IF9zdHJpbmdcbiAgICBsZXQgcm9sbHMgPSBbXTtcbiAgICBsZXQgdG9IaXQgPSAnJztcblxuICAgIC8vIENoZWNrcyBpZiB0aGVyZSBpcyBhbiBhdHRhY2sgYm9udXNcbiAgICB3aGlsZSAoc3RyaW5nLmluY2x1ZGVzKCd7eycpKSB7XG4gICAgICAgIHRvSGl0ID0gc3RyaW5nLnNwbGl0KCd7eycpWzFdLnNwbGl0KCd9fScpWzBdO1xuICAgICAgICBzdHJpbmcgPSBzdHJpbmcucmVwbGFjZSgne3snLCAnJykucmVwbGFjZSgnfX0nLCAnJyk7XG4gICAgfVxuXG4gICAgd2hpbGUodG9IaXQuaW5jbHVkZXMoJysnKSkge1xuICAgICAgICB0b0hpdCA9IHRvSGl0LnJlcGxhY2UoJysnLCAnJyk7XG4gICAgfVxuXG4gICAgLy8gTW9kaWZpZXMgc3RyaW5nIHRvIGdldCBkbWcgcm9sbHMsIGFuZCBkZXNjcmlwdGlvbiB3aXRoIHRoZSBicmFja2V0c1xuICAgIHdoaWxlIChzdHJpbmcuaW5jbHVkZXMoJ1tbJykpIHtcbiAgICAgICAgcm9sbHMucHVzaChzdHJpbmcuc3BsaXQoJ1tbJylbMV0uc3BsaXQoJ11dJylbMF0pO1xuICAgICAgICBzdHJpbmcgPSBzdHJpbmcucmVwbGFjZSgnW1snLCAnJykucmVwbGFjZSgnXV0nLCAnJyk7XG4gICAgfVxuICAgIHJldHVybiB7cm9sbHM6IHJvbGxzLCBkZXNjOiBzdHJpbmcsIHRvSGl0OiB0b0hpdH07XG59XG5cbi8vIFNwbGl0cyBhbmQgcmV0dXJucyBhbiBhdHRhY2sgZGFtYWdlIHJvbGxzXG5leHBvcnQgZnVuY3Rpb24gc2VwYXJhdGVEbWdSb2xsKGRtZzogYW55KSB7XG4gICAgY29uc3QgWyBkYW1hZ2VEaWNlLCBkYW1hZ2VUeXBlIF0gPSBkbWcuc3BsaXQoJyAnKTtcbiAgICByZXR1cm4geyBkYW1hZ2VEaWNlLCBkYW1hZ2VUeXBlIH07XG59XG5cbi8vIFNlcGFyYXRlcyB0aGUgc3RyaW5nIGZvciBza2lsbHMvc2F2aW5nIHRocm93cyBhbmQgc3BsaXRzIHRoZW0gaW50byB0aGVpciBuYW1lIGFuZCB2YWx1ZSBcbmV4cG9ydCBmdW5jdGlvbiBzZXBhcmF0ZVByb2Yoc3RyaW5nOiBzdHJpbmcsIHZhbHVlOiBzdHJpbmcsIG5hbWU6IHN0cmluZykge1xuICAgIGNvbnN0IHNhdmUgPSBzdHJpbmcuc3BsaXQoJ1NhdmluZyBUaHJvdzogJyk7XG4gICAgY29uc3Qgc2tpbGwgPSBzdHJpbmcuc3BsaXQoJ1NraWxsOiAnKTtcbiAgICBcbiAgICBpZiAoc2F2ZVswXSA9PT0gJycpIHtcbiAgICAgICAgY29uc3QgbmFtZSA9IHNhdmVbMV0uc3BsaXQodmFsdWUpO1xuICAgICAgICByZXR1cm4gbmFtZVswXS50b1N0cmluZygpO1xuICAgIH0gZWxzZSBpZiAoc2tpbGxbMF0gPT09ICcnKSB7XG4gICAgICAgIGNvbnN0IG5hbWUgPSBza2lsbFsxXS5zcGxpdCh2YWx1ZSk7XG4gICAgICAgIHJldHVybiBuYW1lWzBdLnRvU3RyaW5nKCk7XG4gICAgfSBcbiAgICByZXR1cm4gbmFtZTtcbn1cblxuXG4vLyBpZiAodHlwZW9mIG1vZHVsZSAhPT0gJ3VuZGVmaW5lZCcpIG1vZHVsZS5leHBvcnRzID0ge1xuLy8gICAgIGdldEFjdGlvbkRlc2MsXG4vLyAgICAgc2VwYXJhdGVEbWdSb2xsXG4vLyB9OyIsICJpbXBvcnQgeyBnaXZlVG9rZW5FdmVudHMgfSBmcm9tICcuL3Rva2VuJztcbmltcG9ydCB7IGNsYW1wLCBmaW5kQ2VsbCB9IGZyb20gJy4vdXRpbHMnO1xuaW1wb3J0IHsgcm9vbSB9IGZyb20gJy4vZGFzaGJvYXJkJztcbmltcG9ydCB7IGFkZERlZmF1bHRUb2tlbnMsIHJlc2V0VG9rZW5Cb2R5RGF0YSwgdG9nZ2xlVG9rZW5NZW51IH0gZnJvbSAnLi9tZW51cy90b2tlbi5tZW51JztcbmltcG9ydCB7IGFkZERlZmF1bHRNYXBzLCB0b2dnbGVNYXBNZW51IH0gZnJvbSAnLi9tZW51cy9tYXAubWVudSc7XG5pbXBvcnQgeyBjaGFuZ2VOZXdVc2VyLCBnZXRVc2VyIH0gZnJvbSAnLi9yb3V0ZXMvdXNlcnMucm91dGUnO1xuaW1wb3J0IHsgdG9nZ2xlQ2hhcmFjdGVyTWVudSB9IGZyb20gJy4vbWVudXMvY2hhcmFjdGVyLm1lbnUnO1xuaW1wb3J0IHsgY2xpZW50IH0gZnJvbSAnLi9kYXNoYm9hcmQnO1xuaW1wb3J0IHsgb3BlbkNyZWF0dXJlU3RhdHNXaW5kb3cgfSBmcm9tICcuL2NyZWF0dXJlLXN0YXRzJztcbmltcG9ydCB7IGlvLCBTb2NrZXQgfSBmcm9tIFwic29ja2V0LmlvLWNsaWVudFwiO1xuaW1wb3J0IHsgdG9nZ2xlQ3JlYXR1cmVzV2luZG93IH0gZnJvbSAnLi9jcmVhdHVyZXMnO1xuXG5jb25zdCBzb2NrZXQ6IFNvY2tldCA9IGlvKCk7XG5sZXQgY2FuT3BlblN0YXRzOiBib29sZWFuID0gdHJ1ZTtcbmxldCB4OiBudW1iZXIgPSAwLCB5OiBudW1iZXIgPSAwO1xuZXhwb3J0IGxldCByb290OiBhbnkgPSBkb2N1bWVudC5kb2N1bWVudEVsZW1lbnQ7XG5sZXQgdXNlcjogYW55O1xubGV0IHBsYXllckxpc3Q6IGFueSA9IFtdO1xuZXhwb3J0IGxldCBjZWxsczogYW55ID0gW107XG5sZXQgcGxheWVyc0xpc3RPcGVuOiBib29sZWFuID0gZmFsc2U7XG5sZXQgY2VsbFRvRGVsZXRlOiBhbnk7XG5sZXQgY2FuUGxhY2U6IGJvb2xlYW4gPSB0cnVlO1xuXG5cbmV4cG9ydCBhc3luYyBmdW5jdGlvbiBnYW1lUGFnZUxvYWRlZCgpIHtcbiAgICB1c2VyID0gYXdhaXQgZmV0Y2hVc2VyKCk7XG4gICAgc29ja2V0LmVtaXQoJ1NFVF9OQU1FJywgdXNlci51c2VybmFtZSk7XG4gICAgc29ja2V0LmVtaXQoJ1VQREFURV9QTEFZRVJfTElTVCcsIHJvb20pO1xuICAgIHNldHVwR3JpZCgyNSwgMjUsIGZhbHNlKTtcblxuICAgIGlmICh1c2VyLm5ld191c2VyKSB7XG4gICAgICAgIGFkZERlZmF1bHRUb2tlbnMoKTtcbiAgICAgICAgYWRkRGVmYXVsdE1hcHMoKTtcbiAgICAgICAgY2hhbmdlTmV3VXNlcihmYWxzZSk7XG4gICAgfVxuXG4gICAgaWYgKGNsaWVudC5jbGllbnRUeXBlID09ICdkbScpIHtcbiAgICAgICAgc2V0dXBTaWRlYmFyKCdkbScpO1xuICAgIH0gZWxzZSB7XG4gICAgICAgIHNldHVwU2lkZWJhcigncGxheWVyJyk7XG4gICAgICAgIHRvZ2dsZUNoYXJhY3Rlck1lbnUoJ2NoYXJhY3RlcnMnKTtcbiAgICB9XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBzZXR1cEdyaWQod2lkdGg6IG51bWJlciwgaGVpZ2h0OiBudW1iZXIsIGNsZWFyOiBib29sZWFuKSB7XG4gICAgbGV0IGhhc0V2ZW50czogYm9vbGVhbiA9IGZhbHNlO1xuXG4gICAgZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ2dyaWQnKS5hZGRFdmVudExpc3RlbmVyKFwiY29udGV4dG1lbnVcIiwgZSA9PiBlLnByZXZlbnREZWZhdWx0KCkpO1xuICAgIGNsZWFyICYmIGNsZWFyTWFwKCk7XG5cbiAgICBmb3IgKGxldCBhID0gMDsgYSA8IGhlaWdodCAtIDI7IGErKykge1xuICAgICAgICAvLyBDcmVhdGUgcm93XG4gICAgICAgIGxldCBuZXdSb3cgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnZ3JpZCcpLmFwcGVuZENoaWxkKGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ3RyJykpO1xuXG4gICAgICAgIC8vIENyZWF0ZSBjZWxsXG4gICAgICAgIGZvciAobGV0IGIgPSAwOyBiIDwgd2lkdGg7IGIrKykge1xuICAgICAgICAgICAgbGV0IG5ld0NlbGwgPSBuZXdSb3cuYXBwZW5kQ2hpbGQoZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgndGQnKSk7XG4gICAgICAgICAgICBuZXdDZWxsLmNsYXNzTGlzdC5hZGQoJ2dyaWRfX2NlbGwnKTtcbiAgICAgICAgICAgIGlmICh4ID4gd2lkdGggLSAxKSB4ID0gMDtcblxuICAgICAgICAgICAgbmV3Q2VsbC5zZXRBdHRyaWJ1dGUoJ3gnLCB4LnRvU3RyaW5nKCkpO1xuICAgICAgICAgICAgbmV3Q2VsbC5zZXRBdHRyaWJ1dGUoJ3knLCB5LnRvU3RyaW5nKCkpO1xuICAgICAgICAgICAgeCsrO1xuXG4gICAgICAgICAgICAvLyBGaXJlcyB3aGVuIGVsZW1lbnQgaXMgZHJhZ2dlZCBvdmVyIHRoaXMgZ3JpZCBjZWxsXG4gICAgICAgICAgICBuZXdDZWxsLmFkZEV2ZW50TGlzdGVuZXIoXCJkcmFnb3ZlclwiLCAoZTogRXZlbnQpID0+IHtcbiAgICAgICAgICAgICAgICBjb25zdCB0b2tlbiA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy50b2tlbi0tZHJhZ2dpbmcnKTtcbiAgICAgICAgICAgICAgICBpZiAoIWhhc0V2ZW50cykgZ2l2ZVRva2VuRXZlbnRzKHRva2VuKTtcbiAgICAgICAgICAgICAgICBoYXNFdmVudHMgPSB0cnVlO1xuICAgICAgICAgICAgICAgIG5ld0NlbGwuYXBwZW5kQ2hpbGQodG9rZW4pO1xuICAgICAgICAgICAgICAgIHRva2VuLmNsYXNzTGlzdC5hZGQoJ3Rva2VuJyk7XG4gICAgICAgICAgICAgICAgaWYgKHRva2VuLmNsYXNzTGlzdC5jb250YWlucygnbWVudV9faXRlbScpKSBjZWxsVG9EZWxldGUgPSAnJztcbiAgICAgICAgICAgICAgICB0b2tlbi5jbGFzc0xpc3QucmVtb3ZlKCdtZW51X19pdGVtJyk7XG4gICAgICAgICAgICAgICAgdG9rZW4uY2xhc3NMaXN0LnJlbW92ZSgnbWVudV9faXRlbS0tdG9rZW4nKTtcbiAgICAgICAgICAgICAgICBpZiAodG9rZW4uZ2V0QXR0cmlidXRlKCdzaXplJykpIHRva2VuLmNsYXNzTGlzdC5hZGQodG9rZW4uZ2V0QXR0cmlidXRlKCdzaXplJykpOyAgICBcbiAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgbmV3Q2VsbC5hZGRFdmVudExpc3RlbmVyKFwibW91c2Vkb3duXCIsIChlOiBhbnkpID0+IHtcbiAgICAgICAgICAgICAgICBpZiAoZS53aGljaCA9PT0gMSkge1xuICAgICAgICAgICAgICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IDQ7IGkrKykge1xuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKGUucGF0aFtpXS5jbGFzc0xpc3QuY29udGFpbnMoJ2dyaWRfX2NlbGwnKSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNlbGxUb0RlbGV0ZSA9IGUucGF0aFtpXTtcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgbmV3Q2VsbC5hZGRFdmVudExpc3RlbmVyKFwiZHJhZ2VuZFwiLCAoKSA9PiB7XG4gICAgICAgICAgICAgICAgY29uc3QgdG9rZW46IEVsZW1lbnQgPSBuZXdDZWxsLmZpcnN0RWxlbWVudENoaWxkO1xuICAgICAgICAgICAgICAgIGlmICh0b2tlbikge1xuICAgICAgICAgICAgICAgICAgICBsZXQgc2l6ZSA9IHRva2VuLmdldEF0dHJpYnV0ZSgnc2l6ZScpO1xuICAgICAgICAgICAgICAgICAgICBsZXQgaW1hZ2UgPSB0b2tlbi5nZXRBdHRyaWJ1dGUoJ3NyYycpO1xuICAgICAgICAgICAgICAgICAgICBsZXQgcmVsYXRpdmUgPSB0b2tlbi5nZXRBdHRyaWJ1dGUoJ3JlbGF0aXZlJyk7IFxuICAgICAgICAgICAgICAgICAgICBsZXQgaWQgPSB0b2tlbi5nZXRBdHRyaWJ1dGUoJ2lkJyk7XG4gICAgICAgICAgICAgICAgICAgIC8vIFNldCB0b2tlblxuICAgICAgICAgICAgICAgICAgICB0b2tlbi5jbGFzc0xpc3QucmVtb3ZlKCd0b2tlbi0tZHJhZ2dpbmcnKTtcbiAgICAgICAgICAgICAgICAgICAgdG9rZW4ucmVtb3ZlQXR0cmlidXRlKCdvbm1vdXNlZG93bicpO1xuICAgICAgICAgICAgICAgICAgICAvLyBPcGVuIHN0YXRzIG1lbnUgYWZ0ZXIgZG91YmxlIGNsaWNrXG4gICAgICAgICAgICAgICAgICAgIHRva2VuLmFkZEV2ZW50TGlzdGVuZXIoXCJkYmxjbGlja1wiLCAoKSA9PiB7XG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAocmVsYXRpdmUgPT09ICdudWxsJyB8fCBjbGllbnQuY2xpZW50VHlwZSA9PT0gJ3BsYXllcicpIHJldHVybjtcblxuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKGNhbk9wZW5TdGF0cykge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vIFRPRE86IE1ha2UgYSBjYWxsIHRoYXQgaGFzIGN1c3RvbSBhcyB0cnVlLlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIG9wZW5DcmVhdHVyZVN0YXRzV2luZG93KHJlbGF0aXZlLCBmYWxzZSk7IFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNhbk9wZW5TdGF0cyA9IGZhbHNlO1xuICAgICAgICAgICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBzZXRUaW1lb3V0KGZ1bmN0aW9uKCkgeyBjYW5PcGVuU3RhdHMgPSB0cnVlOyB9LCAxMDApO1xuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgICAgICAgLy8gUmVtb3ZlIHRva2VuIGF0IHByZXZpb3VzIHBvc2l0aW9uXG4gICAgICAgICAgICAgICAgICAgIGlmIChjZWxsVG9EZWxldGUpIHNvY2tldC5lbWl0KCdSRU1PVkVfVE9LRU4nLCB7eDogcGFyc2VJbnQoY2VsbFRvRGVsZXRlLmdldEF0dHJpYnV0ZSgneCcpKSwgeTogcGFyc2VJbnQoY2VsbFRvRGVsZXRlLmdldEF0dHJpYnV0ZSgneScpKX0sIHJvb20pO1xuXG4gICAgICAgICAgICAgICAgICAgIC8vIFBsYWNlIG5ldyB0b2tlblxuICAgICAgICAgICAgICAgICAgICBjb25zdCBuZXdUb2tlbiA9IG5ldyBUb2tlbihpZCwgaW1hZ2UsIHNpemUsIHJlbGF0aXZlKTtcbiAgICAgICAgICAgICAgICAgICAgY2FuUGxhY2UgPSBmYWxzZTtcbiAgICAgICAgICAgICAgICAgICAgc29ja2V0LmVtaXQoJ1BMQUNFX1RPS0VOJywge3g6IHBhcnNlSW50KG5ld0NlbGwuZ2V0QXR0cmlidXRlKCd4JykpLCB5OiBwYXJzZUludChuZXdDZWxsLmdldEF0dHJpYnV0ZSgneScpKX0sIG5ld1Rva2VuLCB1c2VyLnVzZXJuYW1lLCByb29tKTtcbiAgICAgICAgICAgICAgICAgICAgLy8gUmVmcmVzaCB0b2tlbiBtZW51XG4gICAgICAgICAgICAgICAgICAgIHJlc2V0VG9rZW5Cb2R5RGF0YSgpO1xuICAgICAgICAgICAgICAgICAgICBjYW5PcGVuU3RhdHMgPSB0cnVlO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0pO1xuXG4gICAgICAgICAgICBjZWxscy5wdXNoKG5ld0NlbGwpO1xuICAgICAgICB9XG4gICAgICAgIHkrKztcbiAgICB9XG59XG5cbi8vIFBsYWNlcyB0b2tlbiBvbiBib2FyZFxuZnVuY3Rpb24gY3JlYXRlVG9rZW4oY2VsbDogYW55LCBuZXdUb2tlbjogYW55LCB1c2VybmFtZTogc3RyaW5nKSB7XG4gICAgaWYgKGNhblBsYWNlKSB7XG4gICAgICAgIGNvbnN0IHRva2VuID0gY2VsbC5hcHBlbmRDaGlsZChkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdpbWcnKSk7XG4gICAgICAgIHRva2VuLnNldEF0dHJpYnV0ZSgnc3JjJywgbmV3VG9rZW4uaW1hZ2UpO1xuICAgICAgICB0b2tlbi5zZXRBdHRyaWJ1dGUoJ2lkJywgbmV3VG9rZW4uaWQpO1xuICAgICAgICB0b2tlbi5zZXRBdHRyaWJ1dGUoJ3JlbGF0aXZlJywgbmV3VG9rZW4ucmVsYXRpdmUpO1xuICAgICAgICB0b2tlbi5jbGFzc0xpc3QuYWRkKCd0b2tlbicpO1xuICAgICAgICB0b2tlbi5jbGFzc0xpc3QuYWRkKG5ld1Rva2VuLnNpemUpO1xuICAgICAgICB0b2tlbi5zZXRBdHRyaWJ1dGUoJ3NpemUnLCBuZXdUb2tlbi5zaXplKTtcbiAgICAgICAgaWYgKHVzZXJuYW1lKSB0b2tlbi5zZXRBdHRyaWJ1dGUoJ293bmVyJywgdXNlcm5hbWUpO1xuICAgICAgICBnaXZlVG9rZW5FdmVudHModG9rZW4pO1xuXG4gICAgICAgIGxldCByZWxhdGl2ZSA9IHRva2VuLmdldEF0dHJpYnV0ZSgncmVsYXRpdmUnKTtcbiAgICAgICAgdG9rZW4uYWRkRXZlbnRMaXN0ZW5lcihcImRibGNsaWNrXCIsICgpID0+IHtcbiAgICAgICAgICAgIGlmIChyZWxhdGl2ZSA9PT0gJ251bGwnIHx8IGNsaWVudC5jbGllbnRUeXBlID09PSAncGxheWVyJykgcmV0dXJuO1xuXG4gICAgICAgICAgICBpZiAoY2FuT3BlblN0YXRzKSB7XG4gICAgICAgICAgICAgICAgLy8gVE9ETzogTWFrZSBhIGNhbGwgdGhhdCBoYXMgY3VzdG9tIGFzIHRydWUuXG4gICAgICAgICAgICAgICAgb3BlbkNyZWF0dXJlU3RhdHNXaW5kb3cocmVsYXRpdmUsIGZhbHNlKTtcbiAgICAgICAgICAgICAgICBjYW5PcGVuU3RhdHMgPSBmYWxzZTtcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgc2V0VGltZW91dChmdW5jdGlvbigpIHsgY2FuT3BlblN0YXRzID0gdHJ1ZTsgfSwgMTAwKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSk7XG4gICAgfSBlbHNlIHtcbiAgICAgICAgY2FuUGxhY2UgPSB0cnVlO1xuICAgIH1cbn1cblxuZXhwb3J0IGZ1bmN0aW9uIHpvb21JbigpIHtcbiAgICBsZXQgem9vbU1pbjogbnVtYmVyID0gMC41LCB6b29tTWF4OiBudW1iZXIgPSAxMDtcbiAgICBsZXQgcnMgPSBnZXRDb21wdXRlZFN0eWxlKHJvb3QpO1xuICAgIGxldCB6b29tVmFsdWUgPSBwYXJzZUludChycy5nZXRQcm9wZXJ0eVZhbHVlKCctLXpvb20nKSk7XG4gICAgcm9vdC5zdHlsZS5zZXRQcm9wZXJ0eSgnLS16b29tJywgYCR7Y2xhbXAoem9vbVZhbHVlICsgMSwgem9vbU1pbiwgem9vbU1heCl9cmVtYCk7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiB6b29tT3V0KCkge1xuICAgIGxldCB6b29tTWluOiBudW1iZXIgPSAwLjUsIHpvb21NYXg6IG51bWJlciA9IDEwO1xuICAgIGxldCBycyA9IGdldENvbXB1dGVkU3R5bGUocm9vdCk7XG4gICAgbGV0IHpvb21WYWx1ZSA9IHBhcnNlSW50KHJzLmdldFByb3BlcnR5VmFsdWUoJy0tem9vbScpKTtcbiAgICByb290LnN0eWxlLnNldFByb3BlcnR5KCctLXpvb20nLCBgJHtjbGFtcCh6b29tVmFsdWUgLSAxLCB6b29tTWluLCB6b29tTWF4KX1yZW1gKTtcbn1cblxuZnVuY3Rpb24gY2xlYXJNYXAoKSB7XG4gICAgeCA9IDA7XG4gICAgeSA9IDA7XG4gICAgZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ2dyaWQnKS5pbm5lckhUTUwgPSAnJztcbiAgICBjZWxscyA9IFtdO1xufVxuXG5mdW5jdGlvbiB0b2dnbGVQbGF5ZXJMaXN0KCkge1xuICAgIHBsYXllcnNMaXN0T3BlbiA9ICFwbGF5ZXJzTGlzdE9wZW47XG4gICAgaWYgKHBsYXllcnNMaXN0T3Blbikge1xuICAgICAgICBjb25zdCBwbGF5ZXJMaXN0Q29udGFpbmVyID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignYm9keScpLmFwcGVuZENoaWxkKGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpKTtcbiAgICAgICAgcGxheWVyTGlzdENvbnRhaW5lci5jbGFzc0xpc3QuYWRkKCdwbGF5ZXJzLWxpc3QnKTtcbiAgICBcbiAgICAgICAgY29uc3QgcGxheWVyTGlzdEVsID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLnBsYXllcnMtbGlzdCcpO1xuICAgICAgICBmb3IgKGxldCBwbGF5ZXIgb2YgcGxheWVyTGlzdCkge1xuICAgICAgICAgICAgcGxheWVyTGlzdEVsLmluc2VydEFkamFjZW50SFRNTCgnYmVmb3JlZW5kJywgYFxuICAgICAgICAgICAgICAgIDxwPiR7cGxheWVyfTwvcD5cbiAgICAgICAgICAgIGApO1xuICAgICAgICB9XG4gICAgfSBlbHNlIHtcbiAgICAgICAgZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLnBsYXllcnMtbGlzdCcpLnJlbW92ZSgpO1xuICAgIH1cbn1cblxuYXN5bmMgZnVuY3Rpb24gZmV0Y2hVc2VyKCkge1xuICAgIGNvbnN0IHVzZXIgPSBhd2FpdCBnZXRVc2VyKCk7XG4gICAgcmV0dXJuIHVzZXI7XG59XG5cbmZ1bmN0aW9uIHNldHVwU2lkZWJhcih1c2VyVHlwZTogc3RyaW5nKSB7XG4gICAgY29uc3Qgc2lkZWJhciA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5zaWRlYmFyJyk7XG4gICAgaWYgKHVzZXJUeXBlID09PSAnZG0nKSB7XG4gICAgICAgIHNpZGViYXIuaW5zZXJ0QWRqYWNlbnRIVE1MKCdiZWZvcmVlbmQnLCBgXG4gICAgICAgICAgICA8YnV0dG9uIGNsYXNzPVwic2lkZWJhcl9fYnRuIHNpZGViYXJfX3Rva2VucyBidG4tLWhvdmVyXCIgaWQ9XCJ0b2tlbnMtbWVudS1idG5cIj5Ub2tlbnM8L2J1dHRvbj5cbiAgICAgICAgICAgIDxidXR0b24gY2xhc3M9XCJzaWRlYmFyX19idG4gc2lkZWJhcl9fbWFwcyBidG4tLWhvdmVyXCIgaWQ9XCJjcmVhdHVyZXMtd2luZG93LWJ0blwiPkNyZWF0dXJlczwvYnV0dG9uPlxuICAgICAgICAgICAgPGJ1dHRvbiBjbGFzcz1cInNpZGViYXJfX2J0biBzaWRlYmFyX19tYXBzIGJ0bi0taG92ZXJcIiBpZD1cIm1hcHMtbWVudS1idG5cIj5NYXBzPC9idXR0b24+XG4gICAgICAgIGApO1xuICAgIH0gZWxzZSB7XG4gICAgICAgIHNpZGViYXIuaW5zZXJ0QWRqYWNlbnRIVE1MKCdiZWZvcmVlbmQnLCBgXG4gICAgICAgICAgICA8YnV0dG9uIGNsYXNzPVwic2lkZWJhcl9fYnRuIHNpZGViYXJfX2NoYXJhY3RlcnMgYnRuLS1ob3ZlclwiIGlkPVwiY2hhcmFjdGVycy1tZW51LWJ0blwiPkNoYXJhY3RlcnM8L2J1dHRvbj5cbiAgICAgICAgICAgIDxidXR0b24gY2xhc3M9XCJzaWRlYmFyX19idG4gc2lkZWJhcl9fY2hhcmFjdGVyLXNoZWV0IGJ0bi0taG92ZXJcIiBpZD1cImNoYXJhY3Rlci1zaGVldC1tZW51LWJ0blwiPkNoYXJhY3RlciBTaGVldDwvYnV0dG9uPlxuICAgICAgICBgKTtcbiAgICB9XG5cbiAgICBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgndG9rZW5zLW1lbnUtYnRuJykuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCAoKSA9PiB0b2dnbGVUb2tlbk1lbnUoJ3Rva2VucycpKTtcbiAgICBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnY3JlYXR1cmVzLXdpbmRvdy1idG4nKS5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsICgpID0+IHRvZ2dsZUNyZWF0dXJlc1dpbmRvdygpKTtcbiAgICBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnbWFwcy1tZW51LWJ0bicpLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgKCkgPT4gdG9nZ2xlTWFwTWVudSgnbWFwcycpKTtcbn1cblxuY2xhc3MgVG9rZW4ge1xuICAgIGlkOiBzdHJpbmc7XG4gICAgaW1hZ2U6IHN0cmluZztcbiAgICBzaXplOiBzdHJpbmc7XG4gICAgcmVsYXRpdmU6IGFueTtcbiAgICBjb25zdHJ1Y3RvcihpZDogc3RyaW5nLCBpbWFnZTogc3RyaW5nLCBzaXplOiBzdHJpbmcsIHJlbGF0aXZlOiBhbnkpIHtcbiAgICAgICAgdGhpcy5pZCA9IGlkO1xuICAgICAgICB0aGlzLmltYWdlID0gaW1hZ2U7XG4gICAgICAgIHRoaXMuc2l6ZSA9IHNpemU7XG4gICAgICAgIHRoaXMucmVsYXRpdmUgPSByZWxhdGl2ZTtcbiAgICB9XG59XG5cbi8vID09PT09PT09PT09PT09PT09PT0gLy9cbi8vICAgICAgU09DS0VULklPICAgICAgLy9cbi8vID09PT09PT09PT09PT09PT09PT0gLy9cblxuc29ja2V0Lm9uKCdVUERBVEVfUExBWUVSX0xJU1QnLCAoKGNsaWVudExpc3QpID0+IHtcbiAgICBwbGF5ZXJMaXN0ID0gW107XG4gICAgZm9yIChsZXQgY2xpZW50IG9mIGNsaWVudExpc3QpIHtcbiAgICAgICAgcGxheWVyTGlzdC5wdXNoKGNsaWVudC5uaWNrbmFtZSk7XG4gICAgfVxuICAgIHRvZ2dsZVBsYXllckxpc3QoKTtcbiAgICB0b2dnbGVQbGF5ZXJMaXN0KCk7XG59KSk7XG5cbnNvY2tldC5vbignUExBQ0VfVE9LRU4nLCAoKGNlbGw6IGFueSwgdG9rZW46IEVsZW1lbnQsIHVzZXJuYW1lOiBzdHJpbmcpID0+IHtcbiAgICBjb25zdCBuZXdDZWxsID0gZmluZENlbGwoY2VsbC54LCBjZWxsLnkpO1xuICAgIGNyZWF0ZVRva2VuKG5ld0NlbGwsIHRva2VuLCB1c2VybmFtZSk7XG59KSk7XG5cbnNvY2tldC5vbignUkVNT1ZFX1RPS0VOJywgKChjZWxsOiBhbnkpID0+IHtcbiAgICBjb25zdCBuZXdDZWxsID0gZmluZENlbGwoY2VsbC54LCBjZWxsLnkpO1xuICAgIG5ld0NlbGwuaW5uZXJIVE1MID0gJyc7XG59KSk7XG5cbiIsICJpbXBvcnQgeyBjaGFyYWN0ZXIgfSBmcm9tICcuL21lbnVzL2NoYXJhY3Rlci5tZW51JztcbmltcG9ydCB7IHNldFRlbXBIZWFsdGgsIHNldEhlYWx0aCB9IGZyb20gJy4vcm91dGVzL2NoYXJhY3RlcnMucm91dGUnO1xuaW1wb3J0IHsgZGlzYWJsZUhvdGtleXMsIGRyYWdFbGVtZW50IH0gZnJvbSAnLi91dGlscyc7XG5cbmNvbnN0IF9jaGFyYWN0ZXIgPSBjaGFyYWN0ZXIudmFsdWU7XG5sZXQgc2hlZXRPcGVuID0gZmFsc2U7XG5sZXQgdGVtcEhwSW5wdXQ6IHN0cmluZywgaHBJbnB1dDogc3RyaW5nO1xubGV0IGRtZ0FkZElucHV0OiBzdHJpbmcsIGhlYWxBZGRJbnB1dDogc3RyaW5nLCB0ZW1wQWRkSW5wdXQ6IHN0cmluZztcbmxldCBzdHJNb2Q6IG51bWJlcjtcbmxldCBkZXhNb2Q6IG51bWJlcjtcbmxldCBjb25Nb2Q6IG51bWJlcjtcbmxldCBpbnRNb2Q6IG51bWJlcjtcbmxldCB3aXNNb2Q6IG51bWJlcjtcbmxldCBjaGFyTW9kOiBudW1iZXI7XG5cbmV4cG9ydCBmdW5jdGlvbiB0b2dnbGVDaGFyYWN0ZXJTaGVldCgpIHtcbiAgICBzaGVldE9wZW4gPSAhc2hlZXRPcGVuO1xuICAgIGlmIChzaGVldE9wZW4pIHtcbiAgICAgICAgbGV0IHN0ck1vZCA9IE1hdGguZmxvb3IoKF9jaGFyYWN0ZXIuc3RyIC0gMTApIC8gMik7XG4gICAgICAgIGxldCBkZXhNb2QgPSBNYXRoLmZsb29yKChfY2hhcmFjdGVyLmRleCAtIDEwKSAvIDIpO1xuICAgICAgICBsZXQgY29uTW9kID0gTWF0aC5mbG9vcigoX2NoYXJhY3Rlci5jb24gLSAxMCkgLyAyKTtcbiAgICAgICAgbGV0IGludE1vZCA9IE1hdGguZmxvb3IoKF9jaGFyYWN0ZXIuaW50IC0gMTApIC8gMik7XG4gICAgICAgIGxldCB3aXNNb2QgPSBNYXRoLmZsb29yKChfY2hhcmFjdGVyLndpcyAtIDEwKSAvIDIpO1xuICAgICAgICBsZXQgY2hhck1vZCA9IE1hdGguZmxvb3IoKF9jaGFyYWN0ZXIuY2hhciAtIDEwKSAvIDIpO1xuXG4gICAgICAgIGNvbnN0IHNoZWV0V2luZG93ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignYm9keScpLmFwcGVuZENoaWxkKGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpKTtcbiAgICAgICAgc2hlZXRXaW5kb3cuY2xhc3NMaXN0LmFkZCgnY2hhcmFjdGVyLXNoZWV0Jyk7XG4gICAgICAgIHNoZWV0V2luZG93Lmluc2VydEFkamFjZW50SFRNTCgnYmVmb3JlZW5kJywgYFxuICAgICAgICAgICAgPGRpdiBjbGFzcz1cInNoZWV0LWNvbnRlbnRcIj5cbiAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzPVwiY2hhcmFjdGVyLXNoZWV0X19oZWFkZXJcIj5cbiAgICAgICAgICAgICAgICAgICAgPGltZyBjbGFzcz1cImNoYXJhY3Rlci1zaGVldF9faW1hZ2VcIiBzcmM9JHtfY2hhcmFjdGVyLmltYWdlfT5cbiAgICAgICAgICAgICAgICAgICAgPGgyPiR7X2NoYXJhY3Rlci5uYW1lfTwvaDI+XG4gICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgICAgPGRpdiBjbGFzcz1cImNoYXJhY3Rlci1zaGVldF9fbWFpblwiPlxuICAgICAgICAgICAgICAgICAgICA8cD5MZXZlbCAke19jaGFyYWN0ZXIubGV2ZWx9PC9wPlxuICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJjaGFyYWN0ZXItc2hlZXRfX21haW5cIj5cbiAgICAgICAgICAgICAgICAgICAgPHA+JHtfY2hhcmFjdGVyLnJhY2V9ICR7X2NoYXJhY3Rlci5jbGFzc30gJHtfY2hhcmFjdGVyLmJhY2tncm91bmR9PC9wPlxuICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJjaGFyYWN0ZXItc2hlZXRfX21haW5cIj5cbiAgICAgICAgICAgICAgICAgICAgPHA+UHJvZiBib251czogKyR7X2NoYXJhY3Rlci5wcm9mX2JvbnVzfSBIaXQgZGljZTogJHtfY2hhcmFjdGVyLmxldmVsfWQke19jaGFyYWN0ZXIuaGl0X2RpY2V9PC9wPlxuICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJjaGFyYWN0ZXItc2hlZXRfX21haW5cIj5cbiAgICAgICAgICAgICAgICAgICAgPHA+QUM6ICR7X2NoYXJhY3Rlci5hY30gSW5pdGlhdGl2ZTogJHtfY2hhcmFjdGVyLmluaXRpYXRpdmV9IE1vdmVtZW50OiAke19jaGFyYWN0ZXIubW92ZW1lbnR9PC9wPlxuICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJjaGFyYWN0ZXItc2hlZXRfX2hlYWx0aC0tdGVtcFwiPlxuICAgICAgICAgICAgICAgICAgICA8cCBjbGFzcz1cInRlbXAtaHBcIj48aW1nIHNyYz1cIi4uL2ltYWdlcy9oZWFydC1ibHVlLnBuZ1wiPiAke19jaGFyYWN0ZXIudGVtcF9oZWFsdGh9PC9wPlxuICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJjaGFyYWN0ZXItc2hlZXRfX2hlYWx0aFwiPlxuICAgICAgICAgICAgICAgICAgICA8cCBjbGFzcz1cImhwXCI+PGltZyBzcmM9XCIuLi9pbWFnZXMvaGVhcnQtcmVkLnBuZ1wiPiAke19jaGFyYWN0ZXIubWF4X2hlYWx0aH0gLyAke19jaGFyYWN0ZXIuY3VycmVudF9oZWFsdGh9PC9wPlxuICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJjaGFyYWN0ZXItc2hlZXRfX2hlYWx0aC10cmFja2VyXCI+XG4gICAgICAgICAgICAgICAgICAgIDxmb3JtIG9uc3VibWl0PVwiZGFtYWdlSHAoZXZlbnQpXCI+PHA+RGFtYWdlIDxidXR0b24gdHlwZT1cInN1Ym1pdFwiPi08L2J1dHRvbj48aW5wdXQgdHlwZT1cIm51bWJlclwiIG9uY2hhbmdlPVwiZG1nQWRkSW5wdXQgPSBldmVudC50YXJnZXQudmFsdWVcIj48L3A+PC9mb3JtPlxuICAgICAgICAgICAgICAgICAgICA8Zm9ybSBvbnN1Ym1pdD1cImhlYWxIcChldmVudClcIj48cD5IZWFsIDxidXR0b24gdHlwZT1cInN1Ym1pdFwiPis8L2J1dHRvbj48aW5wdXQgdHlwZT1cIm51bWJlclwiIG9uY2hhbmdlPVwiaGVhbEFkZElucHV0ID0gZXZlbnQudGFyZ2V0LnZhbHVlXCI+PC9wPjwvZm9ybT5cbiAgICAgICAgICAgICAgICAgICAgPGZvcm0gb25zdWJtaXQ9XCJhZGRUZW1wSHAoZXZlbnQpXCI+PHA+VGVtcCBIcCA8YnV0dG9uIHR5cGU9XCJzdWJtaXRcIj4rPC9idXR0b24+PGlucHV0IHR5cGU9XCJudW1iZXJcIiBvbmNoYW5nZT1cInRlbXBBZGRJbnB1dCA9IGV2ZW50LnRhcmdldC52YWx1ZVwiPjwvcD48L2Zvcm0+XG4gICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgICAgPGRpdiBjbGFzcz1cImNoYXJhY3Rlci1zaGVldF9fc2NvcmVzXCI+XG4gICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJjaGFyYWN0ZXItc2hlZXRfX3Njb3JlLWJveFwiPlxuICAgICAgICAgICAgICAgICAgICAgICAgPHA+U3RyPC9wPlxuICAgICAgICAgICAgICAgICAgICAgICAgPHA+JHtfY2hhcmFjdGVyLnN0cn08L3A+XG4gICAgICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzPVwiY2hhcmFjdGVyLXNoZWV0X19tb2RpZmllci1ib3hcIj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8cD4ke3N0ck1vZCA8IDAgPyAnJyA6ICcrJ30gJHtzdHJNb2R9PC9wPlxuICAgICAgICAgICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzPVwiY2hhcmFjdGVyLXNoZWV0X19zY29yZS1ib3hcIj5cbiAgICAgICAgICAgICAgICAgICAgICAgIDxwPkRleDwvcD5cbiAgICAgICAgICAgICAgICAgICAgICAgIDxwPiR7X2NoYXJhY3Rlci5kZXh9PC9wPlxuICAgICAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzcz1cImNoYXJhY3Rlci1zaGVldF9fbW9kaWZpZXItYm94XCI+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPHA+JHtkZXhNb2QgPCAwID8gJycgOiAnKyd9ICR7ZGV4TW9kfTwvcD5cbiAgICAgICAgICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzcz1cImNoYXJhY3Rlci1zaGVldF9fc2NvcmUtYm94XCI+XG4gICAgICAgICAgICAgICAgICAgICAgICA8cD5Db248L3A+XG4gICAgICAgICAgICAgICAgICAgICAgICA8cD4ke19jaGFyYWN0ZXIuY29ufTwvcD5cbiAgICAgICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJjaGFyYWN0ZXItc2hlZXRfX21vZGlmaWVyLWJveFwiPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxwPiR7Y29uTW9kIDwgMCA/ICcnIDogJysnfSAke2Nvbk1vZH08L3A+XG4gICAgICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJjaGFyYWN0ZXItc2hlZXRfX3Njb3JlLWJveFwiPlxuICAgICAgICAgICAgICAgICAgICAgICAgPHA+SW50PC9wPlxuICAgICAgICAgICAgICAgICAgICAgICAgPHA+JHtfY2hhcmFjdGVyLmludH08L3A+XG4gICAgICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzPVwiY2hhcmFjdGVyLXNoZWV0X19tb2RpZmllci1ib3hcIj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8cD4ke2ludE1vZCA8IDAgPyAnJyA6ICcrJ30gJHtpbnRNb2R9PC9wPlxuICAgICAgICAgICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzPVwiY2hhcmFjdGVyLXNoZWV0X19zY29yZS1ib3hcIj5cbiAgICAgICAgICAgICAgICAgICAgICAgIDxwPldpczwvcD5cbiAgICAgICAgICAgICAgICAgICAgICAgIDxwPiR7X2NoYXJhY3Rlci53aXN9PC9wPlxuICAgICAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzcz1cImNoYXJhY3Rlci1zaGVldF9fbW9kaWZpZXItYm94XCI+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPHA+JHt3aXNNb2QgPCAwID8gJycgOiAnKyd9ICR7d2lzTW9kfTwvcD5cbiAgICAgICAgICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzcz1cImNoYXJhY3Rlci1zaGVldF9fc2NvcmUtYm94XCI+XG4gICAgICAgICAgICAgICAgICAgICAgICA8cD5DaGFyPC9wPlxuICAgICAgICAgICAgICAgICAgICAgICAgPHA+JHtfY2hhcmFjdGVyLmNoYXJ9PC9wPlxuICAgICAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzcz1cImNoYXJhY3Rlci1zaGVldF9fbW9kaWZpZXItYm94XCI+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPHA+JHtjaGFyTW9kIDwgMCA/ICcnIDogJysnfSAke2NoYXJNb2R9PC9wPlxuICAgICAgICAgICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgIGApO1xuXG4gICAgICAgIGRpc2FibGVIb3RrZXlzKCk7XG4gICAgICAgIGRyYWdFbGVtZW50KHNoZWV0V2luZG93LCAnY2hhcmFjdGVyLXNoZWV0Jyk7XG4gICAgfSBlbHNlIHtcbiAgICAgICAgZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLmNoYXJhY3Rlci1zaGVldCcpLnJlbW92ZSgpO1xuICAgIH1cbn1cblxuZnVuY3Rpb24gZGFtYWdlSHAoZTogRXZlbnQpIHtcbiAgICBlLnByZXZlbnREZWZhdWx0KCk7XG4gICAgbGV0IGRtZ0Ftb3VudCA9IHBhcnNlSW50KGRtZ0FkZElucHV0KTtcbiAgICBsZXQgdG1wSHBWYWx1ZSA9IF9jaGFyYWN0ZXIudGVtcF9oZWFsdGg7XG4gICAgdG1wSHBWYWx1ZSAtPSBkbWdBbW91bnQ7XG4gICAgaWYgKHRtcEhwVmFsdWUgPCAwKSB0bXBIcFZhbHVlID0gMDtcbiAgICBkbWdBbW91bnQgLT0gX2NoYXJhY3Rlci50ZW1wX2hlYWx0aDtcbiAgICBpZiAoZG1nQW1vdW50IDwgMCkgZG1nQW1vdW50ID0gMDtcbiAgICBcbiAgICBzZXRUZW1wSGVhbHRoKHtpZDogX2NoYXJhY3Rlci5pZCwgaGVhbHRoOiB0bXBIcFZhbHVlfSk7XG4gICAgc2V0SGVhbHRoKHtpZDogX2NoYXJhY3Rlci5pZCwgaGVhbHRoOiBfY2hhcmFjdGVyLmN1cnJlbnRfaGVhbHRoIC0gZG1nQW1vdW50fSk7XG4gICAgcmVzZXRTaGVldERhdGEoKTtcbn1cblxuZnVuY3Rpb24gaGVhbEhwKGU6IEV2ZW50KSB7XG4gICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xuICAgIGxldCBoZWFsQW1vdW50ID0gcGFyc2VJbnQoaGVhbEFkZElucHV0KTtcbiAgICBpZiAoX2NoYXJhY3Rlci5jdXJyZW50X2hlYWx0aCArIGhlYWxBbW91bnQgPiBfY2hhcmFjdGVyLm1heF9oZWFsdGgpIHtcbiAgICAgICAgc2V0SGVhbHRoKHtpZDogX2NoYXJhY3Rlci5pZCwgaGVhbHRoOiBfY2hhcmFjdGVyLm1heF9oZWFsdGh9KTtcbiAgICB9IGVsc2Uge1xuICAgICAgICBzZXRIZWFsdGgoe2lkOiBfY2hhcmFjdGVyLmlkLCBoZWFsdGg6IF9jaGFyYWN0ZXIuY3VycmVudF9oZWFsdGggKyBoZWFsQW1vdW50fSk7XG4gICAgfVxuICAgIHJlc2V0U2hlZXREYXRhKCk7XG59XG5cbmZ1bmN0aW9uIGFkZFRlbXBIcChlOiBFdmVudCkge1xuICAgIGUucHJldmVudERlZmF1bHQoKTtcbiAgICBzZXRUZW1wSGVhbHRoKHtpZDogX2NoYXJhY3Rlci5pZCwgaGVhbHRoOiBfY2hhcmFjdGVyLnRlbXBfaGVhbHRoICsgcGFyc2VJbnQodGVtcEFkZElucHV0KX0pO1xuICAgIHJlc2V0U2hlZXREYXRhKCk7XG59XG5cbmZ1bmN0aW9uIHJlc2V0U2hlZXREYXRhKCkge1xuICAgIHRvZ2dsZUNoYXJhY3RlclNoZWV0KCk7XG4gICAgc2V0VGltZW91dChmdW5jdGlvbigpIHsgdG9nZ2xlQ2hhcmFjdGVyU2hlZXQoKTsgfSwgMTAwKTtcbn0iLCAiaW1wb3J0IHsgem9vbUluLCB6b29tT3V0IH0gZnJvbSAnLi9ncmlkJztcbmltcG9ydCB7IGNsaWVudCB9IGZyb20gJy4vZGFzaGJvYXJkJztcbmltcG9ydCB7IHRvZ2dsZVRva2VuTWVudSB9IGZyb20gJy4vbWVudXMvdG9rZW4ubWVudSc7XG5pbXBvcnQgeyB0b2dnbGVNYXBNZW51IH0gZnJvbSAnLi9tZW51cy9tYXAubWVudSc7XG5pbXBvcnQgeyB0b2dnbGVDaGFyYWN0ZXJNZW51IH0gZnJvbSAnLi9tZW51cy9jaGFyYWN0ZXIubWVudSc7XG5pbXBvcnQgeyB0b2dnbGVDcmVhdHVyZXNXaW5kb3cgfSBmcm9tICcuL2NyZWF0dXJlcyc7XG5pbXBvcnQgeyB0b2dnbGVDaGFyYWN0ZXJTaGVldCB9IGZyb20gJy4vY2hhcmFjdGVyLXNoZWV0JztcblxuXG5sZXQgY2FuU2NhbGUgPSBmYWxzZTtcbmxldCB0YXJnZXRQb3NYOiBudW1iZXIsIHRhcmdldFBvc1k6IG51bWJlcjtcbmxldCBkcmFnZ2luZyA9IGZhbHNlO1xuZXhwb3J0IGxldCBjYW5Vc2VIb3RrZXkgPSB7dmFsdWU6IHRydWV9O1xuXG4vLyA9PT0gRVZFTlQgSEFORExFUlMgPT09IC8vXG5cbi8vIEZpcmVzIHdoZW4gdXNlciBwcmVzc2VzIGtleVxuZG9jdW1lbnQuYWRkRXZlbnRMaXN0ZW5lcigna2V5ZG93bicsIChlKSA9PiB7XG4gICAgaWYgKGNhblVzZUhvdGtleS52YWx1ZSkge1xuICAgICAgICBzd2l0Y2ggKHRydWUpIHtcbiAgICAgICAgICAgIGNhc2UgZS5rZXkgPT09ICdNZXRhJyB8fCBlLmtleSA9PT0gJ0NvbnRyb2wnOlxuICAgICAgICAgICAgICAgIGNhblNjYWxlID0gdHJ1ZTtcbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIGNhc2UgZS5rZXkgPT09ICdEZWxldGUnOlxuICAgICAgICAgICAgICAgIGZvciAoY29uc3QgX3Rva2VuIG9mIGRvY3VtZW50LmdldEVsZW1lbnRzQnlDbGFzc05hbWUoJ3Rva2VuJykpIHtcbiAgICAgICAgICAgICAgICAgICAgaWYgKF90b2tlbi5jbGFzc0xpc3QuY29udGFpbnMoJ3Rva2VuLS1zZWxlY3RlZCcpKSBfdG9rZW4ucmVtb3ZlKCk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgY2FzZSBlLmtleSA9PT0gJysnIHx8IGUua2V5ID09PSAnPSc6XG4gICAgICAgICAgICAgICAgem9vbUluKCk7XG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICBjYXNlIGUua2V5ID09PSAnLScgfHwgZS5rZXkgPT09ICdfJzpcbiAgICAgICAgICAgICAgICB6b29tT3V0KCk7XG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICBjYXNlIGUud2hpY2ggPT09IDQ5OlxuICAgICAgICAgICAgICAgIGNsaWVudC5jbGllbnRUeXBlID09PSAnZG0nID8gdG9nZ2xlVG9rZW5NZW51KCd0b2tlbnMnKSA6IHRvZ2dsZUNoYXJhY3Rlck1lbnUoJ2NoYXJhY3RlcnMnKTtcbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIGNhc2UgZS53aGljaCA9PT0gNTA6XG4gICAgICAgICAgICAgICAgY2xpZW50LmNsaWVudFR5cGUgPT09ICdkbScgPyB0b2dnbGVDcmVhdHVyZXNXaW5kb3coKSA6IHRvZ2dsZUNoYXJhY3RlclNoZWV0KCk7XG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICBjYXNlIGUud2hpY2ggPT09IDUxOlxuICAgICAgICAgICAgICAgIGNsaWVudC5jbGllbnRUeXBlID09PSAnZG0nID8gdG9nZ2xlTWFwTWVudSgnbWFwcycpIDogY29uc29sZS5sb2coJ25vdGhpbmcnKTtcbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIGRlZmF1bHQ6XG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgIH1cbiAgICB9XG59KTtcblxuLy8gRmlyZXMgd2hlbiB1c2VyIHJlbGVhc2VzIGtleVxuZG9jdW1lbnQuYWRkRXZlbnRMaXN0ZW5lcigna2V5dXAnLCAoZSkgPT4ge1xuICAgIHN3aXRjaCAodHJ1ZSkge1xuICAgICAgICBjYXNlIGUua2V5ID09PSAnTWV0YScgfHwgZS5rZXkgPT09ICdDb250cm9sTGVmdCc6XG4gICAgICAgICAgICBjYW5TY2FsZSA9IGZhbHNlO1xuICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgIGRlZmF1bHQ6XG4gICAgICAgICAgICBicmVhaztcbiAgICB9XG59KTtcblxuLy8gRmlyZXMgd2hlbiB1c2VyIHByZXNzZXMgbW91c2UgYnV0dG9uXG5kb2N1bWVudC5hZGRFdmVudExpc3RlbmVyKCdtb3VzZWRvd24nLCAoZSkgPT4ge1xuICAgIHN3aXRjaCAodHJ1ZSkge1xuICAgICAgICBjYXNlIGUud2hpY2ggPT09IDI6XG4gICAgICAgICAgICBlLnByZXZlbnREZWZhdWx0KCk7XG4gICAgICAgICAgICB0YXJnZXRQb3NYID0gZS54O1xuICAgICAgICAgICAgdGFyZ2V0UG9zWSA9IGUueTtcbiAgICAgICAgICAgIGRyYWdnaW5nID0gdHJ1ZTtcbiAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICBkZWZhdWx0OlxuICAgICAgICAgICAgYnJlYWs7XG4gICAgfVxufSk7XG5cbi8vIEZpcmVzIHdoZW4gdXNlciByZWxlYXNlcyBtb3VzZSBidXR0b25cbmRvY3VtZW50LmFkZEV2ZW50TGlzdGVuZXIoJ21vdXNldXAnLCAoZSkgPT4ge1xuICAgIHN3aXRjaCAodHJ1ZSkge1xuICAgICAgICBjYXNlIGUud2hpY2ggPT09IDI6XG4gICAgICAgICAgICBkcmFnZ2luZyA9IGZhbHNlO1xuICAgICAgICAgICAgZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLmdhbWUtcGFnZS1jb250YWluZXInKS5jbGFzc0xpc3QucmVtb3ZlKCdwYW5uaW5nJyk7XG4gICAgICAgICAgICBicmVhaztcbiAgICAgICAgZGVmYXVsdDpcbiAgICAgICAgICAgIGJyZWFrO1xuICAgIH1cbn0pO1xuXG4vLyBGaXJlcyB3aGVuIHVzZXIgbW92ZXMgbW91c2VcbmRvY3VtZW50LmFkZEV2ZW50TGlzdGVuZXIoJ21vdXNlbW92ZScsIChlKSA9PiB7XG4gICAgY29uc3QgbW91c2VQb3NYID0gZS54O1xuICAgIGNvbnN0IG1vdXNlUG9zWSA9IGUueTtcbiAgICBpZiAoZHJhZ2dpbmcpIHtcbiAgICAgICAgZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLmdyaWQtY29udGFpbmVyJykuc2Nyb2xsQnkoKHRhcmdldFBvc1ggLSBtb3VzZVBvc1gpIC8gMjUsICh0YXJnZXRQb3NZIC0gbW91c2VQb3NZKSAvIDI1KTtcbiAgICAgICAgZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLmdhbWUtcGFnZS1jb250YWluZXInKS5jbGFzc0xpc3QuYWRkKCdwYW5uaW5nJyk7XG4gICAgfVxufSk7XG5cbiIsICJpbXBvcnQgeyBjZWxscyB9IGZyb20gJy4vZ3JpZCc7XG5pbXBvcnQgeyB0b2dnbGVUb2tlbk1lbnUgfSBmcm9tICcuL21lbnVzL3Rva2VuLm1lbnUnO1xuaW1wb3J0IHsgdG9nZ2xlTWFwTWVudSB9IGZyb20gJy4vbWVudXMvbWFwLm1lbnUnO1xuaW1wb3J0IHsgdG9nZ2xlQ2hhcmFjdGVyTWVudSB9IGZyb20gJy4vbWVudXMvY2hhcmFjdGVyLm1lbnUnO1xuaW1wb3J0IHsgY2FuVXNlSG90a2V5IH0gZnJvbSAnLi9pbnB1dCc7XG5cbmV4cG9ydCBsZXQgbWVudU9wZW46IGFueSA9IHt2YWx1ZTogZmFsc2V9O1xuZXhwb3J0IGxldCBzZWxlY3RlZE1lbnU6IGFueSA9IHt2YWx1ZTogJyd9O1xuXG4vLyBDbGFtcCBudW1iZXIgYmV0d2VlbiB0d28gdmFsdWVzXG5leHBvcnQgY29uc3QgY2xhbXAgPSAobnVtOiBudW1iZXIsIG1pbjogbnVtYmVyLCBtYXg6IG51bWJlcikgPT4gTWF0aC5taW4oTWF0aC5tYXgobnVtLCBtaW4pLCBtYXgpO1xuXG4vLyBXaWxsIGZpbmQgYW5kIHJldHVybiBhIGNlbGwgd2l0aCB0aGUgcGFyYW1ldGVycyBnaXZlblxuZXhwb3J0IGZ1bmN0aW9uIGZpbmRDZWxsKHg6IG51bWJlciwgeTogbnVtYmVyKSB7XG4gICAgZm9yIChjb25zdCBjZWxsIG9mIGNlbGxzKSB7XG4gICAgICAgIGlmIChjZWxsLmdldEF0dHJpYnV0ZSgneCcpID09PSB4LnRvU3RyaW5nKCkgJiYgY2VsbC5nZXRBdHRyaWJ1dGUoJ3knKSA9PT0geS50b1N0cmluZygpKSB7XG4gICAgICAgICAgICByZXR1cm4gY2VsbDtcbiAgICAgICAgfVxuICAgIH1cbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGNsb3NlTWVudShtZW51TmFtZTogc3RyaW5nKSB7XG4gICAgaWYgKHNlbGVjdGVkTWVudS52YWx1ZSA9PT0gbWVudU5hbWUpIHtcbiAgICAgICAgLy8gQ2xvc2UgbWVudVxuICAgICAgICBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcubWVudScpLnJlbW92ZSgpO1xuICAgICAgICBtZW51T3Blbi52YWx1ZSA9IGZhbHNlO1xuICAgIH0gZWxzZSB7XG4gICAgICAgIC8vIENsb3NlIG1lbnUsIHRoZW4gb3BlbiBzZWxlY3RlZCBvbmVcbiAgICAgICAgZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLm1lbnUnKS5yZW1vdmUoKTtcbiAgICAgICAgbWVudU9wZW4udmFsdWUgPSBmYWxzZTtcblxuICAgICAgICBzd2l0Y2ggKG1lbnVOYW1lKSB7XG4gICAgICAgICAgICBjYXNlICd0b2tlbnMnOlxuICAgICAgICAgICAgICAgIHRvZ2dsZVRva2VuTWVudSgnJyk7XG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICBjYXNlICdtYXBzJzpcbiAgICAgICAgICAgICAgICB0b2dnbGVNYXBNZW51KCcnKTtcbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIGNhc2UgJ2NoYXJhY3RlcnMnOlxuICAgICAgICAgICAgICAgIHRvZ2dsZUNoYXJhY3Rlck1lbnUoJycpO1xuICAgICAgICAgICAgZGVmYXVsdDpcbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgfVxuICAgIH1cbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGNoYW5nZVJvdXRlKHJvdXRlOiBzdHJpbmcpIHtcbiAgICBjb25zdCB3bCA9IHdpbmRvdy5sb2NhdGlvbjtcbiAgICB3aW5kb3cubG9jYXRpb24ucmVwbGFjZShgJHt3bC5wcm90b2NvbH0vLyR7d2wuaG9zdH0vJHtyb3V0ZX1gKTtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGRyYWdFbGVtZW50KGVsbW50OiBhbnksIGhlYWRlck5hbWU6IHN0cmluZykge1xuICAgIHZhciBwb3MxID0gMCwgcG9zMiA9IDAsIHBvczMgPSAwLCBwb3M0ID0gMDtcbiAgICBpZiAoZG9jdW1lbnQucXVlcnlTZWxlY3RvcihgLiR7aGVhZGVyTmFtZX1fX2hlYWRlcmApKSB7XG4gICAgICAvLyBpZiBwcmVzZW50LCB0aGUgaGVhZGVyIGlzIHdoZXJlIHlvdSBtb3ZlIHRoZSBESVYgZnJvbTpcbiAgICAgIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoYC4ke2hlYWRlck5hbWV9X19oZWFkZXJgKS5hZGRFdmVudExpc3RlbmVyKFwibW91c2Vkb3duXCIsIGRyYWdNb3VzZURvd24pO1xuICAgIH0gZWxzZSB7XG4gICAgICAvLyBvdGhlcndpc2UsIG1vdmUgdGhlIERJViBmcm9tIGFueXdoZXJlIGluc2lkZSB0aGUgRElWOlxuICAgICAgZWxtbnQuYWRkRXZlbnRMaXN0ZW5lcihcIm1vdXNlZG93blwiLCBkcmFnTW91c2VEb3duKTtcbiAgICB9XG4gIFxuICAgIGZ1bmN0aW9uIGRyYWdNb3VzZURvd24oZTogYW55KSB7XG4gICAgICBlID0gZSB8fCB3aW5kb3cuZXZlbnQ7XG4gICAgICBlLnByZXZlbnREZWZhdWx0KCk7XG4gICAgICAvLyBnZXQgdGhlIG1vdXNlIGN1cnNvciBwb3NpdGlvbiBhdCBzdGFydHVwOlxuICAgICAgcG9zMyA9IGUuY2xpZW50WDtcbiAgICAgIHBvczQgPSBlLmNsaWVudFk7XG4gICAgICBkb2N1bWVudC5vbm1vdXNldXAgPSBjbG9zZURyYWdFbGVtZW50O1xuICAgICAgLy8gY2FsbCBhIGZ1bmN0aW9uIHdoZW5ldmVyIHRoZSBjdXJzb3IgbW92ZXM6XG4gICAgICBkb2N1bWVudC5vbm1vdXNlbW92ZSA9IGVsZW1lbnREcmFnO1xuICAgIH1cbiAgXG4gICAgZnVuY3Rpb24gZWxlbWVudERyYWcoZTogYW55KSB7XG4gICAgICBlID0gZSB8fCB3aW5kb3cuZXZlbnQ7XG4gICAgICBlLnByZXZlbnREZWZhdWx0KCk7XG4gICAgICAvLyBjYWxjdWxhdGUgdGhlIG5ldyBjdXJzb3IgcG9zaXRpb246XG4gICAgICBwb3MxID0gcG9zMyAtIGUuY2xpZW50WDtcbiAgICAgIHBvczIgPSBwb3M0IC0gZS5jbGllbnRZO1xuICAgICAgcG9zMyA9IGUuY2xpZW50WDtcbiAgICAgIHBvczQgPSBlLmNsaWVudFk7XG4gICAgICAvLyBzZXQgdGhlIGVsZW1lbnQncyBuZXcgcG9zaXRpb246XG4gICAgICBlbG1udC5zdHlsZS50b3AgPSAoZWxtbnQub2Zmc2V0VG9wIC0gcG9zMikgKyBcInB4XCI7XG4gICAgICBlbG1udC5zdHlsZS5sZWZ0ID0gKGVsbW50Lm9mZnNldExlZnQgLSBwb3MxKSArIFwicHhcIjtcbiAgICB9XG4gIFxuICAgIGZ1bmN0aW9uIGNsb3NlRHJhZ0VsZW1lbnQoKSB7XG4gICAgICAvLyBzdG9wIG1vdmluZyB3aGVuIG1vdXNlIGJ1dHRvbiBpcyByZWxlYXNlZDpcbiAgICAgIGRvY3VtZW50Lm9ubW91c2V1cCA9IG51bGw7XG4gICAgICBkb2N1bWVudC5vbm1vdXNlbW92ZSA9IG51bGw7XG4gICAgfVxufVxuXG4vLyBXb3VsZCB0dXJuIFwiQ3JlYXR1cmUgTmFtZVwiIGludG8gXCJjcmVhdHVyZS1uYW1lXCJcbmV4cG9ydCBmdW5jdGlvbiBpbmRleENvbnZlcnRlcih0ZXh0OiBzdHJpbmcpIHtcbiAgICByZXR1cm4gdGV4dC5yZXBsYWNlKC9cXHMrL2csICctJykudG9Mb3dlckNhc2UoKTtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGRpc2FibGVIb3RrZXlzKCkge1xuICAgIC8vIERldGVjdHMgd2hlbiBpbnB1dCBpcyBmb2N1c2VkIGFuZCBkaXNhYmxlZCBob3RrZXlzXG4gICAgZm9yIChsZXQgaW5wdXQgb2YgZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbCgnaW5wdXQnKSkge1xuICAgICAgICBpbnB1dC5hZGRFdmVudExpc3RlbmVyKCdmb2N1c2luJywgKCkgPT4geyBjYW5Vc2VIb3RrZXkudmFsdWUgPSBmYWxzZTsgfSk7XG4gICAgICAgIGlucHV0LmFkZEV2ZW50TGlzdGVuZXIoJ2ZvY3Vzb3V0JywgKCkgPT4geyBjYW5Vc2VIb3RrZXkudmFsdWUgPSB0cnVlOyB9KTtcbiAgICB9XG59XG5cbi8vIGlmICh0eXBlb2YgbW9kdWxlICE9PSAndW5kZWZpbmVkJykgbW9kdWxlLmV4cG9ydHMgPSB7XG4vLyAgICAgaW5kZXhDb252ZXJ0ZXJcbi8vIH07IiwgImltcG9ydCB7IGRyYWdFbGVtZW50LCBkaXNhYmxlSG90a2V5cywgaW5kZXhDb252ZXJ0ZXIgfSBmcm9tICcuL3V0aWxzJztcbmltcG9ydCB7IGdldEN1c3RvbUNyZWF0dXJlcywgYWRkQ3JlYXR1cmUgfSBmcm9tICcuL3JvdXRlcy9jcmVhdHVyZXMucm91dGUnO1xuaW1wb3J0IHsgb3BlbkNyZWF0dXJlU3RhdHNXaW5kb3cgfSBmcm9tICcuL2NyZWF0dXJlLXN0YXRzJztcblxuZXhwb3J0IGxldCBjcmVhdHVyZXM6IGFueSA9IHt2YWx1ZTogW119O1xuZXhwb3J0IGxldCBjdXN0b21DcmVhdHVyZXM6IGFueSA9IHt2YWx1ZTogW119O1xuZXhwb3J0IGxldCBjcmVhdHVyZXNPcGVuOiBib29sZWFuID0gZmFsc2U7XG5sZXQgY3JlYXR1cmVGb3JtT3BlbjogYm9vbGVhbjtcblxuLy8gRm9ybSBkYXRhXG5sZXQgY3JlYXR1cmVGb3JtTmFtZTogc3RyaW5nLCBjcmVhdHVyZUZvcm1TaXplOiBzdHJpbmcgPSBcIm1lZGl1bVwiLCBjcmVhdHVyZUZvcm1UeXBlOiBzdHJpbmcsIGNyZWF0dXJlRm9ybUFsaWdubWVudDogc3RyaW5nLCBjcmVhdHVyZUZvcm1BYzogbnVtYmVyLCBjcmVhdHVyZUZvcm1IaXRQb2ludHM6IG51bWJlciwgY3JlYXR1cmVGb3JtSGl0RGljZTogc3RyaW5nLCBjcmVhdHVyZUZvcm1TdHIsIGNyZWF0dXJlRm9ybURleDogbnVtYmVyLCBjcmVhdHVyZUZvcm1Db246IG51bWJlciwgY3JlYXR1cmVGb3JtSW50OiBudW1iZXIsIGNyZWF0dXJlRm9ybVdpczogbnVtYmVyLCBjcmVhdHVyZUZvcm1DaGFyOiBudW1iZXIsIGNyZWF0dXJlRm9ybVZ1bDogc3RyaW5nLCBjcmVhdHVyZUZvcm1SZXM6IHN0cmluZywgY3JlYXR1cmVGb3JtRG1nSW1tdW5lOiBzdHJpbmcsIGNyZWF0dXJlRm9ybUNvbkltbXVuZTogc3RyaW5nLCBjcmVhdHVyZUZvcm1MYW5ndWFnZXM6IHN0cmluZywgY3JlYXR1cmVGb3JtQ3I6IG51bWJlciwgY3JlYXR1cmVGb3JtWHA6IG51bWJlciwgY3JlYXR1cmVGb3JtV2FsazogbnVtYmVyLCBjcmVhdHVyZUZvcm1Td2ltOiBudW1iZXIsIGNyZWF0dXJlRm9ybUJ1cnJvdzogbnVtYmVyLCBjcmVhdHVyZUZvcm1GbHk6IG51bWJlciwgY3JlYXR1cmVGb3JtQ2xpbWI6IG51bWJlcjtcblxuZXhwb3J0IGZ1bmN0aW9uIHRvZ2dsZUNyZWF0dXJlc1dpbmRvdygpIHtcbiAgICBjcmVhdHVyZXNPcGVuID0gIWNyZWF0dXJlc09wZW47XG4gICAgaWYgKGNyZWF0dXJlc09wZW4pIHtcbiAgICAgICAgcmVuZGVyQ3JlYXR1cmVXaW5kb3coKTtcbiAgICAgICAgZ2V0Q3JlYXR1cmVzQm9keURhdGEoKTtcbiAgICB9IGVsc2Uge1xuICAgICAgICBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcuY3JlYXR1cmVzLXdpbmRvdycpLnJlbW92ZSgpO1xuICAgIH1cbn1cblxuZnVuY3Rpb24gcmVuZGVyQ3JlYXR1cmVXaW5kb3coKSB7XG4gICAgY29uc3Qgd2luZG93ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignYm9keScpLmFwcGVuZENoaWxkKGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpKTtcbiAgICB3aW5kb3cuY2xhc3NMaXN0LmFkZCgnY3JlYXR1cmVzLXdpbmRvdycpO1xuICAgIHdpbmRvdy5pbnNlcnRBZGphY2VudEhUTUwoJ2JlZm9yZWVuZCcsIGBcbiAgICAgICAgPGRpdiBjbGFzcz1cImNyZWF0dXJlcy1jb250ZW50XCI+XG4gICAgICAgICAgICA8ZGl2IGNsYXNzPVwiY3JlYXR1cmVzLXdpbmRvd19faGVhZGVyXCI+XG4gICAgICAgICAgICAgICAgPGgyPkNyZWF0dXJlczwvaDI+XG4gICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJjcmVhdHVyZS13aW5kb3dfX2ZpbHRlcnNcIj5cbiAgICAgICAgICAgICAgICA8bGFiZWw+XG4gICAgICAgICAgICAgICAgICAgIDxzZWxlY3QgaWQ9XCJjcmVhdHVyZS1saXN0LWZpbHRlclwiIG9uY2hhbmdlPVwiZmlsdGVyQ3JlYXR1cmVzTGlzdChldmVudC50YXJnZXQudmFsdWUpXCI+XG4gICAgICAgICAgICAgICAgICAgICAgICA8b3B0aW9uIHZhbHVlPVwiYWxsXCI+QWxsIGNyZWF0dXJlczwvb3B0aW9uPlxuICAgICAgICAgICAgICAgICAgICAgICAgPG9wdGlvbiB2YWx1ZT1cInN0YW5kYXJkXCI+U3RhbmRhcmQ8L29wdGlvbj5cbiAgICAgICAgICAgICAgICAgICAgICAgIDxvcHRpb24gdmFsdWU9XCJjdXN0b21cIj5DdXN0b208L29wdGlvbj5cbiAgICAgICAgICAgICAgICAgICAgPC9zZWxlY3Q+XG4gICAgICAgICAgICAgICAgPC9sYWJlbD5cbiAgICAgICAgICAgICAgICA8bGFiZWw+XG4gICAgICAgICAgICAgICAgICAgIDxpbnB1dCBwbGFjZWhvbGRlcj1cInNlYXJjaFwiIG9uY2hhbmdlPVwic2VhcmNoQ3JlYXR1cmVzTGlzdChldmVudC50YXJnZXQudmFsdWUpXCI+XG4gICAgICAgICAgICAgICAgPC9sYWJlbD5cbiAgICAgICAgICAgICAgICA8YnV0dG9uIGNsYXNzPVwiYnRuLS1ob3ZlclwiIGlkPVwibmV3LWNyZWF0dXJlLWZvcm0tYnRuXCI+TmV3IENyZWF0dXJlPC9idXR0b24+XG4gICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJjcmVhdHVyZXMtd2luZG93X19ib2R5XCI+PC9kaXY+XG4gICAgICAgIDwvZGl2PlxuICAgIGApO1xuICAgIGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCduZXctY3JlYXR1cmUtZm9ybS1idG4nKS5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsICgpID0+IHtcbiAgICAgICAgdG9nZ2xlTmV3Q3JlYXR1cmVGb3JtKCk7XG4gICAgfSk7XG4gICAgZHJhZ0VsZW1lbnQod2luZG93LCAnY3JlYXR1cmVzLXdpbmRvdycpO1xufVxuXG5mdW5jdGlvbiBmaWx0ZXJDcmVhdHVyZXNMaXN0KHZhbHVlOiBzdHJpbmcpIHtcbiAgICBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcuY3JlYXR1cmVzLXdpbmRvd19fYm9keScpLmlubmVySFRNTCA9ICcnO1xuICAgIHN3aXRjaCAodmFsdWUpIHtcbiAgICAgICAgY2FzZSAnYWxsJzpcbiAgICAgICAgICAgIGdldENyZWF0dXJlc0JvZHlEYXRhKCk7XG4gICAgICAgICAgICBicmVhaztcbiAgICAgICAgY2FzZSAnc3RhbmRhcmQnOlxuICAgICAgICAgICAgZ2V0U3RhbmRhcmRDcmVhdHVyZXNEYXRhKCk7XG4gICAgICAgICAgICBicmVhaztcbiAgICAgICAgY2FzZSAnY3VzdG9tJzpcbiAgICAgICAgICAgIGdldEN1c3RvbUNyZWF0dXJlc0RhdGEoKTtcbiAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICBkZWZhdWx0OlxuICAgICAgICAgICAgYnJlYWs7XG4gICAgfVxufVxuXG5hc3luYyBmdW5jdGlvbiBzZWFyY2hDcmVhdHVyZXNMaXN0KHZhbHVlOiBzdHJpbmcpIHtcbiAgICBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcuY3JlYXR1cmVzLXdpbmRvd19fYm9keScpLmlubmVySFRNTCA9ICcnO1xuICAgIGF3YWl0IGdldEN1c3RvbUNyZWF0dXJlcygpO1xuICAgIGNvbnN0IHNlbGVjdGVkRmlsdGVyID0gKDxIVE1MSW5wdXRFbGVtZW50PmRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdjcmVhdHVyZS1saXN0LWZpbHRlcicpKS52YWx1ZTtcblxuICAgIC8vIEZpbHRlciBhbGwgc3RhbmRhcmQgY3JlYXR1cmVzXG4gICAgaWYgKHNlbGVjdGVkRmlsdGVyID09PSAnYWxsJyB8fCBzZWxlY3RlZEZpbHRlciA9PT0gJ3N0YW5kYXJkJykge1xuICAgICAgICBjcmVhdHVyZXMuZm9yRWFjaCgoY3JlYXR1cmU6IGFueSkgPT4ge1xuICAgICAgICAgICAgaWYgKGNyZWF0dXJlLm5hbWUudG9Mb3dlckNhc2UoKS5pbmNsdWRlcyh2YWx1ZS50b0xvd2VyQ2FzZSgpKSkge1xuICAgICAgICAgICAgICAgIHJlbmRlclN0YW5kYXJkQ3JlYXR1cmVSb3coY3JlYXR1cmUpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9KTtcbiAgICB9XG4gICAgLy8gRmlsdGVyIGFsbCBjdXN0b20gY3JlYXR1cmVzXG4gICAgaWYgKHNlbGVjdGVkRmlsdGVyID09PSAnYWxsJyB8fCBzZWxlY3RlZEZpbHRlciA9PT0gJ2N1c3RvbScpIHtcbiAgICAgICAgY3VzdG9tQ3JlYXR1cmVzLmZvckVhY2goKGNyZWF0dXJlOiBhbnkpID0+IHtcbiAgICAgICAgICAgIGlmIChjcmVhdHVyZS5uYW1lLnRvTG93ZXJDYXNlKCkuaW5jbHVkZXModmFsdWUudG9Mb3dlckNhc2UoKSkpIHtcbiAgICAgICAgICAgICAgICByZW5kZXJDdXN0b21DcmVhdHVyZVJvdyhjcmVhdHVyZSk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0pO1xuICAgIH1cbn1cblxuYXN5bmMgZnVuY3Rpb24gZ2V0Q3JlYXR1cmVzQm9keURhdGEoKSB7XG4gICAgYXdhaXQgZ2V0Q3VzdG9tQ3JlYXR1cmVzKCk7XG4gICAgZm9yIChsZXQgY3JlYXR1cmUgb2YgY3VzdG9tQ3JlYXR1cmVzLnZhbHVlKSB7XG4gICAgICAgIHJlbmRlckN1c3RvbUNyZWF0dXJlUm93KGNyZWF0dXJlKTtcbiAgICB9XG4gICAgZm9yIChsZXQgY3JlYXR1cmUgb2YgY3JlYXR1cmVzLnZhbHVlKSB7XG4gICAgICAgIHJlbmRlclN0YW5kYXJkQ3JlYXR1cmVSb3coY3JlYXR1cmUpO1xuICAgIH1cbn1cblxuYXN5bmMgZnVuY3Rpb24gZ2V0U3RhbmRhcmRDcmVhdHVyZXNEYXRhKCkge1xuICAgIGZvciAobGV0IGNyZWF0dXJlIG9mIGNyZWF0dXJlcy52YWx1ZSkge1xuICAgICAgICByZW5kZXJTdGFuZGFyZENyZWF0dXJlUm93KGNyZWF0dXJlKTtcbiAgICB9XG59XG5cbmFzeW5jIGZ1bmN0aW9uIGdldEN1c3RvbUNyZWF0dXJlc0RhdGEoKSB7XG4gICAgYXdhaXQgZ2V0Q3VzdG9tQ3JlYXR1cmVzKCk7XG4gICAgZm9yIChsZXQgY3JlYXR1cmUgb2YgY3VzdG9tQ3JlYXR1cmVzLnZhbHVlKSB7XG4gICAgICAgIHJlbmRlckN1c3RvbUNyZWF0dXJlUm93KGNyZWF0dXJlKTtcbiAgICB9XG59XG5cbi8vIERpc3BsYXlzIGEgc3RhbmRhcmQgY3JlYXR1cmUgb24gdGhlIGNyZWF0dXJlcyBsaXN0LlxuZnVuY3Rpb24gcmVuZGVyU3RhbmRhcmRDcmVhdHVyZVJvdyhjcmVhdHVyZTogYW55KSB7XG4gICAgZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLmNyZWF0dXJlcy13aW5kb3dfX2JvZHknKS5pbnNlcnRBZGphY2VudEhUTUwoJ2JlZm9yZWVuZCcsIGBcbiAgICAgICAgPGRpdiBjbGFzcz1cImNyZWF0dXJlcy13aW5kb3dfX3N0YW5kYXJkLWNyZWF0dXJlXCI+XG4gICAgICAgICAgICA8ZGl2IGNsYXNzPVwiY3JlYXR1cmVzLXdpbmRvd19faXRlbSBjcmVhdHVyZS1yb3ctY2xpY2stZXZcIj5cbiAgICAgICAgICAgICAgICA8cD4ke2NyZWF0dXJlLm5hbWV9PC9wPlxuICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgIDwvZGl2PlxuICAgIGApO1xuICAgIGFkZENyZWF0dXJlUm93RXZlbnRzKCdzdGFuZGFyZCcsIGNyZWF0dXJlLmluZGV4KTtcbn1cblxuLy8gRGlzcGxheXMgYSBjdXN0b20gY3JlYXR1cmUgb24gdGhlIGNyZWF0dXJlcyBsaXN0LlxuZnVuY3Rpb24gcmVuZGVyQ3VzdG9tQ3JlYXR1cmVSb3coY3JlYXR1cmU6IGFueSkge1xuICAgIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5jcmVhdHVyZXMtd2luZG93X19ib2R5JykuaW5zZXJ0QWRqYWNlbnRIVE1MKCdiZWZvcmVlbmQnLCBgXG4gICAgICAgIDxkaXYgY2xhc3M9XCJjcmVhdHVyZXMtd2luZG93X19jdXN0b20tY3JlYXR1cmVcIj5cbiAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJjcmVhdHVyZXMtd2luZG93X19pdGVtIGNyZWF0dXJlLXJvdy1jbGljay1ldlwiPlxuICAgICAgICAgICAgICAgIDxwPiR7Y3JlYXR1cmUubmFtZX08L3A+XG4gICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgIDxpIGNsYXNzPVwiZmEtc29saWQgZmEtdHJhc2gtY2FuXCIgb25jbGljaz1cImRlbGV0ZUNyZWF0dXJlKCcke2NyZWF0dXJlLmluZGV4fScpXCI+PC9pPlxuICAgICAgICA8L2Rpdj5cbiAgICBgKTtcbiAgICBhZGRDcmVhdHVyZVJvd0V2ZW50cygnY3VzdG9tJywgY3JlYXR1cmUuaW5kZXgpO1xufVxuXG4vLyBHaXZlIGNyZWF0dXJlIHJvd3Mgb24gY2xpY2sgZXZlbnQgbGlzdGVuZXJzLCB0byBvcGVuIGNyZWF0dXJlIHN0YXRzXG5mdW5jdGlvbiBhZGRDcmVhdHVyZVJvd0V2ZW50cyhyb3dUeXBlOiBzdHJpbmcsIGluZGV4OiBzdHJpbmcpIHtcbiAgICBjb25zdCByb3cgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcuY3JlYXR1cmUtcm93LWNsaWNrLWV2Jyk7XG4gICAgc3dpdGNoIChyb3dUeXBlKSB7XG4gICAgICAgIGNhc2UgJ3N0YW5kYXJkJzpcbiAgICAgICAgICAgIHJvdy5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsICgpID0+IHtcbiAgICAgICAgICAgICAgICBvcGVuQ3JlYXR1cmVTdGF0c1dpbmRvdyhpbmRleCwgZmFsc2UpO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICByb3cuY2xhc3NMaXN0LnJlbW92ZSgnY3JlYXR1cmUtcm93LWNsaWNrLWV2Jyk7XG4gICAgICAgICAgICBicmVhaztcbiAgICAgICAgY2FzZSAnY3VzdG9tJzpcbiAgICAgICAgICAgIHJvdy5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsICgpID0+IHtcbiAgICAgICAgICAgICAgICBvcGVuQ3JlYXR1cmVTdGF0c1dpbmRvdyhpbmRleCwgdHJ1ZSk7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIHJvdy5jbGFzc0xpc3QucmVtb3ZlKCdjcmVhdHVyZS1yb3ctY2xpY2stZXYnKTtcbiAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICBkZWZhdWx0OlxuICAgICAgICAgICAgYnJlYWs7XG4gICAgfVxufVxuXG5jb25zdCBjcmVhdHVyZUZvcm1Cb2R5OiBhbnkgPSBgXG48ZGl2IGNsYXNzPVwiY3JlYXR1cmVzLWNvbnRlbnRcIj5cbiAgICA8YnV0dG9uIGNsYXNzPVwiYnRuLS13aW5kb3ctY2xvc2VcIiBvbmNsaWNrPVwidG9nZ2xlTmV3Q3JlYXR1cmVGb3JtKClcIj5YPC9idXR0b24+XG4gICAgPGRpdiBjbGFzcz1cImNyZWF0dXJlcy13aW5kb3ctZm9ybV9faGVhZGVyXCI+XG4gICAgICAgIDxoMj5OZXcgQ3JlYXR1cmU8L2gyPlxuICAgIDwvZGl2PlxuICAgIDxmb3JtIGNsYXNzPVwiY3JlYXR1cmVzLXdpbmRvdy1mb3JtX19ib2R5XCIgb25zdWJtaXQ9XCJzdWJtaXRDcmVhdHVyZUZvcm0oZXZlbnQpXCI+XG4gICAgICAgIDxsYWJlbD5Ub2tlblxuICAgICAgICAgICAgPGlucHV0IHR5cGU9XCJmaWxlXCI+XG4gICAgICAgIDwvbGFiZWw+XG4gICAgICAgIDxkaXYgY2xhc3M9XCJjcmVhdHVyZXMtd2luZG93LWZvcm1fX2JvZHktLWJveFwiPlxuICAgICAgICAgICAgPGxhYmVsPk5hbWVcbiAgICAgICAgICAgICAgICA8aW5wdXQgcmVxdWlyZWQgb25jaGFuZ2U9XCJjcmVhdHVyZUZvcm1OYW1lID0gZXZlbnQudGFyZ2V0LnZhbHVlXCI+XG4gICAgICAgICAgICA8L2xhYmVsPlxuICAgICAgICAgICAgPGxhYmVsPlNpemVcbiAgICAgICAgICAgICAgICA8c2VsZWN0IG9uY2hhbmdlPVwiY3JlYXR1cmVGb3JtU2l6ZSA9IGV2ZW50LnRhcmdldC52YWx1ZVwiPlxuICAgICAgICAgICAgICAgICAgICA8b3B0aW9uIHZhbHVlPVwidGlueVwiPlRpbnk8L29wdGlvbj5cbiAgICAgICAgICAgICAgICAgICAgPG9wdGlvbiB2YWx1ZT1cInNtYWxsXCI+U21hbGw8L29wdGlvbj5cbiAgICAgICAgICAgICAgICAgICAgPG9wdGlvbiB2YWx1ZT1cIm1lZGl1bVwiIHNlbGVjdGVkPk1lZGl1bTwvb3B0aW9uPlxuICAgICAgICAgICAgICAgICAgICA8b3B0aW9uIHZhbHVlPVwibGFyZ2VcIj5MYXJnZTwvb3B0aW9uPlxuICAgICAgICAgICAgICAgICAgICA8b3B0aW9uIHZhbHVlPVwiaHVnZVwiPkh1Z2U8L29wdGlvbj5cbiAgICAgICAgICAgICAgICAgICAgPG9wdGlvbiB2YWx1ZT1cImdhcmdhbnR1YW5cIj5HYXJnYW50dWFuPC9vcHRpb24+XG4gICAgICAgICAgICAgICAgPC9zZWxlY3Q+XG4gICAgICAgICAgICA8L2xhYmVsPlxuICAgICAgICAgICAgPGxhYmVsPlR5cGVcbiAgICAgICAgICAgICAgICA8aW5wdXQgY2xhc3M9XCJpbnB1dC0tbWRcIiBvbmNoYW5nZT1cImNyZWF0dXJlRm9ybVR5cGUgPSBldmVudC50YXJnZXQudmFsdWVcIj5cbiAgICAgICAgICAgIDwvbGFiZWw+XG4gICAgICAgICAgICA8bGFiZWw+QWxpZ25tZW50XG4gICAgICAgICAgICAgICAgPGlucHV0IGNsYXNzPVwiaW5wdXQtLXNtXCIgb25jaGFuZ2U9XCJjcmVhdHVyZUZvcm1BbGlnbm1lbnQgPSBldmVudC50YXJnZXQudmFsdWVcIj5cbiAgICAgICAgICAgIDwvbGFiZWw+XG4gICAgICAgICAgICA8bGFiZWw+QUNcbiAgICAgICAgICAgICAgICA8aW5wdXQgY2xhc3M9XCJpbnB1dC0tc21cIiB0eXBlPVwibnVtYmVyXCIgb25jaGFuZ2U9XCJjcmVhdHVyZUZvcm1BYyA9IGV2ZW50LnRhcmdldC52YWx1ZVwiPlxuICAgICAgICAgICAgPC9sYWJlbD5cbiAgICAgICAgICAgIDxsYWJlbD5IaXQgUG9pbnRzXG4gICAgICAgICAgICAgICAgPGlucHV0IGNsYXNzPVwiaW5wdXQtLXNtXCIgdHlwZT1cIm51bWJlclwiIG9uY2hhbmdlPVwiY3JlYXR1cmVGb3JtSGl0UG9pbnRzID0gZXZlbnQudGFyZ2V0LnZhbHVlXCI+XG4gICAgICAgICAgICA8L2xhYmVsPlxuICAgICAgICAgICAgPGxhYmVsPkhpdCBEaWNlXG4gICAgICAgICAgICAgICAgPGlucHV0IGNsYXNzPVwiaW5wdXQtLXNtXCIgb25jaGFuZ2U9XCJjcmVhdHVyZUZvcm1IaXREaWNlID0gZXZlbnQudGFyZ2V0LnZhbHVlXCI+XG4gICAgICAgICAgICA8L2xhYmVsPlxuICAgICAgICA8L2Rpdj5cbiAgICAgICAgPGRpdiBjbGFzcz1cImNyZWF0dXJlcy13aW5kb3ctZm9ybV9fYm9keS0tYm94XCI+XG4gICAgICAgICAgICA8ZGl2PlxuICAgICAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJmb3JtX19pbnB1dC1hZGQgZm9ybV9faW5wdXQtYWRkLS1zcGVlZFwiPlxuICAgICAgICAgICAgICAgICAgICA8bGFiZWw+TW92ZW1lbnRcbiAgICAgICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJmbGV4LWNvbnRhaW5lclwiPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxwPldhbGs8L3A+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPGlucHV0IHBsYWNlaG9sZGVyPVwiMzBcIiB0eXBlPVwibnVtYmVyXCIgY2xhc3M9XCJpbnB1dC0tc20gY3JlYXR1cmUtaW5wdXRzX19zcGVlZC12YWx1ZVwiIG9uY2hhbmdlPVwiY3JlYXR1cmVGb3JtV2FsayA9IGV2ZW50LnRhcmdldC52YWx1ZVwiPlxuICAgICAgICAgICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzPVwiZmxleC1jb250YWluZXJcIj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8cD5Td2ltPC9wPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxpbnB1dCBwbGFjZWhvbGRlcj1cIjMwXCIgdHlwZT1cIm51bWJlclwiIGNsYXNzPVwiaW5wdXQtLXNtIGNyZWF0dXJlLWlucHV0c19fc3BlZWQtdmFsdWVcIiBvbmNoYW5nZT1cImNyZWF0dXJlRm9ybVN3aW0gPSBldmVudC50YXJnZXQudmFsdWVcIj5cbiAgICAgICAgICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzcz1cImZsZXgtY29udGFpbmVyXCI+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPHA+QnVycm93PC9wPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxpbnB1dCBwbGFjZWhvbGRlcj1cIjMwXCIgdHlwZT1cIm51bWJlclwiIGNsYXNzPVwiaW5wdXQtLXNtIGNyZWF0dXJlLWlucHV0c19fc3BlZWQtdmFsdWVcIiBvbmNoYW5nZT1cImNyZWF0dXJlRm9ybUJ1cnJvdyA9IGV2ZW50LnRhcmdldC52YWx1ZVwiPlxuICAgICAgICAgICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzPVwiZmxleC1jb250YWluZXJcIj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8cD5GbHk8L3A+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPGlucHV0IHBsYWNlaG9sZGVyPVwiMzBcIiB0eXBlPVwibnVtYmVyXCIgY2xhc3M9XCJpbnB1dC0tc20gY3JlYXR1cmUtaW5wdXRzX19zcGVlZC12YWx1ZVwiIG9uY2hhbmdlPVwiY3JlYXR1cmVGb3JtRmx5ID0gZXZlbnQudGFyZ2V0LnZhbHVlXCI+XG4gICAgICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJmbGV4LWNvbnRhaW5lclwiPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxwPkNsaW1iPC9wPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxpbnB1dCBwbGFjZWhvbGRlcj1cIjMwXCIgdHlwZT1cIm51bWJlclwiIGNsYXNzPVwiaW5wdXQtLXNtIGNyZWF0dXJlLWlucHV0c19fc3BlZWQtdmFsdWVcIiBvbmNoYW5nZT1cImNyZWF0dXJlRm9ybUNsaW1iID0gZXZlbnQudGFyZ2V0LnZhbHVlXCI+XG4gICAgICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgICAgICAgPC9sYWJlbD5cbiAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICA8L2Rpdj5cbiAgICAgICAgPGRpdiBjbGFzcz1cImNyZWF0dXJlcy13aW5kb3ctZm9ybV9fYm9keS0tYm94XCI+XG4gICAgICAgICAgICA8bGFiZWw+U3RyXG4gICAgICAgICAgICAgICAgPGlucHV0IGNsYXNzPVwiaW5wdXQtLXNtXCIgdHlwZT1cIm51bWJlclwiIG9uY2hhbmdlPVwiY3JlYXR1cmVGb3JtU3RyID0gZXZlbnQudGFyZ2V0LnZhbHVlXCIgcGxhY2Vob2xkZXI9XCIxMFwiPlxuICAgICAgICAgICAgPC9sYWJlbD5cbiAgICAgICAgICAgIDxsYWJlbD5EZXhcbiAgICAgICAgICAgICAgICA8aW5wdXQgY2xhc3M9XCJpbnB1dC0tc21cIiB0eXBlPVwibnVtYmVyXCIgb25jaGFuZ2U9XCJjcmVhdHVyZUZvcm1EZXggPSBldmVudC50YXJnZXQudmFsdWVcIiBwbGFjZWhvbGRlcj1cIjEwXCI+XG4gICAgICAgICAgICA8L2xhYmVsPlxuICAgICAgICAgICAgPGxhYmVsPkNvblxuICAgICAgICAgICAgICAgIDxpbnB1dCBjbGFzcz1cImlucHV0LS1zbVwiIHR5cGU9XCJudW1iZXJcIiBvbmNoYW5nZT1cImNyZWF0dXJlRm9ybUNvbiA9IGV2ZW50LnRhcmdldC52YWx1ZVwiIHBsYWNlaG9sZGVyPVwiMTBcIj5cbiAgICAgICAgICAgIDwvbGFiZWw+XG4gICAgICAgICAgICA8bGFiZWw+SW50XG4gICAgICAgICAgICAgICAgPGlucHV0IGNsYXNzPVwiaW5wdXQtLXNtXCIgdHlwZT1cIm51bWJlclwiIG9uY2hhbmdlPVwiY3JlYXR1cmVGb3JtSW50ID0gZXZlbnQudGFyZ2V0LnZhbHVlXCIgcGxhY2Vob2xkZXI9XCIxMFwiPlxuICAgICAgICAgICAgPC9sYWJlbD5cbiAgICAgICAgICAgIDxsYWJlbD5XaXNcbiAgICAgICAgICAgICAgICA8aW5wdXQgY2xhc3M9XCJpbnB1dC0tc21cIiB0eXBlPVwibnVtYmVyXCIgb25jaGFuZ2U9XCJjcmVhdHVyZUZvcm1XaXMgPSBldmVudC50YXJnZXQudmFsdWVcIiBwbGFjZWhvbGRlcj1cIjEwXCI+XG4gICAgICAgICAgICA8L2xhYmVsPlxuICAgICAgICAgICAgPGxhYmVsPkNoYXJcbiAgICAgICAgICAgICAgICA8aW5wdXQgY2xhc3M9XCJpbnB1dC0tc21cIiB0eXBlPVwibnVtYmVyXCIgb25jaGFuZ2U9XCJjcmVhdHVyZUZvcm1DaGFyID0gZXZlbnQudGFyZ2V0LnZhbHVlXCIgcGxhY2Vob2xkZXI9XCIxMFwiPlxuICAgICAgICAgICAgPC9sYWJlbD5cbiAgICAgICAgPC9kaXY+XG4gICAgICAgIDxkaXYgY2xhc3M9XCJjcmVhdHVyZXMtd2luZG93LWZvcm1fX2JvZHktLWJveFwiPlxuICAgICAgICAgICAgPGRpdj5cbiAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzPVwiZm9ybV9faW5wdXQtYWRkIGZvcm1fX2lucHV0LWFkZC0tcHJvZmljaWVuY3lcIj5cbiAgICAgICAgICAgICAgICAgICAgPGxhYmVsPlByb2ZpY2llbmNpZXNcbiAgICAgICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJmbGV4LWNvbnRhaW5lclwiPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxpbnB1dCBwbGFjZWhvbGRlcj1cIlBlcmNlcHRpb25cIiBjbGFzcz1cImlucHV0LS1tZCBjcmVhdHVyZS1pbnB1dHNfX3Byb2ZpY2llbmN5LW5hbWVcIj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8aW5wdXQgcGxhY2Vob2xkZXI9XCI2XCIgdHlwZT1cIm51bWJlclwiIGNsYXNzPVwiaW5wdXQtLXNtIGNyZWF0dXJlLWlucHV0c19fcHJvZmljaWVuY3ktdmFsdWVcIj5cbiAgICAgICAgICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICAgICAgICA8L2xhYmVsPlxuICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICAgIDxidXR0b24gdHlwZT1cImJ1dHRvblwiIG9uY2xpY2s9XCJhZGRJbnB1dHMoJ3Byb2ZpY2llbmN5JylcIiBjbGFzcz1cImNyZWF0dXJlLWZvcm1fX2J0bi0taW5wdXRcIj5BZGQgcHJvZmljaWVuY3k8L2J1dHRvbj5cbiAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICA8L2Rpdj5cbiAgICAgICAgPGRpdiBjbGFzcz1cImNyZWF0dXJlcy13aW5kb3ctZm9ybV9fYm9keS0tYm94XCI+XG4gICAgICAgICAgICA8bGFiZWw+VnVsbmVyYWJpbGl0aWVzXG4gICAgICAgICAgICAgICAgPHRleHRhcmVhIHJvd3M9XCIzXCIgY29scz1cIjQwXCIgcGxhY2Vob2xkZXI9XCJmaXJlLCB0aHVuZGVyXCIgb25jaGFuZ2U9XCJjcmVhdHVyZUZvcm1WdWwgPSBldmVudC50YXJnZXQudmFsdWVcIj48L3RleHRhcmVhPlxuICAgICAgICAgICAgPC9sYWJlbD5cbiAgICAgICAgPC9kaXY+XG4gICAgICAgIDxkaXYgY2xhc3M9XCJjcmVhdHVyZXMtd2luZG93LWZvcm1fX2JvZHktLWJveFwiPlxuICAgICAgICAgICAgPGxhYmVsPlJlc2lzdGFuY2VzXG4gICAgICAgICAgICAgICAgPHRleHRhcmVhIHJvd3M9XCIzXCIgY29scz1cIjQwXCIgcGxhY2Vob2xkZXI9XCJwb2lzb24sIGJsdWRnZW9uaW5nXCIgb25jaGFuZ2U9XCJjcmVhdHVyZUZvcm1SZXMgPSBldmVudC50YXJnZXQudmFsdWVcIj48L3RleHRhcmVhPlxuICAgICAgICAgICAgPC9sYWJlbD5cbiAgICAgICAgPC9kaXY+XG4gICAgICAgIDxkaXYgY2xhc3M9XCJjcmVhdHVyZXMtd2luZG93LWZvcm1fX2JvZHktLWJveFwiPlxuICAgICAgICAgICAgPGxhYmVsPkRhbWFnZSBJbW11bml0aWVzXG4gICAgICAgICAgICAgICAgPHRleHRhcmVhIHJvd3M9XCIzXCIgY29scz1cIjQwXCIgcGxhY2Vob2xkZXI9XCJub25tYWdpY2FsIHNsYXNoaW5nXCIgb25jaGFuZ2U9XCJjcmVhdHVyZUZvcm1EbWdJbW11bmUgPSBldmVudC50YXJnZXQudmFsdWVcIj48L3RleHRhcmVhPlxuICAgICAgICAgICAgPC9sYWJlbD5cbiAgICAgICAgPC9kaXY+XG4gICAgICAgIDxkaXYgY2xhc3M9XCJjcmVhdHVyZXMtd2luZG93LWZvcm1fX2JvZHktLWJveFwiPlxuICAgICAgICAgICAgPGxhYmVsPkNvbmRpdGlvbiBJbW11bml0aWVzXG4gICAgICAgICAgICAgICAgPHRleHRhcmVhIHJvd3M9XCIzXCIgY29scz1cIjQwXCIgcGxhY2Vob2xkZXI9XCJwcm9uZSwgcmVzdHJhaW5lZFwiIG9uY2hhbmdlPVwiY3JlYXR1cmVGb3JtQ29uSW1tdW5lID0gZXZlbnQudGFyZ2V0LnZhbHVlXCI+PC90ZXh0YXJlYT5cbiAgICAgICAgICAgIDwvbGFiZWw+XG4gICAgICAgIDwvZGl2PlxuICAgICAgICA8ZGl2IGNsYXNzPVwiY3JlYXR1cmVzLXdpbmRvdy1mb3JtX19ib2R5LS1ib3hcIj5cbiAgICAgICAgICAgIDxkaXY+XG4gICAgICAgICAgICAgICAgPGRpdiBjbGFzcz1cImZvcm1fX2lucHV0LWFkZCBmb3JtX19pbnB1dC1hZGQtLXNlbnNlXCI+XG4gICAgICAgICAgICAgICAgICAgIDxsYWJlbD5TZW5zZXNcbiAgICAgICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJmbGV4LWNvbnRhaW5lclwiPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxpbnB1dCBwbGFjZWhvbGRlcj1cIkRhcmt2aXNpb25cIiBjbGFzcz1cImlucHV0LS1tZCBjcmVhdHVyZS1pbnB1dHNfX3NlbnNlLW5hbWVcIj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8aW5wdXQgcGxhY2Vob2xkZXI9XCI2MFwiIHR5cGU9XCJudW1iZXJcIiBjbGFzcz1cImlucHV0LS1zbSBjcmVhdHVyZS1pbnB1dHNfX3NlbnNlLXZhbHVlXCI+XG4gICAgICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgICAgICAgPC9sYWJlbD5cbiAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgICA8YnV0dG9uIHR5cGU9XCJidXR0b25cIiBvbmNsaWNrPVwiYWRkSW5wdXRzKCdzZW5zZScpXCIgY2xhc3M9XCJjcmVhdHVyZS1mb3JtX19idG4tLWlucHV0XCI+QWRkIHNlbnNlPC9idXR0b24+XG4gICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgPC9kaXY+XG4gICAgICAgIDxkaXYgY2xhc3M9XCJjcmVhdHVyZXMtd2luZG93LWZvcm1fX2JvZHktLWJveFwiPlxuICAgICAgICAgICAgPGxhYmVsPkxhbmd1YWdlc1xuICAgICAgICAgICAgICAgIDx0ZXh0YXJlYSByb3dzPVwiM1wiIGNvbHM9XCI0MFwiIG9uY2hhbmdlPVwiY3JlYXR1cmVGb3JtTGFuZ3VhZ2VzID0gZXZlbnQudGFyZ2V0LnZhbHVlXCI+PC90ZXh0YXJlYT5cbiAgICAgICAgICAgIDwvbGFiZWw+XG4gICAgICAgIDwvZGl2PlxuICAgICAgICA8ZGl2IGNsYXNzPVwiY3JlYXR1cmVzLXdpbmRvdy1mb3JtX19ib2R5LS1ib3hcIj5cbiAgICAgICAgICAgIDxsYWJlbD5DUlxuICAgICAgICAgICAgICAgIDxpbnB1dCB0eXBlPVwibnVtYmVyXCIgY2xhc3M9XCJpbnB1dC0tc21cIiBvbmNoYW5nZT1cImNyZWF0dXJlRm9ybUNyID0gZXZlbnQudGFyZ2V0LnZhbHVlXCI+XG4gICAgICAgICAgICA8L2xhYmVsPlxuICAgICAgICAgICAgPGxhYmVsPlhQXG4gICAgICAgICAgICAgICAgPGlucHV0IHR5cGU9XCJudW1iZXJcIiBjbGFzcz1cImlucHV0LS1zbVwiIG9uY2hhbmdlPVwiY3JlYXR1cmVGb3JtWHAgPSBldmVudC50YXJnZXQudmFsdWVcIj5cbiAgICAgICAgICAgIDwvbGFiZWw+XG4gICAgICAgIDwvZGl2PlxuICAgICAgICA8ZGl2IGNsYXNzPVwiY3JlYXR1cmVzLXdpbmRvdy1mb3JtX19ib2R5LS1ib3hcIj5cbiAgICAgICAgICAgIDxkaXY+XG4gICAgICAgICAgICAgICAgPGRpdiBjbGFzcz1cImZvcm1fX2lucHV0LWFkZCBmb3JtX19pbnB1dC1hZGQtLWFiaWxpdHlcIj5cbiAgICAgICAgICAgICAgICAgICAgPGxhYmVsPlNwZWNpYWwgQWJpbGl0aWVzXG4gICAgICAgICAgICAgICAgICAgICAgICA8aW5wdXQgcGxhY2Vob2xkZXI9XCJBYmlsaXR5IG5hbWVcIiBjbGFzcz1cImlucHV0LS1tZCBjcmVhdHVyZS1pbnB1dHNfX2FiaWxpdHktbmFtZVwiPlxuICAgICAgICAgICAgICAgICAgICAgICAgPHRleHRhcmVhIHJvd3M9XCIzXCIgY29scz1cIjQwXCIgcGxhY2Vob2xkZXI9XCJkZXNjcmlwdGlvblwiIGNsYXNzPVwiY3JlYXR1cmUtaW5wdXRzX19hYmlsaXR5LWRlc2NcIj48L3RleHRhcmVhPlxuICAgICAgICAgICAgICAgICAgICA8L2xhYmVsPlxuICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICAgIDxidXR0b24gdHlwZT1cImJ1dHRvblwiIG9uY2xpY2s9XCJhZGREZXNjSW5wdXRzKCdhYmlsaXR5JylcIiBjbGFzcz1cImNyZWF0dXJlLWZvcm1fX2J0bi0taW5wdXRcIj5BZGQgYWJpbGl0eTwvYnV0dG9uPlxuICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgIDwvZGl2PlxuICAgICAgICA8ZGl2IGNsYXNzPVwiY3JlYXR1cmVzLXdpbmRvdy1mb3JtX19ib2R5LS1ib3hcIj5cbiAgICAgICAgICAgIDxkaXY+XG4gICAgICAgICAgICAgICAgPGRpdiBjbGFzcz1cImZvcm1fX2lucHV0LWFkZCBmb3JtX19pbnB1dC1hZGQtLWFjdGlvblwiPlxuICAgICAgICAgICAgICAgICAgICA8bGFiZWw+QWN0aW9uc1xuICAgICAgICAgICAgICAgICAgICAgICAgPGlucHV0IHBsYWNlaG9sZGVyPVwiQWN0aW9uIG5hbWVcIiBjbGFzcz1cImlucHV0LS1tZCBjcmVhdHVyZS1pbnB1dHNfX2FjdGlvbi1uYW1lXCI+XG4gICAgICAgICAgICAgICAgICAgICAgICA8dGV4dGFyZWEgcm93cz1cIjNcIiBjb2xzPVwiNDBcIiBwbGFjZWhvbGRlcj1cImRlc2NyaXB0aW9uXCIgY2xhc3M9XCJjcmVhdHVyZS1pbnB1dHNfX2FjdGlvbi1kZXNjXCI+PC90ZXh0YXJlYT5cbiAgICAgICAgICAgICAgICAgICAgPC9sYWJlbD5cbiAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgICA8YnV0dG9uIHR5cGU9XCJidXR0b25cIiBvbmNsaWNrPVwiYWRkRGVzY0lucHV0cygnYWN0aW9uJylcIiBjbGFzcz1cImNyZWF0dXJlLWZvcm1fX2J0bi0taW5wdXRcIj5BZGQgYWN0aW9uPC9idXR0b24+XG4gICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgPC9kaXY+XG4gICAgICAgIDxkaXYgY2xhc3M9XCJjcmVhdHVyZXMtd2luZG93LWZvcm1fX2JvZHktLWJveFwiPlxuICAgICAgICAgICAgPGRpdj5cbiAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzPVwiZm9ybV9faW5wdXQtYWRkIGZvcm1fX2lucHV0LWFkZC0tbGVnLWFjdGlvblwiPlxuICAgICAgICAgICAgICAgICAgICA8bGFiZWw+TGVnZW5kYXJ5IEFjdGlvbnNcbiAgICAgICAgICAgICAgICAgICAgICAgIDxpbnB1dCBwbGFjZWhvbGRlcj1cIkFjdGlvbiBuYW1lXCIgY2xhc3M9XCJpbnB1dC0tbWQgY3JlYXR1cmUtaW5wdXRzX19sZWctYWN0aW9uLW5hbWVcIj5cbiAgICAgICAgICAgICAgICAgICAgICAgIDx0ZXh0YXJlYSByb3dzPVwiM1wiIGNvbHM9XCI0MFwiIHBsYWNlaG9sZGVyPVwiZGVzY3JpcHRpb25cIiBjbGFzcz1cImNyZWF0dXJlLWlucHV0c19fbGVnLWFjdGlvbi1kZXNjXCI+PC90ZXh0YXJlYT5cbiAgICAgICAgICAgICAgICAgICAgPC9sYWJlbD5cbiAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgICA8YnV0dG9uIHR5cGU9XCJidXR0b25cIiBvbmNsaWNrPVwiYWRkRGVzY0lucHV0cygnbGVnLWFjdGlvbicpXCIgY2xhc3M9XCJjcmVhdHVyZS1mb3JtX19idG4tLWlucHV0XCI+QWRkIExlZ2VuZGFyeSBhY3Rpb248L2J1dHRvbj5cbiAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICA8L2Rpdj5cbiAgICAgICAgPGJyLz5cbiAgICAgICAgPGJ1dHRvbiB0eXBlPVwic3VibWl0XCI+QWRkIENyZWF0dXJlPC9idXR0b24+XG4gICAgPC9mb3JtPlxuPC9kaXY+XG5gO1xuXG5mdW5jdGlvbiB0b2dnbGVOZXdDcmVhdHVyZUZvcm0oKSB7XG4gICAgY3JlYXR1cmVGb3JtT3BlbiA9ICFjcmVhdHVyZUZvcm1PcGVuO1xuICAgIGlmIChjcmVhdHVyZUZvcm1PcGVuKSB7XG4gICAgICAgIGNvbnN0IHdpbmRvdyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJ2JvZHknKS5hcHBlbmRDaGlsZChkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKSk7XG4gICAgICAgIHdpbmRvdy5jbGFzc0xpc3QuYWRkKCdjcmVhdHVyZXMtd2luZG93LWZvcm0nKTtcbiAgICAgICAgd2luZG93Lmluc2VydEFkamFjZW50SFRNTCgnYmVmb3JlZW5kJywgY3JlYXR1cmVGb3JtQm9keSk7XG4gICAgICAgIFxuICAgICAgICBkaXNhYmxlSG90a2V5cygpO1xuICAgICAgICBkcmFnRWxlbWVudCh3aW5kb3csICdjcmVhdHVyZXMtd2luZG93LWZvcm0nKTtcbiAgICB9IGVsc2Uge1xuICAgICAgICBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcuY3JlYXR1cmVzLXdpbmRvdy1mb3JtJykucmVtb3ZlKCk7XG4gICAgfVxufVxuXG4vLyBBZGRzIHR3byBpbnB1dHMgd2hlbiB1c2VyIGNsaWNrcyBhIGJ1dHRvblxuZnVuY3Rpb24gYWRkSW5wdXRzKF9uYW1lOiBzdHJpbmcpIHtcbiAgICBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKGAuZm9ybV9faW5wdXQtYWRkLS0ke19uYW1lfWApLmluc2VydEFkamFjZW50SFRNTCgnYmVmb3JlZW5kJywgYFxuICAgICAgICA8ZGl2IGNsYXNzPVwiZmxleC1jb250YWluZXJcIj5cbiAgICAgICAgICAgIDxpbnB1dCBwbGFjZWhvbGRlcj1cIm5hbWVcIiBjbGFzcz1cImlucHV0LS1tZCBjcmVhdHVyZS1pbnB1dHNfXyR7X25hbWV9LW5hbWVcIj5cbiAgICAgICAgICAgIDxpbnB1dCBwbGFjZWhvbGRlcj1cInZhbHVlXCIgdHlwZT1cIm51bWJlclwiIGNsYXNzPVwiaW5wdXQtLXNtIGNyZWF0dXJlLWlucHV0c19fJHtfbmFtZX0tdmFsdWVcIj5cbiAgICAgICAgICAgIDxidXR0b24gdHlwZT1cImJ1dHRvblwiIG9uY2xpY2s9XCJ0aGlzLnBhcmVudE5vZGUucmVtb3ZlKClcIiBjbGFzcz1cImZvcm1fX2J0bi0tcmVtb3ZlXCI+WDwvYnV0dG9uPlxuICAgICAgICA8L2Rpdj5cbiAgICBgKTtcbn1cblxuLy8gQWRkcyBhbiBpbnB1dCBhbmQgdGV4dGFyZWEgd2hlbiB1c2VyIGNsaWNrcyBhIGJ1dHRvblxuZnVuY3Rpb24gYWRkRGVzY0lucHV0cyhfbmFtZTogc3RyaW5nKSB7XG4gICAgZG9jdW1lbnQucXVlcnlTZWxlY3RvcihgLmZvcm1fX2lucHV0LWFkZC0tJHtfbmFtZX1gKS5pbnNlcnRBZGphY2VudEhUTUwoJ2JlZm9yZWVuZCcsIGBcbiAgICAgICAgPGxhYmVsPlxuICAgICAgICAgICAgPGJyLz5cbiAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJmbGV4LWNvbnRhaW5lclwiPlxuICAgICAgICAgICAgICAgIDxpbnB1dCBwbGFjZWhvbGRlcj1cIkFiaWxpdHkgbmFtZVwiIGNsYXNzPVwiaW5wdXQtLW1kIGNyZWF0dXJlLWlucHV0c19fJHtfbmFtZX0tbmFtZVwiPlxuICAgICAgICAgICAgICAgIDxidXR0b24gdHlwZT1cImJ1dHRvblwiIG9uY2xpY2s9XCJ0aGlzLnBhcmVudE5vZGUucGFyZW50Tm9kZS5yZW1vdmUoKVwiIGNsYXNzPVwiZm9ybV9fYnRuLS1yZW1vdmVcIj5YPC9idXR0b24+XG4gICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgIDx0ZXh0YXJlYSByb3dzPVwiM1wiIGNvbHM9XCI0MFwiIHBsYWNlaG9sZGVyPVwiZGVzY3JpcHRpb25cIiBjbGFzcz1cImNyZWF0dXJlLWlucHV0c19fJHtfbmFtZX0tZGVzY1wiPjwvdGV4dGFyZWE+XG4gICAgICAgIDwvbGFiZWw+XG4gICAgYCk7XG59XG5cbmFzeW5jIGZ1bmN0aW9uIHN1Ym1pdENyZWF0dXJlRm9ybShlOiBFdmVudCkge1xuICAgIGUucHJldmVudERlZmF1bHQoKTtcbiAgICBsZXQgcHJvZmljaWVuY2llcyA9IFtdO1xuICAgIGxldCBzZW5zZXMgPSBbXTtcbiAgICBsZXQgYWJpbGl0aWVzID0gW107XG4gICAgbGV0IGFjdGlvbnMgPSBbXTtcbiAgICBsZXQgbGVnQWN0aW9ucyA9IFtdO1xuXG4gICAgbGV0IHByb2ZpY2llbmN5TmFtZTogYW55ID0gZG9jdW1lbnQuZ2V0RWxlbWVudHNCeUNsYXNzTmFtZSgnY3JlYXR1cmUtaW5wdXRzX19wcm9maWNpZW5jeS1uYW1lJyk7XG4gICAgbGV0IHByb2ZpY2llbmN5VmFsdWU6IGFueSA9IGRvY3VtZW50LmdldEVsZW1lbnRzQnlDbGFzc05hbWUoJ2NyZWF0dXJlLWlucHV0c19fcHJvZmljaWVuY3ktdmFsdWUnKTtcbiAgICBsZXQgc2Vuc2VOYW1lOiBhbnkgPSBkb2N1bWVudC5nZXRFbGVtZW50c0J5Q2xhc3NOYW1lKCdjcmVhdHVyZS1pbnB1dHNfX3NlbnNlLW5hbWUnKTtcbiAgICBsZXQgc2Vuc2VWYWx1ZTogYW55ID0gZG9jdW1lbnQuZ2V0RWxlbWVudHNCeUNsYXNzTmFtZSgnY3JlYXR1cmUtaW5wdXRzX19zZW5zZS12YWx1ZScpO1xuICAgIGxldCBhYmlsaXR5TmFtZTogYW55ID0gZG9jdW1lbnQuZ2V0RWxlbWVudHNCeUNsYXNzTmFtZSgnY3JlYXR1cmUtaW5wdXRzX19hYmlsaXR5LW5hbWUnKTtcbiAgICBsZXQgYWJpbGl0eURlc2M6IGFueSA9IGRvY3VtZW50LmdldEVsZW1lbnRzQnlDbGFzc05hbWUoJ2NyZWF0dXJlLWlucHV0c19fYWJpbGl0eS1kZXNjJyk7XG4gICAgbGV0IGFjdGlvbk5hbWU6IGFueSA9IGRvY3VtZW50LmdldEVsZW1lbnRzQnlDbGFzc05hbWUoJ2NyZWF0dXJlLWlucHV0c19fYWN0aW9uLW5hbWUnKTtcbiAgICBsZXQgYWN0aW9uRGVzYzogYW55ID0gZG9jdW1lbnQuZ2V0RWxlbWVudHNCeUNsYXNzTmFtZSgnY3JlYXR1cmUtaW5wdXRzX19hY3Rpb24tZGVzYycpO1xuICAgIGxldCBsZWdBY3Rpb25OYW1lOiBhbnkgPSBkb2N1bWVudC5nZXRFbGVtZW50c0J5Q2xhc3NOYW1lKCdjcmVhdHVyZS1pbnB1dHNfX2xlZy1hY3Rpb24tbmFtZScpO1xuICAgIGxldCBsZWdBY3Rpb25EZXNjOiBhbnkgPSBkb2N1bWVudC5nZXRFbGVtZW50c0J5Q2xhc3NOYW1lKCdjcmVhdHVyZS1pbnB1dHNfX2xlZy1hY3Rpb24tZGVzYycpO1xuXG4gICAgZm9yIChsZXQgaSA9IDA7IGkgPCBwcm9maWNpZW5jeU5hbWUubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgaWYgKHByb2ZpY2llbmN5TmFtZVtpXS52YWx1ZSAhPT0gJycgfHwgcHJvZmljaWVuY3lWYWx1ZVtpXS52YWx1ZSAhPT0gJycpIHtcbiAgICAgICAgICAgIHByb2ZpY2llbmNpZXMucHVzaCh7bmFtZTogcHJvZmljaWVuY3lOYW1lW2ldLnZhbHVlLCB2YWx1ZTogcHJvZmljaWVuY3lWYWx1ZVtpXS52YWx1ZX0pO1xuICAgICAgICB9XG4gICAgfVxuICAgIGZvciAobGV0IGkgPSAwOyBpIDwgc2Vuc2VOYW1lLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgIGlmIChzZW5zZU5hbWVbaV0udmFsdWUgIT09ICcnIHx8IHNlbnNlVmFsdWVbaV0udmFsdWUgIT09ICcnKSB7XG4gICAgICAgICAgICBzZW5zZXMucHVzaCh7bmFtZTogc2Vuc2VOYW1lW2ldLnZhbHVlLCB2YWx1ZTogc2Vuc2VWYWx1ZVtpXS52YWx1ZX0pO1xuICAgICAgICB9XG4gICAgfVxuICAgIGZvciAobGV0IGkgPSAwOyBpIDwgYWJpbGl0eU5hbWUubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgaWYgKGFiaWxpdHlOYW1lW2ldLnZhbHVlICE9PSAnJyB8fCBhYmlsaXR5RGVzY1tpXS52YWx1ZSAhPT0gJycpIHtcbiAgICAgICAgICAgIGFiaWxpdGllcy5wdXNoKHtuYW1lOiBhYmlsaXR5TmFtZVtpXS52YWx1ZSwgZGVzYzogYWJpbGl0eURlc2NbaV0udmFsdWV9KTtcbiAgICAgICAgfVxuICAgIH1cbiAgICBmb3IgKGxldCBpID0gMDsgaSA8IGFjdGlvbk5hbWUubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgaWYgKGFjdGlvbk5hbWVbaV0udmFsdWUgIT09ICcnIHx8IGFjdGlvbkRlc2NbaV0udmFsdWUgIT09ICcnKSB7XG4gICAgICAgICAgICBhY3Rpb25zLnB1c2goe25hbWU6IGFjdGlvbk5hbWVbaV0udmFsdWUsIGRlc2M6IGFjdGlvbkRlc2NbaV0udmFsdWV9KTtcbiAgICAgICAgfVxuICAgIH1cbiAgICBmb3IgKGxldCBpID0gMDsgaSA8IGxlZ0FjdGlvbk5hbWUubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgaWYgKGxlZ0FjdGlvbk5hbWVbaV0udmFsdWUgIT09ICcnIHx8IGxlZ0FjdGlvbkRlc2NbaV0udmFsdWUgIT09ICcnKSB7XG4gICAgICAgICAgICBsZWdBY3Rpb25zLnB1c2goe25hbWU6IGxlZ0FjdGlvbk5hbWVbaV0udmFsdWUsIGRlc2M6IGxlZ0FjdGlvbkRlc2NbaV0udmFsdWV9KTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIHRvZ2dsZU5ld0NyZWF0dXJlRm9ybSgpO1xuICAgIHRvZ2dsZU5ld0NyZWF0dXJlRm9ybSgpO1xuICAgIGlmIChjcmVhdHVyZXNPcGVuKSB7XG4gICAgICAgIHRvZ2dsZUNyZWF0dXJlc1dpbmRvdygpO1xuICAgICAgICBzZXRUaW1lb3V0KGZ1bmN0aW9uKCkgeyB0b2dnbGVDcmVhdHVyZXNXaW5kb3coKTsgfSwgMTAwKTtcbiAgICB9XG5cbiAgICBjb25zdCBuZXdDcmVhdHVyZSA9IG5ldyBDcmVhdHVyZUZvcm1EYXRhKGluZGV4Q29udmVydGVyKGNyZWF0dXJlRm9ybU5hbWUpLCAnaHR0cHM6Ly93d3cuZGFuZHdpa2kuY29tL3cvaW1hZ2VzLzMvMzcvQnJlYWRTcGF3bi5qcGcnLCBjcmVhdHVyZUZvcm1OYW1lLCBjcmVhdHVyZUZvcm1TaXplLCBjcmVhdHVyZUZvcm1UeXBlLCBjcmVhdHVyZUZvcm1BbGlnbm1lbnQsIGNyZWF0dXJlRm9ybUFjLCBjcmVhdHVyZUZvcm1IaXRQb2ludHMsIGNyZWF0dXJlRm9ybUhpdERpY2UsIGNyZWF0dXJlRm9ybVN0ciwgY3JlYXR1cmVGb3JtRGV4LCBjcmVhdHVyZUZvcm1Db24sIGNyZWF0dXJlRm9ybUludCwgY3JlYXR1cmVGb3JtV2lzLCBjcmVhdHVyZUZvcm1DaGFyLCBjcmVhdHVyZUZvcm1WdWwsIGNyZWF0dXJlRm9ybVJlcywgY3JlYXR1cmVGb3JtRG1nSW1tdW5lLCBjcmVhdHVyZUZvcm1Db25JbW11bmUsIGNyZWF0dXJlRm9ybUxhbmd1YWdlcywgY3JlYXR1cmVGb3JtQ3IsIGNyZWF0dXJlRm9ybVhwLCBjcmVhdHVyZUZvcm1XYWxrLCBjcmVhdHVyZUZvcm1Td2ltLCBjcmVhdHVyZUZvcm1CdXJyb3csIGNyZWF0dXJlRm9ybUZseSwgY3JlYXR1cmVGb3JtQ2xpbWIsIHByb2ZpY2llbmNpZXMsIHNlbnNlcywgYWJpbGl0aWVzLCBhY3Rpb25zLCBsZWdBY3Rpb25zKTtcbiAgICBhZGRDcmVhdHVyZShuZXdDcmVhdHVyZSk7XG59XG5cbi8vIEhvbGRzIGNyZWF0dXJlIGZvcm0gZGF0YVxuY2xhc3MgQ3JlYXR1cmVGb3JtRGF0YSB7XG4gICAgaW5kZXg6IHN0cmluZztcbiAgICBpbWFnZTogc3RyaW5nO1xuICAgIG5hbWU6IHN0cmluZztcbiAgICBzaXplOiBzdHJpbmc7XG4gICAgdHlwZTogc3RyaW5nO1xuICAgIGFsaWdubWVudDogc3RyaW5nO1xuICAgIGFjOiBudW1iZXI7XG4gICAgaHA6IG51bWJlcjtcbiAgICBoaXREaWNlOiBzdHJpbmc7XG4gICAgc3RyOiBudW1iZXI7XG4gICAgZGV4OiBudW1iZXI7XG4gICAgY29uOiBudW1iZXI7XG4gICAgaW50OiBudW1iZXI7XG4gICAgd2lzOiBudW1iZXI7XG4gICAgY2hhcjogbnVtYmVyO1xuICAgIHZ1bDogc3RyaW5nO1xuICAgIHJlczogc3RyaW5nO1xuICAgIGRtZ0ltbXVuZTogc3RyaW5nO1xuICAgIGNvbkltbXVuZTogc3RyaW5nO1xuICAgIGxhbmd1YWdlczogc3RyaW5nO1xuICAgIGNyOiBudW1iZXI7XG4gICAgeHA6IG51bWJlcjtcbiAgICBzcGVlZHM6IGFueTtcbiAgICBwcm9maWNpZW5jaWVzOiBhbnk7XG4gICAgc2Vuc2VzOiBhbnk7XG4gICAgYWJpbGl0aWVzOiBhbnk7XG4gICAgYWN0aW9uczogYW55O1xuICAgIGxlZ0FjdGlvbnM6IGFueTtcbiAgICB3YWxrOiBudW1iZXI7XG4gICAgc3dpbTogbnVtYmVyO1xuICAgIGJ1cnJvdzogbnVtYmVyO1xuICAgIGZseTogbnVtYmVyO1xuICAgIGNsaW1iOiBudW1iZXI7XG5cbiAgICBjb25zdHJ1Y3RvcihpbmRleDogc3RyaW5nLCBpbWFnZTogc3RyaW5nLCBuYW1lOiBzdHJpbmcsIHNpemU6IHN0cmluZywgdHlwZTogc3RyaW5nLCBhbGlnbm1lbnQ6IHN0cmluZywgYWM6IG51bWJlciwgaHA6IG51bWJlciwgaGl0RGljZTogc3RyaW5nLCBzdHI6IG51bWJlciwgZGV4OiBudW1iZXIsIGNvbjogbnVtYmVyLCBpbnQ6IG51bWJlciwgd2lzOiBudW1iZXIsIGNoYXI6IG51bWJlciwgdnVsOiBzdHJpbmcsIHJlczogc3RyaW5nLCBkbWdJbW11bmU6IHN0cmluZywgY29uSW1tdW5lOiBzdHJpbmcsIGxhbmd1YWdlczogc3RyaW5nLCBjcjogbnVtYmVyLCB4cDogbnVtYmVyLCB3YWxrOiBudW1iZXIsIHN3aW06IG51bWJlciwgYnVycm93OiBudW1iZXIsIGZseTogbnVtYmVyLCBjbGltYjogbnVtYmVyLCBwcm9maWNpZW5jaWVzOiBhbnksIHNlbnNlczogYW55LCBhYmlsaXRpZXM6IGFueSwgYWN0aW9uczogYW55LCBsZWdBY3Rpb25zOiBhbnkpIHtcbiAgICAgICAgdGhpcy5pbmRleCA9IGluZGV4O1xuICAgICAgICB0aGlzLmltYWdlID0gaW1hZ2U7ICAgICAgICBcbiAgICAgICAgdGhpcy5uYW1lID0gbmFtZTtcbiAgICAgICAgdGhpcy5zaXplID0gc2l6ZTtcbiAgICAgICAgdGhpcy50eXBlID0gdHlwZTtcbiAgICAgICAgdGhpcy5hbGlnbm1lbnQgPSBhbGlnbm1lbnQ7XG4gICAgICAgIGFjIHx8IGFjID09PSAwID8gdGhpcy5hYyA9IGFjIDogdGhpcy5hYyA9IDA7XG4gICAgICAgIGhwIHx8IGhwID09PSAwID8gdGhpcy5ocCA9IGhwIDogdGhpcy5ocCA9IDA7XG4gICAgICAgIHRoaXMuaGl0RGljZSA9IGhpdERpY2U7XG4gICAgICAgIHN0ciB8fCBzdHIgPT09IDAgPyB0aGlzLnN0ciA9IHN0ciA6IHRoaXMuc3RyID0gMTA7XG4gICAgICAgIGRleCB8fCBkZXggPT09IDAgPyB0aGlzLmRleCA9IGRleCA6IHRoaXMuZGV4ID0gMTA7XG4gICAgICAgIGNvbiB8fCBjb24gPT09IDAgPyB0aGlzLmNvbiA9IGNvbiA6IHRoaXMuY29uID0gMTA7XG4gICAgICAgIGludCB8fCBpbnQgPT09IDAgPyB0aGlzLmludCA9IGludCA6IHRoaXMuaW50ID0gMTA7XG4gICAgICAgIHdpcyB8fCB3aXMgPT09IDAgPyB0aGlzLndpcyA9IHdpcyA6IHRoaXMud2lzID0gMTA7XG4gICAgICAgIGNoYXIgfHwgY2hhciA9PT0gMCA/IHRoaXMuY2hhciA9IGNoYXIgOiB0aGlzLmNoYXIgPSAxMDtcbiAgICAgICAgdGhpcy52dWwgPSB2dWw7XG4gICAgICAgIHRoaXMucmVzID0gcmVzO1xuICAgICAgICB0aGlzLmRtZ0ltbXVuZSA9IGRtZ0ltbXVuZTtcbiAgICAgICAgdGhpcy5jb25JbW11bmUgPSBjb25JbW11bmU7XG4gICAgICAgIHRoaXMubGFuZ3VhZ2VzID0gbGFuZ3VhZ2VzO1xuICAgICAgICB0aGlzLmNyID0gY3I7XG4gICAgICAgIHRoaXMueHAgPSB4cDtcbiAgICAgICAgdGhpcy53YWxrID0gd2FsaztcbiAgICAgICAgdGhpcy5zd2ltID0gc3dpbTtcbiAgICAgICAgdGhpcy5mbHkgPSBmbHk7XG4gICAgICAgIHRoaXMuYnVycm93ID0gYnVycm93O1xuICAgICAgICB0aGlzLmNsaW1iID0gY2xpbWI7XG4gICAgICAgIHRoaXMucHJvZmljaWVuY2llcyA9IHByb2ZpY2llbmNpZXM7XG4gICAgICAgIHRoaXMuc2Vuc2VzID0gc2Vuc2VzO1xuICAgICAgICB0aGlzLmFiaWxpdGllcyA9IGFiaWxpdGllcztcbiAgICAgICAgdGhpcy5hY3Rpb25zID0gYWN0aW9ucztcbiAgICAgICAgdGhpcy5sZWdBY3Rpb25zID0gbGVnQWN0aW9ucztcbiAgICB9XG59IiwgImltcG9ydCB7IGdldEdhbWVzLCBnZXRQcmV2R2FtZSwgYWRkUHJldkdhbWUsIGFkZEdhbWUgfSBmcm9tIFwiLi9yb3V0ZXMvZGFzaGJvYXJkLnJvdXRlLmpzXCI7XG5pbXBvcnQgeyBnZXRDcmVhdHVyZXMgfSBmcm9tIFwiLi9yb3V0ZXMvY3JlYXR1cmVzLnJvdXRlLmpzXCI7XG5pbXBvcnQgeyBnYW1lUGFnZUxvYWRlZCB9IGZyb20gXCIuL2dyaWQuanNcIjtcbmltcG9ydCB7IGlvLCBTb2NrZXQgfSBmcm9tIFwic29ja2V0LmlvLWNsaWVudFwiO1xuaW1wb3J0IHsgbG9nb3V0LCBsb2dpblVzZXIgfSBmcm9tIFwiLi9yb3V0ZXMvdXNlcnMucm91dGUuanNcIjtcblxuY29uc3Qgc29ja2V0OiBTb2NrZXQgPSBpbygpO1xuZXhwb3J0IGxldCBnYW1lc0xpc3Q6IGFueSA9IHsgdmFsdWU6IFtdIH07XG5sZXQgZ2FtZUZvcm1PcGVuOiBib29sZWFuID0gZmFsc2U7XG5sZXQgZ2FtZU5hbWVJbnB1dDogc3RyaW5nO1xuZXhwb3J0IGxldCBjbGllbnQ6IGFueTtcbmV4cG9ydCBsZXQgcm9vbTogYW55O1xubGV0IHByZXZHYW1lOiBhbnk7XG5sZXQgcm9vbUNvZGU6IHN0cmluZztcbmxldCB1c2VybmFtZTogc3RyaW5nLCBwYXNzd29yZDogc3RyaW5nO1xuXG5cbmV4cG9ydCBhc3luYyBmdW5jdGlvbiBzZXR1cEdhbWUoKSB7XG4gICAgZ2V0R2FtZXMoKTtcbiAgICBwcmV2R2FtZSA9IGF3YWl0IGdldFByZXZHYW1lKCk7XG4gICAgcm9vbUNvZGUgPSBwcmV2R2FtZS5jb2RlO1xuICAgICg8SFRNTElucHV0RWxlbWVudD5kb2N1bWVudC5nZXRFbGVtZW50QnlJZCgncm9vbS1jb2RlLWlucHV0JykpLnZhbHVlID0gcHJldkdhbWUuY29kZTtcbiAgICAvLyBHZXQgRCZEIGFwaSBkYXRhXG4gICAgZ2V0Q3JlYXR1cmVzKCk7XG59XG5cbmZ1bmN0aW9uIGpvaW5QbGF5ZXIocm9vbUNvZGU6IHN0cmluZywgZTogRXZlbnQpIHtcbiAgICBlLnByZXZlbnREZWZhdWx0KCk7XG4gICAgcm9vbSA9IHJvb21Db2RlO1xuXG4gICAgc29ja2V0LmVtaXQoJ0pPSU5fUk9PTScsICdwbGF5ZXInLCByb29tQ29kZSwgKHJvb21FeGlzdHMsIG5ld0NsaWVudCkgPT4ge1xuICAgICAgICBpZiAocm9vbUV4aXN0cykge1xuICAgICAgICAgICAgY2xpZW50ID0gbmV3Q2xpZW50O1xuICAgICAgICAgICAgZ2FtZVNjcmVlbigpO1xuICAgICAgICAgICAgYWRkUHJldkdhbWUoe2dhbWU6IHJvb21Db2RlfSk7XG4gICAgICAgICAgICBzb2NrZXQuZW1pdCgnRkVUQ0hfQk9BUkQnKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKCdyb29tIGRvZXNuXFwndCBleGlzdCcpO1xuICAgICAgICB9XG4gICAgfSk7XG59XG5cbi8vIERldGVjdHMgaWYgdXNlciBoYXMgY2xpY2tlZCB0aGUgam9pbiByb29tIGJ1dHRvbiwgdG8gam9pbiBhcyBhIHBsYXllclxuZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ2pvaW4tcGxheWVyLWJ0bicpLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgKGU6IGFueSkgPT4ge1xuICAgIGUucHJldmVudERlZmF1bHQoKTtcbiAgICBqb2luUGxheWVyKHJvb21Db2RlLCBlKTtcbn0pO1xuXG5mdW5jdGlvbiBqb2luRE0ocm9vbUNvZGU6IHN0cmluZykge1xuICAgIHJvb20gPSByb29tQ29kZTtcbiAgICBzb2NrZXQuZW1pdCgnSk9JTl9ST09NJywgJ2RtJywgcm9vbUNvZGUsIChyb29tRXhpc3RzOiBib29sZWFuLCBuZXdDbGllbnQ6IGFueSkgPT4ge1xuICAgICAgICBpZiAocm9vbUV4aXN0cykge1xuICAgICAgICAgICAgY2xpZW50ID0gbmV3Q2xpZW50O1xuICAgICAgICAgICAgZ2FtZVNjcmVlbigpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgY29uc29sZS5sb2coJ2dhbWUgYWxyZWFkeSBzdGFydGVkJyk7XG4gICAgICAgIH1cbiAgICB9KTtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIHNldEdhbWVzTGlzdCgpIHtcbiAgICBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcuZ2FtZXMtbGlzdF9fY29udGVudCcpLnJlbW92ZSgpO1xuXG4gICAgY29uc3QgbGlzdENvbnRlbnQgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcuZ2FtZXMtbGlzdCcpLmFwcGVuZENoaWxkKGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpKTtcbiAgICBsaXN0Q29udGVudC5jbGFzc0xpc3QuYWRkKCdnYW1lcy1saXN0X19jb250ZW50Jyk7XG5cbiAgICBjb25zdCBnYW1lc0xpc3RFbCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5nYW1lcy1saXN0X19jb250ZW50Jyk7XG4gICAgZm9yIChsZXQgZ2FtZSBvZiBnYW1lc0xpc3QudmFsdWUpIHtcbiAgICAgICAgZ2FtZXNMaXN0RWwuaW5zZXJ0QWRqYWNlbnRIVE1MKCdiZWZvcmVlbmQnLCBgXG4gICAgICAgICAgICA8YnV0dG9uIGNsYXNzPVwiZ2FtZS1saXN0X19pdGVtXCIgcm9vbS1jb2RlPScke2dhbWUuY29kZX0nPiR7Z2FtZS5uYW1lfTwvYnV0dG9uPlxuICAgICAgICBgKTtcbiAgICB9XG5cbiAgICBnYW1lc0xpc3RFbC5pbnNlcnRBZGphY2VudEhUTUwoJ2JlZm9yZWVuZCcsIGBcbiAgICAgICAgPGJ1dHRvbiBjbGFzcz1cImdhbWVzLWxpc3RfX2J1dHRvbiBidG4tLWhvdmVyXCIgaWQ9XCJjcmVhdGUtY2FtcGFpZ24tYnRuXCI+Q3JlYXRlIENhbXBhaWduPC9idXR0b24+XG4gICAgYCk7ICAgIFxufVxuXG4vLyBEZXRlY3RzIGlmIHVzZXIgaGFzIGNsaWNrZWQgb24gYSBidXR0b25cbmRvY3VtZW50LmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgKGU6IGFueSkgPT4ge1xuICAgIGUucHJldmVudERlZmF1bHQoKTtcbiAgICBjb25zdCB0YXJnZXQgPSBlLnRhcmdldDtcbiAgICBpZiAodGFyZ2V0Lm1hdGNoZXMoJyNjcmVhdGUtY2FtcGFpZ24tYnRuJykpIHtcbiAgICAgICAgYWRkR2FtZUZvcm0oKTtcbiAgICB9IGVsc2UgaWYgKHRhcmdldC5tYXRjaGVzKCcuZ2FtZS1saXN0X19pdGVtJykpIHtcbiAgICAgICAgam9pbkRNKHRhcmdldC5nZXRBdHRyaWJ1dGUoJ3Jvb20tY29kZScpKTtcbiAgICB9IGVsc2UgaWYgKHRhcmdldC5tYXRjaGVzKCcjYWRkLWdhbWUtYnRuJykpIHtcbiAgICAgICAgYWRkR2FtZSh7bmFtZTogZ2FtZU5hbWVJbnB1dH0pO1xuICAgIH0gZWxzZSBpZiAodGFyZ2V0Lm1hdGNoZXMoJyNsb2dvdXQtYnRuLWRhc2hib2FyZCcpKSB7XG4gICAgICAgIGxvZ291dCgpO1xuICAgIH0gZWxzZSBpZiAodGFyZ2V0Lm1hdGNoZXMoJyNsb2dpbi1idG4nKSkge1xuICAgICAgICBsb2dpblVzZXIoe3VzZXJuYW1lOiAoPEhUTUxJbnB1dEVsZW1lbnQ+ZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ2xvZ2luLXVzZXJuYW1lJykpLnZhbHVlLCBwYXNzd29yZDogKDxIVE1MSW5wdXRFbGVtZW50PmRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdsb2dpbi1wYXNzd29yZCcpKS52YWx1ZX0pO1xuICAgIH1cbn0pO1xuXG5mdW5jdGlvbiBhZGRHYW1lRm9ybSgpIHtcbiAgICBnYW1lRm9ybU9wZW4gPSAhZ2FtZUZvcm1PcGVuO1xuICAgIGlmIChnYW1lRm9ybU9wZW4pIHtcbiAgICAgICAgZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLmdhbWVzLWxpc3RfX2NvbnRlbnQnKS5pbnNlcnRBZGphY2VudEhUTUwoJ2JlZm9yZWVuZCcsIGBcbiAgICAgICAgICAgIDxmb3JtIGNsYXNzPVwiZm9ybS0tYWRkLWdhbWVcIj5cbiAgICAgICAgICAgICAgICA8aW5wdXQgcGxhY2Vob2xkZXI9XCJuYW1lXCIgb25jaGFuZ2U9XCJnYW1lTmFtZUlucHV0ID0gZXZlbnQudGFyZ2V0LnZhbHVlXCIgcmVxdWlyZWQ+XG4gICAgICAgICAgICAgICAgPGJ1dHRvbiBjbGFzcz1cImJ1dHRvbi0tc3VibWl0IGJ0bi0taG92ZXJcIiBpZD1cImFkZC1nYW1lLWJ0blwiIHR5cGU9XCJzdWJtaXRcIj5TdWJtaXQ8L2J1dHRvbj5cbiAgICAgICAgICAgIDwvZm9ybT5cbiAgICAgICAgYCk7XG4gICAgfSBlbHNlIHtcbiAgICAgICAgZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLmZvcm0tLWFkZC1nYW1lJykucmVtb3ZlKCk7XG4gICAgfVxufVxuXG5mdW5jdGlvbiBnYW1lU2NyZWVuKCkge1xuICAgIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5kYXNoYm9hcmQtcGFnZS1jb250YWluZXInKS5yZW1vdmUoKTtcbiAgICBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcucGFnZS1jb250YWluZXInKS5pbnNlcnRBZGphY2VudEhUTUwoJ2JlZm9yZWVuZCcsIGBcbiAgICAgICAgPHNlY3Rpb24gY2xhc3M9XCJnYW1lLXBhZ2UtY29udGFpbmVyXCI+XG4gICAgICAgICAgICA8ZGl2IGNsYXNzPVwic2lkZWJhclwiPjwvZGl2PlxuICAgICAgICAgICAgPGRpdiBjbGFzcz1cImdhbWUtY29udGVudFwiPlxuICAgICAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJ0b29sYmFyXCI+XG4gICAgICAgICAgICAgICAgICAgIDxidXR0b24gY2xhc3M9XCJ0b29sYmFyX19idG5cIiBvbmNsaWNrPVwiem9vbUluKClcIj4rPC9idXR0b24+XG4gICAgICAgICAgICAgICAgICAgIDxidXR0b24gY2xhc3M9XCJ0b29sYmFyX19idG5cIiBvbmNsaWNrPVwiem9vbU91dCgpXCI+LTwvYnV0dG9uPlxuICAgICAgICAgICAgICAgICAgICA8YnV0dG9uIGNsYXNzPVwidG9vbGJhcl9fYnRuXCIgb25jbGljaz1cInRvZ2dsZVBsYXllckxpc3QoKVwiPlNob3cgUGxheWVyczwvYnV0dG9uPlxuICAgICAgICAgICAgICAgICAgICA8cCBjbGFzcz1cInRvb2xiYXJfX3RleHRcIj5Sb29tOiAke3Jvb219PC9wPlxuICAgICAgICAgICAgICAgICAgICA8YSBjbGFzcz1cInRvb2xiYXJfX2xlYXZlLWJ0blwiIG9uY2xpY2s9XCJsZWF2ZVJvb20oKVwiPkxlYXZlIEdhbWU8L2E+XG4gICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgICAgPGRpdiBjbGFzcz1cImdyaWQtY29udGFpbmVyXCI+XG4gICAgICAgICAgICAgICAgICAgIDx0YWJsZSBpZD1cImdyaWRcIj48L3RhYmxlPlxuICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgIDwvc2VjdGlvbj5cbiAgICBgKTtcbiAgICBnYW1lUGFnZUxvYWRlZCgpO1xufVxuXG5mdW5jdGlvbiBsZWF2ZVJvb20oKSB7XG4gICAgc29ja2V0LmVtaXQoJ1VTRVJfRElTQ09OTkVDVCcsIHJvb20sIHNvY2tldC5pZCk7XG4gICAgc29ja2V0LmRpc2Nvbm5lY3QoKTtcbiAgICBsb2NhdGlvbi5yZWxvYWQoKTtcbn1cbiIsICJpbXBvcnQgeyBpbywgU29ja2V0IH0gZnJvbSBcInNvY2tldC5pby1jbGllbnRcIjtcbmltcG9ydCB7IHNldHVwR2FtZSB9IGZyb20gJy4vc2NyaXB0cy9kYXNoYm9hcmQuanMnO1xuXG5cbmNvbnN0IHNvY2tldDogU29ja2V0ID0gaW8oKTtcblxuZG9jdW1lbnQuYWRkRXZlbnRMaXN0ZW5lcignRE9NQ29udGVudExvYWRlZCcsICgpID0+IHtcbiAgICBzZXR1cEdhbWUoKTtcbn0pOyJdLAogICJtYXBwaW5ncyI6ICI7Ozs7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O0FBQUE7QUFBQTtBQUFBO0FBQUEsS0FRaEQ7QUFDRCxpQkFBZTtBQUNuQjs7O0FDN0hBLElBQU1FLFVBQWlCQyxRQUFHO0FBRTFCLFNBQVMsaUJBQWlCLG9CQUFvQixNQUFNO0FBQ2hELFlBQVU7QUFDZCxDQUFDOyIsCiAgIm5hbWVzIjogWyJpIiwgInRvU3RyaW5nIiwgImNhY2hlIiwgImkiLCAiZW5jb2RlIiwgInVybCIsICJwYXJ0cyIsICJ2YWx1ZSIsICJ2YWx1ZSIsICJ2YWx1ZSIsICJ1cmwiLCAiaSIsICJ1cmwiLCAidXJsIiwgInZhbHVlIiwgInByb3RvY29sIiwgInZhbHVlIiwgInZhbHVlIiwgImkiLCAidmFsdWUiLCAidXJsIiwgImkiLCAiYXhpb3MiLCAicmVxdWlyZV9heGlvcyIsICJpIiwgImkiLCAid2l0aE5hdGl2ZUFycmF5QnVmZmVyIiwgImxlbmd0aCIsICJpIiwgIm9uIiwgImkiLCAibGVuZ3RoIiwgImkiLCAiZW5jb2RlIiwgImkiLCAiZGVjb2RlIiwgImVuY29kZSIsICJpIiwgImkiLCAiZW5jb2RlIiwgImkiLCAiZGVjb2RlIiwgImkiLCAicHJvdG9jb2wiLCAicHJvdG9jb2wiLCAid2l0aE5hdGl2ZUFycmF5QnVmZmVyIiwgImlzVmlldyIsICJ3aXRoTmF0aXZlQmxvYiIsICJpIiwgImkiLCAicHJvdG9jb2wiLCAiUGFja2V0VHlwZSIsICJpIiwgIlNvY2tldCIsICJpIiwgInNlbGYiLCAic29ja2V0IiwgInNlbGYiLCAiU29ja2V0IiwgImkiLCAibG9va3VwIiwgIlNvY2tldCIsICJheGlvcyIsICJpbXBvcnRfYXhpb3MiLCAiaW1wb3J0X2F4aW9zIiwgImF4aW9zIiwgImltcG9ydF9heGlvcyIsICJheGlvcyIsICJsb29rdXAiLCAibWFwIiwgIm1hcCIsICJpbXBvcnRfYXhpb3MiLCAiYXhpb3MiLCAiYXhpb3MiLCAiaW1wb3J0X2F4aW9zIiwgImF4aW9zIiwgImNoYXJhY3RlciIsICJ3aW5kb3ciLCAiaSIsICJ2YWx1ZSIsICJuYW1lIiwgInNvY2tldCIsICJsb29rdXAiLCAiaSIsICJ1c2VyIiwgImNsaWVudCIsICJ4IiwgInkiLCAid2luZG93IiwgIndpbmRvdyIsICJheGlvcyIsICJkbWciLCAidmFsdWUiLCAiaSIsICJzb2NrZXQiLCAibG9va3VwIiwgInJvb21Db2RlIiwgInNvY2tldCIsICJzb2NrZXQiLCAibG9va3VwIl0KfQo=
