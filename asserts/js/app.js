let ahorcado = {
  canvas: {
    ctx: "",
    height: 800,
    weight: 1200,
  },
  jugando: true,
  errores: 0,
  oportunidades: 7,
  aciertos: 0,
  guionInicial: {
    posX: 250,
    posY: 700,
    largo: 50,
    espaciado: 40,
  },
  letraInicial: {
    caracter: "A",
    posX: "",
    posY: "",
    font: "verdana",
    size: "36px",
    color: "blue",
    weight: "bold",
  },
  palabraSecreta: "tecnopulsar",

  iniciar: function () {
    var elemento = document.querySelector("canvas");
    ahorcado.canvas.ctx = elemento.getContext("2d");

    const boton_iniciarJuego = document.querySelector("#boton__iniciarJuego");
    const boton_reiniciarJuego = document.querySelector("#boton__reiniciarJuego");
    const teclado = document.querySelectorAll(".tecla");
    // teclado es un arreglo así que lo recorremos
    teclado.forEach((tecla) => {
      //Agregar listener
      tecla.addEventListener("click", ahorcado.clickEnTeclado);
    });
    const contenedorTeclado = document.querySelector(".teclado");
    contenedorTeclado.style.visibility = "hidden";
    ahorcado.errores = 0;
    boton_iniciarJuego.addEventListener("click", function (e) {
      while (arrayPalabras.length==0 || arrayPalabras.length==null){}
       ahorcado.palabraSecreta = palabraSorteada(arrayPalabras);
       console.log(ahorcado.palabraSecreta);
       boton_iniciarJuego.style.visibility = "hidden";
       boton_reiniciarJuego.style.visibility = "visible";
       contenedorTeclado.style.visibility = "visible";
       ahorcado.dibujarGuiones(ahorcado.palabraSecreta);
    });
    boton_reiniciarJuego.addEventListener("click", function (e) {
       document.location.reload(true);
    });

  },
  bucle:function (){
    if (ahorcado.errores == ahorcado.oportunidades) {
      ahorcado.canvas.ctx.font = "bold 100px verdana, sans-serif";
      ahorcado.canvas.ctx.fillStyle = "red";
      ahorcado.canvas.ctx.fillText("Fin del juego!", 400, 300);
      ahorcado.canvas.ctx.font = "normal 40px verdana, sans-serif";
      ahorcado.canvas.ctx.fillText(
        `La palabra secreta es "${ahorcado.palabraSecreta}"`,
        450,
        500
      );
      const contenedorTeclado = document.querySelector(".teclado");
      contenedorTeclado.style.visibility = "hidden";
    } else {
      if (ahorcado.aciertos == ahorcado.palabraSecreta.length) {
      ahorcado.canvas.ctx.font = "bold 70px verdana, sans-serif";
      ahorcado.canvas.ctx.fillStyle = "green";
      ahorcado.canvas.ctx.fillText("Ganaste, felicidades!", 300, 450);
      const audioAplausos = document.querySelector("#audio__aplausos");
      audioAplausos.play();
      const contenedorTeclado = document.querySelector(".teclado");
      contenedorTeclado.style.visibility = "hidden";
    }}
  },
  dibujarGuiones: function (palabra) {
    ahorcado.canvas.ctx.lineWidth = 5;
    let posXi = ahorcado.guionInicial.posX;
    let posXf = posXi + ahorcado.guionInicial.largo;
    let posY = ahorcado.guionInicial.posY;
    for (let indice = 1; indice <= palabra.length; indice++) {
      ahorcado.canvas.ctx.beginPath();
      ahorcado.canvas.ctx.moveTo(posXi, posY);
      ahorcado.canvas.ctx.lineTo(posXf, posY);
      ahorcado.canvas.ctx.stroke();
      posXi += ahorcado.guionInicial.largo + ahorcado.guionInicial.espaciado;
      posXf = posXi + ahorcado.guionInicial.largo;
    }
  },
  dibujarLetra: function (palabra, letra) {
    let estaPresente = false;
    ahorcado.canvas.ctx.lineWidth = 5;
    let posXi = ahorcado.guionInicial.posX;
    let posXf = posXi + ahorcado.guionInicial.largo;
    let posY = ahorcado.guionInicial.posY;
    for (let indice = 0; indice < palabra.length; indice++) {
      if (palabra[indice] === letra) {
        ahorcado.canvas.ctx.font = `${ahorcado.letraInicial.weight} ${ahorcado.letraInicial.size} ${ahorcado.letraInicial.font} , sans-serif`;
        ahorcado.canvas.ctx.fillText(
          `${palabra[indice]}`,
          posXi + 10,
          posY - 30
        );
        estaPresente = true;
        ahorcado.aciertos++;
      }
      posXi += ahorcado.guionInicial.largo + ahorcado.guionInicial.espaciado;
      posXf = posXi + ahorcado.guionInicial.largo;
    }
    return estaPresente;
  },
  dibujarPalabra: function (palabra) {
    ahorcado.canvas.ctx.lineWidth = 5;
    let posXi = ahorcado.guionInicial.posX;
    let posXf = posXi + ahorcado.guionInicial.largo;
    let posY = ahorcado.guionInicial.posY;
    for (let indice = 0; indice < palabra.length; indice++) {
      ahorcado.canvas.ctx.font = `${ahorcado.letraInicial.weight} ${ahorcado.letraInicial.size} ${ahorcado.letraInicial.font} , sans-serif`;
      ahorcado.canvas.ctx.fillText(`${palabra[indice]}`, posXi + 10, posY - 30);
      posXi += ahorcado.guionInicial.largo + ahorcado.guionInicial.espaciado;
      posXf = posXi + ahorcado.guionInicial.largo;
    }
  },
  dibujarHorca: function (error) {
    switch (error) {
      case 1:
        //base horca
        ahorcado.canvas.ctx.beginPath();
        ahorcado.canvas.ctx.lineWidth = 5;
        ahorcado.canvas.ctx.lineJoin = "miter";
        ahorcado.canvas.ctx.moveTo(100, 400);
        ahorcado.canvas.ctx.lineTo(200, 400);
        ahorcado.canvas.ctx.lineTo(150, 375);
        ahorcado.canvas.ctx.lineTo(100, 400);
        ahorcado.canvas.ctx.fill();
        break;
      case 2:
        //mastil horca
        ahorcado.canvas.ctx.beginPath();
        ahorcado.canvas.ctx.lineWidth = 5;
        ahorcado.canvas.ctx.lineJoin = "miter";
        ahorcado.canvas.ctx.moveTo(150, 375);
        ahorcado.canvas.ctx.lineTo(150, 100);
        ahorcado.canvas.ctx.stroke();
        break;
      case 3:
        //travesaño horca
        ahorcado.canvas.ctx.beginPath();
        ahorcado.canvas.ctx.lineWidth = 5;
        ahorcado.canvas.ctx.lineJoin = "miter";
        ahorcado.canvas.ctx.moveTo(150, 100);
        ahorcado.canvas.ctx.lineTo(300, 100);
        ahorcado.canvas.ctx.lineTo(300, 125);
        ahorcado.canvas.ctx.stroke();
        break;
      case 4:
        //cabeza horca
        ahorcado.canvas.ctx.beginPath();
        ahorcado.canvas.ctx.lineWidth = 3;
        ahorcado.canvas.ctx.lineJoin = "round";
        ahorcado.canvas.ctx.arc(300, 150, 25, 0, Math.PI * 2, false);
        ahorcado.canvas.ctx.stroke();
        break;
      case 5:
        //cuerpo horca
        ahorcado.canvas.ctx.beginPath();
        ahorcado.canvas.ctx.lineWidth = 3;
        ahorcado.canvas.ctx.lineJoin = "round";
        ahorcado.canvas.ctx.moveTo(300, 175);
        ahorcado.canvas.ctx.lineTo(300, 275);
        ahorcado.canvas.ctx.stroke();
        break;
      case 6:
        //brazos horca
        ahorcado.canvas.ctx.beginPath();
        ahorcado.canvas.ctx.lineWidth = 3;
        ahorcado.canvas.ctx.lineJoin = "round";
        ahorcado.canvas.ctx.moveTo(300, 180);
        ahorcado.canvas.ctx.lineTo(350, 220);
        ahorcado.canvas.ctx.stroke();
        ahorcado.canvas.ctx.beginPath();
        ahorcado.canvas.ctx.moveTo(300, 180);
        ahorcado.canvas.ctx.lineTo(250, 220);
        ahorcado.canvas.ctx.stroke();
        break;
      case 7:
        //piernas horca
        ahorcado.canvas.ctx.beginPath();
        ahorcado.canvas.ctx.lineWidth = 3;
        ahorcado.canvas.ctx.lineJoin = "round";
        ahorcado.canvas.ctx.moveTo(300, 275);
        ahorcado.canvas.ctx.lineTo(350, 310);
        ahorcado.canvas.ctx.stroke();
        ahorcado.canvas.ctx.beginPath();
        ahorcado.canvas.ctx.moveTo(300, 275);
        ahorcado.canvas.ctx.lineTo(250, 310);
        ahorcado.canvas.ctx.stroke();
        break;
    }
  },
  // Captura y guarda la tecla pulsada
  clickEnTeclado: function (evento) {
    const letra = this.innerHTML;
    this.style.visibility = "hidden";
    if (!ahorcado.dibujarLetra(ahorcado.palabraSecreta, letra)) {
      ahorcado.errores++;
      ahorcado.dibujarHorca(ahorcado.errores);
    };
    ahorcado.bucle();
  },
};

window.addEventListener("load", function () {
  ahorcado.iniciar();
});
