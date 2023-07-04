define([chrome.extension.getURL("/core/vendor/chart.umd.js"),chrome.extension.getURL("/core/vendor/chart-colors.js"),"core/Time","core/vendor/Brightline.min","core/vendor/text!components/UsageSummary/template.html"],(ChartJS,{defineChartColors},Time,Brightline,tpl)=>class{model;chart;constructor(model){this.model=model;model=new Brightline(tpl),document.body.innerHTML=model.render(),this.addEventListeners(),document.getElementById("date").valueAsDate=new Date,model=document.getElementById("chart");this.fillChart(model),this.fillAllowedList()}addEventListeners(){var labelForCheckbox=document.getElementById("adsLabel");const checkbox=document.getElementById("ads");labelForCheckbox.addEventListener("click",()=>{this.model.isShowAds=!checkbox.checked,this.chart.data=this.getDataForChart(),this.chart.update()}),document.getElementById("date").addEventListener("change",async event=>{await this.model.loadData(new Date(event.target.value)),this.chart.data=this.getDataForChart(),this.chart.update()});const blockList=document.getElementById("blockListTab"),allowedList=document.getElementById("allowedListTab"),blockTabBtn=document.getElementById("blockListBtn"),allowedTabBtn=(blockTabBtn.addEventListener("click",()=>{blockTabBtn.classList.add("tab-active"),allowedTabBtn.classList.remove("tab-active"),blockList.classList.remove("hidden"),allowedList.classList.add("hidden")}),document.getElementById("allowedListBtn"));allowedTabBtn.addEventListener("click",()=>{allowedTabBtn.classList.add("tab-active"),blockTabBtn.classList.remove("tab-active"),allowedList.classList.remove("hidden"),blockList.classList.add("hidden")})}fillAllowedList(){const block=document.getElementById("allowedList");this.model.allowList.forEach(element=>{var url,item=document.createElement("li"),link=document.createElement("a");link.href=(url=element).startsWith("http")?url:"https://"+url,link.innerText=element,link.target="_blank",link.classList.add("link","link-info","text-sm"),item.appendChild(link),block.appendChild(item)})}fillChart(canvas){this.chart=new ChartJS(canvas,{type:"doughnut",options:{responsive:!1,layout:{padding:16},plugins:{legend:{position:"right",labels:{usePointStyle:!0,pointStyle:"circle"}},tooltip:{callbacks:{label:context=>this.model.isShowAds?` ${context.raw} ads`:" "+Time.formatDurationInMilliseconds(context.raw)}}},elements:{arc:{borderColor:"#f4f4f4"}}},plugins:[{id:"emptyChart",afterDraw:function(chart){var ctx;chart.data.datasets[0].data.length<1&&((ctx=chart.ctx).textAlign="center",ctx.textBaseline="middle",ctx.font="30px Arial",ctx.fillText("No data to display",chart.width/2,chart.height/2),ctx.restore())}}],data:this.getDataForChart()})}getDataForChart(){const getSeriesColor=defineChartColors(["#ED3B3B","#F48E2F","#FAD61D","#40DA99","#4FE6E8","#5080E7","#854FE8"]);var modelForAds;return this.model.isShowAds?{labels:(modelForAds=this.model.summary.filter(item=>0<item.adCount)).map(item=>item.website),datasets:[{data:modelForAds.map(item=>item.adCount),backgroundColor:modelForAds.map((_,index)=>getSeriesColor(index)),hoverOffset:4}]}:{labels:this.model.summary.map(item=>item.website),datasets:[{data:this.model.summary.map(item=>item.duration),backgroundColor:this.model.summary.map((_,index)=>getSeriesColor(index)),hoverOffset:4}]}}});