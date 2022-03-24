<template>
  <div>
    <van-cell-group inset>
      <van-cell :title="items.name" />
      <van-cell>
        <van-form label-width="100px">
          <van-field v-for="(item, i) in items.content" :key="i" :label="item.title">
            <template #input>
              <span v-if="item.type === 'text'">{{ item.value }}</span>
              <image-preview v-if="item.type === 'image'" :image="item.value" :width="200" />
              <video v-if="item.type === 'video'" controls style="width: 200px;"><source :src="IPFS_GATEWAY + '/' + item.value"></video>
              <audio v-if="item.type === 'audio'" controls style="width: 200px;"><source :src="IPFS_GATEWAY + '/' + item.value"></audio>
              <a v-if="item.type === 'file'" :href="IPFS_GATEWAY + '/' + item.value" download>{{ item.value }}</a>
            </template>
          </van-field>
        </van-form>
      </van-cell>
      <van-cell>
        <van-tag type="success" plain round>
          <van-icon name="lock" />已上链：{{ items.txId.substring(0, 38) + '...' }}
        </van-tag>
      </van-cell>
    </van-cell-group>
  </div>
</template>

<script>
import {
  Cell,
  CellGroup,
  Icon,
  Form,
  Field,
  Tag,
} from 'vant';
import ImagePreview from '../../../components/ImagePreview'

export default {
  name: 'ItemsCard',
  components: {
    [Cell.name]: Cell,
    [CellGroup.name]: CellGroup,
    [Icon.name]: Icon,
    [Form.name]: Form,
    [Field.name]: Field,
    [Tag.name]: Tag,
    ImagePreview
  },
  props: {
    items: {
      type: Object,
      required: true
    }
  }
}
</script>
