(function(n,e){typeof exports=="object"&&typeof module<"u"?e(exports,require("vue")):typeof define=="function"&&define.amd?define(["exports","vue"],e):(n=typeof globalThis<"u"?globalThis:n||self,e(n.InputList={},n.Vue))})(this,function(n,e){"use strict";const i={class:"input-list"},r=e.defineComponent({__name:"InputList",props:{items:{default:()=>[null]}},setup(d){const p=d;let t=e.ref(p.items);function a(o,c,...s){t.value.splice(o,length,...s)}return(o,c)=>(e.openBlock(),e.createElementBlock("div",i,[t.value.length?(e.openBlock(!0),e.createElementBlock(e.Fragment,{key:0},e.renderList(t.value,(s,l)=>(e.openBlock(),e.createElementBlock("div",{key:l,class:"input-list-item"},[e.renderSlot(o.$slots,"default",e.mergeProps({add:(...u)=>t.value.push(...u),remove:()=>t.value.splice(t.value.indexOf(s),1),item:s,splice:a},{index:l,isOdd:l%2===1,isEven:l%2===0,isFirstRow:l===0,isLastRow:l===t.value.length-1}))]))),128)):e.renderSlot(o.$slots,"fallback",e.normalizeProps(e.mergeProps({key:1},{add:(...s)=>t.value.push(...s)})))]))}});n.InputList=r,Object.defineProperty(n,Symbol.toStringTag,{value:"Module"})});
//# sourceMappingURL=input-list.umd.cjs.map