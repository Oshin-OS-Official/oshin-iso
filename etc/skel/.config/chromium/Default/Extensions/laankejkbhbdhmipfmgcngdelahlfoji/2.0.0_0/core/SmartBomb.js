define(["core/Logger","core/CoreAPI","core/vendor/jquery.min"],function(Logger,API,$){function log(funcName,message,payload,level){Logger.log("SmartBomb."+funcName,message,payload,level)}return{timer:null,interval:1,smartBomb:{},init:function(){this.addListeners()},activate:function(smartBomb){log("activate","Activating SmartBomb",null,"DEBUG"),this.smartBomb=smartBomb,clearInterval(this.timer),this.timer=setInterval(this.tick.bind(this),1e3*this.interval)},addListeners:function(){var self=this;API.PubSub.listen({message:"*.smartBomb.activate",handler:function(message,payload){self.activate(payload.smartBomb)}})},bomb:function(){log("bomb","Bombing"),this.smartBomb.multimedia&&this.bombMultimedia(),this.smartBomb.images&&this.bombImages(),this.smartBomb.forms&&this.bombForms(),this.smartBomb.logins&&this.bombLogins()},bombMultimedia:function(){log("bombMultimedia","- Bombing multimedia");var self=this;$("embed,object,applet,canvas,video,iframe").each(function(){self.replace($(this))})},bombImages:function(){log("bombImages","- Bombing images");var self=this;$("img").each(function(){self.replace($(this))})},bombForms:function(){log("bombForms","- Bombing forms");var self=this;$("input,select,textarea").each(function(){self.replace($(this))})},bombLogins:function(){log("bombLogins","- Bombing logins");var self=this;$("input[type=password]").each(function(){self.replace($(this))})},replace:function(jqElement){var width,height;return"StayFocusd-smartBombed"!==jqElement.attr("class")&&(width=jqElement.attr("width"),height=jqElement.attr("height"),"none"!==jqElement.css("display"))&&(height='<div style="height:'+height+"px;width:"+width+"px;background:url("+API.Chrome.Extension.getURL("common/img/smartBombBG.png")+') #000" class="StayFocusd-smartBombed"></div>',void jqElement.replaceWith(height))},tick:function(){this.bomb()}}});