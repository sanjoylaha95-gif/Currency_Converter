const base_url="https://latest.currency-api.pages.dev/v1/currencies";

const btn=document.querySelector("form button");
const dropdowns=document.querySelectorAll(".dropdown select");
const fromCurr=document.querySelector(".from select");
const toCurr=document.querySelector(".to select");
const msg=document.querySelector("#res");
for(let select of dropdowns){
    for(currCode in countryList){
        let newOption=document.createElement("option");
        newOption.innerText=currCode;
        newOption.value=currCode;
        select.append(newOption);
    }
    select.addEventListener("change",(evt)=>{
        updateFlag(evt.target);
    })
}
const updateFlag=(element) =>{
    let currCode= element.value;
    let countryCode=countryList[currCode];
    let newSrc=`https://flagsapi.com/${countryCode}/flat/64.png`;
    let img=element.parentElement.querySelector("img");
    img.src=newSrc;
}
btn.addEventListener("click",async (evt) =>{
    evt.preventDefault();
    let amount=document.querySelector(".amount input");
    let amtVal=amount.value;
    if(amtVal==""||amtVal<1){
        amtVal=1;
        amount.value="1";
    }
    const URL=`${base_url}/${fromCurr.value.toLowerCase()}.json`;
    let response=await fetch(URL);
    let data= await response.json();
    let rate=data[fromCurr.value.toLowerCase()][toCurr.value.toLowerCase()];

    let finalAmt=amtVal*rate;
    msg.innerText=`${amtVal} ${fromCurr.value} = ${finalAmt} ${toCurr.value}`;
})