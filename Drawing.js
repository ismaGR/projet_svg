
        let DrawinSVG = function(drawing_zone){
            d_zone = document.createElementNS("http://www.w3.org/2000/svg",'svg');
            d_zone.current_new_shape = null;
            d_zone.shape = null;
            
            d_zone.shape_x = 0;
            d_zone.is_mouse_down = false;
            d_zone.mouse_x = 0;
            d_zone.mouse_y = 0;
            d_zone.setAttribute('id', 'conteneurSVG');
            d_zone.setAttribute('width', '800');
            d_zone.setAttribute('height', '800');
            d_zone.formes = {};
            d_zone.attr_x = '';
            d_zone.attr_y = '';
            d_zone.drawing_zone = drawing_zone;

            d_zone.whenMouseDown = function(e){
                    if (this.current_new_shape == null){
                        this.current_new_shape = new RectSVG();
                    }
                    console.debug('mousedown');
                    this.is_mouse_down = true;
                    offset(this,e);
                    
                    console.debug(this.shape);
                    var attr_name_y = 'y';
                    var attr_name_x = 'x';
                    if(this.current_new_shape.svg_name == 'circle'){
                        attr_name_y = 'c'+attr_name_y;
                        attr_name_x = 'c'+attr_name_x;
                    }
                    d_zone.attr_x = attr_name_y;
                    d_zone.attr_y = attr_name_y;

                    this.current_new_shape[attr_name_y] = this.mouse_y;
                    this.current_new_shape[attr_name_x] = this.mouse_x;
                    this.shape = this.current_new_shape.createShape();

                    this.shape_x = this.mouse_x;
                    this.shape_y = this.mouse_y;
                    this.appendChild(this.shape);

            }

            d_zone.whenMouseUp = function(e){
                    console.debug('mouseup');
                    this.is_mouse_down = false;
                    var id = Math.floor(Math.random() * (+100 - +1) + +1);
                    this.shape.setAttribute('id', id);
                    this.drawing_zone.shapes[id] = this.shape;
                    this.drawing_zone.reloadShape();
            }
            d_zone.resize = function(e){
                offset(this,e);
                w= (this.mouse_x - this.shape_x);
                h=(this.mouse_y - this.shape_y);
                console.debug("w: "+w);
                console.debug("h: "+h);
                if(this.is_mouse_down && w>0 && h >0 ){
                    console.debug(this.current_new_shape);
                    console.debug("x: "+this.mouse_x);
                    console.debug("y: "+this.mouse_y);
                    
                    if(this.current_new_shape.name == 'CarreSVG'){
                        this.shape.setAttribute('width', w);
                        this.shape.setAttribute('height', w);                        
                    }
                    if(this.current_new_shape.name == 'RectSVG'){
                        this.shape.setAttribute('width', w);
                        this.shape.setAttribute('height', h);                        
                    }
                    if(this.current_new_shape.name == 'CircleSVG'){
                        this.shape.setAttribute('r', w);                        
                    }                    

                }
            }
            d_zone.addEventListener('mousedown', d_zone.whenMouseDown);
            d_zone.addEventListener('mousemove', d_zone.resize);
            d_zone.addEventListener('mouseup', d_zone.whenMouseUp);
            
            d_zone.htmlCountainer = document.getElementById('divConteneurSVG');
            d_zone.htmlCountainer.appendChild(d_zone);                


            return d_zone;
            
        }

        class DrawingZone {
            constructor(){
                this.drawing_svg = null;
                this.shapes = {};
            }
            select_new_shape = function(shape){
                this.drawing_svg.current_new_shape = shape;
            }
            show = function(e){
                this.drawing_svg = new DrawinSVG(this);
            }
            reloadShape = function(){
                    let ctn = document.getElementById('ctn-div_shapes');
                    ctn.innerHTML = "";

                let div_shapes = document.createElement("div");
                div_shapes.setAttribute('id','div_shapes');
                let dz = this;
                let list_shapes = this.shapes;
                for (var id  in this.shapes){
                    let shape = this.shapes[id];
                    let div_container = document.createElement("div");
                    div_container.setAttribute('id', 'div-'+id)
                    
                    let btn_remove = document.createElement('input');
                    btn_remove.setAttribute('id', 'rm-'+id);
                    btn_remove.setAttribute('type', 'button');
                    btn_remove.value = "X"
                    btn_remove.addEventListener('click', function(e){
                        console.debug("remove in list: "+list_shapes);
                        let id_shape = this.getAttribute('id').split('-')[1];
                        console.debug("remove in list: "+list_shapes[id]);
                        let el = document.getElementById(id_shape);
                        delete list_shapes[id_shape];
                        console.debug("remove: "+el);
                        el.remove();
                        dz.reloadShape();
                    });                    
                    let btn_x = document.createElement('input');
                    btn_x.setAttribute('id', 'x-'+id);
                    btn_x.setAttribute('type', 'number');

                    let btn_y = document.createElement('input');
                    btn_y.setAttribute('id', 'y-'+id);
                    btn_y.setAttribute('type', 'number');                    

                    btn_x.value = shape.getAttribute('x') || shape.getAttribute('cx');
                    btn_y.value = shape.getAttribute('y') || shape.getAttribute('cy');

                    btn_y.addEventListener('change', function(e){
                        let id_shape = this.id.split('-')[1];
                        let el = document.getElementById(id_shape);

                        let pos_c = '';
                        if(el.tagName == 'circle'){
                            pos_c = 'c';
                        }
                        el.setAttribute(pos_c+'y', this.value);
                    });

                    btn_x.addEventListener('change', function(e){
                        let id_shape = this.id.split('-')[1];
                        let el = document.getElementById(id_shape);

                        let pos_c = '';
                        if(el.tagName == 'circle'){
                            pos_c = 'c';
                        }
                        el.setAttribute(pos_c+'x', this.value);

                    });

                    div_container.appendChild(btn_x);
                    div_container.appendChild(btn_y);
                    div_container.appendChild(btn_remove);
                    div_shapes.appendChild(div_container);
                    ctn.appendChild(div_shapes);
                }
            }
        }
