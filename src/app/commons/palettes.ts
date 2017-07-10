const defs = {
  turquoise: {
    main: '#1abc9c',
    darker: '#16a085',
  },
  emerald: {
    main: '#2ecc71',
    darker: '#27ae60',
  },
  peterriver: {
    main: '#3498db',
    darker: '#2980b9',
  },
  amethyst: {
    main: '#9b59b6',
    darker: '#8e44ad',
  },
  sunflower: {
    main: '#f1c40f',
    darker: '#f39c12',
  },
  carrot: {
    main: '#e67e22',
    darker: '#d35400',
  },
  alizarin: {
    main: '#e74c3c',
    darker: '#c0392b',
  },
};

const codes = Object.keys(defs);

let palettedefs = '$palette-defs: (\n';
codes.forEach(code => {
  const def = defs[code];

  palettedefs += `  ${code}: ${def.main},\n`;
});
palettedefs += ');';

export const palettes = {
  codes,
  defs,
};
