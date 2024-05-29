const searchform=document.getElementById('search-form');
const searchinput=document.getElementById('search-input');
const searchresults=document.getElementById('search-results');
console.log(searchform);
console.log(searchinput);
console.log(searchresults);
const tehmetoggler=document.getElementById('theme-toggler');
const body=document.body;
async function search(query){
    const encodedQuery=encodeURIComponent(query);
    const endpoint=`https://en.wikipedia.org/w/api.php?action=query&list=search&prop=info&inprop=url&utf8=&format=json&origin=*&srlimit=10&srsearch=${encodedQuery}`
     const response=await fetch(endpoint);
     if(!response.ok){
        throw new Error('failed');

     }
     console.log(response);
     const json=await response.json();
     return json;
    }
     function display(results){
        searchresults.innerHTML='';
        results.forEach((result)=>{
            const url=`https://en.wikipedia.org/?curid=${result.pageid}`
            const titlelink= `<a href="${url}" target="_blank" rel="noopener"> ${result.title}</a>`
            const urllink=`<a href="${url}" target="_blank" rel="noopener"> ${url}</a>`
            const resultitm=document.createElement('div');
            resultitm.className='result-item'
            resultitm.innerHTML=`
            <h3 class="result-title"> ${titlelink}</h3>
            ${urllink}
            <p class="result-snippet">${result.snippet}</p>
            `;
            searchresults.appendChild(resultitm);
        });
     }

searchform.addEventListener('submit',async (e)=>{
    e.preventDefault();
    const query=searchinput.value.trim();
    if(!query){
        searchresults.innerHTML="<p> please enter a valid search term</p>"
        return;
    }
    searchresults.innerHTML="<div class='spinner'>Loading...........</div>"
    try{
        const results=await search(query)
        if(results.query.searchinfo.totalhits==0){
            searchresults.innerHTML="<p> no result found</p>"
        }else{
            display(results.query.search)
        }

    }
    catch (error){
        console.log(error);
        searchresults.innerHTML=`<p> an error please try agai  later </p>`

    }
    tehmetoggler.addEventListener("click",()=>{
        body.classList.toggle("dark-theme");
        if(body.classList.contains("dark-theme")){
            tehmetoggler.textContent="Dark";
            tehmetoggler.style.background="#fff";
            tehmetoggler.style.color="#333";
        }
        else{
            tehmetoggler.textContent="Light";
            tehmetoggler.style.border='2px solid #ccc';
            tehmetoggler.style.color='#333';
        }
    })

})
