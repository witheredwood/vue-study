<template>
    <div class="father-container">
        <h1>这是父组件页面</h1>
        <el-divider/>
        <child1 :name="childName"/>
        <el-divider/>
        <child2 :name.sync="childName2"/>
    </div>
</template>

<script>
    import Child1 from "./Child1";
    import Child2 from "./Child2";

    export default {
        name: "Father",
        components: {
            Child1, Child2
        },
        data() {
            return {
                // 父组件要传递给子组件的变量
                childName: '父组件传递给子组件1的值',
                childName2: '父组件传递给子组件2的值'
            }
        },
        watch: {
            // 监控变量 childName 的改变
            childName: function () {
                console.log('childName：', this.childName)
            },
            childName2: function () {
                console.log('childName2：', this.childName2)
            }
        }
    }
</script>

<style scoped>
    .father-container h1 {
        text-align: center;
    }
</style>
