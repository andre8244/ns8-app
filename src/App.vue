<template>
  <div id="app">
    <cv-content id="main-content">
      <div id="nav">
        <cv-link @click="goToHomePage">Home</cv-link> |
        <cv-link @click="goToAboutPage">About</cv-link> |
        <cv-link @click="goToAboutPageWithToggleEnabled"
          >About with toggle enabled</cv-link
        >
        | <cv-link @click="goToCoreDashboard">Core dashboard</cv-link> |
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
        // context.$router.push(requestedPage); ////
        context.$router.replace(requestedPage);
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
      // window.parent.history.replaceState(
      //   null,
      //   "",
      //   this.urlPrefix + "?page=home"
      // );

      const path = "/apps/ns8-app?page=home";

      if (window.parent.ns8.$route.fullPath != path) {
        window.parent.ns8.$router.push(path);
      }

      // if (this.$route.name !== "Home") { ////
      //   this.$router.push("/");
      // }
    },
    goToAboutPageWithToggleEnabled() {
      // window.parent.history.replaceState( ////
      //   null,
      //   "",
      //   this.urlPrefix + "?page=about&testToggle=true"
      // );

      // if (this.$route.name !== "About") {
      //   this.$router.push("about");
      // }

      const path = "/apps/ns8-app?page=about&testToggle=true";

      if (window.parent.ns8.$route.fullPath != path) {
        window.parent.ns8.$router.push(path);
      }
    },
    goToAboutPage() {
      // window.parent.history.replaceState( ////
      //   null,
      //   "",
      //   this.urlPrefix + "?page=about"
      // );

      const path = "/apps/ns8-app?page=about";

      if (window.parent.ns8.$route.fullPath != path) {
        window.parent.ns8.$router.push(path);
      }

      // if (this.$route.name !== "About") { ////
      //   this.$router.push("about");
      // }
    },
    goToCoreDashboard() {
      // link to NS8 core

      // window.parent.history.pushState(
      //   null,
      //   "",
      //   "#/dashboard?testInput=abczzz&testToggle=true"
      // );

      // window.parent.location.reload();

      window.parent.ns8.$router.push(
        "/dashboard?testInput=abczzz&testToggle=true"
      );
    },
  },
};
</script>

<style lang="scss">
//// DO NOT IMPORT CARBON STYLES, THEY OVERRIDE NS8 CORE THEME
// @import "./styles/carbon";
</style>
