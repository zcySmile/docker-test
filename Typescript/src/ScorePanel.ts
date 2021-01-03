/*
 * @Author: zcySmile
 * @Date: 2021-01-02 10:59:55
 * @LastEditors: zcySmile
 * @LastEditTime: 2021-01-02 11:00:57
 * @Description: 
 */
class ScorePanel{
    score = 0;
    level = 1;
    scoreEle: HTMLElement;
    levelEle: HTMLElement
 
    private maxLevel: number
    private upScore:number

    constructor(maxLevel: number = 10, upScore: number = 10) {
        this.upScore = upScore
        this.maxLevel = maxLevel
        this.scoreEle = document.getElementById('score')!
        this.levelEle = document.getElementById('level')!
    }

    addScore() {
        this.score++
        this.scoreEle.innerHTML = this.score + ''
        if (this.score % this.upScore === 0) {
            this.levelUp()
        }
    }
    levelUp() {
        if (this.level < this.maxLevel) {
        this.levelEle.innerHTML = ++this.level+''
        }
    }
}

export default ScorePanel