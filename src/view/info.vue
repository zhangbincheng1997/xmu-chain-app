<template>
  <div>
    <van-nav-bar :title="'溯源码：' + code" left-text="返回" left-arrow @click-left="back()" />
    <van-loading v-if="loading" />
    <van-tabs animated>
      <van-tab title="商品信息">
        <van-cell-group>
          <image-preview :image="productTemplate.image" />
          <van-cell title="名称" :value="productTemplate.name" />
          <van-cell title="介绍" :value="productTemplate.content" />
          <van-cell title="价格" :value="productTemplate.price" />
          <van-cell title="重量" :value="productTemplate.weight" />
          <van-cell title="过期时间" :value="productTemplate.exp" />
          <van-cell title="交易哈希" :value="productTemplate.transHash" is-link :to="'transDetail?transHash='+productTemplate.transHash" />
          <van-cell title="发送方" :value="productTemplate.transFrom" is-link :to="'browser?transFrom='+productTemplate.transFrom" />
        </van-cell-group>
      </van-tab>
      <van-tab title="产地信息">
        <van-cell-group>
          <image-preview :image="placeTemplate.image" />
          <van-cell title="名称" :value="placeTemplate.name" />
          <van-cell title="地址" :value="placeTemplate.address" />
          <van-cell title="介绍" :value="placeTemplate.content" />
          <van-cell title="面积" :value="placeTemplate.area" />
          <van-cell title="海拔" :value="placeTemplate.altitude" />
          <van-cell title="交易哈希" :value="placeTemplate.transHash" is-link :to="'transDetail?transHash='+placeTemplate.transHash" />
          <van-cell title="发送方" :value="placeTemplate.transFrom" is-link :to="'browser?transFrom='+placeTemplate.transFrom" />
        </van-cell-group>
      </van-tab>
      <van-tab title="地块信息">
        <van-cell-group>
          <image-preview :image="plotTemplate.image" />
          <van-cell title="名称" :value="plotTemplate.name" />
          <van-cell title="土壤类型" :value="plotTemplate.soilType" />
          <van-cell title="土壤酸碱度" :value="plotTemplate.soilPh" />
          <van-cell title="交易哈希" :value="plotTemplate.transHash" is-link :to="'transDetail?transHash='+plotTemplate.transHash" />
          <van-cell title="发送方" :value="plotTemplate.transFrom" is-link :to="'browser?transFrom='+plotTemplate.transFrom" />
        </van-cell-group>
      </van-tab>
      <van-tab title="企业信息">
        <van-cell-group>
          <image-preview :image="companyInfo.logo" />
          <van-cell title="名称" :value="companyInfo.name" />
          <van-cell title="法人" :value="companyInfo.legalPerson" />
          <van-cell title="联系人" :value="companyInfo.contactPerson" />
          <van-cell title="联系电话" :value="companyInfo.contactPhone" />
          <van-cell title="联系地址" :value="companyInfo.contactAddress" />
          <van-cell title="成立日期" :value="companyInfo.foundDate" />
          <van-cell title="官方网站" :value="companyInfo.officialWebsite" />
          <van-cell title="注册号码" :value="companyInfo.registerNumber" />
          <van-cell title="注册资本" :value="companyInfo.registerCapital" />
          <van-cell title="营业范围" :value="companyInfo.businessScope" />
          <image-preview :image="companyInfo.businessLicense" />
          <van-cell title="交易哈希" :value="companyInfo.transHash" is-link :to="'transDetail?transHash='+companyInfo.transHash" />
          <van-cell title="发送方" :value="companyInfo.transFrom" is-link :to="'browser?transFrom='+companyInfo.transFrom" />
        </van-cell-group>
      </van-tab>
    </van-tabs>
  </div>
</template>

<script>
import {
  Cell,
  CellGroup,
  Loading,
  NavBar,
  Tab,
  Tabs
} from 'vant';
import { getCompanyId } from '../api/admin'
import { getInfoByCode, getProductById, getPlaceById, getPlotById } from '../api/trace'

export default {
  components: {
    [Cell.name]: Cell,
    [CellGroup.name]: CellGroup,
    [Loading.name]: Loading,
    [NavBar.name]: NavBar,
    [Tab.name]: Tab,
    [Tabs.name]: Tabs
  },
  data() {
    return {
      code: this.$route.query.code,
      template: undefined,
      productTemplate: {},
      placeTemplate: {},
      plotTemplate: {},
      companyInfo: {},
      loading: false
    };
  },
  mounted() {
    this.init()
  },
  methods: {
    init() {
      this.loading = true
      getInfoByCode(this.code).then(res => {
        this.template = res.data
        Promise.all([
          getProductById(this.template.productId).then(res => { this.productTemplate = res.data }),
          getPlaceById(this.template.placeId).then(res => { this.placeTemplate = res.data }),
          getPlotById(this.template.plotId).then(res => { this.plotTemplate = res.data }),
          getCompanyId(this.template.companyId).then(res => { this.companyInfo = res.data })
        ]).then(() => {
          this.loading = false
        })
      })
    }
  }
};
</script>
