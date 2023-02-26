<template>
    <div id="undoitems">
        <div v-for="i of undos" :key="i.id">
            <MyItems :item="i" :status="false"></MyItems>
        </div>
    </div>
</template>

<script>
import MyItems from "./MyItems.vue";
export default {
    name: 'UndoItems',
    components: {
        MyItems
    },
    data() {
        return {
        }
    },
    computed: {
        undos: {
            get() {
                return this.undoitems
            },
            set() {

            }
        }
    },
    props: {
        undoitems: {
            type: Array,
            required: false
        }
    },
    methods: {
        setDone(itemobj) {
            this.$parent.setDone(itemobj)
        }
    }
}
</script>

<style scoped lang='less'>
#undoitems {
    margin-top: 20px;
}
</style>
