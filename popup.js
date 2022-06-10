window.onload=function(){
    let box = document.querySelector('#box');

    box.addEventListener('change', function(e) {
        console.log('checkbox changed');
        chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
            chrome.tabs.sendMessage(tabs[0].id, {currTab: tabs[0], condition: e.target.checked, txt: document.querySelector('#txt').value});
        });
    });
}