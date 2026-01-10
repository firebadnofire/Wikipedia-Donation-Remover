(function () {
  var removalSelectors = [
    "div#siteNotice",
    "div#centralNotice",
    "div#frb-inline",
    "div#frb-modal",
    "div#frb-panes",
    "div#fundraising-overlay",
    "div#fundraising-banner",
    "div.fundraising-banner",
    "div.cn-fundraising",
    "div[role='dialog'][aria-label*='donate']",
    "div[role='dialog'][aria-label*='Donate']",
    "li#pt-sitesupport-2",
    "a[href^='https://donate.wikimedia.org/']",
  ];

  function removeMatches(root) {
    removalSelectors.forEach(function (selector) {
      var matches = root.querySelectorAll(selector);
      matches.forEach(function (node) {
        node.remove();
      });
    });
  }

  function cleanupBannerArtifacts() {
    removeMatches(document);
  }

  cleanupBannerArtifacts();

  var observer = new MutationObserver(function (mutations) {
    mutations.forEach(function (mutation) {
      mutation.addedNodes.forEach(function (node) {
        if (node.nodeType !== Node.ELEMENT_NODE) {
          return;
        }
        removeMatches(node);
        if (removalSelectors.some(function (selector) {
          return node.matches && node.matches(selector);
        })) {
          node.remove();
        }
      });
    });
  });

  observer.observe(document.documentElement, {
    childList: true,
    subtree: true,
  });
})();
