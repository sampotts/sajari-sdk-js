module.exports=function(e){function t(i){if(n[i])return n[i].exports;var r=n[i]={exports:{},id:i,loaded:!1};return e[i].call(r.exports,r,r.exports,t),r.loaded=!0,r.exports}var n={};return t.m=e,t.c=n,t.p="/",t(0)}([function(e,t){"use strict";function n(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}function i(e,t){return{text:e,weight:t||1}}function r(e,t,n){return[e,{metric:{field:t,type:n}}]}function o(e,t){return[e,{count:{field:t}}]}function u(e,t){return{name:e,filter:t}}function s(e,t){return[e,{bucket:{buckets:t}}]}function l(e,t,n){return{field:{field:e,value:String(t),operator:n}}}function a(e,t){return{combinator:{filters:e,operator:t}}}function f(e,t){return{field:{field:e,value:t}}}function c(e){return{score:{threshold:e}}}function _(e,t){return{filter:{filter:e,value:t}}}function d(e,t){return{add:{field_boost:e,value:t}}}function E(e,t,n,i,r,o,u){return{geo:{field_lat:e,field_lng:t,lat:n,lng:i,radius:r,value:o,region:u}}}function O(e,t){return{point:e,value:t}}function h(e,t){return{interval:{field:e,points:t}}}function T(e,t,n,i,r){return{distance:{min:e,max:t,ref:n,field:i,value:r}}}function g(e,t){return{element:{field:e,elts:t}}}function I(e,t){return{text:{field:e,text:t}}}function v(e,t){return{field:e,order:t}}function k(e){return{identifier:e}}Object.defineProperty(t,"__esModule",{value:!0});var p=function(){function e(e,t){for(var n=0;n<t.length;n++){var i=t[n];i.enumerable=i.enumerable||!1,i.configurable=!0,"value"in i&&(i.writable=!0),Object.defineProperty(e,i.key,i)}}return function(t,n,i){return n&&e(t.prototype,n),i&&e(t,i),t}}();t.body=i,t.metricAggregate=r,t.countAggregate=o,t.bucket=u,t.bucketAggregate=s,t.fieldFilter=l,t.combinatorFilter=a,t.fieldInstanceBoost=f,t.scoreInstanceBoost=c,t.filterFieldBoost=_,t.additiveFieldBoost=d,t.geoFieldBoost=E,t.pointValue=O,t.intervalFieldBoost=h,t.distanceFieldBoost=T,t.elementFieldBoost=g,t.textFieldBoost=I,t.sort=v,t.transform=k;var N=(t.Api=function(){function e(t,i,r){n(this,e),this.p=t,this.c=i,this.a=r||"http://apid.sajari.com:9201/search/"}return p(e,[{key:"search",value:function(e,t){return fetch(this.a,{method:"POST",body:JSON.stringify({searchRequest:{searchRequest:e.q,tracking:{type:e.generate_tokens,field:e.token_key_field,sequence:e.s++,query_id:e.i}},project:this.p,collection:this.c})}).then(function(e){e.ok?e.json().then(function(e){for(var n=e.searchResponse.results,i=0;i<n.length;i++){for(var r in n[i].values)n[i].values[r]=n[i].values[r].single?n[i].values[r].single:n[i].values[r].multiple;e.tokens&&(n[i].tokens=e.tokens[i])}t(null,e)}):e.text().then(function(e){return t(e,null)})})["catch"](function(e){return t("Error during fetch: "+e.message,null)})}}]),e}(),t.METRIC_TYPE_MAX="MAX",t.METRIC_TYPE_MIN="MIN",t.METRIC_TYPE_AVG="AVG",t.METRIC_TYPE_SUM="SUM",t.FILTER_OP_EQ="EQUAL_TO",t.FILTER_OP_NOT_EQ="DOES_NOT_EQUAL",t.FILTER_OP_GT="GREATER_THAN",t.FILTER_OP_GT_EQ="GREATER_THAN_OR_EQUAL_TO",t.FILTER_OP_LT="LESS_THAN",t.FILTER_OP_LT_EQ="LESS_THAN_OR_EQUAL_TO",t.FILTER_OP_CONTAINS="CONTAINS",t.FILTER_OP_NOT_CONTAIN="DOES_NOT_CONTAIN",t.FILTER_OP_SUFFIX="HAS_SUFFIX",t.FILTER_OP_PREFIX="HAS_PREFX",t.COMB_FILTER_OP_ALL="ALL",t.COMB_FILTER_OP_ANY="ANY",t.COMB_FILTER_OP_ONE="ONE",t.COMB_FILTER_OP_NONE="NONE",t.GEO_FIELD_BOOST_REGION_INSIDE="INSIDE",t.GEO_FIELD_BOOST_REGION_OUTSIDE="OUTSIDE",t.SORT_ASCENDING="ASC",t.SORT_DESCENDING="DESC",function(){function e(){n(this,e),this.resetID(),this.q={page:1,results_per_page:10}}return p(e,[{key:"resetID",value:function(){this.i="",this.s=0;for(var e=0;e<16;e++)this.i+="abcdefghijklmnopqrstuvwxyz0123456789".charAt(Math.floor(36*Math.random()))}},{key:"resultsPerPage",value:function(e){this.q.results_per_page=e}},{key:"page",value:function(e){this.q.page=e}},{key:"body",value:function(e){this.q.body=e}},{key:"fields",value:function(e){this.q.fields=e}},{key:"filter",value:function(e){this.q.filter=e}},{key:"fieldBoosts",value:function(e){this.q.field_boosts=e}},{key:"instanceBoosts",value:function(e){this.q.instance_boosts=e}},{key:"aggregates",value:function(e){for(var t={},n=0;n<e.length;n++)t[e[n][0]]=e[n][1];this.q.aggregates=t}},{key:"sort",value:function(e){this.q.sort=e}},{key:"transforms",value:function(e){this.q.transforms=e}},{key:"tracking",value:function(e,t,n){this.type=e,this.field=t}},{key:"posNeg",value:function(e){this.generate_tokens="POS_NEG",this.token_key_field=e}},{key:"click",value:function(e){this.generate_tokens="CLICK",this.token_key_field=e}}]),e}());t.Query=N}]);