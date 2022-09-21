<script setup>
import { ref, markRaw, onMounted } from 'vue'
import { VueFlow, Background, BackgroundVariant, useVueFlow, Controls } from '@braks/vue-flow'
import CustomNode from './CustomNode.vue'
import DataEditor from './DataEditor.vue'
import { getPosition } from '@/utils/position.js'
import { nodesToTree } from '@/utils/tree.js'
import { _nodes, _edges } from '@/utils/data.js'


const { onPaneContextMenu, addEdges, fitView, onPaneReady, onNodeClick, nodesDraggable, getNode, nodes, edges } = useVueFlow({
    nodes: _nodes,
    edges: _edges
})

const opts = {
    nodesDraggable: false,
}

onMounted(() => {
    nodesDraggable.value = opts.nodesDraggable
})

const nodeTypes = {
    custom: markRaw(CustomNode)
}


onPaneContextMenu((e) =>{
    e.preventDefault()
    console.log(e.x, e.y);
})

onPaneReady(() => {
    format()
})

let selectedNode = ref({})

onNodeClick(({ event, node, edges }) => {
    console.log("node clickd!", node);
    selectedNode.value = getNode.value(node.id)
    console.log("selectedNode", selectedNode);
})

const onConnect = (params) => {
    if (params?.targetHandle === "a" && params?.sourceHandle === "b") {
        addEdges([params], edges.value)
    }
}


// const nodes = ref(_nodes)
// const edges = ref(_edges)

// const nodeTree = computed(() => {
//     return nodesToTree(nodes.value, edges.value)
// })

const format = () => {
    const nodeTree = nodesToTree(nodes.value, edges.value)
    const newNodes = getPosition(nodeTree)
    // 得到的newNodes有问题
    log(newNodes)
    nodes.value = newNodes
    fitView()
}
const changePos = () => {
    nodes.value.forEach((node) => {
        node.position.x = Math.random() * 4000
        node.position.y = Math.random() * 4000
    })
}

const handleExpand = (node) => {
    console.log("expand", node);
}

const log = (item) => {
    console.log(item);
}

</script>
<template>
    <VueFlow :nodes="nodes" :edges="edges"
            :node-types="nodeTypes"
            :fit-view-on-init="true"
            @connect="onConnect"
            :min-zoom="0.4"
            :style="{border: '1px solid #000'}"
            >
            <Background :variant="BackgroundVariant.Dots"
                        pattern-color="#81818a" />
            <Controls />
        <!-- 这里的props是node对象 -->
        <template #node-custom="props">
            <CustomNode v-bind="props" :id="props.id" @expand="handleExpand">
            </CustomNode>
        </template>
    </VueFlow>
    <div class="control">
        <button @click="format">format</button>
        <button @click="changePos">change position</button>
        <button @click="log(nodes)">log nodes</button>
        <button @click="log(selectedNode)">log selectedNode</button>
        <DataEditor v-model:node="selectedNode" />
    </div>
</template>
<style>

</style>