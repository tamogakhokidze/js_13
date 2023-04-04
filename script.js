// promise with fetch

function api(){
    return new Promise((resolve, reject) => {

        fetch('https://reqres.in/api/users?page=2')//t=fetch then & catch block
        .then(
            response => response.json()
        )
        .then((mosuliInfo) => {

            resolve(mosuliInfo)
        })
        .catch((error) => {
            reject(error);
        });
    });
}
// promise then & catch block რა უნდა მოხდეს, რენდერის ლოგიკა იწერება აქ

api()
.then ((responseJs) => {
//რენდერის ლოგიკა
let p = document.createElement("p");
p.textContent = responseJs.data[3].email;
document.getElementById('api').appendChild(p);

})
.catch((reject) => console.log(reject))

//responseJs -ში ჩავარდება რეზოლვის შედეგი, მთლიანი მოსული ინფორმაცია ჯავასკრიპტის ფაილად. 




function getUserComments (commentId){
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            
        if (commentId < 100){
            resolve("resolved comment")
        }
        else{
            reject("rejected comment")
        }
    }, 1000);
});
}

getUserComments(50)
.then((ok) => console.log(ok))
.catch((notOk) => console.log(notOk));


function getUserPosts (postId){
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            
        if (postId < 100){
            resolve("resolved posts")
        }
        else{
            reject("rejected posts")
        }
    }, 1000);
});
}


getUserPosts(50)// პირველ then ბლოკში აბრუნებ პირობას, რომელსაც მეორე then ბლოკში უსმენ. 
.then((ok) => console.log(ok))
.catch((notOk) => console.log(notOk));



getUserComments(50)
.then((response) => {
    return getUserPosts(30);
})
.then((responseInfo) => console.log(responseInfo))// აქ გაქვს წვდომა როგორც პირველი, ისე მეორე ფუნქციის პასუხზე
.catch((error) => console.log(error));

// ამ სინტაქსით ჯერ შესრულდება კომენტების და შემდეგ პოსტების ფუნქცია.


//ერთმანეთის პარალელურად ორივე ფუნქციის გაშვება 

Promise.all ([
    getUserComments(50),
getUserPosts(30)

])
.then((responses) => {
    // responses[0]  getUserComments - resolved comment
    // responses[1] getUserPosts - resolved posts
    //ორივე ფუნქციის დარეზოლვებული შედეგი გამოდის ერთდროულად
    console.log(responses);
})
.catch((error) => console.log(error));// თუ ერთი მაინც რომელიმე დარეჯექდა, გადავა catch ბლოკში და გვეუბნება დარეჯექტებული ფუნქციის შედეგს, პოსტის ფუქციაა თუ კომენტების



//async await

function test1(){
    setTimeout(() => {
        console.log(test1);
    }, 3000);
}

function test2(){
    setTimeout(() => {
        console.log(test2);
    }, 2000);
}

async function test(){ // ასინქრონული ფუქნცია
    await test1() // await საშუალებით ელოდები როდის შესრულდება
    await test2();
   }

console.log('hello');// სინქრონული

//hello, test2, test1

//ფუნქციას უნდა გადასცე ან settimeout, რომ უთხრა როდის შესრულდეს, ან async await საშუალებით გამოიძახო როცა საჭიროა



function getUserComments (commentId){
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            
        if (commentId < 100){
            resolve("resolved comment")
        }
        else{
            reject("rejected comment")
        }
    }, 1000);
});
}


//---------------------async await ----------------


async function renderPage(){
let comments = await getUserComments(30);// async await დროს პირდაპირ ცვლადში შეგიძ₾ია რეზოლვდ შედეგის შენახვა 
console.log(comments);
}
renderPage();
// რეჯექცის პასუხი იწერება Try catch 



//---------------------try catch ----------------

async function renderPage(){
    try {
        let comments = await getUserComments(30);
        console.log(comments);
    }
    catch(error){
console.log(error, "შეცდომა");
    }
}
renderPage();
// ფუნქციები არ არის, მხოლოდ პარამეტრებს გადასცემ, ასინქრონულ კოდს ექცევი, ისე როგორც სინქრონულ კოდს. 


//-------------async await with fetch----------------

async function myAsyncFunction(){
let response = await fetch('https://reqres.in/api/users?page=2')// ცვლადში ინახავ  სერვერიდან მოსულ, მთლიან ჯეისონის ინფორმაციას. რაც პირველ then ბლოკში იყო და ვპარსავდით

console.log(response);

if (response.status !== 200){
throw new Error ('can not fetch data info')
}
let data = await response.json();
//console.log(data);
return data;
}
myAsyncFunction()

.then((responseData) => {
    let p = document.createElement("p");
p.textContent = responseData.data[3].email;
document.getElementById('api').appendChild(p);
console.log("მოსული ინფორმაცია =", responseData )
})
.catch((error) => console.log("შეცდომა = ", error));