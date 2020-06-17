<template>
    <div class="content">
        <div class="item-1" id="rangeDom"></div>
        <div class="item-2" id="wordCloudDom"></div>
        <div class="item-3" id="gaugeDom"></div>
        <div class="item-4" id="roseDom"></div>
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
        return {
            rangeData: [
                { type: '分类一', values: [76, 100] },
                { type: '分类二', values: [56, 108] },
                { type: '分类三', values: [38, 129] },
                { type: '分类四', values: [58, 155] },
                { type: '分类五', values: [45, 120] },
                { type: '分类六', values: [23, 99] },
                { type: '分类七', values: [18, 56] },
                { type: '分类八', values: [18, 34] }
            ],
            wordData: [{
                id: 1,
                word: 'Vue',
                weight: 100

            }, {
                id: 2,
                word: 'Vuex',
                weight: 20
            }, {
                id: 3,
                word: 'Element UI',
                weight: 80,

            }, {
                id: 4,
                word: 'Vue-Router',
                weight: 60
            }, {
                id: 5,
                word: 'g2plot',
                weight: 20,

            }, {
                id: 6,
                word: 'wangeditor',
                weight: 10
            }],
            roseData: [
                {
                    type: '分类一',
                    value: 27,
                },
                {
                    type: '分类二',
                    value: 25,
                },
                {
                    type: '分类三',
                    value: 18,
                },
                {
                    type: '分类四',
                    value: 15,
                },
                {
                    type: '分类五',
                    value: 10,
                },
                {
                    type: '其它',
                    value: 5,
                },
            ]
        }
    },
    mounted () {
        this.rangePlot().render()
        this.wordCloudPlot().render()
        this.gaugePlot().render()
        this.rosePlot().render()
    },
    methods: {
        rangePlot () {
            return (
                new G2Plot.RangeColumn(document.getElementById('rangeDom'), {
                    data: this.rangeData,
                    xField: 'type',
                    yField: 'values',
                    color: 'l(90) 0:#3e5bdb 1:#b4d9e4',
                    columnStyle: {
                        fillOpacity: 0.8,
                    },
                    label: {
                        visible: true,
                        topStyle: {
                            fill: '#3e5bdb',
                        },
                        bottomStyle: {
                            fill: '#b4d9e4',
                        },
                    }
                })
            )
        },
        wordCloudPlot () {
            let that = this
            return (
                new G2Plot.WordCloud(document.getElementById('wordCloudDom'), {
                    data: that.wordData,
                    height: '280',
                    width: '400',
                    shape: 'triangle-forward',
                    forceFit: true,
                    selected: -1,
                    wordStyle: {
                        fontSize: [20, 40],
                        gridSize: 16,
                        rotation: [0, 0]
                    },
                    onWordCloudClick (item, dimension, evt, fn) {
                        that.$message({
                            message: `点击了${item.word}`,
                            type: 'success'
                        })
                    }
                })
            )
        },
        gaugePlot () {
            return (
                new G2Plot.MeterGauge(document.getElementById('gaugeDom'), {
                    value: 80,
                    min: 0,
                    max: 100,
                    range: [0, 25, 50, 75, 100],
                    statistic: {
                        visible: true,
                        text: 'nice',
                        color: '#faad14',
                    },
                    color: ['#39B8FF', '#52619B', '#43E089', '#C0EDF3']
                })
            )
        },
        rosePlot () {
            return (
                new G2Plot.Rose(document.getElementById('roseDom'), {
                    forceFit: true,
                    radius: 1,
                    data: this.roseData,
                    radiusField: 'value',
                    categoryField: 'type',
                    colorField: 'type',
                    legend: {
                        visible: true,
                        position: 'bottom-center'
                    },
                    label: {
                        visible: true,
                        type: 'outer',
                        content: (text) => text.value,
                    }
                })
            )
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
    div {
        border: 1px solid #ebeef5;
        box-shadow: 0 2px 12px 0 rgba(0,0,0,.1);
    }
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
}
</style>
