var hack_url = "http://codeforces.com/contest/*/challenge/*";
// 通知用户
function alertMessage(message) {
  console.log("start alert");
  let ele = `<li class="alert">${message}</li>`;
  document.getElementById("info").innerHTML += ele;
}

// 清除消息
function reset_message() {
  document.getElementById("info").innerHTML = "";
}

// 提交消息
function submit_data() {
  chrome.storage.sync.get(
    {
      defaultContent: ""
    },
    function(items) {
      chrome.tabs.query({ active: true, url: hack_url }, tab => {
        // 发送提交消息
        chrome.tabs.sendMessage(
          tab[0].id,
          {
            action: "submit",
            url: tab[0].url,
            id: tab[0].id // 发送消息
          },
          function(response) {
            // 通知用户
            alertMessage(response.state);
          }
        );
      });
    }
  );
}
document.addEventListener("DOMContentLoaded", function() {
  document
    .getElementById("submitButton")
    .addEventListener("click", submit_data);
  document
    .getElementById("resetButton")
    .addEventListener("click", reset_message);
});
