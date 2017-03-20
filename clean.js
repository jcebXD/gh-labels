var remove_labels = function(list) {
  if (list.length > 0) {
    var item = list[0];
    list = list.slice(1);

    if (list.length >= 0) {
      setTimeout(function() {
        item.click();
        remove_labels(list);
      }, 500);
    }
  }
}

// Show delete form
var labels = Array.prototype.slice.call(document.querySelectorAll(".labels-list-actions .js-details-target"));
remove_labels(labels);

// Confirm delete
document.querySelectorAll('.btn-danger').forEach(function(button) {
  button.click();
});

chrome.runtime.sendMessage({
  type: 'clean',
  content: "Ready"
});
