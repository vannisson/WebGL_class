// script.js - Etapa 2: Desenhando um quadrado vermelho

const canvas = document.getElementById("glCanvas");
const gl = canvas.getContext("webgl");

if (!gl) {
  console.log("WebGL não está disponível.");
} else {
  // Vertex Shader
  const vertexShaderSource = `
    attribute vec4 a_position;
    void main() {
      gl_Position = a_position;
    }
  `;

  // Fragment Shader
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

  // Compilar e linkar shaders
  const vertexShader = compileShader(gl.VERTEX_SHADER, vertexShaderSource);
  const fragmentShader = compileShader(
    gl.FRAGMENT_SHADER,
    fragmentShaderSource
  );
  const program = createProgram(vertexShader, fragmentShader);

  gl.useProgram(program);

  // Vértices de um quadrado
  const vertices = new Float32Array([
    -0.5, -0.5, 0.5, -0.5, -0.5, 0.5, 0.5, 0.5,
  ]);

  // Buffer
  const buffer = gl.createBuffer();
  gl.bindBuffer(gl.ARRAY_BUFFER, buffer);
  gl.bufferData(gl.ARRAY_BUFFER, vertices, gl.STATIC_DRAW);

  // Atributos de posição
  const positionLocation = gl.getAttribLocation(program, "a_position");
  gl.enableVertexAttribArray(positionLocation);
  gl.vertexAttribPointer(positionLocation, 2, gl.FLOAT, false, 0, 0);

  // Limpar e desenhar o quadrado
  gl.clearColor(0, 0, 0, 1); // Cor de fundo preta
  gl.clear(gl.COLOR_BUFFER_BIT);
  gl.drawArrays(gl.TRIANGLE_STRIP, 0, 4);
}
