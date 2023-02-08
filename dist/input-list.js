import { defineComponent as c, ref as m, openBlock as n, createElementBlock as o, Fragment as v, renderList as f, renderSlot as r, mergeProps as a, normalizeProps as h } from "vue";
const k = { class: "input-list" }, L = /* @__PURE__ */ c({
  __name: "InputList",
  props: {
    items: { default: () => [null] }
  },
  setup(u) {
    let e = m(u.items);
    function i(l, p, ...t) {
      e.value.splice(l, length, ...t);
    }
    return (l, p) => (n(), o("div", k, [
      e.value.length ? (n(!0), o(v, { key: 0 }, f(e.value, (t, s) => (n(), o("div", {
        key: s,
        class: "input-list-item"
      }, [
        r(l.$slots, "default", a({
          add: (...d) => e.value.push(...d),
          remove: () => e.value.splice(e.value.indexOf(t), 1),
          item: t,
          splice: i
        }, {
          index: s,
          isOdd: s % 2 === 1,
          isEven: s % 2 === 0,
          isFirstRow: s === 0,
          isLastRow: s === e.value.length - 1
        }))
      ]))), 128)) : r(l.$slots, "fallback", h(a({ key: 1 }, {
        add: (...t) => e.value.push(...t)
      })))
    ]));
  }
});
export {
  L as InputList
};
//# sourceMappingURL=input-list.js.map
