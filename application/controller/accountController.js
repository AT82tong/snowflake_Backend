const baseController = require("./baseController");
const account = require("../model/account");
const email_code = require("../model/email_code");

class accountController extends baseController {
    async register(content) {
        // registration
        console.log("accountController.registration: ", content);

        let dupEmail = await account.checkEmail(content);
        console.log("dupEmail: ", dupEmail);
        // email 0

        // duplicate email
        if (dupEmail === 'email') {
            console.log("duplicate email");
            let result = {
                "status": 202,
                "err_message": "duplicate email exists"
            }
            return result;
        }

        let dupUsername = await account.checkUsername(content);
        console.log("dupUsername: ", dupUsername);
        // email 0

        // duplicate email
        if (dupUsername === 'email') {
            console.log("duplicate username");
            let result = {
                "status": 203,
                "err_message": "duplicate username exists"
            }
            return result;
        }

        account.addUser(content);

        let result = {
            "status": 200
        }
        return result;
    }

    async sendVeriCode(content) {
        // send email verification
        console.log("accountController.sendVeriCode: ", content);
        let email = content.email;

        var send = require('../../common/tools/emailer.js');
        var v_code = require('../../common/tools/veri_code_generator.js');

        var v = await v_code(1);
        console.log("verification code generated: ", v);

        var txt = 'This is your ModsWorkshop verification code:\n\n\t';
        txt += v;
        txt += '\n\nPlease do not share with other people.\n';

        var mail = {
            from: 'ModsWorkshop Team',
            subject: 'Verification Codes [Do not reply]',
            to: email,
            text: txt
        }

        send(mail);
        let data = {
            email: email,
            code: v
        }
        email_code.updateCode(data);

        let response = {
            "status": 200
        };

        return response;
    }

    async checkVeriCode(content) {
        // check email and verification code.
        // content = {
        //      email: email,
        //      code: verification_code
        //      password: password
        // }
        if (await email_code.checkCode(content) == true) {
            account.upgradeClass(content);
            let response = {
                "status": 200
            }
            return response;
        }

        let result = {
            "status": 202,
            "err_message": "The code entered is incorrect"
        }
        return result;

    }
}
module.exports = accountController;