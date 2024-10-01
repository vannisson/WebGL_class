// script.js - Etapa 1: Configurando o uso do WebGL

const canvas = document.getElementById("glCanvas");
const gl = canvas.getContext("webgl");

if (!gl) {
  console.log("WebGL não está disponível.");
} else {
  console.log("WebGL foi inicializado com sucesso.");
}
