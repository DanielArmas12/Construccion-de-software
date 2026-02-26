/*
 * Example functions to practice JavaScript
 *
 * Daniel Armas
 * 2025-02-12
 */

"use strict";

function firstNonRepeating(str){
    //create an empty array
    const candidate=[];
    //Check every character in the string
    for (let i=0; i<str.length; i++){
        //Compare against the candidates
        let found=false;
        for(let cand of candidate){
            if (cand.char==str[i]){
                cand.count +=1;
                found=true;

            }
        }
        //If not found, add as a new candidate
        if(!found){
            candidate.push({char: str[i], count: 1});
        }
    }

    console.log(candidate);

    //Look for the first char that appered only once
    for (let index in candidate){
        if(candidate[index].count==1){
            return candidate[index].char;
        }
    }
}

function bubbleSort(list=[]){
    //Compara cada elemento con el resto de la lista
    for(let i=0; i<list.length-1; i++){
        for(let j=i+1; j<list.length; j++){
            //Cambia los elementos hasta colocarlo en el orden adecuado, empezando con acomodar el mayor
            if(list[i]>list[j]){
                let temp=list[i];
                list[i]=list[j];
                list[j]=temp;
            }
        
    }
}
return list;
}

function invertArray(list=[]){
    //Crea una lista para guardar el arreglo nuevo
    let listNueva=[];
    //Inicias un ciclo de final a inicio
    for(let i=list.length-1; i>=0; i--){
        listNueva.push(list[i]);
    }
return listNueva;

}

function invertArrayInplace(list=[]){
    //Utilizas la lista como esta puesta sacando uno por uno
    for(let i=0; i<list.length/2; i++){
        //Creas una variable temporal para ir cambiando el numero que salga con su final
        let temp=list[i];
        list[i]=list[list.length-1-i];
        list[list.length-1-i]=temp;
    }
    return list;
}

function capitalize(str){
    //Creas un nuevos string en donde vas a concatenar todo
    let strFinal="";
    //Vas obteniendo letra por letra del string
    for(let i=0; i<str.length; i++){
        //Creas una condición para ver que se cumpla que es la primera letra o que esta despues de un espacio
        if(i==0 ||str[i-1]==" "){
            //La unes a el nuevo string haciendolo mayuscula con la funcion "toUpperCase"
            strFinal+=str[i].toUpperCase();
        }
        else{
            //Si no, la agregas unicamente como esta
            strFinal+=str[i];
        }
    }
    return strFinal;
}

function mcd(x,y){
    //Creas una condicion para los casos en donde los valores son 0
    if(x==0 && y==0){
        return 0;
    }
    //Creas una lista para los divisbles de cada valor
    let listX=[];
    let listY=[];
    //Comparas todos los numeros naturales menores o iguales al valor
    for(let i=1; i<=x; i++){
        //Ves si el remainder es 0 para determinar si es divisble
        if(x%i==0){
            listX.push(i);
        }
    }
    //Haces lo mismo para el segundo valor
    for(let j=1; j<=y; j++){
        if(y%j==0){
            listY.push(j);
        }
    }
    //Creas una variable temporal para el mcd, ya que el minimo es 1
    let mcd=1;
    //Obtienes los valores de la lista del primer valor
    for(let k=0; k<listX.length; k++){
        //Utilizas la funcion "includes" para ver si el valor actual a comparar de la primera lista se encuentra en la lista del segundo valor
        if(listY.includes(listX[k])){
            //Si el valor actual se encuentra, ese se transforma en el mcd y asi sigue con todos los numeros hasta queencuentre el maximo
            mcd=listX[k];
        }
    }
return mcd;
}

function hackerSpeak(str){
    //Creas un string nuevo
    let strFinal="";
    //Vas comparando letra por letra
    for(let i=0; i<str.length; i++){
        //Creas condiciones para cambiar la letra por el numero que corresponde
        if(str[i]=="a"){
            strFinal+="4";
        }
        else if(str[i]=="s"){
            strFinal+="5";
        }
        else if(str[i]=="o"){
            strFinal+="0";
        }
        else if(str[i]=="i"){
            strFinal+="1";
        }
        else if(str[i]=="e"){
            strFinal+="3";
        }
        else if(str[i]=="o"){
            strFinal+="0";
        }
        else{
            strFinal+=str[i];
        }
    }
return strFinal;
}

function factorize(x){
    //Creas una condicion donde el valor que se ingresa es 0 para regresar una lista vacia
    if(x==0){
        return [];
    }
    //Creas una lista para almacenar los valores
    let list=[];
    for(let i=1; i<=x; i++){
        //Si el valor a comparar el remainder es igual a 0 lo agregas en la lista
        if(x%i==0){
            list.push(i);
        }
    }
    return list;
}

function deduplicate(list=[]){
    //Creas una lista para guardar los elementos únicos
    let listFinal=[];
    //Vas comparando valor por valor
    for(let i=0; i<list.length; i++){
        //Haces el comparativo con la funcion "includes" para ver si ya ingresaste ese numero en tu nueva lista
        if(listFinal.includes(list[i])){

        }
        else{
            listFinal.push(list[i]);
        }
    }
    return listFinal;
}

