function e(e){return e&&e.__esModule?e.default:e}var t=globalThis,o={},r={},i=t.parcelRequired7c6;function s(){try{let e=document.querySelector("body"),t=document.querySelector(".switch");"dark"===localStorage.getItem("theme")?(e.classList.add("dark"),t.classList.add("dark")):(e.classList.remove("dark"),t.classList.remove("dark"))}catch(e){console.error(e)}}null==i&&((i=function(e){if(e in o)return o[e].exports;if(e in r){var t=r[e];delete r[e];var i={id:e,exports:{}};return o[e]=i,t.call(i.exports,i,i.exports),i.exports}var s=Error("Cannot find module '"+e+"'");throw s.code="MODULE_NOT_FOUND",s}).register=function(e,t){r[e]=t},t.parcelRequired7c6=i),(0,i.register)("ifJdc",function(e,t){Object.defineProperty(e.exports,"register",{get:()=>o,set:e=>o=e,enumerable:!0,configurable:!0});var o,r=new Map;o=function(e,t){for(var o=0;o<t.length-1;o+=2)r.set(t[o],{baseUrl:e,path:t[o+1]})}}),i("ifJdc").register(new URL("",import.meta.url).toString(),JSON.parse('["19EGU","index.2da4dffb.js","3QVNn","iconAmazon@x1.85fa6e62.png","9QRoB","iconAmazon@x2.93c925d9.png","dN8tf","iconAppleBooks@x1.b94dca13.png","9uIyL","iconAppleBooks@x2.65551b4a.png"]')),document.querySelector(".switch").addEventListener("click",e=>{e.preventDefault(),"dark"===localStorage.getItem("theme")?localStorage.removeItem("theme"):localStorage.setItem("theme","dark"),s()}),s();// Constant URL value for API
const a="https://books-backend.p.goit.global/books/";class n{// Timeout a fetch() Request
async fetchWithTimeout(e,t){// console.log('resource: ', resource);
let{timeout:o=8e3}=t,r=new AbortController,i=setTimeout(()=>r.abort(),o),s=await fetch(e,{...t,signal:r.signal});// console.log('response: ', response);
return clearTimeout(i),s}/**
   * Category name to get a list of books in this category.
   * Will receive a collection of 20 books of a certain category
   *
   */async fetchByCategory(e){try{let t=await this.fetchWithTimeout(`${a}/category?category=${e}`,{timeout:6e3});// ok - shorthand for checking that the status is in the range 2xx (boolean)
if(!t.ok)throw Error(`Network response was not OK - HTTP error: ${t.status}`);let o=await t.json();return o}catch(e){console.error("There has been a problem with your fetch operation:",e.message)}}// returns a list of categories
async fetchBooksCategoryList(){try{let e=await this.fetchWithTimeout(`${a}/category-list`,{timeout:6e3});// ok - shorthand for checking that the status is in the range 2xx (boolean)
if(!e.ok)throw Error(`Network response was not OK - HTTP error: ${e.status}`);let t=await e.json();return t}catch(e){console.error("There has been a problem with your fetch operation:",e)}}// will receive the first 5 books from the collection in each category
async fetchTopBooks(){try{let e=await this.fetchWithTimeout(`${a}/top-books`,{timeout:6e3});// ok - shorthand for checking that the status is in the range 2xx (boolean)
if(!e.ok)throw Error(`Network response was not OK - HTTP error: ${e.status}`);let t=await e.json();return t}catch(e){console.error("There has been a problem with your fetch operation:",e)}}// will receive complete information about the book
async fetchById(e){try{let t=await this.fetchWithTimeout(`${a}${e}`,{timeout:6e3});// ok - shorthand for checking that the status is in the range 2xx (boolean)
if(!t.ok)throw Error(`Network response was not OK - HTTP error: ${t.status}`);let o=await t.json();return o}catch(e){console.error("There has been a problem with your fetch operation:",e.message)}}}const l=new n,c=document.querySelector(".categories-list");async function d(e){if("LI"!==e.target.nodeName)return;let t=document.querySelector('.categories-list-item[selected="true"]');t&&t.removeAttribute("selected"),e.target.setAttribute("selected","true");let o=e.target.textContent;try{await l.fetchByCategory(o),console.log("Selected category:",o);// Here you can use the fetched books to update your page.
// For example: updateBookList(books);
}catch(e){console.error(e)}}c.addEventListener("click",d),async function(){try{let e=await l.fetchBooksCategoryList();if(e.length<1)return c.innerHTML="Sorry, we didn't find anything",[];let t=e.map(e=>`
      <li class="categories-list-item">${e.list_name}</li>
    `).join("");c.innerHTML=`<li class="categories-list-item" selected="true">All categories</li>${t}`,console.log("Categories loaded successfully.")}catch(e){return c.innerHTML=`Error: ${e.message}`,console.error(e),[]}}();const u=new n,m=document.querySelector(".best-sellers");// Feature to download the best books
