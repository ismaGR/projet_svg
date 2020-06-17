
        class Menu{

            constructor(view, strId){
                this.view = view;
                this.div = document.createElement("div");
                this.div.setAttribute('id', strId);
                this.shape = null;
            
            }
            attach_callback = function(btnId, btn, callback, eventType, event_target){

                btn.setAttribute('id', btnId);
                btn.addEventListener(eventType, function(e){callback(e, event_target)});
                return btn;
            }
       
        }

        class MenuChoice extends Menu{
            
            constructor(view, str_id){

                super(view, str_id);
                this.htmlCountainer = document.getElementById('formesStyle');
            };

            whenShapeChange  = function (e, event_target){
                console.debug("whenSelect called");
                console.debug(e);
                console.debug(event_target);
                let str_class_name
                str_class_name=e.srcElement.value;
                let shape_svg = new ShapeSVG();
                let shapes = shape_svg.shapes;
                let event_decorateur = {
                        'view': event_target,
                        'bubbles': true,
                        'cancelable': false,
                        'event_shape_type':'shapeChange',
                        'shape': this.shape
                }
                var shape_event = new EventShape(event_shape, event_decorateur );
                event_target.dispatchEvent(shape_event);
                console.debug("whenSelect End");

            }      
           
           
        }

        class MenuAction extends Menu {
            whenClick = function(e){}
            whenCreate = function (e){

            }            
            constructor(view, str_id){

                super(view, str_id);
                this.htmlCountainer = document.getElementById('formes');
                let btn_shape_add = document.createElement('div');
                let btn_shape_selector = document.createElement('select');
                let shape_svg;
                let shapes;
                let key;
                shape_svg = new ShapeSVG();
                for (key in shape_svg.shapes){
                    let option;
                    option = document.createElement('option');
                    option.innerHTML = key;
                    option.value = key;
                    btn_shape_selector.appendChild(option);
                }
                this.btn_save = document.createElement('input');
                this.btn_save.setAttribute('type', 'button');
                this.btn_save.setAttribute('value', 'save');
                this.btn_save.addEventListener('click', function(){
                    //get svg element.
                    var svg = document.getElementById("conteneurSVG");

                    //get svg source.
                    var serializer = new XMLSerializer();
                    var source = serializer.serializeToString(svg);
                    source = '<?xml version="1.0" standalone="no"?>\r\n' + source;

                    //convert svg source to URI data scheme.
                    var url = "data:image/svg+xml;charset=utf-8,"+encodeURIComponent(source);
                    var hiddenElement = document.createElement('a');

                    hiddenElement.href = url;
                    hiddenElement.target = '_blank';
                    hiddenElement.download = 'svg.txt';
                    hiddenElement.click();
                    console.debug(source);
                });
                this.btn_shape_selector = this.attach_callback('btnSelect', btn_shape_selector, this.whenSelectNewShape, 'change', this.view);
  
                document.getElementById('formes').appendChild(this.btn_shape_selector);
                document.getElementById('formes').appendChild(this.btn_save);

            }
            

            whenSelectNewShape = function (e, event_target){
                console.debug("whenSelect called");
                console.debug(e);
                console.debug(event_target);
                let str_class_name
                str_class_name=e.srcElement.value;
                let shape_svg = new ShapeSVG();
                let shapes = shape_svg.shapes;
                let event_decorateur = {
                        'view': event_target,
                        'bubbles': true,
                        'cancelable': false,
                        'event_shape_type':'newShape',
                        'shape': shapes[str_class_name]()
                }
                var shape_event = new EventShape(event_shape, event_decorateur );
                event_target.dispatchEvent(shape_event);
                console.debug("whenSelect End");

            }                
        }

  