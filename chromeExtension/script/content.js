var includeNodes=[],includeTextes=[];
var findChild=function(node){
	var childNodes=node.childNodes,len=childNodes.length;
	for(var i=0;i<len;++i){
		if(childNodes[i].nodeType==1){
			findChild(childNodes[i]);
		}else if(childNodes[i].nodeType==8){//注释节点
			//<!--#include virtual="/sinclude/cssi/promote/jiafang2015.shtml"-->
			var reg=/^\#include +virtual\=(.+)/g,nodeValue=childNodes[i].nodeValue;
			if(reg.test(nodeValue)){
				includeNodes.push(childNodes[i]);
				nodeValue=nodeValue.replace(reg,function(m,$1){
					return $1;
				});
				nodeValue=nodeValue.replace(/\"|\'/g,"");
				includeTextes.push(nodeValue);
			}
		}
	}
};
findChild(document.documentElement);
var fragment=document.createElement("div");

//让background.js来拉取对应的页面片
chrome.extension.sendRequest({pages:includeTextes},function(arr){
	for(var i=0,len=arr.length;i<len;++i){
		fragment.innerHTML=arr[i];
		var curNode=includeNodes[i];
		var fchildNodes=fragment.childNodes;console.log(fragment.innerHTML);
		while(fchildNodes.length){
			var node=fchildNodes[fchildNodes.length-1];
			curNode.parentNode.insertBefore(node,curNode)
		}
		curNode.parentNode.removeChild(curNode);
		//includeNodes[i].outerHTML=arr[i];
	}
});