async function h(){try{return await u.fetchTopBooks()}catch(e){console.error("Error downloading top books:",e)}}!async function(){let e=await h();!// Function to create a single gallery item
function(e){let t=`
    <h1 class="title-book">
      Best Sellers <span class="title-book-span">Books</span>
    </h1> 
    <ul class="books-container"> 
      ${e.map(e=>`
          <li class="books-list"> 
            <h3 class="books-list-title">${e.list_name}</h3>
            <div class="books-card-container" data-list-id="${e.list_name}">
              ${e.books.map(e=>`
      <a href="#" class="books-item-link" aria-label="books-item-link" rel="noopener noreferrer" data-id='${e._id}'>
        <div class="books-card">
          <img
            src="${e.book_image}"
            alt="${e.title}"
            class="books-card-title-img"
            width="180"
            height="256"
            loading="lazy"
          />
          <div class="books-overlay">
            <p class="books-overlay-text">quick view</p>
          </div>
        </div> 
        <div class="books-descr">
          <h3 class="books-card-title">${e.title}</h3>
          <p class="books-card-author">${e.author}</p>
        </div>
      </a>`).join("")}
            </div>
          </li>`).join("")}
    </ul>`;m.insertAdjacentHTML("beforeend",t)}(e)}();const p=document.querySelector(".category-books-list__title"),g=document.querySelector(".category-books-list__list"),k=document.querySelector(".categories-list"),y=document.querySelector(".best-sellers");k.addEventListener("click",function(e){let t=e.target.textContent;if("All categories"===t){y.style.display="block",p.innerHTML="";return}let o=t.split(" ").join("%20"),r=`<span class="paintedWord">${t}</span>`;p.innerHTML="",p.insertAdjacentHTML("beforeend",r),function(e){fetch(`https://books-backend.p.goit.global/books/category?category=${e}`).then(e=>e.json()).then(e=>{!function(e){let t=e.map(e=>`
    <li data-id="${e._id}" class="category-books-list__item">
      <div class="card__container card">
        <div class="card__img-container">
          <img src="${e.book_image}" alt="${e.title}" class="card__img">
          <p class="img-hover">QUICK VIEW</p>
        </div>
        <div class="card__desc">
          <h3 class="card__heading">${e.title}</h3>
          <p class="card__author">${e.author}</p>
        </div>
      </div>
    </li>
  `).join("");g.innerHTML=t}(e)}).catch(e=>console.error("Error fetching data:",e))}(o),y.style.display="none"});const b=document.querySelector(".down-btn"),f=document.querySelector(".up-btn"),_=document.querySelector(".charities__list");b.addEventListener("click",()=>{setTimeout(function(){_.scrollTo(0,1e3)},10),b.classList.add("is-hidden"),f.classList.remove("is-hidden")}),f.addEventListener("click",()=>{setTimeout(function(){_.scrollTo(top)},10),f.classList.add("is-hidden"),b.classList.remove("is-hidden")});var v={};v=new URL("iconAmazon@x1.85fa6e62.png",import.meta.url).toString();var w={};w=new URL("iconAmazon@x2.93c925d9.png",import.meta.url).toString();var S={};S=new URL("iconAppleBooks@x1.b94dca13.png",import.meta.url).toString();var L={};L=new URL("iconAppleBooks@x2.65551b4a.png",import.meta.url).toString();const E=new n,$="storage-book-data";let T={};const A=document.querySelector(".pop-up-modal"),H=document.querySelector(".backdrop-modal"),z=document.querySelector("#allBooks"),B=document.querySelector(".category-books-list"),q=document.querySelector(".best-sellers"),x=document.querySelector(".close-pop-up-modal-btn"),I=document.querySelector(".add-book-button"),C=document.querySelector(".storage-comment"),N=document.querySelector(".remove-button");function R(){A.classList.remove("is-hidden"),H.classList.remove("is-hidden")}function j(){A.classList.add("is-hidden"),H.classList.add("is-hidden")}async function M(e){try{T={};let t=await E.fetchById(e);return console.log(t),T={book_image:t.book_image,title:t.title,author:t.author,description:t.description,marketAmazon:t.buy_links[0].url,marketAppleBooks:t.buy_links[1].url,list_name:t.list_name,id:t._id},t}catch(e){throw console.error("Error",e),e}}async function O(t){z.innerHTML="";try{let o=await M(t);!function(t){let o=t.buy_links[0].url,r=t.buy_links[1].url,i=`
      <img src="${t.book_image}" alt="Book Image" class="image">
      <div class="info-modal">
        <h2 class="title">${t.title}</h2>
        <p class="author">${t.author}</p>
        <p class="description">${t.description}</p>
        <ul class="buy-links">
          <li class="buy-links-item"><a href="${o}" target="_blank">
            <img
              width="62"
              height="19"
              srcset="${/*@__PURE__*/e(v)},
                      ${/*@__PURE__*/e(w)}"
              src="${/*@__PURE__*/e(v)}"
              alt="Amazon"/>
          </a></li>
          <li class="buy-links-item"><a href="${r}" target="_blank">
            <img
              width="33"
              height="32"
              srcset="${/*@__PURE__*/e(S)},
                      ${/*@__PURE__*/e(L)}"
              src="${/*@__PURE__*/e(S)}"
              alt="AppleBooks"/>
          </a></li>
        </ul>
      </div>`;z.innerHTML=i}(o)}catch(e){console.error("Error",e)}}document.addEventListener("DOMContentLoaded",O),B?B.addEventListener("click",function(e){if(["UL","DIV","H2"].includes(e.target.nodeName))return;let t=e.target.closest("li").getAttribute("data-id");R(),O(t)}):console.error("Element .category-books-list nie został znaleziony!"),q?q.addEventListener("click",function(e){if(["UL","DIV","H2"].includes(e.target.nodeName))return;let t=e.target.closest("a").getAttribute("data-id");R(),O(t)}):console.error("Element .best-sellers nie został znaleziony!"),H?H.addEventListener("click",e=>{e.target===H&&j()}):console.error("Element .backdrop-modal nie został znaleziony!"),x?x.addEventListener("click",j):console.error("Element .close-pop-up-modal-btn nie został znaleziony!"),I?I.addEventListener("click",function(){let e=JSON.parse(localStorage.getItem($))||[],t=T;e.push(t),localStorage.setItem($,JSON.stringify(e)),I.style.display="none",N.style.display="block",C.textContent="Congratulations! You have added the book to the shopping list. To delete, press the button “Remove from the shopping list”."}):console.error("Element .add-book-button nie został znaleziony!"),N?N.addEventListener("click",function(){let e=T.id,t=JSON.parse(localStorage.getItem($))||[],o=t.findIndex(t=>t.id===e);-1!==o&&(t.splice(o,1),localStorage.setItem($,JSON.stringify(t))),I.style.display="block",N.style.display="none",C.textContent=""}):console.error("Element .remove-button nie został znaleziony!"),document.addEventListener("keydown",e=>{"Escape"===e.key&&j()});const U=new n;U.fetchByCategory("Business Books").then(e=>{let t=e.map(e=>{let t={_id:e._id,title:e.title,author:e.author,book_image:e.book_image,description:e.description,category:e.list_name,publisher:e.publisher,price:e.price,marketAmazon:e.amazon_product_url,rank:e.rank};return t});return console.log("Business Books: ",t),t}),U.fetchByCategory("Audio Nonfiction").then(e=>{let t=e.map(e=>{let t={_id:e._id,title:e.title,author:e.author,book_image:e.book_image,description:e.description,category:e.list_name,publisher:e.publisher,price:e.price,marketAmazon:e.amazon_product_url,rank:e.rank};return t});return console.log("Audio Nonfiction: ",t),t}),U.fetchBooksCategoryList().then(e=>{let t=e.map(e=>e.list_name);console.log("Category List: ",t)}),U.fetchById("643282b1e85766588626a0b6").then(e=>{let t={_id:e._id,title:e.title,author:e.author,book_image:e.book_image,description:e.description,category:e.list_name,publisher:e.publisher,price:e.price,marketAmazon:e.amazon_product_url,rank:e.rank};return console.log("book by id: ",t),t}),U.fetchTopBooks().then(e=>{// const list = data.map((element) => element.list_name);
console.log("Top List: ",e)});//# sourceMappingURL=index.2da4dffb.js.map

//# sourceMappingURL=index.2da4dffb.js.map
