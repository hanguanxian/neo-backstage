<template>
    <div class="table">
        <div class="crumbs">
            <el-breadcrumb separator="/">
                <el-breadcrumb-item><i class="el-icon-menu"></i> 文章列表</el-breadcrumb-item>
            </el-breadcrumb>
        </div>
        <div class="handle-box">
            <el-input v-model="query" placeholder="筛选关键词" class="handle-input mr10"></el-input>
            <el-button type="primary" icon="search" @click="onSearch">搜索</el-button>
            <el-button type="primary" icon="plus" @click="dialogFormVisible = true">添加</el-button>
        </div>
        <el-table :data="tableData" border style="width: 100%" ref="multipleTable" @selection-change="handleSelectionChange">
            <el-table-column type="selection" width="55"></el-table-column>
            <el-table-column prop="date" label="日期" sortable width="150">
            </el-table-column>
            <el-table-column prop="title" label="标题">
            </el-table-column>
            <el-table-column label="跳转地址" width="120">
              <template scope="scope">
                <a :href="scope.row.link" target="_blank">{{ scope.row.link }}</a>
              </template>
            </el-table-column>
            <el-table-column prop="imgUrl" label="图片" width="120">
                <template scope="scope">
                  <img :src="scope.row.imgUrl" style="width: 100px;"/>
                </template>
            </el-table-column>
            <el-table-column label="操作" width="180">
                <template scope="scope">
                    <el-button size="small"
                            @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
                    <el-button size="small" type="danger"
                            @click="handleDelete(scope.$index, scope.row)">删除</el-button>
                </template>
            </el-table-column>
        </el-table>
        <div class="pagination">
            <el-pagination
                    @current-change ="handleCurrentChange"
                    layout="prev, pager, next"
                    :total="100">
            </el-pagination>
        </div>
        <el-dialog title="编辑文章" :visible.sync="dialogFormVisible">
          <el-form :model="form">
              <el-form-item label="文章标题"
                    :rules="[{ required: true, message: '请输入标题', trigger: 'blur' }]">
                    <el-input v-model="form.title"></el-input>
              </el-form-item>
              <el-form-item label="文章日期"
                    :rules="[{ required: true, message: '请选择日期', trigger: 'blur' },]">
                    <el-date-picker type="date" placeholder="选择日期" v-model="form.date" style="width: 100%;"></el-date-picker>
              </el-form-item>
              <el-form-item label="文章图片链接"
                    :rules="[{ required: true, message: '请填写图片链接', trigger: 'blur' },]">
                    <el-input v-model="form.imgUrl"></el-input>
              </el-form-item>
              <el-form-item label="文章跳转地址"
                    :rules="[{ required: true, message: '请填写文章跳转地址', trigger: 'blur' },]">
                    <el-input v-model="form.link"></el-input>
              </el-form-item>
          </el-form>
          <div slot="footer" class="dialog-footer">
                <el-button @click="handleEditCancel">取 消</el-button>
                <el-button type="primary" @click="submit">确 定</el-button>
          </div>
        </el-dialog>
    </div>
</template>

<script>
    export default {
        data() {
            return {
                url: '../../../static/article.json',
                tableData: [],
                cur_page: 1,
                multipleSelection: [],
                query: '',
                form: {},
                dialogFormVisible: false
            }
        },
        created(){
            this.getData();
        },
        methods: {
            handleCurrentChange(val){
                this.cur_page = val;
                this.getData();
            },
            getData(){
                let self = this;
                self.$axios.get(self.url, {page:self.cur_page}).then((res) => {
                    self.tableData = res.data.list;
                })
            },
            onSearch() {
                const self = this;
                return self.tableData.filter(function (d) {
                    if(d.title.indexOf(self.query) > -1){
                        return d;
                    }
                })
            },
            handleEdit(index, row) {
                let self = this;
                self.form.title = row.title;
                self.form.date = row.date;
                self.form.imgUrl = row.imgUrl;
                self.form.link = row.link;
                self.dialogFormVisible = true;
            },
            handleEditCancel() {
                this.form = {};
                this.dialogFormVisible = false;
            },
            handleDelete(index, row) {
                this.tableData.shift(index);
                //this.$message.error('删除第'+(index+1)+'行');
            },
            handleSelectionChange: function(val) {
                this.multipleSelection = val;
            },
            submit: function(){
                this.dialogFormVisible = false;
                // this.$refs[this.form].validate((valid) => {
                //       if (valid) {
                //         this.dialogFormVisible = false;
                //       } else {
                //         console.log('error submit!!');
                //         return false;
                //       }
                // });

            }
        }
    }
</script>

<style scoped>
.handle-box{
    margin-bottom: 20px;
}
.handle-del{
    border-color: #bfcbd9;
    color: #999;
}
.handle-select{
    width: 120px;
}
.handle-input{
    width: 300px;
    display: inline-block;
}
</style>
