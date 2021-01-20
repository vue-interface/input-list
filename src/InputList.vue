<template>
    <div class="input-list">
        <template v-for="(value, i) in items">
            <div :key="i" v-bind-events class="input-list-item">
                <slot
                    :index="i"
                    :is-odd="i % 2 === 1"
                    :is-even="i % 2 === 0"
                    :is-first-row="i === 0"
                    :is-last-row="i === items.length - 1" />
            </div>
        </template>
    </div>
</template>

<script>
import { isUndefined } from '@vue-interface/utils';

const TAB = 9;

export default {

    directives: {
        
        bindEvents: {

            inserted(el, binding, vnode) {
                const children = Array.from(vnode.elm.children);

                children.forEach((child) => {
                    if(isUndefined(child.value)) {
                        child.querySelectorAll('input, textarea, select')
                            .forEach(input => {
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
            default(el, parent) {
                return Array
                    .from(parent.querySelectorAll('input, textarea, select'))
                    .reduce((carry, input) => {
                        return !carry ? false : !!input.value;
                    }, true);
            }
        },

        validateEmpty: {
            type: Function,
            default(el, parent) {
                const nodes = Array.from(parent.querySelectorAll('input, textarea, select'));
                
                // If one item left in the list, it should not be removed.
                if(parent.parentElement.children.length === 1) {
                    return false;
                } 

                return Array
                    .from(parent.querySelectorAll('input, textarea, select'))
                    .reduce((carry, input) => {
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
            input.addEventListener('blur', e => {
                const i = this.indexOf(parent);

                if(!this.isLastChild(parent) && this.validateEmpty(input, parent)) {
                    /*
                    setTimeout(() => {
                        console.log(inputdocument.activeElement);
                    });
                    */
                    
                    this.items.splice(i, 1);
                }
            });
        },

        bindKeydownEvent(input, parent) {
            input.addEventListener('keydown', e => {
                const i = this.indexOf(parent), nodes = Array.from(parent.querySelectorAll('input, select, textarea'));

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

};
</script>