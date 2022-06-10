window.onload=function(){ 
    chrome.storage.sync.get(['txt', 'box'], function(result) {
        if (result.txt != undefined) {
            document.querySelector('#txt').value = result.txt;
        }
        if (result.box != undefined) {
            document.querySelector('#box').checked = result.box;
        }

        if (result.box) {
            // make #txt is readonly
            document.querySelector('#txt').setAttribute('readonly', 'readonly');
        }
        else {
            // make #txt is not readonly
            document.querySelector('#txt').removeAttribute('readonly');
        }
    });
    
    let box = document.querySelector('#box');
    
    let entireBody = document.querySelector('body');

    entireBody.addEventListener('change', function() {
        let value1 = document.querySelector('#txt').value;
        let value2 = document.querySelector('#box').checked;
        chrome.storage.sync.set({txt: value1, box: value2}, function() {
            console.log(value1);
            console.log(value2);
        });
    });

    box.addEventListener('change', function(e) {
        console.log('checkbox changed');
        if (e.target.checked) {
            // make #txt is readonly
            document.querySelector('#txt').setAttribute('readonly', 'readonly');
        }
        else {
            // make #txt is not readonly
            document.querySelector('#txt').removeAttribute('readonly');
        }
        chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
            chrome.tabs.sendMessage(tabs[0].id, {currTab: tabs[0], condition: e.target.checked, txt: document.querySelector('#txt').value});
        });
    });

}
