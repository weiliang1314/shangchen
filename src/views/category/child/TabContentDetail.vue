<template>
  <grid-view  :lineSpace="15" :v-margin="20" v-if="categoryDetail">
    <goods-list v-for="(item, index) in categoryDetail" :key="index" :product="item"></goods-list>
  </grid-view>
</template>

<script>
  import GridView from 'components/common/grid/GridView'
  import GoodsList from 'components/content/good/GoodsList'

  export default {
    name: "TabContentDetail",
    components: {
      GridView,
      GoodsList
    },
    props: {
      categoryDetail: {
        type: Array,
        default() {
          return []
        }
      }
    },
    created(){
      console.log(this.categoryDetail)
    }
  }
</script>

<style scoped>

</style>
