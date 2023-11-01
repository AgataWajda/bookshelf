const e=document.querySelector(".switch"),t=document.querySelector("body");function o(){let o="dark"===localStorage.getItem("theme");t.classList.toggle("dark",o),e.classList.toggle("checked",o)}e.addEventListener("click",e=>{e.preventDefault(),function(){let e="dark"===localStorage.getItem("theme");e?localStorage.removeItem("theme"):localStorage.setItem("theme","dark"),o()}()}),o();//# sourceMappingURL=index.887cc3fc.js.map

//# sourceMappingURL=index.887cc3fc.js.map
