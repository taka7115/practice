
<template>
  <div>
    <kv :name="name">
      <template #mainCont>
        <slot name="mainCont">ここにkvが入ります。</slot>
      </template>
    </kv>
    <sourceCode :name="name">
      <template #html>
        <slot name="html">ここにhtmlが入ります。</slot>
      </template>
      <template #css>
        <slot name="css">ここにcssが入ります。</slot>
      </template>
      <template #javascript>
        <slot name="javascript">ここにjavascriptが入ります。</slot>
      </template>
    </sourceCode>
    <point :name="name"></point>
    <nz></nz>
  </div>
</template>



<script>
import kv from "./page/Kv";
import sourceCode from "./page/SourceCode";
import point from "./page/Point";
import nz from "./page/Nz";

export default {
  components: {
    sourceCode,
    kv,
    point,
    nz
  },
  props: ["name"]
};
</script>

