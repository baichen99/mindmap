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
    selected: {
        type: Boolean,
    },
    data: {
        type: Object,
    }
})
const emits = defineEmits(['expand'])

const leafNodeStyle = computed(() => {
    if( props.data.childNum ) {
        return {
            "border-radius": '10px 0 0 10px'
        }
    } else {
        return {
            "border-radius": '10px 10px 10px 10px'
        }
    }
})

const onExpand = (id) => {
    console.log('expand', id);
    emits('expand', id)
}
</script>

<template>
    <div class="container"
        :class="{ 'selected': props.selected }"
        :style="{}"
        >
        <div class="node" :style="leafNodeStyle">         
            <div class="content">
                <div class="label">
                    {{ props.label }}
                </div>
            </div>
            <Handle id="a" :position="Position.Left" class="bar" :is-connectable="props.connectable" />
            <Handle id="b" :position="Position.Right" class="bar" :is-connectable="props.connectable" />
        </div>
        <div class="expand"
                @click="onExpand(props.id)"
                v-show="props.data.childNum!=0">
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

.container:hover {
    border: 2px solid red;
}

.selected {
    border: 2px solid red;
}
.node {
    background: #eee;
    min-width: 100px;
    max-width: 150px;
    height: inherit;
    padding: 10px 20px;
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
    border-radius: 0 8px 8px 0;
    display: flex;
    justify-content: center;
    align-items: center;
}

.expand:hover {
    background: #acb;
}

</style>