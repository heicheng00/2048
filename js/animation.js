/**
 * Created by thinkpad on 2016/11/10.
 */
function showNumAnimation(i, j, randNum){
    var numCell = $("#number-cell-"+i+'-'+j);

    numCell.css({
        'backgroundColor':getNumberBgColor(randNum),
        'color':getNumberColor(randNum)

    }).text(randNum);

    numCell.animate({
        //'width':'100px',
        'width':cellSideLength,
        //'height':'100px',
        'height':cellSideLength,
        'top':getPosTop(i, j),
        'left':getPosLeft(i, j)

    },50);


}

function showMoveAnimation(fromx, fromy, tox, toy){
    var numCell = $("#number-cell-"+fromx+'-'+fromy);

    numCell.animate({
        top:getPosTop(tox, toy),
        left:getPosLeft(tox, toy)
    },200)
}

function updateScore(score){
    $('#score').text(score)
}