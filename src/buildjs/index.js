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
        <button class="btn--window-close" class="creature-stats-close-btn">X</button>
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
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsiLi4vLi4vbm9kZV9tb2R1bGVzL2F4aW9zL2xpYi9oZWxwZXJzL2JpbmQuanMiLCAiLi4vLi4vbm9kZV9tb2R1bGVzL2F4aW9zL2xpYi91dGlscy5qcyIsICIuLi8uLi9ub2RlX21vZHVsZXMvYXhpb3MvbGliL2hlbHBlcnMvYnVpbGRVUkwuanMiLCAiLi4vLi4vbm9kZV9tb2R1bGVzL2F4aW9zL2xpYi9jb3JlL0ludGVyY2VwdG9yTWFuYWdlci5qcyIsICIuLi8uLi9ub2RlX21vZHVsZXMvYXhpb3MvbGliL2hlbHBlcnMvbm9ybWFsaXplSGVhZGVyTmFtZS5qcyIsICIuLi8uLi9ub2RlX21vZHVsZXMvYXhpb3MvbGliL2NvcmUvQXhpb3NFcnJvci5qcyIsICIuLi8uLi9ub2RlX21vZHVsZXMvYXhpb3MvbGliL2RlZmF1bHRzL3RyYW5zaXRpb25hbC5qcyIsICIuLi8uLi9ub2RlX21vZHVsZXMvYXhpb3MvbGliL2hlbHBlcnMvdG9Gb3JtRGF0YS5qcyIsICIuLi8uLi9ub2RlX21vZHVsZXMvYXhpb3MvbGliL2NvcmUvc2V0dGxlLmpzIiwgIi4uLy4uL25vZGVfbW9kdWxlcy9heGlvcy9saWIvaGVscGVycy9jb29raWVzLmpzIiwgIi4uLy4uL25vZGVfbW9kdWxlcy9heGlvcy9saWIvaGVscGVycy9pc0Fic29sdXRlVVJMLmpzIiwgIi4uLy4uL25vZGVfbW9kdWxlcy9heGlvcy9saWIvaGVscGVycy9jb21iaW5lVVJMcy5qcyIsICIuLi8uLi9ub2RlX21vZHVsZXMvYXhpb3MvbGliL2NvcmUvYnVpbGRGdWxsUGF0aC5qcyIsICIuLi8uLi9ub2RlX21vZHVsZXMvYXhpb3MvbGliL2hlbHBlcnMvcGFyc2VIZWFkZXJzLmpzIiwgIi4uLy4uL25vZGVfbW9kdWxlcy9heGlvcy9saWIvaGVscGVycy9pc1VSTFNhbWVPcmlnaW4uanMiLCAiLi4vLi4vbm9kZV9tb2R1bGVzL2F4aW9zL2xpYi9jYW5jZWwvQ2FuY2VsZWRFcnJvci5qcyIsICIuLi8uLi9ub2RlX21vZHVsZXMvYXhpb3MvbGliL2hlbHBlcnMvcGFyc2VQcm90b2NvbC5qcyIsICIuLi8uLi9ub2RlX21vZHVsZXMvYXhpb3MvbGliL2FkYXB0ZXJzL3hoci5qcyIsICIuLi8uLi9ub2RlX21vZHVsZXMvYXhpb3MvbGliL2hlbHBlcnMvbnVsbC5qcyIsICIuLi8uLi9ub2RlX21vZHVsZXMvYXhpb3MvbGliL2RlZmF1bHRzL2luZGV4LmpzIiwgIi4uLy4uL25vZGVfbW9kdWxlcy9heGlvcy9saWIvY29yZS90cmFuc2Zvcm1EYXRhLmpzIiwgIi4uLy4uL25vZGVfbW9kdWxlcy9heGlvcy9saWIvY2FuY2VsL2lzQ2FuY2VsLmpzIiwgIi4uLy4uL25vZGVfbW9kdWxlcy9heGlvcy9saWIvY29yZS9kaXNwYXRjaFJlcXVlc3QuanMiLCAiLi4vLi4vbm9kZV9tb2R1bGVzL2F4aW9zL2xpYi9jb3JlL21lcmdlQ29uZmlnLmpzIiwgIi4uLy4uL25vZGVfbW9kdWxlcy9heGlvcy9saWIvZW52L2RhdGEuanMiLCAiLi4vLi4vbm9kZV9tb2R1bGVzL2F4aW9zL2xpYi9oZWxwZXJzL3ZhbGlkYXRvci5qcyIsICIuLi8uLi9ub2RlX21vZHVsZXMvYXhpb3MvbGliL2NvcmUvQXhpb3MuanMiLCAiLi4vLi4vbm9kZV9tb2R1bGVzL2F4aW9zL2xpYi9jYW5jZWwvQ2FuY2VsVG9rZW4uanMiLCAiLi4vLi4vbm9kZV9tb2R1bGVzL2F4aW9zL2xpYi9oZWxwZXJzL3NwcmVhZC5qcyIsICIuLi8uLi9ub2RlX21vZHVsZXMvYXhpb3MvbGliL2hlbHBlcnMvaXNBeGlvc0Vycm9yLmpzIiwgIi4uLy4uL25vZGVfbW9kdWxlcy9heGlvcy9saWIvYXhpb3MuanMiLCAiLi4vLi4vbm9kZV9tb2R1bGVzL2F4aW9zL2luZGV4LmpzIiwgIi4uLy4uL25vZGVfbW9kdWxlcy9lbmdpbmUuaW8tcGFyc2VyL2J1aWxkL2VzbS9jb21tb25zLmpzIiwgIi4uLy4uL25vZGVfbW9kdWxlcy9lbmdpbmUuaW8tcGFyc2VyL2J1aWxkL2VzbS9lbmNvZGVQYWNrZXQuYnJvd3Nlci5qcyIsICIuLi8uLi9ub2RlX21vZHVsZXMvZW5naW5lLmlvLXBhcnNlci9idWlsZC9lc20vY29udHJpYi9iYXNlNjQtYXJyYXlidWZmZXIuanMiLCAiLi4vLi4vbm9kZV9tb2R1bGVzL2VuZ2luZS5pby1wYXJzZXIvYnVpbGQvZXNtL2RlY29kZVBhY2tldC5icm93c2VyLmpzIiwgIi4uLy4uL25vZGVfbW9kdWxlcy9lbmdpbmUuaW8tcGFyc2VyL2J1aWxkL2VzbS9pbmRleC5qcyIsICIuLi8uLi9ub2RlX21vZHVsZXMvQHNvY2tldC5pby9jb21wb25lbnQtZW1pdHRlci9pbmRleC5tanMiLCAiLi4vLi4vbm9kZV9tb2R1bGVzL2VuZ2luZS5pby1jbGllbnQvYnVpbGQvZXNtL2dsb2JhbFRoaXMuYnJvd3Nlci5qcyIsICIuLi8uLi9ub2RlX21vZHVsZXMvZW5naW5lLmlvLWNsaWVudC9idWlsZC9lc20vdXRpbC5qcyIsICIuLi8uLi9ub2RlX21vZHVsZXMvZW5naW5lLmlvLWNsaWVudC9idWlsZC9lc20vdHJhbnNwb3J0LmpzIiwgIi4uLy4uL25vZGVfbW9kdWxlcy9lbmdpbmUuaW8tY2xpZW50L2J1aWxkL2VzbS9jb250cmliL3llYXN0LmpzIiwgIi4uLy4uL25vZGVfbW9kdWxlcy9lbmdpbmUuaW8tY2xpZW50L2J1aWxkL2VzbS9jb250cmliL3BhcnNlcXMuanMiLCAiLi4vLi4vbm9kZV9tb2R1bGVzL2VuZ2luZS5pby1jbGllbnQvYnVpbGQvZXNtL2NvbnRyaWIvaGFzLWNvcnMuanMiLCAiLi4vLi4vbm9kZV9tb2R1bGVzL2VuZ2luZS5pby1jbGllbnQvYnVpbGQvZXNtL3RyYW5zcG9ydHMveG1saHR0cHJlcXVlc3QuYnJvd3Nlci5qcyIsICIuLi8uLi9ub2RlX21vZHVsZXMvZW5naW5lLmlvLWNsaWVudC9idWlsZC9lc20vdHJhbnNwb3J0cy9wb2xsaW5nLmpzIiwgIi4uLy4uL25vZGVfbW9kdWxlcy9lbmdpbmUuaW8tY2xpZW50L2J1aWxkL2VzbS90cmFuc3BvcnRzL3dlYnNvY2tldC1jb25zdHJ1Y3Rvci5icm93c2VyLmpzIiwgIi4uLy4uL25vZGVfbW9kdWxlcy9lbmdpbmUuaW8tY2xpZW50L2J1aWxkL2VzbS90cmFuc3BvcnRzL3dlYnNvY2tldC5qcyIsICIuLi8uLi9ub2RlX21vZHVsZXMvZW5naW5lLmlvLWNsaWVudC9idWlsZC9lc20vdHJhbnNwb3J0cy9pbmRleC5qcyIsICIuLi8uLi9ub2RlX21vZHVsZXMvZW5naW5lLmlvLWNsaWVudC9idWlsZC9lc20vY29udHJpYi9wYXJzZXVyaS5qcyIsICIuLi8uLi9ub2RlX21vZHVsZXMvZW5naW5lLmlvLWNsaWVudC9idWlsZC9lc20vc29ja2V0LmpzIiwgIi4uLy4uL25vZGVfbW9kdWxlcy9lbmdpbmUuaW8tY2xpZW50L2J1aWxkL2VzbS9pbmRleC5qcyIsICIuLi8uLi9ub2RlX21vZHVsZXMvc29ja2V0LmlvLWNsaWVudC9idWlsZC9lc20vdXJsLmpzIiwgIi4uLy4uL25vZGVfbW9kdWxlcy9zb2NrZXQuaW8tY2xpZW50L25vZGVfbW9kdWxlcy9zb2NrZXQuaW8tcGFyc2VyL2J1aWxkL2VzbS9pbmRleC5qcyIsICIuLi8uLi9ub2RlX21vZHVsZXMvc29ja2V0LmlvLWNsaWVudC9ub2RlX21vZHVsZXMvc29ja2V0LmlvLXBhcnNlci9idWlsZC9lc20vaXMtYmluYXJ5LmpzIiwgIi4uLy4uL25vZGVfbW9kdWxlcy9zb2NrZXQuaW8tY2xpZW50L25vZGVfbW9kdWxlcy9zb2NrZXQuaW8tcGFyc2VyL2J1aWxkL2VzbS9iaW5hcnkuanMiLCAiLi4vLi4vbm9kZV9tb2R1bGVzL3NvY2tldC5pby1jbGllbnQvYnVpbGQvZXNtL29uLmpzIiwgIi4uLy4uL25vZGVfbW9kdWxlcy9zb2NrZXQuaW8tY2xpZW50L2J1aWxkL2VzbS9zb2NrZXQuanMiLCAiLi4vLi4vbm9kZV9tb2R1bGVzL3NvY2tldC5pby1jbGllbnQvYnVpbGQvZXNtL2NvbnRyaWIvYmFja28yLmpzIiwgIi4uLy4uL25vZGVfbW9kdWxlcy9zb2NrZXQuaW8tY2xpZW50L2J1aWxkL2VzbS9tYW5hZ2VyLmpzIiwgIi4uLy4uL25vZGVfbW9kdWxlcy9zb2NrZXQuaW8tY2xpZW50L2J1aWxkL2VzbS9pbmRleC5qcyIsICIuLi9zY3JpcHRzL3JvdXRlcy9kYXNoYm9hcmQucm91dGUudHMiLCAiLi4vc2NyaXB0cy9yb3V0ZXMvY3JlYXR1cmVzLnJvdXRlLnRzIiwgIi4uL3NjcmlwdHMvdG9rZW4udHMiLCAiLi4vc2NyaXB0cy9yb3V0ZXMvdG9rZW5zLnJvdXRlLnRzIiwgIi4uL3NjcmlwdHMvbWVudXMvdG9rZW4ubWVudS50cyIsICIuLi9zY3JpcHRzL3JvdXRlcy9tYXBzLnJvdXRlLnRzIiwgIi4uL3NjcmlwdHMvbWVudXMvbWFwLm1lbnUudHMiLCAiLi4vc2NyaXB0cy9yb3V0ZXMvdXNlcnMucm91dGUudHMiLCAiLi4vc2NyaXB0cy9yb3V0ZXMvY2hhcmFjdGVycy5yb3V0ZS50cyIsICIuLi9zY3JpcHRzL21lbnVzL2NoYXJhY3Rlci5tZW51LnRzIiwgIi4uL3NjcmlwdHMvY3JlYXR1cmUtc3RhdHMudHMiLCAiLi4vc2NyaXB0cy9ncmlkLnRzIiwgIi4uL3NjcmlwdHMvY2hhcmFjdGVyLXNoZWV0LnRzIiwgIi4uL3NjcmlwdHMvaW5wdXQudHMiLCAiLi4vc2NyaXB0cy91dGlscy50cyIsICIuLi9zY3JpcHRzL2NyZWF0dXJlcy50cyIsICIuLi9zY3JpcHRzL2Rhc2hib2FyZC50cyIsICIuLi9pbmRleC50cyJdLAogICJzb3VyY2VzQ29udGVudCI6IFsiJ3VzZSBzdHJpY3QnO1xuXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIGJpbmQoZm4sIHRoaXNBcmcpIHtcbiAgcmV0dXJuIGZ1bmN0aW9uIHdyYXAoKSB7XG4gICAgdmFyIGFyZ3MgPSBuZXcgQXJyYXkoYXJndW1lbnRzLmxlbmd0aCk7XG4gICAgZm9yICh2YXIgaSA9IDA7IGkgPCBhcmdzLmxlbmd0aDsgaSsrKSB7XG4gICAgICBhcmdzW2ldID0gYXJndW1lbnRzW2ldO1xuICAgIH1cbiAgICByZXR1cm4gZm4uYXBwbHkodGhpc0FyZywgYXJncyk7XG4gIH07XG59O1xuIiwgIid1c2Ugc3RyaWN0JztcblxudmFyIGJpbmQgPSByZXF1aXJlKCcuL2hlbHBlcnMvYmluZCcpO1xuXG4vLyB1dGlscyBpcyBhIGxpYnJhcnkgb2YgZ2VuZXJpYyBoZWxwZXIgZnVuY3Rpb25zIG5vbi1zcGVjaWZpYyB0byBheGlvc1xuXG52YXIgdG9TdHJpbmcgPSBPYmplY3QucHJvdG90eXBlLnRvU3RyaW5nO1xuXG4vLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgZnVuYy1uYW1lc1xudmFyIGtpbmRPZiA9IChmdW5jdGlvbihjYWNoZSkge1xuICAvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgZnVuYy1uYW1lc1xuICByZXR1cm4gZnVuY3Rpb24odGhpbmcpIHtcbiAgICB2YXIgc3RyID0gdG9TdHJpbmcuY2FsbCh0aGluZyk7XG4gICAgcmV0dXJuIGNhY2hlW3N0cl0gfHwgKGNhY2hlW3N0cl0gPSBzdHIuc2xpY2UoOCwgLTEpLnRvTG93ZXJDYXNlKCkpO1xuICB9O1xufSkoT2JqZWN0LmNyZWF0ZShudWxsKSk7XG5cbmZ1bmN0aW9uIGtpbmRPZlRlc3QodHlwZSkge1xuICB0eXBlID0gdHlwZS50b0xvd2VyQ2FzZSgpO1xuICByZXR1cm4gZnVuY3Rpb24gaXNLaW5kT2YodGhpbmcpIHtcbiAgICByZXR1cm4ga2luZE9mKHRoaW5nKSA9PT0gdHlwZTtcbiAgfTtcbn1cblxuLyoqXG4gKiBEZXRlcm1pbmUgaWYgYSB2YWx1ZSBpcyBhbiBBcnJheVxuICpcbiAqIEBwYXJhbSB7T2JqZWN0fSB2YWwgVGhlIHZhbHVlIHRvIHRlc3RcbiAqIEByZXR1cm5zIHtib29sZWFufSBUcnVlIGlmIHZhbHVlIGlzIGFuIEFycmF5LCBvdGhlcndpc2UgZmFsc2VcbiAqL1xuZnVuY3Rpb24gaXNBcnJheSh2YWwpIHtcbiAgcmV0dXJuIEFycmF5LmlzQXJyYXkodmFsKTtcbn1cblxuLyoqXG4gKiBEZXRlcm1pbmUgaWYgYSB2YWx1ZSBpcyB1bmRlZmluZWRcbiAqXG4gKiBAcGFyYW0ge09iamVjdH0gdmFsIFRoZSB2YWx1ZSB0byB0ZXN0XG4gKiBAcmV0dXJucyB7Ym9vbGVhbn0gVHJ1ZSBpZiB0aGUgdmFsdWUgaXMgdW5kZWZpbmVkLCBvdGhlcndpc2UgZmFsc2VcbiAqL1xuZnVuY3Rpb24gaXNVbmRlZmluZWQodmFsKSB7XG4gIHJldHVybiB0eXBlb2YgdmFsID09PSAndW5kZWZpbmVkJztcbn1cblxuLyoqXG4gKiBEZXRlcm1pbmUgaWYgYSB2YWx1ZSBpcyBhIEJ1ZmZlclxuICpcbiAqIEBwYXJhbSB7T2JqZWN0fSB2YWwgVGhlIHZhbHVlIHRvIHRlc3RcbiAqIEByZXR1cm5zIHtib29sZWFufSBUcnVlIGlmIHZhbHVlIGlzIGEgQnVmZmVyLCBvdGhlcndpc2UgZmFsc2VcbiAqL1xuZnVuY3Rpb24gaXNCdWZmZXIodmFsKSB7XG4gIHJldHVybiB2YWwgIT09IG51bGwgJiYgIWlzVW5kZWZpbmVkKHZhbCkgJiYgdmFsLmNvbnN0cnVjdG9yICE9PSBudWxsICYmICFpc1VuZGVmaW5lZCh2YWwuY29uc3RydWN0b3IpXG4gICAgJiYgdHlwZW9mIHZhbC5jb25zdHJ1Y3Rvci5pc0J1ZmZlciA9PT0gJ2Z1bmN0aW9uJyAmJiB2YWwuY29uc3RydWN0b3IuaXNCdWZmZXIodmFsKTtcbn1cblxuLyoqXG4gKiBEZXRlcm1pbmUgaWYgYSB2YWx1ZSBpcyBhbiBBcnJheUJ1ZmZlclxuICpcbiAqIEBmdW5jdGlvblxuICogQHBhcmFtIHtPYmplY3R9IHZhbCBUaGUgdmFsdWUgdG8gdGVzdFxuICogQHJldHVybnMge2Jvb2xlYW59IFRydWUgaWYgdmFsdWUgaXMgYW4gQXJyYXlCdWZmZXIsIG90aGVyd2lzZSBmYWxzZVxuICovXG52YXIgaXNBcnJheUJ1ZmZlciA9IGtpbmRPZlRlc3QoJ0FycmF5QnVmZmVyJyk7XG5cblxuLyoqXG4gKiBEZXRlcm1pbmUgaWYgYSB2YWx1ZSBpcyBhIHZpZXcgb24gYW4gQXJyYXlCdWZmZXJcbiAqXG4gKiBAcGFyYW0ge09iamVjdH0gdmFsIFRoZSB2YWx1ZSB0byB0ZXN0XG4gKiBAcmV0dXJucyB7Ym9vbGVhbn0gVHJ1ZSBpZiB2YWx1ZSBpcyBhIHZpZXcgb24gYW4gQXJyYXlCdWZmZXIsIG90aGVyd2lzZSBmYWxzZVxuICovXG5mdW5jdGlvbiBpc0FycmF5QnVmZmVyVmlldyh2YWwpIHtcbiAgdmFyIHJlc3VsdDtcbiAgaWYgKCh0eXBlb2YgQXJyYXlCdWZmZXIgIT09ICd1bmRlZmluZWQnKSAmJiAoQXJyYXlCdWZmZXIuaXNWaWV3KSkge1xuICAgIHJlc3VsdCA9IEFycmF5QnVmZmVyLmlzVmlldyh2YWwpO1xuICB9IGVsc2Uge1xuICAgIHJlc3VsdCA9ICh2YWwpICYmICh2YWwuYnVmZmVyKSAmJiAoaXNBcnJheUJ1ZmZlcih2YWwuYnVmZmVyKSk7XG4gIH1cbiAgcmV0dXJuIHJlc3VsdDtcbn1cblxuLyoqXG4gKiBEZXRlcm1pbmUgaWYgYSB2YWx1ZSBpcyBhIFN0cmluZ1xuICpcbiAqIEBwYXJhbSB7T2JqZWN0fSB2YWwgVGhlIHZhbHVlIHRvIHRlc3RcbiAqIEByZXR1cm5zIHtib29sZWFufSBUcnVlIGlmIHZhbHVlIGlzIGEgU3RyaW5nLCBvdGhlcndpc2UgZmFsc2VcbiAqL1xuZnVuY3Rpb24gaXNTdHJpbmcodmFsKSB7XG4gIHJldHVybiB0eXBlb2YgdmFsID09PSAnc3RyaW5nJztcbn1cblxuLyoqXG4gKiBEZXRlcm1pbmUgaWYgYSB2YWx1ZSBpcyBhIE51bWJlclxuICpcbiAqIEBwYXJhbSB7T2JqZWN0fSB2YWwgVGhlIHZhbHVlIHRvIHRlc3RcbiAqIEByZXR1cm5zIHtib29sZWFufSBUcnVlIGlmIHZhbHVlIGlzIGEgTnVtYmVyLCBvdGhlcndpc2UgZmFsc2VcbiAqL1xuZnVuY3Rpb24gaXNOdW1iZXIodmFsKSB7XG4gIHJldHVybiB0eXBlb2YgdmFsID09PSAnbnVtYmVyJztcbn1cblxuLyoqXG4gKiBEZXRlcm1pbmUgaWYgYSB2YWx1ZSBpcyBhbiBPYmplY3RcbiAqXG4gKiBAcGFyYW0ge09iamVjdH0gdmFsIFRoZSB2YWx1ZSB0byB0ZXN0XG4gKiBAcmV0dXJucyB7Ym9vbGVhbn0gVHJ1ZSBpZiB2YWx1ZSBpcyBhbiBPYmplY3QsIG90aGVyd2lzZSBmYWxzZVxuICovXG5mdW5jdGlvbiBpc09iamVjdCh2YWwpIHtcbiAgcmV0dXJuIHZhbCAhPT0gbnVsbCAmJiB0eXBlb2YgdmFsID09PSAnb2JqZWN0Jztcbn1cblxuLyoqXG4gKiBEZXRlcm1pbmUgaWYgYSB2YWx1ZSBpcyBhIHBsYWluIE9iamVjdFxuICpcbiAqIEBwYXJhbSB7T2JqZWN0fSB2YWwgVGhlIHZhbHVlIHRvIHRlc3RcbiAqIEByZXR1cm4ge2Jvb2xlYW59IFRydWUgaWYgdmFsdWUgaXMgYSBwbGFpbiBPYmplY3QsIG90aGVyd2lzZSBmYWxzZVxuICovXG5mdW5jdGlvbiBpc1BsYWluT2JqZWN0KHZhbCkge1xuICBpZiAoa2luZE9mKHZhbCkgIT09ICdvYmplY3QnKSB7XG4gICAgcmV0dXJuIGZhbHNlO1xuICB9XG5cbiAgdmFyIHByb3RvdHlwZSA9IE9iamVjdC5nZXRQcm90b3R5cGVPZih2YWwpO1xuICByZXR1cm4gcHJvdG90eXBlID09PSBudWxsIHx8IHByb3RvdHlwZSA9PT0gT2JqZWN0LnByb3RvdHlwZTtcbn1cblxuLyoqXG4gKiBEZXRlcm1pbmUgaWYgYSB2YWx1ZSBpcyBhIERhdGVcbiAqXG4gKiBAZnVuY3Rpb25cbiAqIEBwYXJhbSB7T2JqZWN0fSB2YWwgVGhlIHZhbHVlIHRvIHRlc3RcbiAqIEByZXR1cm5zIHtib29sZWFufSBUcnVlIGlmIHZhbHVlIGlzIGEgRGF0ZSwgb3RoZXJ3aXNlIGZhbHNlXG4gKi9cbnZhciBpc0RhdGUgPSBraW5kT2ZUZXN0KCdEYXRlJyk7XG5cbi8qKlxuICogRGV0ZXJtaW5lIGlmIGEgdmFsdWUgaXMgYSBGaWxlXG4gKlxuICogQGZ1bmN0aW9uXG4gKiBAcGFyYW0ge09iamVjdH0gdmFsIFRoZSB2YWx1ZSB0byB0ZXN0XG4gKiBAcmV0dXJucyB7Ym9vbGVhbn0gVHJ1ZSBpZiB2YWx1ZSBpcyBhIEZpbGUsIG90aGVyd2lzZSBmYWxzZVxuICovXG52YXIgaXNGaWxlID0ga2luZE9mVGVzdCgnRmlsZScpO1xuXG4vKipcbiAqIERldGVybWluZSBpZiBhIHZhbHVlIGlzIGEgQmxvYlxuICpcbiAqIEBmdW5jdGlvblxuICogQHBhcmFtIHtPYmplY3R9IHZhbCBUaGUgdmFsdWUgdG8gdGVzdFxuICogQHJldHVybnMge2Jvb2xlYW59IFRydWUgaWYgdmFsdWUgaXMgYSBCbG9iLCBvdGhlcndpc2UgZmFsc2VcbiAqL1xudmFyIGlzQmxvYiA9IGtpbmRPZlRlc3QoJ0Jsb2InKTtcblxuLyoqXG4gKiBEZXRlcm1pbmUgaWYgYSB2YWx1ZSBpcyBhIEZpbGVMaXN0XG4gKlxuICogQGZ1bmN0aW9uXG4gKiBAcGFyYW0ge09iamVjdH0gdmFsIFRoZSB2YWx1ZSB0byB0ZXN0XG4gKiBAcmV0dXJucyB7Ym9vbGVhbn0gVHJ1ZSBpZiB2YWx1ZSBpcyBhIEZpbGUsIG90aGVyd2lzZSBmYWxzZVxuICovXG52YXIgaXNGaWxlTGlzdCA9IGtpbmRPZlRlc3QoJ0ZpbGVMaXN0Jyk7XG5cbi8qKlxuICogRGV0ZXJtaW5lIGlmIGEgdmFsdWUgaXMgYSBGdW5jdGlvblxuICpcbiAqIEBwYXJhbSB7T2JqZWN0fSB2YWwgVGhlIHZhbHVlIHRvIHRlc3RcbiAqIEByZXR1cm5zIHtib29sZWFufSBUcnVlIGlmIHZhbHVlIGlzIGEgRnVuY3Rpb24sIG90aGVyd2lzZSBmYWxzZVxuICovXG5mdW5jdGlvbiBpc0Z1bmN0aW9uKHZhbCkge1xuICByZXR1cm4gdG9TdHJpbmcuY2FsbCh2YWwpID09PSAnW29iamVjdCBGdW5jdGlvbl0nO1xufVxuXG4vKipcbiAqIERldGVybWluZSBpZiBhIHZhbHVlIGlzIGEgU3RyZWFtXG4gKlxuICogQHBhcmFtIHtPYmplY3R9IHZhbCBUaGUgdmFsdWUgdG8gdGVzdFxuICogQHJldHVybnMge2Jvb2xlYW59IFRydWUgaWYgdmFsdWUgaXMgYSBTdHJlYW0sIG90aGVyd2lzZSBmYWxzZVxuICovXG5mdW5jdGlvbiBpc1N0cmVhbSh2YWwpIHtcbiAgcmV0dXJuIGlzT2JqZWN0KHZhbCkgJiYgaXNGdW5jdGlvbih2YWwucGlwZSk7XG59XG5cbi8qKlxuICogRGV0ZXJtaW5lIGlmIGEgdmFsdWUgaXMgYSBGb3JtRGF0YVxuICpcbiAqIEBwYXJhbSB7T2JqZWN0fSB0aGluZyBUaGUgdmFsdWUgdG8gdGVzdFxuICogQHJldHVybnMge2Jvb2xlYW59IFRydWUgaWYgdmFsdWUgaXMgYW4gRm9ybURhdGEsIG90aGVyd2lzZSBmYWxzZVxuICovXG5mdW5jdGlvbiBpc0Zvcm1EYXRhKHRoaW5nKSB7XG4gIHZhciBwYXR0ZXJuID0gJ1tvYmplY3QgRm9ybURhdGFdJztcbiAgcmV0dXJuIHRoaW5nICYmIChcbiAgICAodHlwZW9mIEZvcm1EYXRhID09PSAnZnVuY3Rpb24nICYmIHRoaW5nIGluc3RhbmNlb2YgRm9ybURhdGEpIHx8XG4gICAgdG9TdHJpbmcuY2FsbCh0aGluZykgPT09IHBhdHRlcm4gfHxcbiAgICAoaXNGdW5jdGlvbih0aGluZy50b1N0cmluZykgJiYgdGhpbmcudG9TdHJpbmcoKSA9PT0gcGF0dGVybilcbiAgKTtcbn1cblxuLyoqXG4gKiBEZXRlcm1pbmUgaWYgYSB2YWx1ZSBpcyBhIFVSTFNlYXJjaFBhcmFtcyBvYmplY3RcbiAqIEBmdW5jdGlvblxuICogQHBhcmFtIHtPYmplY3R9IHZhbCBUaGUgdmFsdWUgdG8gdGVzdFxuICogQHJldHVybnMge2Jvb2xlYW59IFRydWUgaWYgdmFsdWUgaXMgYSBVUkxTZWFyY2hQYXJhbXMgb2JqZWN0LCBvdGhlcndpc2UgZmFsc2VcbiAqL1xudmFyIGlzVVJMU2VhcmNoUGFyYW1zID0ga2luZE9mVGVzdCgnVVJMU2VhcmNoUGFyYW1zJyk7XG5cbi8qKlxuICogVHJpbSBleGNlc3Mgd2hpdGVzcGFjZSBvZmYgdGhlIGJlZ2lubmluZyBhbmQgZW5kIG9mIGEgc3RyaW5nXG4gKlxuICogQHBhcmFtIHtTdHJpbmd9IHN0ciBUaGUgU3RyaW5nIHRvIHRyaW1cbiAqIEByZXR1cm5zIHtTdHJpbmd9IFRoZSBTdHJpbmcgZnJlZWQgb2YgZXhjZXNzIHdoaXRlc3BhY2VcbiAqL1xuZnVuY3Rpb24gdHJpbShzdHIpIHtcbiAgcmV0dXJuIHN0ci50cmltID8gc3RyLnRyaW0oKSA6IHN0ci5yZXBsYWNlKC9eXFxzK3xcXHMrJC9nLCAnJyk7XG59XG5cbi8qKlxuICogRGV0ZXJtaW5lIGlmIHdlJ3JlIHJ1bm5pbmcgaW4gYSBzdGFuZGFyZCBicm93c2VyIGVudmlyb25tZW50XG4gKlxuICogVGhpcyBhbGxvd3MgYXhpb3MgdG8gcnVuIGluIGEgd2ViIHdvcmtlciwgYW5kIHJlYWN0LW5hdGl2ZS5cbiAqIEJvdGggZW52aXJvbm1lbnRzIHN1cHBvcnQgWE1MSHR0cFJlcXVlc3QsIGJ1dCBub3QgZnVsbHkgc3RhbmRhcmQgZ2xvYmFscy5cbiAqXG4gKiB3ZWIgd29ya2VyczpcbiAqICB0eXBlb2Ygd2luZG93IC0+IHVuZGVmaW5lZFxuICogIHR5cGVvZiBkb2N1bWVudCAtPiB1bmRlZmluZWRcbiAqXG4gKiByZWFjdC1uYXRpdmU6XG4gKiAgbmF2aWdhdG9yLnByb2R1Y3QgLT4gJ1JlYWN0TmF0aXZlJ1xuICogbmF0aXZlc2NyaXB0XG4gKiAgbmF2aWdhdG9yLnByb2R1Y3QgLT4gJ05hdGl2ZVNjcmlwdCcgb3IgJ05TJ1xuICovXG5mdW5jdGlvbiBpc1N0YW5kYXJkQnJvd3NlckVudigpIHtcbiAgaWYgKHR5cGVvZiBuYXZpZ2F0b3IgIT09ICd1bmRlZmluZWQnICYmIChuYXZpZ2F0b3IucHJvZHVjdCA9PT0gJ1JlYWN0TmF0aXZlJyB8fFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIG5hdmlnYXRvci5wcm9kdWN0ID09PSAnTmF0aXZlU2NyaXB0JyB8fFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIG5hdmlnYXRvci5wcm9kdWN0ID09PSAnTlMnKSkge1xuICAgIHJldHVybiBmYWxzZTtcbiAgfVxuICByZXR1cm4gKFxuICAgIHR5cGVvZiB3aW5kb3cgIT09ICd1bmRlZmluZWQnICYmXG4gICAgdHlwZW9mIGRvY3VtZW50ICE9PSAndW5kZWZpbmVkJ1xuICApO1xufVxuXG4vKipcbiAqIEl0ZXJhdGUgb3ZlciBhbiBBcnJheSBvciBhbiBPYmplY3QgaW52b2tpbmcgYSBmdW5jdGlvbiBmb3IgZWFjaCBpdGVtLlxuICpcbiAqIElmIGBvYmpgIGlzIGFuIEFycmF5IGNhbGxiYWNrIHdpbGwgYmUgY2FsbGVkIHBhc3NpbmdcbiAqIHRoZSB2YWx1ZSwgaW5kZXgsIGFuZCBjb21wbGV0ZSBhcnJheSBmb3IgZWFjaCBpdGVtLlxuICpcbiAqIElmICdvYmonIGlzIGFuIE9iamVjdCBjYWxsYmFjayB3aWxsIGJlIGNhbGxlZCBwYXNzaW5nXG4gKiB0aGUgdmFsdWUsIGtleSwgYW5kIGNvbXBsZXRlIG9iamVjdCBmb3IgZWFjaCBwcm9wZXJ0eS5cbiAqXG4gKiBAcGFyYW0ge09iamVjdHxBcnJheX0gb2JqIFRoZSBvYmplY3QgdG8gaXRlcmF0ZVxuICogQHBhcmFtIHtGdW5jdGlvbn0gZm4gVGhlIGNhbGxiYWNrIHRvIGludm9rZSBmb3IgZWFjaCBpdGVtXG4gKi9cbmZ1bmN0aW9uIGZvckVhY2gob2JqLCBmbikge1xuICAvLyBEb24ndCBib3RoZXIgaWYgbm8gdmFsdWUgcHJvdmlkZWRcbiAgaWYgKG9iaiA9PT0gbnVsbCB8fCB0eXBlb2Ygb2JqID09PSAndW5kZWZpbmVkJykge1xuICAgIHJldHVybjtcbiAgfVxuXG4gIC8vIEZvcmNlIGFuIGFycmF5IGlmIG5vdCBhbHJlYWR5IHNvbWV0aGluZyBpdGVyYWJsZVxuICBpZiAodHlwZW9mIG9iaiAhPT0gJ29iamVjdCcpIHtcbiAgICAvKmVzbGludCBuby1wYXJhbS1yZWFzc2lnbjowKi9cbiAgICBvYmogPSBbb2JqXTtcbiAgfVxuXG4gIGlmIChpc0FycmF5KG9iaikpIHtcbiAgICAvLyBJdGVyYXRlIG92ZXIgYXJyYXkgdmFsdWVzXG4gICAgZm9yICh2YXIgaSA9IDAsIGwgPSBvYmoubGVuZ3RoOyBpIDwgbDsgaSsrKSB7XG4gICAgICBmbi5jYWxsKG51bGwsIG9ialtpXSwgaSwgb2JqKTtcbiAgICB9XG4gIH0gZWxzZSB7XG4gICAgLy8gSXRlcmF0ZSBvdmVyIG9iamVjdCBrZXlzXG4gICAgZm9yICh2YXIga2V5IGluIG9iaikge1xuICAgICAgaWYgKE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChvYmosIGtleSkpIHtcbiAgICAgICAgZm4uY2FsbChudWxsLCBvYmpba2V5XSwga2V5LCBvYmopO1xuICAgICAgfVxuICAgIH1cbiAgfVxufVxuXG4vKipcbiAqIEFjY2VwdHMgdmFyYXJncyBleHBlY3RpbmcgZWFjaCBhcmd1bWVudCB0byBiZSBhbiBvYmplY3QsIHRoZW5cbiAqIGltbXV0YWJseSBtZXJnZXMgdGhlIHByb3BlcnRpZXMgb2YgZWFjaCBvYmplY3QgYW5kIHJldHVybnMgcmVzdWx0LlxuICpcbiAqIFdoZW4gbXVsdGlwbGUgb2JqZWN0cyBjb250YWluIHRoZSBzYW1lIGtleSB0aGUgbGF0ZXIgb2JqZWN0IGluXG4gKiB0aGUgYXJndW1lbnRzIGxpc3Qgd2lsbCB0YWtlIHByZWNlZGVuY2UuXG4gKlxuICogRXhhbXBsZTpcbiAqXG4gKiBgYGBqc1xuICogdmFyIHJlc3VsdCA9IG1lcmdlKHtmb286IDEyM30sIHtmb286IDQ1Nn0pO1xuICogY29uc29sZS5sb2cocmVzdWx0LmZvbyk7IC8vIG91dHB1dHMgNDU2XG4gKiBgYGBcbiAqXG4gKiBAcGFyYW0ge09iamVjdH0gb2JqMSBPYmplY3QgdG8gbWVyZ2VcbiAqIEByZXR1cm5zIHtPYmplY3R9IFJlc3VsdCBvZiBhbGwgbWVyZ2UgcHJvcGVydGllc1xuICovXG5mdW5jdGlvbiBtZXJnZSgvKiBvYmoxLCBvYmoyLCBvYmozLCAuLi4gKi8pIHtcbiAgdmFyIHJlc3VsdCA9IHt9O1xuICBmdW5jdGlvbiBhc3NpZ25WYWx1ZSh2YWwsIGtleSkge1xuICAgIGlmIChpc1BsYWluT2JqZWN0KHJlc3VsdFtrZXldKSAmJiBpc1BsYWluT2JqZWN0KHZhbCkpIHtcbiAgICAgIHJlc3VsdFtrZXldID0gbWVyZ2UocmVzdWx0W2tleV0sIHZhbCk7XG4gICAgfSBlbHNlIGlmIChpc1BsYWluT2JqZWN0KHZhbCkpIHtcbiAgICAgIHJlc3VsdFtrZXldID0gbWVyZ2Uoe30sIHZhbCk7XG4gICAgfSBlbHNlIGlmIChpc0FycmF5KHZhbCkpIHtcbiAgICAgIHJlc3VsdFtrZXldID0gdmFsLnNsaWNlKCk7XG4gICAgfSBlbHNlIHtcbiAgICAgIHJlc3VsdFtrZXldID0gdmFsO1xuICAgIH1cbiAgfVxuXG4gIGZvciAodmFyIGkgPSAwLCBsID0gYXJndW1lbnRzLmxlbmd0aDsgaSA8IGw7IGkrKykge1xuICAgIGZvckVhY2goYXJndW1lbnRzW2ldLCBhc3NpZ25WYWx1ZSk7XG4gIH1cbiAgcmV0dXJuIHJlc3VsdDtcbn1cblxuLyoqXG4gKiBFeHRlbmRzIG9iamVjdCBhIGJ5IG11dGFibHkgYWRkaW5nIHRvIGl0IHRoZSBwcm9wZXJ0aWVzIG9mIG9iamVjdCBiLlxuICpcbiAqIEBwYXJhbSB7T2JqZWN0fSBhIFRoZSBvYmplY3QgdG8gYmUgZXh0ZW5kZWRcbiAqIEBwYXJhbSB7T2JqZWN0fSBiIFRoZSBvYmplY3QgdG8gY29weSBwcm9wZXJ0aWVzIGZyb21cbiAqIEBwYXJhbSB7T2JqZWN0fSB0aGlzQXJnIFRoZSBvYmplY3QgdG8gYmluZCBmdW5jdGlvbiB0b1xuICogQHJldHVybiB7T2JqZWN0fSBUaGUgcmVzdWx0aW5nIHZhbHVlIG9mIG9iamVjdCBhXG4gKi9cbmZ1bmN0aW9uIGV4dGVuZChhLCBiLCB0aGlzQXJnKSB7XG4gIGZvckVhY2goYiwgZnVuY3Rpb24gYXNzaWduVmFsdWUodmFsLCBrZXkpIHtcbiAgICBpZiAodGhpc0FyZyAmJiB0eXBlb2YgdmFsID09PSAnZnVuY3Rpb24nKSB7XG4gICAgICBhW2tleV0gPSBiaW5kKHZhbCwgdGhpc0FyZyk7XG4gICAgfSBlbHNlIHtcbiAgICAgIGFba2V5XSA9IHZhbDtcbiAgICB9XG4gIH0pO1xuICByZXR1cm4gYTtcbn1cblxuLyoqXG4gKiBSZW1vdmUgYnl0ZSBvcmRlciBtYXJrZXIuIFRoaXMgY2F0Y2hlcyBFRiBCQiBCRiAodGhlIFVURi04IEJPTSlcbiAqXG4gKiBAcGFyYW0ge3N0cmluZ30gY29udGVudCB3aXRoIEJPTVxuICogQHJldHVybiB7c3RyaW5nfSBjb250ZW50IHZhbHVlIHdpdGhvdXQgQk9NXG4gKi9cbmZ1bmN0aW9uIHN0cmlwQk9NKGNvbnRlbnQpIHtcbiAgaWYgKGNvbnRlbnQuY2hhckNvZGVBdCgwKSA9PT0gMHhGRUZGKSB7XG4gICAgY29udGVudCA9IGNvbnRlbnQuc2xpY2UoMSk7XG4gIH1cbiAgcmV0dXJuIGNvbnRlbnQ7XG59XG5cbi8qKlxuICogSW5oZXJpdCB0aGUgcHJvdG90eXBlIG1ldGhvZHMgZnJvbSBvbmUgY29uc3RydWN0b3IgaW50byBhbm90aGVyXG4gKiBAcGFyYW0ge2Z1bmN0aW9ufSBjb25zdHJ1Y3RvclxuICogQHBhcmFtIHtmdW5jdGlvbn0gc3VwZXJDb25zdHJ1Y3RvclxuICogQHBhcmFtIHtvYmplY3R9IFtwcm9wc11cbiAqIEBwYXJhbSB7b2JqZWN0fSBbZGVzY3JpcHRvcnNdXG4gKi9cblxuZnVuY3Rpb24gaW5oZXJpdHMoY29uc3RydWN0b3IsIHN1cGVyQ29uc3RydWN0b3IsIHByb3BzLCBkZXNjcmlwdG9ycykge1xuICBjb25zdHJ1Y3Rvci5wcm90b3R5cGUgPSBPYmplY3QuY3JlYXRlKHN1cGVyQ29uc3RydWN0b3IucHJvdG90eXBlLCBkZXNjcmlwdG9ycyk7XG4gIGNvbnN0cnVjdG9yLnByb3RvdHlwZS5jb25zdHJ1Y3RvciA9IGNvbnN0cnVjdG9yO1xuICBwcm9wcyAmJiBPYmplY3QuYXNzaWduKGNvbnN0cnVjdG9yLnByb3RvdHlwZSwgcHJvcHMpO1xufVxuXG4vKipcbiAqIFJlc29sdmUgb2JqZWN0IHdpdGggZGVlcCBwcm90b3R5cGUgY2hhaW4gdG8gYSBmbGF0IG9iamVjdFxuICogQHBhcmFtIHtPYmplY3R9IHNvdXJjZU9iaiBzb3VyY2Ugb2JqZWN0XG4gKiBAcGFyYW0ge09iamVjdH0gW2Rlc3RPYmpdXG4gKiBAcGFyYW0ge0Z1bmN0aW9ufSBbZmlsdGVyXVxuICogQHJldHVybnMge09iamVjdH1cbiAqL1xuXG5mdW5jdGlvbiB0b0ZsYXRPYmplY3Qoc291cmNlT2JqLCBkZXN0T2JqLCBmaWx0ZXIpIHtcbiAgdmFyIHByb3BzO1xuICB2YXIgaTtcbiAgdmFyIHByb3A7XG4gIHZhciBtZXJnZWQgPSB7fTtcblxuICBkZXN0T2JqID0gZGVzdE9iaiB8fCB7fTtcblxuICBkbyB7XG4gICAgcHJvcHMgPSBPYmplY3QuZ2V0T3duUHJvcGVydHlOYW1lcyhzb3VyY2VPYmopO1xuICAgIGkgPSBwcm9wcy5sZW5ndGg7XG4gICAgd2hpbGUgKGktLSA+IDApIHtcbiAgICAgIHByb3AgPSBwcm9wc1tpXTtcbiAgICAgIGlmICghbWVyZ2VkW3Byb3BdKSB7XG4gICAgICAgIGRlc3RPYmpbcHJvcF0gPSBzb3VyY2VPYmpbcHJvcF07XG4gICAgICAgIG1lcmdlZFtwcm9wXSA9IHRydWU7XG4gICAgICB9XG4gICAgfVxuICAgIHNvdXJjZU9iaiA9IE9iamVjdC5nZXRQcm90b3R5cGVPZihzb3VyY2VPYmopO1xuICB9IHdoaWxlIChzb3VyY2VPYmogJiYgKCFmaWx0ZXIgfHwgZmlsdGVyKHNvdXJjZU9iaiwgZGVzdE9iaikpICYmIHNvdXJjZU9iaiAhPT0gT2JqZWN0LnByb3RvdHlwZSk7XG5cbiAgcmV0dXJuIGRlc3RPYmo7XG59XG5cbi8qXG4gKiBkZXRlcm1pbmVzIHdoZXRoZXIgYSBzdHJpbmcgZW5kcyB3aXRoIHRoZSBjaGFyYWN0ZXJzIG9mIGEgc3BlY2lmaWVkIHN0cmluZ1xuICogQHBhcmFtIHtTdHJpbmd9IHN0clxuICogQHBhcmFtIHtTdHJpbmd9IHNlYXJjaFN0cmluZ1xuICogQHBhcmFtIHtOdW1iZXJ9IFtwb3NpdGlvbj0gMF1cbiAqIEByZXR1cm5zIHtib29sZWFufVxuICovXG5mdW5jdGlvbiBlbmRzV2l0aChzdHIsIHNlYXJjaFN0cmluZywgcG9zaXRpb24pIHtcbiAgc3RyID0gU3RyaW5nKHN0cik7XG4gIGlmIChwb3NpdGlvbiA9PT0gdW5kZWZpbmVkIHx8IHBvc2l0aW9uID4gc3RyLmxlbmd0aCkge1xuICAgIHBvc2l0aW9uID0gc3RyLmxlbmd0aDtcbiAgfVxuICBwb3NpdGlvbiAtPSBzZWFyY2hTdHJpbmcubGVuZ3RoO1xuICB2YXIgbGFzdEluZGV4ID0gc3RyLmluZGV4T2Yoc2VhcmNoU3RyaW5nLCBwb3NpdGlvbik7XG4gIHJldHVybiBsYXN0SW5kZXggIT09IC0xICYmIGxhc3RJbmRleCA9PT0gcG9zaXRpb247XG59XG5cblxuLyoqXG4gKiBSZXR1cm5zIG5ldyBhcnJheSBmcm9tIGFycmF5IGxpa2Ugb2JqZWN0XG4gKiBAcGFyYW0geyp9IFt0aGluZ11cbiAqIEByZXR1cm5zIHtBcnJheX1cbiAqL1xuZnVuY3Rpb24gdG9BcnJheSh0aGluZykge1xuICBpZiAoIXRoaW5nKSByZXR1cm4gbnVsbDtcbiAgdmFyIGkgPSB0aGluZy5sZW5ndGg7XG4gIGlmIChpc1VuZGVmaW5lZChpKSkgcmV0dXJuIG51bGw7XG4gIHZhciBhcnIgPSBuZXcgQXJyYXkoaSk7XG4gIHdoaWxlIChpLS0gPiAwKSB7XG4gICAgYXJyW2ldID0gdGhpbmdbaV07XG4gIH1cbiAgcmV0dXJuIGFycjtcbn1cblxuLy8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIGZ1bmMtbmFtZXNcbnZhciBpc1R5cGVkQXJyYXkgPSAoZnVuY3Rpb24oVHlwZWRBcnJheSkge1xuICAvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgZnVuYy1uYW1lc1xuICByZXR1cm4gZnVuY3Rpb24odGhpbmcpIHtcbiAgICByZXR1cm4gVHlwZWRBcnJheSAmJiB0aGluZyBpbnN0YW5jZW9mIFR5cGVkQXJyYXk7XG4gIH07XG59KSh0eXBlb2YgVWludDhBcnJheSAhPT0gJ3VuZGVmaW5lZCcgJiYgT2JqZWN0LmdldFByb3RvdHlwZU9mKFVpbnQ4QXJyYXkpKTtcblxubW9kdWxlLmV4cG9ydHMgPSB7XG4gIGlzQXJyYXk6IGlzQXJyYXksXG4gIGlzQXJyYXlCdWZmZXI6IGlzQXJyYXlCdWZmZXIsXG4gIGlzQnVmZmVyOiBpc0J1ZmZlcixcbiAgaXNGb3JtRGF0YTogaXNGb3JtRGF0YSxcbiAgaXNBcnJheUJ1ZmZlclZpZXc6IGlzQXJyYXlCdWZmZXJWaWV3LFxuICBpc1N0cmluZzogaXNTdHJpbmcsXG4gIGlzTnVtYmVyOiBpc051bWJlcixcbiAgaXNPYmplY3Q6IGlzT2JqZWN0LFxuICBpc1BsYWluT2JqZWN0OiBpc1BsYWluT2JqZWN0LFxuICBpc1VuZGVmaW5lZDogaXNVbmRlZmluZWQsXG4gIGlzRGF0ZTogaXNEYXRlLFxuICBpc0ZpbGU6IGlzRmlsZSxcbiAgaXNCbG9iOiBpc0Jsb2IsXG4gIGlzRnVuY3Rpb246IGlzRnVuY3Rpb24sXG4gIGlzU3RyZWFtOiBpc1N0cmVhbSxcbiAgaXNVUkxTZWFyY2hQYXJhbXM6IGlzVVJMU2VhcmNoUGFyYW1zLFxuICBpc1N0YW5kYXJkQnJvd3NlckVudjogaXNTdGFuZGFyZEJyb3dzZXJFbnYsXG4gIGZvckVhY2g6IGZvckVhY2gsXG4gIG1lcmdlOiBtZXJnZSxcbiAgZXh0ZW5kOiBleHRlbmQsXG4gIHRyaW06IHRyaW0sXG4gIHN0cmlwQk9NOiBzdHJpcEJPTSxcbiAgaW5oZXJpdHM6IGluaGVyaXRzLFxuICB0b0ZsYXRPYmplY3Q6IHRvRmxhdE9iamVjdCxcbiAga2luZE9mOiBraW5kT2YsXG4gIGtpbmRPZlRlc3Q6IGtpbmRPZlRlc3QsXG4gIGVuZHNXaXRoOiBlbmRzV2l0aCxcbiAgdG9BcnJheTogdG9BcnJheSxcbiAgaXNUeXBlZEFycmF5OiBpc1R5cGVkQXJyYXksXG4gIGlzRmlsZUxpc3Q6IGlzRmlsZUxpc3Rcbn07XG4iLCAiJ3VzZSBzdHJpY3QnO1xuXG52YXIgdXRpbHMgPSByZXF1aXJlKCcuLy4uL3V0aWxzJyk7XG5cbmZ1bmN0aW9uIGVuY29kZSh2YWwpIHtcbiAgcmV0dXJuIGVuY29kZVVSSUNvbXBvbmVudCh2YWwpLlxuICAgIHJlcGxhY2UoLyUzQS9naSwgJzonKS5cbiAgICByZXBsYWNlKC8lMjQvZywgJyQnKS5cbiAgICByZXBsYWNlKC8lMkMvZ2ksICcsJykuXG4gICAgcmVwbGFjZSgvJTIwL2csICcrJykuXG4gICAgcmVwbGFjZSgvJTVCL2dpLCAnWycpLlxuICAgIHJlcGxhY2UoLyU1RC9naSwgJ10nKTtcbn1cblxuLyoqXG4gKiBCdWlsZCBhIFVSTCBieSBhcHBlbmRpbmcgcGFyYW1zIHRvIHRoZSBlbmRcbiAqXG4gKiBAcGFyYW0ge3N0cmluZ30gdXJsIFRoZSBiYXNlIG9mIHRoZSB1cmwgKGUuZy4sIGh0dHA6Ly93d3cuZ29vZ2xlLmNvbSlcbiAqIEBwYXJhbSB7b2JqZWN0fSBbcGFyYW1zXSBUaGUgcGFyYW1zIHRvIGJlIGFwcGVuZGVkXG4gKiBAcmV0dXJucyB7c3RyaW5nfSBUaGUgZm9ybWF0dGVkIHVybFxuICovXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIGJ1aWxkVVJMKHVybCwgcGFyYW1zLCBwYXJhbXNTZXJpYWxpemVyKSB7XG4gIC8qZXNsaW50IG5vLXBhcmFtLXJlYXNzaWduOjAqL1xuICBpZiAoIXBhcmFtcykge1xuICAgIHJldHVybiB1cmw7XG4gIH1cblxuICB2YXIgc2VyaWFsaXplZFBhcmFtcztcbiAgaWYgKHBhcmFtc1NlcmlhbGl6ZXIpIHtcbiAgICBzZXJpYWxpemVkUGFyYW1zID0gcGFyYW1zU2VyaWFsaXplcihwYXJhbXMpO1xuICB9IGVsc2UgaWYgKHV0aWxzLmlzVVJMU2VhcmNoUGFyYW1zKHBhcmFtcykpIHtcbiAgICBzZXJpYWxpemVkUGFyYW1zID0gcGFyYW1zLnRvU3RyaW5nKCk7XG4gIH0gZWxzZSB7XG4gICAgdmFyIHBhcnRzID0gW107XG5cbiAgICB1dGlscy5mb3JFYWNoKHBhcmFtcywgZnVuY3Rpb24gc2VyaWFsaXplKHZhbCwga2V5KSB7XG4gICAgICBpZiAodmFsID09PSBudWxsIHx8IHR5cGVvZiB2YWwgPT09ICd1bmRlZmluZWQnKSB7XG4gICAgICAgIHJldHVybjtcbiAgICAgIH1cblxuICAgICAgaWYgKHV0aWxzLmlzQXJyYXkodmFsKSkge1xuICAgICAgICBrZXkgPSBrZXkgKyAnW10nO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgdmFsID0gW3ZhbF07XG4gICAgICB9XG5cbiAgICAgIHV0aWxzLmZvckVhY2godmFsLCBmdW5jdGlvbiBwYXJzZVZhbHVlKHYpIHtcbiAgICAgICAgaWYgKHV0aWxzLmlzRGF0ZSh2KSkge1xuICAgICAgICAgIHYgPSB2LnRvSVNPU3RyaW5nKCk7XG4gICAgICAgIH0gZWxzZSBpZiAodXRpbHMuaXNPYmplY3QodikpIHtcbiAgICAgICAgICB2ID0gSlNPTi5zdHJpbmdpZnkodik7XG4gICAgICAgIH1cbiAgICAgICAgcGFydHMucHVzaChlbmNvZGUoa2V5KSArICc9JyArIGVuY29kZSh2KSk7XG4gICAgICB9KTtcbiAgICB9KTtcblxuICAgIHNlcmlhbGl6ZWRQYXJhbXMgPSBwYXJ0cy5qb2luKCcmJyk7XG4gIH1cblxuICBpZiAoc2VyaWFsaXplZFBhcmFtcykge1xuICAgIHZhciBoYXNobWFya0luZGV4ID0gdXJsLmluZGV4T2YoJyMnKTtcbiAgICBpZiAoaGFzaG1hcmtJbmRleCAhPT0gLTEpIHtcbiAgICAgIHVybCA9IHVybC5zbGljZSgwLCBoYXNobWFya0luZGV4KTtcbiAgICB9XG5cbiAgICB1cmwgKz0gKHVybC5pbmRleE9mKCc/JykgPT09IC0xID8gJz8nIDogJyYnKSArIHNlcmlhbGl6ZWRQYXJhbXM7XG4gIH1cblxuICByZXR1cm4gdXJsO1xufTtcbiIsICIndXNlIHN0cmljdCc7XG5cbnZhciB1dGlscyA9IHJlcXVpcmUoJy4vLi4vdXRpbHMnKTtcblxuZnVuY3Rpb24gSW50ZXJjZXB0b3JNYW5hZ2VyKCkge1xuICB0aGlzLmhhbmRsZXJzID0gW107XG59XG5cbi8qKlxuICogQWRkIGEgbmV3IGludGVyY2VwdG9yIHRvIHRoZSBzdGFja1xuICpcbiAqIEBwYXJhbSB7RnVuY3Rpb259IGZ1bGZpbGxlZCBUaGUgZnVuY3Rpb24gdG8gaGFuZGxlIGB0aGVuYCBmb3IgYSBgUHJvbWlzZWBcbiAqIEBwYXJhbSB7RnVuY3Rpb259IHJlamVjdGVkIFRoZSBmdW5jdGlvbiB0byBoYW5kbGUgYHJlamVjdGAgZm9yIGEgYFByb21pc2VgXG4gKlxuICogQHJldHVybiB7TnVtYmVyfSBBbiBJRCB1c2VkIHRvIHJlbW92ZSBpbnRlcmNlcHRvciBsYXRlclxuICovXG5JbnRlcmNlcHRvck1hbmFnZXIucHJvdG90eXBlLnVzZSA9IGZ1bmN0aW9uIHVzZShmdWxmaWxsZWQsIHJlamVjdGVkLCBvcHRpb25zKSB7XG4gIHRoaXMuaGFuZGxlcnMucHVzaCh7XG4gICAgZnVsZmlsbGVkOiBmdWxmaWxsZWQsXG4gICAgcmVqZWN0ZWQ6IHJlamVjdGVkLFxuICAgIHN5bmNocm9ub3VzOiBvcHRpb25zID8gb3B0aW9ucy5zeW5jaHJvbm91cyA6IGZhbHNlLFxuICAgIHJ1bldoZW46IG9wdGlvbnMgPyBvcHRpb25zLnJ1bldoZW4gOiBudWxsXG4gIH0pO1xuICByZXR1cm4gdGhpcy5oYW5kbGVycy5sZW5ndGggLSAxO1xufTtcblxuLyoqXG4gKiBSZW1vdmUgYW4gaW50ZXJjZXB0b3IgZnJvbSB0aGUgc3RhY2tcbiAqXG4gKiBAcGFyYW0ge051bWJlcn0gaWQgVGhlIElEIHRoYXQgd2FzIHJldHVybmVkIGJ5IGB1c2VgXG4gKi9cbkludGVyY2VwdG9yTWFuYWdlci5wcm90b3R5cGUuZWplY3QgPSBmdW5jdGlvbiBlamVjdChpZCkge1xuICBpZiAodGhpcy5oYW5kbGVyc1tpZF0pIHtcbiAgICB0aGlzLmhhbmRsZXJzW2lkXSA9IG51bGw7XG4gIH1cbn07XG5cbi8qKlxuICogSXRlcmF0ZSBvdmVyIGFsbCB0aGUgcmVnaXN0ZXJlZCBpbnRlcmNlcHRvcnNcbiAqXG4gKiBUaGlzIG1ldGhvZCBpcyBwYXJ0aWN1bGFybHkgdXNlZnVsIGZvciBza2lwcGluZyBvdmVyIGFueVxuICogaW50ZXJjZXB0b3JzIHRoYXQgbWF5IGhhdmUgYmVjb21lIGBudWxsYCBjYWxsaW5nIGBlamVjdGAuXG4gKlxuICogQHBhcmFtIHtGdW5jdGlvbn0gZm4gVGhlIGZ1bmN0aW9uIHRvIGNhbGwgZm9yIGVhY2ggaW50ZXJjZXB0b3JcbiAqL1xuSW50ZXJjZXB0b3JNYW5hZ2VyLnByb3RvdHlwZS5mb3JFYWNoID0gZnVuY3Rpb24gZm9yRWFjaChmbikge1xuICB1dGlscy5mb3JFYWNoKHRoaXMuaGFuZGxlcnMsIGZ1bmN0aW9uIGZvckVhY2hIYW5kbGVyKGgpIHtcbiAgICBpZiAoaCAhPT0gbnVsbCkge1xuICAgICAgZm4oaCk7XG4gICAgfVxuICB9KTtcbn07XG5cbm1vZHVsZS5leHBvcnRzID0gSW50ZXJjZXB0b3JNYW5hZ2VyO1xuIiwgIid1c2Ugc3RyaWN0JztcblxudmFyIHV0aWxzID0gcmVxdWlyZSgnLi4vdXRpbHMnKTtcblxubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiBub3JtYWxpemVIZWFkZXJOYW1lKGhlYWRlcnMsIG5vcm1hbGl6ZWROYW1lKSB7XG4gIHV0aWxzLmZvckVhY2goaGVhZGVycywgZnVuY3Rpb24gcHJvY2Vzc0hlYWRlcih2YWx1ZSwgbmFtZSkge1xuICAgIGlmIChuYW1lICE9PSBub3JtYWxpemVkTmFtZSAmJiBuYW1lLnRvVXBwZXJDYXNlKCkgPT09IG5vcm1hbGl6ZWROYW1lLnRvVXBwZXJDYXNlKCkpIHtcbiAgICAgIGhlYWRlcnNbbm9ybWFsaXplZE5hbWVdID0gdmFsdWU7XG4gICAgICBkZWxldGUgaGVhZGVyc1tuYW1lXTtcbiAgICB9XG4gIH0pO1xufTtcbiIsICIndXNlIHN0cmljdCc7XG5cbnZhciB1dGlscyA9IHJlcXVpcmUoJy4uL3V0aWxzJyk7XG5cbi8qKlxuICogQ3JlYXRlIGFuIEVycm9yIHdpdGggdGhlIHNwZWNpZmllZCBtZXNzYWdlLCBjb25maWcsIGVycm9yIGNvZGUsIHJlcXVlc3QgYW5kIHJlc3BvbnNlLlxuICpcbiAqIEBwYXJhbSB7c3RyaW5nfSBtZXNzYWdlIFRoZSBlcnJvciBtZXNzYWdlLlxuICogQHBhcmFtIHtzdHJpbmd9IFtjb2RlXSBUaGUgZXJyb3IgY29kZSAoZm9yIGV4YW1wbGUsICdFQ09OTkFCT1JURUQnKS5cbiAqIEBwYXJhbSB7T2JqZWN0fSBbY29uZmlnXSBUaGUgY29uZmlnLlxuICogQHBhcmFtIHtPYmplY3R9IFtyZXF1ZXN0XSBUaGUgcmVxdWVzdC5cbiAqIEBwYXJhbSB7T2JqZWN0fSBbcmVzcG9uc2VdIFRoZSByZXNwb25zZS5cbiAqIEByZXR1cm5zIHtFcnJvcn0gVGhlIGNyZWF0ZWQgZXJyb3IuXG4gKi9cbmZ1bmN0aW9uIEF4aW9zRXJyb3IobWVzc2FnZSwgY29kZSwgY29uZmlnLCByZXF1ZXN0LCByZXNwb25zZSkge1xuICBFcnJvci5jYWxsKHRoaXMpO1xuICB0aGlzLm1lc3NhZ2UgPSBtZXNzYWdlO1xuICB0aGlzLm5hbWUgPSAnQXhpb3NFcnJvcic7XG4gIGNvZGUgJiYgKHRoaXMuY29kZSA9IGNvZGUpO1xuICBjb25maWcgJiYgKHRoaXMuY29uZmlnID0gY29uZmlnKTtcbiAgcmVxdWVzdCAmJiAodGhpcy5yZXF1ZXN0ID0gcmVxdWVzdCk7XG4gIHJlc3BvbnNlICYmICh0aGlzLnJlc3BvbnNlID0gcmVzcG9uc2UpO1xufVxuXG51dGlscy5pbmhlcml0cyhBeGlvc0Vycm9yLCBFcnJvciwge1xuICB0b0pTT046IGZ1bmN0aW9uIHRvSlNPTigpIHtcbiAgICByZXR1cm4ge1xuICAgICAgLy8gU3RhbmRhcmRcbiAgICAgIG1lc3NhZ2U6IHRoaXMubWVzc2FnZSxcbiAgICAgIG5hbWU6IHRoaXMubmFtZSxcbiAgICAgIC8vIE1pY3Jvc29mdFxuICAgICAgZGVzY3JpcHRpb246IHRoaXMuZGVzY3JpcHRpb24sXG4gICAgICBudW1iZXI6IHRoaXMubnVtYmVyLFxuICAgICAgLy8gTW96aWxsYVxuICAgICAgZmlsZU5hbWU6IHRoaXMuZmlsZU5hbWUsXG4gICAgICBsaW5lTnVtYmVyOiB0aGlzLmxpbmVOdW1iZXIsXG4gICAgICBjb2x1bW5OdW1iZXI6IHRoaXMuY29sdW1uTnVtYmVyLFxuICAgICAgc3RhY2s6IHRoaXMuc3RhY2ssXG4gICAgICAvLyBBeGlvc1xuICAgICAgY29uZmlnOiB0aGlzLmNvbmZpZyxcbiAgICAgIGNvZGU6IHRoaXMuY29kZSxcbiAgICAgIHN0YXR1czogdGhpcy5yZXNwb25zZSAmJiB0aGlzLnJlc3BvbnNlLnN0YXR1cyA/IHRoaXMucmVzcG9uc2Uuc3RhdHVzIDogbnVsbFxuICAgIH07XG4gIH1cbn0pO1xuXG52YXIgcHJvdG90eXBlID0gQXhpb3NFcnJvci5wcm90b3R5cGU7XG52YXIgZGVzY3JpcHRvcnMgPSB7fTtcblxuW1xuICAnRVJSX0JBRF9PUFRJT05fVkFMVUUnLFxuICAnRVJSX0JBRF9PUFRJT04nLFxuICAnRUNPTk5BQk9SVEVEJyxcbiAgJ0VUSU1FRE9VVCcsXG4gICdFUlJfTkVUV09SSycsXG4gICdFUlJfRlJfVE9PX01BTllfUkVESVJFQ1RTJyxcbiAgJ0VSUl9ERVBSRUNBVEVEJyxcbiAgJ0VSUl9CQURfUkVTUE9OU0UnLFxuICAnRVJSX0JBRF9SRVFVRVNUJyxcbiAgJ0VSUl9DQU5DRUxFRCdcbi8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBmdW5jLW5hbWVzXG5dLmZvckVhY2goZnVuY3Rpb24oY29kZSkge1xuICBkZXNjcmlwdG9yc1tjb2RlXSA9IHt2YWx1ZTogY29kZX07XG59KTtcblxuT2JqZWN0LmRlZmluZVByb3BlcnRpZXMoQXhpb3NFcnJvciwgZGVzY3JpcHRvcnMpO1xuT2JqZWN0LmRlZmluZVByb3BlcnR5KHByb3RvdHlwZSwgJ2lzQXhpb3NFcnJvcicsIHt2YWx1ZTogdHJ1ZX0pO1xuXG4vLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgZnVuYy1uYW1lc1xuQXhpb3NFcnJvci5mcm9tID0gZnVuY3Rpb24oZXJyb3IsIGNvZGUsIGNvbmZpZywgcmVxdWVzdCwgcmVzcG9uc2UsIGN1c3RvbVByb3BzKSB7XG4gIHZhciBheGlvc0Vycm9yID0gT2JqZWN0LmNyZWF0ZShwcm90b3R5cGUpO1xuXG4gIHV0aWxzLnRvRmxhdE9iamVjdChlcnJvciwgYXhpb3NFcnJvciwgZnVuY3Rpb24gZmlsdGVyKG9iaikge1xuICAgIHJldHVybiBvYmogIT09IEVycm9yLnByb3RvdHlwZTtcbiAgfSk7XG5cbiAgQXhpb3NFcnJvci5jYWxsKGF4aW9zRXJyb3IsIGVycm9yLm1lc3NhZ2UsIGNvZGUsIGNvbmZpZywgcmVxdWVzdCwgcmVzcG9uc2UpO1xuXG4gIGF4aW9zRXJyb3IubmFtZSA9IGVycm9yLm5hbWU7XG5cbiAgY3VzdG9tUHJvcHMgJiYgT2JqZWN0LmFzc2lnbihheGlvc0Vycm9yLCBjdXN0b21Qcm9wcyk7XG5cbiAgcmV0dXJuIGF4aW9zRXJyb3I7XG59O1xuXG5tb2R1bGUuZXhwb3J0cyA9IEF4aW9zRXJyb3I7XG4iLCAiJ3VzZSBzdHJpY3QnO1xuXG5tb2R1bGUuZXhwb3J0cyA9IHtcbiAgc2lsZW50SlNPTlBhcnNpbmc6IHRydWUsXG4gIGZvcmNlZEpTT05QYXJzaW5nOiB0cnVlLFxuICBjbGFyaWZ5VGltZW91dEVycm9yOiBmYWxzZVxufTtcbiIsICIndXNlIHN0cmljdCc7XG5cbnZhciB1dGlscyA9IHJlcXVpcmUoJy4uL3V0aWxzJyk7XG5cbi8qKlxuICogQ29udmVydCBhIGRhdGEgb2JqZWN0IHRvIEZvcm1EYXRhXG4gKiBAcGFyYW0ge09iamVjdH0gb2JqXG4gKiBAcGFyYW0gez9PYmplY3R9IFtmb3JtRGF0YV1cbiAqIEByZXR1cm5zIHtPYmplY3R9XG4gKiovXG5cbmZ1bmN0aW9uIHRvRm9ybURhdGEob2JqLCBmb3JtRGF0YSkge1xuICAvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgbm8tcGFyYW0tcmVhc3NpZ25cbiAgZm9ybURhdGEgPSBmb3JtRGF0YSB8fCBuZXcgRm9ybURhdGEoKTtcblxuICB2YXIgc3RhY2sgPSBbXTtcblxuICBmdW5jdGlvbiBjb252ZXJ0VmFsdWUodmFsdWUpIHtcbiAgICBpZiAodmFsdWUgPT09IG51bGwpIHJldHVybiAnJztcblxuICAgIGlmICh1dGlscy5pc0RhdGUodmFsdWUpKSB7XG4gICAgICByZXR1cm4gdmFsdWUudG9JU09TdHJpbmcoKTtcbiAgICB9XG5cbiAgICBpZiAodXRpbHMuaXNBcnJheUJ1ZmZlcih2YWx1ZSkgfHwgdXRpbHMuaXNUeXBlZEFycmF5KHZhbHVlKSkge1xuICAgICAgcmV0dXJuIHR5cGVvZiBCbG9iID09PSAnZnVuY3Rpb24nID8gbmV3IEJsb2IoW3ZhbHVlXSkgOiBCdWZmZXIuZnJvbSh2YWx1ZSk7XG4gICAgfVxuXG4gICAgcmV0dXJuIHZhbHVlO1xuICB9XG5cbiAgZnVuY3Rpb24gYnVpbGQoZGF0YSwgcGFyZW50S2V5KSB7XG4gICAgaWYgKHV0aWxzLmlzUGxhaW5PYmplY3QoZGF0YSkgfHwgdXRpbHMuaXNBcnJheShkYXRhKSkge1xuICAgICAgaWYgKHN0YWNrLmluZGV4T2YoZGF0YSkgIT09IC0xKSB7XG4gICAgICAgIHRocm93IEVycm9yKCdDaXJjdWxhciByZWZlcmVuY2UgZGV0ZWN0ZWQgaW4gJyArIHBhcmVudEtleSk7XG4gICAgICB9XG5cbiAgICAgIHN0YWNrLnB1c2goZGF0YSk7XG5cbiAgICAgIHV0aWxzLmZvckVhY2goZGF0YSwgZnVuY3Rpb24gZWFjaCh2YWx1ZSwga2V5KSB7XG4gICAgICAgIGlmICh1dGlscy5pc1VuZGVmaW5lZCh2YWx1ZSkpIHJldHVybjtcbiAgICAgICAgdmFyIGZ1bGxLZXkgPSBwYXJlbnRLZXkgPyBwYXJlbnRLZXkgKyAnLicgKyBrZXkgOiBrZXk7XG4gICAgICAgIHZhciBhcnI7XG5cbiAgICAgICAgaWYgKHZhbHVlICYmICFwYXJlbnRLZXkgJiYgdHlwZW9mIHZhbHVlID09PSAnb2JqZWN0Jykge1xuICAgICAgICAgIGlmICh1dGlscy5lbmRzV2l0aChrZXksICd7fScpKSB7XG4gICAgICAgICAgICAvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgbm8tcGFyYW0tcmVhc3NpZ25cbiAgICAgICAgICAgIHZhbHVlID0gSlNPTi5zdHJpbmdpZnkodmFsdWUpO1xuICAgICAgICAgIH0gZWxzZSBpZiAodXRpbHMuZW5kc1dpdGgoa2V5LCAnW10nKSAmJiAoYXJyID0gdXRpbHMudG9BcnJheSh2YWx1ZSkpKSB7XG4gICAgICAgICAgICAvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgZnVuYy1uYW1lc1xuICAgICAgICAgICAgYXJyLmZvckVhY2goZnVuY3Rpb24oZWwpIHtcbiAgICAgICAgICAgICAgIXV0aWxzLmlzVW5kZWZpbmVkKGVsKSAmJiBmb3JtRGF0YS5hcHBlbmQoZnVsbEtleSwgY29udmVydFZhbHVlKGVsKSk7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICB9XG4gICAgICAgIH1cblxuICAgICAgICBidWlsZCh2YWx1ZSwgZnVsbEtleSk7XG4gICAgICB9KTtcblxuICAgICAgc3RhY2sucG9wKCk7XG4gICAgfSBlbHNlIHtcbiAgICAgIGZvcm1EYXRhLmFwcGVuZChwYXJlbnRLZXksIGNvbnZlcnRWYWx1ZShkYXRhKSk7XG4gICAgfVxuICB9XG5cbiAgYnVpbGQob2JqKTtcblxuICByZXR1cm4gZm9ybURhdGE7XG59XG5cbm1vZHVsZS5leHBvcnRzID0gdG9Gb3JtRGF0YTtcbiIsICIndXNlIHN0cmljdCc7XG5cbnZhciBBeGlvc0Vycm9yID0gcmVxdWlyZSgnLi9BeGlvc0Vycm9yJyk7XG5cbi8qKlxuICogUmVzb2x2ZSBvciByZWplY3QgYSBQcm9taXNlIGJhc2VkIG9uIHJlc3BvbnNlIHN0YXR1cy5cbiAqXG4gKiBAcGFyYW0ge0Z1bmN0aW9ufSByZXNvbHZlIEEgZnVuY3Rpb24gdGhhdCByZXNvbHZlcyB0aGUgcHJvbWlzZS5cbiAqIEBwYXJhbSB7RnVuY3Rpb259IHJlamVjdCBBIGZ1bmN0aW9uIHRoYXQgcmVqZWN0cyB0aGUgcHJvbWlzZS5cbiAqIEBwYXJhbSB7b2JqZWN0fSByZXNwb25zZSBUaGUgcmVzcG9uc2UuXG4gKi9cbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gc2V0dGxlKHJlc29sdmUsIHJlamVjdCwgcmVzcG9uc2UpIHtcbiAgdmFyIHZhbGlkYXRlU3RhdHVzID0gcmVzcG9uc2UuY29uZmlnLnZhbGlkYXRlU3RhdHVzO1xuICBpZiAoIXJlc3BvbnNlLnN0YXR1cyB8fCAhdmFsaWRhdGVTdGF0dXMgfHwgdmFsaWRhdGVTdGF0dXMocmVzcG9uc2Uuc3RhdHVzKSkge1xuICAgIHJlc29sdmUocmVzcG9uc2UpO1xuICB9IGVsc2Uge1xuICAgIHJlamVjdChuZXcgQXhpb3NFcnJvcihcbiAgICAgICdSZXF1ZXN0IGZhaWxlZCB3aXRoIHN0YXR1cyBjb2RlICcgKyByZXNwb25zZS5zdGF0dXMsXG4gICAgICBbQXhpb3NFcnJvci5FUlJfQkFEX1JFUVVFU1QsIEF4aW9zRXJyb3IuRVJSX0JBRF9SRVNQT05TRV1bTWF0aC5mbG9vcihyZXNwb25zZS5zdGF0dXMgLyAxMDApIC0gNF0sXG4gICAgICByZXNwb25zZS5jb25maWcsXG4gICAgICByZXNwb25zZS5yZXF1ZXN0LFxuICAgICAgcmVzcG9uc2VcbiAgICApKTtcbiAgfVxufTtcbiIsICIndXNlIHN0cmljdCc7XG5cbnZhciB1dGlscyA9IHJlcXVpcmUoJy4vLi4vdXRpbHMnKTtcblxubW9kdWxlLmV4cG9ydHMgPSAoXG4gIHV0aWxzLmlzU3RhbmRhcmRCcm93c2VyRW52KCkgP1xuXG4gIC8vIFN0YW5kYXJkIGJyb3dzZXIgZW52cyBzdXBwb3J0IGRvY3VtZW50LmNvb2tpZVxuICAgIChmdW5jdGlvbiBzdGFuZGFyZEJyb3dzZXJFbnYoKSB7XG4gICAgICByZXR1cm4ge1xuICAgICAgICB3cml0ZTogZnVuY3Rpb24gd3JpdGUobmFtZSwgdmFsdWUsIGV4cGlyZXMsIHBhdGgsIGRvbWFpbiwgc2VjdXJlKSB7XG4gICAgICAgICAgdmFyIGNvb2tpZSA9IFtdO1xuICAgICAgICAgIGNvb2tpZS5wdXNoKG5hbWUgKyAnPScgKyBlbmNvZGVVUklDb21wb25lbnQodmFsdWUpKTtcblxuICAgICAgICAgIGlmICh1dGlscy5pc051bWJlcihleHBpcmVzKSkge1xuICAgICAgICAgICAgY29va2llLnB1c2goJ2V4cGlyZXM9JyArIG5ldyBEYXRlKGV4cGlyZXMpLnRvR01UU3RyaW5nKCkpO1xuICAgICAgICAgIH1cblxuICAgICAgICAgIGlmICh1dGlscy5pc1N0cmluZyhwYXRoKSkge1xuICAgICAgICAgICAgY29va2llLnB1c2goJ3BhdGg9JyArIHBhdGgpO1xuICAgICAgICAgIH1cblxuICAgICAgICAgIGlmICh1dGlscy5pc1N0cmluZyhkb21haW4pKSB7XG4gICAgICAgICAgICBjb29raWUucHVzaCgnZG9tYWluPScgKyBkb21haW4pO1xuICAgICAgICAgIH1cblxuICAgICAgICAgIGlmIChzZWN1cmUgPT09IHRydWUpIHtcbiAgICAgICAgICAgIGNvb2tpZS5wdXNoKCdzZWN1cmUnKTtcbiAgICAgICAgICB9XG5cbiAgICAgICAgICBkb2N1bWVudC5jb29raWUgPSBjb29raWUuam9pbignOyAnKTtcbiAgICAgICAgfSxcblxuICAgICAgICByZWFkOiBmdW5jdGlvbiByZWFkKG5hbWUpIHtcbiAgICAgICAgICB2YXIgbWF0Y2ggPSBkb2N1bWVudC5jb29raWUubWF0Y2gobmV3IFJlZ0V4cCgnKF58O1xcXFxzKikoJyArIG5hbWUgKyAnKT0oW147XSopJykpO1xuICAgICAgICAgIHJldHVybiAobWF0Y2ggPyBkZWNvZGVVUklDb21wb25lbnQobWF0Y2hbM10pIDogbnVsbCk7XG4gICAgICAgIH0sXG5cbiAgICAgICAgcmVtb3ZlOiBmdW5jdGlvbiByZW1vdmUobmFtZSkge1xuICAgICAgICAgIHRoaXMud3JpdGUobmFtZSwgJycsIERhdGUubm93KCkgLSA4NjQwMDAwMCk7XG4gICAgICAgIH1cbiAgICAgIH07XG4gICAgfSkoKSA6XG5cbiAgLy8gTm9uIHN0YW5kYXJkIGJyb3dzZXIgZW52ICh3ZWIgd29ya2VycywgcmVhY3QtbmF0aXZlKSBsYWNrIG5lZWRlZCBzdXBwb3J0LlxuICAgIChmdW5jdGlvbiBub25TdGFuZGFyZEJyb3dzZXJFbnYoKSB7XG4gICAgICByZXR1cm4ge1xuICAgICAgICB3cml0ZTogZnVuY3Rpb24gd3JpdGUoKSB7fSxcbiAgICAgICAgcmVhZDogZnVuY3Rpb24gcmVhZCgpIHsgcmV0dXJuIG51bGw7IH0sXG4gICAgICAgIHJlbW92ZTogZnVuY3Rpb24gcmVtb3ZlKCkge31cbiAgICAgIH07XG4gICAgfSkoKVxuKTtcbiIsICIndXNlIHN0cmljdCc7XG5cbi8qKlxuICogRGV0ZXJtaW5lcyB3aGV0aGVyIHRoZSBzcGVjaWZpZWQgVVJMIGlzIGFic29sdXRlXG4gKlxuICogQHBhcmFtIHtzdHJpbmd9IHVybCBUaGUgVVJMIHRvIHRlc3RcbiAqIEByZXR1cm5zIHtib29sZWFufSBUcnVlIGlmIHRoZSBzcGVjaWZpZWQgVVJMIGlzIGFic29sdXRlLCBvdGhlcndpc2UgZmFsc2VcbiAqL1xubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiBpc0Fic29sdXRlVVJMKHVybCkge1xuICAvLyBBIFVSTCBpcyBjb25zaWRlcmVkIGFic29sdXRlIGlmIGl0IGJlZ2lucyB3aXRoIFwiPHNjaGVtZT46Ly9cIiBvciBcIi8vXCIgKHByb3RvY29sLXJlbGF0aXZlIFVSTCkuXG4gIC8vIFJGQyAzOTg2IGRlZmluZXMgc2NoZW1lIG5hbWUgYXMgYSBzZXF1ZW5jZSBvZiBjaGFyYWN0ZXJzIGJlZ2lubmluZyB3aXRoIGEgbGV0dGVyIGFuZCBmb2xsb3dlZFxuICAvLyBieSBhbnkgY29tYmluYXRpb24gb2YgbGV0dGVycywgZGlnaXRzLCBwbHVzLCBwZXJpb2QsIG9yIGh5cGhlbi5cbiAgcmV0dXJuIC9eKFthLXpdW2EtelxcZCtcXC0uXSo6KT9cXC9cXC8vaS50ZXN0KHVybCk7XG59O1xuIiwgIid1c2Ugc3RyaWN0JztcblxuLyoqXG4gKiBDcmVhdGVzIGEgbmV3IFVSTCBieSBjb21iaW5pbmcgdGhlIHNwZWNpZmllZCBVUkxzXG4gKlxuICogQHBhcmFtIHtzdHJpbmd9IGJhc2VVUkwgVGhlIGJhc2UgVVJMXG4gKiBAcGFyYW0ge3N0cmluZ30gcmVsYXRpdmVVUkwgVGhlIHJlbGF0aXZlIFVSTFxuICogQHJldHVybnMge3N0cmluZ30gVGhlIGNvbWJpbmVkIFVSTFxuICovXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIGNvbWJpbmVVUkxzKGJhc2VVUkwsIHJlbGF0aXZlVVJMKSB7XG4gIHJldHVybiByZWxhdGl2ZVVSTFxuICAgID8gYmFzZVVSTC5yZXBsYWNlKC9cXC8rJC8sICcnKSArICcvJyArIHJlbGF0aXZlVVJMLnJlcGxhY2UoL15cXC8rLywgJycpXG4gICAgOiBiYXNlVVJMO1xufTtcbiIsICIndXNlIHN0cmljdCc7XG5cbnZhciBpc0Fic29sdXRlVVJMID0gcmVxdWlyZSgnLi4vaGVscGVycy9pc0Fic29sdXRlVVJMJyk7XG52YXIgY29tYmluZVVSTHMgPSByZXF1aXJlKCcuLi9oZWxwZXJzL2NvbWJpbmVVUkxzJyk7XG5cbi8qKlxuICogQ3JlYXRlcyBhIG5ldyBVUkwgYnkgY29tYmluaW5nIHRoZSBiYXNlVVJMIHdpdGggdGhlIHJlcXVlc3RlZFVSTCxcbiAqIG9ubHkgd2hlbiB0aGUgcmVxdWVzdGVkVVJMIGlzIG5vdCBhbHJlYWR5IGFuIGFic29sdXRlIFVSTC5cbiAqIElmIHRoZSByZXF1ZXN0VVJMIGlzIGFic29sdXRlLCB0aGlzIGZ1bmN0aW9uIHJldHVybnMgdGhlIHJlcXVlc3RlZFVSTCB1bnRvdWNoZWQuXG4gKlxuICogQHBhcmFtIHtzdHJpbmd9IGJhc2VVUkwgVGhlIGJhc2UgVVJMXG4gKiBAcGFyYW0ge3N0cmluZ30gcmVxdWVzdGVkVVJMIEFic29sdXRlIG9yIHJlbGF0aXZlIFVSTCB0byBjb21iaW5lXG4gKiBAcmV0dXJucyB7c3RyaW5nfSBUaGUgY29tYmluZWQgZnVsbCBwYXRoXG4gKi9cbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gYnVpbGRGdWxsUGF0aChiYXNlVVJMLCByZXF1ZXN0ZWRVUkwpIHtcbiAgaWYgKGJhc2VVUkwgJiYgIWlzQWJzb2x1dGVVUkwocmVxdWVzdGVkVVJMKSkge1xuICAgIHJldHVybiBjb21iaW5lVVJMcyhiYXNlVVJMLCByZXF1ZXN0ZWRVUkwpO1xuICB9XG4gIHJldHVybiByZXF1ZXN0ZWRVUkw7XG59O1xuIiwgIid1c2Ugc3RyaWN0JztcblxudmFyIHV0aWxzID0gcmVxdWlyZSgnLi8uLi91dGlscycpO1xuXG4vLyBIZWFkZXJzIHdob3NlIGR1cGxpY2F0ZXMgYXJlIGlnbm9yZWQgYnkgbm9kZVxuLy8gYy5mLiBodHRwczovL25vZGVqcy5vcmcvYXBpL2h0dHAuaHRtbCNodHRwX21lc3NhZ2VfaGVhZGVyc1xudmFyIGlnbm9yZUR1cGxpY2F0ZU9mID0gW1xuICAnYWdlJywgJ2F1dGhvcml6YXRpb24nLCAnY29udGVudC1sZW5ndGgnLCAnY29udGVudC10eXBlJywgJ2V0YWcnLFxuICAnZXhwaXJlcycsICdmcm9tJywgJ2hvc3QnLCAnaWYtbW9kaWZpZWQtc2luY2UnLCAnaWYtdW5tb2RpZmllZC1zaW5jZScsXG4gICdsYXN0LW1vZGlmaWVkJywgJ2xvY2F0aW9uJywgJ21heC1mb3J3YXJkcycsICdwcm94eS1hdXRob3JpemF0aW9uJyxcbiAgJ3JlZmVyZXInLCAncmV0cnktYWZ0ZXInLCAndXNlci1hZ2VudCdcbl07XG5cbi8qKlxuICogUGFyc2UgaGVhZGVycyBpbnRvIGFuIG9iamVjdFxuICpcbiAqIGBgYFxuICogRGF0ZTogV2VkLCAyNyBBdWcgMjAxNCAwODo1ODo0OSBHTVRcbiAqIENvbnRlbnQtVHlwZTogYXBwbGljYXRpb24vanNvblxuICogQ29ubmVjdGlvbjoga2VlcC1hbGl2ZVxuICogVHJhbnNmZXItRW5jb2Rpbmc6IGNodW5rZWRcbiAqIGBgYFxuICpcbiAqIEBwYXJhbSB7U3RyaW5nfSBoZWFkZXJzIEhlYWRlcnMgbmVlZGluZyB0byBiZSBwYXJzZWRcbiAqIEByZXR1cm5zIHtPYmplY3R9IEhlYWRlcnMgcGFyc2VkIGludG8gYW4gb2JqZWN0XG4gKi9cbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gcGFyc2VIZWFkZXJzKGhlYWRlcnMpIHtcbiAgdmFyIHBhcnNlZCA9IHt9O1xuICB2YXIga2V5O1xuICB2YXIgdmFsO1xuICB2YXIgaTtcblxuICBpZiAoIWhlYWRlcnMpIHsgcmV0dXJuIHBhcnNlZDsgfVxuXG4gIHV0aWxzLmZvckVhY2goaGVhZGVycy5zcGxpdCgnXFxuJyksIGZ1bmN0aW9uIHBhcnNlcihsaW5lKSB7XG4gICAgaSA9IGxpbmUuaW5kZXhPZignOicpO1xuICAgIGtleSA9IHV0aWxzLnRyaW0obGluZS5zdWJzdHIoMCwgaSkpLnRvTG93ZXJDYXNlKCk7XG4gICAgdmFsID0gdXRpbHMudHJpbShsaW5lLnN1YnN0cihpICsgMSkpO1xuXG4gICAgaWYgKGtleSkge1xuICAgICAgaWYgKHBhcnNlZFtrZXldICYmIGlnbm9yZUR1cGxpY2F0ZU9mLmluZGV4T2Yoa2V5KSA+PSAwKSB7XG4gICAgICAgIHJldHVybjtcbiAgICAgIH1cbiAgICAgIGlmIChrZXkgPT09ICdzZXQtY29va2llJykge1xuICAgICAgICBwYXJzZWRba2V5XSA9IChwYXJzZWRba2V5XSA/IHBhcnNlZFtrZXldIDogW10pLmNvbmNhdChbdmFsXSk7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBwYXJzZWRba2V5XSA9IHBhcnNlZFtrZXldID8gcGFyc2VkW2tleV0gKyAnLCAnICsgdmFsIDogdmFsO1xuICAgICAgfVxuICAgIH1cbiAgfSk7XG5cbiAgcmV0dXJuIHBhcnNlZDtcbn07XG4iLCAiJ3VzZSBzdHJpY3QnO1xuXG52YXIgdXRpbHMgPSByZXF1aXJlKCcuLy4uL3V0aWxzJyk7XG5cbm1vZHVsZS5leHBvcnRzID0gKFxuICB1dGlscy5pc1N0YW5kYXJkQnJvd3NlckVudigpID9cblxuICAvLyBTdGFuZGFyZCBicm93c2VyIGVudnMgaGF2ZSBmdWxsIHN1cHBvcnQgb2YgdGhlIEFQSXMgbmVlZGVkIHRvIHRlc3RcbiAgLy8gd2hldGhlciB0aGUgcmVxdWVzdCBVUkwgaXMgb2YgdGhlIHNhbWUgb3JpZ2luIGFzIGN1cnJlbnQgbG9jYXRpb24uXG4gICAgKGZ1bmN0aW9uIHN0YW5kYXJkQnJvd3NlckVudigpIHtcbiAgICAgIHZhciBtc2llID0gLyhtc2llfHRyaWRlbnQpL2kudGVzdChuYXZpZ2F0b3IudXNlckFnZW50KTtcbiAgICAgIHZhciB1cmxQYXJzaW5nTm9kZSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2EnKTtcbiAgICAgIHZhciBvcmlnaW5VUkw7XG5cbiAgICAgIC8qKlxuICAgICogUGFyc2UgYSBVUkwgdG8gZGlzY292ZXIgaXQncyBjb21wb25lbnRzXG4gICAgKlxuICAgICogQHBhcmFtIHtTdHJpbmd9IHVybCBUaGUgVVJMIHRvIGJlIHBhcnNlZFxuICAgICogQHJldHVybnMge09iamVjdH1cbiAgICAqL1xuICAgICAgZnVuY3Rpb24gcmVzb2x2ZVVSTCh1cmwpIHtcbiAgICAgICAgdmFyIGhyZWYgPSB1cmw7XG5cbiAgICAgICAgaWYgKG1zaWUpIHtcbiAgICAgICAgLy8gSUUgbmVlZHMgYXR0cmlidXRlIHNldCB0d2ljZSB0byBub3JtYWxpemUgcHJvcGVydGllc1xuICAgICAgICAgIHVybFBhcnNpbmdOb2RlLnNldEF0dHJpYnV0ZSgnaHJlZicsIGhyZWYpO1xuICAgICAgICAgIGhyZWYgPSB1cmxQYXJzaW5nTm9kZS5ocmVmO1xuICAgICAgICB9XG5cbiAgICAgICAgdXJsUGFyc2luZ05vZGUuc2V0QXR0cmlidXRlKCdocmVmJywgaHJlZik7XG5cbiAgICAgICAgLy8gdXJsUGFyc2luZ05vZGUgcHJvdmlkZXMgdGhlIFVybFV0aWxzIGludGVyZmFjZSAtIGh0dHA6Ly91cmwuc3BlYy53aGF0d2cub3JnLyN1cmx1dGlsc1xuICAgICAgICByZXR1cm4ge1xuICAgICAgICAgIGhyZWY6IHVybFBhcnNpbmdOb2RlLmhyZWYsXG4gICAgICAgICAgcHJvdG9jb2w6IHVybFBhcnNpbmdOb2RlLnByb3RvY29sID8gdXJsUGFyc2luZ05vZGUucHJvdG9jb2wucmVwbGFjZSgvOiQvLCAnJykgOiAnJyxcbiAgICAgICAgICBob3N0OiB1cmxQYXJzaW5nTm9kZS5ob3N0LFxuICAgICAgICAgIHNlYXJjaDogdXJsUGFyc2luZ05vZGUuc2VhcmNoID8gdXJsUGFyc2luZ05vZGUuc2VhcmNoLnJlcGxhY2UoL15cXD8vLCAnJykgOiAnJyxcbiAgICAgICAgICBoYXNoOiB1cmxQYXJzaW5nTm9kZS5oYXNoID8gdXJsUGFyc2luZ05vZGUuaGFzaC5yZXBsYWNlKC9eIy8sICcnKSA6ICcnLFxuICAgICAgICAgIGhvc3RuYW1lOiB1cmxQYXJzaW5nTm9kZS5ob3N0bmFtZSxcbiAgICAgICAgICBwb3J0OiB1cmxQYXJzaW5nTm9kZS5wb3J0LFxuICAgICAgICAgIHBhdGhuYW1lOiAodXJsUGFyc2luZ05vZGUucGF0aG5hbWUuY2hhckF0KDApID09PSAnLycpID9cbiAgICAgICAgICAgIHVybFBhcnNpbmdOb2RlLnBhdGhuYW1lIDpcbiAgICAgICAgICAgICcvJyArIHVybFBhcnNpbmdOb2RlLnBhdGhuYW1lXG4gICAgICAgIH07XG4gICAgICB9XG5cbiAgICAgIG9yaWdpblVSTCA9IHJlc29sdmVVUkwod2luZG93LmxvY2F0aW9uLmhyZWYpO1xuXG4gICAgICAvKipcbiAgICAqIERldGVybWluZSBpZiBhIFVSTCBzaGFyZXMgdGhlIHNhbWUgb3JpZ2luIGFzIHRoZSBjdXJyZW50IGxvY2F0aW9uXG4gICAgKlxuICAgICogQHBhcmFtIHtTdHJpbmd9IHJlcXVlc3RVUkwgVGhlIFVSTCB0byB0ZXN0XG4gICAgKiBAcmV0dXJucyB7Ym9vbGVhbn0gVHJ1ZSBpZiBVUkwgc2hhcmVzIHRoZSBzYW1lIG9yaWdpbiwgb3RoZXJ3aXNlIGZhbHNlXG4gICAgKi9cbiAgICAgIHJldHVybiBmdW5jdGlvbiBpc1VSTFNhbWVPcmlnaW4ocmVxdWVzdFVSTCkge1xuICAgICAgICB2YXIgcGFyc2VkID0gKHV0aWxzLmlzU3RyaW5nKHJlcXVlc3RVUkwpKSA/IHJlc29sdmVVUkwocmVxdWVzdFVSTCkgOiByZXF1ZXN0VVJMO1xuICAgICAgICByZXR1cm4gKHBhcnNlZC5wcm90b2NvbCA9PT0gb3JpZ2luVVJMLnByb3RvY29sICYmXG4gICAgICAgICAgICBwYXJzZWQuaG9zdCA9PT0gb3JpZ2luVVJMLmhvc3QpO1xuICAgICAgfTtcbiAgICB9KSgpIDpcblxuICAvLyBOb24gc3RhbmRhcmQgYnJvd3NlciBlbnZzICh3ZWIgd29ya2VycywgcmVhY3QtbmF0aXZlKSBsYWNrIG5lZWRlZCBzdXBwb3J0LlxuICAgIChmdW5jdGlvbiBub25TdGFuZGFyZEJyb3dzZXJFbnYoKSB7XG4gICAgICByZXR1cm4gZnVuY3Rpb24gaXNVUkxTYW1lT3JpZ2luKCkge1xuICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICAgIH07XG4gICAgfSkoKVxuKTtcbiIsICIndXNlIHN0cmljdCc7XG5cbnZhciBBeGlvc0Vycm9yID0gcmVxdWlyZSgnLi4vY29yZS9BeGlvc0Vycm9yJyk7XG52YXIgdXRpbHMgPSByZXF1aXJlKCcuLi91dGlscycpO1xuXG4vKipcbiAqIEEgYENhbmNlbGVkRXJyb3JgIGlzIGFuIG9iamVjdCB0aGF0IGlzIHRocm93biB3aGVuIGFuIG9wZXJhdGlvbiBpcyBjYW5jZWxlZC5cbiAqXG4gKiBAY2xhc3NcbiAqIEBwYXJhbSB7c3RyaW5nPX0gbWVzc2FnZSBUaGUgbWVzc2FnZS5cbiAqL1xuZnVuY3Rpb24gQ2FuY2VsZWRFcnJvcihtZXNzYWdlKSB7XG4gIC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBuby1lcS1udWxsLGVxZXFlcVxuICBBeGlvc0Vycm9yLmNhbGwodGhpcywgbWVzc2FnZSA9PSBudWxsID8gJ2NhbmNlbGVkJyA6IG1lc3NhZ2UsIEF4aW9zRXJyb3IuRVJSX0NBTkNFTEVEKTtcbiAgdGhpcy5uYW1lID0gJ0NhbmNlbGVkRXJyb3InO1xufVxuXG51dGlscy5pbmhlcml0cyhDYW5jZWxlZEVycm9yLCBBeGlvc0Vycm9yLCB7XG4gIF9fQ0FOQ0VMX186IHRydWVcbn0pO1xuXG5tb2R1bGUuZXhwb3J0cyA9IENhbmNlbGVkRXJyb3I7XG4iLCAiJ3VzZSBzdHJpY3QnO1xuXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIHBhcnNlUHJvdG9jb2wodXJsKSB7XG4gIHZhciBtYXRjaCA9IC9eKFstK1xcd117MSwyNX0pKDo/XFwvXFwvfDopLy5leGVjKHVybCk7XG4gIHJldHVybiBtYXRjaCAmJiBtYXRjaFsxXSB8fCAnJztcbn07XG4iLCAiJ3VzZSBzdHJpY3QnO1xuXG52YXIgdXRpbHMgPSByZXF1aXJlKCcuLy4uL3V0aWxzJyk7XG52YXIgc2V0dGxlID0gcmVxdWlyZSgnLi8uLi9jb3JlL3NldHRsZScpO1xudmFyIGNvb2tpZXMgPSByZXF1aXJlKCcuLy4uL2hlbHBlcnMvY29va2llcycpO1xudmFyIGJ1aWxkVVJMID0gcmVxdWlyZSgnLi8uLi9oZWxwZXJzL2J1aWxkVVJMJyk7XG52YXIgYnVpbGRGdWxsUGF0aCA9IHJlcXVpcmUoJy4uL2NvcmUvYnVpbGRGdWxsUGF0aCcpO1xudmFyIHBhcnNlSGVhZGVycyA9IHJlcXVpcmUoJy4vLi4vaGVscGVycy9wYXJzZUhlYWRlcnMnKTtcbnZhciBpc1VSTFNhbWVPcmlnaW4gPSByZXF1aXJlKCcuLy4uL2hlbHBlcnMvaXNVUkxTYW1lT3JpZ2luJyk7XG52YXIgdHJhbnNpdGlvbmFsRGVmYXVsdHMgPSByZXF1aXJlKCcuLi9kZWZhdWx0cy90cmFuc2l0aW9uYWwnKTtcbnZhciBBeGlvc0Vycm9yID0gcmVxdWlyZSgnLi4vY29yZS9BeGlvc0Vycm9yJyk7XG52YXIgQ2FuY2VsZWRFcnJvciA9IHJlcXVpcmUoJy4uL2NhbmNlbC9DYW5jZWxlZEVycm9yJyk7XG52YXIgcGFyc2VQcm90b2NvbCA9IHJlcXVpcmUoJy4uL2hlbHBlcnMvcGFyc2VQcm90b2NvbCcpO1xuXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIHhockFkYXB0ZXIoY29uZmlnKSB7XG4gIHJldHVybiBuZXcgUHJvbWlzZShmdW5jdGlvbiBkaXNwYXRjaFhoclJlcXVlc3QocmVzb2x2ZSwgcmVqZWN0KSB7XG4gICAgdmFyIHJlcXVlc3REYXRhID0gY29uZmlnLmRhdGE7XG4gICAgdmFyIHJlcXVlc3RIZWFkZXJzID0gY29uZmlnLmhlYWRlcnM7XG4gICAgdmFyIHJlc3BvbnNlVHlwZSA9IGNvbmZpZy5yZXNwb25zZVR5cGU7XG4gICAgdmFyIG9uQ2FuY2VsZWQ7XG4gICAgZnVuY3Rpb24gZG9uZSgpIHtcbiAgICAgIGlmIChjb25maWcuY2FuY2VsVG9rZW4pIHtcbiAgICAgICAgY29uZmlnLmNhbmNlbFRva2VuLnVuc3Vic2NyaWJlKG9uQ2FuY2VsZWQpO1xuICAgICAgfVxuXG4gICAgICBpZiAoY29uZmlnLnNpZ25hbCkge1xuICAgICAgICBjb25maWcuc2lnbmFsLnJlbW92ZUV2ZW50TGlzdGVuZXIoJ2Fib3J0Jywgb25DYW5jZWxlZCk7XG4gICAgICB9XG4gICAgfVxuXG4gICAgaWYgKHV0aWxzLmlzRm9ybURhdGEocmVxdWVzdERhdGEpICYmIHV0aWxzLmlzU3RhbmRhcmRCcm93c2VyRW52KCkpIHtcbiAgICAgIGRlbGV0ZSByZXF1ZXN0SGVhZGVyc1snQ29udGVudC1UeXBlJ107IC8vIExldCB0aGUgYnJvd3NlciBzZXQgaXRcbiAgICB9XG5cbiAgICB2YXIgcmVxdWVzdCA9IG5ldyBYTUxIdHRwUmVxdWVzdCgpO1xuXG4gICAgLy8gSFRUUCBiYXNpYyBhdXRoZW50aWNhdGlvblxuICAgIGlmIChjb25maWcuYXV0aCkge1xuICAgICAgdmFyIHVzZXJuYW1lID0gY29uZmlnLmF1dGgudXNlcm5hbWUgfHwgJyc7XG4gICAgICB2YXIgcGFzc3dvcmQgPSBjb25maWcuYXV0aC5wYXNzd29yZCA/IHVuZXNjYXBlKGVuY29kZVVSSUNvbXBvbmVudChjb25maWcuYXV0aC5wYXNzd29yZCkpIDogJyc7XG4gICAgICByZXF1ZXN0SGVhZGVycy5BdXRob3JpemF0aW9uID0gJ0Jhc2ljICcgKyBidG9hKHVzZXJuYW1lICsgJzonICsgcGFzc3dvcmQpO1xuICAgIH1cblxuICAgIHZhciBmdWxsUGF0aCA9IGJ1aWxkRnVsbFBhdGgoY29uZmlnLmJhc2VVUkwsIGNvbmZpZy51cmwpO1xuXG4gICAgcmVxdWVzdC5vcGVuKGNvbmZpZy5tZXRob2QudG9VcHBlckNhc2UoKSwgYnVpbGRVUkwoZnVsbFBhdGgsIGNvbmZpZy5wYXJhbXMsIGNvbmZpZy5wYXJhbXNTZXJpYWxpemVyKSwgdHJ1ZSk7XG5cbiAgICAvLyBTZXQgdGhlIHJlcXVlc3QgdGltZW91dCBpbiBNU1xuICAgIHJlcXVlc3QudGltZW91dCA9IGNvbmZpZy50aW1lb3V0O1xuXG4gICAgZnVuY3Rpb24gb25sb2FkZW5kKCkge1xuICAgICAgaWYgKCFyZXF1ZXN0KSB7XG4gICAgICAgIHJldHVybjtcbiAgICAgIH1cbiAgICAgIC8vIFByZXBhcmUgdGhlIHJlc3BvbnNlXG4gICAgICB2YXIgcmVzcG9uc2VIZWFkZXJzID0gJ2dldEFsbFJlc3BvbnNlSGVhZGVycycgaW4gcmVxdWVzdCA/IHBhcnNlSGVhZGVycyhyZXF1ZXN0LmdldEFsbFJlc3BvbnNlSGVhZGVycygpKSA6IG51bGw7XG4gICAgICB2YXIgcmVzcG9uc2VEYXRhID0gIXJlc3BvbnNlVHlwZSB8fCByZXNwb25zZVR5cGUgPT09ICd0ZXh0JyB8fCAgcmVzcG9uc2VUeXBlID09PSAnanNvbicgP1xuICAgICAgICByZXF1ZXN0LnJlc3BvbnNlVGV4dCA6IHJlcXVlc3QucmVzcG9uc2U7XG4gICAgICB2YXIgcmVzcG9uc2UgPSB7XG4gICAgICAgIGRhdGE6IHJlc3BvbnNlRGF0YSxcbiAgICAgICAgc3RhdHVzOiByZXF1ZXN0LnN0YXR1cyxcbiAgICAgICAgc3RhdHVzVGV4dDogcmVxdWVzdC5zdGF0dXNUZXh0LFxuICAgICAgICBoZWFkZXJzOiByZXNwb25zZUhlYWRlcnMsXG4gICAgICAgIGNvbmZpZzogY29uZmlnLFxuICAgICAgICByZXF1ZXN0OiByZXF1ZXN0XG4gICAgICB9O1xuXG4gICAgICBzZXR0bGUoZnVuY3Rpb24gX3Jlc29sdmUodmFsdWUpIHtcbiAgICAgICAgcmVzb2x2ZSh2YWx1ZSk7XG4gICAgICAgIGRvbmUoKTtcbiAgICAgIH0sIGZ1bmN0aW9uIF9yZWplY3QoZXJyKSB7XG4gICAgICAgIHJlamVjdChlcnIpO1xuICAgICAgICBkb25lKCk7XG4gICAgICB9LCByZXNwb25zZSk7XG5cbiAgICAgIC8vIENsZWFuIHVwIHJlcXVlc3RcbiAgICAgIHJlcXVlc3QgPSBudWxsO1xuICAgIH1cblxuICAgIGlmICgnb25sb2FkZW5kJyBpbiByZXF1ZXN0KSB7XG4gICAgICAvLyBVc2Ugb25sb2FkZW5kIGlmIGF2YWlsYWJsZVxuICAgICAgcmVxdWVzdC5vbmxvYWRlbmQgPSBvbmxvYWRlbmQ7XG4gICAgfSBlbHNlIHtcbiAgICAgIC8vIExpc3RlbiBmb3IgcmVhZHkgc3RhdGUgdG8gZW11bGF0ZSBvbmxvYWRlbmRcbiAgICAgIHJlcXVlc3Qub25yZWFkeXN0YXRlY2hhbmdlID0gZnVuY3Rpb24gaGFuZGxlTG9hZCgpIHtcbiAgICAgICAgaWYgKCFyZXF1ZXN0IHx8IHJlcXVlc3QucmVhZHlTdGF0ZSAhPT0gNCkge1xuICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuXG4gICAgICAgIC8vIFRoZSByZXF1ZXN0IGVycm9yZWQgb3V0IGFuZCB3ZSBkaWRuJ3QgZ2V0IGEgcmVzcG9uc2UsIHRoaXMgd2lsbCBiZVxuICAgICAgICAvLyBoYW5kbGVkIGJ5IG9uZXJyb3IgaW5zdGVhZFxuICAgICAgICAvLyBXaXRoIG9uZSBleGNlcHRpb246IHJlcXVlc3QgdGhhdCB1c2luZyBmaWxlOiBwcm90b2NvbCwgbW9zdCBicm93c2Vyc1xuICAgICAgICAvLyB3aWxsIHJldHVybiBzdGF0dXMgYXMgMCBldmVuIHRob3VnaCBpdCdzIGEgc3VjY2Vzc2Z1bCByZXF1ZXN0XG4gICAgICAgIGlmIChyZXF1ZXN0LnN0YXR1cyA9PT0gMCAmJiAhKHJlcXVlc3QucmVzcG9uc2VVUkwgJiYgcmVxdWVzdC5yZXNwb25zZVVSTC5pbmRleE9mKCdmaWxlOicpID09PSAwKSkge1xuICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuICAgICAgICAvLyByZWFkeXN0YXRlIGhhbmRsZXIgaXMgY2FsbGluZyBiZWZvcmUgb25lcnJvciBvciBvbnRpbWVvdXQgaGFuZGxlcnMsXG4gICAgICAgIC8vIHNvIHdlIHNob3VsZCBjYWxsIG9ubG9hZGVuZCBvbiB0aGUgbmV4dCAndGljaydcbiAgICAgICAgc2V0VGltZW91dChvbmxvYWRlbmQpO1xuICAgICAgfTtcbiAgICB9XG5cbiAgICAvLyBIYW5kbGUgYnJvd3NlciByZXF1ZXN0IGNhbmNlbGxhdGlvbiAoYXMgb3Bwb3NlZCB0byBhIG1hbnVhbCBjYW5jZWxsYXRpb24pXG4gICAgcmVxdWVzdC5vbmFib3J0ID0gZnVuY3Rpb24gaGFuZGxlQWJvcnQoKSB7XG4gICAgICBpZiAoIXJlcXVlc3QpIHtcbiAgICAgICAgcmV0dXJuO1xuICAgICAgfVxuXG4gICAgICByZWplY3QobmV3IEF4aW9zRXJyb3IoJ1JlcXVlc3QgYWJvcnRlZCcsIEF4aW9zRXJyb3IuRUNPTk5BQk9SVEVELCBjb25maWcsIHJlcXVlc3QpKTtcblxuICAgICAgLy8gQ2xlYW4gdXAgcmVxdWVzdFxuICAgICAgcmVxdWVzdCA9IG51bGw7XG4gICAgfTtcblxuICAgIC8vIEhhbmRsZSBsb3cgbGV2ZWwgbmV0d29yayBlcnJvcnNcbiAgICByZXF1ZXN0Lm9uZXJyb3IgPSBmdW5jdGlvbiBoYW5kbGVFcnJvcigpIHtcbiAgICAgIC8vIFJlYWwgZXJyb3JzIGFyZSBoaWRkZW4gZnJvbSB1cyBieSB0aGUgYnJvd3NlclxuICAgICAgLy8gb25lcnJvciBzaG91bGQgb25seSBmaXJlIGlmIGl0J3MgYSBuZXR3b3JrIGVycm9yXG4gICAgICByZWplY3QobmV3IEF4aW9zRXJyb3IoJ05ldHdvcmsgRXJyb3InLCBBeGlvc0Vycm9yLkVSUl9ORVRXT1JLLCBjb25maWcsIHJlcXVlc3QsIHJlcXVlc3QpKTtcblxuICAgICAgLy8gQ2xlYW4gdXAgcmVxdWVzdFxuICAgICAgcmVxdWVzdCA9IG51bGw7XG4gICAgfTtcblxuICAgIC8vIEhhbmRsZSB0aW1lb3V0XG4gICAgcmVxdWVzdC5vbnRpbWVvdXQgPSBmdW5jdGlvbiBoYW5kbGVUaW1lb3V0KCkge1xuICAgICAgdmFyIHRpbWVvdXRFcnJvck1lc3NhZ2UgPSBjb25maWcudGltZW91dCA/ICd0aW1lb3V0IG9mICcgKyBjb25maWcudGltZW91dCArICdtcyBleGNlZWRlZCcgOiAndGltZW91dCBleGNlZWRlZCc7XG4gICAgICB2YXIgdHJhbnNpdGlvbmFsID0gY29uZmlnLnRyYW5zaXRpb25hbCB8fCB0cmFuc2l0aW9uYWxEZWZhdWx0cztcbiAgICAgIGlmIChjb25maWcudGltZW91dEVycm9yTWVzc2FnZSkge1xuICAgICAgICB0aW1lb3V0RXJyb3JNZXNzYWdlID0gY29uZmlnLnRpbWVvdXRFcnJvck1lc3NhZ2U7XG4gICAgICB9XG4gICAgICByZWplY3QobmV3IEF4aW9zRXJyb3IoXG4gICAgICAgIHRpbWVvdXRFcnJvck1lc3NhZ2UsXG4gICAgICAgIHRyYW5zaXRpb25hbC5jbGFyaWZ5VGltZW91dEVycm9yID8gQXhpb3NFcnJvci5FVElNRURPVVQgOiBBeGlvc0Vycm9yLkVDT05OQUJPUlRFRCxcbiAgICAgICAgY29uZmlnLFxuICAgICAgICByZXF1ZXN0KSk7XG5cbiAgICAgIC8vIENsZWFuIHVwIHJlcXVlc3RcbiAgICAgIHJlcXVlc3QgPSBudWxsO1xuICAgIH07XG5cbiAgICAvLyBBZGQgeHNyZiBoZWFkZXJcbiAgICAvLyBUaGlzIGlzIG9ubHkgZG9uZSBpZiBydW5uaW5nIGluIGEgc3RhbmRhcmQgYnJvd3NlciBlbnZpcm9ubWVudC5cbiAgICAvLyBTcGVjaWZpY2FsbHkgbm90IGlmIHdlJ3JlIGluIGEgd2ViIHdvcmtlciwgb3IgcmVhY3QtbmF0aXZlLlxuICAgIGlmICh1dGlscy5pc1N0YW5kYXJkQnJvd3NlckVudigpKSB7XG4gICAgICAvLyBBZGQgeHNyZiBoZWFkZXJcbiAgICAgIHZhciB4c3JmVmFsdWUgPSAoY29uZmlnLndpdGhDcmVkZW50aWFscyB8fCBpc1VSTFNhbWVPcmlnaW4oZnVsbFBhdGgpKSAmJiBjb25maWcueHNyZkNvb2tpZU5hbWUgP1xuICAgICAgICBjb29raWVzLnJlYWQoY29uZmlnLnhzcmZDb29raWVOYW1lKSA6XG4gICAgICAgIHVuZGVmaW5lZDtcblxuICAgICAgaWYgKHhzcmZWYWx1ZSkge1xuICAgICAgICByZXF1ZXN0SGVhZGVyc1tjb25maWcueHNyZkhlYWRlck5hbWVdID0geHNyZlZhbHVlO1xuICAgICAgfVxuICAgIH1cblxuICAgIC8vIEFkZCBoZWFkZXJzIHRvIHRoZSByZXF1ZXN0XG4gICAgaWYgKCdzZXRSZXF1ZXN0SGVhZGVyJyBpbiByZXF1ZXN0KSB7XG4gICAgICB1dGlscy5mb3JFYWNoKHJlcXVlc3RIZWFkZXJzLCBmdW5jdGlvbiBzZXRSZXF1ZXN0SGVhZGVyKHZhbCwga2V5KSB7XG4gICAgICAgIGlmICh0eXBlb2YgcmVxdWVzdERhdGEgPT09ICd1bmRlZmluZWQnICYmIGtleS50b0xvd2VyQ2FzZSgpID09PSAnY29udGVudC10eXBlJykge1xuICAgICAgICAgIC8vIFJlbW92ZSBDb250ZW50LVR5cGUgaWYgZGF0YSBpcyB1bmRlZmluZWRcbiAgICAgICAgICBkZWxldGUgcmVxdWVzdEhlYWRlcnNba2V5XTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAvLyBPdGhlcndpc2UgYWRkIGhlYWRlciB0byB0aGUgcmVxdWVzdFxuICAgICAgICAgIHJlcXVlc3Quc2V0UmVxdWVzdEhlYWRlcihrZXksIHZhbCk7XG4gICAgICAgIH1cbiAgICAgIH0pO1xuICAgIH1cblxuICAgIC8vIEFkZCB3aXRoQ3JlZGVudGlhbHMgdG8gcmVxdWVzdCBpZiBuZWVkZWRcbiAgICBpZiAoIXV0aWxzLmlzVW5kZWZpbmVkKGNvbmZpZy53aXRoQ3JlZGVudGlhbHMpKSB7XG4gICAgICByZXF1ZXN0LndpdGhDcmVkZW50aWFscyA9ICEhY29uZmlnLndpdGhDcmVkZW50aWFscztcbiAgICB9XG5cbiAgICAvLyBBZGQgcmVzcG9uc2VUeXBlIHRvIHJlcXVlc3QgaWYgbmVlZGVkXG4gICAgaWYgKHJlc3BvbnNlVHlwZSAmJiByZXNwb25zZVR5cGUgIT09ICdqc29uJykge1xuICAgICAgcmVxdWVzdC5yZXNwb25zZVR5cGUgPSBjb25maWcucmVzcG9uc2VUeXBlO1xuICAgIH1cblxuICAgIC8vIEhhbmRsZSBwcm9ncmVzcyBpZiBuZWVkZWRcbiAgICBpZiAodHlwZW9mIGNvbmZpZy5vbkRvd25sb2FkUHJvZ3Jlc3MgPT09ICdmdW5jdGlvbicpIHtcbiAgICAgIHJlcXVlc3QuYWRkRXZlbnRMaXN0ZW5lcigncHJvZ3Jlc3MnLCBjb25maWcub25Eb3dubG9hZFByb2dyZXNzKTtcbiAgICB9XG5cbiAgICAvLyBOb3QgYWxsIGJyb3dzZXJzIHN1cHBvcnQgdXBsb2FkIGV2ZW50c1xuICAgIGlmICh0eXBlb2YgY29uZmlnLm9uVXBsb2FkUHJvZ3Jlc3MgPT09ICdmdW5jdGlvbicgJiYgcmVxdWVzdC51cGxvYWQpIHtcbiAgICAgIHJlcXVlc3QudXBsb2FkLmFkZEV2ZW50TGlzdGVuZXIoJ3Byb2dyZXNzJywgY29uZmlnLm9uVXBsb2FkUHJvZ3Jlc3MpO1xuICAgIH1cblxuICAgIGlmIChjb25maWcuY2FuY2VsVG9rZW4gfHwgY29uZmlnLnNpZ25hbCkge1xuICAgICAgLy8gSGFuZGxlIGNhbmNlbGxhdGlvblxuICAgICAgLy8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIGZ1bmMtbmFtZXNcbiAgICAgIG9uQ2FuY2VsZWQgPSBmdW5jdGlvbihjYW5jZWwpIHtcbiAgICAgICAgaWYgKCFyZXF1ZXN0KSB7XG4gICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG4gICAgICAgIHJlamVjdCghY2FuY2VsIHx8IChjYW5jZWwgJiYgY2FuY2VsLnR5cGUpID8gbmV3IENhbmNlbGVkRXJyb3IoKSA6IGNhbmNlbCk7XG4gICAgICAgIHJlcXVlc3QuYWJvcnQoKTtcbiAgICAgICAgcmVxdWVzdCA9IG51bGw7XG4gICAgICB9O1xuXG4gICAgICBjb25maWcuY2FuY2VsVG9rZW4gJiYgY29uZmlnLmNhbmNlbFRva2VuLnN1YnNjcmliZShvbkNhbmNlbGVkKTtcbiAgICAgIGlmIChjb25maWcuc2lnbmFsKSB7XG4gICAgICAgIGNvbmZpZy5zaWduYWwuYWJvcnRlZCA/IG9uQ2FuY2VsZWQoKSA6IGNvbmZpZy5zaWduYWwuYWRkRXZlbnRMaXN0ZW5lcignYWJvcnQnLCBvbkNhbmNlbGVkKTtcbiAgICAgIH1cbiAgICB9XG5cbiAgICBpZiAoIXJlcXVlc3REYXRhKSB7XG4gICAgICByZXF1ZXN0RGF0YSA9IG51bGw7XG4gICAgfVxuXG4gICAgdmFyIHByb3RvY29sID0gcGFyc2VQcm90b2NvbChmdWxsUGF0aCk7XG5cbiAgICBpZiAocHJvdG9jb2wgJiYgWyAnaHR0cCcsICdodHRwcycsICdmaWxlJyBdLmluZGV4T2YocHJvdG9jb2wpID09PSAtMSkge1xuICAgICAgcmVqZWN0KG5ldyBBeGlvc0Vycm9yKCdVbnN1cHBvcnRlZCBwcm90b2NvbCAnICsgcHJvdG9jb2wgKyAnOicsIEF4aW9zRXJyb3IuRVJSX0JBRF9SRVFVRVNULCBjb25maWcpKTtcbiAgICAgIHJldHVybjtcbiAgICB9XG5cblxuICAgIC8vIFNlbmQgdGhlIHJlcXVlc3RcbiAgICByZXF1ZXN0LnNlbmQocmVxdWVzdERhdGEpO1xuICB9KTtcbn07XG4iLCAiLy8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIHN0cmljdFxubW9kdWxlLmV4cG9ydHMgPSBudWxsO1xuIiwgIid1c2Ugc3RyaWN0JztcblxudmFyIHV0aWxzID0gcmVxdWlyZSgnLi4vdXRpbHMnKTtcbnZhciBub3JtYWxpemVIZWFkZXJOYW1lID0gcmVxdWlyZSgnLi4vaGVscGVycy9ub3JtYWxpemVIZWFkZXJOYW1lJyk7XG52YXIgQXhpb3NFcnJvciA9IHJlcXVpcmUoJy4uL2NvcmUvQXhpb3NFcnJvcicpO1xudmFyIHRyYW5zaXRpb25hbERlZmF1bHRzID0gcmVxdWlyZSgnLi90cmFuc2l0aW9uYWwnKTtcbnZhciB0b0Zvcm1EYXRhID0gcmVxdWlyZSgnLi4vaGVscGVycy90b0Zvcm1EYXRhJyk7XG5cbnZhciBERUZBVUxUX0NPTlRFTlRfVFlQRSA9IHtcbiAgJ0NvbnRlbnQtVHlwZSc6ICdhcHBsaWNhdGlvbi94LXd3dy1mb3JtLXVybGVuY29kZWQnXG59O1xuXG5mdW5jdGlvbiBzZXRDb250ZW50VHlwZUlmVW5zZXQoaGVhZGVycywgdmFsdWUpIHtcbiAgaWYgKCF1dGlscy5pc1VuZGVmaW5lZChoZWFkZXJzKSAmJiB1dGlscy5pc1VuZGVmaW5lZChoZWFkZXJzWydDb250ZW50LVR5cGUnXSkpIHtcbiAgICBoZWFkZXJzWydDb250ZW50LVR5cGUnXSA9IHZhbHVlO1xuICB9XG59XG5cbmZ1bmN0aW9uIGdldERlZmF1bHRBZGFwdGVyKCkge1xuICB2YXIgYWRhcHRlcjtcbiAgaWYgKHR5cGVvZiBYTUxIdHRwUmVxdWVzdCAhPT0gJ3VuZGVmaW5lZCcpIHtcbiAgICAvLyBGb3IgYnJvd3NlcnMgdXNlIFhIUiBhZGFwdGVyXG4gICAgYWRhcHRlciA9IHJlcXVpcmUoJy4uL2FkYXB0ZXJzL3hocicpO1xuICB9IGVsc2UgaWYgKHR5cGVvZiBwcm9jZXNzICE9PSAndW5kZWZpbmVkJyAmJiBPYmplY3QucHJvdG90eXBlLnRvU3RyaW5nLmNhbGwocHJvY2VzcykgPT09ICdbb2JqZWN0IHByb2Nlc3NdJykge1xuICAgIC8vIEZvciBub2RlIHVzZSBIVFRQIGFkYXB0ZXJcbiAgICBhZGFwdGVyID0gcmVxdWlyZSgnLi4vYWRhcHRlcnMvaHR0cCcpO1xuICB9XG4gIHJldHVybiBhZGFwdGVyO1xufVxuXG5mdW5jdGlvbiBzdHJpbmdpZnlTYWZlbHkocmF3VmFsdWUsIHBhcnNlciwgZW5jb2Rlcikge1xuICBpZiAodXRpbHMuaXNTdHJpbmcocmF3VmFsdWUpKSB7XG4gICAgdHJ5IHtcbiAgICAgIChwYXJzZXIgfHwgSlNPTi5wYXJzZSkocmF3VmFsdWUpO1xuICAgICAgcmV0dXJuIHV0aWxzLnRyaW0ocmF3VmFsdWUpO1xuICAgIH0gY2F0Y2ggKGUpIHtcbiAgICAgIGlmIChlLm5hbWUgIT09ICdTeW50YXhFcnJvcicpIHtcbiAgICAgICAgdGhyb3cgZTtcbiAgICAgIH1cbiAgICB9XG4gIH1cblxuICByZXR1cm4gKGVuY29kZXIgfHwgSlNPTi5zdHJpbmdpZnkpKHJhd1ZhbHVlKTtcbn1cblxudmFyIGRlZmF1bHRzID0ge1xuXG4gIHRyYW5zaXRpb25hbDogdHJhbnNpdGlvbmFsRGVmYXVsdHMsXG5cbiAgYWRhcHRlcjogZ2V0RGVmYXVsdEFkYXB0ZXIoKSxcblxuICB0cmFuc2Zvcm1SZXF1ZXN0OiBbZnVuY3Rpb24gdHJhbnNmb3JtUmVxdWVzdChkYXRhLCBoZWFkZXJzKSB7XG4gICAgbm9ybWFsaXplSGVhZGVyTmFtZShoZWFkZXJzLCAnQWNjZXB0Jyk7XG4gICAgbm9ybWFsaXplSGVhZGVyTmFtZShoZWFkZXJzLCAnQ29udGVudC1UeXBlJyk7XG5cbiAgICBpZiAodXRpbHMuaXNGb3JtRGF0YShkYXRhKSB8fFxuICAgICAgdXRpbHMuaXNBcnJheUJ1ZmZlcihkYXRhKSB8fFxuICAgICAgdXRpbHMuaXNCdWZmZXIoZGF0YSkgfHxcbiAgICAgIHV0aWxzLmlzU3RyZWFtKGRhdGEpIHx8XG4gICAgICB1dGlscy5pc0ZpbGUoZGF0YSkgfHxcbiAgICAgIHV0aWxzLmlzQmxvYihkYXRhKVxuICAgICkge1xuICAgICAgcmV0dXJuIGRhdGE7XG4gICAgfVxuICAgIGlmICh1dGlscy5pc0FycmF5QnVmZmVyVmlldyhkYXRhKSkge1xuICAgICAgcmV0dXJuIGRhdGEuYnVmZmVyO1xuICAgIH1cbiAgICBpZiAodXRpbHMuaXNVUkxTZWFyY2hQYXJhbXMoZGF0YSkpIHtcbiAgICAgIHNldENvbnRlbnRUeXBlSWZVbnNldChoZWFkZXJzLCAnYXBwbGljYXRpb24veC13d3ctZm9ybS11cmxlbmNvZGVkO2NoYXJzZXQ9dXRmLTgnKTtcbiAgICAgIHJldHVybiBkYXRhLnRvU3RyaW5nKCk7XG4gICAgfVxuXG4gICAgdmFyIGlzT2JqZWN0UGF5bG9hZCA9IHV0aWxzLmlzT2JqZWN0KGRhdGEpO1xuICAgIHZhciBjb250ZW50VHlwZSA9IGhlYWRlcnMgJiYgaGVhZGVyc1snQ29udGVudC1UeXBlJ107XG5cbiAgICB2YXIgaXNGaWxlTGlzdDtcblxuICAgIGlmICgoaXNGaWxlTGlzdCA9IHV0aWxzLmlzRmlsZUxpc3QoZGF0YSkpIHx8IChpc09iamVjdFBheWxvYWQgJiYgY29udGVudFR5cGUgPT09ICdtdWx0aXBhcnQvZm9ybS1kYXRhJykpIHtcbiAgICAgIHZhciBfRm9ybURhdGEgPSB0aGlzLmVudiAmJiB0aGlzLmVudi5Gb3JtRGF0YTtcbiAgICAgIHJldHVybiB0b0Zvcm1EYXRhKGlzRmlsZUxpc3QgPyB7J2ZpbGVzW10nOiBkYXRhfSA6IGRhdGEsIF9Gb3JtRGF0YSAmJiBuZXcgX0Zvcm1EYXRhKCkpO1xuICAgIH0gZWxzZSBpZiAoaXNPYmplY3RQYXlsb2FkIHx8IGNvbnRlbnRUeXBlID09PSAnYXBwbGljYXRpb24vanNvbicpIHtcbiAgICAgIHNldENvbnRlbnRUeXBlSWZVbnNldChoZWFkZXJzLCAnYXBwbGljYXRpb24vanNvbicpO1xuICAgICAgcmV0dXJuIHN0cmluZ2lmeVNhZmVseShkYXRhKTtcbiAgICB9XG5cbiAgICByZXR1cm4gZGF0YTtcbiAgfV0sXG5cbiAgdHJhbnNmb3JtUmVzcG9uc2U6IFtmdW5jdGlvbiB0cmFuc2Zvcm1SZXNwb25zZShkYXRhKSB7XG4gICAgdmFyIHRyYW5zaXRpb25hbCA9IHRoaXMudHJhbnNpdGlvbmFsIHx8IGRlZmF1bHRzLnRyYW5zaXRpb25hbDtcbiAgICB2YXIgc2lsZW50SlNPTlBhcnNpbmcgPSB0cmFuc2l0aW9uYWwgJiYgdHJhbnNpdGlvbmFsLnNpbGVudEpTT05QYXJzaW5nO1xuICAgIHZhciBmb3JjZWRKU09OUGFyc2luZyA9IHRyYW5zaXRpb25hbCAmJiB0cmFuc2l0aW9uYWwuZm9yY2VkSlNPTlBhcnNpbmc7XG4gICAgdmFyIHN0cmljdEpTT05QYXJzaW5nID0gIXNpbGVudEpTT05QYXJzaW5nICYmIHRoaXMucmVzcG9uc2VUeXBlID09PSAnanNvbic7XG5cbiAgICBpZiAoc3RyaWN0SlNPTlBhcnNpbmcgfHwgKGZvcmNlZEpTT05QYXJzaW5nICYmIHV0aWxzLmlzU3RyaW5nKGRhdGEpICYmIGRhdGEubGVuZ3RoKSkge1xuICAgICAgdHJ5IHtcbiAgICAgICAgcmV0dXJuIEpTT04ucGFyc2UoZGF0YSk7XG4gICAgICB9IGNhdGNoIChlKSB7XG4gICAgICAgIGlmIChzdHJpY3RKU09OUGFyc2luZykge1xuICAgICAgICAgIGlmIChlLm5hbWUgPT09ICdTeW50YXhFcnJvcicpIHtcbiAgICAgICAgICAgIHRocm93IEF4aW9zRXJyb3IuZnJvbShlLCBBeGlvc0Vycm9yLkVSUl9CQURfUkVTUE9OU0UsIHRoaXMsIG51bGwsIHRoaXMucmVzcG9uc2UpO1xuICAgICAgICAgIH1cbiAgICAgICAgICB0aHJvdyBlO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgfVxuXG4gICAgcmV0dXJuIGRhdGE7XG4gIH1dLFxuXG4gIC8qKlxuICAgKiBBIHRpbWVvdXQgaW4gbWlsbGlzZWNvbmRzIHRvIGFib3J0IGEgcmVxdWVzdC4gSWYgc2V0IHRvIDAgKGRlZmF1bHQpIGFcbiAgICogdGltZW91dCBpcyBub3QgY3JlYXRlZC5cbiAgICovXG4gIHRpbWVvdXQ6IDAsXG5cbiAgeHNyZkNvb2tpZU5hbWU6ICdYU1JGLVRPS0VOJyxcbiAgeHNyZkhlYWRlck5hbWU6ICdYLVhTUkYtVE9LRU4nLFxuXG4gIG1heENvbnRlbnRMZW5ndGg6IC0xLFxuICBtYXhCb2R5TGVuZ3RoOiAtMSxcblxuICBlbnY6IHtcbiAgICBGb3JtRGF0YTogcmVxdWlyZSgnLi9lbnYvRm9ybURhdGEnKVxuICB9LFxuXG4gIHZhbGlkYXRlU3RhdHVzOiBmdW5jdGlvbiB2YWxpZGF0ZVN0YXR1cyhzdGF0dXMpIHtcbiAgICByZXR1cm4gc3RhdHVzID49IDIwMCAmJiBzdGF0dXMgPCAzMDA7XG4gIH0sXG5cbiAgaGVhZGVyczoge1xuICAgIGNvbW1vbjoge1xuICAgICAgJ0FjY2VwdCc6ICdhcHBsaWNhdGlvbi9qc29uLCB0ZXh0L3BsYWluLCAqLyonXG4gICAgfVxuICB9XG59O1xuXG51dGlscy5mb3JFYWNoKFsnZGVsZXRlJywgJ2dldCcsICdoZWFkJ10sIGZ1bmN0aW9uIGZvckVhY2hNZXRob2ROb0RhdGEobWV0aG9kKSB7XG4gIGRlZmF1bHRzLmhlYWRlcnNbbWV0aG9kXSA9IHt9O1xufSk7XG5cbnV0aWxzLmZvckVhY2goWydwb3N0JywgJ3B1dCcsICdwYXRjaCddLCBmdW5jdGlvbiBmb3JFYWNoTWV0aG9kV2l0aERhdGEobWV0aG9kKSB7XG4gIGRlZmF1bHRzLmhlYWRlcnNbbWV0aG9kXSA9IHV0aWxzLm1lcmdlKERFRkFVTFRfQ09OVEVOVF9UWVBFKTtcbn0pO1xuXG5tb2R1bGUuZXhwb3J0cyA9IGRlZmF1bHRzO1xuIiwgIid1c2Ugc3RyaWN0JztcblxudmFyIHV0aWxzID0gcmVxdWlyZSgnLi8uLi91dGlscycpO1xudmFyIGRlZmF1bHRzID0gcmVxdWlyZSgnLi4vZGVmYXVsdHMnKTtcblxuLyoqXG4gKiBUcmFuc2Zvcm0gdGhlIGRhdGEgZm9yIGEgcmVxdWVzdCBvciBhIHJlc3BvbnNlXG4gKlxuICogQHBhcmFtIHtPYmplY3R8U3RyaW5nfSBkYXRhIFRoZSBkYXRhIHRvIGJlIHRyYW5zZm9ybWVkXG4gKiBAcGFyYW0ge0FycmF5fSBoZWFkZXJzIFRoZSBoZWFkZXJzIGZvciB0aGUgcmVxdWVzdCBvciByZXNwb25zZVxuICogQHBhcmFtIHtBcnJheXxGdW5jdGlvbn0gZm5zIEEgc2luZ2xlIGZ1bmN0aW9uIG9yIEFycmF5IG9mIGZ1bmN0aW9uc1xuICogQHJldHVybnMgeyp9IFRoZSByZXN1bHRpbmcgdHJhbnNmb3JtZWQgZGF0YVxuICovXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIHRyYW5zZm9ybURhdGEoZGF0YSwgaGVhZGVycywgZm5zKSB7XG4gIHZhciBjb250ZXh0ID0gdGhpcyB8fCBkZWZhdWx0cztcbiAgLyplc2xpbnQgbm8tcGFyYW0tcmVhc3NpZ246MCovXG4gIHV0aWxzLmZvckVhY2goZm5zLCBmdW5jdGlvbiB0cmFuc2Zvcm0oZm4pIHtcbiAgICBkYXRhID0gZm4uY2FsbChjb250ZXh0LCBkYXRhLCBoZWFkZXJzKTtcbiAgfSk7XG5cbiAgcmV0dXJuIGRhdGE7XG59O1xuIiwgIid1c2Ugc3RyaWN0JztcblxubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiBpc0NhbmNlbCh2YWx1ZSkge1xuICByZXR1cm4gISEodmFsdWUgJiYgdmFsdWUuX19DQU5DRUxfXyk7XG59O1xuIiwgIid1c2Ugc3RyaWN0JztcblxudmFyIHV0aWxzID0gcmVxdWlyZSgnLi8uLi91dGlscycpO1xudmFyIHRyYW5zZm9ybURhdGEgPSByZXF1aXJlKCcuL3RyYW5zZm9ybURhdGEnKTtcbnZhciBpc0NhbmNlbCA9IHJlcXVpcmUoJy4uL2NhbmNlbC9pc0NhbmNlbCcpO1xudmFyIGRlZmF1bHRzID0gcmVxdWlyZSgnLi4vZGVmYXVsdHMnKTtcbnZhciBDYW5jZWxlZEVycm9yID0gcmVxdWlyZSgnLi4vY2FuY2VsL0NhbmNlbGVkRXJyb3InKTtcblxuLyoqXG4gKiBUaHJvd3MgYSBgQ2FuY2VsZWRFcnJvcmAgaWYgY2FuY2VsbGF0aW9uIGhhcyBiZWVuIHJlcXVlc3RlZC5cbiAqL1xuZnVuY3Rpb24gdGhyb3dJZkNhbmNlbGxhdGlvblJlcXVlc3RlZChjb25maWcpIHtcbiAgaWYgKGNvbmZpZy5jYW5jZWxUb2tlbikge1xuICAgIGNvbmZpZy5jYW5jZWxUb2tlbi50aHJvd0lmUmVxdWVzdGVkKCk7XG4gIH1cblxuICBpZiAoY29uZmlnLnNpZ25hbCAmJiBjb25maWcuc2lnbmFsLmFib3J0ZWQpIHtcbiAgICB0aHJvdyBuZXcgQ2FuY2VsZWRFcnJvcigpO1xuICB9XG59XG5cbi8qKlxuICogRGlzcGF0Y2ggYSByZXF1ZXN0IHRvIHRoZSBzZXJ2ZXIgdXNpbmcgdGhlIGNvbmZpZ3VyZWQgYWRhcHRlci5cbiAqXG4gKiBAcGFyYW0ge29iamVjdH0gY29uZmlnIFRoZSBjb25maWcgdGhhdCBpcyB0byBiZSB1c2VkIGZvciB0aGUgcmVxdWVzdFxuICogQHJldHVybnMge1Byb21pc2V9IFRoZSBQcm9taXNlIHRvIGJlIGZ1bGZpbGxlZFxuICovXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIGRpc3BhdGNoUmVxdWVzdChjb25maWcpIHtcbiAgdGhyb3dJZkNhbmNlbGxhdGlvblJlcXVlc3RlZChjb25maWcpO1xuXG4gIC8vIEVuc3VyZSBoZWFkZXJzIGV4aXN0XG4gIGNvbmZpZy5oZWFkZXJzID0gY29uZmlnLmhlYWRlcnMgfHwge307XG5cbiAgLy8gVHJhbnNmb3JtIHJlcXVlc3QgZGF0YVxuICBjb25maWcuZGF0YSA9IHRyYW5zZm9ybURhdGEuY2FsbChcbiAgICBjb25maWcsXG4gICAgY29uZmlnLmRhdGEsXG4gICAgY29uZmlnLmhlYWRlcnMsXG4gICAgY29uZmlnLnRyYW5zZm9ybVJlcXVlc3RcbiAgKTtcblxuICAvLyBGbGF0dGVuIGhlYWRlcnNcbiAgY29uZmlnLmhlYWRlcnMgPSB1dGlscy5tZXJnZShcbiAgICBjb25maWcuaGVhZGVycy5jb21tb24gfHwge30sXG4gICAgY29uZmlnLmhlYWRlcnNbY29uZmlnLm1ldGhvZF0gfHwge30sXG4gICAgY29uZmlnLmhlYWRlcnNcbiAgKTtcblxuICB1dGlscy5mb3JFYWNoKFxuICAgIFsnZGVsZXRlJywgJ2dldCcsICdoZWFkJywgJ3Bvc3QnLCAncHV0JywgJ3BhdGNoJywgJ2NvbW1vbiddLFxuICAgIGZ1bmN0aW9uIGNsZWFuSGVhZGVyQ29uZmlnKG1ldGhvZCkge1xuICAgICAgZGVsZXRlIGNvbmZpZy5oZWFkZXJzW21ldGhvZF07XG4gICAgfVxuICApO1xuXG4gIHZhciBhZGFwdGVyID0gY29uZmlnLmFkYXB0ZXIgfHwgZGVmYXVsdHMuYWRhcHRlcjtcblxuICByZXR1cm4gYWRhcHRlcihjb25maWcpLnRoZW4oZnVuY3Rpb24gb25BZGFwdGVyUmVzb2x1dGlvbihyZXNwb25zZSkge1xuICAgIHRocm93SWZDYW5jZWxsYXRpb25SZXF1ZXN0ZWQoY29uZmlnKTtcblxuICAgIC8vIFRyYW5zZm9ybSByZXNwb25zZSBkYXRhXG4gICAgcmVzcG9uc2UuZGF0YSA9IHRyYW5zZm9ybURhdGEuY2FsbChcbiAgICAgIGNvbmZpZyxcbiAgICAgIHJlc3BvbnNlLmRhdGEsXG4gICAgICByZXNwb25zZS5oZWFkZXJzLFxuICAgICAgY29uZmlnLnRyYW5zZm9ybVJlc3BvbnNlXG4gICAgKTtcblxuICAgIHJldHVybiByZXNwb25zZTtcbiAgfSwgZnVuY3Rpb24gb25BZGFwdGVyUmVqZWN0aW9uKHJlYXNvbikge1xuICAgIGlmICghaXNDYW5jZWwocmVhc29uKSkge1xuICAgICAgdGhyb3dJZkNhbmNlbGxhdGlvblJlcXVlc3RlZChjb25maWcpO1xuXG4gICAgICAvLyBUcmFuc2Zvcm0gcmVzcG9uc2UgZGF0YVxuICAgICAgaWYgKHJlYXNvbiAmJiByZWFzb24ucmVzcG9uc2UpIHtcbiAgICAgICAgcmVhc29uLnJlc3BvbnNlLmRhdGEgPSB0cmFuc2Zvcm1EYXRhLmNhbGwoXG4gICAgICAgICAgY29uZmlnLFxuICAgICAgICAgIHJlYXNvbi5yZXNwb25zZS5kYXRhLFxuICAgICAgICAgIHJlYXNvbi5yZXNwb25zZS5oZWFkZXJzLFxuICAgICAgICAgIGNvbmZpZy50cmFuc2Zvcm1SZXNwb25zZVxuICAgICAgICApO1xuICAgICAgfVxuICAgIH1cblxuICAgIHJldHVybiBQcm9taXNlLnJlamVjdChyZWFzb24pO1xuICB9KTtcbn07XG4iLCAiJ3VzZSBzdHJpY3QnO1xuXG52YXIgdXRpbHMgPSByZXF1aXJlKCcuLi91dGlscycpO1xuXG4vKipcbiAqIENvbmZpZy1zcGVjaWZpYyBtZXJnZS1mdW5jdGlvbiB3aGljaCBjcmVhdGVzIGEgbmV3IGNvbmZpZy1vYmplY3RcbiAqIGJ5IG1lcmdpbmcgdHdvIGNvbmZpZ3VyYXRpb24gb2JqZWN0cyB0b2dldGhlci5cbiAqXG4gKiBAcGFyYW0ge09iamVjdH0gY29uZmlnMVxuICogQHBhcmFtIHtPYmplY3R9IGNvbmZpZzJcbiAqIEByZXR1cm5zIHtPYmplY3R9IE5ldyBvYmplY3QgcmVzdWx0aW5nIGZyb20gbWVyZ2luZyBjb25maWcyIHRvIGNvbmZpZzFcbiAqL1xubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiBtZXJnZUNvbmZpZyhjb25maWcxLCBjb25maWcyKSB7XG4gIC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBuby1wYXJhbS1yZWFzc2lnblxuICBjb25maWcyID0gY29uZmlnMiB8fCB7fTtcbiAgdmFyIGNvbmZpZyA9IHt9O1xuXG4gIGZ1bmN0aW9uIGdldE1lcmdlZFZhbHVlKHRhcmdldCwgc291cmNlKSB7XG4gICAgaWYgKHV0aWxzLmlzUGxhaW5PYmplY3QodGFyZ2V0KSAmJiB1dGlscy5pc1BsYWluT2JqZWN0KHNvdXJjZSkpIHtcbiAgICAgIHJldHVybiB1dGlscy5tZXJnZSh0YXJnZXQsIHNvdXJjZSk7XG4gICAgfSBlbHNlIGlmICh1dGlscy5pc1BsYWluT2JqZWN0KHNvdXJjZSkpIHtcbiAgICAgIHJldHVybiB1dGlscy5tZXJnZSh7fSwgc291cmNlKTtcbiAgICB9IGVsc2UgaWYgKHV0aWxzLmlzQXJyYXkoc291cmNlKSkge1xuICAgICAgcmV0dXJuIHNvdXJjZS5zbGljZSgpO1xuICAgIH1cbiAgICByZXR1cm4gc291cmNlO1xuICB9XG5cbiAgLy8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIGNvbnNpc3RlbnQtcmV0dXJuXG4gIGZ1bmN0aW9uIG1lcmdlRGVlcFByb3BlcnRpZXMocHJvcCkge1xuICAgIGlmICghdXRpbHMuaXNVbmRlZmluZWQoY29uZmlnMltwcm9wXSkpIHtcbiAgICAgIHJldHVybiBnZXRNZXJnZWRWYWx1ZShjb25maWcxW3Byb3BdLCBjb25maWcyW3Byb3BdKTtcbiAgICB9IGVsc2UgaWYgKCF1dGlscy5pc1VuZGVmaW5lZChjb25maWcxW3Byb3BdKSkge1xuICAgICAgcmV0dXJuIGdldE1lcmdlZFZhbHVlKHVuZGVmaW5lZCwgY29uZmlnMVtwcm9wXSk7XG4gICAgfVxuICB9XG5cbiAgLy8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIGNvbnNpc3RlbnQtcmV0dXJuXG4gIGZ1bmN0aW9uIHZhbHVlRnJvbUNvbmZpZzIocHJvcCkge1xuICAgIGlmICghdXRpbHMuaXNVbmRlZmluZWQoY29uZmlnMltwcm9wXSkpIHtcbiAgICAgIHJldHVybiBnZXRNZXJnZWRWYWx1ZSh1bmRlZmluZWQsIGNvbmZpZzJbcHJvcF0pO1xuICAgIH1cbiAgfVxuXG4gIC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBjb25zaXN0ZW50LXJldHVyblxuICBmdW5jdGlvbiBkZWZhdWx0VG9Db25maWcyKHByb3ApIHtcbiAgICBpZiAoIXV0aWxzLmlzVW5kZWZpbmVkKGNvbmZpZzJbcHJvcF0pKSB7XG4gICAgICByZXR1cm4gZ2V0TWVyZ2VkVmFsdWUodW5kZWZpbmVkLCBjb25maWcyW3Byb3BdKTtcbiAgICB9IGVsc2UgaWYgKCF1dGlscy5pc1VuZGVmaW5lZChjb25maWcxW3Byb3BdKSkge1xuICAgICAgcmV0dXJuIGdldE1lcmdlZFZhbHVlKHVuZGVmaW5lZCwgY29uZmlnMVtwcm9wXSk7XG4gICAgfVxuICB9XG5cbiAgLy8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIGNvbnNpc3RlbnQtcmV0dXJuXG4gIGZ1bmN0aW9uIG1lcmdlRGlyZWN0S2V5cyhwcm9wKSB7XG4gICAgaWYgKHByb3AgaW4gY29uZmlnMikge1xuICAgICAgcmV0dXJuIGdldE1lcmdlZFZhbHVlKGNvbmZpZzFbcHJvcF0sIGNvbmZpZzJbcHJvcF0pO1xuICAgIH0gZWxzZSBpZiAocHJvcCBpbiBjb25maWcxKSB7XG4gICAgICByZXR1cm4gZ2V0TWVyZ2VkVmFsdWUodW5kZWZpbmVkLCBjb25maWcxW3Byb3BdKTtcbiAgICB9XG4gIH1cblxuICB2YXIgbWVyZ2VNYXAgPSB7XG4gICAgJ3VybCc6IHZhbHVlRnJvbUNvbmZpZzIsXG4gICAgJ21ldGhvZCc6IHZhbHVlRnJvbUNvbmZpZzIsXG4gICAgJ2RhdGEnOiB2YWx1ZUZyb21Db25maWcyLFxuICAgICdiYXNlVVJMJzogZGVmYXVsdFRvQ29uZmlnMixcbiAgICAndHJhbnNmb3JtUmVxdWVzdCc6IGRlZmF1bHRUb0NvbmZpZzIsXG4gICAgJ3RyYW5zZm9ybVJlc3BvbnNlJzogZGVmYXVsdFRvQ29uZmlnMixcbiAgICAncGFyYW1zU2VyaWFsaXplcic6IGRlZmF1bHRUb0NvbmZpZzIsXG4gICAgJ3RpbWVvdXQnOiBkZWZhdWx0VG9Db25maWcyLFxuICAgICd0aW1lb3V0TWVzc2FnZSc6IGRlZmF1bHRUb0NvbmZpZzIsXG4gICAgJ3dpdGhDcmVkZW50aWFscyc6IGRlZmF1bHRUb0NvbmZpZzIsXG4gICAgJ2FkYXB0ZXInOiBkZWZhdWx0VG9Db25maWcyLFxuICAgICdyZXNwb25zZVR5cGUnOiBkZWZhdWx0VG9Db25maWcyLFxuICAgICd4c3JmQ29va2llTmFtZSc6IGRlZmF1bHRUb0NvbmZpZzIsXG4gICAgJ3hzcmZIZWFkZXJOYW1lJzogZGVmYXVsdFRvQ29uZmlnMixcbiAgICAnb25VcGxvYWRQcm9ncmVzcyc6IGRlZmF1bHRUb0NvbmZpZzIsXG4gICAgJ29uRG93bmxvYWRQcm9ncmVzcyc6IGRlZmF1bHRUb0NvbmZpZzIsXG4gICAgJ2RlY29tcHJlc3MnOiBkZWZhdWx0VG9Db25maWcyLFxuICAgICdtYXhDb250ZW50TGVuZ3RoJzogZGVmYXVsdFRvQ29uZmlnMixcbiAgICAnbWF4Qm9keUxlbmd0aCc6IGRlZmF1bHRUb0NvbmZpZzIsXG4gICAgJ2JlZm9yZVJlZGlyZWN0JzogZGVmYXVsdFRvQ29uZmlnMixcbiAgICAndHJhbnNwb3J0JzogZGVmYXVsdFRvQ29uZmlnMixcbiAgICAnaHR0cEFnZW50JzogZGVmYXVsdFRvQ29uZmlnMixcbiAgICAnaHR0cHNBZ2VudCc6IGRlZmF1bHRUb0NvbmZpZzIsXG4gICAgJ2NhbmNlbFRva2VuJzogZGVmYXVsdFRvQ29uZmlnMixcbiAgICAnc29ja2V0UGF0aCc6IGRlZmF1bHRUb0NvbmZpZzIsXG4gICAgJ3Jlc3BvbnNlRW5jb2RpbmcnOiBkZWZhdWx0VG9Db25maWcyLFxuICAgICd2YWxpZGF0ZVN0YXR1cyc6IG1lcmdlRGlyZWN0S2V5c1xuICB9O1xuXG4gIHV0aWxzLmZvckVhY2goT2JqZWN0LmtleXMoY29uZmlnMSkuY29uY2F0KE9iamVjdC5rZXlzKGNvbmZpZzIpKSwgZnVuY3Rpb24gY29tcHV0ZUNvbmZpZ1ZhbHVlKHByb3ApIHtcbiAgICB2YXIgbWVyZ2UgPSBtZXJnZU1hcFtwcm9wXSB8fCBtZXJnZURlZXBQcm9wZXJ0aWVzO1xuICAgIHZhciBjb25maWdWYWx1ZSA9IG1lcmdlKHByb3ApO1xuICAgICh1dGlscy5pc1VuZGVmaW5lZChjb25maWdWYWx1ZSkgJiYgbWVyZ2UgIT09IG1lcmdlRGlyZWN0S2V5cykgfHwgKGNvbmZpZ1twcm9wXSA9IGNvbmZpZ1ZhbHVlKTtcbiAgfSk7XG5cbiAgcmV0dXJuIGNvbmZpZztcbn07XG4iLCAibW9kdWxlLmV4cG9ydHMgPSB7XG4gIFwidmVyc2lvblwiOiBcIjAuMjcuMlwiXG59OyIsICIndXNlIHN0cmljdCc7XG5cbnZhciBWRVJTSU9OID0gcmVxdWlyZSgnLi4vZW52L2RhdGEnKS52ZXJzaW9uO1xudmFyIEF4aW9zRXJyb3IgPSByZXF1aXJlKCcuLi9jb3JlL0F4aW9zRXJyb3InKTtcblxudmFyIHZhbGlkYXRvcnMgPSB7fTtcblxuLy8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIGZ1bmMtbmFtZXNcblsnb2JqZWN0JywgJ2Jvb2xlYW4nLCAnbnVtYmVyJywgJ2Z1bmN0aW9uJywgJ3N0cmluZycsICdzeW1ib2wnXS5mb3JFYWNoKGZ1bmN0aW9uKHR5cGUsIGkpIHtcbiAgdmFsaWRhdG9yc1t0eXBlXSA9IGZ1bmN0aW9uIHZhbGlkYXRvcih0aGluZykge1xuICAgIHJldHVybiB0eXBlb2YgdGhpbmcgPT09IHR5cGUgfHwgJ2EnICsgKGkgPCAxID8gJ24gJyA6ICcgJykgKyB0eXBlO1xuICB9O1xufSk7XG5cbnZhciBkZXByZWNhdGVkV2FybmluZ3MgPSB7fTtcblxuLyoqXG4gKiBUcmFuc2l0aW9uYWwgb3B0aW9uIHZhbGlkYXRvclxuICogQHBhcmFtIHtmdW5jdGlvbnxib29sZWFuP30gdmFsaWRhdG9yIC0gc2V0IHRvIGZhbHNlIGlmIHRoZSB0cmFuc2l0aW9uYWwgb3B0aW9uIGhhcyBiZWVuIHJlbW92ZWRcbiAqIEBwYXJhbSB7c3RyaW5nP30gdmVyc2lvbiAtIGRlcHJlY2F0ZWQgdmVyc2lvbiAvIHJlbW92ZWQgc2luY2UgdmVyc2lvblxuICogQHBhcmFtIHtzdHJpbmc/fSBtZXNzYWdlIC0gc29tZSBtZXNzYWdlIHdpdGggYWRkaXRpb25hbCBpbmZvXG4gKiBAcmV0dXJucyB7ZnVuY3Rpb259XG4gKi9cbnZhbGlkYXRvcnMudHJhbnNpdGlvbmFsID0gZnVuY3Rpb24gdHJhbnNpdGlvbmFsKHZhbGlkYXRvciwgdmVyc2lvbiwgbWVzc2FnZSkge1xuICBmdW5jdGlvbiBmb3JtYXRNZXNzYWdlKG9wdCwgZGVzYykge1xuICAgIHJldHVybiAnW0F4aW9zIHYnICsgVkVSU0lPTiArICddIFRyYW5zaXRpb25hbCBvcHRpb24gXFwnJyArIG9wdCArICdcXCcnICsgZGVzYyArIChtZXNzYWdlID8gJy4gJyArIG1lc3NhZ2UgOiAnJyk7XG4gIH1cblxuICAvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgZnVuYy1uYW1lc1xuICByZXR1cm4gZnVuY3Rpb24odmFsdWUsIG9wdCwgb3B0cykge1xuICAgIGlmICh2YWxpZGF0b3IgPT09IGZhbHNlKSB7XG4gICAgICB0aHJvdyBuZXcgQXhpb3NFcnJvcihcbiAgICAgICAgZm9ybWF0TWVzc2FnZShvcHQsICcgaGFzIGJlZW4gcmVtb3ZlZCcgKyAodmVyc2lvbiA/ICcgaW4gJyArIHZlcnNpb24gOiAnJykpLFxuICAgICAgICBBeGlvc0Vycm9yLkVSUl9ERVBSRUNBVEVEXG4gICAgICApO1xuICAgIH1cblxuICAgIGlmICh2ZXJzaW9uICYmICFkZXByZWNhdGVkV2FybmluZ3Nbb3B0XSkge1xuICAgICAgZGVwcmVjYXRlZFdhcm5pbmdzW29wdF0gPSB0cnVlO1xuICAgICAgLy8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIG5vLWNvbnNvbGVcbiAgICAgIGNvbnNvbGUud2FybihcbiAgICAgICAgZm9ybWF0TWVzc2FnZShcbiAgICAgICAgICBvcHQsXG4gICAgICAgICAgJyBoYXMgYmVlbiBkZXByZWNhdGVkIHNpbmNlIHYnICsgdmVyc2lvbiArICcgYW5kIHdpbGwgYmUgcmVtb3ZlZCBpbiB0aGUgbmVhciBmdXR1cmUnXG4gICAgICAgIClcbiAgICAgICk7XG4gICAgfVxuXG4gICAgcmV0dXJuIHZhbGlkYXRvciA/IHZhbGlkYXRvcih2YWx1ZSwgb3B0LCBvcHRzKSA6IHRydWU7XG4gIH07XG59O1xuXG4vKipcbiAqIEFzc2VydCBvYmplY3QncyBwcm9wZXJ0aWVzIHR5cGVcbiAqIEBwYXJhbSB7b2JqZWN0fSBvcHRpb25zXG4gKiBAcGFyYW0ge29iamVjdH0gc2NoZW1hXG4gKiBAcGFyYW0ge2Jvb2xlYW4/fSBhbGxvd1Vua25vd25cbiAqL1xuXG5mdW5jdGlvbiBhc3NlcnRPcHRpb25zKG9wdGlvbnMsIHNjaGVtYSwgYWxsb3dVbmtub3duKSB7XG4gIGlmICh0eXBlb2Ygb3B0aW9ucyAhPT0gJ29iamVjdCcpIHtcbiAgICB0aHJvdyBuZXcgQXhpb3NFcnJvcignb3B0aW9ucyBtdXN0IGJlIGFuIG9iamVjdCcsIEF4aW9zRXJyb3IuRVJSX0JBRF9PUFRJT05fVkFMVUUpO1xuICB9XG4gIHZhciBrZXlzID0gT2JqZWN0LmtleXMob3B0aW9ucyk7XG4gIHZhciBpID0ga2V5cy5sZW5ndGg7XG4gIHdoaWxlIChpLS0gPiAwKSB7XG4gICAgdmFyIG9wdCA9IGtleXNbaV07XG4gICAgdmFyIHZhbGlkYXRvciA9IHNjaGVtYVtvcHRdO1xuICAgIGlmICh2YWxpZGF0b3IpIHtcbiAgICAgIHZhciB2YWx1ZSA9IG9wdGlvbnNbb3B0XTtcbiAgICAgIHZhciByZXN1bHQgPSB2YWx1ZSA9PT0gdW5kZWZpbmVkIHx8IHZhbGlkYXRvcih2YWx1ZSwgb3B0LCBvcHRpb25zKTtcbiAgICAgIGlmIChyZXN1bHQgIT09IHRydWUpIHtcbiAgICAgICAgdGhyb3cgbmV3IEF4aW9zRXJyb3IoJ29wdGlvbiAnICsgb3B0ICsgJyBtdXN0IGJlICcgKyByZXN1bHQsIEF4aW9zRXJyb3IuRVJSX0JBRF9PUFRJT05fVkFMVUUpO1xuICAgICAgfVxuICAgICAgY29udGludWU7XG4gICAgfVxuICAgIGlmIChhbGxvd1Vua25vd24gIT09IHRydWUpIHtcbiAgICAgIHRocm93IG5ldyBBeGlvc0Vycm9yKCdVbmtub3duIG9wdGlvbiAnICsgb3B0LCBBeGlvc0Vycm9yLkVSUl9CQURfT1BUSU9OKTtcbiAgICB9XG4gIH1cbn1cblxubW9kdWxlLmV4cG9ydHMgPSB7XG4gIGFzc2VydE9wdGlvbnM6IGFzc2VydE9wdGlvbnMsXG4gIHZhbGlkYXRvcnM6IHZhbGlkYXRvcnNcbn07XG4iLCAiJ3VzZSBzdHJpY3QnO1xuXG52YXIgdXRpbHMgPSByZXF1aXJlKCcuLy4uL3V0aWxzJyk7XG52YXIgYnVpbGRVUkwgPSByZXF1aXJlKCcuLi9oZWxwZXJzL2J1aWxkVVJMJyk7XG52YXIgSW50ZXJjZXB0b3JNYW5hZ2VyID0gcmVxdWlyZSgnLi9JbnRlcmNlcHRvck1hbmFnZXInKTtcbnZhciBkaXNwYXRjaFJlcXVlc3QgPSByZXF1aXJlKCcuL2Rpc3BhdGNoUmVxdWVzdCcpO1xudmFyIG1lcmdlQ29uZmlnID0gcmVxdWlyZSgnLi9tZXJnZUNvbmZpZycpO1xudmFyIGJ1aWxkRnVsbFBhdGggPSByZXF1aXJlKCcuL2J1aWxkRnVsbFBhdGgnKTtcbnZhciB2YWxpZGF0b3IgPSByZXF1aXJlKCcuLi9oZWxwZXJzL3ZhbGlkYXRvcicpO1xuXG52YXIgdmFsaWRhdG9ycyA9IHZhbGlkYXRvci52YWxpZGF0b3JzO1xuLyoqXG4gKiBDcmVhdGUgYSBuZXcgaW5zdGFuY2Ugb2YgQXhpb3NcbiAqXG4gKiBAcGFyYW0ge09iamVjdH0gaW5zdGFuY2VDb25maWcgVGhlIGRlZmF1bHQgY29uZmlnIGZvciB0aGUgaW5zdGFuY2VcbiAqL1xuZnVuY3Rpb24gQXhpb3MoaW5zdGFuY2VDb25maWcpIHtcbiAgdGhpcy5kZWZhdWx0cyA9IGluc3RhbmNlQ29uZmlnO1xuICB0aGlzLmludGVyY2VwdG9ycyA9IHtcbiAgICByZXF1ZXN0OiBuZXcgSW50ZXJjZXB0b3JNYW5hZ2VyKCksXG4gICAgcmVzcG9uc2U6IG5ldyBJbnRlcmNlcHRvck1hbmFnZXIoKVxuICB9O1xufVxuXG4vKipcbiAqIERpc3BhdGNoIGEgcmVxdWVzdFxuICpcbiAqIEBwYXJhbSB7T2JqZWN0fSBjb25maWcgVGhlIGNvbmZpZyBzcGVjaWZpYyBmb3IgdGhpcyByZXF1ZXN0IChtZXJnZWQgd2l0aCB0aGlzLmRlZmF1bHRzKVxuICovXG5BeGlvcy5wcm90b3R5cGUucmVxdWVzdCA9IGZ1bmN0aW9uIHJlcXVlc3QoY29uZmlnT3JVcmwsIGNvbmZpZykge1xuICAvKmVzbGludCBuby1wYXJhbS1yZWFzc2lnbjowKi9cbiAgLy8gQWxsb3cgZm9yIGF4aW9zKCdleGFtcGxlL3VybCdbLCBjb25maWddKSBhIGxhIGZldGNoIEFQSVxuICBpZiAodHlwZW9mIGNvbmZpZ09yVXJsID09PSAnc3RyaW5nJykge1xuICAgIGNvbmZpZyA9IGNvbmZpZyB8fCB7fTtcbiAgICBjb25maWcudXJsID0gY29uZmlnT3JVcmw7XG4gIH0gZWxzZSB7XG4gICAgY29uZmlnID0gY29uZmlnT3JVcmwgfHwge307XG4gIH1cblxuICBjb25maWcgPSBtZXJnZUNvbmZpZyh0aGlzLmRlZmF1bHRzLCBjb25maWcpO1xuXG4gIC8vIFNldCBjb25maWcubWV0aG9kXG4gIGlmIChjb25maWcubWV0aG9kKSB7XG4gICAgY29uZmlnLm1ldGhvZCA9IGNvbmZpZy5tZXRob2QudG9Mb3dlckNhc2UoKTtcbiAgfSBlbHNlIGlmICh0aGlzLmRlZmF1bHRzLm1ldGhvZCkge1xuICAgIGNvbmZpZy5tZXRob2QgPSB0aGlzLmRlZmF1bHRzLm1ldGhvZC50b0xvd2VyQ2FzZSgpO1xuICB9IGVsc2Uge1xuICAgIGNvbmZpZy5tZXRob2QgPSAnZ2V0JztcbiAgfVxuXG4gIHZhciB0cmFuc2l0aW9uYWwgPSBjb25maWcudHJhbnNpdGlvbmFsO1xuXG4gIGlmICh0cmFuc2l0aW9uYWwgIT09IHVuZGVmaW5lZCkge1xuICAgIHZhbGlkYXRvci5hc3NlcnRPcHRpb25zKHRyYW5zaXRpb25hbCwge1xuICAgICAgc2lsZW50SlNPTlBhcnNpbmc6IHZhbGlkYXRvcnMudHJhbnNpdGlvbmFsKHZhbGlkYXRvcnMuYm9vbGVhbiksXG4gICAgICBmb3JjZWRKU09OUGFyc2luZzogdmFsaWRhdG9ycy50cmFuc2l0aW9uYWwodmFsaWRhdG9ycy5ib29sZWFuKSxcbiAgICAgIGNsYXJpZnlUaW1lb3V0RXJyb3I6IHZhbGlkYXRvcnMudHJhbnNpdGlvbmFsKHZhbGlkYXRvcnMuYm9vbGVhbilcbiAgICB9LCBmYWxzZSk7XG4gIH1cblxuICAvLyBmaWx0ZXIgb3V0IHNraXBwZWQgaW50ZXJjZXB0b3JzXG4gIHZhciByZXF1ZXN0SW50ZXJjZXB0b3JDaGFpbiA9IFtdO1xuICB2YXIgc3luY2hyb25vdXNSZXF1ZXN0SW50ZXJjZXB0b3JzID0gdHJ1ZTtcbiAgdGhpcy5pbnRlcmNlcHRvcnMucmVxdWVzdC5mb3JFYWNoKGZ1bmN0aW9uIHVuc2hpZnRSZXF1ZXN0SW50ZXJjZXB0b3JzKGludGVyY2VwdG9yKSB7XG4gICAgaWYgKHR5cGVvZiBpbnRlcmNlcHRvci5ydW5XaGVuID09PSAnZnVuY3Rpb24nICYmIGludGVyY2VwdG9yLnJ1bldoZW4oY29uZmlnKSA9PT0gZmFsc2UpIHtcbiAgICAgIHJldHVybjtcbiAgICB9XG5cbiAgICBzeW5jaHJvbm91c1JlcXVlc3RJbnRlcmNlcHRvcnMgPSBzeW5jaHJvbm91c1JlcXVlc3RJbnRlcmNlcHRvcnMgJiYgaW50ZXJjZXB0b3Iuc3luY2hyb25vdXM7XG5cbiAgICByZXF1ZXN0SW50ZXJjZXB0b3JDaGFpbi51bnNoaWZ0KGludGVyY2VwdG9yLmZ1bGZpbGxlZCwgaW50ZXJjZXB0b3IucmVqZWN0ZWQpO1xuICB9KTtcblxuICB2YXIgcmVzcG9uc2VJbnRlcmNlcHRvckNoYWluID0gW107XG4gIHRoaXMuaW50ZXJjZXB0b3JzLnJlc3BvbnNlLmZvckVhY2goZnVuY3Rpb24gcHVzaFJlc3BvbnNlSW50ZXJjZXB0b3JzKGludGVyY2VwdG9yKSB7XG4gICAgcmVzcG9uc2VJbnRlcmNlcHRvckNoYWluLnB1c2goaW50ZXJjZXB0b3IuZnVsZmlsbGVkLCBpbnRlcmNlcHRvci5yZWplY3RlZCk7XG4gIH0pO1xuXG4gIHZhciBwcm9taXNlO1xuXG4gIGlmICghc3luY2hyb25vdXNSZXF1ZXN0SW50ZXJjZXB0b3JzKSB7XG4gICAgdmFyIGNoYWluID0gW2Rpc3BhdGNoUmVxdWVzdCwgdW5kZWZpbmVkXTtcblxuICAgIEFycmF5LnByb3RvdHlwZS51bnNoaWZ0LmFwcGx5KGNoYWluLCByZXF1ZXN0SW50ZXJjZXB0b3JDaGFpbik7XG4gICAgY2hhaW4gPSBjaGFpbi5jb25jYXQocmVzcG9uc2VJbnRlcmNlcHRvckNoYWluKTtcblxuICAgIHByb21pc2UgPSBQcm9taXNlLnJlc29sdmUoY29uZmlnKTtcbiAgICB3aGlsZSAoY2hhaW4ubGVuZ3RoKSB7XG4gICAgICBwcm9taXNlID0gcHJvbWlzZS50aGVuKGNoYWluLnNoaWZ0KCksIGNoYWluLnNoaWZ0KCkpO1xuICAgIH1cblxuICAgIHJldHVybiBwcm9taXNlO1xuICB9XG5cblxuICB2YXIgbmV3Q29uZmlnID0gY29uZmlnO1xuICB3aGlsZSAocmVxdWVzdEludGVyY2VwdG9yQ2hhaW4ubGVuZ3RoKSB7XG4gICAgdmFyIG9uRnVsZmlsbGVkID0gcmVxdWVzdEludGVyY2VwdG9yQ2hhaW4uc2hpZnQoKTtcbiAgICB2YXIgb25SZWplY3RlZCA9IHJlcXVlc3RJbnRlcmNlcHRvckNoYWluLnNoaWZ0KCk7XG4gICAgdHJ5IHtcbiAgICAgIG5ld0NvbmZpZyA9IG9uRnVsZmlsbGVkKG5ld0NvbmZpZyk7XG4gICAgfSBjYXRjaCAoZXJyb3IpIHtcbiAgICAgIG9uUmVqZWN0ZWQoZXJyb3IpO1xuICAgICAgYnJlYWs7XG4gICAgfVxuICB9XG5cbiAgdHJ5IHtcbiAgICBwcm9taXNlID0gZGlzcGF0Y2hSZXF1ZXN0KG5ld0NvbmZpZyk7XG4gIH0gY2F0Y2ggKGVycm9yKSB7XG4gICAgcmV0dXJuIFByb21pc2UucmVqZWN0KGVycm9yKTtcbiAgfVxuXG4gIHdoaWxlIChyZXNwb25zZUludGVyY2VwdG9yQ2hhaW4ubGVuZ3RoKSB7XG4gICAgcHJvbWlzZSA9IHByb21pc2UudGhlbihyZXNwb25zZUludGVyY2VwdG9yQ2hhaW4uc2hpZnQoKSwgcmVzcG9uc2VJbnRlcmNlcHRvckNoYWluLnNoaWZ0KCkpO1xuICB9XG5cbiAgcmV0dXJuIHByb21pc2U7XG59O1xuXG5BeGlvcy5wcm90b3R5cGUuZ2V0VXJpID0gZnVuY3Rpb24gZ2V0VXJpKGNvbmZpZykge1xuICBjb25maWcgPSBtZXJnZUNvbmZpZyh0aGlzLmRlZmF1bHRzLCBjb25maWcpO1xuICB2YXIgZnVsbFBhdGggPSBidWlsZEZ1bGxQYXRoKGNvbmZpZy5iYXNlVVJMLCBjb25maWcudXJsKTtcbiAgcmV0dXJuIGJ1aWxkVVJMKGZ1bGxQYXRoLCBjb25maWcucGFyYW1zLCBjb25maWcucGFyYW1zU2VyaWFsaXplcik7XG59O1xuXG4vLyBQcm92aWRlIGFsaWFzZXMgZm9yIHN1cHBvcnRlZCByZXF1ZXN0IG1ldGhvZHNcbnV0aWxzLmZvckVhY2goWydkZWxldGUnLCAnZ2V0JywgJ2hlYWQnLCAnb3B0aW9ucyddLCBmdW5jdGlvbiBmb3JFYWNoTWV0aG9kTm9EYXRhKG1ldGhvZCkge1xuICAvKmVzbGludCBmdW5jLW5hbWVzOjAqL1xuICBBeGlvcy5wcm90b3R5cGVbbWV0aG9kXSA9IGZ1bmN0aW9uKHVybCwgY29uZmlnKSB7XG4gICAgcmV0dXJuIHRoaXMucmVxdWVzdChtZXJnZUNvbmZpZyhjb25maWcgfHwge30sIHtcbiAgICAgIG1ldGhvZDogbWV0aG9kLFxuICAgICAgdXJsOiB1cmwsXG4gICAgICBkYXRhOiAoY29uZmlnIHx8IHt9KS5kYXRhXG4gICAgfSkpO1xuICB9O1xufSk7XG5cbnV0aWxzLmZvckVhY2goWydwb3N0JywgJ3B1dCcsICdwYXRjaCddLCBmdW5jdGlvbiBmb3JFYWNoTWV0aG9kV2l0aERhdGEobWV0aG9kKSB7XG4gIC8qZXNsaW50IGZ1bmMtbmFtZXM6MCovXG5cbiAgZnVuY3Rpb24gZ2VuZXJhdGVIVFRQTWV0aG9kKGlzRm9ybSkge1xuICAgIHJldHVybiBmdW5jdGlvbiBodHRwTWV0aG9kKHVybCwgZGF0YSwgY29uZmlnKSB7XG4gICAgICByZXR1cm4gdGhpcy5yZXF1ZXN0KG1lcmdlQ29uZmlnKGNvbmZpZyB8fCB7fSwge1xuICAgICAgICBtZXRob2Q6IG1ldGhvZCxcbiAgICAgICAgaGVhZGVyczogaXNGb3JtID8ge1xuICAgICAgICAgICdDb250ZW50LVR5cGUnOiAnbXVsdGlwYXJ0L2Zvcm0tZGF0YSdcbiAgICAgICAgfSA6IHt9LFxuICAgICAgICB1cmw6IHVybCxcbiAgICAgICAgZGF0YTogZGF0YVxuICAgICAgfSkpO1xuICAgIH07XG4gIH1cblxuICBBeGlvcy5wcm90b3R5cGVbbWV0aG9kXSA9IGdlbmVyYXRlSFRUUE1ldGhvZCgpO1xuXG4gIEF4aW9zLnByb3RvdHlwZVttZXRob2QgKyAnRm9ybSddID0gZ2VuZXJhdGVIVFRQTWV0aG9kKHRydWUpO1xufSk7XG5cbm1vZHVsZS5leHBvcnRzID0gQXhpb3M7XG4iLCAiJ3VzZSBzdHJpY3QnO1xuXG52YXIgQ2FuY2VsZWRFcnJvciA9IHJlcXVpcmUoJy4vQ2FuY2VsZWRFcnJvcicpO1xuXG4vKipcbiAqIEEgYENhbmNlbFRva2VuYCBpcyBhbiBvYmplY3QgdGhhdCBjYW4gYmUgdXNlZCB0byByZXF1ZXN0IGNhbmNlbGxhdGlvbiBvZiBhbiBvcGVyYXRpb24uXG4gKlxuICogQGNsYXNzXG4gKiBAcGFyYW0ge0Z1bmN0aW9ufSBleGVjdXRvciBUaGUgZXhlY3V0b3IgZnVuY3Rpb24uXG4gKi9cbmZ1bmN0aW9uIENhbmNlbFRva2VuKGV4ZWN1dG9yKSB7XG4gIGlmICh0eXBlb2YgZXhlY3V0b3IgIT09ICdmdW5jdGlvbicpIHtcbiAgICB0aHJvdyBuZXcgVHlwZUVycm9yKCdleGVjdXRvciBtdXN0IGJlIGEgZnVuY3Rpb24uJyk7XG4gIH1cblxuICB2YXIgcmVzb2x2ZVByb21pc2U7XG5cbiAgdGhpcy5wcm9taXNlID0gbmV3IFByb21pc2UoZnVuY3Rpb24gcHJvbWlzZUV4ZWN1dG9yKHJlc29sdmUpIHtcbiAgICByZXNvbHZlUHJvbWlzZSA9IHJlc29sdmU7XG4gIH0pO1xuXG4gIHZhciB0b2tlbiA9IHRoaXM7XG5cbiAgLy8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIGZ1bmMtbmFtZXNcbiAgdGhpcy5wcm9taXNlLnRoZW4oZnVuY3Rpb24oY2FuY2VsKSB7XG4gICAgaWYgKCF0b2tlbi5fbGlzdGVuZXJzKSByZXR1cm47XG5cbiAgICB2YXIgaTtcbiAgICB2YXIgbCA9IHRva2VuLl9saXN0ZW5lcnMubGVuZ3RoO1xuXG4gICAgZm9yIChpID0gMDsgaSA8IGw7IGkrKykge1xuICAgICAgdG9rZW4uX2xpc3RlbmVyc1tpXShjYW5jZWwpO1xuICAgIH1cbiAgICB0b2tlbi5fbGlzdGVuZXJzID0gbnVsbDtcbiAgfSk7XG5cbiAgLy8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIGZ1bmMtbmFtZXNcbiAgdGhpcy5wcm9taXNlLnRoZW4gPSBmdW5jdGlvbihvbmZ1bGZpbGxlZCkge1xuICAgIHZhciBfcmVzb2x2ZTtcbiAgICAvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgZnVuYy1uYW1lc1xuICAgIHZhciBwcm9taXNlID0gbmV3IFByb21pc2UoZnVuY3Rpb24ocmVzb2x2ZSkge1xuICAgICAgdG9rZW4uc3Vic2NyaWJlKHJlc29sdmUpO1xuICAgICAgX3Jlc29sdmUgPSByZXNvbHZlO1xuICAgIH0pLnRoZW4ob25mdWxmaWxsZWQpO1xuXG4gICAgcHJvbWlzZS5jYW5jZWwgPSBmdW5jdGlvbiByZWplY3QoKSB7XG4gICAgICB0b2tlbi51bnN1YnNjcmliZShfcmVzb2x2ZSk7XG4gICAgfTtcblxuICAgIHJldHVybiBwcm9taXNlO1xuICB9O1xuXG4gIGV4ZWN1dG9yKGZ1bmN0aW9uIGNhbmNlbChtZXNzYWdlKSB7XG4gICAgaWYgKHRva2VuLnJlYXNvbikge1xuICAgICAgLy8gQ2FuY2VsbGF0aW9uIGhhcyBhbHJlYWR5IGJlZW4gcmVxdWVzdGVkXG4gICAgICByZXR1cm47XG4gICAgfVxuXG4gICAgdG9rZW4ucmVhc29uID0gbmV3IENhbmNlbGVkRXJyb3IobWVzc2FnZSk7XG4gICAgcmVzb2x2ZVByb21pc2UodG9rZW4ucmVhc29uKTtcbiAgfSk7XG59XG5cbi8qKlxuICogVGhyb3dzIGEgYENhbmNlbGVkRXJyb3JgIGlmIGNhbmNlbGxhdGlvbiBoYXMgYmVlbiByZXF1ZXN0ZWQuXG4gKi9cbkNhbmNlbFRva2VuLnByb3RvdHlwZS50aHJvd0lmUmVxdWVzdGVkID0gZnVuY3Rpb24gdGhyb3dJZlJlcXVlc3RlZCgpIHtcbiAgaWYgKHRoaXMucmVhc29uKSB7XG4gICAgdGhyb3cgdGhpcy5yZWFzb247XG4gIH1cbn07XG5cbi8qKlxuICogU3Vic2NyaWJlIHRvIHRoZSBjYW5jZWwgc2lnbmFsXG4gKi9cblxuQ2FuY2VsVG9rZW4ucHJvdG90eXBlLnN1YnNjcmliZSA9IGZ1bmN0aW9uIHN1YnNjcmliZShsaXN0ZW5lcikge1xuICBpZiAodGhpcy5yZWFzb24pIHtcbiAgICBsaXN0ZW5lcih0aGlzLnJlYXNvbik7XG4gICAgcmV0dXJuO1xuICB9XG5cbiAgaWYgKHRoaXMuX2xpc3RlbmVycykge1xuICAgIHRoaXMuX2xpc3RlbmVycy5wdXNoKGxpc3RlbmVyKTtcbiAgfSBlbHNlIHtcbiAgICB0aGlzLl9saXN0ZW5lcnMgPSBbbGlzdGVuZXJdO1xuICB9XG59O1xuXG4vKipcbiAqIFVuc3Vic2NyaWJlIGZyb20gdGhlIGNhbmNlbCBzaWduYWxcbiAqL1xuXG5DYW5jZWxUb2tlbi5wcm90b3R5cGUudW5zdWJzY3JpYmUgPSBmdW5jdGlvbiB1bnN1YnNjcmliZShsaXN0ZW5lcikge1xuICBpZiAoIXRoaXMuX2xpc3RlbmVycykge1xuICAgIHJldHVybjtcbiAgfVxuICB2YXIgaW5kZXggPSB0aGlzLl9saXN0ZW5lcnMuaW5kZXhPZihsaXN0ZW5lcik7XG4gIGlmIChpbmRleCAhPT0gLTEpIHtcbiAgICB0aGlzLl9saXN0ZW5lcnMuc3BsaWNlKGluZGV4LCAxKTtcbiAgfVxufTtcblxuLyoqXG4gKiBSZXR1cm5zIGFuIG9iamVjdCB0aGF0IGNvbnRhaW5zIGEgbmV3IGBDYW5jZWxUb2tlbmAgYW5kIGEgZnVuY3Rpb24gdGhhdCwgd2hlbiBjYWxsZWQsXG4gKiBjYW5jZWxzIHRoZSBgQ2FuY2VsVG9rZW5gLlxuICovXG5DYW5jZWxUb2tlbi5zb3VyY2UgPSBmdW5jdGlvbiBzb3VyY2UoKSB7XG4gIHZhciBjYW5jZWw7XG4gIHZhciB0b2tlbiA9IG5ldyBDYW5jZWxUb2tlbihmdW5jdGlvbiBleGVjdXRvcihjKSB7XG4gICAgY2FuY2VsID0gYztcbiAgfSk7XG4gIHJldHVybiB7XG4gICAgdG9rZW46IHRva2VuLFxuICAgIGNhbmNlbDogY2FuY2VsXG4gIH07XG59O1xuXG5tb2R1bGUuZXhwb3J0cyA9IENhbmNlbFRva2VuO1xuIiwgIid1c2Ugc3RyaWN0JztcblxuLyoqXG4gKiBTeW50YWN0aWMgc3VnYXIgZm9yIGludm9raW5nIGEgZnVuY3Rpb24gYW5kIGV4cGFuZGluZyBhbiBhcnJheSBmb3IgYXJndW1lbnRzLlxuICpcbiAqIENvbW1vbiB1c2UgY2FzZSB3b3VsZCBiZSB0byB1c2UgYEZ1bmN0aW9uLnByb3RvdHlwZS5hcHBseWAuXG4gKlxuICogIGBgYGpzXG4gKiAgZnVuY3Rpb24gZih4LCB5LCB6KSB7fVxuICogIHZhciBhcmdzID0gWzEsIDIsIDNdO1xuICogIGYuYXBwbHkobnVsbCwgYXJncyk7XG4gKiAgYGBgXG4gKlxuICogV2l0aCBgc3ByZWFkYCB0aGlzIGV4YW1wbGUgY2FuIGJlIHJlLXdyaXR0ZW4uXG4gKlxuICogIGBgYGpzXG4gKiAgc3ByZWFkKGZ1bmN0aW9uKHgsIHksIHopIHt9KShbMSwgMiwgM10pO1xuICogIGBgYFxuICpcbiAqIEBwYXJhbSB7RnVuY3Rpb259IGNhbGxiYWNrXG4gKiBAcmV0dXJucyB7RnVuY3Rpb259XG4gKi9cbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gc3ByZWFkKGNhbGxiYWNrKSB7XG4gIHJldHVybiBmdW5jdGlvbiB3cmFwKGFycikge1xuICAgIHJldHVybiBjYWxsYmFjay5hcHBseShudWxsLCBhcnIpO1xuICB9O1xufTtcbiIsICIndXNlIHN0cmljdCc7XG5cbnZhciB1dGlscyA9IHJlcXVpcmUoJy4vLi4vdXRpbHMnKTtcblxuLyoqXG4gKiBEZXRlcm1pbmVzIHdoZXRoZXIgdGhlIHBheWxvYWQgaXMgYW4gZXJyb3IgdGhyb3duIGJ5IEF4aW9zXG4gKlxuICogQHBhcmFtIHsqfSBwYXlsb2FkIFRoZSB2YWx1ZSB0byB0ZXN0XG4gKiBAcmV0dXJucyB7Ym9vbGVhbn0gVHJ1ZSBpZiB0aGUgcGF5bG9hZCBpcyBhbiBlcnJvciB0aHJvd24gYnkgQXhpb3MsIG90aGVyd2lzZSBmYWxzZVxuICovXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIGlzQXhpb3NFcnJvcihwYXlsb2FkKSB7XG4gIHJldHVybiB1dGlscy5pc09iamVjdChwYXlsb2FkKSAmJiAocGF5bG9hZC5pc0F4aW9zRXJyb3IgPT09IHRydWUpO1xufTtcbiIsICIndXNlIHN0cmljdCc7XG5cbnZhciB1dGlscyA9IHJlcXVpcmUoJy4vdXRpbHMnKTtcbnZhciBiaW5kID0gcmVxdWlyZSgnLi9oZWxwZXJzL2JpbmQnKTtcbnZhciBBeGlvcyA9IHJlcXVpcmUoJy4vY29yZS9BeGlvcycpO1xudmFyIG1lcmdlQ29uZmlnID0gcmVxdWlyZSgnLi9jb3JlL21lcmdlQ29uZmlnJyk7XG52YXIgZGVmYXVsdHMgPSByZXF1aXJlKCcuL2RlZmF1bHRzJyk7XG5cbi8qKlxuICogQ3JlYXRlIGFuIGluc3RhbmNlIG9mIEF4aW9zXG4gKlxuICogQHBhcmFtIHtPYmplY3R9IGRlZmF1bHRDb25maWcgVGhlIGRlZmF1bHQgY29uZmlnIGZvciB0aGUgaW5zdGFuY2VcbiAqIEByZXR1cm4ge0F4aW9zfSBBIG5ldyBpbnN0YW5jZSBvZiBBeGlvc1xuICovXG5mdW5jdGlvbiBjcmVhdGVJbnN0YW5jZShkZWZhdWx0Q29uZmlnKSB7XG4gIHZhciBjb250ZXh0ID0gbmV3IEF4aW9zKGRlZmF1bHRDb25maWcpO1xuICB2YXIgaW5zdGFuY2UgPSBiaW5kKEF4aW9zLnByb3RvdHlwZS5yZXF1ZXN0LCBjb250ZXh0KTtcblxuICAvLyBDb3B5IGF4aW9zLnByb3RvdHlwZSB0byBpbnN0YW5jZVxuICB1dGlscy5leHRlbmQoaW5zdGFuY2UsIEF4aW9zLnByb3RvdHlwZSwgY29udGV4dCk7XG5cbiAgLy8gQ29weSBjb250ZXh0IHRvIGluc3RhbmNlXG4gIHV0aWxzLmV4dGVuZChpbnN0YW5jZSwgY29udGV4dCk7XG5cbiAgLy8gRmFjdG9yeSBmb3IgY3JlYXRpbmcgbmV3IGluc3RhbmNlc1xuICBpbnN0YW5jZS5jcmVhdGUgPSBmdW5jdGlvbiBjcmVhdGUoaW5zdGFuY2VDb25maWcpIHtcbiAgICByZXR1cm4gY3JlYXRlSW5zdGFuY2UobWVyZ2VDb25maWcoZGVmYXVsdENvbmZpZywgaW5zdGFuY2VDb25maWcpKTtcbiAgfTtcblxuICByZXR1cm4gaW5zdGFuY2U7XG59XG5cbi8vIENyZWF0ZSB0aGUgZGVmYXVsdCBpbnN0YW5jZSB0byBiZSBleHBvcnRlZFxudmFyIGF4aW9zID0gY3JlYXRlSW5zdGFuY2UoZGVmYXVsdHMpO1xuXG4vLyBFeHBvc2UgQXhpb3MgY2xhc3MgdG8gYWxsb3cgY2xhc3MgaW5oZXJpdGFuY2VcbmF4aW9zLkF4aW9zID0gQXhpb3M7XG5cbi8vIEV4cG9zZSBDYW5jZWwgJiBDYW5jZWxUb2tlblxuYXhpb3MuQ2FuY2VsZWRFcnJvciA9IHJlcXVpcmUoJy4vY2FuY2VsL0NhbmNlbGVkRXJyb3InKTtcbmF4aW9zLkNhbmNlbFRva2VuID0gcmVxdWlyZSgnLi9jYW5jZWwvQ2FuY2VsVG9rZW4nKTtcbmF4aW9zLmlzQ2FuY2VsID0gcmVxdWlyZSgnLi9jYW5jZWwvaXNDYW5jZWwnKTtcbmF4aW9zLlZFUlNJT04gPSByZXF1aXJlKCcuL2Vudi9kYXRhJykudmVyc2lvbjtcbmF4aW9zLnRvRm9ybURhdGEgPSByZXF1aXJlKCcuL2hlbHBlcnMvdG9Gb3JtRGF0YScpO1xuXG4vLyBFeHBvc2UgQXhpb3NFcnJvciBjbGFzc1xuYXhpb3MuQXhpb3NFcnJvciA9IHJlcXVpcmUoJy4uL2xpYi9jb3JlL0F4aW9zRXJyb3InKTtcblxuLy8gYWxpYXMgZm9yIENhbmNlbGVkRXJyb3IgZm9yIGJhY2t3YXJkIGNvbXBhdGliaWxpdHlcbmF4aW9zLkNhbmNlbCA9IGF4aW9zLkNhbmNlbGVkRXJyb3I7XG5cbi8vIEV4cG9zZSBhbGwvc3ByZWFkXG5heGlvcy5hbGwgPSBmdW5jdGlvbiBhbGwocHJvbWlzZXMpIHtcbiAgcmV0dXJuIFByb21pc2UuYWxsKHByb21pc2VzKTtcbn07XG5heGlvcy5zcHJlYWQgPSByZXF1aXJlKCcuL2hlbHBlcnMvc3ByZWFkJyk7XG5cbi8vIEV4cG9zZSBpc0F4aW9zRXJyb3JcbmF4aW9zLmlzQXhpb3NFcnJvciA9IHJlcXVpcmUoJy4vaGVscGVycy9pc0F4aW9zRXJyb3InKTtcblxubW9kdWxlLmV4cG9ydHMgPSBheGlvcztcblxuLy8gQWxsb3cgdXNlIG9mIGRlZmF1bHQgaW1wb3J0IHN5bnRheCBpbiBUeXBlU2NyaXB0XG5tb2R1bGUuZXhwb3J0cy5kZWZhdWx0ID0gYXhpb3M7XG4iLCAibW9kdWxlLmV4cG9ydHMgPSByZXF1aXJlKCcuL2xpYi9heGlvcycpOyIsICJjb25zdCBQQUNLRVRfVFlQRVMgPSBPYmplY3QuY3JlYXRlKG51bGwpOyAvLyBubyBNYXAgPSBubyBwb2x5ZmlsbFxuUEFDS0VUX1RZUEVTW1wib3BlblwiXSA9IFwiMFwiO1xuUEFDS0VUX1RZUEVTW1wiY2xvc2VcIl0gPSBcIjFcIjtcblBBQ0tFVF9UWVBFU1tcInBpbmdcIl0gPSBcIjJcIjtcblBBQ0tFVF9UWVBFU1tcInBvbmdcIl0gPSBcIjNcIjtcblBBQ0tFVF9UWVBFU1tcIm1lc3NhZ2VcIl0gPSBcIjRcIjtcblBBQ0tFVF9UWVBFU1tcInVwZ3JhZGVcIl0gPSBcIjVcIjtcblBBQ0tFVF9UWVBFU1tcIm5vb3BcIl0gPSBcIjZcIjtcbmNvbnN0IFBBQ0tFVF9UWVBFU19SRVZFUlNFID0gT2JqZWN0LmNyZWF0ZShudWxsKTtcbk9iamVjdC5rZXlzKFBBQ0tFVF9UWVBFUykuZm9yRWFjaChrZXkgPT4ge1xuICAgIFBBQ0tFVF9UWVBFU19SRVZFUlNFW1BBQ0tFVF9UWVBFU1trZXldXSA9IGtleTtcbn0pO1xuY29uc3QgRVJST1JfUEFDS0VUID0geyB0eXBlOiBcImVycm9yXCIsIGRhdGE6IFwicGFyc2VyIGVycm9yXCIgfTtcbmV4cG9ydCB7IFBBQ0tFVF9UWVBFUywgUEFDS0VUX1RZUEVTX1JFVkVSU0UsIEVSUk9SX1BBQ0tFVCB9O1xuIiwgImltcG9ydCB7IFBBQ0tFVF9UWVBFUyB9IGZyb20gXCIuL2NvbW1vbnMuanNcIjtcbmNvbnN0IHdpdGhOYXRpdmVCbG9iID0gdHlwZW9mIEJsb2IgPT09IFwiZnVuY3Rpb25cIiB8fFxuICAgICh0eXBlb2YgQmxvYiAhPT0gXCJ1bmRlZmluZWRcIiAmJlxuICAgICAgICBPYmplY3QucHJvdG90eXBlLnRvU3RyaW5nLmNhbGwoQmxvYikgPT09IFwiW29iamVjdCBCbG9iQ29uc3RydWN0b3JdXCIpO1xuY29uc3Qgd2l0aE5hdGl2ZUFycmF5QnVmZmVyID0gdHlwZW9mIEFycmF5QnVmZmVyID09PSBcImZ1bmN0aW9uXCI7XG4vLyBBcnJheUJ1ZmZlci5pc1ZpZXcgbWV0aG9kIGlzIG5vdCBkZWZpbmVkIGluIElFMTBcbmNvbnN0IGlzVmlldyA9IG9iaiA9PiB7XG4gICAgcmV0dXJuIHR5cGVvZiBBcnJheUJ1ZmZlci5pc1ZpZXcgPT09IFwiZnVuY3Rpb25cIlxuICAgICAgICA/IEFycmF5QnVmZmVyLmlzVmlldyhvYmopXG4gICAgICAgIDogb2JqICYmIG9iai5idWZmZXIgaW5zdGFuY2VvZiBBcnJheUJ1ZmZlcjtcbn07XG5jb25zdCBlbmNvZGVQYWNrZXQgPSAoeyB0eXBlLCBkYXRhIH0sIHN1cHBvcnRzQmluYXJ5LCBjYWxsYmFjaykgPT4ge1xuICAgIGlmICh3aXRoTmF0aXZlQmxvYiAmJiBkYXRhIGluc3RhbmNlb2YgQmxvYikge1xuICAgICAgICBpZiAoc3VwcG9ydHNCaW5hcnkpIHtcbiAgICAgICAgICAgIHJldHVybiBjYWxsYmFjayhkYXRhKTtcbiAgICAgICAgfVxuICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgIHJldHVybiBlbmNvZGVCbG9iQXNCYXNlNjQoZGF0YSwgY2FsbGJhY2spO1xuICAgICAgICB9XG4gICAgfVxuICAgIGVsc2UgaWYgKHdpdGhOYXRpdmVBcnJheUJ1ZmZlciAmJlxuICAgICAgICAoZGF0YSBpbnN0YW5jZW9mIEFycmF5QnVmZmVyIHx8IGlzVmlldyhkYXRhKSkpIHtcbiAgICAgICAgaWYgKHN1cHBvcnRzQmluYXJ5KSB7XG4gICAgICAgICAgICByZXR1cm4gY2FsbGJhY2soZGF0YSk7XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICByZXR1cm4gZW5jb2RlQmxvYkFzQmFzZTY0KG5ldyBCbG9iKFtkYXRhXSksIGNhbGxiYWNrKTtcbiAgICAgICAgfVxuICAgIH1cbiAgICAvLyBwbGFpbiBzdHJpbmdcbiAgICByZXR1cm4gY2FsbGJhY2soUEFDS0VUX1RZUEVTW3R5cGVdICsgKGRhdGEgfHwgXCJcIikpO1xufTtcbmNvbnN0IGVuY29kZUJsb2JBc0Jhc2U2NCA9IChkYXRhLCBjYWxsYmFjaykgPT4ge1xuICAgIGNvbnN0IGZpbGVSZWFkZXIgPSBuZXcgRmlsZVJlYWRlcigpO1xuICAgIGZpbGVSZWFkZXIub25sb2FkID0gZnVuY3Rpb24gKCkge1xuICAgICAgICBjb25zdCBjb250ZW50ID0gZmlsZVJlYWRlci5yZXN1bHQuc3BsaXQoXCIsXCIpWzFdO1xuICAgICAgICBjYWxsYmFjayhcImJcIiArIGNvbnRlbnQpO1xuICAgIH07XG4gICAgcmV0dXJuIGZpbGVSZWFkZXIucmVhZEFzRGF0YVVSTChkYXRhKTtcbn07XG5leHBvcnQgZGVmYXVsdCBlbmNvZGVQYWNrZXQ7XG4iLCAiY29uc3QgY2hhcnMgPSAnQUJDREVGR0hJSktMTU5PUFFSU1RVVldYWVphYmNkZWZnaGlqa2xtbm9wcXJzdHV2d3h5ejAxMjM0NTY3ODkrLyc7XG4vLyBVc2UgYSBsb29rdXAgdGFibGUgdG8gZmluZCB0aGUgaW5kZXguXG5jb25zdCBsb29rdXAgPSB0eXBlb2YgVWludDhBcnJheSA9PT0gJ3VuZGVmaW5lZCcgPyBbXSA6IG5ldyBVaW50OEFycmF5KDI1Nik7XG5mb3IgKGxldCBpID0gMDsgaSA8IGNoYXJzLmxlbmd0aDsgaSsrKSB7XG4gICAgbG9va3VwW2NoYXJzLmNoYXJDb2RlQXQoaSldID0gaTtcbn1cbmV4cG9ydCBjb25zdCBlbmNvZGUgPSAoYXJyYXlidWZmZXIpID0+IHtcbiAgICBsZXQgYnl0ZXMgPSBuZXcgVWludDhBcnJheShhcnJheWJ1ZmZlciksIGksIGxlbiA9IGJ5dGVzLmxlbmd0aCwgYmFzZTY0ID0gJyc7XG4gICAgZm9yIChpID0gMDsgaSA8IGxlbjsgaSArPSAzKSB7XG4gICAgICAgIGJhc2U2NCArPSBjaGFyc1tieXRlc1tpXSA+PiAyXTtcbiAgICAgICAgYmFzZTY0ICs9IGNoYXJzWygoYnl0ZXNbaV0gJiAzKSA8PCA0KSB8IChieXRlc1tpICsgMV0gPj4gNCldO1xuICAgICAgICBiYXNlNjQgKz0gY2hhcnNbKChieXRlc1tpICsgMV0gJiAxNSkgPDwgMikgfCAoYnl0ZXNbaSArIDJdID4+IDYpXTtcbiAgICAgICAgYmFzZTY0ICs9IGNoYXJzW2J5dGVzW2kgKyAyXSAmIDYzXTtcbiAgICB9XG4gICAgaWYgKGxlbiAlIDMgPT09IDIpIHtcbiAgICAgICAgYmFzZTY0ID0gYmFzZTY0LnN1YnN0cmluZygwLCBiYXNlNjQubGVuZ3RoIC0gMSkgKyAnPSc7XG4gICAgfVxuICAgIGVsc2UgaWYgKGxlbiAlIDMgPT09IDEpIHtcbiAgICAgICAgYmFzZTY0ID0gYmFzZTY0LnN1YnN0cmluZygwLCBiYXNlNjQubGVuZ3RoIC0gMikgKyAnPT0nO1xuICAgIH1cbiAgICByZXR1cm4gYmFzZTY0O1xufTtcbmV4cG9ydCBjb25zdCBkZWNvZGUgPSAoYmFzZTY0KSA9PiB7XG4gICAgbGV0IGJ1ZmZlckxlbmd0aCA9IGJhc2U2NC5sZW5ndGggKiAwLjc1LCBsZW4gPSBiYXNlNjQubGVuZ3RoLCBpLCBwID0gMCwgZW5jb2RlZDEsIGVuY29kZWQyLCBlbmNvZGVkMywgZW5jb2RlZDQ7XG4gICAgaWYgKGJhc2U2NFtiYXNlNjQubGVuZ3RoIC0gMV0gPT09ICc9Jykge1xuICAgICAgICBidWZmZXJMZW5ndGgtLTtcbiAgICAgICAgaWYgKGJhc2U2NFtiYXNlNjQubGVuZ3RoIC0gMl0gPT09ICc9Jykge1xuICAgICAgICAgICAgYnVmZmVyTGVuZ3RoLS07XG4gICAgICAgIH1cbiAgICB9XG4gICAgY29uc3QgYXJyYXlidWZmZXIgPSBuZXcgQXJyYXlCdWZmZXIoYnVmZmVyTGVuZ3RoKSwgYnl0ZXMgPSBuZXcgVWludDhBcnJheShhcnJheWJ1ZmZlcik7XG4gICAgZm9yIChpID0gMDsgaSA8IGxlbjsgaSArPSA0KSB7XG4gICAgICAgIGVuY29kZWQxID0gbG9va3VwW2Jhc2U2NC5jaGFyQ29kZUF0KGkpXTtcbiAgICAgICAgZW5jb2RlZDIgPSBsb29rdXBbYmFzZTY0LmNoYXJDb2RlQXQoaSArIDEpXTtcbiAgICAgICAgZW5jb2RlZDMgPSBsb29rdXBbYmFzZTY0LmNoYXJDb2RlQXQoaSArIDIpXTtcbiAgICAgICAgZW5jb2RlZDQgPSBsb29rdXBbYmFzZTY0LmNoYXJDb2RlQXQoaSArIDMpXTtcbiAgICAgICAgYnl0ZXNbcCsrXSA9IChlbmNvZGVkMSA8PCAyKSB8IChlbmNvZGVkMiA+PiA0KTtcbiAgICAgICAgYnl0ZXNbcCsrXSA9ICgoZW5jb2RlZDIgJiAxNSkgPDwgNCkgfCAoZW5jb2RlZDMgPj4gMik7XG4gICAgICAgIGJ5dGVzW3ArK10gPSAoKGVuY29kZWQzICYgMykgPDwgNikgfCAoZW5jb2RlZDQgJiA2Myk7XG4gICAgfVxuICAgIHJldHVybiBhcnJheWJ1ZmZlcjtcbn07XG4iLCAiaW1wb3J0IHsgRVJST1JfUEFDS0VULCBQQUNLRVRfVFlQRVNfUkVWRVJTRSB9IGZyb20gXCIuL2NvbW1vbnMuanNcIjtcbmltcG9ydCB7IGRlY29kZSB9IGZyb20gXCIuL2NvbnRyaWIvYmFzZTY0LWFycmF5YnVmZmVyLmpzXCI7XG5jb25zdCB3aXRoTmF0aXZlQXJyYXlCdWZmZXIgPSB0eXBlb2YgQXJyYXlCdWZmZXIgPT09IFwiZnVuY3Rpb25cIjtcbmNvbnN0IGRlY29kZVBhY2tldCA9IChlbmNvZGVkUGFja2V0LCBiaW5hcnlUeXBlKSA9PiB7XG4gICAgaWYgKHR5cGVvZiBlbmNvZGVkUGFja2V0ICE9PSBcInN0cmluZ1wiKSB7XG4gICAgICAgIHJldHVybiB7XG4gICAgICAgICAgICB0eXBlOiBcIm1lc3NhZ2VcIixcbiAgICAgICAgICAgIGRhdGE6IG1hcEJpbmFyeShlbmNvZGVkUGFja2V0LCBiaW5hcnlUeXBlKVxuICAgICAgICB9O1xuICAgIH1cbiAgICBjb25zdCB0eXBlID0gZW5jb2RlZFBhY2tldC5jaGFyQXQoMCk7XG4gICAgaWYgKHR5cGUgPT09IFwiYlwiKSB7XG4gICAgICAgIHJldHVybiB7XG4gICAgICAgICAgICB0eXBlOiBcIm1lc3NhZ2VcIixcbiAgICAgICAgICAgIGRhdGE6IGRlY29kZUJhc2U2NFBhY2tldChlbmNvZGVkUGFja2V0LnN1YnN0cmluZygxKSwgYmluYXJ5VHlwZSlcbiAgICAgICAgfTtcbiAgICB9XG4gICAgY29uc3QgcGFja2V0VHlwZSA9IFBBQ0tFVF9UWVBFU19SRVZFUlNFW3R5cGVdO1xuICAgIGlmICghcGFja2V0VHlwZSkge1xuICAgICAgICByZXR1cm4gRVJST1JfUEFDS0VUO1xuICAgIH1cbiAgICByZXR1cm4gZW5jb2RlZFBhY2tldC5sZW5ndGggPiAxXG4gICAgICAgID8ge1xuICAgICAgICAgICAgdHlwZTogUEFDS0VUX1RZUEVTX1JFVkVSU0VbdHlwZV0sXG4gICAgICAgICAgICBkYXRhOiBlbmNvZGVkUGFja2V0LnN1YnN0cmluZygxKVxuICAgICAgICB9XG4gICAgICAgIDoge1xuICAgICAgICAgICAgdHlwZTogUEFDS0VUX1RZUEVTX1JFVkVSU0VbdHlwZV1cbiAgICAgICAgfTtcbn07XG5jb25zdCBkZWNvZGVCYXNlNjRQYWNrZXQgPSAoZGF0YSwgYmluYXJ5VHlwZSkgPT4ge1xuICAgIGlmICh3aXRoTmF0aXZlQXJyYXlCdWZmZXIpIHtcbiAgICAgICAgY29uc3QgZGVjb2RlZCA9IGRlY29kZShkYXRhKTtcbiAgICAgICAgcmV0dXJuIG1hcEJpbmFyeShkZWNvZGVkLCBiaW5hcnlUeXBlKTtcbiAgICB9XG4gICAgZWxzZSB7XG4gICAgICAgIHJldHVybiB7IGJhc2U2NDogdHJ1ZSwgZGF0YSB9OyAvLyBmYWxsYmFjayBmb3Igb2xkIGJyb3dzZXJzXG4gICAgfVxufTtcbmNvbnN0IG1hcEJpbmFyeSA9IChkYXRhLCBiaW5hcnlUeXBlKSA9PiB7XG4gICAgc3dpdGNoIChiaW5hcnlUeXBlKSB7XG4gICAgICAgIGNhc2UgXCJibG9iXCI6XG4gICAgICAgICAgICByZXR1cm4gZGF0YSBpbnN0YW5jZW9mIEFycmF5QnVmZmVyID8gbmV3IEJsb2IoW2RhdGFdKSA6IGRhdGE7XG4gICAgICAgIGNhc2UgXCJhcnJheWJ1ZmZlclwiOlxuICAgICAgICBkZWZhdWx0OlxuICAgICAgICAgICAgcmV0dXJuIGRhdGE7IC8vIGFzc3VtaW5nIHRoZSBkYXRhIGlzIGFscmVhZHkgYW4gQXJyYXlCdWZmZXJcbiAgICB9XG59O1xuZXhwb3J0IGRlZmF1bHQgZGVjb2RlUGFja2V0O1xuIiwgImltcG9ydCBlbmNvZGVQYWNrZXQgZnJvbSBcIi4vZW5jb2RlUGFja2V0LmpzXCI7XG5pbXBvcnQgZGVjb2RlUGFja2V0IGZyb20gXCIuL2RlY29kZVBhY2tldC5qc1wiO1xuY29uc3QgU0VQQVJBVE9SID0gU3RyaW5nLmZyb21DaGFyQ29kZSgzMCk7IC8vIHNlZSBodHRwczovL2VuLndpa2lwZWRpYS5vcmcvd2lraS9EZWxpbWl0ZXIjQVNDSUlfZGVsaW1pdGVkX3RleHRcbmNvbnN0IGVuY29kZVBheWxvYWQgPSAocGFja2V0cywgY2FsbGJhY2spID0+IHtcbiAgICAvLyBzb21lIHBhY2tldHMgbWF5IGJlIGFkZGVkIHRvIHRoZSBhcnJheSB3aGlsZSBlbmNvZGluZywgc28gdGhlIGluaXRpYWwgbGVuZ3RoIG11c3QgYmUgc2F2ZWRcbiAgICBjb25zdCBsZW5ndGggPSBwYWNrZXRzLmxlbmd0aDtcbiAgICBjb25zdCBlbmNvZGVkUGFja2V0cyA9IG5ldyBBcnJheShsZW5ndGgpO1xuICAgIGxldCBjb3VudCA9IDA7XG4gICAgcGFja2V0cy5mb3JFYWNoKChwYWNrZXQsIGkpID0+IHtcbiAgICAgICAgLy8gZm9yY2UgYmFzZTY0IGVuY29kaW5nIGZvciBiaW5hcnkgcGFja2V0c1xuICAgICAgICBlbmNvZGVQYWNrZXQocGFja2V0LCBmYWxzZSwgZW5jb2RlZFBhY2tldCA9PiB7XG4gICAgICAgICAgICBlbmNvZGVkUGFja2V0c1tpXSA9IGVuY29kZWRQYWNrZXQ7XG4gICAgICAgICAgICBpZiAoKytjb3VudCA9PT0gbGVuZ3RoKSB7XG4gICAgICAgICAgICAgICAgY2FsbGJhY2soZW5jb2RlZFBhY2tldHMuam9pbihTRVBBUkFUT1IpKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSk7XG4gICAgfSk7XG59O1xuY29uc3QgZGVjb2RlUGF5bG9hZCA9IChlbmNvZGVkUGF5bG9hZCwgYmluYXJ5VHlwZSkgPT4ge1xuICAgIGNvbnN0IGVuY29kZWRQYWNrZXRzID0gZW5jb2RlZFBheWxvYWQuc3BsaXQoU0VQQVJBVE9SKTtcbiAgICBjb25zdCBwYWNrZXRzID0gW107XG4gICAgZm9yIChsZXQgaSA9IDA7IGkgPCBlbmNvZGVkUGFja2V0cy5sZW5ndGg7IGkrKykge1xuICAgICAgICBjb25zdCBkZWNvZGVkUGFja2V0ID0gZGVjb2RlUGFja2V0KGVuY29kZWRQYWNrZXRzW2ldLCBiaW5hcnlUeXBlKTtcbiAgICAgICAgcGFja2V0cy5wdXNoKGRlY29kZWRQYWNrZXQpO1xuICAgICAgICBpZiAoZGVjb2RlZFBhY2tldC50eXBlID09PSBcImVycm9yXCIpIHtcbiAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICB9XG4gICAgfVxuICAgIHJldHVybiBwYWNrZXRzO1xufTtcbmV4cG9ydCBjb25zdCBwcm90b2NvbCA9IDQ7XG5leHBvcnQgeyBlbmNvZGVQYWNrZXQsIGVuY29kZVBheWxvYWQsIGRlY29kZVBhY2tldCwgZGVjb2RlUGF5bG9hZCB9O1xuIiwgIi8qKlxuICogSW5pdGlhbGl6ZSBhIG5ldyBgRW1pdHRlcmAuXG4gKlxuICogQGFwaSBwdWJsaWNcbiAqL1xuXG5leHBvcnQgZnVuY3Rpb24gRW1pdHRlcihvYmopIHtcbiAgaWYgKG9iaikgcmV0dXJuIG1peGluKG9iaik7XG59XG5cbi8qKlxuICogTWl4aW4gdGhlIGVtaXR0ZXIgcHJvcGVydGllcy5cbiAqXG4gKiBAcGFyYW0ge09iamVjdH0gb2JqXG4gKiBAcmV0dXJuIHtPYmplY3R9XG4gKiBAYXBpIHByaXZhdGVcbiAqL1xuXG5mdW5jdGlvbiBtaXhpbihvYmopIHtcbiAgZm9yICh2YXIga2V5IGluIEVtaXR0ZXIucHJvdG90eXBlKSB7XG4gICAgb2JqW2tleV0gPSBFbWl0dGVyLnByb3RvdHlwZVtrZXldO1xuICB9XG4gIHJldHVybiBvYmo7XG59XG5cbi8qKlxuICogTGlzdGVuIG9uIHRoZSBnaXZlbiBgZXZlbnRgIHdpdGggYGZuYC5cbiAqXG4gKiBAcGFyYW0ge1N0cmluZ30gZXZlbnRcbiAqIEBwYXJhbSB7RnVuY3Rpb259IGZuXG4gKiBAcmV0dXJuIHtFbWl0dGVyfVxuICogQGFwaSBwdWJsaWNcbiAqL1xuXG5FbWl0dGVyLnByb3RvdHlwZS5vbiA9XG5FbWl0dGVyLnByb3RvdHlwZS5hZGRFdmVudExpc3RlbmVyID0gZnVuY3Rpb24oZXZlbnQsIGZuKXtcbiAgdGhpcy5fY2FsbGJhY2tzID0gdGhpcy5fY2FsbGJhY2tzIHx8IHt9O1xuICAodGhpcy5fY2FsbGJhY2tzWyckJyArIGV2ZW50XSA9IHRoaXMuX2NhbGxiYWNrc1snJCcgKyBldmVudF0gfHwgW10pXG4gICAgLnB1c2goZm4pO1xuICByZXR1cm4gdGhpcztcbn07XG5cbi8qKlxuICogQWRkcyBhbiBgZXZlbnRgIGxpc3RlbmVyIHRoYXQgd2lsbCBiZSBpbnZva2VkIGEgc2luZ2xlXG4gKiB0aW1lIHRoZW4gYXV0b21hdGljYWxseSByZW1vdmVkLlxuICpcbiAqIEBwYXJhbSB7U3RyaW5nfSBldmVudFxuICogQHBhcmFtIHtGdW5jdGlvbn0gZm5cbiAqIEByZXR1cm4ge0VtaXR0ZXJ9XG4gKiBAYXBpIHB1YmxpY1xuICovXG5cbkVtaXR0ZXIucHJvdG90eXBlLm9uY2UgPSBmdW5jdGlvbihldmVudCwgZm4pe1xuICBmdW5jdGlvbiBvbigpIHtcbiAgICB0aGlzLm9mZihldmVudCwgb24pO1xuICAgIGZuLmFwcGx5KHRoaXMsIGFyZ3VtZW50cyk7XG4gIH1cblxuICBvbi5mbiA9IGZuO1xuICB0aGlzLm9uKGV2ZW50LCBvbik7XG4gIHJldHVybiB0aGlzO1xufTtcblxuLyoqXG4gKiBSZW1vdmUgdGhlIGdpdmVuIGNhbGxiYWNrIGZvciBgZXZlbnRgIG9yIGFsbFxuICogcmVnaXN0ZXJlZCBjYWxsYmFja3MuXG4gKlxuICogQHBhcmFtIHtTdHJpbmd9IGV2ZW50XG4gKiBAcGFyYW0ge0Z1bmN0aW9ufSBmblxuICogQHJldHVybiB7RW1pdHRlcn1cbiAqIEBhcGkgcHVibGljXG4gKi9cblxuRW1pdHRlci5wcm90b3R5cGUub2ZmID1cbkVtaXR0ZXIucHJvdG90eXBlLnJlbW92ZUxpc3RlbmVyID1cbkVtaXR0ZXIucHJvdG90eXBlLnJlbW92ZUFsbExpc3RlbmVycyA9XG5FbWl0dGVyLnByb3RvdHlwZS5yZW1vdmVFdmVudExpc3RlbmVyID0gZnVuY3Rpb24oZXZlbnQsIGZuKXtcbiAgdGhpcy5fY2FsbGJhY2tzID0gdGhpcy5fY2FsbGJhY2tzIHx8IHt9O1xuXG4gIC8vIGFsbFxuICBpZiAoMCA9PSBhcmd1bWVudHMubGVuZ3RoKSB7XG4gICAgdGhpcy5fY2FsbGJhY2tzID0ge307XG4gICAgcmV0dXJuIHRoaXM7XG4gIH1cblxuICAvLyBzcGVjaWZpYyBldmVudFxuICB2YXIgY2FsbGJhY2tzID0gdGhpcy5fY2FsbGJhY2tzWyckJyArIGV2ZW50XTtcbiAgaWYgKCFjYWxsYmFja3MpIHJldHVybiB0aGlzO1xuXG4gIC8vIHJlbW92ZSBhbGwgaGFuZGxlcnNcbiAgaWYgKDEgPT0gYXJndW1lbnRzLmxlbmd0aCkge1xuICAgIGRlbGV0ZSB0aGlzLl9jYWxsYmFja3NbJyQnICsgZXZlbnRdO1xuICAgIHJldHVybiB0aGlzO1xuICB9XG5cbiAgLy8gcmVtb3ZlIHNwZWNpZmljIGhhbmRsZXJcbiAgdmFyIGNiO1xuICBmb3IgKHZhciBpID0gMDsgaSA8IGNhbGxiYWNrcy5sZW5ndGg7IGkrKykge1xuICAgIGNiID0gY2FsbGJhY2tzW2ldO1xuICAgIGlmIChjYiA9PT0gZm4gfHwgY2IuZm4gPT09IGZuKSB7XG4gICAgICBjYWxsYmFja3Muc3BsaWNlKGksIDEpO1xuICAgICAgYnJlYWs7XG4gICAgfVxuICB9XG5cbiAgLy8gUmVtb3ZlIGV2ZW50IHNwZWNpZmljIGFycmF5cyBmb3IgZXZlbnQgdHlwZXMgdGhhdCBub1xuICAvLyBvbmUgaXMgc3Vic2NyaWJlZCBmb3IgdG8gYXZvaWQgbWVtb3J5IGxlYWsuXG4gIGlmIChjYWxsYmFja3MubGVuZ3RoID09PSAwKSB7XG4gICAgZGVsZXRlIHRoaXMuX2NhbGxiYWNrc1snJCcgKyBldmVudF07XG4gIH1cblxuICByZXR1cm4gdGhpcztcbn07XG5cbi8qKlxuICogRW1pdCBgZXZlbnRgIHdpdGggdGhlIGdpdmVuIGFyZ3MuXG4gKlxuICogQHBhcmFtIHtTdHJpbmd9IGV2ZW50XG4gKiBAcGFyYW0ge01peGVkfSAuLi5cbiAqIEByZXR1cm4ge0VtaXR0ZXJ9XG4gKi9cblxuRW1pdHRlci5wcm90b3R5cGUuZW1pdCA9IGZ1bmN0aW9uKGV2ZW50KXtcbiAgdGhpcy5fY2FsbGJhY2tzID0gdGhpcy5fY2FsbGJhY2tzIHx8IHt9O1xuXG4gIHZhciBhcmdzID0gbmV3IEFycmF5KGFyZ3VtZW50cy5sZW5ndGggLSAxKVxuICAgICwgY2FsbGJhY2tzID0gdGhpcy5fY2FsbGJhY2tzWyckJyArIGV2ZW50XTtcblxuICBmb3IgKHZhciBpID0gMTsgaSA8IGFyZ3VtZW50cy5sZW5ndGg7IGkrKykge1xuICAgIGFyZ3NbaSAtIDFdID0gYXJndW1lbnRzW2ldO1xuICB9XG5cbiAgaWYgKGNhbGxiYWNrcykge1xuICAgIGNhbGxiYWNrcyA9IGNhbGxiYWNrcy5zbGljZSgwKTtcbiAgICBmb3IgKHZhciBpID0gMCwgbGVuID0gY2FsbGJhY2tzLmxlbmd0aDsgaSA8IGxlbjsgKytpKSB7XG4gICAgICBjYWxsYmFja3NbaV0uYXBwbHkodGhpcywgYXJncyk7XG4gICAgfVxuICB9XG5cbiAgcmV0dXJuIHRoaXM7XG59O1xuXG4vLyBhbGlhcyB1c2VkIGZvciByZXNlcnZlZCBldmVudHMgKHByb3RlY3RlZCBtZXRob2QpXG5FbWl0dGVyLnByb3RvdHlwZS5lbWl0UmVzZXJ2ZWQgPSBFbWl0dGVyLnByb3RvdHlwZS5lbWl0O1xuXG4vKipcbiAqIFJldHVybiBhcnJheSBvZiBjYWxsYmFja3MgZm9yIGBldmVudGAuXG4gKlxuICogQHBhcmFtIHtTdHJpbmd9IGV2ZW50XG4gKiBAcmV0dXJuIHtBcnJheX1cbiAqIEBhcGkgcHVibGljXG4gKi9cblxuRW1pdHRlci5wcm90b3R5cGUubGlzdGVuZXJzID0gZnVuY3Rpb24oZXZlbnQpe1xuICB0aGlzLl9jYWxsYmFja3MgPSB0aGlzLl9jYWxsYmFja3MgfHwge307XG4gIHJldHVybiB0aGlzLl9jYWxsYmFja3NbJyQnICsgZXZlbnRdIHx8IFtdO1xufTtcblxuLyoqXG4gKiBDaGVjayBpZiB0aGlzIGVtaXR0ZXIgaGFzIGBldmVudGAgaGFuZGxlcnMuXG4gKlxuICogQHBhcmFtIHtTdHJpbmd9IGV2ZW50XG4gKiBAcmV0dXJuIHtCb29sZWFufVxuICogQGFwaSBwdWJsaWNcbiAqL1xuXG5FbWl0dGVyLnByb3RvdHlwZS5oYXNMaXN0ZW5lcnMgPSBmdW5jdGlvbihldmVudCl7XG4gIHJldHVybiAhISB0aGlzLmxpc3RlbmVycyhldmVudCkubGVuZ3RoO1xufTtcbiIsICJleHBvcnQgY29uc3QgZ2xvYmFsVGhpc1NoaW0gPSAoKCkgPT4ge1xuICAgIGlmICh0eXBlb2Ygc2VsZiAhPT0gXCJ1bmRlZmluZWRcIikge1xuICAgICAgICByZXR1cm4gc2VsZjtcbiAgICB9XG4gICAgZWxzZSBpZiAodHlwZW9mIHdpbmRvdyAhPT0gXCJ1bmRlZmluZWRcIikge1xuICAgICAgICByZXR1cm4gd2luZG93O1xuICAgIH1cbiAgICBlbHNlIHtcbiAgICAgICAgcmV0dXJuIEZ1bmN0aW9uKFwicmV0dXJuIHRoaXNcIikoKTtcbiAgICB9XG59KSgpO1xuIiwgImltcG9ydCB7IGdsb2JhbFRoaXNTaGltIGFzIGdsb2JhbFRoaXMgfSBmcm9tIFwiLi9nbG9iYWxUaGlzLmpzXCI7XG5leHBvcnQgZnVuY3Rpb24gcGljayhvYmosIC4uLmF0dHIpIHtcbiAgICByZXR1cm4gYXR0ci5yZWR1Y2UoKGFjYywgaykgPT4ge1xuICAgICAgICBpZiAob2JqLmhhc093blByb3BlcnR5KGspKSB7XG4gICAgICAgICAgICBhY2Nba10gPSBvYmpba107XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIGFjYztcbiAgICB9LCB7fSk7XG59XG4vLyBLZWVwIGEgcmVmZXJlbmNlIHRvIHRoZSByZWFsIHRpbWVvdXQgZnVuY3Rpb25zIHNvIHRoZXkgY2FuIGJlIHVzZWQgd2hlbiBvdmVycmlkZGVuXG5jb25zdCBOQVRJVkVfU0VUX1RJTUVPVVQgPSBzZXRUaW1lb3V0O1xuY29uc3QgTkFUSVZFX0NMRUFSX1RJTUVPVVQgPSBjbGVhclRpbWVvdXQ7XG5leHBvcnQgZnVuY3Rpb24gaW5zdGFsbFRpbWVyRnVuY3Rpb25zKG9iaiwgb3B0cykge1xuICAgIGlmIChvcHRzLnVzZU5hdGl2ZVRpbWVycykge1xuICAgICAgICBvYmouc2V0VGltZW91dEZuID0gTkFUSVZFX1NFVF9USU1FT1VULmJpbmQoZ2xvYmFsVGhpcyk7XG4gICAgICAgIG9iai5jbGVhclRpbWVvdXRGbiA9IE5BVElWRV9DTEVBUl9USU1FT1VULmJpbmQoZ2xvYmFsVGhpcyk7XG4gICAgfVxuICAgIGVsc2Uge1xuICAgICAgICBvYmouc2V0VGltZW91dEZuID0gc2V0VGltZW91dC5iaW5kKGdsb2JhbFRoaXMpO1xuICAgICAgICBvYmouY2xlYXJUaW1lb3V0Rm4gPSBjbGVhclRpbWVvdXQuYmluZChnbG9iYWxUaGlzKTtcbiAgICB9XG59XG4vLyBiYXNlNjQgZW5jb2RlZCBidWZmZXJzIGFyZSBhYm91dCAzMyUgYmlnZ2VyIChodHRwczovL2VuLndpa2lwZWRpYS5vcmcvd2lraS9CYXNlNjQpXG5jb25zdCBCQVNFNjRfT1ZFUkhFQUQgPSAxLjMzO1xuLy8gd2UgY291bGQgYWxzbyBoYXZlIHVzZWQgYG5ldyBCbG9iKFtvYmpdKS5zaXplYCwgYnV0IGl0IGlzbid0IHN1cHBvcnRlZCBpbiBJRTlcbmV4cG9ydCBmdW5jdGlvbiBieXRlTGVuZ3RoKG9iaikge1xuICAgIGlmICh0eXBlb2Ygb2JqID09PSBcInN0cmluZ1wiKSB7XG4gICAgICAgIHJldHVybiB1dGY4TGVuZ3RoKG9iaik7XG4gICAgfVxuICAgIC8vIGFycmF5YnVmZmVyIG9yIGJsb2JcbiAgICByZXR1cm4gTWF0aC5jZWlsKChvYmouYnl0ZUxlbmd0aCB8fCBvYmouc2l6ZSkgKiBCQVNFNjRfT1ZFUkhFQUQpO1xufVxuZnVuY3Rpb24gdXRmOExlbmd0aChzdHIpIHtcbiAgICBsZXQgYyA9IDAsIGxlbmd0aCA9IDA7XG4gICAgZm9yIChsZXQgaSA9IDAsIGwgPSBzdHIubGVuZ3RoOyBpIDwgbDsgaSsrKSB7XG4gICAgICAgIGMgPSBzdHIuY2hhckNvZGVBdChpKTtcbiAgICAgICAgaWYgKGMgPCAweDgwKSB7XG4gICAgICAgICAgICBsZW5ndGggKz0gMTtcbiAgICAgICAgfVxuICAgICAgICBlbHNlIGlmIChjIDwgMHg4MDApIHtcbiAgICAgICAgICAgIGxlbmd0aCArPSAyO1xuICAgICAgICB9XG4gICAgICAgIGVsc2UgaWYgKGMgPCAweGQ4MDAgfHwgYyA+PSAweGUwMDApIHtcbiAgICAgICAgICAgIGxlbmd0aCArPSAzO1xuICAgICAgICB9XG4gICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgaSsrO1xuICAgICAgICAgICAgbGVuZ3RoICs9IDQ7XG4gICAgICAgIH1cbiAgICB9XG4gICAgcmV0dXJuIGxlbmd0aDtcbn1cbiIsICJpbXBvcnQgeyBkZWNvZGVQYWNrZXQgfSBmcm9tIFwiZW5naW5lLmlvLXBhcnNlclwiO1xuaW1wb3J0IHsgRW1pdHRlciB9IGZyb20gXCJAc29ja2V0LmlvL2NvbXBvbmVudC1lbWl0dGVyXCI7XG5pbXBvcnQgeyBpbnN0YWxsVGltZXJGdW5jdGlvbnMgfSBmcm9tIFwiLi91dGlsLmpzXCI7XG5jbGFzcyBUcmFuc3BvcnRFcnJvciBleHRlbmRzIEVycm9yIHtcbiAgICBjb25zdHJ1Y3RvcihyZWFzb24sIGRlc2NyaXB0aW9uLCBjb250ZXh0KSB7XG4gICAgICAgIHN1cGVyKHJlYXNvbik7XG4gICAgICAgIHRoaXMuZGVzY3JpcHRpb24gPSBkZXNjcmlwdGlvbjtcbiAgICAgICAgdGhpcy5jb250ZXh0ID0gY29udGV4dDtcbiAgICAgICAgdGhpcy50eXBlID0gXCJUcmFuc3BvcnRFcnJvclwiO1xuICAgIH1cbn1cbmV4cG9ydCBjbGFzcyBUcmFuc3BvcnQgZXh0ZW5kcyBFbWl0dGVyIHtcbiAgICAvKipcbiAgICAgKiBUcmFuc3BvcnQgYWJzdHJhY3QgY29uc3RydWN0b3IuXG4gICAgICpcbiAgICAgKiBAcGFyYW0ge09iamVjdH0gb3B0aW9ucy5cbiAgICAgKiBAYXBpIHByaXZhdGVcbiAgICAgKi9cbiAgICBjb25zdHJ1Y3RvcihvcHRzKSB7XG4gICAgICAgIHN1cGVyKCk7XG4gICAgICAgIHRoaXMud3JpdGFibGUgPSBmYWxzZTtcbiAgICAgICAgaW5zdGFsbFRpbWVyRnVuY3Rpb25zKHRoaXMsIG9wdHMpO1xuICAgICAgICB0aGlzLm9wdHMgPSBvcHRzO1xuICAgICAgICB0aGlzLnF1ZXJ5ID0gb3B0cy5xdWVyeTtcbiAgICAgICAgdGhpcy5yZWFkeVN0YXRlID0gXCJcIjtcbiAgICAgICAgdGhpcy5zb2NrZXQgPSBvcHRzLnNvY2tldDtcbiAgICB9XG4gICAgLyoqXG4gICAgICogRW1pdHMgYW4gZXJyb3IuXG4gICAgICpcbiAgICAgKiBAcGFyYW0ge1N0cmluZ30gcmVhc29uXG4gICAgICogQHBhcmFtIGRlc2NyaXB0aW9uXG4gICAgICogQHBhcmFtIGNvbnRleHQgLSB0aGUgZXJyb3IgY29udGV4dFxuICAgICAqIEByZXR1cm4ge1RyYW5zcG9ydH0gZm9yIGNoYWluaW5nXG4gICAgICogQGFwaSBwcm90ZWN0ZWRcbiAgICAgKi9cbiAgICBvbkVycm9yKHJlYXNvbiwgZGVzY3JpcHRpb24sIGNvbnRleHQpIHtcbiAgICAgICAgc3VwZXIuZW1pdFJlc2VydmVkKFwiZXJyb3JcIiwgbmV3IFRyYW5zcG9ydEVycm9yKHJlYXNvbiwgZGVzY3JpcHRpb24sIGNvbnRleHQpKTtcbiAgICAgICAgcmV0dXJuIHRoaXM7XG4gICAgfVxuICAgIC8qKlxuICAgICAqIE9wZW5zIHRoZSB0cmFuc3BvcnQuXG4gICAgICpcbiAgICAgKiBAYXBpIHB1YmxpY1xuICAgICAqL1xuICAgIG9wZW4oKSB7XG4gICAgICAgIGlmIChcImNsb3NlZFwiID09PSB0aGlzLnJlYWR5U3RhdGUgfHwgXCJcIiA9PT0gdGhpcy5yZWFkeVN0YXRlKSB7XG4gICAgICAgICAgICB0aGlzLnJlYWR5U3RhdGUgPSBcIm9wZW5pbmdcIjtcbiAgICAgICAgICAgIHRoaXMuZG9PcGVuKCk7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIHRoaXM7XG4gICAgfVxuICAgIC8qKlxuICAgICAqIENsb3NlcyB0aGUgdHJhbnNwb3J0LlxuICAgICAqXG4gICAgICogQGFwaSBwdWJsaWNcbiAgICAgKi9cbiAgICBjbG9zZSgpIHtcbiAgICAgICAgaWYgKFwib3BlbmluZ1wiID09PSB0aGlzLnJlYWR5U3RhdGUgfHwgXCJvcGVuXCIgPT09IHRoaXMucmVhZHlTdGF0ZSkge1xuICAgICAgICAgICAgdGhpcy5kb0Nsb3NlKCk7XG4gICAgICAgICAgICB0aGlzLm9uQ2xvc2UoKTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gdGhpcztcbiAgICB9XG4gICAgLyoqXG4gICAgICogU2VuZHMgbXVsdGlwbGUgcGFja2V0cy5cbiAgICAgKlxuICAgICAqIEBwYXJhbSB7QXJyYXl9IHBhY2tldHNcbiAgICAgKiBAYXBpIHB1YmxpY1xuICAgICAqL1xuICAgIHNlbmQocGFja2V0cykge1xuICAgICAgICBpZiAoXCJvcGVuXCIgPT09IHRoaXMucmVhZHlTdGF0ZSkge1xuICAgICAgICAgICAgdGhpcy53cml0ZShwYWNrZXRzKTtcbiAgICAgICAgfVxuICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgIC8vIHRoaXMgbWlnaHQgaGFwcGVuIGlmIHRoZSB0cmFuc3BvcnQgd2FzIHNpbGVudGx5IGNsb3NlZCBpbiB0aGUgYmVmb3JldW5sb2FkIGV2ZW50IGhhbmRsZXJcbiAgICAgICAgfVxuICAgIH1cbiAgICAvKipcbiAgICAgKiBDYWxsZWQgdXBvbiBvcGVuXG4gICAgICpcbiAgICAgKiBAYXBpIHByb3RlY3RlZFxuICAgICAqL1xuICAgIG9uT3BlbigpIHtcbiAgICAgICAgdGhpcy5yZWFkeVN0YXRlID0gXCJvcGVuXCI7XG4gICAgICAgIHRoaXMud3JpdGFibGUgPSB0cnVlO1xuICAgICAgICBzdXBlci5lbWl0UmVzZXJ2ZWQoXCJvcGVuXCIpO1xuICAgIH1cbiAgICAvKipcbiAgICAgKiBDYWxsZWQgd2l0aCBkYXRhLlxuICAgICAqXG4gICAgICogQHBhcmFtIHtTdHJpbmd9IGRhdGFcbiAgICAgKiBAYXBpIHByb3RlY3RlZFxuICAgICAqL1xuICAgIG9uRGF0YShkYXRhKSB7XG4gICAgICAgIGNvbnN0IHBhY2tldCA9IGRlY29kZVBhY2tldChkYXRhLCB0aGlzLnNvY2tldC5iaW5hcnlUeXBlKTtcbiAgICAgICAgdGhpcy5vblBhY2tldChwYWNrZXQpO1xuICAgIH1cbiAgICAvKipcbiAgICAgKiBDYWxsZWQgd2l0aCBhIGRlY29kZWQgcGFja2V0LlxuICAgICAqXG4gICAgICogQGFwaSBwcm90ZWN0ZWRcbiAgICAgKi9cbiAgICBvblBhY2tldChwYWNrZXQpIHtcbiAgICAgICAgc3VwZXIuZW1pdFJlc2VydmVkKFwicGFja2V0XCIsIHBhY2tldCk7XG4gICAgfVxuICAgIC8qKlxuICAgICAqIENhbGxlZCB1cG9uIGNsb3NlLlxuICAgICAqXG4gICAgICogQGFwaSBwcm90ZWN0ZWRcbiAgICAgKi9cbiAgICBvbkNsb3NlKGRldGFpbHMpIHtcbiAgICAgICAgdGhpcy5yZWFkeVN0YXRlID0gXCJjbG9zZWRcIjtcbiAgICAgICAgc3VwZXIuZW1pdFJlc2VydmVkKFwiY2xvc2VcIiwgZGV0YWlscyk7XG4gICAgfVxufVxuIiwgIi8vIGltcG9ydGVkIGZyb20gaHR0cHM6Ly9naXRodWIuY29tL3Vuc2hpZnRpby95ZWFzdFxuJ3VzZSBzdHJpY3QnO1xuY29uc3QgYWxwaGFiZXQgPSAnMDEyMzQ1Njc4OUFCQ0RFRkdISUpLTE1OT1BRUlNUVVZXWFlaYWJjZGVmZ2hpamtsbW5vcHFyc3R1dnd4eXotXycuc3BsaXQoJycpLCBsZW5ndGggPSA2NCwgbWFwID0ge307XG5sZXQgc2VlZCA9IDAsIGkgPSAwLCBwcmV2O1xuLyoqXG4gKiBSZXR1cm4gYSBzdHJpbmcgcmVwcmVzZW50aW5nIHRoZSBzcGVjaWZpZWQgbnVtYmVyLlxuICpcbiAqIEBwYXJhbSB7TnVtYmVyfSBudW0gVGhlIG51bWJlciB0byBjb252ZXJ0LlxuICogQHJldHVybnMge1N0cmluZ30gVGhlIHN0cmluZyByZXByZXNlbnRhdGlvbiBvZiB0aGUgbnVtYmVyLlxuICogQGFwaSBwdWJsaWNcbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIGVuY29kZShudW0pIHtcbiAgICBsZXQgZW5jb2RlZCA9ICcnO1xuICAgIGRvIHtcbiAgICAgICAgZW5jb2RlZCA9IGFscGhhYmV0W251bSAlIGxlbmd0aF0gKyBlbmNvZGVkO1xuICAgICAgICBudW0gPSBNYXRoLmZsb29yKG51bSAvIGxlbmd0aCk7XG4gICAgfSB3aGlsZSAobnVtID4gMCk7XG4gICAgcmV0dXJuIGVuY29kZWQ7XG59XG4vKipcbiAqIFJldHVybiB0aGUgaW50ZWdlciB2YWx1ZSBzcGVjaWZpZWQgYnkgdGhlIGdpdmVuIHN0cmluZy5cbiAqXG4gKiBAcGFyYW0ge1N0cmluZ30gc3RyIFRoZSBzdHJpbmcgdG8gY29udmVydC5cbiAqIEByZXR1cm5zIHtOdW1iZXJ9IFRoZSBpbnRlZ2VyIHZhbHVlIHJlcHJlc2VudGVkIGJ5IHRoZSBzdHJpbmcuXG4gKiBAYXBpIHB1YmxpY1xuICovXG5leHBvcnQgZnVuY3Rpb24gZGVjb2RlKHN0cikge1xuICAgIGxldCBkZWNvZGVkID0gMDtcbiAgICBmb3IgKGkgPSAwOyBpIDwgc3RyLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgIGRlY29kZWQgPSBkZWNvZGVkICogbGVuZ3RoICsgbWFwW3N0ci5jaGFyQXQoaSldO1xuICAgIH1cbiAgICByZXR1cm4gZGVjb2RlZDtcbn1cbi8qKlxuICogWWVhc3Q6IEEgdGlueSBncm93aW5nIGlkIGdlbmVyYXRvci5cbiAqXG4gKiBAcmV0dXJucyB7U3RyaW5nfSBBIHVuaXF1ZSBpZC5cbiAqIEBhcGkgcHVibGljXG4gKi9cbmV4cG9ydCBmdW5jdGlvbiB5ZWFzdCgpIHtcbiAgICBjb25zdCBub3cgPSBlbmNvZGUoK25ldyBEYXRlKCkpO1xuICAgIGlmIChub3cgIT09IHByZXYpXG4gICAgICAgIHJldHVybiBzZWVkID0gMCwgcHJldiA9IG5vdztcbiAgICByZXR1cm4gbm93ICsgJy4nICsgZW5jb2RlKHNlZWQrKyk7XG59XG4vL1xuLy8gTWFwIGVhY2ggY2hhcmFjdGVyIHRvIGl0cyBpbmRleC5cbi8vXG5mb3IgKDsgaSA8IGxlbmd0aDsgaSsrKVxuICAgIG1hcFthbHBoYWJldFtpXV0gPSBpO1xuIiwgIi8vIGltcG9ydGVkIGZyb20gaHR0cHM6Ly9naXRodWIuY29tL2dhbGtuL3F1ZXJ5c3RyaW5nXG4vKipcbiAqIENvbXBpbGVzIGEgcXVlcnlzdHJpbmdcbiAqIFJldHVybnMgc3RyaW5nIHJlcHJlc2VudGF0aW9uIG9mIHRoZSBvYmplY3RcbiAqXG4gKiBAcGFyYW0ge09iamVjdH1cbiAqIEBhcGkgcHJpdmF0ZVxuICovXG5leHBvcnQgZnVuY3Rpb24gZW5jb2RlKG9iaikge1xuICAgIGxldCBzdHIgPSAnJztcbiAgICBmb3IgKGxldCBpIGluIG9iaikge1xuICAgICAgICBpZiAob2JqLmhhc093blByb3BlcnR5KGkpKSB7XG4gICAgICAgICAgICBpZiAoc3RyLmxlbmd0aClcbiAgICAgICAgICAgICAgICBzdHIgKz0gJyYnO1xuICAgICAgICAgICAgc3RyICs9IGVuY29kZVVSSUNvbXBvbmVudChpKSArICc9JyArIGVuY29kZVVSSUNvbXBvbmVudChvYmpbaV0pO1xuICAgICAgICB9XG4gICAgfVxuICAgIHJldHVybiBzdHI7XG59XG4vKipcbiAqIFBhcnNlcyBhIHNpbXBsZSBxdWVyeXN0cmluZyBpbnRvIGFuIG9iamVjdFxuICpcbiAqIEBwYXJhbSB7U3RyaW5nfSBxc1xuICogQGFwaSBwcml2YXRlXG4gKi9cbmV4cG9ydCBmdW5jdGlvbiBkZWNvZGUocXMpIHtcbiAgICBsZXQgcXJ5ID0ge307XG4gICAgbGV0IHBhaXJzID0gcXMuc3BsaXQoJyYnKTtcbiAgICBmb3IgKGxldCBpID0gMCwgbCA9IHBhaXJzLmxlbmd0aDsgaSA8IGw7IGkrKykge1xuICAgICAgICBsZXQgcGFpciA9IHBhaXJzW2ldLnNwbGl0KCc9Jyk7XG4gICAgICAgIHFyeVtkZWNvZGVVUklDb21wb25lbnQocGFpclswXSldID0gZGVjb2RlVVJJQ29tcG9uZW50KHBhaXJbMV0pO1xuICAgIH1cbiAgICByZXR1cm4gcXJ5O1xufVxuIiwgIi8vIGltcG9ydGVkIGZyb20gaHR0cHM6Ly9naXRodWIuY29tL2NvbXBvbmVudC9oYXMtY29yc1xubGV0IHZhbHVlID0gZmFsc2U7XG50cnkge1xuICAgIHZhbHVlID0gdHlwZW9mIFhNTEh0dHBSZXF1ZXN0ICE9PSAndW5kZWZpbmVkJyAmJlxuICAgICAgICAnd2l0aENyZWRlbnRpYWxzJyBpbiBuZXcgWE1MSHR0cFJlcXVlc3QoKTtcbn1cbmNhdGNoIChlcnIpIHtcbiAgICAvLyBpZiBYTUxIdHRwIHN1cHBvcnQgaXMgZGlzYWJsZWQgaW4gSUUgdGhlbiBpdCB3aWxsIHRocm93XG4gICAgLy8gd2hlbiB0cnlpbmcgdG8gY3JlYXRlXG59XG5leHBvcnQgY29uc3QgaGFzQ09SUyA9IHZhbHVlO1xuIiwgIi8vIGJyb3dzZXIgc2hpbSBmb3IgeG1saHR0cHJlcXVlc3QgbW9kdWxlXG5pbXBvcnQgeyBoYXNDT1JTIH0gZnJvbSBcIi4uL2NvbnRyaWIvaGFzLWNvcnMuanNcIjtcbmltcG9ydCB7IGdsb2JhbFRoaXNTaGltIGFzIGdsb2JhbFRoaXMgfSBmcm9tIFwiLi4vZ2xvYmFsVGhpcy5qc1wiO1xuZXhwb3J0IGZ1bmN0aW9uIFhIUihvcHRzKSB7XG4gICAgY29uc3QgeGRvbWFpbiA9IG9wdHMueGRvbWFpbjtcbiAgICAvLyBYTUxIdHRwUmVxdWVzdCBjYW4gYmUgZGlzYWJsZWQgb24gSUVcbiAgICB0cnkge1xuICAgICAgICBpZiAoXCJ1bmRlZmluZWRcIiAhPT0gdHlwZW9mIFhNTEh0dHBSZXF1ZXN0ICYmICgheGRvbWFpbiB8fCBoYXNDT1JTKSkge1xuICAgICAgICAgICAgcmV0dXJuIG5ldyBYTUxIdHRwUmVxdWVzdCgpO1xuICAgICAgICB9XG4gICAgfVxuICAgIGNhdGNoIChlKSB7IH1cbiAgICBpZiAoIXhkb21haW4pIHtcbiAgICAgICAgdHJ5IHtcbiAgICAgICAgICAgIHJldHVybiBuZXcgZ2xvYmFsVGhpc1tbXCJBY3RpdmVcIl0uY29uY2F0KFwiT2JqZWN0XCIpLmpvaW4oXCJYXCIpXShcIk1pY3Jvc29mdC5YTUxIVFRQXCIpO1xuICAgICAgICB9XG4gICAgICAgIGNhdGNoIChlKSB7IH1cbiAgICB9XG59XG4iLCAiaW1wb3J0IHsgVHJhbnNwb3J0IH0gZnJvbSBcIi4uL3RyYW5zcG9ydC5qc1wiO1xuaW1wb3J0IHsgeWVhc3QgfSBmcm9tIFwiLi4vY29udHJpYi95ZWFzdC5qc1wiO1xuaW1wb3J0IHsgZW5jb2RlIH0gZnJvbSBcIi4uL2NvbnRyaWIvcGFyc2Vxcy5qc1wiO1xuaW1wb3J0IHsgZW5jb2RlUGF5bG9hZCwgZGVjb2RlUGF5bG9hZCB9IGZyb20gXCJlbmdpbmUuaW8tcGFyc2VyXCI7XG5pbXBvcnQgeyBYSFIgYXMgWE1MSHR0cFJlcXVlc3QgfSBmcm9tIFwiLi94bWxodHRwcmVxdWVzdC5qc1wiO1xuaW1wb3J0IHsgRW1pdHRlciB9IGZyb20gXCJAc29ja2V0LmlvL2NvbXBvbmVudC1lbWl0dGVyXCI7XG5pbXBvcnQgeyBpbnN0YWxsVGltZXJGdW5jdGlvbnMsIHBpY2sgfSBmcm9tIFwiLi4vdXRpbC5qc1wiO1xuaW1wb3J0IHsgZ2xvYmFsVGhpc1NoaW0gYXMgZ2xvYmFsVGhpcyB9IGZyb20gXCIuLi9nbG9iYWxUaGlzLmpzXCI7XG5mdW5jdGlvbiBlbXB0eSgpIHsgfVxuY29uc3QgaGFzWEhSMiA9IChmdW5jdGlvbiAoKSB7XG4gICAgY29uc3QgeGhyID0gbmV3IFhNTEh0dHBSZXF1ZXN0KHtcbiAgICAgICAgeGRvbWFpbjogZmFsc2VcbiAgICB9KTtcbiAgICByZXR1cm4gbnVsbCAhPSB4aHIucmVzcG9uc2VUeXBlO1xufSkoKTtcbmV4cG9ydCBjbGFzcyBQb2xsaW5nIGV4dGVuZHMgVHJhbnNwb3J0IHtcbiAgICAvKipcbiAgICAgKiBYSFIgUG9sbGluZyBjb25zdHJ1Y3Rvci5cbiAgICAgKlxuICAgICAqIEBwYXJhbSB7T2JqZWN0fSBvcHRzXG4gICAgICogQGFwaSBwdWJsaWNcbiAgICAgKi9cbiAgICBjb25zdHJ1Y3RvcihvcHRzKSB7XG4gICAgICAgIHN1cGVyKG9wdHMpO1xuICAgICAgICB0aGlzLnBvbGxpbmcgPSBmYWxzZTtcbiAgICAgICAgaWYgKHR5cGVvZiBsb2NhdGlvbiAhPT0gXCJ1bmRlZmluZWRcIikge1xuICAgICAgICAgICAgY29uc3QgaXNTU0wgPSBcImh0dHBzOlwiID09PSBsb2NhdGlvbi5wcm90b2NvbDtcbiAgICAgICAgICAgIGxldCBwb3J0ID0gbG9jYXRpb24ucG9ydDtcbiAgICAgICAgICAgIC8vIHNvbWUgdXNlciBhZ2VudHMgaGF2ZSBlbXB0eSBgbG9jYXRpb24ucG9ydGBcbiAgICAgICAgICAgIGlmICghcG9ydCkge1xuICAgICAgICAgICAgICAgIHBvcnQgPSBpc1NTTCA/IFwiNDQzXCIgOiBcIjgwXCI7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICB0aGlzLnhkID1cbiAgICAgICAgICAgICAgICAodHlwZW9mIGxvY2F0aW9uICE9PSBcInVuZGVmaW5lZFwiICYmXG4gICAgICAgICAgICAgICAgICAgIG9wdHMuaG9zdG5hbWUgIT09IGxvY2F0aW9uLmhvc3RuYW1lKSB8fFxuICAgICAgICAgICAgICAgICAgICBwb3J0ICE9PSBvcHRzLnBvcnQ7XG4gICAgICAgICAgICB0aGlzLnhzID0gb3B0cy5zZWN1cmUgIT09IGlzU1NMO1xuICAgICAgICB9XG4gICAgICAgIC8qKlxuICAgICAgICAgKiBYSFIgc3VwcG9ydHMgYmluYXJ5XG4gICAgICAgICAqL1xuICAgICAgICBjb25zdCBmb3JjZUJhc2U2NCA9IG9wdHMgJiYgb3B0cy5mb3JjZUJhc2U2NDtcbiAgICAgICAgdGhpcy5zdXBwb3J0c0JpbmFyeSA9IGhhc1hIUjIgJiYgIWZvcmNlQmFzZTY0O1xuICAgIH1cbiAgICAvKipcbiAgICAgKiBUcmFuc3BvcnQgbmFtZS5cbiAgICAgKi9cbiAgICBnZXQgbmFtZSgpIHtcbiAgICAgICAgcmV0dXJuIFwicG9sbGluZ1wiO1xuICAgIH1cbiAgICAvKipcbiAgICAgKiBPcGVucyB0aGUgc29ja2V0ICh0cmlnZ2VycyBwb2xsaW5nKS4gV2Ugd3JpdGUgYSBQSU5HIG1lc3NhZ2UgdG8gZGV0ZXJtaW5lXG4gICAgICogd2hlbiB0aGUgdHJhbnNwb3J0IGlzIG9wZW4uXG4gICAgICpcbiAgICAgKiBAYXBpIHByaXZhdGVcbiAgICAgKi9cbiAgICBkb09wZW4oKSB7XG4gICAgICAgIHRoaXMucG9sbCgpO1xuICAgIH1cbiAgICAvKipcbiAgICAgKiBQYXVzZXMgcG9sbGluZy5cbiAgICAgKlxuICAgICAqIEBwYXJhbSB7RnVuY3Rpb259IGNhbGxiYWNrIHVwb24gYnVmZmVycyBhcmUgZmx1c2hlZCBhbmQgdHJhbnNwb3J0IGlzIHBhdXNlZFxuICAgICAqIEBhcGkgcHJpdmF0ZVxuICAgICAqL1xuICAgIHBhdXNlKG9uUGF1c2UpIHtcbiAgICAgICAgdGhpcy5yZWFkeVN0YXRlID0gXCJwYXVzaW5nXCI7XG4gICAgICAgIGNvbnN0IHBhdXNlID0gKCkgPT4ge1xuICAgICAgICAgICAgdGhpcy5yZWFkeVN0YXRlID0gXCJwYXVzZWRcIjtcbiAgICAgICAgICAgIG9uUGF1c2UoKTtcbiAgICAgICAgfTtcbiAgICAgICAgaWYgKHRoaXMucG9sbGluZyB8fCAhdGhpcy53cml0YWJsZSkge1xuICAgICAgICAgICAgbGV0IHRvdGFsID0gMDtcbiAgICAgICAgICAgIGlmICh0aGlzLnBvbGxpbmcpIHtcbiAgICAgICAgICAgICAgICB0b3RhbCsrO1xuICAgICAgICAgICAgICAgIHRoaXMub25jZShcInBvbGxDb21wbGV0ZVwiLCBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICAgICAgICAgIC0tdG90YWwgfHwgcGF1c2UoKTtcbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGlmICghdGhpcy53cml0YWJsZSkge1xuICAgICAgICAgICAgICAgIHRvdGFsKys7XG4gICAgICAgICAgICAgICAgdGhpcy5vbmNlKFwiZHJhaW5cIiwgZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgICAgICAgICAtLXRvdGFsIHx8IHBhdXNlKCk7XG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICBwYXVzZSgpO1xuICAgICAgICB9XG4gICAgfVxuICAgIC8qKlxuICAgICAqIFN0YXJ0cyBwb2xsaW5nIGN5Y2xlLlxuICAgICAqXG4gICAgICogQGFwaSBwdWJsaWNcbiAgICAgKi9cbiAgICBwb2xsKCkge1xuICAgICAgICB0aGlzLnBvbGxpbmcgPSB0cnVlO1xuICAgICAgICB0aGlzLmRvUG9sbCgpO1xuICAgICAgICB0aGlzLmVtaXRSZXNlcnZlZChcInBvbGxcIik7XG4gICAgfVxuICAgIC8qKlxuICAgICAqIE92ZXJsb2FkcyBvbkRhdGEgdG8gZGV0ZWN0IHBheWxvYWRzLlxuICAgICAqXG4gICAgICogQGFwaSBwcml2YXRlXG4gICAgICovXG4gICAgb25EYXRhKGRhdGEpIHtcbiAgICAgICAgY29uc3QgY2FsbGJhY2sgPSBwYWNrZXQgPT4ge1xuICAgICAgICAgICAgLy8gaWYgaXRzIHRoZSBmaXJzdCBtZXNzYWdlIHdlIGNvbnNpZGVyIHRoZSB0cmFuc3BvcnQgb3BlblxuICAgICAgICAgICAgaWYgKFwib3BlbmluZ1wiID09PSB0aGlzLnJlYWR5U3RhdGUgJiYgcGFja2V0LnR5cGUgPT09IFwib3BlblwiKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5vbk9wZW4oKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIC8vIGlmIGl0cyBhIGNsb3NlIHBhY2tldCwgd2UgY2xvc2UgdGhlIG9uZ29pbmcgcmVxdWVzdHNcbiAgICAgICAgICAgIGlmIChcImNsb3NlXCIgPT09IHBhY2tldC50eXBlKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5vbkNsb3NlKHsgZGVzY3JpcHRpb246IFwidHJhbnNwb3J0IGNsb3NlZCBieSB0aGUgc2VydmVyXCIgfSk7XG4gICAgICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgLy8gb3RoZXJ3aXNlIGJ5cGFzcyBvbkRhdGEgYW5kIGhhbmRsZSB0aGUgbWVzc2FnZVxuICAgICAgICAgICAgdGhpcy5vblBhY2tldChwYWNrZXQpO1xuICAgICAgICB9O1xuICAgICAgICAvLyBkZWNvZGUgcGF5bG9hZFxuICAgICAgICBkZWNvZGVQYXlsb2FkKGRhdGEsIHRoaXMuc29ja2V0LmJpbmFyeVR5cGUpLmZvckVhY2goY2FsbGJhY2spO1xuICAgICAgICAvLyBpZiBhbiBldmVudCBkaWQgbm90IHRyaWdnZXIgY2xvc2luZ1xuICAgICAgICBpZiAoXCJjbG9zZWRcIiAhPT0gdGhpcy5yZWFkeVN0YXRlKSB7XG4gICAgICAgICAgICAvLyBpZiB3ZSBnb3QgZGF0YSB3ZSdyZSBub3QgcG9sbGluZ1xuICAgICAgICAgICAgdGhpcy5wb2xsaW5nID0gZmFsc2U7XG4gICAgICAgICAgICB0aGlzLmVtaXRSZXNlcnZlZChcInBvbGxDb21wbGV0ZVwiKTtcbiAgICAgICAgICAgIGlmIChcIm9wZW5cIiA9PT0gdGhpcy5yZWFkeVN0YXRlKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5wb2xsKCk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH1cbiAgICAvKipcbiAgICAgKiBGb3IgcG9sbGluZywgc2VuZCBhIGNsb3NlIHBhY2tldC5cbiAgICAgKlxuICAgICAqIEBhcGkgcHJpdmF0ZVxuICAgICAqL1xuICAgIGRvQ2xvc2UoKSB7XG4gICAgICAgIGNvbnN0IGNsb3NlID0gKCkgPT4ge1xuICAgICAgICAgICAgdGhpcy53cml0ZShbeyB0eXBlOiBcImNsb3NlXCIgfV0pO1xuICAgICAgICB9O1xuICAgICAgICBpZiAoXCJvcGVuXCIgPT09IHRoaXMucmVhZHlTdGF0ZSkge1xuICAgICAgICAgICAgY2xvc2UoKTtcbiAgICAgICAgfVxuICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgIC8vIGluIGNhc2Ugd2UncmUgdHJ5aW5nIHRvIGNsb3NlIHdoaWxlXG4gICAgICAgICAgICAvLyBoYW5kc2hha2luZyBpcyBpbiBwcm9ncmVzcyAoR0gtMTY0KVxuICAgICAgICAgICAgdGhpcy5vbmNlKFwib3BlblwiLCBjbG9zZSk7XG4gICAgICAgIH1cbiAgICB9XG4gICAgLyoqXG4gICAgICogV3JpdGVzIGEgcGFja2V0cyBwYXlsb2FkLlxuICAgICAqXG4gICAgICogQHBhcmFtIHtBcnJheX0gZGF0YSBwYWNrZXRzXG4gICAgICogQHBhcmFtIHtGdW5jdGlvbn0gZHJhaW4gY2FsbGJhY2tcbiAgICAgKiBAYXBpIHByaXZhdGVcbiAgICAgKi9cbiAgICB3cml0ZShwYWNrZXRzKSB7XG4gICAgICAgIHRoaXMud3JpdGFibGUgPSBmYWxzZTtcbiAgICAgICAgZW5jb2RlUGF5bG9hZChwYWNrZXRzLCBkYXRhID0+IHtcbiAgICAgICAgICAgIHRoaXMuZG9Xcml0ZShkYXRhLCAoKSA9PiB7XG4gICAgICAgICAgICAgICAgdGhpcy53cml0YWJsZSA9IHRydWU7XG4gICAgICAgICAgICAgICAgdGhpcy5lbWl0UmVzZXJ2ZWQoXCJkcmFpblwiKTtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9KTtcbiAgICB9XG4gICAgLyoqXG4gICAgICogR2VuZXJhdGVzIHVyaSBmb3IgY29ubmVjdGlvbi5cbiAgICAgKlxuICAgICAqIEBhcGkgcHJpdmF0ZVxuICAgICAqL1xuICAgIHVyaSgpIHtcbiAgICAgICAgbGV0IHF1ZXJ5ID0gdGhpcy5xdWVyeSB8fCB7fTtcbiAgICAgICAgY29uc3Qgc2NoZW1hID0gdGhpcy5vcHRzLnNlY3VyZSA/IFwiaHR0cHNcIiA6IFwiaHR0cFwiO1xuICAgICAgICBsZXQgcG9ydCA9IFwiXCI7XG4gICAgICAgIC8vIGNhY2hlIGJ1c3RpbmcgaXMgZm9yY2VkXG4gICAgICAgIGlmIChmYWxzZSAhPT0gdGhpcy5vcHRzLnRpbWVzdGFtcFJlcXVlc3RzKSB7XG4gICAgICAgICAgICBxdWVyeVt0aGlzLm9wdHMudGltZXN0YW1wUGFyYW1dID0geWVhc3QoKTtcbiAgICAgICAgfVxuICAgICAgICBpZiAoIXRoaXMuc3VwcG9ydHNCaW5hcnkgJiYgIXF1ZXJ5LnNpZCkge1xuICAgICAgICAgICAgcXVlcnkuYjY0ID0gMTtcbiAgICAgICAgfVxuICAgICAgICAvLyBhdm9pZCBwb3J0IGlmIGRlZmF1bHQgZm9yIHNjaGVtYVxuICAgICAgICBpZiAodGhpcy5vcHRzLnBvcnQgJiZcbiAgICAgICAgICAgICgoXCJodHRwc1wiID09PSBzY2hlbWEgJiYgTnVtYmVyKHRoaXMub3B0cy5wb3J0KSAhPT0gNDQzKSB8fFxuICAgICAgICAgICAgICAgIChcImh0dHBcIiA9PT0gc2NoZW1hICYmIE51bWJlcih0aGlzLm9wdHMucG9ydCkgIT09IDgwKSkpIHtcbiAgICAgICAgICAgIHBvcnQgPSBcIjpcIiArIHRoaXMub3B0cy5wb3J0O1xuICAgICAgICB9XG4gICAgICAgIGNvbnN0IGVuY29kZWRRdWVyeSA9IGVuY29kZShxdWVyeSk7XG4gICAgICAgIGNvbnN0IGlwdjYgPSB0aGlzLm9wdHMuaG9zdG5hbWUuaW5kZXhPZihcIjpcIikgIT09IC0xO1xuICAgICAgICByZXR1cm4gKHNjaGVtYSArXG4gICAgICAgICAgICBcIjovL1wiICtcbiAgICAgICAgICAgIChpcHY2ID8gXCJbXCIgKyB0aGlzLm9wdHMuaG9zdG5hbWUgKyBcIl1cIiA6IHRoaXMub3B0cy5ob3N0bmFtZSkgK1xuICAgICAgICAgICAgcG9ydCArXG4gICAgICAgICAgICB0aGlzLm9wdHMucGF0aCArXG4gICAgICAgICAgICAoZW5jb2RlZFF1ZXJ5Lmxlbmd0aCA/IFwiP1wiICsgZW5jb2RlZFF1ZXJ5IDogXCJcIikpO1xuICAgIH1cbiAgICAvKipcbiAgICAgKiBDcmVhdGVzIGEgcmVxdWVzdC5cbiAgICAgKlxuICAgICAqIEBwYXJhbSB7U3RyaW5nfSBtZXRob2RcbiAgICAgKiBAYXBpIHByaXZhdGVcbiAgICAgKi9cbiAgICByZXF1ZXN0KG9wdHMgPSB7fSkge1xuICAgICAgICBPYmplY3QuYXNzaWduKG9wdHMsIHsgeGQ6IHRoaXMueGQsIHhzOiB0aGlzLnhzIH0sIHRoaXMub3B0cyk7XG4gICAgICAgIHJldHVybiBuZXcgUmVxdWVzdCh0aGlzLnVyaSgpLCBvcHRzKTtcbiAgICB9XG4gICAgLyoqXG4gICAgICogU2VuZHMgZGF0YS5cbiAgICAgKlxuICAgICAqIEBwYXJhbSB7U3RyaW5nfSBkYXRhIHRvIHNlbmQuXG4gICAgICogQHBhcmFtIHtGdW5jdGlvbn0gY2FsbGVkIHVwb24gZmx1c2guXG4gICAgICogQGFwaSBwcml2YXRlXG4gICAgICovXG4gICAgZG9Xcml0ZShkYXRhLCBmbikge1xuICAgICAgICBjb25zdCByZXEgPSB0aGlzLnJlcXVlc3Qoe1xuICAgICAgICAgICAgbWV0aG9kOiBcIlBPU1RcIixcbiAgICAgICAgICAgIGRhdGE6IGRhdGFcbiAgICAgICAgfSk7XG4gICAgICAgIHJlcS5vbihcInN1Y2Nlc3NcIiwgZm4pO1xuICAgICAgICByZXEub24oXCJlcnJvclwiLCAoeGhyU3RhdHVzLCBjb250ZXh0KSA9PiB7XG4gICAgICAgICAgICB0aGlzLm9uRXJyb3IoXCJ4aHIgcG9zdCBlcnJvclwiLCB4aHJTdGF0dXMsIGNvbnRleHQpO1xuICAgICAgICB9KTtcbiAgICB9XG4gICAgLyoqXG4gICAgICogU3RhcnRzIGEgcG9sbCBjeWNsZS5cbiAgICAgKlxuICAgICAqIEBhcGkgcHJpdmF0ZVxuICAgICAqL1xuICAgIGRvUG9sbCgpIHtcbiAgICAgICAgY29uc3QgcmVxID0gdGhpcy5yZXF1ZXN0KCk7XG4gICAgICAgIHJlcS5vbihcImRhdGFcIiwgdGhpcy5vbkRhdGEuYmluZCh0aGlzKSk7XG4gICAgICAgIHJlcS5vbihcImVycm9yXCIsICh4aHJTdGF0dXMsIGNvbnRleHQpID0+IHtcbiAgICAgICAgICAgIHRoaXMub25FcnJvcihcInhociBwb2xsIGVycm9yXCIsIHhoclN0YXR1cywgY29udGV4dCk7XG4gICAgICAgIH0pO1xuICAgICAgICB0aGlzLnBvbGxYaHIgPSByZXE7XG4gICAgfVxufVxuZXhwb3J0IGNsYXNzIFJlcXVlc3QgZXh0ZW5kcyBFbWl0dGVyIHtcbiAgICAvKipcbiAgICAgKiBSZXF1ZXN0IGNvbnN0cnVjdG9yXG4gICAgICpcbiAgICAgKiBAcGFyYW0ge09iamVjdH0gb3B0aW9uc1xuICAgICAqIEBhcGkgcHVibGljXG4gICAgICovXG4gICAgY29uc3RydWN0b3IodXJpLCBvcHRzKSB7XG4gICAgICAgIHN1cGVyKCk7XG4gICAgICAgIGluc3RhbGxUaW1lckZ1bmN0aW9ucyh0aGlzLCBvcHRzKTtcbiAgICAgICAgdGhpcy5vcHRzID0gb3B0cztcbiAgICAgICAgdGhpcy5tZXRob2QgPSBvcHRzLm1ldGhvZCB8fCBcIkdFVFwiO1xuICAgICAgICB0aGlzLnVyaSA9IHVyaTtcbiAgICAgICAgdGhpcy5hc3luYyA9IGZhbHNlICE9PSBvcHRzLmFzeW5jO1xuICAgICAgICB0aGlzLmRhdGEgPSB1bmRlZmluZWQgIT09IG9wdHMuZGF0YSA/IG9wdHMuZGF0YSA6IG51bGw7XG4gICAgICAgIHRoaXMuY3JlYXRlKCk7XG4gICAgfVxuICAgIC8qKlxuICAgICAqIENyZWF0ZXMgdGhlIFhIUiBvYmplY3QgYW5kIHNlbmRzIHRoZSByZXF1ZXN0LlxuICAgICAqXG4gICAgICogQGFwaSBwcml2YXRlXG4gICAgICovXG4gICAgY3JlYXRlKCkge1xuICAgICAgICBjb25zdCBvcHRzID0gcGljayh0aGlzLm9wdHMsIFwiYWdlbnRcIiwgXCJwZnhcIiwgXCJrZXlcIiwgXCJwYXNzcGhyYXNlXCIsIFwiY2VydFwiLCBcImNhXCIsIFwiY2lwaGVyc1wiLCBcInJlamVjdFVuYXV0aG9yaXplZFwiLCBcImF1dG9VbnJlZlwiKTtcbiAgICAgICAgb3B0cy54ZG9tYWluID0gISF0aGlzLm9wdHMueGQ7XG4gICAgICAgIG9wdHMueHNjaGVtZSA9ICEhdGhpcy5vcHRzLnhzO1xuICAgICAgICBjb25zdCB4aHIgPSAodGhpcy54aHIgPSBuZXcgWE1MSHR0cFJlcXVlc3Qob3B0cykpO1xuICAgICAgICB0cnkge1xuICAgICAgICAgICAgeGhyLm9wZW4odGhpcy5tZXRob2QsIHRoaXMudXJpLCB0aGlzLmFzeW5jKTtcbiAgICAgICAgICAgIHRyeSB7XG4gICAgICAgICAgICAgICAgaWYgKHRoaXMub3B0cy5leHRyYUhlYWRlcnMpIHtcbiAgICAgICAgICAgICAgICAgICAgeGhyLnNldERpc2FibGVIZWFkZXJDaGVjayAmJiB4aHIuc2V0RGlzYWJsZUhlYWRlckNoZWNrKHRydWUpO1xuICAgICAgICAgICAgICAgICAgICBmb3IgKGxldCBpIGluIHRoaXMub3B0cy5leHRyYUhlYWRlcnMpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmICh0aGlzLm9wdHMuZXh0cmFIZWFkZXJzLmhhc093blByb3BlcnR5KGkpKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgeGhyLnNldFJlcXVlc3RIZWFkZXIoaSwgdGhpcy5vcHRzLmV4dHJhSGVhZGVyc1tpXSk7XG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBjYXRjaCAoZSkgeyB9XG4gICAgICAgICAgICBpZiAoXCJQT1NUXCIgPT09IHRoaXMubWV0aG9kKSB7XG4gICAgICAgICAgICAgICAgdHJ5IHtcbiAgICAgICAgICAgICAgICAgICAgeGhyLnNldFJlcXVlc3RIZWFkZXIoXCJDb250ZW50LXR5cGVcIiwgXCJ0ZXh0L3BsYWluO2NoYXJzZXQ9VVRGLThcIik7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGNhdGNoIChlKSB7IH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHRyeSB7XG4gICAgICAgICAgICAgICAgeGhyLnNldFJlcXVlc3RIZWFkZXIoXCJBY2NlcHRcIiwgXCIqLypcIik7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBjYXRjaCAoZSkgeyB9XG4gICAgICAgICAgICAvLyBpZTYgY2hlY2tcbiAgICAgICAgICAgIGlmIChcIndpdGhDcmVkZW50aWFsc1wiIGluIHhocikge1xuICAgICAgICAgICAgICAgIHhoci53aXRoQ3JlZGVudGlhbHMgPSB0aGlzLm9wdHMud2l0aENyZWRlbnRpYWxzO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgaWYgKHRoaXMub3B0cy5yZXF1ZXN0VGltZW91dCkge1xuICAgICAgICAgICAgICAgIHhoci50aW1lb3V0ID0gdGhpcy5vcHRzLnJlcXVlc3RUaW1lb3V0O1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgeGhyLm9ucmVhZHlzdGF0ZWNoYW5nZSA9ICgpID0+IHtcbiAgICAgICAgICAgICAgICBpZiAoNCAhPT0geGhyLnJlYWR5U3RhdGUpXG4gICAgICAgICAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICAgICAgICBpZiAoMjAwID09PSB4aHIuc3RhdHVzIHx8IDEyMjMgPT09IHhoci5zdGF0dXMpIHtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5vbkxvYWQoKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgIC8vIG1ha2Ugc3VyZSB0aGUgYGVycm9yYCBldmVudCBoYW5kbGVyIHRoYXQncyB1c2VyLXNldFxuICAgICAgICAgICAgICAgICAgICAvLyBkb2VzIG5vdCB0aHJvdyBpbiB0aGUgc2FtZSB0aWNrIGFuZCBnZXRzIGNhdWdodCBoZXJlXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuc2V0VGltZW91dEZuKCgpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMub25FcnJvcih0eXBlb2YgeGhyLnN0YXR1cyA9PT0gXCJudW1iZXJcIiA/IHhoci5zdGF0dXMgOiAwKTtcbiAgICAgICAgICAgICAgICAgICAgfSwgMCk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfTtcbiAgICAgICAgICAgIHhoci5zZW5kKHRoaXMuZGF0YSk7XG4gICAgICAgIH1cbiAgICAgICAgY2F0Y2ggKGUpIHtcbiAgICAgICAgICAgIC8vIE5lZWQgdG8gZGVmZXIgc2luY2UgLmNyZWF0ZSgpIGlzIGNhbGxlZCBkaXJlY3RseSBmcm9tIHRoZSBjb25zdHJ1Y3RvclxuICAgICAgICAgICAgLy8gYW5kIHRodXMgdGhlICdlcnJvcicgZXZlbnQgY2FuIG9ubHkgYmUgb25seSBib3VuZCAqYWZ0ZXIqIHRoaXMgZXhjZXB0aW9uXG4gICAgICAgICAgICAvLyBvY2N1cnMuICBUaGVyZWZvcmUsIGFsc28sIHdlIGNhbm5vdCB0aHJvdyBoZXJlIGF0IGFsbC5cbiAgICAgICAgICAgIHRoaXMuc2V0VGltZW91dEZuKCgpID0+IHtcbiAgICAgICAgICAgICAgICB0aGlzLm9uRXJyb3IoZSk7XG4gICAgICAgICAgICB9LCAwKTtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuICAgICAgICBpZiAodHlwZW9mIGRvY3VtZW50ICE9PSBcInVuZGVmaW5lZFwiKSB7XG4gICAgICAgICAgICB0aGlzLmluZGV4ID0gUmVxdWVzdC5yZXF1ZXN0c0NvdW50Kys7XG4gICAgICAgICAgICBSZXF1ZXN0LnJlcXVlc3RzW3RoaXMuaW5kZXhdID0gdGhpcztcbiAgICAgICAgfVxuICAgIH1cbiAgICAvKipcbiAgICAgKiBDYWxsZWQgdXBvbiBlcnJvci5cbiAgICAgKlxuICAgICAqIEBhcGkgcHJpdmF0ZVxuICAgICAqL1xuICAgIG9uRXJyb3IoZXJyKSB7XG4gICAgICAgIHRoaXMuZW1pdFJlc2VydmVkKFwiZXJyb3JcIiwgZXJyLCB0aGlzLnhocik7XG4gICAgICAgIHRoaXMuY2xlYW51cCh0cnVlKTtcbiAgICB9XG4gICAgLyoqXG4gICAgICogQ2xlYW5zIHVwIGhvdXNlLlxuICAgICAqXG4gICAgICogQGFwaSBwcml2YXRlXG4gICAgICovXG4gICAgY2xlYW51cChmcm9tRXJyb3IpIHtcbiAgICAgICAgaWYgKFwidW5kZWZpbmVkXCIgPT09IHR5cGVvZiB0aGlzLnhociB8fCBudWxsID09PSB0aGlzLnhocikge1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG4gICAgICAgIHRoaXMueGhyLm9ucmVhZHlzdGF0ZWNoYW5nZSA9IGVtcHR5O1xuICAgICAgICBpZiAoZnJvbUVycm9yKSB7XG4gICAgICAgICAgICB0cnkge1xuICAgICAgICAgICAgICAgIHRoaXMueGhyLmFib3J0KCk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBjYXRjaCAoZSkgeyB9XG4gICAgICAgIH1cbiAgICAgICAgaWYgKHR5cGVvZiBkb2N1bWVudCAhPT0gXCJ1bmRlZmluZWRcIikge1xuICAgICAgICAgICAgZGVsZXRlIFJlcXVlc3QucmVxdWVzdHNbdGhpcy5pbmRleF07XG4gICAgICAgIH1cbiAgICAgICAgdGhpcy54aHIgPSBudWxsO1xuICAgIH1cbiAgICAvKipcbiAgICAgKiBDYWxsZWQgdXBvbiBsb2FkLlxuICAgICAqXG4gICAgICogQGFwaSBwcml2YXRlXG4gICAgICovXG4gICAgb25Mb2FkKCkge1xuICAgICAgICBjb25zdCBkYXRhID0gdGhpcy54aHIucmVzcG9uc2VUZXh0O1xuICAgICAgICBpZiAoZGF0YSAhPT0gbnVsbCkge1xuICAgICAgICAgICAgdGhpcy5lbWl0UmVzZXJ2ZWQoXCJkYXRhXCIsIGRhdGEpO1xuICAgICAgICAgICAgdGhpcy5lbWl0UmVzZXJ2ZWQoXCJzdWNjZXNzXCIpO1xuICAgICAgICAgICAgdGhpcy5jbGVhbnVwKCk7XG4gICAgICAgIH1cbiAgICB9XG4gICAgLyoqXG4gICAgICogQWJvcnRzIHRoZSByZXF1ZXN0LlxuICAgICAqXG4gICAgICogQGFwaSBwdWJsaWNcbiAgICAgKi9cbiAgICBhYm9ydCgpIHtcbiAgICAgICAgdGhpcy5jbGVhbnVwKCk7XG4gICAgfVxufVxuUmVxdWVzdC5yZXF1ZXN0c0NvdW50ID0gMDtcblJlcXVlc3QucmVxdWVzdHMgPSB7fTtcbi8qKlxuICogQWJvcnRzIHBlbmRpbmcgcmVxdWVzdHMgd2hlbiB1bmxvYWRpbmcgdGhlIHdpbmRvdy4gVGhpcyBpcyBuZWVkZWQgdG8gcHJldmVudFxuICogbWVtb3J5IGxlYWtzIChlLmcuIHdoZW4gdXNpbmcgSUUpIGFuZCB0byBlbnN1cmUgdGhhdCBubyBzcHVyaW91cyBlcnJvciBpc1xuICogZW1pdHRlZC5cbiAqL1xuaWYgKHR5cGVvZiBkb2N1bWVudCAhPT0gXCJ1bmRlZmluZWRcIikge1xuICAgIC8vIEB0cy1pZ25vcmVcbiAgICBpZiAodHlwZW9mIGF0dGFjaEV2ZW50ID09PSBcImZ1bmN0aW9uXCIpIHtcbiAgICAgICAgLy8gQHRzLWlnbm9yZVxuICAgICAgICBhdHRhY2hFdmVudChcIm9udW5sb2FkXCIsIHVubG9hZEhhbmRsZXIpO1xuICAgIH1cbiAgICBlbHNlIGlmICh0eXBlb2YgYWRkRXZlbnRMaXN0ZW5lciA9PT0gXCJmdW5jdGlvblwiKSB7XG4gICAgICAgIGNvbnN0IHRlcm1pbmF0aW9uRXZlbnQgPSBcIm9ucGFnZWhpZGVcIiBpbiBnbG9iYWxUaGlzID8gXCJwYWdlaGlkZVwiIDogXCJ1bmxvYWRcIjtcbiAgICAgICAgYWRkRXZlbnRMaXN0ZW5lcih0ZXJtaW5hdGlvbkV2ZW50LCB1bmxvYWRIYW5kbGVyLCBmYWxzZSk7XG4gICAgfVxufVxuZnVuY3Rpb24gdW5sb2FkSGFuZGxlcigpIHtcbiAgICBmb3IgKGxldCBpIGluIFJlcXVlc3QucmVxdWVzdHMpIHtcbiAgICAgICAgaWYgKFJlcXVlc3QucmVxdWVzdHMuaGFzT3duUHJvcGVydHkoaSkpIHtcbiAgICAgICAgICAgIFJlcXVlc3QucmVxdWVzdHNbaV0uYWJvcnQoKTtcbiAgICAgICAgfVxuICAgIH1cbn1cbiIsICJpbXBvcnQgeyBnbG9iYWxUaGlzU2hpbSBhcyBnbG9iYWxUaGlzIH0gZnJvbSBcIi4uL2dsb2JhbFRoaXMuanNcIjtcbmV4cG9ydCBjb25zdCBuZXh0VGljayA9ICgoKSA9PiB7XG4gICAgY29uc3QgaXNQcm9taXNlQXZhaWxhYmxlID0gdHlwZW9mIFByb21pc2UgPT09IFwiZnVuY3Rpb25cIiAmJiB0eXBlb2YgUHJvbWlzZS5yZXNvbHZlID09PSBcImZ1bmN0aW9uXCI7XG4gICAgaWYgKGlzUHJvbWlzZUF2YWlsYWJsZSkge1xuICAgICAgICByZXR1cm4gY2IgPT4gUHJvbWlzZS5yZXNvbHZlKCkudGhlbihjYik7XG4gICAgfVxuICAgIGVsc2Uge1xuICAgICAgICByZXR1cm4gKGNiLCBzZXRUaW1lb3V0Rm4pID0+IHNldFRpbWVvdXRGbihjYiwgMCk7XG4gICAgfVxufSkoKTtcbmV4cG9ydCBjb25zdCBXZWJTb2NrZXQgPSBnbG9iYWxUaGlzLldlYlNvY2tldCB8fCBnbG9iYWxUaGlzLk1veldlYlNvY2tldDtcbmV4cG9ydCBjb25zdCB1c2luZ0Jyb3dzZXJXZWJTb2NrZXQgPSB0cnVlO1xuZXhwb3J0IGNvbnN0IGRlZmF1bHRCaW5hcnlUeXBlID0gXCJhcnJheWJ1ZmZlclwiO1xuIiwgImltcG9ydCB7IFRyYW5zcG9ydCB9IGZyb20gXCIuLi90cmFuc3BvcnQuanNcIjtcbmltcG9ydCB7IGVuY29kZSB9IGZyb20gXCIuLi9jb250cmliL3BhcnNlcXMuanNcIjtcbmltcG9ydCB7IHllYXN0IH0gZnJvbSBcIi4uL2NvbnRyaWIveWVhc3QuanNcIjtcbmltcG9ydCB7IHBpY2sgfSBmcm9tIFwiLi4vdXRpbC5qc1wiO1xuaW1wb3J0IHsgZGVmYXVsdEJpbmFyeVR5cGUsIG5leHRUaWNrLCB1c2luZ0Jyb3dzZXJXZWJTb2NrZXQsIFdlYlNvY2tldCB9IGZyb20gXCIuL3dlYnNvY2tldC1jb25zdHJ1Y3Rvci5qc1wiO1xuaW1wb3J0IHsgZW5jb2RlUGFja2V0IH0gZnJvbSBcImVuZ2luZS5pby1wYXJzZXJcIjtcbi8vIGRldGVjdCBSZWFjdE5hdGl2ZSBlbnZpcm9ubWVudFxuY29uc3QgaXNSZWFjdE5hdGl2ZSA9IHR5cGVvZiBuYXZpZ2F0b3IgIT09IFwidW5kZWZpbmVkXCIgJiZcbiAgICB0eXBlb2YgbmF2aWdhdG9yLnByb2R1Y3QgPT09IFwic3RyaW5nXCIgJiZcbiAgICBuYXZpZ2F0b3IucHJvZHVjdC50b0xvd2VyQ2FzZSgpID09PSBcInJlYWN0bmF0aXZlXCI7XG5leHBvcnQgY2xhc3MgV1MgZXh0ZW5kcyBUcmFuc3BvcnQge1xuICAgIC8qKlxuICAgICAqIFdlYlNvY2tldCB0cmFuc3BvcnQgY29uc3RydWN0b3IuXG4gICAgICpcbiAgICAgKiBAYXBpIHtPYmplY3R9IGNvbm5lY3Rpb24gb3B0aW9uc1xuICAgICAqIEBhcGkgcHVibGljXG4gICAgICovXG4gICAgY29uc3RydWN0b3Iob3B0cykge1xuICAgICAgICBzdXBlcihvcHRzKTtcbiAgICAgICAgdGhpcy5zdXBwb3J0c0JpbmFyeSA9ICFvcHRzLmZvcmNlQmFzZTY0O1xuICAgIH1cbiAgICAvKipcbiAgICAgKiBUcmFuc3BvcnQgbmFtZS5cbiAgICAgKlxuICAgICAqIEBhcGkgcHVibGljXG4gICAgICovXG4gICAgZ2V0IG5hbWUoKSB7XG4gICAgICAgIHJldHVybiBcIndlYnNvY2tldFwiO1xuICAgIH1cbiAgICAvKipcbiAgICAgKiBPcGVucyBzb2NrZXQuXG4gICAgICpcbiAgICAgKiBAYXBpIHByaXZhdGVcbiAgICAgKi9cbiAgICBkb09wZW4oKSB7XG4gICAgICAgIGlmICghdGhpcy5jaGVjaygpKSB7XG4gICAgICAgICAgICAvLyBsZXQgcHJvYmUgdGltZW91dFxuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG4gICAgICAgIGNvbnN0IHVyaSA9IHRoaXMudXJpKCk7XG4gICAgICAgIGNvbnN0IHByb3RvY29scyA9IHRoaXMub3B0cy5wcm90b2NvbHM7XG4gICAgICAgIC8vIFJlYWN0IE5hdGl2ZSBvbmx5IHN1cHBvcnRzIHRoZSAnaGVhZGVycycgb3B0aW9uLCBhbmQgd2lsbCBwcmludCBhIHdhcm5pbmcgaWYgYW55dGhpbmcgZWxzZSBpcyBwYXNzZWRcbiAgICAgICAgY29uc3Qgb3B0cyA9IGlzUmVhY3ROYXRpdmVcbiAgICAgICAgICAgID8ge31cbiAgICAgICAgICAgIDogcGljayh0aGlzLm9wdHMsIFwiYWdlbnRcIiwgXCJwZXJNZXNzYWdlRGVmbGF0ZVwiLCBcInBmeFwiLCBcImtleVwiLCBcInBhc3NwaHJhc2VcIiwgXCJjZXJ0XCIsIFwiY2FcIiwgXCJjaXBoZXJzXCIsIFwicmVqZWN0VW5hdXRob3JpemVkXCIsIFwibG9jYWxBZGRyZXNzXCIsIFwicHJvdG9jb2xWZXJzaW9uXCIsIFwib3JpZ2luXCIsIFwibWF4UGF5bG9hZFwiLCBcImZhbWlseVwiLCBcImNoZWNrU2VydmVySWRlbnRpdHlcIik7XG4gICAgICAgIGlmICh0aGlzLm9wdHMuZXh0cmFIZWFkZXJzKSB7XG4gICAgICAgICAgICBvcHRzLmhlYWRlcnMgPSB0aGlzLm9wdHMuZXh0cmFIZWFkZXJzO1xuICAgICAgICB9XG4gICAgICAgIHRyeSB7XG4gICAgICAgICAgICB0aGlzLndzID1cbiAgICAgICAgICAgICAgICB1c2luZ0Jyb3dzZXJXZWJTb2NrZXQgJiYgIWlzUmVhY3ROYXRpdmVcbiAgICAgICAgICAgICAgICAgICAgPyBwcm90b2NvbHNcbiAgICAgICAgICAgICAgICAgICAgICAgID8gbmV3IFdlYlNvY2tldCh1cmksIHByb3RvY29scylcbiAgICAgICAgICAgICAgICAgICAgICAgIDogbmV3IFdlYlNvY2tldCh1cmkpXG4gICAgICAgICAgICAgICAgICAgIDogbmV3IFdlYlNvY2tldCh1cmksIHByb3RvY29scywgb3B0cyk7XG4gICAgICAgIH1cbiAgICAgICAgY2F0Y2ggKGVycikge1xuICAgICAgICAgICAgcmV0dXJuIHRoaXMuZW1pdFJlc2VydmVkKFwiZXJyb3JcIiwgZXJyKTtcbiAgICAgICAgfVxuICAgICAgICB0aGlzLndzLmJpbmFyeVR5cGUgPSB0aGlzLnNvY2tldC5iaW5hcnlUeXBlIHx8IGRlZmF1bHRCaW5hcnlUeXBlO1xuICAgICAgICB0aGlzLmFkZEV2ZW50TGlzdGVuZXJzKCk7XG4gICAgfVxuICAgIC8qKlxuICAgICAqIEFkZHMgZXZlbnQgbGlzdGVuZXJzIHRvIHRoZSBzb2NrZXRcbiAgICAgKlxuICAgICAqIEBhcGkgcHJpdmF0ZVxuICAgICAqL1xuICAgIGFkZEV2ZW50TGlzdGVuZXJzKCkge1xuICAgICAgICB0aGlzLndzLm9ub3BlbiA9ICgpID0+IHtcbiAgICAgICAgICAgIGlmICh0aGlzLm9wdHMuYXV0b1VucmVmKSB7XG4gICAgICAgICAgICAgICAgdGhpcy53cy5fc29ja2V0LnVucmVmKCk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICB0aGlzLm9uT3BlbigpO1xuICAgICAgICB9O1xuICAgICAgICB0aGlzLndzLm9uY2xvc2UgPSBjbG9zZUV2ZW50ID0+IHRoaXMub25DbG9zZSh7XG4gICAgICAgICAgICBkZXNjcmlwdGlvbjogXCJ3ZWJzb2NrZXQgY29ubmVjdGlvbiBjbG9zZWRcIixcbiAgICAgICAgICAgIGNvbnRleHQ6IGNsb3NlRXZlbnRcbiAgICAgICAgfSk7XG4gICAgICAgIHRoaXMud3Mub25tZXNzYWdlID0gZXYgPT4gdGhpcy5vbkRhdGEoZXYuZGF0YSk7XG4gICAgICAgIHRoaXMud3Mub25lcnJvciA9IGUgPT4gdGhpcy5vbkVycm9yKFwid2Vic29ja2V0IGVycm9yXCIsIGUpO1xuICAgIH1cbiAgICAvKipcbiAgICAgKiBXcml0ZXMgZGF0YSB0byBzb2NrZXQuXG4gICAgICpcbiAgICAgKiBAcGFyYW0ge0FycmF5fSBhcnJheSBvZiBwYWNrZXRzLlxuICAgICAqIEBhcGkgcHJpdmF0ZVxuICAgICAqL1xuICAgIHdyaXRlKHBhY2tldHMpIHtcbiAgICAgICAgdGhpcy53cml0YWJsZSA9IGZhbHNlO1xuICAgICAgICAvLyBlbmNvZGVQYWNrZXQgZWZmaWNpZW50IGFzIGl0IHVzZXMgV1MgZnJhbWluZ1xuICAgICAgICAvLyBubyBuZWVkIGZvciBlbmNvZGVQYXlsb2FkXG4gICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgcGFja2V0cy5sZW5ndGg7IGkrKykge1xuICAgICAgICAgICAgY29uc3QgcGFja2V0ID0gcGFja2V0c1tpXTtcbiAgICAgICAgICAgIGNvbnN0IGxhc3RQYWNrZXQgPSBpID09PSBwYWNrZXRzLmxlbmd0aCAtIDE7XG4gICAgICAgICAgICBlbmNvZGVQYWNrZXQocGFja2V0LCB0aGlzLnN1cHBvcnRzQmluYXJ5LCBkYXRhID0+IHtcbiAgICAgICAgICAgICAgICAvLyBhbHdheXMgY3JlYXRlIGEgbmV3IG9iamVjdCAoR0gtNDM3KVxuICAgICAgICAgICAgICAgIGNvbnN0IG9wdHMgPSB7fTtcbiAgICAgICAgICAgICAgICBpZiAoIXVzaW5nQnJvd3NlcldlYlNvY2tldCkge1xuICAgICAgICAgICAgICAgICAgICBpZiAocGFja2V0Lm9wdGlvbnMpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIG9wdHMuY29tcHJlc3MgPSBwYWNrZXQub3B0aW9ucy5jb21wcmVzcztcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICBpZiAodGhpcy5vcHRzLnBlck1lc3NhZ2VEZWZsYXRlKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBjb25zdCBsZW4gPSBcbiAgICAgICAgICAgICAgICAgICAgICAgIC8vIEB0cy1pZ25vcmVcbiAgICAgICAgICAgICAgICAgICAgICAgIFwic3RyaW5nXCIgPT09IHR5cGVvZiBkYXRhID8gQnVmZmVyLmJ5dGVMZW5ndGgoZGF0YSkgOiBkYXRhLmxlbmd0aDtcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmIChsZW4gPCB0aGlzLm9wdHMucGVyTWVzc2FnZURlZmxhdGUudGhyZXNob2xkKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgb3B0cy5jb21wcmVzcyA9IGZhbHNlO1xuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIC8vIFNvbWV0aW1lcyB0aGUgd2Vic29ja2V0IGhhcyBhbHJlYWR5IGJlZW4gY2xvc2VkIGJ1dCB0aGUgYnJvd3NlciBkaWRuJ3RcbiAgICAgICAgICAgICAgICAvLyBoYXZlIGEgY2hhbmNlIG9mIGluZm9ybWluZyB1cyBhYm91dCBpdCB5ZXQsIGluIHRoYXQgY2FzZSBzZW5kIHdpbGxcbiAgICAgICAgICAgICAgICAvLyB0aHJvdyBhbiBlcnJvclxuICAgICAgICAgICAgICAgIHRyeSB7XG4gICAgICAgICAgICAgICAgICAgIGlmICh1c2luZ0Jyb3dzZXJXZWJTb2NrZXQpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIC8vIFR5cGVFcnJvciBpcyB0aHJvd24gd2hlbiBwYXNzaW5nIHRoZSBzZWNvbmQgYXJndW1lbnQgb24gU2FmYXJpXG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLndzLnNlbmQoZGF0YSk7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLndzLnNlbmQoZGF0YSwgb3B0cyk7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgY2F0Y2ggKGUpIHtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgaWYgKGxhc3RQYWNrZXQpIHtcbiAgICAgICAgICAgICAgICAgICAgLy8gZmFrZSBkcmFpblxuICAgICAgICAgICAgICAgICAgICAvLyBkZWZlciB0byBuZXh0IHRpY2sgdG8gYWxsb3cgU29ja2V0IHRvIGNsZWFyIHdyaXRlQnVmZmVyXG4gICAgICAgICAgICAgICAgICAgIG5leHRUaWNrKCgpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMud3JpdGFibGUgPSB0cnVlO1xuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5lbWl0UmVzZXJ2ZWQoXCJkcmFpblwiKTtcbiAgICAgICAgICAgICAgICAgICAgfSwgdGhpcy5zZXRUaW1lb3V0Rm4pO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9XG4gICAgfVxuICAgIC8qKlxuICAgICAqIENsb3NlcyBzb2NrZXQuXG4gICAgICpcbiAgICAgKiBAYXBpIHByaXZhdGVcbiAgICAgKi9cbiAgICBkb0Nsb3NlKCkge1xuICAgICAgICBpZiAodHlwZW9mIHRoaXMud3MgIT09IFwidW5kZWZpbmVkXCIpIHtcbiAgICAgICAgICAgIHRoaXMud3MuY2xvc2UoKTtcbiAgICAgICAgICAgIHRoaXMud3MgPSBudWxsO1xuICAgICAgICB9XG4gICAgfVxuICAgIC8qKlxuICAgICAqIEdlbmVyYXRlcyB1cmkgZm9yIGNvbm5lY3Rpb24uXG4gICAgICpcbiAgICAgKiBAYXBpIHByaXZhdGVcbiAgICAgKi9cbiAgICB1cmkoKSB7XG4gICAgICAgIGxldCBxdWVyeSA9IHRoaXMucXVlcnkgfHwge307XG4gICAgICAgIGNvbnN0IHNjaGVtYSA9IHRoaXMub3B0cy5zZWN1cmUgPyBcIndzc1wiIDogXCJ3c1wiO1xuICAgICAgICBsZXQgcG9ydCA9IFwiXCI7XG4gICAgICAgIC8vIGF2b2lkIHBvcnQgaWYgZGVmYXVsdCBmb3Igc2NoZW1hXG4gICAgICAgIGlmICh0aGlzLm9wdHMucG9ydCAmJlxuICAgICAgICAgICAgKChcIndzc1wiID09PSBzY2hlbWEgJiYgTnVtYmVyKHRoaXMub3B0cy5wb3J0KSAhPT0gNDQzKSB8fFxuICAgICAgICAgICAgICAgIChcIndzXCIgPT09IHNjaGVtYSAmJiBOdW1iZXIodGhpcy5vcHRzLnBvcnQpICE9PSA4MCkpKSB7XG4gICAgICAgICAgICBwb3J0ID0gXCI6XCIgKyB0aGlzLm9wdHMucG9ydDtcbiAgICAgICAgfVxuICAgICAgICAvLyBhcHBlbmQgdGltZXN0YW1wIHRvIFVSSVxuICAgICAgICBpZiAodGhpcy5vcHRzLnRpbWVzdGFtcFJlcXVlc3RzKSB7XG4gICAgICAgICAgICBxdWVyeVt0aGlzLm9wdHMudGltZXN0YW1wUGFyYW1dID0geWVhc3QoKTtcbiAgICAgICAgfVxuICAgICAgICAvLyBjb21tdW5pY2F0ZSBiaW5hcnkgc3VwcG9ydCBjYXBhYmlsaXRpZXNcbiAgICAgICAgaWYgKCF0aGlzLnN1cHBvcnRzQmluYXJ5KSB7XG4gICAgICAgICAgICBxdWVyeS5iNjQgPSAxO1xuICAgICAgICB9XG4gICAgICAgIGNvbnN0IGVuY29kZWRRdWVyeSA9IGVuY29kZShxdWVyeSk7XG4gICAgICAgIGNvbnN0IGlwdjYgPSB0aGlzLm9wdHMuaG9zdG5hbWUuaW5kZXhPZihcIjpcIikgIT09IC0xO1xuICAgICAgICByZXR1cm4gKHNjaGVtYSArXG4gICAgICAgICAgICBcIjovL1wiICtcbiAgICAgICAgICAgIChpcHY2ID8gXCJbXCIgKyB0aGlzLm9wdHMuaG9zdG5hbWUgKyBcIl1cIiA6IHRoaXMub3B0cy5ob3N0bmFtZSkgK1xuICAgICAgICAgICAgcG9ydCArXG4gICAgICAgICAgICB0aGlzLm9wdHMucGF0aCArXG4gICAgICAgICAgICAoZW5jb2RlZFF1ZXJ5Lmxlbmd0aCA/IFwiP1wiICsgZW5jb2RlZFF1ZXJ5IDogXCJcIikpO1xuICAgIH1cbiAgICAvKipcbiAgICAgKiBGZWF0dXJlIGRldGVjdGlvbiBmb3IgV2ViU29ja2V0LlxuICAgICAqXG4gICAgICogQHJldHVybiB7Qm9vbGVhbn0gd2hldGhlciB0aGlzIHRyYW5zcG9ydCBpcyBhdmFpbGFibGUuXG4gICAgICogQGFwaSBwdWJsaWNcbiAgICAgKi9cbiAgICBjaGVjaygpIHtcbiAgICAgICAgcmV0dXJuICEhV2ViU29ja2V0O1xuICAgIH1cbn1cbiIsICJpbXBvcnQgeyBQb2xsaW5nIH0gZnJvbSBcIi4vcG9sbGluZy5qc1wiO1xuaW1wb3J0IHsgV1MgfSBmcm9tIFwiLi93ZWJzb2NrZXQuanNcIjtcbmV4cG9ydCBjb25zdCB0cmFuc3BvcnRzID0ge1xuICAgIHdlYnNvY2tldDogV1MsXG4gICAgcG9sbGluZzogUG9sbGluZ1xufTtcbiIsICIvLyBpbXBvcnRlZCBmcm9tIGh0dHBzOi8vZ2l0aHViLmNvbS9nYWxrbi9wYXJzZXVyaVxuLyoqXG4gKiBQYXJzZXMgYW4gVVJJXG4gKlxuICogQGF1dGhvciBTdGV2ZW4gTGV2aXRoYW4gPHN0ZXZlbmxldml0aGFuLmNvbT4gKE1JVCBsaWNlbnNlKVxuICogQGFwaSBwcml2YXRlXG4gKi9cbmNvbnN0IHJlID0gL14oPzooPyFbXjpAXSs6W146QFxcL10qQCkoaHR0cHxodHRwc3x3c3x3c3MpOlxcL1xcLyk/KCg/OigoW146QF0qKSg/OjooW146QF0qKSk/KT9AKT8oKD86W2EtZjAtOV17MCw0fTopezIsN31bYS1mMC05XXswLDR9fFteOlxcLz8jXSopKD86OihcXGQqKSk/KSgoKFxcLyg/OltePyNdKD8hW14/I1xcL10qXFwuW14/I1xcLy5dKyg/Ols/I118JCkpKSpcXC8/KT8oW14/I1xcL10qKSkoPzpcXD8oW14jXSopKT8oPzojKC4qKSk/KS87XG5jb25zdCBwYXJ0cyA9IFtcbiAgICAnc291cmNlJywgJ3Byb3RvY29sJywgJ2F1dGhvcml0eScsICd1c2VySW5mbycsICd1c2VyJywgJ3Bhc3N3b3JkJywgJ2hvc3QnLCAncG9ydCcsICdyZWxhdGl2ZScsICdwYXRoJywgJ2RpcmVjdG9yeScsICdmaWxlJywgJ3F1ZXJ5JywgJ2FuY2hvcidcbl07XG5leHBvcnQgZnVuY3Rpb24gcGFyc2Uoc3RyKSB7XG4gICAgY29uc3Qgc3JjID0gc3RyLCBiID0gc3RyLmluZGV4T2YoJ1snKSwgZSA9IHN0ci5pbmRleE9mKCddJyk7XG4gICAgaWYgKGIgIT0gLTEgJiYgZSAhPSAtMSkge1xuICAgICAgICBzdHIgPSBzdHIuc3Vic3RyaW5nKDAsIGIpICsgc3RyLnN1YnN0cmluZyhiLCBlKS5yZXBsYWNlKC86L2csICc7JykgKyBzdHIuc3Vic3RyaW5nKGUsIHN0ci5sZW5ndGgpO1xuICAgIH1cbiAgICBsZXQgbSA9IHJlLmV4ZWMoc3RyIHx8ICcnKSwgdXJpID0ge30sIGkgPSAxNDtcbiAgICB3aGlsZSAoaS0tKSB7XG4gICAgICAgIHVyaVtwYXJ0c1tpXV0gPSBtW2ldIHx8ICcnO1xuICAgIH1cbiAgICBpZiAoYiAhPSAtMSAmJiBlICE9IC0xKSB7XG4gICAgICAgIHVyaS5zb3VyY2UgPSBzcmM7XG4gICAgICAgIHVyaS5ob3N0ID0gdXJpLmhvc3Quc3Vic3RyaW5nKDEsIHVyaS5ob3N0Lmxlbmd0aCAtIDEpLnJlcGxhY2UoLzsvZywgJzonKTtcbiAgICAgICAgdXJpLmF1dGhvcml0eSA9IHVyaS5hdXRob3JpdHkucmVwbGFjZSgnWycsICcnKS5yZXBsYWNlKCddJywgJycpLnJlcGxhY2UoLzsvZywgJzonKTtcbiAgICAgICAgdXJpLmlwdjZ1cmkgPSB0cnVlO1xuICAgIH1cbiAgICB1cmkucGF0aE5hbWVzID0gcGF0aE5hbWVzKHVyaSwgdXJpWydwYXRoJ10pO1xuICAgIHVyaS5xdWVyeUtleSA9IHF1ZXJ5S2V5KHVyaSwgdXJpWydxdWVyeSddKTtcbiAgICByZXR1cm4gdXJpO1xufVxuZnVuY3Rpb24gcGF0aE5hbWVzKG9iaiwgcGF0aCkge1xuICAgIGNvbnN0IHJlZ3ggPSAvXFwvezIsOX0vZywgbmFtZXMgPSBwYXRoLnJlcGxhY2UocmVneCwgXCIvXCIpLnNwbGl0KFwiL1wiKTtcbiAgICBpZiAocGF0aC5zdWJzdHIoMCwgMSkgPT0gJy8nIHx8IHBhdGgubGVuZ3RoID09PSAwKSB7XG4gICAgICAgIG5hbWVzLnNwbGljZSgwLCAxKTtcbiAgICB9XG4gICAgaWYgKHBhdGguc3Vic3RyKHBhdGgubGVuZ3RoIC0gMSwgMSkgPT0gJy8nKSB7XG4gICAgICAgIG5hbWVzLnNwbGljZShuYW1lcy5sZW5ndGggLSAxLCAxKTtcbiAgICB9XG4gICAgcmV0dXJuIG5hbWVzO1xufVxuZnVuY3Rpb24gcXVlcnlLZXkodXJpLCBxdWVyeSkge1xuICAgIGNvbnN0IGRhdGEgPSB7fTtcbiAgICBxdWVyeS5yZXBsYWNlKC8oPzpefCYpKFteJj1dKik9PyhbXiZdKikvZywgZnVuY3Rpb24gKCQwLCAkMSwgJDIpIHtcbiAgICAgICAgaWYgKCQxKSB7XG4gICAgICAgICAgICBkYXRhWyQxXSA9ICQyO1xuICAgICAgICB9XG4gICAgfSk7XG4gICAgcmV0dXJuIGRhdGE7XG59XG4iLCAiaW1wb3J0IHsgdHJhbnNwb3J0cyB9IGZyb20gXCIuL3RyYW5zcG9ydHMvaW5kZXguanNcIjtcbmltcG9ydCB7IGluc3RhbGxUaW1lckZ1bmN0aW9ucywgYnl0ZUxlbmd0aCB9IGZyb20gXCIuL3V0aWwuanNcIjtcbmltcG9ydCB7IGRlY29kZSB9IGZyb20gXCIuL2NvbnRyaWIvcGFyc2Vxcy5qc1wiO1xuaW1wb3J0IHsgcGFyc2UgfSBmcm9tIFwiLi9jb250cmliL3BhcnNldXJpLmpzXCI7XG5pbXBvcnQgeyBFbWl0dGVyIH0gZnJvbSBcIkBzb2NrZXQuaW8vY29tcG9uZW50LWVtaXR0ZXJcIjtcbmltcG9ydCB7IHByb3RvY29sIH0gZnJvbSBcImVuZ2luZS5pby1wYXJzZXJcIjtcbmV4cG9ydCBjbGFzcyBTb2NrZXQgZXh0ZW5kcyBFbWl0dGVyIHtcbiAgICAvKipcbiAgICAgKiBTb2NrZXQgY29uc3RydWN0b3IuXG4gICAgICpcbiAgICAgKiBAcGFyYW0ge1N0cmluZ3xPYmplY3R9IHVyaSBvciBvcHRpb25zXG4gICAgICogQHBhcmFtIHtPYmplY3R9IG9wdHMgLSBvcHRpb25zXG4gICAgICogQGFwaSBwdWJsaWNcbiAgICAgKi9cbiAgICBjb25zdHJ1Y3Rvcih1cmksIG9wdHMgPSB7fSkge1xuICAgICAgICBzdXBlcigpO1xuICAgICAgICBpZiAodXJpICYmIFwib2JqZWN0XCIgPT09IHR5cGVvZiB1cmkpIHtcbiAgICAgICAgICAgIG9wdHMgPSB1cmk7XG4gICAgICAgICAgICB1cmkgPSBudWxsO1xuICAgICAgICB9XG4gICAgICAgIGlmICh1cmkpIHtcbiAgICAgICAgICAgIHVyaSA9IHBhcnNlKHVyaSk7XG4gICAgICAgICAgICBvcHRzLmhvc3RuYW1lID0gdXJpLmhvc3Q7XG4gICAgICAgICAgICBvcHRzLnNlY3VyZSA9IHVyaS5wcm90b2NvbCA9PT0gXCJodHRwc1wiIHx8IHVyaS5wcm90b2NvbCA9PT0gXCJ3c3NcIjtcbiAgICAgICAgICAgIG9wdHMucG9ydCA9IHVyaS5wb3J0O1xuICAgICAgICAgICAgaWYgKHVyaS5xdWVyeSlcbiAgICAgICAgICAgICAgICBvcHRzLnF1ZXJ5ID0gdXJpLnF1ZXJ5O1xuICAgICAgICB9XG4gICAgICAgIGVsc2UgaWYgKG9wdHMuaG9zdCkge1xuICAgICAgICAgICAgb3B0cy5ob3N0bmFtZSA9IHBhcnNlKG9wdHMuaG9zdCkuaG9zdDtcbiAgICAgICAgfVxuICAgICAgICBpbnN0YWxsVGltZXJGdW5jdGlvbnModGhpcywgb3B0cyk7XG4gICAgICAgIHRoaXMuc2VjdXJlID1cbiAgICAgICAgICAgIG51bGwgIT0gb3B0cy5zZWN1cmVcbiAgICAgICAgICAgICAgICA/IG9wdHMuc2VjdXJlXG4gICAgICAgICAgICAgICAgOiB0eXBlb2YgbG9jYXRpb24gIT09IFwidW5kZWZpbmVkXCIgJiYgXCJodHRwczpcIiA9PT0gbG9jYXRpb24ucHJvdG9jb2w7XG4gICAgICAgIGlmIChvcHRzLmhvc3RuYW1lICYmICFvcHRzLnBvcnQpIHtcbiAgICAgICAgICAgIC8vIGlmIG5vIHBvcnQgaXMgc3BlY2lmaWVkIG1hbnVhbGx5LCB1c2UgdGhlIHByb3RvY29sIGRlZmF1bHRcbiAgICAgICAgICAgIG9wdHMucG9ydCA9IHRoaXMuc2VjdXJlID8gXCI0NDNcIiA6IFwiODBcIjtcbiAgICAgICAgfVxuICAgICAgICB0aGlzLmhvc3RuYW1lID1cbiAgICAgICAgICAgIG9wdHMuaG9zdG5hbWUgfHxcbiAgICAgICAgICAgICAgICAodHlwZW9mIGxvY2F0aW9uICE9PSBcInVuZGVmaW5lZFwiID8gbG9jYXRpb24uaG9zdG5hbWUgOiBcImxvY2FsaG9zdFwiKTtcbiAgICAgICAgdGhpcy5wb3J0ID1cbiAgICAgICAgICAgIG9wdHMucG9ydCB8fFxuICAgICAgICAgICAgICAgICh0eXBlb2YgbG9jYXRpb24gIT09IFwidW5kZWZpbmVkXCIgJiYgbG9jYXRpb24ucG9ydFxuICAgICAgICAgICAgICAgICAgICA/IGxvY2F0aW9uLnBvcnRcbiAgICAgICAgICAgICAgICAgICAgOiB0aGlzLnNlY3VyZVxuICAgICAgICAgICAgICAgICAgICAgICAgPyBcIjQ0M1wiXG4gICAgICAgICAgICAgICAgICAgICAgICA6IFwiODBcIik7XG4gICAgICAgIHRoaXMudHJhbnNwb3J0cyA9IG9wdHMudHJhbnNwb3J0cyB8fCBbXCJwb2xsaW5nXCIsIFwid2Vic29ja2V0XCJdO1xuICAgICAgICB0aGlzLnJlYWR5U3RhdGUgPSBcIlwiO1xuICAgICAgICB0aGlzLndyaXRlQnVmZmVyID0gW107XG4gICAgICAgIHRoaXMucHJldkJ1ZmZlckxlbiA9IDA7XG4gICAgICAgIHRoaXMub3B0cyA9IE9iamVjdC5hc3NpZ24oe1xuICAgICAgICAgICAgcGF0aDogXCIvZW5naW5lLmlvXCIsXG4gICAgICAgICAgICBhZ2VudDogZmFsc2UsXG4gICAgICAgICAgICB3aXRoQ3JlZGVudGlhbHM6IGZhbHNlLFxuICAgICAgICAgICAgdXBncmFkZTogdHJ1ZSxcbiAgICAgICAgICAgIHRpbWVzdGFtcFBhcmFtOiBcInRcIixcbiAgICAgICAgICAgIHJlbWVtYmVyVXBncmFkZTogZmFsc2UsXG4gICAgICAgICAgICByZWplY3RVbmF1dGhvcml6ZWQ6IHRydWUsXG4gICAgICAgICAgICBwZXJNZXNzYWdlRGVmbGF0ZToge1xuICAgICAgICAgICAgICAgIHRocmVzaG9sZDogMTAyNFxuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIHRyYW5zcG9ydE9wdGlvbnM6IHt9LFxuICAgICAgICAgICAgY2xvc2VPbkJlZm9yZXVubG9hZDogdHJ1ZVxuICAgICAgICB9LCBvcHRzKTtcbiAgICAgICAgdGhpcy5vcHRzLnBhdGggPSB0aGlzLm9wdHMucGF0aC5yZXBsYWNlKC9cXC8kLywgXCJcIikgKyBcIi9cIjtcbiAgICAgICAgaWYgKHR5cGVvZiB0aGlzLm9wdHMucXVlcnkgPT09IFwic3RyaW5nXCIpIHtcbiAgICAgICAgICAgIHRoaXMub3B0cy5xdWVyeSA9IGRlY29kZSh0aGlzLm9wdHMucXVlcnkpO1xuICAgICAgICB9XG4gICAgICAgIC8vIHNldCBvbiBoYW5kc2hha2VcbiAgICAgICAgdGhpcy5pZCA9IG51bGw7XG4gICAgICAgIHRoaXMudXBncmFkZXMgPSBudWxsO1xuICAgICAgICB0aGlzLnBpbmdJbnRlcnZhbCA9IG51bGw7XG4gICAgICAgIHRoaXMucGluZ1RpbWVvdXQgPSBudWxsO1xuICAgICAgICAvLyBzZXQgb24gaGVhcnRiZWF0XG4gICAgICAgIHRoaXMucGluZ1RpbWVvdXRUaW1lciA9IG51bGw7XG4gICAgICAgIGlmICh0eXBlb2YgYWRkRXZlbnRMaXN0ZW5lciA9PT0gXCJmdW5jdGlvblwiKSB7XG4gICAgICAgICAgICBpZiAodGhpcy5vcHRzLmNsb3NlT25CZWZvcmV1bmxvYWQpIHtcbiAgICAgICAgICAgICAgICAvLyBGaXJlZm94IGNsb3NlcyB0aGUgY29ubmVjdGlvbiB3aGVuIHRoZSBcImJlZm9yZXVubG9hZFwiIGV2ZW50IGlzIGVtaXR0ZWQgYnV0IG5vdCBDaHJvbWUuIFRoaXMgZXZlbnQgbGlzdGVuZXJcbiAgICAgICAgICAgICAgICAvLyBlbnN1cmVzIGV2ZXJ5IGJyb3dzZXIgYmVoYXZlcyB0aGUgc2FtZSAobm8gXCJkaXNjb25uZWN0XCIgZXZlbnQgYXQgdGhlIFNvY2tldC5JTyBsZXZlbCB3aGVuIHRoZSBwYWdlIGlzXG4gICAgICAgICAgICAgICAgLy8gY2xvc2VkL3JlbG9hZGVkKVxuICAgICAgICAgICAgICAgIGFkZEV2ZW50TGlzdGVuZXIoXCJiZWZvcmV1bmxvYWRcIiwgKCkgPT4ge1xuICAgICAgICAgICAgICAgICAgICBpZiAodGhpcy50cmFuc3BvcnQpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIC8vIHNpbGVudGx5IGNsb3NlIHRoZSB0cmFuc3BvcnRcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMudHJhbnNwb3J0LnJlbW92ZUFsbExpc3RlbmVycygpO1xuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy50cmFuc3BvcnQuY2xvc2UoKTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH0sIGZhbHNlKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGlmICh0aGlzLmhvc3RuYW1lICE9PSBcImxvY2FsaG9zdFwiKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5vZmZsaW5lRXZlbnRMaXN0ZW5lciA9ICgpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5vbkNsb3NlKFwidHJhbnNwb3J0IGNsb3NlXCIsIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGRlc2NyaXB0aW9uOiBcIm5ldHdvcmsgY29ubmVjdGlvbiBsb3N0XCJcbiAgICAgICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgICAgfTtcbiAgICAgICAgICAgICAgICBhZGRFdmVudExpc3RlbmVyKFwib2ZmbGluZVwiLCB0aGlzLm9mZmxpbmVFdmVudExpc3RlbmVyLCBmYWxzZSk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgdGhpcy5vcGVuKCk7XG4gICAgfVxuICAgIC8qKlxuICAgICAqIENyZWF0ZXMgdHJhbnNwb3J0IG9mIHRoZSBnaXZlbiB0eXBlLlxuICAgICAqXG4gICAgICogQHBhcmFtIHtTdHJpbmd9IHRyYW5zcG9ydCBuYW1lXG4gICAgICogQHJldHVybiB7VHJhbnNwb3J0fVxuICAgICAqIEBhcGkgcHJpdmF0ZVxuICAgICAqL1xuICAgIGNyZWF0ZVRyYW5zcG9ydChuYW1lKSB7XG4gICAgICAgIGNvbnN0IHF1ZXJ5ID0gT2JqZWN0LmFzc2lnbih7fSwgdGhpcy5vcHRzLnF1ZXJ5KTtcbiAgICAgICAgLy8gYXBwZW5kIGVuZ2luZS5pbyBwcm90b2NvbCBpZGVudGlmaWVyXG4gICAgICAgIHF1ZXJ5LkVJTyA9IHByb3RvY29sO1xuICAgICAgICAvLyB0cmFuc3BvcnQgbmFtZVxuICAgICAgICBxdWVyeS50cmFuc3BvcnQgPSBuYW1lO1xuICAgICAgICAvLyBzZXNzaW9uIGlkIGlmIHdlIGFscmVhZHkgaGF2ZSBvbmVcbiAgICAgICAgaWYgKHRoaXMuaWQpXG4gICAgICAgICAgICBxdWVyeS5zaWQgPSB0aGlzLmlkO1xuICAgICAgICBjb25zdCBvcHRzID0gT2JqZWN0LmFzc2lnbih7fSwgdGhpcy5vcHRzLnRyYW5zcG9ydE9wdGlvbnNbbmFtZV0sIHRoaXMub3B0cywge1xuICAgICAgICAgICAgcXVlcnksXG4gICAgICAgICAgICBzb2NrZXQ6IHRoaXMsXG4gICAgICAgICAgICBob3N0bmFtZTogdGhpcy5ob3N0bmFtZSxcbiAgICAgICAgICAgIHNlY3VyZTogdGhpcy5zZWN1cmUsXG4gICAgICAgICAgICBwb3J0OiB0aGlzLnBvcnRcbiAgICAgICAgfSk7XG4gICAgICAgIHJldHVybiBuZXcgdHJhbnNwb3J0c1tuYW1lXShvcHRzKTtcbiAgICB9XG4gICAgLyoqXG4gICAgICogSW5pdGlhbGl6ZXMgdHJhbnNwb3J0IHRvIHVzZSBhbmQgc3RhcnRzIHByb2JlLlxuICAgICAqXG4gICAgICogQGFwaSBwcml2YXRlXG4gICAgICovXG4gICAgb3BlbigpIHtcbiAgICAgICAgbGV0IHRyYW5zcG9ydDtcbiAgICAgICAgaWYgKHRoaXMub3B0cy5yZW1lbWJlclVwZ3JhZGUgJiZcbiAgICAgICAgICAgIFNvY2tldC5wcmlvcldlYnNvY2tldFN1Y2Nlc3MgJiZcbiAgICAgICAgICAgIHRoaXMudHJhbnNwb3J0cy5pbmRleE9mKFwid2Vic29ja2V0XCIpICE9PSAtMSkge1xuICAgICAgICAgICAgdHJhbnNwb3J0ID0gXCJ3ZWJzb2NrZXRcIjtcbiAgICAgICAgfVxuICAgICAgICBlbHNlIGlmICgwID09PSB0aGlzLnRyYW5zcG9ydHMubGVuZ3RoKSB7XG4gICAgICAgICAgICAvLyBFbWl0IGVycm9yIG9uIG5leHQgdGljayBzbyBpdCBjYW4gYmUgbGlzdGVuZWQgdG9cbiAgICAgICAgICAgIHRoaXMuc2V0VGltZW91dEZuKCgpID0+IHtcbiAgICAgICAgICAgICAgICB0aGlzLmVtaXRSZXNlcnZlZChcImVycm9yXCIsIFwiTm8gdHJhbnNwb3J0cyBhdmFpbGFibGVcIik7XG4gICAgICAgICAgICB9LCAwKTtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgIHRyYW5zcG9ydCA9IHRoaXMudHJhbnNwb3J0c1swXTtcbiAgICAgICAgfVxuICAgICAgICB0aGlzLnJlYWR5U3RhdGUgPSBcIm9wZW5pbmdcIjtcbiAgICAgICAgLy8gUmV0cnkgd2l0aCB0aGUgbmV4dCB0cmFuc3BvcnQgaWYgdGhlIHRyYW5zcG9ydCBpcyBkaXNhYmxlZCAoanNvbnA6IGZhbHNlKVxuICAgICAgICB0cnkge1xuICAgICAgICAgICAgdHJhbnNwb3J0ID0gdGhpcy5jcmVhdGVUcmFuc3BvcnQodHJhbnNwb3J0KTtcbiAgICAgICAgfVxuICAgICAgICBjYXRjaCAoZSkge1xuICAgICAgICAgICAgdGhpcy50cmFuc3BvcnRzLnNoaWZ0KCk7XG4gICAgICAgICAgICB0aGlzLm9wZW4oKTtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuICAgICAgICB0cmFuc3BvcnQub3BlbigpO1xuICAgICAgICB0aGlzLnNldFRyYW5zcG9ydCh0cmFuc3BvcnQpO1xuICAgIH1cbiAgICAvKipcbiAgICAgKiBTZXRzIHRoZSBjdXJyZW50IHRyYW5zcG9ydC4gRGlzYWJsZXMgdGhlIGV4aXN0aW5nIG9uZSAoaWYgYW55KS5cbiAgICAgKlxuICAgICAqIEBhcGkgcHJpdmF0ZVxuICAgICAqL1xuICAgIHNldFRyYW5zcG9ydCh0cmFuc3BvcnQpIHtcbiAgICAgICAgaWYgKHRoaXMudHJhbnNwb3J0KSB7XG4gICAgICAgICAgICB0aGlzLnRyYW5zcG9ydC5yZW1vdmVBbGxMaXN0ZW5lcnMoKTtcbiAgICAgICAgfVxuICAgICAgICAvLyBzZXQgdXAgdHJhbnNwb3J0XG4gICAgICAgIHRoaXMudHJhbnNwb3J0ID0gdHJhbnNwb3J0O1xuICAgICAgICAvLyBzZXQgdXAgdHJhbnNwb3J0IGxpc3RlbmVyc1xuICAgICAgICB0cmFuc3BvcnRcbiAgICAgICAgICAgIC5vbihcImRyYWluXCIsIHRoaXMub25EcmFpbi5iaW5kKHRoaXMpKVxuICAgICAgICAgICAgLm9uKFwicGFja2V0XCIsIHRoaXMub25QYWNrZXQuYmluZCh0aGlzKSlcbiAgICAgICAgICAgIC5vbihcImVycm9yXCIsIHRoaXMub25FcnJvci5iaW5kKHRoaXMpKVxuICAgICAgICAgICAgLm9uKFwiY2xvc2VcIiwgcmVhc29uID0+IHRoaXMub25DbG9zZShcInRyYW5zcG9ydCBjbG9zZVwiLCByZWFzb24pKTtcbiAgICB9XG4gICAgLyoqXG4gICAgICogUHJvYmVzIGEgdHJhbnNwb3J0LlxuICAgICAqXG4gICAgICogQHBhcmFtIHtTdHJpbmd9IHRyYW5zcG9ydCBuYW1lXG4gICAgICogQGFwaSBwcml2YXRlXG4gICAgICovXG4gICAgcHJvYmUobmFtZSkge1xuICAgICAgICBsZXQgdHJhbnNwb3J0ID0gdGhpcy5jcmVhdGVUcmFuc3BvcnQobmFtZSk7XG4gICAgICAgIGxldCBmYWlsZWQgPSBmYWxzZTtcbiAgICAgICAgU29ja2V0LnByaW9yV2Vic29ja2V0U3VjY2VzcyA9IGZhbHNlO1xuICAgICAgICBjb25zdCBvblRyYW5zcG9ydE9wZW4gPSAoKSA9PiB7XG4gICAgICAgICAgICBpZiAoZmFpbGVkKVxuICAgICAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICAgIHRyYW5zcG9ydC5zZW5kKFt7IHR5cGU6IFwicGluZ1wiLCBkYXRhOiBcInByb2JlXCIgfV0pO1xuICAgICAgICAgICAgdHJhbnNwb3J0Lm9uY2UoXCJwYWNrZXRcIiwgbXNnID0+IHtcbiAgICAgICAgICAgICAgICBpZiAoZmFpbGVkKVxuICAgICAgICAgICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgICAgICAgaWYgKFwicG9uZ1wiID09PSBtc2cudHlwZSAmJiBcInByb2JlXCIgPT09IG1zZy5kYXRhKSB7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMudXBncmFkaW5nID0gdHJ1ZTtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5lbWl0UmVzZXJ2ZWQoXCJ1cGdyYWRpbmdcIiwgdHJhbnNwb3J0KTtcbiAgICAgICAgICAgICAgICAgICAgaWYgKCF0cmFuc3BvcnQpXG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgICAgICAgICAgIFNvY2tldC5wcmlvcldlYnNvY2tldFN1Y2Nlc3MgPSBcIndlYnNvY2tldFwiID09PSB0cmFuc3BvcnQubmFtZTtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy50cmFuc3BvcnQucGF1c2UoKCkgPT4ge1xuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKGZhaWxlZClcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAoXCJjbG9zZWRcIiA9PT0gdGhpcy5yZWFkeVN0YXRlKVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICAgICAgICAgICAgICAgIGNsZWFudXAoKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuc2V0VHJhbnNwb3J0KHRyYW5zcG9ydCk7XG4gICAgICAgICAgICAgICAgICAgICAgICB0cmFuc3BvcnQuc2VuZChbeyB0eXBlOiBcInVwZ3JhZGVcIiB9XSk7XG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLmVtaXRSZXNlcnZlZChcInVwZ3JhZGVcIiwgdHJhbnNwb3J0KTtcbiAgICAgICAgICAgICAgICAgICAgICAgIHRyYW5zcG9ydCA9IG51bGw7XG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLnVwZ3JhZGluZyA9IGZhbHNlO1xuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5mbHVzaCgpO1xuICAgICAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgIGNvbnN0IGVyciA9IG5ldyBFcnJvcihcInByb2JlIGVycm9yXCIpO1xuICAgICAgICAgICAgICAgICAgICAvLyBAdHMtaWdub3JlXG4gICAgICAgICAgICAgICAgICAgIGVyci50cmFuc3BvcnQgPSB0cmFuc3BvcnQubmFtZTtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5lbWl0UmVzZXJ2ZWQoXCJ1cGdyYWRlRXJyb3JcIiwgZXJyKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfTtcbiAgICAgICAgZnVuY3Rpb24gZnJlZXplVHJhbnNwb3J0KCkge1xuICAgICAgICAgICAgaWYgKGZhaWxlZClcbiAgICAgICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgICAvLyBBbnkgY2FsbGJhY2sgY2FsbGVkIGJ5IHRyYW5zcG9ydCBzaG91bGQgYmUgaWdub3JlZCBzaW5jZSBub3dcbiAgICAgICAgICAgIGZhaWxlZCA9IHRydWU7XG4gICAgICAgICAgICBjbGVhbnVwKCk7XG4gICAgICAgICAgICB0cmFuc3BvcnQuY2xvc2UoKTtcbiAgICAgICAgICAgIHRyYW5zcG9ydCA9IG51bGw7XG4gICAgICAgIH1cbiAgICAgICAgLy8gSGFuZGxlIGFueSBlcnJvciB0aGF0IGhhcHBlbnMgd2hpbGUgcHJvYmluZ1xuICAgICAgICBjb25zdCBvbmVycm9yID0gZXJyID0+IHtcbiAgICAgICAgICAgIGNvbnN0IGVycm9yID0gbmV3IEVycm9yKFwicHJvYmUgZXJyb3I6IFwiICsgZXJyKTtcbiAgICAgICAgICAgIC8vIEB0cy1pZ25vcmVcbiAgICAgICAgICAgIGVycm9yLnRyYW5zcG9ydCA9IHRyYW5zcG9ydC5uYW1lO1xuICAgICAgICAgICAgZnJlZXplVHJhbnNwb3J0KCk7XG4gICAgICAgICAgICB0aGlzLmVtaXRSZXNlcnZlZChcInVwZ3JhZGVFcnJvclwiLCBlcnJvcik7XG4gICAgICAgIH07XG4gICAgICAgIGZ1bmN0aW9uIG9uVHJhbnNwb3J0Q2xvc2UoKSB7XG4gICAgICAgICAgICBvbmVycm9yKFwidHJhbnNwb3J0IGNsb3NlZFwiKTtcbiAgICAgICAgfVxuICAgICAgICAvLyBXaGVuIHRoZSBzb2NrZXQgaXMgY2xvc2VkIHdoaWxlIHdlJ3JlIHByb2JpbmdcbiAgICAgICAgZnVuY3Rpb24gb25jbG9zZSgpIHtcbiAgICAgICAgICAgIG9uZXJyb3IoXCJzb2NrZXQgY2xvc2VkXCIpO1xuICAgICAgICB9XG4gICAgICAgIC8vIFdoZW4gdGhlIHNvY2tldCBpcyB1cGdyYWRlZCB3aGlsZSB3ZSdyZSBwcm9iaW5nXG4gICAgICAgIGZ1bmN0aW9uIG9udXBncmFkZSh0bykge1xuICAgICAgICAgICAgaWYgKHRyYW5zcG9ydCAmJiB0by5uYW1lICE9PSB0cmFuc3BvcnQubmFtZSkge1xuICAgICAgICAgICAgICAgIGZyZWV6ZVRyYW5zcG9ydCgpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIC8vIFJlbW92ZSBhbGwgbGlzdGVuZXJzIG9uIHRoZSB0cmFuc3BvcnQgYW5kIG9uIHNlbGZcbiAgICAgICAgY29uc3QgY2xlYW51cCA9ICgpID0+IHtcbiAgICAgICAgICAgIHRyYW5zcG9ydC5yZW1vdmVMaXN0ZW5lcihcIm9wZW5cIiwgb25UcmFuc3BvcnRPcGVuKTtcbiAgICAgICAgICAgIHRyYW5zcG9ydC5yZW1vdmVMaXN0ZW5lcihcImVycm9yXCIsIG9uZXJyb3IpO1xuICAgICAgICAgICAgdHJhbnNwb3J0LnJlbW92ZUxpc3RlbmVyKFwiY2xvc2VcIiwgb25UcmFuc3BvcnRDbG9zZSk7XG4gICAgICAgICAgICB0aGlzLm9mZihcImNsb3NlXCIsIG9uY2xvc2UpO1xuICAgICAgICAgICAgdGhpcy5vZmYoXCJ1cGdyYWRpbmdcIiwgb251cGdyYWRlKTtcbiAgICAgICAgfTtcbiAgICAgICAgdHJhbnNwb3J0Lm9uY2UoXCJvcGVuXCIsIG9uVHJhbnNwb3J0T3Blbik7XG4gICAgICAgIHRyYW5zcG9ydC5vbmNlKFwiZXJyb3JcIiwgb25lcnJvcik7XG4gICAgICAgIHRyYW5zcG9ydC5vbmNlKFwiY2xvc2VcIiwgb25UcmFuc3BvcnRDbG9zZSk7XG4gICAgICAgIHRoaXMub25jZShcImNsb3NlXCIsIG9uY2xvc2UpO1xuICAgICAgICB0aGlzLm9uY2UoXCJ1cGdyYWRpbmdcIiwgb251cGdyYWRlKTtcbiAgICAgICAgdHJhbnNwb3J0Lm9wZW4oKTtcbiAgICB9XG4gICAgLyoqXG4gICAgICogQ2FsbGVkIHdoZW4gY29ubmVjdGlvbiBpcyBkZWVtZWQgb3Blbi5cbiAgICAgKlxuICAgICAqIEBhcGkgcHJpdmF0ZVxuICAgICAqL1xuICAgIG9uT3BlbigpIHtcbiAgICAgICAgdGhpcy5yZWFkeVN0YXRlID0gXCJvcGVuXCI7XG4gICAgICAgIFNvY2tldC5wcmlvcldlYnNvY2tldFN1Y2Nlc3MgPSBcIndlYnNvY2tldFwiID09PSB0aGlzLnRyYW5zcG9ydC5uYW1lO1xuICAgICAgICB0aGlzLmVtaXRSZXNlcnZlZChcIm9wZW5cIik7XG4gICAgICAgIHRoaXMuZmx1c2goKTtcbiAgICAgICAgLy8gd2UgY2hlY2sgZm9yIGByZWFkeVN0YXRlYCBpbiBjYXNlIGFuIGBvcGVuYFxuICAgICAgICAvLyBsaXN0ZW5lciBhbHJlYWR5IGNsb3NlZCB0aGUgc29ja2V0XG4gICAgICAgIGlmIChcIm9wZW5cIiA9PT0gdGhpcy5yZWFkeVN0YXRlICYmXG4gICAgICAgICAgICB0aGlzLm9wdHMudXBncmFkZSAmJlxuICAgICAgICAgICAgdGhpcy50cmFuc3BvcnQucGF1c2UpIHtcbiAgICAgICAgICAgIGxldCBpID0gMDtcbiAgICAgICAgICAgIGNvbnN0IGwgPSB0aGlzLnVwZ3JhZGVzLmxlbmd0aDtcbiAgICAgICAgICAgIGZvciAoOyBpIDwgbDsgaSsrKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5wcm9iZSh0aGlzLnVwZ3JhZGVzW2ldKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH1cbiAgICAvKipcbiAgICAgKiBIYW5kbGVzIGEgcGFja2V0LlxuICAgICAqXG4gICAgICogQGFwaSBwcml2YXRlXG4gICAgICovXG4gICAgb25QYWNrZXQocGFja2V0KSB7XG4gICAgICAgIGlmIChcIm9wZW5pbmdcIiA9PT0gdGhpcy5yZWFkeVN0YXRlIHx8XG4gICAgICAgICAgICBcIm9wZW5cIiA9PT0gdGhpcy5yZWFkeVN0YXRlIHx8XG4gICAgICAgICAgICBcImNsb3NpbmdcIiA9PT0gdGhpcy5yZWFkeVN0YXRlKSB7XG4gICAgICAgICAgICB0aGlzLmVtaXRSZXNlcnZlZChcInBhY2tldFwiLCBwYWNrZXQpO1xuICAgICAgICAgICAgLy8gU29ja2V0IGlzIGxpdmUgLSBhbnkgcGFja2V0IGNvdW50c1xuICAgICAgICAgICAgdGhpcy5lbWl0UmVzZXJ2ZWQoXCJoZWFydGJlYXRcIik7XG4gICAgICAgICAgICBzd2l0Y2ggKHBhY2tldC50eXBlKSB7XG4gICAgICAgICAgICAgICAgY2FzZSBcIm9wZW5cIjpcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5vbkhhbmRzaGFrZShKU09OLnBhcnNlKHBhY2tldC5kYXRhKSk7XG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgIGNhc2UgXCJwaW5nXCI6XG4gICAgICAgICAgICAgICAgICAgIHRoaXMucmVzZXRQaW5nVGltZW91dCgpO1xuICAgICAgICAgICAgICAgICAgICB0aGlzLnNlbmRQYWNrZXQoXCJwb25nXCIpO1xuICAgICAgICAgICAgICAgICAgICB0aGlzLmVtaXRSZXNlcnZlZChcInBpbmdcIik7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuZW1pdFJlc2VydmVkKFwicG9uZ1wiKTtcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgY2FzZSBcImVycm9yXCI6XG4gICAgICAgICAgICAgICAgICAgIGNvbnN0IGVyciA9IG5ldyBFcnJvcihcInNlcnZlciBlcnJvclwiKTtcbiAgICAgICAgICAgICAgICAgICAgLy8gQHRzLWlnbm9yZVxuICAgICAgICAgICAgICAgICAgICBlcnIuY29kZSA9IHBhY2tldC5kYXRhO1xuICAgICAgICAgICAgICAgICAgICB0aGlzLm9uRXJyb3IoZXJyKTtcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgY2FzZSBcIm1lc3NhZ2VcIjpcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5lbWl0UmVzZXJ2ZWQoXCJkYXRhXCIsIHBhY2tldC5kYXRhKTtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5lbWl0UmVzZXJ2ZWQoXCJtZXNzYWdlXCIsIHBhY2tldC5kYXRhKTtcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSB7XG4gICAgICAgIH1cbiAgICB9XG4gICAgLyoqXG4gICAgICogQ2FsbGVkIHVwb24gaGFuZHNoYWtlIGNvbXBsZXRpb24uXG4gICAgICpcbiAgICAgKiBAcGFyYW0ge09iamVjdH0gZGF0YSAtIGhhbmRzaGFrZSBvYmpcbiAgICAgKiBAYXBpIHByaXZhdGVcbiAgICAgKi9cbiAgICBvbkhhbmRzaGFrZShkYXRhKSB7XG4gICAgICAgIHRoaXMuZW1pdFJlc2VydmVkKFwiaGFuZHNoYWtlXCIsIGRhdGEpO1xuICAgICAgICB0aGlzLmlkID0gZGF0YS5zaWQ7XG4gICAgICAgIHRoaXMudHJhbnNwb3J0LnF1ZXJ5LnNpZCA9IGRhdGEuc2lkO1xuICAgICAgICB0aGlzLnVwZ3JhZGVzID0gdGhpcy5maWx0ZXJVcGdyYWRlcyhkYXRhLnVwZ3JhZGVzKTtcbiAgICAgICAgdGhpcy5waW5nSW50ZXJ2YWwgPSBkYXRhLnBpbmdJbnRlcnZhbDtcbiAgICAgICAgdGhpcy5waW5nVGltZW91dCA9IGRhdGEucGluZ1RpbWVvdXQ7XG4gICAgICAgIHRoaXMubWF4UGF5bG9hZCA9IGRhdGEubWF4UGF5bG9hZDtcbiAgICAgICAgdGhpcy5vbk9wZW4oKTtcbiAgICAgICAgLy8gSW4gY2FzZSBvcGVuIGhhbmRsZXIgY2xvc2VzIHNvY2tldFxuICAgICAgICBpZiAoXCJjbG9zZWRcIiA9PT0gdGhpcy5yZWFkeVN0YXRlKVxuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB0aGlzLnJlc2V0UGluZ1RpbWVvdXQoKTtcbiAgICB9XG4gICAgLyoqXG4gICAgICogU2V0cyBhbmQgcmVzZXRzIHBpbmcgdGltZW91dCB0aW1lciBiYXNlZCBvbiBzZXJ2ZXIgcGluZ3MuXG4gICAgICpcbiAgICAgKiBAYXBpIHByaXZhdGVcbiAgICAgKi9cbiAgICByZXNldFBpbmdUaW1lb3V0KCkge1xuICAgICAgICB0aGlzLmNsZWFyVGltZW91dEZuKHRoaXMucGluZ1RpbWVvdXRUaW1lcik7XG4gICAgICAgIHRoaXMucGluZ1RpbWVvdXRUaW1lciA9IHRoaXMuc2V0VGltZW91dEZuKCgpID0+IHtcbiAgICAgICAgICAgIHRoaXMub25DbG9zZShcInBpbmcgdGltZW91dFwiKTtcbiAgICAgICAgfSwgdGhpcy5waW5nSW50ZXJ2YWwgKyB0aGlzLnBpbmdUaW1lb3V0KTtcbiAgICAgICAgaWYgKHRoaXMub3B0cy5hdXRvVW5yZWYpIHtcbiAgICAgICAgICAgIHRoaXMucGluZ1RpbWVvdXRUaW1lci51bnJlZigpO1xuICAgICAgICB9XG4gICAgfVxuICAgIC8qKlxuICAgICAqIENhbGxlZCBvbiBgZHJhaW5gIGV2ZW50XG4gICAgICpcbiAgICAgKiBAYXBpIHByaXZhdGVcbiAgICAgKi9cbiAgICBvbkRyYWluKCkge1xuICAgICAgICB0aGlzLndyaXRlQnVmZmVyLnNwbGljZSgwLCB0aGlzLnByZXZCdWZmZXJMZW4pO1xuICAgICAgICAvLyBzZXR0aW5nIHByZXZCdWZmZXJMZW4gPSAwIGlzIHZlcnkgaW1wb3J0YW50XG4gICAgICAgIC8vIGZvciBleGFtcGxlLCB3aGVuIHVwZ3JhZGluZywgdXBncmFkZSBwYWNrZXQgaXMgc2VudCBvdmVyLFxuICAgICAgICAvLyBhbmQgYSBub256ZXJvIHByZXZCdWZmZXJMZW4gY291bGQgY2F1c2UgcHJvYmxlbXMgb24gYGRyYWluYFxuICAgICAgICB0aGlzLnByZXZCdWZmZXJMZW4gPSAwO1xuICAgICAgICBpZiAoMCA9PT0gdGhpcy53cml0ZUJ1ZmZlci5sZW5ndGgpIHtcbiAgICAgICAgICAgIHRoaXMuZW1pdFJlc2VydmVkKFwiZHJhaW5cIik7XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICB0aGlzLmZsdXNoKCk7XG4gICAgICAgIH1cbiAgICB9XG4gICAgLyoqXG4gICAgICogRmx1c2ggd3JpdGUgYnVmZmVycy5cbiAgICAgKlxuICAgICAqIEBhcGkgcHJpdmF0ZVxuICAgICAqL1xuICAgIGZsdXNoKCkge1xuICAgICAgICBpZiAoXCJjbG9zZWRcIiAhPT0gdGhpcy5yZWFkeVN0YXRlICYmXG4gICAgICAgICAgICB0aGlzLnRyYW5zcG9ydC53cml0YWJsZSAmJlxuICAgICAgICAgICAgIXRoaXMudXBncmFkaW5nICYmXG4gICAgICAgICAgICB0aGlzLndyaXRlQnVmZmVyLmxlbmd0aCkge1xuICAgICAgICAgICAgY29uc3QgcGFja2V0cyA9IHRoaXMuZ2V0V3JpdGFibGVQYWNrZXRzKCk7XG4gICAgICAgICAgICB0aGlzLnRyYW5zcG9ydC5zZW5kKHBhY2tldHMpO1xuICAgICAgICAgICAgLy8ga2VlcCB0cmFjayBvZiBjdXJyZW50IGxlbmd0aCBvZiB3cml0ZUJ1ZmZlclxuICAgICAgICAgICAgLy8gc3BsaWNlIHdyaXRlQnVmZmVyIGFuZCBjYWxsYmFja0J1ZmZlciBvbiBgZHJhaW5gXG4gICAgICAgICAgICB0aGlzLnByZXZCdWZmZXJMZW4gPSBwYWNrZXRzLmxlbmd0aDtcbiAgICAgICAgICAgIHRoaXMuZW1pdFJlc2VydmVkKFwiZmx1c2hcIik7XG4gICAgICAgIH1cbiAgICB9XG4gICAgLyoqXG4gICAgICogRW5zdXJlIHRoZSBlbmNvZGVkIHNpemUgb2YgdGhlIHdyaXRlQnVmZmVyIGlzIGJlbG93IHRoZSBtYXhQYXlsb2FkIHZhbHVlIHNlbnQgYnkgdGhlIHNlcnZlciAob25seSBmb3IgSFRUUFxuICAgICAqIGxvbmctcG9sbGluZylcbiAgICAgKlxuICAgICAqIEBwcml2YXRlXG4gICAgICovXG4gICAgZ2V0V3JpdGFibGVQYWNrZXRzKCkge1xuICAgICAgICBjb25zdCBzaG91bGRDaGVja1BheWxvYWRTaXplID0gdGhpcy5tYXhQYXlsb2FkICYmXG4gICAgICAgICAgICB0aGlzLnRyYW5zcG9ydC5uYW1lID09PSBcInBvbGxpbmdcIiAmJlxuICAgICAgICAgICAgdGhpcy53cml0ZUJ1ZmZlci5sZW5ndGggPiAxO1xuICAgICAgICBpZiAoIXNob3VsZENoZWNrUGF5bG9hZFNpemUpIHtcbiAgICAgICAgICAgIHJldHVybiB0aGlzLndyaXRlQnVmZmVyO1xuICAgICAgICB9XG4gICAgICAgIGxldCBwYXlsb2FkU2l6ZSA9IDE7IC8vIGZpcnN0IHBhY2tldCB0eXBlXG4gICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgdGhpcy53cml0ZUJ1ZmZlci5sZW5ndGg7IGkrKykge1xuICAgICAgICAgICAgY29uc3QgZGF0YSA9IHRoaXMud3JpdGVCdWZmZXJbaV0uZGF0YTtcbiAgICAgICAgICAgIGlmIChkYXRhKSB7XG4gICAgICAgICAgICAgICAgcGF5bG9hZFNpemUgKz0gYnl0ZUxlbmd0aChkYXRhKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGlmIChpID4gMCAmJiBwYXlsb2FkU2l6ZSA+IHRoaXMubWF4UGF5bG9hZCkge1xuICAgICAgICAgICAgICAgIHJldHVybiB0aGlzLndyaXRlQnVmZmVyLnNsaWNlKDAsIGkpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgcGF5bG9hZFNpemUgKz0gMjsgLy8gc2VwYXJhdG9yICsgcGFja2V0IHR5cGVcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gdGhpcy53cml0ZUJ1ZmZlcjtcbiAgICB9XG4gICAgLyoqXG4gICAgICogU2VuZHMgYSBtZXNzYWdlLlxuICAgICAqXG4gICAgICogQHBhcmFtIHtTdHJpbmd9IG1lc3NhZ2UuXG4gICAgICogQHBhcmFtIHtGdW5jdGlvbn0gY2FsbGJhY2sgZnVuY3Rpb24uXG4gICAgICogQHBhcmFtIHtPYmplY3R9IG9wdGlvbnMuXG4gICAgICogQHJldHVybiB7U29ja2V0fSBmb3IgY2hhaW5pbmcuXG4gICAgICogQGFwaSBwdWJsaWNcbiAgICAgKi9cbiAgICB3cml0ZShtc2csIG9wdGlvbnMsIGZuKSB7XG4gICAgICAgIHRoaXMuc2VuZFBhY2tldChcIm1lc3NhZ2VcIiwgbXNnLCBvcHRpb25zLCBmbik7XG4gICAgICAgIHJldHVybiB0aGlzO1xuICAgIH1cbiAgICBzZW5kKG1zZywgb3B0aW9ucywgZm4pIHtcbiAgICAgICAgdGhpcy5zZW5kUGFja2V0KFwibWVzc2FnZVwiLCBtc2csIG9wdGlvbnMsIGZuKTtcbiAgICAgICAgcmV0dXJuIHRoaXM7XG4gICAgfVxuICAgIC8qKlxuICAgICAqIFNlbmRzIGEgcGFja2V0LlxuICAgICAqXG4gICAgICogQHBhcmFtIHtTdHJpbmd9IHBhY2tldCB0eXBlLlxuICAgICAqIEBwYXJhbSB7U3RyaW5nfSBkYXRhLlxuICAgICAqIEBwYXJhbSB7T2JqZWN0fSBvcHRpb25zLlxuICAgICAqIEBwYXJhbSB7RnVuY3Rpb259IGNhbGxiYWNrIGZ1bmN0aW9uLlxuICAgICAqIEBhcGkgcHJpdmF0ZVxuICAgICAqL1xuICAgIHNlbmRQYWNrZXQodHlwZSwgZGF0YSwgb3B0aW9ucywgZm4pIHtcbiAgICAgICAgaWYgKFwiZnVuY3Rpb25cIiA9PT0gdHlwZW9mIGRhdGEpIHtcbiAgICAgICAgICAgIGZuID0gZGF0YTtcbiAgICAgICAgICAgIGRhdGEgPSB1bmRlZmluZWQ7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKFwiZnVuY3Rpb25cIiA9PT0gdHlwZW9mIG9wdGlvbnMpIHtcbiAgICAgICAgICAgIGZuID0gb3B0aW9ucztcbiAgICAgICAgICAgIG9wdGlvbnMgPSBudWxsO1xuICAgICAgICB9XG4gICAgICAgIGlmIChcImNsb3NpbmdcIiA9PT0gdGhpcy5yZWFkeVN0YXRlIHx8IFwiY2xvc2VkXCIgPT09IHRoaXMucmVhZHlTdGF0ZSkge1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG4gICAgICAgIG9wdGlvbnMgPSBvcHRpb25zIHx8IHt9O1xuICAgICAgICBvcHRpb25zLmNvbXByZXNzID0gZmFsc2UgIT09IG9wdGlvbnMuY29tcHJlc3M7XG4gICAgICAgIGNvbnN0IHBhY2tldCA9IHtcbiAgICAgICAgICAgIHR5cGU6IHR5cGUsXG4gICAgICAgICAgICBkYXRhOiBkYXRhLFxuICAgICAgICAgICAgb3B0aW9uczogb3B0aW9uc1xuICAgICAgICB9O1xuICAgICAgICB0aGlzLmVtaXRSZXNlcnZlZChcInBhY2tldENyZWF0ZVwiLCBwYWNrZXQpO1xuICAgICAgICB0aGlzLndyaXRlQnVmZmVyLnB1c2gocGFja2V0KTtcbiAgICAgICAgaWYgKGZuKVxuICAgICAgICAgICAgdGhpcy5vbmNlKFwiZmx1c2hcIiwgZm4pO1xuICAgICAgICB0aGlzLmZsdXNoKCk7XG4gICAgfVxuICAgIC8qKlxuICAgICAqIENsb3NlcyB0aGUgY29ubmVjdGlvbi5cbiAgICAgKlxuICAgICAqIEBhcGkgcHVibGljXG4gICAgICovXG4gICAgY2xvc2UoKSB7XG4gICAgICAgIGNvbnN0IGNsb3NlID0gKCkgPT4ge1xuICAgICAgICAgICAgdGhpcy5vbkNsb3NlKFwiZm9yY2VkIGNsb3NlXCIpO1xuICAgICAgICAgICAgdGhpcy50cmFuc3BvcnQuY2xvc2UoKTtcbiAgICAgICAgfTtcbiAgICAgICAgY29uc3QgY2xlYW51cEFuZENsb3NlID0gKCkgPT4ge1xuICAgICAgICAgICAgdGhpcy5vZmYoXCJ1cGdyYWRlXCIsIGNsZWFudXBBbmRDbG9zZSk7XG4gICAgICAgICAgICB0aGlzLm9mZihcInVwZ3JhZGVFcnJvclwiLCBjbGVhbnVwQW5kQ2xvc2UpO1xuICAgICAgICAgICAgY2xvc2UoKTtcbiAgICAgICAgfTtcbiAgICAgICAgY29uc3Qgd2FpdEZvclVwZ3JhZGUgPSAoKSA9PiB7XG4gICAgICAgICAgICAvLyB3YWl0IGZvciB1cGdyYWRlIHRvIGZpbmlzaCBzaW5jZSB3ZSBjYW4ndCBzZW5kIHBhY2tldHMgd2hpbGUgcGF1c2luZyBhIHRyYW5zcG9ydFxuICAgICAgICAgICAgdGhpcy5vbmNlKFwidXBncmFkZVwiLCBjbGVhbnVwQW5kQ2xvc2UpO1xuICAgICAgICAgICAgdGhpcy5vbmNlKFwidXBncmFkZUVycm9yXCIsIGNsZWFudXBBbmRDbG9zZSk7XG4gICAgICAgIH07XG4gICAgICAgIGlmIChcIm9wZW5pbmdcIiA9PT0gdGhpcy5yZWFkeVN0YXRlIHx8IFwib3BlblwiID09PSB0aGlzLnJlYWR5U3RhdGUpIHtcbiAgICAgICAgICAgIHRoaXMucmVhZHlTdGF0ZSA9IFwiY2xvc2luZ1wiO1xuICAgICAgICAgICAgaWYgKHRoaXMud3JpdGVCdWZmZXIubGVuZ3RoKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5vbmNlKFwiZHJhaW5cIiwgKCkgPT4ge1xuICAgICAgICAgICAgICAgICAgICBpZiAodGhpcy51cGdyYWRpbmcpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHdhaXRGb3JVcGdyYWRlKCk7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBjbG9zZSgpO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBlbHNlIGlmICh0aGlzLnVwZ3JhZGluZykge1xuICAgICAgICAgICAgICAgIHdhaXRGb3JVcGdyYWRlKCk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgICBjbG9zZSgpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIHJldHVybiB0aGlzO1xuICAgIH1cbiAgICAvKipcbiAgICAgKiBDYWxsZWQgdXBvbiB0cmFuc3BvcnQgZXJyb3JcbiAgICAgKlxuICAgICAqIEBhcGkgcHJpdmF0ZVxuICAgICAqL1xuICAgIG9uRXJyb3IoZXJyKSB7XG4gICAgICAgIFNvY2tldC5wcmlvcldlYnNvY2tldFN1Y2Nlc3MgPSBmYWxzZTtcbiAgICAgICAgdGhpcy5lbWl0UmVzZXJ2ZWQoXCJlcnJvclwiLCBlcnIpO1xuICAgICAgICB0aGlzLm9uQ2xvc2UoXCJ0cmFuc3BvcnQgZXJyb3JcIiwgZXJyKTtcbiAgICB9XG4gICAgLyoqXG4gICAgICogQ2FsbGVkIHVwb24gdHJhbnNwb3J0IGNsb3NlLlxuICAgICAqXG4gICAgICogQGFwaSBwcml2YXRlXG4gICAgICovXG4gICAgb25DbG9zZShyZWFzb24sIGRlc2NyaXB0aW9uKSB7XG4gICAgICAgIGlmIChcIm9wZW5pbmdcIiA9PT0gdGhpcy5yZWFkeVN0YXRlIHx8XG4gICAgICAgICAgICBcIm9wZW5cIiA9PT0gdGhpcy5yZWFkeVN0YXRlIHx8XG4gICAgICAgICAgICBcImNsb3NpbmdcIiA9PT0gdGhpcy5yZWFkeVN0YXRlKSB7XG4gICAgICAgICAgICAvLyBjbGVhciB0aW1lcnNcbiAgICAgICAgICAgIHRoaXMuY2xlYXJUaW1lb3V0Rm4odGhpcy5waW5nVGltZW91dFRpbWVyKTtcbiAgICAgICAgICAgIC8vIHN0b3AgZXZlbnQgZnJvbSBmaXJpbmcgYWdhaW4gZm9yIHRyYW5zcG9ydFxuICAgICAgICAgICAgdGhpcy50cmFuc3BvcnQucmVtb3ZlQWxsTGlzdGVuZXJzKFwiY2xvc2VcIik7XG4gICAgICAgICAgICAvLyBlbnN1cmUgdHJhbnNwb3J0IHdvbid0IHN0YXkgb3BlblxuICAgICAgICAgICAgdGhpcy50cmFuc3BvcnQuY2xvc2UoKTtcbiAgICAgICAgICAgIC8vIGlnbm9yZSBmdXJ0aGVyIHRyYW5zcG9ydCBjb21tdW5pY2F0aW9uXG4gICAgICAgICAgICB0aGlzLnRyYW5zcG9ydC5yZW1vdmVBbGxMaXN0ZW5lcnMoKTtcbiAgICAgICAgICAgIGlmICh0eXBlb2YgcmVtb3ZlRXZlbnRMaXN0ZW5lciA9PT0gXCJmdW5jdGlvblwiKSB7XG4gICAgICAgICAgICAgICAgcmVtb3ZlRXZlbnRMaXN0ZW5lcihcIm9mZmxpbmVcIiwgdGhpcy5vZmZsaW5lRXZlbnRMaXN0ZW5lciwgZmFsc2UpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgLy8gc2V0IHJlYWR5IHN0YXRlXG4gICAgICAgICAgICB0aGlzLnJlYWR5U3RhdGUgPSBcImNsb3NlZFwiO1xuICAgICAgICAgICAgLy8gY2xlYXIgc2Vzc2lvbiBpZFxuICAgICAgICAgICAgdGhpcy5pZCA9IG51bGw7XG4gICAgICAgICAgICAvLyBlbWl0IGNsb3NlIGV2ZW50XG4gICAgICAgICAgICB0aGlzLmVtaXRSZXNlcnZlZChcImNsb3NlXCIsIHJlYXNvbiwgZGVzY3JpcHRpb24pO1xuICAgICAgICAgICAgLy8gY2xlYW4gYnVmZmVycyBhZnRlciwgc28gdXNlcnMgY2FuIHN0aWxsXG4gICAgICAgICAgICAvLyBncmFiIHRoZSBidWZmZXJzIG9uIGBjbG9zZWAgZXZlbnRcbiAgICAgICAgICAgIHRoaXMud3JpdGVCdWZmZXIgPSBbXTtcbiAgICAgICAgICAgIHRoaXMucHJldkJ1ZmZlckxlbiA9IDA7XG4gICAgICAgIH1cbiAgICB9XG4gICAgLyoqXG4gICAgICogRmlsdGVycyB1cGdyYWRlcywgcmV0dXJuaW5nIG9ubHkgdGhvc2UgbWF0Y2hpbmcgY2xpZW50IHRyYW5zcG9ydHMuXG4gICAgICpcbiAgICAgKiBAcGFyYW0ge0FycmF5fSBzZXJ2ZXIgdXBncmFkZXNcbiAgICAgKiBAYXBpIHByaXZhdGVcbiAgICAgKlxuICAgICAqL1xuICAgIGZpbHRlclVwZ3JhZGVzKHVwZ3JhZGVzKSB7XG4gICAgICAgIGNvbnN0IGZpbHRlcmVkVXBncmFkZXMgPSBbXTtcbiAgICAgICAgbGV0IGkgPSAwO1xuICAgICAgICBjb25zdCBqID0gdXBncmFkZXMubGVuZ3RoO1xuICAgICAgICBmb3IgKDsgaSA8IGo7IGkrKykge1xuICAgICAgICAgICAgaWYgKH50aGlzLnRyYW5zcG9ydHMuaW5kZXhPZih1cGdyYWRlc1tpXSkpXG4gICAgICAgICAgICAgICAgZmlsdGVyZWRVcGdyYWRlcy5wdXNoKHVwZ3JhZGVzW2ldKTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gZmlsdGVyZWRVcGdyYWRlcztcbiAgICB9XG59XG5Tb2NrZXQucHJvdG9jb2wgPSBwcm90b2NvbDtcbiIsICJpbXBvcnQgeyBTb2NrZXQgfSBmcm9tIFwiLi9zb2NrZXQuanNcIjtcbmV4cG9ydCB7IFNvY2tldCB9O1xuZXhwb3J0IGNvbnN0IHByb3RvY29sID0gU29ja2V0LnByb3RvY29sO1xuZXhwb3J0IHsgVHJhbnNwb3J0IH0gZnJvbSBcIi4vdHJhbnNwb3J0LmpzXCI7XG5leHBvcnQgeyB0cmFuc3BvcnRzIH0gZnJvbSBcIi4vdHJhbnNwb3J0cy9pbmRleC5qc1wiO1xuZXhwb3J0IHsgaW5zdGFsbFRpbWVyRnVuY3Rpb25zIH0gZnJvbSBcIi4vdXRpbC5qc1wiO1xuZXhwb3J0IHsgcGFyc2UgfSBmcm9tIFwiLi9jb250cmliL3BhcnNldXJpLmpzXCI7XG4iLCAiaW1wb3J0IHsgcGFyc2UgfSBmcm9tIFwiZW5naW5lLmlvLWNsaWVudFwiO1xuLyoqXG4gKiBVUkwgcGFyc2VyLlxuICpcbiAqIEBwYXJhbSB1cmkgLSB1cmxcbiAqIEBwYXJhbSBwYXRoIC0gdGhlIHJlcXVlc3QgcGF0aCBvZiB0aGUgY29ubmVjdGlvblxuICogQHBhcmFtIGxvYyAtIEFuIG9iamVjdCBtZWFudCB0byBtaW1pYyB3aW5kb3cubG9jYXRpb24uXG4gKiAgICAgICAgRGVmYXVsdHMgdG8gd2luZG93LmxvY2F0aW9uLlxuICogQHB1YmxpY1xuICovXG5leHBvcnQgZnVuY3Rpb24gdXJsKHVyaSwgcGF0aCA9IFwiXCIsIGxvYykge1xuICAgIGxldCBvYmogPSB1cmk7XG4gICAgLy8gZGVmYXVsdCB0byB3aW5kb3cubG9jYXRpb25cbiAgICBsb2MgPSBsb2MgfHwgKHR5cGVvZiBsb2NhdGlvbiAhPT0gXCJ1bmRlZmluZWRcIiAmJiBsb2NhdGlvbik7XG4gICAgaWYgKG51bGwgPT0gdXJpKVxuICAgICAgICB1cmkgPSBsb2MucHJvdG9jb2wgKyBcIi8vXCIgKyBsb2MuaG9zdDtcbiAgICAvLyByZWxhdGl2ZSBwYXRoIHN1cHBvcnRcbiAgICBpZiAodHlwZW9mIHVyaSA9PT0gXCJzdHJpbmdcIikge1xuICAgICAgICBpZiAoXCIvXCIgPT09IHVyaS5jaGFyQXQoMCkpIHtcbiAgICAgICAgICAgIGlmIChcIi9cIiA9PT0gdXJpLmNoYXJBdCgxKSkge1xuICAgICAgICAgICAgICAgIHVyaSA9IGxvYy5wcm90b2NvbCArIHVyaTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgICAgIHVyaSA9IGxvYy5ob3N0ICsgdXJpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIGlmICghL14oaHR0cHM/fHdzcz8pOlxcL1xcLy8udGVzdCh1cmkpKSB7XG4gICAgICAgICAgICBpZiAoXCJ1bmRlZmluZWRcIiAhPT0gdHlwZW9mIGxvYykge1xuICAgICAgICAgICAgICAgIHVyaSA9IGxvYy5wcm90b2NvbCArIFwiLy9cIiArIHVyaTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgICAgIHVyaSA9IFwiaHR0cHM6Ly9cIiArIHVyaTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICAvLyBwYXJzZVxuICAgICAgICBvYmogPSBwYXJzZSh1cmkpO1xuICAgIH1cbiAgICAvLyBtYWtlIHN1cmUgd2UgdHJlYXQgYGxvY2FsaG9zdDo4MGAgYW5kIGBsb2NhbGhvc3RgIGVxdWFsbHlcbiAgICBpZiAoIW9iai5wb3J0KSB7XG4gICAgICAgIGlmICgvXihodHRwfHdzKSQvLnRlc3Qob2JqLnByb3RvY29sKSkge1xuICAgICAgICAgICAgb2JqLnBvcnQgPSBcIjgwXCI7XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSBpZiAoL14oaHR0cHx3cylzJC8udGVzdChvYmoucHJvdG9jb2wpKSB7XG4gICAgICAgICAgICBvYmoucG9ydCA9IFwiNDQzXCI7XG4gICAgICAgIH1cbiAgICB9XG4gICAgb2JqLnBhdGggPSBvYmoucGF0aCB8fCBcIi9cIjtcbiAgICBjb25zdCBpcHY2ID0gb2JqLmhvc3QuaW5kZXhPZihcIjpcIikgIT09IC0xO1xuICAgIGNvbnN0IGhvc3QgPSBpcHY2ID8gXCJbXCIgKyBvYmouaG9zdCArIFwiXVwiIDogb2JqLmhvc3Q7XG4gICAgLy8gZGVmaW5lIHVuaXF1ZSBpZFxuICAgIG9iai5pZCA9IG9iai5wcm90b2NvbCArIFwiOi8vXCIgKyBob3N0ICsgXCI6XCIgKyBvYmoucG9ydCArIHBhdGg7XG4gICAgLy8gZGVmaW5lIGhyZWZcbiAgICBvYmouaHJlZiA9XG4gICAgICAgIG9iai5wcm90b2NvbCArXG4gICAgICAgICAgICBcIjovL1wiICtcbiAgICAgICAgICAgIGhvc3QgK1xuICAgICAgICAgICAgKGxvYyAmJiBsb2MucG9ydCA9PT0gb2JqLnBvcnQgPyBcIlwiIDogXCI6XCIgKyBvYmoucG9ydCk7XG4gICAgcmV0dXJuIG9iajtcbn1cbiIsICJpbXBvcnQgeyBFbWl0dGVyIH0gZnJvbSBcIkBzb2NrZXQuaW8vY29tcG9uZW50LWVtaXR0ZXJcIjtcbmltcG9ydCB7IGRlY29uc3RydWN0UGFja2V0LCByZWNvbnN0cnVjdFBhY2tldCB9IGZyb20gXCIuL2JpbmFyeS5qc1wiO1xuaW1wb3J0IHsgaXNCaW5hcnksIGhhc0JpbmFyeSB9IGZyb20gXCIuL2lzLWJpbmFyeS5qc1wiO1xuLyoqXG4gKiBQcm90b2NvbCB2ZXJzaW9uLlxuICpcbiAqIEBwdWJsaWNcbiAqL1xuZXhwb3J0IGNvbnN0IHByb3RvY29sID0gNTtcbmV4cG9ydCB2YXIgUGFja2V0VHlwZTtcbihmdW5jdGlvbiAoUGFja2V0VHlwZSkge1xuICAgIFBhY2tldFR5cGVbUGFja2V0VHlwZVtcIkNPTk5FQ1RcIl0gPSAwXSA9IFwiQ09OTkVDVFwiO1xuICAgIFBhY2tldFR5cGVbUGFja2V0VHlwZVtcIkRJU0NPTk5FQ1RcIl0gPSAxXSA9IFwiRElTQ09OTkVDVFwiO1xuICAgIFBhY2tldFR5cGVbUGFja2V0VHlwZVtcIkVWRU5UXCJdID0gMl0gPSBcIkVWRU5UXCI7XG4gICAgUGFja2V0VHlwZVtQYWNrZXRUeXBlW1wiQUNLXCJdID0gM10gPSBcIkFDS1wiO1xuICAgIFBhY2tldFR5cGVbUGFja2V0VHlwZVtcIkNPTk5FQ1RfRVJST1JcIl0gPSA0XSA9IFwiQ09OTkVDVF9FUlJPUlwiO1xuICAgIFBhY2tldFR5cGVbUGFja2V0VHlwZVtcIkJJTkFSWV9FVkVOVFwiXSA9IDVdID0gXCJCSU5BUllfRVZFTlRcIjtcbiAgICBQYWNrZXRUeXBlW1BhY2tldFR5cGVbXCJCSU5BUllfQUNLXCJdID0gNl0gPSBcIkJJTkFSWV9BQ0tcIjtcbn0pKFBhY2tldFR5cGUgfHwgKFBhY2tldFR5cGUgPSB7fSkpO1xuLyoqXG4gKiBBIHNvY2tldC5pbyBFbmNvZGVyIGluc3RhbmNlXG4gKi9cbmV4cG9ydCBjbGFzcyBFbmNvZGVyIHtcbiAgICAvKipcbiAgICAgKiBFbmNvZGVyIGNvbnN0cnVjdG9yXG4gICAgICpcbiAgICAgKiBAcGFyYW0ge2Z1bmN0aW9ufSByZXBsYWNlciAtIGN1c3RvbSByZXBsYWNlciB0byBwYXNzIGRvd24gdG8gSlNPTi5wYXJzZVxuICAgICAqL1xuICAgIGNvbnN0cnVjdG9yKHJlcGxhY2VyKSB7XG4gICAgICAgIHRoaXMucmVwbGFjZXIgPSByZXBsYWNlcjtcbiAgICB9XG4gICAgLyoqXG4gICAgICogRW5jb2RlIGEgcGFja2V0IGFzIGEgc2luZ2xlIHN0cmluZyBpZiBub24tYmluYXJ5LCBvciBhcyBhXG4gICAgICogYnVmZmVyIHNlcXVlbmNlLCBkZXBlbmRpbmcgb24gcGFja2V0IHR5cGUuXG4gICAgICpcbiAgICAgKiBAcGFyYW0ge09iamVjdH0gb2JqIC0gcGFja2V0IG9iamVjdFxuICAgICAqL1xuICAgIGVuY29kZShvYmopIHtcbiAgICAgICAgaWYgKG9iai50eXBlID09PSBQYWNrZXRUeXBlLkVWRU5UIHx8IG9iai50eXBlID09PSBQYWNrZXRUeXBlLkFDSykge1xuICAgICAgICAgICAgaWYgKGhhc0JpbmFyeShvYmopKSB7XG4gICAgICAgICAgICAgICAgb2JqLnR5cGUgPVxuICAgICAgICAgICAgICAgICAgICBvYmoudHlwZSA9PT0gUGFja2V0VHlwZS5FVkVOVFxuICAgICAgICAgICAgICAgICAgICAgICAgPyBQYWNrZXRUeXBlLkJJTkFSWV9FVkVOVFxuICAgICAgICAgICAgICAgICAgICAgICAgOiBQYWNrZXRUeXBlLkJJTkFSWV9BQ0s7XG4gICAgICAgICAgICAgICAgcmV0dXJuIHRoaXMuZW5jb2RlQXNCaW5hcnkob2JqKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gW3RoaXMuZW5jb2RlQXNTdHJpbmcob2JqKV07XG4gICAgfVxuICAgIC8qKlxuICAgICAqIEVuY29kZSBwYWNrZXQgYXMgc3RyaW5nLlxuICAgICAqL1xuICAgIGVuY29kZUFzU3RyaW5nKG9iaikge1xuICAgICAgICAvLyBmaXJzdCBpcyB0eXBlXG4gICAgICAgIGxldCBzdHIgPSBcIlwiICsgb2JqLnR5cGU7XG4gICAgICAgIC8vIGF0dGFjaG1lbnRzIGlmIHdlIGhhdmUgdGhlbVxuICAgICAgICBpZiAob2JqLnR5cGUgPT09IFBhY2tldFR5cGUuQklOQVJZX0VWRU5UIHx8XG4gICAgICAgICAgICBvYmoudHlwZSA9PT0gUGFja2V0VHlwZS5CSU5BUllfQUNLKSB7XG4gICAgICAgICAgICBzdHIgKz0gb2JqLmF0dGFjaG1lbnRzICsgXCItXCI7XG4gICAgICAgIH1cbiAgICAgICAgLy8gaWYgd2UgaGF2ZSBhIG5hbWVzcGFjZSBvdGhlciB0aGFuIGAvYFxuICAgICAgICAvLyB3ZSBhcHBlbmQgaXQgZm9sbG93ZWQgYnkgYSBjb21tYSBgLGBcbiAgICAgICAgaWYgKG9iai5uc3AgJiYgXCIvXCIgIT09IG9iai5uc3ApIHtcbiAgICAgICAgICAgIHN0ciArPSBvYmoubnNwICsgXCIsXCI7XG4gICAgICAgIH1cbiAgICAgICAgLy8gaW1tZWRpYXRlbHkgZm9sbG93ZWQgYnkgdGhlIGlkXG4gICAgICAgIGlmIChudWxsICE9IG9iai5pZCkge1xuICAgICAgICAgICAgc3RyICs9IG9iai5pZDtcbiAgICAgICAgfVxuICAgICAgICAvLyBqc29uIGRhdGFcbiAgICAgICAgaWYgKG51bGwgIT0gb2JqLmRhdGEpIHtcbiAgICAgICAgICAgIHN0ciArPSBKU09OLnN0cmluZ2lmeShvYmouZGF0YSwgdGhpcy5yZXBsYWNlcik7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIHN0cjtcbiAgICB9XG4gICAgLyoqXG4gICAgICogRW5jb2RlIHBhY2tldCBhcyAnYnVmZmVyIHNlcXVlbmNlJyBieSByZW1vdmluZyBibG9icywgYW5kXG4gICAgICogZGVjb25zdHJ1Y3RpbmcgcGFja2V0IGludG8gb2JqZWN0IHdpdGggcGxhY2Vob2xkZXJzIGFuZFxuICAgICAqIGEgbGlzdCBvZiBidWZmZXJzLlxuICAgICAqL1xuICAgIGVuY29kZUFzQmluYXJ5KG9iaikge1xuICAgICAgICBjb25zdCBkZWNvbnN0cnVjdGlvbiA9IGRlY29uc3RydWN0UGFja2V0KG9iaik7XG4gICAgICAgIGNvbnN0IHBhY2sgPSB0aGlzLmVuY29kZUFzU3RyaW5nKGRlY29uc3RydWN0aW9uLnBhY2tldCk7XG4gICAgICAgIGNvbnN0IGJ1ZmZlcnMgPSBkZWNvbnN0cnVjdGlvbi5idWZmZXJzO1xuICAgICAgICBidWZmZXJzLnVuc2hpZnQocGFjayk7IC8vIGFkZCBwYWNrZXQgaW5mbyB0byBiZWdpbm5pbmcgb2YgZGF0YSBsaXN0XG4gICAgICAgIHJldHVybiBidWZmZXJzOyAvLyB3cml0ZSBhbGwgdGhlIGJ1ZmZlcnNcbiAgICB9XG59XG4vKipcbiAqIEEgc29ja2V0LmlvIERlY29kZXIgaW5zdGFuY2VcbiAqXG4gKiBAcmV0dXJuIHtPYmplY3R9IGRlY29kZXJcbiAqL1xuZXhwb3J0IGNsYXNzIERlY29kZXIgZXh0ZW5kcyBFbWl0dGVyIHtcbiAgICAvKipcbiAgICAgKiBEZWNvZGVyIGNvbnN0cnVjdG9yXG4gICAgICpcbiAgICAgKiBAcGFyYW0ge2Z1bmN0aW9ufSByZXZpdmVyIC0gY3VzdG9tIHJldml2ZXIgdG8gcGFzcyBkb3duIHRvIEpTT04uc3RyaW5naWZ5XG4gICAgICovXG4gICAgY29uc3RydWN0b3IocmV2aXZlcikge1xuICAgICAgICBzdXBlcigpO1xuICAgICAgICB0aGlzLnJldml2ZXIgPSByZXZpdmVyO1xuICAgIH1cbiAgICAvKipcbiAgICAgKiBEZWNvZGVzIGFuIGVuY29kZWQgcGFja2V0IHN0cmluZyBpbnRvIHBhY2tldCBKU09OLlxuICAgICAqXG4gICAgICogQHBhcmFtIHtTdHJpbmd9IG9iaiAtIGVuY29kZWQgcGFja2V0XG4gICAgICovXG4gICAgYWRkKG9iaikge1xuICAgICAgICBsZXQgcGFja2V0O1xuICAgICAgICBpZiAodHlwZW9mIG9iaiA9PT0gXCJzdHJpbmdcIikge1xuICAgICAgICAgICAgaWYgKHRoaXMucmVjb25zdHJ1Y3Rvcikge1xuICAgICAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcihcImdvdCBwbGFpbnRleHQgZGF0YSB3aGVuIHJlY29uc3RydWN0aW5nIGEgcGFja2V0XCIpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgcGFja2V0ID0gdGhpcy5kZWNvZGVTdHJpbmcob2JqKTtcbiAgICAgICAgICAgIGlmIChwYWNrZXQudHlwZSA9PT0gUGFja2V0VHlwZS5CSU5BUllfRVZFTlQgfHxcbiAgICAgICAgICAgICAgICBwYWNrZXQudHlwZSA9PT0gUGFja2V0VHlwZS5CSU5BUllfQUNLKSB7XG4gICAgICAgICAgICAgICAgLy8gYmluYXJ5IHBhY2tldCdzIGpzb25cbiAgICAgICAgICAgICAgICB0aGlzLnJlY29uc3RydWN0b3IgPSBuZXcgQmluYXJ5UmVjb25zdHJ1Y3RvcihwYWNrZXQpO1xuICAgICAgICAgICAgICAgIC8vIG5vIGF0dGFjaG1lbnRzLCBsYWJlbGVkIGJpbmFyeSBidXQgbm8gYmluYXJ5IGRhdGEgdG8gZm9sbG93XG4gICAgICAgICAgICAgICAgaWYgKHBhY2tldC5hdHRhY2htZW50cyA9PT0gMCkge1xuICAgICAgICAgICAgICAgICAgICBzdXBlci5lbWl0UmVzZXJ2ZWQoXCJkZWNvZGVkXCIsIHBhY2tldCk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAgICAgLy8gbm9uLWJpbmFyeSBmdWxsIHBhY2tldFxuICAgICAgICAgICAgICAgIHN1cGVyLmVtaXRSZXNlcnZlZChcImRlY29kZWRcIiwgcGFja2V0KTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICBlbHNlIGlmIChpc0JpbmFyeShvYmopIHx8IG9iai5iYXNlNjQpIHtcbiAgICAgICAgICAgIC8vIHJhdyBiaW5hcnkgZGF0YVxuICAgICAgICAgICAgaWYgKCF0aGlzLnJlY29uc3RydWN0b3IpIHtcbiAgICAgICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoXCJnb3QgYmluYXJ5IGRhdGEgd2hlbiBub3QgcmVjb25zdHJ1Y3RpbmcgYSBwYWNrZXRcIik7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgICBwYWNrZXQgPSB0aGlzLnJlY29uc3RydWN0b3IudGFrZUJpbmFyeURhdGEob2JqKTtcbiAgICAgICAgICAgICAgICBpZiAocGFja2V0KSB7XG4gICAgICAgICAgICAgICAgICAgIC8vIHJlY2VpdmVkIGZpbmFsIGJ1ZmZlclxuICAgICAgICAgICAgICAgICAgICB0aGlzLnJlY29uc3RydWN0b3IgPSBudWxsO1xuICAgICAgICAgICAgICAgICAgICBzdXBlci5lbWl0UmVzZXJ2ZWQoXCJkZWNvZGVkXCIsIHBhY2tldCk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKFwiVW5rbm93biB0eXBlOiBcIiArIG9iaik7XG4gICAgICAgIH1cbiAgICB9XG4gICAgLyoqXG4gICAgICogRGVjb2RlIGEgcGFja2V0IFN0cmluZyAoSlNPTiBkYXRhKVxuICAgICAqXG4gICAgICogQHBhcmFtIHtTdHJpbmd9IHN0clxuICAgICAqIEByZXR1cm4ge09iamVjdH0gcGFja2V0XG4gICAgICovXG4gICAgZGVjb2RlU3RyaW5nKHN0cikge1xuICAgICAgICBsZXQgaSA9IDA7XG4gICAgICAgIC8vIGxvb2sgdXAgdHlwZVxuICAgICAgICBjb25zdCBwID0ge1xuICAgICAgICAgICAgdHlwZTogTnVtYmVyKHN0ci5jaGFyQXQoMCkpLFxuICAgICAgICB9O1xuICAgICAgICBpZiAoUGFja2V0VHlwZVtwLnR5cGVdID09PSB1bmRlZmluZWQpIHtcbiAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcihcInVua25vd24gcGFja2V0IHR5cGUgXCIgKyBwLnR5cGUpO1xuICAgICAgICB9XG4gICAgICAgIC8vIGxvb2sgdXAgYXR0YWNobWVudHMgaWYgdHlwZSBiaW5hcnlcbiAgICAgICAgaWYgKHAudHlwZSA9PT0gUGFja2V0VHlwZS5CSU5BUllfRVZFTlQgfHxcbiAgICAgICAgICAgIHAudHlwZSA9PT0gUGFja2V0VHlwZS5CSU5BUllfQUNLKSB7XG4gICAgICAgICAgICBjb25zdCBzdGFydCA9IGkgKyAxO1xuICAgICAgICAgICAgd2hpbGUgKHN0ci5jaGFyQXQoKytpKSAhPT0gXCItXCIgJiYgaSAhPSBzdHIubGVuZ3RoKSB7IH1cbiAgICAgICAgICAgIGNvbnN0IGJ1ZiA9IHN0ci5zdWJzdHJpbmcoc3RhcnQsIGkpO1xuICAgICAgICAgICAgaWYgKGJ1ZiAhPSBOdW1iZXIoYnVmKSB8fCBzdHIuY2hhckF0KGkpICE9PSBcIi1cIikge1xuICAgICAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcihcIklsbGVnYWwgYXR0YWNobWVudHNcIik7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBwLmF0dGFjaG1lbnRzID0gTnVtYmVyKGJ1Zik7XG4gICAgICAgIH1cbiAgICAgICAgLy8gbG9vayB1cCBuYW1lc3BhY2UgKGlmIGFueSlcbiAgICAgICAgaWYgKFwiL1wiID09PSBzdHIuY2hhckF0KGkgKyAxKSkge1xuICAgICAgICAgICAgY29uc3Qgc3RhcnQgPSBpICsgMTtcbiAgICAgICAgICAgIHdoaWxlICgrK2kpIHtcbiAgICAgICAgICAgICAgICBjb25zdCBjID0gc3RyLmNoYXJBdChpKTtcbiAgICAgICAgICAgICAgICBpZiAoXCIsXCIgPT09IGMpXG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgIGlmIChpID09PSBzdHIubGVuZ3RoKVxuICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHAubnNwID0gc3RyLnN1YnN0cmluZyhzdGFydCwgaSk7XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICBwLm5zcCA9IFwiL1wiO1xuICAgICAgICB9XG4gICAgICAgIC8vIGxvb2sgdXAgaWRcbiAgICAgICAgY29uc3QgbmV4dCA9IHN0ci5jaGFyQXQoaSArIDEpO1xuICAgICAgICBpZiAoXCJcIiAhPT0gbmV4dCAmJiBOdW1iZXIobmV4dCkgPT0gbmV4dCkge1xuICAgICAgICAgICAgY29uc3Qgc3RhcnQgPSBpICsgMTtcbiAgICAgICAgICAgIHdoaWxlICgrK2kpIHtcbiAgICAgICAgICAgICAgICBjb25zdCBjID0gc3RyLmNoYXJBdChpKTtcbiAgICAgICAgICAgICAgICBpZiAobnVsbCA9PSBjIHx8IE51bWJlcihjKSAhPSBjKSB7XG4gICAgICAgICAgICAgICAgICAgIC0taTtcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGlmIChpID09PSBzdHIubGVuZ3RoKVxuICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHAuaWQgPSBOdW1iZXIoc3RyLnN1YnN0cmluZyhzdGFydCwgaSArIDEpKTtcbiAgICAgICAgfVxuICAgICAgICAvLyBsb29rIHVwIGpzb24gZGF0YVxuICAgICAgICBpZiAoc3RyLmNoYXJBdCgrK2kpKSB7XG4gICAgICAgICAgICBjb25zdCBwYXlsb2FkID0gdGhpcy50cnlQYXJzZShzdHIuc3Vic3RyKGkpKTtcbiAgICAgICAgICAgIGlmIChEZWNvZGVyLmlzUGF5bG9hZFZhbGlkKHAudHlwZSwgcGF5bG9hZCkpIHtcbiAgICAgICAgICAgICAgICBwLmRhdGEgPSBwYXlsb2FkO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKFwiaW52YWxpZCBwYXlsb2FkXCIpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIHJldHVybiBwO1xuICAgIH1cbiAgICB0cnlQYXJzZShzdHIpIHtcbiAgICAgICAgdHJ5IHtcbiAgICAgICAgICAgIHJldHVybiBKU09OLnBhcnNlKHN0ciwgdGhpcy5yZXZpdmVyKTtcbiAgICAgICAgfVxuICAgICAgICBjYXRjaCAoZSkge1xuICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgICB9XG4gICAgfVxuICAgIHN0YXRpYyBpc1BheWxvYWRWYWxpZCh0eXBlLCBwYXlsb2FkKSB7XG4gICAgICAgIHN3aXRjaCAodHlwZSkge1xuICAgICAgICAgICAgY2FzZSBQYWNrZXRUeXBlLkNPTk5FQ1Q6XG4gICAgICAgICAgICAgICAgcmV0dXJuIHR5cGVvZiBwYXlsb2FkID09PSBcIm9iamVjdFwiO1xuICAgICAgICAgICAgY2FzZSBQYWNrZXRUeXBlLkRJU0NPTk5FQ1Q6XG4gICAgICAgICAgICAgICAgcmV0dXJuIHBheWxvYWQgPT09IHVuZGVmaW5lZDtcbiAgICAgICAgICAgIGNhc2UgUGFja2V0VHlwZS5DT05ORUNUX0VSUk9SOlxuICAgICAgICAgICAgICAgIHJldHVybiB0eXBlb2YgcGF5bG9hZCA9PT0gXCJzdHJpbmdcIiB8fCB0eXBlb2YgcGF5bG9hZCA9PT0gXCJvYmplY3RcIjtcbiAgICAgICAgICAgIGNhc2UgUGFja2V0VHlwZS5FVkVOVDpcbiAgICAgICAgICAgIGNhc2UgUGFja2V0VHlwZS5CSU5BUllfRVZFTlQ6XG4gICAgICAgICAgICAgICAgcmV0dXJuIEFycmF5LmlzQXJyYXkocGF5bG9hZCkgJiYgcGF5bG9hZC5sZW5ndGggPiAwO1xuICAgICAgICAgICAgY2FzZSBQYWNrZXRUeXBlLkFDSzpcbiAgICAgICAgICAgIGNhc2UgUGFja2V0VHlwZS5CSU5BUllfQUNLOlxuICAgICAgICAgICAgICAgIHJldHVybiBBcnJheS5pc0FycmF5KHBheWxvYWQpO1xuICAgICAgICB9XG4gICAgfVxuICAgIC8qKlxuICAgICAqIERlYWxsb2NhdGVzIGEgcGFyc2VyJ3MgcmVzb3VyY2VzXG4gICAgICovXG4gICAgZGVzdHJveSgpIHtcbiAgICAgICAgaWYgKHRoaXMucmVjb25zdHJ1Y3Rvcikge1xuICAgICAgICAgICAgdGhpcy5yZWNvbnN0cnVjdG9yLmZpbmlzaGVkUmVjb25zdHJ1Y3Rpb24oKTtcbiAgICAgICAgfVxuICAgIH1cbn1cbi8qKlxuICogQSBtYW5hZ2VyIG9mIGEgYmluYXJ5IGV2ZW50J3MgJ2J1ZmZlciBzZXF1ZW5jZScuIFNob3VsZFxuICogYmUgY29uc3RydWN0ZWQgd2hlbmV2ZXIgYSBwYWNrZXQgb2YgdHlwZSBCSU5BUllfRVZFTlQgaXNcbiAqIGRlY29kZWQuXG4gKlxuICogQHBhcmFtIHtPYmplY3R9IHBhY2tldFxuICogQHJldHVybiB7QmluYXJ5UmVjb25zdHJ1Y3Rvcn0gaW5pdGlhbGl6ZWQgcmVjb25zdHJ1Y3RvclxuICovXG5jbGFzcyBCaW5hcnlSZWNvbnN0cnVjdG9yIHtcbiAgICBjb25zdHJ1Y3RvcihwYWNrZXQpIHtcbiAgICAgICAgdGhpcy5wYWNrZXQgPSBwYWNrZXQ7XG4gICAgICAgIHRoaXMuYnVmZmVycyA9IFtdO1xuICAgICAgICB0aGlzLnJlY29uUGFjayA9IHBhY2tldDtcbiAgICB9XG4gICAgLyoqXG4gICAgICogTWV0aG9kIHRvIGJlIGNhbGxlZCB3aGVuIGJpbmFyeSBkYXRhIHJlY2VpdmVkIGZyb20gY29ubmVjdGlvblxuICAgICAqIGFmdGVyIGEgQklOQVJZX0VWRU5UIHBhY2tldC5cbiAgICAgKlxuICAgICAqIEBwYXJhbSB7QnVmZmVyIHwgQXJyYXlCdWZmZXJ9IGJpbkRhdGEgLSB0aGUgcmF3IGJpbmFyeSBkYXRhIHJlY2VpdmVkXG4gICAgICogQHJldHVybiB7bnVsbCB8IE9iamVjdH0gcmV0dXJucyBudWxsIGlmIG1vcmUgYmluYXJ5IGRhdGEgaXMgZXhwZWN0ZWQgb3JcbiAgICAgKiAgIGEgcmVjb25zdHJ1Y3RlZCBwYWNrZXQgb2JqZWN0IGlmIGFsbCBidWZmZXJzIGhhdmUgYmVlbiByZWNlaXZlZC5cbiAgICAgKi9cbiAgICB0YWtlQmluYXJ5RGF0YShiaW5EYXRhKSB7XG4gICAgICAgIHRoaXMuYnVmZmVycy5wdXNoKGJpbkRhdGEpO1xuICAgICAgICBpZiAodGhpcy5idWZmZXJzLmxlbmd0aCA9PT0gdGhpcy5yZWNvblBhY2suYXR0YWNobWVudHMpIHtcbiAgICAgICAgICAgIC8vIGRvbmUgd2l0aCBidWZmZXIgbGlzdFxuICAgICAgICAgICAgY29uc3QgcGFja2V0ID0gcmVjb25zdHJ1Y3RQYWNrZXQodGhpcy5yZWNvblBhY2ssIHRoaXMuYnVmZmVycyk7XG4gICAgICAgICAgICB0aGlzLmZpbmlzaGVkUmVjb25zdHJ1Y3Rpb24oKTtcbiAgICAgICAgICAgIHJldHVybiBwYWNrZXQ7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIG51bGw7XG4gICAgfVxuICAgIC8qKlxuICAgICAqIENsZWFucyB1cCBiaW5hcnkgcGFja2V0IHJlY29uc3RydWN0aW9uIHZhcmlhYmxlcy5cbiAgICAgKi9cbiAgICBmaW5pc2hlZFJlY29uc3RydWN0aW9uKCkge1xuICAgICAgICB0aGlzLnJlY29uUGFjayA9IG51bGw7XG4gICAgICAgIHRoaXMuYnVmZmVycyA9IFtdO1xuICAgIH1cbn1cbiIsICJjb25zdCB3aXRoTmF0aXZlQXJyYXlCdWZmZXIgPSB0eXBlb2YgQXJyYXlCdWZmZXIgPT09IFwiZnVuY3Rpb25cIjtcbmNvbnN0IGlzVmlldyA9IChvYmopID0+IHtcbiAgICByZXR1cm4gdHlwZW9mIEFycmF5QnVmZmVyLmlzVmlldyA9PT0gXCJmdW5jdGlvblwiXG4gICAgICAgID8gQXJyYXlCdWZmZXIuaXNWaWV3KG9iailcbiAgICAgICAgOiBvYmouYnVmZmVyIGluc3RhbmNlb2YgQXJyYXlCdWZmZXI7XG59O1xuY29uc3QgdG9TdHJpbmcgPSBPYmplY3QucHJvdG90eXBlLnRvU3RyaW5nO1xuY29uc3Qgd2l0aE5hdGl2ZUJsb2IgPSB0eXBlb2YgQmxvYiA9PT0gXCJmdW5jdGlvblwiIHx8XG4gICAgKHR5cGVvZiBCbG9iICE9PSBcInVuZGVmaW5lZFwiICYmXG4gICAgICAgIHRvU3RyaW5nLmNhbGwoQmxvYikgPT09IFwiW29iamVjdCBCbG9iQ29uc3RydWN0b3JdXCIpO1xuY29uc3Qgd2l0aE5hdGl2ZUZpbGUgPSB0eXBlb2YgRmlsZSA9PT0gXCJmdW5jdGlvblwiIHx8XG4gICAgKHR5cGVvZiBGaWxlICE9PSBcInVuZGVmaW5lZFwiICYmXG4gICAgICAgIHRvU3RyaW5nLmNhbGwoRmlsZSkgPT09IFwiW29iamVjdCBGaWxlQ29uc3RydWN0b3JdXCIpO1xuLyoqXG4gKiBSZXR1cm5zIHRydWUgaWYgb2JqIGlzIGEgQnVmZmVyLCBhbiBBcnJheUJ1ZmZlciwgYSBCbG9iIG9yIGEgRmlsZS5cbiAqXG4gKiBAcHJpdmF0ZVxuICovXG5leHBvcnQgZnVuY3Rpb24gaXNCaW5hcnkob2JqKSB7XG4gICAgcmV0dXJuICgod2l0aE5hdGl2ZUFycmF5QnVmZmVyICYmIChvYmogaW5zdGFuY2VvZiBBcnJheUJ1ZmZlciB8fCBpc1ZpZXcob2JqKSkpIHx8XG4gICAgICAgICh3aXRoTmF0aXZlQmxvYiAmJiBvYmogaW5zdGFuY2VvZiBCbG9iKSB8fFxuICAgICAgICAod2l0aE5hdGl2ZUZpbGUgJiYgb2JqIGluc3RhbmNlb2YgRmlsZSkpO1xufVxuZXhwb3J0IGZ1bmN0aW9uIGhhc0JpbmFyeShvYmosIHRvSlNPTikge1xuICAgIGlmICghb2JqIHx8IHR5cGVvZiBvYmogIT09IFwib2JqZWN0XCIpIHtcbiAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgIH1cbiAgICBpZiAoQXJyYXkuaXNBcnJheShvYmopKSB7XG4gICAgICAgIGZvciAobGV0IGkgPSAwLCBsID0gb2JqLmxlbmd0aDsgaSA8IGw7IGkrKykge1xuICAgICAgICAgICAgaWYgKGhhc0JpbmFyeShvYmpbaV0pKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgIH1cbiAgICBpZiAoaXNCaW5hcnkob2JqKSkge1xuICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICB9XG4gICAgaWYgKG9iai50b0pTT04gJiZcbiAgICAgICAgdHlwZW9mIG9iai50b0pTT04gPT09IFwiZnVuY3Rpb25cIiAmJlxuICAgICAgICBhcmd1bWVudHMubGVuZ3RoID09PSAxKSB7XG4gICAgICAgIHJldHVybiBoYXNCaW5hcnkob2JqLnRvSlNPTigpLCB0cnVlKTtcbiAgICB9XG4gICAgZm9yIChjb25zdCBrZXkgaW4gb2JqKSB7XG4gICAgICAgIGlmIChPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwob2JqLCBrZXkpICYmIGhhc0JpbmFyeShvYmpba2V5XSkpIHtcbiAgICAgICAgICAgIHJldHVybiB0cnVlO1xuICAgICAgICB9XG4gICAgfVxuICAgIHJldHVybiBmYWxzZTtcbn1cbiIsICJpbXBvcnQgeyBpc0JpbmFyeSB9IGZyb20gXCIuL2lzLWJpbmFyeS5qc1wiO1xuLyoqXG4gKiBSZXBsYWNlcyBldmVyeSBCdWZmZXIgfCBBcnJheUJ1ZmZlciB8IEJsb2IgfCBGaWxlIGluIHBhY2tldCB3aXRoIGEgbnVtYmVyZWQgcGxhY2Vob2xkZXIuXG4gKlxuICogQHBhcmFtIHtPYmplY3R9IHBhY2tldCAtIHNvY2tldC5pbyBldmVudCBwYWNrZXRcbiAqIEByZXR1cm4ge09iamVjdH0gd2l0aCBkZWNvbnN0cnVjdGVkIHBhY2tldCBhbmQgbGlzdCBvZiBidWZmZXJzXG4gKiBAcHVibGljXG4gKi9cbmV4cG9ydCBmdW5jdGlvbiBkZWNvbnN0cnVjdFBhY2tldChwYWNrZXQpIHtcbiAgICBjb25zdCBidWZmZXJzID0gW107XG4gICAgY29uc3QgcGFja2V0RGF0YSA9IHBhY2tldC5kYXRhO1xuICAgIGNvbnN0IHBhY2sgPSBwYWNrZXQ7XG4gICAgcGFjay5kYXRhID0gX2RlY29uc3RydWN0UGFja2V0KHBhY2tldERhdGEsIGJ1ZmZlcnMpO1xuICAgIHBhY2suYXR0YWNobWVudHMgPSBidWZmZXJzLmxlbmd0aDsgLy8gbnVtYmVyIG9mIGJpbmFyeSAnYXR0YWNobWVudHMnXG4gICAgcmV0dXJuIHsgcGFja2V0OiBwYWNrLCBidWZmZXJzOiBidWZmZXJzIH07XG59XG5mdW5jdGlvbiBfZGVjb25zdHJ1Y3RQYWNrZXQoZGF0YSwgYnVmZmVycykge1xuICAgIGlmICghZGF0YSlcbiAgICAgICAgcmV0dXJuIGRhdGE7XG4gICAgaWYgKGlzQmluYXJ5KGRhdGEpKSB7XG4gICAgICAgIGNvbnN0IHBsYWNlaG9sZGVyID0geyBfcGxhY2Vob2xkZXI6IHRydWUsIG51bTogYnVmZmVycy5sZW5ndGggfTtcbiAgICAgICAgYnVmZmVycy5wdXNoKGRhdGEpO1xuICAgICAgICByZXR1cm4gcGxhY2Vob2xkZXI7XG4gICAgfVxuICAgIGVsc2UgaWYgKEFycmF5LmlzQXJyYXkoZGF0YSkpIHtcbiAgICAgICAgY29uc3QgbmV3RGF0YSA9IG5ldyBBcnJheShkYXRhLmxlbmd0aCk7XG4gICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgZGF0YS5sZW5ndGg7IGkrKykge1xuICAgICAgICAgICAgbmV3RGF0YVtpXSA9IF9kZWNvbnN0cnVjdFBhY2tldChkYXRhW2ldLCBidWZmZXJzKTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gbmV3RGF0YTtcbiAgICB9XG4gICAgZWxzZSBpZiAodHlwZW9mIGRhdGEgPT09IFwib2JqZWN0XCIgJiYgIShkYXRhIGluc3RhbmNlb2YgRGF0ZSkpIHtcbiAgICAgICAgY29uc3QgbmV3RGF0YSA9IHt9O1xuICAgICAgICBmb3IgKGNvbnN0IGtleSBpbiBkYXRhKSB7XG4gICAgICAgICAgICBpZiAoT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKGRhdGEsIGtleSkpIHtcbiAgICAgICAgICAgICAgICBuZXdEYXRhW2tleV0gPSBfZGVjb25zdHJ1Y3RQYWNrZXQoZGF0YVtrZXldLCBidWZmZXJzKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gbmV3RGF0YTtcbiAgICB9XG4gICAgcmV0dXJuIGRhdGE7XG59XG4vKipcbiAqIFJlY29uc3RydWN0cyBhIGJpbmFyeSBwYWNrZXQgZnJvbSBpdHMgcGxhY2Vob2xkZXIgcGFja2V0IGFuZCBidWZmZXJzXG4gKlxuICogQHBhcmFtIHtPYmplY3R9IHBhY2tldCAtIGV2ZW50IHBhY2tldCB3aXRoIHBsYWNlaG9sZGVyc1xuICogQHBhcmFtIHtBcnJheX0gYnVmZmVycyAtIGJpbmFyeSBidWZmZXJzIHRvIHB1dCBpbiBwbGFjZWhvbGRlciBwb3NpdGlvbnNcbiAqIEByZXR1cm4ge09iamVjdH0gcmVjb25zdHJ1Y3RlZCBwYWNrZXRcbiAqIEBwdWJsaWNcbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIHJlY29uc3RydWN0UGFja2V0KHBhY2tldCwgYnVmZmVycykge1xuICAgIHBhY2tldC5kYXRhID0gX3JlY29uc3RydWN0UGFja2V0KHBhY2tldC5kYXRhLCBidWZmZXJzKTtcbiAgICBwYWNrZXQuYXR0YWNobWVudHMgPSB1bmRlZmluZWQ7IC8vIG5vIGxvbmdlciB1c2VmdWxcbiAgICByZXR1cm4gcGFja2V0O1xufVxuZnVuY3Rpb24gX3JlY29uc3RydWN0UGFja2V0KGRhdGEsIGJ1ZmZlcnMpIHtcbiAgICBpZiAoIWRhdGEpXG4gICAgICAgIHJldHVybiBkYXRhO1xuICAgIGlmIChkYXRhICYmIGRhdGEuX3BsYWNlaG9sZGVyID09PSB0cnVlKSB7XG4gICAgICAgIGNvbnN0IGlzSW5kZXhWYWxpZCA9IHR5cGVvZiBkYXRhLm51bSA9PT0gXCJudW1iZXJcIiAmJlxuICAgICAgICAgICAgZGF0YS5udW0gPj0gMCAmJlxuICAgICAgICAgICAgZGF0YS5udW0gPCBidWZmZXJzLmxlbmd0aDtcbiAgICAgICAgaWYgKGlzSW5kZXhWYWxpZCkge1xuICAgICAgICAgICAgcmV0dXJuIGJ1ZmZlcnNbZGF0YS5udW1dOyAvLyBhcHByb3ByaWF0ZSBidWZmZXIgKHNob3VsZCBiZSBuYXR1cmFsIG9yZGVyIGFueXdheSlcbiAgICAgICAgfVxuICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcihcImlsbGVnYWwgYXR0YWNobWVudHNcIik7XG4gICAgICAgIH1cbiAgICB9XG4gICAgZWxzZSBpZiAoQXJyYXkuaXNBcnJheShkYXRhKSkge1xuICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IGRhdGEubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgICAgIGRhdGFbaV0gPSBfcmVjb25zdHJ1Y3RQYWNrZXQoZGF0YVtpXSwgYnVmZmVycyk7XG4gICAgICAgIH1cbiAgICB9XG4gICAgZWxzZSBpZiAodHlwZW9mIGRhdGEgPT09IFwib2JqZWN0XCIpIHtcbiAgICAgICAgZm9yIChjb25zdCBrZXkgaW4gZGF0YSkge1xuICAgICAgICAgICAgaWYgKE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChkYXRhLCBrZXkpKSB7XG4gICAgICAgICAgICAgICAgZGF0YVtrZXldID0gX3JlY29uc3RydWN0UGFja2V0KGRhdGFba2V5XSwgYnVmZmVycyk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9XG4gICAgcmV0dXJuIGRhdGE7XG59XG4iLCAiZXhwb3J0IGZ1bmN0aW9uIG9uKG9iaiwgZXYsIGZuKSB7XG4gICAgb2JqLm9uKGV2LCBmbik7XG4gICAgcmV0dXJuIGZ1bmN0aW9uIHN1YkRlc3Ryb3koKSB7XG4gICAgICAgIG9iai5vZmYoZXYsIGZuKTtcbiAgICB9O1xufVxuIiwgImltcG9ydCB7IFBhY2tldFR5cGUgfSBmcm9tIFwic29ja2V0LmlvLXBhcnNlclwiO1xuaW1wb3J0IHsgb24gfSBmcm9tIFwiLi9vbi5qc1wiO1xuaW1wb3J0IHsgRW1pdHRlciwgfSBmcm9tIFwiQHNvY2tldC5pby9jb21wb25lbnQtZW1pdHRlclwiO1xuLyoqXG4gKiBJbnRlcm5hbCBldmVudHMuXG4gKiBUaGVzZSBldmVudHMgY2FuJ3QgYmUgZW1pdHRlZCBieSB0aGUgdXNlci5cbiAqL1xuY29uc3QgUkVTRVJWRURfRVZFTlRTID0gT2JqZWN0LmZyZWV6ZSh7XG4gICAgY29ubmVjdDogMSxcbiAgICBjb25uZWN0X2Vycm9yOiAxLFxuICAgIGRpc2Nvbm5lY3Q6IDEsXG4gICAgZGlzY29ubmVjdGluZzogMSxcbiAgICAvLyBFdmVudEVtaXR0ZXIgcmVzZXJ2ZWQgZXZlbnRzOiBodHRwczovL25vZGVqcy5vcmcvYXBpL2V2ZW50cy5odG1sI2V2ZW50c19ldmVudF9uZXdsaXN0ZW5lclxuICAgIG5ld0xpc3RlbmVyOiAxLFxuICAgIHJlbW92ZUxpc3RlbmVyOiAxLFxufSk7XG5leHBvcnQgY2xhc3MgU29ja2V0IGV4dGVuZHMgRW1pdHRlciB7XG4gICAgLyoqXG4gICAgICogYFNvY2tldGAgY29uc3RydWN0b3IuXG4gICAgICpcbiAgICAgKiBAcHVibGljXG4gICAgICovXG4gICAgY29uc3RydWN0b3IoaW8sIG5zcCwgb3B0cykge1xuICAgICAgICBzdXBlcigpO1xuICAgICAgICB0aGlzLmNvbm5lY3RlZCA9IGZhbHNlO1xuICAgICAgICB0aGlzLnJlY2VpdmVCdWZmZXIgPSBbXTtcbiAgICAgICAgdGhpcy5zZW5kQnVmZmVyID0gW107XG4gICAgICAgIHRoaXMuaWRzID0gMDtcbiAgICAgICAgdGhpcy5hY2tzID0ge307XG4gICAgICAgIHRoaXMuZmxhZ3MgPSB7fTtcbiAgICAgICAgdGhpcy5pbyA9IGlvO1xuICAgICAgICB0aGlzLm5zcCA9IG5zcDtcbiAgICAgICAgaWYgKG9wdHMgJiYgb3B0cy5hdXRoKSB7XG4gICAgICAgICAgICB0aGlzLmF1dGggPSBvcHRzLmF1dGg7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKHRoaXMuaW8uX2F1dG9Db25uZWN0KVxuICAgICAgICAgICAgdGhpcy5vcGVuKCk7XG4gICAgfVxuICAgIC8qKlxuICAgICAqIFdoZXRoZXIgdGhlIHNvY2tldCBpcyBjdXJyZW50bHkgZGlzY29ubmVjdGVkXG4gICAgICovXG4gICAgZ2V0IGRpc2Nvbm5lY3RlZCgpIHtcbiAgICAgICAgcmV0dXJuICF0aGlzLmNvbm5lY3RlZDtcbiAgICB9XG4gICAgLyoqXG4gICAgICogU3Vic2NyaWJlIHRvIG9wZW4sIGNsb3NlIGFuZCBwYWNrZXQgZXZlbnRzXG4gICAgICpcbiAgICAgKiBAcHJpdmF0ZVxuICAgICAqL1xuICAgIHN1YkV2ZW50cygpIHtcbiAgICAgICAgaWYgKHRoaXMuc3VicylcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgY29uc3QgaW8gPSB0aGlzLmlvO1xuICAgICAgICB0aGlzLnN1YnMgPSBbXG4gICAgICAgICAgICBvbihpbywgXCJvcGVuXCIsIHRoaXMub25vcGVuLmJpbmQodGhpcykpLFxuICAgICAgICAgICAgb24oaW8sIFwicGFja2V0XCIsIHRoaXMub25wYWNrZXQuYmluZCh0aGlzKSksXG4gICAgICAgICAgICBvbihpbywgXCJlcnJvclwiLCB0aGlzLm9uZXJyb3IuYmluZCh0aGlzKSksXG4gICAgICAgICAgICBvbihpbywgXCJjbG9zZVwiLCB0aGlzLm9uY2xvc2UuYmluZCh0aGlzKSksXG4gICAgICAgIF07XG4gICAgfVxuICAgIC8qKlxuICAgICAqIFdoZXRoZXIgdGhlIFNvY2tldCB3aWxsIHRyeSB0byByZWNvbm5lY3Qgd2hlbiBpdHMgTWFuYWdlciBjb25uZWN0cyBvciByZWNvbm5lY3RzXG4gICAgICovXG4gICAgZ2V0IGFjdGl2ZSgpIHtcbiAgICAgICAgcmV0dXJuICEhdGhpcy5zdWJzO1xuICAgIH1cbiAgICAvKipcbiAgICAgKiBcIk9wZW5zXCIgdGhlIHNvY2tldC5cbiAgICAgKlxuICAgICAqIEBwdWJsaWNcbiAgICAgKi9cbiAgICBjb25uZWN0KCkge1xuICAgICAgICBpZiAodGhpcy5jb25uZWN0ZWQpXG4gICAgICAgICAgICByZXR1cm4gdGhpcztcbiAgICAgICAgdGhpcy5zdWJFdmVudHMoKTtcbiAgICAgICAgaWYgKCF0aGlzLmlvW1wiX3JlY29ubmVjdGluZ1wiXSlcbiAgICAgICAgICAgIHRoaXMuaW8ub3BlbigpOyAvLyBlbnN1cmUgb3BlblxuICAgICAgICBpZiAoXCJvcGVuXCIgPT09IHRoaXMuaW8uX3JlYWR5U3RhdGUpXG4gICAgICAgICAgICB0aGlzLm9ub3BlbigpO1xuICAgICAgICByZXR1cm4gdGhpcztcbiAgICB9XG4gICAgLyoqXG4gICAgICogQWxpYXMgZm9yIGNvbm5lY3QoKVxuICAgICAqL1xuICAgIG9wZW4oKSB7XG4gICAgICAgIHJldHVybiB0aGlzLmNvbm5lY3QoKTtcbiAgICB9XG4gICAgLyoqXG4gICAgICogU2VuZHMgYSBgbWVzc2FnZWAgZXZlbnQuXG4gICAgICpcbiAgICAgKiBAcmV0dXJuIHNlbGZcbiAgICAgKiBAcHVibGljXG4gICAgICovXG4gICAgc2VuZCguLi5hcmdzKSB7XG4gICAgICAgIGFyZ3MudW5zaGlmdChcIm1lc3NhZ2VcIik7XG4gICAgICAgIHRoaXMuZW1pdC5hcHBseSh0aGlzLCBhcmdzKTtcbiAgICAgICAgcmV0dXJuIHRoaXM7XG4gICAgfVxuICAgIC8qKlxuICAgICAqIE92ZXJyaWRlIGBlbWl0YC5cbiAgICAgKiBJZiB0aGUgZXZlbnQgaXMgaW4gYGV2ZW50c2AsIGl0J3MgZW1pdHRlZCBub3JtYWxseS5cbiAgICAgKlxuICAgICAqIEByZXR1cm4gc2VsZlxuICAgICAqIEBwdWJsaWNcbiAgICAgKi9cbiAgICBlbWl0KGV2LCAuLi5hcmdzKSB7XG4gICAgICAgIGlmIChSRVNFUlZFRF9FVkVOVFMuaGFzT3duUHJvcGVydHkoZXYpKSB7XG4gICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoJ1wiJyArIGV2LnRvU3RyaW5nKCkgKyAnXCIgaXMgYSByZXNlcnZlZCBldmVudCBuYW1lJyk7XG4gICAgICAgIH1cbiAgICAgICAgYXJncy51bnNoaWZ0KGV2KTtcbiAgICAgICAgY29uc3QgcGFja2V0ID0ge1xuICAgICAgICAgICAgdHlwZTogUGFja2V0VHlwZS5FVkVOVCxcbiAgICAgICAgICAgIGRhdGE6IGFyZ3MsXG4gICAgICAgIH07XG4gICAgICAgIHBhY2tldC5vcHRpb25zID0ge307XG4gICAgICAgIHBhY2tldC5vcHRpb25zLmNvbXByZXNzID0gdGhpcy5mbGFncy5jb21wcmVzcyAhPT0gZmFsc2U7XG4gICAgICAgIC8vIGV2ZW50IGFjayBjYWxsYmFja1xuICAgICAgICBpZiAoXCJmdW5jdGlvblwiID09PSB0eXBlb2YgYXJnc1thcmdzLmxlbmd0aCAtIDFdKSB7XG4gICAgICAgICAgICBjb25zdCBpZCA9IHRoaXMuaWRzKys7XG4gICAgICAgICAgICBjb25zdCBhY2sgPSBhcmdzLnBvcCgpO1xuICAgICAgICAgICAgdGhpcy5fcmVnaXN0ZXJBY2tDYWxsYmFjayhpZCwgYWNrKTtcbiAgICAgICAgICAgIHBhY2tldC5pZCA9IGlkO1xuICAgICAgICB9XG4gICAgICAgIGNvbnN0IGlzVHJhbnNwb3J0V3JpdGFibGUgPSB0aGlzLmlvLmVuZ2luZSAmJlxuICAgICAgICAgICAgdGhpcy5pby5lbmdpbmUudHJhbnNwb3J0ICYmXG4gICAgICAgICAgICB0aGlzLmlvLmVuZ2luZS50cmFuc3BvcnQud3JpdGFibGU7XG4gICAgICAgIGNvbnN0IGRpc2NhcmRQYWNrZXQgPSB0aGlzLmZsYWdzLnZvbGF0aWxlICYmICghaXNUcmFuc3BvcnRXcml0YWJsZSB8fCAhdGhpcy5jb25uZWN0ZWQpO1xuICAgICAgICBpZiAoZGlzY2FyZFBhY2tldCkge1xuICAgICAgICB9XG4gICAgICAgIGVsc2UgaWYgKHRoaXMuY29ubmVjdGVkKSB7XG4gICAgICAgICAgICB0aGlzLm5vdGlmeU91dGdvaW5nTGlzdGVuZXJzKHBhY2tldCk7XG4gICAgICAgICAgICB0aGlzLnBhY2tldChwYWNrZXQpO1xuICAgICAgICB9XG4gICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgdGhpcy5zZW5kQnVmZmVyLnB1c2gocGFja2V0KTtcbiAgICAgICAgfVxuICAgICAgICB0aGlzLmZsYWdzID0ge307XG4gICAgICAgIHJldHVybiB0aGlzO1xuICAgIH1cbiAgICAvKipcbiAgICAgKiBAcHJpdmF0ZVxuICAgICAqL1xuICAgIF9yZWdpc3RlckFja0NhbGxiYWNrKGlkLCBhY2spIHtcbiAgICAgICAgY29uc3QgdGltZW91dCA9IHRoaXMuZmxhZ3MudGltZW91dDtcbiAgICAgICAgaWYgKHRpbWVvdXQgPT09IHVuZGVmaW5lZCkge1xuICAgICAgICAgICAgdGhpcy5hY2tzW2lkXSA9IGFjaztcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuICAgICAgICAvLyBAdHMtaWdub3JlXG4gICAgICAgIGNvbnN0IHRpbWVyID0gdGhpcy5pby5zZXRUaW1lb3V0Rm4oKCkgPT4ge1xuICAgICAgICAgICAgZGVsZXRlIHRoaXMuYWNrc1tpZF07XG4gICAgICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IHRoaXMuc2VuZEJ1ZmZlci5sZW5ndGg7IGkrKykge1xuICAgICAgICAgICAgICAgIGlmICh0aGlzLnNlbmRCdWZmZXJbaV0uaWQgPT09IGlkKSB7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuc2VuZEJ1ZmZlci5zcGxpY2UoaSwgMSk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICAgICAgYWNrLmNhbGwodGhpcywgbmV3IEVycm9yKFwib3BlcmF0aW9uIGhhcyB0aW1lZCBvdXRcIikpO1xuICAgICAgICB9LCB0aW1lb3V0KTtcbiAgICAgICAgdGhpcy5hY2tzW2lkXSA9ICguLi5hcmdzKSA9PiB7XG4gICAgICAgICAgICAvLyBAdHMtaWdub3JlXG4gICAgICAgICAgICB0aGlzLmlvLmNsZWFyVGltZW91dEZuKHRpbWVyKTtcbiAgICAgICAgICAgIGFjay5hcHBseSh0aGlzLCBbbnVsbCwgLi4uYXJnc10pO1xuICAgICAgICB9O1xuICAgIH1cbiAgICAvKipcbiAgICAgKiBTZW5kcyBhIHBhY2tldC5cbiAgICAgKlxuICAgICAqIEBwYXJhbSBwYWNrZXRcbiAgICAgKiBAcHJpdmF0ZVxuICAgICAqL1xuICAgIHBhY2tldChwYWNrZXQpIHtcbiAgICAgICAgcGFja2V0Lm5zcCA9IHRoaXMubnNwO1xuICAgICAgICB0aGlzLmlvLl9wYWNrZXQocGFja2V0KTtcbiAgICB9XG4gICAgLyoqXG4gICAgICogQ2FsbGVkIHVwb24gZW5naW5lIGBvcGVuYC5cbiAgICAgKlxuICAgICAqIEBwcml2YXRlXG4gICAgICovXG4gICAgb25vcGVuKCkge1xuICAgICAgICBpZiAodHlwZW9mIHRoaXMuYXV0aCA9PSBcImZ1bmN0aW9uXCIpIHtcbiAgICAgICAgICAgIHRoaXMuYXV0aCgoZGF0YSkgPT4ge1xuICAgICAgICAgICAgICAgIHRoaXMucGFja2V0KHsgdHlwZTogUGFja2V0VHlwZS5DT05ORUNULCBkYXRhIH0pO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICB0aGlzLnBhY2tldCh7IHR5cGU6IFBhY2tldFR5cGUuQ09OTkVDVCwgZGF0YTogdGhpcy5hdXRoIH0pO1xuICAgICAgICB9XG4gICAgfVxuICAgIC8qKlxuICAgICAqIENhbGxlZCB1cG9uIGVuZ2luZSBvciBtYW5hZ2VyIGBlcnJvcmAuXG4gICAgICpcbiAgICAgKiBAcGFyYW0gZXJyXG4gICAgICogQHByaXZhdGVcbiAgICAgKi9cbiAgICBvbmVycm9yKGVycikge1xuICAgICAgICBpZiAoIXRoaXMuY29ubmVjdGVkKSB7XG4gICAgICAgICAgICB0aGlzLmVtaXRSZXNlcnZlZChcImNvbm5lY3RfZXJyb3JcIiwgZXJyKTtcbiAgICAgICAgfVxuICAgIH1cbiAgICAvKipcbiAgICAgKiBDYWxsZWQgdXBvbiBlbmdpbmUgYGNsb3NlYC5cbiAgICAgKlxuICAgICAqIEBwYXJhbSByZWFzb25cbiAgICAgKiBAcGFyYW0gZGVzY3JpcHRpb25cbiAgICAgKiBAcHJpdmF0ZVxuICAgICAqL1xuICAgIG9uY2xvc2UocmVhc29uLCBkZXNjcmlwdGlvbikge1xuICAgICAgICB0aGlzLmNvbm5lY3RlZCA9IGZhbHNlO1xuICAgICAgICBkZWxldGUgdGhpcy5pZDtcbiAgICAgICAgdGhpcy5lbWl0UmVzZXJ2ZWQoXCJkaXNjb25uZWN0XCIsIHJlYXNvbiwgZGVzY3JpcHRpb24pO1xuICAgIH1cbiAgICAvKipcbiAgICAgKiBDYWxsZWQgd2l0aCBzb2NrZXQgcGFja2V0LlxuICAgICAqXG4gICAgICogQHBhcmFtIHBhY2tldFxuICAgICAqIEBwcml2YXRlXG4gICAgICovXG4gICAgb25wYWNrZXQocGFja2V0KSB7XG4gICAgICAgIGNvbnN0IHNhbWVOYW1lc3BhY2UgPSBwYWNrZXQubnNwID09PSB0aGlzLm5zcDtcbiAgICAgICAgaWYgKCFzYW1lTmFtZXNwYWNlKVxuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICBzd2l0Y2ggKHBhY2tldC50eXBlKSB7XG4gICAgICAgICAgICBjYXNlIFBhY2tldFR5cGUuQ09OTkVDVDpcbiAgICAgICAgICAgICAgICBpZiAocGFja2V0LmRhdGEgJiYgcGFja2V0LmRhdGEuc2lkKSB7XG4gICAgICAgICAgICAgICAgICAgIGNvbnN0IGlkID0gcGFja2V0LmRhdGEuc2lkO1xuICAgICAgICAgICAgICAgICAgICB0aGlzLm9uY29ubmVjdChpZCk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICB0aGlzLmVtaXRSZXNlcnZlZChcImNvbm5lY3RfZXJyb3JcIiwgbmV3IEVycm9yKFwiSXQgc2VlbXMgeW91IGFyZSB0cnlpbmcgdG8gcmVhY2ggYSBTb2NrZXQuSU8gc2VydmVyIGluIHYyLnggd2l0aCBhIHYzLnggY2xpZW50LCBidXQgdGhleSBhcmUgbm90IGNvbXBhdGlibGUgKG1vcmUgaW5mb3JtYXRpb24gaGVyZTogaHR0cHM6Ly9zb2NrZXQuaW8vZG9jcy92My9taWdyYXRpbmctZnJvbS0yLXgtdG8tMy0wLylcIikpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIGNhc2UgUGFja2V0VHlwZS5FVkVOVDpcbiAgICAgICAgICAgIGNhc2UgUGFja2V0VHlwZS5CSU5BUllfRVZFTlQ6XG4gICAgICAgICAgICAgICAgdGhpcy5vbmV2ZW50KHBhY2tldCk7XG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICBjYXNlIFBhY2tldFR5cGUuQUNLOlxuICAgICAgICAgICAgY2FzZSBQYWNrZXRUeXBlLkJJTkFSWV9BQ0s6XG4gICAgICAgICAgICAgICAgdGhpcy5vbmFjayhwYWNrZXQpO1xuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgY2FzZSBQYWNrZXRUeXBlLkRJU0NPTk5FQ1Q6XG4gICAgICAgICAgICAgICAgdGhpcy5vbmRpc2Nvbm5lY3QoKTtcbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIGNhc2UgUGFja2V0VHlwZS5DT05ORUNUX0VSUk9SOlxuICAgICAgICAgICAgICAgIHRoaXMuZGVzdHJveSgpO1xuICAgICAgICAgICAgICAgIGNvbnN0IGVyciA9IG5ldyBFcnJvcihwYWNrZXQuZGF0YS5tZXNzYWdlKTtcbiAgICAgICAgICAgICAgICAvLyBAdHMtaWdub3JlXG4gICAgICAgICAgICAgICAgZXJyLmRhdGEgPSBwYWNrZXQuZGF0YS5kYXRhO1xuICAgICAgICAgICAgICAgIHRoaXMuZW1pdFJlc2VydmVkKFwiY29ubmVjdF9lcnJvclwiLCBlcnIpO1xuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICB9XG4gICAgfVxuICAgIC8qKlxuICAgICAqIENhbGxlZCB1cG9uIGEgc2VydmVyIGV2ZW50LlxuICAgICAqXG4gICAgICogQHBhcmFtIHBhY2tldFxuICAgICAqIEBwcml2YXRlXG4gICAgICovXG4gICAgb25ldmVudChwYWNrZXQpIHtcbiAgICAgICAgY29uc3QgYXJncyA9IHBhY2tldC5kYXRhIHx8IFtdO1xuICAgICAgICBpZiAobnVsbCAhPSBwYWNrZXQuaWQpIHtcbiAgICAgICAgICAgIGFyZ3MucHVzaCh0aGlzLmFjayhwYWNrZXQuaWQpKTtcbiAgICAgICAgfVxuICAgICAgICBpZiAodGhpcy5jb25uZWN0ZWQpIHtcbiAgICAgICAgICAgIHRoaXMuZW1pdEV2ZW50KGFyZ3MpO1xuICAgICAgICB9XG4gICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgdGhpcy5yZWNlaXZlQnVmZmVyLnB1c2goT2JqZWN0LmZyZWV6ZShhcmdzKSk7XG4gICAgICAgIH1cbiAgICB9XG4gICAgZW1pdEV2ZW50KGFyZ3MpIHtcbiAgICAgICAgaWYgKHRoaXMuX2FueUxpc3RlbmVycyAmJiB0aGlzLl9hbnlMaXN0ZW5lcnMubGVuZ3RoKSB7XG4gICAgICAgICAgICBjb25zdCBsaXN0ZW5lcnMgPSB0aGlzLl9hbnlMaXN0ZW5lcnMuc2xpY2UoKTtcbiAgICAgICAgICAgIGZvciAoY29uc3QgbGlzdGVuZXIgb2YgbGlzdGVuZXJzKSB7XG4gICAgICAgICAgICAgICAgbGlzdGVuZXIuYXBwbHkodGhpcywgYXJncyk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgc3VwZXIuZW1pdC5hcHBseSh0aGlzLCBhcmdzKTtcbiAgICB9XG4gICAgLyoqXG4gICAgICogUHJvZHVjZXMgYW4gYWNrIGNhbGxiYWNrIHRvIGVtaXQgd2l0aCBhbiBldmVudC5cbiAgICAgKlxuICAgICAqIEBwcml2YXRlXG4gICAgICovXG4gICAgYWNrKGlkKSB7XG4gICAgICAgIGNvbnN0IHNlbGYgPSB0aGlzO1xuICAgICAgICBsZXQgc2VudCA9IGZhbHNlO1xuICAgICAgICByZXR1cm4gZnVuY3Rpb24gKC4uLmFyZ3MpIHtcbiAgICAgICAgICAgIC8vIHByZXZlbnQgZG91YmxlIGNhbGxiYWNrc1xuICAgICAgICAgICAgaWYgKHNlbnQpXG4gICAgICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAgICAgc2VudCA9IHRydWU7XG4gICAgICAgICAgICBzZWxmLnBhY2tldCh7XG4gICAgICAgICAgICAgICAgdHlwZTogUGFja2V0VHlwZS5BQ0ssXG4gICAgICAgICAgICAgICAgaWQ6IGlkLFxuICAgICAgICAgICAgICAgIGRhdGE6IGFyZ3MsXG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfTtcbiAgICB9XG4gICAgLyoqXG4gICAgICogQ2FsbGVkIHVwb24gYSBzZXJ2ZXIgYWNrbm93bGVnZW1lbnQuXG4gICAgICpcbiAgICAgKiBAcGFyYW0gcGFja2V0XG4gICAgICogQHByaXZhdGVcbiAgICAgKi9cbiAgICBvbmFjayhwYWNrZXQpIHtcbiAgICAgICAgY29uc3QgYWNrID0gdGhpcy5hY2tzW3BhY2tldC5pZF07XG4gICAgICAgIGlmIChcImZ1bmN0aW9uXCIgPT09IHR5cGVvZiBhY2spIHtcbiAgICAgICAgICAgIGFjay5hcHBseSh0aGlzLCBwYWNrZXQuZGF0YSk7XG4gICAgICAgICAgICBkZWxldGUgdGhpcy5hY2tzW3BhY2tldC5pZF07XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSB7XG4gICAgICAgIH1cbiAgICB9XG4gICAgLyoqXG4gICAgICogQ2FsbGVkIHVwb24gc2VydmVyIGNvbm5lY3QuXG4gICAgICpcbiAgICAgKiBAcHJpdmF0ZVxuICAgICAqL1xuICAgIG9uY29ubmVjdChpZCkge1xuICAgICAgICB0aGlzLmlkID0gaWQ7XG4gICAgICAgIHRoaXMuY29ubmVjdGVkID0gdHJ1ZTtcbiAgICAgICAgdGhpcy5lbWl0QnVmZmVyZWQoKTtcbiAgICAgICAgdGhpcy5lbWl0UmVzZXJ2ZWQoXCJjb25uZWN0XCIpO1xuICAgIH1cbiAgICAvKipcbiAgICAgKiBFbWl0IGJ1ZmZlcmVkIGV2ZW50cyAocmVjZWl2ZWQgYW5kIGVtaXR0ZWQpLlxuICAgICAqXG4gICAgICogQHByaXZhdGVcbiAgICAgKi9cbiAgICBlbWl0QnVmZmVyZWQoKSB7XG4gICAgICAgIHRoaXMucmVjZWl2ZUJ1ZmZlci5mb3JFYWNoKChhcmdzKSA9PiB0aGlzLmVtaXRFdmVudChhcmdzKSk7XG4gICAgICAgIHRoaXMucmVjZWl2ZUJ1ZmZlciA9IFtdO1xuICAgICAgICB0aGlzLnNlbmRCdWZmZXIuZm9yRWFjaCgocGFja2V0KSA9PiB7XG4gICAgICAgICAgICB0aGlzLm5vdGlmeU91dGdvaW5nTGlzdGVuZXJzKHBhY2tldCk7XG4gICAgICAgICAgICB0aGlzLnBhY2tldChwYWNrZXQpO1xuICAgICAgICB9KTtcbiAgICAgICAgdGhpcy5zZW5kQnVmZmVyID0gW107XG4gICAgfVxuICAgIC8qKlxuICAgICAqIENhbGxlZCB1cG9uIHNlcnZlciBkaXNjb25uZWN0LlxuICAgICAqXG4gICAgICogQHByaXZhdGVcbiAgICAgKi9cbiAgICBvbmRpc2Nvbm5lY3QoKSB7XG4gICAgICAgIHRoaXMuZGVzdHJveSgpO1xuICAgICAgICB0aGlzLm9uY2xvc2UoXCJpbyBzZXJ2ZXIgZGlzY29ubmVjdFwiKTtcbiAgICB9XG4gICAgLyoqXG4gICAgICogQ2FsbGVkIHVwb24gZm9yY2VkIGNsaWVudC9zZXJ2ZXIgc2lkZSBkaXNjb25uZWN0aW9ucyxcbiAgICAgKiB0aGlzIG1ldGhvZCBlbnN1cmVzIHRoZSBtYW5hZ2VyIHN0b3BzIHRyYWNraW5nIHVzIGFuZFxuICAgICAqIHRoYXQgcmVjb25uZWN0aW9ucyBkb24ndCBnZXQgdHJpZ2dlcmVkIGZvciB0aGlzLlxuICAgICAqXG4gICAgICogQHByaXZhdGVcbiAgICAgKi9cbiAgICBkZXN0cm95KCkge1xuICAgICAgICBpZiAodGhpcy5zdWJzKSB7XG4gICAgICAgICAgICAvLyBjbGVhbiBzdWJzY3JpcHRpb25zIHRvIGF2b2lkIHJlY29ubmVjdGlvbnNcbiAgICAgICAgICAgIHRoaXMuc3Vicy5mb3JFYWNoKChzdWJEZXN0cm95KSA9PiBzdWJEZXN0cm95KCkpO1xuICAgICAgICAgICAgdGhpcy5zdWJzID0gdW5kZWZpbmVkO1xuICAgICAgICB9XG4gICAgICAgIHRoaXMuaW9bXCJfZGVzdHJveVwiXSh0aGlzKTtcbiAgICB9XG4gICAgLyoqXG4gICAgICogRGlzY29ubmVjdHMgdGhlIHNvY2tldCBtYW51YWxseS5cbiAgICAgKlxuICAgICAqIEByZXR1cm4gc2VsZlxuICAgICAqIEBwdWJsaWNcbiAgICAgKi9cbiAgICBkaXNjb25uZWN0KCkge1xuICAgICAgICBpZiAodGhpcy5jb25uZWN0ZWQpIHtcbiAgICAgICAgICAgIHRoaXMucGFja2V0KHsgdHlwZTogUGFja2V0VHlwZS5ESVNDT05ORUNUIH0pO1xuICAgICAgICB9XG4gICAgICAgIC8vIHJlbW92ZSBzb2NrZXQgZnJvbSBwb29sXG4gICAgICAgIHRoaXMuZGVzdHJveSgpO1xuICAgICAgICBpZiAodGhpcy5jb25uZWN0ZWQpIHtcbiAgICAgICAgICAgIC8vIGZpcmUgZXZlbnRzXG4gICAgICAgICAgICB0aGlzLm9uY2xvc2UoXCJpbyBjbGllbnQgZGlzY29ubmVjdFwiKTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gdGhpcztcbiAgICB9XG4gICAgLyoqXG4gICAgICogQWxpYXMgZm9yIGRpc2Nvbm5lY3QoKVxuICAgICAqXG4gICAgICogQHJldHVybiBzZWxmXG4gICAgICogQHB1YmxpY1xuICAgICAqL1xuICAgIGNsb3NlKCkge1xuICAgICAgICByZXR1cm4gdGhpcy5kaXNjb25uZWN0KCk7XG4gICAgfVxuICAgIC8qKlxuICAgICAqIFNldHMgdGhlIGNvbXByZXNzIGZsYWcuXG4gICAgICpcbiAgICAgKiBAcGFyYW0gY29tcHJlc3MgLSBpZiBgdHJ1ZWAsIGNvbXByZXNzZXMgdGhlIHNlbmRpbmcgZGF0YVxuICAgICAqIEByZXR1cm4gc2VsZlxuICAgICAqIEBwdWJsaWNcbiAgICAgKi9cbiAgICBjb21wcmVzcyhjb21wcmVzcykge1xuICAgICAgICB0aGlzLmZsYWdzLmNvbXByZXNzID0gY29tcHJlc3M7XG4gICAgICAgIHJldHVybiB0aGlzO1xuICAgIH1cbiAgICAvKipcbiAgICAgKiBTZXRzIGEgbW9kaWZpZXIgZm9yIGEgc3Vic2VxdWVudCBldmVudCBlbWlzc2lvbiB0aGF0IHRoZSBldmVudCBtZXNzYWdlIHdpbGwgYmUgZHJvcHBlZCB3aGVuIHRoaXMgc29ja2V0IGlzIG5vdFxuICAgICAqIHJlYWR5IHRvIHNlbmQgbWVzc2FnZXMuXG4gICAgICpcbiAgICAgKiBAcmV0dXJucyBzZWxmXG4gICAgICogQHB1YmxpY1xuICAgICAqL1xuICAgIGdldCB2b2xhdGlsZSgpIHtcbiAgICAgICAgdGhpcy5mbGFncy52b2xhdGlsZSA9IHRydWU7XG4gICAgICAgIHJldHVybiB0aGlzO1xuICAgIH1cbiAgICAvKipcbiAgICAgKiBTZXRzIGEgbW9kaWZpZXIgZm9yIGEgc3Vic2VxdWVudCBldmVudCBlbWlzc2lvbiB0aGF0IHRoZSBjYWxsYmFjayB3aWxsIGJlIGNhbGxlZCB3aXRoIGFuIGVycm9yIHdoZW4gdGhlXG4gICAgICogZ2l2ZW4gbnVtYmVyIG9mIG1pbGxpc2Vjb25kcyBoYXZlIGVsYXBzZWQgd2l0aG91dCBhbiBhY2tub3dsZWRnZW1lbnQgZnJvbSB0aGUgc2VydmVyOlxuICAgICAqXG4gICAgICogYGBgXG4gICAgICogc29ja2V0LnRpbWVvdXQoNTAwMCkuZW1pdChcIm15LWV2ZW50XCIsIChlcnIpID0+IHtcbiAgICAgKiAgIGlmIChlcnIpIHtcbiAgICAgKiAgICAgLy8gdGhlIHNlcnZlciBkaWQgbm90IGFja25vd2xlZGdlIHRoZSBldmVudCBpbiB0aGUgZ2l2ZW4gZGVsYXlcbiAgICAgKiAgIH1cbiAgICAgKiB9KTtcbiAgICAgKiBgYGBcbiAgICAgKlxuICAgICAqIEByZXR1cm5zIHNlbGZcbiAgICAgKiBAcHVibGljXG4gICAgICovXG4gICAgdGltZW91dCh0aW1lb3V0KSB7XG4gICAgICAgIHRoaXMuZmxhZ3MudGltZW91dCA9IHRpbWVvdXQ7XG4gICAgICAgIHJldHVybiB0aGlzO1xuICAgIH1cbiAgICAvKipcbiAgICAgKiBBZGRzIGEgbGlzdGVuZXIgdGhhdCB3aWxsIGJlIGZpcmVkIHdoZW4gYW55IGV2ZW50IGlzIGVtaXR0ZWQuIFRoZSBldmVudCBuYW1lIGlzIHBhc3NlZCBhcyB0aGUgZmlyc3QgYXJndW1lbnQgdG8gdGhlXG4gICAgICogY2FsbGJhY2suXG4gICAgICpcbiAgICAgKiBAcGFyYW0gbGlzdGVuZXJcbiAgICAgKiBAcHVibGljXG4gICAgICovXG4gICAgb25BbnkobGlzdGVuZXIpIHtcbiAgICAgICAgdGhpcy5fYW55TGlzdGVuZXJzID0gdGhpcy5fYW55TGlzdGVuZXJzIHx8IFtdO1xuICAgICAgICB0aGlzLl9hbnlMaXN0ZW5lcnMucHVzaChsaXN0ZW5lcik7XG4gICAgICAgIHJldHVybiB0aGlzO1xuICAgIH1cbiAgICAvKipcbiAgICAgKiBBZGRzIGEgbGlzdGVuZXIgdGhhdCB3aWxsIGJlIGZpcmVkIHdoZW4gYW55IGV2ZW50IGlzIGVtaXR0ZWQuIFRoZSBldmVudCBuYW1lIGlzIHBhc3NlZCBhcyB0aGUgZmlyc3QgYXJndW1lbnQgdG8gdGhlXG4gICAgICogY2FsbGJhY2suIFRoZSBsaXN0ZW5lciBpcyBhZGRlZCB0byB0aGUgYmVnaW5uaW5nIG9mIHRoZSBsaXN0ZW5lcnMgYXJyYXkuXG4gICAgICpcbiAgICAgKiBAcGFyYW0gbGlzdGVuZXJcbiAgICAgKiBAcHVibGljXG4gICAgICovXG4gICAgcHJlcGVuZEFueShsaXN0ZW5lcikge1xuICAgICAgICB0aGlzLl9hbnlMaXN0ZW5lcnMgPSB0aGlzLl9hbnlMaXN0ZW5lcnMgfHwgW107XG4gICAgICAgIHRoaXMuX2FueUxpc3RlbmVycy51bnNoaWZ0KGxpc3RlbmVyKTtcbiAgICAgICAgcmV0dXJuIHRoaXM7XG4gICAgfVxuICAgIC8qKlxuICAgICAqIFJlbW92ZXMgdGhlIGxpc3RlbmVyIHRoYXQgd2lsbCBiZSBmaXJlZCB3aGVuIGFueSBldmVudCBpcyBlbWl0dGVkLlxuICAgICAqXG4gICAgICogQHBhcmFtIGxpc3RlbmVyXG4gICAgICogQHB1YmxpY1xuICAgICAqL1xuICAgIG9mZkFueShsaXN0ZW5lcikge1xuICAgICAgICBpZiAoIXRoaXMuX2FueUxpc3RlbmVycykge1xuICAgICAgICAgICAgcmV0dXJuIHRoaXM7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKGxpc3RlbmVyKSB7XG4gICAgICAgICAgICBjb25zdCBsaXN0ZW5lcnMgPSB0aGlzLl9hbnlMaXN0ZW5lcnM7XG4gICAgICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IGxpc3RlbmVycy5sZW5ndGg7IGkrKykge1xuICAgICAgICAgICAgICAgIGlmIChsaXN0ZW5lciA9PT0gbGlzdGVuZXJzW2ldKSB7XG4gICAgICAgICAgICAgICAgICAgIGxpc3RlbmVycy5zcGxpY2UoaSwgMSk7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiB0aGlzO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgIHRoaXMuX2FueUxpc3RlbmVycyA9IFtdO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiB0aGlzO1xuICAgIH1cbiAgICAvKipcbiAgICAgKiBSZXR1cm5zIGFuIGFycmF5IG9mIGxpc3RlbmVycyB0aGF0IGFyZSBsaXN0ZW5pbmcgZm9yIGFueSBldmVudCB0aGF0IGlzIHNwZWNpZmllZC4gVGhpcyBhcnJheSBjYW4gYmUgbWFuaXB1bGF0ZWQsXG4gICAgICogZS5nLiB0byByZW1vdmUgbGlzdGVuZXJzLlxuICAgICAqXG4gICAgICogQHB1YmxpY1xuICAgICAqL1xuICAgIGxpc3RlbmVyc0FueSgpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuX2FueUxpc3RlbmVycyB8fCBbXTtcbiAgICB9XG4gICAgLyoqXG4gICAgICogQWRkcyBhIGxpc3RlbmVyIHRoYXQgd2lsbCBiZSBmaXJlZCB3aGVuIGFueSBldmVudCBpcyBlbWl0dGVkLiBUaGUgZXZlbnQgbmFtZSBpcyBwYXNzZWQgYXMgdGhlIGZpcnN0IGFyZ3VtZW50IHRvIHRoZVxuICAgICAqIGNhbGxiYWNrLlxuICAgICAqXG4gICAgICogQHBhcmFtIGxpc3RlbmVyXG4gICAgICpcbiAgICAgKiA8cHJlPjxjb2RlPlxuICAgICAqXG4gICAgICogc29ja2V0Lm9uQW55T3V0Z29pbmcoKGV2ZW50LCAuLi5hcmdzKSA9PiB7XG4gICAgICogICBjb25zb2xlLmxvZyhldmVudCk7XG4gICAgICogfSk7XG4gICAgICpcbiAgICAgKiA8L3ByZT48L2NvZGU+XG4gICAgICpcbiAgICAgKiBAcHVibGljXG4gICAgICovXG4gICAgb25BbnlPdXRnb2luZyhsaXN0ZW5lcikge1xuICAgICAgICB0aGlzLl9hbnlPdXRnb2luZ0xpc3RlbmVycyA9IHRoaXMuX2FueU91dGdvaW5nTGlzdGVuZXJzIHx8IFtdO1xuICAgICAgICB0aGlzLl9hbnlPdXRnb2luZ0xpc3RlbmVycy5wdXNoKGxpc3RlbmVyKTtcbiAgICAgICAgcmV0dXJuIHRoaXM7XG4gICAgfVxuICAgIC8qKlxuICAgICAqIEFkZHMgYSBsaXN0ZW5lciB0aGF0IHdpbGwgYmUgZmlyZWQgd2hlbiBhbnkgZXZlbnQgaXMgZW1pdHRlZC4gVGhlIGV2ZW50IG5hbWUgaXMgcGFzc2VkIGFzIHRoZSBmaXJzdCBhcmd1bWVudCB0byB0aGVcbiAgICAgKiBjYWxsYmFjay4gVGhlIGxpc3RlbmVyIGlzIGFkZGVkIHRvIHRoZSBiZWdpbm5pbmcgb2YgdGhlIGxpc3RlbmVycyBhcnJheS5cbiAgICAgKlxuICAgICAqIEBwYXJhbSBsaXN0ZW5lclxuICAgICAqXG4gICAgICogPHByZT48Y29kZT5cbiAgICAgKlxuICAgICAqIHNvY2tldC5wcmVwZW5kQW55T3V0Z29pbmcoKGV2ZW50LCAuLi5hcmdzKSA9PiB7XG4gICAgICogICBjb25zb2xlLmxvZyhldmVudCk7XG4gICAgICogfSk7XG4gICAgICpcbiAgICAgKiA8L3ByZT48L2NvZGU+XG4gICAgICpcbiAgICAgKiBAcHVibGljXG4gICAgICovXG4gICAgcHJlcGVuZEFueU91dGdvaW5nKGxpc3RlbmVyKSB7XG4gICAgICAgIHRoaXMuX2FueU91dGdvaW5nTGlzdGVuZXJzID0gdGhpcy5fYW55T3V0Z29pbmdMaXN0ZW5lcnMgfHwgW107XG4gICAgICAgIHRoaXMuX2FueU91dGdvaW5nTGlzdGVuZXJzLnVuc2hpZnQobGlzdGVuZXIpO1xuICAgICAgICByZXR1cm4gdGhpcztcbiAgICB9XG4gICAgLyoqXG4gICAgICogUmVtb3ZlcyB0aGUgbGlzdGVuZXIgdGhhdCB3aWxsIGJlIGZpcmVkIHdoZW4gYW55IGV2ZW50IGlzIGVtaXR0ZWQuXG4gICAgICpcbiAgICAgKiBAcGFyYW0gbGlzdGVuZXJcbiAgICAgKlxuICAgICAqIDxwcmU+PGNvZGU+XG4gICAgICpcbiAgICAgKiBjb25zdCBoYW5kbGVyID0gKGV2ZW50LCAuLi5hcmdzKSA9PiB7XG4gICAgICogICBjb25zb2xlLmxvZyhldmVudCk7XG4gICAgICogfVxuICAgICAqXG4gICAgICogc29ja2V0Lm9uQW55T3V0Z29pbmcoaGFuZGxlcik7XG4gICAgICpcbiAgICAgKiAvLyB0aGVuIGxhdGVyXG4gICAgICogc29ja2V0Lm9mZkFueU91dGdvaW5nKGhhbmRsZXIpO1xuICAgICAqXG4gICAgICogPC9wcmU+PC9jb2RlPlxuICAgICAqXG4gICAgICogQHB1YmxpY1xuICAgICAqL1xuICAgIG9mZkFueU91dGdvaW5nKGxpc3RlbmVyKSB7XG4gICAgICAgIGlmICghdGhpcy5fYW55T3V0Z29pbmdMaXN0ZW5lcnMpIHtcbiAgICAgICAgICAgIHJldHVybiB0aGlzO1xuICAgICAgICB9XG4gICAgICAgIGlmIChsaXN0ZW5lcikge1xuICAgICAgICAgICAgY29uc3QgbGlzdGVuZXJzID0gdGhpcy5fYW55T3V0Z29pbmdMaXN0ZW5lcnM7XG4gICAgICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IGxpc3RlbmVycy5sZW5ndGg7IGkrKykge1xuICAgICAgICAgICAgICAgIGlmIChsaXN0ZW5lciA9PT0gbGlzdGVuZXJzW2ldKSB7XG4gICAgICAgICAgICAgICAgICAgIGxpc3RlbmVycy5zcGxpY2UoaSwgMSk7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiB0aGlzO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgIHRoaXMuX2FueU91dGdvaW5nTGlzdGVuZXJzID0gW107XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIHRoaXM7XG4gICAgfVxuICAgIC8qKlxuICAgICAqIFJldHVybnMgYW4gYXJyYXkgb2YgbGlzdGVuZXJzIHRoYXQgYXJlIGxpc3RlbmluZyBmb3IgYW55IGV2ZW50IHRoYXQgaXMgc3BlY2lmaWVkLiBUaGlzIGFycmF5IGNhbiBiZSBtYW5pcHVsYXRlZCxcbiAgICAgKiBlLmcuIHRvIHJlbW92ZSBsaXN0ZW5lcnMuXG4gICAgICpcbiAgICAgKiBAcHVibGljXG4gICAgICovXG4gICAgbGlzdGVuZXJzQW55T3V0Z29pbmcoKSB7XG4gICAgICAgIHJldHVybiB0aGlzLl9hbnlPdXRnb2luZ0xpc3RlbmVycyB8fCBbXTtcbiAgICB9XG4gICAgLyoqXG4gICAgICogTm90aWZ5IHRoZSBsaXN0ZW5lcnMgZm9yIGVhY2ggcGFja2V0IHNlbnRcbiAgICAgKlxuICAgICAqIEBwYXJhbSBwYWNrZXRcbiAgICAgKlxuICAgICAqIEBwcml2YXRlXG4gICAgICovXG4gICAgbm90aWZ5T3V0Z29pbmdMaXN0ZW5lcnMocGFja2V0KSB7XG4gICAgICAgIGlmICh0aGlzLl9hbnlPdXRnb2luZ0xpc3RlbmVycyAmJiB0aGlzLl9hbnlPdXRnb2luZ0xpc3RlbmVycy5sZW5ndGgpIHtcbiAgICAgICAgICAgIGNvbnN0IGxpc3RlbmVycyA9IHRoaXMuX2FueU91dGdvaW5nTGlzdGVuZXJzLnNsaWNlKCk7XG4gICAgICAgICAgICBmb3IgKGNvbnN0IGxpc3RlbmVyIG9mIGxpc3RlbmVycykge1xuICAgICAgICAgICAgICAgIGxpc3RlbmVyLmFwcGx5KHRoaXMsIHBhY2tldC5kYXRhKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH1cbn1cbiIsICIvKipcbiAqIEluaXRpYWxpemUgYmFja29mZiB0aW1lciB3aXRoIGBvcHRzYC5cbiAqXG4gKiAtIGBtaW5gIGluaXRpYWwgdGltZW91dCBpbiBtaWxsaXNlY29uZHMgWzEwMF1cbiAqIC0gYG1heGAgbWF4IHRpbWVvdXQgWzEwMDAwXVxuICogLSBgaml0dGVyYCBbMF1cbiAqIC0gYGZhY3RvcmAgWzJdXG4gKlxuICogQHBhcmFtIHtPYmplY3R9IG9wdHNcbiAqIEBhcGkgcHVibGljXG4gKi9cbmV4cG9ydCBmdW5jdGlvbiBCYWNrb2ZmKG9wdHMpIHtcbiAgICBvcHRzID0gb3B0cyB8fCB7fTtcbiAgICB0aGlzLm1zID0gb3B0cy5taW4gfHwgMTAwO1xuICAgIHRoaXMubWF4ID0gb3B0cy5tYXggfHwgMTAwMDA7XG4gICAgdGhpcy5mYWN0b3IgPSBvcHRzLmZhY3RvciB8fCAyO1xuICAgIHRoaXMuaml0dGVyID0gb3B0cy5qaXR0ZXIgPiAwICYmIG9wdHMuaml0dGVyIDw9IDEgPyBvcHRzLmppdHRlciA6IDA7XG4gICAgdGhpcy5hdHRlbXB0cyA9IDA7XG59XG4vKipcbiAqIFJldHVybiB0aGUgYmFja29mZiBkdXJhdGlvbi5cbiAqXG4gKiBAcmV0dXJuIHtOdW1iZXJ9XG4gKiBAYXBpIHB1YmxpY1xuICovXG5CYWNrb2ZmLnByb3RvdHlwZS5kdXJhdGlvbiA9IGZ1bmN0aW9uICgpIHtcbiAgICB2YXIgbXMgPSB0aGlzLm1zICogTWF0aC5wb3codGhpcy5mYWN0b3IsIHRoaXMuYXR0ZW1wdHMrKyk7XG4gICAgaWYgKHRoaXMuaml0dGVyKSB7XG4gICAgICAgIHZhciByYW5kID0gTWF0aC5yYW5kb20oKTtcbiAgICAgICAgdmFyIGRldmlhdGlvbiA9IE1hdGguZmxvb3IocmFuZCAqIHRoaXMuaml0dGVyICogbXMpO1xuICAgICAgICBtcyA9IChNYXRoLmZsb29yKHJhbmQgKiAxMCkgJiAxKSA9PSAwID8gbXMgLSBkZXZpYXRpb24gOiBtcyArIGRldmlhdGlvbjtcbiAgICB9XG4gICAgcmV0dXJuIE1hdGgubWluKG1zLCB0aGlzLm1heCkgfCAwO1xufTtcbi8qKlxuICogUmVzZXQgdGhlIG51bWJlciBvZiBhdHRlbXB0cy5cbiAqXG4gKiBAYXBpIHB1YmxpY1xuICovXG5CYWNrb2ZmLnByb3RvdHlwZS5yZXNldCA9IGZ1bmN0aW9uICgpIHtcbiAgICB0aGlzLmF0dGVtcHRzID0gMDtcbn07XG4vKipcbiAqIFNldCB0aGUgbWluaW11bSBkdXJhdGlvblxuICpcbiAqIEBhcGkgcHVibGljXG4gKi9cbkJhY2tvZmYucHJvdG90eXBlLnNldE1pbiA9IGZ1bmN0aW9uIChtaW4pIHtcbiAgICB0aGlzLm1zID0gbWluO1xufTtcbi8qKlxuICogU2V0IHRoZSBtYXhpbXVtIGR1cmF0aW9uXG4gKlxuICogQGFwaSBwdWJsaWNcbiAqL1xuQmFja29mZi5wcm90b3R5cGUuc2V0TWF4ID0gZnVuY3Rpb24gKG1heCkge1xuICAgIHRoaXMubWF4ID0gbWF4O1xufTtcbi8qKlxuICogU2V0IHRoZSBqaXR0ZXJcbiAqXG4gKiBAYXBpIHB1YmxpY1xuICovXG5CYWNrb2ZmLnByb3RvdHlwZS5zZXRKaXR0ZXIgPSBmdW5jdGlvbiAoaml0dGVyKSB7XG4gICAgdGhpcy5qaXR0ZXIgPSBqaXR0ZXI7XG59O1xuIiwgImltcG9ydCB7IFNvY2tldCBhcyBFbmdpbmUsIGluc3RhbGxUaW1lckZ1bmN0aW9ucywgfSBmcm9tIFwiZW5naW5lLmlvLWNsaWVudFwiO1xuaW1wb3J0IHsgU29ja2V0IH0gZnJvbSBcIi4vc29ja2V0LmpzXCI7XG5pbXBvcnQgKiBhcyBwYXJzZXIgZnJvbSBcInNvY2tldC5pby1wYXJzZXJcIjtcbmltcG9ydCB7IG9uIH0gZnJvbSBcIi4vb24uanNcIjtcbmltcG9ydCB7IEJhY2tvZmYgfSBmcm9tIFwiLi9jb250cmliL2JhY2tvMi5qc1wiO1xuaW1wb3J0IHsgRW1pdHRlciwgfSBmcm9tIFwiQHNvY2tldC5pby9jb21wb25lbnQtZW1pdHRlclwiO1xuZXhwb3J0IGNsYXNzIE1hbmFnZXIgZXh0ZW5kcyBFbWl0dGVyIHtcbiAgICBjb25zdHJ1Y3Rvcih1cmksIG9wdHMpIHtcbiAgICAgICAgdmFyIF9hO1xuICAgICAgICBzdXBlcigpO1xuICAgICAgICB0aGlzLm5zcHMgPSB7fTtcbiAgICAgICAgdGhpcy5zdWJzID0gW107XG4gICAgICAgIGlmICh1cmkgJiYgXCJvYmplY3RcIiA9PT0gdHlwZW9mIHVyaSkge1xuICAgICAgICAgICAgb3B0cyA9IHVyaTtcbiAgICAgICAgICAgIHVyaSA9IHVuZGVmaW5lZDtcbiAgICAgICAgfVxuICAgICAgICBvcHRzID0gb3B0cyB8fCB7fTtcbiAgICAgICAgb3B0cy5wYXRoID0gb3B0cy5wYXRoIHx8IFwiL3NvY2tldC5pb1wiO1xuICAgICAgICB0aGlzLm9wdHMgPSBvcHRzO1xuICAgICAgICBpbnN0YWxsVGltZXJGdW5jdGlvbnModGhpcywgb3B0cyk7XG4gICAgICAgIHRoaXMucmVjb25uZWN0aW9uKG9wdHMucmVjb25uZWN0aW9uICE9PSBmYWxzZSk7XG4gICAgICAgIHRoaXMucmVjb25uZWN0aW9uQXR0ZW1wdHMob3B0cy5yZWNvbm5lY3Rpb25BdHRlbXB0cyB8fCBJbmZpbml0eSk7XG4gICAgICAgIHRoaXMucmVjb25uZWN0aW9uRGVsYXkob3B0cy5yZWNvbm5lY3Rpb25EZWxheSB8fCAxMDAwKTtcbiAgICAgICAgdGhpcy5yZWNvbm5lY3Rpb25EZWxheU1heChvcHRzLnJlY29ubmVjdGlvbkRlbGF5TWF4IHx8IDUwMDApO1xuICAgICAgICB0aGlzLnJhbmRvbWl6YXRpb25GYWN0b3IoKF9hID0gb3B0cy5yYW5kb21pemF0aW9uRmFjdG9yKSAhPT0gbnVsbCAmJiBfYSAhPT0gdm9pZCAwID8gX2EgOiAwLjUpO1xuICAgICAgICB0aGlzLmJhY2tvZmYgPSBuZXcgQmFja29mZih7XG4gICAgICAgICAgICBtaW46IHRoaXMucmVjb25uZWN0aW9uRGVsYXkoKSxcbiAgICAgICAgICAgIG1heDogdGhpcy5yZWNvbm5lY3Rpb25EZWxheU1heCgpLFxuICAgICAgICAgICAgaml0dGVyOiB0aGlzLnJhbmRvbWl6YXRpb25GYWN0b3IoKSxcbiAgICAgICAgfSk7XG4gICAgICAgIHRoaXMudGltZW91dChudWxsID09IG9wdHMudGltZW91dCA/IDIwMDAwIDogb3B0cy50aW1lb3V0KTtcbiAgICAgICAgdGhpcy5fcmVhZHlTdGF0ZSA9IFwiY2xvc2VkXCI7XG4gICAgICAgIHRoaXMudXJpID0gdXJpO1xuICAgICAgICBjb25zdCBfcGFyc2VyID0gb3B0cy5wYXJzZXIgfHwgcGFyc2VyO1xuICAgICAgICB0aGlzLmVuY29kZXIgPSBuZXcgX3BhcnNlci5FbmNvZGVyKCk7XG4gICAgICAgIHRoaXMuZGVjb2RlciA9IG5ldyBfcGFyc2VyLkRlY29kZXIoKTtcbiAgICAgICAgdGhpcy5fYXV0b0Nvbm5lY3QgPSBvcHRzLmF1dG9Db25uZWN0ICE9PSBmYWxzZTtcbiAgICAgICAgaWYgKHRoaXMuX2F1dG9Db25uZWN0KVxuICAgICAgICAgICAgdGhpcy5vcGVuKCk7XG4gICAgfVxuICAgIHJlY29ubmVjdGlvbih2KSB7XG4gICAgICAgIGlmICghYXJndW1lbnRzLmxlbmd0aClcbiAgICAgICAgICAgIHJldHVybiB0aGlzLl9yZWNvbm5lY3Rpb247XG4gICAgICAgIHRoaXMuX3JlY29ubmVjdGlvbiA9ICEhdjtcbiAgICAgICAgcmV0dXJuIHRoaXM7XG4gICAgfVxuICAgIHJlY29ubmVjdGlvbkF0dGVtcHRzKHYpIHtcbiAgICAgICAgaWYgKHYgPT09IHVuZGVmaW5lZClcbiAgICAgICAgICAgIHJldHVybiB0aGlzLl9yZWNvbm5lY3Rpb25BdHRlbXB0cztcbiAgICAgICAgdGhpcy5fcmVjb25uZWN0aW9uQXR0ZW1wdHMgPSB2O1xuICAgICAgICByZXR1cm4gdGhpcztcbiAgICB9XG4gICAgcmVjb25uZWN0aW9uRGVsYXkodikge1xuICAgICAgICB2YXIgX2E7XG4gICAgICAgIGlmICh2ID09PSB1bmRlZmluZWQpXG4gICAgICAgICAgICByZXR1cm4gdGhpcy5fcmVjb25uZWN0aW9uRGVsYXk7XG4gICAgICAgIHRoaXMuX3JlY29ubmVjdGlvbkRlbGF5ID0gdjtcbiAgICAgICAgKF9hID0gdGhpcy5iYWNrb2ZmKSA9PT0gbnVsbCB8fCBfYSA9PT0gdm9pZCAwID8gdm9pZCAwIDogX2Euc2V0TWluKHYpO1xuICAgICAgICByZXR1cm4gdGhpcztcbiAgICB9XG4gICAgcmFuZG9taXphdGlvbkZhY3Rvcih2KSB7XG4gICAgICAgIHZhciBfYTtcbiAgICAgICAgaWYgKHYgPT09IHVuZGVmaW5lZClcbiAgICAgICAgICAgIHJldHVybiB0aGlzLl9yYW5kb21pemF0aW9uRmFjdG9yO1xuICAgICAgICB0aGlzLl9yYW5kb21pemF0aW9uRmFjdG9yID0gdjtcbiAgICAgICAgKF9hID0gdGhpcy5iYWNrb2ZmKSA9PT0gbnVsbCB8fCBfYSA9PT0gdm9pZCAwID8gdm9pZCAwIDogX2Euc2V0Sml0dGVyKHYpO1xuICAgICAgICByZXR1cm4gdGhpcztcbiAgICB9XG4gICAgcmVjb25uZWN0aW9uRGVsYXlNYXgodikge1xuICAgICAgICB2YXIgX2E7XG4gICAgICAgIGlmICh2ID09PSB1bmRlZmluZWQpXG4gICAgICAgICAgICByZXR1cm4gdGhpcy5fcmVjb25uZWN0aW9uRGVsYXlNYXg7XG4gICAgICAgIHRoaXMuX3JlY29ubmVjdGlvbkRlbGF5TWF4ID0gdjtcbiAgICAgICAgKF9hID0gdGhpcy5iYWNrb2ZmKSA9PT0gbnVsbCB8fCBfYSA9PT0gdm9pZCAwID8gdm9pZCAwIDogX2Euc2V0TWF4KHYpO1xuICAgICAgICByZXR1cm4gdGhpcztcbiAgICB9XG4gICAgdGltZW91dCh2KSB7XG4gICAgICAgIGlmICghYXJndW1lbnRzLmxlbmd0aClcbiAgICAgICAgICAgIHJldHVybiB0aGlzLl90aW1lb3V0O1xuICAgICAgICB0aGlzLl90aW1lb3V0ID0gdjtcbiAgICAgICAgcmV0dXJuIHRoaXM7XG4gICAgfVxuICAgIC8qKlxuICAgICAqIFN0YXJ0cyB0cnlpbmcgdG8gcmVjb25uZWN0IGlmIHJlY29ubmVjdGlvbiBpcyBlbmFibGVkIGFuZCB3ZSBoYXZlIG5vdFxuICAgICAqIHN0YXJ0ZWQgcmVjb25uZWN0aW5nIHlldFxuICAgICAqXG4gICAgICogQHByaXZhdGVcbiAgICAgKi9cbiAgICBtYXliZVJlY29ubmVjdE9uT3BlbigpIHtcbiAgICAgICAgLy8gT25seSB0cnkgdG8gcmVjb25uZWN0IGlmIGl0J3MgdGhlIGZpcnN0IHRpbWUgd2UncmUgY29ubmVjdGluZ1xuICAgICAgICBpZiAoIXRoaXMuX3JlY29ubmVjdGluZyAmJlxuICAgICAgICAgICAgdGhpcy5fcmVjb25uZWN0aW9uICYmXG4gICAgICAgICAgICB0aGlzLmJhY2tvZmYuYXR0ZW1wdHMgPT09IDApIHtcbiAgICAgICAgICAgIC8vIGtlZXBzIHJlY29ubmVjdGlvbiBmcm9tIGZpcmluZyB0d2ljZSBmb3IgdGhlIHNhbWUgcmVjb25uZWN0aW9uIGxvb3BcbiAgICAgICAgICAgIHRoaXMucmVjb25uZWN0KCk7XG4gICAgICAgIH1cbiAgICB9XG4gICAgLyoqXG4gICAgICogU2V0cyB0aGUgY3VycmVudCB0cmFuc3BvcnQgYHNvY2tldGAuXG4gICAgICpcbiAgICAgKiBAcGFyYW0ge0Z1bmN0aW9ufSBmbiAtIG9wdGlvbmFsLCBjYWxsYmFja1xuICAgICAqIEByZXR1cm4gc2VsZlxuICAgICAqIEBwdWJsaWNcbiAgICAgKi9cbiAgICBvcGVuKGZuKSB7XG4gICAgICAgIGlmICh+dGhpcy5fcmVhZHlTdGF0ZS5pbmRleE9mKFwib3BlblwiKSlcbiAgICAgICAgICAgIHJldHVybiB0aGlzO1xuICAgICAgICB0aGlzLmVuZ2luZSA9IG5ldyBFbmdpbmUodGhpcy51cmksIHRoaXMub3B0cyk7XG4gICAgICAgIGNvbnN0IHNvY2tldCA9IHRoaXMuZW5naW5lO1xuICAgICAgICBjb25zdCBzZWxmID0gdGhpcztcbiAgICAgICAgdGhpcy5fcmVhZHlTdGF0ZSA9IFwib3BlbmluZ1wiO1xuICAgICAgICB0aGlzLnNraXBSZWNvbm5lY3QgPSBmYWxzZTtcbiAgICAgICAgLy8gZW1pdCBgb3BlbmBcbiAgICAgICAgY29uc3Qgb3BlblN1YkRlc3Ryb3kgPSBvbihzb2NrZXQsIFwib3BlblwiLCBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICBzZWxmLm9ub3BlbigpO1xuICAgICAgICAgICAgZm4gJiYgZm4oKTtcbiAgICAgICAgfSk7XG4gICAgICAgIC8vIGVtaXQgYGVycm9yYFxuICAgICAgICBjb25zdCBlcnJvclN1YiA9IG9uKHNvY2tldCwgXCJlcnJvclwiLCAoZXJyKSA9PiB7XG4gICAgICAgICAgICBzZWxmLmNsZWFudXAoKTtcbiAgICAgICAgICAgIHNlbGYuX3JlYWR5U3RhdGUgPSBcImNsb3NlZFwiO1xuICAgICAgICAgICAgdGhpcy5lbWl0UmVzZXJ2ZWQoXCJlcnJvclwiLCBlcnIpO1xuICAgICAgICAgICAgaWYgKGZuKSB7XG4gICAgICAgICAgICAgICAgZm4oZXJyKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgICAgIC8vIE9ubHkgZG8gdGhpcyBpZiB0aGVyZSBpcyBubyBmbiB0byBoYW5kbGUgdGhlIGVycm9yXG4gICAgICAgICAgICAgICAgc2VsZi5tYXliZVJlY29ubmVjdE9uT3BlbigpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9KTtcbiAgICAgICAgaWYgKGZhbHNlICE9PSB0aGlzLl90aW1lb3V0KSB7XG4gICAgICAgICAgICBjb25zdCB0aW1lb3V0ID0gdGhpcy5fdGltZW91dDtcbiAgICAgICAgICAgIGlmICh0aW1lb3V0ID09PSAwKSB7XG4gICAgICAgICAgICAgICAgb3BlblN1YkRlc3Ryb3koKTsgLy8gcHJldmVudHMgYSByYWNlIGNvbmRpdGlvbiB3aXRoIHRoZSAnb3BlbicgZXZlbnRcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIC8vIHNldCB0aW1lclxuICAgICAgICAgICAgY29uc3QgdGltZXIgPSB0aGlzLnNldFRpbWVvdXRGbigoKSA9PiB7XG4gICAgICAgICAgICAgICAgb3BlblN1YkRlc3Ryb3koKTtcbiAgICAgICAgICAgICAgICBzb2NrZXQuY2xvc2UoKTtcbiAgICAgICAgICAgICAgICAvLyBAdHMtaWdub3JlXG4gICAgICAgICAgICAgICAgc29ja2V0LmVtaXQoXCJlcnJvclwiLCBuZXcgRXJyb3IoXCJ0aW1lb3V0XCIpKTtcbiAgICAgICAgICAgIH0sIHRpbWVvdXQpO1xuICAgICAgICAgICAgaWYgKHRoaXMub3B0cy5hdXRvVW5yZWYpIHtcbiAgICAgICAgICAgICAgICB0aW1lci51bnJlZigpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgdGhpcy5zdWJzLnB1c2goZnVuY3Rpb24gc3ViRGVzdHJveSgpIHtcbiAgICAgICAgICAgICAgICBjbGVhclRpbWVvdXQodGltZXIpO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgIH1cbiAgICAgICAgdGhpcy5zdWJzLnB1c2gob3BlblN1YkRlc3Ryb3kpO1xuICAgICAgICB0aGlzLnN1YnMucHVzaChlcnJvclN1Yik7XG4gICAgICAgIHJldHVybiB0aGlzO1xuICAgIH1cbiAgICAvKipcbiAgICAgKiBBbGlhcyBmb3Igb3BlbigpXG4gICAgICpcbiAgICAgKiBAcmV0dXJuIHNlbGZcbiAgICAgKiBAcHVibGljXG4gICAgICovXG4gICAgY29ubmVjdChmbikge1xuICAgICAgICByZXR1cm4gdGhpcy5vcGVuKGZuKTtcbiAgICB9XG4gICAgLyoqXG4gICAgICogQ2FsbGVkIHVwb24gdHJhbnNwb3J0IG9wZW4uXG4gICAgICpcbiAgICAgKiBAcHJpdmF0ZVxuICAgICAqL1xuICAgIG9ub3BlbigpIHtcbiAgICAgICAgLy8gY2xlYXIgb2xkIHN1YnNcbiAgICAgICAgdGhpcy5jbGVhbnVwKCk7XG4gICAgICAgIC8vIG1hcmsgYXMgb3BlblxuICAgICAgICB0aGlzLl9yZWFkeVN0YXRlID0gXCJvcGVuXCI7XG4gICAgICAgIHRoaXMuZW1pdFJlc2VydmVkKFwib3BlblwiKTtcbiAgICAgICAgLy8gYWRkIG5ldyBzdWJzXG4gICAgICAgIGNvbnN0IHNvY2tldCA9IHRoaXMuZW5naW5lO1xuICAgICAgICB0aGlzLnN1YnMucHVzaChvbihzb2NrZXQsIFwicGluZ1wiLCB0aGlzLm9ucGluZy5iaW5kKHRoaXMpKSwgb24oc29ja2V0LCBcImRhdGFcIiwgdGhpcy5vbmRhdGEuYmluZCh0aGlzKSksIG9uKHNvY2tldCwgXCJlcnJvclwiLCB0aGlzLm9uZXJyb3IuYmluZCh0aGlzKSksIG9uKHNvY2tldCwgXCJjbG9zZVwiLCB0aGlzLm9uY2xvc2UuYmluZCh0aGlzKSksIG9uKHRoaXMuZGVjb2RlciwgXCJkZWNvZGVkXCIsIHRoaXMub25kZWNvZGVkLmJpbmQodGhpcykpKTtcbiAgICB9XG4gICAgLyoqXG4gICAgICogQ2FsbGVkIHVwb24gYSBwaW5nLlxuICAgICAqXG4gICAgICogQHByaXZhdGVcbiAgICAgKi9cbiAgICBvbnBpbmcoKSB7XG4gICAgICAgIHRoaXMuZW1pdFJlc2VydmVkKFwicGluZ1wiKTtcbiAgICB9XG4gICAgLyoqXG4gICAgICogQ2FsbGVkIHdpdGggZGF0YS5cbiAgICAgKlxuICAgICAqIEBwcml2YXRlXG4gICAgICovXG4gICAgb25kYXRhKGRhdGEpIHtcbiAgICAgICAgdHJ5IHtcbiAgICAgICAgICAgIHRoaXMuZGVjb2Rlci5hZGQoZGF0YSk7XG4gICAgICAgIH1cbiAgICAgICAgY2F0Y2ggKGUpIHtcbiAgICAgICAgICAgIHRoaXMub25jbG9zZShcInBhcnNlIGVycm9yXCIpO1xuICAgICAgICB9XG4gICAgfVxuICAgIC8qKlxuICAgICAqIENhbGxlZCB3aGVuIHBhcnNlciBmdWxseSBkZWNvZGVzIGEgcGFja2V0LlxuICAgICAqXG4gICAgICogQHByaXZhdGVcbiAgICAgKi9cbiAgICBvbmRlY29kZWQocGFja2V0KSB7XG4gICAgICAgIHRoaXMuZW1pdFJlc2VydmVkKFwicGFja2V0XCIsIHBhY2tldCk7XG4gICAgfVxuICAgIC8qKlxuICAgICAqIENhbGxlZCB1cG9uIHNvY2tldCBlcnJvci5cbiAgICAgKlxuICAgICAqIEBwcml2YXRlXG4gICAgICovXG4gICAgb25lcnJvcihlcnIpIHtcbiAgICAgICAgdGhpcy5lbWl0UmVzZXJ2ZWQoXCJlcnJvclwiLCBlcnIpO1xuICAgIH1cbiAgICAvKipcbiAgICAgKiBDcmVhdGVzIGEgbmV3IHNvY2tldCBmb3IgdGhlIGdpdmVuIGBuc3BgLlxuICAgICAqXG4gICAgICogQHJldHVybiB7U29ja2V0fVxuICAgICAqIEBwdWJsaWNcbiAgICAgKi9cbiAgICBzb2NrZXQobnNwLCBvcHRzKSB7XG4gICAgICAgIGxldCBzb2NrZXQgPSB0aGlzLm5zcHNbbnNwXTtcbiAgICAgICAgaWYgKCFzb2NrZXQpIHtcbiAgICAgICAgICAgIHNvY2tldCA9IG5ldyBTb2NrZXQodGhpcywgbnNwLCBvcHRzKTtcbiAgICAgICAgICAgIHRoaXMubnNwc1tuc3BdID0gc29ja2V0O1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiBzb2NrZXQ7XG4gICAgfVxuICAgIC8qKlxuICAgICAqIENhbGxlZCB1cG9uIGEgc29ja2V0IGNsb3NlLlxuICAgICAqXG4gICAgICogQHBhcmFtIHNvY2tldFxuICAgICAqIEBwcml2YXRlXG4gICAgICovXG4gICAgX2Rlc3Ryb3koc29ja2V0KSB7XG4gICAgICAgIGNvbnN0IG5zcHMgPSBPYmplY3Qua2V5cyh0aGlzLm5zcHMpO1xuICAgICAgICBmb3IgKGNvbnN0IG5zcCBvZiBuc3BzKSB7XG4gICAgICAgICAgICBjb25zdCBzb2NrZXQgPSB0aGlzLm5zcHNbbnNwXTtcbiAgICAgICAgICAgIGlmIChzb2NrZXQuYWN0aXZlKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIHRoaXMuX2Nsb3NlKCk7XG4gICAgfVxuICAgIC8qKlxuICAgICAqIFdyaXRlcyBhIHBhY2tldC5cbiAgICAgKlxuICAgICAqIEBwYXJhbSBwYWNrZXRcbiAgICAgKiBAcHJpdmF0ZVxuICAgICAqL1xuICAgIF9wYWNrZXQocGFja2V0KSB7XG4gICAgICAgIGNvbnN0IGVuY29kZWRQYWNrZXRzID0gdGhpcy5lbmNvZGVyLmVuY29kZShwYWNrZXQpO1xuICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IGVuY29kZWRQYWNrZXRzLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgICAgICB0aGlzLmVuZ2luZS53cml0ZShlbmNvZGVkUGFja2V0c1tpXSwgcGFja2V0Lm9wdGlvbnMpO1xuICAgICAgICB9XG4gICAgfVxuICAgIC8qKlxuICAgICAqIENsZWFuIHVwIHRyYW5zcG9ydCBzdWJzY3JpcHRpb25zIGFuZCBwYWNrZXQgYnVmZmVyLlxuICAgICAqXG4gICAgICogQHByaXZhdGVcbiAgICAgKi9cbiAgICBjbGVhbnVwKCkge1xuICAgICAgICB0aGlzLnN1YnMuZm9yRWFjaCgoc3ViRGVzdHJveSkgPT4gc3ViRGVzdHJveSgpKTtcbiAgICAgICAgdGhpcy5zdWJzLmxlbmd0aCA9IDA7XG4gICAgICAgIHRoaXMuZGVjb2Rlci5kZXN0cm95KCk7XG4gICAgfVxuICAgIC8qKlxuICAgICAqIENsb3NlIHRoZSBjdXJyZW50IHNvY2tldC5cbiAgICAgKlxuICAgICAqIEBwcml2YXRlXG4gICAgICovXG4gICAgX2Nsb3NlKCkge1xuICAgICAgICB0aGlzLnNraXBSZWNvbm5lY3QgPSB0cnVlO1xuICAgICAgICB0aGlzLl9yZWNvbm5lY3RpbmcgPSBmYWxzZTtcbiAgICAgICAgdGhpcy5vbmNsb3NlKFwiZm9yY2VkIGNsb3NlXCIpO1xuICAgICAgICBpZiAodGhpcy5lbmdpbmUpXG4gICAgICAgICAgICB0aGlzLmVuZ2luZS5jbG9zZSgpO1xuICAgIH1cbiAgICAvKipcbiAgICAgKiBBbGlhcyBmb3IgY2xvc2UoKVxuICAgICAqXG4gICAgICogQHByaXZhdGVcbiAgICAgKi9cbiAgICBkaXNjb25uZWN0KCkge1xuICAgICAgICByZXR1cm4gdGhpcy5fY2xvc2UoKTtcbiAgICB9XG4gICAgLyoqXG4gICAgICogQ2FsbGVkIHVwb24gZW5naW5lIGNsb3NlLlxuICAgICAqXG4gICAgICogQHByaXZhdGVcbiAgICAgKi9cbiAgICBvbmNsb3NlKHJlYXNvbiwgZGVzY3JpcHRpb24pIHtcbiAgICAgICAgdGhpcy5jbGVhbnVwKCk7XG4gICAgICAgIHRoaXMuYmFja29mZi5yZXNldCgpO1xuICAgICAgICB0aGlzLl9yZWFkeVN0YXRlID0gXCJjbG9zZWRcIjtcbiAgICAgICAgdGhpcy5lbWl0UmVzZXJ2ZWQoXCJjbG9zZVwiLCByZWFzb24sIGRlc2NyaXB0aW9uKTtcbiAgICAgICAgaWYgKHRoaXMuX3JlY29ubmVjdGlvbiAmJiAhdGhpcy5za2lwUmVjb25uZWN0KSB7XG4gICAgICAgICAgICB0aGlzLnJlY29ubmVjdCgpO1xuICAgICAgICB9XG4gICAgfVxuICAgIC8qKlxuICAgICAqIEF0dGVtcHQgYSByZWNvbm5lY3Rpb24uXG4gICAgICpcbiAgICAgKiBAcHJpdmF0ZVxuICAgICAqL1xuICAgIHJlY29ubmVjdCgpIHtcbiAgICAgICAgaWYgKHRoaXMuX3JlY29ubmVjdGluZyB8fCB0aGlzLnNraXBSZWNvbm5lY3QpXG4gICAgICAgICAgICByZXR1cm4gdGhpcztcbiAgICAgICAgY29uc3Qgc2VsZiA9IHRoaXM7XG4gICAgICAgIGlmICh0aGlzLmJhY2tvZmYuYXR0ZW1wdHMgPj0gdGhpcy5fcmVjb25uZWN0aW9uQXR0ZW1wdHMpIHtcbiAgICAgICAgICAgIHRoaXMuYmFja29mZi5yZXNldCgpO1xuICAgICAgICAgICAgdGhpcy5lbWl0UmVzZXJ2ZWQoXCJyZWNvbm5lY3RfZmFpbGVkXCIpO1xuICAgICAgICAgICAgdGhpcy5fcmVjb25uZWN0aW5nID0gZmFsc2U7XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICBjb25zdCBkZWxheSA9IHRoaXMuYmFja29mZi5kdXJhdGlvbigpO1xuICAgICAgICAgICAgdGhpcy5fcmVjb25uZWN0aW5nID0gdHJ1ZTtcbiAgICAgICAgICAgIGNvbnN0IHRpbWVyID0gdGhpcy5zZXRUaW1lb3V0Rm4oKCkgPT4ge1xuICAgICAgICAgICAgICAgIGlmIChzZWxmLnNraXBSZWNvbm5lY3QpXG4gICAgICAgICAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICAgICAgICB0aGlzLmVtaXRSZXNlcnZlZChcInJlY29ubmVjdF9hdHRlbXB0XCIsIHNlbGYuYmFja29mZi5hdHRlbXB0cyk7XG4gICAgICAgICAgICAgICAgLy8gY2hlY2sgYWdhaW4gZm9yIHRoZSBjYXNlIHNvY2tldCBjbG9zZWQgaW4gYWJvdmUgZXZlbnRzXG4gICAgICAgICAgICAgICAgaWYgKHNlbGYuc2tpcFJlY29ubmVjdClcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAgICAgICAgIHNlbGYub3BlbigoZXJyKSA9PiB7XG4gICAgICAgICAgICAgICAgICAgIGlmIChlcnIpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHNlbGYuX3JlY29ubmVjdGluZyA9IGZhbHNlO1xuICAgICAgICAgICAgICAgICAgICAgICAgc2VsZi5yZWNvbm5lY3QoKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuZW1pdFJlc2VydmVkKFwicmVjb25uZWN0X2Vycm9yXCIsIGVycik7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBzZWxmLm9ucmVjb25uZWN0KCk7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIH0sIGRlbGF5KTtcbiAgICAgICAgICAgIGlmICh0aGlzLm9wdHMuYXV0b1VucmVmKSB7XG4gICAgICAgICAgICAgICAgdGltZXIudW5yZWYoKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHRoaXMuc3Vicy5wdXNoKGZ1bmN0aW9uIHN1YkRlc3Ryb3koKSB7XG4gICAgICAgICAgICAgICAgY2xlYXJUaW1lb3V0KHRpbWVyKTtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9XG4gICAgfVxuICAgIC8qKlxuICAgICAqIENhbGxlZCB1cG9uIHN1Y2Nlc3NmdWwgcmVjb25uZWN0LlxuICAgICAqXG4gICAgICogQHByaXZhdGVcbiAgICAgKi9cbiAgICBvbnJlY29ubmVjdCgpIHtcbiAgICAgICAgY29uc3QgYXR0ZW1wdCA9IHRoaXMuYmFja29mZi5hdHRlbXB0cztcbiAgICAgICAgdGhpcy5fcmVjb25uZWN0aW5nID0gZmFsc2U7XG4gICAgICAgIHRoaXMuYmFja29mZi5yZXNldCgpO1xuICAgICAgICB0aGlzLmVtaXRSZXNlcnZlZChcInJlY29ubmVjdFwiLCBhdHRlbXB0KTtcbiAgICB9XG59XG4iLCAiaW1wb3J0IHsgdXJsIH0gZnJvbSBcIi4vdXJsLmpzXCI7XG5pbXBvcnQgeyBNYW5hZ2VyIH0gZnJvbSBcIi4vbWFuYWdlci5qc1wiO1xuaW1wb3J0IHsgU29ja2V0IH0gZnJvbSBcIi4vc29ja2V0LmpzXCI7XG4vKipcbiAqIE1hbmFnZXJzIGNhY2hlLlxuICovXG5jb25zdCBjYWNoZSA9IHt9O1xuZnVuY3Rpb24gbG9va3VwKHVyaSwgb3B0cykge1xuICAgIGlmICh0eXBlb2YgdXJpID09PSBcIm9iamVjdFwiKSB7XG4gICAgICAgIG9wdHMgPSB1cmk7XG4gICAgICAgIHVyaSA9IHVuZGVmaW5lZDtcbiAgICB9XG4gICAgb3B0cyA9IG9wdHMgfHwge307XG4gICAgY29uc3QgcGFyc2VkID0gdXJsKHVyaSwgb3B0cy5wYXRoIHx8IFwiL3NvY2tldC5pb1wiKTtcbiAgICBjb25zdCBzb3VyY2UgPSBwYXJzZWQuc291cmNlO1xuICAgIGNvbnN0IGlkID0gcGFyc2VkLmlkO1xuICAgIGNvbnN0IHBhdGggPSBwYXJzZWQucGF0aDtcbiAgICBjb25zdCBzYW1lTmFtZXNwYWNlID0gY2FjaGVbaWRdICYmIHBhdGggaW4gY2FjaGVbaWRdW1wibnNwc1wiXTtcbiAgICBjb25zdCBuZXdDb25uZWN0aW9uID0gb3B0cy5mb3JjZU5ldyB8fFxuICAgICAgICBvcHRzW1wiZm9yY2UgbmV3IGNvbm5lY3Rpb25cIl0gfHxcbiAgICAgICAgZmFsc2UgPT09IG9wdHMubXVsdGlwbGV4IHx8XG4gICAgICAgIHNhbWVOYW1lc3BhY2U7XG4gICAgbGV0IGlvO1xuICAgIGlmIChuZXdDb25uZWN0aW9uKSB7XG4gICAgICAgIGlvID0gbmV3IE1hbmFnZXIoc291cmNlLCBvcHRzKTtcbiAgICB9XG4gICAgZWxzZSB7XG4gICAgICAgIGlmICghY2FjaGVbaWRdKSB7XG4gICAgICAgICAgICBjYWNoZVtpZF0gPSBuZXcgTWFuYWdlcihzb3VyY2UsIG9wdHMpO1xuICAgICAgICB9XG4gICAgICAgIGlvID0gY2FjaGVbaWRdO1xuICAgIH1cbiAgICBpZiAocGFyc2VkLnF1ZXJ5ICYmICFvcHRzLnF1ZXJ5KSB7XG4gICAgICAgIG9wdHMucXVlcnkgPSBwYXJzZWQucXVlcnlLZXk7XG4gICAgfVxuICAgIHJldHVybiBpby5zb2NrZXQocGFyc2VkLnBhdGgsIG9wdHMpO1xufVxuLy8gc28gdGhhdCBcImxvb2t1cFwiIGNhbiBiZSB1c2VkIGJvdGggYXMgYSBmdW5jdGlvbiAoZS5nLiBgaW8oLi4uKWApIGFuZCBhcyBhXG4vLyBuYW1lc3BhY2UgKGUuZy4gYGlvLmNvbm5lY3QoLi4uKWApLCBmb3IgYmFja3dhcmQgY29tcGF0aWJpbGl0eVxuT2JqZWN0LmFzc2lnbihsb29rdXAsIHtcbiAgICBNYW5hZ2VyLFxuICAgIFNvY2tldCxcbiAgICBpbzogbG9va3VwLFxuICAgIGNvbm5lY3Q6IGxvb2t1cCxcbn0pO1xuLyoqXG4gKiBQcm90b2NvbCB2ZXJzaW9uLlxuICpcbiAqIEBwdWJsaWNcbiAqL1xuZXhwb3J0IHsgcHJvdG9jb2wgfSBmcm9tIFwic29ja2V0LmlvLXBhcnNlclwiO1xuLyoqXG4gKiBFeHBvc2UgY29uc3RydWN0b3JzIGZvciBzdGFuZGFsb25lIGJ1aWxkLlxuICpcbiAqIEBwdWJsaWNcbiAqL1xuZXhwb3J0IHsgTWFuYWdlciwgU29ja2V0LCBsb29rdXAgYXMgaW8sIGxvb2t1cCBhcyBjb25uZWN0LCBsb29rdXAgYXMgZGVmYXVsdCwgfTtcbiIsICJpbXBvcnQgYXhpb3MgZnJvbSAnYXhpb3MnO1xuaW1wb3J0IHsgZ2FtZXNMaXN0LCBzZXRHYW1lc0xpc3QgfSBmcm9tICcuLi9kYXNoYm9hcmQnO1xuXG4vLyA9PT0gR0VUIHJvdXRlcyA9PT0gLy9cblxuZXhwb3J0IGFzeW5jIGZ1bmN0aW9uIGdldEdhbWVzKCkge1xuICAgIHRyeSB7XG4gICAgICAgIGNvbnN0IHJlcyA9IGF3YWl0IGF4aW9zLmdldCgnL2FwaS9kYXNoYm9hcmQnKTtcbiAgICAgICAgZ2FtZXNMaXN0LnZhbHVlID0gcmVzLmRhdGE7XG4gICAgICAgIHNldEdhbWVzTGlzdCgpO1xuICAgIH0gY2F0Y2ggKGVycikge1xuICAgICAgICBjb25zb2xlLmxvZyhlcnIpO1xuICAgIH1cbn1cblxuZXhwb3J0IGFzeW5jIGZ1bmN0aW9uIGdldFByZXZHYW1lKCkge1xuICAgIHRyeSB7XG4gICAgICAgIGNvbnN0IHJlcyA9IGF3YWl0IGF4aW9zLmdldCgnL2FwaS9kYXNoYm9hcmQvcHJldicpO1xuICAgICAgICByZXR1cm4gcmVzLmRhdGFbMF07XG4gICAgfSBjYXRjaCAoZXJyKSB7XG4gICAgICAgIGNvbnNvbGUubG9nKGVycik7XG4gICAgfVxufVxuXG4vLyA9PT0gUE9TVCByb3V0ZXMgPT09IC8vXG5cbmV4cG9ydCBhc3luYyBmdW5jdGlvbiBhZGRHYW1lKHBheWxvYWQ6IGFueSkge1xuICAgIHRyeSB7XG4gICAgICAgIGF3YWl0IGF4aW9zLnBvc3QoJy9hcGkvZGFzaGJvYXJkJywgcGF5bG9hZCk7XG4gICAgICAgIGdldEdhbWVzKCk7XG4gICAgfSBjYXRjaCAoZXJyKSB7XG4gICAgICAgIGNvbnNvbGUubG9nKGVycik7XG4gICAgfVxufVxuXG5leHBvcnQgYXN5bmMgZnVuY3Rpb24gYWRkUHJldkdhbWUocGF5bG9hZDogYW55KSB7XG4gICAgdHJ5IHtcbiAgICAgICAgYXdhaXQgYXhpb3MuZGVsZXRlKCcvYXBpL2Rhc2hib2FyZC9wcmV2JywgcGF5bG9hZCk7XG4gICAgICAgIGF3YWl0IGF4aW9zLnBvc3QoJy9hcGkvZGFzaGJvYXJkL3ByZXYnLCBwYXlsb2FkKTtcbiAgICB9IGNhdGNoIChlcnIpIHtcbiAgICAgICAgY29uc29sZS5sb2coZXJyKTtcbiAgICB9XG59IiwgImltcG9ydCBheGlvcyBmcm9tICdheGlvcyc7XG5pbXBvcnQgeyBjdXN0b21DcmVhdHVyZXMsIGNyZWF0dXJlcywgY3JlYXR1cmVzT3BlbiwgdG9nZ2xlQ3JlYXR1cmVzV2luZG93IH0gZnJvbSAnLi4vY3JlYXR1cmVzJztcbmltcG9ydCB7IGdldEFjdGlvbkRlc2MsIHNlcGFyYXRlRG1nUm9sbCB9IGZyb20gJy4uL2NyZWF0dXJlLXN0YXRzJztcblxuLy8gPT09IEdFVCByb3V0ZXMgPT09IC8vXG5cbmV4cG9ydCBhc3luYyBmdW5jdGlvbiBnZXRDcmVhdHVyZXMoKSB7XG4gICAgdHJ5IHtcbiAgICAgICAgY29uc3QgcmVzID0gYXdhaXQgYXhpb3MuZ2V0KCdodHRwczovL3d3dy5kbmQ1ZWFwaS5jby9hcGkvbW9uc3RlcnMnKTtcbiAgICAgICAgY3JlYXR1cmVzLnZhbHVlID0gcmVzLmRhdGEucmVzdWx0cztcbiAgICB9IGNhdGNoIChlcnIpIHtcbiAgICAgICAgY29uc29sZS5sb2coZXJyKTtcbiAgICB9XG59XG5cbmV4cG9ydCBhc3luYyBmdW5jdGlvbiBnZXRDcmVhdHVyZUJ5SW5kZXgoaW5kZXg6IHN0cmluZywgY3VzdG9tOiBib29sZWFuKSB7XG4gICAgdHJ5IHtcbiAgICAgICAgaWYgKGN1c3RvbSkge1xuICAgICAgICAgICAgY29uc3QgcmVzID0gYXdhaXQgYXhpb3MuZ2V0KGAvYXBpL2NyZWF0dXJlcy8ke2luZGV4fWApO1xuICAgICAgICAgICAgcmV0dXJuIG1vZGlmeVJlc3BvbnNlQ3JlYXR1cmUocmVzKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIGNvbnN0IHJlcyA9IGF3YWl0IGF4aW9zLmdldChgaHR0cHM6Ly93d3cuZG5kNWVhcGkuY28vYXBpL21vbnN0ZXJzLyR7aW5kZXh9YCk7XG4gICAgICAgICAgICByZXR1cm4gbW9kaWZ5UmVzcG9uc2VTdGFuZGFyZENyZWF0dXJlKHJlcyk7XG4gICAgICAgIH1cbiAgICB9IGNhdGNoIChlcnIpIHtcbiAgICAgICAgY29uc29sZS5sb2coZXJyKTtcbiAgICB9XG59XG5cbmZ1bmN0aW9uIG1vZGlmeVJlc3BvbnNlU3RhbmRhcmRDcmVhdHVyZShyZXM6IGFueSkge1xuICAgIC8vIEdldHMgYWxsIHRoZSBhcnJheXMgb2YgY3JlYXR1cmUgZGF0YVxuICAgIGNvbnN0IHsgcHJvZmljaWVuY2llcywgY29uZGl0aW9uX2ltbXVuaXRpZXMsIHNlbnNlcywgc3BlY2lhbF9hYmlsaXRpZXMsIGFjdGlvbnMsIGxlZ2VuZGFyeV9hY3Rpb25zIH0gPSBzZXBhcmF0ZVN0YW5kYXJkQ3JlYXR1cmVSZXNwb25zZShyZXMuZGF0YSk7XG4gICAgY29uc3QgbW9kaWZpZWRSZXMgPSBuZXcgQ3JlYXR1cmUoXG4gICAgICAgIG51bGwsXG4gICAgICAgIG51bGwsXG4gICAgICAgIHJlcy5kYXRhLmluZGV4LFxuICAgICAgICByZXMuZGF0YS5uYW1lLFxuICAgICAgICByZXMuZGF0YS5zaXplLFxuICAgICAgICByZXMuZGF0YS50eXBlLFxuICAgICAgICByZXMuZGF0YS5hbGlnbm1lbnQsXG4gICAgICAgIHJlcy5kYXRhLmFybW9yX2NsYXNzLFxuICAgICAgICByZXMuZGF0YS5oaXRfcG9pbnRzLFxuICAgICAgICByZXMuZGF0YS5oaXRfZGljZSxcbiAgICAgICAgcmVzLmRhdGEuc3RyZW5ndGgsXG4gICAgICAgIHJlcy5kYXRhLmRleHRlcml0eSxcbiAgICAgICAgcmVzLmRhdGEuY29uc3RpdHV0aW9uLFxuICAgICAgICByZXMuZGF0YS5pbnRlbGxpZ2VuY2UsXG4gICAgICAgIHJlcy5kYXRhLndpc2RvbSxcbiAgICAgICAgcmVzLmRhdGEuY2hhcmlzbWEsXG4gICAgICAgIHJlcy5kYXRhLmNoYWxsZW5nZV9yYXRpbmcsXG4gICAgICAgIHJlcy5kYXRhLnhwLFxuICAgICAgICByZXMuZGF0YS5sYW5ndWFnZXMsXG4gICAgICAgIHJlbW92ZVVuaXRGcm9tU3RyaW5nKHJlcy5kYXRhLnNwZWVkLndhbGspLFxuICAgICAgICByZW1vdmVVbml0RnJvbVN0cmluZyhyZXMuZGF0YS5zcGVlZC5zd2ltKSxcbiAgICAgICAgcmVtb3ZlVW5pdEZyb21TdHJpbmcocmVzLmRhdGEuc3BlZWQuYnVycm93KSxcbiAgICAgICAgcmVtb3ZlVW5pdEZyb21TdHJpbmcocmVzLmRhdGEuc3BlZWQuZmx5KSxcbiAgICAgICAgcmVtb3ZlVW5pdEZyb21TdHJpbmcocmVzLmRhdGEuc3BlZWQuY2xpbWIpLFxuICAgICAgICBwcm9maWNpZW5jaWVzLFxuICAgICAgICByZXMuZGF0YS5kYW1hZ2VfdnVsbmVyYWJpbGl0aWVzLFxuICAgICAgICByZXMuZGF0YS5kYW1hZ2VfcmVzaXN0YW5jZXMsXG4gICAgICAgIHJlcy5kYXRhLmRhbWFnZV9pbW11bml0aWVzLFxuICAgICAgICBjb25kaXRpb25faW1tdW5pdGllcyxcbiAgICAgICAgc2Vuc2VzLFxuICAgICAgICBzcGVjaWFsX2FiaWxpdGllcyxcbiAgICAgICAgYWN0aW9ucyxcbiAgICAgICAgbGVnZW5kYXJ5X2FjdGlvbnNcbiAgICApO1xuICAgIGNvbnNvbGUubG9nKG1vZGlmaWVkUmVzKTtcbiAgICByZXR1cm4gbW9kaWZpZWRSZXM7XG59XG5cbmZ1bmN0aW9uIHNlcGFyYXRlU3RhbmRhcmRDcmVhdHVyZVJlc3BvbnNlKHJlczogYW55KSB7XG4gICAgY29uc3QgcHJvZmljaWVuY2llcyA9IGdldENyZWF0dXJlUHJvZmljaWVuY2llcyhyZXMucHJvZmljaWVuY2llcyk7XG4gICAgY29uc3QgY29uZGl0aW9uX2ltbXVuaXRpZXMgPSBnZXRDcmVhdHVyZUNvbmRpdGlvbkltbXVuaXRpZXMocmVzLmNvbmRpdGlvbl9pbW11bml0aWVzKTtcbiAgICBjb25zdCBzZW5zZXMgPSBnZXRDcmVhdHVyZVNlbnNlcyhyZXMuc2Vuc2VzKTtcbiAgICBjb25zdCBzcGVjaWFsX2FiaWxpdGllcyA9IGdldENyZWF0dXJlQWJpbGl0aWVzKHJlcy5zcGVjaWFsX2FiaWxpdGllcyk7XG4gICAgY29uc3QgYWN0aW9ucyA9IGdldENyZWF0dXJlQWN0aW9ucyhyZXMuYWN0aW9ucyk7XG4gICAgY29uc3QgbGVnZW5kYXJ5X2FjdGlvbnMgPSBnZXRDcmVhdHVyZUxlZ2VuZGFyeUFjdGlvbnMocmVzLmxlZ2VuZGFyeV9hY3Rpb25zKTtcblxuICAgIHJldHVybiB7cHJvZmljaWVuY2llczogcHJvZmljaWVuY2llcywgY29uZGl0aW9uX2ltbXVuaXRpZXM6IGNvbmRpdGlvbl9pbW11bml0aWVzLCBzZW5zZXM6IHNlbnNlcywgc3BlY2lhbF9hYmlsaXRpZXM6IHNwZWNpYWxfYWJpbGl0aWVzLCBhY3Rpb25zOiBhY3Rpb25zLCBsZWdlbmRhcnlfYWN0aW9uczogbGVnZW5kYXJ5X2FjdGlvbnN9O1xufVxuXG5mdW5jdGlvbiBnZXRDcmVhdHVyZVByb2ZpY2llbmNpZXMoX3Byb2ZpY2llbmNpZXM6IGFueSkge1xuICAgIGxldCBwcm9maWNpZW5jaWVzID0gW107XG4gICAgaWYgKF9wcm9maWNpZW5jaWVzLmxlbmd0aCA+IDApIHtcbiAgICAgICAgX3Byb2ZpY2llbmNpZXMuZm9yRWFjaCgocHJvZjogYW55KSA9PiB7XG4gICAgICAgICAgICBwcm9maWNpZW5jaWVzLnB1c2goe25hbWU6IHByb2YucHJvZmljaWVuY3kubmFtZSwgdmFsdWU6IHByb2YudmFsdWV9KTtcbiAgICAgICAgfSk7XG4gICAgfVxuICAgIHJldHVybiBwcm9maWNpZW5jaWVzO1xufVxuXG5mdW5jdGlvbiBnZXRDcmVhdHVyZUNvbmRpdGlvbkltbXVuaXRpZXMoX2NvbmRpdGlvbl9pbW11bml0aWVzOiBhbnkpIHtcbiAgICBsZXQgY29uZGl0aW9uX2ltbXVuaXRpZXMgPSBbXTtcbiAgICBpZiAoX2NvbmRpdGlvbl9pbW11bml0aWVzLmxlbmd0aCA+IDApIHtcbiAgICAgICAgX2NvbmRpdGlvbl9pbW11bml0aWVzLmZvckVhY2goKGltbXVuaXR5OiBhbnkpID0+IHtcbiAgICAgICAgICAgIGNvbmRpdGlvbl9pbW11bml0aWVzLnB1c2goaW1tdW5pdHkubmFtZSk7XG4gICAgICAgIH0pO1xuICAgIH1cbiAgICByZXR1cm4gY29uZGl0aW9uX2ltbXVuaXRpZXM7XG59XG5cbmZ1bmN0aW9uIGdldENyZWF0dXJlU2Vuc2VzKF9zZW5zZXMpIHsgXG4gICAgbGV0IHNlbnNlcyA9IFtdOyAgIFxuICAgIGlmIChfc2Vuc2VzLmRhcmt2aXNpb24pIHNlbnNlcy5wdXNoKHtuYW1lOiAnRGFya3Zpc2lvbicsIHZhbHVlOiByZW1vdmVVbml0RnJvbVN0cmluZyhfc2Vuc2VzLmRhcmt2aXNpb24pfSk7XG4gICAgaWYgKF9zZW5zZXMuYmxpbmRzaWdodCkgc2Vuc2VzLnB1c2goe25hbWU6ICdCbGluZHNpZ2h0JywgdmFsdWU6IHJlbW92ZVVuaXRGcm9tU3RyaW5nKF9zZW5zZXMuYmxpbmRzaWdodCl9KTtcbiAgICBpZiAoX3NlbnNlcy50cmVtb3JzZW5zZSkgc2Vuc2VzLnB1c2goe25hbWU6ICdUcmVtb3JzZW5zZScsIHZhbHVlOiByZW1vdmVVbml0RnJvbVN0cmluZyhfc2Vuc2VzLnRyZW1vcnNlbnNlKX0pO1xuICAgIGlmIChfc2Vuc2VzLnRydWVzaWdodCkgc2Vuc2VzLnB1c2goe25hbWU6ICdUcnVlc2lnaHQnLCB2YWx1ZTogcmVtb3ZlVW5pdEZyb21TdHJpbmcoX3NlbnNlcy50cnVlc2lnaHQpfSk7XG4gICAgaWYgKF9zZW5zZXMucGFzc2l2ZV9wZXJjZXB0aW9uKSBzZW5zZXMucHVzaCh7bmFtZTogJ1Bhc3NpdmUgUGVyY2VwdGlvbicsIHZhbHVlOiBfc2Vuc2VzLnBhc3NpdmVfcGVyY2VwdGlvbn0pO1xuICAgIHJldHVybiBzZW5zZXM7XG59XG5cbmZ1bmN0aW9uIGdldENyZWF0dXJlQWJpbGl0aWVzKF9zcGVjaWFsX2FiaWxpdGllczogYW55KSB7XG4gICAgbGV0IHNwZWNpYWxfYWJpbGl0aWVzID0gW107XG4gICAgaWYgKF9zcGVjaWFsX2FiaWxpdGllcy5sZW5ndGggPiAwKSB7XG4gICAgICAgIF9zcGVjaWFsX2FiaWxpdGllcy5mb3JFYWNoKChhYmlsaXR5OiBhbnkpID0+IHtcbiAgICAgICAgICAgIHNwZWNpYWxfYWJpbGl0aWVzLnB1c2goe25hbWU6IGFiaWxpdHkubmFtZSwgZGVzYzogYWJpbGl0eS5kZXNjLCBkYW1hZ2U6IHN0YW5kYXJkQ3JlYXR1cmVEYW1hZ2UoYWJpbGl0eS5kYW1hZ2UpfSk7XG4gICAgICAgIH0pO1xuICAgIH1cbiAgICByZXR1cm4gc3BlY2lhbF9hYmlsaXRpZXM7XG59XG5cbmZ1bmN0aW9uIGdldENyZWF0dXJlQWN0aW9ucyhfYWN0aW9uczogYW55KSB7XG4gICAgbGV0IGFjdGlvbnMgPSBbXTtcbiAgICBpZiAoX2FjdGlvbnMubGVuZ3RoID4gMCkge1xuICAgICAgICBfYWN0aW9ucy5mb3JFYWNoKChhY3Rpb246IGFueSkgPT4ge1xuICAgICAgICAgICAgYWN0aW9ucy5wdXNoKHtuYW1lOiBhY3Rpb24ubmFtZSwgZGVzYzogYWN0aW9uLmRlc2MsIGF0dGFja19ib251czogYWN0aW9uLmF0dGFja19ib251cywgZGFtYWdlOiBzdGFuZGFyZENyZWF0dXJlRGFtYWdlKGFjdGlvbi5kYW1hZ2UpfSk7XG4gICAgICAgIH0pO1xuICAgIH1cblxuICAgIHJldHVybiBhY3Rpb25zO1xufVxuXG5mdW5jdGlvbiBnZXRDcmVhdHVyZUxlZ2VuZGFyeUFjdGlvbnMoX2xlZ2VuZGFyeV9hY3Rpb25zOiBhbnkpIHtcbiAgICBsZXQgbGVnZW5kYXJ5X2FjdGlvbnMgPSBbXTtcbiAgICBpZiAoX2xlZ2VuZGFyeV9hY3Rpb25zLmxlbmd0aCA+IDApIHtcbiAgICAgICAgX2xlZ2VuZGFyeV9hY3Rpb25zLmZvckVhY2goKGFjdGlvbjogYW55KSA9PiB7XG4gICAgICAgICAgICBsZWdlbmRhcnlfYWN0aW9ucy5wdXNoKHtuYW1lOiBhY3Rpb24ubmFtZSwgZGVzYzogYWN0aW9uLmRlc2MsIGF0dGFja19ib251czogYWN0aW9uLmF0dGFja19ib251cywgZGFtYWdlOiBzdGFuZGFyZENyZWF0dXJlRGFtYWdlKGFjdGlvbi5kYW1hZ2UpfSk7XG4gICAgICAgIH0pO1xuICAgIH1cbiAgICByZXR1cm4gbGVnZW5kYXJ5X2FjdGlvbnM7XG59XG5cbi8vIEdldHMgdGhlIGRhbWFnZSBkaWNlIGFuZCBkYW1hZ2UgdHlwZSBmcm9tIGEgc3RhbmRhcmQgY3JlYXR1cmVcbmZ1bmN0aW9uIHN0YW5kYXJkQ3JlYXR1cmVEYW1hZ2UoZGFtYWdlOiBhbnkpIHtcbiAgICBsZXQgZGFtYWdlcyA9IFtdO1xuICAgIGlmIChkYW1hZ2UpIHtcbiAgICAgICAgZGFtYWdlLmZvckVhY2goKGRtZzogYW55KSA9PiB7XG4gICAgICAgICAgICBpZiAoZG1nLmZyb20pIHtcbiAgICAgICAgICAgICAgICBkbWcuZnJvbS5vcHRpb25zLmZvckVhY2goKGRtZykgPT4ge1xuICAgICAgICAgICAgICAgICAgICBkYW1hZ2VzLnB1c2goe2RhbWFnZURpY2U6IGRtZy5kYW1hZ2VfZGljZSwgZGFtYWdlVHlwZTogZG1nLmRhbWFnZV90eXBlLmluZGV4fSk7XG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIGRhbWFnZXMucHVzaCh7ZGFtYWdlRGljZTogZG1nLmRhbWFnZV9kaWNlLCBkYW1hZ2VUeXBlOiBkbWcuZGFtYWdlX3R5cGUuaW5kZXh9KTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSk7XG4gICAgfVxuICAgIHJldHVybiBkYW1hZ2VzO1xufVxuXG4vLyBSZW1vdmVzIGZ0IGFuZCB0dXJucyByZXR1cm5zIGEgbnVtYmVyIHZhbHVlXG5mdW5jdGlvbiByZW1vdmVVbml0RnJvbVN0cmluZyhzdHJpbmc6IHN0cmluZykge1xuICAgIGxldCB2YWx1ZTogbnVtYmVyO1xuICAgIGlmIChzdHJpbmcpIHtcbiAgICAgICAgdmFsdWUgPSBwYXJzZUludChzdHJpbmcuc3BsaXQoJyAnKVswXSk7XG4gICAgICAgIHJldHVybiB2YWx1ZTtcbiAgICB9XG59XG5cbmZ1bmN0aW9uIG1vZGlmeVJlc3BvbnNlQ3JlYXR1cmUocmVzOiBhbnkpIHtcbiAgICAvLyBHZXRzIGFsbCB0aGUgYXJyYXlzIG9mIGNyZWF0dXJlIGRhdGFcbiAgICBjb25zdCB7IHByb2ZpY2llbmNpZXMsIHZ1bG5lcmFiaWxpdGllcywgcmVzaXN0YW5jZXMsIGRhbWFnZUltbXVuaXRpZXMsIGNvbmRpdGlvbkltbXVuaXRpZXMsIHNlbnNlcywgYWJpbGl0aWVzLCBhY3Rpb25zLCBsZWdBY3Rpb25zIH0gPSBzZXBhcmF0ZUNyZWF0dXJlUmVzcG9uc2UocmVzLmRhdGEpO1xuXG4gICAgY29uc3QgbW9kaWZpZWRSZXMgPSBuZXcgQ3JlYXR1cmUoXG4gICAgICAgIHJlcy5kYXRhWzBdLmlkLFxuICAgICAgICByZXMuZGF0YVswXS51c2VyX2lkLFxuICAgICAgICByZXMuZGF0YVswXS5pbmRleCxcbiAgICAgICAgcmVzLmRhdGFbMF0ubmFtZSxcbiAgICAgICAgcmVzLmRhdGFbMF0uc2l6ZSxcbiAgICAgICAgcmVzLmRhdGFbMF0udHlwZSxcbiAgICAgICAgcmVzLmRhdGFbMF0uYWxpZ25tZW50LFxuICAgICAgICByZXMuZGF0YVswXS5hYyxcbiAgICAgICAgcmVzLmRhdGFbMF0uaGl0X3BvaW50cyxcbiAgICAgICAgcmVzLmRhdGFbMF0uaGl0X2RpY2UsXG4gICAgICAgIHJlcy5kYXRhWzBdLnN0cixcbiAgICAgICAgcmVzLmRhdGFbMF0uZGV4LFxuICAgICAgICByZXMuZGF0YVswXS5jb24sXG4gICAgICAgIHJlcy5kYXRhWzBdLmludCxcbiAgICAgICAgcmVzLmRhdGFbMF0ud2lzLFxuICAgICAgICByZXMuZGF0YVswXS5jaGFyLFxuICAgICAgICByZXMuZGF0YVswXS5jcixcbiAgICAgICAgcmVzLmRhdGFbMF0ueHAsXG4gICAgICAgIHJlcy5kYXRhWzBdLmxpc3QsXG4gICAgICAgIHJlcy5kYXRhWzBdLndhbGtfc3BlZWQsXG4gICAgICAgIHJlcy5kYXRhWzBdLnN3aW1fc3BlZWQsXG4gICAgICAgIHJlcy5kYXRhWzBdLmJ1cnJvd19zcGVlZCxcbiAgICAgICAgcmVzLmRhdGFbMF0uZmx5X3NwZWVkLFxuICAgICAgICByZXMuZGF0YVswXS5jbGltYl9zcGVlZCxcbiAgICAgICAgcHJvZmljaWVuY2llcyxcbiAgICAgICAgdnVsbmVyYWJpbGl0aWVzLFxuICAgICAgICByZXNpc3RhbmNlcyxcbiAgICAgICAgZGFtYWdlSW1tdW5pdGllcyxcbiAgICAgICAgY29uZGl0aW9uSW1tdW5pdGllcyxcbiAgICAgICAgc2Vuc2VzLFxuICAgICAgICBhYmlsaXRpZXMsXG4gICAgICAgIGFjdGlvbnMsXG4gICAgICAgIGxlZ0FjdGlvbnNcbiAgICApO1xuICAgIGNvbnNvbGUubG9nKG1vZGlmaWVkUmVzKTtcbiAgICByZXR1cm4gbW9kaWZpZWRSZXM7XG59XG5cbi8vIFNlcGFyYXRlIGRpZmZlcmVudCBwYXJ0cyBvZiB0aGUgcmVzcG9uc2UgaW50byBhcnJheXNcbmZ1bmN0aW9uIHNlcGFyYXRlQ3JlYXR1cmVSZXNwb25zZShyZXM6IGFueSkge1xuICAgIGxldCB7IHByb2ZpY2llbmNpZXMsIHZ1bG5lcmFiaWxpdGllcywgcmVzaXN0YW5jZXMsIGRhbWFnZUltbXVuaXRpZXMsIGNvbmRpdGlvbkltbXVuaXRpZXMsIHNlbnNlcywgYWJpbGl0aWVzLCBhY3Rpb25zLCBsZWdBY3Rpb25zIH0gPSBnZXRJbml0aWFsQ3JlYXR1cmVBcnJheXMocmVzKTtcbiAgICBcbiAgICBwcm9maWNpZW5jaWVzID0gcmVtb3ZlRXh0cmFDdXN0b21EYXRhKHByb2ZpY2llbmNpZXMsIHRydWUpO1xuICAgIHZ1bG5lcmFiaWxpdGllcyA9IHJlbW92ZUV4dHJhQ3VzdG9tRGF0YSh2dWxuZXJhYmlsaXRpZXMsIGZhbHNlKTtcbiAgICByZXNpc3RhbmNlcyA9IHJlbW92ZUV4dHJhQ3VzdG9tRGF0YShyZXNpc3RhbmNlcywgZmFsc2UpO1xuICAgIGRhbWFnZUltbXVuaXRpZXMgPSByZW1vdmVFeHRyYUN1c3RvbURhdGEoZGFtYWdlSW1tdW5pdGllcywgZmFsc2UpO1xuICAgIGNvbmRpdGlvbkltbXVuaXRpZXMgPSByZW1vdmVFeHRyYUN1c3RvbURhdGEoY29uZGl0aW9uSW1tdW5pdGllcywgZmFsc2UpO1xuICAgIHNlbnNlcyA9IHJlbW92ZUV4dHJhQ3VzdG9tRGF0YShzZW5zZXMsIHRydWUpO1xuICAgIGFiaWxpdGllcyA9IHJlbW92ZUV4dHJhQ3VzdG9tRGF0YShhYmlsaXRpZXMsIHRydWUpO1xuICAgIGFjdGlvbnMgPSByZW1vdmVFeHRyYUN1c3RvbURhdGEoYWN0aW9ucywgdHJ1ZSk7XG4gICAgbGVnQWN0aW9ucyA9IHJlbW92ZUV4dHJhQ3VzdG9tRGF0YShsZWdBY3Rpb25zLCB0cnVlKTtcblxuICAgIC8vIEdldCBhYmlsaXR5IHJvbGxzXG4gICAgbGV0IG1vZGlmaWVkQWJpbGl0aWVzID0gW107XG4gICAgYWJpbGl0aWVzLmZvckVhY2goKGFiaWxpdHkpID0+IHtcbiAgICAgICAgaWYgKGFiaWxpdHkubmFtZSAmJiBhYmlsaXR5LmRlc2MpIHtcbiAgICAgICAgICAgIGNvbnN0IGFiaWxpdHlEYXRhID0gZ2V0QWN0aW9uRGVzYyhhYmlsaXR5LmRlc2MpO1xuICAgICAgICAgICAgbW9kaWZpZWRBYmlsaXRpZXMucHVzaCh7bmFtZTogYWJpbGl0eS5uYW1lLCBkZXNjOiBhYmlsaXR5RGF0YS5kZXNjLCBkYW1hZ2U6IFtzZXBhcmF0ZURtZ1JvbGwoYWJpbGl0eURhdGEucm9sbHMudG9TdHJpbmcoKSldfSk7XG4gICAgICAgIH1cbiAgICB9KTtcbiAgICBhYmlsaXRpZXMgPSBtb2RpZmllZEFiaWxpdGllcztcblxuICAgIC8vIEdldCBhY3Rpb24gcm9sbHNcbiAgICBsZXQgbW9kaWZpZWRBY3Rpb25zID0gW107XG4gICAgYWN0aW9ucy5mb3JFYWNoKChhY3Rpb24pID0+IHtcbiAgICAgICAgaWYgKGFjdGlvbi5uYW1lICYmIGFjdGlvbi5kZXNjKSB7XG4gICAgICAgICAgICBjb25zdCBhY3Rpb25EYXRhID0gZ2V0QWN0aW9uRGVzYyhhY3Rpb24uZGVzYyk7XG4gICAgICAgICAgICBtb2RpZmllZEFjdGlvbnMucHVzaCh7bmFtZTogYWN0aW9uLm5hbWUsIGRlc2M6IGFjdGlvbkRhdGEuZGVzYywgYXR0YWNrX2JvbnVzOiBhY3Rpb25EYXRhLnRvSGl0LCBkYW1hZ2U6IFtzZXBhcmF0ZURtZ1JvbGwoYWN0aW9uRGF0YS5yb2xscy50b1N0cmluZygpKV19KTtcbiAgICAgICAgfVxuICAgIH0pO1xuICAgIGFjdGlvbnMgPSBtb2RpZmllZEFjdGlvbnM7XG5cbiAgICAvLyBHZXQgbGVnZW5kYXJ5IGFjdGlvbiByb2xsc1xuICAgIGxldCBtb2RpZmllZExlZ0FjdGlvbnMgPSBbXTtcbiAgICBsZWdBY3Rpb25zLmZvckVhY2goKGFjdGlvbikgPT4ge1xuICAgICAgICBpZiAoYWN0aW9uLm5hbWUgJiYgYWN0aW9uLmRlc2MpIHtcbiAgICAgICAgICAgIGNvbnN0IGxlZ0FjdGlvbkRhdGEgPSBnZXRBY3Rpb25EZXNjKGFjdGlvbi5kZXNjKTtcbiAgICAgICAgICAgIG1vZGlmaWVkTGVnQWN0aW9ucy5wdXNoKHtuYW1lOiBhY3Rpb24ubmFtZSwgZGVzYzogbGVnQWN0aW9uRGF0YS5kZXNjLCBhdHRhY2tfYm9udXM6IGxlZ0FjdGlvbkRhdGEudG9IaXQsIGRhbWFnZTogW3NlcGFyYXRlRG1nUm9sbChsZWdBY3Rpb25EYXRhLnJvbGxzLnRvU3RyaW5nKCkpXX0pO1xuICAgICAgICB9XG4gICAgfSk7XG4gICAgbGVnQWN0aW9ucyA9IG1vZGlmaWVkTGVnQWN0aW9ucztcblxuICAgIGNvbnN0IHtfcHJvZmljaWVuY2llcywgX3Jlc2lzdGFuY2VzLCBfdnVsbmVyYWJpbGl0aWVzLCBfc2Vuc2VzfSA9IGVtcHR5TnVsbEFycmF5cyhwcm9maWNpZW5jaWVzLCByZXNpc3RhbmNlcywgdnVsbmVyYWJpbGl0aWVzLCBzZW5zZXMpO1xuICAgIHJldHVybiB7cHJvZmljaWVuY2llczogX3Byb2ZpY2llbmNpZXMsIHZ1bG5lcmFiaWxpdGllczogX3Z1bG5lcmFiaWxpdGllcywgcmVzaXN0YW5jZXM6IF9yZXNpc3RhbmNlcywgZGFtYWdlSW1tdW5pdGllczogZGFtYWdlSW1tdW5pdGllcywgY29uZGl0aW9uSW1tdW5pdGllczogY29uZGl0aW9uSW1tdW5pdGllcywgc2Vuc2VzOiBfc2Vuc2VzLCBhYmlsaXRpZXM6IGFiaWxpdGllcywgYWN0aW9uczogYWN0aW9ucywgbGVnQWN0aW9uczogbGVnQWN0aW9uc307XG59XG5cbi8vIFB1c2hlcyBhbGwgY3JlYXR1cmVzIGRhdGEgaW50byB0aGVpciByZXNwZWN0aXZlIGFycmF5cyBhbmQgcmV0dXJucyB0aGVtLlxuZnVuY3Rpb24gZ2V0SW5pdGlhbENyZWF0dXJlQXJyYXlzKHJlczogYW55KSB7XG4gICAgbGV0IHByb2ZpY2llbmNpZXMgPSBbXTtcbiAgICBsZXQgdnVsbmVyYWJpbGl0aWVzID0gW107XG4gICAgbGV0IHJlc2lzdGFuY2VzID0gW107XG4gICAgbGV0IGRhbWFnZUltbXVuaXRpZXMgPSBbXTtcbiAgICBsZXQgY29uZGl0aW9uSW1tdW5pdGllcyA9IFtdO1xuICAgIGxldCBzZW5zZXMgPSBbXTtcbiAgICBsZXQgYWJpbGl0aWVzID0gW107XG4gICAgbGV0IGFjdGlvbnMgPSBbXTtcbiAgICBsZXQgbGVnQWN0aW9ucyA9IFtdO1xuXG4gICAgZm9yIChsZXQgc3RhdCBvZiByZXMpIHtcbiAgICAgICAgcHJvZmljaWVuY2llcy5wdXNoKHtuYW1lOiBzdGF0LnByb2ZfbmFtZSwgdmFsdWU6IHN0YXQucHJvZl92YWx1ZX0pO1xuICAgICAgICB2dWxuZXJhYmlsaXRpZXMucHVzaChzdGF0LnZ1bF9uYW1lKTtcbiAgICAgICAgcmVzaXN0YW5jZXMucHVzaChzdGF0LnJlc19uYW1lKTtcbiAgICAgICAgc2Vuc2VzLnB1c2goe25hbWU6IHN0YXQuc2Vuc2VfbmFtZSwgdmFsdWU6IHN0YXQuc2Vuc2VfdmFsdWV9KTtcbiAgICAgICAgYWJpbGl0aWVzLnB1c2goe25hbWU6IHN0YXQuYWJpbGl0eV9uYW1lLCBkZXNjOiBzdGF0LmFiaWxpdHlfZGVzY30pO1xuICAgICAgICBhY3Rpb25zLnB1c2goe25hbWU6IHN0YXQuYWN0aW9uX25hbWUsIGRlc2M6IHN0YXQuYWN0aW9uX2Rlc2N9KTtcbiAgICAgICAgbGVnQWN0aW9ucy5wdXNoKHtuYW1lOiBzdGF0LmxlZ19hY3Rpb25fbmFtZSwgZGVzYzogc3RhdC5sZWdfYWN0aW9uX2Rlc2N9KTtcblxuICAgICAgICBpZiAoc3RhdC5pbW11bmVfdHlwZSA9PT0gJ2RhbWFnZScpIHtcbiAgICAgICAgICAgIGRhbWFnZUltbXVuaXRpZXMucHVzaChzdGF0LmltbXVuZV9uYW1lKTtcbiAgICAgICAgfSBlbHNlIGlmIChzdGF0LmltbXVuZV90eXBlID09PSAnY29uZGl0aW9uJykge1xuICAgICAgICAgICAgY29uZGl0aW9uSW1tdW5pdGllcy5wdXNoKHN0YXQuaW1tdW5lX25hbWUpO1xuICAgICAgICB9XG4gICAgfVxuICAgIHJldHVybiB7cHJvZmljaWVuY2llczogcHJvZmljaWVuY2llcywgdnVsbmVyYWJpbGl0aWVzOiB2dWxuZXJhYmlsaXRpZXMsIHJlc2lzdGFuY2VzOiByZXNpc3RhbmNlcywgZGFtYWdlSW1tdW5pdGllczogZGFtYWdlSW1tdW5pdGllcywgY29uZGl0aW9uSW1tdW5pdGllczogY29uZGl0aW9uSW1tdW5pdGllcywgc2Vuc2VzOiBzZW5zZXMsIGFiaWxpdGllczogYWJpbGl0aWVzLCBhY3Rpb25zOiBhY3Rpb25zLCBsZWdBY3Rpb25zOiBsZWdBY3Rpb25zfTtcbn1cblxuLy8gTWFrZSBzdXJlIGFycmF5cyB0aGF0IGhhdmUgbm8gdmFsdWVzIGFyZSBlbXB0eSwgYW5kIGRvbid0IGhhdmUgbnVsbCB2YWx1ZXMgaW4gaXQuXG5mdW5jdGlvbiBlbXB0eU51bGxBcnJheXMocHJvZmljaWVuY2llczogYW55LCByZXNpc3RhbmNlczogYW55LCB2dWxuZXJhYmlsaXRpZXM6IGFueSwgc2Vuc2VzOiBhbnkpIHtcbiAgICBpZiAocHJvZmljaWVuY2llcy5sZW5ndGggPiAwKSB7XG4gICAgICAgIGxldCBleGlzdHMgPSBmYWxzZTtcbiAgICAgICAgcHJvZmljaWVuY2llcy5mb3JFYWNoKChwcm9mOiBhbnkpID0+IHtcbiAgICAgICAgICAgIGlmIChwcm9mLm5hbWUgJiYgcHJvZi52YWx1ZSkgZXhpc3RzID0gdHJ1ZTtcbiAgICAgICAgfSk7XG4gICAgICAgIGlmICghZXhpc3RzKSBwcm9maWNpZW5jaWVzID0gW107XG4gICAgfVxuICAgIGlmIChyZXNpc3RhbmNlcy5sZW5ndGggPiAwKSB7XG4gICAgICAgIGxldCBleGlzdHMgPSBmYWxzZTtcbiAgICAgICAgcmVzaXN0YW5jZXMuZm9yRWFjaCgocmVzaXN0YW5jZTogYW55KSA9PiB7XG4gICAgICAgICAgICBpZiAocmVzaXN0YW5jZSkgZXhpc3RzID0gdHJ1ZTtcbiAgICAgICAgfSk7XG4gICAgICAgIGlmICghZXhpc3RzKSByZXNpc3RhbmNlcyA9IFtdO1xuICAgIH1cbiAgICBpZiAodnVsbmVyYWJpbGl0aWVzLmxlbmd0aCA+IDApIHtcbiAgICAgICAgbGV0IGV4aXN0cyA9IGZhbHNlO1xuICAgICAgICB2dWxuZXJhYmlsaXRpZXMuZm9yRWFjaCgodnVsOiBhbnkpID0+IHtcbiAgICAgICAgICAgIGlmICh2dWwpIGV4aXN0cyA9IHRydWU7XG4gICAgICAgIH0pO1xuICAgICAgICBpZiAoIWV4aXN0cykgdnVsbmVyYWJpbGl0aWVzID0gW107XG4gICAgfVxuICAgIGlmIChzZW5zZXMubGVuZ3RoID4gMCkge1xuICAgICAgICBsZXQgZXhpc3RzID0gZmFsc2U7XG4gICAgICAgIHNlbnNlcy5mb3JFYWNoKChzZW5zZTogYW55KSA9PiB7XG4gICAgICAgICAgICBpZiAoc2Vuc2UubmFtZSAmJiBzZW5zZS52YWx1ZSkgZXhpc3RzID0gdHJ1ZTtcbiAgICAgICAgfSk7XG4gICAgICAgIGlmICghZXhpc3RzKSBzZW5zZXMgPSBbXTtcbiAgICB9XG4gICAgcmV0dXJuIHtfcHJvZmljaWVuY2llczogcHJvZmljaWVuY2llcywgX3Jlc2lzdGFuY2VzOiByZXNpc3RhbmNlcywgX3Z1bG5lcmFiaWxpdGllczogdnVsbmVyYWJpbGl0aWVzLCBfc2Vuc2VzOiBzZW5zZXN9O1xufVxuXG4vLyBSZW1vdmUgZHVwbGljYXRlIGRhdGEgZnJvbSB0aGUgZGF0YWJhc2VcbmZ1bmN0aW9uIHJlbW92ZUV4dHJhQ3VzdG9tRGF0YShhcnJheTogYW55LCBuYW1lOiBib29sZWFuKSB7XG4gICAgbGV0IHJlc3VsdCA9IFtdO1xuICAgIGlmIChuYW1lKSB7XG4gICAgICAgIC8vIExvb3AgdGhyb3VnaCBhcnJheSB3aXRoIG9iamVjdHNcbiAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCBhcnJheS5sZW5ndGggLSAxOyBpKyspIHtcbiAgICAgICAgICAgIGlmICghcmVzdWx0LnNvbWUoKGl0ZW0pID0+IGFycmF5W2ldLm5hbWUgPT09IGl0ZW0ubmFtZSkpIHtcbiAgICAgICAgICAgICAgICByZXN1bHQucHVzaChhcnJheVtpXSk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9IGVsc2Uge1xuICAgICAgICAvLyBMb29wcyB0aHJvdWdoIGFycmF5IG5vcm1hbGx5XG4gICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgYXJyYXkubGVuZ3RoIC0gMTsgaSsrKSB7XG4gICAgICAgICAgICBpZiAoIXJlc3VsdC5zb21lKChpdGVtKSA9PiBhcnJheVtpXSA9PT0gaXRlbSkpIHtcbiAgICAgICAgICAgICAgICByZXN1bHQucHVzaChhcnJheVtpXSk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9XG4gICAgcmV0dXJuIHJlc3VsdDtcbn1cblxuZXhwb3J0IGFzeW5jIGZ1bmN0aW9uIGdldEN1c3RvbUNyZWF0dXJlcygpIHtcbiAgICB0cnkge1xuICAgICAgICBjb25zdCByZXMgPSBhd2FpdCBheGlvcy5nZXQoJy9hcGkvY3JlYXR1cmVzJyk7XG4gICAgICAgIGN1c3RvbUNyZWF0dXJlcy52YWx1ZSA9IHJlcy5kYXRhO1xuICAgIH0gY2F0Y2ggKGVycikge1xuICAgICAgICBjb25zb2xlLmxvZyhlcnIpO1xuICAgIH1cbn1cblxuLy8gPT09IFBPU1Qgcm91dGVzID09PSAvL1xuXG5leHBvcnQgYXN5bmMgZnVuY3Rpb24gYWRkQ3JlYXR1cmUocGF5bG9hZDogYW55KSB7XG4gICAgY29uc29sZS5sb2cocGF5bG9hZCk7XG4gICAgdHJ5IHtcbiAgICAgICAgbGV0IGNyZWF0dXJlSWQ6IHN0cmluZztcbiAgICAgICAgLy8gQ3JlYXRlIGNyZWF0dXJlIGJhc2Ugc3RhdHNcbiAgICAgICAgYXdhaXQgYXhpb3MucG9zdCgnL2FwaS9jcmVhdHVyZXMnLCBwYXlsb2FkKTtcbiAgICAgICAgLy8gR2V0IGlkIG9mIHRoZSBjcmVhdHVyZSB0aGF0IHdhcyBqdXN0IG1hZGVcbiAgICAgICAgY29uc3QgcmVzID0gYXdhaXQgYXhpb3MuZ2V0KCcvYXBpL2NyZWF0dXJlcycpO1xuICAgICAgICBjcmVhdHVyZUlkID0gcmVzLmRhdGFbcmVzLmRhdGEubGVuZ3RoIC0gMV0uaWQ7XG5cbiAgICAgICAgLy8gQWRkIHRoZSByZXN0IG9mIHRoZSBjcmVhdHVyZSBkYXRhXG4gICAgICAgIGZvciAobGV0IHByb2Ygb2YgcGF5bG9hZC5wcm9maWNpZW5jaWVzKSB7XG4gICAgICAgICAgICBhd2FpdCBheGlvcy5wb3N0KCcvYXBpL2NyZWF0dXJlcy9wcm9mJywge2lkOiBjcmVhdHVyZUlkLCBkYXRhOiB7bmFtZTogcHJvZi5uYW1lLCB2YWx1ZTogcHJvZi52YWx1ZX19KTtcbiAgICAgICAgfVxuICAgICAgICBpZiAocGF5bG9hZC5wcm9maWNpZW5jaWVzLmxlbmd0aCA9PT0gMCkgYXdhaXQgYXhpb3MucG9zdCgnL2FwaS9jcmVhdHVyZXMvcHJvZicsIHtpZDogY3JlYXR1cmVJZCwgZGF0YToge25hbWU6IG51bGwsIHZhbHVlOiBudWxsfX0pO1xuXG4gICAgICAgIGF3YWl0IGF4aW9zLnBvc3QoJy9hcGkvY3JlYXR1cmVzL3Z1bCcsIHtpZDogY3JlYXR1cmVJZCwgZGF0YToge25hbWU6IHBheWxvYWQudnVsfX0pO1xuICAgICAgICBhd2FpdCBheGlvcy5wb3N0KCcvYXBpL2NyZWF0dXJlcy9yZXMnLCB7aWQ6IGNyZWF0dXJlSWQsIGRhdGE6IHtuYW1lOiBwYXlsb2FkLnJlc319KTtcbiAgICAgICAgYXdhaXQgYXhpb3MucG9zdCgnL2FwaS9jcmVhdHVyZXMvaW1tdW5pdGllcycsIHtpZDogY3JlYXR1cmVJZCwgZGF0YToge2RtZ0ltbXVuZTogdHJ1ZSwgbmFtZTogcGF5bG9hZC5kbWdJbW11bmV9fSk7XG4gICAgICAgIGF3YWl0IGF4aW9zLnBvc3QoJy9hcGkvY3JlYXR1cmVzL2ltbXVuaXRpZXMnLCB7aWQ6IGNyZWF0dXJlSWQsIGRhdGE6IHtjb25JbW11bmU6IHRydWUsIG5hbWU6IHBheWxvYWQuY29uSW1tdW5lfX0pO1xuICAgICAgICBmb3IgKGxldCBzZW5zZSBvZiBwYXlsb2FkLnNlbnNlcykge1xuICAgICAgICAgICAgYXdhaXQgYXhpb3MucG9zdCgnL2FwaS9jcmVhdHVyZXMvc2Vuc2VzJywge2lkOiBjcmVhdHVyZUlkLCBkYXRhOiB7bmFtZTogc2Vuc2UubmFtZSwgdmFsdWU6IHNlbnNlLnZhbHVlfX0pO1xuICAgICAgICB9XG4gICAgICAgIGlmIChwYXlsb2FkLnNlbnNlcy5sZW5ndGggPT09IDApIGF3YWl0IGF4aW9zLnBvc3QoJy9hcGkvY3JlYXR1cmVzL3NlbnNlcycsIHtpZDogY3JlYXR1cmVJZCwgZGF0YToge25hbWU6IG51bGwsIHZhbHVlOiBudWxsfX0pO1xuXG4gICAgICAgIGF3YWl0IGF4aW9zLnBvc3QoJy9hcGkvY3JlYXR1cmVzL2xhbmd1YWdlcycsIHtpZDogY3JlYXR1cmVJZCwgZGF0YToge25hbWU6IHBheWxvYWQubGFuZ3VhZ2VzfX0pO1xuICAgICAgICBmb3IgKGxldCBhYmlsaXR5IG9mIHBheWxvYWQuYWJpbGl0aWVzKSB7XG4gICAgICAgICAgICBhd2FpdCBheGlvcy5wb3N0KCcvYXBpL2NyZWF0dXJlcy9hYmlsaXRpZXMnLCB7aWQ6IGNyZWF0dXJlSWQsIGRhdGE6IHtuYW1lOiBhYmlsaXR5Lm5hbWUsIGRlc2M6IGFiaWxpdHkuZGVzY319KTtcbiAgICAgICAgfVxuICAgICAgICBpZiAocGF5bG9hZC5hYmlsaXRpZXMubGVuZ3RoID09PSAwKSBhd2FpdCBheGlvcy5wb3N0KCcvYXBpL2NyZWF0dXJlcy9hYmlsaXRpZXMnLCB7aWQ6IGNyZWF0dXJlSWQsIGRhdGE6IHtuYW1lOiBudWxsLCBkZXNjOiBudWxsfX0pO1xuXG4gICAgICAgIGZvciAobGV0IGFjdGlvbiBvZiBwYXlsb2FkLmFjdGlvbnMpIHtcbiAgICAgICAgICAgIGF3YWl0IGF4aW9zLnBvc3QoJy9hcGkvY3JlYXR1cmVzL2FjdGlvbnMnLCB7aWQ6IGNyZWF0dXJlSWQsIGRhdGE6IHtuYW1lOiBhY3Rpb24ubmFtZSwgZGVzYzogYWN0aW9uLmRlc2N9fSk7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKHBheWxvYWQuYWN0aW9ucy5sZW5ndGggPT09IDApIGF3YWl0IGF4aW9zLnBvc3QoJy9hcGkvY3JlYXR1cmVzL2FjdGlvbnMnLCB7aWQ6IGNyZWF0dXJlSWQsIGRhdGE6IHtuYW1lOiBudWxsLCBkZXNjOiBudWxsfX0pO1xuXG4gICAgICAgIGZvciAobGV0IGFjdGlvbiBvZiBwYXlsb2FkLmxlZ0FjdGlvbnMpIHtcbiAgICAgICAgICAgIGF3YWl0IGF4aW9zLnBvc3QoJy9hcGkvY3JlYXR1cmVzL2xlZy1hY3Rpb25zJywge2lkOiBjcmVhdHVyZUlkLCBkYXRhOiB7bmFtZTogYWN0aW9uLm5hbWUsIGRlc2M6IGFjdGlvbi5kZXNjfX0pO1xuICAgICAgICB9XG4gICAgICAgIGlmIChwYXlsb2FkLmxlZ0FjdGlvbnMubGVuZ3RoID09PSAwKSBhd2FpdCBheGlvcy5wb3N0KCcvYXBpL2NyZWF0dXJlcy9sZWctYWN0aW9ucycsIHtpZDogY3JlYXR1cmVJZCwgZGF0YToge25hbWU6IG51bGwsIGRlc2M6IG51bGx9fSk7XG5cbiAgICB9IGNhdGNoIChlcnIpIHtcbiAgICAgICAgY29uc29sZS5sb2coZXJyKTtcbiAgICB9XG59XG5cbmNsYXNzIENyZWF0dXJlIHtcbiAgICBpZDogbnVtYmVyXG4gICAgdXNlcl9pZDogbnVtYmVyXG4gICAgaW5kZXg6IHN0cmluZ1xuICAgIG5hbWU6IHN0cmluZ1xuICAgIHNpemU6IHN0cmluZ1xuICAgIHR5cGU6IHN0cmluZ1xuICAgIGFsaWdubWVudDogc3RyaW5nXG4gICAgYWM6IG51bWJlclxuICAgIGhpdF9wb2ludHM6IG51bWJlclxuICAgIGhpdF9kaWNlOiBzdHJpbmdcbiAgICBzdHI6IG51bWJlclxuICAgIGRleDogbnVtYmVyXG4gICAgY29uOiBudW1iZXJcbiAgICBpbnQ6IG51bWJlclxuICAgIHdpczogbnVtYmVyXG4gICAgY2hhcjogbnVtYmVyXG4gICAgY3I6IG51bWJlclxuICAgIHhwOiBudW1iZXJcbiAgICBsYW5ndWFnZXM6IHN0cmluZ1xuICAgIHNwZWVkczogYW55XG4gICAgcHJvZmljaWVuY2llczogYW55XG4gICAgdnVsbmVyYWJpbGl0aWVzOiBzdHJpbmdcbiAgICByZXNpc3RhbmNlczogc3RyaW5nXG4gICAgZGFtYWdlSW1tdW5pdGllczogYW55XG4gICAgY29uZGl0aW9uSW1tdW5pdGllczogYW55XG4gICAgc2Vuc2VzOiBhbnlcbiAgICBhYmlsaXRpZXM6IGFueVxuICAgIGFjdGlvbnM6IGFueVxuICAgIGxlZ0FjdGlvbnM6IGFueVxuXG4gICAgY29uc3RydWN0b3IgKGlkOiBudW1iZXIsIHVzZXJfaWQ6IG51bWJlciwgaW5kZXg6IHN0cmluZywgbmFtZTogc3RyaW5nLCBzaXplOiBzdHJpbmcsIHR5cGU6IHN0cmluZywgYWxpZ25tZW50OiBzdHJpbmcsIGFjOiBudW1iZXIsIGhpdF9wb2ludHM6IG51bWJlciwgaGl0X2RpY2U6IHN0cmluZywgc3RyOiBudW1iZXIsIGRleDogbnVtYmVyLCBjb246IG51bWJlciwgaW50OiBudW1iZXIsIHdpczogbnVtYmVyLCBjaGFyOiBudW1iZXIsIGNyOiBudW1iZXIsIHhwOiBudW1iZXIsIGxhbmd1YWdlczogc3RyaW5nLCB3YWxrX3NwZWVkOiBudW1iZXIsIHN3aW1fc3BlZWQ6IG51bWJlciwgYnVycm93X3NwZWVkOiBudW1iZXIsIGZseV9zcGVlZDogbnVtYmVyLCBjbGltYl9zcGVlZDogbnVtYmVyLCBwcm9maWNpZW5jaWVzOiBhbnksIHZ1bG5lcmFiaWxpdGllczogc3RyaW5nLCByZXNpc3RhbmNlczogc3RyaW5nLCBkYW1hZ2VJbW11bml0aWVzOiBhbnksIGNvbmRpdGlvbkltbXVuaXRpZXM6IGFueSwgc2Vuc2VzOiBhbnksIGFiaWxpdGllczogYW55LCBhY3Rpb25zOiBhbnksIGxlZ0FjdGlvbnM6IGFueSkge1xuICAgICAgICB0aGlzLmlkID0gaWQ7XG4gICAgICAgIHRoaXMudXNlcl9pZCA9IHVzZXJfaWQ7XG4gICAgICAgIHRoaXMuaW5kZXggPSBpbmRleDtcbiAgICAgICAgdGhpcy5uYW1lID0gbmFtZTtcbiAgICAgICAgdGhpcy5zaXplID0gc2l6ZTtcbiAgICAgICAgdGhpcy50eXBlID0gdHlwZTtcbiAgICAgICAgdGhpcy5hbGlnbm1lbnQgPSBhbGlnbm1lbnQ7XG4gICAgICAgIHRoaXMuYWMgPSBhYztcbiAgICAgICAgdGhpcy5oaXRfcG9pbnRzID0gaGl0X3BvaW50cztcbiAgICAgICAgdGhpcy5oaXRfZGljZSA9IGhpdF9kaWNlO1xuICAgICAgICB0aGlzLnN0ciA9IHN0cjtcbiAgICAgICAgdGhpcy5kZXggPSBkZXg7XG4gICAgICAgIHRoaXMuY29uID0gY29uO1xuICAgICAgICB0aGlzLmludCA9IGludDtcbiAgICAgICAgdGhpcy53aXMgPSB3aXM7XG4gICAgICAgIHRoaXMuY2hhciA9IGNoYXI7XG4gICAgICAgIHRoaXMuY3IgPSBjcjtcbiAgICAgICAgdGhpcy54cCA9IHhwO1xuICAgICAgICB0aGlzLmxhbmd1YWdlcyA9IGxhbmd1YWdlcztcbiAgICAgICAgdGhpcy5zcGVlZHMgPSBbXG4gICAgICAgICAgICB7bmFtZTogJ1dhbGsnLCB2YWx1ZTogd2Fsa19zcGVlZH0sXG4gICAgICAgICAgICB7bmFtZTogJ1N3aW0nLCB2YWx1ZTogc3dpbV9zcGVlZH0sXG4gICAgICAgICAgICB7bmFtZTogJ0J1cnJvdycsIHZhbHVlOiBidXJyb3dfc3BlZWR9LFxuICAgICAgICAgICAge25hbWU6ICdGbHknLCB2YWx1ZTogZmx5X3NwZWVkfSxcbiAgICAgICAgICAgIHtuYW1lOiAnQ2xpbWInLCB2YWx1ZTogY2xpbWJfc3BlZWR9XG4gICAgICAgIF0sXG4gICAgICAgIHRoaXMucHJvZmljaWVuY2llcyA9IHByb2ZpY2llbmNpZXM7XG4gICAgICAgIHRoaXMudnVsbmVyYWJpbGl0aWVzID0gdnVsbmVyYWJpbGl0aWVzO1xuICAgICAgICB0aGlzLnJlc2lzdGFuY2VzID0gcmVzaXN0YW5jZXM7XG4gICAgICAgIHRoaXMuZGFtYWdlSW1tdW5pdGllcyA9IGRhbWFnZUltbXVuaXRpZXM7XG4gICAgICAgIHRoaXMuY29uZGl0aW9uSW1tdW5pdGllcyA9IGNvbmRpdGlvbkltbXVuaXRpZXM7XG4gICAgICAgIHRoaXMuc2Vuc2VzID0gc2Vuc2VzO1xuICAgICAgICB0aGlzLmFiaWxpdGllcyA9IGFiaWxpdGllcztcbiAgICAgICAgdGhpcy5hY3Rpb25zID0gYWN0aW9ucztcbiAgICAgICAgdGhpcy5sZWdBY3Rpb25zID0gbGVnQWN0aW9ucztcbiAgICB9XG59XG5cbi8vID09PSBERUxFVEUgcm91dGVzID09PSAvL1xuXG5leHBvcnQgYXN5bmMgZnVuY3Rpb24gZGVsZXRlQ3JlYXR1cmUoaW5kZXg6IHN0cmluZykge1xuICAgIHRyeSB7XG4gICAgICAgIGF3YWl0IGF4aW9zLmRlbGV0ZShgL2FwaS9jcmVhdHVyZXMvJHtpbmRleH1gKTtcbiAgICAgICAgaWYgKGNyZWF0dXJlc09wZW4pIHtcbiAgICAgICAgICAgIHRvZ2dsZUNyZWF0dXJlc1dpbmRvdygpO1xuICAgICAgICAgICAgdG9nZ2xlQ3JlYXR1cmVzV2luZG93KCk7XG4gICAgICAgIH1cbiAgICB9IGNhdGNoIChlcnIpIHtcbiAgICAgICAgY29uc29sZS5sb2coZXJyKTtcbiAgICB9XG59XG5cblxuLy8gaWYgKHR5cGVvZiBtb2R1bGUgIT09ICd1bmRlZmluZWQnKSBtb2R1bGUuZXhwb3J0cyA9IHtcbi8vICAgICByZW1vdmVFeHRyYUN1c3RvbURhdGEsXG4vLyAgICAgZ2V0Q3JlYXR1cmVQcm9maWNpZW5jaWVzLFxuLy8gICAgIGdldENyZWF0dXJlQ29uZGl0aW9uSW1tdW5pdGllcyxcbi8vICAgICBnZXRDcmVhdHVyZVNlbnNlcyxcbi8vICAgICBnZXRDcmVhdHVyZUFiaWxpdGllcyxcbi8vICAgICBnZXRDcmVhdHVyZUFjdGlvbnMsXG4vLyAgICAgZ2V0Q3JlYXR1cmVMZWdlbmRhcnlBY3Rpb25zXG4vLyB9OyIsICJsZXQgdG9rZW5EZWx0YVg6IG51bWJlciwgdG9rZW5EZWx0YVk6IG51bWJlcjtcblxuLy8gQWRkIGV2ZW50IGxpc3RlbmVycyBmb3IgdGhlIHRva2VuXG5leHBvcnQgZnVuY3Rpb24gZ2l2ZVRva2VuRXZlbnRzKHRva2VuOiBhbnkpIHtcbiAgICAvLyBGaXJlcyB3aGVuIHVzZXIgYmVnaW5zIGRyYWdnaW5nXG4gICAgdG9rZW4uYWRkRXZlbnRMaXN0ZW5lcihcImRyYWdzdGFydFwiLCAoZTogYW55KSA9PiB7XG4gICAgICAgIGUudGFyZ2V0LmNsYXNzTGlzdC5hZGQoJ3Rva2VuLS1kcmFnZ2luZycpO1xuICAgIH0pO1xuICAgIC8vIEZpcmVzIHdoZW4gdXNlciBzdG9wcyBkcmFnZ2luZ1xuICAgIHRva2VuLmFkZEV2ZW50TGlzdGVuZXIoXCJkcmFnZW5kXCIsIChlOiBhbnkpID0+IHtcbiAgICAgICAgZS50YXJnZXQuY2xhc3NMaXN0LnJlbW92ZSgndG9rZW4tLWRyYWdnaW5nJyk7XG4gICAgICAgIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5nYW1lLXBhZ2UtY29udGFpbmVyJykuY2xhc3NMaXN0LnJlbW92ZSgndG9rZW4tLWRyYWdnaW5nLWN1cnNvcicpO1xuICAgIH0pO1xuICAgIC8vIEZpcmVzIHdoZW4gdXNlciBjbGlja3Mgb24gdG9rZW5cbiAgICB0b2tlbi5hZGRFdmVudExpc3RlbmVyKCdtb3VzZWRvd24nLChlOiBhbnkpID0+IHtcbiAgICAgICAgc3dpdGNoIChlLndoaWNoKSB7XG4gICAgICAgICAgICBjYXNlIDE6XG4gICAgICAgICAgICAgICAgZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLmdhbWUtcGFnZS1jb250YWluZXInKS5jbGFzc0xpc3QuYWRkKCd0b2tlbi0tZHJhZ2dpbmctY3Vyc29yJyk7XG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICBjYXNlIDM6XG4gICAgICAgICAgICAgICAgY29uc29sZS5sb2coJ1JpZ2h0IGNsaWNrJyk7XG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICBkZWZhdWx0OlxuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICB9XG4gICAgfSk7XG4gICAgLy8gRmlyZXMgd2hlbiB1c2VyIHJlbGVhc2VzIGNsaWNrIG9uIHRva2VuXG4gICAgdG9rZW4uYWRkRXZlbnRMaXN0ZW5lcignbW91c2V1cCcsKGU6IGFueSkgPT4ge1xuICAgICAgICBzd2l0Y2ggKGUud2hpY2gpIHtcbiAgICAgICAgICAgIGNhc2UgMTpcbiAgICAgICAgICAgICAgICAvLyBzZWxlY3RUb2tlbihlLnRhcmdldCk7XG4gICAgICAgICAgICAgICAgZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLmdhbWUtcGFnZS1jb250YWluZXInKS5jbGFzc0xpc3QucmVtb3ZlKCd0b2tlbi0tZHJhZ2dpbmctY3Vyc29yJyk7XG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICBkZWZhdWx0OlxuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICB9XG4gICAgfSk7XG4gICAgLy8gRmlyZXMgd2hlbiB1c2VyIHVzZXMgc2Nyb2xsIHdoZWVsXG4gICAgLy8gdG9rZW4uYWRkRXZlbnRMaXN0ZW5lcignd2hlZWwnLCAoZSkgPT4ge1xuICAgIC8vICAgICBpZiAoY2FuU2NhbGUpIHtcbiAgICAvLyAgICAgICAgIGlmIChlLndoZWVsRGVsdGFZIDwgMCkge1xuICAgIC8vICAgICAgICAgICAgIHVwc2NhbGVUb2tlbih0b2tlbik7XG4gICAgLy8gICAgICAgICB9IGVsc2Uge1xuICAgIC8vICAgICAgICAgICAgIGRlc2NhbGVUb2tlbih0b2tlbik7XG4gICAgLy8gICAgICAgICB9XG4gICAgLy8gICAgIH1cbiAgICAvLyB9KTtcbn1cblxuLy8gSGlnaGxpZ2h0cyBhbmQgc2VsZWN0cyB0b2tlblxuLy8gZnVuY3Rpb24gc2VsZWN0VG9rZW4odG9rZW4pIHtcbi8vICAgICBpZiAodG9rZW4uY2xhc3NMaXN0LmNvbnRhaW5zKCd0b2tlbi0tc2VsZWN0ZWQnKSkge1xuLy8gICAgICAgICB0b2tlbi5jbGFzc0xpc3QucmVtb3ZlKCd0b2tlbi0tc2VsZWN0ZWQnKTtcbi8vICAgICB9IGVsc2Uge1xuLy8gICAgICAgICBmb3IgKGNvbnN0IF90b2tlbiBvZiBkb2N1bWVudC5nZXRFbGVtZW50c0J5Q2xhc3NOYW1lKCd0b2tlbicpKSB7XG4vLyAgICAgICAgICAgICBfdG9rZW4uY2xhc3NMaXN0LnJlbW92ZSgndG9rZW4tLXNlbGVjdGVkJyk7XG4vLyAgICAgICAgIH1cbi8vICAgICAgICAgdG9rZW4uY2xhc3NMaXN0LmFkZCgndG9rZW4tLXNlbGVjdGVkJyk7XG4vLyAgICAgfVxuLy8gfVxuXG5mdW5jdGlvbiB1cHNjYWxlVG9rZW4odG9rZW46IGFueSkge1xuICAgIGlmICh0b2tlbi5jbGFzc0xpc3QuY29udGFpbnMoJ3Rva2VuLS10aW55JykpIHtcbiAgICAgICAgdG9rZW4uY2xhc3NMaXN0LnJlbW92ZSgndG9rZW4tLXRpbnknKTtcbiAgICAgICAgdG9rZW4uY2xhc3NMaXN0LmFkZCgndG9rZW4tLXNtYWxsJyk7XG4gICAgfSBlbHNlIGlmICh0b2tlbi5jbGFzc0xpc3QuY29udGFpbnMoJ3Rva2VuLS1zbWFsbCcpKSB7XG4gICAgICAgIHRva2VuLmNsYXNzTGlzdC5yZW1vdmUoJ3Rva2VuLS1zbWFsbCcpO1xuICAgICAgICB0b2tlbi5jbGFzc0xpc3QuYWRkKCd0b2tlbi0tbWVkaXVtJyk7XG4gICAgfSBlbHNlIGlmICh0b2tlbi5jbGFzc0xpc3QuY29udGFpbnMoJ3Rva2VuLS1tZWRpdW0nKSkge1xuICAgICAgICB0b2tlbi5jbGFzc0xpc3QucmVtb3ZlKCd0b2tlbi0tbWVkaXVtJyk7XG4gICAgICAgIHRva2VuLmNsYXNzTGlzdC5hZGQoJ3Rva2VuLS1sYXJnZScpO1xuICAgIH0gZWxzZSBpZiAodG9rZW4uY2xhc3NMaXN0LmNvbnRhaW5zKCd0b2tlbi0tbGFyZ2UnKSkge1xuICAgICAgICB0b2tlbi5jbGFzc0xpc3QucmVtb3ZlKCd0b2tlbi0tbGFyZ2UnKTtcbiAgICAgICAgdG9rZW4uY2xhc3NMaXN0LmFkZCgndG9rZW4tLWh1Z2UnKTtcbiAgICB9IGVsc2UgaWYgKHRva2VuLmNsYXNzTGlzdC5jb250YWlucygndG9rZW4tLWh1Z2UnKSkge1xuICAgICAgICB0b2tlbi5jbGFzc0xpc3QucmVtb3ZlKCd0b2tlbi0taHVnZScpO1xuICAgICAgICB0b2tlbi5jbGFzc0xpc3QuYWRkKCd0b2tlbi0tZ2FyZ2FudHVhbicpO1xuICAgIH1cbn1cblxuZnVuY3Rpb24gZGVzY2FsZVRva2VuKHRva2VuOiBhbnkpIHtcbiAgICBpZiAodG9rZW4uY2xhc3NMaXN0LmNvbnRhaW5zKCd0b2tlbi0tZ2FyZ2FudHVhbicpKSB7XG4gICAgICAgIHRva2VuLmNsYXNzTGlzdC5yZW1vdmUoJ3Rva2VuLS1nYXJnYW50dWFuJyk7XG4gICAgICAgIHRva2VuLmNsYXNzTGlzdC5hZGQoJ3Rva2VuLS1odWdlJyk7XG4gICAgfSBlbHNlIGlmICh0b2tlbi5jbGFzc0xpc3QuY29udGFpbnMoJ3Rva2VuLS1odWdlJykpIHtcbiAgICAgICAgdG9rZW4uY2xhc3NMaXN0LnJlbW92ZSgndG9rZW4tLWh1Z2UnKTtcbiAgICAgICAgdG9rZW4uY2xhc3NMaXN0LmFkZCgndG9rZW4tLWxhcmdlJyk7XG4gICAgfSBlbHNlIGlmICh0b2tlbi5jbGFzc0xpc3QuY29udGFpbnMoJ3Rva2VuLS1sYXJnZScpKSB7XG4gICAgICAgIHRva2VuLmNsYXNzTGlzdC5yZW1vdmUoJ3Rva2VuLS1sYXJnZScpO1xuICAgICAgICB0b2tlbi5jbGFzc0xpc3QuYWRkKCd0b2tlbi0tbWVkaXVtJyk7XG4gICAgfSBlbHNlIGlmICh0b2tlbi5jbGFzc0xpc3QuY29udGFpbnMoJ3Rva2VuLS1tZWRpdW0nKSkge1xuICAgICAgICB0b2tlbi5jbGFzc0xpc3QucmVtb3ZlKCd0b2tlbi0tbWVkaXVtJyk7XG4gICAgICAgIHRva2VuLmNsYXNzTGlzdC5hZGQoJ3Rva2VuLS1zbWFsbCcpO1xuICAgIH0gZWxzZSBpZiAodG9rZW4uY2xhc3NMaXN0LmNvbnRhaW5zKCd0b2tlbi0tc21hbGwnKSkge1xuICAgICAgICB0b2tlbi5jbGFzc0xpc3QucmVtb3ZlKCd0b2tlbi0tc21hbGwnKTtcbiAgICAgICAgdG9rZW4uY2xhc3NMaXN0LmFkZCgndG9rZW4tLXRpbnknKTtcbiAgICB9XG59XG4iLCAiaW1wb3J0IGF4aW9zIGZyb20gJ2F4aW9zJztcbmltcG9ydCB7IHRva2VucyB9IGZyb20gJy4uL21lbnVzL3Rva2VuLm1lbnUnO1xuXG4vLyA9PT0gR0VUIHJvdXRlcyA9PT0gLy9cblxuZXhwb3J0IGFzeW5jIGZ1bmN0aW9uIGdldFRva2VucygpIHtcbiAgICB0cnkge1xuICAgICAgICBjb25zdCByZXMgPSBhd2FpdCBheGlvcy5nZXQoJy9hcGkvdG9rZW5zJylcbiAgICAgICAgdG9rZW5zLnZhbHVlID0gcmVzLmRhdGE7XG4gICAgfSBjYXRjaCAoZXJyKSB7XG4gICAgICAgIGNvbnNvbGUubG9nKGVycik7XG4gICAgfVxufVxuXG4vLyA9PT0gUE9TVCByb3V0ZXMgPT09IC8vXG5cbmV4cG9ydCBhc3luYyBmdW5jdGlvbiBhZGRUb2tlbihwYXlsb2FkOiBhbnkpIHtcbiAgICB0cnkge1xuICAgICAgICBhd2FpdCBheGlvcy5wb3N0KCcvYXBpL3Rva2VucycsIHBheWxvYWQpO1xuICAgIH0gY2F0Y2ggKGVycikge1xuICAgICAgICBjb25zb2xlLmxvZyhlcnIpO1xuICAgIH1cbn1cblxuZXhwb3J0IGFzeW5jIGZ1bmN0aW9uIGFkZFRva2VuVG9NYXAocGF5bG9hZDogYW55KSB7XG4gICAgdHJ5IHtcbiAgICAgICAgYXdhaXQgYXhpb3MucG9zdCgnL2FwaS90b2tlbnMvbWFwJywgcGF5bG9hZCk7XG4gICAgfSBjYXRjaCAoZXJyKSB7XG4gICAgICAgIGNvbnNvbGUubG9nKGVycik7XG4gICAgfVxufSIsICJpbXBvcnQgeyBhZGRUb2tlbiwgZ2V0VG9rZW5zIH0gZnJvbSAnLi4vcm91dGVzL3Rva2Vucy5yb3V0ZSc7XG5pbXBvcnQgeyBjbGllbnQgfSBmcm9tICcuLi9kYXNoYm9hcmQnO1xuaW1wb3J0IHsgbWVudU9wZW4sIHNlbGVjdGVkTWVudSwgY2xvc2VNZW51IH0gZnJvbSAnLi4vdXRpbHMnO1xuXG5sZXQgdG9rZW5TZWxlY3RlZCA9IGZhbHNlO1xuZXhwb3J0IGxldCB0b2tlbnMgPSB7dmFsdWU6IFtdfTtcbmNvbnN0IGRlZmF1bHRUb2tlbnMgPSBbXG4gICAge2ltYWdlOiAnaHR0cHM6Ly9pLnBpbmltZy5jb20vMjM2eC84OC80YS8wNS84ODRhMDU2YmE3YTVhMDA0YmVjYWNiZmQxYmZkNzhmZS5qcGcnLCBzaXplOiAndG9rZW4tLW1lZGl1bSd9LFxuICAgIHtpbWFnZTogJ2h0dHBzOi8vaS5pbWd1ci5jb20vNWNpYm1Vdy5wbmcnLCBzaXplOiAndG9rZW4tLWxhcmdlJ30sXG4gICAge2ltYWdlOiAnaHR0cHM6Ly9lbmNyeXB0ZWQtdGJuMC5nc3RhdGljLmNvbS9pbWFnZXM/cT10Ym46QU5kOUdjU2xXX3hla1JEMjkxWUJoTGRQS1lpZkRuRjJIVjc0Q3N6MEtRJnVzcXA9Q0FVJywgc2l6ZTogJ3Rva2VuLS1nYXJnYW50dWFuJ30sXG5dO1xuXG5leHBvcnQgZnVuY3Rpb24gYWRkRGVmYXVsdFRva2VucygpIHtcbiAgICBmb3IgKGxldCB0b2tlbiBvZiBkZWZhdWx0VG9rZW5zKSB7XG4gICAgICAgIGFkZFRva2VuKHRva2VuKTtcbiAgICB9XG59XG5cbmV4cG9ydCBmdW5jdGlvbiB0b2dnbGVUb2tlbk1lbnUobWVudU5hbWU6IHN0cmluZykge1xuICAgIGlmIChjbGllbnQuY2xpZW50VHlwZSA9PT0gJ2RtJykge1xuICAgICAgICBtZW51T3Blbi52YWx1ZSA9ICFtZW51T3Blbi52YWx1ZTtcbiAgICAgICAgaWYgKG1lbnVPcGVuLnZhbHVlKSB7XG4gICAgICAgICAgICBzZWxlY3RlZE1lbnUudmFsdWUgPSAndG9rZW5zJztcbiAgICAgICAgICAgIC8vIENyZWF0ZSBtZW51XG4gICAgICAgICAgICBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcuZ2FtZS1wYWdlLWNvbnRhaW5lcicpLmluc2VydEFkamFjZW50SFRNTCgnYmVmb3JlZW5kJywgYFxuICAgICAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJtZW51XCI+XG4gICAgICAgICAgICAgICAgICAgIDxidXR0b24gY2xhc3M9XCJtZW51X19idG4gbWVudV9fYnRuLS1jbG9zZVwiPlg8L2J1dHRvbj5cbiAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzcz1cIm1lbnVfX2JvZHlcIj48L2Rpdj5cbiAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgIGApO1xuICAgICAgICAgICAgZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLm1lbnVfX2J0bi0tY2xvc2UnKS5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsICgpID0+IGNsb3NlTWVudShtZW51TmFtZSkpO1xuICAgICAgICAgICAgZ2V0VG9rZW5Cb2R5RGF0YSgpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgY2xvc2VNZW51KG1lbnVOYW1lKTtcbiAgICAgICAgfVxuICAgIH1cbn1cblxuYXN5bmMgZnVuY3Rpb24gZ2V0VG9rZW5Cb2R5RGF0YSgpIHtcbiAgICBhd2FpdCBnZXRUb2tlbnMoKTtcbiAgICBmb3IgKGxldCB0b2tlbiBvZiB0b2tlbnMudmFsdWUpIHtcbiAgICAgICAgaWYgKHRva2VuLmNyZWF0dXJlKSB7XG4gICAgICAgICAgICBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcubWVudV9fYm9keScpLmluc2VydEFkamFjZW50SFRNTCgnYmVmb3JlZW5kJywgYFxuICAgICAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJtZW51X19ib2R5LS1jb250YWluZXJcIj5cbiAgICAgICAgICAgICAgICAgICAgPGltZyBzcmM9JHt0b2tlbi5pbWFnZX0gY2xhc3M9XCJtZW51X19pdGVtIG1lbnVfX2l0ZW0tLXRva2VuXCIgb25kcmFnc3RhcnQ9XCJwbGFjZVRva2VuKGV2ZW50LCAnJHt0b2tlbi5zaXplfScpXCIgc2l6ZT0ke3Rva2VuLnNpemV9IHJlbGF0aXZlPSR7dG9rZW4uY3JlYXR1cmV9IGlkPSR7dG9rZW4uaWR9PlxuICAgICAgICAgICAgICAgICAgICA8YnV0dG9uIGNsYXNzPVwibWVudV9faXRlbS0tY2lyY2xlLWJ0blwiIG9uY2xpY2s9XCJvcGVuQ3JlYXR1cmVTdGF0c1dpbmRvdygnJHt0b2tlbi5jcmVhdHVyZX0nKVwiPjxpIGNsYXNzPVwiZmEtc29saWQgZmEtYXJyb3ctdXAtcmlnaHQtZnJvbS1zcXVhcmVcIj48L2k+PC9idXR0b24+XG4gICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICBgKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5tZW51X19ib2R5JykuaW5zZXJ0QWRqYWNlbnRIVE1MKCdiZWZvcmVlbmQnLCBgXG4gICAgICAgICAgICAgICAgPGRpdiBjbGFzcz1cIm1lbnVfX2JvZHktLWNvbnRhaW5lclwiPlxuICAgICAgICAgICAgICAgICAgICA8aW1nIHNyYz0ke3Rva2VuLmltYWdlfSBjbGFzcz1cIm1lbnVfX2l0ZW0gbWVudV9faXRlbS0tdG9rZW5cIiBvbmRyYWdzdGFydD1cInBsYWNlVG9rZW4oZXZlbnQsICcke3Rva2VuLnNpemV9JylcIiBzaXplPSR7dG9rZW4uc2l6ZX0gcmVsYXRpdmU9JHt0b2tlbi5jcmVhdHVyZX0gaWQ9JHt0b2tlbi5pZH0+XG4gICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICBgKTtcbiAgICAgICAgfVxuICAgIH1cbn1cblxuZnVuY3Rpb24gcGxhY2VUb2tlbihlOiBhbnksIHNpemU6IHN0cmluZykge1xuICAgIHRva2VuU2VsZWN0ZWQgPSB0cnVlO1xuICAgIGNvbnN0IHRva2VuID0gZS50YXJnZXQ7XG4gICAgdG9rZW4uY2xhc3NMaXN0LmFkZCgndG9rZW4tLWRyYWdnaW5nJyk7XG4gICAgdG9rZW4uY2xhc3NMaXN0LmFkZChzaXplKTtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIHJlc2V0VG9rZW5Cb2R5RGF0YSgpIHtcbiAgICBsZXQgZGVsZXRlTGlzdCA9IFtdO1xuICAgIGZvciAobGV0IHRva2VuIG9mIGRvY3VtZW50LmdldEVsZW1lbnRzQnlDbGFzc05hbWUoJ21lbnVfX2l0ZW0nKSkge1xuICAgICAgICBkZWxldGVMaXN0LnB1c2godG9rZW4pO1xuICAgIH1cbiAgICBmb3IgKGxldCBidG4gb2YgZG9jdW1lbnQuZ2V0RWxlbWVudHNCeUNsYXNzTmFtZSgnbWVudV9faXRlbS0tY2lyY2xlLWJ0bicpKSB7XG4gICAgICAgIGRlbGV0ZUxpc3QucHVzaChidG4pO1xuICAgIH1cbiAgICBmb3IgKGxldCBib3ggb2YgZG9jdW1lbnQuZ2V0RWxlbWVudHNCeUNsYXNzTmFtZSgnbWVudV9fYm9keS0tY29udGFpbmVyJykpIHtcbiAgICAgICAgZGVsZXRlTGlzdC5wdXNoKGJveCk7XG4gICAgfVxuICAgIGZvciAobGV0IGVsIG9mIGRlbGV0ZUxpc3QpIHtcbiAgICAgICAgZWwucmVtb3ZlKCk7XG4gICAgfVxuICAgIGdldFRva2VuQm9keURhdGEoKTtcbn0iLCAiaW1wb3J0IGF4aW9zIGZyb20gJ2F4aW9zJztcbmltcG9ydCB7IG1hcHMgfSBmcm9tICcuLi9tZW51cy9tYXAubWVudSc7XG5cbi8vID09PSBHRVQgcm91dGVzID09PSAvL1xuXG5leHBvcnQgYXN5bmMgZnVuY3Rpb24gZ2V0TWFwcygpIHtcbiAgICB0cnkge1xuICAgICAgICBjb25zdCByZXMgPSBhd2FpdCBheGlvcy5nZXQoJy9hcGkvbWFwcycpO1xuICAgICAgICBtYXBzLnZhbHVlID0gcmVzLmRhdGE7XG4gICAgfSBjYXRjaCAoZXJyKSB7XG4gICAgICAgIGNvbnNvbGUubG9nKGVycik7XG4gICAgfVxufVxuXG4vLyA9PT0gUE9TVCByb3V0ZXMgPT09IC8vXG5cbmV4cG9ydCBhc3luYyBmdW5jdGlvbiBhZGRNYXAocGF5bG9hZDogYW55KSB7XG4gICAgdHJ5IHtcbiAgICAgICAgY29uc29sZS5sb2cocGF5bG9hZCk7XG4gICAgICAgIGF3YWl0IGF4aW9zLnBvc3QoJy9hcGkvbWFwcycsIHBheWxvYWQpO1xuICAgIH0gY2F0Y2ggKGVycikge1xuICAgICAgICBjb25zb2xlLmxvZyhlcnIpO1xuICAgIH1cbn0iLCAiaW1wb3J0IHsgYWRkTWFwLCBnZXRNYXBzIH0gZnJvbSAnLi4vcm91dGVzL21hcHMucm91dGUnO1xuaW1wb3J0IHsgc2VsZWN0ZWRNZW51LCBtZW51T3BlbiwgY2xvc2VNZW51LCBkaXNhYmxlSG90a2V5cyB9IGZyb20gJy4uL3V0aWxzJztcbmltcG9ydCB7IHJvb3QsIHNldHVwR3JpZCB9IGZyb20gJy4uL2dyaWQnO1xuaW1wb3J0IHsgaW8sIFNvY2tldCB9IGZyb20gXCJzb2NrZXQuaW8tY2xpZW50XCI7XG5cbmNvbnN0IHNvY2tldDogU29ja2V0ID0gaW8oKTtcbmV4cG9ydCBsZXQgbWFwcyA9IHt2YWx1ZTogW119O1xubGV0IGRlZmF1bHRNYXBzID0gW1xuICAgIHtuYW1lOiAnRGVmYXVsdCBNYXAnLCBpbWFnZTogJ2h0dHBzOi8vaW1hZ2VzLnNxdWFyZXNwYWNlLWNkbi5jb20vY29udGVudC92MS81NTExZmM3Y2U0YjBhMzc4MmFhOTQxOGIvMTQyOTEzOTc1OTEyNy1LRkhXQUZGRlZYSldaTldUSVRLSy9sZWFybmluZy10aGUtZ3JpZC1tZXRob2QuanBnJ30sXG5dO1xuXG5leHBvcnQgZnVuY3Rpb24gYWRkRGVmYXVsdE1hcHMoKSB7XG4gICAgZm9yIChsZXQgbWFwIG9mIGRlZmF1bHRNYXBzKSB7XG4gICAgICAgIGFkZE1hcChtYXApO1xuICAgIH1cbn1cblxuZXhwb3J0IGZ1bmN0aW9uIHRvZ2dsZU1hcE1lbnUobWVudU5hbWU6IHN0cmluZykge1xuICAgIG1lbnVPcGVuLnZhbHVlID0gIW1lbnVPcGVuLnZhbHVlO1xuICAgIGlmIChtZW51T3Blbi52YWx1ZSkge1xuICAgICAgICBzZWxlY3RlZE1lbnUudmFsdWUgPSAnbWFwcyc7XG4gICAgICAgIC8vIENyZWF0ZSBtZW51XG4gICAgICAgIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5nYW1lLXBhZ2UtY29udGFpbmVyJykuaW5zZXJ0QWRqYWNlbnRIVE1MKCdiZWZvcmVlbmQnLCBgXG4gICAgICAgICAgICA8ZGl2IGNsYXNzPVwibWVudVwiPlxuICAgICAgICAgICAgICAgIDxidXR0b24gY2xhc3M9XCJtZW51X19idG4gbWVudV9fYnRuLS1jbG9zZVwiPlg8L2J1dHRvbj5cbiAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzPVwibWVudV9fYm9keVwiPjwvZGl2PlxuICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgIGApO1xuICAgICAgICBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcubWVudV9fYnRuLS1jbG9zZScpLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgKCkgPT4gY2xvc2VNZW51KG1lbnVOYW1lKSk7XG4gICAgICAgIGdldE1hcEJvZHlEYXRhKCk7XG4gICAgfSBlbHNlIHtcbiAgICAgICAgY2xvc2VNZW51KG1lbnVOYW1lKTtcbiAgICB9XG59XG5cbmFzeW5jIGZ1bmN0aW9uIGdldE1hcEJvZHlEYXRhKCkge1xuICAgIGF3YWl0IGdldE1hcHMoKTtcbiAgICAvLyBQb3B1bGF0ZSBtZW51IGJvZHlcbiAgICBmb3IgKGxldCBtYXAgb2YgbWFwcy52YWx1ZSkge1xuICAgICAgICBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcubWVudV9fYm9keScpLmluc2VydEFkamFjZW50SFRNTCgnYmVmb3JlZW5kJywgYFxuICAgICAgICAgICAgPGRpdj5cbiAgICAgICAgICAgICAgICA8aW1nIHNyYz0ke21hcC5pbWFnZX0gY2xhc3M9XCJtZW51X19pdGVtIG1lbnVfX2l0ZW0tLW1hcFwiIG9uZGJsY2xpY2s9XCJzZWxlY3RNYXAoZXZlbnQpXCIgaWQ9JHttYXAuaWR9PlxuICAgICAgICAgICAgICAgIDxwIGNsYXNzPVwibWVudV9faXRlbS0tbmFtZVwiPiR7bWFwLm5hbWV9PC9wPlxuICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgIGApO1xuICAgIH1cblxuICAgIC8vIEFkZCBuZXcgbWFwIGJ1dHRvblxuICAgIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5tZW51X19ib2R5JykuaW5zZXJ0QWRqYWNlbnRIVE1MKCdiZWZvcmVlbmQnLCBgXG4gICAgICAgIDxkaXYgY2xhc3M9XCJtZW51X19pdGVtIG1lbnVfX2l0ZW0tLW1hcFwiPlxuICAgICAgICAgICAgPGJ1dHRvbiBjbGFzcz1cImJ0bi0tbmV3LWl0ZW1cIiBvbmNsaWNrPVwibmV3TWFwKCk7XCI+TmV3IE1hcDwvYnV0dG9uPlxuICAgICAgICA8L2Rpdj5cbiAgICBgKTtcbn1cblxuZnVuY3Rpb24gc2VsZWN0TWFwKGU6IGFueSkge1xuICAgIGZvciAobGV0IG1hcCBvZiBtYXBzLnZhbHVlKSB7XG4gICAgICAgIGlmIChtYXAuaWQgPT09IHBhcnNlSW50KGUudGFyZ2V0LmdldEF0dHJpYnV0ZSgnaWQnKSkpIHtcbiAgICAgICAgICAgIHNvY2tldC5lbWl0KCdTRUxFQ1RfTUFQJywge3dpZHRoOiBlLnRhcmdldC5jbGllbnRXaWR0aCwgaGVpZ2h0OiBlLnRhcmdldC5jbGllbnRIZWlnaHR9LCBtYXApO1xuICAgICAgICB9XG4gICAgfVxufVxuXG5zb2NrZXQub24oJ1NFTEVDVF9NQVAnLCAoKGUsIG1hcCkgPT4ge1xuICAgIGlmIChtYXAubmFtZSA9PT0gJ0RlZmF1bHQgTWFwJykge1xuICAgICAgICAvLyBTZXQgaW1hZ2UgdG8gbm90aGluZ1xuICAgICAgICByb290LnN0eWxlLnNldFByb3BlcnR5KCctLWJhY2tncm91bmQtaW1hZ2UnLCBgdXJsKCcnKWApO1xuICAgICAgICBzZXR1cEdyaWQoMjUsIDI1LCB0cnVlKTtcbiAgICB9IGVsc2Uge1xuICAgICAgICAvLyBTZXQgbmV3IG1hcCBpbWFnZVxuICAgICAgICByb290LnN0eWxlLnNldFByb3BlcnR5KCctLWJhY2tncm91bmQtaW1hZ2UnLCBgdXJsKCR7bWFwLmltYWdlfSlgKTtcbiAgICAgICAgc2V0dXBHcmlkKGUud2lkdGggLyAyLCBlLmhlaWdodCAvIDIsIHRydWUpO1xuICAgIH1cbn0pKTtcblxuZnVuY3Rpb24gbmV3TWFwKCkge1xuICAgIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5tZW51X19ib2R5JykuaW5zZXJ0QWRqYWNlbnRIVE1MKCdiZWZvcmVlbmQnLCBgXG4gICAgICAgIDxmb3JtIGNsYXNzPVwiZm9ybS0tbWVudVwiIG9uc3VibWl0PVwic3VibWl0TmV3TWFwKGV2ZW50KVwiPlxuICAgICAgICAgICAgPGlucHV0IHBsYWNlaG9sZGVyPVwibmFtZVwiIG9uY2hhbmdlPVwibWFwTmFtZUNoYW5nZShldmVudClcIiByZXF1aXJlZD5cbiAgICAgICAgICAgIDxpbnB1dCB0eXBlPVwiZmlsZVwiIGFjY2VwdD1cImltYWdlLypcIiBvbmNoYW5nZT1cIm1hcEltYWdlQ2hhbmdlKGV2ZW50KVwiIHJlcXVpcmVkPlxuICAgICAgICAgICAgPGJ1dHRvbiB0eXBlPVwic3VibWl0XCI+QWRkIE1hcDwvYnV0dG9uPlxuICAgICAgICA8L2Zvcm0+XG4gICAgYCk7XG4gICAgZGlzYWJsZUhvdGtleXMoKTtcbn1cblxuLy8gRm9yIG5ldyBtYXAgZm9ybVxubGV0IG5ld01hcE5hbWU6IHN0cmluZywgbmV3TWFwSW1hZ2U6IHN0cmluZztcbmNvbnN0IG1hcE5hbWVDaGFuZ2UgPSAoZTogYW55KSA9PiBuZXdNYXBOYW1lID0gZS50YXJnZXQudmFsdWU7XG5jb25zdCBtYXBJbWFnZUNoYW5nZSA9IChlOiBhbnkpID0+IG5ld01hcEltYWdlID0gZS50YXJnZXQuZmlsZXNbMF07XG5cbmZ1bmN0aW9uIHN1Ym1pdE5ld01hcChlOiBhbnkpIHtcbiAgICBlLnByZXZlbnREZWZhdWx0KCk7XG4gICAgYWRkTWFwKHsgbmFtZTogbmV3TWFwTmFtZSwgaW1hZ2U6IG5ld01hcEltYWdlIH0pO1xufSIsICJpbXBvcnQgYXhpb3MgZnJvbSAnYXhpb3MnO1xuaW1wb3J0IHsgY2hhbmdlUm91dGUgfSBmcm9tICcuLi91dGlscyc7XG5cbi8vID09PSBHRVQgcm91dGVzID09PSAvL1xuXG5leHBvcnQgYXN5bmMgZnVuY3Rpb24gZ2V0VXNlcigpIHtcbiAgICB0cnkge1xuICAgICAgICBjb25zdCBjb25maWcgPSB7XG4gICAgICAgICAgICBoZWFkZXJzOiB7ICdDb250ZW50LVR5cGUnOiAnYXBwbGljYXRpb24vanNvbicgfSxcbiAgICAgICAgICAgIHdpdGhDcmVkZW50aWFsczogdHJ1ZSxcbiAgICAgICAgfTtcbiAgICAgICAgY29uc3QgcmVzID0gYXdhaXQgYXhpb3MuZ2V0KCcvYXBpL3VzZXInLCBjb25maWcpO1xuICAgICAgICByZXR1cm4gcmVzLmRhdGE7XG4gICAgfSBjYXRjaChlcnIpIHtcbiAgICAgICAgY29uc29sZS5sb2coZXJyKTtcbiAgICB9XG59XG5cbi8vID09PSBQT1NUIHJvdXRlcyA9PT0gLy9cblxuZXhwb3J0IGFzeW5jIGZ1bmN0aW9uIHJlZ2lzdGVyVXNlcihwYXlsb2FkOiBhbnkpIHtcbiAgICB0cnkge1xuICAgICAgICBhd2FpdCBheGlvcy5wb3N0KCcvYXBpL3VzZXIvcmVnaXN0ZXInLCBwYXlsb2FkKTtcbiAgICAgICAgY2hhbmdlUm91dGUoJ2xvZ2luJyk7XG4gICAgfSBjYXRjaChlcnIpIHtcbiAgICAgICAgY29uc29sZS5sb2coZXJyKTtcbiAgICB9XG59XG5cbmV4cG9ydCBhc3luYyBmdW5jdGlvbiBsb2dpblVzZXIocGF5bG9hZDogYW55KSB7XG4gICAgdHJ5IHtcbiAgICAgICAgYXdhaXQgYXhpb3MucG9zdCgnL2FwaS91c2VyL2xvZ2luJywgcGF5bG9hZCk7XG4gICAgICAgIGNoYW5nZVJvdXRlKCdnYW1lJyk7XG4gICAgfSBjYXRjaChlcnIpIHtcbiAgICAgICAgY29uc29sZS5sb2coZXJyKTtcbiAgICB9XG59XG5cbmV4cG9ydCBhc3luYyBmdW5jdGlvbiBsb2dvdXQoKSB7XG4gICAgdHJ5IHtcbiAgICAgICAgYXdhaXQgYXhpb3MucG9zdCgnL2FwaS91c2VyL2xvZ291dCcpO1xuICAgICAgICBjaGFuZ2VSb3V0ZSgnbG9naW4nKTtcbiAgICB9IGNhdGNoKGVycikge1xuICAgICAgICBjb25zb2xlLmxvZyhlcnIpO1xuICAgIH1cbn1cblxuLy8gPT09IFBVVCByb3V0ZXMgPT09IC8vXG5cbmV4cG9ydCBhc3luYyBmdW5jdGlvbiBjaGFuZ2VOZXdVc2VyKHBheWxvYWQ6IGFueSkge1xuICAgIHRyeSB7XG4gICAgICAgIGF3YWl0IGF4aW9zLnB1dCgnL2FwaS91c2VyJywge25ld1N0YXR1czogcGF5bG9hZH0pO1xuICAgIH0gY2F0Y2goZXJyKSB7XG4gICAgICAgIGNvbnNvbGUubG9nKGVycik7XG4gICAgfVxufSIsICJpbXBvcnQgYXhpb3MgZnJvbSAnYXhpb3MnO1xuaW1wb3J0IHsgY2hhcmFjdGVyLCBjaGFyYWN0ZXJzIH0gZnJvbSAnLi4vbWVudXMvY2hhcmFjdGVyLm1lbnUnO1xuXG4vLyA9PT0gR0VUIHJvdXRlcyA9PT0gLy9cblxuZXhwb3J0IGFzeW5jIGZ1bmN0aW9uIGdldENoYXJhY3RlcnMoKSB7XG4gICAgdHJ5IHtcbiAgICAgICAgY29uc3QgcmVzID0gYXdhaXQgYXhpb3MuZ2V0KCcvYXBpL2NoYXJhY3RlcnMnKTtcbiAgICAgICAgY2hhcmFjdGVycy52YWx1ZSA9IHJlcy5kYXRhO1xuICAgIH0gY2F0Y2ggKGVycikge1xuICAgICAgICBjb25zb2xlLmxvZyhlcnIpO1xuICAgIH1cbn1cblxuZXhwb3J0IGFzeW5jIGZ1bmN0aW9uIGdldENoYXJhY3RlcihpZDogc3RyaW5nKSB7XG4gICAgdHJ5IHtcbiAgICAgICAgY29uc3QgcmVzID0gYXdhaXQgYXhpb3MuZ2V0KGAvYXBpL2NoYXJhY3RlcnMvJHtwYXJzZUludChpZCl9YCk7XG4gICAgICAgIHJldHVybiByZXMuZGF0YVswXTtcbiAgICB9IGNhdGNoIChlcnIpIHtcbiAgICAgICAgY29uc29sZS5sb2coZXJyKTtcbiAgICB9XG59XG5cbi8vID09PSBQT1NUIHJvdXRlcyA9PT0gLy9cblxuZXhwb3J0IGFzeW5jIGZ1bmN0aW9uIGFkZENoYXJhY3RlcihwYXlsb2FkOiBhbnkpIHtcbiAgICB0cnkge1xuICAgICAgICBhd2FpdCBheGlvcy5wb3N0KCcvYXBpL2NoYXJhY3RlcnMnLCBwYXlsb2FkKTtcbiAgICB9IGNhdGNoIChlcnIpIHtcbiAgICAgICAgY29uc29sZS5sb2coZXJyKTtcbiAgICB9XG59XG5cbi8vID09PSBQVVQgcm91dGVzID09PSAvL1xuXG5leHBvcnQgYXN5bmMgZnVuY3Rpb24gc2V0SGVhbHRoKHBheWxvYWQ6IGFueSkge1xuICAgIHRyeSB7XG4gICAgICAgIGF3YWl0IGF4aW9zLnB1dCgnL2FwaS9jaGFyYWN0ZXJzL2hlYWx0aCcsIHBheWxvYWQpO1xuICAgICAgICBjaGFyYWN0ZXIudmFsdWUgPSBhd2FpdCBnZXRDaGFyYWN0ZXIocGF5bG9hZC5pZCk7XG4gICAgfSBjYXRjaCAoZXJyKSB7XG4gICAgICAgIGNvbnNvbGUubG9nKGVycik7XG4gICAgfVxufVxuXG5leHBvcnQgYXN5bmMgZnVuY3Rpb24gc2V0VGVtcEhlYWx0aChwYXlsb2FkOiBhbnkpIHtcbiAgICB0cnkge1xuICAgICAgICBhd2FpdCBheGlvcy5wdXQoJy9hcGkvY2hhcmFjdGVycy90ZW1wJywgcGF5bG9hZCk7XG4gICAgICAgIGNoYXJhY3Rlci52YWx1ZSA9IGF3YWl0IGdldENoYXJhY3RlcihwYXlsb2FkLmlkKTtcbiAgICB9IGNhdGNoIChlcnIpIHtcbiAgICAgICAgY29uc29sZS5sb2coZXJyKTtcbiAgICB9XG59IiwgImltcG9ydCB7IG1lbnVPcGVuLCBzZWxlY3RlZE1lbnUsIGNsb3NlTWVudSB9IGZyb20gJy4uL3V0aWxzJztcbmltcG9ydCB7IGdldENoYXJhY3RlcnMsIGdldENoYXJhY3RlciB9IGZyb20gJy4uL3JvdXRlcy9jaGFyYWN0ZXJzLnJvdXRlJztcblxuZXhwb3J0IGxldCBjaGFyYWN0ZXJzOiBhbnkgPSB7dmFsdWU6IFtdfTtcbmV4cG9ydCBsZXQgY2hhcmFjdGVyOiBhbnkgPSB7dmFsdWU6IHt9fTtcblxuZXhwb3J0IGZ1bmN0aW9uIHRvZ2dsZUNoYXJhY3Rlck1lbnUobWVudU5hbWU6IHN0cmluZykge1xuICAgIG1lbnVPcGVuLnZhbHVlID0gIW1lbnVPcGVuLnZhbHVlO1xuICAgIGlmIChtZW51T3Blbi52YWx1ZSkge1xuICAgICAgICBzZWxlY3RlZE1lbnUudmFsdWUgPSAnY2hhcmFjdGVycyc7XG4gICAgICAgIC8vIENyZWF0ZSBtZW51XG4gICAgICAgIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5nYW1lLXBhZ2UtY29udGFpbmVyJykuaW5zZXJ0QWRqYWNlbnRIVE1MKCdiZWZvcmVlbmQnLCBgXG4gICAgICAgICAgICA8ZGl2IGNsYXNzPVwibWVudVwiPlxuICAgICAgICAgICAgICAgIDxidXR0b24gY2xhc3M9XCJtZW51X19idG4gbWVudV9fYnRuLS1jbG9zZVwiPlg8L2J1dHRvbj5cbiAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzPVwibWVudV9fYm9keVwiPjwvZGl2PlxuICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgIGApO1xuICAgICAgICBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcubWVudV9fYnRuLS1jbG9zZScpLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgKCkgPT4gY2xvc2VNZW51KG1lbnVOYW1lKSk7XG4gICAgICAgIGdldENoYXJhY3RlckJvZHlEYXRhKCk7XG4gICAgfSBlbHNlIHtcbiAgICAgICAgY2xvc2VNZW51KG1lbnVOYW1lKTtcbiAgICB9XG59XG5cbmFzeW5jIGZ1bmN0aW9uIGdldENoYXJhY3RlckJvZHlEYXRhKCkge1xuICAgIGF3YWl0IGdldENoYXJhY3RlcnMoKTtcbiAgICBmb3IgKGxldCBjaGFyYWN0ZXIgb2YgY2hhcmFjdGVycykge1xuICAgICAgICBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcubWVudV9fYm9keScpLmluc2VydEFkamFjZW50SFRNTCgnYmVmb3JlZW5kJywgYFxuICAgICAgICAgICAgPGRpdiBjbGFzcz1cIm1lbnVfX2l0ZW0gbWVudV9faXRlbS0tY2hhcmFjdGVyXCIgb25jbGljaz1cInNlbGVjdENoYXJhY3Rlcigke2NoYXJhY3Rlci5pZH0pXCI+XG4gICAgICAgICAgICAgICAgPGltZyBzcmM9JHtjaGFyYWN0ZXIuaW1hZ2V9PlxuICAgICAgICAgICAgICAgIDxkaXY+XG4gICAgICAgICAgICAgICAgICAgIDxwPiR7Y2hhcmFjdGVyLmxldmVsfSAke2NoYXJhY3Rlci5uYW1lfSAke2NoYXJhY3Rlci5jbGFzc308L3A+XG4gICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgYCk7XG4gICAgfVxuXG4gICAgLy8gQWRkIG5ldyBjaGFyYWN0ZXIgYnV0dG9uXG4gICAgZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLm1lbnVfX2JvZHknKS5pbnNlcnRBZGphY2VudEhUTUwoJ2JlZm9yZWVuZCcsIGBcbiAgICAgICAgPGRpdiBjbGFzcz1cIm1lbnVfX2l0ZW0gbWVudV9faXRlbS0tY2hhcmFjdGVyLWJ0blwiPlxuICAgICAgICAgICAgPGJ1dHRvbiBjbGFzcz1cImJ0bi0tbmV3LWl0ZW1cIiBvbmNsaWNrPVwidG9nZ2xlTmV3Q2hhcmFjdGVyV2luZG93KClcIj5OZXcgQ2hhcmFjdGVyPC9idXR0b24+XG4gICAgICAgIDwvZGl2PlxuICAgIGApO1xufVxuXG5hc3luYyBmdW5jdGlvbiBzZWxlY3RDaGFyYWN0ZXIoaWQ6IHN0cmluZykge1xuICAgIGNoYXJhY3RlciA9IGF3YWl0IGdldENoYXJhY3RlcihpZCk7XG4gICAgdG9nZ2xlQ2hhcmFjdGVyTWVudSgnY2hhcmFjdGVycycpO1xufVxuXG4vLyBmdW5jdGlvbiBuZXdDaGFyYWN0ZXIoKSB7XG4vLyAgICAgZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLm1lbnVfX2JvZHknKS5pbnNlcnRBZGphY2VudEhUTUwoJ2JlZm9yZWVuZCcsIGBcbi8vICAgICAgICAgPGZvcm0gY2xhc3M9XCJmb3JtLS1tZW51XCIgb25zdWJtaXQ9XCJzdWJtaXROZXdDaGFyYWN0ZXIoZXZlbnQpXCI+XG4vLyAgICAgICAgICAgICA8aW5wdXQgcGxhY2Vob2xkZXI9XCJuYW1lXCIgb25jaGFuZ2U9XCJjaGFyYWN0ZXJOYW1lQ2hhbmdlKGV2ZW50KVwiIHJlcXVpcmVkPlxuLy8gICAgICAgICAgICAgPGJ1dHRvbiB0eXBlPVwic3VibWl0XCI+QWRkIENoYXJhY3RlcjwvYnV0dG9uPlxuLy8gICAgICAgICA8L2Zvcm0+XG4vLyAgICAgYCk7XG4vLyB9XG5cbi8vIC8vIEZvciBuZXcgY2hhcmFjdGVyIGZvcm1cbi8vIGxldCBuZXdDaGFyYWN0ZXJOYW1lLCBuZXdDaGFyYWN0ZXJMZXZlbCwgbmV3Q2hhcmFjdGVyQ2xhc3MsIG5ld0NoYXJhY3RlclJhY2U7XG4vLyBjb25zdCBjaGFyYWN0ZXJOYW1lQ2hhbmdlID0gKGUpID0+IG5ld0NoYXJhY3Rlck5hbWUgPSBlLnRhcmdldC52YWx1ZTtcblxuLy8gZnVuY3Rpb24gc3VibWl0TmV3Q2hhcmFjdGVyKGUpIHtcbi8vICAgICBlLnByZXZlbnREZWZhdWx0KCk7XG4vLyAgICAgYWRkQ2hhcmFjdGVyKHtuYW1lOiBuZXdNYXBOYW1lLCBpbWFnZTogbmV3TWFwSW1hZ2V9KTtcbi8vIH0iLCAiaW1wb3J0IHsgZ2V0Q3JlYXR1cmVCeUluZGV4IH0gZnJvbSAnLi9yb3V0ZXMvY3JlYXR1cmVzLnJvdXRlJztcbmltcG9ydCB7IGRyYWdFbGVtZW50IH0gZnJvbSAnLi91dGlscyc7XG5cbmxldCBjcmVhdHVyZUluZGV4TGlzdCA9IFtdO1xuXG5leHBvcnQgYXN5bmMgZnVuY3Rpb24gb3BlbkNyZWF0dXJlU3RhdHNXaW5kb3coaW5kZXg6IHN0cmluZywgY3VzdG9tOiBib29sZWFuKSB7XG4gICAgLy8gQ2hlY2sgaWYgYSBjcmVhdHVyZSdzIHN0YXRzIGFyZSBhbHJlYWR5IG9wZW5cbiAgICAvLyBJZiB0aGV5IGFyZSBvcGVuIHRoZSBjbG9zZSB0aGUgd2luZG93IGluc3RlYWRcbiAgICBmb3IgKGxldCBsaXN0SXRlbSBvZiBjcmVhdHVyZUluZGV4TGlzdCkge1xuICAgICAgICBpZiAobGlzdEl0ZW0gPT09IGluZGV4KSB7XG4gICAgICAgICAgICBpZiAoZG9jdW1lbnQucXVlcnlTZWxlY3RvcihgLmNyZWF0dXJlLXN0YXRzLXdpbmRvdy0tJHtpbmRleH1gKSkgZG9jdW1lbnQucXVlcnlTZWxlY3RvcihgLmNyZWF0dXJlLXN0YXRzLXdpbmRvdy0tJHtpbmRleH1gKS5yZW1vdmUoKTsgICAgICAgICBcbiAgICAgICAgICAgIGNyZWF0dXJlSW5kZXhMaXN0LnNwbGljZShjcmVhdHVyZUluZGV4TGlzdC5pbmRleE9mKGluZGV4KSwgMSk7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cbiAgICB9XG4gICAgY3JlYXR1cmVJbmRleExpc3QucHVzaChpbmRleCk7XG4gICAgLy8gR2V0IGRhdGEgZm9yIHNlbGVjdGVkIGNyZWF0dXJlXG4gICAgbGV0IGNyZWF0dXJlID0gYXdhaXQgZ2V0Q3JlYXR1cmVCeUluZGV4KGluZGV4LCBjdXN0b20pO1xuICAgIHJlbmRlckNyZWF0dXJlU3RhdHNXaW5kb3coY3JlYXR1cmUpO1xufVxuXG5jb25zdCBjcmVhdHVyZVN0YXRzV2luZG93ID0gKGNyZWF0dXJlOiBhbnkpID0+IGBcbiAgICA8ZGl2IGNsYXNzPVwiY3JlYXR1cmUtc3RhdHMtY29udGVudFwiPlxuICAgICAgICA8YnV0dG9uIGNsYXNzPVwiYnRuLS13aW5kb3ctY2xvc2VcIiBjbGFzcz1cImNyZWF0dXJlLXN0YXRzLWNsb3NlLWJ0blwiPlg8L2J1dHRvbj5cbiAgICAgICAgPGRpdiBjbGFzcz1cImNyZWF0dXJlLXN0YXRzLXdpbmRvd19faGVhZGVyIGNyZWF0dXJlLXN0YXRzLXdpbmRvdy0tJHtjcmVhdHVyZS5pbmRleH1fX2hlYWRlclwiPlxuICAgICAgICAgICAgPGgzPiR7Y3JlYXR1cmUubmFtZX08L2gzPlxuICAgICAgICAgICAgPHA+JHtjcmVhdHVyZS5zaXplID8gYCR7Y3JlYXR1cmUuc2l6ZX1gIDogJyd9JHtjcmVhdHVyZS50eXBlID8gYCAke2NyZWF0dXJlLnR5cGV9YCA6ICcnfSR7Y3JlYXR1cmUuYWxpZ25tZW50ID8gYCwgJHtjcmVhdHVyZS5hbGlnbm1lbnR9YDogJyd9PC9wPlxuICAgICAgICA8L2Rpdj5cbiAgICAgICAgPGRpdiBjbGFzcz1cImNyZWF0dXJlLXN0YXRzLXdpbmRvd19fYm9keVwiPlxuICAgICAgICAgICAgPHA+PHNwYW4gY2xhc3M9XCJib2xkXCI+QXJtb3IgQ2xhc3M8L3NwYW4+ICR7Y3JlYXR1cmUuYWN9PC9wPlxuICAgICAgICAgICAgPHA+PHNwYW4gY2xhc3M9XCJib2xkXCI+SGVhbHRoPC9zcGFuPiAke2NyZWF0dXJlLmhpdF9wb2ludHN9ICR7Y3JlYXR1cmUuaGl0X2RpY2UgPyBgKCR7Y3JlYXR1cmUuaGl0X2RpY2V9KWAgOiAnJ308L3A+XG4gICAgICAgICAgICA8ZGl2IGNsYXNzPVwiY3JlYXR1cmUtc3RhdHMtd2luZG93X19zcGVlZFwiIGlkPVwic3BlZWQtLSR7Y3JlYXR1cmUuaW5kZXh9XCI+PC9kaXY+XG4gICAgICAgIDxkaXYgY2xhc3M9XCJjcmVhdHVyZXMtd2luZG93X19ib2R5LS1nZW5lcmFsLXN0YXRzXCI+XG4gICAgICAgICAgICA8ZGl2IGNsYXNzPVwiY3JlYXR1cmUtc3RhdHMtd2luZG93X19zY29yZXNcIiBpZD1cInNjb3Jlcy0tJHtjcmVhdHVyZS5pbmRleH1cIj48L2Rpdj5cbiAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJjcmVhdHVyZS1zdGF0cy13aW5kb3dfX3Byb2ZpY2llbmNpZXNcIiBpZD1cInByb2ZpY2llbmNpZXMtLSR7Y3JlYXR1cmUuaW5kZXh9XCI+PC9kaXY+XG4gICAgICAgICAgICA8ZGl2IGNsYXNzPVwiY3JlYXR1cmUtc3RhdHMtd2luZG93X19wcm9maWNpZW5jaWVzXCIgaWQ9XCJza2lsbHMtLSR7Y3JlYXR1cmUuaW5kZXh9XCI+PC9kaXY+XG4gICAgICAgICAgICA8ZGl2IGNsYXNzPVwiY3JlYXR1cmUtc3RhdHMtd2luZG93X192dWwtcmVzXCIgaWQ9XCJ2dWwtcmVzLS0ke2NyZWF0dXJlLmluZGV4fVwiPjwvZGl2PlxuICAgICAgICAgICAgPGRpdiBjbGFzcz1cImNyZWF0dXJlLXN0YXRzLXdpbmRvd19fc2Vuc2VzXCIgaWQ9XCJzZW5zZXMtLSR7Y3JlYXR1cmUuaW5kZXh9XCI+PC9kaXY+XG4gICAgICAgICAgICA8ZGl2IGNsYXNzPVwiY3JlYXR1cmUtc3RhdHMtd2luZG93X19sYW5ndWFnZXNcIj5cbiAgICAgICAgICAgICAgICAke2NyZWF0dXJlLmxhbmd1YWdlcyA/IGA8cD48c3BhbiBjbGFzcz1cImJvbGRcIj5MYW5ndWFnZXM8L3NwYW4+ICR7Y3JlYXR1cmUubGFuZ3VhZ2VzfTwvcD5gIDogYGB9XG4gICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJjcmVhdHVyZS1zdGF0cy13aW5kb3dfX2JvZHlcIj5cbiAgICAgICAgICAgICAgICA8cD48c3BhbiBjbGFzcz1cImJvbGRcIj5DaGFsbGVuZ2U8L3NwYW4+ICR7Y3JlYXR1cmUuY3IgPyBjcmVhdHVyZS5jciA6ICctJ30gKCR7Y3JlYXR1cmUueHAgPyBjcmVhdHVyZS54cCA6IDB9IFhQKTwvcD5cbiAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICA8L2Rpdj5cbiAgICAgICAgPGRpdiBjbGFzcz1cImNyZWF0dXJlLXN0YXRzLXdpbmRvd19fc3BlY2lhbC1hYmlsaXRpZXNcIiBpZD1cInNwZWNpYWwtYWJpbGl0aWVzLS0ke2NyZWF0dXJlLmluZGV4fVwiPjwvZGl2PlxuICAgICAgICAke2NyZWF0dXJlLmFjdGlvbnMubGVuZ3RoID4gMCA/IGA8ZGl2IGNsYXNzPVwiY3JlYXR1cmVzLXdpbmRvd19fYm9keS0tYWN0aW9uc1wiPlxuICAgICAgICAgICAgPGg0PkFjdGlvbnM8L2g0PlxuICAgICAgICAgICAgPGRpdiBjbGFzcz1cImNyZWF0dXJlLXN0YXRzLXdpbmRvd19fYWN0aW9uc1wiIGlkPVwiYWN0aW9ucy0tJHtjcmVhdHVyZS5pbmRleH1cIj48L2Rpdj5cbiAgICAgICAgPC9kaXY+YCA6ICcnfVxuICAgICAgICAke2NyZWF0dXJlLmxlZ0FjdGlvbnMubGVuZ3RoID4gMCA/IGA8ZGl2IGNsYXNzPVwiY3JlYXR1cmVzLXdpbmRvd19fYm9keS0tYWN0aW9uc1wiPlxuICAgICAgICAgICAgPGg0PkxlZ2VuZGFyeSBBY3Rpb25zPC9oND5cbiAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJjcmVhdHVyZS1zdGF0cy13aW5kb3dfX2xlZ2VuZGFyeS1hY3Rpb25zXCIgaWQ9XCJsZWdlbmRhcnktYWN0aW9ucy0tJHtjcmVhdHVyZS5pbmRleH1cIj48L2Rpdj5cbiAgICAgICAgPC9kaXY+YCA6ICcnfVxuICAgIDwvZGl2PlxuYDtcblxuZnVuY3Rpb24gcmVuZGVyQ3JlYXR1cmVTdGF0c1dpbmRvdyhjcmVhdHVyZTogYW55KSB7XG4gICAgY29uc3Qgd2luZG93ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignYm9keScpLmFwcGVuZENoaWxkKGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpKTtcbiAgICB3aW5kb3cuY2xhc3NMaXN0LmFkZCgnY3JlYXR1cmUtc3RhdHMtd2luZG93Jyk7XG4gICAgd2luZG93LmNsYXNzTGlzdC5hZGQoYGNyZWF0dXJlLXN0YXRzLXdpbmRvdy0tJHtjcmVhdHVyZS5pbmRleH1gKTtcbiAgICB3aW5kb3cuaW5zZXJ0QWRqYWNlbnRIVE1MKCdiZWZvcmVlbmQnLCBjcmVhdHVyZVN0YXRzV2luZG93KGNyZWF0dXJlKSk7XG5cbiAgICAvLyBQb3B1bGF0ZSBib2R5IGRhdGFcbiAgICBnZXRDcmVhdHVyZVNwZWVkRGF0YShjcmVhdHVyZSk7XG4gICAgZ2V0Q3JlYXR1cmVTY29yZXNEYXRhKGNyZWF0dXJlKTtcbiAgICBnZXRDcmVhdHVyZVByb2ZpY2llbmN5RGF0YShjcmVhdHVyZSk7XG4gICAgZ2V0Q3JlYXR1cmVWdWxSZXNEYXRhKGNyZWF0dXJlKTtcbiAgICBnZXRDcmVhdHVyZVNlbnNlc0RhdGEoY3JlYXR1cmUpO1xuICAgIGdldENyZWF0dXJlU3BlY2lhbEFiaWxpdHlEYXRhKGNyZWF0dXJlKTtcbiAgICBnZXRDcmVhdHVyZUFjdGlvbnNEYXRhKGNyZWF0dXJlKTtcbiAgICBnZXRDcmVhdHVyZUxlZ0FjdGlvbnNEYXRhKGNyZWF0dXJlKTtcblxuICAgIC8vIE1ha2UgdGhpcyB3aW5kb3cgZHJhZ2dhYmxlXG4gICAgZHJhZ0VsZW1lbnQod2luZG93LCBgY3JlYXR1cmUtc3RhdHMtd2luZG93LS0ke2NyZWF0dXJlLmluZGV4fWApO1xufVxuXG5cbi8vID09PSBDcmVhdHVyZSBEYXRhID09PSAvL1xuXG5mdW5jdGlvbiBnZXRDcmVhdHVyZVNwZWVkRGF0YShjcmVhdHVyZTogYW55KSB7XG4gICAgbGV0IHNwZWVkcyA9IFtdO1xuICAgIGxldCBleGlzdHMgPSBmYWxzZTtcbiAgICBjcmVhdHVyZS5zcGVlZHMuZm9yRWFjaCgoc3BlZWQ6IGFueSkgPT4ge1xuICAgICAgICBpZiAoc3BlZWQudmFsdWUpIHtcbiAgICAgICAgICAgIGV4aXN0cyA9IHRydWU7XG4gICAgICAgICAgICBzcGVlZHMucHVzaChzcGVlZCk7XG4gICAgICAgIH1cbiAgICB9KTtcbiAgICBpZiAoIWV4aXN0cykgcmV0dXJuO1xuXG4gICAgY29uc3QgdGV4dCA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKGBzcGVlZC0tJHtjcmVhdHVyZS5pbmRleH1gKS5hcHBlbmRDaGlsZChkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdwJykpO1xuICAgIHRleHQuaW5zZXJ0QWRqYWNlbnRIVE1MKCdiZWZvcmVlbmQnLCBgPHNwYW4gY2xhc3M9XCJib2xkXCI+U3BlZWQgPC9zcGFuPmApO1xuICAgIHNwZWVkcy5mb3JFYWNoKChzcGVlZCkgPT4ge1xuICAgICAgICB0ZXh0Lmluc2VydEFkamFjZW50SFRNTCgnYmVmb3JlZW5kJywgYFxuICAgICAgICAgICAgJHtzcGVlZC5uYW1lfSAke3NwZWVkLnZhbHVlfSBmdC4sXG4gICAgICAgIGApO1xuICAgIH0pO1xufVxuXG5mdW5jdGlvbiBnZXRDcmVhdHVyZVNjb3Jlc0RhdGEoY3JlYXR1cmU6IGFueSkge1xuICAgIGxldCBzY29yZU5hbWVzID0gWydTdHInLCAnRGV4JywgJ0NvbicsICdJbnQnLCAnV2lzJywgJ0NoYXInXTtcbiAgICBsZXQgc2NvcmVWYWx1ZXMgPSBbXG4gICAgICAgIGNyZWF0dXJlLnN0cixcbiAgICAgICAgY3JlYXR1cmUuZGV4LFxuICAgICAgICBjcmVhdHVyZS5jb24sXG4gICAgICAgIGNyZWF0dXJlLmludCxcbiAgICAgICAgY3JlYXR1cmUud2lzLFxuICAgICAgICBjcmVhdHVyZS5jaGFyXG4gICAgXTtcbiAgICBcbiAgICBmb3IgKGxldCBpID0gMDsgaSA8IDY7IGkrKykge1xuICAgICAgICBsZXQgbW9kaWZpZXIgPSBNYXRoLmZsb29yKChzY29yZVZhbHVlc1tpXSAtIDEwKSAvIDIpO1xuICAgICAgICBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChgc2NvcmVzLS0ke2NyZWF0dXJlLmluZGV4fWApLmluc2VydEFkamFjZW50SFRNTCgnYmVmb3JlZW5kJywgYFxuICAgICAgICAgICAgPGRpdiBjbGFzcz1cImNyZWF0dXJlLXNjb3Jlc19fYm94XCI+XG4gICAgICAgICAgICAgICAgPHNwYW4gY2xhc3M9XCJib2xkXCI+PHA+JHtzY29yZU5hbWVzW2ldfTwvcD48L3NwYW4+XG4gICAgICAgICAgICAgICAgPHA+JHttb2RpZmllciA8IDAgPyAnJyA6ICcrJ30ke21vZGlmaWVyfTwvcD5cbiAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzPVwiY3JlYXR1cmUtc2NvcmVzX19tb2RpZmllclwiPlxuICAgICAgICAgICAgICAgICAgICA8cD4ke3Njb3JlVmFsdWVzW2ldfTwvcD5cbiAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICBgKTtcbiAgICB9XG59XG5cbmZ1bmN0aW9uIGdldENyZWF0dXJlUHJvZmljaWVuY3lEYXRhKGNyZWF0dXJlOiBhbnkpIHtcbiAgICBjb25zdCB0ZXh0ID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoYHByb2ZpY2llbmNpZXMtLSR7Y3JlYXR1cmUuaW5kZXh9YCkuYXBwZW5kQ2hpbGQoZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgncCcpKTtcbiAgICB0ZXh0Lmluc2VydEFkamFjZW50SFRNTCgnYmVmb3JlZW5kJyxgPHNwYW4gY2xhc3M9XCJib2xkXCI+U2F2aW5nIFRocm93cyA8L3NwYW4+YCk7XG4gICAgbGV0IHNraWxscyA9IFtdO1xuICAgIGxldCBzdHJpbmcgPSAnJztcblxuICAgIGNyZWF0dXJlLnByb2ZpY2llbmNpZXMuZm9yRWFjaCgocHJvZmljaWVuY3k6IGFueSkgPT4ge1xuICAgICAgICBjb25zdCBtb2RpZmllZFByb2YgPSBzZXBhcmF0ZVByb2YocHJvZmljaWVuY3kubmFtZSArIHByb2ZpY2llbmN5LnZhbHVlLCBwcm9maWNpZW5jeS52YWx1ZSwgcHJvZmljaWVuY3kubmFtZSk7XG4gICAgICAgIGlmIChwcm9maWNpZW5jeS5uYW1lLmluY2x1ZGVzKCdTYXZpbmcnKSkge1xuICAgICAgICAgICAgc3RyaW5nICs9IGAgJHttb2RpZmllZFByb2Z9ICske3Byb2ZpY2llbmN5LnZhbHVlfSxgO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgc2tpbGxzLnB1c2goe25hbWU6IG1vZGlmaWVkUHJvZiwgdmFsdWU6IHByb2ZpY2llbmN5LnZhbHVlfSk7XG4gICAgICAgIH1cbiAgICB9KTtcbiAgICBzdHJpbmcgPSBzdHJpbmcucmVwbGFjZSgvLCokLywgJycpO1xuICAgIHRleHQuaW5zZXJ0QWRqYWNlbnRIVE1MKCdiZWZvcmVlbmQnLCBzdHJpbmcpO1xuICAgIC8vIElmIHRoZXJlIGFyZSBubyBzYXZlcywgcmVtb3ZlIHRoZSBzZWN0aW9uXG4gICAgaWYgKHN0cmluZyA9PT0gJycpIHRleHQucmVtb3ZlKCk7XG5cbiAgICBzdHJpbmcgPSAnJztcbiAgICBjb25zdCBza2lsbHNUZXh0ID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoYHNraWxscy0tJHtjcmVhdHVyZS5pbmRleH1gKS5hcHBlbmRDaGlsZChkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdwJykpO1xuICAgIHNraWxsc1RleHQuaW5zZXJ0QWRqYWNlbnRIVE1MKCdiZWZvcmVlbmQnLGA8c3BhbiBjbGFzcz1cImJvbGRcIj5Ta2lsbHMgPC9zcGFuPmApO1xuICAgIHNraWxscy5mb3JFYWNoKChza2lsbCkgPT4ge1xuICAgICAgICBzdHJpbmcgKz0gYCAke3NraWxsLm5hbWV9ICske3NraWxsLnZhbHVlfSxgO1xuICAgIH0pO1xuICAgIHN0cmluZyA9IHN0cmluZy5yZXBsYWNlKC8sKiQvLCAnJyk7XG4gICAgc2tpbGxzVGV4dC5pbnNlcnRBZGphY2VudEhUTUwoJ2JlZm9yZWVuZCcsIHN0cmluZyk7XG4gICAgLy8gSWYgdGhlcmUgYXJlIG5vIHNraWxscywgcmVtb3ZlIHRoZSBzZWN0aW9uXG4gICAgaWYgKHN0cmluZyA9PT0gJycpIHNraWxsc1RleHQucmVtb3ZlKCk7XG59XG5cbmZ1bmN0aW9uIGdldENyZWF0dXJlVnVsUmVzRGF0YShjcmVhdHVyZTogYW55KSB7XG4gICAgLy8gVnVsbmVyYWJpbGl0aWVzXG4gICAgaWYgKGNyZWF0dXJlLnZ1bG5lcmFiaWxpdGllcy5sZW5ndGggPiAwKSB7XG4gICAgICAgIGNvbnN0IHRleHQgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChgdnVsLXJlcy0tJHtjcmVhdHVyZS5pbmRleH1gKS5hcHBlbmRDaGlsZChkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdwJykpO1xuICAgICAgICB0ZXh0Lmluc2VydEFkamFjZW50SFRNTCgnYmVmb3JlZW5kJyxgPHNwYW4gY2xhc3M9XCJib2xkXCI+VnVsbmVyYWJpbGl0aWVzIDwvc3Bhbj5gKTtcbiAgICAgICAgbGV0IHN0cmluZyA9ICcnO1xuXG4gICAgICAgIGNyZWF0dXJlLnZ1bG5lcmFiaWxpdGllcy5mb3JFYWNoKChzdGF0OiBhbnkpID0+IHtcbiAgICAgICAgICAgIHN0cmluZyArPSBgICR7c3RhdH0sYDtcbiAgICAgICAgfSk7XG4gICAgICAgIHN0cmluZyA9IHN0cmluZy5yZXBsYWNlKC8sKiQvLCAnJyk7XG4gICAgICAgIHRleHQuaW5zZXJ0QWRqYWNlbnRIVE1MKCdiZWZvcmVlbmQnLCBzdHJpbmcpO1xuICAgIH1cblxuICAgIC8vIFJlc2lzdGFuY2VzXG4gICAgaWYgKGNyZWF0dXJlLnJlc2lzdGFuY2VzLmxlbmd0aCA+IDApIHtcbiAgICAgICAgY29uc3QgdGV4dCA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKGB2dWwtcmVzLS0ke2NyZWF0dXJlLmluZGV4fWApLmFwcGVuZENoaWxkKGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ3AnKSk7XG4gICAgICAgIHRleHQuaW5zZXJ0QWRqYWNlbnRIVE1MKCdiZWZvcmVlbmQnLGA8c3BhbiBjbGFzcz1cImJvbGRcIj5SZXNpc3RhbmNlcyA8L3NwYW4+YCk7XG4gICAgICAgIGxldCBzdHJpbmcgPSAnJztcblxuICAgICAgICBjcmVhdHVyZS5yZXNpc3RhbmNlcy5mb3JFYWNoKChzdGF0OiBhbnkpID0+IHtcbiAgICAgICAgICAgIHN0cmluZyArPSBgICR7c3RhdH0sYDtcbiAgICAgICAgfSk7XG4gICAgICAgIHN0cmluZyA9IHN0cmluZy5yZXBsYWNlKC8sKiQvLCAnJyk7XG4gICAgICAgIHRleHQuaW5zZXJ0QWRqYWNlbnRIVE1MKCdiZWZvcmVlbmQnLCBzdHJpbmcpO1xuICAgIH1cblxuICAgIC8vIERhbWFnZSBpbW11bml0aWVzXG4gICAgaWYgKGNyZWF0dXJlLmRhbWFnZUltbXVuaXRpZXMubGVuZ3RoID4gMCkge1xuICAgICAgICBjb25zdCB0ZXh0ID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoYHZ1bC1yZXMtLSR7Y3JlYXR1cmUuaW5kZXh9YCkuYXBwZW5kQ2hpbGQoZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgncCcpKTtcbiAgICAgICAgdGV4dC5pbnNlcnRBZGphY2VudEhUTUwoJ2JlZm9yZWVuZCcsYDxzcGFuIGNsYXNzPVwiYm9sZFwiPkRhbWFnZSBJbW11bml0aWVzIDwvc3Bhbj5gKTtcbiAgICAgICAgbGV0IHN0cmluZyA9ICcnO1xuXG4gICAgICAgIGNyZWF0dXJlLmRhbWFnZUltbXVuaXRpZXMuZm9yRWFjaCgoc3RhdDogYW55KSA9PiB7XG4gICAgICAgICAgICBzdHJpbmcgKz0gYCAke3N0YXR9LGA7XG4gICAgICAgIH0pO1xuICAgICAgICBzdHJpbmcgPSBzdHJpbmcucmVwbGFjZSgvLCokLywgJycpO1xuICAgICAgICB0ZXh0Lmluc2VydEFkamFjZW50SFRNTCgnYmVmb3JlZW5kJywgc3RyaW5nKTtcbiAgICB9XG5cbiAgICAvLyBDb25kaXRpb24gaW1tdW5pdGllc1xuICAgIGlmIChjcmVhdHVyZS5jb25kaXRpb25JbW11bml0aWVzLmxlbmd0aCA+IDApIHtcbiAgICAgICAgY29uc3QgdGV4dCA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKGB2dWwtcmVzLS0ke2NyZWF0dXJlLmluZGV4fWApLmFwcGVuZENoaWxkKGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ3AnKSk7XG4gICAgICAgIHRleHQuaW5zZXJ0QWRqYWNlbnRIVE1MKCdiZWZvcmVlbmQnLGA8c3BhbiBjbGFzcz1cImJvbGRcIj5Db25kaXRpb24gSW1tdW5pdGllcyA8L3NwYW4+YCk7XG4gICAgICAgIGxldCBzdHJpbmcgPSAnJztcblxuICAgICAgICBjcmVhdHVyZS5jb25kaXRpb25JbW11bml0aWVzLmZvckVhY2goKHN0YXQ6IGFueSkgPT4ge1xuICAgICAgICAgICAgc3RyaW5nICs9IGAgJHtzdGF0fSxgO1xuICAgICAgICB9KTtcbiAgICAgICAgc3RyaW5nID0gc3RyaW5nLnJlcGxhY2UoLywqJC8sICcnKTtcbiAgICAgICAgdGV4dC5pbnNlcnRBZGphY2VudEhUTUwoJ2JlZm9yZWVuZCcsIHN0cmluZyk7XG4gICAgfVxufVxuXG5mdW5jdGlvbiBnZXRDcmVhdHVyZVNlbnNlc0RhdGEoY3JlYXR1cmU6IGFueSkge1xuICAgIGlmIChjcmVhdHVyZS5zZW5zZXMubGVuZ3RoID09PSAwKSByZXR1cm47XG4gICAgY29uc3QgdGV4dCA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKGBzZW5zZXMtLSR7Y3JlYXR1cmUuaW5kZXh9YCkuYXBwZW5kQ2hpbGQoZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgncCcpKTtcbiAgICB0ZXh0Lmluc2VydEFkamFjZW50SFRNTCgnYmVmb3JlZW5kJyxgPHNwYW4gY2xhc3M9XCJib2xkXCI+U2Vuc2VzIDwvc3Bhbj5gKTtcbiAgICBsZXQgc3RyaW5nID0gJyc7XG5cbiAgICBjcmVhdHVyZS5zZW5zZXMuZm9yRWFjaCgoc2Vuc2UpID0+IHtcbiAgICAgICAgaWYgKHNlbnNlLm5hbWUuaW5jbHVkZXMoJ3Bhc3NpdmUnKSB8fCBzZW5zZS5uYW1lLmluY2x1ZGVzKCdQYXNzaXZlJykpIHtcbiAgICAgICAgICAgIHN0cmluZyArPSBgICR7c2Vuc2UubmFtZX0gJHtzZW5zZS52YWx1ZX0sYDtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHN0cmluZyArPSBgICR7c2Vuc2UubmFtZX0gJHtzZW5zZS52YWx1ZX0gZnQuLGA7XG4gICAgICAgIH1cbiAgICB9KTtcbiAgICBzdHJpbmcgPSBzdHJpbmcucmVwbGFjZSgvLCokLywgJycpO1xuICAgIHRleHQuaW5zZXJ0QWRqYWNlbnRIVE1MKCdiZWZvcmVlbmQnLCBzdHJpbmcpO1xufVxuXG5mdW5jdGlvbiBnZXRDcmVhdHVyZVNwZWNpYWxBYmlsaXR5RGF0YShjcmVhdHVyZTogYW55KSB7XG4gICAgY3JlYXR1cmUuYWJpbGl0aWVzLmZvckVhY2goKGFiaWxpdHk6IGFueSkgPT4ge1xuICAgICAgICBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChgc3BlY2lhbC1hYmlsaXRpZXMtLSR7Y3JlYXR1cmUuaW5kZXh9YCkuaW5zZXJ0QWRqYWNlbnRIVE1MKCdiZWZvcmVlbmQnLCBgXG4gICAgICAgICAgICA8ZGl2IGNsYXNzPVwic3BlY2lhbC1hYmlsaXRpZXNfX2JveFwiPlxuICAgICAgICAgICAgICAgIDxwIGNsYXNzPVwic3BlY2lhbC1hYmlsaXRpZXNfX25hbWVcIj48c3BhbiBjbGFzcz1cImJvbGRcIj4ke2FiaWxpdHkubmFtZX0uPC9zcGFuPiAke2FiaWxpdHkuZGVzY308L3A+XG4gICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgYCk7XG4gICAgfSk7XG59XG5cbmZ1bmN0aW9uIGdldENyZWF0dXJlQWN0aW9uc0RhdGEoY3JlYXR1cmU6IGFueSkge1xuICAgIGxldCBpID0gMDtcbiAgICBjcmVhdHVyZS5hY3Rpb25zLmZvckVhY2goKGFjdGlvbikgPT4ge1xuICAgICAgICBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChgYWN0aW9ucy0tJHtjcmVhdHVyZS5pbmRleH1gKS5pbnNlcnRBZGphY2VudEhUTUwoJ2JlZm9yZWVuZCcsIGBcbiAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJhY3Rpb25zX19ib3hcIj5cbiAgICAgICAgICAgICAgICA8cCBjbGFzcz1cImFjdGlvbnNfX25hbWVcIj48c3BhbiBjbGFzcz1cImJvbGRcIj4ke2FjdGlvbi5uYW1lfS48L3NwYW4+ICR7YWN0aW9uLmRlc2N9PC9wPlxuICAgICAgICAgICAgICAgICR7YWN0aW9uLmF0dGFja19ib251cyA/IGA8YnV0dG9uIGNsYXNzPVwiYnRuLS1hdHRhY2sgYnRuLS1ob3ZlclwiPjxpIGNsYXNzPVwiZmEtc29saWQgZmEtZGljZS1kMjBcIj48L2k+ICske2FjdGlvbi5hdHRhY2tfYm9udXN9PC9idXR0b24+YCA6ICcnfVxuICAgICAgICAgICAgICAgIDxzcGFuIGlkPVwiJHtjcmVhdHVyZS5pbmRleH0tJHthY3Rpb24ubmFtZX0tJHtpfVwiPjwvc3Bhbj5cbiAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICBgKTtcbiAgICAgICAgaSsrO1xuICAgIH0pO1xuXG4gICAgaSA9IDA7XG4gICAgY3JlYXR1cmUuYWN0aW9ucy5mb3JFYWNoKChhY3Rpb246IGFueSkgPT4ge1xuICAgICAgICBsZXQgZWxlbWVudCA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKGAke2NyZWF0dXJlLmluZGV4fS0ke2FjdGlvbi5uYW1lfS0ke2l9YCk7XG4gICAgICAgIGVsZW1lbnQuY2xhc3NMaXN0LmFkZCgnYWN0aW9uc19fYm94LS1kbWdfZGljZScpO1xuXG4gICAgICAgIGFjdGlvbi5kYW1hZ2UuZm9yRWFjaCgoZG1nOiBhbnkpID0+IHtcbiAgICAgICAgICAgIGVsZW1lbnQuaW5zZXJ0QWRqYWNlbnRIVE1MKCdiZWZvcmVlbmQnLCBgPGJ1dHRvbiBjbGFzcz1cImJ0bi0tYXR0YWNrIGJ0bi0taG92ZXJcIj4ke2RtZy5kYW1hZ2VEaWNlfSAke2RtZy5kYW1hZ2VUeXBlfTwvYnV0dG9uPmApO1xuICAgICAgICB9KTtcbiAgICAgICAgaSsrO1xuICAgIH0pO1xufVxuXG5mdW5jdGlvbiBnZXRDcmVhdHVyZUxlZ0FjdGlvbnNEYXRhKGNyZWF0dXJlOiBhbnkpIHtcbiAgICBsZXQgaSA9IDA7XG4gICAgY3JlYXR1cmUubGVnQWN0aW9ucy5mb3JFYWNoKChhY3Rpb246IGFueSkgPT4ge1xuICAgICAgICBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChgbGVnZW5kYXJ5LWFjdGlvbnMtLSR7Y3JlYXR1cmUuaW5kZXh9YCkuaW5zZXJ0QWRqYWNlbnRIVE1MKCdiZWZvcmVlbmQnLCBgXG4gICAgICAgICAgICA8ZGl2IGNsYXNzPVwiYWN0aW9uc19fYm94XCI+XG4gICAgICAgICAgICAgICAgPHAgY2xhc3M9XCJhY3Rpb25zX19uYW1lXCI+PHNwYW4gY2xhc3M9XCJib2xkXCI+JHthY3Rpb24ubmFtZX0uPC9zcGFuPiAke2FjdGlvbi5kZXNjfTwvcD5cbiAgICAgICAgICAgICAgICAke2FjdGlvbi5hdHRhY2tfYm9udXMgPyBgPGJ1dHRvbiBjbGFzcz1cImJ0bi0tYXR0YWNrIGJ0bi0taG92ZXJcIj48aSBjbGFzcz1cImZhLXNvbGlkIGZhLWRpY2UtZDIwXCI+PC9pPiArJHthY3Rpb24uYXR0YWNrX2JvbnVzfTwvYnV0dG9uPmAgOiAnJ31cbiAgICAgICAgICAgICAgICA8c3BhbiBpZD1cIiR7Y3JlYXR1cmUuaW5kZXh9LSR7YWN0aW9uLm5hbWV9LSR7aX1cIj48L3NwYW4+XG4gICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgYCk7XG4gICAgICAgIGkrKztcbiAgICB9KTtcblxuICAgIGkgPSAwO1xuICAgIGNyZWF0dXJlLmxlZ0FjdGlvbnMuZm9yRWFjaCgoYWN0aW9uOiBhbnkpID0+IHtcbiAgICAgICAgbGV0IGVsZW1lbnQgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChgJHtjcmVhdHVyZS5pbmRleH0tJHthY3Rpb24ubmFtZX0tJHtpfWApO1xuICAgICAgICBlbGVtZW50LmNsYXNzTGlzdC5hZGQoJ2xlZ2VuZGFyeS1hY3Rpb25zX19ib3gtLWRtZ19kaWNlJyk7XG5cbiAgICAgICAgYWN0aW9uLmRhbWFnZS5mb3JFYWNoKChkbWc6IGFueSkgPT4ge1xuICAgICAgICAgICAgaWYgKGRtZy5kYW1hZ2VEaWNlKSB7XG4gICAgICAgICAgICAgICAgZWxlbWVudC5pbnNlcnRBZGphY2VudEhUTUwoJ2JlZm9yZWVuZCcsIGA8YnV0dG9uIGNsYXNzPVwiYnRuLS1hdHRhY2sgYnRuLS1ob3ZlclwiPiR7ZG1nLmRhbWFnZURpY2V9ICR7ZG1nLmRhbWFnZVR5cGV9PC9idXR0b24+YCk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0pO1xuICAgICAgICBpKys7XG4gICAgfSk7XG59XG5cblxuLy8gUmVtb3ZlIGEgc3BlY2lmaWMgY3JlYXR1cmUgd2luZG93XG5mdW5jdGlvbiByZW1vdmVDcmVhdHVyZVN0YXRzV2luZG93KGluZGV4OiBhbnkpIHtcbiAgICBjcmVhdHVyZUluZGV4TGlzdC5mb3JFYWNoKChsaXN0SXRlbTogYW55KSA9PiB7XG4gICAgICAgIGlmIChsaXN0SXRlbSA9PT0gaW5kZXgpIHtcbiAgICAgICAgICAgIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoYC5jcmVhdHVyZS1zdGF0cy13aW5kb3ctLSR7aW5kZXh9YCkucmVtb3ZlKCk7ICAgICAgICAgXG4gICAgICAgICAgICBjcmVhdHVyZUluZGV4TGlzdC5zcGxpY2UoY3JlYXR1cmVJbmRleExpc3QuaW5kZXhPZihpbmRleCksIDEpO1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG4gICAgfSk7XG59XG5cbi8vIFJldHVybnMgYSBzdHJpbmcgd2l0aG91dCB0aGUgc3F1YXJlIGJyYWNrZXRzLCBhbmQgYXJyYXkgd2l0aCBhY3Rpb24gcm9sbHNcbmV4cG9ydCBmdW5jdGlvbiBnZXRBY3Rpb25EZXNjKF9zdHJpbmc6IGFueSkge1xuICAgIGxldCBzdHJpbmcgPSBfc3RyaW5nXG4gICAgbGV0IHJvbGxzID0gW107XG4gICAgbGV0IHRvSGl0ID0gJyc7XG5cbiAgICAvLyBDaGVja3MgaWYgdGhlcmUgaXMgYW4gYXR0YWNrIGJvbnVzXG4gICAgd2hpbGUgKHN0cmluZy5pbmNsdWRlcygne3snKSkge1xuICAgICAgICB0b0hpdCA9IHN0cmluZy5zcGxpdCgne3snKVsxXS5zcGxpdCgnfX0nKVswXTtcbiAgICAgICAgc3RyaW5nID0gc3RyaW5nLnJlcGxhY2UoJ3t7JywgJycpLnJlcGxhY2UoJ319JywgJycpO1xuICAgIH1cblxuICAgIHdoaWxlKHRvSGl0LmluY2x1ZGVzKCcrJykpIHtcbiAgICAgICAgdG9IaXQgPSB0b0hpdC5yZXBsYWNlKCcrJywgJycpO1xuICAgIH1cblxuICAgIC8vIE1vZGlmaWVzIHN0cmluZyB0byBnZXQgZG1nIHJvbGxzLCBhbmQgZGVzY3JpcHRpb24gd2l0aCB0aGUgYnJhY2tldHNcbiAgICB3aGlsZSAoc3RyaW5nLmluY2x1ZGVzKCdbWycpKSB7XG4gICAgICAgIHJvbGxzLnB1c2goc3RyaW5nLnNwbGl0KCdbWycpWzFdLnNwbGl0KCddXScpWzBdKTtcbiAgICAgICAgc3RyaW5nID0gc3RyaW5nLnJlcGxhY2UoJ1tbJywgJycpLnJlcGxhY2UoJ11dJywgJycpO1xuICAgIH1cbiAgICByZXR1cm4ge3JvbGxzOiByb2xscywgZGVzYzogc3RyaW5nLCB0b0hpdDogdG9IaXR9O1xufVxuXG4vLyBTcGxpdHMgYW5kIHJldHVybnMgYW4gYXR0YWNrIGRhbWFnZSByb2xsc1xuZXhwb3J0IGZ1bmN0aW9uIHNlcGFyYXRlRG1nUm9sbChkbWc6IGFueSkge1xuICAgIGNvbnN0IFsgZGFtYWdlRGljZSwgZGFtYWdlVHlwZSBdID0gZG1nLnNwbGl0KCcgJyk7XG4gICAgcmV0dXJuIHsgZGFtYWdlRGljZSwgZGFtYWdlVHlwZSB9O1xufVxuXG4vLyBTZXBhcmF0ZXMgdGhlIHN0cmluZyBmb3Igc2tpbGxzL3NhdmluZyB0aHJvd3MgYW5kIHNwbGl0cyB0aGVtIGludG8gdGhlaXIgbmFtZSBhbmQgdmFsdWUgXG5leHBvcnQgZnVuY3Rpb24gc2VwYXJhdGVQcm9mKHN0cmluZzogc3RyaW5nLCB2YWx1ZTogc3RyaW5nLCBuYW1lOiBzdHJpbmcpIHtcbiAgICBjb25zdCBzYXZlID0gc3RyaW5nLnNwbGl0KCdTYXZpbmcgVGhyb3c6ICcpO1xuICAgIGNvbnN0IHNraWxsID0gc3RyaW5nLnNwbGl0KCdTa2lsbDogJyk7XG4gICAgXG4gICAgaWYgKHNhdmVbMF0gPT09ICcnKSB7XG4gICAgICAgIGNvbnN0IG5hbWUgPSBzYXZlWzFdLnNwbGl0KHZhbHVlKTtcbiAgICAgICAgcmV0dXJuIG5hbWVbMF0udG9TdHJpbmcoKTtcbiAgICB9IGVsc2UgaWYgKHNraWxsWzBdID09PSAnJykge1xuICAgICAgICBjb25zdCBuYW1lID0gc2tpbGxbMV0uc3BsaXQodmFsdWUpO1xuICAgICAgICByZXR1cm4gbmFtZVswXS50b1N0cmluZygpO1xuICAgIH0gXG4gICAgcmV0dXJuIG5hbWU7XG59XG5cblxuLy8gaWYgKHR5cGVvZiBtb2R1bGUgIT09ICd1bmRlZmluZWQnKSBtb2R1bGUuZXhwb3J0cyA9IHtcbi8vICAgICBnZXRBY3Rpb25EZXNjLFxuLy8gICAgIHNlcGFyYXRlRG1nUm9sbFxuLy8gfTsiLCAiaW1wb3J0IHsgZ2l2ZVRva2VuRXZlbnRzIH0gZnJvbSAnLi90b2tlbic7XG5pbXBvcnQgeyBjbGFtcCwgZmluZENlbGwgfSBmcm9tICcuL3V0aWxzJztcbmltcG9ydCB7IHJvb20gfSBmcm9tICcuL2Rhc2hib2FyZCc7XG5pbXBvcnQgeyBhZGREZWZhdWx0VG9rZW5zLCByZXNldFRva2VuQm9keURhdGEsIHRvZ2dsZVRva2VuTWVudSB9IGZyb20gJy4vbWVudXMvdG9rZW4ubWVudSc7XG5pbXBvcnQgeyBhZGREZWZhdWx0TWFwcywgdG9nZ2xlTWFwTWVudSB9IGZyb20gJy4vbWVudXMvbWFwLm1lbnUnO1xuaW1wb3J0IHsgY2hhbmdlTmV3VXNlciwgZ2V0VXNlciB9IGZyb20gJy4vcm91dGVzL3VzZXJzLnJvdXRlJztcbmltcG9ydCB7IHRvZ2dsZUNoYXJhY3Rlck1lbnUgfSBmcm9tICcuL21lbnVzL2NoYXJhY3Rlci5tZW51JztcbmltcG9ydCB7IGNsaWVudCB9IGZyb20gJy4vZGFzaGJvYXJkJztcbmltcG9ydCB7IG9wZW5DcmVhdHVyZVN0YXRzV2luZG93IH0gZnJvbSAnLi9jcmVhdHVyZS1zdGF0cyc7XG5pbXBvcnQgeyBpbywgU29ja2V0IH0gZnJvbSBcInNvY2tldC5pby1jbGllbnRcIjtcbmltcG9ydCB7IHRvZ2dsZUNyZWF0dXJlc1dpbmRvdyB9IGZyb20gJy4vY3JlYXR1cmVzJztcblxuY29uc3Qgc29ja2V0OiBTb2NrZXQgPSBpbygpO1xubGV0IGNhbk9wZW5TdGF0czogYm9vbGVhbiA9IHRydWU7XG5sZXQgeDogbnVtYmVyID0gMCwgeTogbnVtYmVyID0gMDtcbmV4cG9ydCBsZXQgcm9vdDogYW55ID0gZG9jdW1lbnQuZG9jdW1lbnRFbGVtZW50O1xubGV0IHVzZXI6IGFueTtcbmxldCBwbGF5ZXJMaXN0OiBhbnkgPSBbXTtcbmV4cG9ydCBsZXQgY2VsbHM6IGFueSA9IFtdO1xubGV0IHBsYXllcnNMaXN0T3BlbjogYm9vbGVhbiA9IGZhbHNlO1xubGV0IGNlbGxUb0RlbGV0ZTogYW55O1xubGV0IGNhblBsYWNlOiBib29sZWFuID0gdHJ1ZTtcblxuXG5leHBvcnQgYXN5bmMgZnVuY3Rpb24gZ2FtZVBhZ2VMb2FkZWQoKSB7XG4gICAgdXNlciA9IGF3YWl0IGZldGNoVXNlcigpO1xuICAgIHNvY2tldC5lbWl0KCdTRVRfTkFNRScsIHVzZXIudXNlcm5hbWUpO1xuICAgIHNvY2tldC5lbWl0KCdVUERBVEVfUExBWUVSX0xJU1QnLCByb29tKTtcbiAgICBzZXR1cEdyaWQoMjUsIDI1LCBmYWxzZSk7XG5cbiAgICBpZiAodXNlci5uZXdfdXNlcikge1xuICAgICAgICBhZGREZWZhdWx0VG9rZW5zKCk7XG4gICAgICAgIGFkZERlZmF1bHRNYXBzKCk7XG4gICAgICAgIGNoYW5nZU5ld1VzZXIoZmFsc2UpO1xuICAgIH1cblxuICAgIGlmIChjbGllbnQuY2xpZW50VHlwZSA9PSAnZG0nKSB7XG4gICAgICAgIHNldHVwU2lkZWJhcignZG0nKTtcbiAgICB9IGVsc2Uge1xuICAgICAgICBzZXR1cFNpZGViYXIoJ3BsYXllcicpO1xuICAgICAgICB0b2dnbGVDaGFyYWN0ZXJNZW51KCdjaGFyYWN0ZXJzJyk7XG4gICAgfVxufVxuXG5leHBvcnQgZnVuY3Rpb24gc2V0dXBHcmlkKHdpZHRoOiBudW1iZXIsIGhlaWdodDogbnVtYmVyLCBjbGVhcjogYm9vbGVhbikge1xuICAgIGxldCBoYXNFdmVudHM6IGJvb2xlYW4gPSBmYWxzZTtcblxuICAgIGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdncmlkJykuYWRkRXZlbnRMaXN0ZW5lcihcImNvbnRleHRtZW51XCIsIGUgPT4gZS5wcmV2ZW50RGVmYXVsdCgpKTtcbiAgICBjbGVhciAmJiBjbGVhck1hcCgpO1xuXG4gICAgZm9yIChsZXQgYSA9IDA7IGEgPCBoZWlnaHQgLSAyOyBhKyspIHtcbiAgICAgICAgLy8gQ3JlYXRlIHJvd1xuICAgICAgICBsZXQgbmV3Um93ID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ2dyaWQnKS5hcHBlbmRDaGlsZChkb2N1bWVudC5jcmVhdGVFbGVtZW50KCd0cicpKTtcblxuICAgICAgICAvLyBDcmVhdGUgY2VsbFxuICAgICAgICBmb3IgKGxldCBiID0gMDsgYiA8IHdpZHRoOyBiKyspIHtcbiAgICAgICAgICAgIGxldCBuZXdDZWxsID0gbmV3Um93LmFwcGVuZENoaWxkKGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ3RkJykpO1xuICAgICAgICAgICAgbmV3Q2VsbC5jbGFzc0xpc3QuYWRkKCdncmlkX19jZWxsJyk7XG4gICAgICAgICAgICBpZiAoeCA+IHdpZHRoIC0gMSkgeCA9IDA7XG5cbiAgICAgICAgICAgIG5ld0NlbGwuc2V0QXR0cmlidXRlKCd4JywgeC50b1N0cmluZygpKTtcbiAgICAgICAgICAgIG5ld0NlbGwuc2V0QXR0cmlidXRlKCd5JywgeS50b1N0cmluZygpKTtcbiAgICAgICAgICAgIHgrKztcblxuICAgICAgICAgICAgLy8gRmlyZXMgd2hlbiBlbGVtZW50IGlzIGRyYWdnZWQgb3ZlciB0aGlzIGdyaWQgY2VsbFxuICAgICAgICAgICAgbmV3Q2VsbC5hZGRFdmVudExpc3RlbmVyKFwiZHJhZ292ZXJcIiwgKGU6IEV2ZW50KSA9PiB7XG4gICAgICAgICAgICAgICAgY29uc3QgdG9rZW4gPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcudG9rZW4tLWRyYWdnaW5nJyk7XG4gICAgICAgICAgICAgICAgaWYgKCFoYXNFdmVudHMpIGdpdmVUb2tlbkV2ZW50cyh0b2tlbik7XG4gICAgICAgICAgICAgICAgaGFzRXZlbnRzID0gdHJ1ZTtcbiAgICAgICAgICAgICAgICBuZXdDZWxsLmFwcGVuZENoaWxkKHRva2VuKTtcbiAgICAgICAgICAgICAgICB0b2tlbi5jbGFzc0xpc3QuYWRkKCd0b2tlbicpO1xuICAgICAgICAgICAgICAgIGlmICh0b2tlbi5jbGFzc0xpc3QuY29udGFpbnMoJ21lbnVfX2l0ZW0nKSkgY2VsbFRvRGVsZXRlID0gJyc7XG4gICAgICAgICAgICAgICAgdG9rZW4uY2xhc3NMaXN0LnJlbW92ZSgnbWVudV9faXRlbScpO1xuICAgICAgICAgICAgICAgIHRva2VuLmNsYXNzTGlzdC5yZW1vdmUoJ21lbnVfX2l0ZW0tLXRva2VuJyk7XG4gICAgICAgICAgICAgICAgaWYgKHRva2VuLmdldEF0dHJpYnV0ZSgnc2l6ZScpKSB0b2tlbi5jbGFzc0xpc3QuYWRkKHRva2VuLmdldEF0dHJpYnV0ZSgnc2l6ZScpKTsgICAgXG4gICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIG5ld0NlbGwuYWRkRXZlbnRMaXN0ZW5lcihcIm1vdXNlZG93blwiLCAoZTogYW55KSA9PiB7XG4gICAgICAgICAgICAgICAgaWYgKGUud2hpY2ggPT09IDEpIHtcbiAgICAgICAgICAgICAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCA0OyBpKyspIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmIChlLnBhdGhbaV0uY2xhc3NMaXN0LmNvbnRhaW5zKCdncmlkX19jZWxsJykpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBjZWxsVG9EZWxldGUgPSBlLnBhdGhbaV07XG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIG5ld0NlbGwuYWRkRXZlbnRMaXN0ZW5lcihcImRyYWdlbmRcIiwgKCkgPT4ge1xuICAgICAgICAgICAgICAgIGNvbnN0IHRva2VuOiBFbGVtZW50ID0gbmV3Q2VsbC5maXJzdEVsZW1lbnRDaGlsZDtcbiAgICAgICAgICAgICAgICBpZiAodG9rZW4pIHtcbiAgICAgICAgICAgICAgICAgICAgbGV0IHNpemUgPSB0b2tlbi5nZXRBdHRyaWJ1dGUoJ3NpemUnKTtcbiAgICAgICAgICAgICAgICAgICAgbGV0IGltYWdlID0gdG9rZW4uZ2V0QXR0cmlidXRlKCdzcmMnKTtcbiAgICAgICAgICAgICAgICAgICAgbGV0IHJlbGF0aXZlID0gdG9rZW4uZ2V0QXR0cmlidXRlKCdyZWxhdGl2ZScpOyBcbiAgICAgICAgICAgICAgICAgICAgbGV0IGlkID0gdG9rZW4uZ2V0QXR0cmlidXRlKCdpZCcpO1xuICAgICAgICAgICAgICAgICAgICAvLyBTZXQgdG9rZW5cbiAgICAgICAgICAgICAgICAgICAgdG9rZW4uY2xhc3NMaXN0LnJlbW92ZSgndG9rZW4tLWRyYWdnaW5nJyk7XG4gICAgICAgICAgICAgICAgICAgIHRva2VuLnJlbW92ZUF0dHJpYnV0ZSgnb25tb3VzZWRvd24nKTtcbiAgICAgICAgICAgICAgICAgICAgLy8gT3BlbiBzdGF0cyBtZW51IGFmdGVyIGRvdWJsZSBjbGlja1xuICAgICAgICAgICAgICAgICAgICB0b2tlbi5hZGRFdmVudExpc3RlbmVyKFwiZGJsY2xpY2tcIiwgKCkgPT4ge1xuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHJlbGF0aXZlID09PSAnbnVsbCcgfHwgY2xpZW50LmNsaWVudFR5cGUgPT09ICdwbGF5ZXInKSByZXR1cm47XG5cbiAgICAgICAgICAgICAgICAgICAgICAgIGlmIChjYW5PcGVuU3RhdHMpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAvLyBUT0RPOiBNYWtlIGEgY2FsbCB0aGF0IGhhcyBjdXN0b20gYXMgdHJ1ZS5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBvcGVuQ3JlYXR1cmVTdGF0c1dpbmRvdyhyZWxhdGl2ZSwgZmFsc2UpOyBcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBjYW5PcGVuU3RhdHMgPSBmYWxzZTtcbiAgICAgICAgICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgc2V0VGltZW91dChmdW5jdGlvbigpIHsgY2FuT3BlblN0YXRzID0gdHJ1ZTsgfSwgMTAwKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgICAgICAgIC8vIFJlbW92ZSB0b2tlbiBhdCBwcmV2aW91cyBwb3NpdGlvblxuICAgICAgICAgICAgICAgICAgICBpZiAoY2VsbFRvRGVsZXRlKSBzb2NrZXQuZW1pdCgnUkVNT1ZFX1RPS0VOJywge3g6IHBhcnNlSW50KGNlbGxUb0RlbGV0ZS5nZXRBdHRyaWJ1dGUoJ3gnKSksIHk6IHBhcnNlSW50KGNlbGxUb0RlbGV0ZS5nZXRBdHRyaWJ1dGUoJ3knKSl9LCByb29tKTtcblxuICAgICAgICAgICAgICAgICAgICAvLyBQbGFjZSBuZXcgdG9rZW5cbiAgICAgICAgICAgICAgICAgICAgY29uc3QgbmV3VG9rZW4gPSBuZXcgVG9rZW4oaWQsIGltYWdlLCBzaXplLCByZWxhdGl2ZSk7XG4gICAgICAgICAgICAgICAgICAgIGNhblBsYWNlID0gZmFsc2U7XG4gICAgICAgICAgICAgICAgICAgIHNvY2tldC5lbWl0KCdQTEFDRV9UT0tFTicsIHt4OiBwYXJzZUludChuZXdDZWxsLmdldEF0dHJpYnV0ZSgneCcpKSwgeTogcGFyc2VJbnQobmV3Q2VsbC5nZXRBdHRyaWJ1dGUoJ3knKSl9LCBuZXdUb2tlbiwgdXNlci51c2VybmFtZSwgcm9vbSk7XG4gICAgICAgICAgICAgICAgICAgIC8vIFJlZnJlc2ggdG9rZW4gbWVudVxuICAgICAgICAgICAgICAgICAgICByZXNldFRva2VuQm9keURhdGEoKTtcbiAgICAgICAgICAgICAgICAgICAgY2FuT3BlblN0YXRzID0gdHJ1ZTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9KTtcblxuICAgICAgICAgICAgY2VsbHMucHVzaChuZXdDZWxsKTtcbiAgICAgICAgfVxuICAgICAgICB5Kys7XG4gICAgfVxufVxuXG4vLyBQbGFjZXMgdG9rZW4gb24gYm9hcmRcbmZ1bmN0aW9uIGNyZWF0ZVRva2VuKGNlbGw6IGFueSwgbmV3VG9rZW46IGFueSwgdXNlcm5hbWU6IHN0cmluZykge1xuICAgIGlmIChjYW5QbGFjZSkge1xuICAgICAgICBjb25zdCB0b2tlbiA9IGNlbGwuYXBwZW5kQ2hpbGQoZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnaW1nJykpO1xuICAgICAgICB0b2tlbi5zZXRBdHRyaWJ1dGUoJ3NyYycsIG5ld1Rva2VuLmltYWdlKTtcbiAgICAgICAgdG9rZW4uc2V0QXR0cmlidXRlKCdpZCcsIG5ld1Rva2VuLmlkKTtcbiAgICAgICAgdG9rZW4uc2V0QXR0cmlidXRlKCdyZWxhdGl2ZScsIG5ld1Rva2VuLnJlbGF0aXZlKTtcbiAgICAgICAgdG9rZW4uY2xhc3NMaXN0LmFkZCgndG9rZW4nKTtcbiAgICAgICAgdG9rZW4uY2xhc3NMaXN0LmFkZChuZXdUb2tlbi5zaXplKTtcbiAgICAgICAgdG9rZW4uc2V0QXR0cmlidXRlKCdzaXplJywgbmV3VG9rZW4uc2l6ZSk7XG4gICAgICAgIGlmICh1c2VybmFtZSkgdG9rZW4uc2V0QXR0cmlidXRlKCdvd25lcicsIHVzZXJuYW1lKTtcbiAgICAgICAgZ2l2ZVRva2VuRXZlbnRzKHRva2VuKTtcblxuICAgICAgICBsZXQgcmVsYXRpdmUgPSB0b2tlbi5nZXRBdHRyaWJ1dGUoJ3JlbGF0aXZlJyk7XG4gICAgICAgIHRva2VuLmFkZEV2ZW50TGlzdGVuZXIoXCJkYmxjbGlja1wiLCAoKSA9PiB7XG4gICAgICAgICAgICBpZiAocmVsYXRpdmUgPT09ICdudWxsJyB8fCBjbGllbnQuY2xpZW50VHlwZSA9PT0gJ3BsYXllcicpIHJldHVybjtcblxuICAgICAgICAgICAgaWYgKGNhbk9wZW5TdGF0cykge1xuICAgICAgICAgICAgICAgIC8vIFRPRE86IE1ha2UgYSBjYWxsIHRoYXQgaGFzIGN1c3RvbSBhcyB0cnVlLlxuICAgICAgICAgICAgICAgIG9wZW5DcmVhdHVyZVN0YXRzV2luZG93KHJlbGF0aXZlLCBmYWxzZSk7XG4gICAgICAgICAgICAgICAgY2FuT3BlblN0YXRzID0gZmFsc2U7XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIHNldFRpbWVvdXQoZnVuY3Rpb24oKSB7IGNhbk9wZW5TdGF0cyA9IHRydWU7IH0sIDEwMCk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0pO1xuICAgIH0gZWxzZSB7XG4gICAgICAgIGNhblBsYWNlID0gdHJ1ZTtcbiAgICB9XG59XG5cbmV4cG9ydCBmdW5jdGlvbiB6b29tSW4oKSB7XG4gICAgbGV0IHpvb21NaW46IG51bWJlciA9IDAuNSwgem9vbU1heDogbnVtYmVyID0gMTA7XG4gICAgbGV0IHJzID0gZ2V0Q29tcHV0ZWRTdHlsZShyb290KTtcbiAgICBsZXQgem9vbVZhbHVlID0gcGFyc2VJbnQocnMuZ2V0UHJvcGVydHlWYWx1ZSgnLS16b29tJykpO1xuICAgIHJvb3Quc3R5bGUuc2V0UHJvcGVydHkoJy0tem9vbScsIGAke2NsYW1wKHpvb21WYWx1ZSArIDEsIHpvb21NaW4sIHpvb21NYXgpfXJlbWApO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gem9vbU91dCgpIHtcbiAgICBsZXQgem9vbU1pbjogbnVtYmVyID0gMC41LCB6b29tTWF4OiBudW1iZXIgPSAxMDtcbiAgICBsZXQgcnMgPSBnZXRDb21wdXRlZFN0eWxlKHJvb3QpO1xuICAgIGxldCB6b29tVmFsdWUgPSBwYXJzZUludChycy5nZXRQcm9wZXJ0eVZhbHVlKCctLXpvb20nKSk7XG4gICAgcm9vdC5zdHlsZS5zZXRQcm9wZXJ0eSgnLS16b29tJywgYCR7Y2xhbXAoem9vbVZhbHVlIC0gMSwgem9vbU1pbiwgem9vbU1heCl9cmVtYCk7XG59XG5cbmZ1bmN0aW9uIGNsZWFyTWFwKCkge1xuICAgIHggPSAwO1xuICAgIHkgPSAwO1xuICAgIGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdncmlkJykuaW5uZXJIVE1MID0gJyc7XG4gICAgY2VsbHMgPSBbXTtcbn1cblxuZnVuY3Rpb24gdG9nZ2xlUGxheWVyTGlzdCgpIHtcbiAgICBwbGF5ZXJzTGlzdE9wZW4gPSAhcGxheWVyc0xpc3RPcGVuO1xuICAgIGlmIChwbGF5ZXJzTGlzdE9wZW4pIHtcbiAgICAgICAgY29uc3QgcGxheWVyTGlzdENvbnRhaW5lciA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJ2JvZHknKS5hcHBlbmRDaGlsZChkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKSk7XG4gICAgICAgIHBsYXllckxpc3RDb250YWluZXIuY2xhc3NMaXN0LmFkZCgncGxheWVycy1saXN0Jyk7XG4gICAgXG4gICAgICAgIGNvbnN0IHBsYXllckxpc3RFbCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5wbGF5ZXJzLWxpc3QnKTtcbiAgICAgICAgZm9yIChsZXQgcGxheWVyIG9mIHBsYXllckxpc3QpIHtcbiAgICAgICAgICAgIHBsYXllckxpc3RFbC5pbnNlcnRBZGphY2VudEhUTUwoJ2JlZm9yZWVuZCcsIGBcbiAgICAgICAgICAgICAgICA8cD4ke3BsYXllcn08L3A+XG4gICAgICAgICAgICBgKTtcbiAgICAgICAgfVxuICAgIH0gZWxzZSB7XG4gICAgICAgIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5wbGF5ZXJzLWxpc3QnKS5yZW1vdmUoKTtcbiAgICB9XG59XG5cbmFzeW5jIGZ1bmN0aW9uIGZldGNoVXNlcigpIHtcbiAgICBjb25zdCB1c2VyID0gYXdhaXQgZ2V0VXNlcigpO1xuICAgIHJldHVybiB1c2VyO1xufVxuXG5mdW5jdGlvbiBzZXR1cFNpZGViYXIodXNlclR5cGU6IHN0cmluZykge1xuICAgIGNvbnN0IHNpZGViYXIgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcuc2lkZWJhcicpO1xuICAgIGlmICh1c2VyVHlwZSA9PT0gJ2RtJykge1xuICAgICAgICBzaWRlYmFyLmluc2VydEFkamFjZW50SFRNTCgnYmVmb3JlZW5kJywgYFxuICAgICAgICAgICAgPGJ1dHRvbiBjbGFzcz1cInNpZGViYXJfX2J0biBzaWRlYmFyX190b2tlbnMgYnRuLS1ob3ZlclwiIGlkPVwidG9rZW5zLW1lbnUtYnRuXCI+VG9rZW5zPC9idXR0b24+XG4gICAgICAgICAgICA8YnV0dG9uIGNsYXNzPVwic2lkZWJhcl9fYnRuIHNpZGViYXJfX21hcHMgYnRuLS1ob3ZlclwiIGlkPVwiY3JlYXR1cmVzLXdpbmRvdy1idG5cIj5DcmVhdHVyZXM8L2J1dHRvbj5cbiAgICAgICAgICAgIDxidXR0b24gY2xhc3M9XCJzaWRlYmFyX19idG4gc2lkZWJhcl9fbWFwcyBidG4tLWhvdmVyXCIgaWQ9XCJtYXBzLW1lbnUtYnRuXCI+TWFwczwvYnV0dG9uPlxuICAgICAgICBgKTtcbiAgICB9IGVsc2Uge1xuICAgICAgICBzaWRlYmFyLmluc2VydEFkamFjZW50SFRNTCgnYmVmb3JlZW5kJywgYFxuICAgICAgICAgICAgPGJ1dHRvbiBjbGFzcz1cInNpZGViYXJfX2J0biBzaWRlYmFyX19jaGFyYWN0ZXJzIGJ0bi0taG92ZXJcIiBpZD1cImNoYXJhY3RlcnMtbWVudS1idG5cIj5DaGFyYWN0ZXJzPC9idXR0b24+XG4gICAgICAgICAgICA8YnV0dG9uIGNsYXNzPVwic2lkZWJhcl9fYnRuIHNpZGViYXJfX2NoYXJhY3Rlci1zaGVldCBidG4tLWhvdmVyXCIgaWQ9XCJjaGFyYWN0ZXItc2hlZXQtbWVudS1idG5cIj5DaGFyYWN0ZXIgU2hlZXQ8L2J1dHRvbj5cbiAgICAgICAgYCk7XG4gICAgfVxuXG4gICAgZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ3Rva2Vucy1tZW51LWJ0bicpLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgKCkgPT4gdG9nZ2xlVG9rZW5NZW51KCd0b2tlbnMnKSk7XG4gICAgZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ2NyZWF0dXJlcy13aW5kb3ctYnRuJykuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCAoKSA9PiB0b2dnbGVDcmVhdHVyZXNXaW5kb3coKSk7XG4gICAgZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ21hcHMtbWVudS1idG4nKS5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsICgpID0+IHRvZ2dsZU1hcE1lbnUoJ21hcHMnKSk7XG59XG5cbmNsYXNzIFRva2VuIHtcbiAgICBpZDogc3RyaW5nO1xuICAgIGltYWdlOiBzdHJpbmc7XG4gICAgc2l6ZTogc3RyaW5nO1xuICAgIHJlbGF0aXZlOiBhbnk7XG4gICAgY29uc3RydWN0b3IoaWQ6IHN0cmluZywgaW1hZ2U6IHN0cmluZywgc2l6ZTogc3RyaW5nLCByZWxhdGl2ZTogYW55KSB7XG4gICAgICAgIHRoaXMuaWQgPSBpZDtcbiAgICAgICAgdGhpcy5pbWFnZSA9IGltYWdlO1xuICAgICAgICB0aGlzLnNpemUgPSBzaXplO1xuICAgICAgICB0aGlzLnJlbGF0aXZlID0gcmVsYXRpdmU7XG4gICAgfVxufVxuXG4vLyA9PT09PT09PT09PT09PT09PT09IC8vXG4vLyAgICAgIFNPQ0tFVC5JTyAgICAgIC8vXG4vLyA9PT09PT09PT09PT09PT09PT09IC8vXG5cbnNvY2tldC5vbignVVBEQVRFX1BMQVlFUl9MSVNUJywgKChjbGllbnRMaXN0KSA9PiB7XG4gICAgcGxheWVyTGlzdCA9IFtdO1xuICAgIGZvciAobGV0IGNsaWVudCBvZiBjbGllbnRMaXN0KSB7XG4gICAgICAgIHBsYXllckxpc3QucHVzaChjbGllbnQubmlja25hbWUpO1xuICAgIH1cbiAgICB0b2dnbGVQbGF5ZXJMaXN0KCk7XG4gICAgdG9nZ2xlUGxheWVyTGlzdCgpO1xufSkpO1xuXG5zb2NrZXQub24oJ1BMQUNFX1RPS0VOJywgKChjZWxsOiBhbnksIHRva2VuOiBFbGVtZW50LCB1c2VybmFtZTogc3RyaW5nKSA9PiB7XG4gICAgY29uc3QgbmV3Q2VsbCA9IGZpbmRDZWxsKGNlbGwueCwgY2VsbC55KTtcbiAgICBjcmVhdGVUb2tlbihuZXdDZWxsLCB0b2tlbiwgdXNlcm5hbWUpO1xufSkpO1xuXG5zb2NrZXQub24oJ1JFTU9WRV9UT0tFTicsICgoY2VsbDogYW55KSA9PiB7XG4gICAgY29uc3QgbmV3Q2VsbCA9IGZpbmRDZWxsKGNlbGwueCwgY2VsbC55KTtcbiAgICBuZXdDZWxsLmlubmVySFRNTCA9ICcnO1xufSkpO1xuXG4iLCAiaW1wb3J0IHsgY2hhcmFjdGVyIH0gZnJvbSAnLi9tZW51cy9jaGFyYWN0ZXIubWVudSc7XG5pbXBvcnQgeyBzZXRUZW1wSGVhbHRoLCBzZXRIZWFsdGggfSBmcm9tICcuL3JvdXRlcy9jaGFyYWN0ZXJzLnJvdXRlJztcbmltcG9ydCB7IGRpc2FibGVIb3RrZXlzLCBkcmFnRWxlbWVudCB9IGZyb20gJy4vdXRpbHMnO1xuXG5jb25zdCBfY2hhcmFjdGVyID0gY2hhcmFjdGVyLnZhbHVlO1xubGV0IHNoZWV0T3BlbiA9IGZhbHNlO1xubGV0IHRlbXBIcElucHV0OiBzdHJpbmcsIGhwSW5wdXQ6IHN0cmluZztcbmxldCBkbWdBZGRJbnB1dDogc3RyaW5nLCBoZWFsQWRkSW5wdXQ6IHN0cmluZywgdGVtcEFkZElucHV0OiBzdHJpbmc7XG5sZXQgc3RyTW9kOiBudW1iZXI7XG5sZXQgZGV4TW9kOiBudW1iZXI7XG5sZXQgY29uTW9kOiBudW1iZXI7XG5sZXQgaW50TW9kOiBudW1iZXI7XG5sZXQgd2lzTW9kOiBudW1iZXI7XG5sZXQgY2hhck1vZDogbnVtYmVyO1xuXG5leHBvcnQgZnVuY3Rpb24gdG9nZ2xlQ2hhcmFjdGVyU2hlZXQoKSB7XG4gICAgc2hlZXRPcGVuID0gIXNoZWV0T3BlbjtcbiAgICBpZiAoc2hlZXRPcGVuKSB7XG4gICAgICAgIGxldCBzdHJNb2QgPSBNYXRoLmZsb29yKChfY2hhcmFjdGVyLnN0ciAtIDEwKSAvIDIpO1xuICAgICAgICBsZXQgZGV4TW9kID0gTWF0aC5mbG9vcigoX2NoYXJhY3Rlci5kZXggLSAxMCkgLyAyKTtcbiAgICAgICAgbGV0IGNvbk1vZCA9IE1hdGguZmxvb3IoKF9jaGFyYWN0ZXIuY29uIC0gMTApIC8gMik7XG4gICAgICAgIGxldCBpbnRNb2QgPSBNYXRoLmZsb29yKChfY2hhcmFjdGVyLmludCAtIDEwKSAvIDIpO1xuICAgICAgICBsZXQgd2lzTW9kID0gTWF0aC5mbG9vcigoX2NoYXJhY3Rlci53aXMgLSAxMCkgLyAyKTtcbiAgICAgICAgbGV0IGNoYXJNb2QgPSBNYXRoLmZsb29yKChfY2hhcmFjdGVyLmNoYXIgLSAxMCkgLyAyKTtcblxuICAgICAgICBjb25zdCBzaGVldFdpbmRvdyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJ2JvZHknKS5hcHBlbmRDaGlsZChkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKSk7XG4gICAgICAgIHNoZWV0V2luZG93LmNsYXNzTGlzdC5hZGQoJ2NoYXJhY3Rlci1zaGVldCcpO1xuICAgICAgICBzaGVldFdpbmRvdy5pbnNlcnRBZGphY2VudEhUTUwoJ2JlZm9yZWVuZCcsIGBcbiAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJzaGVldC1jb250ZW50XCI+XG4gICAgICAgICAgICAgICAgPGRpdiBjbGFzcz1cImNoYXJhY3Rlci1zaGVldF9faGVhZGVyXCI+XG4gICAgICAgICAgICAgICAgICAgIDxpbWcgY2xhc3M9XCJjaGFyYWN0ZXItc2hlZXRfX2ltYWdlXCIgc3JjPSR7X2NoYXJhY3Rlci5pbWFnZX0+XG4gICAgICAgICAgICAgICAgICAgIDxoMj4ke19jaGFyYWN0ZXIubmFtZX08L2gyPlxuICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJjaGFyYWN0ZXItc2hlZXRfX21haW5cIj5cbiAgICAgICAgICAgICAgICAgICAgPHA+TGV2ZWwgJHtfY2hhcmFjdGVyLmxldmVsfTwvcD5cbiAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzPVwiY2hhcmFjdGVyLXNoZWV0X19tYWluXCI+XG4gICAgICAgICAgICAgICAgICAgIDxwPiR7X2NoYXJhY3Rlci5yYWNlfSAke19jaGFyYWN0ZXIuY2xhc3N9ICR7X2NoYXJhY3Rlci5iYWNrZ3JvdW5kfTwvcD5cbiAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzPVwiY2hhcmFjdGVyLXNoZWV0X19tYWluXCI+XG4gICAgICAgICAgICAgICAgICAgIDxwPlByb2YgYm9udXM6ICske19jaGFyYWN0ZXIucHJvZl9ib251c30gSGl0IGRpY2U6ICR7X2NoYXJhY3Rlci5sZXZlbH1kJHtfY2hhcmFjdGVyLmhpdF9kaWNlfTwvcD5cbiAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzPVwiY2hhcmFjdGVyLXNoZWV0X19tYWluXCI+XG4gICAgICAgICAgICAgICAgICAgIDxwPkFDOiAke19jaGFyYWN0ZXIuYWN9IEluaXRpYXRpdmU6ICR7X2NoYXJhY3Rlci5pbml0aWF0aXZlfSBNb3ZlbWVudDogJHtfY2hhcmFjdGVyLm1vdmVtZW50fTwvcD5cbiAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzPVwiY2hhcmFjdGVyLXNoZWV0X19oZWFsdGgtLXRlbXBcIj5cbiAgICAgICAgICAgICAgICAgICAgPHAgY2xhc3M9XCJ0ZW1wLWhwXCI+PGltZyBzcmM9XCIuLi9pbWFnZXMvaGVhcnQtYmx1ZS5wbmdcIj4gJHtfY2hhcmFjdGVyLnRlbXBfaGVhbHRofTwvcD5cbiAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzPVwiY2hhcmFjdGVyLXNoZWV0X19oZWFsdGhcIj5cbiAgICAgICAgICAgICAgICAgICAgPHAgY2xhc3M9XCJocFwiPjxpbWcgc3JjPVwiLi4vaW1hZ2VzL2hlYXJ0LXJlZC5wbmdcIj4gJHtfY2hhcmFjdGVyLm1heF9oZWFsdGh9IC8gJHtfY2hhcmFjdGVyLmN1cnJlbnRfaGVhbHRofTwvcD5cbiAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzPVwiY2hhcmFjdGVyLXNoZWV0X19oZWFsdGgtdHJhY2tlclwiPlxuICAgICAgICAgICAgICAgICAgICA8Zm9ybSBvbnN1Ym1pdD1cImRhbWFnZUhwKGV2ZW50KVwiPjxwPkRhbWFnZSA8YnV0dG9uIHR5cGU9XCJzdWJtaXRcIj4tPC9idXR0b24+PGlucHV0IHR5cGU9XCJudW1iZXJcIiBvbmNoYW5nZT1cImRtZ0FkZElucHV0ID0gZXZlbnQudGFyZ2V0LnZhbHVlXCI+PC9wPjwvZm9ybT5cbiAgICAgICAgICAgICAgICAgICAgPGZvcm0gb25zdWJtaXQ9XCJoZWFsSHAoZXZlbnQpXCI+PHA+SGVhbCA8YnV0dG9uIHR5cGU9XCJzdWJtaXRcIj4rPC9idXR0b24+PGlucHV0IHR5cGU9XCJudW1iZXJcIiBvbmNoYW5nZT1cImhlYWxBZGRJbnB1dCA9IGV2ZW50LnRhcmdldC52YWx1ZVwiPjwvcD48L2Zvcm0+XG4gICAgICAgICAgICAgICAgICAgIDxmb3JtIG9uc3VibWl0PVwiYWRkVGVtcEhwKGV2ZW50KVwiPjxwPlRlbXAgSHAgPGJ1dHRvbiB0eXBlPVwic3VibWl0XCI+KzwvYnV0dG9uPjxpbnB1dCB0eXBlPVwibnVtYmVyXCIgb25jaGFuZ2U9XCJ0ZW1wQWRkSW5wdXQgPSBldmVudC50YXJnZXQudmFsdWVcIj48L3A+PC9mb3JtPlxuICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJjaGFyYWN0ZXItc2hlZXRfX3Njb3Jlc1wiPlxuICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzPVwiY2hhcmFjdGVyLXNoZWV0X19zY29yZS1ib3hcIj5cbiAgICAgICAgICAgICAgICAgICAgICAgIDxwPlN0cjwvcD5cbiAgICAgICAgICAgICAgICAgICAgICAgIDxwPiR7X2NoYXJhY3Rlci5zdHJ9PC9wPlxuICAgICAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzcz1cImNoYXJhY3Rlci1zaGVldF9fbW9kaWZpZXItYm94XCI+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPHA+JHtzdHJNb2QgPCAwID8gJycgOiAnKyd9ICR7c3RyTW9kfTwvcD5cbiAgICAgICAgICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzcz1cImNoYXJhY3Rlci1zaGVldF9fc2NvcmUtYm94XCI+XG4gICAgICAgICAgICAgICAgICAgICAgICA8cD5EZXg8L3A+XG4gICAgICAgICAgICAgICAgICAgICAgICA8cD4ke19jaGFyYWN0ZXIuZGV4fTwvcD5cbiAgICAgICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJjaGFyYWN0ZXItc2hlZXRfX21vZGlmaWVyLWJveFwiPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxwPiR7ZGV4TW9kIDwgMCA/ICcnIDogJysnfSAke2RleE1vZH08L3A+XG4gICAgICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJjaGFyYWN0ZXItc2hlZXRfX3Njb3JlLWJveFwiPlxuICAgICAgICAgICAgICAgICAgICAgICAgPHA+Q29uPC9wPlxuICAgICAgICAgICAgICAgICAgICAgICAgPHA+JHtfY2hhcmFjdGVyLmNvbn08L3A+XG4gICAgICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzPVwiY2hhcmFjdGVyLXNoZWV0X19tb2RpZmllci1ib3hcIj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8cD4ke2Nvbk1vZCA8IDAgPyAnJyA6ICcrJ30gJHtjb25Nb2R9PC9wPlxuICAgICAgICAgICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzPVwiY2hhcmFjdGVyLXNoZWV0X19zY29yZS1ib3hcIj5cbiAgICAgICAgICAgICAgICAgICAgICAgIDxwPkludDwvcD5cbiAgICAgICAgICAgICAgICAgICAgICAgIDxwPiR7X2NoYXJhY3Rlci5pbnR9PC9wPlxuICAgICAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzcz1cImNoYXJhY3Rlci1zaGVldF9fbW9kaWZpZXItYm94XCI+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPHA+JHtpbnRNb2QgPCAwID8gJycgOiAnKyd9ICR7aW50TW9kfTwvcD5cbiAgICAgICAgICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzcz1cImNoYXJhY3Rlci1zaGVldF9fc2NvcmUtYm94XCI+XG4gICAgICAgICAgICAgICAgICAgICAgICA8cD5XaXM8L3A+XG4gICAgICAgICAgICAgICAgICAgICAgICA8cD4ke19jaGFyYWN0ZXIud2lzfTwvcD5cbiAgICAgICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJjaGFyYWN0ZXItc2hlZXRfX21vZGlmaWVyLWJveFwiPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxwPiR7d2lzTW9kIDwgMCA/ICcnIDogJysnfSAke3dpc01vZH08L3A+XG4gICAgICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJjaGFyYWN0ZXItc2hlZXRfX3Njb3JlLWJveFwiPlxuICAgICAgICAgICAgICAgICAgICAgICAgPHA+Q2hhcjwvcD5cbiAgICAgICAgICAgICAgICAgICAgICAgIDxwPiR7X2NoYXJhY3Rlci5jaGFyfTwvcD5cbiAgICAgICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJjaGFyYWN0ZXItc2hlZXRfX21vZGlmaWVyLWJveFwiPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxwPiR7Y2hhck1vZCA8IDAgPyAnJyA6ICcrJ30gJHtjaGFyTW9kfTwvcD5cbiAgICAgICAgICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICBgKTtcblxuICAgICAgICBkaXNhYmxlSG90a2V5cygpO1xuICAgICAgICBkcmFnRWxlbWVudChzaGVldFdpbmRvdywgJ2NoYXJhY3Rlci1zaGVldCcpO1xuICAgIH0gZWxzZSB7XG4gICAgICAgIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5jaGFyYWN0ZXItc2hlZXQnKS5yZW1vdmUoKTtcbiAgICB9XG59XG5cbmZ1bmN0aW9uIGRhbWFnZUhwKGU6IEV2ZW50KSB7XG4gICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xuICAgIGxldCBkbWdBbW91bnQgPSBwYXJzZUludChkbWdBZGRJbnB1dCk7XG4gICAgbGV0IHRtcEhwVmFsdWUgPSBfY2hhcmFjdGVyLnRlbXBfaGVhbHRoO1xuICAgIHRtcEhwVmFsdWUgLT0gZG1nQW1vdW50O1xuICAgIGlmICh0bXBIcFZhbHVlIDwgMCkgdG1wSHBWYWx1ZSA9IDA7XG4gICAgZG1nQW1vdW50IC09IF9jaGFyYWN0ZXIudGVtcF9oZWFsdGg7XG4gICAgaWYgKGRtZ0Ftb3VudCA8IDApIGRtZ0Ftb3VudCA9IDA7XG4gICAgXG4gICAgc2V0VGVtcEhlYWx0aCh7aWQ6IF9jaGFyYWN0ZXIuaWQsIGhlYWx0aDogdG1wSHBWYWx1ZX0pO1xuICAgIHNldEhlYWx0aCh7aWQ6IF9jaGFyYWN0ZXIuaWQsIGhlYWx0aDogX2NoYXJhY3Rlci5jdXJyZW50X2hlYWx0aCAtIGRtZ0Ftb3VudH0pO1xuICAgIHJlc2V0U2hlZXREYXRhKCk7XG59XG5cbmZ1bmN0aW9uIGhlYWxIcChlOiBFdmVudCkge1xuICAgIGUucHJldmVudERlZmF1bHQoKTtcbiAgICBsZXQgaGVhbEFtb3VudCA9IHBhcnNlSW50KGhlYWxBZGRJbnB1dCk7XG4gICAgaWYgKF9jaGFyYWN0ZXIuY3VycmVudF9oZWFsdGggKyBoZWFsQW1vdW50ID4gX2NoYXJhY3Rlci5tYXhfaGVhbHRoKSB7XG4gICAgICAgIHNldEhlYWx0aCh7aWQ6IF9jaGFyYWN0ZXIuaWQsIGhlYWx0aDogX2NoYXJhY3Rlci5tYXhfaGVhbHRofSk7XG4gICAgfSBlbHNlIHtcbiAgICAgICAgc2V0SGVhbHRoKHtpZDogX2NoYXJhY3Rlci5pZCwgaGVhbHRoOiBfY2hhcmFjdGVyLmN1cnJlbnRfaGVhbHRoICsgaGVhbEFtb3VudH0pO1xuICAgIH1cbiAgICByZXNldFNoZWV0RGF0YSgpO1xufVxuXG5mdW5jdGlvbiBhZGRUZW1wSHAoZTogRXZlbnQpIHtcbiAgICBlLnByZXZlbnREZWZhdWx0KCk7XG4gICAgc2V0VGVtcEhlYWx0aCh7aWQ6IF9jaGFyYWN0ZXIuaWQsIGhlYWx0aDogX2NoYXJhY3Rlci50ZW1wX2hlYWx0aCArIHBhcnNlSW50KHRlbXBBZGRJbnB1dCl9KTtcbiAgICByZXNldFNoZWV0RGF0YSgpO1xufVxuXG5mdW5jdGlvbiByZXNldFNoZWV0RGF0YSgpIHtcbiAgICB0b2dnbGVDaGFyYWN0ZXJTaGVldCgpO1xuICAgIHNldFRpbWVvdXQoZnVuY3Rpb24oKSB7IHRvZ2dsZUNoYXJhY3RlclNoZWV0KCk7IH0sIDEwMCk7XG59IiwgImltcG9ydCB7IHpvb21Jbiwgem9vbU91dCB9IGZyb20gJy4vZ3JpZCc7XG5pbXBvcnQgeyBjbGllbnQgfSBmcm9tICcuL2Rhc2hib2FyZCc7XG5pbXBvcnQgeyB0b2dnbGVUb2tlbk1lbnUgfSBmcm9tICcuL21lbnVzL3Rva2VuLm1lbnUnO1xuaW1wb3J0IHsgdG9nZ2xlTWFwTWVudSB9IGZyb20gJy4vbWVudXMvbWFwLm1lbnUnO1xuaW1wb3J0IHsgdG9nZ2xlQ2hhcmFjdGVyTWVudSB9IGZyb20gJy4vbWVudXMvY2hhcmFjdGVyLm1lbnUnO1xuaW1wb3J0IHsgdG9nZ2xlQ3JlYXR1cmVzV2luZG93IH0gZnJvbSAnLi9jcmVhdHVyZXMnO1xuaW1wb3J0IHsgdG9nZ2xlQ2hhcmFjdGVyU2hlZXQgfSBmcm9tICcuL2NoYXJhY3Rlci1zaGVldCc7XG5cblxubGV0IGNhblNjYWxlID0gZmFsc2U7XG5sZXQgdGFyZ2V0UG9zWDogbnVtYmVyLCB0YXJnZXRQb3NZOiBudW1iZXI7XG5sZXQgZHJhZ2dpbmcgPSBmYWxzZTtcbmV4cG9ydCBsZXQgY2FuVXNlSG90a2V5ID0ge3ZhbHVlOiB0cnVlfTtcblxuLy8gPT09IEVWRU5UIEhBTkRMRVJTID09PSAvL1xuXG4vLyBGaXJlcyB3aGVuIHVzZXIgcHJlc3NlcyBrZXlcbmRvY3VtZW50LmFkZEV2ZW50TGlzdGVuZXIoJ2tleWRvd24nLCAoZSkgPT4ge1xuICAgIGlmIChjYW5Vc2VIb3RrZXkudmFsdWUpIHtcbiAgICAgICAgc3dpdGNoICh0cnVlKSB7XG4gICAgICAgICAgICBjYXNlIGUua2V5ID09PSAnTWV0YScgfHwgZS5rZXkgPT09ICdDb250cm9sJzpcbiAgICAgICAgICAgICAgICBjYW5TY2FsZSA9IHRydWU7XG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICBjYXNlIGUua2V5ID09PSAnRGVsZXRlJzpcbiAgICAgICAgICAgICAgICBmb3IgKGNvbnN0IF90b2tlbiBvZiBkb2N1bWVudC5nZXRFbGVtZW50c0J5Q2xhc3NOYW1lKCd0b2tlbicpKSB7XG4gICAgICAgICAgICAgICAgICAgIGlmIChfdG9rZW4uY2xhc3NMaXN0LmNvbnRhaW5zKCd0b2tlbi0tc2VsZWN0ZWQnKSkgX3Rva2VuLnJlbW92ZSgpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIGNhc2UgZS5rZXkgPT09ICcrJyB8fCBlLmtleSA9PT0gJz0nOlxuICAgICAgICAgICAgICAgIHpvb21JbigpO1xuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgY2FzZSBlLmtleSA9PT0gJy0nIHx8IGUua2V5ID09PSAnXyc6XG4gICAgICAgICAgICAgICAgem9vbU91dCgpO1xuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgY2FzZSBlLndoaWNoID09PSA0OTpcbiAgICAgICAgICAgICAgICBjbGllbnQuY2xpZW50VHlwZSA9PT0gJ2RtJyA/IHRvZ2dsZVRva2VuTWVudSgndG9rZW5zJykgOiB0b2dnbGVDaGFyYWN0ZXJNZW51KCdjaGFyYWN0ZXJzJyk7XG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICBjYXNlIGUud2hpY2ggPT09IDUwOlxuICAgICAgICAgICAgICAgIGNsaWVudC5jbGllbnRUeXBlID09PSAnZG0nID8gdG9nZ2xlQ3JlYXR1cmVzV2luZG93KCkgOiB0b2dnbGVDaGFyYWN0ZXJTaGVldCgpO1xuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgY2FzZSBlLndoaWNoID09PSA1MTpcbiAgICAgICAgICAgICAgICBjbGllbnQuY2xpZW50VHlwZSA9PT0gJ2RtJyA/IHRvZ2dsZU1hcE1lbnUoJ21hcHMnKSA6IGNvbnNvbGUubG9nKCdub3RoaW5nJyk7XG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICBkZWZhdWx0OlxuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICB9XG4gICAgfVxufSk7XG5cbi8vIEZpcmVzIHdoZW4gdXNlciByZWxlYXNlcyBrZXlcbmRvY3VtZW50LmFkZEV2ZW50TGlzdGVuZXIoJ2tleXVwJywgKGUpID0+IHtcbiAgICBzd2l0Y2ggKHRydWUpIHtcbiAgICAgICAgY2FzZSBlLmtleSA9PT0gJ01ldGEnIHx8IGUua2V5ID09PSAnQ29udHJvbExlZnQnOlxuICAgICAgICAgICAgY2FuU2NhbGUgPSBmYWxzZTtcbiAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICBkZWZhdWx0OlxuICAgICAgICAgICAgYnJlYWs7XG4gICAgfVxufSk7XG5cbi8vIEZpcmVzIHdoZW4gdXNlciBwcmVzc2VzIG1vdXNlIGJ1dHRvblxuZG9jdW1lbnQuYWRkRXZlbnRMaXN0ZW5lcignbW91c2Vkb3duJywgKGUpID0+IHtcbiAgICBzd2l0Y2ggKHRydWUpIHtcbiAgICAgICAgY2FzZSBlLndoaWNoID09PSAyOlxuICAgICAgICAgICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgICAgICAgdGFyZ2V0UG9zWCA9IGUueDtcbiAgICAgICAgICAgIHRhcmdldFBvc1kgPSBlLnk7XG4gICAgICAgICAgICBkcmFnZ2luZyA9IHRydWU7XG4gICAgICAgICAgICBicmVhaztcbiAgICAgICAgZGVmYXVsdDpcbiAgICAgICAgICAgIGJyZWFrO1xuICAgIH1cbn0pO1xuXG4vLyBGaXJlcyB3aGVuIHVzZXIgcmVsZWFzZXMgbW91c2UgYnV0dG9uXG5kb2N1bWVudC5hZGRFdmVudExpc3RlbmVyKCdtb3VzZXVwJywgKGUpID0+IHtcbiAgICBzd2l0Y2ggKHRydWUpIHtcbiAgICAgICAgY2FzZSBlLndoaWNoID09PSAyOlxuICAgICAgICAgICAgZHJhZ2dpbmcgPSBmYWxzZTtcbiAgICAgICAgICAgIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5nYW1lLXBhZ2UtY29udGFpbmVyJykuY2xhc3NMaXN0LnJlbW92ZSgncGFubmluZycpO1xuICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgIGRlZmF1bHQ6XG4gICAgICAgICAgICBicmVhaztcbiAgICB9XG59KTtcblxuLy8gRmlyZXMgd2hlbiB1c2VyIG1vdmVzIG1vdXNlXG5kb2N1bWVudC5hZGRFdmVudExpc3RlbmVyKCdtb3VzZW1vdmUnLCAoZSkgPT4ge1xuICAgIGNvbnN0IG1vdXNlUG9zWCA9IGUueDtcbiAgICBjb25zdCBtb3VzZVBvc1kgPSBlLnk7XG4gICAgaWYgKGRyYWdnaW5nKSB7XG4gICAgICAgIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5ncmlkLWNvbnRhaW5lcicpLnNjcm9sbEJ5KCh0YXJnZXRQb3NYIC0gbW91c2VQb3NYKSAvIDI1LCAodGFyZ2V0UG9zWSAtIG1vdXNlUG9zWSkgLyAyNSk7XG4gICAgICAgIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5nYW1lLXBhZ2UtY29udGFpbmVyJykuY2xhc3NMaXN0LmFkZCgncGFubmluZycpO1xuICAgIH1cbn0pO1xuXG4iLCAiaW1wb3J0IHsgY2VsbHMgfSBmcm9tICcuL2dyaWQnO1xuaW1wb3J0IHsgdG9nZ2xlVG9rZW5NZW51IH0gZnJvbSAnLi9tZW51cy90b2tlbi5tZW51JztcbmltcG9ydCB7IHRvZ2dsZU1hcE1lbnUgfSBmcm9tICcuL21lbnVzL21hcC5tZW51JztcbmltcG9ydCB7IHRvZ2dsZUNoYXJhY3Rlck1lbnUgfSBmcm9tICcuL21lbnVzL2NoYXJhY3Rlci5tZW51JztcbmltcG9ydCB7IGNhblVzZUhvdGtleSB9IGZyb20gJy4vaW5wdXQnO1xuXG5leHBvcnQgbGV0IG1lbnVPcGVuOiBhbnkgPSB7dmFsdWU6IGZhbHNlfTtcbmV4cG9ydCBsZXQgc2VsZWN0ZWRNZW51OiBhbnkgPSB7dmFsdWU6ICcnfTtcblxuLy8gQ2xhbXAgbnVtYmVyIGJldHdlZW4gdHdvIHZhbHVlc1xuZXhwb3J0IGNvbnN0IGNsYW1wID0gKG51bTogbnVtYmVyLCBtaW46IG51bWJlciwgbWF4OiBudW1iZXIpID0+IE1hdGgubWluKE1hdGgubWF4KG51bSwgbWluKSwgbWF4KTtcblxuLy8gV2lsbCBmaW5kIGFuZCByZXR1cm4gYSBjZWxsIHdpdGggdGhlIHBhcmFtZXRlcnMgZ2l2ZW5cbmV4cG9ydCBmdW5jdGlvbiBmaW5kQ2VsbCh4OiBudW1iZXIsIHk6IG51bWJlcikge1xuICAgIGZvciAoY29uc3QgY2VsbCBvZiBjZWxscykge1xuICAgICAgICBpZiAoY2VsbC5nZXRBdHRyaWJ1dGUoJ3gnKSA9PT0geC50b1N0cmluZygpICYmIGNlbGwuZ2V0QXR0cmlidXRlKCd5JykgPT09IHkudG9TdHJpbmcoKSkge1xuICAgICAgICAgICAgcmV0dXJuIGNlbGw7XG4gICAgICAgIH1cbiAgICB9XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBjbG9zZU1lbnUobWVudU5hbWU6IHN0cmluZykge1xuICAgIGlmIChzZWxlY3RlZE1lbnUudmFsdWUgPT09IG1lbnVOYW1lKSB7XG4gICAgICAgIC8vIENsb3NlIG1lbnVcbiAgICAgICAgZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLm1lbnUnKS5yZW1vdmUoKTtcbiAgICAgICAgbWVudU9wZW4udmFsdWUgPSBmYWxzZTtcbiAgICB9IGVsc2Uge1xuICAgICAgICAvLyBDbG9zZSBtZW51LCB0aGVuIG9wZW4gc2VsZWN0ZWQgb25lXG4gICAgICAgIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5tZW51JykucmVtb3ZlKCk7XG4gICAgICAgIG1lbnVPcGVuLnZhbHVlID0gZmFsc2U7XG5cbiAgICAgICAgc3dpdGNoIChtZW51TmFtZSkge1xuICAgICAgICAgICAgY2FzZSAndG9rZW5zJzpcbiAgICAgICAgICAgICAgICB0b2dnbGVUb2tlbk1lbnUoJycpO1xuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgY2FzZSAnbWFwcyc6XG4gICAgICAgICAgICAgICAgdG9nZ2xlTWFwTWVudSgnJyk7XG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICBjYXNlICdjaGFyYWN0ZXJzJzpcbiAgICAgICAgICAgICAgICB0b2dnbGVDaGFyYWN0ZXJNZW51KCcnKTtcbiAgICAgICAgICAgIGRlZmF1bHQ6XG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgIH1cbiAgICB9XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBjaGFuZ2VSb3V0ZShyb3V0ZTogc3RyaW5nKSB7XG4gICAgY29uc3Qgd2wgPSB3aW5kb3cubG9jYXRpb247XG4gICAgd2luZG93LmxvY2F0aW9uLnJlcGxhY2UoYCR7d2wucHJvdG9jb2x9Ly8ke3dsLmhvc3R9LyR7cm91dGV9YCk7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBkcmFnRWxlbWVudChlbG1udDogYW55LCBoZWFkZXJOYW1lOiBzdHJpbmcpIHtcbiAgICB2YXIgcG9zMSA9IDAsIHBvczIgPSAwLCBwb3MzID0gMCwgcG9zNCA9IDA7XG4gICAgaWYgKGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoYC4ke2hlYWRlck5hbWV9X19oZWFkZXJgKSkge1xuICAgICAgLy8gaWYgcHJlc2VudCwgdGhlIGhlYWRlciBpcyB3aGVyZSB5b3UgbW92ZSB0aGUgRElWIGZyb206XG4gICAgICBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKGAuJHtoZWFkZXJOYW1lfV9faGVhZGVyYCkuYWRkRXZlbnRMaXN0ZW5lcihcIm1vdXNlZG93blwiLCBkcmFnTW91c2VEb3duKTtcbiAgICB9IGVsc2Uge1xuICAgICAgLy8gb3RoZXJ3aXNlLCBtb3ZlIHRoZSBESVYgZnJvbSBhbnl3aGVyZSBpbnNpZGUgdGhlIERJVjpcbiAgICAgIGVsbW50LmFkZEV2ZW50TGlzdGVuZXIoXCJtb3VzZWRvd25cIiwgZHJhZ01vdXNlRG93bik7XG4gICAgfVxuICBcbiAgICBmdW5jdGlvbiBkcmFnTW91c2VEb3duKGU6IGFueSkge1xuICAgICAgZSA9IGUgfHwgd2luZG93LmV2ZW50O1xuICAgICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgLy8gZ2V0IHRoZSBtb3VzZSBjdXJzb3IgcG9zaXRpb24gYXQgc3RhcnR1cDpcbiAgICAgIHBvczMgPSBlLmNsaWVudFg7XG4gICAgICBwb3M0ID0gZS5jbGllbnRZO1xuICAgICAgZG9jdW1lbnQub25tb3VzZXVwID0gY2xvc2VEcmFnRWxlbWVudDtcbiAgICAgIC8vIGNhbGwgYSBmdW5jdGlvbiB3aGVuZXZlciB0aGUgY3Vyc29yIG1vdmVzOlxuICAgICAgZG9jdW1lbnQub25tb3VzZW1vdmUgPSBlbGVtZW50RHJhZztcbiAgICB9XG4gIFxuICAgIGZ1bmN0aW9uIGVsZW1lbnREcmFnKGU6IGFueSkge1xuICAgICAgZSA9IGUgfHwgd2luZG93LmV2ZW50O1xuICAgICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgLy8gY2FsY3VsYXRlIHRoZSBuZXcgY3Vyc29yIHBvc2l0aW9uOlxuICAgICAgcG9zMSA9IHBvczMgLSBlLmNsaWVudFg7XG4gICAgICBwb3MyID0gcG9zNCAtIGUuY2xpZW50WTtcbiAgICAgIHBvczMgPSBlLmNsaWVudFg7XG4gICAgICBwb3M0ID0gZS5jbGllbnRZO1xuICAgICAgLy8gc2V0IHRoZSBlbGVtZW50J3MgbmV3IHBvc2l0aW9uOlxuICAgICAgZWxtbnQuc3R5bGUudG9wID0gKGVsbW50Lm9mZnNldFRvcCAtIHBvczIpICsgXCJweFwiO1xuICAgICAgZWxtbnQuc3R5bGUubGVmdCA9IChlbG1udC5vZmZzZXRMZWZ0IC0gcG9zMSkgKyBcInB4XCI7XG4gICAgfVxuICBcbiAgICBmdW5jdGlvbiBjbG9zZURyYWdFbGVtZW50KCkge1xuICAgICAgLy8gc3RvcCBtb3Zpbmcgd2hlbiBtb3VzZSBidXR0b24gaXMgcmVsZWFzZWQ6XG4gICAgICBkb2N1bWVudC5vbm1vdXNldXAgPSBudWxsO1xuICAgICAgZG9jdW1lbnQub25tb3VzZW1vdmUgPSBudWxsO1xuICAgIH1cbn1cblxuLy8gV291bGQgdHVybiBcIkNyZWF0dXJlIE5hbWVcIiBpbnRvIFwiY3JlYXR1cmUtbmFtZVwiXG5leHBvcnQgZnVuY3Rpb24gaW5kZXhDb252ZXJ0ZXIodGV4dDogc3RyaW5nKSB7XG4gICAgcmV0dXJuIHRleHQucmVwbGFjZSgvXFxzKy9nLCAnLScpLnRvTG93ZXJDYXNlKCk7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBkaXNhYmxlSG90a2V5cygpIHtcbiAgICAvLyBEZXRlY3RzIHdoZW4gaW5wdXQgaXMgZm9jdXNlZCBhbmQgZGlzYWJsZWQgaG90a2V5c1xuICAgIGZvciAobGV0IGlucHV0IG9mIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoJ2lucHV0JykpIHtcbiAgICAgICAgaW5wdXQuYWRkRXZlbnRMaXN0ZW5lcignZm9jdXNpbicsICgpID0+IHsgY2FuVXNlSG90a2V5LnZhbHVlID0gZmFsc2U7IH0pO1xuICAgICAgICBpbnB1dC5hZGRFdmVudExpc3RlbmVyKCdmb2N1c291dCcsICgpID0+IHsgY2FuVXNlSG90a2V5LnZhbHVlID0gdHJ1ZTsgfSk7XG4gICAgfVxufVxuXG4vLyBpZiAodHlwZW9mIG1vZHVsZSAhPT0gJ3VuZGVmaW5lZCcpIG1vZHVsZS5leHBvcnRzID0ge1xuLy8gICAgIGluZGV4Q29udmVydGVyXG4vLyB9OyIsICJpbXBvcnQgeyBkcmFnRWxlbWVudCwgZGlzYWJsZUhvdGtleXMsIGluZGV4Q29udmVydGVyIH0gZnJvbSAnLi91dGlscyc7XG5pbXBvcnQgeyBnZXRDdXN0b21DcmVhdHVyZXMsIGFkZENyZWF0dXJlIH0gZnJvbSAnLi9yb3V0ZXMvY3JlYXR1cmVzLnJvdXRlJztcbmltcG9ydCB7IG9wZW5DcmVhdHVyZVN0YXRzV2luZG93IH0gZnJvbSAnLi9jcmVhdHVyZS1zdGF0cyc7XG5cbmV4cG9ydCBsZXQgY3JlYXR1cmVzOiBhbnkgPSB7dmFsdWU6IFtdfTtcbmV4cG9ydCBsZXQgY3VzdG9tQ3JlYXR1cmVzOiBhbnkgPSB7dmFsdWU6IFtdfTtcbmV4cG9ydCBsZXQgY3JlYXR1cmVzT3BlbjogYm9vbGVhbiA9IGZhbHNlO1xubGV0IGNyZWF0dXJlRm9ybU9wZW46IGJvb2xlYW47XG5cbi8vIEZvcm0gZGF0YVxubGV0IGNyZWF0dXJlRm9ybU5hbWU6IHN0cmluZywgY3JlYXR1cmVGb3JtU2l6ZTogc3RyaW5nID0gXCJtZWRpdW1cIiwgY3JlYXR1cmVGb3JtVHlwZTogc3RyaW5nLCBjcmVhdHVyZUZvcm1BbGlnbm1lbnQ6IHN0cmluZywgY3JlYXR1cmVGb3JtQWM6IG51bWJlciwgY3JlYXR1cmVGb3JtSGl0UG9pbnRzOiBudW1iZXIsIGNyZWF0dXJlRm9ybUhpdERpY2U6IHN0cmluZywgY3JlYXR1cmVGb3JtU3RyLCBjcmVhdHVyZUZvcm1EZXg6IG51bWJlciwgY3JlYXR1cmVGb3JtQ29uOiBudW1iZXIsIGNyZWF0dXJlRm9ybUludDogbnVtYmVyLCBjcmVhdHVyZUZvcm1XaXM6IG51bWJlciwgY3JlYXR1cmVGb3JtQ2hhcjogbnVtYmVyLCBjcmVhdHVyZUZvcm1WdWw6IHN0cmluZywgY3JlYXR1cmVGb3JtUmVzOiBzdHJpbmcsIGNyZWF0dXJlRm9ybURtZ0ltbXVuZTogc3RyaW5nLCBjcmVhdHVyZUZvcm1Db25JbW11bmU6IHN0cmluZywgY3JlYXR1cmVGb3JtTGFuZ3VhZ2VzOiBzdHJpbmcsIGNyZWF0dXJlRm9ybUNyOiBudW1iZXIsIGNyZWF0dXJlRm9ybVhwOiBudW1iZXIsIGNyZWF0dXJlRm9ybVdhbGs6IG51bWJlciwgY3JlYXR1cmVGb3JtU3dpbTogbnVtYmVyLCBjcmVhdHVyZUZvcm1CdXJyb3c6IG51bWJlciwgY3JlYXR1cmVGb3JtRmx5OiBudW1iZXIsIGNyZWF0dXJlRm9ybUNsaW1iOiBudW1iZXI7XG5cbmV4cG9ydCBmdW5jdGlvbiB0b2dnbGVDcmVhdHVyZXNXaW5kb3coKSB7XG4gICAgY3JlYXR1cmVzT3BlbiA9ICFjcmVhdHVyZXNPcGVuO1xuICAgIGlmIChjcmVhdHVyZXNPcGVuKSB7XG4gICAgICAgIHJlbmRlckNyZWF0dXJlV2luZG93KCk7XG4gICAgICAgIGdldENyZWF0dXJlc0JvZHlEYXRhKCk7XG4gICAgfSBlbHNlIHtcbiAgICAgICAgZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLmNyZWF0dXJlcy13aW5kb3cnKS5yZW1vdmUoKTtcbiAgICB9XG59XG5cbmZ1bmN0aW9uIHJlbmRlckNyZWF0dXJlV2luZG93KCkge1xuICAgIGNvbnN0IHdpbmRvdyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJ2JvZHknKS5hcHBlbmRDaGlsZChkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKSk7XG4gICAgd2luZG93LmNsYXNzTGlzdC5hZGQoJ2NyZWF0dXJlcy13aW5kb3cnKTtcbiAgICB3aW5kb3cuaW5zZXJ0QWRqYWNlbnRIVE1MKCdiZWZvcmVlbmQnLCBgXG4gICAgICAgIDxkaXYgY2xhc3M9XCJjcmVhdHVyZXMtY29udGVudFwiPlxuICAgICAgICAgICAgPGRpdiBjbGFzcz1cImNyZWF0dXJlcy13aW5kb3dfX2hlYWRlclwiPlxuICAgICAgICAgICAgICAgIDxoMj5DcmVhdHVyZXM8L2gyPlxuICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICA8ZGl2IGNsYXNzPVwiY3JlYXR1cmUtd2luZG93X19maWx0ZXJzXCI+XG4gICAgICAgICAgICAgICAgPGxhYmVsPlxuICAgICAgICAgICAgICAgICAgICA8c2VsZWN0IGlkPVwiY3JlYXR1cmUtbGlzdC1maWx0ZXJcIiBvbmNoYW5nZT1cImZpbHRlckNyZWF0dXJlc0xpc3QoZXZlbnQudGFyZ2V0LnZhbHVlKVwiPlxuICAgICAgICAgICAgICAgICAgICAgICAgPG9wdGlvbiB2YWx1ZT1cImFsbFwiPkFsbCBjcmVhdHVyZXM8L29wdGlvbj5cbiAgICAgICAgICAgICAgICAgICAgICAgIDxvcHRpb24gdmFsdWU9XCJzdGFuZGFyZFwiPlN0YW5kYXJkPC9vcHRpb24+XG4gICAgICAgICAgICAgICAgICAgICAgICA8b3B0aW9uIHZhbHVlPVwiY3VzdG9tXCI+Q3VzdG9tPC9vcHRpb24+XG4gICAgICAgICAgICAgICAgICAgIDwvc2VsZWN0PlxuICAgICAgICAgICAgICAgIDwvbGFiZWw+XG4gICAgICAgICAgICAgICAgPGxhYmVsPlxuICAgICAgICAgICAgICAgICAgICA8aW5wdXQgcGxhY2Vob2xkZXI9XCJzZWFyY2hcIiBvbmNoYW5nZT1cInNlYXJjaENyZWF0dXJlc0xpc3QoZXZlbnQudGFyZ2V0LnZhbHVlKVwiPlxuICAgICAgICAgICAgICAgIDwvbGFiZWw+XG4gICAgICAgICAgICAgICAgPGJ1dHRvbiBjbGFzcz1cImJ0bi0taG92ZXJcIiBpZD1cIm5ldy1jcmVhdHVyZS1mb3JtLWJ0blwiPk5ldyBDcmVhdHVyZTwvYnV0dG9uPlxuICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICA8ZGl2IGNsYXNzPVwiY3JlYXR1cmVzLXdpbmRvd19fYm9keVwiPjwvZGl2PlxuICAgICAgICA8L2Rpdj5cbiAgICBgKTtcbiAgICBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnbmV3LWNyZWF0dXJlLWZvcm0tYnRuJykuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCAoKSA9PiB7XG4gICAgICAgIHRvZ2dsZU5ld0NyZWF0dXJlRm9ybSgpO1xuICAgIH0pO1xuICAgIGRyYWdFbGVtZW50KHdpbmRvdywgJ2NyZWF0dXJlcy13aW5kb3cnKTtcbn1cblxuZnVuY3Rpb24gZmlsdGVyQ3JlYXR1cmVzTGlzdCh2YWx1ZTogc3RyaW5nKSB7XG4gICAgZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLmNyZWF0dXJlcy13aW5kb3dfX2JvZHknKS5pbm5lckhUTUwgPSAnJztcbiAgICBzd2l0Y2ggKHZhbHVlKSB7XG4gICAgICAgIGNhc2UgJ2FsbCc6XG4gICAgICAgICAgICBnZXRDcmVhdHVyZXNCb2R5RGF0YSgpO1xuICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgIGNhc2UgJ3N0YW5kYXJkJzpcbiAgICAgICAgICAgIGdldFN0YW5kYXJkQ3JlYXR1cmVzRGF0YSgpO1xuICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgIGNhc2UgJ2N1c3RvbSc6XG4gICAgICAgICAgICBnZXRDdXN0b21DcmVhdHVyZXNEYXRhKCk7XG4gICAgICAgICAgICBicmVhaztcbiAgICAgICAgZGVmYXVsdDpcbiAgICAgICAgICAgIGJyZWFrO1xuICAgIH1cbn1cblxuYXN5bmMgZnVuY3Rpb24gc2VhcmNoQ3JlYXR1cmVzTGlzdCh2YWx1ZTogc3RyaW5nKSB7XG4gICAgZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLmNyZWF0dXJlcy13aW5kb3dfX2JvZHknKS5pbm5lckhUTUwgPSAnJztcbiAgICBhd2FpdCBnZXRDdXN0b21DcmVhdHVyZXMoKTtcbiAgICBjb25zdCBzZWxlY3RlZEZpbHRlciA9ICg8SFRNTElucHV0RWxlbWVudD5kb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnY3JlYXR1cmUtbGlzdC1maWx0ZXInKSkudmFsdWU7XG5cbiAgICAvLyBGaWx0ZXIgYWxsIHN0YW5kYXJkIGNyZWF0dXJlc1xuICAgIGlmIChzZWxlY3RlZEZpbHRlciA9PT0gJ2FsbCcgfHwgc2VsZWN0ZWRGaWx0ZXIgPT09ICdzdGFuZGFyZCcpIHtcbiAgICAgICAgY3JlYXR1cmVzLmZvckVhY2goKGNyZWF0dXJlOiBhbnkpID0+IHtcbiAgICAgICAgICAgIGlmIChjcmVhdHVyZS5uYW1lLnRvTG93ZXJDYXNlKCkuaW5jbHVkZXModmFsdWUudG9Mb3dlckNhc2UoKSkpIHtcbiAgICAgICAgICAgICAgICByZW5kZXJTdGFuZGFyZENyZWF0dXJlUm93KGNyZWF0dXJlKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSk7XG4gICAgfVxuICAgIC8vIEZpbHRlciBhbGwgY3VzdG9tIGNyZWF0dXJlc1xuICAgIGlmIChzZWxlY3RlZEZpbHRlciA9PT0gJ2FsbCcgfHwgc2VsZWN0ZWRGaWx0ZXIgPT09ICdjdXN0b20nKSB7XG4gICAgICAgIGN1c3RvbUNyZWF0dXJlcy5mb3JFYWNoKChjcmVhdHVyZTogYW55KSA9PiB7XG4gICAgICAgICAgICBpZiAoY3JlYXR1cmUubmFtZS50b0xvd2VyQ2FzZSgpLmluY2x1ZGVzKHZhbHVlLnRvTG93ZXJDYXNlKCkpKSB7XG4gICAgICAgICAgICAgICAgcmVuZGVyQ3VzdG9tQ3JlYXR1cmVSb3coY3JlYXR1cmUpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9KTtcbiAgICB9XG59XG5cbmFzeW5jIGZ1bmN0aW9uIGdldENyZWF0dXJlc0JvZHlEYXRhKCkge1xuICAgIGF3YWl0IGdldEN1c3RvbUNyZWF0dXJlcygpO1xuICAgIGZvciAobGV0IGNyZWF0dXJlIG9mIGN1c3RvbUNyZWF0dXJlcy52YWx1ZSkge1xuICAgICAgICByZW5kZXJDdXN0b21DcmVhdHVyZVJvdyhjcmVhdHVyZSk7XG4gICAgfVxuICAgIGZvciAobGV0IGNyZWF0dXJlIG9mIGNyZWF0dXJlcy52YWx1ZSkge1xuICAgICAgICByZW5kZXJTdGFuZGFyZENyZWF0dXJlUm93KGNyZWF0dXJlKTtcbiAgICB9XG59XG5cbmFzeW5jIGZ1bmN0aW9uIGdldFN0YW5kYXJkQ3JlYXR1cmVzRGF0YSgpIHtcbiAgICBmb3IgKGxldCBjcmVhdHVyZSBvZiBjcmVhdHVyZXMudmFsdWUpIHtcbiAgICAgICAgcmVuZGVyU3RhbmRhcmRDcmVhdHVyZVJvdyhjcmVhdHVyZSk7XG4gICAgfVxufVxuXG5hc3luYyBmdW5jdGlvbiBnZXRDdXN0b21DcmVhdHVyZXNEYXRhKCkge1xuICAgIGF3YWl0IGdldEN1c3RvbUNyZWF0dXJlcygpO1xuICAgIGZvciAobGV0IGNyZWF0dXJlIG9mIGN1c3RvbUNyZWF0dXJlcy52YWx1ZSkge1xuICAgICAgICByZW5kZXJDdXN0b21DcmVhdHVyZVJvdyhjcmVhdHVyZSk7XG4gICAgfVxufVxuXG4vLyBEaXNwbGF5cyBhIHN0YW5kYXJkIGNyZWF0dXJlIG9uIHRoZSBjcmVhdHVyZXMgbGlzdC5cbmZ1bmN0aW9uIHJlbmRlclN0YW5kYXJkQ3JlYXR1cmVSb3coY3JlYXR1cmU6IGFueSkge1xuICAgIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5jcmVhdHVyZXMtd2luZG93X19ib2R5JykuaW5zZXJ0QWRqYWNlbnRIVE1MKCdiZWZvcmVlbmQnLCBgXG4gICAgICAgIDxkaXYgY2xhc3M9XCJjcmVhdHVyZXMtd2luZG93X19zdGFuZGFyZC1jcmVhdHVyZVwiPlxuICAgICAgICAgICAgPGRpdiBjbGFzcz1cImNyZWF0dXJlcy13aW5kb3dfX2l0ZW0gY3JlYXR1cmUtcm93LWNsaWNrLWV2XCI+XG4gICAgICAgICAgICAgICAgPHA+JHtjcmVhdHVyZS5uYW1lfTwvcD5cbiAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICA8L2Rpdj5cbiAgICBgKTtcbiAgICBhZGRDcmVhdHVyZVJvd0V2ZW50cygnc3RhbmRhcmQnLCBjcmVhdHVyZS5pbmRleCk7XG59XG5cbi8vIERpc3BsYXlzIGEgY3VzdG9tIGNyZWF0dXJlIG9uIHRoZSBjcmVhdHVyZXMgbGlzdC5cbmZ1bmN0aW9uIHJlbmRlckN1c3RvbUNyZWF0dXJlUm93KGNyZWF0dXJlOiBhbnkpIHtcbiAgICBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcuY3JlYXR1cmVzLXdpbmRvd19fYm9keScpLmluc2VydEFkamFjZW50SFRNTCgnYmVmb3JlZW5kJywgYFxuICAgICAgICA8ZGl2IGNsYXNzPVwiY3JlYXR1cmVzLXdpbmRvd19fY3VzdG9tLWNyZWF0dXJlXCI+XG4gICAgICAgICAgICA8ZGl2IGNsYXNzPVwiY3JlYXR1cmVzLXdpbmRvd19faXRlbSBjcmVhdHVyZS1yb3ctY2xpY2stZXZcIj5cbiAgICAgICAgICAgICAgICA8cD4ke2NyZWF0dXJlLm5hbWV9PC9wPlxuICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICA8aSBjbGFzcz1cImZhLXNvbGlkIGZhLXRyYXNoLWNhblwiIG9uY2xpY2s9XCJkZWxldGVDcmVhdHVyZSgnJHtjcmVhdHVyZS5pbmRleH0nKVwiPjwvaT5cbiAgICAgICAgPC9kaXY+XG4gICAgYCk7XG4gICAgYWRkQ3JlYXR1cmVSb3dFdmVudHMoJ2N1c3RvbScsIGNyZWF0dXJlLmluZGV4KTtcbn1cblxuLy8gR2l2ZSBjcmVhdHVyZSByb3dzIG9uIGNsaWNrIGV2ZW50IGxpc3RlbmVycywgdG8gb3BlbiBjcmVhdHVyZSBzdGF0c1xuZnVuY3Rpb24gYWRkQ3JlYXR1cmVSb3dFdmVudHMocm93VHlwZTogc3RyaW5nLCBpbmRleDogc3RyaW5nKSB7XG4gICAgY29uc3Qgcm93ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLmNyZWF0dXJlLXJvdy1jbGljay1ldicpO1xuICAgIHN3aXRjaCAocm93VHlwZSkge1xuICAgICAgICBjYXNlICdzdGFuZGFyZCc6XG4gICAgICAgICAgICByb3cuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCAoKSA9PiB7XG4gICAgICAgICAgICAgICAgb3BlbkNyZWF0dXJlU3RhdHNXaW5kb3coaW5kZXgsIGZhbHNlKTtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgcm93LmNsYXNzTGlzdC5yZW1vdmUoJ2NyZWF0dXJlLXJvdy1jbGljay1ldicpO1xuICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgIGNhc2UgJ2N1c3RvbSc6XG4gICAgICAgICAgICByb3cuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCAoKSA9PiB7XG4gICAgICAgICAgICAgICAgb3BlbkNyZWF0dXJlU3RhdHNXaW5kb3coaW5kZXgsIHRydWUpO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICByb3cuY2xhc3NMaXN0LnJlbW92ZSgnY3JlYXR1cmUtcm93LWNsaWNrLWV2Jyk7XG4gICAgICAgICAgICBicmVhaztcbiAgICAgICAgZGVmYXVsdDpcbiAgICAgICAgICAgIGJyZWFrO1xuICAgIH1cbn1cblxuY29uc3QgY3JlYXR1cmVGb3JtQm9keTogYW55ID0gYFxuPGRpdiBjbGFzcz1cImNyZWF0dXJlcy1jb250ZW50XCI+XG4gICAgPGJ1dHRvbiBjbGFzcz1cImJ0bi0td2luZG93LWNsb3NlXCIgb25jbGljaz1cInRvZ2dsZU5ld0NyZWF0dXJlRm9ybSgpXCI+WDwvYnV0dG9uPlxuICAgIDxkaXYgY2xhc3M9XCJjcmVhdHVyZXMtd2luZG93LWZvcm1fX2hlYWRlclwiPlxuICAgICAgICA8aDI+TmV3IENyZWF0dXJlPC9oMj5cbiAgICA8L2Rpdj5cbiAgICA8Zm9ybSBjbGFzcz1cImNyZWF0dXJlcy13aW5kb3ctZm9ybV9fYm9keVwiIG9uc3VibWl0PVwic3VibWl0Q3JlYXR1cmVGb3JtKGV2ZW50KVwiPlxuICAgICAgICA8bGFiZWw+VG9rZW5cbiAgICAgICAgICAgIDxpbnB1dCB0eXBlPVwiZmlsZVwiPlxuICAgICAgICA8L2xhYmVsPlxuICAgICAgICA8ZGl2IGNsYXNzPVwiY3JlYXR1cmVzLXdpbmRvdy1mb3JtX19ib2R5LS1ib3hcIj5cbiAgICAgICAgICAgIDxsYWJlbD5OYW1lXG4gICAgICAgICAgICAgICAgPGlucHV0IHJlcXVpcmVkIG9uY2hhbmdlPVwiY3JlYXR1cmVGb3JtTmFtZSA9IGV2ZW50LnRhcmdldC52YWx1ZVwiPlxuICAgICAgICAgICAgPC9sYWJlbD5cbiAgICAgICAgICAgIDxsYWJlbD5TaXplXG4gICAgICAgICAgICAgICAgPHNlbGVjdCBvbmNoYW5nZT1cImNyZWF0dXJlRm9ybVNpemUgPSBldmVudC50YXJnZXQudmFsdWVcIj5cbiAgICAgICAgICAgICAgICAgICAgPG9wdGlvbiB2YWx1ZT1cInRpbnlcIj5UaW55PC9vcHRpb24+XG4gICAgICAgICAgICAgICAgICAgIDxvcHRpb24gdmFsdWU9XCJzbWFsbFwiPlNtYWxsPC9vcHRpb24+XG4gICAgICAgICAgICAgICAgICAgIDxvcHRpb24gdmFsdWU9XCJtZWRpdW1cIiBzZWxlY3RlZD5NZWRpdW08L29wdGlvbj5cbiAgICAgICAgICAgICAgICAgICAgPG9wdGlvbiB2YWx1ZT1cImxhcmdlXCI+TGFyZ2U8L29wdGlvbj5cbiAgICAgICAgICAgICAgICAgICAgPG9wdGlvbiB2YWx1ZT1cImh1Z2VcIj5IdWdlPC9vcHRpb24+XG4gICAgICAgICAgICAgICAgICAgIDxvcHRpb24gdmFsdWU9XCJnYXJnYW50dWFuXCI+R2FyZ2FudHVhbjwvb3B0aW9uPlxuICAgICAgICAgICAgICAgIDwvc2VsZWN0PlxuICAgICAgICAgICAgPC9sYWJlbD5cbiAgICAgICAgICAgIDxsYWJlbD5UeXBlXG4gICAgICAgICAgICAgICAgPGlucHV0IGNsYXNzPVwiaW5wdXQtLW1kXCIgb25jaGFuZ2U9XCJjcmVhdHVyZUZvcm1UeXBlID0gZXZlbnQudGFyZ2V0LnZhbHVlXCI+XG4gICAgICAgICAgICA8L2xhYmVsPlxuICAgICAgICAgICAgPGxhYmVsPkFsaWdubWVudFxuICAgICAgICAgICAgICAgIDxpbnB1dCBjbGFzcz1cImlucHV0LS1zbVwiIG9uY2hhbmdlPVwiY3JlYXR1cmVGb3JtQWxpZ25tZW50ID0gZXZlbnQudGFyZ2V0LnZhbHVlXCI+XG4gICAgICAgICAgICA8L2xhYmVsPlxuICAgICAgICAgICAgPGxhYmVsPkFDXG4gICAgICAgICAgICAgICAgPGlucHV0IGNsYXNzPVwiaW5wdXQtLXNtXCIgdHlwZT1cIm51bWJlclwiIG9uY2hhbmdlPVwiY3JlYXR1cmVGb3JtQWMgPSBldmVudC50YXJnZXQudmFsdWVcIj5cbiAgICAgICAgICAgIDwvbGFiZWw+XG4gICAgICAgICAgICA8bGFiZWw+SGl0IFBvaW50c1xuICAgICAgICAgICAgICAgIDxpbnB1dCBjbGFzcz1cImlucHV0LS1zbVwiIHR5cGU9XCJudW1iZXJcIiBvbmNoYW5nZT1cImNyZWF0dXJlRm9ybUhpdFBvaW50cyA9IGV2ZW50LnRhcmdldC52YWx1ZVwiPlxuICAgICAgICAgICAgPC9sYWJlbD5cbiAgICAgICAgICAgIDxsYWJlbD5IaXQgRGljZVxuICAgICAgICAgICAgICAgIDxpbnB1dCBjbGFzcz1cImlucHV0LS1zbVwiIG9uY2hhbmdlPVwiY3JlYXR1cmVGb3JtSGl0RGljZSA9IGV2ZW50LnRhcmdldC52YWx1ZVwiPlxuICAgICAgICAgICAgPC9sYWJlbD5cbiAgICAgICAgPC9kaXY+XG4gICAgICAgIDxkaXYgY2xhc3M9XCJjcmVhdHVyZXMtd2luZG93LWZvcm1fX2JvZHktLWJveFwiPlxuICAgICAgICAgICAgPGRpdj5cbiAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzPVwiZm9ybV9faW5wdXQtYWRkIGZvcm1fX2lucHV0LWFkZC0tc3BlZWRcIj5cbiAgICAgICAgICAgICAgICAgICAgPGxhYmVsPk1vdmVtZW50XG4gICAgICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzPVwiZmxleC1jb250YWluZXJcIj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8cD5XYWxrPC9wPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxpbnB1dCBwbGFjZWhvbGRlcj1cIjMwXCIgdHlwZT1cIm51bWJlclwiIGNsYXNzPVwiaW5wdXQtLXNtIGNyZWF0dXJlLWlucHV0c19fc3BlZWQtdmFsdWVcIiBvbmNoYW5nZT1cImNyZWF0dXJlRm9ybVdhbGsgPSBldmVudC50YXJnZXQudmFsdWVcIj5cbiAgICAgICAgICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzcz1cImZsZXgtY29udGFpbmVyXCI+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPHA+U3dpbTwvcD5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8aW5wdXQgcGxhY2Vob2xkZXI9XCIzMFwiIHR5cGU9XCJudW1iZXJcIiBjbGFzcz1cImlucHV0LS1zbSBjcmVhdHVyZS1pbnB1dHNfX3NwZWVkLXZhbHVlXCIgb25jaGFuZ2U9XCJjcmVhdHVyZUZvcm1Td2ltID0gZXZlbnQudGFyZ2V0LnZhbHVlXCI+XG4gICAgICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJmbGV4LWNvbnRhaW5lclwiPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxwPkJ1cnJvdzwvcD5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8aW5wdXQgcGxhY2Vob2xkZXI9XCIzMFwiIHR5cGU9XCJudW1iZXJcIiBjbGFzcz1cImlucHV0LS1zbSBjcmVhdHVyZS1pbnB1dHNfX3NwZWVkLXZhbHVlXCIgb25jaGFuZ2U9XCJjcmVhdHVyZUZvcm1CdXJyb3cgPSBldmVudC50YXJnZXQudmFsdWVcIj5cbiAgICAgICAgICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzcz1cImZsZXgtY29udGFpbmVyXCI+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPHA+Rmx5PC9wPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxpbnB1dCBwbGFjZWhvbGRlcj1cIjMwXCIgdHlwZT1cIm51bWJlclwiIGNsYXNzPVwiaW5wdXQtLXNtIGNyZWF0dXJlLWlucHV0c19fc3BlZWQtdmFsdWVcIiBvbmNoYW5nZT1cImNyZWF0dXJlRm9ybUZseSA9IGV2ZW50LnRhcmdldC52YWx1ZVwiPlxuICAgICAgICAgICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzPVwiZmxleC1jb250YWluZXJcIj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8cD5DbGltYjwvcD5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8aW5wdXQgcGxhY2Vob2xkZXI9XCIzMFwiIHR5cGU9XCJudW1iZXJcIiBjbGFzcz1cImlucHV0LS1zbSBjcmVhdHVyZS1pbnB1dHNfX3NwZWVkLXZhbHVlXCIgb25jaGFuZ2U9XCJjcmVhdHVyZUZvcm1DbGltYiA9IGV2ZW50LnRhcmdldC52YWx1ZVwiPlxuICAgICAgICAgICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgICAgICAgIDwvbGFiZWw+XG4gICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgPC9kaXY+XG4gICAgICAgIDxkaXYgY2xhc3M9XCJjcmVhdHVyZXMtd2luZG93LWZvcm1fX2JvZHktLWJveFwiPlxuICAgICAgICAgICAgPGxhYmVsPlN0clxuICAgICAgICAgICAgICAgIDxpbnB1dCBjbGFzcz1cImlucHV0LS1zbVwiIHR5cGU9XCJudW1iZXJcIiBvbmNoYW5nZT1cImNyZWF0dXJlRm9ybVN0ciA9IGV2ZW50LnRhcmdldC52YWx1ZVwiIHBsYWNlaG9sZGVyPVwiMTBcIj5cbiAgICAgICAgICAgIDwvbGFiZWw+XG4gICAgICAgICAgICA8bGFiZWw+RGV4XG4gICAgICAgICAgICAgICAgPGlucHV0IGNsYXNzPVwiaW5wdXQtLXNtXCIgdHlwZT1cIm51bWJlclwiIG9uY2hhbmdlPVwiY3JlYXR1cmVGb3JtRGV4ID0gZXZlbnQudGFyZ2V0LnZhbHVlXCIgcGxhY2Vob2xkZXI9XCIxMFwiPlxuICAgICAgICAgICAgPC9sYWJlbD5cbiAgICAgICAgICAgIDxsYWJlbD5Db25cbiAgICAgICAgICAgICAgICA8aW5wdXQgY2xhc3M9XCJpbnB1dC0tc21cIiB0eXBlPVwibnVtYmVyXCIgb25jaGFuZ2U9XCJjcmVhdHVyZUZvcm1Db24gPSBldmVudC50YXJnZXQudmFsdWVcIiBwbGFjZWhvbGRlcj1cIjEwXCI+XG4gICAgICAgICAgICA8L2xhYmVsPlxuICAgICAgICAgICAgPGxhYmVsPkludFxuICAgICAgICAgICAgICAgIDxpbnB1dCBjbGFzcz1cImlucHV0LS1zbVwiIHR5cGU9XCJudW1iZXJcIiBvbmNoYW5nZT1cImNyZWF0dXJlRm9ybUludCA9IGV2ZW50LnRhcmdldC52YWx1ZVwiIHBsYWNlaG9sZGVyPVwiMTBcIj5cbiAgICAgICAgICAgIDwvbGFiZWw+XG4gICAgICAgICAgICA8bGFiZWw+V2lzXG4gICAgICAgICAgICAgICAgPGlucHV0IGNsYXNzPVwiaW5wdXQtLXNtXCIgdHlwZT1cIm51bWJlclwiIG9uY2hhbmdlPVwiY3JlYXR1cmVGb3JtV2lzID0gZXZlbnQudGFyZ2V0LnZhbHVlXCIgcGxhY2Vob2xkZXI9XCIxMFwiPlxuICAgICAgICAgICAgPC9sYWJlbD5cbiAgICAgICAgICAgIDxsYWJlbD5DaGFyXG4gICAgICAgICAgICAgICAgPGlucHV0IGNsYXNzPVwiaW5wdXQtLXNtXCIgdHlwZT1cIm51bWJlclwiIG9uY2hhbmdlPVwiY3JlYXR1cmVGb3JtQ2hhciA9IGV2ZW50LnRhcmdldC52YWx1ZVwiIHBsYWNlaG9sZGVyPVwiMTBcIj5cbiAgICAgICAgICAgIDwvbGFiZWw+XG4gICAgICAgIDwvZGl2PlxuICAgICAgICA8ZGl2IGNsYXNzPVwiY3JlYXR1cmVzLXdpbmRvdy1mb3JtX19ib2R5LS1ib3hcIj5cbiAgICAgICAgICAgIDxkaXY+XG4gICAgICAgICAgICAgICAgPGRpdiBjbGFzcz1cImZvcm1fX2lucHV0LWFkZCBmb3JtX19pbnB1dC1hZGQtLXByb2ZpY2llbmN5XCI+XG4gICAgICAgICAgICAgICAgICAgIDxsYWJlbD5Qcm9maWNpZW5jaWVzXG4gICAgICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzPVwiZmxleC1jb250YWluZXJcIj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8aW5wdXQgcGxhY2Vob2xkZXI9XCJQZXJjZXB0aW9uXCIgY2xhc3M9XCJpbnB1dC0tbWQgY3JlYXR1cmUtaW5wdXRzX19wcm9maWNpZW5jeS1uYW1lXCI+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPGlucHV0IHBsYWNlaG9sZGVyPVwiNlwiIHR5cGU9XCJudW1iZXJcIiBjbGFzcz1cImlucHV0LS1zbSBjcmVhdHVyZS1pbnB1dHNfX3Byb2ZpY2llbmN5LXZhbHVlXCI+XG4gICAgICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgICAgICAgPC9sYWJlbD5cbiAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgICA8YnV0dG9uIHR5cGU9XCJidXR0b25cIiBvbmNsaWNrPVwiYWRkSW5wdXRzKCdwcm9maWNpZW5jeScpXCIgY2xhc3M9XCJjcmVhdHVyZS1mb3JtX19idG4tLWlucHV0XCI+QWRkIHByb2ZpY2llbmN5PC9idXR0b24+XG4gICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgPC9kaXY+XG4gICAgICAgIDxkaXYgY2xhc3M9XCJjcmVhdHVyZXMtd2luZG93LWZvcm1fX2JvZHktLWJveFwiPlxuICAgICAgICAgICAgPGxhYmVsPlZ1bG5lcmFiaWxpdGllc1xuICAgICAgICAgICAgICAgIDx0ZXh0YXJlYSByb3dzPVwiM1wiIGNvbHM9XCI0MFwiIHBsYWNlaG9sZGVyPVwiZmlyZSwgdGh1bmRlclwiIG9uY2hhbmdlPVwiY3JlYXR1cmVGb3JtVnVsID0gZXZlbnQudGFyZ2V0LnZhbHVlXCI+PC90ZXh0YXJlYT5cbiAgICAgICAgICAgIDwvbGFiZWw+XG4gICAgICAgIDwvZGl2PlxuICAgICAgICA8ZGl2IGNsYXNzPVwiY3JlYXR1cmVzLXdpbmRvdy1mb3JtX19ib2R5LS1ib3hcIj5cbiAgICAgICAgICAgIDxsYWJlbD5SZXNpc3RhbmNlc1xuICAgICAgICAgICAgICAgIDx0ZXh0YXJlYSByb3dzPVwiM1wiIGNvbHM9XCI0MFwiIHBsYWNlaG9sZGVyPVwicG9pc29uLCBibHVkZ2VvbmluZ1wiIG9uY2hhbmdlPVwiY3JlYXR1cmVGb3JtUmVzID0gZXZlbnQudGFyZ2V0LnZhbHVlXCI+PC90ZXh0YXJlYT5cbiAgICAgICAgICAgIDwvbGFiZWw+XG4gICAgICAgIDwvZGl2PlxuICAgICAgICA8ZGl2IGNsYXNzPVwiY3JlYXR1cmVzLXdpbmRvdy1mb3JtX19ib2R5LS1ib3hcIj5cbiAgICAgICAgICAgIDxsYWJlbD5EYW1hZ2UgSW1tdW5pdGllc1xuICAgICAgICAgICAgICAgIDx0ZXh0YXJlYSByb3dzPVwiM1wiIGNvbHM9XCI0MFwiIHBsYWNlaG9sZGVyPVwibm9ubWFnaWNhbCBzbGFzaGluZ1wiIG9uY2hhbmdlPVwiY3JlYXR1cmVGb3JtRG1nSW1tdW5lID0gZXZlbnQudGFyZ2V0LnZhbHVlXCI+PC90ZXh0YXJlYT5cbiAgICAgICAgICAgIDwvbGFiZWw+XG4gICAgICAgIDwvZGl2PlxuICAgICAgICA8ZGl2IGNsYXNzPVwiY3JlYXR1cmVzLXdpbmRvdy1mb3JtX19ib2R5LS1ib3hcIj5cbiAgICAgICAgICAgIDxsYWJlbD5Db25kaXRpb24gSW1tdW5pdGllc1xuICAgICAgICAgICAgICAgIDx0ZXh0YXJlYSByb3dzPVwiM1wiIGNvbHM9XCI0MFwiIHBsYWNlaG9sZGVyPVwicHJvbmUsIHJlc3RyYWluZWRcIiBvbmNoYW5nZT1cImNyZWF0dXJlRm9ybUNvbkltbXVuZSA9IGV2ZW50LnRhcmdldC52YWx1ZVwiPjwvdGV4dGFyZWE+XG4gICAgICAgICAgICA8L2xhYmVsPlxuICAgICAgICA8L2Rpdj5cbiAgICAgICAgPGRpdiBjbGFzcz1cImNyZWF0dXJlcy13aW5kb3ctZm9ybV9fYm9keS0tYm94XCI+XG4gICAgICAgICAgICA8ZGl2PlxuICAgICAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJmb3JtX19pbnB1dC1hZGQgZm9ybV9faW5wdXQtYWRkLS1zZW5zZVwiPlxuICAgICAgICAgICAgICAgICAgICA8bGFiZWw+U2Vuc2VzXG4gICAgICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzPVwiZmxleC1jb250YWluZXJcIj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8aW5wdXQgcGxhY2Vob2xkZXI9XCJEYXJrdmlzaW9uXCIgY2xhc3M9XCJpbnB1dC0tbWQgY3JlYXR1cmUtaW5wdXRzX19zZW5zZS1uYW1lXCI+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPGlucHV0IHBsYWNlaG9sZGVyPVwiNjBcIiB0eXBlPVwibnVtYmVyXCIgY2xhc3M9XCJpbnB1dC0tc20gY3JlYXR1cmUtaW5wdXRzX19zZW5zZS12YWx1ZVwiPlxuICAgICAgICAgICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgICAgICAgIDwvbGFiZWw+XG4gICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgICAgPGJ1dHRvbiB0eXBlPVwiYnV0dG9uXCIgb25jbGljaz1cImFkZElucHV0cygnc2Vuc2UnKVwiIGNsYXNzPVwiY3JlYXR1cmUtZm9ybV9fYnRuLS1pbnB1dFwiPkFkZCBzZW5zZTwvYnV0dG9uPlxuICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgIDwvZGl2PlxuICAgICAgICA8ZGl2IGNsYXNzPVwiY3JlYXR1cmVzLXdpbmRvdy1mb3JtX19ib2R5LS1ib3hcIj5cbiAgICAgICAgICAgIDxsYWJlbD5MYW5ndWFnZXNcbiAgICAgICAgICAgICAgICA8dGV4dGFyZWEgcm93cz1cIjNcIiBjb2xzPVwiNDBcIiBvbmNoYW5nZT1cImNyZWF0dXJlRm9ybUxhbmd1YWdlcyA9IGV2ZW50LnRhcmdldC52YWx1ZVwiPjwvdGV4dGFyZWE+XG4gICAgICAgICAgICA8L2xhYmVsPlxuICAgICAgICA8L2Rpdj5cbiAgICAgICAgPGRpdiBjbGFzcz1cImNyZWF0dXJlcy13aW5kb3ctZm9ybV9fYm9keS0tYm94XCI+XG4gICAgICAgICAgICA8bGFiZWw+Q1JcbiAgICAgICAgICAgICAgICA8aW5wdXQgdHlwZT1cIm51bWJlclwiIGNsYXNzPVwiaW5wdXQtLXNtXCIgb25jaGFuZ2U9XCJjcmVhdHVyZUZvcm1DciA9IGV2ZW50LnRhcmdldC52YWx1ZVwiPlxuICAgICAgICAgICAgPC9sYWJlbD5cbiAgICAgICAgICAgIDxsYWJlbD5YUFxuICAgICAgICAgICAgICAgIDxpbnB1dCB0eXBlPVwibnVtYmVyXCIgY2xhc3M9XCJpbnB1dC0tc21cIiBvbmNoYW5nZT1cImNyZWF0dXJlRm9ybVhwID0gZXZlbnQudGFyZ2V0LnZhbHVlXCI+XG4gICAgICAgICAgICA8L2xhYmVsPlxuICAgICAgICA8L2Rpdj5cbiAgICAgICAgPGRpdiBjbGFzcz1cImNyZWF0dXJlcy13aW5kb3ctZm9ybV9fYm9keS0tYm94XCI+XG4gICAgICAgICAgICA8ZGl2PlxuICAgICAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJmb3JtX19pbnB1dC1hZGQgZm9ybV9faW5wdXQtYWRkLS1hYmlsaXR5XCI+XG4gICAgICAgICAgICAgICAgICAgIDxsYWJlbD5TcGVjaWFsIEFiaWxpdGllc1xuICAgICAgICAgICAgICAgICAgICAgICAgPGlucHV0IHBsYWNlaG9sZGVyPVwiQWJpbGl0eSBuYW1lXCIgY2xhc3M9XCJpbnB1dC0tbWQgY3JlYXR1cmUtaW5wdXRzX19hYmlsaXR5LW5hbWVcIj5cbiAgICAgICAgICAgICAgICAgICAgICAgIDx0ZXh0YXJlYSByb3dzPVwiM1wiIGNvbHM9XCI0MFwiIHBsYWNlaG9sZGVyPVwiZGVzY3JpcHRpb25cIiBjbGFzcz1cImNyZWF0dXJlLWlucHV0c19fYWJpbGl0eS1kZXNjXCI+PC90ZXh0YXJlYT5cbiAgICAgICAgICAgICAgICAgICAgPC9sYWJlbD5cbiAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgICA8YnV0dG9uIHR5cGU9XCJidXR0b25cIiBvbmNsaWNrPVwiYWRkRGVzY0lucHV0cygnYWJpbGl0eScpXCIgY2xhc3M9XCJjcmVhdHVyZS1mb3JtX19idG4tLWlucHV0XCI+QWRkIGFiaWxpdHk8L2J1dHRvbj5cbiAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICA8L2Rpdj5cbiAgICAgICAgPGRpdiBjbGFzcz1cImNyZWF0dXJlcy13aW5kb3ctZm9ybV9fYm9keS0tYm94XCI+XG4gICAgICAgICAgICA8ZGl2PlxuICAgICAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJmb3JtX19pbnB1dC1hZGQgZm9ybV9faW5wdXQtYWRkLS1hY3Rpb25cIj5cbiAgICAgICAgICAgICAgICAgICAgPGxhYmVsPkFjdGlvbnNcbiAgICAgICAgICAgICAgICAgICAgICAgIDxpbnB1dCBwbGFjZWhvbGRlcj1cIkFjdGlvbiBuYW1lXCIgY2xhc3M9XCJpbnB1dC0tbWQgY3JlYXR1cmUtaW5wdXRzX19hY3Rpb24tbmFtZVwiPlxuICAgICAgICAgICAgICAgICAgICAgICAgPHRleHRhcmVhIHJvd3M9XCIzXCIgY29scz1cIjQwXCIgcGxhY2Vob2xkZXI9XCJkZXNjcmlwdGlvblwiIGNsYXNzPVwiY3JlYXR1cmUtaW5wdXRzX19hY3Rpb24tZGVzY1wiPjwvdGV4dGFyZWE+XG4gICAgICAgICAgICAgICAgICAgIDwvbGFiZWw+XG4gICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgICAgPGJ1dHRvbiB0eXBlPVwiYnV0dG9uXCIgb25jbGljaz1cImFkZERlc2NJbnB1dHMoJ2FjdGlvbicpXCIgY2xhc3M9XCJjcmVhdHVyZS1mb3JtX19idG4tLWlucHV0XCI+QWRkIGFjdGlvbjwvYnV0dG9uPlxuICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgIDwvZGl2PlxuICAgICAgICA8ZGl2IGNsYXNzPVwiY3JlYXR1cmVzLXdpbmRvdy1mb3JtX19ib2R5LS1ib3hcIj5cbiAgICAgICAgICAgIDxkaXY+XG4gICAgICAgICAgICAgICAgPGRpdiBjbGFzcz1cImZvcm1fX2lucHV0LWFkZCBmb3JtX19pbnB1dC1hZGQtLWxlZy1hY3Rpb25cIj5cbiAgICAgICAgICAgICAgICAgICAgPGxhYmVsPkxlZ2VuZGFyeSBBY3Rpb25zXG4gICAgICAgICAgICAgICAgICAgICAgICA8aW5wdXQgcGxhY2Vob2xkZXI9XCJBY3Rpb24gbmFtZVwiIGNsYXNzPVwiaW5wdXQtLW1kIGNyZWF0dXJlLWlucHV0c19fbGVnLWFjdGlvbi1uYW1lXCI+XG4gICAgICAgICAgICAgICAgICAgICAgICA8dGV4dGFyZWEgcm93cz1cIjNcIiBjb2xzPVwiNDBcIiBwbGFjZWhvbGRlcj1cImRlc2NyaXB0aW9uXCIgY2xhc3M9XCJjcmVhdHVyZS1pbnB1dHNfX2xlZy1hY3Rpb24tZGVzY1wiPjwvdGV4dGFyZWE+XG4gICAgICAgICAgICAgICAgICAgIDwvbGFiZWw+XG4gICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgICAgPGJ1dHRvbiB0eXBlPVwiYnV0dG9uXCIgb25jbGljaz1cImFkZERlc2NJbnB1dHMoJ2xlZy1hY3Rpb24nKVwiIGNsYXNzPVwiY3JlYXR1cmUtZm9ybV9fYnRuLS1pbnB1dFwiPkFkZCBMZWdlbmRhcnkgYWN0aW9uPC9idXR0b24+XG4gICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgPC9kaXY+XG4gICAgICAgIDxici8+XG4gICAgICAgIDxidXR0b24gdHlwZT1cInN1Ym1pdFwiPkFkZCBDcmVhdHVyZTwvYnV0dG9uPlxuICAgIDwvZm9ybT5cbjwvZGl2PlxuYDtcblxuZnVuY3Rpb24gdG9nZ2xlTmV3Q3JlYXR1cmVGb3JtKCkge1xuICAgIGNyZWF0dXJlRm9ybU9wZW4gPSAhY3JlYXR1cmVGb3JtT3BlbjtcbiAgICBpZiAoY3JlYXR1cmVGb3JtT3Blbikge1xuICAgICAgICBjb25zdCB3aW5kb3cgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCdib2R5JykuYXBwZW5kQ2hpbGQoZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2JykpO1xuICAgICAgICB3aW5kb3cuY2xhc3NMaXN0LmFkZCgnY3JlYXR1cmVzLXdpbmRvdy1mb3JtJyk7XG4gICAgICAgIHdpbmRvdy5pbnNlcnRBZGphY2VudEhUTUwoJ2JlZm9yZWVuZCcsIGNyZWF0dXJlRm9ybUJvZHkpO1xuICAgICAgICBcbiAgICAgICAgZGlzYWJsZUhvdGtleXMoKTtcbiAgICAgICAgZHJhZ0VsZW1lbnQod2luZG93LCAnY3JlYXR1cmVzLXdpbmRvdy1mb3JtJyk7XG4gICAgfSBlbHNlIHtcbiAgICAgICAgZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLmNyZWF0dXJlcy13aW5kb3ctZm9ybScpLnJlbW92ZSgpO1xuICAgIH1cbn1cblxuLy8gQWRkcyB0d28gaW5wdXRzIHdoZW4gdXNlciBjbGlja3MgYSBidXR0b25cbmZ1bmN0aW9uIGFkZElucHV0cyhfbmFtZTogc3RyaW5nKSB7XG4gICAgZG9jdW1lbnQucXVlcnlTZWxlY3RvcihgLmZvcm1fX2lucHV0LWFkZC0tJHtfbmFtZX1gKS5pbnNlcnRBZGphY2VudEhUTUwoJ2JlZm9yZWVuZCcsIGBcbiAgICAgICAgPGRpdiBjbGFzcz1cImZsZXgtY29udGFpbmVyXCI+XG4gICAgICAgICAgICA8aW5wdXQgcGxhY2Vob2xkZXI9XCJuYW1lXCIgY2xhc3M9XCJpbnB1dC0tbWQgY3JlYXR1cmUtaW5wdXRzX18ke19uYW1lfS1uYW1lXCI+XG4gICAgICAgICAgICA8aW5wdXQgcGxhY2Vob2xkZXI9XCJ2YWx1ZVwiIHR5cGU9XCJudW1iZXJcIiBjbGFzcz1cImlucHV0LS1zbSBjcmVhdHVyZS1pbnB1dHNfXyR7X25hbWV9LXZhbHVlXCI+XG4gICAgICAgICAgICA8YnV0dG9uIHR5cGU9XCJidXR0b25cIiBvbmNsaWNrPVwidGhpcy5wYXJlbnROb2RlLnJlbW92ZSgpXCIgY2xhc3M9XCJmb3JtX19idG4tLXJlbW92ZVwiPlg8L2J1dHRvbj5cbiAgICAgICAgPC9kaXY+XG4gICAgYCk7XG59XG5cbi8vIEFkZHMgYW4gaW5wdXQgYW5kIHRleHRhcmVhIHdoZW4gdXNlciBjbGlja3MgYSBidXR0b25cbmZ1bmN0aW9uIGFkZERlc2NJbnB1dHMoX25hbWU6IHN0cmluZykge1xuICAgIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoYC5mb3JtX19pbnB1dC1hZGQtLSR7X25hbWV9YCkuaW5zZXJ0QWRqYWNlbnRIVE1MKCdiZWZvcmVlbmQnLCBgXG4gICAgICAgIDxsYWJlbD5cbiAgICAgICAgICAgIDxici8+XG4gICAgICAgICAgICA8ZGl2IGNsYXNzPVwiZmxleC1jb250YWluZXJcIj5cbiAgICAgICAgICAgICAgICA8aW5wdXQgcGxhY2Vob2xkZXI9XCJBYmlsaXR5IG5hbWVcIiBjbGFzcz1cImlucHV0LS1tZCBjcmVhdHVyZS1pbnB1dHNfXyR7X25hbWV9LW5hbWVcIj5cbiAgICAgICAgICAgICAgICA8YnV0dG9uIHR5cGU9XCJidXR0b25cIiBvbmNsaWNrPVwidGhpcy5wYXJlbnROb2RlLnBhcmVudE5vZGUucmVtb3ZlKClcIiBjbGFzcz1cImZvcm1fX2J0bi0tcmVtb3ZlXCI+WDwvYnV0dG9uPlxuICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICA8dGV4dGFyZWEgcm93cz1cIjNcIiBjb2xzPVwiNDBcIiBwbGFjZWhvbGRlcj1cImRlc2NyaXB0aW9uXCIgY2xhc3M9XCJjcmVhdHVyZS1pbnB1dHNfXyR7X25hbWV9LWRlc2NcIj48L3RleHRhcmVhPlxuICAgICAgICA8L2xhYmVsPlxuICAgIGApO1xufVxuXG5hc3luYyBmdW5jdGlvbiBzdWJtaXRDcmVhdHVyZUZvcm0oZTogRXZlbnQpIHtcbiAgICBlLnByZXZlbnREZWZhdWx0KCk7XG4gICAgbGV0IHByb2ZpY2llbmNpZXMgPSBbXTtcbiAgICBsZXQgc2Vuc2VzID0gW107XG4gICAgbGV0IGFiaWxpdGllcyA9IFtdO1xuICAgIGxldCBhY3Rpb25zID0gW107XG4gICAgbGV0IGxlZ0FjdGlvbnMgPSBbXTtcblxuICAgIGxldCBwcm9maWNpZW5jeU5hbWU6IGFueSA9IGRvY3VtZW50LmdldEVsZW1lbnRzQnlDbGFzc05hbWUoJ2NyZWF0dXJlLWlucHV0c19fcHJvZmljaWVuY3ktbmFtZScpO1xuICAgIGxldCBwcm9maWNpZW5jeVZhbHVlOiBhbnkgPSBkb2N1bWVudC5nZXRFbGVtZW50c0J5Q2xhc3NOYW1lKCdjcmVhdHVyZS1pbnB1dHNfX3Byb2ZpY2llbmN5LXZhbHVlJyk7XG4gICAgbGV0IHNlbnNlTmFtZTogYW55ID0gZG9jdW1lbnQuZ2V0RWxlbWVudHNCeUNsYXNzTmFtZSgnY3JlYXR1cmUtaW5wdXRzX19zZW5zZS1uYW1lJyk7XG4gICAgbGV0IHNlbnNlVmFsdWU6IGFueSA9IGRvY3VtZW50LmdldEVsZW1lbnRzQnlDbGFzc05hbWUoJ2NyZWF0dXJlLWlucHV0c19fc2Vuc2UtdmFsdWUnKTtcbiAgICBsZXQgYWJpbGl0eU5hbWU6IGFueSA9IGRvY3VtZW50LmdldEVsZW1lbnRzQnlDbGFzc05hbWUoJ2NyZWF0dXJlLWlucHV0c19fYWJpbGl0eS1uYW1lJyk7XG4gICAgbGV0IGFiaWxpdHlEZXNjOiBhbnkgPSBkb2N1bWVudC5nZXRFbGVtZW50c0J5Q2xhc3NOYW1lKCdjcmVhdHVyZS1pbnB1dHNfX2FiaWxpdHktZGVzYycpO1xuICAgIGxldCBhY3Rpb25OYW1lOiBhbnkgPSBkb2N1bWVudC5nZXRFbGVtZW50c0J5Q2xhc3NOYW1lKCdjcmVhdHVyZS1pbnB1dHNfX2FjdGlvbi1uYW1lJyk7XG4gICAgbGV0IGFjdGlvbkRlc2M6IGFueSA9IGRvY3VtZW50LmdldEVsZW1lbnRzQnlDbGFzc05hbWUoJ2NyZWF0dXJlLWlucHV0c19fYWN0aW9uLWRlc2MnKTtcbiAgICBsZXQgbGVnQWN0aW9uTmFtZTogYW55ID0gZG9jdW1lbnQuZ2V0RWxlbWVudHNCeUNsYXNzTmFtZSgnY3JlYXR1cmUtaW5wdXRzX19sZWctYWN0aW9uLW5hbWUnKTtcbiAgICBsZXQgbGVnQWN0aW9uRGVzYzogYW55ID0gZG9jdW1lbnQuZ2V0RWxlbWVudHNCeUNsYXNzTmFtZSgnY3JlYXR1cmUtaW5wdXRzX19sZWctYWN0aW9uLWRlc2MnKTtcblxuICAgIGZvciAobGV0IGkgPSAwOyBpIDwgcHJvZmljaWVuY3lOYW1lLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgIGlmIChwcm9maWNpZW5jeU5hbWVbaV0udmFsdWUgIT09ICcnIHx8IHByb2ZpY2llbmN5VmFsdWVbaV0udmFsdWUgIT09ICcnKSB7XG4gICAgICAgICAgICBwcm9maWNpZW5jaWVzLnB1c2goe25hbWU6IHByb2ZpY2llbmN5TmFtZVtpXS52YWx1ZSwgdmFsdWU6IHByb2ZpY2llbmN5VmFsdWVbaV0udmFsdWV9KTtcbiAgICAgICAgfVxuICAgIH1cbiAgICBmb3IgKGxldCBpID0gMDsgaSA8IHNlbnNlTmFtZS5sZW5ndGg7IGkrKykge1xuICAgICAgICBpZiAoc2Vuc2VOYW1lW2ldLnZhbHVlICE9PSAnJyB8fCBzZW5zZVZhbHVlW2ldLnZhbHVlICE9PSAnJykge1xuICAgICAgICAgICAgc2Vuc2VzLnB1c2goe25hbWU6IHNlbnNlTmFtZVtpXS52YWx1ZSwgdmFsdWU6IHNlbnNlVmFsdWVbaV0udmFsdWV9KTtcbiAgICAgICAgfVxuICAgIH1cbiAgICBmb3IgKGxldCBpID0gMDsgaSA8IGFiaWxpdHlOYW1lLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgIGlmIChhYmlsaXR5TmFtZVtpXS52YWx1ZSAhPT0gJycgfHwgYWJpbGl0eURlc2NbaV0udmFsdWUgIT09ICcnKSB7XG4gICAgICAgICAgICBhYmlsaXRpZXMucHVzaCh7bmFtZTogYWJpbGl0eU5hbWVbaV0udmFsdWUsIGRlc2M6IGFiaWxpdHlEZXNjW2ldLnZhbHVlfSk7XG4gICAgICAgIH1cbiAgICB9XG4gICAgZm9yIChsZXQgaSA9IDA7IGkgPCBhY3Rpb25OYW1lLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgIGlmIChhY3Rpb25OYW1lW2ldLnZhbHVlICE9PSAnJyB8fCBhY3Rpb25EZXNjW2ldLnZhbHVlICE9PSAnJykge1xuICAgICAgICAgICAgYWN0aW9ucy5wdXNoKHtuYW1lOiBhY3Rpb25OYW1lW2ldLnZhbHVlLCBkZXNjOiBhY3Rpb25EZXNjW2ldLnZhbHVlfSk7XG4gICAgICAgIH1cbiAgICB9XG4gICAgZm9yIChsZXQgaSA9IDA7IGkgPCBsZWdBY3Rpb25OYW1lLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgIGlmIChsZWdBY3Rpb25OYW1lW2ldLnZhbHVlICE9PSAnJyB8fCBsZWdBY3Rpb25EZXNjW2ldLnZhbHVlICE9PSAnJykge1xuICAgICAgICAgICAgbGVnQWN0aW9ucy5wdXNoKHtuYW1lOiBsZWdBY3Rpb25OYW1lW2ldLnZhbHVlLCBkZXNjOiBsZWdBY3Rpb25EZXNjW2ldLnZhbHVlfSk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICB0b2dnbGVOZXdDcmVhdHVyZUZvcm0oKTtcbiAgICB0b2dnbGVOZXdDcmVhdHVyZUZvcm0oKTtcbiAgICBpZiAoY3JlYXR1cmVzT3Blbikge1xuICAgICAgICB0b2dnbGVDcmVhdHVyZXNXaW5kb3coKTtcbiAgICAgICAgc2V0VGltZW91dChmdW5jdGlvbigpIHsgdG9nZ2xlQ3JlYXR1cmVzV2luZG93KCk7IH0sIDEwMCk7XG4gICAgfVxuXG4gICAgY29uc3QgbmV3Q3JlYXR1cmUgPSBuZXcgQ3JlYXR1cmVGb3JtRGF0YShpbmRleENvbnZlcnRlcihjcmVhdHVyZUZvcm1OYW1lKSwgJ2h0dHBzOi8vd3d3LmRhbmR3aWtpLmNvbS93L2ltYWdlcy8zLzM3L0JyZWFkU3Bhd24uanBnJywgY3JlYXR1cmVGb3JtTmFtZSwgY3JlYXR1cmVGb3JtU2l6ZSwgY3JlYXR1cmVGb3JtVHlwZSwgY3JlYXR1cmVGb3JtQWxpZ25tZW50LCBjcmVhdHVyZUZvcm1BYywgY3JlYXR1cmVGb3JtSGl0UG9pbnRzLCBjcmVhdHVyZUZvcm1IaXREaWNlLCBjcmVhdHVyZUZvcm1TdHIsIGNyZWF0dXJlRm9ybURleCwgY3JlYXR1cmVGb3JtQ29uLCBjcmVhdHVyZUZvcm1JbnQsIGNyZWF0dXJlRm9ybVdpcywgY3JlYXR1cmVGb3JtQ2hhciwgY3JlYXR1cmVGb3JtVnVsLCBjcmVhdHVyZUZvcm1SZXMsIGNyZWF0dXJlRm9ybURtZ0ltbXVuZSwgY3JlYXR1cmVGb3JtQ29uSW1tdW5lLCBjcmVhdHVyZUZvcm1MYW5ndWFnZXMsIGNyZWF0dXJlRm9ybUNyLCBjcmVhdHVyZUZvcm1YcCwgY3JlYXR1cmVGb3JtV2FsaywgY3JlYXR1cmVGb3JtU3dpbSwgY3JlYXR1cmVGb3JtQnVycm93LCBjcmVhdHVyZUZvcm1GbHksIGNyZWF0dXJlRm9ybUNsaW1iLCBwcm9maWNpZW5jaWVzLCBzZW5zZXMsIGFiaWxpdGllcywgYWN0aW9ucywgbGVnQWN0aW9ucyk7XG4gICAgYWRkQ3JlYXR1cmUobmV3Q3JlYXR1cmUpO1xufVxuXG4vLyBIb2xkcyBjcmVhdHVyZSBmb3JtIGRhdGFcbmNsYXNzIENyZWF0dXJlRm9ybURhdGEge1xuICAgIGluZGV4OiBzdHJpbmc7XG4gICAgaW1hZ2U6IHN0cmluZztcbiAgICBuYW1lOiBzdHJpbmc7XG4gICAgc2l6ZTogc3RyaW5nO1xuICAgIHR5cGU6IHN0cmluZztcbiAgICBhbGlnbm1lbnQ6IHN0cmluZztcbiAgICBhYzogbnVtYmVyO1xuICAgIGhwOiBudW1iZXI7XG4gICAgaGl0RGljZTogc3RyaW5nO1xuICAgIHN0cjogbnVtYmVyO1xuICAgIGRleDogbnVtYmVyO1xuICAgIGNvbjogbnVtYmVyO1xuICAgIGludDogbnVtYmVyO1xuICAgIHdpczogbnVtYmVyO1xuICAgIGNoYXI6IG51bWJlcjtcbiAgICB2dWw6IHN0cmluZztcbiAgICByZXM6IHN0cmluZztcbiAgICBkbWdJbW11bmU6IHN0cmluZztcbiAgICBjb25JbW11bmU6IHN0cmluZztcbiAgICBsYW5ndWFnZXM6IHN0cmluZztcbiAgICBjcjogbnVtYmVyO1xuICAgIHhwOiBudW1iZXI7XG4gICAgc3BlZWRzOiBhbnk7XG4gICAgcHJvZmljaWVuY2llczogYW55O1xuICAgIHNlbnNlczogYW55O1xuICAgIGFiaWxpdGllczogYW55O1xuICAgIGFjdGlvbnM6IGFueTtcbiAgICBsZWdBY3Rpb25zOiBhbnk7XG4gICAgd2FsazogbnVtYmVyO1xuICAgIHN3aW06IG51bWJlcjtcbiAgICBidXJyb3c6IG51bWJlcjtcbiAgICBmbHk6IG51bWJlcjtcbiAgICBjbGltYjogbnVtYmVyO1xuXG4gICAgY29uc3RydWN0b3IoaW5kZXg6IHN0cmluZywgaW1hZ2U6IHN0cmluZywgbmFtZTogc3RyaW5nLCBzaXplOiBzdHJpbmcsIHR5cGU6IHN0cmluZywgYWxpZ25tZW50OiBzdHJpbmcsIGFjOiBudW1iZXIsIGhwOiBudW1iZXIsIGhpdERpY2U6IHN0cmluZywgc3RyOiBudW1iZXIsIGRleDogbnVtYmVyLCBjb246IG51bWJlciwgaW50OiBudW1iZXIsIHdpczogbnVtYmVyLCBjaGFyOiBudW1iZXIsIHZ1bDogc3RyaW5nLCByZXM6IHN0cmluZywgZG1nSW1tdW5lOiBzdHJpbmcsIGNvbkltbXVuZTogc3RyaW5nLCBsYW5ndWFnZXM6IHN0cmluZywgY3I6IG51bWJlciwgeHA6IG51bWJlciwgd2FsazogbnVtYmVyLCBzd2ltOiBudW1iZXIsIGJ1cnJvdzogbnVtYmVyLCBmbHk6IG51bWJlciwgY2xpbWI6IG51bWJlciwgcHJvZmljaWVuY2llczogYW55LCBzZW5zZXM6IGFueSwgYWJpbGl0aWVzOiBhbnksIGFjdGlvbnM6IGFueSwgbGVnQWN0aW9uczogYW55KSB7XG4gICAgICAgIHRoaXMuaW5kZXggPSBpbmRleDtcbiAgICAgICAgdGhpcy5pbWFnZSA9IGltYWdlOyAgICAgICAgXG4gICAgICAgIHRoaXMubmFtZSA9IG5hbWU7XG4gICAgICAgIHRoaXMuc2l6ZSA9IHNpemU7XG4gICAgICAgIHRoaXMudHlwZSA9IHR5cGU7XG4gICAgICAgIHRoaXMuYWxpZ25tZW50ID0gYWxpZ25tZW50O1xuICAgICAgICBhYyB8fCBhYyA9PT0gMCA/IHRoaXMuYWMgPSBhYyA6IHRoaXMuYWMgPSAwO1xuICAgICAgICBocCB8fCBocCA9PT0gMCA/IHRoaXMuaHAgPSBocCA6IHRoaXMuaHAgPSAwO1xuICAgICAgICB0aGlzLmhpdERpY2UgPSBoaXREaWNlO1xuICAgICAgICBzdHIgfHwgc3RyID09PSAwID8gdGhpcy5zdHIgPSBzdHIgOiB0aGlzLnN0ciA9IDEwO1xuICAgICAgICBkZXggfHwgZGV4ID09PSAwID8gdGhpcy5kZXggPSBkZXggOiB0aGlzLmRleCA9IDEwO1xuICAgICAgICBjb24gfHwgY29uID09PSAwID8gdGhpcy5jb24gPSBjb24gOiB0aGlzLmNvbiA9IDEwO1xuICAgICAgICBpbnQgfHwgaW50ID09PSAwID8gdGhpcy5pbnQgPSBpbnQgOiB0aGlzLmludCA9IDEwO1xuICAgICAgICB3aXMgfHwgd2lzID09PSAwID8gdGhpcy53aXMgPSB3aXMgOiB0aGlzLndpcyA9IDEwO1xuICAgICAgICBjaGFyIHx8IGNoYXIgPT09IDAgPyB0aGlzLmNoYXIgPSBjaGFyIDogdGhpcy5jaGFyID0gMTA7XG4gICAgICAgIHRoaXMudnVsID0gdnVsO1xuICAgICAgICB0aGlzLnJlcyA9IHJlcztcbiAgICAgICAgdGhpcy5kbWdJbW11bmUgPSBkbWdJbW11bmU7XG4gICAgICAgIHRoaXMuY29uSW1tdW5lID0gY29uSW1tdW5lO1xuICAgICAgICB0aGlzLmxhbmd1YWdlcyA9IGxhbmd1YWdlcztcbiAgICAgICAgdGhpcy5jciA9IGNyO1xuICAgICAgICB0aGlzLnhwID0geHA7XG4gICAgICAgIHRoaXMud2FsayA9IHdhbGs7XG4gICAgICAgIHRoaXMuc3dpbSA9IHN3aW07XG4gICAgICAgIHRoaXMuZmx5ID0gZmx5O1xuICAgICAgICB0aGlzLmJ1cnJvdyA9IGJ1cnJvdztcbiAgICAgICAgdGhpcy5jbGltYiA9IGNsaW1iO1xuICAgICAgICB0aGlzLnByb2ZpY2llbmNpZXMgPSBwcm9maWNpZW5jaWVzO1xuICAgICAgICB0aGlzLnNlbnNlcyA9IHNlbnNlcztcbiAgICAgICAgdGhpcy5hYmlsaXRpZXMgPSBhYmlsaXRpZXM7XG4gICAgICAgIHRoaXMuYWN0aW9ucyA9IGFjdGlvbnM7XG4gICAgICAgIHRoaXMubGVnQWN0aW9ucyA9IGxlZ0FjdGlvbnM7XG4gICAgfVxufSIsICJpbXBvcnQgeyBnZXRHYW1lcywgZ2V0UHJldkdhbWUsIGFkZFByZXZHYW1lLCBhZGRHYW1lIH0gZnJvbSBcIi4vcm91dGVzL2Rhc2hib2FyZC5yb3V0ZS5qc1wiO1xuaW1wb3J0IHsgZ2V0Q3JlYXR1cmVzIH0gZnJvbSBcIi4vcm91dGVzL2NyZWF0dXJlcy5yb3V0ZS5qc1wiO1xuaW1wb3J0IHsgZ2FtZVBhZ2VMb2FkZWQgfSBmcm9tIFwiLi9ncmlkLmpzXCI7XG5pbXBvcnQgeyBpbywgU29ja2V0IH0gZnJvbSBcInNvY2tldC5pby1jbGllbnRcIjtcbmltcG9ydCB7IGxvZ291dCwgbG9naW5Vc2VyIH0gZnJvbSBcIi4vcm91dGVzL3VzZXJzLnJvdXRlLmpzXCI7XG5cbmNvbnN0IHNvY2tldDogU29ja2V0ID0gaW8oKTtcbmV4cG9ydCBsZXQgZ2FtZXNMaXN0OiBhbnkgPSB7IHZhbHVlOiBbXSB9O1xubGV0IGdhbWVGb3JtT3BlbjogYm9vbGVhbiA9IGZhbHNlO1xubGV0IGdhbWVOYW1lSW5wdXQ6IHN0cmluZztcbmV4cG9ydCBsZXQgY2xpZW50OiBhbnk7XG5leHBvcnQgbGV0IHJvb206IGFueTtcbmxldCBwcmV2R2FtZTogYW55O1xubGV0IHJvb21Db2RlOiBzdHJpbmc7XG5sZXQgdXNlcm5hbWU6IHN0cmluZywgcGFzc3dvcmQ6IHN0cmluZztcblxuXG5leHBvcnQgYXN5bmMgZnVuY3Rpb24gc2V0dXBHYW1lKCkge1xuICAgIGdldEdhbWVzKCk7XG4gICAgcHJldkdhbWUgPSBhd2FpdCBnZXRQcmV2R2FtZSgpO1xuICAgIHJvb21Db2RlID0gcHJldkdhbWUuY29kZTtcbiAgICAoPEhUTUxJbnB1dEVsZW1lbnQ+ZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ3Jvb20tY29kZS1pbnB1dCcpKS52YWx1ZSA9IHByZXZHYW1lLmNvZGU7XG4gICAgLy8gR2V0IEQmRCBhcGkgZGF0YVxuICAgIGdldENyZWF0dXJlcygpO1xufVxuXG5mdW5jdGlvbiBqb2luUGxheWVyKHJvb21Db2RlOiBzdHJpbmcsIGU6IEV2ZW50KSB7XG4gICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xuICAgIHJvb20gPSByb29tQ29kZTtcblxuICAgIHNvY2tldC5lbWl0KCdKT0lOX1JPT00nLCAncGxheWVyJywgcm9vbUNvZGUsIChyb29tRXhpc3RzLCBuZXdDbGllbnQpID0+IHtcbiAgICAgICAgaWYgKHJvb21FeGlzdHMpIHtcbiAgICAgICAgICAgIGNsaWVudCA9IG5ld0NsaWVudDtcbiAgICAgICAgICAgIGdhbWVTY3JlZW4oKTtcbiAgICAgICAgICAgIGFkZFByZXZHYW1lKHtnYW1lOiByb29tQ29kZX0pO1xuICAgICAgICAgICAgc29ja2V0LmVtaXQoJ0ZFVENIX0JPQVJEJyk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBjb25zb2xlLmxvZygncm9vbSBkb2VzblxcJ3QgZXhpc3QnKTtcbiAgICAgICAgfVxuICAgIH0pO1xufVxuXG4vLyBEZXRlY3RzIGlmIHVzZXIgaGFzIGNsaWNrZWQgdGhlIGpvaW4gcm9vbSBidXR0b24sIHRvIGpvaW4gYXMgYSBwbGF5ZXJcbmRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdqb2luLXBsYXllci1idG4nKS5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIChlOiBhbnkpID0+IHtcbiAgICBlLnByZXZlbnREZWZhdWx0KCk7XG4gICAgam9pblBsYXllcihyb29tQ29kZSwgZSk7XG59KTtcblxuZnVuY3Rpb24gam9pbkRNKHJvb21Db2RlOiBzdHJpbmcpIHtcbiAgICByb29tID0gcm9vbUNvZGU7XG4gICAgc29ja2V0LmVtaXQoJ0pPSU5fUk9PTScsICdkbScsIHJvb21Db2RlLCAocm9vbUV4aXN0czogYm9vbGVhbiwgbmV3Q2xpZW50OiBhbnkpID0+IHtcbiAgICAgICAgaWYgKHJvb21FeGlzdHMpIHtcbiAgICAgICAgICAgIGNsaWVudCA9IG5ld0NsaWVudDtcbiAgICAgICAgICAgIGdhbWVTY3JlZW4oKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKCdnYW1lIGFscmVhZHkgc3RhcnRlZCcpO1xuICAgICAgICB9XG4gICAgfSk7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBzZXRHYW1lc0xpc3QoKSB7XG4gICAgZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLmdhbWVzLWxpc3RfX2NvbnRlbnQnKS5yZW1vdmUoKTtcblxuICAgIGNvbnN0IGxpc3RDb250ZW50ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLmdhbWVzLWxpc3QnKS5hcHBlbmRDaGlsZChkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKSk7XG4gICAgbGlzdENvbnRlbnQuY2xhc3NMaXN0LmFkZCgnZ2FtZXMtbGlzdF9fY29udGVudCcpO1xuXG4gICAgY29uc3QgZ2FtZXNMaXN0RWwgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcuZ2FtZXMtbGlzdF9fY29udGVudCcpO1xuICAgIGZvciAobGV0IGdhbWUgb2YgZ2FtZXNMaXN0LnZhbHVlKSB7XG4gICAgICAgIGdhbWVzTGlzdEVsLmluc2VydEFkamFjZW50SFRNTCgnYmVmb3JlZW5kJywgYFxuICAgICAgICAgICAgPGJ1dHRvbiBjbGFzcz1cImdhbWUtbGlzdF9faXRlbVwiIHJvb20tY29kZT0nJHtnYW1lLmNvZGV9Jz4ke2dhbWUubmFtZX08L2J1dHRvbj5cbiAgICAgICAgYCk7XG4gICAgfVxuXG4gICAgZ2FtZXNMaXN0RWwuaW5zZXJ0QWRqYWNlbnRIVE1MKCdiZWZvcmVlbmQnLCBgXG4gICAgICAgIDxidXR0b24gY2xhc3M9XCJnYW1lcy1saXN0X19idXR0b24gYnRuLS1ob3ZlclwiIGlkPVwiY3JlYXRlLWNhbXBhaWduLWJ0blwiPkNyZWF0ZSBDYW1wYWlnbjwvYnV0dG9uPlxuICAgIGApOyAgICBcbn1cblxuLy8gRGV0ZWN0cyBpZiB1c2VyIGhhcyBjbGlja2VkIG9uIGEgYnV0dG9uXG5kb2N1bWVudC5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIChlOiBhbnkpID0+IHtcbiAgICBlLnByZXZlbnREZWZhdWx0KCk7XG4gICAgY29uc3QgdGFyZ2V0ID0gZS50YXJnZXQ7XG4gICAgaWYgKHRhcmdldC5tYXRjaGVzKCcjY3JlYXRlLWNhbXBhaWduLWJ0bicpKSB7XG4gICAgICAgIGFkZEdhbWVGb3JtKCk7XG4gICAgfSBlbHNlIGlmICh0YXJnZXQubWF0Y2hlcygnLmdhbWUtbGlzdF9faXRlbScpKSB7XG4gICAgICAgIGpvaW5ETSh0YXJnZXQuZ2V0QXR0cmlidXRlKCdyb29tLWNvZGUnKSk7XG4gICAgfSBlbHNlIGlmICh0YXJnZXQubWF0Y2hlcygnI2FkZC1nYW1lLWJ0bicpKSB7XG4gICAgICAgIGFkZEdhbWUoe25hbWU6IGdhbWVOYW1lSW5wdXR9KTtcbiAgICB9IGVsc2UgaWYgKHRhcmdldC5tYXRjaGVzKCcjbG9nb3V0LWJ0bi1kYXNoYm9hcmQnKSkge1xuICAgICAgICBsb2dvdXQoKTtcbiAgICB9IGVsc2UgaWYgKHRhcmdldC5tYXRjaGVzKCcjbG9naW4tYnRuJykpIHtcbiAgICAgICAgbG9naW5Vc2VyKHt1c2VybmFtZTogKDxIVE1MSW5wdXRFbGVtZW50PmRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdsb2dpbi11c2VybmFtZScpKS52YWx1ZSwgcGFzc3dvcmQ6ICg8SFRNTElucHV0RWxlbWVudD5kb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnbG9naW4tcGFzc3dvcmQnKSkudmFsdWV9KTtcbiAgICB9XG59KTtcblxuZnVuY3Rpb24gYWRkR2FtZUZvcm0oKSB7XG4gICAgZ2FtZUZvcm1PcGVuID0gIWdhbWVGb3JtT3BlbjtcbiAgICBpZiAoZ2FtZUZvcm1PcGVuKSB7XG4gICAgICAgIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5nYW1lcy1saXN0X19jb250ZW50JykuaW5zZXJ0QWRqYWNlbnRIVE1MKCdiZWZvcmVlbmQnLCBgXG4gICAgICAgICAgICA8Zm9ybSBjbGFzcz1cImZvcm0tLWFkZC1nYW1lXCI+XG4gICAgICAgICAgICAgICAgPGlucHV0IHBsYWNlaG9sZGVyPVwibmFtZVwiIG9uY2hhbmdlPVwiZ2FtZU5hbWVJbnB1dCA9IGV2ZW50LnRhcmdldC52YWx1ZVwiIHJlcXVpcmVkPlxuICAgICAgICAgICAgICAgIDxidXR0b24gY2xhc3M9XCJidXR0b24tLXN1Ym1pdCBidG4tLWhvdmVyXCIgaWQ9XCJhZGQtZ2FtZS1idG5cIiB0eXBlPVwic3VibWl0XCI+U3VibWl0PC9idXR0b24+XG4gICAgICAgICAgICA8L2Zvcm0+XG4gICAgICAgIGApO1xuICAgIH0gZWxzZSB7XG4gICAgICAgIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5mb3JtLS1hZGQtZ2FtZScpLnJlbW92ZSgpO1xuICAgIH1cbn1cblxuZnVuY3Rpb24gZ2FtZVNjcmVlbigpIHtcbiAgICBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcuZGFzaGJvYXJkLXBhZ2UtY29udGFpbmVyJykucmVtb3ZlKCk7XG4gICAgZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLnBhZ2UtY29udGFpbmVyJykuaW5zZXJ0QWRqYWNlbnRIVE1MKCdiZWZvcmVlbmQnLCBgXG4gICAgICAgIDxzZWN0aW9uIGNsYXNzPVwiZ2FtZS1wYWdlLWNvbnRhaW5lclwiPlxuICAgICAgICAgICAgPGRpdiBjbGFzcz1cInNpZGViYXJcIj48L2Rpdj5cbiAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJnYW1lLWNvbnRlbnRcIj5cbiAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzPVwidG9vbGJhclwiPlxuICAgICAgICAgICAgICAgICAgICA8YnV0dG9uIGNsYXNzPVwidG9vbGJhcl9fYnRuXCIgb25jbGljaz1cInpvb21JbigpXCI+KzwvYnV0dG9uPlxuICAgICAgICAgICAgICAgICAgICA8YnV0dG9uIGNsYXNzPVwidG9vbGJhcl9fYnRuXCIgb25jbGljaz1cInpvb21PdXQoKVwiPi08L2J1dHRvbj5cbiAgICAgICAgICAgICAgICAgICAgPGJ1dHRvbiBjbGFzcz1cInRvb2xiYXJfX2J0blwiIG9uY2xpY2s9XCJ0b2dnbGVQbGF5ZXJMaXN0KClcIj5TaG93IFBsYXllcnM8L2J1dHRvbj5cbiAgICAgICAgICAgICAgICAgICAgPHAgY2xhc3M9XCJ0b29sYmFyX190ZXh0XCI+Um9vbTogJHtyb29tfTwvcD5cbiAgICAgICAgICAgICAgICAgICAgPGEgY2xhc3M9XCJ0b29sYmFyX19sZWF2ZS1idG5cIiBvbmNsaWNrPVwibGVhdmVSb29tKClcIj5MZWF2ZSBHYW1lPC9hPlxuICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJncmlkLWNvbnRhaW5lclwiPlxuICAgICAgICAgICAgICAgICAgICA8dGFibGUgaWQ9XCJncmlkXCI+PC90YWJsZT5cbiAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICA8L3NlY3Rpb24+XG4gICAgYCk7XG4gICAgZ2FtZVBhZ2VMb2FkZWQoKTtcbn1cblxuZnVuY3Rpb24gbGVhdmVSb29tKCkge1xuICAgIHNvY2tldC5lbWl0KCdVU0VSX0RJU0NPTk5FQ1QnLCByb29tLCBzb2NrZXQuaWQpO1xuICAgIHNvY2tldC5kaXNjb25uZWN0KCk7XG4gICAgbG9jYXRpb24ucmVsb2FkKCk7XG59XG4iLCAiaW1wb3J0IHsgaW8sIFNvY2tldCB9IGZyb20gXCJzb2NrZXQuaW8tY2xpZW50XCI7XG5pbXBvcnQgeyBzZXR1cEdhbWUgfSBmcm9tICcuL3NjcmlwdHMvZGFzaGJvYXJkLmpzJztcblxuXG5jb25zdCBzb2NrZXQ6IFNvY2tldCA9IGlvKCk7XG5cbmRvY3VtZW50LmFkZEV2ZW50TGlzdGVuZXIoJ0RPTUNvbnRlbnRMb2FkZWQnLCAoKSA9PiB7XG4gICAgc2V0dXBHYW1lKCk7XG59KTsiXSwKICAibWFwcGluZ3MiOiAiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUFBO0FBQUE7QUFBQTtBQUVBLFdBQU8sVUFBVSxTQUFTLEtBQUssSUFBSSxTQUFTO0FBQzFDLGFBQU8sU0FBUyxPQUFPO0FBQ3JCLFlBQUksT0FBTyxJQUFJLE1BQU0sVUFBVSxNQUFNO0FBQ3JDLGlCQUFTQSxLQUFJLEdBQUdBLEtBQUksS0FBSyxRQUFRQSxNQUFLO0FBQ3BDLGVBQUtBLE1BQUssVUFBVUE7QUFBQSxRQUN0QjtBQUNBLGVBQU8sR0FBRyxNQUFNLFNBQVMsSUFBSTtBQUFBLE1BQy9CO0FBQUEsSUFDRjtBQUFBO0FBQUE7OztBQ1ZBO0FBQUE7QUFBQTtBQUVBLFFBQUksT0FBTztBQUlYLFFBQUlDLFlBQVcsT0FBTyxVQUFVO0FBR2hDLFFBQUksU0FBVSxTQUFTQyxRQUFPO0FBRTVCLGFBQU8sU0FBUyxPQUFPO0FBQ3JCLFlBQUksTUFBTUQsVUFBUyxLQUFLLEtBQUs7QUFDN0IsZUFBT0MsT0FBTSxTQUFTQSxPQUFNLE9BQU8sSUFBSSxNQUFNLEdBQUcsRUFBRSxFQUFFLFlBQVk7QUFBQSxNQUNsRTtBQUFBLElBQ0YsRUFBRyx1QkFBTyxPQUFPLElBQUksQ0FBQztBQUV0QixhQUFTLFdBQVcsTUFBTTtBQUN4QixhQUFPLEtBQUssWUFBWTtBQUN4QixhQUFPLFNBQVMsU0FBUyxPQUFPO0FBQzlCLGVBQU8sT0FBTyxLQUFLLE1BQU07QUFBQSxNQUMzQjtBQUFBLElBQ0Y7QUFRQSxhQUFTLFFBQVEsS0FBSztBQUNwQixhQUFPLE1BQU0sUUFBUSxHQUFHO0FBQUEsSUFDMUI7QUFRQSxhQUFTLFlBQVksS0FBSztBQUN4QixhQUFPLE9BQU8sUUFBUTtBQUFBLElBQ3hCO0FBUUEsYUFBUyxTQUFTLEtBQUs7QUFDckIsYUFBTyxRQUFRLFFBQVEsQ0FBQyxZQUFZLEdBQUcsS0FBSyxJQUFJLGdCQUFnQixRQUFRLENBQUMsWUFBWSxJQUFJLFdBQVcsS0FDL0YsT0FBTyxJQUFJLFlBQVksYUFBYSxjQUFjLElBQUksWUFBWSxTQUFTLEdBQUc7QUFBQSxJQUNyRjtBQVNBLFFBQUksZ0JBQWdCLFdBQVcsYUFBYTtBQVM1QyxhQUFTLGtCQUFrQixLQUFLO0FBQzlCLFVBQUk7QUFDSixVQUFLLE9BQU8sZ0JBQWdCLGVBQWlCLFlBQVksUUFBUztBQUNoRSxpQkFBUyxZQUFZLE9BQU8sR0FBRztBQUFBLE1BQ2pDLE9BQU87QUFDTCxpQkFBVSxPQUFTLElBQUksVUFBWSxjQUFjLElBQUksTUFBTTtBQUFBLE1BQzdEO0FBQ0EsYUFBTztBQUFBLElBQ1Q7QUFRQSxhQUFTLFNBQVMsS0FBSztBQUNyQixhQUFPLE9BQU8sUUFBUTtBQUFBLElBQ3hCO0FBUUEsYUFBUyxTQUFTLEtBQUs7QUFDckIsYUFBTyxPQUFPLFFBQVE7QUFBQSxJQUN4QjtBQVFBLGFBQVMsU0FBUyxLQUFLO0FBQ3JCLGFBQU8sUUFBUSxRQUFRLE9BQU8sUUFBUTtBQUFBLElBQ3hDO0FBUUEsYUFBUyxjQUFjLEtBQUs7QUFDMUIsVUFBSSxPQUFPLEdBQUcsTUFBTSxVQUFVO0FBQzVCLGVBQU87QUFBQSxNQUNUO0FBRUEsVUFBSSxZQUFZLE9BQU8sZUFBZSxHQUFHO0FBQ3pDLGFBQU8sY0FBYyxRQUFRLGNBQWMsT0FBTztBQUFBLElBQ3BEO0FBU0EsUUFBSSxTQUFTLFdBQVcsTUFBTTtBQVM5QixRQUFJLFNBQVMsV0FBVyxNQUFNO0FBUzlCLFFBQUksU0FBUyxXQUFXLE1BQU07QUFTOUIsUUFBSSxhQUFhLFdBQVcsVUFBVTtBQVF0QyxhQUFTLFdBQVcsS0FBSztBQUN2QixhQUFPRCxVQUFTLEtBQUssR0FBRyxNQUFNO0FBQUEsSUFDaEM7QUFRQSxhQUFTLFNBQVMsS0FBSztBQUNyQixhQUFPLFNBQVMsR0FBRyxLQUFLLFdBQVcsSUFBSSxJQUFJO0FBQUEsSUFDN0M7QUFRQSxhQUFTLFdBQVcsT0FBTztBQUN6QixVQUFJLFVBQVU7QUFDZCxhQUFPLFVBQ0osT0FBTyxhQUFhLGNBQWMsaUJBQWlCLFlBQ3BEQSxVQUFTLEtBQUssS0FBSyxNQUFNLFdBQ3hCLFdBQVcsTUFBTSxRQUFRLEtBQUssTUFBTSxTQUFTLE1BQU07QUFBQSxJQUV4RDtBQVFBLFFBQUksb0JBQW9CLFdBQVcsaUJBQWlCO0FBUXBELGFBQVMsS0FBSyxLQUFLO0FBQ2pCLGFBQU8sSUFBSSxPQUFPLElBQUksS0FBSyxJQUFJLElBQUksUUFBUSxjQUFjLEVBQUU7QUFBQSxJQUM3RDtBQWlCQSxhQUFTLHVCQUF1QjtBQUM5QixVQUFJLE9BQU8sY0FBYyxnQkFBZ0IsVUFBVSxZQUFZLGlCQUN0QixVQUFVLFlBQVksa0JBQ3RCLFVBQVUsWUFBWSxPQUFPO0FBQ3BFLGVBQU87QUFBQSxNQUNUO0FBQ0EsYUFDRSxPQUFPLFdBQVcsZUFDbEIsT0FBTyxhQUFhO0FBQUEsSUFFeEI7QUFjQSxhQUFTLFFBQVEsS0FBSyxJQUFJO0FBRXhCLFVBQUksUUFBUSxRQUFRLE9BQU8sUUFBUSxhQUFhO0FBQzlDO0FBQUEsTUFDRjtBQUdBLFVBQUksT0FBTyxRQUFRLFVBQVU7QUFFM0IsY0FBTSxDQUFDLEdBQUc7QUFBQSxNQUNaO0FBRUEsVUFBSSxRQUFRLEdBQUcsR0FBRztBQUVoQixpQkFBU0UsS0FBSSxHQUFHLElBQUksSUFBSSxRQUFRQSxLQUFJLEdBQUdBLE1BQUs7QUFDMUMsYUFBRyxLQUFLLE1BQU0sSUFBSUEsS0FBSUEsSUFBRyxHQUFHO0FBQUEsUUFDOUI7QUFBQSxNQUNGLE9BQU87QUFFTCxpQkFBUyxPQUFPLEtBQUs7QUFDbkIsY0FBSSxPQUFPLFVBQVUsZUFBZSxLQUFLLEtBQUssR0FBRyxHQUFHO0FBQ2xELGVBQUcsS0FBSyxNQUFNLElBQUksTUFBTSxLQUFLLEdBQUc7QUFBQSxVQUNsQztBQUFBLFFBQ0Y7QUFBQSxNQUNGO0FBQUEsSUFDRjtBQW1CQSxhQUFTLFFBQW1DO0FBQzFDLFVBQUksU0FBUyxDQUFDO0FBQ2QsZUFBUyxZQUFZLEtBQUssS0FBSztBQUM3QixZQUFJLGNBQWMsT0FBTyxJQUFJLEtBQUssY0FBYyxHQUFHLEdBQUc7QUFDcEQsaUJBQU8sT0FBTyxNQUFNLE9BQU8sTUFBTSxHQUFHO0FBQUEsUUFDdEMsV0FBVyxjQUFjLEdBQUcsR0FBRztBQUM3QixpQkFBTyxPQUFPLE1BQU0sQ0FBQyxHQUFHLEdBQUc7QUFBQSxRQUM3QixXQUFXLFFBQVEsR0FBRyxHQUFHO0FBQ3ZCLGlCQUFPLE9BQU8sSUFBSSxNQUFNO0FBQUEsUUFDMUIsT0FBTztBQUNMLGlCQUFPLE9BQU87QUFBQSxRQUNoQjtBQUFBLE1BQ0Y7QUFFQSxlQUFTQSxLQUFJLEdBQUcsSUFBSSxVQUFVLFFBQVFBLEtBQUksR0FBR0EsTUFBSztBQUNoRCxnQkFBUSxVQUFVQSxLQUFJLFdBQVc7QUFBQSxNQUNuQztBQUNBLGFBQU87QUFBQSxJQUNUO0FBVUEsYUFBUyxPQUFPLEdBQUcsR0FBRyxTQUFTO0FBQzdCLGNBQVEsR0FBRyxTQUFTLFlBQVksS0FBSyxLQUFLO0FBQ3hDLFlBQUksV0FBVyxPQUFPLFFBQVEsWUFBWTtBQUN4QyxZQUFFLE9BQU8sS0FBSyxLQUFLLE9BQU87QUFBQSxRQUM1QixPQUFPO0FBQ0wsWUFBRSxPQUFPO0FBQUEsUUFDWDtBQUFBLE1BQ0YsQ0FBQztBQUNELGFBQU87QUFBQSxJQUNUO0FBUUEsYUFBUyxTQUFTLFNBQVM7QUFDekIsVUFBSSxRQUFRLFdBQVcsQ0FBQyxNQUFNLE9BQVE7QUFDcEMsa0JBQVUsUUFBUSxNQUFNLENBQUM7QUFBQSxNQUMzQjtBQUNBLGFBQU87QUFBQSxJQUNUO0FBVUEsYUFBUyxTQUFTLGFBQWEsa0JBQWtCLE9BQU8sYUFBYTtBQUNuRSxrQkFBWSxZQUFZLE9BQU8sT0FBTyxpQkFBaUIsV0FBVyxXQUFXO0FBQzdFLGtCQUFZLFVBQVUsY0FBYztBQUNwQyxlQUFTLE9BQU8sT0FBTyxZQUFZLFdBQVcsS0FBSztBQUFBLElBQ3JEO0FBVUEsYUFBUyxhQUFhLFdBQVcsU0FBUyxRQUFRO0FBQ2hELFVBQUk7QUFDSixVQUFJQTtBQUNKLFVBQUk7QUFDSixVQUFJLFNBQVMsQ0FBQztBQUVkLGdCQUFVLFdBQVcsQ0FBQztBQUV0QixTQUFHO0FBQ0QsZ0JBQVEsT0FBTyxvQkFBb0IsU0FBUztBQUM1QyxRQUFBQSxLQUFJLE1BQU07QUFDVixlQUFPQSxPQUFNLEdBQUc7QUFDZCxpQkFBTyxNQUFNQTtBQUNiLGNBQUksQ0FBQyxPQUFPLE9BQU87QUFDakIsb0JBQVEsUUFBUSxVQUFVO0FBQzFCLG1CQUFPLFFBQVE7QUFBQSxVQUNqQjtBQUFBLFFBQ0Y7QUFDQSxvQkFBWSxPQUFPLGVBQWUsU0FBUztBQUFBLE1BQzdDLFNBQVMsY0FBYyxDQUFDLFVBQVUsT0FBTyxXQUFXLE9BQU8sTUFBTSxjQUFjLE9BQU87QUFFdEYsYUFBTztBQUFBLElBQ1Q7QUFTQSxhQUFTLFNBQVMsS0FBSyxjQUFjLFVBQVU7QUFDN0MsWUFBTSxPQUFPLEdBQUc7QUFDaEIsVUFBSSxhQUFhLFVBQWEsV0FBVyxJQUFJLFFBQVE7QUFDbkQsbUJBQVcsSUFBSTtBQUFBLE1BQ2pCO0FBQ0Esa0JBQVksYUFBYTtBQUN6QixVQUFJLFlBQVksSUFBSSxRQUFRLGNBQWMsUUFBUTtBQUNsRCxhQUFPLGNBQWMsTUFBTSxjQUFjO0FBQUEsSUFDM0M7QUFRQSxhQUFTLFFBQVEsT0FBTztBQUN0QixVQUFJLENBQUM7QUFBTyxlQUFPO0FBQ25CLFVBQUlBLEtBQUksTUFBTTtBQUNkLFVBQUksWUFBWUEsRUFBQztBQUFHLGVBQU87QUFDM0IsVUFBSSxNQUFNLElBQUksTUFBTUEsRUFBQztBQUNyQixhQUFPQSxPQUFNLEdBQUc7QUFDZCxZQUFJQSxNQUFLLE1BQU1BO0FBQUEsTUFDakI7QUFDQSxhQUFPO0FBQUEsSUFDVDtBQUdBLFFBQUksZUFBZ0IsU0FBUyxZQUFZO0FBRXZDLGFBQU8sU0FBUyxPQUFPO0FBQ3JCLGVBQU8sY0FBYyxpQkFBaUI7QUFBQSxNQUN4QztBQUFBLElBQ0YsRUFBRyxPQUFPLGVBQWUsZUFBZSxPQUFPLGVBQWUsVUFBVSxDQUFDO0FBRXpFLFdBQU8sVUFBVTtBQUFBLE1BQ2Y7QUFBQSxNQUNBO0FBQUEsTUFDQTtBQUFBLE1BQ0E7QUFBQSxNQUNBO0FBQUEsTUFDQTtBQUFBLE1BQ0E7QUFBQSxNQUNBO0FBQUEsTUFDQTtBQUFBLE1BQ0E7QUFBQSxNQUNBO0FBQUEsTUFDQTtBQUFBLE1BQ0E7QUFBQSxNQUNBO0FBQUEsTUFDQTtBQUFBLE1BQ0E7QUFBQSxNQUNBO0FBQUEsTUFDQTtBQUFBLE1BQ0E7QUFBQSxNQUNBO0FBQUEsTUFDQTtBQUFBLE1BQ0E7QUFBQSxNQUNBO0FBQUEsTUFDQTtBQUFBLE1BQ0E7QUFBQSxNQUNBO0FBQUEsTUFDQTtBQUFBLE1BQ0E7QUFBQSxNQUNBO0FBQUEsTUFDQTtBQUFBLElBQ0Y7QUFBQTtBQUFBOzs7QUNyZEE7QUFBQTtBQUFBO0FBRUEsUUFBSSxRQUFRO0FBRVosYUFBU0MsUUFBTyxLQUFLO0FBQ25CLGFBQU8sbUJBQW1CLEdBQUcsRUFDM0IsUUFBUSxTQUFTLEdBQUcsRUFDcEIsUUFBUSxRQUFRLEdBQUcsRUFDbkIsUUFBUSxTQUFTLEdBQUcsRUFDcEIsUUFBUSxRQUFRLEdBQUcsRUFDbkIsUUFBUSxTQUFTLEdBQUcsRUFDcEIsUUFBUSxTQUFTLEdBQUc7QUFBQSxJQUN4QjtBQVNBLFdBQU8sVUFBVSxTQUFTLFNBQVNDLE1BQUssUUFBUSxrQkFBa0I7QUFFaEUsVUFBSSxDQUFDLFFBQVE7QUFDWCxlQUFPQTtBQUFBLE1BQ1Q7QUFFQSxVQUFJO0FBQ0osVUFBSSxrQkFBa0I7QUFDcEIsMkJBQW1CLGlCQUFpQixNQUFNO0FBQUEsTUFDNUMsV0FBVyxNQUFNLGtCQUFrQixNQUFNLEdBQUc7QUFDMUMsMkJBQW1CLE9BQU8sU0FBUztBQUFBLE1BQ3JDLE9BQU87QUFDTCxZQUFJQyxTQUFRLENBQUM7QUFFYixjQUFNLFFBQVEsUUFBUSxTQUFTLFVBQVUsS0FBSyxLQUFLO0FBQ2pELGNBQUksUUFBUSxRQUFRLE9BQU8sUUFBUSxhQUFhO0FBQzlDO0FBQUEsVUFDRjtBQUVBLGNBQUksTUFBTSxRQUFRLEdBQUcsR0FBRztBQUN0QixrQkFBTSxNQUFNO0FBQUEsVUFDZCxPQUFPO0FBQ0wsa0JBQU0sQ0FBQyxHQUFHO0FBQUEsVUFDWjtBQUVBLGdCQUFNLFFBQVEsS0FBSyxTQUFTLFdBQVcsR0FBRztBQUN4QyxnQkFBSSxNQUFNLE9BQU8sQ0FBQyxHQUFHO0FBQ25CLGtCQUFJLEVBQUUsWUFBWTtBQUFBLFlBQ3BCLFdBQVcsTUFBTSxTQUFTLENBQUMsR0FBRztBQUM1QixrQkFBSSxLQUFLLFVBQVUsQ0FBQztBQUFBLFlBQ3RCO0FBQ0EsWUFBQUEsT0FBTSxLQUFLRixRQUFPLEdBQUcsSUFBSSxNQUFNQSxRQUFPLENBQUMsQ0FBQztBQUFBLFVBQzFDLENBQUM7QUFBQSxRQUNILENBQUM7QUFFRCwyQkFBbUJFLE9BQU0sS0FBSyxHQUFHO0FBQUEsTUFDbkM7QUFFQSxVQUFJLGtCQUFrQjtBQUNwQixZQUFJLGdCQUFnQkQsS0FBSSxRQUFRLEdBQUc7QUFDbkMsWUFBSSxrQkFBa0IsSUFBSTtBQUN4QixVQUFBQSxPQUFNQSxLQUFJLE1BQU0sR0FBRyxhQUFhO0FBQUEsUUFDbEM7QUFFQSxRQUFBQSxTQUFRQSxLQUFJLFFBQVEsR0FBRyxNQUFNLEtBQUssTUFBTSxPQUFPO0FBQUEsTUFDakQ7QUFFQSxhQUFPQTtBQUFBLElBQ1Q7QUFBQTtBQUFBOzs7QUNyRUE7QUFBQTtBQUFBO0FBRUEsUUFBSSxRQUFRO0FBRVosYUFBUyxxQkFBcUI7QUFDNUIsV0FBSyxXQUFXLENBQUM7QUFBQSxJQUNuQjtBQVVBLHVCQUFtQixVQUFVLE1BQU0sU0FBUyxJQUFJLFdBQVcsVUFBVSxTQUFTO0FBQzVFLFdBQUssU0FBUyxLQUFLO0FBQUEsUUFDakI7QUFBQSxRQUNBO0FBQUEsUUFDQSxhQUFhLFVBQVUsUUFBUSxjQUFjO0FBQUEsUUFDN0MsU0FBUyxVQUFVLFFBQVEsVUFBVTtBQUFBLE1BQ3ZDLENBQUM7QUFDRCxhQUFPLEtBQUssU0FBUyxTQUFTO0FBQUEsSUFDaEM7QUFPQSx1QkFBbUIsVUFBVSxRQUFRLFNBQVMsTUFBTSxJQUFJO0FBQ3RELFVBQUksS0FBSyxTQUFTLEtBQUs7QUFDckIsYUFBSyxTQUFTLE1BQU07QUFBQSxNQUN0QjtBQUFBLElBQ0Y7QUFVQSx1QkFBbUIsVUFBVSxVQUFVLFNBQVMsUUFBUSxJQUFJO0FBQzFELFlBQU0sUUFBUSxLQUFLLFVBQVUsU0FBUyxlQUFlLEdBQUc7QUFDdEQsWUFBSSxNQUFNLE1BQU07QUFDZCxhQUFHLENBQUM7QUFBQSxRQUNOO0FBQUEsTUFDRixDQUFDO0FBQUEsSUFDSDtBQUVBLFdBQU8sVUFBVTtBQUFBO0FBQUE7OztBQ3JEakI7QUFBQTtBQUFBO0FBRUEsUUFBSSxRQUFRO0FBRVosV0FBTyxVQUFVLFNBQVMsb0JBQW9CLFNBQVMsZ0JBQWdCO0FBQ3JFLFlBQU0sUUFBUSxTQUFTLFNBQVMsY0FBY0UsUUFBTyxNQUFNO0FBQ3pELFlBQUksU0FBUyxrQkFBa0IsS0FBSyxZQUFZLE1BQU0sZUFBZSxZQUFZLEdBQUc7QUFDbEYsa0JBQVEsa0JBQWtCQTtBQUMxQixpQkFBTyxRQUFRO0FBQUEsUUFDakI7QUFBQSxNQUNGLENBQUM7QUFBQSxJQUNIO0FBQUE7QUFBQTs7O0FDWEE7QUFBQTtBQUFBO0FBRUEsUUFBSSxRQUFRO0FBWVosYUFBUyxXQUFXLFNBQVMsTUFBTSxRQUFRLFNBQVMsVUFBVTtBQUM1RCxZQUFNLEtBQUssSUFBSTtBQUNmLFdBQUssVUFBVTtBQUNmLFdBQUssT0FBTztBQUNaLGVBQVMsS0FBSyxPQUFPO0FBQ3JCLGlCQUFXLEtBQUssU0FBUztBQUN6QixrQkFBWSxLQUFLLFVBQVU7QUFDM0IsbUJBQWEsS0FBSyxXQUFXO0FBQUEsSUFDL0I7QUFFQSxVQUFNLFNBQVMsWUFBWSxPQUFPO0FBQUEsTUFDaEMsUUFBUSxTQUFTLFNBQVM7QUFDeEIsZUFBTztBQUFBLFVBRUwsU0FBUyxLQUFLO0FBQUEsVUFDZCxNQUFNLEtBQUs7QUFBQSxVQUVYLGFBQWEsS0FBSztBQUFBLFVBQ2xCLFFBQVEsS0FBSztBQUFBLFVBRWIsVUFBVSxLQUFLO0FBQUEsVUFDZixZQUFZLEtBQUs7QUFBQSxVQUNqQixjQUFjLEtBQUs7QUFBQSxVQUNuQixPQUFPLEtBQUs7QUFBQSxVQUVaLFFBQVEsS0FBSztBQUFBLFVBQ2IsTUFBTSxLQUFLO0FBQUEsVUFDWCxRQUFRLEtBQUssWUFBWSxLQUFLLFNBQVMsU0FBUyxLQUFLLFNBQVMsU0FBUztBQUFBLFFBQ3pFO0FBQUEsTUFDRjtBQUFBLElBQ0YsQ0FBQztBQUVELFFBQUksWUFBWSxXQUFXO0FBQzNCLFFBQUksY0FBYyxDQUFDO0FBRW5CO0FBQUEsTUFDRTtBQUFBLE1BQ0E7QUFBQSxNQUNBO0FBQUEsTUFDQTtBQUFBLE1BQ0E7QUFBQSxNQUNBO0FBQUEsTUFDQTtBQUFBLE1BQ0E7QUFBQSxNQUNBO0FBQUEsTUFDQTtBQUFBLElBRUYsRUFBRSxRQUFRLFNBQVMsTUFBTTtBQUN2QixrQkFBWSxRQUFRLEVBQUMsT0FBTyxLQUFJO0FBQUEsSUFDbEMsQ0FBQztBQUVELFdBQU8saUJBQWlCLFlBQVksV0FBVztBQUMvQyxXQUFPLGVBQWUsV0FBVyxnQkFBZ0IsRUFBQyxPQUFPLEtBQUksQ0FBQztBQUc5RCxlQUFXLE9BQU8sU0FBUyxPQUFPLE1BQU0sUUFBUSxTQUFTLFVBQVUsYUFBYTtBQUM5RSxVQUFJLGFBQWEsT0FBTyxPQUFPLFNBQVM7QUFFeEMsWUFBTSxhQUFhLE9BQU8sWUFBWSxTQUFTLE9BQU8sS0FBSztBQUN6RCxlQUFPLFFBQVEsTUFBTTtBQUFBLE1BQ3ZCLENBQUM7QUFFRCxpQkFBVyxLQUFLLFlBQVksTUFBTSxTQUFTLE1BQU0sUUFBUSxTQUFTLFFBQVE7QUFFMUUsaUJBQVcsT0FBTyxNQUFNO0FBRXhCLHFCQUFlLE9BQU8sT0FBTyxZQUFZLFdBQVc7QUFFcEQsYUFBTztBQUFBLElBQ1Q7QUFFQSxXQUFPLFVBQVU7QUFBQTtBQUFBOzs7QUNyRmpCO0FBQUE7QUFBQTtBQUVBLFdBQU8sVUFBVTtBQUFBLE1BQ2YsbUJBQW1CO0FBQUEsTUFDbkIsbUJBQW1CO0FBQUEsTUFDbkIscUJBQXFCO0FBQUEsSUFDdkI7QUFBQTtBQUFBOzs7QUNOQTtBQUFBO0FBQUE7QUFFQSxRQUFJLFFBQVE7QUFTWixhQUFTLFdBQVcsS0FBSyxVQUFVO0FBRWpDLGlCQUFXLFlBQVksSUFBSSxTQUFTO0FBRXBDLFVBQUksUUFBUSxDQUFDO0FBRWIsZUFBUyxhQUFhQyxRQUFPO0FBQzNCLFlBQUlBLFdBQVU7QUFBTSxpQkFBTztBQUUzQixZQUFJLE1BQU0sT0FBT0EsTUFBSyxHQUFHO0FBQ3ZCLGlCQUFPQSxPQUFNLFlBQVk7QUFBQSxRQUMzQjtBQUVBLFlBQUksTUFBTSxjQUFjQSxNQUFLLEtBQUssTUFBTSxhQUFhQSxNQUFLLEdBQUc7QUFDM0QsaUJBQU8sT0FBTyxTQUFTLGFBQWEsSUFBSSxLQUFLLENBQUNBLE1BQUssQ0FBQyxJQUFJLE9BQU8sS0FBS0EsTUFBSztBQUFBLFFBQzNFO0FBRUEsZUFBT0E7QUFBQSxNQUNUO0FBRUEsZUFBUyxNQUFNLE1BQU0sV0FBVztBQUM5QixZQUFJLE1BQU0sY0FBYyxJQUFJLEtBQUssTUFBTSxRQUFRLElBQUksR0FBRztBQUNwRCxjQUFJLE1BQU0sUUFBUSxJQUFJLE1BQU0sSUFBSTtBQUM5QixrQkFBTSxNQUFNLG9DQUFvQyxTQUFTO0FBQUEsVUFDM0Q7QUFFQSxnQkFBTSxLQUFLLElBQUk7QUFFZixnQkFBTSxRQUFRLE1BQU0sU0FBUyxLQUFLQSxRQUFPLEtBQUs7QUFDNUMsZ0JBQUksTUFBTSxZQUFZQSxNQUFLO0FBQUc7QUFDOUIsZ0JBQUksVUFBVSxZQUFZLFlBQVksTUFBTSxNQUFNO0FBQ2xELGdCQUFJO0FBRUosZ0JBQUlBLFVBQVMsQ0FBQyxhQUFhLE9BQU9BLFdBQVUsVUFBVTtBQUNwRCxrQkFBSSxNQUFNLFNBQVMsS0FBSyxJQUFJLEdBQUc7QUFFN0IsZ0JBQUFBLFNBQVEsS0FBSyxVQUFVQSxNQUFLO0FBQUEsY0FDOUIsV0FBVyxNQUFNLFNBQVMsS0FBSyxJQUFJLE1BQU0sTUFBTSxNQUFNLFFBQVFBLE1BQUssSUFBSTtBQUVwRSxvQkFBSSxRQUFRLFNBQVMsSUFBSTtBQUN2QixtQkFBQyxNQUFNLFlBQVksRUFBRSxLQUFLLFNBQVMsT0FBTyxTQUFTLGFBQWEsRUFBRSxDQUFDO0FBQUEsZ0JBQ3JFLENBQUM7QUFDRDtBQUFBLGNBQ0Y7QUFBQSxZQUNGO0FBRUEsa0JBQU1BLFFBQU8sT0FBTztBQUFBLFVBQ3RCLENBQUM7QUFFRCxnQkFBTSxJQUFJO0FBQUEsUUFDWixPQUFPO0FBQ0wsbUJBQVMsT0FBTyxXQUFXLGFBQWEsSUFBSSxDQUFDO0FBQUEsUUFDL0M7QUFBQSxNQUNGO0FBRUEsWUFBTSxHQUFHO0FBRVQsYUFBTztBQUFBLElBQ1Q7QUFFQSxXQUFPLFVBQVU7QUFBQTtBQUFBOzs7QUN2RWpCO0FBQUE7QUFBQTtBQUVBLFFBQUksYUFBYTtBQVNqQixXQUFPLFVBQVUsU0FBUyxPQUFPLFNBQVMsUUFBUSxVQUFVO0FBQzFELFVBQUksaUJBQWlCLFNBQVMsT0FBTztBQUNyQyxVQUFJLENBQUMsU0FBUyxVQUFVLENBQUMsa0JBQWtCLGVBQWUsU0FBUyxNQUFNLEdBQUc7QUFDMUUsZ0JBQVEsUUFBUTtBQUFBLE1BQ2xCLE9BQU87QUFDTCxlQUFPLElBQUk7QUFBQSxVQUNULHFDQUFxQyxTQUFTO0FBQUEsVUFDOUMsQ0FBQyxXQUFXLGlCQUFpQixXQUFXLGdCQUFnQixFQUFFLEtBQUssTUFBTSxTQUFTLFNBQVMsR0FBRyxJQUFJO0FBQUEsVUFDOUYsU0FBUztBQUFBLFVBQ1QsU0FBUztBQUFBLFVBQ1Q7QUFBQSxRQUNGLENBQUM7QUFBQSxNQUNIO0FBQUEsSUFDRjtBQUFBO0FBQUE7OztBQ3hCQTtBQUFBO0FBQUE7QUFFQSxRQUFJLFFBQVE7QUFFWixXQUFPLFVBQ0wsTUFBTSxxQkFBcUIsSUFHeEIsU0FBUyxxQkFBcUI7QUFDN0IsYUFBTztBQUFBLFFBQ0wsT0FBTyxTQUFTLE1BQU0sTUFBTUMsUUFBTyxTQUFTLE1BQU0sUUFBUSxRQUFRO0FBQ2hFLGNBQUksU0FBUyxDQUFDO0FBQ2QsaUJBQU8sS0FBSyxPQUFPLE1BQU0sbUJBQW1CQSxNQUFLLENBQUM7QUFFbEQsY0FBSSxNQUFNLFNBQVMsT0FBTyxHQUFHO0FBQzNCLG1CQUFPLEtBQUssYUFBYSxJQUFJLEtBQUssT0FBTyxFQUFFLFlBQVksQ0FBQztBQUFBLFVBQzFEO0FBRUEsY0FBSSxNQUFNLFNBQVMsSUFBSSxHQUFHO0FBQ3hCLG1CQUFPLEtBQUssVUFBVSxJQUFJO0FBQUEsVUFDNUI7QUFFQSxjQUFJLE1BQU0sU0FBUyxNQUFNLEdBQUc7QUFDMUIsbUJBQU8sS0FBSyxZQUFZLE1BQU07QUFBQSxVQUNoQztBQUVBLGNBQUksV0FBVyxNQUFNO0FBQ25CLG1CQUFPLEtBQUssUUFBUTtBQUFBLFVBQ3RCO0FBRUEsbUJBQVMsU0FBUyxPQUFPLEtBQUssSUFBSTtBQUFBLFFBQ3BDO0FBQUEsUUFFQSxNQUFNLFNBQVMsS0FBSyxNQUFNO0FBQ3hCLGNBQUksUUFBUSxTQUFTLE9BQU8sTUFBTSxJQUFJLE9BQU8sZUFBZSxPQUFPLFdBQVcsQ0FBQztBQUMvRSxpQkFBUSxRQUFRLG1CQUFtQixNQUFNLEVBQUUsSUFBSTtBQUFBLFFBQ2pEO0FBQUEsUUFFQSxRQUFRLFNBQVMsT0FBTyxNQUFNO0FBQzVCLGVBQUssTUFBTSxNQUFNLElBQUksS0FBSyxJQUFJLElBQUksS0FBUTtBQUFBLFFBQzVDO0FBQUEsTUFDRjtBQUFBLElBQ0YsRUFBRyxJQUdGLFNBQVMsd0JBQXdCO0FBQ2hDLGFBQU87QUFBQSxRQUNMLE9BQU8sU0FBUyxRQUFRO0FBQUEsUUFBQztBQUFBLFFBQ3pCLE1BQU0sU0FBUyxPQUFPO0FBQUUsaUJBQU87QUFBQSxRQUFNO0FBQUEsUUFDckMsUUFBUSxTQUFTLFNBQVM7QUFBQSxRQUFDO0FBQUEsTUFDN0I7QUFBQSxJQUNGLEVBQUc7QUFBQTtBQUFBOzs7QUNuRFA7QUFBQTtBQUFBO0FBUUEsV0FBTyxVQUFVLFNBQVMsY0FBY0MsTUFBSztBQUkzQyxhQUFPLDhCQUE4QixLQUFLQSxJQUFHO0FBQUEsSUFDL0M7QUFBQTtBQUFBOzs7QUNiQTtBQUFBO0FBQUE7QUFTQSxXQUFPLFVBQVUsU0FBUyxZQUFZLFNBQVMsYUFBYTtBQUMxRCxhQUFPLGNBQ0gsUUFBUSxRQUFRLFFBQVEsRUFBRSxJQUFJLE1BQU0sWUFBWSxRQUFRLFFBQVEsRUFBRSxJQUNsRTtBQUFBLElBQ047QUFBQTtBQUFBOzs7QUNiQTtBQUFBO0FBQUE7QUFFQSxRQUFJLGdCQUFnQjtBQUNwQixRQUFJLGNBQWM7QUFXbEIsV0FBTyxVQUFVLFNBQVMsY0FBYyxTQUFTLGNBQWM7QUFDN0QsVUFBSSxXQUFXLENBQUMsY0FBYyxZQUFZLEdBQUc7QUFDM0MsZUFBTyxZQUFZLFNBQVMsWUFBWTtBQUFBLE1BQzFDO0FBQ0EsYUFBTztBQUFBLElBQ1Q7QUFBQTtBQUFBOzs7QUNuQkE7QUFBQTtBQUFBO0FBRUEsUUFBSSxRQUFRO0FBSVosUUFBSSxvQkFBb0I7QUFBQSxNQUN0QjtBQUFBLE1BQU87QUFBQSxNQUFpQjtBQUFBLE1BQWtCO0FBQUEsTUFBZ0I7QUFBQSxNQUMxRDtBQUFBLE1BQVc7QUFBQSxNQUFRO0FBQUEsTUFBUTtBQUFBLE1BQXFCO0FBQUEsTUFDaEQ7QUFBQSxNQUFpQjtBQUFBLE1BQVk7QUFBQSxNQUFnQjtBQUFBLE1BQzdDO0FBQUEsTUFBVztBQUFBLE1BQWU7QUFBQSxJQUM1QjtBQWVBLFdBQU8sVUFBVSxTQUFTLGFBQWEsU0FBUztBQUM5QyxVQUFJLFNBQVMsQ0FBQztBQUNkLFVBQUk7QUFDSixVQUFJO0FBQ0osVUFBSUM7QUFFSixVQUFJLENBQUMsU0FBUztBQUFFLGVBQU87QUFBQSxNQUFRO0FBRS9CLFlBQU0sUUFBUSxRQUFRLE1BQU0sSUFBSSxHQUFHLFNBQVMsT0FBTyxNQUFNO0FBQ3ZELFFBQUFBLEtBQUksS0FBSyxRQUFRLEdBQUc7QUFDcEIsY0FBTSxNQUFNLEtBQUssS0FBSyxPQUFPLEdBQUdBLEVBQUMsQ0FBQyxFQUFFLFlBQVk7QUFDaEQsY0FBTSxNQUFNLEtBQUssS0FBSyxPQUFPQSxLQUFJLENBQUMsQ0FBQztBQUVuQyxZQUFJLEtBQUs7QUFDUCxjQUFJLE9BQU8sUUFBUSxrQkFBa0IsUUFBUSxHQUFHLEtBQUssR0FBRztBQUN0RDtBQUFBLFVBQ0Y7QUFDQSxjQUFJLFFBQVEsY0FBYztBQUN4QixtQkFBTyxRQUFRLE9BQU8sT0FBTyxPQUFPLE9BQU8sQ0FBQyxHQUFHLE9BQU8sQ0FBQyxHQUFHLENBQUM7QUFBQSxVQUM3RCxPQUFPO0FBQ0wsbUJBQU8sT0FBTyxPQUFPLE9BQU8sT0FBTyxPQUFPLE9BQU8sTUFBTTtBQUFBLFVBQ3pEO0FBQUEsUUFDRjtBQUFBLE1BQ0YsQ0FBQztBQUVELGFBQU87QUFBQSxJQUNUO0FBQUE7QUFBQTs7O0FDcERBO0FBQUE7QUFBQTtBQUVBLFFBQUksUUFBUTtBQUVaLFdBQU8sVUFDTCxNQUFNLHFCQUFxQixJQUl4QixTQUFTLHFCQUFxQjtBQUM3QixVQUFJLE9BQU8sa0JBQWtCLEtBQUssVUFBVSxTQUFTO0FBQ3JELFVBQUksaUJBQWlCLFNBQVMsY0FBYyxHQUFHO0FBQy9DLFVBQUk7QUFRSixlQUFTLFdBQVdDLE1BQUs7QUFDdkIsWUFBSSxPQUFPQTtBQUVYLFlBQUksTUFBTTtBQUVSLHlCQUFlLGFBQWEsUUFBUSxJQUFJO0FBQ3hDLGlCQUFPLGVBQWU7QUFBQSxRQUN4QjtBQUVBLHVCQUFlLGFBQWEsUUFBUSxJQUFJO0FBR3hDLGVBQU87QUFBQSxVQUNMLE1BQU0sZUFBZTtBQUFBLFVBQ3JCLFVBQVUsZUFBZSxXQUFXLGVBQWUsU0FBUyxRQUFRLE1BQU0sRUFBRSxJQUFJO0FBQUEsVUFDaEYsTUFBTSxlQUFlO0FBQUEsVUFDckIsUUFBUSxlQUFlLFNBQVMsZUFBZSxPQUFPLFFBQVEsT0FBTyxFQUFFLElBQUk7QUFBQSxVQUMzRSxNQUFNLGVBQWUsT0FBTyxlQUFlLEtBQUssUUFBUSxNQUFNLEVBQUUsSUFBSTtBQUFBLFVBQ3BFLFVBQVUsZUFBZTtBQUFBLFVBQ3pCLE1BQU0sZUFBZTtBQUFBLFVBQ3JCLFVBQVcsZUFBZSxTQUFTLE9BQU8sQ0FBQyxNQUFNLE1BQy9DLGVBQWUsV0FDZixNQUFNLGVBQWU7QUFBQSxRQUN6QjtBQUFBLE1BQ0Y7QUFFQSxrQkFBWSxXQUFXLE9BQU8sU0FBUyxJQUFJO0FBUTNDLGFBQU8sU0FBUyxnQkFBZ0IsWUFBWTtBQUMxQyxZQUFJLFNBQVUsTUFBTSxTQUFTLFVBQVUsSUFBSyxXQUFXLFVBQVUsSUFBSTtBQUNyRSxlQUFRLE9BQU8sYUFBYSxVQUFVLFlBQ2xDLE9BQU8sU0FBUyxVQUFVO0FBQUEsTUFDaEM7QUFBQSxJQUNGLEVBQUcsSUFHRixTQUFTLHdCQUF3QjtBQUNoQyxhQUFPLFNBQVMsa0JBQWtCO0FBQ2hDLGVBQU87QUFBQSxNQUNUO0FBQUEsSUFDRixFQUFHO0FBQUE7QUFBQTs7O0FDbEVQO0FBQUE7QUFBQTtBQUVBLFFBQUksYUFBYTtBQUNqQixRQUFJLFFBQVE7QUFRWixhQUFTLGNBQWMsU0FBUztBQUU5QixpQkFBVyxLQUFLLE1BQU0sV0FBVyxPQUFPLGFBQWEsU0FBUyxXQUFXLFlBQVk7QUFDckYsV0FBSyxPQUFPO0FBQUEsSUFDZDtBQUVBLFVBQU0sU0FBUyxlQUFlLFlBQVk7QUFBQSxNQUN4QyxZQUFZO0FBQUEsSUFDZCxDQUFDO0FBRUQsV0FBTyxVQUFVO0FBQUE7QUFBQTs7O0FDckJqQjtBQUFBO0FBQUE7QUFFQSxXQUFPLFVBQVUsU0FBUyxjQUFjQyxNQUFLO0FBQzNDLFVBQUksUUFBUSw0QkFBNEIsS0FBS0EsSUFBRztBQUNoRCxhQUFPLFNBQVMsTUFBTSxNQUFNO0FBQUEsSUFDOUI7QUFBQTtBQUFBOzs7QUNMQTtBQUFBO0FBQUE7QUFFQSxRQUFJLFFBQVE7QUFDWixRQUFJLFNBQVM7QUFDYixRQUFJLFVBQVU7QUFDZCxRQUFJLFdBQVc7QUFDZixRQUFJLGdCQUFnQjtBQUNwQixRQUFJLGVBQWU7QUFDbkIsUUFBSSxrQkFBa0I7QUFDdEIsUUFBSSx1QkFBdUI7QUFDM0IsUUFBSSxhQUFhO0FBQ2pCLFFBQUksZ0JBQWdCO0FBQ3BCLFFBQUksZ0JBQWdCO0FBRXBCLFdBQU8sVUFBVSxTQUFTLFdBQVcsUUFBUTtBQUMzQyxhQUFPLElBQUksUUFBUSxTQUFTLG1CQUFtQixTQUFTLFFBQVE7QUFDOUQsWUFBSSxjQUFjLE9BQU87QUFDekIsWUFBSSxpQkFBaUIsT0FBTztBQUM1QixZQUFJLGVBQWUsT0FBTztBQUMxQixZQUFJO0FBQ0osaUJBQVMsT0FBTztBQUNkLGNBQUksT0FBTyxhQUFhO0FBQ3RCLG1CQUFPLFlBQVksWUFBWSxVQUFVO0FBQUEsVUFDM0M7QUFFQSxjQUFJLE9BQU8sUUFBUTtBQUNqQixtQkFBTyxPQUFPLG9CQUFvQixTQUFTLFVBQVU7QUFBQSxVQUN2RDtBQUFBLFFBQ0Y7QUFFQSxZQUFJLE1BQU0sV0FBVyxXQUFXLEtBQUssTUFBTSxxQkFBcUIsR0FBRztBQUNqRSxpQkFBTyxlQUFlO0FBQUEsUUFDeEI7QUFFQSxZQUFJLFVBQVUsSUFBSSxlQUFlO0FBR2pDLFlBQUksT0FBTyxNQUFNO0FBQ2YsY0FBSSxXQUFXLE9BQU8sS0FBSyxZQUFZO0FBQ3ZDLGNBQUksV0FBVyxPQUFPLEtBQUssV0FBVyxTQUFTLG1CQUFtQixPQUFPLEtBQUssUUFBUSxDQUFDLElBQUk7QUFDM0YseUJBQWUsZ0JBQWdCLFdBQVcsS0FBSyxXQUFXLE1BQU0sUUFBUTtBQUFBLFFBQzFFO0FBRUEsWUFBSSxXQUFXLGNBQWMsT0FBTyxTQUFTLE9BQU8sR0FBRztBQUV2RCxnQkFBUSxLQUFLLE9BQU8sT0FBTyxZQUFZLEdBQUcsU0FBUyxVQUFVLE9BQU8sUUFBUSxPQUFPLGdCQUFnQixHQUFHLElBQUk7QUFHMUcsZ0JBQVEsVUFBVSxPQUFPO0FBRXpCLGlCQUFTLFlBQVk7QUFDbkIsY0FBSSxDQUFDLFNBQVM7QUFDWjtBQUFBLFVBQ0Y7QUFFQSxjQUFJLGtCQUFrQiwyQkFBMkIsVUFBVSxhQUFhLFFBQVEsc0JBQXNCLENBQUMsSUFBSTtBQUMzRyxjQUFJLGVBQWUsQ0FBQyxnQkFBZ0IsaUJBQWlCLFVBQVcsaUJBQWlCLFNBQy9FLFFBQVEsZUFBZSxRQUFRO0FBQ2pDLGNBQUksV0FBVztBQUFBLFlBQ2IsTUFBTTtBQUFBLFlBQ04sUUFBUSxRQUFRO0FBQUEsWUFDaEIsWUFBWSxRQUFRO0FBQUEsWUFDcEIsU0FBUztBQUFBLFlBQ1Q7QUFBQSxZQUNBO0FBQUEsVUFDRjtBQUVBLGlCQUFPLFNBQVMsU0FBU0MsUUFBTztBQUM5QixvQkFBUUEsTUFBSztBQUNiLGlCQUFLO0FBQUEsVUFDUCxHQUFHLFNBQVMsUUFBUSxLQUFLO0FBQ3ZCLG1CQUFPLEdBQUc7QUFDVixpQkFBSztBQUFBLFVBQ1AsR0FBRyxRQUFRO0FBR1gsb0JBQVU7QUFBQSxRQUNaO0FBRUEsWUFBSSxlQUFlLFNBQVM7QUFFMUIsa0JBQVEsWUFBWTtBQUFBLFFBQ3RCLE9BQU87QUFFTCxrQkFBUSxxQkFBcUIsU0FBUyxhQUFhO0FBQ2pELGdCQUFJLENBQUMsV0FBVyxRQUFRLGVBQWUsR0FBRztBQUN4QztBQUFBLFlBQ0Y7QUFNQSxnQkFBSSxRQUFRLFdBQVcsS0FBSyxFQUFFLFFBQVEsZUFBZSxRQUFRLFlBQVksUUFBUSxPQUFPLE1BQU0sSUFBSTtBQUNoRztBQUFBLFlBQ0Y7QUFHQSx1QkFBVyxTQUFTO0FBQUEsVUFDdEI7QUFBQSxRQUNGO0FBR0EsZ0JBQVEsVUFBVSxTQUFTLGNBQWM7QUFDdkMsY0FBSSxDQUFDLFNBQVM7QUFDWjtBQUFBLFVBQ0Y7QUFFQSxpQkFBTyxJQUFJLFdBQVcsbUJBQW1CLFdBQVcsY0FBYyxRQUFRLE9BQU8sQ0FBQztBQUdsRixvQkFBVTtBQUFBLFFBQ1o7QUFHQSxnQkFBUSxVQUFVLFNBQVMsY0FBYztBQUd2QyxpQkFBTyxJQUFJLFdBQVcsaUJBQWlCLFdBQVcsYUFBYSxRQUFRLFNBQVMsT0FBTyxDQUFDO0FBR3hGLG9CQUFVO0FBQUEsUUFDWjtBQUdBLGdCQUFRLFlBQVksU0FBUyxnQkFBZ0I7QUFDM0MsY0FBSSxzQkFBc0IsT0FBTyxVQUFVLGdCQUFnQixPQUFPLFVBQVUsZ0JBQWdCO0FBQzVGLGNBQUksZUFBZSxPQUFPLGdCQUFnQjtBQUMxQyxjQUFJLE9BQU8scUJBQXFCO0FBQzlCLGtDQUFzQixPQUFPO0FBQUEsVUFDL0I7QUFDQSxpQkFBTyxJQUFJO0FBQUEsWUFDVDtBQUFBLFlBQ0EsYUFBYSxzQkFBc0IsV0FBVyxZQUFZLFdBQVc7QUFBQSxZQUNyRTtBQUFBLFlBQ0E7QUFBQSxVQUFPLENBQUM7QUFHVixvQkFBVTtBQUFBLFFBQ1o7QUFLQSxZQUFJLE1BQU0scUJBQXFCLEdBQUc7QUFFaEMsY0FBSSxhQUFhLE9BQU8sbUJBQW1CLGdCQUFnQixRQUFRLE1BQU0sT0FBTyxpQkFDOUUsUUFBUSxLQUFLLE9BQU8sY0FBYyxJQUNsQztBQUVGLGNBQUksV0FBVztBQUNiLDJCQUFlLE9BQU8sa0JBQWtCO0FBQUEsVUFDMUM7QUFBQSxRQUNGO0FBR0EsWUFBSSxzQkFBc0IsU0FBUztBQUNqQyxnQkFBTSxRQUFRLGdCQUFnQixTQUFTLGlCQUFpQixLQUFLLEtBQUs7QUFDaEUsZ0JBQUksT0FBTyxnQkFBZ0IsZUFBZSxJQUFJLFlBQVksTUFBTSxnQkFBZ0I7QUFFOUUscUJBQU8sZUFBZTtBQUFBLFlBQ3hCLE9BQU87QUFFTCxzQkFBUSxpQkFBaUIsS0FBSyxHQUFHO0FBQUEsWUFDbkM7QUFBQSxVQUNGLENBQUM7QUFBQSxRQUNIO0FBR0EsWUFBSSxDQUFDLE1BQU0sWUFBWSxPQUFPLGVBQWUsR0FBRztBQUM5QyxrQkFBUSxrQkFBa0IsQ0FBQyxDQUFDLE9BQU87QUFBQSxRQUNyQztBQUdBLFlBQUksZ0JBQWdCLGlCQUFpQixRQUFRO0FBQzNDLGtCQUFRLGVBQWUsT0FBTztBQUFBLFFBQ2hDO0FBR0EsWUFBSSxPQUFPLE9BQU8sdUJBQXVCLFlBQVk7QUFDbkQsa0JBQVEsaUJBQWlCLFlBQVksT0FBTyxrQkFBa0I7QUFBQSxRQUNoRTtBQUdBLFlBQUksT0FBTyxPQUFPLHFCQUFxQixjQUFjLFFBQVEsUUFBUTtBQUNuRSxrQkFBUSxPQUFPLGlCQUFpQixZQUFZLE9BQU8sZ0JBQWdCO0FBQUEsUUFDckU7QUFFQSxZQUFJLE9BQU8sZUFBZSxPQUFPLFFBQVE7QUFHdkMsdUJBQWEsU0FBUyxRQUFRO0FBQzVCLGdCQUFJLENBQUMsU0FBUztBQUNaO0FBQUEsWUFDRjtBQUNBLG1CQUFPLENBQUMsVUFBVyxVQUFVLE9BQU8sT0FBUSxJQUFJLGNBQWMsSUFBSSxNQUFNO0FBQ3hFLG9CQUFRLE1BQU07QUFDZCxzQkFBVTtBQUFBLFVBQ1o7QUFFQSxpQkFBTyxlQUFlLE9BQU8sWUFBWSxVQUFVLFVBQVU7QUFDN0QsY0FBSSxPQUFPLFFBQVE7QUFDakIsbUJBQU8sT0FBTyxVQUFVLFdBQVcsSUFBSSxPQUFPLE9BQU8saUJBQWlCLFNBQVMsVUFBVTtBQUFBLFVBQzNGO0FBQUEsUUFDRjtBQUVBLFlBQUksQ0FBQyxhQUFhO0FBQ2hCLHdCQUFjO0FBQUEsUUFDaEI7QUFFQSxZQUFJQyxZQUFXLGNBQWMsUUFBUTtBQUVyQyxZQUFJQSxhQUFZLENBQUUsUUFBUSxTQUFTLE1BQU8sRUFBRSxRQUFRQSxTQUFRLE1BQU0sSUFBSTtBQUNwRSxpQkFBTyxJQUFJLFdBQVcsMEJBQTBCQSxZQUFXLEtBQUssV0FBVyxpQkFBaUIsTUFBTSxDQUFDO0FBQ25HO0FBQUEsUUFDRjtBQUlBLGdCQUFRLEtBQUssV0FBVztBQUFBLE1BQzFCLENBQUM7QUFBQSxJQUNIO0FBQUE7QUFBQTs7O0FDN05BO0FBQUE7QUFDQSxXQUFPLFVBQVU7QUFBQTtBQUFBOzs7QUNEakI7QUFBQTtBQUFBO0FBRUEsUUFBSSxRQUFRO0FBQ1osUUFBSSxzQkFBc0I7QUFDMUIsUUFBSSxhQUFhO0FBQ2pCLFFBQUksdUJBQXVCO0FBQzNCLFFBQUksYUFBYTtBQUVqQixRQUFJLHVCQUF1QjtBQUFBLE1BQ3pCLGdCQUFnQjtBQUFBLElBQ2xCO0FBRUEsYUFBUyxzQkFBc0IsU0FBU0MsUUFBTztBQUM3QyxVQUFJLENBQUMsTUFBTSxZQUFZLE9BQU8sS0FBSyxNQUFNLFlBQVksUUFBUSxlQUFlLEdBQUc7QUFDN0UsZ0JBQVEsa0JBQWtCQTtBQUFBLE1BQzVCO0FBQUEsSUFDRjtBQUVBLGFBQVMsb0JBQW9CO0FBQzNCLFVBQUk7QUFDSixVQUFJLE9BQU8sbUJBQW1CLGFBQWE7QUFFekMsa0JBQVU7QUFBQSxNQUNaLFdBQVcsT0FBTyxZQUFZLGVBQWUsT0FBTyxVQUFVLFNBQVMsS0FBSyxPQUFPLE1BQU0sb0JBQW9CO0FBRTNHLGtCQUFVO0FBQUEsTUFDWjtBQUNBLGFBQU87QUFBQSxJQUNUO0FBRUEsYUFBUyxnQkFBZ0IsVUFBVSxRQUFRLFNBQVM7QUFDbEQsVUFBSSxNQUFNLFNBQVMsUUFBUSxHQUFHO0FBQzVCLFlBQUk7QUFDRixXQUFDLFVBQVUsS0FBSyxPQUFPLFFBQVE7QUFDL0IsaUJBQU8sTUFBTSxLQUFLLFFBQVE7QUFBQSxRQUM1QixTQUFTLEdBQVA7QUFDQSxjQUFJLEVBQUUsU0FBUyxlQUFlO0FBQzVCLGtCQUFNO0FBQUEsVUFDUjtBQUFBLFFBQ0Y7QUFBQSxNQUNGO0FBRUEsY0FBUSxXQUFXLEtBQUssV0FBVyxRQUFRO0FBQUEsSUFDN0M7QUFFQSxRQUFJLFdBQVc7QUFBQSxNQUViLGNBQWM7QUFBQSxNQUVkLFNBQVMsa0JBQWtCO0FBQUEsTUFFM0Isa0JBQWtCLENBQUMsU0FBUyxpQkFBaUIsTUFBTSxTQUFTO0FBQzFELDRCQUFvQixTQUFTLFFBQVE7QUFDckMsNEJBQW9CLFNBQVMsY0FBYztBQUUzQyxZQUFJLE1BQU0sV0FBVyxJQUFJLEtBQ3ZCLE1BQU0sY0FBYyxJQUFJLEtBQ3hCLE1BQU0sU0FBUyxJQUFJLEtBQ25CLE1BQU0sU0FBUyxJQUFJLEtBQ25CLE1BQU0sT0FBTyxJQUFJLEtBQ2pCLE1BQU0sT0FBTyxJQUFJLEdBQ2pCO0FBQ0EsaUJBQU87QUFBQSxRQUNUO0FBQ0EsWUFBSSxNQUFNLGtCQUFrQixJQUFJLEdBQUc7QUFDakMsaUJBQU8sS0FBSztBQUFBLFFBQ2Q7QUFDQSxZQUFJLE1BQU0sa0JBQWtCLElBQUksR0FBRztBQUNqQyxnQ0FBc0IsU0FBUyxpREFBaUQ7QUFDaEYsaUJBQU8sS0FBSyxTQUFTO0FBQUEsUUFDdkI7QUFFQSxZQUFJLGtCQUFrQixNQUFNLFNBQVMsSUFBSTtBQUN6QyxZQUFJLGNBQWMsV0FBVyxRQUFRO0FBRXJDLFlBQUk7QUFFSixhQUFLLGFBQWEsTUFBTSxXQUFXLElBQUksTUFBTyxtQkFBbUIsZ0JBQWdCLHVCQUF3QjtBQUN2RyxjQUFJLFlBQVksS0FBSyxPQUFPLEtBQUssSUFBSTtBQUNyQyxpQkFBTyxXQUFXLGFBQWEsRUFBQyxXQUFXLEtBQUksSUFBSSxNQUFNLGFBQWEsSUFBSSxVQUFVLENBQUM7QUFBQSxRQUN2RixXQUFXLG1CQUFtQixnQkFBZ0Isb0JBQW9CO0FBQ2hFLGdDQUFzQixTQUFTLGtCQUFrQjtBQUNqRCxpQkFBTyxnQkFBZ0IsSUFBSTtBQUFBLFFBQzdCO0FBRUEsZUFBTztBQUFBLE1BQ1QsQ0FBQztBQUFBLE1BRUQsbUJBQW1CLENBQUMsU0FBUyxrQkFBa0IsTUFBTTtBQUNuRCxZQUFJLGVBQWUsS0FBSyxnQkFBZ0IsU0FBUztBQUNqRCxZQUFJLG9CQUFvQixnQkFBZ0IsYUFBYTtBQUNyRCxZQUFJLG9CQUFvQixnQkFBZ0IsYUFBYTtBQUNyRCxZQUFJLG9CQUFvQixDQUFDLHFCQUFxQixLQUFLLGlCQUFpQjtBQUVwRSxZQUFJLHFCQUFzQixxQkFBcUIsTUFBTSxTQUFTLElBQUksS0FBSyxLQUFLLFFBQVM7QUFDbkYsY0FBSTtBQUNGLG1CQUFPLEtBQUssTUFBTSxJQUFJO0FBQUEsVUFDeEIsU0FBUyxHQUFQO0FBQ0EsZ0JBQUksbUJBQW1CO0FBQ3JCLGtCQUFJLEVBQUUsU0FBUyxlQUFlO0FBQzVCLHNCQUFNLFdBQVcsS0FBSyxHQUFHLFdBQVcsa0JBQWtCLE1BQU0sTUFBTSxLQUFLLFFBQVE7QUFBQSxjQUNqRjtBQUNBLG9CQUFNO0FBQUEsWUFDUjtBQUFBLFVBQ0Y7QUFBQSxRQUNGO0FBRUEsZUFBTztBQUFBLE1BQ1QsQ0FBQztBQUFBLE1BTUQsU0FBUztBQUFBLE1BRVQsZ0JBQWdCO0FBQUEsTUFDaEIsZ0JBQWdCO0FBQUEsTUFFaEIsa0JBQWtCO0FBQUEsTUFDbEIsZUFBZTtBQUFBLE1BRWYsS0FBSztBQUFBLFFBQ0gsVUFBVTtBQUFBLE1BQ1o7QUFBQSxNQUVBLGdCQUFnQixTQUFTLGVBQWUsUUFBUTtBQUM5QyxlQUFPLFVBQVUsT0FBTyxTQUFTO0FBQUEsTUFDbkM7QUFBQSxNQUVBLFNBQVM7QUFBQSxRQUNQLFFBQVE7QUFBQSxVQUNOLFVBQVU7QUFBQSxRQUNaO0FBQUEsTUFDRjtBQUFBLElBQ0Y7QUFFQSxVQUFNLFFBQVEsQ0FBQyxVQUFVLE9BQU8sTUFBTSxHQUFHLFNBQVMsb0JBQW9CLFFBQVE7QUFDNUUsZUFBUyxRQUFRLFVBQVUsQ0FBQztBQUFBLElBQzlCLENBQUM7QUFFRCxVQUFNLFFBQVEsQ0FBQyxRQUFRLE9BQU8sT0FBTyxHQUFHLFNBQVMsc0JBQXNCLFFBQVE7QUFDN0UsZUFBUyxRQUFRLFVBQVUsTUFBTSxNQUFNLG9CQUFvQjtBQUFBLElBQzdELENBQUM7QUFFRCxXQUFPLFVBQVU7QUFBQTtBQUFBOzs7QUNqSmpCO0FBQUE7QUFBQTtBQUVBLFFBQUksUUFBUTtBQUNaLFFBQUksV0FBVztBQVVmLFdBQU8sVUFBVSxTQUFTLGNBQWMsTUFBTSxTQUFTLEtBQUs7QUFDMUQsVUFBSSxVQUFVLFFBQVE7QUFFdEIsWUFBTSxRQUFRLEtBQUssU0FBUyxVQUFVLElBQUk7QUFDeEMsZUFBTyxHQUFHLEtBQUssU0FBUyxNQUFNLE9BQU87QUFBQSxNQUN2QyxDQUFDO0FBRUQsYUFBTztBQUFBLElBQ1Q7QUFBQTtBQUFBOzs7QUNyQkE7QUFBQTtBQUFBO0FBRUEsV0FBTyxVQUFVLFNBQVMsU0FBU0MsUUFBTztBQUN4QyxhQUFPLENBQUMsRUFBRUEsVUFBU0EsT0FBTTtBQUFBLElBQzNCO0FBQUE7QUFBQTs7O0FDSkE7QUFBQTtBQUFBO0FBRUEsUUFBSSxRQUFRO0FBQ1osUUFBSSxnQkFBZ0I7QUFDcEIsUUFBSSxXQUFXO0FBQ2YsUUFBSSxXQUFXO0FBQ2YsUUFBSSxnQkFBZ0I7QUFLcEIsYUFBUyw2QkFBNkIsUUFBUTtBQUM1QyxVQUFJLE9BQU8sYUFBYTtBQUN0QixlQUFPLFlBQVksaUJBQWlCO0FBQUEsTUFDdEM7QUFFQSxVQUFJLE9BQU8sVUFBVSxPQUFPLE9BQU8sU0FBUztBQUMxQyxjQUFNLElBQUksY0FBYztBQUFBLE1BQzFCO0FBQUEsSUFDRjtBQVFBLFdBQU8sVUFBVSxTQUFTLGdCQUFnQixRQUFRO0FBQ2hELG1DQUE2QixNQUFNO0FBR25DLGFBQU8sVUFBVSxPQUFPLFdBQVcsQ0FBQztBQUdwQyxhQUFPLE9BQU8sY0FBYztBQUFBLFFBQzFCO0FBQUEsUUFDQSxPQUFPO0FBQUEsUUFDUCxPQUFPO0FBQUEsUUFDUCxPQUFPO0FBQUEsTUFDVDtBQUdBLGFBQU8sVUFBVSxNQUFNO0FBQUEsUUFDckIsT0FBTyxRQUFRLFVBQVUsQ0FBQztBQUFBLFFBQzFCLE9BQU8sUUFBUSxPQUFPLFdBQVcsQ0FBQztBQUFBLFFBQ2xDLE9BQU87QUFBQSxNQUNUO0FBRUEsWUFBTTtBQUFBLFFBQ0osQ0FBQyxVQUFVLE9BQU8sUUFBUSxRQUFRLE9BQU8sU0FBUyxRQUFRO0FBQUEsUUFDMUQsU0FBUyxrQkFBa0IsUUFBUTtBQUNqQyxpQkFBTyxPQUFPLFFBQVE7QUFBQSxRQUN4QjtBQUFBLE1BQ0Y7QUFFQSxVQUFJLFVBQVUsT0FBTyxXQUFXLFNBQVM7QUFFekMsYUFBTyxRQUFRLE1BQU0sRUFBRSxLQUFLLFNBQVMsb0JBQW9CLFVBQVU7QUFDakUscUNBQTZCLE1BQU07QUFHbkMsaUJBQVMsT0FBTyxjQUFjO0FBQUEsVUFDNUI7QUFBQSxVQUNBLFNBQVM7QUFBQSxVQUNULFNBQVM7QUFBQSxVQUNULE9BQU87QUFBQSxRQUNUO0FBRUEsZUFBTztBQUFBLE1BQ1QsR0FBRyxTQUFTLG1CQUFtQixRQUFRO0FBQ3JDLFlBQUksQ0FBQyxTQUFTLE1BQU0sR0FBRztBQUNyQix1Q0FBNkIsTUFBTTtBQUduQyxjQUFJLFVBQVUsT0FBTyxVQUFVO0FBQzdCLG1CQUFPLFNBQVMsT0FBTyxjQUFjO0FBQUEsY0FDbkM7QUFBQSxjQUNBLE9BQU8sU0FBUztBQUFBLGNBQ2hCLE9BQU8sU0FBUztBQUFBLGNBQ2hCLE9BQU87QUFBQSxZQUNUO0FBQUEsVUFDRjtBQUFBLFFBQ0Y7QUFFQSxlQUFPLFFBQVEsT0FBTyxNQUFNO0FBQUEsTUFDOUIsQ0FBQztBQUFBLElBQ0g7QUFBQTtBQUFBOzs7QUN0RkE7QUFBQTtBQUFBO0FBRUEsUUFBSSxRQUFRO0FBVVosV0FBTyxVQUFVLFNBQVMsWUFBWSxTQUFTLFNBQVM7QUFFdEQsZ0JBQVUsV0FBVyxDQUFDO0FBQ3RCLFVBQUksU0FBUyxDQUFDO0FBRWQsZUFBUyxlQUFlLFFBQVEsUUFBUTtBQUN0QyxZQUFJLE1BQU0sY0FBYyxNQUFNLEtBQUssTUFBTSxjQUFjLE1BQU0sR0FBRztBQUM5RCxpQkFBTyxNQUFNLE1BQU0sUUFBUSxNQUFNO0FBQUEsUUFDbkMsV0FBVyxNQUFNLGNBQWMsTUFBTSxHQUFHO0FBQ3RDLGlCQUFPLE1BQU0sTUFBTSxDQUFDLEdBQUcsTUFBTTtBQUFBLFFBQy9CLFdBQVcsTUFBTSxRQUFRLE1BQU0sR0FBRztBQUNoQyxpQkFBTyxPQUFPLE1BQU07QUFBQSxRQUN0QjtBQUNBLGVBQU87QUFBQSxNQUNUO0FBR0EsZUFBUyxvQkFBb0IsTUFBTTtBQUNqQyxZQUFJLENBQUMsTUFBTSxZQUFZLFFBQVEsS0FBSyxHQUFHO0FBQ3JDLGlCQUFPLGVBQWUsUUFBUSxPQUFPLFFBQVEsS0FBSztBQUFBLFFBQ3BELFdBQVcsQ0FBQyxNQUFNLFlBQVksUUFBUSxLQUFLLEdBQUc7QUFDNUMsaUJBQU8sZUFBZSxRQUFXLFFBQVEsS0FBSztBQUFBLFFBQ2hEO0FBQUEsTUFDRjtBQUdBLGVBQVMsaUJBQWlCLE1BQU07QUFDOUIsWUFBSSxDQUFDLE1BQU0sWUFBWSxRQUFRLEtBQUssR0FBRztBQUNyQyxpQkFBTyxlQUFlLFFBQVcsUUFBUSxLQUFLO0FBQUEsUUFDaEQ7QUFBQSxNQUNGO0FBR0EsZUFBUyxpQkFBaUIsTUFBTTtBQUM5QixZQUFJLENBQUMsTUFBTSxZQUFZLFFBQVEsS0FBSyxHQUFHO0FBQ3JDLGlCQUFPLGVBQWUsUUFBVyxRQUFRLEtBQUs7QUFBQSxRQUNoRCxXQUFXLENBQUMsTUFBTSxZQUFZLFFBQVEsS0FBSyxHQUFHO0FBQzVDLGlCQUFPLGVBQWUsUUFBVyxRQUFRLEtBQUs7QUFBQSxRQUNoRDtBQUFBLE1BQ0Y7QUFHQSxlQUFTLGdCQUFnQixNQUFNO0FBQzdCLFlBQUksUUFBUSxTQUFTO0FBQ25CLGlCQUFPLGVBQWUsUUFBUSxPQUFPLFFBQVEsS0FBSztBQUFBLFFBQ3BELFdBQVcsUUFBUSxTQUFTO0FBQzFCLGlCQUFPLGVBQWUsUUFBVyxRQUFRLEtBQUs7QUFBQSxRQUNoRDtBQUFBLE1BQ0Y7QUFFQSxVQUFJLFdBQVc7QUFBQSxRQUNiLE9BQU87QUFBQSxRQUNQLFVBQVU7QUFBQSxRQUNWLFFBQVE7QUFBQSxRQUNSLFdBQVc7QUFBQSxRQUNYLG9CQUFvQjtBQUFBLFFBQ3BCLHFCQUFxQjtBQUFBLFFBQ3JCLG9CQUFvQjtBQUFBLFFBQ3BCLFdBQVc7QUFBQSxRQUNYLGtCQUFrQjtBQUFBLFFBQ2xCLG1CQUFtQjtBQUFBLFFBQ25CLFdBQVc7QUFBQSxRQUNYLGdCQUFnQjtBQUFBLFFBQ2hCLGtCQUFrQjtBQUFBLFFBQ2xCLGtCQUFrQjtBQUFBLFFBQ2xCLG9CQUFvQjtBQUFBLFFBQ3BCLHNCQUFzQjtBQUFBLFFBQ3RCLGNBQWM7QUFBQSxRQUNkLG9CQUFvQjtBQUFBLFFBQ3BCLGlCQUFpQjtBQUFBLFFBQ2pCLGtCQUFrQjtBQUFBLFFBQ2xCLGFBQWE7QUFBQSxRQUNiLGFBQWE7QUFBQSxRQUNiLGNBQWM7QUFBQSxRQUNkLGVBQWU7QUFBQSxRQUNmLGNBQWM7QUFBQSxRQUNkLG9CQUFvQjtBQUFBLFFBQ3BCLGtCQUFrQjtBQUFBLE1BQ3BCO0FBRUEsWUFBTSxRQUFRLE9BQU8sS0FBSyxPQUFPLEVBQUUsT0FBTyxPQUFPLEtBQUssT0FBTyxDQUFDLEdBQUcsU0FBUyxtQkFBbUIsTUFBTTtBQUNqRyxZQUFJLFFBQVEsU0FBUyxTQUFTO0FBQzlCLFlBQUksY0FBYyxNQUFNLElBQUk7QUFDNUIsUUFBQyxNQUFNLFlBQVksV0FBVyxLQUFLLFVBQVUsb0JBQXFCLE9BQU8sUUFBUTtBQUFBLE1BQ25GLENBQUM7QUFFRCxhQUFPO0FBQUEsSUFDVDtBQUFBO0FBQUE7OztBQ25HQTtBQUFBO0FBQUEsV0FBTyxVQUFVO0FBQUEsTUFDZixXQUFXO0FBQUEsSUFDYjtBQUFBO0FBQUE7OztBQ0ZBO0FBQUE7QUFBQTtBQUVBLFFBQUksVUFBVSxlQUF1QjtBQUNyQyxRQUFJLGFBQWE7QUFFakIsUUFBSSxhQUFhLENBQUM7QUFHbEIsS0FBQyxVQUFVLFdBQVcsVUFBVSxZQUFZLFVBQVUsUUFBUSxFQUFFLFFBQVEsU0FBUyxNQUFNQyxJQUFHO0FBQ3hGLGlCQUFXLFFBQVEsU0FBUyxVQUFVLE9BQU87QUFDM0MsZUFBTyxPQUFPLFVBQVUsUUFBUSxPQUFPQSxLQUFJLElBQUksT0FBTyxPQUFPO0FBQUEsTUFDL0Q7QUFBQSxJQUNGLENBQUM7QUFFRCxRQUFJLHFCQUFxQixDQUFDO0FBUzFCLGVBQVcsZUFBZSxTQUFTLGFBQWEsV0FBVyxTQUFTLFNBQVM7QUFDM0UsZUFBUyxjQUFjLEtBQUssTUFBTTtBQUNoQyxlQUFPLGFBQWEsVUFBVSw0QkFBNkIsTUFBTSxNQUFPLFFBQVEsVUFBVSxPQUFPLFVBQVU7QUFBQSxNQUM3RztBQUdBLGFBQU8sU0FBU0MsUUFBTyxLQUFLLE1BQU07QUFDaEMsWUFBSSxjQUFjLE9BQU87QUFDdkIsZ0JBQU0sSUFBSTtBQUFBLFlBQ1IsY0FBYyxLQUFLLHVCQUF1QixVQUFVLFNBQVMsVUFBVSxHQUFHO0FBQUEsWUFDMUUsV0FBVztBQUFBLFVBQ2I7QUFBQSxRQUNGO0FBRUEsWUFBSSxXQUFXLENBQUMsbUJBQW1CLE1BQU07QUFDdkMsNkJBQW1CLE9BQU87QUFFMUIsa0JBQVE7QUFBQSxZQUNOO0FBQUEsY0FDRTtBQUFBLGNBQ0EsaUNBQWlDLFVBQVU7QUFBQSxZQUM3QztBQUFBLFVBQ0Y7QUFBQSxRQUNGO0FBRUEsZUFBTyxZQUFZLFVBQVVBLFFBQU8sS0FBSyxJQUFJLElBQUk7QUFBQSxNQUNuRDtBQUFBLElBQ0Y7QUFTQSxhQUFTLGNBQWMsU0FBUyxRQUFRLGNBQWM7QUFDcEQsVUFBSSxPQUFPLFlBQVksVUFBVTtBQUMvQixjQUFNLElBQUksV0FBVyw2QkFBNkIsV0FBVyxvQkFBb0I7QUFBQSxNQUNuRjtBQUNBLFVBQUksT0FBTyxPQUFPLEtBQUssT0FBTztBQUM5QixVQUFJRCxLQUFJLEtBQUs7QUFDYixhQUFPQSxPQUFNLEdBQUc7QUFDZCxZQUFJLE1BQU0sS0FBS0E7QUFDZixZQUFJLFlBQVksT0FBTztBQUN2QixZQUFJLFdBQVc7QUFDYixjQUFJQyxTQUFRLFFBQVE7QUFDcEIsY0FBSSxTQUFTQSxXQUFVLFVBQWEsVUFBVUEsUUFBTyxLQUFLLE9BQU87QUFDakUsY0FBSSxXQUFXLE1BQU07QUFDbkIsa0JBQU0sSUFBSSxXQUFXLFlBQVksTUFBTSxjQUFjLFFBQVEsV0FBVyxvQkFBb0I7QUFBQSxVQUM5RjtBQUNBO0FBQUEsUUFDRjtBQUNBLFlBQUksaUJBQWlCLE1BQU07QUFDekIsZ0JBQU0sSUFBSSxXQUFXLG9CQUFvQixLQUFLLFdBQVcsY0FBYztBQUFBLFFBQ3pFO0FBQUEsTUFDRjtBQUFBLElBQ0Y7QUFFQSxXQUFPLFVBQVU7QUFBQSxNQUNmO0FBQUEsTUFDQTtBQUFBLElBQ0Y7QUFBQTtBQUFBOzs7QUNyRkE7QUFBQTtBQUFBO0FBRUEsUUFBSSxRQUFRO0FBQ1osUUFBSSxXQUFXO0FBQ2YsUUFBSSxxQkFBcUI7QUFDekIsUUFBSSxrQkFBa0I7QUFDdEIsUUFBSSxjQUFjO0FBQ2xCLFFBQUksZ0JBQWdCO0FBQ3BCLFFBQUksWUFBWTtBQUVoQixRQUFJLGFBQWEsVUFBVTtBQU0zQixhQUFTLE1BQU0sZ0JBQWdCO0FBQzdCLFdBQUssV0FBVztBQUNoQixXQUFLLGVBQWU7QUFBQSxRQUNsQixTQUFTLElBQUksbUJBQW1CO0FBQUEsUUFDaEMsVUFBVSxJQUFJLG1CQUFtQjtBQUFBLE1BQ25DO0FBQUEsSUFDRjtBQU9BLFVBQU0sVUFBVSxVQUFVLFNBQVMsUUFBUSxhQUFhLFFBQVE7QUFHOUQsVUFBSSxPQUFPLGdCQUFnQixVQUFVO0FBQ25DLGlCQUFTLFVBQVUsQ0FBQztBQUNwQixlQUFPLE1BQU07QUFBQSxNQUNmLE9BQU87QUFDTCxpQkFBUyxlQUFlLENBQUM7QUFBQSxNQUMzQjtBQUVBLGVBQVMsWUFBWSxLQUFLLFVBQVUsTUFBTTtBQUcxQyxVQUFJLE9BQU8sUUFBUTtBQUNqQixlQUFPLFNBQVMsT0FBTyxPQUFPLFlBQVk7QUFBQSxNQUM1QyxXQUFXLEtBQUssU0FBUyxRQUFRO0FBQy9CLGVBQU8sU0FBUyxLQUFLLFNBQVMsT0FBTyxZQUFZO0FBQUEsTUFDbkQsT0FBTztBQUNMLGVBQU8sU0FBUztBQUFBLE1BQ2xCO0FBRUEsVUFBSSxlQUFlLE9BQU87QUFFMUIsVUFBSSxpQkFBaUIsUUFBVztBQUM5QixrQkFBVSxjQUFjLGNBQWM7QUFBQSxVQUNwQyxtQkFBbUIsV0FBVyxhQUFhLFdBQVcsT0FBTztBQUFBLFVBQzdELG1CQUFtQixXQUFXLGFBQWEsV0FBVyxPQUFPO0FBQUEsVUFDN0QscUJBQXFCLFdBQVcsYUFBYSxXQUFXLE9BQU87QUFBQSxRQUNqRSxHQUFHLEtBQUs7QUFBQSxNQUNWO0FBR0EsVUFBSSwwQkFBMEIsQ0FBQztBQUMvQixVQUFJLGlDQUFpQztBQUNyQyxXQUFLLGFBQWEsUUFBUSxRQUFRLFNBQVMsMkJBQTJCLGFBQWE7QUFDakYsWUFBSSxPQUFPLFlBQVksWUFBWSxjQUFjLFlBQVksUUFBUSxNQUFNLE1BQU0sT0FBTztBQUN0RjtBQUFBLFFBQ0Y7QUFFQSx5Q0FBaUMsa0NBQWtDLFlBQVk7QUFFL0UsZ0NBQXdCLFFBQVEsWUFBWSxXQUFXLFlBQVksUUFBUTtBQUFBLE1BQzdFLENBQUM7QUFFRCxVQUFJLDJCQUEyQixDQUFDO0FBQ2hDLFdBQUssYUFBYSxTQUFTLFFBQVEsU0FBUyx5QkFBeUIsYUFBYTtBQUNoRixpQ0FBeUIsS0FBSyxZQUFZLFdBQVcsWUFBWSxRQUFRO0FBQUEsTUFDM0UsQ0FBQztBQUVELFVBQUk7QUFFSixVQUFJLENBQUMsZ0NBQWdDO0FBQ25DLFlBQUksUUFBUSxDQUFDLGlCQUFpQixNQUFTO0FBRXZDLGNBQU0sVUFBVSxRQUFRLE1BQU0sT0FBTyx1QkFBdUI7QUFDNUQsZ0JBQVEsTUFBTSxPQUFPLHdCQUF3QjtBQUU3QyxrQkFBVSxRQUFRLFFBQVEsTUFBTTtBQUNoQyxlQUFPLE1BQU0sUUFBUTtBQUNuQixvQkFBVSxRQUFRLEtBQUssTUFBTSxNQUFNLEdBQUcsTUFBTSxNQUFNLENBQUM7QUFBQSxRQUNyRDtBQUVBLGVBQU87QUFBQSxNQUNUO0FBR0EsVUFBSSxZQUFZO0FBQ2hCLGFBQU8sd0JBQXdCLFFBQVE7QUFDckMsWUFBSSxjQUFjLHdCQUF3QixNQUFNO0FBQ2hELFlBQUksYUFBYSx3QkFBd0IsTUFBTTtBQUMvQyxZQUFJO0FBQ0Ysc0JBQVksWUFBWSxTQUFTO0FBQUEsUUFDbkMsU0FBUyxPQUFQO0FBQ0EscUJBQVcsS0FBSztBQUNoQjtBQUFBLFFBQ0Y7QUFBQSxNQUNGO0FBRUEsVUFBSTtBQUNGLGtCQUFVLGdCQUFnQixTQUFTO0FBQUEsTUFDckMsU0FBUyxPQUFQO0FBQ0EsZUFBTyxRQUFRLE9BQU8sS0FBSztBQUFBLE1BQzdCO0FBRUEsYUFBTyx5QkFBeUIsUUFBUTtBQUN0QyxrQkFBVSxRQUFRLEtBQUsseUJBQXlCLE1BQU0sR0FBRyx5QkFBeUIsTUFBTSxDQUFDO0FBQUEsTUFDM0Y7QUFFQSxhQUFPO0FBQUEsSUFDVDtBQUVBLFVBQU0sVUFBVSxTQUFTLFNBQVMsT0FBTyxRQUFRO0FBQy9DLGVBQVMsWUFBWSxLQUFLLFVBQVUsTUFBTTtBQUMxQyxVQUFJLFdBQVcsY0FBYyxPQUFPLFNBQVMsT0FBTyxHQUFHO0FBQ3ZELGFBQU8sU0FBUyxVQUFVLE9BQU8sUUFBUSxPQUFPLGdCQUFnQjtBQUFBLElBQ2xFO0FBR0EsVUFBTSxRQUFRLENBQUMsVUFBVSxPQUFPLFFBQVEsU0FBUyxHQUFHLFNBQVMsb0JBQW9CLFFBQVE7QUFFdkYsWUFBTSxVQUFVLFVBQVUsU0FBU0MsTUFBSyxRQUFRO0FBQzlDLGVBQU8sS0FBSyxRQUFRLFlBQVksVUFBVSxDQUFDLEdBQUc7QUFBQSxVQUM1QztBQUFBLFVBQ0EsS0FBS0E7QUFBQSxVQUNMLE9BQU8sVUFBVSxDQUFDLEdBQUc7QUFBQSxRQUN2QixDQUFDLENBQUM7QUFBQSxNQUNKO0FBQUEsSUFDRixDQUFDO0FBRUQsVUFBTSxRQUFRLENBQUMsUUFBUSxPQUFPLE9BQU8sR0FBRyxTQUFTLHNCQUFzQixRQUFRO0FBRzdFLGVBQVMsbUJBQW1CLFFBQVE7QUFDbEMsZUFBTyxTQUFTLFdBQVdBLE1BQUssTUFBTSxRQUFRO0FBQzVDLGlCQUFPLEtBQUssUUFBUSxZQUFZLFVBQVUsQ0FBQyxHQUFHO0FBQUEsWUFDNUM7QUFBQSxZQUNBLFNBQVMsU0FBUztBQUFBLGNBQ2hCLGdCQUFnQjtBQUFBLFlBQ2xCLElBQUksQ0FBQztBQUFBLFlBQ0wsS0FBS0E7QUFBQSxZQUNMO0FBQUEsVUFDRixDQUFDLENBQUM7QUFBQSxRQUNKO0FBQUEsTUFDRjtBQUVBLFlBQU0sVUFBVSxVQUFVLG1CQUFtQjtBQUU3QyxZQUFNLFVBQVUsU0FBUyxVQUFVLG1CQUFtQixJQUFJO0FBQUEsSUFDNUQsQ0FBQztBQUVELFdBQU8sVUFBVTtBQUFBO0FBQUE7OztBQy9KakI7QUFBQTtBQUFBO0FBRUEsUUFBSSxnQkFBZ0I7QUFRcEIsYUFBUyxZQUFZLFVBQVU7QUFDN0IsVUFBSSxPQUFPLGFBQWEsWUFBWTtBQUNsQyxjQUFNLElBQUksVUFBVSw4QkFBOEI7QUFBQSxNQUNwRDtBQUVBLFVBQUk7QUFFSixXQUFLLFVBQVUsSUFBSSxRQUFRLFNBQVMsZ0JBQWdCLFNBQVM7QUFDM0QseUJBQWlCO0FBQUEsTUFDbkIsQ0FBQztBQUVELFVBQUksUUFBUTtBQUdaLFdBQUssUUFBUSxLQUFLLFNBQVMsUUFBUTtBQUNqQyxZQUFJLENBQUMsTUFBTTtBQUFZO0FBRXZCLFlBQUlDO0FBQ0osWUFBSSxJQUFJLE1BQU0sV0FBVztBQUV6QixhQUFLQSxLQUFJLEdBQUdBLEtBQUksR0FBR0EsTUFBSztBQUN0QixnQkFBTSxXQUFXQSxJQUFHLE1BQU07QUFBQSxRQUM1QjtBQUNBLGNBQU0sYUFBYTtBQUFBLE1BQ3JCLENBQUM7QUFHRCxXQUFLLFFBQVEsT0FBTyxTQUFTLGFBQWE7QUFDeEMsWUFBSTtBQUVKLFlBQUksVUFBVSxJQUFJLFFBQVEsU0FBUyxTQUFTO0FBQzFDLGdCQUFNLFVBQVUsT0FBTztBQUN2QixxQkFBVztBQUFBLFFBQ2IsQ0FBQyxFQUFFLEtBQUssV0FBVztBQUVuQixnQkFBUSxTQUFTLFNBQVMsU0FBUztBQUNqQyxnQkFBTSxZQUFZLFFBQVE7QUFBQSxRQUM1QjtBQUVBLGVBQU87QUFBQSxNQUNUO0FBRUEsZUFBUyxTQUFTLE9BQU8sU0FBUztBQUNoQyxZQUFJLE1BQU0sUUFBUTtBQUVoQjtBQUFBLFFBQ0Y7QUFFQSxjQUFNLFNBQVMsSUFBSSxjQUFjLE9BQU87QUFDeEMsdUJBQWUsTUFBTSxNQUFNO0FBQUEsTUFDN0IsQ0FBQztBQUFBLElBQ0g7QUFLQSxnQkFBWSxVQUFVLG1CQUFtQixTQUFTLG1CQUFtQjtBQUNuRSxVQUFJLEtBQUssUUFBUTtBQUNmLGNBQU0sS0FBSztBQUFBLE1BQ2I7QUFBQSxJQUNGO0FBTUEsZ0JBQVksVUFBVSxZQUFZLFNBQVMsVUFBVSxVQUFVO0FBQzdELFVBQUksS0FBSyxRQUFRO0FBQ2YsaUJBQVMsS0FBSyxNQUFNO0FBQ3BCO0FBQUEsTUFDRjtBQUVBLFVBQUksS0FBSyxZQUFZO0FBQ25CLGFBQUssV0FBVyxLQUFLLFFBQVE7QUFBQSxNQUMvQixPQUFPO0FBQ0wsYUFBSyxhQUFhLENBQUMsUUFBUTtBQUFBLE1BQzdCO0FBQUEsSUFDRjtBQU1BLGdCQUFZLFVBQVUsY0FBYyxTQUFTLFlBQVksVUFBVTtBQUNqRSxVQUFJLENBQUMsS0FBSyxZQUFZO0FBQ3BCO0FBQUEsTUFDRjtBQUNBLFVBQUksUUFBUSxLQUFLLFdBQVcsUUFBUSxRQUFRO0FBQzVDLFVBQUksVUFBVSxJQUFJO0FBQ2hCLGFBQUssV0FBVyxPQUFPLE9BQU8sQ0FBQztBQUFBLE1BQ2pDO0FBQUEsSUFDRjtBQU1BLGdCQUFZLFNBQVMsU0FBUyxTQUFTO0FBQ3JDLFVBQUk7QUFDSixVQUFJLFFBQVEsSUFBSSxZQUFZLFNBQVMsU0FBUyxHQUFHO0FBQy9DLGlCQUFTO0FBQUEsTUFDWCxDQUFDO0FBQ0QsYUFBTztBQUFBLFFBQ0w7QUFBQSxRQUNBO0FBQUEsTUFDRjtBQUFBLElBQ0Y7QUFFQSxXQUFPLFVBQVU7QUFBQTtBQUFBOzs7QUN0SGpCO0FBQUE7QUFBQTtBQXNCQSxXQUFPLFVBQVUsU0FBUyxPQUFPLFVBQVU7QUFDekMsYUFBTyxTQUFTLEtBQUssS0FBSztBQUN4QixlQUFPLFNBQVMsTUFBTSxNQUFNLEdBQUc7QUFBQSxNQUNqQztBQUFBLElBQ0Y7QUFBQTtBQUFBOzs7QUMxQkE7QUFBQTtBQUFBO0FBRUEsUUFBSSxRQUFRO0FBUVosV0FBTyxVQUFVLFNBQVMsYUFBYSxTQUFTO0FBQzlDLGFBQU8sTUFBTSxTQUFTLE9BQU8sS0FBTSxRQUFRLGlCQUFpQjtBQUFBLElBQzlEO0FBQUE7QUFBQTs7O0FDWkE7QUFBQTtBQUFBO0FBRUEsUUFBSSxRQUFRO0FBQ1osUUFBSSxPQUFPO0FBQ1gsUUFBSSxRQUFRO0FBQ1osUUFBSSxjQUFjO0FBQ2xCLFFBQUksV0FBVztBQVFmLGFBQVMsZUFBZSxlQUFlO0FBQ3JDLFVBQUksVUFBVSxJQUFJLE1BQU0sYUFBYTtBQUNyQyxVQUFJLFdBQVcsS0FBSyxNQUFNLFVBQVUsU0FBUyxPQUFPO0FBR3BELFlBQU0sT0FBTyxVQUFVLE1BQU0sV0FBVyxPQUFPO0FBRy9DLFlBQU0sT0FBTyxVQUFVLE9BQU87QUFHOUIsZUFBUyxTQUFTLFNBQVMsT0FBTyxnQkFBZ0I7QUFDaEQsZUFBTyxlQUFlLFlBQVksZUFBZSxjQUFjLENBQUM7QUFBQSxNQUNsRTtBQUVBLGFBQU87QUFBQSxJQUNUO0FBR0EsUUFBSUMsU0FBUSxlQUFlLFFBQVE7QUFHbkMsSUFBQUEsT0FBTSxRQUFRO0FBR2QsSUFBQUEsT0FBTSxnQkFBZ0I7QUFDdEIsSUFBQUEsT0FBTSxjQUFjO0FBQ3BCLElBQUFBLE9BQU0sV0FBVztBQUNqQixJQUFBQSxPQUFNLFVBQVUsZUFBc0I7QUFDdEMsSUFBQUEsT0FBTSxhQUFhO0FBR25CLElBQUFBLE9BQU0sYUFBYTtBQUduQixJQUFBQSxPQUFNLFNBQVNBLE9BQU07QUFHckIsSUFBQUEsT0FBTSxNQUFNLFNBQVMsSUFBSSxVQUFVO0FBQ2pDLGFBQU8sUUFBUSxJQUFJLFFBQVE7QUFBQSxJQUM3QjtBQUNBLElBQUFBLE9BQU0sU0FBUztBQUdmLElBQUFBLE9BQU0sZUFBZTtBQUVyQixXQUFPLFVBQVVBO0FBR2pCLFdBQU8sUUFBUSxVQUFVQTtBQUFBO0FBQUE7OztBQy9EekIsSUFBQUMsaUJBQUE7QUFBQTtBQUFBLFdBQU8sVUFBVTtBQUFBO0FBQUE7OztBQ0FqQixJQUFNLGVBQWUsdUJBQU8sT0FBTyxJQUFJO0FBQ3ZDLGFBQWEsVUFBVTtBQUN2QixhQUFhLFdBQVc7QUFDeEIsYUFBYSxVQUFVO0FBQ3ZCLGFBQWEsVUFBVTtBQUN2QixhQUFhLGFBQWE7QUFDMUIsYUFBYSxhQUFhO0FBQzFCLGFBQWEsVUFBVTtBQUN2QixJQUFNLHVCQUF1Qix1QkFBTyxPQUFPLElBQUk7QUFDL0MsT0FBTyxLQUFLLFlBQVksRUFBRSxRQUFRLFNBQU87QUFDckMsdUJBQXFCLGFBQWEsUUFBUTtBQUM5QyxDQUFDO0FBQ0QsSUFBTSxlQUFlLEVBQUUsTUFBTSxTQUFTLE1BQU0sZUFBZTs7O0FDWDNELElBQU0saUJBQWlCLE9BQU8sU0FBUyxjQUNsQyxPQUFPLFNBQVMsZUFDYixPQUFPLFVBQVUsU0FBUyxLQUFLLElBQUksTUFBTTtBQUNqRCxJQUFNLHdCQUF3QixPQUFPLGdCQUFnQjtBQUVyRCxJQUFNLFNBQVMsU0FBTztBQUNsQixTQUFPLE9BQU8sWUFBWSxXQUFXLGFBQy9CLFlBQVksT0FBTyxHQUFHLElBQ3RCLE9BQU8sSUFBSSxrQkFBa0I7QUFDdkM7QUFDQSxJQUFNLGVBQWUsQ0FBQyxFQUFFLE1BQU0sS0FBSyxHQUFHLGdCQUFnQixhQUFhO0FBQy9ELE1BQUksa0JBQWtCLGdCQUFnQixNQUFNO0FBQ3hDLFFBQUksZ0JBQWdCO0FBQ2hCLGFBQU8sU0FBUyxJQUFJO0FBQUEsSUFDeEIsT0FDSztBQUNELGFBQU8sbUJBQW1CLE1BQU0sUUFBUTtBQUFBLElBQzVDO0FBQUEsRUFDSixXQUNTLDBCQUNKLGdCQUFnQixlQUFlLE9BQU8sSUFBSSxJQUFJO0FBQy9DLFFBQUksZ0JBQWdCO0FBQ2hCLGFBQU8sU0FBUyxJQUFJO0FBQUEsSUFDeEIsT0FDSztBQUNELGFBQU8sbUJBQW1CLElBQUksS0FBSyxDQUFDLElBQUksQ0FBQyxHQUFHLFFBQVE7QUFBQSxJQUN4RDtBQUFBLEVBQ0o7QUFFQSxTQUFPLFNBQVMsYUFBYSxTQUFTLFFBQVEsR0FBRztBQUNyRDtBQUNBLElBQU0scUJBQXFCLENBQUMsTUFBTSxhQUFhO0FBQzNDLFFBQU0sYUFBYSxJQUFJLFdBQVc7QUFDbEMsYUFBVyxTQUFTLFdBQVk7QUFDNUIsVUFBTSxVQUFVLFdBQVcsT0FBTyxNQUFNLEdBQUcsRUFBRTtBQUM3QyxhQUFTLE1BQU0sT0FBTztBQUFBLEVBQzFCO0FBQ0EsU0FBTyxXQUFXLGNBQWMsSUFBSTtBQUN4QztBQUNBLElBQU8sK0JBQVE7OztBQ3hDZixJQUFNLFFBQVE7QUFFZCxJQUFNLFNBQVMsT0FBTyxlQUFlLGNBQWMsQ0FBQyxJQUFJLElBQUksV0FBVyxHQUFHO0FBQzFFLFNBQVNDLEtBQUksR0FBR0EsS0FBSSxNQUFNLFFBQVFBLE1BQUs7QUFDbkMsU0FBTyxNQUFNLFdBQVdBLEVBQUMsS0FBS0E7QUFDbEM7QUFpQk8sSUFBTSxTQUFTLENBQUMsV0FBVztBQUM5QixNQUFJLGVBQWUsT0FBTyxTQUFTLE1BQU0sTUFBTSxPQUFPLFFBQVFDLElBQUcsSUFBSSxHQUFHLFVBQVUsVUFBVSxVQUFVO0FBQ3RHLE1BQUksT0FBTyxPQUFPLFNBQVMsT0FBTyxLQUFLO0FBQ25DO0FBQ0EsUUFBSSxPQUFPLE9BQU8sU0FBUyxPQUFPLEtBQUs7QUFDbkM7QUFBQSxJQUNKO0FBQUEsRUFDSjtBQUNBLFFBQU0sY0FBYyxJQUFJLFlBQVksWUFBWSxHQUFHLFFBQVEsSUFBSSxXQUFXLFdBQVc7QUFDckYsT0FBS0EsS0FBSSxHQUFHQSxLQUFJLEtBQUtBLE1BQUssR0FBRztBQUN6QixlQUFXLE9BQU8sT0FBTyxXQUFXQSxFQUFDO0FBQ3JDLGVBQVcsT0FBTyxPQUFPLFdBQVdBLEtBQUksQ0FBQztBQUN6QyxlQUFXLE9BQU8sT0FBTyxXQUFXQSxLQUFJLENBQUM7QUFDekMsZUFBVyxPQUFPLE9BQU8sV0FBV0EsS0FBSSxDQUFDO0FBQ3pDLFVBQU0sT0FBUSxZQUFZLElBQU0sWUFBWTtBQUM1QyxVQUFNLFFBQVMsV0FBVyxPQUFPLElBQU0sWUFBWTtBQUNuRCxVQUFNLFFBQVMsV0FBVyxNQUFNLElBQU0sV0FBVztBQUFBLEVBQ3JEO0FBQ0EsU0FBTztBQUNYOzs7QUN2Q0EsSUFBTUMseUJBQXdCLE9BQU8sZ0JBQWdCO0FBQ3JELElBQU0sZUFBZSxDQUFDLGVBQWUsZUFBZTtBQUNoRCxNQUFJLE9BQU8sa0JBQWtCLFVBQVU7QUFDbkMsV0FBTztBQUFBLE1BQ0gsTUFBTTtBQUFBLE1BQ04sTUFBTSxVQUFVLGVBQWUsVUFBVTtBQUFBLElBQzdDO0FBQUEsRUFDSjtBQUNBLFFBQU0sT0FBTyxjQUFjLE9BQU8sQ0FBQztBQUNuQyxNQUFJLFNBQVMsS0FBSztBQUNkLFdBQU87QUFBQSxNQUNILE1BQU07QUFBQSxNQUNOLE1BQU0sbUJBQW1CLGNBQWMsVUFBVSxDQUFDLEdBQUcsVUFBVTtBQUFBLElBQ25FO0FBQUEsRUFDSjtBQUNBLFFBQU0sYUFBYSxxQkFBcUI7QUFDeEMsTUFBSSxDQUFDLFlBQVk7QUFDYixXQUFPO0FBQUEsRUFDWDtBQUNBLFNBQU8sY0FBYyxTQUFTLElBQ3hCO0FBQUEsSUFDRSxNQUFNLHFCQUFxQjtBQUFBLElBQzNCLE1BQU0sY0FBYyxVQUFVLENBQUM7QUFBQSxFQUNuQyxJQUNFO0FBQUEsSUFDRSxNQUFNLHFCQUFxQjtBQUFBLEVBQy9CO0FBQ1I7QUFDQSxJQUFNLHFCQUFxQixDQUFDLE1BQU0sZUFBZTtBQUM3QyxNQUFJQSx3QkFBdUI7QUFDdkIsVUFBTSxVQUFVLE9BQU8sSUFBSTtBQUMzQixXQUFPLFVBQVUsU0FBUyxVQUFVO0FBQUEsRUFDeEMsT0FDSztBQUNELFdBQU8sRUFBRSxRQUFRLE1BQU0sS0FBSztBQUFBLEVBQ2hDO0FBQ0o7QUFDQSxJQUFNLFlBQVksQ0FBQyxNQUFNLGVBQWU7QUFDcEMsVUFBUTtBQUFBLFNBQ0M7QUFDRCxhQUFPLGdCQUFnQixjQUFjLElBQUksS0FBSyxDQUFDLElBQUksQ0FBQyxJQUFJO0FBQUEsU0FDdkQ7QUFBQTtBQUVELGFBQU87QUFBQTtBQUVuQjtBQUNBLElBQU8sK0JBQVE7OztBQzlDZixJQUFNLFlBQVksT0FBTyxhQUFhLEVBQUU7QUFDeEMsSUFBTSxnQkFBZ0IsQ0FBQyxTQUFTLGFBQWE7QUFFekMsUUFBTUMsVUFBUyxRQUFRO0FBQ3ZCLFFBQU0saUJBQWlCLElBQUksTUFBTUEsT0FBTTtBQUN2QyxNQUFJLFFBQVE7QUFDWixVQUFRLFFBQVEsQ0FBQyxRQUFRQyxPQUFNO0FBRTNCLGlDQUFhLFFBQVEsT0FBTyxtQkFBaUI7QUFDekMscUJBQWVBLE1BQUs7QUFDcEIsVUFBSSxFQUFFLFVBQVVELFNBQVE7QUFDcEIsaUJBQVMsZUFBZSxLQUFLLFNBQVMsQ0FBQztBQUFBLE1BQzNDO0FBQUEsSUFDSixDQUFDO0FBQUEsRUFDTCxDQUFDO0FBQ0w7QUFDQSxJQUFNLGdCQUFnQixDQUFDLGdCQUFnQixlQUFlO0FBQ2xELFFBQU0saUJBQWlCLGVBQWUsTUFBTSxTQUFTO0FBQ3JELFFBQU0sVUFBVSxDQUFDO0FBQ2pCLFdBQVNDLEtBQUksR0FBR0EsS0FBSSxlQUFlLFFBQVFBLE1BQUs7QUFDNUMsVUFBTSxnQkFBZ0IsNkJBQWEsZUFBZUEsS0FBSSxVQUFVO0FBQ2hFLFlBQVEsS0FBSyxhQUFhO0FBQzFCLFFBQUksY0FBYyxTQUFTLFNBQVM7QUFDaEM7QUFBQSxJQUNKO0FBQUEsRUFDSjtBQUNBLFNBQU87QUFDWDtBQUNPLElBQU0sV0FBVzs7O0FDeEJqQixTQUFTLFFBQVEsS0FBSztBQUMzQixNQUFJO0FBQUssV0FBTyxNQUFNLEdBQUc7QUFDM0I7QUFVQSxTQUFTLE1BQU0sS0FBSztBQUNsQixXQUFTLE9BQU8sUUFBUSxXQUFXO0FBQ2pDLFFBQUksT0FBTyxRQUFRLFVBQVU7QUFBQSxFQUMvQjtBQUNBLFNBQU87QUFDVDtBQVdBLFFBQVEsVUFBVSxLQUNsQixRQUFRLFVBQVUsbUJBQW1CLFNBQVMsT0FBTyxJQUFHO0FBQ3RELE9BQUssYUFBYSxLQUFLLGNBQWMsQ0FBQztBQUN0QyxHQUFDLEtBQUssV0FBVyxNQUFNLFNBQVMsS0FBSyxXQUFXLE1BQU0sVUFBVSxDQUFDLEdBQzlELEtBQUssRUFBRTtBQUNWLFNBQU87QUFDVDtBQVlBLFFBQVEsVUFBVSxPQUFPLFNBQVMsT0FBTyxJQUFHO0FBQzFDLFdBQVNDLE1BQUs7QUFDWixTQUFLLElBQUksT0FBT0EsR0FBRTtBQUNsQixPQUFHLE1BQU0sTUFBTSxTQUFTO0FBQUEsRUFDMUI7QUFFQSxFQUFBQSxJQUFHLEtBQUs7QUFDUixPQUFLLEdBQUcsT0FBT0EsR0FBRTtBQUNqQixTQUFPO0FBQ1Q7QUFZQSxRQUFRLFVBQVUsTUFDbEIsUUFBUSxVQUFVLGlCQUNsQixRQUFRLFVBQVUscUJBQ2xCLFFBQVEsVUFBVSxzQkFBc0IsU0FBUyxPQUFPLElBQUc7QUFDekQsT0FBSyxhQUFhLEtBQUssY0FBYyxDQUFDO0FBR3RDLE1BQUksS0FBSyxVQUFVLFFBQVE7QUFDekIsU0FBSyxhQUFhLENBQUM7QUFDbkIsV0FBTztBQUFBLEVBQ1Q7QUFHQSxNQUFJLFlBQVksS0FBSyxXQUFXLE1BQU07QUFDdEMsTUFBSSxDQUFDO0FBQVcsV0FBTztBQUd2QixNQUFJLEtBQUssVUFBVSxRQUFRO0FBQ3pCLFdBQU8sS0FBSyxXQUFXLE1BQU07QUFDN0IsV0FBTztBQUFBLEVBQ1Q7QUFHQSxNQUFJO0FBQ0osV0FBU0MsS0FBSSxHQUFHQSxLQUFJLFVBQVUsUUFBUUEsTUFBSztBQUN6QyxTQUFLLFVBQVVBO0FBQ2YsUUFBSSxPQUFPLE1BQU0sR0FBRyxPQUFPLElBQUk7QUFDN0IsZ0JBQVUsT0FBT0EsSUFBRyxDQUFDO0FBQ3JCO0FBQUEsSUFDRjtBQUFBLEVBQ0Y7QUFJQSxNQUFJLFVBQVUsV0FBVyxHQUFHO0FBQzFCLFdBQU8sS0FBSyxXQUFXLE1BQU07QUFBQSxFQUMvQjtBQUVBLFNBQU87QUFDVDtBQVVBLFFBQVEsVUFBVSxPQUFPLFNBQVMsT0FBTTtBQUN0QyxPQUFLLGFBQWEsS0FBSyxjQUFjLENBQUM7QUFFdEMsTUFBSSxPQUFPLElBQUksTUFBTSxVQUFVLFNBQVMsQ0FBQyxHQUNyQyxZQUFZLEtBQUssV0FBVyxNQUFNO0FBRXRDLFdBQVNBLEtBQUksR0FBR0EsS0FBSSxVQUFVLFFBQVFBLE1BQUs7QUFDekMsU0FBS0EsS0FBSSxLQUFLLFVBQVVBO0FBQUEsRUFDMUI7QUFFQSxNQUFJLFdBQVc7QUFDYixnQkFBWSxVQUFVLE1BQU0sQ0FBQztBQUM3QixhQUFTQSxLQUFJLEdBQUcsTUFBTSxVQUFVLFFBQVFBLEtBQUksS0FBSyxFQUFFQSxJQUFHO0FBQ3BELGdCQUFVQSxJQUFHLE1BQU0sTUFBTSxJQUFJO0FBQUEsSUFDL0I7QUFBQSxFQUNGO0FBRUEsU0FBTztBQUNUO0FBR0EsUUFBUSxVQUFVLGVBQWUsUUFBUSxVQUFVO0FBVW5ELFFBQVEsVUFBVSxZQUFZLFNBQVMsT0FBTTtBQUMzQyxPQUFLLGFBQWEsS0FBSyxjQUFjLENBQUM7QUFDdEMsU0FBTyxLQUFLLFdBQVcsTUFBTSxVQUFVLENBQUM7QUFDMUM7QUFVQSxRQUFRLFVBQVUsZUFBZSxTQUFTLE9BQU07QUFDOUMsU0FBTyxDQUFDLENBQUUsS0FBSyxVQUFVLEtBQUssRUFBRTtBQUNsQzs7O0FDeEtPLElBQU0sa0JBQWtCLE1BQU07QUFDakMsTUFBSSxPQUFPLFNBQVMsYUFBYTtBQUM3QixXQUFPO0FBQUEsRUFDWCxXQUNTLE9BQU8sV0FBVyxhQUFhO0FBQ3BDLFdBQU87QUFBQSxFQUNYLE9BQ0s7QUFDRCxXQUFPLFNBQVMsYUFBYSxFQUFFO0FBQUEsRUFDbkM7QUFDSixHQUFHOzs7QUNUSSxTQUFTLEtBQUssUUFBUSxNQUFNO0FBQy9CLFNBQU8sS0FBSyxPQUFPLENBQUMsS0FBSyxNQUFNO0FBQzNCLFFBQUksSUFBSSxlQUFlLENBQUMsR0FBRztBQUN2QixVQUFJLEtBQUssSUFBSTtBQUFBLElBQ2pCO0FBQ0EsV0FBTztBQUFBLEVBQ1gsR0FBRyxDQUFDLENBQUM7QUFDVDtBQUVBLElBQU0scUJBQXFCO0FBQzNCLElBQU0sdUJBQXVCO0FBQ3RCLFNBQVMsc0JBQXNCLEtBQUssTUFBTTtBQUM3QyxNQUFJLEtBQUssaUJBQWlCO0FBQ3RCLFFBQUksZUFBZSxtQkFBbUIsS0FBSyxjQUFVO0FBQ3JELFFBQUksaUJBQWlCLHFCQUFxQixLQUFLLGNBQVU7QUFBQSxFQUM3RCxPQUNLO0FBQ0QsUUFBSSxlQUFlLFdBQVcsS0FBSyxjQUFVO0FBQzdDLFFBQUksaUJBQWlCLGFBQWEsS0FBSyxjQUFVO0FBQUEsRUFDckQ7QUFDSjtBQUVBLElBQU0sa0JBQWtCO0FBRWpCLFNBQVMsV0FBVyxLQUFLO0FBQzVCLE1BQUksT0FBTyxRQUFRLFVBQVU7QUFDekIsV0FBTyxXQUFXLEdBQUc7QUFBQSxFQUN6QjtBQUVBLFNBQU8sS0FBSyxNQUFNLElBQUksY0FBYyxJQUFJLFFBQVEsZUFBZTtBQUNuRTtBQUNBLFNBQVMsV0FBVyxLQUFLO0FBQ3JCLE1BQUksSUFBSSxHQUFHQyxVQUFTO0FBQ3BCLFdBQVNDLEtBQUksR0FBRyxJQUFJLElBQUksUUFBUUEsS0FBSSxHQUFHQSxNQUFLO0FBQ3hDLFFBQUksSUFBSSxXQUFXQSxFQUFDO0FBQ3BCLFFBQUksSUFBSSxLQUFNO0FBQ1YsTUFBQUQsV0FBVTtBQUFBLElBQ2QsV0FDUyxJQUFJLE1BQU87QUFDaEIsTUFBQUEsV0FBVTtBQUFBLElBQ2QsV0FDUyxJQUFJLFNBQVUsS0FBSyxPQUFRO0FBQ2hDLE1BQUFBLFdBQVU7QUFBQSxJQUNkLE9BQ0s7QUFDRCxNQUFBQztBQUNBLE1BQUFELFdBQVU7QUFBQSxJQUNkO0FBQUEsRUFDSjtBQUNBLFNBQU9BO0FBQ1g7OztBQ2hEQSxJQUFNLGlCQUFOLGNBQTZCLE1BQU07QUFBQSxFQUMvQixZQUFZLFFBQVEsYUFBYSxTQUFTO0FBQ3RDLFVBQU0sTUFBTTtBQUNaLFNBQUssY0FBYztBQUNuQixTQUFLLFVBQVU7QUFDZixTQUFLLE9BQU87QUFBQSxFQUNoQjtBQUNKO0FBQ08sSUFBTSxZQUFOLGNBQXdCLFFBQVE7QUFBQSxFQU9uQyxZQUFZLE1BQU07QUFDZCxVQUFNO0FBQ04sU0FBSyxXQUFXO0FBQ2hCLDBCQUFzQixNQUFNLElBQUk7QUFDaEMsU0FBSyxPQUFPO0FBQ1osU0FBSyxRQUFRLEtBQUs7QUFDbEIsU0FBSyxhQUFhO0FBQ2xCLFNBQUssU0FBUyxLQUFLO0FBQUEsRUFDdkI7QUFBQSxFQVVBLFFBQVEsUUFBUSxhQUFhLFNBQVM7QUFDbEMsVUFBTSxhQUFhLFNBQVMsSUFBSSxlQUFlLFFBQVEsYUFBYSxPQUFPLENBQUM7QUFDNUUsV0FBTztBQUFBLEVBQ1g7QUFBQSxFQU1BLE9BQU87QUFDSCxRQUFJLGFBQWEsS0FBSyxjQUFjLE9BQU8sS0FBSyxZQUFZO0FBQ3hELFdBQUssYUFBYTtBQUNsQixXQUFLLE9BQU87QUFBQSxJQUNoQjtBQUNBLFdBQU87QUFBQSxFQUNYO0FBQUEsRUFNQSxRQUFRO0FBQ0osUUFBSSxjQUFjLEtBQUssY0FBYyxXQUFXLEtBQUssWUFBWTtBQUM3RCxXQUFLLFFBQVE7QUFDYixXQUFLLFFBQVE7QUFBQSxJQUNqQjtBQUNBLFdBQU87QUFBQSxFQUNYO0FBQUEsRUFPQSxLQUFLLFNBQVM7QUFDVixRQUFJLFdBQVcsS0FBSyxZQUFZO0FBQzVCLFdBQUssTUFBTSxPQUFPO0FBQUEsSUFDdEIsT0FDSztBQUFBLElBRUw7QUFBQSxFQUNKO0FBQUEsRUFNQSxTQUFTO0FBQ0wsU0FBSyxhQUFhO0FBQ2xCLFNBQUssV0FBVztBQUNoQixVQUFNLGFBQWEsTUFBTTtBQUFBLEVBQzdCO0FBQUEsRUFPQSxPQUFPLE1BQU07QUFDVCxVQUFNLFNBQVMsNkJBQWEsTUFBTSxLQUFLLE9BQU8sVUFBVTtBQUN4RCxTQUFLLFNBQVMsTUFBTTtBQUFBLEVBQ3hCO0FBQUEsRUFNQSxTQUFTLFFBQVE7QUFDYixVQUFNLGFBQWEsVUFBVSxNQUFNO0FBQUEsRUFDdkM7QUFBQSxFQU1BLFFBQVEsU0FBUztBQUNiLFNBQUssYUFBYTtBQUNsQixVQUFNLGFBQWEsU0FBUyxPQUFPO0FBQUEsRUFDdkM7QUFDSjs7O0FDakhBLElBQU0sV0FBVyxtRUFBbUUsTUFBTSxFQUFFO0FBQTVGLElBQStGLFNBQVM7QUFBeEcsSUFBNEcsTUFBTSxDQUFDO0FBQ25ILElBQUksT0FBTztBQUFYLElBQWMsSUFBSTtBQUFsQixJQUFxQjtBQVFkLFNBQVMsT0FBTyxLQUFLO0FBQ3hCLE1BQUksVUFBVTtBQUNkLEtBQUc7QUFDQyxjQUFVLFNBQVMsTUFBTSxVQUFVO0FBQ25DLFVBQU0sS0FBSyxNQUFNLE1BQU0sTUFBTTtBQUFBLEVBQ2pDLFNBQVMsTUFBTTtBQUNmLFNBQU87QUFDWDtBQXFCTyxTQUFTLFFBQVE7QUFDcEIsUUFBTSxNQUFNLE9BQU8sQ0FBQyxJQUFJLEtBQUssQ0FBQztBQUM5QixNQUFJLFFBQVE7QUFDUixXQUFPLE9BQU8sR0FBRyxPQUFPO0FBQzVCLFNBQU8sTUFBTSxNQUFNLE9BQU8sTUFBTTtBQUNwQztBQUlBLE9BQU8sSUFBSSxRQUFRO0FBQ2YsTUFBSSxTQUFTLE1BQU07OztBQ3pDaEIsU0FBU0UsUUFBTyxLQUFLO0FBQ3hCLE1BQUksTUFBTTtBQUNWLFdBQVNDLE1BQUssS0FBSztBQUNmLFFBQUksSUFBSSxlQUFlQSxFQUFDLEdBQUc7QUFDdkIsVUFBSSxJQUFJO0FBQ0osZUFBTztBQUNYLGFBQU8sbUJBQW1CQSxFQUFDLElBQUksTUFBTSxtQkFBbUIsSUFBSUEsR0FBRTtBQUFBLElBQ2xFO0FBQUEsRUFDSjtBQUNBLFNBQU87QUFDWDtBQU9PLFNBQVNDLFFBQU8sSUFBSTtBQUN2QixNQUFJLE1BQU0sQ0FBQztBQUNYLE1BQUksUUFBUSxHQUFHLE1BQU0sR0FBRztBQUN4QixXQUFTRCxLQUFJLEdBQUcsSUFBSSxNQUFNLFFBQVFBLEtBQUksR0FBR0EsTUFBSztBQUMxQyxRQUFJLE9BQU8sTUFBTUEsSUFBRyxNQUFNLEdBQUc7QUFDN0IsUUFBSSxtQkFBbUIsS0FBSyxFQUFFLEtBQUssbUJBQW1CLEtBQUssRUFBRTtBQUFBLEVBQ2pFO0FBQ0EsU0FBTztBQUNYOzs7QUNoQ0EsSUFBSSxRQUFRO0FBQ1osSUFBSTtBQUNBLFVBQVEsT0FBTyxtQkFBbUIsZUFDOUIscUJBQXFCLElBQUksZUFBZTtBQUNoRCxTQUNPLEtBQVA7QUFHQTtBQUNPLElBQU0sVUFBVTs7O0FDUGhCLFNBQVMsSUFBSSxNQUFNO0FBQ3RCLFFBQU0sVUFBVSxLQUFLO0FBRXJCLE1BQUk7QUFDQSxRQUFJLGdCQUFnQixPQUFPLG1CQUFtQixDQUFDLFdBQVcsVUFBVTtBQUNoRSxhQUFPLElBQUksZUFBZTtBQUFBLElBQzlCO0FBQUEsRUFDSixTQUNPLEdBQVA7QUFBQSxFQUFZO0FBQ1osTUFBSSxDQUFDLFNBQVM7QUFDVixRQUFJO0FBQ0EsYUFBTyxJQUFJLGVBQVcsQ0FBQyxRQUFRLEVBQUUsT0FBTyxRQUFRLEVBQUUsS0FBSyxHQUFHLEdBQUcsbUJBQW1CO0FBQUEsSUFDcEYsU0FDTyxHQUFQO0FBQUEsSUFBWTtBQUFBLEVBQ2hCO0FBQ0o7OztBQ1ZBLFNBQVMsUUFBUTtBQUFFO0FBQ25CLElBQU0sVUFBVyxXQUFZO0FBQ3pCLFFBQU0sTUFBTSxJQUFJLElBQWU7QUFBQSxJQUMzQixTQUFTO0FBQUEsRUFDYixDQUFDO0FBQ0QsU0FBTyxRQUFRLElBQUk7QUFDdkIsRUFBRztBQUNJLElBQU0sVUFBTixjQUFzQixVQUFVO0FBQUEsRUFPbkMsWUFBWSxNQUFNO0FBQ2QsVUFBTSxJQUFJO0FBQ1YsU0FBSyxVQUFVO0FBQ2YsUUFBSSxPQUFPLGFBQWEsYUFBYTtBQUNqQyxZQUFNLFFBQVEsYUFBYSxTQUFTO0FBQ3BDLFVBQUksT0FBTyxTQUFTO0FBRXBCLFVBQUksQ0FBQyxNQUFNO0FBQ1AsZUFBTyxRQUFRLFFBQVE7QUFBQSxNQUMzQjtBQUNBLFdBQUssS0FDQSxPQUFPLGFBQWEsZUFDakIsS0FBSyxhQUFhLFNBQVMsWUFDM0IsU0FBUyxLQUFLO0FBQ3RCLFdBQUssS0FBSyxLQUFLLFdBQVc7QUFBQSxJQUM5QjtBQUlBLFVBQU0sY0FBYyxRQUFRLEtBQUs7QUFDakMsU0FBSyxpQkFBaUIsV0FBVyxDQUFDO0FBQUEsRUFDdEM7QUFBQSxFQUlBLElBQUksT0FBTztBQUNQLFdBQU87QUFBQSxFQUNYO0FBQUEsRUFPQSxTQUFTO0FBQ0wsU0FBSyxLQUFLO0FBQUEsRUFDZDtBQUFBLEVBT0EsTUFBTSxTQUFTO0FBQ1gsU0FBSyxhQUFhO0FBQ2xCLFVBQU0sUUFBUSxNQUFNO0FBQ2hCLFdBQUssYUFBYTtBQUNsQixjQUFRO0FBQUEsSUFDWjtBQUNBLFFBQUksS0FBSyxXQUFXLENBQUMsS0FBSyxVQUFVO0FBQ2hDLFVBQUksUUFBUTtBQUNaLFVBQUksS0FBSyxTQUFTO0FBQ2Q7QUFDQSxhQUFLLEtBQUssZ0JBQWdCLFdBQVk7QUFDbEMsWUFBRSxTQUFTLE1BQU07QUFBQSxRQUNyQixDQUFDO0FBQUEsTUFDTDtBQUNBLFVBQUksQ0FBQyxLQUFLLFVBQVU7QUFDaEI7QUFDQSxhQUFLLEtBQUssU0FBUyxXQUFZO0FBQzNCLFlBQUUsU0FBUyxNQUFNO0FBQUEsUUFDckIsQ0FBQztBQUFBLE1BQ0w7QUFBQSxJQUNKLE9BQ0s7QUFDRCxZQUFNO0FBQUEsSUFDVjtBQUFBLEVBQ0o7QUFBQSxFQU1BLE9BQU87QUFDSCxTQUFLLFVBQVU7QUFDZixTQUFLLE9BQU87QUFDWixTQUFLLGFBQWEsTUFBTTtBQUFBLEVBQzVCO0FBQUEsRUFNQSxPQUFPLE1BQU07QUFDVCxVQUFNLFdBQVcsWUFBVTtBQUV2QixVQUFJLGNBQWMsS0FBSyxjQUFjLE9BQU8sU0FBUyxRQUFRO0FBQ3pELGFBQUssT0FBTztBQUFBLE1BQ2hCO0FBRUEsVUFBSSxZQUFZLE9BQU8sTUFBTTtBQUN6QixhQUFLLFFBQVEsRUFBRSxhQUFhLGlDQUFpQyxDQUFDO0FBQzlELGVBQU87QUFBQSxNQUNYO0FBRUEsV0FBSyxTQUFTLE1BQU07QUFBQSxJQUN4QjtBQUVBLGtCQUFjLE1BQU0sS0FBSyxPQUFPLFVBQVUsRUFBRSxRQUFRLFFBQVE7QUFFNUQsUUFBSSxhQUFhLEtBQUssWUFBWTtBQUU5QixXQUFLLFVBQVU7QUFDZixXQUFLLGFBQWEsY0FBYztBQUNoQyxVQUFJLFdBQVcsS0FBSyxZQUFZO0FBQzVCLGFBQUssS0FBSztBQUFBLE1BQ2QsT0FDSztBQUFBLE1BQ0w7QUFBQSxJQUNKO0FBQUEsRUFDSjtBQUFBLEVBTUEsVUFBVTtBQUNOLFVBQU0sUUFBUSxNQUFNO0FBQ2hCLFdBQUssTUFBTSxDQUFDLEVBQUUsTUFBTSxRQUFRLENBQUMsQ0FBQztBQUFBLElBQ2xDO0FBQ0EsUUFBSSxXQUFXLEtBQUssWUFBWTtBQUM1QixZQUFNO0FBQUEsSUFDVixPQUNLO0FBR0QsV0FBSyxLQUFLLFFBQVEsS0FBSztBQUFBLElBQzNCO0FBQUEsRUFDSjtBQUFBLEVBUUEsTUFBTSxTQUFTO0FBQ1gsU0FBSyxXQUFXO0FBQ2hCLGtCQUFjLFNBQVMsVUFBUTtBQUMzQixXQUFLLFFBQVEsTUFBTSxNQUFNO0FBQ3JCLGFBQUssV0FBVztBQUNoQixhQUFLLGFBQWEsT0FBTztBQUFBLE1BQzdCLENBQUM7QUFBQSxJQUNMLENBQUM7QUFBQSxFQUNMO0FBQUEsRUFNQSxNQUFNO0FBQ0YsUUFBSSxRQUFRLEtBQUssU0FBUyxDQUFDO0FBQzNCLFVBQU0sU0FBUyxLQUFLLEtBQUssU0FBUyxVQUFVO0FBQzVDLFFBQUksT0FBTztBQUVYLFFBQUksVUFBVSxLQUFLLEtBQUssbUJBQW1CO0FBQ3ZDLFlBQU0sS0FBSyxLQUFLLGtCQUFrQixNQUFNO0FBQUEsSUFDNUM7QUFDQSxRQUFJLENBQUMsS0FBSyxrQkFBa0IsQ0FBQyxNQUFNLEtBQUs7QUFDcEMsWUFBTSxNQUFNO0FBQUEsSUFDaEI7QUFFQSxRQUFJLEtBQUssS0FBSyxTQUNSLFlBQVksVUFBVSxPQUFPLEtBQUssS0FBSyxJQUFJLE1BQU0sT0FDOUMsV0FBVyxVQUFVLE9BQU8sS0FBSyxLQUFLLElBQUksTUFBTSxLQUFNO0FBQzNELGFBQU8sTUFBTSxLQUFLLEtBQUs7QUFBQSxJQUMzQjtBQUNBLFVBQU0sZUFBZUUsUUFBTyxLQUFLO0FBQ2pDLFVBQU0sT0FBTyxLQUFLLEtBQUssU0FBUyxRQUFRLEdBQUcsTUFBTTtBQUNqRCxXQUFRLFNBQ0osU0FDQyxPQUFPLE1BQU0sS0FBSyxLQUFLLFdBQVcsTUFBTSxLQUFLLEtBQUssWUFDbkQsT0FDQSxLQUFLLEtBQUssUUFDVCxhQUFhLFNBQVMsTUFBTSxlQUFlO0FBQUEsRUFDcEQ7QUFBQSxFQU9BLFFBQVEsT0FBTyxDQUFDLEdBQUc7QUFDZixXQUFPLE9BQU8sTUFBTSxFQUFFLElBQUksS0FBSyxJQUFJLElBQUksS0FBSyxHQUFHLEdBQUcsS0FBSyxJQUFJO0FBQzNELFdBQU8sSUFBSSxRQUFRLEtBQUssSUFBSSxHQUFHLElBQUk7QUFBQSxFQUN2QztBQUFBLEVBUUEsUUFBUSxNQUFNLElBQUk7QUFDZCxVQUFNLE1BQU0sS0FBSyxRQUFRO0FBQUEsTUFDckIsUUFBUTtBQUFBLE1BQ1I7QUFBQSxJQUNKLENBQUM7QUFDRCxRQUFJLEdBQUcsV0FBVyxFQUFFO0FBQ3BCLFFBQUksR0FBRyxTQUFTLENBQUMsV0FBVyxZQUFZO0FBQ3BDLFdBQUssUUFBUSxrQkFBa0IsV0FBVyxPQUFPO0FBQUEsSUFDckQsQ0FBQztBQUFBLEVBQ0w7QUFBQSxFQU1BLFNBQVM7QUFDTCxVQUFNLE1BQU0sS0FBSyxRQUFRO0FBQ3pCLFFBQUksR0FBRyxRQUFRLEtBQUssT0FBTyxLQUFLLElBQUksQ0FBQztBQUNyQyxRQUFJLEdBQUcsU0FBUyxDQUFDLFdBQVcsWUFBWTtBQUNwQyxXQUFLLFFBQVEsa0JBQWtCLFdBQVcsT0FBTztBQUFBLElBQ3JELENBQUM7QUFDRCxTQUFLLFVBQVU7QUFBQSxFQUNuQjtBQUNKO0FBQ08sSUFBTSxVQUFOLGNBQXNCLFFBQVE7QUFBQSxFQU9qQyxZQUFZLEtBQUssTUFBTTtBQUNuQixVQUFNO0FBQ04sMEJBQXNCLE1BQU0sSUFBSTtBQUNoQyxTQUFLLE9BQU87QUFDWixTQUFLLFNBQVMsS0FBSyxVQUFVO0FBQzdCLFNBQUssTUFBTTtBQUNYLFNBQUssUUFBUSxVQUFVLEtBQUs7QUFDNUIsU0FBSyxPQUFPLFdBQWMsS0FBSyxPQUFPLEtBQUssT0FBTztBQUNsRCxTQUFLLE9BQU87QUFBQSxFQUNoQjtBQUFBLEVBTUEsU0FBUztBQUNMLFVBQU0sT0FBTyxLQUFLLEtBQUssTUFBTSxTQUFTLE9BQU8sT0FBTyxjQUFjLFFBQVEsTUFBTSxXQUFXLHNCQUFzQixXQUFXO0FBQzVILFNBQUssVUFBVSxDQUFDLENBQUMsS0FBSyxLQUFLO0FBQzNCLFNBQUssVUFBVSxDQUFDLENBQUMsS0FBSyxLQUFLO0FBQzNCLFVBQU0sTUFBTyxLQUFLLE1BQU0sSUFBSSxJQUFlLElBQUk7QUFDL0MsUUFBSTtBQUNBLFVBQUksS0FBSyxLQUFLLFFBQVEsS0FBSyxLQUFLLEtBQUssS0FBSztBQUMxQyxVQUFJO0FBQ0EsWUFBSSxLQUFLLEtBQUssY0FBYztBQUN4QixjQUFJLHlCQUF5QixJQUFJLHNCQUFzQixJQUFJO0FBQzNELG1CQUFTQyxNQUFLLEtBQUssS0FBSyxjQUFjO0FBQ2xDLGdCQUFJLEtBQUssS0FBSyxhQUFhLGVBQWVBLEVBQUMsR0FBRztBQUMxQyxrQkFBSSxpQkFBaUJBLElBQUcsS0FBSyxLQUFLLGFBQWFBLEdBQUU7QUFBQSxZQUNyRDtBQUFBLFVBQ0o7QUFBQSxRQUNKO0FBQUEsTUFDSixTQUNPLEdBQVA7QUFBQSxNQUFZO0FBQ1osVUFBSSxXQUFXLEtBQUssUUFBUTtBQUN4QixZQUFJO0FBQ0EsY0FBSSxpQkFBaUIsZ0JBQWdCLDBCQUEwQjtBQUFBLFFBQ25FLFNBQ08sR0FBUDtBQUFBLFFBQVk7QUFBQSxNQUNoQjtBQUNBLFVBQUk7QUFDQSxZQUFJLGlCQUFpQixVQUFVLEtBQUs7QUFBQSxNQUN4QyxTQUNPLEdBQVA7QUFBQSxNQUFZO0FBRVosVUFBSSxxQkFBcUIsS0FBSztBQUMxQixZQUFJLGtCQUFrQixLQUFLLEtBQUs7QUFBQSxNQUNwQztBQUNBLFVBQUksS0FBSyxLQUFLLGdCQUFnQjtBQUMxQixZQUFJLFVBQVUsS0FBSyxLQUFLO0FBQUEsTUFDNUI7QUFDQSxVQUFJLHFCQUFxQixNQUFNO0FBQzNCLFlBQUksTUFBTSxJQUFJO0FBQ1Y7QUFDSixZQUFJLFFBQVEsSUFBSSxVQUFVLFNBQVMsSUFBSSxRQUFRO0FBQzNDLGVBQUssT0FBTztBQUFBLFFBQ2hCLE9BQ0s7QUFHRCxlQUFLLGFBQWEsTUFBTTtBQUNwQixpQkFBSyxRQUFRLE9BQU8sSUFBSSxXQUFXLFdBQVcsSUFBSSxTQUFTLENBQUM7QUFBQSxVQUNoRSxHQUFHLENBQUM7QUFBQSxRQUNSO0FBQUEsTUFDSjtBQUNBLFVBQUksS0FBSyxLQUFLLElBQUk7QUFBQSxJQUN0QixTQUNPLEdBQVA7QUFJSSxXQUFLLGFBQWEsTUFBTTtBQUNwQixhQUFLLFFBQVEsQ0FBQztBQUFBLE1BQ2xCLEdBQUcsQ0FBQztBQUNKO0FBQUEsSUFDSjtBQUNBLFFBQUksT0FBTyxhQUFhLGFBQWE7QUFDakMsV0FBSyxRQUFRLFFBQVE7QUFDckIsY0FBUSxTQUFTLEtBQUssU0FBUztBQUFBLElBQ25DO0FBQUEsRUFDSjtBQUFBLEVBTUEsUUFBUSxLQUFLO0FBQ1QsU0FBSyxhQUFhLFNBQVMsS0FBSyxLQUFLLEdBQUc7QUFDeEMsU0FBSyxRQUFRLElBQUk7QUFBQSxFQUNyQjtBQUFBLEVBTUEsUUFBUSxXQUFXO0FBQ2YsUUFBSSxnQkFBZ0IsT0FBTyxLQUFLLE9BQU8sU0FBUyxLQUFLLEtBQUs7QUFDdEQ7QUFBQSxJQUNKO0FBQ0EsU0FBSyxJQUFJLHFCQUFxQjtBQUM5QixRQUFJLFdBQVc7QUFDWCxVQUFJO0FBQ0EsYUFBSyxJQUFJLE1BQU07QUFBQSxNQUNuQixTQUNPLEdBQVA7QUFBQSxNQUFZO0FBQUEsSUFDaEI7QUFDQSxRQUFJLE9BQU8sYUFBYSxhQUFhO0FBQ2pDLGFBQU8sUUFBUSxTQUFTLEtBQUs7QUFBQSxJQUNqQztBQUNBLFNBQUssTUFBTTtBQUFBLEVBQ2Y7QUFBQSxFQU1BLFNBQVM7QUFDTCxVQUFNLE9BQU8sS0FBSyxJQUFJO0FBQ3RCLFFBQUksU0FBUyxNQUFNO0FBQ2YsV0FBSyxhQUFhLFFBQVEsSUFBSTtBQUM5QixXQUFLLGFBQWEsU0FBUztBQUMzQixXQUFLLFFBQVE7QUFBQSxJQUNqQjtBQUFBLEVBQ0o7QUFBQSxFQU1BLFFBQVE7QUFDSixTQUFLLFFBQVE7QUFBQSxFQUNqQjtBQUNKO0FBQ0EsUUFBUSxnQkFBZ0I7QUFDeEIsUUFBUSxXQUFXLENBQUM7QUFNcEIsSUFBSSxPQUFPLGFBQWEsYUFBYTtBQUVqQyxNQUFJLE9BQU8sZ0JBQWdCLFlBQVk7QUFFbkMsZ0JBQVksWUFBWSxhQUFhO0FBQUEsRUFDekMsV0FDUyxPQUFPLHFCQUFxQixZQUFZO0FBQzdDLFVBQU0sbUJBQW1CLGdCQUFnQixpQkFBYSxhQUFhO0FBQ25FLHFCQUFpQixrQkFBa0IsZUFBZSxLQUFLO0FBQUEsRUFDM0Q7QUFDSjtBQUNBLFNBQVMsZ0JBQWdCO0FBQ3JCLFdBQVNBLE1BQUssUUFBUSxVQUFVO0FBQzVCLFFBQUksUUFBUSxTQUFTLGVBQWVBLEVBQUMsR0FBRztBQUNwQyxjQUFRLFNBQVNBLElBQUcsTUFBTTtBQUFBLElBQzlCO0FBQUEsRUFDSjtBQUNKOzs7QUNqWk8sSUFBTSxZQUFZLE1BQU07QUFDM0IsUUFBTSxxQkFBcUIsT0FBTyxZQUFZLGNBQWMsT0FBTyxRQUFRLFlBQVk7QUFDdkYsTUFBSSxvQkFBb0I7QUFDcEIsV0FBTyxRQUFNLFFBQVEsUUFBUSxFQUFFLEtBQUssRUFBRTtBQUFBLEVBQzFDLE9BQ0s7QUFDRCxXQUFPLENBQUMsSUFBSSxpQkFBaUIsYUFBYSxJQUFJLENBQUM7QUFBQSxFQUNuRDtBQUNKLEdBQUc7QUFDSSxJQUFNLFlBQVksZUFBVyxhQUFhLGVBQVc7QUFDckQsSUFBTSx3QkFBd0I7QUFDOUIsSUFBTSxvQkFBb0I7OztBQ0xqQyxJQUFNLGdCQUFnQixPQUFPLGNBQWMsZUFDdkMsT0FBTyxVQUFVLFlBQVksWUFDN0IsVUFBVSxRQUFRLFlBQVksTUFBTTtBQUNqQyxJQUFNLEtBQU4sY0FBaUIsVUFBVTtBQUFBLEVBTzlCLFlBQVksTUFBTTtBQUNkLFVBQU0sSUFBSTtBQUNWLFNBQUssaUJBQWlCLENBQUMsS0FBSztBQUFBLEVBQ2hDO0FBQUEsRUFNQSxJQUFJLE9BQU87QUFDUCxXQUFPO0FBQUEsRUFDWDtBQUFBLEVBTUEsU0FBUztBQUNMLFFBQUksQ0FBQyxLQUFLLE1BQU0sR0FBRztBQUVmO0FBQUEsSUFDSjtBQUNBLFVBQU0sTUFBTSxLQUFLLElBQUk7QUFDckIsVUFBTSxZQUFZLEtBQUssS0FBSztBQUU1QixVQUFNLE9BQU8sZ0JBQ1AsQ0FBQyxJQUNELEtBQUssS0FBSyxNQUFNLFNBQVMscUJBQXFCLE9BQU8sT0FBTyxjQUFjLFFBQVEsTUFBTSxXQUFXLHNCQUFzQixnQkFBZ0IsbUJBQW1CLFVBQVUsY0FBYyxVQUFVLHFCQUFxQjtBQUN6TixRQUFJLEtBQUssS0FBSyxjQUFjO0FBQ3hCLFdBQUssVUFBVSxLQUFLLEtBQUs7QUFBQSxJQUM3QjtBQUNBLFFBQUk7QUFDQSxXQUFLLEtBQ0QseUJBQXlCLENBQUMsZ0JBQ3BCLFlBQ0ksSUFBSSxVQUFVLEtBQUssU0FBUyxJQUM1QixJQUFJLFVBQVUsR0FBRyxJQUNyQixJQUFJLFVBQVUsS0FBSyxXQUFXLElBQUk7QUFBQSxJQUNoRCxTQUNPLEtBQVA7QUFDSSxhQUFPLEtBQUssYUFBYSxTQUFTLEdBQUc7QUFBQSxJQUN6QztBQUNBLFNBQUssR0FBRyxhQUFhLEtBQUssT0FBTyxjQUFjO0FBQy9DLFNBQUssa0JBQWtCO0FBQUEsRUFDM0I7QUFBQSxFQU1BLG9CQUFvQjtBQUNoQixTQUFLLEdBQUcsU0FBUyxNQUFNO0FBQ25CLFVBQUksS0FBSyxLQUFLLFdBQVc7QUFDckIsYUFBSyxHQUFHLFFBQVEsTUFBTTtBQUFBLE1BQzFCO0FBQ0EsV0FBSyxPQUFPO0FBQUEsSUFDaEI7QUFDQSxTQUFLLEdBQUcsVUFBVSxnQkFBYyxLQUFLLFFBQVE7QUFBQSxNQUN6QyxhQUFhO0FBQUEsTUFDYixTQUFTO0FBQUEsSUFDYixDQUFDO0FBQ0QsU0FBSyxHQUFHLFlBQVksUUFBTSxLQUFLLE9BQU8sR0FBRyxJQUFJO0FBQzdDLFNBQUssR0FBRyxVQUFVLE9BQUssS0FBSyxRQUFRLG1CQUFtQixDQUFDO0FBQUEsRUFDNUQ7QUFBQSxFQU9BLE1BQU0sU0FBUztBQUNYLFNBQUssV0FBVztBQUdoQixhQUFTQyxLQUFJLEdBQUdBLEtBQUksUUFBUSxRQUFRQSxNQUFLO0FBQ3JDLFlBQU0sU0FBUyxRQUFRQTtBQUN2QixZQUFNLGFBQWFBLE9BQU0sUUFBUSxTQUFTO0FBQzFDLG1DQUFhLFFBQVEsS0FBSyxnQkFBZ0IsVUFBUTtBQUU5QyxjQUFNLE9BQU8sQ0FBQztBQUNkLFlBQUksQ0FBQyx1QkFBdUI7QUFDeEIsY0FBSSxPQUFPLFNBQVM7QUFDaEIsaUJBQUssV0FBVyxPQUFPLFFBQVE7QUFBQSxVQUNuQztBQUNBLGNBQUksS0FBSyxLQUFLLG1CQUFtQjtBQUM3QixrQkFBTSxNQUVOLGFBQWEsT0FBTyxPQUFPLE9BQU8sV0FBVyxJQUFJLElBQUksS0FBSztBQUMxRCxnQkFBSSxNQUFNLEtBQUssS0FBSyxrQkFBa0IsV0FBVztBQUM3QyxtQkFBSyxXQUFXO0FBQUEsWUFDcEI7QUFBQSxVQUNKO0FBQUEsUUFDSjtBQUlBLFlBQUk7QUFDQSxjQUFJLHVCQUF1QjtBQUV2QixpQkFBSyxHQUFHLEtBQUssSUFBSTtBQUFBLFVBQ3JCLE9BQ0s7QUFDRCxpQkFBSyxHQUFHLEtBQUssTUFBTSxJQUFJO0FBQUEsVUFDM0I7QUFBQSxRQUNKLFNBQ08sR0FBUDtBQUFBLFFBQ0E7QUFDQSxZQUFJLFlBQVk7QUFHWixtQkFBUyxNQUFNO0FBQ1gsaUJBQUssV0FBVztBQUNoQixpQkFBSyxhQUFhLE9BQU87QUFBQSxVQUM3QixHQUFHLEtBQUssWUFBWTtBQUFBLFFBQ3hCO0FBQUEsTUFDSixDQUFDO0FBQUEsSUFDTDtBQUFBLEVBQ0o7QUFBQSxFQU1BLFVBQVU7QUFDTixRQUFJLE9BQU8sS0FBSyxPQUFPLGFBQWE7QUFDaEMsV0FBSyxHQUFHLE1BQU07QUFDZCxXQUFLLEtBQUs7QUFBQSxJQUNkO0FBQUEsRUFDSjtBQUFBLEVBTUEsTUFBTTtBQUNGLFFBQUksUUFBUSxLQUFLLFNBQVMsQ0FBQztBQUMzQixVQUFNLFNBQVMsS0FBSyxLQUFLLFNBQVMsUUFBUTtBQUMxQyxRQUFJLE9BQU87QUFFWCxRQUFJLEtBQUssS0FBSyxTQUNSLFVBQVUsVUFBVSxPQUFPLEtBQUssS0FBSyxJQUFJLE1BQU0sT0FDNUMsU0FBUyxVQUFVLE9BQU8sS0FBSyxLQUFLLElBQUksTUFBTSxLQUFNO0FBQ3pELGFBQU8sTUFBTSxLQUFLLEtBQUs7QUFBQSxJQUMzQjtBQUVBLFFBQUksS0FBSyxLQUFLLG1CQUFtQjtBQUM3QixZQUFNLEtBQUssS0FBSyxrQkFBa0IsTUFBTTtBQUFBLElBQzVDO0FBRUEsUUFBSSxDQUFDLEtBQUssZ0JBQWdCO0FBQ3RCLFlBQU0sTUFBTTtBQUFBLElBQ2hCO0FBQ0EsVUFBTSxlQUFlQyxRQUFPLEtBQUs7QUFDakMsVUFBTSxPQUFPLEtBQUssS0FBSyxTQUFTLFFBQVEsR0FBRyxNQUFNO0FBQ2pELFdBQVEsU0FDSixTQUNDLE9BQU8sTUFBTSxLQUFLLEtBQUssV0FBVyxNQUFNLEtBQUssS0FBSyxZQUNuRCxPQUNBLEtBQUssS0FBSyxRQUNULGFBQWEsU0FBUyxNQUFNLGVBQWU7QUFBQSxFQUNwRDtBQUFBLEVBT0EsUUFBUTtBQUNKLFdBQU8sQ0FBQyxDQUFDO0FBQUEsRUFDYjtBQUNKOzs7QUN6TE8sSUFBTSxhQUFhO0FBQUEsRUFDdEIsV0FBVztBQUFBLEVBQ1gsU0FBUztBQUNiOzs7QUNFQSxJQUFNLEtBQUs7QUFDWCxJQUFNLFFBQVE7QUFBQSxFQUNWO0FBQUEsRUFBVTtBQUFBLEVBQVk7QUFBQSxFQUFhO0FBQUEsRUFBWTtBQUFBLEVBQVE7QUFBQSxFQUFZO0FBQUEsRUFBUTtBQUFBLEVBQVE7QUFBQSxFQUFZO0FBQUEsRUFBUTtBQUFBLEVBQWE7QUFBQSxFQUFRO0FBQUEsRUFBUztBQUN6STtBQUNPLFNBQVMsTUFBTSxLQUFLO0FBQ3ZCLFFBQU0sTUFBTSxLQUFLLElBQUksSUFBSSxRQUFRLEdBQUcsR0FBRyxJQUFJLElBQUksUUFBUSxHQUFHO0FBQzFELE1BQUksS0FBSyxNQUFNLEtBQUssSUFBSTtBQUNwQixVQUFNLElBQUksVUFBVSxHQUFHLENBQUMsSUFBSSxJQUFJLFVBQVUsR0FBRyxDQUFDLEVBQUUsUUFBUSxNQUFNLEdBQUcsSUFBSSxJQUFJLFVBQVUsR0FBRyxJQUFJLE1BQU07QUFBQSxFQUNwRztBQUNBLE1BQUksSUFBSSxHQUFHLEtBQUssT0FBTyxFQUFFLEdBQUcsTUFBTSxDQUFDLEdBQUdDLEtBQUk7QUFDMUMsU0FBT0EsTUFBSztBQUNSLFFBQUksTUFBTUEsT0FBTSxFQUFFQSxPQUFNO0FBQUEsRUFDNUI7QUFDQSxNQUFJLEtBQUssTUFBTSxLQUFLLElBQUk7QUFDcEIsUUFBSSxTQUFTO0FBQ2IsUUFBSSxPQUFPLElBQUksS0FBSyxVQUFVLEdBQUcsSUFBSSxLQUFLLFNBQVMsQ0FBQyxFQUFFLFFBQVEsTUFBTSxHQUFHO0FBQ3ZFLFFBQUksWUFBWSxJQUFJLFVBQVUsUUFBUSxLQUFLLEVBQUUsRUFBRSxRQUFRLEtBQUssRUFBRSxFQUFFLFFBQVEsTUFBTSxHQUFHO0FBQ2pGLFFBQUksVUFBVTtBQUFBLEVBQ2xCO0FBQ0EsTUFBSSxZQUFZLFVBQVUsS0FBSyxJQUFJLE9BQU87QUFDMUMsTUFBSSxXQUFXLFNBQVMsS0FBSyxJQUFJLFFBQVE7QUFDekMsU0FBTztBQUNYO0FBQ0EsU0FBUyxVQUFVLEtBQUssTUFBTTtBQUMxQixRQUFNLE9BQU8sWUFBWSxRQUFRLEtBQUssUUFBUSxNQUFNLEdBQUcsRUFBRSxNQUFNLEdBQUc7QUFDbEUsTUFBSSxLQUFLLE9BQU8sR0FBRyxDQUFDLEtBQUssT0FBTyxLQUFLLFdBQVcsR0FBRztBQUMvQyxVQUFNLE9BQU8sR0FBRyxDQUFDO0FBQUEsRUFDckI7QUFDQSxNQUFJLEtBQUssT0FBTyxLQUFLLFNBQVMsR0FBRyxDQUFDLEtBQUssS0FBSztBQUN4QyxVQUFNLE9BQU8sTUFBTSxTQUFTLEdBQUcsQ0FBQztBQUFBLEVBQ3BDO0FBQ0EsU0FBTztBQUNYO0FBQ0EsU0FBUyxTQUFTLEtBQUssT0FBTztBQUMxQixRQUFNLE9BQU8sQ0FBQztBQUNkLFFBQU0sUUFBUSw2QkFBNkIsU0FBVSxJQUFJLElBQUksSUFBSTtBQUM3RCxRQUFJLElBQUk7QUFDSixXQUFLLE1BQU07QUFBQSxJQUNmO0FBQUEsRUFDSixDQUFDO0FBQ0QsU0FBTztBQUNYOzs7QUMxQ08sSUFBTSxTQUFOLGNBQXFCLFFBQVE7QUFBQSxFQVFoQyxZQUFZLEtBQUssT0FBTyxDQUFDLEdBQUc7QUFDeEIsVUFBTTtBQUNOLFFBQUksT0FBTyxhQUFhLE9BQU8sS0FBSztBQUNoQyxhQUFPO0FBQ1AsWUFBTTtBQUFBLElBQ1Y7QUFDQSxRQUFJLEtBQUs7QUFDTCxZQUFNLE1BQU0sR0FBRztBQUNmLFdBQUssV0FBVyxJQUFJO0FBQ3BCLFdBQUssU0FBUyxJQUFJLGFBQWEsV0FBVyxJQUFJLGFBQWE7QUFDM0QsV0FBSyxPQUFPLElBQUk7QUFDaEIsVUFBSSxJQUFJO0FBQ0osYUFBSyxRQUFRLElBQUk7QUFBQSxJQUN6QixXQUNTLEtBQUssTUFBTTtBQUNoQixXQUFLLFdBQVcsTUFBTSxLQUFLLElBQUksRUFBRTtBQUFBLElBQ3JDO0FBQ0EsMEJBQXNCLE1BQU0sSUFBSTtBQUNoQyxTQUFLLFNBQ0QsUUFBUSxLQUFLLFNBQ1AsS0FBSyxTQUNMLE9BQU8sYUFBYSxlQUFlLGFBQWEsU0FBUztBQUNuRSxRQUFJLEtBQUssWUFBWSxDQUFDLEtBQUssTUFBTTtBQUU3QixXQUFLLE9BQU8sS0FBSyxTQUFTLFFBQVE7QUFBQSxJQUN0QztBQUNBLFNBQUssV0FDRCxLQUFLLGFBQ0EsT0FBTyxhQUFhLGNBQWMsU0FBUyxXQUFXO0FBQy9ELFNBQUssT0FDRCxLQUFLLFNBQ0EsT0FBTyxhQUFhLGVBQWUsU0FBUyxPQUN2QyxTQUFTLE9BQ1QsS0FBSyxTQUNELFFBQ0E7QUFDbEIsU0FBSyxhQUFhLEtBQUssY0FBYyxDQUFDLFdBQVcsV0FBVztBQUM1RCxTQUFLLGFBQWE7QUFDbEIsU0FBSyxjQUFjLENBQUM7QUFDcEIsU0FBSyxnQkFBZ0I7QUFDckIsU0FBSyxPQUFPLE9BQU8sT0FBTztBQUFBLE1BQ3RCLE1BQU07QUFBQSxNQUNOLE9BQU87QUFBQSxNQUNQLGlCQUFpQjtBQUFBLE1BQ2pCLFNBQVM7QUFBQSxNQUNULGdCQUFnQjtBQUFBLE1BQ2hCLGlCQUFpQjtBQUFBLE1BQ2pCLG9CQUFvQjtBQUFBLE1BQ3BCLG1CQUFtQjtBQUFBLFFBQ2YsV0FBVztBQUFBLE1BQ2Y7QUFBQSxNQUNBLGtCQUFrQixDQUFDO0FBQUEsTUFDbkIscUJBQXFCO0FBQUEsSUFDekIsR0FBRyxJQUFJO0FBQ1AsU0FBSyxLQUFLLE9BQU8sS0FBSyxLQUFLLEtBQUssUUFBUSxPQUFPLEVBQUUsSUFBSTtBQUNyRCxRQUFJLE9BQU8sS0FBSyxLQUFLLFVBQVUsVUFBVTtBQUNyQyxXQUFLLEtBQUssUUFBUUMsUUFBTyxLQUFLLEtBQUssS0FBSztBQUFBLElBQzVDO0FBRUEsU0FBSyxLQUFLO0FBQ1YsU0FBSyxXQUFXO0FBQ2hCLFNBQUssZUFBZTtBQUNwQixTQUFLLGNBQWM7QUFFbkIsU0FBSyxtQkFBbUI7QUFDeEIsUUFBSSxPQUFPLHFCQUFxQixZQUFZO0FBQ3hDLFVBQUksS0FBSyxLQUFLLHFCQUFxQjtBQUkvQix5QkFBaUIsZ0JBQWdCLE1BQU07QUFDbkMsY0FBSSxLQUFLLFdBQVc7QUFFaEIsaUJBQUssVUFBVSxtQkFBbUI7QUFDbEMsaUJBQUssVUFBVSxNQUFNO0FBQUEsVUFDekI7QUFBQSxRQUNKLEdBQUcsS0FBSztBQUFBLE1BQ1o7QUFDQSxVQUFJLEtBQUssYUFBYSxhQUFhO0FBQy9CLGFBQUssdUJBQXVCLE1BQU07QUFDOUIsZUFBSyxRQUFRLG1CQUFtQjtBQUFBLFlBQzVCLGFBQWE7QUFBQSxVQUNqQixDQUFDO0FBQUEsUUFDTDtBQUNBLHlCQUFpQixXQUFXLEtBQUssc0JBQXNCLEtBQUs7QUFBQSxNQUNoRTtBQUFBLElBQ0o7QUFDQSxTQUFLLEtBQUs7QUFBQSxFQUNkO0FBQUEsRUFRQSxnQkFBZ0IsTUFBTTtBQUNsQixVQUFNLFFBQVEsT0FBTyxPQUFPLENBQUMsR0FBRyxLQUFLLEtBQUssS0FBSztBQUUvQyxVQUFNLE1BQU07QUFFWixVQUFNLFlBQVk7QUFFbEIsUUFBSSxLQUFLO0FBQ0wsWUFBTSxNQUFNLEtBQUs7QUFDckIsVUFBTSxPQUFPLE9BQU8sT0FBTyxDQUFDLEdBQUcsS0FBSyxLQUFLLGlCQUFpQixPQUFPLEtBQUssTUFBTTtBQUFBLE1BQ3hFO0FBQUEsTUFDQSxRQUFRO0FBQUEsTUFDUixVQUFVLEtBQUs7QUFBQSxNQUNmLFFBQVEsS0FBSztBQUFBLE1BQ2IsTUFBTSxLQUFLO0FBQUEsSUFDZixDQUFDO0FBQ0QsV0FBTyxJQUFJLFdBQVcsTUFBTSxJQUFJO0FBQUEsRUFDcEM7QUFBQSxFQU1BLE9BQU87QUFDSCxRQUFJO0FBQ0osUUFBSSxLQUFLLEtBQUssbUJBQ1YsT0FBTyx5QkFDUCxLQUFLLFdBQVcsUUFBUSxXQUFXLE1BQU0sSUFBSTtBQUM3QyxrQkFBWTtBQUFBLElBQ2hCLFdBQ1MsTUFBTSxLQUFLLFdBQVcsUUFBUTtBQUVuQyxXQUFLLGFBQWEsTUFBTTtBQUNwQixhQUFLLGFBQWEsU0FBUyx5QkFBeUI7QUFBQSxNQUN4RCxHQUFHLENBQUM7QUFDSjtBQUFBLElBQ0osT0FDSztBQUNELGtCQUFZLEtBQUssV0FBVztBQUFBLElBQ2hDO0FBQ0EsU0FBSyxhQUFhO0FBRWxCLFFBQUk7QUFDQSxrQkFBWSxLQUFLLGdCQUFnQixTQUFTO0FBQUEsSUFDOUMsU0FDTyxHQUFQO0FBQ0ksV0FBSyxXQUFXLE1BQU07QUFDdEIsV0FBSyxLQUFLO0FBQ1Y7QUFBQSxJQUNKO0FBQ0EsY0FBVSxLQUFLO0FBQ2YsU0FBSyxhQUFhLFNBQVM7QUFBQSxFQUMvQjtBQUFBLEVBTUEsYUFBYSxXQUFXO0FBQ3BCLFFBQUksS0FBSyxXQUFXO0FBQ2hCLFdBQUssVUFBVSxtQkFBbUI7QUFBQSxJQUN0QztBQUVBLFNBQUssWUFBWTtBQUVqQixjQUNLLEdBQUcsU0FBUyxLQUFLLFFBQVEsS0FBSyxJQUFJLENBQUMsRUFDbkMsR0FBRyxVQUFVLEtBQUssU0FBUyxLQUFLLElBQUksQ0FBQyxFQUNyQyxHQUFHLFNBQVMsS0FBSyxRQUFRLEtBQUssSUFBSSxDQUFDLEVBQ25DLEdBQUcsU0FBUyxZQUFVLEtBQUssUUFBUSxtQkFBbUIsTUFBTSxDQUFDO0FBQUEsRUFDdEU7QUFBQSxFQU9BLE1BQU0sTUFBTTtBQUNSLFFBQUksWUFBWSxLQUFLLGdCQUFnQixJQUFJO0FBQ3pDLFFBQUksU0FBUztBQUNiLFdBQU8sd0JBQXdCO0FBQy9CLFVBQU0sa0JBQWtCLE1BQU07QUFDMUIsVUFBSTtBQUNBO0FBQ0osZ0JBQVUsS0FBSyxDQUFDLEVBQUUsTUFBTSxRQUFRLE1BQU0sUUFBUSxDQUFDLENBQUM7QUFDaEQsZ0JBQVUsS0FBSyxVQUFVLFNBQU87QUFDNUIsWUFBSTtBQUNBO0FBQ0osWUFBSSxXQUFXLElBQUksUUFBUSxZQUFZLElBQUksTUFBTTtBQUM3QyxlQUFLLFlBQVk7QUFDakIsZUFBSyxhQUFhLGFBQWEsU0FBUztBQUN4QyxjQUFJLENBQUM7QUFDRDtBQUNKLGlCQUFPLHdCQUF3QixnQkFBZ0IsVUFBVTtBQUN6RCxlQUFLLFVBQVUsTUFBTSxNQUFNO0FBQ3ZCLGdCQUFJO0FBQ0E7QUFDSixnQkFBSSxhQUFhLEtBQUs7QUFDbEI7QUFDSixvQkFBUTtBQUNSLGlCQUFLLGFBQWEsU0FBUztBQUMzQixzQkFBVSxLQUFLLENBQUMsRUFBRSxNQUFNLFVBQVUsQ0FBQyxDQUFDO0FBQ3BDLGlCQUFLLGFBQWEsV0FBVyxTQUFTO0FBQ3RDLHdCQUFZO0FBQ1osaUJBQUssWUFBWTtBQUNqQixpQkFBSyxNQUFNO0FBQUEsVUFDZixDQUFDO0FBQUEsUUFDTCxPQUNLO0FBQ0QsZ0JBQU0sTUFBTSxJQUFJLE1BQU0sYUFBYTtBQUVuQyxjQUFJLFlBQVksVUFBVTtBQUMxQixlQUFLLGFBQWEsZ0JBQWdCLEdBQUc7QUFBQSxRQUN6QztBQUFBLE1BQ0osQ0FBQztBQUFBLElBQ0w7QUFDQSxhQUFTLGtCQUFrQjtBQUN2QixVQUFJO0FBQ0E7QUFFSixlQUFTO0FBQ1QsY0FBUTtBQUNSLGdCQUFVLE1BQU07QUFDaEIsa0JBQVk7QUFBQSxJQUNoQjtBQUVBLFVBQU0sVUFBVSxTQUFPO0FBQ25CLFlBQU0sUUFBUSxJQUFJLE1BQU0sa0JBQWtCLEdBQUc7QUFFN0MsWUFBTSxZQUFZLFVBQVU7QUFDNUIsc0JBQWdCO0FBQ2hCLFdBQUssYUFBYSxnQkFBZ0IsS0FBSztBQUFBLElBQzNDO0FBQ0EsYUFBUyxtQkFBbUI7QUFDeEIsY0FBUSxrQkFBa0I7QUFBQSxJQUM5QjtBQUVBLGFBQVMsVUFBVTtBQUNmLGNBQVEsZUFBZTtBQUFBLElBQzNCO0FBRUEsYUFBUyxVQUFVLElBQUk7QUFDbkIsVUFBSSxhQUFhLEdBQUcsU0FBUyxVQUFVLE1BQU07QUFDekMsd0JBQWdCO0FBQUEsTUFDcEI7QUFBQSxJQUNKO0FBRUEsVUFBTSxVQUFVLE1BQU07QUFDbEIsZ0JBQVUsZUFBZSxRQUFRLGVBQWU7QUFDaEQsZ0JBQVUsZUFBZSxTQUFTLE9BQU87QUFDekMsZ0JBQVUsZUFBZSxTQUFTLGdCQUFnQjtBQUNsRCxXQUFLLElBQUksU0FBUyxPQUFPO0FBQ3pCLFdBQUssSUFBSSxhQUFhLFNBQVM7QUFBQSxJQUNuQztBQUNBLGNBQVUsS0FBSyxRQUFRLGVBQWU7QUFDdEMsY0FBVSxLQUFLLFNBQVMsT0FBTztBQUMvQixjQUFVLEtBQUssU0FBUyxnQkFBZ0I7QUFDeEMsU0FBSyxLQUFLLFNBQVMsT0FBTztBQUMxQixTQUFLLEtBQUssYUFBYSxTQUFTO0FBQ2hDLGNBQVUsS0FBSztBQUFBLEVBQ25CO0FBQUEsRUFNQSxTQUFTO0FBQ0wsU0FBSyxhQUFhO0FBQ2xCLFdBQU8sd0JBQXdCLGdCQUFnQixLQUFLLFVBQVU7QUFDOUQsU0FBSyxhQUFhLE1BQU07QUFDeEIsU0FBSyxNQUFNO0FBR1gsUUFBSSxXQUFXLEtBQUssY0FDaEIsS0FBSyxLQUFLLFdBQ1YsS0FBSyxVQUFVLE9BQU87QUFDdEIsVUFBSUMsS0FBSTtBQUNSLFlBQU0sSUFBSSxLQUFLLFNBQVM7QUFDeEIsYUFBT0EsS0FBSSxHQUFHQSxNQUFLO0FBQ2YsYUFBSyxNQUFNLEtBQUssU0FBU0EsR0FBRTtBQUFBLE1BQy9CO0FBQUEsSUFDSjtBQUFBLEVBQ0o7QUFBQSxFQU1BLFNBQVMsUUFBUTtBQUNiLFFBQUksY0FBYyxLQUFLLGNBQ25CLFdBQVcsS0FBSyxjQUNoQixjQUFjLEtBQUssWUFBWTtBQUMvQixXQUFLLGFBQWEsVUFBVSxNQUFNO0FBRWxDLFdBQUssYUFBYSxXQUFXO0FBQzdCLGNBQVEsT0FBTztBQUFBLGFBQ047QUFDRCxlQUFLLFlBQVksS0FBSyxNQUFNLE9BQU8sSUFBSSxDQUFDO0FBQ3hDO0FBQUEsYUFDQztBQUNELGVBQUssaUJBQWlCO0FBQ3RCLGVBQUssV0FBVyxNQUFNO0FBQ3RCLGVBQUssYUFBYSxNQUFNO0FBQ3hCLGVBQUssYUFBYSxNQUFNO0FBQ3hCO0FBQUEsYUFDQztBQUNELGdCQUFNLE1BQU0sSUFBSSxNQUFNLGNBQWM7QUFFcEMsY0FBSSxPQUFPLE9BQU87QUFDbEIsZUFBSyxRQUFRLEdBQUc7QUFDaEI7QUFBQSxhQUNDO0FBQ0QsZUFBSyxhQUFhLFFBQVEsT0FBTyxJQUFJO0FBQ3JDLGVBQUssYUFBYSxXQUFXLE9BQU8sSUFBSTtBQUN4QztBQUFBO0FBQUEsSUFFWixPQUNLO0FBQUEsSUFDTDtBQUFBLEVBQ0o7QUFBQSxFQU9BLFlBQVksTUFBTTtBQUNkLFNBQUssYUFBYSxhQUFhLElBQUk7QUFDbkMsU0FBSyxLQUFLLEtBQUs7QUFDZixTQUFLLFVBQVUsTUFBTSxNQUFNLEtBQUs7QUFDaEMsU0FBSyxXQUFXLEtBQUssZUFBZSxLQUFLLFFBQVE7QUFDakQsU0FBSyxlQUFlLEtBQUs7QUFDekIsU0FBSyxjQUFjLEtBQUs7QUFDeEIsU0FBSyxhQUFhLEtBQUs7QUFDdkIsU0FBSyxPQUFPO0FBRVosUUFBSSxhQUFhLEtBQUs7QUFDbEI7QUFDSixTQUFLLGlCQUFpQjtBQUFBLEVBQzFCO0FBQUEsRUFNQSxtQkFBbUI7QUFDZixTQUFLLGVBQWUsS0FBSyxnQkFBZ0I7QUFDekMsU0FBSyxtQkFBbUIsS0FBSyxhQUFhLE1BQU07QUFDNUMsV0FBSyxRQUFRLGNBQWM7QUFBQSxJQUMvQixHQUFHLEtBQUssZUFBZSxLQUFLLFdBQVc7QUFDdkMsUUFBSSxLQUFLLEtBQUssV0FBVztBQUNyQixXQUFLLGlCQUFpQixNQUFNO0FBQUEsSUFDaEM7QUFBQSxFQUNKO0FBQUEsRUFNQSxVQUFVO0FBQ04sU0FBSyxZQUFZLE9BQU8sR0FBRyxLQUFLLGFBQWE7QUFJN0MsU0FBSyxnQkFBZ0I7QUFDckIsUUFBSSxNQUFNLEtBQUssWUFBWSxRQUFRO0FBQy9CLFdBQUssYUFBYSxPQUFPO0FBQUEsSUFDN0IsT0FDSztBQUNELFdBQUssTUFBTTtBQUFBLElBQ2Y7QUFBQSxFQUNKO0FBQUEsRUFNQSxRQUFRO0FBQ0osUUFBSSxhQUFhLEtBQUssY0FDbEIsS0FBSyxVQUFVLFlBQ2YsQ0FBQyxLQUFLLGFBQ04sS0FBSyxZQUFZLFFBQVE7QUFDekIsWUFBTSxVQUFVLEtBQUssbUJBQW1CO0FBQ3hDLFdBQUssVUFBVSxLQUFLLE9BQU87QUFHM0IsV0FBSyxnQkFBZ0IsUUFBUTtBQUM3QixXQUFLLGFBQWEsT0FBTztBQUFBLElBQzdCO0FBQUEsRUFDSjtBQUFBLEVBT0EscUJBQXFCO0FBQ2pCLFVBQU0seUJBQXlCLEtBQUssY0FDaEMsS0FBSyxVQUFVLFNBQVMsYUFDeEIsS0FBSyxZQUFZLFNBQVM7QUFDOUIsUUFBSSxDQUFDLHdCQUF3QjtBQUN6QixhQUFPLEtBQUs7QUFBQSxJQUNoQjtBQUNBLFFBQUksY0FBYztBQUNsQixhQUFTQSxLQUFJLEdBQUdBLEtBQUksS0FBSyxZQUFZLFFBQVFBLE1BQUs7QUFDOUMsWUFBTSxPQUFPLEtBQUssWUFBWUEsSUFBRztBQUNqQyxVQUFJLE1BQU07QUFDTix1QkFBZSxXQUFXLElBQUk7QUFBQSxNQUNsQztBQUNBLFVBQUlBLEtBQUksS0FBSyxjQUFjLEtBQUssWUFBWTtBQUN4QyxlQUFPLEtBQUssWUFBWSxNQUFNLEdBQUdBLEVBQUM7QUFBQSxNQUN0QztBQUNBLHFCQUFlO0FBQUEsSUFDbkI7QUFDQSxXQUFPLEtBQUs7QUFBQSxFQUNoQjtBQUFBLEVBVUEsTUFBTSxLQUFLLFNBQVMsSUFBSTtBQUNwQixTQUFLLFdBQVcsV0FBVyxLQUFLLFNBQVMsRUFBRTtBQUMzQyxXQUFPO0FBQUEsRUFDWDtBQUFBLEVBQ0EsS0FBSyxLQUFLLFNBQVMsSUFBSTtBQUNuQixTQUFLLFdBQVcsV0FBVyxLQUFLLFNBQVMsRUFBRTtBQUMzQyxXQUFPO0FBQUEsRUFDWDtBQUFBLEVBVUEsV0FBVyxNQUFNLE1BQU0sU0FBUyxJQUFJO0FBQ2hDLFFBQUksZUFBZSxPQUFPLE1BQU07QUFDNUIsV0FBSztBQUNMLGFBQU87QUFBQSxJQUNYO0FBQ0EsUUFBSSxlQUFlLE9BQU8sU0FBUztBQUMvQixXQUFLO0FBQ0wsZ0JBQVU7QUFBQSxJQUNkO0FBQ0EsUUFBSSxjQUFjLEtBQUssY0FBYyxhQUFhLEtBQUssWUFBWTtBQUMvRDtBQUFBLElBQ0o7QUFDQSxjQUFVLFdBQVcsQ0FBQztBQUN0QixZQUFRLFdBQVcsVUFBVSxRQUFRO0FBQ3JDLFVBQU0sU0FBUztBQUFBLE1BQ1g7QUFBQSxNQUNBO0FBQUEsTUFDQTtBQUFBLElBQ0o7QUFDQSxTQUFLLGFBQWEsZ0JBQWdCLE1BQU07QUFDeEMsU0FBSyxZQUFZLEtBQUssTUFBTTtBQUM1QixRQUFJO0FBQ0EsV0FBSyxLQUFLLFNBQVMsRUFBRTtBQUN6QixTQUFLLE1BQU07QUFBQSxFQUNmO0FBQUEsRUFNQSxRQUFRO0FBQ0osVUFBTSxRQUFRLE1BQU07QUFDaEIsV0FBSyxRQUFRLGNBQWM7QUFDM0IsV0FBSyxVQUFVLE1BQU07QUFBQSxJQUN6QjtBQUNBLFVBQU0sa0JBQWtCLE1BQU07QUFDMUIsV0FBSyxJQUFJLFdBQVcsZUFBZTtBQUNuQyxXQUFLLElBQUksZ0JBQWdCLGVBQWU7QUFDeEMsWUFBTTtBQUFBLElBQ1Y7QUFDQSxVQUFNLGlCQUFpQixNQUFNO0FBRXpCLFdBQUssS0FBSyxXQUFXLGVBQWU7QUFDcEMsV0FBSyxLQUFLLGdCQUFnQixlQUFlO0FBQUEsSUFDN0M7QUFDQSxRQUFJLGNBQWMsS0FBSyxjQUFjLFdBQVcsS0FBSyxZQUFZO0FBQzdELFdBQUssYUFBYTtBQUNsQixVQUFJLEtBQUssWUFBWSxRQUFRO0FBQ3pCLGFBQUssS0FBSyxTQUFTLE1BQU07QUFDckIsY0FBSSxLQUFLLFdBQVc7QUFDaEIsMkJBQWU7QUFBQSxVQUNuQixPQUNLO0FBQ0Qsa0JBQU07QUFBQSxVQUNWO0FBQUEsUUFDSixDQUFDO0FBQUEsTUFDTCxXQUNTLEtBQUssV0FBVztBQUNyQix1QkFBZTtBQUFBLE1BQ25CLE9BQ0s7QUFDRCxjQUFNO0FBQUEsTUFDVjtBQUFBLElBQ0o7QUFDQSxXQUFPO0FBQUEsRUFDWDtBQUFBLEVBTUEsUUFBUSxLQUFLO0FBQ1QsV0FBTyx3QkFBd0I7QUFDL0IsU0FBSyxhQUFhLFNBQVMsR0FBRztBQUM5QixTQUFLLFFBQVEsbUJBQW1CLEdBQUc7QUFBQSxFQUN2QztBQUFBLEVBTUEsUUFBUSxRQUFRLGFBQWE7QUFDekIsUUFBSSxjQUFjLEtBQUssY0FDbkIsV0FBVyxLQUFLLGNBQ2hCLGNBQWMsS0FBSyxZQUFZO0FBRS9CLFdBQUssZUFBZSxLQUFLLGdCQUFnQjtBQUV6QyxXQUFLLFVBQVUsbUJBQW1CLE9BQU87QUFFekMsV0FBSyxVQUFVLE1BQU07QUFFckIsV0FBSyxVQUFVLG1CQUFtQjtBQUNsQyxVQUFJLE9BQU8sd0JBQXdCLFlBQVk7QUFDM0MsNEJBQW9CLFdBQVcsS0FBSyxzQkFBc0IsS0FBSztBQUFBLE1BQ25FO0FBRUEsV0FBSyxhQUFhO0FBRWxCLFdBQUssS0FBSztBQUVWLFdBQUssYUFBYSxTQUFTLFFBQVEsV0FBVztBQUc5QyxXQUFLLGNBQWMsQ0FBQztBQUNwQixXQUFLLGdCQUFnQjtBQUFBLElBQ3pCO0FBQUEsRUFDSjtBQUFBLEVBUUEsZUFBZSxVQUFVO0FBQ3JCLFVBQU0sbUJBQW1CLENBQUM7QUFDMUIsUUFBSUEsS0FBSTtBQUNSLFVBQU0sSUFBSSxTQUFTO0FBQ25CLFdBQU9BLEtBQUksR0FBR0EsTUFBSztBQUNmLFVBQUksQ0FBQyxLQUFLLFdBQVcsUUFBUSxTQUFTQSxHQUFFO0FBQ3BDLHlCQUFpQixLQUFLLFNBQVNBLEdBQUU7QUFBQSxJQUN6QztBQUNBLFdBQU87QUFBQSxFQUNYO0FBQ0o7QUFDQSxPQUFPLFdBQVc7OztBQ2hrQlgsSUFBTUMsWUFBVyxPQUFPOzs7QUNReEIsU0FBUyxJQUFJLEtBQUssT0FBTyxJQUFJLEtBQUs7QUFDckMsTUFBSSxNQUFNO0FBRVYsUUFBTSxPQUFRLE9BQU8sYUFBYSxlQUFlO0FBQ2pELE1BQUksUUFBUTtBQUNSLFVBQU0sSUFBSSxXQUFXLE9BQU8sSUFBSTtBQUVwQyxNQUFJLE9BQU8sUUFBUSxVQUFVO0FBQ3pCLFFBQUksUUFBUSxJQUFJLE9BQU8sQ0FBQyxHQUFHO0FBQ3ZCLFVBQUksUUFBUSxJQUFJLE9BQU8sQ0FBQyxHQUFHO0FBQ3ZCLGNBQU0sSUFBSSxXQUFXO0FBQUEsTUFDekIsT0FDSztBQUNELGNBQU0sSUFBSSxPQUFPO0FBQUEsTUFDckI7QUFBQSxJQUNKO0FBQ0EsUUFBSSxDQUFDLHNCQUFzQixLQUFLLEdBQUcsR0FBRztBQUNsQyxVQUFJLGdCQUFnQixPQUFPLEtBQUs7QUFDNUIsY0FBTSxJQUFJLFdBQVcsT0FBTztBQUFBLE1BQ2hDLE9BQ0s7QUFDRCxjQUFNLGFBQWE7QUFBQSxNQUN2QjtBQUFBLElBQ0o7QUFFQSxVQUFNLE1BQU0sR0FBRztBQUFBLEVBQ25CO0FBRUEsTUFBSSxDQUFDLElBQUksTUFBTTtBQUNYLFFBQUksY0FBYyxLQUFLLElBQUksUUFBUSxHQUFHO0FBQ2xDLFVBQUksT0FBTztBQUFBLElBQ2YsV0FDUyxlQUFlLEtBQUssSUFBSSxRQUFRLEdBQUc7QUFDeEMsVUFBSSxPQUFPO0FBQUEsSUFDZjtBQUFBLEVBQ0o7QUFDQSxNQUFJLE9BQU8sSUFBSSxRQUFRO0FBQ3ZCLFFBQU0sT0FBTyxJQUFJLEtBQUssUUFBUSxHQUFHLE1BQU07QUFDdkMsUUFBTSxPQUFPLE9BQU8sTUFBTSxJQUFJLE9BQU8sTUFBTSxJQUFJO0FBRS9DLE1BQUksS0FBSyxJQUFJLFdBQVcsUUFBUSxPQUFPLE1BQU0sSUFBSSxPQUFPO0FBRXhELE1BQUksT0FDQSxJQUFJLFdBQ0EsUUFDQSxRQUNDLE9BQU8sSUFBSSxTQUFTLElBQUksT0FBTyxLQUFLLE1BQU0sSUFBSTtBQUN2RCxTQUFPO0FBQ1g7OztBQzFEQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUEsa0JBQUFDO0FBQUE7OztBQ0FBLElBQU1DLHlCQUF3QixPQUFPLGdCQUFnQjtBQUNyRCxJQUFNQyxVQUFTLENBQUMsUUFBUTtBQUNwQixTQUFPLE9BQU8sWUFBWSxXQUFXLGFBQy9CLFlBQVksT0FBTyxHQUFHLElBQ3RCLElBQUksa0JBQWtCO0FBQ2hDO0FBQ0EsSUFBTSxXQUFXLE9BQU8sVUFBVTtBQUNsQyxJQUFNQyxrQkFBaUIsT0FBTyxTQUFTLGNBQ2xDLE9BQU8sU0FBUyxlQUNiLFNBQVMsS0FBSyxJQUFJLE1BQU07QUFDaEMsSUFBTSxpQkFBaUIsT0FBTyxTQUFTLGNBQ2xDLE9BQU8sU0FBUyxlQUNiLFNBQVMsS0FBSyxJQUFJLE1BQU07QUFNekIsU0FBUyxTQUFTLEtBQUs7QUFDMUIsU0FBU0YsMkJBQTBCLGVBQWUsZUFBZUMsUUFBTyxHQUFHLE1BQ3RFQyxtQkFBa0IsZUFBZSxRQUNqQyxrQkFBa0IsZUFBZTtBQUMxQztBQUNPLFNBQVMsVUFBVSxLQUFLLFFBQVE7QUFDbkMsTUFBSSxDQUFDLE9BQU8sT0FBTyxRQUFRLFVBQVU7QUFDakMsV0FBTztBQUFBLEVBQ1g7QUFDQSxNQUFJLE1BQU0sUUFBUSxHQUFHLEdBQUc7QUFDcEIsYUFBU0MsS0FBSSxHQUFHLElBQUksSUFBSSxRQUFRQSxLQUFJLEdBQUdBLE1BQUs7QUFDeEMsVUFBSSxVQUFVLElBQUlBLEdBQUUsR0FBRztBQUNuQixlQUFPO0FBQUEsTUFDWDtBQUFBLElBQ0o7QUFDQSxXQUFPO0FBQUEsRUFDWDtBQUNBLE1BQUksU0FBUyxHQUFHLEdBQUc7QUFDZixXQUFPO0FBQUEsRUFDWDtBQUNBLE1BQUksSUFBSSxVQUNKLE9BQU8sSUFBSSxXQUFXLGNBQ3RCLFVBQVUsV0FBVyxHQUFHO0FBQ3hCLFdBQU8sVUFBVSxJQUFJLE9BQU8sR0FBRyxJQUFJO0FBQUEsRUFDdkM7QUFDQSxhQUFXLE9BQU8sS0FBSztBQUNuQixRQUFJLE9BQU8sVUFBVSxlQUFlLEtBQUssS0FBSyxHQUFHLEtBQUssVUFBVSxJQUFJLElBQUksR0FBRztBQUN2RSxhQUFPO0FBQUEsSUFDWDtBQUFBLEVBQ0o7QUFDQSxTQUFPO0FBQ1g7OztBQ3pDTyxTQUFTLGtCQUFrQixRQUFRO0FBQ3RDLFFBQU0sVUFBVSxDQUFDO0FBQ2pCLFFBQU0sYUFBYSxPQUFPO0FBQzFCLFFBQU0sT0FBTztBQUNiLE9BQUssT0FBTyxtQkFBbUIsWUFBWSxPQUFPO0FBQ2xELE9BQUssY0FBYyxRQUFRO0FBQzNCLFNBQU8sRUFBRSxRQUFRLE1BQU0sUUFBaUI7QUFDNUM7QUFDQSxTQUFTLG1CQUFtQixNQUFNLFNBQVM7QUFDdkMsTUFBSSxDQUFDO0FBQ0QsV0FBTztBQUNYLE1BQUksU0FBUyxJQUFJLEdBQUc7QUFDaEIsVUFBTSxjQUFjLEVBQUUsY0FBYyxNQUFNLEtBQUssUUFBUSxPQUFPO0FBQzlELFlBQVEsS0FBSyxJQUFJO0FBQ2pCLFdBQU87QUFBQSxFQUNYLFdBQ1MsTUFBTSxRQUFRLElBQUksR0FBRztBQUMxQixVQUFNLFVBQVUsSUFBSSxNQUFNLEtBQUssTUFBTTtBQUNyQyxhQUFTQyxLQUFJLEdBQUdBLEtBQUksS0FBSyxRQUFRQSxNQUFLO0FBQ2xDLGNBQVFBLE1BQUssbUJBQW1CLEtBQUtBLEtBQUksT0FBTztBQUFBLElBQ3BEO0FBQ0EsV0FBTztBQUFBLEVBQ1gsV0FDUyxPQUFPLFNBQVMsWUFBWSxFQUFFLGdCQUFnQixPQUFPO0FBQzFELFVBQU0sVUFBVSxDQUFDO0FBQ2pCLGVBQVcsT0FBTyxNQUFNO0FBQ3BCLFVBQUksT0FBTyxVQUFVLGVBQWUsS0FBSyxNQUFNLEdBQUcsR0FBRztBQUNqRCxnQkFBUSxPQUFPLG1CQUFtQixLQUFLLE1BQU0sT0FBTztBQUFBLE1BQ3hEO0FBQUEsSUFDSjtBQUNBLFdBQU87QUFBQSxFQUNYO0FBQ0EsU0FBTztBQUNYO0FBU08sU0FBUyxrQkFBa0IsUUFBUSxTQUFTO0FBQy9DLFNBQU8sT0FBTyxtQkFBbUIsT0FBTyxNQUFNLE9BQU87QUFDckQsU0FBTyxjQUFjO0FBQ3JCLFNBQU87QUFDWDtBQUNBLFNBQVMsbUJBQW1CLE1BQU0sU0FBUztBQUN2QyxNQUFJLENBQUM7QUFDRCxXQUFPO0FBQ1gsTUFBSSxRQUFRLEtBQUssaUJBQWlCLE1BQU07QUFDcEMsVUFBTSxlQUFlLE9BQU8sS0FBSyxRQUFRLFlBQ3JDLEtBQUssT0FBTyxLQUNaLEtBQUssTUFBTSxRQUFRO0FBQ3ZCLFFBQUksY0FBYztBQUNkLGFBQU8sUUFBUSxLQUFLO0FBQUEsSUFDeEIsT0FDSztBQUNELFlBQU0sSUFBSSxNQUFNLHFCQUFxQjtBQUFBLElBQ3pDO0FBQUEsRUFDSixXQUNTLE1BQU0sUUFBUSxJQUFJLEdBQUc7QUFDMUIsYUFBU0EsS0FBSSxHQUFHQSxLQUFJLEtBQUssUUFBUUEsTUFBSztBQUNsQyxXQUFLQSxNQUFLLG1CQUFtQixLQUFLQSxLQUFJLE9BQU87QUFBQSxJQUNqRDtBQUFBLEVBQ0osV0FDUyxPQUFPLFNBQVMsVUFBVTtBQUMvQixlQUFXLE9BQU8sTUFBTTtBQUNwQixVQUFJLE9BQU8sVUFBVSxlQUFlLEtBQUssTUFBTSxHQUFHLEdBQUc7QUFDakQsYUFBSyxPQUFPLG1CQUFtQixLQUFLLE1BQU0sT0FBTztBQUFBLE1BQ3JEO0FBQUEsSUFDSjtBQUFBLEVBQ0o7QUFDQSxTQUFPO0FBQ1g7OztBRjFFTyxJQUFNQyxZQUFXO0FBQ2pCLElBQUk7QUFBQSxDQUNWLFNBQVVDLGFBQVk7QUFDbkIsRUFBQUEsWUFBV0EsWUFBVyxhQUFhLEtBQUs7QUFDeEMsRUFBQUEsWUFBV0EsWUFBVyxnQkFBZ0IsS0FBSztBQUMzQyxFQUFBQSxZQUFXQSxZQUFXLFdBQVcsS0FBSztBQUN0QyxFQUFBQSxZQUFXQSxZQUFXLFNBQVMsS0FBSztBQUNwQyxFQUFBQSxZQUFXQSxZQUFXLG1CQUFtQixLQUFLO0FBQzlDLEVBQUFBLFlBQVdBLFlBQVcsa0JBQWtCLEtBQUs7QUFDN0MsRUFBQUEsWUFBV0EsWUFBVyxnQkFBZ0IsS0FBSztBQUMvQyxHQUFHLGVBQWUsYUFBYSxDQUFDLEVBQUU7QUFJM0IsSUFBTSxVQUFOLE1BQWM7QUFBQSxFQU1qQixZQUFZLFVBQVU7QUFDbEIsU0FBSyxXQUFXO0FBQUEsRUFDcEI7QUFBQSxFQU9BLE9BQU8sS0FBSztBQUNSLFFBQUksSUFBSSxTQUFTLFdBQVcsU0FBUyxJQUFJLFNBQVMsV0FBVyxLQUFLO0FBQzlELFVBQUksVUFBVSxHQUFHLEdBQUc7QUFDaEIsWUFBSSxPQUNBLElBQUksU0FBUyxXQUFXLFFBQ2xCLFdBQVcsZUFDWCxXQUFXO0FBQ3JCLGVBQU8sS0FBSyxlQUFlLEdBQUc7QUFBQSxNQUNsQztBQUFBLElBQ0o7QUFDQSxXQUFPLENBQUMsS0FBSyxlQUFlLEdBQUcsQ0FBQztBQUFBLEVBQ3BDO0FBQUEsRUFJQSxlQUFlLEtBQUs7QUFFaEIsUUFBSSxNQUFNLEtBQUssSUFBSTtBQUVuQixRQUFJLElBQUksU0FBUyxXQUFXLGdCQUN4QixJQUFJLFNBQVMsV0FBVyxZQUFZO0FBQ3BDLGFBQU8sSUFBSSxjQUFjO0FBQUEsSUFDN0I7QUFHQSxRQUFJLElBQUksT0FBTyxRQUFRLElBQUksS0FBSztBQUM1QixhQUFPLElBQUksTUFBTTtBQUFBLElBQ3JCO0FBRUEsUUFBSSxRQUFRLElBQUksSUFBSTtBQUNoQixhQUFPLElBQUk7QUFBQSxJQUNmO0FBRUEsUUFBSSxRQUFRLElBQUksTUFBTTtBQUNsQixhQUFPLEtBQUssVUFBVSxJQUFJLE1BQU0sS0FBSyxRQUFRO0FBQUEsSUFDakQ7QUFDQSxXQUFPO0FBQUEsRUFDWDtBQUFBLEVBTUEsZUFBZSxLQUFLO0FBQ2hCLFVBQU0saUJBQWlCLGtCQUFrQixHQUFHO0FBQzVDLFVBQU0sT0FBTyxLQUFLLGVBQWUsZUFBZSxNQUFNO0FBQ3RELFVBQU0sVUFBVSxlQUFlO0FBQy9CLFlBQVEsUUFBUSxJQUFJO0FBQ3BCLFdBQU87QUFBQSxFQUNYO0FBQ0o7QUFNTyxJQUFNLFVBQU4sY0FBc0IsUUFBUTtBQUFBLEVBTWpDLFlBQVksU0FBUztBQUNqQixVQUFNO0FBQ04sU0FBSyxVQUFVO0FBQUEsRUFDbkI7QUFBQSxFQU1BLElBQUksS0FBSztBQUNMLFFBQUk7QUFDSixRQUFJLE9BQU8sUUFBUSxVQUFVO0FBQ3pCLFVBQUksS0FBSyxlQUFlO0FBQ3BCLGNBQU0sSUFBSSxNQUFNLGlEQUFpRDtBQUFBLE1BQ3JFO0FBQ0EsZUFBUyxLQUFLLGFBQWEsR0FBRztBQUM5QixVQUFJLE9BQU8sU0FBUyxXQUFXLGdCQUMzQixPQUFPLFNBQVMsV0FBVyxZQUFZO0FBRXZDLGFBQUssZ0JBQWdCLElBQUksb0JBQW9CLE1BQU07QUFFbkQsWUFBSSxPQUFPLGdCQUFnQixHQUFHO0FBQzFCLGdCQUFNLGFBQWEsV0FBVyxNQUFNO0FBQUEsUUFDeEM7QUFBQSxNQUNKLE9BQ0s7QUFFRCxjQUFNLGFBQWEsV0FBVyxNQUFNO0FBQUEsTUFDeEM7QUFBQSxJQUNKLFdBQ1MsU0FBUyxHQUFHLEtBQUssSUFBSSxRQUFRO0FBRWxDLFVBQUksQ0FBQyxLQUFLLGVBQWU7QUFDckIsY0FBTSxJQUFJLE1BQU0sa0RBQWtEO0FBQUEsTUFDdEUsT0FDSztBQUNELGlCQUFTLEtBQUssY0FBYyxlQUFlLEdBQUc7QUFDOUMsWUFBSSxRQUFRO0FBRVIsZUFBSyxnQkFBZ0I7QUFDckIsZ0JBQU0sYUFBYSxXQUFXLE1BQU07QUFBQSxRQUN4QztBQUFBLE1BQ0o7QUFBQSxJQUNKLE9BQ0s7QUFDRCxZQUFNLElBQUksTUFBTSxtQkFBbUIsR0FBRztBQUFBLElBQzFDO0FBQUEsRUFDSjtBQUFBLEVBT0EsYUFBYSxLQUFLO0FBQ2QsUUFBSUMsS0FBSTtBQUVSLFVBQU0sSUFBSTtBQUFBLE1BQ04sTUFBTSxPQUFPLElBQUksT0FBTyxDQUFDLENBQUM7QUFBQSxJQUM5QjtBQUNBLFFBQUksV0FBVyxFQUFFLFVBQVUsUUFBVztBQUNsQyxZQUFNLElBQUksTUFBTSx5QkFBeUIsRUFBRSxJQUFJO0FBQUEsSUFDbkQ7QUFFQSxRQUFJLEVBQUUsU0FBUyxXQUFXLGdCQUN0QixFQUFFLFNBQVMsV0FBVyxZQUFZO0FBQ2xDLFlBQU0sUUFBUUEsS0FBSTtBQUNsQixhQUFPLElBQUksT0FBTyxFQUFFQSxFQUFDLE1BQU0sT0FBT0EsTUFBSyxJQUFJLFFBQVE7QUFBQSxNQUFFO0FBQ3JELFlBQU0sTUFBTSxJQUFJLFVBQVUsT0FBT0EsRUFBQztBQUNsQyxVQUFJLE9BQU8sT0FBTyxHQUFHLEtBQUssSUFBSSxPQUFPQSxFQUFDLE1BQU0sS0FBSztBQUM3QyxjQUFNLElBQUksTUFBTSxxQkFBcUI7QUFBQSxNQUN6QztBQUNBLFFBQUUsY0FBYyxPQUFPLEdBQUc7QUFBQSxJQUM5QjtBQUVBLFFBQUksUUFBUSxJQUFJLE9BQU9BLEtBQUksQ0FBQyxHQUFHO0FBQzNCLFlBQU0sUUFBUUEsS0FBSTtBQUNsQixhQUFPLEVBQUVBLElBQUc7QUFDUixjQUFNLElBQUksSUFBSSxPQUFPQSxFQUFDO0FBQ3RCLFlBQUksUUFBUTtBQUNSO0FBQ0osWUFBSUEsT0FBTSxJQUFJO0FBQ1Y7QUFBQSxNQUNSO0FBQ0EsUUFBRSxNQUFNLElBQUksVUFBVSxPQUFPQSxFQUFDO0FBQUEsSUFDbEMsT0FDSztBQUNELFFBQUUsTUFBTTtBQUFBLElBQ1o7QUFFQSxVQUFNLE9BQU8sSUFBSSxPQUFPQSxLQUFJLENBQUM7QUFDN0IsUUFBSSxPQUFPLFFBQVEsT0FBTyxJQUFJLEtBQUssTUFBTTtBQUNyQyxZQUFNLFFBQVFBLEtBQUk7QUFDbEIsYUFBTyxFQUFFQSxJQUFHO0FBQ1IsY0FBTSxJQUFJLElBQUksT0FBT0EsRUFBQztBQUN0QixZQUFJLFFBQVEsS0FBSyxPQUFPLENBQUMsS0FBSyxHQUFHO0FBQzdCLFlBQUVBO0FBQ0Y7QUFBQSxRQUNKO0FBQ0EsWUFBSUEsT0FBTSxJQUFJO0FBQ1Y7QUFBQSxNQUNSO0FBQ0EsUUFBRSxLQUFLLE9BQU8sSUFBSSxVQUFVLE9BQU9BLEtBQUksQ0FBQyxDQUFDO0FBQUEsSUFDN0M7QUFFQSxRQUFJLElBQUksT0FBTyxFQUFFQSxFQUFDLEdBQUc7QUFDakIsWUFBTSxVQUFVLEtBQUssU0FBUyxJQUFJLE9BQU9BLEVBQUMsQ0FBQztBQUMzQyxVQUFJLFFBQVEsZUFBZSxFQUFFLE1BQU0sT0FBTyxHQUFHO0FBQ3pDLFVBQUUsT0FBTztBQUFBLE1BQ2IsT0FDSztBQUNELGNBQU0sSUFBSSxNQUFNLGlCQUFpQjtBQUFBLE1BQ3JDO0FBQUEsSUFDSjtBQUNBLFdBQU87QUFBQSxFQUNYO0FBQUEsRUFDQSxTQUFTLEtBQUs7QUFDVixRQUFJO0FBQ0EsYUFBTyxLQUFLLE1BQU0sS0FBSyxLQUFLLE9BQU87QUFBQSxJQUN2QyxTQUNPLEdBQVA7QUFDSSxhQUFPO0FBQUEsSUFDWDtBQUFBLEVBQ0o7QUFBQSxFQUNBLE9BQU8sZUFBZSxNQUFNLFNBQVM7QUFDakMsWUFBUTtBQUFBLFdBQ0MsV0FBVztBQUNaLGVBQU8sT0FBTyxZQUFZO0FBQUEsV0FDekIsV0FBVztBQUNaLGVBQU8sWUFBWTtBQUFBLFdBQ2xCLFdBQVc7QUFDWixlQUFPLE9BQU8sWUFBWSxZQUFZLE9BQU8sWUFBWTtBQUFBLFdBQ3hELFdBQVc7QUFBQSxXQUNYLFdBQVc7QUFDWixlQUFPLE1BQU0sUUFBUSxPQUFPLEtBQUssUUFBUSxTQUFTO0FBQUEsV0FDakQsV0FBVztBQUFBLFdBQ1gsV0FBVztBQUNaLGVBQU8sTUFBTSxRQUFRLE9BQU87QUFBQTtBQUFBLEVBRXhDO0FBQUEsRUFJQSxVQUFVO0FBQ04sUUFBSSxLQUFLLGVBQWU7QUFDcEIsV0FBSyxjQUFjLHVCQUF1QjtBQUFBLElBQzlDO0FBQUEsRUFDSjtBQUNKO0FBU0EsSUFBTSxzQkFBTixNQUEwQjtBQUFBLEVBQ3RCLFlBQVksUUFBUTtBQUNoQixTQUFLLFNBQVM7QUFDZCxTQUFLLFVBQVUsQ0FBQztBQUNoQixTQUFLLFlBQVk7QUFBQSxFQUNyQjtBQUFBLEVBU0EsZUFBZSxTQUFTO0FBQ3BCLFNBQUssUUFBUSxLQUFLLE9BQU87QUFDekIsUUFBSSxLQUFLLFFBQVEsV0FBVyxLQUFLLFVBQVUsYUFBYTtBQUVwRCxZQUFNLFNBQVMsa0JBQWtCLEtBQUssV0FBVyxLQUFLLE9BQU87QUFDN0QsV0FBSyx1QkFBdUI7QUFDNUIsYUFBTztBQUFBLElBQ1g7QUFDQSxXQUFPO0FBQUEsRUFDWDtBQUFBLEVBSUEseUJBQXlCO0FBQ3JCLFNBQUssWUFBWTtBQUNqQixTQUFLLFVBQVUsQ0FBQztBQUFBLEVBQ3BCO0FBQ0o7OztBRy9STyxTQUFTLEdBQUcsS0FBSyxJQUFJLElBQUk7QUFDNUIsTUFBSSxHQUFHLElBQUksRUFBRTtBQUNiLFNBQU8sU0FBUyxhQUFhO0FBQ3pCLFFBQUksSUFBSSxJQUFJLEVBQUU7QUFBQSxFQUNsQjtBQUNKOzs7QUNFQSxJQUFNLGtCQUFrQixPQUFPLE9BQU87QUFBQSxFQUNsQyxTQUFTO0FBQUEsRUFDVCxlQUFlO0FBQUEsRUFDZixZQUFZO0FBQUEsRUFDWixlQUFlO0FBQUEsRUFFZixhQUFhO0FBQUEsRUFDYixnQkFBZ0I7QUFDcEIsQ0FBQztBQUNNLElBQU1DLFVBQU4sY0FBcUIsUUFBUTtBQUFBLEVBTWhDLFlBQVksSUFBSSxLQUFLLE1BQU07QUFDdkIsVUFBTTtBQUNOLFNBQUssWUFBWTtBQUNqQixTQUFLLGdCQUFnQixDQUFDO0FBQ3RCLFNBQUssYUFBYSxDQUFDO0FBQ25CLFNBQUssTUFBTTtBQUNYLFNBQUssT0FBTyxDQUFDO0FBQ2IsU0FBSyxRQUFRLENBQUM7QUFDZCxTQUFLLEtBQUs7QUFDVixTQUFLLE1BQU07QUFDWCxRQUFJLFFBQVEsS0FBSyxNQUFNO0FBQ25CLFdBQUssT0FBTyxLQUFLO0FBQUEsSUFDckI7QUFDQSxRQUFJLEtBQUssR0FBRztBQUNSLFdBQUssS0FBSztBQUFBLEVBQ2xCO0FBQUEsRUFJQSxJQUFJLGVBQWU7QUFDZixXQUFPLENBQUMsS0FBSztBQUFBLEVBQ2pCO0FBQUEsRUFNQSxZQUFZO0FBQ1IsUUFBSSxLQUFLO0FBQ0w7QUFDSixVQUFNLEtBQUssS0FBSztBQUNoQixTQUFLLE9BQU87QUFBQSxNQUNSLEdBQUcsSUFBSSxRQUFRLEtBQUssT0FBTyxLQUFLLElBQUksQ0FBQztBQUFBLE1BQ3JDLEdBQUcsSUFBSSxVQUFVLEtBQUssU0FBUyxLQUFLLElBQUksQ0FBQztBQUFBLE1BQ3pDLEdBQUcsSUFBSSxTQUFTLEtBQUssUUFBUSxLQUFLLElBQUksQ0FBQztBQUFBLE1BQ3ZDLEdBQUcsSUFBSSxTQUFTLEtBQUssUUFBUSxLQUFLLElBQUksQ0FBQztBQUFBLElBQzNDO0FBQUEsRUFDSjtBQUFBLEVBSUEsSUFBSSxTQUFTO0FBQ1QsV0FBTyxDQUFDLENBQUMsS0FBSztBQUFBLEVBQ2xCO0FBQUEsRUFNQSxVQUFVO0FBQ04sUUFBSSxLQUFLO0FBQ0wsYUFBTztBQUNYLFNBQUssVUFBVTtBQUNmLFFBQUksQ0FBQyxLQUFLLEdBQUc7QUFDVCxXQUFLLEdBQUcsS0FBSztBQUNqQixRQUFJLFdBQVcsS0FBSyxHQUFHO0FBQ25CLFdBQUssT0FBTztBQUNoQixXQUFPO0FBQUEsRUFDWDtBQUFBLEVBSUEsT0FBTztBQUNILFdBQU8sS0FBSyxRQUFRO0FBQUEsRUFDeEI7QUFBQSxFQU9BLFFBQVEsTUFBTTtBQUNWLFNBQUssUUFBUSxTQUFTO0FBQ3RCLFNBQUssS0FBSyxNQUFNLE1BQU0sSUFBSTtBQUMxQixXQUFPO0FBQUEsRUFDWDtBQUFBLEVBUUEsS0FBSyxPQUFPLE1BQU07QUFDZCxRQUFJLGdCQUFnQixlQUFlLEVBQUUsR0FBRztBQUNwQyxZQUFNLElBQUksTUFBTSxNQUFNLEdBQUcsU0FBUyxJQUFJLDRCQUE0QjtBQUFBLElBQ3RFO0FBQ0EsU0FBSyxRQUFRLEVBQUU7QUFDZixVQUFNLFNBQVM7QUFBQSxNQUNYLE1BQU0sV0FBVztBQUFBLE1BQ2pCLE1BQU07QUFBQSxJQUNWO0FBQ0EsV0FBTyxVQUFVLENBQUM7QUFDbEIsV0FBTyxRQUFRLFdBQVcsS0FBSyxNQUFNLGFBQWE7QUFFbEQsUUFBSSxlQUFlLE9BQU8sS0FBSyxLQUFLLFNBQVMsSUFBSTtBQUM3QyxZQUFNLEtBQUssS0FBSztBQUNoQixZQUFNLE1BQU0sS0FBSyxJQUFJO0FBQ3JCLFdBQUsscUJBQXFCLElBQUksR0FBRztBQUNqQyxhQUFPLEtBQUs7QUFBQSxJQUNoQjtBQUNBLFVBQU0sc0JBQXNCLEtBQUssR0FBRyxVQUNoQyxLQUFLLEdBQUcsT0FBTyxhQUNmLEtBQUssR0FBRyxPQUFPLFVBQVU7QUFDN0IsVUFBTSxnQkFBZ0IsS0FBSyxNQUFNLGFBQWEsQ0FBQyx1QkFBdUIsQ0FBQyxLQUFLO0FBQzVFLFFBQUksZUFBZTtBQUFBLElBQ25CLFdBQ1MsS0FBSyxXQUFXO0FBQ3JCLFdBQUssd0JBQXdCLE1BQU07QUFDbkMsV0FBSyxPQUFPLE1BQU07QUFBQSxJQUN0QixPQUNLO0FBQ0QsV0FBSyxXQUFXLEtBQUssTUFBTTtBQUFBLElBQy9CO0FBQ0EsU0FBSyxRQUFRLENBQUM7QUFDZCxXQUFPO0FBQUEsRUFDWDtBQUFBLEVBSUEscUJBQXFCLElBQUksS0FBSztBQUMxQixVQUFNLFVBQVUsS0FBSyxNQUFNO0FBQzNCLFFBQUksWUFBWSxRQUFXO0FBQ3ZCLFdBQUssS0FBSyxNQUFNO0FBQ2hCO0FBQUEsSUFDSjtBQUVBLFVBQU0sUUFBUSxLQUFLLEdBQUcsYUFBYSxNQUFNO0FBQ3JDLGFBQU8sS0FBSyxLQUFLO0FBQ2pCLGVBQVNDLEtBQUksR0FBR0EsS0FBSSxLQUFLLFdBQVcsUUFBUUEsTUFBSztBQUM3QyxZQUFJLEtBQUssV0FBV0EsSUFBRyxPQUFPLElBQUk7QUFDOUIsZUFBSyxXQUFXLE9BQU9BLElBQUcsQ0FBQztBQUFBLFFBQy9CO0FBQUEsTUFDSjtBQUNBLFVBQUksS0FBSyxNQUFNLElBQUksTUFBTSx5QkFBeUIsQ0FBQztBQUFBLElBQ3ZELEdBQUcsT0FBTztBQUNWLFNBQUssS0FBSyxNQUFNLElBQUksU0FBUztBQUV6QixXQUFLLEdBQUcsZUFBZSxLQUFLO0FBQzVCLFVBQUksTUFBTSxNQUFNLENBQUMsTUFBTSxHQUFHLElBQUksQ0FBQztBQUFBLElBQ25DO0FBQUEsRUFDSjtBQUFBLEVBT0EsT0FBTyxRQUFRO0FBQ1gsV0FBTyxNQUFNLEtBQUs7QUFDbEIsU0FBSyxHQUFHLFFBQVEsTUFBTTtBQUFBLEVBQzFCO0FBQUEsRUFNQSxTQUFTO0FBQ0wsUUFBSSxPQUFPLEtBQUssUUFBUSxZQUFZO0FBQ2hDLFdBQUssS0FBSyxDQUFDLFNBQVM7QUFDaEIsYUFBSyxPQUFPLEVBQUUsTUFBTSxXQUFXLFNBQVMsS0FBSyxDQUFDO0FBQUEsTUFDbEQsQ0FBQztBQUFBLElBQ0wsT0FDSztBQUNELFdBQUssT0FBTyxFQUFFLE1BQU0sV0FBVyxTQUFTLE1BQU0sS0FBSyxLQUFLLENBQUM7QUFBQSxJQUM3RDtBQUFBLEVBQ0o7QUFBQSxFQU9BLFFBQVEsS0FBSztBQUNULFFBQUksQ0FBQyxLQUFLLFdBQVc7QUFDakIsV0FBSyxhQUFhLGlCQUFpQixHQUFHO0FBQUEsSUFDMUM7QUFBQSxFQUNKO0FBQUEsRUFRQSxRQUFRLFFBQVEsYUFBYTtBQUN6QixTQUFLLFlBQVk7QUFDakIsV0FBTyxLQUFLO0FBQ1osU0FBSyxhQUFhLGNBQWMsUUFBUSxXQUFXO0FBQUEsRUFDdkQ7QUFBQSxFQU9BLFNBQVMsUUFBUTtBQUNiLFVBQU0sZ0JBQWdCLE9BQU8sUUFBUSxLQUFLO0FBQzFDLFFBQUksQ0FBQztBQUNEO0FBQ0osWUFBUSxPQUFPO0FBQUEsV0FDTixXQUFXO0FBQ1osWUFBSSxPQUFPLFFBQVEsT0FBTyxLQUFLLEtBQUs7QUFDaEMsZ0JBQU0sS0FBSyxPQUFPLEtBQUs7QUFDdkIsZUFBSyxVQUFVLEVBQUU7QUFBQSxRQUNyQixPQUNLO0FBQ0QsZUFBSyxhQUFhLGlCQUFpQixJQUFJLE1BQU0sMkxBQTJMLENBQUM7QUFBQSxRQUM3TztBQUNBO0FBQUEsV0FDQyxXQUFXO0FBQUEsV0FDWCxXQUFXO0FBQ1osYUFBSyxRQUFRLE1BQU07QUFDbkI7QUFBQSxXQUNDLFdBQVc7QUFBQSxXQUNYLFdBQVc7QUFDWixhQUFLLE1BQU0sTUFBTTtBQUNqQjtBQUFBLFdBQ0MsV0FBVztBQUNaLGFBQUssYUFBYTtBQUNsQjtBQUFBLFdBQ0MsV0FBVztBQUNaLGFBQUssUUFBUTtBQUNiLGNBQU0sTUFBTSxJQUFJLE1BQU0sT0FBTyxLQUFLLE9BQU87QUFFekMsWUFBSSxPQUFPLE9BQU8sS0FBSztBQUN2QixhQUFLLGFBQWEsaUJBQWlCLEdBQUc7QUFDdEM7QUFBQTtBQUFBLEVBRVo7QUFBQSxFQU9BLFFBQVEsUUFBUTtBQUNaLFVBQU0sT0FBTyxPQUFPLFFBQVEsQ0FBQztBQUM3QixRQUFJLFFBQVEsT0FBTyxJQUFJO0FBQ25CLFdBQUssS0FBSyxLQUFLLElBQUksT0FBTyxFQUFFLENBQUM7QUFBQSxJQUNqQztBQUNBLFFBQUksS0FBSyxXQUFXO0FBQ2hCLFdBQUssVUFBVSxJQUFJO0FBQUEsSUFDdkIsT0FDSztBQUNELFdBQUssY0FBYyxLQUFLLE9BQU8sT0FBTyxJQUFJLENBQUM7QUFBQSxJQUMvQztBQUFBLEVBQ0o7QUFBQSxFQUNBLFVBQVUsTUFBTTtBQUNaLFFBQUksS0FBSyxpQkFBaUIsS0FBSyxjQUFjLFFBQVE7QUFDakQsWUFBTSxZQUFZLEtBQUssY0FBYyxNQUFNO0FBQzNDLGlCQUFXLFlBQVksV0FBVztBQUM5QixpQkFBUyxNQUFNLE1BQU0sSUFBSTtBQUFBLE1BQzdCO0FBQUEsSUFDSjtBQUNBLFVBQU0sS0FBSyxNQUFNLE1BQU0sSUFBSTtBQUFBLEVBQy9CO0FBQUEsRUFNQSxJQUFJLElBQUk7QUFDSixVQUFNQyxRQUFPO0FBQ2IsUUFBSSxPQUFPO0FBQ1gsV0FBTyxZQUFhLE1BQU07QUFFdEIsVUFBSTtBQUNBO0FBQ0osYUFBTztBQUNQLE1BQUFBLE1BQUssT0FBTztBQUFBLFFBQ1IsTUFBTSxXQUFXO0FBQUEsUUFDakI7QUFBQSxRQUNBLE1BQU07QUFBQSxNQUNWLENBQUM7QUFBQSxJQUNMO0FBQUEsRUFDSjtBQUFBLEVBT0EsTUFBTSxRQUFRO0FBQ1YsVUFBTSxNQUFNLEtBQUssS0FBSyxPQUFPO0FBQzdCLFFBQUksZUFBZSxPQUFPLEtBQUs7QUFDM0IsVUFBSSxNQUFNLE1BQU0sT0FBTyxJQUFJO0FBQzNCLGFBQU8sS0FBSyxLQUFLLE9BQU87QUFBQSxJQUM1QixPQUNLO0FBQUEsSUFDTDtBQUFBLEVBQ0o7QUFBQSxFQU1BLFVBQVUsSUFBSTtBQUNWLFNBQUssS0FBSztBQUNWLFNBQUssWUFBWTtBQUNqQixTQUFLLGFBQWE7QUFDbEIsU0FBSyxhQUFhLFNBQVM7QUFBQSxFQUMvQjtBQUFBLEVBTUEsZUFBZTtBQUNYLFNBQUssY0FBYyxRQUFRLENBQUMsU0FBUyxLQUFLLFVBQVUsSUFBSSxDQUFDO0FBQ3pELFNBQUssZ0JBQWdCLENBQUM7QUFDdEIsU0FBSyxXQUFXLFFBQVEsQ0FBQyxXQUFXO0FBQ2hDLFdBQUssd0JBQXdCLE1BQU07QUFDbkMsV0FBSyxPQUFPLE1BQU07QUFBQSxJQUN0QixDQUFDO0FBQ0QsU0FBSyxhQUFhLENBQUM7QUFBQSxFQUN2QjtBQUFBLEVBTUEsZUFBZTtBQUNYLFNBQUssUUFBUTtBQUNiLFNBQUssUUFBUSxzQkFBc0I7QUFBQSxFQUN2QztBQUFBLEVBUUEsVUFBVTtBQUNOLFFBQUksS0FBSyxNQUFNO0FBRVgsV0FBSyxLQUFLLFFBQVEsQ0FBQyxlQUFlLFdBQVcsQ0FBQztBQUM5QyxXQUFLLE9BQU87QUFBQSxJQUNoQjtBQUNBLFNBQUssR0FBRyxZQUFZLElBQUk7QUFBQSxFQUM1QjtBQUFBLEVBT0EsYUFBYTtBQUNULFFBQUksS0FBSyxXQUFXO0FBQ2hCLFdBQUssT0FBTyxFQUFFLE1BQU0sV0FBVyxXQUFXLENBQUM7QUFBQSxJQUMvQztBQUVBLFNBQUssUUFBUTtBQUNiLFFBQUksS0FBSyxXQUFXO0FBRWhCLFdBQUssUUFBUSxzQkFBc0I7QUFBQSxJQUN2QztBQUNBLFdBQU87QUFBQSxFQUNYO0FBQUEsRUFPQSxRQUFRO0FBQ0osV0FBTyxLQUFLLFdBQVc7QUFBQSxFQUMzQjtBQUFBLEVBUUEsU0FBUyxVQUFVO0FBQ2YsU0FBSyxNQUFNLFdBQVc7QUFDdEIsV0FBTztBQUFBLEVBQ1g7QUFBQSxFQVFBLElBQUksV0FBVztBQUNYLFNBQUssTUFBTSxXQUFXO0FBQ3RCLFdBQU87QUFBQSxFQUNYO0FBQUEsRUFnQkEsUUFBUSxTQUFTO0FBQ2IsU0FBSyxNQUFNLFVBQVU7QUFDckIsV0FBTztBQUFBLEVBQ1g7QUFBQSxFQVFBLE1BQU0sVUFBVTtBQUNaLFNBQUssZ0JBQWdCLEtBQUssaUJBQWlCLENBQUM7QUFDNUMsU0FBSyxjQUFjLEtBQUssUUFBUTtBQUNoQyxXQUFPO0FBQUEsRUFDWDtBQUFBLEVBUUEsV0FBVyxVQUFVO0FBQ2pCLFNBQUssZ0JBQWdCLEtBQUssaUJBQWlCLENBQUM7QUFDNUMsU0FBSyxjQUFjLFFBQVEsUUFBUTtBQUNuQyxXQUFPO0FBQUEsRUFDWDtBQUFBLEVBT0EsT0FBTyxVQUFVO0FBQ2IsUUFBSSxDQUFDLEtBQUssZUFBZTtBQUNyQixhQUFPO0FBQUEsSUFDWDtBQUNBLFFBQUksVUFBVTtBQUNWLFlBQU0sWUFBWSxLQUFLO0FBQ3ZCLGVBQVNELEtBQUksR0FBR0EsS0FBSSxVQUFVLFFBQVFBLE1BQUs7QUFDdkMsWUFBSSxhQUFhLFVBQVVBLEtBQUk7QUFDM0Isb0JBQVUsT0FBT0EsSUFBRyxDQUFDO0FBQ3JCLGlCQUFPO0FBQUEsUUFDWDtBQUFBLE1BQ0o7QUFBQSxJQUNKLE9BQ0s7QUFDRCxXQUFLLGdCQUFnQixDQUFDO0FBQUEsSUFDMUI7QUFDQSxXQUFPO0FBQUEsRUFDWDtBQUFBLEVBT0EsZUFBZTtBQUNYLFdBQU8sS0FBSyxpQkFBaUIsQ0FBQztBQUFBLEVBQ2xDO0FBQUEsRUFpQkEsY0FBYyxVQUFVO0FBQ3BCLFNBQUssd0JBQXdCLEtBQUsseUJBQXlCLENBQUM7QUFDNUQsU0FBSyxzQkFBc0IsS0FBSyxRQUFRO0FBQ3hDLFdBQU87QUFBQSxFQUNYO0FBQUEsRUFpQkEsbUJBQW1CLFVBQVU7QUFDekIsU0FBSyx3QkFBd0IsS0FBSyx5QkFBeUIsQ0FBQztBQUM1RCxTQUFLLHNCQUFzQixRQUFRLFFBQVE7QUFDM0MsV0FBTztBQUFBLEVBQ1g7QUFBQSxFQXFCQSxlQUFlLFVBQVU7QUFDckIsUUFBSSxDQUFDLEtBQUssdUJBQXVCO0FBQzdCLGFBQU87QUFBQSxJQUNYO0FBQ0EsUUFBSSxVQUFVO0FBQ1YsWUFBTSxZQUFZLEtBQUs7QUFDdkIsZUFBU0EsS0FBSSxHQUFHQSxLQUFJLFVBQVUsUUFBUUEsTUFBSztBQUN2QyxZQUFJLGFBQWEsVUFBVUEsS0FBSTtBQUMzQixvQkFBVSxPQUFPQSxJQUFHLENBQUM7QUFDckIsaUJBQU87QUFBQSxRQUNYO0FBQUEsTUFDSjtBQUFBLElBQ0osT0FDSztBQUNELFdBQUssd0JBQXdCLENBQUM7QUFBQSxJQUNsQztBQUNBLFdBQU87QUFBQSxFQUNYO0FBQUEsRUFPQSx1QkFBdUI7QUFDbkIsV0FBTyxLQUFLLHlCQUF5QixDQUFDO0FBQUEsRUFDMUM7QUFBQSxFQVFBLHdCQUF3QixRQUFRO0FBQzVCLFFBQUksS0FBSyx5QkFBeUIsS0FBSyxzQkFBc0IsUUFBUTtBQUNqRSxZQUFNLFlBQVksS0FBSyxzQkFBc0IsTUFBTTtBQUNuRCxpQkFBVyxZQUFZLFdBQVc7QUFDOUIsaUJBQVMsTUFBTSxNQUFNLE9BQU8sSUFBSTtBQUFBLE1BQ3BDO0FBQUEsSUFDSjtBQUFBLEVBQ0o7QUFDSjs7O0FDcmtCTyxTQUFTLFFBQVEsTUFBTTtBQUMxQixTQUFPLFFBQVEsQ0FBQztBQUNoQixPQUFLLEtBQUssS0FBSyxPQUFPO0FBQ3RCLE9BQUssTUFBTSxLQUFLLE9BQU87QUFDdkIsT0FBSyxTQUFTLEtBQUssVUFBVTtBQUM3QixPQUFLLFNBQVMsS0FBSyxTQUFTLEtBQUssS0FBSyxVQUFVLElBQUksS0FBSyxTQUFTO0FBQ2xFLE9BQUssV0FBVztBQUNwQjtBQU9BLFFBQVEsVUFBVSxXQUFXLFdBQVk7QUFDckMsTUFBSSxLQUFLLEtBQUssS0FBSyxLQUFLLElBQUksS0FBSyxRQUFRLEtBQUssVUFBVTtBQUN4RCxNQUFJLEtBQUssUUFBUTtBQUNiLFFBQUksT0FBTyxLQUFLLE9BQU87QUFDdkIsUUFBSSxZQUFZLEtBQUssTUFBTSxPQUFPLEtBQUssU0FBUyxFQUFFO0FBQ2xELFVBQU0sS0FBSyxNQUFNLE9BQU8sRUFBRSxJQUFJLE1BQU0sSUFBSSxLQUFLLFlBQVksS0FBSztBQUFBLEVBQ2xFO0FBQ0EsU0FBTyxLQUFLLElBQUksSUFBSSxLQUFLLEdBQUcsSUFBSTtBQUNwQztBQU1BLFFBQVEsVUFBVSxRQUFRLFdBQVk7QUFDbEMsT0FBSyxXQUFXO0FBQ3BCO0FBTUEsUUFBUSxVQUFVLFNBQVMsU0FBVSxLQUFLO0FBQ3RDLE9BQUssS0FBSztBQUNkO0FBTUEsUUFBUSxVQUFVLFNBQVMsU0FBVSxLQUFLO0FBQ3RDLE9BQUssTUFBTTtBQUNmO0FBTUEsUUFBUSxVQUFVLFlBQVksU0FBVSxRQUFRO0FBQzVDLE9BQUssU0FBUztBQUNsQjs7O0FDM0RPLElBQU0sVUFBTixjQUFzQixRQUFRO0FBQUEsRUFDakMsWUFBWSxLQUFLLE1BQU07QUFDbkIsUUFBSTtBQUNKLFVBQU07QUFDTixTQUFLLE9BQU8sQ0FBQztBQUNiLFNBQUssT0FBTyxDQUFDO0FBQ2IsUUFBSSxPQUFPLGFBQWEsT0FBTyxLQUFLO0FBQ2hDLGFBQU87QUFDUCxZQUFNO0FBQUEsSUFDVjtBQUNBLFdBQU8sUUFBUSxDQUFDO0FBQ2hCLFNBQUssT0FBTyxLQUFLLFFBQVE7QUFDekIsU0FBSyxPQUFPO0FBQ1osMEJBQXNCLE1BQU0sSUFBSTtBQUNoQyxTQUFLLGFBQWEsS0FBSyxpQkFBaUIsS0FBSztBQUM3QyxTQUFLLHFCQUFxQixLQUFLLHdCQUF3QixRQUFRO0FBQy9ELFNBQUssa0JBQWtCLEtBQUsscUJBQXFCLEdBQUk7QUFDckQsU0FBSyxxQkFBcUIsS0FBSyx3QkFBd0IsR0FBSTtBQUMzRCxTQUFLLHFCQUFxQixLQUFLLEtBQUsseUJBQXlCLFFBQVEsT0FBTyxTQUFTLEtBQUssR0FBRztBQUM3RixTQUFLLFVBQVUsSUFBSSxRQUFRO0FBQUEsTUFDdkIsS0FBSyxLQUFLLGtCQUFrQjtBQUFBLE1BQzVCLEtBQUssS0FBSyxxQkFBcUI7QUFBQSxNQUMvQixRQUFRLEtBQUssb0JBQW9CO0FBQUEsSUFDckMsQ0FBQztBQUNELFNBQUssUUFBUSxRQUFRLEtBQUssVUFBVSxNQUFRLEtBQUssT0FBTztBQUN4RCxTQUFLLGNBQWM7QUFDbkIsU0FBSyxNQUFNO0FBQ1gsVUFBTSxVQUFVLEtBQUssVUFBVTtBQUMvQixTQUFLLFVBQVUsSUFBSSxRQUFRLFFBQVE7QUFDbkMsU0FBSyxVQUFVLElBQUksUUFBUSxRQUFRO0FBQ25DLFNBQUssZUFBZSxLQUFLLGdCQUFnQjtBQUN6QyxRQUFJLEtBQUs7QUFDTCxXQUFLLEtBQUs7QUFBQSxFQUNsQjtBQUFBLEVBQ0EsYUFBYSxHQUFHO0FBQ1osUUFBSSxDQUFDLFVBQVU7QUFDWCxhQUFPLEtBQUs7QUFDaEIsU0FBSyxnQkFBZ0IsQ0FBQyxDQUFDO0FBQ3ZCLFdBQU87QUFBQSxFQUNYO0FBQUEsRUFDQSxxQkFBcUIsR0FBRztBQUNwQixRQUFJLE1BQU07QUFDTixhQUFPLEtBQUs7QUFDaEIsU0FBSyx3QkFBd0I7QUFDN0IsV0FBTztBQUFBLEVBQ1g7QUFBQSxFQUNBLGtCQUFrQixHQUFHO0FBQ2pCLFFBQUk7QUFDSixRQUFJLE1BQU07QUFDTixhQUFPLEtBQUs7QUFDaEIsU0FBSyxxQkFBcUI7QUFDMUIsS0FBQyxLQUFLLEtBQUssYUFBYSxRQUFRLE9BQU8sU0FBUyxTQUFTLEdBQUcsT0FBTyxDQUFDO0FBQ3BFLFdBQU87QUFBQSxFQUNYO0FBQUEsRUFDQSxvQkFBb0IsR0FBRztBQUNuQixRQUFJO0FBQ0osUUFBSSxNQUFNO0FBQ04sYUFBTyxLQUFLO0FBQ2hCLFNBQUssdUJBQXVCO0FBQzVCLEtBQUMsS0FBSyxLQUFLLGFBQWEsUUFBUSxPQUFPLFNBQVMsU0FBUyxHQUFHLFVBQVUsQ0FBQztBQUN2RSxXQUFPO0FBQUEsRUFDWDtBQUFBLEVBQ0EscUJBQXFCLEdBQUc7QUFDcEIsUUFBSTtBQUNKLFFBQUksTUFBTTtBQUNOLGFBQU8sS0FBSztBQUNoQixTQUFLLHdCQUF3QjtBQUM3QixLQUFDLEtBQUssS0FBSyxhQUFhLFFBQVEsT0FBTyxTQUFTLFNBQVMsR0FBRyxPQUFPLENBQUM7QUFDcEUsV0FBTztBQUFBLEVBQ1g7QUFBQSxFQUNBLFFBQVEsR0FBRztBQUNQLFFBQUksQ0FBQyxVQUFVO0FBQ1gsYUFBTyxLQUFLO0FBQ2hCLFNBQUssV0FBVztBQUNoQixXQUFPO0FBQUEsRUFDWDtBQUFBLEVBT0EsdUJBQXVCO0FBRW5CLFFBQUksQ0FBQyxLQUFLLGlCQUNOLEtBQUssaUJBQ0wsS0FBSyxRQUFRLGFBQWEsR0FBRztBQUU3QixXQUFLLFVBQVU7QUFBQSxJQUNuQjtBQUFBLEVBQ0o7QUFBQSxFQVFBLEtBQUssSUFBSTtBQUNMLFFBQUksQ0FBQyxLQUFLLFlBQVksUUFBUSxNQUFNO0FBQ2hDLGFBQU87QUFDWCxTQUFLLFNBQVMsSUFBSSxPQUFPLEtBQUssS0FBSyxLQUFLLElBQUk7QUFDNUMsVUFBTUUsVUFBUyxLQUFLO0FBQ3BCLFVBQU1DLFFBQU87QUFDYixTQUFLLGNBQWM7QUFDbkIsU0FBSyxnQkFBZ0I7QUFFckIsVUFBTSxpQkFBaUIsR0FBR0QsU0FBUSxRQUFRLFdBQVk7QUFDbEQsTUFBQUMsTUFBSyxPQUFPO0FBQ1osWUFBTSxHQUFHO0FBQUEsSUFDYixDQUFDO0FBRUQsVUFBTSxXQUFXLEdBQUdELFNBQVEsU0FBUyxDQUFDLFFBQVE7QUFDMUMsTUFBQUMsTUFBSyxRQUFRO0FBQ2IsTUFBQUEsTUFBSyxjQUFjO0FBQ25CLFdBQUssYUFBYSxTQUFTLEdBQUc7QUFDOUIsVUFBSSxJQUFJO0FBQ0osV0FBRyxHQUFHO0FBQUEsTUFDVixPQUNLO0FBRUQsUUFBQUEsTUFBSyxxQkFBcUI7QUFBQSxNQUM5QjtBQUFBLElBQ0osQ0FBQztBQUNELFFBQUksVUFBVSxLQUFLLFVBQVU7QUFDekIsWUFBTSxVQUFVLEtBQUs7QUFDckIsVUFBSSxZQUFZLEdBQUc7QUFDZix1QkFBZTtBQUFBLE1BQ25CO0FBRUEsWUFBTSxRQUFRLEtBQUssYUFBYSxNQUFNO0FBQ2xDLHVCQUFlO0FBQ2YsUUFBQUQsUUFBTyxNQUFNO0FBRWIsUUFBQUEsUUFBTyxLQUFLLFNBQVMsSUFBSSxNQUFNLFNBQVMsQ0FBQztBQUFBLE1BQzdDLEdBQUcsT0FBTztBQUNWLFVBQUksS0FBSyxLQUFLLFdBQVc7QUFDckIsY0FBTSxNQUFNO0FBQUEsTUFDaEI7QUFDQSxXQUFLLEtBQUssS0FBSyxTQUFTLGFBQWE7QUFDakMscUJBQWEsS0FBSztBQUFBLE1BQ3RCLENBQUM7QUFBQSxJQUNMO0FBQ0EsU0FBSyxLQUFLLEtBQUssY0FBYztBQUM3QixTQUFLLEtBQUssS0FBSyxRQUFRO0FBQ3ZCLFdBQU87QUFBQSxFQUNYO0FBQUEsRUFPQSxRQUFRLElBQUk7QUFDUixXQUFPLEtBQUssS0FBSyxFQUFFO0FBQUEsRUFDdkI7QUFBQSxFQU1BLFNBQVM7QUFFTCxTQUFLLFFBQVE7QUFFYixTQUFLLGNBQWM7QUFDbkIsU0FBSyxhQUFhLE1BQU07QUFFeEIsVUFBTUEsVUFBUyxLQUFLO0FBQ3BCLFNBQUssS0FBSyxLQUFLLEdBQUdBLFNBQVEsUUFBUSxLQUFLLE9BQU8sS0FBSyxJQUFJLENBQUMsR0FBRyxHQUFHQSxTQUFRLFFBQVEsS0FBSyxPQUFPLEtBQUssSUFBSSxDQUFDLEdBQUcsR0FBR0EsU0FBUSxTQUFTLEtBQUssUUFBUSxLQUFLLElBQUksQ0FBQyxHQUFHLEdBQUdBLFNBQVEsU0FBUyxLQUFLLFFBQVEsS0FBSyxJQUFJLENBQUMsR0FBRyxHQUFHLEtBQUssU0FBUyxXQUFXLEtBQUssVUFBVSxLQUFLLElBQUksQ0FBQyxDQUFDO0FBQUEsRUFDN1A7QUFBQSxFQU1BLFNBQVM7QUFDTCxTQUFLLGFBQWEsTUFBTTtBQUFBLEVBQzVCO0FBQUEsRUFNQSxPQUFPLE1BQU07QUFDVCxRQUFJO0FBQ0EsV0FBSyxRQUFRLElBQUksSUFBSTtBQUFBLElBQ3pCLFNBQ08sR0FBUDtBQUNJLFdBQUssUUFBUSxhQUFhO0FBQUEsSUFDOUI7QUFBQSxFQUNKO0FBQUEsRUFNQSxVQUFVLFFBQVE7QUFDZCxTQUFLLGFBQWEsVUFBVSxNQUFNO0FBQUEsRUFDdEM7QUFBQSxFQU1BLFFBQVEsS0FBSztBQUNULFNBQUssYUFBYSxTQUFTLEdBQUc7QUFBQSxFQUNsQztBQUFBLEVBT0EsT0FBTyxLQUFLLE1BQU07QUFDZCxRQUFJQSxVQUFTLEtBQUssS0FBSztBQUN2QixRQUFJLENBQUNBLFNBQVE7QUFDVCxNQUFBQSxVQUFTLElBQUlFLFFBQU8sTUFBTSxLQUFLLElBQUk7QUFDbkMsV0FBSyxLQUFLLE9BQU9GO0FBQUEsSUFDckI7QUFDQSxXQUFPQTtBQUFBLEVBQ1g7QUFBQSxFQU9BLFNBQVNBLFNBQVE7QUFDYixVQUFNLE9BQU8sT0FBTyxLQUFLLEtBQUssSUFBSTtBQUNsQyxlQUFXLE9BQU8sTUFBTTtBQUNwQixZQUFNQSxVQUFTLEtBQUssS0FBSztBQUN6QixVQUFJQSxRQUFPLFFBQVE7QUFDZjtBQUFBLE1BQ0o7QUFBQSxJQUNKO0FBQ0EsU0FBSyxPQUFPO0FBQUEsRUFDaEI7QUFBQSxFQU9BLFFBQVEsUUFBUTtBQUNaLFVBQU0saUJBQWlCLEtBQUssUUFBUSxPQUFPLE1BQU07QUFDakQsYUFBU0csS0FBSSxHQUFHQSxLQUFJLGVBQWUsUUFBUUEsTUFBSztBQUM1QyxXQUFLLE9BQU8sTUFBTSxlQUFlQSxLQUFJLE9BQU8sT0FBTztBQUFBLElBQ3ZEO0FBQUEsRUFDSjtBQUFBLEVBTUEsVUFBVTtBQUNOLFNBQUssS0FBSyxRQUFRLENBQUMsZUFBZSxXQUFXLENBQUM7QUFDOUMsU0FBSyxLQUFLLFNBQVM7QUFDbkIsU0FBSyxRQUFRLFFBQVE7QUFBQSxFQUN6QjtBQUFBLEVBTUEsU0FBUztBQUNMLFNBQUssZ0JBQWdCO0FBQ3JCLFNBQUssZ0JBQWdCO0FBQ3JCLFNBQUssUUFBUSxjQUFjO0FBQzNCLFFBQUksS0FBSztBQUNMLFdBQUssT0FBTyxNQUFNO0FBQUEsRUFDMUI7QUFBQSxFQU1BLGFBQWE7QUFDVCxXQUFPLEtBQUssT0FBTztBQUFBLEVBQ3ZCO0FBQUEsRUFNQSxRQUFRLFFBQVEsYUFBYTtBQUN6QixTQUFLLFFBQVE7QUFDYixTQUFLLFFBQVEsTUFBTTtBQUNuQixTQUFLLGNBQWM7QUFDbkIsU0FBSyxhQUFhLFNBQVMsUUFBUSxXQUFXO0FBQzlDLFFBQUksS0FBSyxpQkFBaUIsQ0FBQyxLQUFLLGVBQWU7QUFDM0MsV0FBSyxVQUFVO0FBQUEsSUFDbkI7QUFBQSxFQUNKO0FBQUEsRUFNQSxZQUFZO0FBQ1IsUUFBSSxLQUFLLGlCQUFpQixLQUFLO0FBQzNCLGFBQU87QUFDWCxVQUFNRixRQUFPO0FBQ2IsUUFBSSxLQUFLLFFBQVEsWUFBWSxLQUFLLHVCQUF1QjtBQUNyRCxXQUFLLFFBQVEsTUFBTTtBQUNuQixXQUFLLGFBQWEsa0JBQWtCO0FBQ3BDLFdBQUssZ0JBQWdCO0FBQUEsSUFDekIsT0FDSztBQUNELFlBQU0sUUFBUSxLQUFLLFFBQVEsU0FBUztBQUNwQyxXQUFLLGdCQUFnQjtBQUNyQixZQUFNLFFBQVEsS0FBSyxhQUFhLE1BQU07QUFDbEMsWUFBSUEsTUFBSztBQUNMO0FBQ0osYUFBSyxhQUFhLHFCQUFxQkEsTUFBSyxRQUFRLFFBQVE7QUFFNUQsWUFBSUEsTUFBSztBQUNMO0FBQ0osUUFBQUEsTUFBSyxLQUFLLENBQUMsUUFBUTtBQUNmLGNBQUksS0FBSztBQUNMLFlBQUFBLE1BQUssZ0JBQWdCO0FBQ3JCLFlBQUFBLE1BQUssVUFBVTtBQUNmLGlCQUFLLGFBQWEsbUJBQW1CLEdBQUc7QUFBQSxVQUM1QyxPQUNLO0FBQ0QsWUFBQUEsTUFBSyxZQUFZO0FBQUEsVUFDckI7QUFBQSxRQUNKLENBQUM7QUFBQSxNQUNMLEdBQUcsS0FBSztBQUNSLFVBQUksS0FBSyxLQUFLLFdBQVc7QUFDckIsY0FBTSxNQUFNO0FBQUEsTUFDaEI7QUFDQSxXQUFLLEtBQUssS0FBSyxTQUFTLGFBQWE7QUFDakMscUJBQWEsS0FBSztBQUFBLE1BQ3RCLENBQUM7QUFBQSxJQUNMO0FBQUEsRUFDSjtBQUFBLEVBTUEsY0FBYztBQUNWLFVBQU0sVUFBVSxLQUFLLFFBQVE7QUFDN0IsU0FBSyxnQkFBZ0I7QUFDckIsU0FBSyxRQUFRLE1BQU07QUFDbkIsU0FBSyxhQUFhLGFBQWEsT0FBTztBQUFBLEVBQzFDO0FBQ0o7OztBQzVWQSxJQUFNLFFBQVEsQ0FBQztBQUNmLFNBQVNHLFFBQU8sS0FBSyxNQUFNO0FBQ3ZCLE1BQUksT0FBTyxRQUFRLFVBQVU7QUFDekIsV0FBTztBQUNQLFVBQU07QUFBQSxFQUNWO0FBQ0EsU0FBTyxRQUFRLENBQUM7QUFDaEIsUUFBTSxTQUFTLElBQUksS0FBSyxLQUFLLFFBQVEsWUFBWTtBQUNqRCxRQUFNLFNBQVMsT0FBTztBQUN0QixRQUFNLEtBQUssT0FBTztBQUNsQixRQUFNLE9BQU8sT0FBTztBQUNwQixRQUFNLGdCQUFnQixNQUFNLE9BQU8sUUFBUSxNQUFNLElBQUk7QUFDckQsUUFBTSxnQkFBZ0IsS0FBSyxZQUN2QixLQUFLLDJCQUNMLFVBQVUsS0FBSyxhQUNmO0FBQ0osTUFBSTtBQUNKLE1BQUksZUFBZTtBQUNmLFNBQUssSUFBSSxRQUFRLFFBQVEsSUFBSTtBQUFBLEVBQ2pDLE9BQ0s7QUFDRCxRQUFJLENBQUMsTUFBTSxLQUFLO0FBQ1osWUFBTSxNQUFNLElBQUksUUFBUSxRQUFRLElBQUk7QUFBQSxJQUN4QztBQUNBLFNBQUssTUFBTTtBQUFBLEVBQ2Y7QUFDQSxNQUFJLE9BQU8sU0FBUyxDQUFDLEtBQUssT0FBTztBQUM3QixTQUFLLFFBQVEsT0FBTztBQUFBLEVBQ3hCO0FBQ0EsU0FBTyxHQUFHLE9BQU8sT0FBTyxNQUFNLElBQUk7QUFDdEM7QUFHQSxPQUFPLE9BQU9BLFNBQVE7QUFBQSxFQUNsQjtBQUFBLEVBQ0EsUUFBQUM7QUFBQSxFQUNBLElBQUlEO0FBQUEsRUFDSixTQUFTQTtBQUNiLENBQUM7OztBQzVDRCxtQkFBa0I7QUFLbEIsU0FBc0IsV0FBVztBQUFBO0FBQzdCLFFBQUk7QUFDQSxZQUFNLE1BQU0sTUFBTSxhQUFBRSxRQUFNLElBQUksZ0JBQWdCO0FBQzVDLGdCQUFVLFFBQVEsSUFBSTtBQUN0QixtQkFBYTtBQUFBLElBQ2pCLFNBQVMsS0FBUDtBQUNFLGNBQVEsSUFBSSxHQUFHO0FBQUEsSUFDbkI7QUFBQSxFQUNKO0FBQUE7QUFFQSxTQUFzQixjQUFjO0FBQUE7QUFDaEMsUUFBSTtBQUNBLFlBQU0sTUFBTSxNQUFNLGFBQUFBLFFBQU0sSUFBSSxxQkFBcUI7QUFDakQsYUFBTyxJQUFJLEtBQUs7QUFBQSxJQUNwQixTQUFTLEtBQVA7QUFDRSxjQUFRLElBQUksR0FBRztBQUFBLElBQ25CO0FBQUEsRUFDSjtBQUFBO0FBSUEsU0FBc0IsUUFBUSxTQUFjO0FBQUE7QUFDeEMsUUFBSTtBQUNBLFlBQU0sYUFBQUEsUUFBTSxLQUFLLGtCQUFrQixPQUFPO0FBQzFDLGVBQVM7QUFBQSxJQUNiLFNBQVMsS0FBUDtBQUNFLGNBQVEsSUFBSSxHQUFHO0FBQUEsSUFDbkI7QUFBQSxFQUNKO0FBQUE7QUFFQSxTQUFzQixZQUFZLFNBQWM7QUFBQTtBQUM1QyxRQUFJO0FBQ0EsWUFBTSxhQUFBQSxRQUFNLE9BQU8sdUJBQXVCLE9BQU87QUFDakQsWUFBTSxhQUFBQSxRQUFNLEtBQUssdUJBQXVCLE9BQU87QUFBQSxJQUNuRCxTQUFTLEtBQVA7QUFDRSxjQUFRLElBQUksR0FBRztBQUFBLElBQ25CO0FBQUEsRUFDSjtBQUFBOzs7QUMxQ0EsSUFBQUMsZ0JBQWtCOzs7QUNHWCxTQUFTLGdCQUFnQixPQUFZO0FBRXhDLFFBQU0saUJBQWlCLGFBQWEsQ0FBQyxNQUFXO0FBQzVDLE1BQUUsT0FBTyxVQUFVLElBQUksaUJBQWlCO0FBQUEsRUFDNUMsQ0FBQztBQUVELFFBQU0saUJBQWlCLFdBQVcsQ0FBQyxNQUFXO0FBQzFDLE1BQUUsT0FBTyxVQUFVLE9BQU8saUJBQWlCO0FBQzNDLGFBQVMsY0FBYyxzQkFBc0IsRUFBRSxVQUFVLE9BQU8sd0JBQXdCO0FBQUEsRUFDNUYsQ0FBQztBQUVELFFBQU0saUJBQWlCLGFBQVksQ0FBQyxNQUFXO0FBQzNDLFlBQVEsRUFBRTtBQUFBLFdBQ0Q7QUFDRCxpQkFBUyxjQUFjLHNCQUFzQixFQUFFLFVBQVUsSUFBSSx3QkFBd0I7QUFDckY7QUFBQSxXQUNDO0FBQ0QsZ0JBQVEsSUFBSSxhQUFhO0FBQ3pCO0FBQUE7QUFFQTtBQUFBO0FBQUEsRUFFWixDQUFDO0FBRUQsUUFBTSxpQkFBaUIsV0FBVSxDQUFDLE1BQVc7QUFDekMsWUFBUSxFQUFFO0FBQUEsV0FDRDtBQUVELGlCQUFTLGNBQWMsc0JBQXNCLEVBQUUsVUFBVSxPQUFPLHdCQUF3QjtBQUN4RjtBQUFBO0FBRUE7QUFBQTtBQUFBLEVBRVosQ0FBQztBQVdMOzs7QUMvQ0EsSUFBQUMsZ0JBQWtCO0FBS2xCLFNBQXNCLFlBQVk7QUFBQTtBQUM5QixRQUFJO0FBQ0EsWUFBTSxNQUFNLE1BQU0sY0FBQUMsUUFBTSxJQUFJLGFBQWE7QUFDekMsYUFBTyxRQUFRLElBQUk7QUFBQSxJQUN2QixTQUFTLEtBQVA7QUFDRSxjQUFRLElBQUksR0FBRztBQUFBLElBQ25CO0FBQUEsRUFDSjtBQUFBO0FBSUEsU0FBc0IsU0FBUyxTQUFjO0FBQUE7QUFDekMsUUFBSTtBQUNBLFlBQU0sY0FBQUEsUUFBTSxLQUFLLGVBQWUsT0FBTztBQUFBLElBQzNDLFNBQVMsS0FBUDtBQUNFLGNBQVEsSUFBSSxHQUFHO0FBQUEsSUFDbkI7QUFBQSxFQUNKO0FBQUE7OztBQ2pCTyxJQUFJLFNBQVMsRUFBQyxPQUFPLENBQUMsRUFBQztBQUM5QixJQUFNLGdCQUFnQjtBQUFBLEVBQ2xCLEVBQUMsT0FBTywyRUFBMkUsTUFBTSxnQkFBZTtBQUFBLEVBQ3hHLEVBQUMsT0FBTyxtQ0FBbUMsTUFBTSxlQUFjO0FBQUEsRUFDL0QsRUFBQyxPQUFPLHVHQUF1RyxNQUFNLG9CQUFtQjtBQUM1STtBQUVPLFNBQVMsbUJBQW1CO0FBQy9CLFdBQVMsU0FBUyxlQUFlO0FBQzdCLGFBQVMsS0FBSztBQUFBLEVBQ2xCO0FBQ0o7QUFFTyxTQUFTLGdCQUFnQixVQUFrQjtBQUM5QyxNQUFJLE9BQU8sZUFBZSxNQUFNO0FBQzVCLGFBQVMsUUFBUSxDQUFDLFNBQVM7QUFDM0IsUUFBSSxTQUFTLE9BQU87QUFDaEIsbUJBQWEsUUFBUTtBQUVyQixlQUFTLGNBQWMsc0JBQXNCLEVBQUUsbUJBQW1CLGFBQWE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBLGFBSzlFO0FBQ0QsZUFBUyxjQUFjLG1CQUFtQixFQUFFLGlCQUFpQixTQUFTLE1BQU0sVUFBVSxRQUFRLENBQUM7QUFDL0YsdUJBQWlCO0FBQUEsSUFDckIsT0FBTztBQUNILGdCQUFVLFFBQVE7QUFBQSxJQUN0QjtBQUFBLEVBQ0o7QUFDSjtBQUVBLFNBQWUsbUJBQW1CO0FBQUE7QUFDOUIsVUFBTSxVQUFVO0FBQ2hCLGFBQVMsU0FBUyxPQUFPLE9BQU87QUFDNUIsVUFBSSxNQUFNLFVBQVU7QUFDaEIsaUJBQVMsY0FBYyxhQUFhLEVBQUUsbUJBQW1CLGFBQWE7QUFBQTtBQUFBLCtCQUVuRCxNQUFNLDhFQUE4RSxNQUFNLGdCQUFnQixNQUFNLGlCQUFpQixNQUFNLGVBQWUsTUFBTTtBQUFBLCtGQUM1RixNQUFNO0FBQUE7QUFBQSxhQUV4RjtBQUFBLE1BQ0wsT0FBTztBQUNILGlCQUFTLGNBQWMsYUFBYSxFQUFFLG1CQUFtQixhQUFhO0FBQUE7QUFBQSwrQkFFbkQsTUFBTSw4RUFBOEUsTUFBTSxnQkFBZ0IsTUFBTSxpQkFBaUIsTUFBTSxlQUFlLE1BQU07QUFBQTtBQUFBLGFBRTlLO0FBQUEsTUFDTDtBQUFBLElBQ0o7QUFBQSxFQUNKO0FBQUE7QUFTTyxTQUFTLHFCQUFxQjtBQUNqQyxNQUFJLGFBQWEsQ0FBQztBQUNsQixXQUFTLFNBQVMsU0FBUyx1QkFBdUIsWUFBWSxHQUFHO0FBQzdELGVBQVcsS0FBSyxLQUFLO0FBQUEsRUFDekI7QUFDQSxXQUFTLE9BQU8sU0FBUyx1QkFBdUIsd0JBQXdCLEdBQUc7QUFDdkUsZUFBVyxLQUFLLEdBQUc7QUFBQSxFQUN2QjtBQUNBLFdBQVMsT0FBTyxTQUFTLHVCQUF1Qix1QkFBdUIsR0FBRztBQUN0RSxlQUFXLEtBQUssR0FBRztBQUFBLEVBQ3ZCO0FBQ0EsV0FBUyxNQUFNLFlBQVk7QUFDdkIsT0FBRyxPQUFPO0FBQUEsRUFDZDtBQUNBLG1CQUFpQjtBQUNyQjs7O0FDaEZBLElBQUFDLGdCQUFrQjtBQUtsQixTQUFzQixVQUFVO0FBQUE7QUFDNUIsUUFBSTtBQUNBLFlBQU0sTUFBTSxNQUFNLGNBQUFDLFFBQU0sSUFBSSxXQUFXO0FBQ3ZDLFdBQUssUUFBUSxJQUFJO0FBQUEsSUFDckIsU0FBUyxLQUFQO0FBQ0UsY0FBUSxJQUFJLEdBQUc7QUFBQSxJQUNuQjtBQUFBLEVBQ0o7QUFBQTtBQUlBLFNBQXNCLE9BQU8sU0FBYztBQUFBO0FBQ3ZDLFFBQUk7QUFDQSxjQUFRLElBQUksT0FBTztBQUNuQixZQUFNLGNBQUFBLFFBQU0sS0FBSyxhQUFhLE9BQU87QUFBQSxJQUN6QyxTQUFTLEtBQVA7QUFDRSxjQUFRLElBQUksR0FBRztBQUFBLElBQ25CO0FBQUEsRUFDSjtBQUFBOzs7QUNsQkEsSUFBTSxTQUFpQkMsUUFBRztBQUNuQixJQUFJLE9BQU8sRUFBQyxPQUFPLENBQUMsRUFBQztBQUM1QixJQUFJLGNBQWM7QUFBQSxFQUNkLEVBQUMsTUFBTSxlQUFlLE9BQU8seUlBQXdJO0FBQ3pLO0FBRU8sU0FBUyxpQkFBaUI7QUFDN0IsV0FBU0MsUUFBTyxhQUFhO0FBQ3pCLFdBQU9BLElBQUc7QUFBQSxFQUNkO0FBQ0o7QUFFTyxTQUFTLGNBQWMsVUFBa0I7QUFDNUMsV0FBUyxRQUFRLENBQUMsU0FBUztBQUMzQixNQUFJLFNBQVMsT0FBTztBQUNoQixpQkFBYSxRQUFRO0FBRXJCLGFBQVMsY0FBYyxzQkFBc0IsRUFBRSxtQkFBbUIsYUFBYTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUEsU0FLOUU7QUFDRCxhQUFTLGNBQWMsbUJBQW1CLEVBQUUsaUJBQWlCLFNBQVMsTUFBTSxVQUFVLFFBQVEsQ0FBQztBQUMvRixtQkFBZTtBQUFBLEVBQ25CLE9BQU87QUFDSCxjQUFVLFFBQVE7QUFBQSxFQUN0QjtBQUNKO0FBRUEsU0FBZSxpQkFBaUI7QUFBQTtBQUM1QixVQUFNLFFBQVE7QUFFZCxhQUFTQSxRQUFPLEtBQUssT0FBTztBQUN4QixlQUFTLGNBQWMsYUFBYSxFQUFFLG1CQUFtQixhQUFhO0FBQUE7QUFBQSwyQkFFbkRBLEtBQUksNkVBQTZFQSxLQUFJO0FBQUEsOENBQ2xFQSxLQUFJO0FBQUE7QUFBQSxTQUV6QztBQUFBLElBQ0w7QUFHQSxhQUFTLGNBQWMsYUFBYSxFQUFFLG1CQUFtQixhQUFhO0FBQUE7QUFBQTtBQUFBO0FBQUEsS0FJckU7QUFBQSxFQUNMO0FBQUE7QUFVQSxPQUFPLEdBQUcsY0FBZSxDQUFDLEdBQUdDLFNBQVE7QUFDakMsTUFBSUEsS0FBSSxTQUFTLGVBQWU7QUFFNUIsU0FBSyxNQUFNLFlBQVksc0JBQXNCLFNBQVM7QUFDdEQsY0FBVSxJQUFJLElBQUksSUFBSTtBQUFBLEVBQzFCLE9BQU87QUFFSCxTQUFLLE1BQU0sWUFBWSxzQkFBc0IsT0FBT0EsS0FBSSxRQUFRO0FBQ2hFLGNBQVUsRUFBRSxRQUFRLEdBQUcsRUFBRSxTQUFTLEdBQUcsSUFBSTtBQUFBLEVBQzdDO0FBQ0osQ0FBRTs7O0FDekVGLElBQUFDLGdCQUFrQjtBQUtsQixTQUFzQixVQUFVO0FBQUE7QUFDNUIsUUFBSTtBQUNBLFlBQU0sU0FBUztBQUFBLFFBQ1gsU0FBUyxFQUFFLGdCQUFnQixtQkFBbUI7QUFBQSxRQUM5QyxpQkFBaUI7QUFBQSxNQUNyQjtBQUNBLFlBQU0sTUFBTSxNQUFNLGNBQUFDLFFBQU0sSUFBSSxhQUFhLE1BQU07QUFDL0MsYUFBTyxJQUFJO0FBQUEsSUFDZixTQUFRLEtBQU47QUFDRSxjQUFRLElBQUksR0FBRztBQUFBLElBQ25CO0FBQUEsRUFDSjtBQUFBO0FBYUEsU0FBc0IsVUFBVSxTQUFjO0FBQUE7QUFDMUMsUUFBSTtBQUNBLFlBQU0sY0FBQUMsUUFBTSxLQUFLLG1CQUFtQixPQUFPO0FBQzNDLGtCQUFZLE1BQU07QUFBQSxJQUN0QixTQUFRLEtBQU47QUFDRSxjQUFRLElBQUksR0FBRztBQUFBLElBQ25CO0FBQUEsRUFDSjtBQUFBO0FBRUEsU0FBc0IsU0FBUztBQUFBO0FBQzNCLFFBQUk7QUFDQSxZQUFNLGNBQUFBLFFBQU0sS0FBSyxrQkFBa0I7QUFDbkMsa0JBQVksT0FBTztBQUFBLElBQ3ZCLFNBQVEsS0FBTjtBQUNFLGNBQVEsSUFBSSxHQUFHO0FBQUEsSUFDbkI7QUFBQSxFQUNKO0FBQUE7QUFJQSxTQUFzQixjQUFjLFNBQWM7QUFBQTtBQUM5QyxRQUFJO0FBQ0EsWUFBTSxjQUFBQSxRQUFNLElBQUksYUFBYSxFQUFDLFdBQVcsUUFBTyxDQUFDO0FBQUEsSUFDckQsU0FBUSxLQUFOO0FBQ0UsY0FBUSxJQUFJLEdBQUc7QUFBQSxJQUNuQjtBQUFBLEVBQ0o7QUFBQTs7O0FDdkRBLElBQUFDLGdCQUFrQjtBQUtsQixTQUFzQixnQkFBZ0I7QUFBQTtBQUNsQyxRQUFJO0FBQ0EsWUFBTSxNQUFNLE1BQU0sY0FBQUMsUUFBTSxJQUFJLGlCQUFpQjtBQUM3QyxpQkFBVyxRQUFRLElBQUk7QUFBQSxJQUMzQixTQUFTLEtBQVA7QUFDRSxjQUFRLElBQUksR0FBRztBQUFBLElBQ25CO0FBQUEsRUFDSjtBQUFBOzs7QUNUTyxJQUFJLGFBQWtCLEVBQUMsT0FBTyxDQUFDLEVBQUM7QUFDaEMsSUFBSSxZQUFpQixFQUFDLE9BQU8sQ0FBQyxFQUFDO0FBRS9CLFNBQVMsb0JBQW9CLFVBQWtCO0FBQ2xELFdBQVMsUUFBUSxDQUFDLFNBQVM7QUFDM0IsTUFBSSxTQUFTLE9BQU87QUFDaEIsaUJBQWEsUUFBUTtBQUVyQixhQUFTLGNBQWMsc0JBQXNCLEVBQUUsbUJBQW1CLGFBQWE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBLFNBSzlFO0FBQ0QsYUFBUyxjQUFjLG1CQUFtQixFQUFFLGlCQUFpQixTQUFTLE1BQU0sVUFBVSxRQUFRLENBQUM7QUFDL0YseUJBQXFCO0FBQUEsRUFDekIsT0FBTztBQUNILGNBQVUsUUFBUTtBQUFBLEVBQ3RCO0FBQ0o7QUFFQSxTQUFlLHVCQUF1QjtBQUFBO0FBQ2xDLFVBQU0sY0FBYztBQUNwQixhQUFTQyxjQUFhLFlBQVk7QUFDOUIsZUFBUyxjQUFjLGFBQWEsRUFBRSxtQkFBbUIsYUFBYTtBQUFBLHFGQUNPQSxXQUFVO0FBQUEsMkJBQ3BFQSxXQUFVO0FBQUE7QUFBQSx5QkFFWkEsV0FBVSxTQUFTQSxXQUFVLFFBQVFBLFdBQVU7QUFBQTtBQUFBO0FBQUEsU0FHL0Q7QUFBQSxJQUNMO0FBR0EsYUFBUyxjQUFjLGFBQWEsRUFBRSxtQkFBbUIsYUFBYTtBQUFBO0FBQUE7QUFBQTtBQUFBLEtBSXJFO0FBQUEsRUFDTDtBQUFBOzs7QUN4Q0EsSUFBSSxvQkFBb0IsQ0FBQztBQUV6QixTQUFzQix3QkFBd0IsT0FBZSxRQUFpQjtBQUFBO0FBRzFFLGFBQVMsWUFBWSxtQkFBbUI7QUFDcEMsVUFBSSxhQUFhLE9BQU87QUFDcEIsWUFBSSxTQUFTLGNBQWMsMkJBQTJCLE9BQU87QUFBRyxtQkFBUyxjQUFjLDJCQUEyQixPQUFPLEVBQUUsT0FBTztBQUNsSSwwQkFBa0IsT0FBTyxrQkFBa0IsUUFBUSxLQUFLLEdBQUcsQ0FBQztBQUM1RDtBQUFBLE1BQ0o7QUFBQSxJQUNKO0FBQ0Esc0JBQWtCLEtBQUssS0FBSztBQUU1QixRQUFJLFdBQVcsTUFBTSxtQkFBbUIsT0FBTyxNQUFNO0FBQ3JELDhCQUEwQixRQUFRO0FBQUEsRUFDdEM7QUFBQTtBQUVBLElBQU0sc0JBQXNCLENBQUMsYUFBa0I7QUFBQTtBQUFBO0FBQUEsMkVBRzRCLFNBQVM7QUFBQSxrQkFDbEUsU0FBUztBQUFBLGlCQUNWLFNBQVMsT0FBTyxHQUFHLFNBQVMsU0FBUyxLQUFLLFNBQVMsT0FBTyxJQUFJLFNBQVMsU0FBUyxLQUFLLFNBQVMsWUFBWSxLQUFLLFNBQVMsY0FBYTtBQUFBO0FBQUE7QUFBQSx1REFHL0YsU0FBUztBQUFBLGtEQUNkLFNBQVMsY0FBYyxTQUFTLFdBQVcsSUFBSSxTQUFTLGNBQWM7QUFBQSxtRUFDckQsU0FBUztBQUFBO0FBQUEscUVBRVAsU0FBUztBQUFBLG1GQUNLLFNBQVM7QUFBQSw0RUFDaEIsU0FBUztBQUFBLHVFQUNkLFNBQVM7QUFBQSxxRUFDWCxTQUFTO0FBQUE7QUFBQSxrQkFFNUQsU0FBUyxZQUFZLDBDQUEwQyxTQUFTLGtCQUFrQjtBQUFBO0FBQUE7QUFBQSx5REFHbkQsU0FBUyxLQUFLLFNBQVMsS0FBSyxRQUFRLFNBQVMsS0FBSyxTQUFTLEtBQUs7QUFBQTtBQUFBO0FBQUEsdUZBR2xDLFNBQVM7QUFBQSxVQUN0RixTQUFTLFFBQVEsU0FBUyxJQUFJO0FBQUE7QUFBQSx1RUFFK0IsU0FBUztBQUFBLGtCQUM5RDtBQUFBLFVBQ1IsU0FBUyxXQUFXLFNBQVMsSUFBSTtBQUFBO0FBQUEsMkZBRWdELFNBQVM7QUFBQSxrQkFDbEY7QUFBQTtBQUFBO0FBSWxCLFNBQVMsMEJBQTBCLFVBQWU7QUFDOUMsUUFBTUMsVUFBUyxTQUFTLGNBQWMsTUFBTSxFQUFFLFlBQVksU0FBUyxjQUFjLEtBQUssQ0FBQztBQUN2RixFQUFBQSxRQUFPLFVBQVUsSUFBSSx1QkFBdUI7QUFDNUMsRUFBQUEsUUFBTyxVQUFVLElBQUksMEJBQTBCLFNBQVMsT0FBTztBQUMvRCxFQUFBQSxRQUFPLG1CQUFtQixhQUFhLG9CQUFvQixRQUFRLENBQUM7QUFHcEUsdUJBQXFCLFFBQVE7QUFDN0Isd0JBQXNCLFFBQVE7QUFDOUIsNkJBQTJCLFFBQVE7QUFDbkMsd0JBQXNCLFFBQVE7QUFDOUIsd0JBQXNCLFFBQVE7QUFDOUIsZ0NBQThCLFFBQVE7QUFDdEMseUJBQXVCLFFBQVE7QUFDL0IsNEJBQTBCLFFBQVE7QUFHbEMsY0FBWUEsU0FBUSwwQkFBMEIsU0FBUyxPQUFPO0FBQ2xFO0FBS0EsU0FBUyxxQkFBcUIsVUFBZTtBQUN6QyxNQUFJLFNBQVMsQ0FBQztBQUNkLE1BQUksU0FBUztBQUNiLFdBQVMsT0FBTyxRQUFRLENBQUMsVUFBZTtBQUNwQyxRQUFJLE1BQU0sT0FBTztBQUNiLGVBQVM7QUFDVCxhQUFPLEtBQUssS0FBSztBQUFBLElBQ3JCO0FBQUEsRUFDSixDQUFDO0FBQ0QsTUFBSSxDQUFDO0FBQVE7QUFFYixRQUFNLE9BQU8sU0FBUyxlQUFlLFVBQVUsU0FBUyxPQUFPLEVBQUUsWUFBWSxTQUFTLGNBQWMsR0FBRyxDQUFDO0FBQ3hHLE9BQUssbUJBQW1CLGFBQWEsa0NBQWtDO0FBQ3ZFLFNBQU8sUUFBUSxDQUFDLFVBQVU7QUFDdEIsU0FBSyxtQkFBbUIsYUFBYTtBQUFBLGNBQy9CLE1BQU0sUUFBUSxNQUFNO0FBQUEsU0FDekI7QUFBQSxFQUNMLENBQUM7QUFDTDtBQUVBLFNBQVMsc0JBQXNCLFVBQWU7QUFDMUMsTUFBSSxhQUFhLENBQUMsT0FBTyxPQUFPLE9BQU8sT0FBTyxPQUFPLE1BQU07QUFDM0QsTUFBSSxjQUFjO0FBQUEsSUFDZCxTQUFTO0FBQUEsSUFDVCxTQUFTO0FBQUEsSUFDVCxTQUFTO0FBQUEsSUFDVCxTQUFTO0FBQUEsSUFDVCxTQUFTO0FBQUEsSUFDVCxTQUFTO0FBQUEsRUFDYjtBQUVBLFdBQVNDLEtBQUksR0FBR0EsS0FBSSxHQUFHQSxNQUFLO0FBQ3hCLFFBQUksV0FBVyxLQUFLLE9BQU8sWUFBWUEsTUFBSyxNQUFNLENBQUM7QUFDbkQsYUFBUyxlQUFlLFdBQVcsU0FBUyxPQUFPLEVBQUUsbUJBQW1CLGFBQWE7QUFBQTtBQUFBLHdDQUVyRCxXQUFXQTtBQUFBLHFCQUM5QixXQUFXLElBQUksS0FBSyxNQUFNO0FBQUE7QUFBQSx5QkFFdEIsWUFBWUE7QUFBQTtBQUFBO0FBQUEsU0FHNUI7QUFBQSxFQUNMO0FBQ0o7QUFFQSxTQUFTLDJCQUEyQixVQUFlO0FBQy9DLFFBQU0sT0FBTyxTQUFTLGVBQWUsa0JBQWtCLFNBQVMsT0FBTyxFQUFFLFlBQVksU0FBUyxjQUFjLEdBQUcsQ0FBQztBQUNoSCxPQUFLLG1CQUFtQixhQUFZLDBDQUEwQztBQUM5RSxNQUFJLFNBQVMsQ0FBQztBQUNkLE1BQUksU0FBUztBQUViLFdBQVMsY0FBYyxRQUFRLENBQUMsZ0JBQXFCO0FBQ2pELFVBQU0sZUFBZSxhQUFhLFlBQVksT0FBTyxZQUFZLE9BQU8sWUFBWSxPQUFPLFlBQVksSUFBSTtBQUMzRyxRQUFJLFlBQVksS0FBSyxTQUFTLFFBQVEsR0FBRztBQUNyQyxnQkFBVSxJQUFJLGlCQUFpQixZQUFZO0FBQUEsSUFDL0MsT0FBTztBQUNILGFBQU8sS0FBSyxFQUFDLE1BQU0sY0FBYyxPQUFPLFlBQVksTUFBSyxDQUFDO0FBQUEsSUFDOUQ7QUFBQSxFQUNKLENBQUM7QUFDRCxXQUFTLE9BQU8sUUFBUSxPQUFPLEVBQUU7QUFDakMsT0FBSyxtQkFBbUIsYUFBYSxNQUFNO0FBRTNDLE1BQUksV0FBVztBQUFJLFNBQUssT0FBTztBQUUvQixXQUFTO0FBQ1QsUUFBTSxhQUFhLFNBQVMsZUFBZSxXQUFXLFNBQVMsT0FBTyxFQUFFLFlBQVksU0FBUyxjQUFjLEdBQUcsQ0FBQztBQUMvRyxhQUFXLG1CQUFtQixhQUFZLG1DQUFtQztBQUM3RSxTQUFPLFFBQVEsQ0FBQyxVQUFVO0FBQ3RCLGNBQVUsSUFBSSxNQUFNLFNBQVMsTUFBTTtBQUFBLEVBQ3ZDLENBQUM7QUFDRCxXQUFTLE9BQU8sUUFBUSxPQUFPLEVBQUU7QUFDakMsYUFBVyxtQkFBbUIsYUFBYSxNQUFNO0FBRWpELE1BQUksV0FBVztBQUFJLGVBQVcsT0FBTztBQUN6QztBQUVBLFNBQVMsc0JBQXNCLFVBQWU7QUFFMUMsTUFBSSxTQUFTLGdCQUFnQixTQUFTLEdBQUc7QUFDckMsVUFBTSxPQUFPLFNBQVMsZUFBZSxZQUFZLFNBQVMsT0FBTyxFQUFFLFlBQVksU0FBUyxjQUFjLEdBQUcsQ0FBQztBQUMxRyxTQUFLLG1CQUFtQixhQUFZLDRDQUE0QztBQUNoRixRQUFJLFNBQVM7QUFFYixhQUFTLGdCQUFnQixRQUFRLENBQUMsU0FBYztBQUM1QyxnQkFBVSxJQUFJO0FBQUEsSUFDbEIsQ0FBQztBQUNELGFBQVMsT0FBTyxRQUFRLE9BQU8sRUFBRTtBQUNqQyxTQUFLLG1CQUFtQixhQUFhLE1BQU07QUFBQSxFQUMvQztBQUdBLE1BQUksU0FBUyxZQUFZLFNBQVMsR0FBRztBQUNqQyxVQUFNLE9BQU8sU0FBUyxlQUFlLFlBQVksU0FBUyxPQUFPLEVBQUUsWUFBWSxTQUFTLGNBQWMsR0FBRyxDQUFDO0FBQzFHLFNBQUssbUJBQW1CLGFBQVksd0NBQXdDO0FBQzVFLFFBQUksU0FBUztBQUViLGFBQVMsWUFBWSxRQUFRLENBQUMsU0FBYztBQUN4QyxnQkFBVSxJQUFJO0FBQUEsSUFDbEIsQ0FBQztBQUNELGFBQVMsT0FBTyxRQUFRLE9BQU8sRUFBRTtBQUNqQyxTQUFLLG1CQUFtQixhQUFhLE1BQU07QUFBQSxFQUMvQztBQUdBLE1BQUksU0FBUyxpQkFBaUIsU0FBUyxHQUFHO0FBQ3RDLFVBQU0sT0FBTyxTQUFTLGVBQWUsWUFBWSxTQUFTLE9BQU8sRUFBRSxZQUFZLFNBQVMsY0FBYyxHQUFHLENBQUM7QUFDMUcsU0FBSyxtQkFBbUIsYUFBWSw4Q0FBOEM7QUFDbEYsUUFBSSxTQUFTO0FBRWIsYUFBUyxpQkFBaUIsUUFBUSxDQUFDLFNBQWM7QUFDN0MsZ0JBQVUsSUFBSTtBQUFBLElBQ2xCLENBQUM7QUFDRCxhQUFTLE9BQU8sUUFBUSxPQUFPLEVBQUU7QUFDakMsU0FBSyxtQkFBbUIsYUFBYSxNQUFNO0FBQUEsRUFDL0M7QUFHQSxNQUFJLFNBQVMsb0JBQW9CLFNBQVMsR0FBRztBQUN6QyxVQUFNLE9BQU8sU0FBUyxlQUFlLFlBQVksU0FBUyxPQUFPLEVBQUUsWUFBWSxTQUFTLGNBQWMsR0FBRyxDQUFDO0FBQzFHLFNBQUssbUJBQW1CLGFBQVksaURBQWlEO0FBQ3JGLFFBQUksU0FBUztBQUViLGFBQVMsb0JBQW9CLFFBQVEsQ0FBQyxTQUFjO0FBQ2hELGdCQUFVLElBQUk7QUFBQSxJQUNsQixDQUFDO0FBQ0QsYUFBUyxPQUFPLFFBQVEsT0FBTyxFQUFFO0FBQ2pDLFNBQUssbUJBQW1CLGFBQWEsTUFBTTtBQUFBLEVBQy9DO0FBQ0o7QUFFQSxTQUFTLHNCQUFzQixVQUFlO0FBQzFDLE1BQUksU0FBUyxPQUFPLFdBQVc7QUFBRztBQUNsQyxRQUFNLE9BQU8sU0FBUyxlQUFlLFdBQVcsU0FBUyxPQUFPLEVBQUUsWUFBWSxTQUFTLGNBQWMsR0FBRyxDQUFDO0FBQ3pHLE9BQUssbUJBQW1CLGFBQVksbUNBQW1DO0FBQ3ZFLE1BQUksU0FBUztBQUViLFdBQVMsT0FBTyxRQUFRLENBQUMsVUFBVTtBQUMvQixRQUFJLE1BQU0sS0FBSyxTQUFTLFNBQVMsS0FBSyxNQUFNLEtBQUssU0FBUyxTQUFTLEdBQUc7QUFDbEUsZ0JBQVUsSUFBSSxNQUFNLFFBQVEsTUFBTTtBQUFBLElBQ3RDLE9BQU87QUFDSCxnQkFBVSxJQUFJLE1BQU0sUUFBUSxNQUFNO0FBQUEsSUFDdEM7QUFBQSxFQUNKLENBQUM7QUFDRCxXQUFTLE9BQU8sUUFBUSxPQUFPLEVBQUU7QUFDakMsT0FBSyxtQkFBbUIsYUFBYSxNQUFNO0FBQy9DO0FBRUEsU0FBUyw4QkFBOEIsVUFBZTtBQUNsRCxXQUFTLFVBQVUsUUFBUSxDQUFDLFlBQWlCO0FBQ3pDLGFBQVMsZUFBZSxzQkFBc0IsU0FBUyxPQUFPLEVBQUUsbUJBQW1CLGFBQWE7QUFBQTtBQUFBLHdFQUVoQyxRQUFRLGdCQUFnQixRQUFRO0FBQUE7QUFBQSxTQUUvRjtBQUFBLEVBQ0wsQ0FBQztBQUNMO0FBRUEsU0FBUyx1QkFBdUIsVUFBZTtBQUMzQyxNQUFJQSxLQUFJO0FBQ1IsV0FBUyxRQUFRLFFBQVEsQ0FBQyxXQUFXO0FBQ2pDLGFBQVMsZUFBZSxZQUFZLFNBQVMsT0FBTyxFQUFFLG1CQUFtQixhQUFhO0FBQUE7QUFBQSw4REFFaEMsT0FBTyxnQkFBZ0IsT0FBTztBQUFBLGtCQUMxRSxPQUFPLGVBQWUsZ0ZBQWdGLE9BQU8sMEJBQTBCO0FBQUEsNEJBQzdILFNBQVMsU0FBUyxPQUFPLFFBQVFBO0FBQUE7QUFBQSxTQUVwRDtBQUNELElBQUFBO0FBQUEsRUFDSixDQUFDO0FBRUQsRUFBQUEsS0FBSTtBQUNKLFdBQVMsUUFBUSxRQUFRLENBQUMsV0FBZ0I7QUFDdEMsUUFBSSxVQUFVLFNBQVMsZUFBZSxHQUFHLFNBQVMsU0FBUyxPQUFPLFFBQVFBLElBQUc7QUFDN0UsWUFBUSxVQUFVLElBQUksd0JBQXdCO0FBRTlDLFdBQU8sT0FBTyxRQUFRLENBQUMsUUFBYTtBQUNoQyxjQUFRLG1CQUFtQixhQUFhLDBDQUEwQyxJQUFJLGNBQWMsSUFBSSxxQkFBcUI7QUFBQSxJQUNqSSxDQUFDO0FBQ0QsSUFBQUE7QUFBQSxFQUNKLENBQUM7QUFDTDtBQUVBLFNBQVMsMEJBQTBCLFVBQWU7QUFDOUMsTUFBSUEsS0FBSTtBQUNSLFdBQVMsV0FBVyxRQUFRLENBQUMsV0FBZ0I7QUFDekMsYUFBUyxlQUFlLHNCQUFzQixTQUFTLE9BQU8sRUFBRSxtQkFBbUIsYUFBYTtBQUFBO0FBQUEsOERBRTFDLE9BQU8sZ0JBQWdCLE9BQU87QUFBQSxrQkFDMUUsT0FBTyxlQUFlLGdGQUFnRixPQUFPLDBCQUEwQjtBQUFBLDRCQUM3SCxTQUFTLFNBQVMsT0FBTyxRQUFRQTtBQUFBO0FBQUEsU0FFcEQ7QUFDRCxJQUFBQTtBQUFBLEVBQ0osQ0FBQztBQUVELEVBQUFBLEtBQUk7QUFDSixXQUFTLFdBQVcsUUFBUSxDQUFDLFdBQWdCO0FBQ3pDLFFBQUksVUFBVSxTQUFTLGVBQWUsR0FBRyxTQUFTLFNBQVMsT0FBTyxRQUFRQSxJQUFHO0FBQzdFLFlBQVEsVUFBVSxJQUFJLGtDQUFrQztBQUV4RCxXQUFPLE9BQU8sUUFBUSxDQUFDLFFBQWE7QUFDaEMsVUFBSSxJQUFJLFlBQVk7QUFDaEIsZ0JBQVEsbUJBQW1CLGFBQWEsMENBQTBDLElBQUksY0FBYyxJQUFJLHFCQUFxQjtBQUFBLE1BQ2pJO0FBQUEsSUFDSixDQUFDO0FBQ0QsSUFBQUE7QUFBQSxFQUNKLENBQUM7QUFDTDtBQWVPLFNBQVMsY0FBYyxTQUFjO0FBQ3hDLE1BQUksU0FBUztBQUNiLE1BQUksUUFBUSxDQUFDO0FBQ2IsTUFBSSxRQUFRO0FBR1osU0FBTyxPQUFPLFNBQVMsSUFBSSxHQUFHO0FBQzFCLFlBQVEsT0FBTyxNQUFNLElBQUksRUFBRSxHQUFHLE1BQU0sSUFBSSxFQUFFO0FBQzFDLGFBQVMsT0FBTyxRQUFRLE1BQU0sRUFBRSxFQUFFLFFBQVEsTUFBTSxFQUFFO0FBQUEsRUFDdEQ7QUFFQSxTQUFNLE1BQU0sU0FBUyxHQUFHLEdBQUc7QUFDdkIsWUFBUSxNQUFNLFFBQVEsS0FBSyxFQUFFO0FBQUEsRUFDakM7QUFHQSxTQUFPLE9BQU8sU0FBUyxJQUFJLEdBQUc7QUFDMUIsVUFBTSxLQUFLLE9BQU8sTUFBTSxJQUFJLEVBQUUsR0FBRyxNQUFNLElBQUksRUFBRSxFQUFFO0FBQy9DLGFBQVMsT0FBTyxRQUFRLE1BQU0sRUFBRSxFQUFFLFFBQVEsTUFBTSxFQUFFO0FBQUEsRUFDdEQ7QUFDQSxTQUFPLEVBQUMsT0FBYyxNQUFNLFFBQVEsTUFBWTtBQUNwRDtBQUdPLFNBQVMsZ0JBQWdCLEtBQVU7QUFDdEMsUUFBTSxDQUFFLFlBQVksVUFBVyxJQUFJLElBQUksTUFBTSxHQUFHO0FBQ2hELFNBQU8sRUFBRSxZQUFZLFdBQVc7QUFDcEM7QUFHTyxTQUFTLGFBQWEsUUFBZ0JDLFFBQWUsTUFBYztBQUN0RSxRQUFNLE9BQU8sT0FBTyxNQUFNLGdCQUFnQjtBQUMxQyxRQUFNLFFBQVEsT0FBTyxNQUFNLFNBQVM7QUFFcEMsTUFBSSxLQUFLLE9BQU8sSUFBSTtBQUNoQixVQUFNQyxRQUFPLEtBQUssR0FBRyxNQUFNRCxNQUFLO0FBQ2hDLFdBQU9DLE1BQUssR0FBRyxTQUFTO0FBQUEsRUFDNUIsV0FBVyxNQUFNLE9BQU8sSUFBSTtBQUN4QixVQUFNQSxRQUFPLE1BQU0sR0FBRyxNQUFNRCxNQUFLO0FBQ2pDLFdBQU9DLE1BQUssR0FBRyxTQUFTO0FBQUEsRUFDNUI7QUFDQSxTQUFPO0FBQ1g7OztBQzVVQSxJQUFNQyxVQUFpQkMsUUFBRztBQUMxQixJQUFJLGVBQXdCO0FBQzVCLElBQUksSUFBWTtBQUFoQixJQUFtQixJQUFZO0FBQ3hCLElBQUksT0FBWSxTQUFTO0FBQ2hDLElBQUk7QUFDSixJQUFJLGFBQWtCLENBQUM7QUFDaEIsSUFBSSxRQUFhLENBQUM7QUFDekIsSUFBSSxrQkFBMkI7QUFDL0IsSUFBSTtBQUNKLElBQUksV0FBb0I7QUFHeEIsU0FBc0IsaUJBQWlCO0FBQUE7QUFDbkMsV0FBTyxNQUFNLFVBQVU7QUFDdkIsSUFBQUQsUUFBTyxLQUFLLFlBQVksS0FBSyxRQUFRO0FBQ3JDLElBQUFBLFFBQU8sS0FBSyxzQkFBc0IsSUFBSTtBQUN0QyxjQUFVLElBQUksSUFBSSxLQUFLO0FBRXZCLFFBQUksS0FBSyxVQUFVO0FBQ2YsdUJBQWlCO0FBQ2pCLHFCQUFlO0FBQ2Ysb0JBQWMsS0FBSztBQUFBLElBQ3ZCO0FBRUEsUUFBSSxPQUFPLGNBQWMsTUFBTTtBQUMzQixtQkFBYSxJQUFJO0FBQUEsSUFDckIsT0FBTztBQUNILG1CQUFhLFFBQVE7QUFDckIsMEJBQW9CLFlBQVk7QUFBQSxJQUNwQztBQUFBLEVBQ0o7QUFBQTtBQUVPLFNBQVMsVUFBVSxPQUFlLFFBQWdCLE9BQWdCO0FBQ3JFLE1BQUksWUFBcUI7QUFFekIsV0FBUyxlQUFlLE1BQU0sRUFBRSxpQkFBaUIsZUFBZSxPQUFLLEVBQUUsZUFBZSxDQUFDO0FBQ3ZGLFdBQVMsU0FBUztBQUVsQixXQUFTLElBQUksR0FBRyxJQUFJLFNBQVMsR0FBRyxLQUFLO0FBRWpDLFFBQUksU0FBUyxTQUFTLGVBQWUsTUFBTSxFQUFFLFlBQVksU0FBUyxjQUFjLElBQUksQ0FBQztBQUdyRixhQUFTLElBQUksR0FBRyxJQUFJLE9BQU8sS0FBSztBQUM1QixVQUFJLFVBQVUsT0FBTyxZQUFZLFNBQVMsY0FBYyxJQUFJLENBQUM7QUFDN0QsY0FBUSxVQUFVLElBQUksWUFBWTtBQUNsQyxVQUFJLElBQUksUUFBUTtBQUFHLFlBQUk7QUFFdkIsY0FBUSxhQUFhLEtBQUssRUFBRSxTQUFTLENBQUM7QUFDdEMsY0FBUSxhQUFhLEtBQUssRUFBRSxTQUFTLENBQUM7QUFDdEM7QUFHQSxjQUFRLGlCQUFpQixZQUFZLENBQUMsTUFBYTtBQUMvQyxjQUFNLFFBQVEsU0FBUyxjQUFjLGtCQUFrQjtBQUN2RCxZQUFJLENBQUM7QUFBVywwQkFBZ0IsS0FBSztBQUNyQyxvQkFBWTtBQUNaLGdCQUFRLFlBQVksS0FBSztBQUN6QixjQUFNLFVBQVUsSUFBSSxPQUFPO0FBQzNCLFlBQUksTUFBTSxVQUFVLFNBQVMsWUFBWTtBQUFHLHlCQUFlO0FBQzNELGNBQU0sVUFBVSxPQUFPLFlBQVk7QUFDbkMsY0FBTSxVQUFVLE9BQU8sbUJBQW1CO0FBQzFDLFlBQUksTUFBTSxhQUFhLE1BQU07QUFBRyxnQkFBTSxVQUFVLElBQUksTUFBTSxhQUFhLE1BQU0sQ0FBQztBQUFBLE1BQ2xGLENBQUM7QUFDRCxjQUFRLGlCQUFpQixhQUFhLENBQUMsTUFBVztBQUM5QyxZQUFJLEVBQUUsVUFBVSxHQUFHO0FBQ2YsbUJBQVNFLEtBQUksR0FBR0EsS0FBSSxHQUFHQSxNQUFLO0FBQ3hCLGdCQUFJLEVBQUUsS0FBS0EsSUFBRyxVQUFVLFNBQVMsWUFBWSxHQUFHO0FBQzVDLDZCQUFlLEVBQUUsS0FBS0E7QUFBQSxZQUMxQjtBQUFBLFVBQ0o7QUFBQSxRQUNKO0FBQUEsTUFDSixDQUFDO0FBQ0QsY0FBUSxpQkFBaUIsV0FBVyxNQUFNO0FBQ3RDLGNBQU0sUUFBaUIsUUFBUTtBQUMvQixZQUFJLE9BQU87QUFDUCxjQUFJLE9BQU8sTUFBTSxhQUFhLE1BQU07QUFDcEMsY0FBSSxRQUFRLE1BQU0sYUFBYSxLQUFLO0FBQ3BDLGNBQUksV0FBVyxNQUFNLGFBQWEsVUFBVTtBQUM1QyxjQUFJLEtBQUssTUFBTSxhQUFhLElBQUk7QUFFaEMsZ0JBQU0sVUFBVSxPQUFPLGlCQUFpQjtBQUN4QyxnQkFBTSxnQkFBZ0IsYUFBYTtBQUVuQyxnQkFBTSxpQkFBaUIsWUFBWSxNQUFNO0FBQ3JDLGdCQUFJLGFBQWEsVUFBVSxPQUFPLGVBQWU7QUFBVTtBQUUzRCxnQkFBSSxjQUFjO0FBRWQsc0NBQXdCLFVBQVUsS0FBSztBQUN2Qyw2QkFBZTtBQUFBLFlBQ25CLE9BQU87QUFDSCx5QkFBVyxXQUFXO0FBQUUsK0JBQWU7QUFBQSxjQUFNLEdBQUcsR0FBRztBQUFBLFlBQ3ZEO0FBQUEsVUFDSixDQUFDO0FBRUQsY0FBSTtBQUFjLFlBQUFGLFFBQU8sS0FBSyxnQkFBZ0IsRUFBQyxHQUFHLFNBQVMsYUFBYSxhQUFhLEdBQUcsQ0FBQyxHQUFHLEdBQUcsU0FBUyxhQUFhLGFBQWEsR0FBRyxDQUFDLEVBQUMsR0FBRyxJQUFJO0FBRzlJLGdCQUFNLFdBQVcsSUFBSSxNQUFNLElBQUksT0FBTyxNQUFNLFFBQVE7QUFDcEQscUJBQVc7QUFDWCxVQUFBQSxRQUFPLEtBQUssZUFBZSxFQUFDLEdBQUcsU0FBUyxRQUFRLGFBQWEsR0FBRyxDQUFDLEdBQUcsR0FBRyxTQUFTLFFBQVEsYUFBYSxHQUFHLENBQUMsRUFBQyxHQUFHLFVBQVUsS0FBSyxVQUFVLElBQUk7QUFFMUksNkJBQW1CO0FBQ25CLHlCQUFlO0FBQUEsUUFDbkI7QUFBQSxNQUNKLENBQUM7QUFFRCxZQUFNLEtBQUssT0FBTztBQUFBLElBQ3RCO0FBQ0E7QUFBQSxFQUNKO0FBQ0o7QUFHQSxTQUFTLFlBQVksTUFBVyxVQUFlLFVBQWtCO0FBQzdELE1BQUksVUFBVTtBQUNWLFVBQU0sUUFBUSxLQUFLLFlBQVksU0FBUyxjQUFjLEtBQUssQ0FBQztBQUM1RCxVQUFNLGFBQWEsT0FBTyxTQUFTLEtBQUs7QUFDeEMsVUFBTSxhQUFhLE1BQU0sU0FBUyxFQUFFO0FBQ3BDLFVBQU0sYUFBYSxZQUFZLFNBQVMsUUFBUTtBQUNoRCxVQUFNLFVBQVUsSUFBSSxPQUFPO0FBQzNCLFVBQU0sVUFBVSxJQUFJLFNBQVMsSUFBSTtBQUNqQyxVQUFNLGFBQWEsUUFBUSxTQUFTLElBQUk7QUFDeEMsUUFBSTtBQUFVLFlBQU0sYUFBYSxTQUFTLFFBQVE7QUFDbEQsb0JBQWdCLEtBQUs7QUFFckIsUUFBSSxXQUFXLE1BQU0sYUFBYSxVQUFVO0FBQzVDLFVBQU0saUJBQWlCLFlBQVksTUFBTTtBQUNyQyxVQUFJLGFBQWEsVUFBVSxPQUFPLGVBQWU7QUFBVTtBQUUzRCxVQUFJLGNBQWM7QUFFZCxnQ0FBd0IsVUFBVSxLQUFLO0FBQ3ZDLHVCQUFlO0FBQUEsTUFDbkIsT0FBTztBQUNILG1CQUFXLFdBQVc7QUFBRSx5QkFBZTtBQUFBLFFBQU0sR0FBRyxHQUFHO0FBQUEsTUFDdkQ7QUFBQSxJQUNKLENBQUM7QUFBQSxFQUNMLE9BQU87QUFDSCxlQUFXO0FBQUEsRUFDZjtBQUNKO0FBRU8sU0FBUyxTQUFTO0FBQ3JCLE1BQUksVUFBa0IsS0FBSyxVQUFrQjtBQUM3QyxNQUFJLEtBQUssaUJBQWlCLElBQUk7QUFDOUIsTUFBSSxZQUFZLFNBQVMsR0FBRyxpQkFBaUIsUUFBUSxDQUFDO0FBQ3RELE9BQUssTUFBTSxZQUFZLFVBQVUsR0FBRyxNQUFNLFlBQVksR0FBRyxTQUFTLE9BQU8sTUFBTTtBQUNuRjtBQUVPLFNBQVMsVUFBVTtBQUN0QixNQUFJLFVBQWtCLEtBQUssVUFBa0I7QUFDN0MsTUFBSSxLQUFLLGlCQUFpQixJQUFJO0FBQzlCLE1BQUksWUFBWSxTQUFTLEdBQUcsaUJBQWlCLFFBQVEsQ0FBQztBQUN0RCxPQUFLLE1BQU0sWUFBWSxVQUFVLEdBQUcsTUFBTSxZQUFZLEdBQUcsU0FBUyxPQUFPLE1BQU07QUFDbkY7QUFFQSxTQUFTLFdBQVc7QUFDaEIsTUFBSTtBQUNKLE1BQUk7QUFDSixXQUFTLGVBQWUsTUFBTSxFQUFFLFlBQVk7QUFDNUMsVUFBUSxDQUFDO0FBQ2I7QUFFQSxTQUFTLG1CQUFtQjtBQUN4QixvQkFBa0IsQ0FBQztBQUNuQixNQUFJLGlCQUFpQjtBQUNqQixVQUFNLHNCQUFzQixTQUFTLGNBQWMsTUFBTSxFQUFFLFlBQVksU0FBUyxjQUFjLEtBQUssQ0FBQztBQUNwRyx3QkFBb0IsVUFBVSxJQUFJLGNBQWM7QUFFaEQsVUFBTSxlQUFlLFNBQVMsY0FBYyxlQUFlO0FBQzNELGFBQVMsVUFBVSxZQUFZO0FBQzNCLG1CQUFhLG1CQUFtQixhQUFhO0FBQUEscUJBQ3BDO0FBQUEsYUFDUjtBQUFBLElBQ0w7QUFBQSxFQUNKLE9BQU87QUFDSCxhQUFTLGNBQWMsZUFBZSxFQUFFLE9BQU87QUFBQSxFQUNuRDtBQUNKO0FBRUEsU0FBZSxZQUFZO0FBQUE7QUFDdkIsVUFBTUcsUUFBTyxNQUFNLFFBQVE7QUFDM0IsV0FBT0E7QUFBQSxFQUNYO0FBQUE7QUFFQSxTQUFTLGFBQWEsVUFBa0I7QUFDcEMsUUFBTSxVQUFVLFNBQVMsY0FBYyxVQUFVO0FBQ2pELE1BQUksYUFBYSxNQUFNO0FBQ25CLFlBQVEsbUJBQW1CLGFBQWE7QUFBQTtBQUFBO0FBQUE7QUFBQSxTQUl2QztBQUFBLEVBQ0wsT0FBTztBQUNILFlBQVEsbUJBQW1CLGFBQWE7QUFBQTtBQUFBO0FBQUEsU0FHdkM7QUFBQSxFQUNMO0FBRUEsV0FBUyxlQUFlLGlCQUFpQixFQUFFLGlCQUFpQixTQUFTLE1BQU0sZ0JBQWdCLFFBQVEsQ0FBQztBQUNwRyxXQUFTLGVBQWUsc0JBQXNCLEVBQUUsaUJBQWlCLFNBQVMsTUFBTSxzQkFBc0IsQ0FBQztBQUN2RyxXQUFTLGVBQWUsZUFBZSxFQUFFLGlCQUFpQixTQUFTLE1BQU0sY0FBYyxNQUFNLENBQUM7QUFDbEc7QUFFQSxJQUFNLFFBQU4sTUFBWTtBQUFBLEVBS1IsWUFBWSxJQUFZLE9BQWUsTUFBYyxVQUFlO0FBQ2hFLFNBQUssS0FBSztBQUNWLFNBQUssUUFBUTtBQUNiLFNBQUssT0FBTztBQUNaLFNBQUssV0FBVztBQUFBLEVBQ3BCO0FBQ0o7QUFNQUgsUUFBTyxHQUFHLHNCQUF1QixDQUFDLGVBQWU7QUFDN0MsZUFBYSxDQUFDO0FBQ2QsV0FBU0ksV0FBVSxZQUFZO0FBQzNCLGVBQVcsS0FBS0EsUUFBTyxRQUFRO0FBQUEsRUFDbkM7QUFDQSxtQkFBaUI7QUFDakIsbUJBQWlCO0FBQ3JCLENBQUU7QUFFRkosUUFBTyxHQUFHLGVBQWdCLENBQUMsTUFBVyxPQUFnQixhQUFxQjtBQUN2RSxRQUFNLFVBQVUsU0FBUyxLQUFLLEdBQUcsS0FBSyxDQUFDO0FBQ3ZDLGNBQVksU0FBUyxPQUFPLFFBQVE7QUFDeEMsQ0FBRTtBQUVGQSxRQUFPLEdBQUcsZ0JBQWlCLENBQUMsU0FBYztBQUN0QyxRQUFNLFVBQVUsU0FBUyxLQUFLLEdBQUcsS0FBSyxDQUFDO0FBQ3ZDLFVBQVEsWUFBWTtBQUN4QixDQUFFOzs7QUN6UEYsSUFBTSxhQUFhLFVBQVU7QUFDN0IsSUFBSSxZQUFZO0FBVVQsU0FBUyx1QkFBdUI7QUFDbkMsY0FBWSxDQUFDO0FBQ2IsTUFBSSxXQUFXO0FBQ1gsUUFBSSxTQUFTLEtBQUssT0FBTyxXQUFXLE1BQU0sTUFBTSxDQUFDO0FBQ2pELFFBQUksU0FBUyxLQUFLLE9BQU8sV0FBVyxNQUFNLE1BQU0sQ0FBQztBQUNqRCxRQUFJLFNBQVMsS0FBSyxPQUFPLFdBQVcsTUFBTSxNQUFNLENBQUM7QUFDakQsUUFBSSxTQUFTLEtBQUssT0FBTyxXQUFXLE1BQU0sTUFBTSxDQUFDO0FBQ2pELFFBQUksU0FBUyxLQUFLLE9BQU8sV0FBVyxNQUFNLE1BQU0sQ0FBQztBQUNqRCxRQUFJLFVBQVUsS0FBSyxPQUFPLFdBQVcsT0FBTyxNQUFNLENBQUM7QUFFbkQsVUFBTSxjQUFjLFNBQVMsY0FBYyxNQUFNLEVBQUUsWUFBWSxTQUFTLGNBQWMsS0FBSyxDQUFDO0FBQzVGLGdCQUFZLFVBQVUsSUFBSSxpQkFBaUI7QUFDM0MsZ0JBQVksbUJBQW1CLGFBQWE7QUFBQTtBQUFBO0FBQUEsOERBR1UsV0FBVztBQUFBLDBCQUMvQyxXQUFXO0FBQUE7QUFBQTtBQUFBLCtCQUdOLFdBQVc7QUFBQTtBQUFBO0FBQUEseUJBR2pCLFdBQVcsUUFBUSxXQUFXLFNBQVMsV0FBVztBQUFBO0FBQUE7QUFBQSxzQ0FHckMsV0FBVyx3QkFBd0IsV0FBVyxTQUFTLFdBQVc7QUFBQTtBQUFBO0FBQUEsNkJBRzNFLFdBQVcsa0JBQWtCLFdBQVcsd0JBQXdCLFdBQVc7QUFBQTtBQUFBO0FBQUEsOEVBRzFCLFdBQVc7QUFBQTtBQUFBO0FBQUEsd0VBR2pCLFdBQVcsZ0JBQWdCLFdBQVc7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQSw2QkFVakYsV0FBVztBQUFBO0FBQUEsaUNBRVAsU0FBUyxJQUFJLEtBQUssT0FBTztBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUEsNkJBSzdCLFdBQVc7QUFBQTtBQUFBLGlDQUVQLFNBQVMsSUFBSSxLQUFLLE9BQU87QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBLDZCQUs3QixXQUFXO0FBQUE7QUFBQSxpQ0FFUCxTQUFTLElBQUksS0FBSyxPQUFPO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQSw2QkFLN0IsV0FBVztBQUFBO0FBQUEsaUNBRVAsU0FBUyxJQUFJLEtBQUssT0FBTztBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUEsNkJBSzdCLFdBQVc7QUFBQTtBQUFBLGlDQUVQLFNBQVMsSUFBSSxLQUFLLE9BQU87QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBLDZCQUs3QixXQUFXO0FBQUE7QUFBQSxpQ0FFUCxVQUFVLElBQUksS0FBSyxPQUFPO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQSxTQUtsRDtBQUVELG1CQUFlO0FBQ2YsZ0JBQVksYUFBYSxpQkFBaUI7QUFBQSxFQUM5QyxPQUFPO0FBQ0gsYUFBUyxjQUFjLGtCQUFrQixFQUFFLE9BQU87QUFBQSxFQUN0RDtBQUNKOzs7QUNuR0EsSUFBSSxXQUFXO0FBQ2YsSUFBSTtBQUFKLElBQXdCO0FBQ3hCLElBQUksV0FBVztBQUNSLElBQUksZUFBZSxFQUFDLE9BQU8sS0FBSTtBQUt0QyxTQUFTLGlCQUFpQixXQUFXLENBQUMsTUFBTTtBQUN4QyxNQUFJLGFBQWEsT0FBTztBQUNwQixZQUFRO0FBQUEsWUFDQyxFQUFFLFFBQVEsVUFBVSxFQUFFLFFBQVE7QUFDL0IsbUJBQVc7QUFDWDtBQUFBLFdBQ0MsRUFBRSxRQUFRO0FBQ1gsbUJBQVcsVUFBVSxTQUFTLHVCQUF1QixPQUFPLEdBQUc7QUFDM0QsY0FBSSxPQUFPLFVBQVUsU0FBUyxpQkFBaUI7QUFBRyxtQkFBTyxPQUFPO0FBQUEsUUFDcEU7QUFDQTtBQUFBLFlBQ0MsRUFBRSxRQUFRLE9BQU8sRUFBRSxRQUFRO0FBQzVCLGVBQU87QUFDUDtBQUFBLFlBQ0MsRUFBRSxRQUFRLE9BQU8sRUFBRSxRQUFRO0FBQzVCLGdCQUFRO0FBQ1I7QUFBQSxXQUNDLEVBQUUsVUFBVTtBQUNiLGVBQU8sZUFBZSxPQUFPLGdCQUFnQixRQUFRLElBQUksb0JBQW9CLFlBQVk7QUFDekY7QUFBQSxXQUNDLEVBQUUsVUFBVTtBQUNiLGVBQU8sZUFBZSxPQUFPLHNCQUFzQixJQUFJLHFCQUFxQjtBQUM1RTtBQUFBLFdBQ0MsRUFBRSxVQUFVO0FBQ2IsZUFBTyxlQUFlLE9BQU8sY0FBYyxNQUFNLElBQUksUUFBUSxJQUFJLFNBQVM7QUFDMUU7QUFBQTtBQUVBO0FBQUE7QUFBQSxFQUVaO0FBQ0osQ0FBQztBQUdELFNBQVMsaUJBQWlCLFNBQVMsQ0FBQyxNQUFNO0FBQ3RDLFVBQVE7QUFBQSxVQUNDLEVBQUUsUUFBUSxVQUFVLEVBQUUsUUFBUTtBQUMvQixpQkFBVztBQUNYO0FBQUE7QUFFQTtBQUFBO0FBRVosQ0FBQztBQUdELFNBQVMsaUJBQWlCLGFBQWEsQ0FBQyxNQUFNO0FBQzFDLFVBQVE7QUFBQSxTQUNDLEVBQUUsVUFBVTtBQUNiLFFBQUUsZUFBZTtBQUNqQixtQkFBYSxFQUFFO0FBQ2YsbUJBQWEsRUFBRTtBQUNmLGlCQUFXO0FBQ1g7QUFBQTtBQUVBO0FBQUE7QUFFWixDQUFDO0FBR0QsU0FBUyxpQkFBaUIsV0FBVyxDQUFDLE1BQU07QUFDeEMsVUFBUTtBQUFBLFNBQ0MsRUFBRSxVQUFVO0FBQ2IsaUJBQVc7QUFDWCxlQUFTLGNBQWMsc0JBQXNCLEVBQUUsVUFBVSxPQUFPLFNBQVM7QUFDekU7QUFBQTtBQUVBO0FBQUE7QUFFWixDQUFDO0FBR0QsU0FBUyxpQkFBaUIsYUFBYSxDQUFDLE1BQU07QUFDMUMsUUFBTSxZQUFZLEVBQUU7QUFDcEIsUUFBTSxZQUFZLEVBQUU7QUFDcEIsTUFBSSxVQUFVO0FBQ1YsYUFBUyxjQUFjLGlCQUFpQixFQUFFLFVBQVUsYUFBYSxhQUFhLEtBQUssYUFBYSxhQUFhLEVBQUU7QUFDL0csYUFBUyxjQUFjLHNCQUFzQixFQUFFLFVBQVUsSUFBSSxTQUFTO0FBQUEsRUFDMUU7QUFDSixDQUFDOzs7QUN4Rk0sSUFBSSxXQUFnQixFQUFDLE9BQU8sTUFBSztBQUNqQyxJQUFJLGVBQW9CLEVBQUMsT0FBTyxHQUFFO0FBR2xDLElBQU0sUUFBUSxDQUFDLEtBQWEsS0FBYSxRQUFnQixLQUFLLElBQUksS0FBSyxJQUFJLEtBQUssR0FBRyxHQUFHLEdBQUc7QUFHekYsU0FBUyxTQUFTSyxJQUFXQyxJQUFXO0FBQzNDLGFBQVcsUUFBUSxPQUFPO0FBQ3RCLFFBQUksS0FBSyxhQUFhLEdBQUcsTUFBTUQsR0FBRSxTQUFTLEtBQUssS0FBSyxhQUFhLEdBQUcsTUFBTUMsR0FBRSxTQUFTLEdBQUc7QUFDcEYsYUFBTztBQUFBLElBQ1g7QUFBQSxFQUNKO0FBQ0o7QUFFTyxTQUFTLFVBQVUsVUFBa0I7QUFDeEMsTUFBSSxhQUFhLFVBQVUsVUFBVTtBQUVqQyxhQUFTLGNBQWMsT0FBTyxFQUFFLE9BQU87QUFDdkMsYUFBUyxRQUFRO0FBQUEsRUFDckIsT0FBTztBQUVILGFBQVMsY0FBYyxPQUFPLEVBQUUsT0FBTztBQUN2QyxhQUFTLFFBQVE7QUFFakIsWUFBUTtBQUFBLFdBQ0M7QUFDRCx3QkFBZ0IsRUFBRTtBQUNsQjtBQUFBLFdBQ0M7QUFDRCxzQkFBYyxFQUFFO0FBQ2hCO0FBQUEsV0FDQztBQUNELDRCQUFvQixFQUFFO0FBQUE7QUFFdEI7QUFBQTtBQUFBLEVBRVo7QUFDSjtBQUVPLFNBQVMsWUFBWSxPQUFlO0FBQ3ZDLFFBQU0sS0FBSyxPQUFPO0FBQ2xCLFNBQU8sU0FBUyxRQUFRLEdBQUcsR0FBRyxhQUFhLEdBQUcsUUFBUSxPQUFPO0FBQ2pFO0FBRU8sU0FBUyxZQUFZLE9BQVksWUFBb0I7QUFDeEQsTUFBSSxPQUFPLEdBQUcsT0FBTyxHQUFHLE9BQU8sR0FBRyxPQUFPO0FBQ3pDLE1BQUksU0FBUyxjQUFjLElBQUksb0JBQW9CLEdBQUc7QUFFcEQsYUFBUyxjQUFjLElBQUksb0JBQW9CLEVBQUUsaUJBQWlCLGFBQWEsYUFBYTtBQUFBLEVBQzlGLE9BQU87QUFFTCxVQUFNLGlCQUFpQixhQUFhLGFBQWE7QUFBQSxFQUNuRDtBQUVBLFdBQVMsY0FBYyxHQUFRO0FBQzdCLFFBQUksS0FBSyxPQUFPO0FBQ2hCLE1BQUUsZUFBZTtBQUVqQixXQUFPLEVBQUU7QUFDVCxXQUFPLEVBQUU7QUFDVCxhQUFTLFlBQVk7QUFFckIsYUFBUyxjQUFjO0FBQUEsRUFDekI7QUFFQSxXQUFTLFlBQVksR0FBUTtBQUMzQixRQUFJLEtBQUssT0FBTztBQUNoQixNQUFFLGVBQWU7QUFFakIsV0FBTyxPQUFPLEVBQUU7QUFDaEIsV0FBTyxPQUFPLEVBQUU7QUFDaEIsV0FBTyxFQUFFO0FBQ1QsV0FBTyxFQUFFO0FBRVQsVUFBTSxNQUFNLE1BQU8sTUFBTSxZQUFZLE9BQVE7QUFDN0MsVUFBTSxNQUFNLE9BQVEsTUFBTSxhQUFhLE9BQVE7QUFBQSxFQUNqRDtBQUVBLFdBQVMsbUJBQW1CO0FBRTFCLGFBQVMsWUFBWTtBQUNyQixhQUFTLGNBQWM7QUFBQSxFQUN6QjtBQUNKO0FBT08sU0FBUyxpQkFBaUI7QUFFN0IsV0FBUyxTQUFTLFNBQVMsaUJBQWlCLE9BQU8sR0FBRztBQUNsRCxVQUFNLGlCQUFpQixXQUFXLE1BQU07QUFBRSxtQkFBYSxRQUFRO0FBQUEsSUFBTyxDQUFDO0FBQ3ZFLFVBQU0saUJBQWlCLFlBQVksTUFBTTtBQUFFLG1CQUFhLFFBQVE7QUFBQSxJQUFNLENBQUM7QUFBQSxFQUMzRTtBQUNKOzs7QUNuR08sSUFBSSxZQUFpQixFQUFDLE9BQU8sQ0FBQyxFQUFDO0FBQy9CLElBQUksa0JBQXVCLEVBQUMsT0FBTyxDQUFDLEVBQUM7QUFDckMsSUFBSSxnQkFBeUI7QUFDcEMsSUFBSTtBQUtHLFNBQVMsd0JBQXdCO0FBQ3BDLGtCQUFnQixDQUFDO0FBQ2pCLE1BQUksZUFBZTtBQUNmLHlCQUFxQjtBQUNyQix5QkFBcUI7QUFBQSxFQUN6QixPQUFPO0FBQ0gsYUFBUyxjQUFjLG1CQUFtQixFQUFFLE9BQU87QUFBQSxFQUN2RDtBQUNKO0FBRUEsU0FBUyx1QkFBdUI7QUFDNUIsUUFBTUMsVUFBUyxTQUFTLGNBQWMsTUFBTSxFQUFFLFlBQVksU0FBUyxjQUFjLEtBQUssQ0FBQztBQUN2RixFQUFBQSxRQUFPLFVBQVUsSUFBSSxrQkFBa0I7QUFDdkMsRUFBQUEsUUFBTyxtQkFBbUIsYUFBYTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUEsS0FvQnRDO0FBQ0QsV0FBUyxlQUFlLHVCQUF1QixFQUFFLGlCQUFpQixTQUFTLE1BQU07QUFDN0UsMEJBQXNCO0FBQUEsRUFDMUIsQ0FBQztBQUNELGNBQVlBLFNBQVEsa0JBQWtCO0FBQzFDO0FBMENBLFNBQWUsdUJBQXVCO0FBQUE7QUFDbEMsVUFBTSxtQkFBbUI7QUFDekIsYUFBUyxZQUFZLGdCQUFnQixPQUFPO0FBQ3hDLDhCQUF3QixRQUFRO0FBQUEsSUFDcEM7QUFDQSxhQUFTLFlBQVksVUFBVSxPQUFPO0FBQ2xDLGdDQUEwQixRQUFRO0FBQUEsSUFDdEM7QUFBQSxFQUNKO0FBQUE7QUFnQkEsU0FBUywwQkFBMEIsVUFBZTtBQUM5QyxXQUFTLGNBQWMseUJBQXlCLEVBQUUsbUJBQW1CLGFBQWE7QUFBQTtBQUFBO0FBQUEscUJBR2pFLFNBQVM7QUFBQTtBQUFBO0FBQUEsS0FHekI7QUFDRCx1QkFBcUIsWUFBWSxTQUFTLEtBQUs7QUFDbkQ7QUFHQSxTQUFTLHdCQUF3QixVQUFlO0FBQzVDLFdBQVMsY0FBYyx5QkFBeUIsRUFBRSxtQkFBbUIsYUFBYTtBQUFBO0FBQUE7QUFBQSxxQkFHakUsU0FBUztBQUFBO0FBQUEsd0VBRTBDLFNBQVM7QUFBQTtBQUFBLEtBRTVFO0FBQ0QsdUJBQXFCLFVBQVUsU0FBUyxLQUFLO0FBQ2pEO0FBR0EsU0FBUyxxQkFBcUIsU0FBaUIsT0FBZTtBQUMxRCxRQUFNLE1BQU0sU0FBUyxjQUFjLHdCQUF3QjtBQUMzRCxVQUFRO0FBQUEsU0FDQztBQUNELFVBQUksaUJBQWlCLFNBQVMsTUFBTTtBQUNoQyxnQ0FBd0IsT0FBTyxLQUFLO0FBQUEsTUFDeEMsQ0FBQztBQUNELFVBQUksVUFBVSxPQUFPLHVCQUF1QjtBQUM1QztBQUFBLFNBQ0M7QUFDRCxVQUFJLGlCQUFpQixTQUFTLE1BQU07QUFDaEMsZ0NBQXdCLE9BQU8sSUFBSTtBQUFBLE1BQ3ZDLENBQUM7QUFDRCxVQUFJLFVBQVUsT0FBTyx1QkFBdUI7QUFDNUM7QUFBQTtBQUVBO0FBQUE7QUFFWjtBQUVBLElBQU0sbUJBQXdCO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUEwTDlCLFNBQVMsd0JBQXdCO0FBQzdCLHFCQUFtQixDQUFDO0FBQ3BCLE1BQUksa0JBQWtCO0FBQ2xCLFVBQU1DLFVBQVMsU0FBUyxjQUFjLE1BQU0sRUFBRSxZQUFZLFNBQVMsY0FBYyxLQUFLLENBQUM7QUFDdkYsSUFBQUEsUUFBTyxVQUFVLElBQUksdUJBQXVCO0FBQzVDLElBQUFB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QUFBQSxxREFRekI7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBLEtBUWhEO0FBQ0QsaUJBQWU7QUFDbkI7OztBQzdIQSxJQUFNRSxVQUFpQkMsUUFBRztBQUUxQixTQUFTLGlCQUFpQixvQkFBb0IsTUFBTTtBQUNoRCxZQUFVO0FBQ2QsQ0FBQzsiLAogICJuYW1lcyI6IFsiaSIsICJ0b1N0cmluZyIsICJjYWNoZSIsICJpIiwgImVuY29kZSIsICJ1cmwiLCAicGFydHMiLCAidmFsdWUiLCAidmFsdWUiLCAidmFsdWUiLCAidXJsIiwgImkiLCAidXJsIiwgInVybCIsICJ2YWx1ZSIsICJwcm90b2NvbCIsICJ2YWx1ZSIsICJ2YWx1ZSIsICJpIiwgInZhbHVlIiwgInVybCIsICJpIiwgImF4aW9zIiwgInJlcXVpcmVfYXhpb3MiLCAiaSIsICJpIiwgIndpdGhOYXRpdmVBcnJheUJ1ZmZlciIsICJsZW5ndGgiLCAiaSIsICJvbiIsICJpIiwgImxlbmd0aCIsICJpIiwgImVuY29kZSIsICJpIiwgImRlY29kZSIsICJlbmNvZGUiLCAiaSIsICJpIiwgImVuY29kZSIsICJpIiwgImRlY29kZSIsICJpIiwgInByb3RvY29sIiwgInByb3RvY29sIiwgIndpdGhOYXRpdmVBcnJheUJ1ZmZlciIsICJpc1ZpZXciLCAid2l0aE5hdGl2ZUJsb2IiLCAiaSIsICJpIiwgInByb3RvY29sIiwgIlBhY2tldFR5cGUiLCAiaSIsICJTb2NrZXQiLCAiaSIsICJzZWxmIiwgInNvY2tldCIsICJzZWxmIiwgIlNvY2tldCIsICJpIiwgImxvb2t1cCIsICJTb2NrZXQiLCAiYXhpb3MiLCAiaW1wb3J0X2F4aW9zIiwgImltcG9ydF9heGlvcyIsICJheGlvcyIsICJpbXBvcnRfYXhpb3MiLCAiYXhpb3MiLCAibG9va3VwIiwgIm1hcCIsICJtYXAiLCAiaW1wb3J0X2F4aW9zIiwgImF4aW9zIiwgImF4aW9zIiwgImltcG9ydF9heGlvcyIsICJheGlvcyIsICJjaGFyYWN0ZXIiLCAid2luZG93IiwgImkiLCAidmFsdWUiLCAibmFtZSIsICJzb2NrZXQiLCAibG9va3VwIiwgImkiLCAidXNlciIsICJjbGllbnQiLCAieCIsICJ5IiwgIndpbmRvdyIsICJ3aW5kb3ciLCAiYXhpb3MiLCAiZG1nIiwgInZhbHVlIiwgImkiLCAic29ja2V0IiwgImxvb2t1cCIsICJyb29tQ29kZSIsICJzb2NrZXQiLCAic29ja2V0IiwgImxvb2t1cCJdCn0K
