function playKeyboard() {

    let pressColor = '#1BC0EA'; //color when key is pressed


    var isMobile = !!navigator.userAgent.match(/Android|BlackBerry|iPhone|iPad|iPod|Opera Mini|IEMobile/i);
    if (isMobile) {
        var evtListener = ['touchstart', 'touchend'];
    } else {
        var evtListener = ['mousedown', 'mouseup'];
    }

    var __audioSynth = new AudioSynth();
    __audioSynth.setVolume(0.5);
    var __octave = 4; //sets position of middle C, normally the 4th octave


    // Key bindings, notes to keyCodes.
    var keyboard = {

        /* ~ */
        192: 'C,-2',

        /* 1 */
        49: 'C#,-2',

        /* 2 */
        50: 'D,-2',

        /* 3 */
        51: 'D#,-2',

        /* 4 */
        52: 'E,-2',

        /* 5 */
        53: 'F,-2',

        /* 6 */
        54: 'F#,-2',

        /* 7 */
        55: 'G,-2',

        /* 8 */
        56: 'G#,-2',

        /* 9 */
        57: 'A,-2',

        /* 0 */
        48: 'A#,-2',

        /* - */
        189: 'B,-2',

        /* = */
        187: 'C,-1',

        /* Q */
        81: 'C#,-1',

        /* W */
        87: 'D,-1',

        /* E */
        69: 'D#,-1',

        /* R */
        82: 'E,-1',

        /* T */
        84: 'F,-1',

        /* Y */
        89: 'F#,-1',

        /* U */
        85: 'G,-1',

        /* I */
        73: 'G#,-1',

        /* O */
        79: 'A,-1',

        /* P */
        80: 'A#,-1',

        /* [ */
        219: 'B,-1',

        /* ] */
        221: 'C,0',

        /* A */
        65: 'C#,0',

        /* S */
        83: 'D,0',

        /* D */
        68: 'D#,0',

        /* F */
        70: 'E,0',

        /* G */
        71: 'F,0',

        /* H */
        72: 'F#,0',

        /* J */
        74: 'G,0',

        /* K */
        75: 'G#,0',

        /* L */
        76: 'A,0',

        /* ; */
        186: 'A#,0',

        /* " */
        222: 'B,0',


        /* Z */
        90: 'C,1',

        /* X */
        88: 'C#,1',

        /* C */
        67: 'D,1',

        /* V */
        86: 'D#,1',

        /* B */
        66: 'E,1',

        /* N */
        78: 'F,1',

        /* M */
        77: 'F#,1',

        /* , */
        188: 'G,1',

        /* . */
        190: 'G#,1',

        /* / */
        191: 'A,1',

        /* <- */
        37: 'A#,1',

        /* -> */
        39: 'B,1',

    };

    var reverseLookupText = {};
    var reverseLookup = {};

    // Create a reverse lookup table.
    for (var i in keyboard) {

        var val;

        switch (i | 0) { //some characters don't display like they are supposed to, so need correct values

            case 187: //equal sign
                val = 61; //???
                break;

            case 219: //open bracket
                val = 91; //left window key
                break;

            case 221: //close bracket
                val = 93; //select key
                break;

            case 188://comma
                val = 44; //print screen
                break;
            //the fraction 3/4 is displayed for some reason if 190 wasn't replaced by 46; it's still the period key either way
            case 190: //period
                val = 46; //delete
                break;

            default:
                val = i;
                break;

        }

        reverseLookupText[keyboard[i]] = val;
        reverseLookup[keyboard[i]] = i;

    }

    // Keys you have pressed down.
    var keysPressed = [];

    // Generate keyboard
    let visualKeyboard = document.getElementById('keyboard');
    let selectSound = {
        value: "0" //piano
    };

    var iKeys = 0;
    var iWhite = 0;
    var notes = __audioSynth._notes; //C, C#, D....A#, B

    for (var i = -2; i <= 1; i++) {
        for (var n in notes) {
            if (n[2] != 'b') {
                var thisKey = document.createElement('div');
                if (n.length > 1) { //adding sharp sign makes 2 characters
                    thisKey.className = 'black key'; //2 classes
                    thisKey.style.width = '30px';
                    thisKey.style.height = '120px';
                    thisKey.style.left = (40 * (iWhite - 1)) + 25 + 'px';
                } else {
                    thisKey.className = 'white key';
                    thisKey.style.width = '40px';
                    thisKey.style.height = '200px';
                    thisKey.style.left = 40 * iWhite + 'px';
                    iWhite++;
                }

                var label = document.createElement('div');
                label.className = 'label';

                let s = getDispStr(n, i, reverseLookupText);

                // label.innerHTML = '<b class="keyLabel">' + s + '</b>' + '<br /><br />' + n.substr(0,1) +
                // 	'<span name="OCTAVE_LABEL" value="' + i + '">' ;
                // thisKey.appendChild(label);
                thisKey.setAttribute('ID', 'KEY_' + n + ',' + i);
                thisKey.addEventListener(evtListener[0], (function (_temp) {
                    return function () {
                        fnPlayKeyboard({keyCode: _temp});
                    }
                })(reverseLookup[n + ',' + i]));
                visualKeyboard[n + ',' + i] = thisKey;
                visualKeyboard.appendChild(thisKey);

                iKeys++;
            }
        }
    }

    visualKeyboard.style.width = iWhite * 40 + 'px';

    window.addEventListener(evtListener[1], function () {
        n = keysPressed.length;
        while (n--) {
            fnRemoveKeyBinding({keyCode: keysPressed[n]});
        }
    });


// Detect keypresses, play notes.

    var fnPlayKeyboard = function (e) {

        var i = keysPressed.length;
        while (i--) {
            if (keysPressed[i] == e.keyCode) {
                return false;
            }
        }
        keysPressed.push(e.keyCode);

        if (keyboard[e.keyCode]) {
            if (visualKeyboard[keyboard[e.keyCode]]) {
                visualKeyboard[keyboard[e.keyCode]].style.backgroundColor = pressColor;
                //visualKeyboard[keyboard[e.keyCode]].classList.add('playing'); //adding class only affects keypress and not mouse click
                visualKeyboard[keyboard[e.keyCode]].style.marginTop = '5px';
                visualKeyboard[keyboard[e.keyCode]].style.boxShadow = 'none';
            }
            var arrPlayNote = keyboard[e.keyCode].split(',');
            var note = arrPlayNote[0];
            var octaveModifier = arrPlayNote[1] | 0;
            fnPlayNote(note, __octave + octaveModifier);
        } else {
            return false;
        }

    }
    // Remove key bindings once note is done.
    var fnRemoveKeyBinding = function (e) {

        var i = keysPressed.length;
        while (i--) {
            if (keysPressed[i] == e.keyCode) {
                if (visualKeyboard[keyboard[e.keyCode]]) {
                    //visualKeyboard[keyboard[e.keyCode]].classList.remove('playing');
                    visualKeyboard[keyboard[e.keyCode]].style.backgroundColor = '';
                    visualKeyboard[keyboard[e.keyCode]].style.marginTop = '';
                    visualKeyboard[keyboard[e.keyCode]].style.boxShadow = '';
                }
                keysPressed.splice(i, 1);
            }
        }

    }

    let lock_score_change = true;

    function checkForCorrectAnswer(chosen_note) {

        window.removeEventListener('mousedown', fnPlayKeyboard);
        window.removeEventListener('mousedown', fnRemoveKeyBinding);
        const answered_count = document.getElementById("answered_count");
        const total_count = document.getElementById("total_count");
        if (!lock_score_change) {
            total_questions++;
        }
        const correct_answer_map = {
            'A#': "Bb",
            'Bb': "A#",
            'C#': 'Db',
            'D#': 'Eb',
            'F#': 'Gb',
            'G#': 'Ab',
        };
        const answer = document.getElementById("correct");
        // First check if the answer is correct as given (C# vs Db, for example)
        if (chosen_note === currentCorrectNote) {
            answer.innerText = " Correct!";
            if (!lock_score_change) {
                score++;
            }
            lock_score_change = true;
        }
        // If it isn't, make sure it doesn't match the 'b' enharmonic
        // If neither, the answer is wrong
        else if (correct_answer_map[chosen_note] === currentCorrectNote) {
            answer.innerText = " Correct!";
            if (!lock_score_change) {
                score++;
            }
        } else {
            answer.innerText = " Incorrect, try again."
            lock_score_change = true;
        }
        answered_count.innerText = score;
        total_count.innerText = total_questions;
    }

    let lock_note_select = true;
    let buttons_score = 0;

    function checkForCorrectAnswerNoteSelect(chosen_note) {

        const answered_count = document.getElementById("answered_count_buttons");
        const total_count = document.getElementById("total_count_buttons");
        if (!lock_note_select) {
            total_questions_note_select++;
        }
        const correct_answer_map = {
            'A#': "Bb",
            'Bb': "A#",
            'C#': 'Db',
            'D#': 'Eb',
            'F#': 'Gb',
            'G#': 'Ab',
        };
        const answer = document.getElementById("correct");
        // First check if the answer is correct as given (C# vs Db, for example)
        if (chosen_note === currentCorrectNote) {
            answer.innerText = " Correct!";
            if (!lock_note_select) {
                buttons_score++;
            }
            lock_note_select = true;
        }
        // If it isn't, make sure it doesn't match the 'b' enharmonic
        // If neither, the answer is wrong
        else if (correct_answer_map[chosen_note] === currentCorrectNote) {
            answer.innerText = " Correct!";
            if (!lock_note_select) {
                buttons_score++;
            }
        } else {
            answer.innerText = " Incorrect, try again.";
            lock_note_select = true;

        }
        answered_count.innerText = buttons_score;
        total_count.innerText = total_questions_note_select;
    }

    // Generates audio for pressed note and returns that to be played
    var fnPlayNote = function (note, octave) {

        src = __audioSynth.generate(selectSound.value, note, octave, 2);

        container = new Audio(src);
        container.addEventListener('ended', function () {
            container = null;
        });
        container.addEventListener('loadeddata', function (e) {
            e.target.play();
            checkForCorrectAnswer(note, e);

        });
        container.autoplay = false;
        container.setAttribute('type', 'audio/wav');
        container.load();

        return container;

    };

    //returns correct string for display
    function getDispStr(n, i, lookup) {

        if (n == 'C' && i == -2) {
            return "~";
        } else if (n == 'B' && i == -2) {
            return "-";
        } else if (n == 'A#' && i == 0) {
            return ";";
        } else if (n == 'B' && i == 0) {
            return "\"";
        } else if (n == 'A' && i == 1) {
            return "/";
        } else if (n == 'A#' && i == 1) {
            return "<-";
        } else if (n == 'B' && i == 1) {
            return "->";
        } else {
            return String.fromCharCode(lookup[n + ',' + i]);
        }

    }


    let currentCorrectNote;
    let score = 0;
    let total_questions = 0;
    let total_questions_note_select = 0;

    function nextQuestion() {
        lock_score_change = false;
        lock_note_select = false;
        removeStaff();
        // window.addEventListener('keydown', fnPlayKeyboard);
        // window.addEventListener('keyup', fnRemoveKeyBinding);
        const question_id = document.getElementById("question");
        const notes = [
            'A',
            'A#',
            'Bb',
            'B',
            'C',
            'C#',
            'Db',
            'D',
            'D#',
            'Eb',
            'E',
            'F',
            'F#',
            'Gb',
            'G',
            'G#',
            'Ab'
        ];

        let note = notes[Math.floor(Math.random() * notes.length)];
        currentCorrectNote = note;
        // question_id.innerText = note;
        drawStaff(note);

    }

    let next_question = document.getElementById("next_question");
    next_question.addEventListener('click', function () {
        // const question_id = document.getElementById("question");
        const answer = document.getElementById("correct");
        // question_id.innerText = "";
        answer.innerText = "";
        nextQuestion();
    });

    /*Ask the first question on load*/
    nextQuestion();

    const buttons = document.querySelectorAll(".answer_button");

    buttons.forEach(function (button) {
        button.addEventListener('click', function (e) {
            checkForCorrectAnswerNoteSelect(this.innerText);
        })
    });
}

playKeyboard();


function removeStaff() {
    const staff = document.getElementById('boo');
    while (staff.hasChildNodes()) {
        staff.removeChild(staff.lastChild);
    }
}

function drawStaff(note) {
    const clefs = ['treble', 'bass'];
    let clef = clefs[Math.floor(Math.random() * clefs.length)];

    var vf = new Vex.Flow.Factory({renderer: {elementId: 'boo'}});
    var score = vf.EasyScore();
    var system = vf.System();

    if (clef === 'treble') {
        system.addStave({
            voices: [score.voice(score.notes(`${note}4/w`))]
        }).addClef('treble');
    } else {
        system.addStave({
            voices: [score.voice(score.notes(`${note}3/w`, {clef: 'bass'}))]
        }).addClef('bass');
    }


    vf.draw();
}


