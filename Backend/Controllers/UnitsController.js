const Units = require('../entities/Units');
const dataSource = require('../utils/db');

const getUnitsAll = async (req, res) => {
  try {
    const units = await dataSource.getRepository('units').findBy({});
    return res.status(200).json({ success: 1, data: units });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ success: 0, message: 'Internal server error' });
  }
}

const CreateUnits = async (req, res) => {
  try {
    var data = {
      name: req.body.name
    }
    const repositoryRepository = await dataSource.getRepository('units');
    repositoryRepository.save(data);
    return res.status(200).json({ success: 1, data: '' });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ success: 0, message: 'Internal server error' });
  }
}

const UpdateUnits = async (req, res) => {
  try {
    const repositoryRepository = await dataSource.getRepository('units');
    const units = await repositoryRepository.findOneBy({id: req.params.id});
    type.name =  req.body.name;
    repositoryRepository.save(type);
    return res.status(200).json({ success: 1, data: units});
  } catch (error) {
    console.error(error);
    return res.status(500).json({ success: 0, message: 'Internal server error' });
  }
}

const DeleteUnits = async (req, res) => {
  try {
    const repositoryRepository = await dataSource.getRepository('units');
    const units = await repositoryRepository.findOneBy({id: req.params.id});
    if (!units) {
      return res.status(404).json({ success: 0, message: 'Type not found' });
    }
    repositoryRepository.remove(units);
    return res.status(200).json({ success: 1 });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ success: 0, message: 'Internal server error' });
  }
}

const getId = async (req, res) => {
  try {
    const units = await dataSource.getRepository('units').findBy({id:req.params.id});
    return res.status(200).json({ success: 1, data: units });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ success: 0, message: 'Internal server error' });
  }
}

module.exports = { getUnitsAll, UpdateUnits , CreateUnits, DeleteUnits,getId};
