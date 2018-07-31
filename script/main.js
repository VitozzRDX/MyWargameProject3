		var clickedInNearHex;
		var res ;
		var sector;
		var mySel;
		var canvas = new fabric.CanvasEx('canvas');
		var ctx = canvas.getContext('2d');
		var listOfHexObjToRemove = [] ;
		var listOfHexObjToRemove1 = [] ;
		var layout_flat = Orientation(3.0 / 2.0, 0.0, Math.sqrt(3.0) / 2.0, Math.sqrt(3.0), 2.0 / 3.0, 0.0, -1.0 / 3.0, Math.sqrt(3.0) / 3.0, 0.0);
		var flat = Layout(layout_flat, Point(40, 40), Point(0,0));
		var center ;
		Client.askNewPlayer();
		document.getElementById('canvasContainer').addEventListener('contextmenu', function(e) {
            e.preventDefault();
			//e.stopPropagation();
        }, false);
		
		fabric.Image.prototype.fireMA=function() { console.log('fire !') };
		
		class Counter  {
			constructor(src,name,startinTop,startinLeft,orientation,radiusView) {
				this.name=name;
				self= this;
				
				this.image = fabric.Image.fromURL(src,function(img) { 
					console.log ( ' image loaded !' ) ;
					
					img.set({
						left:self.startinLeft,
						top: self.startinTop ,
						originX: 'center',
originY: 'center'
					});
					img.orientation = self.orientation;
					img.center=Point(img.width,img.height);
					img.ownHex= null;

					canvas.add(img)
				});
				this.orientation = orientation;
				this.startinTop = startinTop;
				this.startinLeft = startinLeft;
				this.radiusView = radiusView
			}
			//getOrientation (self) { return self.orientation }  // do not need it yet
			fireMA () { console.log('fire') }
		};
		
		panzer1= new Counter ('imag/pziiif.gif', 'panzer1' , 0,0,1,4)
		
		canvas.on({
			'mouse:down': function (options) {
				if (options.target&&options.target.selectable) {		// if cliked on some object ( counter ) and this obj is selectable ( i.e it is not rects of Cover Arc ) 
					if (options.e.which === 1) {
						/* a bunch of calculation of variables */
						
						mySel=options.target;																// our image ( Counter )
						mySel.fireMA()
						initializingVariablesToDrawCoverArc (mySel,options.e,res)
						clearPreviousSector(listOfHexObjToRemove1);
						highlightSector ( sector,3,mySel.ownHex,'red',listOfHexObjToRemove1); // draw a Red Sector of Counter ( its Cover Arc )
					}else{
						if (options.e.which === 3) {
							console.log('Show custom Menu !')
						}
					};
				}else{
					if (mySel) {										// if we already selected obj ( counter ) then we move it or rotate it
						clearPreviousSector(listOfHexObjToRemove);			//  clearing Green sector !
						if (options.e.which === 1) {						// move obj
							if (isClickedInNearHex(options.e)) {
							
								if (isClickedInCoverArc(options.e)) {
									initializingVariablesToDrawCoverArc (mySel,options.e,res);
									var futureTop = center.y ;
									var futureLeft = center.x ;
									mySel.animate ({left: futureLeft, top: futureTop },{
										onChange: canvas.requestRenderAll.bind(canvas),
										duration: 500						
									});
									
									clearPreviousSector(listOfHexObjToRemove1);
									highlightSector ( sector,3,mySel.ownHex,'red',listOfHexObjToRemove1); // draw a Red Sector of Counter ( its Cover Arc )
									
								}else{
									var secClicked = creatingNewSectorToDrawOnMouseMove (options.e,mySel);
									var NumberAndSignToTurnCounter = getNumberAndSignToTurnCounter(mySel.orientation,secClicked);
									if (Math.sign(NumberAndSignToTurnCounter)>0) {							
										var count = Math.abs(NumberAndSignToTurnCounter);
										console.log(count);
										(function foo() {
											count--;
											mySel.animate('angle', '-=60', {
												onChange: canvas.renderAll.bind(canvas),
												onComplete :function () { if (count>0) {
													foo()
													};
													mySel.orientation=secClicked;
																						initializingVariablesToDrawCoverArc (mySel,options.e,res);
									var futureTop = center.y ;
									var futureLeft = center.x ;
									mySel.animate ({left: futureLeft, top: futureTop },{
										onChange: canvas.requestRenderAll.bind(canvas),
										duration: 500						
									}); 
																							clearPreviousSector(listOfHexObjToRemove1);
										highlightSector ( mySel.orientation,3,mySel.ownHex,'red',listOfHexObjToRemove1); // draw a Red Sector of Counter ( its Cover Arc )
												}
											});											
										})();
									}else{
										var count = Math.abs(NumberAndSignToTurnCounter);
										(function foo() {
											count--;
											mySel.animate('angle', '+=60', {
												onChange: canvas.renderAll.bind(canvas),
												onComplete :function () { if (count>0) {
													foo()
													};
													mySel.orientation=secClicked;
																						initializingVariablesToDrawCoverArc (mySel,options.e,res);
									var futureTop = center.y ;
									var futureLeft = center.x ;
									mySel.animate ({left: futureLeft, top: futureTop },{
										onChange: canvas.requestRenderAll.bind(canvas),
										duration: 500						
									});
																							clearPreviousSector(listOfHexObjToRemove1);
										highlightSector ( mySel.orientation,3,mySel.ownHex,'red',listOfHexObjToRemove1); // draw a Red Sector of Counter ( its Cover Arc )
												}
											});											
										})();											
																				
									}
									
								}
							};
						}else{
							if (options.e.which === 3) {					// rotate it
								var newSector = creatingNewSectorToDrawOnMouseMove (options.e,mySel)
								if (newSector - mySel.orientation === 1||newSector - mySel.orientation === -5) { // clicked one sector below
										mySel.orientation= newSector ;
										clearPreviousSector(listOfHexObjToRemove1);
										highlightSector ( mySel.orientation,3,mySel.ownHex,'red',listOfHexObjToRemove1); // draw a Red Sector of Counter ( its Cover Arc )
										mySel.animate('angle', '+=60', {
											onChange: canvas.renderAll.bind(canvas)
										});
										
								}else{
									if (newSector - mySel.orientation === -1||newSector - mySel.orientation === 5){ // one sector above
										mySel.orientation= newSector ;
										clearPreviousSector(listOfHexObjToRemove1);
										highlightSector ( mySel.orientation,3,mySel.ownHex,'red',listOfHexObjToRemove1); 		
										mySel.animate('angle', '-=60', {
										  onChange: canvas.renderAll.bind(canvas)
										});
									}
								}
							}
						}
					}
				}
			},
			'mouse:move':function(options) {
				if (mySel) {
						var newSector = creatingNewSectorToDrawOnMouseMove (options.e,mySel)
						if (newSector != sector) {
							sector = newSector ;
							clearPreviousSector(listOfHexObjToRemove);
							highlightSector ( sector,3,res,null,listOfHexObjToRemove);
						}
				}
			}
		})
		
		function isClickedInNearHex (event) {
			var hexClicked = hex_round ( pixel_to_hex(flat,{x:event.clientX,y:event.clientY}) ); // take it outside ? 
			var listOfNtHexes = listOfNearestHexes(res,1)
			for ( var i in listOfNtHexes ) {											// optimize ?
				if ( deepEqual (listOfNtHexes[i], hexClicked) ) {
				return true;														
				}
			}
			return false
		};
		function isClickedInCoverArc (event) {
			var hexClicked = hex_round ( pixel_to_hex(flat,{x:event.clientX,y:event.clientY}) );
			var listOfNtHexes = creatingListOfNearestHexesInCA (mySel.orientation,res);
			for ( var i in listOfNtHexes ) {											// optimize ?
				if ( deepEqual (listOfNtHexes[i], hexClicked) ) {
				return true;														
				}
			}
			return false
		};
		
		function creatingNewSectorToDrawOnMouseMove (event,selectedObj) {
			var hexOnMouseOver =  hex_round ( pixel_to_hex(flat,{x:event.clientX,y:event.clientY}) );
			res= selectedObj.ownHex ;
			var newSector =
				hexOnMouseOver.r- res.r <= 0 && hexOnMouseOver.s-res.s <= 0 ? 0 :							
				hexOnMouseOver.q - res.q >= 0 && hexOnMouseOver.r - res.r >= 0 ? 1 :
				hexOnMouseOver.s - res.s <= 0 && hexOnMouseOver.q - res.q <= 0 ? 2 :
				hexOnMouseOver.r - res.r >= 0 && hexOnMouseOver.s - res.s>= 0 ? 3 :
				hexOnMouseOver.q - res.q <= 0 && hexOnMouseOver.r - res.r <= 0 ? 4 :
				5;
			return newSector
		}
		
		function initializingVariablesToDrawCoverArc (selection,event,hexClicked) {
			hexClicked = hex_round ( pixel_to_hex(flat,{x:event.clientX,y:event.clientY}) ); // hex where we clicked with coords (q,r,s)
			sector = selection.orientation ;												 // its orientation from his properties
			selection.ownHex = hexClicked
			center = center_of_hex ( flat , selection.ownHex );
		}
		
		function clearPreviousSector (List) {
			for ( i in List ) {
				canvas.remove(List[i])
			}
		};
		
		function highlight (q,r,s,color,listOfHexObjToRemove) {  			 // drawing given  rect - change highlight to 'draw'
			var rect = new fabric.Polygon(polygon_corners( flat , {q:q,r:r,s:s} ), {
					stroke: 'green',
					opacity: 0.7,
					fill: color,  
					selectable: false
			});
			canvas.add(rect);
			listOfHexObjToRemove.push(rect)
		}

		function highlightSector(sector, maxRadius, startingHexCoord,color,listOfHexObjToRemove) {			// sector - orientation , maxPad - distance of look , color - realize !
			for(var radius = 1; radius <= maxRadius; radius++) {
				 for(var a=0 ; a >= -radius; a--) { 
					 var b = - radius - a;

					 if (sector == 0) highlight(radius+startingHexCoord.q, a+startingHexCoord.r, b+startingHexCoord.s,color,listOfHexObjToRemove);
					 if (sector == 1) highlight(-a+startingHexCoord.q, -b+startingHexCoord.r, -radius+startingHexCoord.s,color,listOfHexObjToRemove);
					 if (sector == 2) highlight(b+startingHexCoord.q, radius+startingHexCoord.r, a+startingHexCoord.s,color,listOfHexObjToRemove);
					 if (sector == 3) highlight(-radius+startingHexCoord.q, -a+startingHexCoord.r, -b+startingHexCoord.s,color,listOfHexObjToRemove);	 
					 if (sector == 4) highlight(a+startingHexCoord.q, b+startingHexCoord.r, radius+startingHexCoord.s,color,listOfHexObjToRemove);
					 if (sector == 5) highlight(-b+startingHexCoord.q, -radius+startingHexCoord.r, -a+startingHexCoord.s,color,listOfHexObjToRemove);
				}
			}
		};


		function listOfNearestHexes (startingHexCoord,radius,direction) {
			var results = [] ;
			var hex = hex_add (startingHexCoord,hex_scale(hex_direction(4), radius)) ;              // optimize it  - radius is always == 1
			for ( var i = 0 ; i<6 ; i++ ) {
				for  ( var j=0; j<radius ; j++ ) {
					results.push(hex);
					hex= hex_neighbor( hex, i )
				}
			}
			return results
		};
		
		function creatingListOfNearestHexesInCA (sector,startingHexCoord) {
			var list = []
			var radius = 1
			for(var a=0 ; a >= -1; a--) { 
				 var b = - 1 - a;
				 if (sector == 0) list.push ({q:radius+startingHexCoord.q, r:a+startingHexCoord.r, s:b+startingHexCoord.s});
				 if (sector == 1) list.push ({q:-a+startingHexCoord.q, r:-b+startingHexCoord.r, s:-radius+startingHexCoord.s});
				 if (sector == 2) list.push ({q:b+startingHexCoord.q, r:radius+startingHexCoord.r, s:a+startingHexCoord.s});
				 if (sector == 3) list.push ({q:-radius+startingHexCoord.q, r:-a+startingHexCoord.r, s:-b+startingHexCoord.s});
				 if (sector == 4) list.push ({q:a+startingHexCoord.q, r:b+startingHexCoord.r, s:radius+startingHexCoord.s});
				 if (sector == 5) list.push ({q:-b+startingHexCoord.q, r:-radius+startingHexCoord.r, s:-a+startingHexCoord.s});
			}
			return list
		};
		
		function deepEqual (obj1, obj2){
		   return JSON.stringify(obj1)===JSON.stringify(obj2);
		};
		
		function differenceBetweenCAandSector (a,b) {
			return a-b
		};
		
		function getNumberAndSignToTurnCounter (mySec,secClicked) {
			var diff = differenceBetweenCAandSector (mySec,secClicked) ;
			if (diff === 1 || diff === -5 ) return 1;   // important ! , though now it is only one possibility for those diffs , but it should by chosen by player how he wants to turn its counter
			if (diff === 2 || diff === -4 ) return 2;
			if (diff === 3 || diff === -3 ) return 3;
			if (diff === -1 || diff === 5 ) return -1;
			if (diff === -2 || diff === 4 ) return -2;
		}
