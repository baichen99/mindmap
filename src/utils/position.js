import { findRoot } from './tree.js'

// 每次的垂直与水平间隔
const verticalGap = 100
const horizontalGap = 300
// 叶子节点纵坐标的初始值
var y_prior = 0
// deep表示节点的深度
var deep = 0
// y_Children数组含两个值，分别为该分支节点第一个和最后一个孩子的y坐标
var y_Children = []

// 计算叶节点的坐标
function calChildrenPosition(node) {
    // 横轴坐标为该节点深度乘以水平间距
    node.position.x = deep * horizontalGap
    // 纵坐标为初始y坐标加上垂直间距
    node.position.y = y_prior + verticalGap
    // 更新y_prior，以便计算下一个叶子节点的纵坐标
    y_prior = node.position.y
    // 将该节点纵坐标返回
    return node.position.y
}

// 计算分支节点的坐标
function calFatherPosition(node, y_Children) {
    // 横轴坐标为该节点深度乘以水平间距
    node.position.x = deep * horizontalGap
    // 纵坐标等于该分支节点第一个以及最后一个孩子的纵坐标的中间值
    node.position.y = (y_Children[0] + y_Children[1]) / 2
}

export function getPosition(node) {
    // 每次的垂直与水平间隔
    
    console.log(verticalGap)
    // horizontalGap = 300
    // 叶子节点纵坐标的初始值
    y_prior = 0
    // deep表示节点的深度
    deep = 0
    // y_Children数组含两个值，分别为该分支节点第一个和最后一个孩子的y坐标
    y_Children = []

    console.log(node.children[0].position)
    console.log(node.children[1].position)
    if (node === null) return
    deepFirstSearch(node, [])
    const nodes = flattenNode(node)
    // make sure position of root node is (0, 0)
    const root = findRoot(nodes)
    const offsetX = root.position.x
    const offsetY = root.position.y
    for (const _node of nodes) {
        _node.position.x -= offsetX
        _node.position.y -= offsetY
    }
    return nodes
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

// 深度优先遍历，nodelist打印出来即为遍历的顺序，deep表深度
function deepFirstSearch(node, nodeList) {
    // 如果节点包含hidden属性
    if (node.hidden == undefined || !node.hidden) {
        // 节点不被隐藏时，才计算位置
        if (node) {
            deep++
            var children = node.children;
            for (var i = 0; i < children.length; i++) {
                if (children[i].hidden == undefined || !children[i].hidden) {
                    // 节点不被隐藏时，才计算位置
                    //每次递归的时候将 需要遍历的节点 和 节点所存储的数组nodeList传下去
                    deepFirstSearch(children[i], nodeList);
                }
            }
            nodeList.push(node);
            deep--;
            // 若是叶节点,当一个节点的子节点被隐藏了，他就看做是叶节点
            if (children.length == 0||(node.hideChildren !== undefined&&node.hideChildren)) { calChildrenPosition(node) }
            // 分支节点
            else {
                // 先求出该分支节点第一个以及最后一个孩子的纵坐标，以便计算该分支节点的纵坐标
                y_Children[0] = children[0].position.y
                y_Children[1] = children[children.length - 1].position.y
                calFatherPosition(node, y_Children)
            }
        }

    }

    return nodeList;
}


