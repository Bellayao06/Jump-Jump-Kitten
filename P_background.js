'use strict';
$(function(){
  let imgs = $('img');
  imgs.not(':first').hide();
  $('#container').hide();
  $('#background').hide();
  $('#pre').on('click', function(){
    let i = imgs.index($('img:visible'));
    i = (i-1+imgs.length) % imgs.length;
    imgs.hide();
    imgs.eq(i).show();
  });
  $('#next').on('click', function(){
    let j = imgs.index($('img:visible'));
    j = (j+1+imgs.length) % imgs.length;
    imgs.hide();
    imgs.eq(j).show();
  });
  $('#button1').on('click', function(){
    let x = imgs.index($('img:visible'));
    if ( x==0 ) { $( imgs.eq(x) ).css( 'width', '800px' ).css( 'height', '1000px' )
                                 .css( 'top', '0px' ).css( 'left', '0px' )
                                 .appendTo( "#background" );
                  $('#container').css( 'background-color', '#322c69' );}
    if ( x==1 ) { $( imgs.eq(x) ).css( 'width', '770px' ).css( 'height', '1000px' )
                                 .css( 'top', '0px' ).css( 'left', '0px' )
                                 .appendTo( "#background" );
                  $('#score').css( 'top', '29em' ).css( 'left', '0em' ).css( 'color', '#6D250D' );
                  $('#s').css( 'top', '29em' ).css( 'left', '4em' ).css( 'color', '#6D250D' );
                  $('#gamename').css( 'top', '11.6em' ).css( 'left', '0em' ).css( 'color', '#ef3f5b' );}
    if ( x==2 ) { $( imgs.eq(x) ).css( 'width', '670px' ).css( 'height', '1130px' )
                                 .css( 'top', '-3px' ).css( 'left', '0px' )
                                 .appendTo( "#background" );
                  $('#container').css( 'left', '8.7em' );
                  $('#score').css( 'top', '28.5em' ).css( 'left', '-1em' ).css( 'color', '#941B10' );
                  $('#s').css( 'top', '28.5em' ).css( 'left', '3em' ).css( 'color', '#941B10' );
                  $('#gamename').css( 'top', '13.3em' ).css( 'left', '0em' ).css( 'color', '#913212' );}
    if ( x==3 ) { $( imgs.eq(x) ).css( 'width', '800px' ).css( 'height', '1120px' )
                                 .css( 'top', '0px' ).css( 'left', '-3.5px' )
                                 .appendTo( "#background" );
                  $('#container').css( 'top', '12em' ).css( 'background-color', '#fbf8cc' );
                  $('#score').css( 'top', '27.3em' ).css( 'color', '#de128e' );
                  $('#s').css( 'top', '27.3em' ).css( 'color', '#de128e' );
                  $('#gamename').css( 'top', '13em' ).css( 'left', '-0.3em' ).css( 'color', '#FAF19E' );}
    if ( x==4 ) { $( imgs.eq(x) ).css( 'width', '820px' ).css( 'height', '1080px' )
                                 .css( 'top', '-3px' ).css( 'left', '0px' )
                                 .appendTo( "#background" );
                  $('#container').css( 'top', '8.5em' ).css( 'left', '13.5em' );
                  $('#score').css( 'top', '27.1em' ).css( 'left', '12em' ).css( 'color', '#0f6a3d' );
                  $('#s').css( 'top', '27.1em' ).css( 'left', '16em' ).css( 'color', '#0f6a3d' );
                  $('#gamename').css( 'top', '13.7em' ).css( 'left', '0em' ).css( 'color', '#e5e5e5' )
                                .css( 'text-shadow', '5px 5px 0 #FB374E', '-1px -1px 0 #FB374E', '1px -1px 0 #FB374E', '-1px 1px 0 #FB374E', '1px 1px 0 #FB374E');}
    $('#viewer').hide();
    $('#container').show();
    $('#background').show();
  });
});
