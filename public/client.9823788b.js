document.addEventListener("DOMContentLoaded",()=>{let t=document.getElementById("note-form"),e=document.getElementById("note-id"),n=document.getElementById("note-title"),o=document.getElementById("note-content"),r=document.getElementById("notes-list"),i=document.getElementById("clear-btn"),a="/api/notes",l=async()=>{try{let t=await fetch(a);if(!t.ok)throw Error("Failed to fetch notes");let e=await t.json();s(e)}catch(t){console.error("Error fetching notes:",t),r.innerHTML="<li>Error loading notes. Please try again later.</li>"}n.focus()},d=async t=>{let e=t.id?"PUT":"POST",n=t.id?`${a}/${t.id}`:a;try{if(!(await fetch(n,{method:e,headers:{"Content-Type":"application/json"},body:JSON.stringify({title:t.title,content:t.content})})).ok)throw Error("Failed to save note");u(),l()}catch(t){console.error("Error saving note:",t)}},c=async t=>{try{if(!(await fetch(`${a}/${t}`,{method:"DELETE"})).ok)throw Error("Failed to delete note on the server.");l()}catch(t){console.error("Error deleting note:",t)}},s=t=>{if(r.innerHTML="",0===t.length){r.innerHTML="<li>No notes yet. Create one!</li>";return}t.forEach(t=>{let e=document.createElement("li");e.dataset.id=t.id,e.innerHTML=`
        <div class="note-content">
          <h3>${t.title}</h3>
          <p>${t.content}</p>
        </div>
        <div class="note-actions">
          <button class="btn btn-edit">Edit</button>
          <button class="btn btn-danger">Delete</button>
        </div>
      `,r.appendChild(e)})},u=()=>{e.value="",n.value="",o.value=""};t.addEventListener("submit",t=>{t.preventDefault(),d({id:e.value,title:n.value,content:o.value})}),r.addEventListener("click",t=>{let r=t.target.closest("li");if(!r)return;let i=r.dataset.id;t.target.classList.contains("btn-danger")?confirm("Are you sure you want to delete this note?")&&c(i):t.target.classList.contains("btn-edit")&&(t=>{e.value=t.id,n.value=t.title,o.value=t.content,n.focus()})({id:i,title:r.querySelector("h3").textContent,content:r.querySelector("p").textContent})}),i.addEventListener("click",u),l()});
//# sourceMappingURL=client.9823788b.js.map
