<script lang="ts">
import { defineComponent, DirectiveBinding } from 'vue';

const TAB = 9;

export default defineComponent({

    directives: {
        
        bindEvents: {

            inserted(el: any, binding: DirectiveBinding, vnode: any) {
                const children = Array.from(vnode.elm.children);

                children.forEach((child: any) => {
                    if(typeof child.value === 'undefined') {
                        child.querySelectorAll('input, textarea, select')
                            .forEach((input: any) => {
                                vnode.context.bindEvents(input, el);
                            });
                    }
                    else {
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
            default(el: any, parent: any) {
                return Array
                    .from(parent.querySelectorAll('input, textarea, select'))
                    .reduce((carry, input: any) => {
                        return !carry ? false : !!input.value;
                    }, true);
            }
        },

        validateEmpty: {
            type: Function,
            default(el: any, parent: any) {
                // If one item left in the list, it should not be removed.
                if(parent.parentElement.children.length === 1) {
                    return false;
                } 

                return Array
                    .from(parent.querySelectorAll('input, textarea, select'))
                    .reduce((carry, input: any) => {
                        return !carry ? false : !input.value;
                    }, true);
            }
        }

    },

    data() {
        return {  };
    },

    created() {
        if(!this.items.length) {
            this.items.push(this.newItem());
        }
    },

    methods: {

        indexOf(el: any) {
            return [...el.parentElement.children].indexOf(el);
        },

        isLastChild(el: any) {
            return this.indexOf(el) === el.parentElement.children.length - 1;
        },

        isFirstChild(el: any) {
            return this.indexOf(el) === 0;
        },

        bindEvents(input: any, parent: any) {
            this.bindBlurEvent(input, parent);
            this.bindKeydownEvent(input, parent);
        },

        bindBlurEvent(input: any, parent: any) {
            input.addEventListener('blur', () => {
                const i = this.indexOf(parent);

                if(!this.isLastChild(parent) && this.validateEmpty(input, parent)) {
                    this.items.splice(i, 1);
                }
            });
        },

        bindKeydownEvent(input: any, parent: any) {
            input.addEventListener('keydown', (e: any) => {
                // If the keycode is not a tab, or the shift key is held
                // then ignore the event.
                if(e.shiftKey || e.keyCode !== TAB) {
                    return false;
                }

                if(this.isLastChild(parent) && this.validate(input, parent)) {
                    this.items.push(this.newItem());
                }
            });
        }

    }

});
</script>

<template>
    <div class="input-list">
        <div
            v-for="(value, i) in items"
            :key="i"
            v-bind-events
            class="input-list-item">
            <slot
                :index="i"
                :is-odd="i % 2 === 1"
                :is-even="i % 2 === 0"
                :is-first-row="i === 0"
                :is-last-row="i === items.length - 1" />
        </div>
    </div>
</template>