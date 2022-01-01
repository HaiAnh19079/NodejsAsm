$(document).ready(function() {

    $(document).on('click', '#show-modal-qv', function() {
        var dataId = $(this).attr("data-id");
        $.ajax({
            url: '/products',
            method: 'POST',
            dataType: 'json',
            data: { id: dataId },
            success: function(product) {
                $('.img-modal').attr('src', `${product.image[0]}`)
                $('.img-modal').attr('data-thumb', `${product.image[0]}`)
                $('#product-name').text(product.name)
                $('#product-price').text('$' + product.price)
                $('#product-desc').text(product.description)
                for (var i = 0; i < product.size.length; i++) {
                    var s = `<option>Size ${product.size[i]}</option>`
                    $('#product-size').append(s)
                }
                for (var i = 0; i < product.color.length; i++) {
                    var c = `<option>${product.color[i]}</option>`
                    $('#product-color').append(c)
                }
            },
            error: function(response) {
                alert('server error')
            }
        });
    });

    $(document).on('change', "#imageUpload", function() {
        if (this.files && this.files[0]) {
            var reader = new FileReader();
            reader.onload = function(e) {
                $('#imagePreview').css('background-image', `url(${e.target.result})`);
                $('#imagePreview').hide();
                $('#imagePreview').fadeIn(650);
            }
            reader.readAsDataURL(this.files[0]);
        }
    })

    //select2---------------------------------------------------------------
    $('.select2-multiple-gender').attr('data-placeholder', 'gender')
    $('.select2-multiple-gender').select2({
        allowClear: true,
        minimumResultsForSearch: Infinity,
        width: '200px',
        placeholder: {
            id: '-1', // the value of the option
            text: 'Select an option'
        }

    });
    $('.select2-multiple-category').select2({
        placeholder: "category",
        allowClear: true,
        minimumResultsForSearch: Infinity
    });
    $('.select2-multiple-size').select2({
        placeholder: "size",
        allowClear: true,
        minimumResultsForSearch: Infinity
    });
    $('.select2-multiple-color').select2({
        placeholder: "color",
        allowClear: true,
        minimumResultsForSearch: Infinity
    });




    //create-submit---------------------------------------------------------
    $('#create-submit')
        //==================





    $('.select2-multiple-category').on('select2:select', function(e) {
        const panes = jQuery(".tab-pane");
        var element = e.params.data.element;

        var indexValue = element.dataset.value;

        const pane = panes[indexValue];

        $(".tab-item.active").removeClass("active");
        $(".tab-pane.active").removeClass("active");

        element.classList.add("active");
        pane.classList.add("active");
    });
});