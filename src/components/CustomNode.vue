<script setup>
import { Handle, Position, } from '@braks/vue-flow'
import { defineEmits, computed } from 'vue';

const props = defineProps({
    id: {
        type: String,
    },
    label: {
        type: String,
        default: ""
    },
    level: {
        type: Number,
        default: 1,
    },
    maxLevel: {
        type: Number,
        default: 3
    },
    isExpand: {
        type: Boolean,
        default: true
    }
})
const emits = defineEmits(['expand'])
const scale = computed(() => {
    if ( props.level >= props.maxLevel ) {
        return 1 - (props.maxLevel - 1) * 0.15
    } else {
        return 1 - (props.level - 1) * 0.15
    }
}).value

const baseSize = 50

const nodeStyle = {
    "min-width": baseSize * 2 * scale + 'px',
    // height: baseSize * scale + 'px',
    padding: baseSize * 0.5 + 'px' + ' ' + baseSize * 0.3 + 'px'
}

const labelStyle = {
    fontSize: baseSize * 0.3 * scale + 'px',
    fontWeight: 500,
    height: baseSize * 0.3 * scale + 'px',
}

</script>

<template>
    <div class="node" :style="nodeStyle" @dblclick="emits('expand', props.id)">
        <div class="content">
            <div class="label" :style="labelStyle">
                {{ props.label }}
            </div>
        </div>
        <Handle id="a" :position="Position.Left" class="bar" :is-connectable="props.connectable" />
        <Handle id="b" :position="Position.Right" class="bar" :is-connectable="props.connectable" />
    </div>
</template>

<style scoped>
.node {
    background: #eee;
    border-radius: 10px;
    border: 1px solid #000;
    cursor: pointer;
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
}
.bar {
    width: 1px;
    height: 1px;
}


</style>