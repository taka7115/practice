<template>
  <!-- 完璧とは、これ以上加えられないときではなく、これ以上削りとれないときに達成されるようだ -->
  <!-- アイデアを思いついたら、まず自分自身でビルドせよ。それが脳を鍛え、イノベーションへとつながる -->
  <!-- IEよ、滅べ！ -->
  <!-- プログラマの美徳は『怠惰』『短気』『傲慢』である。 -->

  <!-- プログラムは思った通りに動かない。書いた通りに動く。 -->

  <section class="c-kv">
    <h1 class="c-kvH1">
      HTML、CSS、JavaScriptを使用したコーディング作品集。芸術的かつ機能的なコーディングは、あなたのWeb制作のスキルアップに繋がるはずです。ぜひ参考に！
    </h1>

    <svg
      xmlns="http://www.w3.org/2000/svg"
      xmlns:xlink="http://www.w3.org/1999/xlink"
      viewBox="0 0 80 80"
      class="c-scrollBtn js-scrollBtn"
    >
      <defs>
        <filter
          id="turquoise"
          x="0"
          y="0"
          width="80"
          height="80"
          filterUnits="userSpaceOnUse"
        >
          <feOffset input="SourceAlpha" />
          <feGaussianBlur stdDeviation="3" result="blur" />
          <feFlood flood-color="#40cfe0" />
          <feComposite operator="in" in2="blur" />
          <feComposite in="SourceGraphic" />
        </filter>
      </defs>
      <g transform="matrix(1, 0, 0, 1, 0, 0)" filter="url(#turquoise)">
        <path
          d="M1039.512,700l-3.608,42,42-3.608"
          transform="translate(-1217.21 276.4) rotate(-45)"
          fill="none"
          stroke="#40e0d0"
          stroke-width="3"
          opacity="0.8"
        />
      </g>
    </svg>

    <div class="canvas-parent" id="parent">
      <canvas id="myCanvas"></canvas>
    </div>
  </section>
</template>



<script>

</script>


<style scoped lang="scss">
.canvas-parent {
  width: 100%;
  height: 100%;
}
</style>
