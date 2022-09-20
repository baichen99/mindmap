import { cloneDeep } from 'lodash-es'

export function nodesToTree(_nodes, _edges) {
    const id2node = {}
    const nodes = cloneDeep(_nodes)
    for (const node of nodes) {
        node.children = []
        id2node[node.id] = node
    }
    for (const _edge of _edges) {
        const { source, target } = _edge
        id2node[source].children.push(id2node[target])
    }
    let set = new Set()
    for (const node of nodes) {
        node.children.forEach(child => set.add(child))
    }
    // find root node
    for (const node of nodes) {
        if (!set.has(node)) {
            return node
        }
    }
    throw Error("Cannot find root node")
}


function test() {
    const nodes = [
        { id: 1 },
        { id: 2 },
        { id: 3 },
    ]
    const edges = [
        { source: 1, target: 2 },
        { source: 1, target: 3 },
    ]
    console.log(nodesToTree(nodes, edges))
}

// test()