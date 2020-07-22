<template>
<!--    <h1>TEST</h1>-->
    <div>
        <el-row class="row-style">
            <el-select v-model="type" size="medium" placeholder="请选择" :disabled="typingStatus">
                <el-option
                    v-for="item in typeOptions"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value">
                </el-option>
            </el-select>
            <el-button @click="wordChange('number')" :disabled="typingStatus" type="primary" size="medium" :plain="wordType !== 'number'">数字</el-button>
            <el-button @click="wordChange('chinese')" :disabled="typingStatus" type="primary" size="medium" :plain="wordType !== 'chinese'">中文</el-button>
            <el-button @click="wordChange('english')" :disabled="typingStatus" type="primary" size="medium" :plain="wordType !== 'english'">英文</el-button>
            <el-input-number @change="timeChoose" v-show="type === 'timing'" v-model="timing" controls-position="right" step-strictly :min="1" :max="60" size="medium"></el-input-number>
        </el-row>
        <el-row class="row-style">
            <el-col :span="10">
                <el-button @click="begin" type="success" size="medium" :disabled="start">开始</el-button>
                <el-button @click="suspend" v-show="type === 'default'" type="warning" size="medium" :disabled="!start">暂停</el-button>
                <el-button @click="restart" type="primary" size="medium" :disabled="!typingStatus">重新开始</el-button>
                <el-button @click="finish" type="danger" size="medium" :disabled="!typingStatus">结束</el-button>
            </el-col>
            <el-col :span="12">
                <label class="timeData">时间：{{time.hour}}:{{time.minute}}:{{time.second}}</label>
                <!-- <label class="timeData">速度：{{UserCumputed.speed}} 字/分钟</label> -->
                <label class="timeData">进度：{{UserCumputed.schedule}}</label>
                <label class="timeData">正确率：{{accuracy}}%</label>
            </el-col>
        </el-row>
        <el-row class="row-style typing" oncopy="return false;" onpaste="return false;" ncontextmenu="return false;" onselectstart="return false;">
            <div v-show="!start" class="mask"></div>
            <div class="content">
                <div class="wordpad" v-for="(items, indexs) in wordSplit" :key="indexs">
                    <div class="refer">
                        <span
                            v-for="(item, index) in items"
                            :key="index"
                            :class="{red:item!==WatchWord[indexs][index] && typeof WatchWord[indexs][index]!=='undefined',green:item === WatchWord[indexs][index]}"
                            >
                            {{item === ' ' ? '&nbsp;' : item}}
                        </span>
                    </div>
                    <div ref="input01" class="enter">
                        <input :class='["inp"+indexs]' v-model="enterSplit[indexs]">
                        <div class="PositionWord">
                            <span v-for="(item,index) in WatchWord[indexs]" :key="index" :class="{red:item!==typingList[index]}">{{item}}</span>
                        </div>
                    </div>
                </div>
            </div>
        </el-row>
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
            wordType: 'number', // number - 数字;  english - 英文;    chinese - 中文;
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
            splitSize: 60,
            currentWord: '', // 当前训练内容
            wordSplit: [], // 文章拆分
            enterSplit: [], // 写入内容拆分
            typingList: [], // 打字列表
            accuracy: '0.00', // 正确率
            typeWords: {
                number: '859435.23489234.234234523.4432432.234324.43200.5675.456543.454345643.456.546543.2245',
                english: "The past is gone and static. Nothing we can do will change it. Thefuture is before us and dynamic. Everything we do will affect it. " +
                    "You laugh at me for being different, but I laugh at you for being the same. " +
                    "The consequences of today are determined by the actions of the past. To change your future, alter your decisions today. " +
                    "Experience is a hard teacher because she gives the test first, the lesson afterwards. " +
                    "Ability may get you to the top, but it takes character to keep you there. " +
                    "Life is not measured by the number of breaths we take, but by the moments that take our breath away." +
                    "I have a simple philosophy: Fill what's empty. Empty what's full. Scratch where it itches. " +
                    "Don't go around saying the world owes you a living. The world owes you nothing. It was here first. " +
                    "Being happy doesn't mean that everything is perfect. It means that you've decided to look beyond the imperfections. " +
                    "Do not pray for tasks equal to your powers.Pray for powers equal to your tasks.Then the doing of work shall be no miracle,but you shall be the miracle. " +
                    "Fear not that the life shall come to an end, but rather fear that it shall never have a beginning. " +
                    "At twenty years of age, the will reigns; at thirty, the wit; and at forty, the judgment. " +
                    "What gets us into trouble is not what we don't know.It's what we know for sure that just ain't so. " +
                    "Life is like a hot bath. It feels good while you’re in it, but the longer you stay in, the more wrinkled you get. " +
                    "Life is too short to wake up in the morning with regrets. So, love the people who treat you right and forget about the ones who do not. " +
                    "People who are serious about the relation are moody as they have devoted a lot that makes them worry about gains and losses. ",
                chinese: `盼望着，盼望着，东风来了，春天的脚步近了。一切都像刚睡醒的样子，欣欣然张开了眼。山朗润起来了，水涨起来了，太阳的脸红起来了。小草偷偷地从土里钻出来，嫩嫩的，绿绿的。园子里，田野里，瞧去，一大片一大片满是的。坐着，躺着，打两个滚，踢几脚球，赛几趟跑，捉几回迷藏。风轻悄悄的，草软绵绵的。桃树、杏树、梨树，你不让我，我不让你，都开满了花赶趟儿。红的像火，粉的像霞，白的像雪。花里带着甜味儿；闭了眼，树上仿佛已经满是桃儿、杏儿、梨儿。花下成千成百的蜜蜂嗡嗡地闹着，大小的蝴蝶飞来飞去。野花遍地是：杂样儿，有名字的，没名字的，散在草丛里，像眼睛，像星星，还眨呀眨的。“吹面不寒杨柳风”，不错的，像母亲的手抚摸着你。风里带来些新翻的泥土的气息，混着青草味儿，还有各种花的香，都在微微润湿的空气里酝酿。鸟儿将窠巢安在繁花嫩叶当中，高兴起来了，呼朋引伴地卖弄清脆的喉咙，唱出宛转的曲子，与轻风流水应和着。牛背上牧童的短笛，这时候也成天嘹亮地响着。雨是最寻常的，一下就是三两天。可别恼。看，像牛毛，像花针，像细丝，密密地斜织着，人家屋顶上全笼着一层薄烟。树叶儿却绿得发亮，小草儿也青得逼你的眼。傍晚时候，上灯了，一点点黄晕的光，烘托出一片安静而和平的夜。在乡下，小路上，石桥边，有撑起伞慢慢走着的人，地里还有工作的农民，披着蓑戴着笠。他们的房屋，稀稀疏疏的在雨里静默着。天上风筝渐渐多了，地上孩子也多了。城里乡下，家家户户，老老小小，也赶趟儿似的，一个个都出来了。舒活舒活筋骨，抖擞抖擞精神，各做各的一份事去。“一年之计在于春”，刚起头儿，有的是工夫，有的是希望。春天像刚落地的娃娃，从头到脚都是新的，它生长着。春天像小姑娘，花枝招展的，笑着，走着。春天像健壮的青年，有铁一般的胳膊和腰脚，领着我们上前去。`
            }
        }
    },
    created() {
        this.currentWord = this.typeWords.number
        this.init()
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
                            if (this.$refs.input01.length - 1 > c) {
                                this.$refs.input01[c + 1].querySelector('input').focus()
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
            this.currentWord = this.typeWords[value]
            switch (value) {
                case 'number':
                    this.splitSize = 65
                    break
                case 'chinese':
                    this.splitSize = 40
                    break
                case 'english':
                    this.splitSize = 70
                    break
            }
            this.init()
        },
        timeChoose (value) {
            this.time.minute = value
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
            // 秒
            let secondTemp = Number(time.second)
            if (secondTemp) {
                secondTemp --
                time.second = secondTemp < 10 ? '0' + secondTemp : secondTemp
                return
            }
            // 分
            let minuteTemp = Number(time.minute)
            if (minuteTemp) {
                minuteTemp --
                time.minute = minuteTemp < 10 ? '0' + minuteTemp : minuteTemp
                time.second = 59
                return
            }
            // 时
            let hourTemp = Number(time.hour)
            if (hourTemp) {
                hourTemp --
                time.hour = hourTemp < 10 ? '0' + hourTemp : hourTemp
                time.minute = 59
                return
            }
            // 时、分、秒 全为0，则倒计时结束
            this.finish()
        },
        begin () {
            this.typingStatus = true
            this.start = true
            this.$refs.input01[0].querySelector('input').focus()
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
        restart () {
            clearTimeout(this.timer)
            this.start = true
            this.time = {
                hour: '00',
                minute: '00',
                second: '00'
            }
            this.accuracy = '0.00'
            this.$refs.input01[0].querySelector('input').focus()
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
            const { type, timing, time, enterSplit, accuracy } = this
            this.start = false
            this.typingStatus = false
            clearTimeout(this.timer)
            // 计算速度
            let consume = 0
            let timeTemp = {
                hour: '00',
                minute: '00',
                second: '00'
            }
            if (type === 'default') {
                consume = Number(time.hour) * 3600 + Number(time.minute) * 60 + Number(time.second)
                timeTemp = { ...time }
            } else {
                // 总时长
                let minuteTotal = Number(timing) * 60
                // 剩余时长
                let minuteSurplus = Number(time.hour) * 3600 + Number(time.minute) * 60 + Number(time.second)
                // 消耗时长
                consume = minuteTotal - minuteSurplus

                let timeSum = consume
                if (timeSum > 3600) {
                    let hourTemp = Math.floor(timeSum / 3600)
                    timeTemp.hour = hourTemp < 10 ? '0' + hourTemp : hourTemp
                    timeSum = timeSum - (hourTemp * 3600)
                }
                if (timeSum > 60) {
                    let minuteTemp = Math.floor(timeSum / 60)
                    timeTemp.minute = minuteTemp < 10 ? '0' + minuteTemp : minuteTemp
                    timeSum = timeSum - (minuteTemp * 60)
                }
                if (timeSum > 0) {
                    let secondTemp = timeSum
                    timeTemp.second = secondTemp < 10 ? '0' + secondTemp : secondTemp
                }
            }
            // speed: this.enterSplit.join('').length <= 0 || (this.time.hour - 0) * 120 + (this.time.minute - 0) * 60 + (this.time.second - 0) <= 0 ? "0" : Math.round((this.enterSplit.join('').length / ((this.time.hour - 0) * 120 + (this.time.minute - 0) * 60 + (this.time.second - 0))) * 60),
            let enterLength = enterSplit.join('').length
            let speed = enterLength > 0 ? Math.round(enterLength / (consume * 60)) : 0
            this.$alert(
                `<div><span>所用时间：</span><b style="color:#ff5151;">${timeTemp.hour}:${timeTemp.minute}:${timeTemp.second}</b></div>
                <div><span>打字速度：</span><b style="color:#ff5151;">${speed}字/分钟</b></div>
                <div><span>正确率：</span><b style="color:#ff5151;">${accuracy}%</b></div>`, 
                '训练结束', {
                dangerouslyUseHTMLString: true,
                confirmButtonText: '确定',
                center: true,
                callback: () => {
                    this.time = {
                        hour: '00',
                        minute: '00',
                        second: '00'
                    }
                    this.accuracy = '0.00'
                }
            })
        }
    }
}
</script>

<style lang="scss" scoped>
.row-style {
    margin: 10px 0;
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
        height: 400px;
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
.red {
    color: red;
    text-shadow: 1px 1px 5px #ff7171;
}
.green {
    color: #6200ff;
    text-shadow: 1px 1px 5px #ff7171;
}
</style>
