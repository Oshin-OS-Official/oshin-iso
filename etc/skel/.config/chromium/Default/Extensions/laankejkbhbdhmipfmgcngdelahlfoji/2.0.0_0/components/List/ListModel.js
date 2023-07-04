define(["core/Logger","core/CoreAPI"],function(Logger,API){function log(originator,funcName,message,payload,level){Logger.log(originator+"."+funcName,message,payload,level)}return class{QUOTA_BYTES_PER_ITEM=8192;descriptor=null;list=null;init(){log(this.originator,"init","Initializing model",null,"DEBUG");var instanceName=this.getInstanceName()||"";this.isSyncDisabled()?API.Storage.setBucket(instanceName,"LOCAL",!0):API.Storage.setBucket(instanceName,"SYNC",!0),this.descriptor=instanceName.toUpperCase(),this.addListeners()}load(onLoaded){log(this.originator,"load","Loading model"),this.list=API.Settings.get(this.getInstanceName()),API.Object.isObjLiteral(this.list)||(this.list={}),"object"==typeof this.list[""]&&(delete this.list[""],this.save()),this.list=API.Object.sort(this.list),"function"==typeof onLoaded&&onLoaded(this.list),API.PubSub.publish(this.getClassName()+".list.loaded."+this.descriptor,{list:this.list})}save(onSaved){log(this.originator,"save","Saving model");var self=this,obj={};obj[this.getInstanceName()]=API.Object.sort(this.list),API.Settings.set(obj,function(){log(self.originator,"save","Model saved"),"function"==typeof onSaved&&onSaved(self.list),API.PubSub.publish(self.getClassName()+".list.saved."+self.descriptor,{list:self.list})})}add(domain,skipSave,silent){if(API.Utils.isEmpty(domain))return!1;if(this.list)return log(this.originator,"add","Adding "+domain),domain="string"==typeof domain?domain.toLowerCase():"",this.list[domain]={},this.list=this.clean(domain),this.canSaveDomains(domain)?(skipSave||this.save(),silent||API.PubSub.publish(this.getClassName()+".domain.added."+this.descriptor,{domain:domain,list:this.list}),!0):(delete this.list[domain],!1);throw new Error("["+this.getClassName()+".add()] Must load model before adding domains")}canSaveDomains(domain){var disableSync=API.Settings.get("disableSync");if(!disableSync&&JSON.stringify(this.list).length>=this.QUOTA_BYTES_PER_ITEM-this.getClassName().length)return log(this.originator,"add","Adding "+domain+" with fail. Overflow quota per item."),alert(API.Chrome.Translation.get("cannotAddSiteToRestrictionList")),!1;return!0}addMany(domains){if(!API.Object.isArray(domains))throw new Error("["+this.getClassName()+".addMany()] Domains must be in an array");log(this.originator,"addMany","Adding many domains:",domains);for(var addedDomains=[],i=0;i<domains.length;i++)this.add(domains[i],!0,!0)&&addedDomains.push(domains[i]);0<addedDomains.length&&(addedDomains.forEach(domain=>API.Analytics.event("ADD_DOMAIN",{type:this.getClassName(),domain:domain})),this.save(),log(this.originator,"addMany","Done adding many domains",addedDomains),API.PubSub.publish(this.getClassName()+".domains.added."+this.descriptor,{domains:addedDomains,list:this.list}))}remove(domain,skipSave,silent){return(domain="string"==typeof domain?domain.toLowerCase():"")in this.list&&(log(this.originator,"remove","Removing "+domain),delete this.list[domain],API.Analytics.event("REMOVE_DOMAIN",{type:this.getClassName(),domain:domain}),skipSave||this.save(),silent||API.PubSub.publish(this.getClassName()+".domain.removed."+this.descriptor,{domain:domain,list:this.list}),!0)}removeMany(domains){if(!API.Object.isArray(domains))throw new Error("["+this.getClassName()+".removeMany()] Domains must be in an array");log(this.originator,"removeMany","Removing many domains:",domains);for(var removedDomains=[],i=0;i<domains.length;i++)this.remove(domains[i],!0,!0)&&removedDomains.push(domains[i]);this.save(),log(this.originator,"removeMany","Done removing many domains",removedDomains),API.PubSub.publish(this.getClassName()+".domains.removed."+this.descriptor,{domains:removedDomains,list:this.list})}get(asObject){if(asObject)return this.list;var domain,list=[];for(domain in this.list)this.list.hasOwnProperty(domain)&&list.push(domain);return log(this.originator,"get","Getting list",list,"TRACE"),list.sort(),list}find(domainToFind){for(var domainInList in log(this.originator,"find","Finding domain",domainToFind,"TRACE"),domainToFind="string"==typeof domainToFind?domainToFind.toLowerCase():"",this.list)if(this.list.hasOwnProperty(domainInList)){if(domainInList="string"==typeof domainInList?domainInList.toLowerCase():"",API.Domain.isMoreGeneralURL(domainInList,domainToFind))return log(this.originator,"find","Finding domain in list",{domainToFind:domainToFind,domainInList:domainInList},"DEBUG"),domainInList;if(0===domainInList.indexOf("*")&&API.Domain.matchesWildcard(domainInList,domainToFind))return log(this.originator,"find","Finding domain in list",{domainToFind:domainToFind,domainInList:domainInList},"TRACE"),domainInList}return!1}has(domain){return domain="string"==typeof domain?domain.toLowerCase():"",!(!1===this.find(domain))}clear(){log(this.originator,"clear","Clearing list"),this.list={},this.save(),API.PubSub.publish(this.getClassName()+".list.cleared."+this.descriptor,{list:this.list})}clean(domain){log(this.originator,"clean","Cleaning up list",null,"TRACE");var cleanList={};for(anyDomain in domain="string"==typeof domain?domain.toLowerCase():"",this.list)if(this.list.hasOwnProperty(anyDomain)){var cleanDomain,anyDomain="string"==typeof anyDomain?anyDomain.toLowerCase():"",inCleanList=!1;for(cleanDomain in cleanList)!cleanList.hasOwnProperty(cleanDomain)||anyDomain!==(cleanDomain=cleanDomain.toLowerCase())&&!API.Domain.isMoreGeneralURL(cleanDomain,anyDomain)||(inCleanList=!0);!0!==inCleanList&&(API.Domain.isMoreGeneralURL(domain,anyDomain)?cleanList[domain]={}:API.Utils.isEmpty(anyDomain)||(cleanList[anyDomain]={}))}return cleanList}mergeLocalWithSynced(onMerged){log(this.originator,"mergeLocalWithSynced","Merging local list with synced list");var self=this;API.Storage.merge(this.getInstanceName(),"SYNC","LOCAL",function(){self.load(onMerged)})}isSyncDisabled(){return!0===API.Settings.get("disableSync")}addListeners(){var self=this,instanceName=this.getInstanceName();API.PubSub.listen("*.domain.added",function(message,payload){message.matches("*.domain.added."+self.descriptor)||self.remove(payload.domain)}),API.PubSub.listen("*.domains.added",function(message,payload){message.matches("*.domains.added."+self.descriptor)||self.removeMany(payload.domains)}),API.PubSub.listen("*.checkbox.toggle.DISABLE_SYNC",function(message,payload){!1===payload.disableSync?(API.Storage.setBucket(instanceName,"SYNC"),self.mergeLocalWithSynced()):API.Storage.setBucket(instanceName,"LOCAL")})}canRemoveSiteWhenMaxTimeAllowedExceeded(){return!1}}});