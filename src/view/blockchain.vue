<template>
  <div>
    <van-nav-bar left-text="返回" left-arrow @click-left="back" />
    <van-search
        v-model="searchKey"
        show-action
        shape="round"
        placeholder="请输入交易哈希或块高"
        @search="onSearch"
    >
      <template #action>
        <div @click="onSearch">查询</div>
      </template>
    </van-search>
    <div v-if="loading">
      <van-loading />
    </div>
    <div v-else>
      <table>
        <tr><th>#</th><th>交易哈希</th><th>块高</th><th>创建时间</th></tr>
        <tr v-for="(item, i) in list" :key="i">
          <td>{{ i + 1 }}</td>
          <td>
            <van-icon name="records" @click="onCopy(item.transHash)" />
            <span style="color: #0db1c1;" @click="link(item.transHash)">{{ splitAddress(item.transHash) }}</span>
          </td>
          <td>{{ item.blockNumber }}</td>
          <td>{{ item.blockTimestamp }}</td>
        </tr>
      </table>
      <van-pagination v-model="query.pageNumber" :items-per-page="query.pageSize" :total-items="total" @change="getTransactionList" />
    </div>
  </div>
</template>

<script>
import {
  Toast,
  Icon,
  Loading,
  NavBar,
  Pagination,
  Search,
} from 'vant';
import chain from '../api/chain'

// 查询
const defaultQuery = {
  pageNumber: 1,
  pageSize: 20,
  groupId: localStorage.getItem('groupId') || 1,
  transactionHash: undefined, // 区块hash
  blockNumber: undefined // 块高
}

export default {
  components: {
    [Icon.name]: Icon,
    [Loading.name]: Loading,
    [NavBar.name]: NavBar,
    [Pagination.name]: Pagination,
    [Search.name]: Search
  },
  data() {
    return {
      loading: false,
      query: Object.assign({}, defaultQuery),
      list: [],
      total: 0,
      searchKey: undefined
    };
  },
  mounted: function() {
    if (this.$route.query.transactionHash) {
      this.query.transactionHash = this.$route.query.transactionHash
      this.searchKey = this.query.transactionHash
    }
    if (this.$route.query.blockNumber) {
      this.query.blockNumber = this.$route.query.blockNumber
      this.searchKey = this.query.blockNumber
    }
    this.getTransactionList()
  },
  methods: {
    back() {
      this.$router.go(-1)
    },
    onSearch() {
      this.query.transactionHash = undefined
      this.query.blockNumber = undefined
      if (this.searchKey) {
        if (this.searchKey.length === 66) {
          this.query.transactionHash = this.searchKey
        } else {
          this.query.blockNumber = this.searchKey
        }
      }
      this.getTransactionList()
    },
    getTransactionList: function() {
      this.loading = true
      chain.getTransactionList(this.query).then(res => {
        this.loading = false
        this.list = res.data
        this.total = res.totalCount
      })
    },
    link: function(val) {
      this.$router.push({
        path: '/transDetail',
        query: { transHash: val }
      })
    },
    onCopy: function(val) {
      this.$copyText(val).then(() => {
        Toast('复制成功！')
      })
    },
    splitAddress(val) {
      if (!val) return
      let startStr = ''
      let endStr = ''
      let str = ''
      startStr = val.substring(0, 8)
      endStr = val.substring(val.length - 6)
      str = `${startStr}...${endStr}`
      return str
    }
  }
};
</script>
<style lang="less">
</style>
