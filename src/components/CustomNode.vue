<script setup>
import { Handle, Position, } from '@braks/vue-flow'
import { defineProps, computed } from 'vue';

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


const scale = computed(() => {
    if ( props.level >= props.maxLevel ) {
        return 1 - (props.maxLevel - 1) * 0.15
    } else {
        return 1 - (props.level - 1) * 0.15
    }
}).value

const baseSize = 50

const nodeStyle = {
    width: baseSize * 1.7 * scale + 'px',
    height: baseSize * scale + 'px'
}

const labelStyle = {
    fontSize: baseSize * 0.3 * scale + 'px',
    fontWeight: 500,
    height: baseSize * 0.3 * scale + 'px',
}

</script>

<template>
    <div class="node" :style="nodeStyle">
        <div class="content">
            <div class="label" :style="labelStyle">
                {{ props.label }}
            </div>
        <div v-show="props.isExpand" class="expand" @click="$emit('expand', props)"></div>
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
    height: 3px;
    width: 3px;
    background: blue;
    color: #fff;
    text-align: center;
    line-height: 20px;
    font-size: 20px;
    cursor: pointer;
}
.expand {
    border-radius: 10px;
    background: aqua;
    height: 100%;
    width: 10%;
    position: absolute;
    right: 0;
    cursor: pointer;
}
</style>