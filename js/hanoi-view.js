class View {
  constructor(game, el) {
    this.game = game;
    this.el = el;
    this.setupTowers(el);
    this.bindEvents();
    this.render();
    this.fromPile = null;
    this.toPile = null;
  }

  setupTowers(el){
    for (var i = 0; i < 3; i++) {
      let $ul = $("<ul>");
      $ul.addClass("tower");

      $ul.data("i", i);
      el.append($ul);
    }
    // let $first_ul = $("ul").eq(0);
    // for (var i = 0; i < 3; i++) {
    //   let $li = $("<li>");
    //   $li.addClass(`disk-${i}`);
    //   $first_ul.append($li);
    // }

  }

  bindEvents() {
    let $ul = $("ul");
    $ul.on("click", (el) => {
      let $currentTarget = $(el.currentTarget);
      if (this.fromPile === null ) {
        this.fromPile = $currentTarget.data("i");
        $currentTarget.toggleClass("selected");
      }else {
        $currentTarget.toggleClass("selected");
        this.toPile = $currentTarget.data("i");
        let moved = this.game.move(this.fromPile,this.toPile);
        if (!moved) {
          alert("Invalid move!");
        }
        this.toPile = null;
        this.fromPile = null;
        let $selected = $("ul.selected");
        $selected.removeClass("selected");

        this.render();
        if (this.game.isWon()) {
          alert("You win!");
        }
      }
    });
  }

  render () {
    $('li').remove();
    let $ul = $("ul");
    this.game.towers.forEach( (tower, idx) => {
      let $currentTower = $ul.eq(idx);
      if (tower.length > 0) {
        for (var i = tower.length - 1; i >= 0 ; i--) {
          let $li = $("<li>");
          $li.addClass(`disk-${tower[i]-1}`);
          $currentTower.append($li);
        }
    }
    });
  }
}

module.exports = View;
