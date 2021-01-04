
import parseHtmlToTokens from './parseHtmlToTokens'

window.Mutache = {
    render: function(str, data) {
        let tokens = parseHtmlToTokens(str)
        console.log(tokens)
    } 
}