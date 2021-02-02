// 基本查找方法, 查找某一个数
function find(nums,target) {
    // let length = nums.length
    // if(length === 0) return -1
    // let mid = Math.floor((length-1)/2), left=0, right=0,result=-1
    // while (nums[mid] !==target) {
    //     if(nums[mid] > target) {
    //         right =mid-1
    //         mid =Math.floor((right-left) / 2)
    //     } else if(nums[mid] <target) {
    //         left = mid+1
    //         mid =Math.floor((left -right) /2)
    //     } else {
    //         result = mid
    //     }
    // }

    let left = 0
    let right = nums.length -1
    while (left <= right) {
        const mid = Math.floor(left + (right -left) /2)
        if(nums[mid] === target) return mid
        if(nums[mid] > target) {
            right = mid -1
        } else {
            left = mid +1
        }
    }
    return -1
}

// 查找最左边的满足条件的值, 等于时收缩右边
function findLeft(nums, target) {
    let left = 0
    let right =nums.length -1
    while (left<=right) {
        let mid = Math.floor(left + (right -left) /2)
        if(nums[mid] === target) {
            right = mid-1
        } else if(nums[mid] < target) {
            left = mid + 1
        } else {
            right = mid -1 
        }
    }
    if(left >= nums.length || nums[left] !== target) return -1
    return left
}

// 寻找最左的插入位置
function findLeftForInsert(nums,target) {
    let left = 0
    let right = nums.length -1
    while (left<= right) {
        let mid = Math.floor(left + (right-left) / 2)
        if(nums[mid] >= target) {
            right = mid -1
        } else {
            left = mid+1
        }
    }
    return left
}
let nums = [3,3,3,6,6,7,8,13,34]
console.log(findLeftForInsert(nums,35))


// lekou 81
function eightOne(nums, target) {
    let left = 0 
    let right = nums.length -1
    let mid = Math.floor((right -left) / 2)
    if(nums[mid] > nums[0]){
        // [left, mide] 有序
        // [mid,right] 无序
        if(target < nums[mid]) {
            // 在有序队列中
            // 二分查找
        } else {
            // 在无序列表中
            // 普通查找，中止条件索引加上 
            for(let i=mid-1;i>=0;i++) {
                if()
            }
        }
    } else {

    }
}