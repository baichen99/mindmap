<script setup>
import { defineProps, watchEffect, defineEmits, ref, computed } from 'vue'

const emits = defineEmits(['update:node'])
const props = defineProps({
    node: {
        type: Object,
        default: () => ({})
    }
})
const _node = ref(props.node)

watchEffect(() => {
    _node.value = props.node
})

const updateData = (value) => {
    emits('update:node', value)
}

const childrenID = computed(() => {
    const IDs = []
    if (_node.value.children) {
        _node.value.children.forEach(child => IDs.push(child.id))
        return IDs
    } else {
        return []
    }
})
</script>

<template>
    <div class="container">
        <div class="field">
            <div class="label">label</div>
            <input type="text" v-model="_node.label" @input="updateData(_node)">
        </div>
        <div class="field">
            <div class="label">id</div>
            <input type="text" v-model="_node.id" disabled>
        </div>
        <div class="field">
            <div class="label">children</div>
            <input type="text" v-model="childrenID" disabled>
        </div>

        <div class="field" v-for="(value, key) of _node.data" :key="key">
            <div class="label">{{ key }}</div>
            <div style="text-align: center; width: 100px;border: 1px solid #000;">{{ value }}</div>
        </div>
        <!-- {{ _node.data }} -->
    </div>
</template>

<style scoped>
.container {
    width: 300px;
    min-height: 200px;
    border: 1px solid #000;
}

.field {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
}

/* .field > input {
    font: ;
} */
</style>