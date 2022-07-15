
let title = document.getElementById('title');
let price = document.getElementById('price');
let taxes = document.getElementById('taxes');
let ads = document.getElementById('ads');
let discount = document.getElementById('discount');
let total = document.getElementById('total');
let count = document.getElementById('count');
let category = document.getElementById('category');
let submit = document.getElementById('submit'); 
let prices = document.getElementsByClassName('prices')
let mood = 'create'
let tmp;
// Get Price 
function getTotal () {
    
    if (price.value != '') {
        let result = (+price.value + +taxes.value + +ads.value)
        - discount.value ;
        total.innerHTML = result;
        total.style.background= '#019b01'
    } else {
        total.innerHTML ='';
        total.style.background= '#da0000d4'
    }
};
//Create product
let dataPro;

if(localStorage.product != null) {
    dataPro = JSON.parse(localStorage.product)
} else{
    dataPro = [];
}

submit.onclick = function () {
    let newPro = {
        title:title.value.toLowerCase(),
        price:price.value,
        taxes:taxes.value,
        ads:ads.value,
        discount:discount.value,
        total:total.innerHTML,
        count:count.value,
        category:category.value.toLowerCase(),

    }
// Count 
if (title.value != '' 
&& price.value != '' 
&& category.value != ''
&& newPro.count < 100){
    if (mood === 'create'){
        if (newPro.count > 1) {
            for(let i = 0; i < newPro.count;i++){
                dataPro.push(newPro);

            }
        } else {
            dataPro.push(newPro);
        }
    } else {
        dataPro[tmp] = newPro;
        mood = 'create';
        submit.innerHTML = 'Create';
        count.style.display='block';
    } 
    clearData (); 
} else {
    alert('Plaese fill ... Title | Price | Category Frist !')
}
    // Save localstorge
    localStorage.setItem('product',JSON.stringify(dataPro));

    showData();
}



// Clear inputs
function clearData () {
    title.value='';
    price.value='';
    taxes.value='';
    ads.value='';
    discount.value='';
    total.innerHTML='';
    count.value='';
    category.value='';
}

// Read
function showData() {
    getTotal()
    let table = '';
    for(let i = 0; i < dataPro.length; i++) {
        table += `
        <tr>
        <td>${i+1}</td> 
        <td>${dataPro[i].title}</td> 
        <td>${dataPro[i].price}</td> 
        <td>${dataPro[i].taxes}</td> 
        <td>${dataPro[i].ads}</td> 
        <td>${dataPro[i].discount}</td> 
        <td>${dataPro[i].total}</td>  
        <td>${dataPro[i].category}</td> 
        <td>${dataPro[i].countw.length}</td>
        
        <td>
        <button onclick="updateData(${i})" id="update">Update</button>
        </td>
        <td>
        <button onclick="deleteData(  ${i}  )" id="delete">Delete</button>
        </td>
    </tr>
    `;
}////////////////////////////////////////////////////////////////////////////////

    document.getElementById('tbody').innerHTML = table;

    let btnDeleteAll = document.getElementById('deleteAll');
        if(dataPro.length > 0) {
            btnDeleteAll.innerHTML= 
            `<button onclick="deleteAll()"> Delete All ( ${dataPro.length} )</button>`
        } else {
            btnDeleteAll.innerHTML=''; 
        }
        
    }    
showData();
// Delete
function deleteData (i) {
    dataPro.splice(i,1);
    localStorage.product = JSON.stringify(dataPro);
    showData();

}
// Delete all
function deleteAll(){  
    var txt;
    if (confirm("Are You Sure Want Delete All!")) {
        localStorage.clear()
        dataPro.splice(0);
        showData();
        txt='Deleted!'
    }
}   

// let alarm = document.getElementById('deleteAll');

// alarm.addEventListener('click', (e) => {

//     // create main div
//     let main = document.createElement('div');
//     //Add Class name
//     main.className='mainAlert';
//     // Create Text content h5
//     let h5 = document.createElement('h5');
//     // Text node h5 
//     let textH5 =document.createTextNode('Are You Sure You Want Delete All!')
//     // Append
//     h5.appendChild(textH5);
//     // Create Span Yes
//     let yes = document.createElement('span');
//     // Append text To span
//     let textYes = document.createTextNode('Yes')
//         //Add Class name
//         textYes.className='yesAlert';
//     //append
//     yes.appendChild(textYes);
//     // Create Span No
//     let no = document.createElement('span');
//     // Append text To span
//     let textNo = document.createTextNode('No')
//             //Add Class name
//             textNo.className='noAlert';
//     //append
//     no.appendChild(textNo);
//     // Appinding All
//     main.appendChild(h5)
//     main.appendChild(yes)
//     main.appendChild(no)   
//     document.body.appendChild(main)
//})


// Update
function updateData (i) {
    title.value = dataPro[i].title;
    price.value = dataPro[i].price;
    taxes.value = dataPro[i].taxes;
    ads.value = dataPro[i].ads;
    discount.value = dataPro[i].discount;
    getTotal ();
    count.style.display='none';
    category.value = dataPro[i].category; 
    submit.innerHTML = 'Update';
    mood = 'update';
    tmp = i;
    scroll({
        top:0,
        behavior:'smooth',
    })
}
// Serach
let searchMood ='title';

function getSearch(id){

        let search = document.getElementById('search')

        if(id === 'searchTitle') {
            searchMood ='title';
        } else {
            searchMood ='caregory';
        }
        search.placeholder='Search by ' + searchMood
            search.focus();
            search.value='';
            showData()
        }

// Search By ....
    function searchData(value){
        let table ='';
        for(let i = 0; i < dataPro.length;i++){
        if(searchMood === 'title') {
                if(dataPro[i].title.includes(value.toLowerCase())) {
                    table += `
                    <tr>
                    <td>${i}</td> 
                    <td>${dataPro[i].title}</td>
                    <td>${dataPro[i].price}</td>
                    <td>${dataPro[i].taxes}</td> 
                    <td>${dataPro[i].ads}</td>
                    <td>${dataPro[i].discount}</td>
                    <td>${dataPro[i].total}</td> 
                    <td>${dataPro[i].category}</td>
                    <td>
                    <button onclick="updateData(${i})" id="update">Update</button>
                    </td>
                    <td>
                    <button onclick="deleteData(  ${i}  )" id="delete">Delete</button>
                    </td>
                </tr>`
                }
        } else {
                if(dataPro[i].category.includes(value)) { 
                    table += `
                    <tr>
                    <td>${i}</td> 
                    <td>${dataPro[i].title}</td>
                    <td>${dataPro[i].price}</td>
                    <td>${dataPro[i].taxes}</td>
                    <td>${dataPro[i].ads}</td>
                    <td>${dataPro[i].discount}</td>
                    <td>${dataPro[i].total}</td> 
                    <td>${dataPro[i].category}</td>
                    <td>
                    <button onclick="updateData(${i})" id="update">Update</button>
                    </td>
                    <td>
                    <button onclick="deleteData(  ${i}  )" id="delete">Delete</button>
                    </td>
                </tr>`
                }
        } 
    }
        document.getElementById('tbody').innerHTML = table;
    }
// Clean data
