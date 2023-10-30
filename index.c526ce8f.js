// Constant URL value for API
const e="https://books-backend.p.goit.global/books/";class t{// Timeout a fetch() Request
async fetchWithTimeout(e,t){// console.log('resource: ', resource);
let{timeout:o=8e3}=t,r=new AbortController,s=setTimeout(()=>r.abort(),o),i=await fetch(e,{...t,signal:r.signal});// console.log('response: ', response);
return clearTimeout(s),i}/**
   * Category name to get a list of books in this category.
   * Will receive a collection of 20 books of a certain category
   *
   */async fetchByCategory(t){try{let o=await this.fetchWithTimeout(`${e}/category?category=${t}`,{timeout:6e3});// ok - shorthand for checking that the status is in the range 2xx (boolean)
if(!o.ok)throw Error(`Network response was not OK - HTTP error: ${o.status}`);let r=await o.json();return r}catch(e){console.error("There has been a problem with your fetch operation:",e.message)}}// returns a list of categories
async fetchBooksCategoryList(){try{let t=await this.fetchWithTimeout(`${e}/category-list`,{timeout:6e3});// ok - shorthand for checking that the status is in the range 2xx (boolean)
if(!t.ok)throw Error(`Network response was not OK - HTTP error: ${t.status}`);let o=await t.json();return o}catch(e){console.error("There has been a problem with your fetch operation:",e)}}// will receive the first 5 books from the collection in each category
async fetchTopBooks(){try{let t=await this.fetchWithTimeout(`${e}/top-books`,{timeout:6e3});// ok - shorthand for checking that the status is in the range 2xx (boolean)
if(!t.ok)throw Error(`Network response was not OK - HTTP error: ${t.status}`);let o=await t.json();return o}catch(e){console.error("There has been a problem with your fetch operation:",e)}}// will receive complete information about the book
async fetchById(t){try{let o=await this.fetchWithTimeout(`${e}/${t}`,{timeout:6e3});// ok - shorthand for checking that the status is in the range 2xx (boolean)
if(!o.ok)throw Error(`Network response was not OK - HTTP error: ${o.status}`);let r=await o.json();return r}catch(e){console.error("There has been a problem with your fetch operation:",e.message)}}}const o=new t,r="storage-book-data";let s={};document.addEventListener("DOMContentLoaded",()=>{let e=document.querySelector(".pop-up-modal"),t=document.querySelector(".backdrop-modal"),i=document.querySelector("#allBooks"),a=document.querySelector(".category-books-list"),n=document.querySelector(".close-pop-up-modal-btn"),l=document.querySelector(".add-book-button"),c=document.querySelector(".storage-comment"),d=document.querySelector(".remove-button");function u(){e.classList.add("is-hidden"),t.classList.add("is-hidden")}async function m(e){try{let t=await o.fetchById(e);return s={book_image:t.book_image,title:t.title,author:t.author,description:t.description,marketAmazon:t.buy_links[0].url,marketAppleBooks:t.buy_links[1].url,list_name:t.list_name,id:t._id},t}catch(e){throw console.error("Error",e),e}}async function p(e){i.innerHTML="";try{let t=await m(e);!function(e){let t=`
      <img src="${e.book_image}" alt="Book Image" class="image">
      <div class="info-modal">
        <h2 class="title">${e.title}</h2>
        <p class="author">${e.author}</p>
        <p class="description">${e.description}</p>
        <ul class="buy-links">
          <li class="buy-links-item"><a href="${e.marketAmazon}" target="_blank">
            <img
              width="62"
              height="19"
              srcset="./images/pop-up-modal/iconAmazon@x1.png 1x,
                      ./images/pop-up-modal/iconAmazon@x2.png 2x"
              src="./images/pop-up-modal/iconAmazon@x1.png"
              alt="Amazon"/>
          </a></li>
          <li class="buy-links-item"><a href="${e.marketAppleBooks}" target="_blank">
            <img
              width="33"
              height="32"
              srcset="./images/pop-up-modal/iconAppleBooks@x1.png 1x,
                      ./images/pop-up-modal/iconAppleBooks@x2.png 2x"
              src="./images/pop-up-modal/iconAppleBooks@x1.png"
              alt="AppleBooks"/>
          </a></li>
        </ul>
      </div>`;i.innerHTML=t}(t)}catch(e){console.error("Error",e)}}a?a.addEventListener("click",function(o){if(["UL","DIV","H2"].includes(o.target.nodeName))return;let r=o.target.closest("li").id;e.classList.remove("is-hidden"),t.classList.remove("is-hidden"),p(r)}):console.error("Element .category-books-list nie został znaleziony!"),t?t.addEventListener("click",e=>{e.target===t&&u()}):console.error("Element .backdrop-modal nie został znaleziony!"),n?n.addEventListener("click",u):console.error("Element .close-pop-up-modal-btn nie został znaleziony!"),l?l.addEventListener("click",function(){let e=JSON.parse(localStorage.getItem(r))||[],t=s;e.push(t),localStorage.setItem(r,JSON.stringify(e)),l.style.display="none",d.style.display="block",c.textContent="Congratulations! You have added the book to the shopping list. To delete, press the button “Remove from the shopping list”."}):console.error("Element .add-book-button nie został znaleziony!"),d?d.addEventListener("click",function(){let e=s.id,t=JSON.parse(localStorage.getItem(r))||[],o=t.findIndex(t=>t.id===e);-1!==o&&(t.splice(o,1),localStorage.setItem(r,JSON.stringify(t))),l.style.display="block",d.style.display="none",c.textContent=""}):console.error("Element .remove-button nie został znaleziony!"),document.addEventListener("keydown",e=>{"Escape"===e.key&&u()})});const i=new t,a=document.querySelector(".categories-list");async function n(e){if("LI"!==e.target.nodeName)return;let t=document.querySelector('.categories-list-item[selected="true"]');t&&t.removeAttribute("selected"),e.target.setAttribute("selected","true");let o=e.target.textContent;try{await i.fetchByCategory(o),console.log("Selected category:",o);// Here you can use the fetched books to update your page.
// For example: updateBookList(books);
}catch(e){console.error(e)}}a.addEventListener("click",n),async function(){try{let e=await i.fetchBooksCategoryList();if(e.length<1)return a.innerHTML="Sorry, we didn't find anything",[];let t=e.map(e=>`
      <li class="categories-list-item">${e.list_name}</li>
    `).join("");a.innerHTML=`<li class="categories-list-item" selected="true">All categories</li>${t}`,console.log("Categories loaded successfully.")}catch(e){return a.innerHTML=`Error: ${e.message}`,console.error(e),[]}}();const l=new t,c=document.querySelector(".best-sellers");// Feature to download the best books
