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
async fetchById(t){try{let o=await this.fetchWithTimeout(`${e}/${t}`,{timeout:6e3});// ok - shorthand for checking that the status is in the range 2xx (boolean)
if(!o.ok)throw Error(`Network response was not OK - HTTP error: ${o.status}`);let s=await o.json();return s}catch(e){console.error("There has been a problem with your fetch operation:",e.message)}}}const o=new t,s=document.querySelector(".pop-up-modal"),r=document.querySelector(".backdrop-modal"),i=document.querySelector("#allBooks"),a=document.querySelector(".category-books-list"),n=document.querySelector(".close-pop-up-modal-btn"),l=document.querySelector(".add-book-button"),c=document.querySelector(".storage-comment"),d=document.querySelector(".remove-button"),u="storage-book-data";let m={};async function h(e){try{m={};let t=await o.fetchById(e),s=await t.json();return m={book_image:s.book_image,title:s.title,author:s.author,description:s.description,marketAmazon:s.buy_links[0].url,marketAppleBooks:s.buy_links[1].url,list_name:s.list_name,id:s._id},s}catch(e){throw console.error("Error",e),e}}async function p(e){i.innerHTML="";try{let t=await h(e);return!function(e){let t=e.book_image,o=e.title,s=e.author,r=e.description,a=e.buy_links[0].url,n=e.buy_links[1].url,l=`<img src="${t}" alt="Book Image" class="image">
  <div class="info-modal">
  <h2 class="title">${o}</h2>
  <p class="author"> ${s}</p>
  <p class="description">${r}</p>
  <ul class="buy-links"> <li class="buy-links-item"><a href="${a}" target="_blank"
    > <img
     width="62"
    height="19"
    srcset="
    ./images/pop-up-modal/iconAmazon@x1.png 1x,
    ./images/pop-up-modal/iconAmazon@x2.png 2x
  "
   src="./images/pop-up-modal/iconAmazon@x1.png"
    alt="Amazon"
  /></a></li>
  <li class="buy-links-item"><a href="${n}" target="_blank"
    > <img
    width="33"
    height="32"
    srcset="
    ./images/pop-up-modal/iconAppleBooks@x1.png 1x,
    ./images/pop-up-modal/iconAppleBooks@x2.png 2x
  "
   src="./images/pop-up-modal/iconAppleBooks@x1.png"
    alt="AppleBooks"
  /></a></li>
</ul>
</div>`;i.innerHTML=l}(t),t}catch(e){throw console.error("Error",e),e}}function g(){s.classList.add("is-hidden"),r.classList.add("is-hidden")}a.addEventListener("click",function(e){if("UL"===e.target.nodeName||"DIV"===e.target.nodeName||"H2"===e.target.nodeName)return;let t=e.target.closest("li").id;s.classList.remove("is-hidden"),r.classList.remove("is-hidden"),p(t)}),document.addEventListener("keydown",e=>{"Escape"===e.key&&g()}),r.addEventListener("click",e=>{e.target===r&&g()}),n.addEventListener("click",g),l.addEventListener("click",function(){let e=JSON.parse(localStorage.getItem(u)),t=m;(e||0!==e.length)&&(l.style.display="block",d.style.display="none",e.push(t),localStorage.setItem(u,JSON.stringify(e)),l.style.display="none",d.style.display="block",c.textContent="Сongratulations! You have added the book to the shopping list. To delete, press the button “Remove from the shopping list”.")}),d.addEventListener("click",function(){c.textContent="";let e=m.id,t=JSON.parse(localStorage.getItem(u)),o=t.findIndex(t=>t.id===e);t.splice(o,1),localStorage.setItem(u,JSON.stringify(t)),l.style.display="block",d.style.display="none"});const k=new t,y=document.querySelector(".categories-list");async function b(e){if("LI"!==e.target.nodeName)return;let t=document.querySelector('.categories-list-item[selected="true"]');t&&t.removeAttribute("selected"),e.target.setAttribute("selected","true");let o=e.target.textContent;try{await k.fetchByCategory(o),console.log("Selected category:",o);// Here you can use the fetched books to update your page.
// For example: updateBookList(books);
}catch(e){console.error(e)}}y.addEventListener("click",b),async function(){try{let e=await k.fetchBooksCategoryList();if(e.length<1)return y.innerHTML="Sorry, we didn't find anything",[];let t=e.map(e=>`
      <li class="categories-list-item">${e.list_name}</li>
    `).join("");y.innerHTML=`<li class="categories-list-item" selected="true">All categories</li>${t}`,console.log("Categories loaded successfully.")}catch(e){return y.innerHTML=`Error: ${e.message}`,console.error(e),[]}}();const f=new t,_=document.querySelector(".best-sellers");// Feature to download the best books
async function w(){try{return await f.fetchTopBooks()}catch(e){console.error("Error downloading top books:",e)}}!async function(){let e=await w();!// Function to create a single gallery item
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
    </ul>`;_.insertAdjacentHTML("beforeend",t)}(e)}();const v=document.querySelector(".category-books-list__title"),T=document.querySelector(".category-books-list__list"),L=document.querySelector(".categories-list"),$=document.querySelector(".best-sellers");L.addEventListener("click",function(e){let t=e.target.textContent;if("All categories"===t){$.style.display="block",v.innerHTML="";return}let o=t.split(" ").join("%20"),s=`<span class="paintedWord">${t}</span>`;v.innerHTML="",v.insertAdjacentHTML("beforeend",s),function(e){fetch(`https://books-backend.p.goit.global/books/category?category=${e}`).then(e=>e.json()).then(e=>{!function(e){let t=e.map(e=>`
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
  `).join("");T.innerHTML=t}(e)}).catch(e=>console.error("Error fetching data:",e))}(o),$.style.display="none"});const S=document.querySelector(".down-btn"),B=document.querySelector(".up-btn"),A=document.querySelector(".charities__list");S.addEventListener("click",()=>{setTimeout(function(){A.scrollTo(0,1e3)},10),S.classList.add("is-hidden"),B.classList.remove("is-hidden")}),B.addEventListener("click",()=>{setTimeout(function(){A.scrollTo(top)},10),B.classList.add("is-hidden"),S.classList.remove("is-hidden")});const E=new t;E.fetchByCategory("Business Books").then(e=>{let t=e.map(e=>{let t={_id:e._id,title:e.title,author:e.author,book_image:e.book_image,description:e.description,category:e.list_name,publisher:e.publisher,price:e.price,marketAmazon:e.amazon_product_url,rank:e.rank};return t});return console.log("Business Books: ",t),t}),E.fetchByCategory("Audio Nonfiction").then(e=>{let t=e.map(e=>{let t={_id:e._id,title:e.title,author:e.author,book_image:e.book_image,description:e.description,category:e.list_name,publisher:e.publisher,price:e.price,marketAmazon:e.amazon_product_url,rank:e.rank};return t});return console.log("Audio Nonfiction: ",t),t}),E.fetchBooksCategoryList().then(e=>{let t=e.map(e=>e.list_name);console.log("Category List: ",t)}),E.fetchById("643282b1e85766588626a0b6").then(e=>{let t={_id:e._id,title:e.title,author:e.author,book_image:e.book_image,description:e.description,category:e.list_name,publisher:e.publisher,price:e.price,marketAmazon:e.amazon_product_url,rank:e.rank};return console.log("book by id: ",t),t}),E.fetchTopBooks().then(e=>{// const list = data.map((element) => element.list_name);
console.log("Top List: ",e)});//# sourceMappingURL=index.477ef422.js.map

//# sourceMappingURL=index.477ef422.js.map
