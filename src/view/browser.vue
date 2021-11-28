<template>
  <div>
    <van-nav-bar left-text="返回" left-arrow @click-left="back()" />
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
            <van-icon name="records" @click="copyText(item.transHash)" />
            <span style="color: #0db1c1;" @click="linkTransaction(item.transHash)">{{ splitAddress(item.transHash) }}</span>
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
  Icon,
  Loading,
  NavBar,
  Pagination,
  Search,
} from 'vant';
import { getTransactionList } from '../api/browser'

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
      list: [],
      total: 0,
      query: {
        pageNumber: 1,
        pageSize: 20,
        groupId: localStorage.getItem('groupId') || 1,
        transactionHash: undefined, // 区块hash
        blockNumber: undefined // 块高
      },
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
      getTransactionList(this.query).then(res => {
        this.loading = false
        this.list = res.data
        this.total = res.totalCount
      })
    }
  }
};
</script>
