define(["core/Logger","core/CoreAPI"],function(Logger,API){return class{descriptor=null;list=null;init(){var instanceName=this.getInstanceName()||"";this.isSyncDisabled()?API.Storage.setBucket(instanceName,"LOCAL",!0):API.Storage.setBucket(instanceName,"SYNC",!0),this.descriptor=instanceName.toUpperCase(),this.addListeners()}load(onLoaded){this.list=API.Settings.get(this.getInstanceName()),API.Object.isObjLiteral(this.list)||(this.list={}),"object"==typeof this.list[""]&&(delete this.list[""],this.save()),this.list=API.Object.sort(this.list),"function"==typeof onLoaded&&onLoaded(this.list),API.PubSub.publish(this.getClassName()+".list.loaded."+this.descriptor,{list:this.list})}save(onSaved){var self=this,obj={};obj[this.getInstanceName()]=API.Object.sort(this.list),API.Settings.set(obj,function(){"function"==typeof onSaved&&onSaved(self.list),API.PubSub.publish(self.getClassName()+".list.saved."+self.descriptor,{list:self.list})})}add(domain,skipSave,silent){if(API.Utils.isEmpty(domain))return!1;if(this.list)return domain="string"==typeof domain?domain.toLowerCase():"",this.list[domain]={},this.list=this.clean(domain),skipSave||this.save(),silent||API.PubSub.publish(this.getClassName()+".domain.added."+this.descriptor,{domain:domain,list:this.list}),!0;throw new Error("["+this.getClassName()+".add()] Must load model before adding domains")}addMany(domains){if(!API.Object.isArray(domains))throw new Error("["+this.getClassName()+".addMany()] Domains must be in an array");for(var addedDomains=[],i=0;i<domains.length;i++)this.add(domains[i],!0,!0)&&addedDomains.push(domains[i]);API.Analytics.event("ADD_DOMAIN",{type:this.getClassName(),domains:addedDomains}),this.save(),API.PubSub.publish(this.getClassName()+".domains.added."+this.descriptor,{domains:addedDomains,list:this.list})}remove(domain,skipSave,silent){return(domain="string"==typeof domain?domain.toLowerCase():"")in this.list&&(delete this.list[domain],API.Analytics.event("REMOVE_DOMAIN",{type:this.getClassName(),domain:domain}),skipSave||this.save(),silent||API.PubSub.publish(this.getClassName()+".domain.removed."+this.descriptor,{domain:domain,list:this.list}),!0)}removeMany(domains){if(!API.Object.isArray(domains))throw new Error("["+this.getClassName()+".removeMany()] Domains must be in an array");for(var removedDomains=[],i=0;i<domains.length;i++)this.remove(domains[i],!0,!0)&&removedDomains.push(domains[i]);this.save(),API.PubSub.publish(this.getClassName()+".domains.removed."+this.descriptor,{domains:removedDomains,list:this.list})}get(asObject){if(asObject)return this.list;var domain,list=[];for(domain in this.list)this.list.hasOwnProperty(domain)&&list.push(domain);return list.sort(),list}find(domainToFind){for(var domainInList in domainToFind="string"==typeof domainToFind?domainToFind.toLowerCase():"",this.list)if(this.list.hasOwnProperty(domainInList)){if(domainInList="string"==typeof domainInList?domainInList.toLowerCase():"",API.Domain.isMoreGeneralURL(domainInList,domainToFind))return domainInList;if(0===domainInList.indexOf("*")&&API.Domain.matchesWildcard(domainInList,domainToFind))return domainInList}return!1}has(domain){return domain="string"==typeof domain?domain.toLowerCase():"",!(!1===this.find(domain))}clear(){this.list={},this.save(),API.PubSub.publish(this.getClassName()+".list.cleared."+this.descriptor,{list:this.list})}clean(domain){var cleanList={};for(anyDomain in domain="string"==typeof domain?domain.toLowerCase():"",this.list)if(this.list.hasOwnProperty(anyDomain)){var cleanDomain,anyDomain="string"==typeof anyDomain?anyDomain.toLowerCase():"",inCleanList=!1;for(cleanDomain in cleanList)!cleanList.hasOwnProperty(cleanDomain)||anyDomain!==(cleanDomain=cleanDomain.toLowerCase())&&!API.Domain.isMoreGeneralURL(cleanDomain,anyDomain)||(inCleanList=!0);!0!==inCleanList&&(API.Domain.isMoreGeneralURL(domain,anyDomain)?cleanList[domain]={}:API.Utils.isEmpty(anyDomain)||(cleanList[anyDomain]={}))}return cleanList}mergeLocalWithSynced(onMerged){var self=this;API.Storage.merge(this.getInstanceName(),"SYNC","LOCAL",function(){self.load(onMerged)})}isSyncDisabled(){return!0===API.Settings.get("disableSync")}addListeners(){var self=this,instanceName=this.getInstanceName();API.PubSub.listen("*.domain.added",function(message,payload){message.matches("*.domain.added."+self.descriptor)||self.remove(payload.domain)}),API.PubSub.listen("*.domains.added",function(message,payload){message.matches("*.domains.added."+self.descriptor)||self.removeMany(payload.domains)}),API.PubSub.listen("*.checkbox.toggle.DISABLE_SYNC",function(message,payload){!1===payload.disableSync?(API.Storage.setBucket(instanceName,"SYNC"),self.mergeLocalWithSynced()):API.Storage.setBucket(instanceName,"LOCAL")})}canRemoveSiteWhenMaxTimeAllowedExceeded(){return!1}}});