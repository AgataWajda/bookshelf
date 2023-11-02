function e(e){return e&&e.__esModule?e.default:e}var t=globalThis,n={},i={},o=t.parcelRequired7c6;null==o&&((o=function(e){if(e in n)return n[e].exports;if(e in i){var t=i[e];delete i[e];var o={id:e,exports:{}};return n[e]=o,t.call(o.exports,o,o.exports),o.exports}var r=Error("Cannot find module '"+e+"'");throw r.code="MODULE_NOT_FOUND",r}).register=function(e,t){i[e]=t},t.parcelRequired7c6=o);var r=o.register;r("ifJdc",function(e,t){Object.defineProperty(e.exports,"register",{get:()=>n,set:e=>n=e,enumerable:!0,configurable:!0});var n,i=new Map;n=function(e,t){for(var n=0;n<t.length-1;n+=2)i.set(t[n],{baseUrl:e,path:t[n+1]})}}),r("erv9X",function(e,t){e.exports=new URL("iconAmazon@x1.85fa6e62.png",import.meta.url).toString()}),r("bLbWr",function(e,t){e.exports=new URL("iconAppleBooks@x1.b94dca13.png",import.meta.url).toString()}),o("ifJdc").register(new URL("",import.meta.url).toString(),JSON.parse('["l5uYD","shopping-list.76201df6.js","3QVNn","iconAmazon@x1.85fa6e62.png","dN8tf","iconAppleBooks@x1.b94dca13.png"]'));// Import the icons from local assets
var a=o("erv9X"),s=o("bLbWr");document.addEventListener("DOMContentLoaded",()=>{// Query the document for elements needed
let t=document.querySelector(".shopping-list-container"),n=document.querySelector(".empty"),i=document.querySelector(".navbar"),o=document.querySelector(".page-input"),r=document.getElementById("prev-page-button"),l=document.getElementById("current-page-button"),c=document.getElementById("next-page-button"),p=JSON.parse(localStorage.getItem("storage-book-data"))||[],d=1,u=Math.ceil(p.length/3);// Update the page buttons to reflect the correct page numbers
function g(){let e=1===d?[1,2,3]:[d-1,d,d+1];r.textContent=e[0],l.textContent=e[1],c.textContent=e[2],r.disabled=1===d,c.disabled=d===u,// Remove active class from all buttons
document.querySelectorAll(".page-button").forEach(e=>{e.classList.remove("active")}),// Add active class to the current page button
l.classList.add("active")}// Navigate to a specific page of the shopping list
function m(e){e<1||e>u||(d=e,b(),g())}// Create a shopping list item (unchanged as requested)
function f(t){return`
      <li class="shopping-list-item" data-id="${t.id}">
        <img src="${t.book_image}" alt="${t.title}" class="shopping-list-item-image">
        <div class="shopping-list-item-info">
          <h3 class="shopping-list-item-title font-title">${t.title}</h3>
          <p class="shopping-list-item-category font-category">${t.list_name}</p>
          <p class="shopping-list-item-description font-description">${t.description}</p>
          <p class="shopping-list-item-author font-author">${t.author}</p>
          <ul class="buy-links">
            <li class="buy-links-item link-position">
              <a href="${t.marketAmazon}" target="_blank"><img src="${/*@__PURE__*/e(a)}" alt="Amazon"></a>
            </li>
            <li class="buy-links-item link-position">
              <a href="${t.marketAppleBooks}" target="_blank"><img src="${/*@__PURE__*/e(s)}" alt="AppleBooks"></a>
            </li>
          </ul>
        </div>
        <div class="icon-trash icon-background">
          <svg width="20px" height="20px" fill="none" viewBox="0 0 16 16">
            <path d="M6 2H10M2 4H14M12.6667 4L12.1991 11.0129C12.129 12.065 12.0939 12.5911 11.8667 12.99C11.6666 13.3412 11.3648 13.6235 11.0011 13.7998C10.588 14 10.0607 14 9.00623 14H6.99377C5.93927 14 5.41202 14 4.99889 13.7998C4.63517 13.6235 4.33339 13.3412 4.13332 12.99C3.90607 12.5911 3.871 12.065 3.80086 11.0129L3.33333 4M6.66667 7V10.3333M9.33333 7V10.3333" stroke="white" stroke-linecap="round" stroke-linejoin="round"/>
          </svg>
        </div>
      </li>
    `}// Render the shopping list items on the page
function b(){if(t){let e=(d-1)*3,n=e+3,i=p.slice(e,n),o=i.map(f).join("");t.innerHTML=o,// Add event listeners for the delete icons
t.querySelectorAll(".icon-trash").forEach(e=>{e.addEventListener("click",()=>{let t=e.closest(".shopping-list-item").getAttribute("data-id");p=p.filter(e=>e.id!==t),localStorage.setItem("storage-book-data",JSON.stringify(p)),b()})})}else console.error("Element .shopping-list-container not found!")}// Event listener for the page input to handle the "Enter" keypress
o.addEventListener("keypress",e=>{if("Enter"===e.key){let e=Number(o.value);e&&m(e)}}),// Event listeners for pagination
document.querySelector(".first-page-button").addEventListener("click",()=>m(1)),document.querySelector(".previous-page-button").addEventListener("click",()=>m(d-1)),document.querySelector(".next-page-button").addEventListener("click",()=>m(d+1)),document.querySelector(".last-page-button").addEventListener("click",()=>m(u)),p.length>0&&n.classList.add("is-hidden"),// Initial render of the shopping list and navigation elements
b(),i.classList.toggle("is-hidden",u<=1),g()});//# sourceMappingURL=shopping-list.76201df6.js.map

//# sourceMappingURL=shopping-list.76201df6.js.map
