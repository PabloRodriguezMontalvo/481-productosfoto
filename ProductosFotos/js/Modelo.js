(function() {

    var Producto = function(nombre, precio, foto) {

        this.nombre = nombre;
        this.precio = precio;
        this.foto = foto;

    };

    WinJS.Namespace.define("Modelo", {
         Producto: Producto
    });
})();