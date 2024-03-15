const dataSource = require('./../utils/db');
const moment = require('moment');

const getBudgesAll = async (req, res) => {
  try {
    let search = req.query.search;
    let type = req.query.type;
    let data = null; 
    data =  dataSource.getRepository('butgets').createQueryBuilder('butgets')
    .leftJoinAndSelect('butgets.type', 'typeService') 
    .leftJoinAndSelect('butgets.suppliers', 'suppliers') 
    .leftJoinAndSelect('butgets.units', 'units')
    switch (type) {
      case 'budget':
        data = await data.where("butgets.budget like '%"+search+"%'").getMany();
        break;
      case 'type':
        data = await data.where("typeService.name like '%"+search+"%'").getMany();
        break;
      case 'suppliers':
        data = await data.where("suppliers.name like '%"+search+"%'").getMany();
        break;  
      case 'unit':
        data = await data.where("units.name like '%"+search+"%'").getMany();
        break;     
      default:
        data = await data.getMany()
    }
    return res.status(200).json({ success: 1, data: data, type: type });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ success: 0, message: 'Internal server error' });
  }
}

const CreateBudges = async (req, res) => {
  moment.defaultFormat = "YYYY-mm-dd";
  try {
    var data = {
        budget: req.body.budget+'',
        val_unit: req.body.val_unit,
        cant: req.body.cant,
        id_type_service: req.body.id_type_service,
        id_suppliers: req.body.id_suppliers,
        id_unit: req.body.id_unit,
        documentation: req.body.documentation,
        date: moment(req.body.date).toDate(),
        state: req.body.state,
        create_at: new Date()
    }
    const repositoryRepository = await dataSource.getRepository('butgets');
    const budges = await repositoryRepository.save(data);

    var data = {
        budget: req.body.budget,
        val_unit: req.body.val_unit,
        cant: req.body.val_unit,
        id_type_service: req.body.id_type_service,
        id_suppliers: req.body.id_suppliers,
        id_unit: req.body.id_unit,
        documentation: req.body.documentation,
        date: moment(req.body.date).toDate(),
        state: req.body.state,
        create_at: new Date(),
        process:'CREATE',
        lastid:budges.id
    }

    const repositoryHistory = await dataSource.getRepository('history');
    repositoryHistory.save(data);

    return res.status(200).json({ success: 1, data: '' });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ success: 0, message: 'Internal server error' });
  }
}

const UpdateBudges = async (req, res) => {
  try {
    const repositoryRepository = await dataSource.getRepository('butgets');
    const budges = await repositoryRepository.findOneBy({id: req.params.id});
    var data1 = {
      budget: budges.budget,
      val_unit: budges.val_unit,
      cant: budges.cant,
      id_type_service: budges.id_type_service,
      id_suppliers: budges.id_suppliers,
      id_unit: budges.id_unit,
      documentation: budges.documentation,
      date: budges.date,
      create_at: budges.create_at,
      process:'UPDATE',
      lastid:budges.id,
      state: budges.state
    }
    const repositoryHistory = await dataSource.getRepository('history');
    repositoryHistory.save(data1);  
    return res.status(200).json({ success: 1, data1: data1});
  } catch (error) {
    console.error(error);
    return res.status(500).json({ success: 0, message: 'Internal server error' });
  }
}

const EditBudges = async (req, res) => {
  try {
    const repositoryRepository = await dataSource.getRepository('butgets');
    const budges = await repositoryRepository.findOneBy({id: req.params.id});
    budges.budget= req.body.budget;
    budges.val_unit= req.body.val_unit;
    budges.cant= req.body.cant;
    budges.id_type_service= req.body.id_type_service;
    budges.id_suppliers= req.body.id_suppliers;
    budges.id_unit= req.body.id_unit;
    budges.documentation= req.body.documentation;
    budges.date= req.body.date;
    budges.state =req.body.state;
    budges.create_at= new Date();
    var data = await repositoryRepository.save(budges);
    return res.status(200).json({ success: 1, data: data});
  } catch (error) {
    console.error(error);
    return res.status(500).json({ success: 0, message: 'Internal server error' });
  }
}

const DeleteBudges = async (req, res) => {
  try {
    const repositoryRepository = await dataSource.getRepository('butgets');
    const budges = await repositoryRepository.findOneBy({id: req.params.id});
    if (!budges) {
      return res.status(404).json({ success: 0, message: 'Suppliers not found' });
    }
    var data = {
      budget: budges.budget,
      val_unit: budges.val_unit,
      cant: budges.cant,
      id_type_service: budges.id_type_service,
      id_suppliers: budges.id_suppliers,
      id_unit: budges.id_unit,
      documentation: budges.documentation,
      date: budges.date,
      create_at: budges.create_at,
      process:'DELETE',
      lastid:budges.id,
      state:budges.state
    }
    const repositoryHistory = await dataSource.getRepository('history');
    repositoryHistory.save(data);

    repositoryRepository.remove(budges);
    return res.status(200).json({ success: 1 });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ success: 0, message: 'Internal server error' });
  }
}

const ChangeStateBudges = async (req, res) => {
  try {
    const repositoryRepository = await dataSource.getRepository('butgets');
    const budges = await repositoryRepository.findOneBy({id: req.params.id});
    if(budges.state == "1"){
      budges.state = "0"
    }else{
      budges.state = "1"
    }
    var data = await repositoryRepository.save(budges);

    var data1 = {
      budget: budges.budget,
      val_unit: budges.val_unit,
      cant: budges.cant,
      id_type_service: budges.id_type_service,
      id_suppliers: budges.id_suppliers,
      id_unit: budges.id_unit,
      documentation: budges.documentation,
      date: budges.date,
      create_at: budges.create_at,
      process:'UPDATE',
      lastid:budges.id,
      state: budges.state
    }
    const repositoryHistory = dataSource.getRepository('history');
    repositoryHistory.save(data1);

    return res.status(200).json({ success: 1, data: data});
  } catch (error) {
    console.error(error);
    return res.status(500).json({ success: 0, message: 'Internal server error' });
  }
}

const getId = async (req, res) => {
  try {
    const budges = await dataSource.getRepository('butgets').findBy({id:req.params.id});
    return res.status(200).json({ success: 1, data: budges });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ success: 0, message: 'Internal server error' });
  }
}

module.exports = { getBudgesAll, UpdateBudges , CreateBudges, DeleteBudges,getId, EditBudges, ChangeStateBudges};
