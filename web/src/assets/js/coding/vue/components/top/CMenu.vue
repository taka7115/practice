<template>
  <section>
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 40 27" class="menuBtn">
      <g transform="translate(-1827 -60.5)">
        <line x1="40" transform="translate(1827 74)" fill="none" stroke="#fff" stroke-width="3" />
        <path
          d="M40,0H0"
          transform="translate(1827 86)"
          fill="none"
          stroke="#fff"
          stroke-width="3"
        />
        <line x1="40" transform="translate(1827 62)" fill="none" stroke="#fff" stroke-width="3" />
      </g>
    </svg>
  </section>
</template>



<script>
export default {
  // data() {}
};
</script>


<style scoped lang="scss">
$distance: 2.6vw;

.menuBtn {
  width: 2vw;
  position: fixed;
  top: $distance;
  right: $distance;
  z-index: 100;
  cursor: pointer;
}
</style>







