console.log("Chrome Standing extension for (SCU) contestants");

function contains(selector, text) {
    var elements = document.querySelectorAll(selector);
    return Array.prototype.filter.call(elements, function(element){
        return RegExp(text).test(element.textContent);
    });
}

chrome.runtime.onMessage.addListener(
    function(message, sender, sendResponse) {
        let currTitle = "Summary - International Collegiate Programming Contest, Africa and Arab Collegiate Programming Championship Kickoff 2022 (Practice)"
        console.log('recived');
        if (message.currTab.title == currTitle && message.condition) {
            var all_tr = document.querySelectorAll('tr')
            for (let i = 4; i < all_tr.length; i++) {
                all_tr[i].style.display = 'none';
            }
            var x = contains('tr', message.txt);
            for (let i = 0; i < x.length; i++) {
                const para = document.createElement("td");
                const node = document.createTextNode(i + 1);
                para.appendChild(node);
                x[i].insertBefore(para, x[i].querySelector('td'))
                x[i].style.display = 'table-row';
            }
            const u_text = document.createElement('u');
            const node = document.createTextNode('#');
            u_text.appendChild(node);
            const stron = document.createElement('strong');
            stron.appendChild(u_text);
            const th_3 = document.createElement('th');
            th_3.appendChild(stron);
            all_tr[2].insertBefore(th_3, all_tr[2].querySelector('th'));
            console.log('filtered');
        }
        else {
            let all_tr = document.querySelectorAll('tr')
            for (let i = 0; i < all_tr.length; i++) {
                all_tr[i].style.display = 'table-row';
                if (all_tr[i].childElementCount > 9) {
                    all_tr[i].childNodes[1].remove();
                }
            }
            console.log('not filtered');
        }
    }
);

// window.onbeforeunload = function(){ return 'Reload?';}
