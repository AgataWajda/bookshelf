document.addEventListener("DOMContentLoaded",()=>{let t=document.querySelector(".shopping-list-container"),e=document.querySelector(".empty"),i=JSON.parse(localStorage.getItem("storage-book-data"))||[];function o(t){return`
      <li class="shopping-list-item" data-id="${t.id}">
        <img src="${t.book_image}" alt="${t.title}" class="shopping-list-item-image">
        <div class="shopping-list-item-info">
          <h3 class="shopping-list-item-title">${t.title}</h3>
          <p class="shopping-list-item-author">${t.author}</p>
        </div>
        <div class="icon-trash">
          <svg width="20px" height="20px" fill="black" viewBox="0 0 16 16">
            <path d="M6 2H10M2 4H14M12.6667 4L12.1991 11.0129C12.129 12.065 12.0939 12.5911 11.8667 12.99C11.6666 13.3412 11.3648 13.6235 11.0011 13.7998C10.588 14 10.0607 14 9.00623 14H6.99377C5.93927 14 5.41202 14 4.99889 13.7998C4.63517 13.6235 4.33339 13.3412 4.13332 12.99C3.90607 12.5911 3.871 12.065 3.80086 11.0129L3.33333 4M6.66667 7V10.3333M9.33333 7V10.3333" stroke="white" stroke-linecap="round" stroke-linejoin="round"/>
          </svg>
        </div>
      </li>
    `}i.length>0&&e&&e.classList.add("is-hidden"),!function e(){if(t){let s=i.map(o).join("");t.innerHTML=s;// Dodajemy nasłuchiwanie zdarzeń dla nowo utworzonych elementów
let l=t.querySelectorAll(".icon-trash");l.forEach(t=>{t.addEventListener("click",()=>{let o=t.closest(".shopping-list-item").getAttribute("data-id");i=i.filter(t=>t.id!==o),localStorage.setItem("storage-book-data",JSON.stringify(i)),e()})})}else console.error("Element .shopping-list-container nie został znaleziony!")}()});//# sourceMappingURL=shopping-list.0e52a64c.js.map

//# sourceMappingURL=shopping-list.0e52a64c.js.map
