import jwt from "jsonwebtoken";

const issueToken = async (req, res, next) => {

    try {
         //hardcodeado
        let user = {
            email: "admin@admin.com",
            password: "123456"
        }
        let { email, password } = req.body;
        
        if (user.email == email && user.password == password) {
            let token = jwt.sign({ user: email }, "hbriones");
            return res.json({ code: 200, message: "Login correcto.", token });            
        } else {
            return res.status(401).json({ code: 401, message: "Login invalido." });
        }
       
        
    } catch (error) {
        res.status(500).json({ code: 500, message: "error en proceso de autenticación" });        
    }

    req.token = token;
    next();
    
};

const verifyToken = (req, res, next) => {
    try {
        let token = req.query.token;
    if (!token) {       
        let authorization = req.headers.authorization;
        token = authorization?.split(" ")[1];
    }

    if (token) {
        jwt.verify(token, "hbriones", (error, decoded) => {
            if (error) {
                console.log(req);
                if (req.baseUrl.includes("/api")) {
                    return res.status(401).json({
                        code: 401,
                        message:
                            "Token invalido, intente iniciar sesión nuevamente.",
                    });
                } else {
                    return res.render("error", {
                        code: 401,

                        message:
                            "Token invalido, intente iniciar sesión nuevamente.",
                    });
                }
            }
            return next();
        });
    } else {
        if (req.baseUrl.includes("/api")) {
            return res
                .status(401)
                .json({
                    code: 401,
                    message: "Usted no tiene permisos para acceder",
                });
        } else {
            return res.render("error", {
                code: 401,
                message:
                    "Usted no tiene permitido acceder a esta página, intente iniciando sesión.",
            });
        }
    } 
        
    } catch (error) {
        res.status(500).json({ code: 500, message: "error en la verificacion de token" });             
    }   
}

let auth = {
    issueToken,
    verifyToken,
};

export default auth;
