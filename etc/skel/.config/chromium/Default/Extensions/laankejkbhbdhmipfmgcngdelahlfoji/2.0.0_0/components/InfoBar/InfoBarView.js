define(["core/Logger","core/vendor/jquery.min","core/vendor/Brightline.min","core/CoreAPI","core/vendor/text!components/InfoBar/infoBar.tpl"],function(Logger,$,Brightline,API,infoBarTpl){function log(originator,funcName,message,payload,level){Logger.log(originator+"."+funcName,message,payload,level)}return class{model=null;init(){log(this.originator,"init","Initializing view",null,"DEBUG"),this.model.isHidden()||this.inject()}render(){log(this.originator,"render","Rendering view",null,"DEBUG");var template=new Brightline(infoBarTpl);return template.set("extensionURL",API.Chrome.Extension.getURL("/")),template.set("hideForever",API.Chrome.Translation.get("hideForever")),template.set("hideOnce",API.Chrome.Translation.get("hideOnce")),template.render()}inject(){log(this.originator,"inject","Injecting view"),$("body").prepend(this.render()),this.bindUIHandlers()}bindUIHandlers(){log(this.originator,"bindUIHandlers","Binding UI handlers",null,"TRACE");var self=this;$(document).on("click","#StayFocusd-infobar-hide",function(){self.hide()}),$(document).on("click","#StayFocusd-infobar-never-show",function(){self.hide(),self.model.setHidden(!0)})}show(msgType){log(this.originator,"show","Showing InfoBar"),this.model.isHidden()||($("#StayFocusd-infobar-msg").html(this.model.getMessage(msgType)),$("#StayFocusd-infobar").css("color","#ffffff"),$("#StayFocusd-infobar").slideDown("fast"))}hide(){log(this.originator,"hide","Hiding InfoBar"),this.model.isHidden()||$("#StayFocusd-infobar").slideUp("fast")}}});