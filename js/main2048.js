/**
 * Created by thinkpad on 2016/11/10.
 */
var board = [];
var score = 0;
var hasConflict = [];  //判定是否已产生过一次分数累计
var startx = 0;
var starty = 0;
var endx= 0;
var endy = 0;

$(function () {


    $('#newGame').click(function () {
        newGame();
    });

    newGame();
});

function prepareForWeb(){
    if(documentWidth > 500){
        gridContentWidth = 500;
        cellSideLength =100;
        cellSpace = 20;
    }

    $('#grid-content').css({
        width:gridContentWidth - 2 * cellSpace,
        height:gridContentWidth - 2 * cellSpace,
        padding: cellSpace,
        borderRadius:0.02 * gridContentWidth
    });

    $('.grid-cell').css({
        width:cellSideLength,
        height:cellSideLength,
        borderRadius:0.02 * cellSideLength

    })

}

function newGame(){
    prepareForWeb();

    //初始化棋盘
    init();

    //生成两个随机数
    generateOneNum();
    generateOneNum();
};

function init(){
    //格子布局
    for(var i = 0; i < 4; i++ ){

        //初始值布局
        board[i] = [];
        hasConflict[i] = [];

        for(var j = 0; j < 4; j++){
            $("#cell"+'-'+i+'-'+j).css({
                'left':getPosLeft(i,j),
                'top':getPosTop(i,j)
            });

            board[i][j] = 0;
            hasConflict[i][j] = false;
        }
    }

    updateBoardView();
    score = 0;

};

function updateBoardView(){
    $('.number-cell').remove();
    for(var i = 0; i<4; i++){
        for(var j =0 ;j<4; j++){

            //在格子上生成数字占位格
            $('#grid-content').append('<li class="number-cell" id="number-cell-'+i+'-'+j+'"></li>');
            var numberCell = $("#number-cell-"+i+'-'+j);

            if(board[i][j] == 0){
                numberCell.css({
                    'width':'0px',
                    'height':'0px',
                    //'top':getPosTop(i, j) + 50,
                    'top':getPosTop(i, j) + cellSideLength/2,
                    //'left':getPosLeft(i, j) + 50
                    'left':getPosLeft(i, j) + cellSideLength/2
                     //'background':'transparent'

                })
            }else{
                numberCell.css({
                    //'width':'100px',
                    'width':cellSideLength,
                    //'height':'100px',
                    'height':cellSideLength,
                    'top':getPosTop(i, j),
                    'left':getPosLeft(i, j),
                    'backgroundColor':getNumberBgColor(board[i][j]),
                    'color':getNumberColor(board[i][j])
                    //'zIndex':'10000'

                }).text(board[i][j]);
            }

            hasConflict[i][j] = false;
        }
        $('.number-cell').css({
            lineHeight:cellSideLength + 'px',
            fontSize:0.6 * cellSideLength + 'px'
        })
    }
};

function generateOneNum(){

    //随机一个位置
    var randX = parseInt(Math.floor(Math.random() * 4));
    var randY = parseInt(Math.floor(Math.random() * 4));

    var times = 50;
    while(times){
        if(board[randX][randY] == 0){
            times = 50;
            break;
        }
         randX = parseInt(Math.floor(Math.random() * 4));
         randY = parseInt(Math.floor(Math.random() * 4));

        times--;
    }

    if(0 == times){
        for(var i = 0; i<4; i++){
            for(var j = 0; j<4; j++){
                if(board[i][j] == 0){
                    randX = i;
                    randY = j;
                }

            }
        }
    }

    //随机数
    var randNum = Math.random() > 0.5 ? 2 : 4;

    //随机位置上显示随机数字
    board[randX][randY] = randNum;

    //显示动画
    showNumAnimation(randX, randY, randNum);

   return  noSpace(board) ? false : true;
}

//判定键盘响应
$(document).keydown(function (event) {

    switch(event.keyCode){
        case 37:
            event.preventDefault();
            //左移动
            if(moveLeft(board)){
                 setTimeout('generateOneNum()',210);
                 setTimeout('isGameOver()',300);
            }
            break;
        case 38:
            event.preventDefault();
            //上移动
            if(moveTop(board)){
                setTimeout('generateOneNum()',210);
                setTimeout('isGameOver()',300);
            }
            break;
        case 39:
            event.preventDefault();
            //右移动
            if(moveRight(board)){
                setTimeout('generateOneNum()',210);
                setTimeout('isGameOver()',300);
            }
            break;
        case 40:
            event.preventDefault();
            //下移动
            if(moveDown(board)){
                setTimeout('generateOneNum()',210);
                setTimeout('isGameOver()',300);
            }
            break;
    }
});

