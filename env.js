// 自吐环境代理
function get_environment(proxy_array) {
    for (let i = 0; i < proxy_array.length; i++) {
        handler = `{
            get: function(target, property, receiver) {
                // console.log('方法: get','   对象: ${proxy_array[i]}','   属性: ',property,'   属性类型: ',typeof property,'   属性值类型: ',typeof target[property]);
                return target[property];
            },
            set: function(target, property, value, receiver) {
                // console.log('方法: set','   对象: ${proxy_array[i]}','   属性: ',property,'   属性类型: ',typeof property,'   属性值类型: ',typeof target[property]);
                return Reflect.set(...arguments);
            }
        }`;

        eval(`
            try {
                ${proxy_array[i]};
                ${proxy_array[i]} = new Proxy(${proxy_array[i]}, ${handler});
            }catch(e){
                ${proxy_array[i]} = {};
                ${proxy_array[i]} = new Proxy(${proxy_array[i]}, ${handler});
            }
        `);
    }
}

/* 补环境  */
window = self = top = global
window.execScript = undefined
window.CollectGarbage =undefined
window.ActiveXObject = undefined //  坑！！！
window.msCrypto = undefined
window.globalStorage = undefined
window.attachEvent = undefined
window.showModalDialog = undefined
window.MSBlobBuilder = undefined
window.name = ""
window.indexedDB = {
    open: function (){},
    deleteDatabase:function (){}
}
window.innerHeight = 150
window.innerWidth = 1707
window.outerHeight = 1019
window.outerWidth = 1707
window.CanvasRenderingContext2D = function () {};
window.CanvasRenderingContext2D.prototype = {
    fillRect: function () {},
    clearRect: function () {},
    getImageData: function (x, y, w, h) {
        return { data: new Uint8ClampedArray(w * h * 4) };
    },
    putImageData: function () {},
    drawImage: function () {},
    getContextAttributes: function () { return {}; },
    canvas: null,
    fillStyle: '',
    strokeStyle: '',
    lineWidth: 1,
    globalCompositeOperation: 'source-over'
};
window.HTMLCanvasElement = function () {};
window.HTMLCanvasElement.prototype = {
    getContext: function (type) {
        if (type === '2d') {
            return new window.CanvasRenderingContext2D();
        }
        return null;
    },
    toDataURL: function () {
        return 'data:image/png;base64,';
    },
    toBlob: function () {},
    width: 0,
    height: 0,
    style: {}
};
window.DOMParser = function(){}
window.addEventListener = function (type, fn){
    // console.log("window.addEventListener===>", type)
    // if(type === "load"){
    //     fn()
    // }
}
window.setInterval = function(){}
window.setTimeout = function(){}

window.XMLHttpRequest = function XMLHttpRequest(){}
XMLHttpRequest.prototype.open = function (){}
XMLHttpRequest.prototype.send = function (){}
XMLHttpRequest.prototype.setRequestHeader = function (){}
XMLHttpRequest.prototype.getAllResponseHeaders = function (){}

localStorage = {
    getItem : function (a){
        // console.log("localStorage getItem:::", arguments)
        return a in this ? this[a] : null
    },
    removeItem : function (a){
        // console.log("localStorage removeItem:::", arguments)
        delete this[a]
    },
    setItem : function (a, b){
        // console.log("localStorage setItem:::", arguments)
        return this[a] = b
    }
}
sessionStorage = {
    getItem : function (a){
        // console.log("sessionStorage getItem:::", arguments)
        return a in this ? this[a] : null
    },
    removeItem : function (a){
        // console.log("sessionStorage removeItem:::", arguments)
        delete this[a]
    },
    setItem : function (a, b){
        // console.log("sessionStorage setItem:::", arguments)
        return this[a] = b
    }
}
window.localStorage = localStorage
window.sessionStorage = sessionStorage

