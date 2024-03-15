const dataSource = require('./../utils/db');
var bcrypt      = require('bcryptjs');
var jwt         = require('jsonwebtoken');


const login = async (req, res) => {
    try {

        let password = req.body.password;
        let email = req.body.email;
        if(email == '' || password == '' ){
            return res.status(200).json({ success: 0, data: 'Usuario y/o Password erroneos' });
        }
        const valid = await dataSource.getRepository('users').findOneBy({email:email});
        if(valid==null){
            return res.status(200).json({ success: 0, data: 'Usuario y/o Password erroneos' });
        }   

        const salt = bcrypt.genSaltSync(10);
        const hashPassword = await bcrypt.hashSync('123', salt); 
        console.log(valid.password,hashPassword);

        const comparePassword = await bcrypt.compareSync(password,valid.password);
        if(!comparePassword){
            return res.status(200).json({ success: 0, data: 'Usuario y/o Password erroneos' });
        }

        var payload = {
            iat: Math.round(Date.now() / 1000),
            exp: Math.round((Date.now() / 1000) + 30 * 24 * 60),
            iss: 'Whatever the issuer is example: localhost:3000',
            email: valid.email,
            id:valid.id
            };
            var token = jwt.sign({
                data: payload
              }, 'secret', { expiresIn: '1h' }); 
            
            
      return res.status(200).json({ success: 1, data: '', token:token });
    } catch (error) {
      console.error(error);
      return res.status(500).json({ success: 0, message: 'Internal server error' });
    }
  }  
  module.exports = { login };