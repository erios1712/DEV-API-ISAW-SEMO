var count = 0;
function incrementar(){
    count++;
    console.log(count);
    if(count == 5){
        clearInterval(polling);
    }    
}
var polling = setInterval(incrementar, 1000);