_div = {
    style: {},
    getElementsByTagName: function (ele){
        // console.log("_div.getElementsByTagName===>", ele)
        if(ele === "i"){
            return []
        }
    },
}
_head = {
    removeChild: function (ele){
        // console.log("_head.removeChild===>", ele)
        var idx = this.children.indexOf(ele)
        if(idx !== -1){
            this.children.splice(idx, 1)
        }
        ele.parentElement = null;
    }
}
script_1 = {
    parentElement:_head,
    getAttribute: function(ele){
        // console.log("script_2.getAttribute===>", ele)
        if(ele === "r"){
            return "m"
        }
    },
}
script_2 = {
    parentElement:_head,
    getAttribute: function(ele){
        // console.log("script_2.getAttribute===>", ele)
        if(ele === "r"){
            return "m"
        }
    },
}
_head.children = [];
_head.children.push(script_1, script_2);
meta_2 = {
    parentNode:_head,
    parentElement: _head,
    content: "SgxV2NrWr._1UwyfQ2TuZGqqmCykrVvW8INr.a73KIfQ0IX.0ipOSxssrTcpEb5Evn2umvNhzwQF.Lmzd5iFGG",
    getAttribute: function (ele){
        // console.log("meta_2.getAttribute===>", ele)
        if(ele === "r"){
            return "m"
        }
    }
}
document = {
    cookie: "",
    documentElement : {},
    visibilityState: 'visible',
    createElement: function (ele){
        // console.log("document.createElement===>", ele)
        if(ele === "div"){
            return _div
        }
    },
    appendChild: function (ele){
        // console.log("document.appendChild===>", ele)
    },
    removeChild: function (ele){
        // console.log("document.removeChild===>", ele)
    },
    getElementsByTagName: function (ele){
        // console.log("document.getElementsByTagName===>", ele)
        if(ele === "script"){
            return [script_1, script_2]
        }else if(ele === "base"){
            return []
        }
    },
    getElementById: function (ele){
        // console.log("document.getElementById===>", ele)
        if(ele === "K5MK4FPPNWrv"){
            return meta_2
        }else if(ele === "a"){
            return []
        }
    },
    addEventListener: function (ele){
        // console.log("document.addEventListener===>", ele)
    }
}



location = {
    "ancestorOrigins": {},
    "assign": function (){},
    "href": "http://epub.cnipa.gov.cn/Index",
    "origin": "http://epub.cnipa.gov.cn",
    "protocol": "http:",
    "host": "epub.cnipa.gov.cn",
    "hostname": "epub.cnipa.gov.cn",
    "port": "",
    "pathname": "/Index",
    "search": "",
    "hash": ""
}
window.location = location
var History = function () {
    this.length = 1;
    this.scrollRestoration = 'auto';
    this.state = null;
};
History.prototype.replaceState = function () {};
History.prototype.pushState = function () {};
History.prototype.back = function () {};
var history = new History();
window.history = history

navigator = {
    webdriver: false,
    connection: {
        effectiveType: "4g",
        rtt: 100,
        downlink: 10,
        saveData: false,
        onchange: null
    },
    languages: ['zh-CN', 'zh'],
    language: 'zh-CN',
    platform: 'Win32',
    userAgent: "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/149.0.0.0 Safari/537.36",
    appVersion: "5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/149.0.0.0 Safari/537.36",
    appName: "Netscape",
    appCodeName: "Mozilla",
    product: "Gecko",
    productSub: "20030107",
    vendor: "Google Inc.",
    vendorSub: "",
    hardwareConcurrency: 16,
    maxTouchPoints: 0,
    cookieEnabled: true,
    doNotTrack: null,
    geolocation: {},
    mediaDevices: { enumerateDevices: function(){} },
    permissions: { query: function(){} },
    plugins: { length: 5, refresh: function(){} },
    mimeTypes: { length: 4 },
    webkitPersistentStorage: {},
    getBattery: function (){},
    getGamepads: function() { return []; },
    javaEnabled: function() { return false; },
    sendBeacon: function() { return true; },
    vibrate: function() { return false; },
}

// *******************************
// proxy_array = ['window', 'document', 'navigator', 'globalThis', 'global', 'screen', 'history', 'location', '_div', 'script_1', 'script_2', 'script_1.parentElement', 'script_2.parentElement', 'meta_2', 'meta_2.parentNode'];
// get_environment(proxy_array)















