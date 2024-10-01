main();
function main() {
  const canvas = document.querySelector("#glcanvas");
  const gl = canvas.getContext("webgl");

  if (gl === null) {
    alert(
      "Não foi possível inicializar o WebGL. Seu navegador ou máquina podem não suportá-lo."
    );
    return;
  }
  gl.clearColor(0.0, 0.0, 0.0, 1.0);
  gl.clear(gl.COLOR_BUFFER_BIT);
}
