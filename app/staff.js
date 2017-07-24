VF = Vex.Flow;

// Create an SVG renderer and attach it to the DIV element named "boo".
var div = document.getElementById("noteStaff")
var renderer = new VF.Renderer(div, VF.Renderer.Backends.SVG);

// Configure the rendering context.
var context = renderer.getContext();
context.setFont("Arial", 10, "").setBackgroundFillStyle("#eed");

// Create a stave of width 400 at position 10, 40 on the canvas.
var stave = new VF.Stave(60, 10, 250);
// Add a clef and time signature.
stave.addClef("treble").addTimeSignature("4/4");

// Connect it to the rendering context and draw!
stave.setContext(context).draw();

var notes = [ new VF.StaveNote({ keys: ["g/3", "c/4", "eb/4"], duration: "q" }).addAccidental(0, new VF.Accidental("b")), 
              new VF.StaveNote({ keys: ["c/4", "eb/4", "g/4"], duration: "q" }).addAccidental(0, new VF.Accidental("b")) ];

VF.Formatter.FormatAndDraw(context, stave, notes);



