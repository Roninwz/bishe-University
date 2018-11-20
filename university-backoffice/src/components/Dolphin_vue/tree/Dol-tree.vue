<template>
  <div>
    <el-card class="box-card dolphin-tree" v-if="cardFlag">
      <div slot="header" class="clearfix" v-if="titleFlag">
        <span>{{title}}</span>
        <span class="card-button">
          <slot name="button"></slot>
        </span>
      </div>
      <el-tree
        ref="tree"
        node-key="_id"
        :data="treeData"
        :default-expand-all="defaultExpandAll"
        :expand-on-click-node="expandOnClickNode"
        @current-change="currentChange"
        @node-click="nodeClick"
        :props="{label:'name', children: 'children'}">
        <slot>1</slot>
      </el-tree>
    </el-card>
    <el-tree
      v-else
      ref="tree"
      node-key="_id"
      :data="treeData"
      :default-expand-all="defaultExpandAll"
      :expand-on-click-node="expandOnClickNode"
      @current-change="currentChange"
      @node-click="nodeClick"
      :props="{label:'name', children: 'children'}">
      <span class="custom-tree-node" slot-scope="{node, data}">
          <slot v-bind:node="node" v-bind:data="data"><span>{{node.label}}</span></slot>
      </span>
    </el-tree>
  </div>

</template>

<script>
  export default {
    props: {
      source: { type: String, default: 'server' },            //数据源，server | local
      //---------------------- if source === server --------------------------------//
      url: { type: String },                                  //后台地址
      method: { type: String, default: 'get' },              //请求方式
      defaultQueryParams: { type: Object, default: function(){return {};} },             //请求参数
      initDataFlag: { type: Boolean, default: true },         //默认是否请求一次数据
      //---------------------- if source === local  --------------------------------//
      defaultData: { type: Array, default: function(){return [];} },                     //后台地址

      checkFlag: {type: Boolean, default: true },
      defaultExpandAll: {type: Boolean, default: false },
      expandOnClickNode: {type: Boolean, default: false },
      title: {type: String, default: '树'},
      titleFlag: {type: Boolean, default: true},
      cardFlag: {type: Boolean, default: true},
    },
    data:function () {
      let params = {
        treeData: [],
        queryParams : this.defaultQueryParams,
      };
      return params;
    },
    computed:{

    },
    methods:{
      query: function (queryParams) {
        if(this.source === 'server'){
          let url = this.url;
          this.$ajax({
            url:url,
            method:this.method,
            data: queryParams || this.queryParams,
          }).then((data) => {
            this.treeData = data.rows;
          });
        }else{

        }
      },
      currentChange: function (data, node) {
        this.$emit('current-change', data, node);
      },
      nodeClick: function (data, node, tree) {
        this.$emit('node-click', data, node, tree);
      },
    },

    created: function () {
      if(this.source === 'server'){
        if(this.initDataFlag){
          this.query();
        }
      }else{
        this.treeData = this.defaultData;
      }
    }
  }
</script>
