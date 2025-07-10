export const validators = {
  // Validar formato de color hexadecimal
  colorHex: (color) => {
    const regex = /^#[0-9A-F]{6}$/i;
    return regex.test(color);
  },

  // Validar monto (positivo, máximo 2 decimales)
  monto: (value) => {
    if (value <= 0) return false;
    const decimales = value.toString().split('.')[1];
    return !decimales || decimales.length <= 2;
  },

  // Validar rango de fechas
  rangoFechas: (fechaInicio, fechaFin) => {
    if (!fechaInicio || !fechaFin) return true;
    return new Date(fechaInicio) <= new Date(fechaFin);
  },

  // Validar longitud de texto
  longitudTexto: (texto, min = 0, max = 255) => {
    if (!texto) return min === 0;
    return texto.length >= min && texto.length <= max;
  },

  // Validar que no haya duplicados en array
  sinDuplicados: (array) => {
    return array.length === new Set(array).size;
  }
};