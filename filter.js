
let filterInput = document.getElementById('filter');
let resultUl = document.getElementById('result');
let listItems = [];//ვქმნით ცარიელ მასივს


function getUsers(){//სერვერიდან იუზერების ინფორმაციის წამოღება
    fetch('https://reqres.in/api/users?page=2', {
         method: 'GET',
    })
   .then((response) => response.json ())
.then((responseData) => {
    responseData.data.forEach(element => {
        let li = document.createElement ('li');
        li.innerText = `${element.first_name}, ${element.last_name}`;

        listItems.push(li); //მასივის ბოლოში თანმიმდევრულად ვყრით ელემენტებს
        resultUl.appendChild(li);
    });
})
.catch((error) => console.log(error));
}

getUsers();

//მონაცემების ფილტრის ფუნქცია 

function filterData(searchItem){
    listItems.forEach((item) => {
        console.log(item.classList);// li

        if(item.innerText.toLowerCase().includes(searchItem.toLowerCase())){

            item.classList.remove('hide')
        } 
        else{
            item.classList.add('hide')
        }
    })
};

filterInput.addEventListener('keyup', function(event){
    console.log('avto');
    
    //ფუნქციის გამოძახება და ივენთის დამატება
    filterData (event.target.value);// რა არის searchItem განსაზღვრა 
    // console.log(event.target);

})