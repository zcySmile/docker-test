export default function (tokens) {
    // 这个方法充分利用了引用类型值的特点
    let newTokens = []
    let collector = newTokens
    let stack = []
    for (let i = 0; i < tokens.length; i++) {
        let token = tokens[i]
        switch (token[0]) {
            case "#": {
                collector.push(token)
                stack.push(token)  // 收集器放入的是colleter 依次指向的token
                collector = token[2] = []
                break;
            }
            case "/": {
                stack.pop()
                collector = stack.length > 0? stack[stack.length -1][2] : newTokens
                break;
            }
            default:{
              collector.push(token)
            }
        }
    }
    return newTokens
    // var nestedTokens = [];
    //   var collector = nestedTokens;
    //   var sections = [];
  
    //   var token, section;
    //   for (var i = 0, numTokens = tokens.length; i < numTokens; ++i) {
    //     token = tokens[i];
  
    //     switch (token[0]) {
    //       case '#':
    //       case '^':
    //         collector.push(token);
    //         sections.push(token);
    //         collector = token[4] = [];
    //         break;
    //       case '/':
    //         section = sections.pop();
    //         section[5] = token[2];
    //         collector = sections.length > 0 ? sections[sections.length - 1][4] : nestedTokens;
    //         break;
    //       default:
    //         collector.push(token);
    //     }
    //   }
  
    //   return nestedTokens;
}