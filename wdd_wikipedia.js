// Replace Wikipedia donation banners with a simple message
(function () {
  var bannerMessage = "Happy reading!";

  function buildBanner() {
    var banner = document.createElement("div");
    banner.id = "wdd-happy-reading";
    banner.textContent = bannerMessage;
    Object.assign(banner.style, {
      backgroundColor: "#f8f9fa",
      color: "#202122",
      border: "1px solid #a2a9b1",
      borderRadius: "2px",
      padding: "10px 12px",
      margin: "8px 0",
      fontFamily: "inherit",
      fontSize: "14px",
      textAlign: "center",
    });
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
