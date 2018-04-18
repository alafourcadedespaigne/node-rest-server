


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
    urlDB = process.env.MONGO_URI
}

process.env.URLDB = urlDB;


//====================================
// Vencimiento del token
// ===================================
// 60 segundos
// 60 minutos
// 24 horas
// 30 días
process.env.CADUCIDAD_TOKEN =  '48h';

//====================================
// SEED o semilla de autenticación
// ===================================

process.env.SEED = process.env.SEED || 'este-es-el-seed-desarrollo';


//====================================
// Google Client ID
// ===================================

process.env.CLIENT_ID = process.env.CLIENT_ID || '876849385424-avss33jhb7jq3d7h07n75m9v6j2s64hf.apps.googleusercontent.com';