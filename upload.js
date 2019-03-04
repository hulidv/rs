var fgimage = null;
var bgimage = null;
var fgcan;
var bgcan;

function fgupload(){
  fgcan = document.getElementById("fgcan");
  var fgfile = document.getElementById("fgfile");
  fgimage = new SimpleImage(fgfile);
  fgimage.drawTo(fgcan);
  //alert("Foreground loading");
}

function bgupload(){
  bgcan = document.getElementById("bgcan");
  var bgfile = document.getElementById("bgfile");
  bgimage = new SimpleImage(bgfile);
  bgimage.drawTo(bgcan);
  //alert("Background loading");
}

function createComposite()
{
  fgimage.setSize(400,200);
  bgimage.setSize(400,200);
  var output = new SimpleImage(fgimage.getWidth(), fgimage.getHeight());
  for(var pixel of fgimage.values())
  {
    var x = pixel.getX();
    var y = pixel.getY();
    if(pixel.getGreen()> pixel.getRed() + pixel.getBlue())
    {
      var bgpixel = bgimage.getPixel(x, y);
      output.setPixel(x, y, bgpixel);
    }
    else
    {
      output.setPixel(x, y, pixel);
    }
  }
  return output;
}
  
function doGreen()
{
  if(fgimage == null || !fgimage.complete())
  {
    alert("foreground image not uploaded!");
  }
  if(bgimage == null || !bgimage.complete())
  {
    alert("background image not uploaded!");
  }
  clearCanvas();
  var finalImage = createComposite();
  finalImage.drawTo(fgcan);
}

function doClear(canvas)
{
  var context = canvas.getContext("2d");
  context.clearRect(0,0,canvas.width, canvas.height);
}

function clearCanvas()
{
  doClear(fgcan);
  doClear(bgcan);
}