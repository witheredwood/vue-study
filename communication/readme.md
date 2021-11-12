# 【vue】组件通信：用props交流

组件之间实现通信的方式主要有三种，这里记录的是使用props进行通信的方式。这种通信方式适合用于父子组件之间的通信。有时候需要在一个组件内需要引入另一个组件，我这里说的是这种情况，具体的可以看代码（网上有很多父子组件的说法，我也没理解 ╮(╯▽╰)╭ ）。

父组件向子组件传递数据，是单向的，也就是，父组件传递给子组件的数据（变量），子组件不能原路修改，不能在自己的领域内修改父组件的数据（变量）。

如果父组件传递给组件的数据放在变量 `name` 中， 子组件不能向修改自己页面 `data()` 中定义的变量那样，直接修改 `name` （可以显示数据）。那么如果想要修改父组件传过来的数据，有哪些方式呢。

自然，通过props通信，还是有两种方式可以进行修改：

- 把父组件的数据拷贝一份到自己的领域中，然后进行其他操作。这种方式不会影响父组件中的数据。
- 就是要改父组件的数据。这种方式自然会影响父组件中的数据。

## 1. 修改子组件的变量

这种方式，类似于父组件给子组件一份文件，子组件拿着文件的备份，随意的进行操作。

父组件传递给子组件一个变量 `name` ，子组件将变量 `name` ， 赋值给自己的变量 `localName` 。拿到父组件给的值后，子组件通过操作 `localName` 在页面上进行显示、修改等操作。

这种方式，对 `localName` 的修改不会影响父组件传递给子组件的变量 `name` ，在父组件页面中变量不会受子组件中值的改变而受到影响。

这种方式的核心代码是下面一行代码：

```js
localName: this.name
```

在子组件中将父组件给的数据 `name` 赋值给子组件自己的变量 `localName`

### 1.1 父组件

下面的测试代码，在父组件 `Father` 中引入了子组件 `Child1`。父组件 `Father`  向子组件  `Child1` 传递的数据放在变量 `childName` 中，父组件 `Father`  和子组件  `Child1` 通信的桥梁是 `name `，子组件  `Child1`  在 `props` 中接收的也是 `name` ， 而不是放数据的变量 `childName` 。

父组件的代码如下：

```vue
<template>
    <div class="father-container">
        <h1>这是父组件页面</h1>
        <el-divider/>
        <child1 :name="childName"/>
    </div>
</template>

<script>
    import Child1 from "./Child1";

    export default {
        name: "Father",
        components: {
            Child1
        },
        data() {
            return {
                // 父组件要传递给子组件的变量
                childName: '父组件传递给子组件1的值',
            }
        },
        watch: {
            // 监控变量 childName 的改变
            childName: function () {
                console.log('chileName 的值改变了，改变之后的值：', this.childName)
            },
        }
    }
</script>

<style scoped>
    .father-container h1 {
        text-align: center;
    }
</style>

```

### 1.2 子组件

子组件通过 `props` 接收父组件给的数据， 接收的变量是 `name` ， 而不是放数据的变量 `childName` 。拿到数据之后会把 `name` 中的数据赋值到子组件中的变量 `localName` 。

子组件的测试代码如下：

```vue
<template>
    <div class="child-container">
        <h2>子组件: 修改子组件中的变量</h2>
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
                this.localName = '修改之后的名称';
            },
        }
    }
</script>
```

### 1.3 查看父组件中变量是否变化

在上面父组件的代码中，包含了对变量的监控。相关代码如下：

```js
watch: {
    childName: function () {
        console.log('childName：', this.childName)
    },
}
```

父组件监控了变量 `childName` 的值，一旦 `childName` 的值变化，会在浏览器终端输出提示信息。运行程序后，打开浏览器终端，可以看到没有任何输出。这是因为 `watch` 中监控的变量，只有改变了才会触发 `watch` 。

## 2. 修改父组件的变量

这种方式，类似于父组件给子组件一份文件，子组件拿着文件的原件进行操作，子组件的操作会影响到父组件。

在上面代码的基础之上，增加子组件2的测试。这种方式的重点是下面两行代码

```html
<child2 :name.sync="childName2"/>
```

父组件传递给子组件的变量后加上 `.sync`

```js
 this.$emit('update:name', '【子组件2】修改之后的值')
```

子组件通过 `this.$emit('update:[变量名]', [变量值])` 将改变后的值传递给父组件

### 2.1 父组件

下面的测试代码，在父组件 `Father` 中引入了子组件 `Child2`。父组件 `Father`  向子组件  `Child2` 传递的数据放在变量 `childName2` 中，父组件 `Father`  和子组件  `Child2` 通信的桥梁是 `name `，子组件  Child2在 `props` 中接收的也是 `name` ， 而不是放数据的变量 `childName2` 。这里多的一点就是 `:name` 变成了 `:name.sync`

```vue
<template>
    <div class="father-container">
        <h1>这是父组件页面</h1>
        <el-divider/>
        <child2 :name.sync="childName2"/>
    </div>
</template>

<script>
    import Child2 from "./Child2";

    export default {
        name: "Father",
        components: {
            Child2
        },
        data() {
            return {
                childName2: '父组件传递给子组件2的值'
            }
        },
        watch: {
            childName2: function () {
                console.log('childName2：',this.childName2)
            }
        }
    }
</script>
```

同样在父组件中监控变量 `childName2` 的变化。

### 2.2 子组件

子组件通过 `props` 接收父组件给的数据， 接收的变量是 `name` ， 而不是放数据的变量 `childName2` 。点击按钮后，子组件会向父组件发送一个以 `update:` 开头的事件，并将修改之后的数据一块发送过去。父组件会自动修改它 `name` 所绑定的变量 `childName2` ，`childName2` 改变之后，子组件收到的值也会相应的改变。

子组件的测试代码如下：

```vue
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
```

### 2.3 查看父组件中变量是否变化

在上面父组件的代码中，包含了对变量的监控。相关代码如下：

```js
watch: {
    childName2: function () {
        console.log('childName2：', this.childName2)
    },
}
```

父组件监控了变量 `childName2` 的值，一旦 `childName2` 的值变化，会在浏览器终端输出提示信息。运行程序后，打开浏览器终端，可以看到 `childName2` 的值改变了。



完整的代码地址：

https://github.com/witheredwood/vue-study

下载项目后在项目终端中输入命令：`npm run serve` 启动项目
