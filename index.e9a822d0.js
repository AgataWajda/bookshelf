//import './dark-theme';
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
if(!o.ok)throw Error(`Network response was not OK - HTTP error: ${o.status}`);let r=await o.json();return r}catch(e){console.error("There has been a problem with your fetch operation:",e.message)}}}const o=new t,r=document.querySelector(".categories-list");async function s(e){if("LI"!==e.target.nodeName)return;let t=document.querySelector('.categories-list-item[selected="true"]');t&&t.removeAttribute("selected"),e.target.setAttribute("selected","true");let r=e.target.textContent;try{await o.fetchByCategory(r),console.log("Selected category:",r)}catch(e){console.error(e)}}r.addEventListener("click",s),async function(){try{let e=await o.fetchBooksCategoryList();if(e.length<1)return r.innerHTML="Sorry, we didn't find anything",[];let t=e.map(e=>`
      <li class="categories-list-item">${e.list_name}</li>
    `).join("");r.innerHTML=`<li class="categories-list-item" selected="true">All categories</li>${t}`,console.log("Categories loaded successfully.")}catch(e){return r.innerHTML=`Error: ${e.message}`,console.error(e),[]}}();const i=new t,a=document.querySelector(".best-sellers");// Feature to download the best books
async function n(){try{return await i.fetchTopBooks()}catch(e){console.error("Error downloading top books:",e)}}!async function(){let e=await n();!// Function to create a single gallery item
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
    </ul>`;a.insertAdjacentHTML("beforeend",t)}(e)}();const l=document.querySelector(".category-books-list__title"),c=document.querySelector(".category-books-list__list"),d=document.querySelector(".categories-list"),u=document.querySelector(".best-sellers");d.addEventListener("click",function(e){let t=e.target.textContent;if("All categories"===t){u.style.display="block",l.innerHTML="";return}let o=t.split(" ").join("%20"),r=`<span class="paintedWord">${t}</span>`;l.innerHTML="",l.insertAdjacentHTML("beforeend",r),function(e){fetch(`https://books-backend.p.goit.global/books/category?category=${e}`).then(e=>e.json()).then(e=>{!function(e){let t=e.map(e=>`
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
  `).join("");c.innerHTML=t}(e)}).catch(e=>console.error("Error fetching data:",e))}(o),u.style.display="none"});const h=document.querySelector(".down-btn"),m=document.querySelector(".up-btn"),p=document.querySelector(".charities__list");h.addEventListener("click",()=>{setTimeout(function(){p.scrollTo(0,1e3)},10),h.classList.add("is-hidden"),m.classList.remove("is-hidden")}),m.addEventListener("click",()=>{setTimeout(function(){p.scrollTo(top)},10),m.classList.add("is-hidden"),h.classList.remove("is-hidden")});const y=new t,k="storage-book-data";let g={};const b=document.querySelector(".pop-up-modal"),f=document.querySelector(".backdrop-modal"),_=document.querySelector("#allBooks"),w=document.querySelector(".category-books-list"),v=document.querySelector(".best-sellers"),T=document.querySelector(".close-pop-up-modal-btn"),L=document.querySelector(".add-book-button"),$=document.querySelector(".storage-comment"),S=document.querySelector(".remove-button");function E(){b.classList.remove("is-hidden"),f.classList.remove("is-hidden")}function B(){b.classList.add("is-hidden"),f.classList.add("is-hidden")}async function q(e){try{g={};let t=await y.fetchById(e);if(!t)throw Error("Book not found");return g={book_image:t.book_image,title:t.title,author:t.author,description:t.description,marketAmazon:t.buy_links[0].url,marketAppleBooks:t.buy_links[1].url,list_name:t.list_name,id:t._id}}catch(e){throw console.error("Error",e),e}}async function A(e){_.innerHTML="";try{let t=await q(e);!function(e){let t=`
    <img src="${e.book_image}" alt="Book Image" class="image">
    <div class="info-modal">
      <h2 class="title">${e.title}</h2>
      <p class="author">${e.author}</p>
      <p class="description">${e.description}</p>
      <ul class="buy-links">
        <li class="buy-links-item"><a href="${e.marketAmazon}" target="_blank">Amazon</a></li>
        <li class="buy-links-item"><a href="${e.marketAppleBooks}" target="_blank">AppleBooks</a></li>
      </ul>
    </div>`;_.innerHTML=t}(t);let o=localStorage.getItem(k),r=JSON.parse(o)||[],s=r.find(t=>t.id===e);s?(L.style.display="none",S.style.display="block"):(L.style.display="block",S.style.display="none")}catch(e){console.error("Error",e),_.innerHTML="<p>Sorry, we couldn't find that book. Please try again later.</p>"}}w?w.addEventListener("click",e=>{if(["UL","DIV","H2"].includes(e.target.nodeName))return;let t=e.target.closest("li").getAttribute("data-id");E(),A(t)}):console.error("Element .category-books-list nie został znaleziony!"),v?v.addEventListener("click",e=>{if(["UL","DIV","H2"].includes(e.target.nodeName))return;let t=e.target.closest("a").getAttribute("data-id");E(),A(t)}):console.error("Element .best-sellers nie został znaleziony!"),T.addEventListener("click",B),L.addEventListener("click",function(){let e=JSON.parse(localStorage.getItem(k))||[],t=g;e.push(t),localStorage.setItem(k,JSON.stringify(e)),L.style.display="none",S.style.display="block",$.textContent="Congratulations! You have added the book to the shopping list. To delete, press the button “Remove from the shopping list”."}),S.addEventListener("click",function(){let e=g.id,t=JSON.parse(localStorage.getItem(k))||[],o=t.findIndex(t=>t.id===e);-1!==o&&(t.splice(o,1),localStorage.setItem(k,JSON.stringify(t))),L.style.display="block",S.style.display="none",$.textContent="";let r=new CustomEvent("removeBookFromList",{detail:{bookId:e}});document.dispatchEvent(r)}),f.addEventListener("click",e=>{e.currentTarget===e.target&&B()}),window.addEventListener("keydown",e=>{"Escape"===e.code&&B()});const C=new t;C.fetchByCategory("Business Books").then(e=>{let t=e.map(e=>{let t={_id:e._id,title:e.title,author:e.author,book_image:e.book_image,description:e.description,category:e.list_name,publisher:e.publisher,price:e.price,marketAmazon:e.amazon_product_url,rank:e.rank};return t});return console.log("Business Books: ",t),t}),C.fetchByCategory("Audio Nonfiction").then(e=>{let t=e.map(e=>{let t={_id:e._id,title:e.title,author:e.author,book_image:e.book_image,description:e.description,category:e.list_name,publisher:e.publisher,price:e.price,marketAmazon:e.amazon_product_url,rank:e.rank};return t});return console.log("Audio Nonfiction: ",t),t}),C.fetchBooksCategoryList().then(e=>{let t=e.map(e=>e.list_name);console.log("Category List: ",t)}),C.fetchById("643282b1e85766588626a0b6").then(e=>{let t={_id:e._id,title:e.title,author:e.author,book_image:e.book_image,description:e.description,category:e.list_name,publisher:e.publisher,price:e.price,marketAmazon:e.amazon_product_url,rank:e.rank};return console.log("book by id: ",t),t}),C.fetchTopBooks().then(e=>{// const list = data.map((element) => element.list_name);
console.log("Top List: ",e)});//# sourceMappingURL=index.e9a822d0.js.map

//# sourceMappingURL=index.e9a822d0.js.map
