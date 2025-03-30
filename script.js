let started = false;
let colorlist = ['red', 'green', 'blue', 'violet'];
let btns = document.querySelectorAll('.btn');
let p = document.querySelector('p');
let computed = [];
let user = [];
let level = 0;

function DOMmani() {
    level++;
    p.innerHTML = `Level ${level}`;
    user = [];
}

document.addEventListener('keypress', function () {
    if (!started) {
        started = true;
        DOMmani();
        createcolor();
    }
});

function createcolor() {
    let ind = Math.floor(Math.random() * colorlist.length);
    let randomcl = colorlist[ind];
    computed.push(randomcl);
    manipulate(randomcl);
}

function manipulate(cl) {
    btns.forEach(function (btn) {
        if (btn.id === cl) {
            btn.classList.add('flash');
            setTimeout(() => {
                btn.classList.remove('flash');
            }, 250);
        }
    });
}

btns.forEach(function (btn) {
    btn.addEventListener('click', function (e) {
        user.push(e.target.id);
        checking(e.target.id);
    });
});

function checking(curr) {
    let idx = user.length - 1;
    if (computed[idx] !== user[idx]) {
        endgame();
        return;
    }
    if (user.length === computed.length) {
        setTimeout(() => {
            DOMmani();
            createcolor();
        }, 500);
    }
}

function endgame() {
    p.innerHTML = `Game Over`;
    computed = [];
    user = [];
    let existingButton = document.getElementById('newgame');
    if (existingButton) existingButton.remove();
    let start = document.createElement('button');
    start.id = 'newgame';
    start.style.marginLeft = '23px';
    start.innerHTML = 'New Game';
    p.append(start);
    start.addEventListener('click', newgame);
}

function newgame() {
    started = false;
    level = 0;
    computed = [];
    p.innerHTML = "Press any key to start";
}
