export function nodesToTree(nodes, edges) {
    const id2node = {}
    for (const node of nodes) {
        node.children = []
        id2node[node.id] = node
    }
    for (const edge of edges) {
        const { source, target } = edge
        id2node[source].children.push(id2node[target])
    }
    return findRoot(nodes)
}

export function findRoot(nodes) {
    const set = new Set()
    for (const node of nodes) {
        node.children.forEach(child => set.add(child.id))
    }
    for (const node of nodes) {
        if (!set.has(node.id)) {
            return node
        }
    }
    throw Error("Cannot find root node")
}
