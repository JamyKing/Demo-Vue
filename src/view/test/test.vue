<template>
<!--    <h1>TEST</h1>-->
    <div>
        <el-row class="row-style">
            <el-select v-model="type" size="small" placeholder="请选择训练模式" :disabled="typingStatus">
                <el-option
                    v-for="item in typeOptions"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value">
                </el-option>
            </el-select>
            <el-button @click="wordChange('chinese')" :disabled="typingStatus" type="primary" size="small" :plain="wordType !== 'chinese'">中文</el-button>
            <el-button @click="wordChange('english')" :disabled="typingStatus" type="primary" size="small" :plain="wordType !== 'english'">英文</el-button>
            <el-button @click="wordChange('number')" :disabled="typingStatus" type="primary" size="small" :plain="wordType !== 'number'">数字</el-button>
            <el-input-number @change="timeChoose" v-show="type === 'timing'" v-model="timing" controls-position="right" step-strictly :min="1" :max="60" size="small"></el-input-number>
        </el-row>
        <el-row class="row-style">
            <el-select @change="init" v-model="currentWord" size="small" placeholder="请选择文章" :disabled="typingStatus">
                <el-option
                    v-for="item in wordsOptions"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value">
                </el-option>
            </el-select>
            <el-button @click="customVisible = true" size="small" :disabled="typingStatus">自定义</el-button>
        </el-row>
        <el-row class="row-style">
            <el-col :span="10">
                <el-button @click="begin" type="success" size="small" :disabled="start">开始</el-button>
                <el-button @click="suspend" v-show="type === 'default'" type="warning" size="small" :disabled="!start">暂停</el-button>
                <el-button @click="restart" type="primary" size="small" :disabled="!typingStatus">重新开始</el-button>
                <el-button @click="finish" type="danger" size="small" :disabled="!typingStatus">结束</el-button>
            </el-col>
            <el-col :span="14">
                <label class="timeData">时间：{{time.hour}}:{{time.minute}}:{{time.second}}</label>
                <label class="timeData">进度：{{UserCumputed.schedule}}</label>
                <label class="timeData">退格：{{backspace}}</label>
                <label class="timeData">正确率：{{accuracy}}%</label>
            </el-col>
        </el-row>
        <el-row class="row-style typing" oncopy="return false;" onpaste="return false;" ncontextmenu="return false;" onselectstart="return false;">
            <div v-show="!start" class="mask"></div>
            <div class="content">
                <div class="wordpad" v-for="(items, indexs) in wordSplit" :key="indexs">
                    <div class="refer">
                        <span
                            class="record"
                            v-for="(item, index) in items"
                            :key="index"
                            :class="{red:item!==WatchWord[indexs][index] && typeof WatchWord[indexs][index]!=='undefined',green:item === WatchWord[indexs][index]}">
                            {{item === ' ' ? '&nbsp;' : item}}
                        </span>
                    </div>
                    <div ref="enterInput" class="enter">
                        <input :class='["inp"+indexs]' v-model="enterSplit[indexs]">
                        <div class="PositionWord">
                            <span v-for="(item,index) in WatchWord[indexs]" :key="index" :class="{red:item!==typingList[index]}">{{item}}</span>
                        </div>
                    </div>
                </div>
            </div>
        </el-row>
        <el-dialog
            :title="`自定义-${wordType}`"
            width="60%"
            :visible.sync="customVisible"
            :close-on-click-modal="false"
            :before-close="customClose">
            <el-input v-model="textArea" type="textarea" :rows="10"></el-input>
            <span slot="footer" class="dialog-footer">
                <el-button @click="customClose" size="medium">取 消</el-button>
                <el-button type="primary" @click="customSubmit" size="medium">导 入</el-button>
            </span>
        </el-dialog>
        <el-dialog
            title="成绩结果"
            width="50%"
            :visible.sync="resultVisible"
            :close-on-click-modal="false"
            :before-close="resultClose">
            <div class="result-div">
                <div class="result-data u-f-cer">
                    <label>消耗时间：{{timeTemp.hour}}:{{timeTemp.minute}}:{{timeTemp.second}}</label>
                    <label>打字速度：{{speed}} 字/分钟</label>
                    <label>退 格 数：{{backspace}} 次</label>
                    <label>正 确 率：{{accuracy}}%</label>
                    <label>错字/词统计</label>
                    <div>
                        <el-tag class="tabs" v-for="(item, index) in errorData" :key="index" type="danger" effect="dark">{{item}}</el-tag>
                    </div>
                </div>
            </div>
            <span slot="footer" class="dialog-footer">
                <el-button type="primary" @click="resultClose" size="medium">确 定</el-button>
            </span>
        </el-dialog>
    </div>
