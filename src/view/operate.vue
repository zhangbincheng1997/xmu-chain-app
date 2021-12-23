<template>
  <div>
    <van-nav-bar :title="'溯源码：' + code" left-text="返回" left-arrow @click-left="back()" />
    <van-loading v-if="loading" />
    <van-tabs animated>
      <van-tab title="生长操作">
        <van-list finished-text="没有更多了">
          <van-cell-group v-for="(item, i) in growList" :key="i" :title="'# ' + (i+1) + ': ' + item.createTime">
            <image-preview :image="item.image" />
            <van-cell title="温度" :value="item.temperature" />
            <van-cell title="湿度" :value="item.humidity" />
            <van-cell title="光照" :value="item.light" />
            <van-cell title="备注" :value="item.remark" />
            <van-cell title="交易哈希" :value="item.transHash" is-link :to="'transDetail?transHash='+item.transHash" />
            <van-cell title="发送方" :value="item.transFrom" is-link :to="'browser?transFrom='+item.transFrom" />
          </van-cell-group>
        </van-list>
      </van-tab>
      <van-tab title="农事操作">
        <van-list finished-text="没有更多了">
          <van-cell-group v-for="(item, i) in farmList" :key="i" :title="'# ' + (i+1) + ': ' + item.createTime">
            <image-preview :image="item.image" />
            <van-cell title="内容" :value="item.content" />
            <van-cell title="备注" :value="item.remark" />
            <van-cell title="交易哈希" :value="item.transHash" is-link :to="'transDetail?transHash='+item.transHash" />
            <van-cell title="发送方" :value="item.transFrom" is-link :to="'browser?transFrom='+item.transFrom" />
          </van-cell-group>
        </van-list>
      </van-tab>
      <van-tab title="加工操作">
        <van-list finished-text="没有更多了">
          <van-cell-group v-for="(item, i) in processList" :key="i" :title="'# ' + (i+1) + ': ' + item.createTime">
            <image-preview :image="item.image" />
            <van-cell title="内容" :value="item.content" />
            <van-cell title="备注" :value="item.remark" />
            <van-cell title="交易哈希" :value="item.transHash" is-link :to="'transDetail?transHash='+item.transHash" />
            <van-cell title="发送方" :value="item.transFrom" is-link :to="'browser?transFrom='+item.transFrom" />
          </van-cell-group>
        </van-list>
      </van-tab>
    </van-tabs>
  </div>
</template>

<script>
import {
  Cell,
  CellGroup,
  List,
  Loading,
  NavBar,
  Tab,
  Tabs
} from 'vant';
import { listGrowByCode, listFarmByCode, listProcessByCode } from '../api/trace'

export default {
  components: {
    [Cell.name]: Cell,
    [CellGroup.name]: CellGroup,
    [List.name]: List,
    [Loading.name]: Loading,
    [NavBar.name]: NavBar,
    [Tab.name]: Tab,
    [Tabs.name]: Tabs
  },
  data() {
    return {
      code: this.$route.query.code,
      growList: [],
      farmList: [],
      processList: [],
      loading: false
    };
  },
  mounted() {
    this.init()
  },
  methods: {
    init() {
      Promise.all([
        listGrowByCode(this.code).then(res => { this.growList = res.data }),
        listFarmByCode(this.code).then(res => { this.farmList = res.data }),
        listProcessByCode(this.code).then(res => { this.processList = res.data }),
      ]).then(() => {
        this.loading = false
      })
    }
  }
};
</script>
