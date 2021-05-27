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
let nethserver = window.nethserver;

export default {
  name: "App",
  data() {
    return {
      urlPrefix: "#/apps/ns8-app",
    };
  },
  created() {
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

    const queryParams = nethserver.getQueryParams();
    const requestedPage = queryParams.page || "home";

    if (requestedPage != "home") {
      console.log("replacing", this.$route.path, requestedPage); ////
      this.$router.replace(requestedPage);
    }
  },
  methods: {
    goToHomePage() {
      window.parent.history.replaceState(
        null,
        "",
        this.urlPrefix + "?page=home"
      );

      if (this.$route.name !== "Home") {
        this.$router.push("/");
      }
    },
    goToAboutPageWithToggleEnabled() {
      window.parent.history.replaceState(
        null,
        "",
        this.urlPrefix + "?page=about&testToggle=true"
      );

      if (this.$route.name !== "About") {
        this.$router.push("about");
      }
    },
    goToAboutPage() {
      window.parent.history.replaceState(
        null,
        "",
        this.urlPrefix + "?page=about"
      );

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