</template>

<script>
export default {
    name: 'test',
    components: {
    },
    data() {
        return {
            type: 'default', // default - 一般训练;  timing - 计时训练;  exam - 考试训练;
            wordType: 'chinese', // chinese - 中文;  english - 英文;  number - 数字;  
            typeOptions: [{
                value: 'default',
                label: '一般训练'
            }, {
                value: 'timing',
                label: '计时训练'
            }, {
                value: 'exam',
                label: '考试训练'
            }],
            typingStatus: false,
            start: false,
            timing: 10, // 倒计时间
            time: {
                hour: '00',
                minute: '00',
                second: '00'
            },
            timer: null,
            splitSize: 40,
            currentWord: '', // 当前训练内容
            wordSplit: [], // 文章拆分
            enterSplit: [], // 写入内容拆分
            typingList: [], // 打字列表
            accuracy: '0.00', // 正确率
            backspace: 0, // 退格数
            speed: 0,
            timeTemp: {
                hour: '00',
                minute: '00',
                second: '00'
            },
            errorData: [],
            customVisible: false,
            resultVisible: false,
            textArea: '',
            wordsOptions: [],
            chineses: [
                {
                    label: '春天的脚步近了',
                    type: 'chinese',
                    value: '盼望着，盼望着，东风来了，春天的脚步近了。一切都像刚睡醒的样子，欣欣然张开了眼。山朗润起来了，水涨起来了，太阳的脸红起来了。小草偷偷地从土里钻出来，嫩嫩的，绿绿的。园子里，田野里，瞧去，一大片一大片满是的。坐着，躺着，打两个滚，踢几脚球，赛几趟跑，捉几回迷藏。风轻悄悄的，草软绵绵的。桃树、杏树、梨树，你不让我，我不让你，都开满了花赶趟儿。红的像火，粉的像霞，白的像雪。花里带着甜味儿；闭了眼，树上仿佛已经满是桃儿、杏儿、梨儿。花下成千成百的蜜蜂嗡嗡地闹着，大小的蝴蝶飞来飞去。野花遍地是：杂样儿，有名字的，没名字的，散在草丛里，像眼睛，像星星，还眨呀眨的。'
                },
                {
                    label: '勇敢的人生',
                    type: 'chinese',
                    value: '在工作中，你是否有过这样的感受：你平时尽职尽责，任劳任怨，就因为无意做错了一件小事，就被领导全盘否定。你待人宽厚，善良，不计较，但就因为无心说错了一句话，就被同事怀恨在心。甚至你加班熬夜，好不容易做出来的方案，却因为客户的过度挑剔，而毁于一旦。你时常觉得上班很累，不仅因为压力大，任务重，担子沉，还因为这里勾心斗角，尔虞我诈，明争暗斗等等，让你感到力不从心。你曾以为，就自己很苦，很忙，很疲惫，但你不知道的是，这个世界，还有更多的人，过得比你还辛苦，但都在负重前行，咬牙坚持。你曾以为，换一个地方就好了，换一个环境就对了，换一批人就轻松了。但你不知道的是，其实到哪儿都要面对该有的困难和挫折。'
                }
            ],
            englishs: [
                {
                    label: 'The past',
                    type: 'english',
                    value: 'The past is gone and static. Nothing we can do will change it. Thefuture is before us and dynamic. Everything we do will affect it. You laugh at me for being different, but I laugh at you for being the same. The consequences of today are determined by the actions of the past. To change your future, alter your decisions today. Experience is a hard teacher because she gives the test first, the lesson afterwards. Ability may get you to the top, but it takes character to keep you there. Life is not measured by the number of breaths we take, but by the moments that take our breath away.'
                },
                {
                    label: 'You Have Only One Life',
                    type: 'english',
                    value: 'There are moments in life when you miss someones so much that you just want to pick them from your dreams and hug them for real! Dream what you want to dream; go where you want to go; be what you want to be, because you have only one life and one chance to do all the things you want to do. May you have enough happiness to make you sweet, enough trials to make you strong, enough sorrow to keep you human, enough hope to make you happy? Always put yourself in other is shoes. If you feel that it hurts you, it probably hurts the other person, too. The happiest of people do not necessarily have the best of everything, they just make the most of everything that comes along their way. Happiness lies for those who cry, those who hurt, those who have searched, and those who have tried, for only they can appreciate the importance of people.'
                }
            ],
            numbers: [
                {
                    label: '数字集',
                    type: 'number',
                    value: '18305.230184.6835.1730.4824.71564170.6310.62063951279.468246.96437.5041.2795.48517037.1461960.3790.5280.4519.6168405286.3961048375.7937456.2749537059635.638960.3743854072.48942706.396758.46249247.275370641970.4683964817.48619369.3957260.59.28.40.17.59274061286'
                }
            ]
        }
    },
    created() {
        const that = this
        that.wordsOptions = that.chineses
        that.currentWord = that.wordsOptions[0].value
        that.init()
        document.onkeydown = function(event) {
            var event = event || window.event
            if (that.start && event.keyCode === 8) {
                that.backspace ++
            }
        }
    },
    mounted() {
        // this.$nextTick(() => {
        //     document.oncontextmenu = function(evt) {
        //         evt.preventDefault()
        //     }
        //     document.onselectstart = function(evt) {
        //         evt.preventDefault()
        //     }
        // })
    },
    directives: {
        //自定义聚焦指令
        focus: {
            inserted: function(el, {
                value
            }) {
                if (el.className == 'inp' + value) {
                    el.focus()
                }
            }
        }
    },
    computed: {
        WatchWord() {
            var array = []
            if (this.enterSplit.length > 0) {
                this.enterSplit.forEach((i, c, v) => {
                    if (i.length) {
                        array.push(i.split(""))
                    } else {
                        array.push(i)
                    }
                })
            }
            return array
        },
        UserCumputed() {
            return ({
                schedule: this.currentWord.length <= 0 ? "0.00%" : ((Math.round(this.enterSplit.join('').length / this.currentWord.length * 10000) / 100.00).toFixed(2) + "%")
            })
        }
    },
    watch: {
        WatchWord: {
            handler(newValue, oldValue) {
                const proper = []
                newValue.forEach((i, c, v) => {
                    if (i instanceof Array && i) {
                        if (i.length >= this.wordSplit[c].length) {
                            if (this.$refs.enterInput.length - 1 > c) {
                                this.$refs.enterInput[c + 1].querySelector('input').focus()
                            }
                            this.enterSplit[c] = this.enterSplit[c].slice(0, this.wordSplit[c].length)
                        }
                        i.forEach((ip, cp, vp) => {
                            if (ip != this.wordSplit[c][cp]) {
                                proper.push(ip)
                            }
                        })
                    }
                })
                // 准确率计算
                this.accuracy = (this.enterSplit.join('').length - proper.length) <= 0 ? '0.00' : (((this.enterSplit.join('').length - proper.length) * 100 / this.enterSplit.join('').length).toFixed(2)).toString()
                if (this.enterSplit.join('').length >= this.currentWord.split("").length) { //不去空格
                    //当写入完成结束时
                    this.finish()
                }
            },
            deep: true
        }
    },
    methods: {
        init () {
            this.time = {
                hour: '00',
                minute: '00',
                second: '00'
            }
            this.wordSplit = []
            this.enterSplit = []
            this.typingList = this.currentWord.split('')
            if (this.typingList.length > this.splitSize) {
                var hang = this.typingList.length % this.splitSize == 0 ? parseInt(this.typingList.length / this.splitSize) : parseInt(this.typingList.length / this.splitSize) + 1
                for (var c = 0; c < hang; c++) {
                    this.wordSplit.push(this.typingList.splice(0, this.splitSize))
                    this.enterSplit.push([])
                }
            } else {
                this.wordSplit.push(this.typingList)
                this.enterSplit.push([])
            }
        },
        wordChange (value) {
            this.wordType = value
            switch (value) {
                case 'chinese':
                    this.splitSize = 40
                    this.wordsOptions = this.chineses
                    break
                case 'english':
                    this.splitSize = 70
                    this.wordsOptions = this.englishs
                    break
                case 'number':
                    this.splitSize = 65
                    this.wordsOptions = this.numbers
                    break
            }
            this.currentWord = this.wordsOptions[0].value
            this.init()
        },
        timeChoose (value) {
            this.time.minute = value
        },
        customClose () {
            this.customVisible = false
        },
        customSubmit() {
            // &apos;----单引号
            // $#39; ----单引号（兼容IE）
            // &quot;-----双引号
            this.currentWord = this.textArea.replace(/\n/g, ' ')
            this.customVisible = false
            this.init()
            this.$nextTick(() => {
                this.textArea = ''
            })
        },
        timeBegin () {
            const { start, time } = this
            if (start) {
                time.second - 0
                if (time.second < 9) {
                    time.second ++
                    time.second = '0' + time.second
                } else {
                    time.second ++
                }
                if (time.second >= 60) {
                    time.minute - 0
                    time.second = '00'
                    if (time.minute < 9) {
                        time.minute ++
                        time.minute = '0' + time.minute
                    } else {
                        time.minute ++
                    }
                }
                if (time.minute >= 60) {
                    time.hour - 0
                    time.minute = '00'
                    if (time.hour < 9) {
                        time.hour ++
                        time.hour = '0' + time.hour
                    } else {
                        time.hour ++
                    }
                }
            } else {
                clearTimeout(this.timer)
            }
        },
        countDown () {
            const { time } = this
            if (time.second > 0) {
                time.second --
                time.second = time.second < 10 ? '0' + time.second : time.second
                return
            }
            if (time.minute > 0) {
                time.minute --
                time.minute = time.minute < 10 ? '0' + time.minute : time.minute
                time.second = 59
                return
            }
            if (time.hour > 0) {
                time.hour --
                time.hour = time.hour < 10 ? '0' + time.hour : time.hour
                time.minute = 59
                return
            }
            this.finish()
        },
        begin () {
            this.start = true
            this.$refs.enterInput[0].querySelector('input').focus()
            if (!this.typingStatus) {
                this.typingStatus = true
                this.enterSplit.forEach((ele, i) => {
                    this.enterSplit[i] = []
                })
                this.WatchWord.forEach((ele, i) => {
                    this.WatchWord[i] = []
                })
            }
            switch (this.type) {
                case 'default':
                    this.timer = setInterval(this.timeBegin, 1000)
                    break
                case 'timing':
                    this.time.minute = this.timing
                    this.timer = setInterval(this.countDown, 1000)
                    break
                case 'exam':
                    this.time = {
                        hour: '01',
                        minute: '30',
                        second: '00'
                    }
                    this.timing = 90
                    this.timer = setInterval(this.countDown, 1000)
                    break
            }
        },
        suspend () {
            this.start = false
        },
        errorCount (value) {
            const dataList = document.getElementsByClassName('record red')
            const errorList = []
            for (let item of dataList) {
                if (value === 'english') {
                    let temp = item
                    let word = temp.innerText
                    const wordTraverse = function (code) {
                        if (code === 'pre') {
                            let preElement = temp.previousElementSibling
                            if (preElement !== null && preElement.innerText !== ' ') {
                                word = preElement.innerText + word
                                temp = preElement
                                wordTraverse('pre')
                            } else {
                                temp = item
                                wordTraverse('nex')
                            }
                        } else {
                            let nexElement = temp.nextElementSibling
                            if (nexElement !== null && nexElement.innerText !== ' ') {
                                word = word + nexElement.innerText
                                temp = nexElement
                                wordTraverse('nex')
                            }
                        }
                        
                    }
                    wordTraverse('pre')
                    errorList.push(word)
                } else {
                    errorList.push(item.innerText)
                }
            }
            let result = Array.from(new Set(errorList))
            return result
        },
        restart () {
            clearTimeout(this.timer)
            this.start = true
            this.time = {
                hour: '00',
                minute: '00',
                second: '00'
            }
            this.backspace = 0
            this.accuracy = '0.00'
            this.$refs.enterInput[0].querySelector('input').focus()
            this.enterSplit.forEach((ele, i) => {
                this.enterSplit[i] = []
            })
            this.WatchWord.forEach((ele, i) => {
                this.WatchWord[i] = []
            })
            this.$nextTick(() => {
                this.timer = setInterval(this.timeBegin, 1000)
            })
        },
        finish () {
            const { type, wordType, timing, time, enterSplit, accuracy } = this
            this.start = false
            this.typingStatus = false
            clearTimeout(this.timer)
            // 计算速度
            this.timeTemp = {
                hour: '00',
                minute: '00',
                second: '00'
            }
            let consume = time.hour * 3600 + time.minute * 60 + time.second * 1
            if (type === 'default') {
                this.timeTemp = { ...time }
            } else {
                // 消耗时长
                consume = timing * 60 - consume
                let timeSum = consume
                if (timeSum >= 3600) {
                    let hourTemp = Math.floor(timeSum / 3600)
                    this.timeTemp.hour = hourTemp < 10 ? '0' + hourTemp : hourTemp
                    timeSum = timeSum - (hourTemp * 3600)
                }
                if (timeSum >= 60) {
                    let minuteTemp = Math.floor(timeSum / 60)
                    this.timeTemp.minute = minuteTemp < 10 ? '0' + minuteTemp : minuteTemp
                    timeSum = timeSum - (minuteTemp * 60)
                }
                if (timeSum > 0) {
                    let secondTemp = timeSum
                    this.timeTemp.second = secondTemp < 10 ? '0' + secondTemp : secondTemp
                }
            }
            let enterLength = enterSplit.join('').length
            this.speed = enterLength > 0 ? Math.round(enterLength / consume * 60) : 0
            this.errorData = this.errorCount(wordType)
            this.$nextTick(() => {
                this.resultVisible = true
            })
        },
        resultClose () {
            this.resultVisible = false
            this.time = {
                hour: '00',
                minute: '00',
                second: '00'
            }
            this.accuracy = '0.00'
            this.backspace = 0
        }
    }
}
</script>

