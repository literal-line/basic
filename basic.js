// Basic Language Test



var basic = (function() {

    // get textArea and text input field form DOM
    var basicConsole = document.getElementById('console');
    var basicInput = document.getElementById('input');
    var runButton = document.getElementById('run');

    var consoleAppendText = function(text) {
        basicConsole.value += text + '\n';
    };

    var basicCmds = { // commands in basic format
        // example: ['js command counterpart', 'input types allowed']
        cls: ['cls', 'none'],
        print: ['print', 'any']
    };

    var jsCmds = { // js code for commands
        cls: function() {
            basicConsole.value = '';
        },

        print: function(data) {
            data = data === undefined ? '' : data;
            consoleAppendText(data);
        }
    };

    var run = function(code) { // basic to js
        var basicCmd, jsCmd, inputType, input;

        basicCmd = code.match(/([^\W])+/)[0]; // get basic command (all characters before a non-word character)
        inputType = basicCmds[basicCmd][1];
        jsCmd = basicCmds[basicCmd][0];

        switch(inputType) {
            case 'any':
                input = code.match(/(?<=print).+/);
                input = input === null ? '' : input[0];
                break;
            case 'none':
                input = '';
                break;
            default:
                console.log('missing input type!');
                return;
        }

        try {
            eval('jsCmds.' + jsCmd + '(' + input + ')');
            consoleAppendText('OK');
        } catch(err) {
            consoleAppendText(err.message);
        }
    };


    runButton.addEventListener('click', function(e) {
        run(basicInput.value);
    });


    basicConsole.value = 'Basic Language Test v1.0';


    return {
        run: run
    }

})();
