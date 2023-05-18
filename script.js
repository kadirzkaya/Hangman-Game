const word=document.querySelector(".word");
const warning=document.querySelector(".warning");
const letters=document.querySelector(".letters");
const head=document.querySelector(".head");
const tall2=document.querySelector(".tall2");
const leftArm=document.querySelector(".leftArm");
const rightArm=document.querySelector(".rightArm");
const leftLeg=document.querySelector(".leftLeg");
const rightLeg=document.querySelector(".rightLeg");
const modal = document.getElementById("myModal");
const success = document.getElementById("myModalSuccess");
const play = document.querySelectorAll(".play");
let arr=[];
let counter=0;
let arrIndex=0;

// api url
const api_url = 
      "https://random-word-api.herokuapp.com/word";
  
// Defining async function
async function getapi(url) {
    
    // Storing response
    const response = await fetch(url);
    
    // Storing data in form of JSON
    var data = await response.json();
    getWord(data[0]);
}
// Calling that async function
getapi(api_url);

const  getWord=(w)=>{
    for(let i=0;i<w.length;i++){
        word.innerHTML+=`<span class="char"><span class="hide">${w[i].toUpperCase()}</span></span>`
    }
}



document.addEventListener("keypress",(e)=>{
    
    let isChar=true;
    const hide=document.querySelectorAll(".char .hide");
    if((/[a-zA-Z]/).test(e.key)){
        if(checkBeforeChar(arr,e.key)){
            arr[arrIndex]=e.key;
            arrIndex++;
            for(let i=0; i<hide.length;i++){
                if(hide[i].innerHTML==(e.key).toLocaleUpperCase()){
                    hide[i].classList.remove("hide");
                    isChar=false;
                }
            }
            
            if(hide.length==1){
                success.style.display = "block";
            }
            
            if(isChar){
                counter++;
                if(counter==1){
                    letters.innerHTML+=`<span class="fail">${(e.key).toLocaleUpperCase()}</span>`;
                }else{
                    letters.innerHTML+=`<span class="fail">, ${(e.key).toLocaleUpperCase()}</span>`;
                }
                switch (counter) {
                    case 1:
                        head.classList.remove("hide")
                        break;
                    case 2:
                        tall2.classList.remove("hide")
                        break;
                    case 3:
                        leftArm.classList.remove("hide")
                        break;
                    case 4:
                        rightArm.classList.remove("hide")
                        break;
                    case 5:
                        leftLeg.classList.remove("hide")
                        break;
                    case 6:
                        rightLeg.classList.remove("hide");
                        modal.style.display = "block";
                        break;
                    default:
                        modal.style.display = "block";
                        break;
                }
            }
        }
        else{
            arr[arrIndex]=e.key;
            arrIndex++;
            let html="<h4>You have already entered this letter. Please try another letter.</h4>"
            warningFunc(html);
        }
    }else {
        let html="<h4>Please enter a valid letter.</h4>"
        warningFunc(html);
    }
}
);


play.forEach(f=>{
    f.addEventListener("click",()=>{
        location.reload();
    })
})

const checkBeforeChar=(arr,chr)=>{
    if(arr.includes(chr)){
        return false
    }else{
        return true;
    }
}

const warningFunc=(html)=>{
    warning.className="warning show";
    warning.innerHTML=`${html}`;
    setTimeout(()=>{            
        warning.className="warning";
    },3000);
            
}