<template>
  <div id="myitems" :class="{'itemdone': status}">
    <span class='iconspan' :class="{'iconfont': ishover||status, 'icon-select': ishover||status, 'icondone': status}" @mouseenter.stop="ishover = true" @mouseleave.stop="ishover = false" @click="setDone"></span>
    {{ itemtoshow.name }}
  </div>
</template>

<script>
export default {
  name: 'MyItems',
  data() {
    return {
      ishover: false
    }
  },
  props: {
    item: {
      type: Object,
      required: false
    },
    status: {
      type: Boolean,
      required: true
    }
  },
  computed: {
    itemtoshow: {
      get() {
        return this.item
      }
    }
  },
  methods: {
    setDone(){
      this.$parent.setDone(this.item)
    }
  }
}
</script>

<style scoped lang='less'>
  #myitems {
    position: relative;
    background-color: #f4f5f6;
    padding: 0 30px 0 50px;
    margin-bottom: 3px;
    height: 50px;
    border-radius: 5px;
    font-size: 15px;
    line-height: 50px;
    user-select: none;
    .iconspan {
      position: absolute;
      left: 20px;
      top: 25px;
      margin-top: -10px;
      width: 20px;
      height: 20px;
      border: solid 2px #616161;
      border-radius: 50%;
    }
    .iconfont {
      text-align: center;
      line-height: 20px;
      font-size: 15px;
      font-weight: bold;
    }
  }
  #myitems>.iconfont.icondone {
    background-color: #3063ab;
    color: #f4f5f6;
    border-color: #3063ab;
  }
  #myitems.itemdone {
    color: #7b7b7b;
    text-decoration: line-through;
    text-decoration-color: #7b7b7b;
  }
</style>
