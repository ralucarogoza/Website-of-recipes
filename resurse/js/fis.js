function clickRand(e){
	console.log(e);
	if(e.ctrlKey){
		this.remove();
	}
}
function creeazaRand(tipCelula, vector){
	tr=document.createElement("tr");
    vector[1]=vector[1].substring(0, vector[1].length-4);
    if(vector[2]=="usor"){
        tr.classList.add("u");
    }
    else if(vector[2]=="mediu"){
        tr.classList.add("m");
    }
    else{
        tr.classList.add("g");
    }
    for(let x of vector){
		var celula=document.createElement(tipCelula);
		celula.innerHTML=x;
        tr.onclick=clickRand;
		tr.appendChild(celula);
	}
	return tr;
}


var nr=0;
function creeazaTabel(preparate){
    var tabel=document.createElement("table");
    if(nr==0)
        tabel.id="tab1";
    else 
        tabel.id="tab2";
    nr++;
    console.log(nr);
    var thead=document.createElement("thead");
	tabel.appendChild(thead);
    var tr=document.createElement("tr");
    var celula1=document.createElement("th");
    celula1.innerHTML="Reteta";
    tr.appendChild(celula1);
    var celula2=document.createElement("th");
    celula2.innerHTML="Kcal";
    tr.appendChild(celula2);
    var celula3=document.createElement("th");
    celula3.innerHTML="Dificultate";
    tr.appendChild(celula3);
    thead.appendChild(tr);
    var tbody=document.createElement("tbody");
    tabel.appendChild(tbody);
    for(let preparat of preparate){
        rand=creeazaRand("td", preparat);
        console.log(preparat);
        tbody.appendChild(rand);
    }
    return tabel;
}

function numarRandom(n){
    return Math.floor(Math.random()*n);
}
function culoareRandom(){
    return "rgb("+numarRandom(256)+","+numarRandom(256)+","+numarRandom(256)+")";
}

