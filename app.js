const formWrapper = document.querySelector(".form-wrapper") ;
const form = document.querySelector("#form");
const searchInput = document.querySelector("#searchInput")
const buttonWrapper = document.querySelector(".button-wrapper")
const searchButton = document.querySelector("#searchButton")
const clearButton = document.querySelector("#clearButton")
const imageListWrapper = document.querySelector(".imagelist-wrapper")

runEventListener();

function runEventListener() {
    form.addEventListener("submit", search);
    clearButton.addEventListener("click", clear);
}

function clear(){
    searchInput.value="";
    Array.from(imageListWrapper.children).forEach((child)=>child.remove());
}


function search(e){
    e.preventDefault();
    const value = searchInput.value.trim();
    console.log(value)
    fetch(`https://api.unsplash.com/search/photos?query=${value}`,{
        methot: "GET",
        headers: {
            Authorization: "Client-ID d-jONM1feUKrL3ynCSs18aF6XtqIFyqOXcxFxzLWT2w"
        }
    })
    .then((res)=res.json())
    .then((data)=>{
        console.log(data)
        Array.from(data.results).forEach((image)=>{
            addImageToUI(image.urls.small)
        })
    })
    .catch((err)=> console.log(err))

}

function addImageToUI(url) {
    console.log(imageListWrapper)

    const div = document.createElement("div");
    div.className="card"

    const img = document.createElement("img")
    img.setAttribute("src",url)
    img.height='400';
    img.width='400';

    div.append(img);
    imageListWrapper.append(div);
    
}