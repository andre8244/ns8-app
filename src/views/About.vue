<template>
  <div class="bx--grid bx--grid--full-width">
    <div class="bx--row">
      <div class="bx--col-lg-16">
        <h1 class="page-title">About NS8 Test App</h1>
      </div>
    </div>
    <div class="bx--row">
      <div class="bx--col-md-5">
        <cv-tile :light="true" class="content-tile">
          <h2>About content</h2>
          <p>Sample content</p>
          <cv-toggle value="toggleValue" v-model="q.testToggle"> </cv-toggle>
        </cv-tile>
      </div>
      <div class="bx--col-md-3">
        <cv-tile :light="true" class="content-tile">
          <h2>Side content</h2>
          <p>This is some tile content</p>
        </cv-tile>
      </div>
    </div>
  </div>
</template>

<script>
let nethserver = window.nethserver;

export default {
  name: "About",
  data() {
    return {
      q: {
        page: "about",
        testToggle: false,
      },
      currentUrl: "",
    };
  },
  beforeRouteEnter(to, from, next) {
    console.log("about beforeRouteEnter"); ////
    next((vm) => {
      nethserver.watchQueryData(vm);
      vm.urlCheckInterval = nethserver.initUrlBinding(vm, vm.q.page);
    });
  },
  beforeRouteLeave(to, from, next) {
    console.log(
      "about beforeRouteLeave, clear urlCheckInterval",
      this.urlCheckInterval
    ); ////
    clearInterval(this.urlCheckInterval);
    next();
  },
};
</script>
