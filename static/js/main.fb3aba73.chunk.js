(this.webpackJsonpt3=this.webpackJsonpt3||[]).push([[0],{214:function(e,t,a){e.exports=a(430)},219:function(e,t,a){},248:function(e,t){},430:function(e,t,a){"use strict";a.r(t);var n=a(1),r=a.n(n),l=a(42),i=a.n(l),c=(a(219),a(38)),o=a(180),s=a(167),u=a(168),m=a(179),h=a(181),g=a(169),E=a.n(g),v=a(25),f=a(460),d=a(452),S=a(456),k=a(459),p=a(461),b=a(454),C=a(457),y=a(458),O=a(455),T=a(427);T().format();Object(d.a)((function(e){return{root:{flexGrow:1},paper:{padding:e.spacing(2),textAlign:"center",color:e.palette.text.secondary},table:{minWidth:650}}}));var M=function(e){Object(h.a)(a,e);var t=Object(m.a)(a);function a(e){var n;return Object(s.a)(this,a),(n=t.call(this,e)).initSocket=function(){var e=E()("wss://le-18262636.bitzonte.com",{path:"/stocks"});e.on("connect",(function(){console.log("Connected")})),e.emit("EXCHANGES");var t=[];e.on("EXCHANGES",(function(e){console.log(e),Object.entries(e).map((function(e){var a=Object(o.a)(e,2),n=(a[0],a[1]);t.push(n)})),n.setState({EXCHANGES:t})})),e.emit("STOCKS"),e.on("STOCKS",(function(e){n.setState({STOCKS:e}),console.log(e);for(var t=0;t<e.length;t++){e[t].ticker;n.setState({nameEvent:{}})}}));var a=0;e.on("UPDATE",(function(e){var t={id:a++,ticker:e.ticker,value:e.value,time:T(e.time).format()};n.setState((function(e){return{events:[].concat(Object(c.a)(e.events),[t])}}))}));var r=0;e.on("BUY",(function(e){var t={id:r++,ticker:e.ticker,volume:e.volume,time:T(e.time).format()};n.setState((function(e){return{buys:[].concat(Object(c.a)(e.buys),[t])}}))}));var l=0;e.on("SELL",(function(e){var t={id:l++,ticker:e.ticker,volume:e.volume,time:T(e.time).format()};n.setState((function(e){return{sells:[].concat(Object(c.a)(e.sells),[t])}}))})),n.setState({socket:e})},n.state={socket:null,data:{},events:[],sells:[],buys:[],indicadoresStock:{}},n}return Object(u.a)(a,[{key:"componentWillMount",value:function(){this.initSocket()}},{key:"tablaIndicesMercado",value:function(e){if(e)return r.a.createElement(b.a,{component:O.a},r.a.createElement(S.a,{size:"small","aria-label":"a dense table"},r.a.createElement(C.a,null,r.a.createElement(y.a,null,r.a.createElement(p.a,null,"Mercados"),r.a.createElement(p.a,{align:"right"},"Volumen Compra\xa0($)"),r.a.createElement(p.a,{align:"right"},"Volumen Venta\xa0($)"),r.a.createElement(p.a,{align:"right"},"Volumen Total\xa0($)"),r.a.createElement(p.a,{align:"right"},"Cantidad Acciones\xa0"),r.a.createElement(p.a,{align:"right"},"Participaci\xf3n Mercado\xa0(%)"))),r.a.createElement(k.a,null,e.map((function(e){return r.a.createElement(y.a,{key:e.nameCortoMercado},r.a.createElement(p.a,{component:"th",scope:"row"},e.nameCortoMercado),r.a.createElement(p.a,{align:"right"},e.volCompra),r.a.createElement(p.a,{align:"right"},e.volVenta),r.a.createElement(p.a,{align:"right"},e.volTotal),r.a.createElement(p.a,{align:"right"},e.cantidadAcciones),r.a.createElement(p.a,{align:"right"},e.partMercado))})))))}},{key:"tablaIndicesStock",value:function(e){if(e)return r.a.createElement(b.a,{component:O.a},r.a.createElement(S.a,{size:"small","aria-label":"a dense table"},r.a.createElement(C.a,null,r.a.createElement(y.a,null,r.a.createElement(p.a,null,"Stocks"),r.a.createElement(p.a,{align:"right"},"Volumen Total Transado"),r.a.createElement(p.a,{align:"right"},"Alto Hist\xf3rico\xa0($)"),r.a.createElement(p.a,{align:"right"},"Bajo Hist\xf3rico\xa0($)"),r.a.createElement(p.a,{align:"right"},"\xdaltimo Precio\xa0($)"),r.a.createElement(p.a,{align:"right"},"Variaci\xf3n Porcentual\xa0(%)"))),r.a.createElement(k.a,null,e.map((function(e){return r.a.createElement(y.a,{key:e.nameStock},r.a.createElement(p.a,{component:"th",scope:"row"},e.nameStock),r.a.createElement(p.a,{align:"right"},e.totalTransado),r.a.createElement(p.a,{align:"right"},e.altoHistorico),r.a.createElement(p.a,{align:"right"},e.bajoHistorico),r.a.createElement(p.a,{align:"right"},e.ultimoPrecio),r.a.createElement(p.a,{align:"right"},e.varPorcentual))})))))}},{key:"mercadoIndices",value:function(){var e=[],t=0,a=0,n=0,r=0,l=0,i=null,c=null,o=[],s=[],u=[],m=[],h=[],g=0;if(this.state.EXCHANGES){for(var E=0;E<this.state.EXCHANGES.length;E++){if(t=0,a=0,n=0,r=0,l=0,i=this.state.EXCHANGES[E].name,c=this.state.EXCHANGES[E].exchange_ticker,o=this.state.EXCHANGES[E].listed_companies,this.state.STOCKS){s=this.state.STOCKS.filter((function(e){return o.includes(e.company_name)})),h=[];for(var v=0;v<s.length;v++)h.push(s[v].ticker);if(u=this.state.buys.filter((function(e){return h.includes(e.ticker)})),m=this.state.buys.filter((function(e){return h.includes(e.ticker)})),u.length>1)for(var f=0;f<u.length;f++)t+=u[f].volume;if(m.length>1)for(var d=0;d<m.length;d++)a+=m[d].volume;g+=n=t+a,r=h.length}e.push({nameCortoMercado:c,nameMercado:i,volCompra:t,volVenta:a,volTotal:n,cantidadAcciones:r,partMercado:l})}for(var S=0;S<e.length;S++)e[S].partMercado=Number(e[S].volTotal/g*100).toPrecision(4)}return e}},{key:"stockIndices",value:function(){var e=[],t=0,a=0,n=0,r=0,l=0,i=null,o=[],s=[],u=[];if(this.state.STOCKS)for(var m=0;m<this.state.STOCKS.length;m++){t=0,a=0,n=0,r=0,l=0,i=this.state.STOCKS[m].ticker,o=this.state.buys.filter((function(e){return e.ticker===i})),s=this.state.buys.filter((function(e){return e.ticker===i})),u=this.state.events.filter((function(e){return e.ticker===i}));for(var h=0;h<o.length;h++)t+=o[h].volume;for(var g=0;h<s.length;g++)t+=s[g].volume;u.length>1&&(a=Math.max.apply(Math,Object(c.a)(u.map((function(e){return e.value}))).concat([null])),n=Math.min.apply(Math,Object(c.a)(u.map((function(e){return e.value}))).concat([null])),r=u[u.length-1].value,u.length>2&&(l=Number((r-u[u.length-2].value)/u[u.length-2].value*100).toPrecision(2))),e.push({nameStock:i,totalTransado:t,altoHistorico:a,bajoHistorico:n,ultimoPrecio:r,varPorcentual:l})}return e}},{key:"render",value:function(){var e=this,t=[],a=this.stockIndices(),n=this.mercadoIndices();if(this.state.STOCKS)for(var l=0;l<this.state.STOCKS.length;l++)t.push(r.a.createElement(f.a,{item:!0,xs:3},r.a.createElement("div",null,r.a.createElement("h3",null,"Real Time ",this.state.STOCKS[l].ticker," "),r.a.createElement(v.c,{key:l,width:300,height:250,data:this.state.events.filter((function(t){return t.ticker===e.state.STOCKS[l].ticker}))},r.a.createElement(v.e,{dataKey:"time"}),r.a.createElement(v.f,null),r.a.createElement(v.b,{dataKey:"value"}),r.a.createElement(v.d,null),r.a.createElement(v.a,null)))));return r.a.createElement("div",null,r.a.createElement("h1",null,"Tarea 3"),r.a.createElement(f.a,{container:!0,spacing:10},t),r.a.createElement("ul",null,this.tablaIndicesStock(a)),r.a.createElement("ul",null,this.tablaIndicesMercado(n)))}}]),a}(r.a.Component);Boolean("localhost"===window.location.hostname||"[::1]"===window.location.hostname||window.location.hostname.match(/^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/));i.a.render(r.a.createElement(r.a.StrictMode,null,r.a.createElement(M,null)),document.getElementById("root")),"serviceWorker"in navigator&&navigator.serviceWorker.ready.then((function(e){e.unregister()})).catch((function(e){console.error(e.message)}))}},[[214,1,2]]]);
//# sourceMappingURL=main.fb3aba73.chunk.js.map