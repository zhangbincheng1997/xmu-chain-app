<template>
  <div>
    <van-cell-group inset>
      <van-cell>
        <van-tag v-if="history.length === 0" type="success" plain round>
          <van-icon name="good-job" />首次扫码，正品认证！
        </van-tag>
        <van-tag v-else type="danger" plain round>
          <van-icon name="bell" />多次扫码，谨防假冒！
        </van-tag>
      </van-cell>
      <van-cell title="首次扫码时间">{{ history.length > 0 ? history[0].createTime : '-' }}</van-cell>
      <van-cell title="首次扫码地点">{{ history.length > 0 ? history[0].location : '-' }}</van-cell>
      <van-cell title="扫码记录" is-link @click="show = true">{{ history.length }} 条</van-cell>
    </van-cell-group>

    <van-dialog v-model="show" title="扫码记录" close-on-click-overlay>
      <div style="text-align: center; line-height: 25px; font-size: small;">
        <van-row v-for="(item, i) in history.slice((query.page-1)*query.limit,query.page*query.limit)" :key="i">
          <van-col span="2">{{ (query.page-1)*query.limit + i + 1 }}</van-col>
          <van-col span="6">{{ item.ip }}</van-col>
          <van-col span="8">{{ item.location }}</van-col>
          <van-col span="8">{{ item.createTime }}</van-col>
        </van-row>
        <van-pagination v-model="query.page" :items-per-page="query.limit" :total-items="history.length" />
      </div>
    </van-dialog>
  </div>
</template>

<script>
import {
  Cell,
  CellGroup,
  Col,
  Dialog,
  Icon,
  Pagination,
  Row,
  Tag,
} from 'vant';

export default {
  name: 'Shop',
  components: {
    [Cell.name]: Cell,
    [CellGroup.name]: CellGroup,
    [Col.name]: Col,
    [Dialog.Component.name]: Dialog.Component,
    [Icon.name]: Icon,
    [Pagination.name]: Pagination,
    [Row.name]: Row,
    [Tag.name]: Tag
  },
  props: {
    history: {
      type: Array,
      required: true
    }
  },
  data() {
    return {
      show: false,
      query: {
        page: 1,
        limit: 10
      }
    }
  }
}
</script>
