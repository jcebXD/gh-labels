// Copyright (c) 2014 The Chromium Authors. All rights reserved.
// Use of this source code is governed by a BSD-style license that can be
// found in the LICENSE file.

var get_current_tab = function(callback) {
  chrome.tabs.query({
    active: true,
    currentWindow: true
  }, function(tabs) {
    var tab = tabs[0];
    callback(tab);
  }); 
}

document.addEventListener('DOMContentLoaded', function(e) {
  get_current_tab(function(tab) {
    if (!/^(http:||https:)\/\/(www.)?github.com\/(.*)\/(.*)\/labels$/g.test(tab.url)) {
      document.getElementById('github-no-labels').setAttribute('style', '');
      document.getElementById('github-labels').setAttribute('style', 'display: none;');
    }
  });

  document.getElementById('export').addEventListener('click', function(e) {
    get_current_tab(function(tab) {
      chrome.tabs.executeScript(tab.id, {
        file: 'export.js'
      });
    });
  });

  document.getElementById('import').addEventListener('click', function(e) {
    get_current_tab(function(tab) {
      chrome.tabs.executeScript(tab.id, {
        file: 'import.js'
      });
    });
  });

  document.getElementById('clean').addEventListener('click', function(e) {
    get_current_tab(function(tab) {
      chrome.tabs.executeScript(tab.id, {
        file: 'clean.js'
      });
    });
  });

  chrome.runtime.onMessage.addListener(function (message) {
    if (message.type == 'export') {
      var file_content = 'data:text/plain;charset=utf-8,' + encodeURIComponent(JSON.stringify(message.content, null, 2));

      var element = document.createElement('a');
      element.setAttribute('href', file_content);
      element.setAttribute('download', 'gh-labels.json');

      element.style.display = 'none';
      document.body.appendChild(element);

      element.click();

      document.body.removeChild(element);

    }

    if (message.type == 'import') {
      console.log('Issues migrated');
    }
  });
});
