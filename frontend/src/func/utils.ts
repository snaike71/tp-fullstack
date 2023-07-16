export function recupDate(date:string){

    return Number(date.replace(/[^\d]/g, ""))
}

export function secureNumber(date:string):boolean{

    return( date.replace(/[0-9]/g,"").length!==0)?false:true
}

