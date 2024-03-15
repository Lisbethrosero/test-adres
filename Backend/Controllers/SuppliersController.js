const Suppliers = require('./../entities/Suppliers');
const dataSource = require('./../utils/db');

const getSuppliersAll = async (req, res) => {
  try {
    const Suppliers = await dataSource.getRepository('suppliers').findBy({});
    return res.status(200).json({ success: 1, data: Suppliers });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ success: 0, message: 'Internal server error' });
  }
}

const CreateSuppliers = async (req, res) => {
  try {
    var data = {
      name: req.body.name,
      create_at: req.body.create_at
    }
    const repositoryRepository = await dataSource.getRepository('suppliers');
    repositoryRepository.save(data);
    return res.status(200).json({ success: 1, data: '' });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ success: 0, message: 'Internal server error' });
  }
}

const UpdateSuppliers = async (req, res) => {
  try {
    const repositoryRepository = await dataSource.getRepository('suppliers');
    const suppliers = await repositoryRepository.findOneBy({id: req.params.id});
    suppliers.name =  req.body.name;
    repositoryRepository.save(suppliers);
    return res.status(200).json({ success: 1, data: suppliers});
  } catch (error) {
    console.error(error);
    return res.status(500).json({ success: 0, message: 'Internal server error' });
  }
}

const DeleteSuppliers = async (req, res) => {
  try {
    const repositoryRepository = await dataSource.getRepository('suppliers');
    const suppliers = await repositoryRepository.findOneBy({id: req.params.id});
    if (!suppliers) {
      return res.status(200).json({ success: 0, message: 'Suppliers not found' });
    }
    const repositoryRepositoryBudget = await dataSource.getRepository('butgets');
    const budgets = await repositoryRepositoryBudget.findOneBy({id_suppliers: req.params.id});

    if(budgets){
      return res.status(200).json({ success: 0, message: 'Esta relacionado' });
    }

    const repositoryRepositoryHistory = await dataSource.getRepository('history');
    const history = await repositoryRepositoryHistory.findOneBy({id_suppliers: req.params.id});

    if(history){
      return res.status(200).json({ success: 0, message: 'Esta relacionado' });
    }
    if(!budgets && suppliers && !history){
      removeData = await repositoryRepository.remove(suppliers);
      return res.status(200).json({ success: 1, message: 'Correcto' });
    }
  } catch (error) {
    console.log(error)
    return res.status(500).json({ success: 0, message: 'Internal server error' });
  }
}

const getId = async (req, res) => {
  try {
    const suppliers = await dataSource.getRepository('suppliers').findBy({id:req.params.id});
    return res.status(200).json({ success: 1, data: suppliers });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ success: 0, message: 'Internal server error' });
  }
}

module.exports = { getSuppliersAll, UpdateSuppliers , CreateSuppliers, DeleteSuppliers,getId};
