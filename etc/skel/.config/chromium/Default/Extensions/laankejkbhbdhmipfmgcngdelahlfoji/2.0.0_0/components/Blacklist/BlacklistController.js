define(["core/Logger","core/CoreAPI","components/List/ListController"],function(Logger,API,ListController){function log(originator,funcName,message,payload,level){Logger.log(originator+"."+funcName,message,payload,level)}return class extends ListController{addListeners(){super.addListeners();var self=this;API.PubSub.listen("*.checkbox.toggle.STALKER_OPTION",function(){self.toggleStalkerOption()}),API.PubSub.listen("*.data.load.SUGGESTED_SITES",function(){self.loadSuggestedSitesList()})}toggleStalkerOption(){var isOutgoingLinksOptionActive=API.StayFocusd.isOutgoingLinksOptionActive();log(this.originator,"toggleStalkerOption","Toggling Stalker Options "+(isOutgoingLinksOptionActive?"OFF":"ON")),API.Settings.set({countdownForOutgoingLinks:!isOutgoingLinksOptionActive})}loadSuggestedSitesList(){log(this.originator,"loadSuggestedSitesList","Loading suggested sites list");var self=this;$.ajax({type:"GET",url:API.StayFocusd.getAPIURL()+"/SiteList/suggestions/black.json",data:null,success:function(response){response="string"==typeof response?JSON.parse(response):response;if(log(self.originator,"loadSuggestedSitesList","Suggested sites list loaded",response),0===response.count||void 0===response.data)return alert(API.Chrome.Translation.get("errorLoadingSuggestedSites")),!1;API.PubSub.publish(self.getClassName()+".data.loaded.SUGGESTED_SITES",response)},error:function(){return alert(API.Chrome.Translation.get("errorLoadingSuggestedSites")),!1}})}}});