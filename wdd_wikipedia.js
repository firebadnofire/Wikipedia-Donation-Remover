(function () {
  var bannerMessage = "Happy reading!";
  var bannerId = "wdd-happy-reading";
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

  function getRelativeLuminance(red, green, blue) {
    var transform = function (value) {
      var channel = value / 255;
      return channel <= 0.03928
        ? channel / 12.92
        : Math.pow((channel + 0.055) / 1.055, 2.4);
    };

    return (
      0.2126 * transform(red) +
      0.7152 * transform(green) +
      0.0722 * transform(blue)
    );
  }

  function parseRgbChannels(color) {
    if (!color || color === "transparent") {
      return null;
    }

    var match = color.match(/rgba?\(([^)]+)\)/);
    if (!match) {
      return null;
    }

    var parts = match[1].split(",").map(function (value) {
      return parseFloat(value.trim());
    });

    if (
      parts.length < 3 ||
      parts.some(function (value) {
        return Number.isNaN(value);
      })
    ) {
      return null;
    }

    return parts.slice(0, 3);
  }

  function isPageDarkMode() {
    var htmlStyle = window.getComputedStyle(document.documentElement);
    var bodyStyle = document.body ? window.getComputedStyle(document.body) : null;
    var color = htmlStyle.backgroundColor;

    if (
      bodyStyle &&
      (color === "transparent" || color === "rgba(0, 0, 0, 0)")
    ) {
      color = bodyStyle.backgroundColor;
    }

    var channels = parseRgbChannels(color);
    if (!channels) {
      return false;
    }

    return getRelativeLuminance(channels[0], channels[1], channels[2]) < 0.4;
  }

  function applyBannerTheme(banner) {
    var useDarkMode = isPageDarkMode();
    var backgroundColor = useDarkMode ? "#202122" : "#f8f9fa";
    var textColor = useDarkMode ? "#f8f9fa" : "#202122";
    var borderColor = useDarkMode ? "#54595d" : "#a2a9b1";

    Object.assign(banner.style, {
      backgroundColor: backgroundColor,
      color: textColor,
      border: "1px solid " + borderColor,
    });
  }

  function buildBanner() {
    var banner = document.createElement("div");
    banner.id = bannerId;
    banner.textContent = bannerMessage;
    Object.assign(banner.style, {
      borderRadius: "2px",
      padding: "10px 12px",
      margin: "8px 0",
      fontFamily: "inherit",
      fontSize: "14px",
      textAlign: "center",
    });

    var mediaQuery = window.matchMedia
      ? window.matchMedia("(prefers-color-scheme: dark)")
      : null;
    applyBannerTheme(banner);

    if (mediaQuery) {
      var onThemeChange = function (event) {
        applyBannerTheme(banner);
      };
      if (mediaQuery.addEventListener) {
        mediaQuery.addEventListener("change", onThemeChange);
      } else if (mediaQuery.addListener) {
        mediaQuery.addListener(onThemeChange);
      }
    }

    var themeObserver = new MutationObserver(function () {
      applyBannerTheme(banner);
    });

    themeObserver.observe(document.documentElement, {
      attributes: true,
      attributeFilter: [
        "class",
        "style",
        "data-mw-page-theme",
        "data-theme",
        "data-color",
      ],
    });

    if (document.body) {
      themeObserver.observe(document.body, {
        attributes: true,
        attributeFilter: ["class", "style", "data-mw-page-theme"],
      });
    }

    return banner;
  }

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

  function insertHappyReadingBanner() {
    if (document.getElementById(bannerId)) {
      return;
    }

    var content =
      document.querySelector("div#mw-content-text") || document.body;
    if (!content) {
      return;
    }

    var banner = buildBanner();
    content.insertBefore(banner, content.firstChild);
  }

  cleanupBannerArtifacts();
  insertHappyReadingBanner();

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
