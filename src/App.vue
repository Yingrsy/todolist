<template>
  <div id="app">
    <div class="leftlists">
      <div v-for="l of listsarr_unchange" :key="l.id">
        <TodoList :listname="l.listname" :iconfont="l.iconfont" :iconcolor="l.iconcolor" :listindex="l.id"
          :activelistindex="activelistindex" :iscreated="l.iscreated"></TodoList>
      </div>
      <hr />
      <div v-for="value of listsarr" :key="value.id">
        <TodoList :listname="value.listname" :listindex="value.id" :activelistindex="activelistindex" :iscreated="value.iscreated"></TodoList>
      </div>
    </div>
    <div class="footer">
      <div class="addlist" @click="addlist">
        <span class="iconfont icon-add"></span>
        新建列表
      </div>
      <div class="deletelist" v-show="activelistindex >= 3" @click="deletelist">
        <span class="iconfont icon-ashbin"></span>
      </div>
    </div>
    <div class="rightlists">
      <TodoItems
        :listobj="activelistindex >= 3 ? listsarr[listskeytoindex.get(activelistindex)] : listsarr_unchange[activelistindex]"></TodoItems>
    </div>
  </div>
</template>

<script>
import TodoList from "./components/TodoList.vue";
import TodoItems from "./components/TodoItems.vue";

class MyList {
  constructor(id, name, iconfont='icon-menu', iconcolor="#3063ab") {
    this.id = id
    this.listname = name
    this.iconfont = iconfont
    this.iconcolor = iconcolor
    this.todoitems = []
    this.doenitems = []
    this.itemlength = 0
    this.iscreated = true
  }
}
class MyItem {
  constructor(id, name) {
    this.id = id
    this.name = name
  }
}
export default {
  name: "App",
  components: {
    TodoList,
    TodoItems
  },
  data: function () {
    return {
      activelistindex: 0,
      listsarr_unchange: [
        new MyList(0, '我的一天', "icon-time", "#6e7c85"),
        new MyList(1, '重要', "icon-favorite", "#b14f6e"),
        new MyList(2, '计划内', "icon-calendar", "#649795")
      ],
      listlength: 3,
      listskeytoindex: new Map(),
      listsarr: [],
      ifchangename: false
    };
  },
  methods: {
    activate(listindex) {
      this.$children.forEach((vc) => {
        vc.active = false;
      });
      this.activelistindex = listindex;
    },
    addlist() {
      this.listskeytoindex.set(this.listlength, this.listsarr.length);
      this.listsarr.push(new MyList(this.listlength, '无标题列表'))
      this.activate(this.listlength)
      this.listlength++
    },
    deletelist() {
      let max = 2;
      let maxkey = 2;
      let indexdelete = this.activelistindex
      this.listskeytoindex.forEach((value, key) => {
        if (key < this.activelistindex) {
          if (value + 3 > max) {
            max = value + 3
            maxkey = key
          }
        }
      })
      this.activelistindex = maxkey
      this.listsarr.splice(this.listskeytoindex.get(indexdelete), 1);
      this.listskeytoindex.forEach((value, key) => {
        if (key > indexdelete) {
          this.listskeytoindex.set(key, value - 1)
        }
      })          
      this.listskeytoindex.delete(indexdelete)
    },
    addItems(itemname){
      if (this.activelistindex < 3) {
        this.listsarr_unchange[this.activelistindex].todoitems.unshift(new MyItem(this.listsarr_unchange[this.activelistindex].itemlength, itemname))
        this.listsarr_unchange[this.activelistindex].itemlength++
      } else {
        let index = this.listskeytoindex.get(this.activelistindex)
        this.listsarr[index].todoitems.unshift(new MyItem(this.listsarr[index].itemlength, itemname))
        this.listsarr[index].itemlength++
      }
    },
    setDone(itemobj) {
      if (this.activelistindex < 3) {
        this.listsarr_unchange[this.activelistindex].todoitems = this.listsarr_unchange[this.activelistindex].todoitems.filter((item)=>{
          return item.id !== itemobj.id 
        })
        this.listsarr_unchange[this.activelistindex].doenitems.unshift(itemobj)
      } else {
        let index = this.listskeytoindex.get(this.activelistindex)
        this.listsarr[index].todoitems = this.listsarr[index].todoitems.filter((item)=>{
          return item.id !== itemobj.id 
        })
        this.listsarr[index].doenitems.unshift(itemobj)
      }
    },
    setUndo(itemobj) {
      if (this.activelistindex < 3) {
        this.listsarr_unchange[this.activelistindex].doenitems = this.listsarr_unchange[this.activelistindex].doenitems.filter((item)=>{
          return item.id !== itemobj.id 
        })
        this.listsarr_unchange[this.activelistindex].todoitems.unshift(itemobj)
      } else {
        let index = this.listskeytoindex.get(this.activelistindex)
        this.listsarr[index].doenitems = this.listsarr[index].doenitems.filter((item)=>{
          return item.id !== itemobj.id 
        })
        this.listsarr[index].todoitems.unshift(itemobj)
      }
    },
    deleteItems(){
      if (this.activelistindex < 3) {
        this.listsarr_unchange[this.activelistindex].doenitems = []
      } else {
        this.listsarr[this.listskeytoindex.get(this.activelistindex)].doenitems = []
      }
    },
    save(){
      let objmap = Object.create(null);
      for (let [k,v] of this.listskeytoindex) {
        objmap[k] = v;
      }
      let length = this.listsarr.length
      for (let i = 0; i <length; i++) {
        this.listsarr[i].iscreated = false;
      }
      let obj = JSON.stringify({
        arr1: this.listsarr_unchange,
        arr2: this.listsarr,
        arr2map: objmap,
        activeindex: this.activelistindex,
        listslength: this.listlength
      })
      localStorage.setItem('myobj', obj)
    }
  },
  mounted() {
    let storage = JSON.parse(localStorage.getItem('myobj'))
    if (storage) {
      this.listsarr_unchange = storage.arr1
      this.listsarr = storage.arr2
      let strMap = new Map();
      for (let k of Object.keys(storage.arr2map)) {
        strMap.set(parseInt(k), parseInt(storage.arr2map[k]));
      }
      this.listskeytoindex = strMap
      this.$children.forEach((vc) => {
        vc.active = false;
      });
      this.activelistindex = storage.activeindex
      this.listlength = storage.listslength
    }
    window.addEventListener('beforeunload', () => this.save())
  },
  beforeDestroy(){
    window.removeEventListener('beforeunload', () => this.save())
    // localStorage.clear()
  }
};
</script>

