var render = function() {
  var _vm = this;
  var _h = _vm.$createElement;
  var _c = _vm._self._c || _h;
  return _c("div", { staticClass: "input-list" }, [_vm._l(_vm.items, function(value, i) {
    return [_c("div", { directives: [{ name: "bind-events", rawName: "v-bind-events" }], key: i, staticClass: "input-list-item" }, [_vm._t("default", null, { "index": i, "isOdd": i % 2 === 1, "isEven": i % 2 === 0, "isFirstRow": i === 0, "isLastRow": i === _vm.items.length - 1 })], 2)];
  })], 2);
};
var staticRenderFns = [];
function normalizeComponent(scriptExports, render2, staticRenderFns2, functionalTemplate, injectStyles, scopeId, moduleIdentifier, shadowMode) {
  var options = typeof scriptExports === "function" ? scriptExports.options : scriptExports;
  if (render2) {
    options.render = render2;
    options.staticRenderFns = staticRenderFns2;
    options._compiled = true;
  }
  if (functionalTemplate) {
    options.functional = true;
  }
  if (scopeId) {
    options._scopeId = "data-v-" + scopeId;
  }
  var hook;
  if (moduleIdentifier) {
    hook = function(context) {
      context = context || this.$vnode && this.$vnode.ssrContext || this.parent && this.parent.$vnode && this.parent.$vnode.ssrContext;
      if (!context && typeof __VUE_SSR_CONTEXT__ !== "undefined") {
        context = __VUE_SSR_CONTEXT__;
      }
      if (injectStyles) {
        injectStyles.call(this, context);
      }
      if (context && context._registeredComponents) {
        context._registeredComponents.add(moduleIdentifier);
      }
    };
    options._ssrRegister = hook;
  } else if (injectStyles) {
    hook = shadowMode ? function() {
      injectStyles.call(this, (options.functional ? this.parent : this).$root.$options.shadowRoot);
    } : injectStyles;
  }
  if (hook) {
    if (options.functional) {
      options._injectStyles = hook;
      var originalRender = options.render;
      options.render = function renderWithStyleInjection(h, context) {
        hook.call(context);
        return originalRender(h, context);
      };
    } else {
      var existing = options.beforeCreate;
      options.beforeCreate = existing ? [].concat(existing, hook) : [hook];
    }
  }
  return {
    exports: scriptExports,
    options
  };
}
const TAB = 9;
const __vue2_script = {
  directives: {
    bindEvents: {
      inserted(el, binding, vnode) {
        const children = Array.from(vnode.elm.children);
        children.forEach((child) => {
          if (typeof child.value === "undefined") {
            child.querySelectorAll("input, textarea, select").forEach((input) => {
              vnode.context.bindEvents(input, el);
            });
          } else {
            vnode.context.bindEvents(child, el);
          }
        });
      }
    }
  },
  props: {
    items: {
      type: Array,
      default: () => []
    },
    newItem: {
      type: Function,
      default: () => ({})
    },
    total: {
      type: Number,
      default: 1
    },
    validate: {
      type: Function,
      default(el, parent) {
        return Array.from(parent.querySelectorAll("input, textarea, select")).reduce((carry, input) => {
          return !carry ? false : !!input.value;
        }, true);
      }
    },
    validateEmpty: {
      type: Function,
      default(el, parent) {
        Array.from(parent.querySelectorAll("input, textarea, select"));
        if (parent.parentElement.children.length === 1) {
          return false;
        }
        return Array.from(parent.querySelectorAll("input, textarea, select")).reduce((carry, input) => {
          return !carry ? false : !input.value;
        }, true);
      }
    }
  },
  data() {
    return {};
  },
  created() {
    if (!this.items.length) {
      this.items.push(this.newItem());
    }
  },
  methods: {
    indexOf(el) {
      return [...el.parentElement.children].indexOf(el);
    },
    isLastChild(el) {
      return this.indexOf(el) === el.parentElement.children.length - 1;
    },
    isFirstChild(el) {
      return this.indexOf(el) === 0;
    },
    bindEvents(input, parent) {
      this.bindBlurEvent(input, parent);
      this.bindKeydownEvent(input, parent);
    },
    bindBlurEvent(input, parent) {
      input.addEventListener("blur", (e) => {
        const i = this.indexOf(parent);
        if (!this.isLastChild(parent) && this.validateEmpty(input, parent)) {
          this.items.splice(i, 1);
        }
      });
    },
    bindKeydownEvent(input, parent) {
      input.addEventListener("keydown", (e) => {
        this.indexOf(parent);
        Array.from(parent.querySelectorAll("input, select, textarea"));
        if (e.shiftKey || e.keyCode !== TAB) {
          return false;
        }
        if (this.isLastChild(parent) && this.validate(input, parent)) {
          this.items.push(this.newItem());
        }
      });
    }
  }
};
const __cssModules = {};
var __component__ = /* @__PURE__ */ normalizeComponent(__vue2_script, render, staticRenderFns, false, __vue2_injectStyles, null, null, null);
function __vue2_injectStyles(context) {
  for (let o in __cssModules) {
    this[o] = __cssModules[o];
  }
}
var InputList = /* @__PURE__ */ function() {
  return __component__.exports;
}();
export { InputList };
