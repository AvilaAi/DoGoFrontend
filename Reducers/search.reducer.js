export default function(promenadeDate = {}, action) {
  console.log('jesuis danmonREDUCER de CHERCHER',action);
  if(action.type == 'chercherPromenade') {
      return action.chosenDate
      
  } else {
      return promenadeDate;
  }
  
}
