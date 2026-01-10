// Remove Wikimedia donation banners (everywhere on Wikipedia)
var banner1 = document.querySelector('div#siteNotice');
if (banner1) banner1.remove();

var banner2 = document.querySelector('div#frb-inline');
if (banner2) banner2.remove();

// Create a simple, site-blended banner on ALL Wikipedia pages
var wdd_div = document.createElement("div");
Object.assign(wdd_div.style, {
  maxWidth:        "900px",
  margin:          "12px auto",
  padding:         "6px 12px",
  textAlign:       "center",
  fontFamily:      "inherit",
  fontSize:        "14px",
  color:           "#202122",
  backgroundColor: "transparent",
  borderRadius:    "2px",
  boxSizing:       "border-box",
});
wdd_div.textContent = "Happy reading!";

var contentArea = document.querySelector('#content');
if (contentArea && contentArea.parentNode) {
  contentArea.parentNode.insertBefore(wdd_div, contentArea);
} else {
  document.body.insertBefore(wdd_div, document.body.firstChild);
}
