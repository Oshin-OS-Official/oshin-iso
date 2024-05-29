var A=Object.defineProperty;var B=(o,e,a)=>e in o?A(o,e,{enumerable:!0,configurable:!0,writable:!0,value:a}):o[e]=a;var c=(o,e,a)=>(B(o,typeof e!="symbol"?e+"":e,a),a);import"../../Logger.js";import{$ as D}from"../../jquery.js";import{T as f,A as m,g as x,a as E,i as C,c as T,k as S}from"../../CoreAPI.js";import{C as k,r as I,s as F}from"../../index.js";import{B as M}from"../../Brightline.min.js";class _{constructor(){c(this,"summary",[]);c(this,"allowList",[]);c(this,"isShowAds",!1)}async loadData(e){let a=Date.now(),t=f.getToday();e!=null&&(t=f.getStartOfDay(e));const i=t+T,l=chrome.runtime.connect({name:"getUsageSummaryData"});l.postMessage({message:"usage.getUsageSummaryData.request",startDate:t,endDate:i});const{sessions:u,ads:h}=await new Promise(n=>{l.onMessage.addListener(function(s){s.message==="usage.getUsageSummaryData.response"&&n({sessions:s.sessions,ads:s.ads})})});let d=[];m.Settings.get("isBlockAllWebsites")?d=null:d=x();const g=await E();this.allowList=g;const y=(await m.Storage.get("maxTimeAllowed")??10)*S;let p=0;const v=u.reduce((n,s)=>{if(!C(s.appId,d,g))return n;let r=(s.endedAt??a)-s.startedAt;return p+r>y&&(r=y-p),p+=r,n.push({website:s.appId,duration:r,adCount:h.filter(L=>L.sessionId==s.id).length}),n},[]).reduce((n,s)=>{const w=n.find(r=>r.website==s.website);return w!=null?(w.duration+=s.duration,w.adCount+=s.adCount):n.push({website:s.website,duration:s.duration,adCount:s.adCount}),n},[]);this.summary=v.sort((n,s)=>s.duration-n.duration)}}k.register(...I);const U=`<div class="shadow-[rgba(0,_0,_0,_0.24)_0px_3px_8px] rounded-2xl p-4 h-full">
    <div class="flex flex-col items-center m-5">
        <div class="tabs tabs-boxed">
            <a id="blockListBtn" class="tab tab-active">Blocked websites</a>
            <a id="allowedListBtn" class="tab">Allowed websites</a>
        </div>
        <div id="blockListTab">
            <div class="mt-4 text-center">
                <p class="inline-block font-bold text-base">Here's how you spent time on blocked sites:</p>
                <input type="date" class="inline-block p-1 border-slate-300 border rounded-sm" id="date" />
            </div>
            <canvas id="chart" width="540" height="350"></canvas>
            <div class="form-control">
                <label class="label cursor-pointer justify-start">
                    <input type="checkbox" class="checkbox checkbox-primary" id="ads" name="ads" />
                    <span id="adsLabel" for="ads" class="label-text ml-1 font-bold">Show ad count</span>
                </label>
                <p class="ml-1">The number of distractions you have had from these blocked websites</p>
            </div>
        </div>
        <div id="allowedListTab" class="hidden m-4 w-[70%]">
            <ul id="allowedList" class="list-disc">
            </ul>
        </div>
    </div>
</div>
`;class W{constructor(e){c(this,"model");c(this,"chart");this.model=e;const a=new M(U);document.body.innerHTML=a.render(),this.addEventListeners(),document.getElementById("date").valueAsDate=new Date;const t=document.getElementById("chart");this.fillChart(t),this.fillAllowedList()}addEventListeners(){const e=document.getElementById("adsLabel"),a=document.getElementById("ads");e.addEventListener("click",()=>{this.model.isShowAds=!a.checked,this.chart.data=this.getDataForChart(),this.chart.update()}),document.getElementById("date").addEventListener("change",async g=>{await this.model.loadData(new Date(g.target.value)),this.chart.data=this.getDataForChart(),this.chart.update()});function i(){d.classList.add("tab-active"),b.classList.remove("tab-active"),u.classList.remove("hidden"),h.classList.add("hidden")}function l(){b.classList.add("tab-active"),d.classList.remove("tab-active"),h.classList.remove("hidden"),u.classList.add("hidden")}const u=document.getElementById("blockListTab"),h=document.getElementById("allowedListTab"),d=document.getElementById("blockListBtn");d.addEventListener("click",()=>{i()});const b=document.getElementById("allowedListBtn");b.addEventListener("click",()=>{l()})}fillAllowedList(){function e(t){return t.startsWith("http")?t:t=`https://${t}`}const a=document.getElementById("allowedList");this.model.allowList.forEach(t=>{const i=document.createElement("li"),l=document.createElement("a");l.href=e(t),l.innerText=t,l.target="_blank",l.classList.add("link","link-info","text-sm"),i.appendChild(l),a.appendChild(i)})}fillChart(e){const a={id:"emptyChart",afterDraw:function(t){if(t.data.datasets[0].data.length<1){const i=t.ctx;i.textAlign="center",i.textBaseline="middle",i.font="30px Arial",i.fillText("No data to display",t.width/2,t.height/2),i.restore()}}};this.chart=new k(e,{type:"doughnut",options:{responsive:!1,layout:{padding:16},plugins:{legend:{position:"right",labels:{usePointStyle:!0,pointStyle:"circle"}},tooltip:{callbacks:{label:t=>this.model.isShowAds?` ${t.raw} ads`:` ${f.formatDurationInMilliseconds(t.raw)}`}}},elements:{arc:{borderColor:"#f4f4f4"}}},plugins:[a],data:this.getDataForChart()})}getDataForChart(){const e=F(["#ED3B3B","#F48E2F","#FAD61D","#40DA99","#4FE6E8","#5080E7","#854FE8"]);if(this.model.isShowAds){const a=this.model.summary.filter(t=>t.adCount>0);return{labels:a.map(t=>t.website),datasets:[{data:a.map(t=>t.adCount),backgroundColor:a.map((t,i)=>e(i)),hoverOffset:4}]}}else return{labels:this.model.summary.map(a=>a.website),datasets:[{data:this.model.summary.map(a=>a.duration),backgroundColor:this.model.summary.map((a,t)=>e(t)),hoverOffset:4}]}}}class ${async init(){await m.Settings.initAsync(),await m.BlockedGroupsRepository.init(),await m.WhitelistRepository.init();const e=new _;await e.loadData(),new W(e)}}const P=new $;D(document).ready(function(){m.Bugsnag.init("usage-summary"),P.init()});
//# sourceMappingURL=base.js.map