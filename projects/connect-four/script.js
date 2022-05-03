(function createColumns() {
    for (var i = 0; i < 7; i++) {
        $("#board").append("<div class='" + i + " col'></div>");
    }
})();

var columns = $(".col");

(function createRows() {
    columns.each(function (index) {
        for (var j = 0; j < 6; j++) {
            $(this).append("<div class='" + j + " slot'><div class='hole'></div></div>");
            // $(this).append("<div class='" + j + " slot'><div class='hole'>" + index + ", " + j + "</div></div>");
        }
    });
})();

var PLAYER_1 = "player1";
var PLAYER_2 = "player2";

var currentPlayer = PLAYER_1;

function togglePlayer() {
    currentPlayer = currentPlayer === PLAYER_1 ? PLAYER_2 : PLAYER_1;
}

function diagonalToLeft(colIdx, rowIdx) {
    var diagLeft = [];

    do {
        colIdx++;
        rowIdx++;
    } while (colIdx < 6 && rowIdx < 5 );

    do {
        diagLeft.push(columns.eq(colIdx).children().eq(rowIdx));
        colIdx--;
        rowIdx--;
    } while (colIdx >= 0 && rowIdx >= 0);

    return diagLeft;
}

function diagonalToRight(colIdx, rowIdx) {
    var diagRight = [];

    do {
        colIdx--;
        rowIdx++;
    } while (colIdx > 0 && rowIdx < 5);

    do {
        diagRight.push(columns.eq(colIdx).children().eq(rowIdx));
        colIdx++;
        rowIdx--;
    } while (colIdx <= 6 && rowIdx >= 0);
    
    return diagRight;
}

columns.on("click", function game(e) {
    var colSlots = $(e.currentTarget).children();
    var rowSlots = [];
    var diagonalLeft;
    var diagonalRight;
    
    for (var i = colSlots.length - 1; i >= 0; i--) {
        var slot = $(colSlots).eq(i);

        var rowIndex = slot.index();
        var colIndex = slot.parent().index();
        
        
        columns.each(function () {
            var slotOfColumn = $(this).children().eq(rowIndex);
            rowSlots.push(slotOfColumn);
        });
        
        if (slot.hasClass(PLAYER_1) || slot.hasClass(PLAYER_2)) {
        } else {
            animation(slot, rowIndex);

            $(".piece").on("transitionstart", function () {
                columns.off('click', game);
            });

            $(".piece").on("transitionend", function () {
                $(".piece").remove();
                slot.addClass(currentPlayer);
    
                diagonalLeft = diagonalToLeft(colIndex, rowIndex);
                diagonalRight = diagonalToRight(colIndex, rowIndex);
    
                victoryCheck(diagonalRight);
                victoryCheck(diagonalLeft);
                victoryCheck(colSlots);
                victoryCheck($(rowSlots));
                togglePlayer();
                
                columns.on('click', game);
            });
            break;
        }
    }
});

function victoryCheck(slots) {
    var count = 0;

    for (var i = 0; i < slots.length; i++) {
        if ($(slots[i]).hasClass(currentPlayer)) {
            count++;
            if (count >= 4) {
                victoryMessage();
                return true;
            }
        } else {
            count = 0;
        }
    }
    return false;
}

function victoryMessage () {
    var winnerMessage = currentPlayer === PLAYER_1 ? 'Player 1 won!' : 'Player 2 won!';
    $(".victory-container h2").html(winnerMessage.toUpperCase());
    $('.victory').css({ display: 'flex' });
}

$('button#play-again').on('click', function() {
    currentPlayer = PLAYER_1;
    columns.children().removeClass(PLAYER_1);
    columns.children().removeClass(PLAYER_2);
    $('.victory').css({ display: 'none' });
});

function animation (slot) {
    var boardTop = $("#board")[0].offsetTop;
    $("body").prepend('<div class="piece"></div>');
    var pieceHeight = $(".piece").height();
    var left = slot.offset().left;
    var top = boardTop - pieceHeight - 10;
    var finalPosition = slot.offset().top + 5;

    var transitionTime = 0.75;

    $(".piece").css({
        top: top + "px",
        left: left + 10 + "px",
        transition: "transform " + transitionTime + "s ease",
    });
    
    $('.piece').addClass(currentPlayer);

    $(".piece").css({
        transform: "translateY(" + finalPosition + "px)"
    });
}