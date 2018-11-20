<template>
  <el-select
    :class="{'m-placeholder':value===null}"
    :disabled="disabled"
    :multiple="multiple"
    :collapse-tags="collapseTags"
    :clearable = 'clearIcon'
    :value="value"
    @change="changeValue"
    :filterable="filterable"
    :allow-create="allowCreate"
    :default-first-option="defaultFirstOption"
    :placeholder="placeholder">
    <el-option v-if="!clearIcon" :label="emptyOptionLabel" :value="null"></el-option>
    <el-option
      v-for="o in options"
      :key="o[keyField]"
      :label="o[labelField]"
      :value="o[valueField]">
    </el-option>
  </el-select>
</template>

<script>
  export default {
    name: 'dol-select',
    props: {
      value: {default: null},                 //value
      defaultKeyField: {type: String, default: 'code'},                 //key
      defaultLabelField: {type: String, default: 'text'},               //label
      defaultValueField: {type: String, default: 'code'},               //value
      defaultServerKeyField: {type: String, default: '_id'},                 //key
      defaultServerLabelField: {type: String, default: 'name'},               //label
      defaultServerValueField: {type: String, default: '_id'},               //value
      clearIcon:{type:Boolean,default:true},
      emptyOptionLabel: {type: String, default: '--请选择--'},
      source: {type: String, default: 'dict'},              //数据源，dict | local | server
      //---------------------- if source === dict --------------------------------//
      dictCode: {type: String},                             //后台地址
      //---------------------- if source === server --------------------------------//
      url: {type: String},                                  //后台地址
      method: {type: String, default: 'get'},              //请求方式
      defaultQueryParams: {
        type: Object, default: function () {
          return {};
        }
      },             //请求参数
      //---------------------- if source === local  --------------------------------//
      defaultData: {
        type: Array, default: function () {
          return [];
        }
      },                     //可选项数据
      placeholder: {type: String, default: '--请选择--'},
      multiple: {type: Boolean, default: false},
      filterable: {type: Boolean, default: true},
      disabled: {type: Boolean, default: false},                 //disabled
      allowCreate: {type: Boolean, default: false},                 //allow-create
      collapseTags: {type: Boolean, default: true},                 //allow-create
      defaultFirstOption: {type: Boolean, default: false},                 //allow-create
      param: {},                 //params
    },
    data: function () {
      let params = {
        options: this.defaultData,
        queryParams: this.defaultQueryParams,

        keyField: this.source === 'server' ? this.defaultServerKeyField : this.defaultKeyField,
        labelField: this.source === 'server' ? this.defaultServerLabelField : this.defaultLabelField,
        valueField: this.source === 'server' ? this.defaultServerValueField : this.defaultValueField,
      };
      return params;
    },
    watch: {
      url(){
        this.getOption();
      },
      dictCode(){
        this.getOption();
      },
      defaultData(){
        this.options = this.defaultData;
      },
    },
    computed: {},
    methods: {
      changeValue(value){
        // 通过 input 事件带出数值
        this.$emit('input', value);
        this.$emit('change', value, this.options, this.param);
      },
      getOption(){
        if (this.source === 'dict') {
          this.$dict(this.dictCode).then(options => {
            this.options = options;
          });
        } else if (this.source === 'server') {
          this.$ajax({
            url: this.url,
            method: this.method,
            data: this.queryParams,
          }).then(reData => {
            this.options = reData.rows;
          }).catch(e => {
            console.error(e);
            this.options = [];
          });
        }
      }
    },
    created: function () {
      this.getOption();
    }
  }
</script>
