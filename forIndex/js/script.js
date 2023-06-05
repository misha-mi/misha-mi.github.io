"use strict"

window.addEventListener("DOMContentLoaded", () => {


    const form = document.querySelector(".contact__form");
    const cookies = document.querySelector(".cookies")
    
    enableValidation(form);
    showCookies(cookies)

    function enableValidation(form) { // валидация формы
        const removeError = (arr) => {
            arr.map(item => item.classList.remove("contact_error"))
        }
    
        const checkInput = (arr) => {
            arr.map(item => {
                if(item.value === "") {
                    item.classList.add("contact_error");
                }
            })
        }
    
        form.addEventListener("submit", (e) => {
            e.preventDefault();
            const inputs = form.querySelectorAll(".contact__input");
    
            removeError([...inputs]);
            checkInput([...inputs]);
        })
    }

    function showCookies(block) {
        setTimeout(() => block.classList.add("cookies_show"), 1000);
        
        block.querySelector("button").addEventListener("click", () => block.classList.remove("cookies_show"))
    }
})