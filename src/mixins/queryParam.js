export default {
  name: "QueryParamService",
  methods: {
    initUrlBinding(page) {
      console.log("initUrlBinding, page", page); ////

      this.watchData();
      this.syncQueryParamsAndData(page);
      // this.checkUrlChange(window.parent.location.href); ////
      return setInterval(this.checkUrlChange, 1000);
    },
    syncQueryParamsAndData(page) {
      //// remove page parameter?
      // let queryParams = this.getQueryParams(); ////

      // check if route has changed
      // if (page === queryParams.page || typeof queryParams.page == "undefined") { ////
      //// is this if needed?
      this.queryParamsToData();
      // }
      this.dataToQueryParams();
    },
    watchData() {
      Object.keys(this._data.q).forEach((dataItem) => {
        this.$watch("q." + dataItem, function() {
          console.log("watch", dataItem); ////
          this.dataToQueryParams();
        });
      });
    },
    checkUrlChange() {
      const newUrl = window.parent.location.href;

      if (newUrl != this.currentUrl) {
        console.log("url changed"); ////
        this.currentUrl = newUrl;
        let queryParams = this.getQueryParams();
        this.syncQueryParamsAndData(queryParams.page);
      }

      this.currentUrl = window.parent.location.href;

      // setTimeout(() => { ////
      //   this.checkUrlChange(window.parent.location.href);
      // }, 1000);
    },
    queryParamsToData() {
      let queryParams = this.getQueryParams();

      console.log("queryParamsToData, queryParams", queryParams); ////

      Object.keys(this._data.q).forEach((dataItem) => {
        if (typeof queryParams[dataItem] !== "undefined") {
          this.q[dataItem] = this.getTypedValue(queryParams[dataItem]);
        }
      });
    },
    getTypedValue(value) {
      if (value === "true") {
        return true;
      }

      if (value === "false") {
        return false;
      }

      return value;
    },
    dataToQueryParams() {
      console.log("dataToQueryParams, q", this._data.q); ////

      let queryParams = [];

      for (const [key, value] of Object.entries(this._data.q)) {
        queryParams.push(key + "=" + value);
      }

      const baseUrl = window.parent.location.hash.split("?").shift();
      const urlWithParams = baseUrl + "?" + queryParams.join("&");
      window.parent.history.replaceState(null, "", urlWithParams); //// use pushState if route has changed
    },
    getQueryParams() {
      if (
        !window.parent.location.hash.includes("?") ||
        window.parent.location.hash.split("?").length < 2
      ) {
        return {};
      }

      const params = new URLSearchParams(
        window.parent.location.hash.split("?").pop()
      );
      let queryParams = {};

      params.forEach((value, key) => {
        if (key) {
          queryParams[key] = value;
        }
      });
      return queryParams;
    },
  },
};
