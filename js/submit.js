// 提交代码 -- function
function submit_data(data) {
  $("textarea")[1].value = data;
  // 提交数据
  $(".submit").click();
}

// 提交代码 + 读取设置
function submit() {
  // 获取设置的url和地址
  let data = "";
  chrome.storage.get(
    {
      defaultContent: ""
    },
    function(items) {
      data = items.defaultContent;
    }
  );
  console.log(data);
  chrome.tabs.query(
    { url: "http://codeforces.com/contest/*/challenge/*" },
    tabs => {
      // 提交数据
      const now_url = tabs[0].url;
      console.log(now_url);
      submit_data(data);
      // 切换回网站
      setTimeout(() => {
        tab.url = now_url;
      }, 500);
    }
  );
}

// 监听Chrome消息
chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
  if (request.action == "submit") {
    console.log("get message");
    submit();
    sendResponse({ state: "提交成功！" });
  }
});
