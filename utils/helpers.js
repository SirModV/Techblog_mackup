module.exports = {

  // reduce description size
  substring: str=>{
    return str.substr(0, 80).concat('...');
  },

  getSforComment: (fieldname, size) => {

    if (size > 1) {
      return `${fieldname}s`;
    }
    
    else{
      return fieldname;
    }
    
  },
  
  // get clean date from db date object
  getformatedDate: date => {
    return `${new Date(date).getMonth() + 1}/${new Date(date).getDate()}/${new Date(date).getFullYear()}`;
  },
};


