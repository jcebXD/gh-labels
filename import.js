var create_labels = function(labels) {
  labels.forEach(function(label) {
    document.querySelectorAll(".issues-listing .btn-primary")[0].click();
    document.querySelectorAll("#label-")[0].value = label.name;
    document.querySelectorAll('#edit-label-color-new')[0].value = '#' + label.color;
    document.querySelectorAll('.new-label-actions .btn-primary')[0].click();
  });
}

var handle_file = function() {
  var element = document.createElement('input');
  element.setAttribute('id', '');
  element.setAttribute('type', 'file');


  element.style.display = 'none';
  document.body.appendChild(element);
  element.click();

  element.addEventListener('change', function(e) {
    var file = e.target.files[0];

    var reader = new FileReader();
    reader.onload = function(e) { 
      var labels = JSON.parse(e.target.result);

      document.body.removeChild(element);

      create_labels(labels);

      chrome.runtime.sendMessage({
        type: 'import',
        content: "Ready"
      });
    }

    reader.readAsText(file);
  });
}

handle_file();
