//接收operaTab发来的消息
chrome.extension.onRequest.addListener(function(request,sender,sendResponse){
	var pages=request.pages;
	var finished=[],flen=0;
	for(var i=0,len=pages.length;i<len;++i){
		var page=pages[i];
		~function(i){
			getPageContent(page,function(text){
				finished[i]=text;
				if(++flen==len)sendResponse(finished);
			});
		}(i);
	}
	setTimeout(function(){
		sendResponse(finished);
	},10000);//10s内没有返回完成就当是全部成功处理
	//sendResponse(text);
	//wqs.jd.com
});
var getPageContent=function(url,cb){
	url='http://wqs.jd.com'+url;
	var xhr=new XMLHttpRequest();
	xhr.open('GET',url,true);
	xhr.onreadystatechange=function(){
		if(xhr.readyState==4){
			if(xhr.status==200){
				//请求成功
				var text=xhr.responseText;
				cb&&cb(text);
			}
		}
	};
	xhr.send(null);
};



