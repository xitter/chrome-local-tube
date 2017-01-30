function getCurrentTabUrl() {
    // Query filter to be passed to chrome.tabs.query - see
    // https://developer.chrome.com/extensions/tabs#method-query
    var queryInfo = {
        active: true,
        currentWindow: true
    };

    chrome.tabs.query(queryInfo, function (tabs) {
        var tab = tabs[0];
        var url = tab.url;
        document.getElementById('tab-url').value = url;
        console.assert(typeof url == 'string', 'tab.url should be a string');
    });

}

function renderStatus(statusText) {
    document.getElementById('status').textContent = statusText;
}

function saveVideo() {
    var url = document.getElementById('tab-url').value;
    var searchUrl = 'http://localhost:5000/video?url=' + url;
    var x = new XMLHttpRequest();
    x.open('GET', searchUrl);
    x.responseType = 'json';
    x.onload = function () {
        if (x.response.url) {
            var video = document.getElementById('video');
            var source = document.createElement('source');
            source.setAttribute('src', x.response.url);
            video.appendChild(source);
            video.className = "show";
            video.load();
            video.play();
        }
    };
    x.onerror = function () {
        console.log('Network error.');
    };
    x.send();
    console.log("saving");
}

document.addEventListener('DOMContentLoaded', function () {
    getCurrentTabUrl();
    document.getElementById("save").addEventListener("click", saveVideo);
});
