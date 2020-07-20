<script src="../../plugins/element.js"></script>
<template>
  <div>
    <!--面包屑-->
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/welcome' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>商品</el-breadcrumb-item>
      <el-breadcrumb-item>商品列表</el-breadcrumb-item>
    </el-breadcrumb>
    <!--搜索栏-->
    <el-card class="box-card">
      <div slot="header" class="clearfix">
        <span style="position: relative; top: 7px; font-size: 14px">搜索</span>
        <el-button-group style="float: right; padding: 3px 0">
          <el-button
            type="primary"
            icon="el-icon-search"
            size="mini"
            @click="btnSearch"
            >搜索</el-button
          >
          <el-button
            type="primary"
            icon="el-icon-refresh"
            size="mini"
            @click="btnReset"
            >重置</el-button
          >
        </el-button-group>
      </div>

      <el-form :inline="true" size="mini">
        <el-row :gutter="20">
          <el-col :span="colSize">
            <el-form-item label="商品名称">
              <el-input v-model="searchForm.keyword" clearable></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="colSize">
            <el-form-item label="商品货号">
              <el-input v-model="searchForm.productSn" clearable></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="colSize">
            <el-form-item label="商品分类">
              <el-cascader
                @change="handleCateChange"
                v-model="productCateValue"
                :options="productCateOptions"
                :props="{ expandTrigger: 'hover', label: 'name', value: 'id' }"
              >
              </el-cascader>
            </el-form-item>
          </el-col>
        </el-row>

        <el-row :gutter="20">
          <el-col :span="colSize">
            <el-form-item label="上架状态">
              <el-select
                v-model="searchForm.publishStatus"
                placeholder="请选择"
              >
                <el-option
                  v-for="item in publishStatusOptions"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
                >
                </el-option>
              </el-select> </el-form-item
          ></el-col>
          <el-col :span="colSize">
            <el-form-item label="审核状态">
              <el-select v-model="searchForm.verifyStatus" placeholder="请选择">
                <el-option
                  v-for="item in verifyStatusOptions"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
                >
                </el-option>
              </el-select> </el-form-item
          ></el-col>
          <el-col :span="colSize"
            ><el-form-item label="商品品牌">
              <el-select v-model="searchForm.brandId" placeholder="请选择">
                <el-option
                  v-for="item in productBrandList"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
                >
                </el-option>
              </el-select> </el-form-item
          ></el-col>
        </el-row>
      </el-form>
    </el-card>
    <!--商品列表-->
    <el-card class="box-card">
      <div slot="header" class="clearfix">
        <span style="position: relative;top: 7px">商品列表</span>
        <el-button-group class="login-btn" style="float: right; padding: 3px 0">
          <el-button
            type="primary"
            size="mini"
            @click="btnAdd"
            icon="el-icon-circle-plus-outline"
            >添加</el-button
          >
          <el-button type="primary" size="mini" icon="el-icon-delete"
            >批量删除</el-button
          >
        </el-button-group>
      </div>
      <!--商品展示栏-->
      <el-table size="mini" :data="productList" border style="width: 100%">
        <el-table-column align="center" type="selection" width="55">
        </el-table-column>
        <el-table-column align="center" prop="id" label="编号" width="60">
        </el-table-column>
        <el-table-column align="center" label="图片" width="120">
          <template slot-scope="scope">
            <el-image style="height: 100px" :src="scope.row.pic"></el-image>
          </template>
        </el-table-column>
        <el-table-column width="120" align="center" label="商品名称">
          <template slot-scope="scope">
            <p>{{ scope.row.name }}</p>
            <p>品牌：{{ scope.row.brandName }}</p>
          </template>
        </el-table-column>
        <el-table-column width="100" align="center" label="价格/货号">
          <template slot-scope="scope">
            <p>价格：￥{{ scope.row.price }}</p>
            <p>货号：{{ scope.row.productSn }}</p>
          </template>
        </el-table-column>
        <el-table-column align="center" label="标签">
          <template slot-scope="scope">
            <p>
              上架：<el-switch
                v-model="scope.row.publishStatus"
                active-color="#13ce66"
                inactive-color="#ff4949"
                :active-value="1"
                :inactive-value="0"
              >
              </el-switch>
            </p>
            <p>
              新品：<el-switch
                v-model="scope.row.newStatus"
                active-color="#13ce66"
                inactive-color="#ff4949"
                :active-value="1"
                :inactive-value="0"
              >
              </el-switch>
            </p>
            <p>
              推荐：<el-switch
                v-model="scope.row.recommandStatus"
                active-color="#13ce66"
                inactive-color="#ff4949"
                :active-value="1"
                :inactive-value="0"
                @change="handleStatus('rec', scope.row)"
              >
              </el-switch>
            </p>
          </template>
        </el-table-column>
        <el-table-column align="center" prop="sort" label="排序" width="50">
        </el-table-column>
        <el-table-column align="center" label="SKU库存">
          <template>
            <el-button type="primary" icon="el-icon-edit" circle></el-button>
          </template>
        </el-table-column>
        <el-table-column align="center" prop="sale" label="销量" width="80">
        </el-table-column>
        <el-table-column align="center" label="审核状态">
          <template slot-scope="scope">
            <p>{{ scope.row.verifyStatus | verifyStatusFilter }}</p>
            <p><el-button type="text">审核详情</el-button></p>
          </template>
        </el-table-column>
        <el-table-column width="150" align="center" label="操作">
          <template slot-scope="scope">
            <p>
              <el-button size="mini">查看</el-button>
              <el-button size="mini">编辑</el-button>
            </p>
            <p>
              <el-button size="mini">日志</el-button>
              <el-button
                size="mini"
                type="danger"
                @click="btnDelete(scope.$index, scope.row)"
                >删除</el-button
              >
            </p>
          </template>
        </el-table-column>
      </el-table>
      <!--分页-->
      <el-pagination
        style="margin-top: 20px"
        background
        @size-change="btnSearch"
        @current-change="handleCurrentChange"
        :current-page="page.pageNum"
        :page-sizes="[5, 10, 15]"
        :page-size="page.pageSize"
        layout="total, sizes, prev, pager, next, jumper"
        :total="page.total"
      >
      </el-pagination>
    </el-card>
    <!--弹出对话框-->
    <el-dialog title="添加商品" :visible.sync="dialogFormVisible">
      <el-form :model="productForm">
        <el-form-item label="日期" label-width="80px">
          <el-input v-model="productForm.date"></el-input>
        </el-form-item>
        <el-form-item label="名称" label-width="80px">
          <el-input v-model="productForm.name"></el-input>
        </el-form-item>
        <el-form-item label="地址" label-width="80px">
          <el-input v-model="productForm.address"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="btnSave">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import { api_productList, api_updateProductStatus } from '@/api/product'
