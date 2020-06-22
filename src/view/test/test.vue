<template>
    <div>
        <h2>Test</h2>
        <el-form :model="tableForm" :rules="tableForm.tableRules" ref="spuTable" label-width="0">
            <el-table :data="tableForm.spuTable" v-loading="Loading" border style="width: 100%">
                <el-table-column prop="sn" label="SKU编码">
                    <template slot-scope="scope">
                        <el-form-item :prop="'spuTable.' + scope.$index + '.sn'" :rules='tableForm.tableRules.sn'>
                            <el-input v-model="scope.row.sn" @change="monitor" :disabled="Boolean(scope.row.id)"></el-input>
                        </el-form-item>
                    </template>
                </el-table-column>
                <el-table-column prop="barCode" label="条码">
                    <template slot-scope="scope">
                        <el-form-item :prop="'spuTable.' + scope.$index + '.barCode'" :rules='tableForm.tableRules.barCode'>
                            <el-input v-model="scope.row.barCode" @change="monitor" :disabled="Boolean(scope.row.id)"></el-input>
                        </el-form-item>
                    </template>
                </el-table-column>
                <el-table-column prop="title" label="名称">
                    <template slot-scope="scope">
                        <el-form-item :prop="'spuTable.' + scope.$index + '.title'" :rules='tableForm.tableRules.title'>
                            <el-input v-model="scope.row.title"></el-input>
                        </el-form-item>
                    </template>
                </el-table-column>
                <el-table-column prop="price" label="成本价格">
                    <template slot-scope="scope">
                        <el-form-item :prop="'spuTable.' + scope.$index + '.price'" :rules='tableForm.tableRules.price'>
                            <el-input v-model="scope.row.price"></el-input>
                        </el-form-item>
                    </template>
                </el-table-column>
                <el-table-column prop="salePrice" label="销售价格">
                    <template slot-scope="scope">
                        <el-form-item :prop="'spuTable.' + scope.$index + '.salePrice'" :rules='tableForm.tableRules.salePrice'>
                            <el-input v-model="scope.row.salePrice"></el-input>
                        </el-form-item>
                    </template>
                </el-table-column>
                <el-table-column v-if="item.checked.length > 0" :prop="item.name" :label="item.name" v-for="(item, index) in parameter" :key="index"></el-table-column>
                <el-table-column prop="length" label="长(厘米)">
                    <template slot-scope="scope">
                        <el-form-item :prop="'spuTable.' + scope.$index + '.length'" :rules='tableForm.tableRules.basicPara'>
                            <el-input v-model="scope.row.length" placeholder="非必选"></el-input>
                        </el-form-item>
                    </template>
                </el-table-column>
                <el-table-column prop="width" label="宽(厘米)">
                    <template slot-scope="scope">
                        <el-form-item :prop="'spuTable.' + scope.$index + '.width'" :rules='tableForm.tableRules.basicPara'>
                            <el-input v-model="scope.row.width" placeholder="非必选"></el-input>
                        </el-form-item>
                    </template>
                </el-table-column>
                <el-table-column prop="height" label="高(厘米)">
                    <template slot-scope="scope">
                        <el-form-item :prop="'spuTable.' + scope.$index + '.height'" :rules='tableForm.tableRules.basicPara'>
                            <el-input v-model="scope.row.height" placeholder="非必选"></el-input>
                        </el-form-item>
                    </template>
                </el-table-column>
                <el-table-column prop="weight" label="重量(千克)">
                    <template slot-scope="scope">
                        <el-form-item :prop="'spuTable.' + scope.$index + '.weight'" :rules='tableForm.tableRules.basicPara'>
                            <el-input v-model="scope.row.weight" placeholder="非必选"></el-input>
                        </el-form-item>
                    </template>
                </el-table-column>
                <el-table-column label="操作" width="60">
                    <template slot-scope="scope">
                        <el-button type="text" size="small" @click="delBtn(scope)">删除</el-button>
                    </template>
                </el-table-column>
            </el-table>
        </el-form>
    </div>
</template>

<script>
export default {
    name: 'test',
    components: {},
    data() {
        return {
            tableForm: {
                spuTable: [
                    {}
                ],
                tableRules: {
                    title: [
                        { required: true, message: '不能为空', trigger: 'blur' }
                    ],
                    price: [
                        { required: true, message: '不能为空', trigger: 'blur' }
                    ],
                    salePrice: [
                        { required: true, message: '不能为空', trigger: 'blur' }
                    ],
                    sn: [
                        { required: true, message: '不能为空', trigger: 'blur' }
                    ],
                    barCode: [
                        { required: true, message: '不能为空', trigger: 'blur' }
                    ],
                    basicPara: [
                        { required: true, message: '不能为空', trigger: 'blur' }
                    ]
                }
            }
        }
    },
    created() {
    },
    activated() {
    },
    computed: {},
    watch: {},
    methods: {}
}
</script>

<style lang="scss" scoped>

</style>