document.addEventListener('touchstart', function (event) {
    startx = event.touches[0].pageX;
    starty = event.touches[0].pageY;
});

                document.addEventListener('touchmove',function(event){
                    event.preventDefault();
                })

                document.addEventListener('touchend', function (event) {
                    endx = event.changedTouches[0].pageX;
                    endy = event.changedTouches[0].pageY;

                    var delatx = endx - startx;
                    var delaty = endy - starty;

                    //判定用户是否真正的想  进行滑动操作
                    if(Math.abs(delatx) < 0.3 * documentWidth && Math.abs(delaty) < 0.3 * documentWidth){
                        return;
                    }

                    //x 方向滑动
                    if(Math.abs(delatx) > Math.abs(delaty)){
                        if( delatx > 0 ){
                            // move Right
                            if(moveRight(board)){
                                setTimeout('generateOneNum()',210);
                                setTimeout('isGameOver()',300);
                            }

                        }else{
                            //move left
                            if(moveLeft(board)){
                                setTimeout('generateOneNum()',210);
                                setTimeout('isGameOver()',300);
                            }
                        }

                    }else{
                        //y 方向滑动
                        if(delaty > 0){
                            // move down
                            if(moveDown(board)){
                                setTimeout('generateOneNum()',210);
                                setTimeout('isGameOver()',300);
                            }
                        }else{
                            // move up
                            if(moveTop(board)){
                                setTimeout('generateOneNum()',210);
                                setTimeout('isGameOver()',300);
                            }
                        }
                    }
                })

                function isGameOver(){
                    if(noSpace(board) && noMove(board)){
                        gameover()
                    }
                }

                function gameover(){
                    alert('game is over')
                }


                /**
                 *
                 * @param board   格子上的数字  i 为行  j为列
                 * @returns {boolean}
                 */

//向左移动
                function moveLeft(board){
                    if(!canMoveLeft(board)){
                        return false;
                    };

                    //moveLeft  最左边的一列不用考虑 故j初始值为1
                    for(var i=0; i<4;i++){
                        for(var j = 1;j<4;j++){
                            if(board[i][j]!= 0){
                                for(var k =0; k< j; k++){  //k为列值

                                    if(board[i][k] == 0 && noBlockHorizontal(i, k, j, board) ){    //左侧数字为空  或者无障碍
                                        //移动动画
                                        showMoveAnimation(i, j, i, k);
                                        board[i][k] = board[i][j] ;
                                        board[i][j] = 0;
                                        continue;
                                        //}else if(board[i][k] == board[j][k] && noBlockHorizontal(i, k, j, board)){  //左侧数字与移动的数字相同
                                    }else if(board[i][k] == board[i][j] && noBlockHorizontal(i, k, j, board) && !hasConflict[i][k]){  //左侧数字与移动的数字相同
                                        showMoveAnimation(i, j, i, k);
                                        board[i][k] += board[i][j] ;
                                        board[i][j] = 0;

                                        hasConflict[i][k] = true;

                                        //变更分数
                                        score +=  board[i][k];
                                        updateScore(score);
                                        continue;
                                    }
                                }
                            }
                        }
                    }
                    //刷新视图
                    setTimeout(' updateBoardView()',200);
                    return true;
                };

