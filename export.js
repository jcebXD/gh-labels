var labels = [];

document.querySelectorAll(".label-link")
  .forEach(function(element) {
    labels.push({
      name: element.textContent.trim(),
      color: element.getAttribute("style")
        .replace("background-color:", "")
        .replace(/color:.*/,"")
        .trim()
        .replace(/^#/, "")
        .replace(/;$/, "")
        .trim()
    })
  });

chrome.runtime.sendMessage({
  type: 'export',
  content: labels
});
