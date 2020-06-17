        const svgNS = 'http://www.w3.org/2000/svg';
        const event_shape = 'shape_event';
        class EventShape extends Event{
            constructor(str_event_name, shape){
                super(str_event_name);

                this.shape = shape;
            }
        }
        class ShapeSVG{


            getHtmlForm = function(){
                let el = this;
                this.input_stroke_color = document.createElement('input');
                this.input_stroke_color.addEventListener('change', function(e){
                    el.whenFormChange(e, el)
                });                
                this.input_stroke_color.setAttribute('id', 'input_stroke_color');
                this.input_stroke_color.value = this.stroke_color;
                this.input_stroke_color.setAttribute('type', 'colors');
                let label_stroke_color = document.createElement('label');
                label_stroke_color.setAttribute('for', 'input_stroke_color')
                label_stroke_color.innerHTML = "stroke_color: "
                
                this.input_stroke_witdth = document.createElement('input');
                this.input_stroke_witdth.setAttribute('id', 'input_stroke_witdth');
                this.input_stroke_witdth.addEventListener('change', function(e){
                    el.whenFormChange(e, el)
                });                    
                this.input_stroke_witdth.value = this.stroke_witdth; 
                this.input_stroke_witdth.setAttribute('type', 'number');    
                let label_stroke_width = document.createElement('label');
                label_stroke_width.setAttribute('for', 'input_stroke_witdth')
                label_stroke_width.innerHTML = "stroke_witdth: "

                this.input_witdth = document.createElement('input');
                this.input_witdth.setAttribute('id', 'input_witdth');
                this.input_witdth.addEventListener('change', function(e){
                    el.whenFormChange(e, el)
                });
                this.input_witdth.value = this.width; 
                this.input_witdth.setAttribute('type', 'number');    
                let label_width = document.createElement('label');
                label_width.setAttribute('for', 'input_witdth')
                label_width.innerHTML = "witdth: "


                this.input_fillcolor = document.createElement('input');
                this.input_fillcolor.setAttribute('id', 'input_witdth');
                this.input_fillcolor.value = this.fillcolor; 
                this.input_fillcolor.addEventListener('change', function(e){
                    el.whenFormChange(e, el)
                });                   
                this.input_fillcolor.setAttribute('type', 'colors');    
                let label_fillcolor = document.createElement('label');
                label_fillcolor.setAttribute('for', 'input_witdth')
                label_fillcolor.innerHTML = "fillcolor: "

                
                let div_container = document.createElement("div");
                div_container.setAttribute('id', 'ShapeSVG_form');
                div_container.appendChild(label_stroke_color);
                div_container.appendChild(this.input_stroke_color);
                div_container.appendChild(document.createElement('br'));
                div_container.appendChild(label_stroke_width);
                div_container.appendChild(this.input_stroke_witdth);
                div_container.appendChild(document.createElement('br'));
                div_container.appendChild(label_width);
                div_container.appendChild(this.input_witdth);
                div_container.appendChild(document.createElement('br'));                
                div_container.appendChild(label_fillcolor);
                div_container.appendChild(this.input_fillcolor);
                div_container.appendChild(document.createElement('br'));  
                return div_container;

            }
            constructor(stroke_color = "red", stroke_witdth="2", width="40", cx = '50', cy = '50', fillcolor="black"){
                this.shapes = {
                'RectSVG': function(){return new RectSVG();}, 
                'CircleSVG':function(){return new CircleSVG();}, 
                'CarreSVG':function(){return new CarreSVG();} 
                };
            	
                this.colors = {
            		"black":"rgb(255,255,0)", 
            		"gold":"rgb(255,215,0)",
            		"blue":"rgb(0, 102, 204)",
                    "grey":"rgb(160, 160, 160)",
                    "red":"rgb(255, 0, 0)"
            	};
                
            	this.name = null;
            	this.stroke_color = stroke_color;
            	this.stroke_witdth = stroke_witdth;
                this.width = width;
                this.cx = cx;
                this.cy = cy;          
                this.x = cx;
                this.y = cy;                            
                this.fillcolor = fillcolor;
            }
            createShapeCommon = function(shape){
                console.debug("create: "+shape.svg_name);

                let r = document.createElementNS(svgNS, shape.svg_name);

                r.setAttribute('stroke-width',shape.stroke_witdth);
                r.setAttribute('width',shape.width);
                
                r.setAttribute('fill',shape.fillcolor);
                r.setAttribute('stroke',shape.stroke_color);
                r.remove_svg = function(e){
                    this.remove()
                }                
                r.addEventListener('dblclick', r.remove_svg);
                if(shape.svg_name == 'circle'){
                    r.setAttribute('cy', shape.cy);
                    r.setAttribute('cx', shape.cx);                    
                }
                else{
                    r.setAttribute('y', shape.y);
                    r.setAttribute('x', shape.x);                    

                }
                return r;
            };            
            whenFormChange = function (e, el){
                console.debug(e);
                console.debug(el);
                el.stroke_color = el.input_stroke_color.value;
                el.stroke_witdth = el.input_stroke_witdth.value;
                el.width=el.input_witdth.value;
                el.fillcolor=el.input_fillcolor.value;
            }
        }

        class RectSVG extends ShapeSVG{
                createShape = function(){
                    let r = new ShapeSVG().createShapeCommon(this);
                    r.setAttribute('height',this.height);
                    return r;
                };

            getHtmlShapeForm = function(shape = false){
                if (!shape){
                    shape = this;
                }
                let mother_form = this.getHtmlForm();

                let input_height = document.createElement('input');
                input_height.setAttribute('id', 'input_height');
                input_height.setAttribute('type', 'number');    
                input_height.value = this.height;
                let label_height = document.createElement('label');
                label_height.setAttribute('for', 'input_height');
                label_height.innerHTML = "Height: "

                mother_form.appendChild(label_height);
                mother_form.appendChild(input_height);    
                input_height.addEventListener('change', this.createShape);
                return mother_form;

            }            
            constructor(stroke_color = "red", stroke_witdth="5", width="100", x = '50', y = '50', fillcolor="black", height="60"){
                super(stroke_color, stroke_witdth, width, x, y, fillcolor);
            	this.name = "RectSVG";
                this.svg_name = "rect"
                this.height = height;


            }
        }
        class CarreSVG extends RectSVG{
            getHtmlShapeForm = function(shape = false){
                if (!shape){
                    shape = this;
                }
                let mother_form = this.getHtmlForm();
                return mother_form;

            }            
            constructor(stroke_color = "red", stroke_witdth="5", width="50", x = '80', y = '50', fillcolor="black"){
                let height = width
                super(stroke_color, stroke_witdth, width, x, y, fillcolor, height);
                this.name = "CarreSVG";
                this.svg_name = "rect"
                this.height = height;

            }
        }
        class CircleSVG extends ShapeSVG{

            constructor(stroke_color = "red", stroke_witdth="5", width="50", x = '80', y = '50', fillcolor="black"){
                super(stroke_color, stroke_witdth, width, x, y, fillcolor);
                this.name = "CircleSVG";
                this.svg_name = "circle"

            }
            getHtmlShapeForm = function(shape = false){
                if(shape==false){
                    shape= this;
                }
                let mother_form = shape.getHtmlForm();
  

                return mother_form;

            }            

            createShape = function(){
                    console.debug("create: "+this.name)
                    let c = document.createElementNS(svgNS, this.svg_name);
                    c.setAttribute('stroke-width',this.stroke_witdth);                    
                    c.setAttribute('r', this.width);
                    c.setAttribute('cx', this.cx);
                    c.setAttribute('cy', this.cy);
                    c.setAttribute('stroke',this.stroke_color);
                    c.setAttribute('fill',this.fillcolor);
                    return c;
            };            
            getSVG= function(){
                    ci= draw.circle(this.cirlce_size);
                    ci.fill(this.colors[circle_color]);
                    return ci;
            };            

        }  


