function makeSlider(slider) { 
    let slides = slider.find('.slide'); 
    let slidertimer = null; 
    let sliderflag = false; 
    let time = +slider.data('time'); 
    
    function useSlider(param) { 
        if (sliderflag) return; 
        sliderflag = true; 
        if (slidertimer) { 
            clearTimeout(slidertimer);
            slidertimer = null;
        }
        sliderGo(param); 
    }
    function sliderGo(param) { 
        
        let curr = slider.find('.sliderwindow .current');
        let next = slider.find('.sliderwindow .next');
        let prev = slider.find('.sliderwindow .prev');
        let newtime = time; 
        
        if (typeof param === 'number') { 
            let hlp = slides.eq(param);
            if (hlp.hasClass('prev')) { 
                param = 'prev';
            } else if (!hlp.hasClass('next')) { 
                hlp.addClass('next');
                next.removeClass('next');
                next = hlp;
            } 
            newtime /= 4; 
        }
        
        
        let w = '-=' + curr.width();
        if (param === 'prev') w = '+=' + curr.width();
        

        next.css('zIndex', '1').animate({left: w}, newtime, function() { 
            if (param === 'prev') {
                next.removeClass('next').css({zIndex: '', left: ''}); 
            } else {
                next.addClass('current').removeClass('next').css({zIndex: '', left: ''}); 
                let idx = slides.index(next); 
                slider.find('.pointers .current').removeClass('current'); 
                slider.find('.pointers span').eq(idx).addClass('current'); 
                idx++; 
                idx %= slides.length; 
                slides.eq(idx).addClass('next'); 
            }
        });
        prev.css('zIndex', '1').animate({left: w}, newtime, function() { 
            if (param === 'prev') {
                prev.addClass('current').removeClass('prev').css({zIndex: '', left: ''});
                let idx = slides.index(prev);
                slider.find('.pointers .current').removeClass('current');
                slider.find('.pointers span').eq(idx).addClass('current');
                idx--;
                if (idx < 0) idx += slides.length;
                slides.eq(idx).addClass('prev');
            } else {
                prev.removeClass('prev').css({zIndex: '', left: ''});
            }
        });
        curr.css('zIndex', '1').animate({left: w}, newtime, function() { 
            if (param === 'prev') {
                curr.removeClass('current').addClass('next').css({zIndex: '', left: ''});
            } else {
                curr.removeClass('current').addClass('prev').css({zIndex: '', left: ''});
            }
            slidertimer = setTimeout(function() {useSlider('next')}, time); 
            sliderflag = false; 
        });
    }
    
    slides.each(function() { 
        slider.find('.pointers').append('<span></span>');
    });
    slider.on('click', '.pointers span', function() { 
        if (!$(this).hasClass('current')) { 
            useSlider(slider.find('.pointers span').index(this)); 
        }
    });
    slider.on('click', '.slidercontrols button', function() { 
        useSlider(this.className); 
    });
    
    slides.eq(0).addClass('current');
    slider.find('.pointers span').eq(0).addClass('current');
    slides.eq(1).addClass('next');
    slides.eq(slides.length - 1).addClass('prev');
    
    useSlider('next');
}