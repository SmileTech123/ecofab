import { createRequire } from 'module';const require = createRequire(import.meta.url);
import {
  __commonJS,
  __require
} from "./chunk-YHCV7DAQ.js";

// node_modules/file-uri-to-path/index.js
var require_file_uri_to_path = __commonJS({
  "node_modules/file-uri-to-path/index.js"(exports, module) {
    var sep = __require("path").sep || "/";
    module.exports = fileUriToPath;
    function fileUriToPath(uri) {
      if ("string" != typeof uri || uri.length <= 7 || "file://" != uri.substring(0, 7)) {
        throw new TypeError("must pass in a file:// URI to convert to a file path");
      }
      var rest = decodeURI(uri.substring(7));
      var firstSlash = rest.indexOf("/");
      var host = rest.substring(0, firstSlash);
      var path = rest.substring(firstSlash + 1);
      if ("localhost" == host) host = "";
      if (host) {
        host = sep + sep + host;
      }
      path = path.replace(/^(.+)\|/, "$1:");
      if (sep == "\\") {
        path = path.replace(/\//g, "\\");
      }
      if (/^.+\:/.test(path)) {
      } else {
        path = sep + path;
      }
      return host + path;
    }
  }
});

// node_modules/bindings/bindings.js
var require_bindings = __commonJS({
  "node_modules/bindings/bindings.js"(exports, module) {
    var fs = __require("fs");
    var path = __require("path");
    var fileURLToPath = require_file_uri_to_path();
    var join = path.join;
    var dirname = path.dirname;
    var exists = fs.accessSync && function(path2) {
      try {
        fs.accessSync(path2);
      } catch (e) {
        return false;
      }
      return true;
    } || fs.existsSync || path.existsSync;
    var defaults = {
      arrow: process.env.NODE_BINDINGS_ARROW || " → ",
      compiled: process.env.NODE_BINDINGS_COMPILED_DIR || "compiled",
      platform: process.platform,
      arch: process.arch,
      nodePreGyp: "node-v" + process.versions.modules + "-" + process.platform + "-" + process.arch,
      version: process.versions.node,
      bindings: "bindings.node",
      try: [
        // node-gyp's linked version in the "build" dir
        ["module_root", "build", "bindings"],
        // node-waf and gyp_addon (a.k.a node-gyp)
        ["module_root", "build", "Debug", "bindings"],
        ["module_root", "build", "Release", "bindings"],
        // Debug files, for development (legacy behavior, remove for node v0.9)
        ["module_root", "out", "Debug", "bindings"],
        ["module_root", "Debug", "bindings"],
        // Release files, but manually compiled (legacy behavior, remove for node v0.9)
        ["module_root", "out", "Release", "bindings"],
        ["module_root", "Release", "bindings"],
        // Legacy from node-waf, node <= 0.4.x
        ["module_root", "build", "default", "bindings"],
        // Production "Release" buildtype binary (meh...)
        ["module_root", "compiled", "version", "platform", "arch", "bindings"],
        // node-qbs builds
        ["module_root", "addon-build", "release", "install-root", "bindings"],
        ["module_root", "addon-build", "debug", "install-root", "bindings"],
        ["module_root", "addon-build", "default", "install-root", "bindings"],
        // node-pre-gyp path ./lib/binding/{node_abi}-{platform}-{arch}
        ["module_root", "lib", "binding", "nodePreGyp", "bindings"]
      ]
    };
    function bindings(opts) {
      if (typeof opts == "string") {
        opts = {
          bindings: opts
        };
      } else if (!opts) {
        opts = {};
      }
      Object.keys(defaults).map(function(i2) {
        if (!(i2 in opts)) opts[i2] = defaults[i2];
      });
      if (!opts.module_root) {
        opts.module_root = exports.getRoot(exports.getFileName());
      }
      if (path.extname(opts.bindings) != ".node") {
        opts.bindings += ".node";
      }
      var requireFunc = typeof __webpack_require__ === "function" ? __non_webpack_require__ : __require;
      var tries = [], i = 0, l = opts.try.length, n, b, err;
      for (; i < l; i++) {
        n = join.apply(null, opts.try[i].map(function(p) {
          return opts[p] || p;
        }));
        tries.push(n);
        try {
          b = opts.path ? requireFunc.resolve(n) : requireFunc(n);
          if (!opts.path) {
            b.path = n;
          }
          return b;
        } catch (e) {
          if (e.code !== "MODULE_NOT_FOUND" && e.code !== "QUALIFIED_PATH_RESOLUTION_FAILED" && !/not find/i.test(e.message)) {
            throw e;
          }
        }
      }
      err = new Error("Could not locate the bindings file. Tried:\n" + tries.map(function(a) {
        return opts.arrow + a;
      }).join("\n"));
      err.tries = tries;
      throw err;
    }
    module.exports = exports = bindings;
    exports.getFileName = function getFileName(calling_file) {
      var origPST = Error.prepareStackTrace, origSTL = Error.stackTraceLimit, dummy = {}, fileName;
      Error.stackTraceLimit = 10;
      Error.prepareStackTrace = function(e, st) {
        for (var i = 0, l = st.length; i < l; i++) {
          fileName = st[i].getFileName();
          if (fileName !== __filename) {
            if (calling_file) {
              if (fileName !== calling_file) {
                return;
              }
            } else {
              return;
            }
          }
        }
      };
      Error.captureStackTrace(dummy);
      dummy.stack;
      Error.prepareStackTrace = origPST;
      Error.stackTraceLimit = origSTL;
      var fileSchema = "file://";
      if (fileName.indexOf(fileSchema) === 0) {
        fileName = fileURLToPath(fileName);
      }
      return fileName;
    };
    exports.getRoot = function getRoot(file) {
      var dir = dirname(file), prev;
      while (true) {
        if (dir === ".") {
          dir = process.cwd();
        }
        if (exists(join(dir, "package.json")) || exists(join(dir, "node_modules"))) {
          return dir;
        }
        if (prev === dir) {
          throw new Error('Could not find module root given file: "' + file + '". Do you have a `package.json` file? ');
        }
        prev = dir;
        dir = join(dir, "..");
      }
    };
  }
});

// node_modules/sqlite3/lib/sqlite3-binding.js
var require_sqlite3_binding = __commonJS({
  "node_modules/sqlite3/lib/sqlite3-binding.js"(exports, module) {
    module.exports = require_bindings()("node_sqlite3.node");
  }
});

// node_modules/sqlite3/lib/trace.js
var require_trace = __commonJS({
  "node_modules/sqlite3/lib/trace.js"(exports) {
    var util = __require("util");
    function extendTrace(object, property, pos) {
      const old = object[property];
      object[property] = function() {
        const error = new Error();
        const name = object.constructor.name + "#" + property + "(" + Array.prototype.slice.call(arguments).map(function(el) {
          return util.inspect(el, false, 0);
        }).join(", ") + ")";
        if (typeof pos === "undefined") pos = -1;
        if (pos < 0) pos += arguments.length;
        const cb = arguments[pos];
        if (typeof arguments[pos] === "function") {
          arguments[pos] = function replacement() {
            const err = arguments[0];
            if (err && err.stack && !err.__augmented) {
              err.stack = filter(err).join("\n");
              err.stack += "\n--> in " + name;
              err.stack += "\n" + filter(error).slice(1).join("\n");
              err.__augmented = true;
            }
            return cb.apply(this, arguments);
          };
        }
        return old.apply(this, arguments);
      };
    }
    exports.extendTrace = extendTrace;
    function filter(error) {
      return error.stack.split("\n").filter(function(line) {
        return line.indexOf(__filename) < 0;
      });
    }
  }
});

// node_modules/sqlite3/lib/sqlite3.js
var require_sqlite3 = __commonJS({
  "node_modules/sqlite3/lib/sqlite3.js"(exports, module) {
    var path = __require("path");
    var sqlite3 = require_sqlite3_binding();
    var EventEmitter = __require("events").EventEmitter;
    module.exports = exports = sqlite3;
    function normalizeMethod(fn) {
      return function(sql) {
        let errBack;
        const args = Array.prototype.slice.call(arguments, 1);
        if (typeof args[args.length - 1] === "function") {
          const callback = args[args.length - 1];
          errBack = function(err) {
            if (err) {
              callback(err);
            }
          };
        }
        const statement = new Statement(this, sql, errBack);
        return fn.call(this, statement, args);
      };
    }
    function inherits(target, source) {
      for (const k in source.prototype) target.prototype[k] = source.prototype[k];
    }
    sqlite3.cached = {
      Database: function(file, a, b) {
        if (file === "" || file === ":memory:") {
          return new Database(file, a, b);
        }
        let db;
        file = path.resolve(file);
        if (!sqlite3.cached.objects[file]) {
          db = sqlite3.cached.objects[file] = new Database(file, a, b);
        } else {
          db = sqlite3.cached.objects[file];
          const callback = typeof a === "number" ? b : a;
          if (typeof callback === "function") {
            let cb2 = function() {
              callback.call(db, null);
            };
            var cb = cb2;
            if (db.open) process.nextTick(cb2);
            else db.once("open", cb2);
          }
        }
        return db;
      },
      objects: {}
    };
    var Database = sqlite3.Database;
    var Statement = sqlite3.Statement;
    var Backup = sqlite3.Backup;
    inherits(Database, EventEmitter);
    inherits(Statement, EventEmitter);
    inherits(Backup, EventEmitter);
    Database.prototype.prepare = normalizeMethod(function(statement, params) {
      return params.length ? statement.bind.apply(statement, params) : statement;
    });
    Database.prototype.run = normalizeMethod(function(statement, params) {
      statement.run.apply(statement, params).finalize();
      return this;
    });
    Database.prototype.get = normalizeMethod(function(statement, params) {
      statement.get.apply(statement, params).finalize();
      return this;
    });
    Database.prototype.all = normalizeMethod(function(statement, params) {
      statement.all.apply(statement, params).finalize();
      return this;
    });
    Database.prototype.each = normalizeMethod(function(statement, params) {
      statement.each.apply(statement, params).finalize();
      return this;
    });
    Database.prototype.map = normalizeMethod(function(statement, params) {
      statement.map.apply(statement, params).finalize();
      return this;
    });
    Database.prototype.backup = function() {
      let backup;
      if (arguments.length <= 2) {
        backup = new Backup(this, arguments[0], "main", "main", true, arguments[1]);
      } else {
        backup = new Backup(this, arguments[0], arguments[1], arguments[2], arguments[3], arguments[4]);
      }
      backup.retryErrors = [sqlite3.BUSY, sqlite3.LOCKED];
      return backup;
    };
    Statement.prototype.map = function() {
      const params = Array.prototype.slice.call(arguments);
      const callback = params.pop();
      params.push(function(err, rows) {
        if (err) return callback(err);
        const result = {};
        if (rows.length) {
          const keys = Object.keys(rows[0]);
          const key = keys[0];
          if (keys.length > 2) {
            for (let i = 0; i < rows.length; i++) {
              result[rows[i][key]] = rows[i];
            }
          } else {
            const value = keys[1];
            for (let i = 0; i < rows.length; i++) {
              result[rows[i][key]] = rows[i][value];
            }
          }
        }
        callback(err, result);
      });
      return this.all.apply(this, params);
    };
    var isVerbose = false;
    var supportedEvents = ["trace", "profile", "change"];
    Database.prototype.addListener = Database.prototype.on = function(type) {
      const val = EventEmitter.prototype.addListener.apply(this, arguments);
      if (supportedEvents.indexOf(type) >= 0) {
        this.configure(type, true);
      }
      return val;
    };
    Database.prototype.removeListener = function(type) {
      const val = EventEmitter.prototype.removeListener.apply(this, arguments);
      if (supportedEvents.indexOf(type) >= 0 && !this._events[type]) {
        this.configure(type, false);
      }
      return val;
    };
    Database.prototype.removeAllListeners = function(type) {
      const val = EventEmitter.prototype.removeAllListeners.apply(this, arguments);
      if (supportedEvents.indexOf(type) >= 0) {
        this.configure(type, false);
      }
      return val;
    };
    sqlite3.verbose = function() {
      if (!isVerbose) {
        const trace = require_trace();
        ["prepare", "get", "run", "all", "each", "map", "close", "exec"].forEach(function(name) {
          trace.extendTrace(Database.prototype, name);
        });
        ["bind", "get", "run", "all", "each", "map", "reset", "finalize"].forEach(function(name) {
          trace.extendTrace(Statement.prototype, name);
        });
        isVerbose = true;
      }
      return sqlite3;
    };
  }
});
export default require_sqlite3();
//# sourceMappingURL=sqlite3.js.map