import { api_listWithChildren } from '@/api/productCate'
export default {
  name: 'ProductList',
  created() {
    //生命周期创建完成过程
    this.handleProductList()
    this.handleProductCate()
  },
  data() {
    return {
      page: {
        //分页栏属性
        pageNum: 1,
        pageSize: 5,
        totalPage: 3,
        total: 11
      },
      searchForm: {
        keyword: null,
        pageNum: 1,
        pageSize: 5,
        publishStatus: null,
        verifyStatus: null,
        productSn: null,
        productCategoryId: null,
        brandId: null
      },
      inputName: '',
      inputNo: '',
      colSize: 8,
      dialogFormVisible: false, //控制弹出对话框
      editRowIndex: -1, // 让当前编辑的那一条记录index 默认为-1
      productForm: {
        //添加对话框的属性
        date: '',
        name: '',
        address: ''
      },
      options: [],
      publishStatusOptions: [
        {
          value: 1,
          label: '上架'
        },
        {
          value: 0,
          label: '下架'
        }
      ],
      verifyStatusOptions: [
        {
          value: 1,
          label: '审核通过'
        },
        {
          value: 0,
          label: '未审核'
        }
      ],
      productList: [],
      value: [],
      productBrandList: [],
      productCateValue: [],
      productCateOptions: []
    }
  },
  filters: {
    //过滤器
    verifyStatusFilter(value) {
      //根据审核状态讲0，1改变为是否审核通过
      let text = '审核通过'
      if (value !== 1) {
        text = '未审核'
      }
      return text
    }
  },
  methods: {
    async handleStatus(type, row) {
      let url = ''
      if (type === 'rec') {
        //推荐
        url = 'recommendStatus'
      }
      let ids = []
      ids.push(row.id)
      // console.log(url, row.recommandStatus)
      const res = await api_updateProductStatus(url, {
        ids: 26,
        recommendStatus: row.recommandStatus
      })
      console.log(res)
    },
    handleCurrentChange() {},
    handleCateChange(value) {
      console.log(value)
      console.log(this.productCateValue)
    },
    async handleProductList() {
      const { data: res } = await api_productList()
      console.log(res)
      this.productList = res.data.list
    },
    async handleProductCate() {
      this.productCateOptions = []
      const { data: res } = await api_listWithChildren()
      // console.log(res)
      this.productCateOptions = res.data
      /*
	        分析item
	        要获取结果是啥
	        [
	            label: ''
	            value: ''
	            children: []
	        ]
	    */
      // let list = res.data
      // for (let item of list) {
      //     let node = {
      //       label: '',
      //       value: -1,
      //       children: []
      //     }
      //     console.log(item)
      //   node.label = item.name
      //   node.value = item.id
      //   if (item.children != null && item.children.length > 0) {
      //       //遍历item中的children
      //     for (let child of item.children) {
      //         node.children.push({
      // 	        label: child.name,
      // 	        value: child.id
      //         })
      //     }
      //   }
      //   this.productCateOptions.push(node)
      // }
    },
    //数据保存
    btnSave() {
      this.dialogFormVisible = false
      /*
      unshift()：头部插入
      push()：底部插入
      splice(从哪里开始, 删除多少个, 添加)中间插入
       */
      if (this.editRowIndex == -1) {
        //添加
        // this.tableData.push(this.productForm)
      } else {
        //修改
        // this.tableData.splice(this.editRowIndex, 1, this.productForm)
      }

      //清空表单内容
      this.productForm = { brand_right: 0 }
      // this.productForm.date = ''
      // this.productForm.name = ''
      // this.productForm.address = ''
    },
    //添加数据
    btnAdd() {
      this.dialogFormVisible = true
      this.editRowIndex = -1
    },
    //编辑
    btnEdit(index, row) {
      console.log('进入了编辑')
      console.log(index, row)
      this.editRowIndex = index
      // 点击编辑按钮的时候，将对话框显示
      this.dialogFormVisible = true
      // 将内容显示在表单上
      this.productForm.date = row.date
      this.productForm.name = row.name
      this.productForm.address = row.address
    },
    //删除
    btnDelete(index, row) {
      console.log(index, row)
      this.$confirm(`删除名称为：${row.name} 的数据`, '确认删除?', {
        confirmButtonText: '确定'
        /*callback: () => {
            //前端删除
            let res = this.tableData.splice(index,1)
            let msg = '删除成功'
            if(!res) {
                msg = '删除失败'
            }
            this.$message({
                type: 'info',
                message: msg
            });
        }*/
      }).then(() => {
        //前端删除
        let res = this.tableData.splice(index, 1)
        let msg = '删除成功'
        if (!res) {
          msg = '删除失败'
        }
        this.$message({
          type: 'info',
          message: msg
        })
      })
    },
    //搜索
    btnSearch() {
      console.log(1)
      this.searchForm.productCategoryId = this.productCateValue[1]
      this.handleProductList()
    },
    //重置
    btnReset() {}
  }
}
</script>

<style scoped>
.clearfix:before,
.clearfix:after {
  display: table;
  content: '';
}
.clearfix:after {
  clear: both;
}

.box-card {
  margin-top: 20px;
}
</style>
