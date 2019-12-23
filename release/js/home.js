!function(){"use strict";function a(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}function i(e,t){for(var n=0;n<t.length;n++){var a=t[n];a.enumerable=a.enumerable||!1,a.configurable=!0,"value"in a&&(a.writable=!0),Object.defineProperty(e,a.key,a)}}function o(e,t,n){return t&&i(e.prototype,t),n&&i(e,n),e}function s(e,t,n){return t in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}function e(e,t){if("function"!=typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function");e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,writable:!0,configurable:!0}}),t&&n(e,t)}function r(e){return(r=Object.setPrototypeOf?Object.getPrototypeOf:function(e){return e.__proto__||Object.getPrototypeOf(e)})(e)}function n(e,t){return(n=Object.setPrototypeOf||function(e,t){return e.__proto__=t,e})(e,t)}function c(e){if(void 0===e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return e}function l(e,t){return!t||"object"!=typeof t&&"function"!=typeof t?c(e):t}var u=function(){function e(){a(this,e),this._listeners={}}return o(e,[{key:"on",value:function(e,t){(this._listeners[e]=this._listeners[e]||[]).push(t)}},{key:"trigger",value:function(e,t){(this._listeners[e]||[]).forEach(function(e){return e(t)})}},{key:"off",value:function(e){delete this._listeners[e]}}]),e}(),d=new(function(){function t(){var e;return a(this,t),(e=l(this,r(t).call(this))).defaultRPC=[{name:"ARIA2 RPC",url:"http://localhost:6800/jsonrpc"}],e.defaultUserAgent="Mozilla/5.0 (Windows NT 5.1) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/31.0.1650.63 Safari/537.36 115Browser/5.1.3",e.defaultReferer="https://115.com/",e.defaultConfigData={rpcList:e.defaultRPC,configSync:!1,sha1Check:!1,ssl:!1,interval:300,downloadPath:"",userAgent:e.defaultUserAgent,browserUserAgent:!0,referer:e.defaultReferer,headers:""},e.configData={},e.on("initConfigData",e.init.bind(c(e))),e.on("setConfigData",e.set.bind(c(e))),e.on("clearConfigData",e.clear.bind(c(e))),e}return e(t,u),o(t,[{key:"init",value:function(){var t=this;chrome.storage.sync.get(null,function(t){function e(e){chrome.storage.local.set({key:t[e]},function(){console.log("chrome first local set: %s, %s",e,t[e])})}for(var n in t)e(n)}),chrome.storage.local.get(null,function(e){t.configData=Object.assign({},t.defaultConfigData,e),t.trigger("updateView",t.configData)})}},{key:"getConfigData",value:function(e){var t=0<arguments.length&&void 0!==e?e:null;return t?this.configData[t]:this.configData}},{key:"set",value:function(e){this.configData=e,this.save(e),this.trigger("updateView",e)}},{key:"save",value:function(t){function e(e){chrome.storage.local.set(s({},e,t[e]),function(){console.log("chrome local set: %s, %s",e,t[e])}),!0===t.configSync&&chrome.storage.sync.set(s({},e,t[e]),function(){console.log("chrome sync set: %s, %s",e,t[e])})}for(var n in t)e(n)}},{key:"clear",value:function(){chrome.storage.sync.clear(),chrome.storage.local.clear(),this.configData=this.defaultConfigData,this.trigger("updateView",this.configData)}}]),t}()),h=new(function(){function e(){a(this,e),this.cookies={}}return o(e,[{key:"httpSend",value:function(e,t,n){var a=e.url,i=e.options;fetch(a,i).then(function(e){e.ok?e.json().then(function(e){t(e)}):n(e)}).catch(function(e){n(e)})}},{key:"getConfigData",value:function(e){var t=0<arguments.length&&void 0!==e?e:null;return d.getConfigData(t)}},{key:"objectToQueryString",value:function(t){return Object.keys(t).map(function(e){return"".concat(encodeURIComponent(e),"=").concat(encodeURIComponent(t[e]))}).join("&")}},{key:"sendToBackground",value:function(e,t,n){chrome.runtime.sendMessage({method:e,data:t},n)}},{key:"showToast",value:function(e,t){window.postMessage({type:"showToast",data:{message:e,type:t}},location.origin)}},{key:"getHashParameter",value:function(e){var t=window.location.hash.substr(1);return new URLSearchParams(t).get(e)}},{key:"formatCookies",value:function(){var e=[];for(var t in this.cookies)e.push("".concat(t,"=").concat(this.cookies[t]));return e.join("; ")}},{key:"getHeader",value:function(e){var t=0<arguments.length&&void 0!==e?e:"RPC",n=[],a=this.getConfigData("browserUserAgent"),i=this.getConfigData("userAgent");if(a){var o=navigator.userAgent;o&&o.length&&(i=o)}n.push("User-Agent: ".concat(i)),n.push("Referer: ".concat(this.getConfigData("referer"))),n.push("Cookie: ".concat(this.formatCookies()));var s=this.getConfigData("headers");return s&&s.split("\n").forEach(function(e){n.push(e)}),"RPC"===t?n:"aria2Cmd"===t?n.map(function(e){return"--header ".concat(JSON.stringify(e))}).join(" "):"aria2c"===t?n.map(function(e){return" header=".concat(e)}).join("\n"):"idm"===t?n.map(function(e){var t=e.split(": ");return"".concat(t[0].toLowerCase(),": ").concat(t[1])}).join("\r\n"):void 0}},{key:"parseURL",value:function(e){var t=new URL(e),n=t.username?"".concat(t.username,":").concat(decodeURI(t.password)):null;n&&(n.includes("token:")||(n="Basic ".concat(btoa(n))));var a=t.hash.substr(1),i={},o=new URLSearchParams(a),s=!0,r=!1,c=void 0;try{for(var l,u=o[Symbol.iterator]();!(s=(l=u.next()).done);s=!0){var d=l.value;i[d[0]]=2===d.length?d[1]:"enabled"}}catch(e){r=!0,c=e}finally{try{s||null==u.return||u.return()}finally{if(r)throw c}}return{authStr:n,path:t.origin+t.pathname,options:i}}},{key:"generateParameter",value:function(e,t,n){e&&e.startsWith("token")&&n.params.unshift(e);var a={url:t,options:{method:"POST",headers:{},body:JSON.stringify(n)}};return e&&e.startsWith("Basic")&&(a.options.headers.Authorization=e),a}},{key:"getVersion",value:function(e,t){var n=this.parseURL(e),a=n.authStr,i=n.path;this.sendToBackground("rpcVersion",this.generateParameter(a,i,{jsonrpc:"2.0",method:"aria2.getVersion",id:1,params:[]}),function(e){t.innerText=e?"Aria2版本为: ".concat(e):"错误,请查看是否开启Aria2"})}},{key:"copyText",value:function(e){var t=document.createElement("textarea");document.body.appendChild(t),t.value=e,t.focus(),t.select();var n=document.execCommand("copy");t.remove(),n?this.showToast("拷贝成功~","inf"):this.showToast("拷贝失败 QAQ","err")}},{key:"requestCookies",value:function(e){var n=this;return new Promise(function(t){n.sendToBackground("getCookies",e,function(e){t(e)})})}},{key:"aria2RPCMode",value:function(e,t){var s=this,n=this.parseURL(e),r=n.authStr,c=n.path,l=n.options,u=this.getConfigData("ssl");t.forEach(function(e){s.cookies=e.cookies,u&&(e.link=e.link.replace(/^(http:\/\/)/,"https://"));var t={jsonrpc:"2.0",method:"aria2.addUri",id:(new Date).getTime(),params:[[e.link],{out:e.name,header:s.getHeader()}]},n=s.getConfigData("sha1Check"),a=t.params[1],i=s.getConfigData("downloadPath");if(i&&(a.dir=i),n&&(a.checksum="sha-1=".concat(e.sha1)),l)for(var o in l)a[o]=l[o];s.sendToBackground("rpcData",s.generateParameter(r,c,t),function(e){e?s.showToast("下载成功!赶紧去看看吧~","inf"):s.showToast("下载失败!是不是没有开启Aria2?","err")})})}},{key:"aria2TXTMode",value:function(e){var i=this,o=[],s=[],r=[],c=[],t="data:text/plain;charset=utf-8,",l=this.getConfigData("ssl");e.forEach(function(e){i.cookies=e.cookies,l&&(e.link=e.link.replace(/^(http:\/\/)/,"https://"));var t="aria2c -c -s10 -k1M -x16 --enable-rpc=false -o ".concat(JSON.stringify(e.name)," ").concat(i.getHeader("aria2Cmd")," ").concat(JSON.stringify(e.link)),n=[e.link,i.getHeader("aria2c")," out=".concat(e.name)].join("\n");i.getConfigData("sha1Check")&&(t+=" --checksum=sha-1=".concat(e.sha1),n+="\n checksum=sha-1=".concat(e.sha1)),o.push(t),s.push(n);var a=["<",e.link,i.getHeader("idm"),">"].join("\r\n");r.push(a),c.push(e.link)}),document.querySelector("#aria2CmdTxt").value="".concat(o.join("\n")),document.querySelector("#aria2Txt").href="".concat(t).concat(encodeURIComponent(s.join("\n"))),document.querySelector("#idmTxt").href="".concat(t).concat(encodeURIComponent(r.join("\r\n")+"\r\n")),document.querySelector("#downloadLinkTxt").href="".concat(t).concat(encodeURIComponent(c.join("\n"))),document.querySelector("#copyDownloadLinkTxt").dataset.link=c.join("\n")}}]),e}()),t=new(function(){function e(){var t=this;a(this,e),this.version="0.3.6",this.updateDate="2019/12/13",d.on("updateView",function(e){t.updateSetting(e),t.updateMenu(e)})}return o(e,[{key:"init",value:function(){this.context=document.querySelector('iframe[rel="wangpan"]').contentDocument,this.addSettingUI(),this.addTextExport(),d.trigger("initConfigData")}},{key:"addMenu",value:function(e,t){if(e){e.insertAdjacentHTML(t,'\n      <div id="exportMenu" class="export">\n        <a class="export-button">导出下载</a>\n        <div id="aria2List" class="export-menu">\n          <a class="export-menu-item" id="batchOpen" href="javascript:void(0);">批量打开</a>\n          <a class="export-menu-item" id="aria2Text" href="javascript:void(0);">文本导出</a>\n          <a class="export-menu-item" id="settingButton" href="javascript:void(0);">设置</a>\n        </div>\n      </div>');var n=this.context.querySelector("#exportMenu");n.addEventListener("mouseenter",function(){n.classList.add("open-o")}),n.addEventListener("mouseleave",function(){n.classList.remove("open-o")});var a=this.context.querySelector("#settingButton"),i=document.querySelector("#settingMenu");a.addEventListener("click",function(e){i.classList.add("open-o")}),this.context.querySelector("#aria2List").addEventListener("mousedown",function(e){e.stopPropagation()})}}},{key:"addContextMenuRPCSectionWithCallback",value:function(t){function n(e){e.insertAdjacentHTML("beforebegin",'<div class="cell" id="more-menu-rpc-section"><ul></ul></div>'),a.mostRecentConfigData&&a.updateMenu(a.mostRecentConfigData),t&&t()}var a=this,e=this.context.querySelector("body > .context-menu .cell");if(e)n(e);else if("MutationObserver"in window){var i=this.context.querySelector("body"),o=new MutationObserver(function(e){var t=a.context.querySelector("body > .context-menu .cell");t&&(o.disconnect(),n(t))});o.observe(i,{childList:!0})}}},{key:"resetMenu",value:function(){this.context.querySelectorAll("#more-menu-rpc-section li").forEach(function(e){e.remove()}),this.context.querySelectorAll(".rpc-button").forEach(function(e){e.remove()})}},{key:"updateMenu",value:function(e){this.resetMenu();var t=e.rpcList,n="",a="";t.forEach(function(e){var t='<a class="export-menu-item rpc-button" href="javascript:void(0);" data-url='.concat(e.url,">").concat(e.name,"</a>");n+=t,a+='<li><a href="javascript:void(0);" data-url='.concat(e.url,">").concat(e.name,"</a></li>")}),this.context.querySelector("#aria2List").insertAdjacentHTML("afterbegin",n);var i=this.context.querySelector("#more-menu-rpc-section ul");i&&i.insertAdjacentHTML("afterbegin",a)}},{key:"addTextExport",value:function(){var e=this;document.body.insertAdjacentHTML("beforeend",'\n      <div id="textMenu" class="modal text-menu">\n        <div class="modal-inner">\n          <div class="modal-header">\n            <div class="modal-title">文本导出</div>\n            <div class="modal-close">×</div>\n          </div>\n          <div class="modal-body">\n            <div class="text-menu-row">\n              <a class="text-menu-button" href="javascript:void(0);" id="aria2Txt" download="aria2c.down">存为Aria2文件</a>\n              <a class="text-menu-button" href="javascript:void(0);" id="idmTxt" download="idm.ef2">存为IDM文件</a>\n              <a class="text-menu-button" href="javascript:void(0);" id="downloadLinkTxt" download="link.txt">保存下载链接</a>\n              <a class="text-menu-button" href="javascript:void(0);" id="copyDownloadLinkTxt">拷贝下载链接</a>\n            </div>\n            <div class="text-menu-row">\n              <textarea class="text-menu-textarea" type="textarea" wrap="off" spellcheck="false" id="aria2CmdTxt"></textarea>\n            </div>\n          </div>\n        </div>\n      </div>');var t=document.querySelector("#textMenu"),n=t.querySelector(".modal-close"),a=t.querySelector("#copyDownloadLinkTxt");a.addEventListener("click",function(){h.copyText(a.dataset.link)}),n.addEventListener("click",function(){t.classList.remove("open-o"),e.resetTextExport()})}},{key:"resetTextExport",value:function(){var e=document.querySelector("#textMenu");e.querySelector("#aria2Txt").href="",e.querySelector("#idmTxt").href="",e.querySelector("#downloadLinkTxt").href="",e.querySelector("#aria2CmdTxt").value="",e.querySelector("#copyDownloadLinkTxt").dataset.link=""}},{key:"addSettingUI",value:function(){var e=this,t='\n      <div id="settingMenu" class="modal setting-menu">\n        <div class="modal-inner">\n          <div class="modal-header">\n            <div class="modal-title">导出设置</div>\n            <div class="modal-close">×</div>\n          </div>\n          <div class="modal-body">\n            <div class="setting-menu-message">\n              <label class="setting-menu-label orange-o" id="message"></label>\n            </div>\n            <div class="setting-menu-row rpc-s">\n              <div class="setting-menu-name">\n                <input class="setting-menu-input name-s" spellcheck="false">\n              </div>\n              <div class="setting-menu-value">\n                <input class="setting-menu-input url-s" spellcheck="false">\n                <a class="setting-menu-button" id="addRPC" href="javascript:void(0);">添加RPC地址</a>\n              </div>\n            </div>\x3c!-- /.setting-menu-row --\x3e\n            <div class="setting-menu-row">\n              <div class="setting-menu-name">\n                <label class="setting-menu-label">配置同步</label>\n              </div>\n              <div class="setting-menu-value">\n                <input type="checkbox" class="setting-menu-checkbox configSync-s">\n              </div>\n            </div>\x3c!-- /.setting-menu-row --\x3e\n            <div class="setting-menu-row">\n              <div class="setting-menu-name">\n                <label class="setting-menu-label">SHA1校验</label>\n              </div>\n              <div class="setting-menu-value">\n                <input type="checkbox" class="setting-menu-checkbox sha1Check-s">\n              </div>\n            </div>\x3c!-- /.setting-menu-row --\x3e\n            <div class="setting-menu-row">\n              <div class="setting-menu-name">\n                <label class="setting-menu-label">强制SSL下载</label>\n              </div>\n              <div class="setting-menu-value">\n                <input type="checkbox" class="setting-menu-checkbox ssl-s">\n              </div>\n            </div>\x3c!-- /.setting-menu-row --\x3e\n            <div class="setting-menu-row">\n              <div class="setting-menu-name">\n                <label class="setting-menu-label">递归下载间隔</label>\n              </div>\n              <div class="setting-menu-value">\n                <input class="setting-menu-input small-o interval-s" type="number" spellcheck="false">\n                <label class="setting-menu-label">(单位:毫秒)</label>\n                <a class="setting-menu-button version-s" id="testAria2" href="javascript:void(0);">测试连接，成功显示版本号</a>\n              </div>\n            </div>\x3c!-- /.setting-menu-row --\x3e\n            <div class="setting-menu-row">\n              <div class="setting-menu-name">\n                <label class="setting-menu-label">下载路径</label>\n              </div>\n              <div class="setting-menu-value">\n                <input class="setting-menu-input downloadPath-s" placeholder="只能设置为绝对路径" spellcheck="false">\n              </div>\n            </div>\x3c!-- /.setting-menu-row --\x3e\n            <div class="setting-menu-row">\n              <div class="setting-menu-name">\n                <label class="setting-menu-label">User-Agent</label>\n              </div>\n              <div class="setting-menu-value">\n                <input class="setting-menu-input userAgent-s" spellcheck="false">\n                <label class="setting-menu-label"></label>\n                <input type="checkbox" class="setting-menu-checkbox browser-userAgent-s">\n                <label class="setting-menu-label for-checkbox">使用浏览器 UA</label>\n              </div>\n            </div>\x3c!-- /.setting-menu-row --\x3e\n            <div class="setting-menu-row">\n              <div class="setting-menu-name">\n                <label class="setting-menu-label">Referer</label>\n              </div>\n              <div class="setting-menu-value">\n                <input class="setting-menu-input referer-s" spellcheck="false">\n              </div>\n            </div>\x3c!-- /.setting-menu-row --\x3e\n            <div class="setting-menu-row">\n              <div class="setting-menu-name">\n                <label class="setting-menu-label">Headers</label>\n              </div>\n              <div class="setting-menu-value">\n                <textarea class="setting-menu-input textarea-o headers-s" type="textarea" spellcheck="false"></textarea>\n              </div>\n            </div>\x3c!-- /.setting-menu-row --\x3e\n          </div>\x3c!-- /.setting-menu-body --\x3e\n          <div class="modal-footer">\n            <div class="setting-menu-copyright">\n              <div class="setting-menu-item">\n                <label class="setting-menu-label">&copy; Copyright</label>\n                <a class="setting-menu-link" href="https://github.com/acgotaku/BaiduExporter" target="_blank">雪月秋水</a>\n              </div>\n              <div class="setting-menu-item">\n                <label class="setting-menu-label">Version: '.concat(this.version,'</label>\n                <label class="setting-menu-label">Update date: ').concat(this.updateDate,'</label>\n              </div>\n            </div>\x3c!-- /.setting-menu-copyright --\x3e\n            <div class="setting-menu-operate">\n              <a class="setting-menu-button large-o blue-o" id="apply" href="javascript:void(0);">应用</a>\n              <a class="setting-menu-button large-o" id="reset" href="javascript:void(0);">重置</a>\n            </div>\n          </div>\n        </div>\n      </div>');document.body.insertAdjacentHTML("beforeend",t);var n=document.querySelector("#settingMenu");n.querySelector(".modal-close").addEventListener("click",function(){n.classList.remove("open-o"),e.resetSetting()}),document.querySelector("#addRPC").addEventListener("click",function(){var e=document.querySelectorAll(".rpc-s");Array.from(e).pop().insertAdjacentHTML("afterend",'\n        <div class="setting-menu-row rpc-s">\n          <div class="setting-menu-name">\n            <input class="setting-menu-input name-s" spellcheck="false">\n          </div>\n          <div class="setting-menu-value">\n            <input class="setting-menu-input url-s" spellcheck="false">\n          </div>\n        </div>\x3c!-- /.setting-menu-row --\x3e')});var a=document.querySelector("#apply"),i=document.querySelector("#message");a.addEventListener("click",function(){e.saveSetting(),i.innerText="设置已保存"}),document.querySelector("#reset").addEventListener("click",function(){d.trigger("clearConfigData"),i.innerText="设置已重置"});var o=document.querySelector("#testAria2");o.addEventListener("click",function(){h.getVersion(d.getConfigData("rpcList")[0].url,o)});var s=document.querySelector(".userAgent-s"),r=document.querySelector(".browser-userAgent-s");r.addEventListener("change",function(){s.disabled=r.checked})}},{key:"resetSetting",value:function(){document.querySelector("#message").innerText="",document.querySelector("#testAria2").innerText="测试连接，成功显示版本号"}},{key:"updateSetting",value:function(e){var t=e.rpcList,n=e.configSync,a=e.sha1Check,i=e.ssl,o=e.interval,s=e.downloadPath,r=e.userAgent,c=e.browserUserAgent,l=e.referer,u=e.headers;document.querySelectorAll(".rpc-s").forEach(function(e,t){0!==t&&e.remove()}),t.forEach(function(e,t){var n=document.querySelectorAll(".rpc-s");if(0===t)n[t].querySelector(".name-s").value=e.name,n[t].querySelector(".url-s").value=e.url;else{var a='\n          <div class="setting-menu-row rpc-s">\n            <div class="setting-menu-name">\n              <input class="setting-menu-input name-s" value="'.concat(e.name,'" spellcheck="false">\n            </div>\n            <div class="setting-menu-value">\n              <input class="setting-menu-input url-s" value="').concat(e.url,'" spellcheck="false">\n            </div>\n          </div>\x3c!-- /.setting-menu-row --\x3e');Array.from(n).pop().insertAdjacentHTML("afterend",a)}}),document.querySelector(".configSync-s").checked=n,document.querySelector(".sha1Check-s").checked=a,document.querySelector(".ssl-s").checked=i,document.querySelector(".interval-s").value=o,document.querySelector(".downloadPath-s").value=s,document.querySelector(".userAgent-s").value=r,document.querySelector(".userAgent-s").disabled=c,document.querySelector(".browser-userAgent-s").checked=c,document.querySelector(".referer-s").value=l,document.querySelector(".headers-s").value=u,this.mostRecentConfigData=e}},{key:"saveSetting",value:function(){var e=document.querySelectorAll(".rpc-s"),t={rpcList:Array.from(e).map(function(e){var t=e.querySelector(".name-s").value,n=e.querySelector(".url-s").value;if(t&&n)return{name:t,url:n}}).filter(function(e){return e}),configSync:document.querySelector(".configSync-s").checked,sha1Check:document.querySelector(".sha1Check-s").checked,ssl:document.querySelector(".ssl-s").checked,interval:document.querySelector(".interval-s").value,downloadPath:document.querySelector(".downloadPath-s").value,userAgent:document.querySelector(".userAgent-s").value,browserUserAgent:document.querySelector(".browser-userAgent-s").checked,referer:document.querySelector(".referer-s").value,headers:document.querySelector(".headers-s").value};d.trigger("setConfigData",t)}}]),e}()),v=function(){function t(e){a(this,t),this.listParameter=e,this.fileDownloadInfo=[],this.currentTaskId=0,this.completedCount=0,this.folders=[],this.files={}}return o(t,[{key:"start",value:function(e,t){var n=0<arguments.length&&void 0!==e?e:300,a=1<arguments.length?t:void 0;this.interval=n,this.done=a,this.currentTaskId=(new Date).getTime(),this.getNextFile(this.currentTaskId)}},{key:"reset",value:function(){this.fileDownloadInfo=[],this.currentTaskId=0,this.folders=[],this.files={},this.completedCount=0}},{key:"addFolder",value:function(e){this.folders.push(e)}},{key:"addFile",value:function(e){this.files[e.pick_code]=e}},{key:"getNextFile",value:function(n){var a=this;if(n===this.currentTaskId)if(0!==this.folders.length){this.completedCount++,h.showToast("正在获取文件列表... ".concat(this.completedCount,"/").concat(this.completedCount+this.folders.length-1),"inf");var i=this.folders.pop();this.listParameter.search.cid=i.cate_id,h.sendToBackground("fetch",{url:"".concat(this.listParameter.url).concat(h.objectToQueryString(this.listParameter.search)),options:this.listParameter.options},function(e){setTimeout(function(){return a.getNextFile(n)},a.interval);var t=i.path+e.path[e.path.length-1].name+"/";e.data.forEach(function(e){e.sha?a.files[e.pc]={path:t,isdir:!1,sha1:e.sha,pick_code:e.pc}:a.folders.push({cate_id:e.cid,path:t})})})}else 0!==this.files.length?(h.showToast("正在获取下载地址...","inf"),this.getFiles(this.files).then(function(){a.done(a.fileDownloadInfo)})):(h.showToast("一个文件都没有哦...","war"),this.reset())}},{key:"getFiles",value:function(){throw new Error("subclass should implement this method!")}}]),t}();(new(function(){function n(){var e;a(this,n);var t={search:{aid:1,limit:1e3,show_dir:1,cid:""},url:"".concat(location.protocol,"//webapi.115.com/files?"),options:{credentials:"include",method:"GET"}};return(e=l(this,r(n).call(this,t))).mode="RPC",e.rpcURL="http://localhost:6800/jsonrpc",e.iframe=document.querySelector('iframe[rel="wangpan"]'),e}return e(n,v),o(n,[{key:"initialize",value:function(){var e=this;return this.context=document.querySelector('iframe[rel="wangpan"]').contentDocument,t.init(),t.addMenu(this.context.querySelector("#js_upload_btn"),"beforebegin"),this.context.querySelector(".right-tvf").style.display="block",this.addMenuButtonEventListener(),t.addContextMenuRPCSectionWithCallback(function(){e.addContextMenuEventListener()}),h.showToast("初始化成功!","inf"),this}},{key:"startListen",value:function(){var r=this;window.addEventListener("message",function(e){var t=e.data.type;if(t&&("selected"===t||"hovered"===t)){r.reset();var n=e.data.data;if(0===n.length)return void h.showToast("请选择一下你要保存的文件哦","war");!function(e){e.forEach(function(e){e.isdir?r.addFolder(e):r.addFile(e)}),r.start(h.getConfigData("interval"),function(e){if("RPC"===r.mode&&h.aria2RPCMode(r.rpcURL,e),"TXT"===r.mode&&(h.aria2TXTMode(e),document.querySelector("#textMenu").classList.add("open-o")),"OPEN"===r.mode){var t=!0,n=!1,a=void 0;try{for(var i,o=e[Symbol.iterator]();!(t=(i=o.next()).done);t=!0){var s=i.value;window.open("https://115.com/?ct=play&ac=location&pickcode="+s.pickcode)}}catch(e){n=!0,a=e}finally{try{t||null==o.return||o.return()}finally{if(n)throw a}}}})}(n)}}),this.iframe.addEventListener("load",function(){r.initialize(),window.postMessage({type:"refresh"},location.origin)})}},{key:"addMenuButtonEventListener",value:function(){var n=this;this.context.querySelector("#aria2List").addEventListener("click",function(e){var t=e.target.dataset.url;t&&(n.rpcURL=t,n.getSelected(),n.mode="RPC"),"aria2Text"===e.target.id&&(n.getSelected(),n.mode="TXT"),"batchOpen"===e.target.id&&(n.getSelected(),n.mode="OPEN")})}},{key:"addContextMenuEventListener",value:function(){var n=this;this.context.querySelector("#more-menu-rpc-section").addEventListener("click",function(e){var t=e.target.dataset.url;t&&(n.rpcURL=t,n.getHovered(),n.mode="RPC")})}},{key:"getSelected",value:function(){window.postMessage({type:"getSelected"},location.origin)}},{key:"getHovered",value:function(){window.postMessage({type:"getHovered"},location.origin)}},{key:"getFile",value:function(e){var t={credentials:"include",method:"GET"};return new Promise(function(n){h.sendToBackground("fetch",{url:"".concat(location.protocol,"//webapi.115.com/files/download?pickcode=").concat(e),options:t},function(t){var e=t.file_url.match(/.*115.com(\/.*\/)/)[1];h.requestCookies([{path:e}]).then(function(e){t.cookies=e,n(t)})})})}},{key:"getFiles",value:function(n){var a=this,e=Object.keys(n).map(function(e){return a.getFile(e)});return new Promise(function(t){Promise.all(e).then(function(e){e.forEach(function(e){a.fileDownloadInfo.push({name:n[e.pickcode].path+e.file_name,link:e.file_url,sha1:n[e.pickcode].sha1,cookies:e.cookies,pickcode:e.pickcode}),t()})})})}}]),n}())).initialize().startListen()}();