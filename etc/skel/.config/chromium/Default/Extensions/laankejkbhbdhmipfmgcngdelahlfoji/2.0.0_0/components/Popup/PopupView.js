define(["core/Logger","core/CoreAPI","core/vendor/jquery.min","core/vendor/DropletJS.PubSub.min","core/vendor/Brightline.min","core/vendor/text!components/Popup/popup.tpl.html"],function(Logger,API,$,PubSub,Brightline,popupTpl){function log(funcName,message,payload,level){Logger.log("PopupView."+funcName,message,payload,level)}return class{model=null;constructor(model){log("constructor","Constructing PopupView",null,"DEBUG"),this.model=model,PubSub.listen("Popup.timer.tick",this.updateDisplayTimer.bind(this))}init(){log("init","Initializing view",null,"DEBUG"),this.inject(),this.addListeners()}render(){log("render","Rendering view");var template=new Brightline(popupTpl);return template.set("baseDomain",this.model.baseDomain),template.set("fullDomain",this.model.fullDomain),template.render()}inject(){log("inject","Injecting view"),$("body").append(this.render()),this.model.fullDomain!==this.model.baseDomain&&$("#only-allow, #only-block").show(),API.Settings.get("hideAllowSiteLink")?$("*[data-allow]").hide():$("#allow-entire").show(),API.StayFocusd.localizeHTML(document),this.bindUIHandlers()}bindUIHandlers(){log("bindUIHandlers","Binding UI handlers",null,"TRACE");var self=this;$("#show-help").click(function(){PubSub.publish("PopupView.button.clicked",{button:"help"})}),$("#show-options").click(function(){PubSub.publish("PopupView.button.clicked",{button:"options"})}),$("#show-nuclear-option").click(function(){PubSub.publish("PopupView.button.clicked",{button:"nuclearOption"})}),$("a.close").click(function(){PubSub.publish("PopupView.button.clicked",{button:"close"})}),$("#showBlockedSitesOptions").click(function(){PubSub.publish("PopupView.button.clicked",{button:"blockedSites"})}),$("#show-advanced-options").click(function(){$("#advanced-options").slideToggle("fast")}),$("#block-entire").click(function(){PubSub.publish("PopupView.button.clicked",{button:"addToList",domain:self.model.baseDomain,listType:"black"})}),$("#block-custom").click(function(){PubSub.publish("PopupView.button.clicked",{button:"addToList",domain:$("#custom-url").val(),listType:"black"})}),$("#allow-custom").click(function(){PubSub.publish("PopupView.button.clicked",{button:"addToList",domain:$("#custom-url").val(),listType:"white"})}),$("#allow-entire").click(function(){PubSub.publish("PopupView.button.clicked",{button:"addToList",domain:self.model.baseDomain,listType:"white"})}),$("#only-block").click(function(){PubSub.publish("PopupView.button.clicked",{button:"addToList",domain:self.model.fullDomain,listType:"black"})}),$("#only-allow").click(function(){PubSub.publish("PopupView.button.clicked",{button:"addToList",domain:self.model.fullDomain,listType:"white"})}),API.Analytics.bindHtmlEvents()}addListeners(){log("addListeners","Adding listeners",null,"TRACE");var self=this;PubSub.listen("*.domain.added",function(message,payload){self.showAddToListStatus(payload.success)}),PubSub.listen("PopupModel.timer.updated",function(message,payload){self.updateDisplayTimer(payload.timer)})}showAddToListStatus(success){log("showAddToListStatus",'Showing "add to list" status',success?"SUCCESS":"ERROR","DEBUG"),!0===success?($("#status-msg").removeClass("text-error").addClass("text-success").html(API.Chrome.Translation.get("success").toUpperCase()+"!"),setTimeout(function(){window.close()},1500)):($("#status-msg").removeClass("text-success").addClass("text-error").html(API.Chrome.Translation.get("error").toUpperCase()),setTimeout(function(){$("#status-msg").hide()},2e3)),$("#status-msg").show()}updateDisplayTimer(timer){var displayTimer="",$displayTimer=$("#display-timer");this.model.isNuclear()?(displayTimer=API.Chrome.Translation.get("nuclear"),$displayTimer.addClass("nuclear")):!1===this.model.isActive()?displayTimer=API.Chrome.Translation.get("inactive"):"00:00:00"===(displayTimer=timer)&&$displayTimer.addClass("expired"),log("updateDisplayTimer","Updating display timer: "+displayTimer,null,"DEBUG"),$displayTimer.html(displayTimer)}}});