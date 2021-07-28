<template>
  <div>
    <el-row :gutter="20" style="margin-bottom: 10px;">
      <el-col :span="2">
        <el-button type="primary" @click="addColumn">加一列</el-button>
      </el-col>
      <el-col :span="2">
        <el-button type="primary" @click="subForm">提交表单</el-button>
      </el-col>
    </el-row>
    <el-form :model="tableForm" ref="testTable" label-width="0">
      <el-table :data="tableForm.testTable" border style="width: 100%;">
        <el-table-column prop="title" label="名称">
          <template slot-scope="scope">
            <el-form-item
              :prop="'testTable.' + scope.$index + '.title'"
              :rules='tableForm.tableRules.title'>
              <el-input v-model="scope.row.title" placeholder="必填项"></el-input>
            </el-form-item>
          </template>
        </el-table-column>
        <el-table-column prop="price" label="成本价格 (￥)">
          <template slot-scope="scope">
            <el-form-item :prop="'testTable.' + scope.$index + '.price'" :rules='tableForm.tableRules.price'>
              <el-input v-model="scope.row.price" placeholder="必填项"></el-input>
            </el-form-item>
          </template>
        </el-table-column>
        <el-table-column prop="salePrice" label="销售价格 (￥)">
          <template slot-scope="scope">
            <el-form-item :prop="'testTable.' + scope.$index + '.salePrice'" :rules='tableForm.tableRules.salePrice'>
              <el-input v-model="scope.row.salePrice" placeholder="必填项"></el-input>
            </el-form-item>
          </template>
        </el-table-column>
        <!-- <el-table-column v-if="item.checked.length > 0" :prop="item.name" :label="item.name" v-for="(item, index) in parameter" :key="index"></el-table-column> -->
        <el-table-column prop="length" label="长 (cm)">
          <template slot-scope="scope">
            <el-form-item :prop="'testTable.' + scope.$index + '.length'" :rules='tableForm.tableRules.basicPara'>
              <el-input v-model="scope.row.length" placeholder="非必选"></el-input>
            </el-form-item>
          </template>
        </el-table-column>
        <el-table-column prop="width" label="宽 (cm)">
          <template slot-scope="scope">
            <el-form-item :prop="'testTable.' + scope.$index + '.width'" :rules='tableForm.tableRules.basicPara'>
              <el-input v-model="scope.row.width" placeholder="非必选"></el-input>
            </el-form-item>
          </template>
        </el-table-column>
        <el-table-column prop="height" label="高 (cm)">
          <template slot-scope="scope">
            <el-form-item :prop="'testTable.' + scope.$index + '.height'" :rules='tableForm.tableRules.basicPara'>
              <el-input v-model="scope.row.height" placeholder="非必选"></el-input>
            </el-form-item>
          </template>
        </el-table-column>
        <el-table-column label="操作" align="center" width="100">
          <template slot-scope="scope">
            <el-button type="text" size="small" @click="delFun(scope)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
    </el-form>
  </div>
</template>

<script>
  import { isPrice } from '@/assets/js'
  export default {
    name: 'formVerify',
    data() {
      // 自定义校验规则
      const checkPrice = (rule, value, callback) => {
        if (!value) {
          return callback(new Error('不能为空'))
        }
        setTimeout(() => {
          if (isPrice(value)) {
            callback()
          } else {
            callback(new Error('格式错误'))
          }
        }, 100)
      }
      return {
        tableForm: {
          testTable: [
            {
              title: '手机',
              price: '800',
              salePrice: '1688.88',
              length: '18',
              width: '6',
              height: '0.4'
            },
            {},
            {}
          ],
          tableRules: {
            title: [
              { required: true, message: '不能为空', trigger: 'blur' }
            ],
            price: [
              { required: true, validator: checkPrice, trigger: 'blur' }
            ],
            salePrice: [
              { required: true, validator: checkPrice, trigger: 'blur' }
            ],
            basicPara: [
              { required: false }
            ]
          }
        }
      }
    },
    methods: {
      addColumn () {
        this.tableForm.testTable.push({})
      },
      delFun (scope) {
        this.$confirm(`确认删除此条数据吗吗?`, '提示', {
          confirmButtonText: '确认',
          cancelButtonText: '取消',
          type: 'warning',
          showClose: false
        }).then(() => {
          this.tableForm.testTable.splice(scope.$index, 1)
          this.$message({
            type: 'success',
            message: '删除成功!'
          })
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消'
          })
        })
      },
      subForm () {
        this.$refs['testTable'].validate((valid) => {
          if (valid) {
            this.$alert(this.tableForm.testTable, '表单内容', {
              confirmButtonText: '确定'
            })
          }
        })
      }
    }
  }
</script>

<style lang="scss" scoped>

</style>
