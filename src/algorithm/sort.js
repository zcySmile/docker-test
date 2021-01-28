// 选择排序
// 思想： 每次遍历数组找到最小的数字，然后和第一个没有经过排序的数字进行交换， O(n²), 不稳定，也就是两个相等的数字，排序后本来在前面的可能在后面
// 冒泡排序： 两两比较，将大的数字后移。  O(n²), 稳定。 优化，用一个变量记录一轮循环时候有交换，如果没有，就不进行之后的比较了，最后的时候时间复杂度下降的n
// 插入排序，对基本有序的数组最好用，稳定。
function swap(args, i,j) {
    let temp = args[i]
    args[i]= args[j]
    args[j]= temp
}

function print(args) {
    console.log(args)
}

// 冒泡排序, 稳定，O(n²)
function bubbleSort(args) {
    for(let i=0;i<args.length;i++) {
        for(let j=1;j<args.length - i;j++) {
            if(args[j]<args[j-1]){
                swap(args,j,j-1)
            }
        } 
    }
}

// 选择排序 不稳定，O(n²)
function selectInsert(args) {
    for (let i = 0; i < args.length; i++) {
        let minIndex = i
        for(let j=i+1;j<args.length;j++) {
            if(args[minIndex] > args[j]) {
                minIndex=j
            }
        }
        if(minIndex !== i) {
            swap(args,i,minIndex)
        }
    }
}

//基本插入
function insertSort(args) {
    for(let i=1;i<args.length;i++) {
        for(let j=i;j>0;j--) {
            args[j] < args[j-1] ? swap(args,j,j-1) : ''
        }
    }
}

// 优化  插入
function insertSort2(args) {
    for(let i=1;i<args.length;i++) {
        let temp = args[i]
        for(let j=i;j>0;j--) {
           if(args[j] <args[j-1]) {
               args[j] = args[j-1]
               args[j-1] = temp
           } 
        }
    }
}

// 希尔排序， 利用不同的间隔进行排序，间隔组件减少直为1
// gap选择方法：
// Knuth序列： h=1, h=3h+1,  当h小于数组长度的三分之一时有效
function shellSort(args) {
    let h =1
    while(h<=Math.floor(args.length / 3)) {
        h= 3*h +1
    }
    for(let gap = h;gap>0;gap =Math.floor((gap-1) / 3)) {
        for(let i= gap;i<args.length;i++) {
            for(let j=i;j>gap-1;j-=gap) {
                if(args[j] < args[j-gap]) {
                    swap(args,j,j-gap)
                }
            }
        }
    }
}

function test() {
    let args= [2,4,10,0,5,12,3,1,6,11,14,15,13,7,9,8]
    selectInsert(args)
    console.log(args)
}

test()