//向上移动
                function moveTop(board){
                    if(!canMoveTop(board)){
                        return false;
                    };

                    //moveTop  i为行 排除第一行   j为列  k为行
                    for(var i=1; i<4;i++){
                        for(var j = 0;j<4;j++){
                            if(board[i][j]!= 0){
                                for(var k =0; k< i; k++){  //k为行值

                                    //if(board[i][j] == 0 && noBlockVertical(i, k, j, board) ){    //上侧数字为空  或者无障碍
                                    if(board[k][j] == 0 && noBlockVertical(j, k, i, board) ){    //上侧数字为空  或者无障碍
                                        //移动动画
                                        //showMoveAnimation(i, j, i, k);
                                        showMoveAnimation(i, j, k, j);
                                        board[k][j] = board[i][j] ;
                                        board[i][j] = 0;
                                        continue;
                                        //}else if(board[i][k] == board[j][k] && noBlockVertical(i, k, j, board)){  //左侧数字与移动的数字相同
                                    }else if(board[k][j] == board[i][j] && noBlockVertical(j, k, i, board) && !hasConflict[k][j]){  //左侧数字与移动的数字相同
                                        //showMoveAnimation(i, j, i, k);
                                        showMoveAnimation(i, j, k, j);
                                        //board[k][j] += board[i][j] ;
                                        board[k][j] *=2 ;
                                        board[i][j] = 0;

                                        hasConflict[k][j] = true;

                                        score += board[k][j];
                                        updateScore(score);
                                        continue;
                                    }
                                }
                            }
                        }
                    }
                    //刷新视图
                    setTimeout(' updateBoardView()',200);
                    return true;
                }

//向右移动
                function moveRight(board){
                    if(!canMoveRight(board)){
                        return false;
                    };

                    //moveRight  i为行    j为列 排除第四列
                    for(var i=0; i<4;i++){
                        //for(var j = 3;j>0;j--){  //有问题
                        for(var j = 2;j>=0; j--){  //统一下标从0开始 为了在noBlockHorizontal传参的统一 col2的值 在col1后面
                            if(board[i][j]!= 0){
                                //for(var k =j+1; k< 3; k++){
                                for(var k = 3; k>j; k--){

                                    //if(board[i][j] == 0 && noBlockHorizontal(i, k, 3, board) ){    //上侧数字为空  或者无障碍
                                    if(board[i][k] == 0 && noBlockHorizontal(i, j, k, board) ){    //上侧数字为空  或者无障碍
                                        //移动动画
                                        showMoveAnimation(i, j, i, k);
                                        board[i][k] = board[i][j] ;
                                        board[i][j] = 0;
                                        continue;
                                        //}else if(board[i][k] == board[j][k] && noBlockHorizontal(i, k, j, board)){  //左侧数字与移动的数字相同
                                    }else if(board[i][k] == board[i][j] && noBlockHorizontal(i, j, k, board) && !hasConflict[i][k]){  //左侧数字与移动的数字相同
                                        showMoveAnimation(i, j, i, k);
                                        //board[i][k] += board[i][j] ;
                                        board[i][k] *= 2;
                                        board[i][j] = 0;

                                        hasConflict[i][k] = true;

                                        score += board[i][k];
                                        updateScore(score);
                                        continue;
                                    }
                                }
                            }
                        }
                    }
                    //刷新视图
                    setTimeout(' updateBoardView()',200);
                    return true;
                }

//向下移动
                function moveDown(board){
                    if(!canMoveDown(board)){
                        return false;
                    };

                    //moveRight  i为行    j为列 排除第四行  k上下移动时表示 行  左右移动时表示列
                    //for(var i=0; i<3; i++){
                    for(var i=2; i>=0; i--){
                        for(var j = 0;j<4; j++){
                            if(board[i][j]!= 0){
                                //for(var k =i+1; k< 3; k++){
                                for(var k =3; k>i; k--){

                                    //if(board[i][j] == 0 && noBlockVertical(i, k, j, board) ){    //上侧数字为空  或者无障碍
                                    if(board[k][j] == 0 && noBlockVertical(j, i, k, board) ){    //上侧数字为空  或者无障碍
                                        //移动动画
                                        showMoveAnimation(i, j, k, j);
                                        //board[i][j] = board[k][j] ;
                                        board[k][j] = board[i][j] ;
                                        board[i][j] = 0;
                                        continue;
                                        //}else if(board[i][k] == board[j][k] && noBlockVertical(i, k, j, board)){  //左侧数字与移动的数字相同
                                    }else if(board[k][j] == board[i][j] && noBlockVertical(j, i, k, board) && !hasConflict[k][j]){  //左侧数字与移动的数字相同
                                        //showMoveAnimation(i, j, i, k);
                                        showMoveAnimation(i, j, k, j);
                                        //board[k][j] += board[i][j] ;
                                        board[k][j] *=2 ;
                                        board[i][j] = 0;

                                        hasConflict[k][j] = true;

                                        score +=  board[k][j];
                                        updateScore(score);
                                        continue;
                                    }
                                }
            }
        }
    }
   //刷新视图
     setTimeout(' updateBoardView()',200);
    return true;
}

