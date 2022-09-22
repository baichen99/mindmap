<script setup>
import { Handle, Position, } from '@braks/vue-flow'
import { computed } from 'vue';

const props = defineProps({
    id: {
        type: String,
    },
    label: {
        type: String,
        default: ""
    },
    isSelected: {
        type: Boolean,
        default: false
    },
    data: {
        type: Object,
    }
})
const emits = defineEmits(['expand'])
</script>

<template>
    <div class="container">
        <div class="node"  :class="{ selected: props.isSelected }">
            <div class="content">
                <div class="label">
                    {{ props.label }}
                </div>
            </div>
            <Handle id="a" :position="Position.Left" class="bar" :is-connectable="props.connectable" />
            <Handle id="b" :position="Position.Right" class="bar" :is-connectable="props.connectable" />
        </div>
        <div class="expand" @click="emits('expand', props.id)">
            <div class="label">
                {{ props.data.childNum }}
            </div>
        </div>
    </div>

</template>

<style scoped>
.container {
    display: flex;
    cursor: pointer;
    transition-property: border;
    transition-duration: 0.2s;
    transition-timing-function: ease-in-out;
    border: 2px solid #000;
    border-radius: 10px;

}

.container:hover, .selected {
    border: 2px solid red;
}
.node {
    background: #eee;
    min-width: 100px;
    max-width: 150px;
    height: inherit;
    padding: 10px 20px;
    border-radius: 10px 0 0 10px;
}

.content {
    height: inherit;
    width: inherit;
    display: flex;
    justify-content: center;
    align-items: center;
}
.label {
    font-family: 'Courier New', Courier, monospace;
    font-size: 26px;
    font-weight: 600;
    text-align: center;
}
.bar {
    width: 1px;
    height: 1px;
}

.expand {
    height: inherit;
    border-left: none;
    width: 50px;
    background: #abc;
    border-radius: 0 10px 10px 0;
    display: flex;
    justify-content: center;
    align-items: center;
}

</style>