var context;
// board checking loading review
//overall review  for the project just for us
// Check for the canvas tag onload. 

   if(window.addEventListener) { 
 window.addEventListener('load', function () {
 var canvas, canvaso, contexto; 
 // already defined done 
 //different shapes for the different uses 
 // Default tool. (chalk, line, rectangle) 
 
   var tool; 
   var tool_default = 'chalk'; 
  
function init () { 
canvaso = document.getElementById('beautifulsketch'); 
   if (!canvaso) { 
   alert('Error! The canvas element was not found!'); 
   return; 
   } 
 if (!canvaso.getContext) { 
   alert('Error! No canvas.getContext!'); 
   return; 
   } 
// Dual drawing generating   
// Create 2d canvas. 

   contexto = canvaso.getContext('2d'); 
   if (!contexto) { 
   alert('Error! Failed to getContext!'); 
   return; 
   } 
 // newdifferent board creating  
 // Build the temporary canvas. 
 
   var container = canvaso.parentNode; 
   canvas = document.createElement('canvas'); 
   if (!canvas) { 
   alert('Error! Cannot create a new canvas element!'); 
   return; 
   } 
   canvas.id     = 'differentsketch'; 
   canvas.width  = canvaso.width; 
   canvas.height = canvaso.height; 
   container.appendChild(canvas); 
   context = canvas.getContext('2d'); 
   // already marker shade. 
   context.strokeStyle = "#FFFFFF"; 
   // always differentsize width.
   context.lineWidth = 1.0; 
  
   // Board colour shades dark grey delete easy because color of eraser would also be same shades as of board  
   // Fill transparent canvas with dark grey (So we can use the color to erase). 
   context.fillStyle = "#000000"; 
   //up, down, thickness, length of board for the need of a good board.
   context.fillRect(0,0,897,560);
   // This feature is helpful for selecting
   // Create a select field with our tools. 
 var tool_select = document.getElementById('choiceelection'); 
 if (!tool_select) { 
 alert('Error! Failed to get the select element!'); 
 return; 
 } 
 tool_select.addEventListener('change', ev_tool_change, false); 
  
  // This is used to make marker our default feature
 // Activate the default tool (chalk). 
 if (tools[tool_default]) { 
 tool = new tools[tool_default](); 
 tool_select.value = tool_default; 
 } 
 //Some of the use of cursor when we take our cursor in the upward direction 
 // when our cursor in the downward direction
 // when our cursor starts moving
 // Deatils of the cursor
 // Event Listeners. 
   canvas.addEventListener('mousedown', ev_canvas, false); 
   canvas.addEventListener('mousemove', ev_canvas, false); 
   canvas.addEventListener('mouseup',   ev_canvas, false); 
   } 
// Get the mouse position.
//All the location of the cursor is in this feature
//cursor location atlast  
   function ev_canvas (ev) { 
   if (ev.layerX || ev.layerX == 0) { // Firefox 
   ev._x = ev.layerX; 
   ev._y = ev.layerY; 
   } else if (ev.offsetX || ev.offsetX == 0) { // Opera 
   ev._x = ev.offsetX; 
   ev._y = ev.offsetY; 
   } 
// Important
// Message to be detected
// have to look on it    
// Get the tool's event handler. 
   var func = tool[ev.type]; 
   if (func) { 
   func(ev); 
   } 
   } 
   function ev_tool_change (ev) { 
   if (tools[this.value]) { 
   tool = new tools[this.value](); 
   } 
   } 
// Create the temporary canvas on top of the canvas, which is cleared each time the user draws. 
//working fine
//updated in the field
//shades in between


   function img_update () { 
   contexto.drawImage(canvas, 0, 0); 
   context.clearRect(0, 0, canvas.width, canvas.height); 
   } 
   var tools = {}; 


//Mathematics Tools
//   In mathematics many tools or symbols are required
// for the proper understanding of some problems.
 // Chalk tool. 
   tools.chalk = function () { 
   var tool = this; 
   this.started = false; 
 // Begin drawing with the chalk tool. 
   this.mousedown = function (ev) { 
   context.beginPath(); 
   context.moveTo(ev._x, ev._y); 
   tool.started = true; 
   }; 
   this.mousemove = function (ev) { 
   if (tool.started) { 
   context.lineTo(ev._x, ev._y); 
   context.stroke(); 
   } 
   }; 
   this.mouseup = function (ev) { 
   if (tool.started) { 
   tool.mousemove(ev); 
   tool.started = false; 
   img_update(); 
   } 
   }; 
   };
   // The rectangle tool.
     
 tools.rect = function () { 
 var tool = this; 
 this.started = false; 
 this.mousedown = function (ev) { 
 tool.started = true; 
 tool.x0 = ev._x; 
 tool.y0 = ev._y; 
 }; 
 this.mousemove = function (ev) { 
 if (!tool.started) { 
 return; 
 } 
 // This creates a rectangle on the canvas. 
 var x = Math.min(ev._x,  tool.x0), 
 y = Math.min(ev._y,  tool.y0), 
 w = Math.abs(ev._x - tool.x0), 
 h = Math.abs(ev._y - tool.y0); 
 context.clearRect(0, 0, canvas.width, canvas.height);// Clears the rectangle onload. 
  
if (!w || !h) { 
   return; 
   } 
   context.strokeRect(x, y, w, h); 
   }; 
   // Now when you select the rectangle tool, you can draw rectangles. 
   this.mouseup = function (ev) { 
   if (tool.started) { 
   tool.mousemove(ev); 
   tool.started = false; 
   img_update(); 
} 
}; 
};
// Function on line returning details of line.

//Ability to share your whiteboard (collaborative whiteboard) - 
//   This feature provides the users to share their whiteboard with multiple users to collaborate with them by sharing the link or by sharing code of the particular whiteboard.


// Function on line returning details of line.
//marker work for the interective board

 tools.line = function () { 
 var tool = this; 
 this.started = false; 
 this.mousedown = function (ev) { 
 tool.started = true; 
 tool.x0 = ev._x; 
 tool.y0 = ev._y; 
 }; 
 this.mousemove = function (ev) { 
 if (!tool.started) { 
 return; 
 } 
 context.clearRect(0, 0, canvas.width, canvas.height); 
 // Begin the line. 
 context.beginPath(); 
 context.moveTo(tool.x0, tool.y0); 
 context.lineTo(ev._x,   ev._y); 
 context.stroke(); 
 context.closePath(); 
 }; 
 // Now you can draw lines when the line tool is selected. 
 this.mouseup = function (ev) { 
 if (tool.started) { 
 tool.mousemove(ev); 
 tool.started = false; 
 img_update(); 
 } 
 }; 
 };
 // init();
 // }, false); }

/*
tools.tri = function () { 
 var tool = this; 
 this.started = false; 
 this.mousedown = function (ev) { 
 tool.started = true; 
 tool.x0 = ev._x; 
 tool.y0 = ev._y; 
 }; 
 this.mousemove = function (ev) { 
 if (!tool.started) { 
 return; 
 } 
  
 // context.clearRect(0, 0, canvas.width, canvas.height); 
 // Begin the line. 
 context.beginPath(); 
 context.moveTo(tool.x0, tool.y0); 
 context.lineTo((w/2),(h/2)-50); 
 context.lineTo(((w/2)-50,h/2);
 context.stroke(); 
 context.closePath(); 
 }; 
 // Now you can draw lines when the line tool is selected. 
 this.mouseup = function (ev) { 
 if (tool.started) { 
 tool.mousemove(ev); 
 tool.started = false; 
 img_update(); 
 } 
 }; 
 };*/




 tools.circle = function () { 
 var tool = this; 
 this.started = false; 
 this.mousedown = function (ev) { 
 tool.started = true; 
 tool.x0 = ev._x; 
 tool.y0 = ev._y; 
 }; 
 this.mousemove = function (ev) { 
 if (!tool.started) { 
 return; 
 } 
var x = Math.min(ev._x,  tool.x0), 
 y = Math.min(ev._y,  tool.y0),
  r = Math.abs(ev._x - tool.x0);
 
  context.clearRect(0, 0, canvas.width, canvas.height); 
 
 context.beginPath(); 

context.arc(x,y,r, 0, 2 * Math.PI);

 // context.moveTo(tool.x0, tool.y0); 
 // context.lineTo(ev._x,   ev._y); 
 context.stroke(); 
 context.closePath(); 
 }; 

 this.mouseup = function (ev) { 
 if (tool.started) { 
 tool.mousemove(ev); 
 tool.started = false; 
 img_update(); 
 } 
 }; 
 };


tools.triangle = function () { 
 var tool = this; 
 this.started = false; 
 this.mousedown = function (ev) { 
 tool.started = true; 
 tool.x0 = ev._x; 
 tool.y0 = ev._y; 
 }; 
 this.mousemove = function (ev) { 
 if (!tool.started) { 
 return; 
 } 

 


  context.clearRect(0, 0, canvas.width, canvas.height); 
 
 context.beginPath(); 

 // context.moveTo(tool.x0, tool.y0); 
 // context.lineTo((w/2),(h/2)-50); 
 // context.lineTo(((w/2)-50,h/2);





  context.moveTo(tool.x0, tool.y0); 
  context.lineTo(ev._x,   ev._y); 
  context.lineTo((ev._x+ev._y)/2,(ev._x+ev._y)/2);
  context.lineTo(tool.x0,tool.y0);
  context.stroke(); 
  context.closePath(); 
 }; 

 this.mouseup = function (ev) { 
 if (tool.started) { 
 tool.mousemove(ev); 
 tool.started = false; 
 img_update(); 
 } 
 }; 
 };
init();
 }, false); }