<style lang="scss" scoped>
.row-style {
    margin: 6px 0;
    .timeData {
        line-height: 2.5;
        font-weight: bold;
        margin-right: 10px;
    }
}
.typing {
    width: 100%;
    overflow: auto;
    border: 1px solid #cccccc;
    border-radius: 10px;
    .mask {
        position: absolute;
        width: 100%;
        height: 100%;
        z-index: 100;
        background: rgba(255, 255, 255, .8);
        padding: 10px;
        box-sizing: border-box;
    }
    .content {
        height: 385px;
        overflow-y: scroll;
        .wordpad {
            padding: 10px;
            .refer {
                letter-spacing: 5PX;
                text-align: justify;
                span {
                    display: inline-block;
                    font-size: 18px;
                }
            }
            .enter {
                position: relative;
                input {
                    border: none;
                    font-family: 'Airay', '微软雅黑';
                    width: 100%;
                    font-size: 18px;
                    border-bottom: 1px dashed #424242;
                    outline: none;
                    padding: 10px 0;
                    padding-top: 5px;
                    letter-spacing: 5PX;
                    text-align: justify;
                    caret-color: black;
                    height: 28px;
                    margin: 5px 0;
                    border-radius: 2px;
                    background: none;
                }
                .PositionWord {
                    display: none;
                    letter-spacing: 5PX;
                    text-align: justify;
                    position: absolute;
                    top: 5px;
                    left: 0px;
                }
            }
        }
    }
}
.result-div {
    width: 100%;
    .result-data {
        font-size: 20px;
        label {
            margin: 8px;
        }
        .tabs {
            margin: 5px 8px;
        }
    }
}
.red {
    color: red;
    text-shadow: 1px 1px 5px #ff7171;
}
.green {
    color: #6200ff;
    text-shadow: 1px 1px 5px #ff7171;
}
</style>
