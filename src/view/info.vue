<template>
  <div>
    <van-nav-bar :title="'溯源码：' + code" left-text="返回" left-arrow @click-left="back()" />
    <div v-if="loading">
      <van-loading />
    </div>
    <div v-else>
      <van-tabs animated>
        <van-tab title="企业信息">
          <van-cell-group>
            <van-image :src="companyInfo.logo" />
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
            <van-image :src="companyInfo.businessLicense" />
          </van-cell-group>
        </van-tab>
        <van-tab title="商品信息">
          <van-cell-group>
            <van-image :src="productTemplate.image" />
            <van-cell title="名称" :value="productTemplate.name" />
            <van-cell title="介绍" :value="productTemplate.content" />
            <van-cell title="价格" :value="productTemplate.price" />
            <van-cell title="重量" :value="productTemplate.weight" />
            <van-cell title="过期时间" :value="productTemplate.exp" />
            <van-cell title="用户地址" :value="productTemplate.fromAddr" is-link :to="'userDetail?address='+productTemplate.fromAddr" />
            <van-cell title="交易Hash" :value="productTemplate.transHash" is-link :to="'transDetail?transHash='+productTemplate.transHash" />
          </van-cell-group>
        </van-tab>
        <van-tab title="作物信息">
          <van-cell-group>
            <van-image :src="corpTemplate.image" />
            <van-cell title="名称" :value="corpTemplate.name" />
            <van-cell title="灌溉周期" :value="corpTemplate.guangai" />
            <van-cell title="施肥周期" :value="corpTemplate.shifei" />
            <van-cell title="除草周期" :value="corpTemplate.chucao" />
            <van-cell title="除虫周期" :value="corpTemplate.chuchong" />
            <van-cell title="用户地址" :value="corpTemplate.fromAddr" is-link :to="'userDetail?address='+corpTemplate.fromAddr" />
            <van-cell title="交易Hash" :value="corpTemplate.transHash" is-link :to="'transDetail?transHash='+corpTemplate.transHash" />
          </van-cell-group>
        </van-tab>
        <van-tab title="产地信息">
          <van-cell-group>
            <van-image :src="placeTemplate.image" />
            <van-cell title="名称" :value="placeTemplate.name" />
            <van-cell title="地址" :value="placeTemplate.address" />
            <van-cell title="介绍" :value="placeTemplate.content" />
            <van-cell title="面积" :value="placeTemplate.area" />
            <van-cell title="海拔" :value="placeTemplate.altitude" />
            <van-cell title="用户地址" :value="placeTemplate.fromAddr" is-link :to="'userDetail?address='+placeTemplate.fromAddr" />
            <van-cell title="交易Hash" :value="placeTemplate.transHash" is-link :to="'transDetail?transHash='+placeTemplate.transHash" />
          </van-cell-group>
        </van-tab>
        <van-tab title="地块信息">
          <van-cell-group>
            <van-image :src="plotTemplate.image" />
            <van-cell title="名称" :value="plotTemplate.name" />
            <van-cell title="土壤类型" :value="plotTemplate.soilType" />
            <van-cell title="土壤酸碱度" :value="plotTemplate.soilPh" />
            <van-cell title="用户地址" :value="plotTemplate.fromAddr" is-link :to="'userDetail?address='+plotTemplate.fromAddr" />
            <van-cell title="交易Hash" :value="plotTemplate.transHash" is-link :to="'transDetail?transHash='+plotTemplate.transHash" />
          </van-cell-group>
        </van-tab>
      </van-tabs>
    </div>
  </div>
</template>

<script>
import {
  Cell,
  CellGroup,
  Image,
  Loading,
  NavBar,
  Tab,
  Tabs
} from 'vant';
import { getCompany } from '../api/admin'
import { getCorp, getProduct, getPlace, getPlot } from '../api/template'
import { getAdmin } from '../api/trace'

export default {
  components: {
    [Cell.name]: Cell,
    [CellGroup.name]: CellGroup,
    [Image.name]: Image,
    [Loading.name]: Loading,
    [NavBar.name]: NavBar,
    [Tab.name]: Tab,
    [Tabs.name]: Tabs
  },
  data() {
    return {
      code: this.$route.query.code,
      template: undefined,
      companyInfo: {},
      corpTemplate: {},
      productTemplate: {},
      placeTemplate: {},
      plotTemplate: {},
      loading: true
    };
  },
  mounted() {
    this.init()
  },
  methods: {
    init() {
      this.loading = true
      getAdmin(this.code).then(res => {
        this.template = res.data
        Promise.all([
          getCompany(this.template.companyId).then(res => { this.companyInfo = res.data }),
          getCorp(this.template.corpId).then(res => { this.corpTemplate = res.data }),
          getProduct(this.template.productId).then(res => { this.productTemplate = res.data }),
          getPlace(this.template.placeId).then(res => { this.placeTemplate = res.data }),
          getPlot(this.template.plotId).then(res => { this.plotTemplate = res.data })
        ]).then(() => {
          this.loading = false
        })
      })
    }
  }
};
</script>
