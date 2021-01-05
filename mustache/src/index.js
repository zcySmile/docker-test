
import parseHtmlToTokens from './parseHtmlToTokens'
import renderTemplate, {lookup} from './renderTemplate'
// mustache 模板编译过程：
// 1. 将模板字符串通过依次扫描，变为tokens
// 2. 将tokens变为有层次的tokens, 也就是嵌套的
// 3. 将tokens中的变量结合数据变成 真正的字符串

window.Mutache = {
    render: function(str, data) {
        let tokens = parseHtmlToTokens(str)
        console.log(tokens)
        let temStr = renderTemplate(tokens, data)
        console.log(temStr)
        return temStr
    } 
}