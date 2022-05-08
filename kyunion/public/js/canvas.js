window.onload = function(){
    // console.log(globalThis.v .user.id);
    var canvas = document.getElementById("card");
    var context = canvas.getContext("2d");
    var cxt = canvas.getContext("2d");
    var imageObj = new Image();
    // var msg = "Mrs Ajanlekoko and Family";
    var msg = document.getElementById("guest").value;
    var numb = document.getElementById("iv-id").value;
    var m;
    var id;
    imageObj.onload = function(){
        context.drawImage(imageObj,0,0,imageObj.width,imageObj.height);
        cxt.textBaseline = 'top';
        cxt.textAlign = 'center';
        context.textBaseline = 'top';
        context.textAlign = 'center';
        context.font = "italic 42pt Calibri";
        context.fillStyle = '#000f55';
        context.fillText(msg, canvas.width / 2, canvas.height / 2.98);
        context.save();
        cxt.font = "normal 20pt calibri";
        cxt.fillStyle = '#030424';
        cxt.fillText(numb, canvas.width / 1.15, canvas.height / 22);
    };
    imageObj.src = "images/456yr784876fds.jpg"; 
};


// width='1490' height='1859