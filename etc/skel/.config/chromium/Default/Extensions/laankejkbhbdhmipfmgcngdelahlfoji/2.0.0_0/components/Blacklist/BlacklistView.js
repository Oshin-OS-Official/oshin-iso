define(["core/Logger","core/CoreAPI","core/vendor/jquery.min","core/vendor/Brightline.min","core/vendor/text!components/List/list.tpl","core/vendor/text!components/Blacklist/blacklist.tpl","components/List/ListView"],function(Logger,API,$,Brightline,listTpl,blockedSitesTpl,ListView){function log(originator,funcName,message,payload,level){Logger.log(originator+"."+funcName,message,payload,level)}return class extends ListView{setJQuery(jQuery){$=jQuery||$,super.setJQuery(jQuery)}refreshList(){super.refreshList($("#blockedSitesList"),$("#newBlockedSites"),"data-hide-on-bypass")}render(){return super.render(blockedSitesTpl)}renderList(){return super.renderList("data-hide-on-bypass")}bindUIHandlers(){super.bindUIHandlers(),this.bindBlacklistUIHandlers()}bindListUIHandlers(){super.bindListUIHandlers(),!0===API.Settings.get("productivityBypass")&&$("*[data-hide-on-bypass]").hide()}bindBlacklistUIHandlers(){log(this.originator,"bindBlacklistUIHandlers","Binding UI handlers for blacklist",null,"TRACE");var $blockedSitesMsg=$("#blockedSitesMsg"),$stalkerOptionInput=$("input[name=stalkerOption]"),self=this;API.StayFocusd.isMaxTimeAllowedExceeded()&&($blockedSitesMsg.html(API.Chrome.Translation.get("cannotRemoveBlockedSites")),$blockedSitesMsg.show()),$("input[name=addBlockedSites]").click(function(){API.PubSub.publish(self.getClassName()+".domains.add.BLACKLIST"),self.prepareListIfBlockAllSites()}),$stalkerOptionInput.click(function(){API.PubSub.publish(self.getClassName()+".checkbox.toggle.STALKER_OPTION")}),$("#showSuggestedSitesList").click(function(){API.PubSub.publish(self.getClassName()+".data.load.SUGGESTED_SITES")}),$("#blockExtensionsPage").click(function(){API.PubSub.publish(self.getClassName()+".domain.add.BLACKLIST",{domain:"chrome://extensions"})}),API.StayFocusd.isOutgoingLinksOptionActive()&&($stalkerOptionInput.prop("checked",!0),API.StayFocusd.isMaxTimeAllowedExceeded())&&$stalkerOptionInput.prop("disabled",!0),$("input[id=blockAllSites]").change(function(){var block=$("#siteListBlock");this.checked?block.addClass("pointer-events-none opacity-50"):block.removeClass("pointer-events-none opacity-50"),this.checked?self.model.add("*"):self.model.has("*")&&self.model.remove("*"),API.PubSub.publish(self.getClassName()+".domains.add.BLACKLIST")}),this.prepareListIfBlockAllSites()}prepareListIfBlockAllSites(){var checkbox;this.model.has("*")&&((checkbox=$("input[id=blockAllSites]")).prop("checked",!0),checkbox.change())}addListeners(){log(this.originator,"addListeners","Adding listeners",null,"TRACE");var self=this;API.PubSub.listen("*.data.loaded.SUGGESTED_SITES",function(message,payload){self.renderSuggestedSitesList(payload.data)}),super.addListeners()}getNewDomains(){return super.getNewDomains($("#newBlockedSites").val())}renderSuggestedSitesList(siteList){log(this.originator,"renderSuggestedSitesList","Rendering suggested sites list",siteList,"TRACE");var name,domain,template=new Brightline(listTpl);for(name in siteList)siteList.hasOwnProperty(name)&&(domain=siteList[name],this.model.has(domain)||(domain=name.split(" ").join("-").toLowerCase(),template.set("id",domain),template.set("addToList",API.Chrome.Translation.get("addToList")),template.set("domain",name),template.parse("addDomain")));$("#suggestedSitesList").html(template.render()),this.bindSuggestedSitesListUIHandlers(siteList)}bindSuggestedSitesListUIHandlers(siteList){log(this.originator,"bindSuggestedSitesListUIHandlers","Binding UI handlers to suggested sites list",siteList,"TRACE");var name,domain,self=this;for(name in siteList)siteList.hasOwnProperty(name)&&(domain=siteList[name],self.model.has(domain)||function(d,i){$("#"+i+" button").click(function(){API.PubSub.publish(self.getClassName()+".domain.add.BLACKLIST",{domain:d}),$("#"+i).remove()})}(domain,name.split(" ").join("-").toLowerCase()));$("#suggestedSites").slideToggle()}}});