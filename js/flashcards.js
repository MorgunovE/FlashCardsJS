let cards = [];

init ();

function init () {
  document.getElementById ( 'btnSave' ).addEventListener ( 'click', saveCard );
  getCard ();
}

function getCard () {
  localforage.getItem ( 'flashcards' ).then ( function ( value ) {
    if ( value != null ) {
      cards = JSON.parse ( value );
      document.getElementById ( 'numCards' ).innerHTML = cards.length;
    }
  } ).catch ( function ( err ) {
    console.log ( err );
  } )
}

function saveCard () {
  let frontContent = document.getElementById ( 'frontCard' ).value;
  let backContent = document.getElementById ( 'backCard' ).value;
  let card = { front : frontContent, back : backContent };
  cards.push ( card );
  console.log ( cards );
  clearUI ();
  numCardsOut ();
  storeCards ();
}

function storeCards () {
  let serializedCards = JSON.stringify ( cards );
  localforage.setItem ( 'flashcards', serializedCards ).then ( function () {
    return localforage.getItem ( 'key' );
  } ).then ( function () {
    alert ( 'saved card' );
  } ).catch ( function ( err ) {
    console.log ( 'error: ' + err );
  } )
}

function numCardsOut () {
  document.getElementById ( 'numCards' ).innerHTML = cards.length;
}

function clearUI () {
  document.getElementById ( 'frontCard' ).value = '';
  document.getElementById ( 'backCard' ).value = '';
}