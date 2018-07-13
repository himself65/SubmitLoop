// 提交代码 -- function
function submit_data(data) {
  $("textarea")[1].value = data;
  // 提交数据
  $(".submit").click();
}

var current_url = "";
var current_id = -1;
// 提交代码 + 读取设置
function submit() {
  chrome.storage.sync.get(
    {
      defaultContent: ""
    },
    items => {
      console.log(items.defaultContent);
      console.log(current_url);
      console.log(current_id);
      // 提交数据
      const now_url = current_url;
      console.log(now_url);
      submit_data(items.defaultContent);
      // 切换回网站
      setTimeout(() => {
        tab.url = now_url;
      }, 10000);  // 等待十秒
    }
  );
}

// 监听Chrome消息
chrome.runtime.onMessage.addListener(function (request, sender, sendResponse) {
  if (request.action == "submit") {
    current_id = request.id;
    current_url = request.url;
    submit();
    sendResponse({
      state: "提交成功！"
    });
  }
});
