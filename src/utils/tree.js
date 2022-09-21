import { cloneDeep } from 'lodash-es'

export function nodesToTree(_nodes, _edges) {
    const id2node = {}
    const nodes = cloneDeep(_nodes)
    const edges = cloneDeep(_edges)
    for (const node of nodes) {
        node.children = []
        id2node[node.id] = node
    }
    console.log("edges.length", edges.length);
    console.log("edges", edges);
    for (const edge of edges) {

        const { source, target } = edge
        id2node[source].children.push(id2node[target])
    }
    const set = new Set()
    for (const node of nodes) {
        node.children.forEach(child => set.add(child.id))
    }
    // find root node
    for (const node of nodes) {
        if (!set.has(node.id)) {
            return node
        }
    }
    throw Error("Cannot find root node")
}

