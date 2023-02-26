<template>
    <div id="doneitems">
        <div class="hasdone" @click.stop="collapse" v-show="doneitems.length!==0">
            <span class="iconfont" :class="{'icon-arrow-down': !iscollapsed, 'icon-arrow-right': iscollapsed}"></span>
            已完成 {{ dones.length }}
        </div>
        <div v-show="!iscollapsed">
            <div v-for="i of dones" :key="i.id">
                <MyItems :item="i" :status="true"></MyItems>
            </div>
        </div>
    </div>
</template>

<script>
import MyItems from "./MyItems.vue";
export default {
    name: 'DoneItems',
    components: {
        MyItems
    },
    data() {
        return {
            iscollapsed: false
        }
    },
    methods: {
        collapse(){
            this.iscollapsed = !this.iscollapsed
        },
        setDone(itemobj) {
            this.$parent.setUndo(itemobj)
        }
    },
    computed: {
        dones: {
            get() {
                return this.doneitems
            }
        }
    },
    props: {
        doneitems: {
            type: Array,
            required: true
        }
    },
}
</script>

<style scoped lang="less">
#doneitems {
    margin-top: 10px;
    .hasdone {
        width: 100px;
        height: 35px;
        line-height: 35px;
        text-align: center;
        font-size: 15px;
        border: solid 1px #e3f5ff;
        user-select: none;
        margin-bottom: 10px;
        background: #e3f5ff;
        border-radius: 5px;
        color: #3063ab;
        &:hover {
            background-color: #eaf5fa;
        }
    }
}
</style>
