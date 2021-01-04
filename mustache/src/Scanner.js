
export default class Scanner{
    constructor(str) {
         this.str = str,
         this.pos = 0, // 开始指针
         this.tail = this.str // 还未查找的字符串
    }

    // 跳过tag代表的字符
    scan(tag) {
       if(this.tail.indexOf(tag) === 0) {
           this.pos = this.pos + tag.length
           this.tail = this.str.substring(this.pos)
       }
    }

    //tag  查找结束的标签
    scanUtil(tag) {
        let backup_pos = this.pos
        let index = this.tail.indexOf(tag)
        if(index>0) {
            while(index > 0) {
                this.pos++
                this.tail = this.str.substring(this.pos)
                index--
            }
        } else if(index === -1) {
            this.tail = ''
            this.pos= this.str.length
        }
       
       let string = this.str.substring(backup_pos, this.pos)
       return string
    }

}