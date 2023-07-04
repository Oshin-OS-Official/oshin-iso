define(["core/Logger","core/CoreAPI"],function(Logger,API){function log(originator,funcName,message,payload,level){Logger.log(originator+"."+funcName,message,payload,level)}return class{model=null;color={RED:"#FF0000",YELLOW:"#FDD017",GREEN:"#009933"};icon={ONBOARDING:"common/img/icon-red-dot-24.png",ALLOWED:"common/img/icon-green-24.png",BLOCKED:"common/img/icon-red-24.png",DEFAULT:"common/img/icon-24.png",NUCLEAR:"common/img/icon-nuclear-24.png"};showBadge(text,color,tabID){color=this.getColor(color),log(this.originator,"showBadge","Showing badge",{text:text=text||"",color:color,tabID:tabID=tabID||null},"DEBUG"),color&&this.setBadgeColor(color,tabID),this.setBadgeText(text,tabID),this.model.badgeVisible=!0}hideBadge(tabID){tabID=tabID||null,this.model.badgeVisible=!1,this.setBadgeText("",tabID)}async setIcon(type,tabID){tabID=tabID||null,log(this.originator,"setIcon","Setting icon",type,"TRACE"),await this.isOnboardingIcon()?API.Chrome.Icon.setURL({tabId:tabID,path:this.getIconURL("ONBOARDING")}):API.Chrome.Icon.setURL({tabId:tabID,path:this.getIconURL(type)})}setBadgeColor(color,tabID){log(this.originator,"setBadgeColor","Setting badge color",color,"TRACE"),API.Chrome.Icon.setBadgeColor({tabId:tabID=tabID||null,color:color})}setBadgeText(text,tabID){log(this.originator,"setBadgeText","Setting badge text",text,"TRACE"),API.Chrome.Icon.setBadgeText({tabId:tabID=tabID||null,text:text})}getColor(colorName){return"string"==typeof colorName&&this.color[colorName.toUpperCase()]||null}getIconURL(type){return this.icon[(type="string"==typeof type&&type?type:"DEFAULT").toUpperCase()]}async isOnboardingIcon(){return!await API.Requirements.isOnboardingCompleted()}}});