<template>
    <div class="child-container">
        <el-table :data="value" border stripe
                  @cell-click="updateValueAndBackground">
            <el-table-column type="index" label="序号" width="50" fixed :resizable="false"></el-table-column>
            <el-table-column prop="name" label="姓名" min-width="100" align="center">
            </el-table-column>
            <el-table-column prop="age" label="年龄" min-width="100" align="center">
                <template slot-scope="scope">
                    <el-input v-model="scope.row.age"
                              @blur="editInputValue(scope.$index,'age', scope.row.age, $event)"
                              @keyup.enter.native="handleInputEnterEvent"
                              v-if="inputRowIndex === scope.row && inputColumnIndex === 'age'">
                    </el-input>
                    <p v-else>{{scope.row.age}}</p>
                </template>
            </el-table-column>
            <el-table-column prop="sex" label="性别" min-width="100" align="center"></el-table-column>
        </el-table>
    </div>
</template>

<script>
    export default {
        name: "Child",
        props: {
            value: Array
        },
        data() {
            return {
                valueCopy: JSON.parse(JSON.stringify(this.value)),  // 副本
                inputRowIndex: '',  // 当前正在修改的单元格的行下标
                inputColumnIndex: '' // 当前正在修改的单元格的列下标
            }
        },
        inject: ['reload'],
        methods: {
            // 单击某个单元格，在表格中编辑单元格
            updateValueAndBackground(row, column, cell, event) {
                console.log('【row】:', row, '【col】:', column, '【cel】:', cell, '【event】:', event)
                this.inputRowIndex = row
                this.inputColumnIndex = column.property
            },
            // 输入框失去焦点
            editInputValue(index, name, value, event) {
                let classDom = event.target.parentElement.parentElement
                console.log(classDom)
                console.log(this.valueCopy[index][name])
                console.log(value)
                // 如果单元格的值发生变化，做出标记
                if (this.valueCopy[index][name] != value) {
                    this.inputRowIndex = ''
                    this.inputColumnIndex = ''
                    // 标记修改过的单元格
                    classDom.style['background-color'] = 'rgb(139,0,0,0.3)'
                }
            },
            // 按下enter键后退出编辑单元格
            handleInputEnterEvent() {
                this.inputRowIndex = ''
                this.inputColumnIndex = ''
            }
        }
    }
</script>

<style scoped>
</style>
