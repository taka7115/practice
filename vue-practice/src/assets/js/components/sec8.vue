<!-- ここにhtmlを記述-------------------------------------------- -->
<template>
  <h1 class="compoText">{{compoText}}</h1>
</template>


<!-- ここにjsを記述-------------------------------------------- -->
<script>
export default {
  name: "sec8",
  data: function() {
    return {
      compoText: "コンポーネント"
    };
  }
};
</script>


<!-- ここにcssを記述-------------------------------------------- -->
<style scoped>
.compoText {
  font-size: 20px;
  font-weight: bold;
  text-align: center;
  color: darkblue;
}
</style>
