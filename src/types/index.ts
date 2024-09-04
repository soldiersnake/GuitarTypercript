export type Guitar = {
  id: number | string;
  name: string;
  image: string;
  description: string;
  price: number;
};

// con Pick en type sirve para seleccionar unicamentes los atributos que queremos heredar
// export type CartItem = Pick<Guitar, 'id' | 'name' | 'price'> & {
//   quantity: number,
// }


// con Omit en typo sirve para omitir los atributos que no queremos heredar
// export type CartItem = Omit<Guitar, 'id' > & {
//   quantity: number,
// }

export type CartItem = Guitar & {
  quantity: number;
};


// heredar propiedades de types con interface
// export interface CartItem extends Guitar {
//   quantity: number,
// };
