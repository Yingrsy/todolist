<template>
    <div id="items">
        <h2>{{ this.itemsobj.listname }}</h2>
        <UndoItems :undoitems="this.itemsobj.todoitems"></UndoItems>
        <DoneItems :doneitems="this.itemsobj.doenitems"></DoneItems>
        <div class="footer">
            <div class="additems"><AddItems></AddItems></div>
            <div class="deleteitems"><DeleteItems></DeleteItems></div>
        </div>
    </div>
</template>

<script>
import UndoItems from "./UndoItems.vue";
import DoneItems from "./DoneItems.vue";
import AddItems from "./AddItems.vue";
import DeleteItems from "./DeleteItems.vue";

export default {
    name: 'TodoItems',
    components: {
        UndoItems,
        DoneItems,
        AddItems,
        DeleteItems
    },
    data() {
        return {

        }
    },
    props: {
        listobj: {
            type: Object,
            required: true
        }
    },
    computed: {
        itemsobj: {
            get() {
                if (this.$parent.activelistindex < 3) {
                    return this.$parent.listsarr_unchange[this.$parent.activelistindex]
                } else {
                    return this.$parent.listsarr[this.$parent.listskeytoindex.get(this.$parent.activelistindex)]
                } 
            }
        }
    },
    methods:{
        addItems(itemname){
            this.$parent.addItems(itemname)
        },
        setDone(itemobj){
            this.$parent.setDone(itemobj)
        },
        setUndo(itemobj) {
            this.$parent.setUndo(itemobj)
        }
    }
}
</script>

<style scoped lang="less">
#items {
    position: relative;
    height: 100%;
    overflow: hidden;
    h2 {
        color: #3063ab;
        user-select: none;
    }
    .footer {
        position: absolute;
        display: flex;
        left: 0;
        bottom: 0;
        width: 100%;
        height: 50px;
        .additems {
            flex: 1;
            height: 100%;
        }
        .deleteitems {
            width: 50px;
            height: 50px;
            margin-left: 10px;
            height: 100%;
        }
    }
}

</style>
