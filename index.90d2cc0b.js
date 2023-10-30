// Constant URL value for API
const e="https://books-backend.p.goit.global/books/";class t{// Timeout a fetch() Request
async fetchWithTimeout(e,t){// console.log('resource: ', resource);
let{timeout:o=8e3}=t,s=new AbortController,r=setTimeout(()=>s.abort(),o),i=await fetch(e,{...t,signal:s.signal});// console.log('response: ', response);
return clearTimeout(r),i}/**
   * Category name to get a list of books in this category.
   * Will receive a collection of 20 books of a certain category
   *
   */async fetchByCategory(t){try{let o=await this.fetchWithTimeout(`${e}/category?category=${t}`,{timeout:6e3});// ok - shorthand for checking that the status is in the range 2xx (boolean)
if(!o.ok)throw Error(`Network response was not OK - HTTP error: ${o.status}`);let s=await o.json();return s}catch(e){console.error("There has been a problem with your fetch operation:",e.message)}}// returns a list of categories
async fetchBooksCategoryList(){try{let t=await this.fetchWithTimeout(`${e}/category-list`,{timeout:6e3});// ok - shorthand for checking that the status is in the range 2xx (boolean)
if(!t.ok)throw Error(`Network response was not OK - HTTP error: ${t.status}`);let o=await t.json();return o}catch(e){console.error("There has been a problem with your fetch operation:",e)}}// will receive the first 5 books from the collection in each category
async fetchTopBooks(){try{let t=await this.fetchWithTimeout(`${e}/top-books`,{timeout:6e3});// ok - shorthand for checking that the status is in the range 2xx (boolean)
if(!t.ok)throw Error(`Network response was not OK - HTTP error: ${t.status}`);let o=await t.json();return o}catch(e){console.error("There has been a problem with your fetch operation:",e)}}// will receive complete information about the book
async fetchById(t){try{let o=await this.fetchWithTimeout(`${e}${t}`,{timeout:6e3});// ok - shorthand for checking that the status is in the range 2xx (boolean)
if(!o.ok)throw Error(`Network response was not OK - HTTP error: ${o.status}`);let s=await o.json();return s}catch(e){console.error("There has been a problem with your fetch operation:",e.message)}}}const o=new t,s=document.querySelector(".categories-list");async function r(e){if("LI"!==e.target.nodeName)return;let t=document.querySelector('.categories-list-item[selected="true"]');t&&t.removeAttribute("selected"),e.target.setAttribute("selected","true");let s=e.target.textContent;try{await o.fetchByCategory(s),console.log("Selected category:",s);// Here you can use the fetched books to update your page.
// For example: updateBookList(books);
}catch(e){console.error(e)}}s.addEventListener("click",r),async function(){try{let e=await o.fetchBooksCategoryList();if(e.length<1)return s.innerHTML="Sorry, we didn't find anything",[];let t=e.map(e=>`
      <li class="categories-list-item">${e.list_name}</li>
    `).join("");s.innerHTML=`<li class="categories-list-item" selected="true">All categories</li>${t}`,console.log("Categories loaded successfully.")}catch(e){return s.innerHTML=`Error: ${e.message}`,console.error(e),[]}}();const i=new t,a=document.querySelector(".best-sellers");// Feature to download the best books
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
    </ul>`;a.insertAdjacentHTML("beforeend",t)}(e)}();const l=document.querySelector(".category-books-list__title"),c=document.querySelector(".category-books-list__list"),d=document.querySelector(".categories-list"),u=document.querySelector(".best-sellers");d.addEventListener("click",function(e){let t=e.target.textContent;if("All categories"===t){u.style.display="block",l.innerHTML="";return}let o=t.split(" ").join("%20"),s=`<span class="paintedWord">${t}</span>`;l.innerHTML="",l.insertAdjacentHTML("beforeend",s),function(e){fetch(`https://books-backend.p.goit.global/books/category?category=${e}`).then(e=>e.json()).then(e=>{!function(e){let t=e.map(e=>`
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
  `).join("");c.innerHTML=t}(e)}).catch(e=>console.error("Error fetching data:",e))}(o),u.style.display="none"});const m=document.querySelector(".down-btn"),p=document.querySelector(".up-btn"),h=document.querySelector(".charities__list");m.addEventListener("click",()=>{setTimeout(function(){h.scrollTo(0,1e3)},10),m.classList.add("is-hidden"),p.classList.remove("is-hidden")}),p.addEventListener("click",()=>{setTimeout(function(){h.scrollTo(top)},10),p.classList.add("is-hidden"),m.classList.remove("is-hidden")});const g=new t,k="storage-book-data";let y={};const b=document.querySelector(".pop-up-modal"),f=document.querySelector(".backdrop-modal"),_=document.querySelector("#allBooks"),w=document.querySelector(".category-books-list"),v=document.querySelector(".best-sellers"),L=document.querySelector(".close-pop-up-modal-btn"),T=document.querySelector(".add-book-button"),$=document.querySelector(".storage-comment"),z=document.querySelector(".remove-button");function S(){b.classList.add("is-hidden"),f.classList.add("is-hidden")}async function E(e){try{y={};let t=await g.fetchById(e);return console.log(t),y={book_image:t.book_image,title:t.title,author:t.author,description:t.description,marketAmazon:t.buy_links[0].url,marketAppleBooks:t.buy_links[1].url,list_name:t.list_name,id:t._id},t}catch(e){throw console.error("Error",e),e}}async function B(e){_.innerHTML="";try{let t=await E(e);!function(e){let t=e.buy_links[0].url,o=e.buy_links[1].url,s=`
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
      </div>`;_.innerHTML=s}(t)}catch(e){console.error("Error",e)}}function A(e){if(["UL","DIV","H2"].includes(e.target.nodeName))return;let t=e.target.closest("li").getAttribute("data-id");b.classList.remove("is-hidden"),f.classList.remove("is-hidden"),B(t)}document.addEventListener("DOMContentLoaded",B),w?w.addEventListener("click",A):console.error("Element .category-books-list nie został znaleziony!"),v?v.addEventListener("click",A):console.error("Element .best-sellers nie został znaleziony!"),f?f.addEventListener("click",e=>{e.target===f&&S()}):console.error("Element .backdrop-modal nie został znaleziony!"),L?L.addEventListener("click",S):console.error("Element .close-pop-up-modal-btn nie został znaleziony!"),T?T.addEventListener("click",function(){let e=JSON.parse(localStorage.getItem(k))||[],t=y;e.push(t),localStorage.setItem(k,JSON.stringify(e)),T.style.display="none",z.style.display="block",$.textContent="Congratulations! You have added the book to the shopping list. To delete, press the button “Remove from the shopping list”."}):console.error("Element .add-book-button nie został znaleziony!"),z?z.addEventListener("click",function(){let e=y.id,t=JSON.parse(localStorage.getItem(k))||[],o=t.findIndex(t=>t.id===e);-1!==o&&(t.splice(o,1),localStorage.setItem(k,JSON.stringify(t))),T.style.display="block",z.style.display="none",$.textContent=""}):console.error("Element .remove-button nie został znaleziony!"),document.addEventListener("keydown",e=>{"Escape"===e.key&&S()});const q=new t;q.fetchByCategory("Business Books").then(e=>{let t=e.map(e=>{let t={_id:e._id,title:e.title,author:e.author,book_image:e.book_image,description:e.description,category:e.list_name,publisher:e.publisher,price:e.price,marketAmazon:e.amazon_product_url,rank:e.rank};return t});return console.log("Business Books: ",t),t}),q.fetchByCategory("Audio Nonfiction").then(e=>{let t=e.map(e=>{let t={_id:e._id,title:e.title,author:e.author,book_image:e.book_image,description:e.description,category:e.list_name,publisher:e.publisher,price:e.price,marketAmazon:e.amazon_product_url,rank:e.rank};return t});return console.log("Audio Nonfiction: ",t),t}),q.fetchBooksCategoryList().then(e=>{let t=e.map(e=>e.list_name);console.log("Category List: ",t)}),q.fetchById("643282b1e85766588626a0b6").then(e=>{let t={_id:e._id,title:e.title,author:e.author,book_image:e.book_image,description:e.description,category:e.list_name,publisher:e.publisher,price:e.price,marketAmazon:e.amazon_product_url,rank:e.rank};return console.log("book by id: ",t),t}),q.fetchTopBooks().then(e=>{// const list = data.map((element) => element.list_name);
console.log("Top List: ",e)});//# sourceMappingURL=index.90d2cc0b.js.map

//# sourceMappingURL=index.90d2cc0b.js.map
