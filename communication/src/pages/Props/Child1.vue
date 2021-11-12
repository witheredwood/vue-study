<template>
    <div class="child-container">
        <h2>子组件1: 修改子组件中的变量</h2>
        <p>这种方式，修改子组件中变量的值，父组件传递给子组件的变量 name 的值不会改变</p>
        <p>name: {{name}}</p>
        <p>localName: {{localName}}</p>
        <el-button type="primary" @click="handleButtonClick">点击改变子组件名称(只能改变一次)</el-button>
    </div>
</template>

<script>
    export default {
        name: "Child1",
        props: {
            name: String
        },
        data() {
            return {
                // 将父组件传递到子组件中的值赋给子组件中的变量
                localName: this.name
            }
        },
        methods: {
            // 点击按钮后，修改子组件中的变量，而不是修改父组件传递过来的 name 变量
            handleButtonClick() {
                this.localName = '【子组件1】修改之后的值';
            },
        }
    }
</script>

<style scoped>
</style>
