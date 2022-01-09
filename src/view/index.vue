<template>
  <div>
    <van-nav-bar :title="data.batchNo" />
    <van-swipe :autoplay="3000">
      <van-swipe-item v-for="image in images" :key="image">
        <img :src="image" alt="" style="width: 100%;">
      </van-swipe-item>
    </van-swipe>
    <van-divider />
    <van-cell-group v-if="visible" inset>
      <van-cell title="店铺信息" />
      <van-cell>
        <div style="float: left;">
          <img :src="IPFS_GATEWAY + '/' + data.shop.icon" height="120px" alt="">
        </div>
        <div style="height: 120px; margin-left: 20px; display: inline-block; vertical-align: middle;">
          <strong>{{ data.shop.name }}</strong>
          <p><small>{{ data.shop.content }}</small></p>
          <p><van-button type="info" size="mini" icon="shop" :url="data.shop.url">进入官方店铺</van-button></p>
        </div>
      </van-cell>
    </van-cell-group>
    <van-divider />
    <div v-for="(item, i) in data.items" :key="i">
      <ItemsCard :items="item" />
      <van-divider />
    </div>

<!--    <table style="margin: 0 auto; line-height: 25px">-->
<!--      <tr><th>块高</th><th>交易哈希</th><th>发送方</th><th>创建时间</th></tr>-->
<!--      <tr v-for="(item, i) in list" :key="i">-->
<!--        <td>{{ item.blockNumber }}</td>-->
<!--        <td>-->
<!--          <van-icon name="records" @click="copyText(item.transHash)" />-->
<!--          <span style="color: #0db1c1;" @click="linkHash(item.transHash)">{{ item.transHash | splitAddress }}</span>-->
<!--        </td>-->
<!--        <td>-->
<!--          <van-icon name="records" @click="copyText(item.transHash)" />-->
<!--          <span style="color: #0db1c1;" @click="linkFrom(item.transFrom)">{{ item.transFrom | splitAddress }}</span>-->
<!--        </td>-->
<!--        <td>{{ item.blockTimestamp }}</td>-->
<!--      </tr>-->
<!--    </table>-->
  </div>
</template>

<script>
import {
  Button,
  Cell,
  CellGroup,
  Dialog,
  Divider,
  Grid,
  GridItem,
  NavBar,
  Search,
  Swipe,
  SwipeItem
} from 'vant';
import { trace } from '../api/trace'
import ItemsCard from '../components/ItemsCard'

export default {
  components: {
    [Button.name]: Button,
    [Cell.name]: Cell,
    [CellGroup.name]: CellGroup,
    [Dialog.name]: Dialog,
    [Divider.name]: Divider,
    [Grid.name]: Grid,
    [GridItem.name]: GridItem,
    [NavBar.name]: NavBar,
    [Search.name]: Search,
    [Swipe.name]: Swipe,
    [SwipeItem.name]: SwipeItem,
    ItemsCard
  },
  data() {
    return {
      companyId: this.$route.query.companyId,
      batchNo: this.$route.query.batchNo,
      code: this.$route.query.code,
      images: [
        'http://qiniu.littleredhat1997.com/xmu/chain-bg.png'
      ],
      data: {},
      visible: false
    };
  },
  mounted() {
    // debug
    if (!this.companyId) this.companyId = '1'
    if (!this.batchNo) this.batchNo = '202201010001'
    if (!this.code) this.code = '7939a62e5da64a5cb13025bb5fbafbc8'
    this.init()
  },
  methods: {
    init() {
      trace(this.companyId, this.batchNo, this.code).then(res => {
        this.data = res.data
        this.visible = true
      })
    }
  }
};
</script>
