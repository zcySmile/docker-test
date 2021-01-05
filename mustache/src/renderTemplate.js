export default function renderTemplate (tokens, data) {
    let temStr=''
    for(let i=0, length = tokens.length;i<length;i++) {
        let code = tokens[i][0]
        let str = tokens[i][1]
        if(code === 'text') {
            temStr += str
        } else if(code==='name') {
            if(str === '.') {
               temStr += data
            } else{
                temStr += lookup(data,str)
            }
            
        } else if(code === '#') {
            let nextData = lookup(data, str)
            let nextToken = tokens[i][2]
            temStr += parseArray(nextToken, nextData)
        }
    }
    return temStr
}

function parseArray(token,data) {
   let str = ''
   for(let i = 0;i<data.length;i++) {
       str += renderTemplate(token,data[i],)
   }
   return str
}

// dataObj 中通过a.b.c字符串查找数据
export function lookup(dataObj,keyName) {
  if(keyName.includes('.')) {
      let names = keyName.split('.')
      let temp = dataObj
      for(let i=0;i<names.length;i++) {
          temp = temp[names[i]]
      }
      return temp
  }
  return dataObj[keyName]
}