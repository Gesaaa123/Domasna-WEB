$(document).ready(function () {

    $("#search1").on("keyup", function () {
        var value = $(this).val().toLowerCase();
        $("#podatoci tr").filter(function () {
            $(this).toggle(
                $(this).children(":first").text().toLowerCase().indexOf(value) > -1
            );
        });
    });

    $("#search2").on("keyup", function () {
        var value = $(this).val().toLowerCase();
        $("#podatoci tr").filter(function () {
            $(this).toggle(
                $(this).children(":nth-of-type(2)").text().toLowerCase().indexOf(value) > -1
            );
        });
    });

    $("#search3").on("keyup", function () {
        var value = $(this).val().toLowerCase();
        $("#podatoci tr").filter(function () {
            $(this).toggle(
                $(this).children(":last").text().toLowerCase().indexOf(value) > -1
            );
        });
    });

});
