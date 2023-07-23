        //board

        var blocksize = 25;
        var rows = 20;
        var cols = 20;
        var board;
        var context;
        
        //snake head
        var snakex = blocksize * 5;
        var snakey = blocksize * 5;
        
        var velocityx = 0;
        var velocityy = 0;
        
        var snakebody = [];
        
        //food
        var foodx ;
        var foody ;
        var gameover = false;
        
        window.onload = function(){
            board = document.getElementById("board");
            board.height = rows * blocksize;
            board.width = cols * blocksize;
            context = board.getContext("2d");
        
            placefood();
            document.addEventListener("keyup",changedirection);
        
            //update();
            setInterval(update,1000/10);
        }
        
        function update(){
            if(gameover){
                return;
            }
            context.fillStyle = "black";
            context.fillRect(0,0,board.width,board.height);
        
            context.fillStyle = "red";
            context.fillRect(foodx,foody,blocksize,blocksize);
        
            if(snakex == foodx && snakey == foody){
                snakebody.push([foodx,foody]);
                placefood();
            }
            for(let i=snakebody.length-1;i>0;i--){
                snakebody[i] = snakebody[i-1];
            }
            if(snakebody.length){
                snakebody[0] = [snakex,snakey];
            }
        
        
            context.fillStyle = "lime";
            snakex += velocityx * blocksize;
            snakey += velocityy * blocksize;
            context.fillRect(snakex,snakey,blocksize,blocksize);
            for(let i=0;i<snakebody.length;i++){
                context.fillRect(snakebody[i][0],snakebody[i][1],blocksize,blocksize);
            }
        
            //gameover
        
            if(snakex < 0 || snakex > cols * blocksize || snakey < 0 || snakey > rows * blocksize){
                gameover = true;
                alert("Game Over!");
            }
            for(let i=0; i < snakebody.length;i++){
                if(snakex == snakebody[i][0] && snakey == snakebody[i][1]){
                    gameover = true;
                    alert("Game Over!");
                }
            }
        }
        function changedirection(e){
            if(e.code == "ArrowUp" && velocityy != 1){
                velocityx = 0;
                velocityy = -1;
            }
            else if(e.code == "ArrowDown" && velocityy != -1){
                velocityx = 0;
                velocityy = 1;
            }
            else if(e.code == "ArrowLeft" && velocityx != 1){
                velocityx = -1;
                velocityy = 0;
            }
            else if(e.code == "ArrowRight" && velocityx != -1){
                velocityx = 1;
                velocityy = 0;
            }
        }
        
        function placefood(){
            foodx = Math.floor(Math.random() * cols) * blocksize;
            foody = Math.floor(Math.random() * rows) * blocksize;
        }