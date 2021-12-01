export const environment = {
  production: false,
  apiURL : 'http://localhost:3700/api/',
  headers : { 'Content-Type' : 'application/json' },
  token : localStorage.getItem('token') ,
  id_entidad : localStorage.getItem('id_entidad') ,
  cursosRecomendados: 8 // cantidad de cursos que se muestran en el home
};