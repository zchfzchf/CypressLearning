describe("", { baseUrl: "http://cms.chtoma.com/" }, () => {

    var AES = require("crypto-js/aes");
    var Token;
    const pwd = AES.encrypt('111111', 'cms').toString();
    const Email = "manager@admin.com";
    const Role = "manager";

    before(() => {


        cy.request({
            method: 'POST',
            // url: 'http://cms.chtoma.com/api/login',
            url: 'api/login',
            body: {

                "email": Email,
                "password": pwd,
                "role": Role,
                //"remember": Remember
            }
        })
            .then(res => {

                if (res.status == 201) {
                    cy.log("Login Successfully.")
                    cy.window().then($win => {
                        Token = res.body.data.token
                        $win.localStorage.setItem("cms", JSON.stringify(res.body.data));
                    })
                }


                cy.visit("https://cms-lyart.vercel.app/dashboard/manager");

                cy.get("li").eq(3).as("Course").click();
                cy.get("@Course").within(() => {
                    cy.get("ul>li:nth-child(2)").click();
                });
            });
    });


    beforeEach(() => {
        // cy.window().then($win => {
        //     Token = res.body.data.token
        //     $win.localStorage.setItem("cms", JSON.stringify(res.body.data));
        // })
    });

    it('Create Course', () => {

        const Detail='A'.replace(100)

        cy.request({
            "method": "POST",
            "url": "api/courses",
            "auth": { "bearer": Token },
            "body": {
                "name": "AAA",
                "uid": "7a32d4d5-745c-4f43-8868-0e3c16f98f44",
                "detail": Detail,
                "startTime": 2022-04-01,
                "price": 1,
                "maxStudents": 8,
                "duration": 6,
                "durationUnit": 2,
                "cover": '',
                "teacherId": 77,
                "type": [1, 3]
            }
        }).its('status')
            .should('eql', 201);


    })

})