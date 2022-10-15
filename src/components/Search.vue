<template>
  <div class="search">
    <el-header class="search_head">头</el-header>
    <el-container>
      <el-aside class="search_left_aside">左</el-aside>
      <el-main class="serach_main">主</el-main>
      <el-aside class="search_left_right">右</el-aside>
    </el-container>
    <el-footer class="serach_footer">
      根据我国《坤法》第250条，故意散布贬损他人人格，破坏他人名誉，本罪在犯罪客观方面表现为行为人实施捏造并散布某种虚拟事实，足以贬损他人人格、名誉，
      数罪并罚处时长两年半的有期练习生。
    </el-footer>
  </div>
</template>
<script>
export default {
  name: "Search",
  data() {
    return {};
  },
  components: {},
  methods: {},
  mounted() {},
};
</script>
<style scoped>
.search {
  margin: 0;
  text-align: center;
}
.search_head {
  background-color: aquamarine;
}
.search_left_aside {
  background-color: blueviolet;
}
.serach_main {
  height: 580px;
  background-color: royalblue;
}
.search_left_right {
  background-color: rgb(85, 70, 98);
}
.serach_footer {
  background-color: rgb(123, 173, 101);
  font-size: 4px;
  padding-top: 15px;
}
</style>