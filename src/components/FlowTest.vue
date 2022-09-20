<script setup>
import { ref, markRaw, onMounted } from 'vue'
import { VueFlow, Background, BackgroundVariant, useVueFlow, Controls, MiniMap } from '@braks/vue-flow'
import CustomNode from './CustomNode.vue'
import { getPosition } from '@/utils/position.js'
import { nodesToTree } from '@/utils/tree.js'
import { _nodes, _edges } from '@/utils/data.js'


const { onPaneContextMenu, addEdges, fitView, onPaneReady, onNodeDragStop, nodesDraggable } = useVueFlow()

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


const onConnect = (params) => {
    if (params?.targetHandle === "a" && params?.sourceHandle === "b") {
        addEdges([params], edges.value)
    }
}


const nodes = ref(_nodes)
const edges = ref(_edges)

// const nodes = ref([
//     {
//         id: "1",
//         label: "Node1",
//         type: "custom",
//         position: {x: 0, y: 0},
//     },
//     {
//         id: "2",
//         label: "Node",
//         type: "custom",
//         position: {x: 0, y: 0}
//     },
//     {
//         id: "3",
//         label: "Node",
//         type: "custom",
//         position: {x: 0, y: 0}
//     },
//     {
//         id: "4",
//         label: "Node",
//         type: "custom",
//         position: {x: 0, y: 0}
//     },
//     {
//         id: "5",
//         label: "Node",
//         type: "custom",
//         position: {x: 0, y: 0}
//     },
    
// ])
// const edges = ref([
//     {
//         id: "1-2",
//         source: "1",
//         target: "2",
//         sourceHandle: "b",
//         targetHandle: "a"
//     },
//     {
//         id: "1-3",
//         source: "1",
//         target: "3",
//         sourceHandle: "b",
//         targetHandle: "a"
//     },
//     {
//         id: "2-4",
//         source: "2",
//         target: "4",
//         sourceHandle: "b",
//         targetHandle: "a"
//     },
//     {
//         id: "2-5",
//         source: "2",
//         target: "5",
//         sourceHandle: "b",
//         targetHandle: "a"
//     },
// ])

// const nodeTree = computed(() => {
//     return nodesToTree(nodes.value, edges.value)
// })

const format = () => {
    const nodeTree = nodesToTree(nodes.value, edges.value)
    const newNodes = getPosition(nodeTree)
    nodes.value = newNodes
    fitView()
}
const changePos = () => {
    nodes.value.forEach((node) => {
        node.position = { 
            x: Math.random() * 400,
            y: Math.random() * 400,
        }
    })
}

</script>
<template>
    <VueFlow :nodes="nodes" :edges="edges"
            :node-types="nodeTypes"
            :fit-view-on-init="true"
            @connect="onConnect"
            :style="{border: '1px solid #000'}"
            >
            <Background :variant="BackgroundVariant.Dots"
                        pattern-color="#81818a" />
            <!-- <MiniMap /> -->
            <!-- <Controls /> -->
        <!-- 这里的props是node对象 -->
        <template #node-custom="props">
            <CustomNode v-bind="props" :label="props.label" >
            </CustomNode>
        </template>
    </VueFlow>
    <div class="control">
        <button @click="format">format</button>
        <button @click="changePos">change position</button>
    </div>
</template>
<style>

</style>