<template>
  <div v-show="isRedirectChecked" class="bx--grid bx--grid--full-width">
    <div class="bx--row">
      <div class="bx--col-lg-16">
        <h1 class="page-title">NS8 Test App</h1>
      </div>
    </div>
    <div class="bx--row">
      <div class="bx--col-md-5">
        <cv-tile :light="true" class="content-tile">
          <h2>Main app content</h2>
          <div><cv-text-input label="App input" v-model="q.appInput" /></div>
          <cv-number-input label="Test number" step="1" v-model="q.testNumber">
          </cv-number-input>
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
  name: "Home",
  data() {
    return {
      q: {
        page: "home",
        appInput: "",
        testNumber: 99,
      },
      currentUrl: "",
      urlCheckInterval: null,
      isRedirectChecked: false,
      redirectTimeout: 0,
    };
  },
  beforeRouteEnter(to, from, next) {
    console.log(
      "home beforeRouteEnter, parent url",
      window.parent.location.href
    ); ////
    next((vm) => {
      nethserver.watchQueryData(vm);
      vm.urlCheckInterval = nethserver.initUrlBinding(vm, vm.q.page); ////
    });
  },
  beforeRouteLeave(to, from, next) {
    console.log(
      "home beforeRouteLeave, clear urlCheckInterval",
      this.urlCheckInterval
    ); ////
    clearInterval(this.urlCheckInterval);
    next();
  },
  mounted() {
    // show home page after a little delay to avoid page flickering when user directly access a page different from home
    this.redirectTimeout = setTimeout(
      () => (this.isRedirectChecked = true),
      200
    );
  },
  beforeUnmount() {
    clearTimeout(this.redirectTimeout);
    console.log("timeout cleared"); ////
  },
};
</script>
