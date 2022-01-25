window.indexedDB = window.indexedDB || window.mozIndexedDB || window.webkitIndexedDB

window.IDBTransaction = window.IDBTransaction || window.webkitIDBTransaction

window.IDBKeyRange = window.IDBKeyRange || window.webkitIDBKeyRange

if(!window.indexedDB){
    console.log("Error al aceder a la base de datos")
}
var db;

var request = window.indexedDB.open("Delifruit", 1)

request.onsuccess = (e)=>{
    db = request.result
    console.log("success ", db)
}
request.onerror = (e)=>{
    console.log("Error ",e.target.result)
}
request.onupgradeneeded=()=>{
    db = request.result
    var objstore = db.createObjectStore("code")
}
