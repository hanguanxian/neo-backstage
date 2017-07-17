<template>
    <div class="table">
        <div class="crumbs">
            <el-breadcrumb separator="/">
                <el-breadcrumb-item><i class="el-icon-menu"></i> 文章列表</el-breadcrumb-item>
            </el-breadcrumb>
        </div>

        <div class="handle-box">
            <el-button type="primary" icon="plus" @click="classifyFormVisible = true">添加分类</el-button>
        </div>
        <el-table :data="classify.classifyData" border style="width: 100%" ref="classify.multipleTable" >
            <el-table-column prop="auto_id" label="id"  width="150">
            </el-table-column>
            <el-table-column prop="cate_name" label="分类名称"  width="150">
            </el-table-column>
            <el-table-column prop="cate_code" label="code">
            </el-table-column>
            <!-- <el-table-column prop="sort" label="sort">
            </el-table-column> -->
            <el-table-column label="是否启用" width="120">
              <template scope="scope">
                 <template v-if="scope.row.enable == true">是</template>
                 <template v-else>否</template>
              </template>
            </el-table-column>
            <el-table-column label="操作" width="180">
                <template scope="scope">
                    <el-button size="small"
                            @click="handleEdit(scope.$index, scope.row,'classify')">编辑</el-button>
                    <el-button size="small" type="danger"
                            @click="handleDelete(scope.$index, scope.row,'classify')">删除</el-button>
                </template>
            </el-table-column>
        </el-table>

        <el-dialog title="分类" :visible.sync="classifyFormVisible">
          <el-form :model="classify.form" label-position="right" ref="classifyForm">
              <el-form-item label="分类名称"
                    :rules="{ required: true, message: '请填写分类名称', trigger: 'blur'}">
                    <el-input v-model="classify.form.typeName"></el-input>
              </el-form-item>
              <el-form-item label="分类code"
                    :rules="{ required: true, message: '请填写分类code', trigger: 'blur'}">
                    <el-input v-model="classify.form.typeCode"></el-input>
              </el-form-item>
              <!-- <el-form-item label="排序"
                    :rules="{ required: true, message: '请填写分类排序', trigger: 'blur'}">
                    <el-input v-model="classify.form.sort"></el-input>
              </el-form-item> -->
              <!-- <el-form-item>
                  <el-checkbox v-model="classify.form.enable" value="true">是否启用</el-checkbox>
              </el-form-item> -->
              <el-form-item>
                  <el-button @click="handleEditCancel">取 消</el-button>
                  <el-button type="primary" @click="submit('classifyForm')">确 定</el-button>
              </el-form-item>
          </el-form>
        </el-dialog>

        <div class="handle-box" style="margin-top: 20px;">
            <el-select v-model="selectClassify"  placeholder="选择分类" class="handle-select mr10" @change="remoteChange">
                <el-option
                  v-for="item in classify.classifyData"
                  :key="item.cate_code"
                  :label="item.cate_name"
                  :value="item.cate_code">
                </el-option>
            </el-select>
            <el-button type="primary" icon="plus" @click="articleFormVisible = true">添加文章</el-button>
        </div>
        <el-table :data="article.articleData" border style="width: 100%" ref="article.multipleTable">
            <el-table-column prop="auto_id"  label="id">
            </el-table-column>
            <el-table-column prop="news_date" label="日期" sortable width="150">
                <template scope="scope">
                   {{ new Date(scope.row.news_date).toLocaleDateString().replace(/\//g, '-') }}
                </template>
            </el-table-column>
            <el-table-column prop="title" label="标题">
            </el-table-column>
            <el-table-column label="跳转地址" width="120">
              <template scope="scope">
                <a :href="scope.row.link" target="_blank">{{ scope.row.link }}</a>
              </template>
            </el-table-column>
            <el-table-column prop="pic" label="图片" width="120">
                <template scope="scope">
                  <img :src="scope.row.pic" style="width: 100px;"/>
                </template>
            </el-table-column>
            <el-table-column label="操作" width="180">
                <template scope="scope">
                    <el-button size="small"
                            @click="handleEdit(scope.$index, scope.row,'article')">编辑</el-button>
                    <el-button size="small" type="danger"
                            @click="handleDelete(scope.$index, scope.row,'article')">删除</el-button>
                </template>
            </el-table-column>
        </el-table>

        <el-dialog title="文章" :visible.sync="articleFormVisible">
          <el-form :model="article.form" ref="articleForm">
              <el-form-item label="文章类别code" :rules="{required: true, message: '域名不能为空', trigger: 'blur'}">
                    <el-input v-model="article.form.articleTypeCode"></el-input>
              </el-form-item>
              <el-form-item label="文章标题" :rules="{required: true, message: '域名不能为空', trigger: 'blur'}">
                    <el-input v-model="article.form.articleTitle"></el-input>
              </el-form-item>
              <el-form-item label="文章日期" :rules="{required: true, message: '请选择日期', trigger: 'blur'}">
                    <el-date-picker type="date" format="yyyy-MM-dd" v-model="tempDate" style="width: 100%;"></el-date-picker>
              </el-form-item>
              <el-form-item label="文章图片链接" :rules="{required: true, message: '请填写图片链接', trigger: 'blur'}">
                    <el-input v-model="article.form.imgLink"></el-input>
              </el-form-item>
              <el-form-item label="文章跳转地址" :rules="{required: true, message: '请填写文章跳转地址', trigger: 'blur'}">
                    <el-input v-model="article.form.articleLink"></el-input>
              </el-form-item>
              <el-form-item>
                  <el-button @click="handleEditCancel">取 消</el-button>
                  <el-button type="primary" @click="submit('articleForm')">确 定</el-button>
              </el-form-item>
          </el-form>
        </el-dialog>

    </div>
</template>

<script>
    export default {
        data() {
            return {
                article: {
                    articleUrl: '/articles/getArticlesByType?articleTypeCode=',
                    articleData: [],
                    multipleSelection: [],
                    form: {},
                    query: ''
                },
                classify: {
                    classifyUrl: '/articles/getTypes',
                    classifyData:[],
                    form: {}
                },
                tempDate:"",
                curPage: 1,
                selectClassify: "cbyd",
                updateBtn: false,
                articleFormVisible: false,
                classifyFormVisible: false
            }
        },
        created(){
            this.getData();
        },
        methods: {
            remoteChange(){
                const self = this;
                self.getAllArticle();
            },
            getData(){//从接口获取数据
                let self = this;
                self.getAllClassify();
                self.getAllArticle();
            },
            getAllArticle(){
                let self = this;
                self.$axios.get(self.article.articleUrl + self.selectClassify).then((res) => {
                    self.article.articleData = res.data.data;
                });
            },
            getAllClassify(){
                let self = this;
                self.$axios.get(self.classify.classifyUrl).then((res2) => {
                    self.classify.classifyData = res2.data.data;
                });
            },
            onSearch() {//筛选
                const self = this;
                return self.article.articleData.filter(function (d) {
                    if(d.title.indexOf(self.article.query) > -1){
                        return d;
                    }
                })
            },
            handleEdit(index, row, type) {
                let self = this;
                self.updateBtn = true;
                if(type == "article") {
                    self.article.form.articleId = row.auto_id;
                    self.article.form.articleTypeCode = this.selectClassify;//TODO
                    self.article.form.articleTitle = row.title;
                    self.article.form.articleDate = row.news_date;
                    self.tempDate = row.news_date;
                    self.article.form.imgLink = row.pic;
                    self.article.form.articleLink = row.link;
                    self.articleFormVisible = true;
                } else if(type == "classify") {
                    self.classify.form.typeId = row.auto_id;
                    self.classify.form.typeCode = row.cate_code;
                    self.classify.form.typeName = row.cate_name;
                    self.classifyFormVisible = true;
                }
            },
            handleEditCancel() {
                this.article.form = {};
                this.classify.form = {};
                this.updateBtn = false;
                this.articleFormVisible = false;
                this.classifyFormVisible = false;
            },
            handleDelete(index, row, type) {
                let self = this;
                if(type == "article") {
                    self.$axios.post('/articles/delArticle', {articleId: row.auto_id}).then(function (response) {
                        self.getAllArticle();
                        self.$message("文章删除成功");
                     }).catch(function (error) {
                        self.$message("文章删除失败");
                    });
                } else if(type == "classify") {
                    self.$axios.post('/articles/delType', {typeId: row.auto_id}).then(function (response) {
                        self.getAllClassify();
                        self.$message("文章类型删除成功");
                     }).catch(function (error) {
                        self.$message("文章类型删除失败");
                    });

                }
            },
            submit: function(formName){
                const self = this;
                if(self.updateBtn) {
                    if(formName === "articleForm") {
                        self.article.form.articleDate = new Date(self.tempDate).toLocaleDateString().replace(/\//g, '-');
                        self.$axios.post('/articles/updateArticle', self.article.form).then(function (response) {
                            self.articleFormVisible = false;
                            self.updateBtn = false;
                            self.getAllArticle();
                            self.$message("文章更新成功");
                         }).catch(function (error) {
                            self.updateBtn = false;
                            self.$message("文章更新失败");
                        });
                    } else if(formName === "classifyForm") {
                        self.$axios.post('/articles/updateType', self.classify.form).then(function (response) {
                            self.classifyFormVisible = false;
                            self.updateBtn = false
                            self.getAllClassify();;
                            self.$message("分类更新成功");
                         }).catch(function (error) {
                            self.updateBtn = false;
                            self.$message("分类更新失败");
                        });
                    }
                } else {
                    if(formName === "articleForm") {
                        if(self.article.form.articleTypeCode == "") {
                            self.$message("文章类别不能为空");
                            return false;
                        } else if(self.article.form.articleTitle == "") {
                            self.$message("文章标题不能为空");
                            return false;
                        } else if(self.tempDate == "") {
                            self.$message("文章日期不能为空");
                            return false;
                        } else if(self.article.form.imgLink == "") {
                            self.$message("文章图片链接不能为空");
                            return false;
                        } else if(self.article.form.articleLink == "") {
                            self.$message("文章跳转地址不能为空");
                            return false;
                        }
                        self.article.form.articleDate = new Date(self.tempDate).toLocaleDateString().replace(/\//g, '-');
                        self.$axios.post('/articles/addArticle', self.article.form).then(function (response) {
                            //self.article.form = {};
                            self.articleFormVisible = false;
                            self.getAllArticle();
                            self.$message("文章提交成功");
                         }).catch(function (error) {
                            self.$message("文章提交失败");
                        });
                    } else if(formName === "classifyForm") {
                        if(self.classify.form.typeName == "") {
                            self.$message("文章分类名字不能为空");
                            return false;
                        } else if(self.classify.form.typeCode == "") {
                            self.$message("文章分类code不能为空");
                            return false;
                        }
                        self.$axios.post('/articles/addType', self.classify.form).then(function (response) {
                            //self.classify.form = {};
                            self.classifyFormVisible = false;
                            self.getAllClassify();
                            self.$message("文章分类提交成功");
                         }).catch(function (error) {
                            self.$message("文章分类提交失败");
                        });
                    }
                }
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
