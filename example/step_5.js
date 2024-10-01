// script.js - Etapa 4: Aplicando rotação em animação

const canvas = document.getElementById("glCanvas");
const gl = canvas.getContext("webgl");

if (!gl) {
  console.log("WebGL não está disponível.");
} else {
  const vertexShaderSource = `
    attribute vec4 a_position;
    uniform mat4 u_matrix;
    void main() {
      gl_Position = u_matrix * a_position;
    }
  `;

  const fragmentShaderSource = `
    void main() {
      gl_FragColor = vec4(1, 0, 0, 1); // Cor vermelha
    }
  `;

  // Funções auxiliares
  function compileShader(type, source) {
    const shader = gl.createShader(type);
    gl.shaderSource(shader, source);
    gl.compileShader(shader);
    return shader;
  }

  function createProgram(vertexShader, fragmentShader) {
    const program = gl.createProgram();
    gl.attachShader(program, vertexShader);
    gl.attachShader(program, fragmentShader);
    gl.linkProgram(program);
    return program;
  }

  const vertexShader = compileShader(gl.VERTEX_SHADER, vertexShaderSource);
  const fragmentShader = compileShader(
    gl.FRAGMENT_SHADER,
    fragmentShaderSource
  );
  const program = createProgram(vertexShader, fragmentShader);
  gl.useProgram(program);

  const vertices = new Float32Array([
    -0.5, -0.5, 0.5, -0.5, -0.5, 0.5, 0.5, 0.5,
  ]);

  const buffer = gl.createBuffer();
  gl.bindBuffer(gl.ARRAY_BUFFER, buffer);
  gl.bufferData(gl.ARRAY_BUFFER, vertices, gl.STATIC_DRAW);

  const positionLocation = gl.getAttribLocation(program, "a_position");
  gl.enableVertexAttribArray(positionLocation);
  gl.vertexAttribPointer(positionLocation, 2, gl.FLOAT, false, 0, 0);

  const matrixLocation = gl.getUniformLocation(program, "u_matrix");
  let angle = 0;
  const rotationSpeed = 0.01;
  let isAnimating = true;

  function render(time) {
    if (isAnimating) {
      angle += rotationSpeed;
    }

    const cosAngle = Math.cos(angle);
    const sinAngle = Math.sin(angle);
    const rotationMatrix = [
      cosAngle,
      -sinAngle,
      0,
      0,
      sinAngle,
      cosAngle,
      0,
      0,
      0,
      0,
      1,
      0,
      0,
      0,
      0,
      1,
    ];

    gl.uniformMatrix4fv(matrixLocation, false, rotationMatrix);

    gl.clear(gl.COLOR_BUFFER_BIT);
    gl.drawArrays(gl.TRIANGLE_STRIP, 0, 4);

    requestAnimationFrame(render);
  }

  gl.clearColor(0, 0, 0, 1);
  requestAnimationFrame(render);

  canvas.addEventListener("click", () => {
    isAnimating = !isAnimating; // Alternar entre pausar e continuar
  });
}
