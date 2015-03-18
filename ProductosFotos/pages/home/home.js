(function () {
    "use strict";
    var datos = new WinJS.Binding.List([]);
    var producto = new Modelo.Producto();

    WinJS.Namespace.define("Datos", {
        Productos: datos

    });

    function update(res) {
        Datos.Productos.splice(0, Datos.Productos.length);

        for (var i = 0; i < res.length;i++) {

            Datos.Productos.push(res[i]);

        }

    }
    function IntentarQuitarSnap() {
        var estado = Windows.UI.ViewManagement.ApplicationView.value;
        if (estado === Windows.UI.ViewManagement.ApplicationViewState.snapped
                && !Windows.UI.ViewManagement.ApplicationView.tryUnsnap()
        ) {

            //Manejariamos el error
            return;

        }


    }
    function mostrarFicheros() {
        IntentarQuitarSnap();

        var picker = new Windows.Storage.Pickers.FileOpenPicker();
        picker.viewMode = Windows.Storage.Pickers.PickerViewMode.thumbnail;
        picker.suggestedStartLocation =
            Windows.Storage.Pickers.PickerLocationId.picturesLibrary;
        picker.fileTypeFilter.replaceAll([".png", ".jpg", ".gif"]);

        return picker.pickSingleFileAsync();
    }

    function cargarImagen() {

        mostrarFicheros().done(function(file) {
            if (file) {
                producto.foto = file;
                document.getElementById("imgPro").src =
                    URL.createObjectURL(file);
            }


        });

    }

    function Guardar() {
        if (!producto.foto) {
            new Windows.UI.Popups.MessageDialog("Error falta la imagen")
                .showAsync();
            return;
        }

        var azu = new RuntimeAzureStorage.AlmacenAzure();
        azu.subirFicheroAsync(producto.foto, producto.foto.name).
            then(function (url) {
                producto.foto = url;
                producto.nombre = document.getElementById("txtNom").value;
                producto.precio = document.getElementById("txtPre").value;

            Azure.Add(producto).then(function() {
                Azure.Get().then(function(res) {
                    update(res);

                });


            });
        });

    }

    WinJS.UI.Pages.define("/pages/home/home.html", {
        // This function is called whenever a user navigates to this page. It
        // populates the page elements with the app's data.
        ready: function (element, options) {
            Azure.Get().done(function(res) {
                update(res);
            });

            document.getElementById("btnImg").addEventListener("click",
                cargarImagen);
            document.getElementById("btnGuardar").addEventListener("click",
                Guardar);

        }
    });
})();