function findShortestString(list=[]){
    //Creas una condición para ver si la lista esta vacía
    if(list.length==0){
        return 0;
    }
    //Creas una variable para el string mas corto, colocando primero el string 0.
    let cont=list[0].length;
    //Vas comparando cada string para ver si es mas corto
    for(let i=1; i<list.length; i++){
        if(list[i].length<cont){
            cont=list[i].length;
        }
    }
return cont;
}

function isPalindrome(list=[]){
    //Creas un ciclo para que compare uncicamente la mitad de veces del tamaño de la palabra
    for(let i=0; i<list.length/2; i++){
        //Si la primera letra es igual a a la ultima letra se mantiene true, hasta comparar toda la palabra
        if(list[i]!=list[list.length-1-i]){
            return false;
        }
    }
    return true;
}

function sortStrings(list=[]){
    //Crea una nueva lista para ordenar las palabras
    let listNueva=[];
    //Vas agregando cada palabra en el nueva lista
    for(let i=0; i<list.length; i++){
        listNueva.push(list[i]);
    }
    //Vas comparando la primera palbra con la siguiente
    for(let j=0; j<listNueva.length-1; j++){
        for(let k=j+1; k<listNueva.length; k++){
            //Creas una condición en donde si la primera palabra es mayor que la segunda, las intercambias para ordenarlas
            if(listNueva[j]>listNueva[k]){
                let temp=listNueva[j];
                listNueva[j]=listNueva[k];
                listNueva[k]=temp;
            }
        }
    }
    return listNueva;

}

function stats(list=[]){
    //Creas una condición por si la lista esta vacia, regresar una lista vacía
    if(list.length==0){
        return [0,0];
    }
    //Creas variables para guardar en una lista el promedio y la moda, y una variable para sumar los valores de la lista original
    let listTotal=[];
    let total=0;
    //Vas obteniendo cada valor de la lista orignal y sumandola al total
    for(let i=0; i<list.length; i++){
        total+=list[i];
    }
    //Creas una variable para obtener el promedio
    let promedio=total/list.length;
    //Creas variables para tener el cuantas veces se esta repitiendo el valor y una variable para obtener ese valor que se esta repitiendo mucho
    let maxCount=0;
    let moda=list[0];
    //Comparas el valor con el siguiente para ver si se repiten
    for(let j=0; j<list.length-1; j++){
        //Creas una variable para el conteo actual del valor
        let count=0;
        for(let k=j+1;k<list.length; k++){
            //Creas la condicion para ver si los valores son iguales
            if(list[j]==list[k]){
                count++;
            }
        }
        //Haces una condicion para ver si el conteo del numero actual es mayor al conteo maximo que tenias
        if(count>maxCount){
            maxCount=count;
            moda=list[j];
        }
    }
    listTotal.push(promedio);
    listTotal.push(moda);
    return listTotal;
}


function popularString(list=[]){
    //Creas una condicion por si la lista esta vacia no regresar ningun string 
    if(list.length==0){
        return "";
    }
    //Creas una variable de conteo maximo y una variable que guarde el string que mas se repite
    let maxCount=0;
    let popular=list[0];
    //Comparas cada string con el siguiente
    for(let i=0; i<list.length-1; i++){
        //CReas una variable de conteo momentaneo
        let count=0;
        for(let j=i+1; j<list.length; j++){
            //Creas una condición para ver si el string se repitio
            if(list[i]==list[j]){
                count++;
            }
        }
        //Creas una condicion para ver si el string actual esta mas veces que tu maximo anteiror
        if(count>maxCount){
            maxCount=count;
            popular=list[i];
        }
    }
    return popular;
}

function isPowerOf2(x){
    //Creas una variable resultado que empiece valiendo el valor a ingresar
    let result=x;
    //Haces un ciclo para que vayas dividiendo el numero entre 2 hasta que te de 1 de resultado
    while(result!=1){
        //Creas una variable llamada potencia que calcule el remainder del resultado entre 2 
        let potencia=result%2;
        //Si la variable potencia no es 0, es porque no es potencia, Si si, sigues repitiendo este proceso hasta llegar a 1 o a demostrar que no es factor
        if(potencia==0){
            result=result/2;
        }
        else{
            return false;
        }
    }
    return true;
}

function sortDescending(list=[]){
    //Creas una condiion para ver si la lista esta vacía, regresar una lista vacia
    if(list.length==0){
        return []
    }
    //Creas una lista nueva en donde vas a ordenar los valores de manera descendiente
    let listFinal=[];
    //Agregas todos los numeros de la lista orginal a esta
    for (let i=0;i<list.length;i++) {
        listFinal.push(list[i]);
    }
    //Vas comparando cada numero el siguiente hasta ordenarlos de manera descendiente
    for(let j=0; j<listFinal.length-1; j++){
        for(let k=j+1; k<listFinal.length; k++){
            if(listFinal[k]>listFinal[j]){
                let temp=listFinal[j];
                listFinal[j]=listFinal[k];
                listFinal[k]=temp;
            }
        }
    }
    return listFinal;

}
export {
    firstNonRepeating,
    bubbleSort,
    invertArray,
    invertArrayInplace,
    capitalize,
    mcd,
    hackerSpeak,
    factorize,
    deduplicate,
    findShortestString,
    isPalindrome,
    sortStrings,
    stats,
    popularString,
    isPowerOf2,
    sortDescending,
};
