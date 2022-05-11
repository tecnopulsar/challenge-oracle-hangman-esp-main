function palabraSorteada(arrayPalabras) {
  function normalizar(texto) {
    //Forma de Normalización de Descomposición Canónica.
    return texto.normalize("NFD").replace(/[\u0300-\u036f]/g, "");
  }
  var numero = Math.floor(Math.random() * arrayPalabras.length);
  var palabra = arrayPalabras[numero].toUpperCase();
  return normalizar(palabra);
}

// Elimina los acentos de un texto
 