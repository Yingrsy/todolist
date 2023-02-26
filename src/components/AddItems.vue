<template>
    <div id="additems" @keydown.stop="addItems">
        <span class="iconfont icon-add"></span>
        <input type="text" placeholder="添加任务" v-model="itemname" ref="additem">
    </div>
</template>

<script>
export default {
    name: 'AddItems',
    data() {
        return {
            itemname: ''
        }
    },
    methods: {
        addItems(event){
            if (event.key === 'Enter' && this.itemname!=='') {
                this.$parent.addItems(this.itemname)
                this.itemname = ''
                this.$refs.additem.blur()
            }
        }
    }
}
</script>

<style scoped lang='less'>
#additems {
    height: 100%;
    border-radius: 10px;
    background-color: #f4f5f6;
    display: flex;
    &:hover {
        background-color: #f8fbfb;
        input {
            background-color: #f8fbfb;
        }
    }
    &:has(input:focus) {
        background-color: #f8fbfb;
    }

    span {
        display: inline-block;
        width: 50px;
        height: 50px;
        line-height: 50px;
        text-align: center;
        font-size: 20px;
    }
    input {
        flex: 1;
        vertical-align: top;
        padding-left: 10px;
        width: 200px;
        height: 50px;
        background-color: #f4f5f6;
        font-size: 15px;
        &:focus {
            background-color: #f8fbfb;
        }
        border-radius: 0 10px 10px 0;
    }
}
</style>
