<template>
    <div class="content">
        <div class="item-1" ref="pictorial" id="pictorial"></div>
        <div class="item-2" ref="gauge" id="gauge"></div>
        <div class="item-3" ref="line" id="line"></div>
        <div class="item-4" ref="bar" id="bar"></div>
        <div class="item-5">
            <el-timeline>
                <el-timeline-item timestamp="2020/6/14" placement="top" type="success">
                    <h4>动态加载JS/CSS-组件</h4>
                </el-timeline-item>
                <el-timeline-item timestamp="2020/6/13" placement="top" type="success">
                    <h4>富文本编辑-组件</h4>
                </el-timeline-item>
                <el-timeline-item timestamp="2020/6/12" placement="top" type="success">
                    <h4>Demo 演示项目上线</h4>
                </el-timeline-item>
            </el-timeline>
        </div>
    </div>
</template>

<script>
export default {
    name: 'home',
    components: {},
    data() {
        return {}
    },
    mounted () {
        this.getData()
    },
    activated() {
    },
    computed: {},
    watch: {},
    methods: {
        getData () {
            // 象形柱图
            const pictorialChart = this.$refs.pictorial
            // 表盘
            const gaugeChart = this.$refs.gauge
            // 折线图
            const lineChart = this.$refs.line
            // 饼图
            const barChart = this.$refs.bar

            if (pictorialChart) {
                const pictorial = echarts.init(
                    document.getElementById('pictorial')
                )
                const category = []
                let dottedBase = +new Date()
                const lineData = []
                const barData = []

                for (let i = 0; i < 20; i++) {
                    const date = new Date(dottedBase += 3600 * 24 * 1000);
                    category.push([
                        date.getFullYear(),
                        date.getMonth() + 1,
                        date.getDate()
                    ].join('-'));
                    let b = Math.random() * 200;
                    let d = Math.random() * 200;
                    barData.push(b)
                    lineData.push(d + b);
                }
                const pictorialOption = {
                    backgroundColor: '#0f375f',
                    tooltip: {
                        trigger: 'axis',
                        axisPointer: {
                            type: 'shadow'
                        }
                    },
                    legend: {
                        data: ['line', 'bar'],
                        textStyle: {
                            color: '#ccc'
                        }
                    },
                    xAxis: {
                        data: category,
                        axisLine: {
                            lineStyle: {
                                color: '#ccc'
                            }
                        }
                    },
                    yAxis: {
                        splitLine: {show: false},
                        axisLine: {
                            lineStyle: {
                                color: '#ccc'
                            }
                        }
                    },
                    series: [{
                        name: 'line',
                        type: 'line',
                        smooth: true,
                        showAllSymbol: true,
                        symbol: 'emptyCircle',
                        symbolSize: 15,
                        data: lineData
                    }, {
                        name: 'bar',
                        type: 'bar',
                        barWidth: 10,
                        itemStyle: {
                            barBorderRadius: 5,
                            color: new echarts.graphic.LinearGradient(
                                0, 0, 0, 1,
                                [
                                    {offset: 0, color: '#14c8d4'},
                                    {offset: 1, color: '#43eec6'}
                                ]
                            )
                        },
                        data: barData
                    }, {
                        name: 'line',
                        type: 'bar',
                        barGap: '-100%',
                        barWidth: 10,
                        itemStyle: {
                            color: new echarts.graphic.LinearGradient(
                                0, 0, 0, 1,
                                [
                                    {offset: 0, color: 'rgba(20,200,212,0.5)'},
                                    {offset: 0.2, color: 'rgba(20,200,212,0.2)'},
                                    {offset: 1, color: 'rgba(20,200,212,0)'}
                                ]
                            )
                        },
                        z: -12,
                        data: lineData
                    }, {
                        name: 'dotted',
                        type: 'pictorialBar',
                        symbol: 'rect',
                        itemStyle: {
                            color: '#0f375f'
                        },
                        symbolRepeat: true,
                        symbolSize: [12, 4],
                        symbolMargin: 1,
                        z: -10,
                        data: lineData
                    }]
                }
                pictorial.setOption(pictorialOption)
            }
            if (gaugeChart) {
                const gauge = echarts.init(
                    document.getElementById('gauge')
                )
                const gaugeOption = {
                    backgroundColor: '#00bfbf',
                    tooltip: {
                        formatter: '{a} <br/>{b} : {c}%'
                    },
                    series: [
                        {
                            name: '业务指标',
                            type: 'gauge',
                            detail: {formatter: '{value}%'},
                            data: [{value: 50, name: '完成率'}]
                        }
                    ]
                }
                gauge.setOption(gaugeOption)
            }
            if (lineChart) {
                const line = echarts.init(
                    document.getElementById('line')
                )
                const lineOption = {
                    backgroundColor: 'skyblue',
                    xAxis: {
                        type: 'category',
                        data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
                    },
                    yAxis: {
                        type: 'value'
                    },
                    series: [{
                        data: [120, 200, 150, 80, 70, 110, 130],
                        type: 'line',
                        symbol: 'triangle',
                        symbolSize: 20,
                        lineStyle: {
                            color: 'green',
                            width: 4,
                            type: 'dashed'
                        },
                        itemStyle: {
                            borderWidth: 3,
                            borderColor: 'yellow',
                            color: 'blue'
                        }
                    }]
                }
                line.setOption(lineOption)
            }
            if (barChart) {
                const bar = echarts.init(
                    document.getElementById('bar')
                )
                const barOption = {
                    backgroundColor: '#6dcc84',
                    angleAxis: {
                        type: 'category',
                        data: ['周一', '周二', '周三', '周四', '周五', '周六', '周日']
                    },
                    radiusAxis: {
                    },
                    polar: {
                    },
                    series: [{
                        type: 'bar',
                        data: [1, 2, 3, 4, 3, 5, 1],
                        coordinateSystem: 'polar',
                        name: 'A',
                        stack: 'a'
                    }, {
                        type: 'bar',
                        data: [2, 4, 6, 1, 3, 2, 1],
                        coordinateSystem: 'polar',
                        name: 'B',
                        stack: 'a'
                    }, {
                        type: 'bar',
                        data: [1, 2, 3, 4, 1, 2, 5],
                        coordinateSystem: 'polar',
                        name: 'C',
                        stack: 'a'
                    }],
                    legend: {
                        show: true,
                        data: ['A', 'B', 'C']
                    }
                }
                bar.setOption(barOption)
            }
            window.addEventListener('resize', function () {
                pictorial.resize()
                gauge.resize()
                line.resize()
                bar.resize()
            })
        }
    }
}
</script>

<style lang="scss" scoped>
.content {
    width: 100%;
    height: 100%;
    display: grid;
    grid-template-columns: 32% 32% 32%;
    grid-template-rows: 32% 32% 32%;
    grid-row-gap: 2%;
    grid-column-gap: 1%;
}
.item-1 {
    grid-column: 1/3;
    grid-row: 1/3;
}
.item-2 {
    grid-column: 3/4;
    grid-row: 1/2;
}
.item-3 {
    grid-column: 1/2;
    grid-row: 3/4;
}
.item-4 {
    grid-column: 2/3;
    grid-row: 3/4;
}
.item-5 {
    grid-column: 3/4;
    grid-row: 2/4;
    padding: 20px;
    border: 1px solid #ebeef5;
    box-shadow: 0 2px 12px 0 rgba(0,0,0,.1);
}
</style>