let pp=[];
window.onload=function(){

    

    const date=new Date();
    var n=document.createElement("p");
    n.innerHTML="Data: "+date.toDateString();
    var time=document.createElement("p");
    time.innerHTML="Ora: "+date.toLocaleTimeString();
    console.log('Data: '+n);
    console.log('Ora: '+time);
    var divdata=document.getElementById("data");
    divdata.appendChild(n);
    divdata.appendChild(time);

    var x=setTimeout(function(){
        time.innerHTML+=" = ora perfecta pentru gatit";
    }, 2000);

    var salut=document.getElementById("buna");
    console.log(salut.innerHTML);
    salut.style.color=culoareRandom();

    var citate=["If you're trying to create a company, it's like baking a cake. You have to have all the ingredients in the right proportion.", "So we baked and sweated together. I like punching the dough. I told myself it was the moon and punched it senseless.", "A recipe has no soul. You, as the cook, must bring soul to a recipe.", "Once you have mastered a technique, you barely have to look at a recipe again.", "Cooking and baking is both physical and mental therapy.", "Baking is both an art and a science.", "It's all about a balancing act between time, temperature and ingredients: That's the art of baking.", "Happiness is baking cookies. Happiness is giving them away. And serving them, and eating them, talking about them, reading and writing about them, thinking about them, and sharing them with you."];
    var citat=document.getElementById("center2");
    var div1=document.getElementById("divcitat");
    console.log(div1);
    var stilsalut=window.getComputedStyle(salut, null).getPropertyValue("color");
    console.log(stilsalut);
    citat.onclick=function(e){
        citat.innerHTML=citate[numarRandom(citate.length)];
        e.stopPropagation();
    }
    div1.onclick=function(){
        console.log(div1);
        div1.style.backgroundColor=stilsalut;
    }
    
    //tabel
    var preparates=[];
    var dificultate1=["usor", "mediu", "greu", "mediu", "usor", "usor", "usor", "greu", "mediu", "usor"];
    var lista1=document.getElementsByTagName("ol")[0];
    for(var i=0; i<10; i++){
        var preparat=lista1.children[i].innerHTML.split('-');
        preparat[2]=dificultate1[i];
        console.log(preparat[0]," ",preparat[1], preparat[2]);
        preparates.push(preparat);
    }
    console.log(preparates);
    document.getElementById("preparate1").appendChild(creeazaTabel(preparates));

    var preparated=[];
    var lista2=document.getElementsByTagName("ol")[1];
    var dificultate2=["greu", "greu", "usor", "mediu", "greu", "mediu", "greu", "usor", "usor", "usor"];
    for(var i=0; i<10; i++){
        var preparat=lista2.children[i].innerHTML.split('-');
        preparat[2]=dificultate2[i];
        preparated.push(preparat);
    }
    console.log(preparated);
    document.getElementById("preparate2").appendChild(creeazaTabel(preparated));


    var buton1=document.getElementById("sorteaza_kcal1");
    buton1.style.backgroundColor="turquoise";
    buton1.style.fontSize="15px";
    document.getElementById("sorteaza_kcal1").onclick=function(){
		var preparate=document.querySelectorAll("#tab1 tbody tr"); 
		var v_preparate=Array.from(preparate); 
		console.log(v_preparate);
        v_preparate.sort(function(a,b){
			var k1=a.children[1].innerHTML;
			var k2=b.children[1].innerHTML;
			return k1-k2; 
		});
		for(let preparat of v_preparate){
			preparat.parentNode.appendChild(preparat);
		}
	}

    
    var buton2=document.getElementById("sorteaza_kcal2");
    var stilButon1=window.getComputedStyle(buton1, null);
    console.log(stilButon1.getPropertyValue("background-color"));
    buton2.style.backgroundColor=stilButon1.getPropertyValue("background-color");
    buton2.style.fontSize=stilButon1.getPropertyValue("font-size");
    document.getElementById("sorteaza_kcal2").onclick=function(){
		var preparate=document.querySelectorAll("#tab2 tbody tr"); 
		var v_preparate=Array.from(preparate); 
		console.log(v_preparate);
        v_preparate.sort(function(a,b){
			var k1=a.children[1].innerHTML;
			var k2=b.children[1].innerHTML;
			return k1-k2; 
		});
		for(let preparat of v_preparate){
			preparat.parentNode.appendChild(preparat);
		}
	}


    var buton3=document.getElementById("sterge_preparate");
    buton3.style.backgroundColor=stilButon1.getPropertyValue("background-color");
    buton3.style.fontSize=stilButon1.getPropertyValue("font-size");
    document.getElementById("sterge_preparate").onclick=function(){
		var dif=prompt("Alege un grad de dificultate din u, m, g(u=usor, m=mediu, g=greu):");
		if(dif=="u" || dif=="m" || dif=="g"){
            difSelectata=document.getElementsByClassName(dif);
            console.log("difselectata",difSelectata);
			for(let dificultate of difSelectata){
				dificultate.classList.add("selectat");
			}
			var raspuns=confirm("Stergi?");
			if(raspuns){
				var numar=difSelectata.length;
                var c=setInterval(function(){
                    if(difSelectata.length>0){
                        difSelectata[0].remove();
                    }   
                    else{
                        clearInterval(c);
                        alert(numar);
                    }
                }, 2000);
			}
		}
		else{
			alert("Grad de dificultate gresit");
		}
	}

    document.getElementById("tab1").onclick=function(e){
        console.log(e.target.tagName);
        if(e.target.tagName=="TH"){
            e.target.style.backgroundColor="red";
            console.log(e.target.tagName);
        }
        else if(e.target.tagName=="TD"){
            e.target.style.backgroundColor="green";
            console.log(e.target.tagName);
            console.log(e.currentTarget.tagName);
        }
        console.log(e.currentTarget.tagName);
    }


    document.getElementById("tab2").onclick=function(e){
        console.log(e.target.tagName);
        if(e.target.tagName=="TH"){
            e.target.style.backgroundColor="red";
            console.log(e.target.tagName);
        }
        else if(e.target.tagName=="TD"){
            e.target.style.backgroundColor="green";
            console.log(e.target.tagName);
            console.log(e.currentTarget.tagName);
        }
        console.log(e.currentTarget.tagName);
    }

    //recomandari
    //localStorage.clear();
    var input=document.getElementById("recomandare");
    var div=document.getElementById("recomandari");
    console.log("in div", div.innerHTML);
    if(localStorage.getItem("idei")){
        div.innerHTML=localStorage.getItem("idei");
        var r=div.innerHTML.split(",");
    }
    else{
        console.log("in div", div.innerHTML);
        var r=div.innerHTML;
        console.log(r);
    }
    for(var i=0; i<r.length; i++){
        pp.push(r[i]);
    }
    var ok=0;
    window.onkeydown=function(e){
        if(e.ctrlKey){
            console.log(input.value);
            for(var i=0; i<pp.length; i++){
                if(pp[i]==input.value){
                    ok=1; //ca sa nu adaug de mai multe ori aceeasi reteta
                }
            }
            if(ok==0){
                pp.push(input.value);
            }
            console.log(pp);
            localStorage.setItem("idei", pp);
        }
        //e.stopPropagation();
    }
}