const Type = require('./../entities/Type');
const dataSource = require('./../utils/db');

const getTypeAll = async (req, res) => {
  try {
    const types = await dataSource.getRepository('type').findBy({});
    return res.status(200).json({ success: 1, data: types });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ success: 0, message: 'Internal server error' });
  }
}

const CreateType = async (req, res) => {
  try {
    var data = {
      name: req.body.name
    }
    const repositoryRepository = await dataSource.getRepository('type');
    repositoryRepository.save(data);
    return res.status(200).json({ success: 1, data: '' });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ success: 0, message: 'Internal server error' });
  }
}

const UpdateType = async (req, res) => {
  try {
    const repositoryRepository = dataSource.getRepository('type');
    const type = await repositoryRepository.findOneBy({id: req.params.id});
    type.name =  req.body.name;
    repositoryRepository.save(type);
    return res.status(200).json({ success: 1, data: type});
  } catch (error) {
    console.error(error);
    return res.status(500).json({ success: 0, message: 'Internal server error' });
  }
}

const DeleteType = async (req, res) => {
  try {
    const repositoryRepository = await dataSource.getRepository('type');
    const type = await repositoryRepository.findOneBy({id: req.params.id});
    if (!type) {
      return res.status(200).json({ success: 0, message: 'Type not found' });
    }
    const repositoryRepositoryBudget = await dataSource.getRepository('butgets');
    const budgets = await repositoryRepositoryBudget.findOneBy({id_type_service: req.params.id});
    if(budgets){
      return res.status(200).json({ success: 0, message: 'Esta relacionado1' });
    }
    const repositoryRepositoryHistory = await dataSource.getRepository('history');
    const history = await repositoryRepositoryHistory.findOneBy({id_type_service: req.params.id});

    if(history){
      return res.status(200).json({ success: 0, message: 'Esta relacionado' });
    }
    if(!budgets && !history){
      removeData = await repositoryRepository.remove(type);
      return res.status(200).json({ success: 1, message: 'Correcto' });
    }
  } catch (error) {
    console.log(error)
    return res.status(500).json({ success: 0, message: 'Internal server error' });
  }
}

const getId = async (req, res) => {
  try {
    const types = await dataSource.getRepository('type').findBy({id:req.params.id});
    return res.status(200).json({ success: 1, data: types });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ success: 0, message: 'Internal server error' });
  }
}

module.exports = { getTypeAll, UpdateType , CreateType, DeleteType,getId};
