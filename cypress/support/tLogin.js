Cypress.Commands.add('tLogin', (Role, Email, Password, Remember) => {
        var AES= require("crypto-js/aes");
        const pwd = AES.encrypt('111111', 'cms').toString();
        /*const Role = 'student';
        const Email = 'student@admin.com';
        const Remember = true;*/

        cy.request({
            method: 'POST',
            url: 'http://cms.chtoma.com/api/login',
            body: {
                role: Role,
                email: Email,
                password: pwd,
                remember: Remember
            }
        })
            .then(res => {
                console.log(res)
                console.log(res.body.data.token)
                if (res.status == 201) {
                    cy.log("Login Successfully.")
                    cy.window().then($win => {
                        console.log($win)
                        let tokeVal = '{"token":"' + res.body.data.token +'","role":"manager","userId":3}'
                        $win.localStorage.setItem("cms", tokeVal)    
                    })
                }
        })

})