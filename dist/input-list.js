import { defineComponent as u, resolveDirective as c, openBlock as l, createElementBlock as d, Fragment as f, renderList as h, withDirectives as m, renderSlot as v } from "vue";
const p = 9, y = u({
  directives: {
    bindEvents: {
      inserted(e, t, n) {
        Array.from(n.elm.children).forEach((r) => {
          typeof r.value > "u" ? r.querySelectorAll("input, textarea, select").forEach((a) => {
            n.context.bindEvents(a, e);
          }) : n.context.bindEvents(r, e);
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
      default(e, t) {
        return Array.from(t.querySelectorAll("input, textarea, select")).reduce((n, i) => n ? !!i.value : !1, !0);
      }
    },
    validateEmpty: {
      type: Function,
      default(e, t) {
        return t.parentElement.children.length === 1 ? !1 : Array.from(t.querySelectorAll("input, textarea, select")).reduce((n, i) => n ? !i.value : !1, !0);
      }
    }
  },
  data() {
    return {};
  },
  created() {
    this.items.length || this.items.push(this.newItem());
  },
  methods: {
    indexOf(e) {
      return [...e.parentElement.children].indexOf(e);
    },
    isLastChild(e) {
      return this.indexOf(e) === e.parentElement.children.length - 1;
    },
    isFirstChild(e) {
      return this.indexOf(e) === 0;
    },
    bindEvents(e, t) {
      this.bindBlurEvent(e, t), this.bindKeydownEvent(e, t);
    },
    bindBlurEvent(e, t) {
      e.addEventListener("blur", () => {
        const n = this.indexOf(t);
        !this.isLastChild(t) && this.validateEmpty(e, t) && this.items.splice(n, 1);
      });
    },
    bindKeydownEvent(e, t) {
      e.addEventListener("keydown", (n) => {
        if (n.shiftKey || n.keyCode !== p)
          return !1;
        this.isLastChild(t) && this.validate(e, t) && this.items.push(this.newItem());
      });
    }
  }
}), E = (e, t) => {
  const n = e.__vccOpts || e;
  for (const [i, r] of t)
    n[i] = r;
  return n;
}, b = { class: "input-list" };
function _(e, t, n, i, r, a) {
  const o = c("bind-events");
  return l(), d("div", b, [
    (l(!0), d(f, null, h(e.items, (x, s) => m((l(), d("div", {
      key: s,
      class: "input-list-item"
    }, [
      v(e.$slots, "default", {
        index: s,
        isOdd: s % 2 === 1,
        isEven: s % 2 === 0,
        isFirstRow: s === 0,
        isLastRow: s === e.items.length - 1
      })
    ])), [
      [o]
    ])), 128))
  ]);
}
const A = /* @__PURE__ */ E(y, [["render", _]]);
export {
  A as InputList
};
