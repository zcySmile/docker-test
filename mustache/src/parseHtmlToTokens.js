import Scanner from './Scanner'
import nextTokens from './nextTokens'

export default function parseHtmlToTokens(str) {
    var scanner = new Scanner(str)
    let array = []
    let word = ''
    while(scanner.pos < scanner.str.length) {
       word= scanner.scanUtil('{{')
        scanner.scan("{{")
        word &&  array.push(['text',word])
       word =  scanner.scanUtil('}}')
        scanner.scan('}}')
        if(word) {
            if(word[0]==='#') {
                array.push(['#', word.substring(1)])
            } else if(word[0] === '/') {
                array.push(['/',word.substring(1)])
            }else {
                word && array.push(['name',word])
            }
        }
        
    }
    // return array
    
    return nextTokens(array)
}