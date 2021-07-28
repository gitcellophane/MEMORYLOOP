
kaboom({
    global:true,
    fullscreen: false,
    scale:1,
    debug: true,
    clearColor: [0,0,0,1],
    width: 272, // width of canvas
    height: 272
    
})

    const MOVE_SPEED = 120
    const SLICER_SPEED = 80
    const SKELETOR_SPEED = 60
    //var SPEEDFX = 1
   

//loadSound('level1-music', 'LEVEL_1.mp3')
const ML1 = document.getElementById("MUSIC_LEVEL1");
const ML2 = document.getElementById("MUSIC_LEVEL2");



loadRoot('IMAGES/')

loadSprite('invisi-wall', 'tileset/invisi_WALL.png')


loadSprite('slicer', 'bump16.png')
loadSprite('skeletor', 'bump16.png')
loadSprite('kaboom', 'slime16.png')
loadSprite('stairs', 'stairs.png')

loadSprite('bgw', '/tileset/waterBGf.png'),
loadSprite('bgf', '/tileset/fireBGc.png')
const bgs = ['bgw','bgf']


loadSprite('lily1', 'lily2.png')

loadSprite('dot', 'dotWalkRL.png', {
    sliceX: 4,
    sliceY: 2,
    anims: {
        walkR: {
            from: 0,
            to: 3,
        
    },
    walkL: {
        from: 4,
        to: 7,
    
    }},
});


loadSprite('ripples', '/fx/ripples.png', {
    sliceX: 4,
    sliceY: 1,
    anims: {
        ripple: {
            from: 0,
            to: 3,
        
    }},
});


loadSprite('orb', 'orb3.png', {
    sliceX: 4,
    sliceY: 1,
    anims: {
        lightOFF: {
            from: 0,
            to: 3,
        }
    },
});

loadSprite('lavatile', 'tileset/lavatiles.png', {
    sliceX: 13,
    sliceY: 1,
    anims: {
        bubble: {
            from: 0,
            to: 12,
        }
    },
});


