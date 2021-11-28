<template>
  <div>
    <van-nav-bar :title="address" left-text="返回" left-arrow @click-left="back()" />
    <div v-if="loading">
      <van-loading />
    </div>
    <div v-else>
      <van-cell-group>
        <van-image :src="info.avatar" />
        <van-cell title="姓名" :value="info.name" />
        <van-cell title="手机" :value="info.phone" />
        <van-cell title="邮箱" :value="info.email" />
        <van-cell title="生日" :value="info.birthday" />
        <van-cell title="性别" :value="genderMap[info.gender]" />
      </van-cell-group>
    </div>
  </div>
</template>

<script>
import {
  Cell,
  CellGroup,
  Image,
  Loading,
  NavBar
} from 'vant';
import { getUser } from '../api/admin'

export default {
  components: {
    [Cell.name]: Cell,
    [CellGroup.name]: CellGroup,
    [Image.name]: Image,
    [Loading.name]: Loading,
    [NavBar.name]: NavBar
  },
  data() {
    return {
      address: this.$route.query.address,
      loading: true,
      info: {},
      genderMap: {
        0: '未知',
        1: '男',
        2: '女'
      }
    };
  },
  mounted() {
    this.init()
  },
  methods: {
    init() {
      this.loading = true
      getUser(this.address).then(res => {
        this.info = res.data
        this.loading = false
      })
    }
  }
};
</script>
