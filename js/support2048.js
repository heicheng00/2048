/**
 * Created by thinkpad on 2016/11/10.
 */

documentWidth = window.screen.availWidth;
//documentWidth = $(window).width();
gridContentWidth = 0.92 * documentWidth;

//console.log("屏幕宽度"+documentWidth + "运算后的值" + gridContentWidth) // 不带单位
cellSideLength = 0.18 * documentWidth;
cellSpace = 0.04 * documentWidth;

function getPosTop(i, j){
    //return 20 + i*120;
    return cellSpace + i * (cellSideLength + cellSpace);
}

function getPosLeft(i, j){
    //return 20 + j*120;
    return cellSpace + j * (cellSideLength + cellSpace);
}

function getNumberBgColor(num){
   switch(num){
       case 2:
           return 'red';
           break;
       case 4:
           return 'gold';
          break;
       case 8:
           return 'green';
           break;
       case 16:
           return 'pink';
           break;
       case 32:
           return 'blank';
           break;
       case 64:
           return 'yellow';
           break;
       case 128:
           return 'orange';
           break;
       case 256:
           return 'green';
           break;
       case 512:
           return 'red';
           break;
       case 1024:
           return 'pink';
           break;
       default:
           return 'black';
   }
}

function getNumberColor(num){
    return num < 4 ? 'gold' : 'white';
}

//判定是否还有空格
function noSpace(){
    for(var i = 0;i<4;i++){
        for(var j =0;j<4;j++){
            if(board[i][j] == 0){
                return false;
            }
        }
    }
    return true;
}
//判定是否可以向左移动
function canMoveLeft(board){
   for(var i =0 ; i< 4; i++){
       for(var j =1; j<4;j++){
           if(board[i][j] != 0){
               if(board[i][j-1] == 0 || board[i][j] == board[i][j-1]){
                   return true;
               }
           }
       }
   }
    return false;
};

//判定是否可以向上移动
function canMoveTop(board){
   for(var i = 1 ; i< 4; i++){
       for(var j = 0; j<4;j++){
           if(board[i][j] != 0){
               if(board[i-1][j] == 0 || board[i][j] == board[i-1][j]){
                   return true;
               }
           }
       }
   }
    return false;
};

//判定是否可以向右移动
function canMoveRight(board){
   for(var i = 0 ; i< 4; i++){
       //for(var j = 0; j <3;j++){
       for(var j = 2; j>=0;j--){
           if(board[i][j] != 0){
               if(board[i][j+1] == 0 || board[i][j] == board[i][j+1]){
                   return true;
               }
           }
       }
   }
    return false;
};

//判定是否可以向下移动
function canMoveDown(board){
    //for(var i = 0 ; i< 3; i++){
    for(var i = 2 ; i>=0; i--){
        for(var j = 0; j <4;j++){
            if(board[i][j] != 0){
                if(board[i+1][j] == 0 || board[i+1][j] == board[i][j]){
                    return true;
                }
            }
        }
    }
    return false;
};

// i 跟  实参传过来的不一样
function noBlockHorizontal(row, col1, col2, board){
    for(var i = col1 + 1; i<col2 ;i++){
        if(board[row][i] != 0){
            return false;
        }
    }
    return true;
}

//function noBlockVertical(row1, row2, col, board){
function noBlockVertical(col, row1, row2, board){
    //for(var i = row2 + 1; i< row1 ;i++){
    for(var i = row1 + 1; i< row2 ;i++){
        if(board[i][col] != 0){
            return false;
        }
    }
    return true;
}

function noMove(board){
    if(canMoveDown(board) || canMoveLeft(board) || canMoveRight(board) || canMoveTop(board)){
        return false;
    }
    return true;

}