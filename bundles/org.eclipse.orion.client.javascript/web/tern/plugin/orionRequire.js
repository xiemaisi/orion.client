/*******************************************************************************
 * @license
 * Copyright (c) 2015 Marijn Haverbeke and others.
 * All rights reserved. This program and the accompanying materials are made 
 * available under the terms of the Eclipse Public License v1.0 
 * (http://www.eclipse.org/legal/epl-v10.html), and the Eclipse Distribution 
 * License v1.0 (http://www.eclipse.org/org/documents/edl-v10.html). 
 *
 * Contributors:
 *     IBM Corporation - Allow original requirejs plugin to find files in Orion workspace
 *******************************************************************************/
/* eslint-disable missing-nls */
/*eslint-env node, amd*/
/*globals tern tern*/
(function(mod) {
  if (typeof exports === "object" && typeof module === "object") // CommonJS
    return mod(require("../lib/infer"), require("../lib/tern"));
  if (typeof define === "function" && define.amd) // AMD
    return define(["../lib/infer", "../lib/tern", "./resolver"], mod);
  mod(tern, tern);
})(function(infer, tern, resolver) {
  "use strict";

  //ORION
  function addInterfaceDep(inter, deps) {
  	if(inter) {
    	deps.push(inter);
    } else {
    	deps.push(infer.ANull);
    }
  }

  var EXPORT_OBJ_WEIGHT = 50;

  function getExports(data) {
    var exports = new infer.Obj(true, "exports");
    var mod = getModule(stripJSExt(data.currentFile), data);
    if(mod) {
    	mod.addType(exports, EXPORT_OBJ_WEIGHT);
    }
    return exports;
  }

  function getInterface(name, data) {
    if (data.options.override && Object.prototype.hasOwnProperty.call(data.options.override, name)) {
      var over = data.options.override[name];
      if (typeof over === "string" && over.charAt(0) === "=") return infer.def.parsePath(over.slice(1));
      if (typeof over === "object") {
        var known = getKnownModule(name, data);
        if (known) return known;
        var scope = data.interfaces[stripJSExt(name)] = new infer.Obj(null, stripJSExt(name));
        infer.def.load(over, scope);
        return scope;
      }
      name = over;
    }
    known = getModule(name, data);
    if (known) {
      data.server.addFile(known.origin, null, data.currentFile);
    }
    return known;
  }

  function getKnownModule(name, data) {
    var val = resolver.getResolved(name); //ORION
  	if(val && val.file) {
    	return data.interfaces[stripJSExt(val.file)];
    }
    return null;
  }

  function getModule(name, data) {
    var known = getKnownModule(name, data);
    if (!known) {
      var val = resolver.getResolved(name); //ORION
      if(val && val.file) {
	      known = data.interfaces[stripJSExt(val.file)] = new infer.AVal;
	      known.origin = val.file;
      }
    }
    return known;
  }

  function getRequire(data) {
    if (!data.require) {
      data.require = new infer.Fn("require", infer.ANull, [infer.cx().str], ["module"], new infer.AVal);
      data.require.computeRet = /* @callback */ function(_self, _args, argNodes) {
        if (argNodes.length && argNodes[0].type === "Literal" && typeof argNodes[0].value === "string") {
          var _i = getInterface(argNodes[0].value, data); //ORION
          if(_i) {
          	return _i;
          }
        }
        return infer.ANull;
      };
    }
    return data.require;
  }

  function getModuleInterface(data, exports) {
    var mod = new infer.Obj(infer.cx().definitions.requirejs.module, "module");
    var expProp = mod.defProp("exports");
    var _m = getModule(stripJSExt(data.currentFile), data);
    if(_m) {
 	   expProp.propagate(_m);
	}
    exports.propagate(expProp, EXPORT_OBJ_WEIGHT);
    return mod;
  }

  function stripJSExt(f) {
    return f.replace(/\.js$/, '');
  }

  infer.registerFunction("requireJS", /* @callback */ function(_self, args, argNodes) {
    var server = infer.cx().parent, data = server && server._requireJS;
    if (!data || !args.length) return infer.ANull;

    var name = data.currentFile;
    var out = data.interfaces[stripJSExt(name)] = new infer.AVal;
    out.origin = name;

    var deps = [], fn, exports, mod;

    function interf(name) {
      if (name === "require") return getRequire(data);
      if (name === "exports") return exports || (exports = getExports(data));
      if (name === "module") return mod || (mod = getModuleInterface(data, exports || (exports = getExports(data))));
      return getInterface(name, data);
    }

    if (argNodes && args.length > 1) {
      var node = argNodes[args.length === 2 ? 0 : 1];
      if (node.type === "Literal" && typeof node.value === "string") {
        addInterfaceDep(interf(node.value), deps); //ORION
      } else if (node.type === "ArrayExpression") for (var i = 0; i < node.elements.length; ++i) {
        var elt = node.elements[i];
        if (elt.type === "Literal" && typeof elt.value === "string") {
            addInterfaceDep(interf(elt.value), deps); //ORION
        }
      }
    } else if (argNodes && args.length === 1 && argNodes[0].type === "FunctionExpression" && argNodes[0].params.length) {
      // Simplified CommonJS call
        addInterfaceDep(interf("require", data), deps); //ORION
        addInterfaceDep(interf("exports", data), deps); //ORION
        addInterfaceDep(interf("module", data), deps); //ORION
      fn = args[0];
    }

    if (!fn) {
      fn = args[Math.min(args.length - 1, 2)];
      if (!fn.isEmpty() && !fn.getFunctionType()) fn = null;
    }

    if (fn) fn.propagate(new infer.IsCallee(infer.ANull, deps, null, out));
    else if (args.length) args[0].propagate(out);

    return infer.ANull;
  });

  // Parse simple ObjectExpression AST nodes to their corresponding JavaScript objects.
  function parseExprNode(node) {
    switch (node.type) {
    case "ArrayExpression":
      return node.elements.map(parseExprNode);
    case "Literal":
      return node.value;
    case "ObjectExpression":
      var obj = {};
      node.properties.forEach(function(prop) {
        var key = prop.key.name || prop.key.value;
        obj[key] = parseExprNode(prop.value);
      });
      return obj;
    }
  }

  infer.registerFunction("requireJSConfig", /* @callback */ function(_self, _args, argNodes) {
    var server = infer.cx().parent, data = server && server._requireJS;
    if (data && argNodes && argNodes.length && argNodes[0].type === "ObjectExpression") {
      var config = parseExprNode(argNodes[0]);
      for (var key in config) if (config.hasOwnProperty(key)) {
        var value = config[key], exists = data.options[key];
        if (!exists) {
          data.options[key] = value;
        } else if (key === "paths") {
          for (var path in value) if (value.hasOwnProperty(path) && !data.options.paths[path])
            data.options.paths[path] = value[path];
        }
      }
    }
    return infer.ANull;
  });

  function preCondenseReach(state) {
    var interfaces = infer.cx().parent._requireJS.interfaces;
    var rjs = state.roots["!requirejs"] = new infer.Obj(null);
    for (var name in interfaces) {
      var prop = rjs.defProp(name.replace(/\./g, "`"));
      interfaces[name].propagate(prop);
      prop.origin = interfaces[name].origin;
    }
  }

  function postLoadDef(data) {
    var cx = infer.cx(), interfaces = cx.definitions[data["!name"]]["!requirejs"];
    var data = cx.parent._requireJS;
    if (interfaces) for (var name in interfaces.props) {
      interfaces.props[name].propagate(getInterface(name, data));
    }
  }

  tern.registerPlugin("orionRequire", function(server, options) {
    server._requireJS = {
      interfaces: Object.create(null),
      options: options || {},
      currentFile: null,
      server: server
    };

    server.on("beforeLoad", function(file) {
      this._requireJS.currentFile = file.name;
    });
    server.on("reset", function() {
      this._requireJS.interfaces = Object.create(null);
      this._requireJS.require = null;
    });
    return {
      defs: defs,
      passes: {
        preCondenseReach: preCondenseReach,
        postLoadDef: postLoadDef,
        /**
		 * @callback
		 */
		postParse: function postParse(ast, text) {
			resolver.doPostParse(server, ast);
		},
		/**
		 * @callback
		 */
		preInfer: function preInfer(ast, scope) {
			resolver.doPreInfer(server);
		}
      }
    };
  });

  var defs = {
    "!name": "requirejs",
    "!define": {
      module: {
        id: "string",
        uri: "string",
        config: "fn() -> ?"
      },
      config: {
        "!url": "http://requirejs.org/docs/api.html#config",
        baseUrl: {
          "!type": "string",
          "!doc": "the root path to use for all module lookups",
          "!url": "http://requirejs.org/docs/api.html#config-baseUrl"
        },
        paths: {
          "!type": "?",
          "!doc": "path mappings for module names not found directly under baseUrl. The path settings are assumed to be relative to baseUrl, unless the paths setting starts with a '/' or has a URL protocol in it ('like http:').",
          "!url": "http://requirejs.org/docs/api.html#config-paths"
        },
        shim: {
          "!type": "?",
          "!doc": "Configure the dependencies, exports, and custom initialization for older, traditional 'browser globals' scripts that do not use define() to declare the dependencies and set a module value.",
          "!url": "http://requirejs.org/docs/api.html#config-shim"
        },
        map: {
          "!type": "?",
          "!doc": "For the given module prefix, instead of loading the module with the given ID, substitute a different module ID.",
          "!url": "http://requirejs.org/docs/api.html#config-map"
        },
        config: {
          "!type": "?",
          "!doc": "There is a common need to pass configuration info to a module. That configuration info is usually known as part of the application, and there needs to be a way to pass that down to a module. In RequireJS, that is done with the config option for requirejs.config(). Modules can then read that info by asking for the special dependency 'module' and calling module.config().",
          "!url": "http://requirejs.org/docs/api.html#config-moduleconfig"
        },
        packages: {
          "!type": "?",
          "!doc": "configures loading modules from CommonJS packages. See the packages topic for more information.",
          "!url": "http://requirejs.org/docs/api.html#config-packages"
        },
        nodeIdCompat: {
          "!type": "?",
          "!doc": "Node treats module ID example.js and example the same. By default these are two different IDs in RequireJS. If you end up using modules installed from npm, then you may need to set this config value to true to avoid resolution issues.",
          "!url": "http://requirejs.org/docs/api.html#config-nodeIdCompat"
        },
        waitSeconds: {
          "!type": "number",
          "!doc": "The number of seconds to wait before giving up on loading a script. Setting it to 0 disables the timeout. The default is 7 seconds.",
          "!url": "http://requirejs.org/docs/api.html#config-waitSeconds"
        },
        context: {
          "!type": "number",
          "!doc": "A name to give to a loading context. This allows require.js to load multiple versions of modules in a page, as long as each top-level require call specifies a unique context string. To use it correctly, see the Multiversion Support section.",
          "!url": "http://requirejs.org/docs/api.html#config-context"
        },
        deps: {
          "!type": "?",
          "!doc": "An array of dependencies to load. Useful when require is defined as a config object before require.js is loaded, and you want to specify dependencies to load as soon as require() is defined. Using deps is just like doing a require([]) call, but done as soon as the loader has processed the configuration. It does not block any other require() calls from starting their requests for modules, it is just a way to specify some modules to load asynchronously as part of a config block.",
          "!url": "http://requirejs.org/docs/api.html#config-deps"
        },
        callback: {
          "!type": "fn()",
          "!doc": "A function to execute after deps have been loaded. Useful when require is defined as a config object before require.js is loaded, and you want to specify a function to require after the configuration's deps array has been loaded.",
          "!url": "http://requirejs.org/docs/api.html#config-callback"
        },
        enforceDefine: {
          "!type": "bool",
          "!doc": "If set to true, an error will be thrown if a script loads that does not call define() or have a shim exports string value that can be checked. See Catching load failures in IE for more information.",
          "!url": "http://requirejs.org/docs/api.html#config-enforceDefine"
        },
        xhtml: {
          "!type": "bool",
          "!doc": "If set to true, document.createElementNS() will be used to create script elements.",
          "!url": "http://requirejs.org/docs/api.html#config-xhtml"
        },
        urlArgs: {
          "!type": "string",
          "!doc": "Extra query string arguments appended to URLs that RequireJS uses to fetch resources. Most useful to cache bust when the browser or server is not configured correctly.",
          "!url": "http://requirejs.org/docs/api.html#config-urlArgs"
        },
        scriptType: {
          "!type": "string",
          "!doc": "Specify the value for the type='' attribute used for script tags inserted into the document by RequireJS. Default is 'text/javascript'. To use Firefox's JavaScript 1.8 features, use 'text/javascript;version=1.8'.",
          "!url": "http://requirejs.org/docs/api.html#config-scriptType"
        },
        skipDataMain: {
          "!type": "bool",
          "!doc": "Introduced in RequireJS 2.1.9: If set to true, skips the data-main attribute scanning done to start module loading. Useful if RequireJS is embedded in a utility library that may interact with other RequireJS library on the page, and the embedded version should not do data-main loading.",
          "!url": "http://requirejs.org/docs/api.html#config-skipDataMain"
        }
      }
    },
    requirejs: {
      "!type": "fn(deps: [string], callback: fn(), errback: fn()) -> !custom:requireJS",
      onError: {
        "!type": "fn(err: +Error)",
        "!doc": "To detect errors that are not caught by local errbacks, you can override requirejs.onError()",
        "!url": "http://requirejs.org/docs/api.html#requirejsonerror"
      },
      load: {
        "!type": "fn(context: ?, moduleName: string, url: string)"
      },
      config: "fn(config: config) -> !custom:requireJSConfig",
      version: "string",
      isBrowser: "bool"
    },
    require: "requirejs",
    define: {
      "!type": "fn(deps: [string], callback: fn()) -> !custom:requireJS",
      amd: {
        jQuery: "bool"
      }
    }
  };
});
