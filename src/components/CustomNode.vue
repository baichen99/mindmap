<script setup>
import { Handle, Position, } from '@braks/vue-flow'
import { defineProps } from 'vue';

const props = defineProps({
    label: {
        type: String,
        default: ""
    },
    scale: {
        type: Number,
        default: 1
    }
})


</script>

<template>
    <div class="node">
        <div class="content">
            <div class="label">
                {{ props.label }}
            </div>
        </div>
        <Handle id="a" :position="Position.Left" class="bar" :is-connectable="props.connectable" />
        <Handle id="b" :position="Position.Right" class="bar" :is-connectable="props.connectable" />
    </div>
</template>

<style scoped>
.node {
    height: 100px;
    width: 170px;
    background: #eee;
    border-radius: 10px;
    border: 1px solid #000;
}

.content {
    height: 100px;
    width: 170px;
    display: flex;
    justify-content: center;
    align-items: center;
}
.label {
    font-size: 30px;
    font-family: 'Courier New', Courier, monospace;
    font-weight: 500;
    height: 30px;
}
.bar {
    height: 10px;
    width: 10px;
    background: blue;
    color: #fff;
    text-align: center;
    line-height: 20px;
    font-size: 20px;
    cursor: pointer;
}
</style>