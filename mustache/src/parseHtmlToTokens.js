import Scanner from './Scanner'

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
        word && array.push(['name',word])
    }

    return array
}