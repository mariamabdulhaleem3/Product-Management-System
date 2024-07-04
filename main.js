let title= document.getElementById('title');
let price= document.getElementById('price');
let tax= document.getElementById('tax');
let ads= document.getElementById('ads');
let discount= document.getElementById('discount');
let total= document.getElementById('total');
let count= document.getElementById('count');
let category= document.getElementById('category');
let create= document.getElementById('create');
let search= document.getElementById('search');
let byTitle= document.getElementById('byTitle');
let byCategory= document.getElementById('byCategory');
let body= document.getElementById('tbody');
let mood="create";
let searchMood= 'title';
let temp;

//Functions

//Get total 
function getTotal(){
    if(price.value != ''){
        let result= (Number(price.value) + Number(tax.value) + Number(ads.value)) - Number(discount.value);
        total.innerHTML= "Total:" + result;
        total.style.color="rgb(231, 10, 231)";
    }
    else{
        total.style.color="red";
        total.innerHTML="Total:";
    }
}

//Create 
let products;

if(localStorage.products != null){
    products= JSON.parse(localStorage.products);
}
else{
    products=[];
}

create.onclick = function(){
    let product = {
        title: title.value,
        price: price.value,
        tax: tax.value,
        ads:ads.value,
        discount: discount.value,
        count: count.value,
        category: category.value,
        total:total.innerHTML.slice(6)
    }
    if(title.value != '' && price.value != '' && count.value != '' && category.value != '' && product.count < 50){
        if(mood === "create"){
            if(count.value > 0){
                for(i=1;i<=parseInt(count.value);i++){
                    products.push(product);
                    localStorage.setItem("products", JSON.stringify(products));
                }
            }
        }else{
            products[temp]= product;
            count.style.display="block";
            create.value='create';
            mood='create';
            localStorage.products= JSON.stringify(products);
        }
        Clear();
    }

    Read();
}

//Clear inputs
function Clear(){
    title.value='';
    price.value='';
    tax.value='';
    ads.value='';
    discount.value='';
    total.innerHTML='Total:';
    total.style.color="red";
    title.value='';
    count.value='';
    category.value='';
}


//Read 
function Read(){
    let table='';
    for(let i=0;i<products.length;i++){
        table+= `
            <tr>
                <td>${products[i].title}</td>
                <td>${products[i].price}</td>
                <td>${products[i].tax}</td>
                <td>${products[i].ads}</td>
                <td>${products[i].discount}</td>
                <td>${products[i].total}</td>
                <td>${products[i].category}</td>
                <td><button onclick="Update(${i})">Update</button></td>
                <td><button onclick="Delete(${i})">Delete</button></td>
            </tr>
            `;
    }
    body.innerHTML= table;
}

Read()

//Delete

function Delete(index){
    products.splice(index,1);
    localStorage.products= JSON.stringify(products);
    Read();
}

//Update
function Update(index){
    temp=index;
    title.value= products[index].title;
    price.value= products[index].price;
    tax.value= products[index].tax;
    ads.value= products[index].ads;
    discount.value= products[index].discount;
    getTotal();
    count.value= products[index].count;
    category.value= products[index].category;
    count.style.display='none';
    create.value="Update";
    mood="Update";
}


//Search
byTitle.onclick = function(){
    searchMood = "title";
    search.focus();
}

byCategory.onclick = function(){
    searchMood = "category";
    search.focus();
 }

 function Search(value){
    let table= '';
    if(searchMood === 'title'){
        for(let i=0; i<products.length;i++){
            if(products[i].title.toLowerCase().includes(value)){
                table+= `
                <tr>
                    <td>${products[i].title}</td>
                    <td>${products[i].price}</td>
                    <td>${products[i].tax}</td>
                    <td>${products[i].ads}</td>
                    <td>${products[i].discount}</td>
                    <td>${products[i].total}</td>
                    <td>${products[i].category}</td>
                    <td><button onclick="Update(${i})">Update</button></td>
                    <td><button onclick="Delete(${i})">Delete</button></td>
                </tr>
                `;
            }
        }
    }
    else{
        for(let i=0; i<products.length;i++){
            if(products[i].category.toLowerCase().includes(value)){
                table+= `
                <tr>
                    <td>${products[i].title}</td>
                    <td>${products[i].price}</td>
                    <td>${products[i].tax}</td>
                    <td>${products[i].ads}</td>
                    <td>${products[i].discount}</td>
                    <td>${products[i].total}</td>
                    <td>${products[i].category}</td>
                    <td><button onclick="Update(${i})">Update</button></td>
                    <td><button onclick="Delete(${i})">Delete</button></td>
                </tr>
                `;
            }
        }
    }
    body.innerHTML= table;
}


