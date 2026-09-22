const { createApp } = Vue;

createApp({

    data() {

        return {

            // Navegación
            pagina: 'calificaciones',

            // Calificaciones
            nota1: null,
            nota2: null,
            nota3: null,
            asistencia: null,

            promedio: 0,
            aprobado: false,
            mostrarResultado: false,
            calculoIntentado: false,

            // Registro
            nombre: '',
            correo: '',
            contrasena: '',
            repetirContrasena: '',
            enviado: false
        };
    },

    computed: {

        correoValido() {

            const patron = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

            return patron.test(this.correo);
        },
        nombreValido() {
            const patron = /^[A-Za-zÁÉÍÓÚáéíóúÑñÜü\s]+$/;
            return patron.test(this.nombre);
        }
    },

        methods: {

            calcular() {

                this.calculoIntentado = true;
                this.mostrarResultado = false;

                // Validar que todos los campos tengan información
                if (
                    this.nota1 === null ||
                    this.nota2 === null ||
                    this.nota3 === null ||
                    this.asistencia === null
                ) {

                    alert('Debe completar todos los campos.');

                    return;
                }

                // Validar notas
                if (
                    this.nota1 < 10 || this.nota1 > 70 ||
                    this.nota2 < 10 || this.nota2 > 70 ||
                    this.nota3 < 10 || this.nota3 > 70
                ) {

                    alert('Las notas deben estar entre 10 y 70.');

                    return;
                }

                // Validar asistencia
                if (this.asistencia < 0 || this.asistencia > 100) {

                    alert('La asistencia debe estar entre 0 y 100%.');

                    return;
                }

                // Calcular promedio ponderado
                this.promedio =
                    (this.nota1 * 0.35) +
                    (this.nota2 * 0.35) +
                    (this.nota3 * 0.30);

                // Condiciones de aprobación
                this.aprobado =
                    this.promedio >= 40 &&
                    this.asistencia >= 80;


                this.mostrarResultado = true;
            },

            registrar() {

                this.enviado = true;

                // Validar nombre
                if (this.nombre === '') return;
                if (!this.nombreValido) return;
                
                // Validar correo
                if (!this.correoValido) return;

                // Validar contraseña
                if (this.contrasena === '') return;
                
                // Validar coincidencia
                if (this.contrasena !== this.repetirContrasena) return;
                
                // Registro correcto
                alert('El registro se ha realizado correctamente');

                // Limpiar formulario
                this.nombre = '';
                this.correo = '';
                this.contrasena = '';
                this.repetirContrasena = '';

                this.enviado = false;
            }

        }

    }).mount('#app');
