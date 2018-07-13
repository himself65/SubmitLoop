// 将选项保存在 chrome.storage 中
function save_options() {
  const content = document.getElementById("dataInput").value;
  const url = document.getElementById("urlInput").value;
  chrome.storage.sync.set(
    {
      defaultContent: content
    },
    function () {
      // 告诉用户选项已保存。
      let status = document.getElementById("status");
      status.className = "success";
      status.textContent = "您的配置已经保存";
      setTimeout(function () {
        status.className = "";
        status.textContent = "";
      }, 10000);
    }
  );
}

function init_settings() {
  chrome.storage.sync.get(
    {
      defaultContent: ""
    },
    function (items) {
      document.getElementById("dataInput").value = items.defaultContent;
    }
  );
}
document.addEventListener("DOMContentLoaded", function () {
  init_settings();
  document.getElementById("saveButton").addEventListener("click", save_options);
});
