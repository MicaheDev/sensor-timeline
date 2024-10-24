export type Event = {
  name: string;
  date: Date;
  value: number;
  symbol: string;
  color: string;
  video?: string | undefined;
  audio?: string | undefined;
  position: { lng: number; lat: number };
};

export const sensores = [
  { name: "Audio", color: "#A9CCE3" }, // Azul pastel
  { name: "Video", color: "#B2BEB5" }, // Verde pastel
  { name: "Movimiento", color: "#FFB6C1" }, // Rosa pastel
  { name: "Radiofrecuencia", color: "#D8BFD8" }, // Lila pastel
  { name: "Vibración", color: "#FFE4B5" }, // Amarillo pastel
  { name: "Humedad del suelo", color: "#B0E0E6" }, // Turquesa pastel
  { name: "CO2", color: "#D8BFD8" }, // Lila pastel (repetido para mayor contraste)
  { name: "PM2.5", color: "#FFDAB9" }, // Salmón pastel
  { name: "CH2O", color: "#AFEEEE" }, // Azul claro pastel
  { name: "O3", color: "#F280CC" }, // Rosa fuerte pastel
  { name: "CO", color: "#D2B48C" }, // Beige pastel
  { name: "TVOC", color: "#FFA07A" }, // Naranja claro pastel
  { name: "NO2", color: "#CD5C5C" }, // Rojo pastel
];

export const eventos: Event[] = [
  {
    date: new Date(2001, 1, 22),
    name: "Audio",
    value: 40.8,
    symbol: "dB",
    audio: "/test.mp3",
    position: { lng: -58.3816, lat: -34.6037 },
    color: "#A9CCE3",
  },
  {
    date: new Date(2005, 1, 12),
    name: "Video",
    value: 1,
    symbol: "",
    video: "/test.mp4",
    position: { lng: -20.3816, lat: -14.6037 },
    color: "#B2BEB5",
  },
  {
    date: new Date(2008, 5, 1),
    name: "Humedad del suelo",
    value: 60.2,
    symbol: "%",
    position: { lng: -80.3816, lat: -20.6037 },
    color: "#B0E0E6",
  },
  {
    date: new Date(2023, 11, 24),
    name: "Movimiento",
    value: 1,
    symbol: "",
    position: { lng: -50.3816, lat: -50.6037 },
    color: "#FFB6C1",
  },
  {
    date: new Date(2002, 1, 22),
    name: "O3",
    value: 98.7,
    symbol: "Hz",
    position: { lng: -58.3816, lat: -34.6037 },
    color: "#F280CC",
  },

  {
    date: new Date(2001, 1, 22),
    name: "O3",
    value: 98.7,
    symbol: "Hz",
    position: { lng: -18.3816, lat: -34.6037 },
    color: "#F280CC",
  },
];
