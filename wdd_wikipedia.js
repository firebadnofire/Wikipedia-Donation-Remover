// Replace Wikipedia donation banners with a simple message
(function () {
  var bannerMessage = "Happy reading!";

  function applyBannerTheme(banner, isDarkMode) {
    var backgroundColor = isDarkMode ? "#202122" : "#f8f9fa";
    var textColor = isDarkMode ? "#f8f9fa" : "#202122";
    var borderColor = isDarkMode ? "#54595d" : "#a2a9b1";

    Object.assign(banner.style, {
      backgroundColor: backgroundColor,
      color: textColor,
      border: "1px solid " + borderColor,
    });
  }

  function buildBanner() {
    var banner = document.createElement("div");
    banner.id = "wdd-happy-reading";
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
    applyBannerTheme(banner, mediaQuery ? mediaQuery.matches : false);

    if (mediaQuery) {
      var onThemeChange = function (event) {
        applyBannerTheme(banner, event.matches);
      };
      if (mediaQuery.addEventListener) {
        mediaQuery.addEventListener("change", onThemeChange);
      } else if (mediaQuery.addListener) {
        mediaQuery.addListener(onThemeChange);
      }
    }

    return banner;
  }

  function replaceBanner(target) {
    var banner = buildBanner();
    target.innerHTML = "";
    target.appendChild(banner);
  }

  var siteNotice = document.querySelector("div#siteNotice");
  if (siteNotice) {
    replaceBanner(siteNotice);
    return;
  }

  var fallbackBanner = document.querySelector("div#frb-inline");
  if (fallbackBanner) {
    replaceBanner(fallbackBanner);
    return;
  }

  var content = document.querySelector("div#mw-content-text") || document.body;
  if (content) {
    var banner = buildBanner();
    content.insertBefore(banner, content.firstChild);
  }
})();
