<template>
  <div>
    <van-nav-bar :title="data.batchNo" />
    <van-image :src="bg" />
    <van-divider />
    <van-cell-group v-if="data.history" inset>
      <van-cell>
        <van-tag v-if="data.history.length === 0" type="success" plain round>
          <van-icon name="good-job" />首次扫码，通过验证！
        </van-tag>
        <van-tag v-else type="danger" plain round>
          <van-icon name="bell" />多次扫码，谨防假冒！
        </van-tag>
      </van-cell>
      <van-cell title="首次扫码时间">{{ data.history.length > 0 ? data.history[0].createTime : '-' }}</van-cell>
      <van-cell title="首次扫码地点">{{ data.history.length > 0 ? data.history[0].location : '-' }}</van-cell>
      <van-cell title="扫码记录" is-link to="index">{{ data.history.length }}</van-cell>
    </van-cell-group>
    <van-divider />
    <van-cell-group v-if="data.shop" inset>
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
  Icon,
  Image,
  Tag
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
    [Icon.name]: Icon,
    [Image.name]: Image,
    [Tag.name]: Tag,
    ItemsCard
  },
  data() {
    return {
      companyId: this.$route.query.companyId,
      batchNo: this.$route.query.batchNo,
      code: this.$route.query.code,
      bg: 'http://qiniu.littleredhat1997.com/xmu/chain.png',
      data: {}
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
      })
    }
  }
};
</script>
