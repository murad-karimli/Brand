const name = document.getElementById("name");
const price = document.getElementById("price");
const cards_con = document.getElementById("cards-con");
const cards = document.getElementById("cards");
const close_item=document.getElementById("close-card")
const container = document.getElementById("productsContainer");
const loadMore = document.getElementById("loadMoreButton");
const input=document.getElementById("searchInput");

let objProducts={};

let skip = 0;
let limit = 12;

fetchProducts();

input.addEventListener("keypress",search)
async function search()
{
  container.innerHTML=""
  if(input.value!=="")
  {
  await fetch(`https://dummyjson.com/products/search?q=${input.value}`)
  .then(res => res.json())
  .then((data)=>{
    console.log(data)
    for (let product of data.products) {
      create(product);
  }
  });
  }
}
function fetchProducts() {
    loadMore.disabled = true;
    fetch(`https://dummyjson.com/products?skip=${skip}&limit=${limit}`)
        .then(res => res.json())
        .then(function (data) {
            const total = data.total;
            loadMore.disabled = false;

            if (skip + limit >= total) {
                loadMore.hidden = true;
            }

            for (let product of data.products) {
                create(product);
            }

        });
};

function createCardFunc()
{
    let cardHTML=`
    <div class="flex justify-between mt-6">
        <div class="flex">
          <img
            class="h-20 w-20 object-cover rounded"
            src="${thumbnail}"
            alt=""
          />
          <div class="mx-3">
            <h3 class="text-sm text-gray-600">${title}</h3>
            <div class="flex items-center mt-2">
              <button
                class="text-gray-500 focus:outline-none focus:text-gray-600"
              >
                <svg
                  class="h-5 w-5"
                  fill="none"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    d="M12 9v3m0 0v3m0-3h3m-3 0H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z"
                  ></path>
                </svg>
              </button>
              <span class="text-gray-700 mx-2">2</span>
              <button
                class="text-gray-500 focus:outline-none focus:text-gray-600"
              >
                <svg
                  class="h-5 w-5"
                  fill="none"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path d="M15 12H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                </svg>
              </button>
            </div>
          </div>
        </div>
        <span class="text-gray-600">${price}</span>
      </div>`
}

function create(product) {
    let HTML = `
    <div
              class="w-full max-w-sm mx-auto rounded-md shadow-md overflow-hidden"
            >
              <div
                class="flex items-end justify-end h-56 w-full bg-cover"
                style="background-image: url('${product.thumbnail}');"
              >
                <button
                 data-title=${product.title}
                 data-price=${product.price}
                 data-thumbnail=${product.thumbnail}
                  class="p-2 rounded-full bg-blue-600 text-white mx-5 -mb-4 hover:bg-blue-500 focus:outline-none focus:bg-blue-500"
                >
                  <svg
                    class="h-5 w-5 pointer-events-none"
                    fill="none"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"
                    ></path>
                  </svg>
                </button>
              </div>
              <div class="px-5 py-3">
                <h3 class="text-gray-700 uppercase " id="name">${product.title}</h3>
                <span class="text-gray-500 mt-2 " id="price">$${product.price}</span>
              </div>
            </div>
    `
    container.insertAdjacentHTML("beforeend", HTML);
}

loadMore.addEventListener("click", function () {
    skip += limit;
    fetchProducts();
})

container.addEventListener("click", function (event) {
    if (event.target.tagName === "BUTTON") {
        const { title, price, thumbnail } = event.target.dataset;
        
        objProducts[title].title=title; 
        objProducts[title].price=price; 
        objProducts[title].thumbnail=thumbnail; 
            
    }
})

cards.addEventListener("click", function () {
    cards_con.classList.replace("translate-x-full", 'translate-x-0');
});
close_item.addEventListener("click",function()
{
    cards_con.classList.replace("translate-x-0", 'translate-x-full');
})

