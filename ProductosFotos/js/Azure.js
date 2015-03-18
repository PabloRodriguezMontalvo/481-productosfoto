(function() {
    var client = new
        WindowsAzure.MobileServiceClient("https://awnotepad.azure-mobile.net");
    var tabla = client.getTable("producto");

    function insert(producto) {

        return tabla.insert(producto);

    }

    function get() {
        return tabla.read();
    }


    WinJS.Namespace.define("Azure", {
        Add: insert,
        Get: get

    });

})();