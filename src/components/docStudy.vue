<template>
  <el-row style="width: 100%; height: 100%;">
    <el-col :span="4" style="height: 30%; padding: 15px; margin: 10px;">
      <span style="font-weight: bold">索引</span>
      <el-tree  node-key="id"
                icon-class="el-icon-arrow-right"
                lazy
                :props="defaultProps"
                @node-click="handleNodeClick"
                :load="load"
                :show-overflow-tooltip='true'
                style="margin-top: 15px;">
        <div class="Node" slot-scope="{ node, data }" >
              <span >{{node.label}}</span>
        </div>
      </el-tree>
    </el-col>
    <el-col :span="19" style="height: 100%;">
      <el-container>
        <el-header style="font-size: 30px; text-align: center; margin-top: 30px; font-weight: bolder">
          <span>{{ titleData }}</span>
        </el-header>
        <el-main style="font-size: 18px; text-align: left; padding-left: 100px; padding-right: 100px;">
          <span>{{ contentData }}</span>
        </el-main>
      </el-container>
    </el-col>
  </el-row>

</template>

<script>
export default {
  name: "docStudy",
  data() {
    return {
      dataList: [],
      titleData: '',
      contentData: '',
      defaultProps: {
        label: 'label',
        isLeaf: 'leaf',
        children: 'children'
      },
    }},
  created() {
  },
  methods:
    {
      loadNode(node, resolve) {
        if (node.level === 0) {
          return resolve([{ label: '全部' }]);
        }
        if (node.level > 1) return resolve([]);

        setTimeout(() => {
          const data = [{
            label: '文章一',
            leaf: true
          }, {
            label: '文章二'
          }];

          resolve(data);
        }, 500);
      },
      handleNodeClick(node) {
        if (node.leaf === true)
        {
          const param = {
            label: node.label
          }
          const token = this.$cookie.getCookie("token");
          const header = {
            'token': token
          }
          this.$axios.get("/getArticle", { params: param, headers: header })
            .then(res => {
              this.contentData = res.data.data;
              this.titleData = node.label;
            });
        }
      },
      load(node, resolve) {
        if (node.level === 0)
        {
          return resolve([
            { label: '汽车' },
            { label: '问答教程' }
            ]);
        }
        else {
          const param = {
            label: node.label
          }
          const token = this.$cookie.getCookie("token");
          const header = {
            'token': token
          }
          this.$axios.get("/getArticleList", { params: param, headers: header })
            .then(res => {
              const data = [];
              for (let i = 0; i < res.data.data.length; i++)
              {
                const item = {
                  label: res.data.data[i],
                  leaf: true
                }
                data.push(item);
              }
              resolve(data);
            })
        }
      }
    }
}
</script>

<style scoped>
.Node{
  overflow: hidden;
  text-overflow: ellipsis;
}
</style>
