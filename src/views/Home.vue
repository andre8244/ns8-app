<template>
  <div class="home">
    <img alt="Vue logo" src="../assets/logo.png" />
    <HelloWorld msg="Welcome to Your Vue.js App" />
    <div>App input</div>
    <div><input v-model="appInput" /></div>
  </div>
</template>

<script>
// @ is an alias to /src
import HelloWorld from "@/components/HelloWorld.vue";

export default {
  name: "Home",
  components: {
    HelloWorld,
  },
  data() {
    return {
      appInput: "",
    };
  },
  created() {
    console.log("NS8-APP created"); ////
  },
  mounted() {
    console.log("NS8-APP mounted"); ////

    console.log("history", history); ////
    console.log("PARENT history", window.parent.history); ////
  },
  beforeRouteEnter(to, from, next) {
    next((vm) => {
      console.log("NS8-APP beforeRouteEnter", to, from); ////
      vm.queryParamsToData(vm);
    });
  },
  beforeRouteUpdate(to, from, next) {
    console.log("NS8-APP beforeRouteUpdate", to, from); ////
    this.queryParamsToData(this);
    next();
  },
  watch: {
    appInput: function() { //// parametrizzare
      let queryParams = this.getQueryParams();
      console.log("NS8-APP watch appInput, query params", queryParams); ////

      if (this.appInput !== queryParams.appInput) {
        queryParams.appInput = this.appInput;
        this.dataToQueryParams(queryParams);
      }
    },
  },
  methods: {
    queryParamsToData(context) {
      let queryParams = this.getQueryParams();
      console.log("NS8-APP queryParamsToData", queryParams); ////

      if (queryParams.appInput) { //// parametrizzare
        context.appInput = queryParams.appInput;
      } else {
        context.appInput = "";
      }
    },
    dataToQueryParams(params) {
      let queryParams = [];

      for (const [key, value] of Object.entries(params)) {
        queryParams.push(key + "=" + value);
      }
      const baseUrl = window.parent.location.hash.split("?").shift();
      const urlWithParams = baseUrl + "?" + queryParams.join("&");
      window.parent.history.replaceState(null, "", urlWithParams); ////
    },
    getQueryParams() {
      console.log("getQueryParams, location PARENT", window.parent.location); ////

      console.log("getQueryParams, hash", window.parent.location.hash); ////
      if (
        !window.parent.location.hash.includes("?") ||
        window.parent.location.hash.split("?").length < 2
      ) {
        console.log("getQueryParams, return empty params"); ////
        return {};
      }

      const params = new URLSearchParams(
        window.parent.location.hash.split("?").pop()
      );
      let queryParams = {};

      params.forEach((value, key) => {
        console.log("key,value", key, value); ////
        if (key) {
          console.log("key, value", key, value); ////
          queryParams[key] = value;
        }
      });
      console.log("getQueryParams, return", queryParams); ////
      return queryParams;
    },
  },
};
</script>
