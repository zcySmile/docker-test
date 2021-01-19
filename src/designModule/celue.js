// 策略模式   定义一系列的算法，把他们一个一个封装起来， 并且使他们可以相互替换


// 算法
// 实现栈结构
class Stack {
    constructor(...arg) {
        this.items = [...arg]
    }

    push(item) {
        this.items.push(item)
    }

    pop() {
        let item = this.items.pop()
        return item
    }

    peek() {
        let item = this.items[this.items.length - 1]
        return item
    }

    isEmperty() {
        return this.items.length === 0
    }

    size() {
        return this.items.length
    }

    toString() {
        let str = ''
        for (let i = 0, length = this.items.length; i < length; i++) {
            str += this.items[i] + ''
        }

        return str
    }
}

// 利用栈实现十进制转化为二进制
function parseIntToBinary(intNum) {
    let stach = new Stack()
    let reset = 0
    while (intNum > 0) {
        reset = intNum % 2
        intNum = Math.floor(intNum / 2)
        stach.push(reset)
        console.log(stach)
    }
    let num = ''
    while (stach.size() > 0) {
        num += stach.pop()
    }
    return num
}
// let data = parseIntToBinary(24)
// console.log(data)

// 哈希表
// 通过幂的连乘，将字符转化为数字。但是因为得到的数字可能过大，需要一种压缩方法，将巨大的整数范围压缩到可接受的数组范围中，这个过程叫做哈希化
// 压缩方法： 取余操作
// 但是压缩后可能会出现冲突，也就是相同的位置不止一个数据。出现冲突有两种解决办法，1，链地址法 （拉链法）  2 开放地址法
// 链地址法：  在冲突的地方放入的不是数据，而是放入一个链表（或者一个数组），在链表中放入冲突的数据
// 开发地址法： 寻找空白的单元格添加重复的数据。 寻找空白单元格的方法：1，线性探测， 2，二次探测， 3， 再哈希法
// 线性探测： 假如当前index=2, 但是index2 的位置已经有数据，就从index+1的位置进行探测
// 二次探测： 在线性探测的基础上优化，线性探测的步长为1， 二次探测步长index+1² index+2² index+3²
// 再哈希法：将关键字用另外一个哈希函数，再做一次哈希化，用这次的哈希化结果作为步长。（这次的输出函数步长不能为0）
function hashFun(str, size) {
    var hashCode = 0
    for (let i = 0, length = str.length; i < length; i++) {
        hashCode = 37 * hashCode + str.charCodeAt(i)
    }

    var index = hashCode % size
    return index
}


// 二叉树的一些特性
// 第i层的最大节点个数： 2^(i-1)
// 深度为k的二叉树最大节点个数：2^k-1
// 任意非空二叉树，n0表示叶子节点的个数，n2是度为2的非叶子节点的个数，那么n0=n2+1

// 二叉搜索树（二叉排序树，二叉查找树，BST）（左子树的键值小于根节点的键值，右子树的键值大于根节点的键值）
class BinarySearchTreeNode {
    constructor(value) {
        this.key = value
        this.left = null
        this.right = null
    }
}
class BinarySearchTree {
    constructor() {
        this.root = null
    }

    insert(key) {
        let newNode = new BinarySearchTreeNode(key)
        if (this.root === null) {
            this.root = newNode
        } else {
            this.insertNode(this.root, newNode)
        }
    }
    insertNode(node, newNode) {
        if (node.key > newNode.key) {
            if (node.left === null) {
                node.left = newNode
            } else {
                this.insertNode(node.left, newNode)
            }
        } else {
            if (node.right === null) {
                node.right = newNode
            } else {
                this.insertNode(node.right, newNode)
            }
        }
    }
    search(key) {
        let node = this.root
        while (node.key !== key) {
            if ((node.left === null && key < node.key) || (node.right === null && key > node.key)) {
                return null
            }

            if (key < node.key) {
                node = node.left
            } else {
                node = node.right
            }
        }
        return node
    }
    inOrderTraverse() {
        // 中序遍历
        return this.inTraverse(this.root)
    }
    inTraverse(node) {
        let result = []
        if (node !== null) {
            result = result.concat(this.inTraverse(node.left))
            result.push(node)
            result = result.concat(this.inTraverse(node.right))
        }
        return result
    }
    perOrderTraverse() {
        return this.preTraverse(this.root)
    }
    preTraverse(node) {
        if (node === null) return []
        let result = [node]
        result = result.concat(this.preTraverse(node.left))
        result = result.concat(this.preTraverse(node.right))
        return result
    }
    postOrderTraverse() {
        // 后序遍历
        return this.postTraverse(this.root)
    }
    postTraverse(node) {
        let result = []
        if (node !== null) {
            result = result.concat(this.postTraverse(node.left))
            result = result.concat(this.postTraverse(node.right))
            result.push(node)
        }
        return result
    }

    min() {
        // 返回最小值
        let node = this.root
        while (node.left !== null) {
            node = node.left
        }
        return node.key
    }
    max() {
        // 返回最大值
        let node = this.root
        while (node.right !== null) {
            node = node.right
        }
        return node.key
    }
    setNode(node, nextNode, isLeft) {
        if(node === this.root) {
            this.root = nextNode
            return true
        }
        if (isLeft) {
            node.left = nextNode
        } else {
            node.right = nextNode
        }
    }
    remove(key) {
        let node = this.root,
            current = this.root,
            parent = null,
            isLeft = true
        while (node !== null) {
            if (key < node.key) {
                parent = node
                node = node.left
                isLeft = true
            } else if (key > node.key) {
                parent = node
                node = node.right
                isLeft = false
            } else {
                current = node
            }
        }
        if (current === null) {
            return false
        }

        if (current.left === null && current.right === null) {
            this.setNode(parent, null, isLeft)
        } else if (current.left && current.right) {
            let successor = this.getSucessor(current)
            if(current === this.root) {
                this.root = successor
            } else if(isLeft) {
                parent.left = successor
            } else {
                parent.right = successor
            }
        } else if (current.left) {
            this.setNode(parent, current.left, isLeft)
        } else if (current.right) {
            this.setNode(parent, current.right, isLeft)
        }
    }

    // 找后继节点
    getSucessor(delNode) {
        let successor = delNode, current= delNode.right, successorParent = delNode
        while(current !== null) {
            successorParent = successor
            successor = current
            current = current.left
        }
        // 判断寻找的后继节点是否直接就是delnode 的right节点
        if(successor !== delNode.right) {
            successorParent.left = successor.right
            successor.right = delNode.right
        }
        return successor
    }
}

let tree = new BinarySearchTree()
tree.insert(9)
tree.insert(11)
tree.insert(5)
tree.insert(3)
tree.insert(7)
tree.insert(18)
tree.insert(14)

// let result = tree.postOrderTraverse()
// console.log(result)


console.log(tree.min())
console.log(tree.max())
console.log(tree.search(19))