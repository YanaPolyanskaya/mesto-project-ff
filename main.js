(()=>{"use strict";function e(e){e.classList.add("popup_is-opened"),document.addEventListener("keydown",r)}function t(e){e.classList.remove("popup_is-opened"),document.removeEventListener("keydown",r)}function r(e){"Escape"===e.key&&t(document.querySelector(".popup_is-opened"))}function n(e){e.target.matches(".popup_is-opened, .popup__close")&&t(document.querySelector(".popup_is-opened"))}function o(e,t,r){var n=e.closest(r.formSelector).querySelector(".popup__input_type_error-".concat(e.name));e.classlist.add(r.inputErrorClass),n.textContent=t}function u(e,t){var r=e.closest(t.formSelector).querySelector(".popup__input_type_error-".concat(e.name));e.classlist.remove(t.inputErrorClass),r.textContent=""}function i(e,t){var r=e.querySelectorAll(t.inputSelector),n=e.querySelector(t.submitButtonSelector);r.forEach((function(e){return u(e,t)})),function(e,t,r){t.disabled=!0,t.classlist.add(r.inactiveButtonClass)}(0,n,t)}function c(e,t){(null==t||t>e.length)&&(t=e.length);for(var r=0,n=new Array(t);r<t;r++)n[r]=e[r];return n}var l={formSelector:".popup__form",inputSelector:".popup__input",inputErrorClass:"popup__input_type_error",submitButtonSelector:".popup__button",inactiveButtonClass:"popup__button_disabled",errorClass:"popup__error_visible"},a=null,p=document.querySelector(".places__list"),d=document.querySelector('.popup__form[name="edit-profile"]'),s=d.querySelector(".popup__input_type_name"),_=d.querySelector(".popup__input_type_description"),f=document.querySelector(".profile"),y=f.querySelector(".profile__title"),m=f.querySelector(".profile__description"),v=f.querySelector(".profile__edit-button"),S=f.querySelector(".profile__add-button");profileAvatarEditButton=f.querySelector(".profile_image");var q=document.querySelector('.popup__form[name="new-place"]'),b=(q.querySelector(".popup__input_type_card-name"),q.querySelector(".popup__input_type_url"),document.querySelectorAll(".popup")),E=document.querySelector(".popup_type_edit"),g=document.querySelector(".popup_type_new-card"),h=document.querySelector(".popup_type_image"),C=(h.querySelector(".popup__image"),h.querySelector(".popup__caption"),document.querySelector(".popup_type_edit_avatar")),k=C.querySelector(l.submitButtonSelector),L=(E.querySelector(l.submitButtonSelector),g.querySelector(l.submitButtonSelector),document.querySelector('.popup__form[name="avatar"]')),A=L.querySelector(".popup__input_type_url");function B(e,t){var r;(r=t._id,void r.target.closest(".card").remove()).then((function(){return deleteMyCard(e)})).catch((function(e){return console.error("Ошибка при добавлении карточки:",e)}))}Promise.all([getProfileInfo(),getInitialCards()]).then((function(e){var t,r,n=(r=2,function(e){if(Array.isArray(e))return e}(t=e)||function(e,t){var r=null==e?null:"undefined"!=typeof Symbol&&e[Symbol.iterator]||e["@@iterator"];if(null!=r){var n,o,u,i,c=[],l=!0,a=!1;try{if(u=(r=r.call(e)).next,0===t){if(Object(r)!==r)return;l=!1}else for(;!(l=(n=u.call(r)).done)&&(c.push(n.value),c.length!==t);l=!0);}catch(e){a=!0,o=e}finally{try{if(!l&&null!=r.return&&(i=r.return(),Object(i)!==i))return}finally{if(a)throw o}}return c}}(t,r)||function(e,t){if(e){if("string"==typeof e)return c(e,t);var r=Object.prototype.toString.call(e).slice(8,-1);return"Object"===r&&e.constructor&&(r=e.constructor.name),"Map"===r||"Set"===r?Array.from(e):"Arguments"===r||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(r)?c(e,t):void 0}}(t,r)||function(){throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}()),o=n[0],u=n[1];a=o._id,profileAvatarEditButton.style.backgroundImage="url(\\".concat(o.avatar,")"),y.textContent=o.name,m.textContent=o.about,u.forEach((function(e){var t,r,n,o,u,i,c,l,d;p.append((t=e,r=a,n=chandeLike,o=B,u=document.querySelector("#card-template").content.querySelector(".card").cloneNode(!0),i=u.querySelector(".card__image"),c=u.querySelector(".card__delete-button"),l=u.querySelector(".card__title"),d=u.querySelector(".card__like-button"),i.src=t.link,l.textContent=t.name,i.addEventListener("click",(function(){return r(t.link,t.name)})),c.addEventListener("click",o),d.addEventListener("click",n),u))}))})).catch((function(e){return console.error("Ошибка при получении данных пользователя",e)})),L.addEventListener("submit",(function(e){e.preventDefault();var r=k.textContent;k.textContent="Сохранение...",updateAvatar(A.value).then((function(e){profileAvatarEditButton.style.backgroundImage="url(\\".concat(e.avatar,")"),t(C)})).catch((function(e){return console.error("Ошибка при получении данных пользователя",e)})).finally((function(){return k.textContent=r})),i(L,l)})),d.addEventListener("submit",(function(e){e.preventDefault(),y.textContent=s.value,m.textContent=_.value,t(E)})),q.addEventListener("submit",handleCardFormSubmit),profileAvatarEditButton.addEventListener("click",(function(){return A.value=profileAvatarEditButton.style.backgroundImage.replace(/url\(["']?(.*?)["']?\)/,"$1"),void e(C)})),v.addEventListener("click",(function(){return s.value=y.textContent,profileAboutInput.value=m.textContent,void e(profileEditProfile)})),S.addEventListener("click",(function(){return e(g)})),b.forEach((function(e){e.addEventListener("mousedown",n)})),function(e){document.querySelectorAll(e.formSelector).forEach((function(t){return function(e,t){e.querySelector(t.sabmitButtonSelector),e.addEventListener("input",(function(e){var r=e.target,n=fotm.checkValidity();!function(e,t){e.validity.valueMissing?o(inpit,"Это обязательное поле",t):(e.validity.pattenMismath?e.setCustomValidity(e.dataset.error):e.setCustomValidity(""),e.validity.valid?u(e,t):o(e,e.validationMessge,t))}(r,t),toggleButton(n,submitButton,t)})),e.addEventListener("reset",(function(){return i(e,t)}))}(t,e)}))}(l),i(L,l),i(d,l),i(q,l)})();