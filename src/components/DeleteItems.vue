<template>
  <div id="deleteitem" @click="deleteItems">
    <span class="iconfont icon-ashbin"></span>
  </div>
</template>

<script>
export default {
  name: 'DeleteItems',
  data () {
    return {
    }
  },
  methods: {
    deleteItems() {
        this.$parent.$parent.deleteItems()
    }
  }
}
</script>

<style scoped lang='less'>
#deleteitem {
    width: 50px;
    height: 50px;
    background-color: #fff;
    line-height: 50px;
    text-align: center;
    border-radius: 10px;
    &:hover {
        background-color: #f4f5f6;
    }
    .iconfont {
        font-size: 30px;
    }
}
</style>