<style scoped lang="less">
@media screen and (max-width: 1000px) {
  #app .leftlists {
    display: none;
  }

  #app .footer .addlist {
    display: none;
  }

  #app .footer .deletelist {
    display: none;
  }
}

#app {
  position: relative;
  display: flex;
  margin: 6vh auto 0;
  width: 70vw;
  height: 88vh;
  background-color: #fff;
  border-radius: 10px;

  .leftlists {
    // display: flex;
    // flex-direction: column;
    padding: 10px 10px 40px 10px;
    flex: 2;
    height: 100%;
    border-right: solid 2px #cdcdcd;
    border-radius: 10px 0 0 10px;
    overflow: hidden;
  }

  .footer {
    box-sizing: border-box;
    position: absolute;
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding-bottom: 3px;
    padding-left: 0.6vw;
    bottom: 0px;
    left: 0px;
    width: 19vw;
    height: 40px;
    background-color: #fff;
    border-radius: 0 0 0 10px;

    .addlist {
      flex: 1;
      height: 40px;
      line-height: 40px;
      font-size: 15px;
      user-select: none;
      padding-left: 5px;

      &:hover {
        background-color: #eeeeee;
      }

      .iconfont {
        font-size: 20px;
        margin-right: 10px;
      }
    }

    .deletelist {
      width: 40px;
      height: 40px;
      margin-left: 5px;
      line-height: 40px;
      text-align: center;

      &:hover {
        background-color: #eeeeee;
      }

      .iconfont {
        font-size: 20px;
      }
    }
  }

  .rightlists {
    flex: 5;
    height: 100%;
    padding: 40px;
    overflow: hidden;
  }

  hr {
    width: 100%;
    margin: 0 auto;
    border: 0;
    height: 2px;
    background-color: #c1c1c1;
    margin-top: 5px;
    margin-bottom: 5px;
  }
}</style>
