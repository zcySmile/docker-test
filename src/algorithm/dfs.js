// function dfs(p, dp, level,res) {
//     // 1. 截止条件
//     if(level === p.length+1) {
//         console.log(res)
//         return res
//     }
//     // 2. 候选人
//     for(let i=0;i<p.length;i++){
//         let c = p[i]
//         // 2.1 筛选条件
//         if(!dp[i]) {
//             dp[i] = true
//             res.push(c)
//             let result = dfs(p,dp,level+1,res)
//            // console.log(result)
//             res.pop()
//             dp[i] = false
//         }
//     }
// }

// // 简化参数版本

// function dfs1(p,res) {
//     if(res.length === p.length) {
//         return res
//     }
//     for(let i=0;i<p.length;i++) {
//         let c = p[i]
//         if(c) {
//             res.push(c)
//             p[i] = null
//             dfs(p,res)
//             res.pop()
//             p[i]= c
//         }
//     }
// }


/**
 *  数字键盘问题
 */
// const data = [
//     [],
//     [],
//     ['a', 'b', 'c'],
//     ['d', 'e', 'f'],
//     ['g', 'h', 'j'],
//     ['k', 'l', 'm'],
//     ['n', 'o', 'p'],
//     ['q', 'r', 's'],
//     ['t', 'u', 'v'],
//     ['w', 'x', 'y', 'z'],
// ]
// var letterCombinations = function (digits) {
//     let result = []
//     let array = [...digits]
//     dfs(array,0, '', result)
//     console.log(result)
//     return result
// };

// function dfs(array,level, res, result) {
//     if (level===array.length) {
//         result.push(res)
//         return
//     }

//     let data1= data[array[level]] 
//     let tempStr = res
//     for(let i=0;i<data1.length;i++) {
//         let temp = data1[i]
//         res +=temp
//         dfs(array,level+1,res,result)
//         res = tempStr
//     }
// }

// letterCombinations('23')

/**
 * 
 * 组合总和问题
 */

// var combinationSum = function(candidates, target) {
//     if(candidates.length === 0) {
//         return []
//     }
//    let result = []
//    let strSet = new Set()
//     dfs(candidates,target,[],result,strSet)
//     strSet = null
//     return result
// };

// function dfs(candidates,target,res,result,set) {
//     let total = 0
//     for(let num of res) {
//         total +=num
//     }
//     if(total>=target) {
//         if(total === target) {
//             let str = res.sort().join()
//             if(!set.has(str)) {
//                 result.push([...res])
//                 set.add(str)
//             }
            
//         }
//         return
//     }
//     // let temRes = [...res]
//     for(let i=0;i<candidates.length;i++) {
//         console.log(i)
//         console.log(res)
//         let num = candidates[i]
//         res.push(num)
//         dfs(candidates,target,res,result,set)
//         res.pop()
//         console.log(res)
//     }
// }
// let result = combinationSum([1,2], 4)
// console.log(result)

// 40 题。    
// 排序可以去除相同数字的同样的组合，比如数组[1,2,2], [1,2]和[1,2]是相同的
// begin 可以去除相同数字的不同排列组合【1,2,3],[1,3,2]是相同的
var combinationSum2 = function(candidates, target) {
    if(candidates.length === 0) {
        return []
    }
    let result = []
    candidates.sort(function (a,b) {
        return a-b
    })
    console.log(candidates)
    let length = candidates.length
    dfs(candidates,target,0,0,[],result,length)
    return result
};

function dfs(candidates,target,level,begin,path,result,length) {
   if(target<=0 || level===length) {
       if(target === 0) {
           result.push([...path])
       }
       return
   }
   let max=Math.max(level,begin)
   for(let i= max;i<length;i++) {
       let num = candidates[i]
       if(num>target) {
        break;
       }
       if(i>max&&(candidates[i] ===candidates[i-1])){
           continue
       }
       path.push(num)
       dfs(candidates,target-num,level+1,i,path,result,length)
       path.pop()
   }
}


// console.log(combinationSum2([10,1,2,7,6,1,5],8))
var combine = function(n, k) {
    if(n===0 || k===0 || k>n) {
        return []
    }

    let reuslt = []

    dfs(n,k,1,1,[],reuslt) 
    return reuslt

};

function dfs(n,k,level,begin,data,reuslt) {
    if(level>k) {
        reuslt.push([...data])
        return
    }
    for(let i=begin;i<=n;i++) {
        data.push(i)
        console.log('进',i)
        dfs(n,k,level+1,i+1,data,reuslt)  //  最开始把i+1, 写成了begin+1
       console.log('出', data.pop())
    }
}

console.log(combine(4,2))