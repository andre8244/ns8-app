export default {
  name: "QueryParamService",
  methods: {
    initUrlBinding(page) {
      console.log("initUrlBinding, page", page); ////

      let queryParams = this.getQueryParams();
      const requestedPage = queryParams.page || "home";

      if (requestedPage != page) {
        console.log("page mismatch, return", requestedPage, page); ////
        return;
      }

      this.watchData();
      this.syncQueryParamsAndData();
      return setInterval(() => this.checkUrlChange(page), 1000); //// use 500?
    },
    syncQueryParamsAndData() {
      this.queryParamsToData();
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
    checkUrlChange(page) {
      console.log("checkUrlChange, page", page); ////
      const newUrl = window.parent.location.href;

      if (newUrl != this.currentUrl) {
        console.log("url changed"); ////
        this.currentUrl = newUrl;
        const queryParams = this.getQueryParams();
        const requestedPage = queryParams.page || "home";

        if (requestedPage !== page) {
          // page has changed, need to change route
          console.log("detected page change, dispatch event", requestedPage); ////

          // trigger a custom event to change app route
          window.dispatchEvent(
            new CustomEvent("changeRoute", { detail: requestedPage })
          );
        } else {
          this.syncQueryParamsAndData();
        }
      }
      this.currentUrl = window.parent.location.href;
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
      window.parent.history.replaceState(null, "", urlWithParams);
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
