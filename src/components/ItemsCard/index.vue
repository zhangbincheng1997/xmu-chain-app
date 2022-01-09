<template>
  <van-cell-group inset>
    <van-cell :title="items.name" />
    <van-cell>
      <van-form label-width="100px">
        <van-field v-for="(item, i) in items.content" :key="i" :label="item.title">
          <template #input>
            <span v-if="item.type === 'text'">{{ item.value }}</span>
            <img v-if="item.type === 'image'" :src="IPFS_GATEWAY + '/' + item.value" :style="style" alt="">
            <video v-if="item.type === 'video'" controls><source :src="IPFS_GATEWAY + '/' + item.value"></video>
            <audio v-if="item.type === 'audio'" controls><source :src="IPFS_GATEWAY + '/' + item.value"></audio>
            <a v-if="item.type === 'file'" :href="IPFS_GATEWAY + '/' + item.value" download>{{ item.value }}</a>
          </template>
        </van-field>
      </van-form>
    </van-cell>
    <van-cell>
      <van-tag v-if="items.txId" type="success" plain round>
        <van-icon name="lock" />已上链：{{ items.txId.substring(0, 40) + '...' }}
      </van-tag>
    </van-cell>
  </van-cell-group>
</template>

<script>
import {
  Cell,
  CellGroup,
  Icon,
  Form,
  Field,
  Tag
} from 'vant';

export default {
  name: 'ItemsCard',
  components: {
    [Cell.name]: Cell,
    [CellGroup.name]: CellGroup,
    [Icon.name]: Icon,
    [Form.name]: Form,
    [Field.name]: Field,
    [Tag.name]: Tag
  },
  props: {
    items: {
      type: Object,
      required: true
    },
    width: {
      type: String,
      default: '100px'
    },
    height: {
      type: String,
      default: '100px'
    }
  },
  data() {
    return {
      style: {
        width: this.width,
        height: this.height
      }
    }
  }
}
</script>
