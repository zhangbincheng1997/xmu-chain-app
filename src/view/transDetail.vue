<template>
  <div>
    <van-nav-bar :title="transHash" left-text="返回" left-arrow @click-left="back()" />
    <van-loading v-if="loading" />
    <van-tabs animated>
      <van-tab title="交易回执">
        <van-cell-group>
          <van-cell title="交易哈希" :value="receipt.transactionHash" />
          <van-cell title="交易序号" :value="receipt.transactionIndex | parseInt" />
          <van-cell title="交易状态" :value="receipt.status | parseStatus" />
          <van-cell title="区块哈希" :value="receipt.blockHash" />
          <van-cell title="区块高度" :value="receipt.blockNumber | parseInt" />
          <van-cell title="燃料消耗" :value="receipt.gasUsed | parseInt" />
          <van-cell title="合约地址" :value="receipt.contractAddress" />
          <van-cell title="状态根" :value="receipt.root" />
          <van-cell title="发送方" :value="receipt.from" />
          <van-cell title="接收方" :value="receipt.to" />
        </van-cell-group>
      </van-tab>
      <van-tab title="解码">
        <van-cell-group>
          <van-cell title="类型" :value="result.type" /><!-- deploy部署 / transaction交易 -->
          <van-cell title="输入" :value="receipt.input" @click="decodeInputClick" clickable />
          <van-cell title="输出" :value="receipt.output" @click="decodeOutputClick" clickable />
          <van-cell v-for="(item, i) in receipt.logs" :key="i" :title="'事件' + i" :value="JSON.stringify(item)" @click="decodeLogClick(i)" clickable />
        </van-cell-group>
      </van-tab>
    </van-tabs>
    <van-dialog v-model="isOk" title="解码" closeOnClickOverlay>
      <van-cell-group>
        <van-cell v-if="decode.methodId" title="methodId" :value="decode.methodId" />
        <van-cell v-if="decode.function" title="function" :value="decode.function" />
        <van-cell v-if="decode.address" title="address" :value="decode.address" />
        <van-cell v-for="(item, i) in decode.topics" :key="i" :title="'topics' + i" :value="JSON.stringify(item)" />
        <van-cell v-for="(item, i) in decode.params" :key="i" :title="'params' + i" :value="JSON.stringify(item)" />
      </van-cell-group>
    </van-dialog>
  </div>
</template>

<script>
import {
  Button,
  Cell,
  CellGroup,
  Dialog,
  Image,
  Loading,
  NavBar,
  Tab,
  Tabs
} from 'vant';
import { getTransactionReceipt, decode } from '../api/browser'

export default {
  components: {
    [Button.name]: Button,
    [Cell.name]: Cell,
    [CellGroup.name]: CellGroup,
    [Dialog.Component.name]: Dialog.Component,
    [Image.name]: Image,
    [Loading.name]: Loading,
    [NavBar.name]: NavBar,
    [Tab.name]: Tab,
    [Tabs.name]: Tabs
  },
  filters: {
    parseInt: function (value) {
      if (!value) return ''
      return parseInt(value)
    },
    parseStatus: function (value) {
      if (!value) return ''
      const status = parseInt(value)
      return status === 0 ? '正常' : status
    }
  },
  data() {
    return {
      transHash: this.$route.query.transHash,
      receipt: {},
      result: {},
      loading: true,
      // 解码结果
      isOk: false,
      decode: {
        methodId: undefined,
        function: undefined,
        params: {
          name: undefined,
          type: undefined,
          data: undefined
        }
      }
    };
  },
  mounted() {
    this.init()
  },
  methods: {
    init() {
      this.loading = true
      getTransactionReceipt(this.transHash).then(res => {
        this.receipt = res.data
      })
      decode(this.transHash).then(res => {
        this.result = res.data
      })
      this.loading = false
    },
    decodeInputClick() {
      if (this.result.input) {
        this.decode = this.result.input
        this.isOk = true
      }
    },
    decodeOutputClick() {
      if (this.result.output) {
        this.decode = this.result.output
        this.isOk = true
      }
    },
    decodeLogClick(i) {
      if (this.result.logs[i]) {
        this.decode = this.result.logs[i]
        this.isOk = true
      }
    }
  }
};
</script>
