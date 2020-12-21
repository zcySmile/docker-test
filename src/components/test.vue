<!--
 * @Author: your name
 * @Date: 2020-12-04 16:24:41
 * @LastEditTime: 2020-12-04 16:47:01
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \testvue2\src\components\test.vue
-->
<template>
  <div  @click.stop="onclick">
   {{test}}
   {{name}}
  </div>
</template>

<script>
  export default {
    props:{
      name: Number
    },
    data() {
      return {
        test: 'dsfds'
      }
    },
    created() {
console.log('child-created')
    },
    beforeCreate() {
      console.log('child-beforeCreate')
    },
    beforeMount() {
      console.log('child-beforeMount')
    },
    mounted() {console.log('child-mounted')},
    beforeUpdate() {console.log('child-beforeUpdate')},
    updated() {console.log('child-updated')},
    beforeDestroy() {console.log('child-beforeDestroy')},
    destroyed() {console.log('child-destroyed')},
    methods: {
      onclick() {
        this.$emit('onclick', new Date())
      }
    }
  }
</script>

<style scoped>

</style>