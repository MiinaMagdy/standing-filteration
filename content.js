console.log("Chrome Standing extension for (SCU) contestants");

chrome.storage.sync.get(["txt", "box"], function (result) {
  if (result.box) {
    filter({ condition: result.box, txt: result.txt }, null, null);
  }
});

function contains(selector, text) {
  var elements = document.querySelectorAll(selector);
  return Array.prototype.filter.call(elements, function (element) {
    return RegExp(text.toLowerCase()).test(element.textContent.toLowerCase());
  });
}

chrome.runtime.onMessage.addListener(filter);
let noProblems = 0;

function filter(message, sender, sendResponse) {
  console.log("recived", { message }, { sender }, { sendResponse });
  if (message.condition) {
    var all_tr = document.querySelectorAll("tr");
    noProblems = all_tr[2].cells.length;
    for (let i = 4; i < all_tr.length; i++) {
      all_tr[i].style.display = "none";
    }
    var x = contains("tr", message.txt);
    for (let i = 0; i < x.length; i++) {
      const para = document.createElement("td");
      const node = document.createTextNode(i + 1);
      para.appendChild(node);
      x[i].insertBefore(para, x[i].querySelector("td"));
      x[i].style.display = "table-row";
    }
    const u_text = document.createElement("u");
    const node = document.createTextNode("#");
    u_text.appendChild(node);
    const stron = document.createElement("strong");
    stron.appendChild(u_text);
    const th_3 = document.createElement("th");
    th_3.appendChild(stron);
    all_tr[2].insertBefore(th_3, all_tr[2].querySelector("th"));
    console.log("filtered");
  } else {
    let all_tr = document.querySelectorAll("tr");
    for (let i = 0; i < all_tr.length; i++) {
      all_tr[i].style.display = "table-row";
      if (all_tr[i].cells.length > noProblems) {
        console.log("to remove", all_tr[i]);
        console.log("cell", all_tr[i].cells[0]);
        all_tr[i].cells[0].remove();
      }
    }
    console.log("not filtered");
  }
}

// window.onbeforeunload = function(){ return 'Reload?';}
