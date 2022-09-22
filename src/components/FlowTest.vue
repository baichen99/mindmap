<script setup>
import { ref, markRaw, onMounted, computed } from 'vue'
import { VueFlow, Background, BackgroundVariant, useVueFlow, Controls, MiniMap } from '@braks/vue-flow'
import CustomNode from './CustomNode.vue'
import DataEditor from './DataEditor.vue'
import { getPosition } from '@/utils/position.js'
import { nodesToTree } from '@/utils/tree.js'
import { _nodes, _edges } from '@/utils/data.js'


const { onPaneContextMenu, addEdges, fitView, onPaneReady, onNodeClick, nodesDraggable, getNode, nodes, edges, onUpdateNodeInternals } = useVueFlow({
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


const getAllChildrenID = (nodeID) => {
    const node = getNode.value(nodeID)
    let childrenID = []
    if (node === null) return

    let queue = node.children.map(child => child.id)
    while (queue.length) {
        const _curNodeID = queue.shift()
        const _curNode = getNode.value(_curNodeID)
        childrenID.push(_curNode.id)
        if (_curNode.children.length) {
            queue = queue.concat(_curNode.children.map(child => child.id))
        }
    }
    return childrenID
}

const hideChildren = (nodeID) => {
    const childrenID = getAllChildrenID(nodeID)
    for (let id of childrenID) {
        const node = getNode.value(id)
        node.hidden = true
    }
}

const showChildren = (nodeID) => {
    const childrenID = getAllChildrenID(nodeID)
    for (let id of childrenID) {
        const node = getNode.value(id)
        node.hidden = false
    }
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
    console.log("selectedNode", selectedNode)
})

const handleHideShow = (nodeID) => {
    const node = getNode.value(nodeID)
    if (node.hideChildren) {
        node.hideChildren = false
        showChildren(nodeID)
    } else {
        node.hideChildren = true
        hideChildren(nodeID)
    }
    const nodeTree = nodesToTree(nodes.value, edges.value)
    const newNodes = getPosition(nodeTree)
    nodes.value = newNodes
    // fitView()
}

const onConnect = (params) => {
    if (params?.targetHandle === "a" && params?.sourceHandle === "b") {
        addEdges([params], edges.value)
    }
}

const format = () => {
    const nodeTree = nodesToTree(nodes.value, edges.value)
    const newNodes = getPosition(nodeTree)
    nodes.value = newNodes
    fitView()
}
const changePos = () => {
    nodes.value.forEach((node) => {
        node.position = {
            x: Math.random() * 4000,
            y: Math.random() * 4000
        }
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
            <MiniMap />
        <!-- 这里的props是node对象 -->
        <template #node-custom="props">
            <CustomNode v-bind="props" :id="props.id" @expand="handleExpand" :isSelected="selectedNode.id == props.id">
            </CustomNode>
        </template>
    </VueFlow>
    <div class="control">
        <button @click="format">format</button>
        <button @click="changePos">change position</button>
        <button @click="log(nodes)">log nodes</button>
        <button @click="log(selectedNode)">log selectedNode</button>
        <button @click="handleHideShow(selectedNode.id)">hide/show</button>
        <DataEditor v-model:node="selectedNode" />
    </div>
</template>
<style>

</style>