
      /*  var drawingSVG = document.getElementsById('svg').innerHTML;*/
        class View extends EventTarget {
            constructor() {
                super();
                this.menuAction = new MenuAction(this, 'MenuAction');
                this.menuChoice = new MenuChoice(this, 'MenuChoice');
                this.DrawingZone = new DrawingZone(this, 'DrawingZone');

                this.addEventListener(event_shape, function(e){
                    console.debug("View catch event:"+e.shape.event_shape_type);
                    console.debug(e);
                    if (e.shape.event_shape_type == 'newShape'){
                        let htmlForm = e.shape.shape.getHtmlShapeForm();
                        this.menuChoice.htmlCountainer.innerHTML = "";
                        this.menuChoice.htmlCountainer.appendChild(htmlForm);
                        let svg_viewer = document.createElementNS("http://www.w3.org/2000/svg",'svg');
                        svg_viewer.setAttribute('height', '150');
                        svg_viewer.setAttribute('width', '150');
                        svg_viewer.appendChild(e.shape.shape.createShape());
                        
                        this.menuChoice.htmlCountainer.appendChild(svg_viewer);
                        this.menuChoice.shape = e.shape.shape;
                        this.menuAction.shape = e.shape.shape;
                        this.DrawingZone.select_new_shape(e.shape.shape);
                        console.debug(htmlForm);
                        
                    }

                });
                let v = this;
                document.getElementById('files').addEventListener('change', function(e){
                            console.debug(e);
                            console.debug(v);
                            v.handleFileSelect(e, v);
                });                  
                
            }
readTextFile = function (file, v)
{
    var rawFile = new XMLHttpRequest();
    rawFile.open("GET", file, false);
    rawFile.onreadystatechange = function ()
    {
        if(rawFile.readyState === 4)
        {
            if(rawFile.status === 200 || rawFile.status == 0)
            {
                var allText = rawFile.responseText;
                document.getElementById('divConteneurSVG').innerHTML = allText;
                console.debug(document.getElementById('conteneurSVG'));
                 let xml = (new DOMParser()).parseFromString(allText, "text/xml");
                 
                 let xml_c = document.getElementById('conteneurSVG').childNodes;
                 for (var i = 0; i < xml_c.length; i++) {
                     
                     v.DrawingZone.shapes[xml_c[i].id] = xml_c[i];
                 }
                 v.DrawingZone.reloadShape();
            }
        }
    }
    rawFile.send(null);
}       
          handleFileSelect = function (evt, v) {
            var files = evt.target.files; // FileList object

            // Loop through the FileList and render image files as thumbnails.
            for (var i = 0, f; f = files[i]; i++) {

              var reader = new FileReader();

              // Closure to capture the file information.
              reader.onload = (function(theFile, v) {
                console.debug(theFile);
                return function(e) {

                  console.debug(e.target.result);
                  console.debug(theFile.name);
                  console.debug(v.readTextFile(e.target.result, v));
                };
              })(f, v);

              reader.readAsDataURL(f);
            }
          }     
            showView = () => {

                    this.DrawingZone.show();
    

            }
        }

/**
* offset - calcule l'offset d'un click de manière relative a l'objet DOM
* A utiliser sur les navigateurs qui ne calculent pas les attributs offsetX et offsetY
* @param {Node} dom le noeud DOM qui recoit le click
* @param {MouseEvent} event l'événement souris
* @return {MouseEvent} le même événement avec les attributs en plus _offsetX et _offsetY */
function offset(drawing_zone,event) {
// Calcule la boite englobante
console.debug(drawing_zone);
console.debug(event);
let box = drawing_zone.getBoundingClientRect();
// Calcule ensuite la position relative du click 
event._offsetX = event.pageX - box.x - window.scrollX; 
event._offsetY = event.pageY - box.y - window.scrollY; 
// Retourne l'évenement avec les deux attributs ajoutés 
drawing_zone.mouse_x = event._offsetX;
drawing_zone.mouse_y = event._offsetY;
console.debug(event._offsetX );
console.debug(event._offsetY);
return event;
}    