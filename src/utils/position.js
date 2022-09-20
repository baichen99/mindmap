import { nodesToTree } from './tree.js'


const verticalGap = 150
const horizontalGap = 300
// node is a object tree

function calChildrenPosition(node) {
    const cLen = node.children.length
    for (let [index, child] of node.children.entries()) {
        child.position.x = node.position.x + horizontalGap
        if (cLen % 2) {
            child.position.y = index ? (node.position.y + (Math.floor((index + 1) / 2)) * Math.pow(-1, index) * verticalGap) : 0
        } else {
            child.position.y = node.position.y + Math.floor((index + 2) / 2) * Math.pow(-1, index + 1) * verticalGap
        }
    }
}

export function getPosition(node) {
    console.log(node);
    if (node === null) return
    let queue = [node]
    while (queue.length) {
        let _curNode = queue.shift()
        calChildrenPosition(_curNode)
        if (_curNode.children.length) {
            queue = queue.concat(_curNode.children)
        }
    }
    return flattenNode(node)
}

function flattenNode(node) {
    const nodes = []
    if (node === null) return
    let queue = [node]
    while (queue.length) {
        let _curNode = queue.shift()
        nodes.push(_curNode)
        if (_curNode.children.length) {
            queue = queue.concat(_curNode.children)
        }
    }
    return nodes
}

