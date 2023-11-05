const login = async (req, res) => {
    try {
        res.status(200).json({
            code: 200,
            message: "Login exitoso.",
            token: req.token
        });
    } catch (error) {
        res.status(500).json({
            code: 500,
            message: "Error en el proceso de autenticación.",
        });
    }
}

let grouplogin = {
    login
};

export default grouplogin;