window.onload=function(){
    //verificare parola
    if(document.getElementsByName("parola")){
        document.getElementsByName("parola")[0].onchange=function(){
            var pass=this.value;
            const isValidLength = /^.{10,16}$/;
            if (!isValidLength.test(pass)) {
                alert("Parola gresita - trebuie sa contina intre 10 si 16 caractere");
            }
            else{
                console.log("corect");
            }
        }
    }
    //verificare email
    if(document.getElementsByName("email")){
        document.getElementsByName("email")[0].onchange=function(){
            var mail=this.value;
            let regex=/\S+@\S+\.\S+/;
            if(!regex.test(mail)){
                alert("Email gresit");
            }
            else{
                console.log("corect");
            }
        }
    }
}