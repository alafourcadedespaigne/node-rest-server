


//====================================
// PUERTO
// ===================================
process.env.PORT = process.env.PORT || 3000;


//====================================
// ENTORNO
// ===================================
process.env.NODE_ENV = process.env.NODE_ENV || 'env'


//====================================
// BASE DE DATOS
// ===================================

let urlDB;

if(process.env.NODE_ENV === 'env'){
    urlDB = 'mongodb://localhost:27017/cafe'
}else{
    urlDB = 'mongodb://cafe-user:123456@ds121015.mlab.com:21015/cafe'
}

process.env.URLDB = urlDB;


