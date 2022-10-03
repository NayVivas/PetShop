let x = document.getElementById(`boton1`);
const URI = "https://apipetshop.herokuapp.com/api/articulos";
const app = Vue.createApp({
    data() {
        return {
            saludo: "hola",
            productos: [],
            juguetes: [],
            medicamentos: [],
            menosStock: [],
            nombre: "",
            seleccionados: [],
            nuevosElementos: [],
            precioTotalDetails: 0,
            cantidadArticulosCarrito: [],
            productoDetalle: [],
            ordenarPrecio: "",
            selected: "",
            select: "",
            medicamentosStorage: JSON.parse(localStorage.getItem(`medicamentos`)),
            juguetesStorage: JSON.parse(localStorage.getItem(`juguetes`))
        };
    },
    created() {
        fetch(URI)
            .then((respuesta) => respuesta.json())
            .then((info) => {
                this.productos = info.response;

                this.productos.forEach((e) => {
                    e.vmodel = 1;
                    e.textBoton = "agregar al carrito";
                });

                this.juguetes = this.productos.filter(
                    (juguete) => juguete.tipo == "Juguete"
                );
                this.medicamentos = this.productos.filter(
                    (juguete) => juguete.tipo == "Medicamento"
                );
                this.menosStock = this.productos.filter(
                    (cantidad) => cantidad.stock < 5
                );

                let seleccionadosStorage = JSON.parse(
                    localStorage.getItem(`seleccion`)
                );
                if (seleccionadosStorage) {
                    this.seleccionados = seleccionadosStorage;
                }
                this.productoDetalle = JSON.parse(
                    localStorage.getItem(`productoAMostrarDetalles`)
                );
                this.juguetesMenorAMayor = JSON.parse(
                    localStorage.getItem(`ordenarPrecio`)
                );
                console.log(JSON.parse(localStorage.getItem('medicamentos')));
            console.log(this.medicamentosStorage.length);
            console.log(this.medicamentosStorage)

            if (this.medicamentosStorage.length !== 0) {

                console.log("hay medicamentos en storage")

                //this.textoBotones(this.medicamentosStorage)
                this.medicamentos = this.medicamentosStorage;


                console.log(this.medicamentos)

            }


            if (this.juguetesStorage.length !== 0) {

                console.log("hay juguetes en storage")

                //this.textoBotones(this.juguetesStorage)
                this.juguetes = this.juguetesStorage;



            }
                
            });
    },
    mounted() {},
    methods: {
        prueba(objeto) {
            let x = this.seleccionados;
            if (objeto.textBoton == "Borrar del carrito") {
                objeto.textBoton = "Agregar al carrito";
                this.removeLocal(objeto);
            } else {
                console.log("en else");
                objeto.textBoton = "Borrar del carrito";
                x.push(objeto);
                localStorage.setItem(`seleccion`, JSON.stringify(x));
            }

            console.log(x);
        },
        removeLocal(objeto) {
            let x = this.seleccionados;
            let indiceSeleccionado;
            for (let i = 0; i < x.length; i++) {
                if (x[i] === objeto) {
                    indiceSeleccionado = i;
                }
            }
            x[indiceSeleccionado] = "";
            x = x.filter((e) => e != "");

            console.log(x);

            localStorage.setItem(`seleccion`, JSON.stringify(x));
        },
        vaciarCarrito() {
            localStorage.removeItem(`seleccion`);
        },
        mostrarDetalle(producto) {
            this.productoDetalle = producto;
            console.log(this.productoDetalle);

            localStorage.setItem(
                `productoAMostrarDetalles`,
                JSON.stringify(this.productoDetalle)
            );
        },
        ordenarMenorAMayor(objeto) {
            let ordenarMenorAMayor = this.juguetes.sort((a, b) =>
                a.precio > b.precio ? 1 : -1
            );
            this.juguetesMayorAMenor = "";

            localStorage.setItem(
                `juguetesMenorAMayor`,
                JSON.stringify(ordenarMenorAMayor)
            );
        },
        ordenarMayorAMenor(objeto) {
            let ordenarMayorAMenor = this.juguetes.sort((a, b) =>
                a.precio < b.precio ? 1 : -1
            );
            this.juguetesMenorAMayor = "";

            localStorage.setItem(
                `juguetesMayorAMenor`,
                JSON.stringify(ordenarMayorAMenor)
            );
        },
        switchSelectJug(event) {
            if (event.target.value === "menor") {
                this.select = event.target.value;
                console.log(this.select);
                let ordenarPrecio = this.juguetes.sort((a, b) =>
                    a.precio > b.precio ? 1 : -1
                );

                console.log(ordenarPrecio);

                localStorage.setItem(`ordenarPrecio`, JSON.stringify(ordenarPrecio));
            } else {
                this.select = event.target.value;
                console.log(this.select);
                let ordenarPrecio = this.juguetes.sort((a, b) =>
                    a.precio < b.precio ? 1 : -1
                );

                localStorage.setItem(`ordenarPrecio`, JSON.stringify(ordenarPrecio));
            }
        },
        switchSelectMed(event) {
            if (event.target.value === "menor") {
                this.select = event.target.value;
                console.log(this.select);
                let ordenarPrecio = this.medicamentos.sort((a, b) =>
                    a.precio > b.precio ? 1 : -1
                );

                console.log(ordenarPrecio);

                localStorage.setItem(`ordenarPrecio`, JSON.stringify(ordenarPrecio));
            } else {
                this.select = event.target.value;
                console.log(this.select);
                let ordenarPrecio = this.medicamentos.sort((a, b) =>
                    a.precio < b.precio ? 1 : -1
                );

                localStorage.setItem(`ordenarPrecio`, JSON.stringify(ordenarPrecio));
            }
        },
        botonesContadoresRestar(objeto, array) {
            array.forEach(e => {
                if (objeto.nombre == e.nombre) {
                    if (e.vmodel == 1) {
                        e.vmodel = e.vmodel
                        console.log(e.vmodel)
                    } else {
                        e.vmodel = e.vmodel - 1
                    }
                }
            });

        },
        botonesContadoresSumar(objeto, array) {
            array.forEach(e => {
                if (objeto.nombre == e.nombre) {
                    if (e.vmodel < objeto.stock) {
                        e.vmodel = e.vmodel + 1
                        console.log(e.vmodel + e.nombre)
                    } else {
                        e.vmodel = objeto.stock
                    }
                }
            });
        },
        sumarBotonSinArray(objeto) {
            if (objeto.vmodel < objeto.stock) {
                objeto.vmodel = objeto.vmodel + 1
            } else {
                objeto.vmodel = objeto.stock
            }

        },
        restarBotonSinArray(objeto) {
            if (objeto.vmodel == 1) {
                objeto.vmodel = objeto.vmodel

            } else {
                objeto.vmodel = objeto.vmodel - 1
            }
        }
    },
    computed: {
        calcularPrecioTotal() {
            this.precioTotalDetails = 0;

            this.seleccionados.forEach((e) => {
                if (e.precio > 1) {
                    this.precioTotalDetails =
                        this.precioTotalDetails + e.precio * e.vmodel;
                }
            });
        },
        cantidadArticulosargados() {
            this.cantidadArticulosCarrito = 0;
            this.seleccionados.forEach((e) => {
                if (e.vmodel > 0) {
                    this.cantidadArticulosCarrito =
                        this.cantidadArticulosCarrito + e.vmodel;
                }
            });
        },
        capturarValorInput() {},
        cambiarTexto() {
            this.seleccionados.forEach((e) => {
                this.medicamentos.forEach((a) => {
                    if (a.nombre == e.nombre) {
                        a.textBoton = "Borrar del carrito";
                    }
                });
                this.juguetes.forEach((j) => {
                    if (j.nombre == e.nombre) {
                        j.textBoton = "Borrar del carrito";
                    }
                });
                if (this.productoDetalle) {
                    if (this.productoDetalle.nombre == e.nombre) {
                        this.productoDetalle.textBoton = "Borrar del carrito";
                    }
                }
            });
        },
    },
}).mount(`#app`);