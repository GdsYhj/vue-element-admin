<template>
  <div id="app">
    <router-view />
  </div>
</template>

<script>
export default {
  name: 'App'
}
</script>

<style>
.el-date-editor .el-input__prefix {

  position: absolute;

  top: 0;

  right: 5px;

  display: block;

  width: 100%;

}

.el-date-editor .el-icon-date:after {

  content: "\e78e";

  position: absolute;

  top: 5px;

  right: 30px;

}

.el-date-editor .el-icon-date:before {

  content: "";

}

.el-date-editor .el-input__icon {

  width: 100%;

}
</style>