//Difficulty in the triangle part 
//It can be solved using 3 lines
//cursor movement







window.onload = function() { 
var bMouseIsDown = false; 
  
   var oCanvas = document.getElementById("beautifulsketch"); 
   var oCtx = oCanvas.getContext("2d"); 
var iWidth = oCanvas.width; 
   var iHeight = oCanvas.height; 
function showDownloadText() { 
   document.getElementById("textdownload").style.display = "block"; 
   } 
function hideDownloadText() { 
   document.getElementById("textdownload").style.display = "none"; 
   } 
function convertCanvas(strType) { 
   if (strType == "PNG") 
   var oImg = Canvas2Image.saveAsPNG(oCanvas, true); 
   if (strType == "BMP") 
   var oImg = Canvas2Image.saveAsBMP(oCanvas, true); 
   if (strType == "JPEG") 
   var oImg = Canvas2Image.saveAsJPEG(oCanvas, true); 
 if (!oImg) { 
   alert("Sorry, this browser is not capable of saving." + strType + " files!"); 
   return false; 
   } 
oImg.id = "canvasimage"; 
 oImg.style.border = oCanvas.style.border; 
   oCanvas.parentNode.replaceChild(oImg, oCanvas); 
howDownloadText(); 
   } 
function saveCanvas(pCanvas, strType) { 
   var bRes = false; 
   if (strType == "PNG") 
   bRes = Canvas2Image.saveAsPNG(oCanvas); 
   if (strType == "BMP") 
   bRes = Canvas2Image.saveAsBMP(oCanvas); 
   if (strType == "JPEG") 
   bRes = Canvas2Image.saveAsJPEG(oCanvas); 
if (!bRes) { 
   alert("Sorry, this browser is not capable of saving " + strType + " files!"); 
   return false; 
   } 
   } 
document.getElementById("saveimagebutton").onclick = function() { 
   convertCanvas("PNG"); 
   } 
document.getElementById("resetbtn").onclick = function() { 
   var oImg = document.getElementById("canvasimage"); 
   oImg.parentNode.replaceChild(oCanvas, oImg); 
 hideDownloadText(); 
   }}


