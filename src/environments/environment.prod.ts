export const environment = {
  production: true,
  apiURL : 'http://181.170.104.151:3700/api/',
  headers : { 'Content-Type' : 'application/json' },
  token : sessionStorage.getItem('token') ,
  id_entidad : sessionStorage.getItem('id_entidad') ,
  cursosRecomendados: 8 // cantidad de cursos que se muestran en el home
};