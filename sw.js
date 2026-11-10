// 更新したら VERSION を上げるとスマホ側のキャッシュが入れ替わります
var VERSION="bt-v1";
var FILES=["./","index.html","manifest.webmanifest","icon-192.png","icon-512.png","icon-180.png"];
self.addEventListener("install",function(e){e.waitUntil(caches.open(VERSION).then(function(c){return c.addAll(FILES)}));self.skipWaiting()});
self.addEventListener("activate",function(e){e.waitUntil(caches.keys().then(function(ks){return Promise.all(ks.filter(function(k){return k!==VERSION}).map(function(k){return caches.delete(k)}))}));self.clients.claim()});
self.addEventListener("fetch",function(e){
  if(e.request.method!=="GET")return;
  // ネット優先、オフライン時はキャッシュ
  e.respondWith(fetch(e.request).then(function(r){var c=r.clone();caches.open(VERSION).then(function(ch){ch.put(e.request,c)});return r}).catch(function(){return caches.match(e.request)}));
});
