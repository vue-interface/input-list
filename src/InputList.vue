<script lang="ts" setup>
import { ref } from 'vue';


const props = withDefaults(defineProps<{
    items?: any[]
}>(), {
    items: () => [null]
});

let items = ref(props.items);

function splice(start: number, deleteCount: number, ...args: any[]) {
    items.value.splice(start, length, ...args);
}
</script>

<template>
    <div class="input-list">
        <template v-if="items.length">
            <div
                v-for="(item, i) in items"
                :key="i"
                class="input-list-item">
                <slot
                    v-bind="{
                        add: (...args: any[]) => items.push(...args),
                        remove: () => items.splice(items.indexOf(item), 1),
                        item,
                        splice
                    }"
                    :index="i"
                    :is-odd="i % 2 === 1"
                    :is-even="i % 2 === 0"
                    :is-first-row="i === 0"
                    :is-last-row="i === items.length - 1" />
            </div>
        </template>
        <slot
            v-else
            name="fallback"
            v-bind="{
                add: (...args: any[]) => items.push(...args)
            }" />
    </div>
</template>