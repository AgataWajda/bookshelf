function e(e){return e&&e.__esModule?e.default:e}var t=globalThis,i={},n={},o=t.parcelRequired7c6;null==o&&((o=function(e){if(e in i)return i[e].exports;if(e in n){var t=n[e];delete n[e];var o={id:e,exports:{}};return i[e]=o,t.call(o.exports,o,o.exports),o.exports}var r=Error("Cannot find module '"+e+"'");throw r.code="MODULE_NOT_FOUND",r}).register=function(e,t){n[e]=t},t.parcelRequired7c6=o);var r=o.register;r("ifJdc",function(e,t){Object.defineProperty(e.exports,"register",{get:()=>i,set:e=>i=e,enumerable:!0,configurable:!0});var i,n=new Map;i=function(e,t){for(var i=0;i<t.length-1;i+=2)n.set(t[i],{baseUrl:e,path:t[i+1]})}}),r("erv9X",function(e,t){e.exports=new URL("iconAmazon@x1.85fa6e62.png",import.meta.url).toString()}),r("bLbWr",function(e,t){e.exports=new URL("iconAppleBooks@x1.b94dca13.png",import.meta.url).toString()}),o("ifJdc").register(new URL("",import.meta.url).toString(),JSON.parse('["l5uYD","shopping-list.cf766f67.js","3QVNn","iconAmazon@x1.85fa6e62.png","dN8tf","iconAppleBooks@x1.b94dca13.png"]'));var a=o("erv9X"),s=o("bLbWr");document.addEventListener("DOMContentLoaded",()=>{let t=document.querySelector(".shopping-list-container"),i=document.querySelector(".empty"),n=document.querySelector(".navbar"),o=document.querySelector(".page-indicator"),r=document.querySelector(".page-input"),l=document.querySelector(".go-to-page-button"),c=JSON.parse(localStorage.getItem("storage-book-data"))||[],p=1,d=Math.ceil(c.length/3);function u(){o.textContent=`Page ${p} of ${d}`}function g(e){e<1||e>d||(p=e,f(),u())}function m(t){return`
      <li class="shopping-list-item" data-id="${t.id}">
        <img src="${t.book_image}" alt="${t.title}" class="shopping-list-item-image">
        <div class="shopping-list-item-info">
          <h3 class="shopping-list-item-title">${t.title}</h3>
          <p class="shopping-list-item-category">${t.list_name}</p>
          <p class="shopping-list-item-description">${t.description}</p>
          <p class="shopping-list-item-author">${t.author}</p>
          <ul class="buy-links">
      <li class="buy-links-item link-position">
            <a href="${t.marketAmazon}" target="_blank"><img src="${/*@__PURE__*/e(a)}" alt="Amazon"></a> </li>
            <li class="buy-links-item link-position">
            <a href="${t.marketAppleBooks}" target="_blank"><img src="${/*@__PURE__*/e(s)}" alt="AppleBooks"></a>
            </li>
          </div>
        </div>
        <div class="icon-trash icon-background">
          <svg width="20px" height="20px" fill="none" viewBox="0 0 16 16">
            <path d="M6 2H10M2 4H14M12.6667 4L12.1991 11.0129C12.129 12.065 12.0939 12.5911 11.8667 12.99C11.6666 13.3412 11.3648 13.6235 11.0011 13.7998C10.588 14 10.0607 14 9.00623 14H6.99377C5.93927 14 5.41202 14 4.99889 13.7998C4.63517 13.6235 4.33339 13.3412 4.13332 12.99C3.90607 12.5911 3.871 12.065 3.80086 11.0129L3.33333 4M6.66667 7V10.3333M9.33333 7V10.3333" stroke="white" stroke-linecap="round" stroke-linejoin="round"/>
          </svg>
          </div>
          </li>
        `}function f(){if(t){let e=(p-1)*3,i=e+3,n=c.slice(e,i),o=n.map(m).join("");t.innerHTML=o;// Add event listeners for newly created elements
let r=t.querySelectorAll(".icon-trash");r.forEach(e=>{e.addEventListener("click",()=>{let t=e.closest(".shopping-list-item").getAttribute("data-id");c=c.filter(e=>e.id!==t),localStorage.setItem("storage-book-data",JSON.stringify(c)),f()})})}else console.error("Element .shopping-list-container not found!")}document.querySelector(".first-page-button").addEventListener("click",()=>g(1)),document.querySelector(".previous-page-button").addEventListener("click",()=>g(p-1)),document.querySelector(".next-page-button").addEventListener("click",()=>g(p+1)),document.querySelector(".last-page-button").addEventListener("click",()=>g(d)),l.addEventListener("click",()=>g(Number(r.value))),c.length>0&&i&&i.classList.add("is-hidden"),f(),d>1?n.classList.remove("is-hidden"):n.classList.add("is-hidden"),u()});//# sourceMappingURL=shopping-list.cf766f67.js.map

//# sourceMappingURL=shopping-list.cf766f67.js.map
