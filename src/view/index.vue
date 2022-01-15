<template>
  <div>
    <van-nav-bar :title="data.productName + '(' + data.batchNo + ')'" />
    <van-image :src="require('../images/bar.jpg')" />
    <van-divider />
    <History v-if="data.history" :history="data.history" />
    <van-divider />
    <Shop v-if="data.shop" :shop="data.shop" />
    <van-divider />
    <div v-for="(item, i) in data.items" :key="i">
      <ItemsCard :items="item" />
      <van-divider />
    </div>
  </div>
</template>

<script>
import {
  Divider,
  Image,
  NavBar,
  Tag
} from 'vant';
import { trace } from '../api/trace'
import History from './compoments/History'
import Shop from './compoments/Shop'
import ItemsCard from './compoments/ItemsCard'

export default {
  components: {
    [Divider.name]: Divider,
    [Image.name]: Image,
    [NavBar.name]: NavBar,
    [Tag.name]: Tag,
    History,
    Shop,
    ItemsCard
  },
  data() {
    return {
      companyId: this.$route.query.companyId,
      batchNo: this.$route.query.batchNo,
      code: this.$route.query.code,
      data: {}
    };
  },
  mounted() {
    // debug
    if (!this.companyId) this.companyId = '1'
    if (!this.batchNo) this.batchNo = '202201010001'
    if (!this.code) this.code = '00000000000000000000000000000000'
    this.init()
  },
  methods: {
    init() {
      trace(this.companyId, this.batchNo, this.code).then(res => {
        this.data = res.data
      })
    }
  }
};
</script>
