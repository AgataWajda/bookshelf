function e(){try{let e=document.querySelector("body"),t=document.querySelector(".switch");"dark"===localStorage.getItem("theme")?(e.classList.add("dark"),t.classList.add("dark")):(e.classList.remove("dark"),t.classList.remove("dark"))}catch(e){console.error(e)}}document.querySelector(".switch").addEventListener("click",t=>{t.preventDefault(),"dark"===localStorage.getItem("theme")?localStorage.removeItem("theme"):localStorage.setItem("theme","dark"),e()}),e();// Constant URL value for API
const t="https://books-backend.p.goit.global/books/";class o{// Timeout a fetch() Request
async fetchWithTimeout(e,t){// console.log('resource: ', resource);
let{timeout:o=8e3}=t,r=new AbortController,s=setTimeout(()=>r.abort(),o),i=await fetch(e,{...t,signal:r.signal});// console.log('response: ', response);
return clearTimeout(s),i}/**
   * Category name to get a list of books in this category.
   * Will receive a collection of 20 books of a certain category
   *
   */async fetchByCategory(e){try{let o=await this.fetchWithTimeout(`${t}/category?category=${e}`,{timeout:6e3});// ok - shorthand for checking that the status is in the range 2xx (boolean)
if(!o.ok)throw Error(`Network response was not OK - HTTP error: ${o.status}`);let r=await o.json();return r}catch(e){console.error("There has been a problem with your fetch operation:",e.message)}}// returns a list of categories
async fetchBooksCategoryList(){try{let e=await this.fetchWithTimeout(`${t}/category-list`,{timeout:6e3});// ok - shorthand for checking that the status is in the range 2xx (boolean)
if(!e.ok)throw Error(`Network response was not OK - HTTP error: ${e.status}`);let o=await e.json();return o}catch(e){console.error("There has been a problem with your fetch operation:",e)}}// will receive the first 5 books from the collection in each category
async fetchTopBooks(){try{let e=await this.fetchWithTimeout(`${t}/top-books`,{timeout:6e3});// ok - shorthand for checking that the status is in the range 2xx (boolean)
if(!e.ok)throw Error(`Network response was not OK - HTTP error: ${e.status}`);let o=await e.json();return o}catch(e){console.error("There has been a problem with your fetch operation:",e)}}// will receive complete information about the book
async fetchById(e){try{let o=await this.fetchWithTimeout(`${t}${e}`,{timeout:6e3});// ok - shorthand for checking that the status is in the range 2xx (boolean)
if(!o.ok)throw Error(`Network response was not OK - HTTP error: ${o.status}`);let r=await o.json();return r}catch(e){console.error("There has been a problem with your fetch operation:",e.message)}}}const r=new o,s=document.querySelector(".categories-list");async function i(e){if("LI"!==e.target.nodeName)return;let t=document.querySelector('.categories-list-item[selected="true"]');t&&t.removeAttribute("selected"),e.target.setAttribute("selected","true");let o=e.target.textContent;try{await r.fetchByCategory(o),console.log("Selected category:",o);// Here you can use the fetched books to update your page.
// For example: updateBookList(books);
}catch(e){console.error(e)}}s.addEventListener("click",i),async function(){try{let e=await r.fetchBooksCategoryList();if(e.length<1)return s.innerHTML="Sorry, we didn't find anything",[];let t=e.map(e=>`
      <li class="categories-list-item">${e.list_name}</li>
    `).join("");s.innerHTML=`<li class="categories-list-item" selected="true">All categories</li>${t}`,console.log("Categories loaded successfully.")}catch(e){return s.innerHTML=`Error: ${e.message}`,console.error(e),[]}}();const a=new o,n=document.querySelector(".best-sellers");// Feature to download the best books
