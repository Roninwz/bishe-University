<template>
  <el-table-column
    :prop="prop"
    :width="width"
    :label="label">
    <template slot-scope="scope">
      <dol-dict :code="dictCode" :option="scope.row[prop]" :label-field="labelField"></dol-dict>
    </template>
  </el-table-column>
</template>

<script>
  export default {
    props: {
      prop: { type: String },            //列code
      label: { type: String },            //列标题
      dictCode: { type: String },            //数据字典编码
      labelField: { type: String, default: 'text' },            //数据字典编码
      width: { type: String },            //列宽
    }
  }
</script>
