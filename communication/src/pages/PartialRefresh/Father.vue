<template>
    <div class="father-container">
        <h1>局部刷新</h1>
        <p>备注：</p>
        <p>双击年龄单元格，可以修改数据，修改后的数据背景会变红。</p>
        <p>点击刷新按钮之后，可以去掉修改数据的背景。</p>
        <el-button type="primary" plain @click="refreshTableData">保存修改（局部刷新：点击刷新表格）</el-button>
        <child :value="tableData" v-if="isRefresh"/>
    </div>
</template>

<script>
    import Child from "./Child";

    export default {
        name: "Father",
        components: {
            Child
        },
        data() {
            return {
                tableData: [
                    {name: '张三', age: 3, sex: '男'},
                    {name: '李四', age: 4, sex: '男'},
                    {name: '王五', age: 5, sex: '女'},
                ],
                isRefresh: true  // 是否刷新
            }
        },
        provide() { //提供
            return {
                reload: this.reload
            }
        },
        methods: {
            // 局部刷新
            reload() {
                this.isRefresh = false
                this.$nextTick(function () {
                    this.isRefresh = true
                })
            },
            // 点击按钮，更新表格数据，刷新表格
            refreshTableData() {
                // 刷新表格
                this.reload()
            }
        }
    }
</script>

<style scoped>
    .father-container h1 {
        text-align: center;
    }

    .el-button {
        margin: 10px 0;
    }
</style>
