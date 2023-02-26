<template>
  <div class="list" :class="{ active: this.active }" @click.stop="activate">
    <div class="icon" :class="{ iconactive: this.active }"><span class="iconfont" :class="this.iconfont"
        :style="{ color: iconcolor }"></span></div>
    <input class="listname" :class="{ active: this.active }" type="text" v-model="mylistname" ref="listname"
      :disabled="this.listindex < 3" @focus="focused" @keydown="addList">
  </div>
</template>

<script>
export default {
  name: 'TodoList',
  data: function () {
    return {
      mylistname: this.listname,
      active: this.$parent.activelistindex === parseInt(this.listindex)
    }
  },
  props: {
    listname: {
      type: String,
      required: false,
      default: '无标题列表'
    },
    iconfont: {
      type: String,
      required: false,
      default: 'icon-menu'
    },
    iconcolor: {
      type: String,
      required: false,
      default: "#3063ab"
    },
    listindex: {
      type: Number,
      required: true
    },
    activelistindex: {
      type: Number,
      require: true
    },
    iscreated: {
      type: Boolean,
      require: false,
      default: false
    }
  },
  methods: {
    activate() {
      this.$parent.activate(this.listindex)
      this.active = true
    },
    changewidth(length) {
      this.$refs.listname.style.width = length * 18 + 10 + 'px'
    },
    focused() {
      this.$refs.listname.setSelectionRange(0, this.mylistname.length)
    },
    addList(event){
      if (event.key === 'Enter') {
        this.$refs.listname.blur()
      }
    }
  },
  watch: {
    mylistname: {
      handler(newVal) {
        if (this.listindex >= 3) {
          this.$parent.listsarr[this.$parent.listskeytoindex.get(this.listindex)].listname = newVal
        }
        this.changewidth(newVal.length)
      }
    },
    activelistindex: {
      handler(newVal){
        if (newVal === this.listindex) {
          this.activate()
        }
      }
    },
  },
  mounted() {
    this.changewidth(this.mylistname.length)
    if (this.iscreated) {
      this.$refs.listname.focus()
      this.$refs.listname.setSelectionRange(0, this.mylistname.length)
    }
  }
}
</script>


<style scoped lang="less">
.active {
  background-color: #eeeeee;
}

.iconactive {
  border-left: solid 3px #005fb8;
}

.list {
  position: relative;
  display: flex;
  align-items: center;
  width: 100%;
  height: 40px;
  padding: 0 10px 0 0;

  // background-color: #fff;
  &:hover {
    background-color: #eeeeee;

    .listname {
      background-color: #eeeeee;
    }

    .listname:disabled {
      background-color: #eeeeee;
    }
  }

  .icon {
    width: 40px;
    height: 20px;

    .iconfont {
      position: absolute;
      left: 10px;
      font-size: 20px;
      line-height: 20px;
    }
  }

  .listname {
    width: 60px;
    height: 30px;
    line-height: 40px;
    font-size: 15px;
    padding: 5px;
    user-select: none;

    &:disabled {
      background-color: #fff;
    }

    &:focus {
      background-color: #fff;
      border-bottom: solid 3px #005fb8;
    }

    &:hover {
      cursor: default;
      background-color: #eeeeee;
    }

    &:focus:hover {
      background-color: #fff;
    }

    &:disabled.active {
      background-color: #eeeeee;
    }

    &:disabled:hover {
      background-color: #eeeeee;
    }
  }
}</style>
