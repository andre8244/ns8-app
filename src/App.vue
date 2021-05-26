<template>
  <div id="app">
    <cv-content id="main-content">
      <div id="nav">
        <cv-link @click="goToHomePage">Home</cv-link> |
        <cv-link @click="goToAboutPage">About</cv-link> |
        <cv-link @click="goToAboutPageWithToggleEnabled"
          >About with toggle enabled</cv-link
        >
      </div>
      <router-view />
    </cv-content>
  </div>
</template>

<script>
import QueryParamService from "@/mixins/queryParam";

export default {
  name: "App",
  mixins: [QueryParamService],
  data() {
    return {
      urlPrefix: "#/apps/ns8-app",
    };
  },
  mounted() {
    console.log("ns8 app mounted"); ////

    // listen to change route events
    const context = this;
    window.addEventListener(
      "changeRoute",
      function(e) {
        const requestedPage = e.detail;
        context.$router.push(requestedPage);
      },
      false
    );

    const queryParams = this.getQueryParams();
    const requestedPage = queryParams.page;

    if (requestedPage != "home") {
      console.log("replacing", this.$route.path, requestedPage); ////
      this.$router.replace(requestedPage);
    }
  },
  methods: {
    goToHomePage() {
      window.parent.location.hash = this.urlPrefix + "?page=home";

      if (this.$route.name !== "Home") {
        this.$router.push("/");
      }
    },
    goToAboutPageWithToggleEnabled() {
      window.parent.location.hash =
        this.urlPrefix + "?page=about&testToggle=true";

      if (this.$route.name !== "About") {
        this.$router.push("about");
      }
    },
    goToAboutPage() {
      window.parent.location.hash = this.urlPrefix + "?page=about";

      if (this.$route.name !== "About") {
        this.$router.push("about");
      }
    },
  },
};
</script>

<style lang="scss">
//// DO NOT IMPORT CARBON STYLES, THEY OVERRIDE NS8 CORE THEME
// @import "./styles/carbon";
</style>