scene('game', ({level, score}) => {

    var rippletimer = 1
    

        layers(['bg','obj','ui'], 'obj')

        const maps = [
            [
                'iiiiiiiiiiiiiiiii',  
                'i               i',
                'i     iiiii     i',  
                'i  iiii   iiii  i',
                'i  i         i  i',
                'i  i     *   i  i',
                'i  i         i  i',
                'i  i  *      i  i',
                'i  i      x  i  i',
                'i  i         i  i',
                'i  i ii   ii i  i',
                'i  i i     i i  i',
                'i  i i     i$i  i',
                'i  iii     iii  i',
                'i               i',
                'i               i',
                'iiiiiiiiiiiiiiiii', 
              ],
          [
            'iiiiiiiiiiiiiiiii',  
            'i               i',
            'i               i',  
            'i  iiiiiiiiiii  i',
            'i  i  ii ii  i  i',
            'i  i         i  i',
            'i  ii       ii  i',
            'i  ii  iii  ii  i',
            'i  i   iii   i  i',
            'i  ii  iii  ii  i',
            'i  ii       ii  i',
            'i  i         i  i',
            'i  i        $i  i',
            'i  iii     iii  i',
            'i               i',
            'i               i',
            'iiiiiiiiiiiiiiiii', 
          ]
        ]
        const levelCfg = {
            width: 16,
            height: 16,
            // 'a': [sprite('vWALL'), solid(), 'wall', 'lwall'],
            // 'c': [sprite('vWALLb'), solid(), 'wall', 'rwall'],
            // 'b': [sprite('vWALL-head'), solid(), 'wall', 'rwall'],
            'i': [sprite('invisi-wall'), solid(), 'wall'],
            
            // '%': [sprite('left-door'), solid(), 'door'],
            // '^': [sprite('top-door'), 'next-level'],
            '$': [sprite('stairs'), 'next-level'],
            '*': [sprite('slicer'), 'hslicer','slicer', { dir: -1, wtimer: 1, speedfx: 1 }, 'dangerous'],
            'x': [sprite('slicer'), 'vslicer','slicer', { dir: -1, wtimer: 1, speedfx: 1 }, 'dangerous'],
            
            // '}': [sprite('skeletor'), 'dangerous', 'skeletor', { dir: -1, timer: 0, wtimer: 1}],
            // ')': [sprite('lanterns'), solid()],
            // '(': [sprite('fire-pot'), solid()],
          }
    
        addLevel(maps[level], levelCfg)

        add([sprite(bgs[level]), pos(16,16), layer('bg')])

      

        const scoreLabel = add([
            text('0'),
            pos(400,500),
            layer('ui'),
            {
                value: score   
            },
            scale(4)
        ]) 

        const player = add([
            sprite('invisi-wall'),
            pos(176,176),
            'player',
                {
                    dir: vec2(1,0),
                    facing: -1,
                    moved: 0,
                    animSpeed: 0.1
                }
        ])

        const playersprite = add([
            sprite('dot'),
            pos(176,176),
            'playersprite',
            {
                animSpeed:0.1
            }
        ])

        action('playersprite', (s) => {
            s.pos = player.pos.add(0,-5)
        })

        player.action(() => {
            player.resolve()

            if (!keyIsDown('left')&&!keyIsDown('right')&&!keyIsDown('up')&&!keyIsDown('down')){
                playersprite.stop()
                if (player.facing == -1){
                    playersprite.frame = 4
                }
                else{
                    playersprite.frame = 0
                } 
                
            }

        })

        keyPress('a', ()=> {
            //const music = play('level1-music')
            if (level == 0){
                ML1.play()
                ML1.loop = true
            }
            else if (level == 1){
                ML2.play()
                ML2.loop = true
            }
        })
    
       
        keyPress('right', () => {
            playersprite.play("walkR")
            player.facing = 1
        })
      
        keyPress('left', () => {
            playersprite.play("walkL")
            player.facing = -1
        })

        keyPress('up', () => {
            if (player.facing == -1){
                playersprite.play("walkL")
            }
            else{
                playersprite.play("walkR")
            } 
        })
      
        keyPress('down', () => {
            if (player.facing == -1){
                playersprite.play("walkL")
            }
            else{
                playersprite.play("walkR")
            }
        })
        
        keyDown('right', () => {
            player.move(MOVE_SPEED, 0)
            player.dir = vec2(1,0)
            spawnRipples((playersprite.pos.add(vec2(0, 8))))
        })
        keyDown('left', () => {
            player.move(-MOVE_SPEED, 0)
            player.dir = vec2(-1,0)
            spawnRipples((playersprite.pos.add(vec2(0, 8))))
        })
        keyDown('up', () => {
            player.move(0, -MOVE_SPEED)
            player.dir = vec2(0,-1)
            spawnRipples((player.pos.add(vec2(0, 8))))
        })
        keyDown('down', () => {
            player.move(0, MOVE_SPEED)
            player.dir = vec2(0,1)
            spawnRipples((player.pos.add(vec2(0, 8))))
        })

      
        keyPress('space', () => {
            spawnKaboom(player.pos.add(player.dir.scale(24)))
        })
        
        function spawnWALL(p) {
            const obj = add([sprite('kaboom'), pos(p), 'wall'])
            wait(5, ()=> {
                destroy(obj)
            })
        }

        function spawnKaboom(p) {
            const obj = add([sprite('kaboom'), pos(p), 'kaboom'])
            wait(1, ()=> {
                destroy(obj)
            })
        }

        function spawnRipples(p) {
            
            if (rippletimer == 1 ){
                const obj = add([sprite('ripples'), pos(p), 'kaboom', layer('bg'), {
                    animSpeed: 0.2
                }])
                rippletimer = 0

                wait(0.1, () => {
                    rippletimer = 1
                })

                obj.play("ripple")
                wait(.8, ()=> {
                    destroy(obj)
                })
            }
        }

       

     

      
        
        const dangers = []
        const lilies = []
        const orbs = []
        const lavatiles = []


        //FIRE LEVEL SPECIFICS
        if (level == 1){

            //SLICERS
            dangers.push(add([sprite('slicer'), 'hvslicer', layer('obj'), pos(128,92), { ydir:1, xdir: -1, wtimer: 1, rtimer: 1, speedfx: 1, hv: 0}, 'dangerous']))
            dangers.push(add([sprite('slicer'), 'hvslicer', layer('obj'), pos(128,256), { ydir:1, xdir: -1, wtimer: 1, rtimer: 1, speedfx: 1, hv: 0}, 'dangerous']))
            // dangers.push(add([sprite('slicer'), 'hvslicer', layer('obj'), pos(128,92), { ydir:1, xdir: -1, wtimer: 1, rtimer: 1, speedfx: 1, hv: 0}, 'dangerous']))
            // dangers.push(add([sprite('slicer'), 'hvslicer', layer('obj'), pos(128,256), { ydir:1, xdir: -1, wtimer: 1, rtimer: 1, speedfx: 1, hv: 0}, 'dangerous']))
            


            //ORBS
            spawnOrb(78,78)
            spawnOrb(192,78)
            spawnOrb(137,62)

            //LAVA
            tilepos = [{x:96,y:48},{x:144,y:48},
                       {x:48,y:96},{x:192,y:96},
                       {x:48,y:144},{x:192,y:144},]
            spawnLavaTiles(tilepos)
        }   

        function spawnLavaTiles(tilepos){

            for(let i=0; i<tilepos.length; i++){

                var fr = Math.floor(rand(12))

                lavatiles.push(add([sprite('lavatile'), pos(tilepos[i].x,tilepos[i].y), {animSpeed: 0.2}, layer('bg')]))
                lavatiles[i].play("bubble")
                lavatiles[i].frame = fr
            }
        }


        if (level == 0){

        
        spawnLilies(2)
        spawnOrbs(2)    
        
        
        }

        function spawnLilies(x){

            for(let i=0; i<= x; i++){

                lilies.push(add([sprite('lily1'), pos(rand(30,130),rand(30,130)), layer('bg'), 'lily', 'dangerous' ]))

            }
        }

        function spawnOrbs(x){

            for(let i=0; i<= x; i++){

                var fr = Math.floor(rand(4))
                console.log(fr)

                orbs.push(add([sprite('orb'), origin("center"), pos(rand(30,130),rand(30,130)), layer('obj'), 'orb', {
                    animSpeed: 0.1,
                    timer: 1,
                    onoff: 0,
                    counted: 0,
                }]))
                
                orbs[i].play("lightOFF")
                orbs[i].frame = fr
                

            }
        }

        function spawnOrb(x,y){

                var fr = Math.floor(rand(4))

                orbs.push(add([sprite('orb'), origin("center"), pos(x,y), layer('obj'), 'orb', {
                    animSpeed: 0.1,
                    timer: 1,
                    onoff: 0,
                    counted: 0,
                }]))
                
                orbs[orbs.length-1].play("lightOFF")
                orbs[orbs.length-1].frame = fr   
        }

        action('hvslicer', (s) => {
            if (s.hv%4 == 0){
                s.move(s.xdir * SLICER_SPEED * s.speedfx, 0)
            }
            else if (s.hv%4 == 1){
                s.move(0, s.ydir * SLICER_SPEED * s.speedfx)
            }
            else if (s.hv%4 == 2){
                s.move(s.xdir * SLICER_SPEED * s.speedfx, 0)
            }
            else if (s.hv%4 == 3){
                s.move(0, s.ydir * SLICER_SPEED * s.speedfx)
            }


        })

        action('hslicer', (s) => {
            s.move(s.dir * SLICER_SPEED * s.speedfx, 0)
        })

        action('vslicer', (s) => {
            s.move(0, s.dir * SLICER_SPEED * s.speedfx)
        })

        collides('hvslicer', 'wall', (s) =>{

            if (s.rtimer == 1){
                //s.hv = s.hv+1

                s.rtimer = 0

                wait(rand(9), () => {
                s.rtimer = 1

                if (s.hv%4 == 0){
                    s.move(200, 0)
                    s.hv = s.hv+1
                    console.log("X111")
                    s.xdir = -s.xdir
                }
                else if (s.hv%4 == 1){
                    s.move(0, -200)
                    s.hv = s.hv+1
                    console.log("Y2222")
                    s.ydir = -s.ydir
                }
                else if (s.hv%4 == 2){
                    s.move(-200, 0)
                    s.hv = s.hv+1
                    console.log("X3333")
                    s.xdir = -s.xdir
                }
                else if (s.hv%4 == 3){
                    s.move(0, 200)
                    s.hv = s.hv+1
                    console.log("Y4444")
                    s.ydir = -s.ydir
                }

                });

            }
            
            if (s.hv%4 == 0){
                s.move(200, 0)
                s.hv = s.hv+1
                console.log("X111")
                s.xdir = -s.xdir
            }
            else if (s.hv%4 == 1){
                s.move(0, -200)
                s.hv = s.hv+1
                console.log("Y2222")
                s.ydir = -s.ydir
            }
            else if (s.hv%4 == 2){
                s.move(-200, 0)
                s.hv = s.hv+1
                console.log("X3333")
                s.xdir = -s.xdir
            }
            else if (s.hv%4 == 3){
                s.move(0, 200)
                s.hv = s.hv+1
                console.log("Y4444")
                s.ydir = -s.ydir
            }

        //   if (s.wtimer == 1 ){
        //     s.dir = -s.dir
            

        //     wait(0.1, () => {
        //         s.wtimer = 1
        //     });

        //}

        })

        collides('slicer', 'wall', (s) =>{
            
             //s.wtimer -= dt()
            if (s.wtimer == 1 ){
                s.dir = -s.dir

                s.wtimer = 0

                wait(0.1, () => {
                    s.wtimer = 1
                });
               
            }
        })

        collides('dangerous', 'dangerous', (s) =>{
            
            //s.wtimer -= dt()
           if (s.wtimer == 1 ){
               s.dir = -s.dir
               //var x = Math.floor(Math.random()*5)
              // notes[x].play()
               s.wtimer = 0

               wait(0.1, () => {
                   s.wtimer = 1
               });
              
           }
       })

        collides('dangerous', 'kaboom', (s) => {
            
                s.speedfx = .1

            wait (.5, () => {
                s.speedfx = 1
            })            
        })
        

        action('skeletor', (s) => {
            s.move(0, s.dir * SKELETOR_SPEED)
            s.timer -= dt()
            if (s.timer <=0 ){
                s.dir = -s.dir
                s.timer = rand(5)
            }
        })
        
        collides('orb','player', (s) => {
            
                scoreLabel.value++
                scoreLabel.text = scoreLabel.value 
                s.counted=1
                destroy(s)
                console.log("hit")
            
        })

        player.overlaps('orb', (s) => {
           
            
            // if (s.onoff == 0){
            // //s.play("lightON")
            
            // s.action(() => {
            //     s.timer -= dt()
            //     if (s.timer<=0){
            //         s.pos = s.pos.add(rand(1,3),-1)
            //         s.timer = .1//rand(5)
            //     }
            // })
            // s.onoff=1
            // }
        }) 

        player.overlaps('dangerous', () => {
            go('lose', {score: scoreLabel.value})
        }) 

        player.overlaps('next-level', () => { 
            go('game', {
                level: (level + 1) % maps.length,
                score: scoreLabel.value
            })
        })

    })

    scene('lose', ({ score }) => {
        add([text(score,32), origin('center'), pos(width()/2, height()/2)])
        add([text('press V to restart',8), origin('center'), pos(width()/2, height()/2+30)])

        keyDown('v', () => {
            go('game', {
                level: (0),
                score: 0
            })
        })


    } )

start('game',
{level: 0, score: 0}
)