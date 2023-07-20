
//isim bilgisi alma:

// let username=prompt("Lütfen isminizi giriniz:");
// let myName=document.querySelector("#myName");
// myName.innerHTML = ` ${username}`;

let username = prompt("İsminizi yazınız :");
let myName = document.querySelector("#myName");
let clock = document.querySelector("#myClock");

myName.innerHTML = ` ${username}`

let days = ["Pazar", "Pazartesi", "Salı", "Çarşamba", "Perşembe", "Cuma", "Cumartesi"]
let months = ["Ocak","Şubat","Mart","Nisan","Mayıs","Haziran","Temmuz","Ağustos","Eylül","Ekim","Kasım","Aralık"]

time = `${ new Date().getDate()}
 ${months[new Date().getMonth()]} ${days[new Date().getDay()]} günü
 saat
${ new Date().getHours()}:${new Date().getMinutes()}:${new Date().getSeconds()}'de
 `


clock.innerHTML = `${time}`