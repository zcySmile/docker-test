<!--
 * @Author: your name
 * @Date: 2020-12-04 16:27:44
 * @LastEditTime: 2020-12-04 17:06:44
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \testvue2\src\components\HelloWorld.vue
-->
<template>
  <div class="hello" @click="ondivClick">
    <h1>{{ msg }}</h1>
    <h2>{{name}}</h2>
    <h3>{{date}}</h3>
    <p>
      For a guide and recipes on how to configure / customize this project,<br>
      check out the
      <a href="https://cli.vuejs.org" target="_blank" rel="noopener">vue-cli documentation</a>.
    </p>
    <h3>Installed CLI Plugins</h3>
    <ul>
      <li><a href="https://github.com/vuejs/vue-cli/tree/dev/packages/%40vue/cli-plugin-babel" target="_blank" rel="noopener">babel</a></li>
      <li><a href="https://github.com/vuejs/vue-cli/tree/dev/packages/%40vue/cli-plugin-eslint" target="_blank" rel="noopener">eslint</a></li>
    </ul>
    <h3>Essential Links</h3>
    
    <test @hook:mounted="getDate" :name="name" @onclick="getDate"></test>
  </div>
</template>

<script>
import test from './test.vue'
export default {
  name: 'HelloWorld',
  props: {
    msg: String
  },
  data() {return {
    name: 0,
    date: ''
  }},
  components:{test},
  created() {
console.log('parent-created')
    },
    beforeCreate() {
      console.log('parent-beforeCreate')
    },
    beforeMount() {
      console.log('parent-beforeMount')
    },
    mounted() {console.log('parent-mounted')},
    beforeUpdate() {console.log('parent-beforeUpdate')},
    updated() {console.log('parent-updated')},
    beforeDestroy() {console.log('parent-beforeDestroy')},
    destroyed() {console.log('parent-destroyed')},
    methods: {
      ondivClick(){
        this.name += 1
      },
      getDate(data){
        console.log('mounted................')
        this.date = data
      }
    }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h3 {
  margin: 40px 0 0;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>
