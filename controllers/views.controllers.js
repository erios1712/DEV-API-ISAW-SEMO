const login = (req, res) => {
    res.render("loginpage.handlebars", {
        nav: false,
    }); 
}

const dashboardMB = (req, res) => {
    res.render("dashboardMB.handlebars", {
        nav: true,
    }); 
}


let viewCtrl = {
    login,
    dashboardMB
}

export default viewCtrl;