
<template>
  <div>
    <kv :name="name" :portrait="portrait">
      <template #mainCont>
        <slot name="mainCont">ここにkvが入ります。</slot>
      </template>
    </kv>
    <sourceCode :name="name" :tab="tab" :csssp="csssp" :jssp="jssp">
      <template #html>
        <slot name="html">今回、HTMLの記述はありません。</slot>
      </template>
      <template #css>
        <slot name="css">今回、CSSの記述はありません。</slot>
      </template>
      <template #csssp>
        <slot name="csssp">今回、CSSSpの記述はありません。</slot>
      </template>
      <template #js>
        <slot name="js">今回、JavaScriptの記述はありません。</slot>
      </template>
      <template #jssp>
        <slot name="jssp">今回、JavaScriptSpの記述はありません。</slot>
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
  props: {
    name: {
      type: String,
      default: ""
    },
    tab: {
      type: String,
      default: ""
    },
    portrait: {
      type: Boolean,
      default: false
    },
    csssp: {
      type: Boolean,
      default: false
    },
    jssp: {
      type: Boolean,
      default: false
    }
  }
};
</script>

