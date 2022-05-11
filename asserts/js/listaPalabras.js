var arrayPalabras = new Array();
var archivoTxt = new XMLHttpRequest();
var fileRuta = 'asserts/js/listaAnimales.txt';
var txt;

/* Con el método .open() solo preparamos la petición, pero la haremos finalmente efectiva con el método .send(), el cuál lanzará la petición al servidor. Poco después, si consultamos el contenido de la propiedad .responseText (texto de respuesta) de nuestra instancia*/

archivoTxt.addEventListener("readystatechange", () => {
  if (archivoTxt.readyState === 4 && archivoTxt.status === 200){
    txt= archivoTxt.responseText;
    arrayPalabras = txt.split('\r\n');
    console.log(arrayPalabras);
  }
});

archivoTxt.open("GET",fileRuta);
archivoTxt.send();
