!(function (root, factory) {
  "function" == typeof define && define.amd
    ? define([], factory)
    : "object" == typeof exports
    ? (module.exports = factory())
    : (root.sigma = factory());
})(this, function () {
  "object" != typeof JSON && (JSON = {}),
    (function () {
      "use strict";
      function f(n) {
        return 10 > n ? "0" + n : n;
      }
      function this_value() {
        return this.valueOf();
      }
      function quote(string) {
        return (
          (rx_escapable.lastIndex = 0),
          rx_escapable.test(string)
            ? '"' +
              string.replace(rx_escapable, function (a) {
                var c = meta[a];
                return "string" == typeof c
                  ? c
                  : "\\u" + ("0000" + a.charCodeAt(0).toString(16)).slice(-4);
              }) +
              '"'
            : '"' + string + '"'
        );
      }
      function str(key, holder) {
        var i,
          k,
          v,
          length,
          partial,
          mind = gap,
          value = holder[key];
        switch (
          (value &&
            "object" == typeof value &&
            "function" == typeof value.toJSON &&
            (value = value.toJSON(key)),
          "function" == typeof rep && (value = rep.call(holder, key, value)),
          typeof value)
        ) {
          case "string":
            return quote(value);
          case "number":
            return isFinite(value) ? String(value) : "null";
          case "boolean":
          case "null":
            return String(value);
          case "object":
            if (!value) return "null";
            if (
              ((gap += indent),
              (partial = []),
              "[object Array]" === Object.prototype.toString.apply(value))
            ) {
              for (length = value.length, i = 0; length > i; i += 1)
                partial[i] = str(i, value) || "null";
              return (
                (v =
                  0 === partial.length
                    ? "[]"
                    : gap
                    ? "[\n" +
                      gap +
                      partial.join(",\n" + gap) +
                      "\n" +
                      mind +
                      "]"
                    : "[" + partial.join(",") + "]"),
                (gap = mind),
                v
              );
            }
            if (rep && "object" == typeof rep)
              for (length = rep.length, i = 0; length > i; i += 1)
                "string" == typeof rep[i] &&
                  ((k = rep[i]),
                  (v = str(k, value)),
                  v && partial.push(quote(k) + (gap ? ": " : ":") + v));
            else
              for (k in value)
                Object.prototype.hasOwnProperty.call(value, k) &&
                  ((v = str(k, value)),
                  v && partial.push(quote(k) + (gap ? ": " : ":") + v));
            return (
              (v =
                0 === partial.length
                  ? "{}"
                  : gap
                  ? "{\n" + gap + partial.join(",\n" + gap) + "\n" + mind + "}"
                  : "{" + partial.join(",") + "}"),
              (gap = mind),
              v
            );
        }
      }
      var rx_one = /^[\],:{}\s]*$/,
        rx_two = /\\(?:["\\\/bfnrt]|u[0-9a-fA-F]{4})/g,
        rx_three =
          /"[^"\\\n\r]*"|true|false|null|-?\d+(?:\.\d*)?(?:[eE][+\-]?\d+)?/g,
        rx_four = /(?:^|:|,)(?:\s*\[)+/g,
        rx_escapable =
          /[\\\"\u0000-\u001f\u007f-\u009f\u00ad\u0600-\u0604\u070f\u17b4\u17b5\u200c-\u200f\u2028-\u202f\u2060-\u206f\ufeff\ufff0-\uffff]/g,
        rx_dangerous =
          /[\u0000\u00ad\u0600-\u0604\u070f\u17b4\u17b5\u200c-\u200f\u2028-\u202f\u2060-\u206f\ufeff\ufff0-\uffff]/g;
      "function" != typeof Date.prototype.toJSON &&
        ((Date.prototype.toJSON = function () {
          return isFinite(this.valueOf())
            ? this.getUTCFullYear() +
                "-" +
                f(this.getUTCMonth() + 1) +
                "-" +
                f(this.getUTCDate()) +
                "T" +
                f(this.getUTCHours()) +
                ":" +
                f(this.getUTCMinutes()) +
                ":" +
                f(this.getUTCSeconds()) +
                "Z"
            : null;
        }),
        (Boolean.prototype.toJSON = this_value),
        (Number.prototype.toJSON = this_value),
        (String.prototype.toJSON = this_value));
      var gap, indent, meta, rep;
      "function" != typeof JSON.stringify &&
        ((meta = {
          "\b": "\\b",
          "	": "\\t",
          "\n": "\\n",
          "\f": "\\f",
          "\r": "\\r",
          '"': '\\"',
          "\\": "\\\\",
        }),
        (JSON.stringify = function (value, replacer, space) {
          var i;
          if (((gap = ""), (indent = ""), "number" == typeof space))
            for (i = 0; space > i; i += 1) indent += " ";
          else "string" == typeof space && (indent = space);
          if (
            ((rep = replacer),
            replacer &&
              "function" != typeof replacer &&
              ("object" != typeof replacer ||
                "number" != typeof replacer.length))
          )
            throw new Error("JSON.stringify");
          return str("", { "": value });
        })),
        "function" != typeof JSON.parse &&
          (JSON.parse = function (text, reviver) {
            function walk(holder, key) {
              var k,
                v,
                value = holder[key];
              if (value && "object" == typeof value)
                for (k in value)
                  Object.prototype.hasOwnProperty.call(value, k) &&
                    ((v = walk(value, k)),
                    void 0 !== v ? (value[k] = v) : delete value[k]);
              return reviver.call(holder, key, value);
            }
            var j;
            if (
              ((text = String(text)),
              (rx_dangerous.lastIndex = 0),
              rx_dangerous.test(text) &&
                (text = text.replace(rx_dangerous, function (a) {
                  return (
                    "\\u" + ("0000" + a.charCodeAt(0).toString(16)).slice(-4)
                  );
                })),
              rx_one.test(
                text
                  .replace(rx_two, "@")
                  .replace(rx_three, "]")
                  .replace(rx_four, "")
              ))
            )
              return (
                (j = eval("(" + text + ")")),
                "function" == typeof reviver ? walk({ "": j }, "") : j
              );
            throw new SyntaxError("JSON.parse");
          });
    })(),
    "function" != typeof Object.assign &&
      !(function () {
        Object.assign = function (target) {
          "use strict";
          if (void 0 === target || null === target)
            throw new TypeError("Cannot convert undefined or null to object");
          for (
            var output = Object(target), index = 1;
            index < arguments.length;
            index++
          ) {
            var source = arguments[index];
            if (void 0 !== source && null !== source)
              for (var nextKey in source)
                source.hasOwnProperty(nextKey) &&
                  (output[nextKey] = source[nextKey]);
          }
          return output;
        };
      })();
  var pattern = /^[a-z0-9][a-z0-9\-_ ]{1,63}$/,
    isBrowser = !0;
  "undefined" == typeof window && (isBrowser = !1);
  var sigma = {
    version: 20160419,
    baseUrl: isBrowser
      ? "//" + window.location.host + "/api/sigma"
      : "https://www.renrenche.com/api/sigma",
    ipAddress: null,
    userAgent: null,
    timeout: 1500,
    persist: !0,
    environment: {},
    cookiePrefix: "sigma-",
    cookieDomain: isBrowser ? window.location.hostname : ".renrenche.com",
  };
  (sigma.generateClientId = function () {
    var client = "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(
      /[xy]/g,
      function (c) {
        var r = (16 * Math.random()) | 0,
          v = "x" === c ? r : (3 & r) | 8;
        return v.toString(16);
      }
    );
    return this.setCookie("client-uuid", client), client;
  }),
    (sigma.setCookie = function (key, value) {
      if (isBrowser && this.persist) {
        var cookieExpire = new Date();
        cookieExpire.setTime(cookieExpire.getTime() + 31536e7);
        var cookieValue =
          this.cookiePrefix +
          key +
          "=" +
          value +
          "; expires=" +
          cookieExpire.toGMTString() +
          "; path=/";
        this.cookieDomain && (cookieValue += "; domain=" + this.cookieDomain),
          (document.cookie = cookieValue);
      }
    }),
    (sigma.getCookie = function (key) {
      if (isBrowser) {
        var result = new RegExp(
          "(?:^|; )" + encodeURIComponent(this.cookiePrefix + key) + "=([^;]*)"
        ).exec(document.cookie);
        return result ? result[1] : null;
      }
      return null;
    }),
    (sigma.Session = function (options) {
      if ((Object.assign(this, sigma, options), !this.client))
        if (this.persist && isBrowser) {
          var persistedId = this.getCookie("client-uuid");
          this.client =
            null !== persistedId ? persistedId : this.generateClientId();
        } else this.client = this.generateClientId();
    }),
    (sigma.Session.prototype = {
      participate: function (data, callback) {
        if (((data = data || {}), !callback))
          throw new Error("sigma.participate: Callback is not specified");
        if (!data.experiment || !pattern.test(data.experiment))
          return callback(new Error("Bad experiment name"));
        if (!data.variants || data.variants.length < 2)
          return callback(new Error("Must specify at least 2 variants"));
        for (var i = 0; i < data.variants.length; i += 1)
          if (!pattern.test(data.variants[i]))
            return callback(new Error("Bad variant name: " + data.variants[i]));
        var instance = this,
          done = function (err, res) {
            var experiments = instance.getCookie.call(instance, "experiments");
            experiments = experiments ? experiments : "{}";
            try {
              experiments = JSON.parse(experiments);
            } catch (e) {
              experiments = {};
            }
            res.experiment && res.variant
              ? (experiments[res.experiment] = err
                  ? "participate-error"
                  : res.variant)
              : (experiments[data.experiment] = "participate-error"),
              instance.setCookie.call(
                instance,
                "experiment",
                JSON.stringify(experiments)
              ),
              callback(err, res);
          };
        if (isBrowser && null == data.force) {
          var regex = new RegExp(
              "[\\?&]sigma-force-" + data.experiment + "=([^&#]*)"
            ),
            results = regex.exec(window.location.search);
          null != results &&
            (data.force = decodeURIComponent(results[1].replace(/\+/g, " ")));
        }
        if (null != data.force && _isInArray(data.variants, data.force))
          return done(null, {
            status: 0,
            variant: data.force,
            experiment: data.experiment,
            client: this.client,
          });
        var traffic = "object" == typeof data.traffic ? data.traffic : {},
          environment =
            "object" == typeof data.environment ? data.environment : null,
          params = {
            client: this.client,
            experiment: data.experiment,
            variants: data.variants,
            traffic: traffic,
          };
        return (
          this.ipAddress && (params.ipAddress = this.ipAddress),
          this.userAgent && (params.userAgent = this.userAgent),
          environment
            ? (params.environment = environment)
            : this.environment && (params.environment = this.environment),
          _request(
            this.baseUrl + "/participate",
            params,
            this.timeout,
            function (err, res) {
              return (
                err &&
                  (res = {
                    status: -100,
                    errmsg: err,
                    variant: data.variants[0],
                    experiment: data.experiment,
                  }),
                done(err, res)
              );
            }
          )
        );
      },
      convert: function (data, callback) {
        if (
          ("string" == typeof data && (data = { experiment: data }),
          callback ||
            (callback = function (err) {
              err && console && console.error && console.error(err);
            }),
          !data.experiment || !pattern.test(data.experiment))
        )
          return callback(new Error("Bad experiment name"));
        var params = { client: this.client, experiment: data.experiment };
        return (
          this.ipAddress && (params.ipAddress = this.ipAddress),
          this.userAgent && (params.userAgent = this.userAgent),
          this.environment && (params.environment = this.environment),
          _request(
            this.baseUrl + "/convert",
            params,
            this.timeout,
            function (err, res) {
              return (
                err && (res = { status: -100, errmsg: err }),
                callback(null, res)
              );
            }
          )
        );
      },
    });
  var _request = function (uri, params, timeout, callback) {
      var hasTimedOut = !1,
        timer = setTimeout(function () {
          return (hasTimedOut = !0), callback(new Error("request timed out"));
        }, timeout),
        args = { params: JSON.stringify(params) };
      isBrowser &&
        ((args.callback = "sigmajsonpcallback" + new Date().getTime()),
        (window[args.callback] = function (res) {
          return hasTimedOut
            ? void 0
            : (clearTimeout(timer), callback(null, res));
        }));
      var url = _buildQueryString(uri, args);
      if (isBrowser) {
        var script = document.createElement("script");
        (script.type = "text/javascript"),
          (script.src = url),
          (script.async = !0),
          document.body.appendChild(script);
      } else {
        var http = require("http"),
          req = http.get(url, function (res) {
            var body = "";
            return (
              res.on("data", function (chunk) {
                return (body += chunk);
              }),
              res.on("end", function () {
                var data;
                return (
                  (data =
                    500 === res.statusCode
                      ? { status: -100, errmsg: body }
                      : JSON.parse(body)),
                  hasTimedOut
                    ? void 0
                    : (clearTimeout(timer), callback(null, data))
                );
              })
            );
          });
        req.on("error", function (err) {
          return hasTimedOut ? void 0 : (clearTimeout(timer), callback(err));
        });
      }
    },
    _buildQueryString = function (endpoint, args) {
      var queryString = [];
      for (var key in args)
        if (args.hasOwnProperty(key)) {
          var vals = args[key];
          "[object Array]" !== Object.prototype.toString.call(vals) &&
            (vals = [vals]);
          for (var i = 0; i < vals.length; i += 1)
            queryString.push(
              encodeURIComponent(key) + "=" + encodeURIComponent(vals[i])
            );
        }
      return (
        queryString.length && (endpoint += "?" + queryString.join("&")),
        endpoint
      );
    },
    _isInArray = function (a, v) {
      for (var i = 0; i < a.length; i++) if (a[i] === v) return !0;
      return !1;
    };
  return sigma;
});
//# sourceMappingURL=sigma.min.js.map
