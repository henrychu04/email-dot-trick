const emailPrompt = require('email-prompt')
const fs = require('fs')

function append(fileName, jigged) {
    fs.appendFileSync(fileName, jigged, function (err) {
        if (err) throw err;
    })
}

async function main() {
    try {
        let email;
 
        try {
            email = await emailPrompt();
        } catch (err) {
            console.log('\n> Aborted!');
            return;
        }
    
        var text = email.split('@')[0];

        fs.open(`${text}.txt`, 'w', function (err) {
            if (err) throw err;
        })
    
        for (i = 0; i < text.length; i++) {
            if (i == 0) {
                continue;
            } else {
                var firstHalf = text.substring(0, i);
                var secondHalf = text.substring(i);
                var jigged = `${firstHalf}.${secondHalf}@gmail.com\n`;

                append(`${text}.txt`, jigged);

                var secondModified = secondHalf;

                for (j = 0; j < secondModified.length; j++) {
                    if (j == 0) {
                        continue;
                    } else {
                        var first = secondModified.substring(0, j);
                        var second = secondModified.substring(j);
                        secondModified = first + '.' + second;

                        var secondJigged = `${firstHalf}.${secondModified}@gmail.com\n`;

                        append(`${text}.txt`, secondJigged);
                        j++;
                    }
                }                
            }
        }

        console.log(`\n> Emails appended to ${text}.txt`);
    } catch (err) {
        console.log(err);
    }  
}

main();