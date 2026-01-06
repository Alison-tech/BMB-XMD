const fs = require('fs-extra');
const { Sequelize } = require('sequelize');
if (fs.existsSync('settings.env'))
    require('dotenv').config({ path: __dirname + '/settings.env' });
const path = require("path");
const databasePath = path.join(__dirname, './database.db');
const DATABASE_URL = process.env.DATABASE_URL === undefined
    ? databasePath
    : process.env.DATABASE_URL;

module.exports = {
    session: process.env.SESSION_ID || 'B.M.B-TECH;;;;eyJub2lzZUtleSI6eyJwcml2YXRlIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiY0I1OHlSTHI5Q29FVWw4VE9YcXhTeTdqUStudGtIcUNtNEQ1R2JORUpYaz0ifSwicHVibGljIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiKzcrM3ZCa295K0liSE01MUZVcnBHVFd0bmVSdDFQY3dXMW40aEdiK09uOD0ifX0sInBhaXJpbmdFcGhlbWVyYWxLZXlQYWlyIjp7InByaXZhdGUiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJxSHNyRFpMdWZsWW4rdXZaRnVEOG9Mb1NVektkK3pJWWgra3pPWUw3TWtzPSJ9LCJwdWJsaWMiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJrUWRZRHBrLy9zNU5LMGdzN1lzZTJDeVE3cHMwL2EwYklkSi81dlVxcTJnPSJ9fSwic2lnbmVkSWRlbnRpdHlLZXkiOnsicHJpdmF0ZSI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6ImtCU3VWaGYyMXJuNWdNNWNtbU56Y1ZFZGs1RWlPaWRZVTREVG5OL0tlVW89In0sInB1YmxpYyI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6ImJ2YTNIck9PN0d5UmtTNkY3WEJrVjFGYnBWRW42bWJ3Rjd6RDB3R0NYWHc9In19LCJzaWduZWRQcmVLZXkiOnsia2V5UGFpciI6eyJwcml2YXRlIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoibVBoUE4zY202UjcxeUVwTXZCSitFdFdOU2ttNm5HWk9JUkVISGd3d04wND0ifSwicHVibGljIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoid2Q0YUFpNlV5UDV2SCsrQmNtWU0ybURranh2a1Z3TzgzYUcyTjBodTBDaz0ifX0sInNpZ25hdHVyZSI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6InB5M1lubDZQNmVYRm9TeXBVOUxEdzJMWXpnT0pkRUlhMlBRUVRESU1KTmhjdHZGRG00SXpxTHNRVnk2VGFNeWgyaXc4MmlnaTgvNnVDaGFUbm94dWd3PT0ifSwia2V5SWQiOjF9LCJyZWdpc3RyYXRpb25JZCI6MTM0LCJhZHZTZWNyZXRLZXkiOiJvcGZSNlBhMHdqQ0F6K2pIMVNla01OK2NOdUhBbjFsdUVQQXhvQlFDSUo4PSIsInByb2Nlc3NlZEhpc3RvcnlNZXNzYWdlcyI6W3sia2V5Ijp7InJlbW90ZUppZCI6IjI1NTYxMTQyNTQ2OEBzLndoYXRzYXBwLm5ldCIsImZyb21NZSI6dHJ1ZSwiaWQiOiJBNTRCMTM4QzZGQzMyNkE1NTE1NUQ4QTdDNjJFRDZEOSJ9LCJtZXNzYWdlVGltZXN0YW1wIjoxNzY3NzE0MDk5fV0sIm5leHRQcmVLZXlJZCI6MzEsImZpcnN0VW51cGxvYWRlZFByZUtleUlkIjozMSwiYWNjb3VudFN5bmNDb3VudGVyIjoxLCJhY2NvdW50U2V0dGluZ3MiOnsidW5hcmNoaXZlQ2hhdHMiOmZhbHNlfSwiZGV2aWNlSWQiOiJKYnA3YVFIUVM2MlZPZlJjZ2lzaE1BIiwicGhvbmVJZCI6ImY3OTI5YzViLTQ5MDMtNDBmMS04Zjk2LWNlYzBjMTU5NmNiNyIsImlkZW50aXR5SWQiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJXU2g5andGc01TRTBDSEpTUjlnQjhnUmJYYmM9In0sInJlZ2lzdGVyZWQiOnRydWUsImJhY2t1cFRva2VuIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiT0dQcTBsWmVnM01Yd0VyU2tTSDFqMzFqMzg4PSJ9LCJyZWdpc3RyYXRpb24iOnt9LCJwYWlyaW5nQ29kZSI6IlQ2V001Nko4IiwibWUiOnsiaWQiOiIyNTU2MTE0MjU0Njg6NDhAcy53aGF0c2FwcC5uZXQiLCJuYW1lIjoiYWxpc29uIiwibGlkIjoiODUxNzU1NzY5MDU0Mzo0OEBsaWQifSwiYWNjb3VudCI6eyJkZXRhaWxzIjoiQ05UeTJQVUZFSnphOU1vR0dBRWdBQ2dBIiwiYWNjb3VudFNpZ25hdHVyZUtleSI6InljTm5ieE9FaWgxcm5RZTlRbThpQlluT2dWY1FGRVVLSWtoL25lR2JObnM9IiwiYWNjb3VudFNpZ25hdHVyZSI6IkdzbnhNK1lVdnB4ZUdYRXUxMUdDa1JKdWhVRW15OVdnTVJSQnJuN3Njek1PWHZLVTRrblRRaVZvVTdnL29pRHhkWGRDYmlWbC8xaTZrYkhuWXVtb0NBPT0iLCJkZXZpY2VTaWduYXR1cmUiOiIxbDRTbWI1Z0x3aTE5dUJmTlJsUHBnWjE1UUphbEowQTR1Wk12Q2dySWNHODdyYmZiRERtQ2R6RS83TlZQdEozMkI4S05xZWJlYmdRYlM2aGNuKzFoZz09In0sInNpZ25hbElkZW50aXRpZXMiOlt7ImlkZW50aWZpZXIiOnsibmFtZSI6IjI1NTYxMTQyNTQ2ODo0OEBzLndoYXRzYXBwLm5ldCIsImRldmljZUlkIjowfSwiaWRlbnRpZmllcktleSI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6IkJjbkRaMjhUaElvZGE1MEh2VUp2SWdXSnpvRlhFQlJGQ2lKSWY1M2htelo3In19XSwicGxhdGZvcm0iOiJzbWJhIiwicm91dGluZ0luZm8iOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJDQWdJRWdnTiJ9LCJsYXN0QWNjb3VudFN5bmNUaW1lc3RhbXAiOjE3Njc3MTQwOTEsImxhc3RQcm9wSGFzaCI6IjJQMVloZiIsIm15QXBwU3RhdGVLZXlJZCI6IkFBQUFBTUhYIn0=',
    PREFIXE: process.env.PREFIX || ".",
    OWNER_NAME: process.env.OWNER_NAME || "Alison-TECH",
    NUMERO_OWNER : process.env.NUMERO_OWNER || "255611425468",              
    AUTO_READ_STATUS: process.env.AUTO_READ_STATUS || "yes",
    AUTO_DOWNLOAD_STATUS: process.env.AUTO_DOWNLOAD_STATUS || 'no',
    BOT : process.env.BOT_NAME || 'Alison-TECH',
    URL : process.env.BOT_MENU_LINKS || 'https://files.catbox.moe/8qq3l4.jpg',
    MODE: process.env.PUBLIC_MODE || "no",
    PM_PERMIT: process.env.PM_PERMIT || 'yes',
    HEROKU_APP_NAME : process.env.HEROKU_APP_NAME,
    HEROKU_API_KEY : process.env.HEROKU_API_KEY, 
    WARN_COUNT : process.env.WARN_COUNT || '3',
    ETAT : process.env.PRESENCE || '2',
    ANTICALL : process.env.ANTICALL || 'yes',   
    AUTO_BIO : process.env.AUTO_BIO || 'no',               
    DP : process.env.STARTING_BOT_MESSAGE || "yes",
    ANTIDELETE1 : process.env.ANTI_DELETE_MESSAGE || 'no',
    AUTO_REACT : process.env.AUTO_REACT || 'no',
    AUTO_REACT_STATUS : process.env.AUTO_REACT_STATUS || 'yes',
    AUTO_READ : process.env.AUTO_READ || 'yes',
    AUTO_SAVE_CONTACTS : process.env.AUTO_SAVE_CONTACTS || 'yes',
    CHATBOT: process.env.CHATBOT || 'yes',
    DATABASE_URL,
    DATABASE: DATABASE_URL === databasePath
        ? "postgresql://postgres:bKlIqoOUWFIHOAhKxRWQtGfKfhGKgmRX@viaduct.proxy.rlwy.net:47738/railway"
        : "postgresql://postgres:bKlIqoOUWFIHOAhKxRWQtGfKfhGKgmRX@viaduct.proxy.rlwy.net:47738/railway",
};

let fichier = require.resolve(__filename);
fs.watchFile(fichier, () => {
    fs.unwatchFile(fichier);
    console.log(`mise à jour ${__filename}`);
    delete require.cache[fichier];
    require(fichier);
});
