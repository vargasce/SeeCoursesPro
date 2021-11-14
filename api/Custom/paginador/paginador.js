'use strict'
const PaginadorError = require('../../Error/Paginador/paginadorError');

class Paginador {
  
  static page = 0;
  static nextPageList = 0;
  static backPageList = 0;
  static countTotal = 0;
  static countPage = 0;
  static totalPage = 0;
  static initPage = 0;
  static finalPage = 0;

  constructor(){
    
  }

  static nextPage ( data ) {

    try{
      this.page         = parseInt( data.filter.skip );
      this.nextPageList = parseInt( data.page ) + 1;
      this.backPageList = ((parseInt(data.page)-1) < 1) ? 1 : parseInt( data.page ) - 1;
      this.countTotal   = parseInt( data.countTotal );
      this.totalPage    = parseInt( data.totalPage );
      this.countPage    = parseInt( this.countTotal / this.totalPage );
      this.initPage     = parseInt( ( this.totalPage * this.page ) - this.totalPage );
      this.finalPage    = parseInt( this.totalPage * this.page );
    }catch( err ){
      throw new PaginadorError('Paginador Error', `Paginador : ${err}`);
    }

    return {
      page         : this.page,
      nextPageList : this.nextPageList,
      backPageList : this.backPageList,
      countTotal   : this.countTotal,
      countPage    : this.countPage,
      initPage     : this.initPage,
      finalPage    : this.finalPage
    };
  }

  static backPage ( data ) {

    try{
      this.page         = parseInt( data.page );
      this.nextPageList = parseInt( data.page ) + 1;
      this.backPageList = ((parseInt(data.page)-1) < 1) ? 1 : parseInt( data.page ) - 1;
      this.countTotal   = parseInt( data.countTotal );
      this.totalPage    = parseInt( data.totalPage );
      this.countPage    = parseInt( this.countTotal / this.totalPage );
      this.initPage     = parseInt( ( this.totalPage * this.page ) - this.totalPage );
      this.finalPage    = parseInt( this.totalPage * this.page );
    }catch( err ){
      throw new PaginadorError('Paginador Error', `Paginador : ${err}`);
    }

    return {
      page         : this.page,
      nextPageList : this.nextPageList,
      backPageList : this.backPageList,
      countTotal   : this.countTotal,
      countPage    : this.countPage,
      initPage     : this.initPage,
      finalPage    : this.finalPage
    };
  }

}

module.exports = Paginador;
