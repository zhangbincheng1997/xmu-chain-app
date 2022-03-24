<template>
  <div>
    <van-nav-bar title="XMU-食品溯源" />
    <van-image :src="require('../images/bar.jpg')" />
    <van-divider />
    <History :historyList="historyList" />
    <van-divider />
    <van-tabs>
      <van-tab v-for="(trace, i) in traceList" :key="i" :title="trace.productName">
        <Shop v-if="trace.shop" :shop="trace.shop" />
        <van-divider />
        <div v-for="(items, i) in trace.items" :key="i">
          <ItemsCard :items="items" />
          <van-divider />
        </div>
      </van-tab>
    </van-tabs>
  </div>
</template>

<script>
import {
  Divider,
  Image,
  NavBar,
  Tabs,
  Tab,
  Tag
} from 'vant';
import { scan, detail } from '../api/trace'
import History from './compoments/History'
import Shop from './compoments/Shop'
import ItemsCard from './compoments/ItemsCard'

export default {
  components: {
    [Divider.name]: Divider,
    [Image.name]: Image,
    [NavBar.name]: NavBar,
    [Tabs.name]: Tabs,
    [Tab.name]: Tab,
    [Tag.name]: Tag,
    History,
    Shop,
    ItemsCard
  },
  data() {
    return {
      batchId: this.$route.query.batchId,
      code: this.$route.query.code,
      historyList: [],
      traceList: []
    };
  },
  mounted() {
    // debug
    if (!this.batchId) this.batchId = '2'
    if (!this.code) this.code = '00000000000000000000000000000000'
    this.init()
  },
  methods: {
    init() {
      scan(this.batchId, this.code).then(res => {
        this.historyList = res.data
        detail(this.batchId).then(res => {
          this.traceList = res.data
        })
      })
    }
  }
};
</script>
