import{S as d,i}from"./assets/vendor-5ObWk2rO.js";(function(){const r=document.createElement("link").relList;if(r&&r.supports&&r.supports("modulepreload"))return;for(const e of document.querySelectorAll('link[rel="modulepreload"]'))s(e);new MutationObserver(e=>{for(const t of e)if(t.type==="childList")for(const o of t.addedNodes)o.tagName==="LINK"&&o.rel==="modulepreload"&&s(o)}).observe(document,{childList:!0,subtree:!0});function n(e){const t={};return e.integrity&&(t.integrity=e.integrity),e.referrerPolicy&&(t.referrerPolicy=e.referrerPolicy),e.crossOrigin==="use-credentials"?t.credentials="include":e.crossOrigin==="anonymous"?t.credentials="omit":t.credentials="same-origin",t}function s(e){if(e.ep)return;e.ep=!0;const t=n(e);fetch(e.href,t)}})();const f=new d(".gallery-item",{captionsData:"alt",captionDelay:250}),m=document.getElementById("search-form"),c=document.getElementById("gallery"),a=document.getElementById("loading-spinner");m.addEventListener("submit",async l=>{l.preventDefault();const r=document.getElementById("search-input").value.trim();if(!r){i.warning({title:"Uyarı",message:"Lütfen bir arama terimi girin!"});return}try{a.style.display="block";const s=await(await fetch(`https://pixabay.com/api/?key=46164011-db8308970fd829f53e85acb75&q=${r}&image_type=photo&orientation=horizontal&safesearch=true`)).json();if(s.hits.length===0){i.error({title:"Hata",message:"Görsel bulunamadı. Lütfen tekrar deneyin!"});return}c.innerHTML="",s.hits.forEach(e=>{const t=document.createElement("a");t.href=e.largeImageURL,t.classList.add("gallery-item"),t.innerHTML=`
      <li id="gallery-items">
        <img src="${e.webformatURL}" alt="${e.tags}" />
      </li>
        <div class="gallery-items-info">
          <p class="gallery-items-info-alt"><strong>Likes  </strong>${e.likes} </p>
          <p class="gallery-items-info-alt"><strong>Comments </strong> ${e.comments} </p>
          <p class="gallery-items-info-alt"><strong>Views</strong>  ${e.views} </p>
          <p class="gallery-items-info-alt"><strong>Downloads </strong> ${e.downloads} </p>
      `,c.appendChild(t)}),f.refresh()}catch(n){a.style.display="none",i.error({title:"Hata",message:"Bir sorun oluştu. Lütfen tekrar deneyin!"}),console.error("Bir hata oluştu:",n)}finally{a.style.display="none"}});
//# sourceMappingURL=index.js.map
