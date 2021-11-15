# 【vue】局部刷新

这里通过 `provide/inject` 来实现局部刷新。

在做表格修改时，为了方便显示表格中哪些单元格进行了修改，我将修改过的单元格设置为红色，以背景作为修改的标记。当保存单元格中的修改后，红色背景需要去除，还原为初始的状态。数据不需要刷新就可以重新渲染，但是，背景修改是修改的dom节点，不刷新无法重新渲染，所以选择了局部刷新来达到我想要的效果。此外，我只需要刷新表格，而不需要刷新页面上的其他部分。所以，把表格单独拎出来，作为页面的子组件，在需要刷新的时候，只刷新子组件就可以了。

这篇文章使用的测试代码，我进行了简化。有这样一个页面，有很多数据和一个表格，可以修改年龄这一列的值。当我修改表格中的数据之后，单元格背景会变成红色，从而标记已修改的数据。点击按钮保存修改，会刷新表格，去除红色背景显示。

![image-20211115105248236](https://gitee.com/withered-wood/picture/raw/master/20211115112501.png)



这里插一句其他的。

vue ，改变数据，就可以改变页面上的渲染。从这个角度来说，父组件改变了表格数据，子组件自然会相应的改变数据，这一点，不需要局部刷新就可以做到。

那么，什么情况下需要用到局部刷新呢？？需要修改页面上的dom节点时，更准确的来说是（我目前遇到的是这种场景），手动修改某个节点的属性之后，想要把修改撤销，使该dom节点恢复到初始状态（不是数据恢复到初始状态）。当页面加载完成之后，数据可以变化，但是dom节点的变化并不是那么好改变的。

**准备测试的基础页面**

父组件页面显示和子组件中表格的显示和修改过程不在这里展示说明，完整的代码可以在下载项目后查看。

## 核心代码

### 控制是否刷新 isRefresh

父组件中通过一个变量 `isRefresh`  ，控制子组件是否刷新。

```js
<child :value="tableData" v-if="isRefresh"/>
    
data() {
    return {
        isRefresh: true  // 是否刷新
    }
},
```

### 刷新方法 reload()

局部刷新方法如下：

```js
methods: {
    // 局部刷新
    reload() {
        this.isRefresh = false
        this.$nextTick(function () {
            this.isRefresh = true
        })
    },
}
```

### provide/inject

想要实现局部刷新，要在父组件中添加 `provide()` 方法

```js
export default {
    provide() { //提供
        return {
            reload: this.reload
        }
    }
}
```

在子组件中添加 `inject`

```js
export default {
	inject: ['reload']
}
```



------

完整的代码地址：

[https://github.com/witheredwood/vue-study](https://github.com/witheredwood/vue-study)

下载项目后在项目终端中输入命令：`npm run serve` 启动项目