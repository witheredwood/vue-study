<template>
    <div class="child-container">
        <h2>子组件2:修改父组件中的变量 </h2>
        <p>这种方式，修改父组件中变量 name 的值，子组件的值也会相应的改变</p>
        <p>name: {{name}}</p>
        <el-button type="primary" @click="handleButtonClick">点击改变子组件名称(只能改变一次)</el-button>
    </div>
</template>

<script>
    export default {
        name: "Child2",
        props: {
            name: String
        },
        methods: {
            // 修改父组件中传递给子组件的变量的值，修改父组件中的值后，组件中的值也会相应的改变
            handleButtonClick() {
                // 修改父组件中的变量
                this.$emit('update:name', '【子组件2】修改之后的值')
            },
        }
    }
</script>

<style scoped>
</style>
