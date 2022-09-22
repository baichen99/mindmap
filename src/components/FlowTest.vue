<script setup>
import { ref, markRaw, onMounted, computed, watch, watchEffect } from 'vue'
import { VueFlow, Background, BackgroundVariant, useVueFlow, Controls  } from '@braks/vue-flow'
import CustomNode from './CustomNode.vue'
import DataEditor from './DataEditor.vue'
import { getPosition } from '@/utils/position.js'
import { nodesToTree, findRoot } from '@/utils/tree.js'
import { _nodes, _edges } from '@/utils/data.js'


const { onPaneContextMenu, addEdges, fitView, onPaneReady, onNodeClick, nodesDraggable, getNode, nodes, edges } = useVueFlow({
    nodes: _nodes,
    edges: _edges
})

const opts = ref({
    nodesDraggable: false,
    edgeType: ''
})

watchEffect(() => {
    console.log('change edge type')
    for (const edge of edges.value) {
        edge.type = opts.value.edgeType
    }
})

onMounted(() => {
    nodesDraggable.value = opts.value.nodesDraggable

})

const nodeTypes = {
    custom: markRaw(CustomNode)
}

const getMeta = () => {
    // get children num
    for (const node of nodes.value) {
        node.data.childNum = node.children.length
    }
    // cal depth
    const root = findRoot(nodes.value)
    function traverse(node, depth=1) {
        if (!node) return
        node.data.depth = depth
        node.children.forEach(child => traverse(child, depth + 1))
    }
    traverse(root)
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
})

const updatePos = () => {
    const nodeTree = nodesToTree(nodes.value, edges.value)
    const newNodes = getPosition(nodeTree)
    nodes.value = newNodes
}

const hideNDepth = (depth) => {
    for (const node of nodes.value) {
        if (node.data.depth == depth) {
            handleHideShow(node.id)
        }
    }
    updatePos()
}

onPaneReady(() => {
    format()
    getMeta()
})

let selectedNode = ref({})

onNodeClick(({ event, node, edges }) => {
    selectedNode.value = getNode.value(node.id)
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
    updatePos()
    // fitView()
}

const onConnect = (params) => {
    if (params?.targetHandle === "a" && params?.sourceHandle === "b") {
        addEdges([params], edges.value)
    }
}

const format = () => {
    updatePos()
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
        <!-- 这里的props是自定义node对象的props参数 -->
        <template #node-custom="props">
            <CustomNode v-bind="props"
                        :id="props.id"
                        :isSelected="selectedNode.id == props.id"
                        :data="props.data"
                        >
            </CustomNode>
        </template>
    </VueFlow>

    <div class="control">
        <button @click="format">format</button>
        <button @click="changePos">change position</button>
        <button @click="log(nodes)">log nodes</button>
        <button @click="log(edges)">log edges</button>
        <button @click="log(selectedNode)">log selectedNode</button>
        <button @click="handleHideShow(selectedNode.id)">hide/show</button>
        <button @click="hideNDepth(3)">hide 3 child</button>
        <select v-model="opts.edgeType">
            <option value="step">阶梯</option>
            <option value="smoothstep">带弧度阶梯</option>
            <option value="">贝塞尔曲线</option>
            <option value="straight">直线</option>
        </select>
        <DataEditor v-model:node="selectedNode" />
    </div>
</template>
<style>

</style>