async function l(){try{return await a.fetchTopBooks()}catch(e){console.error("Error downloading top books:",e)}}!async function(){let e=await l();!// Function to create a single gallery item
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
    </ul>`;n.insertAdjacentHTML("beforeend",t)}(e)}();const c=document.querySelector(".category-books-list__title"),d=document.querySelector(".category-books-list__list"),u=document.querySelector(".categories-list"),m=document.querySelector(".best-sellers");u.addEventListener("click",function(e){let t=e.target.textContent;if("All categories"===t){m.style.display="block",c.innerHTML="";return}let o=t.split(" ").join("%20"),r=`<span class="paintedWord">${t}</span>`;c.innerHTML="",c.insertAdjacentHTML("beforeend",r),function(e){fetch(`https://books-backend.p.goit.global/books/category?category=${e}`).then(e=>e.json()).then(e=>{!function(e){let t=e.map(e=>`
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
  `).join("");d.innerHTML=t}(e)}).catch(e=>console.error("Error fetching data:",e))}(o),m.style.display="none"});const h=document.querySelector(".down-btn"),p=document.querySelector(".up-btn"),g=document.querySelector(".charities__list");h.addEventListener("click",()=>{setTimeout(function(){g.scrollTo(0,1e3)},10),h.classList.add("is-hidden"),p.classList.remove("is-hidden")}),p.addEventListener("click",()=>{setTimeout(function(){g.scrollTo(top)},10),p.classList.add("is-hidden"),h.classList.remove("is-hidden")});const k=new o,y="storage-book-data";let b={};const f=document.querySelector(".pop-up-modal"),_=document.querySelector(".backdrop-modal"),w=document.querySelector("#allBooks"),v=document.querySelector(".category-books-list"),L=document.querySelector(".best-sellers"),T=document.querySelector(".close-pop-up-modal-btn"),S=document.querySelector(".add-book-button"),$=document.querySelector(".storage-comment"),z=document.querySelector(".remove-button");function E(){f.classList.add("is-hidden"),_.classList.add("is-hidden")}async function B(e){try{b={};let t=await k.fetchById(e);return console.log(t),b={book_image:t.book_image,title:t.title,author:t.author,description:t.description,marketAmazon:t.buy_links[0].url,marketAppleBooks:t.buy_links[1].url,list_name:t.list_name,id:t._id},t}catch(e){throw console.error("Error",e),e}}async function q(e){w.innerHTML="";try{let t=await B(e);!function(e){let t=e.buy_links[0].url,o=e.buy_links[1].url,r=`
      <img src="${e.book_image}" alt="Book Image" class="image">
      <div class="info-modal">
        <h2 class="title">${e.title}</h2>
        <p class="author">${e.author}</p>
        <p class="description">${e.description}</p>
        <ul class="buy-links">
          <li class="buy-links-item"><a href="${t}" target="_blank">
            <img
              width="62"
              height="19"
              srcset="./images/pop-up-modal/iconAmazon@x1.png 1x,
                      ./images/pop-up-modal/iconAmazon@x2.png 2x"
              src="./images/pop-up-modal/iconAmazon@x1.png"
              alt="Amazon"/>
          </a></li>
          <li class="buy-links-item"><a href="${o}" target="_blank">
            <img
              width="33"
              height="32"
              srcset="./images/pop-up-modal/iconAppleBooks@x1.png 1x,
                      ./images/pop-up-modal/iconAppleBooks@x2.png 2x"
              src="./images/pop-up-modal/iconAppleBooks@x1.png"
              alt="AppleBooks"/>
          </a></li>
        </ul>
      </div>`;w.innerHTML=r}(t)}catch(e){console.error("Error",e)}}function A(e){if(["UL","DIV","H2"].includes(e.target.nodeName))return;let t=e.target.closest("li").getAttribute("data-id");f.classList.remove("is-hidden"),_.classList.remove("is-hidden"),q(t)}document.addEventListener("DOMContentLoaded",q),v?v.addEventListener("click",A):console.error("Element .category-books-list nie został znaleziony!"),L?L.addEventListener("click",A):console.error("Element .best-sellers nie został znaleziony!"),_?_.addEventListener("click",e=>{e.target===_&&E()}):console.error("Element .backdrop-modal nie został znaleziony!"),T?T.addEventListener("click",E):console.error("Element .close-pop-up-modal-btn nie został znaleziony!"),S?S.addEventListener("click",function(){let e=JSON.parse(localStorage.getItem(y))||[],t=b;e.push(t),localStorage.setItem(y,JSON.stringify(e)),S.style.display="none",z.style.display="block",$.textContent="Congratulations! You have added the book to the shopping list. To delete, press the button “Remove from the shopping list”."}):console.error("Element .add-book-button nie został znaleziony!"),z?z.addEventListener("click",function(){let e=b.id,t=JSON.parse(localStorage.getItem(y))||[],o=t.findIndex(t=>t.id===e);-1!==o&&(t.splice(o,1),localStorage.setItem(y,JSON.stringify(t))),S.style.display="block",z.style.display="none",$.textContent=""}):console.error("Element .remove-button nie został znaleziony!"),document.addEventListener("keydown",e=>{"Escape"===e.key&&E()});const C=new o;C.fetchByCategory("Business Books").then(e=>{let t=e.map(e=>{let t={_id:e._id,title:e.title,author:e.author,book_image:e.book_image,description:e.description,category:e.list_name,publisher:e.publisher,price:e.price,marketAmazon:e.amazon_product_url,rank:e.rank};return t});return console.log("Business Books: ",t),t}),C.fetchByCategory("Audio Nonfiction").then(e=>{let t=e.map(e=>{let t={_id:e._id,title:e.title,author:e.author,book_image:e.book_image,description:e.description,category:e.list_name,publisher:e.publisher,price:e.price,marketAmazon:e.amazon_product_url,rank:e.rank};return t});return console.log("Audio Nonfiction: ",t),t}),C.fetchBooksCategoryList().then(e=>{let t=e.map(e=>e.list_name);console.log("Category List: ",t)}),C.fetchById("643282b1e85766588626a0b6").then(e=>{let t={_id:e._id,title:e.title,author:e.author,book_image:e.book_image,description:e.description,category:e.list_name,publisher:e.publisher,price:e.price,marketAmazon:e.amazon_product_url,rank:e.rank};return console.log("book by id: ",t),t}),C.fetchTopBooks().then(e=>{// const list = data.map((element) => element.list_name);
console.log("Top List: ",e)});//# sourceMappingURL=index.39a40472.js.map

//# sourceMappingURL=index.39a40472.js.map
