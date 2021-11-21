<template>
  <div>
    <van-nav-bar :title="'溯源码：' + code" left-text="返回" left-arrow @click-left="back" />
    <van-list :finished="finished" finished-text="没有更多了">
      <van-cell-group v-for="(item, i) in list" :key="i" :title="'# ' + item.id + ' - ' + item.createTime">
        <van-image :src="item.image" />
        <van-cell title="温度" :value="item.temperature" />
        <van-cell title="湿度" :value="item.humidity" />
        <van-cell title="光照" :value="item.light" />
        <van-cell title="备注" :value="item.remark" />
      </van-cell-group>
    </van-list>
  </div>
</template>

<script>
import {
  Cell,
  CellGroup,
  Image,
  List,
  NavBar
} from 'vant';
import trace from '../api/trace'

export default {
  components: {
    [Cell.name]: Cell,
    [CellGroup.name]: CellGroup,
    [Image.name]: Image,
    [List.name]: List,
    [NavBar.name]: NavBar
  },
  data() {
    return {
      code: this.$route.query.code,
      list: [],
      finished: false
    };
  },
  mounted() {
    this.init()
  },
  methods: {
    back() {
      this.$router.go(-1)
    },
    init() {
      trace.listGrow(this.code).then(res => {
        this.list = res.data
        this.finished = true
      })
    }
  }
};
</script>
<style lang="less">
</style>
