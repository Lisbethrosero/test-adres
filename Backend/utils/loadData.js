const dataSource = require('./../utils/db');
var bcrypt      = require('bcryptjs');

const CreateType = async () => {
    try {
        const workoutTime = new Date('2024:03:11 00:00:00');
        workoutTime.setHours(0,0,0,0);        
        var data = [{id:1,name: "Medicamentos",create_at:new Date()},{id:2,name: "Comestibles",create_at:new Date()}];
        let repositoryRepository = await dataSource.getRepository('type');
        data.forEach(async(e)=>{
            let valid = await repositoryRepository.findOneBy({id:e.id});
            if(valid==null){
                await repositoryRepository.save(e);
            }
        });
    } catch (error) {
      console.error(error);
    }
  }

  const CreateUnits = async () => {
    try {
        const workoutTime = new Date('2024:03:11 00:00:00');
        workoutTime.setHours(0,0,0,0);
        var data = [{id:1,name: "Dirección de Medicamentos y Tecnologías en Salud",create_at:new Date()},{id:2,name: "Direccion de Comestibles",create_at:new Date()}];
        const repositoryRepository = await dataSource.getRepository('units');
        data.forEach(async(e)=>{
            let valid = await repositoryRepository.findOneBy({id:e.id});
            if(valid==null){
                await repositoryRepository.save(e);
            }        
        });      
    } catch (error) {
      console.error(error);
    }
  }


  const CreateSuppliers = async () => {
    try {
        const workoutTime = new Date('2024:03:11 00:00:00');
        workoutTime.setHours(0,0,0,0);
        var data = [{id:1,name: "Dirección de Medicamentos y Tecnologías en Salud",create_at:new Date()},{id:2,name: "Direccion de Comestibles",create_at:new Date()}];
        const repositoryRepository = await dataSource.getRepository('suppliers');
        data.forEach(async(e)=>{
            let valid = await repositoryRepository.findOneBy({id:e.id});
            if(valid==null){
                await repositoryRepository.save(e);
            }   
        }); 
    } catch (error) {
      console.error(error);
    }
  }


  const CreateUser = async () => {
    try {
        const workoutTime = new Date('2024:03:11 00:00:00');
        workoutTime.setHours(0,0,0,0);

        const salt = bcrypt.genSaltSync(10);
        const hashPassword = await bcrypt.hashSync('123', salt);        

        var data = [{id:1,email: "test01@gmail.com",password:hashPassword,create_at:new Date()},{id:2,email: "test02@gmail.com",password:hashPassword,create_at:new Date()}];
        const repositoryRepository = await dataSource.getRepository('users');
        data.forEach(async(e)=>{
            let valid = await repositoryRepository.findOneBy({id:e.id});
            if(valid==null){
                await repositoryRepository.save(e);
            }   
        }); 
    } catch (error) {
      console.error(error);
    }
  }

  module.exports = { CreateType, CreateUnits , CreateSuppliers,CreateUser};

/*
const CreateBudges = async () => {
    try {
      var data = {
          budget: '10.000 millones',
          val_unit: 1000,
          cant: req.body.cant,
          id_type_service: req.body.id_type_service,
          id_suppliers: req.body.id_suppliers,
          id_unit: req.body.id_unit,
          documentation: req.body.documentation,
          date: req.body.date,
          create_at: req.body.create_at
      }
      const repositoryRepository = await dataSource.getRepository('butgets');
      const budges = repositoryRepository.save(data);
  
    } catch (error) {
      console.error(error);
    }
  }
  */