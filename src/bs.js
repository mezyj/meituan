$(function() {
    var cons = document.querySelector('.cons');
    load();

    function load() {
        $.ajax({
            url: '/api/list',
            dataType: 'json',
            success: function(res) {
                var str = '';
                if (res.code === 0) {
                    res.data.forEach(function(item) {
                        str += `
                        <div class="list">
                        <div class="left">
                            <img src="${item.src}" alt="">
                        </div>
                        <div class="right">
                            <h2>${item.title}</h2>
                            <p>${item.addr}</p>
                            <p class="price"> <span><b>${item.price}</b>${item.men}</span> <span>${item.seng}</span></p>
                        </div>
                    </div>
                        `
                    })
                }
                $('.cons').append(str)
                    // cons.appendChild = str;
            }
        })
    }


    var Bs = new BScroll('section', {
        probeType: 2,
        scrollBar: true
    })
    Bs.on('scroll', function() {
        if (this.y < this.maxScrollY - 45) {
            $('#downs').html('释放即加载').addClass('flip');
        } else if (this.y < this.maxScrollY - 10) {
            $('#downs').html('向上加载').removeClass('flip');
        } else if (this.y > 45) {
            $('#ups').html('释放加载').addClass('flip');
        } else if (this.y > 10) {
            $('#ups').html('向下刷新').removeClass('flip');
        }
    })
    Bs.on('scrollEnd', function() {
        if ($('#ups').hasClass('flip')) {
            $('#ups').html('向下刷新').removeClass('flip');
        }
        if ($('#downs').hasClass('flip')) {
            load();
            $('#downs').html('向下加载').removeClass('flip');
        }
    })
})