async function d(){try{return await l.fetchTopBooks()}catch(e){console.error("Error downloading top books:",e)}}!async function(){let e=await d();!// Function to create a single gallery item
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
    </ul>`;c.insertAdjacentHTML("beforeend",t)}(e)}();const u=document.querySelector(".category-books-list__title"),m=document.querySelector(".category-books-list__list"),p=document.querySelector(".categories-list"),h=document.querySelector(".best-sellers");p.addEventListener("click",function(e){let t=e.target.textContent;if("All categories"===t){h.style.display="block",u.innerHTML="";return}let o=t.split(" ").join("%20"),r=`<span class="paintedWord">${t}</span>`;u.innerHTML="",u.insertAdjacentHTML("beforeend",r),function(e){fetch(`https://books-backend.p.goit.global/books/category?category=${e}`).then(e=>e.json()).then(e=>{!function(e){let t=e.map(e=>`
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
  `).join("");m.innerHTML=t}(e)}).catch(e=>console.error("Error fetching data:",e))}(o),h.style.display="none"});const g=document.querySelector(".down-btn"),k=document.querySelector(".up-btn"),y=document.querySelector(".charities__list");g.addEventListener("click",()=>{setTimeout(function(){y.scrollTo(0,1e3)},10),g.classList.add("is-hidden"),k.classList.remove("is-hidden")}),k.addEventListener("click",()=>{setTimeout(function(){y.scrollTo(top)},10),k.classList.add("is-hidden"),g.classList.remove("is-hidden")});const b=new t;b.fetchByCategory("Business Books").then(e=>{let t=e.map(e=>{let t={_id:e._id,title:e.title,author:e.author,book_image:e.book_image,description:e.description,category:e.list_name,publisher:e.publisher,price:e.price,marketAmazon:e.amazon_product_url,rank:e.rank};return t});return console.log("Business Books: ",t),t}),b.fetchByCategory("Audio Nonfiction").then(e=>{let t=e.map(e=>{let t={_id:e._id,title:e.title,author:e.author,book_image:e.book_image,description:e.description,category:e.list_name,publisher:e.publisher,price:e.price,marketAmazon:e.amazon_product_url,rank:e.rank};return t});return console.log("Audio Nonfiction: ",t),t}),b.fetchBooksCategoryList().then(e=>{let t=e.map(e=>e.list_name);console.log("Category List: ",t)}),b.fetchById("643282b1e85766588626a0b6").then(e=>{let t={_id:e._id,title:e.title,author:e.author,book_image:e.book_image,description:e.description,category:e.list_name,publisher:e.publisher,price:e.price,marketAmazon:e.amazon_product_url,rank:e.rank};return console.log("book by id: ",t),t}),b.fetchTopBooks().then(e=>{// const list = data.map((element) => element.list_name);
console.log("Top List: ",e)});//# sourceMappingURL=index.c526ce8f.js.map

//# sourceMappingURL=index.c526ce8f.js.map
