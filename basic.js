// Basic Language Test by Literal Line
// Discord: Lɪᴛᴇʀᴀʟ#9801
// This sucks... enjoy!



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
        CLS: ['CLS', 'none'],
        PRINT: ['PRINT', 'any']
    };

    var jsCmds = { // js code for commands
        CLS: function() {
            basicConsole.value = '';
        },

        PRINT: function(data) {
            data = data === undefined ? '' : data;
            consoleAppendText(data);
        }
    };

    var run = function(code) { // basic to js
        var basicCmd, jsCmd, inputType, input, regex;

        basicCmd = code.match(/([^\W])+/)[0]; // get basic command (all characters before a non-word character)
        regex = new RegExp('(?<=' + basicCmd + ').+');
        input = code.match(regex); // get input
        
        basicCmd = basicCmd.toUpperCase(); // make command uppercase
        inputType = basicCmds[basicCmd][1]; // get input type from command
        jsCmd = basicCmds[basicCmd][0]; // get js-equivalent command

        switch(inputType) { // determine input
            case 'any':
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


    basicConsole.value = 'Basic Language Test v1.0\n\nCommands:\nCLS\nPRINT\n\nyup that\'s it bye!\n';


    return {
        run: run
    }

})();
